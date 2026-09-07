# Chat

Questa documentazione illustra i tre flussi principali che gestiscono la chat AJAX nel sistema GDRCD. Ogni flusso è accompagnato da una spiegazione del processo e delle funzioni PHP coinvolte, con snippet di codice a supporto.

---

## 1. Lettura Messaggi Chat (`read`)

![chat_read](/chat/chat_read.png)

### Descrizione Flusso

1. La lettura dei messaggi avviene tramite polling dal frontend nel file `/pages/chat/chat_box.php`.
2. Il browser invia una richiesta GET a `/ajax.php?page=chat&op=read`.
3. Questa richiesta viene gestita dal file `/pages/chat/op/read.inc.php` che si occupa di recuperare i nuovi messaggi dal database, formattarli in HTML e restituirli al frontend.

### File Operation

**/pages/chat/op/read.inc.php** è il file responsabile per la lettura delle azioni in chat, tramite le funzioni chiave mostrate di seguito:

```php
// legge le azioni dal database già formattate in html
$azioni = gdrcd_chat_read_messages($map_id, $chat_last_id);

// stampa le azioni lette
gdrcd_api_output($azioni);
```

### Dettaglio Delle Funzioni PHP Coinvolte

#### 1. gdrcd_chat_read_messages()
Recupera le azioni dal database formattate in HTML e le organizza in un array pronto per essere stampato all'esterno.

```php
function gdrcd_chat_read_messages($luogo, $last_id = 0) {
    ...
    // itera su tutte le azioni recuperate
    while ($riga_azione = gdrcd_query($query_azioni, 'assoc')) {

        // formatta ogni azione recuperata in html
        $azione = gdrcd_chat_message_handler($riga_azione);

        // salva le informazioni con cui stamperemo in uscita le azioni
        $azioni[] = [
            'id' => $riga_azione['id'],
            'mittente' => $riga_azione['mittente'],
            'azione' => $azione
        ];

    }
    ...
}
```

#### 2. gdrcd_chat_message_handler()
Formatta ogni messaggio in HTML in base alla tipologia.

In breve, sceglie in base alla tipologia di azione (`A`, `S`, `M` etc.) quale funzione chiamare per formattare correttamente l'azione in HTML.

```php
function gdrcd_chat_message_handler($azione) {
    switch ($azione['tipo']) {
        case GDRCD_CHAT_ACTION_TYPE:
            return gdrcd_chat_action_format($azione);
        // ... altri tipi
        default:
            return null;
    }
}
```

#### 3. gdrcd_api_output()
Restituisce la risposta in formato JSON.

```php
function gdrcd_api_output($status) {
    ...
    echo json_encode(['code' => $code, 'message' => $message]);
}
```

#### **Formattazione HTML delle azioni**

La formattazione delle azioni in HTML è demandata alle funzioni con suffisso `_format`. Ogni tipologia di azione ha una specifica funzione `_format` responsabile della sua conversione in HTML.


**Funzione di formattazione per messaggi di tipo Azione (`A`):**

```php
function gdrcd_chat_action_format($azione) {
    // Componenti HTML del messaggio
    $chat_avatar = gdrcd_chat_avatar_component($azione);
    $chat_time = gdrcd_chat_time_component($azione);
    $chat_icons = gdrcd_chat_icons_component($azione);
    $chat_sender = gdrcd_chat_sender_component($azione);
    $chat_tag = gdrcd_chat_tag_component($azione);
    $chat_mittente_e_tag = gdrcd_chat_name_component($chat_sender . $chat_tag, false);
    $chat_body = gdrcd_chat_body_with_colors_component($azione);

    // Composizione finale del messaggio
    return gdrcd_chat_message_component(
        $azione['tipo'],
        <<<HTML
            {$chat_avatar}
            {$chat_time}
            {$chat_icons}
            {$chat_mittente_e_tag}
            {$chat_body}
        HTML
    );
}
```

