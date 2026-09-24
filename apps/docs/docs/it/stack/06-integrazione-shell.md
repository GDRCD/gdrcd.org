# Integrazione shell

L'integrazione rende disponibile il comando fuori dalla directory dello stack
e gestisce le funzioni che devono essere eseguite nella shell corrente.

`stack install` crea:

- un link in `$HOME/.local/bin`;
- un blocco gestito in `.bashrc` o `.zshrc`;
- completion e wrapper per `stack cd`.

Il nome del comando corrisponde a `PROJECT`; il fallback è `stack`.

```bash
./stack install
```

Apri una nuova shell dopo l'installazione.

Il blocco installato è statico: non avvia lo stack durante l'apertura del
terminale.

## Sessione corrente

Solo completion:

```bash
eval "$(./stack completion bash)"
```

Completion e `cd`:

```bash
eval "$(./stack shell-init bash)"
```

Per Zsh sostituisci `bash` con `zsh`.

La completion propone comandi, opzioni, servizi e percorsi dichiarati nei
metadati della CLI.

## Opzioni

```bash
./stack install --target "$HOME/bin"
./stack install --shell zsh
./stack install --no-shell-hook
sudo ./stack install
```

L'installazione con `sudo` usa `/usr/local/bin` e non installa hook personali.
`--no-shell-hook` richiede che la directory scelta sia già presente in `PATH`.

## Aggiornamento e rimozione

Rigenera link e hook dopo un cambio di `PROJECT` o una migrazione:

```bash
./stack install --force
```

Rimozione:

```bash
./stack uninstall
```

Non vengono eliminati stack, configurazione o dati Docker.

## Verifica

```bash
type NOME_COMANDO
echo "$PATH"
```

Se comando o completion non risultano disponibili:

1. controlla `PROJECT` in `.env`;
2. verifica che `$HOME/.local/bin` sia in `PATH`;
3. esegui `./stack install --force`;
4. apri una nuova shell.
