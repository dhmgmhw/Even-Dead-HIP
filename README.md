# 🌱 책과 콩나무 - Client 

![](https://images.velog.io/images/dhmgmhw/post/35edf321-d9e2-44a6-8895-bf7699be3c8f/image.png)
### 🌟 우리동네 이웃과 같이하는 가치나눔

---

### 프로젝트 개요 ✨

**Insight** -- 함께 독서하며 추천하는 오프라인 도서 교환 서비스
**Keyword** -- #가까운 #가치 #발견
**Value** -- 같이하는 가치나눔

### 프로젝트 멤버 👩‍💻

**Front** (React Native) :  김지하, 문형원
**Back** (Spring) : 강상구, 이정빈, 천재승, 임다희
**Design** (UXUI) : 최지예

_Back-end github_ : https://github.com/39world/urbookmybook-back

### 프로젝트 기간 📅

2021.04.23(금) ~ 2021.05.27(목)

---

### 개발도구 및 환경 🔧

- Expo
- JavaScript
- React Native
- Figma
---
### View 설계 🚧
![](https://images.velog.io/images/dhmgmhw/post/8095fd4b-cb7e-43ff-822d-f583d213ce71/image.png)

---

### 구현 기능 🙆‍♂️

#### 로그인 / 회원가입
- 정규표현식을 이용한 유효성검사
- 로그인과 동시에 본인의 token과 email을 AsyncStorage에 저장함으로써 추후 권한식별에 사용
#### 게시글(CRUD)
- 카카오 Open Api를 통한 도서 DB를 활용함으로써 
사용자에게 보여질 게시글 정보의 질을 높히도록 유도  
#### 스크랩
- AsyncStorage에 저장되어있는 email과 비교하여 본인의 게시글은 스크랩 할 수 없도록 처리
#### 동네설정
- 설정된 동네에 따른 게시글 표시
#### 댓글(CRUD)
- 본인의 email과 작성자의 email을 비교하여 본인 이외에는 수정/삭제 기능이 보여지지 않도록 처리
#### 채팅 구현
- 채팅방을 만들때 채팅방 구분을 '게시글id + 게시글작성자id + 교환신청자id' 형태로 만들어 하나의 게시글에서 같은 유저의 채팅이 이루어지지 않도록 처리
#### 게시글 검색
- 장르별 게시글 표시
- 게시글 검색 기능
#### 채팅 구현
- Sock js와 Stomp를 이용한 채팅 구현
#### 콩나무단계
- 교환시 포인트를 제공함으로써 포인트를 쌓아 콩나무를 키우는 모습을 구현함으로써 유저에게 하여금 서비스 참여 및 재방문을 유도
#### 프로필 수정
- formData를 이용한 프로필 수정

---
### 시연영상 🎬
https://www.youtube.com/watch?v=5ARyzQe7ass&ab_channel=%EA%B0%95%EC%83%81%EA%B5%AC

---
### 백엔드 깃헙 🤼

_Back-end github_ : https://github.com/39world/urbookmybook-back
