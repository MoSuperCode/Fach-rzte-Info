const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const upload = multer();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/submit-form", upload.none(), (req, res) => {
  console.log(req.body);
  let count = 1;
  let dataToSave = "";

  const name = req.body.name;
  const email = req.body.select;
  const protokollNummer = req.body["protokoll-nummer"];
  let untersuchung = req.body.untersuchung;
  let value = req.body.value;
  let bemerkung = req.body.bemerkung;
  dataToSave = `Namenskürzel: ${name},\nEmpfänger E-Mail: ${email},\nProtokollnummer: ${protokollNummer},\nUntersuchung: ${untersuchung}, Wert: ${value}, Bemerkung: ${bemerkung}\n`;
  for (
    let count = 2;
    req.body["untersuchung" + count] && req.body["value" + count];
    count++
  ) {
    const untersuchung = req.body["untersuchung" + count];
    const value = req.body["value" + count];
    const bemerkung = req.body["bemerkung" + count];
    dataToSave += `Untersuchung ${count}: ${untersuchung}, Wert ${count}: ${value}, Bemerkung ${count}: ${bemerkung}\n`;
  }

  // Hier erstelle ich ein Zeitstempel und füge ihn in den File - Namen ein
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filePath = `./data/facharzt-info-${timestamp}.txt`;

  fs.writeFile(filePath, dataToSave, (err) => {
    if (err) {
      console.error("Fehler beim Speichern der Daten");
      res.status(500).send("Fehler beim Speichern der Daten.");
    } else {
      console.log("SUCCESS");
      res.send("Daten wurden erfolgreich als Datei gespeichert");
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server läuft auf http://10.35.20.60:${PORT}`);
});
