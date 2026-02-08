// let borderRange = document.getElementById("border-range")
// let paddingRange = document.getElementById("padding-range")
// let contentRange = document.getElementById("content-range")

// let borderColor = document.getElementById("border-color")
// let paddingColor = document.getElementById("padding-color")
// let contentColor = document.getElementById("content-color")

// let borderBox = document.querySelector(".border")
// let paddingBox = document.querySelector(".padding")
// let contentBox = document.querySelector(".content")

// borderRange.addEventListener("change", function(){
//     console.log(borderRange.value);
//     borderBox.style.padding = borderRange.value + "px"
// })
// paddingRange.addEventListener("change", function(){
//     paddingBox.style.padding = paddingRange.value + "px"
// })
// contentRange.addEventListener("change", function(){
//     contentBox.style.padding = contentRange.value + "px"
// })

// borderColor.addEventListener("change", function(){
//     borderBox.style.backgroundColor = borderColor.value
// })
// paddingColor.addEventListener("change", function(){
//     paddingBox.style.backgroundColor = paddingColor.value
// })
// contentColor.addEventListener("change", function(){
//     contentBox.style.backgroundColor = contentColor.value
// })

const imgElement = document.getElementById("metImg");

fetch("https://wordoftheday.freeapi.me/")
    .then(response => response.json())
    .then(data => {
        const wordOfTheDay = data.word;
        console.log(wordOfTheDay);
        return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${wordOfTheDay}&hasImages=true&isHighlight=true`);
    })
    .then(response => response.json())
    .then(data2 => {
        const randomIndex = Math.floor(Math.random() * data2.objectIDs.length);
        const rand = data2.objectIDs[randomIndex];
        console.log(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${rand.toString()}`)
        return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${rand.toString()}`)
    })
    .then(response => response.json())  
    .then(data3 => {
        const imgUrl = data3.primaryImage
        if(imgUrl && imgUrl != null) {
            imgElement.src = data3.primaryImageSmall;
            // imgElement.height = (data.measurements[0].elementMeasurements.Height * window.screen.height) / 400
        }
    })
    .catch(error => console.error("Error fetching image:", error));