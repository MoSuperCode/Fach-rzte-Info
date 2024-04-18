document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const responseMessage = document.getElementById("responseMessage");
  const addButton = document.getElementById("addMore");
  let idCounter = 1;

  addButton.addEventListener("click", function () {
    // idCounter zum aufzählen der ids
    idCounter++;

    // Div wird erstellt
    const neuerDiv = document.createElement("div");
    neuerDiv.className = "mb-3";

    const flexDiv = document.createElement("div");
    flexDiv.className = "flex";

    // Erstelle das Label für das neue Untersuchungsfeld
    const neuesLabelUnt = document.createElement("label");
    neuesLabelUnt.htmlFor = "untersuchung" + idCounter;
    neuesLabelUnt.className = "form-label";
    neuesLabelUnt.textContent = "Untersuchung: ";

    // Input für neue Untersuchung wird erstellt, Attribute werden hinzugefügt
    const neueUntersuchung = document.createElement("input");
    neueUntersuchung.type = "text";
    neueUntersuchung.className = "form-control";
    neueUntersuchung.id = "untersuchung" + idCounter;
    neueUntersuchung.name = "untersuchung" + idCounter;
    neueUntersuchung.required = true;

    // Erstelle das Label für das neue Wertfeld
    const neuesLabelVal = document.createElement("label");
    neuesLabelVal.htmlFor = "wert" + idCounter;
    neuesLabelVal.className = "form-label";
    neuesLabelVal.textContent = "Wert: ";

    // Input für neuen Wert wird erstellt, attribute werden hinzugefügt
    const neuerWert = document.createElement("input");
    neuerWert.type = "text";
    neuerWert.className = "form-control";
    neuerWert.id = "value" + idCounter;
    neuerWert.name = "value" + idCounter;
    neuerWert.required = true;

    // Lösch-Button erstellen
    const neuerLöschButton = document.createElement("button");
    neuerLöschButton.type = "button";
    neuerLöschButton.className = "btn btn-danger btn-sm mb-2 lösch"; // Rote Farbe und kleine Größe
    neuerLöschButton.textContent = "X";

    // EventListener für den Lösch-Button hinzufügen
    neuerLöschButton.addEventListener("click", function () {
      form.removeChild(neuerDiv); // Entfernt das gesamte Div
    });

    // Erstelle Label für Bemerkung
    const neuesLabelNot = document.createElement("label");
    neuesLabelNot.htmlFor = "bemerkung" + idCounter;
    neuesLabelNot.className = "form-label";
    neuesLabelNot.textContent = "Bemerkung: ";

    // Textarea für Bemerkung wird erstellt
    const neueTextArea = document.createElement("textarea");
    neueTextArea.className = "form-control";
    neueTextArea.id = "bemerkung" + idCounter;
    neueTextArea.name = "bemerkung" + idCounter;

    // Elemente werden ins Div eingefügt
    flexDiv.appendChild(neuesLabelUnt);
    flexDiv.appendChild(neuerLöschButton);
    neuerDiv.appendChild(flexDiv);
    neuerDiv.appendChild(neueUntersuchung);
    neuerDiv.appendChild(neuesLabelVal);
    neuerDiv.appendChild(neuerWert);
    neuerDiv.appendChild(neuesLabelNot);
    neuerDiv.appendChild(neueTextArea);

    // neuerDiv wird vor dem addMore Butten eingesetzt
    form.insertBefore(neuerDiv, addButton);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const protokollInput = document.getElementById("protokoll-nummer").value;
    const select = document.getElementById("select").value;
    const errorText = document.getElementById("protokollError");
    const responseMessage = document.getElementById("responseMessage");

    // Protokollnummer-Validierung (muss genau 7 Ziffern lang sein)
    if (protokollInput.length !== 7) {
      errorText.textContent =
        "Die Protokollnummer muss genau sieben Ziffern lang sein.";
      return; // Stoppt das Absenden des Formulars
    } else {
      errorText.textContent = ""; // reseted fehlermessage, falls die Eingabe korrekt ist
    }

    if (select === "") {
      alert("Bitte wählen Sie einen gültigen Absender aus.");
      return;
    }

    const formData = new FormData(form);

    // Sendet die Daten asynchron zum Server, d.h. muss nicht auf ein response warten
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((text) => {
        responseMessage.textContent = text; // Zeigt die Antwort vom Server an
        responseMessage.className = "response-message success"; // Setzt die Klasse für Erfolg
        setTimeout(form.reset(), 1500); // Setzt das Formular nach dem Absenden zurück, damit man direkt weiterschreiben kann.
      })
      .catch((error) => {
        console.error("Fehler beim Senden der Daten: ", error);
        responseMessage.textContent = "Fehler beim Senden der Daten.";
        responseMessage.className = "response-message error"; // -" "- Fehler
      });
  });
});

// Danke fürs durchlesen meines Codes :*
