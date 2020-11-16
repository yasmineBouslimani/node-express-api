const express = require('express')
const app = express()
const parkings = require('./parkings.json')
const reservations = require('./reservations.json')

app.use(express.json())


app.get('/reservations', (req, res) => {
    res.status(200).json(reservations)
})

app.get('/parkings', (req, res) => {
    res.status(200).json(parkings)
})

app.get('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    const reservation = reservations.filter(reservation => reservation.parkingId === parking.id)
    res.status(200).json({parking, reservation})
})

app.get('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id)
    const idReservation = parseInt(req.params.idReservation)
    const parking = parkings.find(parking => parking.id === id)
    const reservationsArray = reservations.filter(reservation => reservation.parkingId === parking.id);
    const reservation = reservationsArray.find(reservation => reservation.id === idReservation)
    res.status(200).json({parking, reservation})
})

app.post('/parkings', (req, res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})

app.post('/reservations', (req, res) => {
    reservations.push(req.body)
    res.status(200).json(parkings)
})

app.put('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name = req.body.name,
        parking.city = req.body.city,
        parking.type = req.body.type,
        res.status(200).json(parking)
})

app.put('/reservations/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let reservation = reservations.find(reservation => reservation.id === id)
    reservation.parking = req.body.parking,
        reservation.parkingId = req.body.parkingId,
        reservation.city = req.body.city,
        reservation.clientName = req.body.clientName,
        reservation.vehicle = req.body.vehicle,
        reservation.licensePlate = req.body.licensePlate,
        reservation.checkin = req.body.checkin,
        reservation.checkout = req.body.checkout
    res.status(200).json(reservation)
})

app.delete('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking), 1)
    res.status(200).json(parkings)
})

app.delete('/reservations/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let reservation = reservations.find(reservation => reservation.id === id)
    reservations.splice(reservations.indexOf(reservation), 1)
    res.status(200).json(parkings)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})
