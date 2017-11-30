module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            app: {
                expand: true,
                cwd: 'src/app',
                src: ['**/*.less'],
                dest: 'src/app/',
                ext: '.component.css'
            },
            main : {
                files: {
                    'src/styles.css': 'src/styles.scss'
                }
            }
        },
        sass: {
            options: {
                compress: false,
                sourcemap: 'none'
            },
            app: {
                expand: true,
                cwd: 'src/app',
                src: ['**/*.scss'],
                dest: 'src/app/',
                ext: '.component.css'
            },
            main : {
                files: {
                    'src/styles.css': 'src/styles.scss'
                }
            }
        },
        watch: {
            less: {
                files: ['src/assets/scss/**/*.scss', 'src/styles.scss', 'src/app/**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['']);
};
