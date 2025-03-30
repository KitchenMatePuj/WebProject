const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist/web-application/browser")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/web-application/browser/index.csr.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
