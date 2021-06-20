const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
  ensikoti: {
    type: String,
    require: true
  },
  nimi: String,
  id: {
    type: Number,
    minlength: 7,
    require: true
  },
  syntymaAika: {
    type: Date,
    require: true
  },
  turkki: {
    type: String,
    require: true
  },
  silmat: {
    type: String,
    require: true
  },
  sukupuoli: {
    type: String,
    enum: ["naaras", "uros"]
  },
  tausta: String,
  talteenottaja: String,
  talteenottopaikka: String,
  talteenottoaika: Date,
  kuntoTullessa: String,
  ell: [{type: ObjectId}],
  rokotukset: [{aika: Date, rokote: String}],
  tartuntatauti: String,
  loishaadot: [{aika: Date, valmiste: String}],
  terveys: String,
  siru: {
    aika: Date,
    sirunumero: Number,
    siruttaja: String,
  },
  luonne: String,
  muuta: String,
  ilmoitus: Boolean,
  ilmoitusViivastyy: String,
  ilmoitusteksti: String,
  kuvat: [{type: Buffer}],
  lopetus: Boolean,
  menetynyt: Boolean,
  kuolemanSyy: String,
  sterkka: Boolean,
  palannutKisulle: Boolean,
  uusiOmistaja: [{
    nykyinen: Boolean,
    nimi: String,
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
    email: {
      type: String,
      require: true,
      unique: true,
      validate: [isEmail, 'tarkista sähköpostiosoite']
    },
    puhelinnumero: String,
    luovutusmaksu: Number,
    luovutusSopimus: Buffer
  }]
})

catSchema.plugin(uniqueValidator)

catSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Cat', blogSchema)
