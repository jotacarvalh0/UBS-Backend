const express = require('express');
const app = express();
const port = 300;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor funcionando!")
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});