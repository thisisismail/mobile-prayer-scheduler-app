import {StyleSheet} from 'react-native';

const baseBackgroundColor = 'white';
const basePadding = 12;
const headerColor = 'white';
// const basePaddingLayout = 10;

const customStyles = StyleSheet.create({
  layoutMainContainer: {
    backgroundColor: baseBackgroundColor,
    flex: 1,
  },
  layoutHeader: {
    backgroundColor: headerColor,
    padding: basePadding,
    // paddingTop: 30,
  },
  layoutFooter: {
    backgroundColor: 'blue',
    padding: basePadding,
  },
  layoutContent: {
    flex: 0,
    padding: basePadding,
    backgroundColor: baseBackgroundColor,
  },
  mainContainer: {
    padding: basePadding,
  },
  statusBar: {
    backgroundColor: headerColor,
  },
  textNormal: {
    color: 'grey',
    // fontSize: 21,
  },
  textBigCentral: {
    color: 'grey',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  colorMain: {color: '#67BAC6'},
  colorSecond: {color: '#ACD9DF'},
  colorThird: {color: '#F0F8F9'},
  textNonActive: {
    color: 'whitesmoke',
    fontWeight: 'bold',
  },
});

export default customStyles;
