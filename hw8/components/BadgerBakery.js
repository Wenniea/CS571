import { Button, Text, View, StyleSheet, Alert } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import { useState, useEffect } from "react";

export default function BadgerBakery() {
    const [bakeryGoods, setBakeryGoods] = useState({});
    const [names, setNames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [addDisabled, setAddDisabled] = useState(false);
    const [minusDisabled, setMinusDisabled] = useState(true);
    const [basketItem, setBasketItem] = useState([]);
    const [currentItem, setCurrentItem] = useState({});
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [currentItemName, setCurrentItemName] = useState("");
    const [total, setTotal] = useState(0);


    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw8/api/bakery/items", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            }
        })
            .then(res => res.json())
            .then(json => {
                setBakeryGoods(json);
                setNames(Object.keys(json));
                Object.keys(json).map((item) => {
                    setBasketItem(basketItem => [...basketItem, { [item]: currentQuantity }])
                })
            })
    }, [])

    const previousClicked = () => {
        checkDisabled();
        if (currentIndex === 1) {
            setPrevDisabled(true);
            setCurrentIndex(0);
        }
        else if (currentIndex === names.length - 1) {
            setNextDisabled(false);
            setCurrentIndex(names.length - 2)
        } else {
            setCurrentIndex(currentIndex => currentIndex - 1)
        }
    }

    const nextClicked = () => {
        checkDisabled();
        if (currentIndex === names.length - 2) {
            setNextDisabled(true);
            setCurrentIndex(names.length - 1);
        }
        else if (currentIndex === 0) {
            setPrevDisabled(false);
            setCurrentIndex(1);
        } else {
            setCurrentIndex(currentIndex => currentIndex + 1)
        }
    }

    const checkDisabled = () => {
        if (basketItem[currentIndex] !== undefined) {
            if (basketItem[currentIndex][names[currentIndex]] !== bakeryGoods[names[currentIndex]]['upperBound']) {
                setAddDisabled(false);
            }
            if (basketItem[currentIndex][names[currentIndex]] === 0) {
                setMinusDisabled(true);
            }

            if (basketItem[currentIndex][names[currentIndex]] !== 0) {
                setMinusDisabled(false);
            }
            // currentQuantity in Basket === upperBound
            if (basketItem[currentIndex][names[currentIndex]] === bakeryGoods[names[currentIndex]]['upperBound']) {
                setAddDisabled(true);
            }
        }
    }

    const addClicked = (() => {
        setBasketItem(basketItem => {
            return basketItem.map(item => {
                if (Object.keys(item)[0] === names[currentIndex]) {
                    return { ...item, [names[currentIndex]]: basketItem[currentIndex][names[currentIndex]] + 1 }
                } else {
                    return item;
                }
            })
        })
        setCurrentQuantity(basketItem[currentIndex][names[currentIndex]] + 1)
    });

    const minusClicked = (() => {
        setBasketItem(basketItem => {
            return basketItem.map(item => {
                if (Object.keys(item)[0] === names[currentIndex]) {
                    return { ...item, [names[currentIndex]]: basketItem[currentIndex][names[currentIndex]] - 1 }
                } else {
                    return item;
                }
            })
        })
        setCurrentQuantity(basketItem[currentIndex][names[currentIndex]] - 1)
    })

    const calcTotal = () => {
        const newTotal = Object.values(basketItem).reduce((acc, current) => {
            return acc + (Object.values(current) * bakeryGoods[Object.keys(current)]['price'])
        }, 0)
        setTotal(newTotal)
    }

    useEffect(() => {
        setCurrentItem(basketItem[currentIndex] === undefined ? 0 : basketItem[currentIndex])
        setCurrentItemName(basketItem[currentIndex] === undefined ? 0 : basketItem[currentIndex][names[currentIndex]])
        setCurrentQuantity(basketItem[currentIndex] === undefined ? 0 : basketItem[currentIndex][names[currentIndex]])
    }, [, currentIndex])

    useEffect(() => {
        checkDisabled();
        calcTotal();
    }, [, currentQuantity])

    const postOrder = () => {
        if (total > 0) {
            const updatedBody = basketItem.reduce((acc, current) => {
                const key = Object.keys(current)[0];
                const value = current[key];
                acc[key] = value;
                return acc;
            }, {});

            fetch(`https://www.cs571.org/s23/hw8/api/bakery/order`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_2a1709990731052fcc9b"
                },
                body: JSON.stringify(
                    updatedBody
                )
            }).then(json => {
                if (json.status === 200) {
                    setCurrentQuantity(0);
                    setBasketItem([]);
                    names.map((curr) => {
                        setBasketItem(basketItem => [...basketItem, {[curr]: 0 }])
                    })
                    setMinusDisabled(true);
                    setTotal(0);
                    Alert.alert("Successfully placed order!");
                } else {
                    Alert.alert("Something went wrong!");
                }
            })
        } else {
            Alert.alert("Empty basket: you must order something!");
        }
    }


    return <View>
        <Text>Welcome to Badger Bakery!</Text>
        <View style={styles.button}>
            <Button disabled={prevDisabled} title='PREVIOUS' onPress={previousClicked} />
            <Button disabled={nextDisabled} title='NEXT' onPress={nextClicked} />
        </View>
        <BadgerBakedGood
            key={names[currentIndex]}
            name={names[currentIndex]}
            {...bakeryGoods[names[currentIndex]]}
        />
        <View style={styles.button}>
            <Button disabled={minusDisabled} title='-' onPress={minusClicked} />
            <Text> {currentQuantity} </Text>
            <Button disabled={addDisabled} title='+' onPress={addClicked} />
        </View>
        <View>
            <Text style={{ textAlign: "center" }}> Order Total: ${total === undefined? 0: total.toFixed(2)}</Text>
            <Button title='PLACE ORDER' onPress={postOrder} />
        </View>

    </View>
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
