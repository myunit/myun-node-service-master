/**
 * @author qianqing
 * @create by 16-1-30
 * @description
 */
var util = require('util');
var WalletObj = require('./Object/WalletObj');

var WalletIFS = function (app) {
  this.DS = app.datasources.WalletSoap;
  Object.call(this);
};
util.inherits(WalletIFS, Object);

WalletIFS.prototype.addWithdrawsCash = function (obj, callback) {
  var Wallet = this.DS.models.Wallet;
  var xml = WalletObj.addWithdrawsCashXML(obj);
  Wallet.AddWalletPaymentBillForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.AddWalletPaymentBillForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

WalletIFS.prototype.getCapitalAccountInfo = function (userId, callback) {
  var Wallet = this.DS.models.Wallet;
  var xml = WalletObj.getCapitalAccountInfoXML(userId);
  Wallet.GetMoneyByCustomerNoForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetMoneyByCustomerNoForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

WalletIFS.prototype.getCapitalFlowRecord = function (obj, callback) {
  var Wallet = this.DS.models.Wallet;
  var xml = WalletObj.getCapitalFlowRecordXML(obj);
  Wallet.GetAllMoneyDetailByCustomerNoQueryForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllMoneyDetailByCustomerNoQueryForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = WalletIFS;
