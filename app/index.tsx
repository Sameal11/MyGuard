import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to MyGuard </Text>
      <Link href="/auth"  style={styles .navbutton
        // color: "black",
        // width: 100,
        // height:40,
        // borderBlockColor: "black",
        // backgroundColor: "coral",
        // borderWidth: 1,
        // borderRadius: 8,
        // padding: 10,
      }>Login here </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  navbutton: {
    color: "black",
    width: 100,
    height: 40,
    borderBlockColor: "black",
    backgroundColor: "coral",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  }

})