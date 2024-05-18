import { useEffect, useState, useContext } from "react"
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard"
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";



function BadgerNewsScreen(props) {
    const [uniqueTags, setUniqueTags] = useState([]);
    const [articles, setArticles] = useState([]);
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            }
        })
            .then(res => res.json())
            .then(json => {
                setArticles(json);

                let unique = []
                json.map(
                    (article) => {
                        return article.tags.map((tag => {
                            if (!unique.includes(tag)) {
                                unique = unique.concat(tag)
                            }
                        }))
                    }
                )
                setUniqueTags(unique);
            })
    }, [])

    useEffect(() => {
        if (uniqueTags)
            uniqueTags.forEach((uniqueTag) => {
                setPrefs((prefs) => ({
                    ...prefs,
                    [uniqueTag]: true
                }))
            });
    }, [uniqueTags])


    return <ScrollView>
        {
            articles.map(article =>
                <BadgerNewsItemCard key={article.id} {...article} />
            )
        }
    </ScrollView>
};


export default BadgerNewsScreen;