import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import restaurantsUtils from '../utils/restaurantsUtils';
import colors from '../config/colors';
import Card from 'react-bootstrap/Card';

function RestaurantsScreen(props) {
  const [form, setForm] = useState({ rating: '', price_range: '' });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getFilteredRestaurants = async () => {
      const data = await restaurantsUtils.getRestaurants(form);
      setRestaurants(data);
    };
    getFilteredRestaurants();
  }, [form]);

  const handleValueChange = async value => {
    setForm(prev => ({ ...prev, ...value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>Nearby Restaurants</View>

      <View>
        <Picker
          // style={styles.input}
          selectedValue={form.rating}
          onValueChange={value => handleValueChange({ rating: value })}
        >
          <Picker.Item label='--Select--' value='' />
          <Picker.Item label='1' value='1' />
          <Picker.Item label='2' value='2' />
          <Picker.Item label='3' value='3' />
          <Picker.Item label='4' value='4' />
          <Picker.Item label='5' value='5' />
        </Picker>
        <Picker
          // style={styles.input}
          selectedValue={form.price_range}
          onValueChange={value => handleValueChange({ price_range: value })}
        >
          <Picker.Item label='--Select--' value='' />
          <Picker.Item label='1' value='1' />
          <Picker.Item label='2' value='2' />
          <Picker.Item label='3' value='3' />
        </Picker>
      </View>

      <View style={styles.restaurants}>
        {!restaurants.error && restaurants.length != 0 &&
          restaurants.map(restaurant => (
            <TouchableOpacity
              key={restaurant.name}
              onPress={() =>
                props.navigation.navigate('Restaurant', {
                  restaurantId: restaurant.id,
                })
              }
            >
              <Card
                style={{
                  width: '7rem',
                  border: '1px solid black',
                  minHeight: '10rem',
                }}
              >
                <Card.Img
                  variant='top'
                  src={require('../assets/images/cuisineGreek.jpg')}
                  style={{ width: '7rem' }}
                />
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>
                    <Text>
                      Rating: {restaurant.rating}
                      {'\n'}
                    </Text>
                    <Text>Price: {restaurant.price_range}</Text>
                  </Card.Text>
                </Card.Body>
              </Card>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurants: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'top',
    paddingTop: 20,
    width: '90%',
  },
});

export default RestaurantsScreen;
