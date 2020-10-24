import {useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, memo, useMemo, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../commons/Colors';
import GridItem from '../components/GridItem';
import OutlinedButton from '../components/OutlinedButton';

interface Props {}

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const EFFECTIVE_WIDTH = SCREEN_WIDTH - 80;

const ChooseStartEndView: FC<Props> = ({}) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const startAndEndChoosed = useMemo(() => !!start && !!end, [start, end]);

  const side = route.params.gridSide;

  const chooseObstacles = () => {
    navigation.navigate('ChooseObstacles', {
      side,
      start,
      end,
    });
  };

  const addStartEnd = (x: number, y: number) => {
    if (!startAndEndChoosed) {
      if (!!!start) setStart({x, y});
      else setEnd({x, y});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Wybierz początek i koniec</Text>
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
                    onPress={() => addStartEnd(x, y)}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
        <OutlinedButton
          title="DALEJ"
          onPress={() => chooseObstacles()}
          disabled={!startAndEndChoosed}
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

export default memo(ChooseStartEndView);
