'use strict';

/* =====================================================
   1. 데이터: 계통과 샘플 용어
   - verify: true  → "교재 대조 필요" 표시
   - 교재와 확인한 뒤 false 로 바꾸면 표시가 사라집니다.
   - 용어를 추가할 때는 id가 겹치지 않게 만들어 주세요.
   ===================================================== */
const SYSTEMS = [
  { id: 'skeletal',    name: '뼈대계' },
  { id: 'muscular',    name: '근육계' },
  { id: 'nervous',     name: '신경계' },
  { id: 'circulatory', name: '순환계' },
  { id: 'digestive',   name: '소화계' }
];

const TERMS = [
  // 뼈대계
  { id: 'sk01', system: 'skeletal', en: 'Femur', ko: '대퇴골(넙다리뼈)', desc: '허벅지에 있는 뼈로, 인체에서 가장 길고 튼튼한 뼈입니다.', verify: true },
  { id: 'sk02', system: 'skeletal', en: 'Humerus', ko: '상완골(위팔뼈)', desc: '어깨와 팔꿈치 사이의 위팔을 이루는 뼈입니다.', verify: true },
  { id: 'sk03', system: 'skeletal', en: 'Tibia', ko: '경골(정강뼈)', desc: '종아리의 두 뼈 중 안쪽에 있는 굵은 뼈로, 체중을 지탱합니다.', verify: true },
  { id: 'sk04', system: 'skeletal', en: 'Clavicle', ko: '쇄골(빗장뼈)', desc: '흉골과 견갑골을 연결하는 뼈로, 목 아래 앞쪽에서 만져집니다.', verify: true },
  { id: 'sk05', system: 'skeletal', en: 'Scapula', ko: '견갑골(어깨뼈)', desc: '등 위쪽 뒤에 있는 납작한 삼각형 모양의 뼈입니다.', verify: true },
  { id: 'sk06', system: 'skeletal', en: 'Sternum', ko: '흉골(복장뼈)', desc: '가슴 앞쪽 중앙에 있는 납작한 뼈로, 갈비뼈와 연결됩니다.', verify: true },
  // [추가] 인체 그림 퀴즈용 뼈대계 용어 4개
  { id: 'sk07', system: 'skeletal', en: 'Skull', ko: '두개골(머리뼈)', desc: '머리를 이루는 뼈의 모임으로, 뇌를 보호하고 얼굴의 형태를 만듭니다.', verify: true },
  { id: 'sk08', system: 'skeletal', en: 'Radius', ko: '요골(노뼈)', desc: '아래팔의 두 뼈 중 엄지손가락 쪽(바깥쪽)에 있는 뼈입니다.', verify: true },
  { id: 'sk09', system: 'skeletal', en: 'Ulna', ko: '척골(자뼈)', desc: '아래팔의 두 뼈 중 새끼손가락 쪽(안쪽)에 있는 뼈로, 윗부분이 팔꿈치 관절을 이룹니다.', verify: true },
  { id: 'sk10', system: 'skeletal', en: 'Pelvis', ko: '골반', desc: '좌우 관골과 천골, 미골로 이루어진 구조로, 상체의 무게를 다리로 전달하고 골반 속 장기를 보호합니다.', verify: true },

  // 근육계
  { id: 'mu01', system: 'muscular', en: 'Biceps brachii', ko: '상완이두근(위팔두갈래근)', desc: '위팔 앞쪽에 있는 근육으로, 팔꿈치를 굽히는 동작에 관여합니다.', verify: true },
  { id: 'mu02', system: 'muscular', en: 'Triceps brachii', ko: '상완삼두근(위팔세갈래근)', desc: '위팔 뒤쪽에 있는 근육으로, 팔꿈치를 펴는 동작에 관여합니다.', verify: true },
  { id: 'mu03', system: 'muscular', en: 'Deltoid', ko: '삼각근(어깨세모근)', desc: '어깨를 덮는 삼각형 모양의 근육으로, 팔을 옆으로 들어 올리는 동작에 관여합니다.', verify: true },
  { id: 'mu04', system: 'muscular', en: 'Quadriceps femoris', ko: '대퇴사두근(넙다리네갈래근)', desc: '허벅지 앞쪽의 큰 근육으로, 무릎을 펴는 동작에 관여합니다.', verify: true },
  { id: 'mu05', system: 'muscular', en: 'Gastrocnemius', ko: '비복근(장딴지근)', desc: '종아리 뒤쪽의 근육으로, 발끝을 아래로 내리는 동작에 관여합니다.', verify: true },
  { id: 'mu06', system: 'muscular', en: 'Diaphragm', ko: '횡격막(가로막)', desc: '가슴안과 배안 사이에 있는 돔 모양의 근육으로, 호흡의 주된 근육입니다.', verify: true },

  // 신경계
  { id: 'ne01', system: 'nervous', en: 'Neuron', ko: '뉴런(신경세포)', desc: '신경계의 기본 구조 및 기능 단위로, 신호를 전달하는 세포입니다.', verify: true },
  { id: 'ne02', system: 'nervous', en: 'Cerebrum', ko: '대뇌', desc: '뇌에서 가장 큰 부분으로, 감각 처리, 운동 조절, 사고, 기억 등 고등 기능을 담당합니다.', verify: true },
  { id: 'ne03', system: 'nervous', en: 'Cerebellum', ko: '소뇌', desc: '뇌의 뒤아래쪽에 있으며, 운동의 협응과 균형 유지에 관여합니다.', verify: true },
  { id: 'ne04', system: 'nervous', en: 'Brainstem', ko: '뇌줄기(뇌간)', desc: '중뇌, 뇌교, 연수로 이루어져 있으며 호흡과 심박 등 생명 유지 기능과 관련됩니다.', verify: true },
  { id: 'ne05', system: 'nervous', en: 'Spinal cord', ko: '척수', desc: '척주(척추뼈) 안에 있으며, 뇌와 몸 사이에서 신호를 전달하는 통로입니다.', verify: true },
  { id: 'ne06', system: 'nervous', en: 'Vagus nerve', ko: '미주신경', desc: '제10뇌신경으로, 심장, 폐, 소화관 등에 분포하며 부교감신경 기능에 중요합니다.', verify: true },

  // 순환계
  { id: 'ci01', system: 'circulatory', en: 'Heart', ko: '심장', desc: '근육으로 이루어진 펌프로, 혈액을 폐와 온몸으로 보냅니다.', verify: true },
  { id: 'ci02', system: 'circulatory', en: 'Artery', ko: '동맥', desc: '심장에서 나가는 혈액을 운반하는 혈관입니다.', verify: true },
  { id: 'ci03', system: 'circulatory', en: 'Vein', ko: '정맥', desc: '온몸에서 심장으로 돌아오는 혈액을 운반하는 혈관입니다.', verify: true },
  { id: 'ci04', system: 'circulatory', en: 'Capillary', ko: '모세혈관', desc: '동맥과 정맥을 잇는 가장 가는 혈관으로, 조직과 물질 교환이 일어납니다.', verify: true },
  { id: 'ci05', system: 'circulatory', en: 'Aorta', ko: '대동맥', desc: '좌심실에서 나오는 가장 큰 동맥으로, 온몸으로 혈액을 보냅니다.', verify: true },
  { id: 'ci06', system: 'circulatory', en: 'Left ventricle', ko: '좌심실', desc: '산소가 풍부한 혈액을 대동맥으로 내보내 전신으로 순환시키는 심장의 방입니다.', verify: true },

  // 소화계
  { id: 'di01', system: 'digestive', en: 'Esophagus', ko: '식도', desc: '인두와 위를 연결하는 근육관으로, 연동운동으로 음식물을 위로 보냅니다.', verify: true },
  { id: 'di02', system: 'digestive', en: 'Stomach', ko: '위', desc: '음식물을 저장하고 섞으며, 위액으로 소화를 시작하는 기관입니다.', verify: true },
  { id: 'di03', system: 'digestive', en: 'Small intestine', ko: '소장', desc: '십이지장, 공장, 회장으로 이루어져 있으며 영양소 대부분이 흡수됩니다.', verify: true },
  { id: 'di04', system: 'digestive', en: 'Large intestine', ko: '대장', desc: '수분과 전해질을 흡수하고 대변을 형성하는 기관입니다.', verify: true },
  { id: 'di05', system: 'digestive', en: 'Liver', ko: '간', desc: '배안 오른쪽 위에 있으며, 담즙 생성, 대사, 해독 등 다양한 기능을 합니다.', verify: true },
  { id: 'di06', system: 'digestive', en: 'Pancreas', ko: '췌장', desc: '소화효소를 분비하고, 인슐린 등의 호르몬도 분비하는 기관입니다.', verify: true }
];

