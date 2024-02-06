import * as utils from "../utils.js";

const groupId = new URL(window.location.href).searchParams.get("id");

fetch("/api")
  .then((res) => res.json())
  .then((res) => {
    const band = res.artists[groupId - 1];
    const results = document.getElementById("search-result");
    results.innerHTML = bandInfoToHtml(band);
  });

fetch("/api")
  .then((res) => res.json())
  .then((res) => {
    const elConcerts = document.getElementById("concerts");
    const locations = res.relations[groupId - 1].DatesLocations;

    const upComingConcerts = [];
    const pastConcerts = [];

    Object.keys(locations).map((location) => {
      const upComingConcertsList = [];
      const pastConcertsList = [];

      locations[location].map((date) => {
        var concertDate = new Date(date.split("-").reverse().join("-")); // Create a Date object
        if (concertDate > new Date()) {
          upComingConcertsList.push(date);
        } else {
          pastConcertsList.push(date);
        }
      });

      if (upComingConcertsList.length > 0) {
        upComingConcerts.push(
          convertDateLocation(
            utils.formatString(location),
            upComingConcertsList
          )
        );
      }
      if (pastConcertsList.length > 0) {
        pastConcerts.push(
          convertDateLocation(utils.formatString(location), pastConcertsList)
        );
      }
    });

    if (upComingConcerts.length > 0) {
      elConcerts.innerHTML += `
        <div class="concert" > 
        <h2 class="title">🗓️ Upcoming Concerts:</h2>
        ${upComingConcerts.join("")}
        </div>
        `;
    }
    if (pastConcerts.length > 0) {
      elConcerts.innerHTML += `
        <div class="concert"> 
        <h2 class="title">🗓️ Past Concerts:</h2>
        ${pastConcerts.join("")}
        </div>
        `;
    }
  });

function bandInfoToHtml(band) {
  return `
    <div class="container">
    <img src="${band.image}" alt="${band.name}">
    </div>
    <div class="container">
    <h2 class="title item-data">${band.name}</h2> 
    <p class="item-data">Creation Date: ${band.creationDate} 🗓️</p>
    <p class="item-data">First Album: ${new Date(
      band.firstAlbum.split("-").reverse().join("-")
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}</p>
    <p class="item-data members">Members: ${band.members.join(", ")}</p>
    <a href="/" class="item-data">↩️ Back to search</a>
    </div>
    `;
}

function convertDateLocation(location, dates) {
  let datesArray = [];
  dates
    .map((date) => {
      return date.split("-").reverse().join("-");
    })
    .sort((a, b) => {
      return new Date(b) - new Date(a);
    })
    .forEach((date) => {
      datesArray += `<li>• ${new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</li>`;
    });

  let emojies = ["🌆", "🏙️", "🌿", "🍺", "✨", "🌸", "☕", "❤️"];

  return `
    <div class="list-container">
    <ul class="list">
        ${location} ${emojies[Math.floor(Math.random() * emojies.length)]}
        ${datesArray}
    </ul>
    </div>
    `;
}
