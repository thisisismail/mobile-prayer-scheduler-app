import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import customStyles from '../../styles';
import Icon2 from 'react-native-vector-icons/Ionicons';
import usePrayers from '../../hooks/usePrayers';
import {useLocation} from '../../context/LocationContext';

const TopBanner = (): JSX.Element => {
  const {datesArr, daysArr, datesArabicArr, todayIndex} = usePrayers();
  const {locationName} = useLocation();
  const day = daysArr[todayIndex];
  const date = datesArr[todayIndex];
  const dateArabic = datesArabicArr[todayIndex];

  return (
    <View>
      <View style={styles.locationContainer}>
        <Icon2 name="location-sharp" size={20} color="grey" />
        <Text style={styles.locationText}>{locationName}</Text>
      </View>
      <View style={styles.dateAndCountDownContainer}>
        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.dateText}>{day}</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <Text style={styles.dateTextHijri}>
            {dateArabic ? `${dateArabic} H` : '...'}
          </Text>
        </View>
        <View style={styles.countDownContainer}>
          <Text style={styles.dateText}>Ashar</Text>
          <Icon2
            name="volume-high-outline"
            size={36}
            color={customStyles.colorMain.color}
          />
          <Text style={styles.dateText}>-01:20:35</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    gap: 4,
  },
  locationText: {...customStyles.textNormal},
  dateContainer: {
    gap: 4,
    marginTop: 16,
  },
  dateText: {color: 'black', fontSize: 20, fontWeight: 'bold'},
  dateTextHijri: {...customStyles.textNormal},
  countDownContainer: {
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    gap: 4,
    backgroundColor: customStyles.colorThird.color,
    borderColor: 'whitesmoke',
  },
  dateAndCountDownContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 4,
  },
});

export default TopBanner;
