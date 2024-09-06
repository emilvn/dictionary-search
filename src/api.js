const endpoint = "http://localhost:8080/ordbogen";

/**
 * @returns {Promise<{min:number, max:number}>}
 */
export async function getSizes() {
  const json = await fetch(endpoint).then((response) => response.json());
  return json;
}

/**
 * @param {number} index
 * @returns {Promise<{inflected: string, headword: string, homograph: string, partofspeech: string,id: string}>}
 */
export async function getEntryAt(index) {
  const entry = await fetch(`${endpoint}/${index}`).then((resp) => resp.json());
  return entry;
}
