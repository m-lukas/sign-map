const App = require('./App.js');
const fs = require('fs');

const signs = {

    Sign: function(id, name, bent, category, dirPath, changeDate, coordinats, color){
        this.id = id;
        this.name = name;
        this.bent = bent;
        this.category = category;
        this.dirPath = dirPath;
        this.changeDate = changeDate;
        this.coordinats = coordinats;
        
        this.getID = () => {
            return this.id;
        }
        this.getName = () => {
            return this.name;
        }
        this.setName = (value) => {
            this.name = value;
            //update marker by id
        }
        this.isBent = () => {
            let isBent = null;
            this.bent === 'Schild ist gebogen' ? isBent = true : isBent = false;
            return isBent;
        }
        this.setBent = (value) => {
            this.bent = value;
            //update marker by id
        }
        this.getCategory = () => {
            return this.category;
        }
        this.setCategory = (value) => {
            this.category = value;
            //update marker by id
        }
        this.getPath = () => {
            return this.path;
        }
        this.setPath = (value) => {
            this.path = value;
            //update marker by id
        }
        this.getDate = () => {
            return this.changeDate;
        }
        this.setDate = (value) => {
            this.changeDate = value;
            //update marker by id
        }
        this.getCoordinates = () => {
            return this.coordinats;
        }
        this.setCoordinates = (value) => {
            this.coordinats = value;
            //update marker by id
        }
    
        //colors: strongyellow, lightyellow, purple, lightpurple, green, lightgreen, black, lightblue, magenta, darkgrey, blue, red, pink, brown, grey, orange,lightbrown, white
        this.getIcon = () => {
            let icon = App.iconPath + signs.Categories[this.category].icon
            return icon;
        }

        App.signList.push(this);

    },

    Categories: null,

    getCategories: (cb) => {
        let path = './categories.json';
        fs.readFile(require.resolve(path), (err, data) => {
            if (err){
                cb(err)
            }else{
                cb(null, JSON.parse(data))
            }
        })
    },

    findSignsByCategory: (category) => {
        let signs = new Array();
        App.signList.forEach(sign => {
            if(sign.getCategory() === category){
                signs.push(sign);
            }
        });
        return signs;
    },

    setMarkerVisibility: (signId, value) => {
        App.markerList.forEach(marker => {
            if(marker.id === signId){
                if(typeof value === "boolean") marker.setVisible(value);
            }
        });
    },

    loadSigns: () => {
        //id, name, bent, type, dirPath, changeDate, coordinats, color
        let signRef = App.database.ref("signs");
        signRef.orderByValue().once("value", function(snapshot) {
            snapshot.forEach(function(data) {
                let name = data.val().name;
                let bent = data.val().gebogen;
                let type = data.val().typ;
                let dirPath = data.val().save;
                let changeDate = data.val().date;
                let coordinats = {lat: data.val().lat, lng: data.val().lng};
                let category;
                switch(type){
                    case 'B1 - Service- und Informationsschild (A3 quer)':
                        category="1";
                        break;
                    case 'B2 - Service- und Informationsschild (A3 hoch)':
                        category="2";
                        break;
                    case 'B3 - Service- und Informationsschild (A4 quer)':
                        category="3";
                        break;
                    case 'B4 - Service- und Informationsschild (A4 hoch)':
                        category="4";
                        break;
                    case 'B5 - Service- und Informationsschild (A5 quer)':
                        category="5";
                        break;
                    case 'B6 - Service- und Informationsschild (A5 hoch)':
                        category="6";
                        break;
                    case 'B7 - Uebersichtstafel/Lageplan':
                        category="7";
                        break;
                    case 'B8 - Informationen zu spez. Patenschaften':
                        category="8";
                        break;
                    case 'B10 - Themenschilder':
                        category="9";
                        break;
                    case 'B11 - Rundgangsschild (Pfeilform)':
                        category="10";
                        break;
                    case 'B12 - Werbung/Plakat':
                        category="11";
                        break;
                    case 'S1 - Sachschild (Tier/Pflanze/Objekte)':
                        category="12";
                        break;
                    case 'S2 - Sachschilder (klein)':
                        category="13";
                        break;
                    case 'P1 - Sondertafel/Spiele':
                        category="14";
                        break;               
                    case 'W - Wegweiser':
                        category="15";
                        break;
                    case 'U - ungenormtes Schild':
                        category="16";
                        break;
                    case 'U/P1 - ungenormte Sondertafel':
                        category="17";
                        break;
                    default:
                        category="18";
                        break;        
                }
                
                let id = data.key;
                if(App.ids.includes(id)){
                    id = Math.max.apply(null, App.ids)+1;
                }
                App.ids.push(id);
                
                let sign = new signs.Sign(id, name, bent, category, dirPath, changeDate, coordinats);
    
                signs.placeMarker(sign);
                //insertRow(sign);
    
            });
        });
    },

    placeMarker: (sign) => {
           
        let marker = new google.maps.Marker({
            icon: sign.getIcon(),
            position: sign.getCoordinates(),
            map: App.map,
                    
            id: ''
        });
                
        marker.set('id', sign.getID());
                
        /*
        google.maps.event.addListener(marker, 'click', function() {
        } );
        */
                
        App.markerList.push(marker);

    }

}

module.exports = signs;