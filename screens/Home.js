import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { PrimaryButton } from '../components';
import { Ionicons } from '@expo/vector-icons';

export default function Home ({navigation})
{
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        }); 
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    return(
        <View style = {styles.container}>
            <Text
                style = {{
                    fontSize: 65,
                    fontWeight: "900",
                }}
            >Alpha Trace</Text>
            <View style = {styles.buttons}>
                <PrimaryButton onPress={pickImage} title = {"Upload an Image"} />
                {image && <PrimaryButton onPress = {()=>navigation.navigate("Trace", {imageuri: image}) } title = {"Trace!"}/>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'antiquewhite',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    buttons:
    {
        alignItems: 'center',
        width: '100%'
    },
    button:
    {
        color: '#fff'
    }
  });
