/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var observable=require('../common/observable');
    var txtEditor=require('../editors/e_txt');
    var toggleEditor = require('../editors/e_toggle');
    //控件编辑工具栏组件
    var toolbarHtml='<div class="ctrl-toolbar">' +
        '<span class="ctrl-toolbar-item" v-on:click="_moveTop">上移</span>' +
        '<span class="ctrl-toolbar-item" v-on:click="_moveDown">下移</span>' +
        '<span class="ctrl-toolbar-item del" v-on:click="_del">删除</span>' +
        '</div>';
    var titleHtmlTpl='<div class="ctrl-title" v-if="isshow_field_title">{{field_title}}</div>';
    var baseControl = function (params) {
        var control = function (model) {
            this.init(control,model);
        }
        params.type=params.type||baseControl.types.input;
        var titleHtml = titleHtmlTpl;
        //添加字段名编辑器，编辑字段类型的特殊处理
        if(params.type===baseControl.types.input){
            //设定生成表单后的字段名（空字符串将会由builder对象自动生成默认名称）
            params.model.field_name='';
            //该题目的名称
            params.model.field_title='无标题';
            params.model.isshow_field_title=true;
            var fieldEditor=new txtEditor(["字段名:field_name:0:用于表单提交后生成报表名称"]);
            var fieldTitleEditor=new txtEditor(["标题:field_title:0:显示该控件标题"]);
            var isshowFieldTitleEditor = new toggleEditor(["是否显示标题:isshow_field_title"]);
            var sysEditors=[fieldEditor,fieldTitleEditor,isshowFieldTitleEditor];
            params.editor=(params.editor instanceof Array)?sysEditors.concat(params.editor):(sysEditors.push(params.editor),sysEditors);
        }
        else{
            titleHtml='';
        }
        params.view = "<div class='control'>"+titleHtml + params.view + toolbarHtml+"</div>";
        var vm = control.preViewVue = new Vue({
            template: params.view.replace(toolbarHtml,'').replace(titleHtml,''), //生成工具箱时不需要toolbar和title
            data: params.model
        });
        vm.$mount();
        control.preView = $(vm.$el).addClass("preview")[0];
        control.params = params;
        control.prototype = baseControl.prototype;
        control.on = observable();
        control.preView.addEventListener("click", function (e) {
            control.on.call(control, "click", e);
        });
        return control;
    }
    //控件类型定义（指编辑型和展示型控件）
    baseControl.types={
        input:'input',//default
        hint:'hint',
        group:'group'
    };
    baseControl.prototype.copyModel = function (model) {
        return $.extend(true, {}, model);
    }
    baseControl.prototype.init=function(control,model){
        var self=this;
        self.model = model||this.copyModel(control.params.model);
        self.editor = control.params.editor;
        self.on = observable();
        self.key = control.params.key;
        self.viewVue = new Vue({
            template: control.params.view,
            data: self.model,
            methods:{
                _del:function (e) {
                    e.stopPropagation();
                    self.on.call(self,"delete",e);
                },
                _moveTop:function (e) {
                    e.stopPropagation();
                    self.on.call(self,"moveTop",e);
                },
                _moveDown:function (e) {
                    e.stopPropagation();
                    self.on.call(self,"moveDown",e);
                }
            }
        });
        self.viewVue.$mount();
        self.view = $(self.viewVue.$el).addClass("preview")[0];
        self.view.addEventListener('click', function (e) {
            self.on.call(self, "click", e);
        });
    }
    //设置控件索引（在表单中的索引，主要用来在表单中编号和排序）
    baseControl.prototype.setIndex=function (index) {
        this._index=index;
        if(this.model.field_name===''){
            this.model.field_name="Field"+(index+1);
        }
    }
    baseControl.prototype.moveTo=function (index) {
        if(index === this._index || index<0) return;
        //上移-0.5 下移+0.5 ，避免与整数顺序产生冲突
        this.setIndex(index+(index>this._index?0.5:-0.5))
    }
    baseControl.prototype.genHtml=function () {
        var view = $(this.view).html();
        var $view = $("<div class='control'/>").append(view);
        $view.find(".ctrl-toolbar").remove();
        return $view[0].outerHTML;
    }
    module.exports=baseControl;
})