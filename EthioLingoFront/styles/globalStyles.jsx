// /EthioLingoFront/styles/globalStyles.js

import { StyleSheet } from 'react-native';

export const colors = {
  // Main theme colors
  primaryBackground: '#313574',
  primaryText: '#f0f2f5', 
  screenBackground: '#fafafb', 
  screenText: '#222469', 
  listBarBackground: '#ffffff', 
  listBarText: '#131313', 

  // Additional colors for icons and accents
  accent1: '#fbfaff',
  accent2: '#70a595',
  accent3: '#959163',
  accent4: '#d4ac9a',
  accent5: '#e0c4aa',
};

export const globalStyles = StyleSheet.create({
  // Base styles for screens
  screenContainer: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  screenText: {
    color: colors.screenText,
    fontSize: 16,
  },

  // Styles for buttons
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
    fontSize: 16,
    fontWeight: '600',
  },

  // Styles for small horizontal bars (e.g., languages list)
  
  listBar: {
    backgroundColor: colors.listBarBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  listBarText: {
    color: colors.listBarText,
    fontSize: 14,
    fontWeight: '500',
  },

  // Styles for icons containers (you can use these as background for icons)
  iconContainer: {
    backgroundColor: colors.accent2, 
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});