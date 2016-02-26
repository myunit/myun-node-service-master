/**
 * @author qianqing
 * @create by 16-1-4
 * @description
 */
var util = require('util');
var async = require('async');
var http = require('http');
var qs = require('querystring');

var GoodsInterface = function () {
  Object.call(this);
};
util.inherits(GoodsInterface, Object);

GoodsInterface.prototype.getLogisticsInfo = function (type, postId, callback) {
  var data = {
    type: type,
    postid: postId,
    id: 1,
    valicode: 0,
    temp: 0
  };

  var content = qs.stringify(data);

  var options = {
    hostname: 'www.kuaidi100.com',
    port: 80,
    path: '/query?' + content,
    method: 'GET'
  };

  var req = http.request(options, function (res) {
    if (res.statusCode != 200) {
      callback(res.statusCode,null);
    }
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      callback(res.statusCode, data);
    });
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
    callback(-1,null);
  });

  req.end();
};

exports = module.exports = GoodsInterface;

