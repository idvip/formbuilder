/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseControl=require('./base');
    var txtEditor=require('../editors/e_txt');
    module.exports = baseControl({
        key:'label',
        view:"<label>{{txt}}</label>",
        model:{txt:"label"},
        editor:new txtEditor(["请输入标签:txt"])
    });
})