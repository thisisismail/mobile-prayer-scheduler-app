import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import customStyles from '../styles';

const HeaderNav = (): JSX.Element => {
  return (
    <View style={styles.mainContainer}>
      <Text>Navigation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'pink',
    borderWidth: 1,
    padding: customStyles.layoutHeader.padding,
    // height: 200,
  },
});

export default HeaderNav;
