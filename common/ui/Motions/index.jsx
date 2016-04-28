import React, {Component} from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import styles from './styles.css';

export default class Motions extends Component {
  render() {
    /**
     * NOTE: the OR condition is only for SSR bootup process, because on
     * server-side there's only a basic location object can be use which
     * doesn't maintain inner state object.
     */
    const {enter, leave} = this.props.location.state || {
      enter: 'Right', leave: 'Left'
    };

    return <VelocityTransitionGroup
      runOnMount
      component="section"
      className={`${styles.motions} ${styles.scrollingWrapper}`}
      enter={{animation: `transition.slide${enter}BigIn`, duration: 300, complete(el) {
        // set el's parent as a fixed height scrolling container
        const container = el[0].offsetParent;
        container.style.height = `${window.innerHeight - container.offsetTop}px`;
      }}}
      leave={{animation: `transition.slide${leave}BigOut`, duration: 300}}
    >
      {React.cloneElement(this.props.children, {key: this.props.location.key})}
    </VelocityTransitionGroup>;
  }
}
