/**
 * @author qianqing
 * @create by 16-1-28
 * @description
 */
var util = require('util');
var ReceiverObj = require('./Object/ReceiverObj');

var ReceiverIFS = function (app) {
  this.DS = app.datasources.ReceiverSoap;
  Object.call(this);
};
util.inherits(ReceiverIFS, Object);

ReceiverIFS.prototype.getReceiverAddress = function (uId, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = ReceiverObj.getReceiverAddressXML(uId);
  Receiver.ReceiverForGet(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForGetResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReceiverIFS.prototype.delReceiverAddress = function (uId, addressId, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = ReceiverObj.delReceiverAddressXML(uId, addressId);
  Receiver.ReceiverForDelete(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForDeleteResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReceiverIFS.prototype.setDefaultReceiverAddress = function (uId, addressId, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = ReceiverObj.setDefaultReceiverAddressXML(uId, addressId);
  Receiver.ReceiverForSetDefault(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForSetDefaultResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = ReceiverIFS;
