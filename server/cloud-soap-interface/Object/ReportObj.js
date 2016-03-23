/**
 * @author qianqing
 * @create by 16-3-23
 * @description
 */
var utils = require('../../util/utils');
var xml = require('xml');

exports.querySameCityRankXML = function (obj) {
  var query = {};
  query.Body = {};
  query.Body.ContractAddr = obj.contactAddress;
  query.Body.CustomerNo = obj.userId;
  query.Body.PCDCode = obj.pcdCode;
  query.PageIndex = obj.pageId;
  query.PageSize = obj.pageSize;
  query.UserId = obj.userId;
  query.UserName = obj.name;

  var xmlObj = [{
    QuerySameCityRankForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(query)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.queryMyFriendsRankXML = function (obj) {
  var query = {};
  query.Body = {};
  query.Body.ContractAddr = obj.contactAddress;
  query.Body.CustomerNo = obj.userId;
  query.Body.PCDCode = obj.pcdCode;
  query.PageIndex = obj.pageId;
  query.PageSize = obj.pageSize;
  query.UserId = obj.userId;
  query.UserName = obj.name;

  var xmlObj = [{
    QueryMyFriendsRankForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(query)
      }
    ]
  }];

  return xml(xmlObj, true);
};
