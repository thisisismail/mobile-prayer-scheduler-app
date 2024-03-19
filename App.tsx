import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LocationProvider} from './src/context/LocationContext';
import {ModalProvider} from './src/context/ModalContext';
import Home from './src/screens/Home';
import Quran from './src/assets/icon-components/Quran';
import Kiblat from './src/assets/icon-components/Kiblat';
import Solat from './src/assets/icon-components/Solat';
import TabBarBtn from './src/components/TabBarBtn';
import QuranHome from './src/screens/QuranHome';

const BottomTabs = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <LocationProvider>
      <ModalProvider>
        <NavigationContainer>
          <BottomTabs.Navigator
            initialRouteName="Solat"
            screenOptions={{
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: '#67BAC6',
              tabBarStyle: [
                {
                  backgroundColor: '#ACD9DF',
                  height: 82,
                  paddingBottom: 8,
                  paddingTop: 8,
                  // borderTopRightRadius: 18,
                  // borderTopLeftRadius: 18,
                },
              ],
              tabBarLabelStyle: [{fontSize: 14}],
            }}>
            <BottomTabs.Screen
              name="Quran"
              component={QuranHome}
              options={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarIcon: ({color}) => (
                  <TabBarBtn children={<Quran color={color} size={32} />} />
                ),
              }}
            />
            <BottomTabs.Screen
              name="Solat"
              component={Home}
              options={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarIcon: ({color}) => (
                  <TabBarBtn children={<Solat color={color} size={32} />} />
                ),
              }}
            />
            <BottomTabs.Screen
              name="Kiblat"
              component={QuranHome}
              options={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarIcon: ({color}) => (
                  <TabBarBtn children={<Kiblat color={color} size={32} />} />
                ),
              }}
            />
          </BottomTabs.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </LocationProvider>
  );
}

export default App;
