## FullCalendar实战使用(vue3 + ts)

### 需求背景

要求：

1、日历可以单击选择日期，也可以按住左键拖动选择多个日期，像windows按住左键多选文件夹一样；

2、顶部标题需要左右切换月份，中间显示日期，格式 `YYYY年M月` ，右侧可以选择月份；

3、左侧是日历，选择日期后在右侧提交表单，提交后在对应的日期上显示内容，点击日期上的内容则删除该日期的内容。

项目使用的是 `antd vue` 组件库，日历组件不满足第一点要求，寻找了一遍后发现[fullcalendar](https://fullcalendar.io)这个库刚好符合要求

### 介绍

FullCalendar，当下最受欢迎的全尺寸JavaScript日历
FullCalendar的三大特点：

强大轻巧：拥有100多种可自定义的设置。作为单独的模块构建，以减小文件大小。

开发人员友好：支持React、Vue、Angular三大主流框架

开源：所有代码都在GitHub上开源，但是也有一个非免费的“高级”版本

[文档地址](https://fullcalendar.io/docs#toc)

### 一、安装

```sh
pnpm add @fullcalendar/vue3 @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction
```

### 二、实现需求

#### 1、日历可以单击选择日期，也可以按住左键拖动选择多个日期，像windows按住左键多选文件夹一样；

引入 `interaction` 插件后日历就可以选择了

```vue
<template>
  <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />
</template>
```

```ts
<script lang="ts" setup>
import { Ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid'; // 日历展示方式：月
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { CalendarOptions } from '@fullcalendar/core'; //类型定义
const calendarOptions: Ref<CalendarOptions> = ref({
  plugins: [interactionPlugin, dayGridPlugin],//加载插件
  initialView: 'dayGridMonth', // 日历展示方式：月， 依赖`dayGridPlugin`插件
  selectable: true, // 表格可选择，依赖 `interactionPlugin` 插件
})
<script>
```

#### 2、顶部标题需要左右切换月份，中间显示日期，格式 `YYYY年M月` ，右侧可以选择月份；

* 显示日期

看文档没有看到头部插槽，直接隐藏日历头部，自己写

```js
import {
  CalendarOptions
} from '@fullcalendar/core'; //类型定义

const calendarOptions: Ref < CalendarOptions > = ref({
  ...
  headerToolbar: false
})
```

* 左右切换月份

`getApi` 可以获取 `FullCalendar` 里面的方法
  

```js
import {
  CalendarApi
} from '@fullcalendar/core'; //类型定义

/** 日历ref */
const fullCalendarRef = ref(null);
/** 日历的api */
let fullcalendarApi = ref < CalendarApi > ();
onMounted(() => {
  fullcalendarApi.value = Object.getOwnPropertyDescriptor(
    fullCalendarRef.value,
    'getApi',
  )?.value();
});
//上个月
fullcalendarApi.value?.prev();
//下个月
fullcalendarApi.value?.next();
```

* 右侧可以选择月份
项目用的 `antd vue` 组件库， `picker` 属性为 `month` 即可选择月份

```vue
<template>
  <a-date-picker picker="month" @change="handleMonthChange"/>
</template>
```

`gotoDate` 即可切换日历的月份

```ts
/** 选择月份change事件 */
const handleMonthChange = (date) => {
  if (!date) return;
  fullcalendarApi.value?.gotoDate(dayjs(date).format('YYYY-MM-DD'));
};
```

#### 3、左侧是日历，选择日期后在右侧提交表单，提交后在对应的日期上显示内容，点击日期上的内容则删除该日期的内容。

`events` 是响应式数据，不需要调用更新视图的方法，直接修改 `events` 就能在日历上进行更新了

```js
import {
  Modal
} from 'ant-design-vue';

const eventsArr: Ref < any[] > = ref([{
    id: '1',
    title: '周末双休',
    start: '2024-03-18',
    end: '2024-03-18',
  },
  {
    id: '2',
    title: '周末双休',
    start: '2024-03-20',
    end: '2024-03-20',
  },
]);
// https://fullcalendar.io/docs#toc
const calendarOptions: Ref < CalendarOptions > = ref({
  plugins: [interactionPlugin],
  initialView: 'dayGridMonth',
  selectable: true, // 表格可选择，依赖 `interactionPlugin` 插件
  /** 事件（在日历上做标记） */
  events: eventsArr.value,
  /** 事件点击（删除节假日） */
  eventClick: clickCalendar
})
/** 日历点击事件 */
function clickCalendar(value) {
  console.log('🚀 ~ eventClick::', value);
  console.log('🚀 ~ eventClick:startStr', value.event.startStr);
  Modal.confirm({
    title: '是否删除当前节假日',
    content: `${value.event.startStr}   ${value.event.title}`,
    okText: '删除节假日',
    onOk() {
      const index = eventsArr.value.findIndex((item) => item.id === value.event.id);
      eventsArr.value.splice(index, 1);
    },
    onCancel() {},
  });
}
/** 表单提交 */
const onFinish = (values: any) => {
  console.log('Success:', values);
  eventsArr.value.push({
    id: Date.now(),
    title: values.holidayName,
    start: dayjs(values.dateTime[0]).format('YYYY-MM-DD'),
    end: dayjs(values.dateTime[1]).format('YYYY-MM-DD'),
  });
};
```

### 最后实现的效果图

![QQ202438-123620.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6928d29fe3b248c99f615e41c96f32f3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1716&h=792&s=1797432&e=gif&f=381&b=faf9f6)

### 完整代码

```ts
<template>
    <div class="lg:flex p4">
      <!-- 左侧日历 -->
      <div class="lg:w900px">
        <div class="flex justify-between items-center mb1">
          <div>
            <a-space>
              <a-button type="primary" @click="prevMonth">
                <template #icon><left-outlined /></template>
              </a-button>
              <a-button type="primary" @click="nextMonth">
                <template #icon><right-outlined /></template>
              </a-button>
            </a-space>
          </div>
          <h3>{{ calendarTitle }}</h3>
          <div>
            <a-date-picker v-model:value="monthPicker" picker="month" @change="handleMonthChange" />
          </div>
        </div>
        <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />
      </div>
      <!-- 右侧表单 -->
      <div class="flex-auto <lg:mt1">
        <a-form
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finish-failed="onFinishFailed"
        >
          <a-form-item
            label="节假日名称"
            name="holidayName"
            :rules="[{ required: true, message: '请输入节假日名称' }]"
          >
            <a-input v-model:value="formState.holidayName" />
          </a-form-item>

          <a-form-item
            label="时间段"
            name="dateTime"
            :rules="[{ required: true, message: '请选择时间段' }]"
          >
            <a-range-picker v-model:value="formState.dateTime" disabled />
          </a-form-item>
          <a-form-item label="间隔天数" name="interval">
            <a-input v-model:value="formState.interval" disabled />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-space wrap>
              <a-button type="primary" html-type="submit">提交</a-button>
              <a-button @click="resetForm">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </div>
</template>
```

```ts
<script lang="ts" setup>
  import { Ref, onMounted, reactive, ref } from 'vue';
  import dayjs from 'dayjs';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import duration from 'dayjs/plugin/duration';
  import { Modal } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue';
  import { PageWrapper } from '@/components/Page';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid'; // 日历展示方式：月
  import interactionPlugin from '@fullcalendar/interaction'; // for selectable
  import { CalendarOptions, CalendarApi } from '@fullcalendar/core'; //类型定义
  // 自定义格式化插件
  dayjs.extend(customParseFormat);
  // 计算间隔插件
  dayjs.extend(duration);
  /** 日历ref */
  const fullCalendarRef = ref(null);
  /** 日历的api */
  let fullcalendarApi = ref<CalendarApi>();
  onMounted(() => {
    /**getApi可以获取日历里的方法 */
    fullcalendarApi.value = Object.getOwnPropertyDescriptor(
      fullCalendarRef.value,
      'getApi',
    )?.value();
  });
  interface FormState {
    holidayName: string;
    /** 时间段 */
    dateTime: any[];
    /** 间隔日期 */
    interval?: string;
  }

  const formState = reactive<FormState>({
    holidayName: '',
    dateTime: [],
    interval: '',
  });

  const formRef = ref<FormInstance>();
  /** 表单提交 */
  const onFinish = (values: any) => {
    console.log('Success:', values);
    eventsArr.value.push({
      id: Date.now(),
      title: values.holidayName,
      start: dayjs(values.dateTime[0]).format('YYYY-MM-DD'),
      end: dayjs(values.dateTime[1]).format('YYYY-MM-DD'),
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const resetForm = () => {
    formRef.value?.resetFields();
  };
  const weekObj = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' };
  const eventsArr: Ref<any[]> = ref([
    {
      id: '1',
      title: '周末双休',
      start: '2024-03-18',
      end: '2024-03-18',
    },
    {
      id: '2',
      title: '周末双休',
      start: '2024-03-20',
      end: '2024-03-20',
    },
  ]);
  // https://fullcalendar.io/docs#toc
  const calendarOptions: Ref<CalendarOptions> = ref({
    plugins: [interactionPlugin, dayGridPlugin], //加载插件
    initialView: 'dayGridMonth', // 日历展示方式：月， 依赖`dayGridPlugin`插件
    selectable: true, // 表格可选择，依赖 `interactionPlugin` 插件
    handleWindowResize: true, // 是否随浏览器窗口大小变化而自动变化。
    // 星期映射为中文
    dayHeaderContent: function (arg) {
      return weekObj[arg.dow];
    },
    headerToolbar: false, //隐藏头部工具栏，因为没有插槽功能，所以需要自己在日历外面写头部工具栏
    aspectRatio: 1.5, //设置日历单元格宽度与高度的比例
    // locale: 'zh-cn', // 切换语言，当前为中文，切了之后每一天会变成1日，2日...所以不要切换，选择自定义 dayHeaderContent
    firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
    /** 事件（在日历上做标记） */
    events: eventsArr.value,
    /** 事件点击（删除节假日） */
    eventClick: clickCalendar,
    select: function (value) {
      const startDate = dayjs(value.start);
      //结束日期会到下一天的0点，所以需要减一天
      const endDate = dayjs(value.end).subtract(1, 'day');
      formState.dateTime = [startDate, endDate];
      formState.interval = `${dayjs(value.end).diff(startDate, 'day')}天`;
      formRef.value?.validateFields(['dateTime']);
    },
  });
  /** 日历点击事件 */
  function clickCalendar(value) {
    console.log('🚀 ~ eventClick::', value);
    console.log('🚀 ~ eventClick:startStr', value.event.startStr);
    Modal.confirm({
      title: '是否删除当前节假日',
      content: `${value.event.startStr}   ${value.event.title}`,
      okText: '删除节假日',
      onOk() {
        const index = eventsArr.value.findIndex((item) => item.id === value.event.id);
        eventsArr.value.splice(index, 1);
      },
      onCancel() {},
    });
  }
  /** 日历标题：YYYY年M月 */
  const calendarTitle = ref();
  /** 月份选择器 */
  const monthPicker = ref();
  /** 跳转到上个月 */
  const prevMonth = () => {
    fullcalendarApi.value?.prev();
    console.log('🚀 ~ prevMonth:');
    updateCalendarTitle();
    monthPicker.value = dayjs(fullcalendarApi.value?.getDate());
  };
  /** 跳转到下个月 */
  const nextMonth = () => {
    fullcalendarApi.value?.next();
    updateCalendarTitle();
    monthPicker.value = dayjs(fullcalendarApi.value?.getDate());
  };
  /** 更新标题 */
  const updateCalendarTitle = () => {
    calendarTitle.value = dayjs(fullcalendarApi.value?.getDate()).format('YYYY年M月');
  };
  onMounted(() => {
    updateCalendarTitle();
  });
  /** 选择月份change事件 */
  const handleMonthChange = (date) => {
    if (!date) return;
    fullcalendarApi.value?.gotoDate(dayjs(date).format('YYYY-MM-DD'));
    updateCalendarTitle();
  };
</script>
```

### 总结

`fullcalendar` 这个库很强大，还有很多其他的功能，这里我只使用到了选择表格的功能。

缺点是文档不易阅读也不能搜索，demo示例太少，配置全靠别人博客里的注释来理解，不像组件库的文档把各种配置和demo都详细列出来。
