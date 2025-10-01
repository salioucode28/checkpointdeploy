import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/users';

async function testAPI() {
  try {
    // GET all users
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log('GET:', data);

    // POST new user
    res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: "Alice", lastName: "Smith", email: "alice@example.com", age: 28 })
    });
    data = await res.json();
    console.log('POST:', data);

    const userId = data.data._id;

    // PUT update user
    res = await fetch(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30 })
    });
    data = await res.json();
    console.log('PUT:', data);

    // DELETE user
    res = await fetch(`${BASE_URL}/${userId}`, { method: 'DELETE' });
    data = await res.json();
    console.log('DELETE:', data);

  } catch (err) {
    console.error(err);
  }
}

testAPI();
