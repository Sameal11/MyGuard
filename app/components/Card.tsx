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
  const { theme } = useTheme();
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container
      style={[
        styles.card,
        { backgroundColor: theme.card, shadowColor: theme.text },
        style,
        disabled && styles.disabled,
      ]}
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
