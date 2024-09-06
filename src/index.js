import { getSizes, getEntryAt } from "./api.js";
window.addEventListener("load", main);

async function main() {
  const searchButton = document.querySelector("#search-button");
  const searchInput = document.querySelector("#search-input");
  searchButton.addEventListener("click", binarySearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      binarySearch();
    }
  });
}

async function binarySearch() {
  const searchInput = document.querySelector("#search-input");
  const searchResultDiv = document.querySelector("#search-result");
  const requestCountSpan = document.querySelector("#request-count");
  const totalTimeSpan = document.querySelector("#total-time");
  searchResultDiv.innerHTML = "<h4>Søger...</h4>";

  const sizes = await getSizes();
  const searchValue = searchInput.value;
  let min = sizes.min;
  let max = sizes.max;
  let count = 0;
  const startTime = performance.now();

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    count++;
    requestCountSpan.innerText = count;
    const entry = await getEntryAt(mid);
    const c = compare(searchValue, entry.inflected);
    if (c === 0) {
      searchResultDiv.innerHTML = getEntryHtml(entry);
      const endTime = performance.now();
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      totalTimeSpan.innerText = totalTimeInSeconds.toFixed(4) + " sekunder";
      return;
    }
    if (c > 0) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  searchResultDiv.innerHTML = "<h4>Ikke fundet</h4>";
  const endTime = performance.now();
  const totalTimeInSeconds = (endTime - startTime) / 1000;
  totalTimeSpan.innerText = totalTimeInSeconds.toFixed(4) + " sekunder";
}

function compare(a, b) {
  return a
    .toLowerCase()
    .normalize("NFKD")
    .localeCompare(b.toLowerCase().normalize("NFKD"));
}

function getEntryHtml(entry) {
  return `
    <ul>
      <li>Inflected <span>${entry.inflected}</span></li>
      <li>Headword <span>${entry.headword}</span></li>
      <li>Homograph <span>${entry.homograph}</span></li>
      <li>Part of speech <span>${entry.partofspeech}</span></li>
      <li>id <span>${entry.id}</span></li>
    </ul>
  `;
}
