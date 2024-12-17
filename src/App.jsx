import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';




export const App = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  

  const LoginKezelo = async () => {
    try {
      const response = await axios.post('https://szallasjwt.sulla.hu/login', {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      console.log("Nem sikerült az authentikáció", error);
    }
  };

  const adatLekeres = async () => {
    console.log("Adat lekérés gomb megnyomva");  // Ellenőrizd, hogy a gomb működik-e
    try {
      const response = await axios.get('https://szallasjwt.sulla.hu/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Adatok:", response.data);  // Ellenőrizd a válasz adatokat
      setData(response.data);  // Ha a válasz helyes, állítsd be az adatokat
    } catch (error) {
      console.log("Nem sikerült az adat lekérés: ", error);
    }
  };
  
  

  return (
    
    <div className="container">
      <h2>Bejelentkezés</h2>
      <div className="mb-3">
        <label>Felhasználónév: </label>
        <input
          type="text"
          className="form-control"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Jelszó: </label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={LoginKezelo}>
        Bejelentkezés
      </button>

      {token && (
  <div>
    <h2 className="mt-4">Védett végpont</h2>
    <button className="btn btn-success" onClick={adatLekeres}>
      Adat lekérés
    </button>
    <button className="btn btn-secondary ml-2 felvetel"  >
      Új szállás
    </button>
    {data.length > 0 ? (
      <div className="row mt-4">
        {data.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>Host:</strong> {item.hostname} <br />
                  <strong>Location:</strong> {item.location} <br />
                  <strong>Price:</strong> ${item.price} <br />
                  <strong>Minimum Nights:</strong> {item.minimum_nights}
                  
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>Loading data...</p>
    )}  
  </div>)}
    </div>
    
  );
  
};

export default App;
