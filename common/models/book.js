var loopback = require('loopback');
var async = require('async');

module.exports = function (Book) {
  Book.getApp(function (err, app) {
    var app_self = app;
    //确认订单
    Book.confirm = function (data, cb) {
      cb(null, {status: 0, id: 1212, msg: ''});
    };

    Book.remoteMethod(
      'confirm',
      {
        description: [
          '确认订单(access token).返回结果-status:操作结果 0 成功 -1 失败, id:订单号(失败时无该字段), msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'}, description: ['订单信息(JSON string) {',
            'mode:配送方式, address:配送地址, totalPrice:合计价格, goods:[{id:商品id, styles:[{id:款式id, num:款式数量}]}]}']
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/confirm', verb: 'post'}
      }
    );

    //获取用户订单
    Book.getUserBook = function (mode, pageId, pageSize, cb) {
      cb(null, {
        count: 2,
        data: [
          {
            id: 1,
            status: '已审核',
            num: 5,
            totalPrice: '144元',
            create: '2015-12-11 09:12:14',
            img: ['https://docs.strongloop.com/','https://docs.strongloop.com/']
          },
          {
            id: 2,
            status: '待审核',
            num: 15,
            totalPrice: '132元',
            create: '2015-12-21 09:12:14',
            img: ['https://docs.strongloop.com/','https://docs.strongloop.com/']
          }
        ]
      });
    };

    Book.remoteMethod(
      'getUserBook',
      {
        description: [
          '获取用户订单列表(access token).返回结果-count:订单总数, data:该次查询的订单数组[{id:订单id, ',
          'status:订单状态, num:商品数量, totalPrice:合计价格, create:创建时间, img:[\'\',\'\']}]'
        ],
        accepts: [
          {
            arg: 'mode', type: 'number', required: false, default: 1, http: {source: 'query'},
            description: '查询方式 一个月内:1  一个月以前:0, 默认1'
          },
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-user-book', verb: 'get'}
      }
    );
  });
};
