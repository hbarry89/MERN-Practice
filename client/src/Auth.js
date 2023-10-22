import { useState } from 'react';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import { Button, Form, ListGroup, Container } from 'react-bootstrap';

const Auth = function() {
    const [cookies, setCookies] = useCookies('access_token');
    const removeCookies = function() {
        setCookies('access_token', '');
        window.localStorage.removeItem("adminID")
        window.location.reload(false);
    }
    return (
        <>
            {
                cookies.access_token
                ? <Button variant="danger" onClick={removeCookies}>Logout</Button>
                : (
                    <>
                        <Register />
                        <Login />
                    </>
                )
            }
        </>
    )
};

const Register = function() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async function(e) {
        e.preventDefault();
        await Axios.post('http://localhost:3001/register', {
            username, password
    });
        alert("Admin created!")
    };
    return(
        <AuthForm label="Register"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
        />
    )
};

const Login = function() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [_, setCookies] = useCookies('access_token');
    const onSubmit = async function(e) {
        e.preventDefault();
        const response = await Axios.post('http://localhost:3001/login', {
            username, password
        });
            setCookies("access_token", response.data.token)
            window.localStorage.setItem("adminID", response.data.adminID)
            window.location.reload(false);
        };

    return(
        <AuthForm label="Login"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
    />
    )
}; 

const AuthForm = function({label, username, setUsername, password, setPassword, onSubmit}) { // props is an object, we destructure it here instead of (props)
    return(
        <div className="container">
            <div className="form-group">
                <form className="form" onSubmit={onSubmit}>
                    <h2>{label}</h2> {/* instead of props.label */}
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <Button type="submit" className="btn btn-dark">{label}</Button>
                    </div>
                </form>
            </div>
    </div>
    )
}

export default Auth;