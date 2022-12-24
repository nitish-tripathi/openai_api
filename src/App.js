import React, { useState } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  const handleStart = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

   return (
     <div className="App">
      <button onClick={handleStart}>start</button>
       <form onSubmit={handleSubmit}>
         <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
         <button type="submit">submit</button>
       </form>
       <div>{response}</div>
     </div>
   )
}

export default App
