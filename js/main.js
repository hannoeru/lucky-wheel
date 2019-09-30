let data = {
  contents: [
    {
      icon: 'movie_filter',
      text: 'Movie'
    },
    {
      icon: 'cake',
      text: 'Wish'
    },
    {
      icon: 'stars',
      text: 'Anything'
    },
    {
      icon: 'child_care',
      text: 'Child'
    },
    {
      icon: 'flight',
      text: 'Flight'
    },
    {
      icon: 'wifi',
      text: 'Wifi'
    }
  ],
  year: '2017'
}

let app = new Vue({
  el: '#wheel',
  data: data,
  methods: {
    transformHandler(index) {
      let rotateFrom = this.year === '2017' ? -30 : 0
      let rotate = this.year === '2017' ? 60 : 18
      let skewY = this.year === '2017' ? -30 : -72
      return `rotate(${rotateFrom + index * rotate}deg) skewY(${skewY}deg)`
    },
    generateContent() {
      if (this.year === '2017') {
        return this.contents
      }
      if (this.year === '2018') {
        let content = []
        for (let i = 0; i < 20; i++) {
          content.push(i)
        }
        return content
      }
    },
    checkYear() {
      return this.year === '2017' ? true : false
    },
    changeYear() {
      this.year === '2017' ? (this.year = '2018') : (this.year = '2017')
    }
  }
})
