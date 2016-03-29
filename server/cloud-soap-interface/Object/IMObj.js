/**
 * @author qianqing
 * @create by 16-2-29
 * @description
 */
var xml = require('xml');

exports.getAllFriendApplyXML = function (userId, state, pageId, pageSize) {
  var xmlObj = [{
    GetAllCustomerFriendApply: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:PageIndex': pageId
          },
          {
            'd4p1:PageSize': pageSize
          },
          {
            'd4p1:UserId': userId
          },
          {
            'd4p1:UserName': ''
          },
          {
            'd4p1:Body': [
              {
                'd4p1:ApplyState': state
              },
              {
                'd4p1:CustomerNoFrom': -1
              },
              {
                'd4p1:CustomerNoTo': userId
              }
            ]
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getAllFriendsXML = function (userId) {
  var xmlObj = [{
    GetAllCustomerFriends: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerNo: userId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getRecommendFriendsXML = function (userId, contactAddress, pcdDes) {

  var xmlObj = [{
    GetCustomerByLuck: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        query: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:ContactAddress': contactAddress
          },
          {
            'd4p1:Count': 10
          },
          {
            'd4p1:ExCustomerNo': userId
          },
          {
            'd4p1:PCDCode': ''
          },
          {
            'd4p1:PCDDescription': pcdDes
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.searchUserByKeyXML = function (obj) {
  var xmlObj = [{
    SearchCustomerByKey: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:PageIndex': obj.pageId
          },
          {
            'd4p1:PageSize': obj.pageSize
          },
          {
            'd4p1:UserId': obj.userId
          },
          {
            'd4p1:UserName': ''
          },
          {
            'd4p1:Body': obj.key
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.acceptFriendApplyXML = function (obj) {
  var xmlObj = [{
    AcceptCustomerFriendApply: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:PageIndex': 0
          },
          {
            'd4p1:PageSize': 0
          },
          {
            'd4p1:UserId': obj.userId
          },
          {
            'd4p1:UserName': obj.userName
          },
          {
            'd4p1:Body': obj.applyId
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.rejectFriendApplyXML = function (obj) {
  var xmlObj = [{
    RejectCustomerFriendApply: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:PageIndex': 0
          },
          {
            'd4p1:PageSize': 0
          },
          {
            'd4p1:UserId': obj.userId
          },
          {
            'd4p1:UserName': obj.userName
          },
          {
            'd4p1:Body': obj.applyId
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.addFriendApplyXML = function (obj) {
  var xmlObj = [{
    AddCustomerFriendApply: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:PageIndex': 0
          },
          {
            'd4p1:PageSize': 0
          },
          {
            'd4p1:UserId': obj.userId
          },
          {
            'd4p1:UserName': obj.userName
          },
          {
            'd4p1:Body': [
              {
                'd4p1:CustomerNoFrom': obj.userId
              },
              {
                'd4p1:CustomerNoTo': obj.friendId
              },
              {
                'd4p1:Remark': obj.remark
              }
            ]
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.checkIsFriendXML = function (obj) {
  var xmlObj = [{
    CheckIsFriends: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        cus_a: obj.userId
      },
      {
        cus_b: obj.friendId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getFriendInfoXML = function (userId, friendId) {
  var xmlObj = [{
    GetCustomerFriendInfo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        cus_a: userId
      },
      {
        cus_b: friendId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.deleteFriendXML = function (obj) {
  var xmlObj = [{
    DeleteCustomerFriend: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:PageIndex': 0
          },
          {
            'd4p1:PageSize': 0
          },
          {
            'd4p1:UserId': obj.userId
          },
          {
            'd4p1:UserName': obj.userName
          },
          {
            'd4p1:Body': [
              {
                'd4p1:ApplyState': 0
              },
              {
                'd4p1:CustomerNoFrom': obj.userId
              },
              {
                'd4p1:CustomerNoTo': obj.friendId
              }
            ]
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setFriendNickNameXML = function (obj) {
  var xmlObj = [{
    SetCustomerFriendNickName: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: [
          {
            _attr: {
              'xmlns:d4p1': 'http://schemas.datacontract.org/2004/07/MYun.CIE.Contract.Data',
              'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance'
            }
          },
          {
            'd4p1:PageIndex': 0
          },
          {
            'd4p1:PageSize': 0
          },
          {
            'd4p1:UserId': obj.userId
          },
          {
            'd4p1:UserName': obj.userName
          },
          {
            'd4p1:Body': [
              {
                'd4p1:CustomerNoFrom': obj.userId
              },
              {
                'd4p1:CustomerNoTo': obj.friendId
              },
              {
                'd4p1:Remark': obj.nick
              }
            ]
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getCustomerIMXML = function (obj) {
  var xmlObj = [{
    GetCustomerIMBySysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerId: obj.userId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.pushIMMsgXML = function (obj) {
  var xmlObj = [{
    PushIMMsgForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(obj)
      }
    ]
  }];

  return xml(xmlObj, true);
};
