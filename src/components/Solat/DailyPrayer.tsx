import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import customStyles from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Button';
import {PrayerProps, EmptyPrayerProps, initialPrayers} from './prayer.type';
import usePrayers from '../../hooks/usePrayers';

const EmptyPrayer = ({fetchData, isLoading}: EmptyPrayerProps): JSX.Element => {
  // async function clearAllData() {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage cleared successfully.');
  //   } catch (error) {
  //     console.error('Failed to clear AsyncStorage:', error);
  //   }
  // }
  return (
    <View>
      <View style={styles.constEmptyPrayerContainer}>
        <View style={[styles.centeringProps]}>
          <Icon name="file-tray" size={104} color={'whitesmoke'} />
        </View>
        <View style={[styles.centeringProps]}>
          <Text style={customStyles.textNonActive}>Jadwal Belum Tersedia</Text>
        </View>
      </View>
      <Button title="Lihat Jadwal" onClick={fetchData} isLoading={isLoading} />
    </View>
  );
};

const Prayer = ({
  adzanAvailable = true,
  prayer,
  time,
  adzanStatus = false,
  notificationStaus = false,
}: PrayerProps): JSX.Element => {
  return (
    <View style={styles.prayer}>
      <View>
        <Text style={styles.prayerTitle}>{prayer}</Text>
        <Text style={styles.prayerTime}>{time}</Text>
      </View>
      <View style={[styles.rowViewProps]}>
        <View onTouchStart={() => {}}>
          <Icon
            name={
              !adzanAvailable
                ? 'remove-circle-outline'
                : adzanStatus
                ? 'volume-high'
                : 'volume-mute-outline'
            }
            size={32}
            color={adzanAvailable ? customStyles.colorMain.color : 'grey'}
          />
        </View>
        <View onTouchStart={() => {}}>
          <Icon
            name={
              notificationStaus ? 'notifications' : 'notifications-off-outline'
            }
            size={32}
            color={customStyles.colorMain.color}
          />
        </View>
      </View>
    </View>
  );
};

const DailyPrayer = (): JSX.Element => {
  const {
    prayersArr,
    datesArr,
    daysArr,
    hiddenTime,
    todayIndex,
    monthIndex,
    setMonthQuery,
    monthQuery,
    loading,
  } = usePrayers();
  const [index, setIndex] = useState<number>(todayIndex);
  const [prayers, setPrayers] = useState<PrayerProps[]>([]);
  const [dateAndDay, setDateAndDay] = useState<string>('...');
  const [oldMonth, setOldMonth] = useState<string>(monthQuery);

  const storePrayersToLocal = async () => {
    const prayersLocalStore = JSON.stringify(prayers[0]);
    await AsyncStorage.setItem('myOBJ', prayersLocalStore);
  };

  useEffect(() => {
    if (prayersArr?.length !== 0 && index >= 0 && index < prayersArr?.length) {
      setPrayers(prayersArr[index]);
      setDateAndDay(`${daysArr[index]}, ${datesArr[index]}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayersArr]);

  useEffect(() => {
    if (prayersArr?.length !== 0 && index >= 0 && index < prayersArr?.length) {
      setPrayers(prayersArr[index]);
      setDateAndDay(`${daysArr[index]}, ${datesArr[index]}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (prayersArr.length !== 0 && index < 0) {
      setPrayers([]);
      setOldMonth(monthQuery);
      setMonthQuery(monthQuery - 1);
    } else if (prayersArr.length !== 0 && index > prayersArr.length - 1) {
      setPrayers([]);
      setOldMonth(monthQuery);
      setMonthQuery(monthQuery + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (prayersArr.length !== 0 && index < 0) {
      setIndex(prayersArr.length - 1);
    } else if (monthQuery !== oldMonth) {
      setIndex(0);
    } else if (monthQuery === monthIndex) {
      setIndex(todayIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayersArr]);

  useEffect(() => {
    console.log(prayers);
    prayers.length !== 0 ? storePrayersToLocal() : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayers]);

  const getDataFromLocal = async () => {
    const data = await AsyncStorage.getItem('myOBJ');
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText} onPress={getDataFromLocal}>
              Jadwal Solat
            </Text>
            <Icon
              name="help-circle"
              size={20}
              color={customStyles.colorMain.color}
            />
          </View>
          <Text style={styles.subTitleText}>
            {loading ? '...' : dateAndDay}
          </Text>
        </View>
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setIndex(index - 1);
            }}
            activeOpacity={0.5}>
            <Icon
              name="chevron-back-outline"
              size={32}
              color={customStyles.colorMain.color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (monthIndex !== monthQuery) {
                setPrayers([]);
                setMonthQuery(monthIndex);
              } else {
                setIndex(todayIndex);
              }
            }}
            activeOpacity={0.5}>
            <Icon
              name="calendar-outline"
              size={32}
              color={customStyles.colorMain.color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(index + 1);
            }}
            activeOpacity={0.5}>
            <Icon
              name="chevron-forward-outline"
              size={32}
              color={customStyles.colorMain.color}
            />
          </TouchableOpacity>
        </View>
      </View>
      {prayers.length === 0 ? (
        <View style={styles.contextContainer}>
          <EmptyPrayer
            isLoading={loading}
            fetchData={() => {
              setPrayers(initialPrayers);
            }}
          />
        </View>
      ) : (
        <View style={styles.contextContainer}>
          {prayers
            .filter(data => !hiddenTime.includes(data.prayer))
            .map(item => {
              return (
                <Prayer
                  key={item.prayer}
                  prayer={item.prayer}
                  time={item.time}
                  adzanAvailable={item.adzanAvailable}
                />
              );
            })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  headerContainer: {
    backgroundColor: customStyles.colorSecond.color,
    borderWidth: 0,
    borderColor: 'whitesmoke',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  headerButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contextContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'whitesmoke',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 8,
    borderTopWidth: 0,
    display: 'flex',
    gap: 8,
    justifyContent: 'space-between',
  },
  prayer: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: customStyles.colorThird.color,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prayerTitle: {
    ...customStyles.textNormal,
    borderColor: 'black',
    fontWeight: 'bold',
    color: 'black',
  },
  prayerTime: {
    ...customStyles.textNormal,
    borderColor: 'black',
    color: 'black',
    // fontWeight: 'bold',
  },
  titleTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  titleText: {
    ...customStyles.textNormal,
    color: customStyles.colorMain.color,
    fontWeight: 'bold',
    // color: 'black',
  },
  subTitleText: {
    ...customStyles.textNormal,
    fontWeight: 'bold',
    color: 'black',
  },
  rowViewProps: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commingSoonText: {
    color: 'whitesmoke',
  },
  centeringProps: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  constEmptyPrayerContainer: {
    marginBottom: 32,
    marginTop: 32,
  },
});

export default DailyPrayer;
