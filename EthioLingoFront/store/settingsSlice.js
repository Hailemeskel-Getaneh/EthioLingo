const initialState = {
  theme: 'light',
  notificationsEnabled: true,
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'settings/setTheme':
      return { ...state, theme: action.payload };
    case 'settings/setNotifications':
      return { ...state, notificationsEnabled: !!action.payload };
    default:
      return state;
  }
}
