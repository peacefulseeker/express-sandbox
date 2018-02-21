const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000;

const router = express.Router()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


router.use((req, res, next) => {
  console.log("/" + req.method);
  next();
});

// This middle-ware will get the id param
// check if its 0 else go to next router.
router.use("/user/:id", (req, res, next) => {
  if (req.params.id == 0) {
    res.json({ "message": "You must pass ID other than 0" });
  }
  else next();
});

router.get("/user/:id", (req, res) => {
  res.json({ "message": "Hello " + req.params.id });
});


router.get('/', (req, res) => {
  res.send({ message: 'Hey!' })
})

router.get('/users/:userId/articles/:articleId', (req, res) => {
  res.send(req.params)
})

router.get('/users/:name', (req, res) => {
  res.send(`Welcome, ${req.params.name}!`)
})

router.post('/contact', (req, res) => {
  // res.send('This is the contact page with a POST request')
  res.send({ status: res.statusCode, params: req.params, query: req.query, body: req.body });
})

app.use('/', router)

// Handle 404 error.
// The last middleware.
app.use("*", (req, res) => {
  res.status(404).send('404');
});

/* CURL POST REQUESTS */
//curl -d "name=Alex" -X POST http://localhost:3000/contact
//curl -d '{"name":"alex"}' -H "Content-Type: application/json" -X POST http://localhost:3000/contact

// curl -XPOST -H "Content-Type: application/json" http://localhost:3000/contact -d '{"zip":"10115"}'




app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})



