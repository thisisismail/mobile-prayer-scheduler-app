import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Geolocation from '@react-native-community/geolocation';
import Home from './src/screens/Home';
import Quran from './src/assets/icon-components/Quran';
import Kiblat from './src/assets/icon-components/Kiblat';
import Solat from './src/assets/icon-components/Solat';
import TabBarBtn from './src/components/TabBarBtn';
import QuranHome from './src/screens/QuranHome';

const BottomTabs = createBottomTabNavigator();

// GetLocation.getCurrentPosition()
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

function App(): JSX.Element {
  const [permissionStatus, setPermissionStatus] = useState<string>('');

  const activateLocation = () => {
    console.log('hoo');
    Geolocation.getCurrentPosition(
      (pos: any) => {
        console.log('hello');
        console.log(pos);
      },
      (err: any) => {
        console.log('error =>');
        console.log(err);
      },
      {timeout: 5000, enableHighAccuracy: true},
    );
  };

  const requestLocationPermission = async () => {
    try {
      const response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      setPermissionStatus(response);
      console.log(`this is the response: ${response}`);
      return response;
    } catch (err) {
      console.log(err);
      setPermissionStatus(PermissionsAndroid.RESULTS.BLOCKED);
      return null;
    }
  };

  const checkLocationPermission = async () => {
    try {
      const check = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(check);
      !check
        ? await requestLocationPermission()
        : setPermissionStatus(PermissionsAndroid.RESULTS.GRANTED);
      return check;
    } catch (err) {
      setPermissionStatus(PermissionsAndroid.RESULTS.BLOCKED);
      return null;
    }
  };

  useEffect(() => {
    checkLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(permissionStatus);
    permissionStatus === PermissionsAndroid.RESULTS.GRANTED
      ? activateLocation()
      : console.log('belum di acc');
  }, [permissionStatus]);

  return (
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
  );
}

export default App;
