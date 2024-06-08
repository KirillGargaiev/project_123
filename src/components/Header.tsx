import React from 'react';
import {styled} from "goober";
import DigitalClock from "./Timer";
import { Link as LinkBase } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <DigitalClock/>

      <HeaderInfo>
        <Title>My website about animals</Title>
        <Image src={"/images/animals.png"} alt="Animals" />
      </HeaderInfo>

      <Link to="signUp"><RegistrationButton>Sign Up</RegistrationButton></Link>
    </Container>
  );
};

export default Header;

const Container = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 24px;
`
const Image = styled("img")`
    width: 700px;
    height: auto;
`;
const HeaderInfo = styled("div")`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled("h2")`
    position: absolute;
    top: 50px;
    margin: 0 auto;
`;

const RegistrationButton = styled("button")`
    appearance: none;
    background-color: #000000;
    border: 2px solid #1A1A1A;
    border-radius: 15px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    min-height: 60px;
    min-width: 0;
    outline: none;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    width: 100px;
    height: 40px;
    will-change: transform;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
        transform: translateY(-2px);
    }
    &:active {
        box-shadow: none;
        transform: translateY(0);
    }
`;

const Link = styled(LinkBase as any)`
    width: fit-content;
    height: fit-content;
`