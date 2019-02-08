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