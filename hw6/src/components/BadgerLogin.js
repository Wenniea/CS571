import React, { useRef, useContext, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../contexts/LoginContext.js';

export default function BadgerLogin() {

    // TODO Create the login component.
    const inputUsername = useRef();
    const inputPassword = useRef();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    const checkCriteria = () => {
        let isMet = true;
        if (inputUsername.current.value === "" || inputPassword.current.value === "") {
            isMet = false
            alert("You must provide both a username and password!")
        }

        if (isMet) {
            login();
        }
    }

    const success = () => {
        alert("Login successful!");
        navigate('/');
        setLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', true);
    }

    const login = () => {
        fetch('https://www.cs571.org/s23/hw6/api/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            },
            body: JSON.stringify({
                username: inputUsername.current.value,
                password: inputPassword.current.value
            })
        }).then(res => {
            if (res.status === 404) {
                alert("Incorrect username!");
            } else if (res.status === 401) {
                alert("Incorrect password!");
            } else if (res.status === 200) {
                success();
            }
        })
    }

    return <>
        <h1>Login</h1>
        <form>
            <label htmlFor="title" >Username</label>
            <br></br>
            <input
                id="title"
                ref={inputUsername}
                className="form-control"
                style={{ marginTop: "0.5rem" }}
            ></input>
            <br></br>
            <label htmlFor="content">Password</label>
            <br></br>
            <input
                id="content"
                ref={inputPassword}
                type="password"
                className="form-control"
                style={{ marginTop: "0.5rem" }}
            ></input>
        </form>
        <Button onClick={checkCriteria} style={{ marginTop: "1rem" }}>Login</Button>
    </>
}