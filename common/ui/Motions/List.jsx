import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from './action';
import {Link} from 'react-router';
import styles from './styles.css';

const mapStateToProps = ({marvel}) => ({marvel});

export class MotionsList extends Component {
  componentDidMount() {
    this.props.fetchEvents();

    this.controller = new ScrollMagic.Controller({
      container: this.wrapper.parentElement,
      globalSceneOptions: {triggerHook: 0},
    });

    this.scenes = Array.from(this.wrapper.querySelectorAll('section')).map(s => {
      return new ScrollMagic.Scene({triggerElement: s, duration: 504})
        .setPin(s, {pushFollowers: false})
        .addTo(this.controller)
        .addIndicators();
    });
  }

  componentWillUnmount() {
    this.scenes.forEach(scene => scene.removeIndicators().destroy(true));
  }

  render() {
    return <content ref={node => this.wrapper = node}>
      <header>
        <h3>{this.props.marvel.events.attributionText}</h3>
      </header>
      {this.renderEventsList(this.props.marvel.events)}
    </content>;
  }

  renderEventsList(events) {
    return events.data && events.data.results.map(event => <section
      key={event.id}
    >
      <img
        className={styles.thumbnail}
        src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
      />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <Link to={{
        pathname: `/motions/wipe-motion`, state: {enter: 'Right', leave: 'Left'}
      }}>See Characters</Link>
    </section>);
  }
}

export default connect(mapStateToProps, {fetchEvents})(MotionsList);
