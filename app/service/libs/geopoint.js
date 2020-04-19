
export default class GeoPoint {
  lat = null;
  lng = null;

  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  toJSON = () => {
    return {
      lat: this.lat,
      lng: this.lng
    }
  }
}