const debug = require('debug')('indieweb-express-site:controllers:feed:feedSettings')
const config = require('../../config')

const settings = () => {
  return {
    title: config.siteTitle(),
    description: config.siteDescription(),
    id: config.siteUrl(),
    link: config.siteUrl(),
    language: 'en', 
    image: `${config.siteUrl()}/whatever.jpg`,
    favicon: `${config.siteUrl()}/favicon.ico`,
    copyright: "All rights reserved 2020, Charlie Owen, etc, etc",
    author: {
      name: "Charlie Owen",
      email: "hello@whalecoiner.com",
      link: `${config.siteUrl()}/about`
    }
  }
}

module.exports = settings
