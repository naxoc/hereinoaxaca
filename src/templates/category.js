import React from "react";
import PropTypes from "prop-types";

// Components
import Link from "gatsby-link";

const Category = ({pathContext, data}) => {
  const {category} = pathContext;
  const {edges, totalCount} = data.allMarkdownRemark;
  const catsHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
    } about "${category}"`;

  return (
    <div>
      <h1>{catsHeader}</h1>
      <ul>
        {edges.map(({node}) => {
          const {title} = node.frontmatter;
          const {slug} = node.fields;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link to="/categories">All categories</Link>
    </div>
  );
};

Category.propTypes = {
  pathContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
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

export default Category;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___category], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;