import {View,Button,StyleSheet, KeyboardAvoidingView,Platform, Alert} from "react-native";
import { Text,TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { authenticateUser } from '../lib/testData';
import { useUser } from '../lib/userContext';

export default function AuthScreen() {
    const router = useRouter();
    const { setCurrentUser } = useUser();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleLogin() {
        // Validate inputs
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number');
            return;
        }
        
        if (!otp || otp.length !== 4) {
            Alert.alert('Error', 'Please enter a valid 4-digit OTP');
            return;
        }

        setIsLoading(true);
        
        // Simulate authentication delay
        setTimeout(() => {
            const user = authenticateUser(phoneNumber, otp);
            
            if (user) {
                console.log("Login successful for:", user.name);
                // Store user in context
                setCurrentUser(user);
                // Navigate to verification screen for new users, or home for verified users
                if (user.isVerified) {
                    router.push('/(tab)/home');
                } else {
                    router.push('/verification');
                }
            } else {
                Alert.alert('Error', 'Invalid phone number or OTP. Try phone: 7451235671 with OTP: 4545');
            }
            
            setIsLoading(false);
        }, 1000);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            
        >
            <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
                    MyGuard By GTk</Text>
                
                <Text style={{ fontSize: 30,fontWeight:'bold', marginBottom: 20,  textAlign:"center"}}>Login</Text>
                <Text style ={styles.number }>Enter your number </Text>
                <TextInput
                    keyboardType="phone-pad"
                    label={"Phone Number"}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                    placeholder="7451235671"
                    mode="outlined"
                    theme={{ colors: { primary: "blue" },fonts:{ labelLarge:{fontSize:18,}} }}
                    style={{ marginBottom: 15 }}
                />
                {/* <Text style={{ fontSize :20 }}>Otp</Text> */}
                <TextInput
                    label={"OTP"}
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="4545"
                    keyboardType="number-pad"
                    maxLength={4}
                    mode="outlined"
                    secureTextEntry
                    theme={{ colors: { primary: "blue" },fonts:{ labelLarge:{fontSize:18,}} }}
                    style={{ marginBottom: 20 }}
                />
                {/*<Button style={{}} title="Login" onPress={() => {}} />
                 */}
                <Button
                    title="Login"
                    onPress={handleLogin}
                
                    color="coral">

                </Button>
            </View>
        </KeyboardAvoidingView>
        
    );
}
const styles=StyleSheet.create({
    number:{
        fontSize :20,
    },
});