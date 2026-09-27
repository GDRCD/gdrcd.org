GDRCD è un progetto open source, stabile e in continua evoluzione. Il core team accoglie contributi e suggerimenti, nel rispetto della struttura e delle convenzioni del sistema.

## Linee Guida

### Patch e Plugin

- Lo sviluppo della **versione base** di GDRCD avviene tramite la [repository su GitHub](https://github.com/GDRCD/GDRCD).
- Patch e plugin vanno sviluppati in un **fork** del repository.
- Il fork consente di:
  - Tenere sincronizzato il codice base.
  - Mantenere separato il tuo sviluppo.
  - Facilitare l’eventuale inclusione tramite **pull request**.

**Regola d’oro:** per patch e plugin, forkate il repo!

---

### Issue: cosa aprire e cosa no

- Apri issue **solo** per:
  - Bug del codice base.
  - Migliorie o sviluppo del core di GDRCD.
- Non aprire issue per:
  - Domande su utilizzo o configurazioni personalizzate, usa il [server discord](https://discord.gdrcd.org) ufficiale.

---

### Regole per le Issue

- Segui le linee guida riportate qui: [Aprire Issue](/sviluppo/issues).
- Non sono obbligatorie, ma ignorarle è a tuo rischio.

---

### Richieste personalizzate

- Issue vanno aperte solo per la **versione base**.
- Per codice personalizzato o modifiche non destinate al core, usa il [server discord](https://discord.gdrcd.org) ufficiale.

---

### Sviluppo di modifiche sostanziali

- **Se non fai parte del team**: Fork del repository e Pull Request.
- **Se sei parte del team**: Branch dedicato e Pull Request.

---

### Struttura dei branch

- Seguiamo il workflow [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):
  - `master` = produzione.
  - `dev` = nuovi sviluppi in attesa di rilascio.
- Regole:
  - Ogni merge verso `dev` e `master` deve passare da una **pull request**.
  - Merge in `master` viene sempre concordato come nuovo rilascio.

---

### Canale di sviluppo

- SUl branch `dev` è possibile trovare gli aggiornamenti più recenti rispetto alla versione regolarmente distribuita, considerata "stabile".
- Nota bene:
  - Le novità possono contenere bug o instabilità.
  - Le versioni stabili sono quelle che trovi nella sezione [Releases](https://github.com/GDRCD/GDRCD/releases).
