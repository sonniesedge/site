const debug = require('debug')('indieweb-express-site:controller:offline')
const asyncHandler = require('express-async-handler')
const md = require('../../utilities/markdown-it')

// 🏃‍♀️💨 Express
const express = require('express')
const router = express.Router()
const models = require('../../models')

// 🔓 Public routes 
router.get(`/offline`, asyncHandler(async (req, res, next) => {
  try {
    res.render('default', {
      data: { title: 'Du bist Offline' },
      content: md.render("Looks like you're offline."),
    })
  } catch (error) {
    debug(error)
  }
}))

module.exports = router
