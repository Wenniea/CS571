import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsFeedStack from "./NewsFeedStack";

const tab = createBottomTabNavigator();

function BadgerTabs(props) {
    return (
        <tab.Navigator>
            <tab.Screen name="News" options={{
                title:'Articles', 
                headerTitleStyle:{fontSize:25},
                tabBarLabel:"News"}} component={NewsFeedStack} />
            <tab.Screen name="Preferences" component={BadgerPreferencesScreen} options={{
                headerTitleStyle:{fontSize:25}}}/>
        </tab.Navigator>
    );
}

export default BadgerTabs;