/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var observable=require('../common/observable');
    var baseControl = function (params) {
        var control = function (model) {
            var self=this;
            self.model = model||this.copyModel(control.params.model);
            self.editor = control.params.editor;
            self.viewVue = new Vue({
                template: control.params.view,
                data: self.model
            });
            self.viewVue.$mount();
            self.key = control.params.key;
            self.view = $(self.viewVue.$el).addClass("preview")[0];
            self.on = observable();
            self.view.addEventListener('click', function (e) {
                self.on.call(self, "click", e);
            })
        }
        params.type=params.type||baseControl.input;
        params.view = "<div class='control'>" + params.view + "</div>";
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
    //控件类型定义
    baseControl.types={
        input:'input',//default
        hint:'hint',
        group:'group'
    };
    baseControl.prototype.copyModel = function (model) {
        return $.extend(true, {}, model);
    }
    module.exports=baseControl;
})