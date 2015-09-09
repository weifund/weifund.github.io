(function(){TS.registerModule("web",{login_sig:new signals.Signal(),ds_login_sig:new signals.Signal(),onStart:function(){TS.prefs.messages_theme_changed_sig.add(TS.setThemeClasses,TS);
TS.web.autoToggleSection();
$('[data-toggle="tooltip"]').tooltip({animation:true});
$("body").bind("mousewheel.ignore_while_monkeyscrolling",function(d){var f=d.originalEvent;
if(!f){return
}var c=$(d.target).closest(".monkey_scroller");
if(!c.length){return
}var b=f.wheelDeltaY;
if(b===null&&f.detail&&f.axis==f.VERTICAL_AXIS){b=f.detail
}else{if(b===null){b=f.wheelDelta
}}if(!b){return
}if((c[0].scrollTop===(c[0].scrollHeight-c.height())&&b<0)||(c[0].scrollTop===0&&b>0)){d.preventDefault()
}})
},gogogo:function(){TS.logLoad("TS.web.gogogo");
$("html").bind("mousedown",function(){TS.model.ui.is_mouse_down=true
});
$("html").bind("dragend",function(){TS.model.ui.is_mouse_down=false
});
$("html").bind("mouseup",function(){TS.model.ui.is_mouse_down=false
})
},onMsgsDivClick:function(g){var d=$(g.target);
var i=d.closest(".msg_actions");
var c=d.closest(".message").data("ts");
if(c){c=c.toString()
}if(d.hasClass("member")){if(d.data("member-id")){}else{TS.warn("hmmm, no data-member-id?")
}}if(d.hasClass("internal_member_link")){}if(d.hasClass("internal_bot_link")){}if(d.hasClass("internal_channel_link")){}if(i.length==1){TS.info("click on child of .msg_actions");
var h=i.data("msg-ts");
var b=TS.shared.getActiveModelOb();
if(d.is(i)||d.closest(".msg_cog").length){g.preventDefault();
if(b){TS.menu.startWithMessageActions(g,h,b.msgs)
}else{TS.warn("Do not have any messages")
}}else{if(d.hasClass("msg_select_cb")){TS.msg_edit.batchDeleteSelectionChanged(d,g.shiftKey)
}}return
}if(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration||TS.boot_data.feature_fix_files){var f=d.closest(".file_actions");
if(f.length==1){TS.info("click on .file_actions");
g.preventDefault();
TS.menu.startWithFileActions(g,f.data("file-id"));
return
}}TS.stars.checkForStarClick(g);
TS.rxns.checkForRxnClick(g);
TS.inline_imgs.checkForInlineImgClick(g);
TS.inline_videos.checkForInlineVideoClick(g);
TS.inline_audios.checkForInlineAudioClick(g);
TS.inline_others.checkForInlineOtherClick(g);
TS.inline_attachments.checkForInlineAttachmentClick(g);
if(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration||TS.boot_data.feature_fix_files){TS.inline_file_previews.checkForInlineFilePreviewClick(g)
}},toggleSection:function(f,e){var d=$("#"+f);
var b=d.css("border-bottom");
d.css("border-bottom","1px solid transparent");
d.find(".accordion_subsection").slideToggle(100,function(){d.css("border-bottom",b);
if(d.hasClass("plastic_row")&&!d.hasClass("open")){d.removeAttr("style")
}});
d.toggleClass("open");
d.find("textarea").trigger("autosize-resize");
var c=d.find(".accordion_expand");
if(c.text()=="expand"){c.text("close");
d.find(".ladda-button").each(function(){Ladda.bind($(this)[0])
})
}else{c.text("expand")
}if(!e){history.pushState(null,null,"#"+f.replace("change_",""))
}},openSection:function(c){var b=$("#"+c);
if(!b.hasClass("open")){TS.web.toggleSection(c)
}},closeSection:function(c){var b=$("#"+c);
if(b.hasClass("open")){TS.web.toggleSection(c)
}},autoToggleSection:function(){var d=TS.utility.htmlEntities(window.location.hash);
if(d){if(d.charAt(0)==="#"){d=d.substring(1)
}var b=$('a[name="'+d+'"][data-accordion]');
var c=b.data("accordion");
if(c){TS.web.toggleSection(c)
}}},scrollToElWithHeaderOffset:function(b){var c=$(b);
c.scrollintoview({px_offset:$("header").height()+16})
},onFirstLoginMS:function(b){$("body").addClass("no_attachment_max_width");
a();
TS.logLoad("TS.web logged in first time");
TS.emoji.makeEmoticonList();
if(window.load_start_ms){TS.warn((new Date()-window.load_start_ms)+"ms from first html to login_sig.dispatch()")
}TS.web.login_sig.dispatch()
},onEveryLoginMS:function(b){}});
var a=function(){$(".emoji_replace_on_load").each(function(){var b=$(this).html();
b=TS.emoji.graphicReplace(b);
$(this).html(b)
})
}
})();