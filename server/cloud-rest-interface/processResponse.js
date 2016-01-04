/**
 * @author qianqing
 * @create by 16-1-4
 * @description 统一处理rest response
 */
var processResponse = function (error, result, response) {
  if (!error) {
    var body = response.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    console.log('body:', body);
    console.log('Result:', result);

  } else {
    console.log('Error: ' + error);
  }
};
