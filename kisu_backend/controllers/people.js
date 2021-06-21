const peopleRouter = require('express').Router()
const Person = require('../models/person.js')

peopleRouter.get('/', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

peopleRouter.get('/:id', (request, response, next) => {
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
    nimi: body.nimi,
    email: body.email,
    puhelinnumero: body.puhelinnumero,
    osoite: {
      katu: body.katu,
      postinumero: body.postinumero,
      kunta: body.kunta
    },
    ensikotivastaava: body.ensikotivastaava,
    kissat: body.kissat,
    aloittanut: body.aloittanut,
    aktiivinen: body.aktiivinen || true,
    lukenutOhjeet: body.lukenutOhjeet || false,
    varoitukset: body.varoitukset | 0,
    updated: new Date(),
    tilaa: body.tilaa || false,
    millaisiaKissoja: body.millaisiaKissoja,
    siruttaja: body.siruttaja,
    omatKissat: body.omatKissat || 0,
    muutaKodista: body.muutaKodista,
    kuljetusmahdollisuus: body.kuljetusmahdollisuus || false,
    eristys: body.eristys || false,
    puolivillit: body.puolivillit || false,
    pentueet: body.pentueet || false,
    onkoEkSopimus: body.onkoEkSopimus || false,
    ekSopimus: body.ekSopimus,
    facebook: body.facebook || false,
    ensikotisPosti: body.ensikotisPosti || false,
    rooli: body.rooli || 'ensikoti',
    ensikodit: body.ensikodit
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
