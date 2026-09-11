Benvenuto nella documentazione tecnica di **GDRCD**!

Questa sezione è dedicata agli sviluppatori e agli utenti avanzati che desiderano approfondire il funzionamento interno dell'engine GDRCD. Qui troverai spiegazioni dettagliate sulle principali componenti tecniche del sistema, sulle logiche di funzionamento e sulle modalità di estensione e personalizzazione del software.

GDRCD è un progetto open source, stabile e in continua evoluzione. Il core team accoglie contributi e suggerimenti, nel rispetto della struttura e delle convenzioni del sistema.

## Linee Guida

### 1. Patch e Plugin

- Lo sviluppo della **versione base** di GDRCD5 avviene qui.
- Patch e plugin vanno sviluppati in un **fork** del repository.
- Il fork consente di:
  - Tenere sincronizzato il codice base.
  - Mantenere separato il tuo sviluppo.
  - Facilitare l’eventuale inclusione tramite **pull request**.

**Regola d’oro:** per patch e plugin, forkate il repo!

---

### 2. Issue: cosa aprire e cosa no

- Apri issue **solo** per:
  - Bug del codice base.
  - Migliorie o sviluppo del core di GDRCD.
- Non aprire issue per:
  - Domande su utilizzo o configurazioni personalizzate, usa il [server discord](https://discord.gg/zh69CDUf3V) ufficiale o il [forum di GDR-Online](http://gdr-online.com).

---

### 3. Regole per le Issue

- Segui le linee guida riportate qui: [Aprire Issue](Aprire-Issue.md).
- Non sono obbligatorie, ma ignorarle è a tuo rischio.

---

### 4. Richieste personalizzate

- Issue vanno aperte solo per la **versione base**.
- Per codice personalizzato o modifiche non destinate al core, usa il [server discord](https://discord.gg/zh69CDUf3V) ufficiale o il [forum di GDR-Online](http://gdr-online.com).

---

### 5. Sviluppo di modifiche sostanziali

- **Se non fai parte del team**: Fork del repository e Pull Request.
- **Se sei parte del team**: Branch dedicato e Pull Request.

---

### 6. Struttura dei branch

- Seguiamo il workflow [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):
  - `master` = produzione.
  - `dev` = nuovi sviluppi in attesa di rilascio.
- Regole:
  - Ogni merge verso `dev` e `master` deve passare da una **pull request**.
  - Merge in `master` viene sempre concordato come nuovo rilascio.

---

### 7. Ultimi sviluppi

- Qui trovi gli aggiornamenti più recenti rispetto a GDR-Online.
- Nota bene:
  - Le novità possono contenere bug o instabilità.
  - Le versioni stabili sono quelle che trovi nella sezione [Releases](https://github.com/GDRCD/GDRCD/releases).
