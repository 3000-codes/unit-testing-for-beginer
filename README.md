# 前端单元测试入门

## 1. 测试分类

### 1.1 单元测试

单元测试是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java中单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。

可以促使开发人员了解业务需求，提高代码质量，降低维护成本，提高开发效率。

### 1.2 集成测试

集成测试是指将单元测试过的模块按照设计要求组合在一起进行测试，目的是检查各单元之间的接口是否正确。集成测试是在单元测试之后进行的，它的主要目的是测试单元之间的交互，以及单元与外部（如数据库、外部接口等）的交互。

### 1.3 端对端测试（e2e）

端对端测试是指从用户的角度出发，对整个系统进行测试，检查系统是否符合用户的需求，以及系统与系统之间的交互是否正确。端对端测试是在集成测试之后进行的，它的主要目的是测试整个系统的功能和性能。

### 1.4 静态测试

静态测试是指在不运行被测程序的情况下对程序进行检查和分析，主要目的是检查程序是否符合编码规范，以及是否符合软件设计规范。静态测试的主要手段是代码审查和代码分析。

## 2. 前端单元测试

### 2.1 准备工作

使用测试工具:Vitest(也可以选择Jest，大同小异，不过需要配置babel，否则无法识别ES6语法)

```bash
pnpm create vue vite-test
# 后续选择vitest
```

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage"
  }
}
```

查看测试结果

```bash
pnpm run test
```

### 测试常用API

- describe：用于分组，可以嵌套
- test/it：用于测试用例
- expect：用于断言

### 过滤器（在describe或test/it后面使用）

对分组或则测试用例进行过滤

- 超时，单位毫秒，可以作用于测试用例或生命周期钩子函数
- only，只执行该分组或测试用例
- skip，跳过该分组或测试用例
- skipIf，条件跳过
- runIf，条件执行
- todo，标记该分组或测试用例为待完成
- concurrent，并发执行
- sequential，顺序执行

### 测试常用匹配器(在expect后面使用)

- not：取反
- toSatisfy：自定义匹配器（返回true或false）
- toEqual：比较值是否相等（无需相同引用），适用于引用类型
- toStrictEqual：比较值是否相等（无需相同引用），与toEqual不同的是，可以区分对象和数组中的undefined和empty

- 类型判断

  - toBeTypeOf：判断类型
  - toBeInstanceOf：判断是否为某个类的实例

- 基础类型

  - toBeDefined：判断是否定义（不是undefined）
  - toBe：严格相等，用于比较基本类型，或者相同引用的对象
  - toBeCloseTo：用于比较浮点数
  - toBeTruthy/toBeFalsy：判断是否为真/假, 0、''、null、undefined、NaN、false为假，其他为真
  - toBeNull：判断是否为null
  - toBeNaN：判断是否为NaN

- 逻辑判断

  - toBeGreaterThan：大于
  - toBeGreaterThanOrEqual：大于等于
  - toBeLessThan：小于
  - toBeLessThanOrEqual：小于等于

- 函数判断

  - toThrowError：判断是否抛出错误
  - toBeCalled：判断是否被调用，需要使用vi创建spyOn对函数进行监控
  - toBeCalledTimes：判断被调用次数
  - toBeCalledWith：判断被调用时的参数
  - toHaveBeenLastCalledWith：判断最后一次被调用时的参数
  - toHaveBeenNthCalledWith：判断第n次被调用时的参数
  - toHaveReturned：判断是否有返回值

- 包含判断

  - toContain：判断（伪）数组或字符串是否包含某个元素
  - toContainEqual：严格判断（伪）数组或字符串是否包含某个元素（递归比较）
  - toHaveProperty：判断对象是否包含某个属性
  - toHaveLength：判断（伪）数组或字符串的长度
  - toMatch：判断字符串是否匹配某个正则表达式
  - toMatchObject：判断对象是否包含某些值

- 异步判断：

  - resolves：判断promise在resolve时的值，在expect后面使用，然后再调用匹配器
  - rejects：判断promise在reject时的值，在expect后面使用，然后再调用匹配器
  - expect.assertions，判断expect在异步代码中调用了几次，不符合预期则failed
  - expect.hasAssertions，判断expect在异步代码中是否调用，不符合预期则failed

### 测试常用钩子函数(生命周期，可以嵌套或者top-level)

可以是分组的钩子函数，也可以是测试用例的钩子函数

- beforeEach：在每个测试用例（分组）之前执行
- afterEach：在每个测试用例（分组）之后执行
- beforeAll：在所有测试用例（分组）之前执行
- afterAll：在所有测试用例（分组）之后执行

### 2.2 测试用例（工具函数）

```js
import { it, expect, describe } from 'vitest'
function myFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ a: 1, b: undefined }), 1000)
  })
}

describe('测试用例', () => {
  const stockBill = {
    type: 'apples',
    count: 13
  }

  const stockMary = {
    type: 'apples',
    count: 13
  }

  it('stocks have the same properties', () => {
    expect(stockBill).toEqual(stockMary)
  })

  it('stocks are not the same', () => {
    expect(stockBill).not.toBe(stockMary)
  })

  it('测试返回值', async () => {
    await expect(myFetch()).resolves.toEqual({ a: 1, b: undefined })
    await expect(myFetch()).resolves.toStrictEqual({ a: 1, b: undefined })
  })

  it('异步测试', async () => {
    const res = await myFetch()
    expect(res).toEqual({ a: 1, b: undefined })
    expect(res).toStrictEqual({ a: 1, b: undefined })
  })
})
```

### 2.3 测试用例（组件）

#### 2.3.1 安装对应测试工具

```bash
# 安装vue测试工具
pnpm add -D @vue/test-utils

# 安装react测试工具
pnpm add -D @testing-library/react

```

#### 2.3.2 测试组件

调用mount方法，传入组件，可以获取到组件的包裹器，然后可以通过包裹器获取组件的属性、方法、事件等，然后进行测试

```js
// 见 src\components\__tests__\TodoLits.spec.ts
import { mount } from '@vue/test-utils'
import HelloWorld from '../src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    // 挂载组件,wrapper是组件的包裹器
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })

    expect(wrapper.text()).toMatch(msg)
  })
})
```

#### wrapper常用API

- wrapper.vm：组件实例
- wrapper.get：获取元素,能力堪比jQuery,如果获取不到元素，会抛出错误
- wrapper.find：获取元素，返回一个包裹器，如果获取不到元素，会返回一个空包裹器

### 2.4 测试数据类型（TS）

见 expectTypeOf（vitest-expectTypeOf)
