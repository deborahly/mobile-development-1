import { Text, View, StyleSheet } from 'react-native';
import helpersUtils from '../utils/helpersUtils';
import styles from '../styles/styles.js';
import utilities from '../styles/utilities.js';
import typography from '../styles/typography.js';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CourierOrderModal = ({ modalVisible, setModalVisible, orderToShow }) => {
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
                Delivery Details
                <View>
                  <Text style={typography.colorWhite}>
                    Status:&nbsp;
                    <span style={typography.uppercase}>
                      {orderToShow.status}
                    </span>
                  </Text>
                </View>
              </Modal.Title>
            </Modal.Header>
          </View>

          <Modal.Body>
            <View style={utilities.mbMedium}>
              <Text style={typography.regular}>
                Delivery Address:&nbsp;{orderToShow.customer_address}
              </Text>
              <Text style={typography.regular}>
                Restaurant:&nbsp;{orderToShow.restaurant_name}
              </Text>
              <Text style={typography.regular}>
                Order Date:&nbsp;{helpersUtils.formatDate(orderToShow.date)}
              </Text>
            </View>

            <View>
              <Text
                style={StyleSheet.flatten([typography.h3, utilities.mbSmall])}
              >
                Order Details
              </Text>
            </View>

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

export default CourierOrderModal;
