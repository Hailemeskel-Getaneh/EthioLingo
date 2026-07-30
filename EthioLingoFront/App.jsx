import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LessonProvider } from './contexts/LessonContext';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <LessonProvider>
            <AppNavigator />
          </LessonProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
