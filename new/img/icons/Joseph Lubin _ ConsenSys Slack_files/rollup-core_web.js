/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
;
/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=4f55bc1256b03eaa3770)
 * Config saved to config.json and https://gist.github.com/4f55bc1256b03eaa3770
 */
;
if(typeof jQuery==="undefined"){throw new Error("Bootstrap's JavaScript requires jQuery")
}!function(c){var b=function(e,d){this.options=d;
this.$element=c(e).delegate('[data-dismiss="modal"]',"click.dismiss.modal",c.proxy(this.hide,this));
this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)
};
b.prototype={constructor:b,toggle:function(){return this[!this.isShown?"show":"hide"]()
},show:function(){var d=this,f=c.Event("show");
this.$element.trigger(f);
if(this.isShown||f.isDefaultPrevented()){return
}this.isShown=true;
this.escape();
this.backdrop(function(){var e=c.support.transition&&d.$element.hasClass("fade");
if(!d.$element.parent().length){d.$element.appendTo(document.body)
}d.$element.show();
if(e){d.$element[0].offsetWidth
}d.$element.addClass("in").attr("aria-hidden",false);
d.enforceFocus();
e?d.$element.one(c.support.transition.end,function(){d.$element.focus().trigger("shown")
}):d.$element.focus().trigger("shown")
})
},hide:function(f){f&&f.preventDefault();
var d=this;
f=c.Event("hide");
this.$element.trigger(f);
if(!this.isShown||f.isDefaultPrevented()){return
}this.isShown=false;
this.escape();
c(document).off("focusin.modal");
this.$element.removeClass("in").attr("aria-hidden",true);
c.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()
},enforceFocus:function(){var d=this;
c(document).on("focusin.modal",function(f){if(d.$element[0]!==f.target&&!d.$element.has(f.target).length){d.$element.focus()
}})
},escape:function(){var d=this;
if(this.isShown&&this.options.keyboard){this.$element.on("keyup.dismiss.modal",function(f){f.which==27&&d.hide()
})
}else{if(!this.isShown){this.$element.off("keyup.dismiss.modal")
}}},hideWithTransition:function(){var d=this,e=setTimeout(function(){d.$element.off(c.support.transition.end);
d.hideModal()
},500);
this.$element.one(c.support.transition.end,function(){clearTimeout(e);
d.hideModal()
})
},hideModal:function(){var d=this;
this.$element.hide();
this.backdrop(function(){d.removeBackdrop();
d.$element.trigger("hidden")
})
},removeBackdrop:function(){this.$backdrop.remove();
this.$backdrop=null
},backdrop:function(g){var f=this,e=this.$element.hasClass("fade")?"fade":"";
if(this.isShown&&this.options.backdrop){var d=c.support.transition&&e;
this.$backdrop=c('<div class="modal-backdrop '+e+'" />');
if(c("#page_contents").length){this.$backdrop.appendTo("#page_contents")
}else{this.$backdrop.appendTo("body")
}this.$backdrop.click(this.options.backdrop=="static"?c.proxy(this.$element[0].focus,this.$element[0]):c.proxy(this.hide,this));
if(d){this.$backdrop[0].offsetWidth
}this.$backdrop.addClass("in");
if(!g){return
}d?this.$backdrop.one(c.support.transition.end,g):g()
}else{if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");
c.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(c.support.transition.end,g):g()
}else{if(g){g()
}}}}};
var a=c.fn.modal;
c.fn.modal=function(d){return this.each(function(){var g=c(this),f=g.data("modal"),e=c.extend({},c.fn.modal.defaults,g.data(),typeof d=="object"&&d);
if(!f){g.data("modal",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}else{if(e.show){f.show()
}}})
};
c.fn.modal.defaults={backdrop:true,keyboard:true,show:true};
c.fn.modal.Constructor=b;
c.fn.modal.noConflict=function(){c.fn.modal=a;
return this
};
c(document).on("click.modal.data-api",'[data-toggle="modal"]',function(i){var h=c(this),f=h.attr("href"),d=c(h.attr("data-target")||(f&&f.replace(/.*(?=#[^\s]+$)/,""))),g=d.data("modal")?"toggle":c.extend({remote:!/#/.test(f)&&f},d.data(),h.data());
i.preventDefault();
d.modal(g).one("hide",function(){h.focus()
})
})
}(window.jQuery);
+function(c){var b=function(e,d){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null;
this.init("tooltip",e,d)
};
b.DEFAULTS={animation:true,placement:"top",selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:false,container:false};
b.prototype.init=function(k,h,f){this.enabled=true;
this.type=k;
this.$element=c(h);
this.options=this.getOptions(f);
var j=this.options.trigger.split(" ");
for(var g=j.length;
g--;
){var e=j[g];
if(e=="click"){this.$element.on("click."+this.type,this.options.selector,c.proxy(this.toggle,this))
}else{if(e!="manual"){var l=e=="hover"?"mouseenter":"focusin";
var d=e=="hover"?"mouseleave":"focusout";
this.$element.on(l+"."+this.type,this.options.selector,c.proxy(this.enter,this));
this.$element.on(d+"."+this.type,this.options.selector,c.proxy(this.leave,this))
}}}this.options.selector?(this._options=c.extend({},this.options,{trigger:"manual",selector:""})):this.fixTitle()
};
b.prototype.getDefaults=function(){return b.DEFAULTS
};
b.prototype.getOptions=function(d){d=c.extend({},this.getDefaults(),this.$element.data(),d);
if(d.delay&&typeof d.delay=="number"){d.delay={show:d.delay,hide:d.delay}
}return d
};
b.prototype.getDelegateOptions=function(){var d={};
var e=this.getDefaults();
this._options&&c.each(this._options,function(f,g){if(e[f]!=g){d[f]=g
}});
return d
};
b.prototype.enter=function(e){var d=e instanceof this.constructor?e:c(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);
clearTimeout(d.timeout);
d.hoverState="in";
if(!d.options.delay||!d.options.delay.show){return d.show()
}d.timeout=setTimeout(function(){if(d.hoverState=="in"){d.show()
}},d.options.delay.show)
};
b.prototype.leave=function(e){var d=e instanceof this.constructor?e:c(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);
clearTimeout(d.timeout);
d.hoverState="out";
if(!d.options.delay||!d.options.delay.hide){return d.hide()
}d.timeout=setTimeout(function(){if(d.hoverState=="out"){d.hide()
}},d.options.delay.hide)
};
b.prototype.show=function(){var p=c.Event("show.bs."+this.type);
if(this.hasContent()&&this.enabled){this.$element.trigger(p);
if(p.isDefaultPrevented()){return
}var o=this;
var k=this.tip();
this.setContent();
if(this.options.animation){k.addClass("fade")
}var j=typeof this.options.placement=="function"?this.options.placement.call(this,k[0],this.$element[0]):this.options.placement;
var t=/\s?auto?\s?/i;
var u=t.test(j);
if(u){j=j.replace(t,"")||"top"
}k.detach().css({top:0,left:0,display:"block"}).addClass(j);
this.options.container?k.appendTo(this.options.container):k.insertAfter(this.$element);
var q=this.getPosition();
var d=k[0].offsetWidth;
var m=k[0].offsetHeight;
if(u){var i=this.$element.parent();
var h=j;
var r=document.documentElement.scrollTop||document.body.scrollTop;
var s=this.options.container=="body"?window.innerWidth:i.outerWidth();
var n=this.options.container=="body"?window.innerHeight:i.outerHeight();
var l=this.options.container=="body"?0:i.offset().left;
j=j=="bottom"&&q.top+q.height+m-r>n?"top":j=="top"&&q.top-r-m<0?"bottom":j=="right"&&q.right+d>s?"left":j=="left"&&q.left-d<l?"right":j;
k.removeClass(h).addClass(j)
}var g=this.getCalculatedOffset(j,q,d,m);
this.applyPlacement(g,j);
this.hoverState=null;
var f=function(){o.$element.trigger("shown.bs."+o.type)
};
c.support.transition&&this.$tip.hasClass("fade")?k.one(c.support.transition.end,f).emulateTransitionEnd(150):f()
}};
b.prototype.applyPlacement=function(i,j){var g;
var k=this.tip();
var f=k[0].offsetWidth;
var n=k[0].offsetHeight;
var e=parseInt(k.css("margin-top"),10);
var h=parseInt(k.css("margin-left"),10);
if(isNaN(e)){e=0
}if(isNaN(h)){h=0
}i.top=i.top+e;
i.left=i.left+h;
c.offset.setOffset(k[0],c.extend({using:function(o){k.css({top:Math.round(o.top),left:Math.round(o.left)})
}},i),0);
k.addClass("in");
var d=k[0].offsetWidth;
var l=k[0].offsetHeight;
if(j=="top"&&l!=n){g=true;
i.top=i.top+n-l
}if(/bottom|top/.test(j)){var m=0;
if(i.left<0){m=i.left*-2;
i.left=0;
k.offset(i);
d=k[0].offsetWidth;
l=k[0].offsetHeight
}this.replaceArrow(m-f+d,d,"left")
}else{this.replaceArrow(l-n,l,"top")
}if(g){k.offset(i)
}};
b.prototype.replaceArrow=function(f,e,d){this.arrow().css(d,f?(50*(1-f/e)+"%"):"")
};
b.prototype.setContent=function(){var e=this.tip();
var d=this.getTitle();
e.find(".tooltip-inner")[this.options.html?"html":"text"](d).html(e.find(".tooltip-inner").html().replace(/\r/g,"<br>"));
e.removeClass("fade in top bottom left right")
};
b.prototype.hide=function(){var f=this;
var h=this.tip();
var g=c.Event("hide.bs."+this.type);
function d(){if(f.hoverState!="in"){h.detach()
}f.$element.trigger("hidden.bs."+f.type)
}this.$element.trigger(g);
if(g.isDefaultPrevented()){return
}h.removeClass("in");
c.support.transition&&this.$tip.hasClass("fade")?h.one(c.support.transition.end,d).emulateTransitionEnd(150):d();
this.hoverState=null;
return this
};
b.prototype.fixTitle=function(){var d=this.$element;
if(d.attr("title")||typeof(d.attr("data-original-title"))!="string"){d.attr("data-original-title",d.attr("title")||"").attr("title","")
}};
b.prototype.hasContent=function(){return this.getTitle()
};
b.prototype.getPosition=function(){var d=this.$element[0];
return c.extend({},(typeof d.getBoundingClientRect=="function")?d.getBoundingClientRect():{width:d.offsetWidth,height:d.offsetHeight},this.$element.offset())
};
b.prototype.getCalculatedOffset=function(d,g,e,f){return d=="bottom"?{top:g.top+g.height,left:g.left+g.width/2-e/2}:d=="top"?{top:g.top-f,left:g.left+g.width/2-e/2}:d=="left"?{top:g.top+g.height/2-f/2,left:g.left-e}:{top:g.top+g.height/2-f/2,left:g.left+g.width}
};
b.prototype.getTitle=function(){var f;
var d=this.$element;
var e=this.options;
f=d.attr("data-original-title")||(typeof e.title=="function"?e.title.call(d[0]):e.title);
return f
};
b.prototype.tip=function(){return this.$tip=this.$tip||c(this.options.template)
};
b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")
};
b.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide();
this.$element=null;
this.options=null
}};
b.prototype.enable=function(){this.enabled=true
};
b.prototype.disable=function(){this.enabled=false
};
b.prototype.toggleEnabled=function(){this.enabled=!this.enabled
};
b.prototype.toggle=function(f){var d=f?c(f.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;
d.tip().hasClass("in")?d.leave(d):d.enter(d)
};
b.prototype.destroy=function(){clearTimeout(this.timeout);
this.hide().$element.off("."+this.type).removeData("bs."+this.type)
};
var a=c.fn.tooltip;
c.fn.tooltip=function(d){return this.each(function(){var g=c(this);
var f=g.data("bs.tooltip");
var e=typeof d=="object"&&d;
if(!f&&d=="destroy"){return
}if(!f){g.data("bs.tooltip",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
c.fn.tooltip.Constructor=b;
c.fn.tooltip.noConflict=function(){c.fn.tooltip=a;
return this
}
}(jQuery);
+function(b){function a(){var e=document.createElement("bootstrap");
var d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};
for(var c in d){if(e.style[c]!==undefined){return{end:d[c]}
}}return false
}b.fn.emulateTransitionEnd=function(e){var d=false,c=this;
b(this).one(b.support.transition.end,function(){d=true
});
var f=function(){if(!d){b(c).trigger(b.support.transition.end)
}};
setTimeout(f,e);
return this
};
b(function(){b.support.transition=a()
})
}(jQuery);
function FastClick(b){var c,a=this;
this.trackingClick=false;
this.trackingClickStart=0;
this.targetElement=null;
this.touchStartX=0;
this.touchStartY=0;
this.lastTouchIdentifier=0;
this.touchBoundary=10;
this.layer=b;
if(!b||!b.nodeType){throw new TypeError("Layer must be a document node")
}this.onClick=function(){return FastClick.prototype.onClick.apply(a,arguments)
};
this.onMouse=function(){return FastClick.prototype.onMouse.apply(a,arguments)
};
this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(a,arguments)
};
this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(a,arguments)
};
this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(a,arguments)
};
this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(a,arguments)
};
if(FastClick.notNeeded(b)){return
}if(this.deviceIsAndroid){b.addEventListener("mouseover",this.onMouse,true);
b.addEventListener("mousedown",this.onMouse,true);
b.addEventListener("mouseup",this.onMouse,true)
}b.addEventListener("click",this.onClick,true);
b.addEventListener("touchstart",this.onTouchStart,false);
b.addEventListener("touchmove",this.onTouchMove,false);
b.addEventListener("touchend",this.onTouchEnd,false);
b.addEventListener("touchcancel",this.onTouchCancel,false);
if(!Event.prototype.stopImmediatePropagation){b.removeEventListener=function(e,g,d){var f=Node.prototype.removeEventListener;
if(e==="click"){f.call(b,e,g.hijacked||g,d)
}else{f.call(b,e,g,d)
}};
b.addEventListener=function(f,g,e){var d=Node.prototype.addEventListener;
if(f==="click"){d.call(b,f,g.hijacked||(g.hijacked=function(h){if(!h.propagationStopped){g(h)
}}),e)
}else{d.call(b,f,g,e)
}}
}if(typeof b.onclick==="function"){c=b.onclick;
b.addEventListener("click",function(d){c(d)
},false);
b.onclick=null
}}FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;
FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);
FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);
FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&(/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);
FastClick.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled){return true
}break;
case"input":if((this.deviceIsIOS&&a.type==="file")||a.disabled){return true
}break;
case"label":case"video":return true
}return(/\bneedsclick\b/).test(a.className)
};
FastClick.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case"textarea":return true;
case"select":return !this.deviceIsAndroid;
case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false
}return !a.disabled&&!a.readOnly;
default:return(/\bneedsfocus\b/).test(a.className)
}};
FastClick.prototype.sendClick=function(b,c){var a,d;
if(document.activeElement&&document.activeElement!==b){document.activeElement.blur()
}d=c.changedTouches[0];
a=document.createEvent("MouseEvents");
a.initMouseEvent(this.determineEventType(b),true,true,window,1,d.screenX,d.screenY,d.clientX,d.clientY,false,false,false,false,0,null);
a.forwardedTouchEvent=true;
b.dispatchEvent(a)
};
FastClick.prototype.determineEventType=function(a){if(this.deviceIsAndroid&&a.tagName.toLowerCase()==="select"){return"mousedown"
}if($(a).hasClass("chzn-container")||$(a).parents(".chzn-container").length>0){if($(a).hasClass("active-result")){return"mouseup"
}else{return"mousedown"
}}return"click"
};
FastClick.prototype.focus=function(a){var b;
if(this.deviceIsIOS&&a.setSelectionRange&&a.type.indexOf("date")!==0&&a.type!=="time"){b=a.value.length;
a.setSelectionRange(b,b)
}else{a.focus()
}};
FastClick.prototype.updateScrollParent=function(b){var c,a;
c=b.fastClickScrollParent;
if(!c||!c.contains(b)){a=b;
do{if(a.scrollHeight>a.offsetHeight){c=a;
b.fastClickScrollParent=a;
break
}a=a.parentElement
}while(a)
}if(c){c.fastClickLastScrollTop=c.scrollTop
}};
FastClick.prototype.getTargetElementFromEventTarget=function(a){if(a.nodeType===Node.TEXT_NODE){return a.parentNode
}return a
};
FastClick.prototype.onTouchStart=function(c){var a,d,b;
if(c.targetTouches.length>1){return true
}a=this.getTargetElementFromEventTarget(c.target);
d=c.targetTouches[0];
if(this.deviceIsIOS){b=window.getSelection();
if(b.rangeCount&&!b.isCollapsed){return true
}if(!this.deviceIsIOS4){if(d.identifier===this.lastTouchIdentifier){c.preventDefault();
return false
}this.lastTouchIdentifier=d.identifier;
this.updateScrollParent(a)
}}this.trackingClick=true;
this.trackingClickStart=c.timeStamp;
this.targetElement=a;
this.touchStartX=d.pageX;
this.touchStartY=d.pageY;
if((c.timeStamp-this.lastClickTime)<200){c.preventDefault()
}return true
};
FastClick.prototype.touchHasMoved=function(a){var c=a.changedTouches[0],b=this.touchBoundary;
if(Math.abs(c.pageX-this.touchStartX)>b||Math.abs(c.pageY-this.touchStartY)>b){return true
}return false
};
FastClick.prototype.onTouchMove=function(a){if(!this.trackingClick){return true
}if(this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a)){this.trackingClick=false;
this.targetElement=null
}return true
};
FastClick.prototype.findControl=function(a){if(a.control!==undefined){return a.control
}if(a.htmlFor){return document.getElementById(a.htmlFor)
}return a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
};
FastClick.prototype.onTouchEnd=function(c){var e,d,b,g,f,a=this.targetElement;
if(!this.trackingClick){return true
}if((c.timeStamp-this.lastClickTime)<200){this.cancelNextClick=true;
return true
}this.cancelNextClick=false;
this.lastClickTime=c.timeStamp;
d=this.trackingClickStart;
this.trackingClick=false;
this.trackingClickStart=0;
if(this.deviceIsIOSWithBadTarget){f=c.changedTouches[0];
a=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||a;
a.fastClickScrollParent=this.targetElement.fastClickScrollParent
}b=a.tagName.toLowerCase();
if(b==="label"){e=this.findControl(a);
if(e){this.focus(a);
if(this.deviceIsAndroid){return false
}a=e
}}else{if(this.needsFocus(a)){if((c.timeStamp-d)>100||(this.deviceIsIOS&&window.top!==window&&b==="input")){this.targetElement=null;
return false
}this.focus(a);
if(!this.deviceIsIOS4||b!=="select"){this.targetElement=null;
c.preventDefault()
}return false
}}if(this.deviceIsIOS&&!this.deviceIsIOS4){g=a.fastClickScrollParent;
if(g&&g.fastClickLastScrollTop!==g.scrollTop){return true
}}if(!this.needsClick(a)){c.preventDefault();
this.sendClick(a,c)
}return false
};
FastClick.prototype.onTouchCancel=function(){this.trackingClick=false;
this.targetElement=null
};
FastClick.prototype.onMouse=function(a){if(!this.targetElement){return true
}if(a.forwardedTouchEvent){return true
}if(!a.cancelable){return true
}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(a.stopImmediatePropagation){a.stopImmediatePropagation()
}else{a.propagationStopped=true
}a.stopPropagation();
a.preventDefault();
return false
}return true
};
FastClick.prototype.onClick=function(a){var b;
if(this.trackingClick){this.targetElement=null;
this.trackingClick=false;
return true
}if(a.target.type==="submit"&&a.detail===0){return true
}b=this.onMouse(a);
if(!b){this.targetElement=null
}return b
};
FastClick.prototype.destroy=function(){var a=this.layer;
if(this.deviceIsAndroid){a.removeEventListener("mouseover",this.onMouse,true);
a.removeEventListener("mousedown",this.onMouse,true);
a.removeEventListener("mouseup",this.onMouse,true)
}a.removeEventListener("click",this.onClick,true);
a.removeEventListener("touchstart",this.onTouchStart,false);
a.removeEventListener("touchmove",this.onTouchMove,false);
a.removeEventListener("touchend",this.onTouchEnd,false);
a.removeEventListener("touchcancel",this.onTouchCancel,false)
};
FastClick.notNeeded=function(b){var a;
var c;
if(typeof window.ontouchstart==="undefined"){return true
}c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];
if(c){if(FastClick.prototype.deviceIsAndroid){a=document.querySelector("meta[name=viewport]");
if(a){if(a.content.indexOf("user-scalable=no")!==-1){return true
}if(c>31&&window.innerWidth<=window.screen.width){return true
}}}else{return true
}}if(b.style.msTouchAction==="none"){return true
}return false
};
FastClick.attach=function(a){return new FastClick(a)
};
if(typeof define!=="undefined"&&define.amd){define(function(){return FastClick
})
}else{if(typeof module!=="undefined"&&module.exports){module.exports=FastClick.attach;
module.exports.FastClick=FastClick
}else{window.FastClick=FastClick
}}
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
(function(f,a){var e={bind:!!(function(){}.bind),classList:"classList" in a.documentElement,rAF:!!(f.requestAnimationFrame||f.webkitRequestAnimationFrame||f.mozRequestAnimationFrame)};
f.requestAnimationFrame=f.requestAnimationFrame||f.webkitRequestAnimationFrame||f.mozRequestAnimationFrame;
function d(i){this.callback=i;
this.ticking=false
}d.prototype={constructor:d,update:function(){this.callback&&this.callback();
this.ticking=false
},requestTick:function(){if(!this.ticking){requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this)));
this.ticking=true
}},handleEvent:function(){this.requestTick()
}};
function g(i){return i&&typeof f!=="undefined"&&(i===f||i.nodeType)
}function h(k){if(arguments.length<=0){throw new Error("Missing arguments in extend function")
}var j=k||{},m,l;
for(l=1;
l<arguments.length;
l++){var n=arguments[l]||{};
for(m in n){if(typeof j[m]==="object"&&!g(j[m])){j[m]=h(j[m],n[m])
}else{j[m]=j[m]||n[m]
}}}return j
}function c(i){return i===Object(i)?i:{down:i,up:i}
}function b(j,i){i=h(i,b.options);
this.lastKnownScrollY=0;
this.elem=j;
this.debouncer=new d(this.update.bind(this));
this.tolerance=c(i.tolerance);
this.classes=i.classes;
this.offset=i.offset;
this.scroller=i.scroller;
this.initialised=false;
this.onPin=i.onPin;
this.onUnpin=i.onUnpin;
this.onTop=i.onTop;
this.onNotTop=i.onNotTop
}b.prototype={constructor:b,init:function(){if(!b.cutsTheMustard){return
}this.elem.classList.add(this.classes.initial);
setTimeout(this.attachEvent.bind(this),100);
return this
},destroy:function(){var i=this.classes;
this.initialised=false;
this.elem.classList.remove(i.unpinned,i.pinned,i.top,i.initial);
this.scroller.removeEventListener("scroll",this.debouncer,false)
},attachEvent:function(){if(!this.initialised){this.lastKnownScrollY=this.getScrollY();
this.initialised=true;
this.scroller.addEventListener("scroll",this.debouncer,false);
this.debouncer.handleEvent()
}},unpin:function(){var j=this.elem.classList,i=this.classes;
if(j.contains(i.pinned)||!j.contains(i.unpinned)){j.add(i.unpinned);
j.remove(i.pinned);
this.onUnpin&&this.onUnpin.call(this)
}},pin:function(){var j=this.elem.classList,i=this.classes;
if(j.contains(i.unpinned)){j.remove(i.unpinned);
j.add(i.pinned);
this.onPin&&this.onPin.call(this)
}},top:function(){var j=this.elem.classList,i=this.classes;
if(!j.contains(i.top)){j.add(i.top);
j.remove(i.notTop);
this.onTop&&this.onTop.call(this)
}},notTop:function(){var j=this.elem.classList,i=this.classes;
if(!j.contains(i.notTop)){j.add(i.notTop);
j.remove(i.top);
this.onNotTop&&this.onNotTop.call(this)
}},getScrollY:function(){return(this.scroller.pageYOffset!==undefined)?this.scroller.pageYOffset:(this.scroller.scrollTop!==undefined)?this.scroller.scrollTop:(a.documentElement||a.body.parentNode||a.body).scrollTop
},getViewportHeight:function(){return f.innerHeight||a.documentElement.clientHeight||a.body.clientHeight
},getDocumentHeight:function(){var i=a.body,j=a.documentElement;
return Math.max(i.scrollHeight,j.scrollHeight,i.offsetHeight,j.offsetHeight,i.clientHeight,j.clientHeight)
},getElementHeight:function(i){return Math.max(i.scrollHeight,i.offsetHeight,i.clientHeight)
},getScrollerHeight:function(){return(this.scroller===f||this.scroller===a.body)?this.getDocumentHeight():this.getElementHeight(this.scroller)
},isOutOfBounds:function(k){var j=k<0,i=k+this.getViewportHeight()>this.getScrollerHeight();
return j||i
},toleranceExceeded:function(j,i){return Math.abs(j-this.lastKnownScrollY)>=this.tolerance[i]
},shouldUnpin:function(l,i){var j=l>this.lastKnownScrollY,k=l>=this.offset;
return j&&k&&i
},shouldPin:function(l,j){var i=l<this.lastKnownScrollY,k=l<=this.offset;
return(i&&j)||k
},update:function(){var k=this.getScrollY(),j=k>this.lastKnownScrollY?"down":"up",i=this.toleranceExceeded(k,j);
if(this.isOutOfBounds(k)){return
}if(k<=this.offset){this.top()
}else{this.notTop()
}if(this.shouldUnpin(k,i)){this.unpin()
}else{if(this.shouldPin(k,i)){this.pin()
}}this.lastKnownScrollY=k
}};
b.options={tolerance:{up:0,down:0},offset:0,scroller:f,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}};
b.cutsTheMustard=typeof e!=="undefined"&&e.rAF&&e.bind&&e.classList;
f.Headroom=b
}(window,document));
var plastic={widescreen_threshold:1441,init:function(){var b="ontouchstart" in document.documentElement;
if(b){$("html").addClass("touch");
FastClick.attach(document.body)
}else{$("html").addClass("no_touch")
}plastic.initTabs();
plastic.initAlerts();
plastic.initDate();
if(typeof TS!="undefined"&&TS.boot_data.login_data){plastic.initNav()
}if($("#api_nav").length){plastic.initAPINav()
}plastic.initWidescreen();
var a=$("nav#site_nav");
setTimeout(function(){a.removeClass("no_transition");
$("#menu_toggle").removeClass("no_transition");
$("#header_team_name").removeClass("no_transition")
},0)
},initNav:function(){plastic.initHeader();
var d=$("body");
$("#menu_toggle").on("click.toggle_nav",function(){if(!d.hasClass("nav_open")&&d.hasClass("widescreen")){return
}d.toggleClass("nav_open")
});
$("#user_menu_contents").on("click.toggle_nav",function(f){if(!$(f.target).is("a")){if(!d.hasClass("nav_open")&&d.hasClass("widescreen")){return
}d.toggleClass("nav_open")
}});
$("#overlay").on("click touchend",function(){d.toggleClass("nav_open")
});
$("#team_switcher").on("click",function(){$("#header_team_nav").toggleClass("open")
});
$("html").bind("mousedown.team_nav touchstart.team_nav",function(f){if($(f.target).closest("#header_team_nav").length==0&&$(f.target).closest("#team_switcher").length==0){$("#header_team_nav").removeClass("open")
}});
var b=$("#user_menu").outerHeight()+$(".nav_contents").outerHeight()+$("#footer").outerHeight();
var a=80;
var c=64;
$("head").append('<style type="text/css"> #footer {bottom: 0;position: absolute;}@media only screen and (max-height: '+b+"px) { nav#site_nav #footer { position: relative; bottom: auto; } }\n@media only screen and (min-width: "+plastic.widescreen_threshold+"px) { body:not(.nav_open) nav#site_nav #footer { position: relative; bottom: auto; } }</style>")
},initAPINav:function(){plastic.initHeader();
var a=$("body");
$("#menu_toggle").on("click.toggle_nav",function(){if(!a.hasClass("nav_open")&&a.hasClass("widescreen")){return
}a.toggleClass("nav_open");
$(window).scrollTop(0);
$("html").addClass("no_scroll")
});
$("#overlay").on("click touchstart",function(){a.toggleClass("nav_open");
$("html").removeClass("no_scroll")
})
},initHeader:function(){$("header").headroom({offset:80,tolerance:5})
},initTabs:function(){$(".tab_set").on("click",function(){$(this).toggleClass("open")
}).find("a").on("click",function(g){var f=$(this);
if(f.hasClass("selected")&&f.attr("href")&&!f.hasClass("is_linked")){g.preventDefault();
return
}if(f.attr("href")){return
}f.addClass("selected").siblings(".selected").removeClass("selected");
$(".tab_pane.selected").removeClass("selected");
$('.tab_pane[data-tab="'+f.data("tab")+'"]').addClass("selected");
window.location.hash=f.data("tab")
});
var e=window.location.hash;
if(e){e=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
if(e.charAt(0)==="#"){e=e.substring(1)
}var c=$('a[name="'+e+'"], #'+e);
var d,b,a;
if(c.length>0){b=c.closest(".tab_pane");
if(b.length>0&&!b.hasClass("selected")){a=b.data("tab");
d=$('a[data-tab="'+a+'"]');
d.click();
window.location.hash=e
}}else{d=$('a[data-tab="'+e+'"]');
if(d.length>0){d.click()
}}$(".tab_set").removeClass("open")
}},initAlerts:function(){$(".alert_page").each(function(){if($(this).hasClass("is_ephemeral")){$(this).addClass("fade")
}})
},initWidescreen:function(){var c=$(window);
var b=$("body");
var a=$("nav#site_nav");
if(b.hasClass("full_bleed")){return
}if(!a.length&&!$("#api_nav").length){return
}c.resize(function(){var e=c.width();
var d=c.height();
if(e>=plastic.widescreen_threshold&&!b.hasClass("widescreen")){b.addClass("widescreen")
}else{if(e<plastic.widescreen_threshold&&b.hasClass("widescreen")){a.addClass("no_transition");
b.removeClass("widescreen");
setTimeout(function(){a.removeClass("no_transition")
},350)
}}$("#page").css("min-height",d)
}).resize()
},initDate:function(){$("body").on("click.plastic_date focus.plastic_date",'input[type="text"][data-plastic-type="date"]',function(a){$input=$(a.target);
if(!$input.prop("readonly")||!$input.pickmeup){return
}$input.pickmeup({first_day:0,hide_on_select:true,min:$(this).data("min")||null,max:$(this).data("max")||null,format:$(this).data("format")||"Y-m-d"}).pickmeup("show")
}).on("keydown.plastic_date",'input[type="text"][data-plastic-type="date"]',function(a){$input=$(a.target);
if(!$input.prop("readonly")||!$input.pickmeup){return
}if(window.document.activeElement===a.target){if(a.keyCode===8||a.keyCode===46){a.preventDefault();
$input.val("")
}else{if(a.keyCode===27){$input.pickmeup("hide")
}}}})
}};
$(function(){plastic.init()
});
$(window).load(function(){$(".ga_track_signup").on("click",function(a){gaTrackEvent("step1","homepage-cta",200);
window.dataLayer=window.dataLayer||[];
window.dataLayer.push({event:"SignUp"})
});
$(".mxpnl_signup_module").on("click",function(a){mixpanel_track("signup",{place:"module"})
});
$(".mxpnl_signup_nav").on("click",function(a){mixpanel_track("signup",{place:"nav"})
})
});
function gaTrackEvent(b,a,c){if(window.ga){window.ga("send","event","signup",b,a)
}if(c){window._vis_opt_queue=window._vis_opt_queue||[];
window._vis_opt_queue.push(function(){_vis_opt_goal_conversion(c)
})
}};