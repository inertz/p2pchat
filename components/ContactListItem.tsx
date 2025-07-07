import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '@/types/chat';
import { Bluetooth, Wifi, Signal } from 'lucide-react-native';

interface ContactListItemProps {
  user: User;
  onPress: () => void;
}

export default function ContactListItem({ user, onPress }: ContactListItemProps) {
  const getConnectionIcon = () => {
    if (user.connectionType === 'bluetooth') {
      return <Bluetooth size={16} color="#2196F3" />;
    }
    return <Wifi size={16} color="#4CAF50" />;
  };

  const getStatusText = () => {
    if (user.isOnline) {
      return 'Online';
    }
    if (user.lastSeen) {
      const now = new Date();
      const diff = now.getTime() - user.lastSeen.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      
      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      return user.lastSeen.toLocaleDateString();
    }
    return 'Offline';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name.charAt(0).toUpperCase()}
        </Text>
        {user.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {user.name}
            </Text>
            {getConnectionIcon()}
          </View>
          <View style={styles.signalContainer}>
            <Signal size={12} color="#666" />
          </View>
        </View>
        <Text style={[styles.status, user.isOnline && styles.onlineStatus]}>
          {getStatusText()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  signalContainer: {
    padding: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  onlineStatus: {
    color: '#4CAF50',
  },
});