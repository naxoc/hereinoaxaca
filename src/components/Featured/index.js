import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';


class Featured extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={`m1 featured-${this.props.id}`}>
        <div>
          <Link to={this.props.url}>
            <img className="fit" src={this.props.image} alt={this.props.text}/>
          </Link>
        </div>
        <Link to={this.props.url}>{this.props.text}</Link>
      </div>
    );
  }
}

export default Featured

