import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Button, 
    Image, 
    Animated,
    SafeAreaView
} from 'react-native';
import { Camera } from 'expo-camera';
import { Easing } from 'react-native-reanimated';

import { Sidebar } from '../components';
import { PrimaryButton } from '../components';

export default function Trace({route, navigation})
{
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const { imageuri } = route.params;
    const [rightVal] = useState( new Animated.Value( -200 ) );
    const [opacLevel, setOpac ] = useState( 0.5 );
    let menuIn = true;
    
    const handleSliderChange = ( val ) =>
    {
        setOpac( val );
    }

    const moveIn = () =>
    {
        Animated.spring( rightVal, {
            toValue: 0,
            // easing: Easing.back(),
            duration: 500,
            useNativeDriver: false
        }).start();
    }
    const moveOut = () =>
    {
        Animated.spring( rightVal, {
            toValue: -100,
            // easing: Easing.back(),
            duration: 500,
            useNativeDriver: false
        }).start();
    }
    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);
    
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) { 
        return <Text>No access to camera</Text>;
    }
    
    return(
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
            </Camera>
            <Image
                style = {{position: "absolute", width: "100%", height: "100%", opacity: opacLevel }}
                source={{
                    uri: imageuri,
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // setType(
                    // type === Camera.Constants.Type.back
                    //     ? Camera.Constants.Type.front
                    //     : Camera.Constants.Type.back
                    // );
                    menuIn = !menuIn;
                    if ( menuIn ){ moveOut(); } else { moveIn(); }
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) 
                }}>
                    <Text style={{color: 'white'}}><Ionicons name="settings" size={32} color="white" /></Text>
                </TouchableOpacity>
            </View>
            <PrimaryButton title = "Back" onPress = {()=>navigation.goBack() } style = {styles.backButton} /> 
            <Sidebar rightVal = {rightVal} onSliderValChange = {handleSliderChange} />
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: 
    {
        flex: 1
    },
    camera:
    {
        flex: 1
    },
    buttonContainer:
    {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    button: {
    },
    backButton:
    {
        width: 90,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 0.8,
        top: 30,
        position: 'absolute', 
        left: 10,
    }
})
