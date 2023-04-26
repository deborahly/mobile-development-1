import { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import OrderHistoryModal from '../components/OrderHistoryModal';
import ordersUtils from '../utils/ordersUtils';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus';

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
    <SafeAreaView>
      <Container>
        <Text>MY ORDERS</Text>
        <Table striped bordered hover>
          <thead>
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
                    <td>{order.status}</td>
                    <td>
                      <TouchableOpacity
                        key={order.id}
                        onPress={() => handleShowModal(order)}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
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
