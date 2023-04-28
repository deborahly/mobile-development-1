import { Text } from 'react-native';
import styles from '../styles/styles';
import typography from '../styles/typography';
import Card from 'react-bootstrap/Card';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card style={styles.restaurantCard}>
      <Card.Img
        variant='top'
        src={require('../assets/images/cuisineGreek.jpg')}
        style={styles.restaurantCard.image}
      />
      <Card.Body>
        <Card.Title style={typography.h3}>{restaurant.name}</Card.Title>
        <Card.Text>
          <Text>
            Rating: {restaurant.rating}
            {'\n'}
          </Text>
          <Text>Price: {restaurant.price_range}</Text>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
