import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text></Text>
        <Text>Username</Text>
        <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            keyboardType="numbers-and-punctuation"
        />
        <Text>Password</Text>
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            keyboardType="numbers-and-punctuation"
            secureTextEntry={true}
        />

        <Button color="crimson" title="Login" onPress={() => {
            props.handleLogin(username, password)
        }} />
        <Text>New Here?</Text>
        <View style={styles.button} >
            <Button color="grey" title="SIGNUP" onPress={() => props.setIsRegistering(true)} />
            <Button color="grey" title="CONTINUE AS GUEST" onPress={() => props.setIsGuest(true)}/>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 180,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        flexDirection: "row",
        alignContent: "left",
    }
});

export default BadgerLoginScreen;