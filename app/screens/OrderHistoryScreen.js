import { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import ordersUtils from '../utils/ordersUtils';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus';

function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async (type, id) => {
      const data = await ordersUtils.getOrders(type, id);
      setOrders(data);
    };
    fetchOrders('customer', 1);
  }, []);

  const createOrdersHTML = orders => {
    return orders.map(order => {
      return (
        <tr>
          <td>{order.restaurant_name}</td>
          <td>{order.status}</td>
          <td>{<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}</td>
        </tr>
      );
    });
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
                    <td>{<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </SafeAreaView>
  );
}

export default OrderHistoryScreen;
