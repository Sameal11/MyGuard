import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../lib/scaling';
import { useTheme } from '../lib/themeContext';

export default function OfficeVisitorEntryScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [entryType, setEntryType] = useState<'entry' | 'exit'>('entry');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorCompany, setVisitorCompany] = useState('');
  const [hostFlat, setHostFlat] = useState('');
  const [hostName, setHostName] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = () => {
    if (!visitorName || !visitorPhone || !hostFlat) {
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
        <Text style={styles.headerTitle}>Office Visitor Entry</Text>
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

          <Text style={styles.sectionTitle}>Visitor Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Visitor Name *</Text>
            <TextInput
              style={styles.input}
              value={visitorName}
              onChangeText={setVisitorName}
              placeholder="Enter visitor name"
              placeholderTextColor={theme.text}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={visitorPhone}
              onChangeText={setVisitorPhone}
              placeholder="Enter phone number"
              placeholderTextColor={theme.text}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company</Text>
            <TextInput
              style={styles.input}
              value={visitorCompany}
              onChangeText={setVisitorCompany}
              placeholder="Enter company name"
              placeholderTextColor={theme.text}
            />
          </View>

          <Text style={styles.sectionTitle}>Host Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Host Flat Number *</Text>
            <TextInput
              style={styles.input}
              value={hostFlat}
              onChangeText={setHostFlat}
              placeholder="e.g., A-101, B-205"
              placeholderTextColor={theme.text}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Host Name</Text>
            <TextInput
              style={styles.input}
              value={hostName}
              onChangeText={setHostName}
              placeholder="Enter host name"
              placeholderTextColor={theme.text}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Purpose of Visit</Text>
            <TextInput
              style={styles.input}
              value={purpose}
              onChangeText={setPurpose}
              placeholder="Brief description of visit purpose"
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
