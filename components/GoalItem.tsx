import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const GoalItem: FC<{ title: string; onDelete: (goalId: number) => void, id: number }> = ({
  title,
  id,
  onDelete
}) => {
  return (
    <TouchableOpacity activeOpacity={.8} onPress={onDelete.bind(this, id)}>
      <View style={styles.listItem}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10
  }
});
