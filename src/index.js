import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Swipe from 'swipe-js-iso';

class ReactSwipe extends Component {
  static propTypes = {
    swipeOptions: PropTypes.shape({
      startSlide: PropTypes.number,
      speed: PropTypes.number,
      auto: PropTypes.number,
      continuous: PropTypes.bool,
      continuous_end: PropTypes.bool,
      no_back: PropTypes.bool,
      disableScroll: PropTypes.bool,
      stopPropagation: PropTypes.bool,
      swiping: PropTypes.func,
      callback: PropTypes.func,
      transitionEnd: PropTypes.func
    }),
    style: PropTypes.shape({
      container: PropTypes.object,
      wrapper: PropTypes.object,
      child: PropTypes.object
    }),
    forwardedRef: PropTypes.object,
    id: PropTypes.string,
    className: PropTypes.string,
    childCount: PropTypes.number
  };

  static defaultProps = {
    swipeOptions: {},
    style: {
      container: {
        overflow: 'hidden',
        visibility: 'hidden',
        position: 'relative'
      },
      wrapper: {
        overflow: 'hidden',
        position: 'relative'
      },
      child: {
        float: 'left',
        width: '100%',
        position: 'relative',
        transitionProperty: 'transform'
      }
    },
    className: '',
    childCount: 0
  };

  componentDidMount() {
    if (this.props.forwardedRef.current) {
      this.swipe = Swipe(
        this.props.forwardedRef.current,
        this.props.swipeOptions
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { childCount } = this.props;

    if (
      prevProps.childCount !== childCount ||
      !(this.swipe && this.props.forwardedRef.current)
    ) {
      this.swipe.kill();
      this.swipe = Swipe(
        this.props.forwardedRef.current,
        this.props.swipeOptions
      );
    }
  }

  componentWillUnmount() {
    this.swipe.kill();
    this.swipe = void 0;
  }

  next() {
    this.swipe.next();
  }

  prev() {
    this.swipe.prev();
  }

  slide(...args) {
    this.swipe.slide(...args);
  }

  getPos() {
    return this.swipe.getPos();
  }

  getNumSlides() {
    return this.swipe.getNumSlides();
  }

  render() {
    const { id, className, style, children } = this.props;

    console.log('this.props.forwardedRef', this.props.forwardedRef);
    return (
      <div
        id={id}
        ref={this.props.forwardedRef}
        className={`react-swipe-container ${className}`}
        style={style.container}
      >
        <div style={style.wrapper}>
          {React.Children.map(children, child => {
            if (!child) {
              return null;
            }

            const childStyle = child.props.style
              ? { ...style.child, ...child.props.style }
              : style.child;

            return React.cloneElement(child, { style: childStyle });
          })}
        </div>
      </div>
    );
  }
}

export default ReactSwipe;
