// 定义一个随机字符串函数，传入数字几就是多少位
const chars = ['0', '1', '2', '3','4', '5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n']

const random = function generateMixed(n){
  var res = "";
  for(var i = 0; i < n; i++){
    var id = Math.ceil(Math.random()*35);
    res += chars[id];
  }
  return res;
}

export {random}