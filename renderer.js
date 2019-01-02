// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

require('jQuery');
const signs = require('./signs.js');
const App = require('./App.js');

renderFilters= () => {
    jQuery(document).ready(function(){
        console.log(signs.Categories);
        Object.entries(signs.Categories).map((category) => {
            /*
                <div class="filter">
                    <div class="markerIconWrapper">
                        <img class="markerIcon" src="images/icons/marker_green.png" alt="marker icon">
                    </div>
                    <p class="markerDesc">B5 - Service- und Informationsschild (A5 quer)</p>
                </div>
            */

            let filter = [
                `<div class="filter" data-id=${category[0]}>`,
                    `<div class="markerIconWrapper">`,
                        `<img class="markerIcon" src=${App.iconPath + category[1].icon} alt="marker icon">`,
                    `</div>`,
                    `<p class="markerDesc">${category[1].name}</p>`,
                `</div>`
            ]

            jQuery(filter.join('')).appendTo('#filters');

        });     
    });
}