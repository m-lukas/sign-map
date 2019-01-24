closePopup = () => {

    let confirmation_overlay = document.getElementById('confirmation-overlay');
    let search_overlay = document.getElementById('search-overlay');

    if(confirmation_overlay.classList.contains('is-visible')) confirmation_overlay.classList.remove('is-visible');
    if(search_overlay.classList.contains('is-visible')) search_overlay.classList.remove('is-visible');
    App.states.isMoving = false;
    App.states.movingCoords = null;
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

    var t = jQuery('#search-table').DataTable();
    t.clear().draw();

    let element = event.target.id;
    var value = event.target.value;

    let returnSigns = new Array();

    for(let i = 0; i < App.signList.length; i++){
        let sign = App.signList[i];
        if(sign.getName().includes(value)){
            returnSigns.push(sign);
            continue;
        } 
    }

    let k = 0;

    for(let i = 0; i < returnSigns.length; i++){
        k += 1;
        if(k > 30) break;
        let sign = returnSigns[i];
        signs.insertRow(sign);
    }

}