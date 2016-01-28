/**
 * @author qianqing
 * @create by 16-1-15
 * @description
 */
module.exports = function (app) {
  app.datasources.CustomerSoap.once('connected', function () {
    console.log('Customer interface is connected');
    app.datasources.CustomerSoap.createModel('Customer', {});
  });

  app.datasources.ProductSoap.once('connected', function () {
    console.log('Product interface is connected');
    app.datasources.ProductSoap.createModel('Product', {});
  });

  app.datasources.OrderSoap.once('connected', function () {
    console.log('order interface is connected');
    app.datasources.OrderSoap.createModel('Order', {});
  });

  app.datasources.ReceiverSoap.once('connected', function () {
    console.log('receiver interface is connected');
    app.datasources.ReceiverSoap.createModel('Receiver', {});
  });
};
