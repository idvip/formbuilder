/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseControl=require('./base');
    var editor=require('../editors/e_list');
    module.exports = baseControl({
        key:'radioList',
        view:"<span v-for='p in list'><label>{{p.txt}}</label><input type='radio'/>&nbsp;&nbsp;&nbsp;</span>",
        model:{list:[
            {txt:'选项A'},
            {txt:'选项B'}
        ]},
        editor:new editor()
    });
})