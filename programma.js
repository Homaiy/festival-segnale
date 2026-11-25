const listaEventi = document.querySelector("#lista-eventi");
const stato = document.querySelector("#programma-stato");
const modello = document.querySelector("#modello-evento");

const formatoData = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

async function leggiJSON(percorso) {
  const risposta = await fetch(percorso);

  if (!risposta.ok) {
    throw new Error(`Impossibile leggere ${percorso} (${risposta.status})`);
  }

  const dati = await risposta.json();

  if (!Array.isArray(dati)) {
    throw new Error(`Il file ${percorso} deve contenere un elenco.`);
  }

  return dati;
}

async function caricaProgramma() {
  try {
    const [eventi, sedi] = await Promise.all([
      leggiJSON("dati/eventi.json"),
      leggiJSON("dati/sedi.json"),
    ]);

    if (eventi.length === 0) {
      stato.textContent = "Nessun evento in programma.";
      return;
    }

    const sediPerId = new Map(sedi.map((sede) => [sede.id, sede.nome]));

    eventi.sort((primo, secondo) => {
      return primo.data.localeCompare(secondo.data)
        || primo.orario.localeCompare(secondo.orario);
    });

    const schede = document.createDocumentFragment();

    for (const evento of eventi) {
      const scheda = modello.content.cloneNode(true);
      const immagine = scheda.querySelector("img");
      const data = formatoData.format(new Date(evento.data));
      const giorno = data.charAt(0).toUpperCase() + data.slice(1);
      const nomeSede = sediPerId.get(evento.sede_id) ?? "Sede da definire";

      immagine.src = evento.immagine;
      immagine.alt = evento.immagine_alt;
      scheda.querySelector(".event-meta").textContent =
        `${giorno} · ${evento.orario} · ${evento.categoria}`;
      scheda.querySelector("h3").textContent = evento.titolo;
      scheda.querySelector(".event-description").textContent = evento.descrizione;
      scheda.querySelector(".event-place span").textContent = nomeSede;

      schede.append(scheda);
    }

    listaEventi.append(schede);
    stato.hidden = true;
  } catch (errore) {
    stato.textContent = "Il programma non è disponibile.";
    console.error(errore);
  }
}

caricaProgramma();