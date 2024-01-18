import React, { useEffect, useContext } from 'react';
import LoginContext from '../../contexts/LoginContext.js';

export default function BadgerLogout() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            sessionStorage.setItem('isLoggedIn', false);
            setLoggedIn(false);
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}