/**
 * @author qianqing
 * @create by 16-1-26
 * @description
 */
var xml = require('xml');

exports.getAllProductXML = function (obj) {
  var xmlObj = [{
    GetAllGetProductForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(obj)
      }
    ]
  }];

  return xml(xmlObj, true);
};
