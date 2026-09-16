(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,85437,(e,t,a)=>{"use strict";e.i(47167),Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"Image",{enumerable:!0,get:function(){return A}});let r=e.r(55682),n=e.r(90809),i=e.r(43476),s=n._(e.r(71645)),o=r._(e.r(74080)),c=r._(e.r(25633)),l=e.r(8927),d=e.r(87690),u=e.r(18556),m=e.r(65856),p=r._(e.r(1948)),h=e.r(18581),g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/Achint_Ai/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function f(e,t,a,r,n,i,s){let o=e?.src;e&&e["data-loaded-src"]!==o&&(e["data-loaded-src"]=o,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&n(!0),a?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,n=!1;a.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function v(e){return s.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b="u"<typeof window?s.useEffect:s.useLayoutEffect,y=(0,s.forwardRef)(({src:e,srcSet:t,sizes:a,height:r,width:n,decoding:o,className:c,style:l,fetchPriority:d,placeholder:u,loading:m,unoptimized:p,fill:g,onLoadRef:y,onLoadingCompleteRef:w,setBlurComplete:A,setShowAltText:x,sizesInput:k,onLoad:I,onError:S,...C},R)=>{let P=(0,s.useRef)(!1),M=(0,s.useRef)(null);b(()=>{let{current:e}=P,{current:t}=M;e||null===t||(S&&(t.src=t.src),t.complete&&f(t,u,y,w,A,p,k),P.current=!0)},[e,u,y,w,S,p,k]);let T=(0,h.useMergedRef)(R,M);return(0,i.jsx)("img",{...C,...v(d),loading:m,width:n,height:r,decoding:o,"data-nimg":g?"fill":"1",className:c,style:l,sizes:a,srcSet:t,src:e,ref:T,onLoad:e=>{f(e.currentTarget,u,y,w,A,p,k)},onError:e=>{x(!0),"empty"!==u&&A(!0),S&&S(e)}})});function w({isAppRouter:e,imgAttributes:t}){let a={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...v(t.fetchPriority)};return e&&o.default.preload?(o.default.preload(t.src,a),null):(0,i.jsx)(c.default,{children:(0,i.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...a},"__nimg-"+t.src+t.srcSet+t.sizes)})}let A=(0,s.forwardRef)((e,t)=>{let a=(0,s.useContext)(m.RouterContext),r=(0,s.useContext)(u.ImageConfigContext),n=(0,s.useMemo)(()=>{let e=g||r||d.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),a=e.deviceSizes.sort((e,t)=>e-t),n=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:a,qualities:n,localPatterns:"u"<typeof window?r?.localPatterns:e.localPatterns}},[r]),{onLoad:o,onLoadingComplete:c}=e,h=(0,s.useRef)(o);(0,s.useEffect)(()=>{h.current=o},[o]);let f=(0,s.useRef)(c);(0,s.useEffect)(()=>{f.current=c},[c]);let[v,b]=(0,s.useState)(!1),[A,x]=(0,s.useState)(!1),{props:k,meta:I}=(0,l.getImgProps)(e,{defaultLoader:p.default,imgConf:n,blurComplete:v,showAltText:A});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(y,{...k,unoptimized:I.unoptimized,placeholder:I.placeholder,fill:I.fill,onLoadRef:h,onLoadingCompleteRef:f,setBlurComplete:b,setShowAltText:x,sizesInput:e.sizes,ref:t}),I.preload?(0,i.jsx)(w,{isAppRouter:!a,imgAttributes:k}):null]})});("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},70965,(e,t,a)=>{"use strict";function r(e,t){let a=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-a)<Math.abs(e-a)?t:e,t.qualities[0]):a}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"findClosestQuality",{enumerable:!0,get:function(){return r}})},8927,(e,t,a)=>{"use strict";e.i(47167),Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImgProps",{enumerable:!0,get:function(){return l}});let r=e.r(43369),n=e.r(88143),i=e.r(87690),s=["-moz-initial","fill","none","scale-down",void 0];function o(e){return void 0!==e.default}function c(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l({src:e,sizes:t,unoptimized:a=!1,priority:d=!1,preload:u=!1,loading:m,className:p,quality:h,width:g,height:f,fill:v=!1,style:b,overrideSrc:y,onLoad:w,onLoadingComplete:A,placeholder:x="empty",blurDataURL:k,fetchPriority:I,decoding:S="async",layout:C,objectFit:R,objectPosition:P,lazyBoundary:M,lazyRoot:T,...E},j){var _;let z,L,G,{imgConf:O,showAltText:D,blurComplete:q,defaultLoader:N}=j,F=O||i.imageConfigDefault;if("allSizes"in F)z=F;else{let e=[...F.deviceSizes,...F.imageSizes].sort((e,t)=>e-t),t=F.deviceSizes.sort((e,t)=>e-t),a=F.qualities?.sort((e,t)=>e-t);z={...F,allSizes:e,deviceSizes:t,qualities:a}}if(void 0===N)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let $=E.loader||N;delete E.loader,delete E.srcSet;let B="__next_img_default"in $;if(B){if("custom"===z.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=$;$=t=>{let{config:a,...r}=t;return e(r)}}if(C){"fill"===C&&(v=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[C];e&&(b={...b,...e});let a={responsive:"100vw",fill:"100vw"}[C];a&&!t&&(t=a)}let W="",H=c(g),U=c(f);if((_=e)&&"object"==typeof _&&(o(_)||void 0!==_.src)){let t=o(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(L=t.blurWidth,G=t.blurHeight,k=k||t.blurDataURL,W=t.src,!v)if(H||U){if(H&&!U){let e=H/t.width;U=Math.round(t.height*e)}else if(!H&&U){let e=U/t.height;H=Math.round(t.width*e)}}else H=t.width,U=t.height}let V=!d&&!u&&("lazy"===m||void 0===m);(!(e="string"==typeof e?e:W)||e.startsWith("data:")||e.startsWith("blob:"))&&(a=!0,V=!1),z.unoptimized&&(a=!0),B&&!z.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(a=!0);let Q=c(h),X=Object.assign(v?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:R,objectPosition:P}:{},D?{}:{color:"transparent"},b),J=q||"empty"===x?null:"blur"===x?`url("data:image/svg+xml;charset=utf-8,${(0,n.getImageBlurSvg)({widthInt:H,heightInt:U,blurWidth:L,blurHeight:G,blurDataURL:k||"",objectFit:X.objectFit})}")`:`url("${x}")`,K=s.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,Y=J?{backgroundSize:K,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:J}:{},Z=function({config:e,src:t,unoptimized:a,width:n,quality:i,sizes:s,loader:o}){if(a){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,r.getDeploymentId)();if(t.includes("/_next/static/immutable")&&!(0,r.getAssetToken)())e=void 0;else if(e){let a=t.indexOf("?");if(-1!==a){let r=new URLSearchParams(t.slice(a+1));r.get("dpl")||(r.append("dpl",e),t=t.slice(0,a)+"?"+r.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:c,kind:l}=function({deviceSizes:e,allSizes:t},a,r){if(r){let a=/(^|\s)(1?\d?\d)vw/g,n=[];for(let e;e=a.exec(r);)n.push(parseInt(e[2]));if(n.length){let a=.01*Math.min(...n);return{widths:t.filter(t=>t>=e[0]*a),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof a?{widths:e,kind:"w"}:{widths:[...new Set([a,2*a].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,n,s),d=c.length-1;return{sizes:s||"w"!==l?s:"100vw",srcSet:c.map((a,r)=>`${o({config:e,src:t,quality:i,width:a})} ${"w"===l?a:r+1}${l}`).join(", "),src:o({config:e,src:t,quality:i,width:c[d]})}}({config:z,src:e,unoptimized:a,width:H,quality:Q,sizes:t,loader:$}),ee=V?"lazy":m;return{props:{...E,loading:ee,fetchPriority:I,width:H,height:U,decoding:S,className:p,style:{...X,...Y},sizes:Z.sizes,srcSet:Z.srcSet,src:y||Z.src},meta:{unoptimized:a,preload:u||d,placeholder:x,fill:v}}}},25633,(e,t,a)=>{"use strict";e.i(47167),Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return g},defaultHead:function(){return u}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=e.r(55682),s=e.r(90809),o=e.r(43476),c=s._(e.r(71645)),l=i._(e.r(98879)),d=e.r(42732);function u(){return[(0,o.jsx)("meta",{charSet:"utf-8"},"charset"),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===c.default.Fragment?e.concat(c.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}let p=["name","httpEquiv","charSet","itemProp"];function h(e){let t,a,r,n;return e.reduce(m,[]).reverse().concat(u().reverse()).filter((t=new Set,a=new Set,r=new Set,n={},e=>{let i=!0,s=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){s=!0;let a=e.key.slice(e.key.indexOf("$")+1);t.has(a)?i=!1:t.add(a)}switch(e.type){case"title":case"base":a.has(e.type)?i=!1:a.add(e.type);break;case"meta":for(let t=0,a=p.length;t<a;t++){let a=p[t];if(e.props.hasOwnProperty(a))if("charSet"===a)r.has(a)?i=!1:r.add(a);else{let t=e.props[a],r=n[a]||new Set;("name"!==a||!s)&&r.has(t)?i=!1:(r.add(t),n[a]=r)}}}return i})).reverse().map((e,t)=>{let a=e.key||t;return c.default.cloneElement(e,{key:a})})}let g=function({children:e}){let t=(0,c.useContext)(d.HeadManagerContext);return(0,o.jsx)(l.default,{reduceComponentsToState:h,headManager:t,children:e})};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},88143,(e,t,a)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:a,blurHeight:n,blurDataURL:i,objectFit:s}){let o=a?40*a:e,c=n?40*n:t,l=o&&c?`viewBox='0 0 ${o} ${c}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l?"none":"contain"===s?"xMidYMid":"cover"===s?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},18556,(e,t,a)=>{"use strict";e.i(47167),Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let r=e.r(55682)._(e.r(71645)),n=e.r(87690),i=r.default.createContext(n.imageConfigDefault)},65856,(e,t,a)=>{"use strict";e.i(47167),Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"RouterContext",{enumerable:!0,get:function(){return r}});let r=e.r(55682)._(e.r(71645)).default.createContext(null)},87690,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return s}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},94909,(e,t,a)=>{"use strict";e.i(47167),Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return d},getImageProps:function(){return l}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=e.r(55682),s=e.r(8927),o=e.r(85437),c=i._(e.r(1948));function l(e){let{props:t}=(0,s.getImgProps)(e,{defaultLoader:c.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/Achint_Ai/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let d=o.Image},57688,(e,t,a)=>{t.exports=e.r(94909)},1948,(e,t,a)=>{"use strict";e.i(47167),Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return s}});let r=e.r(70965),n=e.r(43369);function i({config:e,src:t,width:a,quality:s}){let o=(0,n.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//"))if(t.includes("/_next/static/immutable")&&!(0,n.getAssetToken)())o=void 0;else{let e=t.indexOf("?");if(-1!==e){let a=new URLSearchParams(t.slice(e+1)),r=a.get("dpl");if(r){o=r,a.delete("dpl");let n=a.toString();t=t.slice(0,e)+(n?"?"+n:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let c=(0,r.findClosestQuality)(s,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${a}&q=${c}${t.startsWith("/")&&o?`&dpl=${o}`:""}`}i.__next_img_default=!0;let s=i},98879,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return o}});let r=e.r(71645),n="u"<typeof window,i=n?()=>{}:r.useLayoutEffect,s=n?()=>{}:r.useEffect;function o(e){let{headManager:t,reduceComponentsToState:a}=e;function o(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(a(e))}}return n&&(t?.mountedInstances?.add(e.children),o()),i(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),i(()=>(t&&(t._pendingUpdate=o),()=>{t&&(t._pendingUpdate=o)})),s(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},76283,e=>{"use strict";var t=e.i(43476),a=e.i(57688),r=e.i(44025);function n(e){var n;return(0,t.jsx)(a.default,{...e,alt:e.alt,src:"string"!=typeof(n=e.src)||n.startsWith("http://")||n.startsWith("https://")?n:n.startsWith("/")?(0,r.publicPath)(n):n})}var i=e.i(22016),s=e.i(71645),o=e.i(11834);function c({href:e,...a}){let n=e.startsWith("http://")||e.startsWith("https://")?e:(0,r.publicPath)(e);return(0,t.jsx)("a",{href:n,...a})}var l=e.i(75157);let d=["All","Achint","RAG","Cloud","Agents","Economics"];e.s(["BlogLibrary",0,function(){let[e,a]=(0,s.useState)("All"),r=(0,s.useMemo)(()=>{let t=[...o.blogPosts].sort((e,t)=>t.date.localeCompare(e.date));if("All"===e)return t;if("Achint"===e)return t.filter(e=>e.author.includes("Achint"));let a=e.toLowerCase();return t.filter(e=>e.tags.some(e=>e.toLowerCase().includes(a))||e.title.toLowerCase().includes(a)||e.summary.toLowerCase().includes(a))},[e]);return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:d.map(r=>(0,t.jsx)("button",{type:"button",onClick:()=>a(r),"aria-pressed":e===r,className:(0,l.cn)("rounded-full px-3 py-1.5 text-sm font-medium transition",e===r?"bg-[var(--claude)] text-white":"border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--claude)]"),children:r},r))}),(0,t.jsx)("div",{className:"mt-8 grid gap-6 md:grid-cols-2",children:r.map(e=>(0,t.jsxs)("article",{className:"group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_10px_40px_color-mix(in_oklab,var(--foreground)_5%,transparent)] transition hover:-translate-y-0.5",children:[e.coverImage&&(0,t.jsx)("div",{className:"relative aspect-[16/9] border-b border-[var(--border)] bg-[var(--background)]",children:(0,t.jsx)(n,{src:e.coverImage,alt:"",fill:!0,className:(0,l.cn)((0,l.coverImageClass)(e.coverImage),"transition duration-500 group-hover:scale-[1.02]"),sizes:"(max-width: 768px) 100vw, 50vw",unoptimized:e.coverImage.startsWith("http")})}),(0,t.jsxs)("div",{className:"flex flex-1 flex-col p-5",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,t.jsx)("span",{className:"rounded-full bg-[color-mix(in_oklab,var(--claude)_14%,transparent)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--foreground)]",children:"Written by Achint Pal Singh"}),(0,t.jsxs)("span",{className:"text-xs text-[var(--muted)]",children:[e.readingTimeMinutes," min"]})]}),(0,t.jsx)("h2",{className:"mt-3 font-[family-name:var(--font-display)] text-xl font-medium leading-snug tracking-[-0.02em]",children:e.title}),(0,t.jsxs)("p",{className:"mt-2 text-xs text-[var(--muted)]",children:[(0,l.formatDate)(e.date)," · ",e.author]}),(0,t.jsx)("p",{className:"mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]",children:e.summary}),(0,t.jsxs)("div",{className:"mt-4 flex flex-wrap gap-3",children:[(0,t.jsx)(i.default,{href:`/blogs/${e.slug}`,className:"text-sm font-semibold text-[var(--claude)] hover:underline",children:"Read post"}),e.pdfPath&&(0,t.jsx)(c,{href:e.pdfPath,target:"_blank",rel:"noopener noreferrer",className:"text-sm text-[var(--muted)] hover:text-[var(--claude)]",children:"PDF"})]})]})]},e.slug))})]})}],76283)},11834,e=>{"use strict";let t=[...[{slug:"two-tower-civicmatch",title:"Two Towers, One Connection: Building CivicMatch",author:"Achint Pal Singh",date:"2026-09-15",readingTimeMinutes:8,summary:"A reproducible recommendation experiment across three public government catalogs, with trained user and item vectors and an honest look at synthetic evaluation.",tags:["Two-tower models","Recommendations","NumPy","Open data"],categories:["Vector Search","AI Models"],status:"Research",excerptMarkdown:`## Abstract
CivicMatch explores a practical question: can a compact two-tower retriever connect a person's interests with useful public resources? The implementation trains separate user and item encoders across Toronto recreation programs, Canadian climate and energy datasets, and Canadian employment and skills datasets. The catalogs are real; the preference profiles and relevance labels are simulated. This distinction defines what the experiment can establish.

[Try the working demo](/projects/civicmatch) \xb7 [Read the training code](https://github.com/achintarora-ai/Achint_Ai/tree/main/projects/civicmatch)

## I. Why two towers?
A user tower turns a preference profile into a vector. An item tower turns catalog features into another vector in the same space. Their dot product supplies a retrieval score. Training changes both encoders so a positive item scores above competing items. Item vectors can be computed ahead of time; only the user vector needs computing when a request arrives.

LinkedIn documents a related architecture in its content search system: separate query and post towers, with precomputed post embeddings and approximate nearest-neighbor retrieval [1]. CivicMatch borrows the architectural idea, not LinkedIn's model, data or production results. Its small catalogs use exact scoring instead of an approximate index.

Netflix is also an important reference point for personalization research [2]. That broader connection does not establish that Netflix uses this exact two-tower implementation. Recommendation systems evolve and contain many components; a company name is not evidence of architectural equivalence.

## II. Three problems, three catalogs
| Track | Public source | Items in snapshot | What is recommended |
| --- | --- | --- | --- |
| Community recreation | City of Toronto registered programs [3] | 500 | Activities to investigate with the provider |
| Climate and energy | Government of Canada catalog [4] | 277 | Datasets for exploration and analysis |
| Jobs and skills | Government of Canada catalog [4] | 291 | Employment, training and labour datasets |

The snapshot was retrieved on September 16, 2026 UTC. Recreation titles are deduplicated and capped at 500, so this is not the complete city inventory. The other tracks recommend data resources, not live job openings or personalized climate advice. Raw responses, source metadata and hashes are recorded by the training pipeline. Consult each source's terms before reusing its contents. No claim is made that these datasets have never been used by another researcher.

## III. Reproducible method
Each track uses a vocabulary of up to 80 catalog terms plus category features. Features are normalized. The towers are independent single-layer tanh encoders with 24 output dimensions. A full-catalog softmax loss, temperature 0.2, and Adam updates train both matrices for 180 epochs with seed 42.

For each of 600 simulated users, the generator mixes three item feature vectors and adds noise. A content-similarity teacher identifies ten relevant items; the highest-scoring one supplies the training target. Users are split into 420 training, 90 validation and 90 test profiles. The item catalog is shared across the splits: this tests unseen simulated users, not unseen items or temporal generalization.

The browser demo encodes typed interests with the same vocabulary, applies the trained user weights, and scores saved item vectors. Typed queries differ from the synthetic training distribution, so the demo should be explored critically rather than treated as a calibrated service.

## IV. Measured results
Recall@10 is the fraction of ten synthetic relevant items recovered in the ten returned results, averaged over the 90 test profiles.

| Track | Trained model | Untrained towers | Random retrieval | Content teacher |
| --- | --- | --- | --- | --- |
| Recreation | 0.632 | 0.011 | 0.023 | 1.000 |
| Climate / energy | 0.587 | 0.020 | 0.037 | 1.000 |
| Jobs / skills | 0.634 | 0.012 | 0.041 | 1.000 |

These are actual outputs of the committed training run. The content teacher achieves 1.000 by construction because it defines the labels. The neural model improves on random and untrained retrieval, but does not improve on that teacher. The experiment demonstrates learning and inference mechanics; it does not prove a superior recommendation method. One seed and a small synthetic holdout do not establish statistical robustness.

## V. What the engineering tests establish
Numerical finite-difference tests check gradients for both towers. A second test verifies that cached item vectors produce the same scores as directly encoded items. A third checks the Recall@10 denominator. Saved artifacts include learned weights, item vectors, vocabulary, catalog provenance and run metrics. These checks establish implementation consistency, not real-world usefulness.

## VI. Before recommending to real people
A production recreation system would need availability, geography, age eligibility, accessibility and cost constraints before ranking. A real evaluation would require consented interaction data, exposure-aware negatives, a temporal holdout, subgroup analysis and a plan for cold-start items. For the data-discovery tracks, human relevance judgments would be more meaningful than the current teacher labels. None of those results are claimed here.

The next experiment should compare strong lexical and content baselines on independently labeled queries. If a simpler method wins, it should remain the default. The value of two towers must be demonstrated for the workload, not assumed from industry adoption.

**Publication status:** Independent portfolio experiment, developed with AI assistance. Not peer-reviewed or IEEE-published. References use an IEEE-style numbered format. Training used public catalog content and simulated preferences, not private user records.

## References
[1] X. Yang et al., “Introducing Semantic Capability in LinkedIn's Content Search Engine,” LinkedIn Engineering, Aug. 14, 2024. [Official engineering article](https://www.linkedin.com/blog/engineering/search/introducing-semantic-capability-in-linkedins-content-search-engine).

[2] Netflix, “Netflix Research.” [Research program](https://research.netflix.com/).

[3] City of Toronto, “Registered Programs and Drop In Courses Offering.” [Open Data catalog](https://open.toronto.ca/dataset/registered-programs-and-drop-in-courses-offering/).

[4] Government of Canada, “Open Government.” [Data catalog](https://open.canada.ca/en/open-data).
`},{slug:"evaluating-rag-beyond-retrieval",title:"Evaluating RAG Beyond Retrieval Accuracy",readingTimeMinutes:6,summary:"A reproducible evaluation protocol that separates retrieval quality, answer grounding, and system reliability.",tags:["RAG","evaluation","research methods"],categories:["RAG","Vector Search"],status:"Research",pdfPath:"/research/rag-evaluation-protocol.pdf",excerptMarkdown:"## Abstract\nRetrieval-augmented generation connects language generation to external evidence [1], but a relevant passage does not guarantee a correct answer. This technical study proposes an evaluation protocol that separates retrieval, generation, and operational behavior. Its contribution is an experimental design, not a new algorithm or a completed benchmark. No measured results are claimed.\n\n**Index terms:** retrieval-augmented generation, evaluation, grounded generation, reproducibility.\n\n## I. Problem formulation\nConsider an assistant answering questions over a versioned document collection. Failures can arise because the retriever misses evidence, the generator misuses available evidence, or the application retrieves material outside the user's access scope. A single aggregate answer score obscures these different causes.\n\nRagas describes reference-free evaluation across context relevance, faithfulness, and answer quality [2]. Such automated judgments are useful for iteration, but this proposed protocol also includes a human-reviewed holdout set. A model judge can share the biases and blind spots of the model it evaluates.\n\n## II. Proposed experimental design\nFreeze the corpus snapshot, parser, chunking policy, embedding revision, index settings, prompt, and generation model. Record a checksum for the corpus and a configuration identifier for every run. Split by source document or document family to reduce near-duplicate leakage between development and evaluation.\n\nConstruct questions in four groups: directly answerable, requiring multiple passages, unanswerable from the corpus, and adversarial or access-restricted. Store expected evidence identifiers and an explicit answerability label. Keep the final holdout inaccessible during prompt tuning.\n\nCompare a lexical baseline, dense retrieval, and a hybrid configuration. Change one component at a time; otherwise a better answer cannot be attributed to a better retriever. Evaluate identical queries and report paired differences with uncertainty intervals rather than just a leaderboard.\n\n## III. Measurement contract\n| Layer | Measure | Interpretation |\n| --- | --- | --- |\n| Retrieval | Recall@k | Fraction of annotated relevant units recovered |\n| Ranking | nDCG@k | Whether highly relevant evidence appears early |\n| Generation | Supported-claim fraction | Claims supported by retrieved evidence |\n| Citations | Citation precision | Cited passages actually supporting the associated claim |\n| Abstention | False-answer rate on unanswerable questions | Unsupported answers when evidence is absent |\n| Operations | p50/p95 latency, errors, cost per successful task | User-visible reliability and resource use |\n\nDefine the evidence unit before scoring. Passage-level and document-level recall answer different questions. Review a sample of citation judgments manually and record disagreement. A claim without a citation should not silently disappear from the denominator.\n\n## IV. Release decision\nPre-register acceptance criteria against the intended use case. A candidate should pass the access-isolation tests and avoid materially worsening unsupported-answer rates before speed or cost improvements count as a release benefit. Report cold and warm runs separately, and retain failed requests in reliability reporting.\n\nFor an illustrative test plan, a team might allocate 200 held-out queries across the four groups and repeat each configuration with three seeds. These are proposed design parameters, not an executed experiment or a statistically guaranteed sample size. Power and coverage depend on expected effect size and the risk of missed failures.\n\n## V. Limitations and next steps\nThis protocol cannot establish performance until implemented on a representative corpus. Labels may be incomplete, automated graders imperfect, and production traffic different from a fixed test set. Next steps are to publish an appropriately licensed corpus manifest, annotation guide, run configurations, and per-query outputs; then reproduce the comparison with uncertainty estimates.\n\n**Publication status:** Independent technical study, prepared for this portfolio with AI assistance. Not peer-reviewed, IEEE-published, or an IEEE compliance certification. Numbered references use an IEEE-style presentation.\n\n## References\n[1] P. Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks,” 2020. [arXiv:2005.11401](https://arxiv.org/abs/2005.11401).\n[2] S. Es, J. James, L. Espinosa-Anke, and S. Schockaert, “Ragas: Automated Evaluation of Retrieval Augmented Generation,” 2023, revised 2025. [arXiv:2309.15217](https://arxiv.org/abs/2309.15217).",author:"Achint Pal Singh",date:"2026-09-15"},{slug:"bounded-agent-workflows",title:"Designing Bounded Agent Workflows",readingTimeMinutes:5,summary:"An engineering note on tool permissions, explicit state transitions, idempotency, and evaluating agent behavior.",tags:["Agents","reliability","system design"],categories:["Agents","Governance"],status:"Guide",excerptMarkdown:"## Abstract\nAn agent's ability to choose actions does not establish permission to execute them. This article develops a proposed runtime design for bounded tool execution, drawing on ReAct's interleaving of reasoning and action [1] and the lifecycle risk-management perspective of NIST's Generative AI Profile [2]. The design is an engineering synthesis, not a claim of standards compliance or a tested security guarantee.\n\n## I. Separate planning from execution\nReAct demonstrates a pattern in which a model reasons and interacts with an environment [1]. In an application, a plan should be treated as a proposal. A deterministic execution layer should validate tool names, schemas, identities, and permitted resources before running an action.\n\nUse a narrow contract for each tool: inputs, effects, authorization scope, timeout, retry policy, and observable completion state. Reading a file and sending an email have different consequences and should have different execution policies. Retrieved content belongs in the evidence channel; it cannot grant new permissions.\n\n## II. Make state explicit\nA useful proposed lifecycle is: proposed, validated, awaiting approval when required, executing, succeeded, failed, or outcome unknown. Record transitions with a task ID, actor, timestamp, tool version, and sanitized result.\n\n“Outcome unknown” matters. If a network timeout follows a payment or message request, automatically retrying can duplicate the action. The executor should query an operation identifier or reconcile external state before deciding whether to retry. Where available, pass an idempotency key whose lifetime matches the logical action.\n\n## III. Bound the loop\nSet a maximum number of tool calls, an elapsed-time budget, and a resource budget. Stop when required context is missing, an approval expires, or a task reaches an unrecoverable error. A clear partial result is more useful than an agent cycling indefinitely.\n\nMemory writes should also be scoped. Store the provenance and owner of each durable fact, distinguish observation from inference, and support correction or removal. An old preference should not become permanent authorization for unrelated actions.\n\n## IV. Evaluation matrix\n| Test | Expected behavior |\n| --- | --- |\n| Tool output contains new instructions | Treat as data, preserve original task scope |\n| Invalid resource or tenant identifier | Reject before execution |\n| Timeout after a write | Reconcile outcome before retry |\n| Budget exhausted | Stop with a recoverable status |\n| Conflicting memory entry | Preserve provenance and request resolution when needed |\n| Expired approval | Prevent the dependent action |\n\nMeasure task success together with unauthorized-action rate, duplicate side effects, recovery success, and time to safe termination. Test deterministic execution controls independently of the model. A natural-language promise is not a substitute for a permission check.\n\n## V. Limits\nThese controls reduce particular failure modes; they do not prove that an autonomous system is safe in every environment. Tool behavior, identity boundaries, and real-world effects still require application-specific review. The NIST profile provides voluntary risk-management guidance [2]; this article does not certify conformance.\n\n**Publication status:** Independent engineering article, prepared with AI assistance. No new experimental results or peer-review status are claimed.\n\n## References\n[1] S. Yao et al., “ReAct: Synergizing Reasoning and Acting in Language Models,” ICLR, 2023. [arXiv:2210.03629](https://arxiv.org/abs/2210.03629).\n[2] C. Autio et al., “Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile,” NIST AI 600-1, 2024. [doi:10.6028/NIST.AI.600-1](https://doi.org/10.6028/NIST.AI.600-1).",author:"Achint Pal Singh",date:"2026-09-15"},{slug:"cost-per-successful-ai-task",title:"The Cost of a Successful AI Task",readingTimeMinutes:4,summary:"A practical measurement framework for comparing AI workflows without hiding retries, retrieval, or human review.",tags:["AI Economics","RAG","evaluation"],categories:["AI Economics","RAG"],status:"Guide",excerptMarkdown:"## Abstract\nA low token bill does not necessarily mean a low-cost AI product. This article proposes a task-level accounting model that includes failed attempts, retrieval, tools, and human review. All numeric examples are hypothetical. No current vendor pricing or measured production savings are asserted.\n\n## I. Define success before counting cost\nFor a document assistant, success might mean a correct response with supporting evidence, completed within a latency target and without disclosing unauthorized information. A fluent answer alone is not sufficient. Separating retrieval and generation quality follows the layered evaluation problem described in Ragas [1].\n\nDefine the success rubric before comparing models. Otherwise a cheaper workflow can appear efficient simply because it produces more low-quality answers that are mistakenly counted as successes.\n\n## II. Account for the whole workflow\nFor one evaluation window, let total cost include model input and output, embedding work, search and storage, external tools, infrastructure, and attributable review time. Divide this by the number of tasks meeting the predefined success rubric.\n\n**Cost per successful task = total attributable cost / successful tasks.**\n\nCount retries and failed requests in the numerator. If no task succeeds, report the measure as undefined, alongside total spend and zero successes. Do not display zero cost per success.\n\nDistinguish marginal cost from allocated fixed cost. A prototype using an already-running machine may have a small marginal bill while still consuming resources. State the traffic volume and allocation rule used.\n\n## III. Worked example\nSuppose workflow A spends $18 across 100 attempts and completes 80 tasks successfully. Its cost per success is $0.225. Workflow B spends $24 and completes 96 tasks successfully, yielding $0.25. B costs more per successful task in this example, although it completes more tasks. Whether that improvement is worthwhile depends on the consequences of failure and the service requirements.\n\nThese are arithmetic examples, not measurements or a model ranking. Adding human rework could change the ordering; that cost needs to be measured rather than assumed.\n\n## IV. Design an informative comparison\nRun the same held-out tasks through each workflow. Log model revision, prompt version, input/output tokens, cache behavior, retrieval time, tool calls, retry counts, and final outcome. Separate interactive and batch workloads. Report latency percentiles alongside success rate, cost per success, and the evaluation rubric.\n\nUse a sensitivity analysis for traffic, context length, cache hit rate, and review time. Fixed infrastructure amortization can make a system attractive at one workload and expensive at another. Recheck provider prices at the time of budgeting.\n\n## V. Limitations\nSuccess labels require judgment. Small evaluation sets can produce unstable rankings, and accounting conventions can obscure shared infrastructure costs. This framework proposes what to measure; it does not establish that one model, provider, or architecture is best.\n\n**Publication status:** Independent technical article, prepared with AI assistance; not peer-reviewed. Illustrative calculations only.\n\n## References\n[1] S. Es et al., “Ragas: Automated Evaluation of Retrieval Augmented Generation,” 2023, revised 2025. [arXiv:2309.15217](https://arxiv.org/abs/2309.15217).",author:"Achint Pal Singh",date:"2026-09-15"},{slug:"benchmarking-vector-search-startup-chatbots",title:"Practical AI for Search, RAG, and Automation: Benchmarking Vector Search for Startup Chatbots",author:"Achint Pal Singh",date:"2025-12-01",readingTimeMinutes:12,summary:"A 20-configuration benchmark of embedding and vector-database combinations for startup RAG chatbots, evaluating latency, Recall@5, nDCG@5, and operating cost under tight budget constraints.",tags:["RAG","embeddings","FAISS","Qdrant","ChromaDB","Azure AI Search","latency","Recall@5","nDCG@5","cost optimization"],categories:["RAG","Vector Search","AI Economics"],status:"Benchmark",coverImage:"/images/blog/vector-search-poster.png",pdfPath:"/research/vector-search-research.pdf",excerptMarkdown:`
## Overview

This independent research benchmarks embedding–database combinations for startup RAG chatbots operating under practical constraints: low latency, high recall, and monthly AI budgets often below $100.

## Research question

Under startup constraints (<$100/month, interactive latency, high recall), which combination of embedding model and vector database delivers the best balance of performance, scalability, and cost?

## Systems under test

Representative configurations included:

| ID | Embedding | Vector DB | Notes |
| --- | --- | --- | --- |
| C1 | SentenceTransformer MiniLM | FAISS | Fastest local baseline |
| C2 | SentenceTransformer | ChromaDB | Lightweight local stack |
| C3 | SentenceTransformer | Qdrant | Managed/local scalable option |
| C5 | OpenAI text-embedding-3-large | FAISS | Higher semantic precision |
| C7 | SentenceTransformer | Azure AI Search | Enterprise managed search |

## Method

- Benchmarked **20 configurations** across open-source and commercial embeddings
- Evaluated **FAISS**, **Qdrant**, **ChromaDB**, and **Azure AI Search**
- Used a corpus of about **1,000 enterprise-style documents** (~1.2M tokens)
- Measured **latency**, **Recall@5**, **nDCG@5**, and total cost of ownership

## Key takeaways

- Local open-source stacks such as SentenceTransformer + FAISS can deliver excellent recall and very low query latency at near-zero infrastructure cost for early prototypes.
- Higher-capacity commercial embeddings can improve semantic precision at modest monthly cost for smaller query volumes.
- Managed search services trade higher operating cost for enterprise scaling, security, and operational features.
- A three-tier deployment framing—Prototype, Production, and Enterprise—helps teams evolve architecture as traffic and compliance needs grow.

## Why it matters for recruiters

This is not a toy demo. It shows Achint can evaluate retrieval systems the way production teams do: with explicit metrics, cost models, and architecture tiers.
`.trim()},{slug:"vector-search-benchmarks-production-rag",title:"Vector Search Benchmarks for Production-Grade RAG Systems",author:"Achint Pal Singh",date:"2026-01-15",readingTimeMinutes:8,summary:"Companion framing for production RAG: how embedding/database combinations affect latency, ranking quality, architecture choices, and operating cost as systems move beyond prototypes.",tags:["vector search","production RAG","latency","accuracy","architecture","operating cost"],categories:["RAG","Vector Search"],status:"Research",coverImage:"/images/blog/vector-search-poster.png",pdfPath:"/research/vector-search-research.pdf",excerptMarkdown:`
## Focus

This article extends the vector-search benchmark work toward production-grade RAG considerations: retrieval quality under load, ranking metrics, architecture boundaries, and cost controls.

## Evaluation themes

- Embedding and database pairing trade-offs
- Latency budgets for interactive assistants
- Recall and ranking quality for trustworthy answers
- Operating cost as systems scale from prototype to production

## Practical guidance

Production RAG is not only about picking the “best” embedding. It requires clear retrieval SLOs, evaluation sets, fallback strategies, and cost visibility across embedding, vector storage, and generation.
`.trim()},{slug:"cloud-services-comparison-gcp-azure-aws",title:"Cloud Services Comparison — GCP vs Azure vs AWS",author:"Achint Pal Singh",date:"2026-02-10",readingTimeMinutes:10,summary:"A practical side-by-side comparison of GCP, Azure, and AWS across compute, storage, databases, networking, AI/ML, security, analytics, serverless, containers, and developer tooling.",tags:["GCP","Azure","AWS","compute","storage","AI/ML","security","analytics","serverless"],categories:["Cloud Platforms"],status:"Guide",coverImage:"/images/research/cloud-comparison.png",pdfPath:"/research/azure-cloud-guide.pdf",excerptMarkdown:`
## Purpose

A practical reference for mapping equivalent cloud services across **Google Cloud**, **Microsoft Azure**, and **AWS**.

## Categories covered

- Compute and serverless
- Storage and databases
- Networking
- AI / ML services
- Analytics and big data
- Security, identity, and operations
- Containers and developer tooling

## Selected mappings

| Category | GCP | Azure | AWS |
| --- | --- | --- | --- |
| Compute | Compute Engine, Cloud Run, Cloud Functions | Virtual Machines, App Service, Azure Functions | EC2, Lambda, App Runner |
| Object storage | Cloud Storage | Blob Storage | S3 |
| Managed SQL | Cloud SQL | Azure SQL | RDS |
| Data warehouse | BigQuery | Synapse Analytics | Redshift |
| ML platform | Vertex AI | Azure Machine Learning / Azure AI Foundry | SageMaker |

## How to use this guide

Use it as a translation layer when designing multi-cloud architectures, writing migration plans, or explaining platform choices in interviews and design reviews.
`.trim()},{slug:"microsoft-fabric-vs-azure-databricks",title:"Microsoft Fabric vs Azure Databricks",author:"Achint Pal Singh",date:"2026-07-03",readingTimeMinutes:9,summary:"A reproducible benchmark framework comparing Microsoft Fabric and Azure Databricks across SQL, ML, GenAI/RAG, and mixed data types. Local validation is complete; cloud performance runs were still pending at publication of the summary.",tags:["Microsoft Fabric","Azure Databricks","SQL","Spark","MLflow","GenAI","RAG","benchmark design"],categories:["Data Platforms","Cloud Platforms","RAG"],status:"Work in Progress",coverImage:"/images/research/fabric-databricks.png",pdfPath:"/research/fabric-vs-databricks.pdf",excerptMarkdown:`
## Status

This research summarizes a **pre-cloud** benchmark framework for comparing Microsoft Fabric and Azure Databricks.

> Local validation was completed. Cloud performance runs were still pending in the status report, so no measured cloud performance winner was declared.

## What was built

- End-to-end benchmark harness with canonical SQL queries, concurrency tests, ML lab, and GenAI/RAG pipelines
- Reproducible NYC TLC taxi datasets at multiple scales
- Documentation-based comparison across platform capability dimensions
- Preflight checks, smoke-test mode, and scoring eligibility rules

## Local validation highlights

- DuckDB reference engine: reference queries verified
- Automated test suite passed locally
- ML and GenAI/RAG pipelines runnable in local/sample mode
- Cloud preflight, smoke tests, and full benchmarks: not run at the time of the summary

## Research verdict (documentation + framework readiness)

Based on documented capabilities and framework readiness—not completed cloud latency/cost runs—Azure Databricks was recommended for teams prioritizing ML depth, custom GenAI tooling, and mixed SQL/Python/Spark workflows. Fabric remains strong for T-SQL warehouse and Power BI-centric paths.

## Important caveat

Cloud latency, cost, and editor-usability benchmarks must still be executed before declaring a measured performance winner.
`.trim()},{slug:"claude-opus-token-economics",title:"Mastering Claude Opus Token Economics for the Savvy Developer",author:"Achint Pal Singh",date:"2026-06-15",readingTimeMinutes:14,summary:"A developer-focused guide to Claude Opus token pricing, prompt caching, batch processing, conversation-history costs, output-cost management, and model-selection strategies.",tags:["tokens","prompt caching","batch processing","output cost","conversation history","model routing"],categories:["AI Economics","AI Models"],status:"Guide",coverImage:"/images/research/token-economics.png",pdfPath:"/research/claude-token-economics.pdf",excerptMarkdown:`
## Why token economics matters

Every prompt, uploaded file, and model response is measured in tokens. Understanding that cost model is essential for building sustainable AI products — especially when Opus-class models power agent workflows that can burn through context in a single session.

## The 5:1 mental model

For most frontier models, **output tokens cost several times more than input tokens**. A useful rule of thumb: if input is $X per million tokens, output is often ~5X. That asymmetry changes how you design prompts:

- Long system prompts are expensive once, but cheap on cache hits
- Verbose model answers are expensive **every turn**
- Retrieval-heavy pipelines pay twice: embedding input + generation input

## Prompt caching as a first-class lever

When your system prompt, tool definitions, and document prefix stay stable across requests, **prompt caching** can cut repeated prefix cost dramatically. I structure prompts so the static portion (policies, tool schemas, persona) sits at the top and caches cleanly.

## Batch APIs for async workloads

Indexing jobs, offline evals, and report generation rarely need sub-second latency. Routing those workloads to **batch endpoints** can reduce spend 40–50% compared to synchronous calls — at the cost of turnaround time. That trade is almost always worth it for nightly pipelines.

## Conversation history is a silent budget leak

Each turn re-sends prior messages. A 30-turn support chat with large retrieved chunks can explode input tokens even if the latest user message is short. Mitigations I use:

- Rolling summaries after N turns
- Store structured state instead of full transcript when possible
- Hard caps with graceful “start new session” UX

## Model routing checklist

| Task type | Model tier | Rationale |
| --- | --- | --- |
| Classification / routing | Small, fast | Minimal reasoning needed |
| RAG Q&A with citations | Mid-tier | Balance quality and cost |
| Multi-doc analysis | Frontier | Quality dominates |
| Code or schema generation | Mid or frontier | Depends on error cost |

## Practical cost controls in production

1. Log **tokens per successful task**, not just per request
2. Alert when p95 context size crosses thresholds
3. A/B test shorter prompt templates against quality metrics
4. Review tool outputs that trigger second-pass regeneration

## Takeaway

Treat cost controls as part of system design — caching, truncation policies, batching, and model selection are product decisions, not finance afterthoughts. Teams that instrument token spend early ship assistants that scale without surprise invoices.
`.trim()},{slug:"hermes-agents-memory",title:"Hermes-Style Agents, Memory, and Building a Chatbot That Never Forgets",author:"Achint Pal Singh",date:"2026-05-20",readingTimeMinutes:11,summary:"An exploration of durable memory patterns and Planner / Executor / Committer / Auditor agent designs for chatbots that retain useful context while remaining governable.",tags:["agents","durable memory","planner","executor","auditor","lifecycle","compliance"],categories:["Agents","Governance","Compliance"],status:"Guide",coverImage:"/images/research/hermes-agents.png",excerptMarkdown:`
## Why durable memory changes agent design

Most chatbots forget everything when the session ends. That is fine for FAQs — it is a problem when users expect an assistant to remember project context, prior decisions, and open tasks across days or weeks.

**Hermes-style agent architectures** address this by separating *what happened* from *what the model sees right now*. The goal is memory that is useful, auditable, and revocable.

## The four-role pattern

I organize long-running agents into four responsibilities:

| Role | Job | Example output |
| --- | --- | --- |
| **Planner** | Decompose goals into steps | Task graph with dependencies |
| **Executor** | Call tools, fetch data, draft content | Tool traces, partial results |
| **Committer** | Decide what becomes durable memory | Structured memory entries |
| **Auditor** | Review actions against policy | Allow / deny / escalate |

The critical insight: **only the Committer writes to durable memory**. Executors can be messy; memory must be deliberate.

## Memory layers that work in production

1. **Ephemeral context** — Current turn retrieval and tool outputs. Discarded after the session unless promoted.
2. **Session summaries** — Compressed narrative of what was accomplished. Cheap to inject into future prompts.
3. **Structured facts** — Key-value records: user preferences, matter IDs, approved decisions. Queryable without re-sending full chat logs.
4. **Audit log** — Immutable record of who changed what memory and when. Required for regulated domains.

## Governance without killing UX

Durable memory scares compliance teams for good reason. Mitigations I apply:

- User-visible memory panel (“what the assistant remembers about you”)
- TTL and deletion on request
- Role-based memory scopes (client vs internal analyst views)
- Auditor step for PHI or legally sensitive commits

## Lifecycle management

Memory entries should have states: **proposed → committed → superseded → deleted**. Never overwrite in place without leaving an audit trail. When a user corrects the bot, supersede the old fact rather than pretending the error never happened.

## When this pattern is worth the complexity

Use Planner / Executor / Committer / Auditor when:

- Sessions span multiple days
- Agents call external tools that mutate state
- You need explainability for automated decisions
- Compliance requires knowing *why* the assistant “remembered” something

Skip it for simple RAG Q&A over static documents — the overhead is not justified.

## Takeaway

A chatbot that “never forgets” without governance becomes a liability. Hermes-style designs trade a bit of latency and engineering cost for memory that is **intentional, inspectable, and safe to scale**.
`.trim()}].map(function(e){return{slug:e.slug,title:e.title,author:"Achint Pal Singh",date:e.date,readingTimeMinutes:e.readingTimeMinutes,summary:e.summary,tags:e.tags,coverImage:e.coverImage,pdfPath:e.pdfPath,source:"achint",excerptMarkdown:e.excerptMarkdown,featured:!0}}),{slug:"how-much-does-a-rag-chatbot-cost-2026",title:"How Much Does a RAG Chatbot Cost in 2026?",author:"Achint Pal Singh",date:"2026-06-11",readingTimeMinutes:14,summary:"A procurement-ready cost breakdown with low/medium/high budget tables, controllable cost levers, and a five-step vendor checklist for RAG chatbots.",tags:["Cost","Procurement","RAG"],coverImage:"/images/blog/rag-chatbot-cost-2026-poster.png",source:"achint",excerptMarkdown:`
## The question every stakeholder asks

“How much does a RAG chatbot cost?” is the wrong question if you stop at a single number. In 2026, the honest answer is a **range** driven by retrieval architecture, model routing, traffic shape, and how much human review you require.

I built this breakdown after helping teams scope chatbots from prototype to production. The numbers below are representative for a North American B2B SaaS or internal enterprise assistant — adjust for your region and compliance tier.

## Three budget profiles

### Low — prototype / pilot ($150–$800 / month)

| Component | Typical choice | Monthly note |
| --- | --- | --- |
| Embeddings | Open-source (MiniLM class) | Near-zero infra on a small VM |
| Vector store | FAISS or ChromaDB local | Storage only |
| LLM | Small commercial model, low volume | ~$50–$200 at <5k queries |
| Hosting | Single Cloud Run / VM | ~$30–$100 |
| Ops | Engineer time not included | |

**Good for:** internal demos, 10–50 users, non-regulated data, manual evaluation.

### Medium — production assistant ($2k–$8k / month)

| Component | Typical choice | Monthly note |
| --- | --- | --- |
| Embeddings | Commercial embedding API | Scales with re-index frequency |
| Vector store | Qdrant Cloud or managed search | $200–$1.5k |
| LLM | Routed models (fast + capable) | $800–$4k depending on traffic |
| Hosting | Cloud Run / K8s with autoscale | $200–$800 |
| Observability | Logging, evals, tracing | $100–$500 |

**Good for:** hundreds of daily users, SLA targets, basic audit logging.

### High — regulated / enterprise ($12k–$45k+ / month)

Adds: private networking, VPC endpoints, dedicated support tiers, HIPAA/SOC2 controls, red-team eval cycles, human-in-the-loop review queues, and multi-region failover.

**Good for:** healthcare, legal, financial services, customer-facing products at scale.

## Cost levers you actually control

1. **Chunking and retrieval quality** — Bad retrieval means longer prompts and more regeneration. Fixing retrieval often cuts LLM spend 20–40%.
2. **Model routing** — Route simple FAQs to a small model; reserve frontier models for complex turns.
3. **Prompt caching** — Reuse stable system prompts and document prefixes. Cache hits can dramatically reduce input token bills.
4. **Conversation memory policy** — Unbounded chat history is a silent budget leak. Summarize or truncate with explicit rules.
5. **Batch and async paths** — Indexing, eval runs, and report generation do not need real-time pricing tiers.

## Hidden costs buyers forget

- **Re-indexing** when documents change weekly
- **Evaluation infrastructure** — golden sets, regression tests, human review
- **Security review** cycles for new model providers
- **Customer support** when the bot answers confidently but wrongly

## Five-step vendor checklist

Before signing a RAG vendor or internal build proposal, ask:

1. What is included in “unlimited” retrieval — vector dimensions, query rate, storage?
2. How do you measure **cost per successful answer**, not just tokens?
3. What is the failover plan when the LLM provider has an outage?
4. Can we export embeddings and vectors if we leave?
5. Who owns the eval dataset and regression pipeline?

## Bottom line

A serious RAG chatbot in 2026 is rarely a $99/month SaaS add-on. It is a **system** — retrieval, models, hosting, governance, and evaluation. Start with a low pilot to prove retrieval quality, then scale spend deliberately as traffic and compliance requirements grow.
`.trim()},{slug:"7-compliance-mistakes-rag-healthcare",title:"7 Compliance Mistakes That Make RAG Chatbots Dangerous for Healthcare",author:"Achint Pal Singh",date:"2026-06-12",readingTimeMinutes:12,summary:"Seven common HIPAA pitfalls in healthcare RAG deployments, mitigations for each, and a practical readiness checklist.",tags:["Healthcare","HIPAA","Compliance","RAG"],coverImage:"/images/blog/rag-healthcare-compliance-poster.png",source:"achint",excerptMarkdown:`
## Healthcare RAG is not “chatGPT with PDFs”

Deploying a RAG chatbot in healthcare means PHI can enter the pipeline at ingestion, retrieval, generation, logging, and feedback stages. Most failures I see are not exotic attacks — they are **predictable design mistakes** that turn an helpful assistant into a compliance incident.

This article lists seven high-risk patterns and what to do instead.

## 1. Treating the vector index as non-PHI storage

**Mistake:** Embedding clinical notes or policy PDFs into a shared index without access controls at retrieval time.

**Fix:** Partition indexes by tenant, role, or care setting. Enforce authorization **before** retrieval returns chunks to the LLM. The model should never see documents the user is not allowed to read.

## 2. Logging full prompts and completions in plain text

**Mistake:** Shipping debug logs to a third-party observability tool with unrestricted retention.

**Fix:** Redact or tokenize PHI in logs. Use retention policies aligned with HIPAA minimum necessary principles. Prefer structured audit events (who, when, document IDs) over raw transcript dumps.

## 3. Ignoring BAAs for every subprocessors

**Mistake:** Signing a BAA with your cloud provider but not with the embedding API, LLM vendor, or support ticketing integration.

**Fix:** Maintain a subprocessor register. No new vendor enters the pipeline without legal review — including “just for evals” sandboxes.

## 4. Over-trusting retrieved context

**Mistake:** Assuming retrieved policy text is always current. Clinical pathways change; outdated chunks produce confident wrong answers.

**Fix:** Version documents, surface **effective dates** in citations, and block answers when retrieval confidence is low. A “I cannot find an current policy” response is safer than hallucinated guidance.

## 5. Unbounded conversational memory

**Mistake:** Persisting entire chat histories with PHI indefinitely for “personalization.”

**Fix:** Define memory scopes: session-only, role-based summaries, or explicit user-approved notes. Automate deletion schedules.

## 6. Skipping human-in-the-loop for high-risk intents

**Mistake:** Allowing the bot to interpret symptoms, suggest treatments, or summarize records without clinician review.

**Fix:** Intent routing that escalates clinical decision support to licensed professionals. Display disclaimers that are legally reviewed, not marketing copy.

## 7. No adversarial eval before go-live

**Mistake:** Launching after happy-path QA only.

**Fix:** Run red-team prompts: prompt injection via uploaded files, cross-patient leakage tests, and jailbreak attempts on system prompts. Track regression in CI like any other production service.

## Readiness checklist

Before production in a covered entity environment, confirm:

- [ ] BAAs executed for all AI and infra vendors handling PHI
- [ ] Retrieval enforces user/document authorization
- [ ] Logs minimize PHI and have retention limits
- [ ] Document versioning and stale-content handling documented
- [ ] Escalation paths for clinical and administrative queries defined
- [ ] Eval suite includes leakage and injection tests
- [ ] Incident response playbook includes model vendor contacts

## Closing thought

Healthcare RAG can reduce clinician admin burden — but only when compliance is engineered into retrieval, logging, and routing from day one. The organizations that succeed treat the chatbot as **clinical infrastructure**, not a demo wrapped in a portal.
`.trim()}];e.s(["blogPosts",0,t],11834)}]);