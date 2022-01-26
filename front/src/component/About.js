import React from "react";
import Slide from "./Slide";
import PropTypes from "prop-types";

import Styles from "./About.module.css";

function mod(a, b) {
  return ((a % b) + b) % b;
}

class VerticalCarousel extends React.Component {
  state = {
    index: 0,
    goToSlide: null,
    prevPropsGoToSlide: 0,
    newSlide: false
  };

  componentDidMount = () => {
    document.addEventListener("keydown", event => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      if (event.keyCode === 38) {
        this.moveSlide(-1);
      }
      if (event.keyCode === 40) {
        this.moveSlide(1);
      }
    });
  };

  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object
      })
    ).isRequired,
    goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
    animationConfig: PropTypes.object
  };

  static defaultProps = {
    offsetRadius: 2,
    animationConfig: { tension: 120, friction: 14 }
  };

  modBySlidesLength = index => {
    return mod(index, this.props.slides.length);
  };

  moveSlide = direction => {
    var target = this.state.index + direction;

    if (target >= 0 && target < this.props.slides.length) {
      this.setState({
        index: this.modBySlidesLength(target),
        goToSlide: null
      });
    }
  };

  clampOffsetRadius(offsetRadius) {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides() {
    const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    var startIndex = 0;

    if (index < offsetRadius) {
      startIndex = offsetRadius - index;
    }

    for (
      let i = Math.max(index - offsetRadius, 0);
      i < Math.min(index + offsetRadius, slides.length);
      i++
    ) {
      presentableSlides.push({
        ...slides[this.modBySlidesLength(i)],
        presentableIndex: startIndex++,
        absoluteIndex: index
      });
    }

    return presentableSlides;
  }

  render() {
    const { animationConfig, offsetRadius, showNavigation } = this.props;

    let navigationButtons = null;
    if (showNavigation) {
      navigationButtons = (
        <div className={Styles.navigation_buttons}>
          <div className={Styles.nav_button} onClick={() => this.moveSlide(-1)}>
            &#8593;
          </div>
          <div className={Styles.nav_button} onClick={() => this.moveSlide(1)}>
            &#8595;
          </div>
          <div className={Styles.progress_indicator}>
            Page {this.state.index + 1}
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className={Styles.wrapper}>
          {this.getPresentableSlides().map(slide => (
            <Slide
              key={slide.key}
              content={slide.content}
              color={slide.color}
              moveSlide={this.moveSlide}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={slide.presentableIndex}
              animationConfig={animationConfig}
              absoluteIndex={slide.absoluteIndex}
              totalSlides={this.props.slides.length}
            />
          ))}
        </div>
        {navigationButtons}
      </React.Fragment>
    );
  }
}

export default VerticalCarousel;
