/**
 * @author qianqing
 * @create by 16-2-29
 * @description
 */
var xml = require('xml');

exports.getAllFriendApplyXML = function (userId, pageId, pageSize) {
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
                'd4p1:ApplyState': 0
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

exports.getRecommendFriendsXML = function (userId, contactAddress, pcdCode) {
  if (pcdCode.charAt(pcdCode.length - 1) !== '-') {
    pcdCode += '-';
  }

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
            'd4p1:PCDCode': pcdCode
          },
          {
            'd4p1:PCDDescription': ''
          }
        ]
      }
    ]
  }];

  return xml(xmlObj, true);
};
