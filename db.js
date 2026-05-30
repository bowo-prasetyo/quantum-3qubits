const DB_NAME = 'quantum-db-3';
const STORE_NAME = 'states';
const KEY = 'qubit';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORE_NAME, { keyPath: KEY });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveState(
  stateRe,
  stateIm,
  circuit
) {

  const db = await openDB();

  return new Promise((resolve, reject) => {

    const tx = db.transaction(
      'states',
      'readwrite'
    );

    const store = tx.objectStore('states');

    store.put({
      id: 'latest',

      re: Array.from(stateRe),

      im: Array.from(stateIm),

      circuit: JSON.parse(
        JSON.stringify(this.circuit)
      )
    });

    tx.oncomplete = () => resolve();

    tx.onerror = () => reject(tx.error);

  });
}

export async function loadState() {

  const db = await openDB();

  return new Promise((resolve, reject) => {

    const tx = db.transaction(
      'states',
      'readonly'
    );

    const store = tx.objectStore('states');

    const req = store.get('latest');

    req.onsuccess = () => {

      const result = req.result;

      if (!result) {

        resolve(null);

        return;
      }

      resolve({

        stateRe: new Float64Array(result.re),

        stateIm: new Float64Array(result.im),

        circuit: result.circuit || []

      });
    };

    req.onerror = () => reject(req.error);

  });
}
