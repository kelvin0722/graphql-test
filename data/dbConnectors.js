import mongoose, { mongo } from "mongoose";
import Sequelize  from "sequelize";
import _ from 'lodash'
import Casual from 'casual'

// Mongo connection
mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/friends", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    contacts: {
        type: Array
    },
})

const Friends = mongoose.model('friends', friendSchema)

// SQL
const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: './alien.sqlite',
})

const Aliens = sequelize.define('aliens', {
    firstName: {
        type: Sequelize.STRING 
    },
    lastName: {
        type: Sequelize.STRING 
    },
    planet: {
        type: Sequelize.STRING 
    }
})

Aliens.sync({force:true}).then(() => {
    _.times(10, i => {
        Aliens.create({
            firstName: Casual.first_name,
            lastName: Casual.last_name,
            planet: Casual.word
        })
    })
})


export { Friends, Aliens }