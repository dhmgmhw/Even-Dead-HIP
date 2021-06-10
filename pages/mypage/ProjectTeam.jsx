import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Ionicons } from '@expo/vector-icons';
const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ProjectTeam({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.statusAvoid}></View>
        <View style={styles.mainHeader}>
          <View style={styles.headerLComp}>
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name={'chevron-back'}
              size={24}
              color={'black'}
            />
          </View>
          <View style={styles.headerCComp}>
            <Text style={styles.headerTitle}>Project Member</Text>
          </View>
          <View style={styles.headerRComp}></View>
        </View>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
        <Text style={styles.title}>Front (React Native)</Text>
        <View style={styles.userCard}>
          <Image
            style={styles.profileimg}
            resizeMode='cover'
            source={require('../../assets/team/team1.png')}
          />
          <View>
            <Text style={styles.teamInfo}>Hyeongwon Moon</Text>
            <Text style={styles.teamInfo}>dhmgmhw@gmail.com</Text>
          </View>
        </View>
        <View style={styles.userCard}>
          <Image
            style={styles.profileimg}
            resizeMode='cover'
            source={require('../../assets/team/team2.png')}
          />
          <View>
            <Text style={styles.teamInfo}>Conner Kim</Text>
            <Text style={styles.teamInfo}>kimjiha1112@gmail.com</Text>
          </View>
        </View>
        <Text style={styles.title}>Design (UXUI)</Text>
        <View style={styles.userCard}>
          <Image
            style={styles.profileimg}
            resizeMode='cover'
            source={require('../../assets/team/team3.png')}
          />
          <View>
            <Text style={styles.teamInfo}>Jiye Choi</Text>
            <Text style={styles.teamInfo}>cjy001113@gmail.com</Text>
          </View>
        </View>
        <Text style={styles.title}>Back (Spring Boot)</Text>
        <View style={styles.userCard}>
          <Image
            style={styles.profileimg}
            resizeMode='cover'
            source={require('../../assets/team/team4.png')}
          />
          <View>
            <Text style={styles.teamInfo}>Sanggu Kang</Text>
            <Text style={styles.teamInfo}>ksg1058@gmail.com</Text>
          </View>
        </View>
        <View style={styles.userCard}>
          <Image
            style={styles.profileimg}
            resizeMode='cover'
            source={require('../../assets/team/team5.png')}
          />
          <View>
            <Text style={styles.teamInfo}>Jungbin Lee</Text>
            <Text style={styles.teamInfo}>dhwlddjskawkclsrn12@gmail.com</Text>
          </View>
        </View>
        <View style={styles.userCard}>
          <Image
            style={styles.profileimg}
            resizeMode='cover'
            source={require('../../assets/team/team6.png')}
          />
          <View>
            <Text style={styles.teamInfo}>Jaeseung Choun</Text>
            <Text style={styles.teamInfo}>chunzasang@gmail.com</Text>
          </View>
        </View>
        <View style={styles.userCard}>
          <Image
            style={styles.profileimg}
            resizeMode='cover'
            source={require('../../assets/team/team7.png')}
          />
          <View>
            <Text style={styles.teamInfo}>DaHee Lim</Text>
            <Text style={styles.teamInfo}>leaphigher20@gmail.com </Text>
          </View>
        </View>
        <View style={{ height: 40 }}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  statusAvoid: {
    height: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: 'SCDream7',
    fontSize: 18,
  },
  mainHeader: {
    width: diviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 45,
  },
  headerLComp: {
    height: 45,
    width: diviceWidth / 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerCComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
  },
  headerRComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'SansBold',
    fontSize: 14,
    color: '#4CB73B',
    marginBottom: 20,
  },
  profileimg: {
    height: 100,
    width: 100,
  },
  teamInfo: {
    fontFamily: 'SansBold',
    fontSize: 12,
    color: '#828282',
    marginLeft: 20,
    maxWidth: '100%',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
