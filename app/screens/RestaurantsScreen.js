import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import restaurantsUtils from '../utils/restaurantsUtils';
import helpersUtils from '../utils/helpersUtils';
import RestaurantCard from '../components/RestaurantCard';
import styles from '../styles/styles';
import typography from '../styles/typography';
import utilities from '../styles/utilities';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function RestaurantsScreen(props) {
  const [form, setForm] = useState({ rating: '', price_range: '' });
  const [restaurants, setRestaurants] = useState([]);

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

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
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Container style={utilities.mbMedium}>
          <Row style={utilities.mbMedium}>
            <Col>
              <Text style={typography.h2}>NEARBY RESTAURANTS</Text>
            </Col>
          </Row>

          <Row>
            <Col>
              <View>
                <Text style={typography.h2}>Rating</Text>
              </View>

              <Form.Select
                aria-label='Select rating'
                style={styles.select}
                value={form.rating}
                onChange={e => handleValueChange({ rating: e.target.value })}
              >
                <option>--Select--</option>
                <option value='1'>{helpersUtils.renderStar(1)}</option>
                <option value='2'>{helpersUtils.renderStar(2)}</option>
                <option value='3'>{helpersUtils.renderStar(3)}</option>
                <option value='4'>{helpersUtils.renderStar(4)}</option>
                <option value='5'>{helpersUtils.renderStar(5)}</option>
              </Form.Select>
            </Col>

            <Col>
              <View>
                <Text style={typography.h2}>Price</Text>
              </View>

              <Form.Select
                aria-label='Select price range'
                style={styles.select}
                value={form.price_range}
                onChange={e =>
                  handleValueChange({ price_range: e.target.value })
                }
              >
                <option>--Select--</option>
                <option value='1'>{helpersUtils.renderDollar(1)}</option>
                <option value='2'>{helpersUtils.renderDollar(2)}</option>
                <option value='3'>{helpersUtils.renderDollar(3)}</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row style={utilities.mbMedium}>
            <Col>
              <Text style={typography.h2}>RESTAURANTS</Text>
            </Col>
          </Row>

          {!restaurants.error &&
            restaurants.length != 0 &&
            sliceIntoChunks(restaurants, 2).map((restaurantChunk, i) => (
              <Row key={i} style={utilities.mbMedium}>
                <Col>
                  <TouchableOpacity
                    key={restaurantChunk[0].name}
                    onPress={() =>
                      props.navigation.navigate('Restaurant', {
                        restaurantId: restaurantChunk[0].id,
                      })
                    }
                  >
                    <RestaurantCard restaurant={restaurantChunk[0]} />
                  </TouchableOpacity>
                </Col>
                <Col>
                  {restaurantChunk[1] && (
                    <TouchableOpacity
                      key={restaurantChunk[1].name}
                      onPress={() =>
                        props.navigation.navigate('Restaurant', {
                          restaurantId: restaurantChunk[1].id,
                        })
                      }
                    >
                      <RestaurantCard restaurant={restaurantChunk[1]} />
                    </TouchableOpacity>
                  )}
                </Col>
              </Row>
            ))}
        </Container>
      </View>
    </SafeAreaView>
  );
}

export default RestaurantsScreen;
