import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { moderateScale, verticalScale } from '../../lib/scaling';
import { useTheme } from '../../lib/themeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  disabled = false,
}) => {
  const { theme, isDarkMode } = useTheme();
  const Container = onPress ? TouchableOpacity : View;

  const cardStyle = [
    styles.card,
    { backgroundColor: theme.card },
    !isDarkMode && styles.shadow, // Apply shadow only in light mode
    style,
    disabled && styles.disabled,
  ];
  
  return (
    <Container
      style={cardStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginVertical: verticalScale(8),
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
  disabled: {
    opacity: 0.5,
  },
});

export default Card;
