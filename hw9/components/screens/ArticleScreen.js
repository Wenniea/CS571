import { useNavigation } from "@react-navigation/native";
import { Suspense, useEffect, useRef, useState, useContext } from "react";
import { Image, View, Text, StyleSheet, ScrollView, Animated } from "react-native";



function ArticleScreen(props) {
    const details = props.route.params;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start()
    }, [details])

    return <ScrollView style={styles.card}>
        <Image source={{ uri: details.image }} style={styles.pic} />
        <Text></Text>
        <Text style={styles.title}>{details.title}</Text>
        <Text></Text>

        <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.body}>{details.cont}</Text>
        </Animated.View>


    </ScrollView>
}

export default ArticleScreen;

const styles = StyleSheet.create({
    pic: {
        alignSelf: 'center',
        width: 400,
        height: 200
    },
    title: {
        textAlign: 'left',
        fontSize: 24,
        paddingLeft: 10,
        paddingRight: 10
    },
    body: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10
    }
})