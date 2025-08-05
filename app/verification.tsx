import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { moderateScale, scale, verticalScale } from '../lib/scaling';
import { documentTypes } from '../lib/testData';
import { useTheme } from '../lib/themeContext';
import { useUser } from '../lib/userContext';
import Button from './components/Button';

export default function UploadIdScreen() {
  const { currentUser, setCurrentUser } = useUser();
  const { theme, isDarkMode } = useTheme();
  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'waiting' | 'approved' | 'rejected'>('idle');

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
      Alert.alert('Error', 'Please select a document type and upload a file first.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('waiting');
      setTimeout(() => {
        const approved = Math.random() > 0.5;
        if (approved && currentUser) {
          const updatedUser = { ...currentUser, isVerified: true };
          setCurrentUser(updatedUser);
          router.push('/(tab)/home');
        }
        setStatus(approved ? 'approved' : 'rejected');
      }, 5000);
    }, 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: scale(20),
      paddingTop: verticalScale(30),
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: verticalScale(20),
    },
    avatarCircle: {
      width: moderateScale(60),
      height: moderateScale(60),
      borderRadius: moderateScale(30),
      backgroundColor: 'gold',
      marginRight: scale(18),
      borderColor: theme.text,
      borderWidth: moderateScale(2),
    },
    nameButton: {
      paddingHorizontal: scale(70),
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(20),
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
    },
    name: {
      fontWeight: 'bold',
      color: theme.text,
    },
    plot: {
      fontWeight: 'bold',
      color: theme.text,
    },
    instruction: {
      fontSize: moderateScale(18),
      color: theme.text,
      marginBottom: verticalScale(30),
    },
    dropdown: {
      backgroundColor: theme.card,
      padding: moderateScale(12),
      borderRadius: moderateScale(10),
      marginBottom: verticalScale(20),
      borderColor: theme.border,
      borderWidth: 1,
      color: theme.text,
    },
    uploadBox: {
      backgroundColor: theme.card,
      padding: moderateScale(20),
      height: verticalScale(130),
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: moderateScale(10),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(20),
    },
    uploadText: {
      color: theme.text,
    },
    statusText: {
      marginTop: verticalScale(20),
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>{currentUser?.name || 'User'}</Text>
          <Text style={styles.plot}>{currentUser?.plotNumber || 'N/A'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <MaterialIcons name="settings" size={moderateScale(50)} color={theme.text} style={{ marginLeft: scale(25) }} />
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>To complete the profile upload Any government issued ID</Text>

      <RNPickerSelect
        onValueChange={(value) => setDocumentType(value)}
        items={documentTypes}
        placeholder={{
          label: 'Select Document Type',
          value: null,
        }}
        style={{
          inputIOS: styles.dropdown,
          inputAndroid: styles.dropdown,
        }}
        value={documentType}
      />

      <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
        <Text style={styles.uploadText}>{selectedFile ? selectedFile.name : 'upload'}</Text>
      </TouchableOpacity>

      <Button title="Submit" onPress={handleSubmit} loading={status === 'submitting'} />

      {status === 'waiting' && (
        <Text style={[styles.statusText, { color: 'blue' }]}>
          Waiting for admin approval...
        </Text>
      )}
      {status === 'approved' && (
        <Text style={[styles.statusText, { color: 'green' }]}>
          ✅ Approved! Your profile is verified.
        </Text>
      )}
      {status === 'rejected' && (
        <Text style={[styles.statusText, { color: 'red' }]}>
          ❌ Rejected. Please upload a valid ID.
        </Text>
      )}
    </View>
  );
}
