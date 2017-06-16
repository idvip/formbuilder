module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: pkg,
        options: {
        },
        transport: { // 给cmd模块提取id以及依赖，并复制到.build文件夹
            target_name: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: '.build'
                }]
            }
        },

        concat: { // 把主模块及其依赖的所有模块统一合并为formbuilder-all.js
            index: {
                options: {
                    include: 'all'
                },
                files: {
                    '.build/all.js': ['.build/formbuilder.js']
                }
            }
        },

        uglify: { // 对合并后的文件及其它JS框架进行打包压缩
            index: {
                files: {
                    'dist/<%=pkg.name%>-<%=pkg.version%>.js': (pkg.pkgs||[]).concat(['.build/all.js','src/init.js'])
                }
            }
        },
        //清理.build文件夹
        clean: {
            build: ['.build']
        }
    });
    //  加载三个插件
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 定义任务
    grunt.registerTask('default', ['transport' , 'concat' , 'uglify','clean']);

};