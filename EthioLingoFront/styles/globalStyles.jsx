
import { StyleSheet } from 'react-native';

export const colors = {
  primaryBackground: '#313574',
  primaryText: '#f0f2f5', 
  screenBackground: '#fafafb', 
  screenText: '#222469', 
  listBarBackground: '#ffffff', 
  listBarText: '#131313', 
  accent1: '#fbfaff',
  accent2: '#70a595',
  accent3: '#959163',
  accent4: '#d4ac9a',
  accent5: '#e0c4aa',
};

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  screenText: {
    color: colors.screenText,
    fontSize: 19,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
secondaryButton:{
  backgroundColor: "white",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor:colors.primaryBackground,
},
secondaryButtonText:{
  color: colors.primaryBackground,
  fontSize: 16,
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
    fontSize: 23,
    fontWeight: '500',
  },

  iconContainer: {
    backgroundColor: colors.accent2, 
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});