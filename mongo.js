const mongoose = require('mongoose')
if(process.argv.length < 5){
  console.log("uncompelete data, you should give password, name & phoneNumber as arguments")
  process.exit(1)
} 
const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]
const url = ``
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = new mongoose.model('Person', personSchema)
const person = new Person({
  name: personName,
  number: personNumber
})
person.save().then(result => {
  console.log(`added ${personName} ${personNumber} to phonebook`)
  mongoose.connection.close()
})