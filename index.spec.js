const personRoutes = require('./routes/personRoutes')
const express = require('express')
const mongoose = require('mongoose')
const request = require('supertest')

describe('Test my API', () => {
    it('should get main route', () => {
        const res = await request(personRoutes).get('/person')

        expect(res.json).toHaveProperty('message:')
    })
})