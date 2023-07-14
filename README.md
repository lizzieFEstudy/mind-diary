# 마음 일기

마음을 챙기는 건강한 습관, 마음 일기!

## Overview

https://mind-diary.vercel.app/

## API 명세서

| 기능                  | URL         | Method | request                                                                                                                        | response                                                                                                                                                                                          |
| --------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 전체 게시글 목록 조회 | /posts      | GET    |                                                                                                                                | [{ "type": "form01", "regdate": "2023. 7. 14.", "writer": "8uwWjYJuNfcbolLuJiux1plncs42", "content": { "item01": "", "item02": [], "item03": "", "item04": "", "item05": "" }, "id": "aJG5cIi" }] |
| 게시글 작성           | /posts      | POST   | { type: 'form01', regdate: date, writer: user.data.uid, content: { item01, item02: item02CheckList, item03, item04, item05 } } |                                                                                                                                                                                                   |
| 게시글 조회           | /posts/{id} | GET    |                                                                                                                                | { "type": "form01", "regdate": "2023. 7. 14.", "writer": "8uwWjYJuNfcbolLuJiux1plncs42", "content": { "item01": "", "item02": [], "item03": "", "item04": "", "item05": "" }, "id": "aJG5cIi" }   |
| 게시글 수정           | /posts/{id} | PATCH  | { content: { item01, item02: item02CheckList, item03, item04, item05 } }                                                       |                                                                                                                                                                                                   |
| 게시글 삭제           | /posts/{id} | DELETE |                                                                                                                                |                                                                                                                                                                                                   |

## Install

- react-router-dom
- styled-components
- firebase
- react-query
- @react-query-firebase/firestore
- @react-query-firebase/auth
- json-server
- axios

## Contact

lizzie.yyy@gmail.com
