import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import ArticleList from "../components/article-list"

export default ({ data }) => (
  <Layout>
    <ArticleList data={data} />
  </Layout>
)


export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            icon
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`