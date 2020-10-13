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

const models = [
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

const warmAll = async () => {
  for (let index = 0; index < models.length; index++) {
    if(models[index].warm) {
      await models[index].warm()
    }
  }
}

const recent = async (limit=20) => {
  try {
    let recentItems = []

    for (let index = 0; index < models.length; index++) {
      if(models[index].recent) {
        for (let [key, value] of Object.entries(await models[index].recent())) {
          recentItems.push(value)
        }      
      }
    }
  
    let sorted = orderBy(
      recentItems, 
      [v => v.data.created],
      ['desc']
      )
  
    return sorted.slice(0, limit)
  } catch (error) {
    throw error
  }

}

module.exports = {models, warmAll, recent}
