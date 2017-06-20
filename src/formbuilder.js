/**
 * Created by jun on 2017/6/8.
 */
define(function(require,exports,module){
    var controls = require("./controls/index");
    //表单生成组件（编辑用）
    var builder=function(id){
        this.init($(id));
        this.ctrls=[];
    }
    //显示编辑器（点击控件时）
    var onShowEditor=function(){
        var view = null;
        //渲染多编辑器
        if(this.editor instanceof Array){
            view = document.createElement("div");
            var that=this;
            this.editor.each(function(){
                view.appendChild(this.render(that.model));
            });
        }
        else{
            //单编辑器
            view = this.editor.render(this.model);
        }
        this._form.$editor.html('');
        this._form.$editor.append(view);
    }
    var datasToCtrls=function(data){
        if(!data){
            return [];
        }
        if(typeof data =='string'){
            data = JSON.parse(data);
        }
        return data.select(function(){
            var cont = controls.getByKey(this.key);
            if(cont){
                return new cont(this.data);
            }
        }).where("this");
    }
    builder.prototype.addControl=function(ctrl){
        ctrl._form=this;
        ctrl.on("click",onShowEditor);
        ctrl.setIndex(this.ctrls.length);
        this.ctrls.push(ctrl);
        this.render(ctrl);
    }
    builder.prototype.render=function (ctrl) {
        var self = this;
        //渲染表单，如果传递控件对象，则append 否则重新渲染所有控件（刷新）
        if(ctrl){
            this.$content.append($(ctrl.view).append($("<div class='remove'>删除</div>").click(function(){
                console.log(ctrl);
                self.ctrls.remove(ctrl);
                self.render();
            })));
        }
        else{
            this.$content.html('');
            var self = this;
            this.ctrls.each(function () {
                self.$content.append(this.view);
            })
        }
    }
    builder.prototype.getData=function(){
        return this.ctrls.select("{key:this.key,data:this.model}");
    }
    builder.prototype.setData=function (data) {
        var ctrls = datasToCtrls(data);
        if(!ctrls || ctrls.length<1) return;
        this.ctrls=[];
        var self = this;
        ctrls.each(function () {
            self.addControl(this);
        });
    }
    builder.prototype.init=function ($dom) {
        var $row=$('<div class="row">').appendTo($dom.addClass("container-fluid"));
        var $toolBox=$('<div class="col-md-3">').appendTo($row);
        this.$content=$('<div class="col-md-6 content"><p  class="ctitle">&nbsp;表单编辑区</p></div>').appendTo($row);
        this.$editor=$('<div class="col-md-3 editor"><p  class="ctitle">&nbsp;属性</p></div>').appendTo($row);
        controls.loadToolsBox($toolBox,this)
    }
    //输出表单（预览或生成html使用），传递id，则渲染表单到页面，不传id则返回表单html
    builder.prototype.outTo=function (id) {
        return builder.render(this,id);
    }

    //渲染表单对象（输出用）
    var form = function (ctrls) {
        this.ctrls=ctrls;
    }
    //生成表单[暂只支持生成html表单]。如果生成的不是html表单，若获取数据可通过form对象获取。（提交表单时通过form.getInput()获取）
    form.prototype.outTo=function (id) {
        //如果不传id，则直接返回html，便于保存html表单
        var html =  this.ctrls.select(function () {
            var view = $(this.view).html();
            return $("<div class='control'/>").append(view)[0].outerHTML;
        }).join('');
        $(id).html(html);
        return html;
    }

    //渲染表单（生成表单）
    builder.render=function(datasOrBuilder,id){
        if(datasOrBuilder instanceof builder){
            datasOrBuilder = datasOrBuilder.getData();
        }
        var ctrls = datasToCtrls(datasOrBuilder);
        var f = new form(ctrls);
        var html = f.outTo(id);
        return id?html:f;
    }
    module.exports=builder;
})