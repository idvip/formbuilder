/**
 * Created by jun on 2017/8/16.
 */
define(function (require, exports, module) {
    var baseControl=require('./base');
    var editor=require('../editors/e_list');
    module.exports = baseControl({
        key:'dropdownList',
        view:"<select v-bind:name='field_name'><option v-for='p in list' v-text='p.txt'></option></select>",
        model:{list:[
            {txt:'选项A'},
            {txt:'选项B'}
        ]},
        editor:new editor()
    });
})