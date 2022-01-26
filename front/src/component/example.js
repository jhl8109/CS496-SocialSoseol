import React, { Component } from "react";
import VerticalCarousel from "./About";
import { config } from "react-spring";
import { fontSize } from "@mui/system";

let slides = [
  {
    key: 1,
    content: "Social Soseol(소셜 소설)",
    color: "#f6bed6"
  },
  {
    key: 2,
    content: "사회에 소설을 더하다.",
    color: "#ffa931"
  },
  {
    key: 3,
    content: "내 입맛데로 글을 생성하자.",
    color: "#dfd3c3"
  },
  {
    key: 4,
    content: "내 입맛데로 글을 읽어보자",
    color: "#fbd46d"
  },
  {
    key: 5,
    content: "소셜 소설에서 여러분만의 이야기를 만드세요!",
    color: "#c4fb6d"
  }
];

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  };

  render() {
    return (
      <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          margin: "0 auto"
        }}
      >
        <VerticalCarousel
          slides={slides}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
      </div>
    );
  }
}
