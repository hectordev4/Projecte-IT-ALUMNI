# CASOS DE ÚS - MVP PROJECTE ITALUMNI

  

Aquest document recull els principals casos d’ús contemplats en el MVP de la plataforma ITALUMNI, estructurats en dues seccions: Històries d’usuari i escenaris de test en format Gherkin (Behavior Driven Development).

  

## HISTÒRIES D'USUARI AMB CRITERIS D'ACCEPTACIÓ

  

Aquestes històries d’usuari, amb els seus criteris d’acceptació, defineixen els requeriments funcionals del MVP d’**ITALUMNI** i serveixen com a base per validar i testar el desenvolupament. Es poden transformar fàcilment en escenaris Gherkin per a proves de comportament (BDD).

  

---

  

### Èpica 3: Xarxa entre exalumnes

  

#### HU3.1 - Cerca i exploració de membres

*Com a* exalumne/a,  

*vull* poder cercar i explorar membres per nom o competències,  

*per a* connectar amb altres professionals i ampliar la meva xarxa.

  

**Criteris d’acceptació:**

- Es pot fer cerques per nom o per paraules clau de competències.

- Els resultats es poden filtrar per activitat recent, stack, nivell i situació laboral.

- Els perfils mostrats tenen informació pública mínima: nom, stack principal, ubicació i disponibilitat.

  

#### HU3.2 - Visualització de perfils públics

*Com a* exalumne/a,  

*vull* veure perfils públics d’altres membres,  

*per a* conèixer les seves experiències i especialitats.

  

**Criteris d’acceptació:**

- El perfil mostra nom, stack, ubicació i disponibilitat laboral.

- No es mostra informació privada o no autoritzada per l’usuari.

  

#### HU3.3 - Sol·licitud i acceptació de connexió

*Com a* exalumne/a,  

*vull* enviar sol·licituds de connexió a altres membres i acceptar les que rebo,  

*per a* crear la meva xarxa de contactes dins la comunitat.

  

**Criteris d’acceptació:**

- Es pot enviar una sol·licitud de connexió des del perfil d’un altre usuari.

- L’usuari destinatari rep la notificació i pot acceptar o rebutjar la sol·licitud.

- Les connexions acceptades permeten accedir a més informació bàsica del contacte.

  

---

  

### Èpica 4: Borsa de treball

  

#### HU4.1 - Visualització d’ofertes laborals

*Com a* exalumne/a,  

*vull* veure les ofertes laborals disponibles,  

*per a* explorar oportunitats d’ocupació relacionades amb el meu perfil.

  

**Criteris d’acceptació:**

- Es mostren ofertes públiques amb informació bàsica: títol, empresa, localització, tipus de contracte i stack.

- Es poden filtrar ofertes per stack, tipus de contracte i localització.

- Es poden marcar ofertes com a preferides per guardar-les.

  

#### HU4.2 - Aplicació a ofertes

*Com a* exalumne/a,  

*vull* aplicar directament a les ofertes o ser redirigit a plataformes externes,  

*per a* facilitar el procés d’inscripció.

  

**Criteris d’acceptació:**

- Les ofertes que permeten aplicar mostren un botó d’aplicació.

- Algunes ofertes redirigeixen a pàgines externes per completar la candidatura.

  

#### HU4.3 - Publicació d’ofertes (Tècnics/Admins)

*Com a* tècnic/a o administrador/a,  

*vull* poder crear i publicar ofertes laborals,  

*per a* compartir oportunitats amb la comunitat.

  

**Criteris d’acceptació:**

- Existeix un formulari per crear ofertes amb camps obligatoris.

- Les ofertes publicades es visualitzen immediatament a la borsa de treball.

  

---

  

### Èpica 5: Esdeveniments i activitats

  

#### HU5.1 - Visualització de calendari d’esdeveniments

*Com a* exalumne/a,  

*vull* veure un calendari amb esdeveniments rellevants,  

*per a* planificar la meva participació.

  

**Criteris d’acceptació:**

- Es mostra un calendari amb esdeveniments públics i privats.

- Cada esdeveniment té data, hora, títol i descripció.

  

#### HU5.2 - Inscripció a esdeveniments

*Com a* exalumne/a,  

*vull* inscriure’m a esdeveniments oberts o privats,  

*per a* assegurar la meva assistència.

  

**Criteris d’acceptació:**

- Es pot fer inscripció des de la fitxa de l’esdeveniment.

- L’usuari rep confirmació de la inscripció.

  

---

  

### Èpica 8: Administració de la plataforma

  

#### HU8.1 - Gestió bàsica d’ofertes i esdeveniments

*Com a* administrador/a o tècnic/a,  

*vull* gestionar continguts bàsics com ofertes i esdeveniments,  

*per a* mantenir la plataforma actualitzada.

  

**Criteris d’acceptació:**

- Els admins poden editar i eliminar ofertes i esdeveniments.

- La interfície de gestió és senzilla i limitada a les funcionalitats MVP.

  

---

  

## ESCENARIS GHERKIN - BDD - GHERKIN

  

### Feature: Cerca i exploració de membres - EP3

```gherkin

Scenario: Cercar membres per nom

  Given estic a la pàgina de cerca de membres

  When introdueixo el nom "Anna"

  Then veig una llista de membres que coincideixen amb "Anna"

  

Scenario: Filtrar membres per stack i disponibilitat

  Given estic a la pàgina de cerca de membres

  When selecciono el filtre "Stack: JavaScript" i "Disponible per a feina"

  Then veig només membres que compleixen aquests filtres

```

  

### Feature: Sol·licitud i acceptació de connexió - EP3

```gherkin

Scenario: Enviar sol·licitud de connexió

  Given estic veient el perfil d’un altre exalumne

  When faig clic a "Enviar sol·licitud de connexió"

  Then rebo confirmació que la sol·licitud ha estat enviada

  

Scenario: Acceptar sol·licitud de connexió

  Given he rebut una sol·licitud de connexió

  When accepto la sol·licitud

  Then la connexió queda establerta i puc veure més informació del contacte

```

  

### Feature: Visualització i aplicació a ofertes laborals - EP4

```gherkin

Scenario: Visualitzar ofertes laborals

  Given estic a la borsa de treball

  When accedeixo a la pàgina

  Then veig la llista d’ofertes amb informació bàsica

  

Scenario: Aplicar a una oferta amb aplicació directa

  Given estic veient una oferta amb aplicació directa

  When faig clic a "Aplica"

  Then s’obre un formulari d’aplicació o confirmació

  

Scenario: Aplicar a una oferta amb redirecció

  Given estic veient una oferta que redirigeix a plataforma externa

  When faig clic a "Aplica"

  Then s’obre la pàgina externa corresponent

```

  

### Feature: Inscripció a esdeveniments - EP5

```gherkin

Scenario: Inscriure’m a un esdeveniment obert

  Given estic a la fitxa d’un esdeveniment obert

  When faig clic a "Inscriu-te"

  Then rebo confirmació d’inscripció

  

Scenario: Veure calendari d’esdeveniments

  Given estic a la pàgina d’esdeveniments

  When accedeixo al calendari

  Then veig tots els esdeveniments programats

```

  

### Feature: Gestió d’ofertes i esdeveniments (Admin) - EP8

```gherkin

Scenario: Crear una oferta laboral

  Given soc administrador/a

  When empleno el formulari de nova oferta i la publico

  Then l’oferta apareix a la borsa de treball

  

Scenario: Editar un esdeveniment existent

  Given soc administrador/a

  When modifico les dades d’un esdeveniment i guardo els canvis

  Then els canvis es reflecteixen a la plataforma

```