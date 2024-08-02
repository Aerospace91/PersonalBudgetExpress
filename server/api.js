const express = require('express');
const apiRouter = express.Router();

const totalBudget = {money: 6000}
const envelopes = {
    grocery: {money: 1000},
    gas: {money: 1000},
    health: {money: 1000},
    clothing: {money: 1000},
    dining: {money: 1000},
    pet: {money: 1000}
}

apiRouter.get('/envelope', (req, res, next) => {
    res.status(200).send(envelopes)
})

apiRouter.get('/envelope/:category', (req, res, next) => {
    const category = req.params.category

    if (envelopes.hasOwnProperty(category)) {
        res.status(200).send(envelopes[category])
    } else {
        res.sendStatus(404)
    }
})

apiRouter.post('/envelope/transfer', (req, res, next) => {
    const request = req.body
    const amount = request.money
    const destination = request.destination
    const source = request.source

    if (envelopes[source].money - amount > 0) {
        const withdraw = envelopes[source].money -= amount
        const deposit = envelopes[destination].money += amount

        res.status(200).send(envelopes)
    } else {
        res.status(404).send("Not Enough Funds")
    }
})

apiRouter.put('/envelope/:category/deposit', (req, res, next) => {
    const request = req.body
    const amount = request.money
    const destination = req.params.category

    const deposit = envelopes[destination].money += amount
    res.status(200).send(envelopes)
})

apiRouter.put('/envelope/:category/withdraw', (req, res, next) => {
    const request = req.body
    const amount = request.money
    const source = req.params.category

    if (envelopes[source].money - amount > 0) {
        const withdraw = envelopes[source].money -= amount
        res.status(200).send(envelopes)
    } else {
        res.status(400).send("Not Enough Money")
    }
})

apiRouter.delete('/envelope/:category', (req, res, next) => {
    const source = req.params.category
    const deleted = delete envelopes[source]

    if (deleted){
        res.status(204).send()
    } else {
        res.status(404).send("Nothing to Delete")
    }
})

module.exports = apiRouter;