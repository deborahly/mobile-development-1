import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import helpersUtils from '../utils/helpersUtils';
import ordersUtils from '../utils/ordersUtils';
import styles from '../styles/styles.js';
import utilities from '../styles/utilities.js';
import typography from '../styles/typography.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import CheckConfirmationForm from './CheckConfirmationForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BasicToast from '../components/BasicToast.js';

const OrderConfirmModal = ({
  modalVisible,
  setModalVisible,
  order,
  restaurantId,
  customerId,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchResult, setFetchResult] = useState(null);
  const [checkForm, setCheckForm] = useState([]);
  const [toast, setToast] = useState({ title: '', message: '', show: false });

  const handleConfirmOrder = async () => {
    if (checkForm.length === 0) {
      return setToast({
        title: 'Error',
        message: 'Please check at least one notification type.',
        show: true,
      });
    }

    setLoading(true);
    const data = await ordersUtils.createOrder(
      restaurantId,
      customerId,
      order,
      checkForm
    );
    setLoading(false);

    if (data.id) {
      setFetchResult('success');
    } else {
      setFetchResult('failed');
    }

    return;
  };

  return (
    <View>
      <Modal show={modalVisible} centered={true}>
        <Modal.Dialog>
          <View style={styles.modalHeader}>
            <Modal.Header
              closeButton
              closeVariant='white'
              onHide={() => setModalVisible(!modalVisible)}
            >
              <Modal.Title style={typography.h3}>
                Order Confirmation
              </Modal.Title>
            </Modal.Header>
          </View>

          <Modal.Body>
            <Text style={typography.h2}>Order Summary</Text>
            {Object.entries(order).find(item => item[1].quantity != 0) ? (
              [
                Object.entries(order).map((item, i) => {
                  if (item[1].quantity != 0) {
                    return (
                      <Row style={typography.medium} key={i}>
                        <Col>{item[0]}</Col>
                        <Col style={utilities.textRight}>
                          x&nbsp;{item[1].quantity}
                        </Col>
                        <Col style={utilities.textRight}>
                          $&nbsp;
                          {helpersUtils.formatCost(
                            item[1].cost * item[1].quantity
                          )}
                        </Col>
                      </Row>
                    );
                  }
                }),
                <View style={styles.modalTotal}>
                  <Text
                    style={StyleSheet.flatten([
                      styles.modalTotalContent,
                      typography.strong,
                    ])}
                  >
                    TOTAL:&nbsp;$
                    {helpersUtils.calculateOrder(order)}
                  </Text>
                </View>,
              ]
            ) : (
              <Text style={utilities.textCenter}>No items added</Text>
            )}
          </Modal.Body>

          <Modal.Footer style={styles.modalFooter}>
            {loading ? (
              <Button
                as='input'
                type='button'
                value='Processing Order...'
                onClick={handleConfirmOrder}
                style={StyleSheet.flatten([styles.button, utilities.width100])}
              />
            ) : fetchResult == 'success' ? (
              <Text></Text>
            ) : (
              [
                <Text style={utilities.textCenter}>
                  Would you like to receive your order confirmation by email
                  and/or text?
                </Text>,
                <CheckConfirmationForm
                  checkForm={checkForm}
                  setCheckForm={setCheckForm}
                />,
                <Button
                  as='input'
                  type='button'
                  value='Confirm Order'
                  onClick={handleConfirmOrder}
                  style={StyleSheet.flatten([
                    styles.button,
                    utilities.width100,
                  ])}
                />,
              ]
            )}

            {fetchResult == 'success' && (
              <Text>
                <View style={styles.modalIcon}>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: '#609475' }}
                    size='sm'
                  />
                </View>
                <View>
                  <Text style={utilities.textCenter}>
                    Thank you! Your order has been received.
                  </Text>
                </View>
              </Text>
            )}

            {fetchResult == 'failed' && (
              <Text>
                <View style={styles.modalIcon}>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: '#851919' }}
                    size='sm'
                  />
                </View>
                <View>
                  <Text style={utilities.textCenter}>
                    Your order was not processed successfully. Please try again.
                  </Text>
                </View>
              </Text>
            )}
          </Modal.Footer>
        </Modal.Dialog>
        <BasicToast toast={toast} setToast={setToast} />
      </Modal>
    </View>
  );
};

export default OrderConfirmModal;
