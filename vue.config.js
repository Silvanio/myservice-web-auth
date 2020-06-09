module.exports = {
    devServer: {
        proxy: {
            '/auth': {
                target: 'http://localhost:9092'
            }
        }
    }
}