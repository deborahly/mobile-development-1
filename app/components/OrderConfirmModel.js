import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import helpersUtils from '../utils/helpersUtils';
import ordersUtils from '../utils/ordersUtils';
import colors from '../config/colors';

const OrderConfirmModal = ({
  modalVisible,
  setModalVisible,
  order,
  restaurantId,
  customerId,
}) => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchResult, setFetchResult] = useState(null);

  useEffect(() => {
    setTotal(helpersUtils.calculateOrder(order));
  });

  const handleConfirmOrder = async () => {
    setLoading(true);
    const data = await ordersUtils.createOrder(restaurantId, customerId, order);
    setLoading(false);

    if (data.id) {
      setFetchResult('success');
    } else {
      setFetchResult('failed');
    }

    return;
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headingBox}>
              <Text style={styles.modalText}>Order Confirmation</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>X</Text>
              </Pressable>
            </View>

            <View style={styles.contentBox}>
              {Object.entries(order).find(item => item[1].quantity != 0) ? (
                [
                  Object.entries(order).map(item => {
                    if (item[1].quantity != 0) {
                      return (
                        <View style={styles.item}>
                          <Text>{item[0]}</Text>
                          <Text>x {item[1].quantity}</Text>
                          <Text>$ {item[1].cost}</Text>
                        </View>
                      );
                    }
                  }),
                  <Text style={styles.total}>Total: {total}</Text>,
                ]
              ) : (
                <Text>No items added</Text>
              )}
            </View>

            <View>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleConfirmOrder}
              >
                {loading ? (
                  <Text>Processing Order...</Text>
                ) : fetchResult == 'success' ? (
                  <Text></Text>
                ) : (
                  <Text>Confirm Order</Text>
                )}
              </Pressable>
              {fetchResult == 'success' && (
                <Text>Thank you! Your order has been received.</Text>
              )}
              {fetchResult == 'failed' && (
                <Text>
                  Your order was not processed successfully. Please try again.
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'top',
    paddingTop: 20,
    width: '90%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 25,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  headingBox: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'top',
    width: '100%',
  },
  contentBox: {
    flex: 1,
    gap: 10,
    width: '100%',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
  },
  total: {
    alignSelf: 'flex-end',
  },
  buttonConfirm: {
    backgroundColor: colors.primary,
  },
});

export default OrderConfirmModal;
