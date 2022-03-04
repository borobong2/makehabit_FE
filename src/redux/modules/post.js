// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

// actions
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

// initialState
const initialState = {
  page: null,
};

//게시물 등록
const addPostDB = (
  title,
  category,
  thumnail,
  startAt,
  content,
  howtoContent,
  tag
) => {
  return function (dispatch, useState, { history }) {
    console.log("게시물 등록");
    apis
      .createChallenge(
        title,
        category,
        thumnail,
        startAt,
        content,
        howtoContent,
        tag
      )
      .then((response) => {
        console.log("게시물 등록");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//이미지 업로드
const uploadImageDB = (challengeId, imgUrl, challengeTitle, comment) => {
  return function (dispatch, useState, { history }) {
    console.log("이미지 업로드");
    apis
      .confirm(challengeId, imgUrl, challengeTitle, comment)
      .then((response) => {
        console.log("이미지 업로드");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//상세페이지 불러오기
const getDetailPostDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log("상세페이지");
    apis
      .detail(challengeId)
      .then((response) => {
        console.log("상세페이지");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//참여하기
const joinDB = (challengId) => {
  return function (dispatch, getState, { history }) {
    console.log("참여하기");
    apis
      .join(challengId)
      .then((response) => {
        console.log("참여하기");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//참여취소하기
const joinCancelDB = (challengId) => {
  return function (dispatch, getState, { history }) {
    console.log("참여취소하기");
    apis
      .joinCancel(challengId)
      .then((response) => {
        console.log("참여취소하기");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//찜하기
const likeDB = (challengId) => {
  return function (dispatch, getState, { history }) {
    console.log("좋아요");
    apis
      .like(challengId)
      .then((response) => {
        console.log("좋아요");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//찜하기 취소하기
const dislikeDB = (challengId) => {
  return function (dispatch, getState, { history }) {
    console.log("싫어요");
    apis
      .dislike(challengId)
      .then((response) => {
        console.log("싫어요");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// redux
export default handleActions(
  {
    // [SET_TAB]: (state, action) =>
    //   produce(state, (draft) => {
    //     // console.log(action.payload.page);
    //     draft.page = action.payload.page;
    //   }),
  },
  initialState
);

const actionCreators = {
  addPostDB,
  uploadImageDB,
  getDetailPostDB,
  joinDB,
  joinCancelDB,
  likeDB,
  dislikeDB,
};

export { actionCreators };
