/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseControl=require('./base');
    var txtEditor=require('../editors/e_txt');
    module.exports = baseControl({
        key:'description',
        view:"<label>{{txt}}</label><p>{{desc}}</p>",
        model:{txt:"标题",desc:"这里写描述文字"},
        editor:new txtEditor(["请输入标题:txt","请输入描述:desc:1"]),
        type:baseControl.types.hint
    });
})