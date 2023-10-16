// const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProduction = process.env.NODE_ENV === 'production'
// 去掉打印内容
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//  压缩文件 html css js;
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const documentTitle = 'Web Player'
const plugins = (isProduction ? [
    new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|svg|woff|ttf|json|html|ts)(\?.*)?$/i,
        threshold: 10240, // 对超过10k的数据进行压缩
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
    }),
    // new WebpackBundleAnalyzerPlugin()
] : [])
const css = (isProduction ? {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
    requireModuleExtension: true,
    // css预设器配置项
    loaderOptions: {
        css: {
            modules: {
                localIdentName: '[local]_[hash:base64:8]'
            }
        }
    }

} : {})
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    lintOnSave: false,
    runtimeCompiler: !isProduction,
    productionSourceMap: !isProduction,
    chainWebpack: (config) => {
        if (isProduction) {
            // 删除预加载
            config.plugins.delete('preload')
            config.plugins.delete('prefetch')
            // 压缩代码
            config.optimization.minimize(true)
            config.optimization.splitChunks({
                chunks: 'all'
            })
        }
        config.plugin('html').tap((args) => {
            args[0].title = documentTitle
            return args
        })
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/svg'))
            .end()
            .use('file-loader')
            .loader('file-loader')
        config.resolve.alias
            .set('@', path.join(__dirname, 'src'))
            .set('components', path.join(__dirname, 'src/components'))
            .set('mixins', path.join(__dirname, 'src/mixins'))
            .set('store', path.join(__dirname, 'src/store'))
            .set('views', path.join(__dirname, 'src/views'))
            .set('@assets', path.join(__dirname, 'src/assets'))
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'file-loader',
                },
            ],
        },
        externals: {},
        plugins,
        optimization: {
            minimizer: isProduction ? [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: { // 删除注释
                            comments: false
                        },
                        // 生产环境自动删除console
                        compress: {
                            // warnings: false, // 若打包错误，则注释这行
                            drop_debugger: true, // 清除 debugger 语句
                            drop_console: true, // 清除console语句
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            ] : []
        }
        // 通过 compression-webpack-plugin 插件对js文件进行gzip压缩
    },
    css,
    devServer: {
        hot: true,
        // 在本地服务器开启gzip，线上服务器都支持gzip不需要设置
        proxy: {
            '/api': {
                target: 'https://api',
                ws: true,
                wss: true,
                changeOrigin: true,
                pathRewrite: {'^/api': '/api'}
            }
        }
    }
}
