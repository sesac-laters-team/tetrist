# Tetrist

<div align="center">
<img width="500" alt="image" src="https://github.com/sesac-laters-team/tetrist/assets/133750746/bff47754-e08f-4755-a0f0-15572e10f5ef">
</div>


# Tetrist
> **새싹(Seoul Software Academy, SeSAC) 청년취업사관학교** <br/> **개발기간: 2024.04.22 ~ 2024.05.08** <br/> **팀명: 지각변동**

<br/>

## 📬 배포 주소

> **배포 버전** : [http://52.78.163.112/login](http://52.78.163.112/login) <br>

#### 배포 서버 계정
- 테스트 계정 <br/>
email : test@test.com <br/>
pw : test1! <br/>

- 관리자 계정 <br/>
email : admin@admin.com <br/>
pw : test1! <br/>

- 관리자페이지 주소
http://52.78.163.112:8080/api-server/admin

<br/>

## 👨‍👩‍👧‍👦 팀 소개

|      김성민       |         이대원         |       전재민         |      김예지       |      강혜인       |
|---|---|---|---|---|
|      Back-end & Front-end         |        Front-end         |       Front-end            |     Back-end       |      Front-end          | 
|      배포 & Git 관리, 게임 로직 및 기능 구현, socket 통신         |        로그인, 회원가입 및 기능 구현         |       반응형 CSS, 모달 전체, 결과창 및 CSS 구현          |     ERD 설계, API SWAGGER 이용 명세, Git 관리 및 관리자 페이지 구현       |      대기방 & 채팅 기능 , 유저 프로필 기능 & CSS 수정, Redux 상태 관리 구현          | 
| <a href="https://github.com/jarajiri"> 🔗GitHub</a> | <a href="https://github.com/1ee-dw">🔗GitHub </a> | <a href="https://github.com/jaeminjeon123">🔗GitHub</a>  | <a href="https://github.com/yzlybe">🔗GitHub</a> | <a href="https://github.com/hyein310">🔗GitHub</a> | 

<br/>

## ✍️ 프로젝트 소개

웹 socket과 react를 사용해서 구현한 1:1 레트로 감성의 대전 테트리스 게임



#### 게임 방법
키보드를 이용해 테트리스 게임을 진행

- <b>→ 키</b> : Move Righe <br />
- <b>← 키</b> : Move Left <br />
- <b>↑ 키</b> : Rotate <br />
- <b>↓ 키</b> : Soft Drop <br />
- <b>space 키</b> : Hard (fast) Drop
  
<br/>

---
## 📒 시작 가이드
### .env
DB_USERNAME=로컬DB계정 </br>
DB_PASSWORD=로컬DB비밀번호 </br>
DB_DATABASE=tetris </br>
PORT=8080 </br>
PORT_SOCKET=8081 </br>
PORT_SOCKET_GAME=8082 </br>

### Installation
``` bash
$ git clone https://github.com/sesac-laters-team/tetrist.git
$ cd tetrist
```
#### Backend
```
$ cd server
$ npm install
$ npm run dev
```

#### Frontend
```
$ cd client
$ npm install 
$ npm run start
```

---

## 🤖 사용 스택 Stacks 

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             
---

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        
---

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white)
![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white)
![Mysql](https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=Mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=white)
![EC2](https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![RDS](https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white)
![env](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=white)
![sequelize](https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white)

---

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white)

<br/>

