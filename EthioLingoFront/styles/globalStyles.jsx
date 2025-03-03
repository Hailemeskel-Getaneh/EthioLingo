
import { useFonts } from 'expo-font';

export const globalStyles = {
  text: {
    fontFamily: 'geez',
    fontSize: 16,
  },
};

export const loadFonts = () => {
  const [fontsLoaded] = useFonts({
    geez: require('../assets/fonts/geez.ttf'),
    latin: require('../assets/fonts/latin.ttf'),
  });
  return fontsLoaded;
};