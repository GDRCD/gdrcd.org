# Installazione

Sono disponibili due modalità: installazione rapida per l'uso ordinario e clone
Git per lo sviluppo dello stack. Entrambe producono la stessa struttura.

## Installazione rapida

Esegui nella directory di destinazione:

```bash
eval "$(wget -qO- https://gdrcd.org/stack)"
cd stack
```

L'ultima release viene estratta in `stack`. Il bootstrap non richiede Git, ma
usa `curl` e `tar` per scaricare ed estrarre l'archivio.

Directory o versione specifica:

```bash
curl -fsSL https://raw.githubusercontent.com/GDRCD/stack/master/boot.sh \
  | bash -s -- --version v4.0.0 ~/Progetti/gdrcd
```

`--force` consente l'estrazione in una directory non vuota.

## Installazione con Git

```bash
git clone https://github.com/GDRCD/stack.git
cd stack
```

Il clone consente di sviluppare lo stack e consultare la versione Git. Anche in
questa modalità `stack upgrade` installa una release da archivio senza
rimuovere `.git`.

## Configurazione iniziale

```bash
cp sample.env .env
rm -f www/.gitkeep
git clone https://github.com/GDRCD/GDRCD.git www
```

Completa `.env` seguendo la pagina [Configurazione](./configurazione).

La directory `www` può contenere GDRCD oppure un progetto derivato che mantenga
la stessa struttura applicativa.

## Comando globale

Installazione per l'utente corrente:

```bash
./stack install
```

- link in `$HOME/.local/bin`;
- nome uguale a `PROJECT`, oppure `stack` se vuoto.

Per installare anche PATH, completion e supporto a `stack cd` nella shell
predefinita:

```bash
./stack install --activate
```

L'attivazione supporta Bash e Zsh e aggiunge una sola riga gestita al relativo
file di configurazione. Apri una nuova shell dopo l'installazione.

Installazione di sistema:

```bash
sudo ./stack install
```

Usa `/usr/local/bin` e non modifica i file personali della shell.

Opzioni:

- `--target PATH`: directory del link
- `--force`: reinstalla lo stesso stack
- `--activate`: installa anche l'integrazione per la shell indicata da `$SHELL`

Il link punta all'eseguibile dello stack corrente: non copia file e non crea
una seconda installazione.

## Primo avvio

```bash
./stack build
./stack start
```

`build` crea immagini e container. Gli avvii successivi richiedono soltanto
`start`, salvo modifiche alle immagini o alla versione PHP.