**Componenti HTML**
Le funzioni con suffisso `_component` sono "mattoni" riutilizzabili che formattano singole parti del messaggio, come il nome, l'orario, l'avatar, il corpo del testo, ecc.

Esempio:
```php
function gdrcd_chat_time_component($azione) {
    $time = gdrcd_format_time($azione['ora']);
    return <<<HTML
        <span class="chat_time">{$time}</span>
    HTML;
}
```

**Composizione finale**
La funzione `gdrcd_chat_message_component()` incapsula tutto l'HTML in un contenitore identificato per tipologia:

```php
function gdrcd_chat_message_component($tipo, $azione_html) {
    return <<<HTML
        <div class="chat_row_{$tipo}">
            {$azione_html}
        </div>
    HTML;
}
```

**Risultato finale**

Supponendo di avere un'azione di tipo `A` (azione), il risultato sarà un HTML simile a:

```html
<div class="chat_row_A">
    <img ... /> <!-- avatar -->
    <span class="chat_time">23:03</span>
    <span class="chat_icons">...</span>
    <span class="chat_name">Blancks [TAG]</span>
    <span class="chat_msg">si avvicina al tavolo</span>
</div>
```

Ogni tipo di messaggio utilizza una funzione `_format` dedicata, che a sua volta usa vari componenti per costruire il risultato HTML in modo modulare e riutilizzabile.

---

## 2. Scrittura Messaggi Chat (`write`)

![chat_write](/chat/chat_write.png)

### Descrizione Flusso

1. La scrittura dei messaggi avviene quando l'utente invia un testo in chat tramite il form in `/pages/chat/chat_input.php`.
2. Il payload viene inviato via POST a `/ajax.php?page=chat&op=write`, gestito da `/pages/chat/op/write.inc.php`.
3. I dati vengono processati e salvati nel database se validi.


### File Operation

**/pages/chat/op/write.inc.php** è il file responsabile per la scrittura delle azioni in chat, tramite le funzioni chiave mostrate di seguito:

```php
// tenta di scrivere l'azione sul database
$chat_insert_status = gdrcd_chat_write_message($message, $tag_o_destinatario, $type);

// ritorna l'esito dell'operazione
gdrcd_api_output($chat_insert_status);
```

### Funzioni PHP Coinvolte

#### 1. gdrcd_chat_write_message()
Determina la tipologia del messaggio e lo salva.
In modo analogo al flusso di lettura, ogni tipologia di azione usa una funzione dedicata per essere scritta sul database, queste funzioni sono riconoscibili dal suffisso `_save`.

Il tipo di messaggio viene determinato in due modi:
* Tramite la scelta del tipo di azione nell'apposita tendina in chat
* Tramite carattere speciale, quando selezionato il tipo "Azione"


```php
function gdrcd_chat_write_message($message, $tag_o_destinatario = '', $type = null) {
    // $type rappresenta la scelta della tendina
    // Nel caso di "Azione", il tipo viene determinato dal
    // carattere speciale ad inizio messsaggio (es: @ per i sussurri)
    if (empty($type)) {
        $type = gdrcd_chat_get_type_from_message($message);
    }

    switch ($type) {
        // se il tipo individuato è "Azione" (A)
        case GDRCD_CHAT_ACTION_TYPE:
            // usa questa funzione per inserirlo a db e ritorna l'esito
            return gdrcd_chat_action_save($tag_o_destinatario, $message);

        // ... altri tipi

        default:
            return gdrcd_chat_api_invalid(...);
    }
}
```

#### 2. gdrcd_chat_db_insert_for_login()
Utilizza internamente `gdrcd_chat_db_insert()` per salvare il messaggio nella tabella `chat` del database associata al personaggio connesso.


