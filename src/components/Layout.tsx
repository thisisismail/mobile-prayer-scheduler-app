import React, {PropsWithChildren, useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Linking} from 'react-native';
import customStyles from '../styles';
import useAppstate from '../hooks/useAppstate';
import {useLocation} from '../context/LocationContext';
import ModalAction, {ModalProps} from './ModalAction';
import {useModal} from '../context/ModalContext';

type LayoutProps = PropsWithChildren<{
  title?: string;
  available?: boolean;
}>;

const OPEN_LOCATION_SETTING: string =
  'android.settings.LOCATION_SOURCE_SETTINGS';

const Layout = ({children, available = true}: LayoutProps): JSX.Element => {
  const {location, locationStatus} = useLocation();
  const {refreshAfterComeBack} = useAppstate();
  const {setShow} = useModal();

  useEffect(() => {
    console.log(refreshAfterComeBack);
  }, [refreshAfterComeBack]);

  useEffect(() => {
    if (locationStatus) {
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationStatus]);

  const LocationModalProps: ModalProps = {
    actions: [
      {
        lable: 'Hidupkan',
        handler: () => {
          console.log('hidupkan');
          Linking.sendIntent(OPEN_LOCATION_SETTING);
        },
      },
    ],
    title: 'Lokasi perangkat mati',
    message:
      'Lokasi perangkat harus dihidupkan untuk mendapatkan jadwal solat terkini di lokasimu',
  };

  return (
    <SafeAreaView style={customStyles.layoutMainContainer}>
      <StatusBar
        backgroundColor={customStyles.statusBar.backgroundColor}
        barStyle={'dark-content'}
      />
      <ModalAction {...LocationModalProps} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              !locationStatus
                ? Linking.sendIntent(OPEN_LOCATION_SETTING)
                : console.log(location);
              console.log(location);
            }}
          />
        }
        contentContainerStyle={[
          customStyles.layoutContent,
          available ? {} : styles.contentContainerNotAvailable,
        ]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({contentContainerNotAvailable: {flex: 1}});

export default Layout;
