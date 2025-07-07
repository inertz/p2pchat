import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Device } from '@/types/chat';
import { ConnectionService } from '@/services/ConnectionService';
import DeviceListItem from '@/components/DeviceListItem';
import { RefreshCw, Bluetooth, Wifi } from 'lucide-react-native';

export default function DiscoverTab() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const connectionService = ConnectionService.getInstance();
    
    const initializeDiscovery = async () => {
      setIsScanning(true);
      await connectionService.startDiscovery();
      setDevices(connectionService.getAvailableDevices());
      setIsScanning(false);
      setIsLoading(false);
    };

    initializeDiscovery();

    const unsubscribe = connectionService.onDevicesChanged(setDevices);
    return () => {
      unsubscribe();
      connectionService.stopDiscovery();
    };
  }, []);

  const handleRefresh = async () => {
    setIsScanning(true);
    const connectionService = ConnectionService.getInstance();
    await connectionService.startDiscovery();
    setDevices(connectionService.getAvailableDevices());
    setIsScanning(false);
  };

  const handleConnect = async (device: Device) => {
    const connectionService = ConnectionService.getInstance();
    setIsScanning(true);
    
    try {
      const success = await connectionService.connectToDevice(device.id);
      if (success) {
        Alert.alert(
          'Connected',
          `Successfully connected to ${device.name}`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Connection Failed',
          `Failed to connect to ${device.name}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Connection Error',
        'An error occurred while connecting',
        [{ text: 'OK' }]
      );
    } finally {
      setIsScanning(false);
    }
  };

  const handleDisconnect = async (device: Device) => {
    const connectionService = ConnectionService.getInstance();
    await connectionService.disconnectFromDevice(device.id);
    Alert.alert(
      'Disconnected',
      `Disconnected from ${device.name}`,
      [{ text: 'OK' }]
    );
  };

  const renderDevice = ({ item }: { item: Device }) => (
    <DeviceListItem
      device={item}
      onConnect={() => handleConnect(item)}
      onDisconnect={() => handleDisconnect(item)}
    />
  );

  const connectedDevices = devices.filter(d => d.isConnected);
  const availableDevices = devices.filter(d => !d.isConnected);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <TouchableOpacity 
          style={[styles.refreshButton, isScanning && styles.refreshButtonActive]} 
          onPress={handleRefresh}
          disabled={isScanning}
        >
          <RefreshCw size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <Bluetooth size={20} color="#2196F3" />
          <Text style={styles.statusText}>Bluetooth</Text>
        </View>
        <View style={styles.statusItem}>
          <Wifi size={20} color="#4CAF50" />
          <Text style={styles.statusText}>WiFi Direct</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Scanning for devices...</Text>
        </View>
      ) : (
        <FlatList
          data={[...connectedDevices, ...availableDevices]}
          renderItem={renderDevice}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => (
            <View style={styles.sectionContainer}>
              {connectedDevices.length > 0 && (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Connected ({connectedDevices.length})</Text>
                </View>
              )}
              {availableDevices.length > 0 && connectedDevices.length > 0 && (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Available ({availableDevices.length})</Text>
                </View>
              )}
              {devices.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>No devices found</Text>
                  <Text style={styles.emptyDescription}>
                    Make sure Bluetooth and WiFi are enabled, then tap refresh
                  </Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButtonActive: {
    backgroundColor: '#E3F2FD',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  sectionContainer: {
    paddingTop: 20,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    fontFamily: 'Inter-SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  listContainer: {
    paddingBottom: 20,
  },
});