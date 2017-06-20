/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var observable=require('../common/observable');
    var txtEditor=require('../editors/e_txt');
    var baseControl = function (params) {
        var control = function (model) {
            this.init(control,model);
        }
        params.type=params.type||baseControl.types.input;
        params.view = "<div class='control'>" + params.view + "</div>";
        //添加字段名编辑器
        if(params.type==baseControl.types.input){
            //设定生成表单后的字段名（空字符串将会由builder对象自动生成默认名称）
            params.model.field_name='';
            var fieldEditor=new txtEditor(["字段名:field_name:0:用于表单提交后生成报表名称"]);
            params.editor=(params.editor instanceof Array)?[fieldEditor].concat(params.editor):[fieldEditor,params.editor];
        }
        var vm = control.preViewVue = new Vue({
            template: params.view,
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
            data: self.model
        });
        self.viewVue.$mount();
        self.view = $(self.viewVue.$el).addClass("preview")[0];
        self.view.addEventListener('click', function (e) {
            self.on.call(self, "click", e);
        });
    }
    //设置控件索引（在表单中的索引，主要用来在表单中编号和排序）
    //isInsert:bool 是否在index位置插入了新元素，如果true且index>=当前索引，将当前索引往后加1（用于控件任意排序）如：在第3个位置插入一个元素，那么>=3的元素全部往后移动1个索引
    baseControl.prototype.setIndex=function (index,isInsert) {
        if(isInsert && this._index>=index){
            return this.setIndex(this._index+1);
        }
        this._index=index;
        if(this.model.field_name===''){
            this.model.field_name="Field"+(index+1);
        }
    }
    module.exports=baseControl;
})