const express = require('express')
const app = express()
const router = express.Router()

// Application-level middleware that logs all incoming requests
app.use((req, res, next) => {
  console.log('Request received at:', new Date())
  next(); // Passes control to the next middleware
})

// Router-level middleware to log requests to '/menu' routes
router.use((req, res, next) => {
  console.log('Request made to /menu route')
  next() // Pass control to the next handler
})

// Define routes
router.get('/drinks', (req, res) => {
  res.send('Welcome to the drinks menu!')
})

app.use('/menu', router) // Apply the router

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack
  res.status(500).send('Something went wrong!')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})