import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, Button } from 'react-native';
import accountUtils from '../utils/accountUtils';
import colors from '../styles/colors';

function Account({ accountType, account, submitUpdate }) {
  const [form, setForm] = useState({
    email: account.email,
    phone: account.phone,
  });

  const handleChangeText = value => {
    return setForm(prev => ({ ...prev, ...value }));
  };

  const handleSubmit = async () => {
    const data = await submitUpdate(form);
    setForm(data);
  };

  return (
    <SafeAreaView>
      <Text>MY ACCOUNT</Text>
      <Text>Logged In As: {accountType}</Text>

      <Text>Primary Email (Read Only):</Text>
      <TextInput value={account.primary_email} editable={false} />
      <Text>Email used to login to the application</Text>

      <Text>{accountType} Email:</Text>
      <TextInput
        onChangeText={text => handleChangeText({ email: text })}
        value={form.email || account.email || 'Not informed'}
      />
      <Text>Email used for your {accountType} account</Text>

      <Text>{accountType} Phone:</Text>
      <TextInput
        onChangeText={text => handleChangeText({ phone: text })}
        value={form.phone || account.phone || 'Not informed'}
      />
      <Text>Phone number for your {accountType} account</Text>

      <Button
        onPress={handleSubmit}
        color={colors.primary}
        title='Update Account'
        accessibilityLabel='Submit update account'
      />
    </SafeAreaView>
  );
}

export default Account;
