/**
 * @author qianqing
 * @create by 16-1-15
 * @description
 */
var utils = require('../../util/utils');

exports.createRegisterXML = function (regObj) {
  regObj.Name = regObj.Name || '';
  regObj.Gender = regObj.Gender || 'Male';
  regObj.BirthDay = regObj.BirthDay || utils.formatByT(new Date());
  regObj.CustomerFrom = regObj.CustomerFrom || '';
  regObj.CustomerLevel = regObj.CustomerLevel || 0;
  regObj.CustomerSource = regObj.CustomerSource || 0;
  regObj.HeadPicture = regObj.HeadPicture || '';
  regObj.StoreName = regObj.StoreName || '';
  regObj.WangwangNo = regObj.WangwangNo || '';
  regObj.invitationCode = regObj.invitationCode || '';

  return '<Register xmlns="http://tempuri.org/">' +
    '<registerInfo xmlns:d4p1="http://schemas.datacontract.org/2004/07/MYun.BPC.Contract.CustomerMgmt.Data"' +
    ' xmlns:i="http://www.w3.org/2001/XMLSchema-instance">' +
    '<d4p1:BirthDay>' + regObj.BirthDay + '</d4p1:BirthDay>' +
    '<d4p1:CellPhoneNo>' + regObj.CellPhoneNo + '</d4p1:CellPhoneNo>' +
    '<d4p1:CustomerFrom>' + regObj.CustomerFrom + '</d4p1:CustomerFrom>' +
    '<d4p1:CustomerLevel>' + regObj.CustomerLevel + '</d4p1:CustomerLevel>' +
    '<d4p1:CustomerSource>' + regObj.CustomerSource + '</d4p1:CustomerSource>' +
    '<d4p1:Gender>' + regObj.Gender + '</d4p1:Gender>' +
    '<d4p1:HeadPicture>' + regObj.HeadPicture + '</d4p1:HeadPicture>' +
    '<d4p1:LoginPassword>' + regObj.LoginPassword + '</d4p1:LoginPassword>' +
    '<d4p1:Name>' + regObj.Name + '</d4p1:Name>' +
    '<d4p1:StoreName>' + regObj.StoreName + '</d4p1:StoreName>' +
    '<d4p1:WangwangNo>' + regObj.WangwangNo + '</d4p1:WangwangNo>' +
    '</registerInfo>' + '<invitationCode>' + regObj.invitationCode + '</invitationCode></Register>';
};
