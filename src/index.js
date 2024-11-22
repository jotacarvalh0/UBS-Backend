const express = require('express');
const app = express();
const ubsRoutes = require("./routes/ubsRoutes.js");

app.use(express.json());

app.use("/api/ubs", ubsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
