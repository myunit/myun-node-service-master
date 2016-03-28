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
    IM.getAllFriendApply = function (userId, state, pageId, pageSize, cb) {
      ImIFS.getAllFriendApply(userId, state, pageId, pageSize, function (err, res) {
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
          {arg: 'state', type: 'number', default: -1, http: {source: 'query'}, description: '申请状态(-1 所有 0 等待验证 10 同意申请 11 拒绝申请)'},
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
    IM.getRecommendFriends = function (userId, contactAddress, pcdDes, cb) {
      ImIFS.getRecommendFriends(userId, contactAddress, pcdDes, function (err, res) {
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
          {arg: 'pcdDes', type: 'string', required: true, http: {source: 'query'}, description: '家乡(同乡)'}
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
    IM.acceptFriendApply = function (data, cb) {
      ImIFS.acceptFriendApply(data, function (err, res) {
        if (err) {
          console.log('acceptFriendApply err: ' + err);
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
      'acceptFriendApply',
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

    //拒绝好友添加申请
    IM.rejectFriendApply = function (data, cb) {
      ImIFS.rejectFriendApply(data, function (err, res) {
        if (err) {
          console.log('rejectFriendApply err: ' + err);
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
      'rejectFriendApply',
      {
        description: [
          '拒绝好友添加申请.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
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
        http: {path: '/reject-friend-apply', verb: 'post'}
      }
    );

    //添加好友申请
    IM.addFriendApply = function (data, cb) {
      ImIFS.addFriendApply(data, function (err, res) {
        if (err) {
          console.log('addFriendApply err: ' + err);
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
      'addFriendApply',
      {
        description: [
          '添加好友申请.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '申请信息(JSON string) {"userId":int, "userName":"string", "friendId":int, "remark":"string"}',
              'friendId:要加为好友的用户的id, remark:申请消息'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-friend-apply', verb: 'post'}
      }
    );

    //检查好友关系
    IM.checkIsFriend = function (data, cb) {
      ImIFS.checkIsFriend(data, function (err, res) {
        if (err) {
          console.log('checkIsFriend err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, isFriend: res.Body, msg: ''});
        }
      });
    };

    IM.remoteMethod(
      'checkIsFriend',
      {
        description: [
          '检查好友关系.返回结果-status:操作结果 0 失败 1 成功, isFriend 是否好友, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '搜索信息(JSON string) {"userId":int, "friendId":int}',
              'friendId:好友的用户的id'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/check-is-friend', verb: 'post'}
      }
    );

    //获取好友信息
    IM.getFriendInfo = function (userId, friendId, cb) {
      ImIFS.getFriendInfo(userId, friendId, function (err, res) {
        if (err) {
          console.log('getFriendInfo err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Body, msg: ''});
        }
      });
    };

    IM.remoteMethod(
      'getFriendInfo',
      {
        description: [
          '获取好友信息(access token).返回结果-status:操作结果 0 失败 1 成功, data:好友数据, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'friendId', type: 'number', required: true, http: {source: 'query'}, description: '好友用户编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-friend-info', verb: 'get'}
      }
    );

    //删除好友关系
    IM.deleteFriend = function (data, cb) {
      ImIFS.deleteFriend(data, function (err, res) {
        if (err) {
          console.log('deleteFriend err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '删除成功'});
        }
      });
    };

    IM.remoteMethod(
      'deleteFriend',
      {
        description: [
          '删除好友关系.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '搜索信息(JSON string) {"userId":int, "userName":"string", "friendId":int}',
              'friendId:好友的用户的id'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/delete-friend', verb: 'post'}
      }
    );

    //设置好友昵称
    IM.setFriendNickName = function (data, cb) {
      ImIFS.setFriendNickName(data, function (err, res) {
        if (err) {
          console.log('setFriendNickName err: ' + err);
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
      'setFriendNickName',
      {
        description: [
          '设置好友昵称.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '设置信息(JSON string) {"userId":int, "userName":"string", "friendId":int, "nick":"string"}',
              'friendId:好友的用户的id, nick:昵称'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-friend-nick', verb: 'post'}
      }
    );

    //获取用户群
    IM.getCustomerIM = function (data, cb) {
      ImIFS.getCustomerIM(data, function (err, res) {
        if (err) {
          console.log('getCustomerIM err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Body, msg: ''});
        }
      });
    };

    IM.remoteMethod(
      'getCustomerIM',
      {
        description: [
          '获取用户群.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取用户群(JSON string) {"userId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-customer-im', verb: 'post'}
      }
    );

  });
};
