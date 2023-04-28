import { Text } from 'react-native';
import styles from '../styles/styles';
import typography from '../styles/typography';
import Card from 'react-bootstrap/Card';
import helpersUtils from '../utils/helpersUtils';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card style={styles.restaurantCard}>
      <Card.Img
        variant='top'
        src={require('../assets/images/cuisineGreek.jpg')}
        style={styles.restaurantCard.image}
      />
      <Card.Body>
        <Card.Title style={typography.h3}>
          {restaurant.name} ({helpersUtils.renderDollar(restaurant.price_range)}
          )
        </Card.Title>
        <Card.Text>{helpersUtils.renderStar(restaurant.rating)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
