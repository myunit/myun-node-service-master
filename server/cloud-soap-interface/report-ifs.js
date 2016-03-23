/**
 * @author qianqing
 * @create by 16-3-23
 * @description
 */
var util = require('util');
var ReportObj = require('./Object/ReportObj');

var ReportIFS = function (app) {
  this.DS = app.datasources.ReportSoap;
  Object.call(this);
};
util.inherits(ReportIFS, Object);

ReportIFS.prototype.querySameCityRank = function (obj, callback) {
  var Report = this.DS.models.Report;
  var xml = ReportObj.querySameCityRankXML(obj);
  Report.QuerySameCityRankForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.QuerySameCityRankForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReportIFS.prototype.queryMyFriendsRank = function (obj, callback) {
  var Report = this.DS.models.Report;
  var xml = ReportObj.queryMyFriendsRankXML(obj);
  Report.QueryMyFriendsRankForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.QueryMyFriendsRankForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = ReportIFS;
