/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseControl=require('./base');
    var txtEditor=require('../editors/e_txt');
    var dropdown=require('../editors/e_dropdown');
    module.exports = baseControl({
        key:'textInput',
        view:"<span>{{txt}}</span>：<input v-bind:type='type'/>",
        model:{txt:'Text',type:'text'},
        editor:[
            new txtEditor(["请输入标题:txt"]),
            new dropdown({
                txt:'输入类型',
                options:[
                    {n:'文本',v:'text'},
                    {n:'数字',v:'number'},
                    {n:'电话',v:'tel'},
                    {n:'日期',v:'date'},
                    {n:'时间',v:'time'},
                    {n:'时间日期',v:'datetime-local'}
                ],
                to:'type',
                value:'v',
                display:'n'
            })
        ]
    });
})