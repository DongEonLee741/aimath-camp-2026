/* ============================================================
   data.js — 텍스트 데이터 처리 학습지 큐레이션 데이터
   명세서_텍스트데이터처리_v1.md §5.3 데이터 모델을 확장 구현.

   저작 방식 안내(선생님 편집용):
   - 속성은 이름(문자열)으로 다룬다. 단어마다 "이 속성을 가진다" 목록만 적으면
     아래 W() 함수가 0/1 벡터로 변환한다. 32개 속성 순서를 외우거나 숫자를
     세지 않아도 되므로, 단어 추가·수정이 쉽다.
   - 예: W("고양이", ["동물","생물","다리","털","반려","실내"]) 처럼 "이 단어가
     가진 속성"만 나열. 목록에 없는 속성은 자동으로 0.
   - 속성 이름을 잘못 적으면(오타) 즉시 오류를 던진다(ATTRS에 없는 이름 사용 시).
     이는 조용히 잘못된 벡터가 만들어지는 것을 막기 위함이다.
   - <script src="data.js">로 로드되는 클래식 스크립트다. fetch/JSON이 아니므로
     file://에서도 그대로 동작한다.
   ============================================================ */
(function(){
'use strict';

/* ---------- 속성 스키마 (32개) ----------
   범주(11): 이 단어가 "무엇" 인가
   특성(21): 이 단어가 "어떤" 성질을 갖는가                        */
var ATTRS = [
  "동물","식물","사람","탈것","가구","음식","자연물","기계","도구","옷","건물",
  "생물","다리","날개","바퀴","털","비늘","지느러미","반려","야생","가축",
  "큼","빠름","난다","헤엄","인공","전기","식용","움직임","소리","실내","단단함"
];
var ATTR_INDEX = {};
ATTRS.forEach(function(a, i){ ATTR_INDEX[a] = i; });

function idx(name){
  var i = ATTR_INDEX[name];
  if(i === undefined) throw new Error('data.js: 알 수 없는 속성 이름 "' + name + '" (오타 확인)');
  return i;
}
function V(traits){
  var v = new Array(ATTRS.length).fill(0);
  traits.forEach(function(t){ v[idx(t)] = 1; });
  return v;
}
var WORDS = {};
function W(name, traits){
  if(WORDS[name]) throw new Error('data.js: 단어 "' + name + '" 중복 정의');
  WORDS[name] = V(traits);
}

/* ============================================================
   단어망 — 명사 → 속성 벡터 (범주별로 묶어서 정의)
   ============================================================ */

/* 1. 반려·가축 포유류 */
var base1 = ["동물","생물","다리","움직임","소리","가축"];
W("강아지",   base1.concat(["털","반려","실내","빠름"]));
W("고양이",   base1.concat(["털","반려","실내"]));
W("토끼",     base1.concat(["털","반려","실내"]));
W("햄스터",   base1.concat(["털","반려","실내"]));
W("기니피그", base1.concat(["털","반려","실내"]));
W("소",       base1.concat(["털","큼","식용"]));
W("돼지",     base1.concat(["식용"]));
W("양",       base1.concat(["털","식용"]));
W("말",       base1.concat(["털","큼","빠름"]));

/* 2. 야생 대형 포유류 */
var base2 = ["동물","생물","다리","움직임","소리","야생","털"];
W("사자",   base2.concat(["큼","빠름"]));
W("호랑이", base2.concat(["큼","빠름"]));
W("표범",   base2.concat(["빠름"]));
W("치타",   base2.concat(["빠름"]));
W("늑대",   base2.concat(["빠름"]));
W("여우",   base2.concat([]));
W("곰",     base2.concat(["큼"]));
W("사슴",   base2.concat(["빠름"]));
W("기린",   base2.concat(["큼"]));
W("코끼리", base2.concat(["큼"]));

/* 3. 소형 야생동물 */
var base3 = ["동물","생물","다리","움직임","소리","야생","털"];
W("다람쥐",   base3.concat(["빠름"]));
W("쥐",       base3.concat(["빠름"]));
W("두더지",   base3.concat([]));
W("고슴도치", base3.concat([]));
W("너구리",   base3.concat([]));

/* 4. 새 */
var base4 = ["동물","생물","다리","날개","움직임","소리","야생"];
W("참새",   base4.concat(["난다","빠름"]));
W("비둘기", base4.concat(["난다"]));
W("까치",   base4.concat(["난다"]));
W("제비",   base4.concat(["난다","빠름"]));
W("독수리", base4.concat(["난다","큼","빠름"]));
W("부엉이", base4.concat(["난다"]));
W("펭귄",   base4.concat(["헤엄"]));
W("오리",   base4.concat(["헤엄","가축"]));
W("닭",     ["동물","생물","다리","날개","움직임","소리","가축"]);

/* 5. 수생동물 */
var base5 = ["동물","생물","움직임","헤엄","야생"];
W("금붕어", ["동물","생물","움직임","헤엄","비늘","지느러미","반려","실내"]);
W("붕어",   base5.concat(["비늘","지느러미"]));
W("참치",   base5.concat(["비늘","지느러미","큼","빠름"]));
W("상어",   base5.concat(["비늘","지느러미","큼","빠름"]));
W("고래",   base5.concat(["지느러미","큼"]));
W("돌고래", base5.concat(["지느러미","빠름"]));
W("문어",   base5.concat([]));
W("오징어", base5.concat([]));
W("거북",   ["동물","생물","다리","움직임","헤엄","야생","단단함"]);

/* 6. 곤충·파충류·양서류 */
W("개미",   ["동물","생물","다리","움직임","야생"]);
W("벌",     ["동물","생물","다리","날개","난다","움직임","소리","야생"]);
W("나비",   ["동물","생물","다리","날개","난다","움직임","야생"]);
W("잠자리", ["동물","생물","다리","날개","난다","움직임","빠름","야생"]);
W("거미",   ["동물","생물","다리","움직임","야생"]);
W("뱀",     ["동물","생물","움직임","야생","비늘"]);
W("도마뱀", ["동물","생물","다리","움직임","야생","비늘"]);
W("개구리", ["동물","생물","다리","움직임","소리","야생","헤엄"]);
W("악어",   ["동물","생물","다리","움직임","야생","비늘","헤엄","큼"]);

/* 7. 자동차류 탈것 */
var base7 = ["탈것","인공","바퀴","움직임","소리","단단함"];
W("자동차",   base7.concat(["빠름"]));
W("트럭",     base7.concat(["빠름","큼"]));
W("버스",     base7.concat(["빠름","큼"]));
W("오토바이", base7.concat(["빠름"]));
W("자전거",   ["탈것","인공","바퀴","움직임","단단함"]);

/* 8. 기차·항공·선박 탈것 */
W("기차",     ["탈것","인공","바퀴","움직임","소리","단단함","빠름","큼"]);
W("지하철",   ["탈것","인공","바퀴","움직임","소리","단단함","빠름","큼"]);
W("비행기",   ["탈것","인공","움직임","소리","단단함","빠름","큼","난다"]);
W("헬리콥터", ["탈것","인공","움직임","소리","단단함","빠름","난다"]);
W("배",       ["탈것","인공","움직임","소리","단단함","큼","헤엄"]);
W("잠수함",   ["탈것","인공","움직임","단단함","큼","헤엄"]);

/* 9. 가구 */
var base9 = ["가구","인공","단단함","실내"];
W("침대",   base9.concat(["큼"]));
W("책상",   base9.concat([]));
W("의자",   base9.concat([]));
W("소파",   base9.concat(["큼"]));
W("옷장",   base9.concat(["큼"]));
W("책장",   base9.concat(["큼"]));
W("식탁",   base9.concat([]));

/* 10. 가전·기계 */
var base10 = ["기계","인공","전기","단단함","실내"];
W("냉장고",     base10.concat(["큼"]));
W("세탁기",     base10.concat(["큼","소리"]));
W("전자레인지", base10.concat(["소리"]));
W("에어컨",     base10.concat(["큼"]));
W("선풍기",     base10.concat(["움직임"]));
W("청소기",     base10.concat(["움직임","소리"]));
W("텔레비전",   base10.concat(["소리"]));
W("컴퓨터",     base10.concat([]));

/* 11. 과일 */
var base11 = ["음식","식용","자연물"];
W("사과",   base11.concat(["단단함"]));
W("바나나", base11.concat([]));
W("딸기",   base11.concat([]));
W("포도",   base11.concat([]));
W("수박",   base11.concat(["큼","단단함"]));
W("오렌지", base11.concat(["단단함"]));

/* 12. 채소 */
var base12 = ["음식","식용","자연물"];
W("당근", base12.concat(["단단함"]));
W("양파", base12.concat([]));
W("감자", base12.concat(["단단함"]));
W("오이", base12.concat(["단단함"]));
W("토마토", base12.concat([]));
W("마늘", base12.concat(["단단함"]));

/* 13. 조리식품 */
var base13 = ["음식","식용","인공"];
W("김밥", base13.concat([]));
W("라면", base13.concat([]));
W("피자", base13.concat(["단단함"]));
W("빵",   base13.concat([]));
W("국수", base13.concat([]));
W("만두", base13.concat([]));

/* 14. 자연 지형 */
var base14 = ["자연물"];
W("산",   base14.concat(["큼","단단함"]));
W("강",   base14.concat(["움직임"]));
W("바다", base14.concat(["큼","움직임"]));
W("호수", base14.concat([]));
W("사막", base14.concat(["큼"]));
W("섬",   base14.concat(["큼"]));
W("숲",   base14.concat(["큼"]));

/* 15. 천체·기상 */
var base15 = ["자연물"];
W("하늘", base15.concat(["큼"]));
W("구름", base15.concat(["움직임"]));
W("별",   base15.concat([]));
W("달",   base15.concat(["큼"]));
W("태양", base15.concat(["큼"]));
W("비",   base15.concat(["움직임","소리"]));
W("눈",   base15.concat(["움직임"]));
W("바람", base15.concat(["움직임","소리","빠름"]));

/* 16. 사람·직업 */
var base16 = ["사람","생물","다리","움직임","소리"];
W("의사",     base16.concat([]));
W("선생님",   base16.concat([]));
W("경찰관",   base16.concat(["빠름"]));
W("소방관",   base16.concat(["빠름","큼"]));
W("요리사",   base16.concat([]));
W("화가",     base16.concat([]));
W("가수",     base16.concat([]));
W("운동선수", base16.concat(["빠름","큼"]));

/* 17. 옷·잡화 */
var base17 = ["옷","인공"];
W("모자",   base17.concat([]));
W("신발",   base17.concat(["단단함"]));
W("장갑",   base17.concat([]));
W("목도리", base17.concat([]));
W("양말",   base17.concat([]));
W("가방",   base17.concat(["단단함"]));

/* 18. 문구·도구 */
var base18 = ["도구","인공"];
W("가위",   base18.concat(["단단함"]));
W("연필",   base18.concat(["단단함"]));
W("지우개", base18.concat([]));
W("자",     base18.concat(["단단함"]));
W("풀",     base18.concat([]));
W("테이프", base18.concat(["단단함"]));

/* 19. 식물 */
var base19 = ["식물","생물","자연물"];
W("나무",   base19.concat(["큼"]));
W("꽃",     base19.concat([]));
W("잔디",   base19.concat([]));
W("선인장", base19.concat([]));
W("소나무", base19.concat(["큼"]));

/* 20. 건물·장소 */
var base20 = ["건물","인공","큼","단단함"];
W("학교",   base20.concat(["실내"]));
W("도서관", base20.concat(["실내"]));
W("교회",   base20.concat(["실내"]));
W("병원",   base20.concat(["실내","소리"]));
W("소방서", base20.concat(["실내","소리"]));
W("시장",   base20.concat(["실내","소리"]));
W("공원",   base20.concat([]));

/* ============================================================
   동의어(입력 정규화) — 흔한 구어체·변형을 단어망 표제어로
   ============================================================ */
var SYNONYMS = {
  "댕댕이":"강아지", "멍멍이":"강아지", "강쥐":"강아지", "개":"강아지",
  "냥이":"고양이", "야옹이":"고양이", "고양":"고양이",
  "승용차":"자동차", "차":"자동차",
  "전철":"지하철"
};

/* ============================================================
   불용어(조사·어미 등 대표 표면형) — 6.2/9.3
   ============================================================ */
var STOPWORDS = [
  "은","는","이","가","을","를","의","에","에게","에서","으로","로",
  "와","과","도","만","까지","부터","보다",
  "다","며","고","려고","는데","지만","니까","어서"
];

/* ============================================================
   예시 문장 세트 — 형태소 사전분석 (S1~S7 공용 말뭉치)
   focusPair: S1/S4/S6에서 직접 다루는 "두 예시 문장"(0번·1번, 서로 다른
   말투의 비슷한 문장 — 학생이 눈으로도 "비슷하네?" 느끼되 AI가 그걸
   숫자로 확인하는 흐름).
   토큰 표기: surface(표면형) / pos(품사) / lemma(사전형, 동사·형용사만).
   품사 태그: NNG(일반명사) JX(보조사) JKS(주격조사) JKO(목적격조사)
   JKB(부사격조사) JKG(관형격조사) JC(접속조사) VV(동사) VA(형용사)
   MAG(부사).
   ============================================================ */
var SENTENCES = [
  { id:'S0', text:'인공지능은 수학적 원리를 기반으로 데이터를 학습한다', tokens:[
    {surface:'인공지능', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'수학적', pos:'NNG', lemma:'수학'},
    {surface:'원리', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'기반', pos:'NNG'}, {surface:'으로', pos:'JKB'},
    {surface:'데이터', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'학습한다', pos:'VV', lemma:'학습하다'}
  ]},
  { id:'S1', text:'인공지능은 데이터를 바탕으로 수학의 원리를 습득한다', tokens:[
    {surface:'인공지능', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'데이터', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'바탕', pos:'NNG'}, {surface:'으로', pos:'JKB'},
    {surface:'수학', pos:'NNG'}, {surface:'의', pos:'JKG'},
    {surface:'원리', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'습득한다', pos:'VV', lemma:'습득하다'}
  ]},
  { id:'S2', text:'인공지능은 문장 속 단어의 관계를 벡터로 표현한다', tokens:[
    {surface:'인공지능', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'문장', pos:'NNG'},
    {surface:'속', pos:'NNG'},
    {surface:'단어', pos:'NNG'}, {surface:'의', pos:'JKG'},
    {surface:'관계', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'벡터', pos:'NNG'}, {surface:'로', pos:'JKB'},
    {surface:'표현한다', pos:'VV', lemma:'표현하다'}
  ]},
  { id:'S3', text:'학생은 매일 수학 문제를 풀며 개념을 학습한다', tokens:[
    {surface:'학생', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'매일', pos:'MAG'},
    {surface:'수학', pos:'NNG'},
    {surface:'문제', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'풀며', pos:'VV', lemma:'풀다'},
    {surface:'개념', pos:'NNG'}, {surface:'을', pos:'JKO'},
    {surface:'학습한다', pos:'VV', lemma:'학습하다'}
  ]},
  { id:'S4', text:'인공지능은 이미지 속 숫자를 인식하고 분류한다', tokens:[
    {surface:'인공지능', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'이미지', pos:'NNG'},
    {surface:'속', pos:'NNG'},
    {surface:'숫자', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'인식하고', pos:'VV', lemma:'인식하다'},
    {surface:'분류한다', pos:'VV', lemma:'분류하다'}
  ]},
  { id:'S5', text:'데이터가 많을수록 인공지능의 예측은 더 정확해진다', tokens:[
    {surface:'데이터', pos:'NNG'}, {surface:'가', pos:'JKS'},
    {surface:'많을수록', pos:'VA', lemma:'많다'},
    {surface:'인공지능', pos:'NNG'}, {surface:'의', pos:'JKG'},
    {surface:'예측', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'더', pos:'MAG'},
    {surface:'정확해진다', pos:'VA', lemma:'정확하다'}
  ]},
  { id:'S6', text:'선생님은 학생에게 새로운 개념을 설명한다', tokens:[
    {surface:'선생님', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'학생', pos:'NNG'}, {surface:'에게', pos:'JKB'},
    {surface:'새로운', pos:'VA', lemma:'새롭다'},
    {surface:'개념', pos:'NNG'}, {surface:'을', pos:'JKO'},
    {surface:'설명한다', pos:'VV', lemma:'설명하다'}
  ]},
  { id:'S7', text:'인공지능은 문장과 문장의 유사도를 벡터로 계산한다', tokens:[
    {surface:'인공지능', pos:'NNG'}, {surface:'은', pos:'JX'},
    {surface:'문장', pos:'NNG'}, {surface:'과', pos:'JC'},
    {surface:'문장', pos:'NNG'}, {surface:'의', pos:'JKG'},
    {surface:'유사도', pos:'NNG'}, {surface:'를', pos:'JKO'},
    {surface:'벡터', pos:'NNG'}, {surface:'로', pos:'JKB'},
    {surface:'계산한다', pos:'VV', lemma:'계산하다'}
  ]}
];

window.__DATA = {
  attributes: ATTRS,
  words: WORDS,
  synonyms: SYNONYMS,
  stopwords: STOPWORDS,
  sentences: SENTENCES,
  focusPair: [0, 1]   /* S1·S4·S6가 손으로 다루는 두 예시 문장의 sentences[] 인덱스 */
};

})();
