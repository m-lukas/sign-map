const App = {
    map: null,
    dbConfig: {
    },
    database: null,
    table: null,
    iconPath: 'images/markers/',
    selectedSign: null,
    signList: new Array(),
    markerList: new Array(),
    ids: new Array(),
    activeFilters: new Array(),

    states: {
        nameValue: '',
        categoryId: '',
        categoryValue: '',
        bentId: '',
        bentValue: '',
        dirPathValue: '',
        ov_errors: []
    }
}

module.exports = App;
