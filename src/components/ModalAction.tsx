import React from 'react';
import {useModal} from '../context/ModalContext';
import {View, Text, Modal, SafeAreaView, StyleSheet} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import customStyles from '../styles';
import Button from './Button';

type IAction = {lable: string; handler: () => void};

export type ModalProps = {actions: IAction[]; message: string; title: string};

const ModalAction = ({actions, message, title}: ModalProps): JSX.Element => {
  const {show} = useModal();
  return (
    <SafeAreaView>
      <View>
        <Modal
          visible={show}
          animationType="slide"
          transparent
          statusBarTranslucent>
          <View style={[styles.modalContainer]}>
            <Card style={[styles.bottomSheet]}>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.subtitleText}>{message}</Text>
              {actions?.map(action => (
                <Button
                  key={action.lable}
                  title={action.lable}
                  onClick={action.handler}
                />
              ))}
            </Card>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitleText: {
    ...customStyles.textNormal,
    marginBottom: 16,
    // color: 'black',
  },
});

export default ModalAction;
