import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Pressable, View } from 'react-native';
import styles from '../styles/styles';

const CheckConfirmationForm = ({ checkForm, setCheckForm }) => {
  const [smsCheck, setSmsCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const toggleCheck = checkName => {
    if (checkName === 'sms') {
      return setSmsCheck(!smsCheck);
    }
    return setEmailCheck(!emailCheck);
  };

  useEffect(() => {
    if (smsCheck && emailCheck) setCheckForm(['sms', 'email']);
    if (smsCheck && !emailCheck) setCheckForm(['sms']);
    if (!smsCheck && emailCheck) setCheckForm(['email']);
    if (!smsCheck && !emailCheck) setCheckForm([]);
  }, [smsCheck, emailCheck]);

  return (
    <Form>
      <View className='mb-3' style={styles.checkForm}>
        <Pressable onPress={() => toggleCheck('sms')}>
          <Form.Check
            inline
            label='SMS'
            name='sms'
            type='radio'
            id='inline-radio-1'
            onChange={() => console.log('check')}
            checked={smsCheck}
          />
        </Pressable>

        <Pressable onPress={() => toggleCheck('email')}>
          <Form.Check
            inline
            label='Email'
            name='email'
            type='radio'
            id='inline-radio-2'
            onChange={() => console.log('check')}
            checked={emailCheck}
          />
        </Pressable>
      </View>
    </Form>
  );
};

export default CheckConfirmationForm;
