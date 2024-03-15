import React, {PropsWithChildren} from 'react';
import {Image, Text, View} from 'react-native';

type TabBarBtnProps = PropsWithChildren<{children: JSX.Element}>;

const TabBarBtn = ({children}: TabBarBtnProps): JSX.Element => {
  return <View>{children}</View>;
};

export default TabBarBtn;
