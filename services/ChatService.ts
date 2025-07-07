import { Message, ChatRoom, User } from '@/types/chat';
import { Platform } from 'react-native';

export class ChatService {
  private static instance: ChatService;
  private messages: Message[] = [];
  private chatRooms: ChatRoom[] = [];
  private messageListeners: ((messages: Message[]) => void)[] = [];
  private roomListeners: ((rooms: ChatRoom[]) => void)[] = [];

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Create mock chat rooms
    this.chatRooms = [
      {
        id: '1',
        name: 'iPhone 12 Pro',
        type: 'direct',
        participants: ['user', '1'],
        unreadCount: 2,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        lastMessage: {
          id: '1',
          senderId: '1',
          receiverId: 'user',
          content: 'Hey! Are you there?',
          type: 'text',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          status: 'delivered'
        }
      },
      {
        id: '2',
        name: 'Local Network Group',
        type: 'group',
        participants: ['user', '1', '2', '3'],
        unreadCount: 0,
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        lastMessage: {
          id: '2',
          senderId: '2',
          roomId: '2',
          content: 'Welcome to the group!',
          type: 'text',
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          status: 'read'
        }
      }
    ];

    // Create mock messages
    this.messages = [
      {
        id: '1',
        senderId: '1',
        receiverId: 'user',
        content: 'Hey! Are you there?',
        type: 'text',
        timestamp: new Date(Date.now() - 3600000),
        status: 'delivered'
      },
      {
        id: '2',
        senderId: 'user',
        receiverId: '1',
        content: 'Yes, I\'m here! How are you?',
        type: 'text',
        timestamp: new Date(Date.now() - 3300000),
        status: 'read'
      },
      {
        id: '3',
        senderId: '1',
        receiverId: 'user',
        content: 'Great! The local network connection is working perfectly.',
        type: 'text',
        timestamp: new Date(Date.now() - 3000000),
        status: 'delivered'
      }
    ];
  }

  async sendMessage(message: Omit<Message, 'id' | 'timestamp' | 'status'>): Promise<Message> {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'sending'
    };

    this.messages.push(newMessage);
    this.notifyMessageListeners();

    // Simulate message delivery
    setTimeout(() => {
      newMessage.status = 'sent';
      this.notifyMessageListeners();
    }, 1000);

    setTimeout(() => {
      newMessage.status = 'delivered';
      this.notifyMessageListeners();
    }, 2000);

    // Update chat room's last message
    const room = this.chatRooms.find(r => 
      r.id === message.roomId || 
      (r.type === 'direct' && r.participants.includes(message.receiverId || ''))
    );
    
    if (room) {
      room.lastMessage = newMessage;
      this.notifyRoomListeners();
    }

    return newMessage;
  }

  getMessages(roomId?: string, userId?: string): Message[] {
    return this.messages.filter(msg => 
      msg.roomId === roomId || 
      (msg.senderId === userId || msg.receiverId === userId)
    );
  }

  getChatRooms(): ChatRoom[] {
    return this.chatRooms.sort((a, b) => {
      const aTime = a.lastMessage?.timestamp || a.createdAt;
      const bTime = b.lastMessage?.timestamp || b.createdAt;
      return bTime.getTime() - aTime.getTime();
    });
  }

  createChatRoom(name: string, participants: string[], type: 'direct' | 'group'): ChatRoom {
    const room: ChatRoom = {
      id: Date.now().toString(),
      name,
      type,
      participants,
      unreadCount: 0,
      createdAt: new Date()
    };

    this.chatRooms.push(room);
    this.notifyRoomListeners();
    return room;
  }

  markAsRead(roomId: string): void {
    const room = this.chatRooms.find(r => r.id === roomId);
    if (room) {
      room.unreadCount = 0;
      this.notifyRoomListeners();
    }
  }

  onMessagesChanged(callback: (messages: Message[]) => void): () => void {
    this.messageListeners.push(callback);
    return () => {
      this.messageListeners = this.messageListeners.filter(l => l !== callback);
    };
  }

  onRoomsChanged(callback: (rooms: ChatRoom[]) => void): () => void {
    this.roomListeners.push(callback);
    return () => {
      this.roomListeners = this.roomListeners.filter(l => l !== callback);
    };
  }

  private notifyMessageListeners(): void {
    this.messageListeners.forEach(callback => callback(this.messages));
  }

  private notifyRoomListeners(): void {
    this.roomListeners.forEach(callback => callback(this.chatRooms));
  }
}