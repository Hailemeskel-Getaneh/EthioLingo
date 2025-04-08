// /EthioLingoFront/App.js

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  // GoogleSignin.configure({
  //   webClientId:'249120062147-7kl2bobkt4sel592labkohg0ekn07bdl.apps.googleusercontent.com'
  // });
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
