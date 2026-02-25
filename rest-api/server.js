// Importaciones
const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const path = require('path');

// Variables
let store = {}
store.accounts = []
let accounts = store.accounts;

// Middleware
let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

// ENDPOINTS

// GET de todos
app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})


// GET DE UNO ESPECÍFICO
app.get('/accounts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const account = accounts.find(acc => acc.id === id);
    if (!account) {
        return res.status(404).json({ message: 'Cuenta no encontrada' });
    }

    res.json(account);
});

// POST
app.post('/accounts', (req, res) => {
    let newAccount = req.body
    let id = store.accounts.length
    store.accounts.push(newAccount)
    res.status(201).send({ id: id })
})

// PUT
app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
})

// DELETE
app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1)
    res.status(204).send()
})

// Servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});