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

    //获取用户资金账户信息
    Wallet.getCapitalAccountInfo = function (userId, cb) {
      walletIFS.getCapitalAccountInfo(userId, function (err, res) {
        if (err) {
          console.log('getCapitalAccountInfo err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Data, msg: ''});
        }
      });
    };

    Wallet.remoteMethod(
      'getCapitalAccountInfo',
      {
        description: [
          '获取用户资金账户信息.返回结果-status:操作结果 0 失败 1 成功, data:账户信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', require: true, http: {source: 'query'}, description: '用户编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-capital-account-info', verb: 'get'}
      }
    );

    //获取用户资金流水记录
    Wallet.getCapitalFlowRecord = function (userId, pageId, pageSize, type, cb) {
      var obj = {};
      obj.CustomerNo = userId;
      obj.OperateType = type;
      obj.PageIndex = pageId;
      obj.PageSize = pageSize;

      walletIFS.getCapitalFlowRecord(obj, function (err, res) {
        if (err) {
          console.log('getCapitalFlowRecord err: ' + err);
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

    Wallet.remoteMethod(
      'getCapitalFlowRecord',
      {
        description: [
          '获取用户资金流水记录.返回结果-status:操作结果 0 失败 1 成功, data:流水信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', require: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'pageId', type: 'number', default: 0, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', default: 10, http: {source: 'query'}, description: '每页记录数'},
          {arg: 'type', type: 'number', default: -1, http: {source: 'query'}, description: '类型,-1全部 0补贴 1提现 2转账 3交易 '}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-capital-flow-record', verb: 'get'}
      }
    );

    //获取用户提现单记录
    Wallet.getWithdrawsCashRecord = function (userId, pageId, pageSize, type, cb) {
      var obj = {};
      obj.CustomerNo = userId;
      obj.SettlementMethod = type;
      obj.PageIndex = pageId;
      obj.PageSize = pageSize;

      walletIFS.getWithdrawsCashRecord(obj, function (err, res) {
        if (err) {
          console.log('getWithdrawsCashRecord err: ' + err);
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

    Wallet.remoteMethod(
      'getWithdrawsCashRecord',
      {
        description: [
          '获取用户提现单记录.返回结果-status:操作结果 0 失败 1 成功, data:提现信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', require: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'pageId', type: 'number', default: 0, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', default: 10, http: {source: 'query'}, description: '每页记录数'},
          {arg: 'type', type: 'number', default: -1, http: {source: 'query'}, description: '类型,-1全部 1支付宝 2银行 '}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-withdraws-cash-record', verb: 'get'}
      }
    );

  });
};
