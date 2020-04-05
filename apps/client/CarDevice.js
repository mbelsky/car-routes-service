const MOVEMENT_TYPES = require('./movementType')

class CarDevice {
  constructor({ guid, movementType, lat, long, requestMakerFabric }) {
    this._guid = guid
    this._lat = lat
    this._long = long
    this._movementType = movementType

    this._requestMaker = requestMakerFabric(this._guid)

    this._loopSendData()
  }

  get latitude() {
    if (MOVEMENT_TYPES.parking === this._movementType) {
      return this._lat
    }

    this._lat = this._lat + (Math.random() - 1)
    return this._lat
  }

  get longitude() {
    if (MOVEMENT_TYPES.parking === this._movementType) {
      return this._long
    }

    this._long = this._long + (Math.random() - 1)
    return this._long
  }

  get movementType() {
    return this._movementType
  }

  set movementType(movementType) {
    this._movementType = movementType

    if ('undefined' !== typeof this._loopSendDataTimeoutId) {
      clearTimeout(this._loopSendDataTimeoutId)

      this._loopSendDataTimeoutId = undefined
    }

    setTimeout(() => this._loopSendData(), 0)
  }

  get speed() {
    if (MOVEMENT_TYPES.parking === this._movementType) {
      return 0
    }

    return Math.max(1, Math.random() * 100)
  }

  _loopSendData() {
    this._sendData()

    this._loopSendDataTimeoutId = setTimeout(
      () => this._loopSendData(),
      this._movementType.requestInterval,
    )
  }

  _sendData() {
    const data = {
      DeviceId: this._guid,
      Latitude: this.latitude,
      Longitude: this.longitude,
      Speed: this.speed,
      Timestamp: Date.now(),
    }

    this._requestMaker.send(JSON.stringify(data))
  }
}

module.exports = CarDevice
