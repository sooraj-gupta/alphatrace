import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, View, Text, StyleSheet, Button } from 'react-native';
import { Easing } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Slider from '@react-native-community/slider';


export default function Sidebar( props )
{
    const [counter, setCounter] = useState(5);
    const sliderRef = useRef();
    const [sliderValue, setSliderValue] = useState(0.3);
    const handleValChange = () =>
    {
        props.onSliderValChange( sliderValue );
        setCounter( counter - 1 );
        if( counter <= 0 )
        {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) 
            setCounter(5);
        }
    }
    return (
        <Animated.View
            style = {{
                ...styles.container,
                right: props.rightVal
            }}
        >
            <View>
            <Slider
                ref = {sliderRef}
                style={{width: 200, height: 40, transform:[{rotateZ: '-90deg'}, {translateY: -60}, {translateX: -200}] }}
                minimumValue={0}
                maximumValue={1}
                value = {sliderValue}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange = {value => {
                    setSliderValue( value );
                    handleValChange()
                } }
            />
            </View>
        </Animated.View>
        
    );
}
const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: '10%',
        width: 80,
        height: '80%',
        backgroundColor:`rgba(255, 255, 255, 0.8)`,
        borderRadius: 300,   
    }
})