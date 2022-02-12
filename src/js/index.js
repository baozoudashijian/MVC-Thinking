/*
*
* 意大利面条式代码
*
*/
(function () {

  fakeData()

  function Model(options) {
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
    resource: 'book'
  })


  let view = new Vue({
    el: '#app',
    template: `
      <div>
        <p id="content">书籍《{{name}}》<span id="count">所剩数量：{{count}}</span></p>
        <div>
          <button @click="additionFun" id="addition">加1</button>
          <button @click="subtractionFun" id="subtraction">减1</button>
          <button @click="clearFun" id="clear">清0</button>
        </div>
      </div>
    `,
    data: {
      name: '',
      count: 0,
      id: ''
    },
    methods: {
      additionFun() {
        console.log(123)
        let newNumber = this.count - 0 + 1
        console.log(newNumber)
        model.update(`count2`, newNumber).then(({ data }) => {
          let { name, count, id } = data
          this.name = name
          this.count = count
          this.id = id
        })
      },
      subtractionFun(e) {
        let newNumber = this.count - 0 - 1
        model.update(`count2`, newNumber).then(({ data }) => {
          let { name, count, id } = data
          this.name = name
          this.count = count
          this.id = id
        })
      },
      clearFun(e) {
        model.update(`count2`, 0).then(({ data }) => {
          let { name, count, id } = data
          this.name = name
          this.count = count
          this.id = id
        })
      }
    }
  })

  let controller = {
    init(options) {
      let { view, model } = options
      this.view = view
      this.model = model
      this.model.fetch('count').then(({ data }) => {
        let { name, count, id } = data
        this.view.name = name
        this.view.count = count
        this.view.id = id
      }, (err) => {
        console.log(err)
      })
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

}) ()