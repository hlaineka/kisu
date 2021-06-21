const catsRouter = require('express').Router()
const Cat = require('../models/cat')

catsRouter.get('/', (request, response) => {
  Cat.find({}).then(cats => {
    response.json(cats)
  })
})

catsRouter.get('/:id', (request, response, next) => {
  Cat.findById(request.params.id)
    .then(cat => {
      if (cat) {
        response.json(cat.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

catsRouter.post('/', (request, response, next) => {
  const body = request.body

  const cat = new Cat({
    //add
  })

  cat.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

catsRouter.delete('/:id', (request, response, next) => {
  Cat.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

catsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const cat = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0
  }

  Cat.findByIdAndUpdate(request.params.id, cat, { new: true })
    .then(updatedCat => {
      response.json(updatedCat.toJSON())
    })
    .catch(error => next(error))
})

module.exports = catsRouter
