/**
 * @author qianqing
 * @create by 16-1-29
 * @description
 */
var xml = require('xml');

exports.addToCartXML = function (obj) {
  var xmlObj = [{
    CartForAddForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        datas: JSON.stringify(obj.product)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.submitOrderXML = function (obj, cartIds) {
  var order = {};
  order.UId = obj.userId;
  order.ReceiverId = obj.receiverId;
  order.ProductSysNo = obj.product[0].pId;
  order.ProductQty = obj.product[0].qty;
  order.PayMent = obj.payMent;
  order.Logistics = obj.logistics;
  order.BuyerMessage = obj.message;
  order.from = obj.from;

  var xmlObj = [{
    SubmitCouponOrderByCartItemSysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        orderdata: JSON.stringify(order)
      },
      {
        cartItemJson: cartIds.join()
      },
      {
        couponCode: obj.couponCode
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.checkOrderForPayXML = function (obj) {
  var xmlObj = [{
    PayForOrder: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        orderId: obj.orderId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.createPayRecordXML = function (obj) {
  var xmlObj = [{
    PayForCreate: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        buyer: obj.name
      },
      {
        orderId: obj.orderId
      },
      {
        seller: ''
      },
      {
        totalFree: obj.totalFree
      },
      {
        tradeNO: obj.tradeNO
      }
    ]
  }];

  return xml(xmlObj, true);
};
