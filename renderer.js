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

onMarkerClick = (sign) => {
    if(sign !== App.selectedSign){
        unselectMarker();
        
        App.selectedSign = sign;
        document.getElementById('ov-id').innerHTML = sign.getID();
        document.getElementById('ov-name').innerHTML = sign.getName();
        document.getElementById('ov-category').innerHTML = signs.Categories[sign.getCategory()].name;
        document.getElementById('ov-bent').innerHTML = `${sign.isBent() ? 'Gebogen' : 'Nicht gebogen'}.`;
        document.getElementById('ov-dirPath').innerHTML = sign.getPath();
        document.getElementById('ov-date').innerHTML = sign.getDate();

        if(signs.Categories[sign.getCategory()].name.length > 37){
            document.getElementById('ov-category').style.fontSize = '12px';
        }else{
            document.getElementById('ov-category').style.fontSize = '15px';
        }

        document.getElementById('ov-overlay').style.display = 'none';

        let marker = signs.findMarkerById(sign.getID());
        if(marker !== null) marker.setAnimation(google.maps.Animation.BOUNCE);

    }
}

unselectMarker = () => {
    if(App.selectedSign !== null){
        let oldMarker = signs.findMarkerById(App.selectedSign.getID());
        oldMarker.setAnimation(null);
    }
    App.selectedSign = null;

    document.getElementById('ov-overlay').style.display = 'block';

    document.getElementById('ov-id').innerHTML = '';
    document.getElementById('ov-name').innerHTML = '';
    document.getElementById('ov-category').innerHTML = '';
    document.getElementById('ov-bent').innerHTML = '';
    document.getElementById('ov-dirPath').innerHTML = '';
    document.getElementById('ov-date').innerHTML = '';

    resetOV();
}

moveMarker = () => {

}

editMarker = () => {
    //let name = document.getElementById('ov-name').innerHTML;
    let category = document.getElementById('ov-category').innerHTML;
    let bent = document.getElementById('ov-bent').innerHTML;
    let dirPath = document.getElementById('ov-dirPath').innerHTML;

    document.getElementById('ov-category').style.display = 'none';
    document.getElementById('ov-bent').style.display = 'none';
    document.getElementById('ov-dirPath').style.display = 'none';
    //document.getElementById('ov-name').style.display = 'block';

    document.getElementById('ov-edit-button').style.display = 'none';
    document.getElementById('ov-move-button').style.display = 'none';

    //document.getElementById('ov-name-edit').value = name;
    document.getElementById('ov-category-edit').value = category;
    document.getElementById('ov-bent-edit').value = bent;
    document.getElementById('ov-dirPath-edit').value = dirPath;

    if(category.length > 37){
        document.getElementById('ov-category-edit').style.fontSize = '12px';
    }else{
        document.getElementById('ov-category-edit').style.fontSize = '15px';
    }

    document.getElementById('ov-category-edit').style.display = 'block';
    document.getElementById('ov-bent-edit').style.display = 'block';
    document.getElementById('ov-dirPath-edit').style.display = 'block';
    //document.getElementById('ov-name').style.display = 'block';

    document.getElementById('ov-save').style.display = 'block';
}

resetOV = () => {
    document.getElementById('ov-save').style.display = 'none';
    document.getElementById('ov-category-edit').style.display = 'none';
    document.getElementById('ov-bent-edit').style.display = 'none';
    document.getElementById('ov-dirPath-edit').style.display = 'none';
    //document.getElementById('ov-name-edit').style.display = 'none';

    document.getElementById('ov-category-edit').value = '';
    document.getElementById('ov-bent-edit').value = '';
    document.getElementById('ov-dirPath-edit').value = '';
    //document.getElementById('ov-name-edit').value = '';

    document.getElementById('ov-edit-button').style.display = 'block';
    document.getElementById('ov-move-button').style.display = 'block';

    document.getElementById('ov-category').style.display = 'block';
    document.getElementById('ov-bent').style.display = 'block';
    document.getElementById('ov-dirPath').style.display = 'block';
    //document.getElementById('ov-name').style.display = 'block';

    document.getElementById('ov-category-edit').style.fontSize = '15px';
}

saveEdits = () => {

    //let name = document.getElementById('ov-name').value;
    let category = document.getElementById('ov-category-edit').value;
    let bent = document.getElementById('ov-bent-edit').value;
    let dirPath = document.getElementById('ov-dirPath-edit').value;

    //validation

    console.log(category );
    console.log(bent);

    let date = new Date();
    let formatedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    document.getElementById('ov-date').innerHTML = formatedDate;

    //document.getElementById('ov-name').innerHTML = name;
    document.getElementById('ov-category').innerHTML = category;
    document.getElementById('ov-bent').innerHTML = bent;
    document.getElementById('ov-dirPath').innerHTML = dirPath;

    if(category.length > 37){
        document.getElementById('ov-category').style.fontSize = '12px';
    }else{
        document.getElementById('ov-category').style.fontSize = '15px';
    }

    resetOV();

}