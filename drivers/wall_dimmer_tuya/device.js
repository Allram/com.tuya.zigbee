'use strict';

const Homey = require('homey');
const { TuyaSpecificClusterDevice } = require('zigbee-clusters');

class wall_dimmer_tuya extends TuyaSpecificClusterDevice {

  async onNodeInit({ zclNode }) {
    await super.onNodeInit({ zclNode });

    this.printNode();

    this.registerCapabilityListener('onoff', async value => {
      this.log('onoff: ', value);
      await this.writeBool(1, value);
    });

    this.registerCapabilityListener('dim', async value => {
        this.log("brightness: ", value * 1000);
        await this.writeData32(2, value * 1000);
    });
  }

  onDeleted() {
    this.log('Wall Dimmer removed');
  }

}

module.exports = wall_dimmer_tuya;
