import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCar } from '@fortawesome/free-solid-svg-icons/faCar';
import styles from '../styles/styles';
import utilities from '../styles/utilities';

function AccountSelectScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.loginImage}
        source={require('../assets/AppLogoV2.png')}
      />

      <View style={styles.flexBoxRow}>
        <TouchableOpacity
          key='customer-app'
          onPress={() =>
            props.navigation.navigate('AppTab', {
              screen: 'RestaurantStack',
            })
          }
        >
          <Card style={styles.accountCard}>
            <Card.Body>
              <View style={styles.accountSvg}>
                <FontAwesomeIcon
                  icon={faUser}
                  size='sm'
                  style={styles.userSvg}
                />
              </View>
              <Card.Title style={utilities.textCenter}>Customer</Card.Title>
            </Card.Body>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          key='courier-app'
          onPress={() =>
            props.navigation.navigate('CourierAppTab', {
              screen: 'Deliveries',
            })
          }
        >
          <Card style={styles.accountCard}>
            <Card.Body>
              <View style={styles.accountSvg}>
                <FontAwesomeIcon
                  icon={faCar}
                  style={{ color: '#222126' }}
                  size='sm'
                />
              </View>
              <Card.Title style={utilities.textCenter}>Courier</Card.Title>
            </Card.Body>
          </Card>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AccountSelectScreen;
