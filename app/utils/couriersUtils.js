const getCourier = async id => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/couriers/${id}`
      );
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  };
  
  export default { getCourier };