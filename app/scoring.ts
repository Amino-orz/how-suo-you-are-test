export type Option = { value: string; label: string; shrink: number };
export type CheckOption = { value: string; label: string; points: number };

export const educationOptions: Option[] = [
  { value: "high", label: "高", shrink: 0 },
  { value: "medium", label: "中", shrink: 0 },
  { value: "low", label: "低", shrink: 2 },
];

export const incomeOptions: Option[] = [
  { value: "a9", label: "A9 级以上", shrink: -3 },
  { value: "high", label: "高", shrink: -3 },
  { value: "medium", label: "中", shrink: 0 },
  { value: "low", label: "低", shrink: 2 },
];

// 统一定性标尺（单选题）：
// 多=10，较多=8，中等=6，较少=4，略微=2，不增加=0。
// 减少较少=-1，减少中等=-2，减少较多=-3。负数会直接对冲性缩力。
export const appearanceGroups = [
  {
    key: "hair",
    title: "3. 毛发与发量",
    options: [
      { value: "a", label: "A. 体毛多到可以困住蚊子，根本不愁秃顶", shrink: 10 },
      { value: "b", label: "B. 让正常人类羡慕的发量", shrink: -1 },
      { value: "c", label: "C. 正常人类的发量区间", shrink: 0 },
      { value: "d", label: "D. 似乎有一些稀疏，不知道能撑到何时", shrink: 4 },
      { value: "e", label: "E. 四周支援中央", shrink: 11 },
      { value: "f", label: "F. 一拳超人同款可以当车灯用（对不起没有说秃头不好的意思）", shrink: 8 },
    ],
  },
  {
    key: "belly",
    title: "4. 腹部状态",
    options: [
      { value: "a", label: "A. 标准中老登同款肚腩", shrink: 11 },
      { value: "b", label: "B. 轻微肚腩", shrink: 8 },
      { value: "c", label: "C. 一整块软软的腹肌（其实就是没有的意思）", shrink: 3 },
      { value: "d", label: "D. 正常身材", shrink: 0 },
      { value: "e", label: "E. 有明显练过的肌肉线条", shrink: -3 },
    ],
  },
  {
    key: "proportion",
    title: "6. 身材比例",
    options: [
      { value: "a", label: "A. 五五开身材", shrink: 2 },
      { value: "b", label: "B. 上半身长", shrink: 8 },
      { value: "c", label: "C. 腿长", shrink: -2 },
    ],
  },
  {
    key: "face",
    title: "7. 颜值轮廓",
    options: [
      { value: "a", label: "A. 歪瓜裂枣典型样本", shrink: 15 },
      { value: "b", label: "B. 很明显嘴凸 / 凹陷", shrink: 8 },
      { value: "c", label: "C. 有一点嘴凸 / 凹陷", shrink: 5 },
      { value: "d", label: "D. 正常", shrink: -1 },
      { value: "e", label: "E. 霸道总裁雕塑般的面庞.jpg", shrink: -3 },
    ],
  },
  {
    key: "posture",
    title: "8. 体态",
    options: [
      { value: "a", label: "A. 请去体态康复中心看看", shrink: 10},
      { value: "b", label: "B. 有一些些常见体态问题，无法完全忽略", shrink:4 },
      { value: "c", label: "C. 总体正常", shrink: 0 },
      { value: "d", label: "D. 挺拔有气质", shrink: -3 },
      { value: "e", label: "E. 男模", shrink: -4 },
    ],
  },
  {
    key: "skin",
    title: "9. 皮肤状况",
    options: [
      { value: "a", label: "A. 大庆油田+黑头饱满圆润 / 痘痘很多", shrink: 9 },
      { value: "b", label: "B. 痘痘 / 毛孔明显看起来完全没有管理过", shrink: 6 },
      { value: "c", label: "C. 正常，没觉得有什么特别", shrink: 0 },
      { value: "d", label: "D. 比同龄人好点", shrink: -1 },
      { value: "e", label: "E. 看起来专门护理过，平滑干净", shrink: -2 },
    ],
  },
] as const;

export const physicalBehaviorOptions: CheckOption[] = [
  { value: "clothes", label: "衣品灾难：中学时代会穿包臀上衣的审美遗留", points: 2 },
  { value: "odor", label: "有严重体味", points: 8 },
  { value: "long-nails", label: "刻意留长小拇指指甲 / 指甲很长", points: 3 },
  { value: "shifty-eyes", label: "眼神躲闪很阴湿", points: 3 },
  { value: "bad-breath", label: "有口臭", points: 4 },
];

