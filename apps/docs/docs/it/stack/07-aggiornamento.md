# Aggiornamento

`upgrade` installa una release da archivio e preserva configurazione, progetto,
log e dati locali. Il procedimento è lo stesso per installazioni da archivio e
checkout Git.

## Comandi

Ultima release disponibile:

```bash
stack upgrade
```

Release specifica:

```bash
stack upgrade --version v4.1.0
```

Reinstallazione della release già presente:

```bash
stack upgrade --force
```

I tag devono essere versioni SemVer complete con prefisso `v`, per esempio
`v4.1.0` o `v4.1.0-rc.1`.

## Dati preservati

L'aggiornamento non sostituisce:

- `.env`
- `www`
- `logs`
- `services`
- `.git`, se presente

Il file `.version` viene invece aggiornato insieme al core.

L'archivio viene estratto e validato prima di modificare lo stack. Se la
sostituzione non viene completata, il core precedente viene ripristinato
automaticamente e le directory temporanee vengono rimosse.
