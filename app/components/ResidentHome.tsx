// components/GuardHome.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GuardHome() {
  const visitors = [
    { name: 'John Doe', image: 'https://via.placeholder.com/60' },
    { name: 'Jane Smith', image: 'https://via.placeholder.com/60' },
    { name: 'Alice Johnson', image: 'https://via.placeholder.com/60' },
    { name: 'Bob Brown', image: 'https://via.placeholder.com/60' },
    { name: 'Plumber', image: 'https://via.placeholder.com/60' },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>Anuj Munda</Text>
          <Text style={styles.area}>Plot-101</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="settings" size={32} color="black" style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      {/* Content Overlay */}
      <View style={styles.overlay}>
        {/* Notice */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>Notice</Text>
          <Text style={styles.noticeText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
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
              <TouchableOpacity style={styles.moreItem} onPress={() => console.log("View more visitors")}>
                <MaterialIcons name="navigate-next" size={40} color="black" />
                <Text style={styles.visitorName}>More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
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
    padding: 20,
    borderRadius: 20,
    flex: 1,
  },

  noticeBox: {
    backgroundColor: '#2F3A45',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    height: 150,
  },

  noticeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  noticeText: {
    color: '#e0e0e0',
    fontSize: 14,
  },

  visitorLogContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
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
});
