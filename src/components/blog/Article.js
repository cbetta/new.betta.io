import React, {useState, useEffect} from "react"
import { DiscussionEmbed } from 'disqus-react';

import Icon from "./Icon"

import { render } from '../../utils/rehype-render'
import { style } from "./Article.module.scss"

const onScroll = (setShadow) => {
  const element = document.querySelector('[data-sticky=true]')
  if (!element) { return }
  
  const initialOffset = element.offsetTop
  window.addEventListener('scroll', () => {
    setShadow(element.offsetTop !== initialOffset)
  })
}

const Article = ({ 
  id,
  frontmatter, 
  timeToRead, 
  htmlAst,
  fields
}) => {
  const [shadow, setShadow] = useState(false)
  useEffect(() => onScroll(setShadow), [])

  const disqusConfig = {
    url: `https://betta.io${fields.slug}`,
    identifier: id,
    title: frontmatter.title
  }

  console.dir(disqusConfig)
  
  return (
    <div className={ style }>
      <header data-shadow={shadow} data-sticky>
        <h1>
          <Icon type={ frontmatter.icon } />
          {frontmatter.title}
          <small>
            { timeToRead } minute read
          </small>
        </h1>
      </header>
      <div>{ render(htmlAst) }</div>
      <DiscussionEmbed 
        shortname='bettacoding' 
        config={disqusConfig}
      />
    </div>
  )
}

export default Article