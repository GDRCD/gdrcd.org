# Database

I comandi operano sul container MySQL dello stack e richiedono sempre il nome
del database. Non usano implicitamente `MYSQL_DATABASE`.

## Export

```bash
stack export DATABASE [FILE]
stack export --compress DATABASE [FILE]
```

`FILE` deve terminare con `.sql`; `--compress` aggiunge `.gz`.

```bash
stack export gdrcd backup.sql
stack export --compress gdrcd backup.sql
```

Il dump viene preparato in un file temporaneo. La destinazione viene sostituita
solo a export completato, così un errore non elimina un backup valido.

## Import

```bash
stack import DATABASE FILE
stack import --force-drop DATABASE FILE
```

Formati: `.sql`, `.sql.gz`. Il file sorgente non viene modificato.
`--force-drop` elimina e ricrea il database.

I file compressi vengono letti in streaming e non sono decompressi su disco.

## Reset

```bash
stack refresh DATABASE
stack refresh --yes DATABASE
```

`refresh` elimina e ricrea un database vuoto. `--yes` salta la conferma.

Usa `--yes` soltanto in procedure non interattive che hanno già verificato il
database di destinazione.

> `import --force-drop`, `refresh` e `clean --volumes` eliminano dati.

## Connessione

- dai container: `database:3306`
- dall'host: `localhost:${DB_PORT}`
