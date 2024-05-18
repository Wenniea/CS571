import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { set } from "react-native-reanimated";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("");

    const signUp = () => {
        if (password === "") {
            Alert.alert("Please enter a password")
        } else {
            if (password === confirmPassword) {
                props.handleSignup(username, password);
            } else {
                Alert.alert("Passwords do not match");
            }
        }
    }
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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

        <Text>Confirm Password</Text>
        <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            keyboardType="numbers-and-punctuation"
            secureTextEntry={true}
        />

        <View style={styles.buttons}>
            <Button color="crimson" title="Signup" onPress={signUp} />
            <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 200,
    }
});

export default BadgerRegisterScreen;