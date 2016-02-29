/**
 * @author qianqing
 * @create by 16-2-29
 * @description
 */
var util = require('util');
var IMObj = require('./Object/IMObj');

var IMIFS = function (app) {
  this.DS = app.datasources.IMSoap;
  Object.call(this);
};
util.inherits(IMIFS, Object);

IMIFS.prototype.getAllFriendApply = function (userId, pageId, pageSize, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.getAllFriendApplylXML(userId, pageId, pageSize);
  IM.GetAllCustomerFriendApply(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllCustomerFriendApplyResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = IMIFS;
