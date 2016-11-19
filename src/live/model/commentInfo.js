// @flow
export default class CommentInfo {
  thread: string;
  no: string;
  vpos: string;
  date: string;
  date_usec: string;
  mail: string;
  user_id: string;
  premium: string;
  anonymity: string;
  locale: string;
  score: string;
  yourpost: string;
  deleted: string;
  comment: string;
  roomLabel: string;
  constructor(
    thread: string,
    no: string,
    vpos: string,
    date: string,
    date_usec: string,
    mail: string,
    user_id: string,
    premium: string,
    anonymity: string,
    locale: string,
    score: string,
    yourpost: string,
    deleted: string,
    comment: string,
    roomLabel: string
  ) {
    this.thread = thread;
    this.no = no;
    this.vpos = vpos;
    this.date = date;
    this.date_usec = date_usec;
    this.mail = mail;
    this.user_id = user_id;
    this.premium = premium;
    this.anonymity = anonymity;
    this.score = score;
    this.locale = locale;
    this.score = score;
    this.yourpost = yourpost;
    this.deleted = deleted;
    this.comment = comment;
    this.roomLabel = roomLabel;
  }
}