const TERM_MAP = new Map(TERMS.map(t => [t.id, t]));

/* =====================================================
   1-2. [추가] 인체 그림 데이터 (뼈대계 앞면, SVG)
   - 그림 크기: 가로 400 × 세로 810 (viewBox)
   - 좌표는 "화면 왼쪽 = 인체의 오른쪽(R)" 기준으로 그린 뒤,
     sided: true 인 뼈는 좌우 반전하여 반대편(L)을 자동으로 만듭니다.
   - termId 는 위 TERMS 의 id 와 연결됩니다.
   - 부품(parts)의 종류
       path / ellipse / circle / rect : 뼈의 면(채움 + 테두리)
       line   : 가는 뼈(굵기 w 의 선)
       hit    : 눈에 보이지 않는 클릭 보조 영역(모바일 터치용)
       c:'detail' | 'hole' | 'dline' : 눈구멍, 구멍 등 세부 표현
       m:true : 좌우 대칭으로 한 번 더 그림
   ===================================================== */
const BONE_ART = {
  skull: {
    termId: 'sk07', sided: false,
    parts: [
      { t: 'ellipse', cx: 200, cy: 56, rx: 34, ry: 36 },
      { t: 'path', d: 'M 171 72 Q 170 94 181 102 L 219 102 Q 230 94 229 72 Z' },
      { t: 'path', d: 'M 178 96 Q 180 118 200 122 Q 220 118 222 96 Z' },
      { c: 'detail', t: 'ellipse', cx: 187, cy: 70, rx: 7.5, ry: 6.5 },
      { c: 'detail', t: 'ellipse', cx: 213, cy: 70, rx: 7.5, ry: 6.5 },
      { c: 'detail', t: 'path', d: 'M 200 78 L 195 91 Q 200 94 205 91 Z' },
      { c: 'dline', t: 'path', d: 'M 186 103 L 214 103', w: 2 }
    ]
  },
  clavicle: {
    termId: 'sk04', sided: true,
    parts: [
      { t: 'line', d: 'M 190 157 C 178 150, 168 162, 154 157 C 142 153, 134 150, 124 150', w: 8 },
      { t: 'hit',  d: 'M 190 157 C 178 150, 168 162, 154 157 C 142 153, 134 150, 124 150', w: 18 }
    ]
  },
  scapula: {
    termId: 'sk05', sided: true,
    parts: [
      { t: 'path', d: 'M 115 150 L 131 148 L 152 157 L 168 166 L 165 200 L 162 232 L 149 235 L 135 208 L 127 188 L 125 175 L 117 160 Z' },
      { t: 'ellipse', cx: 140, cy: 162, rx: 8, ry: 4.5, rot: 20 }
    ]
  },
  sternum: {
    termId: 'sk06', sided: false,
    parts: [
      { t: 'path', d: 'M 187 156 L 213 156 L 214 170 L 210 177 L 209 220 L 204 224 L 200 236 L 196 224 L 191 220 L 190 177 L 186 170 Z' },
      { c: 'dline', t: 'path', d: 'M 190 177 L 210 177', w: 1.5 },
      { t: 'hit', d: 'M 200 162 L 200 222', w: 26 }
    ]
  },
  humerus: {
    termId: 'sk02', sided: true,
    parts: [
      { t: 'circle', cx: 125, cy: 170, r: 11 },
      { t: 'ellipse', cx: 112, cy: 175, rx: 7, ry: 9 },
      { t: 'line', d: 'M 118 182 L 109 288', w: 11 },
      { t: 'ellipse', cx: 108, cy: 296, rx: 16, ry: 9 },
      { t: 'hit', d: 'M 118 182 L 109 288', w: 18 }
    ]
  },
  radius: {
    termId: 'sk08', sided: true,
    parts: [
      { t: 'ellipse', cx: 102, cy: 312, rx: 7, ry: 4.5 },
      { t: 'line', d: 'M 101 318 Q 91 362 87 410', w: 7 },
      { t: 'ellipse', cx: 86, cy: 418, rx: 10, ry: 6.5 },
      { t: 'ellipse', cx: 78, cy: 422, rx: 4, ry: 6 },
      { t: 'hit', d: 'M 101 318 Q 91 362 87 410', w: 16 }
    ]
  },
  ulna: {
    termId: 'sk09', sided: true,
    parts: [
      { t: 'ellipse', cx: 113, cy: 304, rx: 8, ry: 9 },
      { t: 'line', d: 'M 111 312 Q 109 365 100 412', w: 7 },
      { t: 'circle', cx: 100, cy: 418, r: 6 },
      { t: 'hit', d: 'M 111 312 Q 109 365 100 412', w: 16 }
    ]
  },
  pelvis: {
    termId: 'sk10', sided: false,
    parts: [
      // 관골(엉덩뼈·궁둥뼈·두덩뼈) - 오른쪽을 그리고 m:true 로 왼쪽을 자동 생성
      { t: 'path', m: true, d: 'M 188 326 C 168 318, 140 320, 126 332 C 119 344, 121 356, 131 364 L 146 374 C 144 384, 146 394, 150 402 L 150 416 C 152 428, 164 434, 178 431 L 200 426 L 200 410 L 194 406 C 184 400, 174 392, 170 378 C 166 362, 170 344, 186 332 Z' },
      // 천골과 미골
      { t: 'path', d: 'M 175 336 L 225 336 L 221 358 L 214 378 L 207 396 L 193 396 L 186 378 L 179 358 Z' },
      { t: 'path', d: 'M 195 397 L 205 397 L 203 414 L 197 414 Z' },
      // 폐쇄구멍(구멍), 천골구멍, 두덩결합선
      { c: 'hole', t: 'ellipse', m: true, cx: 173, cy: 413, rx: 9, ry: 11, rot: -15 },
      { c: 'detail', t: 'circle', m: true, cx: 191, cy: 350, r: 1.8 },
      { c: 'detail', t: 'circle', m: true, cx: 193, cy: 364, r: 1.8 },
      { c: 'detail', t: 'circle', m: true, cx: 196, cy: 378, r: 1.8 },
      { c: 'dline', t: 'path', d: 'M 200 408 L 200 426', w: 1.5 }
    ]
  },
  femur: {
    termId: 'sk01', sided: true,
    parts: [
      { t: 'circle', cx: 162, cy: 386, r: 13 },
      { t: 'line', d: 'M 157 391 L 147 403', w: 11 },
      { t: 'ellipse', cx: 142, cy: 410, rx: 9, ry: 14 },
      { t: 'ellipse', cx: 156, cy: 424, rx: 4.5, ry: 6.5 },
      { t: 'line', d: 'M 150 418 L 168 562', w: 14 },
      { t: 'ellipse', cx: 171, cy: 572, rx: 20, ry: 11 },
      { t: 'hit', d: 'M 150 418 L 168 562', w: 22 }
    ]
  },
  tibia: {
    termId: 'sk03', sided: true,
    parts: [
      { t: 'ellipse', cx: 172, cy: 586, rx: 19, ry: 8 },
      { t: 'ellipse', cx: 173, cy: 604, rx: 5, ry: 6 },
      { t: 'line', d: 'M 173 594 L 178 722', w: 12 },
      { t: 'ellipse', cx: 178, cy: 728, rx: 12, ry: 7 },
      { t: 'ellipse', cx: 187, cy: 734, rx: 5.5, ry: 9 },
      { t: 'hit', d: 'M 173 594 L 178 722', w: 20 }
    ]
  }
};

