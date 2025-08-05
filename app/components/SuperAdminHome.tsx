import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../lib/scaling';
import { testHouses, testReports, testMaintenanceRequests, testVisitors } from '../../lib/testData';
import { useTheme } from '../../lib/themeContext';
import { useUser } from '../../lib/userContext';
import Card from './Card';

export default function SuperAdminHome() {
  const router = useRouter();
  const { currentUser } = useUser();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.card,
      padding: scale(20),
      paddingTop: verticalScale(50),
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerTitle: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: verticalScale(5),
    },
    headerSubtitle: {
      fontSize: moderateScale(16),
      color: theme.text,
      opacity: 0.7,
    },
    content: {
      padding: scale(20),
    },
    section: {
      marginBottom: verticalScale(30),
    },
    sectionTitle: {
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: verticalScale(15),
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: verticalScale(20),
    },
    statCard: {
      width: '48%',
      backgroundColor: theme.card,
      borderRadius: moderateScale(12),
      padding: moderateScale(15),
      marginBottom: verticalScale(10),
      borderWidth: 1,
      borderColor: theme.border,
    },
    statNumber: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: verticalScale(5),
    },
    statLabel: {
      fontSize: moderateScale(14),
      color: theme.text,
      opacity: 0.7,
    },
    quickActions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    actionButton: {
      width: '48%',
      backgroundColor: theme.card,
      borderRadius: moderateScale(12),
      padding: moderateScale(20),
      marginBottom: verticalScale(10),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionIcon: {
      marginBottom: verticalScale(10),
    },
    actionText: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },
    recentSection: {
      marginTop: verticalScale(20),
    },
    recentItem: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(8),
      padding: moderateScale(15),
      marginBottom: verticalScale(10),
      borderWidth: 1,
      borderColor: theme.border,
    },
    recentTitle: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: theme.text,
      marginBottom: verticalScale(5),
    },
    recentSubtitle: {
      fontSize: moderateScale(14),
      color: theme.text,
      opacity: 0.7,
    },
  });

  const totalHouses = testHouses.length;
  const totalVisitors = testVisitors.length;
  const pendingReports = testReports.filter(r => r.status === 'pending').length;
  const pendingMaintenance = testMaintenanceRequests.filter(m => m.status === 'pending').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Super Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back, {currentUser?.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalHouses}</Text>
              <Text style={styles.statLabel}>Total Houses</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalVisitors}</Text>
              <Text style={styles.statLabel}>Total Visitors</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{pendingReports}</Text>
              <Text style={styles.statLabel}>Pending Reports</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{pendingMaintenance}</Text>
              <Text style={styles.statLabel}>Pending Maintenance</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="people" size={moderateScale(24)} color={theme.primary} style={styles.actionIcon} />
              <Text style={styles.actionText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="home" size={moderateScale(24)} color={theme.primary} style={styles.actionIcon} />
              <Text style={styles.actionText}>Manage Houses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="security" size={moderateScale(24)} color={theme.primary} style={styles.actionIcon} />
              <Text style={styles.actionText}>Security Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="build" size={moderateScale(24)} color={theme.primary} style={styles.actionIcon} />
              <Text style={styles.actionText}>Maintenance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="analytics" size={moderateScale(24)} color={theme.primary} style={styles.actionIcon} />
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="settings" size={moderateScale(24)} color={theme.primary} style={styles.actionIcon} />
              <Text style={styles.actionText}>System Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Reports */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          {testReports.slice(0, 3).map((report) => (
            <View key={report.id} style={styles.recentItem}>
              <Text style={styles.recentTitle}>{report.title}</Text>
              <Text style={styles.recentSubtitle}>
                {report.reporterName} • {report.type} • {report.status}
              </Text>
            </View>
          ))}
        </View>

        {/* Recent Maintenance */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Maintenance</Text>
          {testMaintenanceRequests.slice(0, 3).map((request) => (
            <View key={request.id} style={styles.recentItem}>
              <Text style={styles.recentTitle}>{request.title}</Text>
              <Text style={styles.recentSubtitle}>
                Priority: {request.priority} • Status: {request.status}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 