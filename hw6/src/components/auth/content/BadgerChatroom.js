import React, { useEffect, useState, useContext } from "react"
import BadgerMessage from "./BadgerMessage"
import LoginContext from '../../contexts/LoginContext.js';
import { Button } from "react-bootstrap";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);


    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");


    const checkCriteria = () => {
        let isMet = true;
        if (newTitle === "" || newContent === "") {
            isMet = false
            alert("You must provide both title and content!")
        }

        if (isMet) {
            createPost();
        }
    }

    const createPost = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            },
            body: JSON.stringify({
                title: newTitle,
                content: newContent

            })
        }).then(json => {
            alert("Successfully posted!");
            loadMessages();
            setNewTitle("");
            setNewContent("");
        })
    }

    const deletePost = (messageId) => {
        fetch(`https://www.cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${messageId}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            },
            body: JSON.stringify({
                title: newTitle,
                content: newContent
            })
        }).then(json => {
            alert("Successfully deleted the post!");
            loadMessages();
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>

        {loggedIn ? (
            <>
                <form>
                    <label htmlFor="title">Post Title</label>
                    <br></br>
                    <input id="title" value={newTitle} className="form-control" onChange={(e) => setNewTitle(e.target.value)} />
                    <br></br>
                    <label htmlFor="content">Post Content</label>
                    <br></br>
                    <input id="content" value={newContent} className="form-control" onChange={(e) => setNewContent(e.target.value)} />
                </form>
                <Button onClick={checkCriteria}>Create Post</Button>
            </>
        ) : (
            <p>You must be logged in to post!</p>
        )}

        <hr />
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map(message => {
                            return <BadgerMessage
                                key={message.id}
                                message={message}
                                title={message.title}
                                created={message.created}
                                poster={message.poster}
                                content={message.content}
                                remove={deletePost}
                            />
                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}