/* 클릭할 수 없는 장식 뼈(척추, 갈비뼈, 손뼈, 무릎뼈, 종아리뼈, 발뼈) */
function buildSpineParts() {
  const parts = [];
  for (let i = 0; i < 7; i++) {   // 경추 7개
    const w = 11 + i * 0.4;
    parts.push({ t: 'rect', x: 200 - w / 2, y: 108 + i * 6, w: w, h: 5, r: 2 });
  }
  for (let i = 0; i < 12; i++) {  // 흉추 12개
    const w = 14 + i * 0.5;
    parts.push({ t: 'rect', x: 200 - w / 2, y: 152 + i * 9.8, w: w, h: 8, r: 2.5 });
  }
  for (let i = 0; i < 5; i++) {   // 요추 5개
    const w = 22 + i;
    parts.push({ t: 'rect', x: 200 - w / 2, y: 270 + i * 13.2, w: w, h: 11, r: 3 });
  }
  return parts;
}

function buildRibParts() {
  const ext  = [30, 42, 52, 58, 62, 64, 64, 62, 60, 56, 46, 38];   // 갈비뼈 가쪽 돌출 정도
  const endY = [160, 177, 190, 201, 211, 217, 220];               // 1~7번 갈비뼈가 가슴뼈에 닿는 높이
  const parts = [];
  for (let i = 0; i < 12; i++) {
    const yS = 154 + i * 9.8;
    const xL = 200 - ext[i];
    let d;
    if (i < 10) {
      let xE = 190, yE;
      if (i < 7) { yE = endY[i]; }
      else { xE = 192 - (i - 6) * 10; yE = 222 + (i - 6) * 11; }   // 8~10번: 갈비뼈 활(늑골궁)
      const qx = 2 * xL - (194 + xE) / 2;
      const qy = (yS + yE) / 2 + 10 + i * 1.2;
      d = 'M 194 ' + yS.toFixed(1) + ' Q ' + qx.toFixed(1) + ' ' + qy.toFixed(1) + ' ' + xE + ' ' + yE;
    } else {                                                        // 11~12번: 뜬갈비뼈
      d = 'M 194 ' + yS.toFixed(1) + ' Q ' + (xL - 2).toFixed(1) + ' ' + (yS + 2).toFixed(1) + ' ' + (xL + 2) + ' ' + (yS + 20).toFixed(1);
    }
    parts.push({ t: 'line', d: d, w: 3.5, m: true });
  }
  return parts;
}

const DECO_ART = {
  thorax: buildSpineParts().concat(buildRibParts()),
  hands: [
    { t: 'ellipse', cx: 92, cy: 432, rx: 15, ry: 8, m: true },
    { t: 'line', d: 'M 82 436 L 72 452 L 66 468 L 63 480', w: 4.5, m: true },
    { t: 'line', d: 'M 86 440 L 83 468 L 82 490 L 81 504', w: 4.5, m: true },
    { t: 'line', d: 'M 92 441 L 92 472 L 92 498 L 92 512', w: 4.5, m: true },
    { t: 'line', d: 'M 98 441 L 100 470 L 102 494 L 103 508', w: 4.5, m: true },
    { t: 'line', d: 'M 103 439 L 108 464 L 111 482 L 112 494', w: 4, m: true }
  ],
  legs: [
    { t: 'ellipse', cx: 171, cy: 558, rx: 11, ry: 12, m: true },                 // 무릎뼈(슬개골)
    { t: 'circle', cx: 157, cy: 592, r: 5.5, m: true },                          // 종아리뼈(비골) 머리
    { t: 'line', d: 'M 158 598 L 163 724', w: 5, m: true },                      // 종아리뼈 몸통
    { t: 'ellipse', cx: 162, cy: 737, rx: 5, ry: 9, m: true }                    // 가쪽 복사
  ],
  feet: [
    { t: 'ellipse', cx: 178, cy: 752, rx: 16, ry: 9, m: true },
    { t: 'line', d: 'M 189 760 L 190 794', w: 6, m: true },
    { t: 'line', d: 'M 182 761 L 182 792', w: 4.5, m: true },
    { t: 'line', d: 'M 175 762 L 175 790', w: 4.5, m: true },
    { t: 'line', d: 'M 168 762 L 168 788', w: 4, m: true },
    { t: 'line', d: 'M 161 761 L 160 784', w: 4, m: true }
  ]
};

/* 그리는 순서(앞에 있는 것이 먼저 그려져 뒤에 깔림) */
const SKELETON_ORDER = [
  'scapula', 'deco:thorax', 'pelvis', 'sternum', 'clavicle', 'skull',
  'ulna', 'radius', 'deco:hands', 'humerus', 'femur', 'deco:legs', 'tibia', 'deco:feet'
];

const MIRROR = 'translate(400 0) scale(-1 1)';

function shapeAttrs(p) {
  switch (p.t) {
    case 'circle':
      return ['circle', 'cx="' + p.cx + '" cy="' + p.cy + '" r="' + p.r + '"'];
    case 'ellipse':
      return ['ellipse', 'cx="' + p.cx + '" cy="' + p.cy + '" rx="' + p.rx + '" ry="' + p.ry + '"' +
        (p.rot ? ' transform="rotate(' + p.rot + ' ' + p.cx + ' ' + p.cy + ')"' : '')];
    case 'rect':
      return ['rect', 'x="' + p.x + '" y="' + p.y + '" width="' + p.w + '" height="' + p.h + '" rx="' + (p.r || 2) + '"'];
    default:
      return ['path', 'd="' + p.d + '"'];
  }
}

/* 부품 목록 → SVG 문자열 (테두리 → 채움 → 세부 → 클릭영역 순서) */
function partsToSvg(parts) {
  const items = [];
  parts.forEach(p => {
    items.push({ p: p, mir: false });
    if (p.m) items.push({ p: p, mir: true });
  });
  const wrap = (mir, s) => mir ? '<g transform="' + MIRROR + '">' + s + '</g>' : s;

  let outline = '', fill = '', top = '', hit = '';
  items.forEach(item => {
    const p = item.p, mir = item.mir;
    const sa = shapeAttrs(p), tag = sa[0], attrs = sa[1];
    if (p.t === 'hit') {
      hit += wrap(mir, '<path ' + attrs + ' class="hit" style="stroke-width:' + p.w + '"/>');
    } else if (p.c === 'dline') {
      top += wrap(mir, '<path ' + attrs + ' class="dline" style="stroke-width:' + p.w + '"/>');
    } else if (p.c) {
      top += wrap(mir, '<' + tag + ' ' + attrs + ' class="' + p.c + '"/>');
    } else if (p.t === 'line') {
      outline += wrap(mir, '<path ' + attrs + ' class="ol-line" style="stroke-width:' + (p.w + 3) + '"/>');
      fill += wrap(mir, '<path ' + attrs + ' class="fl-line" style="stroke-width:' + p.w + '"/>');
    } else {
      outline += wrap(mir, '<' + tag + ' ' + attrs + ' class="ol-shape"/>');
      fill += wrap(mir, '<' + tag + ' ' + attrs + ' class="fl-shape"/>');
    }
  });
  return outline + fill + top + hit;
}

