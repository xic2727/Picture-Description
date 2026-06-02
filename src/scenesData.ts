import { Scene } from './types';

export const SCENES_DATA: Scene[] = [
  {
    id: 'spring_kite',
    title: '春日放风筝',
    pinyin: 'chūn rì fàng fēng zheng',
    emoji: '🪁',
    bgColor: 'bg-emerald-50 text-emerald-950',
    accentColor: 'emerald',
    description: '春天到了，天气晴朗，微风徐徐。小朋友们来到绿油油的草地上放风筝。天空中飞着五颜六色的燕子风筝，两旁的柳树发芽了，桃花也开了，大家高高兴兴，玩得非常开心。',
    explorePoints: [
      {
        id: 'liushu',
        label: '柳树',
        pinyin: 'liǔ shù',
        description: '绿油油的柳树吐出了新的嫩芽，长长的柳条随风轻轻摇摆，好像小姑娘的辫子。',
        x: 12,
        y: 25,
        type: 'nature'
      },
      {
        id: 'fengzheng',
        label: '风筝',
        pinyin: 'fēng zheng',
        description: '五颜六色的燕子风筝在蔚蓝的天空里迎风飞舞，好像在跟白云说悄悄话呢。',
        x: 48,
        y: 18,
        type: 'object'
      },
      {
        id: 'caodi',
        label: '绿草地',
        pinyin: 'lǜ cǎo dì',
        description: '软绵绵的绿草地像一块绿色的地毯，上面还开着五角星一样的小黄花。',
        x: 35,
        y: 72,
        type: 'nature'
      },
      {
        id: 'pengyou',
        label: '小朋友',
        pinyin: 'xiǎo péng yǒu',
        description: '欢快的小胖正拉着长长的风筝线，迈着小飞腿在草地上跑来跑去，嘴里还笑着。',
        x: 65,
        y: 55,
        type: 'person'
      },
      {
        id: 'taohua',
        label: '桃花',
        pinyin: 'táo huā',
        description: '粉红色的桃花笑红了脸，挂在枝头散发着甜甜的清香，引来了小蜜蜂。',
        x: 82,
        y: 35,
        type: 'nature'
      }
    ]
  },
  {
    id: 'rainy_umbrella',
    title: '雨天小助手',
    pinyin: 'yǔ tiān xiǎo zhù shǒu',
    emoji: '☔',
    bgColor: 'bg-sky-50 text-sky-950',
    accentColor: 'sky',
    description: '下雨天放学后，路上有很多小积水。小明和小红合撑一把漂亮的大红伞回家。小明看见路旁有一只小猫在淋雨，把雨伞让过去给它遮雨，两个人的衣服虽然淋湿了一点，但心里暖洋洋的。',
    explorePoints: [
      {
        id: 'yusan',
        label: '红雨伞',
        pinyin: 'hóng yǔ sǎn',
        description: '大红色的雨伞像一顶神奇的蘑菇，撑在我们头顶，为我们挡住豆大的雨点。',
        x: 50,
        y: 22,
        type: 'object'
      },
      {
        id: 'yuxue',
        label: '小雨靴',
        pinyin: 'xiǎo yǔ xuē',
        description: '亮晶晶的黄色小雨靴踩在积水上，“啪嗒啪嗒”开出了漂亮的大水花，真好玩！',
        x: 45,
        y: 75,
        type: 'object'
      },
      {
        id: 'shuikeng',
        label: '积水坑',
        pinyin: 'jī shuǐ kēng',
        description: '路上一个个圆圆的小水坑像亮亮的小镜子，落下的雨滴在上面画出一圈圈波纹。',
        x: 25,
        y: 80,
        type: 'nature'
      },
      {
        id: 'xiaomao',
        label: '小花猫',
        pinyin: 'xiǎo huā māo',
        description: '湿淋淋的小花猫躲在叶子下面，正“喵喵喵”地叫着，缩着身子好可怜呀。',
        x: 75,
        y: 65,
        type: 'person'
      },
      {
        id: 'woniu',
        label: '小蜗牛',
        pinyin: 'xiǎo wō niú',
        description: '慢吞吞的小蜗牛正背着自己的小房子在花台旁散步，它最喜欢洗凉凉的雨水澡啦。',
        x: 18,
        y: 60,
        type: 'nature'
      }
    ]
  },
  {
    id: 'winter_snowman',
    title: '快乐堆雪人',
    pinyin: 'kuài lè duī xuě rén',
    emoji: '☃️',
    bgColor: 'bg-indigo-50 text-indigo-950',
    accentColor: 'indigo',
    description: '冬天到了，天空中下着鹅毛大雪。地上积了厚厚的一层白雪。小朋友们来到雪地里，堆起了一个圆滚滚的雪人，用胡萝卜做它的鼻子，黑石子做纽扣，还给它戴上了红帽子和红围巾。',
    explorePoints: [
      {
        id: 'xueren',
        label: '胖雪人',
        pinyin: 'pàng xuě rén',
        description: '圆滚滚胖乎乎的大雪人，正咧着嘴对大家傻笑，真像一个神奇的大雪球呀。',
        x: 52,
        y: 38,
        type: 'object'
      },
      {
        id: 'xuehua',
        label: '雪花',
        pinyin: 'xuě huā',
        description: '洁白无瑕的雪花慢悠悠、轻飘飘地落下来，好像天上的仙女撒下的魔法亮晶。',
        x: 32,
        y: 15,
        type: 'nature'
      },
      {
        id: 'huluobo',
        label: '胡萝卜',
        pinyin: 'hú luó bo',
        description: '尖尖的胡萝卜按在雪人脸上当鼻子，好像一个小红喇叭嘟嘟响！',
        x: 48,
        y: 30,
        type: 'nature'
      },
      {
        id: 'weijin',
        label: '红围巾',
        pinyin: 'hóng wéi jīn',
        description: '雪人脖子上系着一根红艳艳的围巾，毛茸茸的，看着就觉得不怕冷啦。',
        x: 52,
        y: 46,
        type: 'object'
      },
      {
        id: 'songshu',
        label: '大松树',
        pinyin: 'dà sōng shù',
        description: '挺拔茂密的大大松树换上了雪白的大棉袄，像雄壮的雪地宪兵一样，一动不动。',
        x: 80,
        y: 28,
        type: 'nature'
      }
    ]
  },
  {
    id: 'summer_beach',
    title: '海滩小树屋',
    pinyin: 'hǎi tān xiǎo shù wū',
    emoji: '🏖️',
    bgColor: 'bg-amber-50 text-amber-955',
    accentColor: 'amber',
    description: '暑假到了。小朋友来到金灿灿的海滩上度假。这里有蓝蓝的大海、高大的椰子树和许多可爱的小生灵。大家一起在沙滩上建起了梦想的城堡，捡贝壳追沙蟹，玩得不亦乐乎。',
    explorePoints: [
      {
        id: 'shabi',
        label: '沙滩城堡',
        pinyin: 'shā tān chéng bǎo',
        description: '用湿漉漉的沙子堆起来的城堡，上面还插着一朵小红花，是我们的秘密基地哦！',
        x: 48,
        y: 65,
        type: 'object'
      },
      {
        id: 'pangxie',
        label: '横爬蟹',
        pinyin: 'héng pá xiè',
        description: '两只大眼睛、挥舞大钳子的小橙蟹，在沙滩上一溜小跑，画出一串梅花脚印。',
        x: 25,
        y: 72,
        type: 'person'
      },
      {
        id: 'dahai',
        label: '蓝大海',
        pinyin: 'lán dà hǎi',
        description: '蔚蓝广阔的大海一眼见不到头，卷起雪白的浪花就像小手掌，在拍打着沙滩。',
        x: 50,
        y: 35,
        type: 'nature'
      },
      {
        id: 'yezishu',
        label: '椰子树',
        pinyin: 'yē zi shù',
        description: '挺拔的椰子树像卫兵一样站在岸边，树上挂着几颗绿油油的大椰子，甜甜的。',
        x: 82,
        y: 22,
        type: 'nature'
      },
      {
        id: 'beike',
        label: '彩色贝壳',
        pinyin: 'cǎi sè bèi ké',
        description: '阳光一照闪闪发亮的小贝壳，好像掉在沙滩上的彩色糖果，我们要多捡几个。',
        x: 15,
        y: 62,
        type: 'object'
      }
    ]
  },
  {
    id: 'autumn_harvest',
    title: '秋日大丰收',
    pinyin: 'qiū rì dà fēng shōu',
    emoji: '🌾',
    bgColor: 'bg-yellow-50 text-yellow-950',
    accentColor: 'amber',
    description: '金秋十月，天气凉爽，田野里一片金灿灿。稻子笑弯了腰，红红的高粱像火把。一个可爱的稻草人神气地站在麦田中间。树上的苹果成熟了，一只毛茸茸的小松鼠在树下忙着拾取香甜的松果。',
    explorePoints: [
      {
        id: 'daocao',
        label: '稻草人',
        pinyin: 'dào cǎo rén',
        description: '戴着破草帽、张开双臂的稻草人，在风中对远处的麻雀摇摇晃晃地打着招呼。',
        x: 50,
        y: 48,
        type: 'object'
      },
      {
        id: 'xiaosongshu',
        label: '小松鼠',
        pinyin: 'xiǎo sōng shǔ',
        description: '拖着毛茸茸大尾巴的小松鼠，正捧着又香又硬的大松果，小嘴巴塞得鼓鼓的。',
        x: 18,
        y: 68,
        type: 'person'
      },
      {
        id: 'hongpingguo',
        label: '红苹果',
        pinyin: 'hóng píng guǒ',
        description: '挂满枝头的苹果成熟了，红澄澄、亮晶晶的，像极了害羞的小姑娘的脸蛋。',
        x: 82,
        y: 28,
        type: 'nature'
      },
      {
        id: 'daogu',
        label: '金黄稻谷',
        pinyin: 'jīn huáng dào gǔ',
        description: '金黄色的稻谷沉甸甸地低垂着，好像正在向辛勤劳作的农民伯伯弯腰鞠躬。',
        x: 35,
        y: 75,
        type: 'nature'
      },
      {
        id: 'gaoliang',
        label: '红高粱',
        pinyin: 'hóng gāo liáng',
        description: '一片片红彤彤的高粱高高挺立着，像是秋天里高举着的，一柄柄燃烧的红火把。',
        x: 68,
        y: 62,
        type: 'nature'
      }
    ]
  },
  {
    id: 'birthday_party',
    title: '生日欢笑多',
    pinyin: 'shēng rì huān xiào duō',
    emoji: '🎂',
    bgColor: 'bg-rose-50 text-rose-950',
    accentColor: 'rose',
    description: '今天是小美七岁生日，客厅装点得温馨漂亮。天花板下飘着彩色的气球。桌子中央有一个香甜的奶油草莓生日蛋糕。小美闭着眼许愿，好朋友们拍着双手，戴着卡通生日帽为她唱起生日快乐歌。',
    explorePoints: [
      {
        id: 'dangao',
        label: '生日蛋糕',
        pinyin: 'shēng rì dàn gāo',
        description: '精致的三层奶油大蛋糕上，插着七支粉红色的生日蜡烛，跳跃着神奇的小火光。',
        x: 50,
        y: 50,
        type: 'object'
      },
      {
        id: 'qiqiu',
        label: '彩色气球',
        pinyin: 'cǎi sè qì qiú',
        description: '天花板上飘着五颜六色的气球，圆溜溜的，好像是一群正在打哈欠的小胖虫。',
        x: 25,
        y: 20,
        type: 'object'
      },
      {
        id: 'liwubao',
        label: '精美礼盒',
        pinyin: 'jīng měi lǐ hé',
        description: '系着粉色缎带的礼盒里，装满了朋友们送的各种小玩具，承载着满满的心意。',
        x: 80,
        y: 65,
        type: 'object'
      },
      {
        id: 'xiaomei',
        label: '寿星小美',
        pinyin: 'shòu xīng xiǎo měi',
        description: '过生日的小美扎着蝴蝶结，正紧紧闭着眼，在心里许下一个美好的小愿望呢。',
        x: 50,
        y: 74,
        type: 'person'
      },
      {
        id: 'shengriti',
        label: '寿星帽',
        pinyin: 'shòu xīng mào',
        description: '尖尖的彩色纸帽子扣在头顶，上面还有一朵亮晶晶的圆绒球，看着格外滑稽。',
        x: 48,
        y: 35,
        type: 'object'
      }
    ]
  },
  {
    id: 'classroom_reading',
    title: '快乐语文课',
    pinyin: 'kuài lè yǔ wén kè',
    emoji: '🏫',
    bgColor: 'bg-blue-50 text-blue-955',
    accentColor: 'blue',
    description: '早晨，明亮的教室里书声琅琅。黑板上工工整整地写着拼音字母。同学们坐得端端正正，手里捧着心爱的语文课本。小熊老师手里拿着戒尺温和地讲着课，课桌上摆着彩色的文具。',
    explorePoints: [
      {
        id: 'heiban',
        label: '大黑板',
        pinyin: 'dà hēi bǎn',
        description: '墨绿色的黑板一尘不染，上面写着“a-o-e”的字母，像拼音魔法大门一样好看。',
        x: 48,
        y: 20,
        type: 'object'
      },
      {
        id: 'kebenshu',
        label: '语文书',
        pinyin: 'yǔ wén shū',
        description: '翻开的课本上，飘着好闻的淡淡油墨香，里面印满了各式各样有趣的插图故事。',
        x: 35,
        y: 65,
        type: 'object'
      },
      {
        id: 'chuangwainiao',
        label: '窗外小鸟',
        pinyin: 'chuāng wài xiǎo niǎo',
        description: '停在窗台上的灰色小叽喳正歪着头，听得津津有味，也想跟着学拼音认拼写。',
        x: 82,
        y: 42,
        type: 'nature'
      },
      {
        id: 'wenjuxi',
        label: '文具盒',
        pinyin: 'wén jù hé',
        description: '彩虹色的文具盒里，整齐地躺着神气的铅笔哥哥和胖乎乎的香橡皮擦妹妹。',
        x: 18,
        y: 72,
        type: 'object'
      },
      {
        id: 'kezhuoyi',
        label: '干净课桌',
        pinyin: 'gān jìng kè zhuō',
        description: '擦得一尘不染的黄色木桌，像是拼写王国的跑道，承载着大家的求知梦想。',
        x: 52,
        y: 82,
        type: 'object'
      }
    ]
  },
  {
    id: 'park_environment',
    title: '环保小卫士',
    pinyin: 'huán bǎo xiǎo wèi shì',
    emoji: '🧹',
    bgColor: 'bg-green-50 text-green-955',
    accentColor: 'green',
    description: '星期六下午，小明和小红在干净漂亮的公园里散步。他们看见草坪上丢弃着香蕉皮和塑料瓶。两个有责任心的小朋友一拍即合，自愿当起环保清洁工，把垃圾丢回了绿色的分类垃圾箱里。',
    explorePoints: [
      {
        id: 'lajitong',
        label: '垃圾箱',
        pinyin: 'lā jī tǒng',
        description: '绿色的分类垃圾箱像是一个严肃的环保士兵，守着公园，准备吃掉脏垃圾。',
        x: 78,
        y: 52,
        type: 'object'
      },
      {
        id: 'xiangjiaopi',
        label: '香蕉皮',
        pinyin: 'xiāng jiāo pí',
        description: '金黄色的香蕉皮滑溜溜的，如果不赶紧捡起来，很容易让路过的小朋友摔大跤。',
        x: 28,
        y: 72,
        type: 'object'
      },
      {
        id: 'xiaoming',
        label: '勤劳小明',
        pinyin: 'qín láo xiǎo míng',
        description: '小明正戴着白手套，弯着腰把地下的塑料瓶小心地捏起来放进自己的环保袋里。',
        x: 48,
        y: 60,
        type: 'person'
      },
      {
        id: 'honghua',
        label: '公园红花',
        pinyin: 'gōng yuán hóng huā',
        description: '花坛里盛开的小红花随微风欢快地点头浅笑，似乎在一遍遍夸奖他们的好德行。',
        x: 15,
        y: 58,
        type: 'nature'
      },
      {
        id: 'saozhou',
        label: '竹小扫把',
        pinyin: 'zhú xiǎo sào bǎ',
        description: '竹条扎成的迷你小扫把，扫在沙石路面上发出“沙沙沙”极富有节奏的声音。',
        x: 62,
        y: 75,
        type: 'object'
      }
    ]
  },
  {
    id: 'zoo_panda',
    title: '国宝大熊猫',
    pinyin: 'guó bǎo dà xióng māo',
    emoji: '🐼',
    bgColor: 'bg-neutral-50 text-neutral-950',
    accentColor: 'slate',
    description: '动物园的熊猫馆里，憨态可掬的国宝大熊猫“圆圆”正趴在粗壮的树杈上香甜地啃着竹子。它圆滚滚的，长着浓浓的黑眼圈，白里透灰的大肚皮十分惹人喜爱。周围的小观众们纷纷举着相机拍照，赞不绝口。',
    explorePoints: [
      {
        id: 'cuidi',
        label: '翠嫩竹叶',
        pinyin: 'cuì nèn zhú yè',
        description: '小熊猫怀里抱着的翠绿竹梢，咬在嘴里咔嚓咔嚓直响，好像是在吃香脆的薯条。',
        x: 45,
        y: 58,
        type: 'nature'
      },
      {
        id: 'yanyuan',
        label: '大黑眼圈',
        pinyin: 'dà hēi yǎn quān',
        description: '脸蛋上圆圆的两团大黑毛圈，像是在眼睛上架起了一副漆黑耀眼的帅气太阳镜。',
        x: 48,
        y: 35,
        type: 'nature'
      },
      {
        id: 'shucha',
        label: '粗树杈',
        pinyin: 'cū shù chà',
        description: '粗壮古老的老树丫交叉在一起，就成了大熊猫最安全、舒展和凉爽的香甜大睡床。',
        x: 25,
        y: 55,
        type: 'nature'
      },
      {
        id: 'xiangji',
        label: '小照相机',
        pinyin: 'xiǎo zhào xiàng jī',
        description: '咔嚓咔嚓亮着闪光灯的照相机，要把小熊猫每一个憨里憨气的可爱瞬间留存好。',
        x: 78,
        y: 64,
        type: 'object'
      },
      {
        id: 'baidupi',
        label: '白圆肚皮',
        pinyin: 'bái yuán dù zi',
        description: '圆蓬蓬、鼓胀胀、白花花的大肚子，一呼一吸时像个软绵绵的大棉花团一样动。',
        x: 48,
        y: 48,
        type: 'person'
      }
    ]
  },
  {
    id: 'moon_festival',
    title: '中秋合家欢',
    pinyin: 'zhōng qiū hé jiā huán',
    emoji: '🥮',
    bgColor: 'bg-indigo-50/80 text-slate-950',
    accentColor: 'indigo',
    description: '八月十五中秋夜，银白的月亮像一个精致的大玉盘高悬虚空。小亮一家围坐在静谧院子里的石桌旁，品尝甜滋滋的红豆沙烤月饼。微风徐徐，大人们品热茶，孩子们听着嫦娥神仙故事，院落里洋溢着团圆 and 欢乐。',
    explorePoints: [
      {
        id: 'yuebing',
        label: '香甜月饼',
        pinyin: 'xiāng tián yuè bǐng',
        description: '金黄色圆圆的蛋黄月饼，上面印制着精致花边，一口咬下去香气怡人又酥又软。',
        x: 50,
        y: 55,
        type: 'object'
      },
      {
        id: 'dayubing',
        label: '圆金月亮',
        pinyin: 'yuán jīn yuè liàng',
        description: '夜空中亮堂堂的大满月，洒下一道道柔滑宁静的银辉，像天穹上的一颗夜明珠。',
        x: 80,
        y: 18,
        type: 'nature'
      },
      {
        id: 'chahu',
        label: '紫砂茶碗',
        pinyin: 'zǐ shā chá wǎn',
        description: '茶杯上方正冒着一丝丝如烟雾般的香气茶烟，闻着就能让人平心静气。',
        x: 35,
        y: 54,
        type: 'object'
      },
      {
        id: 'shizhuo',
        label: '凉爽石桌',
        pinyin: 'liáng shuǎng shí zhuō',
        description: '树下这块圆圆沉沉的青石板平桌，是全家人一起聊天、看天、话家常的欢乐地。',
        x: 48,
        y: 72,
        type: 'object'
      },
      {
        id: 'tuanyuan',
        label: '合家团圆',
         pinyin: 'hé jiā tuán yuán',
        description: '家人们甜甜惬意的说笑歌声飘得可远了，和空中那轮满月相比一样明亮和美。',
        x: 22,
        y: 65,
        type: 'person'
      }
    ]
  },
  // ---------------- BRAND NEW GENERATED SCENES (11 - 40) ----------------
  {
    id: 'ocean_coral',
    title: '神秘海底游',
    pinyin: 'shén mì hǎi dǐ yóu',
    emoji: '🐠',
    bgColor: 'bg-sky-50 text-sky-950',
    accentColor: 'sky',
    description: '蔚蓝的海底世界奇妙无比。阳光穿过澄澈的水面洒下斑驳光亮，五颜六色的珊瑚林中，小丑鱼家族在欢快散步。一只巨大的老海龟摆动着脚蹼缓缓游过，海草随着水流跳着婀娜的舞蹈。',
    explorePoints: [
      {
        id: 'haigui',
        label: '大海龟',
        pinyin: 'dà hǎi guī',
        description: '这只背着厚壳的老海龟正晃动着有力的脚蹼，在浩瀚的海底漫步，神气极了。',
        x: 75,
        y: 40,
        type: 'person'
      },
      {
        id: 'shanhulin',
        label: '彩色珊瑚',
        pinyin: 'cǎi sè shān hú',
        description: '像小鹿角一样分叉的珊瑚开满了海底，有粉红的、亮蓝的，太神奇了。',
        x: 20,
        y: 70,
        type: 'nature'
      },
      {
        id: 'xiaochouyu',
        label: '小丑鱼',
        pinyin: 'xiǎo chǒu yú',
        description: '橘黄色画着白条纹的小丑鱼，正顽皮地穿梭在珊瑚丛中躲猫猫呢！',
        x: 45,
        y: 55,
        type: 'person'
      },
      {
        id: 'haicaowu',
        label: '绿海草',
        pinyin: 'lǜ hǎi cǎo',
        description: '柔软翠绿的长海草随着温和的水流，在蔚蓝的水底缓缓跳着扭扭舞。',
        x: 82,
        y: 75,
        type: 'nature'
      },
      {
        id: 'shuipao',
        label: '珍珠水泡',
        pinyin: 'zhēn zhū shuǐ pào',
        description: '一串串亮晶晶的圆形水泡咕噜噜地向上飘，好像海底龙王洒出的亮珍珠。',
        x: 48,
        y: 20,
        type: 'object'
      }
    ]
  },
  {
    id: 'space_rocket',
    title: '浩瀚太空行',
    pinyin: 'hào hàn tài kōng xíng',
    emoji: '🚀',
    bgColor: 'bg-indigo-950/80 text-white',
    accentColor: 'indigo',
    description: '在辽阔神秘的宇宙太空中，一颗闪烁着银光的巨型航天载人飞船正缓缓绕轨飞行。宇航员叔叔漂浮在舱外，通过安全绳向蔚蓝明亮的家园地球招手。远处巨大的土星有着彩虹般的星环，非常壮丽。',
    explorePoints: [
      {
        id: 'astronaut',
        label: '宇航员',
        pinyin: 'yǔ háng yuán',
        description: '戴着大头盔、穿着雪白宇航服的宇航员叔叔，正高举右手跟我们打招呼问好呢。',
        x: 45,
        y: 42,
        type: 'person'
      },
      {
        id: 'diqiu',
        label: '蓝色地球',
        pinyin: 'lán sè dì qiú',
        description: '水蓝色的大地球像一颗会发光的玻璃球，漂浮在夜空中，那是我们美丽的家。',
        x: 18,
        y: 25,
        type: 'nature'
      },
      {
        id: 'tuxing',
        label: '环状土星',
        pinyin: 'huán zhuàng tǔ xīng',
        description: '巨大的淡褐色土星套着一条宽宽亮亮的星环，像戴了一顶华丽的宽边大帽子。',
        x: 80,
        y: 30,
        type: 'nature'
      },
      {
        id: 'rocket_body',
        label: '宇宙飞船',
        pinyin: 'yǔ zhòu fēi chuán',
        description: '高大坚固的银色飞船张开庞大的太阳能板，像是一只在星河里划动的大神鹰。',
        x: 52,
        y: 72,
        type: 'object'
      },
      {
        id: 'xingxing',
        label: '闪烁群星',
        pinyin: 'shǎn shuò qún xīng',
        description: '密密麻麻的小星星在漆黑浩瀚的夜景里闪着小微光，好像是撒在大箱子里的碎金子。',
        x: 50,
        y: 15,
        type: 'nature'
      }
    ]
  },
  {
    id: 'happy_farm',
    title: '快乐小农场',
    pinyin: 'kuài lè xiǎo nóng chǎng',
    emoji: '🚜',
    bgColor: 'bg-amber-50 text-slate-900',
    accentColor: 'amber',
    description: '周末乡村的空气好极了，小农场里一派闲适。一只大红色的小拖拉机停在草棚旁，几只软蓬蓬像白云一样的小羊羔在围栏里安静地吃着嫩草。大公鸡高立在木篱笆上，骄傲地放声啼鸣。',
    explorePoints: [
      {
        id: 'gongji',
        label: '大公鸡',
        pinyin: 'dà gōng jī',
        description: '羽毛五彩夺目的大金公鸡正昂着红红的鸡冠，扯开嗓子“喔喔喔”地叫天亮。',
        x: 15,
        y: 45,
        type: 'person'
      },
      {
        id: 'sheep',
        label: '小羊羔',
        pinyin: 'xiǎo yáng gāo',
        description: '软毛雪白的小羊，身子圆鼓鼓的，一蹦一跳真像是一朵在草地上走路的甜白云。',
        x: 48,
        y: 68,
        type: 'person'
      },
      {
        id: 'tractor',
        label: '红拖拉机',
        pinyin: 'hóng tuō lā jī',
        description: '大轱辘、红车身的小拖拉机，干起农活来又快又稳，轰隆隆的声音可响亮啦。',
        x: 80,
        y: 60,
        type: 'object'
      },
      {
        id: 'liba',
        label: '篱笆栏',
        pinyin: 'lí ba lán',
        description: '用一根根木头条钉成的浅黄色小篱笆，围住了青草坡，好看又牢固。',
        x: 45,
        y: 80,
        type: 'object'
      },
      {
        id: 'ganfang',
        label: '稻草棚',
        pinyin: 'dào cǎo péng',
        description: '用金黄金黄的干稻草搭起的小草棚，散发着好闻的麦香味，里面放满了好吃的。',
        x: 50,
        y: 28,
        type: 'nature'
      }
    ]
  },
  {
    id: 'quiet_library',
    title: '安静图书馆',
    pinyin: 'ān jìng tú shū guǎn',
    emoji: '📚',
    bgColor: 'bg-sky-50 text-slate-800',
    accentColor: 'sky',
    description: '午后静谧的社区图书馆里，一排排棕红色的书架上，整齐码放着厚厚薄薄的书卷。小丽同学静静地坐在光洁的木桌旁阅读，一束温暖的阳光正好铺洒在她手捧的连环画册上，显得温暖极了。',
    explorePoints: [
      {
        id: 'shujia',
        label: '高大书架',
        pinyin: 'gāo dà shū jià',
        description: '棕褐色的大木书架一直顶到天花板，上面全是一本本记载着世界秘密的宝贝图书。',
        x: 15,
        y: 35,
        type: 'object'
      },
      {
        id: 'xiaoli',
        label: '看书小丽',
        pinyin: 'kàn shū xiǎo lì',
        description: '扎着马尾的小丽正全神贯注地看着书，眼睛里闪烁着求知的光芒，一动也不动。',
        x: 50,
        y: 65,
        type: 'person'
      },
      {
        id: 'taideng',
        label: '绿色台灯',
        pinyin: 'lǜ sè tái dēng',
        description: '散发着柔和淡黄光圈的小台灯，像是一株会发光的亮晶小草，照暖了整张课桌。',
        x: 80,
        y: 52,
        type: 'object'
      },
      {
        id: 'diqiu_y',
        label: '彩色地球仪',
        pinyin: 'cǎi sè dì qiú yí',
        description: '圆圆滑滑的地球仪，用小手指轻轻一拨就会飞快地转，让我们看到天边的大海。',
        x: 82,
        y: 80,
        type: 'object'
      },
      {
        id: 'read_book',
        label: '厚画册',
        pinyin: 'hòu huà cè',
        description: '翻开的书页里画着威武的大恐龙和美丽的太空，带我们的心灵去到神秘的地方。',
        x: 48,
        y: 75,
        type: 'object'
      }
    ]
  },
  {
    id: 'cooking_mom',
    title: '温馨包饺子',
    pinyin: 'wēn xīn bāo jiǎo zi',
    emoji: '🥟',
    bgColor: 'bg-rose-50 text-rose-950',
    accentColor: 'rose',
    description: '大年三十，厨房里的桌前热气腾腾。妈妈正和小明高高兴兴地包着饺子。小明的脸上沾了一点白乎乎的面粉，像个可爱的小花猫。小竹帘上已经排好了一圈圈白生生的、像元宝般可爱的饺子。',
    explorePoints: [
      {
        id: 'mianfen',
        label: '白面粉',
        pinyin: 'bái miàn fěn',
        description: '白白细细的白面粉堆在案板上，摸上去黏糊糊软蓬蓬的，好像是冬天的落雪。',
        x: 22,
        y: 60,
        type: 'nature'
      },
      {
        id: 'xiaoming_face',
        label: '花猫小明',
        pinyin: 'huā māo xiǎo míng',
        description: '调皮的小明不仅沾了满手的面粉，脸上还蹭了一大白块，大家看着都哈哈大笑。',
        x: 48,
        y: 50,
        type: 'person'
      },
      {
        id: 'dumplings',
        label: '小元宝饺',
        pinyin: 'xiǎo yuán bǎo jiǎo',
        description: '一个个肚子鼓鼓、捏着精致花边的小擀饺皮，整整齐齐地躺着，等待跳进热锅里。',
        x: 78,
        y: 65,
        type: 'object'
      },
      {
        id: 'ganmianzhang',
        label: '木擀面杖',
        pinyin: 'mù gǎn miàn zhàng',
        description: '圆溜溜长条条的小木棍一滚，就把圆圆的面粉团压成了薄薄光滑的圆饺子皮。',
        x: 35,
        y: 72,
        type: 'object'
      },
      {
        id: 'steam_pot',
        label: '腾腾热气',
        pinyin: 'téng téng rè qì',
        description: '大汤锅上方正呼呼冒着雪白的香热蒸汽，连屋子里都飘满了红豆馅和肉馅的香气。',
        x: 48,
        y: 22,
        type: 'nature'
      }
    ]
  },
  {
    id: 'dental_care',
    title: '爱牙小卫士',
    pinyin: 'ài yá xiǎo wèi shì',
    emoji: '🪥',
    bgColor: 'bg-blue-50 text-slate-800',
    accentColor: 'blue',
    description: '早晨，小刚站在卫生间的镜子前认真刷牙。他手里拿着蓝色的电动牙刷，嘴巴周围满是白乎乎、像奶油般香甜的牙膏泡沫。镜子里，他的牙齿洁白闪亮，像一列整齐守规矩的大白兵。',
    explorePoints: [
      {
        id: 'toothbrush',
        label: '小牙刷',
        pinyin: 'xiǎo yá shuā',
        description: '亮蓝色的儿童小机械牙刷，在我们嘴里上下跳舞，沙沙沙地赶走调皮的牙虫。',
        x: 18,
        y: 55,
        type: 'object'
      },
      {
        id: 'yuchi',
        label: '白牙齿',
        pinyin: 'bái yá chǐ',
        description: '刷得白晃晃的牙齿一尘不染，在笑容里闪闪放光芒，齐整整的特别好看。',
        x: 48,
        y: 42,
        type: 'nature'
      },
      {
        id: 'paomo',
        label: '白泡沫',
        pinyin: 'bái pào mò',
        description: '薄荷甜味的白色雪花泡沫，堆满了嘴唇，好像是冬天堆满大树枝的软积雪。',
        x: 48,
        y: 60,
        type: 'object'
      },
      {
        id: 'shuibei',
        label: '彩色水杯',
        pinyin: 'cǎi sè shuǐ bēi',
        description: '盛满温温清水的塑料漱口杯上画着可爱的小松鼠，端正地坐在白瓷洗脸盆旁。',
        x: 80,
        y: 65,
        type: 'object'
      },
      {
        id: 'xiaogang',
        label: '认真小刚',
        pinyin: 'rèn zhēn xiǎo gāng',
        description: '站得笔挺直直的小刚正聚精会神地看着玻璃镜，坚持每天早晚都把脏牙刷干净。',
        x: 48,
        y: 20,
        type: 'person'
      }
    ]
  },
  {
    id: 'traffic_light',
    title: '遵守红绿灯',
    pinyin: 'zūn shǒu hóng lǜ dēng',
    emoji: '🚦',
    bgColor: 'bg-orange-50 text-orange-950',
    accentColor: 'orange',
    description: '斑马线前，红绿灯正亮着大大的红圆脸。同学们排成整齐的一纵队列，乖乖停在斑马线前等候。斑马线上的黑白条纹像一匹大斑马伏在黑色大柏油路中央守护大家的步行安全。',
    explorePoints: [
      {
        id: 'hongdeng',
        label: '红绿灯',
        pinyin: 'hóng lǜ dēng',
        description: '高耸在树梢间的长脖子交通灯，亮起圆圆红灯时就像是在说：“小朋友，停停步”！',
        x: 48,
        y: 18,
        type: 'object'
      },
      {
        id: 'banmaxian',
        label: '斑马线',
        pinyin: 'bān mǎ xiàn',
        description: '大马路中间画着的一道道白横线，是拼音王国的安全通道，走在上面最安全啦。',
        x: 52,
        y: 72,
        type: 'object'
      },
      {
        id: 'xiaoche',
        label: '黄色校车',
        pinyin: 'huáng sè xiào chē',
        description: '胖胖墩墩靠路边停稳的黄色大校车，乖巧地把出行的同学们送到快乐大校门中。',
        x: 82,
        y: 45,
        type: 'object'
      },
      {
        id: 'shubao',
        label: '彩双肩包',
        pinyin: 'cǎi shuāng jiān bāo',
        description: '背在大家背后的彩色大书包，里面塞满了拼音绘本和好吃的小面包。',
        x: 22,
        y: 68,
        type: 'object'
      },
      {
        id: 'tongxue',
        label: '排队同学',
        pinyin: 'pái duì tóng xué',
        description: '坐得端整、排得整齐的少先队员们，正睁着大眼睛数着秒，个个特别有纪律。',
        x: 18,
        y: 50,
        type: 'person'
      }
    ]
  },
  {
    id: 'starry_camping',
    title: '星空露营夜',
    pinyin: 'xīng kōng lù yíng yè',
    emoji: '🏕️',
    bgColor: 'bg-indigo-950/90 text-indigo-100',
    accentColor: 'indigo',
    description: '夏夜里大森林的草地上清风拂面。一盏小煤油灯在厚实的帆布帐篷前跳着金色的火苗。橘色柴火燃得噼里啪啦响，烤得棉花糖散发出丝丝柔甜，天空中铺满了银色星河与美丽的织女星。',
    explorePoints: [
      {
        id: 'tent',
        label: '帆布帐篷',
        pinyin: 'fān bù zhàng péng',
        description: '三角形的暖橘色大帐篷立在树底下，挡住夜露，像是一个睡在林间的魔术小城堡。',
        x: 25,
        y: 45,
        type: 'object'
      },
      {
        id: 'campfire',
        label: '噼啪篝火',
        pinyin: 'pī pā gōu huǒ',
        description: '堆在一起的木柴顶端正开着一朵红艳艳的小火花，靠过去烤手掌觉得暖烘烘的。',
        x: 48,
        y: 72,
        type: 'nature'
      },
      {
        id: 'star_sky',
        label: '璀璨星河',
        pinyin: 'cuǐ càn xīng hé',
        description: '亮亮白白像牛奶河一样流过夜空的大天河，数不清的小星辰在上面快乐眨眼睫。',
        x: 50,
        y: 18,
        type: 'nature'
      },
      {
        id: 'guitar',
        label: '棕吉他',
        pinyin: 'zōng jí tā',
        description: '靠在木墩旁的小小六弦木吉他，一弹就会发出像林间小泉水般美妙的叮咚旋律。',
        x: 78,
        y: 68,
        type: 'object'
      },
      {
        id: 'children_camp',
        label: '露营娃',
        pinyin: 'lù yíng wá',
        description: '穿着厚外套、举着木小棍插棉花糖的伙伴们，正托着下巴，聚精会神地数星星呢。',
        x: 48,
        y: 55,
        type: 'person'
      }
    ]
  },
  {
    id: 'fun_playground',
    title: '快乐游乐场',
    pinyin: 'kuài lè yóu lè chǎng',
    emoji: '🛝',
    bgColor: 'bg-rose-50 text-slate-800',
    accentColor: 'rose',
    description: '下午，充满欢笑声的幼儿园操场上真热闹。彩虹滑梯前，乐乐正抓紧扶手，嗖地一声滑到细软的白沙池里，高兴得直挥手。一旁的秋千随风荡得高高的，像只快乐飞天的小燕子。',
    explorePoints: [
      {
        id: 'huati',
        label: '彩虹滑梯',
        pinyin: 'cǎi hóng huá tī',
        description: '红黄蓝三色相间的弯弯高滑梯，扶着两边往下滑，就像坐着云朵风跑车下山一样快！',
        x: 48,
        y: 48,
        type: 'object'
      },
      {
        id: 'lele',
        label: '快乐乐乐',
        pinyin: 'kuài lè lè le',
        description: '乐乐正抓着滑杆，咧着大嘴巴，风吹起他的短头发，“呜呼”一声溜滑下来。',
        x: 52,
        y: 62,
        type: 'person'
      },
      {
        id: 'qiuqian',
        label: '木秋千',
        pinyin: 'mù qiū qiān',
        description: '用两根粗麻绳系着的木板秋千，载着笑声在柳树梢间划出一道道漂亮的月牙弧线。',
        x: 18,
        y: 45,
        type: 'object'
      },
      {
        id: 'shachi',
        label: '细沙池',
        pinyin: 'xì shā chí',
        description: '一粒粒亮晶滑溜的白沙子，堆成了圆圆的小城堡，冰冰凉凉踩在脚底很舒服。',
        x: 48,
        y: 80,
        type: 'nature'
      },
      {
        id: 'windmill',
        label: '彩纸风车',
        pinyin: 'cǎi zhǐ fēng chē',
        description: '插在围墙角上的四叶纸风车，微风轻轻一吹，就变成一个彩色的小圆轮。',
        x: 82,
        y: 35,
        type: 'object'
      }
    ]
  },
  {
    id: 'art_class',
    title: '小小美术家',
    pinyin: 'xiǎo xiǎo měi shù jiā',
    emoji: '🎨',
    bgColor: 'bg-purple-50 text-purple-950',
    accentColor: 'purple',
    description: '彩虹美术教室里，琪琪同學正坐在一块木画板前画画。她左手端着印满红、黄、蓝各色颜料的木调色盘，右手提着细软毛笔，在画纸上点出一道弯弯美丽的七彩虹。',
    explorePoints: [
      {
        id: 'huaban',
        label: '木画夹',
        pinyin: 'mù huà jiǎ',
        description: '高耸在三脚架上的木头大画板，夹着雪白绘画纸，是施展七彩魔法的大舞台。',
        x: 45,
        y: 45,
        type: 'object'
      },
      {
        id: 'qiqi',
        label: '画娃琪琪',
        pinyin: 'huà wá qí qí',
        description: '琪琪套着一件神气的红色画衣，握着画笔抿着嘴唇，正在描绘天上的大虹桥。',
        x: 18,
        y: 60,
        type: 'person'
      },
      {
        id: 'palette',
        label: '五彩调色盘',
        pinyin: 'wǔ cǎi tiáo sè pán',
        description: '像个大树叶一般的塑料调色底盘，上面开着一朵朵红里透绿的七彩颜料花。',
        x: 15,
        y: 78,
        type: 'object'
      },
      {
        id: 'rainbow_draw',
        label: '弯彩虹',
        pinyin: 'wān cǎi hóng',
        description: '用软毛笔轻轻一抹画出的彩油长虹，横越白纸，像一座高挂在星空的魔法天桥。',
        x: 48,
        y: 25,
        type: 'nature'
      },
      {
        id: 'paint_cup',
        label: '涮笔筒',
        pinyin: 'shuàn bǐ tǒng',
        description: '清洗过颜料的透亮笔筒水，已经变成了好看的水蓝色，里面插着两根大画笔。',
        x: 82,
        y: 65,
        type: 'object'
      }
    ]
  },
  {
    id: 'dinosaur_world',
    title: '恐龙谷探秘',
    pinyin: 'kǒng lóng gǔ tàn mì',
    emoji: '🦕',
    bgColor: 'bg-emerald-50 text-slate-800',
    accentColor: 'emerald',
    description: '在远古茂盛的大灌木恐龙谷里，一只长胡子、吃青草的梁龙妈妈正温和地低头散步。茂密的芭蕉树叶间，有一枚裂开一条缝隙的恐龙蛋，一只探出脑袋的大眼睛恐龙宝宝正好奇张望。',
    explorePoints: [
      {
        id: 'baby_dino',
        label: '小恐龙',
        pinyin: 'xiǎo kǒng lóng',
        description: '刚从布满小红花蛋壳里啄出大脑袋的小家伙，身上湿漉漉的，咕噜噜地直转大眼睛。',
        x: 48,
        y: 62,
        type: 'person'
      },
      {
        id: 'lianglong',
        label: '大梁龙',
        pinyin: 'dà liàng lóng',
        description: '长着长脖子、踩着大柱子脚的大梁龙，长在脑门顶的小鼻子正喷出一阵阵水雾。',
        x: 25,
        y: 35,
        type: 'person'
      },
      {
        id: 'huoshan',
        label: '冒烟火山',
        pinyin: 'mào yān huǒ shān',
        description: '远处的三角形火山顶正呼呼升起像黑棉花一样的大烟柱，发出沉闷的吼吼声。',
        x: 80,
        y: 20,
        type: 'nature'
      },
      {
        id: 'bajiaoye',
        label: '大芭蕉叶',
        pinyin: 'dà bā jiāo yè',
        description: '比床盖还要巨大的绿油油芭蕉叶挂在树梢，能为树下的小野兔遮住好大的狂风雨。',
        x: 82,
        y: 48,
        type: 'nature'
      },
      {
        id: 'egg_shell',
        label: '彩色蛋壳',
        pinyin: 'cǎi sè dàn ké',
        description: '布满小斑纹的大红恐龙蛋，圆溜溜地躺在松软干草堆成的蛋壳床上，真好玩。',
        x: 48,
        y: 75,
        type: 'object'
      }
    ]
  },
  {
    id: 'gardening_joy',
    title: '小苗快长大',
    pinyin: 'xiǎo miáo kuài zhǎng dà',
    emoji: '🌱',
    bgColor: 'bg-green-50 text-green-950',
    accentColor: 'green',
    description: '春日清晨，花坛边的土地上湿润芬芳。婷婷同学搬来绿色的小洒水壶，小心翼翼地给刚刚破土而出的绿色豆小苗浇水。新发的小芽上挂着亮闪闪的水珠，一只漂亮的小瓢虫在绿叶上散步。',
    explorePoints: [
      {
        id: 'shuijiuban',
        label: '绿洒水壶',
        pinyin: 'lǜ sǎ shuǐ hú',
        description: '大象鼻子一样长长弯弯的小浇水壶，一倾斜就会洒出像密密细小春雨般的水线。',
        x: 18,
        y: 45,
        type: 'object'
      },
      {
        id: 'xiaomiao',
        label: '小绿芽',
        pinyin: 'xiǎo lǜ yá',
        description: '刚刚探出小绿脑袋的一对豆瓣绿小叶子，颤巍巍的，好像是一对尖尖的松鼠耳朵。',
        x: 48,
        y: 65,
        type: 'nature'
      },
      {
        id: 'piaochong',
        label: '花瓢虫',
        pinyin: 'huā piáo chóng',
        description: '穿着亮红色带黑斑点小盔甲的大瓢虫，慢吞吞地爬上草尖尖，洗起凉温水澡。',
        x: 45,
        y: 52,
        type: 'person'
      },
      {
        id: 'tingting',
        label: '浇花婷婷',
        pinyin: 'jiāo huā tíng tíng',
        description: '婷婷正扎着两条羊角辫，踮起小脚丫，笑眯眯地看着水雾中发出小彩光的豆苗。',
        x: 15,
        y: 28,
        type: 'person'
      },
      {
        id: 'shizun',
        label: '湿润泥土',
        pinyin: 'shī rùn ní tǔ',
        description: '刚刚喝饱清凉井水的黑大土，散发着好闻的草根味道，蚯蚓正在土里翻地呢。',
        x: 48,
        y: 80,
        type: 'nature'
      }
    ]
  },
  {
    id: 'brave_firefighter',
    title: '英勇消防员',
    pinyin: 'yīng yǒng xiāo fáng yuán',
    emoji: '🚒',
    bgColor: 'bg-rose-50 text-slate-800',
    accentColor: 'rose',
    description: '消防中队演练场上，警笛长鸣。一辆崭新威风的红色大消防车正伸展开长长的金色云梯。英勇的张班长穿着全套反光战斗服，端起粗重的水枪，喷出一道巨大的雪白水柱，准确扑向模拟火点。',
    explorePoints: [
      {
        id: 'fire_car',
        label: '红消防车',
        pinyin: 'hóng xiāo fáng chē',
        description: '车身上装着警灯、卷着大量长水带的大红吉普消防车，在灯光下十分神气亮眼。',
        x: 82,
        y: 50,
        type: 'object'
      },
      {
        id: 'shuiqiang',
        label: '高压水枪',
        pinyin: 'gāo yā shuǐ qiāng',
        description: '亮银色的金属水枪喷射出又粗又猛的水箭，发出呼呼风声，像是一条破雾出洞的水小白龙。',
        x: 45,
        y: 55,
        type: 'object'
      },
      {
        id: 'helmet_gold',
        label: '钢头盔',
        pinyin: 'gāng tóu kuī',
        description: '张班长头顶扣着的亮黑色绝缘防护面罩帽，上面刷着金黄色国徽，重沉沉特别有安全感。',
        x: 15,
        y: 35,
        type: 'object'
      },
      {
        id: 'zhang_bz',
        label: '张班长',
        pinyin: 'zhāng bān zhǎng',
        description: '身材结实像堵墙的张班长挺着胸膛，正牢牢抱住高压枪头，眼睛直视前方毫不害怕。',
        x: 18,
        y: 52,
        type: 'person'
      },
      {
        id: 'yunti',
        label: '金云梯',
        pinyin: 'jīn yún tī',
        description: '能一直伸到二十层大楼顶的超高大铁齿银梯，像一条长天桥架在湛蓝的高空。',
        x: 48,
        y: 28,
        type: 'object'
      }
    ]
  },
  {
    id: 'sweet_bakery',
    title: '香甜面包店',
    pinyin: 'xiāng tián miàn bāo diàn',
    emoji: '🥖',
    bgColor: 'bg-amber-50 text-amber-950',
    accentColor: 'amber',
    description: '街角面包房前飘散着暖烘烘的黄油乳香。玻璃柜台里整齐摆着刚烤出的金黄可颂和法棍面包。胖乎乎的小熊烘焙师手套着大隔热棉垫，正小心推着一盘冒着白气、缀满草莓的甜心派。',
    explorePoints: [
      {
        id: 'kesong',
        label: '金黄可颂',
        pinyin: 'jīn huáng kě sòng',
        description: '金黄酥脆像一弯弯小月牙一般好看的可颂油面酥，用手指轻轻一碰就会落渣。',
        x: 48,
        y: 65,
        type: 'object'
      },
      {
        id: 'hongbeishi',
        label: '熊烘焙师',
        pinyin: 'xióng hōng bèi shī',
        description: '穿着大白围裙、戴着高白帽的小熊烘焙叔叔，正对着香脆的草莓派满足地舔着大嘴巴。',
        x: 22,
        y: 55,
        type: 'person'
      },
      {
        id: 'yugui',
        label: '温砖烤炉',
        pinyin: 'wēn zhuān kǎo lú',
        description: '橘红色大方烤砖箱里正散发出红红的炉光，把松软的面团渐渐烤成金黄大面包。',
        x: 80,
        y: 45,
        type: 'object'
      },
      {
        id: 'caomeipai',
        label: '草莓点心',
        pinyin: 'cǎo méi diǎn xīn',
        description: '雪白圆盘里盛着的草莓夹心大红派，香气飘了一街上，直叫人忍不住流口水。',
        x: 48,
        y: 50,
        type: 'object'
      },
      {
        id: 'milk_jug',
        label: '新鲜牛奶',
        pinyin: 'xīn xiān niú nǎi',
        description: '柜台上整起放着的胖玻璃瓶装牛奶，白润光滑，是烤制点心必不可少的小助手。',
        x: 82,
        y: 72,
        type: 'object'
      }
    ]
  },
  {
    id: 'swimming_fun',
    title: '夏日游泳池',
    pinyin: 'xià rì yóu yǒng chí',
    emoji: '🏊',
    bgColor: 'bg-sky-50 text-sky-955',
    accentColor: 'sky',
    description: '夏天的泳池边凉意阵阵，蔚蓝湛白的水花在阳光下熠熠生辉。小雅戴着粉色泳帽和防水镜，套着一个画着大熊猫的亮眼游泳圈在浅水区快活地踩着水花，欢笑声在整个游泳馆回荡。',
    explorePoints: [
      {
        id: '泳镜',
        label: '大泳镜',
        pinyin: 'dà yǒng jìng',
        description: '黑橡胶圈的大防水镜子紧扣在眼外，在蓝蓝的水底也能睁着大眼看清游走的小红鱼。',
        x: 48,
        y: 35,
        type: 'object'
      },
      {
        id: '泳圈',
        label: '熊猫泳圈',
        pinyin: 'xióng māo yǒng quān',
        description: '圆滚滚胖嘟嘟的花猫气圈套在肚子上，像个大气垫一样把我们稳托在水面上。',
        x: 48,
        y: 60,
        type: 'object'
      },
      {
        id: '水花',
        label: '亮白水花',
        pinyin: 'liàng bái shuǐ huā',
        description: '啪嗒啪嗒一踩水，就飞起了一排像珍珠项链一般耀眼的白晶水浪，凉丝丝的。',
        x: 45,
        y: 72,
        type: 'nature'
      },
      {
        id: '小雅',
        label: '泳娃小雅',
        pinyin: 'yǒng wá xiǎo yǎ',
        description: '勇敢的小雅正划动着一双大长腿，高兴得不停用双手在水里拍水写拼音。',
        x: 18,
        y: 50,
        type: 'person'
      },
      {
        id: 'tiao_tai',
        label: '高跳水台',
        pinyin: 'gāo tiào shuǐ tái',
        description: '湛蓝池子旁立着的高高白跳板，像是一条长白滑滑梯，大哥哥们正排队从上面飞下。',
        x: 82,
        y: 30,
        type: 'object'
      }
    ]
  },
  {
    id: 'snow_skiing',
    title: '快乐滑雪场',
    pinyin: 'kuài lè huá xuě chǎng',
    emoji: '🎿',
    bgColor: 'bg-blue-50 text-slate-800',
    accentColor: 'blue',
    description: '寒假的天白雪皑皑，宽阔的高山滑雪场上寒风刮脸。小亮手里紧攥着防滑滑雪杖，脚蹬长条条的长金属滑皮，弓着身子顺着大白雪道从山坡顶“嗖”地飞速下滑，雪雾弥漫在他身后，太拉风了。',
    explorePoints: [
      {
        id: 'xue_banyin',
        label: '长雪板',
        pinyin: 'cháng xuě bǎn',
        description: '踩在长统靴下的两根细长红斑滑雪板，在白滑雪地上划出了两条亮银光滑小跑道。',
        x: 45,
        y: 72,
        type: 'object'
      },
      {
        id: 'xuezhang',
        label: '双雪杖',
        pinyin: 'shuāng xuě zhàng',
        description: '用两只细铁杖往身后使劲一戳一推，身子就嗖地一下像大飞鹰一般在雪上飘飞。',
        x: 18,
        y: 65,
        type: 'object'
      },
      {
        id: 'xue_dao',
        label: '大滑雪道',
        pinyin: 'dà huá xuě dào',
        description: '顺着陡陡的山洼铺设的长白雪毯子路，像极了冰雪王国里的大大流滑梯。',
        x: 52,
        y: 48,
        type: 'nature'
      },
      {
        id: 'skier_boy',
        label: '雪娃小亮',
        pinyin: 'xuě wá xiǎo liàng',
        description: '套着厚红棉服、弓背收腹的小亮，脸上戴着橘色大风镜，正神气地往前飞快漂移。',
        x: 15,
        y: 50,
        type: 'person'
      },
      {
        id: 'ear_muff',
        label: '棉耳罩',
        pinyin: 'mián ěr zhào',
        description: '毛茸茸的红色护耳大球球紧贴在两腮，捂得暖气腾腾，狂风再大也一点不冷。',
        x: 48,
        y: 30,
        type: 'object'
      }
    ]
  },
  {
    id: 'fruit_stand',
    title: '缤纷水果摊',
    pinyin: 'bīn fēn shuǐ guǒ tān',
    emoji: '🍉',
    bgColor: 'bg-emerald-50 text-slate-900',
    accentColor: 'emerald',
    description: '集市里的缤纷水果摊上琳琅满目。红澄澄的圆西瓜被切开一小半，露出了鲜嫩多汁的红瓤和黑芝麻小瓜子。一大串紫色澄澄的大提子挂在木架梁下，卖水果的大猩猩伯伯微笑着大声吆喝。',
    explorePoints: [
      {
        id: 'watermelon',
        label: '大红西瓜',
        pinyin: 'dà hóng xī guā',
        description: '绿皮条纹、露着红瓤的大西瓜咬一口，甜甜的红西瓜汁直往下流，太冰爽啦。',
        x: 48,
        y: 62,
        type: 'nature'
      },
      {
        id: 'grapes',
        label: '紫提子',
        pinyin: 'zǐ tí zi',
        description: '挂满白油霜的圆滴滴紫葡萄挤满了一大束，晶莹剔透，像是一挂好看的紫珍珠链。',
        x: 18,
        y: 35,
        type: 'nature'
      },
      {
        id: 'chengzi',
        label: '黄橙子',
        pinyin: 'huáng chéng zi',
        description: '码得高高像小山坡一样的金黄大橙子，表皮亮晶晶，闻着就有一股香甜橙气。',
        x: 82,
        y: 65,
        type: 'nature'
      },
      {
        id: 'gorilla',
        label: '猩猩伯伯',
        pinyin: 'xīng xīng bó bo',
        description: '穿着蓝围兜的猩猩叔叔正举着一杆大红秤，扯着大粗嗓子唤路过的小朋友买甜瓜。',
        x: 22,
        y: 50,
        type: 'person'
      },
      {
        id: 'chengpang',
        label: '挂盘秤',
        pinyin: 'guà pán chèng',
        description: '挂在架子上的一杆大圆表盘秤，只要放上苹果，红色的大指针就会嘀嘀打转转。',
        x: 48,
        y: 28,
        type: 'object'
      }
    ]
  },
  {
    id: 'magic_forest',
    title: '奇幻魔法林',
    pinyin: 'qí huàn mó fǎ lín',
    emoji: '🍄',
    bgColor: 'bg-purple-900/50 text-purple-50',
    accentColor: 'purple',
    description: '在被荧光孢子填满的落叶大森林里，立着几只红伞盖、白斑点的魔法巨型蘑菇。一只小梅花鹿在软绵绵的青苔小路中间低头喝溪水。一颗金黄金黄的许愿种子正从古树洞上方悬浮升起。',
    explorePoints: [
      {
        id: 'mogu',
        label: '红伞蘑菇',
        pinyin: 'hóng sǎn mó gu',
        description: '戴着耀眼白圆斑大圆红伞帽的小红菇，立在老树底下，好像是一把打开的小红伞。',
        x: 18,
        y: 62,
        type: 'nature'
      },
      {
        id: 'deer',
        label: '梅花鹿',
        pinyin: 'méi huā lù',
        description: '长着斑点、细长腿的大眼睛小鹿，正温柔地在青色水洼里舔着带着草香的甜露水。',
        x: 48,
        y: 55,
        type: 'person'
      },
      {
        id: 'seed_wish',
        label: '金种子',
        pinyin: 'jīn zhǒng zǐ',
        description: '泛着一缕缕暖金色圆圈圈的透明大魔法种子，浮在半空摇来摇去，像个大萤火虫。',
        x: 48,
        y: 25,
        type: 'object'
      },
      {
        id: 'laoshudong',
        label: '老树洞',
        pinyin: 'lǎo shù dòng',
        description: '茂密老樟树树干上大而黑漆漆的圆大洞，是林间松鼠和小翠猫最避风雨的温暖家。',
        x: 15,
        y: 35,
        type: 'nature'
      },
      {
        id: 'elfflying',
        label: '荧光孢子',
        pinyin: 'yíng guāng bāo zǐ',
        description: '林子里飘的一点点绿色和黄色的游动金色魔法尘，吸吸气甚至觉得微甜。',
        x: 80,
        y: 30,
        type: 'nature'
      }
    ]
  },
  {
    id: 'pet_shelter',
    title: '爱心收容所',
    pinyin: 'ài xīn shōu róng suǒ',
    emoji: '🐱',
    bgColor: 'bg-orange-50 text-slate-800',
    accentColor: 'orange',
    description: '阳光和煦的社区流浪动物收容所里，小萌同学正蹲着喂一只胖嘟嘟的外大斑猫。橘色的猫盆里堆满了颗粒圆滚滚、好闻的肉香猫粮。旁边的小木窝里，一只毛卷卷的小京巴狗正欢快地冲他摇着小弯尾。',
    explorePoints: [
      {
        id: 'catfood',
        label: '肉香猫粮',
        pinyin: 'ròu xiāng māo liáng',
        description: '小圆形香喷喷的牛肉粒猫粮颗粒堆在一起，大黄猫啃得啧啧有声，吃得一粒不剩。',
        x: 48,
        y: 68,
        type: 'object'
      },
      {
        id: 'doggy',
        label: '卷尾京巴',
        pinyin: 'juǎn wěi jīng bā',
        description: '毛厚卷、大垂耳的小狗正扒着低栏杆，嘴里哈哧哈哧呵着气，使劲抖动大尾巴。',
        x: 82,
        y: 65,
        type: 'person'
      },
      {
        id: 'xiaomeng',
        label: '爱心小萌',
        pinyin: 'ài xīn xiǎo méng',
        description: '套着红毛衣、双手举着小塑料勺子倒温水的小萌，笑得牙尖尖都露出了酒窝。',
        x: 18,
        y: 50,
        type: 'person'
      },
      {
        id: 'bancamao',
        label: '大花橘猫',
        pinyin: 'dà huā jú māo',
        description: '背上画着红杠条的胖胖大橘猫，嘴唇周围长着长长的白胡须，吃饱了就呼噜噜。',
        x: 48,
        y: 52,
        type: 'person'
      },
      {
        id: 'pet_house',
        label: '杉木小狗屋',
        pinyin: 'shān mù xiǎo gǒu wū',
        description: '用清香松木搭起并刷着粉红小油漆的双层宠物小洋房，门口夹着漂亮的布挂饰。',
        x: 50,
        y: 25,
        type: 'object'
      }
    ]
  },
  {
    id: 'biking_fun',
    title: '林茵骑行记',
    pinyin: 'lín yīn qí xíng jì',
    emoji: '🚴',
    bgColor: 'bg-emerald-50 text-teal-950',
    accentColor: 'emerald',
    description: '星期放假，公园的河边林荫道上树影婆娑。小强同学戴着帅气的黑白配头盔，蹬着高齿绿色变速自行车飞驰。车把一侧的小铜铃“叮铃铃”发出脆响，清凉的风吹拂他的刘海，十分爽快。',
    explorePoints: [
      {
        id: 'zi_che',
        label: '变速单车',
        pinyin: 'biàn sù dān chē',
        description: '蹬板大、链条抹了香油的绿色山地变速车，跑在草丛中间的跑道上，飞速开过！',
        x: 48,
        y: 65,
        type: 'object'
      },
      {
        id: 'head_box',
        label: '护体头盔',
        pinyin: 'hù tǐ tóu kuī',
        description: '扣在脑门上的像半个圆西瓜一样的硬质安全防护壳，能让摔跟头的小朋友不受伤。',
        x: 48,
        y: 28,
        type: 'object'
      },
      {
        id: 'bell_bell',
        label: '小铜铃',
        pinyin: 'xiǎo tóng líng',
        description: '安在左车龙头的圆金属小拨铃，小手指轻轻一打就会放出像飞雀唱歌般的脆鸣。',
        x: 35,
        y: 42,
        type: 'object'
      },
      {
        id: 'road_yang',
        label: '林荫水路',
        pinyin: 'lín yīn shuǐ lù',
        description: '水杉林子夹道欢迎的小河旁红砖路上，落满了清凉的树叶，踩上去沙沙作响。',
        x: 82,
        y: 68,
        type: 'nature'
      },
      {
        id: 'xiaoqiang',
        label: '飞车小强',
        pinyin: 'fēi chē xiǎo qiáng',
        description: '套着护膝护肘、一双飞腿使劲踩踏的小强，抿住薄嘴唇，眼神执着极了。',
        x: 18,
        y: 52,
        type: 'person'
      }
    ]
  },
  {
    id: 'aquarium_trip',
    title: '梦幻水族馆',
    pinyin: 'mèng huàn shuǐ zú guǎn',
    emoji: '🐳',
    bgColor: 'bg-sky-50 text-slate-800',
    accentColor: 'sky',
    description: '海洋博览馆的玻璃深海底拱廊里太科幻了。巨幕玻璃里漂着一艘深蓝的潜水潜艇。一只体型达几十米、有着洁白肚皮的大蓝鲸从伙伴们头顶游过，无数荧光的伞晶大水母正上下飞浮。',
    explorePoints: [
      {
        id: 'whale',
        label: '庞然大鲸',
        pinyin: 'páng rán dà jīng',
        description: '肚兜白白、身段巨大的大蓝鲸，它咧着整齐像硬排梳的大胡须，在头顶大滑行。',
        x: 25,
        y: 28,
        type: 'person'
      },
      {
        id: 'shuimu',
        label: '荧光水母',
        pinyin: 'yíng guāng shuǐ mǔ',
        description: '一顶顶长满飘逸粉红长须的透明大伞蘑菇水母，一开一合在深蓝巨池里跳着伞。',
        x: 78,
        y: 45,
        type: 'nature'
      },
      {
        id: 'under_bridge',
        label: '玻璃大走廊',
        pinyin: 'bō li dà zǒu láng',
        description: '用厚厚钢化树脂贴架起的长拱桥通道，走在里面就像是在龙王大水晶宫殿里漫步。',
        x: 52,
        y: 75,
        type: 'object'
      },
      {
        id: 'star_box',
        label: '红海星',
        pinyin: 'hóng hǎi xīng',
        description: '贴在白沙底或者玻璃壁上的五角星状软生物，一动不动的像是一个红绒大别针。',
        x: 15,
        y: 65,
        type: 'nature'
      },
      {
        id: 'kids_sea',
        label: '游观学生',
        pinyin: 'yóu guān xué shēng',
        description: '同学们正仰着脖子、张大嘴巴大呼长叹，手里的小照相机亮起闪亮闪光灯。',
        x: 48,
        y: 60,
        type: 'person'
      }
    ]
  },
  {
    id: 'science_laboratory',
    title: '神奇实验室',
    pinyin: 'shén qí shí yàn shì',
    emoji: '🧪',
    bgColor: 'bg-indigo-50 text-indigo-950',
    accentColor: 'indigo',
    description: '早自习课前，三年级的科学工作室里。小兰同學戴着帅气的大塑料眼罩。她用玻璃滴管吸起一滴亮晶晶红汁，认真滴入烧杯里的蔚蓝水底，不一会澄澈色水竟然变成了好看的粉红烟雾。',
    explorePoints: [
      {
        id: 'diguan',
        label: '胶头滴管',
        pinyin: 'jiāo tóu dī guǎn',
        description: '捏一把红心胶头、细长透明的小玻璃滴管，能把红汁一滴不多不少滴进量筒里。',
        x: 48,
        y: 42,
        type: 'object'
      },
      {
        id: 'shaobei',
        label: '玻璃烧杯',
        pinyin: 'bō li shāo bēi',
        description: '长着刻度长条线的广口耐热大玻璃茶杯，正咕噜噜升起一圈圈好看的淡紫圈泡。',
        x: 48,
        y: 65,
        type: 'object'
      },
      {
        id: 'eye_glass',
        label: '防护眼镜',
        pinyin: 'háng hù yǎn jìng',
        description: '一圈阔口橡胶框的亮塑料护目罩镜，紧套在脸上挡住飞粉，让小眼睛亮闪闪。',
        x: 48,
        y: 25,
        type: 'object'
      },
      {
        id: 'shiyantable',
        label: '防腐铁桌',
        pinyin: 'fáng fǔ tiě zhuō',
        description: '黑色沉甸甸的科学演示台木桌上摆着一架亮晶晶的小显微镜，一尘不染。',
        x: 52,
        y: 80,
        type: 'object'
      },
      {
        id: 'xiaolan',
        label: '科娃小兰',
        pinyin: 'kē wá xiǎo lán',
        description: '穿着蓝外套、扣起长袖口的小兰，眼睛盯着蓝色试剂管，神情极像个小大工程师。',
        x: 18,
        y: 52,
        type: 'person'
      }
    ]
  },
  {
    id: 'morning_stretch',
    title: '晨练元气多',
    pinyin: 'chén liàn yuán qì duō',
    emoji: '🏃',
    bgColor: 'bg-emerald-50 text-slate-800',
    accentColor: 'emerald',
    description: '早晨六点半，晨雾初开的公园小广场上。张爷爷提着鸟笼慢跑舒活筋骨。草坪旁的一对大圆木秋千旁，小朋友们正双手叉腰，一二一、一二一对齐，在微风中做着朝气蓬勃的广播体操。',
    explorePoints: [
      {
        id: 'niaolong',
        label: '竹丝鸟笼',
        pinyin: 'zhú sī niǎo lóng',
        description: '精工竹条编成的圆小木笼子里，一只翠灰色画眉鸟儿正吹着悦耳动听的小口哨。',
        x: 15,
        y: 35,
        type: 'object'
      },
      {
        id: 'grandpa',
        label: '晨跑张爷爷',
        pinyin: 'chén pǎo zhāng yé ye',
        description: '虽然头发花白但跑得满脸红润的大张爷爷，套着白白背心，身骨板可结实啦。',
        x: 18,
        y: 52,
        type: 'person'
      },
      {
        id: 'exercise_run',
        label: '做操伙伴',
        pinyin: 'zuò cāo huǒ bàn',
        description: '穿着大白运动鞋、腰杆挺得像翠绿小竹竿一般的同学们，正一丝不苟伸双臂。',
        x: 48,
        y: 58,
        type: 'person'
      },
      {
        id: 'bench_park',
        label: '红漆公园椅',
        pinyin: 'hóng qī gōng yuán yǐ',
        description: '立在广玉兰底的大红木长靠背靠椅上，落着几片毛茸茸的梧桐杨飞树絮。',
        x: 80,
        y: 65,
        type: 'object'
      },
      {
        id: 'willow_spring',
        label: '大绿柳枝',
        pinyin: 'dà lǜ liǔ zhī',
        description: '刚刚被湿雾打湿的一缕缕长垂翠柳条，随晨风轻轻擦过爷爷的大肩膀衣。',
        x: 82,
        y: 28,
        type: 'nature'
      }
    ]
  },
  {
    id: 'music_band',
    title: '金星音乐会',
    pinyin: 'jīn xīng yīn yuè huì',
    emoji: '🎹',
    bgColor: 'bg-rose-50 text-rose-950',
    accentColor: 'rose',
    description: '社区剧场的彩色灯光交织着美妙声响。学校小小交响乐队正在作精彩大汇报。洋乐正甩着小蝴蝶带纽扣礼服，快活地拍打着那台巨大的黑漆音乐大钢琴，木长笛吹出宛如百灵鸟啼叫的脆响。',
    explorePoints: [
      {
        id: 'piano',
        label: '大钢琴',
        pinyin: 'dà gāng qín',
        description: '高耸出白色亮琴盖的三角重低音黑色烤漆大钢琴，一按琴键就会飞出好多音符小魔王。',
        x: 48,
        y: 52,
        type: 'object'
      },
      {
        id: 'yang_le',
        label: '小琴手洋乐',
        pinyin: 'xiǎo qín shǒu yáng lè',
        description: '小帅哥洋乐脚穿亮皮鞋、腰杆坐得笔挺，十个白皙的手指正在琴键上跳着踢踏双舞。',
        x: 45,
        y: 68,
        type: 'person'
      },
      {
        id: 'note_song',
        label: '小五线谱',
        pinyin: 'xiǎo wǔ xiàn pǔ',
        description: '夹在黑亮琴架子上的五粗线黑色乐曲记录本上，爬着一列像长腿小蚂蚁一般的音符。',
        x: 48,
        y: 32,
        type: 'object'
      },
      {
        id: 'changdi',
        label: '银白色长笛',
        pinyin: 'yín bái sè cháng dí',
        description: '一节节闪着银光、长有亮圆键的金属竹笛子，吹出的调子比春风还要细腻好听。',
        x: 18,
        y: 50,
        type: 'object'
      },
      {
        id: 'conductor_stick',
        label: '小白棒',
        pinyin: 'xiǎo bái bàng',
        description: '坐在最前方的音乐总监指挥叔叔，挥动着竹柄小白指挥棒，飞舞成一团白影子。',
        x: 80,
        y: 60,
        type: 'object'
      }
    ]
  },
  {
    id: 'toy_palace',
    title: '奇妙玩具店',
    pinyin: 'qí miào wán jù diàn',
    emoji: '🧸',
    bgColor: 'bg-amber-50 text-slate-800',
    accentColor: 'amber',
    description: '梦幻玩具博览城的大展柜里五彩缤纷。最显眼处盘坐着一只宽一米、胖乎乎有着毛绒短毛的巨型玩具抱抱熊。一串大原木火车模型正顺着圆轨发出咔哒哈嗒摩擦声，吸引了许多小伙伴。',
    explorePoints: [
      {
        id: 'bear_toy',
        label: '大绒毛熊',
        pinyin: 'dà róng máo xióng',
        description: '肚子上挂着印字粉红绸子蝴蝶结的大软棕熊，摸上去软得像是一大团温热棉花。',
        x: 48,
        y: 42,
        type: 'object'
      },
      {
        id: 'train_toy',
        label: '木火车',
        pinyin: 'mù huǒ chē',
        description: '由几节装满木块积木的木车厢拼长成的小红机车头，正在玩具木铁轨上骨碌碌转动。',
        x: 52,
        y: 72,
        type: 'object'
      },
      {
        id: 'robot',
        label: '发条机器人',
        pinyin: 'fā tiáo jī qì rén',
        description: '背上安了一根小黄金属发条的铁壳机器人，拧紧了就会卡吧卡吧挺胸阔步走直线。',
        x: 15,
        y: 52,
        type: 'object'
      },
      {
        id: 'cashier',
        label: '刷卡收银机',
        pinyin: 'shuā kǎ shōu yín jī',
        description: '叮咚一响就会吐出小纸条的彩色数字塑料收据盒子，售货阿姨正不停微笑数硬币。',
        x: 82,
        y: 60,
        type: 'object'
      },
      {
        id: 'shelfs',
        label: '玩具展示阁',
        pinyin: 'wán jù zhǎn shì gé',
        description: '被粉红色油漆刷得极明亮的大大格子杉木柜，里面码放着彩色彩泥和飞速陀螺。',
        x: 80,
        y: 25,
        type: 'object'
      }
    ]
  },
  {
    id: 'giant_carrot',
    title: '拔萝卜能手',
    pinyin: 'bá luó bo néng shǒu',
    emoji: '🥕',
    bgColor: 'bg-orange-50 text-orange-950',
    accentColor: 'orange',
    description: '秋夜泥香的自留蔬菜地里。一棵大如小水桶的橘色大红胡萝卜正埋在大黑泥土中央。小兔乖乖和乐乐同學两人一前一后，手攥着水灵灵的大萝卜樱子，嘿呦嘿呦使劲往后拔。',
    explorePoints: [
      {
        id: 'carrot_rad',
        label: '拔大萝卜',
        pinyin: 'bá dà luó bo',
        description: '地上露出半个水桶大、胖乎乎红亮橙色的超级大萝卜，咬上去指定多汁又甜又香。',
        x: 48,
        y: 62,
        type: 'nature'
      },
      {
        id: 'rabbit_help',
        label: '白小兔',
        pinyin: 'bái xiǎo tù',
        description: '长着粉红长耳朵、通红大眼珠的毛白兔，四只软爪子倒勾在泥里，正在使劲顿大腿。',
        x: 48,
        y: 45,
        type: 'person'
      },
      {
        id: 'luoboying',
        label: '青嫩叶子',
        pinyin: 'qīng nèn yè zi',
        description: '长满细软毛绒、像孔雀羽毛一样绿得滴油的胡萝卜菜叶，正被大家攥得紧紧的。',
        x: 45,
        y: 35,
        type: 'nature'
      },
      {
        id: 'lele_pull',
        label: '拉车乐乐',
        pinyin: 'lā chē lè le',
        description: '拉弓射箭般使劲蹬着草鞋的乐乐同学，小屁股都快贴着湿土了，还在使劲拔！',
        x: 18,
        y: 55,
        type: 'person'
      },
      {
        id: 'qiudi_earth',
        label: '湿土地',
        pinyin: 'shī tǔ dì',
        description: '刚刚被秋雨浇得黑紫肥嫩的大菜地，大泥块子正一点点裂出细纹裂开。',
        x: 80,
        y: 75,
        type: 'nature'
      }
    ]
  },
  {
    id: 'airport_plane',
    title: '起飞航空港',
    pinyin: 'qǐ fēi háng kōng gǎng',
    emoji: '✈️',
    bgColor: 'bg-slate-50 text-slate-900',
    accentColor: 'slate',
    description: '阳光刺眼的首都飞机场柏油跑道上。一架通体银白、翼展达数十米的巨型喷气载人航空大飞机正停靠在大玻璃登机桥旁。机身下方，胖胖的货行拖小车正在忙碌运送着彩色的行李提箱。',
    explorePoints: [
      {
        id: 'airplane_body',
        label: '喷气客机',
        pinyin: 'pēn qì kè jī',
        description: '身骨宽敞、肚皮下吊着两个圆罐子大喷气燃爆发动机的银白大飞机，在灯下特别威风。',
        x: 48,
        y: 30,
        type: 'object'
      },
      {
        id: 'dengjiqie',
        label: '玻璃栈桥',
        pinyin: 'bō li zhàn qiáo',
        description: '用透明大玻璃和白色钢筋架起的长龙大通道，能保送旅客安全走进大飞机的肚子。',
        x: 15,
        y: 45,
        type: 'object'
      },
      {
        id: 'bag_car',
        label: '行李板车',
        pinyin: 'xíng li bǎn chē',
        description: '一辆由小拖拉机拉着、挂着几个无顶车厢的大板车，上面整齐叠放着红色的大皮箱子。',
        x: 48,
        y: 72,
        type: 'object'
      },
      {
        id: 'control_box',
        label: '观星航站楼',
        pinyin: 'guān xīng háng zhàn lóu',
        description: '远方立着的圆高柱顶玻璃大航控小楼，像个大高蘑菇守着跑道，指挥起陆起落飞升。',
        x: 82,
        y: 28,
        type: 'object'
      },
      {
        id: 'fly_run_way',
        label: '柏油跑道',
        pinyin: 'bǎi yóu pǎo dào',
        description: '刷着白油划线、极亮、一望无际的黑色大沥青路跑道，像一根平铺的大黑尺。',
        x: 80,
        y: 72,
        type: 'nature'
      }
    ]
  },
  {
    id: 'ancient_town',
    title: '江南老街游',
    pinyin: 'jiāng nán lǎo jiē yóu',
    emoji: '🏮',
    bgColor: 'bg-stone-50 text-stone-900',
    accentColor: 'slate',
    description: '春日微雨中的青石江南古镇里，一排白墙青瓦的马头老沿房古意雅致。高高耸立的石拱桥下，一艘黑漆木制乌篷船正被船夫划起圈圈小水纹。两旁的小面馆门外，一挂圆红灯笼随风微微摇荡。',
    explorePoints: [
      {
        id: 'stones_bridge',
        label: '青石拱桥',
        pinyin: 'qīng shí gǒng qiáo',
        description: '圆大肚子、由几百块刻花大青石板拼砌成的半圆石长弯桥，横跨绿油油的小河。',
        x: 48,
        y: 28,
        type: 'object'
      },
      {
        id: 'wupeng',
        label: '乌篷小船',
        pinyin: 'wū péng xiǎo chuán',
        description: '罩着漆黑漆蓬子的竹编双桨小木船，在河面摇一摇就会荡下一行长长的小尾波。',
        x: 48,
        y: 65,
        type: 'object'
      },
      {
        id: 'deng_long',
        label: '大红灯笼',
        pinyin: 'dà hóng dēng long',
        description: '用细竹篾扎成、糊着薄大红布的红鼓灯，在老房檐角垂下来挂着，别提多喜庆啦。',
        x: 82,
        y: 25,
        type: 'object'
      },
      {
        id: 'chuanfu',
        label: '摆渡大伯',
        pinyin: 'bǎi dù dà bó',
        description: '戴着油亮竹斗笠、穿着棉麻马褂的划船大伯，两臂正使劲推动长木梢把。',
        x: 35,
        y: 55,
        type: 'person'
      },
      {
        id: 'stones_stairs',
        label: '石板台阶',
        pinyin: 'shí bǎn tái jiē',
        description: '生了绿油油苔藓、布满雨水印痕的湿润灰滑石台阶路，一直从厨房下到河水里。',
        x: 18,
        y: 72,
        type: 'nature'
      }
    ]
  },
  {
    id: 'family_hotpot',
    title: '温暖大火锅',
    pinyin: 'wēn nuǎn dà huǒ guō',
    emoji: '🍲',
    bgColor: 'bg-rose-50 text-rose-955',
    accentColor: 'rose',
    description: '冬节夜晚，幸福的堂屋里热流拂面。一家人围坐圆圆的实木转盘餐桌旁吃涮羊肉火锅。铜炉子中间红彤彤的木炭燃得旺盛，白滚滚的骨汤呼呼沸腾。奶奶慈祥地用木勺子给乐乐捞肥牛卷。',
    explorePoints: [
      {
        id: 'tonghuoguo',
        label: '紫铜火锅',
        pinyin: 'zǐ tóng huǒ guō',
        description: '高耸出烟囱长柱子的红亮铜皮大热锅，里面正汩汩吐着香气扑鼻的大肉骨白浓汤。',
        x: 48,
        y: 48,
        type: 'object'
      },
      {
        id: 'nainai',
        label: '慈祥奶奶',
        pinyin: 'cí xiáng nǎi nai',
        description: '架着老花镜、用发夹挽着白发的大奶奶，正夹着一块烫熟的香菇拼写给孙子吃。',
        x: 22,
        y: 45,
        type: 'person'
      },
      {
        id: 'meat_box',
        label: '粉红肉卷',
        pinyin: 'fěn hóng ròu juǎn',
        description: '切得纸薄薄、卷成蛋卷状的大鲜美羊肉片，整齐码在大瓷盘里，鲜美极了。',
        x: 48,
        y: 72,
        type: 'nature'
      },
      {
        id: 'lele_eat',
        label: '吃货乐乐',
        pinyin: 'chī huò lè le',
        description: '乐乐手里端着小白瓷蘸料碗，正直勾勾盯着锅里的大甜虾子，笑出了亮酒窝。',
        x: 15,
        y: 65,
        type: 'person'
      },
      {
        id: 'r_steam',
        label: '呼呼白气',
        pinyin: 'hū hū bái qì',
        description: '铜锅上顶冒出的像蘑菇一团一团大热蒸汽，扑在大家都红润润、暖融融的笑眼上。',
        x: 48,
        y: 20,
        type: 'nature'
      }
    ]
  },
  {
    id: 'roller_skating',
    title: '溜冰小能手',
    pinyin: 'liū bīng xiǎo néng shǒu',
    emoji: '🛼',
    bgColor: 'bg-indigo-50 text-indigo-950',
    accentColor: 'indigo',
    description: '周末社区广场上的轮滑大跑道里。小林同學弓腰、低头。他脚穿四轮粉绿排旱冰鞋，大腿像轮子一般一摆一摆，迅速刮起一阵凉风狂飙。观众大石墩旁，小伙伴们拼命地齐声拍掌大喊加油。',
    explorePoints: [
      {
        id: 'skates_box',
        label: '四轮溜冰鞋',
        pinyin: 'sì lún liū bīng xié',
        description: '套着高弹束带、底板安着四个能亮五彩光滑轮的大溜冰鞋，一滑就会转出彩色光圈。',
        x: 48,
        y: 72,
        type: 'object'
      },
      {
        id: 'huxi',
        label: '软皮护膝',
        pinyin: 'ruǎn pí hù xī',
        description: '绑在大关节上的两块厚实黑色大海绵防护垫子壳，摔跟头倒下也不怕磨坏皮。',
        x: 45,
        y: 52,
        type: 'object'
      },
      {
        id: 'lin_boy',
        label: '轮滑小林',
        pinyin: 'lún huá xiǎo lín',
        description: '套着红马甲、一双大臂往后使劲伸张划大弧的小林，跑得眼睛亮澄澄神气极啦。',
        x: 18,
        y: 48,
        type: 'person'
      },
      {
        id: 'speaker',
        label: '动感音箱',
        pinyin: 'dòng gǎn yīn xiāng',
        description: '角上立着的长天线蓝音响，正播放着一首哒哒哒极其富有劲头的体育运动主打乐。',
        x: 82,
        y: 52,
        type: 'object'
      },
      {
        id: 'fans_claps',
        label: '拍手同伴',
        pinyin: 'pāi shǒu tóng bàn',
        description: '十几个坐在大树底下、拍红了小白手掌的同学们，在使劲亮高喉咙唱运动好句子。',
        x: 80,
        y: 25,
        type: 'person'
      }
    ]
  }
];
