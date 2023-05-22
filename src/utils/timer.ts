import { changeTime } from './tools'
/** 倒计时数据对象 */
type Countdown = {
  /** 上一次执行的时时间戳 */
  lastTimestamp: number
  /** 倒计时对象的id */
  id: number
  /** 剩余的倒计时（单位：毫秒） */
  countdown: number
  /** 时间改变后的回调函数，因为倒计时是每秒改变，所以暂时是每秒执行一次
   * @param i 剩余的时间
   * @param t 处理后的倒计时显示格式
   */
  callback: (i: number, t: IChangeTime) => void
  /** 倒计时结束回调 */
  overCallBack?: () => void
  interval?: 1000
}

interface IChangeTime {
  d: number
  h: number | string
  m: number | string
  s: number | string
}

/** 倒计时对象索引 */
let CountdownIndex = 0
const CountdownMap: Record<number, Countdown> = {}
let interval: number | null = null

function startTimer() {
  // console.log('startTimer...');
  if (Object.keys(CountdownMap).length > 0) {
    if (interval) {
      return
    }
    interval = setInterval(() => {
      const now = new Date().getTime()

      for (const key in CountdownMap) {
        const element = CountdownMap[key]
        const reduceTime = now - element.lastTimestamp
        // console.log('reduceTime', reduceTime);
        const remainingTime = element.countdown - reduceTime
        let changeTimeNew: IChangeTime = {
          d: 0,
          h: '00',
          m: '00',
          s: '00'
        }
        if (remainingTime) {
          changeTimeNew = changeTime(remainingTime)
        } else {
          delete CountdownMap[element.id]
        }
        element.lastTimestamp = now
        element.countdown = remainingTime
        element.callback(remainingTime, changeTimeNew)
      }
    }, 1000)
  } else if (interval) {
    clearInterval(interval)
    interval = null
  }
}

/**
 * 注册一个倒计时，每秒会触发一次回调，方便UI更新显示
 * @param countdown 倒计时的时间
 * @param callback 回调函数，时间改变了，需要刷新显示 i为剩余时间，t为处理后的倒计时显示格式
 * @returns 返回一个索引，用于移除倒计时。返回值为0代表倒计时已经结束。
 *
 */
function addCountdown(countdown: number, callback: (i: number, t: IChangeTime) => void): number {
  if (countdown > 0) {
    CountdownIndex += 1
    CountdownMap[CountdownIndex] = {
      lastTimestamp: new Date().getTime(),
      id: CountdownIndex,
      countdown,
      callback
    }
    callback(countdown, changeTime(countdown))
    startTimer()
    return CountdownIndex
  }
  return 0
}

/**
 * 移除一个倒计时
 * @param id id为注册时返回的，用于删除指定的倒计时
 */
function removeCountdown(id: number) {
  if (id) {
    delete CountdownMap[id]
  }
}

export { addCountdown, removeCountdown }
