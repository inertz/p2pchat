import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '@/types/chat';
import { Check, CheckCheck, Clock } from 'lucide-react-native';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showTime?: boolean;
}

export default function MessageBubble({ message, isOwn, showTime = true }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock size={12} color="#666" />;
      case 'sent':
        return <Check size={12} color="#666" />;
      case 'delivered':
        return <CheckCheck size={12} color="#666" />;
      case 'read':
        return <CheckCheck size={12} color="#4CAF50" />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, isOwn ? styles.ownMessage : styles.otherMessage]}>
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, isOwn ? styles.ownText : styles.otherText]}>
          {message.content}
        </Text>
        {showTime && (
          <View style={styles.timeContainer}>
            <Text style={[styles.timeText, isOwn ? styles.ownTime : styles.otherTime]}>
              {formatTime(message.timestamp)}
            </Text>
            {isOwn && (
              <View style={styles.statusIcon}>
                {getStatusIcon()}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ownBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  ownText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#000000',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    marginRight: 4,
  },
  ownTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherTime: {
    color: '#666',
  },
  statusIcon: {
    marginLeft: 2,
  },
});