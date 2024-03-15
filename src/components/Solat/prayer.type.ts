export type Prayer =
  | 'Imsak'
  | 'Fajr'
  | 'Sunrise'
  | 'Dhuhr'
  | 'Asr'
  | 'Maghrib'
  | 'Isha'
  | 'Midnight'
  | 'Firstthird'
  | 'Lastthird'
  | 'Sunset';

export type PrayerProps = {
  adzanAvailable?: boolean;
  prayer: Prayer;
  time?: string;
  adzanStatus?: boolean;
  notificationStaus?: boolean;
};

export const initialPrayerProps: PrayerProps = {
  adzanAvailable: false,
  prayer: 'Imsak',
  time: new Date().toString(),
  adzanStatus: false,
  notificationStaus: false,
};

export const initialPrayers: PrayerProps[] = Array.from({length: 7}, () => {
  return initialPrayerProps;
});

export const dailyPrayers = {
  date: new Date().toDateString(),
  prayers: initialPrayers,
};

export type EmptyPrayerProps = {
  fetchData: () => void;
  isLoading: boolean;
};
