import { Device, User } from '@/types/chat';
import { Platform } from 'react-native';

export class ConnectionService {
  private static instance: ConnectionService;
  private devices: Device[] = [];
  private connectedUsers: User[] = [];
  private listeners: ((devices: Device[]) => void)[] = [];
  private userListeners: ((users: User[]) => void)[] = [];

  static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  // Platform-specific device discovery
  async startDiscovery(): Promise<void> {
    if (Platform.OS === 'web') {
      // Web implementation using WebRTC
      await this.startWebRTCDiscovery();
    } else {
      // Native implementation (would require native modules)
      await this.startNativeDiscovery();
    }
  }

  private async startWebRTCDiscovery(): Promise<void> {
    // Simulate device discovery for demo
    const mockDevices: Device[] = [
      {
        id: '1',
        name: 'iPhone 12 Pro',
        type: 'bluetooth',
        signalStrength: 85,
        isConnected: false,
        distance: 2.5
      },
      {
        id: '2',
        name: 'Samsung Galaxy S21',
        type: 'wifi',
        signalStrength: 72,
        isConnected: false,
        distance: 5.2
      },
      {
        id: '3',
        name: 'MacBook Pro',
        type: 'wifi',
        signalStrength: 90,
        isConnected: true,
        distance: 1.1
      }
    ];

    this.devices = mockDevices;
    this.notifyDeviceListeners();

    // Simulate real-time updates
    setInterval(() => {
      this.devices.forEach(device => {
        device.signalStrength = Math.max(20, Math.min(100, 
          device.signalStrength + (Math.random() - 0.5) * 10
        ));
      });
      this.notifyDeviceListeners();
    }, 3000);
  }

  private async startNativeDiscovery(): Promise<void> {
    // This would implement actual Bluetooth/WiFi discovery
    // For now, use the same mock implementation
    await this.startWebRTCDiscovery();
  }

  async connectToDevice(deviceId: string): Promise<boolean> {
    const device = this.devices.find(d => d.id === deviceId);
    if (!device) return false;

    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    device.isConnected = true;
    
    // Add connected user
    const user: User = {
      id: device.id,
      name: device.name,
      isOnline: true,
      connectionType: device.type,
      lastSeen: new Date()
    };
    
    this.connectedUsers.push(user);
    this.notifyUserListeners();
    this.notifyDeviceListeners();
    
    return true;
  }

  async disconnectFromDevice(deviceId: string): Promise<void> {
    const device = this.devices.find(d => d.id === deviceId);
    if (device) {
      device.isConnected = false;
    }
    
    this.connectedUsers = this.connectedUsers.filter(u => u.id !== deviceId);
    this.notifyUserListeners();
    this.notifyDeviceListeners();
  }

  getAvailableDevices(): Device[] {
    return this.devices;
  }

  getConnectedUsers(): User[] {
    return this.connectedUsers;
  }

  onDevicesChanged(callback: (devices: Device[]) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  onUsersChanged(callback: (users: User[]) => void): () => void {
    this.userListeners.push(callback);
    return () => {
      this.userListeners = this.userListeners.filter(l => l !== callback);
    };
  }

  private notifyDeviceListeners(): void {
    this.listeners.forEach(callback => callback(this.devices));
  }

  private notifyUserListeners(): void {
    this.userListeners.forEach(callback => callback(this.connectedUsers));
  }

  stopDiscovery(): void {
    // Clean up discovery process
    this.devices = [];
    this.connectedUsers = [];
    this.notifyDeviceListeners();
    this.notifyUserListeners();
  }
}