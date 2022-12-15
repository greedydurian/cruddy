import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import First from './First';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

    const setError = message => {
    // Use the setError function provided by the useState hook to set the error message
    setError(message);
  };

    const updateLoggedInUser = user => {
    setLoggedInUser(user);
  };

    const navigate = useNavigate();
    const redirectToHome = () => {
        // Use the push method on the history object to redirect the user to the home page
    navigate('/');
      };

    const handleSubmit = event => {
        event.preventDefault();
    // Use axios to send a POST request to the server with the username and password
    axios.post("http://localhost:5000/api/login", { username, password })
      .then(response => {
        // If the request is successful, update the logged-in user
        // and redirect the user to the home page
        updateLoggedInUser(response.data.user);
        redirectToHome();
      })
      .catch(error => {
        // If there is an error, display an error message
        setError(error.message);
      });
  };
  

  return (
<div>
  {loggedInUser ? (
    // If the user is logged in, render the First component
    <First />
  ) : (
    // If the user is not logged in, render the login form
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Username:
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password:
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  )}
</div>
  )}
export default LoginPage;