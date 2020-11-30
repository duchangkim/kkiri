# 프로젝트 기획 배경

<br/>

> 우리가 주로 사용하는 메신저인 카카오톡은 기능도 훌륭하고, 빠르고 좋습니다. 하지만 커플 전용으로 사용하기엔 실수가 생길 수 있습니다.<br/><br/>
> 애교섞인 대화 내용을 연인과의 대화방이 아닌 공적인 대화방에 보내는 실수, 사진을 잘못 보내는 실수 등등 상상만 해도 소름이 돋는 실수입니다. 또한 연인사이에 찍은 사진들을 관리하다가 날려버리는 실수, 연인의 생일, 기념일을 까먹고 넘어가는 실수 등 이러한 실수를 방지하고, 연인사이에 필요한 기능을 가진 웹사이트를 만들어보면 어떨까 하는 생각에 끼리 웹사이트를 기획하고, 제작했습니다.

<br/>
<br/>


# Kkiri 실행

- 백엔드 서버 실행
```
  $ npm start:dev
  or
  $ yarn start:dev
```
- 클라이언트 서버 실행
```
  $ npm start
  or
  $ yarn start
```

<br/>
<br/>

# Kkiri 프로젝트 간단 설명

#### Back-end 서버
- API server [API 명세서](https://github.com/Kim-Duchang/kkiri/wiki/API-%EB%AA%85%EC%84%B8%EC%84%9C)
- Node.js
- Koa
- RESTful(하게 구현 하려고 최대한 노력했습니다..)
- JWT로 로그인 기능구현
- socket.io 사용
- MongoDB 사용

<br/>

#### Front-end 서버
- ReactJS
- 함수형 컴포넌트
- Container / Component 구분
- redux 패턴
- redux-saga로 비동기 API 서버 통신
- styled-components로 css스타일링

<br/>
<br/>

# Kkiri 프로젝트 기능 설명

+  `회원`
- 회원가입
  
- 로그인
- 코드입력
- 아이디 찾기
- 비밀번호 찾기
- 배경화면 수정
- 프로필 사진 수정
- 로그아웃
- 회원탈퇴
+  `앨범`
- Create
- Read
- Update
- Delete
+  `캘린더`
  - ToastCalendar API 사용
  - ToastDatePicker API 사용
  - 1달씩 이동 할 수 있음, Today버튼으로 오늘 날짜로 복귀 기능
- Create
  - 캘린더 필터, 스케쥴, 디데이 추가
  - 색상, 이름, 필터 각각 설정해서 추가할 수 있음
  - 디데이 날짜 계산
- Read
  - Allday일 경우와 time일 경우 캘린더에서 보여지는것이 다름
  - 사이드바에 캘린더 필터, 디데이 계산해서 보여줌
- Update
  - 각 일정 클릭시 수정기능
- Delete
  - 캘린더 필터, 스케쥴, 디데이 삭제
+  `채팅`
- 채팅 실시간 알림
  - 대화방 페이지 밖에 있을 경우 사이드바에 새로운 채팅 알림기능
- 개인 채팅기능
  - 오직 상대방(커플 연결된 상대방)과의 채팅
  - 대화내용 디비 저장
  - 이모지
