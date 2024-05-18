import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import BadgerPreferencesContext from './contexts/BadgerPreferencesContext';
import BadgerTabs from './components/navigation/BadgerTabs';
import BadgerNewsScreen from './components/screens/BadgerNewsScreen';
import BadgerPreferencesScreen from './components/screens/BadgerPreferencesScreen';

export default function App() {

  const [prefs, setPrefs] = useState({});

  return (
    <>
      <BadgerPreferencesContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerPreferencesContext.Provider>
      <StatusBar style="auto" />
    </>
  );
}