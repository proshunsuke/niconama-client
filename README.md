# Niconico live broadcast For Node.js

[![Build Status](https://travis-ci.org/proshunsuke/niconama-client.svg?branch=master)](https://travis-ci.org/proshunsuke/niconama-client)

[![NPM](https://nodei.co/npm/niconama-client.png?compact=true)](https://nodei.co/npm/niconama-client/)

A client library for niconico live broadcast.

## examples

### login
```javascript
import NiconamaClient from 'niconama-client';

const email = 'email';
const password = 'password';

const client = new NiconamaClient();
client.login(email, password)
  .then(function(session){
    console.log(session); // user_session=user_session_00000_123abc
  });
```

### comments of all rooms (co00000, 立ち見A, 立ち見B, etc)
```javascript
import NiconamaClient from 'niconama-client';

const liveId = 'liveId';
const session = 'session';

const client: NicoClient = new NiconamaClient();
client.liveComments(liveId, session, comment => {
  console.log(
    `コメ番: ${comment['no']}\tユーザーID: ${comment['user_id']}\t時間: ${timestampToDateformat(comment['date'])}\t
    コメント: ${comment['comment']}\tプレミア: ${comment['premium']}\t NGスコア: ${comment['score']}\t 部屋: ${comment['roomLabel']}`
  );
// コメ番: 10      ユーザーID: aaa 時間: 22:20:4    コメント: comment1   プレミア: 2      部屋: 立ち見C列
// コメ番: 106     ユーザーID: bbb 時間: 22:20:4    コメント: comment2   プレミア: 2      部屋: 立ち見B列
// コメ番: 10      ユーザーID: ccc 時間: 22:20:4    コメント: comment3   プレミア: 2      部屋: 立ち見D列
// ...  
});
```
