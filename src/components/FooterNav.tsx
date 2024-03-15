import React from 'react';
import {Text, View} from 'react-native';
import customStyles from '../styles';

const FooterNav = (): JSX.Element => {
  return (
    <View style={customStyles.layoutFooter}>
      <Text>Footer</Text>
    </View>
  );
};

export default FooterNav;
