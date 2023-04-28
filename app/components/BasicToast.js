import Toast from 'react-bootstrap/Toast';
import { View } from 'react-native';
import styles from '../styles/styles';

const BasicToast = ({ toast, setToast }) => {
  setTimeout(() => setToast(prev => ({ ...prev, show: false })), 10000);

  return (
    <View style={styles.toast}>
      <Toast
        show={toast.show}
        onClick={() => setToast(prev => ({ ...prev, show: false }))}
      >
        <Toast.Header>
          <strong className='me-auto'>{toast.title}</strong>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </View>
  );
};

export default BasicToast;