function boneGroupSvg(key) {
  const b = BONE_ART[key];
  const inner = partsToSvg(b.parts);
  const open = side => '<g class="bone" data-key="' + key + '" data-term="' + b.termId + '" data-side="' + side + '"' +
    ' role="button" tabindex="0" aria-label="뼈 구조물 선택"' + (side === 'L' ? ' transform="' + MIRROR + '"' : '') + '>';
  if (b.sided) return open('R') + inner + '</g>' + open('L') + inner + '</g>';
  return open('C') + inner + '</g>';
}

function decoGroupSvg(name) {
  return '<g class="deco" pointer-events="none">' + partsToSvg(DECO_ART[name]) + '</g>';
}

function buildSkeletonSvg() {
  const body = SKELETON_ORDER.map(item =>
    item.indexOf('deco:') === 0 ? decoGroupSvg(item.slice(5)) : boneGroupSvg(item)
  ).join('');
  return '<svg id="skeleton-svg" class="skeleton-svg" viewBox="0 0 400 810" xmlns="http://www.w3.org/2000/svg"' +
    ' role="group" aria-label="인체 앞면 뼈대 그림">' + body +
    '<text x="14" y="30" class="side-label">R</text>' +
    '<text x="386" y="30" text-anchor="end" class="side-label">L</text></svg>';
}

/* =====================================================
   2. 저장소 (localStorage)
   ===================================================== */
const STORAGE_KEY = 'anatomyStudy.v1';

/* [수정] bodyStats(인체 그림 퀴즈 기록) 추가 */
function defaultData() {
  return {
    seen: {},     // 학습한 용어  { 용어id: true }
    known: {},    // 플래시카드에서 "알고 있어요" 표시한 용어
    stats: {},    // 퀴즈 기록     { 용어id: { c: 정답수, w: 오답수 } }
    wrong: [],    // 오답노트      [용어id, ...]
    history: [],  // 퀴즈 결과 기록
    shortStats: { answered: 0, correct: 0 },              // 단답형 퀴즈 누적 기록
    bodyStats: { answered: 0, correct: 0, byTerm: {} }    // 인체 그림 퀴즈 누적 기록
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return Object.assign(defaultData(), JSON.parse(raw));
  } catch (e) {
    return defaultData();
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('저장에 실패했습니다.', e);
  }
}

let data = loadData();

/* =====================================================
   3. 공통 함수
   ===================================================== */
const $ = id => document.getElementById(id);

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function systemName(id) {
  const s = SYSTEMS.find(x => x.id === id);
  return s ? s.name : '';
}

function termsOf(systemId) {
  return systemId === 'all' ? TERMS : TERMS.filter(t => t.system === systemId);
}

function percent(c, total) {
  return total === 0 ? null : Math.round((c / total) * 100);
}

function addWrong(id) {
  if (!data.wrong.includes(id)) data.wrong.push(id);
}

/* 모든 퀴즈(객관식, 단답형, 인체 그림)가 함께 사용하는 기록 함수 (변경 없음) */
function recordAnswer(id, isCorrect) {
  const s = data.stats[id] || { c: 0, w: 0 };
  if (isCorrect) s.c++; else s.w++;
  data.stats[id] = s;
  data.seen[id] = true;
  if (!isCorrect) addWrong(id);
  saveData();
}

function updateBadge() {
  $('wrong-badge').textContent = data.wrong.length;
}

function fillSystemSelects() {
  document.querySelectorAll('.system-select').forEach(sel => {
    sel.innerHTML = '<option value="all">전체 계통</option>' +
      SYSTEMS.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  });
}

/* =====================================================
   4. 화면 전환
   ===================================================== */
let currentView = 'home';

function showView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  updateBadge();

  if (name === 'home') renderHome();
  if (name === 'terms') renderTerms();
  if (name === 'flash') buildDeck();
  if (name === 'quiz') showQuizPanel('setup');
  if (name === 'wrong') renderWrong();
  if (name === 'progress') renderProgress();

  window.scrollTo({ top: 0 });
}

/* =====================================================
   5. 홈
   ===================================================== */
function overallAccuracy() {
  let c = 0, w = 0;
  Object.values(data.stats).forEach(s => { c += s.c; w += s.w; });
  return { c, w, total: c + w, acc: percent(c, c + w) };
}

function renderHome() {
  const a = overallAccuracy();
  $('home-total').textContent = TERMS.length;
  $('home-seen').textContent = TERMS.filter(t => data.seen[t.id]).length;
  $('home-acc').textContent = a.acc === null ? '-' : a.acc + '%';
  $('home-wrong').textContent = data.wrong.length;
}

/* =====================================================
   6. 용어 학습
   ===================================================== */
function termCardHtml(t, extraHtml = '') {
  return `
    <article class="term-card">
      <div class="term-head">
        <span class="term-en">${escapeHtml(t.en)}</span>
        <span class="tag">${systemName(t.system)}</span>
      </div>
      <div class="term-ko">${escapeHtml(t.ko)}</div>
      <p class="term-desc">${escapeHtml(t.desc)}</p>
      <div class="term-meta">
        ${t.verify ? '<span class="tag tag-verify">교재 대조 필요</span>' : ''}
        ${extraHtml}
      </div>
    </article>`;
}

function renderTerms() {
  const q = $('term-search').value.trim().toLowerCase();
  const sys = $('term-system').value;
  const list = termsOf(sys).filter(t =>
    !q || t.en.toLowerCase().includes(q) || t.ko.includes(q)
  );
  $('term-count').textContent = `${list.length}개 용어`;
  $('term-list').innerHTML = list.length
    ? list.map(t => termCardHtml(t)).join('')
    : '<p class="empty">검색 결과가 없습니다.</p>';
}

/* =====================================================
   7. 플래시카드
   ===================================================== */
const flash = { deck: [], index: 0 };

function buildDeck(shuffled = false) {
  const list = termsOf($('flash-system').value);
  flash.deck = shuffled ? shuffle(list) : list.slice();
  flash.index = 0;
  $('flashcard').classList.remove('flipped');
  $('flash-msg').textContent = '';
  showFlashContent();
}

function showFlashContent() {
  if (flash.deck.length === 0) return;
  const t = flash.deck[flash.index];
  $('flash-system-label').textContent = systemName(t.system);
  $('flash-en').textContent = t.en;
  $('flash-ko').textContent = t.ko;
  $('flash-desc').textContent = t.desc;
  $('flash-progress').textContent = `${flash.index + 1} / ${flash.deck.length}`;
}

function flipCard() {
  const card = $('flashcard');
  card.classList.toggle('flipped');
  if (card.classList.contains('flipped')) {
    data.seen[flash.deck[flash.index].id] = true;
    saveData();
  }
}

function goCard(delta) {
  const next = flash.index + delta;
  if (next < 0 || next >= flash.deck.length) return;
  const card = $('flashcard');
  const wasFlipped = card.classList.contains('flipped');
  card.classList.remove('flipped');
  flash.index = next;
  // 뒤집힌 상태였다면 카드가 돌아간 뒤에 내용을 바꿉니다.
  setTimeout(showFlashContent, wasFlipped ? 250 : 0);
}

function markFlash(known) {
  const t = flash.deck[flash.index];
  data.seen[t.id] = true;
  if (known) {
    data.known[t.id] = true;
    $('flash-msg').textContent = `"${t.en}" 학습 완료로 표시했습니다.`;
  } else {
    delete data.known[t.id];
    addWrong(t.id);
    $('flash-msg').textContent = `"${t.en}"을(를) 오답노트에 저장했습니다.`;
  }
  saveData();
  updateBadge();
  if (flash.index < flash.deck.length - 1) goCard(1);
}

