const calculateOrder = order => {
  const totalCost = Object.entries(order).reduce((prev, curr) => {
    if (curr[1].quantity != 0) {
      const cost = curr[1].quantity * curr[1].cost;
      return prev + cost;
    }

    return prev;
  }, 0);

  return totalCost;
};

const formatDate = date => {
  const dateObject = new Date(date);
  return `${dateObject.getFullYear()}/${(
    '0' +
    (dateObject.getMonth() + 1)
  ).slice(-2)}/${dateObject.getDate()}`;
};

export default { calculateOrder, formatDate };
