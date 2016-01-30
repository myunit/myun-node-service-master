var loopback = require('loopback');
var WalletIFS = require('../../server/cloud-soap-interface/wallet-ifs');

module.exports = function (Wallet) {
  Wallet.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var walletIFS = new WalletIFS(app);

    //增加体现记录
    Wallet.addWithdrawsCash = function (data, cb) {
      walletIFS.addWithdrawsCash(data, function (err, res) {
        if (err) {
          console.log('addWithdrawsCash err: ' + err);
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

    Wallet.remoteMethod(
      'addWithdrawsCash',
      {
        description: [
          '增加体现记录(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '提现信息信息(JSON string) {"userId":int, "userName":"string", "account":"string", "company":"string", ',
              '"accountName":"string", "amount":float, "phone":"string", "type":int}',
              'userId:用户编号, userName:用户昵称, account：银行开号或支付宝账号, company:银行名(支付宝时为空字符串), ',
              'accountName:开户人名(支付宝时为空字符串), amount:提现金额, phone:电话, type:提现方式(1-支付宝 2-银行卡)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-withdraws-cash', verb: 'post'}
      }
    );

  });
};
