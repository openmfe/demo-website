import multi from '@rollup/plugin-multi-entry'

export default {
    input: [
        'src/scripts/**/*.js'
    ],
    output: {
        file: 'dist/_assets/js/main.js',
    },
    watch: {
        clearScreen: false
    },
    plugins: [
        multi()
    ]
}
