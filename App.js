const App = {
    map: null,
    dbConfig: {
    },
    database: null,
    table: null,
    markerPath: 'images/markers/',
    iconPath: 'images/icons/',
    selectedSign: null,
    signList: new Array(),
    markerList: new Array(),
    ids: new Array(),
    activeFilters: new Array(),
    inactiveFilters: new Array(),

    states: {
        nameValue: '',
        categoryId: '',
        categoryValue: '',
        bentId: '',
        bentValue: '',
        dirPathValue: '',
        ov_errors: [],
        isMoving: false,
        movingCoords: null,
        createCoords: null,
        isCreating: null,
    },

    filterIsActive: (identifier) => {
        for(let key in App.activeFilters){
            let filter = App.activeFilters[key];
            if(filter.type === identifier.type && filter.id == identifier.id){
                return true;
            }
        }
        return false;
    },

    indexOfFilter: (identifier, mode) => {
        switch(mode){
            case 'active':
                for(let key in App.activeFilters){
                    let filter = App.activeFilters[key];
                    if(filter.type === identifier.type && filter.id == identifier.id){
                        return key;
                    }
                }
                break;
            case 'inactive':
                for(let key in App.inactiveFilters){
                    let filter = App.inactiveFilters[key];
                    if(filter.type === identifier.type && filter.id == identifier.id){
                        return key;
                    }
                }
                break;
        }
        return -1;
    }
}

module.exports = App;
