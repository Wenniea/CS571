import React, { useState, useContext } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../contexts/LoginContext.js';

export default function BadgerRegister() {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepeatPassword, setNewRepeatPassword] = useState("");
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    // TODO Create the register component.

    const checkCriteria = () => {
        let isMet = true;
        if (newUsername === "" || newPassword === "") {
            isMet = false
            alert("You must provide both a username and password!")
        }

        if (newPassword !== newRepeatPassword) {
            isMet = false
            alert("Your passwords do not match!")
        }

        if (isMet) {
            register();
        }
    }

    const success = () => {
        alert("Registration successful!");
        navigate('/');
        setLoggedIn(true);
    }

    const register = () => {
        fetch('https://www.cs571.org/s23/hw6/api/register', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            },
            body: JSON.stringify({
                username: newUsername,
                password: newPassword
            })
        }).then(res => {
            if (res.status === 200) {
                success();
            } else if (res.status === 409) {
                alert("That username has already been taken!");
            }
        })
    }

    return (
        <>
            <h1>Register</h1>
            {
                <form>
                    <label htmlFor="Username">Username</label>
                    <br></br>
                    <input id="Username" value={newUsername} className="form-control" style={{ marginTop: "0.5rem" }} onChange={(e) => setNewUsername(e.target.value)} />
                    <br></br>
                    <label htmlFor="Password">Password</label>
                    <br></br>
                    <input id="Password" type="password" value={newPassword} className="form-control" style={{ marginTop: "0.5rem" }} onChange={(e) => setNewPassword(e.target.value)} />
                    <br></br>
                    <label htmlFor="RepeatPassword">Repeat Password</label>
                    <br></br>
                    <input id="RepeatPassword" type="password" value={newRepeatPassword} className="form-control" style={{ marginTop: "0.5rem" }} onChange={(e) => setNewRepeatPassword(e.target.value)} />
                </form>
            }
            <Button onClick={checkCriteria} style={{ marginTop: "1rem" }}>Register</Button>
        </>
    );
}