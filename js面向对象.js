/**
 * Created by Keller、Ruiming on 2017/4/15.
 */
function loginVerify(option){
    console.log("gouzao");
    this._init(option);
}

loginVerify.prototype = {
    _init: function(option){
        //共享构造函数的属性

    },
    printA: function () {
        console.log("A");

    },
    printB: function () {
        console.log("Bss");
        return false;
    },
    printC: function () {
        console.log("C");
    }
}

/*实例化一个loginVeryfy对象*/
var login = new loginVerify();

login.printA();
login.printB();
login.printC();