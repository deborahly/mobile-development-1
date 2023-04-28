const createOrder = async (
  restaurantId,
  customerId,
  order,
  confirmationMethod
) => {
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
    confirmation_method: confirmationMethod,
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

const getOrders = async (type, id) => {
  const validTypes = ['customer', 'restaurant', 'courier'];

  if (!validTypes.includes(type)) {
    return 'Invalid type. Please try again.';
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/orders?type=${type}&id=${id}`
    );
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

const updateStatus = async order => {
  let newStatus = '';
  switch (order.status) {
    case 'pending':
      newStatus = 'in progress';
      break;
    case 'in progress':
      newStatus = 'delivered';
      break;
    default:
      return order;
  }

  const body = { status: newStatus };

  try {
    const res = await fetch(
      `http://localhost:3000/api/order/${order.id}/status`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    if (!data.success) {
      return order;
    }

    return { ...order, status: newStatus };
  } catch (e) {
    console.error(e);
  }
};

export default { createOrder, getOrders, updateStatus };
