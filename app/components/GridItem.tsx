import React, {FC, memo, useMemo} from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Colors} from '../commons/Colors';
import {equals} from '../commons/helpers';
import {Point} from '../commons/types';

interface Props {
  x: number;
  y: number;
  side: number;
  node: Node | null;
  onPress: VoidFunction;
  obstacles?: Point[];
  path?: Node[];
  start: Point | null;
  end: Point | null;
}

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const EFFECTIVE_WIDTH = SCREEN_WIDTH - 80;

const GridItem: FC<Props> = ({
  x,
  y,
  side,
  start,
  end,
  node,
  obstacles,
  path,
  onPress,
}) => {
  const isStart = useMemo(() => start && equals(start, {x, y}), [start, x, y]);
  const isEnd = useMemo(() => end && equals(end, {x, y}), [end, x, y]);

  const isObstacle = useMemo(
    () =>
      node
        ? node.isObstacle
        : obstacles && !!obstacles.find((o) => equals(o, {x, y})),
    [obstacles],
  );
  const f = useMemo(
    () =>
      node && !isObstacle && Math.round(node.f) !== 0
        ? node.f.toPrecision(3)
        : '',
    [isObstacle, node],
  );

  const isPath = useMemo(() => path && !!path.find((n) => equals(n, {x, y})));

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          width: EFFECTIVE_WIDTH / side,
          backgroundColor: isStart
            ? Colors.MALACHITE
            : isEnd
            ? Colors.LILAC_BLUSH
            : isObstacle !== undefined && !!isObstacle
            ? 'grey'
            : isPath
            ? 'red'
            : 'white',
        },
      ]}>
      {isStart && <Text style={styles.innerText}>S</Text>}
      {isEnd && <Text style={styles.innerText}>K</Text>}
      {!!f && !isStart && !isEnd && <Text style={styles.smallerText}>{f}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  innerText: {
    textAlignVertical: 'center',
    fontSize: 24,
  },
  smallerText: {
    fontSize: 12,
  },
});

export default memo(GridItem);
