import{j as e,m as le}from"./index-jmiAKyCG.js";import{a as t,k as ce}from"./vendor-lucide-ORdr4Gb-.js";import{B as de}from"./BorderGlow-CcZLiHX7.js";import{V as K,ac as ue,Y as me,ad as xe,aj as fe,ah as pe,E as he,C as ve,g as ge}from"./vendor-three-C_57S_V1.js";import{A as be}from"./index-CsPsoGPA.js";import"./vendor-motion-CkT6GyUb.js";const we=({topColor:P="#5227FF",bottomColor:l="#FF9FFC",intensity:j=1,rotationSpeed:s=.3,interactive:c=!1,className:p="",glowAmount:h=.005,pillarWidth:v=3,pillarHeight:N=.4,noiseIntensity:R=.5,mixBlendMode:u="screen",pillarRotation:T=0,quality:y="high"})=>{const d=t.useRef(null),m=t.useRef(null),r=t.useRef(null),i=t.useRef(null),C=t.useRef(null),k=t.useRef(null),z=t.useRef(null),D=t.useRef(new K(0,0)),W=t.useRef(0),F=t.useRef(s),q=t.useRef(!0),[E,L]=t.useState(!0),[O,Z]=t.useState(!0);return t.useEffect(()=>{const o=document.createElement("canvas");o.getContext("webgl")||o.getContext("experimental-webgl")||L(!1)},[]),t.useEffect(()=>{const o=d.current;if(!o)return;const x=new IntersectionObserver(([S])=>Z(S.isIntersecting),{threshold:.01});return x.observe(o),()=>x.disconnect()},[]),t.useEffect(()=>{q.current=O},[O]),t.useEffect(()=>{if(!d.current||!E)return;const o=d.current,x=o.clientWidth,S=o.clientHeight,V=new ue;C.current=V;const ee=new me(-1,1,1,-1,0,1);k.current=ee;const $=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),te=$||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let g=y;te&&y==="high"&&(g="medium"),$&&y!=="low"&&(g="low");const G={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},f=G[g]||G.medium;let b;try{b=new xe({antialias:!1,alpha:!0,powerPreference:g==="high"?"high-performance":"low-power",precision:f.precision,stencil:!1,depth:!1})}catch{L(!1);return}b.setSize(x,S),b.setPixelRatio(f.pixelRatio),o.appendChild(b.domElement),r.current=b;const B=a=>{const n=new ve(a);return new ge(n.r,n.g,n.b)},se=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,oe=`
      precision ${f.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin;
      uniform float uWaveCos;
      varying vec2 vUv;

      const float STEP_MULT = ${f.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${f.iterations};
      const int WAVE_ITER = ${f.waveIterations};

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y, uPillarRotSin * uv.x + uPillarRotCos * uv.y);

        vec3 ro = vec3(0.0, 0.0, -10.0);
        vec3 rd = normalize(vec3(uv, 1.0));

        float rotC = uRotCos;
        float rotS = uRotSin;
        if(uInteractive && (uMouse.x != 0.0 || uMouse.y != 0.0)) {
          float a = uMouse.x * 6.283185;
          rotC = cos(a);
          rotS = sin(a);
        }

        vec3 col = vec3(0.0);
        float t = 0.1;
        
        for(int i = 0; i < MAX_ITER; i++) {
          vec3 p = ro + rd * t;
          p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

          vec3 q = p;
          q.y = p.y * uPillarHeight + uTime;
          
          float freq = 1.0;
          float amp = 1.0;
          for(int j = 0; j < WAVE_ITER; j++) {
            q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
            q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
            freq *= 2.0;
            amp *= 0.5;
          }
          
          float d = length(cos(q.xz)) - 0.2;
          float bound = length(p.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(d - bound), 0.0);
          d = max(d, bound) + h * h * 0.0625 / k;
          d = abs(d) * 0.15 + 0.01;

          float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
          col += mix(uBottomColor, uTopColor, grad) / d;

          t += d * STEP_MULT;
          if(t > 50.0) break;
        }

        float widthNorm = uPillarWidth / 3.0;
        col = tanh(col * uGlowAmount / widthNorm);
        
        col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;
        
        gl_FragColor = vec4(col * uIntensity, 1.0);
      }
    `,_=T*Math.PI/180,ne=Math.sin(.4),re=Math.cos(.4),H=new fe({vertexShader:se,fragmentShader:oe,uniforms:{uTime:{value:0},uResolution:{value:new K(x,S)},uMouse:{value:D.current},uTopColor:{value:B(P)},uBottomColor:{value:B(l)},uIntensity:{value:j},uInteractive:{value:c},uGlowAmount:{value:h},uPillarWidth:{value:v},uPillarHeight:{value:N},uNoiseIntensity:{value:R},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(_)},uPillarRotSin:{value:Math.sin(_)},uWaveSin:{value:ne},uWaveCos:{value:re}},transparent:!0,depthWrite:!1,depthTest:!1});i.current=H;const U=new pe(2,2);z.current=U;const ae=new he(U,H);V.add(ae);let I=null;const X=a=>{if(!c||I)return;I=window.setTimeout(()=>{I=null},16);const n=o.getBoundingClientRect(),w=(a.clientX-n.left)/n.width*2-1,ie=-((a.clientY-n.top)/n.height)*2+1;D.current.set(w,ie)};c&&o.addEventListener("mousemove",X,{passive:!0});let Y=performance.now();const Q=1e3/(g==="low"?30:60),M=a=>{if(!i.current||!r.current||!C.current||!k.current)return;if(!q.current){m.current=requestAnimationFrame(M);return}const n=a-Y;if(n>=Q){W.current+=.016*F.current;const w=W.current;i.current.uniforms.uTime.value=w,i.current.uniforms.uRotCos.value=Math.cos(w*.3),i.current.uniforms.uRotSin.value=Math.sin(w*.3),r.current.render(C.current,k.current),Y=a-n%Q}m.current=requestAnimationFrame(M)};m.current=requestAnimationFrame(M);let A=null;const J=()=>{A&&clearTimeout(A),A=window.setTimeout(()=>{if(!r.current||!i.current||!d.current)return;const a=d.current.clientWidth,n=d.current.clientHeight;r.current.setSize(a,n),i.current.uniforms.uResolution.value.set(a,n)},150)};return window.addEventListener("resize",J,{passive:!0}),()=>{window.removeEventListener("resize",J),c&&o.removeEventListener("mousemove",X),m.current&&cancelAnimationFrame(m.current),r.current&&(r.current.dispose(),r.current.forceContextLoss(),o.contains(r.current.domElement)&&o.removeChild(r.current.domElement)),i.current&&i.current.dispose(),z.current&&z.current.dispose(),r.current=null,i.current=null,C.current=null,k.current=null,z.current=null,m.current=null}},[E,y,c,T,P,l,j,h,v,N,R]),t.useEffect(()=>{F.current=s},[s]),E?e.jsx("div",{ref:d,className:`light-pillar-container ${p}`,style:{mixBlendMode:u}}):e.jsx("div",{className:`light-pillar-fallback ${p}`,style:{mixBlendMode:u},children:"WebGL not supported"})},Se=t.memo(function(){const[l,j]=t.useState(!0),[s,c]=t.useState("standard"),p=t.useCallback(u=>c(u),[]),h=t.useCallback(u=>j(u),[]),v=()=>s==="standard"&&l?6800:8500,N=()=>l?"Nesse cenário, toda a modelagem já está pronta, permitindo concentrar o desenvolvimento na programação, interação, otimização e experiência do usuário.":"Será necessário contratar um artista 3D especializado para produzir toda a modelagem do veículo. Essa etapa aumenta significativamente o tempo de produção, envolve fornecedores externos e eleva o custo total do projeto. O valor adicional cobre exclusivamente essa produção especializada.",R=()=>s==="website"?"Caso a empresa deseje aproveitar o projeto para modernizar toda sua presença digital, é possível desenvolver o configurador integrado a um novo website institucional. Nesse formato, além do configurador, toda a estrutura do site é reformulada para oferecer uma experiência moderna, rápida e focada em conversão.":"Desenvolvimento exclusivo do sistema do configurador interativo pronto para ser integrado ao seu site ou portal atual.";return e.jsxs("section",{id:"investimento",className:"relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 z-0 opacity-40 pointer-events-none",children:e.jsx(we,{topColor:"#2f00eb",bottomColor:"#0bdcff",intensity:.8,rotationSpeed:.4,glowAmount:.001,pillarWidth:3.5,pillarHeight:.3,noiseIntensity:.4,pillarRotation:72,interactive:!1,mixBlendMode:"normal"})}),e.jsxs("div",{className:"relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-16",children:[e.jsxs("div",{className:"text-center max-w-3xl mx-auto space-y-4",children:[e.jsx("span",{className:"font-mono text-xs text-brand-gold font-bold tracking-widest uppercase block",children:"[ simulação de investimento transparente ]"}),e.jsx("h2",{className:"text-3xl sm:text-5xl font-extrabold text-white tracking-tight",children:"Investimento"}),e.jsx("p",{className:"text-zinc-400 text-sm sm:text-base font-light",children:"Selecione o escopo desejado e a disponibilidade de arquivos 3D para visualizar o orçamento e detalhamento do projeto em tempo real."})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[e.jsxs("div",{className:"lg:col-span-7 space-y-6",children:[e.jsxs("div",{className:"p-6 md:p-8 rounded-3xl bg-brand-dark/40 border border-white/5 space-y-4",children:[e.jsx("span",{className:"font-mono text-[9px] text-zinc-500 uppercase tracking-widest block",children:"Etapa 1: Selecione o Escopo do Projeto"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("button",{onClick:()=>p("standard"),className:`p-6 rounded-2xl border text-left transition-all focus:outline-none flex flex-col justify-between h-48 ${s==="standard"?"bg-brand-accent/5 border-brand-accent text-white":"bg-brand-dark/40 border-white/5 text-zinc-400 hover:border-white/10"}`,id:"invest-pkg-standard",children:[e.jsxs("div",{className:"space-y-1.5",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-[10px] font-mono tracking-wide uppercase text-zinc-500",children:"OPÇÃO 01"}),s==="standard"&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-brand-accent"})]}),e.jsx("h3",{className:"text-base font-bold text-white tracking-tight",children:"Configurador 3D"})]}),e.jsx("span",{className:"text-[11px] text-zinc-400 font-light leading-snug",children:"Desenvolvimento exclusivo do configurador 3D sob medida."})]}),e.jsxs("button",{onClick:()=>p("website"),className:`p-6 rounded-2xl border text-left transition-all focus:outline-none flex flex-col justify-between h-48 ${s==="website"?"bg-emerald-500/5 border-emerald-500 text-white border-glow-emerald":"bg-brand-dark/40 border-white/5 text-zinc-400 hover:border-white/10"}`,id:"invest-pkg-website",children:[e.jsxs("div",{className:"space-y-1.5",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-[10px] font-mono tracking-wide uppercase text-zinc-500",children:"OPÇÃO 02 (RECOMENDADO)"}),s==="website"&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-emerald-500"})]}),e.jsx("h3",{className:"text-base font-bold text-white tracking-tight",children:"Configurador 3D + Reformulação do Website"})]}),e.jsx("span",{className:"text-[11px] text-zinc-400 font-light leading-snug",children:"Configurador integrado a um novo website institucional focado em conversão."})]})]})]}),e.jsxs("div",{className:"p-6 md:p-8 rounded-3xl bg-brand-dark/40 border border-white/5 space-y-6",children:[e.jsx("div",{className:"flex justify-between items-start",children:e.jsxs("div",{className:"space-y-0.5",children:[e.jsx("span",{className:"font-mono text-[9px] text-zinc-500 uppercase tracking-widest block",children:"Etapa 2: Asset 3D do Veículo"}),e.jsx("span",{className:"text-xs text-zinc-400 font-light",children:"Selecione se sua empresa já possui o modelo 3D do veículo."})]})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx("button",{onClick:()=>h(!0),className:`p-4 rounded-xl border text-left transition-all text-xs font-medium focus:outline-none ${l?"bg-brand-accent/5 border-brand-accent text-white":"bg-brand-dark border-white/5 text-zinc-500 hover:text-zinc-400"}`,id:"invest-asset-true",children:"Forneceremos o Asset 3D"}),e.jsx("button",{onClick:()=>h(!1),className:`p-4 rounded-xl border text-left transition-all text-xs font-medium focus:outline-none ${l?"bg-brand-dark border-white/5 text-zinc-500 hover:text-zinc-400":"bg-brand-accent/5 border-brand-accent text-white"}`,id:"invest-asset-false",children:"NÃO forneceremos o Asset 3D"})]}),e.jsxs("div",{className:"p-4 rounded-xl bg-brand-dark border border-white/5 font-mono text-[11px] text-zinc-400 leading-relaxed font-light",children:[e.jsx("span",{className:"text-brand-gold font-bold uppercase tracking-wider block mb-1",children:"Impacto do modelo 3D:"}),N()]})]})]}),e.jsx("div",{className:"lg:col-span-5 lg:sticky lg:top-24",children:e.jsx(de,{className:"h-full w-full",backgroundColor:"#050505",borderRadius:24,active:s==="website",glowColor:s==="website"?"142 70% 45%":"45 85 55",colors:s==="website"?["#10b981","#34d399","#059669"]:["#d4af37","#3b82f6","#f59e0b"],fillOpacity:.12,children:e.jsxs("div",{className:"p-8 flex flex-col justify-between h-full relative overflow-hidden space-y-8",children:[e.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 bg-brand-gold/3 rounded-full blur-2xl pointer-events-none"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-4",children:[e.jsx("span",{className:"font-mono text-xs text-zinc-500 uppercase tracking-widest",children:"Demonstrativo Comercial"}),e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20 font-mono text-[9px] text-brand-accent",children:[e.jsx(ce,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"VERIFICADO"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("span",{className:"text-[10px] text-zinc-500 font-mono uppercase block",children:"Total do Investimento"}),e.jsxs("div",{className:"flex items-baseline gap-1 text-white",children:[e.jsx("span",{className:"text-xl font-bold",children:"R$"}),e.jsx(be,{mode:"wait",children:e.jsx(le.span,{initial:{y:-10,opacity:0},animate:{y:0,opacity:1},exit:{y:10,opacity:0},transition:{duration:.3},className:"text-4xl md:text-5xl font-extrabold tracking-tight",children:v().toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})},v())})]})]})]}),e.jsxs("div",{className:"space-y-4 border-t border-b border-white/5 py-6",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("span",{className:"text-[10px] text-zinc-500 font-mono uppercase block",children:"Pacote Escolhido"}),e.jsx("span",{className:"text-xs text-white font-medium block",children:s==="standard"?"Configurador 3D":"Configurador 3D + Reformulação completa do Website"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("span",{className:"text-[10px] text-zinc-500 font-mono uppercase block",children:"Modelagem do Asset"}),e.jsx("span",{className:"text-xs text-white font-medium block",children:l?"Com Asset 3D fornecido":"Sem Asset 3D fornecido"})]}),e.jsx("div",{className:"text-[11px] text-zinc-400 font-light leading-relaxed",children:R()})]}),e.jsxs("div",{className:"space-y-2.5",children:[e.jsx("span",{className:"text-[10px] text-zinc-500 font-mono uppercase block",children:"Incluso no Desenvolvimento:"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 font-mono text-[10px] text-zinc-400",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"}),e.jsx("span",{children:"Foco em Conversão"})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"}),e.jsx("span",{children:"Otimização WebGL"})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"}),e.jsx("span",{children:"Interface Responsiva"})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"}),e.jsx("span",{children:"Exportador PDF"})]})]})]})]})})})]})]})]})});export{Se as default};
