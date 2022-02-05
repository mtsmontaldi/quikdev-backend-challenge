const router = require('express').Router()
const Person = require('../models/Person')

//Create
router.post('/', async (req, res) => {

    // req.body
    const {id, name, username, birthdate, address, addressNumber, primaryPhone, approved, description, createdAt} = req.body

    if(!name){
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    const person = {
        id, 
        name, 
        username, 
        birthdate, 
        address, 
        addressNumber, 
        primaryPhone, 
        approved,
        description, 
        createdAt
    }

    try {
        //create data
        await Person.create(person)

        res.status(201).json({message:'Pessoa inserida com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//READ 
router.get('/', async(req, res) => {

    try {
        
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    //extract data
    const id = req.params.id


    try {
        
        const person = await Person.findOne({id: id})

        if(!person) {
            res.status(424).json({message: 'O usuário não foi encontrado'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//UPDATE
router.patch('/:id', async(req, res) => {
    
    const id = req.params.id

    const {name, username, birthdate, address, addressNumber, primaryPhone, approved, description, createdAt} = req.body

    const person = {
        id, 
        name, 
        username, 
        birthdate, 
        address, 
        addressNumber, 
        primaryPhone, 
        approved, 
        description, 
        createdAt
    }

    try{

    const updatedPerson = await Person.updateOne({id:id}, person)

    if(updatedPerson.matchedCount === 0){
        res.status(424).json({message: 'O usuário não foi encontrado'})
        return
    }

    res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//DELETE
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({id: id})

    if(!person) {
        res.status(424).json({message: 'O usuário não foi encontrado'})
        return
    }

    try {
        
        await Person.deleteOne({id:id})

        res.status(200).json({message: 'Usuario Removido com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router