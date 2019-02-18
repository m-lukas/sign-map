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
        this.getBent = () => {
            return this.bent;
        }
        this.setBent = (value) => {
            this.bent = value;
            //update marker by id
        }
        this.getCategory = () => {
            return this.category;
        }
        this.getCategoryName = () => {
            return signs.Categories[this.category].name;
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
            let icon = App.markerPath + signs.Categories[this.category].icon
            return icon;
        }

        App.signList.push(this);

    },

    Bented: {
        bent: 'Gebogen',
        notBent: 'Nicht gebogen'
    },

    Categories: null,

    BentTypes: null,

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

    getBentTypes: (cb) => {
        let path = './bent.json';
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

    findSignsByBentType: (bentType) => {
        let signs = new Array();
        App.signList.forEach(sign => {
            if(sign.getBent() == bentType){
                signs.push(sign);
            }
        });
        return signs;
    },

    findSignById: (id) => {
        let sign = null;
        App.signList.forEach(querySign => {
            if(querySign.getID() === id){
                sign = querySign;
            }
        });
        return sign;
    },

    getNewId: () => {

        //TODO: USE DATABASE OR LISTENER

        let highestSignID = 1;
        App.signList.forEach(querySign => {
            if(parseInt(querySign.getID()) > parseInt(highestSignID)){
                highestSignID = parseInt(querySign.getID());
            }
        });
        return highestSignID+1;
    },

    setMarkerVisibility: (signId, value) => {
        let marker = signs.findMarkerById(signId);
        if(typeof value === "boolean" && marker !== null) marker.setVisible(value);
    },

    findMarkerById: (signId) => {
        let m = null;
        App.markerList.forEach(marker => {
            if(marker.id === signId){
                m = marker;
            }
        });
        if(m === null){
            return null;
        }else{
            return m;
        }
    },

    loadSigns: () => {
        //id, name, bent, type, dirPath, changeDate, coordinats, color
        let signRef = App.database.ref("signs");
        signRef.orderByValue().on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                let id = data.key;
                let refSign = signs.findSignById(id);
                if(refSign){
                    signs.clearSign(refSign);
                }
                let name = data.val().name;
                let bent = data.val().bentId;
                let type = data.val().typ;
                let dirPath = data.val().save || '';
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
                
                let sign = new signs.Sign(id, name, bent, category, dirPath, changeDate, coordinats);
    
                signs.placeMarker(sign);
    
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
                
        google.maps.event.addListener(marker, 'click', function() {
            selectMarker(sign);
        });
                
        App.markerList.push(marker);

    },

    insertRow: (sign) => {
        jQuery(document).ready(function() {
			var t = jQuery('#search-table').DataTable();	 
				t.row.add( [
					sign.getID(),
					sign.getName(),
                    sign.getCategoryName(),
                    sign.getDate()
				] ).draw( false );
		} );
    },

    clearSign: (sign) => {
        if(App.selectedSign === sign){
            unselectMarker(sign);
        }
        let marker = signs.findMarkerById(sign.getID());
        marker.setMap(null);
        let mi = App.markerList.indexOf(marker);
        App.markerList.splice(mi, 1)

        let si = App.signList.indexOf(sign);
        App.signList.splice(si, 1);
    }

}

module.exports = signs;