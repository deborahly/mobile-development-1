import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Button } from 'react-native';
import { useAuth } from '../auth';
import restaurantsUtils from '../utils/restaurantsUtils';
import productsUtils from '../utils/productsUtils';
import ProductCard from '../components/ProductCard';
import OrderConfirmModal from '../components/OrderConfirmModel';
import colors from '../config/colors';

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
    console.log(order);
  };

  return (
    Object.keys(selectedRestaurant).length != 0 &&
    products.length != 0 && (
      <SafeAreaView>
        <View>RESTAURANT MENU</View>

        <View style={styles.infoBox}>
          <View>
            <Text>{selectedRestaurant.name}</Text>
            <Text>Price: {selectedRestaurant.price_range}</Text>
            <Text>Rating: {selectedRestaurant.rating || '-'}</Text>
          </View>

          <View>
            <Button
              onPress={() => setModalVisible(true)}
              color={colors.primary}
              title='Create Order'
              accessibilityLabel='Submit create order'
            />
          </View>
        </View>

        <View>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              updateOrder={updateOrder}
            />
          ))}
        </View>

        <OrderConfirmModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          order={order}
          restaurantId={restaurantId}
          customerId={authData.customer_id}
        />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'top',
    padding: 20,
    width: '90%',
  },
});

export default RestaurantScreen;
