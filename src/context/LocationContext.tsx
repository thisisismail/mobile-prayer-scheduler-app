import Geolocation from '@react-native-community/geolocation';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PermissionsAndroid} from 'react-native';
import {useModal} from './ModalContext';
import useAppstate from '../hooks/useAppstate';

const BASE_URL_LOCATION =
  'https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&addressdetails=1';
// https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&addressdetails=1&lat=52.520008&lon=13.404954

type LocationType = {
  longitude: number;
  latitude: number;
};

type IContext = {
  location: LocationType;
  setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
  locationStatus?: boolean;
  locationName?: string;
};

const initialLocation: LocationType = {longitude: 0, latitude: 0};

const LocationContext = createContext<IContext>({
  location: initialLocation,
  setLocation: (value: any) => value,
});

const LocationProvider = ({children}: PropsWithChildren): JSX.Element => {
  const [location, setLocation] = useState<LocationType>(initialLocation);

  useEffect(() => {
    console.log('coordinate change');
    console.log(location);
  }, [location]);

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = (): IContext => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  const {setShow} = useModal();
  const {setRefreshAfterComeBack, refreshAfterComeBack} = useAppstate();
  const [permissionStatus, setPermissionStatus] = useState<string>('');
  const [locationStatus, setLocationStatus] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('Hidupkan lokasimu');

  const requestLocationPermission = async () => {
    try {
      const response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      setPermissionStatus(response);
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
      !check
        ? await requestLocationPermission()
        : setPermissionStatus(PermissionsAndroid.RESULTS.GRANTED);
      return check;
    } catch (err) {
      setPermissionStatus(PermissionsAndroid.RESULTS.BLOCKED);
      return null;
    }
  };

  const activateLocation = async () => {
    console.log('try to activate location');
    const config = {
      enableHighAccuracy: false,
      timeout: 2000,
    };
    Geolocation.getCurrentPosition(
      async (pos: any) => {
        const {longitude, latitude} = pos.coords;
        console.log('current location');
        console.log(pos);
        context.setLocation({longitude, latitude});
        await getLocationName(longitude, latitude);
      },
      (err: any) => {
        console.log('error =>');
        console.log(err);
        setShow(true);
      },
      config,
    );
  };

  const getLocationName = async (lon: number, lat: number) => {
    try {
      const URL = `${BASE_URL_LOCATION}&lon=${lon}&lat=${lat}`;
      const response = await fetch(`${URL}`);
      if (!response.ok) {
        console.error('Can not get location from internet');
        throw new Error('Can not get location from internet');
      }
      const data = await response.json();
      const country: string = (await data.address?.country) ?? '';
      const state: string = (await data.address?.state) ?? '';
      const county: string = (await data.address?.county) ?? '';
      const municipality: string = (await data.address?.municipality) ?? '';
      !country
        ? setLocationName('noname')
        : municipality
        ? setLocationName(`${municipality}, ${county}`)
        : setLocationName(`${county}, ${state}`);
      console.log(data);
    } catch (err) {
      console.error('Catch location fetching error');
      throw new Error('Error Fetching');
    }
  };

  useEffect(() => {
    checkLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(`PERMISSION: ${permissionStatus.toUpperCase()}`);
    permissionStatus === PermissionsAndroid.RESULTS.GRANTED
      ? activateLocation()
      : console.log('Please allow location permission');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionStatus]);

  useEffect(() => {
    if (refreshAfterComeBack) {
      console.log('==================== reactivate location');
      activateLocation();
    }
    return () => {
      setRefreshAfterComeBack(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshAfterComeBack]);

  useEffect(() => {
    const {latitude, longitude} = context.location;
    if (latitude === 0 && longitude === 0) {
      setLocationStatus(false);
    } else {
      setLocationStatus(true);
    }
  }, [context.location]);

  useEffect(() => {
    console.log(locationName);
  }, [locationName]);

  return {...context, locationStatus, locationName};
};

export {LocationProvider, useLocation, initialLocation};
