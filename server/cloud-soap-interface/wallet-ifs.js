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

exports = module.exports = WalletIFS;
