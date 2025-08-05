import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import { moderateScale, scale, verticalScale } from '../lib/scaling';
import { useTheme } from '../lib/themeContext';

export default function PreApproveVisitor() {
  const router = useRouter();
  const { theme } = useTheme();
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorType, setVisitorType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrData, setQrData] = useState('');
  const qrViewRef = useRef<ViewShot>(null);

  const visitorTypes = [
    { label: 'Family Member', value: 'family' },
    { label: 'Friend', value: 'friend' },
    { label: 'Delivery Person', value: 'delivery' },
    { label: 'Service Provider', value: 'service' },
    { label: 'Business Associate', value: 'business' },
  ];

  const generateQRCode = () => {
    if (!visitorName || !visitorPhone || !visitorType) {
      Alert.alert('Error', 'Please fill in all required fields marked with *');
      return;
    }

    const data = {
      visitorName,
      visitorPhone,
      visitorType,
      purpose,
      validFrom,
      validTo,
      generatedAt: new Date().toISOString(),
    };

    setQrData(JSON.stringify(data));
    setShowQRCode(true);
  };

  const shareQRCode = async () => {
    try {
      if (qrViewRef.current && qrViewRef.current.capture) {
        const uri = await qrViewRef.current.capture();
        if (uri) {
          // Here you would implement sharing functionality
          Alert.alert('Success', 'QR Code generated successfully!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR code');
    }
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
    content: {
      flex: 1,
      padding: scale(20),
    },
    form: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(12),
      padding: scale(20),
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
    textArea: {
      height: verticalScale(80),
      textAlignVertical: 'top',
    },
    pickerContainer: {
      backgroundColor: theme.secondary,
      borderRadius: moderateScale(8),
      borderWidth: 1,
      borderColor: theme.border,
    },
    pickerInput: {
      fontSize: moderateScale(16),
      color: theme.text,
      padding: moderateScale(12),
    },
    dateInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.secondary,
      borderRadius: moderateScale(8),
      padding: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.border,
    },
    dateText: {
      fontSize: moderateScale(16),
      color: theme.text,
    },
    placeholder: {
      color: theme.text,
      opacity: 0.7,
    },
    generateButton: {
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: moderateScale(15),
      borderRadius: moderateScale(10),
      marginTop: verticalScale(20),
    },
    generateButtonText: {
      color: theme.background,
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      marginLeft: moderateScale(8),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(12),
      padding: scale(20),
      alignItems: 'center',
      margin: scale(20),
    },
    modalTitle: {
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: verticalScale(20),
    },
    qrContainer: {
      backgroundColor: '#fff',
      padding: moderateScale(20),
      borderRadius: moderateScale(8),
      marginBottom: verticalScale(20),
    },
    modalButtons: {
      flexDirection: 'row',
      gap: moderateScale(10),
    },
    modalButton: {
      flex: 1,
      padding: moderateScale(12),
      borderRadius: moderateScale(8),
      alignItems: 'center',
    },
    shareButton: {
      backgroundColor: theme.primary,
    },
    closeButton: {
      backgroundColor: theme.secondary,
      borderWidth: 1,
      borderColor: theme.border,
    },
    buttonText: {
      fontSize: moderateScale(16),
      fontWeight: '600',
    },
    shareButtonText: {
      color: theme.background,
    },
    closeButtonText: {
      color: theme.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pre-approve Visitor</Text>
        <View style={{ width: moderateScale(32) }} />
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
              placeholderTextColor={theme.text}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={visitorPhone}
              onChangeText={setVisitorPhone}
              placeholder="Enter visitor's phone number"
              placeholderTextColor={theme.text}
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
              placeholderTextColor={theme.text}
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
              <MaterialIcons name="date-range" size={24} color={theme.primary} />
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
              <MaterialIcons name="date-range" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
            <MaterialIcons name="qr-code" size={24} color={theme.background} />
            <Text style={styles.generateButtonText}>Generate QR Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showQRCode}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQRCode(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Visitor QR Code</Text>
            <ViewShot ref={qrViewRef} style={styles.qrContainer}>
              <QRCode value={qrData} size={200} />
            </ViewShot>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.shareButton]}
                onPress={shareQRCode}
              >
                <Text style={[styles.buttonText, styles.shareButtonText]}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => setShowQRCode(false)}
              >
                <Text style={[styles.buttonText, styles.closeButtonText]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
