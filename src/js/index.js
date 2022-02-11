/*
*
* 意大利面条式代码
*
*/
(function () {

  fakeData()


  let model = {
    data: {
      name: '',
      count: 0,
      id: ''
    },
    fetch(id) {
      return axios.get(`/book/${id}`).then((response) => {
        this.data = response.data

        return response
      })
    },
    update(id,newNumber) {
      return axios.get(`/book/${id}?number=${newNumber}`).then((response) => {
        this.data = response.data

        return response
      })
    }
  }

  model.fetch('count').then(({ data }) => {
    let { name, count } = data
    let originalHtml = $('#app').html()
    let newHtml = originalHtml.replace('__bookName', name).replace('__count', count)
    $('#app').html(newHtml)
  }, (err) => {
    console.log(err)
  })

  $('#app').bind('click', '#addition', function (e) {
    if (e.target.id == 'addition') {
      let newNumber = model.data.count - 0 + 1
      console.log(newNumber)
      model.update(`count2`, newNumber).then(({ data }) => {
        let { count } = data
        $('#count').text(`所剩数量：${count}`)
      })

    }
  })

  $('#app').bind('click', '#subtraction', function (e) {
    if (e.target.id == 'subtraction') {
      let newNumber = model.data.count - 0 - 1
      model.update(`count2`, newNumber).then(({ data }) => {
        let { count } = data
        $('#count').text(`所剩数量：${count}`)
      })
    }
  })

  $('#app').bind('click', '#clear', function (e) {
    if (e.target.id == 'clear') {
      model.update(`count2`, 0).then(({ data }) => {
        let { count } = data
        $('#count').text(`所剩数量：${count}`)
      })
    }
  })



  // Mock数据

  function fakeData() {
    let initialData = {
      name: 'JavaScript高级程序设计',
      count: 4,
      id: 1
    }
    axios.defaults.baseURL = 'https://null.jsbin.com'
    axios.interceptors.response.use(
      response => {
        let { method, url } = response.config

        if (method == 'get' && url == '/book/count') {
          response.data = initialData
        }
        if (method == 'get' && url.indexOf('/book/count2') >= 0) {

          response.data = Object.assign(initialData, { count: getQueryVariable(url) })
          console.log(Object.assign(initialData, { count: getQueryVariable(url) }))

        }

        return response
      }
    )
  }

  function getQueryVariable(url) {
    let res = url.split("?")[1].split('=')[1];

    return res;
  }

})()