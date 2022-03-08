import React from "react";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { Grid, Text, Input, Image } from "../elements";

import styled from "styled-components";

const MyFeed = (props) => {
  const dispatch = useDispatch();
  const proofShotId = props.match.params.id;
  // console.log(proofShotId);
  const feed = useSelector((state) => state.challenge.feed);

  React.useEffect(() => {
    dispatch(challengeActions.myfeedDB(proofShotId));
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Back
          onClick={() => {
            history.goBack();
          }}
        >
          뒤로
        </Back>

        <div style={{ display: "flex" }}>
          <Img src={feed?.imgUrl} alt="인증이미지" />
        </div>
        {feed && (
          <Comment>
            <div>{feed.challengeTitle}</div>
            <div>{feed.comment}</div>
            <div>{feed.createdAt.slice(0, 10)}</div>
          </Comment>
        )}
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  height: 100vh;
  background: black;
`;
const Back = styled.div`
  cursor: pointer;
  z-index: 10;
  padding: 10px;
  color: white;
  position: absolute;
`;
const Img = styled.img`
  width: 100%;
  height: auto;
  z-index: 0;
  display: block;
  margin: auto;
`;
const Comment = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;
  color: white;
`;

export default MyFeed;
