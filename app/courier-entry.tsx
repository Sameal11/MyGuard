import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from '../lib/scaling';
import { useTheme } from '../lib/themeContext';

export default function CourierEntryScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [entryType, setEntryType] = useState<'entry' | 'exit'>('entry');
  const [courierName, setCourierName] = useState('');
  const [courierCompany, setCourierCompany] = useState('');
  const [recipientFlat, setRecipientFlat] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [packageDetails, setPackageDetails] = useState('');

  const handleSubmit = () => {
    if (!courierName || !recipientFlat) {
      Alert.alert('Error', 'Please fill in all required fields marked with *');
      return;
    }

    Alert.alert(
      'Success',
      `${entryType === 'entry' ? 'Entry' : 'Exit'} logged successfully`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(20),
      paddingTop: verticalScale(50),
      paddingBottom: verticalScale(20),
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    backButton: {
      padding: moderateScale(8),
    },
    headerTitle: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      color: theme.text,
    },
    placeholder: {
      width: moderateScale(40),
    },
    content: {
      flex: 1,
      padding: scale(20),
    },
    form: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(12),
      padding: scale(20),
    },
    sectionTitle: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: verticalScale(15),
      marginTop: verticalScale(10),
    },
    buttonGroup: {
      flexDirection: 'row',
      marginBottom: verticalScale(20),
    },
    typeButton: {
      flex: 1,
      padding: moderateScale(12),
      borderRadius: moderateScale(8),
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.secondary,
      alignItems: 'center',
      marginHorizontal: moderateScale(5),
    },
    activeButton: {
      borderColor: theme.primary,
      backgroundColor: theme.primary,
    },
    typeText: {
      fontSize: moderateScale(16),
      fontWeight: '500',
      color: theme.text,
    },
    activeText: {
      color: theme.background,
    },
    inputGroup: {
      marginBottom: verticalScale(15),
    },
    label: {
      fontSize: moderateScale(16),
      color: theme.text,
      marginBottom: verticalScale(5),
      fontWeight: '500',
    },
    input: {
      backgroundColor: theme.secondary,
      borderRadius: moderateScale(8),
      padding: moderateScale(12),
      fontSize: moderateScale(16),
      borderWidth: 1,
      borderColor: theme.border,
      color: theme.text,
    },
    submitButton: {
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: moderateScale(15),
      borderRadius: moderateScale(10),
      marginTop: verticalScale(20),
    },
    submitText: {
      color: theme.background,
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      marginLeft: moderateScale(8),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Courier Entry</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.typeButton, entryType === 'entry' && styles.activeButton]}
              onPress={() => setEntryType('entry')}
            >
              <Text style={[styles.typeText, entryType === 'entry' && styles.activeText]}>
                Entry
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, entryType === 'exit' && styles.activeButton]}
              onPress={() => setEntryType('exit')}
            >
              <Text style={[styles.typeText, entryType === 'exit' && styles.activeText]}>
                Exit
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Courier Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Courier Name *</Text>
            <TextInput
              style={styles.input}
              value={courierName}
              onChangeText={setCourierName}
              placeholder="Enter courier name"
              placeholderTextColor={theme.text}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Courier Company</Text>
            <TextInput
              style={styles.input}
              value={courierCompany}
              onChangeText={setCourierCompany}
              placeholder="e.g., DTDC, Blue Dart, FedEx"
              placeholderTextColor={theme.text}
            />
          </View>

          <Text style={styles.sectionTitle}>Recipient Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flat Number *</Text>
            <TextInput
              style={styles.input}
              value={recipientFlat}
              onChangeText={setRecipientFlat}
              placeholder="e.g., A-101, B-205"
              placeholderTextColor={theme.text}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recipient Name</Text>
            <TextInput
              style={styles.input}
              value={recipientName}
              onChangeText={setRecipientName}
              placeholder="Enter recipient name"
              placeholderTextColor={theme.text}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Package Details</Text>
            <TextInput
              style={styles.input}
              value={packageDetails}
              onChangeText={setPackageDetails}
              placeholder="Brief description of package"
              placeholderTextColor={theme.text}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <MaterialIcons name="check" size={24} color={theme.background} />
            <Text style={styles.submitText}>Log Entry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
