import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PointsController extends Controller {
  @service store;

  @tracked markers = {
    type: 'FeatureCollection',
    features: []
  }

  @tracked open = false;
  @tracked pointData = {id: null, name: '', longitude: '', latitude: ''};
  @tracked model;
  @tracked coordinates;

  @action
     mapClicked({ target: map, point, lngLat }) {
      this.open = true;
      this.coordinates = {lng: lngLat.lng, lat: lngLat.lat};
      this.pointData = {...this.pointData.name, longitude: lngLat.lng, latitude: lngLat.lat};
    }

  @action
  closePopup() {
    this.open = false;
  }

  @action
  async updateMarkers() {
    let features = [];
    await this.model.map(point => {  
      features.pushObject({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [ point.longitude, point.latitude ] },
        properties: { name: point.name }
      });
    });
    this.markers = {
      type: 'FeatureCollection',
      features,
    }
  }

  @action
    async savePoint (event) {
      event.preventDefault();
      try {
        let point = await this.store.createRecord('point', this.pointData);
        await point.save();
        this.updateMarkers();
        this.open = false;
      } catch(error) {
        console.log(error)
      }
    }

  @action
    editPoint (point) {
      this.open = true
      const { id, name, longitude, latitude } = point;
      this.coordinates = { lng: longitude, lat: latitude };
      this.pointData = { id, name, longitude, latitude };
    }

  @action
    async updatePoint () {
      event.preventDefault();
      try {
        let point = await this.store.findRecord('point', this.pointData.id);
        point.name = this.pointData.name;
        await point.save();
        this.updateMarkers();
        this.open = false;
      } catch (error) {
        console.log(error);
      }
    }

  @action
    async deletePoint (id) {
      event.preventDefault();
      try {
        let point = await this.store.findRecord('point', id, { reload: true });
        await point.destroyRecord();
        this.updateMarkers();
      } catch(error) {
        console.log(error);
      }

    }

}
