import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from '../../lib/scaling';
import { useTheme } from '../../lib/themeContext';

export default function HelpdeskScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    text: {
      fontSize: moderateScale(22),
      color: theme.primary,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Helpdesk Screen (Coming Soon)</Text>
    </View>
  );
}
