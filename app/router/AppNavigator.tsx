import 'react-native-gesture-handler';
import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {transitionConfig} from './TransitionConfig';
import MainView from '../view/MainView';
import ChooseStartEndView from '../view/ChooseStartEndView';
import ChooseObstaclesView from '../view/ChooseObstaclesView';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          ...transitionConfig({route, navigation}),
        })}>
        <Stack.Screen name="Main" component={MainView} />
        <Stack.Screen name="ChooseStartEnd" component={ChooseStartEndView} />
        <Stack.Screen name="ChooseObstacles" component={ChooseObstaclesView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
