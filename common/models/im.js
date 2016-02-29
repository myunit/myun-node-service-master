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
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'pageId', type: 'number', default: 0, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', default: 10, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-friend-apply', verb: 'get'}
      }
    );

    //获取所有好友
    IM.getAllFriends = function (userId, cb) {
      ImIFS.getAllFriends(userId, function (err, res) {
        if (err) {
          console.log('getAllFriends err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Datas, msg: ''});
        }
      });
    };

    IM.remoteMethod(
      'getAllFriends',
      {
        description: [
          '获取所有好友(access token).返回结果-status:操作结果 0 失败 1 成功, data:好友数据, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-friends', verb: 'get'}
      }
    );

    //获取随机推荐的10个同城同乡好友
    IM.getRecommendFriends = function (userId, contactAddress, pcdCode, cb) {
      ImIFS.getRecommendFriends(userId, contactAddress, pcdCode, function (err, res) {
        if (err) {
          console.log('getRecommendFriends err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Datas, msg: ''});
        }
      });
    };

    IM.remoteMethod(
      'getRecommendFriends',
      {
        description: [
          '获取随机推荐的10个同城同乡好友(access token).返回结果-status:操作结果 0 失败 1 成功, data:好友数据, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'contactAddress', type: 'string', required: true, http: {source: 'query'}, description: '所在地(同城)'},
          {arg: 'pcdCode', type: 'string', required: true, http: {source: 'query'}, description: '家乡(同乡)'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-recommend-friends', verb: 'get'}
      }
    );

    //根据关键字搜索用户
    IM.searchUserByKey = function (data, cb) {
      ImIFS.searchUserByKey(data, function (err, res) {
        if (err) {
          console.log('searchUserByKey err: ' + err);
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
      'searchUserByKey',
      {
        description: [
          '根据关键字搜索用户.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '搜索信息(JSON string) {"userId":int, "pageId":int, "pageSize":int, "key":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/search-user-by-key', verb: 'post'}
      }
    );

    //同意好友添加申请
    IM.AcceptFriendApply = function (data, cb) {
      ImIFS.AcceptFriendApply(data, function (err, res) {
        if (err) {
          console.log('AcceptFriendApply err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    IM.remoteMethod(
      'AcceptFriendApply',
      {
        description: [
          '同意好友添加申请.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '搜索信息(JSON string) {"userId":int, "userName":"string", "applyId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/accept-friend-apply', verb: 'post'}
      }
    );
  });
};
