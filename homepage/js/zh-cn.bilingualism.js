
'use strict';
 
/**
 * Html页面多语言化。
 *
 * 在Html页面中只需先引用一个JQuery文件：
 * 例如：<script src="http://libs.baidu.com/jquery/1.8.1/jquery.min.js"></script>
 * 
 * 在引用本JS文件
 * 例如：<script src="./zh-cn.bilingualism.js"></script>
 *
 * 如果你想多语言化一个Html页面，你应该做两件事:
 * 1. 在HTML标签中，加入 data-sw-translate="" 标记
 *      例如：<h6 data-sw-translate="">Hello World</h6>
 * 2. 然后在下面的 window.SwaggerTranslator.learn 中添加中英文对应关系
 *      添加： "Hello World": "你好，世界",
 */
window.SwaggerTranslator = {
    _words: [],
 
    translate: function () {
        var $this = this;
        $('[data-sw-translate]').each(function () {
            $(this).html($this._tryTranslate($(this).html()));
            $(this).val($this._tryTranslate($(this).val()));
            $(this).attr('title', $this._tryTranslate($(this).attr('title')));
        });
    },
 
    _tryTranslate: function (word) {
        return this._words[$.trim(word)] !== undefined ? this._words[$.trim(word)] : word;
    },
 
    learn: function (wordsMap) {
        this._words = wordsMap;
    }
};
 
 
/* jshint quotmark: double */
window.SwaggerTranslator.learn({
	"CoolApk ": "酷安",
    "Google Play": "谷歌市场",
	"ArisLauncher ": "Aris-终端桌面",
    "Themes": "终端桌面",
    "The Other Android Launcher": "极客范安卓桌面",
    "Download": "下载应用",
    "Instant": "简单快捷",
    "Find apps/contacts/shortcuts in terminal.": "在桌面直接进行查找联系人、拨号、计算、天气、手电筒等便捷功能。",
    "Notifiable": "一览无余",
    "Display your notification in terminal.": "将所有的APP通知消息都展现在桌面上，从这刻起解放状态栏吧。",
    "Customizable": "自由开放",
    "Set up your own Aris theme!": "支持自定义属于自己的主题、插件，打开开发者模式开始创作吧！"

});
 
 
$(function () {
    window.SwaggerTranslator.translate();
});