import { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../auth';
import CourierOrderModal from '../components/CourierOrderModal';
import ordersUtils from '../utils/ordersUtils';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus';

function DeliveriesScreen() {
  const { authData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [orderToShow, setOrderToShow] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async (type, id) => {
      const data = await ordersUtils.getOrders(type, id);
      setOrders(data);
    };
    fetchOrders('courier', authData.courier_id);
  }, []);

  const handleShowModal = order => {
    setModalVisible(true);
    setOrderToShow(order);
  };

  return (
    <SafeAreaView>
      <Container>
        <Text>MY DELIVERIES</Text>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>ADDRESS</th>
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
                    <td>{order.customer_address}</td>
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

      <CourierOrderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        orderToShow={orderToShow}
      />
    </SafeAreaView>
  );
}

export default DeliveriesScreen;
