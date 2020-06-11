module.exports = {
    devServer: {
        proxy: {
            '/auth': {
                target: 'http://192.168.1.141:9092'
            }
        }
    }
}