import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import colors from '../config/colors';

function ProductCard({ product, updateOrder }) {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    updateOrder({
      [product.name]: { quantity: productCount, cost: product.cost },
    });
  }, [productCount]);

  const removeItem = () => {
    if (productCount > 0) {
      setProductCount(productCount - 1);
      return;
    }
  };

  const addItem = () => {
    setProductCount(productCount + 1);
    return;
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={require('../assets/RestaurantMenu.jpg')}
      />

      <View>
        <Text>{product.name}</Text>
        <Text>{product.cost}</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </View>

      <View style={styles.counter}>
        <Text onPress={removeItem}>-</Text>
        <Text>{productCount}</Text>
        <Text onPress={addItem}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'top',
    paddingTop: 20,
    width: '90%',
  },
  image: {
    width: 50,
  },
  counter: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
