import React, {memo, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';
import {Colors} from '../commons/Colors';
import {GRID_SIDES} from '../commons/Const';
import OutlinedButton from '../components/OutlinedButton';
import {useNavigation} from '@react-navigation/native';

var PickerItem = Picker.Item;

const MainView = () => {
  const [size, setSize] = useState(5);
  const navigation = useNavigation();

  const onGridSizeChange = (size: number) => {
    setSize(size);
  };

  const chooseStartEnd = () => {
    navigation.navigate('ChooseStartEnd', {
      gridSide: size,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Podaj szerokość siatki</Text>
        <Picker
          style={styles.picker}
          selectedValue={size}
          itemStyle={styles.pickerItem}
          onValueChange={(side: number) => {
            onGridSizeChange(side);
          }}>
          {GRID_SIDES.map((v, i) => (
            <PickerItem label={v.toString()} value={v} key={'u' + i} />
          ))}
        </Picker>
        <OutlinedButton
          title="DALEJ"
          onPress={chooseStartEnd}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
  },
  picker: {
    width: 64,
    height: 160,
    margin: 24,
  },
  pickerItem: {
    color: '#000',
    fontSize: 24,
  },
  card: {
    padding: 16,
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.ICE_COLD,
    borderWidth: 1,
    borderColor: Colors.SILVER,
    margin: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default memo(MainView);
