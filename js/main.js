let data = {
  dataCache: {},
  counts: {},
  year: '2017',
  isPressed: false,
  degree: 0,
  active: -1
}

let app = new Vue({
  el: '#wheel',
  data: data,
  beforeMount() {
    this.getData()
  },
  methods: {
    getData() {
      var vm = this
      axios
        .get('./data.json')
        .then(function(res) {
          const keys = Object.keys(res.data)
          keys.forEach(item => {
            vm.$set(vm.dataCache, item, res.data[item])
          })
          const thisYear = vm.dataCache[2018]
          for (let i = 0; i < thisYear.length; i++) {
            const keys = Object.keys(thisYear[i])
            if (keys.indexOf('start') !== -1 && keys.indexOf('end') !== -1) {
              const start = thisYear[i].start
              const end = thisYear[i].end
              const count = thisYear[i].count
              let cache = []
              for (let j = start; j <= end; j++) {
                cache.push({
                  num: j,
                  count: count
                })
              }
              thisYear.splice(i + 1, 0, ...cache)
              thisYear.splice(i, 1)
            }
          }
          console.log(res.data)
        })
        .catch(function(err) {
          const { status, statusText } = error.response
          console.log(`Error! HTTP Status: ${status} ${statusText}`)
        })
    },
    transformHandler(index) {
      let len = this.dataCache[this.year].length
      let rotate = 360 / len
      let rotateFrom = -rotate / 2
      let skewY = rotate - 90
      if (index === 0) {
        // console.log(
        //   '數量：' + len,
        //   '開始角度：' + rotateFrom,
        //   '旋轉角度：' + rotate,
        //   '頃斜角度：' + skewY
        // )
      }
      return `rotate(${rotateFrom + index * rotate}deg) skewY(${skewY}deg)`
    },
    generateContent() {
      return this.dataCache[this.year]
    },
    generateIndex(data) {
      let indexArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].count !== 0) indexArray.push(i)
      }
      return indexArray
    },
    textOrNumber(item, location) {
      if (location === 'prize') {
        return this.year === '2017' ? item.text : item.num
      }
      if (location === 'well-done') {
        return this.year === '2017'
          ? this.dataCache[this.year][this.active].text
          : this.dataCache[this.year][this.active].num
      }
    },
    changeYear() {
      if (this.isPressed) return
      this.year === '2017' ? (this.year = '2018') : (this.year = '2017')
      this.degree += 360 - (this.degree % 360)
      this.active = -1
    },
    getRandomNumber(data) {
      const index = this.generateIndex(data)
      let num = Math.floor(Math.random() * index.length)
      return index[num]
    },
    pressHandler() {
      if (this.isPressed) return
      this.active = -1
      let data = this.dataCache[this.year]
      let index = this.getRandomNumber(data)
      if (index == undefined) return
      this.isPressed = true
      let circle = 6
      let len = data.length
      let rotate = circle * 360 + index * (360 / len)
      this.degree += rotate - (this.degree % 360)
      setTimeout(() => {
        this.active = index
        if (data[index].count > 0) {
          data[index].count -= 1
        }
        console.log(
          this.year + '年，獎項：' + (index + 1),
          '剩餘：' + data[index].count + '個'
        )
        this.isPressed = false
      }, 6000)
    },
    rotateHandler() {
      return `rotate(${this.degree}deg)`
    },
    restart() {
      this.getData()
    }
  }
})
