import React, { useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Card from 'react-bootstrap/Card';

function AccountSelectScreen(props) {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          key='customer-app'
          onPress={() =>
            props.navigation.navigate('AppTab', {
              screen: 'RestaurantStack',
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
              <Card.Title>Customer</Card.Title>
            </Card.Body>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          key='courier-app'
          onPress={() =>
            props.navigation.navigate('CourierAppTab', {
              screen: 'Deliveries',
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
              <Card.Title>Courier</Card.Title>
            </Card.Body>
          </Card>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AccountSelectScreen;
