import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';

export default function PreApproveVisitor() {
  const router = useRouter();
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorType, setVisitorType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const qrViewRef = useRef(null);

  const visitorTypes = [
    { label: 'Guest', value: 'guest' },
    { label: 'Delivery', value: 'delivery' },
    { label: 'Cab/Taxi', value: 'cab' },
    { label: 'Construction Worker', value: 'construction' },
    { label: 'Office Visitor', value: 'office' },
  ];

  const generateQRCode = () => {
    if (!visitorName || !visitorPhone || !visitorType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const qrData = {
      visitorName,
      visitorPhone,
      visitorType,
      purpose,
      validFrom,
      validTo,
      flatNumber: 'Plot-101',
      approvedBy: 'Anuj Munda',
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
    };

    setQRCodeData(JSON.stringify(qrData));
    setShowQRCode(true);
  };

  const shareQRCode = async () => {
    try {
      const uri = await qrViewRef.current.capture();
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (!isSharingAvailable) {
        Alert.alert('Not Available', 'Sharing is not available on this device.');
        return;
      }
      await Sharing.shareAsync(uri);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to share QR Code');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pre-approve Visitor</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Visitor Name *</Text>
            <TextInput
              style={styles.input}
              value={visitorName}
              onChangeText={setVisitorName}
              placeholder="Enter visitor's full name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={visitorPhone}
              onChangeText={setVisitorPhone}
              placeholder="Enter visitor's phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Visitor Type *</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={setVisitorType}
                items={visitorTypes}
                placeholder={{ label: 'Select visitor type', value: '' }}
                style={{
                  inputIOS: styles.pickerInput,
                  inputAndroid: styles.pickerInput,
                }}
                value={visitorType}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Purpose of Visit</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={purpose}
              onChangeText={setPurpose}
              placeholder="Enter purpose of visit"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Valid From</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setValidFrom(new Date().toISOString().split('T')[0])}>
              <Text style={[styles.dateText, !validFrom && styles.placeholder]}>
                {validFrom || 'Select date'}
              </Text>
              <MaterialIcons name="date-range" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Valid Until</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setValidTo(tomorrow.toISOString().split('T')[0]);
              }}>
              <Text style={[styles.dateText, !validTo && styles.placeholder]}>
                {validTo || 'Select date'}
              </Text>
              <MaterialIcons name="date-range" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
            <MaterialIcons name="qr-code" size={24} color="#fff" />
            <Text style={styles.generateButtonText}>Generate QR Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showQRCode}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowQRCode(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Visitor QR Code</Text>
              <TouchableOpacity onPress={() => setShowQRCode(false)}>
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.qrContainer}>
              {qrCodeData && (
                <ViewShot ref={qrViewRef} options={{ format: 'png', quality: 1.0 }}>
                  <View style={styles.qrCodeImage}>
                    <QRCode
                      value={qrCodeData}
                      size={240}
                      color="black"
                      backgroundColor="white"
                    />
                  </View>
                </ViewShot>
              )}
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={shareQRCode}>
              <MaterialIcons name="share" size={20} color="#fff" />
              <Text style={styles.shareButtonText}>Share QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
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
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  content: { flex: 1, padding: 20 },
  form: { backgroundColor: '#fff', borderRadius: 12, padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#000',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: { fontSize: 16, color: '#000' },
  placeholder: { color: '#999' },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxWidth: 350,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C759',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  qrCodeImage: {
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
});
