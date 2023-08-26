# Day.js常用方法

## 1、转时间戳

> 可将`YYYY-MM-DD hh:mm:ss`转换成时间戳，不传则为当前

```js
//秒
dayjs().unix();
//毫秒
dayjs(time).valueOf();
```

## 2、转Date类型

> 可将`YYYY-MM-DD hh:mm:ss`转换成`Date`类型，不传则为当前

```js
dayjs(time).toDate();
```

## 3、格式化

```js
dayjs(time).format("YYYY.MM.DD hh:mm:ss");
```

## 4、获取多久之前

```js
dayjs().from(oldTime);
```

## 5、计算时间差

> 可计算已过去时和倒计时

```js
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const startTime = dayjs("2023-07-01");
const endTime = dayjs("2023-08-01");

const diff = endTime.diff(startTime);
const time = dayjs.duration(diff);

console.log(time.years()); // 输出：0
console.log(time.months()); // 输出：1
console.log(time.days()); // 输出：0
console.log(time.hours()); // 输出：0
console.log(time.minutes()); // 输出：0
console.log(time.seconds()); // 输出：0
```

## 6、秒数格式化

```js
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(utc);

const seconds = 3699;
const time = dayjs.duration(seconds, "seconds");
const formattedTime = dayjs.utc(time.asMilliseconds()).format("HH:mm:ss");

console.log(formattedTime); //01:01:39
```

