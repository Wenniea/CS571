
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import { Alert } from 'react-native';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';
import BadgerConversionScreen from './components/BadgerConversionScreen';
import Ionicons from '@expo/vector-icons/Ionicons';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [user, setUser] = useState("");
  const [isGuest, setIsGuest] = useState(false);


  useEffect(() => {
    fetch('https://cs571.org/s23/hw10/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_2a1709990731052fcc9b",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)

    })
  }, []);

  function handleLogin(username, password) {
    fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + SecureStore.getItemAsync(username),
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_2a1709990731052fcc9b",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (res.status === 200) {
        Alert.alert("Login Successful!")
        return res.json()
      } else {
        if (res.status === 401) {
          Alert.alert("Incorrect login, please try again!")
        }
      }
    }).then(data => {
      if (data) {
        setUser(username);
        SecureStore.setItemAsync(username, data.token)
        setIsLoggedIn(true)
      }
    })
  }

  function handleSignup(username, password) {
    fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + SecureStore.getItemAsync(username),
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_2a1709990731052fcc9b",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (res.status === 200) {
        Alert.alert("Signup successful!")
        return res.json()
      } else {
        if (res.status === 409) {
          Alert.alert("Username already taken, please try again.")
        }
      }
    }).then(data => {
      if (data) {
        setUser(username);
        SecureStore.setItemAsync(username, data.token)
        setIsLoggedIn(true)
      }
    })
  }

  const handleLogout = () => {
    SecureStore.deleteItemAsync(user);
    setUser("");
    setIsLoggedIn(false);
    setIsRegistering(false);
    Alert.alert("Successfully logged out!")
  }

  if (isLoggedIn || isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator >
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={'home'}
                  size={size}
                  color={focused ? '#c5050c' : '#000000'} />
              )
            }} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} username={user} isGuest={isGuest} />}
              </ChatDrawer.Screen>
            })
          }

          {isGuest ?
            <ChatDrawer.Screen name="SignUp" 
            options={{ 
              drawerItemStyle: { backgroundColor: '#c5050c' }, 
              drawerLabelStyle: { color: '#FFFFFF' },
              drawerIcon: ({focused, size}) => {
                return <Ionicons 
                name={'person-add'} 
                size={size} 
                color={focused ? '#FFFFFF' : '#FFFFFF'} />
              }}}>
                {(props) => <BadgerConversionScreen setIsGuest={setIsGuest} setIsRegistering={setIsRegistering} {...props}/>}
            </ChatDrawer.Screen>
            
            : <ChatDrawer.Screen name="Logout" 
            options={{ 
              drawerItemStyle: { backgroundColor: '#c5050c' }, 
              drawerLabelStyle: { color: '#FFFFFF' }, 
              drawerIcon: ({focused, size}) => {
                return <Ionicons 
                name={'log-out'} 
                size={size} 
                color={focused ? '#FFFFFF' : '#FFFFFF'} />
              }}}>
              {(props) => <BadgerLogoutScreen {...props} handleLogout={handleLogout} />}
            </ChatDrawer.Screen>
          }

        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest} />
  }
}


