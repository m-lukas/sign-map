const App = {
    map: null,
    dbConfig: {
        apiKey: "AIzaSyDQmL2bCD6rCRcxHOqOvXelpCPk90mSPew",
        authDomain: "tp-goerlitz-signs.firebaseapp.com",
        databaseURL: "https://tp-goerlitz-signs.firebaseio.com",
        projectId: "tp-goerlitz-signs",
        storageBucket: "",
        messagingSenderId: "171020637502"
    },
    database: null,
    table: null,
    signList: new Array(),
    markerList: new Array(),
    ids: new Array()
}

module.exports = App;