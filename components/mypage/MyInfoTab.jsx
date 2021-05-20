import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Feather } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

import { uploadImg } from '../../config/PostingApi';

import { getUserProfile, signOut } from '../../config/BackData';
import { changeUserProfile } from '../../config/BackData';

import { Overlay } from 'react-native-elements';
import { Alert } from 'react-native';

export default function MyInfoTab({ navigation }) {
  const [profile, setprofile] = useState('');

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(profile.username);
  const [imageUri, setImageUri] = useState(profile.image);
  const [nickName, setNickName] = useState(profile.username);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      download();
    });
    return unsubscribe;
  }, [navigation]);

  const goTownChange = () => {
    navigation.push('TownChangePage');
  };

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('프로필을 수정하려면 사진첩 접근 권한이 필요합니다.');
      }
    }
  };

  const logout = () => {
    console.log('스토리지 비움');
    signOut(navigation);
  };

  const download = async () => {
    const result = await getUserProfile();
    console.log(result);
    setprofile(result.results);
    setNickName(result.results.username);
    setImageUri(result.results.image);
    setPoint(result.results.point);
  };

  const upload = async () => {
    if (name == '') {
      Alert.alert('바꿀 닉네임을 작성해 주세요!');
      return;
    }
    if (name.length > 6) {
      Alert.alert('닉네임은 최대 6자까지 가능합니다.');
      return;
    }
    if (imageUri == '') {
      Alert.alert('바꿀 사진을 선택해 주세요!');
      return;
    } else {
      const formData = new FormData();
      formData.append('files', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      let getUri = await uploadImg(formData);
      await changeUserProfile(name, getUri[0]);
      setVisible(false);
      download();
    }
  };

  const toggleOverlay = () => {
    setVisible(!visible);
    download();
    setName(nickName);
  };

  const pickImage = async () => {
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });
    {
      imageData.cancelled ? null : getImageUrl(imageData);
    }
  };

  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };

  const levelSetter = (point) => {
    if (0 <= point < 600) {
      return '콩';
    } else if (600 <= point < 1200) {
      return '새싹';
    } else if (1200 <= point < 1800) {
      return '줄기';
    } else if (1800 <= point < 2400) {
      return '가지';
    } else if (2400 <= point < 3000) {
      return '어린나무';
    } else if (3000 <= point < 3600) {
      return '큰나무';
    } else if (3600 <= point < 4200) {
      return '꽃';
    } else if (4200 <= point) {
      return '오두막';
    }
  };

  const levelImgSetter = (point) => {
    if (0 <= point < 600) {
      return require('../../assets/levels/Lev1.png');
    } else if (600 <= point < 1200) {
      return require('../../assets/levels/Lev2.png');
    } else if (1200 <= point < 1800) {
      return require('../../assets/levels/Lev3.png');
    } else if (1800 <= point < 2400) {
      return require('../../assets/levels/Lev4.png');
    } else if (2400 <= point < 3000) {
      return require('../../assets/levels/Lev5.png');
    } else if (3000 <= point < 3600) {
      return require('../../assets/levels/Lev6.png');
    } else if (3600 <= point < 4200) {
      return require('../../assets/levels/Lev7.png');
    } else if (4200 <= point) {
      return require('../../assets/levels/Lev8.png');
    }
  };

  const progressSetter = (data) => {
    while (1 <= data / 100 / 6) {
      data / 100 / 6 - 1;
    }
    return data / 100 / 6;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.myprofile}>
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
                paddingVertical: 20,
              }}>
              <View style={styles.profileimgBox}>
                <Image
                  style={styles.profileimg}
                  resizeMode='cover'
                  source={{
                    uri: profile.image,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 20,
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.nickname}>
                  {nickName}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.email}>
                  {profile.email}
                </Text>
              </View>
            </View>
            <Pressable style={styles.editbutton} onPress={toggleOverlay}>
              <Text style={styles.editbuttonText}> 프로필 수정</Text>
            </Pressable>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={styles.completetext}
                      onPress={() => {
                        setVisible(false);
                      }}>
                      취소
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.completetext} onPress={upload}>
                      완료
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.profiletitle}>프로필 수정</Text>
                <Pressable style={styles.pickpic} onPress={pickImage}>
                  <View style={styles.editprofileimgBox}>
                    <Image
                      style={styles.editprofileimg}
                      resizeMode='cover'
                      source={{
                        uri: imageUri,
                      }}
                    />
                  </View>
                </Pressable>
                <Text style={styles.emailfix}>{profile.email}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setName}
                  value={name}
                  placeholder={profile.username}
                  placeholderTextColor={'grey'}
                />
              </View>
            </Overlay>
          </View>
        </View>
      </View>
      <View style={styles.mystatus}>
        <Text style={styles.title}>
          콩나무 <Text style={styles.highlite}>{levelSetter(point)} 단계</Text>
        </Text>
        <ProgressBar
          style={styles.seed}
          progress={progressSetter(point)}
          color={'#31B11C'}
        />
      </View>
      <Pressable style={styles.deal} onPress={goTownChange}>
        <Text style={styles.downcompo}>동네 설정</Text>
        <Feather
          style={styles.rarrow}
          name='chevron-right'
          size={28}
          color='black'
        />
      </Pressable>
      <View style={styles.border}></View>
      <View style={styles.border}></View>
      <Pressable style={styles.deal} onPress={logout}>
        <Text style={[styles.downcompo, { color: 'red' }]}>로그아웃</Text>
        <Feather
          style={styles.rarrow}
          name='chevron-right'
          size={28}
          color='black'
        />
      </Pressable>
      <View style={styles.border}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  bigborder: {
    height: 10,
    backgroundColor: '#f2f2f2',
  },
  border: {
    height: 3,
    marginHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  deal: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  mycomment: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
  },
  invitefriend: {
    height: 60,
    flexDirection: 'row',
  },
  myliketext: {
    height: 60,
    flexDirection: 'row',
  },
  myprofile: {
    // height: 150,
    flexDirection: 'column',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 30,
    paddingLeft: 20,
  },
  profileimgBox: {
    marginLeft: 20,
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  profileimg: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  editprofileimgBox: {
    marginVertical: 10,
    height: 80,
    width: 80,
    borderRadius: 100,
    alignSelf: 'center',
  },
  editprofileimg: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  nickname: {
    fontFamily: 'SansBold',
    fontSize: 18,
  },
  email: {
    fontFamily: 'SansBold',
    fontSize: 13,
    color: '#adadad',
  },
  downcompo: {
    fontFamily: 'SansRegular',
    fontSize: 13,
  },
  box: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
  },
  nicknamefix: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 145,
    marginTop: 10,
    fontWeight: '700',
  },
  profileimgfix: {
    marginLeft: 45,
    marginTop: 40,
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  emailfix: {
    alignSelf: 'center',
  },
  mystatus: {
    height: 120,
    marginVertical: 30,
    backgroundColor: '#F4F4F4',
    padding: 20,
  },
  highlite: {
    fontSize: 18,
    fontFamily: 'SCDream6',
    color: '#4CB73B',
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'SCDream6',
    color: '#434343',
  },
  editbox: {},
  editbutton: {
    borderWidth: 2,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#e0e0e0',
  },
  editbuttonText: {
    textAlign: 'center',
    fontFamily: 'SansBold',
    fontSize: 13,
  },
  pickpic: {
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 3,
    // borderRadius: 4,
    // elevation: 3,
  },
  editId: {
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingHorizontal: 5,
    elevation: 3,
  },
  // complete: {
  //   borderRadius: 4,
  //   paddingVertical: 5,
  //   paddingHorizontal: 5,
  //   elevation: 3,
  // },
  seed: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profiletitle: {
    textAlign: 'center',
    fontFamily: 'SansMedium',
    fontSize: 18,
    marginVertical: 20,
  },
  completetext: {
    fontFamily: 'SansMedium',
    color: '#4CB73B',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    fontSize: 18,
  },
  form: {
    width: 250,
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },
});
