import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthenticationScreen from './app/screens/AuthenticationScreen';

import colors from './app/config/colors';

export default function App() {
  return (
    <AuthenticationScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
