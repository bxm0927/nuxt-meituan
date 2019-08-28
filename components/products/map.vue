<template>
  <div
    :id="id"
    :style="{ width : width + 'px', height : height + 'px', margin: '34px auto'}"
    class="m-map"
  />
</template>

<script>
// 高德开放平台 https://lbs.amap.com/
export default {
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    point: {
      type: Array,
      default() {
        return [116.46, 39.92]
      },
    },
  },
  data() {
    return {
      // map,
      // marker,
      // id: `map`,
      key: '0dbc0dfd7c775f2a927174493eab8220',
    }
  },
  computed: {
    id() {
      return `map${Math.random()
        .toString()
        .slice(4, 6)}`
    },
    mapStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        margin: '34px auto',
      }
    },
  },
  watch: {
    point(val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    },
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const url = `https://webapi.amap.com/maps?v=1.4.10&key=${this.key}&callback=onmaploaded`
      const jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url
      document.head.appendChild(jsapi)

      // jsonp callback
      window.onmaploaded = () => {
        const map = new window.AMap.Map(this.id, {
          resizeEnable: true,
          zoom: 11,
          center: this.point,
        })
        this.map = map
        window.AMap.plugin('AMap.ToolBar', () => {
          const toolbar = new window.AMap.ToolBar()
          map.addControl(toolbar)
          const marker = new window.AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: this.point,
          })
          this.marker = marker
          marker.setMap(map)
        })
      }
    },
  },
}
</script>
