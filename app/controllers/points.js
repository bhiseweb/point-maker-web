import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PointsController extends Controller {
  @service store;
  @tracked allPoints = this.model;
  @tracked map;
  @tracked canvas;
  @tracked hoverdPoint;
  @tracked markers = {
    type: 'FeatureCollection',
    features: []
  }
  @tracked searchText;
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
  onMove(e) {
    var coords = e.lngLat;
    // Set a UI indicator for dragging.
    this.canvas.style.cursor = 'grabbing';
    const newPoints = this.markers.features;
    newPoints[this.hoverdPoint].geometry.coordinates = [coords.lng, coords.lat];
    this.markers = {
      type: 'FeatureCollection',
      features: newPoints,
    }
  }

  @action
  async onUp(e) {
    const dragedPoint = this.markers.features[this.hoverdPoint];
    this.canvas.style.cursor = '';
    this.map.setPaintProperty('point', 'circle-color', 'red');
    // Unbind mouse/touch events
    this.map.off('mousemove', this.onMove);
    this.map.off('touchmove', this.onMove);
    let point = await this.store.findRecord('point', dragedPoint.pointId);
    point.longitude = dragedPoint.geometry.coordinates[0];
    point.latitude =  dragedPoint.geometry.coordinates[1];
    await point.save();
  }
  
  @action
  async loadMarkers(map) {
    this.map = map;
    this.canvas = map.getCanvasContainer();
    let features = [];
    await this.allPoints.map((point, idx) => {  
      features.pushObject({
        type: 'Feature',
        id: idx,
        pointId: point.id,
        geometry: { type: 'Point', coordinates: [ point.longitude, point.latitude ] },
        properties: { name: point.name }
      });
    });
    this.markers = {
      type: 'FeatureCollection',
      features,
    }
    // draggable marker
    this.map.on('mouseenter', 'point', (e) => {
      this.hoverdPoint = e.features[0].id
      this.map.setPaintProperty('point', 'circle-color', '#e45f5f');
      this.canvas.style.cursor = 'move';
    });
    this.map.on('mouseleave', 'point', () => {
      this.map.setPaintProperty('point', 'circle-color', 'red');
      this.canvas.style.cursor = '';
    });
         
    this.map.on('mousedown', 'point', (e) => {
      e.preventDefault(); // Prevent the default map drag behavior.
      this.canvas.style.cursor = 'grab';
      this.map.on('mousemove', this.onMove);
      this.map.once('mouseup', this.onUp);
    });

    this.map.on('touchstart', 'point', (e) => {
    if (e.points.length !== 1) return;
      e.preventDefault(); // Prevent the default map drag behavior.
      map.on('touchmove', this.onMove);
      map.once('touchend', this.onUp);
    });
  }

  @action
  async updateMarkers() {
    let features = [];
    await this.allPoints.map((point, idx) => {  
      features.pushObject({
        type: 'Feature',
        id: idx,
        pointId: point.id,
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
  @action
  async searchPoint(event) {
    this.searchText = event.target.value
    this.allPoints = await this.store.query('point', { name: this.searchText });
    this.updateMarkers();
  }
}
