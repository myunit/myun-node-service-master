/**
 * @author qianqing
 * @create by 16-1-28
 * @description
 */
var xml = require('xml');

exports.getReceiverAddressXML = function (userId) {
  var xmlObj = [{
    ReceiverForGet: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: userId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.delReceiverAddressXML = function (userId, addressId) {
  var xmlObj = [{
    ReceiverForDelete: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: userId
      },
      {
        rId: addressId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setDefaultReceiverAddressXML = function (userId, addressId) {
  var xmlObj = [{
    ReceiverForSetDefault: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: userId
      },
      {
        rId: addressId
      }
    ]
  }];

  return xml(xmlObj, true);
};
