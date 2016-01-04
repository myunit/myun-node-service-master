/**
 * @author qianqing
 * @create by 16-1-4
 * @description
 */
var util = require('util');

var GoodsInterface = function (MYCloudDS) {
  this.MYCloudDS = MYCloudDS;
  Object.call(this);
};
util.inherits(GoodsInterface, Object);

GoodsInterface.prototype.getNumInCart = function (cb) {
  var DS = this.MYCloudDS;
  var processResponse = function (error, result, response) {
    if (!error) {
      cb(null , result.num);

    } else {
      cb(error , null);
    }
  };

  DS.cart(processResponse);
};

exports = module.exports = GoodsInterface;

