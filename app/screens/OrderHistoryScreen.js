import { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import OrderHistoryModal from '../components/OrderHistoryModal';
import ordersUtils from '../utils/ordersUtils';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus';
import styles from '../styles/styles';
import typography from '../styles/typography';
import utilities from '../styles/utilities';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [orderToShow, setOrderToShow] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async (type, id) => {
      const data = await ordersUtils.getOrders(type, id);
      setOrders(data);
    };
    fetchOrders('customer', 1);
  }, []);

  const handleShowModal = order => {
    setModalVisible(true);
    setOrderToShow(order);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Container style={styles.container}>
        <Row style={utilities.mbMedium}>
          <Col>
            <Text style={typography.h2}>MY ORDERS</Text>
          </Col>
        </Row>

        <Table borderless hover style={typography.regular}>
          <thead style={styles.tableHead}>
            <tr>
              <th>ORDER</th>
              <th>STATUS</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
            {orders.length !== 0 &&
              orders.map(order => {
                return (
                  <tr>
                    <td>{order.restaurant_name}</td>
                    <td style={typography.uppercase}>{order.status}</td>
                    <td>
                      <TouchableOpacity
                        key={order.id}
                        onPress={() => handleShowModal(order)}
                      >
                        <FontAwesomeIcon
                          icon={faMagnifyingGlassPlus}
                          style={utilities.marginAuto}
                        />
                      </TouchableOpacity>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>

      <OrderHistoryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        orderToShow={orderToShow}
      />
    </SafeAreaView>
  );
}

export default OrderHistoryScreen;
