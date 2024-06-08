import React from 'react';
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import {styled} from "goober";

const Home = () => {
  return (
    <Container>
      <Header/>
      <Content/>
      <Footer/>
    </Container>

  );
};

export default Home;

const Container = styled("div")``