/* =====================================================
   8-0. [수정] 퀴즈 화면 패널 전환
   - 퀴즈 유형이 3개(객관식 / 단답형 / 인체 그림)로 늘어나
     패널 전환 함수를 하나로 통합했습니다.
   ===================================================== */
const QUIZ_PANELS = {
  mc:    ['quiz-setup',  'quiz-play',  'quiz-result'],
  short: ['short-setup', 'short-play', 'short-result'],
  body:  ['body-setup',  'body-play',  'body-result']
};

function setQuizTab(mode) {
  document.querySelectorAll('.tab').forEach(tab => {
    const on = tab.dataset.quizTab === mode;
    tab.classList.toggle('active', on);
    tab.setAttribute('aria-selected', String(on));
  });
}

function showQuizSection(mode, name) {
  Object.keys(QUIZ_PANELS).forEach(m => {
    QUIZ_PANELS[m].forEach(id => {
      $(id).hidden = !(m === mode && id.split('-')[1] === name);
    });
  });
  setQuizTab(mode);
}

function showQuizPanel(name)  { showQuizSection('mc', name); }
function showShortPanel(name) { showQuizSection('short', name); }
function showBodyPanel(name)  { showQuizSection('body', name); }

/* =====================================================
   8. 객관식 퀴즈
   ===================================================== */
const quiz = { questions: [], idx: 0, correct: 0, wrongIds: [], answered: false, system: 'all' };

function makeQuestion(term) {
  const same = shuffle(TERMS.filter(t => t.system === term.system && t.id !== term.id));
  const others = shuffle(TERMS.filter(t => t.system !== term.system));
  const distractors = same.concat(others).slice(0, 3);
  return { term, options: shuffle([term].concat(distractors)) };
}

function startQuiz() {
  quiz.system = $('quiz-system').value;
  const pool = termsOf(quiz.system);
  const countVal = $('quiz-count').value;
  const count = countVal === 'all' ? pool.length : Math.min(parseInt(countVal, 10), pool.length);

  quiz.questions = shuffle(pool).slice(0, count).map(makeQuestion);
  quiz.idx = 0;
  quiz.correct = 0;
  quiz.wrongIds = [];
  showQuizPanel('play');
  renderQuestion();
}

function renderQuestion() {
  const q = quiz.questions[quiz.idx];
  quiz.answered = false;
  $('quiz-progress').textContent = `문제 ${quiz.idx + 1} / ${quiz.questions.length}`;
  $('quiz-bar').style.width = (quiz.idx / quiz.questions.length * 100) + '%';
  $('quiz-question').textContent = q.term.en;
  $('quiz-options').innerHTML = q.options.map((o, i) =>
    `<button class="option" data-id="${o.id}"><span class="option-num">${i + 1}</span>${escapeHtml(o.ko)}</button>`
  ).join('');
  $('quiz-feedback').hidden = true;
  $('quiz-next').hidden = true;
}

function answerQuestion(chosenId) {
  if (quiz.answered) return;
  quiz.answered = true;

  const q = quiz.questions[quiz.idx];
  const isCorrect = chosenId === q.term.id;

  document.querySelectorAll('#quiz-options .option').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.id === q.term.id) btn.classList.add('correct');
    else if (btn.dataset.id === chosenId) btn.classList.add('wrong');
  });

  recordAnswer(q.term.id, isCorrect);
  updateBadge();
  if (isCorrect) quiz.correct++; else quiz.wrongIds.push(q.term.id);

  const fb = $('quiz-feedback');
  fb.hidden = false;
  fb.className = 'feedback ' + (isCorrect ? 'ok' : 'no');
  fb.innerHTML = `<strong>${isCorrect ? '정답입니다.' : '오답입니다.'}</strong> ` +
    `${escapeHtml(q.term.en)} = ${escapeHtml(q.term.ko)}<br>${escapeHtml(q.term.desc)}`;

  const last = quiz.idx === quiz.questions.length - 1;
  $('quiz-next').textContent = last ? '결과 보기' : '다음 문제';
  $('quiz-next').hidden = false;
}

