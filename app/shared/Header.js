import React from 'react';
import { useAuth } from '../auth.js';
import { View, Image, Button, StyleSheet } from 'react-native';
import colors from '../config/colors.js';

const Header = () => {
  const { signOut } = useAuth();

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Image
        style={styles.headerImage}
        source={require('../assets/AppLogoV1.png')}
      />
      <Button
        onPress={() => signOut()}
        title='Log Out'
        color={colors.primary}
        accessibilityLabel='Submit log out form'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerImage: {
    position: 'relative',
    height: 40,
    width: '50%',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default Header;
