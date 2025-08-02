
import {View,Button,StyleSheet, KeyboardAvoidingView,Platform,} from "react-native";
import { Text,TextInput } from "react-native-paper";

import { useRouter } from "expo-router";





export default function AuthScreen() {
    const router = useRouter();

    function handleLogin() {
    // Your login logic
        console.log("Login successful");
        router.push('/verification'); // or '/home' or whatever your home route is
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
                    // onChangeText={(text) => console.log(text)}
                    maxLength={10}
                    placeholder="7451235671"
                    mode="outlined"
                    theme={{ colors: { primary: "blue" },fonts:{ labelLarge:{fontSize:18,}} }}
                    // style={{
                    //     height: 40,
                    //     borderColor: "gray",
                    //     borderWidth: 1,
                    //     marginBottom: 20,
                    //     paddingHorizontal: 10,
                    // }}
                />
                {/* <Text style={{ fontSize :20 }}>Otp</Text> */}
                <TextInput
                    label={"OTP"}
                    placeholder="4545"
                    keyboardType="number-pad"
                    maxLength={4}
                    mode="outlined"
                    secureTextEntry
                    theme={{ colors: { primary: "blue" },fonts:{ labelLarge:{fontSize:18,}} }}
                    style={{
                        height: 40,
                        borderColor: "gray",
                       
                        marginBottom: 20,
                        paddingHorizontal: 10,
                     }}
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