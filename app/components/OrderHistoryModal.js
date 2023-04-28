import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import colors from '../styles/colors';
import styles from '../styles/styles.js';
import utilities from '../styles/utilities.js';
import typography from '../styles/typography.js';
import helpersUtils from '../utils/helpersUtils';

const OrderHistoryModal = ({ modalVisible, setModalVisible, orderToShow }) => {
  return (
    <View>
      <Modal show={modalVisible} centered={true}>
        <Modal.Dialog>
          <View style={styles.modalHeader}>
            <Modal.Header
              closeButton
              closeVariant='white'
              onHide={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Modal.Title
                style={StyleSheet.flatten([
                  typography.h2,
                  typography.colorPrimary,
                ])}
              >
                {orderToShow.restaurant_name}
                <View>
                  <Text style={typography.colorWhite}>
                    Order Date:&nbsp;{helpersUtils.formatDate(orderToShow.date)}
                  </Text>
                  <Text style={typography.colorWhite}>
                    Status:&nbsp;
                    <span style={typography.uppercase}>
                      {orderToShow.status}
                    </span>
                  </Text>
                  <Text style={typography.colorWhite}>
                    Courier:&nbsp;{orderToShow.courier_name}
                  </Text>
                </View>
              </Modal.Title>
            </Modal.Header>
          </View>

          <Modal.Body>
            {[
              orderToShow.products &&
                orderToShow.products.map(item => {
                  return (
                    <View style={styles.item}>
                      <Text>{item.product_name}</Text>
                      <Text>x&nbsp;{item.quantity}</Text>
                      <Text>
                        $&nbsp;{helpersUtils.formatCost(item.total_cost)}
                      </Text>
                    </View>
                  );
                }),
              <View style={styles.modalTotal}>
                <Text style={styles.modalTotalContent}>
                  <span style={typography.strong}>TOTAL:</span>&nbsp;
                  {helpersUtils.formatCost(orderToShow.total)}
                </Text>
              </View>,
            ]}
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </View>
  );
};

export default OrderHistoryModal;
