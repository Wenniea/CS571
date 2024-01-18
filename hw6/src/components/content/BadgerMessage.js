import React, { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import LoginContext from '../../contexts/LoginContext.js';

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [username, setNewUsername] = useState("");
    const { message } = props

    const handleRemove = () => {
        props.remove(message.id);
    }


    useEffect(() => {
        if (loggedIn) {
            fetch('https://cs571.org/s23/hw6/api/whoami', {
                method: 'GET',
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_2a1709990731052fcc9b"
                }
            }).then(res => res.json()).then(json => {
                setNewUsername(json.user.username);
            })
        }
    }, [loggedIn]);

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br /><br />
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            username === props.poster ? <Button variant='danger' onClick={handleRemove}>Delete Post</Button> : null
        }

    </>
}

export default BadgerMessage;