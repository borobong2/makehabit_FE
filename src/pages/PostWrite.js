import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as userAction } from "../redux/modules/user";
// import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { Grid, Text } from "../elements";
// import CategoryModal from "../components/CategoryModal";
import CategoryModal1 from "../components/CategoryModal1";
import Upload from "../components/Upload";
import PageBack from "../components/PageBack";
// import { history } from "../redux/configureStore";
import styled from "styled-components";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { GoCalendar } from "react-icons/go";

import moment from "moment";

import ButtonNavigation from "../components/ButtonNavigation";

const PostWrite = () => {
  const dispatch = useDispatch();
  //카테고리 값 가져오기 (자식(CategoryModal) -> 부모(postWrite))
  const [categoryValue, setCategoryValue] = useState(0);
  const [sendCategory, setSendCategory] = useState(null);
  //모달 리스트
  const modalList = [
    ["study", "공부"],
    ["exercise", "운동/건강"],
    ["self-development", "자기개발/취미"],
    ["living-habit", "생활습관"],
    ["eco", "에코"],
  ];
  const getData = (idx) => {
    setCategoryValue(modalList[idx][1]);
    setSendCategory(modalList[idx][0]);
    // console.log(idx, modalList[idx][0], modalList[idx][1]);
  };

  //카테고리 팝업
  // let [modalopen, setModalopen] = React.useState(false);
  //카테고리 팝업 열기
  // const openModal = () => {
  //   setModalopen(true);
  // };

  // //카테고리 팝업 닫기
  // const closeModal = () => {
  //   setModalopen(false);
  // };

  //날짜 인풋박스 시작일 선택 제한 (오늘 이전의 날짜 선택 불가하게, 너무 오래된 날짜 선택 불가능하게)
  // 오늘 날짜 YYYY-MM-DD형식으로 추출
  const offset = new Date().getTimezoneOffset() * 60000;
  let todayDate = new Date(Date.now() - offset).toISOString().split("T")[0];

  //선택한 날짜 가져오기
  const [date, setDate] = useState(null);
  const onChange = (e) => {
    // console.log(e.target); //이벤트가 발생한 타겟의 요소를 출력
    // console.log(e.target.value); //이벤트가 발생한 타겟의 Value를 출력
    setDate(e.target.value); //이벤트 발생한 value값으로 {text} 변경
  };

  // const onReset = () => {
  //   setDate(null); // onClick함수 발생시 ''으로 {text} 변경
  // };
  // 오늘 날짜+30일 YYYY-MM-DD형식으로 추출

  // console.log(date);
  const now = new Date(date);
  let todayPlus30 = new Date(now.setDate(now.getDate() + 30));
  todayPlus30 = todayPlus30.toISOString().split("T")[0];

  //content내용 받아오기
  const [title, setTitle] = React.useState(null);
  const [desc, setDesc] = React.useState("");
  const [method, setMethod] = React.useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDesc = (e) => {
    setDesc(e.target.value);
  };
  const onChangeMethod = (e) => {
    setMethod(e.target.value);
  };

  //업로드에 함수 접근하는 Ref
  const uploadRef = React.useRef();

  const fileInput = React.useRef();
  //userId 가져오기
  // const loginCheck = useSelector((state) => state.user.user);
  //이미지 여부 확인
  const imgExist = useSelector((state) => state.post.imgExist);

  const confirm = () => {
    const imageForm = new FormData();
    let image = fileInput.current.files[0];
    imageForm.append("image", image);
    console.log("들어왔나?", date, desc, method);

    if (image === undefined) {
      alert("썸네일 이미지가 없습니다!");
      return;
    }

    if (title === null) {
      alert("챌린지 제목이 없습니다!");
      return;
    }

    if (sendCategory === null) {
      alert("카테고리를 설정하지 않았습니다!");
      return;
    }

    if (date === null) {
      alert("시작일이 입력되지 않았습니다.");
      return;
    }
    if (desc === "") {
      alert("챌린지 설명을 쓰지 않았습니다.");
      return;
    }
    if (method === "") {
      alert("챌린지 인증 방법을 쓰지 않았습니다");
      return;
    }
    dispatch(
      postActions.addPostDB(
        title,
        sendCategory,
        imageForm,
        date,
        desc,
        method,
        "tags"
      )
    );
  };

  // const imageForm = new FormData();
  console.log("이미지 파일 바뀌었다!", fileInput);
  React.useEffect(() => {
    console.log("이미지 파일 바뀌었다!");
    // image = fileInput.current.files[0];
    // imageForm.append("image", image);
  }, [fileInput]);

  //자식 함수 접근하는 Ref
  const childRef = useRef();

  //moment 변환
  const startDay = moment(date);
  const transformDay = startDay.format("YYYY년 MM월 DD일");

  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Container>
      <Grid>
        {/* 타이틀 */}
        <TitleContainer>
          <PageBack color="#707070" left padding="0 0 0 1.063rem" />
          <TitleText>챌린지 개설</TitleText>
        </TitleContainer>

        {/* 이미지 업로드 */}
        <Grid padding="0 1.250rem">
          <Upload
            ref={uploadRef}
            _ref={fileInput}
            _onClick={() => {
              uploadRef.current.upload();
            }}
          />
        </Grid>

        {/* 제목 */}
        <Grid padding="1.250rem">
          <HeadLine>챌린지 제목</HeadLine>
          <TitleInput
            placeholder="제목을 입력해주세요."
            onChange={onChangeTitle}
          />
        </Grid>
        {/* 카테고리 선택 */}

        <CategoryButton
          onClick={() => {
            childRef.current.openModal();
          }}
        >
          {categoryValue ? (
            <CategoryTextBox>
              <HeadLine>{categoryValue}</HeadLine>
            </CategoryTextBox>
          ) : (
            <CategoryContainer>
              <ToLeft>
                <HeadLine>카테고리 선택</HeadLine>
              </ToLeft>
              <ToRight>
                <MdOutlineKeyboardArrowDown />
              </ToRight>
            </CategoryContainer>
          )}
        </CategoryButton>

        <CategoryModal1 ref={childRef} getData={getData}></CategoryModal1>

        {/* 이미지 첨부 */}

        <ChallengeStartContainer>
          <ToLeft>
            <HeadLine>챌린지 시작일</HeadLine>
          </ToLeft>
          <ToRight>
            <StartDate>{date ? transformDay : "2022년 00월 00일"}</StartDate>
            <DateInput
              id="inputCalendar"
              type="date"
              min={todayDate}
              onChange={onChange}
            ></DateInput>
          </ToRight>
        </ChallengeStartContainer>
        <MarginBox>
          <CaptionTextBox>
            <Caption>3일간 10번씩 도전해봐요!</Caption>
          </CaptionTextBox>
          {/* 예상 종료일 */}

          <ColorBox>
            <EndDateText>
              예상 종료일 :{" "}
              {todayPlus30 > todayDate
                ? moment(date, "YYYY.MM.DD")
                    .add(30, "days")
                    .format("YYYY년 MM월 DD일") +
                  " " +
                  dayArray[moment(date, "YYYY.MM.DD").add(30, "days").day()] +
                  "요일"
                : "예상 종료일은 30일 뒤 입니다."}
            </EndDateText>
          </ColorBox>
        </MarginBox>
        <Grid padding="5%">
          <Grid>
            <HeadLine>챌린지 설명 작성</HeadLine>
          </Grid>
          <Grid>
            <CaptionTextBox>
              <Caption style={{ color: "black" }}>
                무얼 도전해볼까요? 챌린지에 대해 설명해주세요.
              </Caption>
            </CaptionTextBox>
          </Grid>
          <Contents
            placeholder="ex) 매일 책 한 권 읽는 챌린지"
            onChange={onChangeDesc}
            maxLength="500"
          ></Contents>
          <Text textAlign="right">{desc.length ? desc.length : "0"}/500자</Text>
        </Grid>
        <MarginBox>
          <Grid>
            <HeadLine>챌린지 인증 방법</HeadLine>
          </Grid>
          <Grid>
            <CaptionTextBox>
              <Caption style={{ color: "black" }}>
                달성을 인증할 수 있는 방법에 대해 설명해주세요.
              </Caption>
            </CaptionTextBox>
          </Grid>
          <Contents
            placeholder="ex) 오늘 날짜가 적힌 메모와 책 페이지를 찍어주세요."
            onChange={onChangeMethod}
            maxLength="500"
          ></Contents>
          <Text textAlign="right">
            {method.length ? method.length : "0"}/500자
          </Text>
        </MarginBox>
        <MarginBox style={{ margin: "0 0 9.375rem 0" }}>
          {imgExist && title && sendCategory && date && desc && method ? (
            <MarginBox>
              <Link
                to={{
                  pathname: "/completed/open",
                  state: { openStart: date },
                }}
              >
                <CreateButton
                  onClick={() => {
                    confirm();
                  }}
                >
                  개설 완료
                </CreateButton>
              </Link>
            </MarginBox>
          ) : (
            <MarginBox>
              <CreateButton
                onClick={() => {
                  confirm();
                }}
              >
                <CreateText>챌린지 개설 완료</CreateText>
              </CreateButton>
            </MarginBox>
          )}
        </MarginBox>
      </Grid>

      <ButtonNavigation />
    </Container>
  );
};
const Container = styled.div``;
// 인증하기 텍스트
const TitleContainer = styled.div`
  text-align: center;
  margin: 1.313em 0 4.7vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.813rem;
`;

