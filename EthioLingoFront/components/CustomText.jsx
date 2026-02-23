import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { Typography } from '../styles/typography';

export const CustomText = ({ children, style, variant = 'body', color, ...props }) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      default:
        return styles.body;
    }
  };

  return (
    <Text style={[getVariantStyle(), color && { color }, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  body: {
    fontSize: Typography.sizes.md,
    color: Colors.textPrimary,
  },
  caption: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
});
