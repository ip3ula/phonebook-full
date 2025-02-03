const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
morgan.token('type' , (req) => JSON.stringify(req.body))
app.use(morgan(':method :status :url  :response-time ms :type'))
app.use(cors())
app.use(express.static('dist'))
// it is a middleWare that tells express to serve static files in dist folder as html, css & javascript
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
const generateId = () => {
const number =  Math.floor(Math.random() * 100)
const string = String(number)
return string;
}
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
  const time = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><br/>${time}`)
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  person
  ? response.json(person)
  : response.status(404).end()
  
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  if(!body.name){
    return response.status(400).json({error: 'name missing'})
  }else if (!body.number) {
    return response.status(400).json({error: 'number missing'})
  } else if(persons.find(person => person.name === body.name)){
    return response.status(404).json({
      error: `name must be unique`
    })
  } else {
    persons = persons.concat(person)
    response.json(person)
  }
})
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
  console.log(`app is runing at ${PORT}`)
})
