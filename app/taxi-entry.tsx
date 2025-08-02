import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function TaxiEntryScreen() {
  const router = useRouter();
  const [driverName, setDriverName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [cabCompany, setCabCompany] = useState('');
  const [passengerFlat, setPassengerFlat] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [entryType, setEntryType] = useState('pickup'); // pickup or drop

  const handleSubmit = () => {
    if (!driverName || !vehicleNumber || !passengerFlat) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Entry Logged',
      `Taxi ${entryType} entry for vehicle ${vehicleNumber} has been logged successfully.`,
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
        <Text style={styles.headerTitle}>Taxi/Cab Entry</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Entry Type</Text>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.typeButton, entryType === 'pickup' && styles.activeButton]}
              onPress={() => setEntryType('pickup')}
            >
              <Text style={[styles.typeText, entryType === 'pickup' && styles.activeText]}>
                Pickup
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.typeButton, entryType === 'drop' && styles.activeButton]}
              onPress={() => setEntryType('drop')}
            >
              <Text style={[styles.typeText, entryType === 'drop' && styles.activeText]}>
                Drop
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Vehicle Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Driver Name *</Text>
            <TextInput
              style={styles.input}
              value={driverName}
              onChangeText={setDriverName}
              placeholder="Enter driver name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle Number *</Text>
            <TextInput
              style={styles.input}
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
              placeholder="e.g., DL 01 AB 1234"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cab Company</Text>
            <TextInput
              style={styles.input}
              value={cabCompany}
              onChangeText={setCabCompany}
              placeholder="e.g., Uber, Ola, Private"
            />
          </View>

          <Text style={styles.sectionTitle}>Passenger Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flat Number *</Text>
            <TextInput
              style={styles.input}
              value={passengerFlat}
              onChangeText={setPassengerFlat}
              placeholder="e.g., A-101, B-205"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Passenger Name</Text>
            <TextInput
              style={styles.input}
              value={passengerName}
              onChangeText={setPassengerName}
              placeholder="Enter passenger name"
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
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activeText: {
    color: '#fff',
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
  submitButton: {
    backgroundColor: '#FF9800',
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
