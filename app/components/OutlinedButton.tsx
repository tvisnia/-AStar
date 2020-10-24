import React, {FC, memo} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../commons/Colors';

interface Props {
  title: string;
  disabled: boolean;
  onPress: VoidFunction;
}

const OutlinedButton: FC<Props> = ({title, onPress, disabled}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.container,
      {backgroundColor: disabled ? Colors.CHETWODE_BLUE : Colors.ROYAL_BLUE},
    ]}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});

export default memo(OutlinedButton);
