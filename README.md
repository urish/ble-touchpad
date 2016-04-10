# ble-touchpad
MPR121 based BLE touchpad

Runs on [Intel Edison](http://www.intel.com/content/www/us/en/do-it-yourself/edison.html). Uses [Johnny Five](http://johnny-five.io/) for communicating with the MPR121 Capacitive Touch Sensor and [Bleno](https://github.com/sandeepmistry/bleno) for the BLE communication.

You can easily switch to run on the [Raspberry PI](https://www.raspberrypi.org/) by installing the `raspi-io` module and using it in [`TouchesCharacteristic.js`](https://github.com/urish/ble-touchpad/blob/master/TouchesCharacteristic.js).
