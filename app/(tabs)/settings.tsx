import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Bluetooth, Wifi, User, Bell, Shield, Info } from 'lucide-react-native';

export default function SettingsTab() {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);

  const handleProfilePress = () => {
    Alert.alert(
      'Profile',
      'Profile settings will be implemented in a future version',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert(
      'Privacy & Security',
      'Privacy settings will be implemented in a future version',
      [{ text: 'OK' }]
    );
  };

  const handleAboutPress = () => {
    Alert.alert(
      'About',
      'P2P Chat App\nVersion 1.0.0\n\nBuilt with React Native and Expo',
      [{ text: 'OK' }]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightComponent 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
      {rightComponent && (
        <View style={styles.settingRight}>
          {rightComponent}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection</Text>
          
          <SettingItem
            icon={<Bluetooth size={20} color="#2196F3" />}
            title="Bluetooth"
            subtitle="Enable Bluetooth device discovery"
            rightComponent={
              <Switch
                value={bluetoothEnabled}
                onValueChange={setBluetoothEnabled}
                trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                thumbColor={bluetoothEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          
          <SettingItem
            icon={<Wifi size={20} color="#4CAF50" />}
            title="WiFi Direct"
            subtitle="Enable WiFi Direct connections"
            rightComponent={
              <Switch
                value={wifiEnabled}
                onValueChange={setWifiEnabled}
                trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                thumbColor={wifiEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          
          <SettingItem
            icon={<User size={20} color="#FF9500" />}
            title="Auto Connect"
            subtitle="Automatically connect to known devices"
            rightComponent={
              <Switch
                value={autoConnect}
                onValueChange={setAutoConnect}
                trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                thumbColor={autoConnect ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <SettingItem
            icon={<User size={20} color="#007AFF" />}
            title="Profile"
            subtitle="Manage your profile and display name"
            onPress={handleProfilePress}
          />
          
          <SettingItem
            icon={<Bell size={20} color="#FF3B30" />}
            title="Notifications"
            subtitle="Message and connection notifications"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          
          <SettingItem
            icon={<Shield size={20} color="#8E8E93" />}
            title="Privacy & Security"
            subtitle="Control your privacy settings"
            onPress={handlePrivacyPress}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <SettingItem
            icon={<Info size={20} color="#8E8E93" />}
            title="About"
            subtitle="Version and app information"
            onPress={handleAboutPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
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
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'Inter-SemiBold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  settingRight: {
    marginLeft: 12,
  },
});