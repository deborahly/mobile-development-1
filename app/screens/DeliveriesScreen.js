import { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../auth';
import CourierOrderModal from '../components/CourierOrderModal';
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
import Button from 'react-bootstrap/Button';

const DeliveriesScreen = () => {
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

  const handleChangeStatus = async (order, i) => {
    const newOrder = await ordersUtils.updateStatus(order);

    // Update orders only if status changed
    if (JSON.stringify(order) !== JSON.stringify(newOrder)) {
      const newOrders = [...orders];
      newOrders[i] = newOrder;
      setOrders(newOrders);
    }
  };

  const handleShowModal = order => {
    setModalVisible(true);
    setOrderToShow(order);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Container style={styles.container}>
        <Row style={utilities.mbMedium}>
          <Col>
            <Text style={typography.h2}>MY DELIVERIES</Text>
          </Col>
        </Row>

        <Table
          borderless
          hover
          style={StyleSheet.flatten([utilities.textCenter, typography.regular])}
        >
          <thead
            style={StyleSheet.flatten([
              styles.tableHead,
              utilities.verticalMiddle,
            ])}
          >
            <tr>
              <th>ORDER ID</th>
              <th>ADDRESS</th>
              <th>STATUS</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody
            style={StyleSheet.flatten([
              utilities.verticalMiddle,
              typography.regularOswald,
            ])}
          >
            {orders.length !== 0 &&
              orders.map((order, i) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer_address}</td>
                    <td>
                      <Button
                        as='input'
                        type='button'
                        value={order.status}
                        onClick={() => handleChangeStatus(order, i)}
                        style={StyleSheet.flatten([
                          styles.testButton(order.status),
                          utilities.width100,
                        ])}
                      />
                    </td>
                    <td>
                      <TouchableOpacity onPress={() => handleShowModal(order)}>
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

      <CourierOrderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        orderToShow={orderToShow}
      />
    </SafeAreaView>
  );
};

export default DeliveriesScreen;
