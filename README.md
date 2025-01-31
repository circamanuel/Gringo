

---

# Modul 223 Projektarbeit: Forum - Gringo

**Ersteller:**
- Merlin Lüdi
- Lorik Murtesi
- Manuel Vacirca

**Datum:**  
25.01.2025

---

## Inhaltsverzeichnis

1. [Einleitung und Anforderungsanalyse (User Stories)](#1-einleitung-und-anforderungsanalyse-user-stories)
2. [Sicherheitskonzept](#2-sicherheitskonzept)
3. [Arbeitsplanung](#3-arbeitsplanung)
4. [Test-Konzept](#4-test-konzept)
5. [Beschreibung der eingesetzten Frameworks](#5-beschreibung-der-eingesetzten-frameworks)
6. [Beschreibung der Abläufe beim Login](#6-beschreibung-der-abläufe-beim-login)
7. [Testprotokoll](#7-testprotokoll)
8. [Arbeitsjournal](#8-arbeitsjournal)
9. [Verwendung von ChatGPT](#9-verwendung-von-chatgpt)

---

## 1. Einleitung und Anforderungsanalyse (User Stories)

### Einleitung

Das Ziel des Projekts ist die Entwicklung eines interaktiven Forums, in dem Benutzer Beiträge erstellen, sich über Themen austauschen und miteinander kommunizieren können. Die Webanwendung basiert auf **Spring Boot** (Backend) und **React** (Frontend).

Besonderes Augenmerk liegt auf der Benutzerfreundlichkeit und Sicherheit, wobei moderne Technologien wie JWT für die Authentifizierung und HTTPS für die verschlüsselte Kommunikation eingesetzt werden.

### Anforderungsanalyse

#### Funktionale Anforderungen:
1. Registrierung und Login mit Benutzerauthentifizierung über JWT.
2. Erstellung und Verwaltung von Foren und Beiträgen.
3. Intuitive und benutzerfreundliche Oberfläche.
4. Zugriffskontrolle basierend auf dem Anmeldestatus.

#### Nicht-funktionale Anforderungen:
1. Sichere Datenübertragung und Speicherung.
2. Skalierbare Architektur.
3. Einfache Wartbarkeit und Erweiterbarkeit.

#### User Stories:
- **Registrierung & Login:**  
  *"Als Benutzer möchte ich mich registrieren und anmelden können, um auf die Funktionen des Forums zugreifen zu können."*
- **Forenerstellung:**  
  *"Als Benutzer möchte ich Foren erstellen und Beiträge verfassen können."*
- **Beitragsanzeige:**  
  *"Als Benutzer möchte ich alle Beiträge in einem Forum sehen können, um Diskussionen zu verfolgen."*
- **Sicherheit:**  
  *"Als Gast möchte ich öffentliche Foren ansehen können, ohne mich anzumelden."*

---

## 2. Sicherheitskonzept

- **Authentifizierung:** Verwendung von JWT mit begrenzter Gültigkeit.
- **Datensicherheit:**
    - Passwörter werden gehasht (BCrypt).
    - Kommunikation erfolgt ausschließlich über HTTPS.
- **Eingabeverarbeitung:** Schutz vor SQL-Injection und XSS durch Datenvalidierung und -sanitierung.
- **Zugriffskontrolle:** Nur autorisierte Benutzer dürfen Foren erstellen und Beiträge verfassen.
- **Protokollierung:** Sicherheitsrelevante Ereignisse wie Login-Versuche werden geloggt.

---

## 3. Arbeitsplanung

| Arbeitspaket                     | Zeitaufwand |
|-----------------------------------|-------------|
| Analyse und Konzeption            | 4 Stunden   |
| Einrichtung der Entwicklungsumgebung | 2 Stunden   |
| Backend-Entwicklung               | 10 Stunden  |
| Frontend-Entwicklung              | 12 Stunden  |
| Verknüpfung von Frontend und Backend | 6 Stunden   |
| Tests und Debugging               | 8 Stunden   |
| Dokumentation                     | 6 Stunden   |
| Präsentationsvorbereitung         | 2 Stunden   |

Gesamter Aufwand: **50 Stunden**.

---

## 4. Test-Konzept

### Arten von Tests:
- **Unit-Tests:** Backend-Logik und API-Endpunkte.
- **Integrationstests:** Verbindung zwischen Frontend und Backend.
- **End-to-End-Tests:** Gesamtabläufe im System.

### Testfälle:
1. Registrierung eines neuen Benutzers.
2. Erstellung eines neuen Forums.
3. Anzeige von Beiträgen in einem Forum.
4. Login mit gültigen/ungültigen Daten.

---

## 5. Beschreibung der eingesetzten Frameworks

### Spring Boot (Backend):
- **Einsatzbereich:** RESTful-API, Datenbankzugriffe, Sicherheitsmechanismen.
- **Vorteile:** Einfache Integration von Sicherheitsfeatures, robuste Performance.

### React (Frontend):
- **Einsatzbereich:** Dynamische UI-Komponenten, Routing, State-Management.
- **Vorteile:** Komponentenbasierte Architektur, schnelle UI-Updates dank Virtual DOM.

---

## 6. Beschreibung der Abläufe beim Login

1. **Benutzeranfrage:** Anmeldedaten werden im Frontend eingegeben und an das Backend gesendet.
2. **Backend-Authentifizierung:** Passwortprüfung und JWT-Generierung.
3. **Token-Speicherung:** Das Token wird im `localStorage` oder `sessionStorage` gespeichert.
4. **Zugriffskontrolle:** API-Anfragen verwenden das Token zur Autorisierung.

---

## 7. Testprotokoll

| Testname            | Tester       | Datum       | Status    |
|---------------------|--------------|-------------|-----------|
| Registrierungstest  | M. Lüdi      | 25.01.2025  | Bestanden |
| Forenerstellungstest | L. Murtesi  | 25.01.2025  | Bestanden |
| Beitragserstellungstest | M. Vacirca | 25.01.2025 | Bestanden |
| Logintest           | L. Murtesi   | 25.01.2025  | Bestanden |

---

## 8. Arbeitsjournal

### 25.01.2025:
- **M. Lüdi:** Einrichtung der Datenbank und Erstellung von API-Endpunkten.
- **L. Murtesi:** Aufbau der Login-Seite und Integration der Authentifizierungslogik.
- **M. Vacirca:** Frontend-Kommunikation mit Backend und Styling der Forenübersicht.

---

## 9. Verwendung von ChatGPT

Während der Entwicklung des Projekts wurde **ChatGPT** genutzt, um:
- **Code-Snippets:** Vorschläge für Spring Boot und React zu erhalten.
- **Allgemeine Recherche:** Klärung von Konzepten wie JWT, Datenbankkonfiguration und API-Tests.
- **Optimierung:** Verbesserung der bestehenden Code-Strukturen und Sicherheitsmechanismen.
- **Dokumentation:** Unterstützung bei der Erstellung des Sicherheitskonzepts und der Beschreibung der Abläufe.

Die Verwendung von ChatGPT ermöglichte eine effizientere Entwicklung und lieferte nützliche Hinweise zur Umsetzung von Best Practices.

---

