const { ObjectId } = require('bson')
const { hkdf } = require('crypto')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const personSchema = new mongoose.Schema({
  nimi: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [isEmail, 'tarkista sähköpostiosoite']
  },
  puhelinnumero: String,
  osoite: {
    katu: {
      type: String
    },
    postinumero: {
      type: Number,
      minlength: 5,
      maxlength: 5
    },
    kunta: {
      type: String
    }
  },
  ensikotivastaava: {
    type: ObjectId,
    require: true
  },
  kissat: [{type: ObjectId}],
  aloittanut: Date,
  aktiivinen: Boolean,
  lukenutOhjeet: Boolean,
  varoitukset: Number,
  updated: Date,
  tilaa: Boolean,
  millaisiaKissoja: String,
  siruttaja: String,
  omatKissat: Number,
  muutaKodista: String,
  kuljetusmahdollisuus: Boolean,
  eristys: Boolean,
  puolivillit: Boolean,
  pentueet: Boolean,
  onkoEkSopimus: Boolean,
  ekSopimus: Buffer,
  facebook: Boolean,
  ensikotisPosti: Boolean,
  tuettu: String,
  rooli: {
    type: String,
    enum: ["hallitus", "web-tiimi", "sirutusvastaava", "rahastonhoitaja", "sisäänottaja", "ensikotivastaava", "ensikoti"]
  },
  ensikodit: [{ObjectId}]
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', blogSchema)
