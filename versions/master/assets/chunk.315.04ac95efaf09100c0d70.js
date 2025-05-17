"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[315],{8315:(e,t,n)=>{let r
function o(e){r=e}function i(){return r}n.r(t),n.d(t,{blur:()=>Rt,clearRender:()=>Ze,click:()=>jt,currentRouteName:()=>he,currentURL:()=>pe,doubleClick:()=>Nt,fillIn:()=>Gt,find:()=>nn,findAll:()=>rn,focus:()=>Ot,getApplication:()=>c,getContext:()=>Se,getDebugInfo:()=>re,getDeprecations:()=>je,getDeprecationsDuringCallback:()=>Ne,getResolver:()=>i,getRootElement:()=>He,getSettledState:()=>Ee,getTestMetadata:()=>H,getWarnings:()=>Le,getWarningsDuringCallback:()=>De,hasEmberVersion:()=>f,isSettled:()=>Te,pauseTest:()=>Ae,registerDebugInfoHelper:()=>ee,registerHook:()=>X,render:()=>Je,rerender:()=>it,resetOnerror:()=>Ce,resumeTest:()=>$e,runHooks:()=>G,scrollTo:()=>un,select:()=>Zt,setApplication:()=>a,setContext:()=>Re,setResolver:()=>o,settled:()=>_e,setupApplicationContext:()=>ge,setupContext:()=>We,setupOnerror:()=>ke,setupRenderingContext:()=>et,tab:()=>Ft,tap:()=>Kt,teardownContext:()=>Ke,triggerEvent:()=>Ht,triggerKeyEvent:()=>zt,typeIn:()=>on,unsetContext:()=>Oe,validateErrorHandler:()=>lt,visit:()=>fe,waitFor:()=>tn,waitUntil:()=>N})
var s=n(2294),u=n.n(s)
let l
function a(e){l=e,i()||o(e.Resolver.create({namespace:e}))}function c(){return l}var d=n(5152)
function f(e,t){const n=d.VERSION.split("-")[0]?.split(".")
if(!n||!n[0]||!n[1])throw new Error("`Ember.VERSION` is not set.")
const r=parseInt(n[0],10),o=parseInt(n[1],10)
return r>e||r===e&&o>=t}var h=n(1223),m=n(4471),p=n.n(m),g=n(4540),w=n.n(g),b=n(3211),y=n.n(b)
const v=y()._ContainerProxyMixin,E=y()._RegistryProxyMixin,T=p().extend(E,v,{_emberTestHelpersMockOwner:!0,unregister(e){this.__container__.reset(e),this.__registry__.unregister(e)}})
function _(e,t){if(e)return e.boot().then((e=>e.buildInstance().boot()))
if(!t)throw new Error("You must set up the ember-test-helpers environment with either `setResolver` or `setApplication` before running any tests.")
const{owner:n}=function(e){const t=new(u())
t.Resolver={create:()=>e}
const n=u().buildRegistry(t)
n.register("component-lookup:main",y().ComponentLookup)
const r=new(y().Registry)({fallback:n})
w().setupRegistry(r),r.normalizeFullName=n.normalizeFullName,r.makeToString=n.makeToString,r.describe=n.describe
const o=T.create({__registry__:r,__container__:null}),i=r.container({owner:o})
return o.__container__=i,function(e){const t=["register","unregister","resolve","normalize","typeInjection","injection","factoryInjection","factoryTypeInjection","has","options","optionsForType"]
for(let n=0,r=t.length;n<r;n++){const r=t[n]
if(r&&r in e){const t=r
e[t]=function(...n){return e._registry[t](...n)}}}}(i),{registry:r,container:i,owner:o}}(t)
return Promise.resolve(n)}var P=n(8234),k=n(2394)
function C(e){return null!==e&&"object"==typeof e&&Reflect.get(e,"nodeType")===Node.ELEMENT_NODE}function I(e){return e instanceof Window}function x(e){return null!==e&&"object"==typeof e&&Reflect.get(e,"nodeType")===Node.DOCUMENT_NODE}function M(e){return"isContentEditable"in e&&e.isContentEditable}const R=["INPUT","BUTTON","SELECT","TEXTAREA"]
function S(e){return!I(e)&&!x(e)&&R.indexOf(e.tagName)>-1&&"hidden"!==e.type}const O=e=>Promise.resolve().then(e),A=setTimeout,$=[0,1,2,5,7],j=10
function N(e,t={}){const n="timeout"in t?t.timeout:1e3,r="timeoutMessage"in t?t.timeoutMessage:"waitUntil timed out",o=new Error(r)
return new Promise((function(t,r){let i=0
!function s(u){const l=$[u],a=void 0===l?j:l
A((function(){let l
i+=a
try{l=e()}catch(e){return void r(e)}if(l)t(l)
else{if(!(i<n))return void r(o)
s(u+1)}}),a)}(0)}))}var L=n(1603),D="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")()
function W(e,t,n){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class F{constructor(){W(this,"testName",void 0),W(this,"setupTypes",void 0),W(this,"usedHelpers",void 0),this.setupTypes=[],this.usedHelpers=[]}get isRendering(){return this.setupTypes.indexOf("setupRenderingContext")>-1&&this.usedHelpers.indexOf("render")>-1}get isApplication(){return this.setupTypes.indexOf("setupApplicationContext")>-1}}const K=new WeakMap
function H(e){return K.has(e)||K.set(e,new F),K.get(e)}function U(e){return null!==e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}const q=new WeakMap
function V(e){if(!e)throw new TypeError(`[@ember/test-helpers] could not get deprecations for an invalid test context: '${e}'`)
let t=q.get(e)
return Array.isArray(t)||(t=[],q.set(e,t)),t}if("undefined"!=typeof URLSearchParams){const e=new URLSearchParams(document.location.search.substring(1)),t=e.get("disabledDeprecations"),n=e.get("debugDeprecations")
t&&(0,L.registerDeprecationHandler)(((e,n,r)=>{n&&t.includes(n.id)||r.apply(null,[e,n])})),n&&(0,L.registerDeprecationHandler)(((e,t,r)=>{t&&n.includes(t.id),r.apply(null,[e,t])}))}const Q=new WeakMap
function B(e){if(!e)throw new TypeError(`[@ember/test-helpers] could not get warnings for an invalid test context: '${e}'`)
let t=Q.get(e)
return Array.isArray(t)||(t=[],Q.set(e,t)),t}if("undefined"!=typeof URLSearchParams){const e=new URLSearchParams(document.location.search.substring(1)),t=e.get("disabledWarnings"),n=e.get("debugWarnings")
t&&(0,L.registerWarnHandler)(((e,n,r)=>{n&&t.includes(n.id)||r.apply(null,[e,n])})),n&&(0,L.registerWarnHandler)(((e,t,r)=>{t&&n.includes(t.id),r.apply(null,[e,t])}))}const z=new Map
function Y(e,t){return`${e}:${t}`}function X(e,t,n){const r=Y(e,t)
let o=z.get(r)
return void 0===o&&(o=new Set,z.set(r,o)),o.add(n),{unregister(){o.delete(n)}}}function G(e,t,...n){const r=z.get(Y(e,t))||new Set,o=[]
return r.forEach((e=>{const t=e(...n)
o.push(t)})),Promise.all(o).then((()=>{}))}var J=n(2186)
const Z=new Set
function ee(e){Z.add(e)}function te(e,t,n){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const ne="Pending test waiters"
function re(){return!0===h._backburner.DEBUG&&"function"==typeof h._backburner.getDebugInfo?h._backburner.getDebugInfo():null}class oe{constructor(e,t=re()){te(this,"_settledState",void 0),te(this,"_debugInfo",void 0),te(this,"_summaryInfo",void 0),this._settledState=e,this._debugInfo=t}get summary(){return this._summaryInfo||(this._summaryInfo={...this._settledState},this._debugInfo&&(this._summaryInfo.autorunStackTrace=this._debugInfo.autorun&&this._debugInfo.autorun.stack,this._summaryInfo.pendingTimersCount=this._debugInfo.timers.length,this._summaryInfo.hasPendingTimers=this._settledState.hasPendingTimers&&this._summaryInfo.pendingTimersCount>0,this._summaryInfo.pendingTimersStackTraces=this._debugInfo.timers.map((e=>e.stack)),this._summaryInfo.pendingScheduledQueueItemCount=this._debugInfo.instanceStack.filter(ie).reduce(((e,t)=>(Object.values(t).forEach((t=>{e+=t?.length??0})),e)),0),this._summaryInfo.pendingScheduledQueueItemStackTraces=this._debugInfo.instanceStack.filter(ie).reduce(((e,t)=>(Object.values(t).forEach((t=>{t?.forEach((t=>t.stack&&e.push(t.stack)))})),e)),[])),this._summaryInfo.hasPendingTestWaiters&&(this._summaryInfo.pendingTestWaiterInfo=(0,J.getPendingWaiterState)())),this._summaryInfo}toConsole(e=console){const t=this.summary
t.hasPendingRequests&&e.log("Pending AJAX requests"),t.hasPendingLegacyWaiters&&e.log(ne),t.hasPendingTestWaiters&&(t.hasPendingLegacyWaiters||e.log(ne),Object.keys(t.pendingTestWaiterInfo.waiters).forEach((n=>{const r=t.pendingTestWaiterInfo.waiters[n]
Array.isArray(r)?(e.group(n),r.forEach((t=>{e.log(`${t.label?t.label:"stack"}: ${t.stack}`)})),e.groupEnd()):e.log(n)}))),(t.hasPendingTimers||t.pendingScheduledQueueItemCount>0)&&(e.group("Scheduled async"),t.pendingTimersStackTraces.forEach((t=>{e.log(t)})),t.pendingScheduledQueueItemStackTraces.forEach((t=>{e.log(t)})),e.groupEnd()),t.hasRunLoop&&0===t.pendingTimersCount&&0===t.pendingScheduledQueueItemCount&&(e.log("Scheduled autorun"),t.autorunStackTrace&&e.log(t.autorunStackTrace)),Z.forEach((e=>{e.log()}))}_formatCount(e,t){return`${e}: ${t}`}}function ie(e){return null!=e}const se=f(3,6)
let ue=null
const le=new WeakMap,ae=new WeakMap
function ce(e){return Ie(e)}function de(){if(se)return ue
const e=Se()
if(void 0===e)return null
const t=le.get(e)
if(void 0===t)return null
const n=t._routerMicrolib||t.router
return void 0===n?null:!!n.activeTransition}function fe(e,t){const n=Se()
if(!n||!ce(n))throw new Error("Cannot call `visit` without having first called `setupApplicationContext`.")
const{owner:r}=n
return H(n).usedHelpers.push("visit"),Promise.resolve().then((()=>G("visit","start",e,t))).then((()=>{const n=r.visit(e,t)
return function(){const e=Se()
if(void 0===e||!Ie(e))throw new Error("Cannot setupRouterSettlednessTracking outside of a test context")
if(ae.get(e))return
ae.set(e,!0)
const{owner:t}=e
let n
if(se){const e=t.lookup("service:router");(0,L.assert)("router service is not set up correctly",!!e),n=e,n.on("routeWillChange",(()=>ue=!0)),n.on("routeDidChange",(()=>ue=!1))}else{const r=t.lookup("router:main");(0,L.assert)("router:main is not available",!!r),n=r,le.set(e,n)}const r=n.willDestroy
n.willDestroy=function(){return ue=null,r.call(this)}}(),n})).then((()=>{!1!==D.EmberENV._APPLICATION_TEMPLATE_WRAPPER?n.element=document.querySelector("#ember-testing > .ember-view"):n.element=document.querySelector("#ember-testing")})).then(_e).then((()=>G("visit","end",e,t)))}function he(){const e=Se()
if(!e||!ce(e))throw new Error("Cannot call `currentRouteName` without having first called `setupApplicationContext`.")
const t=e.owner.lookup("router:main").currentRouteName
return(0,L.assert)("currentRouteName should be a string","string"==typeof t),t}const me=f(2,13)
function pe(){const e=Se()
if(!e||!ce(e))throw new Error("Cannot call `currentURL` without having first called `setupApplicationContext`.")
const t=e.owner.lookup("router:main")
if(me){const e=t.currentURL
return null===e||(0,L.assert)("currentUrl should be a string, but was "+typeof e,"string"==typeof e),e}return t.location.getURL()}function ge(e){return H(e).setupTypes.push("setupApplicationContext"),Promise.resolve()}let we
const be=P.Test.checkWaiters
function ye(e,t){we.push(t)}function ve(e,t){O((()=>{for(let e=0;e<we.length;e++)t===we[e]&&we.splice(e,1)}))}function Ee(){const e=h._backburner.hasTimers(),t=Boolean(h._backburner.currentInstance),n=be(),r=(0,J.hasPendingWaiters)(),o=(void 0!==we?we.length:0)+(0,k.pendingRequests)(),i=o>0,s=!!t
return{hasPendingTimers:e,hasRunLoop:t,hasPendingWaiters:n||r,hasPendingRequests:i,hasPendingTransitions:de(),isRenderPending:s,pendingRequestCount:o,debugInfo:new oe({hasPendingTimers:e,hasRunLoop:t,hasPendingLegacyWaiters:n,hasPendingTestWaiters:r,hasPendingRequests:i,isRenderPending:s})}}function Te(){const{hasPendingTimers:e,hasRunLoop:t,hasPendingRequests:n,hasPendingWaiters:r,hasPendingTransitions:o,isRenderPending:i}=Ee()
return!(e||t||n||r||o||i)}function _e(){return N(Te,{timeout:1/0}).then((()=>{}))}const Pe=new Map
function ke(e){const t=Se()
if(!t)throw new Error("Must setup test context before calling setupOnerror")
if(!Pe.has(t))throw new Error("_cacheOriginalOnerror must be called before setupOnerror. Normally, this will happen as part of your test harness.")
"function"!=typeof e&&(e=Pe.get(t)),y().onerror=e}function Ce(){const e=Se()
e&&Pe.has(e)&&(y().onerror=Pe.get(e))}function Ie(e){const t=e
return"function"==typeof t.pauseTest&&"function"==typeof t.resumeTest}function xe(e){return e&&e.Math===Math&&e}(0,L.registerDeprecationHandler)(((e,t,n)=>{const r=Se()
void 0!==r?(V(r).push({message:e,options:t}),n.apply(null,[e,t])):n.apply(null,[e,t])})),(0,L.registerWarnHandler)(((e,t,n)=>{const r=Se()
void 0!==r?(B(r).push({message:e,options:t}),n.apply(null,[e,t])):n.apply(null,[e,t])}))
const Me=xe("object"==typeof globalThis&&globalThis)||xe("object"==typeof window&&window)||xe("object"==typeof self&&self)||xe("object"==typeof D&&D)
function Re(e){Me.__test_context__=e}function Se(){return Me.__test_context__}function Oe(){Me.__test_context__=void 0}function Ae(){const e=Se()
if(!e||!Ie(e))throw new Error("Cannot call `pauseTest` without having first called `setupTest` or `setupRenderingTest`.")
return e.pauseTest()}function $e(){const e=Se()
if(!e||!Ie(e))throw new Error("Cannot call `resumeTest` without having first called `setupTest` or `setupRenderingTest`.")
e.resumeTest()}function je(){const e=Se()
if(!e)throw new Error("[@ember/test-helpers] could not get deprecations if no test context is currently active")
return V(e)}function Ne(e){const t=Se()
if(!t)throw new Error("[@ember/test-helpers] could not get deprecations if no test context is currently active")
return function(e,t){if(!e)throw new TypeError(`[@ember/test-helpers] could not get deprecations for an invalid test context: '${e}'`)
const n=V(e),r=n.length,o=t()
return U(o)?Promise.resolve(o).then((()=>n.slice(r))):n.slice(r)}(t,e)}function Le(){const e=Se()
if(!e)throw new Error("[@ember/test-helpers] could not get warnings if no test context is currently active")
return B(e)}function De(e){const t=Se()
if(!t)throw new Error("[@ember/test-helpers] could not get warnings if no test context is currently active")
return function(e,t){if(!e)throw new TypeError(`[@ember/test-helpers] could not get warnings for an invalid test context: '${e}'`)
const n=B(e),r=n.length,o=t()
return U(o)?Promise.resolve(o).then((()=>n.slice(r))):n.slice(r)}(t,e)}function We(e,t={}){const n=e
return y().testing=!0,Re(n),H(n).setupTypes.push("setupContext"),h._backburner.DEBUG=!0,function(e){if(Pe.has(e))throw new Error("_prepareOnerror should only be called once per-context")
Pe.set(e,y().onerror)}(n),Promise.resolve().then((()=>{const e=c()
if(e)return e.boot().then((()=>{}))})).then((()=>{const{resolver:e}=t
return e?_(null,e):_(c(),i())})).then((e=>{let t
return Object.defineProperty(n,"owner",{configurable:!0,enumerable:!0,value:e,writable:!1}),(0,s.setOwner)(n,e),Object.defineProperty(n,"set",{configurable:!0,enumerable:!0,value:(e,t)=>(0,h.run)((function(){return(0,m.set)(n,e,t)})),writable:!1}),Object.defineProperty(n,"setProperties",{configurable:!0,enumerable:!0,value:e=>(0,h.run)((function(){return(0,m.setProperties)(n,e)})),writable:!1}),Object.defineProperty(n,"get",{configurable:!0,enumerable:!0,value:e=>(0,m.get)(n,e),writable:!1}),Object.defineProperty(n,"getProperties",{configurable:!0,enumerable:!0,value:(...e)=>(0,m.getProperties)(n,e),writable:!1}),n.resumeTest=function(){(0,L.assert)("Testing has not been paused. There is nothing to resume.",!!t),t(),D.resumeTest=t=void 0},n.pauseTest=function(){return console.info("Testing paused. Use `resumeTest()` to continue."),new Promise((e=>{t=e,D.resumeTest=$e}))},we=[],void 0!==globalThis.jQuery&&(globalThis.jQuery(document).on("ajaxSend",ye),globalThis.jQuery(document).on("ajaxComplete",ve)),n}))}var Fe=n(1130)
function Ke(e,{waitForSettled:t=!0}={}){return Promise.resolve().then((()=>{!function(e){Ce(),Pe.delete(e)}(e),we=[],void 0!==globalThis.jQuery&&(globalThis.jQuery(document).off("ajaxSend",ye),globalThis.jQuery(document).off("ajaxComplete",ve)),y().testing=!1,Oe(),(0,Fe.destroy)(e.owner)})).finally((()=>{if(t)return _e()}))}function He(){const e=Se()
if(!e||!Ie(e)||!e.owner)throw new Error("Must setup rendering context before attempting to interact with elements.")
const t=e.owner
let n
if(n=t&&void 0===t._emberTestHelpersMockOwner?t.rootElement:"#ember-testing",n instanceof Window&&(n=n.document),C(n)||x(n))return n
if("string"==typeof n){const e=document.querySelector(n)
if(e)return e
throw new Error(`Application.rootElement (${n}) not found`)}throw new Error("Application.rootElement must be an element or a selector string")}var Ue=n(9095),qe=n(1465)
const Ve=(0,qe.createTemplateFactory)({id:"xYhQRb+C",block:'[[[46,[28,[37,1],null,null],null,null,null]],[],false,["component","-outlet"]]',moduleName:"/home/runner/work/ember-mobile-menu/ember-mobile-menu/node_modules/.pnpm/@ember+test-helpers@5.1.0_@babel+core@7.27.1_ember-source@6.3.0_@glimmer+component@1.1._f6889e2b93c156f3dcfe716662ba3010/node_modules/@ember/test-helpers/dist/setup-rendering-context.js",isStrictMode:!1}),Qe=(0,qe.createTemplateFactory)({id:"RRYGJEJ2",block:"[[],[],false,[]]",moduleName:"/home/runner/work/ember-mobile-menu/ember-mobile-menu/node_modules/.pnpm/@ember+test-helpers@5.1.0_@babel+core@7.27.1_ember-source@6.3.0_@glimmer+component@1.1._f6889e2b93c156f3dcfe716662ba3010/node_modules/@ember/test-helpers/dist/setup-rendering-context.js",isStrictMode:!1}),Be=(0,qe.createTemplateFactory)({id:"zpF2m1Dx",block:'[[[8,[30,0,["ProvidedComponent"]],null,null,null]],[],false,[]]',moduleName:"/home/runner/work/ember-mobile-menu/ember-mobile-menu/node_modules/.pnpm/@ember+test-helpers@5.1.0_@babel+core@7.27.1_ember-source@6.3.0_@glimmer+component@1.1._f6889e2b93c156f3dcfe716662ba3010/node_modules/@ember/test-helpers/dist/setup-rendering-context.js",isStrictMode:!1}),ze=Symbol()
function Ye(e){return Ie(e)&&ze in e}function Xe(e,t){const n=e.lookup(t)
return"function"==typeof n?n(e):n}let Ge=0
function Je(e,t){let n=Se()
if(!e)throw new Error("you must pass a template to `render()`")
return Promise.resolve().then((()=>G("render","start"))).then((()=>{if(!n||!Ye(n))throw new Error("Cannot call `render` without having first called `setupRenderingContext`.")
const{owner:r}=n
H(n).usedHelpers.push("render")
const o=r.lookup("-top-level-view:main"),i=function(e){let t=Xe(e,"template:-outlet")
return t||(e.register("template:-outlet",Ve),t=Xe(e,"template:-outlet")),t}(r),s=t?.owner||r
var u
u=e,(0,Ue.getInternalComponentManager)(u,!0)&&(n={ProvidedComponent:e},e=Be),Ge+=1
const l=`template:-undertest-${Ge}`
s.register(l,e)
const a=Xe(s,l),c={render:{owner:r,into:void 0,outlet:"main",name:"application",controller:void 0,ViewClass:void 0,template:i},outlets:{main:{render:{owner:s,into:void 0,outlet:"main",name:"index",controller:n,ViewClass:void 0,template:a,outlets:{}},outlets:{}}}}
return o.setOutletState(c),f(3,23)||h.run.backburner.ensureInstance(),_e()})).then((()=>G("render","end")))}function Ze(){const e=Se()
if(!e||!Ye(e))throw new Error("Cannot call `clearRender` without having first called `setupRenderingContext`.")
return Je(Qe)}function et(e){H(e).setupTypes.push("setupRenderingContext")
const t=function(e){return e[ze]=!0,e}(e)
return Promise.resolve().then((()=>{const{owner:e}=t
e._emberTestHelpersMockOwner&&(e.lookup("event_dispatcher:main")||y().EventDispatcher.create()).setup({},"#ember-testing")
const n=e.factoryFor?e.factoryFor("view:-outlet"):e._lookupFactory("view:-outlet"),r=e.lookup("-environment:main"),o=e.lookup("template:-outlet"),i=n.create({template:o,environment:r})
return e.register("-top-level-view:main",{create:()=>i}),Je(Qe).then((()=>((0,h.run)(i,"appendTo",He()),_e())))})).then((()=>(Object.defineProperty(t,"element",{configurable:!0,enumerable:!0,value:!1!==D.EmberENV._APPLICATION_TEMPLATE_WRAPPER?He().querySelector(".ember-view"):He(),writable:!1}),t)))}var tt=n(6437),nt=n(2015)
let rt
rt=(0,tt.A)(nt).renderSettled
var ot=rt
function it(){return ot()}const st=Object.freeze({isValid:!0,message:null}),ut=Object.freeze({isValid:!1,message:"error handler should have re-thrown the provided error"})
function lt(e=y().onerror){if(null==e)return st
const t=new Error("Error handler validation error!"),n=y().testing
y().testing=!0
try{e(t)}catch(e){if(e===t)return st}finally{y().testing=n}return ut}const at="__dom_element_descriptor_is_descriptor__"
function ct(e){return Boolean("object"==typeof e&&e&&at in e)}function dt(e){return function(){const e=window
return e.domElementDescriptorsRegistry=e.domElementDescriptorsRegistry||new WeakMap,e.domElementDescriptorsRegistry}().get(e)||null}function ft(e){if("string"==typeof e)return He().querySelector(e)
if(C(e)||x(e))return e
if(e instanceof Window)return e.document
{const t=dt(e)
if(t)return function(e){let t=ct(e)?dt(e):e
if(!t)return null
if(void 0!==t.element)return t.element
for(let n of t.elements||[])return n
return null}(t)
throw new Error("Must use an element, selector string, or DOM element descriptor")}}function ht(e){return I(e)?e:ft(e)}function mt(...e){return e}function pt(e,t,...n){"undefined"!=typeof location&&-1!==location.search.indexOf("testHelperLogging")&&console.log(`${e}(${[gt(t),...n.filter(Boolean)].join(", ")})`)}function gt(e){let t
return e instanceof NodeList?0===e.length?"empty NodeList":(t=Array.prototype.slice.call(e,0,5).map(gt).join(", "),e.length>5?`${t}... (+${e.length-5} more)`:t):e instanceof HTMLElement||e instanceof SVGElement?(t=e.tagName.toLowerCase(),e.id&&(t+=`#${e.id}`),!e.className||e.className instanceof SVGAnimatedString||(t+=`.${String(e.className).replace(/\s+/g,".")}`),Array.prototype.forEach.call(e.attributes,(function(e){"class"!==e.name&&"id"!==e.name&&(t+=`[${e.name}${e.value?`="${e.value}"]`:"]"}`)})),t):String(e)}X("fireEvent","start",(e=>{pt("fireEvent",e)}))
const wt=(()=>{try{return new MouseEvent("test"),!0}catch{return!1}})(),bt={bubbles:!0,cancelable:!0},yt=mt("keydown","keypress","keyup")
function vt(e){return yt.indexOf(e)>-1}const Et=mt("click","mousedown","mouseup","dblclick","mouseenter","mouseleave","mousemove","mouseout","mouseover"),Tt=mt("change")
function _t(e,t,n={}){return Promise.resolve().then((()=>G("fireEvent","start",e))).then((()=>G(`fireEvent:${t}`,"start",e))).then((()=>{if(!e)throw new Error("Must pass an element to `fireEvent`")
let r
if(vt(t))r=kt(t,n)
else if(function(e){return Et.indexOf(e)>-1}(t)){let o
if(e instanceof Window&&e.document.documentElement)o=e.document.documentElement.getBoundingClientRect()
else if(x(e))o=e.documentElement.getBoundingClientRect()
else{if(!C(e))return
o=e.getBoundingClientRect()}const i=o.left+1,s=o.top+1,u={screenX:i+5,screenY:s+95,clientX:i,clientY:s,...n}
r=function(e,t={}){let n
const r={view:window,...bt,...t}
if(wt)n=new MouseEvent(e,r)
else try{n=document.createEvent("MouseEvents"),n.initMouseEvent(e,r.bubbles,r.cancelable,window,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.button,r.relatedTarget)}catch{n=Pt(e,t)}return n}(t,u)}else r=function(e){return Tt.indexOf(e)>-1}(t)&&function(e){return e.files}(e)?function(e,t,n={}){const r=Pt(e),o=n.files
if(Array.isArray(n))throw new Error("Please pass an object with a files array to `triggerEvent` instead of passing the `options` param as an array to.")
if(Array.isArray(o)){Object.defineProperty(o,"item",{value(e){return"number"==typeof e?this[e]:null},configurable:!0}),Object.defineProperty(t,"files",{value:o,configurable:!0})
const e=Object.getPrototypeOf(t),n=Object.getOwnPropertyDescriptor(e,"value")
Object.defineProperty(t,"value",{configurable:!0,get:()=>n.get.call(t),set(e){n.set.call(t,e),Object.defineProperty(t,"files",{configurable:!0,value:[]})}})}return Object.defineProperty(r,"target",{value:t}),r}(t,e,n):Pt(t,n)
return e.dispatchEvent(r),r})).then((n=>G(`fireEvent:${t}`,"end",e).then((()=>n)))).then((t=>G("fireEvent","end",e).then((()=>t))))}function Pt(e,t={}){const n=document.createEvent("Events"),r=void 0===t.bubbles||t.bubbles,o=void 0===t.cancelable||t.cancelable
delete t.bubbles,delete t.cancelable,n.initEvent(e,r,o)
for(const i in t)n[i]=t[i]
return n}function kt(e,t={}){const n={...bt,...t}
let r,o
try{return r=new KeyboardEvent(e,n),Object.defineProperty(r,"keyCode",{get:()=>parseInt(n.keyCode)}),Object.defineProperty(r,"which",{get:()=>parseInt(n.which)}),r}catch{}try{r=document.createEvent("KeyboardEvents"),o="initKeyboardEvent"}catch{}if(!r)try{r=document.createEvent("KeyEvents"),o="initKeyEvent"}catch{}return r&&o?r[o](e,n.bubbles,n.cancelable,window,n.ctrlKey,n.altKey,n.shiftKey,n.metaKey,n.keyCode,n.charCode):r=Pt(e,t),r}const Ct=["A","SUMMARY"]
function It(e){return!I(e)&&!x(e)&&(S(e)?!e.disabled:!(!M(e)&&!function(e){return Ct.indexOf(e.tagName)>-1}(e))||e.hasAttribute("tabindex"))}function xt(e){const t=ct(e)?dt(e):null
return t?t.description||"<unknown descriptor>":`${e}`}function Mt(e,t=null){if(!It(e))throw new Error(`${e} is not focusable`)
const n=document.hasFocus&&!document.hasFocus(),r=null!==t
r||e.blur()
const o={relatedTarget:t}
return n||r?Promise.resolve().then((()=>_t(e,"blur",{bubbles:!1,...o}))).then((()=>_t(e,"focusout",o))):Promise.resolve()}function Rt(e=document.activeElement){return Promise.resolve().then((()=>G("blur","start",e))).then((()=>{const t=ft(e)
if(!t){const t=xt(e)
throw new Error(`Element not found when calling \`blur('${t}')\`.`)}return Mt(t).then((()=>_e()))})).then((()=>G("blur","end",e)))}function St(e){return Promise.resolve().then((()=>{const t=function(e){if(x(e))return null
let t=e
for(;t&&!It(t);)t=t.parentElement
return t}(e),n=document.activeElement&&document.activeElement!==t&&It(document.activeElement)?document.activeElement:null
return!t&&n?Mt(n,null).then((()=>Promise.resolve({focusTarget:t,previousFocusedElement:n}))):Promise.resolve({focusTarget:t,previousFocusedElement:n})})).then((({focusTarget:e,previousFocusedElement:t})=>{if(!e)throw new Error("There was a previously focused element")
const n=!document?.hasFocus()
return t&&n?Mt(t,e).then((()=>Promise.resolve({focusTarget:e}))):Promise.resolve({focusTarget:e})})).then((({focusTarget:e})=>{e.focus()
const t=document?.hasFocus()
return t?Promise.resolve():Promise.resolve().then((()=>_t(e,"focus",{bubbles:!1}))).then((()=>_t(e,"focusin"))).then((()=>_e()))})).catch((()=>{}))}function Ot(e){return Promise.resolve().then((()=>G("focus","start",e))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `focus`.")
const t=ft(e)
if(!t){const t=xt(e)
throw new Error(`Element not found when calling \`focus('${t}')\`.`)}if(!It(t))throw new Error(`${t} is not focusable`)
return St(t).then(_e)})).then((()=>G("focus","end",e)))}X("blur","start",(e=>{pt("blur",e)})),X("focus","start",(e=>{pt("focus",e)})),X("click","start",(e=>{pt("click",e)}))
const At={buttons:1,button:0}
function $t(e,t){return Promise.resolve().then((()=>_t(e,"mousedown",t))).then((t=>I(e)||t?.defaultPrevented?Promise.resolve():St(e))).then((()=>_t(e,"mouseup",t))).then((()=>_t(e,"click",t)))}function jt(e,t={}){const n={...At,...t}
return Promise.resolve().then((()=>G("click","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `click`.")
const t=ht(e)
if(!t){const t=xt(e)
throw new Error(`Element not found when calling \`click('${t}')\`.`)}if(S(t)&&t.disabled)throw new Error(`Can not \`click\` disabled ${t}`)
return $t(t,n).then(_e)})).then((()=>G("click","end",e,t)))}function Nt(e,t={}){const n={...At,...t}
return Promise.resolve().then((()=>G("doubleClick","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `doubleClick`.")
const t=ht(e)
if(!t){const t=xt(e)
throw new Error(`Element not found when calling \`doubleClick('${t}')\`.`)}if(S(t)&&t.disabled)throw new Error(`Can not \`doubleClick\` disabled ${t}`)
return function(e,t){return Promise.resolve().then((()=>_t(e,"mousedown",t))).then((t=>I(e)||t?.defaultPrevented?Promise.resolve():St(e))).then((()=>_t(e,"mouseup",t))).then((()=>_t(e,"click",t))).then((()=>_t(e,"mousedown",t))).then((()=>_t(e,"mouseup",t))).then((()=>_t(e,"click",t))).then((()=>_t(e,"dblclick",t)))}(t,n).then(_e)})).then((()=>G("doubleClick","end",e,t)))}X("doubleClick","start",(e=>{pt("doubleClick",e)}))
const Lt="inert"in Element.prototype,Dt=["CANVAS","VIDEO","PICTURE"]
function Wt(e){return e.activeElement||e.body}function Ft({backwards:e=!1,unRestrainTabIndex:t=!1}={}){return Promise.resolve().then((()=>function(e,t){const n=He()
let r,o
x(n)?(o=n.body,r=n):(o=n,r=n.ownerDocument)
const i={keyCode:9,which:9,key:"Tab",code:"Tab",shiftKey:e},s={keyboardEventOptions:i,ownerDocument:r,rootElement:o}
return Promise.resolve().then((()=>G("tab","start",s))).then((()=>Wt(r))).then((e=>G("tab","targetFound",e).then((()=>e)))).then((t=>{const n=kt("keydown",i)
if(t.dispatchEvent(n)){t=Wt(r)
const n=function(e,t){const n=function(e=document.body){const{ownerDocument:t}=e
if(!t)throw new Error("Element must be in the DOM")
const n=Wt(t),r=t.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{if("AREA"!==e.tagName&&!1===function(e){const t=window.getComputedStyle(e)
return"none"!==t.display&&"hidden"!==t.visibility}(e))return NodeFilter.FILTER_REJECT
const t=e.parentNode
return t&&-1!==Dt.indexOf(t.tagName)||Lt&&e.inert||S(r=e)&&r.disabled?NodeFilter.FILTER_REJECT:e===n||e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP
var r}})
let o
const i=[]
for(;o=r.nextNode();)i.push(o)
return i}(e),r=function(e){return e.map(((e,t)=>({index:t,element:e}))).sort(((e,t)=>e.element.tabIndex===t.element.tabIndex?e.index-t.index:0===e.element.tabIndex||0===t.element.tabIndex?t.element.tabIndex-e.element.tabIndex:e.element.tabIndex-t.element.tabIndex)).map((e=>e.element))}(n),o=-1===t.tabIndex?n:r,i=o.indexOf(t)
return-1===i?{next:r[0],previous:r[r.length-1]}:{next:o[i+1],previous:o[i-1]}}(o,t)
if(n)return e&&n.previous?St(n.previous):!e&&n.next?St(n.next):Mt(t)}return Promise.resolve()})).then((()=>{const e=Wt(r)
return _t(e,"keyup",i).then((()=>e))})).then((e=>{if(!t&&e.tabIndex>0)throw new Error(`tabindex of greater than 0 is not allowed. Found tabindex=${e.tabIndex}`)})).then((()=>G("tab","end",s)))}(e,t))).then((()=>_e()))}function Kt(e,t={}){return Promise.resolve().then((()=>G("tap","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `tap`.")
const n=ft(e)
if(!n){const t=xt(e)
throw new Error(`Element not found when calling \`tap('${t}')\`.`)}if(S(n)&&n.disabled)throw new Error(`Can not \`tap\` disabled ${n}`)
return _t(n,"touchstart",t).then((e=>_t(n,"touchend",t).then((t=>[e,t])))).then((([e,r])=>e.defaultPrevented||r.defaultPrevented?Promise.resolve():$t(n,t))).then(_e)})).then((()=>G("tap","end",e,t)))}function Ht(e,t,n){return Promise.resolve().then((()=>G("triggerEvent","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `triggerEvent`.")
if(!t)throw new Error("Must provide an `eventType` to `triggerEvent`")
const r=ht(e)
if(!r){const t=xt(e)
throw new Error(`Element not found when calling \`triggerEvent('${t}', ...)\`.`)}if(S(r)&&r.disabled)throw new Error(`Can not \`triggerEvent\` on disabled ${r}`)
return _t(r,t,n).then(_e)})).then((()=>G("triggerEvent","end",e,t,n)))}X("tab","start",(e=>{pt("tab",e)})),X("tap","start",(e=>{pt("tap",e)})),X("triggerEvent","start",((e,t)=>{pt("triggerEvent",e,t)})),X("triggerKeyEvent","start",((e,t,n)=>{pt("triggerKeyEvent",e,t,n)}))
const Ut=Object.freeze({ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1}),qt={8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"Meta",93:"Meta",186:";",187:"=",188:",",189:"-",190:".",191:"/",219:"[",220:"\\",221:"]",222:"'"},Vt={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",186:":",187:"+",188:"<",189:"_",190:">",191:"?",219:"{",220:"|",221:"}",222:'"'}
function Qt(e,t){return e>64&&e<91?t.shiftKey?String.fromCharCode(e):String.fromCharCode(e).toLocaleLowerCase():t.shiftKey&&Vt[e]||qt[e]}function Bt(e,t,n,r=Ut){return Promise.resolve().then((()=>{let o
if("number"==typeof n)o={keyCode:n,which:n,key:Qt(n,r),...r}
else{if("string"!=typeof n||0===n.length)throw new Error("Must provide a `key` or `keyCode` to `triggerKeyEvent`")
{const e=n[0]
if(!e||e!==e.toUpperCase())throw new Error(`Must provide a \`key\` to \`triggerKeyEvent\` that starts with an uppercase character but you passed \`${n}\`.`)
if(i=n,!isNaN(parseFloat(i))&&isFinite(Number(i))&&n.length>1)throw new Error(`Must provide a numeric \`keyCode\` to \`triggerKeyEvent\` but you passed \`${n}\` as a string.`)
const t=function(e){const t=Object.keys(qt),n=t.find((t=>qt[Number(t)]===e))||t.find((t=>qt[Number(t)]===e.toLowerCase()))
return void 0!==n?parseInt(n):void 0}(n)
o={keyCode:t,which:t,key:n,...r}}}var i
return _t(e,t,o)}))}function zt(e,t,n,r=Ut){return Promise.resolve().then((()=>G("triggerKeyEvent","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `triggerKeyEvent`.")
const o=ft(e)
if(!o){const t=xt(e)
throw new Error(`Element not found when calling \`triggerKeyEvent('${t}')\`.`)}if(!t)throw new Error("Must provide an `eventType` to `triggerKeyEvent`")
if(!vt(t)){const e=yt.join(", ")
throw new Error(`Must provide an \`eventType\` of ${e} to \`triggerKeyEvent\` but you passed \`${t}\`.`)}if(S(o)&&o.disabled)throw new Error(`Can not \`triggerKeyEvent\` on disabled ${o}`)
return Bt(o,t,n,r).then(_e)})).then((()=>G("triggerKeyEvent","end",e,t,n)))}const Yt=["text","search","url","tel","email","password"]
function Xt(e,t,n){const r=e.getAttribute("maxlength")
if(function(e){return!!Number(e.getAttribute("maxlength"))&&(e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement&&Yt.indexOf(e.type)>-1)}(e)&&r&&t&&t.length>Number(r))throw new Error(`Can not \`${n}\` with text: '${t}' that exceeds maxlength: '${r}'.`)}function Gt(e,t){return Promise.resolve().then((()=>G("fillIn","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `fillIn`.")
const n=ft(e)
if(!n){const t=xt(e)
throw new Error(`Element not found when calling \`fillIn('${t}')\`.`)}if(null==t)throw new Error("Must provide `text` when calling `fillIn`.")
if(S(n)){if(n.disabled)throw new Error(`Can not \`fillIn\` disabled '${xt(e)}'.`)
if("readOnly"in n&&n.readOnly)throw new Error(`Can not \`fillIn\` readonly '${xt(e)}'.`)
return Xt(n,t,"fillIn"),St(n).then((()=>(n.value=t,n)))}if(M(n))return St(n).then((()=>(n.innerHTML=t,n)))
throw new Error("`fillIn` is only usable on form controls or contenteditable elements.")})).then((e=>_t(e,"input").then((()=>_t(e,"change"))).then(_e))).then((()=>G("fillIn","end",e,t)))}function Jt(e,t){return`${e} when calling \`select('${xt(t)}')\`.`}function Zt(e,t,n=!1){return Promise.resolve().then((()=>G("select","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `select`.")
if(null==t)throw new Error("Must provide an `option` or `options` to select when calling `select`.")
const n=ft(e)
if(!n)throw new Error(Jt("Element not found",e))
if(!function(e){return!x(e)&&"SELECT"===e.tagName}(n))throw new Error(Jt("Element is not a HTMLSelectElement",e))
if(n.disabled)throw new Error(Jt("Element is disabled",e))
if(t=Array.isArray(t)?t:[t],!n.multiple&&t.length>1)throw new Error(Jt("HTMLSelectElement `multiple` attribute is set to `false` but multiple options were passed",e))
return St(n).then((()=>n))})).then((e=>{for(let r=0;r<e.options.length;r++){const o=e.options.item(r)
o&&(t.indexOf(o.value)>-1?o.selected=!0:n||(o.selected=!1))}return _t(e,"input").then((()=>_t(e,"change"))).then(_e)})).then((()=>G("select","end",e,t,n)))}function en(e){if("string"==typeof e)return He().querySelectorAll(e)
{const t=dt(e)
if(t)return function(e){let t=ct(e)?dt(e):e
if(!t)return[]
if(t.elements)return Array.from(t.elements)
{let e=t.element
return e?[e]:[]}}(t)
throw new Error("Must use a selector string or DOM element descriptor")}}function tn(e,t={}){return Promise.resolve().then((()=>{if("string"!=typeof e&&!dt(e))throw new Error("Must pass a selector or DOM element descriptor to `waitFor`.")
const{timeout:n=1e3,count:r=null}=t
let o,{timeoutMessage:i}=t
return i||(i=`waitFor timed out waiting for selector "${xt(e)}"`),o=null!==r?()=>{const t=Array.from(en(e))
if(t.length===r)return t}:()=>ft(e),N(o,{timeout:n,timeoutMessage:i})}))}function nn(e){if(!e)throw new Error("Must pass a selector to `find`.")
if(arguments.length>1)throw new Error("The `find` test helper only takes a single argument.")
return ft(e)}function rn(e){if(!e)throw new Error("Must pass a selector to `findAll`.")
if(arguments.length>1)throw new Error("The `findAll` test helper only takes a single argument.")
return Array.from(en(e))}function on(e,t,n={}){return Promise.resolve().then((()=>G("typeIn","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `typeIn`.")
const r=ft(e)
if(!r){const t=xt(e)
throw new Error(`Element not found when calling \`typeIn('${t}')\``)}if(x(r)||!S(r)&&!M(r))throw new Error("`typeIn` is only usable on form controls or contenteditable elements.")
if(null==t)throw new Error("Must provide `text` when calling `typeIn`.")
if(S(r)){if(r.disabled)throw new Error(`Can not \`typeIn\` disabled '${xt(e)}'.`)
if("readOnly"in r&&r.readOnly)throw new Error(`Can not \`typeIn\` readonly '${xt(e)}'.`)}const{delay:o=50}=n
return St(r).then((()=>function(e,t,n){const r=t.split("").map((t=>function(e,t){const n={shiftKey:t===t.toUpperCase()&&t!==t.toLowerCase()},r=t.toUpperCase()
return function(){return Promise.resolve().then((()=>Bt(e,"keydown",r,n))).then((()=>Bt(e,"keypress",r,n))).then((()=>{if(S(e)){const n=e.value+t
Xt(e,n,"typeIn"),e.value=n}else{const n=e.innerHTML+t
e.innerHTML=n}return _t(e,"input")})).then((()=>Bt(e,"keyup",r,n)))}}(e,t)))
return r.reduce(((e,t)=>e.then((()=>function(e){return new Promise((t=>{setTimeout(t,e)}))}(n))).then(t)),Promise.resolve())}(r,t,o))).then((()=>_t(r,"change"))).then(_e).then((()=>G("typeIn","end",e,t,n)))}))}function sn(e,t){return`${e} when calling \`scrollTo('${xt(t)}')\`.`}function un(e,t,n){return Promise.resolve().then((()=>G("scrollTo","start",e))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `scrollTo`.")
if(void 0===t||void 0===n)throw new Error("Must pass both x and y coordinates to `scrollTo`.")
const r=ft(e)
if(!r)throw new Error(sn("Element not found",e))
if(!C(r)){let t
throw t=x(r)?"Document":r.nodeType,new Error(sn(`"target" must be an element, but was a ${t}`,e))}return r.scrollTop=n,r.scrollLeft=t,_t(r,"scroll").then(_e)})).then((()=>G("scrollTo","end",e)))}X("fillIn","start",((e,t)=>{pt("fillIn",e,t)})),X("typeIn","start",((e,t)=>{pt("typeIn",e,t)}))}}])
