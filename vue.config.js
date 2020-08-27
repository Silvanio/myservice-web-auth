module.exports = {
    devServer: {
  
        port: 8083,
        proxy: {
            '/user': {
                target: 'http://localhost:9092'
            },
            '/auth': {
                target: 'http://localhost:9092'
            }
        }
    },
}