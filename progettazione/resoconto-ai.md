# Resoconto del lavoro con l’AI — Segnale

Programma dai dati e meteo

- Capire la consegna: All’inizio ho chiesto al chatbot di spiegarmi le slide una alla volta e di indicarmi cosa fare in pratica. L’esempio dei due eventi nella stessa sede mi ha chiarito a cosa serve `sede_id`: ogni evento contiene il numero della sua sede e il programma usa quel numero per trovare il nome in `sedi.json`.

- Completare i file JSON: Ho compilato `sedi.json` con i nomi e gli indirizzi delle tre sedi. All’inizio avevo messo ogni sede tra due parentesi quadre separate. Dopo aver chiesto un controllo, ho riunito le tre sedi in un unico elenco, separando i record con le virgole. Per `eventi.json` ho fornito al chatbot il mio `programma.html` e gli ho chiesto di ricavare dalle schede i quattro eventi mancanti. Ho inserito i record proposti, mantenendo i due eventi già forniti con gli ID `1` e `4`.

- Descrivere i dati: Ho chiesto al chatbot di spiegarmi che cosa fosse `SCHEMA.md` e che cosa significassero i campi, le chiavi e la relazione tra Evento e Sede. Poi ho usato il testo e il diagramma Mermaid che mi ha proposto. Nella scheda ho riportato anche l’esempio di «Materia seconda», che ha `sede_id` uguale a `2` e quindi è collegato a Spazio Forma.

- Generare le schede del programma: Ho usato il codice proposto per creare le schede con `programma.js`. Il file legge i due JSON con `fetch`, recupera il nome della sede e inserisce nel programma una scheda per ogni evento. Durante la modifica dell’HTML avevo tolto per errore l’introduzione della pagina e mancava la riga della sede nel modello della scheda. Ho chiesto dove intervenire e ho sostituito il blocco `<main>` con la versione completa. In una prima prova vedevo il messaggio «Il programma non è disponibile». Dopo aver riaperto la pagina con Live Preview, ho visto tutte e sei le schede in ordine di data e orario, con immagini e nomi delle sedi.

- Verificare il programma: Ho provato tre casi, uno alla volta. Con `[]` in `eventi.json` ho visto «Nessun evento in programma». Rinominando temporaneamente `sedi.json` ho visto «Il programma non è disponibile». Impostando a `99` il `sede_id` di «Lettere in movimento», la scheda è rimasta visibile con la scritta «Sede da definire».

- Aggiungere e provare il meteo: Ho chiesto dove inserire il riquadro in `info.html` e ho usato il codice proposto per `meteo.js`. In Live Preview ho visto la temperatura, la velocità del vento, l’ora del dato e il link alla fonte Open-Meteo con la licenza CC BY 4.0. Per simulare un errore ho chiesto quale `temperature_2m` dovessi cambiare, perché compariva in più punti del codice. Ho cambiato solo il parametro nell’indirizzo della richiesta, scrivendo `temperatura_2m`, e ho verificato che nel riquadro comparisse «Il meteo non è disponibile al momento».

- Controllo su schermi divers: Ho controllato le pagine Programma e Info e luoghi a tre larghezze, corrispondenti a telefono, tablet e computer.