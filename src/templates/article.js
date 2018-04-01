import React from "react";
import Menu from '../components/Menu';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div className="col col-8" dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="col col-4">
        <Menu />
      </div>
    </div>
  );
};

export const query = graphql`
  query ArticleQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

