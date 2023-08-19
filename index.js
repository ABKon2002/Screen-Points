const ReviewsDAO = require('./dao/reviewsDAO.js')
const app = require('./server.js')
const mongodb = require('mongodb')
const dotenv = require('dotenv').config()
const MongoClient = mongodb.MongoClient
const mongo_username = process.env.Mongo_Username
const mongo_password = process.env.Mongo_Password
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.hwmze41.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })

