import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Icon = ({ toggled, toggledClassName, untoggledClassName, onMouseEnter, onClickRating }) => {
  const iStyle = {
    cursor: 'pointer',
  };

  const className = toggled ? toggledClassName : untoggledClassName;

  return (
    <a
      href="rating" onClick={e => {
        e.preventDefault();
        onClickRating();
      }}
      onMouseMove={onMouseEnter}>
      <i
        className={className}
        style={iStyle} />
    </a>
  );
};

Icon.propTypes = {
  toggled: PropTypes.bool,
  toggledClassName: PropTypes.string,
  untoggledClassName: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onClickRating: PropTypes.func,
};

Icon.defaultProps = {
  toggled: false,
  toggledClassName: null,
  untoggledClassName: null,
  onMouseEnter: null,
  onClickRating: null,
};

class IconRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRating: props.currentRating,
      max: props.max,
      currentRatingHover: 0,
      hovering: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClickRating = this.onClickRating.bind(this);
  }

  onMouseEnter(e, currentRating) {
    let rating = currentRating;
    if ((e.nativeEvent.clientX) < (e.target.offsetLeft + (e.target.offsetWidth / 2))) {
      rating -= 0.5;
    }

    this.setState({
      currentRatingHover: rating,
      hovering: true,
    });
  }

  onMouseLeave() {
    this.setState({
      hovering: false,
    });
  }

  onClickRating() {
    const { currentRating, currentRatingHover } = this.state;
    const newRating = (currentRatingHover === currentRating) ? 0 : currentRatingHover;
    this.setState({
      currentRating: newRating,
    });

    if (this.props.onChange) {
      this.props.onChange(newRating);
    }
  }

  render() {
    const { viewOnly, halfClassName, toggledClassName, untoggledClassName, className } = this.props;
    const ratings = [];
    let toggled = false;
    let rating = 0;
    let usedHalfClassName = null;
    const f = () => {};
    const onMouseEnter = viewOnly ? f : this.onMouseEnter;
    const onClickRating = viewOnly ? f : this.onClickRating;
    for (let i = 1; i <= this.state.max; ++i) {
      rating = this.state[`currentRating${(this.state.hovering ? 'Hover' : '')}`];
      toggled = i <= Math.round(rating);
      usedHalfClassName = null;
      if (halfClassName &&
        Math.round(rating) === i &&
        Math.floor(rating) !== rating) {
        usedHalfClassName = halfClassName;
      }
      ratings.push(
        <Icon
          key={i}
          toggledClassName={usedHalfClassName || toggledClassName}
          untoggledClassName={untoggledClassName}
          onMouseEnter={e => onMouseEnter(e, i)}
          onClickRating={e => onClickRating(e, i)}
          toggled={toggled} />
      );
    }
    return (
      <div className={className} onMouseLeave={this.onMouseLeave}>
        {ratings}
      </div>
    );
  }
}

IconRating.propTypes = {
  currentRating: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  viewOnly: PropTypes.bool,
  halfClassName: PropTypes.string,
  toggledClassName: PropTypes.string,
  untoggledClassName: PropTypes.string,
  className: PropTypes.string,
};

IconRating.defaultProps = {
  currentRating: 0,
  max: 5,
  onChange: () => {},
  viewOnly: false,
  halfClassName: null,
  toggledClassName: null,
  untoggledClassName: null,
  className: null,
};

export default IconRating;
