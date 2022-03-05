// textarea 우측 마진 안 맞는 부분 수정

import React from "react";

import { Grid, Text, Input, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import Modal from "../components/Modal";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

const Confirm = (props) => {
  const challengeId = props.match.params.id;
  // console.log(challengeId);

  const childRef = React.useRef();
  const fileInput = React.useRef();
  const dispatch = useDispatch();
  // const preview = useSelector((state) => state.image.preview);
  const [preview, setPreview] = React.useState(
    "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-file-upload-icon-image_1344393.jpg"
  );

  // 이미지 미리보기 세팅하기 위함
  const handlePreview = (e) => {
    const file = e.target.files[0];
    const newUrl = URL.createObjectURL(file);
    setPreview(newUrl);
  };
  // 파일업로드버튼+이미지 합치기 위한 작업
  // 기본이미지 클릭 시 파일업로드 버튼 클릭되도록!!
  const onClickUpload = () => {
    let myInput = document.getElementById("thumnail");
    myInput.click();
  };

  // 코멘트 값 받아오기
  const [comment, setComment] = React.useState(null);
  const onChange = (e) => {
    setComment(e.target.value);
  };

  const confirm = () => {
    // challengeId, imgUrl, challengeTitle, comment;
    // 타이틀 props로 가져온거 넣어주기
    const imageForm = new FormData();
    // console.log("newFormData 확인", imageForm);
    // console.log("fileInput ref확인", fileInput);
    let image = fileInput.current.files[0];
    imageForm.append("image", image);
    console.log("최종imageForm확인", imageForm);

    dispatch(
      challengeActions.confirmDB(challengeId, imageForm, "타이틀", comment)
    );
  };

  React.useEffect(() => {
    dispatch(challengeActions.getConfirmDB(challengeId));
  }, []);

  return (
    <React.Fragment>
      <Grid padding="16px" position="relative">
        <ConfirmText>인증하기</ConfirmText>
        {/* useSelector 해서 타이틀 가져오기 */}
        <Title>뷰 페이지 다 만들기</Title>
        <SubTitle>
          오늘의 도전을 성공하신 oo님! 인증사진을 올리고 포인트?
        </SubTitle>

        <ImageBox
          onClick={onClickUpload}
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          <input
            accept=".png , .jpg , .png, .jpeg"
            type="file"
            onChange={handlePreview}
            ref={fileInput}
            id="thumnail"
          ></input>
        </ImageBox>

        <Example>
          챌린지 인증 예시가 궁금하다면?
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              childRef.current.openModal();
            }}
          >
            [아이콘]
          </span>
        </Example>

        <CommentTitle>코멘트</CommentTitle>
        <div>예쁘게 어쩌구~~예쁘게 어쩌구~~</div>
        <Textarea rows="8" onChange={onChange}></Textarea>
      </Grid>

      <Grid>
        {/* 인증완료하기 버튼 클릭 시 어떤 페이지로 넘어갈 지 정해야 함 */}
        <Button
          // onClick={() => {
          //   dispatch(postActions.uploadImageDB());
          // }}
          onClick={confirm}
        >
          인증완료하기
        </Button>
      </Grid>

      <Modal ref={childRef}>
        <Grid padding="30px 30px 0px 30px">
          <div>챌린지 인증예시</div>
          <div>
            호스트가 챌린지 개설 시 작성한 인증방법 호스트가 챌린지 개설 시
            작성한 인증방법 호스트가 챌린지 개설 시 작성한 인증방법 호스트가
            챌린지 개설 시 작성한 인증방법 호스트가 챌린지 개설 시 작성한
            인증방법 호스트가 챌린지 개설 시 작성한 인증방법
          </div>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};

// 인증하기 텍스트
const ConfirmText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
`;

// 타이틀
const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
`;
const SubTitle = styled.div`
  margin-bottom: 10px;
`;

// 이미지
const ImageBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 300px;
  // background-size: 100% 100%;
  background-size: cover;
  cursor: pointer;

  input {
    display: none;
    width: 100%;
    height: 100%;
  }
`;

// 챌린지 예시 도움말
const Example = styled.div`
  text-align: right;
`;

// 코멘트 작성란
const CommentTitle = styled.div`
  margin-top: 20px;
`;
const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  margin-bottom: 100px;
`;
const Button = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 420px;
  height: 80px;
  border: none;
  color: white;
  background: orange;
`;

export default Confirm;