const HeadLine = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.625rem;
`;

const TitleInput = styled.input`
  width: 100%;
  background-color: #f7f7f7;
  height: 3.875rem;
  border: none;
  border-radius: 0.313rem;
  margin: 0.625rem 0;
  ::placeholder {
    font-size: 1rem;
    margin-left: 0.625rem;
    opacity: 1; /* 파이어폭스에서 뿌옇게 나오는 현상을 방지하기 위한 css */
  }
`;

const CategoryButton = styled.button`
  width: 100%;
  margin: 0.625rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
`;

const CategoryContainer = styled.div`
  // text-align: center;
  // margin: 1.313em 0 4.7vh 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  // align-items: center;
  // justify-content: center;
`;

const CategoryTextBox = styled.div`
  margin: 0.625rem 0;
`;
const ToLeft = styled.div`
  display: flex;
  margin: 0.625rem 1.25rem;
  align-items: center;
  justify-content: left;
`;

const ToRight = styled.div`
  display: flex;
  margin: 0.625rem 1.25rem;
  align-items: center;
  justify-content: right;
`;

const ChallengeStartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
`;

const StartDate = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.625rem;
  color: #ff8b37;
`;
const DateInput = styled.input`
  color: white;
  text-align: center;
  border: none;
  ::-webkit-datetime-edit {
    display: none;
  }
  ::-webkit-calendar-picker-indicator {
    font-size: 1.25rem;
    margin: auto;
  }
  cursor: pointer;
`;
const MarginBox = styled.div`
  margin: 0.625rem 1.25rem;
`;
const CaptionTextBox = styled.div`
  margin: 0.625rem 0;
`;
const Caption = styled.span`
  font-size: 1rem;
  line-height: 1.25rem;
  color: #707070;
`;

const ColorBox = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: #ff8b37;
  border-radius: 0.313rem;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const EndDateText = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Contents = styled.textarea`
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  padding: 15px;
  height: 30vh;
  background: #f7f7f7;
  resize: none;
  ::placeholder {
    font-size: 1rem;
    margin-top: 0.625rem;
    margin-left: 0.625rem;
    opacity: 1; /* 파이어폭스에서 뿌옇게 나오는 현상을 방지하기 위한 css */
  }
`;

const CreateButton = styled.button`
  width: 100%;
  height: 60px;
  cursor: pointer;
  background-color: #ff8b37;
  border: none;
  border-radius: 5px;
  color: #fff;
`;

const CreateText = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.1813rem;
  color: white;
`;

export default PostWrite;
