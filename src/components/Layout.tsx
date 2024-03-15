import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import customStyles from '../styles';
import type {PropsWithChildren} from 'react';

type LayoutProps = PropsWithChildren<{
  title?: string;
  available?: boolean;
}>;

const Layout = ({children, available = true}: LayoutProps): JSX.Element => {
  return (
    <SafeAreaView style={customStyles.layoutMainContainer}>
      <StatusBar
        backgroundColor={customStyles.statusBar.backgroundColor}
        barStyle={'dark-content'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              console.log('refresh');
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
