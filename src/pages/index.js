import React from 'react'
import PropTypes from "prop-types";
import get from "lodash/get";

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
              }),
              fields: PropTypes.shape({
                slug: PropTypes.string.isRequired,
              }),
            }),
          }).isRequired
        ),
      }),
    }),
  };

  render() {
    const markdown = get(this, 'props.data.allMarkdownRemark');
    return (
      <div>
        <h1>Here in Oaxaca</h1>
        {markdown.edges.map(({ node }, idx) => (
          <div key={idx}>
            <p><a href={node.fields.slug}>{node.frontmatter.title}</a></p>
          </div>
        ))}
      </div>
    );
  }
}

export default IndexPage

export const allQuery = graphql`
query allQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;