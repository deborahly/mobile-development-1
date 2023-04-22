const getProducts = async id => {
  const res = await fetch(
    `http://localhost:3000/api/products?restaurant=${id}`
  );
  return await res.json();
};

export default { getProducts };
