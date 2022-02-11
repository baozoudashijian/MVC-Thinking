(function() {

let str = `<p id="content">书籍《__bookName》<span id="count">所剩数量：__count</span></p>`

str = str.replace('__bookName', 'JavaScript高级程序设计').replace('__count', '0')

$('#box').prepend($(str))

})()