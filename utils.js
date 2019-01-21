closePopup = () => {

    document.getElementById('confirmation-overlay').classList.remove('is-visible');
    resetOV();
    setOv(App.selectedSign);

}