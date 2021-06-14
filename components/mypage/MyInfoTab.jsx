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
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Feather } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import * as Linking from 'expo-linking';

import { uploadImg } from '../../config/PostingApi';

import { deleteAccount, getUserProfile, signOut } from '../../config/BackData';
import {
  changeUserProfile,
  changeUserProfileWithFormData,
} from '../../config/BackData';

import { Overlay } from 'react-native-elements';
import { Alert } from 'react-native';

export default function MyInfoTab({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setprofile] = useState('');

  const [visible, setVisible] = useState(false);
  const [delOpener, setDelOpener] = useState(false);

  const [name, setName] = useState(profile.username);
  const [imageUri, setImageUri] = useState(profile.image);
  const [nickName, setNickName] = useState(profile.username);
  const [point, setPoint] = useState(0);

  const [level, setLevel] = useState('');
  const [progress, setProgress] = useState();

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

  const goToTeam = () => {
    navigation.push('ProjectTeam', navigation);
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

  const delAccount = async () => {
    console.log('회원탈퇴 시도');
    await deleteAccount(profile.id, navigation);
    setDelOpener(!delOpener);
  };

  const addKakao = () => {
    Linking.openURL('http://pf.kakao.com/_xhgVMs');
  };

  const download = async () => {
    const result = await getUserProfile();
    setprofile(result.results);
    setNickName(result.results.username);
    setImageUri(result.results.image);
    levelSetter(result.results.point);
    setPoint(result.results.point);
    progressSetter(result.results.point);
  };

  const upload = async () => {
    setIsLoading(true);
    if (name == '') {
      Alert.alert('바꿀 닉네임을 작성해 주세요!');
      setIsLoading(false);
      return;
    }
    if (name.length > 6) {
      Alert.alert('닉네임은 최대 6자까지 가능합니다.');
      setIsLoading(false);
      return;
    }
    if (imageUri == '') {
      Alert.alert('바꿀 사진을 선택해 주세요!');
      setIsLoading(false);
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
      setIsLoading(false);
      download();
    }
  };

  const uploadWithFormData = async () => {
    setIsLoading(true);
    if (name == '') {
      Alert.alert('바꿀 닉네임을 작성해 주세요!');
      setIsLoading(false);
      return;
    }
    if (name.length > 6) {
      Alert.alert('닉네임은 최대 6자까지 가능합니다.');
      setIsLoading(false);
      return;
    }
    if (imageUri == '') {
      Alert.alert('바꿀 사진을 선택해 주세요!');
      setIsLoading(false);
      return;
    } else {
      const formData = new FormData();
      if (imageUri == profile.image) {
        formData.append('userData', JSON.stringify({ username: name }));
        await changeUserProfileWithFormData(formData);
        setVisible(false);
        setIsLoading(false);
        download();
      } else {
        formData.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        formData.append('userData', JSON.stringify({ username: name }));
        await changeUserProfileWithFormData(formData);
        setVisible(false);
        setIsLoading(false);
        download();
      }
    }
  };
  // 폼데이터 업로드 수정

  const toggleOverlay = () => {
    setVisible(!visible);
    download();
    setName(nickName);
  };

  const toggleDel = () => {
    setDelOpener(!delOpener);
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
    if (0 <= point && point < 600) {
      setLevel('콩');
    } else if (600 <= point && point < 1200) {
      setLevel('새싹');
    } else if (1200 <= point && point < 1800) {
      setLevel('줄기');
    } else if (1800 <= point && point < 2400) {
      setLevel('가지');
    } else if (2400 <= point && point < 3000) {
      setLevel('어린나무');
    } else if (3000 <= point && point < 3600) {
      setLevel('큰나무');
    } else if (3600 <= point && point < 4200) {
      setLevel('꽃');
    } else {
      setLevel('오두막');
    }
  };

  const progressSetter = (data) => {
    while (1 <= data / 600) {
      data -= 600;
    }
    setProgress(data / 600);
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
                  source={
                    profile.image
                      ? { uri: profile.image }
                      : require('../../assets/userimg.png')
                  }
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
              <Text style={styles.editbuttonText}>프로필 수정</Text>
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
              {isLoading ? (
                <ActivityIndicator
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: '50%',
                  }}
                  size='large'
                  color='grey'
                />
              ) : null}
            </Overlay>
            <Overlay isVisible={delOpener} onBackdropPress={toggleDel}>
              <View style={styles.delBox}>
                <Text style={styles.delText}>
                  책과 콩나무에서 탈퇴하시겠습니까?
                </Text>
                <Text style={styles.delText}>
                  이 작업은 되돌릴 수 없어요 ;(
                </Text>
                <Pressable onPress={delAccount} style={styles.delBtn}>
                  <Text style={styles.delBtnText}>회원탈퇴</Text>
                </Pressable>
              </View>
            </Overlay>
          </View>
        </View>
      </View>
      <View style={styles.mystatus}>
        <Text style={styles.title}>
          콩나무 <Text style={styles.highlite}>{level} 단계</Text>
        </Text>
        <ProgressBar
          style={styles.seed}
          progress={progress}
          color={'#31B11C'}
        />
        <Text style={styles.pointText}>
          다음 단계까지{' '}
          <Text style={{ fontFamily: 'SansExtra' }}>
            {(point - 600) * -1}포인트{' '}
          </Text>
          남았습니다
        </Text>
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
      <Pressable style={styles.deal} onPress={addKakao}>
        <Text style={styles.downcompo}>카카오 플친</Text>
        <Feather
          style={styles.rarrow}
          name='chevron-right'
          size={28}
          color='black'
        />
      </Pressable>
      <View style={styles.border}></View>
      <Pressable style={styles.deal} onPress={goToTeam}>
        <Text style={styles.downcompo}>프로젝트 팀</Text>
        <Feather
          style={styles.rarrow}
          name='chevron-right'
          size={28}
          color='black'
        />
      </Pressable>
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
      <Pressable
        style={[styles.deal, { justifyContent: 'center', marginVertical: 20 }]}
        onPress={toggleDel}>
        <Text
          style={[
            styles.downcompo,
            {
              textAlign: 'center',
              alignSelf: 'center',
              fontFamily: 'SansRegular',
              color: 'red',
            },
          ]}>
          회원 탈퇴
        </Text>
      </Pressable>
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
  delBox: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 5,
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
    includeFontPadding: false,
  },
  pickpic: {
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  editId: {
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingHorizontal: 5,
    elevation: 3,
  },
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
  delText: {
    fontFamily: 'SansMedium',
    fontSize: 20,
    includeFontPadding: false,
  },
  delBtnText: {
    fontFamily: 'SansBold',
    color: 'white',
    includeFontPadding: false,
  },
  delBtn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  pointText: {
    fontFamily: 'SansMedium',
    color: '#4CB73B',
    textAlign: 'center',
    marginTop: 10,
  },
});
