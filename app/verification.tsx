import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Button, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

export default function UploadIdScreen() {
  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' |'waiting' | 'approved' | 'rejected'>('idle');

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });
    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!documentType || !selectedFile) {
        alert('Please select a document type and upload a file first.');
        return;
    }

    setStatus('submitting'); // show loading...
      // Simulate upload
    setTimeout(() => {
        setStatus('waiting'); // Simulate that it is now waiting for admin review

        // Simulate admin decision after 5 seconds
        setTimeout(() => {
        const approved = Math.random() > 0.5; // Randomly approve or reject
        if(approved){
          router.push('/Screens/home');
        }
        setStatus(approved ? 'approved' : 'rejected');
        }, 5000); // Admin takes 5s to approve/reject

    }, 2000); // Upload takes 2s
    };


  return (
    <View style={styles.container}>
      {/* Profile row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>Anuj Munda</Text>
          <Text style={styles.plot}>Plot-101</Text>
        </TouchableOpacity>
        <TouchableOpacity  >
            <MaterialIcons name="settings" size={50} color="black"  style={{marginLeft: 25,}} />
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>To complete the profile upload Any government issued ID</Text>

      {/* Dropdown simulation */}
      <Picker
        selectedValue={documentType}
        onValueChange={(itemValue) => setDocumentType(itemValue)}
        style={{ ...styles.dropdown, height: 50, borderRadius:30 ,backgroundColor: 'white' }}
        >
            <Picker.Item label="Select Document Type" value="" />
            <Picker.Item label="Aadhar Card" value="aadhar" />
            <Picker.Item label="Pan Card" value="pan" />
            <Picker.Item label="Voter ID" value="voter" />
            <Picker.Item label="Driving License" value="license" />
            <Picker.Item label="Passport" value="passport" />
        </Picker>
      

      {/* Upload box */}
      <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
        <Text style={styles.uploadText}>{selectedFile ? selectedFile.name : 'upload'}</Text>
      </TouchableOpacity>

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>submit</Text>
        {status === 'submitting' && (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'orange' }}>
            Submitting your ID...
        </Text>
        )}
        {status === 'waiting' && (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'blue' }}>
            Waiting for admin approval...
        </Text>
        )}

        {status === 'approved' && (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
            ✅ Approved! Your profile is verified.
        </Text>
        )}

        {status === 'rejected' && (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
            ❌ Rejected. Please upload a valid ID.
        </Text>
        )}

      </TouchableOpacity>
    </View>
  );
} 


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9ff',
    padding: 20,
    paddingTop: 30, // add top space to avoid notch
  },

  profileRow: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 0, // ensures it starts from top
  },

  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'gold',
    marginRight: 18,
    borderBlockColor: 'black',
    borderWidth: 2,
  },
  boxSetting: {
    width: 60,
    height: 60,
    borderRadius: 9,
    backgroundColor: 'grey',
    marginLeft: 10,
    borderBlockColor: 'black',
    borderWidth: 2,
    },
  nameButton: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
  plot: {
    fontWeight: 'bold',
    color: 'black',
  },
  instruction: {
    fontSize: 18,
    color: 'black',
    marginBottom: 30,
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  uploadBox: {
    backgroundColor: 'white',
    padding: 20,
    height: 130,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: 'black',
  },
  submitButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
  },
  submitText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
