# Cosa è?

GDRCD [Stack](https://github.com/GDRCD/stack) è l'ambiente Docker locale per sviluppare e provare
[GDRCD](https://github.com/GDRCD/GDRCD). Fornisce i servizi necessari senza
vincolare il codice applicativo alla configurazione Docker.

Lo stack risiede nella directory principale; il progetto GDRCD viene montato
da `www`. Configurazione, log e dati persistenti rimangono separati dal codice.

> [!IMPORTANT]
> _**Non è destinato per ambienti di produzione!**_
> Non consigliamo il suo utilizzo al di fuori dello sviluppo del proprio applicativo o come ambiente di test locale per le funzionalità.

## Requisiti

- Docker con Docker Compose
- Bash 3.2 o successivo
- `wget`, `curl` e `tar`
- WSL su Windows; PowerShell non è supportato

Git non è richiesto per le installazioni da archivio. È necessario per clonare
i repository e lavorare sullo stack da una checkout di sviluppo.

## Servizi

| Servizio     | Stato     | Funzione              |
| ------------ | --------- | --------------------- |
| `webserver`  | core      | Nginx e PHP           |
| `database`   | core      | MySQL 8               |
| `phpmyadmin` | opzionale | Gestione web di MySQL |
| `mailhog`    | opzionale | Test delle email      |

Container, immagini e rete usano il prefisso `PROJECT`. Questo permette di
mantenere più stack sullo stesso host senza sovrapporre le risorse Docker.

## Percorso consigliato

1. [Installazione](./installazione)
2. [Configurazione](./configurazione)
3. [Comandi](./comandi)
