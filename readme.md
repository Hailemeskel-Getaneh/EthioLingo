

---

# EthioLingo

![EthioLingo Logo](https://via.placeholder.com/150) <!-- Replace with your logo URL -->

EthioLingo is a mobile application designed to make learning Ethiopian local languages (e.g., Amharic, Oromo, Tigrinya, Somali, Wolaytta) accessible, engaging, and culturally immersive. It offers structured lessons, pronunciation practice, interactive exercises, and gamification. The app follows a freemium model, with free basic lessons and premium content unlocked via subscriptions processed through the **Chapa payment gateway**, tailored for Ethiopian businesses.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Payment Integration with Chapa](#payment-integration-with-chapa)
- [Project Structure](#project-structure)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Multi-Language Support**: Learn Ethiopian languages with plans to expand globally.
- **Adaptive Lessons**: Lessons tailored to the user’s known language.
- **Interactive Content**: Audio pronunciation, flashcards, quizzes, and cultural insights.
- **Offline Mode**: Download lesson packs for offline use.
- **Progress Tracking**: Real-time progress with badges and stats.
- **Freemium Model**: Free basic lessons; premium content via Chapa payments.
- **User-Friendly**: Simple onboarding, intuitive navigation, and accessibility features.

## Tech Stack
- **Frontend**: React Native with Expo
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Payment Gateway**: Chapa
- **Third-Party Integrations**:
  - AWS Polly/Google TTS (Text-to-Speech)
  - Firebase Analytics (Usage Tracking)
- **Tools**: Redux (State Management), Figma (UI/UX Design)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Expo CLI (installed globally or via `npx`)
- Expo Go app (for mobile testing)
- Git

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Hailemeskel-Getaneh/EthioLingo.git
   cd EthioLingo
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory for the frontend and another in the `/backend` folder.
   - Add the following (replace with your own keys):
     ```
     # Frontend .env
     API_URL=http://localhost:3000/api
     CHAPA_PUBLIC_KEY=your_chapa_public_key

     # Backend .env
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     CHAPA_SECRET_KEY=your_chapa_secret_key
     AWS_POLLY_KEY=your_aws_key
     FIREBASE_CONFIG=your_firebase_config
     ```

## Usage
1. **Start the Backend**:
   ```bash
   cd backend
   npm run start
   ```

2. **Start the Frontend**:
   ```bash
   cd ..
   npx expo start
   ```
   - Scan the QR code with the Expo Go app on your Android/iOS device, or run in a simulator.

3. **Test Features**:
   - Sign up/login or use guest mode.
   - Explore free lessons (e.g., Amharic Basics).
   - Subscribe via Chapa for premium content.

## Payment Integration with Chapa
EthioLingo uses the **Chapa payment gateway** to process subscriptions for premium content, ideal for Ethiopian users. Here’s how it’s integrated:

### Frontend (React Native with Expo)
- **Setup**: Since Expo doesn’t natively support Chapa, we use a WebView to load Chapa’s checkout page.
- **Steps**:
  1. Install WebView dependency:
     ```bash
     expo install react-native-webview
     ```
  2. In `PaymentScreen`, initiate a payment request to the backend to get a Chapa checkout URL.
  3. Load the URL in a WebView and handle success/cancellation callbacks.
- **Sample Code** (in `screens/PaymentScreen.js`):
  ```javascript
  import { WebView } from 'react-native-webview';
  import { useState } from 'react';

  export default function PaymentScreen() {
    const [checkoutUrl, setCheckoutUrl] = useState(null);

    const initiatePayment = async () => {
      const response = await fetch(`${process.env.API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 299, email: 'user@example.com' }),
      });
      const data = await response.json();
      setCheckoutUrl(data.checkoutUrl);
    };

    return (
      checkoutUrl ? <WebView source={{ uri: checkoutUrl }} /> : <Button onPress={initiatePayment}>Pay with Chapa</Button>
    );
  }
  ```

### Backend (Node.js)
- **Setup**: Use the Chapa API to initialize transactions and verify payments.
- **Steps**:
  1. Install Axios:
     ```bash
     npm install axios
     ```
  2. Create an endpoint `/subscribe` to initialize a Chapa transaction.
  3. Verify payments via a `/verify` endpoint or webhook.
- **Sample Code** (in `backend/routes/paymentRoutes.js`):
  ```javascript
  const express = require('express');
  const axios = require('axios');
  const router = express.Router();

  router.post('/subscribe', async (req, res) => {
    const { amount, email } = req.body;
    const txRef = `tx-${Date.now()}`;
    const config = {
      headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`, 'Content-Type': 'application/json' },
    };
    const body = {
      amount,
      currency: 'ETB',
      email,
      tx_ref: txRef,
      return_url: 'http://localhost:3000/verify',
    };

    try {
      const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', body, config);
      res.json({ checkoutUrl: response.data.data.checkout_url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
  ```

- **Chapa Account**: Sign up at [chapa.co](https://chapa.co), get your secret/public keys, and test in sandbox mode.

## Project Structure
```
EthioLingo/
├── /src
│   ├── /assets           # Images, audio, fonts
│   ├── /components       # Reusable UI components
│   ├── /screens          # App screens (e.g., PaymentScreen)
│   ├── /services         # API calls (e.g., paymentService.js)
│   ├── /store            # Redux state
│   ├── /utils            # Helpers (e.g., languageMapper.js)
│   ├── /navigation       # Navigation setup
│   └── /styles           # Styles
├── /backend              # Server-side code
│   ├── /controllers      # API logic
│   ├── /models           # MongoDB schemas
│   ├── /routes           # API endpoints (e.g., paymentRoutes.js)
│   └── /config           # DB and env settings
├── /docs                 # PRD and API docs
├── /tests                # Tests
├── .env                  # Frontend env variables
├── package.json          # Frontend dependencies
└── README.md             # This file
```

## Team Members
- **John** - Email: [john@gmail.com](mailto:john@gmail.com)
- **Mieraf Abebe** - Email: [mieraf@gmail.com](mailto:mieraf@gmail.com)
- **Hailemeskel Getaneh** - Email: [hailegetaneh1221@gmail.com](mailto:hailegetaneh1221@gmail.com)

## Contributing
1. Fork the repository at [github.com/Hailemeskel-Getaneh/EthioLingo](https://github.com/Hailemeskel-Getaneh/EthioLingo).
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- **Email**: [support@ethiolingo.com](mailto:support@ethiolingo.com)
- **GitHub Issues**: [github.com/Hailemeskel-Getaneh/EthioLingo/issues](https://github.com/Hailemeskel-Getaneh/EthioLingo/issues)

---

### Notes
- **Chapa Integration**: Since Expo doesn’t natively support Chapa’s SDK, the WebView approach is used. If you need deeper integration (e.g., native modules), you’d need to eject from Expo or use a development build with custom native code, but this adds complexity.
- **Backend**: Assumes your backend is in the `/backend` folder and started with `npm run start`. Adjust paths/commands if your setup differs.
- **Security**: Keep `.env` files out of version control (add to `.gitignore`). Use HTTPS in production for Chapa callbacks.
- **Logo**: Replace the placeholder with your actual logo URL.
