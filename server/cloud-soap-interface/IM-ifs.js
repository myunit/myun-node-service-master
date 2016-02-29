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
  var xml = IMObj.getAllFriendApplyXML(userId, pageId, pageSize);
  IM.GetAllCustomerFriendApply(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllCustomerFriendApplyResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.getAllFriends = function (userId, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.getAllFriendsXML(userId);
  IM.GetAllCustomerFriends(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllCustomerFriendsResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.getRecommendFriends = function (userId, contactAddress, pcdCode, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.getRecommendFriendsXML(userId, contactAddress, pcdCode);
  IM.GetCustomerByLuck(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCustomerByLuckResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.searchUserByKey = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.searchUserByKeyXML(obj);
  IM.SearchCustomerByKey(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SearchCustomerByKeyResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.acceptFriendApply = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.acceptFriendApplyXML(obj);
  IM.AcceptCustomerFriendApply(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.AcceptCustomerFriendApplyResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.addFriendApply = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.addFriendApplyXML(obj);
  IM.AddCustomerFriendApply(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.AddCustomerFriendApplyResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.checkIsFriend = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.checkIsFriendXML(obj);
  IM.CheckIsFriends(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CheckIsFriendsResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = IMIFS;
