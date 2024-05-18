import { Pressable, StyleSheet, View, Text} from "react-native";

export default function BadgerCard(props) {
    const dt = new Date(props.created);
    return <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
        <View style={[styles.card, props.style]}>
            <Text style={styles.title}>{props.title}</Text>
            <Text>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
            <Text></Text>
            <Text>{props.content}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 20,
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})