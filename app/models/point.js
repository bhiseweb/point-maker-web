import Model from '@ember-data/model';
import attr from 'ember-data/attr';
export default class PointModel extends Model {
  @attr('string') name;
  @attr('string') longitude;
  @attr('string') latitude;
}
