import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
  stars = 3.6;

  // function pointRound(x) {
  //   let pointNumb = x.toString()[2];
  //   pointNumb < 2.5 ? pointNumb = 0 : pointNumb < 5 ? pointNumb = 5 :
  // }

  // stars = Math.round10(stars, 1);
  let starsArray = [...Array(5).keys()];

  return (
    <Wrapper>
      <div className='stars'>
        {starsArray.map((star) => {
          return (
            <span>
              {stars >= star + 0.75 ? (
                <BsStarFill />
              ) : stars >= star + 0.5 ? (
                <BsStarHalf />
              ) : (
                <BsStar />
              )}
            </span>
          );
        })}
        {/* <span>{stars >= 1} ? <BsStarFill /> : {stars > 0 } ? <BsStarHalf /> : <BsStar /></span>
      <span>{stars >= 2} ? <BsStarFill /> : {stars > 0 } ? <BsStarHalf /> : <BsStar /></span>
      <span>{stars >= 1} ? <BsStarFill /> : {stars > 0 } ? <BsStarHalf /> : <BsStar /></span>
      <span>{stars >= 1} ? <BsStarFill /> : {stars > 0 } ? <BsStarHalf /> : <BsStar /></span>
      <span>{stars >= 1} ? <BsStarFill /> : {stars > 0 } ? <BsStarHalf /> : <BsStar /></span> */}
      </div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
