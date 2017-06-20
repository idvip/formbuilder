/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseControl=require('./base');
    var txtEditor=require('../editors/e_txt');
    var dropdown=require('../editors/e_dropdown');
    module.exports = baseControl({
        key:'textInput',
        view:"<span>{{txt}}</span>：" +
        "<input v-if='type!=\"area\"' v-bind:type='type'/>" +
        "<p v-if='type==\"area\"'><textarea></textarea></p>",
        model:{txt:'Text',type:'text'},
        editor:[
            new txtEditor(["请输入标题:txt"]),
            new dropdown({
                txt:'输入类型',
                options:[
                    {n:'文本',v:'text'},
                    {n:'多行文本',v:'area'},
                    {n:'数字',v:'number'},
                    {n:'电话',v:'tel'},
                    {n:'密码',v:'password'},
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