export const interactionBehaviorOptions: CheckOption[] = [
  { value: "greasy", label: "说话方式油腻", points: 3 },
  { value: "showoff", label: "爱装逼，炫耀式聊天", points: 4 },
  { value: "judge", label: "爱随意点评女性 / 物化女性", points: 4 },
  { value: "vulgar", label: "爱开低俗玩笑", points: 3 },
  { value: "preachy", label: "爱说教，爹味很重", points: 5 },
  { value: "insincere", label: "不真诚，很虚伪", points: 5 },
  { value: "joke-killer", label: "接话黑洞：别人抛梗他讲道理", points: 3 },
  { value: "belittle-taste", label: "打压别人的喜好", points: 4 },
  { value: "interrupt", label: "喜欢打断别人说话", points: 2 },
  { value: "degree-snob", label: "把学历挂在嘴边，看不起其他人", points: 4 },
];

export const coreBehaviorOptions: CheckOption[] = [
  { value: "stingy", label: "抠门（e.g. AA 到小数点后 / 送礼只送 pxx）", points: 5 },
  { value: "fragile", label: "玻璃心：被轻微反驳就破防", points: 4 },
  { value: "man-child", label: "巨婴感：遇事甩锅 / 等别人兜底", points: 5 },
  { value: "check-in", label: "完全不熟就开始查岗", points: 4 },
  { value: "cold-water", label: "喜欢泼冷水", points: 4 },
  { value: "no-hobbies", label: "纯躺平，没个人爱好", points: 2 },
];

export const intellectOptions: CheckOption[] = [
  { value: "learned", label: "有学识，大脑很性感🧠", points: 5 },
  { value: "quick-wit", label: "反应快能接梗，淡淡幽默感，说话不冷场", points: 4 },
  { value: "trivia", label: "冷知识专家🐗", points: 1 },
];

export const emotionOptions: CheckOption[] = [
  { value: "stable", label: "情绪稳定", points: 5 },
  { value: "sincere", label: "真诚", points: 4 },
];

export const characterBehaviorOptions: CheckOption[] = [
  { value: "polite", label: "对所有人有礼貌", points: 3 },
  { value: "listens", label: "不打断人说话", points: 2 },
  { value: "emotional-value", label: "提供情绪价值（记得小事 / 不吝啬夸人）", points: 3 },
  { value: "romantic", label: "有浪漫情趣，会准备小惊喜", points: 3 },
  { value: "boundaries", label: "边界感舒服（不会认识第二天就表白）", points: 1 },
  { value: "fun", label: "好像还挺有趣", points: 4 },
  { value: "taste", label: "在某方面很有品味、很专业", points: 3 },
];

export const selfManagementOptions: CheckOption[] = [
  { value: "outfit", label: "穿搭让人舒服", points: 2 },
  { value: "clean", label: "清爽干净（皮肤 / 头发等）", points: 3 },
  { value: "fitness", label: "体型管理", points: 2 },
];

export const otherImprovementOptions: CheckOption[] = [
  { value: "generous", label: "舍得花💰（为自己也为关系，埋单不吭声）", points: 7 },
  { value: "non-smoker", label: "不抽烟", points: 2 },
  { value: "planner", label: "会主动规划行程 / 各种活动", points: 4 },
];

export function bmiShrink(height: number, weight: number) {
  const bmi = weight / Math.pow(height / 100, 2);
  const heightAdjustment = height < 170 ? 3 : height >= 180 && height <= 188 ? -1 : 0;
  if (bmi < 18.5) return { bmi, shrink: 5 + heightAdjustment, label: "偏瘦", normal: false };
  if (bmi <= 23) return { bmi, shrink: heightAdjustment, label: "理想区间", normal: true };
  if (bmi < 25) return { bmi, shrink: 10 + heightAdjustment, label: "23–25", normal: false };
  if (bmi < 28) return { bmi, shrink: 28 + heightAdjustment, label: "25–27.9", normal: false };
  return { bmi, shrink: 10 + heightAdjustment, label: "28 及以上", normal: false };
}

export const sumChecked = (selected: string[], options: CheckOption[]) =>
  options.filter((option) => selected.includes(option.value)).reduce((sum, option) => sum + option.points, 0);
