const login = async form => {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (e) {
    console.error;
  }
};

export default { login };
