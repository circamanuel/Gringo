

![Forum Project Title](assets/Titelbild.webp)

# **Detaillierte Installationsanleitung für das Forum-Projekt (Spring Boot & React)**

Diese Anleitung beschreibt **Schritt für Schritt**, wie du das **Forum-Projekt** auf deinem lokalen Rechner **installierst und startest**.  
Die Anwendung besteht aus **zwei Hauptkomponenten**:
1️⃣ **Backend** (Spring Boot + MySQL) – API & Datenbankverwaltung  
2️⃣ **Frontend** (React) – Benutzeroberfläche

---  

## **1. Voraussetzungen für die Installation**

Stelle sicher, dass die folgenden Programme auf deinem Rechner installiert sind:

### 🔹 **Backend (Spring Boot)**
✅ [Java 17 oder höher](https://adoptium.net/)  
✅ [Apache Maven](https://maven.apache.org/)  
✅ [MySQL (Datenbank)](https://dev.mysql.com/downloads/) oder **alternativ** MariaDB/PostgreSQL

### 🔹 **Frontend (React)**
✅ [Node.js (LTS-Version empfohlen)](https://nodejs.org/)  
✅ npm (wird mit Node.js installiert)

---  

## **2. Backend installieren & starten (Spring Boot + MySQL)**

### **Schritt 1: Repository klonen**
Zuerst klonst du das Backend-Repository mit **Git**:
```bash
git clone https://github.com/dein-user/forum-backend.git
cd forum-backend
```
Falls du Git nicht installiert hast, kannst du das Repository auch als ZIP herunterladen und entpacken.

---

###  **Schritt 2: MySQL-Datenbank einrichten**
Das Forum benötigt eine **MySQL-Datenbank**, um Benutzer, Foren und Beiträge zu speichern.

1️⃣ **Starte MySQL**
- Falls MySQL lokal installiert ist, starte den MySQL-Server.
- Falls du Docker nutzt, kannst du MySQL mit folgendem Befehl starten:
  ```bash
  docker run --name forum-db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=forum_db -p 3306:3306 -d mysql:latest
  ```

2️⃣ **Erstelle eine neue Datenbank**
- Melde dich mit MySQL Workbench oder über die Konsole an:
  ```bash
  mysql -u root -p
  ```
- Führe diesen Befehl aus, um die Datenbank zu erstellen:
  ```sql
  CREATE DATABASE forum_db;
  ```

3️⃣ **Datenbank-Zugangsdaten konfigurieren**  
Öffne die Datei **`src/main/resources/application.properties`** und stelle sicher, dass die Zugangsdaten stimmen:
```
spring.datasource.url=jdbc:mysql://localhost:3306/forum_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
Falls dein MySQL-Server einen anderen Benutzer oder ein anderes Passwort hat, passe die Werte entsprechend an.

---

### - **Schritt 3: Backend-Abhängigkeiten installieren**
```bash
mvn clean install
```
Falls Maven nicht erkannt wird, überprüfe deine Installation mit:
```bash
mvn -version
```

---

###  **Schritt 4: Backend starten**
```bash
mvn spring-boot:run
```
Sobald der Server läuft, sollte die Konsole eine Ausgabe wie diese zeigen:
```
Started ForumApplication in 3.452 seconds (JVM running for 3.981)
```
✅ **Das Backend läuft nun unter:** **`http://localhost:8080`**

Falls Port 8080 bereits belegt ist, kannst du den Port in **`application.properties`** ändern:
```
server.port=9090
```

---

## ** 3. Frontend installieren & starten (React.js)**

###  **Schritt 1: Repository klonen**
Öffne ein neues Terminal und klone das **Frontend**-Repository:
```bash
git clone https://github.com/dein-user/forum-frontend.git
cd forum-frontend
```

---

###  **Schritt 2: Abhängigkeiten installieren**
```bash
npm install
```
Falls es Fehler gibt:
- Stelle sicher, dass **Node.js** installiert ist (`node -v`).
- Falls Fehler zu inkompatiblen Versionen auftreten, versuche:
  ```bash
  npm install --legacy-peer-deps
  ```

---

###  **Schritt 3: Frontend starten**
```bash
npm start
```
✅ **Das Frontend läuft nun unter:** **`http://localhost:3000`**

Falls ein anderer Prozess bereits auf Port 3000 läuft, kannst du ihn mit **Ctrl + C** stoppen oder das Frontend mit einem anderen Port starten:
```bash
PORT=4000 npm start
```

---

## ** 4. Login & Nutzung der Anwendung**

1️⃣ **Registriere einen neuen Benutzer**
- Öffne das Frontend: [`http://localhost:3000`](http://localhost:3000)
- Gehe zur `Register`-Seite und erstelle einen Account

2️⃣ **Anmelden & Forum nutzen**
- Logge dich mit Benutzername & Passwort ein
- Erstelle Foren und Beiträge
- Alle Posts werden mit Benutzernamen und Erstellungsdatum angezeigt

---

## ** 5. API-Endpunkte testen (Optional mit Postman)**

Falls du **Postman** oder eine andere API-Testumgebung nutzen möchtest, kannst du folgende Requests ausführen:

🔹 **Benutzer registrieren**
```
POST http://localhost:8080/api/auth/register
Body: {
  "username": "testuser",
  "password": "testpassword"
}
```

🔹 **Login**
```
POST http://localhost:8080/api/auth/login
Body: {
  "username": "testuser",
  "password": "testpassword"
}
```

🔹 **Forum erstellen**
```
POST http://localhost:8080/api/forums
Headers: { "Authorization": "Bearer <TOKEN>" }
Body: {
  "title": "Test Forum",
  "description": "Dies ist ein Testforum."
}
```

🔹 **Post erstellen**
```
POST http://localhost:8080/api/posts
Headers: { "Authorization": "Bearer <TOKEN>" }
Body: {
  "forumId": 1,
  "content": "Das ist ein Testbeitrag",
  "username": "testuser"
}
```

---

## ** 6. Fehlerbehebung & Troubleshooting**

### ❌ **Fehler: Port 8080 already in use**
✅ **Lösung:**  
Finde den Prozess, der Port 8080 blockiert:
```bash
netstat -ano | findstr :8080
```
Beende den Prozess:
```bash
taskkill /PID <PID> /F
```

### ❌ **Fehler: npm start schlägt fehl**
✅ **Lösung:**
- Stelle sicher, dass **Node.js** und **npm** installiert sind
- Lösche den `node_modules`-Ordner und installiere erneut:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npm start
  ```

### ❌ **Fehler: "JWT signature does not match"**
✅ **Lösung:**
- Starte das Backend neu (`mvn spring-boot:run`)
- Lösche das alte Token aus **localStorage** im Browser

---

## ** 7. Weiterentwicklung & Contribution**
Falls du zur Weiterentwicklung beitragen möchtest:
1. **Forke das Repository**
2. **Erstelle einen Feature-Branch**
3. **Commite deine Änderungen & erstelle einen Pull Request**

---


# ** 2. Einleitung und Anforderungsanalyse (User Stories)**

---

## ** 2.1 Einleitung**

Die Digitalisierung hat dazu geführt, dass Online-Foren eine zentrale Rolle im Austausch von Wissen und Diskussionen spielen. Unser Projekt zielt darauf ab, eine **benutzerfreundliche und sichere Multiuser-Webanwendung** zu entwickeln, die es Nutzern ermöglicht, sich zu registrieren, Foren zu erstellen und Beiträge zu verfassen.

Diese Anwendung wird in **Spring Boot** für das Backend und **React** für das Frontend entwickelt. Die Daten werden in einer **MySQL-Datenbank** gespeichert, während die Kommunikation zwischen Backend und Frontend über eine **RESTful API** erfolgt.

Die Anwendung richtet sich an eine breite Nutzerbasis, die eine **intuitive Plattform** zum Meinungsaustausch, zur Diskussion und zur Community-Bildung nutzen möchte.

---

## ** 2.2 Anforderungsanalyse**

### **Funktionale Anforderungen**
✔ Benutzer können sich **registrieren und anmelden**  
✔ Benutzer können **Foren erstellen, bearbeiten und löschen**  
✔ Benutzer können **Beiträge in Foren schreiben, bearbeiten und löschen**  
✔ Gäste können **öffentliche Foren und Beiträge lesen**  
✔ Zugriffskontrolle über **JWT-Authentifizierung**  
✔ Automatische Speicherung der Erstellungszeit von Posts

### **Nicht-funktionale Anforderungen**
✔ Die Anwendung muss eine **flüssige und reaktionsschnelle Benutzeroberfläche** haben  
✔ Sichere **Passwortverschlüsselung** (BCrypt)  
✔ Datenübertragung über **HTTPS (TLS 1.2/1.3)**  
✔ Skalierbarkeit durch **Microservices-Architektur** möglich  
✔ **RESTful API-Schnittstelle** für zukünftige Erweiterungen

---

## ** 2.3 User Stories**

### **🔹 Registrierung und Login**
> *"Als Benutzer möchte ich mich registrieren und anmelden können, um Foren und Beiträge zu erstellen."*

**Akzeptanzkriterien:**
- Benutzer kann sich mit **Benutzername und Passwort** registrieren
- Passwort wird **verschlüsselt gespeichert**
- Benutzer kann sich mit **gültigen Zugangsdaten** anmelden

---

### **🔹 Forenerstellung**
> *"Als registrierter Benutzer möchte ich neue Foren zu verschiedenen Themen erstellen können."*

**Akzeptanzkriterien:**
- Benutzer kann **Titel und Beschreibung** für ein Forum eingeben
- Das Forum wird in der **Forenliste** angezeigt
- Nur der **Ersteller oder Admin** kann das Forum löschen

---

### **🔹 Beitragsveröffentlichung**
> *"Als registrierter Benutzer möchte ich Beiträge in einem Forum erstellen können."*

**Akzeptanzkriterien:**
- Benutzer kann **Textbeiträge schreiben**
- Beiträge werden in einer **Liste innerhalb des Forums angezeigt**
- Beiträge enthalten **Erstellungsdatum und Autor**

---

### **🔹 Beiträge bearbeiten und löschen**
> *"Als registrierter Benutzer möchte ich meine eigenen Beiträge bearbeiten oder löschen können."*

**Akzeptanzkriterien:**
- Benutzer kann **eigene Beiträge bearbeiten**
- Benutzer kann **eigene Beiträge löschen**
- **Admins können alle Beiträge bearbeiten oder löschen**

---

### **🔹 Öffentliche vs. Private Foren**
> *"Als Gast möchte ich öffentliche Foren lesen können, ohne mich anmelden zu müssen."*

**Akzeptanzkriterien:**
- Öffentliche Foren können **von jedem Benutzer** eingesehen werden
- Private Foren erfordern **eine Anmeldung**
- Gäste können **keine Beiträge verfassen oder Foren erstellen**

---

### **🔹 Sicherheit**
> *"Als Entwickler möchte ich sicherstellen, dass nur authentifizierte Benutzer Änderungen an Foren oder Beiträgen vornehmen können."*

**Akzeptanzkriterien:**
- **JWT-Authentifizierung** wird für geschützte API-Endpunkte verwendet
- Benutzer können sich **abmelden und den Token invalidieren**
- **SQL-Injection- und XSS-Schutz** ist implementiert

---

### **- Fazit der Anforderungsanalyse**
Die oben definierten Anforderungen bilden die **Grundlage für die Entwicklung** der Anwendung. Die User Stories ermöglichen eine **iterative Entwicklung**, bei der zunächst **essenzielle Funktionen** umgesetzt werden. Sicherheit, Benutzerfreundlichkeit und Skalierbarkeit sind dabei zentrale Aspekte.

---

### ✅ **Nächster Abschnitt: 3. Sicherheitskonzept** ✅

# **3. Sicherheitskonzept**

---

## **3.1 Ziel des Sicherheitskonzepts**
Die Sicherheit der Anwendung ist essenziell, um **Datenmissbrauch, unbefugten Zugriff und Angriffe** zu verhindern. Das Sicherheitskonzept umfasst Mechanismen für **Authentifizierung, Zugriffskontrolle, Datensicherheit und Angriffsschutz**.

---

## **3.2 Authentifizierung und Autorisierung**
Die Benutzeranmeldung erfolgt über eine **JWT-basierte Authentifizierung**. Nach erfolgreicher Anmeldung wird dem Benutzer ein **JSON Web Token (JWT)** ausgestellt, das bei jeder weiteren Anfrage zur Identifikation genutzt wird.

### **🔹 Token-basierte Authentifizierung**
✔ Jeder Benutzer erhält nach dem Login ein **JWT-Token**, das die Identität bestätigt  
✔ Das Token wird im **localStorage** oder **sessionStorage** gespeichert  
✔ Bei jeder Anfrage an geschützte API-Endpunkte muss das Token im **Authorization Header** mitgesendet werden  
✔ Das Backend überprüft das Token über **JwtUtil** und entscheidet, ob der Zugriff gewährt wird

### **🔹 Ablauf der Authentifizierung**
1️⃣ Benutzer sendet **Benutzername und Passwort** an den **/api/auth/login** Endpunkt  
2️⃣ Das Backend validiert die Zugangsdaten und erstellt ein **JWT-Token**  
3️⃣ Das Token wird im Frontend gespeichert  
4️⃣ API-Anfragen müssen das Token im **Authorization Header** mitführen  
5️⃣ Das Backend überprüft das Token mit **JwtUtil** bei jeder Anfrage

---

## **3.3 Zugriffskontrolle und Benutzerrollen**
Nicht alle Benutzer haben dieselben Rechte. Unser System verwendet **Rollenbasierte Zugriffskontrolle (RBAC)** mit folgenden Berechtigungen:

| **Rolle**       | **Berechtigungen** |
|----------------|----------------|
| **Gast**       | Foren und Beiträge lesen |
| **Benutzer**   | Foren erstellen, eigene Beiträge schreiben und bearbeiten |
| **Admin**      | Alle Foren und Beiträge verwalten, Benutzer sperren |

✔ **Admin kann:** Foren und Beiträge aller Benutzer löschen oder bearbeiten  
✔ **Benutzer kann:** Eigene Beiträge bearbeiten oder löschen  
✔ **Gast kann:** Nur lesen, aber nichts posten

**Beispiel für Zugriffsschutz im Backend:**
```java
http.csrf().disable()
    .authorizeHttpRequests()
    .requestMatchers("/api/auth/**").permitAll()
    .requestMatchers("/api/forums").hasAnyRole("USER", "ADMIN")
    .requestMatchers("/api/posts").hasAnyRole("USER", "ADMIN")
    .anyRequest().authenticated()
    .and()
    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
```

---

## **3.4 Datensicherheit**
✔ **Passwortverschlüsselung**: Alle Passwörter werden mit **BCrypt** gehasht  
✔ **Datenübertragung**: Verschlüsselte Verbindung über **HTTPS**  
✔ **Datenvalidierung**: Eingaben werden überprüft, um **SQL-Injection** zu verhindern  
✔ **JWT-Sicherheit**: Token-Keys sind sicher gespeichert

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

---

## **3.5 Angriffsschutz**
| **Angriffstyp**         | **Gegenmaßnahme** |
|-----------------------|----------------|
| **SQL-Injection**     | Verwendung von **Prepared Statements** |
| **XSS (Cross-Site Scripting)** | HTML-Escaping und Input-Validierung |
| **CSRF (Cross-Site Request Forgery)** | CSRF-Token für Formulare |
| **Brute-Force Attacken** | Account-Sperrung nach mehreren falschen Logins |

✔ **Beispiel SQL-Sicherer Datenbankzugriff:**
```java
@Query("SELECT u FROM User u WHERE u.username = :username")
User findByUsername(@Param("username") String username);
```

✔ **Beispiel für Schutz vor XSS:**
```java
public String sanitizeInput(String input) {
    return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
```

---

## **- 3.6 Protokollierung & Monitoring**
✔ **Sicherheitsrelevante Ereignisse werden geloggt**, z. B. **Login-Versuche, Fehlerhafte Token, Verdächtige Aktivitäten**  
✔ Logs werden in **Spring Boot Logging** gespeichert  
✔ Zukünftig können **Security-Tools** wie **ELK Stack oder Grafana** zur Analyse verwendet werden

```java
logger.info("Failed login attempt for user: {}", username);
```

---

## **Fazit des Sicherheitskonzepts**
Das Sicherheitskonzept sorgt für **geschützte Benutzerdaten, sichere Authentifizierung und Zugriffskontrolle**. Durch die **JWT-Authentifizierung, Passwortverschlüsselung und Angriffsschutzmechanismen** wird eine hohe Sicherheit gewährleistet.

✅ **Nächster Abschnitt: 4. Arbeitsplanung** ✅

# **4. Arbeitsplanung**

---

## **4.1 Ziel der Arbeitsplanung**
Die Arbeitsplanung dient dazu, **die Aufgaben zu strukturieren, den Zeitaufwand abzuschätzen und eine effiziente Zusammenarbeit** im Team sicherzustellen. Durch die Planung in **sinnvolle Arbeitspakete** wird die Umsetzung des Projekts optimiert.

---

## **4.2 Projektphasen & Meilensteine**

Das Projekt wird in **vier Hauptphasen** unterteilt:

| **Phase**             | **Beschreibung** | **Zeitraum** |
|----------------------|---------------------------------|-----------|
| **Planung**         | Erstellung der Anforderungen, User Stories, Sicherheitskonzept | 3 Tage |
| **Entwicklung Backend** | Aufbau der API mit Spring Boot, Authentifizierung, Datenbankanbindung | 7 Tage |
| **Entwicklung Frontend** | Implementierung der React UI, State-Management, Routing | 7 Tage |
| **Testing & Optimierung** | Funktionstests, Fehlerbehebungen, Code-Reviews, Deployment | 3 Tage |

---

## **4.3 Detaillierte Arbeitspakete mit geschätztem Zeitaufwand**

| **Arbeitspaket** | **Beschreibung** | **Geschätzter Zeitaufwand** |
|-----------------|------------------|-----------------------------|
| **Setup Backend** | Initialisierung von Spring Boot, Konfiguration der Datenbank | 3 Stunden |
| **Authentifizierung (JWT)** | Benutzer-Login und -Registrierung, Passwort-Hashing mit BCrypt | 4 Stunden |
| **Datenbank & Repository** | Erstellen von JPA-Entities für Benutzer, Foren, Posts | 3 Stunden |
| **REST-API Entwicklung** | Implementierung der Controller für Foren & Posts | 5 Stunden |
| **Sicherheitskonzept umsetzen** | Rollenverwaltung, Zugriffskontrolle, Filter für geschützte Endpunkte | 4 Stunden |
| **Frontend-Setup** | Initialisierung von React, Installation der benötigten Bibliotheken | 3 Stunden |
| **Login & Registrierung UI** | Formulare für Anmeldung, JWT-Speicherung, API-Anbindung | 4 Stunden |
| **Forenübersicht & Navigation** | Liste der Foren anzeigen, Routing implementieren | 5 Stunden |
| **Post-Ansicht & Erstellung** | Posts in einem Forum anzeigen und neue Posts schreiben | 5 Stunden |
| **Styling & UI-Optimierung** | CSS, Responsiveness, Usability-Tests | 6 Stunden |
| **Testing (Backend + Frontend)** | Unit-Tests für Backend, UI-Tests für Frontend | 6 Stunden |
| **Dokumentation & Deployment** | Erstellung der Dokumentation, finales Deployment | 6 Stunden |

- **Gesamtzeitaufwand:** **50 Stunden**  
- **Geplante Teamarbeit:** Arbeitsteilung in Backend- und Frontend-Teams für parallele Entwicklung

---

## **4.4 Priorisierung der Aufgaben**
Die Aufgaben werden nach **Must-have**, **Should-have** und **Nice-to-have** priorisiert:

| **Priorität** | **Aufgabe** |
|--------------|------------|
| **Must-have** | Benutzer-Authentifizierung (Login, Registrierung) |
| **Must-have** | Foren- und Beitragserstellung |
| **Must-have** | Rollenbasierte Zugriffskontrolle |
| **Should-have** | UI-Optimierung & Styling |
| **Should-have** | Sicherheitsmaßnahmen (XSS, CSRF, SQL-Injection Prävention) |
| **Nice-to-have** | Erweiterte Profilverwaltung für Benutzer |

---

## **4.5 Tools & Arbeitsweise**
### **🔹 Versionskontrolle & Kollaboration**
✔ **Git & GitHub** für Code-Versionierung  
✔ **Branching-Strategie**: Entwicklerversionen im **feature-Branch**, Merge in **develop**

### **🔹 Kommunikation & Planung**
✔ **Trello oder Jira** für Sprint-Planung  
✔ **Discord oder Microsoft Teams** für Meetings

### **🔹 Entwicklungsumgebung**
✔ **IntelliJ IDEA / VS Code** für Backend & Frontend  
✔ **Postman** für API-Tests  
✔ **MySQL / H2 Database** als Datenbank

---

## **4.6 Fazit der Arbeitsplanung**
Die Arbeitspakete sind so aufgeteilt, dass **Parallelisierung** möglich ist (Backend & Frontend separat entwickelbar). Durch den Einsatz moderner **Tools zur Kollaboration & Versionskontrolle** wird eine strukturierte Entwicklung sichergestellt.

✅ **Nächster Abschnitt: 5. Test-Konzept** ✅
# **5. Test-Konzept**

---

## **5.1 Ziel des Test-Konzepts**

Das Test-Konzept stellt sicher, dass unsere Multiuser-Webanwendung **zuverlässig, sicher und fehlerfrei funktioniert**. Dazu führen wir **automatisierte und manuelle Tests** durch, um Fehler frühzeitig zu erkennen und zu beheben.

Die Tests werden in drei Hauptkategorien unterteilt:

1. **Unit-Tests** (Testen einzelner Komponenten/Methoden)
2. **Integrationstests** (Testen der Interaktion zwischen Komponenten)
3. **End-to-End-Tests (E2E)** (Testen der gesamten Anwendung mit realen Szenarien)

---

## **5.2 Testarten & Teststrategie**

### **🔹 1. Unit-Tests (Backend & Frontend)**
✔ **Ziel:** Überprüfung einzelner Methoden und Funktionen auf Korrektheit  
✔ **Tools:** JUnit & Mockito für Backend, Jest & React Testing Library für Frontend  
✔ **Beispiele:**
- Test der Authentifizierungslogik (JWT-Token-Generierung)
- Test der Datenbankabfragen in `UserRepository` und `PostRepository`
- Test der Forum- und Post-API-Endpunkte

### **🔹 2. Integrationstests**
✔ **Ziel:** Sicherstellen, dass verschiedene Komponenten korrekt zusammenarbeiten  
✔ **Tools:** Spring Boot Test für Backend, Cypress für Frontend  
✔ **Beispiele:**
- Test, ob ein registrierter Nutzer sich erfolgreich anmelden kann
- Test, ob nach der Authentifizierung ein Token zurückgegeben wird
- Test, ob die API beim Abruf von Foren und Posts korrekt antwortet

### **🔹 3. End-to-End-Tests (E2E)**
✔ **Ziel:** Testen des gesamten Workflows aus Sicht eines Benutzers  
✔ **Tools:** Cypress für UI-Tests  
✔ **Beispiele:**
- Benutzer registriert sich, loggt sich ein, erstellt ein Forum und macht einen Post
- Benutzer klickt auf ein Forum und sieht die dazugehörigen Beiträge
- Benutzer kann sich ausloggen und wird zurück zur Login-Seite geleitet

---

## **5.3 Testfälle & erwartete Ergebnisse**

| **Testfall** | **Beschreibung** | **Erwartetes Ergebnis** | **Testart** |
|-------------|------------------|-------------------------|-------------|
| Registrierung | Benutzer gibt korrekte Daten ein und klickt auf "Registrieren" | Nutzer wird erstellt und erhält eine Bestätigung | Integrationstest |
| Login | Benutzer gibt richtige Anmeldedaten ein | Nutzer erhält JWT-Token und wird weitergeleitet | Integrationstest |
| Forum-Erstellung | Authentifizierter Benutzer erstellt ein Forum | Forum erscheint in der Liste | Integrationstest |
| Post-Erstellung | Benutzer erstellt einen Beitrag in einem Forum | Post wird gespeichert und in der Liste angezeigt | Integrationstest |
| Zugriffskontrolle | Unangemeldeter Benutzer ruft eine geschützte Seite auf | Zugriff verweigert, Weiterleitung zu Login | Sicherheitstest |
| UI-Test | Benutzer klickt auf ein Forum, Posts werden angezeigt | Beiträge werden korrekt geladen | End-to-End-Test |

---

## **5.4 Manuelle Tests & Testplan**

Da nicht alle Aspekte mit automatisierten Tests überprüft werden können, führen wir **zusätzliche manuelle Tests** durch.

- **Manuelle Testfälle:**

1. **Responsiveness:** Läuft die Webapp auf verschiedenen Bildschirmgrößen?
2. **Performance:** Werden Anfragen schnell verarbeitet?
3. **Usability:** Sind Navigation und UI-Design intuitiv?

- **Testmethodik:**
- Tests werden in einer **Testumgebung** (lokal & staging) durchgeführt.
- Ergebnisse werden in einem **Testprotokoll** dokumentiert.

---

## **5.5 Testprotokoll**

| **Testdatum** | **Tester** | **Testfall** | **Status** | **Ergebnis** |
|--------------|-----------|-------------|------------|--------------|
| 26.01.2025 | M. Lüdi | Registrierung | ✅ Bestanden | Nutzer wird erfolgreich registriert |
| 26.01.2025 | L. Murtesi | Login mit falschen Daten | ✅ Bestanden | Fehlermeldung wird korrekt angezeigt |
| 27.01.2025 | M. Vacirca | Forum-Erstellung | ❌ Fehlgeschlagen | Fehler: API akzeptiert leere Titel |
| 27.01.2025 | M. Lüdi | Beitragserstellung | ✅ Bestanden | Post wird korrekt angezeigt |

---

## **5.6 Fazit**

Durch unser umfassendes Testkonzept stellen wir sicher, dass die Anwendung **fehlerfrei, sicher und benutzerfreundlich** ist. Die Kombination aus **automatisierten Tests, manuellen Tests und End-to-End-Tests** garantiert eine hohe Softwarequalität.

✅ **Nächster Abschnitt: 6. Beschreibung der eingesetzten Frameworks** ✅

# **- 6. Beschreibung der eingesetzten Frameworks**

---

## **- 6.1 Überblick über die eingesetzten Technologien**

Unsere Multiuser-Webanwendung basiert auf einem modernen **Full-Stack-Webentwicklungsansatz**, bei dem **Spring Boot** für das Backend und **React** für das Frontend verwendet werden. Diese Kombination bietet eine robuste, skalierbare und wartungsfreundliche Architektur.

| Technologie       | Einsatzzweck |
|------------------|-------------|
| **Spring Boot**  | Backend-Entwicklung, API-Endpoints, Authentifizierung, Datenbankanbindung |
| **React.js**     | Frontend-Entwicklung, UI-Komponenten, Routing |
| **MySQL**        | Datenbank für Speicherung von Nutzerdaten, Foren und Posts |
| **JWT (JSON Web Token)** | Authentifizierung und Autorisierung |
| **Axios**        | API-Aufrufe zwischen Frontend und Backend |
| **Bootstrap**    | UI-Styling und Design |
| **Maven**        | Dependency-Management für das Backend |
| **Node.js & npm** | Paketverwaltung für das Frontend |

---

## **6.2 Backend: Spring Boot**

**- Warum Spring Boot?**
Spring Boot ist ein leistungsstarkes Java-Framework, das die Entwicklung von REST-APIs vereinfacht und viele Sicherheits- und Datenbankfunktionen bietet.

### **- Wichtige Komponenten im Backend**
✔ **Spring Boot Security** → JWT-Authentifizierung  
✔ **Spring Data JPA** → Datenbankanbindung mit MySQL  
✔ **Spring Boot Web** → REST-API-Endpoints  
✔ **Spring Boot Test** → Testen der Anwendung  
✔ **Lombok** → Reduzierung von Boilerplate-Code

### **- Architektur des Backends**
- **Controller**: Verwaltet API-Anfragen (z. B. `/api/auth/login`)  
- **Service**: Geschäftslogik (z. B. Passwort-Hashing)  
- **Repository**: Kommunikation mit der Datenbank

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
```

---

## **6.3 Frontend: React.js**

**- Warum React?**
- **Komponentenbasiert** → Wiederverwendbare UI-Bausteine
- **Virtual DOM** → Schnellere UI-Updates
- **State Management** → Nutzung von `useState` & `useEffect`

### **- Struktur des Frontends**
- **`components/`** → Wiederverwendbare UI-Elemente wie Navigation  
- **`pages/`** → Seiten wie Login, Forum-Liste, Post-Liste  
- **`services/`** → API-Funktionen für Datenabruf

### **- Beispiel: API-Abfrage mit Axios**
```javascript
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

export const login = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
};
```

---

## **6.4 Datenbank: MySQL mit JPA**

**- Warum MySQL?**
- **Schnell & zuverlässig** für relationale Daten
- **Gut skalierbar** mit vielen Nutzern
- **Einfacher Zugriff** mit Spring Data JPA

### **- Tabellenstruktur**
| Tabelle      | Spalten |
|-------------|---------|
| **Users**   | id, username, password, role |
| **Forums**  | id, title, description, createdBy |
| **Posts**   | id, content, forumId, userId |

```java
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @ManyToOne
    private Forum forum;

    @ManyToOne
    private User user;
}
```

---

## **6.5 Sicherheit: JWT für Authentifizierung**

**- Warum JWT?**
- **Sicher & dezentral** → Kein Speichern von Sessions erforderlich
- **Einfach zu handhaben** → Token wird im `Authorization` Header gesendet

### **- Wie funktioniert JWT in unserer App?**
1. Nutzer loggt sich mit `username` & `password` ein.
2. Backend überprüft Anmeldeinformationen & generiert ein Token.
3. Token wird im `localStorage` des Frontends gespeichert.
4. Jede API-Anfrage sendet das Token zur Authentifizierung.

```java
public String generateToken(String username) {
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 Tag
        .signWith(SignatureAlgorithm.HS256, secretKey)
        .compact();
}
```

---

## **6.6 Fazit**
Durch die Kombination aus **Spring Boot, React, MySQL und JWT** haben wir eine **moderne, sichere und skalierbare** Webanwendung geschaffen. Die klare **Trennung von Frontend und Backend** ermöglicht eine einfache Wartung und Erweiterung.

✅ **Nächster Abschnitt: 7. Beschreibung der Abläufe beim Login** ✅

# **- 7. Beschreibung der Abläufe beim Login**

Der Login-Prozess in unserer Anwendung basiert auf einer sicheren **JWT-Authentifizierung (JSON Web Token)**. Dies ermöglicht eine dezentrale und skalierbare Authentifizierung ohne die Notwendigkeit von Server-seitigen Sessions.

---

## **- 7.1 Login-Ablauf – Übersicht**

1️⃣ **Benutzer gibt Anmeldeinformationen ein** → E-Mail & Passwort im Frontend  
2️⃣ **Daten werden an das Backend gesendet** → API-Request an `/api/auth/login`  
3️⃣ **Backend überprüft Anmeldedaten** → Passwort-Hash wird mit gespeichertem Hash verglichen  
4️⃣ **Bei Erfolg wird ein JWT-Token erstellt** → Enthält Benutzerinformationen & Ablaufdatum  
5️⃣ **Token wird im `localStorage` gespeichert** → Dient zur Autorisierung für spätere Anfragen  
6️⃣ **Bei API-Anfragen wird das Token gesendet** → Backend prüft Gültigkeit & Authentifizierung

---

## **- 7.2 Login-Prozess im Backend**

**1️⃣ Empfang der Login-Daten und Validierung**
```java
@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
    return ResponseEntity.ok(authService.authenticate(authRequest));
}
```

**2️⃣ Authentifizierung in der `AuthService` Klasse**
```java
public AuthResponse authenticate(AuthRequest request) {
    User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid credentials");
    }

    String token = jwtUtil.generateToken(user.getUsername());
    return new AuthResponse(token, user.getUsername());
}
```

**3️⃣ JWT-Token generieren**
```java
public String generateToken(String username) {
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 Tag gültig
        .signWith(SignatureAlgorithm.HS256, secretKey)
        .compact();
}
```

**4️⃣ Speicherung des Tokens im Frontend**
Nach erfolgreichem Login speichert das Frontend das Token:
```javascript
localStorage.setItem("token", response.data.token);
```

---

## **7.3 Verwendung des Tokens für Authentifizierte API-Anfragen**

Sobald der Benutzer eingeloggt ist, muss das Token bei allen API-Anfragen im **Authorization Header** mitgesendet werden.

**API-Aufruf mit `Authorization: Bearer <token>`**
```javascript
const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
};
```

**Backend prüft Token in `JwtFilter.java`**
```java
if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
    String token = authorizationHeader.substring(7);
    String username = jwtUtil.extractUsername(token);
    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
```

---

## **7.4 Ablauf bei Logout**

Der Logout-Prozess erfolgt **client-seitig**.  
Das gespeicherte Token wird einfach aus `localStorage` entfernt.

**Logout-Funktion im Frontend**
```javascript
const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Weiterleitung zur Login-Seite
};
```

---

## **7.5 Fehlerbehandlung und Sicherheitstipps**

✅ **Ungültige Anmeldedaten abfangen**
- Backend sollte **allgemeine Fehlernachrichten** ausgeben, um **Brute-Force-Angriffe** zu verhindern:
```java
throw new RuntimeException("Invalid username or password");
```

✅ **Token-Ablaufzeit begrenzen**
- Token ist nur **24 Stunden gültig** und wird dann **ungültig**.

✅ **Sicherheitsmaßnahmen**
- **CORS aktivieren**, um **unbefugte API-Zugriffe zu verhindern**.
- **HTTPS verwenden**, um **Token-Sicherheit zu gewährleisten**.
- **JWT-Blacklist (optional)**: Token nach Logout ungültig machen.

---

## **7.6 Fazit**
Dank JWT funktioniert unser Login-System **ohne serverseitige Sessions**. Benutzer können sich sicher anmelden und **alle nachfolgenden API-Aufrufe werden authentifiziert**.

✅ **Nächster Abschnitt: 8. Testprotokoll** ✅

# **- 8. Testprotokoll**

Die Qualitätssicherung unseres Forums erfordert umfassende Tests. Das Testprotokoll dokumentiert die durchgeführten Tests, Testergebnisse und Fehleranalysen.

---

## **8.1 Testarten**

Für unsere Anwendung haben wir folgende **Testmethoden** angewendet:

| Testtyp                 | Ziel |
|-------------------------|----------------------------------|
| **Unit-Tests**         | Einzelne Methoden und Funktionen testen |
| **Integrationstests**  | Zusammenspiel von Komponenten testen |
| **End-to-End-Tests**   | Vollständige Benutzerabläufe testen |
| **Sicherheitstests**   | Unautorisierte Zugriffe verhindern |

---

## **8.2 Testumgebung**

✅ **Backend:** Spring Boot, H2-Datenbank für Tests  
✅ **Frontend:** React, Jest für UI-Tests  
✅ **Tools:** Postman für API-Tests, JUnit für Unit-Tests  
✅ **Testbenutzer:**
- **Admin:** `admin` / `adminpassword`
- **Standard-User:** `testuser` / `testpassword`

---

## **8.3 Funktionale Tests**

### **✅ Registrierung eines neuen Benutzers**
| Testfall | Erwartetes Ergebnis | Status |
|----------|----------------------|--------|
| POST `/api/auth/register` mit gültigen Daten | Erfolgreiche Registrierung, Benutzer in DB gespeichert | ✅ Erfolgreich |
| POST `/api/auth/register` mit existierendem Benutzer | Fehler: "Benutzer existiert bereits" | ✅ Erfolgreich |
| POST `/api/auth/register` mit leerem Passwort | Fehler: "Passwort erforderlich" | ✅ Erfolgreich |

### **✅ Benutzer-Login**
| Testfall | Erwartetes Ergebnis | Status |
|----------|----------------------|--------|
| POST `/api/auth/login` mit korrekten Daten | JWT-Token wird zurückgegeben | ✅ Erfolgreich |
| POST `/api/auth/login` mit falschem Passwort | Fehler: "Ungültige Anmeldeinformationen" | ✅ Erfolgreich |
| POST `/api/auth/login` mit nicht existierendem Benutzer | Fehler: "Benutzer nicht gefunden" | ✅ Erfolgreich |

### **✅ Forum erstellen**
| Testfall | Erwartetes Ergebnis | Status |
|----------|----------------------|--------|
| POST `/api/forums` mit gültigem Token | Forum wird erstellt | ✅ Erfolgreich |
| POST `/api/forums` ohne Authentifizierung | Fehler: "Unauthorized" | ✅ Erfolgreich |

### **✅ Beiträge erstellen und abrufen**
| Testfall | Erwartetes Ergebnis | Status |
|----------|----------------------|--------|
| POST `/api/posts` mit gültigem Token | Beitrag wird erstellt | ✅ Erfolgreich |
| GET `/api/posts?forumId=1` | Alle Beiträge des Forums werden angezeigt | ✅ Erfolgreich |

---

## **8.4 Sicherheitstests**

### **✅ Token-Authentifizierung**
| Testfall | Erwartetes Ergebnis | Status |
|----------|----------------------|--------|
| Zugriff auf `/api/forums` ohne Token | Fehler: "Unauthorized" | ✅ Erfolgreich |
| Gültiges JWT-Token verwenden | Zugriff erfolgreich | ✅ Erfolgreich |
| Manipuliertes Token verwenden | Fehler: "Invalid Token" | ✅ Erfolgreich |

### **✅ XSS- und SQL-Injection-Tests**
| Testfall | Erwartetes Ergebnis | Status |
|----------|----------------------|--------|
| Eingabe `<script>alert(1)</script>` in Forum-Titel | Eingabe wird entschärft | ✅ Erfolgreich |
| SQL-Injection (`' OR '1'='1`) in Login-Feld | Fehler: "Ungültige Anmeldeinformationen" | ✅ Erfolgreich |

---

## **8.5 Automatisierte Tests (JUnit & Jest)**

### **Backend: Unit-Test für Registrierung**
```java
@Test
public void testRegisterUser() {
    AuthRequest request = new AuthRequest("testuser", "password123");
    ResponseEntity<Void> response = authController.register(request);
    assertEquals(HttpStatus.CREATED, response.getStatusCode());
}
```

### **Frontend: Jest-Test für Login-Formular**
```javascript
test("renders login form", () => {
    render(<Login />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
});
```

---

## **8.6 Zusammenfassung & Fehleranalyse**

### **Wichtige Erkenntnisse:**
✅ **JWT funktioniert stabil, verhindert unautorisierte Zugriffe**  
✅ **XSS und SQL-Injections werden durch Sanitization verhindert**  
✅ **Fehlermeldungen sind sicher (verraten keine internen Details)**  
✅ **Automatische Tests sparen Zeit und verhindern Regressionen**

### **Bekannte Fehler & Lösungen:**
❌ **Forum-Liste wurde nicht geladen** → **Fehlende API-Antwort gefixt**  
❌ **Posts wurden nicht gespeichert** → **Feld `username` war `null`, Fix implementiert**

---

## **8.7 Fazit**
Unsere Teststrategie hat die **Sicherheit & Funktionalität** der Anwendung erheblich verbessert. Die Kombination aus **manuellen API-Tests, Unit-Tests und Sicherheitschecks** stellt sicher, dass unser Forum zuverlässig läuft.

✅ **Nächster Abschnitt: 9. Arbeitsjournal** ✅

# **9. Arbeitsjournal**

Das **Arbeitsjournal** dokumentiert unsere täglichen Fortschritte, Herausforderungen und Lösungen während der Entwicklung des **Forum-Projekts**. Jede Arbeitssitzung wurde mit einem detaillierten Eintrag versehen.

---

## **9.1 Überblick über den Entwicklungsprozess**

| **Datum**      | **Bearbeiter**        | **Arbeitspaket**                                  | **Dauer** | **Status** |
|---------------|----------------------|-------------------------------------------------|----------|-----------|
| **2025-01-14** | Manuel               | Git-Repository erstellt, Spring Boot eingerichtet | 2h       | ✅ Abgeschlossen |
| **2025-01-15** | Lorik                | JWT-Authentifizierung für Login & Register implementiert | 3h | ✅ Abgeschlossen |
| **2025-01-16** | Merlin               | React-Frontend initialisiert, Login & Register-Formulare erstellt | 3h | ✅ Abgeschlossen |
| **2025-01-17** | Manuel               | Backend-Logik für Forum-Erstellung und -Abruf entwickelt | 4h | ✅ Abgeschlossen |
| **2025-01-18** | Lorik                | Forum-Übersicht im Frontend mit API-Anbindung implementiert | 4h | ✅ Abgeschlossen |
| **2025-01-19** | Merlin               | Post-Erstellung in Backend & Frontend implementiert | 4h | 🟠 Fehler: Post-Requests schlagen fehl |
| **2025-01-20** | Manuel               | Fehleranalyse: Post-Requests geben `null` für `username` zurück | 3h | ✅ Gefixt |
| **2025-01-21** | Lorik                | Unit-Tests für Backend implementiert | 3h | ✅ Abgeschlossen |
| **2025-01-22** | Merlin               | Sicherheitsüberprüfung mit XSS- und SQL-Injection-Tests | 4h | ✅ Abgeschlossen |
| **2025-01-23** | Alle                 | End-to-End-Tests mit Postman & Frontend-Optimierungen | 5h | ✅ Abgeschlossen |
| **2025-01-24** | Manuel               | Dokumentation begonnen, Sicherheitskonzept verfasst | 2h | ✅ Abgeschlossen |
| **2025-01-25** | Lorik & Merlin       | Testprotokoll ergänzt, abschließende Überprüfung | 3h | ✅ Fertiggestellt |

---

## **9.2 Detailierte Arbeitseinträge**

### **📅 14. Januar 2025 - Initialisierung des Projekts**
- **Manuel** hat das Git-Repository erstellt, die Grundstruktur aufgesetzt und ein einfaches Spring Boot-Projekt generiert.
- Erste Tests mit `mvn spring-boot:run` liefen erfolgreich.
- **Probleme:** Fehler bei `pom.xml`, gelöst durch manuelles Nachinstallieren von Abhängigkeiten (`mvn clean install`).

---

### **📅 15. Januar 2025 - Benutzer-Authentifizierung**
- **Lorik** implementierte die **JWT-Authentifizierung** im Backend:
  - Registrierung speichert User in der Datenbank (gehasht mit BCrypt).
  - Login gibt ein **JWT-Token** zurück, das für geschützte Routen benötigt wird.
- **Tests mit Postman erfolgreich**, Login & Registrierung funktionieren.

---

### **📅 16. Januar 2025 - Frontend: Login & Registrierung**
- **Merlin** hat das React-Frontend gestartet (`npx create-react-app`).
- Login- und Register-Seiten erstellt und mit Backend-API verbunden.
- **Problem:** **CORS-Fehler** beim Fetch-Request.
  - **Lösung:** `@CrossOrigin("*")` in Spring Boot Backend hinzugefügt.

---

### **📅 17. Januar 2025 - Foren erstellen & abrufen**
- **Manuel** implementierte API-Endpunkte für **Forum-Erstellung**.
- GET `/api/forums` gibt alle erstellten Foren zurück.
- **Fehlermeldung:** **Unauthorized (403)** bei Forum-Erstellung.
  - **Lösung:** Bearer-Token wurde nicht gesendet → Header korrekt gesetzt.

---

### **📅 18. Januar 2025 - Frontend: Forum-Übersicht**
- **Lorik** entwickelte die **ForumList.js**, um alle Foren anzuzeigen.
- Klick auf ein Forum leitet zur **PostList.js**, wo alle Beiträge erscheinen sollten.
- **Fehlendes Feature:** Benutzer kann aktuell noch keine Posts erstellen.

---

### **📅 19. Januar 2025 - Posts im Backend implementiert**
- **Merlin** fügte API `/api/posts` hinzu, um Beiträge zu erstellen.
- **Problem:** Beim Erstellen eines Posts wird `username=null` gespeichert.
- **Erste Analyse:** Der `username` wird nicht aus dem JWT-Token extrahiert.

---

### **📅 20. Januar 2025 - Fehlerbehebung: Posts werden nicht gespeichert**
- **Manuel** hat den Fehler gefunden:
  - JWT-Token muss im Backend entschlüsselt werden, um den `username` zu erhalten.
  - **Lösung:** `SecurityContextHolder.getContext().getAuthentication().getName();`

---

### **📅 21. Januar 2025 - Unit-Tests für Backend**
- **Lorik** hat JUnit-Tests für `AuthControllerTest` und `ForumControllerTest` implementiert.
- **GET `/api/forums`** und **POST `/api/posts`** getestet.
- **Probleme:** Mocking von SecurityContext für Tests.
  - **Lösung:** Mock `SecurityContextHolder` im Test-Setup korrekt konfigurieren.

---

### **📅 22. Januar 2025 - Sicherheitsüberprüfung**
- **Merlin** hat die Anwendung auf **XSS- und SQL-Injections** getestet.
- `<script>alert(1)</script>` in Forum-Titel wurde erfolgreich **blockiert**.
- **SQL-Injection (`' OR '1'='1`) verhindert**, keine unberechtigten Logins möglich.

---

### **📅 23. Januar 2025 - End-to-End-Tests & Debugging**
- **Alle** haben mit **Postman & Jest** die komplette Benutzerreise getestet.
- Forum-Erstellung, Beitrag-Posten, Login & Logout erfolgreich geprüft.
- **Fehlermeldung:** `403 Forbidden` nach Logout.
  - **Lösung:** JWT wurde nicht gelöscht, nun `localStorage.removeItem("token");` im Logout implementiert.

---

### **📅 24. Januar 2025 - Dokumentation & Sicherheitskonzept**
- **Manuel** hat die **Dokumentation begonnen** und das Sicherheitskonzept ergänzt.
- **Lorik** hat das **Testprotokoll geschrieben**.
- **Merlin** hat den **Ablauf des Logins dokumentiert**.

---

### **📅 25. Januar 2025 - Finalisierung & Abgabe**
- **Letzte Code-Überprüfung, Tests & Bugfixing.**
- **Git-Repository finalisiert.**
- **Präsentation vorbereitet.**

---

## **9.3 Erkenntnisse & Lessons Learned**

### **Was lief gut?**
✅ **Spring Boot + React hat gut funktioniert**  
✅ **JWT-Authentifizierung ist sicher & einfach**  
✅ **Datenbankstruktur ist klar und effizient**  
✅ **Tests haben viele Bugs frühzeitig gefunden**

### **Was könnten wir verbessern?**
❌ **Bessere Planung von Features & Tests**  
❌ **Bessere Dokumentation von API-Schnittstellen im Vorfeld**  
❌ **Frühzeitigeres Testen der Frontend-Logik**

---

## **Fazit**
Das Forum-Projekt hat gezeigt, wie **Spring Boot & React kombiniert** werden können, um eine sichere und effiziente Multiuser-Webanwendung zu entwickeln. Durch **strukturierte Planung, Testautomatisierung und Debugging** haben wir eine funktionsfähige und sichere Plattform erstellt.

✅ **Projekt erfolgreich abgeschlossen!** 🎉

---

## **- Nächster Abschnitt: 10. Verwendung von ChatGPT & KI** ✅
# **- 10. Verwendung von ChatGPT & Künstlicher Intelligenz (KI)**

Im Laufe der Entwicklung unseres Forum-Projekts haben wir **ChatGPT** und andere KI-gestützte Tools genutzt, um verschiedene Herausforderungen zu lösen und unsere Produktivität zu steigern. Hier dokumentieren wir, **wie, warum und wann** KI eingesetzt wurde.

---

## **- 10.1 Warum haben wir KI genutzt?**

Das Forum-Projekt erforderte die Integration verschiedener Technologien, darunter **Spring Boot, React, JWT-Authentifizierung und API-Kommunikation**. KI-gestützte Tools halfen uns dabei:

- **Technische Lösungen schneller zu finden** (z. B. Sicherheitskonzepte, Architekturentscheidungen).
- **Code-Snippets für komplexe Features zu generieren** (z. B. JWT-Authentifizierung, Security-Konfiguration).
- **Fehlersuche und Debugging zu beschleunigen**.
- **Best Practices und Architektur-Empfehlungen einzuholen**.
- **Die Dokumentation klarer und detaillierter zu schreiben**.

---

## **10.2 Wann und wie haben wir ChatGPT eingesetzt?**

### **1️⃣ Backend-Entwicklung (Spring Boot, JWT, Security)**
- **Beispiel:**
- Wir brauchten eine sichere **JWT-Authentifizierung** mit **UserDetailsService & BCrypt**.
- ChatGPT half uns mit **Beispielimplementierungen** und **Code-Snippets** für Spring Security.
- **Ergebnis:** Wir konnten schneller eine **sichere Login- und Register-Funktion** erstellen.

**Code-Beispiel aus ChatGPT:**
```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}
```

---

### **2️⃣ Frontend-Entwicklung (React, API-Calls, Zustandsspeicherung)**
- **Beispiel:**
- Wir benötigten eine Möglichkeit, Foren und Beiträge über das Backend abzurufen.
- ChatGPT half mit einer **strukturierten API-Service-Datei** für `fetch()`, inklusive Fehlerbehandlung.

**Code-Beispiel aus ChatGPT:**
```javascript
export const fetchForums = async () => {
    try {
        const response = await fetch(`${BASE_URL}/forums`);
        if (!response.ok) throw new Error('Failed to fetch forums');
        return response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};
```

**Ergebnis:**
- **API-Requests waren stabiler**, weniger Bugs in `ForumList.js`.
- **Code wurde übersichtlicher** mit separater `api.js`.

---

### **3️⃣ Debugging & Fehlerbehebung**
- **Beispiel:**
- Bei der **Post-Erstellung** wurde `username=null` gespeichert.
- ChatGPT schlug vor, den `username` direkt aus dem **JWT-Token im SecurityContext** zu holen.

**Fehleranalyse durch ChatGPT:**  
❌ Ursprünglicher Code:
```java
String username = postDTO.getUsername();
```
✔️ **Verbesserter Code mit KI-Unterstützung:**
```java
String username = SecurityContextHolder.getContext().getAuthentication().getName();
```

**Ergebnis:** **Post-Erstellung funktionierte nun fehlerfrei!** 🎉

---

### **4️⃣ Dokumentation & Konzepterstellung**
- **Beispiel:**
- Wir mussten **Sicherheitskonzept, Login-Ablauf und Teststrategie** dokumentieren.
- ChatGPT half uns, **formulierte Absätze** für den README zu generieren.
- **Ergebnis:** Klar strukturierte Doku mit **detaillierten Sicherheitsmaßnahmen**.

---

### **5️⃣ Erstellung von Testfällen & Testautomatisierung**
- **Beispiel:**
- Wir wollten Unit-Tests für das Backend schreiben, hatten aber Probleme mit Mocking.
- ChatGPT gab uns eine **JUnit-Teststruktur mit Mockito** für das `AuthControllerTest`.

**Generierter Test durch ChatGPT:**
```java
@MockBean
private AuthService authService;

@Test
public void testLogin() throws Exception {
    AuthRequest request = new AuthRequest("testuser", "password");
    AuthResponse response = new AuthResponse("mockToken");

    when(authService.login(any(AuthRequest.class))).thenReturn(response);

    mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value("mockToken"));
}
```

**Ergebnis:**
- **Schnellere Implementierung von Tests**.
- **Mehr Sicherheit & Stabilität** für unsere API-Endpoints.

---

## **10.3 Grenzen der KI-Nutzung**

Obwohl ChatGPT uns **massiv geholfen** hat, gab es **Herausforderungen**:

1. **Nicht immer perfekte Lösungen:**
  - Manche Code-Snippets mussten angepasst werden (z. B. `SecurityContext` in Tests).

2. **Fehlende Kontextkenntnisse:**
  - ChatGPT kann nur basierend auf den gegebenen Informationen antworten.
  - Unsere spezifische API-Logik musste manchmal nachträglich angepasst werden.

3. **Keine vollständige Fehlervermeidung:**
  - Debugging durch Menschen war trotzdem notwendig.
  - Einige KI-generierte Lösungen waren **veraltet oder nicht kompatibel**.

---

## **10.4 Fazit: KI als Unterstützung, nicht als Ersatz**

- **Was war der größte Vorteil?**
- **Schnellere Entwicklung** durch **automatisierte Code-Vorschläge**.
- **Bessere Strukturierung** dank KI-generierter **Dokumentation & Best Practices**.
- **Effiziente Fehlersuche**, insbesondere bei Spring Security & API-Calls.

- **Wo ist menschliche Expertise notwendig?**
- **Testen & Debuggen:** KI macht Fehler, menschliche Kontrolle ist essenziell.
- **Sicherheit & Optimierung:** Code sollte immer auf **Best Practices geprüft** werden.
- **Projekt-Management:** KI kann keine **taktischen Entscheidungen treffen**.

- **Wie würden wir KI beim nächsten Projekt nutzen?**  
✅ **Best Practices & Sicherheitskonzepte von Anfang an generieren lassen**.  
✅ **Automatische Tests schneller entwickeln**.  
✅ **KI-gesteuerte Code-Reviews für Fehleranalyse** nutzen.

**- Fazit:** **ChatGPT war ein wertvolles Tool, aber menschliche Expertise bleibt entscheidend.**

---

# **11. Präsentationsvorbereitung**

Die abschließende Präsentation unseres **Forum-Projekts** ist ein wichtiger Bestandteil der Bewertung. In diesem Abschnitt dokumentieren wir, wie wir uns darauf vorbereitet haben, welche Inhalte präsentiert werden und worauf wir besonders achten.

---

## **11.1 Ziel der Präsentation**

Unser Ziel ist es, das entwickelte Forum **klar, verständlich und professionell** zu präsentieren. Dabei möchten wir die **technischen Aspekte, die Umsetzung der Anforderungen und unsere Erfahrungen im Projekt** hervorheben.

Die Präsentation soll **folgende Fragen beantworten**:

✅ **Was haben wir entwickelt?**  
✅ **Welche Technologien haben wir genutzt und warum?**  
✅ **Wie funktioniert die Anwendung technisch (Backend & Frontend)?**  
✅ **Welche Sicherheitsmaßnahmen haben wir umgesetzt?**  
✅ **Welche Herausforderungen sind aufgetreten und wie haben wir sie gelöst?**  
✅ **Welche Learnings nehmen wir aus dem Projekt mit?**

---

## **11.2 Struktur der Präsentation**

### **1️⃣ Einführung (5 min)**
- Vorstellung der Teammitglieder
- Vorstellung der Projektidee: **"Warum ein Forum?"**
- Erwartete Anforderungen vs. tatsächliche Umsetzung

### **2️⃣ Technische Umsetzung (10 min)**
- **Backend (Spring Boot)**
  - Aufbau der REST-API
  - JWT-Authentifizierung & Security
  - Datenbankstruktur (Foren, Beiträge, Benutzer)

- **Frontend (React.js)**
  - Komponentenstruktur
  - API-Calls und State-Management
  - Routing & Navigation

### **3️⃣ Sicherheitskonzept (5 min)**
- **JWT-Token & Authentifizierung**
- **Passwort-Hashing mit BCrypt**
- **Cross-Origin Resource Sharing (CORS)**
- **Absicherung der API-Endpunkte**

### **4️⃣ Live-Demo (10 min)**
✅ **Schritt 1:** Registrierung eines neuen Benutzers  
✅ **Schritt 2:** Login und Token-Speicherung  
✅ **Schritt 3:** Erstellen eines Forums  
✅ **Schritt 4:** Erstellen eines Beitrags im Forum  
✅ **Schritt 5:** Anzeigen aller Foren und Beiträge  
✅ **Schritt 6:** Logout und Zugriff ohne Authentifizierung testen

### **5️⃣ Herausforderungen & Lösungen (5 min)**
- Probleme mit **Token-Handling & Authentifizierung**
- **CORS-Probleme bei API-Calls**
- **Fehlerhafte Routen im Frontend**
- **JWT-Fehlermeldungen im Backend**

**Wie haben wir diese Probleme gelöst?**  
➡️ **Refactoring von API-Calls & Token-Management**  
➡️ **Debugging von Sicherheitskonfigurationen**  
➡️ **Verbesserung der Benutzerführung im Frontend**

### **6️⃣ Fazit & Learnings (5 min)**
- **Was haben wir gelernt?**
- **Welche Best Practices haben wir angewendet?**
- **Was würden wir beim nächsten Mal anders machen?**

---

## **11.3 Technische Hilfsmittel für die Präsentation**

✅ **PowerPoint/Google Slides** mit Diagrammen, Code-Beispielen & Screenshots  
✅ **Live-Demo über Localhost oder ein Deployment**  
✅ **GitHub Repository mit sauberer Dokumentation**

---

## **11.4 Aufgabenverteilung für die Präsentation**

| Aufgabe | Zuständigkeit |  
|---------|--------------|  
| Einleitung | Teammitglied A |  
| Technische Umsetzung (Backend) | Teammitglied B |  
| Technische Umsetzung (Frontend) | Teammitglied C |  
| Sicherheitskonzept | Teammitglied A |  
| Live-Demo | Teammitglied B |  
| Herausforderungen & Lösungen | Teammitglied C |  
| Fazit & Learnings | Alle gemeinsam |  

---

## **11.5 Tipps für eine erfolgreiche Präsentation**

🎤 **Klare und prägnante Sprache verwenden**  
🎯 **Technische Details einfach erklären** (auch für Nicht-Entwickler verständlich)  
🖥️ **Live-Demo gut vorbereiten** (Testen, ob alles funktioniert)  
🔄 **Backup-Plan für Demo bereit haben** (Screenshots & GIFs als Alternative)  
👥 **Auf Fragen aus dem Publikum eingehen**

---

## **- 11.6 Fazit zur Präsentationsvorbereitung**

Die Präsentation ist der letzte, aber **entscheidende Schritt** unseres Projekts. Sie zeigt nicht nur unser technisches Können, sondern auch, wie gut wir unser Projekt **strukturieren und kommunizieren** können. Eine gute Vorbereitung sorgt dafür, dass wir unser Forum **professionell und überzeugend präsentieren**.

➡️ **Nächster Abschnitt: 12. Abschluss & Fazit des Projekts** ✅
# **12. Abschluss & Fazit des Projekts**

Nachdem wir unser **Forum-Projekt** erfolgreich entwickelt, getestet und präsentiert haben, ziehen wir in diesem Abschnitt ein **abschließendes Fazit**. Wir reflektieren unsere Arbeit, analysieren die wichtigsten Erkenntnisse und überlegen, wie wir das Projekt in Zukunft weiter verbessern könnten.

---

## **12.1 Zusammenfassung des Projekts**

Das Ziel unseres Projekts war die **Entwicklung einer Multiuser-Webanwendung**, die es Benutzern ermöglicht, **Foren zu erstellen, Beiträge zu verfassen und sich über verschiedene Themen auszutauschen**.

**Genutzte Technologien:**  
✅ **Backend:** Spring Boot (Java) mit einer RESTful API  
✅ **Frontend:** React.js für eine dynamische Benutzeroberfläche  
✅ **Datenbank:** MySQL mit JPA/Hibernate für die Datenverwaltung  
✅ **Sicherheit:** JWT-Authentifizierung, Passworthashing mit BCrypt  
✅ **Testing:** Unit- und Integrationstests für Backend- und Frontend-Komponenten

**Hauptfunktionen der Anwendung:**  
✔️ **Benutzerregistrierung & Login**  
✔️ **Erstellen & Verwalten von Foren**  
✔️ **Erstellen, Bearbeiten & Löschen von Beiträgen**  
✔️ **Sichere Authentifizierung & Autorisierung**

---

## **12.2 Herausforderungen & Lösungsansätze**

Während der Entwicklung des Forums sind wir auf **mehrere Herausforderungen gestoßen**, die wir durch verschiedene **Lösungsansätze** erfolgreich bewältigen konnten.

### **🔴 Herausforderung 1: Probleme mit der Authentifizierung & JWT**
❌ Zunächst war es nicht möglich, sich korrekt anzumelden, da die Token-Verwaltung fehlerhaft implementiert war.  
✅ **Lösung:** Wir haben das **Token-Handling verbessert**, indem wir es im `localStorage` speicherten und für jeden API-Request mitgaben.

### **🔴 Herausforderung 2: Fehlerhafte API-Requests (CORS & Security Issues)**
❌ API-Calls wurden durch die **CORS-Richtlinien blockiert** und führten zu 403-Fehlermeldungen.  
✅ **Lösung:** Wir haben in Spring Boot eine **CORS-Konfiguration** implementiert, um spezifische Endpunkte für bestimmte Domains freizugeben.

### **🔴 Herausforderung 3: Datenbankprobleme & Fehlende Beziehungen**
❌ Die ersten Datenbankabfragen funktionierten nicht korrekt, da die Beziehungen zwischen **Foren, Posts und Benutzern** nicht eindeutig waren.  
✅ **Lösung:** Nach einer Analyse haben wir die **JPA-Entity-Relationen (One-to-Many, Many-to-One) überarbeitet** und funktionierende Abfragen erstellt.

### **🔴 Herausforderung 4: Fehlerhafte Weiterleitungen im Frontend**
❌ Beim Klick auf ein Forum wurden falsche IDs übergeben, wodurch die Posts nicht korrekt geladen wurden.  
✅ **Lösung:** Durch eine korrekte Nutzung von `useParams()` und `useNavigate()` in React konnten wir das Routing sauber implementieren.

### **🔴 Herausforderung 5: Sicherheitslücken & Potenzielle Angriffe**
❌ Wir haben bemerkt, dass Benutzer ohne Authentifizierung auf geschützte Endpunkte zugreifen konnten.  
✅ **Lösung:** Einführung einer **Spring Security-Konfiguration**, die nur authentifizierten Benutzern erlaubt, sensible API-Endpunkte zu nutzen.

---

## **12.3 Was haben wir gelernt? (Key Learnings)**
Während der Entwicklung unseres Forums konnten wir viele wichtige **technische und methodische Erkenntnisse** gewinnen:

### **👨‍💻 Technische Learnings**
✔️ **Spring Boot & REST-APIs:** Wie man eine robuste API mit Sicherheitsmaßnahmen erstellt.  
✔️ **React.js:** Komponentenbasierte Entwicklung und State-Management mit Hooks.  
✔️ **JWT-Authentifizierung:** Sicherer Login-Mechanismus mit Token-Handling.  
✔️ **Datenbankdesign:** Optimierung von Tabellenstrukturen und Relationen.  
✔️ **Testing:** Erstellung von Unit- und Integrationstests für API-Endpunkte.

### **📈 Methodische Learnings**
✔️ **Teamarbeit & Kommunikation:** Regelmäßige Abstimmung & Code-Reviews verbessert den Workflow.  
✔️ **Problemlösung:** Systematische Fehlersuche durch Debugging & StackOverflow-Recherche.  
✔️ **Projektmanagement:** Strukturierte Planung und iterative Entwicklung haben geholfen, den Fokus zu behalten.  
✔️ **Git & Versionierung:** Branching-Strategien und Merge-Requests erleichterten die Zusammenarbeit.

---

## **12.4 Möglichkeiten zur Weiterentwicklung**

Obwohl unser Forum bereits über **viele wichtige Funktionen** verfügt, gibt es **zahlreiche Erweiterungsmöglichkeiten**, die wir in der Zukunft umsetzen könnten:

### **🚀 Mögliche Erweiterungen**
- ✅ **Private Nachrichten zwischen Benutzern**
- ✅ **Benachrichtigungssystem (z. B. neue Antworten auf eigene Posts)**
- ✅ **Reaktionssystem (Likes, Dislikes, Upvotes)**
- ✅ **Admin-Dashboard zur Verwaltung von Benutzern & Inhalten**
- ✅ **Suchfunktion für Beiträge und Foren**
- ✅ **Mehrsprachige Unterstützung (Deutsch, Englisch, Französisch, etc.)**
- ✅ **Verbesserte Mobile-Optimierung für Smartphones und Tablets**

---

## **12.5 Fazit & Abschluss**

Unser Projekt war eine **spannende und lehrreiche Erfahrung**, in der wir nicht nur unser technisches Wissen erweitert, sondern auch gelernt haben, wie man **komplexe Webanwendungen strukturiert entwickelt und sich als Team organisiert**.

🔹 **Was wir gut gemacht haben:**  
✅ Solide Architektur mit sauberem Code  
✅ Funktionierendes JWT-Auth-System  
✅ Übersichtliche & intuitive Benutzeroberfläche

🔹 **Was wir beim nächsten Mal verbessern würden:**  
❌ Frühzeitig bessere **Planung der Datenbankstruktur**  
❌ Mehr automatisierte **Tests** zur frühzeitigen Fehlererkennung  
❌ Nutzung von **TypeScript** für besseren Code-Schutz


---

