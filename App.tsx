import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

type StackAParamList = {
  Screen1: undefined;
  Screen2: undefined;
  ScreenX: undefined;
};

type StackBParamList = {
  Screen3: undefined;
  Screen4: undefined;
  ScreenX: undefined;
};

type AppStackParamList = {
  StackA: {
    screen: keyof StackAParamList;
  };
  StackB: {
    screen: keyof StackBParamList;
  };
};

type AnyStackParamList = StackAParamList & StackBParamList & AppStackParamList;

type ScreenProps<T extends keyof AnyStackParamList> = NativeStackScreenProps<AnyStackParamList, T>;

const AppStackStack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  return (
    <AppStackStack.Navigator initialRouteName={'StackA'} screenOptions={{ headerShown: false }}>
      <AppStackStack.Screen component={StackA} name={'StackA'} />
      <AppStackStack.Screen component={StackB} name={'StackB'} />
    </AppStackStack.Navigator>
  );
};

const StackAStack = createNativeStackNavigator<StackAParamList>();

const StackA: React.FC = () => {
  return (
    <StackAStack.Navigator initialRouteName={'Screen1'} screenOptions={navigationHeaderOptions}>
      <StackAStack.Screen component={Screen1} name={'Screen1'} />
      <StackAStack.Screen component={Screen2} name={'Screen2'} />
      <StackAStack.Screen component={ScreenX} name={'ScreenX'} />
    </StackAStack.Navigator>
  );
};

const StackBStack = createNativeStackNavigator<StackBParamList>();

const StackB: React.FC = () => {
  return (
    <StackBStack.Navigator initialRouteName={'Screen3'} screenOptions={navigationHeaderOptions}>
      <StackBStack.Screen component={Screen3} name={'Screen3'} />
      <StackBStack.Screen component={Screen4} name={'Screen4'} />
      <StackBStack.Screen component={ScreenX} name={'ScreenX'} />
    </StackBStack.Navigator>
  );
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Button title='BACK' onPress={() => navigation.goBack()} />
  );
};

const navigationHeaderOptions: NativeStackNavigationOptions = {
  headerLeft: BackButton,
  headerStyle: {
    backgroundColor: 'orange',
  },
  headerTitleStyle: {
    color: 'black',
  },
  headerTitleAlign: 'center',
};

const Screen1: React.FC<ScreenProps<'Screen1'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen1</Text>
      <Button title='TO SCREEN X' onPress={() => navigation.navigate('ScreenX')} />
      <Button title='TO SCREEN 2' onPress={() => navigation.navigate('Screen2')} />
    </View>
  );
};

const Screen2: React.FC<ScreenProps<'Screen2'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen2</Text>
      <Button title='TO SCREEN X' onPress={() => navigation.navigate('ScreenX')} />
      <Button title='TO SCREEN 3' onPress={() => navigation.navigate('StackB', { screen: 'Screen3' })} />
    </View>
  );
};

const ScreenX: React.FC<ScreenProps<'ScreenX'>> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ScreenX</Text>
    </View>
  );
};

const Screen3: React.FC<ScreenProps<'Screen3'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen3</Text>
      <Button title='TO SCREEN X' onPress={() => navigation.navigate('ScreenX')} />
      <Button title='TO SCREEN 4' onPress={() => navigation.navigate('Screen4')} />
    </View>
  );
};

const Screen4: React.FC<ScreenProps<'Screen4'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen4</Text>
      <Button title='TO SCREEN X' onPress={() => navigation.navigate('ScreenX')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    gap: 16,
  },
  text: {
    color: 'white',
  }
});