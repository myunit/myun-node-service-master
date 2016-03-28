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

IMIFS.prototype.getAllFriendApply = function (userId, state, pageId, pageSize, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.getAllFriendApplyXML(userId, state, pageId, pageSize);
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

IMIFS.prototype.getRecommendFriends = function (userId, contactAddress, pcdDes, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.getRecommendFriendsXML(userId, contactAddress, pcdDes);
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

IMIFS.prototype.rejectFriendApply = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.rejectFriendApplyXML(obj);
  IM.RejectCustomerFriendApply(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.RejectCustomerFriendApplyResult));
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

IMIFS.prototype.getFriendInfo = function (userId, friendId, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.getFriendInfoXML(userId, friendId);
  IM.GetCustomerFriendInfo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCustomerFriendInfoResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.deleteFriend = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.deleteFriendXML(obj);
  IM.DeleteCustomerFriend(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.DeleteCustomerFriendResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.setFriendNickName = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.setFriendNickNameXML(obj);
  IM.SetCustomerFriendNickName(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SetCustomerFriendNickNameResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

IMIFS.prototype.getCustomerIM = function (obj, callback) {
  var IM = this.DS.models.IM;
  var xml = IMObj.getCustomerIMXML(obj);
  IM.GetCustomerIMBySysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCustomerIMBySysNoResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = IMIFS;
