import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../lib/scaling';
import { testVisitors } from '../../lib/testData';
import { useTheme } from '../../lib/themeContext';

export default function VisitorManagement() {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const [visitors, setVisitors] = useState(testVisitors);

  const handleApproval = (visitorId: string, action: 'approve' | 'reject') => {
    setVisitors(prev =>
      prev.map(visitor =>
        visitor.id === visitorId
          ? { ...visitor, status: action === 'approve' ? 'approved' : 'rejected' }
          : visitor
      )
    );

    Alert.alert(
      'Success',
      `Visitor ${action === 'approve' ? 'approved' : 'rejected'} successfully!`
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      case 'pending':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const pendingVisitors = visitors.filter(v => v.status === 'pending');
  const todayVisitors = visitors.filter(v => v.status !== 'pending');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      padding: moderateScale(20),
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
    visitorCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: moderateScale(12),
      padding: moderateScale(15),
      marginBottom: verticalScale(10),
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
    visitorImage: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(25),
      backgroundColor: '#ddd',
    },
    visitorInfo: {
      flex: 1,
      marginLeft: scale(15),
    },
    visitorName: {
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      color: theme.text,
    },
    visitorPurpose: {
      fontSize: moderateScale(14),
      color: theme.text,
      marginTop: verticalScale(2),
    },
    visitorTime: {
      fontSize: moderateScale(12),
      color: theme.text,
      marginTop: verticalScale(2),
    },
    actionButtons: {
      flexDirection: 'row',
      gap: moderateScale(10),
    },
    actionButton: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    approveButton: {
      backgroundColor: '#4CAF50',
    },
    rejectButton: {
      backgroundColor: '#F44336',
    },
    statusBadge: {
      paddingHorizontal: scale(12),
      paddingVertical: verticalScale(6),
      borderRadius: moderateScale(12),
    },
    statusText: {
      color: '#fff',
      fontSize: moderateScale(12),
      fontWeight: 'bold',
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
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {pendingVisitors.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Approvals</Text>
            {pendingVisitors.map((visitor) => (
              <View key={visitor.id} style={[styles.visitorCard, !isDarkMode && styles.shadow]}>
                <Image source={{ uri: visitor.image }} style={styles.visitorImage} />
                <View style={styles.visitorInfo}>
                  <Text style={styles.visitorName}>{visitor.name}</Text>
                  <Text style={styles.visitorPurpose}>{visitor.purpose}</Text>
                  <Text style={styles.visitorTime}>{visitor.visitTime}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleApproval(visitor.id, 'approve')}
                  >
                    <MaterialIcons name="check" size={moderateScale(20)} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleApproval(visitor.id, 'reject')}
                  >
                    <MaterialIcons name="close" size={moderateScale(20)} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Visitors</Text>
          {todayVisitors.map((visitor) => (
            <View key={visitor.id} style={[styles.visitorCard, !isDarkMode && styles.shadow]}>
              <Image source={{ uri: visitor.image }} style={styles.visitorImage} />
              <View style={styles.visitorInfo}>
                <Text style={styles.visitorName}>{visitor.name}</Text>
                <Text style={styles.visitorPurpose}>{visitor.purpose}</Text>
                <Text style={styles.visitorTime}>{visitor.visitTime}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(visitor.status) }]}>
                <Text style={styles.statusText}>{visitor.status.toUpperCase()}</Text>
              </View>
            </View>
          ))}
        </View>

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
            <Text style={styles.quickActionText}>Vehicle History</Text>
            <MaterialIcons name="chevron-right" size={moderateScale(24)} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
