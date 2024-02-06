import * as utils from "./utils.js" 

fetch("/api").then(res => res.json()).then(res => {
    const results = document.getElementById("search-result");
    results.innerHTML = res.artists.map(artists => {
        setTimeout(function(){
            const card = document.getElementById(artists.name);
            card.style.opacity = 1
        }, 100);
       return bandToHtml(artists)
    }).join("");
})

window.addEventListener('load', async function () {
    let bands = await fetch("/api").then(res => res.json())
    const input = document.getElementById("input");

    input.addEventListener("keyup", function (_) {
        removeList()
        for (let i = 0; i < bands.artists.length; i++) {
            const band = bands.artists[i];
            const card = document.getElementById(band.name);

            if (input.value !== "") {
                let bandHasData = false;
                if (band.name.toLowerCase().includes(input.value.toLowerCase())) {
                    card.style.display = "block";
                    bandHasData = true;
                    resultToLi(`${band.name} - Band`, band.id)
                }

                if (band.members) {
                    for (let i = 0; i < band.members.length; i++) {
                        const member = band.members[i]
                        if (member.toLowerCase().includes(input.value.toLowerCase())) {
                            card.style.display = "block";
                            bandHasData = true;
                            resultToLi(`${member} - Member`, band.id)
                        }
                    }
                }

                if (band.creationDate.toString().toLowerCase().includes(input.value.toLowerCase())) {
                    card.style.display = "block";
                    bandHasData = true;
                    resultToLi(`${band.creationDate} - Creation Date of ${band.name}`, band.id)
                }

                if (band.firstAlbum.toLowerCase().includes(input.value.toLowerCase())) {
                    card.style.display = "block";
                    bandHasData = true;
                    resultToLi(`${new Date(band.firstAlbum.split("-").reverse().join("-")).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} - First Album of ${band.name}`, band.id)
                } 

                const locations = bands.relations[band.id-1].DatesLocations;

                Object.keys(locations).map((location) => {
                    if (location.toLowerCase().includes(input.value.toLowerCase())) {
                        card.style.display = "block";
                        bandHasData = true;
                        resultToLi(`${utils.formatString(location)} - Concert location of ${band.name}`, band.id)
                    }
                })

                if (bandHasData === false) {
                    card.style.display = "none";
                }
            } 

            if (input.value === "") {
                card.style.display = "block";
            } 
        }
    })
})

function removeList() {
    const items = document.querySelectorAll(".list-items");
    items.forEach(item => item.remove());
}


function bandToHtml(band) {
    return `<div class="item" id="${band.name}">
    <a href="/band?id=${band.id}" style="display: flex;align-items: center;justify-content: center;" class="url"><img src="${band.image}" alt="${band.name}"></a>
    <div class="flex-container">
    <h2 class="title"><a href="/band?id=${band.id}" class="url"> ${band.name}</a></h2> 
    </div>
    <p class="item-data">Creation Date: ${band.creationDate}</p>
    <p class="item-data">First Album: ${new Date(band.firstAlbum.split("-").reverse().join("-")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</p>

    <h3 class="info">Members: ${band.members.join(", ")}</h3>
    </div>`
}

function resultToLi(textToDisplay, id) {
    const listItem = document.createElement("li")
    listItem.classList.add("list-items");
    listItem.style.cursor = "pointer";
    listItem.setAttribute("onclick", `location.href='/band?id=${id}'`)
    listItem.innerHTML = textToDisplay
    document.querySelector(".list").appendChild(listItem);
}