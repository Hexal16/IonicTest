import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps) {
    }

    ngAfterViewInit() {
        this.loadMap();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
    }

    loadMap() {
        let element: HTMLElement = document.getElementById('map');
        let map: GoogleMap = this.googleMaps.create(element);

        map.one(GoogleMapsEvent.MAP_READY).then(
            () => {
                console.log('Map is ready!');
                // Now you can add elements to the map like the marker
            }
        );

        let position: CameraPosition = {
            target: {
                lat: 43.0741904,
                lng: -89.3809802
            },
            zoom: 18,
            tilt: 30
        };

        // move the map's camera to position
        map.moveCamera(position);

    }

}
