/**
 * @author qianqing
 * @create by 16-2-29
 * @description
 */
var loopback = require('loopback');
var IMIFS = require('../../server/cloud-soap-interface/IM-ifs');

module.exports = function (IM) {
  IM.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var ImIFS = new IMIFS(app);

    //获取未处理的好友申请
    IM.getAllFriendApply = function (userId, pageId, pageSize, cb) {
      ImIFS.getAllFriendApply(userId, pageId, pageSize, function (err, res) {
        if (err) {
          console.log('getAllFriendApply err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, data: res.Datas, msg: ''});
        }
      });
    };

    IM.remoteMethod(
      'getAllFriendApply',
      {
        description: [
          '获取未处理的好友申请(access token).返回结果-status:操作结果 0 失败 1 成功, data:申请数据, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '商品所有者编号'},
          {arg: 'pageId', type: 'number', default: 0, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', default: 10, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-friend-apply', verb: 'get'}
      }
    );
  });
};
