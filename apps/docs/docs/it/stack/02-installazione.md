# Installazione

Sono disponibili due modalità: installer rapido per l'uso ordinario e clone
Git per lo sviluppo dello stack. Entrambe producono la stessa struttura.

## Installer rapido

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

Il clone consente di seguire branch e tag del repository. `stack upgrade`
richiede un working tree pulito e rifiuta l'aggiornamento in presenza di
modifiche locali.

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
- nome uguale a `PROJECT`, oppure `stack` se vuoto;
- hook e completion per Bash o Zsh.

Installazione di sistema:

```bash
sudo ./stack install
```

Usa `/usr/local/bin` e non modifica i file personali della shell.

Opzioni:

- `--target PATH`: directory del link
- `--force`: reinstalla lo stesso stack
- `--shell bash|zsh`: seleziona la shell
- `--no-shell-hook`: installa solo il link

Apri una nuova shell dopo l'installazione.

Il link punta all'eseguibile dello stack corrente: non copia file e non crea
una seconda installazione.

## Primo avvio

```bash
./stack build
./stack start
```

`build` crea immagini e container. Gli avvii successivi richiedono soltanto
`start`, salvo modifiche alle immagini o alla versione PHP.
