/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseControl=require('./base');
    var editor=require('../editors/e_list');
    module.exports = baseControl({
        key:'radioList',
        view:"<div v-for='p in list'><input type='radio'/>&nbsp;&nbsp;&nbsp;<span>{{p.txt}}</span></div>",
        model:{list:[
            {txt:'选项A'},
            {txt:'选项B'}
        ]},
        editor:new editor()
    });
})