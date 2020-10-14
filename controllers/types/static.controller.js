const debug = require('debug')('sonniesedge:controller:static')

// 🏃‍♀️💨 Express
const express = require('express')
const router = express.Router()

// 💅 Models
const models = require('../../models')
const model = require('../../models/types/static.model')

// 🖕 Middleware
const {controllerFileHelper, controllerContentHelper} = require('../base')

debug('Controller activated')

// 🔓 Public routes 

router.get(`/`, [], controllerContentHelper.readGet(model, {
  id: 'root',
  index: true, 
  children: models.recent,
  template: 'index'
}))
router.get(`/:id`, [], controllerContentHelper.readGet(model))
router.get(`/:id/:file`, [], controllerFileHelper.read(model))
router.get(`/:id/:file/:size`, [], controllerFileHelper.read(model))

module.exports = router;
