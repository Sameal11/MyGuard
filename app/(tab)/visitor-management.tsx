import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { testVisitors } from '../../lib/testData';

export default function VisitorManagement() {
  const router = useRouter();
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

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Visitor Management</Text>
        <TouchableOpacity 
          onPress={() => router.push('/pre-approve-visitor')}
          style={styles.addButton}
        >
          <MaterialIcons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.content}>
        {/* Pending Approvals */}
        {pendingVisitors.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Approvals</Text>
            {pendingVisitors.map((visitor) => (
              <View key={visitor.id} style={styles.visitorCard}>
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
                    <MaterialIcons name="check" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleApproval(visitor.id, 'reject')}
                  >
                    <MaterialIcons name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Today's Visitors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Visitors</Text>
          {todayVisitors.map((visitor) => (
            <View key={visitor.id} style={styles.visitorCard}>
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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/pre-approve-visitor')}
          >
            <MaterialIcons name="person-add" size={24} color="#007AFF" />
            <Text style={styles.quickActionText}>Pre-approve Visitor</Text>
            <MaterialIcons name="chevron-right" size={24} color="#007AFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/visitor-history')}
          >
            <MaterialIcons name="history" size={24} color="#007AFF" />
            <Text style={styles.quickActionText}>Visitor History</Text>
            <MaterialIcons name="chevron-right" size={24} color="#007AFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/vehicle-management')}
          >
            <MaterialIcons name="directions-car" size={24} color="#007AFF" />
            <Text style={styles.quickActionText}>Vehicle History</Text>
            <MaterialIcons name="chevron-right" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  visitorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  visitorInfo: {
    flex: 1,
    marginLeft: 15,
  },
  visitorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  visitorPurpose: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  visitorTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
  },
});
