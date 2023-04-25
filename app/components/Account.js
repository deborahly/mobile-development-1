import { SafeAreaView, Text, TextInput, Button } from 'react-native';
import colors from '../config/colors';

function Account({ accountType, account }) {
  return (
    <SafeAreaView>
      <Text>MY ACCOUNT</Text>
      <Text>Logged In As: {accountType}</Text>

      <Text>Primary Email (Read Only):</Text>
      <TextInput
        // onChangeText={onChangeText}
        value={account.primary_email}
        editable={false}
      />
      <Text>Email used to login to the application</Text>

      <Text>{accountType} Email:</Text>
      <TextInput
        // onChangeText={onChangeText}
        value={account.email || 'Not informed'}
      />
      <Text>Email used for your {accountType} account</Text>

      <Text>{accountType} Phone:</Text>
      <TextInput
        // onChangeText={onChangeText}
        value={account.phone || 'Not informed'}
      />
      <Text>Phone number for your {accountType} account</Text>

      <Button
        // onPress={() => setModalVisible(true)}
        color={colors.primary}
        title='Update Account'
        accessibilityLabel='Submit update account'
      />
    </SafeAreaView>
  );
}

export default Account;
