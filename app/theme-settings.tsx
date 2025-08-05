import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../lib/scaling';
import { ThemeMode, useTheme } from '../lib/themeContext';

export default function ThemeSettingsScreen() {
  const router = useRouter();
  const { theme, themeMode, setThemeMode } = useTheme();

  const themeOptions: { mode: ThemeMode; title: string; description: string; icon: string }[] = [
    {
      mode: 'light',
      title: 'Light Theme',
      description: 'Always use light theme',
      icon: 'light-mode',
    },
    {
      mode: 'dark',
      title: 'Dark Theme',
      description: 'Always use dark theme',
      icon: 'dark-mode',
    },
    {
      mode: 'system',
      title: 'System Theme',
      description: 'Follow system settings',
      icon: 'settings-brightness',
    },
  ];

  const handleThemeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: scale(20),
      paddingTop: verticalScale(30),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(30),
    },
    backButton: {
      marginRight: scale(15),
    },
    headerTitle: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: theme.text,
    },
    themeOptionsContainer: {
      marginTop: verticalScale(20),
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: moderateScale(15),
      padding: moderateScale(20),
      marginBottom: verticalScale(15),
      borderWidth: 2,
      borderColor: theme.border,
    },
    selectedThemeOption: {
      borderColor: theme.primary,
      backgroundColor: theme.secondary,
    },
    iconContainer: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(25),
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scale(15),
    },
    textContainer: {
      flex: 1,
    },
    optionTitle: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: theme.text,
      marginBottom: verticalScale(5),
    },
    optionDescription: {
      fontSize: moderateScale(14),
      color: theme.text,
      opacity: 0.7,
    },
    checkIcon: {
      marginLeft: scale(10),
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={moderateScale(28)} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme Settings</Text>
      </View>

      {/* Theme Options */}
      <View style={styles.themeOptionsContainer}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.mode}
            style={[
              styles.themeOption,
              themeMode === option.mode && styles.selectedThemeOption,
            ]}
            onPress={() => handleThemeSelect(option.mode)}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={option.icon as any}
                size={moderateScale(24)}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            {themeMode === option.mode && (
              <MaterialIcons
                name="check"
                size={moderateScale(24)}
                color={theme.primary}
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 