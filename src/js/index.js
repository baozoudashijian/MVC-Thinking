(function () {
  let initialData = {
    name: 'JavaScript高级程序设计',
    count: 4,
    id: 1
  }
  axios.defaults.baseURL = 'https://null.jsbin.com'
  axios.interceptors.response.use(
    response => {
      let { method, url } = response.config

      if(method == 'get' && url == '/book/count') {
        response.data = initialData
      }
      if(method == 'get' && url.indexOf('/book/count2') >= 0) {
        
        response.data = Object.assign(initialData, {count: getQueryVariable(url)})
        console.log(Object.assign(initialData, {count: getQueryVariable(url)}))

      }

      return response
    }
  )

  let state = {
    count: 0
  }

  axios.get('/book/count').then(({data}) => {
    let { name, count } = data
    let originalHtml = $('#app').html()
    let newHtml = originalHtml.replace('__bookName', name).replace('__count', count)
    $('#app').html(newHtml)
    state.count = count
  },(err) => {
    console.log(err)
  })

  $('#app').bind('click', '#addition', function (e) {
    if(e.target.id == 'addition') {
      let newNumber = state.count - 0 + 1
      axios.get(`/book/count2?number=${newNumber}`).then(({data}) => {
        let { count } = data
        state.count = count
        $('#count').text(`所剩数量：${data.count}`)
      })
      
    }
  })

  $('#app').bind('click', '#subtraction', function (e) {
    if(e.target.id == 'subtraction') {
      console.log(123)
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

  function getQueryVariable(url){
    let res = url.split("?")[1].split('=')[1];

    return res;
}

})()