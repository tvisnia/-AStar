import React, {memo, useState, useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Colors} from '../commons/Colors';
import GridItem from '../components/GridItem';
import OutlinedButton from '../components/OutlinedButton';
import {equals} from '../commons/helpers';
import {Point} from '../commons/types';
import {calculatePath} from '../algorithm/aStar';

const ChooseObstaclesView = () => {
  const route = useRoute();
  const [obstacles, setObstacles] = useState([]);
  const [path, setPath] = useState([]);

  const {side, start, end} = route.params!;

  const onGridPress = (x: number, y: number) => {
    const arr = obstacles as Point[];
    if (!equals({x, y}, start) && !equals({x, y}, end)) {
      const index = arr.findIndex((p) => equals(p, {x, y}));
      if (~index) {
        setObstacles(arr.filter((_, i) => i !== index));
      } else {
        setObstacles([...obstacles, {x, y}]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Wybierz przeszkody</Text>
        <View style={styles.gridContainer}>
          {[...Array(side)].map((_, y) => (
            <View style={{flexDirection: 'row'}}>
              {[...Array(side)].map((_, x) => (
                <View style={{flexDirection: 'row'}}>
                  <GridItem
                    x={x}
                    y={y}
                    side={side}
                    start={start}
                    end={end}
                    obstacles={obstacles}
                    path={path}
                    onPress={() => onGridPress(x, y)}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
        <OutlinedButton
          title="DALEJ"
          onPress={() => {
            const path = calculatePath(side, start, end, obstacles);
            setPath(path);
          }}
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
  gridContainer: {
    marginVertical: 24,
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

export default memo(ChooseObstaclesView);
