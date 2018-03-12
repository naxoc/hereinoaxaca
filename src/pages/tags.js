import React from "react";
import PropTypes from "prop-types";

// Utilities
import kebabCase from "lodash/kebabcase";

// Components
import Helmet from "react-helmet";
import Link from "gatsby-link";

class TagsPage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        group: PropTypes.arrayOf(
          PropTypes.shape({
            fieldValue: PropTypes.string.isRequired,
            totalCount: PropTypes.number.isRequired,
          }).isRequired
        ),
      }),
      site: PropTypes.shape({
        siteMetadata: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }),
      }),
    }),
  };

  render() {
    // Filter out nulls. I have no idea how to do that with graphQL.
    const group = this.props.data.allMarkdownRemark.group.filter(val => val.fieldValue !== 'null');
    const title = this.props.data.site.siteMetadata.title;
    return (
      <div>
        <Helmet title={title} />
        <div>
          <h1>Tags</h1>
          <ul>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TagsPage;

export const pageQuery = graphql`
  query TagsPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
