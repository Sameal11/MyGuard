import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function CourierEntryScreen() {
  const router = useRouter();
  const [courierName, setCourierName] = useState('');
  const [courierCompany, setCourierCompany] = useState('');
  const [recipientFlat, setRecipientFlat] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [packageDetails, setPackageDetails] = useState('');

  const handleSubmit = () => {
    if (!courierName || !courierCompany || !recipientFlat) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    Alert.alert(
      'Entry Logged',
      `Courier entry for ${courierName} from ${courierCompany} has been logged successfully.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Courier Entry</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Courier Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Courier Name *</Text>
            <TextInput
              style={styles.input}
              value={courierName}
              onChangeText={setCourierName}
              placeholder="Enter courier name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company *</Text>
            <TextInput
              style={styles.input}
              value={courierCompany}
              onChangeText={setCourierCompany}
              placeholder="e.g., Amazon, Flipkart, Zomato"
            />
          </View>

          <Text style={styles.sectionTitle}>Delivery Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recipient Flat *</Text>
            <TextInput
              style={styles.input}
              value={recipientFlat}
              onChangeText={setRecipientFlat}
              placeholder="e.g., A-101, B-205"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recipient Name</Text>
            <TextInput
              style={styles.input}
              value={recipientName}
              onChangeText={setRecipientName}
              placeholder="Enter recipient name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Package Details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={packageDetails}
              onChangeText={setPackageDetails}
              placeholder="Describe the package"
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <MaterialIcons name="check" size={24} color="#fff" />
            <Text style={styles.submitText}>Log Entry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
