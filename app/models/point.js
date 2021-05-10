import Model, { attr } from '@ember-data/model';

export default class PointModel extends Model {
  @attr('string') name;
  @attr('string') longitude;
  @attr('string') latitude;
}
