/**
 * Created by jun on 2017/6/16.
 */
//打包专用，用于附加全局formbuilder对象
seajs.use("formbuilder",function (a) {
    window.formbuilder=a;
})