const getAccount = async (id, type) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/account/${id}?type=${type}`
    );

    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

const updateAccount = async (id, type, form) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/account/${id}?type=${type}`,
      {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await res.json(form);
  } catch (e) {
    console.error(e);
  }
};

export default { getAccount, updateAccount };
