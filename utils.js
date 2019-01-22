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