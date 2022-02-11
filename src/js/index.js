(function () {

  axios.interceptors.response.use(
    response => {
      console.log(response)

      return response
    }
  )

  let data = {
    count: 0
  }
  let str = `<p id="content">书籍《__bookName》<span id="count">所剩数量：__count</span></p>`

  str = str.replace('__bookName', 'JavaScript高级程序设计').replace('__count', data.count)

  axios.get('/book/count').then(({data}) => {
    console.log(data);
  },(err) => {
    console.log(err)
  })

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