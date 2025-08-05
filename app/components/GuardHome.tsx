import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../lib/scaling';
import { useTheme } from '../../lib/themeContext';
import { useUser } from '../../lib/userContext';

export default function GuardHome() {
  const router = useRouter();
  const { currentUser } = useUser();
  const { theme, isDarkMode } = useTheme();

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
      marginBottom: verticalScale(20),
    },
    avatarCircle: {
      width: moderateScale(60),
      height: moderateScale(60),
      backgroundColor: 'gold',
      borderRadius: moderateScale(30),
      marginRight: scale(18),
      borderColor: theme.text,
      borderWidth: moderateScale(2),
    },
    nameButton: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(20),
      borderWidth: 1,
      borderColor: theme.border,
      paddingHorizontal: scale(70),
      paddingVertical: verticalScale(10),
      marginLeft: scale(10),
    },
    name: { fontWeight: 'bold', color: theme.text },
    area: { fontWeight: 'bold', color: theme.text },
    noticeBox: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(15),
      height: verticalScale(150),
      padding: moderateScale(10),
      marginBottom: verticalScale(20),
    },
    noticeText: { color: theme.text },
    categories: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: moderateScale(10),
      justifyContent: 'space-around',
    },
    categoryButton: {
      backgroundColor: theme.card,
      padding: moderateScale(20),
      width: '45%',
      alignItems: 'center',
      marginVertical: verticalScale(5),
      borderRadius: moderateScale(10),
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    overlay: {
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
      padding: moderateScale(20),
      borderRadius: moderateScale(20),
    },
    section: {
      marginBottom: verticalScale(30),
    },
    sectionTitle: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: verticalScale(15),
    },
    quickActionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: moderateScale(12),
      padding: moderateScale(15),
      marginBottom: verticalScale(10),
    },
    quickActionText: {
      flex: 1,
      fontSize: moderateScale(16),
      color: theme.text,
      marginLeft: scale(15),
    },
  });

  return (
    <ScrollView style={styles.container}>
      {/* Profile row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>{currentUser?.name || 'Guard'}</Text>
          <Text style={styles.area}>{currentUser?.plotNumber || 'Area'}</Text>
        </TouchableOpacity>

        {/* QR Scanner Button */}
        <TouchableOpacity onPress={() => router.push('/scanner')}>
          <MaterialCommunityIcons
            name="line-scan"
            size={moderateScale(50)}
            color={theme.text}
            style={{ marginLeft: scale(25) }}
          />
        </TouchableOpacity>
      </View>

      {/* Overlay Section */}
      <View style={styles.overlay}>
        {/* Notice */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>Notice</Text>
          <Text style={styles.noticeText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
          </Text>
        </View>

        {/* Visitor Categories */}
        <View style={styles.categories}>
          {[
            {
              id: 'courier',
              label: 'Courier',
              screen: '/courier-entry',
              icon: <MaterialCommunityIcons name="truck-delivery" size={moderateScale(24)} color={theme.text} />,
            },
            { id: 'cab', label: 'Cab/Taxi', screen: '/taxi-entry', icon: <FontAwesome name="cab" size={moderateScale(24)} color={theme.text} /> },
            { id: 'office', label: 'Office', screen: '/office-visitor-entry', icon: <MaterialIcons name="business" size={moderateScale(24)} color={theme.text} /> },
            { id: 'construction', label: 'Construction', screen: '/construction-entry', icon: <MaterialIcons name="build" size={moderateScale(24)} color={theme.text} /> },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton, !isDarkMode && styles.shadow]}
              onPress={() => router.push(item.screen as any)}
            >
              {item.icon && <View style={{ marginBottom: verticalScale(5) }}>{item.icon}</View>}
              <Text style={{ color: theme.text }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={[styles.quickActionButton, !isDarkMode && styles.shadow]}
            onPress={() => router.push('/pre-approve-visitor')}
          >
            <MaterialIcons name="person-add" size={moderateScale(24)} color={theme.primary} />
            <Text style={styles.quickActionText}>Pre-approve Visitor</Text>
            <MaterialIcons name="chevron-right" size={moderateScale(24)} color={theme.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickActionButton, !isDarkMode && styles.shadow]}
            onPress={() => router.push('/visitor-history')}
          >
            <MaterialIcons name="history" size={moderateScale(24)} color={theme.primary} />
            <Text style={styles.quickActionText}>Visitor History</Text>
            <MaterialIcons name="chevron-right" size={moderateScale(24)} color={theme.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickActionButton, !isDarkMode && styles.shadow]}
            onPress={() => router.push('/vehicle-management')}
          >
            <MaterialIcons name="directions-car" size={moderateScale(24)} color={theme.primary} />
            <Text style={styles.quickActionText}>Vehicle Management</Text>
            <MaterialIcons name="chevron-right" size={moderateScale(24)} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
