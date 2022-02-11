(function () {
  axios.defaults.baseURL = 'https://null.jsbin.com'
  axios.interceptors.response.use(
    response => {
      let { method, url } = response.config

      if(method == 'get' && url == '/book/count') {
        response.data = {
          name: 'JavaScript高级程序设计',
          count: 4,
          id: 1
        }
      }

      return response
    }
  )

  let data = {
    count: 0
  }

  axios.get('/book/count').then(({data}) => {
    let { name, count } = data
    let originalHtml = $('#app').html()
    let newHtml = originalHtml.replace('__bookName', name).replace('__count', count)
    $('#app').html(newHtml)
    data.count = count
  },(err) => {
    console.log(err)
  })

  $('#app').bind('click', '#addition', function (e) {
    if(e.target.id == 'addition') {
      data.count++
      $('#count').text(`所剩数量：${data.count}`)
    }
  })

  $('#app').bind('click', '#subtraction', function (e) {
    if(e.target.id == 'subtraction') {
      data.count--
      $('#count').text(`所剩数量：${data.count}`)
    }
  })

  $('#app').bind('click', '#clear', function (e) {
    if(e.target.id == 'clear') {
      data.count = 0
      $('#count').text(`所剩数量：${data.count}`)
    }
  })

})()