const peopleRouter = require('express').Router()
const Person = require('../models/Person')

peopleRouter.get('/', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

PersonsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

peopleRouter.post('/', (request, response, next) => {
  const body = request.body

  const person = new Person({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0
  })

  person.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

peopleRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

peopleRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

module.exports = peopleRouter
