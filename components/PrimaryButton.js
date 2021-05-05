import React, {useState, useEffect} from 'react';
import {View, TouchableNativeFeedback, Button, StyleSheet, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function PrimaryButton(props)
{
    return(
        <TouchableNativeFeedback onPress = {() => {
            props.onPress();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) 
        }
            }>
            <View style = {[styles.buttonContainer, props.style]}  >
                <Text style = {styles.button}>{props.title} {props.icon && <Ionicons style = {{

                }}
                name={props.icon}  color="black" /> } </Text>
            </View>
        </TouchableNativeFeedback>
    );
    
}

const styles = StyleSheet.create({
    buttonContainer:
    {
        color: '#fff',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {width: 2, height: 3},
        paddingVertical: 20,
        shadowOpacity: 0.15,
        shadowRadius: 10,
        borderRadius: 18,
        width: "70%",
        marginVertical: 10
    },
    button:{
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'center',
        color: '#000'
    }
})