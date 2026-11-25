const statoMeteo = document.querySelector("#meteo-stato");
const indirizzoMeteo =
  "https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome";

async function caricaMeteo() {
  try {
    const risposta = await fetch(indirizzoMeteo);

    if (!risposta.ok) {
      throw new Error(`Richiesta meteo non riuscita (${risposta.status})`);
    }

    const dati = await risposta.json();
    const attuale = dati.current;

    if (
      !Number.isFinite(attuale?.temperature_2m) ||
      !Number.isFinite(attuale?.wind_speed_10m) ||
      typeof attuale?.time !== "string"
    ) {
      throw new Error("Dati meteo incompleti");
    }

    const ora = attuale.time.slice(11, 16);

    statoMeteo.textContent =
      `Temperatura: ${attuale.temperature_2m} °C · ` +
      `Vento: ${attuale.wind_speed_10m} km/h · ` +
      `Ora del dato: ${ora} (ora di Torino)`;
  } catch (errore) {
    statoMeteo.textContent = "Il meteo non è disponibile al momento.";
    console.error(errore);
  }
}

caricaMeteo();