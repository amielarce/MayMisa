import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import Home from './layouts/Home';
import Detail from './layouts/Detail';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: styles.header,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}>
        <Stack.Screen name="Home" component={Home} options={{title:"May Misa"}}/>
        <Stack.Screen name="Detail" component={Detail} options={({route}) => ({title: route.params.name})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4b0082',
  }
})

export default App;