function nextQuestion() {
  if (quiz.idx < quiz.questions.length - 1) {
    quiz.idx++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const total = quiz.questions.length;
  data.history.push({
    date: new Date().toISOString(),
    system: quiz.system,
    total,
    correct: quiz.correct,
    type: 'mc'
  });
  data.history = data.history.slice(-20);
  saveData();

  $('quiz-score').textContent = `${quiz.correct} / ${total} (${percent(quiz.correct, total)}%)`;
  $('quiz-result-wrong').innerHTML = quiz.wrongIds.length === 0
    ? '<p>모든 문제를 맞혔습니다. 수고하셨습니다.</p>'
    : '<h3>틀린 문제</h3>' + quiz.wrongIds.map(id => {
        const t = TERM_MAP.get(id);
        return `<div class="result-item"><strong>${escapeHtml(t.en)}</strong> — ${escapeHtml(t.ko)}</div>`;
      }).join('');
  showQuizPanel('result');
}

/* =====================================================
   8-2. 단답형 퀴즈
   - 영어 → 한글, 한글 → 영어, 혼합 출제
   - 기록은 recordAnswer()를 그대로 사용하므로
     오답은 자동으로 오답노트에 저장됩니다.
   ===================================================== */
const shortQuiz = {
  questions: [],     // [{ term, dir: 'en2ko' | 'ko2en' }]
  idx: 0,
  correct: 0,
  wrongItems: [],    // [{ term, given }]
  answered: false,
  system: 'all',
  dir: 'mix'
};

/* 비교용 문자열 정리: 공백 제거, 영문 소문자 변환 */
function normalizeAnswer(str) {
  return String(str).normalize('NFC').toLowerCase().replace(/\s+/g, '');
}

/* 정답으로 인정할 답 목록
   - 한글: '대퇴골(넙다리뼈)' → '대퇴골', '넙다리뼈', '대퇴골(넙다리뼈)' 모두 인정
   - 영어: 용어와 일치하면 인정 (대소문자, 띄어쓰기 무시)
   (인체 그림 퀴즈의 '이름 입력' 문제도 이 함수를 사용합니다.) */
function acceptedAnswers(term, dir) {
  if (dir === 'ko2en') return [normalizeAnswer(term.en)];
  const main = term.ko.replace(/\(.*?\)/g, '');
  const alias = term.ko.match(/\((.*?)\)/);
  const list = [term.ko, main];
  if (alias) list.push(alias[1]);
  return list.map(normalizeAnswer).filter(Boolean);
}

function startShortQuiz() {
  shortQuiz.system = $('short-system').value;
  shortQuiz.dir = $('short-direction').value;

  const pool = termsOf(shortQuiz.system);
  const countVal = $('short-count').value;
  const count = countVal === 'all' ? pool.length : Math.min(parseInt(countVal, 10), pool.length);

  shortQuiz.questions = shuffle(pool).slice(0, count).map(term => ({
    term,
    dir: shortQuiz.dir === 'mix' ? (Math.random() < 0.5 ? 'en2ko' : 'ko2en') : shortQuiz.dir
  }));
  shortQuiz.idx = 0;
  shortQuiz.correct = 0;
  shortQuiz.wrongItems = [];

  showShortPanel('play');
  renderShortQuestion();
}

function renderShortQuestion() {
  const q = shortQuiz.questions[shortQuiz.idx];
  const isEnKo = q.dir === 'en2ko';
  shortQuiz.answered = false;

  $('short-progress').textContent = `문제 ${shortQuiz.idx + 1} / ${shortQuiz.questions.length}`;
  $('short-bar').style.width = (shortQuiz.idx / shortQuiz.questions.length * 100) + '%';
  $('short-dir-tag').textContent = isEnKo ? '영어 → 한글' : '한글 → 영어';
  $('short-label').textContent = isEnKo
    ? '다음 영어 용어의 한글 명칭을 입력하세요.'
    : '다음 한글 명칭에 해당하는 영어 용어를 입력하세요.';
  $('short-question').textContent = isEnKo ? q.term.en : q.term.ko;

  const input = $('short-input');
  input.value = '';
  input.disabled = false;
  input.className = 'input short-input';
  input.placeholder = isEnKo ? '한글 명칭 입력' : '영어 용어 입력';

  $('short-submit').hidden = false;
  $('short-msg').textContent = '';
  $('short-feedback').hidden = true;
  $('short-next').hidden = true;
  input.focus();
}

function submitShortAnswer(e) {
  e.preventDefault();
  if (shortQuiz.answered) return;

  const q = shortQuiz.questions[shortQuiz.idx];
  const input = $('short-input');
  const given = input.value.trim();

  if (!given) {
    $('short-msg').textContent = '답을 입력해 주세요.';
    input.focus();
    return;
  }

  shortQuiz.answered = true;
  const isCorrect = acceptedAnswers(q.term, q.dir).includes(normalizeAnswer(given));

  // 단답형 누적 기록 + 공통 기록(오답노트, 진도 반영)
  data.shortStats.answered++;
  if (isCorrect) data.shortStats.correct++;
  recordAnswer(q.term.id, isCorrect);
  updateBadge();

  if (isCorrect) shortQuiz.correct++;
  else shortQuiz.wrongItems.push({ term: q.term, given });

  // 화면 표시
  const correctText = q.dir === 'en2ko' ? q.term.ko : q.term.en;
  input.disabled = true;
  input.classList.add(isCorrect ? 'correct' : 'wrong');
  $('short-submit').hidden = true;
  $('short-msg').textContent = '';

  const fb = $('short-feedback');
  fb.hidden = false;
  fb.className = 'feedback ' + (isCorrect ? 'ok' : 'no');
  fb.innerHTML = isCorrect
    ? `<strong>정답입니다.</strong> 정답: ${escapeHtml(correctText)}<br>${escapeHtml(q.term.desc)}`
    : `<strong>오답입니다.</strong> 입력한 답: ${escapeHtml(given)}<br>` +
      `올바른 답: <strong>${escapeHtml(correctText)}</strong><br>${escapeHtml(q.term.desc)}<br>` +
      `<span class="muted small">오답노트에 저장되었습니다.</span>`;

  const last = shortQuiz.idx === shortQuiz.questions.length - 1;
  $('short-next').textContent = last ? '결과 보기' : '다음 문제';
  $('short-next').hidden = false;
  $('short-next').focus();
}

function nextShortQuestion() {
  if (shortQuiz.idx < shortQuiz.questions.length - 1) {
    shortQuiz.idx++;
    renderShortQuestion();
  } else {
    finishShortQuiz();
  }
}

function finishShortQuiz() {
  const total = shortQuiz.questions.length;
  data.history.push({
    date: new Date().toISOString(),
    system: shortQuiz.system,
    total,
    correct: shortQuiz.correct,
    type: 'short'
  });
  data.history = data.history.slice(-20);
  saveData();

  $('short-score').textContent = `${shortQuiz.correct} / ${total} (${percent(shortQuiz.correct, total)}%)`;
  $('short-result-wrong').innerHTML = shortQuiz.wrongItems.length === 0
    ? '<p>모든 문제를 맞혔습니다. 수고하셨습니다.</p>'
    : '<h3>틀린 문제</h3>' + shortQuiz.wrongItems.map(item =>
        `<div class="result-item"><strong>${escapeHtml(item.term.en)}</strong> — ${escapeHtml(item.term.ko)}<br>` +
        `<span class="muted small">내가 입력한 답: ${escapeHtml(item.given)}</span></div>`
      ).join('');
  showShortPanel('result');
}

/* =====================================================
   8-3. [추가] 인체 그림 퀴즈 (뼈대계 · 앞면)
   - 문제 유형
       find   : 이름을 보고 그림에서 해당 뼈를 클릭
       choice : 표시된 뼈의 이름을 4개 보기에서 선택
       input  : 표시된 뼈의 이름을 직접 입력
   - 이름은 영어 또는 한글 중 무작위로 묻습니다.
   - 기록은 recordAnswer()를 사용하므로 오답은 오답노트에 자동 저장되고
     학습 진도에도 반영됩니다.
   ===================================================== */
const BODY_KEYS = Object.keys(BONE_ART);
const BODY_TERM_IDS = BODY_KEYS.map(k => BONE_ART[k].termId);

const bodyQuiz = { questions: [], idx: 0, correct: 0, wrongItems: [], answered: false };
let skeletonReady = false;

function ensureSkeleton() {
  if (skeletonReady) return;
  $('body-svg-wrap').innerHTML = buildSkeletonSvg();
  skeletonReady = true;
}

function boneGroups(termId) {
  return Array.from($('body-svg-wrap').querySelectorAll('.bone')).filter(g => g.dataset.term === termId);
}

function clearBoneMarks() {
  $('body-svg-wrap').querySelectorAll('.bone').forEach(g => {
    g.classList.remove('is-target', 'is-correct', 'is-wrong');
  });
}

function buildBodyQuestions(count, mode) {
  let keys = [];
  while (keys.length < count) {
    const batch = shuffle(BODY_KEYS);
    if (keys.length && batch[0] === keys[keys.length - 1]) batch.push(batch.shift());
    keys = keys.concat(batch);
  }
  return keys.slice(0, count).map(key => {
    const b = BONE_ART[key];
    const types = ['find', 'choice', 'input'];
    return {
      key: key,
      term: TERM_MAP.get(b.termId),
      type: mode === 'mix' ? types[Math.floor(Math.random() * types.length)] : mode,
      lang: Math.random() < 0.5 ? 'ko' : 'en',            // 어느 언어의 이름을 묻는지
      side: b.sided ? (Math.random() < 0.5 ? 'R' : 'L') : 'C'   // 표시할 쪽(좌/우)
    };
  });
}

function startBodyQuiz() {
  const mode = $('body-mode').value;
  const count = parseInt($('body-count').value, 10) || 10;

  bodyQuiz.questions = buildBodyQuestions(count, mode);
  bodyQuiz.idx = 0;
  bodyQuiz.correct = 0;
  bodyQuiz.wrongItems = [];

  showBodyPanel('play');
  ensureSkeleton();
  renderBodyQuestion();
}

function renderBodyQuestion() {
  const q = bodyQuiz.questions[bodyQuiz.idx];
  const svg = $('skeleton-svg');
  const askName = q.lang === 'ko' ? '한글 명칭' : '영어 명칭';
  bodyQuiz.answered = false;

  clearBoneMarks();
  svg.classList.remove('locked');
  svg.classList.toggle('clickable', q.type === 'find');

  $('body-progress').textContent = `문제 ${bodyQuiz.idx + 1} / ${bodyQuiz.questions.length}`;
  $('body-bar').style.width = (bodyQuiz.idx / bodyQuiz.questions.length * 100) + '%';
  $('body-mode-tag').textContent = { find: '뼈 찾기', choice: '이름 고르기', input: '이름 입력' }[q.type];

  $('body-options').innerHTML = '';
  $('body-options').hidden = true;
  $('body-form').hidden = true;
  $('body-msg').textContent = '';
  $('body-feedback').hidden = true;
  $('body-next').hidden = true;

  if (q.type === 'find') {
    $('body-label').textContent = '다음 뼈를 그림에서 찾아 클릭하세요.';
    $('body-question').textContent = q.lang === 'ko' ? q.term.ko : q.term.en;
    return;
  }

  // 표시할 뼈를 노란색으로 강조
  boneGroups(q.term.id).forEach(g => {
    if (g.dataset.side === q.side) g.classList.add('is-target');
  });
  $('body-question').textContent = '표시된 뼈의 이름은?';

  if (q.type === 'choice') {
    $('body-label').textContent = `그림에서 노란색으로 표시된 뼈의 ${askName}을 고르세요.`;
    const others = shuffle(BODY_TERM_IDS.filter(id => id !== q.term.id)).slice(0, 3).map(id => TERM_MAP.get(id));
    const opts = shuffle([q.term].concat(others));
    $('body-options').innerHTML = opts.map((o, i) =>
      `<button class="option" data-id="${o.id}"><span class="option-num">${i + 1}</span>${escapeHtml(q.lang === 'ko' ? o.ko : o.en)}</button>`
    ).join('');
    $('body-options').hidden = false;
  } else {
    $('body-label').textContent = `그림에서 노란색으로 표시된 뼈의 ${askName}을 입력하세요.`;
    const input = $('body-input');
    input.value = '';
    input.disabled = false;
    input.className = 'input short-input';
    input.placeholder = q.lang === 'ko' ? '한글 명칭 입력' : '영어 명칭 입력';
    $('body-submit').hidden = false;
    $('body-form').hidden = false;
    // 터치 기기에서는 키보드가 그림을 가리지 않도록 자동 포커스를 하지 않습니다.
    if (!window.matchMedia('(pointer: coarse)').matches) input.focus();
  }
}

/* 그림의 뼈를 클릭했을 때 (뼈 찾기 유형) */
function onBoneClick(group) {
  const q = bodyQuiz.questions[bodyQuiz.idx];
  if (!q || bodyQuiz.answered || q.type !== 'find') return;

  const clicked = TERM_MAP.get(group.dataset.term);
  const isCorrect = clicked.id === q.term.id;
  resolveBodyAnswer(isCorrect, `${clicked.en} (${clicked.ko})`, group);
}

function answerBodyChoice(chosenId) {
  const q = bodyQuiz.questions[bodyQuiz.idx];
  if (!q || bodyQuiz.answered || q.type !== 'choice') return;

  const chosen = TERM_MAP.get(chosenId);
  document.querySelectorAll('#body-options .option').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.id === q.term.id) btn.classList.add('correct');
    else if (btn.dataset.id === chosenId) btn.classList.add('wrong');
  });
  resolveBodyAnswer(chosenId === q.term.id, q.lang === 'ko' ? chosen.ko : chosen.en, null);
}

