import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/styles.js';
import typography from '../styles/typography.js';
import helpersUtils from '../utils/helpersUtils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import utilities from '../styles/utilities.js';

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
                orderToShow.products.map((item, i) => {
                  return (
                    <Row style={typography.medium} key={i}>
                      <Col>{item.product_name}</Col>
                      <Col style={utilities.textRight}>
                        x&nbsp;{item.quantity}
                      </Col>
                      <Col style={utilities.textRight}>
                        $&nbsp;{helpersUtils.formatCost(item.total_cost)}
                      </Col>
                    </Row>
                  );
                }),
              <View style={styles.modalTotal}>
                <Text
                  style={StyleSheet.flatten([
                    styles.modalTotalContent,
                    typography.strong,
                  ])}
                >
                  TOTAL:&nbsp;$
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
