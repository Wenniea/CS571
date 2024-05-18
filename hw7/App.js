import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

export default function App() {

  const [total, setTotal] = useState(0);
  const [input, setInput] = useState("");

  const add = () => {
    setTotal(total => total + Number(input));
    setInput("");
  }

  function reset() {
    setTotal(0);
    setInput("");
    Alert.alert("The running total has been reset to 0.")
  }

  return (
    <View style={styles.container}>
      <Text>Your total is {total}</Text>
      {/* https://reactnative.dev/docs/textinput */}
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="Enter a value"
        keyboardType="numbers-and-punctuation"
      />
      <Button title='Add' onPress={add}> </Button>
      <Button title='Reset' onPress={reset}> </Button>
      <StatusBar style="auto" />
    </View>
  );
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
