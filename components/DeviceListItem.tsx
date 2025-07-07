import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Device } from '@/types/chat';
import { Bluetooth, Wifi, Signal } from 'lucide-react-native';

interface DeviceListItemProps {
  device: Device;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function DeviceListItem({ device, onConnect, onDisconnect }: DeviceListItemProps) {
  const getConnectionIcon = () => {
    if (device.type === 'bluetooth') {
      return <Bluetooth size={20} color="#2196F3" />;
    }
    return <Wifi size={20} color="#4CAF50" />;
  };

  const getSignalBars = () => {
    const bars = Math.ceil(device.signalStrength / 25);
    return Array.from({ length: 4 }, (_, i) => (
      <View
        key={i}
        style={[
          styles.signalBar,
          { opacity: i < bars ? 1 : 0.3 }
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getConnectionIcon()}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {device.name}
          </Text>
          <View style={styles.signalContainer}>
            {getSignalBars()}
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailText}>
            {device.type === 'bluetooth' ? 'Bluetooth' : 'WiFi Direct'}
          </Text>
          {device.distance && (
            <Text style={styles.detailText}>
              {device.distance}m away
            </Text>
          )}
          <Text style={styles.detailText}>
            {device.signalStrength}% signal
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.actionButton,
          device.isConnected ? styles.disconnectButton : styles.connectButton
        ]}
        onPress={device.isConnected ? onDisconnect : onConnect}
      >
        <Text style={[
          styles.actionText,
          device.isConnected ? styles.disconnectText : styles.connectText
        ]}>
          {device.isConnected ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  signalBar: {
    width: 3,
    backgroundColor: '#4CAF50',
    marginLeft: 1,
    borderRadius: 1,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: '#007AFF',
  },
  disconnectButton: {
    backgroundColor: '#FF3B30',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  connectText: {
    color: '#FFFFFF',
  },
  disconnectText: {
    color: '#FFFFFF',
  },
});

// Add signal bar heights
const signalHeights = [6, 9, 12, 15];
signalHeights.forEach((height, index) => {
  styles.signalBar = {
    ...styles.signalBar,
    height: signalHeights[index % signalHeights.length],
  };
});