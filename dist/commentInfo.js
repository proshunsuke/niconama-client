"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommentInfo = function CommentInfo(thread, no, vpos, date, date_usec, mail, user_id, premium, anonymity, locale, score, yourpost, deleted, comment, roomLabel) {
  _classCallCheck(this, CommentInfo);

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
};

exports.default = CommentInfo;
module.exports = exports["default"];