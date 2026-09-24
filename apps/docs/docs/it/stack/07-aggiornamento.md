# Aggiornamento e migrazione

`upgrade` aggiorna il core senza sostituire configurazione, progetto o dati
locali. Il comportamento cambia in base al tipo di installazione.

## Aggiornamento

```bash
stack upgrade
stack upgrade --version v4.0.0
stack upgrade --force
```

Il bootstrap preserva:

- `.env`
- `www`
- `logs`
- `services`
- `.version`

Il core precedente viene spostato in `.stack-backup-*`.

Nelle installazioni da archivio il backup resta nella directory dello stack e
può essere rimosso dopo la verifica dell'aggiornamento.

Con Git, il working tree deve essere pulito. `--version` esegue il checkout del
tag indicato.

## Migrazioni

### v4.0.0

Nuova sintassi database:

```bash
stack export DATABASE [FILE]
stack import DATABASE FILE
stack refresh DATABASE
```

Rigenera il comando e l'hook:

```bash
./stack install --force
```

Questo passaggio sostituisce l'integrazione dinamica precedente con hook e
completion statici.

Il link usa `PROJECT`; il fallback è `stack`.

Modifiche operative:

- `build` usa la cache; `build --force` la ignora
- `clean` conserva i volumi; `clean --volumes` li elimina
- `enable` e `disable` accettano più servizi
- export e import non modificano i file sorgente

[Changelog](https://github.com/GDRCD/stack/blob/master/CHANGELOG.md)
