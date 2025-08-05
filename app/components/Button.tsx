import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '../../lib/scaling';
import { useTheme } from '../../lib/themeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme, isDarkMode } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'danger':
        return '#FF3B30';
      case 'secondary':
        return theme.card;
      default:
        return 'transparent';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return theme.background;
      default:
        return theme.primary;
    }
  };

  const styles = StyleSheet.create({
    button: {
      borderRadius: moderateScale(8),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
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
    // Sizes
    small: {
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(8),
      minHeight: verticalScale(32),
    },
    medium: {
      paddingHorizontal: scale(24),
      paddingVertical: verticalScale(12),
      minHeight: verticalScale(44),
    },
    large: {
      paddingHorizontal: scale(32),
      paddingVertical: verticalScale(16),
      minHeight: verticalScale(56),
    },
    // Text styles
    text: {
      fontWeight: '600',
      textAlign: 'center',
    },
    smallText: {
      fontSize: moderateScale(14),
    },
    mediumText: {
      fontSize: moderateScale(16),
    },
    largeText: {
      fontSize: moderateScale(18),
    },
    // Disabled state
    disabled: {
      opacity: 0.5,
    },
    disabledText: {
      opacity: 0.7,
    },
  });

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: theme.primary,
      borderWidth: variant === 'outline' ? 1 : 0,
    },
    !isDarkMode && styles.shadow,
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    { color: getTextColor() },
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={getTextColor()}
          size="small"
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
