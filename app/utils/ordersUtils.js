const createOrder = async (restaurantId, customerId, order) => {
  const products = Object.entries(order).map(item => {
    if (item[1].quantity != 0) {
      return { id: item[1].id, quantity: item[1].quantity };
    }
    return null;
  });

  const body = {
    restaurant_id: restaurantId,
    customer_id: customerId,
    products: products,
  };

  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

export default { createOrder };
