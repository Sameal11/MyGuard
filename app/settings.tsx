import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../lib/scaling';
import { useTheme } from '../lib/themeContext';
import { useUser } from '../lib/userContext';

export default function ResidentSettingsScreen() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUser();
  const { theme, toggleTheme, isDarkMode } = useTheme();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: scale(20),
      paddingTop: verticalScale(30),
      justifyContent: 'flex-start',
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: verticalScale(20),
    },
    avatarCircle: {
      width: moderateScale(60),
      height: moderateScale(60),
      backgroundColor: 'gold',
      borderRadius: moderateScale(30),
      borderColor: 'black',
      borderWidth: moderateScale(2),
    },
    nameButton: {
      flex: 1,
      marginHorizontal: scale(20),
      backgroundColor: theme.card,
      borderRadius: moderateScale(20),
      borderWidth: 1,
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(10),
    },
    name: {
      fontWeight: 'bold',
      color: theme.text,
      fontSize: moderateScale(16),
    },
    area: {
      color: theme.text,
      fontSize: moderateScale(14),
    },
    settingsList: {
      marginTop: verticalScale(20),
      marginBottom: verticalScale(40),
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: moderateScale(15),
      padding: moderateScale(18),
      marginBottom: verticalScale(18),
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    icon: {
      marginRight: scale(18),
    },
    settingsText: {
      fontSize: moderateScale(18),
      color: theme.text,
      fontWeight: '500',
    },
    positionCard: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(15),
      padding: moderateScale(18),
      marginBottom: verticalScale(18),
      borderWidth: 1,
      borderColor: '#2196F3',
    },
    positionLabel: {
      fontSize: moderateScale(14),
      color: theme.text,
      fontWeight: '500',
      marginBottom: verticalScale(5),
    },
    positionText: {
      fontSize: moderateScale(18),
      color: theme.text,
      fontWeight: 'bold',
    },
  });

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
        <View style={styles.settingsItem}>
          <MaterialIcons name="brightness-6" size={moderateScale(28)} color="#39AEE4" style={styles.icon} />
          <Text style={styles.settingsText}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            style={{ marginLeft: 'auto' }}
          />
        </View>
        {currentUser?.userType === 'resident' && (
          <>
            <TouchableOpacity style={styles.settingsItem}>
              <MaterialIcons name="group" size={moderateScale(28)} color="#39AEE4" style={styles.icon} />
              <Text style={styles.settingsText}>My Flatmates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem} onPress={handleVehicleManagement}>
              <MaterialIcons name="directions-car" size={moderateScale(28)} color="#39AEE4" style={styles.icon} />
              <Text style={styles.settingsText}>Vehicle</Text>
            </TouchableOpacity>
          </>
        )}
        
        {currentUser?.userType === 'guard' && (
          <>
            <View style={styles.positionCard}>
              <Text style={styles.positionLabel}>Position</Text>
              <Text style={styles.positionText}>{currentUser?.position || 'Security Guard'}</Text>
            </View>
            
            <TouchableOpacity style={styles.settingsItem}>
              <MaterialIcons name="group" size={moderateScale(28)} color="#39AEE4" style={styles.icon} />
              <Text style={styles.settingsText}>Other Guard Details</Text>
            </TouchableOpacity>
          </>
        )}
        
        <TouchableOpacity style={styles.settingsItem}>
          <MaterialIcons name="support-agent" size={moderateScale(28)} color="#39AEE4" style={styles.icon} />
          <Text style={styles.settingsText}>Manage Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem} onPress={handleLogout}>
          <MaterialIcons name="logout" size={moderateScale(28)} color="#E43A3A" style={styles.icon} />
          <Text style={[styles.settingsText, { color: '#E43A3A' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
