(function () {

  let data = {
    count: 0
  }
  let str = `<p id="content">书籍《__bookName》<span id="count">所剩数量：__count</span></p>`

  str = str.replace('__bookName', 'JavaScript高级程序设计').replace('__count', data.count)

  $('#box').prepend($(str))
  $('#addition').bind('click', function () {
    data.count++
    $('#count').text(`所剩数量：${data.count}`)
  })

  $('#subtraction').bind('click', function () {
    data.count--
    $('#count').text(`所剩数量：${data.count}`)
  })

  $('#clear').bind('click', function () {
    data.count = 0
    $('#count').text(`所剩数量：${data.count}`)
  })

})()