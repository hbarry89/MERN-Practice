// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import Axios from "axios"; // Import Axios which same as fetch

export default function App() {

  const [users, setUsers] = useState([]); // useState is a hook, setUsers is a function to update the state

  useEffect(function() { // useEffect is a hook, it takes two parameters, a function and an array
    Axios.get("http://localhost:3001/users") // Returns a promise, so we use then and catch
    .then(function(res) {
      setUsers(res.data);
    })
  }, []); // Empty array means it will only run once when the page loads

  return (
  <>
    {users.map(function(user) {
      return(
        <div key={user.id} className="card">
          <ul>

            <li>Name: {user.name}</li>
            <li>Age: {user.age}</li>
            <li>Email: {user.email}</li>
          </ul>
        </div>
      )
    })}
  </>
  )
}