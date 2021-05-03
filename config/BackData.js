import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = 'http://3.35.216.159';

export async function login(email, id, navigation) {
    try {
      const result = await axios({
        method: 'post',
        url: host + '/api/login',
        data: {
          email: email,
          id: id,
        },
      });
  
      if (result.data.ok == true) {
        Alert.alert(result.data.msg);
        await AsyncStorage.setItem('session', result.data.token);
        // Alert.alert(result.data)
        navigation.push('TabNavigator');
        // issue
      } else if (result.data.ok == false) {
        Alert.alert(result.data.msg);
      }
    } catch (err) {
      Alert.alert('무슨 문제가 있는 것 같아요! => ', err.message);
    }
  }