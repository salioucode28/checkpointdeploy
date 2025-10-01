import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });

  const BASE_URL = 'http://localhost:3000/users';

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setUsers(data.data || data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, age: Number(form.age) })
      });
      const newUser = await res.json();
      setUsers([...users, newUser.data]);
      setForm({ firstName: '', lastName: '', email: '', age: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    minHeight: '100vh',
    color: '#fff'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0',
    width: '100%',
    maxWidth: '500px'
  };

  const itemStyle = {
    background: 'rgba(255,255,255,0.1)',
    padding: '12px 18px',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center'
  };

  const itemHoverStyle = {
    transform: 'scale(1.03)',
    background: 'rgba(255,255,255,0.2)'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(0,0,0,0.2)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
    marginTop: '30px'
  };

  const inputStyle = {
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: 'none',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    background: '#ff6a00',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', textShadow: '2px 2px 10px rgba(0,0,0,0.3)' }}>Users</h1>
      <ul style={listStyle}>
        {users.map((user, index) => (
          <li
            key={user._id}
            style={{ ...itemStyle, ...(hoveredIndex === index ? itemHoverStyle : {}) }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {user.firstName} {user.lastName} - {user.email} - {user.age} ans
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '40px', textAlign: 'center' }}>Add User</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add User</button>
      </form>
    </div>
  );
}

export default App;
