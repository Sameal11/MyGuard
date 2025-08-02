import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function ConstructionEntryScreen() {
  const router = useRouter();
  const [entryType, setEntryType] = useState('worker'); // Choose between worker and vehicle

  // Worker-related states
  const [workerName, setWorkerName] = useState('');
  const [company, setCompany] = useState('');
  const [idProof, setIdProof] = useState('');
  const [project, setProject] = useState('');

  // Vehicle-related states
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const handleSubmit = () => {
    if (entryType === 'worker' && (!workerName || !company || !project)) {
      Alert.alert('Error', 'Please fill in all required fields for worker');
      return;
    }

    if (entryType === 'vehicle' && (!vehicleNumber || !driverName)) {
      Alert.alert('Error', 'Please fill in all required fields for vehicle');
      return;
    }

    const message = entryType === 'worker'
      ? `Worker ${workerName} from ${company} has been logged successfully.`
      : `Vehicle ${vehicleNumber} driven by ${driverName} has been logged successfully.`;

    Alert.alert('Entry Logged', message, [{ text: 'OK', onPress: () => router.back() }]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Construction Entry</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          {/* Entry Type */}
          <Text style={styles.sectionTitle}>Entry Type</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.typeButton, entryType === 'worker' && styles.activeButton]}
              onPress={() => setEntryType('worker')}
            >
              <Text style={[styles.typeText, entryType === 'worker' && styles.activeText]}>Worker</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.typeButton, entryType === 'vehicle' && styles.activeButton]}
              onPress={() => setEntryType('vehicle')}
            >
              <Text style={[styles.typeText, entryType === 'vehicle' && styles.activeText]}>Vehicle</Text>
            </TouchableOpacity>
          </View>

          {entryType === 'worker' ? (
            // Worker Form
            <>
              <Text style={styles.sectionTitle}>Worker Information</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Worker Name *</Text>
                <TextInput
                  style={styles.input}
                  value={workerName}
                  onChangeText={setWorkerName}
                  placeholder="Enter worker name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Company *</Text>
                <TextInput
                  style={styles.input}
                  value={company}
                  onChangeText={setCompany}
                  placeholder="Enter company name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>ID Proof</Text>
                <TextInput
                  style={styles.input}
                  value={idProof}
                  onChangeText={setIdProof}
                  placeholder="e.g., Driving License, Aadhar Card"
                />
              </View>

              <Text style={styles.sectionTitle}>Project Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Project Name *</Text>
                <TextInput
                  style={styles.input}
                  value={project}
                  onChangeText={setProject}
                  placeholder="Enter project name"
                />
              </View>
            </>
          ) : (
            // Vehicle Form
            <>
              <Text style={styles.sectionTitle}>Vehicle Information</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vehicle Number *</Text>
                <TextInput
                  style={styles.input}
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}
                  placeholder="Enter vehicle number"
                />
              </View>

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
                <Text style={styles.label}>Vehicle Type</Text>
                <TextInput
                  style={styles.input}
                  value={vehicleType}
                  onChangeText={setVehicleType}
                  placeholder="e.g., Truck, Crane"
                />
              </View>
            </>
          )}

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
    backgroundColor: '#eee',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  typeText: {
    fontSize: 16,
    color: '#555',
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
    backgroundColor: '#FF5722',
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

