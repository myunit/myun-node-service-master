/**
 * @author qianqing
 * @create by 16-1-4
 * @description
 */
var util = require('util');
var async = require('async');

var GoodsInterface = function (MYCloudDS) {
  this.MYCloudDS = MYCloudDS;
  Object.call(this);
};
util.inherits(GoodsInterface, Object);

GoodsInterface.prototype.getNumInCart = function (callback) {
  var DS = this.MYCloudDS;
  async.waterfall(
    [
      function (cb) {
        DS.cart(function (error, result) {
          if (!error) {
            if (body.status === 'OK') {
              cb(null, result.num);
            } else {
              cb(new Error('getNumInCart Error: ' + body.status), null);
            }
          } else {
            cb(error, null);
          }
        });
      }
    ],
    function (err, num) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, num);
      }
    }
  );
};

exports = module.exports = GoodsInterface;

