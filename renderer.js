// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

require('jQuery');
const signs = require('./signs.js');
const App = require('./App.js');

renderFilters= () => {
    jQuery(document).ready(function(){
        Object.entries(signs.Categories).map((category) => {
            /*
                <div class="filter filter-active" onclick="onFilter(this, '1')">
                    <div class="markerIconWrapper">
                        <img class="markerIcon" src="images/icons/marker_green.png" alt="marker icon">
                    </div>
                    <p class="markerDesc">Test-Felds</p>
                </div>
            */

            App.activeFilters.push(category[0]);

            let filter = [
                `<div class="filter filter-active" onclick="onFilter(this, '${category[0]}')">`,
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

onFilter = (item, id) => {
    if(App.activeFilters.includes(id)){
        let index = App.activeFilters.indexOf(id);
        if(index > -1) App.activeFilters.splice(index, 1);
        item.classList.toggle('filter-active');

        let signsToHide = signs.findSignsByCategory(id);
        signsToHide.forEach(sign => {
            signs.setMarkerVisibility(sign.getID(), false);
        });

    }else{
        App.activeFilters.push(id);
        item.classList.toggle('filter-active');

        let signsToShow = signs.findSignsByCategory(id);
        signsToShow.forEach(sign => {
            signs.setMarkerVisibility(sign.getID(), true);
        });
    }
}