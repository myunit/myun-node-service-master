/**
 * @author qianqing
 * @create by 16-1-30
 * @description
 */
var xml = require('xml');

exports.addWithdrawsCashXML = function (obj) {
  var cash = {};
  cash.Body = {};
  cash.UserId = obj.userId;
  cash.UserName = obj.userName;
  cash.Body.Account = obj.account;
  cash.Body.AccountCompanyName = obj.company;
  cash.Body.AccountUserName = obj.accountName;
  cash.Body.Amount = obj.amount;
  cash.Body.CellPhoneNo = obj.phone;
  cash.Body.MercurySysNo = obj.userId;
  cash.Body.PayType = 2;
  cash.Body.SettlementMethod = obj.type;
  var xmlObj = [{
    AddWalletPaymentBillForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(cash)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getCapitalAccountInfoXML = function (userId) {
  var obj = {};
  obj.CustomerNo = userId;
  var xmlObj = [{
    GetMoneyByCustomerNoForApp: [
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

exports.getCapitalFlowRecordXML = function (obj) {
  var xmlObj = [{
    GetAllMoneyDetailByCustomerNoQueryForApp: [
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

exports.getWithdrawsCashRecordXML = function (obj) {
  var xmlObj = [{
    GetAllMercuryBillPaymentForApp: [
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
