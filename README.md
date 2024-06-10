[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6M1uOS06)

# Inleiding

De evaluatie van het OPO Backend frameworks bestaat voor 100% uit een examenopdracht die je **individueel** maakt,
onder begeleiding van je lector.

Je kiest een onderwerp en bouwt hierrond een mobiele applicatie die grondig getest is en werkt op Android toestellen en
als PWA.
De keuze wat betreft het onderwerp is volledig vrij, je kan bijvoorbeeld een app bouwen rond een hobby, voor
een vereniging waar je deel van uitmaakt, …
Als je geen inspiratie hebt kan je eventueel een app uitzoeken die je regelmatig gebruikt en deze (deels) nabouwen.

Je maakt hierbij verplicht gebruik van het **Ionic framework**.
Daarbovenop moet het project uitgewerkt worden met behulp van **Angular** en gepubliceerd worden als een Android app
met **Capacitor**.
Als je het project in native JavaScript, React of Vue bouwt kan je **geen** punten verdienen.
De UI moet adaptive zijn, i.e. deze moet zich automatisch aanpassen aan het besturingssysteem waarop de applicatie
draait (iOS of Android).


# Projectvereisten

Het project wordt in twee variaties aangeboden.
Een variatie met minimale vereisten om te slagen en een variatie met zwaardere vereisten waarmee je een hogere score kan
behalen.
De puntenverdeling is als volgt:

* 85% is te verdienen door te beantwoorden aan de *functionele vereisten*
  * Minimale vereisten: 65%
  * Uitgebreide vereisten: 20%
* 15% is te verdienen door een kwalitatieve, complexe en grote app te schrijven

## Toegestane hulpmiddelen

Je mag voor dit project gebruik maken van bronnen zoals tutorials, voorbeelden en StackOverflow.
Dit betekent echter niet dat je project hier volledig op gebaseerd is.
We controleren je inzendingen en indien grote gelijkenissen met online bronnen gedetecteerd worden, dan is dit plagiaat
en wordt een fraudeprocedure gestart.

Generative AI-tools mogen gebruikt worden, maar we verwachten dat je alle code die door deze tools gegenereerd zijn kan
verklaren.
Dit wordt dan ook ondervraagt op de mondelinge verdediging.

Het is toegestaan om delen uit de lesvoorbeelden of opgeloste oefeningen te herbruiken.
**Als je dit doet, moet je dit op een innovatieve manier doen, anders verdien je hier geen punten mee.**
Hieronder zijn enkele voorbeelden te vinden, als je toch nog een specifieke vraag hebt over het al dan niet herbruiken
van bepaalde code, dan contacteer je jouw lector hierover.

## Begeleiding

Tijdens het bouwen van de applicatie is het toegestaan raad te vragen aan de begeleidende docent.

Vragen over leerstof die gezien is tijdens de lessen worden zelden beantwoord, je wordt meestal doorverwezen naar het
relevante lesmateriaal.
Als je echter kan aantonen dat je het cursusmateriaal gebruikt heb en geprobeerd hebt om een feature zelf te
implementeren, word je geholpen, ook als dit gaat over leerstof die wel in de les behandeld is.
Vragen over features van Angular/Ionic/Capacitor die in geen enkele oefening gezien zijn worden wel beantwoord.

Met vragen over conceptuele problemen zoals het structureren van je app of dingen die je niet geprogrammeerd krijgt,
maar die los staan van de (geziene) Angular/Ionic/Capacitor features kan je altijd terecht bij je begeleidende docent.
Je wordt gecoacht in het vinden van een oplossing.

Indien er problemen ontstaan door bibliotheken die niet meer werken door updates, updates van de IDE, deprecated
features … kan je ook hierover hulp vragen.

## Kwaliteit

De kwaliteit van je code wordt beoordeeld op basis van onderstaande, **niet exhaustieve**, lijst.
Omdat je voor een functionerend project al veel punten kunt verdienen (85%) wordt de kwaliteit en complexiteit van je
code streng beoordeeld.

* Naamgeving van variabelen
  * Correct gebruik van enkelvoud/meervoud in de namen
  * Duidelijke namen
* Types
  * Types van variabelen
  * Types van functies
* Gebruik van enums waar toepasbaar
* Geen diep geneste callbacks
* Gebruik van klassen/interfaces in de plaats van objecten met het any type
* Consistentie in de code, geen mix van () =&gt; {} en function() {} (voor methode namen, callbacks kunnen natuurlijk
  wel als arrow function gedefinieerd worden als de rest de klassieke syntax gebruikt.)
* Volgen van de linting regels die door Ionic geconfigureerd worden in ESLint.
* Geen hard gecodeerde gegevens
* Voldoende gebruik van services
* Opsplitsen in componenten waar nuttig
* Leesbaarheid

## Minimale vereisten

