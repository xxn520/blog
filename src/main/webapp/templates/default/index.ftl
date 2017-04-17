<#assign contextPath="http://localhost:8080" />
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
    <link rel="stylesheet" href="${contextPath}/templates/default/static/assets/css/normalize.min.css">
    <link rel="stylesheet" type="text/css" href="${contextPath}/templates/default/static/assets/css/main.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="shortcut icon" href="${contextPath}/templates/default/static/assets/favicon.ico" type="image/x-icon">
    <title>博客</title>
</head>
<body>
    <!-- This script adds the Roboto font to our project. For more detail go to this site:  http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500 -->
    <script>
        var WebFontConfig = {
            google: { families: [ 'Roboto:400,300,500:latin' ] }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
                    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
    </script>
    <div id="app"></div>

    <script>
        window.__INITIAL_STATE__ = ${initialState}
    </script>
    <script src="${contextPath}/templates/default/static/dist/dllbundle/reactDllBundle.js"></script>
    <script src="${contextPath}/build/index.js"></script>
</body>
</html>