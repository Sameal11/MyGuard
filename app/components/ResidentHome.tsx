// components/ResidentHome.tsx
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { testVisitors, testNotices } from '../../lib/testData';

export default function ResidentHome() {
  const router = useRouter();
  const visitors = testVisitors;
  const notices = testNotices;

  return (
    <View style={styles.container}>
      {/* Profile Row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>Anuj Munda</Text>
          <Text style={styles.area}>Plot-101</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <MaterialCommunityIcons name="alert-decagram" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content Overlay */}
      <View style={styles.overlay}>
        {/* Notice */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>{notices[0]?.title || 'Notice'}</Text>
          <Text style={styles.noticeText}>
            {notices[0]?.content || 'No notices available at the moment.'}
          </Text>
        </View>

        {/* Visitors */}
        <View style={styles.visitorLogContainer}>
          <Text style={styles.sectionTitle}>Today’s Visitors</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollRow}>
            {visitors.slice(0, 3).map((visitor, index) => (
              <View key={index} style={styles.visitorItem}>
                <Image source={{ uri: visitor.image }} style={styles.visitorImage} />
                <Text style={styles.visitorName}>{visitor.name}</Text>
              </View>
            ))}
            {visitors.length > 4 && (
              <TouchableOpacity style={styles.moreItem} onPress={() => router.push('/(tab)/visitor-management')}>
                <MaterialIcons name="navigate-next" size={40} color="black" />
                <Text style={styles.visitorName}>More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
        <View style={styles.sections}>
          <Text style={styles.sectionTitles}>Quick Actions</Text>
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
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  settingsIcon: {
    marginLeft: 10,
  },

  overlay: {
    backgroundColor: 'rgba(57, 174, 228, 0.8)',
    padding: 3,
    borderRadius: 20,
    flex: 1,
  },

  noticeBox: {
    backgroundColor: '#2F3A45',
    borderRadius: 15,
    padding: 0,
    marginBottom: 25,
    height: 150,
  },

  noticeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    padding:3,
    marginLeft: 10,
  },

  noticeText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginLeft: 10,
  },

  visitorLogContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding:1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginLeft: 10,
  },

  scrollRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  visitorItem: {
    alignItems: 'center',
    marginRight: 15,
    marginLeft:15,
  },

  visitorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },

  visitorName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },

  moreItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sections: {
    marginBottom: 30,
  },
  sectionTitles: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    marginTop: 10,
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
