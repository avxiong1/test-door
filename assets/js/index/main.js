requirejs.config({
    // urlArgs: "v=" + requirejs.s.contexts._.config.config.site.version,
    urlArgs: "v=" + (new Date()).getTime(),
    baseUrl: requirejs.s.contexts._.config.config.site.cdnurl + '/assets/js/', //资源基础路径

    paths: {
        'map':'index/require-map',
        'jquery': '../libs/jquery/dist/jquery.min',
        // 'jquery': 'https://cdn.bootcss.com/jquery/2.2.4/jquery.min',
        // 'citydata': 'index/city-data',
        // 'jquery-weui':'https://cdn.bootcss.com/jquery-weui/1.2.1/js/jquery-weui.min',
        'jquery-weui':'index/jquery-weui.min',
        'weui':'index/weui',
        'fastclick':'index/fastclick',
        'common': 'index/common',
        // 'citypicker':'https://cdn.bootcss.com/jquery-weui/1.2.1/js/city-picker.min',
        'citypicker':'index/city-picker.min',
        'async': '../addons/example/js/async',
        'weixin':'https://res.wx.qq.com/open/js/jweixin-1.4.0',
        // 'wx':'index/wx'
        // 'template': '../libs/art-template/dist/template-native',
        // 'BMap': ['//api.map.baidu.com/api?v=2.0&ak=csilSIZR2SrPbvGFV6ETGFiIGrqtbyid']
    },
    shim: {
        'jquery-weui':['jquery'],
        'wx':['weixin'],
        'BMap': {
            deps: ['jquery'],
            exports: 'BMap'
        }

    },
     map: {
        '*': {
            'css': '../libs/require-css/css.min'
        }
    },
    waitSeconds: 30,
    charset: 'utf-8'
});

require(['jquery','jquery-weui','weui'], function ($,JqueryWuei,Wuei) {
    //初始配置
    var Config = requirejs.s.contexts._.config.config;
    //将Config渲染到全局
    window.Config = Config;
    // 配置语言包的路径
    var paths = {};
    paths['lang'] = Config.moduleurl + '/ajax/lang?callback=define&controllername=' + Config.controllername;
    // 避免目录冲突
    paths['frontend/'] = 'frontend/';
    require.config({paths: paths});

    // 初始化
    $(function () {
        //console.log(Config.jsname);
        if (Config.jsname) {
            require([Config.jsname], function (Controller) {
                Controller[Config.actionname] != undefined && Controller[Config.actionname]();
            }, function (e) {
                console.error(e);
                // 这里可捕获模块加载的错误
            });
        }

    });
});