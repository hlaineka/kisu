//erotettu omakseen mahdollista liiteiden ja laskujen käsittelyä varten

const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const vetSchema = new mongoose.Schema({
  kissa: ObjectId,
  aika: Date,
  kuvaus: String,
  liitteet: [{type: Buffer}],
  rokotus: Boolean,
  rokote: String,
  sterilisaatio: Boolean,
  sirutus: Boolean,
  siru: ObjectId,
  fivFelvOtettu: Boolean,
  fivFelv: Boolean
})

vetSchema.plugin(uniqueValidator)

vetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Vet', vetSchema)
