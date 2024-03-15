import {useEffect, useState} from 'react';
import {PrayerProps, Prayer} from '../components/Solat/prayer.type';

export type PrayerHookProps = {
  yearIndex: number;
  monthIndex: number;
  todayIndex: number;
  hiddenTime: any;
  setHiddenTime: any;
  prayerRaw: any;
  prayersArr: any;
  datesArr: any;
  daysArr: any;
  loading: boolean;
  error: string;
  monthQuery: number;
  yearQuery: number;
  setMonthQuery: any;
  setYearQuery: any;
  setLongitudeQuery: any;
  setLatitudeQuery: any;
  setMethodQuery: any;
  getData: () => void;
  resetData: () => void;
};

const arabicMonth = {
  '01': 'Muharram',
  '02': 'Safar',
  '03': 'Rabiul Awal',
  '04': 'Rabiul Akhir',
  '05': 'Jumadil Awal',
  '06': 'Jumadil Akhir',
  '07': 'Rajab',
  '08': "Sya'ban",
  '09': 'Ramadan',
  '10': 'Syawal',
  '11': 'Dzulqaidah',
  '12': 'Dzulhijjah',
};

const indonesiaMonth = {
  '01': 'Januari',
  '02': 'Februari',
  '03': 'Maret',
  '04': 'April',
  '05': 'Mei',
  '06': 'Juni',
  '07': 'Juli',
  '08': 'Agustus',
  '09': 'September',
  '10': 'Oktober',
  '11': 'November',
  '12': 'Desember',
};

const indonesiaDay = {
  Sunday: 'Minggu',
  Monday: 'Senin',
  Tuesday: 'Selasa',
  Wednesday: 'Rabu',
  Thursday: 'Kamis',
  Friday: 'Jumat',
  Saturday: 'Sabtu',
};

const convertToIndonesiaTime = (
  dateEn: string,
  dayEn: string,
  dateArabic: string,
): any => {
  const dateArr = dateEn.split('-');
  const dateWithoutLeadingZero = parseInt(dateArr[0], 10).toString();
  const month = indonesiaMonth[dateArr[1] as keyof typeof indonesiaMonth];
  const day = indonesiaDay[dayEn as keyof typeof indonesiaDay];
  dateArr[1] = month;
  dateArr[0] = dateWithoutLeadingZero;

  const dateArArr = dateArabic.split('-');
  const dateArWithoutLeadingZero = parseInt(dateArArr[0], 10).toString();
  const monthAr = arabicMonth[dateArArr[1] as keyof typeof arabicMonth];
  dateArArr[1] = monthAr;
  dateArArr[0] = dateArWithoutLeadingZero;

  return {date: dateArr.join(' '), day, dateAr: dateArArr.join(' ')};
};

const baseURL = 'http://api.aladhan.com/v1/calendar';

const usePrayers = (): any => {
  const [loading, setLoading] = useState<boolean>();
  const [prayerRaw, setPrayerRaw] = useState<any[]>();

  const [prayersArr, setPrayersArr] = useState<any[]>([]);
  const [datesArr, setDatesArr] = useState<any[]>([]);
  const [daysArr, setDaysArr] = useState<any[]>([]);
  const [datesArabicArr, setDatesArabicArr] = useState<any[]>([]);

  const [hiddenTime, setHiddenTime] = useState<Prayer[]>([
    'Midnight',
    'Firstthird',
    'Lastthird',
    'Sunset',
  ]);

  const now = new Date();
  const todayIndex = now.getDate() - 1;
  const monthIndex = now.getMonth() + 1;
  const yearIndex = now.getFullYear();

  const [monthQuery, setMonthQuery] = useState<number>(monthIndex);
  const [yearQuery, setYearQuery] = useState<number>(yearIndex);
  const [latitudeQuery, setLatitudeQuery] = useState<number>(-6.595038);
  const [longitudeQuery, setLongitudeQuery] = useState<number>(106.816635);
  const [methodQuery, setMethodQuery] = useState<number>(20);

  const [error, setError] = useState<string>('Error');

  const getUrl = (): string => {
    return `${baseURL}/${yearQuery}/${monthQuery}?latitude=${latitudeQuery}&longitude=${longitudeQuery}&method=${methodQuery}`;
  };

  const initUrl: string = getUrl();

  const [url, setUrl] = useState<string>(initUrl);

  const getData = async () => {
    setLoading(true);
    try {
      const timings = await fetch(url ?? '')
        .then(rawData => rawData.json())
        .then(rawData => {
          const data = rawData.data.map((item: any) => {
            const time = convertToIndonesiaTime(
              item.date.gregorian.date,
              item.date.gregorian.weekday.en,
              item.date.hijri.date,
            );
            return {
              timings: item.timings,
              date: {date: time.date, day: time.day, dateAr: time.dateAr},
            };
          });
          console.log('set data');
          return data;
        })
        .catch((err: any) => {
          setError(err);
          return err;
        });
      setPrayerRaw(timings);
    } catch (err: any) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const prayerMapping = (prayers: any): any => {
    const mappedPrayers: PrayerProps[] = Object.keys(prayers)?.map(key => {
      return {
        key,
        adzanAvailable: !['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(
          key,
        )
          ? false
          : true,
        adzanStatus: !['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(key)
          ? false
          : true,
        notificationStaus: false,
        prayer: key as Prayer,
        time: prayers[key],
      };
    });
    return mappedPrayers;
  };

  const resetData = () => {
    console.log('reset data');
    setPrayerRaw([]);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    const mappedPrayer =
      prayerRaw?.map(item => prayerMapping(item.timings)) ?? [];
    const mappedDate = prayerRaw?.map(item => item.date.date) ?? [];
    const mappedDay = prayerRaw?.map(item => item.date.day) ?? [];
    const mappedDateArabic = prayerRaw?.map(item => item.date.dateAr) ?? [];

    setPrayersArr(mappedPrayer);
    setDatesArr(mappedDate);
    setDaysArr(mappedDay);
    setDatesArabicArr(mappedDateArabic);

    // console.log(prayerRaw);
    // console.log(monthQuery);
  }, [prayerRaw]);

  // useEffect(() => {
  //   console.log(prayersArr);
  // }, [prayersArr]);

  useEffect(() => {
    setUrl(getUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthQuery]);

  return {
    monthIndex,
    yearIndex,
    todayIndex,
    hiddenTime,
    prayersArr,
    datesArr,
    daysArr,
    datesArabicArr,
    prayerRaw,
    loading,
    error,
    monthQuery,
    yearQuery,
    setHiddenTime,
    getData,
    resetData,
    setMonthQuery,
    setLongitudeQuery,
    setLatitudeQuery,
    setMethodQuery,
    setYearQuery,
  } as PrayerHookProps;
};

export default usePrayers;
