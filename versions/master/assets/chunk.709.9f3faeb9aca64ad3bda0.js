"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[709],{2709:(e,t,n)=>{let r
function o(e){r=e}function i(){return r}n.r(t),n.d(t,{blur:()=>xt,clearRender:()=>et,click:()=>At,currentRouteName:()=>he,currentURL:()=>pe,doubleClick:()=>jt,fillIn:()=>Xt,find:()=>en,findAll:()=>tn,focus:()=>Rt,getApplication:()=>c,getContext:()=>Se,getDebugInfo:()=>re,getDeprecations:()=>$e,getDeprecationsDuringCallback:()=>Ne,getResolver:()=>i,getRootElement:()=>He,getSettledState:()=>Ee,getTestMetadata:()=>H,getWarnings:()=>Le,getWarningsDuringCallback:()=>De,hasEmberVersion:()=>f,isSettled:()=>Te,pauseTest:()=>Ae,registerDebugInfoHelper:()=>ee,registerHook:()=>Y,render:()=>Ze,rerender:()=>rt,resetOnerror:()=>Ce,resumeTest:()=>je,runHooks:()=>G,scrollTo:()=>on,select:()=>Gt,setApplication:()=>a,setContext:()=>Re,setResolver:()=>o,settled:()=>Pe,setupApplicationContext:()=>ge,setupContext:()=>We,setupOnerror:()=>ke,setupRenderingContext:()=>tt,tab:()=>Dt,tap:()=>Wt,teardownContext:()=>Ke,triggerEvent:()=>Ft,triggerKeyEvent:()=>Qt,typeIn:()=>nn,unsetContext:()=>Oe,validateErrorHandler:()=>st,visit:()=>fe,waitFor:()=>Zt,waitUntil:()=>N})
var s=n(2294),u=n.n(s)
let l
function a(e){l=e,i()||o(e.Resolver.create({namespace:e}))}function c(){return l}var d=n(5152)
function f(e,t){const n=d.VERSION.split("-")[0]?.split(".")
if(!n||!n[0]||!n[1])throw new Error("`Ember.VERSION` is not set.")
const r=parseInt(n[0],10),o=parseInt(n[1],10)
return r>e||r===e&&o>=t}var h=n(1223),m=n(4471),p=n.n(m),g=n(4540),w=n.n(g),b=n(3211),y=n.n(b)
const v=y()._ContainerProxyMixin,E=y()._RegistryProxyMixin,T=p().extend(E,v,{_emberTestHelpersMockOwner:!0,unregister(e){this.__container__.reset(e),this.__registry__.unregister(e)}})
function P(e,t){if(e)return e.boot().then((e=>e.buildInstance().boot()))
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
return Promise.resolve(n)}var _=n(8234),k=n(2394)
function C(e){return null!==e&&"object"==typeof e&&Reflect.get(e,"nodeType")===Node.ELEMENT_NODE}function I(e){return e instanceof Window}function x(e){return null!==e&&"object"==typeof e&&Reflect.get(e,"nodeType")===Node.DOCUMENT_NODE}function M(e){return"isContentEditable"in e&&e.isContentEditable}const R=["INPUT","BUTTON","SELECT","TEXTAREA"]
function S(e){return!I(e)&&!x(e)&&R.indexOf(e.tagName)>-1&&"hidden"!==e.type}const O=e=>Promise.resolve().then(e),A=setTimeout,j=[0,1,2,5,7],$=10
function N(e,t={}){const n="timeout"in t?t.timeout:1e3,r="timeoutMessage"in t?t.timeoutMessage:"waitUntil timed out",o=new Error(r)
return new Promise((function(t,r){let i=0
!function s(u){const l=j[u],a=void 0===l?$:l
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
function X(e,t){return`${e}:${t}`}function Y(e,t,n){const r=X(e,t)
let o=z.get(r)
return void 0===o&&(o=new Set,z.set(r,o)),o.add(n),{unregister(){o.delete(n)}}}function G(e,t,...n){const r=z.get(X(e,t))||new Set,o=[]
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
n.willDestroy=function(){return ue=null,r.call(this)}}(),n})).then((()=>{!1!==D.EmberENV._APPLICATION_TEMPLATE_WRAPPER?n.element=document.querySelector("#ember-testing > .ember-view"):n.element=document.querySelector("#ember-testing")})).then(Pe).then((()=>G("visit","end",e,t)))}function he(){const e=Se()
if(!e||!ce(e))throw new Error("Cannot call `currentRouteName` without having first called `setupApplicationContext`.")
const t=e.owner.lookup("router:main").currentRouteName
return(0,L.assert)("currentRouteName should be a string","string"==typeof t),t}const me=f(2,13)
function pe(){const e=Se()
if(!e||!ce(e))throw new Error("Cannot call `currentURL` without having first called `setupApplicationContext`.")
const t=e.owner.lookup("router:main")
if(me){const e=t.currentURL
return null===e||(0,L.assert)("currentUrl should be a string, but was "+typeof e,"string"==typeof e),e}return t.location.getURL()}function ge(e){return H(e).setupTypes.push("setupApplicationContext"),Promise.resolve()}let we
const be=_.Test.checkWaiters
function ye(e,t){we.push(t)}function ve(e,t){O((()=>{for(let e=0;e<we.length;e++)t===we[e]&&we.splice(e,1)}))}function Ee(){const e=h._backburner.hasTimers(),t=Boolean(h._backburner.currentInstance),n=be(),r=(0,J.hasPendingWaiters)(),o=(void 0!==we?we.length:0)+(0,k.pendingRequests)(),i=o>0,s=!!t
return{hasPendingTimers:e,hasRunLoop:t,hasPendingWaiters:n||r,hasPendingRequests:i,hasPendingTransitions:de(),isRenderPending:s,pendingRequestCount:o,debugInfo:new oe({hasPendingTimers:e,hasRunLoop:t,hasPendingLegacyWaiters:n,hasPendingTestWaiters:r,hasPendingRequests:i,isRenderPending:s})}}function Te(){const{hasPendingTimers:e,hasRunLoop:t,hasPendingRequests:n,hasPendingWaiters:r,hasPendingTransitions:o,isRenderPending:i}=Ee()
return!(e||t||n||r||o||i)}function Pe(){return N(Te,{timeout:1/0}).then((()=>{}))}const _e=new Map
function ke(e){const t=Se()
if(!t)throw new Error("Must setup test context before calling setupOnerror")
if(!_e.has(t))throw new Error("_cacheOriginalOnerror must be called before setupOnerror. Normally, this will happen as part of your test harness.")
"function"!=typeof e&&(e=_e.get(t)),y().onerror=e}function Ce(){const e=Se()
e&&_e.has(e)&&(y().onerror=_e.get(e))}function Ie(e){const t=e
return"function"==typeof t.pauseTest&&"function"==typeof t.resumeTest}function xe(e){return e&&e.Math===Math&&e}(0,L.registerDeprecationHandler)(((e,t,n)=>{const r=Se()
void 0!==r?(V(r).push({message:e,options:t}),n.apply(null,[e,t])):n.apply(null,[e,t])})),(0,L.registerWarnHandler)(((e,t,n)=>{const r=Se()
void 0!==r?(B(r).push({message:e,options:t}),n.apply(null,[e,t])):n.apply(null,[e,t])}))
const Me=xe("object"==typeof globalThis&&globalThis)||xe("object"==typeof window&&window)||xe("object"==typeof self&&self)||xe("object"==typeof D&&D)
function Re(e){Me.__test_context__=e}function Se(){return Me.__test_context__}function Oe(){Me.__test_context__=void 0}function Ae(){const e=Se()
if(!e||!Ie(e))throw new Error("Cannot call `pauseTest` without having first called `setupTest` or `setupRenderingTest`.")
return e.pauseTest()}function je(){const e=Se()
if(!e||!Ie(e))throw new Error("Cannot call `resumeTest` without having first called `setupTest` or `setupRenderingTest`.")
e.resumeTest()}function $e(){const e=Se()
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
return y().testing=!0,Re(n),H(n).setupTypes.push("setupContext"),h._backburner.DEBUG=!0,function(e){if(_e.has(e))throw new Error("_prepareOnerror should only be called once per-context")
_e.set(e,y().onerror)}(n),Promise.resolve().then((()=>{const e=c()
if(e)return e.boot().then((()=>{}))})).then((()=>{const{resolver:e}=t
return e?P(null,e):P(c(),i())})).then((e=>{let t
return Object.defineProperty(n,"owner",{configurable:!0,enumerable:!0,value:e,writable:!1}),(0,s.setOwner)(n,e),Object.defineProperty(n,"set",{configurable:!0,enumerable:!0,value:(e,t)=>(0,h.run)((function(){return(0,m.set)(n,e,t)})),writable:!1}),Object.defineProperty(n,"setProperties",{configurable:!0,enumerable:!0,value:e=>(0,h.run)((function(){return(0,m.setProperties)(n,e)})),writable:!1}),Object.defineProperty(n,"get",{configurable:!0,enumerable:!0,value:e=>(0,m.get)(n,e),writable:!1}),Object.defineProperty(n,"getProperties",{configurable:!0,enumerable:!0,value:(...e)=>(0,m.getProperties)(n,e),writable:!1}),n.resumeTest=function(){(0,L.assert)("Testing has not been paused. There is nothing to resume.",!!t),t(),D.resumeTest=t=void 0},n.pauseTest=function(){return console.info("Testing paused. Use `resumeTest()` to continue."),new Promise((e=>{t=e,D.resumeTest=je}))},we=[],void 0!==globalThis.jQuery&&(globalThis.jQuery(document).on("ajaxSend",ye),globalThis.jQuery(document).on("ajaxComplete",ve)),n}))}var Fe=n(1130)
function Ke(e,{waitForSettled:t=!0}={}){return Promise.resolve().then((()=>{!function(e){Ce(),_e.delete(e)}(e),we=[],void 0!==globalThis.jQuery&&(globalThis.jQuery(document).off("ajaxSend",ye),globalThis.jQuery(document).off("ajaxComplete",ve)),y().testing=!1,Oe(),(0,Fe.destroy)(e.owner)})).finally((()=>{if(t)return Pe()}))}function He(){const e=Se()
if(!e||!Ie(e)||!e.owner)throw new Error("Must setup rendering context before attempting to interact with elements.")
const t=e.owner
let n
if(n=t&&void 0===t._emberTestHelpersMockOwner?t.rootElement:"#ember-testing",n instanceof Window&&(n=n.document),C(n)||x(n))return n
if("string"==typeof n){const e=document.querySelector(n)
if(e)return e
throw new Error(`Application.rootElement (${n}) not found`)}throw new Error("Application.rootElement must be an element or a selector string")}var Ue=n(9095),qe=n(1465)
const Ve=(0,qe.createTemplateFactory)({id:"eZbrbPHV",block:'[[[46,[28,[37,1],null,null],null,null,null]],[],false,["component","-outlet"]]',moduleName:"/home/runner/work/ember-mobile-menu/ember-mobile-menu/node_modules/.pnpm/@ember+test-helpers@5.1.0_@babel+core@7.26.10_ember-source@6.3.0_@glimmer+component@1.1_cb8431c352026fc78c6cb9ae7bdcf756/node_modules/@ember/test-helpers/dist/setup-rendering-context.js",isStrictMode:!1}),Qe=(0,qe.createTemplateFactory)({id:"FTe7/bdo",block:"[[],[],false,[]]",moduleName:"/home/runner/work/ember-mobile-menu/ember-mobile-menu/node_modules/.pnpm/@ember+test-helpers@5.1.0_@babel+core@7.26.10_ember-source@6.3.0_@glimmer+component@1.1_cb8431c352026fc78c6cb9ae7bdcf756/node_modules/@ember/test-helpers/dist/setup-rendering-context.js",isStrictMode:!1}),Be=(0,qe.createTemplateFactory)({id:"lC9vPbMj",block:'[[[8,[30,0,["ProvidedComponent"]],null,null,null]],[],false,[]]',moduleName:"/home/runner/work/ember-mobile-menu/ember-mobile-menu/node_modules/.pnpm/@ember+test-helpers@5.1.0_@babel+core@7.26.10_ember-source@6.3.0_@glimmer+component@1.1_cb8431c352026fc78c6cb9ae7bdcf756/node_modules/@ember/test-helpers/dist/setup-rendering-context.js",isStrictMode:!1}),ze=Symbol()
function Xe(e){return Ie(e)&&ze in e}function Ye(e,t){const n=e.lookup(t)
return"function"==typeof n?n(e):n}let Ge,Je=0
function Ze(e,t){let n=Se()
if(!e)throw new Error("you must pass a template to `render()`")
return Promise.resolve().then((()=>G("render","start"))).then((()=>{if(!n||!Xe(n))throw new Error("Cannot call `render` without having first called `setupRenderingContext`.")
const{owner:r}=n
H(n).usedHelpers.push("render")
const o=r.lookup("-top-level-view:main"),i=function(e){let t=Ye(e,"template:-outlet")
return t||(e.register("template:-outlet",Ve),t=Ye(e,"template:-outlet")),t}(r),s=t?.owner||r
var u
u=e,(0,Ue.getInternalComponentManager)(u,!0)&&(n={ProvidedComponent:e},e=Be),Je+=1
const l=`template:-undertest-${Je}`
s.register(l,e)
const a=Ye(s,l),c={render:{owner:r,into:void 0,outlet:"main",name:"application",controller:void 0,ViewClass:void 0,template:i},outlets:{main:{render:{owner:s,into:void 0,outlet:"main",name:"index",controller:n,ViewClass:void 0,template:a,outlets:{}},outlets:{}}}}
return o.setOutletState(c),f(3,23)||h.run.backburner.ensureInstance(),Pe()})).then((()=>G("render","end")))}function et(){const e=Se()
if(!e||!Xe(e))throw new Error("Cannot call `clearRender` without having first called `setupRenderingContext`.")
return Ze(Qe)}function tt(e){H(e).setupTypes.push("setupRenderingContext")
const t=function(e){return e[ze]=!0,e}(e)
return Promise.resolve().then((()=>{const{owner:e}=t
e._emberTestHelpersMockOwner&&(e.lookup("event_dispatcher:main")||y().EventDispatcher.create()).setup({},"#ember-testing")
const n=e.factoryFor?e.factoryFor("view:-outlet"):e._lookupFactory("view:-outlet"),r=e.lookup("-environment:main"),o=e.lookup("template:-outlet"),i=n.create({template:o,environment:r})
return e.register("-top-level-view:main",{create:()=>i}),Ze(Qe).then((()=>((0,h.run)(i,"appendTo",He()),Pe())))})).then((()=>(Object.defineProperty(t,"element",{configurable:!0,enumerable:!0,value:!1!==D.EmberENV._APPLICATION_TEMPLATE_WRAPPER?He().querySelector(".ember-view"):He(),writable:!1}),t)))}Ge=(0,n(6212).A)(n(2015)).renderSettled
var nt=Ge
function rt(){return nt()}const ot=Object.freeze({isValid:!0,message:null}),it=Object.freeze({isValid:!1,message:"error handler should have re-thrown the provided error"})
function st(e=y().onerror){if(null==e)return ot
const t=new Error("Error handler validation error!"),n=y().testing
y().testing=!0
try{e(t)}catch(e){if(e===t)return ot}finally{y().testing=n}return it}const ut="__dom_element_descriptor_is_descriptor__"
function lt(e){return Boolean("object"==typeof e&&e&&ut in e)}function at(e){return function(){const e=window
return e.domElementDescriptorsRegistry=e.domElementDescriptorsRegistry||new WeakMap,e.domElementDescriptorsRegistry}().get(e)||null}function ct(e){if("string"==typeof e)return He().querySelector(e)
if(C(e)||x(e))return e
if(e instanceof Window)return e.document
{const t=at(e)
if(t)return function(e){let t=lt(e)?at(e):e
if(!t)return null
if(void 0!==t.element)return t.element
for(let n of t.elements||[])return n
return null}(t)
throw new Error("Must use an element, selector string, or DOM element descriptor")}}function dt(e){return I(e)?e:ct(e)}function ft(...e){return e}function ht(e,t,...n){"undefined"!=typeof location&&-1!==location.search.indexOf("testHelperLogging")&&console.log(`${e}(${[mt(t),...n.filter(Boolean)].join(", ")})`)}function mt(e){let t
return e instanceof NodeList?0===e.length?"empty NodeList":(t=Array.prototype.slice.call(e,0,5).map(mt).join(", "),e.length>5?`${t}... (+${e.length-5} more)`:t):e instanceof HTMLElement||e instanceof SVGElement?(t=e.tagName.toLowerCase(),e.id&&(t+=`#${e.id}`),!e.className||e.className instanceof SVGAnimatedString||(t+=`.${String(e.className).replace(/\s+/g,".")}`),Array.prototype.forEach.call(e.attributes,(function(e){"class"!==e.name&&"id"!==e.name&&(t+=`[${e.name}${e.value?`="${e.value}"]`:"]"}`)})),t):String(e)}Y("fireEvent","start",(e=>{ht("fireEvent",e)}))
const pt=(()=>{try{return new MouseEvent("test"),!0}catch{return!1}})(),gt={bubbles:!0,cancelable:!0},wt=ft("keydown","keypress","keyup")
function bt(e){return wt.indexOf(e)>-1}const yt=ft("click","mousedown","mouseup","dblclick","mouseenter","mouseleave","mousemove","mouseout","mouseover"),vt=ft("change")
function Et(e,t,n={}){return Promise.resolve().then((()=>G("fireEvent","start",e))).then((()=>G(`fireEvent:${t}`,"start",e))).then((()=>{if(!e)throw new Error("Must pass an element to `fireEvent`")
let r
if(bt(t))r=Pt(t,n)
else if(function(e){return yt.indexOf(e)>-1}(t)){let o
if(e instanceof Window&&e.document.documentElement)o=e.document.documentElement.getBoundingClientRect()
else if(x(e))o=e.documentElement.getBoundingClientRect()
else{if(!C(e))return
o=e.getBoundingClientRect()}const i=o.left+1,s=o.top+1,u={screenX:i+5,screenY:s+95,clientX:i,clientY:s,...n}
r=function(e,t={}){let n
const r={view:window,...gt,...t}
if(pt)n=new MouseEvent(e,r)
else try{n=document.createEvent("MouseEvents"),n.initMouseEvent(e,r.bubbles,r.cancelable,window,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.button,r.relatedTarget)}catch{n=Tt(e,t)}return n}(t,u)}else r=function(e){return vt.indexOf(e)>-1}(t)&&function(e){return e.files}(e)?function(e,t,n={}){const r=Tt(e),o=n.files
if(Array.isArray(n))throw new Error("Please pass an object with a files array to `triggerEvent` instead of passing the `options` param as an array to.")
if(Array.isArray(o)){Object.defineProperty(o,"item",{value(e){return"number"==typeof e?this[e]:null},configurable:!0}),Object.defineProperty(t,"files",{value:o,configurable:!0})
const e=Object.getPrototypeOf(t),n=Object.getOwnPropertyDescriptor(e,"value")
Object.defineProperty(t,"value",{configurable:!0,get:()=>n.get.call(t),set(e){n.set.call(t,e),Object.defineProperty(t,"files",{configurable:!0,value:[]})}})}return Object.defineProperty(r,"target",{value:t}),r}(t,e,n):Tt(t,n)
return e.dispatchEvent(r),r})).then((n=>G(`fireEvent:${t}`,"end",e).then((()=>n)))).then((t=>G("fireEvent","end",e).then((()=>t))))}function Tt(e,t={}){const n=document.createEvent("Events"),r=void 0===t.bubbles||t.bubbles,o=void 0===t.cancelable||t.cancelable
delete t.bubbles,delete t.cancelable,n.initEvent(e,r,o)
for(const i in t)n[i]=t[i]
return n}function Pt(e,t={}){const n={...gt,...t}
let r,o
try{return r=new KeyboardEvent(e,n),Object.defineProperty(r,"keyCode",{get:()=>parseInt(n.keyCode)}),Object.defineProperty(r,"which",{get:()=>parseInt(n.which)}),r}catch{}try{r=document.createEvent("KeyboardEvents"),o="initKeyboardEvent"}catch{}if(!r)try{r=document.createEvent("KeyEvents"),o="initKeyEvent"}catch{}return r&&o?r[o](e,n.bubbles,n.cancelable,window,n.ctrlKey,n.altKey,n.shiftKey,n.metaKey,n.keyCode,n.charCode):r=Tt(e,t),r}const _t=["A","SUMMARY"]
function kt(e){return!I(e)&&!x(e)&&(S(e)?!e.disabled:!(!M(e)&&!function(e){return _t.indexOf(e.tagName)>-1}(e))||e.hasAttribute("tabindex"))}function Ct(e){const t=lt(e)?at(e):null
return t?t.description||"<unknown descriptor>":`${e}`}function It(e,t=null){if(!kt(e))throw new Error(`${e} is not focusable`)
const n=document.hasFocus&&!document.hasFocus(),r=null!==t
r||e.blur()
const o={relatedTarget:t}
return n||r?Promise.resolve().then((()=>Et(e,"blur",{bubbles:!1,...o}))).then((()=>Et(e,"focusout",o))):Promise.resolve()}function xt(e=document.activeElement){return Promise.resolve().then((()=>G("blur","start",e))).then((()=>{const t=ct(e)
if(!t){const t=Ct(e)
throw new Error(`Element not found when calling \`blur('${t}')\`.`)}return It(t).then((()=>Pe()))})).then((()=>G("blur","end",e)))}function Mt(e){return Promise.resolve().then((()=>{const t=function(e){if(x(e))return null
let t=e
for(;t&&!kt(t);)t=t.parentElement
return t}(e),n=document.activeElement&&document.activeElement!==t&&kt(document.activeElement)?document.activeElement:null
return!t&&n?It(n,null).then((()=>Promise.resolve({focusTarget:t,previousFocusedElement:n}))):Promise.resolve({focusTarget:t,previousFocusedElement:n})})).then((({focusTarget:e,previousFocusedElement:t})=>{if(!e)throw new Error("There was a previously focused element")
const n=!document?.hasFocus()
return t&&n?It(t,e).then((()=>Promise.resolve({focusTarget:e}))):Promise.resolve({focusTarget:e})})).then((({focusTarget:e})=>{e.focus()
const t=document?.hasFocus()
return t?Promise.resolve():Promise.resolve().then((()=>Et(e,"focus",{bubbles:!1}))).then((()=>Et(e,"focusin"))).then((()=>Pe()))})).catch((()=>{}))}function Rt(e){return Promise.resolve().then((()=>G("focus","start",e))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `focus`.")
const t=ct(e)
if(!t){const t=Ct(e)
throw new Error(`Element not found when calling \`focus('${t}')\`.`)}if(!kt(t))throw new Error(`${t} is not focusable`)
return Mt(t).then(Pe)})).then((()=>G("focus","end",e)))}Y("blur","start",(e=>{ht("blur",e)})),Y("focus","start",(e=>{ht("focus",e)})),Y("click","start",(e=>{ht("click",e)}))
const St={buttons:1,button:0}
function Ot(e,t){return Promise.resolve().then((()=>Et(e,"mousedown",t))).then((t=>I(e)||t?.defaultPrevented?Promise.resolve():Mt(e))).then((()=>Et(e,"mouseup",t))).then((()=>Et(e,"click",t)))}function At(e,t={}){const n={...St,...t}
return Promise.resolve().then((()=>G("click","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `click`.")
const t=dt(e)
if(!t){const t=Ct(e)
throw new Error(`Element not found when calling \`click('${t}')\`.`)}if(S(t)&&t.disabled)throw new Error(`Can not \`click\` disabled ${t}`)
return Ot(t,n).then(Pe)})).then((()=>G("click","end",e,t)))}function jt(e,t={}){const n={...St,...t}
return Promise.resolve().then((()=>G("doubleClick","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `doubleClick`.")
const t=dt(e)
if(!t){const t=Ct(e)
throw new Error(`Element not found when calling \`doubleClick('${t}')\`.`)}if(S(t)&&t.disabled)throw new Error(`Can not \`doubleClick\` disabled ${t}`)
return function(e,t){return Promise.resolve().then((()=>Et(e,"mousedown",t))).then((t=>I(e)||t?.defaultPrevented?Promise.resolve():Mt(e))).then((()=>Et(e,"mouseup",t))).then((()=>Et(e,"click",t))).then((()=>Et(e,"mousedown",t))).then((()=>Et(e,"mouseup",t))).then((()=>Et(e,"click",t))).then((()=>Et(e,"dblclick",t)))}(t,n).then(Pe)})).then((()=>G("doubleClick","end",e,t)))}Y("doubleClick","start",(e=>{ht("doubleClick",e)}))
const $t="inert"in Element.prototype,Nt=["CANVAS","VIDEO","PICTURE"]
function Lt(e){return e.activeElement||e.body}function Dt({backwards:e=!1,unRestrainTabIndex:t=!1}={}){return Promise.resolve().then((()=>function(e,t){const n=He()
let r,o
x(n)?(o=n.body,r=n):(o=n,r=n.ownerDocument)
const i={keyCode:9,which:9,key:"Tab",code:"Tab",shiftKey:e},s={keyboardEventOptions:i,ownerDocument:r,rootElement:o}
return Promise.resolve().then((()=>G("tab","start",s))).then((()=>Lt(r))).then((e=>G("tab","targetFound",e).then((()=>e)))).then((t=>{const n=Pt("keydown",i)
if(t.dispatchEvent(n)){t=Lt(r)
const n=function(e,t){const n=function(e=document.body){const{ownerDocument:t}=e
if(!t)throw new Error("Element must be in the DOM")
const n=Lt(t),r=t.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{if("AREA"!==e.tagName&&!1===function(e){const t=window.getComputedStyle(e)
return"none"!==t.display&&"hidden"!==t.visibility}(e))return NodeFilter.FILTER_REJECT
const t=e.parentNode
return t&&-1!==Nt.indexOf(t.tagName)||$t&&e.inert||S(r=e)&&r.disabled?NodeFilter.FILTER_REJECT:e===n||e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP
var r}})
let o
const i=[]
for(;o=r.nextNode();)i.push(o)
return i}(e),r=function(e){return e.map(((e,t)=>({index:t,element:e}))).sort(((e,t)=>e.element.tabIndex===t.element.tabIndex?e.index-t.index:0===e.element.tabIndex||0===t.element.tabIndex?t.element.tabIndex-e.element.tabIndex:e.element.tabIndex-t.element.tabIndex)).map((e=>e.element))}(n),o=-1===t.tabIndex?n:r,i=o.indexOf(t)
return-1===i?{next:r[0],previous:r[r.length-1]}:{next:o[i+1],previous:o[i-1]}}(o,t)
if(n)return e&&n.previous?Mt(n.previous):!e&&n.next?Mt(n.next):It(t)}return Promise.resolve()})).then((()=>{const e=Lt(r)
return Et(e,"keyup",i).then((()=>e))})).then((e=>{if(!t&&e.tabIndex>0)throw new Error(`tabindex of greater than 0 is not allowed. Found tabindex=${e.tabIndex}`)})).then((()=>G("tab","end",s)))}(e,t))).then((()=>Pe()))}function Wt(e,t={}){return Promise.resolve().then((()=>G("tap","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `tap`.")
const n=ct(e)
if(!n){const t=Ct(e)
throw new Error(`Element not found when calling \`tap('${t}')\`.`)}if(S(n)&&n.disabled)throw new Error(`Can not \`tap\` disabled ${n}`)
return Et(n,"touchstart",t).then((e=>Et(n,"touchend",t).then((t=>[e,t])))).then((([e,r])=>e.defaultPrevented||r.defaultPrevented?Promise.resolve():Ot(n,t))).then(Pe)})).then((()=>G("tap","end",e,t)))}function Ft(e,t,n){return Promise.resolve().then((()=>G("triggerEvent","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `triggerEvent`.")
if(!t)throw new Error("Must provide an `eventType` to `triggerEvent`")
const r=dt(e)
if(!r){const t=Ct(e)
throw new Error(`Element not found when calling \`triggerEvent('${t}', ...)\`.`)}if(S(r)&&r.disabled)throw new Error(`Can not \`triggerEvent\` on disabled ${r}`)
return Et(r,t,n).then(Pe)})).then((()=>G("triggerEvent","end",e,t,n)))}Y("tab","start",(e=>{ht("tab",e)})),Y("tap","start",(e=>{ht("tap",e)})),Y("triggerEvent","start",((e,t)=>{ht("triggerEvent",e,t)})),Y("triggerKeyEvent","start",((e,t,n)=>{ht("triggerKeyEvent",e,t,n)}))
const Kt=Object.freeze({ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1}),Ht={8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"Meta",93:"Meta",186:";",187:"=",188:",",189:"-",190:".",191:"/",219:"[",220:"\\",221:"]",222:"'"},Ut={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",186:":",187:"+",188:"<",189:"_",190:">",191:"?",219:"{",220:"|",221:"}",222:'"'}
function qt(e,t){return e>64&&e<91?t.shiftKey?String.fromCharCode(e):String.fromCharCode(e).toLocaleLowerCase():t.shiftKey&&Ut[e]||Ht[e]}function Vt(e,t,n,r=Kt){return Promise.resolve().then((()=>{let o
if("number"==typeof n)o={keyCode:n,which:n,key:qt(n,r),...r}
else{if("string"!=typeof n||0===n.length)throw new Error("Must provide a `key` or `keyCode` to `triggerKeyEvent`")
{const e=n[0]
if(!e||e!==e.toUpperCase())throw new Error(`Must provide a \`key\` to \`triggerKeyEvent\` that starts with an uppercase character but you passed \`${n}\`.`)
if(i=n,!isNaN(parseFloat(i))&&isFinite(Number(i))&&n.length>1)throw new Error(`Must provide a numeric \`keyCode\` to \`triggerKeyEvent\` but you passed \`${n}\` as a string.`)
const t=function(e){const t=Object.keys(Ht),n=t.find((t=>Ht[Number(t)]===e))||t.find((t=>Ht[Number(t)]===e.toLowerCase()))
return void 0!==n?parseInt(n):void 0}(n)
o={keyCode:t,which:t,key:n,...r}}}var i
return Et(e,t,o)}))}function Qt(e,t,n,r=Kt){return Promise.resolve().then((()=>G("triggerKeyEvent","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `triggerKeyEvent`.")
const o=ct(e)
if(!o){const t=Ct(e)
throw new Error(`Element not found when calling \`triggerKeyEvent('${t}')\`.`)}if(!t)throw new Error("Must provide an `eventType` to `triggerKeyEvent`")
if(!bt(t)){const e=wt.join(", ")
throw new Error(`Must provide an \`eventType\` of ${e} to \`triggerKeyEvent\` but you passed \`${t}\`.`)}if(S(o)&&o.disabled)throw new Error(`Can not \`triggerKeyEvent\` on disabled ${o}`)
return Vt(o,t,n,r).then(Pe)})).then((()=>G("triggerKeyEvent","end",e,t,n)))}const Bt=["text","search","url","tel","email","password"]
function zt(e,t,n){const r=e.getAttribute("maxlength")
if(function(e){return!!Number(e.getAttribute("maxlength"))&&(e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement&&Bt.indexOf(e.type)>-1)}(e)&&r&&t&&t.length>Number(r))throw new Error(`Can not \`${n}\` with text: '${t}' that exceeds maxlength: '${r}'.`)}function Xt(e,t){return Promise.resolve().then((()=>G("fillIn","start",e,t))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `fillIn`.")
const n=ct(e)
if(!n){const t=Ct(e)
throw new Error(`Element not found when calling \`fillIn('${t}')\`.`)}if(null==t)throw new Error("Must provide `text` when calling `fillIn`.")
if(S(n)){if(n.disabled)throw new Error(`Can not \`fillIn\` disabled '${Ct(e)}'.`)
if("readOnly"in n&&n.readOnly)throw new Error(`Can not \`fillIn\` readonly '${Ct(e)}'.`)
return zt(n,t,"fillIn"),Mt(n).then((()=>(n.value=t,n)))}if(M(n))return Mt(n).then((()=>(n.innerHTML=t,n)))
throw new Error("`fillIn` is only usable on form controls or contenteditable elements.")})).then((e=>Et(e,"input").then((()=>Et(e,"change"))).then(Pe))).then((()=>G("fillIn","end",e,t)))}function Yt(e,t){return`${e} when calling \`select('${Ct(t)}')\`.`}function Gt(e,t,n=!1){return Promise.resolve().then((()=>G("select","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `select`.")
if(null==t)throw new Error("Must provide an `option` or `options` to select when calling `select`.")
const n=ct(e)
if(!n)throw new Error(Yt("Element not found",e))
if(!function(e){return!x(e)&&"SELECT"===e.tagName}(n))throw new Error(Yt("Element is not a HTMLSelectElement",e))
if(n.disabled)throw new Error(Yt("Element is disabled",e))
if(t=Array.isArray(t)?t:[t],!n.multiple&&t.length>1)throw new Error(Yt("HTMLSelectElement `multiple` attribute is set to `false` but multiple options were passed",e))
return Mt(n).then((()=>n))})).then((e=>{for(let r=0;r<e.options.length;r++){const o=e.options.item(r)
o&&(t.indexOf(o.value)>-1?o.selected=!0:n||(o.selected=!1))}return Et(e,"input").then((()=>Et(e,"change"))).then(Pe)})).then((()=>G("select","end",e,t,n)))}function Jt(e){if("string"==typeof e)return He().querySelectorAll(e)
{const t=at(e)
if(t)return function(e){let t=lt(e)?at(e):e
if(!t)return[]
if(t.elements)return Array.from(t.elements)
{let e=t.element
return e?[e]:[]}}(t)
throw new Error("Must use a selector string or DOM element descriptor")}}function Zt(e,t={}){return Promise.resolve().then((()=>{if("string"!=typeof e&&!at(e))throw new Error("Must pass a selector or DOM element descriptor to `waitFor`.")
const{timeout:n=1e3,count:r=null}=t
let o,{timeoutMessage:i}=t
return i||(i=`waitFor timed out waiting for selector "${Ct(e)}"`),o=null!==r?()=>{const t=Array.from(Jt(e))
if(t.length===r)return t}:()=>ct(e),N(o,{timeout:n,timeoutMessage:i})}))}function en(e){if(!e)throw new Error("Must pass a selector to `find`.")
if(arguments.length>1)throw new Error("The `find` test helper only takes a single argument.")
return ct(e)}function tn(e){if(!e)throw new Error("Must pass a selector to `findAll`.")
if(arguments.length>1)throw new Error("The `findAll` test helper only takes a single argument.")
return Array.from(Jt(e))}function nn(e,t,n={}){return Promise.resolve().then((()=>G("typeIn","start",e,t,n))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `typeIn`.")
const r=ct(e)
if(!r){const t=Ct(e)
throw new Error(`Element not found when calling \`typeIn('${t}')\``)}if(x(r)||!S(r)&&!M(r))throw new Error("`typeIn` is only usable on form controls or contenteditable elements.")
if(null==t)throw new Error("Must provide `text` when calling `typeIn`.")
if(S(r)){if(r.disabled)throw new Error(`Can not \`typeIn\` disabled '${Ct(e)}'.`)
if("readOnly"in r&&r.readOnly)throw new Error(`Can not \`typeIn\` readonly '${Ct(e)}'.`)}const{delay:o=50}=n
return Mt(r).then((()=>function(e,t,n){const r=t.split("").map((t=>function(e,t){const n={shiftKey:t===t.toUpperCase()&&t!==t.toLowerCase()},r=t.toUpperCase()
return function(){return Promise.resolve().then((()=>Vt(e,"keydown",r,n))).then((()=>Vt(e,"keypress",r,n))).then((()=>{if(S(e)){const n=e.value+t
zt(e,n,"typeIn"),e.value=n}else{const n=e.innerHTML+t
e.innerHTML=n}return Et(e,"input")})).then((()=>Vt(e,"keyup",r,n)))}}(e,t)))
return r.reduce(((e,t)=>e.then((()=>function(e){return new Promise((t=>{setTimeout(t,e)}))}(n))).then(t)),Promise.resolve())}(r,t,o))).then((()=>Et(r,"change"))).then(Pe).then((()=>G("typeIn","end",e,t,n)))}))}function rn(e,t){return`${e} when calling \`scrollTo('${Ct(t)}')\`.`}function on(e,t,n){return Promise.resolve().then((()=>G("scrollTo","start",e))).then((()=>{if(!e)throw new Error("Must pass an element, selector, or descriptor to `scrollTo`.")
if(void 0===t||void 0===n)throw new Error("Must pass both x and y coordinates to `scrollTo`.")
const r=ct(e)
if(!r)throw new Error(rn("Element not found",e))
if(!C(r)){let t
throw t=x(r)?"Document":r.nodeType,new Error(rn(`"target" must be an element, but was a ${t}`,e))}return r.scrollTop=n,r.scrollLeft=t,Et(r,"scroll").then(Pe)})).then((()=>G("scrollTo","end",e)))}Y("fillIn","start",((e,t)=>{ht("fillIn",e,t)})),Y("typeIn","start",((e,t)=>{ht("typeIn",e,t)}))}}])