Als je project voldoet aan onderstaande vereisten, kan je, op voorwaarde dat de code een minimum aan bugs en een
bruikbare UI bevat, maximaal een **13/20** scoren voor de functionele eisen.
Je kan natuurlijk nog steeds punten verdienen voor de kwaliteit van je code en zo maximaal een **16/20** behalen.
Hoe meer van deze vereisten ontbreken en hoe meer bugs er zijn, hoe lager je zult scoren.
Je eindresultaat is meer dan de som van je punten.
Je eindresultaat voor de minimale vereisten wordt vermenigvuldigd met één van onderstaande factoren, afhankelijk van het
aantal ontbrekende features en het aantal bugs.

![](https://it-graduaten-javascript.netlify.app/images/exams/backend/beoordelingstabel.webp)

Hier worden volgende definities gebruikt:

* Uitstekend: Na grondig testen geen enkele bug tegengekomen en een duidelijke UI waar alles in terug te vinden is
  zonder problemen en die steeds de juiste data weergeeft.
* Zeer goed: Na grondig testen een bug of twee gevonden en/of hier en daar een onduidelijke UI of een UI die niet goed
  bruikbaar is, maar die nog steeds de juiste data weergeeft.
* Goed: Meer dan de helft van de aanwezige functionaliteiten werken, maar vertonen bugs en/of een foute UI die niet
  altijd de juiste data bevat of UI-elementen die onbruikbaar worden.
* Minimaal: Minder dan de helft van de aanwezige functionaliteiten werken volledig en de UI vertoont regelmatig foute
  data of onbruikbare onderdelen.
* Ondermaats: Minder dan 1/3 van de functionaliteiten werken zonder bugs en/of de UI vertoont regelmatig foute data of
  onbruikbare onderdelen.
* Niet bruikbaar: Geen van de aanwezige functionaliteiten werken zonder bugs.

### Pagina’s

Voeg minstens **vier** pagina’s toe aan je applicatie, waarvan er één enkel statische gegevens mag bevatten.
Zorg dat je tussen deze pagina’s kan navigeren, hoe je dat doet (side-menu, tabs, nog iets anders) beslis je zelf.
De pagina’s mogen een combinatie van statische en hard gecodeerde data bevatten, maar minstens drie pagina's moeten
onderdelen bevatten die dynamisch opgebouwd zijn.
Elke van deze drie pagina's moet dus property binding of 2-way data binding gebruiken, daarbovenop moet de data
opgehaald worden via een service die een database aanspreekt (lokaal of online).

#### Dynamische data

Om te voldoen aan de minimumvereisten moet elke dynamische pagina minstens objecten bevatten met twee of meer
attributen (**id niet meegeteld**).
Daarnaast moet minstens één pagina objecten gebruiken met zes of meer attributen (**id niet meegeteld**).

Voor bovengenoemde objecten moeten alle CRUD-operaties voorzien worden.
Daarnaast moet er tijdens het invoegen van nieuwe data de nodige validatie gebeuren.

### Plug-ins

Gebruik minstens **twee** plug-ins.
Twee plug-ins is niet veel.
Network, storage, en notifications kunnen in zo goed als elke app gebruikt worden.
Indien je een plug-in gebruikt die we niet gezien hebben of geziene plug-ins gebruikt op een nieuwe manier, zal dat de
punten voor de kwaliteit en complexiteit van je project ten goede komen.

**Gebruik de plug-ins op een zinvolle manier**.
Een controle op de netwerkverbinding, maar verder geen gebruik maken van deze verbinding zal je geen punten opleven, ook
al werkt de code zonder fouten.
Ook authentication wordt niet meegeteld tenzij je iets doet met de gebruikersinformatie.

**Een plug-in is een library die geschreven is voor **Capacitor** en een brug vormt tussen het operating
system (Android/iOS) en de web-layer.
Een JavaScript library die je installeert via *pnpm* is *niet automatisch* een plug-in, de library moet een brug
vormen tussen JavaScript en het OS en moet dus Swift/Java/Kotlin code oproepen.
Onderstaande plug-ins tellen *niet mee* omdat Ionic hier al elementen voor bevat.**

* [@capacitor/action-sheet](https://capacitorjs.com/docs/apis/action-sheet)
* [@capacitor/dialog](https://capacitorjs.com/docs/apis/dialog)
* [@capacitor/toast](https://capacitorjs.com/docs/apis/toast)

Verder telt [@ionic/storage](https://github.com/ionic-team/ionic-storage) ook **niet** mee als plug-in omdat Capacitor
een beter alternatief bevat, zoals in de les besproken is.

Voor inspiratie verwijzen we door naar:

* [https://github.com/riderx/awesome-capacitor](https://github.com/riderx/awesome-capacitor)
* [https://github.com/capacitor-community](https://github.com/capacitor-community)

Tenslotte tellen ook de plug-ins die standaard geïnstalleerd zijn niet mee, **tenzij je hier iets zinvol mee doet dat
niet automatisch gegenereerd wordt**.

* [@capacitor/app](https://capacitorjs.com/docs/apis/app)
* [@capacitor/haptics](https://capacitorjs.com/docs/apis/haptics)
* [@capacitor/keyboard](https://capacitorjs.com/docs/apis/keyboard)
* [@capacitor/status-bar](https://capacitorjs.com/docs/apis/status-bar)

### Online services

Je moet minstens **één** online service gebruiken.
Dit kan een API, Firestore, Firebase Authentication, Supabase, AppWrite, ... zijn.
Natuurlijk moet dit opnieuw op een zinvolle manier gebeuren.
User authentication heeft, als je verder geen gebruik maakt van de gebruikersnaam, het e-mailadres, het GSM-nummer of
andere user gegevens, geen zin.
Een foto uploaden naar Firebase en vervolgens de foto enkel uit de locale storage lezen heeft ook geen zin.

### Logo & Splash

Zorg dat je applicatie een gepast logo en splash screen heeft.
Je wordt **niet** beoordeeld op de kwaliteit van je icoon en/of splash screen, enkel op de aanwezigheid.
De enige voorwaarde is dat de gebruikte afbeeldingen moeten verschillen van diegene die gebruikt werden in de les.

### Publicatie

Je bouwt een **ondertekende** APK voor je applicatie
([zie les 5](https://it-graduaten-javascript.netlify.app/lessen/backend/lecture5.md#genereren-van-een-keystore)) en je voegt deze toe aan je project in de GitHub
classroom.

Je applicatie moet beschikbaar zijn een PWA via Firebase hosting of een andere hosting provider (dit telt **niet** mee
voor de online services).
De PWA app moet niet enkel bruikbaar zijn als web app maar moet ook geïnstalleerd kunnen worden via de website.
Enkel het hosten is **niet** voldoende.
Maak gebruik van een tool zoals
[https://www.seoreviewtools.com/pwa-testing-tool/](https://www.seoreviewtools.com/pwa-testing-tool/) om te controleren
of je PWA volledig in orde is.

Voeg de URL van je PWA toe in de README.md in je repository.

### Persistentie

**Je app moet dynamische gegevens bevatten.**
Dit betekent dat de gebruiker wijzigingen moet kunnen aanbrengen en dat deze wijzigingen bewaard moeten kunnen worden.
Zorg dat de acties van de gebruiker bewaard blijven nadat de app herstart wordt.
Hoe je dit doet, bepaal je zelf, je kan gebruiken maken van de Capacitor Storage plug-in, een embedded SQLite
database, een document database op Firebase, een SQL-database op Supabase, een eigen geschreven API, een SQLite database
gehost via [Turso](https://turso.tech/), ...

## Uitgebreide vereisten

Als je project voldoet aan onderstaande vereisten, kan je, op voorwaarde dat de code een minimum aan bugs en een
bruikbare UI bevat, maximaal een 17/17 halen voor de functionele eisen.
Je kan natuurlijk nog steeds extra punten verdienen voor de kwaliteit van je code en zo maximaal een 20/20 scoren voor
dit project.

**Alle minimale vereisten blijven nog steeds gelden.**

### Pagina’s

Alle vier de pagina’s in je applicatie moeten *dynamische* gegevens bevatten.

### Plug-ins

Gebruik minstens **drie** plug-ins.

### Online services

Gebruik **drie** verschillende online services.
Waarvan er minstens één geen deel uitmaakt van Firebase.

### Publicatie

De PWA app moet bruikbaar zijn op een desktop computer.
Je moet dus een responsieve lay-out voorzien.
Je kan hiervoor gebruik maken van de &lt;ion-split-pane&gt;, &lt;ion-grid&gt;, &lt;ion-row&gt; en &lt;ion-col&gt;
componenten.

### Persistentie

Je app moet de gebruiker de optie bieden om de gegevens in de cloud te bewaren.
Hiervoor moet **user authenticatie** voorzien worden zodat gegevens **per gebruiker** bewaard worden.
Dit betekent niet dat de gebruiker noodzakelijk ingelogd moet zijn om de app te gebruiken.
Je kan er ook voor kiezen de gebruiker pas te laten inloggen als hij aangeeft dat de gegevens in de cloud bewaard moeten
worden en anders een local database gebruiken.

De user authentication en cloud opslag tellen mee als twee van de drie cloud services.

## Deadline & verdediging

De deadline voor het project is op Canvas te vinden, de GitHub classroom sluit zich ook automatisch af als deze
deadline gepasseerd is.

Tijdens de examenperiode kom je het project mondeling verdedigen.
Je toont wat je gebouwd hebt en je krijgt een aantal vragen om te polsen of je de code begrijpt en deze zelf geschreven
hebt.
 
