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


  new Vue({
    el: '#app',
    template: `
      <div>
        <p id="content">书籍《{{book.name}}》<span id="count">所剩数量：{{book.count}}</span></p>
        <div>
          <button @click="additionFun">加1</button>
          <button @click="subtractionFun">减1</button>
          <button @click="clearFun">清0</button>
        </div>
      </div>
    `,
    data: {
      book: {
        name: '',
        count: 0,
        id: ''
      }
    },
    methods: {
      additionFun() {
        let newNumber = this.book.count - 0 + 1
        model.update(`count2`, newNumber).then(({ data }) => {
          this.book = data
        })
      },
      subtractionFun(e) {
        let newNumber = this.book.count - 0 - 1
        model.update(`count2`, newNumber).then(({ data }) => {
          this.book = data
        })
      },
      clearFun(e) {
        model.update(`count2`, 0).then(({ data }) => {
          this.book = data
        })
      }
    },
    mounted() {
      model.fetch('count').then(({ data }) => {
        this.book = data
      }, (err) => {
        console.log(err)
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

}) ()