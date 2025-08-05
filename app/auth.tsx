import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { moderateScale, verticalScale } from '../lib/scaling';
import { useTheme } from '../lib/themeContext';
import Button from './components/Button';

export default function AuthScreen() {
    const router = useRouter();
    const { theme, isDarkMode } = useTheme();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleSendOTP() {
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number');
            return;
        }

        setIsLoading(true);
        
        setTimeout(() => {
            // Simulate OTP sending
            console.log("OTP sent to:", phoneNumber);
            console.log("Debug - Sending phone number to OTP screen:", phoneNumber);
            setIsLoading(false);
            
            // Navigate to OTP verification screen with phone number
            router.push({
                pathname: '/otp-verification',
                params: { phoneNumber }
            });
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
            fontSize: moderateScale(18),
            color: theme.text,
            marginBottom: verticalScale(30),
            textAlign: "center",
        },
        label: {
            fontSize: moderateScale(16),
            color: theme.text,
            marginBottom: verticalScale(10),
        },
        input: {
            marginBottom: verticalScale(30),
            backgroundColor: theme.card,
        },
        infoText: {
            fontSize: moderateScale(14),
            color: theme.text,
            opacity: 0.7,
            textAlign: "center",
            marginTop: verticalScale(20),
        },
    });

    // Create a proper theme object for react-native-paper TextInput
    const paperTheme = {
        colors: {
            primary: theme.primary,
            onSurface: theme.text,
            surface: theme.card,
            placeholder: theme.text,
            text: theme.text,
            background: theme.card,
            onBackground: theme.text,
        },
        fonts: {
            labelLarge: { fontSize: moderateScale(18) },
        } as any,
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />
                <Text style={styles.title}>MyGuard By GTk</Text>
                <Text style={styles.subtitle}>Enter your phone number to continue</Text>
                
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    keyboardType="phone-pad"
                    label={"Phone Number"}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                    placeholder="7451235671"
                    mode="outlined"
                    theme={paperTheme}
                    style={styles.input}
                    textColor={theme.text}
                />
                
                <Button
                    title="Send OTP"
                    onPress={handleSendOTP}
                    loading={isLoading}
                    variant="primary"
                />
                
                <Text style={styles.infoText}>
                    We'll send a 4-digit verification code to your phone number
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}
