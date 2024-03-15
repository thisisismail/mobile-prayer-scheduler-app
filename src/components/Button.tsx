import React, {PropsWithRef} from 'react';
import {
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import customStyles from '../styles';

type ButtonProps = PropsWithRef<{
  title: string;
  onClick: () => void;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}>;

const Button = ({isLoading = false, ...props}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onClick();
      }}
      activeOpacity={0.8}
      style={[styles.centeringProps, styles.button, props.style]}>
      <View style={[styles.centeringProps]}>
        {isLoading ? (
          <ActivityIndicator size={20} />
        ) : (
          <Text style={styles.buttonText}>{props.title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderColor: 'none',
    backgroundColor: customStyles.colorMain.color,
    padding: 12,
    height: 46,
  },
  buttonText: {
    color: 'white',
  },
  centeringProps: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Button;
