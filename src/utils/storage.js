const DB_NAME = "TicketDB";
const STORE_NAME = "tickets";
const DB_VERSION = 1;

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error opening IndexedDB");
    });
};

export const saveTicketToDB = async (ticketData) => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.add(ticketData);
    } catch (error) {
        console.error("Error saving ticket to IndexedDB:", error);
    }
};

export const getTicketsFromDB = async () => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Error retrieving tickets");
        });
    } catch (error) {
        console.error("Error retrieving tickets from IndexedDB:", error);
    }
};

export const clearTicketsDB = async () => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.clear();
    } catch (error) {
        console.error("Error clearing IndexedDB:", error);
    }
};

export const clearLocalStorage = async () => {
    localStorage.removeItem("Selected Ticket Details");
    localStorage.removeItem("formData");
    localStorage.removeItem("Current section");
    localStorage.removeItem("TicketSaved");
}
