module.exports = function(grunt) {
    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            pug: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'model/**/*.js', 'schema/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['public/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/build/admin.min.js': ['public/js/admin.js'],
                    'public/build/detail.min.js': ['public/js/detail.js']
                }
            },
            // tasks: ['jshint'],
            options: {
                mangle: false
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/build/index.css': 'public/less/index.less'
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch', 'less', 'uglify'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    // grunt.loadNpmTasks('grunt-contrib-jshint')

    // 文件有改动，就会重新执行你在它里面注册好的任务
    grunt.loadNpmTasks('grunt-contrib-watch')

    // 用于监听入口app.js文件，如有改动，就会自动重启
    grunt.loadNpmTasks('grunt-nodemon')

    // 针对less,sass,stylus慢任务的编译优化
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.option('force', true)

    grunt.registerTask('build', ['less', 'uglify'])

    // 设置首先执行的默认任务
    grunt.registerTask('default', ['concurrent'])
}