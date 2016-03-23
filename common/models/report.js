/**
 * @author qianqing
 * @create by 16-3-23
 * @description
 */
var loopback = require('loopback');
var async = require('async');
var ReportIFS = require('../../server/cloud-soap-interface/report-ifs');
var utils = require('../../server/util/utils');

module.exports = function (Report) {
  Report.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var reportIFS = new ReportIFS(app);

    //查询同城排名
    Report.querySameCityRank = function (data, cb) {
      reportIFS.querySameCityRank(data, function (err, res) {
        if (err) {
          console.log('querySameCityRank err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, myRank: res.MyData, rankList: res.Datas, msg: ''});
        }
      });
    };

    Report.remoteMethod(
      'querySameCityRank',
      {
        description: [
          '查询同城排名(access token).返回结果-status:操作结果 0 失败 1 成功, myRank:我的排名, rankList:排名列表, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '查询同城排名(JSON string) {"userId":int, "name":"string","contactAddress":"string", "pcdCode":"string", "pageId":int, "pageSize":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/query-city-rank', verb: 'post'}
      }
    );

    //查询好友排名
    Report.queryMyFriendsRank = function (data, cb) {
      reportIFS.queryMyFriendsRank(data, function (err, res) {
        if (err) {
          console.log('queryMyFriendsRank err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, myRank: res.MyData, rankList: res.Datas, msg: ''});
        }
      });
    };

    Report.remoteMethod(
      'queryMyFriendsRank',
      {
        description: [
          '查询好友排名(access token).返回结果-status:操作结果 0 失败 1 成功, myRank:我的排名, rankList:排名列表, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '查询好友排名(JSON string) {"userId":int, "name":"string","contactAddress":"string", "pcdCode":"string", "pageId":int, "pageSize":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/query-friends-rank', verb: 'post'}
      }
    );

  });
};
