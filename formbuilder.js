/**
 * Created by jun on 2017/5/23.
 */
window.formbuilder=(function(){
    //#编辑器定义
    var baseEditor=function(){

    }
    baseEditor.inherit=function(fun){
        fun.prototype =$.extend(new baseEditor(),fun.prototype);
    }
    baseEditor.prototype.render=function(model){
        this.viewVue=new Vue({
            data:model,
            template:this.view
        });
        this.viewVue.$mount();
        return $(this.viewVue.$el).addClass("preview")[0];
    }
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
    //自定义事件监听器
    var observable=function(){
        var eventList=[];
        return function(name,func){
            //事件处理
            //目前可用事件：total(总金额更新）
            var evt = eventList[name];
            if(typeof func =='function'){
                if(evt){
                    evt.push(func);
                }
                else{
                    eventList[name]=[func];
                }
            }
            else{
                if(evt){
                    for(var i=0,ci;ci=evt[i];i++){
                        ci.call(this,func);
                    }
                }
            }
        }
    }

    //#控件定义
    var baseControl=function(params){
        var control = function(){
            this.model=this.copyModel(control.params.model);
            this.editor=control.params.editor;
            this.viewVue=new Vue({
                template:control.params.view,
                data:this.model
            });
            this.viewVue.$mount();
            this.key=control.params.key;
            this.view= $(this.viewVue.$el).addClass("preview")[0];
            this.on=observable();
            var self=this;
            this.view.addEventListener('click',function (e) {
                self.on.call(self,"click",e);
            })
        }
        params.view="<div class='control'>"+params.view+"</div>";
        var vm = control.preViewVue=new Vue({
            template:params.view,
            data:params.model
        });
        vm.$mount();
        control.preView=$(vm.$el).addClass("preview")[0];
        control.params=params;
        control.prototype=baseControl.prototype;
        control.on=observable();
        control.preView.addEventListener("click",function(e){
            control.on.call(control,"click",e);
        });
        return control;
    }
    baseControl.prototype.copyModel=function(model){
        return $.extend(true, {}, model);
    }

    var textInput=baseControl({
        key:'textInput',
        view:"<span>{{txt}}</span>：<input/>",
        model:{txt:'Text'},
        editor:new txtEditor(["请输入标题:txt"])
    });

    var label=baseControl({
        key:'label',
        view:"<label>{{txt}}</label>",
        model:{txt:"label"},
        editor:new txtEditor(["请输入标签:txt"])
    });

    var checkboxList=baseControl({
        key:'checkboxList',
        view:"<label>{{txt}}</label><input type='checkbox'/>",
        model:{txt:"请选择"},
        editor:new txtEditor(["txt"])
    });
    var radioList=baseControl({
        key:'radioList',
        view:"<label>{{txt}}</label><input type='radio'/>",
        model:{txt:"请选择"},
        editor:new txtEditor(["txt"])
    });

    //工具箱生成组件
    var controls={
        //所有可用组件列表
        list:[textInput,label,checkboxList,radioList],
        loadToolsBox:function($panel,bud){
            var $tools = $("<div class='controls'><p class='ctitle'>&nbsp;控件库</p></div>").appendTo($panel);
            var onClick=function(){
                this.builder.addControl(new this());
            }
            controls.list.each(function(){
                //console.log(controls.list.toString());
                this.builder=bud;
                this.on("click",onClick);
                $tools.append(this.preView);
            })
            bud.$tools=$tools;
        }
    }

    //表单生成组件
    var builder=function(id){
        this.init($(id));
        this.forms=[];
    }
    builder.prototype.addControl=function(ctrl){
        this.$content.append(ctrl.view);
        var self = this;
        ctrl.on("click",function(){
            var view = this.editor.render(this.model);
            self.$editor.html('');
            self.$editor.append(view);
        })
        this.forms.push(ctrl);
    }
    builder.prototype.getData=function(){
        return this.forms.select("{key:this.key,data:this.model}");
    }
    builder.prototype.init=function ($dom) {
        var $row=$('<div class="row">').appendTo($dom.addClass("container-fluid"));
        var $toolBox=$('<div class="col-md-3">').appendTo($row);
        this.$content=$('<div class="col-md-6 content"><p  class="ctitle">&nbsp;表单编辑区</p></div>').appendTo($row);
        this.$editor=$('<div class="col-md-3 editor"><p  class="ctitle">&nbsp;属性</p></div>').appendTo($row);
        controls.loadToolsBox($toolBox,this)
    }
    return builder;
})();