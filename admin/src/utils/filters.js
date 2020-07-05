/***---------------全局过滤器--------------***/
// import moment from 'moment'
export default {
  install(vue) {
    // 格式化日期
    vue.filter('formatDate', function (value, fmt = 'YYYY-MM-DD HH:mm:ss') {
      if (value) {
        value = Number(value)
        return moment(value).format(fmt)

      } else {
        return ''
      }
    });
    // 计算未跟进天数
    vue.filter('followDay', function (row) {
      let {
        followInfo,
        createdAt
      } = row
      let startTime
      followInfo = followInfo || []
      if (followInfo[0]) {
        startTime = followInfo[0].followTime
      } else {
        startTime = createdAt
      }
      let endTime = new Date()
      let days = (endTime - startTime) / 24 / 3600 / 1000
      days = Math.max(days, 0)
      return parseInt(days)
    });
  }
}