function submitBodyInput(e) {
  e.preventDefault();
  const q = bodyQuiz.questions[bodyQuiz.idx];
  if (!q || bodyQuiz.answered || q.type !== 'input') return;

  const input = $('body-input');
  const given = input.value.trim();
  if (!given) {
    $('body-msg').textContent = '답을 입력해 주세요.';
    input.focus();
    return;
  }

  const dir = q.lang === 'ko' ? 'en2ko' : 'ko2en';   // 한글로 답하면 en2ko, 영어로 답하면 ko2en
  const isCorrect = acceptedAnswers(q.term, dir).includes(normalizeAnswer(given));
  input.disabled = true;
  input.classList.add(isCorrect ? 'correct' : 'wrong');
  $('body-submit').hidden = true;
  resolveBodyAnswer(isCorrect, given, null);
}

/* 채점 결과 반영: 기록 저장, 그림 색 표시, 설명 표시 */
function resolveBodyAnswer(isCorrect, given, clickedGroup) {
  const q = bodyQuiz.questions[bodyQuiz.idx];
  bodyQuiz.answered = true;

  // 인체 그림 퀴즈 누적 기록 + 공통 기록(오답노트, 진도 반영)
  const bs = data.bodyStats;
  bs.answered++;
  if (isCorrect) bs.correct++;
  const byTerm = bs.byTerm[q.term.id] || { c: 0, w: 0 };
  if (isCorrect) byTerm.c++; else byTerm.w++;
  bs.byTerm[q.term.id] = byTerm;
  recordAnswer(q.term.id, isCorrect);
  updateBadge();

  if (isCorrect) bodyQuiz.correct++;
  else bodyQuiz.wrongItems.push({ term: q.term, given: given });

  // 그림에 정답 여부 표시
  $('skeleton-svg').classList.add('locked');
  if (q.type === 'find') {
    if (isCorrect) {
      clickedGroup.classList.add('is-correct');
    } else {
      clickedGroup.classList.add('is-wrong');
      boneGroups(q.term.id).forEach(g => g.classList.add('is-correct'));
    }
  } else {
    boneGroups(q.term.id).forEach(g => {
      if (g.dataset.side === q.side) {
        g.classList.remove('is-target');
        g.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
      }
    });
  }

  // 설명 표시
  const givenLabel = { find: '선택한 뼈', choice: '선택한 답', input: '입력한 답' }[q.type];
  const answerText = `${escapeHtml(q.term.en)} = ${escapeHtml(q.term.ko)}`;
  const fb = $('body-feedback');
  fb.hidden = false;
  fb.className = 'feedback ' + (isCorrect ? 'ok' : 'no');
  fb.innerHTML = isCorrect
    ? `<strong>정답입니다.</strong> ${answerText}<br>${escapeHtml(q.term.desc)}`
    : `<strong>오답입니다.</strong> ${givenLabel}: ${escapeHtml(given)}<br>` +
      `정답: <strong>${answerText}</strong><br>${escapeHtml(q.term.desc)}<br>` +
      `<span class="muted small">오답노트에 저장되었습니다.</span>`;

  const last = bodyQuiz.idx === bodyQuiz.questions.length - 1;
  $('body-next').textContent = last ? '결과 보기' : '다음 문제';
  $('body-next').hidden = false;
  if (fb.scrollIntoView) fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  $('body-next').focus({ preventScroll: true });
}

function nextBodyQuestion() {
  if (bodyQuiz.idx < bodyQuiz.questions.length - 1) {
    bodyQuiz.idx++;
    renderBodyQuestion();
  } else {
    finishBodyQuiz();
  }
}

function finishBodyQuiz() {
  const total = bodyQuiz.questions.length;
  data.history.push({
    date: new Date().toISOString(),
    system: 'skeletal',
    total,
    correct: bodyQuiz.correct,
    type: 'body'
  });
  data.history = data.history.slice(-20);
  saveData();

  $('body-score').textContent = `${bodyQuiz.correct} / ${total} (${percent(bodyQuiz.correct, total)}%)`;
  $('body-result-wrong').innerHTML = bodyQuiz.wrongItems.length === 0
    ? '<p>모든 문제를 맞혔습니다. 수고하셨습니다.</p>'
    : '<h3>틀린 문제</h3>' + bodyQuiz.wrongItems.map(item =>
        `<div class="result-item"><strong>${escapeHtml(item.term.en)}</strong> — ${escapeHtml(item.term.ko)}<br>` +
        `<span class="muted small">내 답: ${escapeHtml(item.given)}</span></div>`
      ).join('');
  showBodyPanel('result');
}

/* =====================================================
   9. 오답노트
   ===================================================== */
