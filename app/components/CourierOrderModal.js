import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import helpersUtils from '../utils/helpersUtils';
import colors from '../config/colors';

const CourierOrderModal = ({ modalVisible, setModalVisible, orderToShow }) => {
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
              <View>
                <Text style={styles.modalText}>Delivery Details</Text>
                <Text>{orderToShow.status}</Text>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>X</Text>
              </Pressable>
            </View>

            <View style={styles.contentBox}>
              <View>
                <Text>{orderToShow.customer_address}</Text>
                <Text>{orderToShow.restaurant_name}</Text>
                <Text>{helpersUtils.formatDate(orderToShow.date)}</Text>
              </View>
              {[
                orderToShow.products &&
                  orderToShow.products.map((item, i) => {
                    return (
                      <View key={i} style={styles.item}>
                        <Text>{item.product_name}</Text>
                        <Text>x {item.quantity}</Text>
                        <Text>$ {item.total_cost}</Text>
                      </View>
                    );
                  }),
                <Text style={styles.total}>Total: {orderToShow.total}</Text>,
              ]}
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
    // flex: 1,
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

export default CourierOrderModal;