```php
function gdrcd_chat_db_insert_for_login($tag_o_destinatario, $tipo, $testo) {
    gdrcd_chat_db_insert(
        $_SESSION['luogo'],
        [$_SESSION['sesso'], $_SESSION['img_razza']],
        $_SESSION['login'],
        $tag_o_destinatario,
        $tipo,
        $testo
    );
}

function gdrcd_chat_db_insert(
    $stanza,
    $imgs,
    $mittente,
    $tag_o_destinatario,
    $tipo,
    $testo
) {
    gdrcd_stmt(
        'INSERT INTO chat (stanza, imgs, mittente, destinatario, ora, tipo, testo)
        VALUES (?, ?, ?, ?, NOW(), ?, ?)',
        [
            'isssss',
            $stanza,
            implode(';', $imgs),
            $mittente,
            $tag_o_destinatario,
            $tipo,
            $testo
        ]
    );
}
```

#### 3. gdrcd_api_output()
Restituisce la risposta (successo o errore) al frontend:

```php
function gdrcd_api_output($status) {
    // Vedi esempio sopra
}
```

---

## 3. Sistema Abilità / Skill System (`skillsystem`)

![chat_skillsystem](/chat/chat_skillsystem.png)

### Descrizione Flusso

1. Il flusso del sistema abilità viene attivato quando l'utente invia il form dei tiri in chat.
2. Il frontend invia una richiesta POST a `/ajax.php?page=chat&op=skillsystem`, che viene gestita da `/pages/chat/op/skillsystem.inc.php`.
3. In base alla selezione dell'utente (`skills`, `stats`, `dice`, `items`), viene invocata la funzione PHP corretta per gestire la richiesta.

### File Operation

**/pages/chat/op/write.inc.php** è il file responsabile per il lancio di una determinata prova/lancio/uso oggetto in base alla selezione utente nel form in chat, tramite le funzioni chiave mostrate di seguito:

```php
switch ($selezione_tiro) {
    case 'skills':
        $output = gdrcd_chat_use_skill($id_ab);
        break;
    case 'stats':
        $output = gdrcd_chat_use_stats($id_stats);
        break;
    case 'dice':
        $output = gdrcd_chat_use_dice($dice, $dice_number, $dice_modifier, $dice_threshold);
        break;
    case 'items':
        $output = gdrcd_chat_use_item($id_item);
        break;
    default:
        $output = gdrcd_chat_api_invalid(...);
        break;
}

gdrcd_api_output($output);
```

**Nello specifico:**

- `gdrcd_chat_use_skill()` – Effettua un tiro su abilità.
- `gdrcd_chat_use_stats()` – Effettua un tiro su caratteristica.
- `gdrcd_chat_use_dice()` – Lancia i dadi.
- `gdrcd_chat_use_item()` – Usa un oggetto.

Queste funzioni invocano a loro volta `gdrcd_chat_write_message()` per gestire l'inserimento dell'azione a questo punto il flusso procede come una normalissima scrittura.

---

## Note Generali

- Tutti i flussi si basano su AJAX e su risposte JSON standardizzate tramite `gdrcd_api_output()`.
- Ogni flusso ha un "Sad Path" che restituisce un messaggio di errore al frontend in caso di dati non validi o permessi insufficienti.
- La logica di formattazione dei messaggi è centralizzata in `functions.chat_read.inc.php`, mentre la logica di scrittura/insert in `functions.chat_write.inc.php`.

---

## Riferimenti Codice

**Frontend:**
Visualizzazione chat e codice javascript necessario al funzionamento.
- `/pages/chat/chat_box.php`
- `/pages/chat/chat_input.php`

**Operations:**
Responsabili di gestire le richieste in arrivo dal frontend e ritornare un output.
- `/pages/chat/op/read.inc.php`
- `/pages/chat/op/skillsystem.inc.php`
- `/pages/chat/op/write.inc.php`

**Functions:**
Funzioni di core che implementano ogni dettaglio di funzionamento della chat.
- `/includes/functions.chat_core.inc.php`
- `/includes/functions.chat_read.inc.php`
- `/includes/functions.chat_write.inc.php`
