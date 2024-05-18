import { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default function BadgerBakedGood(props) {
   
    return <View>
        <Image
            style={styles.pic}
            source={{
                uri: props.img
            }}
        />
        <Text style={styles.title}>{props.name}</Text>
        <Text></Text>
        <Text style={{textAlign: "center"}}>${props.price === undefined? 0: (props.price).toFixed(2)}</Text>
        <Text>You can order up to {props.upperBound} units!</Text>
        <Text></Text>
    </View>
}

const styles = StyleSheet.create({
    pic: {
        alignSelf: "center",
        width: 100,
        height: 100
    },
    title: {
        textAlign: "center",
        fontSize:20, 
        fontWeight:'bold'
    },
});