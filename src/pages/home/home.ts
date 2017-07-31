import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, CameraPosition, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { mapStyle } from './mapStyle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(public navCtrl: NavController,private _googleMaps: GoogleMaps) { }

  ngAfterViewInit(){
    this.initMap();
  }

  initMap(){
    let element = this.mapElement.nativeElement;
    let loc: LatLng = new LatLng(40.7128, -74.0059);
    let time = new Date().getHours();
    let style = [];

    //Change Style to night between 7pm to 5am
    if(this.isNight()){
        style = mapStyle
    }

    this.map = this._googleMaps.create(element,{ styles: style });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.moveCamera(loc);
      
    });
  }
  
  moveCamera(loc: LatLng){
      let options: CameraPosition = {
        target: loc,
        zoom: 15,
        tilt: 10
      }
      this.map.moveCamera(options);
  }
  isNight(){
    //Returns true if the time is between
    //7pm to 5am
    let time = new Date().getHours();
    return (time > 5 && time < 19) ? false : true;
  }

}
