import { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, ScrollView } from 'react-native';
import { useAuth } from '../auth';
import restaurantsUtils from '../utils/restaurantsUtils';
import productsUtils from '../utils/productsUtils';
import helpersUtils from '../utils/helpersUtils';
import ProductCard from '../components/ProductCard';
import OrderConfirmModal from '../components/OrderConfirmModal';
import styles from '../styles/styles';
import typography from '../styles/typography';
import utilities from '../styles/utilities';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BootstrapButton from 'react-bootstrap/Button';

function RestaurantScreen({ route }) {
  const restaurantId = route.params.restaurantId;
  const { authData, loadStorageData } = useAuth();
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      Promise.all([
        restaurantsUtils.getRestaurant(restaurantId),
        productsUtils.getProducts(restaurantId),
      ]).then(values => {
        setSelectedRestaurant(values[0]);
        setProducts(values[1]);
      });
    };
    getInfo();
  }, []);

  const updateOrder = change => {
    setOrder(prev => ({ ...prev, ...change }));
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.container}>
          <Container style={utilities.mbSmall}>
            <Row style={utilities.mbMedium}>
              <Col>
                <Text style={typography.h2}>RESTAURANT MENU</Text>
              </Col>
            </Row>

            <Row>
              <Col>
                <View>
                  <Text style={typography.h2}>{selectedRestaurant.name}</Text>
                  <Text style={typography.strong}>
                    Price:&nbsp;
                    {helpersUtils.renderDollar(selectedRestaurant.price_range)}
                  </Text>
                  <Text style={typography.strong}>
                    Rating:&nbsp;
                    {selectedRestaurant.rating
                      ? helpersUtils.renderStar(selectedRestaurant.rating)
                      : '-'}
                  </Text>
                </View>
              </Col>

              <Col style={utilities.textRight}>
                <BootstrapButton
                  as='input'
                  type='button'
                  value='Create Order'
                  onClick={() => setModalVisible(true)}
                  style={styles.smallButton}
                />
              </Col>
            </Row>
          </Container>

          <Container>
            {Object.keys(selectedRestaurant).length != 0 &&
              products.length != 0 &&
              products.map(product => (
                <Row>
                  <Col>
                    <ProductCard
                      key={product.id}
                      product={product}
                      updateOrder={updateOrder}
                    />
                  </Col>
                </Row>
              ))}
          </Container>
        </View>
      </ScrollView>

      <OrderConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        order={order}
        restaurantId={restaurantId}
        customerId={authData.customer_id}
      />
    </SafeAreaView>
  );
}

export default RestaurantScreen;
