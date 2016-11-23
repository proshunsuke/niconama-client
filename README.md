# Niconico live broadcast For Node.js

[![Build Status](https://travis-ci.org/proshunsuke/niconama-client.svg?branch=master)](https://travis-ci.org/proshunsuke/niconama-client)

[![NPM](https://nodei.co/npm/niconama-client.png?compact=true)](https://nodei.co/npm/niconama-client/)

A client library for niconico live broadcast.

## Installation

```
npm i niconama-client
```

or

```
yarn add niconama-client
```

## Examples

### Login
```javascript
import NiconamaClient from 'niconama-client';

const client = new NiconamaClient();
client.login(email, password)
  .then( session => {
    console.log(session);
  });
// user_session=user_session_00000_123abc
```

### All rooms comments (co00000, 立ち見A, 立ち見B, etc)
```javascript
import NiconamaClient from 'niconama-client';

const client = new NiconamaClient();
client.setLiveInfo(liveId, session);
const commentStream = client.createLiveCommentStream();
commentStream.on('readable', () => {
  const comment = commentStream.read();
  console.log(
    `コメ番: ${comment.no}\tユーザーID: ${comment.user_id}\t時間: ${timestampToDateformat(comment.date)}\t
  コメント: ${comment.comment}\tプレミア: ${comment.premium}\t NGスコア: ${comment.score}\t 部屋: ${comment.roomLabel}`
  );
});

client.liveComments();

// コメ番: 10      ユーザーID: aaa 時間: 22:20:4    コメント: comment1   プレミア: 2      部屋: 立ち見C列
// コメ番: 106     ユーザーID: bbb 時間: 22:20:4    コメント: comment2   プレミア: 2      部屋: 立ち見B列
// コメ番: 10      ユーザーID: ccc 時間: 22:20:4    コメント: comment3   プレミア: 2      部屋: 立ち見D列
// ...
```

### Do comment

```javascript
import NiconamaClient from 'niconama-client';

const client = new NiconamaClient();
client.setLiveInfo(liveId, session);

client.liveComments()
  .then( () => {
    client.doLiveComment(comment, option);
  });
```

Detailed examples are [here](https://github.com/proshunsuke/niconama-client/tree/master/examples)

## Methods

## login(email: string, password: string)

- Returns: `Promise.<session>`

Login to niconico, and receive session.

## setLiveInfo(liveId: string, session: string)

create Live instance with liveId and session

liveId is the string starting with "lv" in niconico live URL
ex. http://live.nicovideo.jp/watch/lv0000000
in this case, "lv0000000" is the liveId

## liveComments()

- Returns: `Promise.<>`

Get comments from niconico comment servers

## createLiveCommentStream()

- Returns: `LiveCommentStream`

Create LiveCommentStream instance.

Call this method after calling [liveComments()](#liveComments())

## doLiveComment(comment: string[, option: string])

Do comment to niconico live broadcast

Call this method after calling [liveComments()](#liveComments())

Options argument is a string with space separator. ex: "184 red big"

Options are is below

```
size: small, big
vertical position: ue/top, shita/bottom
horizontal position: migi/right, hidari/left
color:
 not premium: white, red, green, blue, cyan, yellow, purple, pink, orange
 premium or broadcaster: niconicowhite/white2, marineblue/blue2, madyellow/yellow2,
                         passionorange/orange2, nobleviolet/purple2, elementalgreen/green2, truered/red2, black
 psyllium: fred, fpink, faqua, fblue, fyellow, fgreen, forange
other: 184, hidden
```

## License

[MIT](LICENSE) © [pro_shunsuke](https://twitter.com/pro_shunsuke)
