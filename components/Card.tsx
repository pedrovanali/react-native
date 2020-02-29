import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';


export const Card: FC<{ style?: {} }> = ({ style, children }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 20,
    borderRadius: 10
  }
});
