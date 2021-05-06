import express from 'express';
import mongoose from 'mongoose';
import model from './lib/models.js';
// import sendEmail from './lib/mailer.js';

const app = express();
const defaultUser = {
    name: 'UsuarioDefault',
    sessions: [
        {
          name: 'Sesión Standard',
          duration: 480,
          id: '0000',
          sets: [
            {
              name: '45/15',
              work: 45,
              rest: 15,
              reps: 8
            }
          ]
        },
        {
          name: 'Sesión Standard Heavy',
          duration: 960,
          id: '0001',
          sets: [
            {
              name: '90/30',
              work: 90,
              rest: 30,
              reps: 8
            }
          ]
        },
        {
          name: 'Test',
          duration: 26,
          id: '0002',
          sets: [
            {
              name: 'anything',
              work: 8,
              rest: 5,
              reps: 2
            }
          ]
        }
    ]
}

app.use(express.urlencoded({extended: true}));

app.get('/getuser', async (req,res) => {
    const query = {name: req.query.name}
    const userData = await model.userData.find(query, (err) => {
        if(err) throw new Error(`Reading error: ${err}`);
    }).lean();
    res.send(userData);
});

/******************************************
 * Connecting to database & running server
 ******************************************/
app.set('PORT', process.env.PORT || 8888);
//=> Connecting to MongoDB
mongoose.connect('mongodb://localhost/temp-hiit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, async err => {
    if(err) throw new Error(`Connection error in database: ${err}`);
    //=> Serving app
    console.log('Database connected');
    const server = app.listen(app.get('PORT'), () => {
        console.log('\n-------------------------------------');
        console.log(`Server ready, listening at PORT: ${server.address().port}`);
        console.log('-------------------------------------\n');
    });
    server.on('error', error => console.log(`Server error => ${error}`));

    //////////////////////////////////////////////////////////
    const newUser = new model.userData(defaultUser);
    newUser.save(async err => {
        if(err) throw new Error(`Writing error: ${err}`);
        console.log('New product added to database\n');
    });
    //////////////////////////////////////////////////////////
});