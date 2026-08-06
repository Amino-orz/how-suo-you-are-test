export type Option = { value: string; label: string; shrink: number };
export type CheckOption = { value: string; label: string; points: number };

// 统一定性标尺（单选题）：
// 多=10，较多=8，中等=6，较少=4，略微=2，不增加=0。
// 减少较少=-1，减少中等=-2，减少较多=-3。负数会直接对冲性缩力。
export const appearanceGroups = [
  {
    key: "hair",
    title: "1. 毛发与发量",
    options: [
      { value: "a", label: "A. 体毛多到可以困住蚊子，根本不愁秃顶", shrink: 10 },
      { value: "b", label: "B. 让正常人类羡慕的发量", shrink: 0 },
      { value: "c", label: "C. 正常人类的发量区间", shrink: 0 },
      { value: "d", label: "D. 似乎有一些稀疏，不知道能撑到何时", shrink: 4 },
      { value: "e", label: "E. 四周支援中央", shrink: 10 },
      { value: "f", label: "F. 一拳超人同款可以当车灯用（对不起没有说秃头不好的意思）", shrink: 8 },
    ],
  },
  {
    key: "belly",
    title: "2. 腹部状态",
    options: [
      { value: "a", label: "A. 标准中老登同款肚腩", shrink: 10 },
      { value: "b", label: "B. 轻微肚腩", shrink: 6 },
      { value: "c", label: "C. 一整块软软的腹肌（其实就是没有的意思）", shrink: 2 },
      { value: "d", label: "D. 正常人类身材", shrink: 0 },
      { value: "e", label: "E. 有明显练过的肌肉线条", shrink: -3 },
    ],
  },
  {
    key: "proportion",
    title: "4. 身材比例",
    options: [
      { value: "a", label: "A. 五五开身材", shrink: 1 },
      { value: "b", label: "B. 上半身长", shrink: 8 },
      { value: "c", label: "C. 腿长", shrink: -2 },
    ],
  },
  {
    key: "face",
    title: "5. 颜值轮廓",
    options: [
      { value: "a", label: "A. 歪瓜裂枣典型样本", shrink: 11 },
      { value: "b", label: "B. 很明显嘴凸 / 凹陷", shrink: 8 },
      { value: "c", label: "C. 有一点嘴凸 / 凹陷", shrink: 2 },
      { value: "d", label: "D. 正常", shrink: -1 },
      { value: "e", label: "E. 霸道总裁雕塑般的面庞.jpg", shrink: -3 },
    ],
  },
  {
    key: "posture",
    title: "6. 体态",
    options: [
      { value: "a", label: "A. 请去体态康复中心看看", shrink: 8 },
      { value: "b", label: "B. 有一些些常见体态问题，无法完全忽略", shrink: 3 },
      { value: "c", label: "C. 总体正常", shrink: 0 },
      { value: "d", label: "D. 挺拔有气质", shrink: -2 },
      { value: "e", label: "E. 男模", shrink: -3 },
    ],
  },
  {
    key: "skin",
    title: "7. 皮肤状况",
    options: [
      { value: "a", label: "A. 大庆油田+黑头饱满圆润 / 痘痘很多", shrink: 8 },
      { value: "b", label: "B. 痘痘 / 毛孔明显看起来完全没有管理过", shrink: 6 },
      { value: "c", label: "C. 正常，没觉得有什么特别", shrink: 0 },
      { value: "d", label: "D. 比同龄人好点", shrink: -1 },
      { value: "e", label: "E. 看起来专门护理过，平滑干净", shrink: -2 },
    ],
  },
] as const;

export const behaviorOptions: CheckOption[] = [
  { value: "clothes", label: "衣品糟糕，是中学时代会穿包臀上衣的人", points: 1 },
  { value: "greasy", label: "说话方式油腻", points: 2 },
  { value: "showoff", label: "爱装逼", points: 2.5 },
  { value: "judge", label: "爱随意点评女性", points: 1 },
  { value: "dirty", label: "有严重体味", points: 2.5 },
  { value: "dirtynails", label: "刻意留长一个指甲/指甲很长", points: 2 },
  { value: "bitter", label: "不知道为什么，但总是苦大仇深的样子", points: 1 },
  { value: "stingy", label: "很抠", points: 4 },
  { value: "vulgar", label: "爱开低俗玩笑", points: 2.5 },
  { value: "preachy", label: "爱说教、爹味很重", points: 5 },
  { value: "controlling", label: "控制欲过强", points: 3 },
  { value: "insincere", label: "不真诚，给人很虚伪的感觉", points: 5 },
];

export const characterOptions: CheckOption[] = [
  { value: "fun", label: "好像还挺有趣的？没那么讨厌了", points: 3 },
  { value: "learned", label: "有学识，大脑性感", points: 3 },
  { value: "polite", label: "对所有人都有礼貌", points: 1 },
  { value: "taste", label: "在某方面很有品味 / 很专业", points: 2 },
];

export const improvementOptions: CheckOption[] = [
  { value: "outfit", label: "穿搭让人舒服", points: 2 },
  { value: "clean", label: "清爽干净", points: 3 },
  { value: "generous", label: "舍得花💰", points: 5 },
];

export function bmiShrink(height: number, weight: number) {
  const bmi = weight / Math.pow(height / 100, 2);
  const heightAdjustment = height < 170 ? 3 : height >= 180 && height <= 188 ? -1 : 0;
  if (bmi < 18.5) return { bmi, shrink: 8 + heightAdjustment, label: "偏瘦" };
  if (bmi <= 23) return { bmi, shrink: heightAdjustment, label: "理想区间" };
  if (bmi < 25) return { bmi, shrink: 8 + heightAdjustment, label: "23–25" };
  if (bmi < 28) return { bmi, shrink: 10 + heightAdjustment, label: "25–27.9" };
  return { bmi, shrink: 10 + heightAdjustment, label: "28 及以上" };
}

export const sumChecked = (selected: string[], options: CheckOption[]) =>
  options.filter((option) => selected.includes(option.value)).reduce((sum, option) => sum + option.points, 0);
