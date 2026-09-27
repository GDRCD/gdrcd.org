# Configurazione

Lo stack legge le variabili da `.env` nella propria directory. Parti dal file
di esempio e assegna valori compatibili con le porte disponibili sull'host.

```bash
cp sample.env .env
```

## Progetto e porte

| Variabile      | Uso                                 | Esempio |
| -------------- | ----------------------------------- | ------- |
| `PROJECT`      | Comando, container, immagini e rete | `gdrcd` |
| `SERVICE_PORT` | Applicazione                        | `80`    |
| `PMA_PORT`     | phpMyAdmin                          | `8080`  |
| `MAILHOG_PORT` | MailHog                             | `8025`  |
| `DB_PORT`      | MySQL esposto sull'host             | `3306`  |

`PROJECT` deve essere valido come nome di comando. Il fallback è `stack`.
Lo stesso valore identifica anche le risorse Docker dello stack.

## PHP

| Variabile     | Uso                  | Esempio |
| ------------- | -------------------- | ------- |
| `PHP_VERSION` | Versione PHP         | `php84` |
| `PHP_UID`     | UID del processo PHP | `1000`  |

Versioni: `php56`, `php73`, `php80`, `php84`, `php85`.

`PHP_UID` dovrebbe corrispondere all'utente che modifica i file in `www`, per
evitare file generati dal container non scrivibili dall'host.

Dopo una modifica a `PHP_VERSION`:

```bash
./stack build webserver
```

## MySQL

| Variabile             | Uso                  | Esempio |
| --------------------- | -------------------- | ------- |
| `MYSQL_ROOT_PASSWORD` | Password di `root`   | `root`  |
| `MYSQL_USER`          | Utente applicativo   | `gdrcd` |
| `MYSQL_PASSWORD`      | Password applicativa | `gdrcd` |
| `MYSQL_DATABASE`      | Database iniziale    | `gdrcd` |

Configurazione GDRCD:

| Parametro | Valore                                         |
| --------- | ---------------------------------------------- |
| host      | `database`                                     |
| username  | `MYSQL_USER`, oppure `root`                    |
| password  | `MYSQL_PASSWORD`, oppure `MYSQL_ROOT_PASSWORD` |
| database  | `MYSQL_DATABASE`                               |

`DB_PORT` serve solo per l'accesso dall'host.
Tra i container il database è sempre raggiungibile come `database:3306`.

## Persistenza

- `www`: codice
- `logs`: log
- `database-data`: volume MySQL
- `services`: servizi opzionali abilitati

`clean` conserva il database. `clean --volumes` lo elimina.

Le credenziali in `.env` sono destinate allo sviluppo locale e non devono
essere riutilizzate in produzione.
