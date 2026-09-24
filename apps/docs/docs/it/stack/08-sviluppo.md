# Sviluppo dello stack

La CLI usa un dispatcher unico e consumer indipendenti. L'aggiunta di un
comando non richiede modifiche a un registro centrale.

## Comandi

I consumer sono file eseguibili in `bin/commands`. Help e completion leggono i
metadati iniziali:

```bash
#!/usr/bin/env bash
# @cli.summary: Descrizione breve
# @cli.usage: [OPTIONS...] ARGOMENTO
# @cli.option: -f, --flag | flag | | Descrizione
# @cli.argument: ARGOMENTO | text | required | Descrizione
```

Tipi supportati: `flag`, `text`, `file`, `directory`, `service`,
`optional-service`, `enum(valore,altro)`.

Per aggiungere un comando:

1. copia un consumer esistente;
2. aggiorna metadati e parsing;
3. rendilo eseguibile;
4. aggiungi i test.

Dispatcher, help e completion scoprono automaticamente i file eseguibili.

## Validazione

```bash
./stack __validate-specs
make test
```

`make test` usa un container temporaneo e monta il repository in sola lettura.
La suite include Bats, ShellCheck e controlli Bash/Zsh.

I test non usano i container reali dello stack. Stub e fixture vengono creati
in `/tmp` e rimossi con il container.

Requisiti del codice:

- compatibilità con Bash 3.2;
- argomenti sempre quotati;
- array per liste di valori;
- metadati CLI per ogni comando pubblico.
