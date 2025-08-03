// components/GuardHome.tsx
// components/GuardHome.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useUser } from '../../lib/userContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import iconSet from '@expo/vector-icons/build/Fontisto';

export default function GuardHome() {
  const router = useRouter();
  const { currentUser } = useUser();

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
            size={50}
            color="black"
            style={{ marginLeft: 25 }}
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
              icon: <MaterialCommunityIcons name="truck-delivery" size={24} color="black" />,
            },
            { id: 'cab', label: 'Cab/Taxi', screen: '/taxi-entry',icon: <FontAwesome name="cab" size={24} color="black" /> },
            { id: 'office', label: 'Office', screen: '/office-visitor-entry' , icon: <MaterialIcons name="business" size={24} color="black" />},
            { id: 'construction', label: 'Construction', screen: '/construction-entry', icon: <MaterialIcons name="build" size={24} color="black" /> },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryButton}
              onPress={() => router.push(item.screen)}
            >
              {item.icon && <View style={{ marginBottom: 5 }}>{item.icon}</View>}
              <Text>{item.label}</Text>
            </TouchableOpacity>
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
            <Text style={styles.quickActionText}>Vehicle Management</Text>
            <MaterialIcons name="chevron-right" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f7ff', padding: 20 ,paddingTop:30},
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 , marginTop:0},
  avatarCircle: { width: 60, height: 60, backgroundColor: 'gold', borderRadius: 30, marginRight: 18, borderBlockColor: 'black', borderWidth: 2 },
  nameButton: { backgroundColor: '#fff', borderRadius: 20,borderWidth:1, paddingHorizontal: 70, paddingVertical: 10, marginLeft: 10 },
  name: { fontWeight: 'bold' , color: 'black' },
  plot: { fontWeight: 'bold', color: 'black' },
  area: { fontWeight: 'bold', color: 'black' },
  noticeBox: { backgroundColor: '#2F3A45', borderRadius: 15,height:150, padding: 10, marginBottom: 20 },
  noticeText: { color: '#fff' },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-around' },
  categoryButton: {
    backgroundColor: '#fff',
    padding: 20,
    width: '45%',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlay: {
    
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    backgroundColor: 'rgba(38,185,255,0.8)',
    padding: 20,
    borderRadius: 20,
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
