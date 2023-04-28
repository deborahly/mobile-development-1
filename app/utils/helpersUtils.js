import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus';

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

const renderStar = number => {
  const html = [];
  for (let i = 0; i < number; i++) {
    html.push(<>&#9733;</>);
  }
  return html;
};

const renderDollar = number => {
  const html = [];
  for (let i = 0; i < number; i++) {
    html.push(<>&#36;</>);
  }
  return html;
};

export default { calculateOrder, formatDate, renderStar, renderDollar };
