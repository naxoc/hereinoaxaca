import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';


class Teaser extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };

  render() {
    return (
      <li>
        <h1 className="h2">
          <Link to={this.props.url}>{this.props.title}</Link>
        </h1>
        <p>
          <Link to={`category/${this.props.category}`}>{this.props.category}</Link>
        </p>
        <p>{this.props.summary}</p>
      </li>
    );
  }
}

export default Teaser

