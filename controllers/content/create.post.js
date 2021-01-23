const debug = require('debug')('indieweb-express-site:controllers:content:createPost')
const asyncHandler = require('express-async-handler')
const { validationResult, matchedData } = require('express-validator')
const is = require('is_js')
const path = require('path')
const { DateTime } = require('luxon')

const normalizeFormState = require('../../utilities/form-normalize-state')
const normalizeFormErrors = require('../../utilities/form-normalize-errors')

const md = require('../../utilities/markdown-it')
const config = require('../../config')
const shared = require('./shared')
const syndication = require('../syndication')

const createPost = (model, options = {}) => {
  return asyncHandler(async (req, res, next) => {

    let formState = {}
    let formErrors = {}
    let renderMessages = []
    let tempCurrentDate = DateTime.local().toUTC()

    try {

      // These will go back to the form if there are errors
      formState = normalizeFormState(req)
      formErrors = normalizeFormErrors(req)

      debug('formstate: ', formState)
      debug('formErrors: ', formErrors)
      debug('renderMessages: ', renderMessages)

      if (is.not.empty(formErrors)) {
        debug(formErrors)
        res.render(options.template || `content-create/types/${model.id}`, {
          data: { title: `${model.modelDir} creation error` },
          content: md.render('There was an error while creating the item.'),
          state: formState,
          errors: formErrors
        })
      } else {

        let data = matchedData(req)
        debug('matchedData: ', data)

        let content = matchedData(req).content ? matchedData(req).content : ' '
        delete data.content

        let metaDataResult = shared.metadata(data)
        data = metaDataResult.data
        renderMessages.push(...metaDataResult.messages)

        debug('Data to create with: ', data)

        let id = DateTime.local().toUTC().toFormat(config.fileDateFormat())

        await model.create(data, content, id).catch((error) => {
          throw error
        })

        // Get list of all files to save
        if (req.files) shared.fileUploads(model, id, req.files, renderMessages, options = {})

        debug(`/${model.modelDir}/${id} created!`)
        renderMessages.push(`/${model.modelDir}/${id} created!`)

        // Syndicate if requested
        if (req.body.syndicate_to) {
          for (const syndication in req.body.syndicate_to) {
            if (Object.hasOwnProperty.call(req.body.syndicate_to, syndication)) {
              await shared.syndicationAuto(model, id, syndication, renderMessages, {})
            }
          }
        }

        // Store any manually added syndications
        if (req.body.manual_syndication) shared.syndicationManual(model, id, req.body.manual_syndication, renderMessages)

        // Read to set up cache
        await model.read(id).catch((error) => {
          throw error
        })

        res.render(options.template || `content-create/default`, {
          data: { title: `/${model.modelDir}/${id} created` },
          content: `/${model.modelDir}/${id} was successfully created!`,
          messages: renderMessages,
          url: `/${model.modelDir}/${id}`
          // state: form_state,
        })
      }
    } catch (error) {
      // TODO: Ideally any rendering should be handled by the router
      debug('ERROR!:', error)
      res.render(options.template || `content-create/default`, {
        data: { title: `Create failed` },
        content: `Create encountered errors.`,
        messages: renderMessages,
        rawError: error
      })
    }

  })
}

module.exports = createPost
