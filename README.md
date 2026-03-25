# LocalPad 🚀
## The Developer's Command Center for Local Ports

Stop juggling `localhost` tabs. **LocalPad** is a premium Chrome extension that centralizes your local development environment. Manage your frontends, backends, and infrastructure services with single-tap access.

![LocalPad Screenshot](https://github.com/naumanch969/localpad/raw/main/public/icons/icon128.png)

---

### ✨ Features
- **My Pads**: Create custom labels and notes for your active development projects.
- **Multi-Port Support**: Each Pad can track multiple endpoints (e.g., API + Frontend).
- **Common Ports Library**: Instant access to standard infra ports (MongoDB, Redis, Postgres, Kafka, RabbitMQ, Docker, etc.).
- **Smart Search**: Filter through your project list with instant, high-performance search.
- **Privacy First**: Everything is stored locally on your machine using Chrome Storage API. No data ever leaves your browser.

### 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Glassmorphism Design)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

### 🚀 Getting Started

#### **For Users (Manual Installation)**
1. Download the [latest release](https://github.com/naumanch969/localpad/releases).
2. Open **Chrome** and go to `chrome://extensions/`.
3. Enable **Developer Mode** (top right toggle).
4. Click **Load Unpacked** and select the `dist` folder.

#### **For Developers (Development Environment)**
1. Clone the repo:
   ```bash
   git clone https://github.com/naumanch969/localpad.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server (HMR):
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

### 🛡️ Privacy Policy
LocalPad respects your privacy. No data is collected or shared. Read our full [Privacy Policy](./PRIVACY_POLICY.md).

### 📄 License
MIT License. Created with ❤️ by naumanch969.
