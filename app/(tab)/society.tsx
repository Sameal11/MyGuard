import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function SocietyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Society Screen (Coming Soon)</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f7' },
  text: { fontSize: 22, color: '#39AEE4', fontWeight: 'bold' },
});
