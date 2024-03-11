## ts类型
在`dayjs.Dayjs`里定义
```js
import dayjs from 'dayjs'
const currentDate: Ref<dayjs.Dayjs> = ref(dayjs())
```

## 自定义格式化

https://day.js.org/docs/zh-CN/parse/string-format
```js
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
dayjs.extend(customParseFormat)

dayjs('10:00:00', 'HH:mm:ss').format('HH:mm')//10:00
```


## 判断日期是否为有效格式的日期
```js
import customParseFormat from 'dayjs/plugin/customParseFormat'
// 自定义格式化插件
dayjs.extend(customParseFormat)

dayjs(startTime, 'YYYY-MM-DD HH:mm:ss', true).isValid()
```

## 将时间转换为 `刚刚`、`几秒前`、`几分钟前`、`几小时前`、`几天前`、`几月前`
```js
import dayjs from 'dayjs';

function timeAgo(date, format = null) {
    const now = dayjs();
    const ago = dayjs.unix(date);

    const diff = now.diff(ago, 'second');

    if (format) {
    return ago.format(format);
    }

    const units = [
    [60, '秒', 1],
    [60, '分钟', 60],
    [24, '小时', 3600],
    [7, '天', 86400],
    [30.44, '个月', 2592000], // Approximation for month length
    [12, '年', 31104000] // Approximation for year length
    ];

    for (const [interval, label, factor] of units) {
        if (diff < interval) {
            return Math.round(diff / factor) + label + '前';
        }
    }

    // If the difference is greater than a year, return formatted date
    return ago.format('YYYY-MM-DD');
} 
console.log(timeAgo(<your_timestamp>));//这样是不是更优雅一些
```

## 获取日期里相应的信息（年/月）

https://day.js.org/docs/zh-CN/get-set/get

```js
dayjs().get('year')
dayjs().get('month') // start 0
```
## 日期相关工具类

```js
/**
 * 日期相关工具类
 */

import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

// 设置星期一为一周的第一天
dayjs.extend(weekday)
dayjs.locale('zh-cn')
// 自定义格式化插件
dayjs.extend(customParseFormat)
// 计算间隔插件
dayjs.extend(duration)

/**
 * 去重日期
 * @param arr 数组
 * @returns 去重后的日期数组
 */
export function uniqueDate(arr) {
  const dateArr = arr.map(item => item.date)
  return [...new Set(dateArr)]
}

/**
 * 计算时间间隔
 * @param startTime (YYYY-MM-DD HH:mm:ss)
 * @param endTime (YYYY-MM-DD HH:mm:ss)
 * @returns `${hours}小时${minutes}分钟`
 */
export function calculateTimeInterval(startTime: string, endTime: string) {
  // 判断是否为有效日期
  if (!dayjs(startTime, 'YYYY-MM-DD HH:mm:ss', true).isValid() || !dayjs(endTime, 'YYYY-MM-DD HH:mm:ss', true).isValid())
    return `0分钟`

  const diff = dayjs(endTime).diff(dayjs(startTime))
  const duration = (dayjs as any).duration(diff)
  // 将间隔格式化为小时和分钟
  const hours = Math.floor(duration.asHours())
  const minutes = Math.floor((duration.asMinutes() % 60)) // 取余数得到分钟数
  return `${hours}小时${minutes}分钟`
}

/**
 * 根据日期返回日期的本周开始时间和结束时间（星期一为一周里的第一天）
 * @param date 日期：dayjs类型
 * @returns dayjs类型
 */
export function getStartAndEndOfWeek(date: dayjs.Dayjs) {
  const firstDayOfWeek = dayjs(date).startOf('week')
  const lastDayOfWeek = dayjs(date).endOf('week')
  return {
    firstDayOfWeek,
    lastDayOfWeek,
  }
}

/**
 * 根据日期返回这个日期的本月第一天和最后一天
 * @param date 日期：dayjs类型
 * @returns 'YYYY-MM-DD'格式
 */
export function getStartAndEndOfMonth(date: dayjs.Dayjs) {
  const firstDayOfMonth = dayjs(date).startOf('month').format('YYYY-MM-DD')
  const lastDayOfMonth = dayjs(date).endOf('month').format('YYYY-MM-DD')
  return {
    firstDayOfMonth,
    lastDayOfMonth,
  }
}

```

## 返回指定单位下两个日期时间之间的差异
```js
// 负数代表当前日期已经超过下班打卡时间
const pmDiff = dayjs(下班时间).diff(dayjs(), 'minute')
```

## 增加/减少时间
```js
//delta 1：增加，-1：减少
const newStartDate = dayjs(dateRange.value[0]).add(delta * 7, 'day')
const newStartDate = dayjs(dateRange.value[0]).add(delta * 1, 'month')
```