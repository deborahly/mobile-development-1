import { useAuth } from '../auth.js';
import { View, Image } from 'react-native';
import styles from '../styles/styles.js';
import BootstrapButton from 'react-bootstrap/Button';

const Header = () => {
  const { signOut } = useAuth();

  return (
    <View style={[styles.headerContainer, styles.shadowProp]}>
      <Image
        style={styles.headerImage}
        source={require('../assets/AppLogoV1.png')}
      />

      <BootstrapButton
        as='input'
        type='button'
        value='Log Out'
        onClick={() => signOut()}
        style={styles.smallButton}
      />
    </View>
  );
};

export default Header;