function renderWrong() {
  const items = data.wrong.map(id => TERM_MAP.get(id)).filter(Boolean);
  $('wrong-count').textContent = `${items.length}개 용어`;
  $('wrong-clear').disabled = items.length === 0;
  $('wrong-list').innerHTML = items.length
    ? items.map(t => {
        const s = data.stats[t.id];
        const info = s && s.w ? `<span class="muted small">퀴즈 오답 ${s.w}회</span>` : '';
        const btn = `<button class="btn-small" data-remove="${t.id}">이해했어요 (삭제)</button>`;
        return termCardHtml(t, info + btn);
      }).join('')
    : '<p class="empty">오답노트가 비어 있습니다. 퀴즈에서 틀리거나 플래시카드에서 "모르겠어요"를 누른 용어가 자동으로 저장됩니다.</p>';
}

/* =====================================================
   10. 학습 진도
   ===================================================== */
const TYPE_LABELS = { mc: '객관식', short: '단답형', body: '인체 그림' };

/* [수정] 인체 그림 퀴즈 기록 표시, 최근 기록의 유형 표시 확장 */
function renderProgress() {
  const seen = TERMS.filter(t => data.seen[t.id]).length;
  const a = overallAccuracy();

  $('pg-seen').textContent = `${seen} / ${TERMS.length}`;
  $('pg-percent').textContent = percent(seen, TERMS.length) + '%';
  $('pg-answered').textContent = a.total;
  $('pg-acc').textContent = a.acc === null ? '-' : a.acc + '%';

  // 단답형 퀴즈 기록
  const ss = data.shortStats;
  $('pg-short-answered').textContent = ss.answered;
  $('pg-short-acc').textContent = ss.answered === 0 ? '-' : percent(ss.correct, ss.answered) + '%';

  // [추가] 인체 그림 퀴즈 기록
  const bs = data.bodyStats;
  $('pg-body-answered').textContent = bs.answered;
  $('pg-body-acc').textContent = bs.answered === 0 ? '-' : percent(bs.correct, bs.answered) + '%';
  $('pg-body-bones').innerHTML = BODY_KEYS.map(key => {
    const t = TERM_MAP.get(BONE_ART[key].termId);
    const s = bs.byTerm[t.id];
    const total = s ? s.c + s.w : 0;
    const acc = total ? percent(s.c, total) : null;
    return `
      <div class="sys-row">
        <div class="sys-top">
          <span>${escapeHtml(t.en)} · ${escapeHtml(t.ko)}</span>
          <span>${total ? `${s.c}/${total} (${acc}%)` : '기록 없음'}</span>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${acc === null ? 0 : acc}%"></div></div>
      </div>`;
  }).join('');

  $('pg-systems').innerHTML = SYSTEMS.map(sys => {
    const list = TERMS.filter(t => t.system === sys.id);
    const sSeen = list.filter(t => data.seen[t.id]).length;
    let c = 0, w = 0;
    list.forEach(t => {
      const s = data.stats[t.id];
      if (s) { c += s.c; w += s.w; }
    });
    const acc = percent(c, c + w);
    return `
      <div class="sys-row">
        <div class="sys-top">
          <span>${sys.name}</span>
          <span>학습 ${sSeen}/${list.length} · 정답률 ${acc === null ? '-' : acc + '%'}</span>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${percent(sSeen, list.length)}%"></div></div>
      </div>`;
  }).join('');

  const hist = data.history.slice().reverse().slice(0, 8);
  $('pg-history').innerHTML = hist.length
    ? hist.map(h => {
        const sysLabel = h.system === 'all' ? '전체 계통' : systemName(h.system);
        const typeLabel = TYPE_LABELS[h.type] || '객관식';
        const date = new Date(h.date).toLocaleDateString('ko-KR');
        return `<div class="history-row"><span>${date} · ${typeLabel} · ${sysLabel}</span><strong>${h.correct}/${h.total} (${percent(h.correct, h.total)}%)</strong></div>`;
      }).join('')
    : '<p class="muted">아직 퀴즈 기록이 없습니다.</p>';
}

/* =====================================================
   11. 이벤트 연결
   ===================================================== */
function bindEvents() {
  // data-view 속성이 있는 모든 버튼/링크: 화면 전환
  // [수정] 홈의 퀴즈 카드(data-quiz-tab="short" 또는 "body")는 해당 퀴즈 설정 화면으로 이동
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-view]');
    if (el) {
      e.preventDefault();
      showView(el.dataset.view);
      if (el.dataset.view === 'quiz' && el.dataset.quizTab) {
        showQuizSection(el.dataset.quizTab, 'setup');
      }
    }
  });

  // 용어 학습
  $('term-search').addEventListener('input', renderTerms);
  $('term-system').addEventListener('change', renderTerms);

  // 플래시카드
  $('flash-system').addEventListener('change', () => buildDeck());
  $('flash-shuffle').addEventListener('click', () => buildDeck(true));
  $('flashcard').addEventListener('click', flipCard);
  $('flashcard').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); flipCard(); }
  });
  $('flash-prev').addEventListener('click', () => goCard(-1));
  $('flash-next').addEventListener('click', () => goCard(1));
  $('flash-known').addEventListener('click', () => markFlash(true));
  $('flash-unknown').addEventListener('click', () => markFlash(false));
  document.addEventListener('keydown', e => {
    if (currentView !== 'flash') return;
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'BUTTON') return;
    if (e.key === 'ArrowLeft') goCard(-1);
    if (e.key === 'ArrowRight') goCard(1);
    if (e.key === ' ') { e.preventDefault(); flipCard(); }
  });

  // 퀴즈 탭 (객관식 / 단답형 / 인체 그림)
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => showQuizSection(tab.dataset.quizTab, 'setup'));
  });

  // 퀴즈 (객관식)
  $('quiz-start').addEventListener('click', startQuiz);
  $('quiz-next').addEventListener('click', nextQuestion);
  $('quiz-retry').addEventListener('click', () => showQuizPanel('setup'));
  $('quiz-options').addEventListener('click', e => {
    const btn = e.target.closest('.option');
    if (btn) answerQuestion(btn.dataset.id);
  });

  // 퀴즈 (단답형)
  $('short-start').addEventListener('click', startShortQuiz);
  $('short-form').addEventListener('submit', submitShortAnswer);
  $('short-next').addEventListener('click', nextShortQuestion);
  $('short-retry').addEventListener('click', () => showShortPanel('setup'));

  // [추가] 퀴즈 (인체 그림)
  $('body-start').addEventListener('click', startBodyQuiz);
  $('body-form').addEventListener('submit', submitBodyInput);
  $('body-next').addEventListener('click', nextBodyQuestion);
  $('body-retry').addEventListener('click', () => showBodyPanel('setup'));
  $('body-options').addEventListener('click', e => {
    const btn = e.target.closest('.option');
    if (btn) answerBodyChoice(btn.dataset.id);
  });
  $('body-svg-wrap').addEventListener('click', e => {
    const g = e.target.closest('.bone');
    if (g) onBoneClick(g);
  });
  $('body-svg-wrap').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const g = e.target.closest('.bone');
    if (g) { e.preventDefault(); onBoneClick(g); }
  });

  // 오답노트
  $('wrong-list').addEventListener('click', e => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    data.wrong = data.wrong.filter(id => id !== btn.dataset.remove);
    saveData();
    updateBadge();
    renderWrong();
  });
  $('wrong-clear').addEventListener('click', () => {
    if (confirm('오답노트를 모두 비우시겠습니까?')) {
      data.wrong = [];
      saveData();
      updateBadge();
      renderWrong();
    }
  });

  // 학습 기록 초기화
  $('pg-reset').addEventListener('click', () => {
    if (confirm('모든 학습 기록(진도, 정답률, 오답노트)이 삭제됩니다. 계속하시겠습니까?')) {
      data = defaultData();
      saveData();
      updateBadge();
      renderProgress();
    }
  });
}

/* =====================================================
   12. 시작
   ===================================================== */
fillSystemSelects();
bindEvents();
showView('home');