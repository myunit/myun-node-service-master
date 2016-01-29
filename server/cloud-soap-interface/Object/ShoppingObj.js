/**
 * @author qianqing
 * @create by 16-1-29
 * @description
 */
var xml = require('xml');

exports.addToCartXML = function (obj) {
  var xmlObj = [{
    CartForAddForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        datas: JSON.stringify(obj.product)
      }
    ]
  }];

  return xml(xmlObj, true);
};
