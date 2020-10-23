const debug = require('debug')('sonniesedge:model')

let note = require('./types/note.model')
let bookmark = require('./types/bookmark.model')
let static = require('./types/static.model')
let checkin = require('./types/checkin.model')
let like = require('./types/like.model')
let reply = require('./types/reply.model')
let quote = require('./types/quote.model')
let bandname = require('./types/bandname.model')
let repost = require('./types/repost.model')
let photo = require('./types/photo.model')
let post = require('./types/post.model')

const {orderBy} = require('natural-orderby');

const modelsArray = [
  note, 
  bookmark, 
  static,
  checkin,
  like,
  reply,
  quote,
  bandname,
  repost,
  photo,
  post
]

const list = {...modelsArray}


const warmAll = async () => {
  for (let index = 0; index < modelsArray.length; index++) {
    if(modelsArray[index].warm) {
      await modelsArray[index].warm()
    }
  }
}

const recent = async () => {
  try {
    debug('called recent')
    let recentItems = []

    for (let index = 0; index < modelsArray.length; index++) {
      if(modelsArray[index].recentIndex) {
        for (let [key, value] of Object.entries(await modelsArray[index].recentIndex())) {
          recentItems.push(value)
        }      
      }
    }
  
    let recentItemsSorted = orderBy(
      recentItems, 
      [v => v.data.created],
      ['desc']
      )

    return recentItemsSorted
  } catch (error) {
    debug(error)
    throw error
  }
}

const globalRecentIndex = async (limit=20) => {
  try {
    let results = await recent()
    return results.slice(0, limit)
  } catch (error) {
    debug(error)
    throw error
  }
}

const globalRecentFeed = async (limit=20) => {
  try {
    let results = await recent()
    return results.slice(0, limit)
  } catch (error) {
    debug(error)
    throw error
  }
}

module.exports = { list, warmAll, globalRecentIndex, globalRecentFeed}
