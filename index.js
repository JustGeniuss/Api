import express from 'express';


const PORT = 8000;
const app = express();

app.get('/hello', (req, res) => {
    res.send('hello');
});



app.listen(PORT, () => {
    console.log(`Server started on ${PORT} `)
})


