# 오늘 뭐 먹지?
## 프로젝트 소개

> 직장인들의 점심 메뉴 선정 시 간편하게 커뮤니케이션 할 수 있도록 돕는 서비스 **'오늘 뭐 먹지?'** 의 클라이언트 레포지토리 입니다.

- 유저는 맛집 이름으로 메뉴를 제안할 수 있습니다. 메뉴 제안은 매일 12시에 초기화 됩니다.
- 오늘의 메뉴 기능은 모든 팀 구성원에게 맛집을 제안할 수 있도록 합니다.
- 크루 기능은 소규모 그룹을 이룰수 있도록 하며, 여기에 맛집을 제안하면 크루원들이 투표할 수 있습니다.
- 맛집은 팀의 리뷰 정보를 가집니다. 옵션을 선택하면 카카오맵 연결 링크를 제공합니다.
- 팀을 만들고 가입할 수 있습니다. 팀 생성시 발급되는 입장 코드를 통해 팀에 가입할 수 있습니다.
- 초대가 발생하면 유저는 프로필메뉴에서 알림을 받습니다.
  
![instruction](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbyHpXZ%2FbtrMDXW84ap%2FAlAoBRBCge6DUFQLiZb4kk%2Fimg.jpg)

## 서비스 링크

https://eatwhat.kr

## 프로젝트 상세 소개

https://dahna.tistory.com/7

## 프로젝트 실행

서버 구동:

```bash
npm install
npm run dev
npm run test
```

[http://localhost:3000](http://localhost:3000) 에서 구동 결과 확인  
-- env 파일 필요

## 기술 스택

<img width="530" alt="스크린샷 2022-06-25 오후 5 02 29" src="https://user-images.githubusercontent.com/61297852/175764424-f52ca011-2d3f-42e4-b657-85310ba9fb41.png">

## 폴더 구조

```
📦 client-matzip
├─ .babelrc.js
├─ .eslintrc.json
├─ .gitignore
├─ .npmrc
├─ README.md
├─ api // api 호출 함수
│  ├─ api.ts // 인증 token 설정
│  ├─ setupAxios.ts // axios 인스턴스 설정
│  ├─ ...
├─ babel-plugin-macros.config.js
├─ babel.plugin.js
├─ components
│  ├─ modules // 도메인 데이터를 표현하는 컴포넌트
│  └─ ... // 공용 인터페이스 컴포넌트
├─ constants
├─ jest.config.js
├─ jest.setup.js
├─ next-env.d.ts
├─ next.config.js
├─ package.json
├─ pages
│  ├─ 404.tsx
│  ├─ _app.tsx
│  └─ ...
├─ postcss.config.js
├─ public
├─ queries // react-query 호출 커스텀 훅
├─ store // redux 상태관리
│  ├─ index.ts
│  └─ modules
│     ├─ auth // 인증 상태
│     └─ ui // ui 상태
├─ styles
├─ svgTransform.js // jest svg 사용시 필요
├─ tailwind.config.js
├─ tsconfig.json
├─ type
└─ utils // 공통 함수 모음
   ├─ hooks
   ├─ scroll.ts // 페이지 이동 시 스크롤 위치 기억
   └─ value.ts // 값 포맷 변경 처리
```

## 배포 환경

client server - Netlify 배포  
domain - gabia  
DNS server - Netlify
