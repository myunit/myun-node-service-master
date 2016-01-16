/**
 * @author qianqing
 * @create by 16-1-15
 * @description 针对云端的customer对象的访问接口，支持soap协议
 */
var util = require('util');
var async = require('async');
var CustomerObj = require('./Object/CustomerObj');
var fs = require('fs');

var CustomerIFS = function (app) {
  this.DS = app.datasources.CustomerSoap;
  Object.call(this);
};
util.inherits(CustomerIFS, Object);

CustomerIFS.prototype.register = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.registerXML(obj);
  Customer.Register(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.login = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.loginXML(obj);
  Customer.Login(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.modifyPW = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.modifyPWXML(obj);
  Customer.ModifyPassword(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.getReceiveAddresses = function (customerNo, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.getAllReceiveAddressesXML(customerNo);
  Customer.GetAllReceiveAddresses(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.getDefaultReceiveAddress = function (customerNo, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.getDefaultReceiveAddressXML(customerNo);
  Customer.GetDefaultReceiveAddresses(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.addReceiveAddress = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.addReceiveAddressXML(obj);
  Customer.AddNewReceiveAddress(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.modifyReceiveAddress = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.modifyReceiveAddressXML(obj);
  Customer.ModifyReceiveAddress(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.removeReceiveAddress = function (sysNo, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.removeReceiveAddressXML(sysNo);
  Customer.RemoveReceiveAddress(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.setDefaultReceiveAddress = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.setDefaultReceiveAddressXML(obj);
  Customer.SetDefaultReceiveAddresses(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.getCaptcha = function (phone, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.getCaptchaXML(phone);
  Customer.GetCaptcha(xml, function (err, response) {
    callback(err, response);
  });
};



exports = module.exports = CustomerIFS;
