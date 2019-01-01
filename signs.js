const App = require('./App.js');

const signs = {

    Sign: function(id, name, bent, type, dirPath, changeDate, coordinats, color){
        this.id = id;
        this.name = name;
        this.bent = bent;
        this.type = type;
        this.dirPath = dirPath;
        this.changeDate = changeDate;
        this.coordinats = coordinats;
        this.color = color;
        
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
        this.getType = () => {
            return this.type;
        }
        this.setType = (value) => {
            this.type = value;
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
        this.getColor = () => {
            return this.color;
        }
        this.setColor = (value) => {
            this.color = value;
            //update marker by id
        }
    
        //colors: strongyellow, lightyellow, purple, lightpurple, green, lightgreen, black, lightblue, magenta, darkgrey, blue, red, pink, brown, grey, orange,lightbrown, white
        this.getIcon = () => {
            let icon
            let iconPath = 'images/icons/'
            switch(this.color){
                case 'strongyellow':
                    icon = iconPath + 'marker_strongyellow.png';
                    break;
                case 'lightyellow':
                    icon = iconPath + 'marker_lightyellow.png';
                    break;
                case 'purple':
                    icon = iconPath + 'marker_purple.png';
                    break;
                case 'lightpurple':
                    icon = iconPath + 'marker_lightpurple.png';
                    break;
                case 'green':
                    icon = iconPath + 'marker_green.png';
                    break;
                case 'lightgreen':
                    icon = iconPath + 'marker_lightgreen.png';
                    break;
                case 'black':
                    icon = iconPath + 'marker_black.png';
                    break;
                case 'lightblue':
                    icon = iconPath + 'marker_lightblue.png';
                    break;
                case 'magenta':
                    icon = iconPath + 'marker_magenta.png';
                    break;
                case 'darkgrey':
                    icon = iconPath + 'marker_darkgrey.png';
                    break;
                case 'blue':
                    icon = iconPath + 'marker_blue.png';
                    break;
                case 'red':
                    icon = iconPath + 'marker_red.png';
                    break;
                case 'pink':
                    icon = iconPath + 'marker_pink.png';
                    break;
                case 'brown':
                    icon = iconPath + 'marker_brown.png';
                    break;               
                case 'grey':
                    icon = iconPath + 'marker_grey.png';
                    break;
                case 'orange':
                    icon = iconPath + 'marker_orange.png';
                    break;
                case 'lightbrown':
                    icon = iconPath + 'marker_lightbrown.png';
                    break;
                default:
                    icon = iconPath + 'marker_white.png';
                    break;        
            }
            return icon;
        }
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
                let color;
                switch(type){
                    case 'B1 - Service- und Informationsschild (A3 quer)':
                        color='strongyellow';
                        break;
                    case 'B2 - Service- und Informationsschild (A3 hoch)':
                        color='lightyellow';
                        break;
                    case 'B3 - Service- und Informationsschild (A4 quer)':
                        color='purple';
                        break;
                    case 'B4 - Service- und Informationsschild (A4 hoch)':
                        color='lightpurple';
                        break;
                    case 'B5 - Service- und Informationsschild (A5 quer)':
                        color='green';
                        break;
                    case 'B6 - Service- und Informationsschild (A5 hoch)':
                        color='lightgreen';
                        break;
                    case 'B7 - Uebersichtstafel/Lageplan':
                        color='black';
                        break;
                    case 'B8 - Informationen zu spez. Patenschaften':
                        color='lightblue';
                        break;
                    case 'B10 - Themenschilder':
                        color='magenta';
                        break;
                    case 'B11 - Rundgangsschild (Pfeilform)':
                        color='darkgrey';
                        break;
                    case 'B12 - Werbung/Plakat':
                        color='blue';
                        break;
                    case 'S1 - Sachschild (Tier/Pflanze/Objekte)':
                        color='red';
                        break;
                    case 'S2 - Sachschilder (klein)':
                        color='pink';
                        break;
                    case 'P1 - Sondertafel/Spiele':
                        color='brown';
                        break;               
                    case 'W - Wegweiser':
                        color='grey';
                        break;
                    case 'U - ungenormtes Schild':
                        color='orange';
                        break;
                    case 'U/P1 - ungenormte Sondertafel':
                        color='lightbrown';
                        break;
                    default:
                        color='unknown';
                        break;        
                }
                
                let id = data.key;
                if(App.ids.includes(id)){
                    id = Math.max.apply(null, App.ids)+1;
                }
                App.ids.push(id);
                
                let sign = new signs.Sign(id, name, bent, type, dirPath, changeDate, coordinats, color);
                App.signList.push(sign);
    
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
                    
            id: '',
            name: '',
            date: '',
            bent: '',
            save: '',
            type: ''
        });
                
        marker.set('id', sign.getID());
        marker.set('name', sign.getName());
        marker.set('date', sign.getDate());
        marker.set('bent', sign.isBent());
        marker.set('type', sign.getType());
        marker.set('save', sign.getPath());
                
        /*
        google.maps.event.addListener(marker, 'click', function() {
        } );
        */
                
        App.markerList.push(marker);
                
        let formatedBent = 'Nein';
                
        if (sign.isBent()) {
            formatedBent = 'Ja';
        } else {
            formatedBent = 'Nein';
        }

        //dataTable
    }

}

module.exports = signs;