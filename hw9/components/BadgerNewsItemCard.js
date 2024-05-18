import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react"

function BadgerNewsItemCard(props) {

    const navigation = useNavigation();
    const [content, setContent] = useState([]);


    useEffect(() => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${props.id}`, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            }
        })
            .then(res => res.json())
            .then(json => {
                setContent(json)
            })
    },[])

    const showArticle = () => {
        navigation.push("Article", {
            image: props.img,
            title: props.title,
            cont: content.body,
        });
    };

    return <Pressable onPress={showArticle}>
        <View style={styles.card}>
            <Image source={{ uri: props.img }} style={styles.pic} />
            <Text></Text>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    </Pressable>
}

export default BadgerNewsItemCard;

const styles = StyleSheet.create({
    card: {
        paddingBottom: 16,
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 20,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    pic: {
        alignSelf: 'center',
        width: 360,
        height: 200
    },
    title: {
        textAlign: 'left',
        fontSize: 24
    },
})