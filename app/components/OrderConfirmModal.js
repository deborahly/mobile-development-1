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

  const handleConfirmOrder = async () => {
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
                Object.entries(order).map(item => {
                  if (item[1].quantity != 0) {
                    return (
                      <View style={styles.item}>
                        <Text>{item[0]}</Text>
                        <Text>x&nbsp;{item[1].quantity}</Text>
                        <Text>
                          $&nbsp;
                          {helpersUtils.formatCost(
                            item[1].cost * item[1].quantity
                          )}
                        </Text>
                      </View>
                    );
                  }
                }),
                <View style={styles.modalTotal}>
                  <Text style={styles.modalTotalContent}>
                    <span style={typography.strong}>TOTAL:</span>&nbsp;
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
      </Modal>
    </View>
  );
};

export default OrderConfirmModal;
