import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles/styles';
import typography from '../styles/typography';
import helpersUtils from '../utils/helpersUtils';
import utilities from '../styles/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons/faCircleMinus';

function ProductCard({ product, updateOrder }) {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    updateOrder({
      [product.name]: {
        id: product.id,
        quantity: productCount,
        cost: product.cost,
      },
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
    <View style={styles.productCard}>
      <Image
        style={styles.productCard.image}
        source={require('../assets/RestaurantMenu.jpg')}
      />

      <View>
        <Text style={typography.h4}>{product.name}</Text>
        <Text style={typography.strong}>
          $ {helpersUtils.formatCost(product.cost)}
        </Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </View>

      <View style={styles.counterBox}>
        <Text onPress={removeItem}>
          <FontAwesomeIcon icon={faCircleMinus} />
        </Text>
        <Text>{productCount}</Text>
        <Text onPress={addItem}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </Text>
      </View>
    </View>
  );
}

export default ProductCard;
