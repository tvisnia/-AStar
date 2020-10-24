import React, {memo, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import GridItem from '../components/GridItem';
import OutlinedButton from '../components/OutlinedButton';
import {Colors} from '../commons/Colors';
import {equals} from '../commons/helpers';
import {calculatePath} from '../algorithm/aStar';
import {Point} from '../commons/types';

const ChooseObstaclesView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [obstacles, setObstacles] = useState([]);
  const [path, setPath] = useState([]);
  const [grid, setGrid] = useState([]);

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

  const calculate = () => {
    const {path, grid} = calculatePath(side, start, end, obstacles);
    setPath(path);
    setGrid(grid);
  };

  const reset = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Wybierz przeszkody</Text>
        <View style={styles.gridContainer}>
          {[...Array(side)].map((_, y) => (
            <View style={styles.withRow}>
              {[...Array(side)].map((_, x) => (
                <View style={styles.withRow}>
                  <GridItem
                    x={x}
                    y={y}
                    node={!!grid.length ? grid[y][x] : null}
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
        <View style={styles.withRow}>
          <OutlinedButton
            title="URUCHOM"
            onPress={calculate}
            disabled={false}
          />
          <OutlinedButton
            title="OD POCZĄTKU"
            onPress={reset}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  withRow: {
    flexDirection: 'row',
  },
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
