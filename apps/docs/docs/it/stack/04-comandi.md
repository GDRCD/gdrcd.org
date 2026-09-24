# Comandi

Gli esempi usano il comando globale `stack`. In alternativa usa `./stack`
dalla directory principale. Ogni comando espone il proprio help senza caricare
l'ambiente Docker.

```bash
stack help
stack <comando> --help
```

## Ciclo di vita

| Comando                      | Azione                          |
| ---------------------------- | ------------------------------- |
| `stack build [SERVICE...]`   | Costruisce immagini e container |
| `stack start [SERVICE...]`   | Avvia                           |
| `stack stop [SERVICE...]`    | Ferma                           |
| `stack restart [SERVICE...]` | Riavvia                         |
| `stack recreate`             | Ricrea i container              |
| `stack clean`                | Rimuove container e rete        |

Opzioni rilevanti:

- `build --force`: ignora la cache Docker
- `clean --volumes`: elimina anche il volume MySQL

Più servizi possono essere indicati nello stesso comando:

```bash
stack restart webserver database
```

Senza servizi espliciti, il comando agisce sull'intero stack abilitato.

## Diagnostica

```bash
stack logs [SERVICE...]
stack attach SERVICE
```

`logs` accetta più servizi; `attach` apre una shell in un solo container.

## Servizi opzionali

```bash
stack services
stack enable phpmyadmin mailhog
stack disable mailhog
```

`enable` e `disable` applicano subito il nuovo stato.

## Directory

```bash
stack cd          # www
stack cd --root   # root dello stack
```

Richiede l'hook della shell. Senza hook:

```bash
cd "$(stack cd)"
```

L'eseguibile senza hook stampa il percorso perché un processo figlio non può
cambiare la directory della shell chiamante.

## Gestione CLI

| Comando           | Azione                  |
| ----------------- | ----------------------- |
| `stack install`   | Installa comando e hook |
| `stack uninstall` | Rimuove i file gestiti  |
| `stack upgrade`   | Aggiorna il core        |

Completion e hook manuali:

```bash
stack completion bash
stack shell-init bash
```

Per Zsh sostituisci `bash` con `zsh`.

Vedi anche [Database](./database).
