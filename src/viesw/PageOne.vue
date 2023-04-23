<template>
  <div>当前城市：{{ currentCity.city }}</div>
</template>

<script>
var geolocation = new qq.maps.Geolocation("PO2BZ-6RRWG-CVXQJ-QE7RK-FTYG3-QAFCX", "myapp");
var options = { timeout: 8000 };
export default {
  data () {
    return {
      currentCity: '',
      KEY: 'PO2BZ-6RRWG-CVXQJ-QE7RK-FTYG3-QAFCX'
    }
  },
  mounted () {
    geolocation.getLocation(this.showPosition)
  },
  methods: {
    showPosition (position) {
      this.currentCity = position
      console.log(position);
    }

  }
}
</script>


