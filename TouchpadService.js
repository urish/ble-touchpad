'use strict'

var bleno = require('bleno');

var TouchesCharacteristic = require('./TouchesCharacteristic');

class TouchpadService extends bleno.PrimaryService {
  constructor() {
    super({
      uuid: '6100',
      characteristics: [
          new TouchesCharacteristic()
      ]
    });
  }
}

module.exports = TouchpadService;
