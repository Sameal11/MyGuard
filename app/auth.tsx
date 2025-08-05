import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { moderateScale, verticalScale } from '../lib/scaling';
import { authenticateUser } from '../lib/testData';
import { useTheme } from '../lib/themeContext';
import { useUser } from '../lib/userContext';
import Button from './components/Button';

export default function AuthScreen() {
    const router = useRouter();
    const { setCurrentUser } = useUser();
    const { theme, isDarkMode } = useTheme();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleLogin() {
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number');
            return;
        }
        
        if (!otp || otp.length !== 4) {
            Alert.alert('Error', 'Please enter a valid 4-digit OTP');
            return;
        }

        setIsLoading(true);
        
        setTimeout(() => {
            const user = authenticateUser(phoneNumber, otp);
            
            if (user) {
                console.log("Login successful for:", user.name);
                setCurrentUser(user);
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
        },
        content: {
            width: "80%",
        },
        title: {
            fontSize: moderateScale(30),
            fontWeight: "bold",
            marginBottom: verticalScale(20),
            textAlign: "center",
            color: theme.text,
        },
        subtitle: {
            fontSize: moderateScale(30),
            fontWeight: 'bold',
            marginBottom: verticalScale(20),
            textAlign: "center",
            color: theme.text,
        },
        label: {
            fontSize: moderateScale(20),
            color: theme.text,
        },
        input: {
            marginBottom: verticalScale(15),
        },
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />
                <Text style={styles.title}>MyGuard By GTk</Text>
                <Text style={styles.subtitle}>Login</Text>
                <Text style={styles.label}>Enter your number</Text>
                <TextInput
                    keyboardType="phone-pad"
                    label={"Phone Number"}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                    placeholder="7451235671"
                    mode="outlined"
                    theme={{
                        colors: { primary: theme.primary, text: theme.text, placeholder: theme.text, background: theme.card },
                        fonts: { labelLarge: { fontSize: moderateScale(18) } } as any,
                    }}
                    style={styles.input}
                />
                <TextInput
                    label={"OTP"}
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="4545"
                    keyboardType="number-pad"
                    maxLength={4}
                    mode="outlined"
                    secureTextEntry
                    theme={{
                        colors: { primary: theme.primary, text: theme.text, placeholder: theme.text, background: theme.card },
                        fonts: { labelLarge: { fontSize: moderateScale(18) } } as any,
                    }}
                    style={{ marginBottom: verticalScale(20) }}
                />
                <Button
                    title="Login"
                    onPress={handleLogin}
                    loading={isLoading}
                    variant="primary"
                />
            </View>
        </KeyboardAvoidingView>
    );
}
