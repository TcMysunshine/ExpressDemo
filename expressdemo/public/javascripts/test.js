window.onload = function () {
    if (!!window.EventSource) {
        // alert('建立连接')
        var source = new EventSource('/bili/stream')
        // 收到数据就会触发messag事件
        source.addEventListener('message', function (event) {
            alert('message')
            var data = event.data
            var origin = event.origin
            console.log(data)

        }, false)
        // open事件 建立连接触发事件
        source.addEventListener('open', function (event) {
            alert('连接建立')
        }, false)
        // 发生error 触发事件
        source.addEventListener('error', function (event) {
            alert('发生error')
        }, false)
        //关闭事件
        source.close()
    }
}