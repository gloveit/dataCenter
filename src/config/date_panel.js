import _ from 'lodash'
import moment from 'moment'
export function DatePanel () {
  let data = [
    '2019-05-01 17:00:00',
    '2019-05-12 17:00:00',
    '2019-05-13 17:00:00',
    '2019-05-14 17:00:00',
    '2019-05-15 17:00:00',
    '2019-05-16 17:00:00',
    '2019-05-17 17:00:00',
    '2019-05-18 17:00:00',
    '2019-02-15 17:00:00',
    '2019-01-16 17:00:00',
    '2019-12-17 17:00:00',
    '2019-11-18 17:00:00'
  ]
  let dateJson = {
    '01': {
      title: '一月',
      list: [],
      key: '00001'
    },
    '02': {
      title: '二月',
      list: [],
      key: '00002'
    },
    '03': {
      title: '三月',
      list: [],
      key: '00003'
    },
    '04': {
      title: '四月',
      list: [],
      key: '00004'
    },
    '05': {
      title: '五月',
      list: [],
      key: '00005'
    },
    '06': {
      title: '六月',
      list: [],
      key: '00006'
    },
    '07': {
      title: '七月',
      list: [],
      key: '00007'
    },
    '08': {
      title: '八月',
      list: [],
      key: '00008'
    },
    '09': {
      title: '九月',
      list: [],
      key: '00009'
    },
    '10': {
      title: '十月',
      list: [],
      key: '00010'
    },
    '11': {
      title: '十一月',
      list: [],
      key: '00011'
    },
    '12': {
      title: '十二月',
      list: [],
      key: '00012'
    }
  }
  let _date = _.cloneDeep(data)

  _date
    .map(item => {
      return item.slice(5, 10)
    })
    .forEach(item => {
      if (dateJson[item.slice(0, 2)].title) {
        dateJson[item.slice(0, 2)].list.push(item.slice(3, 5))
      }
    })
  let newData = []
  for (let item in dateJson) {
    if (dateJson[item].list.length > 0) {
      newData.push(dateJson[item])
    }
  }
  return _.sortBy(newData, function (item) {
    return item.key
  })
}
