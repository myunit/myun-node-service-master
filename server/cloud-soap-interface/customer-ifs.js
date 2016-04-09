/**
 * @author qianqing
 * @create by 16-1-15
 * @description 针对云端的customer对象的访问接口，支持soap协议
 */
var util = require('util');
var CustomerObj = require('./Object/CustomerObj');

var CustomerIFS = function (app) {
  this.DS = app.datasources.CustomerSoap;
  Object.call(this);
};
util.inherits(CustomerIFS, Object);

CustomerIFS.prototype.register = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.registerXML(obj);
  Customer.RegisterWithMobileForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.RegisterWithMobileForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.isRegister = function (phone, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.isRegisterXML(phone);
  Customer.IsRegItemExist(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.IsRegItemExistResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.login = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.loginXML(obj);
  Customer.LogIn(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.LogInResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.bindWeiXinAndPhone = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.bindWeiXinAndPhoneXML(obj);
  Customer.BingdingContactCellPhoneNoForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.BingdingContactCellPhoneNoForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.modifyPW = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.modifyPWXML(obj);
  Customer.ModifyPassword(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ModifyPasswordResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.forgetPW = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.forgetPWXML(obj);
  Customer.ModifyPasswordByVerCode(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ModifyPasswordByVerCodeResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getCaptcha = function (phone, interval, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.getCaptchaXML(phone, interval);
  Customer.SendSmsCaptchaForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SendSmsCaptchaForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.loginByWeiXin = function (openId, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.loginByWeiXinXML(openId);
  Customer.LoginByWeixinOpenID(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.LoginByWeixinOpenIDResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.registerByWeiXin = function (openId, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.registerByWeiXinXML(openId);
  Customer.RegisterByWechatForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.RegisterByWechatForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.AddIdentityAudit = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.addIdentityAuditXML(obj);
  Customer.AddCustomerIdentityAuditForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.AddCustomerIdentityAuditForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.ModifyIdentityAudit = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.modifyIdentityAuditXML(obj);
  Customer.AddCustomerIdentityAuditForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.AddCustomerIdentityAuditForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getIdentityAudit = function (uId, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.getIdentityAuditXML(uId);
  Customer.GetCustomerIdentityAudit(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCustomerIdentityAuditResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.setCurrentAddress = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.setCurrentAddressXML(obj);
  Customer.SaveUserCurrentAddrForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SaveUserCurrentAddrForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.loginByWeiXinUnionId = function (unionId, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.loginByWeiXinUnionIdXML(unionId);
  Customer.LoginByWeixinUnionID(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.LoginByWeixinUnionIDResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

CustomerIFS.prototype.saveNickAndFace = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.saveNickAndFaceXML(obj);
  Customer.SaveUserFace(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SaveUserFaceResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = CustomerIFS;
