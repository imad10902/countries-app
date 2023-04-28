const express = require('express');
const axios = require('axios');
const cors = require('cors');




const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    console.log('hi there')
    axios.get('https://restcountries.com/v2/all')
    .then(response => {
       res.json(response.data);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).send('error in extraction');
    })
});

app.get('/country', (req, res)=>{
    axios.get('https://restcountries.com/v2/name/'+req.query.q)
    .then(response=>{
        res.json(response.data);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).send('error in extraction');
    })
});



const port = 4200;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});