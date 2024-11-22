const express = require('express');
const app = express();
const ubsRoutes = require("./routes/ubsRouter");

app.use(express.json());

app.use("/api", ubsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
