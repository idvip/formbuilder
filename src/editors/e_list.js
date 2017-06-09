/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var baseEditor=require('./base');
    var listEditor=function(conf){
        conf=$.extend({txt:'txt',list:'list'},conf);
        this.conf=conf;
        var _view= this.view;
        this.view=_view.replace('{txt}',conf.txt).replace('{list}',conf.list);
    }
    listEditor.prototype.view='<div class="form-group">' +
        '<input type="text" class="form-control" v-for="p in {list}" v-model="p.{txt}">' +
        '<button v-on:click="add">添加</button>' +
        '</div>';
    listEditor.prototype.methods={
        add:function(){
            var obj={};
            var data=this._data;
            obj[data._editor.conf.txt]='NewItem';
            this[data._editor.conf.list].push(obj);
        }
    }

    baseEditor.inherit(listEditor);
    module.exports = listEditor;
})