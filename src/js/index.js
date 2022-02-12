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
    update(id, newNumber) {
      return axios.get(`/book/${id}?number=${newNumber}`).then((response) => {
        this.data = response.data

        return response
      })
    }
  }

  let view = {
    el: '#app',
    template: `
    <p id="content">书籍《__bookName》<span id="count">所剩数量：__count</span></p>
    <div>
      <button id="addition">加1</button>
      <button id="subtraction">减1</button>
      <button id="clear">清0</button>
    </div>
    `,
    render(data) {
      let html = this.template.replace('__bookName', data.name).replace('__count', data.count)
      $(this.el).html(html)
    }
  }

  let controller = {
    init(options) {
      let { view, model } = options
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      this.bindEvents()
      this.model.fetch('count').then(({ data }) => {
        this.view.render(data)
      }, (err) => {
        console.log(err)
      })
    },
    bindEvents() {
      $(this.view.el).bind('click', '#addition', function (e) {
        if (e.target.id == 'addition') {
          let newNumber = model.data.count - 0 + 1
          console.log(newNumber)
          model.update(`count2`, newNumber).then(({ data }) => {
            // 或者model.data
            view.render(data)
          })

        }
      })

      $(this.view.el).bind('click', '#subtraction', function (e) {
        if (e.target.id == 'subtraction') {
          let newNumber = model.data.count - 0 - 1
          model.update(`count2`, newNumber).then(({ data }) => {
            // 或者model.data
            view.render(data)
          })
        }
      })

      $(this.view.el).bind('click', '#clear', function (e) {
        if (e.target.id == 'clear') {
          model.update(`count2`, 0).then(({ data }) => {
            // 或者model.data
            view.render(data)
          })
        }
      })
    }
  }

  controller.init({model, view})






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