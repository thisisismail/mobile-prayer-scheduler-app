import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

const useAppstate = (): any => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [refreshAfterComeBack, setRefreshAfterComeBack] =
    useState<boolean>(false);
  console.log(appState);

  const handleAppStateChange = (nextAppState: any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      setRefreshAfterComeBack(true);
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    console.log('SUBSCRIBE');
    setRefreshAfterComeBack(false);
    return () => {
      AppState.addEventListener('change', handleAppStateChange).remove;
      console.log('UNSUBSCRIBE');
      setRefreshAfterComeBack(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  useEffect(() => {
    console.log(`REFRESH AFTER COMEBACK: ${refreshAfterComeBack}`);
  }, [refreshAfterComeBack]);

  return {appState, refreshAfterComeBack, setRefreshAfterComeBack};
};

export default useAppstate;
