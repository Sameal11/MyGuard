import { BarcodeScanningResult, CameraView, PermissionStatus, useCameraPermissions, CameraType } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';


export default function ScannerScreen() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) return;
    if (permission.status !== PermissionStatus.GRANTED && permission.status !== PermissionStatus.DENIED) {
      (async () => {
        await requestPermission();
      })();
    }
  }, [permission]);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert('QR Code Scanned', result.data);
  };

  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (permission.status === PermissionStatus.DENIED) {
    return <Text>Camera permission denied. Please enable it in settings.</Text>;
  }

  if (permission.status !== PermissionStatus.GRANTED) {
    return <Text>Requesting camera permission...</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Button title="Scan Again" onPress={() => setScanned(false)} color="coral" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
});
