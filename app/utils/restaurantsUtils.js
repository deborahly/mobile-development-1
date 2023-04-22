const getRestaurants = async form => {
  try {
    if (!form.rating && !form.price_range) {
      const res = await fetch('http://localhost:3000/api/restaurants');
      return await res.json();
    }

    if (!form.rating) {
      const res = await fetch(
        `http://localhost:3000/api/restaurants?price_range=${form.price_range}`
      );
      return await res.json();
    }

    if (!form.price_range) {
      const res = await fetch(
        `http://localhost:3000/api/restaurants?rating=${form.rating}`
      );
      return await res.json();
    }

    if (form.price_range && form.rating) {
      const res = await fetch(
        `http://localhost:3000/api/restaurants?price_range=${form.price_range}&rating=${form.rating}`
      );
      return await res.json();
    }
  } catch (e) {
    console.error;
  }
};

const getRestaurant = async id => {
  try {
    const res = await fetch(`http://localhost:3000/api/restaurants/${id}`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

export default { getRestaurants, getRestaurant };
