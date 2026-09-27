# gdrcd.org

Monorepo del sito GDRCD, composto dalla landing page e dal portale della
documentazione. Entrambe le applicazioni sono sviluppate con Astro e vengono
gestite dalla root tramite `pnpm`.

## Requisiti

Per lavorare sul progetto servono Node.js 22.12.0 o successivo e pnpm 10. Non
sono richiesti servizi esterni per l'avvio in locale.

## Avvio in locale

Installare le dipendenze dalla root del repository:

```sh
pnpm install
```

Avviare quindi l'applicazione desiderata in background:

```sh
# Landing page
pnpm landing:dev

# Documentazione
pnpm docs:dev
```

Per verificare entrambe le applicazioni prima di una modifica:

```sh
pnpm check
pnpm lint
pnpm build
```
