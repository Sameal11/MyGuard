import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useUser } from '../lib/userContext';

export default function ResidentSettingsScreen() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUser();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            setCurrentUser(null);
            router.replace('/auth');
          },
        },
      ]
    );
  };

  const handleVehicleManagement = () => {
    router.push('/vehicle-management');
  };
  return (
    <View style={styles.container}>
      {/* Profile Row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>{currentUser?.name || 'User'}</Text>
          <Text style={styles.area}>{currentUser?.plotNumber || 'N/A'}</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsList}>
        {currentUser?.userType === 'resident' && (
          <TouchableOpacity style={styles.settingsItem}>
            <MaterialIcons name="group" size={28} color="#39AEE4" style={styles.icon} />
            <Text style={styles.settingsText}>My Flatmates</Text>
          </TouchableOpacity>
        )}
        
        {currentUser?.userType === 'guard' && (
          <>
            <View style={styles.positionCard}>
              <Text style={styles.positionLabel}>Position</Text>
              <Text style={styles.positionText}>{currentUser?.position || 'Security Guard'}</Text>
            </View>
            
            <TouchableOpacity style={styles.settingsItem}>
              <MaterialIcons name="group" size={28} color="#39AEE4" style={styles.icon} />
              <Text style={styles.settingsText}>Other Guard Details</Text>
            </TouchableOpacity>
          </>
        )}
        
        <TouchableOpacity style={styles.settingsItem} onPress={handleVehicleManagement}>
          <MaterialIcons name="directions-car" size={28} color="#39AEE4" style={styles.icon} />
          <Text style={styles.settingsText}>Vehicle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <MaterialIcons name="support-agent" size={28} color="#39AEE4" style={styles.icon} />
          <Text style={styles.settingsText}>Manage Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem} onPress={handleLogout}>
          <MaterialIcons name="logout" size={28} color="#E43A3A" style={styles.icon} />
          <Text style={[styles.settingsText, { color: '#E43A3A' }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f7',
    padding: 20,
    paddingTop: 30,
    justifyContent: 'flex-start',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'gold',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
  },
  nameButton: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  area: {
    color: 'black',
    fontSize: 14,
  },
  settingsList: {
    marginTop: 20,
    marginBottom: 40,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 18,
  },
  settingsText: {
    fontSize: 18,
    color: '#222',
    fontWeight: '500',
  },
  positionCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  positionLabel: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
    marginBottom: 5,
  },
  positionText: {
    fontSize: 18,
    color: '#0D47A1',
    fontWeight: 'bold',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 10,
    zIndex: 100,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 13,
    color: '#39AEE4',
    marginTop: 2,
  },
});
