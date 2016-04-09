'use strict';

var bleno = require('bleno');
var five = require('johnny-five');
var IO = require('edison-io');

var board = new five.Board({
  io: new IO()
});
var touchpad;

board.on("ready", function() {
  touchpad = new five.Touchpad({
    controller: "MPR121"
  });
});

const Descriptor = bleno.Descriptor;

class TouchesCharacteristic extends bleno.Characteristic {
  constructor() {
    super({
        uuid: '6200',
        properties: ['read', 'notify'],
        descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'Touchpad (12 bit)'
        }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ]) // maybe 12 0xC unsigned 8 bit
        })
        ]
    });
  }

  onReadRequest(offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer([touchpad.value & 0xff, touchpad.value >> 8]));
  }

  onSubscribe(maxvaluesize, updateValueCallback) {
    console.log('subscribe', maxvaluesize);
    touchpad.on('change', () => {
      console.log('touches: ' + touchpad.value);
      updateValueCallback(new Buffer([touchpad.value & 0xff, touchpad.value >> 8]))
    });   
  }

  onUnsubscribe() {
    console.log('unsubscribe');
  }
}

module.exports = TouchesCharacteristic;
