/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseEditor=require('./base');
    //field=字段数组。本文本编辑支持多字段编辑。数组类型为字符串，格式为："名称:绑定字段名:类型(可选，默认为单行文本框 1=多行文本框)"
    //例如：["姓名:name","住址:addr:1"] ，即生成2个字段编辑，第一个为单行文本框，第二个为多行文本框
    var txtEditor=function(fields){
        var _view= this.view;
        var html=fields.select(function(){
            var pas = this.split(':');
            var input = null;
            if(pas[2]){
                input='<textarea class="form-control" v-model="'+pas[1]+'"></textarea>';
            }
            else{
                input ='<input type="text" class="form-control" v-model="'+pas[1]+'" />';
            }
            return _view.replace('{name}',pas[0]).replace('{input}',input);
        }).join('');
        this.view="<div>"+html+"</div>";
    }
    txtEditor.prototype.view='<div class="form-group">' +
        '<label>{name}</label> {input}' +
        '</div>';
    baseEditor.inherit(txtEditor);
    module.exports = txtEditor;
})