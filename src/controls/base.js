/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    var observable=require('../common/observable');
    var baseControl = function (params) {
        var control = function () {
            this.model = this.copyModel(control.params.model);
            this.editor = control.params.editor;
            this.viewVue = new Vue({
                template: control.params.view,
                data: this.model
            });
            this.viewVue.$mount();
            this.key = control.params.key;
            this.view = $(this.viewVue.$el).addClass("preview")[0];
            this.on = observable();
            var self = this;
            this.view.addEventListener('click', function (e) {
                self.on.call(self, "click", e);
            })
        }
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
    baseControl.prototype.copyModel = function (model) {
        return $.extend(true, {}, model);
    }
    module.exports=baseControl;
})