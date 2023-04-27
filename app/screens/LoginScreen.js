import React from 'react';
import { useAuth } from '../auth.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import colors from '../styles/colors.js';

const LoginScreen = () => {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const { signIn } = useAuth();

  const handleChangeText = value => {
    return setForm(prev => ({ ...prev, ...value }));
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
          onPress={() => signIn(form)}
          title='Log In'
          color={colors.primary}
          accessibilityLabel='Submit log in form'
        />
      </View>
    </SafeAreaView>
  );
};

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
    borderRadius: 5,
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

export default LoginScreen;
