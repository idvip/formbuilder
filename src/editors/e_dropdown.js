/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseEditor=require('./base');
    var dpEditor=function(config){
        //config 必须属性：options(列表)、to（选择绑定到的属性），可选项：display、value
        config=$.extend({txt:'请选择：',to:'type'},config);
        var _view= this.view;
        var optStr="<option value='{v}'>{n}</option>";
        var optionsHtml=config.options.select(function(){
            return optStr.replace("{v}",config.value?this[config.value]:this).replace("{n}",config.display?this[config.display]:this);
        }).join('');
        this.view=_view.replace('{txt}',config.txt).replace('{to}',config.to).replace('{options}',optionsHtml);//.replace('{value}',config.value).replace('{display}',config.display);
    }
    dpEditor.prototype.view='<div class="form-group">' +
        '<label for="exampleInputEmail1">{txt}</label> ' +
        '<select v-model="{to}">' +
        '{options}' +
        '</select>' +
        '</div>';
    baseEditor.inherit(dpEditor);
    module.exports = dpEditor;
})