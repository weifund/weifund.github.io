(function(){TS.registerModule("ui.filter_select",{onStart:function(){$("select[data-filter-select], label[data-filter-select] select").addClass("hidden").filterSelect()
},make:function(A,B){if(A.prop("tagName")==="SELECT"){if(typeof B.single==="undefined"){B.single=!A.prop("multiple")
}}var z=$.extend({},m,B);
z._selected=[];
var C=$('<div class="filter_select">');
if(z.classes){C.addClass(z.classes)
}if(z.default_style){C.addClass("default_style")
}if(z.single){C.addClass("single")
}if(A.prop("disabled")){z.disabled=true
}if(z.disabled){C.addClass("disabled")
}C.html(TS.templates.filter_select_container({instance:z}));
if(z.append){C.appendTo(A)
}else{C.insertAfter(A)
}z.$container=C;
z.$input_container=C.find(".fsl_input_container");
z.$list_container=C.children(".fsl_list_container");
z.$scroller=C.find(".fsl_scroller");
z.$list=C.find(".fsl_list");
z.$input=C.find(".fsl_input");
z.$value=C.find(".fsl_value");
z.$select=A;
if(!z.data){z.data=r(A)
}q(z);
f(z);
p(z);
h(z);
if(z.always_visible){s(z)
}return z
},getValue:function(z){return z._selected
}});
var m={template:function(A){var B=A.toString();
var z;
if(A instanceof jQuery||A instanceof HTMLElement){B=$(A).text();
z=TS.utility.htmlEntities($(A).attr("data-additional-search-field"))
}B=TS.utility.htmlEntities(B);
if(z){B+=' <span class="addl_text">'+z+"</span>"
}return new Handlebars.SafeString(B)
},filter:function(A,B){var C=A.toString();
B=B.toLowerCase();
if(A instanceof jQuery||A instanceof HTMLElement){C=$(A).text();
var z=$(A).attr("data-additional-search-field");
if(z&&z.toLowerCase().indexOf(B)!==-1){return true
}}return C.toLowerCase().indexOf(B)!==-1
},paginateTemplate:function(B,A,z){return TS.templates.filter_select_pagination({page:B,num_pages:A,per_page:z})
},noResultsTemplate:function(z){return"No items matched <strong>"+TS.utility.htmlEntities(z)+"</strong>"
},disabled:false,default_style:true,paginate:true,per_page:300,append:false,placeholder_text:"Type to filter",single:false,monkey_scroll:true,set_height:true,always_visible:false,tab_to_nav:false,onItemAdded:function(z){},onItemRemoved:function(z){},onKeyDown:function(A,z){},_$active:null,_list_visible:false,_prevent_blur:false,_dimensions_set:false,_previous_val:"",_page:1,_num_pages:1,_current_data:null};
var d={};
var p=function(H,A){if(!A){A=H.data
}if(A.length===0){H.$list_container.addClass("empty");
H.$list.empty();
if(H.$pagination){H.$pagination.remove()
}H.$list.html(H.noResultsTemplate(H.$input.val()));
H._$active=null;
c(H);
return
}H.$list_container.removeClass("empty");
H._current_data=A;
var z=(H._page-1)*H.per_page;
H._num_pages=Math.max(1,Math.ceil(A.length/H.per_page));
A=A.slice(z,z+H.per_page);
var E="";
var I=[false];
for(var B=0;
B<A.length;
B++){var J=A[B];
var F;
if(J.fsl_group){E+=b(J);
for(var D=0;
D<J.children.length;
D++){var G=J.children[D];
F=G.fsl_index.join(",");
E+=u(H,G,I,F,true)
}}else{F=J.fsl_index.join(",");
E+=u(H,J,I,F,false)
}}if(H.$list){H.$list.empty()
}if(H.$pagination){H.$pagination.remove()
}H.$list.html(E);
var C=H.$pagination=$(H.paginateTemplate(H._page,H._num_pages,H.per_page));
H.$scroller.append(C);
if(H._previous_val!==""){H._$active=H.$list.find(".fsl_item.active")
}else{H._$active=null
}c(H);
H.$scroller.scrollTop(0)
};
var u=function(G,I,H,E,F,A){var C=I.fsl_selected;
var D=I.disabled||I.fsl_disabled;
var z=(G._previous_val!=="")&&!H[0]&&!C&&!D;
if(z){H[0]=true
}var B=G.template(I);
return TS.templates.filter_select_item({content:B,active:z,selected:C,disabled:D,index:E,in_group:F,token:A})
};
var b=function(A){var z=TS.utility.htmlEntities(A.label);
return'<div class="fsl_group">'+z+"</div>"
};
var c=function(z){if(z.monkey_scroll&&z.$scroller.data("monkeyScroll")){v(z);
z.$scroller.data("monkeyScroll").updateFunc()
}};
var q=function(z){var E=z.data;
for(var B=0;
B<E.length;
B++){var D=E[B];
if(D.fsl_group){for(var C=0;
C<D.children.length;
C++){var A=[B,C];
D.children[C].fsl_index=A
}}else{D.fsl_index=[B]
}}};
var f=function(G){var D="";
var A=G.data;
var z=!G.single;
for(var B=0;
B<A.length;
B++){var H=A[B];
var E;
if(H.fsl_group){for(var C=0;
C<H.children.length;
C++){var F=H.children[C];
if(!(F.preselected||F.selected)){continue
}F.fsl_selected=true;
G._selected.push(F);
E=F.fsl_index.join(",");
D+=u(G,F,false,E,true,z);
if(G.single){break
}}}else{if(!(H.preselected||H.selected)){continue
}H.fsl_selected=true;
G._selected.push(H);
E=H.fsl_index.join(",");
D+=u(G,H,false,E,false,z);
if(G.single){break
}}}if(D.length>0){G.$container.addClass("value");
if(G.single){$(D).appendTo(G.$value)
}else{$(D).insertBefore(G.$input);
G.$input_container.removeClass("empty");
G.$input.prop("placeholder","")
}}};
var r=function(A){var z=A.children("option, optgroup");
var B=[];
z.each(function(){if($(this).prop("tagName")==="OPTGROUP"){var C=$(this).children("option");
if($(this).prop("disabled")){C=C.map(function(){this.fsl_disabled=true;
return this
})
}B.push({fsl_group:true,label:$(this).prop("label"),children:C})
}else{B.push(this)
}});
return B
};
var a=function(A,B){if(A.disabled){return
}if(!A._list_visible){s(A);
return
}var z;
if(!A._$active){z=A.$list.find(".fsl_item:not(.selected, .disabled)").first()
}else{z=A._$active[B](".fsl_item:not(.selected, .disabled)").first()
}if(z.length){z.scrollintoview({duration:0});
if(A._$active){A._$active.removeClass("active")
}z.addClass("active");
A._$active=z
}};
var w=function(z){return a(z,"nextAll")
};
var e=function(z){return a(z,"prevAll")
};
var j=function(A,C){if(A.disabled){return
}var z=A._$active;
if(!z.length){return
}if(!k(z)){return
}if(A.single&&A._selected.length){A._selected[0].fsl_selected=false;
A._selected.length=0;
A.$value.empty();
A.$list.find(".selected").removeClass("selected")
}var D=n(A,z);
D.fsl_selected=true;
A._selected.push(D);
l(A);
z.addClass("selected");
z.removeClass("active");
A._$active=null;
var B=z.clone();
if(A.single){B.appendTo(A.$value)
}else{B.addClass("fsl_token");
B.insertBefore(A.$input)
}if(!A.single){A.$input_container.removeClass("empty");
A.$input.prop("placeholder","")
}A.$container.addClass("value");
if(C){w(A)
}A.onItemAdded(D);
A.$input.focus()
};
var g=function(A,B){if(A.disabled){return
}var C=n(A,B);
C.fsl_selected=false;
A._selected=A._selected.filter(function(D){if(D!==C){return true
}});
l(A);
var z=A.$list.find('[data-index="'+B.attr("data-index")+'"]');
z.removeClass("selected");
if(A.$input.val().length+A._selected.length===0){A.$input_container.addClass("empty");
A.$input.prop("placeholder",A.placeholder_text)
}B.remove();
if(A._selected.length===0){A.$container.removeClass("value")
}A.onItemRemoved(C)
};
var i=function(z){var A=z.$input_container.find(".fsl_token").last();
if(A.length){g(z,A)
}};
var l=function(z){if(z.append){return
}var A=z._selected.map(function(B){if(B instanceof HTMLOptionElement){return $(B).val()
}});
z.$select.val(A).trigger("change")
};
var k=function(z){return !(z.hasClass("selected")||z.hasClass("disabled"))
};
var n=function(z,A){var B=A.attr("data-index").split(",").map(function(D){return parseInt(D,10)
});
var C=z.data;
switch(B.length){case 1:return C[B[0]];
case 2:return C[B[0]].children[B[1]]
}return null
};
var y=function(z,A){if(!A&&(!z._list_visible||z.always_visible||z.disabled)){return
}z._list_visible=false;
z.$list_container.removeClass("visible");
z.$container.removeClass("list_visible");
z.$input_container.removeClass("active")
};
var s=function(z){if(z.disabled){return
}setTimeout(function(){z.$input.focus()
},0);
if(z._list_visible){return
}z._list_visible=true;
z.$list_container.addClass("visible");
z.$container.addClass("list_visible");
z.$input_container.addClass("active");
if(z.single){z.$input.val("");
z._previous_val="";
z.$input.focus();
p(z)
}if(!z._dimensions_set&&z.set_height){v(z);
if(z.monkey_scroll){z.$scroller.monkeyScroll()
}z._dimensions_set=true
}};
var v=function(z){var D=z.$list.height();
var A=z.$list_container.height();
var C=z.$list_container.outerHeight()-A;
var B=parseInt(z.$list_container.css("max-height"),10);
if(isNaN(B)){B=A
}B=B-C;
z.$scroller.css({"max-height":Math.min(D,B)})
};
var o=function(G,E){var A=G.data;
var D=[];
for(var B=0;
B<A.length;
B++){var H=A[B];
if(H.fsl_group){var C=[];
for(var z=0;
z<H.children.length;
z++){var F=H.children[z];
if(G.filter(F,E)){C.push(F)
}}if(C.length>0){D.push({fsl_group:true,label:H.label,children:C})
}}else{if(G.filter(H,E)){D.push(H)
}}}return D
};
var t=function(z){if(z.disabled){return
}z.disabled=true;
z.$container.addClass("disabled")
};
var x=function(z){if(!z.disabled){return
}z.disabled=false;
z.$container.removeClass("disabled")
};
var h=function(z){z.$input.on("input",function(){if(z.disabled){return
}var B=$(this).val();
if(B==z._previous_val){return
}z._previous_val=B;
s(z);
var A=o(z,B);
z._page=1;
p(z,A);
if(!z.single){$(this).prop("size",$(this).val().length+1);
if($(this).val().length+z._selected.length===0){z.$input_container.addClass("empty");
z.$input.prop("placeholder",z.placeholder_text)
}else{z.$input_container.removeClass("empty");
z.$input.prop("placeholder","")
}}});
z.$input.on("keydown",function(A){if(z.disabled){return
}A.stopPropagation();
switch(A.keyCode){case TS.utility.keymap.down:A.preventDefault();
w(z);
break;
case TS.utility.keymap.up:A.preventDefault();
e(z);
break;
case TS.utility.keymap.enter:if(z._$active&&z._$active.length&&z._list_visible){A.preventDefault();
j(z,false);
if($(this).val()!==""){$(this).val("");
z._previous_val="";
p(z)
}y(z)
}break;
case TS.utility.keymap.del:if($(this).val()===""){A.preventDefault();
i(z)
}break;
case TS.utility.keymap.tab:if(z.tab_to_nav){A.preventDefault();
if(A.shiftKey){e(z)
}else{w(z)
}}break;
case TS.utility.keymap.esc:A.preventDefault();
y(z);
z.$input.blur();
break
}z.onKeyDown(A,A.isDefaultPrevented())
});
z.$input.on("blur",function(){if(!z._prevent_blur){y(z)
}});
z.$value.on("click",function(A){if(z.disabled){return
}A.stopPropagation();
s(z);
z._prevent_blur=false
});
z.$value.on("mousedown",function(A){if(A.which===1){z._prevent_blur=true
}});
z.$list_container.on("mousemove",".fsl_item",function(A){if(z.disabled){return
}if(A.clientX==d.lastX&&A.clientY==d.lastY){return
}if(z._$active){z._$active.removeClass("active")
}if(!$(this).hasClass("active")&&k($(this))){$(this).addClass("active");
z._$active=$(this)
}d.lastX=A.clientX;
d.lastY=A.clientY
});
z.$list_container.on("mouseleave",".fsl_item.active",function(A){$(this).removeClass("active");
z._$active=null
});
z.$list_container.on("click",".fsl_item",function(A){if(z.disabled){return
}A.preventDefault();
if(!k($(this))){return
}z._$active=$(this);
j(z);
if(z.$input.val()!==""){z.$input.val("");
z._previous_val="";
p(z)
}if(z.single){y(z);
A.stopPropagation()
}z._prevent_blur=false
});
z.$list_container.on("mousedown",function(A){if(A.which===1){z._prevent_blur=true
}});
z.$input_container.on("click",".fsl_token",function(A){if(z.disabled){return
}g(z,$(this));
z._prevent_blur=false
});
z.$input_container.on("mousedown",".fsl_token",function(A){if(A.which===1){z._prevent_blur=true
}});
z.$container.on("mouseleave",function(A){z._prevent_blur=false
});
z.$container.on("click",function(A){if(z.disabled){return
}s(z)
});
z.$list_container.on("click",".fsl_paginate_back",function(A){if(z._page>1){z._page--;
p(z,z._current_data);
z.$input.focus()
}});
z.$list_container.on("click",".fsl_paginate_forward",function(A){if(z._page<z._num_pages){z._page++;
p(z,z._current_data);
z.$input.focus()
}});
z.$container.parents("label").on("click",function(A){if(z.disabled){return
}A.preventDefault();
s(z)
})
};
$.widget("TS.filterSelect",{_create:function(){this.instance=TS.ui.filter_select.make(this.element,this.options)
},_destroy:function(){this.instance.$container.remove();
delete this.instance
},value:function(){return this.instance._selected
},getInstance:function(){return this.instance
},container:function(){return this.instance.$container
},recomputeHeight:function(){c(this.instance)
},showList:function(){s(this.instance)
},hideList:function(){y(this.instance,true)
},disable:function(){t(this.instance)
},enable:function(){x(this.instance)
},disabled:function(){return this.instance.disabled
}})
})();