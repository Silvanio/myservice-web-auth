module.exports = {
    devServer: {
        proxy: {
            '/user': {
                target: 'http://192.168.1.246:9092'
            },
            '/auth': {
                target: 'http://192.168.1.246:9092'
            }
        }
    }
}