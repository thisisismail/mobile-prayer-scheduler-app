import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import customStyles from '../styles';
import Layout from '../components/Layout';

const QuranHome = (): JSX.Element => {
  return (
    <Layout available={false}>
      <View style={styles.mainContainer}>
        <Text style={[customStyles.textBigCentral, styles.commingSoonText]}>
          Akan Segera Hadir
        </Text>
        <Text style={customStyles.textBigCentral}>Quran</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commingSoonText: {
    color: 'whitesmoke',
  },
});

export default QuranHome;
