import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Layout from '../components/Layout';
import customStyles from '../styles';
import TopBanner from '../components/Solat/TopBanner';
import DailyPrayer from '../components/Solat/DailyPrayer';

const Home = (): JSX.Element => {
  return (
    <Layout>
      <View style={styles.banner}>
        <TopBanner />
        <DailyPrayer />
        {/* <Text style={customStyles.textNormal}>Banner</Text> */}
      </View>
      {/* <View style={{marginTop: 32}}>
        <DummyData />
      </View> */}
    </Layout>
  );
};

// const DummyData = (): JSX.Element => {
//   const my_array = [...Array(50).keys()].map(i => i + 1);
//   const texts = my_array.map((text, index) => (
//     <Text style={[customStyles.textNormal, styles.inner]} key={index}>
//       {text}
//     </Text>
//   ));
//   return <View style={styles.box}>{texts}</View>;
// };

const styles = StyleSheet.create({
  box: {
    // borderWidth: 2,
  },
  inner: {
    borderWidth: 2,
    borderColor: 'white',
  },
  banner: {
    // borderWidth: 2,
    borderColor: 'black',
    marginBottom: 0,
    heightMin: 250,
  },
});

export default Home;
