(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["editor"],{8673:function(e,t,n){},a40d:function(e,t,n){"use strict";n("8673")},f73c:function(e,t,n){"use strict";n.r(t);var c=n("7a23"),o=n("6c02");Object(c["pushScopeId"])("data-v-75352ec5");var i={class:"editor"},r={class:"editor-header"},u=Object(c["createTextVNode"])("返回"),d=Object(c["createTextVNode"])(" MyNote "),a=Object(c["createTextVNode"])("保存");Object(c["popScopeId"])();var l={setup:function(e){var t=Object(o["c"])(),n=Object(c["ref"])("## 在此编辑您的内容"),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"### 这是一个**可爱的**三级标题哦！";n.value+="\n"+e},s=function(){setTimeout((function(){document.body.scrollTop=document.body.scrollHeight,l("innerHeight"+window.innerHeight),l("clientHeight"+document.documentElement.clientHeight),l("scrollHeight"+document.body.scrollHeight)}),300)},b=function(){t.push("/notes")};return Object(c["onMounted"])((function(){var e=document.querySelector("textarea");null!==e&&e.addEventListener("focus",s)})),function(e,t){var o=Object(c["resolveComponent"])("van-button"),l=Object(c["resolveComponent"])("v-md-editor");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",i,[Object(c["createElementVNode"])("div",r,[Object(c["createVNode"])(o,{size:"mini",onClick:b},{default:Object(c["withCtx"])((function(){return[u]})),_:1}),d,Object(c["createVNode"])(o,{size:"mini",onClick:b},{default:Object(c["withCtx"])((function(){return[a]})),_:1})]),Object(c["createVNode"])(l,{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=function(e){return n.value=e})},null,8,["modelValue"])])}}};n("a40d");l.__scopeId="data-v-75352ec5";t["default"]=l}}]);