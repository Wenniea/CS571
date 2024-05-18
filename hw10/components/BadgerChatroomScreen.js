import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, Button, View, TextInput, Alert } from "react-native";
import BadgerCard from "./BadgerCard";
import Modal from "react-native-modal";
import * as SecureStore from 'expo-secure-store';


function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b",
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const createPost = () => {
        SecureStore.getItemAsync(props.username).then((token) => {
            fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                    "X-CS571-ID": "bid_2a1709990731052fcc9b",
                },
                body: JSON.stringify({
                    title: newTitle,
                    content: newContent
                })
            }).then(res => {
                if (res.status === 200) {
                    loadMessages();
                    setNewTitle("");
                    setNewContent("");
                    setModalVisible(false);
                    Alert.alert("Successfully posted!")
                }
            }
            )
        })
    }

    const refreshed = () => {
        loadMessages();
        Alert.alert("Page Refreshed!")
    }

    useEffect(() => {
        loadMessages();
    }, [props]);


    return <View style={{ flex: 1 }}>
        <ScrollView>
            <View >
                <Modal animationType="slide" visible={modalVisible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.heading}>Create A Post</Text>
                            <Text>Title</Text>
                            <TextInput style={styles.titleInput} value={newTitle} onChangeText={(text) => setNewTitle(text)} />
                            <Text>Body</Text>
                            <TextInput style={styles.bodyInput} multiline={true} value={newContent} onChangeText={(text) => setNewContent(text)} />
                            <View>
                                <Button title="CREATE POST" onPress={createPost} />
                                <Button title="CANCEL" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

            {
                messages.length > 0 ?
                    <>
                        {
                            messages.map((message) => {
                                return <BadgerCard
                                    key={message.id}
                                    message={message}
                                    title={message.title}
                                    created={message.created}
                                    poster={message.poster}
                                    content={message.content}
                                />
                            })
                        }
                    </>
                    :
                    <Text>No messages yet!</Text>
            }
        </ScrollView>
        <View style={styles.buttons}>
            {props.isGuest ? <Button title="REFRESH" onPress={refreshed} /> :
                <>
                    <Button title="ADD POST" onPress={() => { setModalVisible(true) }} />
                    <Button title="REFRESH" onPress={refreshed} /></>}
        </View>
    </View>
}

const styles = StyleSheet.create({
    buttons: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 4,
        paddingBottom: 20,
        paddingTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        height: 500,
        width: 300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        paddingTop: 20,
        paddingLeft: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    heading: {
        fontSize: 30,
        textAlign: "left",
    },
    titleInput: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    bodyInput: {
        height: 220,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: "top",
        textAlign: "justify"
    },
});

export default BadgerChatroomScreen;