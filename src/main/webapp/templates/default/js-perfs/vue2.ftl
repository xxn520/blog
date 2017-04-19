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
    <link rel="stylesheet" href="${contextPath}/templates/default/static/assets/css/js-perfs.css">
    <link rel="shortcut icon" href="${contextPath}/templates/default/static/assets/favicon.ico" type="image/x-icon">
    <title>js-perfs - vue2</title>
</head>
<body>
<!-- DBMon -->
<div id="app">
    <table class="table table-striped lastest-data">
        <tbody>
        <tr v-for="db in databases" track-by="$index">
            <td class="dbname">{{db.dbname}}</td>
            <td class="query-count">
                <span class="{{db.lastSample.countClassName}}">{{db.lastSample.nbQueries}}</span>
            </td>
            <td v-for="q in db.lastSample.topFiveQueries" track-by="$index" class="Query {{q.elapsedClassName}}">
                {{q.formatElapsed}}
                <div class="popover left">
                    <div class="popover-content">{{q.query}}</div>
                    <div class="arrow"></div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<script src="//cdn.bootcss.com/vue/2.2.6/vue.min.js"></script>
<script src="${contextPath}/templates/default/static/dist/dllbundle/reactDllBundle.js"></script>
<script src="${contextPath}/build/jsPerfsVue.js"></script>
</body>
</html>