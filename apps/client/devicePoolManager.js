var zmq = require('zeromq')

const MOVEMENT_TYPES = require('./movementType')
const CarDevice = require('./CarDevice')

const movementTypeToggleMap = new Map([
  [MOVEMENT_TYPES.parking, MOVEMENT_TYPES.moving],
  [MOVEMENT_TYPES.moving, MOVEMENT_TYPES.parking],
])

const requestMakerFabric = (guid = 'unknown') => {
  const producer = zmq.socket('push')

  producer.bindSync(process.env.OMQ_ADDRESS)
  console.log(`Producer ${guid} bound to ` + process.env.OMQ_ADDRESS)

  return producer
}

const carDeviceFabric = (guid) => {
  const movementType =
    (Math.random() * 100) % 2 === 0
      ? MOVEMENT_TYPES.moving
      : MOVEMENT_TYPES.parking

  return new CarDevice({
    guid,
    lat: Math.random() * 100,
    long: Math.random() * 100,
    movementType,
    requestMakerFabric,
  })
}

const updateDevicesMovementType = (devices) => {
  devices.forEach((device) => {
    const shouldToggleType = Math.random() <= 0.4

    if (shouldToggleType) {
      device.movementType = movementTypeToggleMap.get(device.movementType)
      console.log(
        `Device ${device._guid} has new movement type: ${device.movementType.name}`,
      )
    }
  })
}

const run = () => {
  // TODO: Inject guids here
  const devices = ['1a2b3c'].map(carDeviceFabric)
  const intervalMs =
    parseFloat(process.env.UPDATE_MOVEMENT_TYPE_INTERVAL_IN_MINS) * 60 * 1000

  setInterval(() => updateDevicesMovementType(devices), intervalMs)
}

module.exports = {
  run,
}
