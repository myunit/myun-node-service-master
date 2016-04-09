/**
 * @author qianqing
 * @create by 16-1-15
 * @description
 */
var utils = require('../../util/utils');
var xml = require('xml');

exports.registerXML = function (obj) {
  var xmlObj = [{
    RegisterWithMobileForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        mobile: obj.phone
      },
      {
        password: obj.password
      },
      {
        code: obj.code
      },
      {
        fromstr: obj.from
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.isRegisterXML = function (phone) {
  var xmlObj = [{
    IsRegItemExist: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        cellPhoneNo: phone
      }
    ]
  }];

  return xml(xmlObj, true);
};


exports.loginXML = function (obj) {

  var xmlObj = [{
    LogIn: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        cellPhoneNo: obj.phone
      },
      {
        password: obj.password
      },
      {
        curinfo: obj.password
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.bindWeiXinAndPhoneXML = function (obj) {

  var xmlObj = [{
    BingdingContactCellPhoneNoForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customer: obj.userId
      },
      {
        mobile: obj.phone
      },
      {
        code: obj.code
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.modifyPWXML = function (obj) {

  var xmlObj = [{
    ModifyPassword: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        pwd: obj.newPassword
      }

    ]
  }];

  return xml(xmlObj, true);
};

exports.forgetPWXML = function (obj) {

  var xmlObj = [{
    ModifyPasswordByVerCode: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        mobile: obj.phone
      },
      {
        newPassword: obj.newPassword
      },
      {
        verCode: obj.code
      }

    ]
  }];

  return xml(xmlObj, true);
};

exports.getAllReceiveAddressesXML = function (customerNo) {

  var xmlObj = [{
    GetAllReceiveAddresses: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: customerNo
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getDefaultReceiveAddressXML = function (customerNo) {

  var xmlObj = [{
    GetDefaultReceiveAddresses: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: customerNo
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.addReceiveAddressXML = function (obj) {
  obj.isDefault = obj.IsDefault || false;
  obj.sysNo = obj.sysNo || 0;
  obj.PCD = obj.provinceId + '-' + obj.cityId + '-' + obj.regionId;
  obj.PCDDes = obj.provinceStr + '-' + obj.cityStr + '-' + obj.regionStr;

  var xmlObj = [{
    AddNewReceiveAddress: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        data: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.BPC.Contract.CustomerMgmt.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          }, {
            'd4p1:Address': obj.address
          }, {
            'd4p1:CustomerNo': obj.customerNo
          }, {
            'd4p1:IsDefault': obj.isDefault
          }, {
            'd4p1:PCDCode': obj.PCD
          }, {
            'd4p1:PCDDescription': obj.PCDDes
          }, {
            'd4p1:ReceiverCellPhone': obj.phone
          }, {
            'd4p1:ReceiverName': obj.name
          }, {
            'd4p1:SysNo': obj.sysNo
          }
        ]
      },
      {
        customerSysNo: obj.customerNo
      }
    ]
  }];

  return xml(xmlObj, true);
};


exports.modifyReceiveAddressXML = function (obj) {
  obj.isDefault = obj.IsDefault || false;
  obj.PCD = obj.provinceId + '-' + obj.cityId + '-' + obj.regionId;
  obj.PCDDes = obj.provinceStr + '-' + obj.cityStr + '-' + obj.regionStr;

  var xmlObj = [{
    ModifyReceiveAddress: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        data: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.BPC.Contract.CustomerMgmt.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          }, {
            'd4p1:Address': obj.address
          }, {
            'd4p1:CustomerNo': obj.customerNo
          }, {
            'd4p1:IsDefault': obj.isDefault
          }, {
            'd4p1:PCDCode': obj.PCD
          }, {
            'd4p1:PCDDescription': obj.PCDDes
          }, {
            'd4p1:ReceiverCellPhone': obj.phone
          }, {
            'd4p1:ReceiverName': obj.name
          }, {
            'd4p1:SysNo': obj.sysNo
          }
        ]
      },
      {
        receiveAddressSysNo: obj.sysNo
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.removeReceiveAddressXML = function (sysNo) {

  var xmlObj = [{
    RemoveReceiveAddress: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        receiveAddressSysNo: sysNo
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setDefaultReceiveAddressXML = function (obj) {

  var xmlObj = [{
    SetDefaultReceiveAddresses: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        receiveAddressSysNo: obj.sysNo
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getCaptchaXML = function (phone, interval) {
  var captchaObj = {
    Interval: interval || 900,
    Password: '123',
    PszMobis: phone,
    PszMsg: '尊敬的用户，您申请的实名认证审核验证码是：{0},。验证码很重要，如非本人操作，请联系客服。【乡货圈】',
    SMSType: 4,
    UserId: '496',
    iMobiCount: 1
  };

  var xmlObj = [{
    SendSmsCaptchaForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(captchaObj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.loginByWeiXinXML = function (openId) {

  var xmlObj = [{
    LoginByWeixinOpenID: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        openid: openId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.registerByWeiXinXML = function (obj) {
  var register = {};
  register.CellPhoneNo = obj.phone;
  register.CustomerLevel = 1;
  register.CustomerSource = 2;
  register.HeadPicture = obj.picture;
  register.LoginPassword = '123456';
  register.Name = obj.name;
  register.WeixinOpenID = obj.openId;
  register.WeixinNo = obj.name;
  register.WeixinUniqueID = obj.unionId;


  var xmlObj = [{
    RegisterByWechatForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(register)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.addIdentityAuditXML = function (obj) {
  var audit = {};
  audit.Body = {};
  audit.Body.Code = obj.captcha;
  audit.Body.CustomerID = obj.cardId;
  audit.Body.CustomerNo = obj.userId;
  audit.Body.CustomerRealName = obj.realName;
  audit.Body.IdentityImgs = obj.identityImgs;
  audit.Body.IsFullModify = true;
  audit.Body.MobileNo = obj.phone;
  audit.UserId = obj.userId;
  audit.UserName = obj.name;

  var xmlObj = [{
    AddCustomerIdentityAuditForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(audit)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.modifyIdentityAuditXML = function (obj) {
  var audit = {};
  audit.Body = {};
  audit.Body.Code = obj.captcha || '';
  audit.Body.CustomerID = obj.cardId;
  audit.Body.CustomerNo = obj.userId;
  audit.Body.CustomerRealName = obj.realName;
  audit.Body.IdentityImgs = obj.identityImgs;
  audit.Body.IsFullModify = obj.captcha ? true : false;
  audit.Body.MobileNo = obj.phone;
  audit.Body.SysNo = obj.auditNo;
  audit.UserId = obj.userId;
  audit.UserName = obj.name;

  var xmlObj = [{
    AddCustomerIdentityAuditForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(audit)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getIdentityAuditXML = function (uId) {
  var xmlObj = [{
    GetCustomerIdentityAudit: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: uId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setCurrentAddressXML = function (obj) {
  var address = {};
  address.ContactAddress = obj.domicile || '';
  address.PCDDescription = obj.home || '';
  address.PCDCode = obj.homeCode || '';
  address.CustomerNo = obj.userId;
  address.WeixinOpenID = obj.openId;

  var xmlObj = [{
    SaveUserCurrentAddrForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(address)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.loginByWeiXinUnionIdXML = function (unionId) {

  var xmlObj = [{
    LoginByWeixinUnionID: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        wixinUnionID: unionId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.saveNickAndFaceXML = function (obj) {
  var xmlObj = [{
    SaveUserFace: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerId: obj.userId
      },
      {
        nickname: obj.nick
      },
      {
        faceUrl: obj.face
      }
    ]
  }];

  return xml(xmlObj, true);
};
