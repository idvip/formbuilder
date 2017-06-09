/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseEditor=require('./base');
    var txtEditor=function(fields){
        var _view= this.view;
        this.view=fields.select(function(){
            var pas = this.split(':');
            return _view.replace('{{name}}',pas[0]).replace('{{txt}}',pas[1]);
        }).join();
    }
    txtEditor.prototype.view='<div class="form-group">' +
        '<label for="exampleInputEmail1">{{name}}</label> ' +
        '<input type="text" class="form-control" v-model="{{txt}}">' +
        '</div>';
    baseEditor.inherit(txtEditor);
    module.exports = txtEditor;
})