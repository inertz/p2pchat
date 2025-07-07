import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { User } from '@/types/chat';
import { ConnectionService } from '@/services/ConnectionService';
import { ChatService } from '@/services/ChatService';
import ContactListItem from '@/components/ContactListItem';
import { UserPlus } from 'lucide-react-native';

export default function ContactsTab() {
  const [contacts, setContacts] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const connectionService = ConnectionService.getInstance();
    setContacts(connectionService.getConnectedUsers());
    setIsLoading(false);

    const unsubscribe = connectionService.onUsersChanged(setContacts);
    return unsubscribe;
  }, []);

  const handleContactPress = (user: User) => {
    const chatService = ChatService.getInstance();
    const existingRooms = chatService.getChatRooms();
    
    // Find existing direct chat room
    const existingRoom = existingRooms.find(room => 
      room.type === 'direct' && room.participants.includes(user.id)
    );

    if (existingRoom) {
      router.push(`/chat/${existingRoom.id}`);
    } else {
      // Create new direct chat room
      const newRoom = chatService.createChatRoom(
        user.name,
        ['user', user.id],
        'direct'
      );
      router.push(`/chat/${newRoom.id}`);
    }
  };

  const handleAddContact = () => {
    router.push('/discover');
  };

  const renderContact = ({ item }: { item: User }) => (
    <ContactListItem
      user={item}
      onPress={() => handleContactPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <UserPlus size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading contacts...</Text>
        </View>
      ) : contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No contacts yet</Text>
          <Text style={styles.emptyDescription}>
            Discover and connect to nearby devices to add contacts
          </Text>
          <TouchableOpacity style={styles.discoverButton} onPress={handleAddContact}>
            <Text style={styles.discoverButtonText}>Discover Devices</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 30,
    fontFamily: 'Inter-Regular',
  },
  discoverButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  discoverButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});