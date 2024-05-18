import { useState } from "react";
import { View } from "react-native";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";
import BadgerPreferenceSwift from "../BadgerPreferenceSwitch";

function BadgerPreferencesScreen(props) {
    const [prefs, setPrefs] = useState(BadgerPreferencesContext);

    const toggle = () => {
        
    }

    return <View>
    {
        Object.keys(prefs).map(pref => {
            <BadgerPreferenceSwift 
            prefName={pref}
            initVal={true}
            handleToggle={toggle}
            />
        })
    }
    </View>
}

export default BadgerPreferencesScreen;