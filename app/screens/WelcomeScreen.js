import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: '20px',
  },
});

export default WelcomeScreen;
