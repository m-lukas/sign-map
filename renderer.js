// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

require('jQuery');
const signs = require('./signs.js');
const App = require('./App.js');

renderCategories= () => {
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

            //<option value="...">...</option>
            let categoryOption = `<option value="${category[0]}">${category[1].name}</option>`
            jQuery(categoryOption).appendTo('#ov-category-edit');

        });     
    });
}

renderBentSelection = () => {
    jQuery(document).ready(function(){
        Object.entries(signs.BentTypes).map((bentType) => {

            //<option value="...">...</option>
            let bentOption = `<option value="${bentType[0]}">${bentType[1].name}</option>`
            jQuery(bentOption).appendTo('#ov-bent-edit');

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

selectMarker = (sign) => {

    if(sign !== App.selectedSign){
        unselectMarker();

        App.selectedSign = sign;
        App.states.nameValue = sign.getName();
        App.states.categoryId = sign.getCategory();
        App.states.categoryValue = signs.Categories[sign.getCategory()].name;
        App.states.bentId = sign.getBent();
        App.states.bentValue = signs.BentTypes[sign.getBent()].name;
        App.states.dirPathValue = sign.getPath();

        setOv(sign);

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

    App.states.nameValue = '';
    App.states.categoryValue = '';
    App.states.categoryId = '';
    App.states.bentId = '';
    App.states.bentValue = '';
    App.states.dirPathValue = '';

    document.getElementById('ov-overlay').style.display = 'block';

    resetOV();

}

setOv = (sign) => {

    document.getElementById('ov-id').innerHTML = sign.getID();
    document.getElementById('ov-name').innerHTML = sign.getName();
    document.getElementById('ov-categoryId').innerHTML = sign.getCategory();
    document.getElementById('ov-category').innerHTML = signs.Categories[sign.getCategory()].name;
    document.getElementById('ov-bent').innerHTML = signs.BentTypes[sign.getBent()].name;;
    document.getElementById('ov-dirPath').innerHTML = sign.getPath();
    document.getElementById('ov-date').innerHTML = sign.getDate();

    if(signs.Categories[sign.getCategory()].name.length > 37){
        document.getElementById('ov-category').style.fontSize = '12px';
    }else{
        document.getElementById('ov-category').style.fontSize = '15px';
    }

}

moveMarker = () => {

}

editMarker = () => {
    //document.getElementById('ov-name').style.display = 'none';
    document.getElementById('ov-category').style.display = 'none';
    document.getElementById('ov-bent').style.display = 'none';
    document.getElementById('ov-dirPath').style.display = 'none';

    document.getElementById('ov-edit-button').style.display = 'none';
    document.getElementById('ov-move-button').style.display = 'none';

    //document.getElementById('ov-name-edit').value = App.states.nameValue;
    document.getElementById('ov-category-edit').value = App.states.categoryId;
    document.getElementById('ov-bent-edit').value = App.states.bentId;
    document.getElementById('ov-dirPath-edit').value = App.states.dirPathValue;

    if(App.states.categoryValue.length > 37){
        document.getElementById('ov-category-edit').style.fontSize = '12px';
    }else{
        document.getElementById('ov-category-edit').style.fontSize = '15px';
    }

    //document.getElementById('ov-name-edit').style.display = 'block';
    document.getElementById('ov-category-edit').style.display = 'block';
    document.getElementById('ov-bent-edit').style.display = 'block';
    document.getElementById('ov-dirPath-edit').style.display = 'block';

    document.getElementById('ov-save').style.display = 'block';
}

resetOV = () => {
    //get all elements
    let ov_id = document.getElementById('ov-id');
    let ov_name = document.getElementById('ov-name');
    //let ov_name_edit = document.getElementById('ov-name-edit');
    let ov_categoryId = document.getElementById('ov-categoryId');
    let ov_category = document.getElementById('ov-category');
    let ov_category_edit = document.getElementById('ov-category-edit');
    let ov_bent = document.getElementById('ov-bent');
    let ov_bent_edit = document.getElementById('ov-bent-edit');
    let ov_dirPath = document.getElementById('ov-dirPath');
    let ov_dirPath_edit = document.getElementById('ov-dirPath-edit');
    let ov_date = document.getElementById('ov-date');
    let ov_edit_button = document.getElementById('ov-edit-button');
    let ov_move_button = document.getElementById('ov-move-button');
    let ov_save = document.getElementById('ov-save');

    //hide edit-fields
    //ov_name_edit.style.display = 'none';
    //ov_name_edit.style.display = 'none';
    ov_category_edit.style.display = 'none';
    ov_bent_edit.style.display = 'none';
    ov_dirPath_edit.style.display = 'none';
    ov_save.style.display = 'none';

    //reset all fields
    ov_id.innerHTML = "";
    ov_name.innerHTML = "";
    ov_categoryId.innerHTML = "";
    ov_category.innerHTML = "";
    ov_bent.innerHTML = "";
    ov_dirPath.innerHTML = "";
    ov_date.innerHTML = "";
    //ov_name_edit.value = "";
    ov_category_edit.value = "";
    ov_bent_edit.value = "";
    ov_dirPath_edit.value = "";

    //reset font-sizes
    ov_category.style.fontSize = '15px';
    ov_category_edit.style.fontSize = '15px';

    //show all standart fields
    ov_name.style.display = 'block';
    ov_category.style.display = 'block';
    ov_bent.style.display = 'block';
    ov_dirPath.style.display = 'block';
    ov_edit_button.style.display = 'block';
    ov_move_button.style.display = 'block';
}

onEdit = (event) => {
    let element = event.target.id;
    let value = event.target.value;

    //validation? -> not necessary if only selects

    switch(element){
        case 'ov-name-edit':
            App.states.nameValue = value;
            break;
        case 'ov-category-edit':
            App.states.categoryId = value;
            break;
        case 'ov-bent-edit':
            App.states.bentId = value;
            break;
        case 'ov-dirPath-edit':
            App.states.dirPathValue = value;
            break;
    }
}

saveEdits = () => {

    if(App.states.ov_errors.length === 0){

        resetOV();

        let name = App.states.nameValue;
        let category = App.states.categoryId;
        let bent = App.states.bentId;
        let dirPath = App.states.dirPathValue;

        App.selectedSign.setName(name);
        App.selectedSign.setCategory(category);
        App.selectedSign.setBent(bent);
        App.selectedSign.setPath(dirPath);

        let date = new Date();
        let formatedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

        App.selectedSign.setDate(formatedDate);

        setOv(App.selectedSign);

        //Success Message?

    }

}