
const appRootPackage = require('app-root-path');
const path = require('path')

const appRoot = () => appRootPackage.path
const dataRoot = () => process.env['DATAROOT']
const contentRoot = () => process.env['CONTENTROOT'] || path.join(appRoot, 'content')
const siteTitle = () => 'sonniesedge'
const siteDescription = () => 'Charlie Owen and her owned content'
const sitePort = () => process.env['SITEPORT'] || '3000'
const sitePortExternal = () => process.env['SITEPORTEXTERNAL'] || '80'
const siteProtocol = () => `${process.env['SITEPROTOCOL'] || 'http'}://`
const siteDomain = () => `${process.env['SITEDOMAIN'] || '127.0.0.1'}`
const siteUrl = () => `${siteProtocol()}${siteDomain()}`
const fileDateFormat = () => `yyyyLLdd't'HHmm`


module.exports = {
  appRoot, dataRoot, contentRoot, 
  siteTitle, siteDescription, sitePort, sitePortExternal, 
  siteProtocol, siteDomain, siteUrl, fileDateFormat
}
