import { useState, useEffect } from "react";
import Axios from "axios"; // Import Axios which same as fetch

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, ListGroup, Container } from 'react-bootstrap';

export default function App() {

  const api = "http://localhost:3001";

  const [users, setUsers] = useState([]); // useState is a hook, setUsers is a function to update the state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(function() { // useEffect is a hook, it takes two parameters, a function and an array
    Axios.get(`${api}/users`) // Returns a promise, so we use then and catch
    .then(function(res) {
      setUsers(res.data);
    })
  }, [users]); // Empty array means it will only run once when the page loads

  const createUser = function() {
    if(name && age && email) {
      Axios.post(`${api}/createUser`, { // Body
        name,
        age,
        email,
      })
      .then(function(res) {
        return(res.data);
      })
      .catch(function(error) {
        setErrorMessage('Error: ' + error.message);
      });
  } else {
    setErrorMessage('Please fill out all fields.');
  }
  }

  return (
  <Container>
      <Form className="form">
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupAge">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Enter age" onChange={e => setAge(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Button variant="dark" onClick={createUser}>Create User</Button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </Form>

      <div>
        {users.map(function({_id, name, age, email}) {
          return(

            <ListGroup key={_id} className="card">
              <ListGroup.Item>Name: {name}</ListGroup.Item>
              <ListGroup.Item>Age: {age}</ListGroup.Item>
              <ListGroup.Item>Email: {email}</ListGroup.Item>
            </ListGroup>
          )
      })}
      </div>
  </Container>
  )
}