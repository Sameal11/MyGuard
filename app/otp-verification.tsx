import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { moderateScale, verticalScale } from '../lib/scaling';
import { authenticateUser } from '../lib/testData';
import { useTheme } from '../lib/themeContext';
import { useUser } from '../lib/userContext';
import Button from './components/Button';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setCurrentUser } = useUser();
  const { theme, isDarkMode } = useTheme();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  // Get phone number from route params
  const phoneNumber = (params.phoneNumber as string) || '7451235671'; // Fallback for testing

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    
    // Debug: Log the received phone number
    console.log('Debug - Received Phone Number from params:', phoneNumber);
    console.log('Debug - Router params:', (router as any).params);
  }, [phoneNumber]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
      return;
    }

    console.log('Debug - Phone Number:', phoneNumber);
    console.log('Debug - OTP String:', otpString);
    console.log('Debug - OTP Array:', otp);

    setIsLoading(true);
    
    setTimeout(() => {
      const user = authenticateUser(phoneNumber, otpString);
      
      console.log('Debug - Authentication Result:', user);
      
      if (user) {
        console.log("Login successful for:", user.name);
        setCurrentUser(user);
        if (user.isVerified) {
          router.push('/(tab)/home');
        } else {
          router.push('/verification');
        }
      } else {
        Alert.alert('Error', 'Invalid OTP. Try OTP: 4545');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleResendOTP = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your phone number');
  };

  const handleBackToPhone = () => {
    router.back();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    content: {
      width: "80%",
      alignItems: "center",
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
      marginBottom: verticalScale(10),
      textAlign: "center",
    },
    phoneNumber: {
      fontSize: moderateScale(16),
      color: theme.primary,
      fontWeight: "600",
      marginBottom: verticalScale(30),
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: verticalScale(30),
    },
    otpInput: {
      width: moderateScale(60),
      height: moderateScale(60),
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: moderateScale(12),
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: theme.card,
      color: theme.text,
    },
    otpInputFocused: {
      borderColor: theme.primary,
      backgroundColor: theme.secondary,
      borderWidth: 3,
    },
    otpInputFilled: {
      borderColor: theme.success,
      backgroundColor: theme.secondary,
    },
    resendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: verticalScale(20),
    },
    resendText: {
      fontSize: moderateScale(14),
      color: theme.text,
      marginRight: moderateScale(5),
    },
    resendButton: {
      fontSize: moderateScale(14),
      color: theme.primary,
      fontWeight: '600',
    },
    backButton: {
      marginTop: verticalScale(20),
    },
    backButtonText: {
      fontSize: moderateScale(14),
      color: theme.text,
      opacity: 0.7,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>Enter the 4-digit code sent to</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                focusedIndex === index && styles.otpInputFocused,
                otp[index] && focusedIndex !== index && styles.otpInputFilled
              ]}
              value={otp[index]}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              selectionColor={theme.primary}
            />
          ))}
        </View>

        <Button
          title="Verify OTP"
          onPress={handleSubmit}
          loading={isLoading}
          variant="primary"
          style={{ width: '100%', marginBottom: verticalScale(20) }}
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <Text style={styles.resendButton} onPress={handleResendOTP}>
            Resend
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleBackToPhone}>
          <Text style={styles.backButtonText}>← Back to phone number</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
} 