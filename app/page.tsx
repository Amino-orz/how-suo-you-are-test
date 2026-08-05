"use client";

import { useMemo, useState } from "react";
import {
  appearanceGroups,
  behaviorOptions,
  bmiShrink,
  characterOptions,
  improvementOptions,
  sumChecked,
  type CheckOption,
} from "./scoring";

type Answers = Record<string, string>;

const defaults: Answers = {
  hair: "c",
  belly: "d",
  proportion: "a",
  face: "c",
  posture: "b",
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

export default function Home() {
  const [step, setStep] = useState(0);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [answers, setAnswers] = useState<Answers>(defaults);
  const [behaviors, setBehaviors] = useState<string[]>([]);
  const [character, setCharacter] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);

  const toggle = (value: string, current: string[], setter: (next: string[]) => void) =>
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);

  const result = useMemo(() => {
    const bmi = bmiShrink(height, weight);
    const appearanceRows = appearanceGroups.map((group) => {
      const option = group.options.find((item) => item.value === answers[group.key]);
      return { label: group.title.replace(/^\d+\.\s*/, ""), value: option?.shrink ?? 0 };
    });
    appearanceRows.splice(2, 0, { label: "BMI 身材", value: bmi.shrink });
    const appearance = appearanceRows.reduce((sum, row) => sum + row.value, 0);
    const behavior = sumChecked(behaviors, behaviorOptions);
    const innerOffset = Math.min(10, sumChecked(character, characterOptions));
    const actionOffset = Math.min(10, sumChecked(improvements, improvementOptions));
    const shrink = Math.max(0, Math.min(100, Math.round(20 + appearance + behavior - innerOffset - actionOffset)));
    return { bmi, appearanceRows, appearance, behavior, innerOffset, actionOffset, shrink, score: 100 - shrink };
  }, [height, weight, answers, behaviors, character, improvements]);

  const level = result.score >= 90 ? ["不缩反张", "恭喜您！属于有性张力的稀有极品，男模都没你嫩", "/results/not-shrinking.jpg"]
    : result.score >= 86 ? ["微张萌芽期", "性张力微微冒头，不要嚣张，小心油腻", "/results/sprouting.jpg"]
    : result.score >= 70 ? ["不缩不张", "平淡如水，存在感刚好，不至于上头也不至于下头，安全区人设", "/results/neutral.jpg"]
    : result.score >= 50 ? ["略缩🐢", "略显拘谨，气场微塌，不算劝退但没火花，下头预备役，再缩一点就完", "/results/slightly-shrinking.jpg"]
    : result.score >= 20 ? ["恭喜您！性缩满满", "多个维度同时出现了动力不足，靠近就下头", "/results/shrinking-full.jpg"]
    : ["恭喜您！性缩爆棚", "属于性缩极品，缩穿地心，气场全塌，看一眼想逃，看两眼想报警", "/results/shrinking-exploded.jpg"];

  return (
    <main>
      <header className="topbar"><div className="brand"><span>缩</span> 性缩力实验室</div><div className="privacy">仅在本机计算 · 不上传数据</div></header>
      <div className="pageShell">
        <section className="intro">
          <p className="eyebrow">HOW SUO ARE YOU?</p>
          <h1>人类缩力观测<br/><em>一键测出你的下头指数</em></h1>
          <p className="lead">分开评估外观性缩力、行为性缩力和两类对冲项，不把任何单项特征当成对人的定论。</p>
          <div className="formula"><b>综合分 = 100 − 对冲后性缩力</b><span>分数越高，综合吸引力越强</span></div>
        </section>
        <section className="card">
          <div className="progressRow"><span>{step === 4 ? "评估结果" : `第 ${step + 1} 步 / 共 4 步`}</span><span>{step === 4 ? 100 : (step + 1) * 25}%</span></div>
          <div className="progress"><i style={{ width: `${step === 4 ? 100 : (step + 1) * 25}%` }} /></div>

          {step === 0 && <div className="panel">
            <p className="sectionNo">01 / 身材数据</p><h2>计算 BMI</h2><p className="helper">BMI 仅用衡量于身材维度，没别的意思。</p>
            <div className="numberGrid two">
              <label className="numberField"><span>身高</span><div><input type="number" min="140" max="220" value={height} onChange={e => setHeight(Number(e.target.value))}/><b>cm</b></div></label>
              <label className="numberField"><span>体重</span><div><input type="number" min="35" max="180" value={weight} onChange={e => setWeight(Number(e.target.value))}/><b>kg</b></div></label>
            </div>
            <div className="bmiPreview">BMI <strong>{result.bmi.bmi.toFixed(1)}</strong><span>{result.bmi.label}</span></div>
            <button className="primary" onClick={() => setStep(1)}>继续：外观评估 <b>→</b></button>
          </div>}

          {step === 1 && <div className="panel compact">
            <p className="sectionNo">02 / 外观性缩力</p><h2>其他外观特征</h2><p className="helper">每项 0–10 分，数值越高表示该项外观性缩力越强。</p>
            {appearanceGroups.map(group => <fieldset key={group.key}><legend>{group.title}</legend><div className="choices long">
              {group.options.map(option => <button type="button" key={option.value} className={answers[group.key] === option.value ? "selected" : ""} onClick={() => setAnswers(old => ({...old, [group.key]: option.value}))}><span>{option.label}</span></button>)}
            </div></fieldset>)}
            <div className="actions"><button className="back" onClick={() => setStep(0)}>← 返回</button><button className="primary" onClick={() => setStep(2)}>继续：行为筛选 <b>→</b></button></div>
          </div>}

          {step === 2 && <div className="panel">
            <p className="sectionNo">03 / 行为性缩力</p><h2>他有以下行为吗？</h2><p className="helper">可多选。</p>
            <CheckGroup title="8. 行为清单" note="所有选项均为负向行为" options={behaviorOptions} selected={behaviors} onToggle={value => toggle(value, behaviors, setBehaviors)}/>
            <div className="actions"><button className="back" onClick={() => setStep(1)}>← 返回</button><button className="primary" onClick={() => setStep(3)}>继续：对冲项 <b>→</b></button></div>
          </div>}

          {step === 3 && <div className="panel compact">
            <p className="sectionNo">04 / 对冲项</p><h2>风评逆转的机会来了</h2><p className="helper">可多选。</p>
            <CheckGroup title="9. 内涵对冲" note="来自个性、学识和长期相处体验" options={characterOptions} selected={character} onToggle={value => toggle(value, character, setCharacter)}/>
            <CheckGroup title="10. 主动改善对冲" note="来自可观察的投入与改变" options={improvementOptions} selected={improvements} onToggle={value => toggle(value, improvements, setImprovements)}/>
            <div className="actions"><button className="back" onClick={() => setStep(2)}>← 返回</button><button className="primary" onClick={() => setStep(4)}>查看结果 <b>↗</b></button></div>
          </div>}

          {step === 4 && <div className="panel result">
            <p className="sectionNo">综合吸引力</p><div className="scoreRing" style={{ "--score": `${result.score * 3.6}deg` } as React.CSSProperties}><div><strong>{result.score}</strong><span>/100</span></div></div>
            <h2>{level[0]}</h2><p className="resultCopy">{level[1]}</p>
            <img className="resultImage" src={level[2]} alt={`${level[0]} 测试结果配图`} />
            <div className="equation"><div><span>基础性缩力</span><b>20</b></div><i>+</i><div><span>外观</span><b>{result.appearance}</b></div><i>+</i><div><span>行为</span><b>{result.behavior}</b></div><i>−</i><div className="good"><span>内涵</span><b>{result.innerOffset}</b></div><i>−</i><div className="good"><span>改善</span><b>{result.actionOffset}</b></div></div>
            <div className="finalShrink">对冲后性缩力 <strong>{result.shrink}</strong> · 综合分 <strong>{result.score}</strong></div>
            <button className="primary full" onClick={() => { setStep(0); setAnswers(defaults); setBehaviors([]); setCharacter([]); setImprovements([]); }}>重新评估</button>
          </div>}
        </section>
      </div>
      <footer>（叠甲）仅用于参考 · 外观性缩力不等于个人价值 · 请结合真实相处体验</footer>
    </main>
  );
}
