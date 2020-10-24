import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainView from './app/view/MainView';

const App = () => (
  <>
    <SafeAreaView style={styles.container}>
      <MainView />
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
