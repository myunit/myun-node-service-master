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

exports.getPCDListXML = function (type, id) {
  if (type === 1) {
    type = 'city';
  } else if (type === 2) {
    type = 'district';
  } else {
    type = '';
  }

  var xmlObj = [{
    QueryPCDList: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        type: type
      },
      {
        id: id
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.addOrModifyReceiverAddressXML = function (obj) {
  var address = {};
  address.sysNo = obj.addressId || 0;
  address.address = obj.address;
  address.receiverName = obj.name;
  address.receiverMobile = '';
  address.receiverPhone = obj.phone;
  address.isDefault = obj.isDefault;
  address.uId = obj.userId;
  address.provinceId = obj.provinceId;
  address.cityId = obj.cityId;
  address.districtId = obj.districtId;
  address.province = obj.province;
  address.city = obj.city;
  address.district = obj.district;
  var xmlObj = [{
    ReceiverForInsertAndModify: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: JSON.stringify(address)
      }
    ]
  }];

  return xml(xmlObj, true);
};
