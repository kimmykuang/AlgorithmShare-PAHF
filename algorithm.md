
## 什么是算法

维基百科："在数学和计算机科学/算学之中，算法/演算法/算则法（Algorithm）为一个计算的具体步骤，常用于计算、数据处理和自动推理。精确而言，算法是一个表示为有限长列表的有效方法。算法应包含清晰定义的指令用于计算函数。"

---

#### 举个栗子

我们平时在工作过程中可能直面算法的机会不多，往往更多时间都挣扎在业务逻辑的漩涡之中，这里先以一个平时都有接触到的小例子介绍下算法的作用以及什么样的代码能够被称作"算法"。

以hft-api仓库为例，好房拓（也包括其他api仓库）对外提供的接口都会有token校验，大致的流程是：

##### 通信方式

基本都是HTTP POST/GET方法，通信数据格式```json```

##### 通用参数

```
_format      #数据格式:json
_from        #请求来源标示,请与我们联系获取唯一标示，如mls
_token       #数据校验字符串,根据一定算法将请求数据加密后的字符串
_trackid     #数据跟踪id,类GUID算法生成的全局唯一标示符，框架一般不校验这个参数的格式，只是必传
_requesttime #当前请求时间.服务器只允许一定时间范围内的请求
```

##### 私钥
由好房开发生成一个32位的字符串，放在API库的env配置中，这个私钥第三方需要用来作为参数生成_token：

```php
PAF_SERVICE_KEY_[FROM] = [32位字符串]
PAF_SERVICE_TD_[FROM]  = [3600]（单位：秒）
```

##### 加密算法
加密算法需要我们提供给第三方，可以是代码代码片段或者SDK的形式，考虑到第三方可能是各种语言实现的系统，下面给出一个从框架加密验证中间件中抽取出来的PHP Demo:

```
/**
 * 以同步第三方经纪人公司 - 麦尔斯为例，生成_token值
 * 其中业务参数：
 *  @param [integer] company_id        公司ID    require
 *  @param [integer] city_id           城市ID    require
 *  @param [string]  company_name      公司名    require
 *  @param [string]  company_full_name 公司全称  option
 */
$key = '[32位_mls_私钥]'; //给合作商mls的私钥
$requesttime = 1479622991;                 //发起请求时间戳
//传入的业务参数，其中_format，_trackid必传
$params = array(
    //业务参数
    'company_id'        => 112,
    'city_id'           => 1,
    'company_name'      => '万利地产',
    'company_full_name' => '万利置业有限公司',
    //两个通用参数
    '_format'           => 'json',
    //trackid可以使用UUID算法生成，是一个便于追踪请求的ID，无业务意义
    '_trackid'          => '3f950685-1f54-4ac1-b1e4-1a33486f63d2'
);
//按字典序对数组中的key排序
ksort($params);
//具体生成token的方法: 序列化数组参数 + sha1 + md5
$token = [对业务参数+key+requesttime的混淆处理，不便外透];

echo "合作商的token：". $token;

/////// 合作商的token：e983321a44daf33e0e0c840593a70fd8 ///////
```

##### 发起请求

```
base url:
http://api.pinganfang.com/hft/1.0/sync_company_info
params:
_format=json&_trackid=3f950685-1f54-4ac1-b1e4-1a33486f63d2&_from=mls&_requesttime=1479622991&_token=e983321a44daf33e0e0c840593a70fd8&city_id=1&company_id=112&company_name=万利地产&company_full_name=万利置业有限公司
```

##### 校验

后端统一校验中间件会获取请求的通用参数，然后将业务参数也与上面的方法加密一次，判断传递的```_token```参数和加密出来的结果是否一致。

#### 算法概述

**如上所述就是token的一个生成/校验算法，类似的有好房拓app的签名校验```signature```以及淘宝支付接口的```sign```参数等，作用都是防止第三方截取请求后篡改请求参数进行中间人劫持。**

之所以把token校验称为一个"算法"，是因为其符合了算法的几个特征：

>输入项

>输出项

>有穷性

>确切性

>可行性

算法的质量优劣将影响到算法乃至程序的效率，一个算法的评价主要从时间复杂度和空间复杂度来考虑。一般来说有以下几个维度来评价：

>时间复杂度

>空间复杂度

>正确性

>可读性

>健壮性
