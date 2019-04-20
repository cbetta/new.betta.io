const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const parent = getNode(node.parent)

  if (node.internal.type === `MarkdownRemark` && parent.sourceInstanceName === 'blog') {
    let name = parent.name.replace(/\d\d\d\d-\d\d-\d\d-/, '')
    let date = new Date(node.frontmatter.date).toISOString().substr(0,10).replace(/-/g, "/")
    
    createNodeField({
      node,
      name: `slug`,
      value: `/blog/${date}/${name}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve) => {
    query(graphql).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/Article.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}

const query = (graphql) => graphql(`{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}`)