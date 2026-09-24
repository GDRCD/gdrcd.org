# Integrazione shell

L'integrazione aggiunge la directory del comando a `PATH`, abilita la
completion e permette a `stack cd` di cambiare la directory della shell
corrente.

## Installazione

L'installazione di base crea soltanto il link al comando:

```bash
./stack install
```

Per installare anche l'integrazione nella shell predefinita:

```bash
./stack install --activate
```

Sono supportate Bash e Zsh. Il comando rileva la shell tramite `$SHELL` e
aggiunge una sola riga gestita a `.bashrc` o `.zshrc`:

```bash
eval "$(NOME_COMANDO activate bash)"
```

Il nome del comando corrisponde a `PROJECT`; il fallback è `stack`. Apri una
nuova shell dopo l'installazione.

## Sessione corrente

L'integrazione può essere attivata senza modificare i file della shell:

```bash
eval "$(./stack activate bash)"
```

Per Zsh sostituisci `bash` con `zsh`.

La completion propone comandi, opzioni, servizi e percorsi dichiarati nei
metadati della CLI.

## Directory personalizzata

```bash
./stack install --target "$HOME/bin"
```

Senza `--activate`, la directory deve essere già presente in `PATH`. In caso
contrario il comando stampa l'istruzione `export` utile per la sessione
corrente.

L'installazione con `sudo` usa `/usr/local/bin`:

```bash
sudo ./stack install
```

## Reinstallazione e rimozione

Per ricreare un link già gestito dallo stesso stack:

```bash
./stack install --force
```

La rimozione elimina il link e l'eventuale riga gestita da `.bashrc` e
`.zshrc`, indipendentemente da come era stato installato:

```bash
./stack uninstall
```

Non vengono eliminati stack, configurazione o dati Docker. Link, file e righe
non appartenenti allo stack non vengono modificati.

## Verifica

```bash
type NOME_COMANDO
echo "$PATH"
```

Se comando o completion non risultano disponibili:

1. controlla `PROJECT` in `.env`;
2. verifica che la directory di installazione sia in `PATH`;
3. esegui `./stack install --force --activate`;
4. apri una nuova shell.
