import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

export const BodyText: FC<{ style?: {} }> = ({ style, children }) => {
  return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  }
});
