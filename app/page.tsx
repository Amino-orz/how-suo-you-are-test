"use client";

import { useMemo, useState } from "react";
import {
  appearanceGroups,
  bmiShrink,
  characterBehaviorOptions,
  coreBehaviorOptions,
  educationOptions,
  emotionOptions,
  incomeOptions,
  intellectOptions,
  interactionBehaviorOptions,
  otherImprovementOptions,
  physicalBehaviorOptions,
  selfManagementOptions,
  sumChecked,
  type CheckOption,
  type Option,
} from "./scoring";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const LAST_STEP = 8;
type Answers = Record<string, string>;

const defaults: Answers = {
  education: "medium",
  income: "medium",
  hair: "c",
  belly: "d",
  proportion: "a",
  face: "d",
  posture: "c",
  skin: "c",
};

function CheckGroup({ title, note, options, selected, onToggle }: {
  title: string;
  note: string;
  options: CheckOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="checkGroup">
      <legend>{title}</legend>
      <p>{note}</p>
      <div className="checkList">
        {options.map((option) => (
          <label key={option.value} className={selected.includes(option.value) ? "checked" : ""}>
            <input type="checkbox" checked={selected.includes(option.value)} onChange={() => onToggle(option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SingleChoice({ title, note, options, value, onChange }: {
  title: string;
  note?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend>{title}</legend>
      {note && <p className="fieldNote">{note}</p>}
      <div className="choices">
        {options.map((option) => (
          <button type="button" key={option.value} className={value === option.value ? "selected" : ""} onClick={() => onChange(option.value)}>
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [answers, setAnswers] = useState<Answers>(defaults);
  const [physicalBehaviors, setPhysicalBehaviors] = useState<string[]>([]);
  const [interactionBehaviors, setInteractionBehaviors] = useState<string[]>([]);
  const [coreBehaviors, setCoreBehaviors] = useState<string[]>([]);
  const [character, setCharacter] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);

  const toggle = (value: string, current: string[], setter: (next: string[]) => void) =>
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);

  const interactionOptions = useMemo(
    () => answers.education === "high" ? interactionBehaviorOptions : interactionBehaviorOptions.filter(option => option.value !== "degree-snob"),
    [answers.education],
  );

  const result = useMemo(() => {
    const bmi = bmiShrink(height, weight);
    const education = educationOptions.find(option => option.value === answers.education)?.shrink ?? 0;
    const income = incomeOptions.find(option => option.value === answers.income)?.shrink ?? 0;
    const hard = education + income;
    const appearanceRows: Array<{ label: string; value: number }> = appearanceGroups.map((group) => {
      const option = group.options.find((item) => item.value === answers[group.key]);
      return { label: group.title.replace(/^\d+\.\s*/, ""), value: option?.shrink ?? 0 };
    });
    appearanceRows.splice(2, 0, { label: "BMI 身材", value: bmi.shrink });
    const appearance = appearanceRows.reduce((sum, row) => sum + row.value, 0);
    const physical = sumChecked(physicalBehaviors, physicalBehaviorOptions);
    const interaction = sumChecked(interactionBehaviors, interactionOptions);
    const core = sumChecked(coreBehaviors, coreBehaviorOptions);
    const stingyBonus = answers.income !== "low" && coreBehaviors.includes("stingy") ? 20 : 0;
    const behavior = physical + interaction + core + stingyBonus;
    const allCharacterOptions = [...intellectOptions, ...emotionOptions, ...characterBehaviorOptions];
    const innerOffset = sumChecked(character, allCharacterOptions);
    const managementOffset = selfManagementOptions
      .filter(option => improvements.includes(option.value))
      .reduce((sum, option) => sum + (option.value === "fitness" && !bmi.normal ? 0 : option.points), 0);
    const actionOffset = managementOffset + sumChecked(improvements, otherImprovementOptions);
    const shrink = Math.max(0, Math.min(100, Math.round(20 + hard + appearance + behavior - innerOffset - actionOffset)));
    return { bmi, hard, appearance, physical, interaction, core, stingyBonus, behavior, innerOffset, actionOffset, shrink, score: 100 - shrink };
  }, [height, weight, answers, physicalBehaviors, interactionBehaviors, interactionOptions, coreBehaviors, character, improvements]);

  const level = result.score >= 90 ? ["不缩反张", "恭喜您！属于有性张力的稀有极品，男模都没你嫩", "/results/not-shrinking.jpg"]
    : result.score >= 86 ? ["微张萌芽期", "性张力微微冒头，不要嚣张，小心油腻", "/results/sprouting.jpg"]
    : result.score >= 70 ? ["不缩不张", "平淡如水，存在感刚好，不至于上头也不至于下头，安全区人设", "/results/neutral.jpg"]
    : result.score >= 50 ? ["略缩🐢", "略显拘谨，气场微塌，不算劝退但没火花，下头预备役，再缩一点就完", "/results/slightly-shrinking.jpg"]
    : result.score >= 20 ? ["恭喜您！性缩满满", "多个维度同时出现了动力不足，靠近就下头", "/results/shrinking-full.jpg"]
    : ["恭喜您！性缩爆棚", "属于性缩极品，缩穿地心，气场全塌，看一眼想逃，看两眼想报警", "/results/shrinking-exploded.jpg"];

  const progress = step === LAST_STEP ? 100 : Math.round(((step + 1) / LAST_STEP) * 100);
  const setAnswer = (key: string, value: string) => setAnswers(old => ({ ...old, [key]: value }));
  const reset = () => {
    setStep(0);
    setAnswers(defaults);
    setPhysicalBehaviors([]);
    setInteractionBehaviors([]);
    setCoreBehaviors([]);
    setCharacter([]);
    setImprovements([]);
  };

  return (
    <main>
      <header className="topbar"><div className="brand"><span>缩</span> 性缩力实验室</div><div className="privacy">仅在本机计算 · 不上传数据</div></header>
      <div className="pageShell">
        <section className="intro">
          <p className="eyebrow">HOW SUO ARE YOU?</p>
          <h1>人类缩力观测<br/><em>一键测出你的下头指数</em></h1>
          <p className="lead">分开评估硬性条件、外观、行为和两类对冲项，不把任何单项特征当成对人的定论。</p>
          <div className="formula"><b>综合分 = 100 − 对冲后性缩力</b><span>分数越高，综合吸引力越强</span></div>
        </section>
        <section className="card">
          <div className="progressRow"><span>{step === LAST_STEP ? "评估结果" : `第 ${step + 1} 页 / 共 ${LAST_STEP} 页`}</span><span>{progress}%</span></div>
          <div className="progress"><i style={{ width: `${progress}%` }} /></div>

          {step === 0 && <div className="panel">
            <p className="sectionNo">01 / 身材数据</p><h2>计算 BMI</h2><p className="helper">BMI 仅用衡量于身材维度，没别的意思。</p>
            <div className="numberGrid two">
              <label className="numberField"><span>身高</span><div><input type="number" min="140" max="220" value={height} onChange={event => setHeight(Number(event.target.value))}/><b>cm</b></div></label>
              <label className="numberField"><span>体重</span><div><input type="number" min="35" max="180" value={weight} onChange={event => setWeight(Number(event.target.value))}/><b>kg</b></div></label>
            </div>
            <div className="bmiPreview">BMI <strong>{result.bmi.bmi.toFixed(1)}</strong><span>{result.bmi.label}</span></div>
            <button className="primary" onClick={() => setStep(1)}>继续：硬性条件 <b>→</b></button>
          </div>}

          {step === 1 && <div className="panel compact">
            <p className="sectionNo">02 / 硬性条件缩力</p><h2>基础条件</h2><p className="helper">选择最接近实际情况的一项。</p>
            <SingleChoice title="1. 学历" options={educationOptions} value={answers.education} onChange={value => setAnswer("education", value)} />
            <SingleChoice title="2. 收入" note="由于作者非常不 mean，此处仅定性描述，填什么你自己心里有数😊" options={incomeOptions} value={answers.income} onChange={value => setAnswer("income", value)} />
            <div className="actions"><button className="back" onClick={() => setStep(0)}>← 返回</button><button className="primary" onClick={() => setStep(2)}>继续：外观评估 <b>→</b></button></div>
          </div>}

          {step === 2 && <div className="panel compact">
            <p className="sectionNo">03 / 外观性缩力</p><h2>外观特征</h2><p className="helper">选择最接近实际情况的选项。</p>
            {appearanceGroups.map(group => <fieldset key={group.key}><legend>{group.title}</legend><div className="choices long">
              {group.options.map(option => <button type="button" key={option.value} className={answers[group.key] === option.value ? "selected" : ""} onClick={() => setAnswer(group.key, option.value)}><span>{option.label}</span></button>)}
            </div></fieldset>)}
            <div className="actions"><button className="back" onClick={() => setStep(1)}>← 返回</button><button className="primary" onClick={() => setStep(3)}>继续：物理层 <b>→</b></button></div>
          </div>}

          {step === 3 && <div className="panel">
            <p className="sectionNo">04 / 行为·物理层缩力</p><h2>感官与形象管理</h2><p className="pageTagline">不用开口就已经在缩</p><p className="helper">可多选。</p>
            <CheckGroup title="物理层行为清单" note="从第一印象就能被感知" options={physicalBehaviorOptions} selected={physicalBehaviors} onToggle={value => toggle(value, physicalBehaviors, setPhysicalBehaviors)}/>
            <div className="actions"><button className="back" onClick={() => setStep(2)}>← 返回</button><button className="primary" onClick={() => setStep(4)}>继续：互动层 <b>→</b></button></div>
          </div>}

          {step === 4 && <div className="panel">
            <p className="sectionNo">05 / 行为·互动层缩力</p><h2>🤡 言行与人品底色</h2><p className="helper">可多选。高学历选择会解锁一个额外观察项。</p>
            <CheckGroup title="互动层行为清单" note="聊了几句，人设开始掉渣" options={interactionOptions} selected={interactionBehaviors} onToggle={value => toggle(value, interactionBehaviors, setInteractionBehaviors)}/>
            <div className="actions"><button className="back" onClick={() => setStep(3)}>← 返回</button><button className="primary" onClick={() => setStep(5)}>继续：内核层 <b>→</b></button></div>
          </div>}

          {step === 5 && <div className="panel">
            <p className="sectionNo">06 / 行为·内核层缩力</p><h2>🕳️ 情绪与关系模式</h2><p className="helper">可多选。</p>
            <CheckGroup title="内核层行为清单" note="越相处，越能看见的底层模式" options={coreBehaviorOptions} selected={coreBehaviors} onToggle={value => toggle(value, coreBehaviors, setCoreBehaviors)}/>
            <div className="actions"><button className="back" onClick={() => setStep(4)}>← 返回</button><button className="primary" onClick={() => setStep(6)}>继续：内涵对冲 <b>→</b></button></div>
          </div>}

          {step === 6 && <div className="panel compact">
            <p className="sectionNo">07 / 内涵对冲</p><h2>风评逆转的机会来了</h2><p className="helper">可多选。</p>
            <CheckGroup title="1. 脑子好不好使" note="聊天质量与知识魅力" options={intellectOptions} selected={character} onToggle={value => toggle(value, character, setCharacter)}/>
            <CheckGroup title="2. 情绪" note="让人感到安心的心理质地" options={emotionOptions} selected={character} onToggle={value => toggle(value, character, setCharacter)}/>
            <CheckGroup title="3. 行为" note="在真实相处中持续加分" options={characterBehaviorOptions} selected={character} onToggle={value => toggle(value, character, setCharacter)}/>
            <div className="actions"><button className="back" onClick={() => setStep(5)}>← 返回</button><button className="primary" onClick={() => setStep(7)}>继续：主动改善 <b>→</b></button></div>
          </div>}

          {step === 7 && <div className="panel compact">
            <p className="sectionNo">08 / 主动改善对冲</p><h2>看得见的投入与改变</h2><p className="helper">可多选。BMI 不在正常范围时，“体型管理”不计对冲分。</p>
            <CheckGroup title="1. 自我管理类" note="对自己的持续照顾" options={selfManagementOptions} selected={improvements} onToggle={value => toggle(value, improvements, setImprovements)}/>
            <CheckGroup title="2. 其他行为类" note="为关系带来的主动投入" options={otherImprovementOptions} selected={improvements} onToggle={value => toggle(value, improvements, setImprovements)}/>
            <div className="actions"><button className="back" onClick={() => setStep(6)}>← 返回</button><button className="primary" onClick={() => setStep(8)}>查看结果 <b>↗</b></button></div>
          </div>}

          {step === 8 && <div className="panel result">
            <p className="sectionNo">综合吸引力</p><div className="scoreRing" style={{ "--score": `${result.score * 3.6}deg` } as React.CSSProperties}><div><strong>{result.score}</strong><span>/100</span></div></div>
            <h2>{level[0]}</h2><p className="resultCopy">{level[1]}</p>
            <img className="resultImage" src={`${BASE_PATH}${level[2]}`} alt={`${level[0]} 测试结果配图`} />
            <div className="equation"><div><span>基础</span><b>20</b></div><i>+</i><div><span>硬性</span><b>{result.hard}</b></div><i>+</i><div><span>外观</span><b>{result.appearance}</b></div><i>+</i><div><span>行为</span><b>{result.behavior}</b></div><i>−</i><div className="good"><span>内涵</span><b>{result.innerOffset}</b></div><i>−</i><div className="good"><span>改善</span><b>{result.actionOffset}</b></div></div>
            <div className="finalShrink">对冲后性缩力 <strong>{result.shrink}</strong> · 综合分 <strong>{result.score}</strong></div>
            {result.stingyBonus > 0 && <p className="resultCopy stingyVerdict">白嫖引力无穷大</p>}
            <button className="primary full" onClick={reset}>重新评估</button>
          </div>}
        </section>
      </div>
      <footer>（叠甲）仅用于参考 · 外观性缩力不等于个人价值 · 请结合真实相处体验</footer>
    </main>
  );
}
