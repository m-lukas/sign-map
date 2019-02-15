closePopup = () => {

    resetOV();
    setOv(App.selectedSign);

}

cancelMoving = () => {

    let confirmation_overlay = document.getElementById('confirmation-overlay');

    App.states.isMoving = true;
    App.states.movingCoords = null;
    if(confirmation_overlay.classList.contains('is-visible')) confirmation_overlay.classList.remove('is-visible');

}

openSearch = () => {

    document.getElementById('search-overlay').classList.add('is-visible');

}

searchSigns = (event) => {

    let returnSigns = new Array();
    let signNumber = 0;

    let t = jQuery('#search-table').DataTable();
    t.clear().draw();

    let value;

    if(event != null){
        value = event.target.value;
    }else{
        value = document.getElementById('searchbar').value;
    }

    if(value != ""){
        for(let i = 0; i < App.signList.length; i++){
            let sign = App.signList[i];
            if(sign.getName().toUpperCase().includes(value.toUpperCase())){
                returnSigns.push(sign);
                continue;
            } 
        }
    
        for(let i = 0; i < returnSigns.length; i++){
            signNumber += 1;
            if(signNumber > 50) break;
            let sign = returnSigns[i];
            signs.insertRow(sign);
        }
    }

    document.getElementById('search-results-count').innerHTML = `${signNumber}/${returnSigns.length} Ergebnisse`
}

deleteMarker = () => {

    let confirmationPopup = new ConfirmationPopup(
        {description: "Möchten Sie den Marker wirklich <b>löschen</b>?"}, 
        'completeDeletion()', 
        'closePopup()'
    );
    confirmationPopup.render();

}

completeDeletion = () => {

    let sign = App.selectedSign;
    unselectMarker();

    let marker = signs.findMarkerById(sign.getID());
    marker.setMap(null);
    let mi = App.markerList.indexOf(marker);
    App.markerList.splice(mi, 1)

    let si = App.signList.indexOf(sign);
    App.signList.splice(si, 1);

    //remove from db
}

createMarker = (latLng) => {

    App.states.isCreating = true;
    App.states.createCoords = latLng;
    document.getElementById('create-overlay').classList.add('is-visible');

}

completeCreation = (e) => {

    e.preventDefault();
    if(App.states.isCreating && App.states.createCoords){

        let title = e.target.title.value;
        let category = e.target.category.value;
        let bent = e.target.bent.value;
        let dirPath = e.target.dirPath.value;

        let id = String(signs.getNewId());
        let date = getFormattedDate();
        let coordinats = App.states.createCoords;

        let sign = new signs.Sign(id, title, bent, category, dirPath, date, coordinats);
        App.signList.push(sign);

        //Save Marker to Database

        signs.placeMarker(sign); //not necessary if in database

        selectMarker(sign);
        closePopup();

    }else{
        closePopup();
    }

    e.target.reset();

}

getFormattedDate = () => {
    let date = new Date();
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}