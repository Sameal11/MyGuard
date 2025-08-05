import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../lib/scaling';
import { testNotices, testVisitors } from '../../lib/testData';
import { useTheme } from '../../lib/themeContext';

export default function ResidentHome() {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const visitors = testVisitors;
  const notices = testNotices;

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
      justifyContent: 'space-between',
      marginBottom: verticalScale(20),
    },
    avatarCircle: {
      width: moderateScale(60),
      height: moderateScale(60),
      backgroundColor: 'gold',
      borderRadius: moderateScale(30),
      borderColor: theme.text,
      borderWidth: moderateScale(2),
    },
    nameButton: {
      flex: 1,
      marginHorizontal: scale(20),
      backgroundColor: theme.card,
      borderRadius: moderateScale(20),
      borderWidth: 1,
      borderColor: theme.border,
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
    overlay: {
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
      padding: moderateScale(3),
      borderRadius: moderateScale(20),
      flex: 1,
    },
    noticeBox: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(15),
      padding: moderateScale(10),
      marginBottom: verticalScale(25),
      height: verticalScale(150),
    },
    noticeTitle: {
      color: theme.text,
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      marginBottom: verticalScale(5),
      marginLeft: scale(10),
    },
    noticeText: {
      color: theme.text,
      fontSize: moderateScale(14),
      marginLeft: scale(10),
    },
    visitorLogContainer: {
      marginTop: verticalScale(10),
      backgroundColor: theme.card,
      borderRadius: moderateScale(10),
      padding: moderateScale(1),
    },
    sectionTitle: {
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: verticalScale(10),
      marginLeft: scale(10),
    },
    scrollRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    visitorItem: {
      alignItems: 'center',
      marginRight: scale(15),
      marginLeft: scale(15),
    },
    visitorImage: {
      width: moderateScale(60),
      height: moderateScale(60),
      borderRadius: moderateScale(30),
      backgroundColor: '#ddd',
    },
    visitorName: {
      marginTop: verticalScale(5),
      fontSize: moderateScale(12),
      color: theme.text,
    },
    moreItem: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: scale(10),
    },
    sections: {
      marginBottom: verticalScale(30),
    },
    sectionTitles: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: verticalScale(15),
      marginTop: verticalScale(10),
    },
    quickActionButton: {
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
    quickActionText: {
      flex: 1,
      fontSize: moderateScale(16),
      color: theme.text,
      marginLeft: scale(15),
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      {/* Header */}
      {/* Profile Row */}
      <View style={styles.profileRow}>
        <View style={styles.avatarCircle} />
        <TouchableOpacity style={styles.nameButton}>
          <Text style={styles.name}>Anuj Munda</Text>
          <Text style={styles.area}>Plot-101</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <MaterialCommunityIcons name="alert-decagram" size={moderateScale(32)} color={theme.text} />
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
                <MaterialIcons name="navigate-next" size={moderateScale(40)} color={theme.text} />
                <Text style={styles.visitorName}>More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
        <View style={styles.sections}>
          <Text style={styles.sectionTitles}>Quick Actions</Text>
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
      </View>
    </View>
  );
}