---
## 📺 화면 구성 
#### - 로그인 페이지  
![tetrist_login](https://github.com/sesac-laters-team/tetrist/assets/133750746/3ce9b56f-900c-4d65-ac37-6e23b0aba4a1)

  
#### - 대기방 페이지
![tetrist_waiting_room](https://github.com/sesac-laters-team/tetrist/assets/133750746/62f959d9-f566-4f66-9fce-b5ffa5d5d98b)


#### - 게임 대기 페이지
![tetrist_gamewaiting](https://github.com/sesac-laters-team/tetrist/assets/133750746/8208caf5-08cc-4fc8-b903-cb74730119b5)


#### - 게임 페이지 
![tetrist_game](https://github.com/sesac-laters-team/tetrist/assets/133750746/c91dfc27-ca62-4774-b5e8-aaa585f9d4cb)


#### - 결과 페이지
| win | lose |
|---|---|
| ![tetrist_win (2)](https://github.com/sesac-laters-team/tetrist/assets/133750746/b4ddd43a-093c-497d-8a08-b0709cd8e7e4) | ![tetrist_lose (1)](https://github.com/sesac-laters-team/tetrist/assets/133750746/c34ab305-c54d-4361-80e6-f482b606b972) |


---
## ⭐ 주요 기능 
### 1. 게임 대기방 채팅 기능
- 플레이어는 새로운 방을 생성하여 다른 플레이어들과 게임을 할 수 있습니다. 필요에 따라 방의 비밀번호를 설정할 수 있습니다.
- 대기방 화면에서는 현재 활성화되어 있는 모든 방의 리스트를 볼 수 있습니다. 각 방의 현재 인원, , 방의 상태등의 정보가 제공됩니다.
- 플레이어는 리스트를 통해 자신이 참여하고 싶은 방을 찾고, 클릭 한 번으로 입장할 수 있습니다.
- 대기방에서는 플레이어들이 실시간으로 채팅을 할 수 있습니다. 이를 통해 플레이어들은 서로 소통하며 게임 전략을 논의하거나 친목을 다질 수 있습니다.

### 2. 테트리스 게임 기능
- 각 플레이어는 자신의 게임 보드에서 블록을 쌓고, 완전한 라인을 만들어 해체하면서 포인트를 얻습니다.
- 게임 인터페이스에는 플레이어의 현재 스탯과 게임 레벨을 확인할 수 있는 기능이 포함되어 있습니다. 이는 플레이어가 자신의 게임 진행 상황을 파악하고, 전략을 조정하는 데 도움을 줍니다.
- 화면이 작아질 때, 게임은 플레이어의 보드를 중심으로 표시하고, 상대방의 보드는 축소된 형태로 표시됩니다. 이는 플레이어가 자신의 게임에 집중할 수 있게 돕고, 동시에 상대방의 진행 상황도 눈으로 확인할 수 있게 합니다.

### 3. 마이페이지 기능
- 사용자는 언제든지 자신의 닉네임과 비밀번호를 수정할 수 있습니다. 유효성 검사를 통해 개인의 정보를 유지하고, 유연성을 제공합니다.
- 게임 내에서의 성과를 확인할 수 있습니다. 획득한 승점포인트와 게임전적(승/패)를 통해 사용자는 자신의 게임 실력과 진행 상황을 평가할 수 있습니다.

### 4. 상점 기능
- 상점에서는 게임 플레이를 통해 얻은 포인트를 사용하여 다양한 커스터마이징 옵션을 구매할 수 있습니다.
- (게임을 이용해서 얻은 포인트를 집계하여) 배경 색깔, 프로필 이미지.프로필 테두리를 변경할 수 있습니다.
- (상점에서 바로 자신이 구매한 아이템을 바로 실시간으로 적용 가능하며, 구매한 아이템을 확인할 수 있습니다.)

### 5. 랭킹 시스템
- 게임에서 승리할 경우, 플레이어는 포인트를 획득하며 반대로 패배할 시엔, 일정량의 포인트를 잃습니다.
- 플레이어의 총 점수는 실시간으로 갱신되어 3등까지 나타내줍니다.

---
## 📑 아키텍쳐
### Swagger
http://52.78.163.112:8080/api-docs

### 디렉토리 구조
#### - Back-end
```bash
server
│
│
├──admin
│
├── config
│
├── controller
│
├── models
│
├── routes
│
├── sockets
│
├── sql
│
├── utils
└── App.js
```

#### - Front-end
```bash
client
│
│
├──public
│	   └──images
│
│
├── components/
│   ├── auth/                        #인증 관련 컴포넌트
│   │
│   ├── chat/                        #채팅 관련 컴포넌트
│   │
│   ├── common/                  # 공통 컴포넌트
│   │
│   ├── waitingRoom/            # 대기방 컴포넌트
│   │
│   ├── game/                       # 게임방 관련 컴포넌트
│   │
│   ├── page/                        # 페이지 관련 컴포넌트
│   │
│   └── App.js
├── hooks                             #  관련 훅들
├── styles/
│        ├── scss/                    # 페이지 별로 조정
├── redux/                            # Redux 관련 파일
│       └── store.                    # 스토어 설정
│	    │	  ├── module
│        │	  └── index.js
│        └── store.js
│
├── index.js                     # 진입점, 여기에서 React 앱을 DOM에 렌더링

```


