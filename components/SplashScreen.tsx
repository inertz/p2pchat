import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { MessageCircle, Bluetooth, Wifi } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);
  const iconOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0.8);
  const backgroundOpacity = useSharedValue(1);

  useEffect(() => {
    // Logo animation
    logoScale.value = withDelay(
      200,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
      })
    );
    logoOpacity.value = withDelay(
      200,
      withTiming(1, { duration: 600 })
    );

    // Title animation
    titleOpacity.value = withDelay(
      800,
      withTiming(1, { duration: 600 })
    );
    titleTranslateY.value = withDelay(
      800,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) })
    );

    // Subtitle animation
    subtitleOpacity.value = withDelay(
      1200,
      withTiming(1, { duration: 600 })
    );
    subtitleTranslateY.value = withDelay(
      1200,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) })
    );

    // Icons animation
    iconOpacity.value = withDelay(
      1600,
      withTiming(1, { duration: 500 })
    );
    iconScale.value = withDelay(
      1600,
      withSequence(
        withTiming(1.1, { duration: 300 }),
        withTiming(1, { duration: 200 })
      )
    );

    // Fade out animation
    const timer = setTimeout(() => {
      backgroundOpacity.value = withTiming(0, { duration: 500 }, () => {
        onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, backgroundAnimatedStyle]}>
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.logoBackground}>
            <MessageCircle size={60} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View style={titleAnimatedStyle}>
          <Text style={styles.title}>P2P Chat</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Text style={styles.subtitle}>Connect • Chat • Share</Text>
        </Animated.View>

        {/* Connection Icons */}
        <Animated.View style={[styles.iconsContainer, iconAnimatedStyle]}>
          <View style={styles.iconWrapper}>
            <Bluetooth size={24} color="#2196F3" />
            <Text style={styles.iconLabel}>Bluetooth</Text>
          </View>
          <View style={styles.iconDivider} />
          <View style={styles.iconWrapper}>
            <Wifi size={24} color="#4CAF50" />
            <Text style={styles.iconLabel}>WiFi Direct</Text>
          </View>
        </Animated.View>
      </View>

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.patternDot,
              {
                left: (i % 5) * (width / 4),
                top: Math.floor(i / 5) * (height / 4),
                opacity: 0.05,
              },
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Inter-Medium',
    marginBottom: 60,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    backdropFilter: 'blur(10px)',
  },
  iconWrapper: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter-Medium',
    marginTop: 6,
  },
  iconDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  patternDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
});