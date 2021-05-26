import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { getUserProfile } from '../../config/BackData';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function MainUserBox({ navigation, myName, myImg, myPoint }) {
  const [level, setLevel] = useState('콩');
  const [levelImg, setLevelImg] = useState('');
  const [progress, setProgress] = useState();
  const [point, setPoint] = useState();

  const load = async () => {
    const result = await getUserProfile();
    levelSetter(result.results.point);
    progressSetter(result.results.point);
    pointSetter(result.results.point);
  };

  useEffect(() => {
    load();
  }, []);

  const progressSetter = (data) => {
    while (1 <= data / 600) {
      data -= 600;
    }
    setProgress(data / 600);
  };

  const pointSetter = (data) => {
    while (600 <= data) {
      data -= 600;
    }
    setPoint(data);
  };

  const levelSetter = (point) => {
    if (0 <= point && point < 600) {
      setLevel('콩');
      setLevelImg(require('../../assets/levels/Lev1.png'));
    } else if (600 <= point && point < 1200) {
      setLevel('새싹');
      setLevelImg(require('../../assets/levels/Lev2.png'));
    } else if (1200 <= point && point < 1800) {
      setLevel('줄기');
      setLevelImg(require('../../assets/levels/Lev3.png'));
    } else if (1800 <= point && point < 2400) {
      setLevel('가지');
      setLevelImg(require('../../assets/levels/Lev4.png'));
    } else if (2400 <= point && point < 3000) {
      setLevel('어린나무');
      setLevelImg(require('../../assets/levels/Lev5.png'));
    } else if (3000 <= point && point < 3600) {
      setLevel('큰나무');
      setLevelImg(require('../../assets/levels/Lev6.png'));
    } else if (3600 <= point && point < 4200) {
      setLevel('꽃');
      setLevelImg(require('../../assets/levels/Lev7.png'));
    } else {
      setLevel('오두막');
      setLevelImg(require('../../assets/levels/Lev8.png'));
    }
  };

  return (
    <Pressable
      style={{ paddingBottom: 10, backgroundColor: '#64BB35', zIndex: 100 }}>
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={styles.title}>{myName}님의</Text>
            <Text style={styles.title2}>
              콩나무 <Text style={{ color: '#4CB73B' }}>{level} 단계</Text>
            </Text>
            <Text style={styles.town}>책을 교환하면 포인트를</Text>
            <Text style={styles.town}>얻을 수 있어요!</Text>
          </View>
        </View>
        <View
          style={{
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            backgroundColor: '#54B65E',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f4f4f4',
              height: 80,
              width: 80,
              borderRadius: 100,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,
              elevation: 11,
            }}>
            <Image
              style={styles.userImg}
              resizeMode='contain'
              source={levelImg}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
        }}>
        <Text style={styles.pointText}>
          다음 단계까지{' '}
          <Text style={{ fontFamily: 'SansExtra' }}>
            {(point - 600) * -1}포인트{' '}
          </Text>
          남았습니다
        </Text>
        <ProgressBar
          style={styles.seed}
          progress={progress}
          color={'#31B11C'}
        />
        <Text
          style={[
            styles.pointText,
            {
              textAlign: 'left',
              marginHorizontal: 20,
              marginTop: 5,
            },
          ]}>
          내 포인트 : {myPoint}
        </Text>
      </View>
      <View style={styles.decoyBox}>
        <Button
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddPage')}>
          <Ionicons name={'add'} size={30} style={{ color: 'white' }} />
        </Button>
        <View style={styles.innerTopDecoyBox}></View>
        <View style={styles.innerBottomDecoyBox}></View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    zIndex: 1300,
  },
  userImg: {
    width: 55,
    height: 55,
    borderWidth: 0,
    padding: 10,
  },
  title: {
    fontFamily: 'SCDream6',
    fontSize: 24,
    marginVertical: 3,
  },
  title2: {
    fontFamily: 'SCDream6',
    fontSize: 24,
    marginBottom: 15,
    marginVertical: 3,
  },
  town: {
    fontFamily: 'SCDream4',
    color: '#434343',
    fontSize: 13,
    lineHeight: 20,
  },
  bottomBar: {
    height: 5,
    marginHorizontal: 20,
    backgroundColor: '#F7F6FF',
  },
  doneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 80,
    borderRadius: 15,
    backgroundColor: '#54B65E',
    top: 5,
    alignSelf: 'flex-end',
  },
  done: {
    fontFamily: 'SansMedium',
    fontSize: 12,
    color: 'white',
  },
  addBtn: {
    backgroundColor: '#4CB73B',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '0%',
    right: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 100,
  },
  decoyBox: {
    height: 60,
    bottom: 1,
  },
  innerTopDecoyBox: {
    backgroundColor: 'white',
    height: 30,
  },
  innerBottomDecoyBox: {
    height: 30,
    backgroundColor: '#64BB35',
    zIndex: 99,
  },
  pointText: {
    fontFamily: 'SansMedium',
    color: '#4CB73B',
    textAlign: 'center',
    marginBottom: 20,
  },
});
