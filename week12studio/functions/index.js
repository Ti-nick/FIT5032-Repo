/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions/v2");
const {onRequest} = require("firebase-functions/v2/https");
const {
  onDocumentCreated,
  onDocumentUpdated,
} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();
setGlobalOptions({region: "australia-southeast1"});

/**
 * Count docs in the "books" collection.
 */
exports.countBooks = onRequest({cors: true}, async (req, res) => {
  try {
    const db = admin.firestore();
    const snap = await db.collection("books").get();
    res.status(200).send({count: snap.size});
  } catch (err) {
    console.error("Error counting books:", err.message);
    res.status(500).send("Error counting books");
  }
});

/**
 * Convert book fields to ALL CAPS.
 * @param {Object} data Book document fields
 * @return {Object} Object with uppercased isbn and/or name
 */
function toAllCapsForBook(data) {
  const out = {};
  if (data && typeof data.isbn === "string") {
    out.isbn = data.isbn.toUpperCase();
  }
  if (data && typeof data.name === "string") {
    out.name = data.name.toUpperCase();
  }
  return out;
}

/**
 * Uppercase on create: books/{docId}
 */
exports.capitalizeBookOnCreate = onDocumentCreated(
    "books/{docId}",
    async (event) => {
      const snap = event && event.data;
      if (!snap) return;
      const data = snap.data() || {};
      const updates = toAllCapsForBook(data);
      if (Object.keys(updates).length > 0) {
        await snap.ref.update(updates);
      }
    },
);

/**
 * Uppercase on update: books/{docId}
 */
exports.capitalizeBookOnUpdate = onDocumentUpdated(
    "books/{docId}",
    async (event) => {
      const dataAfter = event && event.data && event.data.after;
      if (!dataAfter) return;
      const data = dataAfter.data() || {};
      const updates = toAllCapsForBook(data);
      if (Object.keys(updates).length > 0) {
        await dataAfter.ref.update(updates);
      }
    },
);

/**
 * HTTP endpoint to add a book (POST only).
 * Body: { isbn: string, name: string }
 */
exports.addBook = onRequest({cors: true}, async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const body = req.body || {};
    const isbn = body.isbn;
    const name = body.name;
    if (!isbn || !name) {
      return res.status(400).send("Missing fields: isbn, name");
    }

    const db = admin.firestore();
    const ref = await db.collection("books").add({
      isbn,
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).send({id: ref.id, ok: true});
  } catch (err) {
    console.error("Error adding book:", err.message);
    res.status(500).send("Error adding book");
  }
});

/**
 * HTTP endpoint to get all books (GET only).
 */
exports.getAllBooks = onRequest({cors: true}, async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).send("Method Not Allowed");
    }
    const db = admin.firestore();
    const snapshot = await db.collection("books").get();
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(books);
  } catch (err) {
    console.error("Error getting all books:", err.message);
    res.status(500).send("Error getting all books");
  }
});

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
