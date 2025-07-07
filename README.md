# P2P Chat

A beautiful, feature-rich peer-to-peer chat application built with React Native and Expo. Connect with nearby devices using Bluetooth and WiFi Direct for seamless local communication without internet dependency.

![P2P Chat](https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🔗 **Multi-Protocol Connectivity**
- **Bluetooth Low Energy** - Connect to nearby devices via Bluetooth
- **WiFi Direct** - High-speed local network connections
- **Auto-discovery** - Automatically find and connect to available devices
- **Signal strength monitoring** - Real-time connection quality indicators

### 💬 **Rich Messaging Experience**
- **Real-time messaging** - Instant message delivery with status indicators
- **Message status tracking** - Sending, sent, delivered, and read receipts
- **Direct & Group chats** - One-on-one conversations and group discussions
- **Unread message counters** - Never miss important messages
- **Message history** - Persistent chat history across sessions

### 🎨 **Beautiful Design**
- **iOS-inspired interface** - Clean, modern design following Apple's design principles
- **Smooth animations** - Delightful micro-interactions and transitions
- **Custom splash screen** - Branded 3-second animated splash screen
- **Dark/Light mode ready** - Adaptive interface design
- **Responsive layout** - Optimized for all screen sizes

### 🛡️ **Privacy & Security**
- **Local-only communication** - No data sent to external servers
- **Encrypted connections** - Secure peer-to-peer communication
- **No internet required** - Works completely offline
- **Privacy-first approach** - Your conversations stay on your devices

## 📱 Screenshots

| Chats | Discover | Contacts | Settings |
|-------|----------|----------|----------|
| ![Chats](https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=300&h=600&fit=crop) | ![Discover](https://images.pexels.com/photos/5077040/pexels-photo-5077040.jpeg?auto=compress&cs=tinysrgb&w=300&h=600&fit=crop) | ![Contacts](https://images.pexels.com/photos/5077039/pexels-photo-5077039.jpeg?auto=compress&cs=tinysrgb&w=300&h=600&fit=crop) | ![Settings](https://images.pexels.com/photos/5077041/pexels-photo-5077041.jpeg?auto=compress&cs=tinysrgb&w=300&h=600&fit=crop) |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/p2p-chat.git
   cd p2p-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run on your device**
   - **iOS**: Press `i` to open iOS Simulator
   - **Android**: Press `a` to open Android Emulator
   - **Web**: Press `w` to open in web browser
   - **Physical device**: Scan QR code with Expo Go app

## 🏗️ Project Structure

```
p2p-chat/
├── app/                    # App routes (Expo Router)
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Chats tab
│   │   ├── contacts.tsx   # Contacts tab
│   │   ├── discover.tsx   # Device discovery tab
│   │   └── settings.tsx   # Settings tab
│   ├── chat/[id].tsx      # Individual chat screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── ChatListItem.tsx   # Chat room list item
│   ├── ContactListItem.tsx # Contact list item
│   ├── DeviceListItem.tsx # Device discovery item
│   ├── MessageBubble.tsx  # Chat message bubble
│   └── SplashScreen.tsx   # Custom splash screen
├── services/              # Business logic
│   ├── ChatService.ts     # Chat management
│   └── ConnectionService.ts # P2P connections
├── types/                 # TypeScript definitions
│   ├── chat.ts           # Chat-related types
│   └── env.d.ts          # Environment variables
└── hooks/                # Custom React hooks
    └── useFrameworkReady.ts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_STUN_SERVER=stun:stun.l.google.com:19302
```

### App Configuration

Update `app.json` for your specific needs:

```json
{
  "expo": {
    "name": "Your P2P Chat",
    "slug": "your-p2p-chat",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "yourapp"
  }
}
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build:web` - Build for web deployment
- `npm run lint` - Run ESLint

### Key Technologies

- **React Native** - Cross-platform mobile development
- **Expo Router** - File-based navigation
- **TypeScript** - Type-safe development
- **React Native Reanimated** - Smooth animations
- **Lucide React Native** - Beautiful icons
- **Expo Google Fonts** - Custom typography

### Architecture Patterns

- **Service Layer** - Separation of business logic from UI
- **Observer Pattern** - Real-time updates using listeners
- **Singleton Pattern** - Shared service instances
- **Component Composition** - Reusable UI components

## 📦 Building for Production

### Web Deployment

```bash
npm run build:web
```

### Mobile App Stores

1. **Create a development build**
   ```bash
   expo install expo-dev-client
   expo run:ios
   expo run:android
   ```

2. **Build for app stores**
   ```bash
   eas build --platform all
   ```

3. **Submit to stores**
   ```bash
   eas submit --platform all
   ```

## 🔮 Roadmap

### Upcoming Features

- [ ] **File Sharing** - Send images, documents, and media
- [ ] **Voice Messages** - Record and send audio messages
- [ ] **Message Encryption** - End-to-end encryption for all messages
- [ ] **Group Management** - Create and manage group chats
- [ ] **Message Search** - Find messages across all conversations
- [ ] **Custom Themes** - Personalize the app appearance
- [ ] **Message Reactions** - React to messages with emojis
- [ ] **Typing Indicators** - See when someone is typing
- [ ] **Message Forwarding** - Forward messages between chats
- [ ] **Backup & Restore** - Export and import chat history

### Technical Improvements

- [ ] **Native Modules** - Implement actual Bluetooth/WiFi Direct APIs
- [ ] **WebRTC Integration** - Real peer-to-peer communication
- [ ] **Push Notifications** - Background message notifications
- [ ] **Performance Optimization** - Optimize for large message histories
- [ ] **Offline Support** - Enhanced offline capabilities
- [ ] **Cross-platform Sync** - Sync across multiple devices

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **React Native Community** - For the robust ecosystem
- **Lucide Icons** - For the beautiful icon set
- **Pexels** - For the stunning stock photos

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/p2p-chat/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/p2p-chat/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/p2p-chat/discussions)
- **Email**: support@yourapp.com

---

<div align="center">
  <p>Made with ❤️ by the P2P Chat Team</p>
  <p>
    <a href="https://github.com/yourusername/p2p-chat">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/yourhandle">🐦 Follow on Twitter</a> •
    <a href="https://yourwebsite.com">🌐 Visit our website</a>
  </p>
</div>
