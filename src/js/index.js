/*
*
* 意大利面条式代码
*
*/
(function () {

  fakeData()

  function Model(options) {
    this.data = options.data
    this.resource = options.resource
  }
  Model.prototype.fetch = function (id) {
    return axios.get(`/${this.resource}/${id}`).then((response) => {
      this.data = response.data

      return response
    })
  }

  Model.prototype.update = function (id, newNumber) {
    return axios.get(`/${this.resource}/${id}?number=${newNumber}`).then((response) => {
      this.data = response.data

      return response
    })
  }

  let model = new Model({
    data: {
      name: '',
      count: 0,
      id: ''
    },
    resource: 'book'
  })

  function View(el, template) {
    this.el = el
    this.template = template
  }

  View.prototype.render = function (data) {
    // prototype方法不能修改私有属性
    // for (var key in data) {
    //   this.template = this.template.replace(`__${key}`, data[key])
    // }
    // $(this.el).html(this.template)
    let html = this.template
    for (var key in data) {
      html = html.replace(`__${key}`, data[key])
    }
    $(this.el).html(html)
  }

  let view = new View('#app', `
    <p id="content">书籍《__name》<span id="count">所剩数量：__count</span></p>
    <div>
      <button id="addition">加1</button>
      <button id="subtraction">减1</button>
      <button id="clear">清0</button>
    </div>
  `)

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
    additionFun(e) {
      if (e.target.id == 'addition') {
        let newNumber = model.data.count - 0 + 1
        console.log(newNumber)
        model.update(`count2`, newNumber).then(({ data }) => {
          // 或者model.data
          this.view.render(data)
        })

      }
    },
    subtractionFun(e) {
      if (e.target.id == 'subtraction') {
        let newNumber = model.data.count - 0 - 1
        model.update(`count2`, newNumber).then(({ data }) => {
          // 或者model.data
          this.view.render(data)
        })
      }
    },
    clearFun(e) {
      if (e.target.id == 'clear') {
        model.update(`count2`, 0).then(({ data }) => {
          // 或者model.data
          this.view.render(data)
        })
      }
    },
    bindEvents() {
      $(this.view.el).bind('click', '#addition', (e) => this.additionFun(e))

      $(this.view.el).bind('click', '#subtraction', (e) => this.subtractionFun(e))

      $(this.view.el).bind('click', '#clear', (e) => this.clearFun(e))
    }
  }

  controller.init({ model, view })






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