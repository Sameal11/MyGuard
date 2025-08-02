// components/GuardHome.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Image
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { testVisitors } from '../../lib/testData';
import { useUser } from '../../lib/userContext';

export default function GuardHome() {
  const router = useRouter();
  const { currentUser } = useUser();
  
  return (
    <View style={styles.container}>
      {/* Profile row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>{currentUser?.name || 'Guard'}</Text>
          <Text style={styles.area}>{currentUser?.plotNumber || 'Area'}</Text>
        </TouchableOpacity>
        <TouchableOpacity  >
            <MaterialIcons name="settings" size={50} color="black"  style={{marginLeft: 25,}} />
        </TouchableOpacity>
      </View>


      <View style={styles.overlay}>
        {/* Notice */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>Notice</Text>
          <Text style={styles.noticeText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        </View>

        {/* Visitor Categories */}
        <View style={styles.categories}>
          {
            [
              { id: 'courier', label: 'Courier', screen: '/courier-entry' },
              { id: 'cab', label: 'Cab/Taxi', screen: '/taxi-entry' },
              { id: 'office', label: 'Office', screen: '/office-visitor-entry' },
              { id: 'construction', label: 'Construction', screen: '/construction-entry' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => router.push(item.screen)}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>

      {/* Entry log */}
    </View>
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
    backgroundColor: '#C6FFFF',
    padding: 20,
    width: '45%',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10
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
});
