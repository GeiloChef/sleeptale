import r from"./C1wkOM_K.js";import{D as n,g as o,v as s,x as l,T as i,A as d,W as a}from"./xx_YliOf.js";import"./Be1fzYNM.js";import"./usvSMMNL.js";var p=({dt:e})=>`
.p-overlaybadge {
    position: relative;
}

.p-overlaybadge .p-badge {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
    margin: 0;
    outline-width: ${e("overlaybadge.outline.width")};
    outline-style: solid;
    outline-color: ${e("overlaybadge.outline.color")};
}

.p-overlaybadge .p-badge:dir(rtl) {
    transform: translate(-50%, -50%);
}
`,v={root:"p-overlaybadge"},g=n.extend({name:"overlaybadge",style:p,classes:v}),m={name:"OverlayBadge",extends:r,style:g,provide:function(){return{$pcOverlayBadge:this,$parentInstance:this}}},c={name:"OverlayBadge",extends:m,inheritAttrs:!1,components:{Badge:r}};function y(e,u,$,b,B,f){var t=o("Badge");return l(),s("div",a({class:e.cx("root")},e.ptmi("root")),[i(e.$slots,"default"),d(t,a(e.$props,{pt:e.ptm("pcBadge")}),null,16,["pt"])],16)}c.render=y;export{c as default};
