import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import ArticleScreen from "../screens/ArticleScreen";

const NewsStack = createNativeStackNavigator();

function NewsFeedStack() {
  return (
      <NewsStack.Navigator>
        <NewsStack.Screen name="Articles" component={BadgerNewsScreen} options={{headerShown: false}}/>
        <NewsStack.Screen name="Article" component={ArticleScreen} options={{title:'Article'}}/>
      </NewsStack.Navigator>
  );
}

export default NewsFeedStack;