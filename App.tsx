import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUnit} from 'effector-react';
import React, {useEffect, useState} from 'react';
import {LogBox, Platform, StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {Host} from 'react-native-portalize';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {io} from 'socket.io-client';
import {AsyncStorageKeys} from 'src/app/types/authorization';
import {getFcmToken, registerListenerWithFCM} from 'src/features/firebase';
import {setBottomSheetState} from 'src/features/main/model/BottomSheetStore';
import {
  $main,
  setFinishedOrder,
  setOrderProcessStatus,
  setProceedingOrderId,
  setStatus
} from 'src/features/main/model/MainStore';
import {$profile, updateFcmToken} from 'src/features/profile';
import {MainRouter} from './src/routes';
import { UpdateModal } from 'src/shared/components/UpdateModal';
import { getVersion } from 'react-native-device-info';
import { getLatestVersionApp } from 'src/features/profile/model/profile-actions';

Orientation.lockToPortrait();
LogBox.ignoreAllLogs();

export const App = () => {
  const [{profile}] = useUnit([$profile]);
  const [
    {orderProcessStatus, status, order, proceedingOrderId},
    handleSetOrderProcessStatus,
    handleSetBottomSheetState,
    handleSetFinishedOrder,
    handleSetProceedingOrderId,
  ] = useUnit([$main, setOrderProcessStatus, setStatus, setBottomSheetState, setFinishedOrder, setProceedingOrderId]);

  const [updateVisible, setUpdateVisible] = useState(false);

  const handleConnectSocket = async () => {

    const token = AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
    // console.log('token', token)
    const socket = io('http://5.35.89.71:3001', {
      auth: {
        token
      }
    });

    socket.connect();
    socket.on('connect', () => {
      // console.log('Socket connected');
    });
    socket.on('disconnect', socket.connect);
  }
  const handleConnectSocket2 = async () => {
    const token = AsyncStorage.getItem(AsyncStorageKeys.TOKEN);

    const socket2 = io('http://5.35.89.71:3001/order/client', {
        auth: {
          token
        }
      }
    );


    const sendPhoneNumber = (phoneNumber: string) => {
      socket2.emit('clientConnected', {phone: phoneNumber});
    };

    socket2.connect();
    socket2.on('connect', () => {
      if (profile && profile.phone_number) {
        sendPhoneNumber(profile.phone_number);
        socket2.on('status', status => {
          if (status?.orderFullData?.order_id && !proceedingOrderId) {
            handleSetProceedingOrderId(status.orderFullData.order_id)
          }

          if (!proceedingOrderId || proceedingOrderId === status?.orderFullData?.order_id) {
            if (status.status == 'took') {
              handleSetOrderProcessStatus("took");
            } else if (status.status == 'complete') {
              handleSetOrderProcessStatus("complete");
            } else if (status.status == 'cancelled') {
              handleSetOrderProcessStatus('cancelled')
            }
          }
        })
      }
    });
  }

  const checkForUpdate = async () => {
    const CURRENT_VERSION = getVersion();

    try {
      const {data, status}: any = await getLatestVersionApp()
      
      if (data && data.version !== CURRENT_VERSION) {
        setUpdateVisible(true);
      }
    } catch (error) {
      console.error('Error checking for update:', error);
    }
  };

  useEffect(() => {
    let unsubscribe;
    if (profile !== null) {
      handleConnectSocket();
      handleConnectSocket2()
      console.log(profile, 'profile-main');

      // Firebase notification fcm token
      getFcmToken().then((token) => {
        if (!profile.fcm_token || profile.fcm_token !== token) {          
          updateFcmToken(token, profile.phone_number)
        }
      });
      unsubscribe = registerListenerWithFCM();
    }
    checkForUpdate()

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }

    }
  }, [profile]);

  return (
    <SafeAreaProvider style={styles.container}>
      <ToastProvider style={Platform.OS === "ios" && {marginTop: 55}}>
        <Host>
          <MainRouter/>
        </Host>
        {/* @ts-ignore */}
      </ToastProvider>
      <Toast ref={ref => (global['toast'] = ref)}/>
      <UpdateModal visible={updateVisible} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
