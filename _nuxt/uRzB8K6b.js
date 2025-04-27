import{c as E}from"./Be1fzYNM.js";import{D,J as F,M as V,L as k,N as R,H as v,a9 as y,G as x,W as a,av as H,Q as B,v as l,S as c,x as r,y as O,a1 as N,R as h,V as Z,Z as w,z as K,g as P,B as M,A as U,$ as W,T as I,X as f,Y as S,C as j}from"./xx_YliOf.js";import{Z as L}from"./DGEOgZpe.js";import{C as G}from"./BKCVLA_g.js";import{O as J}from"./DFauXUuT.js";import{s as Q}from"./Dv5RyDv7.js";import{s as T}from"./usvSMMNL.js";import{R as X}from"./BX3eMoW9.js";import"./a4aQ5HJD.js";import"./DmfvTtO6.js";var Y=({dt:e})=>`
.p-menu {
    background: ${e("menu.background")};
    color: ${e("menu.color")};
    border: 1px solid ${e("menu.border.color")};
    border-radius: ${e("menu.border.radius")};
    min-width: 12.5rem;
}

.p-menu-list {
    margin: 0;
    padding: ${e("menu.list.padding")};
    outline: 0 none;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${e("menu.list.gap")};
}

.p-menu-item-content {
    transition: background ${e("menu.transition.duration")}, color ${e("menu.transition.duration")};
    border-radius: ${e("menu.item.border.radius")};
    color: ${e("menu.item.color")};
}

.p-menu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${e("menu.item.padding")};
    gap: ${e("menu.item.gap")};
    user-select: none;
    outline: 0 none;
}

.p-menu-item-label {
    line-height: 1;
}

.p-menu-item-icon {
    color: ${e("menu.item.icon.color")};
}

.p-menu-item.p-focus .p-menu-item-content {
    color: ${e("menu.item.focus.color")};
    background: ${e("menu.item.focus.background")};
}

.p-menu-item.p-focus .p-menu-item-icon {
    color: ${e("menu.item.icon.focus.color")};
}

.p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
    color: ${e("menu.item.focus.color")};
    background: ${e("menu.item.focus.background")};
}

.p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
    color: ${e("menu.item.icon.focus.color")};
}

.p-menu-overlay {
    box-shadow: ${e("menu.shadow")};
}

.p-menu-submenu-label {
    background: ${e("menu.submenu.label.background")};
    padding: ${e("menu.submenu.label.padding")};
    color: ${e("menu.submenu.label.color")};
    font-weight: ${e("menu.submenu.label.font.weight")};
}

.p-menu-separator {
    border-block-start: 1px solid ${e("menu.separator.border.color")};
}
`,q={root:function(t){var n=t.props;return["p-menu p-component",{"p-menu-overlay":n.popup}]},start:"p-menu-start",list:"p-menu-list",submenuLabel:"p-menu-submenu-label",separator:"p-menu-separator",end:"p-menu-end",item:function(t){var n=t.instance;return["p-menu-item",{"p-focus":n.id===n.focusedOptionId,"p-disabled":n.disabled()}]},itemContent:"p-menu-item-content",itemLink:"p-menu-item-link",itemIcon:"p-menu-item-icon",itemLabel:"p-menu-item-label"},$=D.extend({name:"menu",style:Y,classes:q}),_={name:"BaseMenu",extends:T,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:$,provide:function(){return{$pcMenu:this,$parentInstance:this}}},z={name:"Menuitem",hostName:"Menu",extends:T,inheritAttrs:!1,emits:["item-click","item-mousemove"],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(t,n){return t&&t.item?H(t.item[n]):void 0},getPTOptions:function(t){return this.ptm(t,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(t){var n=this.getItemProp(this.item,"command");n&&n({originalEvent:t,item:this.item.item}),this.$emit("item-click",{originalEvent:t,item:this.item,id:this.id})},onItemMouseMove:function(t){this.$emit("item-mousemove",{originalEvent:t,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},getMenuItemProps:function(t){return{action:a({class:this.cx("itemLink"),tabindex:"-1"},this.getPTOptions("itemLink")),icon:a({class:[this.cx("itemIcon"),t.icon]},this.getPTOptions("itemIcon")),label:a({class:this.cx("itemLabel")},this.getPTOptions("itemLabel"))}}},computed:{dataP:function(){return E({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:X}},ee=["id","aria-label","aria-disabled","data-p-focused","data-p-disabled","data-p"],te=["data-p"],ne=["href","target"],ie=["data-p"],se=["data-p"];function re(e,t,n,s,u,i){var b=B("ripple");return i.visible()?(r(),l("li",a({key:0,id:n.id,class:[e.cx("item"),n.item.class],role:"menuitem",style:n.item.style,"aria-label":i.label(),"aria-disabled":i.disabled(),"data-p-focused":i.isItemFocused(),"data-p-disabled":i.disabled()||!1,"data-p":i.dataP},i.getPTOptions("item")),[O("div",a({class:e.cx("itemContent"),onClick:t[0]||(t[0]=function(p){return i.onItemClick(p)}),onMousemove:t[1]||(t[1]=function(p){return i.onItemMouseMove(p)}),"data-p":i.dataP},i.getPTOptions("itemContent")),[n.templates.item?n.templates.item?(r(),h(w(n.templates.item),{key:1,item:n.item,label:i.label(),props:i.getMenuItemProps(n.item)},null,8,["item","label","props"])):c("",!0):N((r(),l("a",a({key:0,href:n.item.url,class:e.cx("itemLink"),target:n.item.target,tabindex:"-1"},i.getPTOptions("itemLink")),[n.templates.itemicon?(r(),h(w(n.templates.itemicon),{key:0,item:n.item,class:Z(e.cx("itemIcon"))},null,8,["item","class"])):n.item.icon?(r(),l("span",a({key:1,class:[e.cx("itemIcon"),n.item.icon],"data-p":i.dataP},i.getPTOptions("itemIcon")),null,16,ie)):c("",!0),O("span",a({class:e.cx("itemLabel"),"data-p":i.dataP},i.getPTOptions("itemLabel")),K(i.label()),17,se)],16,ne)),[[b]])],16,te)],16,ee)):c("",!0)}z.render=re;function A(e){return ue(e)||le(e)||ae(e)||oe()}function oe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ae(e,t){if(e){if(typeof e=="string")return C(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}function le(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ue(e){if(Array.isArray(e))return C(e)}function C(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,s=Array(t);n<t;n++)s[n]=e[n];return s}var de={name:"Menu",extends:_,inheritAttrs:!1,emits:["show","hide","focus","blur"],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.target=null,this.container&&this.autoZIndex&&L.clear(this.container),this.container=null},methods:{itemClick:function(t){var n=t.item;this.disabled(n)||(n.command&&n.command(t),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==t.id&&(this.focusedOptionIndex=t.id))},itemMouseMove:function(t){this.focused&&(this.focusedOptionIndex=t.id)},onListFocus:function(t){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit("focus",t)},onListBlur:function(t){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",t)},onListKeyDown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"ArrowUp":this.onArrowUpKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"Enter":case"NumpadEnter":this.onEnterKey(t);break;case"Space":this.onSpaceKey(t);break;case"Escape":this.popup&&(v(this.target),this.hide());case"Tab":this.overlayVisible&&this.hide();break}},onArrowDownKey:function(t){var n=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()},onArrowUpKey:function(t){if(t.altKey&&this.popup)v(this.target),this.hide(),t.preventDefault();else{var n=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()}},onHomeKey:function(t){this.changeFocusedOptionIndex(0),t.preventDefault()},onEndKey:function(t){this.changeFocusedOptionIndex(y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]').length-1),t.preventDefault()},onEnterKey:function(t){var n=x(this.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),s=n&&x(n,'a[data-pc-section="itemlink"]');this.popup&&v(this.target),s?s.click():n&&n.click(),t.preventDefault()},onSpaceKey:function(t){this.onEnterKey(t)},findNextOptionIndex:function(t){var n=y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=A(n).findIndex(function(u){return u.id===t});return s>-1?s+1:0},findPrevOptionIndex:function(t){var n=y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=A(n).findIndex(function(u){return u.id===t});return s>-1?s-1:0},changeFocusedOptionIndex:function(t){var n=y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=t>=n.length?n.length-1:t<0?0:t;s>-1&&(this.focusedOptionIndex=n[s].getAttribute("id"))},toggle:function(t){this.overlayVisible?this.hide():this.show(t)},show:function(t){this.overlayVisible=!0,this.target=t.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(t){R(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&L.set("menu",t,this.baseZIndex+this.$primevue.config.zIndex.menu),this.popup&&v(this.list),this.$emit("show")},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&L.clear(t)},alignOverlay:function(){V(this.container,this.target);var t=k(this.target);t>k(this.container)&&(this.container.style.minWidth=k(this.target)+"px")},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(n){var s=t.container&&!t.container.contains(n.target),u=!(t.target&&(t.target===n.target||t.target.contains(n.target)));t.overlayVisible&&s&&u?t.hide():!t.popup&&s&&u&&(t.focusedOptionIndex=-1)},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new G(this.target,function(){t.overlayVisible&&t.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.overlayVisible&&!F()&&t.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},visible:function(t){return typeof t.visible=="function"?t.visible():t.visible!==!1},disabled:function(t){return typeof t.disabled=="function"?t.disabled():t.disabled},label:function(t){return typeof t.label=="function"?t.label():t.label},onOverlayClick:function(t){J.emit("overlay-click",{originalEvent:t,target:this.target})},containerRef:function(t){this.container=t},listRef:function(t){this.list=t}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null},dataP:function(){return E({popup:this.popup})}},components:{PVMenuitem:z,Portal:Q}},ce=["id","data-p"],me=["id","tabindex","aria-activedescendant","aria-label","aria-labelledby"],pe=["id"];function fe(e,t,n,s,u,i){var b=P("PVMenuitem"),p=P("Portal");return r(),h(p,{appendTo:e.appendTo,disabled:!e.popup},{default:M(function(){return[U(W,a({name:"p-connected-overlay",onEnter:i.onEnter,onLeave:i.onLeave,onAfterLeave:i.onAfterLeave},e.ptm("transition")),{default:M(function(){return[!e.popup||u.overlayVisible?(r(),l("div",a({key:0,ref:i.containerRef,id:e.$id,class:e.cx("root"),onClick:t[3]||(t[3]=function(){return i.onOverlayClick&&i.onOverlayClick.apply(i,arguments)}),"data-p":i.dataP},e.ptmi("root")),[e.$slots.start?(r(),l("div",a({key:0,class:e.cx("start")},e.ptm("start")),[I(e.$slots,"start")],16)):c("",!0),O("ul",a({ref:i.listRef,id:e.$id+"_list",class:e.cx("list"),role:"menu",tabindex:e.tabindex,"aria-activedescendant":u.focused?i.focusedOptionId:void 0,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,onFocus:t[0]||(t[0]=function(){return i.onListFocus&&i.onListFocus.apply(i,arguments)}),onBlur:t[1]||(t[1]=function(){return i.onListBlur&&i.onListBlur.apply(i,arguments)}),onKeydown:t[2]||(t[2]=function(){return i.onListKeyDown&&i.onListKeyDown.apply(i,arguments)})},e.ptm("list")),[(r(!0),l(f,null,S(e.model,function(o,d){return r(),l(f,{key:i.label(o)+d.toString()},[o.items&&i.visible(o)&&!o.separator?(r(),l(f,{key:0},[o.items?(r(),l("li",a({key:0,id:e.$id+"_"+d,class:[e.cx("submenuLabel"),o.class],role:"none",ref_for:!0},e.ptm("submenuLabel")),[I(e.$slots,e.$slots.submenulabel?"submenulabel":"submenuheader",{item:o},function(){return[j(K(i.label(o)),1)]})],16,pe)):c("",!0),(r(!0),l(f,null,S(o.items,function(m,g){return r(),l(f,{key:m.label+d+"_"+g},[i.visible(m)&&!m.separator?(r(),h(b,{key:0,id:e.$id+"_"+d+"_"+g,item:m,templates:e.$slots,focusedOptionId:i.focusedOptionId,unstyled:e.unstyled,onItemClick:i.itemClick,onItemMousemove:i.itemMouseMove,pt:e.pt},null,8,["id","item","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"])):i.visible(m)&&m.separator?(r(),l("li",a({key:"separator"+d+g,class:[e.cx("separator"),o.class],style:m.style,role:"separator",ref_for:!0},e.ptm("separator")),null,16)):c("",!0)],64)}),128))],64)):i.visible(o)&&o.separator?(r(),l("li",a({key:"separator"+d.toString(),class:[e.cx("separator"),o.class],style:o.style,role:"separator",ref_for:!0},e.ptm("separator")),null,16)):(r(),h(b,{key:i.label(o)+d.toString(),id:e.$id+"_"+d,item:o,index:d,templates:e.$slots,focusedOptionId:i.focusedOptionId,unstyled:e.unstyled,onItemClick:i.itemClick,onItemMousemove:i.itemMouseMove,pt:e.pt},null,8,["id","item","index","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"]))],64)}),128))],16,me),e.$slots.end?(r(),l("div",a({key:1,class:e.cx("end")},e.ptm("end")),[I(e.$slots,"end")],16)):c("",!0)],16,ce)):c("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo","disabled"])}de.render=fe;export{de as default};
