import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import asyncStorageHelpers from '../helpers/async-storage.helpers.js';

import colors from '../config/colors';

function AuthenticationScreen(props) {
  const [form, setForm] = React.useState({ email: '', password: '' });

  const handleChangeText = value => {
    return setForm(prev => ({ ...prev, ...value }));
  };

  const handleOnPress = async () => {
    console.log(form);
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      await asyncStorageHelpers.storeObjectData('@user', data);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.loginImage}
        source={require('../assets/AppLogoV2.png')}
      />
      <View style={styles.formBox}>
        <Text>Welcome Back!</Text>
        <Text>Login to begin</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChangeText({ email: text })}
          value={form.email}
          placeholder='Email'
        />
        <TextInput
          style={styles.input}
          onChangeText={text => handleChangeText({ password: text })}
          value={form.password}
          placeholder='Password'
        />
        <Button
          onPress={handleOnPress}
          title='Log In'
          color={colors.primary}
          accessibilityLabel='Submit log in form'
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImage: {
    position: 'relative',
    height: 130,
    width: '75%',
  },
  formBox: {
    border: '1px solid black',
    borderRadius: '5px',
    height: '30%',
    width: '75%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AuthenticationScreen;
