import express from 'express';
import mongoose from 'mongoose';
import model from './lib/models.js';
// import sendEmail from './lib/mailer.js';
// import initEmail from './lib/initEmail.js';
// import validateEmail from './lib/validateEmail.js';

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/getuser', async (req,res) => {
    const query = {_id: req.query.id}
    const user = await model.user.find(query, (err) => {
        if(err) throw new Error(`Reading error: ${err}`);
    }).lean();// using .lean() to get a json object (instead of a mongoose one)
    console.log(user);
});

/*********************************************************
 * Connecting to database & running server
 *********************************************************/
app.set('PORT', process.env.PORT || 8888);
//=> Connecting to MongoDB
mongoose.connect('mongodb://localhost/temp-hiit', {
//mongoose.connect(MONGO_ATLAS_STRING, {
//mongoose.connect('mongodb://Leandro:0600mongo@cluster0-shard-00-00.giktc.mongodb.net:27017,cluster0-shard-00-01.giktc.mongodb.net:27017,cluster0-shard-00-02.giktc.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-mnij6f-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw new Error(`Connection error in database: ${err}`);
    //=> Serving app
    console.log('Database connected');
    const server = app.listen(app.get('PORT'), () => {
        console.log('\n-------------------------------------');
        console.log(`Server ready, listening at PORT: ${server.address().port}`);
        console.log('-------------------------------------\n');
        initEmail();
    });
    server.on('error', error => console.log(`Server error => ${error}`));
});