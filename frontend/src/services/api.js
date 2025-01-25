// Basis-URL für alle API-Aufrufe
const BASE_URL = 'http://localhost:8080/api';

/**
 * Utility-Funktion: Holt den Token aus dem LocalStorage und überprüft seine Gültigkeit.
 * @returns {string|null} Der gültige Token oder null, wenn der Token fehlt oder ungültig ist.
 */
const getToken = () => {
    const token = localStorage.getItem('token'); // Token aus LocalStorage abrufen
    if (!token) return null;

    try {
        const { exp } = JSON.parse(atob(token.split('.')[1])); // JWT-Dekodierung
        // Überprüfen, ob der Token abgelaufen ist
        if (exp * 1000 < Date.now()) {
            console.error('Token abgelaufen');
            return null;
        }
        return token; // Gültiger Token wird zurückgegeben
    } catch (error) {
        console.error('Ungültiger Token:', error);
        return null;
    }
};

/**
 * Utility-Funktion: Erstellt die HTTP-Header für API-Aufrufe.
 * @param {boolean} isAuthRequired Gibt an, ob der Authorization-Header benötigt wird.
 * @returns {object} Die HTTP-Header.
 */
const getHeaders = (isAuthRequired = false) => {
    const headers = { 'Content-Type': 'application/json' }; // Standard-Header
    if (isAuthRequired) {
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`; // Auth-Header hinzufügen
    }
    return headers;
};

/**
 * Utility-Funktion: Führt einen allgemeinen API-Aufruf durch.
 * @param {string} endpoint Der API-Endpunkt.
 * @param {string} method Die HTTP-Methode (z. B. GET, POST, PUT, DELETE).
 * @param {object|null} body Die Anfrage-Daten (falls erforderlich).
 * @param {boolean} isAuthRequired Gibt an, ob die Anfrage eine Authentifizierung erfordert.
 * @returns {Promise<any>} Die Antwort der API.
 */
const apiRequest = async (endpoint, method = 'GET', body = null, isAuthRequired = false) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: getHeaders(isAuthRequired),
            body: body ? JSON.stringify(body) : null, // Daten als JSON senden (falls vorhanden)
        });

        // Fehlerbehandlung basierend auf der Antwort
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Fehler bei der API-Anfrage');
        }

        return response.status !== 204 ? response.json() : null; // Rückgabe, falls kein Inhalt (204)
    } catch (error) {
        console.error(`Fehler bei ${method} ${endpoint}:`, error);
        throw error;
    }
};

/**
 * API-Aufrufe
 */

// Holt alle Foren
export const fetchForums = async () => apiRequest('/forums');

/**
 * Erstellt ein neues Forum.
 * @param {object} forum Die Daten des neuen Forums.
 * @returns {Promise<any>} Die Antwort der API.
 */
export const createForum = async (forum) => apiRequest('/forums', 'POST', forum, true);

/**
 * Holt Beiträge zu einem bestimmten Forum.
 * @param {string} forumId Die ID des Forums.
 * @returns {Promise<any>} Die Antwort der API.
 */
export const fetchPostsByForum = async (forumId) => apiRequest(`/posts?forumId=${forumId}`);

/**
 * Fügt einen neuen Kommentar zu einem Forum hinzu.
 * @param {string} forumId Die ID des Forums.
 * @param {object} comment Der Kommentar (z. B. `{ content: "Kommentartext" }`).
 * @returns {Promise<any>} Die Antwort des Servers (hinzugefügter Kommentar).
 */
export const addCommentToForum = async (forumId, comment) =>
    apiRequest(`/forums/${forumId}/comments`, 'POST', comment, true);

/**
 * Holt alle Kommentare eines Forums.
 * @param {string} forumId Die ID des Forums.
 * @returns {Promise<any>} Eine Liste der Kommentare.
 */
export const fetchCommentsByForum = async (forumId) =>
    apiRequest(`/forums/${forumId}/comments`, 'GET');

/**
 * Führt den Login durch und gibt den Token zurück.
 * @param {object} credentials Die Login-Daten (z. B. Benutzername und Passwort).
 * @returns {Promise<string>} Der Token bei Erfolg.
 */
export const login = async (credentials) => {
    const response = await apiRequest('/auth/login', 'POST', credentials);
    return response.token; // Token zurückgeben
};

/**
 * Registriert einen neuen Benutzer.
 * @param {object} credentials Die Registrierungsdaten (z. B. Benutzername, Passwort).
 * @returns {Promise<void>} Keine Antwort bei Erfolg.
 */
export const register = async (credentials) => apiRequest('/auth/register', 'POST', credentials);
