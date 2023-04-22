const getProducts = async id => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products?restaurant=${id}`
    );
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

export default { getProducts };
