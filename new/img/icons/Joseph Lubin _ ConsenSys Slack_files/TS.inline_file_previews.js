(function(){TS.registerModule("inline_file_previews",{onStart:function(){f()
},checkForInlineFilePreviewClick:function(r){var o=$(r.target);
var p;
var l=o.closest(".message");
if(l.length===0){return
}if(o.hasClass("service_link")||o.closest(".service_link")>0){return
}var q=l.attr("id");
var m=o.closest(".msg_inline_file_preview_toggler");
if(m.length>0){r.preventDefault();
p=m.data("file-id");
if(TS.inline_file_previews.shouldExpand(q,p)){k(q,p)
}else{c(q,p)
}return true
}if(o.closest(".msg_inline_file_preview_expander").length>0){r.preventDefault();
c(q,o.closest(".msg_inline_file_preview_expander").data("file-id"));
return true
}if(o.closest(".msg_inline_file_preview_collapser").length>0){r.preventDefault();
k(q,o.closest(".msg_inline_file_preview_collapser").data("file-id"));
return true
}var s=o.closest(".inline_file_preview_container, .file_container");
if(s.length===0){return
}if(o.closest(".preview_show.preview_show_more").length>0){r.preventDefault();
j(r,l,s);
return true
}if(o.closest(".preview_show.preview_show_less .preview_show_btn, .preview_show_less_header").length>0){r.preventDefault();
h(r,l,s);
return true
}if(o.closest("a").length){return false
}p=s.data("file-id");
var n=TS.files.getFileById(p);
if(!n){return false
}if(n.mode==="space"||n.mode==="post"||n.mode==="email"||n.mode==="snippet"){if(s.hasClass("inline_collapsed")){r.preventDefault();
j(r,l,s);
return true
}}return false
},shouldTruncate:function(m){if(!m){return false
}if(m.mode==="snippet"){if(m.lines_more>0){return true
}}else{if(m.mode==="post"||m.mode==="space"){if(!m.preview){return false
}if(m.preview.length>200){return true
}if(m.preview.split(" ").length>50){return true
}if(m.preview.split("\n").length>4){return true
}var l=m.preview.match(/<\/(?:h\d|p|li|pre)>/g);
if(l&&l.length>4){return true
}}else{if(m.mode==="email"){return true
}}}return false
},isTruncated:function(l,m){if(!m){return false
}return !(a[l+"_"+m.id])
},showingFullContent:function(p,o){var m=p+"_"+o;
var l=!!a[m];
if(!l){return false
}var n=TS.files.getFileById(o);
if(!n){return false
}if(n.mode==="space"){if(!n.content_html){return false
}}else{if(n.mode==="email"){if(!n.simplified_html&&n.attachments.length<1){return false
}}}return l
},shouldExpand:function(m,l){if(TS.model.expandable_state["inline_file_"+m+l]){return true
}if(TS.model.expandable_state["inline_file_"+m+l]===false){return false
}return true
},expandAllInCurrent:function(){i=true;
$(".msg_inline_file_preview_expander").trigger("click");
$(".msg_inline_file_preview_toggler.collapsed").trigger("click");
i=false;
if(TS.client){TS.client.ui.instaScrollMsgsToBottom(false)
}},collapseAllInCurrent:function(){$(".msg_inline_file_preview_collapser").trigger("click");
$(".msg_inline_file_preview_toggler.expanded").trigger("click")
},test:function(){return{actuallyExpandContent:g,updateSpacePreview:b}
}});
var a={};
var i=false;
var c=function(r,p){TS.model.expandable_state["inline_file_"+r+p]=true;
TS.storage.storeExpandableState(TS.model.expandable_state);
var l="#"+TS.utility.makeSafeForDomId(r);
var m=$(l);
if(!m.length){return
}var o=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var n=function(){return $(this).data("file-id")==p
};
var q=m.find(".inline_file_preview_container, .file_container").filter(n);
m.find(".msg_inline_file_preview_expander").filter(n).addClass("hidden");
m.find(".msg_inline_file_preview_collapser").filter(n).removeClass("hidden");
m.find(".msg_inline_file_title_hider").filter(n).addClass("hidden");
m.find('.msg_inline_file_preview_toggler[data-file-id="'+p+'"]').removeClass("collapsed").addClass("expanded");
q.removeClass("hidden");
if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}q.css("opacity",0).stop().animate({opacity:1},300);
if(!i){if(TS.client&&o){TS.client.ui.instaScrollMsgsToBottom(false);
q.scrollintoview({duration:0,offset:"top",px_offset:0,direction:"y"})
}else{q.scrollintoview({duration:200,offset:"bottom",px_offset:0,direction:"y"})
}}if(TS.client){TS.client.ui.updateClosestMonkeyScroller(m)
}};
var k=function(q,o){TS.model.expandable_state["inline_file_"+q+o]=false;
TS.storage.storeExpandableState(TS.model.expandable_state);
var l="#"+TS.utility.makeSafeForDomId(q);
var m=$(l);
if(!m.length){return
}var n=function(){return $(this).data("file-id")==o
};
var p=m.find(".inline_file_preview_container, .file_container").filter(n);
m.find(".msg_inline_file_preview_expander").filter(n).removeClass("hidden");
m.find(".msg_inline_file_preview_collapser").filter(n).addClass("hidden");
m.find(".msg_inline_file_title_hider").filter(n).removeClass("hidden");
m.find('.msg_inline_file_preview_toggler[data-file-id="'+o+'"]').removeClass("expanded").addClass("collapsed");
p.addClass("hidden");
setTimeout(function(){if(TS.client){TS.client.ui.updateClosestMonkeyScroller(m)
}},0)
};
var j=function(q,l,s){var o=s.data("file-id");
var m=TS.files.getFileById(o);
if(!m){return
}if(m.mode==="post"||m.mode==="space"||m.mode==="snippet"){var n=s.find(".preview_show_more .preview_show_btn");
n.data("stashed_text",n.html()).empty();
var r=new Spinner({lines:9,length:0,width:4,radius:5,corners:1,rotate:0,direction:1,color:"#ffffff",speed:1,trail:25,shadow:false,hwaccel:false,className:"spinner",zIndex:2000000000,top:"-8px",left:"-4px",opacity:0.1});
r.spin(n.get(0));
s.addClass("loading");
TS.files.fetchFileInfo(o,function(u,t){r.stop();
n.html(n.data("stashed_text"));
s.removeClass("loading");
if(t.content_html||t.content_highlight_html){g(l,t)
}})
}else{if(m.mode==="email"){if(m.simplified_html){g(l,m)
}else{l.find(".email_content").addClass("loading");
var p=setTimeout(function(){l.find(".inline_file_preview_container, .file_container").addClass("expanded")
},1000);
TS.files.fetchFileInfo(o,function(u,t){clearTimeout(p);
g(l,t);
l.find(".email_content").removeClass("loading")
})
}}}};
var g=function(l,n){var o=l.attr("id");
var m=o+"_"+n.id;
a[m]=true;
l.find(".inline_file_preview_container, .file_container").removeClass("inline_collapsed").addClass("inline_expanded");
if(n.mode==="space"||n.mode==="post"){b(l,n)
}else{if(n.mode==="email"){if(n.simplified_html===""){n.simplified_html="(This email does not have any content.)"
}l.find(".email_content").html(n.simplified_html)
}else{if(n.mode==="snippet"){d(l,n)
}}}if(TS.client){TS.client.ui.updateClosestMonkeyScroller(l)
}};
var h=function(q,l,r){var p=l.attr("id");
var o=r.data("file-id");
var n=TS.files.getFileById(o);
if(!n){return
}var m=p+"_"+o;
delete a[m];
l.find(".inline_file_preview_container, .file_container").removeClass("inline_expanded").addClass("inline_collapsed");
if(n.mode==="space"||n.mode==="post"){b(l,n)
}else{if(n.mode==="snippet"){d(l,n)
}}if(!i){l.scrollintoview({duration:0,offset:"top",px_offset:0,direction:"y"})
}if(TS.client){TS.client.ui.updateClosestMonkeyScroller(l)
}};
var e;
var f=function(){if(e){clearInterval(e)
}var l=function(){var m=$("#msgs_div .file_time_ago");
var n=[];
m.each(function(){var p=$(this).data("file-id");
var o=TS.files.getFileById(p);
if(!o){n.push($(this).text());
return
}n.push(TS.utility.date.toTimeAgo(o.updated));
o=null
});
m.each(function(o,p){$(p).text(n[o]);
p=null
});
m=null
};
l=TS.utility.throttleFunc(l,5000);
e=setInterval(l,60000)
};
var b=function(l,m){};
var d=function(l,m){}
})();