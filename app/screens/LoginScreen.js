import { useState } from 'react';
import { useAuth } from '../auth.js';
import { Text, View, Image, SafeAreaView, StyleSheet } from 'react-native';
import styles from '../styles/styles.js';
import utilities from '../styles/utilities.js';
import typography from '../styles/typography.js';
import Form from 'react-bootstrap/Form';
import BootstrapButton from 'react-bootstrap/Button';
import BasicToast from '../components/BasicToast.js';

const LoginScreen = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ title: '', message: '', show: false });
  const { signIn } = useAuth();

  const handleChangeText = value => {
    return setForm(prev => ({ ...prev, ...value }));
  };

  const handleSignIn = async form => {
    const userSignedIn = await signIn(form);
    if (userSignedIn === false) {
      return setToast({
        title: 'Error',
        message: 'Invalid email or password. Please, try again.',
        show: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.loginImage}
        source={require('../assets/AppLogoV2.png')}
      />

      <View style={styles.box}>
        <View style={styles.boxContent}>
          <Text style={typography.h2}>Welcome Back!</Text>
          <Text style={utilities.mbSmall}>Login to begin</Text>
          
          <Form>
            <Form.Group style={utilities.mbSmall}>
              <Form.Label style={typography.label}>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your primary email here'
                onInput={e => handleChangeText({ email: e.target.value })}
                value={form.email}
              />
            </Form.Group>

            <Form.Group style={utilities.mbMedium}>
              <Form.Label style={typography.label}>Email</Form.Label>
              <Form.Control
                type='password'
                placeholder='**********'
                onInput={e => handleChangeText({ password: e.target.value })}
                value={form.password}
              />
            </Form.Group>
          </Form>

          <BootstrapButton
            as='input'
            type='button'
            value='Log In'
            onClick={() => handleSignIn(form)}
            style={StyleSheet.flatten([styles.button, utilities.width100])}
          />
        </View>
      </View>

      <BasicToast toast={toast} setToast={setToast} />
    </SafeAreaView>
  );
};

export default LoginScreen;
