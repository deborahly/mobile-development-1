import { useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import typography from '../styles/typography';
import utilities from '../styles/utilities';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import BootstrapButton from 'react-bootstrap/Button';

function Account({ accountType, account, submitUpdate }) {
  const [form, setForm] = useState({
    email: account.email || 'Not informed',
    phone: account.phone || 'Not informed',
  });

  const handleChangeText = value => {
    return setForm(prev => ({ ...prev, ...value }));
  };

  const handleSubmit = async () => {
    const data = await submitUpdate(form);
    setForm(data);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Container style={styles.container}>
        <Row style={utilities.mbMedium}>
          <Col>
            <Text style={typography.h2}>MY ACCOUNT</Text>
          </Col>
        </Row>

        <Row style={utilities.mbMedium}>
          <Col>
            <Text style={typography.strong}>Logged In As: {accountType}</Text>
          </Col>
        </Row>

        <Form style={utilities.mbMedium}>
          <Form.Group style={utilities.mbSmall}>
            <Form.Label style={typography.label}>
              Primary Email (Read Only):
            </Form.Label>
            <Form.Control value={account.primary_email} editable={false} />
          </Form.Group>

          <Form.Group style={utilities.mbSmall}>
            <Form.Label style={typography.label}>Email:</Form.Label>
            <Form.Control
              type='email'
              onInput={e => handleChangeText({ email: e.target.value })}
              value={form && form.email}
            />
            <Text style={typography.label}>
              Email used for your {accountType} account
            </Text>
          </Form.Group>

          <Form.Group style={utilities.mbSmall}>
            <Form.Label style={typography.label}>Phone:</Form.Label>
            <Form.Control
              type='text'
              onInput={e => handleChangeText({ phone: e.target.value })}
              value={form && form.phone}
            />
            <Text style={typography.label}>
              Phone number for your {accountType} account
            </Text>
          </Form.Group>
        </Form>

        <BootstrapButton
          as='input'
          type='button'
          value='Update Account'
          onClick={handleSubmit}
          style={StyleSheet.flatten([styles.button, utilities.width100])}
        />
      </Container>
    </SafeAreaView>
  );
}

export default Account;
