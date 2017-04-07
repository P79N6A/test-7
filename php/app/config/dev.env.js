var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// 开发环境 和 生产环境相同的配置，写在 ./prod.env
// 开发环境 和 生产环境不同的配置，写在 当前文件
/*
 {
    prodEnvConf,
    {
        devEnvConf
        {
            testEnvConf
        }
    }
 }
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
