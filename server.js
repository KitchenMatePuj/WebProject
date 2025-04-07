const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const DIST_FOLDER = path.join(__dirname, "dist/web-application/browser");

app.use(cors({
  origin: 'https://webproject-production-8adc.up.railway.app',
  credentials: true
}));

app.use(express.static(DIST_FOLDER));

app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, "index.csr.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
