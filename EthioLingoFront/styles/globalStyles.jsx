// styles/globalStyles.js
import { StyleSheet, Dimensions } from 'react-native';

// Get initial screen width from Dimensions
const { width } = Dimensions.get('window');

// Colors
export const colors = {
  primaryBackground: '#313574',
  homeBackground: '#8257fe',
  primaryText: '#f0f2f5',
  secondaryText: '#212121',
  screenBackground: '#fafafb',
  screenText: '#222469',
  screenText2: '#060614',
  listBarBackground: '#ffffff',
  listBarText: '#131313',
  blueColor: '#211C84',
  error: 'red',
  accent1: '#fbfaff',
  accent2: '#70a595',
  accent3: '#959163',
  accent4: '#d4ac9a',
  accent5: '#e0c4aa',
  accent6: '#e1e2f0',
  accent7: '#f1f2c2',
};

// Define screen size breakpoints
const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 768;
const isLargeScreen = width >= 768;

// Create global styles based on the initial width
export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    padding: isSmallScreen ? 8 : isMediumScreen ? 12 : 16,
  },
  screenText: {
    color: colors.screenText,
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
  },
  screenText2: {
    color: colors.screenText2,
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
  },
  primaryButton: {
    backgroundColor: colors.primaryBackground,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.primaryText,
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primaryBackground,
  },
  secondaryButtonText: {
    color: colors.primaryBackground,
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    fontWeight: 'bold',
  },


  listBar: {
    backgroundColor: colors.listBarBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  listBarText: {
    color: colors.listBarText,
    fontSize: isSmallScreen ? 18 : isMediumScreen ? 20 : 23,
    fontWeight: '500',
  },

  
  iconContainer: {
    backgroundColor: colors.accent2,
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },


  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },


  title: {
    fontSize: isSmallScreen ? 22 : isMediumScreen ? 24 : 28,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    color: colors.secondaryText,
  },


  button: {
    borderRadius: 8,
    padding: isSmallScreen ? 10 : isMediumScreen ? 12 : 14,
  },
  buttonText: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    color: colors.primaryText,
  },


  card: {
    backgroundColor: colors.accent6,
    padding: isSmallScreen ? 12 : isMediumScreen ? 16 : 20,
    borderRadius: 8,
    marginVertical: 10,
  },


  heading: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    fontWeight: 'bold',
    color: colors.primaryText,
  },


  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },


  avatar: {
    width: isSmallScreen ? 60 : isMediumScreen ? 80 : 100,
    height: isSmallScreen ? 60 : isMediumScreen ? 80 : 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primaryBackground,
  },


  text: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    color: colors.primaryText,
  },

  cardText: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    color: colors.secondaryText,
  },
});