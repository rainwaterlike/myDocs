# dayjs

## 自定义格式化类型

[文档](https://day.js.org/docs/zh-CN/parse/string-format)

```js
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
dayjs.extend(customParseFormat)

dayjs('10:00:00', 'HH:mm:ss').format('HH:mm') //10:00
```

## dayjs计算间隔时间

```js
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

/** 计算时间间隔 */
function calculateTimeInterval(startTime: string, endTime: string) {
  if (!dayjs(startTime, 'YYYY-MM-DD HH:mm:ss', true).isValid() || !dayjs(endTime, 'YYYY-MM-DD HH:mm:ss', true).isValid())
    return `0分钟`

  const diff = dayjs(endTime).diff(dayjs(startTime))
  const duration = (dayjs as any).duration(diff)
  // 将间隔格式化为小时和分钟
  const hours = Math.floor(duration.asHours())
  const minutes = Math.floor((duration.asMinutes() % 60)) // 取余数得到分钟数
  return `${hours}小时${minutes}分钟`
}
```

## dayjs 判断日期是否为有效格式的日期

```js
import customParseFormat from 'dayjs/plugin/customParseFormat'
// 自定义格式化插件
dayjs.extend(customParseFormat)

dayjs(startTime, 'YYYY-MM-DD HH:mm:ss', true).isValid()
```

## 将时间转换为 `刚刚` 、 `几秒前` 、 `几分钟前` 、 `几小时前` 、 `几天前` 、几月前

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
console.log(timeAgo( < your_timestamp > ));
```
