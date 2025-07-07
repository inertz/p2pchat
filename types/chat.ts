export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  connectionType: 'bluetooth' | 'wifi' | 'cellular';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  roomId?: string;
  content: string;
  type: 'text' | 'image' | 'file';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
}

export interface Device {
  id: string;
  name: string;
  type: 'bluetooth' | 'wifi';
  signalStrength: number;
  isConnected: boolean;
  distance?: number;
}