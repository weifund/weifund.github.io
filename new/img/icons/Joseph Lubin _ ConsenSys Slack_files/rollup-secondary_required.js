(function(){function a(d){var f;
var b;
var e=new Promise(function(h,g){b=h;
f=g
});
var c=function(h,j,g){var i={data:j,args:g};
if(h){b(i)
}else{f(i)
}if(d){d(h,j,g)
}};
return{promise:e,handler:c}
}TS.registerModule("api",{Q_empty_sig:new signals.Signal(),pending:0,limit:4,Q:[],one_at_a_time_methodsA:["users.prefs.set"],one_at_a_time_call_pending:false,one_at_a_timeQ:[],method_call_counts:{total_asks:0,total_attempts:0},onStart:function(){},call:function(h,d,f,e,c){d=d||{};
var b;
if(TS.api.one_at_a_time_methodsA.indexOf(h)!=-1){if(!TS.api.one_at_a_time_call_pending){return TS.api.actuallyCall(h,d,f,e,c)
}b=TS.api.one_at_a_timeQ
}else{if(TS.api.pending<TS.api.limit){return TS.api.actuallyCall(h,d,f,e,c)
}b=TS.api.Q
}var g=a(f);
TS.logLoad("TS.api Qing "+h);
b.push({method:h,args:d,handler:g.handler,dont_set_active:e,progressHandler:c});
return g.promise
},callImmediately:function(f,c,e,d,b){if(TS.api.one_at_a_time_methodsA.indexOf(f)!=-1){TS.warn(f+" cannot be called with TS.api.callImmediately, so sending to TS.api.call for enqueuing");
return TS.api.call(f,c,e,d,b)
}return TS.api.actuallyCall(f,c||{},e,d,b)
},callSynchronously:function(f,c,e,d,b){if(TS.api.one_at_a_time_methodsA.indexOf(f)!=-1){TS.warn(f+" cannot be called with TS.api.callSynchronously, so sending to TS.api.call for enqueuing");
return TS.api.call(f,c,e,d,b)
}c=c||{};
c._synchronously=true;
return TS.api.actuallyCall(f,c,e,d,b)
},nextFromQ:function(){var b;
if(TS.api.one_at_a_timeQ.length&&!TS.api.one_at_a_time_call_pending){b=TS.api.one_at_a_timeQ.shift()
}else{if(TS.api.Q.length){b=TS.api.Q.shift()
}}if(!b){if(TS.api.pending===0){TS.api.Q_empty_sig.dispatch()
}return
}TS.api.actuallyCall(b.method,b.args,b.handler,b.dont_set_active,b.progressHandler)
},actuallyCall:function(b,h,j,f,i){TS.logLoad("TS.api calling "+b);
TS.api.pending++;
if(TS.api.one_at_a_time_methodsA.indexOf(b)!=-1){TS.api.one_at_a_time_call_pending=true
}h.token=TS.model.api_token;
TS.log(2,'calling method "'+b+'"');
if(!f){h.set_active=true;
TS.model.last_net_send=Date.now()
}var e=Date.now();
var g=Math.round(Date.now()/1000);
var c=TS.model.api_url+b+"?t="+g+TS.appendQSArgsToUrl();
if(b=="rtm.start"&&TS.client){c=TS.utility.appendLogToUrlWithLimit(c,TS.ms.getConnectionFlowLog())
}if(TS.boot_data.feature_channel_eventlog_client){if(b=="channels.history"||b=="groups.history"||b=="im.history"||b=="mpim.history"){h.visible=1
}}var d=a(j);
TS.api.ajax_call(c,b,h,i,function(p){var l=(Date.now()-e);
TS.logLoad("TS.api complete "+b+" (took "+l+"ms)");
TS.log(2,'got api rsp for method "'+b+'" (took '+l+"ms)");
TS.dir(2,h);
TS.dir(2,p);
var n=24;
var m=false;
if(!p){p={}
}if(p.ok){m=true
}else{if(p.ok===false){m=false;
if(p.error=="file_deleted"){}else{TS.error('api call "'+b+'" not ok');
try{TS.warn("args: "+JSON.stringify(h))
}catch(o){TS.warn("could not stringify args")
}try{TS.warn("data: "+JSON.stringify(p))
}catch(o){TS.warn("could not stringify data")
}}}else{TS.error('api call "'+b+'" not ok');
try{TS.warn("args: "+JSON.stringify(h))
}catch(o){TS.warn("could not stringify args")
}try{TS.warn("data: "+JSON.stringify(p))
}catch(o){TS.warn("could not stringify data")
}if(h._attempts<n&&!h._synchronously){var k=(TS.api.one_at_a_time_methodsA.indexOf(b)!=-1)?TS.api.one_at_a_timeQ:TS.api.Q;
k.unshift({method:b,args:h,handler:j,dont_set_active:f});
return
}}}d.handler(m,p,h)
});
return d.promise
},ajax_call:function(d,j,c,b,f){if(!c._attempts){c._attempts=0;
TS.api.method_call_counts.total_asks++;
TS.api.method_call_counts[j]=(TS.api.method_call_counts[j])?TS.api.method_call_counts[j]+1:1
}TS.api.method_call_counts.total_attempts++;
TS.log(48,j+" count: "+TS.api.method_call_counts[j]+" (asks: "+TS.api.method_call_counts.total_asks+" attempts: "+TS.api.method_call_counts.total_attempts+")");
c._attempts++;
var g=new XMLHttpRequest();
if(b){g.addEventListener("progress",function(i){var k=-1;
if(i.lengthComputable){k=i.loaded/i.total
}b(k)
},false)
}g.onerror=function(i){c._error={_event:i,_event_error:i.error||"e.error is undefined"}
};
g.onreadystatechange=function(){var l=f;
var k=c._delay_ms?c._delay_ms:100;
if(g.readyState==4){if(g.status==200){g.onreadystatechange=null;
var m;
if(g.responseText.indexOf("{")===0){try{m=JSON.parse(g.responseText)
}catch(i){TS.warn("unable to do anything with api rsp");
TS.error(i)
}}else{m={ok:1,rsp:g.responseText}
}l(m)
}else{if(g.status===0){k=c._delay_ms=(!c._delay_ms)?1000:Math.min(c._delay_ms*1.3,1000*60);
c._got_0_status=true
}l({ok:0,error:"Non-200 HTTP status: "+g.status,debug:g.responseText})
}setTimeout(function(){TS.api.pending--;
if(TS.api.one_at_a_time_methodsA.indexOf(j)!=-1){TS.api.one_at_a_time_call_pending=false
}TS.api.nextFromQ()
},k)
}};
g.open("POST",d,!c._synchronously);
g.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var h=[];
for(var e in c){h[h.length]=encodeURIComponent(e)+"="+encodeURIComponent(c[e])
}g.send(h.join("&"))
}})
})();
(function(){TS.registerModule("notifs",{onStart:function(){},canCorGHaveChannelMentions:function(o){var n=TS.channels.getChannelById(o)||TS.groups.getGroupById(o)||(TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o));
if(!n){TS.error("no model_ob for c_id:"+o+"?");
return true
}if(TS.model.team.prefs.who_can_at_channel=="admin"||TS.model.team.prefs.who_can_at_channel=="owner"){return true
}if(n.is_general&&(TS.model.team.prefs.who_can_at_everyone=="admin"||TS.model.team.prefs.who_can_at_everyone=="owner")){return true
}if(n.is_general&&(TS.model.team.prefs.who_can_post_general=="admin"||TS.model.team.prefs.who_can_post_general=="owner")){return true
}var p=TS.notifs.getCalculatedCorGNotifySetting(n.id);
if(p!="mentions"){return true
}return !TS.notifs.hasUserSuppressedCorGChannelMentions(o)
},hasUserSuppressedCorGChannelMentions:function(p){var n=TS.channels.getChannelById(p)||TS.groups.getGroupById(p)||(TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(p));
if(!n){TS.error("no model_ob for c_id:"+p+"?");
return true
}var o=TS.model.at_channel_suppressed_channels.indexOf(n.id);
if(o!=-1){return true
}return false
},hasUserSuppressedCorGPushChannelMentions:function(p){var n=TS.channels.getChannelById(p)||TS.groups.getGroupById(p)||(TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(p));
if(!n){TS.error("no model_ob for c_id:"+p+"?");
return true
}var o=TS.model.push_at_channel_suppressed_channels.indexOf(n.id);
if(o!=-1){return true
}return false
},isCorGMuted:function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}if(TS.model.muted_channels.indexOf(n)>-1){return true
}return false
},getGlobalPushNotificationSetting:function(){if(TS.model.prefs.push_everything){return"everything"
}if(TS.model.prefs.push_mention_alert&&TS.model.prefs.push_dm_alert){return"dm_and_mentions"
}if(TS.model.prefs.push_mention_alert){return"mentions"
}if(TS.model.prefs.push_dm_alert){return"dms"
}return"nothing"
},getCorGsNotUsingGlobalPushNotificationSetting:function(){var p={nothing:[],mentions:[],everything:[]};
var o;
var q;
var r={};
var t;
var n;
var s="quiet";
if(TS.model.prefs.push_mention_alert){s="mentions"
}if(TS.model.prefs.push_everything){s="loud"
}n=TS.model.prefs.push_loud_channels_set?TS.model.prefs.push_loud_channels_set.split(","):[];
for(q=0;
q<n.length;
q++){t=$.trim(n[q]);
if(!t){continue
}r[t]="quiet"
}n=TS.channels.getChannelsForUser();
for(q=0;
q<n.length;
q++){if(!n[q]){continue
}t=n[q].id;
if(TS.notifs.getCalculatedCorGPushNotifySetting(t)!="mentions"){continue
}if(!TS.notifs.hasUserSuppressedCorGPushChannelMentions(t)){continue
}r[t]="mentions_suppressed";
p.mentions.push(n[q])
}n=TS.model.prefs.push_mention_channels?TS.model.prefs.push_mention_channels.split(","):[];
for(q=0;
q<n.length;
q++){t=$.trim(n[q]);
if(!t){continue
}if(!r[t]){continue
}r[t]="mentions"
}n=TS.model.prefs.push_loud_channels?TS.model.prefs.push_loud_channels.split(","):[];
for(q=0;
q<n.length;
q++){t=$.trim(n[q]);
if(!t){continue
}if(!r[t]){continue
}r[t]="loud"
}for(t in r){o=TS.channels.getChannelById(t)||TS.groups.getGroupById(t)||(TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(t));
if(!o){continue
}if(o.is_archived){continue
}if(o.is_channel&&!o.is_member){continue
}if(r[t]=="loud"){if(s=="loud"){continue
}p.everything.push(o)
}else{if(r[t]=="mentions"){if(s=="mentions"){continue
}p.mentions.push(o)
}else{if(r[t]=="mentions_suppressed"){}else{if(s=="quiet"){continue
}p.nothing.push(o)
}}}}return p
},getGlobalNotificationSetting:function(){if(!TS.model.prefs.growls_enabled){return"nothing"
}if(TS.model.prefs.all_channels_loud){return"everything"
}return"mentions"
},getCorGsNotUsingGlobalNotificationSetting:function(){var p={nothing:[],mentions:[],everything:[],muted:[]};
var o;
var q;
var n=TS.channels.getChannelsForUser();
for(q in n){o=n[q];
if(o.is_archived){continue
}if(!o.is_member){continue
}if(m(o.id)){p.nothing.push(o)
}if(k(o.id)){p.mentions.push(o)
}if(e(o.id)){p.everything.push(o)
}if(TS.notifs.isCorGMuted(o.id)){p.muted.push(o)
}}for(q in TS.model.groups){o=TS.model.groups[q];
if(o.is_archived){continue
}if(m(o.id)){p.nothing.push(o)
}if(k(o.id)){p.mentions.push(o)
}if(e(o.id)){p.everything.push(o)
}if(TS.notifs.isCorGMuted(o.id)){p.muted.push(o)
}}if(TS.boot_data.feature_mpim_client){for(q in TS.model.mpims){o=TS.model.mpims[q];
if(o.is_archived){continue
}if(m(o.id)){p.nothing.push(o)
}if(k(o.id)){p.mentions.push(o)
}if(e(o.id)){p.everything.push(o)
}if(TS.notifs.isCorGMuted(o.id)){p.muted.push(o)
}}}return p
},getCalculatedCorGNotifySetting:function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}var o=g(n);
if(o){if(d(n)){return"everything"
}if(a(n)){return"nothing"
}return"mentions"
}if(TS.model.prefs.growls_enabled){if(TS.model.prefs.all_channels_loud){return"everything"
}return"mentions"
}return"nothing"
},makeCorGMuted:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.muted_channels.indexOf(o);
if(n==-1){TS.model.muted_channels.push(o)
}TS.prefs.setMutedChannels(TS.model.muted_channels.join(","));
if(!TS.client){return
}if(p){TS.channels.calcUnreadCnts(p)
}if(r){TS.groups.calcUnreadCnts(r)
}if(q){TS.mpims.calcUnreadCnts(q)
}},makeCorGNOTMuted:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.muted_channels.indexOf(o);
if(n!=-1){TS.model.muted_channels.splice(n,1)
}TS.prefs.setMutedChannels(TS.model.muted_channels.join(","));
if(!TS.client){return
}if(p){TS.channels.calcUnreadCnts(p)
}if(r){TS.groups.calcUnreadCnts(r)
}if(q){TS.mpims.calcUnreadCnts(q)
}},makeCorGSuppressed:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.at_channel_suppressed_channels.indexOf(o);
if(n==-1){TS.model.at_channel_suppressed_channels.push(o)
}TS.prefs.setSuppressedChannels(TS.model.at_channel_suppressed_channels.join(","));
if(!TS.client){return
}if(p){TS.channels.calcUnreadCnts(p)
}if(r){TS.groups.calcUnreadCnts(r)
}if(q){TS.mpims.calcUnreadCnts(q)
}},makeCorGNOTSuppressed:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.at_channel_suppressed_channels.indexOf(o);
if(n!=-1){TS.model.at_channel_suppressed_channels.splice(n,1)
}TS.prefs.setSuppressedChannels(TS.model.at_channel_suppressed_channels.join(","));
if(!TS.client){return
}if(p){TS.channels.calcUnreadCnts(p)
}if(r){TS.groups.calcUnreadCnts(r)
}if(q){TS.mpims.calcUnreadCnts(q)
}},makeCorGPushSuppressed:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.push_at_channel_suppressed_channels.indexOf(o);
if(n==-1){TS.model.push_at_channel_suppressed_channels.push(o)
}TS.prefs.setPushSuppressedChannels(TS.model.push_at_channel_suppressed_channels.join(","))
},makeCorGNOTPushSuppressed:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.push_at_channel_suppressed_channels.indexOf(o);
if(n!=-1){TS.model.push_at_channel_suppressed_channels.splice(n,1)
}TS.prefs.setPushSuppressedChannels(TS.model.push_at_channel_suppressed_channels.join(","))
},makeCorGDTopNothing:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.loud_channels.indexOf(o);
if(n!=-1){TS.model.loud_channels.splice(n,1)
}TS.prefs.setLoudChannels(TS.model.loud_channels.join(","));
n=TS.model.never_channels.indexOf(o);
if(TS.model.prefs.growls_enabled){if(n==-1){TS.model.never_channels.push(o)
}j(o)
}else{if(n!=-1){TS.model.never_channels.splice(n,1)
}f(o)
}TS.prefs.setNeverChannels(TS.model.never_channels.join(","))
},makeCorGDTopEverything:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.never_channels.indexOf(o);
if(n!=-1){TS.model.never_channels.splice(n,1)
}TS.prefs.setNeverChannels(TS.model.never_channels.join(","));
n=TS.model.loud_channels.indexOf(o);
if(TS.model.prefs.growls_enabled&&TS.model.prefs.all_channels_loud){if(n!=-1){TS.model.loud_channels.splice(n,1)
}f(o)
}else{if(n==-1){TS.model.loud_channels.push(o)
}j(o)
}TS.prefs.setLoudChannels(TS.model.loud_channels.join(","))
},makeCorGDTopMentions:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.loud_channels.indexOf(o);
if(n!=-1){TS.model.loud_channels.splice(n,1)
}TS.prefs.setLoudChannels(TS.model.loud_channels.join(","));
n=TS.model.never_channels.indexOf(o);
if(n!=-1){TS.model.never_channels.splice(n,1)
}TS.prefs.setNeverChannels(TS.model.never_channels.join(","));
if(TS.model.prefs.growls_enabled&&!TS.model.prefs.all_channels_loud){f(o)
}else{j(o)
}},makeCorGPushNothing:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.push_loud_channels.indexOf(o);
if(n!=-1){TS.model.push_loud_channels.splice(n,1)
}TS.prefs.setPushLoudChannels(TS.model.push_loud_channels.join(","));
n=TS.model.push_mention_channels.indexOf(o);
if(n!=-1){TS.model.push_mention_channels.splice(n,1)
}TS.prefs.setPushMentionChannels(TS.model.push_mention_channels.join(","));
if(TS.model.prefs.push_everything||TS.model.prefs.push_mention_alert){i(o)
}else{l(o)
}},makeCorGPushEverything:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.push_mention_channels.indexOf(o);
if(n!=-1){TS.model.push_mention_channels.splice(n,1)
}TS.prefs.setPushMentionChannels(TS.model.push_mention_channels.join(","));
n=TS.model.push_loud_channels.indexOf(o);
if(TS.model.prefs.push_everything){if(n!=-1){TS.model.push_loud_channels.splice(n,1)
}l(o)
}else{if(n==-1){TS.model.push_loud_channels.push(o)
}i(o)
}TS.prefs.setPushLoudChannels(TS.model.push_loud_channels.join(","))
},makeCorGPushMentions:function(o){var p=TS.channels.getChannelById(o);
var r=TS.groups.getGroupById(o);
var q=TS.boot_data.feature_mpim_client&&TS.mpims.getMpimById(o);
if(!p&&!r&&!q){TS.error('wtf no channel/group "'+o+'"');
return false
}var n=TS.model.push_loud_channels.indexOf(o);
if(n!=-1){TS.model.push_loud_channels.splice(n,1)
}TS.prefs.setPushLoudChannels(TS.model.push_loud_channels.join(","));
n=TS.model.push_mention_channels.indexOf(o);
if(!TS.model.prefs.push_mention_alert||TS.model.prefs.push_everything){if(n==-1){TS.model.push_mention_channels.push(o)
}i(o)
}else{if(n!=-1){TS.model.push_mention_channels.splice(n,1)
}l(o)
}TS.prefs.setPushMentionChannels(TS.model.push_mention_channels.join(","))
},getCalculatedCorGPushNotifySetting:function(o){if(!o){TS.error('wtf no c_id "'+o+'"');
return false
}var n=c(o);
if(n){if(b(o)){return"everything"
}if(h(o)){return"mentions"
}return"nothing"
}if(TS.model.prefs.push_everything){return"everything"
}if(TS.model.prefs.push_mention_alert){return"mentions"
}return"nothing"
}});
var d=function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}if(TS.model.loud_channels.indexOf(n)>-1){return true
}return false
};
var a=function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}if(TS.model.never_channels.indexOf(n)>-1){return true
}return false
};
var g=function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}if(TS.model.loud_channels_set.indexOf(n)>-1){return true
}return false
};
var m=function(n){if(TS.model.prefs.growls_enabled&&TS.notifs.getCalculatedCorGNotifySetting(n)=="nothing"){return true
}return false
};
var k=function(n){var o=TS.notifs.getCalculatedCorGNotifySetting(n);
if(o!="mentions"){return false
}if(!TS.model.prefs.growls_enabled||TS.model.prefs.all_channels_loud){return true
}if(TS.notifs.hasUserSuppressedCorGChannelMentions(n)){return true
}return false
};
var e=function(n){if((!TS.model.prefs.growls_enabled||!TS.model.prefs.all_channels_loud)&&TS.notifs.getCalculatedCorGNotifySetting(n)=="everything"){return true
}return false
};
var b=function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}if(TS.model.push_loud_channels.indexOf(n)>-1){return true
}return false
};
var h=function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}if(TS.model.push_mention_channels.indexOf(n)>-1){return true
}return false
};
var c=function(n){if(!n){TS.error('wtf no c_id "'+n+'"');
return false
}if(TS.model.push_loud_channels_set.indexOf(n)>-1){return true
}return false
};
var j=function(o){var n=TS.model.loud_channels_set.indexOf(o);
if(n==-1){TS.model.loud_channels_set.push(o)
}TS.prefs.setLoudChannelsSet(TS.model.loud_channels_set.join(","))
};
var f=function(o){var n=TS.model.loud_channels_set.indexOf(o);
if(n!=-1){TS.model.loud_channels_set.splice(n,1)
}TS.prefs.setLoudChannelsSet(TS.model.loud_channels_set.join(","))
};
var i=function(o){var n=TS.model.push_loud_channels_set.indexOf(o);
if(n==-1){TS.model.push_loud_channels_set.push(o)
}TS.prefs.setPushLoudChannelsSet(TS.model.push_loud_channels_set.join(","))
};
var l=function(o){var n=TS.model.push_loud_channels_set.indexOf(o);
if(n!=-1){TS.model.push_loud_channels_set.splice(n,1)
}TS.prefs.setPushLoudChannelsSet(TS.model.push_loud_channels_set.join(","))
}
})();
(function(){TS.registerModule("channels",{switched_sig:new signals.Signal(),pre_switched_sig:new signals.Signal(),joined_sig:new signals.Signal(),member_joined_sig:new signals.Signal(),left_sig:new signals.Signal(),member_left_sig:new signals.Signal(),list_fetched_sig:new signals.Signal(),history_fetched_sig:new signals.Signal(),history_being_fetched_sig:new signals.Signal(),message_received_sig:new signals.Signal(),message_removed_sig:new signals.Signal(),message_changed_sig:new signals.Signal(),marked_sig:new signals.Signal(),unread_changed_sig:new signals.Signal(),unread_highlight_changed_sig:new signals.Signal(),topic_changed_sig:new signals.Signal(),purpose_changed_sig:new signals.Signal(),created_sig:new signals.Signal(),deleted_sig:new signals.Signal(),renamed_sig:new signals.Signal(),archived_sig:new signals.Signal(),unarchived_sig:new signals.Signal(),msg_not_sent_sig:new signals.Signal(),data_retention_changed_sig:new signals.Signal(),data_updated_sig:new signals.Signal(),onStart:function(){},addMsg:function(i,h){var e=TS.channels.getChannelById(i);
if(!e){TS.error('unknown channel "'+i+'"');
return
}var f=e.msgs;
if(!TS.utility.msgs.validateMsg(i,h,f)){return
}TS.utility.msgs.appendMsg(f,h);
TS.utility.msgs.maybeStoreMsgs(e.id,f);
TS.utility.msgs.maybeSetOldestMsgsTsAfterMsgAdded(e);
var g=!TS.utility.msgs.isTempMsg(h);
TS.channels.calcUnreadCnts(e,g);
TS.utility.msgs.maybeTruncateMsgs(e);
TS.channels.message_received_sig.dispatch(e,h)
},calcUnreadCnts:function(e,f){TS.shared.calcUnreadCnts(e,TS.channels,f)
},removeMsg:function(h,g){var e=TS.channels.getChannelById(h);
if(!e){TS.error('unknown channel "'+h+'"');
return
}if(e._archive_msgs){TS.utility.msgs.spliceMsg(e._archive_msgs,g)
}var f=e.msgs;
TS.utility.msgs.spliceMsg(f,g);
TS.channels.message_removed_sig.dispatch(e,g);
TS.utility.msgs.maybeStoreMsgs(e.id,f);
TS.channels.calcUnreadCnts(e,true)
},changeMsgText:function(h,g,e){var f=TS.channels.getChannelById(h);
if(!f){TS.error('unknown channel "'+h+'"');
return
}g.text=e;
TS.channels.message_changed_sig.dispatch(f,g);
TS.utility.msgs.maybeStoreMsgs(f.id,f.msgs)
},sendMsg:function(l,o){var h;
var j=TS.channels.getChannelById(l);
if(!j){return false
}if(j.is_archived){return false
}if(!j.is_member){return false
}var f=TS.channels.getGeneralChannel();
var m=function(q,p){if(p){TS.client.ui.addOrFlashEphemeralBotMsg({text:q,ephemeral_type:p})
}else{TS.generic_dialog.alert(q)
}TS.client.ui.$msg_input.val(o);
TS.view.focusMessageInput()
};
if(j.is_general&&!TS.members.canUserPostInGeneral()){m("A team owner has restricted posting to the #*"+j.name+"* channel.","general_posting_restricted");
return false
}var g=TS.format.cleanMsg(o);
var k=TS.model.here_regex.test(g);
var e=TS.model.channel_regex.test(g)||TS.model.group_regex.test(g)||k;
var n=TS.model.everyone_regex.test(g)||(j.is_general&&e);
if(n){if(!TS.members.canUserAtEveryone()){h="<p>A team owner has restricted the use of <b>@everyone</b> messages.</p>";
if(TS.model.user.is_restricted){h="<p>Your account is restricted, and you cannot send <b>@everyone</b> messages.</p>"
}if(!j.is_general&&TS.members.canUserAtChannelOrAtGroup()){h+='<p class="no_bottom_margin">If you just want to address everyone in this channel, use <b>@channel</b> instead.</p>'
}m(h);
return false
}if(!j.is_general&&!k){if(!f||!f.is_member){h="<p>You cannot send <b>@everyone</b> messages.</p>";
if(TS.members.canUserAtChannelOrAtGroup()){h+='<p class="no_bottom_margin">If you just want to address everyone in this channel, use <b>@channel</b> instead.</p>'
}m(h)
}else{TS.generic_dialog.start({title:"Send @everyone a message",body:'<p class="bold">Would you like to switch to #'+f.name+' and send your message?</p><p class="">Using <b>@everyone</b> in a message is a way to address your whole team, but it must be done in the #'+f.name+' channel.</p><p class="no_bottom_margin">If you just want to address everyone in this channel, use <b>@channel</b> instead.</p>',show_cancel_button:true,show_go_button:true,go_button_text:"Yes, send it",on_go:function(){TS.channels.displayChannel(f.id,o)
},on_cancel:function(){TS.client.ui.$msg_input.val(o);
TS.view.focusMessageInput()
}})
}return false
}}if(e&&!TS.members.canUserAtChannelOrAtGroup()){var i=k?"@here":"@channel";
h="<p>A team owner has restricted the use of <b>"+i+"</b> messages.</p>";
m(h);
return false
}if(TS.ui.needToShowAtChannelWarning(l,o)){TS.ui.at_channel_warning_dialog.startInMessagePane(l,o,TS.channels);
return false
}return TS.shared.sendMsg(l,o,TS.channels)
},onSendMsg:function(g,e){var f=TS.channels.getChannelById(e.SENT_MSG.channel);
if(!f){TS.error("unknown channel? "+e.SENT_MSG.channel);
return
}TS.shared.onSendMsg(g,e,f,TS.channels)
},displayChannel:function(h,f,j,g){TS.timing.mark("start_channel_change_"+h);
j=!!j;
g=!!g;
var i=TS.channels.getChannelById(h);
if(!i){TS.error('channel "'+h+'" unknown');
return
}if(h==TS.model.active_channel_id&&!g){TS.warn('channel "'+h+'" already displayed');
if(f){TS.channels.sendMsg(h,$.trim(f))
}return
}if(TS.boot_data.feature_archive_viewer){if(!i.is_member){if(f){TS.model.requested_channel_joins[h]={and_send_txt:f};
TS.channels.join(i.name);
return
}else{TS.client.archives.previous_model_ob=TS.shared.getActiveModelOb()
}}}else{if(!i.is_member&&!i.is_archived){if(g){TS.error("I never ever expect to get here, but I am logging this just in case!")
}else{TS.model.requested_channel_joins[h]={and_send_txt:f};
TS.channels.join(i.name)
}return
}}var e=(g)?false:j;
if(TS.client.channelDisplaySwitched(h,g,e)){TS.channels.pre_switched_sig.dispatch();
TS.channels.switched_sig.dispatch()
}if(f){TS.channels.sendMsg(h,$.trim(f))
}},setLastRead:function(f,e){if(f.last_read==e){return false
}if(e.indexOf(TS.utility.date.fake_ts_unique_padder)>-1){TS.error("bad ts:"+e);
return false
}if(f.last_read>e){var g=TS.model.last_reads_set_by_client[f.id+"_"+e];
delete TS.model.last_reads_set_by_client[f.id+"_"+e];
if(g){TS.warn("NOT going back in time channel.last_read:"+f.last_read+" new:"+e);
return
}TS.info("going back in time channel.last_read:"+f.last_read+" new:"+e)
}f.last_read=e;
TS.channels.marked_sig.dispatch(f);
TS.channels.calcUnreadCnts(f);
return true
},markMostRecentReadMsg:function(e,f){if(!e){TS.error("channel unknown");
return
}if(!e.msgs||!e.msgs.length){return
}var g=TS.utility.msgs.getMostRecentValidTs(e.msgs);
if(!g){TS.warn("no valid tses???");
return
}e.all_read_this_session_once=true;
TS.channels.markReadMsg(e.id,g,f)
},markReadMsg:function(e,g,h){var f=TS.channels.getChannelById(e);
if(!f){TS.error('channel "'+e+'" unknown');
return
}if(f.last_read==g){return
}if(TS.channels.setLastRead(f,g)){f._marked_reason=h;
if(f.is_member){f.needs_api_marking=true
}}},onMarked:function(f,h,e){var g=TS.channels.getChannelById(e.channel);
if(!g){TS.error('wtf no channel "'+e.channel+'"');
return
}if(f||(h&&(h.error=="not_in_channel"||h.error=="is_archived"))){}else{g.needs_api_marking=true
}},join:function(e,g,f){if(TS.model.user.is_restricted){return
}if(!e){return
}if(!TS.channels.getChannelByName(e)){if(TS.model.created_channels[e]){return
}TS.model.created_channels[e]=true
}TS.api.call("channels.join",{name:e,in_background:!!f},function(i,j,h){TS.channels.onJoin(i,j,h);
if(g){g(i,j,h)
}if(!i){delete TS.model.created_channels[e]
}})
},onJoin:function(h,j,g){if(!h){if(j.error=="name_taken"){}else{if(j.error=="is_archived"){if(TS.boot_data.feature_archive_viewer){TS.channels.displayChannel(TS.channels.getChannelByName(g.name).id)
}else{setTimeout(function(){TS.generic_dialog.alert("<p>The <b>#"+TS.utility.htmlEntities(g.name)+'</b> channel is archived.</p><p><a href="/archives/'+TS.utility.htmlEntities(g.name)+'" target="_blank">Click here</a> to view the channel archives or re-open it.</p>')
},500)
}}else{if(j.error=="restricted_action"){TS.generic_dialog.alert("<p>You don't have permission to create new channels.</p><p>Talk to your team owner.</p>")
}else{TS.error("failed to join channel");
alert("failed to join channel")
}}}return
}var f;
var i;
if(j.channel){i=TS.channels.upsertChannel(j.channel);
f=j.channel.id
}if(!f){TS.error("no channel_id?!!");
return
}var e="";
if(TS.model.requested_channel_joins[f]){e=TS.model.requested_channel_joins[f].and_send_txt;
delete TS.model.requested_channel_joins[f]
}if(!i){TS.error("no channel?!!");
return
}if(g.in_background){return
}if(!i.needs_created_message&&!i.never_needs_joined_msg){i.needs_joined_message=true
}TS.channels.displayChannel(f,e)
},leave:function(f){var e=TS.channels.getChannelById(f);
if(!e){return
}if(e.is_general||TS.model.user.is_restricted){TS.generic_dialog.alert("Sorry, you can't leave <b>#"+e.name+"</b>!");
return
}TS.channels.markMostRecentReadMsg(e,TS.model.marked_reasons.left);
TS.client.markLastReadsWithAPI();
TS.api.call("channels.leave",{channel:f},TS.channels.onLeave)
},onLeave:function(f,h,e){if(!f){TS.error("failed to leave channel");
return
}var g=TS.channels.getChannelById(e.channel);
if(!g){TS.error('wtf no channel "'+e.channel+'"');
return
}g.msgs.length=0;
TS.storage.storeMsgs(g.id,null)
},setTopic:function(f,e){TS.api.call("channels.setTopic",{channel:f,topic:e},TS.channels.onSetTopic)
},onSetTopic:function(f,g,e){if(!f){TS.error("failed to set channel topic");
return
}},setPurpose:function(f,e){TS.api.call("channels.setPurpose",{channel:f,purpose:e},TS.channels.onSetPurpose)
},onSetPurpose:function(f,g,e){if(!f){TS.error("failed to set channel purpose");
return
}},getChannelById:function(h){var e=TS.model.channels;
var g=d[h];
if(g){return g
}if(!e){return null
}for(var f=0;
f<e.length;
f++){g=e[f];
if(g.id==h){TS.warn(h+" not in _id_map?");
d[h]=g;
return g
}}return null
},getFirstChannelYouAreIn:function(){var e=TS.model.channels;
var g;
if(!e){return null
}for(var f=0;
f<e.length;
f++){g=e[f];
if(g.is_member){return g
}}return null
},getGeneralChannel:function(){var e=TS.model.channels;
var g;
for(var f=0;
f<e.length;
f++){g=e[f];
if(g.is_general){return g
}}},getChannelByName:function(f){f=TS.utility.getLowerCaseValue(f);
var e=TS.model.channels;
var h=c[f];
if(h){return h
}if(!e){return null
}for(var g=0;
g<e.length;
g++){h=e[g];
if(h._name_lc==f||"#"+h._name_lc==f){TS.warn(f+" not in _name_map?");
c["#"+f]=h;
c[f]=h;
return h
}}return null
},upsertChannel:function(m){var e=TS.model.channels;
var j=TS.channels.getChannelById(m.id);
var h;
if(TS.boot_data.feature_no_unread_counts){delete m.unread_count
}if(j){TS.log(4,'updating existing channel "'+m.id+'"');
for(var g in m){if(g=="members"){h=m.members;
j.members.length=0;
for(var l=0;
l<h.length;
l++){j.members.push(h[l])
}}else{if(g==="pinned_items"){if(TS.client){TS.pins.upsertPinnedItems(m.pinned_items);
j.pinned_items=m.pinned_items
}}else{j[g]=m[g]
}}}m=j;
if(TS.client&&m.is_member){TS.shared.checkInitialMsgHistory(m,TS.channels)
}}else{TS.log(4,'adding channel "'+m.id+'"');
e.push(m);
if(m.is_channel!==true){TS.warn(m.name+" lacked the is_channel flag from the server");
m.is_channel=true
}m.is_general=!!m.is_general;
m._name_lc=TS.utility.getLowerCaseValue(m.name);
m._show_in_list_even_though_no_unreads=false;
d[m.id]=m;
c[m._name_lc]=m;
c["#"+m._name_lc]=m;
if(!m.members){m.members=[]
}if(!m.topic){m.topic={}
}if(!m.purpose){m.purpose={}
}if(!TS.boot_data.feature_no_unread_counts){if(!m.unread_count){m.unread_count=0
}}m.active_members=[];
m.is_member=!!m.is_member;
m.oldest_msg_ts=TS.storage.fetchOldestTs(m.id);
m.last_msg_input=TS.storage.fetchLastMsgInput(m.id);
m.scroll_top=-1;
m.history_is_being_fetched=false;
m.needs_api_marking=false;
m.unread_highlight_cnt=0;
m.unread_highlights=[];
m.unread_cnt=0;
m.unreads=[];
m.oldest_unread_ts=null;
m.has_fetched_history_after_scrollback=false;
if(m.pinned_items&&TS.client){TS.pins.upsertPinnedItems(m.pinned_items)
}if(TS.client){var f=(m.is_member)?TS.utility.msgs.fetchInitialMsgsFromLS(m):[];
TS.utility.msgs.setMsgs(m,f)
}else{if(TS.boot_data.msgs){TS.utility.msgs.ingestMessagesFromBootData(m)
}}if(TS.model.created_channels[m.name]){m.needs_created_message=true;
delete TS.model.created_channels[m.name]
}}if(m.is_member&&m.is_archived){TS.error("channel.is_member and channel.is_archived are both true for "+m.id+" #"+m.name);
TS.dir(0,m);
m.is_member=false
}if(TS.client){var n=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.channels.calcUnreadCnts(m,n)
}TS.channels.calcActiveMembersForChannel(m);
return m
},removeChannel:function(g){var e=TS.model.channels;
TS.log(4,'removing channel "'+g.id+'"');
var h;
for(var f=0;
f<e.length;
f++){h=e[f];
if(h.id==g.id){e.splice(f,1);
break
}}delete d[g.id];
delete c[g._name_lc];
delete c["#"+g._name_lc];
if(TS.client){if(TS.model.active_channel_id==g.id){TS.client.activeChannelDisplayGoneAway()
}}g.msgs.length=0;
TS.storage.storeMsgs(g.id,null);
TS.channels.deleted_sig.dispatch(g)
},channelRenamed:function(g){var e=TS.channels.getChannelById(g.id);
delete c[e._name_lc];
delete c["#"+e._name_lc];
var f=TS.channels.upsertChannel(g);
f._name_lc=TS.utility.getLowerCaseValue(f.name);
c[f._name_lc]=f;
c["#"+f._name_lc]=f;
TS.channels.renamed_sig.dispatch(f)
},markScrollTop:function(g,e){var f=TS.channels.getChannelById(g);
if(!f){return false
}if(f.scroll_top==e){return false
}f.scroll_top=e;
return true
},maybeLoadScrollBackHistory:function(g,f){var e=TS.channels.getChannelById(g);
if(!e){return false
}return TS.shared.maybeLoadScrollBackHistory(e,TS.channels,f)
},maybeLoadHistory:function(f){var e=TS.channels.getChannelById(f);
if(!e){return false
}return TS.shared.maybeLoadHistory(e,TS.channels)
},onHistory:function(f,h,e){var g=TS.channels.getChannelById(e.channel);
if(!g){TS.error('wtf no channel "'+e.channel+'"');
return
}var j="start_channel_history_fetch_"+g.id;
if(TS.timing.getLatestMark(j)){TS.timing.measure("channel_history_fetch",j);
TS.timing.clearMarks(j)
}if(!f||!h||!h.messages){TS.error("failed to get history");
(g.history_fetch_retries)?g.history_fetch_retries++:g.history_fetch_retries=1;
TS.channels.history_fetched_sig.dispatch(g);
return
}delete g.history_fetch_retries;
var k=TS.shared.onHistory(g,h,e,TS.channels);
if(!k){g.history_is_being_fetched=false;
TS.channels.history_fetched_sig.dispatch(g)
}var i=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.channels.calcUnreadCnts(g,i)
},fetchHistory:function(g,e,f){if(!g){TS.error('wtf no channel "'+g+'"');
return
}g.history_is_being_fetched=true;
g.history_fetch_failed=false;
TS.channels.history_being_fetched_sig.dispatch(g);
if(g.history_fetch_retries>5){delete g.history_fetch_retries;
g.history_is_being_fetched=false;
g.history_fetch_failed=true;
if(TS.client){TS.client.msg_pane.updateEndMarker()
}return
}TS.api.call("channels.history",e,f||TS.channels.onHistory)
},topicChanged:function(h,e,g,f){if(!h.topic){h.topic={}
}h.topic.creator=e;
h.topic.last_set=g;
h.topic.value=f;
TS.channels.topic_changed_sig.dispatch(h,e,f)
},purposeChanged:function(h,e,g,f){if(!h.purpose){h.purpose={}
}h.purpose.creator=e;
h.purpose.last_set=g;
h.purpose.value=f;
TS.channels.purpose_changed_sig.dispatch(h,e,f)
},closeArchivedChannel:function(e){TS.shared.closeArchivedChannel(e)
},makeMembersWithPreselectsForTemplate:function(e,f){f=f||[];
var g=[];
for(var h=0;
h<e.length;
h++){var k=e[h];
var j=f.indexOf(k.id)!=-1;
g[h]={member:k,preselected:j}
}return g
},getActiveMembersNotInThisChannelForInviting:function(l,h){var g=[];
var j=h||TS.model.user.is_admin;
if(TS.model.user.is_ultra_restricted){return g
}var i=TS.channels.getChannelById(l);
if(!i){return g
}var k;
var f=TS.members.getActiveMembersWithSelfAndNotSlackbot();
for(var e=0;
e<f.length;
e++){k=f[e];
if(k.is_ultra_restricted){continue
}if(!j&&k.is_restricted){continue
}if(i.members.indexOf(k.id)==-1){g.push(k)
}}return g
},calcActiveMembersForChannel:function(f){f.active_members.length=0;
if(!f.members){return
}var g;
for(var e=0;
e<f.members.length;
e++){g=TS.members.getMemberById(f.members[e]);
if(!g){continue
}if(g.deleted){continue
}f.active_members.push(g.id)
}},calcActiveMembersForAllChannels:function(){var e=TS.model.channels;
for(var f=0;
f<e.length;
f++){TS.channels.calcActiveMembersForChannel(e[f])
}},fetchList:function(){TS.api.call("channels.list",{},TS.channels.onListFetched)
},onListFetched:function(f,g,e){if(!f){TS.error("failed to fetch channel list");
return
}$.each(g.channels,function(h,j){TS.channels.upsertChannel(j)
});
TS.channels.list_fetched_sig.dispatch(g.channels)
},kickMember:function(i,e){if(!TS.members.canUserKickFromChannels()){return
}var f=TS.channels.getChannelById(i);
if(!f){return
}var h=TS.members.getMemberById(e);
if(!h){return
}if(f.members.indexOf(h.id)==-1){TS.generic_dialog.alert("<b>"+TS.members.getMemberDisplayName(h,true)+"</b> is not a member of #"+f.name+".");
return
}var g=TS.members.getMemberDisplayName(h,true);
TS.generic_dialog.start({title:"Remove "+g,body:"<p>Are you sure you wish to remove <b>"+g+"</b> from #"+f.name+"?</p>",go_button_text:"Yes, remove them",on_go:function(){TS.api.call("channels.kick",{channel:i,user:e},function(k,l,j){if(!k){var m='Kicking failed with error "'+l.error+'"';
if(l.error=="cant_kick_from_last_channel"){m="<b>"+g+"</b> can't be kicked from #"+f.name+" because they must belong to at least one "+TS.templates.builders.channelOrGroupCopy()+"."
}else{if(l.error=="restricted_action"){m="<p>You don't have permission to kick from channels.</p><p>Talk to your team owner.</p>"
}}setTimeout(TS.generic_dialog.alert,500,m)
}})
}})
},getChannelsForUser:function(){if(!TS.model.user.is_restricted){return TS.model.channels
}b.length=0;
var f;
for(var e=0;
e<TS.model.channels.length;
e++){f=TS.model.channels[e];
if(!f.is_member){continue
}b.push(f)
}return b
},getUnarchivedChannelsForUser:function(){a.length=0;
var e=TS.channels.getChannelsForUser();
var g;
for(var f=0;
f<e.length;
f++){g=e[f];
if(g.is_archived){continue
}a.push(g)
}return a
},setDataRetention:function(e,f,i,h){var g={channel:e,retention_type:$("select[name=retention_type]").val()};
if(g.retention_type==1){g.retention_duration=$("#retention_duration").val()
}TS.api.call("channels.setRetention",g,function(k,l,j){if(h){h(k,l,j)
}if(k){TS.channels.data_retention_changed_sig.dispatch(j)
}})
},getDataRetention:function(e,f){TS.api.call("channels.getRetention",{channel:e},f)
}});
var b=[];
var a=[];
var d={};
var c={}
})();
(function(){TS.registerModule("channels.ui",{onStart:function(){},showDataRetentionDialog:function(o,u,h,m){var j=!h;
var n,r,s,p;
n=TS.channels.getChannelById(o);
if(!n){r=TS.ims.getImById(o)
}if(!n&&!r&&TS.boot_data.feature_mpim_client){p=TS.mpims.getMpimById(o)
}if(!n&&!r&&!p){s=TS.groups.getGroupById(o)
}if(!r&&!n&&!s&&!p){TS.error("unknown channel_id passed to data retention dialog:"+o);
return
}var q,i;
if(n){i="channel";
q="#"+TS.utility.htmlEntities(n.name)
}else{if(r||p){i="conversation";
q="this conversation"
}else{if(TS.boot_data.feature_private_channels){i="channel"
}else{i="group"
}q=TS.utility.htmlEntities(s.name)
}}var k=TS.model.team.prefs.retention_type;
var l=TS.model.team.prefs.retention_duration;
if(s||p){k=TS.model.team.prefs.group_retention_type;
l=TS.model.team.prefs.group_retention_duration
}else{if(r){k=TS.model.team.prefs.dm_retention_type;
l=TS.model.team.prefs.dm_retention_duration
}}var t=f();
if(!j){t=TS.templates.channel_data_retention_dialog({model_type:i,retention_type:h,retention_duration:m,team_type:k,team_duration:l})
}TS.generic_dialog.start({title:"Edit retention policy for "+q,body:t,go_button_text:"Save settings",enter_always_gos:true,on_go:function(){var v=$("select[name=retention_type]").val();
var w=$("#retention_duration").val();
if(v===null){return
}if(w===null){return
}if(n){TS.channels.setDataRetention(o,v,w,u)
}else{if(r){TS.ims.setDataRetention(o,v,w,u)
}else{TS.groups.setDataRetention(o,v,w,u)
}}},on_show:j?null:a});
if(j){if(n){TS.channels.getDataRetention(o,e)
}else{if(r){TS.ims.getDataRetention(o,c)
}else{TS.groups.getDataRetention(o,g)
}}}},showArchiveChannelDialog:function(h){TS.generic_dialog.start({title:"Archive #"+h.name,body:"<p>Archiving a channel is useful to clean things up when you do not anticipate using the channel any more. If you archive this channel:</p> 			<ul> 				<li>No one will be able to send messages to it anymore</li> 				<li>It will be closed for anyone who has it open and all members will be removed</li> 				<li>You will be able to view past conversations in the Archives on the site</li> 				<li>You will be able to search for archived messages from this channel</li> 				<li>You will always be able to un-archive it later</li> 			</ul> 			<p>Are you sure you want to archive <b>#"+h.name+"</b>?</p>",go_button_text:"Yes, archive the channel",on_go:function(){TS.api.call("channels.archive",{channel:h.id},function(j,k,i){if(j){if(TS.web){$("p.alert").addClass("hidden");
$("#archive_success").removeClass("hidden");
$("#archive_btn").addClass("hidden");
$("#unarchive_btn").removeClass("hidden")
}return
}var l='Archiving failed with error "'+k.error+'"';
if(k.error=="last_ra_channel"){if(TS.model.user.is_admin){l="Sorry, you can't archive this channel because it is the only "+TS.templates.builders.channelOrGroupCopy()+" one of the guest account members belongs to. If you first disable the guest account, you will then be able to archive the channel."
}else{l="Sorry, you can't archive this channel because it is the only "+TS.templates.builders.channelOrGroupCopy()+" one of the guest account members belongs to."
}}else{if(k.error=="restricted_action"){l="<p>You don't have permission to archive channels.</p><p>Talk to your team owner.</p>"
}else{if(k.error=="already_archived"){l="This channel was already archived."
}else{if(k.error=="cant_archive_general"){l="This channel cannot be archived."
}}}}setTimeout(TS.generic_dialog.alert,500,l)
})
}})
},showArchiveGroupDialog:function(h,k){var l=k?"Leave and archive "+TS.model.group_prefix+h.name:"Archive "+TS.model.group_prefix+h.name;
var i=TS.templates.builders.groupCopy({skip_private:true});
var j=k?"Yes, leave & archive the "+i:"Yes, archive the "+i;
TS.generic_dialog.start({title:l,body:"<p>If you archive this "+i+", no one will be able to send any messages in it and it will be closed for anyone who currently has it open. You will still be able to view the archives on the site and you will still be able to search for messages from this "+i+".</p><p>Are you sure you want to archive <b>"+TS.model.group_prefix+h.name+"</b>?</p>",go_button_text:j,on_go:function(){TS.api.call("groups.archive",{channel:h.id},function(n,o,m){if(n){if(k&&TS.client){if(TS.boot_data.feature_private_channels){TS.shared.closeArchivedChannel(h.id)
}else{TS.groups.closeGroup(h.id)
}}if(TS.web){$("p.alert").addClass("hidden");
$("#archive_success").removeClass("hidden");
$("#archive_btn").addClass("hidden");
$("#unarchive_btn").removeClass("hidden")
}return
}var p='Archiving failed with error "'+o.error+'"';
if(o.error=="last_ra_channel"){if(TS.model.user.is_admin){p="Sorry, you can't archive this "+i+" because it is the only "+TS.templates.builders.channelOrGroupCopy()+" one of the guest account members belongs to. If you first disable the guest account, you will then be able to archive the "+i+"."
}else{p="Sorry, you can't archive this "+i+" because it is the only "+TS.templates.builders.channelOrGroupCopy()+" one of the guest account members belongs to."
}}else{if(o.error=="already_archived"){p="This "+i+" was already archived."
}}setTimeout(TS.generic_dialog.alert,500,p)
})
}})
},channelCreateDialogShowNameTakenAlert:function(h){h.find(".modal_input_note").addClass("hidden");
h.find(".name_taken_warning").removeClass("hidden");
$("#channel_create_title").select()
},channelCreateDialogShowDisallowedCharsAlert:function(h){h.find(".modal_input_note").addClass("hidden");
h.find(".invalid_chars_warning").removeClass("hidden");
$("#channel_create_title").select()
},channelCreateDialogShowSinglePunctuationAlert:function(h){h.find(".modal_input_note").addClass("hidden");
h.find(".single_punctuation_warning").removeClass("hidden");
$("#channel_create_title").select()
},channelCreateDialogValidateInput:function(j){var h=j.find(".title_input").val();
var i=TS.utility.cleanChannelName(h);
while(h.substr(0,1)=="#"){h=h.substr(1)
}if(i!=h){j.find(".title_input").val(i);
TS.channels.ui.channelCreateDialogShowDisallowedCharsAlert(j);
return false
}if(i==="_"||i==="-"){TS.channels.ui.channelCreateDialogShowSinglePunctuationAlert(j);
return false
}if(!h){$("#channel_create_title").select();
return false
}if(TS.channels.getChannelByName(h)||TS.groups.getGroupByName(h)||TS.members.getMemberByName(h)){TS.channels.ui.channelCreateDialogShowNameTakenAlert(j);
return false
}return true
}});
var e=function(i,k,h){if(i){var j=k.retention.retention_type;
var l=k.retention.retention_duration;
d("channel",j,l)
}else{b("channel",k)
}};
var g=function(i,k,h){if(i){var j=k.retention.retention_type;
var l=k.retention.retention_duration;
d("group",j,l)
}else{b("group",k)
}};
var c=function(i,k,h){if(i){var j=k.retention.retention_type;
var l=k.retention.retention_duration;
d("conversation",j,l)
}else{b("conversation",k)
}};
var d=function(i,j,m){var k=$("#generic_dialog .loading_hash_animation");
var l=TS.model.team.prefs.retention_type;
var h=TS.model.team.prefs.retention_duration;
if(i==="group"){l=TS.model.team.prefs.group_retention_type;
h=TS.model.team.prefs.group_retention_duration
}else{if(i==="conversation"){l=TS.model.team.prefs.dm_retention_type;
h=TS.model.team.prefs.dm_retention_duration
}}if(TS.boot_data.feature_private_channels&&i==="group"){i="channel"
}k.replaceWith(TS.templates.channel_data_retention_dialog({model_type:i,retention_type:j,retention_duration:m,team_type:l,team_duration:h}));
a()
};
var b=function(h,j){var i=$("#generic_dialog .loading_hash_animation");
if(j.error==="no_perms"||j.error==="is_archived"||j.error==="not_paid"){if(TS.boot_data.feature_private_channels&&h==="group"){h="channel"
}i.replaceWith('<p class="no_bottom_margin">Sorry! You can\'t change the retention duration for this '+h+".</p>")
}else{i.replaceWith('<p class="no_bottom_margin">Oops! Something went wrong. Please try again.</p>')
}};
var a=function(){$("select[name=retention_type]").change(function(){if(this.value!=1){$("#team_retention_pref").removeClass("hidden");
$("#retention_duration_container, #retention_duration_warning").addClass("hidden")
}else{$("#team_retention_pref").addClass("hidden");
$("#retention_duration_container, #retention_duration_warning").removeClass("hidden");
if($("#retention_duration").val()===0){$("#retention_duration").val("")
}$("#retention_duration").focus()
}}).change()
};
var f=function(){var h=cdn_url+"/f85a/img/loading_hash_animation_@2x.gif";
return'<div class="loading_hash_animation" style="margin: 2rem;"><img src="'+h+'" alt="Loading" /><br />loading...</div>'
}
})();
TS.registerModule("constants",{onStart:$.noop,avatar_size_map:{"20":{standard:"image_24",retina:"image_48"},"24":{standard:"image_24",retina:"image_48"},"32":{standard:"image_32",retina:"image_72"},"36":{standard:"image_48",retina:"image_72"},"48":{standard:"image_48",retina:"image_72"},"64":{standard:"image_64",retina:"image_64"},"72":{standard:"image_72",retina:"image_192"},"192":{standard:"image_192",retina:"image_192"}},restricted_overlay:{standard:cdn_url+"/54f6/img/avatar_overlays.png",retina:cdn_url+"/66f9/img/avatar_overlays_@2x.png"},messages_subtypes:{bot_add:{template:"messages_subtypes_bot_add"},bot_disable:{template:"messages_subtypes_bot_disable"},bot_enable:{template:"messages_subtypes_bot_enable"},bot_remove:{template:"messages_subtypes_bot_remove"}}});
(function(){TS.registerModule("groups",{switched_sig:new signals.Signal(),pre_switched_sig:new signals.Signal(),joined_sig:new signals.Signal(),member_joined_sig:new signals.Signal(),left_sig:new signals.Signal(),member_left_sig:new signals.Signal(),history_fetched_sig:new signals.Signal(),history_being_fetched_sig:new signals.Signal(),message_received_sig:new signals.Signal(),message_removed_sig:new signals.Signal(),message_changed_sig:new signals.Signal(),marked_sig:new signals.Signal(),unread_changed_sig:new signals.Signal(),unread_highlight_changed_sig:new signals.Signal(),topic_changed_sig:new signals.Signal(),purpose_changed_sig:new signals.Signal(),deleted_sig:new signals.Signal(),renamed_sig:new signals.Signal(),opened_sig:new signals.Signal(),closed_sig:new signals.Signal(),archived_sig:new signals.Signal(),unarchived_sig:new signals.Signal(),msg_not_sent_sig:new signals.Signal(),data_retention_changed_sig:new signals.Signal(),onStart:function(){},addMsg:function(j,i){var h=TS.groups.getGroupById(j);
if(!h){TS.error('unknown group "'+j+'"');
return
}var f=h.msgs;
if(!TS.utility.msgs.validateMsg(j,i,f)){return
}TS.utility.msgs.appendMsg(f,i);
TS.utility.msgs.maybeStoreMsgs(h.id,f);
TS.utility.msgs.maybeSetOldestMsgsTsAfterMsgAdded(h);
var g=!TS.utility.msgs.isTempMsg(i);
TS.groups.calcUnreadCnts(h,g);
TS.utility.msgs.maybeTruncateMsgs(h);
TS.groups.message_received_sig.dispatch(h,i);
if(!h.is_open){TS.api.call("groups.open",{channel:h.id},TS.groups.onOpened)
}},calcUnreadCnts:function(g,f){TS.shared.calcUnreadCnts(g,TS.groups,f)
},removeMsg:function(i,h){var g=TS.groups.getGroupById(i);
if(!g){TS.error('unknown group "'+i+'"');
return
}if(g._archive_msgs){TS.utility.msgs.spliceMsg(g._archive_msgs,h)
}var f=g.msgs;
TS.utility.msgs.spliceMsg(f,h);
TS.groups.message_removed_sig.dispatch(g,h);
TS.utility.msgs.maybeStoreMsgs(g.id,f);
TS.groups.calcUnreadCnts(g,true)
},changeMsgText:function(i,h,f){var g=TS.groups.getGroupById(i);
if(!g){TS.error('unknown group "'+i+'"');
return
}h.text=f;
TS.groups.message_changed_sig.dispatch(g,h);
TS.utility.msgs.maybeStoreMsgs(g.id,g.msgs)
},sendMsg:function(n,o){var m=TS.groups.getGroupById(n);
if(!m){return false
}if(m.is_archived){return false
}var f=TS.channels.getGeneralChannel();
var l=function(p){TS.generic_dialog.alert(p);
TS.client.ui.$msg_input.val(o);
TS.view.focusMessageInput()
};
var g=TS.format.cleanMsg(o);
var i;
if(TS.model.everyone_regex.test(g)){if(!TS.members.canUserAtEveryone()){i="<p>A team owner has restricted the use of <b>@everyone</b> messages.</p>";
if(TS.model.user.is_restricted){i="<p>Your account is restricted, and you cannot send <b>@everyone</b> messages.</p>"
}if(TS.members.canUserAtChannelOrAtGroup()){i+='<p class="no_bottom_margin">If you just want to address everyone in this '+TS.templates.builders.groupCopy({skip_private:true})+", use <b>@"+TS.templates.builders.groupCopy({skip_private:true})+"</b> instead.</p>"
}l(i);
return false
}if(!f||!f.is_member){i="<p>You cannot send <b>@everyone</b> messages.</p>";
if(TS.members.canUserAtChannelOrAtGroup()){i+='<p class="no_bottom_margin">If you just want to address everyone in this '+TS.templates.builders.groupCopy({skip_private:true})+", use <b>@"+TS.templates.builders.groupCopy({skip_private:true})+"</b> instead.</p>"
}l(i)
}else{TS.generic_dialog.start({title:"Send @everyone a message",body:'<p class="bold">Would you like to switch to #'+f.name+' and send your message?</p><p class="">Using <b>@everyone</b> in a message is a way to address your whole team, but it must be done in the #'+f.name+' channel.</p><p class="no_bottom_margin">If you just want to address everyone in this '+TS.templates.builders.groupCopy({skip_private:true})+", use <b>@"+TS.templates.builders.groupCopy({skip_private:true})+"</b> instead.</p>",show_cancel_button:true,show_go_button:true,go_button_text:"Yes, send it",on_go:function(){TS.channels.displayChannel(f.id,o)
},on_cancel:function(){TS.client.ui.$msg_input.val(o);
TS.view.focusMessageInput()
}})
}return false
}var k=TS.model.here_regex.test(g);
var h=(TS.model.channel_regex.test(g)||TS.model.group_regex.test(g))||k;
if(h&&!TS.members.canUserAtChannelOrAtGroup()){var j=k?"@here":"@"+TS.templates.builders.groupCopy({skip_private:true});
i="<p>A team owner has restricted the use of <b>"+j+"</b> messages.</p>";
l(i);
return false
}if(TS.ui.needToShowAtChannelWarning(n,o)){TS.ui.at_channel_warning_dialog.startInMessagePane(n,o,TS.groups);
return false
}return TS.shared.sendMsg(n,o,TS.groups)
},onSendMsg:function(h,f){var g=TS.groups.getGroupById(f.SENT_MSG.channel);
if(!g){TS.error("unknown group? "+f.SENT_MSG.channel);
return
}TS.shared.onSendMsg(h,f,g,TS.groups)
},closeGroup:function(g){var f=TS.groups.getGroupById(g);
if(!f){return
}TS.api.call("groups.close",{channel:g},TS.groups.onClosed)
},onClosed:function(g,h,f){if(!g){return
}if(h.no_op){var i=TS.groups.getGroupById(f.channel);
if(i){i.is_open=false;
if(i.is_archived){i.was_archived_this_session=false
}if(TS.model.active_group_id==i.id){if(TS.client){TS.client.activeChannelDisplayGoneAway()
}}TS.groups.closed_sig.dispatch(i)
}}},onOpened:function(f,g){if(!f){return
}},displayGroup:function(i,g,j,h){TS.timing.mark("start_channel_change_"+i);
j=!!j;
h=!!h;
var k=TS.groups.getGroupById(i);
if(!k){TS.error('group "'+i+'" unknown');
return
}TS.info("displayGroup "+k.name+" from_history:"+j+" replace_history_state:"+h);
if(i==TS.model.active_group_id&&!h){TS.warn('group "'+i+'" already displayed');
if(g){TS.groups.sendMsg(i,$.trim(g))
}return
}var f=(h)?false:j;
if(TS.client.channelDisplaySwitched(i,h,f)){TS.groups.pre_switched_sig.dispatch();
TS.groups.switched_sig.dispatch()
}if(k.is_open){if(g){TS.groups.sendMsg(i,$.trim(g))
}return
}TS.model.requested_group_opens[i]={and_send_txt:g};
TS.api.call("groups.open",{channel:k.id},TS.groups.onOpened)
},setLastRead:function(h,f){if(h.last_read==f){return false
}if(f.indexOf(TS.utility.date.fake_ts_unique_padder)>-1){TS.error("bad ts:"+f);
return false
}if(h.last_read>f){var g=TS.model.last_reads_set_by_client[h.id+"_"+f];
delete TS.model.last_reads_set_by_client[h.id+"_"+f];
if(g){TS.warn("NOT going back in time group.last_read:"+h.last_read+" new:"+f);
return
}TS.info("going back in time group.last_read:"+h.last_read+" new:"+f)
}h.last_read=f;
TS.groups.marked_sig.dispatch(h);
TS.groups.calcUnreadCnts(h);
return true
},markMostRecentReadMsg:function(g,f){if(!g){TS.error("group unknown");
return
}if(!g.msgs||!g.msgs.length){return
}var h=TS.utility.msgs.getMostRecentValidTs(g.msgs);
if(!h){TS.warn("no valid tses???");
return
}g.all_read_this_session_once=true;
TS.groups.markReadMsg(g.id,h,f)
},markReadMsg:function(g,f,i){var h=TS.groups.getGroupById(g);
if(!h){TS.error('group "'+g+'" unknown');
return
}if(h.last_read==f){return
}if(TS.groups.setLastRead(h,f)){h._marked_reason=i;
h.needs_api_marking=true
}},onMarked:function(g,h,f){var i=TS.groups.getGroupById(f.channel);
if(!i){TS.error('wtf no group "'+f.channel+'"');
return
}if(g||(h&&h.error=="is_archived")){}else{i.needs_api_marking=true
}},create:function(g,f,i){if(!g){return
}TS.model.created_groups[g]=true;
var h=(f)?f.join(","):"";
TS.api.call("groups.create",{name:g,and_invite_members_ids:h},function(k,l,j){TS.groups.onCreate(k,l,j);
if(i){i(k,l,j)
}})
},createChild:function(g,f,j){var i=TS.groups.getGroupById(g);
if(!i){return
}TS.model.archives_and_recreated_groups[g]=true;
var h=(f)?f.join(","):"";
TS.api.call("groups.createChild",{channel:g,and_invite_members_ids:h},function(l,m,k){TS.groups.onCreate(l,m,k);
if(j){j(l,m,k)
}})
},onCreate:function(h,k,f){if(!h){if(k.error=="name_taken"){}else{if(k.error=="restricted_action"){}else{TS.error("failed to create group");
alert("failed to create group")
}}return
}var m;
var j;
if(k.group){m=TS.groups.upsertGroup(k.group);
j=k.group.id
}if(!j){TS.error("no group_id?!!");
return
}if(!m){TS.error("no group?!!");
return
}var l=f.and_invite_members_ids?f.and_invite_members_ids.split(","):null;
if(l){for(var g=0;
g<l.length;
g++){TS.api.call("groups.invite",{channel:j,user:l[g]})
}}TS.groups.displayGroup(j)
},getLeaveAction:function(f){if(TS.model.user.is_ultra_restricted){return""
}if(!TS.groups.canLeaveGroup(f)){return""
}var g=TS.groups.getGroupById(f);
if(g.is_archived){return"close"
}else{if(g.active_members.length===1){return"leave_and_archive"
}else{return"leave"
}}},leave:function(h){var g=TS.groups.getGroupById(h);
if(!g){TS.error("WTF no group:"+h);
return
}var f=TS.groups.getLeaveAction(h);
if(f==="close"){if(TS.boot_data.feature_private_channels){TS.shared.closeArchivedChannel(h)
}else{TS.groups.closeGroup(h)
}}else{if(f==="leave_and_archive"){TS.channels.ui.showArchiveGroupDialog(g,true)
}else{if(f==="leave"){TS.generic_dialog.start({title:"Leave "+TS.model.group_prefix+g.name,body:"<p>If you leave the "+TS.templates.builders.groupCopy()+", you will no longer be able to see any of its messages. To rejoin the "+TS.templates.builders.groupCopy()+", you will have to be re-invited.</p><p>Are you sure you wish to leave?</p>",go_button_text:"Yes, leave the "+TS.templates.builders.groupCopy(),on_go:function(){TS.api.call("groups.leave",{channel:h},TS.groups.onLeave)
}})
}else{TS.generic_dialog.alert("Sorry, you can't leave <b>"+TS.model.group_prefix+g.name+"</b>!")
}}}},onLeave:function(g,h,f){if(!g){if(h&&h.error=="last_member"){if(TS.boot_data.feature_private_channels){TS.shared.closeArchivedChannel(f.channel)
}else{TS.groups.closeGroup(f.channel)
}return
}TS.error("failed to leave group");
return
}var i=TS.groups.getGroupById(f.channel);
if(!i){TS.error('wtf no group "'+f.channel+'"');
return
}i.msgs.length=0;
TS.storage.storeMsgs(i.id,null)
},setTopic:function(g,f){TS.api.call("groups.setTopic",{channel:g,topic:f},TS.groups.onSetTopic)
},onSetTopic:function(g,h,f){if(!g){TS.error("failed to set group topic");
return
}},setPurpose:function(g,f){TS.api.call("groups.setPurpose",{channel:g,purpose:f},TS.groups.onSetPurpose)
},onSetPurpose:function(g,h,f){if(!g){TS.error("failed to set group purpose");
return
}},getGroupById:function(j){var f=TS.model.groups;
var h=c[j];
if(h){return h
}if(!f){return null
}for(var g=0;
g<f.length;
g++){h=f[g];
if(h.id==j){TS.warn(j+" not in _id_map?");
c[j]=h;
return h
}}return null
},getGroupByName:function(g){g=TS.utility.getLowerCaseValue(g);
var f=TS.model.groups;
var j=b[g];
if(j){return j
}if(!f){return null
}for(var h=0;
h<f.length;
h++){j=f[h];
if(j._name_lc==g||TS.model.group_prefix+j._name_lc==g){TS.warn(g+" not in _name_map?");
b[g]=j;
b[TS.model.group_prefix+g]=j;
return j
}}return null
},upsertGroup:function(o){var f=TS.model.groups;
var l=TS.groups.getGroupById(o.id);
var j;
if(TS.boot_data.feature_no_unread_counts){delete o.unread_count
}if(l){TS.log(4,'updating existing group "'+o.id+'"');
for(var h in o){if(h=="members"){j=o.members;
l.members.length=0;
for(var m=0;
m<j.length;
m++){l.members.push(j[m])
}}else{if(h==="pinned_items"){if(TS.client){TS.pins.upsertPinnedItems(o.pinned_items);
l.pinned_items=o.pinned_items
}}else{l[h]=o[h]
}}}o=l;
if(TS.client&&((TS.boot_data.feature_private_channels||o.is_open)||o.unread_cnt)){TS.shared.checkInitialMsgHistory(o,TS.groups)
}}else{TS.log(4,'adding group "'+o.id+'"');
f.push(o);
if(o.is_group!==true){TS.warn(o.name+" lacked the is_group flag from the server");
o.is_group=true
}o._name_lc=TS.utility.getLowerCaseValue(o.name);
o._show_in_list_even_though_no_unreads=false;
c[o.id]=o;
b[o._name_lc]=o;
b[TS.model.group_prefix+o._name_lc]=o;
o.active_members=[];
o.oldest_msg_ts=TS.storage.fetchOldestTs(o.id);
o.last_msg_input=TS.storage.fetchLastMsgInput(o.id);
o.scroll_top=-1;
o.history_is_being_fetched=false;
o.needs_api_marking=false;
o.unread_highlight_cnt=0;
o.unread_highlights=[];
o.unread_cnt=0;
o.unreads=[];
o.oldest_unread_ts=null;
o.has_fetched_history_after_scrollback=false;
if(o.pinned_items&&TS.client){TS.pins.upsertPinnedItems(o.pinned_items)
}if(TS.client){var g=TS.utility.msgs.fetchInitialMsgsFromLS(o);
TS.utility.msgs.setMsgs(o,g)
}else{if(TS.boot_data.msgs){TS.utility.msgs.ingestMessagesFromBootData(o)
}}if(TS.model.created_groups[o.name]){delete TS.model.created_groups[o.name]
}}if(TS.client){var n=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.groups.calcUnreadCnts(o,n)
}TS.groups.calcActiveMembersForGroup(o);
return o
},removeGroup:function(h){var f=TS.model.groups;
TS.log(4,'removing group "'+h.id+'"');
var j;
for(var g=0;
g<f.length;
g++){j=f[g];
if(j.id==h.id){f.splice(g,1);
break
}}delete c[h.id];
delete b[h._name_lc];
delete b[TS.model.group_prefix+h._name_lc];
if(TS.client){if(TS.model.active_group_id==h.id){TS.client.activeChannelDisplayGoneAway()
}}h.msgs.length=0;
TS.storage.storeMsgs(h.id,null);
TS.groups.deleted_sig.dispatch(h)
},groupRenamed:function(h){var f=TS.groups.getGroupById(h.id);
delete b[f._name_lc];
delete b[TS.model.group_prefix+f._name_lc];
var g=TS.groups.upsertGroup(h);
g._name_lc=TS.utility.getLowerCaseValue(g.name);
b[g._name_lc]=g;
b[TS.model.group_prefix+g._name_lc]=g;
TS.view.updateTitleWithContext();
TS.groups.renamed_sig.dispatch(g)
},markScrollTop:function(h,f){var g=TS.groups.getGroupById(h);
if(!g){return false
}if(g.scroll_top==f){return false
}g.scroll_top=f;
return true
},maybeLoadScrollBackHistory:function(h,f){var g=TS.groups.getGroupById(h);
if(!g){return false
}return TS.shared.maybeLoadScrollBackHistory(g,TS.groups,f)
},maybeLoadHistory:function(g){var f=TS.groups.getGroupById(g);
if(!f){return false
}return TS.shared.maybeLoadHistory(f,TS.groups)
},onHistory:function(g,h,f){var j=TS.groups.getGroupById(f.channel);
if(!j){TS.error('wtf no group "'+f.channel+'"');
return
}if(!g||!h||!h.messages){TS.error("failed to get history");
(j.history_fetch_retries)?j.history_fetch_retries++:j.history_fetch_retries=1;
TS.groups.history_fetched_sig.dispatch(j);
return
}delete j.history_fetch_retries;
var k=TS.shared.onHistory(j,h,f,TS.groups);
if(!k){j.history_is_being_fetched=false;
TS.groups.history_fetched_sig.dispatch(j)
}var i=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.groups.calcUnreadCnts(j,i)
},fetchHistory:function(h,f,g){if(!h){TS.error('wtf no group "'+h+'"');
return
}h.history_is_being_fetched=true;
h.history_fetch_failed=false;
TS.groups.history_being_fetched_sig.dispatch(h);
if(h.history_fetch_retries>5){delete h.history_fetch_retries;
h.history_is_being_fetched=false;
h.history_fetch_failed=true;
if(TS.client){TS.client.msg_pane.updateEndMarker()
}return
}TS.api.call("groups.history",f,g||TS.groups.onHistory)
},topicChanged:function(i,f,h,g){if(!i.topic){i.topic={}
}i.topic.creator=f;
i.topic.last_set=h;
i.topic.value=g;
TS.groups.topic_changed_sig.dispatch(i,f,g)
},purposeChanged:function(i,f,h,g){if(!i.purpose){i.purpose={}
}i.purpose.creator=f;
i.purpose.last_set=h;
i.purpose.value=g;
TS.groups.purpose_changed_sig.dispatch(i,f,g)
},getUnarchivedClosedGroups:function(j){e.length=0;
var f=TS.model.groups;
var h;
for(var g=0;
g<f.length;
g++){h=f[g];
if(h.is_archived){continue
}if(h.is_open){continue
}e.push(h)
}return e
},getUnarchivedGroups:function(){a.length=0;
var f=TS.model.groups;
var h;
for(var g=0;
g<f.length;
g++){h=f[g];
if(h.is_archived){continue
}a.push(h)
}return a
},getActiveMembersNotInThisGroupForInviting:function(h,g){var f=TS.shared.getModelObById(h);
if(!f){return[]
}return d(g,f)
},getActiveMembersForInviting:function(f){return d(f)
},getGroupsWithTheseActiveMembers:function(n){var f=[];
var g=TS.model.groups;
var o;
var j=n.sort().join(",");
var p;
var k;
for(var l=0;
l<g.length;
l++){o=g[l];
o.members.sort();
p=[];
for(var h=0;
h<o.members.length;
h++){k=TS.members.getMemberById(o.members[h]);
if(!k){continue
}if(k.deleted){continue
}p.push(k.id)
}if(j==p.join(",")){f.push(o)
}}return f
},calcActiveMembersForGroup:function(g){g.active_members.length=0;
if(!g.members){return
}var h;
for(var f=0;
f<g.members.length;
f++){h=TS.members.getMemberById(g.members[f]);
if(!h){continue
}if(h.deleted){continue
}g.active_members.push(h.id)
}},calcActiveMembersForAllGroups:function(){var f=TS.model.groups;
for(var g=0;
g<f.length;
g++){TS.groups.calcActiveMembersForGroup(f[g])
}},createSuggestedName:function(k){var f=TS.model.user.name;
var n=[];
var h;
var j;
var l=TS.model.channel_name_max_length;
for(j=0;
j<k.length;
j++){h=TS.members.getMemberById(k[j]);
if(!h){continue
}n.push(h)
}n.sort(function g(q,i){if(q.id==TS.ui.group_create_dialog.start_member_id){return -1
}if(i.id==TS.ui.group_create_dialog.start_member_id){return 1
}var r=q._name_lc;
var s=i._name_lc;
if(r<s){return -1
}if(r>s){return 1
}return 0
});
for(j=0;
j<n.length;
j++){h=n[j];
f+="-"+h.name.split("-")[0]
}if(f.length>l){f=f.substr(0,l);
if(f.charAt(f.length-1)=="-"){f=f.substr(0,l-1)
}}var o=f;
var p=1;
var m;
while(TS.channels.getChannelByName(f)||TS.groups.getGroupByName(f)||TS.members.getMemberByName(f)){m=(p+1).toString();
p++;
f=o+m;
if(f.length>l){f=o.substr(0,l-m.length)+m
}}return f
},kickMember:function(j,f){if(!TS.members.canUserKickFromGroups()){return
}var h=TS.groups.getGroupById(j);
if(!h){return
}var i=TS.members.getMemberById(f);
if(!i){return
}if(h.members.indexOf(i.id)==-1){TS.generic_dialog.alert("<b>"+TS.members.getMemberDisplayName(i,true)+"</b> is not a member of "+h.name+".");
return
}var g=TS.members.getMemberDisplayName(i,true);
TS.generic_dialog.start({title:"Remove "+g,body:"<p>If you remove <b>"+g+"</b> from "+h.name+", they will no longer be able to see any of its messages. To rejoin the "+TS.templates.builders.groupCopy()+", they will have to be re-invited.</p><p>Are you sure you wish to do this?</p>",go_button_text:"Yes, remove them",on_go:function(){TS.api.call("groups.kick",{channel:j,user:f},function(l,m,k){if(!l){var n='Kicking failed with error "'+m.error+'"';
if(m.error=="cant_kick_from_last_channel"){n="<b>"+g+"</b> can't be kicked from <b>"+h.name+"</b> because they must belong to at least one "+TS.templates.builders.channelOrGroupCopy()+"."
}else{if(m.error=="restricted_action"){n="<p>You don't have permission to kick from channels.</p><p>Talk to your team owner.</p>"
}}setTimeout(TS.generic_dialog.alert,500,n)
}})
}})
},canLeaveGroup:function(h){if(!TS.model.user.is_restricted){return true
}if(TS.model.user.is_ultra_restricted){return false
}if(TS.channels.getChannelsForUser().length){return true
}var f=TS.model.groups;
var j;
for(var g=0;
g<f.length;
g++){j=f[g];
if(j.is_archived){continue
}if(j.id==h){continue
}return true
}return false
},setDataRetention:function(j,f,i,h){var g={channel:j,retention_type:$("select[name=retention_type]").val()};
if(g.retention_type==1){g.retention_duration=$("#retention_duration").val()
}TS.api.call("groups.setRetention",g,function(l,m,k){if(h){h(l,m,k)
}if(l){TS.groups.data_retention_changed_sig.dispatch(k)
}})
},getDataRetention:function(g,f){TS.api.call("groups.getRetention",{channel:g},f)
}});
var c={};
var b={};
var e=[];
var a=[];
var d=function(h,j){var g=[];
if(TS.model.user.is_ultra_restricted&&!h){return g
}var i=TS.members.getMembersForUser();
var k;
for(var f=0;
f<i.length;
f++){k=i[f];
if(k.deleted){continue
}if(k.is_slackbot){continue
}if(k.is_self){continue
}if(k.is_ultra_restricted){continue
}if(!j||j.members.indexOf(k.id)==-1){g.push(k)
}}return g
}
})();
(function(){TS.registerModule("utility.box",{onStart:function(){},launchPopup:function(){if(!window.BoxSelect){return
}var e;
try{e=window.open;
window.open=function(h,g,l){var i,f,k,j;
i=String(l).match(/width\D+(\d+)/);
i=parseInt(i&&i[1]||590);
f=String(l).match(/height\D+(\d+)/);
f=parseInt(f&&f[1]||520);
k=(window.screenX||window.screenLeft)+((window.outerWidth||document.documentElement.offsetWidth)-i)/2;
j=(window.screenY||window.screenTop)+((window.outerHeight||document.documentElement.offsetHeight)-f)/2;
a=e(h,g,[l,"left="+k,"top="+j].join(","));
return a
};
d().launchPopup();
if(window.focus&&a){a.focus()
}}finally{window.open=e
}},closePopup:function(){window.BoxSelect&&d().closePopup()
},success:function(e){window.BoxSelect&&d().success(e)
},cancel:function(e){window.BoxSelect&&d().cancel(e)
},unregister:function(){window.BoxSelect&&d().unregister.apply(d(),arguments)
},isBrowserSupported:function(){return window.BoxSelect&&d().isBrowserSupported()
},test:function(){return{getBoxSelect:d,setBoxSelect:b}
}});
var c,a;
var d=function(){if(c){return c
}c=new window.BoxSelect({clientId:TS.boot_data.box_app_key,linkType:"shared",multiselect:"true"});
TS.utility.box.SUCCESS_EVENT_TYPE=c.SUCCESS_EVENT_TYPE;
TS.utility.box.CANCEL_EVENT_TYPE=c.CANCEL_EVENT_TYPE;
return c
};
var b=function(e){c=e
}
})();
(function(){TS.registerModule("files",{member_files_fetched_sig:new signals.Signal(),team_files_fetched_sig:new signals.Signal(),team_file_added_sig:new signals.Signal(),team_file_deleted_sig:new signals.Signal(),team_file_changed_sig:new signals.Signal(),team_file_comment_added_sig:new signals.Signal(),team_file_comment_edited_sig:new signals.Signal(),team_file_comment_deleted_sig:new signals.Signal(),file_uploaded_sig:new signals.Signal(),file_uploading_sig:new signals.Signal(),file_progress_sig:new signals.Signal(),file_canceled_sig:new signals.Signal(),file_queue_emptied_sig:new signals.Signal(),channel_files_fetched_sig:new signals.Signal(),user_changed_public_url_sig:new signals.Signal(),uploadQ:[],uploading:false,polling_count:0,polling_file_id:null,polling_ticket:null,polling_tim:null,polling_handler:null,waiting_for_refresh:{},onStart:function(){},isFilePrivate:function(d){return !d.is_public&&!d.is_external&&!d.is_shared
},isFileUntitled:function(d){return d.name=="-"
},createPublicURL:function(d,e){if(TS.model.team.prefs.disallow_public_file_urls){return
}TS.api.callImmediately("files.sharedPublicURL",{file:d.id},function(g,h,f){if(g){TS.files.upsertAndSignal({id:d.id,public_url_shared:true});
TS.files.user_changed_public_url_sig.dispatch(h.file)
}else{if(h.error&&h.error==="not_allowed"){TS.model.team.prefs.disallow_public_file_urls=true;
TS.generic_dialog.alert("An administator has disabled public file URL creation. You will not be able to create a public URL for this space.")
}}if(e&&typeof e=="function"){e(g,h,f)
}})
},createSpace:function(d){TS.api.callSynchronously("files.createSpace",{},function(g,h,e){if(g){var f=TS.files.upsertAndSignal(h.file).file;
if(TS.web){TS.ssb.upsertFileInSSBParentWin(f)
}d(f)
}else{TS.generic_dialog.alert('<p class="no_bottom_margin">Oops! Something went wrong. Please try again.</p>');
d(null)
}})
},createAndOpenNewSpace:function(e,d){TS.files.createSpace(function(h){if(h){var f=(TS.model.active_cid?"?origin_channel="+TS.model.active_cid:"");
var g=h.permalink+f;
if(d||!TS.ssb.openNewFileWindow(h,g,f)){TS.utility.openInNewTab(g,h.id)
}}if(typeof e=="function"){e(h)
}})
},promptForFileUnshare:function(f,d){var e=TS.channels.getChannelById(d);
var g=(e)?null:TS.groups.getGroupById(d);
if(!g&&!e){return
}TS.generic_dialog.start({title:"Un-share file",body:"<p>Are you sure you want to un-share this file from the <b>"+((e)?"#"+e.name+"</b> channel":g.name+"</b> "+TS.templates.builders.groupCopy())+"?</p>					<p>Un-sharing the file will not remove existing share and comment messages, but it will keep any future comments from appearing 					in the "+((e)?"channel":TS.templates.builders.groupCopy({skip_private:true}))+".</p>",show_cancel_button:true,show_go_button:true,go_button_text:"Yes, unshare this file",cancel_button_text:"Cancel",on_go:function(){TS.files.unshareFile(f,d)
}})
},shareFile:function(i,d,h,f,g){var e={file:i,channel:d,comment:h||""};
e.resharing_aware=true;
if(f){e.share_quietly=true
}TS.api.call("files.share",e,function(k,l,j){TS.files.onFileShare(k,l,j);
if(g){g(k,l,j)
}})
},onFileShare:function(f,g,d){if(!f){return
}TS.files.fetchFileInfo(d.file,function(i,h){TS.templates.builders.updateFileShareLabels(h);
if(TS.web){TS.files.upsertAndSignal(h)
}});
if(TS.web){var e=TS.files.getFileById(d.file);
if(e.mode==="post"){TS.web.file.onPostShare(f,g,d)
}if(TS.web.space){TS.web.space.onFileShare(f,g,d)
}}},unshareFile:function(f,d,e){TS.api.call("files.unshare",{file:f,channel:d},function(h,i,g){TS.files.onFileUnShare(h,i,g);
if(e){e(f,TS.files.getFileById(f))
}})
},onFileUnShare:function(e,f,d){if(!e){return
}else{TS.files.fetchFileInfo(d.file,function(h,g){TS.templates.builders.updateFileShareLabels(g);
if(TS.web){TS.files.upsertAndSignal(g)
}})
}},fetchFileInfo:function(e,d){TS.api.call("files.info",{file:e,page:1,count:500},function(g,h,f){TS.files.onFileFetch(g,h,f);
if(d){d(e,TS.files.getFileById(e))
}})
},fetchFileInfoNEW:function(e,d){if(!e){TS.error("WTF no file id for fetchFileInfo()?");
return
}if(c[e]){if(d){c[e].callbacks.push(d)
}if(e=="F02CLF8UA"){TS.warn("NOT FETCHING "+e+" ****************************************************************************************")
}return
}c[e]={callbacks:[d]};
TS.api.call("files.info",{file:e},function(g,i,f){TS.files.onFileFetch(g,i,f);
var h=c[f.file].callbacks;
h.forEach(function(j,k){if(j){j(f.file,TS.files.getFileById(f.file))
}});
delete c[f.file]
})
},onFileFetch:function(e,g,d){if(!e){if(g.error=="file_deleted"){var f=TS.files.getFileById(d.file);
if(f){TS.files.removeFile(f.id)
}else{if(d.file){TS.files.removeFile(d.file)
}}}else{if(g.error=="file_not_found"){TS.files.removeFile(d.file)
}}return
}if(g.file){g.file.comments=g.comments;
g.file.content=g.content;
g.file.content_html=g.content_html;
g.file.content_highlight_html=g.content_highlight_html;
TS.files.upsertAndSignal(g.file)
}},fetchTeamFiles:function(e){e=TS.model.file_list_types;
var d=(e&&e.length)?e.join(","):"";
TS.api.call("files.list",{types:d},TS.files.onTeamFetch)
},onTeamFetch:function(g,h,d){if(!g){return
}if(h.files){var f;
for(var e=0;
e<h.files.length;
e++){f=h.files[e];
TS.files.upsertFile(f)
}}TS.files.team_files_fetched_sig.dispatch(TS.model.files)
},fetchMemberFiles:function(f,e){var d=(e&&e.length)?e.join(","):"";
TS.api.call("files.list",{user:f,types:d},TS.files.onMemberFetch)
},onMemberFetch:function(g,h,d){if(!g){return
}if(h.files){var f;
for(var e=0;
e<h.files.length;
e++){f=h.files[e];
TS.files.upsertFile(f)
}}TS.files.team_files_fetched_sig.dispatch(TS.model.files);
var j=TS.members.getMemberById(d.user);
TS.files.member_files_fetched_sig.dispatch(j)
},fetchChannelFiles:function(f,e){var d=(e&&e.length)?e.join(","):"";
TS.api.call("files.list",{channel:f,types:d},TS.files.onChannelFetch)
},onChannelFetch:function(g,h,d){if(!g){return
}if(h.files){var f;
for(var e=0;
e<h.files.length;
e++){f=h.files[e];
TS.files.upsertFile(f)
}}TS.files.channel_files_fetched_sig.dispatch(d.channel,h.files)
},addComment:function(f,e,d){TS.api.callImmediately("files.comments.add",{file:f,comment:e},function(h,i,g){TS.files.onFileComment(h,i,g);
if(d){d(h,i,g)
}})
},onFileComment:function(f,g,d){if(!f){return
}var e=TS.files.getFileById(d.file);
if(!e){TS.error("no file? "+d.file);
return
}TS.files.addCommentToFile(g.comment,e)
},getFileById:function(d){return TS.files.getFileByProp("id",d)
},getFileByDownloadUrl:function(d){if(TS.boot_data.feature_deprecate_url_download){return
}return TS.files.getFileByProp("url_download",d)
},getFileByDownloadUrlPrivate:function(d){return TS.files.getFileByProp("url_private_download",d)
},getFileByProp:function(d,h){if(!d){return null
}if(!h){return null
}var g=TS.model.files;
var f;
for(var e=0;
e<g.length;
e++){f=g[e];
if(f[d]==h){return f
}}return null
},getFileActions:function(f){if(!f){return
}var g={};
var h=false;
if(f.user==TS.model.user.id){h=true
}if(f.is_public){g.share=true
}else{if(h){g.share=true
}else{g.share_private_file=true
}}g.comment=true;
if(!f.public_url_shared&&f.mode!="external"&&!TS.model.user.is_restricted&&!TS.model.team.prefs.disallow_public_file_urls){if(f.is_public){g.create_public_link=true
}else{if(h){g.create_public_link=true
}}}if(f.public_url_shared&&!TS.model.user.is_restricted&&(TS.model.user.is_admin||h)&&!TS.model.team.prefs.disallow_public_file_urls){g.revoke_public_link=true
}if(f.mode=="hosted"||f.mode=="snippet"){g.download=true
}if((f.mimetype&&f.mimetype.indexOf("image/")===0)||f.mode=="external"||f.mode=="snippet"||f.mode=="email"){g.open_original=true
}if(TS.web){if(f.mode=="post"||f.mode=="snippet"||f.mode=="space"||f.mode=="email"){g.print=true
}}if(f.mode=="space"&&TS.boot_data.feature_spaces&&!(f.user==="USLACKBOT"&&f.name==="Getting_Started_with_Posts")){g.learn_more=true
}if(h){if(f.mode=="snippet"||f.mode=="post"||f.mode=="space"){g.edit=true
}if(f.mode=="hosted"||f.mode=="email"){g.edit_title=true
}g.delete_file=true
}if(TS.model.user.is_admin){g.delete_file=true
}if(f.mode=="external"){if(h||TS.model.user.is_admin){g.refresh=true
}}if(window.Dropbox&&Dropbox.isBrowserSupported()&&TS.model.prefs.dropbox_enabled){if(f.mode=="hosted"){g.save_to_dropbox=true
}}if(TS.client){var d=TS.shared.getActiveModelOb();
if(TS.pins.canUserPinHere(d)){if(f.pinned_to&&f.pinned_to.indexOf(d.id)!==-1){g.unpin_file=true
}else{var e=!!f.is_public;
e=e||f.channels.indexOf(d.id)!==-1;
e=e||f.groups.indexOf(d.id)!==-1;
if(e){g.pin_file=true
}}}}if(TS.boot_data.feature_reactions){g.rxn_file=true
}return g
},getFileCommentActions:function(h,f){if(!h){return{}
}var g={can_edit:true,can_delete:true};
if(h.user!=TS.model.user.id){g.can_edit=false
}else{if(TS.model.team.prefs.msg_edit_window_mins>-1&&(Date.now()-TS.utility.date.toDateObject(h.timestamp))/60000>TS.model.team.prefs.msg_edit_window_mins){g.can_edit=false
}}if(!TS.model.team.prefs.allow_message_deletion){if(!TS.model.user.is_admin){g.can_delete=false
}}else{if(h.user!=TS.model.user.id){if(!TS.model.user.is_admin){g.can_delete=false
}}}if(TS.client){var d=TS.shared.getActiveModelOb();
if(TS.pins.canUserPinHere(d)){if(h.pinned_to&&h.pinned_to.indexOf(d.id)!==-1){g.can_unpin=true
}else{var e=!!f.is_public;
e=e||f.channels.indexOf(d.id)!==-1;
e=e||f.groups.indexOf(d.id)!==-1;
if(e){g.can_pin=true
}}}}if(TS.boot_data.feature_reactions){g.rxn_file_comment=true
}return g
},getThumbSrcForFile:function(e,d){if(typeof e==="string"){e=TS.files.getFileById(e)
}if(!e||(!e.thumb_360&&!e.thumb_360_gif)){return false
}if(!d){d={}
}if(!d.max_size){d.max_size=480
}if(d.retina===undefined){d.retina=true
}if(d.max_size>360){if(e.thumb_480_gif){return e.thumb_480_gif
}if(e.thumb_960&&d.retina){return e.thumb_960
}if(e.thumb_480){return e.thumb_480
}}if(e.thumb_360_gif){return e.thumb_360_gif
}if(e.thumb_720&&d.retina){return e.thumb_720
}return e.thumb_360
},getFileTemplateArguments:function(e,f){var d={};
d.current_user_id=TS.model.user.id;
d.file_partial="generic";
if(/(snippet|post|email)/.test(e.mode)){d.file_partial=e.mode
}if(/(space)/.test(e.mode)){d.file_partial="post"
}if(e&&(e.thumb_360||e.thumb_360_gif)&&!(e.external_type==="gdrive"&&e.mimetype.indexOf("image/")<0)){d.file_partial="image";
d.image_src=TS.files.getThumbSrcForFile(e,{max_size:f});
d.image_width=(f===360)?e.thumb_360_w:e.thumb_480_w||e.thumb_360_w;
d.image_height=(f===360)?e.thumb_360_h:e.thumb_480_h||e.thumb_360_h;
d.preserve_aspect_ratio=(d.image_width>0&&d.image_height>0&&TS.utility.cssCalcSupported());
d.preview_actions_class="";
if(d.image_width<170||d.image_height<50){d.preview_actions_class+=" overflow_preview_actions"
}if(d.image_width<170){d.preview_actions_class+=" overflow_preview_actions_width"
}}if(/(post|space|email|generic)/.test(d.file_partial)){d.title_hider=true
}if(e.mode=="snippet"){d.title_hider=(e.title==="Untitled")
}d.filesize=(e.size>20000&&!/(gdoc|gpres|gsheet|gdraw)/.test(e.filetype));
if(!/(space|post)/.test(e.filetype)){d.meta_filetype=TS.templates.builders.makeFiletypeHTML(e)
}if(TS.templates.builders.makeExternalFiletypeHTML(e)===d.meta_filetype){d.meta_filetype=false
}return d
},sortFiles:function(d){function e(g,f){if(g.timestamp<f.timestamp){return 1
}if(g.timestamp>f.timestamp){return -1
}return 0
}d.sort(e)
},getFileCommentById:function(e,f){var g;
for(var d=0;
d<e.comments.length;
d++){g=e.comments[d];
if(g.id==f){return g
}}return null
},addCommentToFile:function(f,d){var e=TS.files.getFileCommentById(d,f.id);
if(e){return e
}if(TS.boot_data.feature_reactions){f._rxn_key=TS.rxns.getRxnKey("file_comment",f.id);
TS.rxns.upsertRxnsFromDataAndUpdateUI(f._rxn_key,f.reactions);
delete f.reactions
}d.comments.push(f);
TS.files.sortCommentsOnFile(d);
TS.files.team_file_comment_added_sig.dispatch(d,f);
return f
},editCommentOnFile:function(j,e){var h;
var g=false;
var f=false;
for(var d=0;
d<e.comments.length;
d++){h=e.comments[d];
if(h.id==j.id){g=true;
e.comments[d]=j;
if(h.is_starred){j.is_starred=true
}if(h._rxn_key){j._rxn_key=h._rxn_key
}if(h.pinned_to&&!j.pinned_to){j.pinned_to=h.pinned_to
}if(e.initial_comment&&h.id==e.initial_comment.id){e.initial_comment=j;
f=true
}break
}}if(!g){return false
}TS.files.makeSureReferencesGetSavedToLS(e.id);
TS.files.sortCommentsOnFile(e);
TS.files.team_file_comment_edited_sig.dispatch(e,j);
if(f){TS.files.team_file_changed_sig.dispatch(e)
}return true
},deleteCommentOnFile:function(g,f){var h;
var d=[];
var j;
for(var e=0;
e<f.comments.length;
e++){h=f.comments[e];
if(h.id==g){j=h;
if(f.initial_comment&&h.id==f.initial_comment.id){f.initial_comment=null
}continue
}d.push(h)
}if(d.length==f.comments.length){return
}f.comments=d;
TS.files.makeSureReferencesGetSavedToLS(f.id);
TS.files.sortCommentsOnFile(f);
TS.files.team_file_comment_deleted_sig.dispatch(f,g,j);
TS.files.team_file_changed_sig.dispatch(f)
},makeSureReferencesGetSavedToLS:function(h){var e=function(n,m){var o;
for(var l=0;
l<n.length;
l++){o=n[l];
if(o.file&&o.file.id==m){return true
}}return false
};
var f;
var g;
for(f=0;
f<TS.model.channels.length;
f++){g=TS.model.channels[f];
if(g&&g.msgs&&g.msgs.length){if(e(g.msgs,h)){TS.utility.msgs.maybeStoreMsgs(g.id,g.msgs)
}}}var k;
for(f=0;
f<TS.model.groups.length;
f++){k=TS.model.groups[f];
if(k&&k.msgs&&k.msgs.length){if(e(k.msgs,h)){TS.utility.msgs.maybeStoreMsgs(k.id,k.msgs)
}}}var d;
for(f=0;
f<TS.model.ims.length;
f++){d=TS.model.ims[f];
if(d&&d.msgs&&d.msgs.length){if(e(d.msgs,h)){TS.utility.msgs.maybeStoreMsgs(d.id,d.msgs)
}}}if(TS.boot_data.feature_mpim_client){var j;
for(f=0;
f<TS.model.mpims.length;
f++){j=TS.model.mpims[f];
if(j&&j.msgs&&j.msgs.length){if(e(j.msgs,h)){TS.utility.msgs.maybeStoreMsgs(j.id,j.msgs)
}}}}},sortCommentsOnFile:function(d){function e(g,f){if(g.timestamp>f.timestamp){return 1
}if(g.timestamp<f.timestamp){return -1
}return 0
}d.comments.sort(e)
},upsertFile:function(B){if(B.mode==="space"){try{if(B.preview&&/^\s*<document>/.test(B.preview)){var z=$(B.preview);
if(z.length){B.preview=z.html()
}if(TS.boot_data.feature_files_list&&z.length){var s=z.children().eq(0);
if(s.hasClass("list")){s.find("li:not(:first)").remove()
}if(s.prop("tagName").toLowerCase()==="pre"){B.preview_in_list=s.length?'<span class="monospace">'+TS.utility.htmlEntities(s.text())+"</span>":""
}else{B.preview_in_list=s.length?TS.utility.htmlEntities(s.text()):""
}}}}catch(n){TS.log(93,"problem with file.preview id:"+B.id);
TS.log(93,"file.preview: "+B.preview)
}try{if(B.content_html){var m=$(B.content_html);
if(m.length){B.content_html=m.html()
}}}catch(n){TS.log(93,"problem with file.content_html id:"+B.id);
TS.log(93,"file.content_html: "+B.content_html)
}}if(TS.boot_data.feature_files_list&&B.mode==="post"&&B.preview){var r=B.preview;
var h=r.split("\n");
var f=h.length;
for(var w=0;
w<f;
w++){var x=h[w];
if(x){B.preview_in_list=x;
break
}}}var o=TS.model.files;
var q=TS.files.getFileById(B.id);
var u="NOOP";
var g=[];
var A;
var d;
var C;
var y;
if(B.thumb_480){if(TS.boot_data.feature_fix_files){if(B.thumb_480.indexOf("?feature_fix_files=1")<0){B.thumb_480+="?feature_fix_files=1"
}}else{delete B.thumb_480;
if(B.thumb_480_w){delete B.thumb_480_w
}if(B.thumb_480_h){delete B.thumb_480_h
}}}if(B.thumb_960){if(TS.boot_data.feature_fix_files){if(B.thumb_960.indexOf("?feature_fix_files=1")<0){B.thumb_960+="?feature_fix_files=1"
}}else{delete B.thumb_960;
if(B.thumb_960_w){delete B.thumb_960_w
}if(B.thumb_960_h){delete B.thumb_960_h
}}}if(q){if(TS.boot_data.feature_reactions){B._rxn_key=TS.rxns.getRxnKey("file",B.id);
C=TS.rxns.getExistingRxnsByKey(B._rxn_key);
if(C&&!B.reactions){TS.warn("file:"+B.id+" has reactions in local model, but we are upserting an object that does NOT have reactions, which seems suspicious")
}else{TS.rxns.upsertRxnsFromDataAndUpdateUI(B._rxn_key,B.reactions)
}delete B.reactions;
if(B.comments){for(y=0;
y<B.comments.length;
y++){d=B.comments[y];
d._rxn_key=TS.rxns.getRxnKey("file_comment",d.id);
C=TS.rxns.getExistingRxnsByKey(d._rxn_key);
if(C&&!d.reactions){TS.warn("comment:"+B.id+" has reactions in local model, but we are upserting an object that does NOT have reactions, which seems suspicious")
}else{TS.rxns.upsertRxnsFromDataAndUpdateUI(d._rxn_key,d.reactions)
}delete d.reactions
}}if(B.initial_comment){B.initial_comment._rxn_key=TS.rxns.getRxnKey("file_comment",B.initial_comment.id);
C=TS.rxns.getExistingRxnsByKey(B.initial_comment._rxn_key);
if(C&&!B.initial_comment.reactions){TS.warn("initial_comment:"+B.id+" has reactions in local model, but we are upserting an object that does NOT have reactions, which seems suspicious")
}else{TS.rxns.upsertRxnsFromDataAndUpdateUI(B.initial_comment._rxn_key,B.initial_comment.reactions)
}delete B.initial_comment.reactions
}}A=(q.channels||[]).concat(q.ims||[]).concat(q.groups||[]);
for(var v in B){if(v=="channels"||v=="ims"||v=="groups"||v=="pinned_to"||v=="to"||v=="from"||v=="cc"||v=="attachments"){var p=false;
var l=TS.utility.ensureArray(B[v]);
var t=TS.utility.ensureArray(q[v]);
if(v=="to"||v=="from"||v=="cc"||v=="attachments"){if(t.length!=l.length){p=true
}}else{if(t.join("")!=l.join("")){p=true;
if(v=="channels"||v=="ims"||v=="groups"){A=A.concat(B[v]||[])
}}}if(p){q[v]=B[v];
u="CHANGED";
g.push(v)
}}else{if(v=="preview"){if(q[v]!==B[v]){q[v]=B[v];
if(q.content){delete q.content
}if(q.content_html){delete q.content_html
}if(q.content_highlight_html){delete q.content_highlight_html
}u="CHANGED";
g=g.concat([v,"content","content_html","content_highlight_html"])
}}else{if(v=="comments"){if(B[v]&&!TS.utility.areSimpleObjectsEqual(B[v],q[v],"file:"+B.id+" "+B.name)){q[v]=B[v];
u="CHANGED";
g.push(v)
}}else{if(v=="content"){if(B[v]&&q[v]!=B[v]){q[v]=B[v];
u="CHANGED";
g.push(v)
}}else{if(v=="initial_comment"){q[v]=B[v]
}else{if(v=="reactions"){q[v]=B[v]
}else{if(q[v]!=B[v]){if(B[v]&&!TS.utility.isScalar(B[v])){q[v]=B[v];
TS.warn(v+" is not scalar! it needs to be handled by upsertFile specifically to test if it has changed! "+(typeof B[v]))
}else{if(typeof B[v]!="boolean"||!B[v]!=!q[v]){g.push(v+" ["+q[v]+"] -> ["+B[v]+"]");
q[v]=B[v];
u="CHANGED"
}}}}}}}}}}}else{u="ADDED";
if(TS.boot_data.feature_reactions){B._rxn_key=TS.rxns.getRxnKey("file",B.id);
TS.rxns.upsertRxnsFromDataAndUpdateUI(B._rxn_key,B.reactions);
delete B.reactions;
if(B.comments){for(y=0;
y<B.comments.length;
y++){d=B.comments[y];
d._rxn_key=TS.rxns.getRxnKey("file_comment",d.id);
TS.rxns.upsertRxnsFromDataAndUpdateUI(d._rxn_key,d.reactions);
delete d.reactions
}if(B.initial_comment){B.initial_comment._rxn_key=TS.rxns.getRxnKey("file_comment",B.initial_comment.id);
TS.rxns.upsertRxnsFromDataAndUpdateUI(B.initial_comment._rxn_key,B.initial_comment.reactions);
delete B.initial_comment.reactions
}}}o.push(B);
var e=TS.members.getMemberById(B.user);
if(e){e.files.push(B);
TS.files.sortFiles(e.files);
e.has_files=true
}else{TS.error("hmmm, file "+B.id+" does not have a know user "+B.user)
}a(B);
q=B
}if(u=="CHANGED"){a(B)
}if(!q.comments){q.comments=[]
}else{q.comments_count=Math.max(q.comments_count,q.comments.length)
}if(!q.channels){q.channels=[]
}if(!q.ims){q.ims=[]
}if(!q.groups){q.groups=[]
}q.is_shared=(q.groups.length>0)||(q.channels.length>0);
if(u!="NOOP"){TS.utility.msgs.maybeStoreMsgsForMany(A)
}TS.files.sortFiles(TS.model.files);
return{status:u,file:q,what_changed:g}
},upsertAndSignal:function(d){var e=TS.files.upsertFile(d);
if(e.status=="CHANGED"){TS.files.team_file_changed_sig.dispatch(e.file)
}else{if(e.status=="ADDED"){TS.files.team_file_added_sig.dispatch(e.file)
}}return e
},removeFile:function(j){TS.log(4,'removing file "'+j+'"');
var g;
var f=TS.files.getFileById(j);
if(f){f.is_deleted=true
}var h=TS.model.channels;
var k;
for(g=0;
g<h.length;
g++){k=h[g];
if(f){TS.utility.msgs.removeFileSharesAndMentions(k,f)
}if(f){TS.utility.msgs.removeFileComments(k,f)
}TS.utility.msgs.removeFileReferences(k,j)
}var e=TS.model.groups;
var n;
for(g=0;
g<e.length;
g++){n=e[g];
if(f){TS.utility.msgs.removeFileSharesAndMentions(n,f)
}if(f){TS.utility.msgs.removeFileComments(n,f)
}TS.utility.msgs.removeFileReferences(n,j)
}var o=TS.model.ims;
var m;
for(g=0;
g<o.length;
g++){m=o[g];
if(f){TS.utility.msgs.removeFileSharesAndMentions(m,f)
}if(f){TS.utility.msgs.removeFileComments(m,f)
}TS.utility.msgs.removeFileReferences(m,j)
}if(TS.boot_data.feature_mpim_client){var d=TS.model.mpims;
var l;
for(g=0;
g<d.length;
g++){l=d[g];
if(f){TS.utility.msgs.removeFileSharesAndMentions(l,f)
}if(f){TS.utility.msgs.removeFileComments(l,f)
}TS.utility.msgs.removeFileReferences(l,j)
}}if(f){TS.files.team_file_deleted_sig.dispatch(f)
}},upload:function(d){if(TS.files.uploading){TS.files.uploadQ.push(d)
}else{TS.files.actuallyUpload(d)
}},actuallyUpload:function(h){TS.files.uploading=true;
h.retry_num=h.retry_num||0;
var j=new FormData();
var g;
var e=!!h.file;
if(h.text){g=h.title||h.filetype;
TS.files.file_uploading_sig.dispatch(g,h.retry_num>0,e);
j.append("content",h.text);
if(h.filetype){j.append("filetype",h.filetype)
}if(h.filename){TS.warn("ignoring filename because it makes no sense for text files")
}}else{g=h.title||h.filename||h.file.name||"blob";
TS.files.file_uploading_sig.dispatch(g,h.retry_num>0,e);
if(typeof h.file=="string"){j.append("content64",h.file)
}else{j.append("file",h.file)
}if(h.filename){j.append("filename",h.filename)
}if(h.filetype){TS.warn("ignoring filetype we send a filename which can intuit it")
}}j.append("token",TS.model.api_token);
if(h.channels&&h.channels.length){var d=(typeof h.channels=="string")?h.channels:(h.channels.join)?h.channels.join(","):"";
j.append("channels",d)
}j.append("title",h.title);
if(h.initial_comment){j.append("initial_comment",h.initial_comment)
}var k="files.uploadAsync";
if(h.link){if(h.is_dropbox){k="files.uploadExternal"
}if(h.is_box){k="files.uploadExternal"
}j.append("link",h.link)
}TS.log(2,"calling "+TS.model.api_url+"files.upload");
var f;
if(k=="files.uploadAsync"){f=TS.model.async_api_url+k
}else{f=TS.model.api_url+k
}var i=false;
b=$.ajax({url:f,data:j,dataType:"json",cache:false,contentType:false,processData:false,type:"POST",xhr:function(){var l=jQuery.ajaxSettings.xhr();
if(l.upload){l.upload.addEventListener("progress",function(m){if(m.lengthComputable){var n=parseInt(100*m.loaded/m.total,10);
TS.files.file_progress_sig.dispatch(n)
}else{TS.info("Upload length not computable")
}},false)
}return l
},error:function(l,n,m){i=true;
TS.info("Error: Failed to upload file.");
TS.info("textStatus:"+n+" errorThrown:"+m);
if(n==="abort"){TS.files.file_canceled_sig.dispatch(g);
TS.files.uploadOver(false);
return
}if(h.retry_num===0){h.retry_num++;
TS.files.actuallyUpload(h)
}else{TS.generic_dialog.start({title:"Upload failed",body:'Failed to upload file: "'+n+(m?" "+m:"")+'". Try again?',go_button_text:"Yes, try again",cancel_button_text:"No, cancel",on_go:function(){h.retry_num++;
TS.files.actuallyUpload(h)
},on_cancel:function(){TS.files.uploadOver(false)
}})
}},complete:function(m){if(i){return
}m=jQuery.parseJSON(m.responseText);
if(m&&m.ok&&m.file){if(k=="files.uploadAsync"){var n=function(q,s,p){if(!TS.files.polling_file_id){return
}if(q){if(s.status=="complete"){var r=TS.files.upsertAndSignal(s.file);
TS.files.uploadProcessingOver(true,r.file.id)
}else{if(s.status=="failed"){var o="";
if(s.debug&&TS.model.team.domain=="tinyspeck"){o="<br><br>TS only Debugging:<br><br>"+s.debug
}TS.generic_dialog.start({title:"Upload failed",body:"Failed to process the uploaded file. Try again?"+o,go_button_text:"Yes, try again",cancel_button_text:"No, cancel",on_go:function(){p.retry_num++;
TS.files.actuallyUpload(p)
},on_cancel:function(){TS.files.uploadProcessingOver(false,TS.files.polling_file_id)
}})
}else{TS.files.pollForUploadProcessing()
}}}else{TS.generic_dialog.start({title:"Upload failed",body:"Failed to process the uploaded file.",show_cancel_button:true});
TS.files.uploadProcessingOver(false,TS.files.polling_file_id)
}};
TS.files.startPollingForUploadProcessing(m.file,m.ticket,n)
}else{var l=TS.files.upsertAndSignal(m.file);
TS.files.uploadOver(m.ok,l.file.id)
}}else{TS.info("Error: Failed to upload file.");
TS.info(m);
if(m){if(h.retry_num===0){h.retry_num++;
TS.files.actuallyUpload(h)
}else{if(m.error==="folders_not_supported"){TS.generic_dialog.start({title:"Folders not supported",body:"<p>Sorry, <b>"+TS.utility.htmlEntities(h.filename)+"</b> is a folder, and folder uploads are not supported by Slack.</p>									<p>Try uploading a .zip version of the file instead.</p>",show_cancel_button:false,esc_for_ok:true,on_go:function(){TS.generic_dialog.end();
TS.files.uploadOver(false)
}})
}else{if(m.error==="request_timeout"){TS.generic_dialog.start({title:"File upload timed out",body:'<p>It looks like you\'re on a slow or inconsistent internet connection. You may want to try your file upload again later. Or, try again now and it might work if you cross your fingers!</p>									<p>If you\'re still having problems, you can:</p><ul><li><a href="/help/test" target="'+TS.templates.builders.newWindowName()+'" class="bold">Run our Self-Help Tests</a></li><li><a href="/help/requests/new" target="'+TS.templates.builders.newWindowName()+'" class="bold">Contact our support team</li></ul>',show_cancel_button:false,esc_for_ok:true,on_go:function(){TS.generic_dialog.end();
TS.files.uploadOver(false)
}})
}else{TS.generic_dialog.start({title:"Upload failed",body:'Failed to upload file: "'+(m.error||"unknown error")+'". Try again?',go_button_text:"Yes, try again",cancel_button_text:"No, cancel",on_go:function(){h.retry_num++;
TS.files.actuallyUpload(h)
},on_cancel:function(){TS.files.uploadOver(false)
}})
}}}}else{alert("Upload failed.");
TS.files.uploadOver(false)
}}}})
},startPollingForUploadProcessing:function(d,e,f){TS.files.polling_count=0;
TS.files.polling_file_id=d;
TS.files.polling_ticket=e;
TS.files.polling_handler=f;
TS.files.pollForUploadProcessing()
},pollForUploadProcessing:function(){TS.files.polling_count++;
TS.files.polling_tim=setTimeout(function(){if(!TS.files.polling_ticket){return
}TS.api.callImmediately("files.uploadStatus",{ticket:TS.files.polling_ticket},function(e,f,d){if(!TS.files.polling_ticket){return
}TS.files.polling_handler(e,f,d)
})
},TS.files.polling_count*1000)
},uploadProcessingOver:function(d,e){if(TS.files.polling_file_id!=e){return
}TS.info("TS.files.uploadProcessingOver polling_file_id:"+TS.files.polling_file_id+" polling_ticket:"+TS.files.polling_ticket+" polling_count:"+TS.files.polling_count);
TS.files.polling_count=0;
TS.files.polling_file_id=null;
TS.files.polling_ticket=null;
TS.files.polling_handler=null;
clearTimeout(TS.files.polling_tim);
TS.files.uploadOver(d,e)
},uploadOver:function(d,e){TS.files.file_uploaded_sig.dispatch(d,e);
TS.files.uploading=false;
b=null;
if(TS.files.uploadQ.length){TS.files.actuallyUpload.call(null,TS.files.uploadQ.shift())
}else{TS.files.file_queue_emptied_sig.dispatch()
}},cancelCurrentUpload:function(){if(b){b.abort()
}},deleteFile:function(d){TS.api.call("files.delete",{file:d},TS.files.onFileDelete)
},onFileDelete:function(e,f,d){if(!e){return
}},endEditFileTitle:function(){$("#file_edit_title_container").addClass("hidden");
$("#file_title_container").removeClass("hidden")
},saveEditFileTitle:function(f){var e=TS.files.getFileById(f);
if(!e){return
}var g=$("#file_edit_title_input").val();
if(!$.trim(g)){TS.sounds.play("beep");
return
}var d=e.title;
if(d==g){TS.files.endEditFileTitle();
return
}TS.api.callImmediately("files.edit",{file:f,title:g},function(i,j,h){if(!i){TS.files.upsertAndSignal({id:f,title:d});
alert("save failed!")
}});
g=TS.utility.htmlEntities(g);
TS.files.upsertAndSignal({id:f,title:g});
TS.files.endEditFileTitle()
},editFileTitle:function(e){var d=TS.files.getFileById(e);
if(!d){return
}var f=d.title;
if(f){f=TS.format.unFormatMsg(f)
}else{f=d.name
}$("#file_title_container").addClass("hidden");
$("#file_edit_title_container").removeClass("hidden");
$("#file_edit_title_input").val(f);
$("#file_edit_title_input").select()
},openBoxChooser:function(){TS.utility.box.unregister(TS.utility.box.SUCCESS_EVENT_TYPE,TS.files.onBoxChooser);
TS.utility.box.success(TS.files.onBoxChooser);
TS.utility.box.launchPopup()
},onBoxChooser:function(e){var g=new Array(e.length);
for(var f=0;
f<e.length;
f++){var d=e[f];
g[f]={name:d.name,link:d.url,is_box:true}
}TS.ui.upload_dialog.startWithCommentFromChatInput(g)
},openDropboxChooser:function(){var d="preview";
Dropbox.choose({success:TS.files.onDropboxChooser,linkType:d,multiselect:true})
},onDropboxChooser:function(g){var f=[];
for(var e=0;
e<g.length;
e++){var h=g[e];
f.push({name:h.name,size:h.bytes,link:h.link,icon:h.icon,is_dropbox:true})
}TS.ui.upload_dialog.startWithCommentFromChatInput(f)
},makeFileNameFromFile:function(e){var d=Date.now()/1000;
return e.name||"Pasted image at "+TS.utility.date.toFilenameFriendlyDate(d)+".png"
},makeFileTitleFromFile:function(e){var d=Date.now()/1000;
return e.name||"Pasted image at "+TS.utility.date.toDate(d)
},justUploadTheseFileNow:function(f){var e;
for(var d=0;
d<f.length;
d++){e=f[d];
if(e.size>TS.model.upload_file_size_limit_bytes){continue
}TS.files.upload({file:e,filename:TS.files.makeFileNameFromFile(e),title:TS.files.makeFileTitleFromFile(e),channels:[TS.shared.getActiveModelOb().id],initial_comment:""})
}},refreshFile:function(d){TS.files.startRefreshingFile(d);
TS.api.call("files.refresh",{file:d},TS.files.onFileRefresh)
},onFileRefresh:function(e,g,d){var h=d.file;
if(e){TS.menu.$menu.find("#refresh_file").find(".item_label").text("File refreshed!").end().find("i").removeClass("ts_icon_spin")
}else{if(!e){TS.files.doneRefreshingFile(h,'<span class="moscow_red">Refresh failed.</span>',5000);
TS.menu.$menu.find("#refresh_file").find(".item_label").text("Refresh failed").end().find("i").removeClass("ts_icon_spin")
}}if(e&!g.will_refresh){TS.files.doneRefreshingFile(h,'<span class="moscow_red">File refreshed < 1 minute ago.</span>',5000)
}if(TS.web&&e){TS.menu.$menu.find("#refresh_file").find(".item_label").text("Reloading...");
location.reload()
}if(!e){if(g.error=="file_deleted"){var f=TS.files.getFileById(h);
if(f){TS.files.removeFile(f.id)
}}return
}},fileWasMaybeRefreshed:function(d){if(!d){return
}if(!TS.files.waiting_for_refresh[d.id]){return
}TS.files.doneRefreshingFile(d.id,'<span class="kelly_green">File refreshed!</span>',60000)
},startRefreshingFile:function(d){TS.files.waiting_for_refresh[d]=true;
$('.file_refresh[data-file-id="'+d+'"]').addClass("hidden");
$('.file_refresh_status[data-file-id="'+d+'"]').removeClass("hidden")
},doneRefreshingFile:function(f,e,d){delete TS.files.waiting_for_refresh[f];
$('.file_refresh_status[data-file-id="'+f+'"]').html(e);
setTimeout(function(){$('.file_refresh[data-file-id="'+f+'"]').removeClass("hidden");
$('.file_refresh_status[data-file-id="'+f+'"]').text("Refreshing file...").addClass("hidden")
},d)
},useLargerThumbnail:function(d){return TS.boot_data.feature_fix_files&&TS.qs_args["480_thumbs"]=="1"&&d.thumb_480&&d.thumb_480_w
},shareOrReshareFile:function(f,h,g){var e=(TS.files&&TS.files.getFileById?TS.files.getFileById(f):null);
var j=false;
var d=e.user!=TS.model.user.id;
var i=!e.bot_id;
if(TS.files.isFilePrivate(e)&&d&&i){j=true
}if(!e){TS.error("File for reshare doesn't exist: "+f);
return
}else{if(j){TS.files.reShareConfirmation([e],function(){TS.ui.share_dialog.start(f,h,g)
})
}else{TS.ui.share_dialog.start(f,h,g)
}}},reShareConfirmation:function(d,m){var k=d.map(function(n){return TS.members.getMemberDisplayNameById(n.user,true)
});
k=TS.utility.dedupeArray(k);
var f=TS.utility.concatNames(k);
var l="has";
var e="this file";
var g="You're about to share a private file";
var h="it";
if(k.length>1){l="have"
}if(d.length>1){e="these files";
g="You're about to share private files";
h="them"
}else{var j=d[0].title||"Untitled";
j=TS.format.formatWithOptions(j,null,{no_highlights:false,no_specials:true});
e="the file <b>"+j+"</b>"
}var i="<p><b>"+f+"</b> "+l+" privately shared "+e+" with you. Are you sure you want to proceed with sharing "+h+" somewhere else?</p><p>It’s important to note that any comments on "+e+" will also be shared.</p>";
TS.generic_dialog.start({title:g,body:i,show_cancel_button:true,show_go_button:true,go_button_text:"Proceed with sharing",cancel_button_text:"Cancel",on_go:m})
}});
var b=null;
var c={};
var a=function(e){if(TS.model.inline_img_exclude_filetypes.indexOf(e.filetype)!=-1){return
}var f={thumb_size:360,width:e.thumb_360_w,height:e.thumb_360_h,link_url:e.url_private,internal_file_id:e.id};
if(e.thumb_360_gif){TS.inline_imgs.makeInternalInlineImg(e.thumb_360_gif,f)
}else{if(e.thumb_720){TS.inline_imgs.makeInternalInlineImg(e.thumb_720,f)
}if(e.thumb_360){TS.inline_imgs.makeInternalInlineImg(e.thumb_360,f)
}}if(TS.files.useLargerThumbnail(e)){var d={thumb_size:480,width:e.thumb_480_w,height:e.thumb_480_h,link_url:e.url_private,internal_file_id:e.id};
if(e.thumb_480_gif){TS.inline_imgs.makeInternalInlineImg(e.thumb_480_gif,$.extend({},d))
}else{if(e.thumb_960){TS.inline_imgs.makeInternalInlineImg(e.thumb_960,$.extend({},d))
}if(e.thumb_480){TS.inline_imgs.makeInternalInlineImg(e.thumb_480,$.extend({},d))
}}}}
})();
(function(){TS.registerModule("rooms",{added_sig:new signals.Signal(),changed_name_sig:new signals.Signal(),changed_participants_sig:new signals.Signal(),changed_date_end_sig:new signals.Signal(),changed_channels_sig:new signals.Signal(),onStart:function(){},getRoomById:function(a){return TS.rooms.getRoomByProp("id",a)
},getRoomByProp:function(a,c){if(!a){return null
}var e=TS.model.rooms;
var d;
for(var b in e){d=e[b];
if(d[a]===c){return d
}}return null
},upsertAndSignal:function(b){var a=TS.rooms.upsertRoom(b);
if(a.status=="CHANGED"){if(a.what_changed.indexOf("name")!=-1){TS.rooms.changed_name_sig.dispatch(a.room)
}if(a.what_changed.indexOf("participants")!=-1){TS.rooms.changed_participants_sig.dispatch(a.room)
}if(a.what_changed.indexOf("date_end")!=-1){TS.rooms.changed_date_end_sig.dispatch(a.room)
}if(a.what_changed.indexOf("channels")!=-1){TS.rooms.changed_channels_sig.dispatch(a.room)
}}else{if(a.status=="ADDED"){TS.rooms.added_sig.dispatch(a.room)
}}return a
},upsertRoom:function(e){var g=TS.model.rooms;
var f=TS.rooms.getRoomById(e.id);
var b="NOOP";
var d=[];
var a;
if(e.date_start){e.date_start=Number(e.date_start)
}if(e.date_end){e.date_end=Number(e.date_end)
}if(e.was_rejected){e.was_rejected=Boolean(e.was_rejected)
}if(e.is_dm_call){e.is_dm_call=Boolean(e.is_dm_call)
}if(e.was_missed){e.was_missed=Boolean(e.was_missed)
}if(f){TS.log(4,'updating existing room "'+e.id+'"');
a=f.channels||[];
for(var c in e){if(c=="participants"||c=="channels"||c=="participant_history"){if(e[c]&&!TS.utility.areSimpleObjectsEqual(e[c],f[c])){d.push(c);
f[c]=e[c];
b="CHANGED";
if(c=="channels"){a=a.concat(e[c]||[])
}}}else{if(f[c]!=e[c]){if(e[c]&&!TS.utility.isScalar(e[c])){f[c]=e[c];
TS.warn(c+" is not scalar! it needs to be handled by upsertRoom specifically to test if it has changed! "+(typeof e[c]))
}else{if(typeof e[c]!="boolean"||!e[c]!=!f[c]){d.push(c);
f[c]=e[c];
b="CHANGED"
}}}}}e=f
}else{if(e.id){b="ADDED";
TS.log(4,'adding room "'+e.id);
g.push(e)
}else{TS.error("bad error, no room.id")
}}if(b!="NOOP"){TS.utility.msgs.maybeStoreMsgsForMany(a)
}return{status:b,room:e,what_changed:d}
}})
})();
(function(){TS.registerModule("ims",{switched_sig:new signals.Signal(),pre_switched_sig:new signals.Signal(),history_fetched_sig:new signals.Signal(),history_being_fetched_sig:new signals.Signal(),message_received_sig:new signals.Signal(),message_removed_sig:new signals.Signal(),message_changed_sig:new signals.Signal(),marked_sig:new signals.Signal(),closed_sig:new signals.Signal(),unread_changed_sig:new signals.Signal(),unread_highlight_changed_sig:new signals.Signal(),opened_sig:new signals.Signal(),msg_not_sent_sig:new signals.Signal(),data_retention_changed_sig:new signals.Signal(),onStart:function(){},addMsg:function(h,g){var d=TS.ims.getImById(h);
if(!d){TS.error('unknown im "'+h+'"');
return
}var e=d.msgs;
if(!TS.utility.msgs.validateMsg(h,g,e)){return
}TS.utility.msgs.appendMsg(e,g);
TS.utility.msgs.maybeStoreMsgs(d.id,e);
TS.utility.msgs.maybeSetOldestMsgsTsAfterMsgAdded(d);
var f=!TS.utility.msgs.isTempMsg(g);
TS.ims.calcUnreadCnts(d,f);
TS.utility.msgs.maybeTruncateMsgs(d);
TS.ims.message_received_sig.dispatch(d,g);
if(!d.is_open){TS.api.call("im.open",{user:d.user},TS.ims.onOpened)
}},calcUnreadCnts:function(d,e){TS.shared.calcUnreadCnts(d,TS.ims,e)
},removeMsg:function(g,f){var d=TS.ims.getImById(g);
if(!d){TS.error('unknown im "'+g+'"');
return
}if(d._archive_msgs){TS.utility.msgs.spliceMsg(d._archive_msgs,f)
}var e=d.msgs;
TS.utility.msgs.spliceMsg(e,f);
TS.ims.message_removed_sig.dispatch(d,f);
TS.utility.msgs.maybeStoreMsgs(d.id,e);
TS.ims.calcUnreadCnts(d,true)
},changeMsgText:function(g,f,d){var e=TS.ims.getImById(g);
if(!e){TS.error('unknown im "'+g+'"');
return
}f.text=d;
TS.ims.message_changed_sig.dispatch(e,f);
TS.utility.msgs.maybeStoreMsgs(e.id,e.msgs)
},sendMsg:function(e,d){return TS.shared.sendMsg(e,d,TS.ims)
},onSendMsg:function(f,e){var d=TS.ims.getImById(e.SENT_MSG.channel);
if(!d){TS.error("unknown im? "+e.SENT_MSG.channel);
return
}TS.shared.onSendMsg(f,e,d,TS.ims)
},closeImByMemberId:function(e){var d=TS.ims.getImByMemberId(e);
if(!d){return
}TS.ims.closeIm(d.id)
},closeIm:function(e){var d=TS.ims.getImById(e);
if(!d){return
}if(false&&d.is_slackbot_im){TS.error("can't leave self channel");
return
}TS.api.call("im.close",{channel:e},TS.ims.onClosed)
},onClosed:function(f,g,e){if(!f){return
}if(g.no_op){var d=TS.ims.getImById(e.channel);
if(d){TS.ims.closed_sig.dispatch(d)
}}},startImById:function(g,f,d){var e=TS.ims.getImById(g);
if(!e){TS.error(g+" not an im");
return
}TS.ims.startImByMemberId(e.user,f,d)
},startImByMemberName:function(e,f,d){var g=TS.members.getMemberByName(e);
if(!g){TS.error("no member?? "+e);
return
}TS.ims.startImByMemberId(g.id,f,d)
},startImByMemberId:function(f,g,d,h){var e=TS.ims.getImByMemberId(f);
if(e){TS.ims.displayIm(e.id,g);
if(e.is_open){if(d){TS.ims.sendMsg(e.id,$.trim(d))
}return
}}TS.model.requested_im_opens[f]={and_send_txt:d};
TS.api.call("im.open",{user:f},TS.ims.onOpened)
},onOpened:function(d,e){if(!d){return
}},displayIm:function(h,g,e){TS.timing.mark("start_channel_change_"+h);
var f=TS.ims.getImById(h);
if(!f){TS.error('im "'+h+'" unknown');
return
}if(h==TS.model.active_im_id){if(e){TS.ims.sendMsg(f.id,$.trim(e))
}return
}var d=g;
if(TS.client.channelDisplaySwitched(h,false,d)){TS.ims.pre_switched_sig.dispatch();
TS.ims.switched_sig.dispatch()
}if(e){TS.ims.sendMsg(f.id,$.trim(e))
}},setLastRead:function(d,e){if(d.last_read==e){return false
}if(e.indexOf(TS.utility.date.fake_ts_unique_padder)>-1){TS.error("bad ts:"+e);
return false
}if(d.last_read>e){var f=TS.model.last_reads_set_by_client[d.id+"_"+e];
delete TS.model.last_reads_set_by_client[d.id+"_"+e];
if(f){TS.warn("NOT going back in time im.last_read:"+d.last_read+" new:"+e);
return
}TS.info("going back in time im.last_read:"+d.last_read+" new:"+e)
}d.last_read=e;
TS.ims.marked_sig.dispatch(d);
TS.ims.calcUnreadCnts(d);
return true
},markMostRecentReadMsg:function(d,e){if(!d){TS.error("im unknown");
return
}if(!d.msgs||!d.msgs.length){return
}var f=TS.utility.msgs.getMostRecentValidTs(d.msgs);
if(!f){TS.warn("no valid tses???");
return
}d.all_read_this_session_once=true;
TS.ims.markReadMsg(d.id,f,e)
},markReadMsg:function(g,e,f){var d=TS.ims.getImById(g);
if(!d){TS.error('im "'+g+'" unknown');
return
}if(d.last_read==e){return
}if(TS.ims.setLastRead(d,e)){d._marked_reason=f;
d.needs_api_marking=true
}},onMarked:function(f,g,e){var d=TS.ims.getImById(e.channel);
if(!d){TS.error('wtf no im "'+e.channel+'"');
return
}if(!f){d.needs_api_marking=true
}},getImById:function(g){var e=TS.model.ims;
var d=b[g];
if(d){return d
}if(!e){return null
}for(var f=0;
f<e.length;
f++){d=e[f];
if(d.id==g){TS.warn(g+" not in _id_map");
b[g]=d;
return d
}}return null
},getDisplayNameOfUserForIm:function(d){return TS.members.getMemberDisplayName(TS.members.getMemberByName(d.name))
},getDisplayNameOfUserForImLowerCase:function(d){return TS.members.getMemberDisplayNameLowerCase(TS.members.getMemberByName(d.name))
},getImByUsername:function(f){f=TS.utility.getLowerCaseValue(f);
var e=TS.model.ims;
var d=a[f];
if(d){return d
}if(!e){return null
}for(var g=0;
g<e.length;
g++){d=e[g];
if(d._name_lc==f||"@"+d._name_lc==f){TS.warn(f+" not in _name_map?");
a[f]=d;
return d
}}return null
},getImByMemberId:function(g){var e=TS.model.ims;
var d=c[g];
if(d){return d
}if(!e){return null
}for(var f=0;
f<e.length;
f++){d=e[f];
if(d.user==g){TS.warn(g+" not in _member_id_map?");
c[g]=d;
return d
}}return null
},getFirstOpenIm:function(){var e=TS.model.ims;
var d;
if(!e){return null
}for(var f=0;
f<e.length;
f++){d=e[f];
if(d.is_open){return d
}}return null
},usernameChanged:function(e){var d=TS.ims.getImByMemberId(e.id);
if(!d){return
}delete a[d._name_lc];
delete a["@"+d._name_lc];
d.name=e.name;
d._name_lc=TS.utility.getLowerCaseValue(d.name);
a[d._name_lc]=d;
a["@"+d._name_lc]=d
},upsertIm:function(f){var e=TS.model.ims;
var i=TS.ims.getImById(f.id);
if(TS.boot_data.feature_no_unread_counts){delete f.unread_count
}if(i){TS.log(4,'updating existing im "'+f.id+'"');
for(var g in f){i[g]=f[g]
}f=i;
if(TS.client&&(f.is_open||f.unread_cnt)){TS.shared.checkInitialMsgHistory(f,TS.ims)
}}else{TS.log(4,'adding im "'+f.id+'"');
e.push(f);
if(f.is_im!==true){TS.warn(f.user+" lacked the is_im flag from the server");
f.is_im=true
}f.name=f.user;
var j=TS.members.getMemberById(f.user);
if(j){f.name=j.name;
if(j.is_slackbot){f.is_slackbot_im=true
}}f._name_lc=TS.utility.getLowerCaseValue(f.name);
b[f.id]=f;
c[f.user]=f;
a[f._name_lc]=f;
a["@"+f._name_lc]=f;
f.opened_this_session=false;
f.oldest_msg_ts=TS.storage.fetchOldestTs(f.id);
f.last_msg_input=TS.storage.fetchLastMsgInput(f.id);
f.scroll_top=-1;
f.history_is_being_fetched=false;
f.needs_api_marking=false;
f.unread_highlight_cnt=0;
f.unread_highlights=[];
f.unread_cnt=0;
f.unreads=[];
f.oldest_unread_ts=null;
f.has_fetched_history_after_scrollback=false;
if(TS.client){var d=TS.utility.msgs.fetchInitialMsgsFromLS(f);
TS.utility.msgs.setMsgs(f,d)
}else{if(TS.boot_data.msgs){TS.utility.msgs.ingestMessagesFromBootData(f)
}}}if(TS.client){var h=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.ims.calcUnreadCnts(f,h)
}return f
},markScrollTop:function(f,e){var d=TS.ims.getImById(f);
if(!d){return false
}if(d.scroll_top==e){return false
}d.scroll_top=e;
return true
},maybeLoadScrollBackHistory:function(f,e){var d=TS.ims.getImById(f);
if(!d){return false
}return TS.shared.maybeLoadScrollBackHistory(d,TS.ims,e)
},maybeLoadHistory:function(e){var d=TS.ims.getImById(e);
if(!d){return false
}return TS.shared.maybeLoadHistory(d,TS.ims)
},onHistory:function(f,g,e){var d=TS.ims.getImById(e.channel);
if(!d){TS.error('wtf no im "'+e.channel+'"');
return
}if(!f||!g||!g.messages){TS.error("failed to get history");
(d.history_fetch_retries)?d.history_fetch_retries++:d.history_fetch_retries=1;
TS.ims.history_fetched_sig.dispatch(d);
return
}delete d.history_fetch_retries;
var i=TS.shared.onHistory(d,g,e,TS.ims);
if(!i){d.history_is_being_fetched=false;
TS.ims.history_fetched_sig.dispatch(d)
}var h=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.ims.calcUnreadCnts(d,h);
if(TS.view){if(!i&&d.unread_cnt){TS.client.channel_pane.rebuildImList()
}}},fetchHistory:function(d,e,f){if(!d){TS.error('wtf no im "'+d+'"');
return
}d.history_is_being_fetched=true;
d.history_fetch_failed=false;
TS.ims.history_being_fetched_sig.dispatch(d);
if(d.history_fetch_retries>5){delete d.history_fetch_retries;
d.history_is_being_fetched=false;
d.history_fetch_failed=true;
if(TS.client){TS.client.msg_pane.updateEndMarker()
}return
}TS.api.call("im.history",e,f||TS.ims.onHistory)
},checkForOldImsToClose:function(){if(TS.boot_data.feature_mpim_client){return TS.shared.checkForOldImsToClose()
}var p=TS.model.ims;
var o;
var j;
var l;
var m;
var g;
var e=0;
var f=11;
var h=1000*60*60*168;
for(g=0;
g<p.length;
g++){o=p[g];
if(!o.is_open&&!o.unread_cnt){continue
}e++
}var k=e-f;
if(k<1){return
}TS.info("checkForOldImsToClose might close some. this_too_many:"+k);
var n=[];
for(g=0;
g<p.length;
g++){o=p[g];
if(o.is_slackbot_im){continue
}if(!o.is_open){continue
}if(o.unread_cnt){continue
}if(o.is_starred){continue
}if(o.opened_this_session){continue
}j=TS.shared.getLatestMsgTs(o)||"";
if(o.msgs&&o.msgs.length&&o.msgs[0]&&o.msgs[0].ts>j){j=o.msgs[0].ts
}if(j){l=TS.utility.date.toDateObject(j)
}else{l=new Date(o.created*1000)
}m=new Date()-l;
if(m>h){TS.info(o.name+" "+l+" ms_since_activity:"+m+" allow_elapsed_ms:"+h);
n.push({im:o,ms_since_activity:m})
}}if(!n.length){TS.info("checkForOldImsToClose found no candidates for closing")
}n.sort(function d(q,i){var r=q.ms_since_activity;
var s=i.ms_since_activity;
if(r<s){return 1
}if(r>s){return -1
}return 0
});
n.length=(n.length>k)?k:n.length;
for(g=0;
g<n.length;
g++){o=n[g].im;
TS.warn("checkForOldImsToClose CLOSING:"+o.name+" ms_since_activity:"+n[g].ms_since_activity);
TS.ims.closeIm(o.id)
}},setDataRetention:function(h,d,g,f){var e={channel:h,retention_type:$("select[name=retention_type]").val()};
if(e.retention_type==1){e.retention_duration=$("#retention_duration").val()
}TS.api.call("im.setRetention",e,function(j,k,i){if(f){f(j,k,i)
}if(j){TS.ims.data_retention_changed_sig.dispatch(i)
}})
},getDataRetention:function(e,d){TS.api.call("im.getRetention",{channel:e},d)
}});
var b={};
var a={};
var c={}
})();
(function(){TS.registerModule("mpims",{switched_sig:new signals.Signal(),pre_switched_sig:new signals.Signal(),joined_sig:new signals.Signal(),member_joined_sig:new signals.Signal(),history_fetched_sig:new signals.Signal(),history_being_fetched_sig:new signals.Signal(),message_received_sig:new signals.Signal(),message_removed_sig:new signals.Signal(),message_changed_sig:new signals.Signal(),marked_sig:new signals.Signal(),closed_sig:new signals.Signal(),unread_changed_sig:new signals.Signal(),unread_highlight_changed_sig:new signals.Signal(),opened_sig:new signals.Signal(),msg_not_sent_sig:new signals.Signal(),data_retention_changed_sig:new signals.Signal(),onStart:function(){if(!TS.boot_data.feature_mpim_client){return
}TS.prefs.display_real_names_override_changed_sig.add(f);
TS.prefs.team_display_real_names_changed_sig.add(f);
TS.members.changed_profile_sig.add(a)
},addMsg:function(n,l){var j=TS.mpims.getMpimById(n);
if(!j){TS.error('unknown mpim "'+n+'"');
return
}var i=j.msgs;
if(!TS.utility.msgs.validateMsg(n,l,i)){return
}TS.utility.msgs.appendMsg(i,l);
TS.utility.msgs.maybeStoreMsgs(j.id,i);
TS.utility.msgs.maybeSetOldestMsgsTsAfterMsgAdded(j);
var k=!TS.utility.msgs.isTempMsg(l);
TS.mpims.calcUnreadCnts(j,k);
TS.utility.msgs.maybeTruncateMsgs(j);
TS.mpims.message_received_sig.dispatch(j,l);
if(!j.is_open){if(j.members.length==1){var h=j.members[0];
TS.api.call("im.open",{user:h},TS.mpims.onOpened)
}else{if(j.members.length>1){var m=j.members.join(",");
TS.api.call("mpim.open",{users:m},TS.mpims.onOpened)
}else{}}}},calcUnreadCnts:function(h,i){TS.shared.calcUnreadCnts(h,TS.mpims,i)
},removeMsg:function(k,j){var i=TS.mpims.getMpimById(k);
if(!i){TS.error('unknown mpim "'+k+'"');
return
}if(i._archive_msgs){TS.utility.msgs.spliceMsg(i._archive_msgs,j)
}var h=i.msgs;
TS.utility.msgs.spliceMsg(h,j);
TS.mpims.message_removed_sig.dispatch(i,j);
TS.utility.msgs.maybeStoreMsgs(i.id,h);
TS.mpims.calcUnreadCnts(i,true)
},changeMsgText:function(j,i,h){},sendMsg:function(i,h){return TS.shared.sendMsg(i,h,TS.mpims)
},onSendMsg:function(j,h){var i=TS.mpims.getMpimById(h.SENT_MSG.channel);
if(!i){TS.error("unknown mpim? "+h.SENT_MSG.channel);
return
}TS.shared.onSendMsg(j,h,i,TS.mpims)
},closeMpim:function(i){var h=TS.mpims.getMpimById(i);
if(!h){return
}TS.api.call("mpim.close",{channel:i},TS.mpims.onClosed)
},onClosed:function(i,k,h){if(!i){return
}if(k.no_op){var j=TS.mpims.getMpimById(h.channel);
if(j){TS.mpims.closed_sig.dispatch(j)
}}},startMpimWithMembers:function(h,j){var i=h.map(function(k){return k.id
});
i=i.join(",");
TS.api.call("mpim.open",{users:i},function(l,n,k){if(n.group){var m=TS.mpims.upsertMpim(n.group);
if(m){TS.mpims.displayMpim(m.id)
}else{TS.error("no mpim?!?")
}}if(j){j(l,n,k)
}})
},onOpened:function(h,i){if(!h){return
}},displayMpim:function(n,i,m,j){TS.timing.mark("start_channel_change_"+n);
m=!!m;
j=!!j;
var l=TS.mpims.getMpimById(n);
if(!l){TS.error('mpim "'+n+'" unknown');
return
}if(n==TS.model.active_mpim_id&&!j){TS.warn('mpim "'+n+'" already displayed');
if(i){TS.mpims.sendMsg(n,$.trim(i))
}return
}var h=(j)?false:m;
if(TS.client.channelDisplaySwitched(n,j,h)){TS.mpims.pre_switched_sig.dispatch();
TS.mpims.switched_sig.dispatch()
}if(l.is_open){if(i){TS.mpims.sendMsg(n,$.trim(i))
}return
}TS.model.requested_mpim_opens[n]={and_send_txt:i};
var k=l.members.filter(function(o){return TS.model.user.id!==o
});
TS.api.call("mpim.open",{users:k.join(",")},TS.mpims.onOpened)
},setLastRead:function(j,h){if(j.last_read==h){return false
}if(h.indexOf(TS.utility.date.fake_ts_unique_padder)>-1){TS.error("bad ts:"+h);
return false
}if(j.last_read>h){var i=TS.model.last_reads_set_by_client[j.id+"_"+h];
delete TS.model.last_reads_set_by_client[j.id+"_"+h];
if(i){TS.warn("NOT going back in time mpim.last_read:"+j.last_read+" new:"+h);
return
}TS.info("going back in time mpim.last_read:"+j.last_read+" new:"+h)
}j.last_read=h;
TS.mpims.marked_sig.dispatch(j);
TS.mpims.calcUnreadCnts(j);
return true
},markMostRecentReadMsg:function(h,i){if(!h){TS.error("mpim unknown");
return
}if(!h.msgs||!h.msgs.length){return
}var j=TS.utility.msgs.getMostRecentValidTs(h.msgs);
if(!j){TS.warn("no valid tses???");
return
}h.all_read_this_session_once=true;
TS.mpims.markReadMsg(h.id,j,i)
},markReadMsg:function(k,h,j){var i=TS.mpims.getMpimById(k);
if(!i){TS.error('mpim "'+k+'" unknown');
return
}if(i.last_read==h){return
}if(TS.mpims.setLastRead(i,h)){i._marked_reason=j;
i.needs_api_marking=true
}},onMarked:function(i,k,h){var j=TS.mpims.getMpimById(h.channel);
if(!j){TS.error('wtf no mpim "'+h.channel+'"');
return
}if(!i){j.needs_api_marking=true
}},getMpimById:function(l){var h=TS.model.mpims;
var k=d[l];
if(k){return k
}if(!h){return null
}for(var j=0;
j<h.length;
j++){k=h[j];
if(k.id==l){TS.warn(l+" not in _id_map?");
d[l]=k;
return k
}}return null
},getMpimByName:function(j){j=TS.utility.getLowerCaseValue(j);
var h=TS.model.mpims;
var l=c[j];
if(l){return l
}if(!h){return null
}for(var k=0;
k<h.length;
k++){l=h[k];
if(l._name_lc==j){TS.warn(j+" not in _name_map?");
c[l._name_lc]=l;
c[l._internal_name]=l;
return l
}}return null
},getActiveMembers:function(i){var h=TS.mpims.getMembersInDisplayOrder(i);
return h.filter(function(j){return !j.deleted
})
},getMembersInDisplayOrder:function(k){if(!k){return
}if(k._members&&k._members.length===(k.members.length-1)){return k._members
}var h=[];
for(var j=0;
j<k.members.length;
j++){if(k.members[j]===TS.model.user.id){continue
}h.push(TS.members.getMemberById(k.members[j]))
}k._members=h;
return h
},getDisplayName:function(n,l,m){if(n._display_name&&!l&&!m){return n._display_name
}l=l||"";
var j=TS.mpims.getMembersInDisplayOrder(n);
var i=TS.model.prefs.display_real_names_override;
var h=(TS.model.team.prefs.display_real_names&&i!=-1)||i==1;
var k={};
if(h){j.forEach(function(q){if(q.profile.first_name){if(!k[q.profile.first_name]){k[q.profile.first_name]=[]
}k[q.profile.first_name].push(q)
}})
}var o=j.map(function(t){if(t.profile.first_name&&h){var s=t.profile.first_name;
var q=t.profile.last_name;
var r=s;
if(k[s]&&k[s].length>1&&q){r+=" "+q.charAt(0)+"."
}return m?TS.utility.htmlEntities(r):r
}else{return m?l+TS.utility.htmlEntities(t.name):l+t.name
}});
var p=o.join(", ");
if(!l&&!m){n._display_name=p
}return p
},getDisplayNameLowerCase:function(i){if(i._display_name_lc){return i._display_name_lc
}var h=TS.mpims.getDisplayName(i);
i._display_name_lc=TS.utility.getLowerCaseValue(h);
return i._display_name_lc
},getMpimArchivesPath:function(h){return"/archives/"+h.id
},getMemberCount:function(h){return h.members.length
},upsertMpim:function(n){var h=TS.model.mpims;
var m=TS.mpims.getMpimById(n.id);
if(TS.boot_data.feature_no_unread_counts){delete n.unread_count
}if(m){TS.log(4,'updating existing mpim "'+m.id+'"');
for(var j in n){if(j==="name"){continue
}m[j]=n[j]
}n=m;
if(TS.client&&(n.is_open||n.unread_cnt)){TS.shared.checkInitialMsgHistory(n,TS.mpims)
}}else{TS.log(4,'adding mpim "'+n.id+'"');
n._internal_name=n.name;
c[n._internal_name]=n;
g(n);
h.push(n);
if(n.is_mpim!==true){TS.warn(n.user+" lacked the is_mpim flag from the server");
n.is_mpim=true
}d[n.id]=n;
n.opened_this_session=false;
n.oldest_msg_ts=TS.storage.fetchOldestTs(n.id);
n.last_msg_input=TS.storage.fetchLastMsgInput(n.id);
n.scroll_top=-1;
n.history_is_being_fetched=false;
n.needs_api_marking=false;
n.unread_highlight_cnt=0;
n.unread_highlights=[];
n.unread_cnt=0;
n.unreads=[];
n.oldest_unread_ts=null;
n.has_fetched_history_after_scrollback=false;
if(TS.client){var i=TS.utility.msgs.fetchInitialMsgsFromLS(n);
TS.utility.msgs.setMsgs(n,i)
}else{if(TS.boot_data.msgs){TS.utility.msgs.ingestMessagesFromBootData(n)
}}}if(TS.client){var l=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.mpims.calcUnreadCnts(n,l)
}return n
},markScrollTop:function(j,h){var i=TS.mpims.getMpimById(j);
if(!i){return false
}if(i.scroll_top==h){return false
}i.scroll_top=h;
return true
},maybeLoadScrollBackHistory:function(j,i){var h=TS.mpims.getMpimById(j);
if(!h){return false
}return TS.shared.maybeLoadScrollBackHistory(h,TS.mpims,i)
},maybeLoadHistory:function(i){var h=TS.mpims.getMpimById(i);
if(!h){return false
}return TS.shared.maybeLoadHistory(h,TS.mpims)
},onHistory:function(i,k,h){var j=TS.mpims.getMpimById(h.channel);
if(!j){TS.error('wtf no mpim "'+h.channel+'"');
return
}if(!i||!k||!k.messages){TS.error("failed to get history");
(j.history_fetch_retries)?j.history_fetch_retries++:j.history_fetch_retries=1;
TS.mpims.history_fetched_sig.dispatch(j);
return
}delete j.history_fetch_retries;
var m=TS.shared.onHistory(j,k,h,TS.mpims);
if(!m){j.history_is_being_fetched=false;
TS.mpims.history_fetched_sig.dispatch(j)
}var l=TS.utility.msgs.shouldMarkUnreadsOnMessageFetch();
TS.mpims.calcUnreadCnts(j,l);
if(TS.view){if(!m&&j.unread_cnt){TS.client.channel_pane.rebuildImAndMpimList()
}}},fetchHistory:function(j,h,i){if(!j){TS.error('wtf no mpim "'+j+'"');
return
}j.history_is_being_fetched=true;
j.history_fetch_failed=false;
TS.mpims.history_being_fetched_sig.dispatch(j);
if(j.history_fetch_retries>5){delete j.history_fetch_retries;
j.history_is_being_fetched=false;
j.history_fetch_failed=true;
if(TS.client){TS.client.msg_pane.updateEndMarker()
}return
}TS.api.call("mpim.history",h,i||TS.mpims.onHistory)
},usernameChanged:function(n,h){var m;
var l,k;
for(l=0;
l<TS.model.mpims.length;
l++){m=TS.model.mpims[l];
for(k=0;
k<m.members.length;
k++){if(n.id===m.members[k]){g(m);
e(m)
}}}},checkMpimMatch:function(p,h,q){if(!p){return
}var m=true;
var r=true;
var n=TS.mpims.getMembersInDisplayOrder(p);
for(var o=0;
o<h.length;
o++){var k=false;
for(var l=0;
l<n.length;
l++){if(TS.members.checkMemberMatch(n[l],h[o],m)||TS.members.checkMemberMatch(n[l],q[o],m)){k=true
}}if(!k){r=false
}}return r
}});
var d={};
var c={};
var b=function(i){var h=TS.mpims.getMembersInDisplayOrder(i);
return"@"+h.map(function(j){return j.name
}).join(",")
};
var g=function(h){if(h._name_lc){delete c[h._name_lc]
}h.name=b(h);
h._name_lc=TS.utility.getLowerCaseValue(h.name);
c[h._name_lc]=h
};
var a=function(h){TS.model.mpims.forEach(function(i){if(i.members.indexOf(h.id)!==-1){e(i)
}})
};
var f=function(){TS.model.mpims.forEach(e)
};
var e=function(h){delete h._display_name;
delete h._display_name_lc
}
})();
(function(){TS.registerModule("shared",{msg_sent_sig:new signals.Signal(),onStart:function(){},calcUnreadCnts:function(a,g,r){a.unreads.length=0;
a.unread_highlights.length=0;
a.oldest_unread_ts=null;
var m=a.msgs;
var n=a.unread_cnt;
var h=a.unread_highlight_cnt;
var b;
var o=false;
var q=false;
var k=true;
var l=TS.model.user.presence=="away";
if(!a.was_archived_this_session){if(a.is_archived){k=false
}if(a.is_channel&&!a.is_member){k=false
}}if(a.is_im){var e=TS.members.getMemberById(a.user);
if(e&&e.deleted){k=false
}}var p=TS.notifs.isCorGMuted(a.id);
var j=(a.is_im)||(TS.boot_data.feature_mpim_client&&a.is_mpim)||TS.notifs.canCorGHaveChannelMentions(a.id);
if(k&&m){for(var d=0;
d<m.length;
d++){b=m[d];
if(b.ts<=a.last_read){continue
}if(TS.utility.msgs.isTempMsg(b)&&!b._alert_even_though_temp){continue
}q=TS.utility.msgs.msgCanCountAsUnread(b);
o=o||q;
if(!q){continue
}a.unreads.push(b.ts);
if(!a.oldest_unread_ts||b.ts<a.oldest_unread_ts){a.oldest_unread_ts=b.ts
}if(j){var c=parseFloat(b.ts)*1000;
var f=l||(c<TS.model.user._presence_last_changed);
if(TS.utility.msgs.msgContainsMention(b,f)){a.unread_highlights.push(b.ts)
}}else{if(TS.utility.msgs.getMsgMentionData(b).non_channel_mentions){a.unread_highlights.push(b.ts)
}}}}if(!o&&a.unreads.length){a.unreads.length=0;
a.unread_highlights.length=0;
a.oldest_unread_ts=null;
if(r){g.markMostRecentReadMsg(a,TS.model.marked_reasons.none_qualify)
}}a.unread_cnt=a.unreads.length;
if(p){if(a.unread_cnt){a._show_in_list_even_though_no_unreads=true
}}a.unread_highlight_cnt=a.unread_highlights.length;
TS.shared.maybeMarkReadIfMuted(a,g);
TS.utility.msgs.countAllUnreads();
if(n!=a.unread_cnt){g.unread_changed_sig.dispatch(a)
}if(h!=a.unread_highlight_cnt){g.unread_highlight_changed_sig.dispatch(a)
}},getLatestMsgTs:function(a){if(a.latest&&a.latest.ts){return a.latest.ts
}return a.latest
},checkInitialMsgHistory:function(a,f){if(a.history_is_being_fetched){TS.warn('checkInitialMsgHistory NOT DOING ANYTHING, because "'+a.name+'" history_is_being_fetched:true');
return
}var e=TS.model.initial_msgs_cnt;
var c=TS.shared.getLatestMsgTs(a);
if(!c){TS.shared.maybeDealWithAllSentTempMsgs(a,f)
}else{var b=TS.utility.msgs.getMsg(c,a.msgs);
if(b){TS.log(58,'we have all recent "'+a.id+'" "'+a.name+'" msgs unread_count:'+a.unread_count+" unread_cnt:"+a.unread_cnt+" initial_count:"+e);
TS.shared.maybeDealWithAllSentTempMsgs(a,f);
var d=TS.utility.msgs.getOlderMsgsStatus(a);
if(a.msgs.length<TS.model.initial_msgs_cnt&&d.more){TS.error("calling loadHistory because status.more=true && model_ob.msgs.length < TS.model.initial_msgs_cnt: "+a.msgs.length+" < "+TS.model.initial_msgs_cnt);
TS.dir(0,d,a.name);
TS.shared.loadHistory(a,f,e);
return true
}if(!TS.boot_data.feature_no_unread_counts){if(a.msgs.length<a.unread_count&&d.more){e=Math.min(TS.model.special_initial_msgs_cnt,(a.unread_count-a.msgs.length)+1);
TS.log(58,"calling loadHistory because model_ob.msgs.length < model_ob.unread_count");
TS.warn('setting special initial_count for "'+a.id+'" "'+a.name+'" to:'+e);
TS.shared.loadHistory(a,f,e);
return true
}}}else{TS.log(58,'WE DO NOT HAVE ALL RECENT MESSAGES for "'+a.id+'" "'+a.name+'" unread_count:'+a.unread_count+" unread_cnt:"+a.unread_cnt+" initial_count:"+e);
var h=false;
if(!TS.boot_data.feature_no_unread_counts&&a.unread_count>TS.model.initial_msgs_cnt){e=Math.min(TS.model.special_initial_msgs_cnt,a.unread_count);
TS.warn('setting special initial_count for "'+a.id+'" "'+a.name+'" to:'+e)
}else{if(!a.msgs.length){}}var i={channel:a.id,latest:c,count:e,inclusive:(typeof a.latest=="string")};
if(h){TS.log(58,'we have some but not all recent "'+a.id+'" "'+a.name+'" msgs but we no_oldest so are not setting oldest for api call')
}else{if(a.msgs.length&&!TS.utility.msgs.isTempMsg(a.msgs[0])){TS.log(58,'we have some but not all recent "'+a.id+'" "'+a.name+'" msgs');
i.oldest=a.msgs[0].ts
}else{TS.log(58,'we have no "'+a.id+'" msgs')
}}var g=function(){f.fetchHistory(a,i)
};
if(TS.model.ms_connected){g()
}else{TS.ms.connected_sig.addOnce(g)
}}}},maybeLoadScrollBackHistory:function(b,a,c){if(!c&&b.scroll_top!==0){return false
}if(!TS.utility.msgs.getOlderMsgsStatus(b).more){return false
}if(!b.msgs.length){return
}TS.info(b.id+" HAS MORE");
TS.shared.loadHistory(b,a);
b.has_fetched_history_after_scrollback=true;
b.fetched_history_after_scrollback_time=Date.now();
return true
},maybeLoadHistory:function(b,a){if(!TS.utility.msgs.getOlderMsgsStatus(b).more){return false
}TS.info(b.id+" HAS MORE");
TS.shared.loadHistory(b,a);
return true
},loadHistory:function(b,a,d){var c={channel:b.id,latest:b.msgs[b.msgs.length-1].ts,count:d||TS.model.subsequent_msgs_cnt};
a.fetchHistory(b,c)
},onSendMsg:function(e,v,o,n){var c=TS.utility.msgs.getMsgByRspId(v.reply_to,o.msgs);
if(!e){if(c){TS.model.unsent_msgs[c.ts]=true;
n.msg_not_sent_sig.dispatch(o,c,v)
}else{TS.error("that makes no sense")
}return
}TS.view.scroll_down_when_msg_from_user_is_added=true;
var m;
if(c){m=TS.utility.clone(c);
m.text=v.text;
m.ts=v.ts;
delete m.rsp_id;
n.removeMsg(o.id,c)
}else{TS.warn("no temp msg for "+v.reply_to);
m={text:v.text,user:TS.model.user.id,ts:v.ts}
}n.addMsg(v.SENT_MSG.channel||o.id,TS.utility.msgs.processImsg(m,o.id));
TS.client.ui.maybeHandleSingleEmoji(v.text);
TS.prefs.recordEmojiUse(v.text);
var p;
var u;
var a=TS.utility.date.makeTsStamp();
if(o.is_channel){u="channel";
p=TS.channels.getActiveMembersNotInThisChannelForInviting(o.id)
}else{if(o.is_group&&!o.is_mpim){u=TS.templates.builders.groupCopy();
p=TS.groups.getActiveMembersNotInThisGroupForInviting(o.id)
}else{return
}}if(!p.length){return
}if(TS.boot_data.feature_subteams){var t=v.text.match(/<!subteam\^(.*?)>/g);
if(t){for(var q=0;
q<t.length;
q++){var r=t[q].replace(">","").replace("<","");
r=r.split("|")[0];
var j=r.split("^")[1];
if(!j){continue
}TS.user_groups.getUserGroupMembers(j,function(E,A){var F=[];
var G=A.users;
for(var y=0;
y<G.length;
y++){var z=TS.members.getMemberById(G[y]);
if(p.indexOf(z)==-1){continue
}if(F.indexOf(z)>-1){continue
}F.push(z)
}if(!F.length){return
}var C=F.map(function(I){return I.id
});
var i="<!subteam^"+j+">";
var D=F.length;
var k="TS.client.ui.promptForGroupOrChannelInvite('"+o.id+"', '"+C.join(",")+"', '"+a+"')";
var H="TS.client.ui.sendChannelMsgThroughSlackBot('"+o.id+"', '"+v.ts+"', '"+C.join(",")+"', '"+a+"')";
var B="TS.utility.msgs.removeEphemeralMsg('"+o.id+"', '"+a+"')";
TS.client.msg_pane.addMaybeClick(k,TS.client.ui.promptForGroupOrChannelInvite.bind(Object.create(null),o.id,C.join(","),a));
TS.client.msg_pane.addMaybeClick(H,TS.client.ui.sendChannelMsgThroughSlackBot.bind(Object.create(null),o.id,v.ts,C.join(","),a));
TS.client.msg_pane.addMaybeClick(B,TS.utility.msgs.removeEphemeralMsg.bind(Object.create(null),o.id,a));
TS.client.ui.addEphemeralBotMsg({channel:o.id,ts:a,text:"You mentioned the "+i+" user group, but "+D+(D===1?" member":" members")+" of this user group"+(D===1?" is":" are")+" not in this "+u+". If you'd like I can <javascript:"+H+"|send them a link to this message>? Or, <javascript:"+B+"|do nothing>."})
})
}}}var x=v.text.match(/<@(.*?)>/g);
var f=[];
var b;
var s;
if(x){for(s=0;
s<x.length;
s++){b=TS.utility.msgs.getMemberFromMemberMarkup(x[s].replace(">","").replace("<",""));
if(p.indexOf(b)==-1){continue
}if(f.indexOf(b)>-1){continue
}f.push(b)
}}if(!f.length){return
}var d="";
var w=[];
for(s=0;
s<f.length;
s++){if(s!==0){if(s==f.length-1){if(f.length>2){d+=","
}d+=" and "
}else{d+=", "
}}d+="<@"+f[s].id+">";
w.push(f[s].id)
}var l="TS.client.ui.promptForGroupOrChannelInvite('"+o.id+"', '"+w.join(",")+"', '"+a+"')";
var h="TS.client.ui.sendChannelMsgThroughSlackBot('"+o.id+"', '"+v.ts+"', '"+w.join(",")+"', '"+a+"')";
var g="TS.utility.msgs.removeEphemeralMsg('"+o.id+"', '"+a+"')";
TS.client.msg_pane.addMaybeClick(l,TS.client.ui.promptForGroupOrChannelInvite.bind(Object.create(null),o.id,w.join(","),a));
TS.client.msg_pane.addMaybeClick(h,TS.client.ui.sendChannelMsgThroughSlackBot.bind(Object.create(null),o.id,v.ts,w.join(","),a));
TS.client.msg_pane.addMaybeClick(g,TS.utility.msgs.removeEphemeralMsg.bind(Object.create(null),o.id,a));
TS.client.ui.addEphemeralBotMsg({channel:o.id,ts:a,text:"You mentioned "+d+", but they're not in this "+u+". Would you like to <javascript:"+l+"|invite them to join>"+(o.is_group?"?":" or have slackbot <javascript:"+h+"|send them a link to your message>?")+" Or, <javascript:"+g+"|do nothing>."})
},sendMsg:function(d,f,b){if(!f){return false
}var e=TS.utility.date.makeTsStamp();
f=TS.format.cleanMsg(f);
if(f.indexOf("DELEEEEETETEEESTTTT")===0){TS.ms.disconnect()
}var c=TS.ms.send({type:"message",channel:d,text:$.trim(f)},b.onSendMsg,e);
var a=TS.shared.getModelObById(d);
TS.typing.userEnded(a);
b.addMsg(d,{type:"message",text:f,user:TS.model.user.id,ts:e,rsp_id:c});
TS.shared.msg_sent_sig.dispatch(a,c);
return true
},onHistory:function(c,h,e,b){var g=c.msgs;
var d;
if(h.is_limited){h.has_more=false;
c.is_limited=true
}if(e.oldest){if(h.has_more){TS.info(c.name+" has more than one page of msg history between what is in cache and the latest, so let's dump what we have and just use this page of results");
TS.info(c.name+" args.oldest:"+e.oldest);
g.length=0
}}var a=[];
if(h.messages){for(var f=0;
f<h.messages.length;
f++){if(!TS.utility.msgs.getMsg(h.messages[f].ts,g)){d=h.messages[f];
a.push(TS.utility.msgs.processImsgFromHistory(d,c.id))
}}}if(a.length&&!TS.utility.msgs.getDisplayedMsgs(a).length){TS.warn("no displayed msgs in this page for "+c.id+' "'+c.name+'"! We expect TS.client.ui.afterHistoryFetch to detect this and load another page')
}g=TS.utility.msgs.setMsgs(c,a.concat(g));
TS.log(4,c.id+" msgs has more history now");
if(c.latest&&c.latest.ts&&!TS.utility.msgs.getMsg(c.latest.ts,g)){TS.log(4,"tacking on latest msg "+c.latest.ts);
d=c.latest;
TS.utility.msgs.appendMsg(g,TS.utility.msgs.processImsgFromHistory(d,c.id));
TS.utility.msgs.sortMsgs(g);
TS.utility.msgs.maybeStoreMsgs(c.id,g)
}if(!e.oldest){if(!h.has_more&&!h.is_limited){TS.utility.msgs.setOldestMsgsTs(c)
}}TS.shared.maybeDealWithAllSentTempMsgs(c,b)
},maybeDealWithAllSentTempMsgs:function(a,h){if(!TS.ms){return
}for(var f in TS.ms.sent_map){var b=TS.ms.sent_map[f];
if(b.msg.channel!=a.id){continue
}var i=b.temp_ts;
var c=TS.utility.msgs.getMsg(i,a.msgs);
if(!c){continue
}var e=TS.utility.msgs.getNonTempMsgFromUserMatchingText(b.msg.text,TS.model.user.id,a.msgs);
if(e){var d=TS.utility.date.toDateObject(e.ts);
var g=TS.utility.date.toDateObject(i);
if(d<g){TS.info("existing_msg time is older than temp_msg time, so it cant be the message we were looking for");
e=null
}}if(!e){TS.warn("not removing, we dont appear to have this non-temp message:"+b.msg.text);
TS.model.unsent_msgs[c.ts]=true;
h.msg_not_sent_sig.dispatch(a,c);
continue
}TS.info("removing temp_msg:"+c.ts+" "+c.text+" existing_msg:"+e.ts+" "+e.text);
delete TS.ms.sent_map[f];
if(a.is_channel){TS.channels.removeMsg(a.id,c)
}else{if(TS.boot_data.feature_mpim_client&&a.is_mpim){TS.mpims.removeMsg(a.id,c)
}else{if(a.is_group){TS.groups.removeMsg(a.id,c)
}else{TS.ims.removeMsg(a.id,c)
}}}}},getActiveModelOb:function(){var a;
if(TS.client){if(TS.model.active_channel_id){a=TS.channels.getChannelById(TS.model.active_channel_id)
}else{if(TS.model.active_im_id){a=TS.ims.getImById(TS.model.active_im_id)
}else{if(TS.boot_data.feature_mpim_client&&TS.model.active_mpim_id){a=TS.mpims.getMpimById(TS.model.active_mpim_id)
}else{if(TS.model.active_group_id){a=TS.groups.getGroupById(TS.model.active_group_id)
}else{}}}}}else{if(TS.boot_data.channel_id){a=TS.channels.getChannelById(TS.boot_data.channel_id)
}else{if(TS.boot_data.im_id){a=TS.ims.getImById(TS.boot_data.im_id)
}else{if(TS.boot_data.feature_mpim_client&&TS.boot_data.mpim_id){a=TS.mpims.getMpimById(TS.boot_data.mpim_id)
}else{if(TS.boot_data.group_id){a=TS.groups.getGroupById(TS.boot_data.group_id)
}else{TS.warn("WTF getActiveModelOb found no ob");
TS.warn("TS.boot_data.channel_id: "+TS.boot_data.channel_id);
TS.warn("TS.boot_data.im_id: "+TS.boot_data.im_id);
TS.warn("TS.boot_data.group_id: "+TS.boot_data.group_id)
}}}}}return a
},getModelObById:function(a){if(!a){return null
}if(a.charAt(0)==="C"){return TS.channels.getChannelById(a)
}else{if(a.charAt(0)==="G"){return TS.mpims.getMpimById(a)||TS.groups.getGroupById(a)
}else{return TS.ims.getImById(a)
}}},getAllModelObsForUser:function(){return TS.channels.getChannelsForUser().concat(TS.model.groups.concat(TS.model.ims))
},getShareModelObId:function(b,e){var c;
var d;
var a=function(f){if(TS.model.archive_view_is_showing&&TS.client.archives.current_model_ob.id==f){TS.client.archives.cancel()
}};
if(b&&b.charAt(0)==="U"){c=TS.ims.getImByMemberId(b);
if(!c){TS.api.call("im.open",{user:b},function(f,g){if(f){c=TS.ims.getImByMemberId(b);
if(c){e(c.id)
}else{if(TS.web){e(g.channel.id)
}else{TS.error("getShareModelObId opened an IM, but it is not in the model? data.channel.id: "+g.channel.id)
}}}else{TS.error("getShareModelObId try to open an IM, but failed data: "+JSON.stringify(g||null))
}})
}else{b=c.id;
a(b);
e(b)
}}else{if(b&&b.charAt(0)==="C"){d=TS.channels.getChannelById(b);
if(!d.is_member&&!d.is_archived){TS.channels.join(d.name,function(g,h,f){if(g){e(b)
}else{e(b)
}})
}else{a(b);
e(b)
}}else{a(b);
e(b)
}}},getModelObIdForSendingMsg:function(d,c){var a;
var b;
if(d&&d.charAt(0)==="U"){a=TS.ims.getImByMemberId(d);
if(!a){TS.api.call("im.open",{user:d},function(e,f){if(e){a=TS.ims.getImByMemberId(d);
if(a){c(a.id)
}else{if(TS.web){c(f.channel.id)
}else{TS.error("getModelObIdForSendingMsg opened an IM, but it is not in the model? data.channel.id: "+f.channel.id)
}}}else{TS.error("getModelObIdForSendingMsg try to open an IM, but failed data: "+JSON.stringify(f||null))
}})
}else{d=a.id;
c(d)
}}else{if(d&&d.charAt(0)==="C"){b=TS.channels.getChannelById(d);
if(!b.is_member&&!b.is_archived){TS.channels.join(b.name,function(f,g,e){if(f){c(d)
}else{c(d)
}})
}else{c(d)
}}else{c(d)
}}},maybeMarkReadIfMuted:function(b,a){if(!b){return
}if(!TS.notifs.isCorGMuted(b.id)){return
}if(!b.unreads.length||b.unread_highlights.length){return
}if(TS.model.prefs.sidebar_behavior=="hide_read_channels"){if(TS.model.active_cid==b.id){return
}}else{if(TS.model.prefs.sidebar_behavior=="hide_read_channels_unless_starred"&&!b.is_starred){if(TS.model.active_cid==b.id){return
}}}if(b.is_group){TS.groups.markMostRecentReadMsg(b,TS.model.marked_reasons.muted)
}else{TS.channels.markMostRecentReadMsg(b,TS.model.marked_reasons.muted)
}},closeArchivedChannel:function(b){var a=TS.shared.getModelObById(b);
if(!a){return
}if(!a.is_archived){return
}a.was_archived_this_session=false;
TS.client.activeChannelDisplayGoneAway()
},getLastMsg:function(a){if(!a.msgs||a.msgs.length===0){return null
}for(var b=0;
b<a.msgs.length;
b++){if(!a.msgs[b].no_display&&!a.msgs[b].is_ephemeral){return a.msgs[b]
}}return null
},sorterByLastMsg:function(d,c){var h=d&&TS.shared.getLastMsg(d);
var f=c&&TS.shared.getLastMsg(c);
var g;
var e;
if(h){g=parseFloat(h.ts)
}else{if(d){g=TS.shared.getLatestMsgTs(d);
if(g){g=parseFloat(g)
}}}if(f){e=parseFloat(f.ts)
}else{if(c){e=TS.shared.getLatestMsgTs(c);
if(e){e=parseFloat(e)
}}}if(g&&e){if(g>e){return -1
}if(e>g){return 1
}}else{if(g){return -1
}if(e){return 1
}}return 0
},hasUnreads:function(a){if(!a){return false
}if(!TS.boot_data.feature_no_unread_counts){return !!a.unread_count
}var b=TS.shared.getLatestMsgTs(a);
if(!b){return false
}return(b>a.last_read)
},checkForOldImsToClose:function(){var o=TS.model.ims;
var d=TS.model.mpims;
var g=o.concat(d);
var a;
var j;
var l;
var m;
var f;
var c=0;
var e=11;
var h=1000*60*60*168;
for(f=0;
f<g.length;
f++){a=g[f];
if(!a.is_open&&!a.unread_cnt){continue
}c++
}var k=c-e;
if(k<1){return
}TS.info("checkForOldImsToClose might close some. this_too_many:"+k);
var n=[];
for(f=0;
f<g.length;
f++){a=g[f];
if(a.is_slackbot_im){continue
}if(!a.is_open){continue
}if(a.unread_cnt){continue
}if(a.is_starred){continue
}if(a.opened_this_session){continue
}j=TS.shared.getLatestMsgTs(a)||"";
if(a.msgs&&a.msgs.length&&a.msgs[0]&&a.msgs[0].ts>j){j=a.msgs[0].ts
}if(j){l=TS.utility.date.toDateObject(j)
}else{l=new Date(a.created*1000)
}m=new Date()-l;
if(m>h){TS.info(a.name+" "+l+" ms_since_activity:"+m+" allow_elapsed_ms:"+h);
n.push({model_ob:a,ms_since_activity:m})
}}if(!n.length){TS.info("checkForOldImsToClose found no candidates for closing")
}n.sort(function b(p,i){var q=p.ms_since_activity;
var r=i.ms_since_activity;
if(q<r){return 1
}if(q>r){return -1
}return 0
});
n.length=(n.length>k)?k:n.length;
for(f=0;
f<n.length;
f++){a=n[f].model_ob;
TS.warn("checkForOldImsToClose CLOSING:"+a.name+" ms_since_activity:"+n[f].ms_since_activity);
if(a.is_im){TS.ims.closeIm(a.id)
}else{if(a.is_mpim){TS.mpims.closeMpim(a.id)
}}}}})
})();
(function(){TS.registerModule("members",{status_changed_sig:new signals.Signal(),presence_changed_sig:new signals.Signal(),ds_presence_changed_sig:new signals.Signal(),user_color_changed_sig:new signals.Signal(),joined_team_sig:new signals.Signal(),changed_name_sig:new signals.Signal(),changed_real_name_sig:new signals.Signal(),changed_deleted_sig:new signals.Signal(),changed_profile_sig:new signals.Signal(),changed_tz_sig:new signals.Signal(),changed_account_type_sig:new signals.Signal(),changed_admin_perms_sig:new signals.Signal(),changed_self_sig:new signals.Signal(),members_for_user_changed_sig:new signals.Signal(),onStart:function(){TS.members.maybeStoreMembers=TS.utility.throttleFunc(TS.members.maybeStoreMembers,100)
},getMemberById:function(q){var n=TS.model.members;
var p=d[q];
if(p){return p
}for(var o=0;
o<n.length;
o++){p=n[o];
if(p.id==q){TS.warn(q+" not in _id_map");
d[q]=p;
return p
}}return null
},getMemberByName:function(o){o=TS.utility.getLowerCaseValue(o);
var n=TS.model.members;
var q=k[o];
if(q){return q
}for(var p=0;
p<n.length;
p++){q=n[p];
if(q._name_lc==o||"@"+q._name_lc==o){TS.warn(o+" not in _name_map?");
k[o]=q;
k["@"+o]=q;
return q
}}return null
},getMemberByEmail:function(o){o=TS.utility.getLowerCaseValue(o);
var n=TS.model.members;
var q;
for(var p=0;
p<n.length;
p++){q=n[p];
if(!q.profile){continue
}if(!q.profile.email){continue
}if(TS.utility.getLowerCaseValue(q.profile.email)==o){return q
}}return null
},getMemberByRealName:function(o,q){o=TS.utility.getLowerCaseValue(o);
if(q){o=o.replace(/\s/g,"")
}if(!o){return null
}var n=TS.model.members;
var r=(q)?f[o]:b[o];
if(r){return r
}for(var p=0;
p<n.length;
p++){r=n[p];
if(r._real_name_lc){if(q){if(r._real_name_lc_no_spaces==o){TS.warn(o+" not in _real_name_lc_no_spaces?");
f[o]=r;
return r
}}else{if(r._real_name_lc==o){TS.warn(o+" not in _real_name_map?");
b[o]=r;
return r
}}}}return null
},upsertAndSignal:function(p){var o=TS.members.upsertMember(p);
if(o.status=="CHANGED"){if(o.what_changed.indexOf("profile")!=-1){TS.members.changed_profile_sig.dispatch(o.member)
}if(o.what_changed.indexOf("is_restricted")!=-1||o.what_changed.indexOf("is_ultra_restricted")!=-1){TS.members.changed_account_type_sig.dispatch(o.member)
}if(o.what_changed.indexOf("real_name")!=-1){TS.members.changed_real_name_sig.dispatch(o.member)
}if(o.what_changed.indexOf("name")!=-1){TS.members.changed_name_sig.dispatch(o.member)
}if(o.what_changed.indexOf("tz")!=-1){TS.members.changed_tz_sig.dispatch(o.member)
}if(o.what_changed.indexOf("deleted")!=-1){TS.members.changed_deleted_sig.dispatch(o.member);
var n=TS.ims.getImByMemberId(o.member.id);
if(n){TS.ims.calcUnreadCnts(n,true)
}TS.channels.calcActiveMembersForAllChannels();
TS.groups.calcActiveMembersForAllGroups()
}if(o.what_changed.indexOf("presence")!=-1){TS.members.presence_changed_sig.dispatch(o.member)
}if(o.what_changed.indexOf("is_admin")!=-1){TS.members.changed_admin_perms_sig.dispatch(o.member)
}if(p.is_self){TS.members.changed_self_sig.dispatch(o.member);
TS.model.makeYouRegex()
}}return o
},upsertMember:function(s,p){var q=TS.model.members;
var v=TS.members.getMemberById(s.id);
var r="NOOP";
var t=[];
if(s.is_ultra_restricted){s.is_restricted=true
}if(v){TS.log(4,'updating existing member "'+s.id+'"');
for(var o in s){if(o=="profile"){if(s[o]&&!TS.utility.areSimpleObjectsEqual(s[o],v[o],"member:"+s.id+" "+s.name)){var n=false;
if(!v.profile||s.profile.real_name!=v.profile.real_name){n=true;
delete b[v._real_name_lc];
delete f[v._real_name_lc_no_spaces]
}v.profile=s.profile;
if(n){TS.members.setLowerCaseNamesForMemberProfile(v);
b[v._real_name_lc]=v;
f[v._real_name_lc_no_spaces]=v
}r="CHANGED";
t.push(o)
}}else{if(v[o]!=s[o]){if(s[o]&&!TS.utility.isScalar(s[o])){v[o]=s[o];
TS.warn(o+" is not scalar! it needs to be handled by upsertMember specifically to test if it has changed! "+(typeof s[o]))
}else{if(typeof s[o]!="boolean"||!s[o]!=!v[o]){t.push(o);
var u=v[o];
v[o]=s[o];
r="CHANGED";
if(o=="name"){TS.members.usernameChanged(v,u)
}else{if(o=="real_name"){TS.members.realNameChanged(v,u)
}}}}}}}s=v
}else{if(s.id){r="ADDED";
if(s.id=="USLACKBOT"){s.is_slackbot=true
}s.member_color=s.color;
if(TS.model.user_colors[s.id]){TS.members.setMemberUserColor(s,TS.model.user_colors[s.id])
}TS.log(4,'adding member "'+s.id+'" color:'+s.color+" member_color:"+s.member_color);
s._first_name_lc="";
s._last_name_lc="";
s._real_name_normalized_lc="";
TS.members.setLowerCaseNamesForMemberProfile(s);
s._name_lc=TS.utility.getLowerCaseValue(s.name);
s._real_name_lc=TS.utility.getLowerCaseValue(s.real_name);
s._real_name_lc_no_spaces=s._real_name_lc.replace(/\s/g,"");
d[s.id]=s;
k[s._name_lc]=s;
k["@"+s._name_lc]=s;
b[s._real_name_lc]=s;
f[s._real_name_lc_no_spaces]=s;
s.files=[];
s.activity=[];
s.stars=[];
s.mentions=[];
q.push(s)
}else{TS.error("bad error, no member.id")
}}if(s.is_self&&s.deleted){TS.info("calling TS.reload() because member.is_self && member.deleted");
TS.reload(null,"TS.reload() because member.is_self && member.deleted");
return
}g();
j();
if(r=="ADDED"||r=="CHANGED"){TS.members.maybeStoreMembers()
}return{status:r,member:s,what_changed:t}
},setMemberUserColor:function(o,n){n=TS.utility.htmlEntities(n);
o.member_color=n||o.color;
if(n&&n!=o.color){TS.model.user_colors[o.id]=n
}else{delete TS.model.user_colors[o.id]
}TS.members.user_color_changed_sig.dispatch(o)
},setUserStatus:function(n){TS.api.call("status.set",{status:n},TS.members.onUserStatusSet)
},onUserStatusSet:function(n,o){if(!n){return
}},toggleUserPresence:function(){TS.api.call("presence.set",{presence:(TS.model.user.presence=="away")?"active":"away"},TS.members.onUserPresenceSet)
},onUserPresenceSet:function(n,o){if(!n){return
}},usernameChanged:function(o,n){delete k[n];
delete k["@"+n];
o._name_lc=TS.utility.getLowerCaseValue(o.name);
k[o._name_lc]=o;
k["@"+o._name_lc]=o;
TS.ims.usernameChanged(o,n);
if(TS.boot_data.feature_mpim_client){TS.mpims.usernameChanged(o,n)
}},realNameChanged:function(o,n){if(n){delete b[n];
delete f[n.replace(/\s/g,"")]
}o._real_name_lc=TS.utility.getLowerCaseValue(o.real_name);
o._real_name_lc_no_spaces=o._real_name_lc.replace(/\s/g,"");
b[o._real_name_lc]=o;
f[o._real_name_lc_no_spaces]=o
},setLowerCaseNamesForMemberProfile:function(o){if(!o.profile){return
}if("first_name" in o.profile){o._first_name_lc=TS.utility.getLowerCaseValue(o.profile.first_name)
}if("last_name" in o.profile){o._last_name_lc=TS.utility.getLowerCaseValue(o.profile.last_name)
}if("real_name_normalized" in o.profile){o._real_name_normalized_lc=TS.utility.getLowerCaseValue(o.profile.real_name_normalized)
}if("real_name" in o.profile){o._real_name_lc=TS.utility.getLowerCaseValue(o.profile.real_name);
o._real_name_lc_no_spaces=o._real_name_lc.replace(/\s/g,"");
var n=o.real_name;
o.real_name=o.profile.real_name;
TS.members.realNameChanged(o,n)
}},getMyChannelsThatThisMemberIsNotIn:function(t){var p=[];
var s=TS.members.getMemberById(t);
if(!s){return p
}var r;
var o=TS.model.channels;
channel_loop:for(var q=0;
q<o.length;
q++){r=o[q];
if(!r.is_member){continue
}for(var n=0;
n<r.members.length;
n++){if(r.members[n]==t){continue channel_loop
}}p.push(r)
}return p
},getMyGroupsThatThisMemberIsNotIn:function(s){var o=[];
var r=TS.members.getMemberById(s);
if(!r){return o
}var q;
group_loop:for(var p=0;
p<TS.model.groups.length;
p++){q=TS.model.groups[p];
if(q.is_archived){continue
}for(var n=0;
n<q.members.length;
n++){if(q.members[n]==s){continue group_loop
}}o.push(q)
}return o
},getActiveMembersWithSelfAndNotSlackbot:function(){var n=i;
if(!n.length){n=i=a(n,TS.members.getMembersForUser(),false,false)
}return n
},getActiveMembersExceptSelfAndSlackbot:function(){var n=m;
if(!n.length){n=m=a(n,TS.members.getMembersForUser(),true,false)
}return n
},getActiveMembersWithSelfAndSlackbot:function(){var n=e;
if(!n.length){n=e=a(n,TS.members.getMembersForUser(),false,true)
}return n
},getActiveMembersWithSlackbotAndNotSelf:function(){var n=c;
if(!n.length){n=c=a(n,TS.members.getMembersForUser(),true,true)
}return n
},getMembersForUser:function(){if(!TS.model.user.is_restricted){return TS.model.members
}var o=l;
if(!o.length){var q;
var p=TS.model.members;
for(var n=0;
n<p.length;
n++){q=p[n];
if(q.deleted){continue
}if(!TS.members.canUserSeeMember(q)){continue
}o.push(q)
}}return o
},canUserSeeMember:function(n){if(!TS.model.user.is_restricted){return true
}else{if(n.is_self){return true
}else{if(n.is_slackbot){return true
}else{if(TS.ims.getImByMemberId(n.id)){return true
}else{if(TS.members.memberIsInAChannelIAmIn(n)){return true
}else{if(TS.members.memberIsInAGroupIAmIn(n)){return true
}}}}}}return false
},memberIsInAChannelIAmIn:function(p){var n=TS.channels.getChannelsForUser();
for(var o=0;
o<n.length;
o++){if(!n[o].is_member){continue
}if(n[o].members.indexOf(p.id)!=-1){return true
}}return false
},memberIsInAGroupIAmIn:function(p){var n=TS.model.groups;
for(var o=0;
o<n.length;
o++){if(n[o].is_archived){continue
}if(n[o].members.indexOf(p.id)!=-1){return true
}}return false
},getMemberDisplayNameById:function(p,n){var o=TS.members.getMemberById(p);
return o?TS.members.getMemberDisplayName(o,n):p
},getMemberDisplayName:function(p,o){if(!p){return"NO MEMBER??"
}if(!TS.model.team){return p.name
}var n=TS.model.prefs.display_real_names_override;
if((TS.model.team.prefs.display_real_names&&n!=-1)||n==1){if(p.real_name){if(o){return TS.utility.htmlEntities(p.real_name)
}return p.real_name
}else{return p.name
}}return p.name
},getMemberDisplayNameLowerCase:function(p,o){if(!p){return"NO MEMBER??"
}if(!TS.model.team){return p._name_lc
}var n=TS.model.prefs.display_real_names_override;
if((TS.model.team.prefs.display_real_names&&n!=-1)||n==1){if(p.real_name){if(o){return TS.utility.htmlEntities(p._real_name_lc)
}return p._real_name_lc
}}return p._name_lc
},invalidateMembersUserCanSeeArrayCaches:function(){g()
},canMemberPostInGeneral:function(n){if(!n){return false
}if(n.is_restricted){return(TS.model.team.prefs.who_can_post_general=="ra")
}if(TS.model.team.prefs.who_can_post_general=="ra"){return true
}if(TS.model.team.prefs.who_can_post_general=="regular"){return true
}if(TS.model.team.prefs.who_can_post_general=="admin"){return !!n.is_admin
}if(TS.model.team.prefs.who_can_post_general=="owner"){return !!n.is_owner
}return true
},canUserAtEveryone:function(){if(TS.model.user.is_restricted){return(TS.model.team.prefs.who_can_at_everyone=="ra")
}if(TS.model.team.prefs.who_can_at_everyone=="ra"){return true
}if(TS.model.team.prefs.who_can_at_everyone=="regular"){return true
}if(TS.model.team.prefs.who_can_at_everyone=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_at_everyone=="owner"){return !!TS.model.user.is_owner
}return true
},canUserAtChannelOrAtGroup:function(){if(TS.model.user.is_restricted){return(TS.model.team.prefs.who_can_at_channel=="ra")
}if(TS.model.team.prefs.who_can_at_channel=="ra"){return true
}if(TS.model.team.prefs.who_can_at_channel=="regular"){return true
}if(TS.model.team.prefs.who_can_at_channel=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_at_channel=="owner"){return !!TS.model.user.is_owner
}return true
},canUserUseSlashCommands:function(){if(TS.model.team.prefs.who_can_use_slash_commands==="ra"){return !TS.model.user.is_ultra_restricted
}if(TS.model.team.prefs.who_can_use_slash_commands==="regular"){return !TS.model.user.is_restricted
}if(TS.model.team.prefs.who_can_use_slash_commands==="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_use_slash_commands==="owner"){return !!TS.model.user.is_owner
}return true
},canUserManageIntegrations:function(){if(TS.model.user.is_restricted){return false
}if(TS.model.team.prefs.who_can_manage_integrations==="regular"){return true
}if(TS.model.team.prefs.who_can_manage_integrations==="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_manage_integrations==="owner"){return !!TS.model.user.is_owner
}return true
},canUserCreateChannels:function(){if(TS.model.user.is_restricted){return false
}if(TS.model.team.prefs.who_can_create_channels=="regular"){return true
}if(TS.model.team.prefs.who_can_create_channels=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_create_channels=="owner"){return !!TS.model.user.is_owner
}return true
},canUserArchiveChannels:function(){if(TS.model.user.is_restricted){return false
}if(TS.model.team.prefs.who_can_archive_channels=="regular"){return true
}if(TS.model.team.prefs.who_can_archive_channels=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_archive_channels=="owner"){return !!TS.model.user.is_owner
}return true
},canUserCreateGroups:function(){if(TS.model.user.is_ultra_restricted){return false
}if(TS.model.user.is_restricted){return(TS.model.team.prefs.who_can_create_groups=="ra")
}if(TS.model.team.prefs.who_can_create_groups=="ra"){return true
}if(TS.model.team.prefs.who_can_create_groups=="regular"){return true
}if(TS.model.team.prefs.who_can_create_groups=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_create_groups=="owner"){return !!TS.model.user.is_owner
}return true
},canUserCreateAndDeleteUserGroups:function(){if(!TS.boot_data.feature_subteams){return false
}if(TS.model.user.is_restricted){return false
}if(TS.model.team.prefs.who_can_create_delete_user_groups=="regular"){return true
}if(TS.model.team.prefs.who_can_create_delete_user_groups=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_create_delete_user_groups=="owner"){return !!TS.model.user.is_owner
}return true
},canUserEditUserGroups:function(){if(!TS.boot_data.feature_subteams){return false
}if(TS.model.user.is_restricted){return false
}if(TS.model.team.prefs.who_can_edit_user_groups=="regular"){return true
}if(TS.model.team.prefs.who_can_edit_user_groups=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_edit_user_groups=="owner"){return !!TS.model.user.is_owner
}return true
},canUserPostInGeneral:function(){return TS.members.canMemberPostInGeneral(TS.model.user)
},canUserKickFromChannels:function(){if(TS.model.user.is_restricted){return false
}if(TS.model.team.prefs.who_can_kick_channels=="regular"){return true
}if(TS.model.team.prefs.who_can_kick_channels=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_kick_channels=="owner"){return !!TS.model.user.is_owner
}return true
},canUserKickFromGroups:function(){if(TS.model.user.is_restricted){return false
}if(TS.model.team.prefs.who_can_kick_groups=="regular"){return true
}if(TS.model.team.prefs.who_can_kick_groups=="admin"){return !!TS.model.user.is_admin
}if(TS.model.team.prefs.who_can_kick_groups=="owner"){return !!TS.model.user.is_owner
}return true
},memberSorterByActive:function(o,n){if(o.presence!=n.presence){if(o.presence=="active"){return -1
}if(n.presence=="active"){return 1
}}var p=TS.members.getMemberDisplayNameLowerCase(o);
var q=TS.members.getMemberDisplayNameLowerCase(n);
if(p<q){return -1
}if(p>q){return 1
}return 0
},memberSorterByActiveWithBotsLast:function(o,n){if(o.presence!=n.presence){if(o.presence=="active"){return -1
}if(n.presence=="active"){return 1
}}var s=o.is_bot||o.is_slackbot;
var q=n.is_bot||n.is_slackbot;
if(s!==q){if(!s){return -1
}if(!q){return 1
}}var p=TS.members.getMemberDisplayNameLowerCase(o);
var r=TS.members.getMemberDisplayNameLowerCase(n);
if(p<r){return -1
}if(p>r){return 1
}return 0
},memberSorterByName:function(o,n){var p=TS.members.getMemberDisplayNameLowerCase(o);
var q=TS.members.getMemberDisplayNameLowerCase(n);
if(p<q){return -1
}if(p>q){return 1
}return 0
},checkMemberMatch:function(p,o,n){return(p.name&&p.name.match(o))||(!n&&p.profile&&p.profile.email&&p.profile.email.match(o))||(p.profile&&p.profile.real_name_normalized&&p.profile.real_name_normalized.match(o))||(p.profile&&p.profile.real_name&&p.profile.real_name.match(o))
},prepareMembersForLS:function(){var q=[];
var o;
var r;
var n;
var p;
for(p=0;
p<TS.model.members.length;
p++){r=TS.model.members[p];
o={};
q.push(o);
for(n in r){if(n=="files"){continue
}if(n=="activity"){continue
}if(n=="stars"){continue
}if(n=="mentions"){continue
}if(n.indexOf("_")===0){continue
}o[n]=r[n]
}}return q
},maybeStoreMembers:function(p){if(!TS.model.supports_user_caching){return
}var n=TS.members.prepareMembersForLS();
var o=TS.storage.fetchMembers();
if(p||!o||!TS.utility.areSimpleObjectsEqual(o,n)){TS.storage.storeMembers(n)
}},test:function(){return{clearMemberMaps:h}
}});
var d={};
var k={};
var b={};
var f={};
var i=[];
var m=[];
var e=[];
var c=[];
var l=[];
var a=function(o,p,r,q){o.length=0;
var s;
for(var n=0;
n<p.length;
n++){s=p[n];
if(s.deleted){continue
}if(!q&&s.is_slackbot){continue
}if(r&&s.is_self){continue
}o.push(s)
}return o
};
var j=function(){i.length=0;
m.length=0;
e.length=0;
c.length=0
};
var g=function(){if(!TS.model.user||!TS.model.user.is_restricted){return
}var o=l.length;
if(!o){return
}l.length=0;
j();
var n=TS.members.getMembersForUser();
if(n.length!=o){TS.members.members_for_user_changed_sig.dispatch()
}};
var h=function(){d={};
k={};
b={};
f={}
}
})();
(function(){TS.registerModule("team",{team_profile_changed_sig:new signals.Signal(),team_plan_changed_sig:new signals.Signal(),team_email_domain_changed_sig:new signals.Signal(),onStart:function(){},upsertAndSignal:function(b){if(!TS.boot_data.feature_custom_fields){return
}if(!b){return
}var c=TS.team.upsertTeam(b);
if(c.status=="CHANGED"){if(~c.what_changed.indexOf("profile")){TS.team.team_profile_changed_sig.dispatch(c.team)
}if(~c.what_changed.indexOf("email_domain")){TS.team.team_email_domain_changed_sig.dispatch(c.team)
}}return c
},upsertTeam:function(d,f){var e=TS.model.team;
var b="NOOP";
var g=[];
if(d){TS.log(4,'updating team "'+d.id+'"');
for(var c in d){if(c=="profile"){if(d.profile.fields&&d.profile.fields.length){a(d.profile.fields);
g.push(c);
b="CHANGED"
}}else{if(e[c]!=d[c]){if(d[c]&&!TS.utility.isScalar(d[c])){e[c]=d[c];
TS.warn(c+" is not scalar! it needs to be handled by upsertBot specifically to test if it has changed! "+(typeof d[c]))
}else{if(typeof d[c]!="boolean"||!d[c]!=!e[c]){e[c]=d[c];
g.push(c);
b="CHANGED"
}}}}}}return{status:b,team:e,what_changed:g}
},getTeamProfileFieldById:function(c){if(!TS.boot_data.feature_custom_fields){return null
}if(!(TS.model.team.profile&&TS.model.team.profile.fields)){return null
}for(var b=0;
b<TS.model.team.profile.fields.length;
b++){if(TS.model.team.profile.fields[b].id===c){return TS.model.team.profile.fields[b]
}}return null
},getVisibleTeamProfileFields:function(){if(!TS.boot_data.feature_custom_fields){return[]
}if(!(TS.model.team.profile&&TS.model.team.profile.fields)){return[]
}return TS.model.team.profile.fields.filter(function(b){return !(b.options&&b.options.is_hidden)
})
},getHiddenTeamProfileFields:function(){if(!TS.boot_data.feature_custom_fields){return[]
}if(!(TS.model.team.profile&&TS.model.team.profile.fields)){return[]
}return TS.model.team.profile.fields.filter(function(b){return b.options&&b.options.is_hidden
})
},getTeamProfileFieldUsageCountById:function(b){if(!b){return 0
}if(!TS.boot_data.feature_custom_fields){return 0
}if(!(TS.model.team.profile&&TS.model.team.profile.fields)){return 0
}return TS.model.members.reduce(function(c,d){if(!d.is_bot&&d.profile&&d.profile.fields&&d.profile.fields[b]){c++
}return c
},0)
},sortTeamProfileFieldsByOrdering:function(){if(!TS.boot_data.feature_custom_fields){return
}if(!(TS.model.team.profile&&TS.model.team.profile.fields)){return
}TS.model.team.profile.fields.sort(function(b,c){return b.ordering-c.ordering
})
},getVisibleTeamProfileFieldsForMember:function(b){if(!TS.boot_data.feature_custom_fields){return null
}if(!(b.profile&&b.profile.fields)){return null
}if(!(TS.model.team.profile&&TS.model.team.profile.fields)){return null
}return TS.model.team.profile.fields.map(function(c){if(b.profile.fields[c.id]&&b.profile.fields[c.id].value&&!(c.options&&c.options.is_hidden)){return $.extend(true,{value:b.profile.fields[c.id].value,alt:b.profile.fields[c.id].alt},c)
}}).filter(function(c){return !!c
})
}});
var a=function(b){if(!(b&&b.length)){return
}var c=false;
var d=TS.model.team.profile.fields.reduce(function(e,g,f){e[g.id]=f;
return e
},{});
b.forEach(function(f){var e=d[f.id];
if(TS.model.team.profile.fields[e]){c=c||TS.model.team.profile.fields[e].ordering!==f.ordering;
$.extend(true,TS.model.team.profile.fields[e],f)
}else{TS.model.team.profile.fields.push(f)
}});
if(c){TS.team.sortTeamProfileFieldsByOrdering()
}}
})();
(function(){TS.registerModule("bots",{added_sig:new signals.Signal(),changed_name_sig:new signals.Signal(),changed_deleted_sig:new signals.Signal(),changed_icons_sig:new signals.Signal(),onStart:function(){TS.bots.maybeStoreBots=TS.utility.throttleFunc(TS.bots.maybeStoreBots,100)
},getBotById:function(d){var b=TS.model.bots;
var c;
for(var a=0;
a<b.length;
a++){c=b[a];
if(c.id==d){return c
}}return null
},getBotByName:function(a){var c=TS.model.bots;
var d;
if(typeof a==="undefined"){return null
}for(var b=0;
b<c.length;
b++){d=c[b];
if(d.name.toLowerCase()==a.toLowerCase()){return d
}}return null
},upsertAndSignal:function(b){var a=TS.bots.upsertBot(b);
if(a.status=="CHANGED"){if(a.what_changed.indexOf("icons")!=-1){TS.bots.changed_icons_sig.dispatch(a.bot)
}if(a.what_changed.indexOf("name")!=-1){TS.bots.changed_name_sig.dispatch(a.bot)
}if(a.what_changed.indexOf("deleted")!=-1){TS.bots.changed_deleted_sig.dispatch(a.bot)
}}return a
},upsertBot:function(g,e){var d=TS.model.bots;
var c=TS.bots.getBotById(g.id);
var a="NOOP";
var f=[];
if(c){TS.log(4,'updating existing bot "'+g.id+'"');
for(var b in g){if(b=="icons"){if(g[b]&&!TS.utility.areSimpleObjectsEqual(g[b],c[b],"bot:"+g.id+" "+g.name)){c.icons=g.icons;
a="CHANGED";
f.push(b)
}}else{if(c[b]!=g[b]){if(g[b]&&!TS.utility.isScalar(g[b])){c[b]=g[b];
TS.warn(b+" is not scalar! it needs to be handled by upsertBot specifically to test if it has changed! "+(typeof g[b]))
}else{if(typeof g[b]!="boolean"||!g[b]!=!c[b]){f.push(b);
c[b]=g[b];
a="CHANGED"
}}}}}g=c
}else{a="ADDED";
TS.log(4,'adding bot "'+g.id);
d.push(g)
}if(a=="ADDED"||a=="CHANGED"){TS.bots.maybeStoreBots()
}return{status:a,bot:g,what_changed:f}
},prepareBotsForLS:function(){var d=[];
var a;
var e;
var b;
var c;
for(c=0;
c<TS.model.bots.length;
c++){e=TS.model.bots[c];
a={};
d.push(a);
for(b in e){a[b]=e[b]
}}return d
},maybeStoreBots:function(c){if(!TS.model.supports_user_caching){return
}var a=TS.bots.prepareBotsForLS();
var b=TS.storage.fetchBots();
if(c||!b||!TS.utility.areSimpleObjectsEqual(b,a)){TS.storage.storeBots(a)
}}})
})();
(function(){TS.registerModule("members.view",{team_filter_changed_sig:new signals.Signal(),filter_timer:null,onStart:function(){},switchTabs:function(e){if(TS.web&&TS.web.admin&&TS.web.admin.view=="invites"){$("#"+e+"_invites_tab").trigger("click")
}else{if(TS.client){$("#"+e+"_members_tab").find("a").trigger("click")
}else{$("#"+e+"_members_tab").trigger("click")
}}},bindTeamFilter:function(g,h){var e=$(g);
var i=e.find("input.member_filter");
var f=e.find(".icon_close");
a=null;
i.bind("keyup update-team-filter",function(k){var j=$.trim(i.val().toLowerCase());
if(TS.members.view.filter_timer){window.clearTimeout(TS.members.view.filter_timer)
}TS.members.view.filter_timer=window.setTimeout(function(){if(k.which==TS.utility.keymap.enter&&g=="#dms_filter"){TS.members.view.selectMatch(g)
}if(j!==a){a=j;
TS.members.view.filterTeam(a,g,h)
}if(a.length===0){f.addClass("hidden")
}else{f.removeClass("hidden")
}},(TS.members.getMembersForUser().length>500?250:50))
});
f.bind("click",function(){TS.members.view.clearFilter(g,h);
a=null;
setTimeout(function(){i.focus()
},0)
});
if(TS.boot_data.feature_custom_fields){$(TS.client?h:"#members_div").on("click",'[data-action="filter_on_team_profile_field"]',d.bind(Object.create(null),g,h))
}},filterTeam:function(k,j,e,r){var D=$(j);
a=k;
var g=D.data("list-items-id");
var o=$(g);
var A=o.find(".member_item");
var m=o.find(".member_item.active");
var E={};
var C;
var l;
var f;
var w=false;
var n;
if(TS.web&&TS.web.admin&&j==="#team_filter"){n=o.find(".tab_pane.selected")
}if(!n&&!TS.web&&j==="#team_filter"){n=$("#team_list_members")
}if(n&&n.length){n.addClass("hidden")
}if(w){C=A.parent();
l=document.activeElement?$(document.activeElement):null;
A.detach()
}m.removeClass("active");
o.find(".no_results").addClass("hidden");
if(w){C.append(A);
if(l){l.focus()
}}function q(G,F){return G.filter(function(I){if(typeof r==="string"){return I[r]===F
}else{if(r instanceof Array){var H=r.reduce(function(J,K){return J&&J[K]
},I);
return H===F
}}})
}function p(H,G){var F=$.grep(H,function(K,J){var I=(K.name&&K.name.match(G))||(K.first_name&&K.first_name.match(G))||(K.last_name&&K.last_name.match(G))||(K._real_name_lc&&K._real_name_lc.match(G))||(K.email&&K.email.match(G))||(K.profile&&K.profile.email&&K.profile.email.match(G))||(K.profile&&K.profile.real_name_normalized&&K.profile.real_name_normalized.match(G))||(K.profile&&K.profile.real_name&&K.profile.real_name.match(G));
return I
});
return F
}function x(I,H){if(r&&TS.boot_data.feature_custom_fields){return q(I,H)
}else{var G=new RegExp("^"+TS.utility.regexpEscape(H),"i");
var K=new RegExp("(-|_|\\+|\\s|\\.|@)"+TS.utility.regexpEscape(H),"i");
var J=p(I,G);
var F=p(I,K);
F=F.filter(function(L){return !J.some(function(M){return M.id===L.id
})
});
return J.concat(F)
}}var z;
if(TS.web&&TS.web.admin&&TS.web.admin.view=="invites"){var B=[];
var i=[];
var y=[];
$.each(A,function(F,G){var H;
G=$(G);
H=G.data("invite-id");
E[H]=G
});
i=x(TS.web.admin.pending_invites,k);
y=x(TS.web.admin.accepted_invites,k);
B=i.concat(y);
if(B.length>0){$.each(B,function(G,F){if(F&&F.id&&E[F.id]){E[F.id].addClass("active")
}});
if(e){$(e).trigger("resize")
}}z=[{name:"pending",label:"pending invitations",matches:i},{name:"accepted",label:"accepted invitations",matches:y}];
z.forEach(function(H){var F=$("#"+H.name+"_no_results");
if(H.matches.length>0){F.addClass("hidden").empty();
return
}else{var I={query:k,tab:H,pending_matches:i,show_pending_matches:H.name!="pending"&&i.length>0,accepted_matches:y,show_accepted_matches:H.name!="accepted"&&y.length>0};
var G=TS.templates.team_list_no_results(I);
F.removeClass("hidden").html(G);
F.find(".clear_members_filter").on("click",function(){TS.members.view.clearFilter(j,e)
})
}});
f=B
}else{var u;
var t=[];
var h=[];
var s=[];
if(j=="#dms_filter"){u=TS.members.getActiveMembersWithSlackbotAndNotSelf()
}else{u=TS.members.getMembersForUser()
}$(".restricted_header, .bot_header, .ra_invite_prompt, .restricted_info")[k?"addClass":"removeClass"]("hidden");
$.each(A,function(F,G){var H;
G=$(G);
H=G.data("member-id");
E[H]=G
});
f=x(u,k);
if(f.length>0){$.each(f,function(F,G){if(G&&G.id&&E[G.id]){E[G.id].addClass("active")
}if(G.is_restricted){h.push(G)
}else{if(G.deleted){s.push(G)
}else{t.push(G)
}}});
if(e){$(e).trigger("resize");
var v=$(e).data("monkeyScroll");
if(v){v.updateFunc()
}}}else{if(j=="#dms_filter"||j=="#file_member_filter"){o.find(".query").text(k);
o.find(".no_results").removeClass("hidden")
}}if(j=="#team_filter"){z=[{name:"active",label:"full team members",matches:t},{name:"restricted",label:"restricted accounts",matches:h},{name:"disabled",label:"disabled accounts",matches:s}];
z.forEach(function(H){var F=$("#"+H.name+"_no_results");
if(H.matches.length>0){F.addClass("hidden").empty();
return
}else{var I={query:k,tab:H,active_matches:t,show_active_matches:H.name!="active"&&t.length>0,restricted_matches:h,show_restricted_matches:H.name!="restricted"&&h.length>0,disabled_matches:s,show_disabled_matches:TS.web&&H.name!="disabled"&&s.length>0};
var G=TS.templates.team_list_no_results(I);
F.removeClass("hidden").html(G);
F.find(".clear_members_filter").on("click",function(){TS.members.view.clearFilter(j,e)
})
}})
}}if(n&&n.length){n.removeClass("hidden")
}if(TS.client&&e){$(e).data("monkeyScroll").updateFunc()
}TS.members.view.team_filter_changed_sig.dispatch(k,f.length)
},selectMatch:function(j){var g=$(j);
var i=g.data("list-items-id");
var l=$(i);
var f=l.find(".member_item");
var k=f.filter(".active");
if(k.length==1){var e=k.first();
var h=e.data("member-id");
if(h){TS.ims.startImByMemberId(h);
TS.menu.end()
}}},clearFilter:function(i,j){var f=$(i);
var l=f.find("input.member_filter");
var g=f.find(".icon_close");
var h=f.data("list-items-id");
var k=$(h);
var e=k.find(".member_item");
a="";
if(TS.members.view.filter_timer){window.clearTimeout(TS.members.view.filter_timer);
TS.members.view.filter_timer=null
}l.val("");
g.addClass("hidden");
$(".restricted_header, .bot_header, .ra_invite_prompt, .restricted_info").removeClass("hidden");
k.find(".no_results").addClass("hidden");
e.addClass("active");
TS.members.view.team_filter_changed_sig.dispatch("",TS.members.getMembersForUser().length);
if(TS.client&&j){$(j).data("monkeyScroll").updateFunc()
}},onTeamDirectoryItemClick:function(k){if($(k.target).closest("a").length){return
}var g=$(this);
var i=g.data("member-id");
var l=TS.members.getMemberById(i);
if(!l){return
}var f=100;
if(g.hasClass("expanded")){g.removeClass("show_extra_data");
setTimeout(function(){g.removeClass("expanded");
g.find(".expanded_member_details").remove()
},f)
}else{var h=TS.templates.team_list_item_details(l);
var j=TS.templates.team_list_item_buttons(l);
g.find(".member_name_and_title").append(h);
g.append(j);
g.addClass("expanded");
setTimeout(function(){g.addClass("show_extra_data")
},f)
}}});
var a="";
var d=function(g,i,k){if(!TS.boot_data.feature_custom_fields){return
}var f=$(k.target).closest("[data-action]");
var l=f.data("id");
var h=f.data("value");
var j=TS.team.getTeamProfileFieldById(l);
if(j){b(j.label,h,g,i);
TS.members.view.filterTeam(h,g,i,["profile","fields",l,"value"])
}};
var b=function(e,i,g,h){var f=$(g);
var j=f.find("input.member_filter");
$("#filter_label").text(e);
$("#filter_value").text(i);
j.data("last-query",j.val());
f.addClass("hidden");
$(".team_filter_token").removeClass("hidden").find(".icon_close").on("click",c.bind(Object.create(null),g,h))
};
var c=function(f,h){var e=$(f);
var i=e.find("input.member_filter");
var g=i.data("last-query");
if(g){i.val(g).keyup();
i.data("last-query",null)
}else{TS.members.view.clearFilter(f,h)
}$(".team_filter_token").addClass("hidden").find(".icon_close").off("click");
e.removeClass("hidden")
}
})();
(function(){TS.registerModule("prefs",{highlight_words_changed_sig:new signals.Signal(),seen_welcome_2_changed_sig:new signals.Signal(),emoji_mode_changed_sig:new signals.Signal(),obey_inline_img_limit_changed_sig:new signals.Signal(),show_member_presence_changed_sig:new signals.Signal(),messages_theme_changed_sig:new signals.Signal(),expand_inline_imgs_changed_sig:new signals.Signal(),expand_internal_inline_imgs_changed_sig:new signals.Signal(),expand_non_media_attachments_changed_sig:new signals.Signal(),webapp_spellcheck_changed_sig:new signals.Signal(),color_names_in_list_changed_sig:new signals.Signal(),search_only_my_channels_changed_sig:new signals.Signal(),search_exclude_channels_changed_sig:new signals.Signal(),search_exclude_bots_changed_sig:new signals.Signal(),box_enabled_changed_sig:new signals.Signal(),dropbox_enabled_changed_sig:new signals.Signal(),collapsible_changed_sig:new signals.Signal(),read_changed_sig:new signals.Signal(),push_changed_sig:new signals.Signal(),time24_changed_sig:new signals.Signal(),sidebar_behavior_changed_sig:new signals.Signal(),dtop_notif_changed_sig:new signals.Signal(),muted_channels_changed_sig:new signals.Signal(),mac_speak_changed_sig:new signals.Signal(),mac_ssb_bullet_changed_sig:new signals.Signal(),team_hide_referers_changed_sig:new signals.Signal(),team_require_at_for_mention_changed_sig:new signals.Signal(),sidebar_theme_changed_sig:new signals.Signal(),k_key_omnibox_changed_sig:new signals.Signal(),seen_spaces_new_xp_tooltip_changed_sig:new signals.Signal(),no_omnibox_in_channels_changed_sig:new signals.Signal(),k_key_omnibox_auto_hide_count_changed_sig:new signals.Signal(),display_real_names_override_changed_sig:new signals.Signal(),team_display_real_names_changed_sig:new signals.Signal(),team_perms_pref_changed_sig:new signals.Signal(),privacy_policy_seen_changed_sig:new signals.Signal(),two_factor_update_seen_changed_sig:new signals.Signal(),compliance_export_start_changed_sig:new signals.Signal(),team_disallow_public_file_urls_changed_sig:new signals.Signal(),msg_preview_changed_sig:new signals.Signal(),mentions_exclude_at_channels_changed_sig:new signals.Signal(),mentions_exclude_at_user_groups_changed_sig:new signals.Signal(),emoji_use_changed_sig:new signals.Signal(),team_auth_mode_changed_sig:new signals.Signal(),team_sso_auth_restrictions_changed_sig:new signals.Signal(),team_posts_migrating_changed_sig:new signals.Signal(),onStart:function(){if(TS.client){TS.client.login_sig.add(TS.prefs.onLogin,TS.prefs)
}},onLogin:function(c,d){var a=TS.boot_data.notification_sounds;
for(var b=0;
b<a.length;
b++){if(a[b].label==TS.model.prefs.new_msg_snd){TS.warn("corrected TS.model.prefs.new_msg_snd "+a[b].label+" -> "+a[b].value);
TS.model.prefs.new_msg_snd==a[b].value;
TS.api.callImmediately("users.prefs.set",{name:"new_msg_snd",value:a[b].value});
break
}}},setPrefs:function(a){TS.model.prefs=a;
TS.prefs.setEmojiUse(TS.model.prefs.emoji_use);
TS.prefs.setUserColors(TS.model.prefs.user_colors);
TS.prefs.setLoudChannels(TS.model.prefs.loud_channels);
TS.prefs.setSuppressedChannels(TS.model.prefs.at_channel_suppressed_channels);
TS.prefs.setPushSuppressedChannels(TS.model.prefs.push_at_channel_suppressed_channels);
TS.prefs.setNeverChannels(TS.model.prefs.never_channels);
TS.prefs.setMutedChannels(TS.model.prefs.muted_channels);
TS.prefs.setLoudChannelsSet(TS.model.prefs.loud_channels_set);
TS.prefs.setPushLoudChannels(TS.model.prefs.push_loud_channels);
TS.prefs.setPushMentionChannels(TS.model.prefs.push_mention_channels);
TS.prefs.setPushLoudChannelsSet(TS.model.prefs.push_loud_channels_set);
TS.prefs.setSearchExcludeChannels(TS.model.prefs.search_exclude_channels);
try{TS.prefs.setSidebarThemeCustomValues(JSON.parse(TS.model.prefs.sidebar_theme_custom_values))
}catch(b){TS.prefs.setSidebarThemeCustomValues()
}TS.emoji.setEmojiMode();
TS.prefs.setTheme();
TS.model.prefs.emoji_autocomplete_big=false;
TSSSB.call("runFromTray",!!TS.model.prefs.winssb_run_from_tray);
TSSSB.call("windowFlashBehavior",TS.model.prefs.winssb_window_flash_behavior)
},setHighlightWords:function(a){TS.model.prefs.highlight_words=a;
TS.model.highlight_words=["@"+TS.model.user.name];
if(!TS.model.team.prefs.require_at_for_mention){TS.model.highlight_words.push(TS.model.user.name)
}TS.model.highlight_words.push("<@"+TS.model.user.id);
if(a&&typeof a=="string"){TS.model.highlight_words=TS.model.highlight_words.concat(a.split(","))
}TS.model.highlight_words_regex=null
},setSuppressedChannels:function(a){TS.model.prefs.at_channel_suppressed_channels=a;
TS.model.at_channel_suppressed_channels=[];
if(a&&typeof a=="string"){TS.model.at_channel_suppressed_channels=TS.model.at_channel_suppressed_channels.concat(a.split(","))
}},setPushSuppressedChannels:function(a){TS.model.prefs.push_at_channel_suppressed_channels=a;
TS.model.push_at_channel_suppressed_channels=[];
if(a&&typeof a=="string"){TS.model.push_at_channel_suppressed_channels=TS.model.push_at_channel_suppressed_channels.concat(a.split(","))
}},setLoudChannels:function(a){TS.model.prefs.loud_channels=a;
TS.model.loud_channels=[];
if(a&&typeof a=="string"){TS.model.loud_channels=TS.model.loud_channels.concat(a.split(","))
}},setNeverChannels:function(a){TS.model.prefs.never_channels=a;
TS.model.never_channels=[];
if(a&&typeof a=="string"){TS.model.never_channels=TS.model.never_channels.concat(a.split(","))
}},setMutedChannels:function(c){TS.model.prefs.muted_channels=c;
var b;
var a;
TS.model.muted_channels=[];
if(c&&typeof c=="string"){TS.model.muted_channels=TS.model.muted_channels.concat(c.split(","))
}for(b=0;
b<TS.model.muted_channels.length;
b++){a=TS.shared.getModelObById(TS.model.muted_channels[b]);
if(!a){continue
}if(!a.unread_cnt){continue
}a._show_in_list_even_though_no_unreads=true
}for(b=0;
b<TS.model.channels.length;
b++){a=TS.model.channels[b];
if(TS.notifs.isCorGMuted(a.id)){continue
}a._show_in_list_even_though_no_unreads=false
}for(b=0;
b<TS.model.groups.length;
b++){a=TS.model.groups[b];
if(TS.notifs.isCorGMuted(a.id)){continue
}a._show_in_list_even_though_no_unreads=false
}},setLoudChannelsSet:function(a){TS.model.prefs.loud_channels_set=a;
TS.model.loud_channels_set=[];
if(a&&typeof a=="string"){TS.model.loud_channels_set=TS.model.loud_channels_set.concat(a.split(","))
}},setPushLoudChannels:function(a){TS.model.prefs.push_loud_channels=a;
TS.model.push_loud_channels=[];
if(a&&typeof a=="string"){TS.model.push_loud_channels=TS.model.push_loud_channels.concat(a.split(","))
}},setPushMentionChannels:function(a){TS.model.prefs.push_mention_channels=a;
TS.model.push_mention_channels=[];
if(a&&typeof a=="string"){TS.model.push_mention_channels=TS.model.push_mention_channels.concat(a.split(","))
}},setPushLoudChannelsSet:function(a){TS.model.prefs.push_loud_channels_set=a;
TS.model.push_loud_channels_set=[];
if(a&&typeof a=="string"){TS.model.push_loud_channels_set=TS.model.push_loud_channels_set.concat(a.split(","))
}},setSearchExcludeChannels:function(a){TS.model.prefs.search_exclude_channels=a;
TS.model.search_exclude_channels=[];
if(a&&typeof a=="string"){TS.model.search_exclude_channels=TS.model.search_exclude_channels.concat(a.split(","))
}},recordEmojiUse:function(b){var a=TS.utility.msgs.recordEmojiInHash(b,TS.model.emoji_use);
if(a){TS.utility.callFuncWhenApiQisEmpty(TS.prefs.saveEmojiUse)
}},saveEmojiUse:function(){TS.dir(777,TS.model.emoji_use,"saving emoji_use pref");
TS.prefs.setPrefByAPI({name:"emoji_use",value:JSON.stringify(TS.model.emoji_use)})
},setEmojiUse:function(a){a=a||null;
try{TS.model.emoji_use=JSON.parse(a)||{}
}catch(b){TS.model.emoji_use={}
}TS.dir(777,TS.model.emoji_use,"TS.model.emoji_use set to:");
TS.model.emoji_use_for_menu=Object.keys(TS.model.emoji_use).sort(function(d,c){return -(TS.model.emoji_use[d]-TS.model.emoji_use[c])
});
TS.model.emoji_use_for_menu.length=Math.min(TS.model.emoji_use_for_menu.length,TS.model.emoji_menu_columns*4)
},setUserColors:function(a){TS.model.prefs.user_colors=a;
var b=(a)?JSON.parse(a):{};
TS.model.user_colors=b||{}
},setTheme:function(a){if(TS.model.prefs.messages_theme=="default"){TS.model.prefs.messages_theme="light_with_avatars"
}TS.model.prefs.theme="light";
TS.model.prefs.avatars=true;
if(TS.model.prefs.messages_theme=="dense"){TS.model.prefs.theme="dense";
TS.model.prefs.avatars=false
}else{if(TS.model.prefs.messages_theme=="light"){TS.model.prefs.theme="light";
TS.model.prefs.avatars=false
}else{if(TS.model.prefs.messages_theme=="light_with_avatars"){TS.model.prefs.theme="light";
TS.model.prefs.avatars=true
}}}},onTeamPrefChanged:function(a){if(a.name=="msg_edit_window_mins"){TS.model.team.prefs.msg_edit_window_mins=a.value
}else{if(a.name=="allow_message_deletion"){TS.model.team.prefs.allow_message_deletion=!!a.value
}else{if(a.name=="hide_referers"){TS.model.team.prefs.hide_referers=!!a.value;
TS.prefs.team_hide_referers_changed_sig.dispatch()
}else{if(a.name=="require_at_for_mention"){TS.model.team.prefs.require_at_for_mention=!!a.value;
TS.prefs.setHighlightWords(TS.model.prefs.highlight_words);
TS.prefs.team_require_at_for_mention_changed_sig.dispatch()
}else{if(a.name=="display_real_names"){TS.model.team.prefs.display_real_names=!!a.value;
TS.prefs.team_display_real_names_changed_sig.dispatch()
}else{if(a.name.indexOf("who_can_")===0){if(TS.model.team.prefs[a.name]!=a.value){TS.model.team.prefs[a.name]=a.value;
TS.prefs.team_perms_pref_changed_sig.dispatch(a.name)
}}else{if(a.name=="compliance_export_start"){if(TS.model.team.prefs.compliance_export_start!=a.value){TS.model.team.prefs.compliance_export_start=a.value;
TS.prefs.compliance_export_start_changed_sig.dispatch()
}}else{if(a.name=="disallow_public_file_urls"){TS.model.team.prefs.disallow_public_file_urls=!!a.value;
TS.prefs.team_disallow_public_file_urls_changed_sig.dispatch()
}else{if(a.name=="auth_mode"){TS.model.team.prefs.auth_mode=a.value;
TS.prefs.team_auth_mode_changed_sig.dispatch()
}else{if(a.name=="sso_auth_restrictions"){TS.model.team.prefs.sso_auth_restrictions=a.value;
TS.prefs.team_sso_auth_restrictions_changed_sig.dispatch()
}else{if(a.name=="posts_migrating"){TS.model.team.prefs.posts_migrating=a.value;
TS.prefs.team_posts_migrating_changed_sig.dispatch()
}else{TS.model.team.prefs[a.name]=a.value
}}}}}}}}}}}},onPrefChanged:function(a){switch(a.name){case"color_names_in_list":TS.model.prefs.color_names_in_list=!!a.value;
TS.prefs.color_names_in_list_changed_sig.dispatch();
break;
case"display_real_names_override":TS.model.prefs.display_real_names_override=a.value;
TS.prefs.display_real_names_override_changed_sig.dispatch();
break;
case"growls_enabled":TS.model.prefs.growls_enabled=!!a.value;
TS.prefs.dtop_notif_changed_sig.dispatch();
break;
case"sidebar_theme":if(TS.model.prefs.sidebar_theme!==a.value){TS.model.prefs.sidebar_theme=a.value;
TS.prefs.sidebar_theme_changed_sig.dispatch()
}break;
case"sidebar_theme_custom_values":if(TS.model.prefs.sidebar_theme_custom_values!==a.value){TS.prefs.setSidebarThemeCustomValues(JSON.parse(a.value));
TS.prefs.sidebar_theme_changed_sig.dispatch()
}break;
case"expand_inline_imgs":TS.model.prefs.expand_inline_imgs=!!a.value;
TS.prefs.expand_inline_imgs_changed_sig.dispatch();
break;
case"webapp_spellcheck":TS.model.prefs.webapp_spellcheck=!!a.value;
TS.prefs.webapp_spellcheck_changed_sig.dispatch();
break;
case"expand_internal_inline_imgs":TS.model.prefs.expand_internal_inline_imgs=!!a.value;
TS.prefs.expand_internal_inline_imgs_changed_sig.dispatch();
break;
case"expand_non_media_attachments":TS.model.prefs.expand_non_media_attachments=!!a.value;
TS.prefs.expand_non_media_attachments_changed_sig.dispatch();
break;
case"messages_theme":TS.model.prefs.messages_theme=a.value;
TS.prefs.setTheme();
TS.prefs.messages_theme_changed_sig.dispatch();
break;
case"show_member_presence":TS.model.prefs.show_member_presence=!!a.value;
TS.prefs.show_member_presence_changed_sig.dispatch();
break;
case"highlight_words":TS.prefs.setHighlightWords(a.value);
TS.prefs.highlight_words_changed_sig.dispatch();
break;
case"at_channel_suppressed_channels":TS.prefs.setSuppressedChannels(a.value);
TS.prefs.dtop_notif_changed_sig.dispatch();
break;
case"push_at_channel_suppressed_channels":TS.prefs.setPushSuppressedChannels(a.value);
TS.prefs.push_changed_sig.dispatch();
break;
case"loud_channels":TS.prefs.setLoudChannels(a.value);
break;
case"never_channels":TS.prefs.setNeverChannels(a.value);
break;
case"muted_channels":TS.prefs.setMutedChannels(a.value);
TS.prefs.muted_channels_changed_sig.dispatch();
break;
case"loud_channels_set":TS.prefs.setLoudChannelsSet(a.value);
TS.prefs.dtop_notif_changed_sig.dispatch();
break;
case"push_loud_channels":TS.prefs.setPushLoudChannels(a.value);
break;
case"push_mention_channels":TS.prefs.setPushMentionChannels(a.value);
break;
case"push_loud_channels_set":TS.prefs.setPushLoudChannelsSet(a.value);
TS.prefs.push_changed_sig.dispatch();
break;
case"emoji_use":TS.prefs.setEmojiUse(a.value);
TS.emoji.makeEmoticonList();
TS.prefs.emoji_use_changed_sig.dispatch();
break;
case"user_colors":var c;
var b;
for(b in TS.model.user_colors){c=TS.members.getMemberById(b);
if(c){TS.members.setMemberUserColor(c,c.color)
}}TS.prefs.setUserColors(a.value);
for(b in TS.model.user_colors){c=TS.members.getMemberById(b);
if(c){TS.members.setMemberUserColor(c,TS.model.user_colors[b])
}}break;
case"graphic_emoticons":TS.model.prefs.graphic_emoticons=a.value;
TS.emoji.setEmojiMode();
TS.prefs.emoji_mode_changed_sig.dispatch();
break;
case"ss_emojis":TS.model.prefs.ss_emojis=a.value;
TS.emoji.setEmojiMode();
TS.prefs.emoji_mode_changed_sig.dispatch();
TS.emoji.makeEmoticonList();
break;
case"emoji_mode":TS.model.prefs.emoji_mode=a.value;
TS.emoji.setEmojiMode();
TS.prefs.emoji_mode_changed_sig.dispatch();
TS.emoji.makeEmoticonList();
break;
case"obey_inline_img_limit":TS.model.prefs.obey_inline_img_limit=a.value;
TS.prefs.obey_inline_img_limit_changed_sig.dispatch();
break;
case"search_only_my_channels":TS.model.prefs.search_only_my_channels=!!a.value;
TS.prefs.search_only_my_channels_changed_sig.dispatch();
break;
case"search_exclude_channels":TS.prefs.setSearchExcludeChannels(a.value);
TS.prefs.search_exclude_channels_changed_sig.dispatch();
break;
case"search_exclude_bots":TS.model.prefs.search_exclude_bots=!!a.value;
TS.prefs.search_exclude_bots_changed_sig.dispatch();
break;
case"mac_speak_voice":if(TS.model.prefs.mac_speak_voice!=a.value){TS.model.prefs.mac_speak_voice=a.value;
TS.prefs.mac_speak_changed_sig.dispatch()
}break;
case"mac_speak_speed":if(TS.model.prefs.mac_speak_speed!=a.value){TS.model.prefs.mac_speak_speed=a.value;
TS.prefs.mac_speak_changed_sig.dispatch()
}break;
case"speak_growls":if(TS.model.prefs.speak_growls!==a.value){TS.model.prefs.speak_growls=a.value;
TS.prefs.mac_speak_changed_sig.dispatch()
}break;
case"has_uploaded":TS.model.prefs.has_uploaded=!!a.value;
break;
case"has_invited":TS.model.prefs.has_invited=!!a.value;
break;
case"has_created_channel":TS.model.prefs.has_created_channel=!!a.value;
break;
case"no_joined_overlays":TS.model.prefs.no_joined_overlays=!!a.value;
break;
case"no_created_overlays":TS.model.prefs.no_created_overlays=!!a.value;
break;
case"seen_welcome_2":TS.model.prefs.seen_welcome_2=!!a.value;
TS.prefs.seen_welcome_2_changed_sig.dispatch();
break;
case"box_enabled":TS.model.prefs.box_enabled=!!a.value;
TS.prefs.box_enabled_changed_sig.dispatch();
break;
case"dropbox_enabled":TS.model.prefs.dropbox_enabled=!!a.value;
TS.prefs.dropbox_enabled_changed_sig.dispatch();
break;
case"collapsible":if(TS.model.prefs.collapsible!==!!a.value){TS.model.prefs.collapsible=!!a.value;
TS.prefs.collapsible_changed_sig.dispatch()
}break;
case"collapsible_by_click":if(TS.model.prefs.collapsible_by_click!==!!a.value){TS.model.prefs.collapsible_by_click=!!a.value;
TS.prefs.collapsible_changed_sig.dispatch()
}break;
case"mark_msgs_read_immediately":if(TS.model.prefs.mark_msgs_read_immediately!==!!a.value){TS.model.prefs.mark_msgs_read_immediately=!!a.value;
TS.prefs.read_changed_sig.dispatch()
}break;
case"start_scroll_at_oldest":if(TS.model.prefs.start_scroll_at_oldest!==!!a.value){TS.model.prefs.start_scroll_at_oldest=!!a.value;
TS.prefs.read_changed_sig.dispatch()
}break;
case"mac_ssb_bullet":if(TS.model.prefs.mac_ssb_bullet!==!!a.value){TS.model.prefs.mac_ssb_bullet=!!a.value;
TS.prefs.mac_ssb_bullet_changed_sig.dispatch()
}break;
case"all_channels_loud":if(TS.model.prefs.all_channels_loud!==!!a.value){TS.model.prefs.all_channels_loud=!!a.value;
TS.prefs.dtop_notif_changed_sig.dispatch()
}break;
case"push_everything":if(TS.model.prefs.push_everything!==!!a.value){TS.model.prefs.push_everything=!!a.value;
TS.prefs.push_changed_sig.dispatch()
}break;
case"push_mention_alert":if(TS.model.prefs.push_mention_alert!==!!a.value){TS.model.prefs.push_mention_alert=!!a.value;
TS.prefs.push_changed_sig.dispatch()
}break;
case"push_dm_alert":if(TS.model.prefs.push_dm_alert!==!!a.value){TS.model.prefs.push_dm_alert=!!a.value;
TS.prefs.push_changed_sig.dispatch()
}break;
case"time24":if(TS.model.prefs.time24!==!!a.value){TS.model.prefs.time24=!!a.value;
TS.prefs.time24_changed_sig.dispatch()
}break;
case"sidebar_behavior":if(TS.model.prefs.sidebar_behavior!=a.value){TS.model.prefs.sidebar_behavior=a.value;
TS.prefs.sidebar_behavior_changed_sig.dispatch()
}break;
case"two_factor_update_seen":if(TS.model.two_factor_update_seen!=a.value){TS.mode.prefs.two_factor_update_seen=a.value;
TS.prefs.two_factor_update_seen_changed_sig.dispatch()
}break;
case"privacy_policy_seen":if(TS.model.prefs.privacy_policy_seen!=a.value){TS.model.prefs.privacy_policy_seen=a.value;
TS.prefs.privacy_policy_seen_changed_sig.dispatch()
}break;
case"last_seen_at_channel_warning":if(TS.model.prefs.last_seen_at_channel_warning!=a.value){TS.model.prefs.last_seen_at_channel_warning=a.value
}break;
case"msg_preview":if(TS.model.prefs.msg_preview!=a.value){TS.model.prefs.msg_preview=a.value;
TS.prefs.msg_preview_changed_sig.dispatch()
}break;
case"msg_preview_displaces":if(TS.model.prefs.msg_preview_displaces!=a.value){TS.model.prefs.msg_preview_displaces=a.value;
TS.prefs.msg_preview_changed_sig.dispatch()
}break;
case"msg_preview_persistent":if(TS.model.prefs.msg_preview_persistent!=a.value){TS.model.prefs.msg_preview_persistent=a.value;
TS.prefs.msg_preview_changed_sig.dispatch()
}break;
case"winssb_run_from_tray":if(TS.model.prefs.winssb_run_from_tray!=a.value){TS.model.prefs.winssb_run_from_tray=a.value;
TSSSB.call("runFromTray",!!TS.model.prefs.winssb_run_from_tray)
}break;
case"winssb_window_flash_behavior":if(TS.model.prefs.winssb_window_flash_behavior!=a.value){TS.model.prefs.winssb_window_flash_behavior=a.value;
TSSSB.call("windowFlashBehavior",TS.model.prefs.winssb_window_flash_behavior)
}break;
case"mentions_exclude_at_channels":if(TS.model.prefs.mentions_exclude_at_channels!=a.value){TS.model.prefs.mentions_exclude_at_channels=a.value;
TS.prefs.mentions_exclude_at_channels_changed_sig.dispatch()
}break;
case"mentions_exclude_at_user_groups":if(TS.model.prefs.mentions_exclude_at_user_groups!=a.value){TS.model.prefs.mentions_exclude_at_user_groups=a.value;
TS.prefs.mentions_exclude_at_user_groups_changed_sig.dispatch()
}break;
case"k_key_omnibox":if(TS.model.prefs.k_key_omnibox!=a.value){TS.model.prefs.k_key_omnibox=a.value;
TS.prefs.k_key_omnibox_changed_sig.dispatch()
}break;
case"seen_spaces_new_xp_tooltip":if(TS.model.prefs.seen_spaces_new_xp_tooltip!=a.value){TS.model.prefs.seen_spaces_new_xp_tooltip=a.value;
TS.prefs.seen_spaces_new_xp_tooltip_changed_sig.dispatch()
}break;
case"no_omnibox_in_channels":if(TS.model.prefs.no_omnibox_in_channels!=a.value){TS.model.prefs.no_omnibox_in_channels=a.value;
TS.prefs.no_omnibox_in_channels_changed_sig.dispatch()
}break;
case"k_key_omnibox_auto_hide_count":if(TS.model.prefs.k_key_omnibox_auto_hide_count!=a.value){TS.model.prefs.k_key_omnibox_auto_hide_count=a.value;
TS.prefs.k_key_omnibox_auto_hide_count_changed_sig.dispatch()
}break;
default:TS.model.prefs[a.name]=a.value
}},hex_regex:new RegExp(/^#?([0-9a-f]{6})$/i),setSidebarThemeCustomValues:function(b){var c=false;
if(b&&typeof b==="object"&&b.length===undefined){for(var a in b){c=false;
if(!b[a]){break
}if(!b[a].substr){break
}b[a]=b[a].substr(0,7);
if(!b[a].match(TS.prefs.hex_regex)){break
}c=true
}}if(c){TS.model.prefs.sidebar_theme_custom_values=JSON.stringify(b)
}else{TS.model.prefs.sidebar_theme="default";
TS.model.prefs.sidebar_theme_custom_values=JSON.stringify(TS.sidebar_themes.default_themes.default_theme)
}},setMultiPrefsByAPI:function(c,d){var e="";
for(var a in c){e+="&"+encodeURIComponent(a)+"="+encodeURIComponent(c[a])
}if(!e){TS.error(" no prefs to set?");
return
}var b={prefs:e};
TS.prefs.setPrefByAPI(b,d)
},setPrefByAPI:function(a,b){var c=function(f,g,d){if(!f){var i="args:"+JSON.stringify(d)+" ";
try{i+="data:"+JSON.stringify(g)
}catch(h){i+="data2:"+g
}TS.logError({message:i},"TS.prefs.setPrefByAPI call got a not ok rsp");
setTimeout(function(){if(d.prefs){TS.error("multi preferences setting failed.")
}else{TS.error('"'+d.name+'" preference setting failed.')
}},0)
}if(b){b(f,g,d)
}};
TS.api.call("users.prefs.set",a,c)
},saveHighlightWords:function(e,g,c){var a=$.trim(e.replace(/\, /g,",")).split(",");
var f=[];
for(var b=0;
b<a.length;
b++){if(a[b]){f.push(a[b])
}}var d=f.join(",");
if(c||TS.model.prefs.highlight_words!=d){TS.prefs.setPrefByAPI({name:"highlight_words",value:d},g)
}},getReadStateTrackingPref:function(){var a="default";
if(TS.model.prefs.mark_msgs_read_immediately&&TS.model.prefs.start_scroll_at_oldest){a="immediate_scroll"
}else{if(TS.model.prefs.mark_msgs_read_immediately){a="immediate"
}}return a
},setReadStateTrackingPref:function(c,b){var a={};
if(c=="immediate_scroll"||c=="immediate"){a.mark_msgs_read_immediately=true;
TS.model.prefs.mark_msgs_read_immediately=true;
if(c=="immediate_scroll"){a.start_scroll_at_oldest=true;
TS.model.prefs.start_scroll_at_oldest=true
}else{a.start_scroll_at_oldest=false;
TS.model.prefs.start_scroll_at_oldest=false
}}else{a.mark_msgs_read_immediately=false;
TS.model.prefs.mark_msgs_read_immediately=false;
a.start_scroll_at_oldest=false;
TS.model.prefs.start_scroll_at_oldest=false
}TS.prefs.setMultiPrefsByAPI(a,b)
}})
})();
(function(){TS.registerModule("search",{search_dispatched_sig:new signals.Signal(),quick_search_results_fetched_sig:new signals.Signal(),all_search_results_fetched_sig:new signals.Signal(),message_search_results_fetched_sig:new signals.Signal(),file_search_results_fetched_sig:new signals.Signal(),autosuggest_search_results_fetched_sig:new signals.Signal(),search_filter_set_sig:new signals.Signal(),search_filetype_filter_set_sig:new signals.Signal(),search_sort_set_sig:new signals.Signal(),search_channel_set_sig:new signals.Signal(),search_group_set_sig:new signals.Signal(),search_member_set_sig:new signals.Signal(),message_search_more_results_fetched_sig:new signals.Signal(),query:"",query_string:"",last_search_query:"",previous_query:"",sort:"timestamp",filter:"messages",filetype:"all",results:{},submit_tim:0,delay:500,suggestions:[],input:"",from_regex:/from:[@*\-.\w]+/gi,member:null,from:null,in_regex:/in:[#*\-.\w]+/gi,channel:null,group:null,im:null,per_page:-1,keyword_modifiers:["after","before","bot","during","from","to","has","in","on"],keyword_modifier_pair_regex:null,keyword_modifier_extract_regex:null,search_query_max_length:250,onStart:function(){TS.search.keyword_modifier_pair_regex=new RegExp("^("+TS.search.keyword_modifiers.join("|")+"):S+$");
TS.search.keyword_modifier_extract_regex=new RegExp("^("+TS.search.keyword_modifiers.join("|")+"):w*");
TS.search.per_page=parseInt(TS.qs_args.search_count)||20;
if(TS.client){TS.search.delay=10
}if(TS.client){TS.client.login_sig.add(TS.search.loggedIn,TS.search)
}else{if(TS.web){TS.web.login_sig.add(TS.search.loggedIn,TS.search)
}}TS.search.search_channel_set_sig.add(TS.search.searchAll,TS.search);
TS.search.search_group_set_sig.add(TS.search.searchAll,TS.search);
TS.search.search_member_set_sig.add(TS.search.searchAll,TS.search);
TS.prefs.search_only_my_channels_changed_sig.add(TS.search.searchAll,TS.search);
TS.prefs.search_exclude_bots_changed_sig.add(TS.search.searchAll,TS.search);
if(TS.qs_args.delay){TS.search.delay=TS.qs_args.delay
}TS.search.input=$("#search_terms")
},loggedIn:function(){var e=TS.model.prefs.search_sort;
TS.search.sort=(e=="score"||e=="timestamp")?e:TS.search.sort
},startSearchTimer:function(f,e,g){clearTimeout(TS.search.submit_tim);
TS.search.submit_tim=setTimeout(TS.search.dispatchSearch,TS.search.delay,f,e,g);
TS.search.search_dispatched_sig.dispatch()
},getNextPageOfSearchResults:function(f,e){TS.search.dispatchSearch(f,TS.search.per_page,TS.search.onSearchAll,e)
},getNextPageOfMessageResults:function(g,f){var e=a(g,TS.search.per_page,f);
TS.api.call("search.messages",e,c)
},getNextPageOfFileResults:function(g,f){var e=a(g,TS.search.per_page,f);
TS.api.call("search.files",e,d)
},extractNonModifierSearchTxt:function(f){var g="";
var e=f.split(" ");
e.forEach(function(h){if(h.match(TS.search.keyword_modifier_extract_regex)){return
}g+=" "+h
});
g=$.trim(g);
return g
},dispatchSearch:function(h,f,k,g){var e=a(h,f,g);
if(!g||g==1){var j=TS.search.extractNonModifierSearchTxt(h);
if(j){TSSSB.call("writeFindString",j)
}}if(TS.search.separateMessagesAndFiles()){if(!g||g==1){TS.search.results[h]=null
}var i=b();
TS.api.call("search.messages",e,i.msgs);
TS.api.call("search.files",e,i.files)
}else{TS.api.call("search.all",e,k)
}},setFilter:function(e){TS.search.filter=e;
TS.search.search_filter_set_sig.dispatch()
},setFiletypeFilter:function(e){TS.search.filetype=e;
TS.search.search_filetype_filter_set_sig.dispatch()
},setSort:function(e){if(TS.search.sort==e){return
}$(".search_toggle").toggleClass("active");
TS.search.sort=e;
TS.search.search_sort_set_sig.dispatch();
TS.prefs.setPrefByAPI({name:"search_sort",value:(e=="score"?"score":"timestamp")})
},setChannel:function(f){var e=TS.channels.getChannelById(f);
if(e){TS.search.channel=e;
TS.search.group=null;
TS.search.im=null
}else{TS.search.channel=null
}TS.search.search_channel_set_sig.dispatch()
},setGroup:function(f){var e=TS.groups.getGroupById(f);
if(e){TS.search.group=e;
TS.search.channel=null;
TS.search.im=null
}else{TS.search.group=null
}TS.search.search_group_set_sig.dispatch()
},setMember:function(h){var g=TS.members.getMemberById(h);
if(g){TS.search.member=g
}else{TS.search.member=null;
TS.search.from=null;
var e=$.trim(TS.search.input.val());
var f=e.match(TS.search.from_regex);
if(f){$.each(f,function(k,j){e=$.trim(e.replace(j,""))
});
TS.search.input.val(e)
}}TS.search.search_member_set_sig.dispatch()
},buildQueryString:function(h,g){var f=h.match(TS.search.from_regex);
if(f){var j=false;
$.each(f,function(m,l){if(j){h=$.trim(h.replace(l,""))
}else{var k=l.replace("from:","");
if(k.toLowerCase()=="me"){if(g){TS.search.member=TS.model.user
}TS.search.from=null;
j=true
}else{var n=TS.members.getMemberByName(k);
if(n){if(g){TS.search.member=n
}TS.search.from=null;
j=true
}else{if(g){TS.search.from=k;
TS.search.member=null
}else{if(TS.search.member){TS.search.from=null
}}j=true
}}if(j){h=$.trim(h.replace(l,""))
}}})
}else{if(!TS.search.view.advanced_options&&TS.search.filter=="messages"){TS.search.member=null;
TS.search.from=null
}}var e=h.match(TS.search.in_regex);
if(e){var i=false;
$.each(e,function(n,m){if(i){h=$.trim(h.replace(m,""))
}else{var l=m.replace("in:","");
var o=TS.channels.getChannelByName(l);
var p=TS.groups.getGroupByName(l);
var k=TS.ims.getImByUsername(l);
if(o){i=true;
if(g){TS.search.channel=o;
TS.search.group=null;
TS.search.im=null
}}else{if(p){i=true;
if(g){TS.search.group=p;
TS.search.channel=null;
TS.search.im=null
}}else{if(k){i=true;
if(g){TS.search.im=k;
TS.search.channel=null;
TS.search.group=null
}}else{TS.info("Unable to filter search results by channel, group, or IM named '"+l+"'")
}}}i=true
}if(i){h=$.trim(h.replace(m,""))
}})
}else{if(!TS.search.view.advanced_options){TS.search.channel=null;
TS.search.group=null;
TS.search.im=null
}}if(!f){if(TS.search.previous_query==TS.search.query&&g){TS.search.member=null;
TS.search.from=null
}}if(!e){if(TS.search.previous_query==TS.search.query&&g){TS.search.channel=null;
TS.search.group=null;
TS.search.im=null
}}TS.search.query=$.trim(h);
TS.search.query_string=TS.search.query;
if(TS.search.member!==null){TS.search.query_string+=" from:"+TS.search.member.name
}if(TS.search.from!==null){TS.search.query_string+=" from:"+TS.search.from
}if(TS.search.channel!==null){TS.search.query_string+=" in:"+TS.search.channel.name
}if(TS.search.group!==null){TS.search.query_string+=" in:"+TS.search.group.name
}if(TS.search.im!==null){TS.search.query_string+=" in:"+TS.search.im.name
}TS.search.query_string=$.trim(TS.search.query_string)
},quickSearch:function(f){TS.search.query=f;
TS.search.buildQueryString(f);
var e=5;
TS.search.startSearchTimer(f,e,TS.search.onQuickSearch)
},onQuickSearch:function(f,g,e){if(!f){return
}TS.search.quick_search_results_fetched_sig.dispatch(g)
},searchAll:function(e){if(!TS.client){clearTimeout(TS.search.widget.key_tim)
}TS.search.previous_query=TS.search.query;
if(e){TS.search.query=e
}else{TS.search.query=$.trim(TS.search.input.val())
}TS.search.query=$.trim(TS.search.query);
TS.search.query_string=TS.search.query;
if(TS.search.query_string){TS.search.startSearchTimer(TS.search.query_string,TS.search.per_page,TS.search.onSearchAll)
}else{TS.search.view.updateOptions();
if(TS.client){TS.search.autocomplete.stopSpinner()
}else{TS.search.widget.stopSpinner()
}}},onSearchAll:function(f,h,e){if(TS.qs_args.force_search_fail=="1"){window.failed_once=true;
f=false;
h={ok:false,error:"solr_failed"}
}if(!f){var i=(h&&h.error)?h.error:"unknown_error";
if(!h){h={ok:false,error:i}
}h.query=h.query||e.query;
h.messages=h.messages||{total:0,paging:{count:TS.search.per_page,total:0,page:1,pages:0},matches:[]};
h.files=h.files||{total:0,paging:{count:TS.search.per_page,total:0,page:1,pages:0},matches:[]}
}if(e.query!=TS.search.query_string){if(!TS.search.results[e.query]||!TS.search.results[e.query].error){return
}}TS.search.last_search_query=e.query;
if(TS.client){TS.search.upsertFiles(h)
}TS.search.expandChannelsAndCheckForMsgsInModel(h);
if(e.page==1){TS.search.results[e.query]=h;
TS.search.results[e.query]["_time_of_search"]=Date.now();
TS.search.all_search_results_fetched_sig.dispatch(h,e);
TS.search.getNextPageOfSearchResults(e.query,2)
}else{var g=TS.search.results[e.query];
if(g.messages.matches){h.messages.matches=g.messages.matches.concat(h.messages.matches)
}if(g.files.matches){h.files.matches=g.files.matches.concat(h.files.matches)
}TS.search.results[e.query]=h;
TS.search.all_search_results_fetched_sig.dispatch(h,e)
}},searchSuggest:function(e){TS.api.call("search.autocomplete",{query:e},TS.search.onSearchSuggest)
},onSearchSuggest:function(f,g,e){if(!TS.client){if(TS.search.widget.suppress_suggestions){TS.search.widget.suppress_suggestions=false;
return
}}if(!f){return
}TS.search.suggestions=[];
if(g.suggestions[0]==TS.search.query&&g.suggestions.length==1){TS.search.suggestions=[]
}else{$.each(g.suggestions,function(h,j){TS.search.suggestions[h]={value:j,highlighted:TS.search.highlightSuggestion(TS.utility.htmlEntities(j))}
})
}TS.search.autosuggest_search_results_fetched_sig.dispatch(g,e)
},highlightSuggestion:function(f){var e=f.replace(new RegExp("("+TS.utility.preg_quote(TS.search.input.val())+")","gi"),"<b>$1</b>");
return e
},expandChannelsAndCheckForMsgsInModel:function(h){var f;
var e;
if(!h.messages||!h.messages.matches){return
}var j;
for(var g=0;
g<h.messages.matches.length;
g++){f=h.messages.matches[g];
if(!f){continue
}TS.utility.msgs.processAttachments(f.attachments);
if(f.next){TS.utility.msgs.processAttachments(f.next.attachments)
}if(f.next_2){TS.utility.msgs.processAttachments(f.next_2.attachments)
}if(f.previous){TS.utility.msgs.processAttachments(f.previous.attachments)
}if(f.previous_2){TS.utility.msgs.processAttachments(f.previous_2.attachments)
}if(TS.boot_data.feature_reactions){f._rxn_key=TS.rxns.getRxnKey("message",f.ts,f.channel.id);
j=TS.rxns.getExistingRxnsByKey(f._rxn_key);
if(j&&!f.reactions){TS.warn("msg:"+f.ts+" has reactions in local model, but we got an object in search results that does NOT have reactions, which seems suspicious")
}else{TS.rxns.upsertRxnsFromDataAndUpdateUI(f._rxn_key,f.reactions)
}}e=TS.shared.getModelObById(f.channel.id);
if(e){if(e.msgs){f.is_loaded=!!TS.utility.msgs.getMsg(f.ts,e.msgs)
}else{if(TS.client){TS.warn(e.name+" has no msgs")
}}f.channel=e;
if(!f.permalink){f.permalink=TS.utility.msgs.constructMsgPermalink(e,f.ts)
}}}},upsertFiles:function(f){if(!f.files||!f.files.matches){return
}for(var e=0;
e<f.files.matches.length;
e++){if(f.files.matches[e].preview){f.files.matches[e].preview_search=f.files.matches[e].preview;
delete f.files.matches[e].preview
}f.files.matches[e]=TS.files.upsertFile(f.files.matches[e]).file
}},getResultsByQuery:function(e){return TS.search.results[e]
},getMatchByQueryAndTs:function(f,e){return TS.search.getMatchByQueryByThings(f,e)
},getMatchByQueryAndChannelAndTs:function(g,e,f){return TS.search.getMatchByQueryByThings(g,f,e)
},getMatchByQueryByThings:function(h,g,e){var f=TS.search.getResultsByQuery(h);
if(!f){TS.error("WTF no results?");
return null
}return TS.search.getMatchFromResultsByThings(false,f,g,e)
},getMatchFromResultsByThings:function(k,h,j,e){if(!h){TS.error("WTF no results?");
return null
}if(!h.messages){TS.error("WTF no results.messages?");
return null
}if(!h.messages.matches){TS.error("WTF no results.messages.matches?");
return null
}var f;
for(var g=0;
g<h.messages.matches.length;
g++){f=h.messages.matches[g];
if(!f){TS.error("WTF no match?");
continue
}if((!e||f.channel.id==e)&&f.ts==j){if(k){return{match:f,index:g}
}else{return f
}}}return null
},truncateQuery:function(e){if(e.length>TS.search.search_query_max_length){return e.substring(0,TS.search.search_query_max_length)
}return e
},resetSearchOptions:function(){TS.search.channel=null;
TS.search.group=null;
TS.search.im=null;
TS.search.member=null;
TS.search.from=null;
TS.search.searchAll()
},saveSearch:function(e,f){if(!e.terms){return
}e.terms=$.trim(e.terms);
if(TS.search.keyword_modifier_pair_regex.test(e.terms)){return
}TS.api.call("search.save",e,f)
},separateMessagesAndFiles:function(){return !!TS.client
},setInputVal:function(e){TS.search.input.val(e).focus()
},appendToInputAndSelect:function(e){var f=TS.search.input.val();
if(f&&!/\s$/.test(f)){f+=" "
}TS.search.input.val(f+e);
TS.search.input.textrange("set",f.length,f.length+e.length)
},submitSearch:function(){TS.search.input.closest("form").trigger("submit")
}});
var a=function(h,f,g){var e={query:h,highlight:true,count:f,types:[TS.search.filetype],sort:TS.search.sort,no_posts:1,more_matches:true,page:g||1,include_attachments:!!TS.boot_data.feature_search_attachments,extracts:1,extra_message_data:1,max_extract_len:150,highlight_attachments:1};
return e
};
var c=function(f,h,e){if(!f||!h.messages){var i=(h&&h.error)?h.error:"unknown_error";
if(!h){h={ok:false,error:i}
}h.query=h.query||e.query;
h.messages=h.messages||{total:0,paging:{count:TS.search.per_page,total:0,page:1,pages:0},matches:[]}
}if(e.query!=TS.search.query_string){if(!TS.search.results[e.query]||!TS.search.results[e.query].error){return
}}if(TS.search.last_search_query!==e.query){delete TS.search.results[TS.search.last_search_query]
}TS.search.last_search_query=e.query;
TS.search.expandChannelsAndCheckForMsgsInModel(h);
var g=TS.search.results[e.query];
if(e.page==1){if(!g){TS.search.results[e.query]=h;
g=h
}else{$.extend(g,h)
}g.initial_messages_total=h.messages.total;
g._time_of_search=Date.now();
TS.search.message_search_results_fetched_sig.dispatch(g,e)
}else{if(g.messages&&g.messages.matches){h.messages.matches=g.messages.matches.concat(h.messages.matches)
}$.extend(g,h);
TS.search.message_search_results_fetched_sig.dispatch(g,e)
}};
var d=function(f,h,e){if(!f||!h.files){var i=(h&&h.error)?h.error:"unknown_error";
if(!h){h={ok:false,error:i}
}h.query=h.query||e.query;
h.files=h.files||{total:0,paging:{count:TS.search.per_page,total:0,page:1,pages:0},matches:[]}
}if(e.query!=TS.search.query_string){if(!TS.search.results[e.query]||!TS.search.results[e.query].error){return
}}if(TS.search.last_search_query!==e.query){delete TS.search.results[TS.search.last_search_query]
}TS.search.last_search_query=e.query;
if(TS.client){TS.search.upsertFiles(h)
}var g=TS.search.results[e.query];
if(e.page==1){if(!g){TS.search.results[e.query]=h;
g=h
}else{$.extend(g,h)
}g.initial_files_total=h.files.total;
g._time_of_search=Date.now();
TS.search.file_search_results_fetched_sig.dispatch(g,e)
}else{if(g.files&&g.files.matches){h.files.matches=g.files.matches.concat(h.files.matches)
}$.extend(g,h);
TS.search.file_search_results_fetched_sig.dispatch(g,e)
}};
var b=function(){var f=false;
var e=false;
var g=function(){if(f&&e){TS.search.all_search_results_fetched_sig.dispatch()
}};
return{msgs:function(){f=true;
c.apply(this,arguments);
g()
},files:function(){e=true;
d.apply(this,arguments);
g()
}}
}
})();
(function(){TS.registerModule("ms",{last_pong_time:0,sent_map:{},connected_sig:new signals.Signal(),disconnected_sig:new signals.Signal(),trouble_sig:new signals.Signal(),reconnecting_sig:new signals.Signal(),pong_sig:new signals.Signal(),on_msg_sig:new signals.Signal(),reconnect_requested_sig:new signals.Signal(),onStart:function(){j(TS.model.ui.is_window_focused||false);
TS.ui.window_focus_changed_sig.add(j);
setInterval(function(){if(!TS.model.ms_connected){return
}if(TS.model.rtm_start_throttler<1){return
}TS.model.rtm_start_throttler--
},1000*60)
},send:function(O,M,N){O.id=++K;
TS.ms.sent_map[O.id.toString()]={msg:O,handler:M,ts:Date.now(),temp_ts:N};
if(O.type=="ping"||O.type=="pong"){TS.log(3,"MS sending "+O.type);
TS.dir(3,O)
}else{TS.model.last_net_send=Date.now();
TS.log(2,"sending "+O.type);
TS.dir(2,O)
}u.send(JSON.stringify(O));
return O.id
},sendTyping:function(M){var N='{"type":"typing", "channel":"'+M+'"}';
u.send(N)
},sendTickle:function(){TS.model.last_net_send=Date.now();
var M='{"type":"tickle"}';
u.send(M)
},handleMsg:function(M){var P=M.reply_to&&!("ok" in M)&&M.type=="message";
if(P){}var N;
if(M.reply_to){if(M.reply_to.toString() in TS.ms.sent_map){N=TS.ms.sent_map[M.reply_to];
M.SENT_MSG=N.msg;
delete TS.ms.sent_map[M.reply_to]
}else{if(!P){TS.error('received msg "'+M.reply_to+'" with type "'+M.type+'" but we have no record of it in sent_map')
}}}else{if(M.event_ts&&!M._from_evt_log){TS.ms.storeLastEventTS(M.event_ts)
}if(TS.model.supports_user_caching&&M.cache_ts){TS.ms.storeLastCacheTS(M.cache_ts)
}}if(M.type=="ping"||M.type=="pong"){TS.log(3,"MS msg "+M.type+" time: "+(Date.now()-N.ts)+"ms");
TS.ms.last_pong_time=Date.now();
TS.ms.pong_sig.dispatch();
f=false;
TS.dir(3,M)
}else{if(N){var O=M.type?M.type:(M.SENT_MSG.type)?M.SENT_MSG.type:"";
TS.log(2,"msg "+((O)?'"'+O+'" ':"")+"rsp time "+(Date.now()-N.ts)+"ms")
}else{TS.log(2,'msg "'+M.type+'"')
}TS.dir(2,M)
}if(M.type=="error"){B(M)
}else{if(M.type=="hello"){h()
}else{if(!M.reply_to){TS.ms.on_msg_sig.dispatch(M)
}}}if(N){if(!M.ok){M.error=M.error||{code:0,msg:"unknown error (not specified by MS)"}
}if(P){M.ok=true
}if(N.handler){N.handler(M.ok,M)
}}},storeLastEventTS:function(N){if(!N){return
}var M=TS.storage.fetchLastEventTS();
if(M&&N<=M){return
}TS.storage.storeLastEventTS(N)
},storeLastCacheTS:function(M){if(!M){return
}var N=TS.storage.fetchLastCacheTS();
if(N&&M<=N){return
}TS.storage.storeLastCacheTS(M)
},onFailure:function(O){TS.warn("TS.ms.onFailure reason_str:"+O);
if(O){a("You got disconnected and are on team Tiny Speck, so here are some details:\n>>>"+O)
}f=false;
d();
if(TS.model.ms_connected){TS.info("Disconnected from MS, TS.model.rtm_start_throttler:"+TS.model.rtm_start_throttler);
TS.ms.logConnectionFlow("on_connected_failure");
TS.model.ms_reconnect_ms=100;
TS.ms.disconnect()
}else{TS.ms.logConnectionFlow("on_notconnected_failure");
var N=TS.model.ms_reconnect_ms=((TS.model.ms_reconnect_ms+1000)*1.3);
if(TS.model.ms_reconnect_ms>4000){TS.model.ms_reconnect_ms=TS.utility.randomInt(N,N+(N/3))
}TS.model.ms_reconnect_ms=Math.min(TS.model.ms_reconnect_ms,300000)
}if(TS.model.rtm_start_throttler>5){var M=2000*TS.model.rtm_start_throttler;
if(TS.model.ms_reconnect_ms<M){TS.info("because TS.model.rtm_start_throttler:"+TS.model.rtm_start_throttler+" we are increasing time until next login call");
TS.model.ms_reconnect_ms=M
}}if(TS.model.ms_connected){TS.model.ms_connected=false;
TS.ms.disconnected_sig.dispatch()
}TS.model.ms_connected=false;
clearInterval(e);
clearInterval(c);
if(TS.model.ms_asleep){TS.warn("NOT doing startReconnection(), we are asleep");
return
}TS.ms.startReconnection()
},startReconnection:function(){TS.model.ms_reconnect_time=Date.now()+TS.model.ms_reconnect_ms;
TS.info("Attempting to reconnect in "+TS.model.ms_reconnect_ms+"ms");
clearInterval(s);
s=setInterval(E,m);
E();
clearTimeout(b);
b=setTimeout(function(){if(!TS.model.window_unloading){TS.ms.reconnect_requested_sig.dispatch()
}},TS.model.ms_reconnect_ms)
},manualReconnectNow:function(){TS.ms.logConnectionFlow("manual_reconnect");
clearTimeout(b);
clearInterval(s);
clearTimeout(H);
L=0;
if(!TS.model.window_unloading){TS.ms.reconnect_requested_sig.dispatch();
TS.ms.reconnecting_sig.dispatch(0)
}},disconnect:function(){if(u&&TS.model.ms_connected){TS.ms.logConnectionFlow("disconnect");
u.close()
}else{TS.warn("TS.ms.disconnect called, but _websocket="+u+" TS.model.ms_connected="+TS.model.ms_connected)
}},logConnectionFlow:function(M){var N=TS.model.ms_conn_log;
var O=Date.now();
N.push({name:M,time:O,delta:(N.length)?O-N[N.length-1].time:0});
TS.log(2,"logConnectionFlow "+M+" "+N[N.length-1].delta)
},getConnectionFlowLog:function(){var P=TS.model.ms_conn_log;
var M=[];
for(var N=0;
N<P.length;
N++){M.push(encodeURIComponent(P[N].name+"-"+(P[N].delta?Math.round(P[N].delta/1000):0)+"-"+Math.round(P[N].time/1000)))
}TS.dir(2,TS.model.ms_conn_log);
var O=M.join("&");
return O
},connect:function(){TS.logLoad("TS.ms.connect "+TS.model.team.url);
if(!window.WebSocket){window.WebSocket=window.MozWebSocket
}if(window.WebSocket){var N;
try{TS.ms.logConnectionFlow("connect");
N=TS.model.team.url;
var O=(TS.qs_args.simulate_old_token==1)?"&TRIGGER_OLD_TOKEN=1":"";
N+="?version_uid="+TS.boot_data.version_uid+O;
N=TS.utility.appendLogToUrlWithLimit(N,TS.ms.getConnectionFlowLog());
TS.info("Connecting to: "+N);
if(TS.qs_args.simulate_first_connect_failure==1&&!window.already_simulated_first_connect_failure){N=N.replace("e","w");
TS.info("simulate_first_connect_failure url:"+N);
window.already_simulated_first_connect_failure=true
}y=(window.WEB_SOCKET_USING_FLASH)?F:w;
clearTimeout(H);
H=setTimeout(D,y);
TS.ms.last_url=N;
TS.ms.last_start_ms=Date.now();
d();
u=new WebSocket(N)
}catch(M){TS.warn("failed to create new WebSocket");
TS.error(M);
TS.ms.onFailure("failed to create new WebSocket");
return
}TS.model.ms_connecting=true;
if(TS.qs_args.simulate_first_connect_timeout==1&&L<1){TS.info("simulate_first_connect_timeout url:"+N)
}else{u.onopen=G
}u.onclose=v;
u.onerror=A
}else{alert("Your browser does not support Web Sockets.")
}}});
var e=0;
var J=3000;
var c=0;
var o=10000;
var H=0;
var y=0;
var w=10000;
var F=20000;
var i=0;
var r=10000;
var z=0;
var x=5000;
var s=0;
var m=1000;
var b=0;
var u=null;
var K=0;
var f=false;
var q=0;
var n=300000;
var L=0;
var p=null;
var l=2000;
var j=function(M){if(M){q=10000
}else{q=60000
}q+=o;
TS.log(3,"MS _pong_timeout_ms set to:"+q+" has_focus:"+M)
};
var g=function(N){var M=JSON.parse(N.data);
TS.ms.handleMsg(M)
};
var G=function(M){clearTimeout(H);
L=0;
if(TS.qs_args.simulate_hello_timeout==1&&!window.already_simulated_hello_timeout){TS.info("simulate_hello_timeout");
window.already_simulated_hello_timeout=true
}else{u.onmessage=g
}TS.model.ms_conn_log.length=0;
TS.logLoad("_onConnect (took "+(Date.now()-TS.ms.last_start_ms)+"ms)");
TS.info("MS WS connected!");
TS.ms.logConnectionFlow("on_connect");
clearTimeout(i);
i=setTimeout(I,r)
};
var t=function(V,S,U){if(!V){TS.error("_onEventLog "+S);
if(TS.client&&S&&S.error=="timestamp_too_old"){TS.storage.cleanOutMsgStorageAndReset();
var N="TS.reload() after a TS.storage.cleanOutMsgStorageAndReset() because data.error: <code>timestamp_too_old</code>";
if(S.reason){N+=" data.reason: <code>"+S.reason+"</code>"
}if(U){delete U.token
}try{N+=" args: <pre>"+JSON.stringify(U,null,"\t")+"</pre>"
}catch(P){}N+="<p><b>Tell eric about this, please!</b></p>";
setTimeout(TS.reload,1,null,N)
}return
}if(!S.events){TS.error("_onEventLog missing events");
return
}if(TS.client&&S.has_more){TS.storage.cleanOutMsgStorageAndReset();
TS.info("going to call TS.reload() after a TS.storage.cleanOutMsgStorageAndReset() because data.has_more:"+S.has_more+")");
setTimeout(TS.reload,1,null,"TS.reload() after a TS.storage.cleanOutMsgStorageAndReset() because data.has_more:"+S.has_more+")");
return
}var O;
var X;
var Q=[];
var W={};
var M;
var R;
for(R=S.events.length-1;
R>-1;
R--){X=S.events[R];
X._from_evt_log=true;
M=null;
O=O||X.event_ts;
if(X.type=="file_change"&&X.file&&X.file.id){M=X.type+X.file.id
}else{if(X.type=="user_change"&&X.user&&X.user.id){M=X.type+X.user.id
}else{if(X.type=="emoji_changed"){M=X.type
}else{if(X.type=="channel_history_changed"&&X.channel){M=X.type+X.channel
}else{if(X.type=="group_history_changed"&&X.channel){M=X.type+X.channel
}else{if(X.type=="im_history_changed"&&X.channel){M=X.type+X.channel
}}}}}}if(M){if(W[M]){continue
}W[M]=true;
Q.unshift(X)
}else{if(X.type=="slack_broadcast"){if(!X.reload){continue
}var Y=p;
if(Y){if(!Y.force_reload&&X.force_reload){p=X
}}else{p=X
}}else{Q.unshift(X)
}}}for(R=0;
R<Q.length;
R++){X=Q[R];
try{TS.ms.handleMsg(X)
}catch(T){}}if(O){TS.ms.storeLastEventTS(O)
}if(p){try{TS.ms.handleMsg(p)
}catch(T){}p=null
}};
var k=function(){if(!f){return
}var N=Date.now()-TS.ms.last_pong_time;
TS.log(3,"MS since_last_pong_ms:"+N+" pong_timeout_ms:"+q);
if(N<q){return
}TS.warn("since_last_pong_ms too long! "+N+" > "+q);
TS.warn("calling disconnect(), expect to get an onDisconnect() callback");
TS.ms.logConnectionFlow("on_ping_timeout");
TS.ms.trouble_sig.dispatch();
f=false;
a("You are on team Tiny Speck, so here are some pong details:\n>>>since_last_pong_ms too long! "+N+" > "+q+" ... calling disconnect(), expect to get an onDisconnect() callback");
try{TS.ms.disconnect();
clearTimeout(z);
z=setTimeout(function(){TS.info("called disconnect, no onDisconnect callback happened in "+x+"ms, so calling _onDisconnect() manually now");
v(null,"since_last_pong_ms too long! then called disconnect, but no onDisconnect callback happened in "+x+"ms, so calling _onDisconnect() manually now")
},x)
}catch(M){TS.info("since_last_pong_ms too long! then an error calling disconnect, going to assume it is because it is already closed, calling _onDisconnect() manually now");
TS.warn(M);
v(null,"error calling disconnect, going to assume it is because it is already closed, calling _onDisconnect() manually now")
}};
var C=function(){TS.ms.send({type:"ping"});
f=true
};
var v=function(N,M){M=M||"_onDisconnect called with event:"+N;
TS.info("MS WS disconnected");
TS.ms.logConnectionFlow("on_disconnect");
clearTimeout(z);
clearTimeout(i);
clearTimeout(H);
if(N){TS.info("_onDisconnect event.code:"+N.code);
if(N.code=="1006"&&false){TS.generic_dialog.start({title:"Connection trouble error #1006",body:"Apologies, we're having some trouble with your connection. The particular error code indicates that restarting the application might fix it.",show_cancel_button:false,show_go_button:true,go_button_text:"OK",esc_for_ok:true})
}}else{TS.info("no event")
}TS.ms.onFailure(M)
};
var a=function(M){return
};
var d=function(){if(!u){return
}u.onmessage=null;
u.onopen=null;
u.onerror=null;
u.onclose=null;
try{u.close()
}catch(N){}if(false){var M=u;
u.onclose=function(O){TS.ms.logConnectionFlow("old_socket_closed");
if(!TS.model.ms_connected&&!TS.model.ms_connecting){TS.warn("Our last socket just fired a close event, and we are not yet connected or connecting again, so let us jump start the connection process with manualReconnectNow()");
TS.ms.manualReconnectNow()
}M.onclose=null
}
}};
var E=function(){var M=TS.model.ms_reconnect_time-Date.now();
var N=Math.round(M/1000);
if(N>=0){TS.ms.reconnecting_sig.dispatch(N)
}if(TS.model.window_unloading){clearInterval(s)
}};
var I=function(){var M="socket received no hello msg "+r+"ms after connection";
TS.warn(M);
TS.ms.logConnectionFlow("_onHelloTimeout");
TS.ms.onFailure(M)
};
var D=function(){L++;
var M="socket not connected "+y+"ms after creation. _connect_timeout_count:"+L;
TS.warn(M);
TS.ms.logConnectionFlow("_onConnectTimeout");
if(L==3){TS.generic_dialog.start({title:"Connection trouble",body:"<p>Apologies, we're having some trouble with your web socket connection.</p>				<p>We've seen this problem clear up with a restart of "+(TS.model.is_our_app?"Slack":"your browser")+", 				a solution which we suggest to you now only with great regret and self loathing.</p>				",show_cancel_button:false,go_button_text:"OK",esc_for_ok:true});
return
}else{if(L==2){if(window.WEB_SOCKET_USING_FLASH){}else{if(TS.model.is_chrome){window.fallBackToFlashWebSockets();
setTimeout(function(){if(window.WEB_SOCKET_USING_FLASH_BUT_NO_FLASH||!document.getElementById("webSocketFlash")||!document.getElementById("webSocketFlash").receiveEvents){TS.generic_dialog.start({title:"Connection trouble",body:"<p>Apologies, we're having some trouble with your web socket connection. 							We tried falling back to Flash, but it appears you do not have a version of Flash installed that we can use.</p>							<p>But we've seen this problem clear up with a restart of "+(TS.model.is_our_app?"Slack":"your browser")+", 							a solution which we suggest to you now only with great regret and self loathing.</p>							",show_cancel_button:false,go_button_text:"OK",esc_for_ok:true})
}else{TS.ms.onFailure("3secs passed, waiting on Flash, no connection")
}},3000);
return
}}}}TS.ms.onFailure(M)
};
var A=function(M){var N="";
if(M){if(M.name){N+=" e.name="+M.name
}if(M.message){N+=" e.message="+M.message
}if(M.data){N+=" e.data="+M.data
}}TS.warn("_onError err_str: "+N);
TS.dir(0,M)
};
var B=function(M){if(M.error){if(M.error.code==1){TS.ms.logConnectionFlow("msg_error_code_1")
}else{TS.logError({message:JSON.stringify(M)},"_onErrorMsg");
TS.ms.onFailure("_onErrorMsg imsg.error:"+M.error)
}}else{TS.logError({message:M?JSON.stringify(M):"no imsg?"},"_onErrorMsg")
}};
var h=function(){clearTimeout(i);
TS.logLoad("_onHello (took "+(Date.now()-TS.ms.last_start_ms)+"ms)");
var N=Date.now()-TS.ms.last_pong_time;
TS.info("Hello msg recvd, since_last_pong_ms:"+N);
TS.ms.logConnectionFlow("on_hello");
if(TS.client&&N>n){TS.client.ui.maybePromptForSetActive()
}clearInterval(s);
f=true;
TS.ms.last_pong_time=Date.now();
clearInterval(e);
e=setInterval(k,J);
clearInterval(c);
c=setInterval(C,o);
TS.model.ms_connecting=false;
TS.model.ms_connected=true;
var M=TS.storage.fetchLastEventTS();
TS.info("calling eventlog.history with start:"+M+" (from TS.storage.fetchLastEventTS())");
if(M){TS.api.callImmediately("eventlog.history",{start:M,count:l},t)
}TS.ms.connected_sig.dispatch();
C()
}
})();
(function(){TS.registerModule("ms.msg_handlers",{onStart:function(){TS.ms.on_msg_sig.add(TS.ms.msg_handlers.msgReceived)
},msgReceivedFromParentWindow:function(b){if(b.reply_to){return
}if(!TS.ms.msg_handlers[b.type]){return
}TS.ms.msg_handlers[b.type](b)
},msgReceived:function(b){if(b.reply_to){return
}if(!TS.ms.msg_handlers[b.type]){return
}TS.ms.msg_handlers[b.type](b);
if(TS.client&&TS.model.is_our_app){TS.dir(236,b,"calling TS.client.windows.distributeMsgToWins");
TS.client.windows.distributeMsgToWins(b)
}},message:function(c){if(!TS.client){return
}TS.log(2,"recved message "+c.type);
if(c.is_ephemeral&&!c.ts){c.ts=TS.utility.date.makeTsStamp()
}var f="subtype__"+c.subtype;
if(f in TS.ms.msg_handlers){if(TS.boot_data.feature_channel_eventlog_client){if(c.subtype=="message_changed"||c.subtype=="message_deleted"||c.subtype=="channel_history_changed"||c.subtype=="group_history_changed"||c.subtype=="im_history_changed"){c.type=c.subtype;
delete c.subtype;
TS.ms.msg_handlers[c.type](c);
return
}if(c.hidden){console.error("WE SHOULD NOT BE GETTING ANY HIDDEN MESSAGES ANYMORE");
console.dir(0,c)
}}TS.ms.msg_handlers[f](c)
}var d=TS.utility.msgs.processImsg(c,c.channel);
if(TS.ims.getImById(c.channel)){if(c.text=="start_profile_AAAAAA"){TS.model.profiling_keys=true
}else{if(c.text=="end_profile_AAAAAA"){TS.model.profiling_keys=false;
if(TS.model.profiling_key_times){TS.files.upload({text:JSON.stringify(TS.model.profiling_key_times,null,"\t"),title:"auto profile",filetype:"javascript",channels:[c.channel],initial_comment:""});
delete TS.model.profiling_key_times
}}}TS.ims.addMsg(c.channel,d)
}else{if(TS.mpims.getMpimById(c.channel)){TS.mpims.addMsg(c.channel,d)
}else{if(TS.groups.getGroupById(c.channel)){TS.groups.addMsg(c.channel,d)
}else{TS.channels.addMsg(c.channel,d)
}}}var b=TS.shared.getModelObById(c.channel);
var e=TS.members.getMemberById(d.user);
if(TS.typing&&e&&b){TS.typing.memberEnded(b,e)
}},subtype__file_share:function(b){if(!b.file){return
}if(b.file.id==TS.files.polling_file_id){TS.files.uploadProcessingOver(true,b.file.id)
}},message_changed:function(b){TS.log(2,"recved message "+b.type);
TS.ms.msg_handlers.message_changed_worker(b)
},subtype__message_changed:function(b){TS.log(2,"recved subtype "+b.subtype);
if(TS.boot_data.feature_channel_eventlog_client){TS.warn("feature_channel_eventlog_client=1 so we should never be getting subtype "+b.subtype)
}TS.ms.msg_handlers.message_changed_worker(b)
},message_changed_worker:function(d){if(!d.message){TS.error("no message?");
return
}TS.mentions.replaceMsg(d.message);
var c=TS.shared.getModelObById(d.channel);
if(!c){TS.error("unknown imsg.channel:"+d.channel);
return
}if(TS.pins){TS.pins.replaceMsg(d.message,c)
}if(d.message.imgs||TS.utility.msgs.hasImgs(d.message)){TS.model.show_inline_img_size_pref_reminder=true
}var b=true;
TS.utility.msgs.replaceMsg(c,d.message,b)
},message_deleted:function(b){TS.log(2,"recved message "+b.type);
TS.ms.msg_handlers.message_deleted_worker(b)
},subtype__message_deleted:function(b){TS.log(2,"recved subtype "+b.subtype);
if(TS.boot_data.feature_channel_eventlog_client){TS.warn("feature_channel_eventlog_client=1 so we should never be getting subtype "+b.subtype)
}TS.ms.msg_handlers.message_deleted_worker(b)
},message_deleted_worker:function(e){if(!e.deleted_ts){TS.error("no deleted_ts?");
return
}TS.mentions.removeMsg(e.deleted_ts);
var f=TS.channels.getChannelById(e.channel);
var c;
var h;
var g;
if(!f){c=TS.ims.getImById(e.channel)
}if(!f&&!c){g=TS.mpims.getMpimById(e.channel)
}if(!f&&!c&&!g){h=TS.groups.getGroupById(e.channel)
}if(!c&&!f&&!g&&!h){TS.error("unknown imsg.channel:"+e.channel);
return
}var b=c||f||g||h;
if(TS.pins){TS.pins.removeMsg(e.deleted_ts,b)
}var d=TS.utility.msgs.getMsg(e.deleted_ts,b.msgs);
if(!d&&b._archive_msgs){d=TS.utility.msgs.getMsg(e.deleted_ts,b._archive_msgs)
}if(!d){return
}if(c){TS.ims.removeMsg(b.id,d)
}else{if(f){TS.channels.removeMsg(b.id,d)
}else{if(g){TS.mpims.removeMsg(b.id,d)
}else{if(h){TS.groups.removeMsg(b.id,d)
}}}}},subtype__sh_room_created:function(b){if(!TS.boot_data.feature_screenhero){return
}if(!b.room){return
}TS.dir(441,b)
},subtype__sh_room_shared:function(b){if(!TS.boot_data.feature_screenhero){return
}if(!b.room){return
}TS.dir(441,b)
},channel_left:function(b){TS.info("You left channel "+b.channel);
var c=TS.channels.getChannelById(b.channel);
if(!c){TS.error('unknown channel: "'+b.channel)
}c.is_member=false;
if(TS.model.active_channel_id==b.channel&&!c.was_archived_this_session){if(TS.client){TS.client.activeChannelDisplayGoneAway()
}}TS.channels.calcUnreadCnts(c,true);
TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.channels.left_sig.dispatch(c)
},subtype__channel_leave:function(c){var b=c.user;
var f=TS.members.getMemberById(b);
if(!f){TS.error('unknown member: "'+b+'"');
return
}TS.info(f.name+" left channel "+c.channel);
var e=TS.channels.getChannelById(c.channel);
if(e){for(var d=0;
d<e.members.length;
d++){if(e.members[d]==f.id){e.members.splice(d,1);
TS.channels.calcActiveMembersForChannel(e);
break
}}}TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.channels.member_left_sig.dispatch(e,f)
},channel_joined:function(b){TS.info("You joined channel "+b.channel.name);
var c=TS.channels.upsertChannel(b.channel);
TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.channels.joined_sig.dispatch(c)
},channel_created:function(b){if(TS.model.user.is_restricted){return
}TS.info("created channel "+b.channel.name);
var c=TS.channels.upsertChannel(b.channel);
TS.channels.created_sig.dispatch(c)
},channel_deleted:function(b){var c=TS.channels.getChannelById(b.channel);
if(!c){TS.error('unknown channel: "'+b.channel);
return
}TS.info("deleted channel "+b.channel);
TS.channels.removeChannel(c)
},channel_archive:function(b){var c=TS.channels.getChannelById(b.channel);
if(!c){TS.error('unknown channel: "'+b.channel);
return
}if(c.is_archived){return
}TS.info("archived channel "+b.channel);
c.members.length=0;
TS.channels.calcActiveMembersForChannel(c);
c.is_archived=true;
if(!TS.model.user.is_restricted){if(c.is_member){c.was_archived_this_session=true
}}TS.channels.archived_sig.dispatch(c)
},channel_unarchive:function(b){var d=TS.channels.getChannelById(b.channel);
if(!d){TS.error('unknown channel: "'+b.channel);
return
}if(!d.is_archived){return
}TS.info("unarchived channel "+b.channel);
if(d.was_archived_this_session){var c=true;
TS.channels.join(d.name,null,c)
}d.is_archived=false;
d.was_archived_this_session=false;
TS.channels.unarchived_sig.dispatch(d)
},channel_rename:function(b){var c=TS.channels.getChannelById(b.channel.id);
if(!c){TS.error('unknown channel: "'+b.channel);
return
}TS.info("renamed channel "+b.channel.id+" to "+b.channel.name);
TS.channels.channelRenamed(b.channel)
},subtype__channel_join:function(c){var b=c.user;
var g=TS.members.getMemberById(b);
if(!g){TS.error('unknown member: "'+b+'"');
return
}TS.info(g.name+" joined channel "+c.channel);
var f=TS.channels.getChannelById(c.channel);
var d;
if(f){for(var e=0;
e<f.members.length;
e++){if(f.members[e]==g.id){d=f.members[e];
break
}}}if(!d){f.members.push(g.id);
TS.channels.calcActiveMembersForChannel(f)
}if(g.is_self&&c.inviter){f.needs_invited_message=true;
f.inviter=c.inviter
}TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.channels.member_joined_sig.dispatch(f,g)
},channel_marked:function(b){if(!TS.client){return
}var c=TS.channels.getChannelById(b.channel);
if(!c){TS.error('unknown channel: "'+b.channel+'"');
return
}c.needs_invited_message=false;
TS.channels.setLastRead(c,b.ts)
},subtype__channel_topic:function(c){var d=TS.channels.getChannelById(c.channel);
if(!d){TS.error('unknown channel: "'+c.channel+'"');
return
}var b=c.user;
var e=TS.members.getMemberById(b);
if(!e){TS.error('unknown member: "'+b+'"');
return
}TS.info(e.name+" changed topic for channel "+c.channel+" to "+c.topic);
TS.channels.topicChanged(d,b,c.ts,c.topic)
},subtype__channel_purpose:function(c){var d=TS.channels.getChannelById(c.channel);
if(!d){TS.error('unknown channel: "'+c.channel+'"');
return
}var b=c.user;
var e=TS.members.getMemberById(b);
if(!e){TS.error('unknown member: "'+b+'"');
return
}TS.info(e.name+" changed purpose for channel "+c.channel+" to "+c.purpose);
TS.channels.purposeChanged(d,b,c.ts,c.purpose)
},channel_history_changed:function(b){TS.ms.msg_handlers.channel_history_changed_worker(b)
},subtype__channel_history_changed:function(b){if(TS.boot_data.feature_channel_eventlog_client){TS.warn("feature_channel_eventlog_client=1 so we should never be getting subtype "+b.subtype)
}TS.ms.msg_handlers.channel_history_changed_worker(b)
},channel_history_changed_worker:function(b){var c=TS.channels.getChannelById(b.channel);
if(!c){TS.error('unknown channel: "'+b.channel+'"');
return
}if(!c.is_member){TS.warn("we can ignore this channel_history_changed msg, we are not a member");
return
}c.history_changed=true;
TS.channels.fetchHistory(c,{channel:c.id,latest:b.latest,inclusive:true,count:TS.utility.clamp(c.msgs.length,TS.model.initial_msgs_cnt,1000)},function(f,g,d){if(!f){TS.error("could not retrieve history")
}else{c.is_limited=false;
c.oldest_msg_ts=null;
TS.storage.storeOldestTs(c.id,null);
TS.warn("imsg.latest: "+b.latest);
for(var e=c.msgs.length-1;
e>-1;
e--){var h=c.msgs[e];
if(h.ts<b.latest){continue
}g.messages.unshift(h)
}c.msgs.length=0
}TS.channels.onHistory(f,g,d);
delete c.history_changed
});
if(c.id==TS.model.active_channel_id){}else{}},mpim_joined:function(b){var d=TS.mpims.getMpimById(b.channel.id);
if(d){return
}var c=TS.mpims.upsertMpim(b.channel);
TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.mpims.joined_sig.dispatch(c);
if(TS.client){TS.shared.checkInitialMsgHistory(c,TS.mpims)
}},subtype__mpim_join:function(c){var b=c.user;
var d=TS.members.getMemberById(b);
if(!d){TS.error('unknown member: "'+b+'"');
return
}TS.info(d.name+" joined mpim "+c.channel);
return
},mpim_open:function(b){var c=TS.mpims.getMpimById(b.channel);
if(!c){TS.error("unknown mpim! "+b.channel);
return
}var d=c.is_open;
c.is_open=true;
if(TS.model.requested_mpim_opens[b.channel]){TS.mpims.displayMpim(c.id,false,TS.model.requested_mpim_opens[b.channel].and_send_txt);
delete TS.model.requested_mpim_opens[b.channel]
}c.opened_this_session=true;
if(!d){TS.mpims.opened_sig.dispatch(c);
if(TS.client){TS.shared.checkInitialMsgHistory(c,TS.mpims)
}}},mpim_close:function(b){var c=TS.mpims.getMpimById(b.channel);
if(!c){TS.error('unknown mpim: "'+b.channel+'"');
return
}c.is_open=false;
if(TS.model.active_mpim_id==b.channel){if(TS.client){TS.client.activeChannelDisplayGoneAway()
}}TS.mpims.closed_sig.dispatch(c)
},mpim_marked:function(b){if(!TS.client){return
}var c=TS.mpims.getMpimById(b.channel);
if(!c){TS.error('unknown mpim: "'+b.channel+'"');
return
}c.needs_invited_message=false;
TS.mpims.setLastRead(c,b.ts)
},group_left:function(b){TS.info("You left group "+b.channel);
var c=TS.groups.getGroupById(b.channel);
if(!c){TS.error('unknown group: "'+b.channel);
return
}TS.groups.removeGroup(c);
TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.groups.left_sig.dispatch(c)
},subtype__group_leave:function(c){var b=c.user;
var f=TS.members.getMemberById(b);
if(!f){TS.error('unknown member: "'+b+'"');
return
}TS.info(f.name+" left group "+c.channel);
var e=TS.groups.getGroupById(c.channel);
if(e){for(var d=0;
d<e.members.length;
d++){if(e.members[d]==f.id){e.members.splice(d,1);
TS.groups.calcActiveMembersForGroup(e);
break
}}}TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.groups.member_left_sig.dispatch(e,f)
},group_joined:function(b){TS.info("You joined group "+b.channel.name);
if(TS.boot_data.feature_mpim_client&&b.channel.is_mpim){return
}var c=TS.groups.getGroupById(b.channel.name);
if(c){TS.error("should not be getting a group_joined message if we already know about the group: "+b.channel.name+" "+b.channel.id);
return
}var d=TS.groups.upsertGroup(b.channel);
TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.groups.joined_sig.dispatch(d);
if(TS.client){TS.shared.checkInitialMsgHistory(d,TS.groups)
}},group_deleted:function(b){var c=TS.groups.getGroupById(b.channel);
if(!c){TS.error('unknown group: "'+b.channel);
return
}TS.info("deleted group "+b.channel);
TS.groups.removeGroup(c)
},group_archive:function(b){var c=TS.groups.getGroupById(b.channel);
if(!c){TS.error('unknown group: "'+b.channel);
return
}if(c.is_archived){return
}TS.info("archived group "+b.channel);
c.is_archived=true;
if(c.is_open){c.was_archived_this_session=true
}TS.groups.archived_sig.dispatch(c)
},group_unarchive:function(b){var c=TS.groups.getGroupById(b.channel);
if(!c){TS.error('unknown group: "'+b.channel);
return
}if(!c.is_archived){return
}TS.info("unarchived group "+b.channel);
c.is_archived=false;
c.was_archived_this_session=false;
TS.groups.unarchived_sig.dispatch(c)
},group_rename:function(b){var c=TS.groups.getGroupById(b.channel.id);
if(!c){TS.error('unknown group: "'+b.channel.id);
return
}TS.info("renamed group "+b.channel.id+" to "+b.channel.name);
TS.groups.groupRenamed(b.channel)
},subtype__group_join:function(c){var b=c.user;
var g=TS.members.getMemberById(b);
if(!g){TS.error('unknown member: "'+b+'"');
return
}if(TS.boot_data.feature_mpim_client&&c.is_mpim){return
}TS.info(g.name+" joined group "+c.channel);
var f=TS.groups.getGroupById(c.channel);
var d;
if(f){for(var e=0;
e<f.members.length;
e++){if(f.members[e]==g.id){d=f.members[e];
break
}}}if(!d){f.members.push(g.id);
TS.groups.calcActiveMembersForGroup(f)
}if(g.is_self&&c.inviter){f.needs_invited_message=true;
f.inviter=c.inviter
}TS.members.invalidateMembersUserCanSeeArrayCaches();
TS.groups.member_joined_sig.dispatch(f,g)
},group_open:function(b){if(TS.mpims.getMpimById(b.channel)){return TS.ms.msg_handlers.mpim_open(b)
}var d=TS.groups.getGroupById(b.channel);
if(!d){TS.error("unkown group! "+b.channel);
return
}var c=d.is_open;
d.is_open=true;
if(TS.model.requested_group_opens[b.channel]){TS.groups.displayGroup(d.id,false,TS.model.requested_group_opens[b.channel].and_send_txt);
delete TS.model.requested_group_opens[b.channel]
}d.opened_this_session=true;
if(!c){TS.groups.opened_sig.dispatch(d);
if(TS.client){TS.shared.checkInitialMsgHistory(d,TS.groups)
}}},group_marked:function(b){if(!TS.client){return
}if(TS.mpims.getMpimById(b.channel)){return TS.ms.msg_handlers.mpim_marked(b)
}var c=TS.groups.getGroupById(b.channel);
if(!c){TS.error('unknown group: "'+b.channel+'"');
return
}c.needs_invited_message=false;
TS.groups.setLastRead(c,b.ts)
},group_close:function(b){if(TS.mpims.getMpimById(b.channel)){return TS.ms.msg_handlers.mpim_close(b)
}var c=TS.groups.getGroupById(b.channel);
if(!c){TS.error('unknown group: "'+b.channel+'"');
return
}c.is_open=false;
if(TS.model.active_group_id==b.channel){if(TS.client){TS.client.activeChannelDisplayGoneAway()
}}TS.groups.closed_sig.dispatch(c)
},subtype__group_topic:function(c){var d=TS.mpims.getMpimById(c.channel);
if(TS.boot_data.feature_mpim_client&&d){return
}var e=TS.groups.getGroupById(c.channel);
if(!e){TS.error('unknown group: "'+c.channel+'"');
return
}var b=c.user;
var f=TS.members.getMemberById(b);
if(!f){TS.error('unknown member: "'+b+'"');
return
}TS.info(f.name+" changed topic for group "+c.channel+" to "+c.topic);
TS.groups.topicChanged(e,b,c.ts,c.topic)
},subtype__group_purpose:function(c){var d=TS.mpims.getMpimById(c.channel);
if(TS.boot_data.feature_mpim_client&&d){return
}var e=TS.groups.getGroupById(c.channel);
if(!e){TS.error('unknown group: "'+c.channel+'"');
return
}var b=c.user;
var f=TS.members.getMemberById(b);
if(!f){TS.error('unknown member: "'+b+'"');
return
}TS.info(f.name+" changed purpose for group "+c.channel+" to "+c.purpose);
TS.groups.purposeChanged(e,b,c.ts,c.purpose)
},group_history_changed:function(b){TS.ms.msg_handlers.group_history_changed_worker(b)
},subtype__group_history_changed:function(b){if(TS.boot_data.feature_channel_eventlog_client){TS.warn("feature_channel_eventlog_client=1 so we should never be getting subtype "+b.subtype)
}TS.ms.msg_handlers.group_history_changed_worker(b)
},group_history_changed_worker:function(b){var c=TS.groups.getGroupById(b.channel);
if(!c){TS.error('unknown group: "'+b.channel+'"');
return
}c.history_changed=true;
TS.groups.fetchHistory(c,{channel:c.id,latest:b.latest,inclusive:true,count:TS.utility.clamp(c.msgs.length,TS.model.initial_msgs_cnt,1000)},function(f,g,d){if(!f){TS.error("could not retrieve history")
}else{c.is_limited=false;
c.oldest_msg_ts=null;
TS.storage.storeOldestTs(c.id,null);
TS.warn("imsg.latest: "+b.latest);
for(var e=c.msgs.length-1;
e>-1;
e--){var h=c.msgs[e];
if(h.ts<b.latest){continue
}g.messages.unshift(h)
}c.msgs.length=0
}TS.groups.onHistory(f,g,d);
delete c.history_changed
});
if(c.id==TS.model.active_group_id){}else{}},im_created:function(c){var b=TS.ims.getImById(c.channel.id);
if(b){TS.error("we already have an im for this user! "+c.user);
return
}TS.ims.upsertIm(c.channel);
b=TS.ims.getImById(c.channel.id);
if(!b){TS.error("WTF why can we not find this im: "+c.channel.id);
return
}TS.members.invalidateMembersUserCanSeeArrayCaches();
if(b.is_open){if(TS.model.requested_im_opens[c.user]){TS.ims.displayIm(b.id,false,TS.model.requested_im_opens[c.user].and_send_txt);
delete TS.model.requested_im_opens[c.user]
}TS.ims.opened_sig.dispatch(b)
}b.opened_this_session=true
},im_open:function(c){var b=TS.ims.getImById(c.channel);
if(!b){TS.error("unkown im! "+c.channel);
return
}var d=b.is_open;
b.is_open=true;
if(TS.model.requested_im_opens[c.user]){TS.ims.displayIm(b.id,false,TS.model.requested_im_opens[c.user].and_send_txt);
delete TS.model.requested_im_opens[c.user]
}b.opened_this_session=true;
if(!d&&TS.client){TS.ims.opened_sig.dispatch(b);
TS.shared.checkInitialMsgHistory(b,TS.ims)
}},im_marked:function(c){if(!TS.client){return
}var b=TS.ims.getImById(c.channel);
if(!b){TS.error('unknown im: "'+c.channel+'"');
return
}TS.ims.setLastRead(b,c.ts)
},im_close:function(c){var b=TS.ims.getImById(c.channel);
if(!b){TS.error('unknown im: "'+c.channel+'"');
return
}b.is_open=false;
if(TS.model.active_im_id==c.channel){if(TS.client){TS.client.activeChannelDisplayGoneAway()
}}TS.ims.closed_sig.dispatch(b)
},im_history_changed:function(b){TS.ms.msg_handlers.im_history_changed_worker(b)
},subtype__im_history_changed:function(b){if(TS.boot_data.feature_channel_eventlog_client){TS.warn("feature_channel_eventlog_client=1 so we should never be getting subtype "+b.subtype)
}TS.ms.msg_handlers.im_history_changed_worker(b)
},im_history_changed_worker:function(c){var b=TS.ims.getImById(c.channel);
if(!b){TS.error('unknown im: "'+c.channel+'"');
return
}b.history_changed=true;
TS.ims.fetchHistory(b,{channel:b.id,latest:c.latest,inclusive:true,count:TS.utility.clamp(b.msgs.length,TS.model.initial_msgs_cnt,1000)},function(f,g,d){if(!f){TS.error("could not retrieve history")
}else{b.is_limited=false;
b.oldest_msg_ts=null;
TS.storage.storeOldestTs(b.id,null);
TS.warn("imsg.latest: "+c.latest);
for(var e=b.msgs.length-1;
e>-1;
e--){var h=b.msgs[e];
if(h.ts<c.latest){continue
}g.messages.unshift(h)
}b.msgs.length=0
}TS.ims.onHistory(f,g,d);
delete b.history_changed
});
if(b.id==TS.model.active_im_id){}else{}},manual_presence_change:function(c){var b=TS.model.user;
if(c.presence!="away"&&c.presence!="active"){TS.error('unknown presence: "'+c.presence+'"');
return
}b.manual_presence=c.presence;
TS.members.presence_changed_sig.dispatch(b)
},presence_change:function(b){var c=TS.members.getMemberById(b.user);
if(!c){TS.error('unknown member: "'+b.user+'"');
return
}if(b.presence!="away"&&b.presence!="active"){TS.error('unknown presence: "'+b.presence+'"');
return
}if(c.presence==b.presence){return
}if(c.is_self){c._presence_last_changed=new Date()
}c.presence=b.presence;
TS.members.presence_changed_sig.dispatch(c)
},status_change:function(b){var c=TS.members.getMemberById(b.user);
if(!c){TS.error('unknown member: "'+b.user+'"');
return
}if(c.status==b.status){return
}c.status=b.status;
TS.members.status_changed_sig.dispatch(c)
},pref_change:function(b){TS.prefs.onPrefChanged(b)
},team_pref_change:function(b){TS.prefs.onTeamPrefChanged(b)
},team_profile_change:function(b){if(!TS.boot_data.feature_custom_fields){return
}TS.team.upsertAndSignal({profile:b.profile})
},team_plan_change:function(b){TS.team.team_plan_changed_sig.dispatch(b)
},file_created:function(b){if(!a(b)){return
}var c=TS.files.getFileById(b.file.id);
if(c){TS.warn("we already know about this file, which probably means the files.upload response came in before this message (so np) "+b.file.id)
}else{TS.files.upsertAndSignal(b.file)
}},file_public:function(b){if(!a(b)){return
}TS.files.upsertAndSignal(b.file)
},file_deleted:function(b){if(!a(b)){return
}TS.files.removeFile(b.file_id)
},file_private:function(b){if(!a(b)){return
}TS.files.fetchFileInfo(b.file_id)
},file_change:function(b){if(!a(b)){return
}TS.files.upsertAndSignal(b.file);
TS.files.fileWasMaybeRefreshed(b.file)
},file_shared:function(b){if(!a(b)){return
}TS.files.upsertAndSignal(b.file)
},file_unshared:function(b){if(!a(b)){return
}TS.files.upsertAndSignal(b.file)
},file_comment_added:function(b){if(!a(b)){return
}var c=TS.files.getFileById(b.file.id);
if(!c){return
}if(!TS.files.editCommentOnFile(b.comment,c)){TS.files.addCommentToFile(b.comment,c)
}TS.files.upsertFile(b.file)
},file_comment_edited:function(b){if(!a(b)){return
}var c=TS.files.getFileById(b.file.id);
if(!c){return
}TS.files.editCommentOnFile(b.comment,c);
TS.files.upsertFile(b.file)
},file_comment_deleted:function(b){if(!a(b)){return
}var c=TS.files.getFileById(b.file.id);
if(!c){return
}TS.files.deleteCommentOnFile(b.comment,c);
TS.files.upsertFile(b.file)
},hello:function(b){},team_join:function(b){var c=b.user;
TS.info(c.name+" joined the team");
TS.members.upsertMember(c);
c=TS.members.getMemberById(c.id);
if(!c){TS.error("wtf no member "+c.id+"?");
return
}TS.members.joined_team_sig.dispatch(c);
if(TS.client){TS.view.showProperTeamPaneFiller()
}},user_change:function(b){var c=TS.members.getMemberById(b.user.id);
if(!c){TS.error("wtf no member "+b.user.id+"?");
return
}TS.members.upsertAndSignal(b.user)
},star_added:function(b){if(!b.item){TS.error(b.type+" has no item");
return
}if(b.user==TS.model.user.id){TS.stars.starStatusHasChanged(true,b.item,b.type);
TS.stars.maybeUpdateStarredItems()
}else{TS.stars.slurpStarItem(b.item,b.type)
}},star_removed:function(b){if(!b.item){TS.error(b.type+" has no item");
return
}if(b.user==TS.model.user.id){TS.stars.starStatusHasChanged(false,b.item,b.type);
TS.stars.maybeUpdateStarredItems()
}else{TS.stars.slurpStarItem(b.item,b.type)
}},reaction_added:function(b){if(!b.item){TS.error(b.type+" has no item");
return
}TS.rxns.changeRxnsFromIMsg(b)
},reaction_removed:function(b){if(!b.item){TS.error(b.type+" has no item");
return
}TS.rxns.changeRxnsFromIMsg(b)
},email_domain_changed:function(b){TS.team.upsertAndSignal({email_domain:b.email_domain});
if(TS.client){TS.view.showProperTeamPaneFiller()
}},team_domain_change:function(b){TS.team.upsertAndSignal({domain:b.domain});
TS.model.last_team_domain=TS.model.team.domain;
TSSSB.call("setCurrentTeam",TS.model.team.domain)
},slack_broadcast:function(c){var f=null;
var h=c.title||"Broadcast message";
var b=c.body||"";
var g="";
var e=c.button||(c.reload?"Reload":"OK");
var i=false;
if(!!c.reload){if(!!c.force_reload){TS.info("reloading because imsg.force_reload");
i=true
}else{if(!TS.boot_data.version_ts){TS.info("reloading because we dont have an version_ts");
i=true
}else{if(c.version_ts=="dev"){TS.info("reloading because dev");
i=true
}else{if(parseInt(TS.boot_data.version_ts)<parseInt(c.version_ts)){TS.info("reloading because "+TS.boot_data.version_ts+" < "+c.version_ts);
i=true
}}}}if(!i){return
}f=function(){if(TS.client){TS.reload()
}}
}if(i){var d=TS.utility.randomInt(10,20);
g='<p class="top_margin">(You will be auto reloaded in <span id="auto_secs">'+d+"</span> seconds.)</p>";
setTimeout(function(){if(TS.client){TS.reload()
}},d*1000);
setInterval(function(){d--;
if(d<1){return
}$("#auto_secs").text(d)
},1000)
}TS.generic_dialog.start({title:TS.format.formatWithOptions(h,null,{no_highlights:true,no_specials:true}),body:TS.format.formatWithOptions(b,null,{no_highlights:true,no_specials:true})+g,go_button_text:e,show_cancel_button:false,esc_for_ok:true,on_go:f})
},team_rename:function(b){$("#team_name").text(b.name);
document.title=document.title.replace(TS.model.last_team_name,b.name);
if(TS.ui.growls.original_document_title){TS.ui.growls.original_document_title=TS.ui.growls.original_document_title.replace(TS.model.last_team_name,b.name)
}TS.model.last_team_name=TS.model.team.name=b.name
},team_icon_change:function(b){if(!b.icon){return
}TS.model.team.icon=b.icon;
if(TS.client){TS.client.updateTeamIcon()
}},bot_added:function(b){var c=b.bot;
TS.info(c.name+" was added");
TS.bots.upsertBot(c);
c=TS.bots.getBotById(c.id);
if(!c){TS.error("wtf no bot "+c.id+"?");
return
}TS.bots.added_sig.dispatch(c)
},bot_changed:function(b){var c=TS.bots.getBotById(b.bot.id);
if(!c){TS.error("wtf no bot "+b.bot.id+"?");
return
}TS.bots.upsertAndSignal(b.bot)
},bot_removed:function(b){var c=TS.bots.getBotById(b.bot.id);
if(!c){TS.error("wtf no bot "+b.bot.id+"?");
return
}TS.bots.upsertAndSignal(b.bot)
},error:function(b){},user_typing:function(c){if(!TS.typing){return
}var d=TS.members.getMemberById(c.user);
if(!d){TS.error("unknown imsg.user:"+c.user);
return
}var b=TS.shared.getModelObById(c.channel);
if(!b){TS.error("unknown imsg.channel:"+c.channel);
return
}TS.typing.memberStarted(b,d)
},issue_change:function(b){TS.help.onIssueChange(b.issue)
},emoji_changed:function(b){TS.emoji.resetUpEmoji()
},play_sound:function(b){if(TS.model.prefs.autoplay_chat_sounds){TS.sounds.play(b.sound+".mp3")
}},commands_changed:function(b){TS.setUpCmds()
},accounts_changed:function(){setTimeout(TS.refreshTeams,1000)
},pin_added:function(c){var b=TS.shared.getModelObById(c.channel_id);
if(b){TS.pins.pinStatusHasChanged(true,c.item,c.item.type,b);
b.has_pins=true
}},pin_removed:function(c){var b=TS.shared.getModelObById(c.channel_id);
if(b){TS.pins.pinStatusHasChanged(false,c.item,c.item.type,b);
if(c.has_pins===false){b.has_pins=false
}}},sh_room_join:function(b){if(!TS.boot_data.feature_screenhero){return
}TS.dir(441,b);
TS.rooms.upsertAndSignal(b.room)
},sh_room_leave:function(b){if(!TS.boot_data.feature_screenhero){return
}TS.dir(441,b);
TS.rooms.upsertAndSignal(b.room)
},sh_room_update:function(b){if(!TS.boot_data.feature_screenhero){return
}TS.dir(441,b);
TS.rooms.upsertAndSignal(b.room)
},subteam_updated:function(b){if(!TS.boot_data.feature_subteams){return
}TS.user_groups.upsertUserGroupAndSignal(b.subteam)
},subteam_created:function(b){if(!TS.boot_data.feature_subteams){return
}TS.user_groups.upsertUserGroupAndSignal(b.subteam)
},subteam_deleted:function(b){if(!TS.boot_data.feature_subteams){return
}TS.user_groups.removeUserGroupAndSignal(b.subteam)
},subteam_self_added:function(b){if(!TS.boot_data.feature_subteams){return
}TS.user_groups.upsertSelfUserGroup(b.subteam_id)
},subteam_self_remove:function(b){if(!TS.boot_data.feature_subteams){return
}TS.user_groups.removeSelfUserGroup(b.subteam_id)
}});
var a=function(b){if(!TS.web){return true
}if(b.file&&TS.web.space&&!TS.web.space.isFileRelevant(b.file.id)){return false
}if(b.file_id&&TS.web.space&&!TS.web.space.isFileRelevant(b.file_id)){return false
}return true
}
})();
(function(){TS.registerModule("ds",{last_pong_time:0,sent_map:{},connected_sig:new signals.Signal(),disconnected_sig:new signals.Signal(),trouble_sig:new signals.Signal(),reconnecting_sig:new signals.Signal(),pong_sig:new signals.Signal(),on_msg_sig:new signals.Signal(),reconnect_requested_sig:new signals.Signal(),onStart:function(){g(TS.model.ui.is_window_focused||false);
TS.ui.window_focus_changed_sig.add(g);
setInterval(function(){if(!TS.model.ds_connected){return
}if(TS.model.rtd_start_throttler<1){return
}TS.model.rtd_start_throttler--
},1000*60)
},send:function(K,I,J){K.id=++e;
TS.ds.sent_map[K.id.toString()]={msg:K,handler:I,ts:Date.now(),temp_ts:J};
if(K.type=="ping"||K.type=="pong"){TS.log(3,"DS TS.ds ping -->\n"+JSON.stringify(K,null,"  "))
}else{TS.model.last_net_send=Date.now();
TS.log(2,"TS.ds -->\n"+JSON.stringify(K,null,"  "))
}if(t&&TS.model.ds_connected){t.send(JSON.stringify(K))
}else{TS.ds.Q.push(K)
}return K.id
},Q:[],sendTyping:function(I){var J='{"type":"typing", "channel":"'+I+'"}';
t.send(J)
},handleMsg:function(I){var L=I.reply_to&&!("ok" in I)&&I.type=="message";
if(L){}var J;
if(I.reply_to){if(I.reply_to.toString() in TS.ds.sent_map){J=TS.ds.sent_map[I.reply_to];
I.SENT_MSG=J.msg;
delete TS.ds.sent_map[I.reply_to]
}else{if(!L){TS.error('received msg "'+I.reply_to+'" with type "'+I.type+'" but we have no record of it in sent_map')
}}}if(I.type=="ping"||I.type=="pong"){TS.log(3,"DS msg "+I.type+" time: "+(Date.now()-J.ts)+"ms");
TS.log(3,"DS TS.ds ping <--\n"+JSON.stringify(I,null,"  "));
TS.ds.last_pong_time=Date.now();
TS.ds.pong_sig.dispatch();
b=false
}else{if(J){var K=I.type?I.type:(I.SENT_MSG.type)?I.SENT_MSG.type:"";
TS.log(2,"msg "+((K)?'"'+K+'" ':"")+"rsp time "+(Date.now()-J.ts)+"ms")
}else{}TS.log(2,"TS.ds <-- \n"+JSON.stringify(I,null," "))
}if(I.type=="error"){h(I)
}else{if(!I.reply_to){TS.ds.on_msg_sig.dispatch(I);
if(I.type=="hello"){k(I)
}}}if(J){if(!I.ok){I.error=I.error||{code:0,msg:"unknown error (not specified by MS)"}
}if(L){I.ok=true
}if(J.handler){J.handler(I.ok,I)
}}},onFailure:function(K){if(K){w("You got disconnected and are on team Tiny Speck, so here are some details:\n>>>"+K)
}b=false;
d();
if(TS.model.ds_connected){TS.info("Disconnected from DS, TS.model.rtd_start_throttler:"+TS.model.rtd_start_throttler);
TS.ds.logConnectionFlow("on_connected_failure");
TS.model.ds_reconnect_ms=100;
TS.ds.disconnect()
}else{TS.ds.logConnectionFlow("on_notconnected_failure");
var J=TS.model.ds_reconnect_ms=((TS.model.ds_reconnect_ms+1000)*1.3);
if(TS.model.ds_reconnect_ms>4000){TS.model.ds_reconnect_ms=TS.utility.randomInt(J,J+(J/3))
}TS.model.ds_reconnect_ms=Math.min(TS.model.ds_reconnect_ms,300000)
}if(TS.model.rtd_start_throttler>5){var I=2000*TS.model.rtd_start_throttler;
if(TS.model.ds_reconnect_ms<I){TS.info("because TS.model.rtd_start_throttler:"+TS.model.rtd_start_throttler+" we are increasing time until next login call");
TS.model.ds_reconnect_ms=I
}}if(TS.model.ds_connected){TS.model.ds_connected=false;
TS.ds.disconnected_sig.dispatch()
}TS.model.ds_connected=false;
clearInterval(x);
clearInterval(y);
if(TS.model.ds_asleep){TS.warn("NOT doing startReconnection(), we are asleep");
return
}TS.ds.startReconnection()
},startReconnection:function(){TS.model.ds_reconnect_time=Date.now()+TS.model.ds_reconnect_ms;
TS.info("Attempting to reconnect in "+TS.model.ds_reconnect_ms+"ms");
clearInterval(a);
a=setInterval(c,s);
c();
clearTimeout(m);
m=setTimeout(function(){if(!TS.model.window_unloading){TS.ds.reconnect_requested_sig.dispatch()
}},TS.model.ds_reconnect_ms)
},manualReconnectNow:function(){TS.ds.logConnectionFlow("manual_reconnect");
clearTimeout(m);
clearInterval(a);
clearTimeout(f);
p=0;
if(!TS.model.window_unloading){TS.ds.reconnect_requested_sig.dispatch();
TS.ds.reconnecting_sig.dispatch(0)
}},disconnect:function(){if(t&&TS.model.ds_connected){TS.ds.logConnectionFlow("disconnect");
t.close()
}else{TS.warn("TS.ds.disconnect called, but _websocket="+t+" TS.model.ds_connected="+TS.model.ds_connected)
}},logConnectionFlow:function(I){var K=TS.model.ds_conn_log;
var J=Date.now();
K.push({name:I,time:J,delta:(K.length)?J-K[K.length-1].time:0});
TS.log(2,"logConnectionFlow "+I+" "+K[K.length-1].delta)
},getConnectionFlowLog:function(){var L=TS.model.ds_conn_log;
var I=[];
for(var J=0;
J<L.length;
J++){I.push(encodeURIComponent(L[J].name+"-"+(L[J].delta?Math.round(L[J].delta/1000):0)+"-"+Math.round(L[J].time/1000)))
}TS.dir(2,TS.model.ds_conn_log);
var K=I.join("&");
return K
},connect:function(){TS.logLoad("TS.ds.connect "+TS.web.space.login_data.ws);
if(!window.WebSocket){window.WebSocket=window.MozWebSocket
}if(window.WebSocket){var J;
try{TS.ds.logConnectionFlow("connect");
J=TS.web.space.login_data.ws;
var K=(TS.qs_args.simulate_old_token==1)?"&TRIGGER_OLD_TOKEN=1":"";
J+="?version_uid="+TS.boot_data.version_uid+K;
J=TS.utility.appendLogToUrlWithLimit(J,TS.ds.getConnectionFlowLog());
TS.info("Connecting to: "+J);
if(TS.qs_args.simulate_first_connect_failure==1&&!window.already_simulated_first_connect_failure){J=J.replace("e","w");
TS.info("simulate_first_connect_failure url:"+J);
window.already_simulated_first_connect_failure=true
}D=(window.WEB_SOCKET_USING_FLASH)?u:C;
clearTimeout(f);
f=setTimeout(n,D);
TS.ds.last_url=J;
TS.ds.last_start_ms=Date.now();
d();
t=new WebSocket(J)
}catch(I){TS.warn("failed to create new WebSocket");
TS.error(I);
TS.ds.onFailure("failed to create new WebSocket");
return
}TS.model.ds_connecting=true;
if(TS.qs_args.simulate_first_connect_timeout==1&&p<1){TS.info("simulate_first_connect_timeout url:"+J)
}else{t.onopen=z
}t.onclose=j;
t.onerror=v
}else{alert("Your browser does not support Web Sockets.")
}}});
var y=0;
var o=3000;
var x=0;
var r=10000;
var f=0;
var D=0;
var C=10000;
var u=20000;
var A=0;
var B=10000;
var H=0;
var l=5000;
var a=0;
var s=1000;
var m=0;
var t=null;
var e=0;
var b=false;
var G=0;
var p=0;
var g=function(I){if(I){G=10000
}else{G=60000
}G+=r;
TS.log(3,"DS _pong_timeout_ms set to:"+G+" has_focus:"+I)
};
var F=function(J){var I=JSON.parse(J.data);
TS.ds.handleMsg(I)
};
var z=function(I){clearTimeout(f);
p=0;
if(TS.qs_args.simulate_hello_timeout==1&&!window.already_simulated_hello_timeout){TS.info("simulate_hello_timeout");
window.already_simulated_hello_timeout=true
}else{t.onmessage=F
}TS.model.ds_conn_log.length=0;
TS.logLoad("_onConnect (took "+(Date.now()-TS.ds.last_start_ms)+"ms)");
TS.info("DS WS connected!");
TS.ds.logConnectionFlow("on_connect");
clearTimeout(A);
A=setTimeout(i,B)
};
var E=function(){if(!b){return
}var J=Date.now()-TS.ds.last_pong_time;
TS.log(3,"DS MS since_last_pong_ms:"+J+" pong_timeout_ms:"+G);
if(J<G){return
}TS.warn("since_last_pong_ms too long! "+J+" > "+G);
TS.warn("calling disconnect(), expect to get an onDisconnect() callback");
TS.ds.logConnectionFlow("on_ping_timeout");
TS.ds.trouble_sig.dispatch();
b=false;
w("You are on team Tiny Speck, so here are some pong details:\n>>>since_last_pong_ms too long! "+J+" > "+G+" ... calling disconnect(), expect to get an onDisconnect() callback");
try{TS.ds.disconnect();
clearTimeout(H);
H=setTimeout(function(){TS.info("called disconnect, no onDisconnect callback happened in "+l+"ms, so calling _onDisconnect() manually now");
j(null,"since_last_pong_ms too long! then called disconnect, but no onDisconnect callback happened in "+l+"ms, so calling _onDisconnect() manually now")
},l)
}catch(I){TS.info("since_last_pong_ms too long! then an error calling disconnect, going to assume it is because it is already closed, calling _onDisconnect() manually now");
TS.warn(I);
j(null,"error calling disconnect, going to assume it is because it is already closed, calling _onDisconnect() manually now")
}};
var q=function(){TS.ds.send({type:"ping"});
b=true
};
var j=function(J,I){I=I||"_onDisconnect called with event:"+J;
TS.info("DS WS disconnected");
TS.ds.logConnectionFlow("on_disconnect");
clearTimeout(H);
clearTimeout(A);
clearTimeout(f);
if(J){TS.info("_onDisconnect event.code:"+J.code);
if(J.code=="1006"&&false){TS.generic_dialog.start({title:"Connection trouble error #1006",body:"Apologies, we're having some trouble with your connection. The particular error code indicates that restarting the application might fix it.",show_cancel_button:false,show_go_button:true,go_button_text:"OK",esc_for_ok:true})
}}else{TS.info("no event")
}TS.ds.onFailure(I)
};
var w=function(I){TS.warn("_reportDisconnect reason_str:"+I)
};
var d=function(){if(!t){return
}t.onmessage=null;
t.onopen=null;
t.onerror=null;
t.onclose=null;
try{t.close()
}catch(J){}if(false){var I=t;
t.onclose=function(K){TS.ds.logConnectionFlow("old_socket_closed");
if(!TS.model.ds_connected&&!TS.model.ds_connecting){TS.warn("Our last socket just fired a close event, and we are not yet connected or connecting again, so let us jump start the connection process with manualReconnectNow()");
TS.ds.manualReconnectNow()
}I.onclose=null
}
}};
var c=function(){var I=TS.model.ds_reconnect_time-Date.now();
var J=Math.round(I/1000);
if(J>=0){TS.ds.reconnecting_sig.dispatch(J)
}if(TS.model.window_unloading){clearInterval(a)
}};
var i=function(){var I="socket received no hello msg "+B+"ms after connection";
TS.warn(I);
TS.ds.logConnectionFlow("_onHelloTimeout");
TS.ds.onFailure(I)
};
var n=function(){p++;
var I="socket not connected "+D+"ms after creation. _connect_timeout_count:"+p;
TS.warn(I);
TS.ds.logConnectionFlow("_onConnectTimeout");
if(p==3){TS.generic_dialog.start({title:"Connection trouble",body:"<p>Apologies, we're having some trouble with your web socket connection.</p>				<p>We've seen this problem clear up with a restart of "+(TS.model.is_our_app?"Slack":"your browser")+", 				a solution which we suggest to you now only with great regret and self loathing.</p>				",show_cancel_button:false,go_button_text:"OK",esc_for_ok:true});
return
}else{if(p==2){if(window.WEB_SOCKET_USING_FLASH){}else{if(TS.model.is_chrome){window.fallBackToFlashWebSockets();
setTimeout(function(){if(window.WEB_SOCKET_USING_FLASH_BUT_NO_FLASH||!document.getElementById("webSocketFlash")||!document.getElementById("webSocketFlash").receiveEvents){TS.generic_dialog.start({title:"Connection trouble",body:"<p>Apologies, we're having some trouble with your web socket connection. 							We tried falling back to Flash, but it appears you do not have a version of Flash installed that we can use.</p>							<p>But we've seen this problem clear up with a restart of "+(TS.model.is_our_app?"Slack":"your browser")+", 							a solution which we suggest to you now only with great regret and self loathing.</p>							",show_cancel_button:false,go_button_text:"OK",esc_for_ok:true})
}else{TS.ms.onFailure("3secs passed, waiting on Flash, no connection")
}},3000);
return
}}}}TS.ds.onFailure(I)
};
var v=function(I){var J="";
if(I){if(I.name){J+=" e.name="+I.name
}if(I.message){J+=" e.message="+I.message
}if(I.data){J+=" e.data="+I.data
}}TS.warn("_onError err_str: "+J);
TS.dir(0,I)
};
var h=function(I){if(I.error){if(I.error.code==1){TS.ds.logConnectionFlow("msg_error_code_1")
}else{TS.logError({message:JSON.stringify(I)},"_onErrorMsg");
TS.ds.onFailure("_onErrorMsg imsg.error:"+I.error)
}}else{TS.logError({message:I?JSON.stringify(I):"no imsg?"},"_onErrorMsg")
}};
var k=function(){clearTimeout(A);
TS.logLoad("_onHello (took "+(Date.now()-TS.ds.last_start_ms)+"ms)");
var J=Date.now()-TS.ds.last_pong_time;
TS.info("Hello msg recvd, since_last_pong_ms:"+J);
TS.ds.logConnectionFlow("on_hello");
clearInterval(a);
b=true;
TS.ds.last_pong_time=Date.now();
clearInterval(y);
y=setInterval(E,o);
clearInterval(x);
x=setInterval(q,r);
TS.model.ds_connecting=false;
TS.model.ds_connected=true;
var K;
for(var I=0;
I<TS.ds.Q.length;
I++){K=TS.ds.Q.shift();
TS.log(2,"TS.ds (Q) -->\n"+JSON.stringify(K,null,"  "));
t.send(JSON.stringify(K))
}TS.ds.connected_sig.dispatch();
q()
}
})();
(function(){TS.registerModule("ds.msg_handlers",{onStart:function(){TS.ds.on_msg_sig.add(a)
},hello:function(b){if(!b.active||!b.active.length){return
}var d;
for(var c=0;
c<b.active.length;
c++){d=TS.members.getMemberById(b.active[c]);
if(!d){TS.error('unknown member: "'+b.active[c]+'"');
return
}d.ds_active=true
}},presence_change:function(b){var c=TS.members.getMemberById(b.user);
if(!c){TS.error('unknown member: "'+b.user+'"');
return
}if(b.presence!="away"&&b.presence!="active"){TS.error('unknown presence: "'+b.presence+'"');
return
}if(c.ds_active&&b.presence=="active"){return
}if(!c.ds_active&&b.presence=="away"){return
}c.ds_active=(b.presence=="active");
TS.members.ds_presence_changed_sig.dispatch(c)
}});
var a=function(b){if(b.reply_to){return
}if(b.event=="rocket"){return
}if(!TS.ds.msg_handlers[b.type]){TS.error("non handled non rocket event received\n"+JSON.stringify(b,null,"  "));
return
}TS.ds.msg_handlers[b.type](b)
}
})();
(function(){TS.registerModule("storage",{msgs_version:(function(){try{return window.boot_data.cache_version
}catch(e){return"unknown_version"
}})(),cache_ts_version:(function(){try{return window.boot_data.cache_ts_version
}catch(e){return"unknown_version"
}})(),version:"0.82",prefix:window.boot_data.user_id+"_",disabled:false,buffer:{},disable_interval_buffer_write:(function(){var g,j,f,i,h,e;
e=true;
i="slack_ssb/";
h=0.45;
g=navigator.userAgent.toLowerCase();
j=g.indexOf(i);
if(j!==-1){f=parseFloat(g.substr(j+i.length));
if(!isNaN(f)&&f<h){e=false
}}return e
}()),flush_buffer_interv:0,flush_buffer_interv_ms:1000,test:function(){return{getLocalStorage:a,setLocalStorage:c}
},setDisabled:function(e){if(TS.storage.disabled==e){return
}if(e||!b){TS.storage.disabled=true
}else{TS.storage.disabled=false;
TS.storage.setUp()
}TS.info("TS.storage.disabled:"+TS.storage.disabled)
},onStart:function(j){TS.storage.onStart=function(){};
var f=document.location.pathname;
if(TS.model.mac_ssb_version&&f.indexOf("/messages")!==0&&f.indexOf("/ssb/create")!==0&&f.indexOf("/signin")!==0){var g=0;
var h=function(){g++;
try{TS.storage=document.ssb_main.TS.storage;
TS.warn("attempt #"+g+" using TS.storage from the parent win because macgap.ls does not work in child windows");
j();
return true
}catch(k){TS.error("attempt #"+g+" error using TS.storage from the parent win");
TS.error(k);
TS.info("document.ssb_main: "+document.ssb_main);
TS.info("document.ssb_main.TS: "+(document.ssb_main&&document.ssb_main.TS));
TS.info("document.ssb_main.TS.storage: "+(document.ssb_main&&document.ssb_main.TS&&document.ssb_main.TS.storage));
return false
}};
if(h()){return
}var e=setInterval(function(){if(h()){clearInterval(e)
}},100);
return
}TS.storage.setDisabled(TS.storage.disabled||TS.qs_args.ls_disabled=="1"||!b);
if(!TS.storage.disabled){try{if(TS.boot_data.login_data.self.prefs.ls_disabled){TS.storage.disabled=true
}}catch(i){}}TS.log(488,"TS.storage.disabled:"+TS.storage.disabled);
TS.ui.window_unloaded_sig.add(TS.storage.windowUnloaded);
TS.ui.window_focus_changed_sig.add(TS.storage.windowBlurred);
if(!TS.storage.disabled){TS.storage.setUp()
}j()
},getKeys:function(){var f=[];
if(!b){return f
}var e=b.length;
if(!e){return f
}for(var g=0;
g<e;
g++){f.push(b.key(g))
}return f
},storageAvailable:function(){if(!b){return false
}try{var e="test_to_see_if_we_can_write_to_local_storage";
b.setItem(e,"foo");
b.removeItem(e);
return true
}catch(f){return false
}},storageSize:function(g){var j=0;
if(!b){return j
}var h=TS.storage.getKeys();
var l=0;
var f;
var k;
for(var e=0;
e<h.length;
e++){l++;
f=h[e];
k=b.getItem(f);
if(!k&&k!==""){TS.warn(f+" not measurable value:"+k+" typeof:"+(typeof k))
}else{j+=k.length;
if(g){TS.info(f+"="+((k.length*2)/1024).toFixed(2)+"KB (total="+(j/1024).toFixed(2)+"KB)")
}}}if(g){TS.info("total for "+l+" items is "+(j/1024).toFixed(2)+"KB")
}return j
},setUp:function(){var e=TS.storage._get("storage_msgs_version");
TS.log(488,"TS.storage.msgs_version:"+TS.storage.msgs_version);
TS.log(488,"storage_msgs_version:"+e);
var k=TS.storage._get("storage_cache_ts_version");
TS.log(488,"TS.storage.cache_ts_version:"+TS.storage.cache_ts_version);
TS.log(488,"storage_cache_ts_version:"+k);
var h=TS.storage._get("storage_version");
TS.log(488,"TS.storage.version:"+TS.storage.version);
TS.log(488,"storage_version:"+h);
TS.log(488,"TS.storage.storageAvailable(): "+TS.storage.storageAvailable());
var j=TS.storage.getKeys();
TS.log(488,j);
var g;
if(!TS.storage.storageAvailable()){TS.warn("TS.storage.storageAvailable() = false so flushing");
b.clear()
}else{if(h!=TS.storage.version||(!TS.storage.fetchLastEventTS()&&TS.client)){if(h!=TS.storage.version){TS.warn("storage_version:"+h+" does not match TS.storage.version:"+TS.storage.version+" so flushing")
}else{if(h){TS.warn("TS.storage.fetchLastEventTS() is empty so flushing");
TS.logError({message:"TS.storage.fetchLastEventTS() is empty #2 B"},"TS.storage.fetchLastEventTS() is empty but we have a storage_version, so flushing LS from TS.storage")
}}for(var f=0;
f<j.length;
f++){g=j[f];
if(g.indexOf(TS.storage.prefix)!==0){continue
}var l=Date.now();
b.removeItem(g);
TS.warn("_ls.removeItem:"+g+" "+(Date.now()-l)+"ms")
}TS.storage._set("storage_version",TS.storage.version);
TS.storage._set("storage_msgs_version",TS.storage.msgs_version);
TS.storage._set("storage_cache_ts_version",TS.storage.cache_ts_version);
if(TS.storage.getKeys().length>0){TS.info(TS.storage.getKeys())
}}else{if(e!=TS.storage.msgs_version||TS.qs_args.no_ls_msgs=="1"){if(TS.qs_args.no_ls_msgs=="1"){TS.warn("TS.qs_args['no_ls_msgs'] == '1' so flushing channel data")
}else{TS.warn("storage_msgs_version:"+e+" does not match TS.storage.msgs_version:"+TS.storage.msgs_version+" so flushing channel data")
}TS.storage.cleanOutMsgStorage();
TS.storage._set("storage_msgs_version",TS.storage.msgs_version);
if(TS.storage.getKeys().length>0){TS.warn(TS.storage.getKeys())
}}else{if(k!=TS.storage.cache_ts_version){TS.warn("storage_cache_ts_version:"+k+" does not match TS.storage.cache_ts_version:"+TS.storage.cache_ts_version+" so flushing user/bot data");
TS.storage.cleanOutCacheTsStorage();
TS.storage._set("storage_cache_ts_version",TS.storage.cache_ts_version);
if(TS.storage.getKeys().length>0){TS.warn(TS.storage.getKeys())
}}}}}if(TS.storage.disable_interval_buffer_write){TS.storage.flushBufferOnIdleTimer()
}},cleanOutMsgStorageIfTooOld:function(){if(TS.storage.isStorageTooOld()){TS.warn("last LS activity too old, we're purging");
TS.storage.cleanOutMsgStorageAndReset();
return true
}return false
},cleanOutMsgStorageAndReset:function(){TS.info("cleanOutMsgStorageAndReset running");
TS.storage.cleanOutMsgStorage();
TS.storage.storeLastEventTS("",true,true);
TS.storage.storeLastMsgTS("",true);
TS.storage.storeRxnRecords("",true);
var e=TS.storage.fetchLastEventTS(true);
TS.info("cleanOutMsgStorageAndReset fetched_b4_flush:"+e);
if(e){TS.info("TS.storage.getKeys:"+TS.storage.getKeys().join(", "));
TS.info("Object.keys(TS.storage.buffer):"+Object.keys(TS.storage.buffer).join(", "))
}TS.storage.flushBuffer(true);
var f=TS.storage.fetchLastEventTS(true);
TS.info("cleanOutMsgStorageAndReset fetched_after_flush:"+f);
if(f){TS.info("TS.storage.getKeys:"+TS.storage.getKeys().join(", "));
TS.info("Object.keys(TS.storage.buffer):"+Object.keys(TS.storage.buffer).join(", "))
}},isStorageTooOld:function(){var h=TS.storage.fetchLastEventTS();
var e=TS.storage.fetchLastMsgTS();
var g=h;
if(!g||e>h){g=e
}if(g){var i=TS.utility.date.toDateObject(g);
var f=Date.now()-i;
var j=3*86400000;
if(f>j){return true
}}return false
},cleanOutMsgStorage:function(){var g=TS.storage.getKeys();
TS.log(488,g);
var f;
for(var e=0;
e<g.length;
e++){f=g[e];
if(f.indexOf(TS.storage.prefix)!==0){continue
}if(f.indexOf(TS.storage.msgs_id_part)==-1&&f.indexOf(TS.storage.oldest_ts_part)==-1){continue
}var h=Date.now();
b.removeItem(f);
delete TS.storage.buffer[f];
TS.warn("_ls.removeItem:"+f+" "+(Date.now()-h)+"ms")
}for(f in TS.storage.buffer){if(f.indexOf(TS.storage.prefix)!==0){continue
}if(f.indexOf(TS.storage.msgs_id_part)==-1&&f.indexOf(TS.storage.oldest_ts_part)==-1){continue
}delete TS.storage.buffer[f];
TS.info("delete TS.storage.buffer:"+f)
}g=TS.storage.getKeys();
TS.log(488,g)
},cleanOutCacheTsStorage:function(){var e=TS.storage.getKeys();
TS.log(488,e);
TS.storage.storeBots();
TS.storage.storeMembers();
TS.storage.storeLastCacheTS();
e=TS.storage.getKeys();
TS.log(488,e)
},windowUnloaded:function(){TS.storage._set("last_unload_flushing",new Date().toString(),true);
TS.storage.flushBuffer(true)
},windowBlurred:function(){TS.storage.flushBuffer(true)
},onFlushBufferInterval:function(){TS.storage.flushBuffer(false)
},slow_write:false,slow_all_write:false,slow_write_threshold:1000,flush_all_buffer_interv:null,flush_all_buffer_interv_ms:2000,flush_all_buffer_user_inactive_ms:3000,flushBufferOnIdleTimer:function(){if(TS.storage.flush_all_buffer_interv){window.clearInterval(TS.storage.flush_all_buffer_interv);
TS.storage.flush_all_buffer_interv=null
}TS.storage.flush_all_buffer_interv=window.setInterval(TS.storage.maybeFlushAllBuffer,TS.storage.flush_all_buffer_interv_ms)
},maybeFlushAllBuffer:function(){if(!TS.model){return
}var g=false;
if(!TS.model.ui.is_window_focused){g=true
}else{var f=new Date();
var e=(f-TS.model.client.last_user_active_timestamp);
if(e>=TS.storage.flush_all_buffer_user_inactive_ms){g=true
}}TS.log(488,"TS.storage.maybeFlushAllBuffer ok_to_flush:"+g);
if(g){TS.storage.flushBuffer(true)
}},prepareValForStorage:function(e){return(typeof e=="string"||typeof e=="number"||!e)?e:JSON.stringify(e)
},correctBadValsFromStorage:function(e){if(e=="undefined"){return null
}if(e=="null"){return null
}return e
},flushBuffer:function(r){if(TS.storage.disabled){return
}var g=new Date();
var e=Date.now();
var m;
var n=0;
var q=(TS.model&&TS.model.team&&TS.model.team.domain&&TS.model.team.domain==="tinyspeck");
var s;
var p;
var l;
if(!r&&TS.storage.disable_interval_buffer_write){return false
}var f;
for(var j in TS.storage.buffer){f=TS.storage.prepareValForStorage(TS.storage.buffer[j]);
if(f===undefined){b.removeItem(j)
}else{try{b.setItem(j,f)
}catch(h){TS.warn("flushBuffer _ls.setItem failed once, flushing. TS.storage.storageSize():"+TS.storage.storageSize(false));
TS.dir(0,h);
b.clear();
try{b.setItem(j,f)
}catch(o){TS.warn("flushBuffer _ls.setItem failed twice, flushing and bailing. TS.storage.storageSize():"+TS.storage.storageSize());
TS.dir(0,o);
b.clear();
continue
}}}n++;
m=Date.now()-e;
TS.storage.flush_buffer_interv_ms=TS.utility.clamp(m*3,1000,5000);
if(q){TS.log(488,"onFlushBufferInterval _ls.setItem "+j+": "+(m)+"ms "+(TS.storage.buffer[j]&&TS.storage.buffer[j].toString?TS.storage.buffer[j].toString().substr(0,100):"NULL?"))
}if(!r){s=new Date()-g;
if(!TS.storage.slow_write&&s>TS.storage.slow_write_threshold){TS.storage.slow_write=true;
l=new Date();
try{p=TS.storage.storageSize()
}catch(h){}l=new Date()-l;
TS.logError({message:"Took "+s+"ms for "+n+" item (!all case) (threshold is "+TS.storage.slow_write_threshold+" ms). Key: "+j+". Buffer length: "+(TS.storage.buffer[j]&&TS.storage.buffer[j].toString()?TS.storage.buffer[j].toString().length:"unknown (not a string)")+". localStorage size: "+(p||"unknown")+". Time to read LS size: "+l},"TS.storage.flushBuffer exceeded slow write threshold")
}}delete TS.storage.buffer[j];
if(!r){TS.log(488,"TS.storage.flushBuffer: Wrote one item.");
return
}}if(n&&!TS.storage.slow_all_write){s=new Date()-g;
if(s>TS.storage.slow_write_threshold){TS.storage.slow_all_write=true;
try{p=TS.storage.storageSize()
}catch(h){}TS.logError({message:"Took "+s+"ms for "+n+" items (threshold is "+TS.storage.slow_write_threshold+" ms). localStorage size: "+p+". App open for "+((new Date()-TS.view.start_time)/1000/60).toFixed(2)+" min."},"TS.storage.flushBuffer exceeded slow write threshold (all case)")
}}if(n===0){if(TS.storage.flush_buffer_interv){window.clearInterval(TS.storage.flush_buffer_interv);
TS.storage.flush_buffer_interv=null
}TS.log(488,"TS.storage.flushBuffer: Nothing to save.")
}else{TS.log(488,"TS.storage.flushBuffer: Saved "+n+(n===1?" item":" items"))
}},slow_get_threshold:1000,slow_get:null,_get:function(i,f,j){var h=TS.storage.prefix+i;
if(j){TS.info("_get name:"+i+" k:"+h+" disabled:"+TS.storage.disabled+" TS.storage.buffer[k]:"+TS.storage.buffer[h])
}if(TS.storage.disabled){return TS.storage.buffer[h]||f
}if(h in TS.storage.buffer){return TS.storage.buffer[h]||f
}var g=new Date();
var e=TS.storage.correctBadValsFromStorage(b.getItem(h));
if(j){TS.info("_get TS.storage.correctBadValsFromStorage(_ls.getItem(k)):"+e)
}var m;
if(e&&typeof e=="string"&&/^[{[]/.test(e)){try{e=JSON.parse(e)
}catch(l){}}e=e||(f||null);
g=new Date()-g;
if(!TS.storage.slow_get&&g>TS.storage.slow_get_threshold){TS.storage.slow_get=true;
try{m=TS.storage.storageSize()
}catch(l){}TS.logError({message:"Took "+g+"ms to read "+h+" (theshold is "+TS.storage.slow_get_threshold+"ms), length = "+(e&&!isNaN(e.length)?e.length:"unknown")+". Storage size: "+m},"TS.storage._get took longer than threshold")
}return e
},slow_set_threshold:1000,slow_set:null,_set:function(e,p,g,l){var q=new Date();
var n;
var j=TS.storage.prefix+e;
TS.storage.buffer[j]=p;
var m=false;
if(l){TS.info("_set immediate:"+g+" name:"+e+" k:"+j+" disabled:"+TS.storage.disabled+" TS.storage.buffer[k]:"+TS.storage.buffer[j])
}if(g){if(!TS.storage.disabled){var f=TS.storage.prepareValForStorage(p);
if(f===undefined){b.removeItem(j)
}else{try{b.setItem(j,f);
var o=b.getItem(j);
if(e=="testing_breakage"){o+="BREAKAGE"
}if(o!==f){var r="_ls.setItem() failed";
var i="k:"+j+", val:"+f+", new_val:"+o+", _using_macgap_ls:"+d;
TS.logError({message:i},r);
TS.warn(i+"\n"+r)
}}catch(h){TS.warn("_set _ls.setItem failed, flushing. TS.storage.storageSize():"+TS.storage.storageSize(false));
m=true;
b.clear()
}}}if(l){TS.info("_set failed:"+m)
}if(!m){delete TS.storage.buffer[j];
if(l){TS.info("_set TS.storage.buffer[k]:"+TS.storage.buffer[j])
}q=new Date()-q;
if(q>TS.storage.slow_set_threshold){TS.warn("TS.storage._set immediately "+e+": "+(q)+"ms "+(p&&p.toString?p.toString().substr(0,100):"NULL?"));
if(!TS.storage.slow_set){TS.storage.slow_set=true;
try{n=TS.storage.storageSize()
}catch(h){}TS.logError({message:"Took "+q+"ms to write "+j+" (theshold is "+TS.storage.slow_set_threshold+"ms), length = "+(p&&!isNaN(p.length)?p.length:"unknown")+". Storage length: "+n},"TS.storage._set exceeded slow set threshold (immediate)")
}}else{TS.log(488,"TS.storage._set immediately "+e+": "+(q)+"ms "+(p&&p.toString?p.toString().substr(0,100):"NULL?"))
}return
}}if(!TS.storage.disabled){if(!TS.storage.flush_buffer_interv){TS.storage.flush_buffer_interv=setInterval(TS.storage.onFlushBufferInterval,TS.storage.flush_buffer_interv_ms)
}}},msgs_id_part:"channel_msgs_",_makeMsgsId:function(e){return TS.storage.msgs_id_part+e
},fetchMsgsRaw:function(e){return TS.storage._get(TS.storage._makeMsgsId(e),[])||[]
},fetchMsgs:function(j){var h=JSON.parse(JSON.stringify(TS.storage._get(TS.storage._makeMsgsId(j),[])||[]));
var e=[];
var f;
for(var g=0;
g<h.length;
g++){if(TS.qs_args.not_all_ls_msgs&&g<5){continue
}f=h[g];
if(!f.ts){continue
}if(TS.utility.msgs.isTempMsg(f)){continue
}if(f.is_ephemeral){continue
}e.push(TS.utility.msgs.processImsg(f,j))
}return e
},storeMsgs:function(g,f){TS.storage._set(TS.storage._makeMsgsId(g),f);
if(f&&f.length){var e=TS.storage.fetchLastMsgTS();
if(f[0].ts>e){TS.storage.storeLastMsgTS(f[0].ts)
}}},_makeMsgInputId:function(e){return"msg_input_"+e
},fetchLastMsgInput:function(e){return TS.storage._get(TS.storage._makeMsgInputId(e),null)
},storeLastMsgInput:function(f,e){TS.storage._set(TS.storage._makeMsgInputId(f),e)
},_makeCommentInputId:function(e){return"comment_input_"+e
},fetchLastCommentInput:function(e){return TS.storage._get(TS.storage._makeCommentInputId(e),null)
},storeLastCommentInput:function(f,e){TS.storage._set(TS.storage._makeCommentInputId(f),e)
},oldest_ts_part:"oldest_msg_ts_",_makeOldestTsId:function(e){return TS.storage.oldest_ts_part+e
},fetchOldestTs:function(e){return TS.storage._get(TS.storage._makeOldestTsId(e),null)
},storeOldestTs:function(f,e){TS.storage._set(TS.storage._makeOldestTsId(f),e);
return
},fetchActiveHistory:function(){return TS.storage._get("active_history",[])||[]
},storeActiveHistory:function(e){TS.storage._set("active_history",e,true)
},fetchLastEventTS:function(e){return TS.storage._get("last_event_ts","",e)||""
},storeLastEventTS:function(g,e,f){TS.storage._set("last_event_ts",g,e,f)
},fetchLastMsgTS:function(){return TS.storage._get("last_msg_ts","")||""
},storeLastMsgTS:function(f,e){TS.storage._set("last_msg_ts",f,e)
},fetchUIState:function(){return TS.storage._get("ui_state",{})||{}
},storeUIState:function(e){TS.storage._set("ui_state",e)
},fetchInlineImgState:function(){return TS.storage._get("inline_img_state",{})||{}
},storeInlineImgState:function(e){TS.storage._set("inline_img_state",e)
},fetchInlineVideoState:function(){return TS.storage._get("inline_video_state",{})||{}
},storeInlineVideoState:function(e){TS.storage._set("inline_video_state",e)
},fetchInlineAttachmentState:function(){return TS.storage._get("inline_attachment_state",{})||{}
},storeInlineAttachmentState:function(e){TS.storage._set("inline_attachment_state",e)
},fetchExpandableState:function(){return TS.storage._get("expandable_state",{})||{}
},storeExpandableState:function(e){TS.storage._set("expandable_state",e)
},fetchClientWindows:function(){return TS.storage._get("client_windows",{})||{}
},storeClientWindows:function(e){TS.storage._set("client_windows",e)
},fetchInputHistory:function(){var f=TS.storage._get("input_history",[])||[];
var e=300;
if(f.length>e){f.length=e
}return f
},storeInputHistory:function(e){TS.storage._set("input_history",e)
},fetchChannelPageState:function(){return TS.storage._get("channel_page_state",{})||{}
},storeChannelPageState:function(e){TS.storage._set("channel_page_state",e)
},fetchRxnRecords:function(){return TS.storage._get("rxn_records",[])||[]
},storeRxnRecords:function(f,e){TS.storage._set("rxn_records",f,e)
},fetchInvitesState:function(){return TS.storage._get("invites_state",[])||[]
},storeInvitesState:function(e){TS.storage._set("invites_state",e)
},fetchMembers:function(){return TS.storage._get("members",[])||[]
},storeMembers:function(e){if(!TS.model.supports_user_caching&&e){return
}TS.storage._set("members",e)
},fetchBots:function(){return TS.storage._get("bots",[])||[]
},storeBots:function(e){if(!TS.model.supports_user_caching&&e){return
}TS.storage._set("bots",e)
},fetchLastCacheTS:function(e){return readCookie("last_cache_ts")
},storeLastCacheTS:function(e){if(!TS.model.supports_user_caching&&e){return
}if(e){createCookie("last_cache_ts",e,365*10)
}else{eraseCookie("last_cache_ts")
}}});
var d=!!(window.macgap&&macgap.ls);
var b=d?macgap.ls:window.localStorage;
var a=function(){return b
};
var c=function(e){b=e
}
})();
(function(){TS.registerModule("templates",{onStart:function(){TS.templates.load();
TS.templates.registerPartials();
TS.members.user_color_changed_sig.add(TS.templates.memberUserColorChanged,TS.templates);
TS.prefs.sidebar_behavior_changed_sig.add(TS.templates.sidebarBehaviorPrefChanged,TS.templates);
TS.ui.retina_changed_sig.add(a)
},generic_dialog_template:'		<div class="modal-header">			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>			<h3>{{{title}}} <img src="'+cdn_url+'/272a/img/loading.gif" width="16" height="16" class="throbber hidden"></h3>		</div>		<div class="modal-body" style="overflow-x: hidden;">			{{{body}}}		</div>		<div class="modal-footer">			<a style="cursor: pointer" class="btn btn_outline dialog_cancel" data-qa="generic_dialog_cancel"></a>			<a style="cursor: pointer" class="btn btn dialog_secondary_go hidden" data-qa="generic_dialog_secondary_go"></a>			<a style="cursor: pointer" class="btn dialog_go" data-qa="generic_dialog_go"></a>		</div>		',generic_dialog_sample_template:'		<p><a class="btn btn_small" onclick="TS.generic_dialog.cancel(); $(\'#file-upload\').trigger(\'click\');">Choose a file</a> 		OR <a class="btn btn_small" hhref="/files/create/snippet" target="{{newWindowName}}" onclick="TS.ui.snippet_dialog.startCreate(); TS.generic_dialog.cancel();">Create a text file</a></p>		',privacy_policy_dialog_template:'		<div class="modal-content">			{{#if title}}				<div class="modal-header">					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>				</div>			{{/if}}			<div class="modal-body" style="overflow-x: hidden;">				{{{body}}}			</div>			<div class="modal-footer">				{{#if footer}}					{{{footer}}}				{{/if}}			</div>		</div>		',existing_groups_template:'		{{#if_equal existing_groups.length compare=1}}			The following group has the same members as the one you are trying to create. Would you like to use it instead?<br><br>		{{else}}			The following groups have the same members as the one you are trying to create. Would you like to use one of them instead?<br><br>		{{/if_equal}}		{{#each existing_groups}}			<p class="small_bottom_margin" style="font-size:0.8rem; color:black"><span style="color: #AAA;">{{{groupPrefix}}}</span>{{this.name}}&nbsp;&nbsp;<a onclick="TS.ui.group_create_dialog.useExistingGroup(\'{{this.id}}\')" class="btn btn_small ">{{#if this.is_archived}}unarchive{{else}}open{{/if}}</a></p>		{{/each}}		<br>		If you really want to create a new group, just click the "create new group" button again.		',issue_list_item_template:'		<div class="issue_list_div issue_{{issue.state}}" id="{{makeIssueListDomId issue.id}}" data-issue-id="{{issue.id}}">			<div class="issue_list_left">				<div class="issue_list_title">{{issue.title}}</div>				<div class="issue_list_short_text">{{issue.short_text}}</div>			</div>			<div class="issue_list_right">				<div class="issue_list_state">{{issue.state}}{{#if_equal issue.state compare="unread"}} <i class="ts_icon ts_icon_exclamation_circle icon"></i>{{/if_equal}}</div>				<div class="issue_list_short_ts">{{toCalendarDateOrNamedDayShort issue.ts}} at {{toTime issue.ts}}</div>			</div>		</div>		',help_issue_div_template:'		<p class="small_bottom_margin"><b>{{issue.title}}</b></p>		{{#if show_comments}}			{{#each issue.comments}}				<div class="issue_comment_div">					<p class="small_bottom_margin"><b>{{this.from}}</b> <span class="issue_list_short_ts">{{toCalendarDateOrNamedDayShort this.ts}} at {{toTime this.ts}}</span></p>					{{{formatMessageSimple this.text}}}				</div>			{{/each}}		{{else}}			<div class="issue_comment_div">			</div>		{{/if}}		',help_issue_reply_comments_template:'		{{#each issue.comments}}			<div class="issue_comment_div">				<p class="small_bottom_margin"><b>{{this.from}}</b> <span class="issue_list_short_ts">{{toCalendarDateOrNamedDayShort this.ts}} at {{toTime this.ts}}</span></p>				{{{formatMessageSimple this.text}}}			</div>		{{/each}}		',message_attachment_template:'{{{initial_caret_html}}}<div {{#if real_src}}data-real-src="{{real_src}}"{{/if}} class="inline_attachment{{#unless expand_it}} hidden{{/unless}} {{max_width_class}}">{{#if attachment.pretext}}<div class="attachment_pretext">{{{formatMessageAttachmentPart attachment.pretext msg true attachment.mrkdwn_in_hash.pretext}}}</div>{{/if}}<div class="inline_attachment_wrapper{{#if is_standalone}} standalone{{/if}}"><div class="attachment_bar" style="background:#{{bg_color}};"><div class="shim"></div></div><div class="content dynamic_content_max_width">{{#if thumb_at_top}}{{#if small_thumb}}<div class="msg_inline_attachment_thumb_holder at_top">{{#if thumb_link}}<a {{{makeRefererSafeLink url=thumb_link}}} target="{{thumb_link}}">{{/if}}{{!using style for width height is important! we must override default img styles}}<img class="msg_inline_attachment_thumb" src="{{small_thumb_url}}" style="width:{{attachment._floated_thumb_display_width}}px; height:{{attachment._floated_thumb_display_height}}px;">{{#if thumb_link}}</a>{{/if}}</div>{{/if}}{{/if}}{{#if can_delete}}<div class="delete_attachment_link" data-attachment-id="{{attachment.id}}"><i class="ts_icon ts_icon_times_small"></i></div>{{/if}}<div>{{#if attachment.service_icon}}<img class="attachment_service_icon" src="{{attachment.service_icon}}" width="16" height="16">{{/if}}{{#if attachment.author_icon}}{{#if attachment.author_link}}<a {{{makeRefererSafeLink url=attachment.author_link}}} target="{{attachment.author_link}}"><img class="attachment_author_icon" src="{{attachment.author_icon}}" width="16" height="16"></a><a {{{makeRefererSafeLink url=attachment.author_link}}} target="{{attachment.author_link}}"><span class="attachment_author_name">{{attachment.author_name}}</span></a><a {{{makeRefererSafeLink url=attachment.author_link}}} target="{{attachment.author_link}}"><span class="attachment_author_subname">{{attachment.author_subname}}</span></a>{{else}}<img class="attachment_author_icon" src="{{attachment.author_icon}}" width="16" height="16"><span class="attachment_author_name">{{attachment.author_name}}</span><span class="attachment_author_subname">{{attachment.author_subname}}</span>{{/if}}{{else}}{{#if attachment.service_url}}<a {{{makeRefererSafeLink url=attachment.service_url}}} target="{{attachment.service_url}}"><span class="attachment_service_name">{{attachment.service_name}}</span></a>{{else}}<span class="attachment_service_name">{{attachment.service_name}}</span>{{/if}}{{/if}}{{#unless attachment.title}}{{#unless attachment.text}}{{#unless attachment.fields}}{{{media_caret_html}}}{{/unless}}{{/unless}}{{/unless}}</div>{{#unless thumb_at_top}}{{#if small_thumb}}<div class="msg_inline_attachment_thumb_holder">{{#if thumb_link}}<a {{{makeRefererSafeLink url=thumb_link}}} target="{{thumb_link}}">{{/if}}{{!using style for width height is important! we must override default img styles}}<img class="msg_inline_attachment_thumb" src="{{small_thumb_url}}" style="width:{{attachment._floated_thumb_display_width}}px; height:{{attachment._floated_thumb_display_height}}px;">{{#if thumb_link}}</a>{{/if}}</div>{{/if}}{{/unless}}{{#unless attachment.author_icon}}{{#if attachment.author_link}}<a {{{makeRefererSafeLink url=attachment.author_link}}} target="{{attachment.author_link}}"><span class="attachment_author_name">{{attachment.author_name}}</span></a><a {{{makeRefererSafeLink url=attachment.author_link}}} target="{{attachment.author_link}}"><span class="attachment_author_subname">{{attachment.author_subname}}</span></a>{{else}}{{#if attachment.author_name}}<span class="attachment_author_name">{{attachment.author_name}}</span><span class="attachment_author_subname">{{attachment.author_subname}}</span>{{/if}}{{/if}}{{/unless}}{{#if attachment.title}}<div>{{#if attachment.title_link}}<span class="attachment_title"><a {{{makeRefererSafeLink url=attachment.title_link}}} target="{{attachment.title_link}}">{{{formatMessageAttachmentPart attachment.title msg true false enable_slack_action_links}}}</a></span>{{else}}<span class="attachment_title">{{{formatMessageAttachmentPart attachment.title msg true false enable_slack_action_links}}}</span>{{/if}}{{#unless attachment.text}}{{#unless attachment.fields}}{{{media_caret_html}}}{{/unless}}{{/unless}}</div>{{/if}}{{#if attachment.text}}{{#feature flag="feature_more_field_in_message_attachments"}}<div class="attachment_contents">{{#if has_more}}{{#if is_text_collapsed}}<span class="short_text" data-all-text="{{formatMessageAttachmentPart attachment.text msg true attachment.mrkdwn_in_hash.text}}">{{{formatMessageAttachmentPart attachment._short_text msg true attachment.mrkdwn_in_hash.text enable_slack_action_links}}}</span>{{else}}<span class="short_text" data-all-text="{{formatMessageAttachmentPart attachment.text msg true attachment.mrkdwn_in_hash.text}}">{{{formatMessageAttachmentPart attachment.text msg true attachment.mrkdwn_in_hash.text enable_slack_action_links}}}{{/if}}<span id="{{makeMsgAttachmentTextExpanderDomId msg.ts attachment._index}}" class="rest_text_expander"{{#if attachment.more_hidetext}} data-hide-text="{{attachment.more_hidetext}}"{{/if}}> <a><br /><span>{{#if attachment.more_showtext}}{{attachment.more_showtext}}{{else}}Show more{{/if}}</span>{{#if attachment.more_hidetext}} <i class="attachment_caret ts_icon ts_icon_caret_right"></i>{{else}}...{{/if}}</a></span><span class="more_text hidden"><br />{{{formatMessageAttachmentPart attachment.more msg true attachment.mrkdwn_in_hash.text enable_slack_action_links}}}</span>{{else}}{{#if is_text_collapsed}}<span class="short_text" data-all-text="{{formatMessageAttachmentPart attachment.text msg true attachment.mrkdwn_in_hash.text}}">{{{formatMessageAttachmentPart attachment._short_text msg true attachment.mrkdwn_in_hash.text enable_slack_action_links}}}</span><span id="{{makeMsgAttachmentTextExpanderDomId msg.ts attachment._index}}" class="rest_text_expander"> <a>Show more...</a></span>{{else}}{{{formatMessageAttachmentPart attachment.text msg true attachment.mrkdwn_in_hash.text enable_slack_action_links}}}{{/if}}{{/if}}{{#unless attachment.fields}}{{{media_caret_html}}}{{/unless}}</div>{{#if attachment.footer}}<div class="attachment_footer">{{{formatMessageAttachmentPart attachment.footer msg true attachment.mrkdwn_in_hash.footer enable_slack_action_links}}}</div>{{/if}}{{#if attachment.ts}}<div class="attachment_ts">{{#if ts_link}}<a {{{makeRefererSafeLink url=ts_link}}} target="{{ts_link}}">{{/if}}{{toCalendarDateOrNamedDayShort attachment.ts}} at {{toTime attachment.ts}}{{#if ts_link}}</a>{{/if}}</div>{{/if}}{{else}}<div class="attachment_contents">{{#if is_text_collapsed}}<span class="short_text" data-all-text="{{formatMessageAttachmentPart attachment.text msg true attachment.mrkdwn_in_hash.text}}">{{{formatMessageAttachmentPart attachment._short_text msg true attachment.mrkdwn_in_hash.text enable_slack_action_links}}}</span><span id="{{makeMsgAttachmentTextExpanderDomId msg.ts attachment._index}}" class="rest_text_expander"> <a>Show more...</a></span>{{else}}{{{formatMessageAttachmentPart attachment.text msg true attachment.mrkdwn_in_hash.text enable_slack_action_links}}}{{/if}}{{#unless attachment.fields}}{{{media_caret_html}}}{{/unless}}</div>{{#if attachment.footer}}<div class="attachment_footer">{{{formatMessageAttachmentPart attachment.footer msg true attachment.mrkdwn_in_hash.footer enable_slack_action_links}}}</div>{{/if}}{{#if attachment.ts}}<div class="attachment_ts">{{#if ts_link}}<a {{{makeRefererSafeLink url=ts_link}}} target="{{ts_link}}">{{/if}}{{toCalendarDateOrNamedDayShort attachment.ts}} at {{toTime attachment.ts}}{{#if ts_link}}</a>{{/if}}</div>{{/if}}{{/feature}}{{/if}}{{#if attachment.fields}}<div class="attachment_fields">{{#if show_fields_table}}<table class="" cellpadding="0" cellspacing="0" border="0" align="left"><tbody>{{#foreach attachment.fields}}{{#if this.value._new_row}}<tr>{{/if}}<td valign="top" colspan="{{#if this.value.short}}1{{else}}2{{/if}}" {{#if this.value.short}}{{#if this.value._new_row}}width="250"{{/if}}{{/if}}><div class="attachment_field_title">{{{formatMessageAttachmentPart this.value.title msg false false}}}</div><i class="copy_only">----------------<br></i><div class="attachment_field_value {{#if this.value.short}}short{{/if}}">{{{formatMessageAttachmentPart this.value.value msg true ../attachment.mrkdwn_in_hash.fields ../enable_slack_action_links}}}<i class="copy_only"><br><br></i></div></td>{{/foreach}}</tbody></table>{{else}}{{#foreach long_fields}}<span class="attachment_field_title">{{{formatMessageAttachmentPart this.value.title msg false false}}}</span>&nbsp;&nbsp;&nbsp;{{{formatMessageAttachmentPart this.value.value msg true ../attachment.mrkdwn_in_hash.fields}}}<br>{{/foreach}}{{#foreach short_fields}}{{#unless this.first}}&nbsp;&nbsp;•&nbsp;&nbsp;{{/unless}}<span class="attachment_field_title">{{{formatMessageAttachmentPart this.value.title msg false false}}}</span>&nbsp;&nbsp;&nbsp;{{{formatMessageAttachmentPart this.value.value msg true ../attachment.mrkdwn_in_hash.fields ../enable_slack_action_links}}}{{/foreach}}{{/if}}</div>{{{media_caret_html}}}{{/if}}{{#if attachment.other_html}}{{{inlineOtherDiv attachment.other_html msg_dom_id attachment.safe_other_html expand_media}}}{{/if}}{{#if attachment.video_html}}{{#if attachment.thumb_url}}{{#if attachment.from_url}}{{{inlineVideoDiv attachment.from_url msg_dom_id expand_media}}}{{else}}{{{inlineVideoDiv attachment.thumb_url msg_dom_id expand_media}}}{{/if}}{{/if}}{{else}}{{/if}}{{#if attachment.image_url}}{{#if attachment.from_url}}{{{inlineImgDiv attachment.from_url msg_dom_id expand_media}}}{{else}}{{{inlineImgDiv attachment.image_url msg_dom_id expand_media}}}{{/if}}{{/if}}{{#if attachment.audio_html}}{{{inlineAudioDiv attachment.audio_html msg_dom_id attachment.safe_audio_html expand_media}}}{{else}}{{#if attachment.audio_url}}{{{formatSoundUrl attachment}}}{{/if}}{{/if}}{{#if show_action_links}}{{#if attachment.actions}}<div class="attachment_actions">{{#foreach attachment.actions}}{{{formatActionLink this.value msg ../enable_slack_action_links}}}{{#unless this.last}} • {{/unless}}{{/foreach}}</div>{{/if}}{{/if}}</div></div></div>{{#if show_fallback}}<div class="attachment_fallback">{{#if attachment.fallback}}{{{formatMessageAttachmentPart attachment.fallback msg true attachment.mrkdwn_in_hash.fallback enable_slack_action_links}}}{{else}}NO FALLBACK PROVIDED{{/if}}</div>{{/if}}',messages_search_paging_template:'<div class="search_paging">{{#if_not_equal pages compare=1}}{{#if_equal current_page compare=1}}<i class="left ts_icon ts_icon_chevron_circle_left disabled"></i>{{else}}<a onclick="TS.search.view.pageMessagesBack()"><i class="left ts_icon ts_icon_chevron_circle_left"></i></a>{{/if_equal}}{{/if_not_equal}}<span class="page_text">page {{current_page}} of {{pages}}</span>{{#if_not_equal pages compare=1}}{{#if_equal current_page compare=pages}}<i class="right ts_icon ts_icon_chevron_medium_right disabled"></i>{{else}}<a onclick="TS.search.view.pageMessagesForward()"><i class="right ts_icon ts_icon_chevron_circle_right"></i></a>{{/if_equal}}{{/if_not_equal}}</div>',files_search_paging_template:'<div class="search_paging">{{#if_not_equal pages compare=1}}{{#if_equal current_page compare=1}}<i class="left ts_icon ts_icon_chevron_circle_left disabled"></i>{{else}}<a onclick="TS.search.view.pageFilesBack()"><i class="left ts_icon ts_icon_chevron_circle_left"></i></a>{{/if_equal}}{{/if_not_equal}}<span class="page_text">page {{current_page}} of {{pages}}</span>{{#if_not_equal pages compare=1}}{{#if_equal current_page compare=pages}}<i class="right ts_icon ts_icon_chevron_medium_right disabled"></i>{{else}}<a onclick="TS.search.view.pageFilesForward()"><i class="right ts_icon ts_icon_chevron_circle_right"></i></a>{{/if_equal}}{{/if_not_equal}}</div>',compile:function(c){var f=c+"_template";
if(TS.templates[f]){return Handlebars.compile(TS.templates[f])
}var b="#"+f;
var e=$(b).html();
if(!e){TS.warn(b+" has no html");
return null
}var d=Handlebars.compile(e);
return d
},load:function(){var e=Date.now();
TS.templates.message=TS.templates.compile("message");
TS.templates.message_edit_form=TS.templates.compile("message_edit_form");
TS.templates.message_attachment=TS.templates.compile("message_attachment");
TS.templates.message_screenhero_attachment=TS.templates.compile("message_screenhero_attachment");
TS.templates.message_file_share_old=TS.templates.compile("message_file_share_old");
TS.templates.message_file_post_share_old=TS.templates.compile("message_file_post_share_old");
TS.templates.message_file_space_share_old=TS.templates.compile("message_file_space_share_old");
TS.templates.message_file_snippet_share_old=TS.templates.compile("message_file_snippet_share_old");
if(TS.boot_data.feature_email_integration||TS.boot_data.feature_email_ingestion){TS.templates.message_file_email_share_old=TS.templates.compile("message_file_email_share_old")
}TS.templates.member_profile_image=TS.templates.compile("member_profile_image");
TS.templates.message_file=TS.templates.compile("message_file");
TS.templates.message_file_upload_old=TS.templates.compile("message_file_upload_old");
TS.templates.message_file_snippet_create_old=TS.templates.compile("message_file_snippet_create_old");
TS.templates.message_file_comment=TS.templates.compile("message_file_comment");
TS.templates.message_file_post_comment=TS.templates.compile("message_file_post_comment");
TS.templates.message_file_preview_footer=TS.templates.compile("message_file_preview_footer");
TS.templates.message_file_preview_actions=TS.templates.compile("message_file_preview_actions");
if(TS.boot_data.feature_new_message_markup){TS.templates.message_actions=TS.templates.compile("message_actions")
}TS.templates.messages_subtypes_bot_add=TS.templates.compile("messages_subtypes_bot_add");
TS.templates.messages_subtypes_bot_disable=TS.templates.compile("messages_subtypes_bot_disable");
TS.templates.messages_subtypes_bot_enable=TS.templates.compile("messages_subtypes_bot_enable");
TS.templates.messages_subtypes_bot_remove=TS.templates.compile("messages_subtypes_bot_remove");
TS.templates.messages_day_divider=TS.templates.compile("messages_day_divider");
TS.templates.messages_unread_divider=TS.templates.compile("messages_unread_divider");
TS.templates.service_preview_header=TS.templates.compile("service_preview_header");
TS.templates.service_preview_body=TS.templates.compile("service_preview_body");
TS.templates.channel_list=TS.templates.compile("channel_list");
TS.templates.channel_members_list=TS.templates.compile("channel_members_list");
TS.templates.channel_create_overlay=TS.templates.compile("channel_create_overlay");
TS.templates.channel_join_overlay=TS.templates.compile("channel_join_overlay");
if(TS.boot_data.feature_private_channels){TS.templates.channel_browser=TS.templates.compile("channel_browser");
TS.templates.channel_browser_row=TS.templates.compile("channel_browser_row");
TS.templates.channel_browser_footer=TS.templates.compile("channel_browser_footer");
TS.templates.channel_new_modal=TS.templates.compile("channel_new_modal");
TS.templates.channel_invite_modal=TS.templates.compile("channel_invite_modal");
TS.templates.channel_invite_member_small=TS.templates.compile("channel_invite_member_small");
TS.templates.channel_invite_member=TS.templates.compile("channel_invite_member");
TS.templates.channel_kb_nav_label=TS.templates.compile("channel_kb_nav_label");
TS.templates.channel_modal_go_button=TS.templates.compile("channel_modal_go_button");
TS.templates.im_browser=TS.templates.compile("im_browser");
TS.templates.im_browser_row=TS.templates.compile("im_browser_row");
TS.templates.mpim_new_modal=TS.templates.compile("mpim_new_modal");
TS.templates.mpim_new_modal_labels=TS.templates.compile("mpim_new_modal_labels");
TS.templates.channel_archives_list=TS.templates.compile("channel_archives_list");
TS.templates.im_archives_list=TS.templates.compile("im_archives_list")
}TS.templates.group_create_overlay=TS.templates.compile("group_create_overlay");
TS.templates.group_join_overlay=TS.templates.compile("group_join_overlay");
if(TS.boot_data.feature_mpim_client){TS.templates.mpim=TS.templates.compile("mpim")
}TS.templates.member=TS.templates.compile("member");
TS.templates.group=TS.templates.compile("group");
TS.templates.channel=TS.templates.compile("channel");
TS.templates.team_list=TS.templates.compile("team_list");
TS.templates.team_list_no_results=TS.templates.compile("team_list_no_results");
TS.templates.team_tabs=TS.templates.compile("team_tabs");
if(TS.boot_data.feature_subteams){TS.templates.user_group_list=TS.templates.compile("user_group_list");
TS.templates.user_group_list_item=TS.templates.compile("user_group_list_item");
TS.templates.user_group_channel_list_item=TS.templates.compile("user_group_channel_list_item");
TS.templates.user_group_alerts=TS.templates.compile("user_group_alerts");
TS.templates.user_group_modal=TS.templates.compile("user_group_modal");
TS.templates.user_group_settings_form=TS.templates.compile("user_group_settings_form");
TS.templates.user_group_members_form=TS.templates.compile("user_group_members_form");
TS.templates.user_group_toggle=TS.templates.compile("user_group_toggle");
TS.templates.user_group_invite_member_small=TS.templates.compile("user_group_invite_member_small");
TS.templates.user_group_preview=TS.templates.compile("user_group_preview");
TS.templates.user_group_tabs=TS.templates.compile("user_group_tabs");
TS.templates.user_group_items=TS.templates.compile("user_group_items")
}TS.templates.team_list_item=TS.templates.compile("team_list_item");
TS.templates.team_list_item_details=TS.templates.compile("team_list_item_details");
TS.templates.team_list_item_buttons=TS.templates.compile("team_list_item_buttons");
TS.templates.team_member_preview=TS.templates.compile("team_member_preview");
TS.templates.team_profile_fields=TS.templates.compile("team_profile_fields");
TS.templates.dm_badge=TS.templates.compile("dm_badge");
TS.templates.file_list_item=TS.templates.compile("file_list_item");
TS.templates.file_header=TS.templates.compile("file_header");
TS.templates.file_preview_head=TS.templates.compile("file_preview_head");
TS.templates.file_preview_head_section_old=TS.templates.compile("file_preview_head_section_old");
TS.templates.file_snippet_preview_head_section_old=TS.templates.compile("file_snippet_preview_head_section_old");
TS.templates.file_post_preview_head_section_old=TS.templates.compile("file_post_preview_head_section_old");
TS.templates.file_space_preview_head_section_old=TS.templates.compile("file_space_preview_head_section_old");
TS.templates.file_email_preview_head_section_old=TS.templates.compile("file_email_preview_head_section_old");
TS.templates.file_snippet=TS.templates.compile("file_snippet");
TS.templates.file_post=TS.templates.compile("file_post");
TS.templates.file_email=TS.templates.compile("file_email");
TS.templates.file_image=TS.templates.compile("file_image");
TS.templates.file_generic=TS.templates.compile("file_generic");
TS.templates.comments=TS.templates.compile("comments");
TS.templates.comment=TS.templates.compile("comment");
TS.templates.comment_standalone=TS.templates.compile("comment_standalone");
TS.templates.search_widget=TS.templates.compile("search_widget");
TS.templates.search_options=TS.templates.compile("search_options");
TS.templates.search_tabs=TS.templates.compile("search_tabs");
TS.templates.search_files_heading=TS.templates.compile("search_files_heading");
TS.templates.search_team_results=TS.templates.compile("search_team_results");
TS.templates.search_message_results=TS.templates.compile("search_message_results");
TS.templates.search_attachment_extracts=TS.templates.compile("search_attachment_extracts");
TS.templates.search_message_extracts=TS.templates.compile("search_message_extracts");
TS.templates.search_message_results_item=TS.templates.compile("search_message_results_item");
TS.templates.search_results_none=TS.templates.compile("search_results_none");
TS.templates.search_autocomplete_menu=TS.templates.compile("search_autocomplete_menu");
TS.templates.search_autocomplete_menu_channels=TS.templates.compile("search_autocomplete_menu_channels");
TS.templates.search_autocomplete_menu_dms=TS.templates.compile("search_autocomplete_menu_dms");
TS.templates.search_autocomplete_menu_groups=TS.templates.compile("search_autocomplete_menu_groups");
TS.templates.user_status_form=TS.templates.compile("user_status_form");
TS.templates.menu=TS.templates.compile("menu");
TS.templates.emoji_menu=TS.templates.compile("emoji_menu");
TS.templates.emoji_header=TS.templates.compile("emoji_header");
TS.templates.menu_emoticons=TS.templates.compile("menu_emoticons");
TS.templates.menu_member_header=TS.templates.compile("menu_member_header");
TS.templates.menu_member_items=TS.templates.compile("menu_member_items");
TS.templates.menu_member_items_short=TS.templates.compile("menu_member_items_short");
TS.templates.menu_member_footer=TS.templates.compile("menu_member_footer");
TS.templates.menu_user_footer=TS.templates.compile("menu_user_footer");
TS.templates.menu_members_header=TS.templates.compile("menu_members_header");
TS.templates.menu_members_items=TS.templates.compile("menu_members_items");
TS.templates.menu_members_footer=TS.templates.compile("menu_members_footer");
TS.templates.menu_group_header=TS.templates.compile("menu_group_header");
TS.templates.menu_group_items=TS.templates.compile("menu_group_items");
TS.templates.menu_group_footer=TS.templates.compile("menu_group_footer");
if(TS.boot_data.feature_mpim_client){TS.templates.menu_mpim_items=TS.templates.compile("menu_mpim_items")
}TS.templates.menu_channel_header=TS.templates.compile("menu_channel_header");
TS.templates.menu_channel_items=TS.templates.compile("menu_channel_items");
TS.templates.menu_channel_footer=TS.templates.compile("menu_channel_footer");
TS.templates.menu_groups_header=TS.templates.compile("menu_groups_header");
TS.templates.menu_groups_items=TS.templates.compile("menu_groups_items");
TS.templates.menu_team_and_user_items=TS.templates.compile("menu_team_and_user_items");
TS.templates.menu_team_items=TS.templates.compile("menu_team_items");
TS.templates.menu_user_items=TS.templates.compile("menu_user_items");
TS.templates.menu_call_button=TS.templates.compile("menu_call_button");
TS.templates.menu_file_filter_items=TS.templates.compile("menu_file_filter_items");
TS.templates.menu_file_member_header=TS.templates.compile("menu_file_member_header");
TS.templates.menu_file_member_filter_items=TS.templates.compile("menu_file_member_filter_items");
TS.templates.menu_message_action_items=TS.templates.compile("menu_message_action_items");
TS.templates.menu_comment_action_items=TS.templates.compile("menu_comment_action_items");
TS.templates.menu_file_action_items=TS.templates.compile("menu_file_action_items");
TS.templates.menu_space_action_items=TS.templates.compile("menu_space_action_items");
TS.templates.menu_flexpane_header=TS.templates.compile("menu_flexpane_header");
TS.templates.menu_flexpane_items=TS.templates.compile("menu_flexpane_items");
TS.templates.menu_flexpane_footer=TS.templates.compile("menu_flexpane_footer");
TS.templates.menu_channel_picker_header=TS.templates.compile("menu_channel_picker_header");
TS.templates.menu_channel_picker=TS.templates.compile("menu_channel_picker");
TS.templates.menu_search_filter_items=TS.templates.compile("menu_search_filter_items");
TS.templates.download_item=TS.templates.compile("download_item");
if(TS.boot_data.feature_reactions){TS.templates.mentions_rxn=TS.templates.compile("mentions_rxn");
TS.templates.rxns_rxn=TS.templates.compile("rxns_rxn");
TS.templates.rxns_panel=TS.templates.compile("rxns_panel")
}TS.templates.star_item=TS.templates.compile("star_item");
TS.templates.group_create=TS.templates.compile("group_create");
TS.templates.channel_create_dialog=TS.templates.compile("channel_create_dialog");
TS.templates.list_browser_dialog=TS.templates.compile("list_browser_dialog");
TS.templates.list_browser_items=TS.templates.compile("list_browser_items");
TS.templates.list_browser_items_by_membership=TS.templates.compile("list_browser_items_by_membership");
TS.templates.purpose_dialog=TS.templates.compile("purpose_dialog");
TS.templates.file_upload_dialog=TS.templates.compile("file_upload_dialog");
TS.templates.channel_invite_list=TS.templates.compile("channel_invite_list");
TS.templates.group_invite_list=TS.templates.compile("group_invite_list");
TS.templates.channel_member_invite_list=TS.templates.compile("channel_member_invite_list");
TS.templates.group_member_invite_list=TS.templates.compile("group_member_invite_list");
TS.templates.channel_conversion_dialog=TS.templates.compile("channel_conversion_dialog");
TS.templates.channel_data_retention_dialog=TS.templates.compile("channel_data_retention_dialog");
TS.templates.channel_deletion_dialog=TS.templates.compile("channel_deletion_dialog");
TS.templates.channel_options_dialog=TS.templates.compile("channel_options_dialog");
TS.templates.file_sharing=TS.templates.compile("file_sharing");
if(TS.boot_data.feature_private_channels){TS.templates.file_sharing_channel_row=TS.templates.compile("file_sharing_channel_row")
}TS.templates.file_public_link=TS.templates.compile("file_public_link");
TS.templates.prefs_dialog=TS.templates.compile("prefs_dialog");
TS.templates.debug_prefs_dialog=TS.templates.compile("debug_prefs_dialog");
TS.templates.channel_prefs_dialog=TS.templates.compile("channel_prefs_dialog");
TS.templates.help_dialog=TS.templates.compile("help_dialog");
TS.templates.share_dialog=TS.templates.compile("share_dialog");
TS.templates.lightbox_image=TS.templates.compile("lightbox_image");
TS.templates.lightbox_external_image=TS.templates.compile("lightbox_external_image");
TS.templates.lightbox_dialog=TS.templates.compile("lightbox_dialog");
TS.templates.snippet_dialog=TS.templates.compile("snippet_dialog");
TS.templates.generic_dialog=TS.templates.compile("generic_dialog");
TS.templates.generic_dialog_sample=TS.templates.compile("generic_dialog_sample");
TS.templates.privacy_policy_dialog=TS.templates.compile("privacy_policy_dialog");
TS.templates.at_channel_warning_dialog=TS.templates.compile("at_channel_warning_dialog");
TS.templates.at_channel_warning_note=TS.templates.compile("at_channel_warning_note");
TS.templates.sms_two_factor=TS.templates.compile("sms_two_factor");
TS.templates.at_channel_blocked_note=TS.templates.compile("at_channel_blocked_note");
TS.templates.fs_modal=TS.templates.compile("fs_modal");
TS.templates.fs_modal_generic_contents=TS.templates.compile("fs_modal_generic_contents");
TS.templates.toggle=TS.templates.compile("toggle");
TS.templates.existing_groups=TS.templates.compile("existing_groups");
TS.templates.coachmark=TS.templates.compile("coachmark");
TS.templates.channels_coachmark=TS.templates.compile("channels_coachmark");
TS.templates.invites_coachmark=TS.templates.compile("invites_coachmark");
TS.templates.direct_messages_coachmark=TS.templates.compile("direct_messages_coachmark");
TS.templates.search_coachmark=TS.templates.compile("search_coachmark");
TS.templates.recent_mentions_coachmark=TS.templates.compile("recent_mentions_coachmark");
TS.templates.starred_items_coachmark=TS.templates.compile("starred_items_coachmark");
TS.templates.private_groups_coachmark=TS.templates.compile("private_groups_coachmark");
TS.templates.sidebar_theme_css=TS.templates.compile("sidebar_theme_css");
TS.templates.shortcuts_dialog=TS.templates.compile("shortcuts_dialog");
TS.templates.shortcuts_spaces_dialog=TS.templates.compile("shortcuts_spaces_dialog");
TS.templates.omnibox=TS.templates.compile("omnibox");
TS.templates.growl_prompt_overlay=TS.templates.compile("growl_prompt_overlay");
TS.templates.admin_list_item=TS.templates.compile("admin_list_item");
TS.templates.admin_invite_list_item=TS.templates.compile("admin_invite_list_item");
TS.templates.admin_invite_row=TS.templates.compile("admin_invite_row");
TS.templates.admin_invite_modal=TS.templates.compile("admin_invite_modal");
TS.templates.admin_invite_summary=TS.templates.compile("admin_invite_summary");
TS.templates.admin_invite_channel_picker=TS.templates.compile("admin_invite_channel_picker");
TS.templates.admin_invite_switcher=TS.templates.compile("admin_invite_switcher");
if(TS.boot_data.feature_custom_fields){TS.templates.admin_edit_team_profile_modal=TS.templates.compile("admin_edit_team_profile_modal");
TS.templates.admin_edit_team_profile_list=TS.templates.compile("admin_edit_team_profile_list");
TS.templates.admin_edit_team_profile_add=TS.templates.compile("admin_edit_team_profile_add");
TS.templates.admin_edit_team_profile_custom=TS.templates.compile("admin_edit_team_profile_custom");
TS.templates.admin_edit_team_profile_edit=TS.templates.compile("admin_edit_team_profile_edit");
TS.templates.admin_edit_team_profile_option_row=TS.templates.compile("admin_edit_team_profile_option_row");
TS.templates.admin_menu_edit_team_profile_list_action_items=TS.templates.compile("admin_menu_edit_team_profile_list_action_items")
}TS.templates.admin_restricted_info=TS.templates.compile("admin_restricted_info");
TS.templates.admin_restricted_info_sso=TS.templates.compile("admin_restricted_info_sso");
TS.templates.admin_restrict_account=TS.templates.compile("admin_restrict_account");
TS.templates.account_secret_codes_modal=TS.templates.compile("account_secret_codes_modal");
TS.templates.password_modal=TS.templates.compile("password_modal");
TS.templates.two_factor_auth_modal=TS.templates.compile("two_factor_auth_modal");
TS.templates.issue_list_item=TS.templates.compile("issue_list_item");
TS.templates.help_issue_div=TS.templates.compile("help_issue_div");
TS.templates.help_issue_reply_comments=TS.templates.compile("help_issue_reply_comments");
TS.templates.messages_search_paging=TS.templates.compile("messages_search_paging");
TS.templates.files_search_paging=TS.templates.compile("files_search_paging");
TS.templates.account_notifications_channel_overrides=TS.templates.compile("account_notifications_channel_overrides");
TS.templates.account_notifications_channel_overrides_row=TS.templates.compile("account_notifications_channel_overrides_row");
TS.templates.billing_contact=TS.templates.compile("billing_contact");
TS.templates.billing_add_contact_form=TS.templates.compile("billing_add_contact_form");
TS.templates.bank_account_verification_dialog=TS.templates.compile("bank_account_verification_dialog");
if(TS.boot_data.feature_screenhero){TS.templates.screenhero_main=TS.templates.compile("screenhero_main");
TS.templates.screenhero_participant=TS.templates.compile("screenhero_participant");
TS.templates.screenhero_invite_response_dialog=TS.templates.compile("screenhero_invite_response_dialog");
TS.templates.screenhero_invite_unsupported_dialog=TS.templates.compile("screenhero_invite_unsupported_dialog");
TS.templates.screenhero_invitees=TS.templates.compile("screenhero_invitees");
TS.templates.screenhero_incoming_call=TS.templates.compile("screenhero_incoming_call");
TS.templates.screenhero_incoming_call_window=TS.templates.compile("screenhero_incoming_call_window");
TS.templates.screenhero_share_channels=TS.templates.compile("screenhero_share_channels");
TS.templates.screenhero_settings_menu=TS.templates.compile("screenhero_settings_menu");
TS.templates.screenhero_minipanel=TS.templates.compile("screenhero_minipanel");
TS.templates.screenhero_emoji_panel=TS.templates.compile("screenhero_emoji_panel");
TS.templates.screenhero_call_quality=TS.templates.compile("screenhero_call_quality");
TS.templates.screenhero_call_start_dialog=TS.templates.compile("screenhero_call_start_dialog");
TS.templates.screenhero_call_unsupported=TS.templates.compile("screenhero_call_unsupported");
TS.templates.screenhero_call_unauthorized=TS.templates.compile("screenhero_call_unauthorized");
TS.templates.screenhero_close_window_line=TS.templates.compile("screenhero_close_window_line");
TS.templates.screenhero_download_beta_dialog=TS.templates.compile("screenhero_download_beta_dialog");
TS.templates.screenhero_update_ssb=TS.templates.compile("screenhero_update_ssb");
TS.templates.screenhero_loading_screen=TS.templates.compile("screenhero_loading_screen")
}if(TS.boot_data.feature_spaces){var c=["spaces_connected_members","spaces_connected_member","spaces_connected_member_count","spaces_connected_member_overflow_popover","spaces_link_popover","spaces_style_popover","spaces_shared_in"];
c.forEach(function(f){TS.templates[f]=TS.templates.compile(f)
})
}var d=["channel_page_empty_state","channel_page_details","channel_page_member_tabs","channel_page_member_lists","channel_page_member_row","channel_page_empty_pinned_items","channel_page_pinned_item","message_pinned_file","message_pinned_message","message_pinned_comment","channel_page_conversation_details"];
if(TS.boot_data.feature_channel_details){d.push("channel_page_empty_shared_files");
d.push("channel_page_view_all_files_link");
d.push("channel_page_notif_prefs")
}d.forEach(function(f){TS.templates[f]=TS.templates.compile(f)
});
if(TS.create){TS.templates.signup_content=TS.templates.compile("signup_content");
TS.templates.signup_email_body=TS.templates.compile("signup_email_body");
TS.templates.signup_email_confirmation_body=TS.templates.compile("signup_email_confirmation_body");
TS.templates.signup_team_name_body=TS.templates.compile("signup_team_name_body");
TS.templates.signup_url_body=TS.templates.compile("signup_url_body");
TS.templates.signup_username_body=TS.templates.compile("signup_username_body");
TS.templates.create_team_body=TS.templates.compile("signup_create_team_body");
TS.templates.signup_invite_body=TS.templates.compile("signup_invite_body");
TS.templates.sso_signup_details_body=TS.templates.compile("sso_signup_details_body")
}TS.templates.signin_find_team=TS.templates.compile("signin_find_team");
TS.templates.signin_find_team_email_sent=TS.templates.compile("signin_find_team_email_sent");
TS.templates.invite_form=TS.templates.compile("invite_form");
TS.templates.invite_sso_form=TS.templates.compile("invite_sso_form");
TS.templates.bot_icon_modal=TS.templates.compile("bot_icon_modal");
TS.templates.bot_icon_preview=TS.templates.compile("bot_icon_preview");
if(TS.boot_data.feature_filter_select_component){TS.templates.filter_select_container=TS.templates.compile("filter_select_container");
TS.templates.filter_select_pagination=TS.templates.compile("filter_select_pagination");
TS.templates.filter_select_item=TS.templates.compile("filter_select_item")
}TS.templates.app_update_modal=TS.templates.compile("app_update_modal");
TS.templates.app_destroy_modal=TS.templates.compile("app_destroy_modal");
var b=Date.now()-e;
TS.log(2,b+"ms spent compiling templates")
},registerPartials:function(){Handlebars.registerPartial("channel",$("#channel_template").html());
Handlebars.registerPartial("member",$("#member_template").html());
Handlebars.registerPartial("member",$("#member_template").html());
Handlebars.registerPartial("team_list_item",$("#team_list_item_template").html());
Handlebars.registerPartial("comment",$("#comment_template").html());
Handlebars.registerPartial("search_widget_message_result",$("#search_widget_message_result_template").html());
Handlebars.registerPartial("search_widget_file_result",$("#search_widget_file_result_template").html());
Handlebars.registerPartial("search_message_results_item",TS.templates.search_message_results_item);
Handlebars.registerPartial("list_browser_items",TS.templates.list_browser_items);
Handlebars.registerPartial("file_snippet",TS.templates.file_snippet);
Handlebars.registerPartial("file_post",TS.templates.file_post);
Handlebars.registerPartial("file_email",TS.templates.file_email);
Handlebars.registerPartial("file_image",TS.templates.file_image);
Handlebars.registerPartial("file_generic",TS.templates.file_generic);
Handlebars.registerPartial("file_public_link",TS.templates.file_public_link);
if(TS.boot_data.feature_new_message_markup){Handlebars.registerPartial("message_actions",TS.templates.message_actions)
}Handlebars.registerPartial("message_file_preview_actions",TS.templates.message_file_preview_actions);
Handlebars.registerPartial("message_file_preview_footer",TS.templates.message_file_preview_footer);
if(TS.boot_data.feature_spaces){Handlebars.registerPartial("spaces_connected_member_count",$("#spaces_connected_member_count_template").html())
}Handlebars.registerPartial("admin_invite_channel_picker",TS.templates.admin_invite_channel_picker);
Handlebars.registerPartial("admin_invite_summary",TS.templates.admin_invite_summary);
Handlebars.registerPartial("admin_invite_switcher",TS.templates.admin_invite_switcher);
Handlebars.registerPartial("channel_page_member_row",TS.templates.channel_page_member_row);
if(TS.create){Handlebars.registerPartial("signup_email_body",TS.templates.signup_email_body);
Handlebars.registerPartial("signup_email_confirmation_body",TS.templates.signup_email_confirmation_body);
Handlebars.registerPartial("signup_team_name_body",TS.templates.signup_team_name_body);
Handlebars.registerPartial("signup_url_body",TS.templates.signup_url_body);
Handlebars.registerPartial("signup_username_body",TS.templates.signup_username_body);
Handlebars.registerPartial("create_team_body",TS.templates.create_team_body);
Handlebars.registerPartial("signup_invite_body",TS.templates.signup_invite_body);
Handlebars.registerPartial("sso_signup_details_body",TS.templates.sso_signup_details_body)
}if(TS.boot_data.feature_subteams){Handlebars.registerPartial("user_group_list_item",TS.templates.user_group_list_item);
Handlebars.registerPartial("user_group_channel_list_item",TS.templates.user_group_channel_list_item);
Handlebars.registerPartial("user_group_list",TS.templates.user_group_list)
}if(TS.boot_data.feature_private_channels){Handlebars.registerPartial("channel_kb_nav_label",TS.templates.channel_kb_nav_label)
}if(TS.boot_data.feature_custom_fields){Handlebars.registerPartial("admin_edit_team_profile_option_row",TS.templates.admin_edit_team_profile_option_row)
}},makeUnreadMessagesDomId:function(b){return TS.utility.makeSafeForDomId("activity_unread_messages_"+b.id)
},makeRxnKeyDomId:function(b){return TS.utility.makeSafeForDomId("rxns_key_"+b)
},makeUnreadGroupMessagesDomId:function(b){return TS.utility.makeSafeForDomId("activity_unread_group_messages_"+b.id)
},makeUnreadDmsDomId:function(b){return TS.utility.makeSafeForDomId("activity_unread_dms_"+b.id)
},makeSentMessagesDomId:function(b){return TS.utility.makeSafeForDomId("activity_sent_messages_"+b.id)
},makeSentGroupMessagesDomId:function(b){return TS.utility.makeSafeForDomId("activity_sent_group_messages_"+b.id)
},makeIssueListDomId:function(b){return"issue_list_"+b
},makeSentDmsDomId:function(b){return TS.utility.makeSafeForDomId("activity_sent_dms_"+b.id)
},makeMsgDomId:function(b){return TS.utility.makeSafeForDomId("msg_"+b)
},makeMsgLabelDomId:function(b){return TS.utility.makeSafeForDomId("msg_"+b+"_label")
},makeMsgAttachmentTextExpanderDomId:function(c,b){return TS.utility.makeSafeForDomId("msg_rest_text_expander_"+c+"_"+b)
},makeMSRDomId:function(b){return TS.utility.makeSafeForDomId("MSR_"+b.channel.id+"_"+b.ts)
},makeSHRoomClass:function(b){return TS.utility.makeSafeForDomId("screenhero_room_"+b)
},makeChannelDomId:function(b){return"channel_"+b.id
},makeDayDividerDomId:function(b){return TS.utility.makeSafeForDomId("day_divider_"+b)
},makeGroupDomId:function(b){return"group_"+b.id
},makeMemberDomId:function(b){if(!b){return
}return TS.templates.makeMemberDomIdById(b.id)
},makeMemberDomIdById:function(b){if(!b){return
}return"member_"+b
},makeMpimDomId:function(b){return"mpim_"+b.id
},makeChannelListDomId:function(b){return"channel_"+b.id+"_member_list"
},makeFileDomId:function(b){return"file_"+b.id
},makeFileCommentsDomId:function(b){return"file_comments_"+b.id
},makeFileContentsDomId:function(b){return"file_contents_"+b.id
},makeUnreadJustDomId:function(b){return"unread_just_"+b.id
},makeUnreadHighlightDomId:function(b){if(!b){return
}return"unread_highlight_"+b.id
},makeMemberPresenceDomClass:function(b){return"member_presence_"+b
},makeMemberPresenceIcon:function(e){var d=TS.templates.makeMemberPresenceDomClass(e.id);
var b='<i class="ts_icon ts_icon_presence presence_icon"></i>';
if(e.is_ultra_restricted){d+=" ura";
b='<i class="ts_icon ts_icon_presence_ura presence_icon"></i>'
}else{if(e.is_restricted){d+=" ra";
b='<i class="ts_icon ts_icon_presence_ra presence_icon"></i>'
}}var c='<span class="presence '+e.presence+" "+d+'" title="'+e.presence+'">'+b+"</span>";
return c
},makeMemberStatusDomClass:function(b){return"member_status_"+b
},memberUserColorChanged:function(e){var b="color_"+e.id;
if(e.color==e.member_color){var d="color_rule_"+b;
var c=$("#"+d);
c.remove();
return
}TS.templates.makeUserColorRule(e)
},makeUserColorRule:function(g){var b="color_"+g.id;
var d="#"+TS.utility.htmlEntities(g.member_color);
var f;
if(TS.client){f="				."+b+":not(.nuc), 				#col_channels ul li:not(.active):not(.away) > ."+b+":not(.nuc), 				#col_channels:not(.show_presence) ul li > ."+b+":not(.nuc) {					color:"+d+";				}				"
}else{f="			."+b+":not(.nuc) {				color:"+d+";			}			"
}var e="color_rule_"+b;
var c=$("#"+e);
if(c.length){c.text(f)
}else{$('<style type="text/css" id="'+e+'">'+f+"</style>").appendTo("body")
}},sidebarBehaviorPrefChanged:function(){TS.templates.makeSidebarBehaviorRule()
},makeSidebarBehaviorRule:function(){var d;
var c="sidebar_behavior";
var b=$("#"+c);
if(TS.model.prefs.sidebar_behavior=="hide_read_channels"){d="				.channels_list_holder ul li:not(.unread):not(.active):not(.show_in_list_even_though_no_unreads) {					display: none;			}"
}else{if(TS.model.prefs.sidebar_behavior=="hide_read_channels_unless_starred"){d="				.channels_list_holder div:not(#starred_div)>ul li:not(.unread):not(.active):not(.show_in_list_even_though_no_unreads) {					display: none;			}"
}else{if(TS.model.prefs.sidebar_behavior=="shrink_left_column"){d="				.real_names .im_name {					font-size: 0.7rem;				}				.channels_list_holder ul li a {					height: auto;				}				.channels_list_holder ul li {					height: auto;					font-size: .7rem;				}				.channels_list_holder ul li {					height: auto;					line-height: .8rem;				}				.channels_list_holder .section_holder {					margin: .3rem 0 .4rem;				}				.slackbot_icon, .channels_list_holder ul li.group i.prefix {					font-size: 0.4rem;					margin-top: 4px;				}				.channels_list_holder .unread_highlight {					background: none repeat scroll 0 0 #eb4d5c;					font-size: 0.5rem;					font-weight: 700;					line-height: 10px;					padding: 0 9px;				}				#im-list .presence i.presence_icon, #starred-list .presence i.presence_icon {					font-size: 7px;				}				.channels_list_holder h2, .list_more {					font-size: .6rem;			}"
}}}if(d){if(b.length){b.text(d)
}else{$('<style type="text/css" id="'+c+'">'+d+"</style>").appendTo("head")
}}else{$("#"+c).remove()
}}});
var a=function(){var e,c,d,b;
$(".member_image").each(function(){b=$(this);
e=b.data("member-id");
c=b.data("thumb-size");
d=!(b.is("a"));
if(e&&c){$(this).replaceWith(TS.templates.builders.makeMemberPreviewLinkImage(e,c,false,d))
}});
b=null
}
})();
(function(){TS.registerModule("templates.builders",{onStart:function(){},debug_items:{},debug_items_index:0,fileHTML:function(e,c){var h;
c=c||{};
if(TS.boot_data.feature_email_integration){h=a(e)
}else{h=TS.members.getMemberById(e.user)
}var g=TS.files.getFileActions(e);
var d;
var f={member:h,file:e,for_search:c.for_search,for_files_list:TS.boot_data.feature_files_list&&!c.for_render_files&&!c.for_share_dialog,icon_class:TS.utility.getImageIconClass(e,"thumb_80"),is_email:e.mode=="email",is_space:e.mode=="space",is_post:e.mode=="post",is_snippet:e.mode=="snippet",is_hosted_or_external:e.mode=="hosted"||e.mode=="external",can_share:!!g.share};
if(e.mode=="external"){f.external_filetype_html=TS.templates.builders.makeExternalFiletypeHTML(e)
}if(e.mode=="email"){f.to_more_count=e.to.length-1;
f.cc_more_count=e.cc.length-1
}d=TS.templates.file_list_item(f);
return d
},buildMsgHTML:function(O,h){if(h){TS.dir(0,O)
}try{var i=true;
var M=O.msg;
if(false&&M.text){M=TS.utility.clone(M);
M.text+=" <slack-action://BSLACKBOT/help/files/D026MK7NF|testing>"
}var Q=O.model_ob;
var E=O.prev_msg;
var V=!!O.highlight;
var t=!!O.no_attachments;
var K=!!O.standalone;
var z=!!O.full_date;
if(TS.model.prefs.fuller_timestamps&&!z){z=!TS.utility.date.sameDay(TS.utility.date.toDateObject(M.ts),new Date())
}var C=O.jump_link;
var j=!!O.starred_items_list;
var G=O.starred_items_actions;
var u=O.rxn_options||{};
var p=(O.container_id)?"#"+O.container_id:"";
var v=!!O.enable_slack_action_links;
var D=O.theme;
if(!D){D=TS.model.prefs.theme
}var B="";
var R;
if(TS.boot_data.feature_email_integration){R=b(M)
}else{R=TS.members.getMemberById(M.user)
}var r=true;
var e=!K;
var Y=false;
var F=false;
var S=TS.utility.date.toDateObject(M.ts);
var l=false;
var P=false;
var g=!!(M.rsp_id);
var s=false;
var L=M.user;
var n=M.is_ephemeral;
if(!L&&i){L=TS.templates.builders.getBotIdentifier(M)
}var X=TS.utility.msgs.shouldHaveBotLabel(M,R);
var x;
if(E){x=(E.subtype=="file_comment"&&E.comment)?E.comment.user:E.user;
if(!x&&i){x=TS.templates.builders.getBotIdentifier(E)
}}if(!M.no_display&&!K){if(E){var H=TS.utility.date.toDateObject(E.ts);
if(Q.last_read<=E.ts){F=true
}if(M.subtype&&M.subtype=="file_comment"&&M.comment){L=M.comment.user
}if(TS.utility.msgs.automated_subtypes.indexOf(M.subtype)!=-1){e=true;
r=true
}else{if(x==L&&TS.utility.msgs.automated_subtypes.indexOf(E.subtype)===-1){if(!M.subtype&&E.subtype&&E.subtype=="file_comment"){e=true;
r=true
}else{if(D=="light"&&M.subtype=="file_share"||M.subtype=="file_mention"){e=true
}else{e=false
}if(!E.subtype||(TS.templates.builders.getBotIdentifier(E)&&i)){r=false
}if(TS.utility.msgs.isTempMsg(M)&&(M.type=="bot_message"||M.user=="USLACKBOT")){r=true
}}}}if(!g&&!TS.utility.date.sameDay(S,H)){if(!$(p+' div.day_divider[data-date="'+TS.utility.date.toCalendarDate(M.ts)+'"]').length){try{B+=TS.templates.messages_day_divider({ts:M.ts})
}catch(U){if(!U.message){U.message=""
}U.message+=" msg.ts:"+(M?M.ts:"no msg?");
TS.logError(U,"Problem with TS.templates.messages_day_divider 1.1")
}}l=true;
var y=$(p+" div.day_divider");
if(y.length>0){var w;
var d=$(y[y.length-1]);
if(d.length){w="";
try{w=TS.templates.messages_day_divider({ts:d.data("ts")})
}catch(U){if(!U.message){U.message=""
}U.message+=" $last_divider.data('ts'):"+d.data("ts");
TS.logError(U,"Problem with TS.templates.messages_day_divider 2.1")
}d.replaceWith(w)
}if(y.length>1){var T=$(y[y.length-2]);
if(T.length){w="";
try{w=TS.templates.messages_day_divider({ts:T.data("ts")})
}catch(U){if(!U.message){U.message=""
}U.message+=" $second_last_divider.data('ts'):"+T.data("ts");
TS.logError(U,"Problem with TS.templates.messages_day_divider 3.1")
}T.replaceWith(w)
}}}}if(!g&&TS.utility.date.distanceInMinutes(S,H)>TS.model.msg_activity_interval){P=true;
Q.last_time_divider=S
}}else{if(!$(p+' div.day_divider[data-date="'+TS.utility.date.toCalendarDate(M.ts)+'"]').length){try{B+=TS.templates.messages_day_divider({ts:M.ts})
}catch(U){if(!U.message){U.message=""
}U.message+=" msg.ts:"+(M?M.ts:"no msg?");
TS.logError(U,"Problem with TS.templates.messages_day_divider 4.1")
}}P=true;
Q.last_time_divider=S
}}if(P){r=true;
Y=true
}if(M.type!="message"){r=true
}if(M.subtype=="bot_message"){if(TS.templates.builders.getBotIdentifier(M)){if(!i){r=true
}}else{r=false
}}if(M.subtype=="me_message"||(E&&E.subtype=="me_message")){r=true;
e=true
}var W=true;
if(K){W=false
}var I=TS.utility.msgs.getMsgActions(M);
var c=false;
if(I.edit_msg||I.delete_msg||I.pin_msg||I.unpin_msg||I.add_rxn||I.add_file_rxn||I.add_file_comment_rxn){c=true
}var k=TS.utility.msgs.isMessageUserHidden(M);
var J=false;
if(k){if(x==L){return""
}J=true
}var A=false;
if(TS.boot_data.feature_new_message_markup){var N=TS.rxns.getExistingRxnsByKey(M._rxn_key);
if(N){A=true
}}var f=false;
if(TS.boot_data.feature_new_message_markup){f=true;
if(K){f=false
}}var q={msg:M,actions:I,show_actions_cog:c,member:R,show_user:r,hide_user_name:s,show_divider:e,first_in_block:Y,unread:F,unprocessed:g,highlight:V,model_ob:Q,do_inline_imgs:W,msg_dom_id:TS.templates.makeMsgDomId(M.ts),standalone:K,full_date:z,jump_link:C,show_resend_controls:M.ts in TS.model.display_unsent_msgs,starred_items_list:j,starred_items_actions:G,rxn_options:u,theme:D,no_attachments:t,is_ephemeral:n,enable_slack_action_links:v,minimal_view:J,is_bot:X,show_star:!j&&!n,has_rxns:A,selectable:f};
if(!TS.utility.msgs.isTempMsg(M)){q.permalink=TS.utility.msgs.constructMsgPermalink(Q,M.ts)
}if(M.subtype=="file_share"||M.subtype=="file_mention"){if(!M.file){}else{q.file=M.file;
q.lightbox=false;
if(M.file.thumb_360_w==360||M.file.thumb_360_h==360){q.lightbox=true
}q.show_retina_thumb=false;
if(TS.model.is_retina&&M.file.thumb_720){q.show_retina_thumb=true
}if(TS.boot_data.feature_fix_files){$.extend(q,TS.files.getFileTemplateArguments(M.file,360));
q.is_message=true;
q.image_lazyload=!!TS.client;
q.lightbox=true;
if(M.subtype=="file_share"&&M.upload){if(M.file.mode=="email"){q.is_added=true
}q.icon_class=TS.utility.getImageIconClass(M.file,"thumb_80")
}else{if(M.file.user!=M.user){q.uploader=a(M.file)
}}if(M.subtype=="file_mention"){q.share_verb="Mentioned"
}else{if(M.subtype=="file_share"&&M.upload){q.share_verb="Uploaded";
if(/(snippet)/.test(M.file.mode)){q.share_verb="Added"
}if(M.file.initial_comment){q.share_verb+=" and commented on";
q.show_initial_comment=true
}}else{q.share_verb="Shared"
}}if(TS.model.prefs.theme==="dense"||TS.boot_data.feature_new_message_markup){q.share_verb=q.share_verb.toLowerCase()
}q.share_determiner="a";
q.share_noun="file";
if(/(snippet)/.test(M.file.mode)){q.share_noun=M.file.pretty_type+" snippet"
}if(/(email)/.test(M.file.mode)){q.share_determiner="an";
q.share_noun="email"
}if(/(post|space)/.test(M.file.mode)){q.share_noun="Post"
}if((M.file.thumb_360||M.file.thumb_360_gif)&&!(M.file.external_type==="gdrive"&&M.file.mimetype.indexOf("image/")<0)){q.share_determiner="an";
q.share_noun="image"
}if(TS.boot_data.feature_new_message_markup){B+=TS.templates.message(q)
}else{B+=TS.templates.message_file(q)
}}else{q.is_mention=(M.subtype=="file_mention");
if(M.subtype=="file_share"&&M.upload){q.show_initial_comment=true;
if(M.file.mode=="snippet"){B+=TS.templates.message_file_snippet_create_old(q)
}else{if(M.file.mode=="email"){q.is_added=true;
B+=TS.templates.message_file_email_share_old(q)
}else{q.icon_class=TS.utility.getImageIconClass(M.file,"thumb_80");
try{B+=TS.templates.message_file_upload_old(q)
}catch(U){var Z=M.ts;
try{var o=TS.utility.clone(M);
delete o.text;
Z+=" "+JSON.stringify(o,null,"\t")
}catch(m){}if(!U.message){U.message=""
}U.message+=" "+Z;
TS.logError(U,"Problem with TS.templates.message_file_upload");
B+='<p class="small_top_margin small_bottom_margin"><code>Error rendering file_share msg</code></p>'
}}}}else{if(M.file.user!=M.user){q.uploader=a(M.file)
}if(M.file.mode=="snippet"){B+=TS.templates.message_file_snippet_share_old(q)
}else{if(M.file.mode=="post"){B+=TS.templates.message_file_post_share_old(q)
}else{if(M.file.mode=="space"){B+=TS.templates.message_file_space_share_old(q)
}else{if(M.file.mode=="email"){B+=TS.templates.message_file_email_share_old(q)
}else{q.icon_class=TS.utility.getImageIconClass(M.file,"thumb_40");
if(M.file.is_external){q.external_filetype_html=TS.templates.builders.makeExternalFiletypeHTML(M.file)
}B+=TS.templates.message_file_share_old(q)
}}}}}}}}else{if(M.subtype=="file_comment"){if(E&&!E.no_display&&E.file&&M.file&&M.file.id==E.file.id){q.show_divider=false;
if(!l){q.is_file_convo_continuation=true
}}q.show_comment_quote_icon=true;
if(E&&!E.no_display&&E.file&&M.file&&M.file.id==E.file.id){if(E.subtype=="file_share"&&E.upload&&E.file.initial_comment){if(!l){q.show_comment_quote_icon=false
}}if(E.subtype=="file_comment"){if(!l){q.show_comment_quote_icon=false
}}}q.file=M.file;
q.icon_class=TS.utility.getImageIconClass(M.file,"thumb_40");
q.comment=M.comment;
q.member=b(M);
if(M.file&&M.file.user!=M.comment.user){q.uploader=a(M.file)
}if(TS.boot_data.feature_new_message_markup){B+=TS.templates.message(q)
}else{if(M.file&&M.file.mode=="post"){B+=TS.templates.message_file_post_comment(q)
}else{B+=TS.templates.message_file_comment(q)
}}}else{B+=TS.templates.message(q)
}}B=B.replace(/\ue000/g,"").replace(/\ue001/g,"");
return B
}catch(U){var Z="";
if(M){Z="msg.ts:"+M.ts;
delete O.model_ob;
try{O.msg=TS.utility.clone(M);
O.msg.text="REDACTED";
Z+=" "+JSON.stringify(O,null,"  ")
}catch(m){}}if(!U.message){U.message=""
}U.message+=" "+Z;
TS.logError(U,"Problem in buildMsgHTML with_args");
return""
}},formatSoundUrl:function(d,c){return""
},buildAttachmentHTML:function(d){var m=TS.templates.makeMsgDomId(d.msg.ts);
var s=d.attachment;
var z=TS.shared.getActiveModelOb();
if(TS.templates.builders.shouldDoSimpleAttachment(s,d.msg)){if(s.video_html){return TS.templates.builders.buildInlineVideoTogglerAndDiv(s.from_url,m)
}else{if(s.image_url){return TS.templates.builders.buildInlineImgTogglerAndDiv(s.from_url,m,d)
}else{if(s.audio_url){return" "+TS.templates.builders.formatSoundUrl(s,d.msg)
}}}}var C=true;
var o="";
var n="";
if(d.show_initial_caret||d.show_media_caret){if(s.video_html){var c=TS.model.inline_videos[s.from_url||s.thumb_url];
if(c){var B=true;
o=TS.templates.builders.buildInlineVideoToggler(s.from_url||s.thumb_url,m,B);
n=s.thumb_url;
C=TS.inline_videos.shouldExpand(m,c)
}}else{if(s.audio_html||s.audio_url){var l=TS.model.inline_audios[s.audio_html||s.audio_url];
if(l){o=TS.templates.builders.buildInlineAudioToggler(s.audio_html||s.audio_url,m);
n=s.audio_html||s.audio_url;
C=TS.inline_audios.shouldExpand(m,l)
}}else{if(s.other_html){var u=TS.model.inline_others[s.other_html];
if(u){o=TS.templates.builders.buildInlineOtherToggler(s.other_html,m);
n=s.other_html;
C=TS.inline_others.shouldExpand(m,u)
}}else{if(s.image_url){var r=TS.model.inline_imgs[s.from_url||s.image_url];
if(r){var x=!d.show_media_caret;
o=TS.templates.builders.buildInlineImgToggler(s.from_url||s.image_url,m,x);
n=s.image_url;
C=TS.inline_imgs.shouldExpand(m,r)
}}else{var A=TS.model.inline_attachments[s.from_url];
if(A){n=s.from_url;
o=TS.templates.builders.buildInlineAttachmentToggler(s.from_url,m);
C=TS.inline_attachments.shouldExpand(m,A)
}else{TS.warn("no inline_attachment for "+s.from_url)
}}}}}}if(s.color){if(typeof s.color=="number"){s.color=s.color.toString()
}if(!s.color.indexOf){TS.warn("msg "+d.msg.ts+" has an invalid (non string) color:"+s.color+" (removed in client)");
delete s.color
}else{if(s.color.indexOf("#")!=-1){TS.warn("msg "+d.msg.ts+" has an invalid color:"+s.color+" (fixed in client)")
}s.color=s.color.replace(/\#/g,"")
}}var p=[];
var t=[];
if(s.fields){var E;
var y;
var q;
for(var D=0;
D<s.fields.length;
D++){y=true;
E=s.fields[D];
if(q&&E["short"]&&q["short"]&&q._new_row){y=false
}E._new_row=y;
q=E;
if(E["short"]){p.push(E)
}else{t.push(E)
}}}var h=s._short_text&&!TS.inline_attachments.shouldExpandText(TS.templates.makeMsgAttachmentTextExpanderDomId(d.msg.ts,s._index));
var g=!!s.more;
var v=s.from_url||s.ts_link||s.title_link||s.author_link;
var k=s.thumb_link||v;
var j=false;
if(!z){TS.warn("need to get model_ob passed in here somehow! for expanding messages in activity feed")
}else{if(d.can_delete!==false){j=(s.id||s.id===0)&&(s.from_url||d.msg.text)&&((TS.model.user.is_admin&&!z.is_im)||TS.model.user.id==d.msg.user)&&(d.msg.subtype!=="pinned_item")
}}var w=s.thumb_url&&!s.image_url&&!s.video_html&&!s.audio_html;
var e=(w)?s.proxied_thumb_url||s.thumb_url:null;
return TS.templates.message_attachment({is_text_collapsed:h,has_more:g,attachment:s,short_fields:p,long_fields:t,url:d.url,msg:d.msg,initial_caret_html:(d.show_initial_caret)?o:"",media_caret_html:(d.show_media_caret)?o:"",msg_dom_id:m,expand_it:(d.show_initial_caret)?C:true,expand_media:(d.show_media_caret)?C:true,real_src:n,bg_color:s.color||"e3e4e6",is_standalone:(!d.msg.text||d.msg.ignore_if_attachments_supported)||!s.pretext,show_fields_table:TS.qs_args.show_fields_table!="0",thumb_at_top:!window.attach_thumb_align_title,can_delete:j,ts_link:v,thumb_link:k,small_thumb:w,small_thumb_url:e,max_width_class:w?"right_thumb_max_w":"",show_fallback:TS.model.show_attachment_fallback,enable_slack_action_links:d.enable_slack_action_links===true,show_action_links:d.enable_slack_action_links===true})
},shouldDoSimpleAttachment:function(e,d){var c=false;
if((e.image_url||e.audio_url)&&e.from_url){if(d&&d.text){if(d.text.indexOf(e.from_url)!=-1){c=true
}if(TS.model.ampersands_are_inconsistent_in_from_urls){if(d.text.indexOf(e.from_url.replace(/\&/g,"&amp;"))!=-1){c=true
}}}if(e.service_name||e.title){c=false
}}return c
},formatAttachments:function(h,d){d=(d===true);
var c=TS.shared.getActiveModelOb();
var f="";
if(!h.attachments){return f
}var g;
for(var e=0;
e<h.attachments.length;
e++){g=h.attachments[e];
if(!g){TS.info("formatAttachments bad attach");
TS.dir(0,h);
continue
}if(g.from_url&&(TS.boot_data.feature_attachments_inline||TS.templates.builders.shouldDoSimpleAttachment(g,h))){f+="";
continue
}if(g.ts){g.ts_link=TS.utility.msgs.constructMsgPermalink(c,g.ts.toString())
}if(!TS.inline_attachments.shouldShow(g,h)){f+="";
continue
}f+=TS.templates.builders.buildAttachmentHTML({attachment:g,url:null,msg:h,show_initial_caret:TS.templates.builders.shouldDoSimpleAttachment(g,h),show_media_caret:g.video_html||g.image_url||g.audio_html||g.audio_url||g.other_html,enable_slack_action_links:d})
}return f
},buildJoinLeaveRollUpStr:function(c){var d="";
if(c.is_in){if(c.joined&&c.left){d="left and rejoined"
}else{d="joined"
}}else{if(c.joined&&c.left){d="joined and left"
}else{d="left"
}}return d
},buildSHRoomAttachment:function(f){if(!TS.utility.screenhero){return"<div>The screenhero feature flag is not turned on in this env.</div>"
}var e=f.channels&&(f.channels[0]===TS.model.active_c_id);
var c=f.participants.map(function(g){return TS.members.getMemberById(g)
});
var d=TS.model.active_im_id&&TS.members.getMemberById(TS.ims.getImById(TS.model.active_im_id).user);
return TS.templates.message_screenhero_attachment({room:f,participant_objects:c,share_url_prefix:TS.utility.screenhero.share_url_prefix,did_room_start_in_channel:e,dm_member_name:d&&(d.profile.real_name||d.name),expand_it:TS.inline_room_previews.shouldExpand(f.id),currently_in_call:f.participants.indexOf(TS.model.user.id)>=0,duration:f.date_end-f.date_start,is_creator:f.created_by===TS.model.user.id})
},formatMessageByType:function(h,g,r,n){var j="";
var l;
if(h.ignore_if_attachments_supported){return j
}g=(g===true);
r=(r===true);
var x,i,s,t;
if(h._jl_rollup_hash&&h.user in h._jl_rollup_hash.users){x=n;
s=TS.members.getMemberById(h.inviter);
var d=h._jl_rollup_hash.users[h.user];
var o=TS.templates.builders.buildJoinLeaveRollUpStr(d);
o+=(x?" #"+x.name:" the channel");
if(d.is_in&&s){o+=" by invitation from <@"+s.id+"|"+s.name+">"
}var v=[];
var w=[];
var u="along with";
var p;
for(var q in h._jl_rollup_hash.users){if(q==h.user){continue
}p=h._jl_rollup_hash.users[q];
if(p.is_in===d.is_in){if(p.is_in){if(p.inviter==h.user){u="and invited"
}if(p.inviter&&(p.inviter==d.inviter||p.inviter==h.user)){v.push("<@"+q+">")
}else{w.push("<@"+q+"> "+TS.templates.builders.buildJoinLeaveRollUpStr(p))
}}else{v.push("<@"+q+">")
}}else{w.push("<@"+q+"> "+TS.templates.builders.buildJoinLeaveRollUpStr(p))
}}if(v.length){o+=", "+u+" "+v.join(", ")
}if(w.length){o+=". Also, "+w.join(", ")+"."
}j=TS.format.formatWithOptions(o,null,{no_highlights:true,no_specials:true})
}else{if(h.subtype=="channel_join"){x=n;
s=TS.members.getMemberById(h.inviter);
if(s){l="joined"+(x?" #"+x.name:" the channel")+" from an invitation by <@"+s.id+"|"+s.name+">";
j=TS.format.formatWithOptions(l,h,{no_highlights:true,no_specials:true})
}else{j="joined"+(x?" #"+x.name:" the channel")
}}else{if(h.subtype=="channel_leave"){x=n;
j="left"+(x?" #"+x.name:" the channel")
}else{if(h.subtype=="channel_name"){j='renamed the channel from "'+h.old_name+'" to "'+h.name+'"'
}else{if(h.subtype=="channel_topic"){if(!h.topic){j="cleared the channel topic"
}else{j='set the channel topic: <span class="topic">'+TS.format.formatWithOptions(h.topic,h,{no_highlights:true,no_specials:true})+"</span>"
}}else{if(h.subtype=="channel_purpose"){if(!h.purpose){j="cleared the channel purpose"
}else{j='set the channel purpose: <span class="purpose">'+TS.format.formatWithOptions(h.purpose,h,{no_highlights:true,no_specials:true})+"</span>"
}}else{if(h.subtype=="group_join"){i=n;
s=TS.members.getMemberById(h.inviter);
if(s){l="from an invitation by <@"+s.id+"|"+s.name+">";
j="joined"+(i?" "+TS.model.group_prefix+i.name:" the "+TS.templates.builders.groupCopy())+" "+TS.format.formatWithOptions(l,h,{no_highlights:true,no_specials:true})
}else{j="joined"+(i?" "+TS.model.group_prefix+i.name:" the "+TS.templates.builders.groupCopy())
}}else{if(h.subtype=="group_leave"){i=n;
j="left"+(i?" "+TS.model.group_prefix+i.name:" the "+TS.templates.builders.groupCopy())
}else{if(h.subtype=="group_name"){j="renamed the "+TS.templates.builders.groupCopy()+' from "'+h.old_name+'" to "'+h.name+'"'
}else{if(h.subtype=="group_topic"){if(!h.topic){j="cleared the "+TS.templates.builders.groupCopy({skip_private:true})+" topic"
}else{j="set the "+TS.templates.builders.groupCopy({skip_private:true})+" topic: "+TS.format.formatWithOptions(h.topic,h,{no_highlights:true,no_specials:true})
}}else{if(h.subtype=="group_purpose"){if(!h.purpose){j="cleared the "+TS.templates.builders.groupCopy({skip_private:true})+" purpose"
}else{j="set the "+TS.templates.builders.groupCopy({skip_private:true})+" purpose: "+TS.format.formatWithOptions(h.purpose,h,{no_highlights:true,no_specials:true})
}}else{if(h.subtype=="group_archive"){i=n;
j="archived"+(i?" "+TS.model.group_prefix+i.name:" the "+TS.templates.builders.groupCopy());
if(TS.client&&i&&i.is_archived){if(TS.model.archive_view_is_showing){j+='. The contents will still be available in search and browsable in the <a target="_blank" href="/archives/'+i.name+'?force-browser=1">archives</a>.'
}else{var c=TS.boot_data.feature_private_channels?"TS.shared.closeArchivedChannel":"TS.groups.closeGroup";
j+='. The contents will still be available in search and browsable in the <a target="_blank" href="/archives/'+i.name+'?force-browser=1">archives</a>. 						It can also be un-archived at any time. To close it now, <a onclick="'+c+"('"+i.id+"')\">click here</a>."
}}}else{if(h.subtype=="group_unarchive"){i=n;
j="un-archived"+(i?" "+TS.model.group_prefix+i.name:" the "+TS.templates.builders.groupCopy())
}else{if(h.subtype=="channel_archive"){x=n;
j="archived"+(x?" #"+x.name:" the channel");
if(TS.client&&x&&x.is_archived){if(TS.model.archive_view_is_showing){j+='. The contents will still be available in search and browsable in the <a target="_blank" href="/archives/'+x.name+'?force-browser=1">archives</a>.'
}else{j+='. The contents will still be available in search and browsable in the <a target="_blank" href="/archives/'+x.name+'?force-browser=1">archives</a>. 						It can also be un-archived at any time. To close it now, <a onclick="TS.channels.closeArchivedChannel(\''+x.id+"')\">click here</a>."
}}}else{if(h.subtype=="channel_unarchive"){x=n;
j="un-archived"+(x?" #"+x.name:" the channel")
}else{if(h.subtype=="me_message"){j="<i>"+TS.format.formatWithOptions(h.text,h,{do_inline_imgs:g})+"</i>"
}else{if(h.subtype=="play_sound"){j='played "'+h.sound+'"'
}else{if(h.subtype=="sh_room_shared"||h.subtype=="sh_room_created"){if(h.subtype=="sh_room_shared"){}else{}if(h._room_id&&(t=TS.rooms.getRoomById(h._room_id))){j+=TS.templates.builders.buildSHRoomAttachment(t)
}else{}}else{if(h.subtype==="bot_add"||h.subtype==="bot_enable"||h.subtype==="bot_updated"||h.subtype==="bot_disable"||h.subtype==="bot_remove"){j=TS.format.formatWithOptions(h.text,h,{do_inline_imgs:g,enable_slack_action_links:r,no_highlights:true})
}else{if(h.subtype==="pinned_item"&&!h.no_display){if(h.item_type==="F"){var m;
if(TS.boot_data.feature_email_integration){m=a(h.item)
}else{m=!!h.item?TS.members.getMemberById(h.item.user):null
}j=TS.templates.message_pinned_file({file:h.item,own_file:!!h.item&&h.item.user===h.user,theme:TS.model.prefs.theme,uploader:m,model_ob:n,display_name:TS.members.getMemberDisplayName(m)})
}else{if(h.item_type==="Fc"){j=TS.templates.message_pinned_comment({theme:TS.model.prefs.theme,model_ob:n});
var f;
if(h.item){f=TS.members.getMemberById(h.item.user)
}if(f&&h.item.comment){j+=TS.templates.builders.buildAttachmentHTML({attachment:{author_icon:f.profile.image_24,author_name:f.profile.real_name,author_subname:f.name,color:"D0D0D0",ts:h.item.timestamp,text:h.item.comment,mrkdwn_in_hash:{text:true}},msg:h})
}}else{if(h.item_type==="C"||h.item_type==="G"){j=TS.templates.message_pinned_message({theme:TS.model.prefs.theme,model_ob:n});
var e;
if(h.item){e=TS.members.getMemberById(h.item.user)
}if(e&&h.item.text){j+=TS.templates.builders.buildAttachmentHTML({attachment:{author_icon:e.profile.image_24,author_name:e.profile.real_name,author_subname:e.name,color:"D0D0D0",ts:h.item.ts,text:h.item.text,mrkdwn_in_hash:{text:true}},msg:h})
}}}}}else{j=TS.format.formatWithOptions(h.text,h,{do_inline_imgs:g,enable_slack_action_links:r})
}}}}}}}}}}}}}}}}}}}}if(!j&&j!==""){TS.warn("no html msg.subtype:"+h.subtype);
return""
}j=TS.utility.msgs.handleSearchHighlights(j);
return j
},msgHtmlForSearch:function(g,c,f,d){if(g.subtype!=="bot_message"){g.subtype=null
}var e="";
if(f==="extract"){e+='<div class="search_result_with_extract">';
e+='<div class="extract_expand_icons"><i class="ts_icon ts_icon_chevron_up up_arrow"></i><i class="ts_icon ts_icon_chevron_down down_arrow"></i></div>'
}else{if(f==="context"){e+='<div class="search_result_for_context">'
}else{e+='<div class="search_result_for_extra_context">'
}}e+=TS.templates.builders.buildMsgHTML({msg:g,model_ob:c,container_id:"search_message_results",standalone:true});
e+="</div>";
return e
},buildMsgHTMLForSearch:function(h){var e=h.channel;
var f="";
var g=[];
if(h.previous_2){g.push(h.previous_2)
}if(h.previous){g.push(h.previous)
}g.push(h);
if(h.next){g.push(h.next)
}if(h.next_2){g.push(h.next_2)
}if(h.next_2&&!h.next_2.user&&h.next_2.subtype==="file_comment"){var c=/^<@(U\w+)|/.exec(h.next_2.text);
if(c&&c.length===2){var d=c[1];
var i=TS.members.getMemberById(d);
if(i){h.next_2.user=i.id;
h.next_2.username=i.name
}}}if(g.length>1&&!TS.search.view.resultHasExtracts(h)){h.force_extract_type="extract";
if(h.previous){h.previous.force_extract_type="context"
}if(h.next){h.next.force_extract_type="context"
}}g.forEach(function(l,k){var j;
if(l.force_extract_type){j=l.force_extract_type
}else{j=TS.search.view.determineMessageResultType(g,k)
}f+=TS.templates.builders.msgHtmlForSearch(l,e,j,h.extracts_expanded)
});
return f
},search_ellipsis:'<span class="extract_ellipsis">&hellip;</span>',buildStar:function(i,d,h){if(!i){return""
}if(i=="channel"&&d&&typeof d=="string"){d=TS.channels.getChannelById(d)
}else{if(i=="group"&&d&&typeof d=="string"){d=TS.groups.getGroupById(d)
}else{if(i=="im"&&d&&typeof d=="string"){d=TS.ims.getImById(d)
}else{if(i=="mpim"&&d&&typeof d=="string"){d=TS.mpims.getMpimById(d)
}}}}if(!d){return""
}if(i=="message"&&h&&typeof h=="string"){var k=h;
h=TS.channels.getChannelById(k);
if(!h){h=TS.ims.getImById(k)
}if(!h){h=TS.groups.getGroupById(k)
}}var l={};
var f="";
var e=[];
var j=[];
if(TS.boot_data.feature_new_message_markup){j=["star","ts_icon","ts_icon_star_o","ts_icon_inherit"]
}else{j=["star","ts_icon","ts_icon_star","ts_icon_inherit"]
}var c=d.id||d.ts;
var g=(h)?h.id:null;
if(i=="message"){if(!g){return""
}l["data-msg-id"]=c;
l["data-c-id"]=g;
if(TS.utility.msgs.isTempMsg(d)){j.push("hidden")
}}else{if(i=="file"){l["data-file-id"]=c
}else{if(i=="file_comment"){l["data-comment-id"]=c;
l["data-file-id"]=g;
j.push("star_comment")
}else{if(i=="channel"){l["data-channel-id"]=c
}else{if(i=="group"){l["data-group-id"]=c
}else{if(i=="im"){l["data-im-id"]=c
}else{if(i=="mpim"){l["data-mpim-id"]=c
}else{TS.error("buildStar needs to handle star item type:"+i);
return""
}}}}}}}if(d.is_starred){j.push("starred");
if(TS.boot_data.feature_new_message_markup){j.push("ts_icon_star");
j.splice(j.indexOf("ts_icon_star_o"),1)
}}j.push("star_"+i);
$.each(l,function(m,n){e.push(m+'="'+n+'"')
});
f="<span "+e.join(" ")+' class="'+j.join(" ")+'"></span>';
return f
},buildMentionHTML:function(n){var g=n.message;
var l="";
if(!g){return l
}if(g.subtype=="file_share"||g.subtype=="file_mention"||g.subtype=="file_comment"){if(!g.file){return l
}}var o=TS.shared.getModelObById(n.channel);
if(!o){return l
}var j=true;
if(o.is_channel){if(!o.is_member){j=false
}}var r;
var u;
var k;
var p=4;
var m=[];
var c;
var i;
var s="";
var d="";
var f="";
if(TS.boot_data.feature_archive_viewer||(j&&!!TS.utility.msgs.getMsg(g.ts,o.msgs))){d=TS.templates.builders.strBuilder('<a class="msg_right_link msg_jump" data-cid="${cid}">Jump</a>',{cid:o.id})
}else{d=TS.templates.builders.strBuilder('<a class="msg_right_link" href="${permalink}" target="${permalink}">Archives</a>',{permalink:TS.utility.msgs.constructMsgPermalink(o,g.ts)})
}f=TS.templates.builders.buildMsgHTML({rxn_options:u,msg:g,model_ob:o,standalone:true,jump_link:d,no_attachments:!!g.text,theme:"light"});
l=f;
if(n.type=="rxn"){r=TS.rxns.getRxnRecordByKey(g._rxn_key);
k=TS.rxns.getExistingRxnsByKey(g._rxn_key);
if(!k||!r){return""
}for(var v in r.emoji){r.emoji[v].forEach(function(w){if(!c||w.when>c.when){c=w;
i=v
}})
}if(!TS.rxns.getRxnFromRxns(k,i)){return""
}var t=TS.rxns.getAllUniqueRxners(k,c.id);
var h=t.length+1;
if(h==2){var q=TS.members.getMemberById(t[0]);
s=" & "+TS.templates.builders.makeMemberPreviewLink(q)
}else{if(h>2){s=" & "+(h-1)+" others"
}}k.forEach(function(x,w){if(w<p){m.push(TS.emoji.graphicReplace(":"+x.name+":",true,false,true))
}});
var e=TS.members.getMemberById(c.id);
l=TS.templates.mentions_rxn({ts:g.ts,rxns_to_display:m,msg_html:f,rxn_members:TS.templates.builders.makeMemberPreviewLink(e,true)+s,jump_link:d,jump_link_html:d})
}return l
},buildMentions:function(){TS.mentions.weaveInRxnRecords();
var c="";
var d=null;
var e=TS.model.user;
if(!e.mentions||!e.mentions.length){return c
}$.each(e.mentions,function(j,g){var l=TS.templates.builders.buildMentionHTML(g);
if(!l){return
}var k="";
var f=TS.shared.getModelObById(g.channel);
var o=g.message;
var m=!d;
if(d&&!TS.utility.date.sameDay(TS.utility.date.toDateObject(d.rxn_ts||d.message.ts),TS.utility.date.toDateObject(g.rxn_ts||o.ts))){m=true
}if(m){if(d){k="</div>"
}k+='<div class="mention_day_container_div">'+TS.templates.messages_day_divider({ts:(g.rxn_ts||o.ts)})
}else{k+='<hr class="spacer">'
}var n=d&&d.channel;
if(f.is_channel){if(n!=f.id||m){k+='<hr class="spacer">';
k+='<h3 class="small_bottom_margin"><a href="/archives/'+f.name+'" target="/archives/'+f.name+'" class="channel_link" data-channel-id="'+f.id+'"><span class="normal">#</span>'+f.name+"</a></h3>"
}}else{if(f.is_group){if(n!=f.id||m){k+='<hr class="spacer">';
k+='<h3 class="small_bottom_margin"><a href="/archives/'+f.name+'" target="/archives/'+f.name+'" class="group_link" data-group-id="'+f.id+'">'+f.name+"</a></h3>"
}}else{}}c+=k+l;
d=g
});
if(c){c+="</div>"
}return c
},buildStarredItemHTML:function(g){var f="<div class='star_item'>";
var j={star:g,current_user_id:TS.model.user.id};
var c;
if(g.type=="message"){var d=g.message;
var e=!!TS.client;
c=TS.shared.getModelObById(g.channel);
if(!c){TS.warn("channel "+g.channel+" for this starred message was probably deleted");
return""
}if(c.is_channel&&!c.is_member){e=false
}if(c.is_im){var i=TS.members.getMemberById(c.user);
g.message["recipient"]=i
}var k="";
if(TS.boot_data.feature_archive_viewer||(e&&!!TS.utility.msgs.getMsg(d.ts,c.msgs))){if(TS.boot_data.feature_files_list){k='<a class="star_jump msg_right_link btn btn_outline" data-cid="'+c.id+'">Jump</a>'
}else{k='<a class="star_jump msg_right_link" data-cid="'+c.id+'">Jump</a>'
}}else{var l=TS.utility.msgs.constructMsgPermalink(c,d.ts);
if(TS.boot_data.feature_files_list){k='<a class="msg_right_link btn btn_outline" href="'+l+'" target="'+l+'">Archives</a>'
}else{k='<a class="msg_right_link" href="'+l+'" target="'+l+'">Archives</a>'
}}var h=d.subtype;
if(h==="file_share"||h==="file_mention"||h==="file_comment"){f+=TS.templates.builders.buildStar("message",d,c)
}f+=TS.templates.builders.buildMsgHTML({msg:d,model_ob:c,standalone:true,starred_items_list:true,starred_items_actions:TS.boot_data.feature_files_list,jump_link:k,no_attachments:!!d.text,full_date:true,theme:"light"})
}else{if(g.type=="file"){if(!TS.boot_data.feature_files_list){f+=TS.templates.builders.buildStar("file",g.file)
}f+=TS.templates.builders.fileHTML(g.file)
}else{if(g.type=="channel"||g.type=="group"){c=TS.channels.getChannelById(g.channel);
if(!c){c=TS.groups.getGroupById(g.channel)
}if(!c){TS.warn("channel or group "+g.channel+" was probably deleted");
return""
}j.model_ob=c;
f+=TS.templates.star_item(j)
}else{j.from_starred_item=TS.boot_data.feature_files_list;
f+=TS.templates.star_item(j)
}}}f+="</div>";
return f
},buildInlineImgTogglerAndDiv:function(d,e,c){var f=TS.model.inline_imgs[d];
if(!f){return""
}return TS.templates.builders.buildInlineImgToggler(d,e)+" "+TS.templates.builders.buildInlineImgDiv(d,e,undefined,c)
},buildInlineImgToggler:function(l,g,j){var m=TS.model.inline_imgs[l];
if(!m){console.warn("buildInlineImgToggler did not find anything in TS.model.inline_imgs for key:"+l);
return""
}var d=TS.inline_imgs.shouldExpand(g,m);
var e=m.link_url||l;
var i=m.bytes&&m.bytes>TS.model.inline_img_byte_limit;
var f=m.width&&m.height&&(m.width*m.height)>TS.model.inline_img_pixel_limit;
var k=!f;
var c="";
if(!d&&(!TS.model.prefs.obey_inline_img_limit||i)||f){var h=!m.internal_file_id&&TS.model.prefs.expand_inline_imgs&&TS.model.expandable_state["img_"+g+m.src]!==false;
if(h&&f){k=false;
c='<span class="too_large_for_auto_expand"> (Not automatically expanded because '+m.width+"x"+m.height+" is too large to display inline.)</span>"
}else{if(h&&i){c='<span class="too_large_for_auto_expand"> (Not automatically expanded because '+TS.utility.convertFilesize(m.bytes)+' is too large. You can <a class="cursor_pointer too_large_but_expand_anyway" data-real-src="'+TS.utility.htmlEntities(m.src)+'">expand it anyway</a> or <a '+TS.utility.makeRefererSafeLink(e)+' target="_blank" title="Open original in new tab">open it in a new window</a>.';
if(TS.model.show_inline_img_size_pref_reminder&&!TS.model.shown_inline_img_size_pref_reminder_once){c+=" You can also <a class=\"cursor_pointer\" onclick=\"TS.ui.prefs_dialog.start('media', '#dont_obey_inline_img_limit_p')\">change your preferences</a> to allow images of any file size to auto expand.)";
TS.model.shown_inline_img_size_pref_reminder_once=true
}c+="</span>"
}}}var n=(m.bytes&&j!==true)?'<span class="inline_img_bytes '+(c?"hidden":"")+'"> ('+TS.utility.convertFilesize(m.bytes)+")</span>":"";
return n+c+(k?'<i data-real-src="'+TS.utility.htmlEntities(m.src)+'" class="msg_inline_img_collapser ts_icon ts_icon_caret_down '+(d?"":"hidden")+'"></i><i data-real-src="'+TS.utility.htmlEntities(m.src)+'" class="msg_inline_img_expander ts_icon ts_icon_caret_right '+(d?"hidden":"")+'"></i>':"")
},buildInlineImgDiv:function(B,r,A,c){var j=TS.model.inline_imgs[B];
if(!j){return""
}var p=A===true||TS.inline_imgs.shouldExpand(r,j);
var n=j.link_url||B;
var z=(j.width>0&&j.height>0&&TS.utility.cssCalcSupported());
var x;
if(j.internal_file_id){x=TS.files.getFileById(j.internal_file_id)
}var s=!!TS.client;
var l="";
var m="clear_both msg_inline_img_holder msg_inline_holder";
if(!p){m+=" hidden"
}var i=(j.height<50);
var d=(j.width<200);
var k=(d||i);
if(TS.boot_data.feature_fix_files){if(k){m+=" overflow_preview_actions";
if(d){m+=" overflow_preview_actions_width"
}}if(x){m+=" file_container"
}m+=" msg_inline_holder_rounded"
}if(!z){m+=" file_container_fixed_dimensions"
}l+='<div data-real-src="'+TS.utility.htmlEntities(j.src)+'" class="'+m+'" ';
if(j.internal_file_id){l+='data-file-id="'+j.internal_file_id+'" '
}if(z){l+='style="width:'+j.width+'px;" '
}l+=">";
var g="ctrl";
if(TS.model.is_mac){g="cmd"
}var q=(c&&c.hasOwnProperty("maybe_show_lightbox"))?c.maybe_show_lightbox:true;
var y;
if(j.internal_file_id){if(x&&x.mimetype.indexOf("image/")===0){if(x.external_type=="dropbox"||x.external_type=="gdrive"||x.external_type=="box"||x.external_type=="onedrive"){if(TS.boot_data.feature_fix_files){y=q
}var o=x.thumb_720?x.thumb_720:x.thumb_360;
l+="<a "+TS.utility.makeRefererSafeLink(n)+' target="_blank" title="cmd+click to open original in new tab" class="lightbox_external_link" data-src="'+TS.utility.htmlEntities(o)+'"data-link-url="'+n+'">'
}else{if(TS.boot_data.feature_fix_files){y=q
}else{y=q&&(x.thumb_360_w==360||x.thumb_360_h==360)
}if(y){if(TS.boot_data.feature_fix_files){l+='<a href="'+n+'" target="_blank" class="lightbox_channel_link lightbox_link" data-file-id="'+j.internal_file_id+'">'
}else{l+='<a href="'+n+'" target="_blank" title="Open in lightbox ('+g+'+click to open original in new tab)" class="lightbox_channel_link lightbox_link" data-file-id="'+j.internal_file_id+'">'
}}else{l+='<a href="'+n+'" target="_blank" title="'+g+'+click to open original in new tab" class="file_preview_link thumbnail_link" data-file-id="'+j.internal_file_id+'">'
}}}else{l+="<a "+TS.utility.makeRefererSafeLink(n)+' target="_blank" class="'+x.filetype+'">'
}}else{var h="";
var w="";
if(q){h="lightbox_external_link";
if(!TS.boot_data.feature_fix_files){w="Open in lightbox ("+g+"+click to open original in new tab)"
}}else{w="Click to open original in new tab"
}l+="<a "+TS.utility.makeRefererSafeLink(n)+' target="_blank" title="'+w+'" class="'+h+'" data-src="'+TS.utility.htmlEntities(j.src)+'" data-link-url="'+j.link_url+'"';
if(j.width){l+=' data-width="'+j.width+'"'
}if(j.height){l+=' data-height="'+j.height+'"'
}l+=">"
}if(z){l=l.replace("<a ",'<a style="width:'+j.width+'px;" ')
}l+='<div class="msg_inline_img_container">';
l+='<div class="file_preview_preserve_aspect_ratio" ';
if(z){if(!x||!k){var u="calc("+(j.height)+" / "+(j.width)+" * 100% )";
l+='style="padding-top: -moz-'+u+"; padding-top: -webkit-"+u+"; padding-top: "+u+';" '
}else{l+='style="padding-top: '+(j.height)+'px;" '
}}l+=">";
var f=TS.utility.htmlEntities(j.proxied_src||j.src);
var e=(s)?"msg_inline_img msg_inline_child hidden":"msg_inline_img msg_inline_child";
var v=(s)?'data-real-background-image="'+f+'"':'style="background-image:url('+f+');"';
var t=(s)?'data-real-src="'+f+'"':'src="'+f+'"';
l+='<figure class="'+e+'" '+v+">";
l+="<img "+t+" />";
l+="</figure>";
l+="</div>";
l+="</div>";
l+="</a>";
if(x&&TS.boot_data.feature_fix_files){l+=TS.templates.message_file_preview_actions({file:x,download:x.mode==="hosted",new_window:true})
}l+="</div>";
return l
},buildInlineEmailDiv:function(e,f){var d=TS.files.getFileById(e);
if(!d){return""
}var g={file:d,is_message:true,to_more_count:d.to.length-1,cc_more_count:d.cc.length-1,msg_dom_id:f};
var c=TS.templates.file_email(g);
return c
},buildInlineAttachmentToggler:function(d,f){var c=TS.model.inline_attachments[d];
if(!c){return""
}var e=TS.inline_attachments.shouldExpand(f,c);
return' <i data-real-src="'+TS.utility.htmlEntities(c.from_url)+'" class="msg_inline_attachment_collapser ts_icon ts_icon_caret_down '+(e?"":"hidden")+'"></i><i data-real-src="'+TS.utility.htmlEntities(c.from_url)+'" class="msg_inline_attachment_expander ts_icon ts_icon_caret_right '+(e?"hidden":"")+'"></i>'
},buildInlineFilePreviewToggler:function(e,f,c){var d=TS.inline_file_previews.shouldExpand(f,e);
var g=c.hash.hide_title_when_expanded;
return' <i class="msg_inline_file_preview_collapser ts_icon ts_icon_caret_down'+(d?"":" hidden")+(g?" title_hidden":"")+'" data-file-id="'+e+'"></i><i class="msg_inline_file_preview_expander ts_icon ts_icon_caret_right'+(d?" hidden":"")+'" data-file-id="'+e+'"></i>'
},buildInlineRoomPreviewToggler:function(d){var c=TS.inline_room_previews.shouldExpand(d);
var e=true;
return' <i class="msg_inline_room_preview_collapser ts_icon ts_icon_caret_down'+(c?"":" hidden")+(e?" title_hidden":"")+'"></i><i class="msg_inline_room_preview_expander ts_icon ts_icon_caret_right'+(c?" hidden":"")+'"></i>'
},makeMemberImage:function(d,k,e,j){var f=TS.members.getMemberById(d);
if(!f||!f.profile){return""
}e=(e===true);
j=(j===true);
var h,c;
switch(k){case 16:h=f.profile.image_24;
c="thumb_16";
break;
case 20:h=f.profile.image_24;
c="thumb_20";
break;
case 24:h=f.profile.image_24;
c="thumb_24";
break;
case 32:h=f.profile.image_32;
c="thumb_32";
break;
case 36:h=f.profile.image_48;
c="thumb_36";
break;
case 48:h=f.profile.image_48;
c="thumb_48";
break;
case 72:h=f.profile.image_72;
c="thumb_72";
break;
case 192:h=f.profile.image_192;
c="thumb_192";
break;
default:h=f.profile.image_48;
c="thumb_48";
break
}var i=(j)?'title="'+TS.members.getMemberDisplayName(f,true)+'"':"";
var g;
if(e){g='<img data-original="'+h+'" class="lazy member_image '+c+' member_preview_image" data-member-id="'+f.id+'" '+i+" />"
}else{g='<img src="'+h+'" class="member_image '+c+' member_preview_image" data-member-id="'+f.id+'" '+i+" />"
}return g
},buildInlineAudioToggler:function(d,f){var c=TS.model.inline_audios[d];
if(!c){return""
}var e=TS.inline_audios.shouldExpand(f,c);
return' <i data-real-src="'+TS.utility.htmlEntities(c.src)+'" class="msg_inline_audio_collapser ts_icon ts_icon_caret_down '+(e?"":"hidden")+'"></i><i data-real-src="'+TS.utility.htmlEntities(c.src)+'" class="msg_inline_audio_expander ts_icon ts_icon_caret_right '+(e?"hidden":"")+'"></i>'
},buildInlineAudioDiv:function(d,h,f,g){var c=TS.model.inline_audios[d];
if(!c){return""
}var e=g===true||TS.inline_audios.shouldExpand(h,c);
return'<div data-real-src="'+TS.utility.htmlEntities(c.src)+'" class="clear_both msg_inline_audio_holder msg_inline_holder '+(e?"":"hidden")+'">'+f+"</div>"
},buildInlineOtherToggler:function(c,e){var f=TS.model.inline_others[c];
if(!f){return""
}var d=TS.inline_others.shouldExpand(e,f);
return' <i data-real-src="'+TS.utility.htmlEntities(f.src)+'" class="msg_inline_other_collapser ts_icon ts_icon_caret_down '+(d?"":"hidden")+'"></i><i data-real-src="'+TS.utility.htmlEntities(f.src)+'" class="msg_inline_other_expander ts_icon ts_icon_caret_right '+(d?"hidden":"")+'"></i>'
},buildInlineOtherDiv:function(c,g,e,f){var h=TS.model.inline_others[c];
if(!h){return""
}var d=f===true||TS.inline_others.shouldExpand(g,h);
return'<div data-real-src="'+TS.utility.htmlEntities(h.src)+'" class="clear_both msg_inline_other_holder msg_inline_holder '+(d?"":"hidden")+'">'+e+"</div>"
},buildInlineVideoTogglerAndDiv:function(d,e){var c=TS.model.inline_videos[d];
if(!c){return""
}return TS.templates.builders.buildInlineVideoToggler(d,e)+" "+TS.templates.builders.buildInlineVideoDiv(d,e)
},buildInlineVideoToggler:function(e,g,c){var d=TS.model.inline_videos[e];
if(!d){return""
}var f=TS.inline_videos.shouldExpand(g,d);
return" "+(c===true?"":d.title)+' <i data-real-src="'+TS.utility.htmlEntities(d.src)+'" class="msg_inline_video_collapser ts_icon ts_icon_caret_down '+(f?"":"hidden")+'"></i><i data-real-src="'+TS.utility.htmlEntities(d.src)+'" class="msg_inline_video_expander ts_icon ts_icon_caret_right '+(f?"hidden":"")+'"></i>'
},buildInlineVideoDiv:function(l,i,e){var g=TS.model.inline_videos[l];
if(!g){return""
}var f=e===true||TS.inline_videos.shouldExpand(i,g);
var h=g.link_url||l;
var d=!!TS.client;
var n=true;
var j=n?251:137;
var c=n?119:113;
var m=parseInt((g.display_w-j)/2)+"px";
var k=parseInt((g.display_h-c)/2)+"px";
return'<div data-real-src="'+TS.utility.htmlEntities(g.src)+'" class="clear_both msg_inline_video_holder msg_inline_holder '+(f?"":"hidden")+'" style="width:'+g.display_w+"px; height:"+(g.display_h+2)+'px; max-width: 100%;"><div class="msg_inline_video_iframe_div hidden" data-url="'+TS.utility.htmlEntities(l)+'"></div><div class="msg_inline_video_thumb_div"><div class="msg_inline_video_buttons_div" style="top:'+k+";left:"+m+'">'+(n?'<a class="msg_inline_video_play_button" style="margin-right: 60px;" title="Play video in Slack"><i class="ts_icon ts_icon_play ts_icon_inherit" style="font-size: 3.4rem;"></i></a>':"")+'<a class="msg_inline_video_new_window_button" '+TS.utility.makeRefererSafeLink(h)+' target="_blank" title="Open video in new tab"><i class="ts_icon ts_icon_external_link ts_icon_inherit"></i></a></div><img class="msg_inline_video msg_inline_child '+(d?"hidden":"")+'" '+(d?"data-real-src":"src")+'="'+TS.utility.htmlEntities(g.proxied_src||g.src)+'" style="width:'+g.display_w+"px; height:"+g.display_h+'px"></div></div>'
},buildComments:function(e){var f=e.comments;
var d="";
for(var c=0;
c<f.length;
c++){d+=TS.templates.comment({comment:f[c],file:e,show_comment_actions:true})
}return d
},buildCommentStandalone:function(e,d){var c;
if(TS.boot_data.feature_email_integration){c=a(d)
}return TS.templates.comment_standalone({comment:e,file:d,entity:c,current_user_id:TS.model.user.id})
},buildTeamListHTML:function(p){var f;
var u=[];
var j=[];
var h=[];
var e=[];
var d=[];
var n=[];
p.sort(function(w,i){var y=w._real_name_lc||w._name_lc;
var x=i._real_name_lc||i._name_lc;
return(y>x)?1:((x>y)?-1:0)
});
for(var s=0;
s<p.length;
s++){f=p[s];
if(f.deleted){if(f.is_bot){h.push(f)
}else{j.push(f)
}}else{if(f.is_ultra_restricted){n.push(f)
}else{if(f.is_restricted){d.push(f)
}else{if(f.is_bot||f.is_slackbot){e.push(f)
}else{u.push(f)
}}}}}var t=false;
if(e.length||h.length){t=true
}var l=false;
if(d.length||n.length){l=true
}var o=false;
var g=false;
var q;
if(TS.boot_data.feature_subteams){q=TS.model.user_groups.filter(function(i){return !i.date_delete
});
o=true;
g=!q.length;
var m=$("#team_tabs");
var c=TS.members.canUserEditUserGroups();
var k=TS.members.canUserCreateAndDeleteUserGroups();
q.sort(function(w,i){var y=w.name.toLowerCase();
var x=i.name.toLowerCase();
return(y>x)?1:((x>y)?-1:0)
});
m.html(TS.templates.user_group_tabs({members:u,show_restricted_members:l,restricted_members:d.concat(n),disabled_members:j,show_user_groups:o,user_groups:q,show_user_groups_edit:c,show_user_groups_add:k}));
TS.members.view.bindTeamFilter("#team_filter","#team_list_scroller");
if(o){var r=m.find(".tab_action");
var v=$("#team_block");
m.find("li a").on("click",function(){var i=$(this).data("action");
var w=TS.members.canUserEditUserGroups();
var x=TS.members.canUserCreateAndDeleteUserGroups();
r.addClass("hidden");
if(i==="user_group_edit"){v.addClass("hidden")
}else{v.removeClass("hidden")
}if(i==="user_group_edit"&&!w&&!x){return
}m.find("#"+i).removeClass("hidden")
});
m.find('[data-action="admin_user_groups_modal_new"]').on("click",function(i){i.preventDefault();
TS.ui.admin_user_groups.add()
})
}}else{$("#team_tabs").html(TS.templates.team_tabs({members:u,show_restricted_members:l,restricted_members:d.concat(n),disabled_members:j}))
}$("#team_tabs").find('a[data-toggle="tab"]').on("shown",function(i){if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#team_list_members"))
}if(TS.web&&TS.web.members&&TS.web.members.lazyload){TS.web.members.lazyload.trigger("resize")
}$("#team_list_members").trigger("resize")
});
return TS.templates.team_list({members:u,bots:e,show_bots:t,show_restricted_members:l,restricted_members:d,ultra_restricted_members:n,disabled_members:j,deleted_bots:h,show_user_groups:o,user_groups:q,show_user_groups_help:g})
},buildUserGroupListHTML:function(c,l){var f;
var h=[];
var d=[];
var j=TS.boot_data.feature_subteams_hard_delete;
var e=TS.members.canUserCreateAndDeleteUserGroups();
c.sort(function(m,i){return(m.name>i.name)?1:((i.name>m.name)?-1:0)
});
for(var g=0;
g<c.length;
g++){f=c[g];
if(f.date_delete){d.push(f)
}else{h.push(f)
}}var k=(!l&&!h.length&&!d.length)||(l&&!h.length);
return TS.templates.user_group_list({user_groups:h,disabled_user_groups:d,show_delete:j,show_toggle:e,is_flexpane:l,show_user_groups_help:k})
},makeInternalChannelLink:function(c){if(!c){return"ERROR: MISSING CHANNEL"
}var d=(TS.utility.shouldLinksHaveTargets())?'target="/archives/'+c.name+'"':"";
return'<a href="/archives/'+c.name+'" '+d+' class="internal_channel_link" data-channel-id="'+c.id+'"><span class="normal">#</span>'+c.name+"</a>"
},makeInternalGroupLink:function(d){if(!d){return"ERROR: MISSING GROUP"
}var c=(TS.utility.shouldLinksHaveTargets())?'target="/archives/'+d.name+'"':"";
return'<a href="/archives/'+d.name+'" '+c+'" class="internal_group_link" data-group-id="'+d.id+'">'+TS.model.group_prefix+d.name+"</a>"
},makeChannelLink:function(c){if(!c){return"ERROR: MISSING CHANNEL"
}var d=(TS.utility.shouldLinksHaveTargets())?'target="/archives/'+c.name+'"':"";
return'<a href="/archives/'+c.name+'" '+d+' class="channel_link" data-channel-id="'+c.id+'"><span class="normal">#</span>'+c.name+"</a>"
},makeGroupLink:function(d){if(!d){return"ERROR: MISSING GROUP"
}var c=(TS.utility.shouldLinksHaveTargets())?'target="/archives/'+d.name+'"':"";
return'<a href="/archives/'+d.name+'" '+c+' class="group_link" data-group-id="'+d.id+'">'+TS.model.group_prefix+d.name+"</a>"
},makeMpimLink:function(d,c){if(!d){return"ERROR: MISSING MPIM"
}var e=(TS.utility.shouldLinksHaveTargets())?'target="'+TS.mpims.getMpimArchivesPath(d)+'"':"";
var f=c?'title="'+TS.utility.htmlEntities(TS.mpims.getDisplayName(d))+'"':"";
return'<a href="'+TS.mpims.getMpimArchivesPath(d)+'" '+e+f+' class="mpim_link" data-mpim-id="'+d.id+'">'+TS.utility.htmlEntities(TS.mpims.getDisplayName(d))+"</a>"
},makeMemberPreviewLink:function(h,d){if(!h){return""
}if(d!==true){d=false
}var g=TS.utility.htmlEntities(h.name);
var c="color_"+((h)?h.id+" color_"+h.color:"unknown");
var e;
var f;
if(h.is_service){f=(TS.utility.shouldLinksHaveTargets())?'target="/services/'+h.id+'"':"";
e='<a href="/services/'+h.id+'" '+f+' class="bold service_link '+c+'" data-service-id="'+h.id+'">'
}else{f=(TS.utility.shouldLinksHaveTargets())?'target="/team/'+g+'"':"";
e='<a href="/team/'+g+'" '+f+' class="bold member member_preview_link '+c+'" data-member-id="'+h.id+'">'
}if(d&&h.id==TS.model.user.id){e+="You"
}else{e+=TS.utility.htmlEntities(TS.members.getMemberDisplayName(h,false))
}e+="</a>";
if(h.is_bot||h.is_service){e+='<span class="bot_label">BOT</span>'
}return e
},makeProfileImage:function(g,n){if(!g){return false
}var i=n.hash.is_static||false;
var c=n.hash.is_lazy||false;
var e=g.profile||g.icons;
var k;
if(e.emoji){k="64"
}else{k="48"
}var j=n.hash.size||k;
var m=Object.keys(TS.constants.avatar_size_map).reduce(function(o,p){if(p===j&&l(e,p)){return p
}else{return o
}},k);
var h={entity:g,size:j,css_classes:d(g,j),image:f(g,l(e,m)),is_lazy:c,is_static:i,is_targettable:TS.utility.shouldLinksHaveTargets()};
function f(p,q){var o=[];
if(p.is_restricted||p.is_ultra_restricted){if(TS.model.is_retina){o.push("url('"+cdn_url+"/66f9/img/avatar_overlays_@2x.png')")
}else{o.push("url('"+cdn_url+"/54f6/img/avatar_overlays.png')")
}}o.push("url('"+q+"')");
return o.join(",")
}function l(o,q){var p="image_"+q;
if(o.hasOwnProperty(p)){if(TS.model.is_retina){return o[TS.constants.avatar_size_map[q].retina]||o[TS.constants.avatar_size_map[q].standard]
}else{return o[TS.constants.avatar_size_map[q].standard]
}}else{return false
}}function d(o,q){var p=[];
p.push("thumb_"+q);
if(o.is_bot){p.push("is_bot")
}return p.join(" ")
}return new Handlebars.SafeString(TS.templates.member_profile_image(h))
},makeMemberPreviewLinkImage:function(d,m,e,i){var f=TS.members.getMemberById(d);
if(!f||!f.profile){return""
}e=(e===true);
i=(i===true);
var j,l;
var k,c;
k="background-image: ";
c=[];
switch(m){case 20:if(TS.model.is_retina){j=f.profile.image_48
}else{j=f.profile.image_24
}l="thumb_20";
break;
case 24:if(TS.model.is_retina){j=f.profile.image_48
}else{j=f.profile.image_24
}l="thumb_24";
break;
case 32:if(TS.model.is_retina){j=f.profile.image_72
}else{j=f.profile.image_32
}l="thumb_32";
break;
case 36:if(TS.model.is_retina){j=f.profile.image_72
}else{j=f.profile.image_48
}l="thumb_36";
break;
case 48:if(TS.model.is_retina){j=f.profile.image_72
}else{j=f.profile.image_48
}l="thumb_48";
break;
case 72:if(TS.model.is_retina){j=f.profile.image_192
}else{j=f.profile.image_72
}l="thumb_72";
break;
case 192:j=f.profile.image_192;
l="thumb_192";
break;
default:if(TS.model.is_retina){j=f.profile.image_72
}else{j=f.profile.image_48
}l="thumb_48";
break
}if(f.is_restricted){if(TS.model.is_retina){c.push("url('"+cdn_url+"/66f9/img/avatar_overlays_@2x.png')")
}else{c.push("url('"+cdn_url+"/54f6/img/avatar_overlays.png')")
}}if(f.is_ultra_restricted){l+=" ura"
}else{if(f.is_restricted){l+=" ra"
}else{if(f.is_bot){l+=" bot"
}}}var g;
var h=(TS.utility.shouldLinksHaveTargets())?'target="/team/'+f.name+'"':"";
c.push("url('"+j+"')");
if(e){k=(c.length?c.join(", "):"");
if(i){g='<span class="lazy member_preview_link member_image '+l+'" data-member-id="'+f.id+'" data-thumb-size="'+m+'" data-original="'+k+'" style="background-color: #f6f6f6" aria-hidden="true"></span>'
}else{g='<a href="/team/'+f.name+'" '+h+' class="lazy member_preview_link member_image '+l+'" data-member-id="'+f.id+'" data-thumb-size="'+m+'" data-original="'+k+'" style="background-color: #f6f6f6" aria-hidden="true"></a>'
}}else{k=(c.length?k+c.join(", "):"");
if(i){g='<span class="member_preview_link member_image '+l+'" data-member-id="'+f.id+'" data-thumb-size="'+m+'" style="'+k+'" aria-hidden="true"></span>'
}else{g='<a href="/team/'+f.name+'" '+h+' class="member_preview_link member_image '+l+'" data-member-id="'+f.id+'" data-thumb-size="'+m+'" style="'+k+'" aria-hidden="true"></a>'
}}return g
},newWindowName:function(c){if(TS.boot_data.app=="web"){return"_self"
}return"new_"+TS.session_ms.toString()
},getBotIdentifier:function(d){if(!d.bot_id&&!d.username){return null
}var f=(d.bot_id)?TS.bots.getBotById(d.bot_id):null;
var c=(!d.username&&f&&f.name)?f.name:d.username;
var e=(f)?f.id:"NOBOTID";
return e+"_"+c
},getBotName:function(c){var e=c.username;
if(!e){var d=(c.bot_id)?TS.bots.getBotById(c.bot_id):null;
if(d&&d.name){e=d.name
}}return e
},getBotNameWithLink:function(d){var f=d.username;
var e=(d.bot_id)?TS.bots.getBotById(d.bot_id):null;
var c=TS.templates.builders.makeBotLink(e,d.username);
if(!f){if(e&&e.name){f=e.name
}}return c.start_a+TS.utility.htmlEntities(f)+c.end_a
},makeBotLink:function(i,h){var e=false;
var d="";
var c="";
var f=e?"bot_sender ":"";
var g=e?' data-bot-identifier="'+((i&&!i.deleted)?i.id:h)+'"':" ";
if(i&&!i.deleted){if(TS.boot_data.feature_bot_profile){g+='data-service-id="'+i.id+'"';
f+="service message_sender"
}d="<a"+g+' class="'+f+'" target="/services/'+i.id+'" href="/services/'+i.id+'">';
c="</a>"
}else{if(e){d="<a"+g+">";
c="</a>"
}}return{start_a:d,end_a:c}
},makeFiletypeHTML:function(d){if(d.external_type){return TS.templates.builders.makeExternalFiletypeHTML(d)
}var c="";
c+='<a href="'+d.url_private_download+'" ';
c+='target="'+d.url_private_download+'" ';
c+='title="Download this file" ';
c+='data-file-id="'+d.id+'" ';
c+='class="subtle_silver file_ssb_download_link">';
c+=TS.utility.convertFilesize(d.size)+" ";
c+="<span>"+d.pretty_type+"</span>";
if(d.mode==="snippet"){c+=" snippet"
}c+="</a>";
return c
},makeExternalFiletypeHTML:function(c){if(!c.is_external){return
}var d="";
switch(c.external_type){case"gdrive":switch(c.filetype){case"gsheet":d="Spreadsheet";
break;
case"gdoc":d="Document";
break;
case"gpres":d="Presentation";
break;
case"gdraw":d="Drawing";
break;
default:d=["<span>","</span>"].join(c.pretty_type)
}d+=" from Google Drive";
break;
case"dropbox":d=["<span>","</span> from Dropbox"].join(c.pretty_type);
break;
case"box":d=["<span>","</span> from Box"].join(c.pretty_type);
break;
case"onedrive":d=["<span>","</span> from OneDrive"].join(c.pretty_type);
break;
default:d="File"
}return d
},makeUnshareLink:function(d,c){var e=d.is_channel?("Remove this from #"+d.name):("Remove this from the "+d.name);
return'<a class="unshare_link" onclick="TS.files.promptForFileUnshare(\''+c.id+"', '"+d.id+'\')" data-toggle="tooltip" title="'+e+'"><i class="ts_icon ts_icon_minus_circle_small"></i></a>'
},updateFileShareLabels:function(c){var d=$('.file_share_label[data-file-id="'+c.id+'"]');
d.each(function(){$(this).replaceWith(TS.templates.builders.makeFileShareLabel(c))
});
if(c.is_shared){$('.file_share_shared_label[data-file-id="'+c.id+'"]').removeClass("hidden");
$('.file_share_unshared_label[data-file-id="'+c.id+'"]').addClass("hidden")
}else{$('.file_share_shared_label[data-file-id="'+c.id+'"]').addClass("hidden");
$('.file_share_unshared_label[data-file-id="'+c.id+'"]').removeClass("hidden")
}if(c.is_public){$('.file_share_private_label[data-file-id="'+c.id+'"]').addClass("hidden");
$('.file_share_public_label[data-file-id="'+c.id+'"]').removeClass("hidden")
}else{$('.file_share_private_label[data-file-id="'+c.id+'"]').removeClass("hidden");
$('.file_share_public_label[data-file-id="'+c.id+'"]').addClass("hidden")
}},makeFileShareLabel:function(d){var c='<span class="file_share_label" data-file-id="'+d.id+'">';
var e=TS.templates.builders.makeFileGroupChannelList(d);
if(!e.length){if(!d.is_public&&d.user!==TS.model.user.id){c+="shared with you"
}}else{c+="in "+e
}c+="</span>";
return c
},makeFileGroupChannelList:function(e){var g=[];
var d;
var f,c;
for(c=0;
c<e.channels.length;
c++){f=TS.channels.getChannelById(e.channels[c]);
if(!f){continue
}d='<span class="no_wrap">';
d+=TS.templates.builders.makeChannelLink(f,e);
d+="&nbsp;"+TS.templates.builders.makeUnshareLink(f,e);
d+="</span>";
g.push(d)
}var h;
for(c=0;
c<e.groups.length;
c++){h=TS.groups.getGroupById(e.groups[c]);
if(!h){continue
}d='<span class="no_wrap">';
d+=TS.templates.builders.makeGroupLink(h,e);
d+="&nbsp;"+TS.templates.builders.makeUnshareLink(h,e);
d+="</span>";
g.push(d)
}if(!g.length){return""
}return g.join(", ")
},makeSHRoomParticipantList:function(f){var c=f.date_end?f.participant_history:f.participants;
var g;
var e=[];
if(c){for(var d=0;
d<c.length;
d++){g=TS.members.getMemberById(c[d]);
if(!g){continue
}e.push(g.profile.real_name||g.name)
}}return e.join(", ")
},makeSHRoomSharedList:function(g){if(!g.channels||!g.channels.length){return""
}var f=[];
var e;
var h;
var c;
for(var d=0;
d<g.channels.length;
d++){c=TS.shared.getModelObById(g.channels[d]);
if(!c){continue
}if(c.is_channel){e=TS.templates.builders.makeChannelLink(c)
}else{if(c.is_group){e=TS.templates.builders.makeGroupLink(c)
}else{if(c.is_im){h=TS.members.getMemberById(c.user);
if(!h){continue
}e=TS.templates.builders.makeMemberPreviewLink(h)
}else{continue
}}}f.push(e)
}if(!f.length){return""
}return f.join(", ")
},buildFileSharingControls:function(h,n,l,p,m){var f;
var d;
if(TS.client){d=TS.shared.getActiveModelOb()
}else{if(TS.web&&TS.web.space){d=TS.shared.getModelObById(TS.web.space.getOriginChannel())
}}if(!d||d.is_channel){f="channel"
}else{if(d.is_im){f="im"
}else{if(TS.boot_data.feature_mpim_client&&d.is_mpim){f="mpim"
}else{if(d.is_group){f="group"
}}}}if(d&&d.is_general&&!TS.members.canUserPostInGeneral()){d={}
}var k=[];
var g=[];
var i=[];
if(!TS.boot_data.feature_private_channels){var j=TS.ui.getFileShareSelectOptions(true);
k=j.channels;
g=j.groups;
i=j.members
}if(f=="group"&&(g&&!g.length)){f="channel"
}l=l||"";
$("#file_sharing_div").remove();
var o=false;
if(!h){o=true
}else{if(h.user===TS.model.user.id){o=true
}}var e=TS.model.prefs.display_real_names_override;
var c=((TS.model.team.prefs.display_real_names&&e!=-1)||e==1);
return TS.templates.file_sharing({share_context:f,channels:k,groups:g,members:i,model_ob:d,file:h,is_owner:o,has_title:p,hide_checkbox:n,comment:l,selection:m,show_channel_join_note:d&&d.is_channel&&!d.is_member&&!d.is_archived,display_real_names:c})
},buildNonDefaultNotificationBlock:function(f){f=f||"";
var e="";
var d;
var c=TS.notifs.getCorGsNotUsingGlobalNotificationSetting();
if(c.everything.length){e+='<div class="'+f+'">Set to notify for <b>all activity</b>:';
for(d=0;
d<c.everything.length;
d++){e+=" "+(c.everything[d].id.charAt(0)==="C"?"#":"")+c.everything[d].name+(d!=c.everything.length-1?",":"")
}e+="</div>"
}if(c.mentions.length){e+='<div class="'+f+'">Set to notify only for <b>Highlight Words</b>:';
for(d=0;
d<c.mentions.length;
d++){e+=" "+(c.mentions[d].id.charAt(0)==="C"?"#":"")+c.mentions[d].name+(d!=c.mentions.length-1?",":"")
}e+="</div>"
}if(c.nothing.length){e+='<div class="'+f+'">Set to <b>never notify</b>:';
for(d=0;
d<c.nothing.length;
d++){e+=" "+(c.nothing[d].id.charAt(0)==="C"?"#":"")+c.nothing[d].name+(d!=c.nothing.length-1?",":"")
}e+="</div>"
}return e
},strBuilder:function(d,c){return d.replace(/\${([a-z_]+)}/g,function(f,e){if(e.indexOf("_html")>-1){return c[e]
}return TS.utility.htmlEntities(c[e])
})
},buildRxnTitle:function(d){var c='<span class="subtle_silver"> reacted with :'+TS.utility.htmlEntities(d.name)+":</span>";
if(d.count==1){if(d.user_reacted){return"You (click to remove)"+c
}else{return TS.utility.htmlEntities(TS.members.getMemberDisplayNameById(d.member_ids[0]))+c
}}var g;
var e=d.member_ids.length!=d.count;
var f=d.member_ids.map(function(h){return(TS.model.user.id===h)?"You":TS.members.getMemberDisplayNameById(h)
});
g=e?"others":f.pop();
return TS.utility.htmlEntities(f.join(", ")+" and "+g)+c
},buildRxnHtml:function(d){var c=TS.emoji.graphicReplace(":"+d.name+":");
var e=TS.templates.builders.buildRxnTitle(d);
return TS.templates.rxns_rxn({name:d.name,css_classes:(d.user_reacted?"user_reacted":""),emoji_html:c,title:e,count:d.count})
},updateRxnHtml:function(f,c){var e=f.find('.emoji_rxn.emoji_rxn_real[data-emoji="'+c.name+'"]');
if(e.length){e.find(".emoji_rxn_count").text(c.count);
e.toggleClass("user_reacted",c.user_reacted);
var g=TS.templates.builders.buildRxnTitle(c);
var d;
if(e.hasClass("ts_tip_lazy")){d=e.prop("title");
if(d!=g){e.prop("title",g)
}}else{if(e.hasClass("ts_tip_multiline")){d=e.find(".ts_tip_multiline_inner").text();
if(d!=g){e.find(".ts_tip_multiline_inner").html(g)
}}else{d=e.find(".ts_tip_tip_inner").text();
if(d!=g){e.find(".ts_tip_tip_inner").html(g)
}}}if(c.animate_it_dramatically){setTimeout(c.animate_callback,0)
}else{if(c.animate_it){setTimeout(c.animate_callback,0)
}}}else{f.find(".emoji_rxn_spacer").before($(TS.templates.builders.buildRxnHtml(c)));
e=f.find('.emoji_rxn.emoji_rxn_real[data-emoji="'+c.name+'"]');
if(c.animate_it_dramatically){e.css("opacity",0).transition({opacity:1},300,c.animate_callback)
}else{if(c.animate_it){e.css("opacity",0).transition({opacity:1},300,c.animate_callback)
}}}},updateMsgRxnPanels:function(c,e,d){var f=TS.rxns.getExistingRxnsByKey(c);
var g=$("."+TS.templates.makeRxnKeyDomId(c));
g.each(function(h,k){var j=$(k);
var l;
var n;
if(f){j.toggleClass("no_rxns",false);
if(TS.boot_data.feature_new_message_markup){j.closest(".message_actions_container").toggleClass("has_rxns",true)
}f.forEach(function(i){l=(i.name==e);
n=(l&&d==TS.model.user.id);
TS.templates.builders.updateRxnHtml(j,{animate_it:l,animate_it_dramatically:n,name:i.name,count:i.count,user_reacted:TS.rxns.doesRxnsHaveRxnFromUser(f,i.name),member_ids:i.users})
})
}var m=j.find(".emoji_rxn.emoji_rxn_real");
if(m.length){m.each(function(p,r){var q=$(r);
var o=String(q.data("emoji"));
if(!TS.rxns.doesRxnsHaveRxn(f,o)){q.addClass("going_away");
q.tooltip("destroy");
q.transition({opacity:0},300,function(){q.tooltip("destroy");
q.remove();
if(!f){j.toggleClass("no_rxns",true);
if(TS.boot_data.feature_new_message_markup){j.closest(".message_actions_container").toggleClass("has_rxns",false)
}}})
}})
}else{j.toggleClass("no_rxns",true);
if(TS.boot_data.feature_new_message_markup){j.closest(".message_actions_container").toggleClass("has_rxns",false)
}j.find(".emoji_rxn").tooltip("destroy")
}})
},rxnPanel:function(d,g){if(!d){return
}var h=TS.rxns.getExistingRxnsByKey(d);
var c="";
if(h){h.forEach(function(i){c+=TS.templates.builders.buildRxnHtml({name:i.name,count:i.count,user_reacted:TS.rxns.doesRxnsHaveRxnFromUser(h,i.name),member_ids:i.users})
})
}var e=[TS.templates.makeRxnKeyDomId(d)];
if(!h){e.push("no_rxns")
}var f=e.join(" ");
return TS.templates.rxns_panel({classesA_css:f,rxn_key:d,rxns_html:c})
},filePreviewBackIcon:function(){return'<i class="ts_icon ts_icon_chevron_medium_left back_icon"></i>'
},buildQuickSwitcherBtnHtml:function(){var c=(!TS.model.is_mac&&(TS.model.is_our_app||TS.model.prefs.k_key_omnibox))?'<i class="ts_icon ts_icon_filter"></i><span id="quick_switcher_label" class="quick_switcher_label_windows_alignment">Quick Switcher</span>':'<i class="ts_icon ts_icon_filter"></i><span id="quick_switcher_label">Quick Switcher</span>';
if(TS.model.is_our_app||TS.model.prefs.k_key_omnibox){return[c,'<span id="quick_switcher_shortcut">',(TS.model.is_mac?"&#8984K":"Ctrl+K"),"</span>"].join("")
}return c
},channelsAndGroupsCopy:function(c){var d=c&&!!c.caps;
if(d){return TS.boot_data.feature_private_channels?"Channels":"Channels and Groups"
}else{return TS.boot_data.feature_private_channels?"channels":"channels and groups"
}},channelsAndPrivateGroupsCopy:function(c){var d=c&&!!c.caps;
if(d){return TS.boot_data.feature_private_channels?"Channels":"Channels and Private Groups"
}else{return TS.boot_data.feature_private_channels?"channels":"channels and private groups"
}},channelsOrGroupsCopy:function(c){var d=c&&!!c.caps;
if(d){return TS.boot_data.feature_private_channels?"Channels":"Channels or Groups"
}else{return TS.boot_data.feature_private_channels?"channels":"channels or groups"
}},channelOrGroupCopy:function(c){var d=c&&!!c.caps;
if(d){return TS.boot_data.feature_private_channels?"Channel":"Channel or Group"
}else{return TS.boot_data.feature_private_channels?"channel":"channel or group"
}},channelOrPrivateGroupCopy:function(c){var d=c&&!!c.caps;
if(d){return TS.boot_data.feature_private_channels?"Channel":"Channel or Private Group"
}else{return TS.boot_data.feature_private_channels?"channel":"channel or private group"
}},privateGroupsCopy:function(c){var d=c&&!!c.caps;
if(d){return TS.boot_data.feature_private_channels?"Private Channels":"Private Groups"
}else{return TS.boot_data.feature_private_channels?"private channels":"private groups"
}},privateGroupCopy:function(c){var d=c&&!!c.caps;
if(d){return TS.boot_data.feature_private_channels?"Private Channel":"Private Group"
}else{return TS.boot_data.feature_private_channels?"private channel":"private group"
}},groupCopy:function(e){var f=e&&!!e.caps;
var d=e&&!!e.skip_private;
var c;
if(f){c=TS.boot_data.feature_private_channels?"Channel":"Group"
}else{c=TS.boot_data.feature_private_channels?"channel":"group"
}if(d||!TS.boot_data.feature_private_channels){return c
}if(f){return"Private "+c
}return"private "+c
},channelDmOrGroupCopy:function(){if(TS.boot_data.feature_private_channels){return"channel or DM"
}else{return"channel, DM or group"
}},channelsDmsOrGroupsCopy:function(){if(TS.boot_data.feature_private_channels){return"channels or DMs"
}else{return"channels, DMs or groups"
}},channelsDmsAndPrivateGroupsCopy:function(){if(TS.boot_data.feature_private_channels){return"channels and DMs"
}else{return"channels, DMs and private groups"
}},channelGroupOrDirectMessageCopy:function(){if(TS.boot_data.feature_private_channels){return"channel or direct message"
}else{return"channel, group or direct message"
}}});
function b(c){if(!c){return false
}var d;
if(TS.boot_data.feature_email_integration){if(c.user==="USLACKBOT"&&c.file&&c.file.bot_id){d=a(c.file)
}else{d=(c.comment)?TS.members.getMemberById(c.comment.user):TS.members.getMemberById(c.user)
}}else{d=(c.comment)?TS.members.getMemberById(c.comment.user):TS.members.getMemberById(c.user)
}return d
}function a(c){if(!c){return false
}var d;
if(TS.boot_data.feature_email_integration){if(c.user==="USLACKBOT"&&c.bot_id){d=TS.bots.getBotById(c.bot_id);
d.is_bot=true;
d.is_service=true
}else{d=TS.members.getMemberById(c.user)
}}else{d=TS.members.getMemberById(c.user)
}return d
}})();
(function(){TS.registerModule("templates.helpers",{onStart:function(){TS.templates.helpers.register()
},register:function(){Handlebars.registerHelper("fileUrl",function(g){return TS.boot_data.feature_deprecate_url_download?g.url_private:g.url
});
Handlebars.registerHelper("makeRefererSafeFileLink",function(g){return TS.utility.makeRefererSafeLink(Handlebars.helpers.fileUrl(g))
});
Handlebars.registerHelper("isClient",function(g){if(TS.boot_data.app=="client"){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isChrome",function(g){if(TS.model.is_chrome){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isFF",function(g){if(TS.model.is_FF){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isSafariDesktop",function(g){if(TS.model.is_safari_desktop){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isWeb",function(g){if(TS.boot_data.app=="web"||TS.boot_data.app=="mobile"||TS.boot_data.app=="space"){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isMobileWeb",function(g){if(TS.boot_data.app=="mobile"){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isMac",function(g){if(TS.model.is_mac){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isOurApp",function(g){if(TS.model.is_our_app){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("supportsSpeech",function(g){if(TS.ui.growls.canSpeak()){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isTheme",function(g){var h=g.hash.theme;
if(h==TS.model.prefs.theme){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("showAvatars",function(g){if(TS.model.prefs.avatars){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("feature",function(h){var g=h.hash.flag;
if(TS.qs_args[g]==1||TS.boot_data[g]==1){return h.fn(this)
}return h.inverse(this)
});
Handlebars.registerHelper("comments",TS.templates.builders.buildComments);
Handlebars.registerHelper("comment_standalone",TS.templates.builders.buildCommentStandalone);
Handlebars.registerHelper("star",TS.templates.builders.buildStar);
Handlebars.registerHelper("inlineImgTogglerAndDiv",TS.templates.builders.buildInlineImgTogglerAndDiv);
Handlebars.registerHelper("inlineImgDiv",TS.templates.builders.buildInlineImgDiv);
Handlebars.registerHelper("inlineImgToggler",TS.templates.builders.buildInlineImgToggler);
Handlebars.registerHelper("inlineImgTogglerForFile",function(h,j,g,i){var k=b(h,j,i);
return TS.templates.builders.buildInlineImgToggler(k,g)
});
Handlebars.registerHelper("inlineImgDivForFile",function(h,j,g,i){var k=b(h,j,i);
return TS.templates.builders.buildInlineImgDiv(k,g)
});
Handlebars.registerHelper("inlineEmailDiv",TS.templates.builders.buildInlineEmailDiv);
Handlebars.registerHelper("inlineVideoDiv",TS.templates.builders.buildInlineVideoDiv);
Handlebars.registerHelper("inlineAudioDiv",TS.templates.builders.buildInlineAudioDiv);
Handlebars.registerHelper("inlineOtherDiv",TS.templates.builders.buildInlineOtherDiv);
Handlebars.registerHelper("inlineFilePreviewToggler",TS.templates.builders.buildInlineFilePreviewToggler);
Handlebars.registerHelper("inlineRoomPreviewToggler",TS.templates.builders.buildInlineRoomPreviewToggler);
Handlebars.registerHelper("isInlineFilePreviewExpanded",function(h){var l=h.hash.container_id;
var i=h.hash.file_id;
var k=h.hash.show_retina_thumb;
var j=h.hash.theme;
var g=false;
var m=b(i,k,j);
if(m){g=TS.inline_imgs.shouldExpand(l,TS.model.inline_imgs[m])
}else{g=TS.inline_file_previews.shouldExpand(l,i)
}if(g){return h.fn(this)
}else{return h.inverse(this)
}});
Handlebars.registerHelper("isInlineFilePreviewFullContent",function(g){var i=g.hash.container_id;
var h=g.hash.file_id;
if(TS.inline_file_previews.showingFullContent(i,h)){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("unlessInlineFilePreviewFullContent",function(g){return Handlebars.helpers.isInlineFilePreviewFullContent.call(this,{fn:g.inverse,inverse:g.fn,hash:g.hash})
});
Handlebars.registerHelper("shouldTruncateInlineFilePreview",function(h,g){if(typeof h==="string"){h=TS.files.getFileById(h)
}if(h&&TS.inline_file_previews.shouldTruncate(h)){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("shouldNotTruncateInlineFilePreview",function(h,g){return Handlebars.helpers.shouldTruncateInlineFilePreview.call(this,h,{fn:g.inverse,inverse:g.fn,hash:g.hash})
});
Handlebars.registerHelper("isInlineFilePreviewTruncated",function(i,h,g){if(typeof h==="string"){h=TS.files.getFileById(h)
}if(h&&TS.inline_file_previews.isTruncated(i,h)){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("isInlineFilePreviewNotTruncated",function(i,h,g){return Handlebars.helpers.isInlineFilePreviewTruncated.call(this,i,h,{fn:g.inverse,inverse:g.fn,hash:g.hash})
});
Handlebars.registerHelper("isFileContentHighlightTruncated",function(){var i=Array.prototype.slice.call(arguments);
var h=a(i.pop());
var j=i.shift();
var g=i.shift()||Infinity;
var k=function(l){return(l.length>truncate(l,g).length)
};
if(typeof j==="string"){j=TS.files.getFileById(j)
}if(!j){return h.inverse(this)
}if(j.content_highlight_html){if(k(j.content_highlight_html)){return h.fn(this)
}}else{if(j.preview_highlight&&k(j.preview_highlight)){return h.fn(this)
}}return h.inverse(this)
});
Handlebars.registerHelper("ifFileHasThumbnail",function(g){var h=g.hash.file;
if(TS.files.useLargerThumbnail(h)){if(h&&(h.thumb_480||h.thumb_480_gif)&&(TS.model.inline_imgs[h.thumb_480]||TS.model.inline_imgs[h.thumb_480_gif])){return g.fn(this)
}}if(h&&(h.thumb_360||h.thumb_360_gif)&&(TS.model.inline_imgs[h.thumb_360]||TS.model.inline_imgs[h.thumb_360_gif])){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("formatActionLink",function(i,k,g){if(!i){return""
}var j="<"+i.url+"|"+i.title+">";
var h=TS.format.formatWithOptions(j,k,{no_highlights:true,no_specials:true,enable_slack_action_links:g===true});
return h
});
Handlebars.registerHelper("formatSoundUrl",TS.templates.builders.formatSoundUrl);
Handlebars.registerHelper("ellipsize",function(h,g){TS.info("len"+g);
return TS.utility.ellipsize(h,g)
});
Handlebars.registerHelper("stripWhitespace",function(g){return g.replace(/\s+/g,"")
});
Handlebars.registerHelper("pluralize",function(i,h,g){i=parseInt(i);
if(i===1){return h
}else{return(typeof g==="string"?g:h+"s")
}});
Handlebars.registerHelper("pluralCount",function(i,h,g){return i+" "+Handlebars.helpers.pluralize.apply(this,arguments)
});
Handlebars.registerHelper("possessive",function(g){if(g.substr(-1,g.length)=="s"){return"'"
}else{return"'s"
}});
Handlebars.registerHelper("possessiveForMember",function(h){var g=TS.members.getMemberDisplayName(h);
if(g.substr(-1,g.length)=="s"){return"'"
}else{return"'s"
}});
Handlebars.registerHelper("concatStr",function(){return Array.prototype.slice.call(arguments,0,arguments.length-1).join("")
});
Handlebars.registerHelper("json",function(g){if(typeof g==="object"&&g!==null&&g.name==="json"){return JSON.stringify(this)
}else{return JSON.stringify(g)
}});
Handlebars.registerHelper("currentTeamName",function(){return TS.model.team.name||""
});
Handlebars.registerHelper("canUserAtEveryone",function(g){return TS.members.canUserAtEveryone()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("canUserAtChannelOrAtGroup",function(g){return TS.members.canUserAtChannelOrAtGroup()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("canUserCreateChannels",function(g){return TS.members.canUserCreateChannels()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("canUserArchiveChannels",function(g){return TS.members.canUserArchiveChannels()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("canUserCreateGroups",function(g){return TS.members.canUserCreateGroups()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("canUserPostInGeneral",function(g){return TS.members.canUserPostInGeneral()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("canUserKickFromChannels",function(g){return TS.members.canUserKickFromChannels()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("canUserKickFromGroups",function(g){return TS.members.canUserKickFromGroups()?g.fn(this):g.inverse(this)
});
Handlebars.registerHelper("numberWithMax",function(h,g){if(h>=g){return(g-1)+"+"
}else{return h
}});
Handlebars.registerHelper("convertFilesize",function(g){return TS.utility.convertFilesize(g)
});
Handlebars.registerHelper("toDate",function(g){return TS.utility.date.toDate(g)
});
Handlebars.registerHelper("toCalendarDate",function(g){return TS.utility.date.toCalendarDate(g)
});
Handlebars.registerHelper("toCalendarDateWords",function(g){return TS.utility.date.toCalendarDateWords(g)
});
Handlebars.registerHelper("toCalendarDateShort",function(g){return TS.utility.date.toCalendarDate(g,true)
});
Handlebars.registerHelper("toCalendarDateOrNamedDay",function(g){return TS.utility.date.toCalendarDateOrNamedDay(g)
});
Handlebars.registerHelper("toCalendarDateOrNamedDayWords",function(g){return TS.utility.date.toCalendarDateOrNamedDayWords(g)
});
Handlebars.registerHelper("toCalendarDateIfYesterdayOrToday",function(g){return TS.utility.date.toCalendarDateIfYesterdayOrToday(g)
});
Handlebars.registerHelper("toCalendarDateOrNamedDayShort",function(g){return TS.utility.date.toCalendarDateOrNamedDayShort(g)
});
Handlebars.registerHelper("toTime",function(h,g,i){return TS.utility.date.toTime(h,g!==false,i===true)
});
Handlebars.registerHelper("toTimeWords",function(h,g,i){return TS.utility.date.toTimeWords(h,g!==false,i===true)
});
Handlebars.registerHelper("toTimeAgo",function(g){return TS.utility.date.toTimeAgo(g)
});
Handlebars.registerHelper("toTimeDuration",function(g){return TS.utility.date.toTimeDuration(g)
});
Handlebars.registerHelper("msgTsTitle",function(h){var g=(TS.utility.date.toCalendarDateOrNamedDayShort(h.ts)+" at "+TS.utility.date.toTime(h.ts,true,true)).replace(/\s/g,"&nbsp;");
if(TS.client&&!TS.utility.msgs.isTempMsg(h)){g+="&#013;Click to open in archives"
}return g
});
Handlebars.registerHelper("toHour",function(g){return TS.utility.date.toHour(g)
});
Handlebars.registerHelper("timezoneLabel",function(h,g){return TS.utility.date.timezoneLabel(h,g)
});
Handlebars.registerHelper("memberLocalTime",function(g){return TS.utility.date.memberLocalTime(g)
});
Handlebars.registerHelper("memberUTCOffset",function(g){return TS.utility.date.memberUTCOffset(g)
});
Handlebars.registerHelper("isInDifferentTimeZone",function(h,g){if(h.tz_offset!==TS.model.user.tz_offset){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("isToday",function(h,g){if(TS.utility.date.isToday(TS.utility.date.toDateObject(h))){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("if_equal",function(h,g){g=a(g);
if(h==g.hash.compare){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("if_not_equal",function(h,g){g=a(g);
if(h!=g.hash.compare){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("if_gt",function(h,g){if(h>g.hash.compare){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("or",function(h,g,i){i=a(i);
if(h||g){return i.fn(this)
}else{return i.inverse(this)
}});
Handlebars.registerHelper("and",function(h,g,i){i=a(i);
if(h&&g){return i.fn(this)
}else{return i.inverse(this)
}});
Handlebars.registerHelper("foreach",function(g,h){if(h.inverse&&!g.length){return h.inverse(this)
}return g.map(function(j,i){var k={index:i,value:j,length:g.length};
k.first=i===0;
k.last=i===g.length-1;
return h.fn(k)
}).join("")
});
Handlebars.registerHelper("repeat",function(k,j){var g="";
for(var h=0;
h<k;
h++){g+=j.fn(h)
}return g
});
Handlebars.registerHelper("makeDayDividerDomId",function(g){return TS.templates.makeDayDividerDomId(g)
});
Handlebars.registerHelper("formatFileTitle",function(g){if(!g||!g.title){return""
}return TS.format.formatWithOptions(g.title,null,{no_highlights:false,no_specials:true})
});
Handlebars.registerHelper("formatMessageByType",TS.templates.builders.formatMessageByType);
Handlebars.registerHelper("formatAttachments",TS.templates.builders.formatAttachments);
Handlebars.registerHelper("formatMessage",function(h,g){return TS.format.formatDefault(h,g)
});
Handlebars.registerHelper("formatMessageSimple",function(h,g){return TS.format.formatWithOptions(h,g,{no_highlights:true,no_specials:true})
});
Handlebars.registerHelper("formatMessageAttachmentPart",function(l,k,g,i,h){var j=TS.format.formatWithOptions(l,k,{no_highlights:(g!==true),no_specials:(i!==true),enable_slack_action_links:(h===true)});
j=TS.utility.msgs.handleSearchHighlights(j);
return j
});
Handlebars.registerHelper("formatTopicOrPurpose",function(g){return TS.utility.formatTopicOrPurpose(g)
});
Handlebars.registerHelper("unFormatMessage",function(h,g){return TS.format.unFormatMsg(h,g)
});
Handlebars.registerHelper("formatMessageResult",function(g){g=TS.format.formatJustText(g);
g=TS.utility.msgs.handleSearchHighlights(g);
return g
});
Handlebars.registerHelper("formatStarredMessageAndTruncate",function(j,h){var i=j.text;
if(j.subtype=="channel_topic"){if(j.text){i="channel topic: "+j.text
}else{i="channel topic cleared"
}}else{if(j.subtype=="channel_purpose"){if(j.text){i="channel purpose: "+j.text
}else{i="channel purpose cleared"
}}else{if(j.subtype=="channel_join"){i="joined channel"
}else{if(j.subtype=="channel_leave"){i="left channel"
}else{if(j.subtype=="group_topic"){if(j.text){i="group topic: "+j.text
}else{i="group topic cleared"
}}else{if(j.subtype=="group_purpose"){if(j.text){i="group purpose: "+j.text
}else{i="group purpose cleared"
}}else{if(j.subtype=="group_join"){i="joined group"
}else{if(j.subtype=="group_leave"){i="left group"
}else{if(j.subtype=="group_archive"){i="archived group"
}else{if(j.subtype=="group_unarchive"){i="un-archived group"
}else{if(j.subtype=="channel_archive"){i="archived channel"
}else{if(j.subtype=="channel_unarchive"){i="un-archived channel"
}}}}}}}}}}}}var k=truncate(TS.format.formatDefault(i,j),h);
if(j.permalink){var g=' <a target="'+TS.templates.builders.newWindowName()+'" href="'+j.permalink+'" class="normal tiny">read more</a>';
return k+g
}else{return k
}});
Handlebars.registerHelper("rxnPanel",function(g,h){return TS.templates.builders.rxnPanel(g,h||{})
});
Handlebars.registerHelper("msgActions",function(g){return'<a class="msg_actions" data-msg-ts="'+g.ts+'"><input type="checkbox" class="msg_select_cb" /><i class="msg_cog ts_icon ts_icon_cog ts_icon_inherit"></i></a>'
});
Handlebars.registerHelper("fileActionsCog",function(g){return'<a class="file_actions file_actions_cog ts_icon ts_icon_cog" data-file-id="'+g.id+'"></a>'
});
Handlebars.registerHelper("fileActionsBtn",function(g){return'<a class="file_actions ts_icon ts_icon_chevron_medium_down" data-file-id="'+g.id+'"></a>'
});
Handlebars.registerHelper("fileActionsLink",function(g){return'<a class="file_actions file_actions_link" data-file-id="'+g.id+'">Actions <i class="ts_icon ts_icon_caret_down ts_icon_inherit"></i></a>'
});
Handlebars.registerHelper("makeRefererSafeLink",function(g){return TS.utility.makeRefererSafeLink(g.hash.url)
});
Handlebars.registerHelper("makeSafeForDomId",TS.utility.makeSafeForDomId);
Handlebars.registerHelper("makeMsgAttachmentTextExpanderDomId",TS.templates.makeMsgAttachmentTextExpanderDomId);
Handlebars.registerHelper("makeMsgDomId",TS.templates.makeMsgDomId);
Handlebars.registerHelper("makeMsgLabelDomId",TS.templates.makeMsgLabelDomId);
Handlebars.registerHelper("makeMSRDomId",TS.templates.makeMSRDomId);
Handlebars.registerHelper("makeSHRoomClass",TS.templates.makeSHRoomClass);
Handlebars.registerHelper("makeMsgDomClass",function(h){var g="";
if(!h.subtype){return g
}if(h.subtype=="channel_join"||h.subtype=="group_join"){g+="joined";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype=="channel_leave"||h.subtype=="group_leave"){g+="left";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype=="channel_topic"||h.subtype=="group_topic"){g+="topic";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype=="channel_name"||h.subtype=="group_name"){g+="rename";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype=="channel_purpose"||h.subtype=="group_purpose"){g+="purpose";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype=="channel_archive"||h.subtype=="group_archive"){g+="archived";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype=="channel_unarchive"||h.subtype=="group_unarchive"){g+="unarchived";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype=="bot_message"){g+="bot_message"
}else{if(h.subtype==="pinned_item"){g+="pinned"
}else{if(h.subtype==="sh_room_shared"){g+="sh_shared";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype==="sh_room_created"){g+="sh_created";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}else{if(h.subtype==="bot_add"||h.subtype==="bot_remove"||h.subtype==="bot_enable"||h.subtype==="bot_disable"){g+="bot_change";
if(TS.boot_data.feature_new_message_markup){g+=" automated"
}}}}}}}}}}}}}return g
});
Handlebars.registerHelper("buildMsgHTMLForSearch",TS.templates.builders.buildMsgHTMLForSearch);
Handlebars.registerHelper("ifExtracts",function(h,g){if(h.previous||h.previous_2||h.next||h.next_2){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("willForceExtracts",function(n,g){if((!n.previous&&!n.next)||TS.search.view.resultHasExtracts(n)){return g.inverse(this)
}var k=TS.search.query_string;
var m=k.split(" ");
var j,l;
var h=false;
for(j=0;
j<m.length;
j++){l=$.trim(m[j]);
if(l.length>0&&!TS.search.keyword_modifier_pair_regex.test(l)){h=true;
break
}}if(!h){return g.fn(this)
}return g.inverse(this)
});
Handlebars.registerHelper("formatAttachmentExtracts",function(i,g){var h=i.color||"e3e4e6";
return TS.templates.search_attachment_extracts({attachment:i,message:g,bg_color:h})
});
Handlebars.registerHelper("concatMsgExtracts",function(i){if(!i.extracts||i.extracts.length===0){return""
}var j=[];
var g=TS.templates.builders.search_ellipsis;
i.extracts.forEach(function(k){if(k.text){k.text=k.text.replace(/&&gt;t;>&gt;/g,"&gt;&gt;&gt;")
}var l=TS.format.formatDefault(k.text,i);
l=TS.utility.msgs.handleSearchHighlights(l);
j.push(l)
});
var h=j.join(g);
if(i.extracts[0].truncated_head){h=g+h
}if(i.extracts[i.extracts.length-1].truncated_tail){h+=g
}return h
});
Handlebars.registerHelper("concatAttachmentExtracts",function(h,o){var l=[];
var j=h.extracts;
var n;
var k=TS.templates.builders.search_ellipsis;
if(!j){return""
}["title","text"].forEach(function(p){if(j[p]){j[p].forEach(function(q){var r=TS.format.formatDefault(q.text,o);
r=TS.utility.msgs.handleSearchHighlights(r);
if(l.length===0&&q.truncated_head){r=k+r
}n=q;
l.push(r)
})
}});
var m=l.join(k);
if(m&&n&&n.truncated_tail){m+=k
}if(!m&&j.fields&&!j.fallback){j.fields.forEach(function(q){var p=TS.utility.htmlEntities(q.value.text);
p=TS.utility.msgs.handleSearchHighlights(p);
if(q.value.truncated_head){p=k+p
}if(q.value.truncated_tail){p+=k
}m+="<strong>"+TS.utility.htmlEntities(q.title)+"</strong> &bull; "+p+"<br>"
})
}if(!m&&h.fallback){var g=h.fallback;
if(j.fallback&&j.fallback.length>0){g=j.fallback[0].text
}var i=TS.format.formatDefault(g,o);
i=TS.utility.msgs.handleSearchHighlights(i);
return i
}return m
});
Handlebars.registerHelper("newWindowName",TS.templates.builders.newWindowName);
Handlebars.registerHelper("nl2br",function(g){if(!g){return g
}g=TS.utility.htmlEntities(g);
return g.replace(/\n/g,"<br />").replace(/&amp;#95;/g,"_")
});
Handlebars.registerHelper("smartnl2br",function(g){if(!g){return g
}g=TS.utility.htmlEntities(g);
g=g.replace(/\n\r\n\r/g,'<span class="para_break"><br /></span>');
g=g.replace(/\n\r\n/g,'<span class="para_break"><br /></span>');
g=g.replace(/\n\n/g,'<span class="para_break"><br /></span>');
g=g.replace(/\n/g,"<br />");
return g.replace(/&amp;#95;/g,"_")
});
Handlebars.registerHelper("truncate",function(i,g){var h=truncate(i,g);
return h.replace(/&#64;/g,"@")
});
Handlebars.registerHelper("proxyImgUrls",function(h){var g=$("<div>"+h+"</div>");
g.find("img").each(function(){var j=$(this).attr("src");
var k=$(this).attr("width");
var l=$(this).attr("height");
var i;
if(k&&l){i=TS.utility.getImgProxyURL(j,k,l)
}else{i=TS.utility.getImgProxyURL(j)
}$(this).attr("src",i)
});
return g.html()
});
Handlebars.registerHelper("generalName",function(){var g=TS.channels.getGeneralChannel();
return(g)?g.name:""
});
Handlebars.registerHelper("makeChannelDomId",function(g){return TS.templates.makeChannelDomId(g)
});
Handlebars.registerHelper("ChannelNameMaxLength",function(g){return TS.model.channel_name_max_length
});
Handlebars.registerHelper("ChannelPurposeMaxLength",function(){return TS.model.channel_purpose_max_length
});
Handlebars.registerHelper("ChannelTopicMaxLength",function(){return TS.model.channel_topic_max_length
});
Handlebars.registerHelper("makeUnreadJustDomId",function(g){return TS.templates.makeUnreadJustDomId(g)
});
Handlebars.registerHelper("getCorGNameWithPrefixById",function(j,i){var g=TS.channels.getChannelById(j);
if(g){return"#"+g.name
}var h=TS.groups.getGroupById(j);
if(h){return TS.model.group_prefix+h.name
}if(i){return
}else{return j
}});
Handlebars.registerHelper("makeChannelLink",TS.templates.builders.makeChannelLink);
Handlebars.registerHelper("makeChannelLinkById",function(h){var g=TS.channels.getChannelById(h);
if(g){return TS.templates.builders.makeChannelLink(g)
}});
Handlebars.registerHelper("makeUnreadHighlightDomId",function(g){return TS.templates.makeUnreadHighlightDomId(g)
});
Handlebars.registerHelper("makeChannelDomClass",function(h){var g="";
if(TS.model.active_channel_id==h.id){g+="active "
}if(h.unread_cnt>0){g+="unread "
}if(h.unread_highlight_cnt>0){g+="mention "
}if(TS.notifs.isCorGMuted(h.id)){g+="muted_channel "
}if(h._show_in_list_even_though_no_unreads){g+="show_in_list_even_though_no_unreads "
}return g
});
Handlebars.registerHelper("makeChannelOrGroupLinkById",function(h){var g=TS.shared.getModelObById(h);
if(g.is_channel){return TS.templates.builders.makeChannelLink(g)
}else{if(g.is_group){return TS.templates.builders.makeGroupLink(g)
}}});
Handlebars.registerHelper("makeInternalChannelOrGroupLinkById",function(h){var g=TS.shared.getModelObById(h);
if(!g){return
}if(g.is_channel){return TS.templates.builders.makeInternalChannelLink(g)
}else{if(g.is_group){return TS.templates.builders.makeInternalGroupLink(g)
}}});
Handlebars.registerHelper("makeGroupDomId",function(g){return TS.templates.makeGroupDomId(g)
});
Handlebars.registerHelper("groupPrefix",function(g){return TS.model.group_prefix
});
Handlebars.registerHelper("makeGroupLink",TS.templates.builders.makeGroupLink);
Handlebars.registerHelper("makeGroupLinkById",function(h){var g=TS.groups.getGroupById(h);
if(g){return TS.templates.builders.makeGroupLink(g)
}});
Handlebars.registerHelper("makeGroupDomClass",function(h){var g="";
if(TS.model.active_group_id==h.id){g+="active "
}if(h.unread_cnt>0){g+="unread "
}if(h.unread_highlight_cnt>0){g+="mention "
}if(h.is_starred){g+="starred "
}if(TS.notifs.isCorGMuted(h.id)){g+="muted_channel "
}if(h._show_in_list_even_though_no_unreads){g+="show_in_list_even_though_no_unreads "
}return g
});
Handlebars.registerHelper("mpimMemberCount",function(g){return TS.mpims.getMemberCount(g)
});
Handlebars.registerHelper("mpimDisplayName",function(g){return TS.mpims.getDisplayName(g)
});
Handlebars.registerHelper("makeMpimDomClass",function(h){var g="";
if(!h){return g
}if(h.id===TS.model.active_mpim_id){g+="active "
}if(h.unread_cnt>0||h.unread_highlight_cnt>0){g+="unread mention "
}if(TS.notifs.isCorGMuted(h.id)){g+="muted_channel "
}return g
});
Handlebars.registerHelper("makeMpimDomId",function(g){return TS.templates.makeMpimDomId(g)
});
Handlebars.registerHelper("makeMpimLink",function(h,g){return TS.templates.builders.makeMpimLink(h,g)
});
Handlebars.registerHelper("mpimArchivesPath",function(g){return TS.mpims.getMpimArchivesPath(g)
});
Handlebars.registerHelper("currentUserId",function(){return TS.model.user.id
});
Handlebars.registerHelper("makeMemberDomId",function(g){return TS.templates.makeMemberDomId(g)
});
Handlebars.registerHelper("makeChannelListDomId",function(g){return TS.templates.makeChannelListDomId(g)
});
Handlebars.registerHelper("makeMemberPresenceDomClass",function(g){return TS.templates.makeMemberPresenceDomClass(g.id)
});
Handlebars.registerHelper("makeMemberPresenceIcon",function(g){return TS.templates.makeMemberPresenceIcon(g)
});
Handlebars.registerHelper("makeMemberStatusDomClass",function(g){return TS.templates.makeMemberStatusDomClass(g.id)
});
Handlebars.registerHelper("makeMemberDomClass",function(j){var h="";
if(!j){return h
}if(!j.is_self&&j.presence=="away"){h+="away "
}if(TS.model.active_im_id){var i=TS.ims.getImById(TS.model.active_im_id);
if(i.user==j.id){h+="active "
}}var g=TS.ims.getImByMemberId(j.id);
if(g){if(g.unread_cnt>0||g.unread_highlight_cnt>0){h+="unread mention "
}}return h
});
Handlebars.registerHelper("makeMemberListDomClass",function(h){var g="member ";
if(h.presence=="away"){g+="away "
}return g
});
Handlebars.registerHelper("makeMemberPreviewLink",TS.templates.builders.makeMemberPreviewLink);
Handlebars.registerHelper("makeMemberPreviewLinkById",function(i,g){if(g!==true){g=false
}var h;
if(TS.boot_data.feature_email_integration){h=TS.members.getMemberById(i)||TS.bots.getBotById(i)
}else{h=TS.members.getMemberById(i)
}if(!h){return i
}return TS.templates.builders.makeMemberPreviewLink(h,g)
});
Handlebars.registerHelper("makeMemberPreviewLinkImage",TS.templates.builders.makeMemberPreviewLinkImage);
Handlebars.registerHelper("makeProfileImage",TS.templates.builders.makeProfileImage);
Handlebars.registerHelper("emojiGraphicReplace",function(g){return TS.emoji.graphicReplace(g)
});
Handlebars.registerHelper("emojiGraphicReplaceByName",function(g){return TS.emoji.graphicReplace(":"+g+":")
});
Handlebars.registerHelper("makeMemberImage",TS.templates.builders.makeMemberImage);
Handlebars.registerHelper("makeUsernameImage",function(i,q){var n,h,m,g;
var j;
var p=(i.bot_id)?TS.bots.getBotById(i.bot_id):null;
if(i.icons){j=i.icons
}else{if(p&&p.icons){j=p.icons
}else{}}if(j){if(j.image_36&&!TS.model.is_retina){n=j.image_36
}else{if(j.image_72&&TS.model.is_retina){n=j.image_72
}else{if(j.image_48){n=j.image_48
}else{if(j.emoji&&j.emoji.substr(0,1)==":"&&j.emoji.substr(j.emoji.length-1,1)==":"){m=j.emoji
}}}}}var l=TS.templates.builders.makeBotLink(p,i.username);
var o=(i&&i.is_ephemeral&&i.username=="slackbot")?TS.members.getMemberById("USLACKBOT"):null;
switch(q){case 24:h="thumb_24";
g="https://i0.wp.com/slack-assets2.s3-us-west-2.amazonaws.com/8390/img/avatars/ava_0002-24.png?ssl=1";
if(o){g=o.profile.image_24
}break;
case 32:h="thumb_32";
g="https://i0.wp.com/slack-assets2.s3-us-west-2.amazonaws.com/8390/img/avatars/ava_0002-32.png?ssl=1";
if(o){g=o.profile.image_32
}break;
case 36:h="thumb_36";
g="https://i0.wp.com/slack-assets2.s3-us-west-2.amazonaws.com/8390/img/avatars/ava_0002-48.png?ssl=1";
if(o){g=o.profile.image_48
}break;
case 72:h="thumb_72";
g="https://i0.wp.com/slack-assets2.s3-us-west-2.amazonaws.com/8390/img/avatars/ava_0002-72.png?ssl=1";
if(o){g=o.profile.image_72
}break;
case 192:h="thumb_192";
g="https://i0.wp.com/slack-assets2.s3-us-west-2.amazonaws.com/8390/img/avatars/ava_0002-192.png?ssl=1";
if(o){g=o.profile.image_192
}break;
default:h="thumb_48";
g="https://i0.wp.com/slack-assets2.s3-us-west-2.amazonaws.com/8390/img/avatars/ava_0002-48.png?ssl=1";
if(o){g=o.profile.image_48
}break
}var k;
if(n){k=l.start_a+'<img style="border: 0" src="'+n+'" class="member_image '+h+'" />'+l.end_a
}else{if(m){k=l.start_a+'<div style="border: 0" class="member_image '+h+'">'+TS.emoji.graphicReplace(TS.utility.htmlEntities(m),true,false,true)+"</div>"+l.end_a
}else{if(o){k=l.start_a+'<img src="'+g+'" class="member_image '+h+'" />'+l.end_a
}else{k=l.start_a+'<img src="'+g+'" class="member_image bot_icon_default '+h+'" />'+l.end_a
}}}return k
});
Handlebars.registerHelper("getMemberNameById",function(h){var g=TS.members.getMemberById(h);
return g?g.name:h
});
Handlebars.registerHelper("getMemberDisplayNameById",function(g){return TS.members.getMemberDisplayNameById(g)
});
Handlebars.registerHelper("getMemberDisplayName",function(g){return TS.members.getMemberDisplayName(g)
});
Handlebars.registerHelper("getDisplayNameOfUserForIm",function(g){if(!g){return"MISSING_IM"
}return TS.ims.getDisplayNameOfUserForIm(g)
});
Handlebars.registerHelper("getIMNameById",function(h){var g=TS.ims.getImById(h);
return g?g.name:h
});
Handlebars.registerHelper("getIMIdByMemberId",function(h){var g=TS.ims.getImByMemberId(h);
return g?g.id:""
});
Handlebars.registerHelper("memberHasIm",function(g){var i=g.hash.member;
var h=false;
if(i){if(TS.ims.getImByMemberId(i.id)){h=true
}}if(h){return g.fn(this)
}else{return g.inverse(this)
}});
function d(g){var j=TS.members.getMemberById(g.user);
var i="color_"+((j)?j.id+" color_"+j.color:"unknown");
var h=(TS.utility.shouldLinksHaveTargets())?'target="/messages/@'+g.name+'"':"";
return'<a href="/messages/@'+g.name+'" '+h+'" class="internal_im_link '+i+'" data-member-name="'+g.name+'">@'+g.name+"</a>"
}Handlebars.registerHelper("makeIMLink",d);
Handlebars.registerHelper("makeIMLinkById",function(h){var g=TS.ims.getImById(h);
if(g){return d(g)
}});
function c(j){var l=TS.utility.htmlEntities(j.username);
var i;
var k=(j.bot_id)?TS.bots.getBotById(j.bot_id):null;
if(j.icons){i=j.icons
}else{if(k&&k.icons){i=k.icons
}else{}}if(!l&&k&&k.name){l=TS.utility.htmlEntities(k.name)
}var g=TS.templates.builders.makeBotLink(k,j.username);
if(!i){return g.start_a+l+g.end_a
}var h;
if(i.emoji&&i.emoji.substr(0,1)==":"&&i.emoji.substr(i.emoji.length-1,1)==":"){h=g.start_a+TS.emoji.graphicReplace(TS.utility.htmlEntities(i.emoji),true,false,true)+g.end_a+" "+g.start_a+l+g.end_a
}else{if(i.image_36&&!TS.model.is_retina){h=g.start_a+'<img src="'+i.image_36+'" class="inline_bot_icon">'+g.end_a+" "+g.start_a+l+g.end_a
}else{if(i.image_72&&TS.model.is_retina){h=g.start_a+'<img src="'+i.image_72+'" class="inline_bot_icon">'+g.end_a+" "+g.start_a+l+g.end_a
}else{if(i.image_48){h=g.start_a+'<img src="'+i.image_48+'" class="inline_bot_icon">'+g.end_a+" "+g.start_a+l+g.end_a
}else{h=g.start_a+l+g.end_a
}}}}return h
}Handlebars.registerHelper("getBotNameAndIcon",c);
Handlebars.registerHelper("getBotName",TS.templates.builders.getBotName);
Handlebars.registerHelper("getBotNameWithLink",TS.templates.builders.getBotNameWithLink);
function e(g){if(!g){return"color_unknown"
}return"color_bot_"+TS.utility.makeSafeForDomClass(g)
}Handlebars.registerHelper("getBotColorClassByUserName",e);
function f(h){var g=TS.members.getMemberById(h);
if(!g){return"color_unknown"
}return"color_"+g.id+" color_"+g.color
}Handlebars.registerHelper("getMemberColorClassById",f);
Handlebars.registerHelper("getMemberColorClassByImId",function(h){var g=TS.ims.getImById(h);
if(!g){return"color_unknown"
}return f(g.user)
});
Handlebars.registerHelper("msgIsFromSelf",function(g){var h=g.hash.msg;
var j=h.user;
if(!j&&h.subtype=="file_comment"&&h.comment){j=h.comment.user
}var i=TS.members.getMemberById(j);
if(!i){return g.inverse(this)
}if(i.is_self){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("memberIsSelf",function(g){var h=TS.members.getMemberById(g.hash.id);
if(!h){return g.inverse(this)
}if(h.is_self){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("memberIsAdmin",function(g){var h=TS.members.getMemberById(g.hash.id);
if(!h){return g.inverse(this)
}if(h.is_admin){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("currentUserIsAdmin",function(g){if(TS.model.user.is_admin){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("currentUserIsOwner",function(g){if(TS.model.user.is_owner){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("currentUserIsRA",function(g){if(TS.model.user.is_restricted){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("currentUserIsURA",function(g){if(TS.model.user.is_ultra_restricted){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("tinyspeck",function(g){if(TS.model.team.domain=="tinyspeck"){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("makeUnshareLinkById",function(i){var h=TS.files.getFileById(TS.web.file.file_id);
var g=TS.shared.getModelObById(i);
if(g){return TS.templates.builders.makeUnshareLink(g,h)
}});
Handlebars.registerHelper("makeUnshareLink",function(g){var h=TS.files.getFileById(TS.web.file.file_id);
return TS.templates.builders.makeUnshareLink(g,h)
});
Handlebars.registerHelper("makeFileDomId",function(g){return TS.templates.makeFileDomId(g)
});
Handlebars.registerHelper("makeFileCommentsDomId",function(g){return TS.templates.makeFileCommentsDomId(g)
});
Handlebars.registerHelper("makeFileContentsDomId",function(g){return TS.templates.makeFileContentsDomId(g)
});
Handlebars.registerHelper("makeFileHeader",function(g,j){var h=g.mode=="space"||g.mode=="post";
var i=g.mode=="snippet";
return TS.templates.file_header({file:g,download:g.mode==="hosted",edit:(h||i)&&g.user===TS.model.user.id,member:j,is_post_or_space:h})
});
Handlebars.registerHelper("makeFilePreviewHeader",function(g,k){var j=(g.mode=="post");
var h=(g.mode=="space"||g.mode=="post");
var i=(g.mode=="snippet");
return TS.templates.file_header({file:g,download:g.mode==="hosted",edit_link:(j)?g.edit_link:g.permalink,edit:(h||i)&&g.user===TS.model.user.id,member:k,is_post:j,is_post_or_space:h,is_snippet:i,preview:true})
});
Handlebars.registerHelper("formatSpaceHtml",function(h){function g(m){if(m.childNodes){for(var l=0;
l<m.childNodes.length;
l++){g(m.childNodes[l])
}}if(m.nodeType==Node.TEXT_NODE){var j=TS.emoji.replace(TS.emoji.replaceEmoticons(m.textContent));
if(j!==m.textContent){var k=$("<span>").html(j)[0];
[].slice.apply(k.childNodes).forEach(function(n){m.parentNode.insertBefore(n,m)
});
m.parentNode.removeChild(m)
}}}var i=$("<div>").html(h);
g(i[0]);
if(TS.client&&TS.client.ui){TS.client.ui.unfurlPlaceholders(i)
}return i.html()
});
Handlebars.registerHelper("fileIsImage",function(g){var h=TS.files.getFileById(g.hash.id);
if(!h){return g.inverse(this)
}if(h.mimetype&&h.mimetype.indexOf("image/")===0){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("mimeTypeIsImage",function(g){if(g.hash.type&&g.hash.type.indexOf("image/")===0){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("fileDefaultIsNewWindow",function(g){g=a(g);
var h=TS.files.getFileById(g.hash.id);
if(!h){return g.inverse(this)
}if((h.mimetype&&h.mimetype.indexOf("image/")===0)||h.filetype==="pdf"){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("fileIconTypeDownload",function(){var h=Array.prototype.slice.call(arguments);
var g=a(h.pop());
var i=h[0];
if(typeof i==="string"){i=TS.files.getFileById(i)
}if(!i){return g.inverse(this)
}if(i.mode==="external"||(i.mimetype&&i.mimetype.indexOf("image/")===0)||i.filetype==="pdf"){return g.inverse(this)
}else{return g.fn(this)
}});
Handlebars.registerHelper("makeFilePrivacyLabel",function(h){var g="";
if(h.is_public){g="Shared"
}else{if((h.groups.length>0)||(h.ims.length>0)){g="Private"
}else{g="Draft"
}}return g
});
Handlebars.registerHelper("makeExternalFiletypeHTML",function(g){return TS.templates.builders.makeExternalFiletypeHTML(g)
});
Handlebars.registerHelper("makeFileShareLabel",function(g){return TS.templates.builders.makeFileShareLabel(g)
});
Handlebars.registerHelper("makeFileGroupChannelList",function(g){return TS.templates.builders.makeFileGroupChannelList(g)
});
Handlebars.registerHelper("nl2brAndHighlightSearchMatches",function(g){if(!g){return
}g=TS.utility.htmlEntities(g);
g=g.replace(/\n/g,"<br />");
return TS.utility.msgs.handleSearchHighlights(g)
});
Handlebars.registerHelper("maybeGetIconForTeamProfileField",function(g){var h=["slack","apple","android","twitter","github","google","windows","youtube","skype","facebook","asana","linkedin","tumblr","instagram","soundcloud","flickr","pinterest","tripit","hangouts","viber","line"];
g=g.toLowerCase();
if(~h.indexOf(g)){return'<i class="ts_icon ts_icon_'+g+'"></i>'
}});
Handlebars.registerHelper("getVisibleTeamProfileFieldsForMember",function(h){var g=TS.team.getVisibleTeamProfileFieldsForMember(h);
return TS.templates.team_profile_fields({fields:g})
});
Handlebars.registerHelper("highlightSearchMatches",function(g){if(!g){return
}g=TS.utility.htmlEntities(g);
return TS.utility.msgs.handleSearchHighlights(g)
});
Handlebars.registerHelper("highlightSearchMatchesInSpacesHtml",function(g){if(!g){return
}var h=Handlebars.helpers.formatSpaceHtml(g);
return TS.utility.msgs.handleSearchHighlights(h)
});
Handlebars.registerHelper("highlightSearchMatchesInFileTitle",function(g){if(!g){return
}g=TS.emoji.graphicReplace(g);
return TS.utility.msgs.handleSearchHighlights(g)
});
Handlebars.registerHelper("searchFilter",function(){if(!TS.search.filter){return
}return TS.search.filter
});
Handlebars.registerHelper("searchSort",function(){if(!TS.search.sort){return
}return TS.search.sort
});
Handlebars.registerHelper("makeUnreadMessagesDomId",function(g){return TS.templates.makeUnreadMessagesDomId(g)
});
Handlebars.registerHelper("makeUnreadGroupMessagesDomId",function(g){return TS.templates.makeUnreadGroupMessagesDomId(g)
});
Handlebars.registerHelper("makeUnreadDmsDomId",function(g){return TS.templates.makeUnreadDmsDomId(g)
});
Handlebars.registerHelper("makeSentMessagesDomId",function(g){return TS.templates.makeSentMessagesDomId(g)
});
Handlebars.registerHelper("makeSentGroupMessagesDomId",function(g){return TS.templates.makeSentGroupMessagesDomId(g)
});
Handlebars.registerHelper("makeSentDmsDomId",function(g){return TS.templates.makeSentDmsDomId(g)
});
Handlebars.registerHelper("makeIssueListDomId",function(g){return TS.templates.makeIssueListDomId(g)
});
Handlebars.registerHelper("addIndefiniteArticle",function(i){if(typeof i!=="string"){return i
}var j=["a","e","i","o","u"];
var h=i.charAt(0).toLowerCase();
var g=j.some(function(k){return h===k
});
return g?"an "+i:"a "+i
});
Handlebars.registerHelper("math",function(g,h,j,i){if(arguments.length<4){i=j;
j=h;
h="+"
}g=parseFloat(g);
j=parseFloat(j);
return{"+":g+j,"-":g-j,"*":g*j,"/":g/j,"%":g%j}[h]
});
Handlebars.registerHelper("loadingHTML",function(){var g=cdn_url+"/f85a/img/loading_hash_animation_@2x.gif";
return'<div class="loading_hash_animation"><img src="'+g+'" alt="Loading" /><br />loading...</div>'
});
Handlebars.registerHelper("isUsingArchiveViewer",function(g){if(TS.boot_data.feature_archive_viewer){return g.fn(this)
}else{return g.inverse(this)
}});
Handlebars.registerHelper("pinnedFileType",function(g){if(!g){return"file"
}if(g.mode==="space"){return"Post"
}if(g.mode==="snippet"){return"text snippet"
}if(g.mode==="post"){return"post"
}if(g.mode==="external"){var h=TS.templates.builders.makeExternalFiletypeHTML(g);
if(h){return h
}}return"file"
});
Handlebars.registerHelper("pinToLabel",function(g){var h="";
if(g.is_channel){h+="#"
}if(g.is_im||g.is_mpim){h+="this conversation"
}else{h+=TS.utility.htmlEntities(g.name)
}return new Handlebars.SafeString(h)
});
Handlebars.registerHelper("makeSHRoomParticipantList",TS.templates.builders.makeSHRoomParticipantList);
Handlebars.registerHelper("makeSHRoomSharedList",TS.templates.builders.makeSHRoomSharedList);
Handlebars.registerHelper("channelsAndGroupsCopy",function(g){return TS.templates.builders.channelsAndGroupsCopy(g.hash)
});
Handlebars.registerHelper("channelsAndPrivateGroupsCopy",function(g){return TS.templates.builders.channelsAndPrivateGroupsCopy(g.hash)
});
Handlebars.registerHelper("channelsOrGroupsCopy",function(g){return TS.templates.builders.channelsOrGroupsCopy(g.hash)
});
Handlebars.registerHelper("channelOrGroupCopy",function(g){return TS.templates.builders.channelOrGroupCopy(g.hash)
});
Handlebars.registerHelper("channelOrPrivateGroupCopy",function(g){return TS.templates.builders.channelOrPrivateGroupCopy(g.hash)
});
Handlebars.registerHelper("privateGroupsCopy",function(g){return TS.templates.builders.privateGroupsCopy(g.hash)
});
Handlebars.registerHelper("privateGroupCopy",function(g){return TS.templates.builders.privateGroupCopy(g.hash)
});
Handlebars.registerHelper("groupCopy",function(g){return TS.templates.builders.groupCopy(g.hash)
});
Handlebars.registerHelper("channelDmOrGroupCopy",function(g){return TS.templates.builders.channelDmOrGroupCopy(g.hash)
});
Handlebars.registerHelper("channelsDmsOrGroupsCopy",function(g){return TS.templates.builders.channelsDmsOrGroupsCopy(g.hash)
});
Handlebars.registerHelper("channelsDmsAndPrivateGroupsCopy",function(g){return TS.templates.builders.channelsDmsAndPrivateGroupsCopy(g.hash)
});
Handlebars.registerHelper("channelGroupOrDirectMessageCopy",function(g){return TS.templates.builders.channelGroupOrDirectMessageCopy(g.hash)
})
},test:function(){return{_optionsFnInverseBooleanHelper:a,_inlineImgSrcForFile:b}
}});
var a=function(c){if(typeof c.fn!=="function"){c.fn=function(){return true
}
}if(typeof c.inverse!=="function"){c.inverse=function(){return false
}
}return c
};
var b=function(c,f,e){if(!e){return false
}if(typeof c==="string"){c=TS.files.getFileById(c)
}if(!c||(!c.thumb_360&&!c.thumb_360_gif)){return false
}if(TS.boot_data.feature_fix_files&&c.external_type==="gdrive"&&c.mimetype.indexOf("image/")<0){return false
}var d=(e==="dense")?360:480;
return TS.files.getThumbSrcForFile(c,{retina:f,max_size:d})
}
})();
(function(){TS.registerModule("utility.date",{month_names:["January","February","March","April","May","June","July","August","September","October","November","December"],short_month_names:["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"],really_short_month_names:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],day_names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],short_day_names:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ones_digit_names:["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],tens_digit_names:["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],ones_digit_ordinal_names:["zeroth","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelveth"],onStart:function(){},toDateObject:function(e){var c;
if(e&&typeof e=="string"&&e.indexOf("-")>-1){var b=e.split("-");
if(b.length>=3){c=new Date(b[0],b[1]-1,b[2])
}else{c=new Date(0)
}}else{var d=(e||"0").toString();
if(d.indexOf(".")!=-1){c=new Date(d.split(".")[0]*1000)
}else{c=new Date(e*1000)
}}return c
},toTime:function(f,h,k){var b=TS.utility.date.toDateObject(f);
var i=b.getHours();
var d=b.getMinutes();
var e=b.getSeconds();
var c=false;
if(TS.utility.date.do24hrTime()){if(i<10){i="0"+i
}}else{if(i>=12){if(i>12){i=i-12
}c=true
}else{if(i===0){i=12
}}}if(d<10){d="0"+d
}var g="";
if(k){if(e<10){g=":0"+e
}else{g=":"+e
}}var j=i+":"+d+g;
if(h&&!TS.utility.date.do24hrTime()){if(c){j+=" PM"
}else{j+=" AM"
}}return j
},toTimeDuration:function(d){var b=TS.utility.date.toTimeAmount(Math.floor(d/60));
b.s=d%60;
var c="";
if(b.w){c+=b.w+" weeks "
}if(b.d){c+=b.d+" days "
}if(b.h){c+=b.h+" hours "
}if(b.mi){c+=b.mi+" min "
}if(b.s||c.length===0){c+=b.s+" sec "
}c=c.trim();
return c
},toTimeAmount:function(b){var c={w:TS.utility.date.toWeekAmount(b),d:TS.utility.date.toDayAmount(b)-TS.utility.date.toWeekAmount(b)*7,h:TS.utility.date.toHourAmount(b)-TS.utility.date.toDayAmount(b)*24,mi:b%60};
return c
},toWeekAmount:function(b){return Math.floor(b/10080)
},toDayAmount:function(b){return Math.floor(b/1440)
},toHourAmount:function(b){return Math.floor(b/60)
},toDate:function(f,g){var b=TS.utility.date.toDateObject(f);
var h=b.getFullYear();
var e=b.getMonth();
var i=b.getDate();
var j=b.getHours();
var d=b.getMinutes();
var c=false;
if(TS.utility.date.do24hrTime()){if(j<10){j="0"+j
}}else{if(j>=12){if(j>12){j=j-12
}c=true
}else{if(j===0){j=12
}}}if(i<10){i="0"+i
}if(d<10){d="0"+d
}e=("0"+(e+1)).slice(-2);
var k=h+"-"+e+"-"+i;
if(g){return k
}k+=", "+j+":"+d;
if(!TS.utility.date.do24hrTime()){if(c){k+=" PM"
}else{k+=" AM"
}}return k
},toHumanReadableDateAndTime:function(c){var b=TS.utility.date.maybeGetRelativeDay(c);
if(b){var e=true;
var d=TS.utility.date.toTime(c,e);
return b+" at "+d
}return TS.utility.date.toCalendarDateOrNamedDayShort(c)
},shouldExcludeYear:function(e){var d=TS.utility.date.toDateObject(e);
var c=new Date();
var b=31*24*60*60*1000;
return(d.getFullYear()==c.getFullYear()||c-d<=b)
},toCalendarDateOrNamedDayShort:function(b){var c=TS.utility.date.shouldExcludeYear(b);
return TS.utility.date.toCalendarDateOrNamedDay(b,true,c)
},do24hrTime:function(){if(TS.model.user&&TS.model.prefs&&TS.model.prefs.time24){return true
}return false
},toFilenameFriendlyDate:function(f){var b=TS.utility.date.toDateObject(f);
var g=b.getFullYear();
var e=b.getMonth();
var h=b.getDate();
var i=b.getHours();
var d=b.getMinutes();
var c=false;
if(!TS.utility.date.do24hrTime()){if(i>=12){if(i>12){i=i-12
}c=true
}else{if(i===0){i=12
}}}if(h<10){h="0"+h
}if(i<10){i="0"+i
}if(d<10){d="0"+d
}e=("0"+(e+1)).slice(-2);
var j=g+"_"+e+"_"+h+" "+i+"_"+d;
if(!TS.utility.date.do24hrTime()){if(c){j+=" PM"
}else{j+=" AM"
}}return j
},toCalendarDate:function(f,d,b,i){var c=TS.utility.date.toDateObject(f);
var g=c.getFullYear();
var e=c.getMonth();
var h=c.getDate();
var j;
if(i){j=TS.utility.date.really_short_month_names[e]+" "+h
}else{if(d){j=TS.utility.date.short_month_names[e]+" "+TS.utility.ordinalNumber(h)
}else{j=TS.utility.date.month_names[e]+" "+TS.utility.ordinalNumber(h)
}}if(!b){j+=", "+g
}return j
},maybeGetRelativeDay:function(e){var c=TS.utility.date.toDateObject(e);
var b=new Date();
var d=new Date();
d.setDate(b.getDate()-1);
if(TS.utility.date.sameDay(c,b)){return"Today"
}else{if(TS.utility.date.sameDay(c,d)){return"Yesterday"
}}},toCalendarDateOrNamedDay:function(d,c,e){var f;
var b=TS.utility.date.maybeGetRelativeDay(d);
e=e||TS.utility.date.shouldExcludeYear(d);
if(b){f=b+" "
}else{f=TS.utility.date.toCalendarDate(d,c,e)
}return f
},toCalendarDateIfYesterdayOrToday:function(f,d){var c=TS.utility.date.toDateObject(f);
var b=new Date();
var e=new Date();
e.setDate(b.getDate()-1);
var g="";
if(TS.utility.date.sameDay(c,b)){g=TS.utility.date.toCalendarDate(f,d)
}else{if(TS.utility.date.sameDay(c,e)){g=TS.utility.date.toCalendarDate(f,d)
}}return g
},toHour:function(e){var c=TS.utility.date.toDateObject(e);
var b=c.getHours();
var d=false;
if(TS.utility.date.do24hrTime()){if(b<10){b="0"+b
}}else{if(b>=12){if(b>12){b=b-12
}d=true
}else{if(b===0){b=12
}}}var f=b;
if(!TS.utility.date.do24hrTime()){if(d){f+=" PM"
}else{f+=" AM"
}}return""+f
},toDayOfTheWeek:function(c){var b=TS.utility.date.toDateObject(c);
return TS.utility.date.day_names[b.getDay()]
},toTimeAgo:function(j){var d=TS.utility.date.toDateObject(j);
var k=new Date();
var e=TS.utility.date.distanceInSeconds(k,d);
var h=(e<0);
var m=Math.abs(e);
var f=m/60;
var l=f/60;
var o=l/24;
var b=o/(365/12);
var i=o/365;
var c="",g="",n="";
if(m<45){c="less than a minute"
}else{if(m<90){c="about a minute"
}else{if(f<45){c=Math.round(f)+" minutes"
}else{if(f<90){c="about an hour"
}else{if(l<24){c="about "+Math.round(l)+" hours"
}else{if(l<42){c="a day"
}else{if(o<30){c=Math.round(o)+" days"
}else{if(o<45){c="about a month"
}else{if(o<365){c=Math.round(b)+" months"
}else{if(i<1.5){c="about a year"
}else{c=Math.round(i)+" years"
}}}}}}}}}}(h)?g="in ":n=" ago";
return g+c+n
},timezoneLabel:function(g,d){var c="Pacific Standard Time";
var f=-28800;
if(typeof g.tz_label!="undefined"){c=g.tz_label
}if(typeof g.tz_offset!="undefined"){f=g.tz_offset
}var e="<span title='"+c+"'><i class='ts_icon ts_icon_clock_o'></i> ";
if(g.id==TS.model.user.id){if(TS.client){e+=c+" (<a href='/account/settings' target='new'>change</a>)"
}else{e+=c+" (<a href='/account/settings'>change</a>)"
}}else{var b=(TS.model.user.tz_offset-f)/60/60;
if(d){e+=TS.utility.date.memberLocalTime(g)+" / "
}if(b===0){e+="in your timezone"
}else{e+=Math.abs(b)+" hour";
if(Math.abs(b)!=1){e+="s"
}}if(b>0){e+=" behind you"
}else{if(b<0){e+=" ahead of you"
}}e+=" "+TS.utility.date.memberUTCOffset(g)
}e+="</span>";
return e
},memberLocalTime:function(i,e){var h=a(i);
var d=new Date();
var f=d.getTime()+(d.getTimezoneOffset()*60000);
var c=new Date(f+(3600000*(h/3600)));
var g=TS.utility.date.toTime(c/1000,true);
var b;
if(e){b=g
}else{b='<span class="timezone_value">'+g+"</span> local time"
}return b
},memberUTCOffset:function(e){var d=a(e);
var b=d/60/60;
var c="";
if(b===0){c+="(UTC)"
}else{if(b<0){c+="(UTC"+b+")"
}else{if(b>0){c+="(UTC+"+b+")"
}}}return c
},fake_ts_unique_incrementer:"0",fake_ts_unique_padder:"x",makeTsStamp:function(f,c,e){f=f||Date.now();
c=c||TS.utility.date.fake_ts_unique_padder;
e=(e===undefined||e===null)?++TS.utility.date.fake_ts_unique_incrementer:e;
var b=Math.floor(f/1000).toString();
var g=TS.utility.padNumber(e,6,c);
return b+"."+g
},sameDay:function(b,c){return((b.getFullYear()==c.getFullYear())&&(b.getMonth()==c.getMonth())&&(b.getDate()==c.getDate()))
},sameHour:function(b,c){return((b.getFullYear()==c.getFullYear())&&(b.getMonth()==c.getMonth())&&(b.getDate()==c.getDate())&&(b.getHours()==c.getHours()))
},distanceInSeconds:function(b,d){var c=Math.round(b.getTime()/1000)-Math.round(d.getTime()/1000);
return c
},distanceInMinutes:function(b,d){var c=TS.utility.date.distanceInSeconds(b,d)/60;
return c
},isToday:function(b){var c=new Date();
return TS.utility.date.sameDay(b,c)
},getNextActivityDayStamp:function(e){var d=TS.utility.date.toDateObject(e);
var c=new Date(d.getTime()+86400000);
var b=c.getFullYear()+"-"+TS.utility.padNumber(c.getMonth()+1,2,"0")+"-"+TS.utility.padNumber(c.getDate(),2,"0");
return b
},getPrevActivityDayStamp:function(e){var d=TS.utility.date.toDateObject(e);
var c=new Date(d.getTime()-86400000);
var b=c.getFullYear()+"-"+TS.utility.padNumber(c.getMonth()+1,2,"0")+"-"+TS.utility.padNumber(c.getDate(),2,"0");
return b
},toTimeWords:function(h,k,o){var b=TS.utility.date.toDateObject(h);
var m=b.getHours();
var e=b.getMinutes();
var f=b.getSeconds();
var d=(m>=12);
var c=(e===0);
var j="";
var g="";
var i="";
var l="";
var n="";
if(c&&(f===0||!o)){if(m===0){return"midnight"
}if(m===12){return"noon"
}}if(!TS.utility.date.do24hrTime()){if(m>=12){m=m-12
}else{if(m===0){m=12
}}}j=TS.utility.date.numberToWords(m);
if(c){if(m>12&&TS.utility.date.do24hrTime()){j+=" hundred"
}else{j+=" o'clock"
}}if(e!==0){i=" ";
if(e<10){i+="oh-"
}g=TS.utility.date.numberToWords(e)
}if(o&&f!==0){l=" and "+TS.utility.date.numberToWords(f)+" second"+(f===1?"":"s")
}if(k&&!TS.utility.date.do24hrTime()){n=(d)?" PM":" AM"
}if(TS.utility.date.do24hrTime()&&m===0){return g+" minute"+(e===1?"":"s")+l+" past midnight"
}return j+i+g+l+n
},toCalendarDateWords:function(g,b){var e=TS.utility.date.toDateObject(g);
var h=e.getFullYear();
var f=e.getMonth();
var i=e.getDate();
var d=TS.utility.date.numberToWords(i,true);
var c=TS.utility.date.month_names[f];
var j="";
if(!b){j=", ";
if(h%1000===0){j+=TS.utility.date.numberToWords(h/1000)+"-thousand"
}else{if(h%100===0){j+=TS.utility.date.numberToWords(h/100)+" hundred"
}else{if(h%1000<10){j+=TS.utility.date.numberToWords((h-h%1000)/1000)+"-thousand and "+TS.utility.date.numberToWords(h%1000)
}else{j+=TS.utility.date.numberToWords((h-h%100)/100)+" "+(h%100<10?"oh-":"")+TS.utility.date.numberToWords(h%100)
}}}}return c+" "+d+j
},toCalendarDateOrNamedDayWords:function(e,f){var c=TS.utility.date.toDateObject(e);
var b=new Date();
var d=new Date();
d.setDate(b.getDate()-1);
var g;
if(TS.utility.date.sameDay(c,b)){g="Today"
}else{if(TS.utility.date.sameDay(c,d)){g="Yesterday"
}else{g=TS.utility.date.toCalendarDateWords(e,f)
}}return g
},numberToWords:function(e,c){var d,f,b="";
if(c){if(e<TS.utility.date.ones_digit_ordinal_names.length){b=TS.utility.date.ones_digit_ordinal_names[e]
}else{d=Math.floor(e/10);
f=e%10;
if(e<TS.utility.date.ones_digit_names.length){b=TS.utility.date.ones_digit_names[e]+"th"
}else{if(d<=9){if(f===0){b=TS.utility.date.tens_digit_names[d-2].replace(/y$/,"ieth")
}else{b=TS.utility.date.tens_digit_names[d-2];
b+="-"+TS.utility.date.ones_digit_ordinal_names[f]
}}}}}else{if(e<TS.utility.date.ones_digit_names.length){b=TS.utility.date.ones_digit_names[e]
}else{d=Math.floor(e/10);
f=e%10;
if(d<=9){b=TS.utility.date.tens_digit_names[d-2];
if(f>0){b+="-"+TS.utility.date.ones_digit_names[f]
}}}}return b
},formatDate:function(e,g,h){var b=new Date(g*1000);
var j=new Date();
var i=TS.utility.date.makeTsStamp(b);
var k=TS.utility.date.distanceInMinutes(b,j);
var c=k>(-182*24*60)&&k<(182*24*60);
var f=false,d=false;
if(!h){h=e
}if(isNaN(b.getTime())){return h
}e=e.replace(/{(.*?)}/g,function(l,m){var n;
switch(m){case"date_num":return TS.utility.date.toDate(i,true);
case"date_long":return TS.utility.date.toDayOfTheWeek(i)+", "+TS.utility.date.toCalendarDate(i,false,c);
case"date_long_pretty":n=TS.utility.date.prettifyDateString(i,TS.utility.date.toDayOfTheWeek(i)+", "+TS.utility.date.toCalendarDate(i,false,c));
if(!f&&e.indexOf("{date_long_pretty}")===0&&["today","yesterday","tomorrow"].indexOf(n)!==-1){f=true
}return n;
case"date":return TS.utility.date.toCalendarDate(i,false,c);
case"date_pretty":n=TS.utility.date.prettifyDateString(i,TS.utility.date.toCalendarDate(i,false,c));
if(!f&&e.indexOf("{date_pretty}")===0&&["today","yesterday","tomorrow"].indexOf(n)!==-1){f=true
}return n;
case"date_short":return TS.utility.date.toCalendarDate(i,true,c,true);
case"date_short_pretty":n=TS.utility.date.prettifyDateString(i,TS.utility.date.toCalendarDate(i,true,c,true));
if(!f&&e.indexOf("{date_short_pretty}")===0&&["today","yesterday","tomorrow"].indexOf(n)!==-1){f=true
}return n;
case"time":return TS.utility.date.toTime(i,true);
case"time_secs":return TS.utility.date.toTime(i,true,true);
case"ago":n=TS.utility.date.toTimeAgo(i);
if(!f&&e.indexOf("{ago}")===0){f=true
}return n;
default:d=true;
return""
}});
if(d){return h
}if(f){e=e.charAt(0).toUpperCase()+e.slice(1)
}return e
},prettifyDateString:function(g,c){var e=TS.utility.date.toDateObject(g);
var d=new Date();
var f=new Date((new Date()).valueOf()-1000*60*60*24);
var b=new Date((new Date()).valueOf()+1000*60*60*24);
if(TS.utility.date.sameDay(e,d)){return"today"
}if(TS.utility.date.sameDay(e,f)){return"yesterday"
}if(TS.utility.date.sameDay(e,b)){return"tomorrow"
}return c
},millisecondsToPrettifiedTime:function(c){var e=Math.floor(c/1000);
var b=Math.floor(e/3600);
var d=Math.floor((e-(b*3600))/60);
var g=e-(b*3600)-(d*60);
var f="";
if(b!==0){f=b+":"
}f+=(d<10)?"0"+d:String(d);
f+=":";
f+=(g<10)?"0"+g:String(g);
return f
},daysToYearsPretty:function(e){var f=parseInt(e);
if((f<365&&f>1)||f===0){return f+" days"
}if(f===1){return"1 day"
}var c,b="";
if(f%365===0){c=f/365;
f=0
}else{c=Math.floor(f/365);
f=(f%365)
}b=(c>1)?c+" years":c+" year";
if(f>1){b+=", "+f+" days"
}else{if(f===1){b+=", 1 day"
}}return b
}});
var a=function(c){var b=-28800;
if(typeof c.tz_offset!="undefined"){b=c.tz_offset
}return b
}
})();
(function(){TS.registerModule("utility.msgs",{automated_subtypes:["channel_join","channel_leave","channel_topic","channel_purpose","channel_archive","channel_unarchive","group_join","group_leave","group_topic","group_purpose","group_archive","group_unarchive","group_name","channel_name","play_sound","pinned_item","unpinned_item","sh_room_shared","sh_room_created","bot_enable","bot_disable","bot_add","bot_remove"],ephemeral_msgs_map:{},onStart:function(){},appendMsg:function(a,b){a.unshift(TS.utility.msgs.makeSureMsgObIsValid(b))
},setMsgs:function(a,c){for(var b=0;
b<c.length;
b++){c[b]=TS.utility.msgs.makeSureMsgObIsValid(c[b])
}TS.utility.msgs.sortMsgs(c);
a.msgs=c;
TS.utility.msgs.maybeStoreMsgs(a.id,a.msgs);
return a.msgs
},spliceMsg:function(b,c){var a=b.indexOf(c);
if(a>-1){b.splice(a,1)
}},getNonTempMsgFromUserMatchingText:function(e,a,c){if(!e&&e!==0){return null
}var d;
for(var b=0;
b<c.length;
b++){d=c[b];
if(d.user!=a){continue
}if(TS.utility.msgs.isTempMsg(d)){continue
}if(d.text==e){return d
}}return null
},getMsgByProp:function(a,d,c){if(!d&&d!==0){return null
}var e;
for(var b=0;
b<c.length;
b++){e=c[b];
if(e[a]==d){return e
}}return null
},getEditableMsgByProp:function(a,d,c){if(!d&&d!==0){return null
}var e;
for(var b=0;
b<c.length;
b++){e=c[b];
if(e.subtype&&e.subtype!="me_message"){continue
}if(e[a]==d){return e
}}return null
},sortMsgs:function(b){function a(d,c){if(d.ts<c.ts){return 1
}if(d.ts>c.ts){return -1
}return 0
}b.sort(a)
},getPrevDisplayedMsg:function(c,d){var e;
var a=false;
for(var b=0;
b<d.length;
b++){e=d[b];
if(a){if(!e.no_display&&!e._jl_rolled_up_in){return e
}}else{if(e.ts==c){a=true
}}}return null
},getDisplayedMsgs:function(c){var a=[];
var d;
for(var b=0;
b<c.length;
b++){d=c[b];
if(!d.no_display&&!d._jl_rolled_up_in){a.push(d)
}}return a
},getDisplayedMsgAfterTS:function(b,c){var d;
for(var a=c.length-1;
a>-1;
a--){d=c[a];
if(d.ts>b){if(!d.no_display&&!d._jl_rolled_up_in){return d
}}}return null
},getDisplayedMsgBeforeTS:function(b,c){var d;
for(var a=0;
a<c.length;
a++){d=c[a];
if(d.ts<b){if(!d.no_display&&!d._jl_rolled_up_in){return d
}}}return null
},getMsg:function(b,a){if(!a){return null
}return TS.utility.msgs.getMsgByProp("ts",b,a)
},getMsgByRspId:function(a,b){if(!b){return null
}return TS.utility.msgs.getMsgByProp("rsp_id",a,b)
},getMsgActions:function(e){if(!e){return
}var c=(e.subtype=="file_upload"||e.subtype=="file_share"||e.subtype=="file_mention"||e.subtype=="file_comment");
var d={edit_msg:true,delete_msg:true};
var a=false;
if(e.user==TS.model.user.id){a=true
}if(e.file&&e.file.mode==="email"){d.open_original=true
}if(!a){d.edit_msg=false
}else{if(TS.model.team.prefs.msg_edit_window_mins>-1&&(Date.now()-TS.utility.date.toDateObject(e.ts))/60000>TS.model.team.prefs.msg_edit_window_mins){d.edit_msg=false
}else{if(TS.utility.msgs.automated_subtypes.indexOf(e.subtype)!=-1){d.edit_msg=false
}else{if(c){d.edit_msg=false
}}}}if(!TS.model.team.prefs.allow_message_deletion){if(!TS.model.user.is_admin){d.delete_msg=false
}else{if(TS.model.active_im_id&&!a){d.delete_msg=false
}}}else{if(TS.model.active_im_id){if(!a&&e.user!="USLACKBOT"&&e.subtype!="bot_message"){d.delete_msg=false
}}else{if(!a){if(!TS.model.user.is_admin){d.delete_msg=false
}}else{if(TS.utility.msgs.automated_subtypes.indexOf(e.subtype)!=-1){if(!TS.model.user.is_admin&&e.subtype!=="pinned_item"&&e.subtype!=="sh_room_created"&&e.subtype!=="sh_room_shared"){d.delete_msg=false
}}}}}if(e.is_ephemeral){d.delete_msg=true
}else{if(TS.client&&e.subtype!=="pinned_item"&&e.subtype!=="unpinned_item"){var b=TS.shared.getActiveModelOb();
if(TS.pins.canUserPinHere(b)){if(TS.pins.isMessagePinned(e,b)){d.unpin_msg=true
}else{d.pin_msg=true
}}}if(TS.boot_data.feature_reactions){if(e.subtype=="file_comment"){d.add_file_comment_rxn=true
}else{if(c){d.add_file_rxn=true
}else{d.add_rxn=true
}}}}if(TS.boot_data.feature_new_message_markup){if(TS.client){d.mark_unread=true
}}return d
},maybeStoreMsgs:function(d,c,b){if(!TS.client){return
}c=TS.utility.msgs.prepareMsgsForLS(c,d);
var a=TS.storage.fetchMsgsRaw(d);
if(b||!a||!TS.utility.areSimpleObjectsEqual(a,c,"msgs of c_id:"+d)){TS.storage.storeMsgs(d,c)
}},validateMsg:function(c,b,a){if(!b.ts){TS.error("msg lacks a ts ("+c+")");
TS.dir(0,b);
return false
}if(TS.utility.msgs.getMsg(b.ts,a)){TS.warn("msg "+b.ts+" already exists! ("+c+")");
TS.dir(0,b);
return false
}return true
},findMsg:function(d,c){var a=TS.shared.getModelObById(c);
var e=a&&a.msgs&&TS.utility.msgs.getMsg(d,a.msgs);
if(e){return e
}e=a&&a._archive_msgs&&TS.utility.msgs.getMsg(d,a._archive_msgs);
if(e){return e
}var b=TS.mentions.getMentionByMsgId(d);
if(b){return b.message
}return null
},replaceMsg:function(c,b,a){var e=TS.utility.msgs.getMsg(b.ts,c.msgs);
if(!e&&c._archive_msgs){e=TS.utility.msgs.getMsg(b.ts,c._archive_msgs)
}if(!e){if(!a){TS.error("unknown msg:"+b.ts+" in "+c.id)
}return
}if(TS.boot_data.feature_reactions){b._rxn_key=e._rxn_key
}if(!b.pinned_to){b.pinned_to=e.pinned_to
}if(!("is_starred" in b)){b.is_starred=e.is_starred
}var g=null;
if(b.comment&&b.file){var f=TS.files.getFileById(b.file.id);
if(f){TS.files.editCommentOnFile(b.comment,f);
g=TS.files.getFileCommentById(f,b.comment.id)
}}b=TS.utility.msgs.processImsg(b,c.id);
if(g){b.comment=g
}var d;
for(d in e){delete e[d]
}for(d in b){e[d]=b[d]
}if(c.id==TS.model.active_im_id){TS.ims.message_changed_sig.dispatch(c,e)
}else{if(c.id==TS.model.active_channel_id){TS.channels.message_changed_sig.dispatch(c,e)
}else{if(c.id==TS.model.active_group_id){TS.groups.message_changed_sig.dispatch(c,e)
}else{if(c.id==TS.model.active_mpim_id){TS.mpims.message_changed_sig.dispatch(c,e)
}}}}TS.utility.msgs.maybeStoreMsgs(c.id,c.msgs)
},removeEphemeralMsg:function(b,c){var a=TS.groups.getGroupById(b)||TS.channels.getChannelById(b);
if(!a){return
}if(a.is_channel){TS.channels.removeMsg(b,TS.utility.msgs.getMsg(c,a.msgs))
}else{if(TS.boot_data.feature_mpim_client&&a.is_mpim){TS.mpims.removeMsg(b,TS.utility.msgs.getMsg(c,a.msgs))
}else{if(a.is_group){TS.groups.removeMsg(b,TS.utility.msgs.getMsg(c,a.msgs))
}}}},getMemberFromMemberMarkup:function(b){var c=b.substr(1);
if(c){c=c.split("|")[0]
}var a=TS.members.getMemberById(c);
if(!a){a=TS.members.getMemberByName(c)
}return a
},makeSureMsgObIsValid:function(a){return a
},api_url_prefix:"api::",doApiUrl:function(b){if(!TS.client){alert("This link will not work in the archives.");
return
}b=b.replace(TS.utility.msgs.api_url_prefix,"");
var f=b.split("?");
var a=f[0];
var h={};
if(f.length>1){var e=f[1].split("&");
for(var g=0;
g<e.length;
g++){var d=e[g].indexOf("=");
if(d!=-1){var c=e[g].substring(0,d);
var j=e[g].substring(d+1);
h[c]=unescape(j)
}}}TS.api.call(a,h)
},new_api_url_prefix:"slack-action://",doNewApiUrl:function(a){if(!TS.client){alert("This link will not work in the archives.");
return
}var c=a.replace(TS.utility.msgs.new_api_url_prefix,"").split("/");
var d=c.shift();
var b=c.join("/");
TS.api.call("chat.action",{bot:d,payload:decodeURIComponent(b)})
},getHighlightWordsRegex:function(){if(!TS.model.highlight_words_regex){TS.utility.msgs.makeHighlightWordsRegex()
}return TS.model.highlight_words_regex
},makeHighlightWordsRegex:function(){var b;
var c=[];
for(var a=0;
a<TS.model.highlight_words.length;
a++){b=TS.format.swapOutAts(TS.model.highlight_words[a]);
b=TS.utility.regexpEscape(b);
if(b=="don"){b+="(?!['’]t)"
}c.push(b)
}TS.model.highlight_words_regex=new RegExp("(\\b|_|\\s|^)("+c.join("|")+")(\\b|_|\\s|$)","i")
},msgContainsMention:function(b,h){var e=TS.utility.msgs.getHighlightWordsRegex();
var f=(b.subtype=="bot_message");
function a(i){if(!i){return false
}if(TS.model.you_regex.test(i)){return true
}if(TS.model.here_regex.test(i)&&!h){return true
}if(TS.model.everyone_regex.test(i)){return true
}if(TS.model.channel_regex.test(i)){return true
}if(TS.model.group_regex.test(i)){return true
}if(TS.boot_data.feature_subteams){for(var l in TS.model.your_user_group_regex){if(TS.model.your_user_group_regex[l].test(i)){return true
}}}if(f){return false
}i=TS.format.swapOutAts(i);
if(e.test(i)){return true
}return false
}if(!b.ignore_if_attachments_supported&&a(b.text)){return true
}var g;
var j;
if(b.attachments){for(var d=0;
d<b.attachments.length;
d++){g=b.attachments[d];
if(g.from_url){continue
}if(a(g.title)){return true
}if(a(g.pretext)){return true
}if(a(g.text)){return true
}if(a(g.footer)){return true
}if(!g.fields||!g.fields.length){continue
}for(var c=0;
c<g.fields.length;
c++){j=g.fields[c];
if(a(j.value)){return true
}}}}return false
},getMsgMentionData:function(b){var h={mentions:false,non_channel_mentions:false};
var e=TS.utility.msgs.getHighlightWordsRegex();
var f=(b.subtype=="bot_message");
function a(i){if(j(i)){h.non_channel_mentions=true;
h.mentions=true;
return true
}if(l(i)){h.mentions=true
}return false
}function j(i){if(!i){return false
}if(TS.model.you_regex.test(i)){return true
}if(f){return false
}i=TS.format.swapOutAts(i);
if(e.test(i)){return true
}return false
}function l(i){if(!i){return false
}if(TS.model.everyone_regex.test(i)){return true
}if(TS.model.channel_regex.test(i)){return true
}if(TS.model.group_regex.test(i)){return true
}return false
}if(!b.ignore_if_attachments_supported&&a(b.text)){return h
}var g;
var k;
if(b.attachments){for(var d=0;
d<b.attachments.length;
d++){g=b.attachments[d];
if(g.from_url){continue
}if(a(g.title)){return h
}if(a(g.pretext)){return h
}if(a(g.text)){return h
}if(a(g.footer)){return h
}if(!g.fields||!g.fields.length){continue
}for(var c=0;
c<g.fields.length;
c++){k=g.fields[c];
if(a(k.value)){return h
}}}}return h
},msgCanCountAsUnread:function(a){if(a.no_display){return false
}if(a.subtype=="channel_join"&&a.inviter&&a.user==TS.model.user.id){return true
}if(a.subtype=="group_join"&&a.inviter&&a.user==TS.model.user.id){return true
}if(a.user==TS.model.user.id){return false
}if(a.subtype=="channel_join"){return false
}if(a.subtype=="channel_leave"){return false
}if(a.subtype=="group_join"){return false
}if(a.subtype=="group_leave"){return false
}if(a.comment&&a.comment.user==TS.model.user.id){return false
}return true
},countAllUnreads:function(){TS.model.all_unread_highlights_cnt=0;
TS.model.all_unread_cnt=0;
var c;
var b;
var d;
var f;
var e;
var a=TS.channels.getChannelsForUser();
for(c=0;
c<a.length;
c++){d=a[c];
if((d.is_archived&&!d.was_archived_this_session)||TS.notifs.isCorGMuted(d.id)){continue
}TS.model.all_unread_cnt+=parseInt(d.unread_cnt)||0;
TS.model.all_unread_highlights_cnt+=parseInt(d.unread_highlight_cnt)||0
}for(c=0;
c<TS.model.groups.length;
c++){f=TS.model.groups[c];
if((f.is_archived&&!f.was_archived_this_session)||TS.notifs.isCorGMuted(f.id)){continue
}TS.model.all_unread_cnt+=parseInt(f.unread_cnt)||0;
TS.model.all_unread_highlights_cnt+=parseInt(f.unread_highlight_cnt)||0
}for(c=0;
c<TS.model.ims.length;
c++){b=TS.model.ims[c];
TS.model.all_unread_cnt+=parseInt(b.unread_cnt)||0;
TS.model.all_unread_highlights_cnt+=parseInt(b.unread_cnt)||0
}if(TS.boot_data.feature_mpim_client){for(c=0;
c<TS.model.mpims.length;
c++){e=TS.model.mpims[c];
TS.model.all_unread_cnt+=parseInt(e.unread_cnt)||0;
TS.model.all_unread_highlights_cnt+=parseInt(e.unread_cnt)||0
}}},doesMsgHaveRxnFromUser:function(b,a){return TS.rxns.doesRxnsHaveRxnFromUser(TS.rxns.getExistingRxnsByKey(b._rxn_key),a)
},doesMsgHaveRxn:function(b,a){return TS.rxns.doesRxnsHaveRxn(TS.rxns.getExistingRxnsByKey(b._rxn_key),a)
},recordEmojiInHash:function(g,e){if(!g){return false
}if(!e){return false
}var f=true;
var a=TS.utility.findAllTeamEmojiInStr(g,f);
if(!a.length){return false
}var d=false;
var b;
for(var c=0;
c<a.length;
c++){b=TS.emoji.isValidName(a[c]);
if(!b){TS.error(a[c]+" invalid");
continue
}if(!parseInt(e[b])){e[b]=0
}e[b]++;
d=true
}return d
},populateEmojiUsePrefFromExistingMsgs:function(){TS.model.emoji_use={};
TS.utility.msgs.countAllExistingEmoji(TS.shared.getAllModelObsForUser(),TS.model.emoji_use,TS.model.user.id,{});
TS.dir(888,TS.model.emoji_use,"TS.model.emoji_use is now:");
TS.utility.callFuncWhenApiQisEmpty(TS.prefs.saveEmojiUse)
},populateEmojiUsePrefFromAllHistory:function(){TS.model.emoji_use={};
var l=TS.model.user.id;
var d=TS.utility.date.makeTsStamp(TS.model.user.created*1000);
var f={};
var g={};
var b=0;
var j=0;
var k=0;
var a=0;
var h=function(){k=0;
a++;
var m=TS.shared.getAllModelObsForUser();
for(var n=0;
n<m.length;
n++){if(g[m[n].id]){continue
}g[m[n].id]=true;
return m[n]
}return null
};
var e=function(m){if(m.is_channel){return"channels.history"
}if(TS.boot_data.feature_mpim_client&&m.is_mpim){return"mpim.history"
}if(m.is_group){return"groups.history"
}if(m.is_im){return"im.history"
}TS.dir(0,m);
throw ("wtf")
};
var i=function(m,n){setTimeout(c,parseInt(TS.qs_args.delay)||3000,m,n)
};
var c=function(m,n){if(!m){TS.log(888,"done getting all messages");
return
}TS.api.call(e(m),{channel:m.id,count:1000,latest:n||""},function(q,r,p){if(!q||!r||!r.messages){TS.error("failed to get history");
i(h());
return
}if(window.stahp){TS.error("stahp");
return
}r.messages.forEach(function(s){b++;
k++;
if(l&&s.user!=l){return
}var t=m.id+"_"+s.ts;
if(f){if(f[t]){return
}f[t]=true
}TS.prefs.recordEmojiUse(s.text);
j++
});
TS.log(888,"getHistory ["+a+" of "+TS.shared.getAllModelObsForUser().length+"] "+m.name+" model_ob:"+k+" total:"+b+" user:"+j);
if(!r.messages.length){TS.error("no data.messages? so moving on");
i(h())
}else{var o=r.messages[r.messages.length-1].ts;
if(o<d){TS.log(888,"oldest_ts:"+o+" < after_ts:"+d+" so moving on");
i(h())
}else{if(r.has_more){i(m,o)
}else{i(h())
}}}})
};
i(h())
},countAllExistingEmoji:function(a,d,c,b){a=a||TS.channels.getChannelsForUser();
d=d||{};
a.forEach(function(e){if(!e.msgs){return
}e.msgs.forEach(function(g){var h=e.id+"_"+g.ts;
if(b){if(b[h]){return
}b[h]=true
}if(TS.boot_data.feature_reactions){var f=TS.rxns.getExistingRxnsByKey(g._rxn_key);
if(f){f.forEach(function(i){if(c&&TS.rxns.doesRxnsHaveRxnFromMember(f,i.name,c)){return
}TS.utility.msgs.recordEmojiInHash(i.name,d)
})
}}if(c&&g.user!=c){return
}TS.utility.msgs.recordEmojiInHash(g.text,d)
})
});
return d
},reCalcAndCountAllUnreads:function(){var c;
var b;
var e;
var d;
var f;
var a=TS.channels.getChannelsForUser();
for(c=0;
c<a.length;
c++){d=a[c];
if(d.is_archived&&!d.was_archived_this_session){continue
}TS.channels.calcUnreadCnts(d)
}for(c=0;
c<TS.model.groups.length;
c++){f=TS.model.groups[c];
if(f.is_archived&&!f.was_archived_this_session){continue
}TS.groups.calcUnreadCnts(f)
}for(c=0;
c<TS.model.ims.length;
c++){b=TS.model.ims[c];
TS.ims.calcUnreadCnts(b)
}if(TS.boot_data.feature_mpim_client){for(c=0;
c<TS.model.mpims.length;
c++){e=TS.model.mpims[c];
TS.mpims.calcUnreadCnts(e)
}}TS.utility.msgs.countAllUnreads()
},whatisunread:function(){var c;
var b;
var e;
var d;
var f;
var a=[];
for(c=0;
c<TS.model.channels.length;
c++){d=TS.model.channels[c];
if(d.unread_cnt){a.push("C:"+d.name+" "+d.unread_cnt)
}}for(c=0;
c<TS.model.groups.length;
c++){f=TS.model.groups[c];
if(f.unread_cnt){a.push("G:"+f.name+" "+f.unread_cnt)
}}for(c=0;
c<TS.model.ims.length;
c++){b=TS.model.ims[c];
if(b.unread_cnt){a.push("D:"+b.name+" "+b.unread_cnt)
}}if(TS.boot_data.feature_mpim_client){for(c=0;
c<TS.model.mpims.length;
c++){e=TS.model.mpims[c];
if(e.unread_cnt){a.push("G:"+e.name+" "+e.unread_cnt)
}}}TS.info("unreads: "+a.join(","))
},maybeSetOldestMsgsTsAfterMsgAdded:function(a){if(a.oldest_msg_ts){return
}if(a.latest){return
}TS.utility.msgs.setOldestMsgsTs(a)
},setOldestMsgsTs:function(a){var b=TS.utility.msgs.getOldestValidTs(a.msgs);
if(b){a.oldest_msg_ts=b;
TS.storage.storeOldestTs(a.id,a.oldest_msg_ts)
}},getOlderMsgsStatus:function(b){var g=b.msgs;
var c=b.oldest_msg_ts;
var a=TS.shared.getLatestMsgTs(b)||null;
var f=false;
var h="ERROR";
var e=false;
var d=0;
if(c&&TS.utility.msgs.getMsg(c,g)){f=true
}if(!a){if(g.length){e=false;
d=1;
h="There are NOT older messages than these."
}else{e=false;
d=2;
h="THIS IS A BRAND NEW CHANNEL SAY SOMETHING"
}}else{if(f||b.is_limited){e=false;
d=3;
h="We have the oldest msg: "+c+". is_limited:"+b.is_limited
}else{e=true;
d=4;
if(c){h="There are older messages than these. oldest_msg_ts: "+c
}else{h="There are older messages than these. oldest_msg_ts: unknown"
}}}return{text:h,more:e,code:d,is_limited:b.is_limited}
},getMostRecentValidTs:function(b){var c;
for(var a=0;
a<b.length;
a++){c=b[a];
if(!TS.utility.msgs.isTempMsg(c)){return c.ts
}}return null
},getOldestValidTs:function(b){var c;
for(var a=b.length-1;
a>-1;
a--){c=b[a];
if(!TS.utility.msgs.isTempMsg(c)){return c.ts
}}return null
},getHistoryFetchJobKey:function(a,b){var c=a;
if(b){c+="_"+b
}return c
},processImsg:function(a,b){TS.utility.msgs._slurpExtraData(a,b);
return TS.utility.msgs._makeInternalMsgObject(a,b)
},processImsgFromHistory:function(a,b){var c=TS.utility.msgs.processImsg(a,b);
a.channel=b;
if(a.subtype=="message_deleted"){TS.ms.msg_handlers.subtype__message_deleted(a)
}else{if(a.subtype=="message_changed"){TS.ms.msg_handlers.subtype__message_changed(a)
}}return c
},_makeInternalMsgObject:function(i,j){var h={type:"message",ts:i.ts};
if(i.type=="channel_topic"||i.type=="channel_purpose"||i.type=="channel_join"||i.type=="channel_leave"){i.subtype=i.type
}if(i.subtype=="group_join"||i.subtype=="group_purpose"||i.subtype=="group_topic"){var c=TS.shared.getModelObById(j);
if(c&&c.is_mpim){h.no_display=true
}}if(i.inviter){h.inviter=i.inviter
}if(i.hidden){h.hidden=i.hidden
}if(i.no_notifications){h.no_notifications=i.no_notifications
}if(i.ignore_if_attachments_supported){h.ignore_if_attachments_supported=i.ignore_if_attachments_supported
}if(i.hidden||i.no_display){h.no_display=true
}if(i.ignore_if_attachments_supported&&(!i.attachments||!i.attachments.length)){h.no_display=true
}if(i.edited){h.edited=i.edited
}if(i.user){h.user=i.user
}if(i.attachments){h.attachments=i.attachments
}if(i.img_vids){h.img_vids=i.img_vids
}var b;
if(i.imgs){h.img_vids=h.img_vids||{};
var f;
for(b in i.imgs){if(h.img_vids[b]){continue
}f=i.imgs[b];
f.img_vid_type="img";
h.img_vids[b]=f
}}if(i.videos){h.img_vids=h.img_vids||{};
var d;
for(b in i.videos){if(h.img_vids[b]){continue
}d=i.videos[b];
d.img_vid_type="video";
h.img_vids[b]=d
}}if(i.icons){h.icons=i.icons
}if(i.bot_id){h.bot_id=i.bot_id
}if(i.is_ephemeral){h.is_ephemeral=i.is_ephemeral
}if(i._alert_even_though_temp){h._alert_even_though_temp=i._alert_even_though_temp
}if(i.is_starred){h.is_starred=i.is_starred
}if(i.reactions){delete i.reactions
}if(i._rxn_key){h._rxn_key=i._rxn_key
}if(i.pinned_to){h.pinned_to=i.pinned_to
}if(i.topic){h.topic=i.topic
}if(i.name){h.name=i.name
}if(i.old_name){h.old_name=i.old_name
}if(i.purpose){h.purpose=i.purpose
}if(i.text){h.text=i.text
}if(i.sound){h.sound=i.sound
}if("mrkdwn" in i){h.mrkdwn=!!i.mrkdwn
}if("hex_swatches" in i){h.hex_swatches=!!i.hex_swatches
}if(i.subtype){h.subtype=i.subtype;
if(h.subtype=="bot_message"){if(i.username){h.username=i.username
}}if(i.subtype=="sh_room_created"||i.subtype=="sh_room_shared"){if(i._room_id){h._room_id=i._room_id
}else{if(i.room){var a=TS.rooms.getRoomById(i.room.id);
if(a){h._room_id=a.id
}else{TS.error("no room, no_display = true "+h.ts);
h.no_display=true
}}else{h.no_display=true
}}}if(i.subtype=="file_share"||i.subtype=="file_mention"||i.subtype=="file_comment"){if(i.upload){h.upload=true
}if(i.file){var e=TS.files.getFileById(i.file.id);
if(e){h.file=e
}else{TS.error("no file, no_display = true "+h.ts);
h.no_display=true
}}else{h.no_display=true
}if(i.subtype=="file_comment"){if(i.comment){if(h.file){h.comment=TS.files.addCommentToFile(i.comment,h.file)
}else{h.comment=i.comment
}}else{h.no_display=true
}}}if(i.subtype==="pinned_item"){if(i.item_type){h.item_type=i.item_type
}if(i.item_type==="F"){if(i.item){var g=TS.files.getFileById(i.item.id);
h.item=g
}}else{if(i.item_type==="Fc"||i.item_type==="C"||i.item_type==="G"){h.item=i.item
}else{h.no_display=true
}}}}return h
},fetchInitialMsgsFromLS:function(b){var c=TS.storage.fetchMsgs(b.id);
var a=TS.model.initial_msgs_cnt;
if(c.length>a){c.length=a
}return c
},processAttachments:function(a){if(!a){return
}var g;
for(var e=0;
e<a.length;
e++){g=a[e];
if(!g){TS.warn("attachment is null!");
continue
}if(g.slack_file_id&&!g._slack_file_is_deleted){var d=TS.files.getFileById(g.slack_file_id);
if(d){g._slack_file=d
}else{if(g._slack_file){g._slack_file=TS.files.upsertFile(g._slack_file).file
}}}if(g.mrkdwn_in&&$.isArray(g.mrkdwn_in)&&g.mrkdwn_in.length){g.mrkdwn_in_hash={};
for(var b=0;
b<g.mrkdwn_in.length;
b++){g.mrkdwn_in_hash[g.mrkdwn_in[b]]=true
}}if(!g.mrkdwn_in_hash){g.mrkdwn_in_hash={}
}delete g.mrkdwn_in;
g.hex_swatches=!!g.hex_swatches;
if(g.audio_html||g.audio_url){TS.inline_audios.makeInternalInlineAudio(g.audio_html||g.audio_url,g)
}if(g.other_html){TS.inline_others.makeInternalInlineOther(g)
}else{if(g.video_html){var c=(g.video_html_width&&parseInt(g.video_html_width)>parseInt(g.thumb_width))?g.video_html_width:g.thumb_width;
var f=(g.video_html_height&&parseInt(g.video_html_height)>parseInt(g.thumb_height))?g.video_html_height:g.thumb_height;
TS.inline_videos.makeInternalInlineVideo(g.from_url||g.thumb_url,{title:g.title,html:g.video_html,thumbnail:{url:g.thumb_url,width:c,height:f,link_url:g.from_url||g.title_url}})
}else{if(g.image_url){TS.inline_imgs.makeInternalInlineImg(g.from_url||g.image_url,{src:g.image_url,width:g.image_width,height:g.image_height,link_url:g.from_url||g.title_url||g.image_url,bytes:g.image_bytes})
}else{if(g.from_url){TS.inline_attachments.makeInternalInlineAttachment(g.from_url,g)
}}}}TS.inline_attachments.massageAttachment(g,e)
}},_slurpExtraData:function(a,d){TS.utility.msgs.processAttachments(a.attachments);
if(TS.boot_data.feature_reactions){a._rxn_key=TS.rxns.getRxnKey("message",a.ts,d);
if(a.reactions){TS.rxns.upsertRxnsFromDataAndUpdateUI(a._rxn_key,a.reactions);
delete a.reactions
}}var b;
if(a.img_vids){var e;
for(b in a.img_vids){e=a.img_vids[b];
if(e.img_vid_type=="img"){TS.inline_imgs.makeInternalInlineImg(b,e)
}else{if(e.img_vid_type=="video"){TS.inline_videos.makeInternalInlineVideo(b,e)
}}}}if(a.imgs){for(b in a.imgs){a.imgs[b].from_url=b;
TS.inline_imgs.makeInternalInlineImg(b,a.imgs[b])
}}if(a.videos){for(b in a.videos){a.videos[b].from_url=b;
TS.inline_videos.makeInternalInlineVideo(b,a.videos[b])
}}if(a.subtype=="file_share"||a.subtype=="file_mention"||a.subtype=="file_comment"){if(a.file&&!a.file.id){TS.error("WTF no file id on file in imsg.subtype:"+a.subtype+" "+a.ts)
}else{if(a.file){TS.files.upsertAndSignal(a.file);
if(a.subtype=="file_share"||a.subtype=="file_mention"){}if(a.subtype=="file_comment"){if(a.comment){var c=TS.files.getFileById(a.file.id);
if(c){TS.files.addCommentToFile(a.comment,c)
}else{TS.warn("WTF no file? id:"+a.file.id)
}}else{TS.error("WTF no comment in imsg.subtype:"+a.subtype+" "+a.ts)
}}}else{}}}if(a.subtype=="sh_room_created"||a.subtype=="sh_room_shared"){if(a.room&&!a.room.id){TS.error("WTF no room id on room in imsg.subtype:"+a.subtype+" "+a.ts)
}else{if(a.room){TS.rooms.upsertAndSignal(a.room)
}else{TS.error("WTF no room on imsg.subtype:"+a.subtype+" "+a.ts)
}}}if(a.subtype=="pinned_item"){if(a.item_type==="F"&&a.item&&a.item.id&&!a.item.is_deleted){TS.files.upsertAndSignal(a.item)
}}},constructMsgPermalink:function(a,b){if(a.is_im||a.is_mpim){return"/archives/"+a.id+"/p"+b.replace(".","")
}return"/archives/"+a.name+"/p"+b.replace(".","")
},isTempMsg:function(a){return(!a.ts||a.ts.indexOf(TS.utility.date.fake_ts_unique_padder)>-1)
},shouldMarkUnreadsOnMessageFetch:function(){if(TS.qs_args.no_unread_marking_on_msgs_fetch=="1"){return false
}return true
},ipsum:function(){var a=["Now that we know who you are, I know who I am.","I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero.","And most times they're friends, like you and me! I should've known way back when… You know why, David? Because of the kids.","They called me Mr Glass.","Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you.","But I can't give you this case, it don't belong to me.","Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.","Now that there is the Tec-9, a crappy spray gun from South Miami.","This gun is advertised as the most popular gun in American crime.","Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime.","Like they're actually proud of that shit.","Now that there is the Tec-9, a crappy spray gun from South Miami.","This gun is advertised as the most popular gun in American crime.","Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime.","Like they're actually proud of that shit.","Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks.","Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?","You think water moves fast? You should see ice.","It moves like it has a mind.","Like it knows it killed the world once and got a taste for murder.","After the avalanche, it took us a week to climb out.","Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide… and only five made it out.","Now we took an oath, that I'm breaking now.","We said we'd say it was the snow that killed the other two, but it wasn't.","Nature is lethal but it doesn't hold a candle to man."];
return a
},removeFileSharesAndMentions:function(b,d){if(!TS.client){return
}var e=b.msgs;
var a;
for(var c=e.length-1;
c>-1;
c--){a=e[c];
if((a.subtype=="file_share"||a.subtype=="file_mention")&&a.file&&a.file.id==d.id){if(b.is_channel){TS.channels.removeMsg(b.id,a)
}else{if(TS.boot_data.feature_mpim_client&&b.is_mpim){TS.mpims.removeMsg(b.id,a)
}else{if(b.is_group){TS.groups.removeMsg(b.id,a)
}else{TS.ims.removeMsg(b.id,a)
}}}}}},removeFileComments:function(b,d){if(!TS.client){return
}var e=b.msgs;
var a;
for(var c=e.length-1;
c>-1;
c--){a=e[c];
if(a.subtype=="file_comment"&&a.file&&a.file.id==d.id){if(b.is_channel){TS.channels.removeMsg(b.id,a)
}else{if(TS.boot_data.feature_mpim_client&&b.is_mpim){TS.mpims.removeMsg(b.id,a)
}else{if(b.is_group){TS.groups.removeMsg(b.id,a)
}else{TS.ims.removeMsg(b.id,a)
}}}}}},removeFileReferences:function(b,e){if(!TS.client){return
}var f=b.msgs;
var a;
for(var d=f.length-1;
d>-1;
d--){a=f[d];
if(a.attachments){var c=TS.inline_attachments.getAttachmentBySlackFileId(a.attachments,e);
if(c&&!c._slack_file_is_deleted){c._slack_file_is_deleted=true;
delete c._slack_file;
if(b.id==TS.model.active_im_id){TS.ims.message_changed_sig.dispatch(b,a)
}else{if(b.id==TS.model.active_channel_id){TS.channels.message_changed_sig.dispatch(b,a)
}else{if(b.id==TS.model.active_group_id){TS.groups.message_changed_sig.dispatch(b,a)
}else{if(b.id==TS.model.active_mpim_id){TS.mpims.message_changed_sig.dispatch(b,a)
}}}}TS.utility.msgs.maybeStoreMsgs(b.id,f)
}}}},updateFileMsgs:function(b,d){var f=b.msgs;
var a;
var e=function(g){if(!g){return false
}if(!g.attachments){return false
}if(!g.attachments.length){return false
}if(TS.inline_attachments.getAttachmentBySlackFileId(g.attachments,d.id)){return true
}return false
};
for(var c=f.length-1;
c>-1;
c--){a=f[c];
if(!d.is_deleted&&(a.subtype=="file_share"||a.subtype=="file_mention"||a.subtype=="file_comment")&&a.file&&a.file.id==d.id){}else{if(e(a)){}else{continue
}}if(b.id==TS.model.active_im_id){TS.ims.message_changed_sig.dispatch(b,a)
}else{if(b.id==TS.model.active_channel_id){TS.channels.message_changed_sig.dispatch(b,a)
}else{if(b.id==TS.model.active_group_id){TS.groups.message_changed_sig.dispatch(b,a)
}else{if(b.id==TS.model.active_mpim_id){TS.mpims.message_changed_sig.dispatch(b,a)
}}}}}},tryToEditLastMsgFromShortcut:function(c){var a=TS.shared.getActiveModelOb();
if(!a){return
}var e=TS.utility.msgs.getEditableMsgByProp("user",TS.model.user.id,a.msgs);
if(!e){TS.sounds.play("beep");
alert("Found no recent messages from you to edit :(");
return
}var d=TS.format.unFormatMsg(e.text,e);
var b=TS.utility.msgs.wordReplace(d,c);
if(d==b){TS.sounds.play("beep");
return
}TS.msg_edit.commitEdit(e,TS.shared.getActiveModelOb(),b)
},getEditLastShortcutCmd:function(b){var e=b.split("/");
if(e.length!=5&&e.length!=4){return
}if(e[1]!="s"){return
}var f=e[2];
var a=e[3];
var d=e.length==5&&(e[4]=="g"||e[4]=="gi"||e[4]=="ig");
var c=e.length==5&&(e[4]=="i"||e[4]=="gi"||e[4]=="ig");
if(!f){return
}return{str:f,rpl:a,g:d,i:c}
},wordReplace:function(e,d){if(!d){return e
}var f=(d.g?"g":"")+(d.i?"i":"");
var a="[\\s\\n\\r\\t.,'\"+!?\\-_|]";
var c=TS.utility.regexpEscape(d.str);
var b=new RegExp("(^|"+a+"+)(?:"+c+")(?="+a+"+|$)",f);
return e.replace(b,"$1"+d.rpl)
},maybeTruncateMsgs:function(b){if(!b){return
}if(!b.msgs){return
}if(!b.msgs.length){return
}if(!TS.model.active_cid||!TS.shared.getActiveModelOb()){return
}var l=TS.model.initial_msgs_cnt+1;
var i=Math.min(TS.model.hard_msg_limit,l*2);
var f=1000;
var g=0;
var d=1000*20;
var j=b.msgs;
var k=TS.utility.msgs.getDisplayedMsgs(j);
var c=Date.now();
var h=(b.has_fetched_history_after_scrollback)?c-b.fetched_history_after_scrollback_time:c;
if(k.length>i&&(b.id!=TS.shared.getActiveModelOb().id||(b.scroll_top<f&&h>d))){l=i
}else{if(k.length-50<=l){return
}if(b.last_made_active){var e=c-b.last_made_active;
if(e<g){return
}}if(!TS.boot_data.feature_no_unread_counts){if(b.unread_cnt&&b.unread_count&&!b.all_read_this_session_once){return
}}if(b.scroll_top!=-1){return
}}if(b.history_is_being_fetched){return
}var a=[];
while(TS.utility.msgs.getDisplayedMsgs(j).length>l){a.push(j.pop())
}if(b.id==TS.model.active_channel_id){TS.view.removeMsgsAfterTruncation(a)
}TS.storage.storeMsgs(b.id,TS.utility.msgs.prepareMsgsForLS(j,b.id))
},checkForMsgsToTruncate:function(){if(!TS.model){return
}if(!TS.model.channels){return
}var d=TS.model.channels;
var e;
var c;
for(c=0;
c<d.length;
c++){e=d[c];
if(e.id==TS.model.active_channel_id){continue
}if(!e.is_member){continue
}if(e.is_archived){continue
}TS.utility.msgs.maybeTruncateMsgs(e)
}var j=TS.model.ims;
var g;
for(c=0;
c<j.length;
c++){g=j[c];
if(g.id==TS.model.active_im_id){continue
}TS.utility.msgs.maybeTruncateMsgs(g)
}var a=TS.model.groups;
var h;
for(c=0;
c<a.length;
c++){h=a[c];
if(h.id==TS.model.active_group_id){continue
}if(h.is_archived){continue
}TS.utility.msgs.maybeTruncateMsgs(h)
}if(TS.boot_data.feature_mpim_client){var b=TS.model.mpims;
var f;
for(c=0;
c<b.length;
c++){f=b[c];
if(f.id==TS.model.active_mpim_id){continue
}TS.utility.msgs.maybeTruncateMsgs(f)
}}},getEphemeralMsgsByCidAndType:function(e,c){var g;
var d;
var a=[];
var b=TS.shared.getModelObById(e);
if(!b){return a
}for(var f in TS.utility.msgs.ephemeral_msgs_map){d=TS.utility.msgs.ephemeral_msgs_map[f];
if(d.ephemeral_type==c&&d.c_id==e){g=TS.utility.msgs.getMsg(f,b.msgs);
if(!g){continue
}a.push(g)
}}return a
},removeAllEphemeralMsgsByType:function(b,d){var a;
var c;
var f;
for(var e in TS.utility.msgs.ephemeral_msgs_map){c=TS.utility.msgs.ephemeral_msgs_map[e];
if(c.ephemeral_type==b){if(d&&d!=c.c_id){continue
}a=TS.shared.getModelObById(c.c_id);
if(!a){continue
}f=TS.utility.msgs.getMsg(e,a.msgs);
if(!f){continue
}if(a.is_im){TS.ims.removeMsg(a.id,f)
}else{if(a.is_channel){TS.channels.removeMsg(a.id,f)
}else{if(TS.boot_data.feature_mpim_client&&a.is_mpim){TS.mpims.removeMsg(a.id,f)
}else{if(a.is_group){TS.groups.removeMsg(a.id,f)
}}}}delete TS.utility.msgs.ephemeral_msgs_map[e]
}}},prepareMsgsForLS:function(h,j){if(!h){return h
}var l=[];
var g;
var c;
var b;
var a;
var e;
var d;
for(var f=0;
f<h.length;
f++){c=h[f];
g={};
l.push(g);
for(e in c){if(e=="file"&&c.file){g.file={};
for(d in c.file){if(d=="content"){continue
}if(d=="content_html"){continue
}if(d=="simplified_html"){continue
}if(d=="content_highlight_html"){continue
}if(d=="comments"){continue
}if(d=="_rxn_key"){b=TS.boot_data.feature_reactions&&TS.rxns.getExistingRxnsByKey(c.file._rxn_key);
if(b){g.file.reactions=b
}}g.file[d]=c.file[d]
}}else{if(e=="comment"&&c.comment){g.comment={};
for(d in c.comment){if(d=="_rxn_key"){b=TS.boot_data.feature_reactions&&TS.rxns.getExistingRxnsByKey(c.comment._rxn_key);
if(b){g.comment.reactions=b
}}g.comment[d]=c.comment[d]
}}else{if(e=="_room_id"){a=TS.rooms.getRoomById(c._room_id);
if(a){g.room=a
}}else{if(e=="_rxn_key"){b=TS.rxns.getExistingRxnsByKey(c._rxn_key);
if(b){g.reactions=b
}}else{g[e]=c[e]
}}}}}}return l
},hasImgs:function(d){if(!d){return false
}if(d.img_vids){var c;
var a;
for(a in d.img_vids){c=d.img_vids[a];
if(c.img_vid_type=="img"){return true
}}}else{if(d.attachments){for(var b=0;
b<d.attachments.length;
b++){if(d.attachments[b].image_url){return true
}}}}return false
},ingestMessagesFromBootData:function(b){if(!TS.boot_data.msgs){return
}var e=TS.boot_data.msgs[b.id];
var a=[];
if(e){var c;
for(var d=0;
d<e.length;
d++){c=e[d];
if(!c.ts){continue
}a.push(TS.utility.msgs.processImsg(c,b.id))
}}TS.utility.msgs.setMsgs(b,a)
},handleSearchHighlights:function(a){a=a.replace(/\ue000/g,'<span class="match">').replace(/\ue001/g,"</span>");
return a
},findAllMsgsBySubtype:function(d){var f;
var a;
var c;
var b=TS.channels.getChannelsForUser().concat(TS.model.ims.concat(TS.model.groups));
var e={};
for(f=0;
f<b.length;
f++){c=b[f];
if(!c.msgs){continue
}for(a=0;
a<c.msgs.length;
a++){if(d!=c.msgs[a].subtype){continue
}e[c.name]=e[c.name]||{id:c.id};
e[c.name]["msg_index_"+a]=c.msgs[a]
}}TS.info(JSON.stringify(e,null,"\t"))
},isMessageUserHidden:function(a){if(a.user){return TS.model.user_hiddens.indexOf(a.user)>-1
}if(a.bot_id){return TS.model.user_hiddens.indexOf(a.bot_id)>-1
}if(a.username){return TS.model.user_hiddens.indexOf(a.username)>-1
}},hideMessagesFrom:function(b){var a=TS.model.user_hiddens.indexOf(b);
if(a==-1){TS.model.user_hiddens.push(b)
}if(TS.client){TS.client.msg_pane.rebuildMsgs()
}if(TS.web){TS.web.channel.renderMsgs(TS.shared.getActiveModelOb())
}},unHideMessagesFrom:function(b){var a=TS.model.user_hiddens.indexOf(b);
if(a>-1){TS.model.user_hiddens.splice(a,1)
}if(TS.client){TS.client.msg_pane.rebuildMsgs()
}if(TS.web){TS.web.channel.renderMsgs(TS.shared.getActiveModelOb())
}},handleFailedMsgSend:function(c,a,d){var b=TS.utility.msgs.getMsg(c,a.msgs);
if(b){if(a.is_channel){TS.channels.removeMsg(a.id,b);
if(d){TS.channels.sendMsg(a.id,TS.format.unFormatMsg(b.text,b))
}}else{if(TS.boot_data.feature_mpim_client&&a.is_mpim){TS.mpims.removeMsg(a.id,b);
if(d){TS.mpims.sendMsg(a.id,TS.format.unFormatMsg(b.text,b))
}}else{if(a.is_group){TS.groups.removeMsg(a.id,b);
if(d){TS.groups.sendMsg(a.id,TS.format.unFormatMsg(b.text,b))
}}else{TS.ims.removeMsg(a.id,b);
if(d){TS.ims.sendMsg(a.id,TS.format.unFormatMsg(b.text,b))
}}}}delete TS.model.unsent_msgs[b.ts];
delete TS.model.display_unsent_msgs[b.ts]
}else{TS.error("no msg?: "+c)
}},msgMightBeRolledUp:function(a){return(a.subtype&&TS.model.join_leave_subtypes.indexOf(a.subtype)!=-1)
},msgRollUpWorker:function(e,h,f,d){delete h._jl_rollup_hash;
delete h._jl_rolled_up_in;
if(!TS.utility.msgs.msgMightBeRolledUp(h)){return
}d.push(h);
if(e!==0&&TS.utility.msgs.msgMightBeRolledUp(f[e-1])){return"continue"
}else{var g=d[0]._jl_rollup_hash={msg_ids:[],users:{}};
var c;
for(var a=0;
a<d.length;
a++){c=d[a];
var b=g.users[c.user]=(g.users[c.user]||{});
g.msg_ids.push(c.ts);
c._jl_rolled_up_in=d[0].ts;
if(c.subtype=="channel_join"||c.subtype=="group_join"){b.inviter=c.inviter;
b.joined=true;
b.is_in=true
}else{if(c.subtype=="channel_leave"||c.subtype=="group_leave"){b.left=true;
b.is_in=false
}}}return"swap"
}},shouldHaveBotLabel:function(a,b){return(a.subtype&&a.subtype=="bot_message"&&a.username!="slackbot")||(b&&b.is_bot&&!b.is_slackbot)
},maybeStoreMsgsForMany:function(c){if(!c){return
}var b;
var a;
c=TS.utility.dedupeArray(c);
for(b=0;
b<c.length;
b++){a=TS.shared.getModelObById(c[b]);
if(a&&(!a.is_channel||a.is_member)&&a.msgs&&a.msgs.length){TS.utility.msgs.maybeStoreMsgs(a.id,a.msgs)
}}}})
})();
(function(){TS.registerModule("utility",{keymap:{alt:18,ctrl:17,cmd_ff:224,cmd_other:91,cmd_right:93,esc:27,shift:16,tab:9,del:8,enter:13,left:37,up:38,right:39,down:40,pageup:33,pagedown:34,end:35,home:36,space:32,semicolon:59,equals_sign:187,minus_sign:189,comma:188,period:190,left_square_bracket:219,right_square_bracket:221,V:86,insert:45},keymap_reverse:{"18":"alt","17":"ctrl","224":"cmd_ff","91":"cmd_other","93":"cmd_right","27":"esc","16":"shift","9":"tab","8":"del","13":"enter","37":"left","38":"up","39":"right","40":"down","187":"equals_sign","189":"minus_sign","188":"comma","190":"period","219":"left_square_bracket","221":"right_square_bracket","86":"V","45":"insert"},email_regex:new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$","i"),onStart:function(){},isRetina:function(j){j=j||window;
return("devicePixelRatio" in j&&j.devicePixelRatio>1)
},regexpEscape:function(k,j){k=k||"";
j=j||500000;
j=Math.min(j,500000);
if(k.length>j){k=k.substr(0,j)
}return k.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},randomInt:function(k,j){k=parseInt(k);
j=parseInt(j);
return k+Math.floor(Math.random()*(1+j-k))
},compactArray:function(j){return j.filter(Boolean)
},randomFromArray:function(j){return j[TS.utility.randomInt(0,j.length-1)]
},removeFromArray:function(j,l){var k=j.indexOf(l);
if(k==-1){return false
}j.splice(k,1);
return true
},ensureInArray:function(j,k){if(j.indexOf(k)>-1){return false
}j.push(k);
return true
},doRectsOverlap:function(k,j){return !(j.left>k.right||j.right<k.left||j.top>k.bottom||j.bottom<k.top)
},getObjectWithPropValueFromArray:function(m,l,j){if(!j){return null
}if(!j.length){return null
}if(!m){return null
}for(var k in j){if(j[k]&&j[k].hasOwnProperty(m)&&j[k][m]===l){return j[k]
}}return null
},doesRectContainRect:function(l,j,k,m){k=k||0;
if(j.top<l.top-k){return false
}if(j.bottom>l.bottom+k){return false
}if(m){return true
}if(j.left<l.left-k){return false
}if(j.right>l.right+k){return false
}return true
},clamp:function(l,k,j){return Math.max(k,Math.min(j,l))
},inArray:function(j,k){if(!j){return false
}if(!k&&k!==0){return false
}for(var l=0;
l<j.length;
l++){if(j[l]==k){return true
}}return false
},shouldLinksHaveTargets:function(){return !!(TS.client||(TS.web&&TS.web.space))
},clone:function(j){if(j===null){return j
}return JSON.parse(JSON.stringify(j))
},padNumber:function(l,k,j){j=(j||"0").toString();
var m=l.toString();
while(m.length<k){m=j+m
}return m
},ordinalNumber:function(j){j=j.toString();
var k=j.substr(-(Math.min(j.length,2)))>3&&j.substr(-(Math.min(j.length,2)))<21?"th":["th","st","nd","rd","th"][Math.min(Number(j)%10,4)];
return j+k
},getChannelNameFromUrl:function(j){var k=TS.utility._getPathAFromUrl(j);
if(k&&k.length>0){return decodeURIComponent(k[0])
}return""
},getFlexNameFromUrl:function(j){var k=TS.utility._getPathAFromUrl(j);
if(k&&k.length>1){return decodeURIComponent(k[1])
}return""
},getFlexExtraFromUrl:function(j){var k=TS.utility._getPathAFromUrl(j);
if(k&&k.length>2){var l=k[2];
l=decodeURIComponent(l);
l=l.replace(/%2F/g,"/");
return l
}return""
},_getPathAFromUrl:function(k){if(k.indexOf("/messages/")==-1){return null
}var j=k.split("/messages/");
var m=j[1].split("?");
var l=m[0].split("/");
return l
},refashionUrl:function(j,m,n,r){var q=j.split(/\.com\/+messages/);
var k=q[0]+".com";
var o=q[1].split("?");
var l=o[0].split("/");
var p=(o[1])?"?"+o[1]:"";
l.length=2;
l[0]=m;
l[1]=n;
if(r){l.length=3;
l[2]=r
}if(!l[1]){l.length=1
}return k+"/messages/"+l.join("/")+"/"+p
},dataURItoBlob:function(j){return TS.utility.base64StrtoBlob(TS.utility.base64StrFromDataURI(j))
},base64StrFromDataURI:function(j){return j.split(",")[1]
},base64StrtoBlob:function(o){var p=atob(o);
var l=new ArrayBuffer(p.length);
var m=new Uint8Array(l);
for(var k=0;
k<p.length;
k++){m[k]=p.charCodeAt(k)
}var n=new DataView(l);
var j=new Blob([n]);
return j
},ellipsize:function(m,j){if(!m){return m
}if(!j||!parseInt(j)){j=50
}if(m.length>j){var k=m.substr(0,j/2);
var l=m.substr(-(j/2),m.length);
m=k+"..."+l
}return m
},makeSafeForDomId:function(j){return j.replace(/\./g,"_")
},makeSafeForDomClass:function(j){return j.replace(/\s/g,"_")
},getImageIconClass:function(n,j){var k=j;
var m=80;
var l=80;
if(n&&(n.thumb_360_w<m||n.thumb_360_h<l)){if(n.thumb_360_w>n.thumb_360_h){k="landscape"
}else{if(n.thumb_360_w<n.thumb_360_h){k="portrait"
}else{k="square"
}}}return k
},convertFilesize:function(k){k=parseInt(k);
if(k===0){return"0 bytes"
}var j=["b","KB","MB","GB"];
var l=parseInt(Math.floor(Math.log(k)/Math.log(1024)));
var m=k/Math.pow(1024,l);
var n=Math.round(m,2);
if(n>999){n=1;
l++
}return n+j[l]
},numberWithCommas:function(j){if(j===undefined){return""
}var k=j.toString().split(".");
k[0]=k[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
return k.join(".")
},numberWithK:function(j){if(j>999){j=Math.round((j/1000)*10)/10;
return TS.utility.numberWithCommas(j)+"K"
}else{return TS.utility.numberWithCommas(j)
}},cleanChannelName:function(j){j=j.toLowerCase();
while(j.substr(0,1)=="#"){j=j.substr(1)
}j=j.replace(/ /g,"-");
j=j.replace(/[^a-z0-9-_]/g,"_");
j=j.replace(/\-+/g,"-");
j=j.replace(/\_+/g,"_");
return j
},openInNewTab:function(j,q){j=TS.utility.htmlEntities(j);
if(j.indexOf("/")===0&&TS.boot_data.team_url){var r=TS.boot_data.team_url;
r=r.substr(0,r.length-1);
j=r+j
}var m=j;
var p="";
if(TS.utility.urlNeedsRefererHiding(j)){p='<input type="hidden" name="url" value="'+TS.utility.htmlEntities(j)+'">';
m=(TS.boot_data.feature_referer_policy?"https://":"http://")+TS.boot_data.redir_domain+"/link"
}else{var k=m.indexOf("?");
if(k!==-1){var s=m.substring(k+1,m.length);
m=m.substring(0,k);
if(s.length){var l=s.split("&");
for(var o=0;
o<l.length;
o++){var n=l[o].split("=");
p+='<input type="hidden" name="'+TS.utility.htmlEntities(n[0])+'" value="'+(n.length>1?TS.utility.htmlEntities(n[1]):"")+'">'
}}}}$("<form>"+p+"</form>").attr({method:"GET",action:m,target:q}).appendTo("body").submit().remove()
},isScalar:function(j){return(/boolean|number|string/).test(typeof j)
},getAttributesFromHTMLString:function(l){var n=new DOMParser();
var m=n.parseFromString(l,"text/html");
var j=m.body;
if(j.children.length!=1){return{}
}var k={};
[].slice.apply(j.children[0].attributes).forEach(function(o){k[o.name]=o.value
});
return k
},replaceUrls:function(j,k){return j.toString().replace(g,k)
},findUrls:function(j){return j.match(g)||[]
},linkify:function(k,m,l,j){if(!k){return k
}k=TS.utility.replaceUrls(k,function(n){var o;
if(n.toLowerCase().indexOf("www.")===0){if(!l){return n
}o="http://"+n
}else{o=n
}if(j){return"<"+o+"|"+n+">"
}else{return"<a "+TS.utility.makeRefererSafeLink(o)+' target="'+(m||"")+'">'+n+"</a>"
}});
return k
},linkifyInternal:function(j,k){return TS.utility.linkify(j,"",k,true)
},cssCalcSupported:function(){if(c!==null){return c
}var j=$('<div style="visibility:hidden; height:-webkit-calc(1px + 1em); height:-moz-calc(1px + 1em); height:calc(1px + 1em);"></div>').appendTo(document.body);
c=(j.height()>0);
j.remove();
return c
},cssPropertySupported:function(n){var l=document.createElement("css_property_supported").style;
var j=["-webkit-","-moz-","-o-","-ms-",""];
var k=["Webkit","Moz","O","ms",""];
var p=new RegExp("^(-*"+j.slice(0,j.length-1).join("|-*")+")");
var o=new RegExp("^("+k.slice(0,k.length-1).join("|")+")");
n=n.replace(o,"").replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").replace(p,"").toLowerCase();
n=TS.utility.camelCaseStringBySeparator(n,"-");
var m=TS.utility.capitalize(n);
if(l[n]!==undefined){return true
}return k.some(function(q){return(l[q+m]!==undefined||l[q+n]!==undefined)
})
},getCursorPosition:function(j){var l,n,m,k;
l=$(j).get(0);
n=0;
if("selectionStart" in l){n=l.selectionStart
}else{if("selection" in document){l.focus();
m=document.selection.createRange();
k=document.selection.createRange().text.length;
m.moveStart("character",-l.value.length);
n=m.text.length-k
}}return n
},setCursorPosition:function(j,m){var l,k;
l=$(j).get(0);
if(l!==null){if(l.createTextRange){k=l.createTextRange();
k.move("character",m);
k.select()
}else{l.focus();
l.setSelectionRange(m,m)
}}},htmlEntities:function(j){if(!j&&j!==0){return""
}return String(j).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")
},unHtmlEntities:function(j){if(!j&&j!==0){return""
}return String(j).replace(/\&lt\;/g,"<").replace(/\&gt\;/g,">").replace(/\&amp\;/g,"&").replace(/\&quot;/g,'"')
},jsString:function(j){return JSON.stringify(""+j)
},preg_quote:function(j){return(j+"").replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,"\\$1")
},getActiveElementProp:function(j){if(!document){return""
}if(!document.activeElement){return""
}if(j=="NODENAME"){if(!document.activeElement.nodeName){return""
}return document.activeElement.nodeName.toUpperCase()
}return document.activeElement[j]
},isArrowNavUnSafe:function(){var k=function(){if(!document){return false
}if(!document.activeElement){return false
}var l=TS.utility.getActiveElementProp("NODENAME");
if(l=="INPUT"){return true
}if(l=="SELECT"){return true
}if(l=="CHECKBOX"){return true
}if(l=="TEXTAREA"){if($&&$("#message-input").is(":focus")&&!$("#message-input").val()){return false
}return true
}return false
};
var j=k();
return j
},isFocusOnInput:function(){if(!document){return false
}if(!document.activeElement){return false
}var j=TS.utility.getActiveElementProp("NODENAME");
if(j=="INPUT"){return true
}if(j=="TEXTAREA"){return true
}if(j=="SELECT"){return true
}if(j=="CHECKBOX"){return true
}return false
},formatTopicOrPurpose:function(j){j=TS.format.unFormatMsg(j);
j=TS.format.cleanMsg(j);
j=TS.utility.linkifyInternal(j,true);
j=TS.format.formatJustText(j);
return j
},capitalize:function(j){return j.charAt(0).toUpperCase()+j.slice(1)
},camelCaseStringBySeparator:function(o,m){var l,k,n,j;
m=m||"_";
l=o.split(m);
j=l.length;
if(j===1){return o
}k=l[0].toLowerCase();
for(n=1;
n<j;
n+=1){k+=l[n].substr(0,1).toUpperCase()+l[n].substr(1).toLowerCase()
}return k
},concatNames:function(k){if(!k||k.length===0){return""
}if(k.length===1){return k[0]
}if(k.length===2){return k[0]+" and "+k[1]
}var j=k.slice(0,k.length-1).join(", ");
j+=", and "+k[k.length-1];
return j
},shuffleArray:function(k){var n=k.length,m,l;
if(n===0){return k
}while(--n){m=Math.floor(Math.random()*(n+1));
l=k[n];
k[n]=k[m];
k[m]=l
}return k
},populateInput:function(l,k){l.val(k);
l.data("textchange_lastvalue",k);
TS.utility.queueRAF(function j(){l.trigger("autosize").trigger("autosize-resize").trigger("textchange")
})
},diff:function(l,k){function j(o){var p=o;
p=p.replace(/&/g,"&amp;");
p=p.replace(/</g,"&lt;");
p=p.replace(/>/g,"&gt;");
p=p.replace(/"/g,"&quot;");
return p
}function n(v,w){v=v.replace(/\s+$/,"");
w=w.replace(/\s+$/,"");
var q=m(v==""?[]:v.split(/\s+/),w==""?[]:w.split(/\s+/));
var u="";
var p=v.match(/\s+/g);
if(p==null){p=["\n"]
}else{p.push("\n")
}var s=w.match(/\s+/g);
if(s==null){s=["\n"]
}else{s.push("\n")
}if(q.n.length===0){for(var r=0;
r<q.o.length;
r++){u+="<del>"+j(q.o[r])+p[r]+"</del>"
}}else{if(q.n[0].text==null){for(w=0;
w<q.o.length&&q.o[w].text==null;
w++){u+="<del>"+j(q.o[w])+p[w]+"</del>"
}}for(var r=0;
r<q.n.length;
r++){if(q.n[r].text==null){u+="<ins>"+j(q.n[r])+s[r]+"</ins>"
}else{var t="";
for(w=q.n[r].row+1;
w<q.o.length&&q.o[w].text==null;
w++){t+="<del>"+j(q.o[w])+p[w]+"</del>"
}u+=" "+q.n[r].text+s[r]+t
}}}return u
}function m(s,t){var q=new Object();
var r=new Object();
for(var p=0;
p<t.length;
p++){if(q[t[p]]==null){q[t[p]]={rows:new Array(),o:null}
}q[t[p]].rows.push(p)
}for(var p=0;
p<s.length;
p++){if(r[s[p]]==null){r[s[p]]={rows:new Array(),n:null}
}r[s[p]].rows.push(p)
}for(var p in q){if(q[p].rows.length==1&&typeof r[p]!="undefined"&&r[p].rows.length==1){t[q[p].rows[0]]={text:t[q[p].rows[0]],row:r[p].rows[0]};
s[r[p].rows[0]]={text:s[r[p].rows[0]],row:q[p].rows[0]}
}}for(var p=0;
p<t.length-1;
p++){if(t[p].text!=null&&t[p+1].text==null&&t[p].row+1<s.length&&s[t[p].row+1].text==null&&t[p+1]==s[t[p].row+1]){t[p+1]={text:t[p+1],row:t[p].row+1};
s[t[p].row+1]={text:s[t[p].row+1],row:p+1}
}}for(var p=t.length-1;
p>0;
p--){if(t[p].text!=null&&t[p-1].text==null&&t[p].row>0&&s[t[p].row-1].text==null&&t[p-1]==s[t[p].row-1]){t[p-1]={text:t[p-1],row:t[p].row-1};
s[t[p].row-1]={text:s[t[p].row-1],row:p-1}
}}return{o:s,n:t}
}return n(l.replace(/</g,"&lt;").replace(/\,/g,", "),k.replace(/</g,"&lt;").replace(/\,/g,", "))
},urlNeedsRefererHiding:function(j){if(!j){return false
}j=j.toLowerCase();
if(j.indexOf("https://")!==0&&j.indexOf("http://")!==0){return false
}j=j.replace(/^https:\/\//,"").replace(/^http:\/\//,"");
var l=getRefererHidingWhiteList();
for(var k=0;
k<l.length;
k++){if(j==l[k]||j.indexOf(l[k]+"/")===0){return false
}}return true
},referer_safe_url_map:{},makeRefererSafeLink:function(l){l=l.replace(/\ue000/g,"").replace(/\ue001/g,"");
var n=l.replace(/\&amp\;/g,"&");
var p=TS.utility.htmlEntities(n);
if(p.indexOf("javascript:")===0){p=p.replace("javascript:","")
}var m='href="'+p+'"';
var o="onclick";
if(!TS.model||!TS.model.is_our_app){if(i&&i.rewrite_on_right_click){o="onmousedown"
}}if(!TS.utility.urlNeedsRefererHiding(l)){return m
}if(TS.utility.externalURLsNeedRedirecting()){var k=encodeURIComponent(n);
var j=(TS.boot_data.feature_referer_policy?"https://":"http://")+TS.boot_data.redir_domain+"/link?url="+k+(TS.boot_data.feature_referer_policy&&i&&i.redirect_type?"&v="+i.redirect_type:"");
var q=TS.utility.htmlEntities(k);
TS.utility.referer_safe_url_map[q]=n;
m+=' data-referer-safe="1" '+o+'="this.href=&quot;'+j+'&quot;" onmouseover="this.href=TS.utility.referer_safe_url_map[&quot;'+q+'&quot;]" rel="noreferrer"'
}else{m+=' rel="noreferrer"'
}return m
},makeSureAllExternalLinksAreRefererSafe:function(j){var l=Date.now();
var k=[];
if(TS.utility.externalURLsNeedRedirecting()){j.find("a[href]:not([data-referer-safe])").each(function(){var m=$(this);
var n=m.attr("href");
if(!TS.utility.urlNeedsRefererHiding(n)){return
}k.push(this.outerHTML);
m.removeAttr("href");
var o=this.outerHTML.replace("<a","<a "+TS.utility.makeRefererSafeLink(n)+" ");
m.replaceWith(o);
k[k.length-1]+="\n->\n"+o
});
if(TS.model&&TS.model.team&&TS.model.team.domain=="tinyspeck"){if(k.length){TS.log(365,"#"+j.attr("id")+" had "+k.length+" LINKS WITH EXT HREFS BUT NOT data-referer-safe! to fix it took "+(Date.now()-l)+"ms");
TS.dir(365,k)
}else{TS.log(365,"#"+j.attr("id")+" had "+k.length+" LINKS WITH EXT HREFS BUT NOT data-referer-safe! to check it took "+(Date.now()-l)+"ms")
}}}else{j.find("a[href]:not([rel])").each(function(){var m=$(this);
var n=m.attr("href");
if(n.indexOf("mailto")===0||n.indexOf("skype")===0){return
}if(n&&n!="#"){if(TS.utility.urlNeedsRefererHiding(n)){k.push(this.outerHTML);
m.attr("rel","noreferrer");
k[k.length-1]+="\n->\n"+this.outerHTML
}}else{m.removeAttr("href")
}});
if(TS.model&&TS.model.team&&TS.model.team.domain=="tinyspeck"){if(k.length){TS.log(365,"#"+j.attr("id")+" had "+k.length+' LINKS WITH EXT HREFS BUT WITHOUT rel="noreferrer"! to add rel it took '+(Date.now()-l)+"ms");
TS.dir(365,k)
}else{TS.log(365,"#"+j.attr("id")+" had "+k.length+' LINKS WITH EXT HREFS BUT WITHOUT rel="noreferrer"! to check it took '+(Date.now()-l)+"ms")
}}}},makeSureAllLinksHaveTargets:function(j){var l=Date.now();
var k=[];
j.find("a[href]:not([target])").each(function(){var m=$(this);
var n=m.attr("href");
if(n.indexOf("mailto")===0||n.indexOf("skype")===0){return
}if(n&&n!="#"){k.push(this.outerHTML);
m.attr("target",n);
k[k.length-1]+="\n->\n"+this.outerHTML
}else{m.removeAttr("href")
}});
if(TS.model&&TS.model.team&&TS.model.team.domain=="tinyspeck"){if(k.length){TS.log(365,"#"+j.attr("id")+" had "+k.length+" LINKS WITH HREFS BUT WITHOUT TARGETS! to add targets it took "+(Date.now()-l)+"ms");
TS.dir(365,k)
}else{TS.log(365,"#"+j.attr("id")+" had "+k.length+" LINKS WITH HREFS BUT WITHOUT TARGETS! to check it took "+(Date.now()-l)+"ms")
}}TS.utility.makeSureAllExternalLinksAreRefererSafe(j)
},sortTable:function(p,k,l,m,j){l=(l=="desc")?"desc":"asc";
j=(j=="desc")?"desc":"asc";
function q(s){return function(w,v){var u=o(w,s);
var t=o(v,s);
if($.isNumeric(u)&&$.isNumeric(t)){if(u==t&&m){u=o(w,m);
t=o(v,m);
if($.isNumeric(u)&&$.isNumeric(t)){if(j!=l){return t-u
}else{return u-t
}}else{if(j!=l){return t.localeCompare(u)
}else{return u.localeCompare(t)
}}}return u-t
}else{return u.localeCompare(t)
}}
}function o(t,s){return $(t).children("td").eq(s).data("sort-val")
}var r=p.find("tr:gt(0)").toArray().sort(q(k));
if(l=="desc"){r=r.reverse()
}for(var n=0;
n<r.length;
n++){p.append(r[n])
}},getPercSmartly:function(j,l){if(!j||!l){return"0%"
}var k=(j/l)*100;
if(k!=100&&Math.round(k)==100){return"99%"
}if(k<0.7){return"<1%"
}return Math.round(k)+"%"
},isCursorWithinTBTs:function(k){var n=k.getCursorPosition();
var o=k.val();
var j=o.substr(0,n);
var l=j.match(/```/g);
if(!l){return false
}var m=l.length;
if(m%2){return true
}return false
},getLowerCaseValue:function(j){return(j&&j.toLowerCase?j.toLowerCase():"")
},rgb2hex:function(j){if(/^#[0-9A-F]{6}$/i.test(j)){return j
}var k=j.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
if(!k){k=j.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)$/)
}if(!k){return
}function l(m){return("0"+parseInt(m).toString(16)).slice(-2)
}return"#"+l(k[1])+l(k[2])+l(k[3])
},setImmediate:function(j){f(j)
},immediateDebounce:function(j){var k=false;
return function(){if(k){return
}var l=this;
var m=arguments;
k=true;
f(function(){k=false;
j.apply(l,m)
})
}
},debounce:function(k,j){var l;
return function(){var m=this;
var n=arguments;
clearTimeout(l);
l=setTimeout(function(){k.apply(m,n)
},j)
}
},throttleFunc:function(l,k,j){var n={};
var m=function m(){var o=Array.prototype.slice.apply(arguments);
if(!o.every(TS.utility.isScalar)){TS.error("You're passing non-scalar arguments to a function throttled with TS.utility.throttleFunc; it will likely not work as you want")
}var p="f-"+o.join("-");
if(n[p]&&n[p].context!==this){throw new Error("Cannot use this function with different `this` contexts across different calls")
}n[p]=n[p]||{requested:false,timeout:0,context:this};
if(n[p].timeout||m.always_wait){n[p].requested=true
}else{l.apply(n[p].context,o)
}clearTimeout(n[p].timeout);
n[p].timeout=setTimeout(function(){if(n[p].requested){l.apply(n[p].context,o)
}delete n[p]
},k)
};
m.always_wait=!!j;
return m
},onlyRunFuncOnce:function(l){var k;
var j;
if(typeof l!=="function"){return
}return function(){if(k){return j
}k=true;
j=l.apply(this,arguments);
l=null;
return j
}
},cmdKey:function(j){if(!j){return false
}if(TS.model.is_mac){return !!j.metaKey
}else{return !!j.ctrlKey
}},throttle:(function(){var k,j;
k={delay:200,timer_group:"generic"};
j={timers:{},queues:{}};
function l(n){var p,o;
if(j.timers[n]){if(j.queues[n]){for(p=0,o=j.queues[n].length;
p<o;
p++){if(j.queues[n][p]){j.queues[n][p]()
}}}j.queues[n]=null;
j.timers[n]=null
}}function m(p,n,o){if(!p){return false
}n=n||k.timer_group;
if(!j.timers[n]){o=o||k.delay;
j.timers[n]=window.setTimeout(function(){l(n)
},o)
}if(!j.queues[n]){j.queues[n]=[]
}if(j.queues[n].indexOf){if(j.queues[n].indexOf(p)===-1){j.queues[n].push(p)
}}else{j.queues[n].push(p)
}}return{method:m}
}()),getImgProxyURL:function(k,s,o){if(!k){return k
}if(!TS.boot_data.feature_image_proxy){return k
}if(!TS.boot_data.image_proxy_url){return k
}var q=TS.boot_data.image_proxy_url;
if(k.indexOf(q)===0){return k
}var n,m;
var l=getRefererHidingWhiteList();
var p;
if(k.indexOf("https://")===0){p=k.replace(/^https:\/\//,"");
for(n=0,m=l.length;
n<m;
n++){if(p.indexOf(l[n]+"/")===0){return k
}}}var r=q+"?url="+encodeURIComponent(k);
s=parseInt(s);
o=parseInt(o);
if(s&&o){r+="&width="+s+"&height="+o
}return r
},rAF:(function(){var m=["ms","moz","webkit","o"];
var l=window.requestAnimationFrame;
var j;
for(j=0;
j<m.length&&!l;
j++){l=window[m[j]+"RequestAnimationFrame"]
}if(!l){var k=0;
return function(q){var n=Date.now();
var p=Math.max(0,16-(n-k));
var o=window.setTimeout(function(){q(n+p)
},p);
k=n+p;
return o
}
}return function(n){return l.call(window,n)
}
})(),cancelRAF:(function(){var l=["ms","moz","webkit","o"];
var k=window.cancelAnimationFrame;
var j;
for(j=0;
j<l.length&&!k;
j++){k=window[l[j]+"CancelAnimationFrame"]||window[l[j]+"CancelRequestAnimationFrame"]
}if(!k){return function(m){clearTimeout(m)
}
}return function(m){k.call(window,m)
}
})(),queueRAF:function(j){if(TS.boot_data&&TS.boot_data.feature_js_raf_queue){h.add(j)
}else{j()
}},loadUrlInWindowIfOnline:function(j,k){k=k||document;
TS.api.call("api.test",{},function(m,n,l){if(m){$("body").addClass("hidden");
k.location=j
}else{TS.generic_dialog.alert("You can't perform that action because you are not online :(")
}})
},externalURLsNeedRedirecting:function(){if(TS.boot_data.feature_no_redirects_in_ssb){if(TS.model.team.prefs.hide_referers&&!TS.model.is_our_app){return true
}}else{if(TS.model.team.prefs.hide_referers){return true
}}return false
},swapInRedirUrlForIframe:function(l,k){k=k||i;
if(!k){return l
}if(!k.iframe_redirect_type){return l
}var j=$(l);
var m=j.attr("src");
if(!m){return l
}if(TS.qs_args.test_iframe_referers=="1"){m="https://"+document.location.host+"/referertester.html?"+Date.now()
}m="https://"+TS.boot_data.redir_domain+"/link?v="+k.iframe_redirect_type+"&url="+encodeURIComponent(m);
j.attr("src",m);
l=j[0].outerHTML;
if(TS.qs_args.test_iframe_referers=="1"){TS.info("html with redir:"+l)
}return l
},getPlaceholderHTMLFromIframe:function(k){k=k.replace(/<iframe/,"<div").replace(/<\/iframe/,"</div");
var j=$(k);
j.css("height",j.attr("height")+"px").css("width",j.attr("width")+"px").attr("data-real-src",j.attr("src")).attr("src","").addClass("iframe_placeholder");
k=j[0].outerHTML;
return k
},getIframeHTMLFromPlaceholder:function(k){k=k.replace(/<div/,"<iframe").replace(/<\/div/,"</iframe");
var j=$(k);
j.attr("src",j.data("real-src")).removeClass("iframe_placeholder");
k=j[0].outerHTML;
return k
},isArrowKey:function(k){var j=TS.utility.keymap;
if(k==j.down){return true
}if(k==j.up){return true
}if(k==j.right){return true
}if(k==j.left){return true
}return false
},isPageKey:function(k){var j=TS.utility.keymap;
if(k==j.pageup){return true
}if(k==j.pagedown){return true
}if(k==j.home){return true
}if(k==j.end){return true
}return false
},getFileIDFromURL:function(k){if(!k){return null
}if(!TS.client){return null
}k=TS.utility.normalizeDevHost(String(k));
var t=document.createElement("a");
t.href=TS.client.files_url;
var p=t.host;
var r=document.createElement("a");
r.href=k;
var l=r.pathname;
while(l.indexOf("/")===0){l=l.substr(1)
}var o=[p,"files.dev.slack.com","files.staging.slack.com","files.slack.com"];
if(o.indexOf(r.host)===-1){return null
}var q;
var n;
if(l.indexOf("files/")===0){n=l.split("/");
if(n.length<3){return null
}var j=n[1];
if(!j){return null
}if(!TS.members.getMemberByName(j)){return null
}q=n[2]
}else{if(l.indexOf("files-pri/")===0){n=l.split("/");
if(n.length<3){return null
}var m=n[1];
if(m.indexOf("-")<0){return null
}var s=m.split("-");
if(s.length!==2){return null
}q=s[1]
}else{return null
}}if(!q){return null
}if(q.substr(0,1)!="F"){return null
}if(q.length<2){return null
}if(q.length>15){return null
}return q
},getBotIDFromURL:function(l){if(!l){return null
}if(!TS.client){return null
}l=TS.utility.normalizeDevHost(String(l));
l=l.replace("https://","").replace("http://","");
var k=TS.client.bots_url.replace("https://","").replace("http://","");
if(l.indexOf(k)===0){l=l.replace(k,"services")
}while(l.indexOf("/")===0){l=l.substr(1)
}if(l.indexOf("services/")!==0){return null
}var j=l.split("/");
if(j.length<2){return null
}var m=j[1];
if(!m){return null
}if(m.substr(0,1)!="B"){return null
}if(m.length<2){return null
}if(m.length>15){return null
}return m
},normalizeDevHost:function(j){return j.replace(/\.dev[0-9]*.slack.com/i,".dev.slack.com").replace(/\.staging.slack.com/i,".slack.com")
},platformSupportsHtmlNotifications:function(){if(TS.model.win_ssb_version&&window.winssb){if(window.winssb.app.canShowHtmlNotifications){return winssb.app.canShowHtmlNotifications()
}else{return winssb.app.willUseHwAcceleration!==false
}}return false
},platformSupportsImgEmojiInHtmlNotifications:function(){return(TS.model.win_ssb_version&&(TS.model.win_ssb_version>0.9||(TS.model.win_ssb_version==0.9&&TS.model.win_ssb_version_minor>=5)))
},ensureArray:function(j){return($.isArray(j))?j:[]
},findAllTeamEmojiInStr:function(m,l){m=$.trim(m);
var j=[];
if(!m){return j
}j=m.match(TS.emoji.getColonsRx())||j;
var k=[];
j=j.filter(function(n){if(TS.emoji.isValidName(n)){return true
}n.split("::").forEach(function(o){var p=TS.emoji.isValidName(o);
if(!p){return
}k.push(":"+p+":")
});
return false
});
j=j.concat(k);
if(l){j=TS.utility.dedupeArray(j)
}TS.dir(248,j);
return j
},dedupeArray:function(j){return j.filter(function(m,l,k){return k.indexOf(m)===l
})
},callFuncWhenApiQisEmpty:function(j){if(TS.api.pending){if(!TS.api.Q_empty_sig.has(j)){TS.api.Q_empty_sig.addOnce(j)
}}else{j()
}},equal_stats:{agree:0,agree_true:0,agree_false:0,disagree:0,json_true:0,comp_true:0,json_ms:0,comp_ms:0},areSimpleObjectsEqual:function a(j,l){if(j===l){return true
}if(typeof j!==typeof l){return false
}if(j===null&&l){return false
}if(l===null&&j){return false
}if(j===undefined&&l){return false
}if(l===undefined&&j){return false
}if(j.length!==l.length){return false
}var k;
for(k in l){if(typeof j[k]=="undefined"&&typeof l[k]!="undefined"){return false
}if(l[k]){switch(typeof l[k]){case"object":if(!a(j[k],l[k])){return false
}break;
case"function":if(String(l[k])!=String(j[k])){return false
}break;
default:if(l[k]!==j[k]){return false
}}}else{if(j[k]){return false
}}}for(k in j){if(typeof l[k]=="undefined"&&typeof j[k]!="undefined"){return false
}}return true
},areSimpleObjectsEqualWithLogging:function(t,s,D){D="[ "+(D||(t&&t.id?t.id:"root"))+" ]";
var B=TS.utility.equal_stats;
var j;
var l=[];
var m;
var o;
var r;
var k;
var A;
var w;
var v;
var C=TS.shouldLog(283);
var z=C||TS.shouldLog(282);
var q=(function(){if(z||C){return(C?283:282)
}return 0
})();
var u=function(F,E,p,G){if(z){l.push(E+" FAIL "+F+"\n\tx:"+p+"\n\ty:"+G+"\n")
}return false
};
var n=function n(p,G,E,F){if(p===G){return true
}if(E){m=JSON.stringify(p||null);
o=JSON.stringify(G||null);
return(m==o)
}if(typeof p!==typeof G){return u(F,"TYPEOF",typeof p,typeof G)
}if(p===null&&G){return u(F,"X NULL",p,G)
}if(G===null&&p){return u(F,"Y NULL",p,G)
}if(p===undefined&&G){return u(F,"X UND",p,G)
}if(G===undefined&&p){return u(F,"Y UND",p,G)
}if(p.length!==G.length){return u(F,"LENGTH",p.length,G.length)
}for(v in G){if(typeof p[v]=="undefined"&&typeof G[v]!="undefined"){return u(F+"[ "+v+" ]","UNDEFINED",p[v],G[v])
}if(G[v]){switch(typeof G[v]){case"object":if(!n(p[v],G[v],E,F+"[ "+v+" ]")){return false
}break;
case"function":if(String(G[v])!=String(p[v])){return u(F+"[ "+v+" ]","FUNCTION",p[v],G[v])
}break;
default:if(G[v]!==p[v]){return u(F+"[ "+v+" ]","EQUALITY",p[v],G[v])
}}}else{if(p[v]){return u(F+"[ "+v+" ]","EXISTENCE IN X",p[v],G[v])
}}}for(v in p){if(typeof G[v]=="undefined"&&typeof p[v]!="undefined"){return u(F+"[ "+v+" ]","EXISTENCE IN Y",p[v],G[v])
}}return true
};
j=Date.now();
r=n(t,s,true,D);
k=Date.now()-j;
B.json_ms+=k;
j=Date.now();
A=n(t,s,false,D);
w=Date.now()-j;
B.comp_ms+=w;
if(r!=A){if(!z){C=z=true;
n(t,s,true,D);
n(t,s,false,D)
}l.push("❌");
l.push("json_says: "+r);
l.push("x_json.length: "+m.length);
l.push("y_json.length: "+o.length);
if(m.length<100){l.push("x_json: "+m);
l.push("y_json: "+o)
}l.push("comp_says: "+A);
l.push("json_time: "+k);
l.push("comp_time: "+w);
B.disagree++;
if(r){B.json_true++
}else{B.comp_true++
}}else{if(z&&!r){l.push("❗️")
}else{if(C){l.push("✅")
}}B.agree++;
if(r){B.agree_true++
}else{B.agree_false++
}}if(l.length){l.push(JSON.stringify(TS.utility.equal_stats,null,2));
TS.log(q,D+"\n"+l.join("\n"))
}return A&&r
},appendLogToUrlWithLimit:function(j,k){if(!j){return j
}j+=(j.indexOf("?")==-1)?"?":"&";
if(!k){return j
}var l=(2000)-j.length;
return j+k.substr(0,l)
},isDocumentHidden:function(){if(document.hidden||document.webkitHidden||document.mozHidden||document.msHidden){return true
}return false
}});
var i=(function(){var l=window.boot_data;
if(!l){TS.warn("window.boot_data not available");
return null
}if(!l.feature_referer_policy&&TS.qs_args.test_iframe_referers!="1"){return null
}var k={iframe_redirect_type:4,redirect_type:3,rewrite_on_right_click:true};
var j=(window.console!==undefined&&console.warn);
if(!window.bowser){if(j){console.warn("window.bowser undefined, defaulting to restrictive referrer policy")
}return k
}if((bowser.chrome&&bowser.version>=4.1)||(bowser.opera&&bowser.version>=15)){return{iframe_redirect_type:4,redirect_type:null,rewrite_on_right_click:false}
}if(bowser.ie){return{iframe_redirect_type:4,redirect_type:3,rewrite_on_right_click:true}
}if(bowser.firefox){return{iframe_redirect_type:(bowser.version>=36?4:2),redirect_type:3,rewrite_on_right_click:(bowser.version>=36?false:true)}
}if((bowser.safari&&bowser.version>=5)||navigator.userAgent.match(/(Slack_SSB)/g)){return{iframe_redirect_type:2,redirect_type:null,rewrite_on_right_click:false}
}if(j){console.warn("browser not recognized, defaulting to restrictive referrer policy")
}return k
}());
var b=null;
window.getRefererHidingWhiteList=function(){if(b){return b
}b=[TS.model.team.domain+".dev.slack.com",TS.model.team.domain+".staging.slack.com",TS.model.team.domain+".slack.com","files.staging.slack.com","files.dev.slack.com","files.slack.com","dev.slack-files.com","staging.slack-files.com","www.slack-files.com","slack-files.com","slack-imgs.com","slack.com",TS.boot_data.redir_domain,"my.slack.com","www.slack.com"];
for(var j=0;
j<100;
j++){b.push(TS.model.team.domain+".dev"+j+".slack.com");
b.push("dev"+j+".slack-files.com")
}return b
};
var g=/((ftp|http|https)\:\/\/|\bw{3}\.)[a-z0-9\-\.]+\.[a-z]+(:[a-z0-9]*)?\/?([@a-z0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*/gi;
var f=window.setImmediate;
if(!f){if(window.MutationObserver){var e=document.createElement("div");
var d=[];
(new MutationObserver(function(k){var j=d.slice();
d.length=0;
j.forEach(function(l){l()
})
})).observe(e,{attributes:true});
f=function(j){if(!d.length){e.setAttribute("yes","no")
}d.push(j)
}
}else{f=function(j){setTimeout(j,0)
}
}}var c=null;
var h=(function(){var k=[];
var l=false;
function j(){k.forEach(function(n){n()
});
k=[];
l=false
}function m(o,n){if(n||k.indexOf(o)===-1){k.push(o)
}if(!l&&k.length){l=true;
TS.utility.rAF(j)
}}return{add:m}
}())
})();
(function(){TS.registerModule("format",{testing_with_generic_tokens:false,theme_rx:/((?:#[A-Fa-f0-9]{6} {0,1}, {0,1}){7})(#[A-Fa-f0-9]{6})(\b)/g,onStart:function(){},cleanMsg:function(e){if(!e){return""
}e=e.replace(/\&/g,"&amp;");
e=e.replace(/</g,"&lt;");
e=e.replace(/>/g,"&gt;");
e=e.replace(/(^|\s|\(|&gt;|\*|_)(@[\w|.|-]+)/g,function(h,k,j){var i="";
var f=j.toLowerCase();
var g;
if(/^@everyone[\.|\-|_]*$/.test(f)){g="<!everyone>";
i=f.substr("!everyone".length)
}else{if(/^@here[\.|\-|_]*$/.test(f)){g="<!here|@here>";
i=f.substr("!here".length)
}else{if(/^@channel[\.|\-|_]*$/.test(f)){g="<!channel>";
i=f.substr("!channel".length)
}else{if(/^@group[\.|\-|_]*$/.test(f)){g="<!group>";
i=f.substr("!group".length)
}}}}if(g){return k+g+i
}h=TS.members.getMemberByName(j);
var p=[".","..","...","....","-","--","_"];
var n;
var r=0;
while(!h&&r<p.length){n=p[r];
if(j&&j.substr(j.length-n.length,n.length)==n){var o=j.substr(0,j.length-n.length);
i=n;
h=TS.members.getMemberByName(o)
}r++
}if(h){return k+"<@"+h.id+">"+i
}if(TS.boot_data.feature_subteams){var q=TS.user_groups.getUserGroupsByHandle(j);
r=0;
while(!q&&r<p.length){n=p[r];
if(j&&j.substr(j.length-n.length,n.length)==n){var l=j.substr(0,j.length-n.length);
i=n;
q=TS.user_groups.getUserGroupsByHandle(l)
}r++
}if(q){return k+"<!subteam^"+q.id+"|@"+q.handle+">"+i
}}return k+j
});
e=e.replace(/(^|\s|\(|&gt;|\*|_)(#[a-zA-Z0-9\-_]+)/g,function(f,i,h){var l=TS.channels.getChannelByName(h);
var g="";
var n=["-","--","_"];
var j;
var o=0;
while(!l&&o<n.length){j=n[o];
if(h&&h.substr(h.length-j.length,j.length)==j){var k=h.substr(0,h.length-j.length);
g=j;
l=TS.channels.getChannelByName(k);
if(l){g=j
}}o++
}if(l){return i+"<#"+l.id+">"+g
}return i+h
});
if(TS.model.prefs.convert_emoticons&&TS.model.prefs.emoji_mode!="as_text"){e=TS.format.doEmoticonConversion(e)
}return e
},emoticon_conversion_token_map:[],emoticonConversionTokenReplacer:function(e){return TS.format.tokenizeStr(TS.format.emoticon_conversion_token_map,e)
},doEmoticonConversion:function(e){TS.format.emoticon_conversion_token_map.length=0;
e=e.replace(TS.format.special_pre_rx,TS.format.emoticonConversionTokenReplacer);
e=e.replace(TS.format.special_code_rx,TS.format.emoticonConversionTokenReplacer);
e=e.replace(TS.format.special_quote_rx,TS.format.emoticonConversionTokenReplacer);
e=TS.emoji.replaceEmoticons(e);
e=TS.format.deTokenizeStr(TS.format.emoticon_conversion_token_map,e);
return e
},token_cnt:0,token_base:"~^$-+—!?][{}~^$-+—!?][{}~^$-+—!?][{}~^$-+—!?][{}~^$-+—!?][{}~^$-+—!?][{}~^$-+—!?][{}".split("").sort(function(){return 0.5-Math.random()
}).join(""),tokenizeStr:function(g,h,i){if(!h){return""
}i=i||"";
var e=(h.indexOf("\n")===0)?"\n":"";
var f=TS.format.encodeSpecialFormattingCharsAndColon(e+TS.format.token_base+(TS.format.token_cnt++)+Date.now());
f=i+f+i;
g.push({str:h,token:f});
return f
},deTokenizeStr:function(f,h){var g;
var e=f.length-1;
for(e;
e>-1;
e--){g=f[e];
h=h.replace(g.token,g.str.replace(/\$/g,"$$$$"))
}return h
},unFormatMsg:function(e,f){if(!e){return""
}return TS.format.formatWithOptions(e,f,{for_edit:true})
},formatJustText:function(e){return TS.format.formatWithOptions(e)
},formatDefault:function(e,f){return TS.format.formatWithOptions(e,f)
},formatNotification:function(e,f){return TS.format.formatWithOptions(e,f,{for_growl:true})
},formatWithOptions:function(t,n,s){var l=(s&&!!s.do_inline_imgs)||undefined;
var y=(s&&!!s.for_growl)||undefined;
var r=(s&&!!s.for_edit)||undefined;
var g=(s&&!!s.no_highlights)||undefined;
var A=(s&&!!s.no_specials)||undefined;
var x=(s&&!!s.enable_slack_action_links)||undefined;
var h=(s&&!!s.force_tsf_despite_mismatch)||undefined;
g=(n&&("no_highlights" in n))?!!n.no_highlights:!!g;
if(A===true||A===false){A=A
}else{if(n&&("mrkdwn" in n)){A=(n.mrkdwn===false)
}else{A=false
}}if(r){A=true
}var u=(n&&n.no_emoji);
var w=!(l&&(!n||n.subtype!="bot_message"));
var e=(!w&&TS.client&&TS.model.team&&TS.model.team.domain=="tinyspeck");
if(!t){return""
}var z=$.trim(t);
if(!z){return""
}var p;
var f;
if(window.TSF){try{f="NORMAL";
if(A){f="NOMRKDWN"
}if(y){f="GROWL"
}if(r){f="EDIT"
}p=c(t,n,f,A,g,u,w,l,x,e)
}catch(m){TS.error("error testing TSF:"+m);
TS.info("txt was:"+t)
}}if(n&&(n.subtype==="sh_room_created"||n.subtype==="sh_room_shared")){var o=TS.ui.growls.extractFromNameFromCorGMessage(n);
if(o){o=o+": "
}z=(n.subtype==="sh_room_created")?o+"started a call":o+"shared a call"
}var k=[];
var j=[];
var v=function(Y,D,H,X){var ad;
var U;
var O;
var af;
var ag;
if(D.substr(0,1)=="#"){var N=D.substr(1);
O=N.split("|");
U=O[0];
ad=TS.channels.getChannelById(U);
if(!ad){ad=TS.channels.getChannelByName(U)
}if(ad){if(y||r){return TS.format.tokenizeStr(k,"#"+ad.name)
}af=TS.utility.shouldLinksHaveTargets()?'target="/archives/'+ad.name+'"':"";
if(TS.format.testing_with_generic_tokens){return TS.format.tokenizeStr(k,TS.format.generic_link_open+"#"+ad.name+TS.format.link_close)
}return TS.format.tokenizeStr(k,'<a href="/archives/'+ad.name+'" '+af+' data-channel-name="'+ad.name+'" data-channel-id="'+ad.id+'" class="internal_channel_link">#'+ad.name+TS.format.link_close)
}else{if(O.length>1&&O[1]){return TS.format.tokenizeStr(k,"#"+O[1])
}else{if(TS.model.user.is_restricted){return TS.format.tokenizeStr(k,"#unknown-channel")
}else{return TS.format.tokenizeStr(k,"#deleted-channel")
}}}}if(D.substr(0,1)=="@"){Y=TS.utility.msgs.getMemberFromMemberMarkup(D);
if(Y){if(y||r||!TS.members.canUserSeeMember(Y)){return TS.format.tokenizeStr(k,"@"+Y.name)
}af=TS.utility.shouldLinksHaveTargets()?'target="/team/'+Y.name+'" ':" ";
ag=(g)?"@"+Y.name:TS.format.doHighlighting("@"+Y.name);
if(TS.format.testing_with_generic_tokens){return TS.format.tokenizeStr(k,TS.format.generic_link_open+ag+TS.format.link_close)
}return TS.format.tokenizeStr(k,'<a href="/team/'+Y.name+'" '+af+'data-member-name="'+Y.name+'" class="internal_member_link">'+ag+TS.format.link_close)
}else{return TS.format.tokenizeStr(k,D)
}}if(D.substr(0,1)=="!"){var Z=D.substr(1);
var T=(Z||"").split("|");
Z=T[0];
var R=(T[1])?T[1]:Z;
if(TS.utility.inArray(b,Z)){if(y||r){return TS.format.tokenizeStr(k,"@"+Z)
}return TS.format.tokenizeStr(k,'<b class="mention">@'+Z+"</b>")
}else{if(Z.indexOf("^")!==-1){var K=Z.split("^");
Z=K[0];
if(Z==="date"&&K.length>=3){var W=K[1];
var ah=K[2];
var Q=(K.length>3)?K[3]:"";
var F=(Q===""||y||r)?"":"<a "+TS.utility.makeRefererSafeLink(Q)+' target="_blank">';
var B=(Q===""||y||r)?"":TS.format.link_close;
return TS.format.tokenizeStr(k,F+TS.utility.date.formatDate(ah,W,R)+B)
}else{if(TS.boot_data.feature_subteams&&Z==="subteam"&&K.length===2){var V=TS.user_groups.getUserGroupsById(K[1]);
if(V&&V.handle){if(y||r){return TS.format.tokenizeStr(k,"@"+V.handle)
}var ac=TS.utility.htmlEntities(V.handle);
ag=(g)?"@"+ac:TS.format.doHighlighting("@"+ac);
af=TS.utility.shouldLinksHaveTargets()?'target="/usergroups/'+V.id+'" ':" ";
return TS.format.tokenizeStr(k,'<a href="/usergroups/'+V.id+'" '+af+'data-user-group-id="'+V.id+'" class="internal_user_group_link">'+ag+TS.format.link_close)
}else{return TS.format.tokenizeStr(k,R)
}}else{return TS.format.tokenizeStr(k,R)
}}}}if(y||r){return TS.format.tokenizeStr(k,"<"+R+">")
}else{return TS.format.tokenizeStr(k,"&lt;"+R+"&gt;")
}}var ae=D.split("|");
var E=ae.shift();
E=E.replace(/\"/g,"&quot;");
var J=ae.join("|")||E;
J=$.trim(J);
if(E.indexOf("<")===0){return TS.format.tokenizeStr(k,"&lt;"+D.replace(/</g,"&lt;").replace(/>/g,"&gt;")+"&gt;")
}J=J.replace(/</g,"&lt;");
J=J.replace(/>/g,"&gt;");
var ab;
var P;
if((ab=TS.utility.getBotIDFromURL(E))&&(P=TS.bots.getBotById(ab))){if(y||r){return TS.format.tokenizeStr(k,P.name)
}af=TS.utility.shouldLinksHaveTargets()?'target="'+E+'" ':" ";
ag=(g)?P.name:TS.format.doHighlighting(P.name);
if(J==E){ag=E
}ag=ag.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
return TS.format.tokenizeStr(k,'<a href="'+E+'" '+af+'data-bot-id="'+ab+'" class="internal_bot_link">'+ag+TS.format.link_close)
}if(y){if(J==E){var L=(E.indexOf("//")>-1)?E.split("//")[1]:E;
L=jQuery.trim(L).substring(0,30).trim(this)+"...";
return""+L+""
}return"<"+J+">"
}else{if(r){return J
}}if(!A&&J!=E){J=TS.format.doSpecials(J,n&&n._special_debug)
}if(!u&&J!=E){J=TS.emoji.replace(J,j)
}if(!g){J=TS.format.doHighlighting(J)
}var I;
if(E.indexOf(TS.utility.msgs.api_url_prefix+"chat.help")===0){if(x){I=TS.utility.htmlEntities(TS.utility.jsString(E));
return TS.format.tokenizeStr(k,'<a onclick="TS.utility.msgs.doApiUrl('+I+')" class="api_url">'+J+TS.format.link_close)
}else{return TS.format.tokenizeStr(k,'<a class="api_url muted">(Disabled) '+J+TS.format.link_close)
}}else{if(E.indexOf(TS.utility.msgs.new_api_url_prefix)===0){if(x){I=TS.utility.htmlEntities(TS.utility.jsString(E));
return TS.format.tokenizeStr(k,'<a onclick="TS.utility.msgs.doNewApiUrl('+I+')" class="api_url">'+J+TS.format.link_close)
}else{return TS.format.tokenizeStr(k,'<a class="api_url muted">(Disabled) '+J+TS.format.link_close)
}}else{if(E.indexOf("javascript:")===0){return TS.format.tokenizeStr(k,'<a onclick="TS.client.msg_pane.maybeClick(this)" data-maybe-click="'+E.replace("javascript:","")+'">'+J+TS.format.link_close)
}else{if(TS.client&&TS.client.core_url&&E.indexOf(TS.client.core_url)===0){if(TS.format.testing_with_generic_tokens){return TS.format.tokenizeStr(k,TS.format.generic_link_open+J+TS.format.link_close)
}return TS.format.tokenizeStr(k,'<a target="_self" href="'+E+'">'+J+TS.format.link_close)
}else{var aa="";
var M;
if(n&&n.ts&&l){M=TS.inline_attachments.getAttachmentByFromUrl(n.attachments,E);
if(M){if(TS.boot_data.feature_attachments_inline||TS.templates.builders.shouldDoSimpleAttachment(M,n)){aa=TS.templates.builders.buildAttachmentHTML({attachment:M,url:E,msg:n,show_initial_caret:true}).replace(/\n/g,"").replace(/\t/g,"").replace(/  /g," ")
}}}if(aa){aa=aa.replace(/\n/g,"").replace(/\t/g,"").replace(/ +/g," ")
}if(TS.format.testing_with_generic_tokens){return TS.format.tokenizeStr(k,TS.format.generic_link_open+J+TS.format.link_close+aa)
}var C=TS.utility.getFileIDFromURL(E);
var G=(C)?' class="file_preview_link"':"";
var S=(C)?' data-file-id="'+C+'"':"";
return TS.format.tokenizeStr(k,"<a "+TS.utility.makeRefererSafeLink(E)+' target="_blank"'+G+S+">"+J+TS.format.link_close+aa)
}}}}};
z=z.replace(/<(.*?)>/g,v);
z=z.replace(/\</g,"&lt;");
z=z.replace(/\>/g,"&gt;");
if(r){z=TS.utility.unHtmlEntities(z)
}else{if(y){if(TS.utility.platformSupportsHtmlNotifications()){if(TS.utility.platformSupportsImgEmojiInHtmlNotifications()){z=TS.emoji.replace(z,null,true)
}}else{z=TS.utility.unHtmlEntities(z);
z=TS.emoji.maybeUnifiedReplace(z)
}}else{TS.format.special_token_map=[];
if(!A){z=TS.format.doSpecials(z,n&&n._special_debug)
}if(!w){if(e){z=z.replace(TS.format.theme_rx,function(C,B,D){return B+"<nobr>"+D+" "+TS.format.tokenizeStr(TS.format.special_token_map,a(C)+"</nobr>")
})
}z=z.replace(TS.format.hex_rx,TS.format.hexReplace)
}if(!u){z=TS.emoji.replace(z,j)
}z=TS.format.deTokenizeStr(TS.format.special_token_map,z);
TS.format.special_token_map=null;
if(!g){z=TS.format.doHighlighting(z)
}z=z.replace(/<\/div>\n/g,"</div>");
z=z.replace(/<\/pre>\n/g,"</pre>");
z=z.replace(/codecopyonly> /g,"codecopyonly>&nbsp;");
z=z.replace(/ <span class="codecopyonly/g,'&nbsp;<span class="codecopyonly');
z=z.replace(/&nbsp;&nbsp;/g," &nbsp;");
z=z.replace(/\n\r\n\r/g,TS.format.para_break);
z=z.replace(/\n\r\n/g,TS.format.para_break);
z=z.replace(/\n\n/g,TS.format.para_break);
z=z.replace(/\n/g,TS.format.line_break);
z=z.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
z=z.replace(/  /g," &nbsp;");
z=z.replace(/^ /g,"&nbsp;")
}}z=TS.format.deTokenizeStr(k,z);
z=TS.format.deTokenizeStr(j,z);
j=null;
if(window.TSF&&p){if(p!=z){TS.error("======================================================================== "+f+" "+(p==z));
TS.info("txt     :"+t);
TS.info("new_txt :"+z);
TS.info("tsf_str :"+p);
if(TS.model.user.id=="U024BE7LM"||TS.model.user.id=="U032VEM0B"){window._temp_bad_message_hash=window._temp_bad_message_hash||{};
var i="format bot";
var q=(n)?n.ts:t.substr(0,30);
if(!window._temp_bad_message_hash[q]&&(!n||n.username!=i)){window._temp_bad_message_hash[q]=true;
TS.ims.addMsg(TS.ims.getImByMemberId("USLACKBOT").id,{type:"message",subtype:"bot_message",is_ephemeral:true,username:i,icons:{emoji:":symbols:"},ts:TS.utility.date.makeTsStamp(),text:"check console for bad message report! ts: "+(n?n.ts:"unknown")})
}}if(h){return p
}}else{if(window.show_all_msg_tests){TS.warn("================================"+f+" "+(p==z));
TS.info("new_txt:"+z);
TS.info("tsf_str:"+p)
}return p
}}return z
},hex_rx:/(\W|^)(#[A-Fa-f0-9]{6})(\b)/g,hexReplace:function(f,g,e,h){return g+e+' <div class="inline_color_block" style="background:'+e+';"></div>'+h
},special_i_rx:/(?!:.+:)(^|\s|[\?\.,\-!\^;:{(\[%$#+=\u2000-\u206F\u2E00-\u2E7F"])\_(.*?\S *)?\_(?=$|\s|[\?\.,\-!\^;:})\]%$~{\[<#+=\u2000-\u206F\u2E00-\u2E7F…"\uE022])/g,special_b_rx:/(^|\s|[\?\.,\-!\^;:{(\[%$#+=\u2000-\u206F\u2E00-\u2E7F"])\*(.*?\S *)?\*(?=$|\s|[\?\.,\-!\^;:})\]%$~{\[<#+=\u2000-\u206F\u2E00-\u2E7F…"\uE022])/g,special_code_rx:/(^|\s|[\?\.,\-!\^;:{(\[%$#+=\u2000-\u206F\u2E00-\u2E7F"])\`(.*?\S *)?\`/g,special_pre_rx:/(^|\s|[_*\?\.,\-!\^;:{(\[%$#+=\u2000-\u206F\u2E00-\u2E7F"])```([\s\S]*?)?```(?=$|\s|[_*\?\.,\-!\^;:})\]%$#+=\u2000-\u206F\u2E00-\u2E7F…"])/g,special_quote_rx:/(^|\n)&gt;(?![\W_](?:&lt;|&gt;|[\|\/\\\[\]{}\(\)Dpb](?=\s|$)))(([^\n]*)(\n&gt;[^\n]*)*)/g,special_3_quote_rx:/(^|\n)&gt;&gt;&gt;([\s\S]*$)/,special_quote_prefix:'<span class="copyonly">&gt;</span>',special_longquote_prefix:'<span class="copyonly">&gt;&gt;&gt;</span>',special_i_open:'<i><span class="copyonly">&#95;</span>',special_i_close:'<span class="copyonly">&#95;</span></i>',special_b_open:'<b><span class="copyonly">&ast;</span>',special_b_close:'<span class="copyonly">&ast;</span></b>',special_pre_open:'<pre class="special_formatting"><span class="copyonly">&#96;&#96;&#96;</span>',special_pre_close:'<span class="copyonly">&#96;&#96;&#96;</span></pre>',special_code_open:'<code><span class="copyonly">&#96;</span codecopyonly>',special_code_close:'<span class="codecopyonly copyonly">&#96;</span></code>',special_quote_open:'<div class="special_formatting_quote"><div class="quote_bar"><div class="shim"></div></div><div class="content dynamic_content_max_width">',special_quote_close:"</div></div>",line_break:"<br>",hard_space:"&nbsp;",generic_link_open:"<a>",link_close:"</a>",para_break:'<span class="para_break"><i class="copy_only"><br></i></span>',specialPreReplace:function(f,e,g){if(!g){return f
}if(g&&g.length&&g.substr(0,1)=="\n"){g=g.substr(1)
}if(TS.format.special_token_map){g=TS.format.encodeForPre(g);
return e+TS.format.special_pre_open+TS.format.tokenizeStr(TS.format.special_token_map,g)+TS.format.special_pre_close
}g=TS.format.encodeSpecialFormattingCharsAndMoreForPre(g);
return e+TS.format.special_pre_open+(g)+TS.format.special_pre_close
},specialCodeReplace:function(f,e,g){if(TS.format.log_specials){TS.warn('match in specialCodeReplace:\n"'+f+'"')
}if(!g||g.substr(0,1)=="`"||g.substr(g.length-1,1)=="`"||(g.match(/<pre/g)&&g.match(/<\/pre/g))){return f
}if(TS.format.special_token_map){return e+TS.format.special_code_open+TS.format.tokenizeStr(TS.format.special_token_map,g)+TS.format.special_code_close
}g=TS.format.encodeSpecialFormattingCharsAndColon(g);
return e+TS.format.special_code_open+g+TS.format.special_code_close
},specialItalicReplace:function(f,e,g){if(TS.format.log_specials){TS.warn('match in specialItalicReplace:\n"'+f+'"')
}if(!g||!g.match(/[^_*`]/)||g.substr(0,1)=="_"||g.substr(g.length-1,1)=="_"){return f
}return e+TS.format.special_i_open+TS.format.doSpecials(g)+TS.format.special_i_close
},specialBoldReplace:function(f,e,g){if(!g||!g.match(/[^_*`]/)||g.substr(0,1)=="*"||g.substr(g.length-1,1)=="*"||(g.substr(0,1)==" "&&g.substr(g.length-1,1)==" ")){return f
}return e+TS.format.special_b_open+TS.format.doSpecials(g)+TS.format.special_b_close
},specialQuoteReplace:function(f,e,h,g){if(f=="&gt;"){return f
}h=h.replace(/\n&gt;/g,"\n"+TS.format.special_quote_prefix);
return TS.format.special_quote_open+TS.format.special_quote_prefix+h+TS.format.special_quote_close
},special3QuoteReplace:function(f,e,g){if(f=="&gt;&gt;&gt;"){return"&gt;&gt;&gt;"
}g=g.replace(/^([\s]*)(&gt;)*/g,function(h,j,i,l,k){if(i){return h
}return""
});
return TS.format.special_quote_open+TS.format.special_longquote_prefix+g+TS.format.special_quote_close
},log_specials:false,doSpecials:function(f,e){f=f||"";
if(e){TS.info("debugging specials for text:::::::::::::::::::::\n"+f);
TS.format.log_specials=true
}f=f.replace(TS.format.special_pre_rx,TS.format.specialPreReplace);
f=f.replace(TS.format.special_code_rx,TS.format.specialCodeReplace);
f=f.replace(TS.format.special_i_rx,TS.format.specialItalicReplace);
f=f.replace(TS.format.special_b_rx,TS.format.specialBoldReplace);
f=f.replace(TS.format.special_3_quote_rx,TS.format.special3QuoteReplace);
f=f.replace(TS.format.special_quote_rx,TS.format.specialQuoteReplace);
TS.format.log_specials=false;
return f
},at_symbol_token:"thisreplacementtokenallowsustotreatatsymbolsasiftheywerewordcharactersinregex".split("").sort(function(){return 0.5-Math.random()
}).join(""),swapInAts:function(e){if(!e){return e
}return e.replace(new RegExp(TS.format.at_symbol_token,"g"),"@")
},swapOutAts:function(e){if(!e){return e
}return e.replace(/@/g,TS.format.at_symbol_token)
},doHighlighting:function(g){var m;
var l;
var e=TS.model.highlight_words.concat();
e.sort(function k(n,i){var o=n.length;
var p=i.length;
if(o<p){return 1
}if(o>p){return -1
}return 0
});
var f=false;
if(g.indexOf("@")!=-1){f=true;
g=TS.format.swapOutAts(g)
}for(var h=0;
h<e.length;
h++){m=e[h];
if(f){m=TS.format.swapOutAts(e[h])
}m=TS.utility.regexpEscape(m);
if(m=="don"){m+="(?!['’]t)"
}l=new RegExp("(\\b|_|\\s|^)("+m+")(\\b|_|\\s|$)","ig");
var j=0;
g=g.replace(l,function(o,p,n,t,s,r){if(r.substr(0,s).match(/</)){for(var q=s;
q>=j;
q--){if(r.charAt(q)=="<"){return p+n+t
}if(r.charAt(q)==">"){break
}}}j=s+o.length;
return p+'<span class="mention">'+n+"</span>"+t
})
}if(f){return TS.format.swapInAts(g)
}else{return g
}},encodeSpecialFormattingChars:function(e){e=e||"";
return e.replace(/\*/g,"&ast;").replace(/\_/g,"&#95;").replace(/\`/g,"&#96;")
},encodeSpecialFormattingCharsAndColon:function(e){e=e||"";
return TS.format.encodeSpecialFormattingChars(e).replace(/\:/g,"&#58;")
},encodeSpecialFormattingCharsAndMoreForPre:function(e){e=e||"";
return TS.format.encodeForPre(TS.format.encodeSpecialFormattingCharsAndColon(e))
},encodeForPre:function(e){e=e||"";
return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,TS.format.line_break)
}});
var b=["everyone","channel","group","here"];
var d;
var c=function(k,U,l,r,o,E,B,aa,G,N){d=d||{"<B:START>":TS.format.special_b_open,"<B:END>":TS.format.special_b_close,"<PRE:START>":TS.format.special_pre_open,"<PRE:END>":TS.format.special_pre_close,"<CODE:START>":TS.format.special_code_open,"<CODE:END>":TS.format.special_code_close,"<I:START>":TS.format.special_i_open,"<I:END>":TS.format.special_i_close,"<QUOTE:START>":TS.format.special_quote_open,"<QUOTE:PREFIX>":TS.format.special_quote_prefix,"<LONGQUOTE:PREFIX>":TS.format.special_longquote_prefix,"<QUOTE:END>":TS.format.special_quote_close,"<LINK:END>":TS.format.link_close,"<LINE:BREAK>":TS.format.line_break,"<PARA:BREAK>":TS.format.para_break,"<SPACE:HARD>":TS.format.hard_space};
var I=d;
var Q=[];
if(N){k=k.replace(TS.format.theme_rx,function(A,i,ad){return i+TS.format.tokenizeStr(Q,"<nobr>",",")+ad+" "+TS.format.tokenizeStr(Q,a(A)+"</nobr>")
})
}var K="";
var t=TSF.getTokensArray($.trim(k),l);
var ac;
var M;
var J;
var Y;
var O;
var W;
var x;
var e;
var Z;
var V;
var v;
var y;
var F;
var s;
var p;
var L;
var D;
var R;
if(l=="GROWL"||l=="EDIT"){for(Y=0;
Y<t.length;
Y++){J=t[Y];
if(J.indexOf("<")===0){if(I[J]){TS.error('unexpected: mode == "GROWL" || "EDIT", and yet we got something in the formatting map? '+J)
}else{if(J.indexOf("<!")===0){M=J.replace(/<|>/g,"");
v=(M||"").split("|");
Z=v[0].substr(1);
if(TS.utility.inArray(b,Z)){K+="@"+Z
}else{V=(v[1])?v[1]:Z;
if(Z.indexOf("^")!==-1){y=Z.split("^");
Z=y[0];
if(Z==="date"&&y.length>=3){F=y[1];
s=y[2];
K+=TS.utility.date.formatDate(s,F,V)
}else{if(TS.boot_data.feature_subteams&&Z==="subteam"&&y.length===2){R=TS.user_groups.getUserGroupsById(y[1]);
if(R){K+="@"+R.handle
}}else{K+="<"+V+">"
}}}else{K+="<"+V+">"
}}}else{if(J.indexOf("<@")===0){M=J.replace(/<|>/g,"");
W=TS.utility.msgs.getMemberFromMemberMarkup(M);
if(W){K+="@"+W.name
}else{if(l=="EDIT"){K+=M
}else{if(l=="GROWL"){K+=J
}}}}else{if(J.indexOf("<#")===0){M=J.replace(/<|>|#/g,"");
x=M.split("|");
O=x[0];
ac=TS.channels.getChannelById(O);
if(ac){K+="#"+ac.name
}else{if(x.length>1&&x[1]){K+="#"+x[1]
}else{if(TS.model.user.is_restricted){K+="#unknown-channel"
}else{K+="#deleted-channel"
}}}}else{if(J.indexOf(TSF.LINK_START.split(" ")[0])===0){TS.error('unexpected: mode == "GROWL" || "EDIT", and yet we got '+J)
}else{if(J.indexOf(TSF.EMOJI_COLONS.split(" ")[0])===0){TS.error('unexpected: mode == "GROWL" || "EDIT", and yet we got '+J)
}else{if(J.indexOf(TSF.HEX_BLOCK.split(" ")[0])===0){TS.error('unexpected: mode == "GROWL" || "EDIT", and yet we got '+J)
}else{TS.error("markup token not handled:"+J)
}}}}}}}}else{if(J.indexOf("<")==-1){if(l=="EDIT"){K+=TS.utility.unHtmlEntities(J)
}else{if(l=="GROWL"){if(TS.utility.platformSupportsHtmlNotifications()){if(TS.utility.platformSupportsImgEmojiInHtmlNotifications()){K+=TS.emoji.replace(J,null,true)
}}else{var X=TS.utility.unHtmlEntities(J);
X=TS.emoji.maybeUnifiedReplace(X);
K+=X
}}}}else{TS.error("token has a < in it but it is not the first character!\n"+J)
}}}}else{var ab="";
var u;
var T;
var q;
for(Y=0;
Y<t.length;
Y++){J=t[Y];
if(J.indexOf("<")===0){if(I[J]){K+=I[J];
if(J==TSF.LINK_END){K+=ab;
ab=""
}}else{if(J.indexOf("<!")===0){M=J.replace(/<|>/g,"");
v=(M||"").split("|");
Z=v[0].substr(1);
if(TS.utility.inArray(b,Z)){K+='<b class="mention">@'+Z+"</b>"
}else{V=(v[1])?v[1]:Z;
if(Z.indexOf("^")!==-1){y=Z.split("^");
Z=y[0];
if(Z==="date"&&y.length>=3){F=y[1];
s=y[2];
p=(y.length>3)?y[3]:"";
L=(p==="")?"":"<a "+TS.utility.makeRefererSafeLink(p)+' target="_blank">';
D=(p==="")?"":TS.format.link_close;
K+=L+TS.utility.date.formatDate(s,F,V)+D
}else{if(TS.boot_data.feature_subteams&&Z==="subteam"&&y.length===2){R=TS.user_groups.getUserGroupsById(y[1]);
if(R&&R.handle){e=TS.utility.shouldLinksHaveTargets()?'target="/usergroups/'+R.id+'" ':" ";
var w=TS.utility.htmlEntities(R.handle);
T=(o)?"@"+w:TS.format.doHighlighting("@"+w);
K+='<a href="/usergroups/'+R.id+'" '+e+'data-user-group-id="'+R.id+'" class="internal_user_group_link">'+T+TS.format.link_close
}else{K+=V
}}else{K+="&lt;"+V+"&gt;"
}}}else{K+="&lt;"+V+"&gt;"
}}}else{if(J.indexOf("<@")===0){M=J.replace(/<|>/g,"");
W=TS.utility.msgs.getMemberFromMemberMarkup(M);
if(W){e=TS.utility.shouldLinksHaveTargets()?'target="/team/'+W.name+'" ':" ";
T=(o)?"@"+W.name:TS.format.doHighlighting("@"+W.name);
K+='<a href="/team/'+W.name+'" '+e+'data-member-name="'+W.name+'" class="internal_member_link">'+T+TS.format.link_close
}else{K+=M
}}else{if(J.indexOf("<#")===0){M=J.replace(/<|>|#/g,"");
x=M.split("|");
O=x[0];
ac=TS.channels.getChannelById(O);
if(ac){e=(TS.utility.shouldLinksHaveTargets())?'target="/archives/'+ac.name+'"':"";
if(TS.format.testing_with_generic_tokens){K+=TS.format.generic_link_open+"#"+ac.name+TS.format.link_close
}K+='<a href="/archives/'+ac.name+'" '+e+' data-channel-name="'+ac.name+'" data-channel-id="'+ac.id+'" class="internal_channel_link">#'+ac.name+TS.format.link_close
}else{if(x.length>1&&x[1]){K+="#"+x[1]
}else{if(TS.model.user.is_restricted){K+="#unknown-channel"
}else{K+="#deleted-channel"
}}}}else{if(J.indexOf(TSF.LINK_START.split(" ")[0])===0){var h=(function(m){var i=$.trim(m.replace(TSF.LINK_START.split(" ")[0],""));
return i.substr(0,i.length-1)
})(J);
var H;
var n;
if((H=TS.utility.getBotIDFromURL(h))&&(n=TS.bots.getBotById(H))){q=true;
e=TS.utility.shouldLinksHaveTargets()?'target="'+h+'" ':"";
T=(o)?n.name:TS.format.doHighlighting(n.name);
if(t[Y+1]&&t[Y+1]==h){T=h
}T=T.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
K+='<a href="'+h+'" '+e+'data-bot-id="'+H+'" class="internal_bot_link">'+T
}else{if(h.indexOf(TS.utility.msgs.api_url_prefix+"chat.help")===0){if(G){u=TS.utility.htmlEntities(TS.utility.jsString(h));
K+='<a onclick="TS.utility.msgs.doApiUrl('+u+')" class="api_url">'
}else{K+='<a class="api_url muted">(Disabled) '
}}else{if(h.indexOf(TS.utility.msgs.new_api_url_prefix)===0){if(G){u=TS.utility.htmlEntities(TS.utility.jsString(h));
K+='<a onclick="TS.utility.msgs.doNewApiUrl('+u+')" class="api_url">'
}else{K+='<a class="api_url muted">(Disabled) '
}}else{if(h.indexOf("javascript:")===0){K+='<a onclick="TS.client.msg_pane.maybeClick(this)" data-maybe-click="'+h.replace("javascript:","")+'">'
}else{if(TS.client&&TS.client.core_url&&h.indexOf(TS.client.core_url)===0){K+='<a target="_self" href="'+h+'">'
}else{var f=TS.utility.getFileIDFromURL(h);
var S=(f)?' class="file_preview_link"':"";
var j=(f)?' data-file-id="'+f+'"':"";
K+="<a "+TS.utility.makeRefererSafeLink(h)+' target="_blank"'+S+j+">";
if(ab){TS.error("WTF we should have no attach_html")
}ab="";
var C;
if(U&&U.ts&&aa){C=TS.inline_attachments.getAttachmentByFromUrl(U.attachments,h);
if(C){if(TS.boot_data.feature_attachments_inline||TS.templates.builders.shouldDoSimpleAttachment(C,U)){ab=TS.templates.builders.buildAttachmentHTML({attachment:C,url:h,msg:U,show_initial_caret:true})
}}}}}}}}}else{if(J.indexOf(TSF.EMOJI_COLONS.split(" ")[0])===0){var g=J.split(" ")[1].replace(">","");
if(!E){var z=TS.emoji.replace(g);
if(z==g){if(o){K+=g
}else{K+=TS.format.doHighlighting(g)
}}else{K+=TS.emoji.replace(g)
}}else{K+=g
}}else{if(J.indexOf(TSF.HEX_BLOCK.split(" ")[0])===0){var P=J.split(" ")[1].replace(">","");
if(!B){K+=' <div class="inline_color_block" style="background:'+P+';"></div>'
}}else{TS.error("markup token not handled:"+J)
}}}}}}}}else{if(J.indexOf("<")==-1){if(q){q=false
}else{if(o){K+=J
}else{K+=TS.format.doHighlighting(J)
}}}else{TS.error("token has a < in it but it is not the first character!\n"+J)
}}}}K=TS.format.deTokenizeStr(Q,K);
return K
};
var a=function(f,e){e=(e)?" to "+e:"";
return'<a data-theme="'+TS.utility.htmlEntities(f)+'" class="btn btn_small tiny_right_margin theme_installer_btn" style="padding: 0px 7px 1px;"><i class="ts_icon ts_icon_cog align_middle"></i> Switch'+e+"</a>"
}
})();
(function(){TS.registerModule("clipboard",{onStart:function(){d()
},canWriteText:function(){return a._canWriteText()
},writeText:function(e){a._writeText(e)
},canWriteHTML:function(){return a._canWriteHTML()
},writeHTML:function(e){a._writeHTML(e)
},test:function(){return{detectImplementation:d}
}});
var a;
var d=function(){if(b._canWriteText()){a=b
}else{a=c
}};
var c={_canWriteText:function(){return document.queryCommandSupported("copy")
},_writeText:function(f){var e=document.createElement("textarea");
e.appendChild(document.createTextNode(f));
document.body.appendChild(e);
this._writeNode(e);
document.body.removeChild(e)
},_canWriteHTML:function(){return document.queryCommandSupported("copy")
},_writeHTML:function(e){var f=$("<p>").html(e);
$("body").append(f);
this._writeNode(f);
f.remove()
},_writeNode:function(f){try{this._saveSelection();
f.select();
document.execCommand("copy")
}catch(g){TS.warn("Something bad happened when we tried to copy: "+g)
}finally{this._restoreSelection()
}},_saveSelection:function(){this._current_ranges=[];
this._sel=window.getSelection();
for(var e=0;
e<this._sel.rangeCount;
e++){this._current_ranges.push(this._sel.getRangeAt(e))
}},_restoreSelection:function(){var e=this;
this._sel.removeAllRanges();
this._current_ranges.forEach(function(f){e._sel.addRange(f)
})
}};
var b={_canWriteText:function(){return window.TSSSB&&TSSSB.call("canClipboardWriteString")
},_writeText:function(e){TSSSB.call("clipboardWriteString",e)
},_canWriteHTML:function(){return false
},_writeHTML:function(){return TS.warn("We cannot write HTML in SSB")
}}
})();
(function(){TS.registerModule("emoji_menu",{active_emoji_group:null,is_showing:false,is_dirty:true,onStart:function(){if(TS.web){TS.web.login_sig.add(F)
}if(TS.client){TS.client.login_sig.add(F)
}},startEmoForRxn:function(aA,ay){var ax=$(aA&&aA.target);
var az=Q(ax,function(){TS.emoji_menu.startEmoForRxn(aA,ay)
});
if(az){return
}h=ay;
if(!h){h=null;
TS.error("no _rxn_key for rxn_key:"+ay)
}var aB=function(aD){var aC=!TS.rxns.doesRxnsHaveRxnFromUser(TS.rxns.getExistingRxnsByKey(ay),aD);
TS.rxns.changeRxnsFromUserAction(ay,aD,aC)
};
i=ax;
i.closest(".menu_rxn").addClass("active");
i.closest(".rxn_panel").addClass("active");
b(aA,null,aB)
},startEmo:function(az,aB,aA){var ax=$(az&&az.target);
var ay=Q(ax,function(){TS.emoji_menu.startEmo(az,aB,aA)
});
if(ay){return
}i=ax;
i.closest("a.emo_menu").addClass("active");
b(az,aB,aA)
}});
var R="grinning";
var f="#message-input";
var O="#message-input";
var X=true;
var ao=false;
var x=false;
var ap;
var Z;
var c=null;
var g=-1;
var ak=0;
var ar=null;
var k=false;
var ah=false;
var aa=false;
var u=null;
var h=null;
var aj=":smile:";
var i;
var H=(TS.client)?$("#client-ui"):$("body");
var n;
var N;
var al;
var o;
var m;
var ad;
var U;
var J;
var j;
var Y;
var q;
var aw;
var l;
var t;
var au;
var K;
var y;
var z;
var A={right:0,left:0};
var af={right:0,left:0};
var v;
var D;
var am;
var F=function(){TS.prefs.emoji_use_changed_sig.add(function(){aa=true
});
var ay={};
TS.model.default_rxns.forEach(function(az){ay[az]={html:TS.emoji.graphicReplace(":"+az+":"),name:":"+az+":",names:":"+az+":"}
});
H.append(TS.templates.emoji_menu({default_rxns:ay}));
n=$("#emoji_menu");
K=n.find("#emoji_menu_items_scroller");
var ax=TS.qs_args.debug_scroll=="1";
K.monkeyScroll({debug:ax});
if(TS.boot_data.feature_reactions){aj="";
R="mine";
n.addClass("all_emoji");
K.bind("scroll",G)
}N=n.find("#emoji_menu_header");
al=n.find("#emoji_menu_items_div");
o=n.find("#emoji_div_default_rxns");
m=n.find("#emoji_menu_footer");
U=$("#emoji_preview_img");
J=$("#emoji_name");
j=$("#emoji_aliases");
n.detach()
};
var b=function(ay,aD,aC){if(aD){f=aD
}if(TS.client&&TS.client.ui.$msg_input.prop("disabled")&&aD!==null){return
}am=aC;
TS.timing.mark("start_emoji_menu_open");
TS.emoji_menu.active_emoji_group=TS.emoji_menu.active_emoji_group||R;
var aA;
if(TS.boot_data.feature_reactions){aA=TS.emoji_menu.is_dirty
}else{aA=(u!==TS.emoji_menu.active_emoji_group);
if(aa&&TS.emoji_menu.active_emoji_group=="mine"){aA=true
}}if(aA){V()
}r(aj);
if(!k){n.appendTo(H);
k=true
}o.toggleClass("hidden",!aq());
var az=i.offset();
var ax,aB;
if(az){ax=az.left-8;
aB=az.top-(n.outerHeight()+6)
}TS.emoji_menu.is_showing=true;
L();
I();
n.css({top:parseInt(aB),left:parseInt(ax)});
K.scrollTop(0);
if(K.data("monkeyScroll")){K.data("monkeyScroll").updateFunc()
}p();
$(window).bind("resize",p);
$(window.document).bind("keydown",W);
$("html").bind("mousedown",e);
n.css("opacity",0);
n.stop().transition({opacity:1,delay:20},100);
z=K.dimensions_rect();
A.top=0;
A.bottom=z.height*0.4;
w();
if(!TS.model.supports_sticky_position){$("#emoji_h3_"+TS.emoji_menu.active_emoji_group).scrollintoview({offset:"top",px_offset:0,duration:0})
}ad.focus();
TS.timing.measure("emoji_menu_open","start_emoji_menu_open");
if(X){TS.timing.measure("emoji_menu_first_open","start_emoji_menu_open");
X=false
}};
var ai=function(ax,ay){if(x){return
}x=true;
n.addClass("key_mode");
ad.blur();
c=aw.filter(":visible");
if(!ay&&Z&&c.index(Z)>-1){ag(c.index(Z));
s(ax)
}else{av(0);
ag(0)
}$("body").bind("mousedown.emoji_key_mode",function(){I()
});
K.bind("mousemove.emoji_key_mode",function(az){if(!ap){ap={x:az.pageX,y:az.pageY};
return
}if(Math.abs(az.pageX-ap.x)>1||Math.abs(az.pageY-ap.y)>1){I()
}});
o.bind("mousemove.emoji_key_mode",function(az){I()
})
};
var s=function(aF){if(c.length==1){return
}var az=TS.utility.keymap;
var aE=c.eq(g);
var aC;
if(c.length<=TS.model.emoji_menu_columns){if(aF==az.up){aF=az.left
}if(aF==az.down){aF=az.right
}}if(aF==az.up||aF==az.down){if(aF==az.up){aC=g-TS.model.emoji_menu_columns
}else{aC=g+TS.model.emoji_menu_columns
}if(ao){if(aC>=c.length){var aA=Math.ceil(c.length/TS.model.emoji_menu_columns);
var aB=Math.ceil((c.index(aE)+1)/TS.model.emoji_menu_columns)-1;
if(aA==aB+1){aC=0
}else{aC=c.length-1
}}}else{var ay=aE.data("col");
var aH=aE.data("row");
var aD=(aF==az.up)?aH-1:aH+1;
var ax=c.filter('[data-row="'+aD+'"]');
var aG=ax.filter('[data-col="'+ay+'"]');
if(aG.length){aC=c.index(aG)
}else{aC=c.index(ax.last())
}}}else{if(aF==az.right){aC=g+1
}else{if(aF==az.left){aC=g-1
}else{TS.error("invalid key passed to _changeKeyModeSelectionLiByArrow:"+aF);
return
}}}if((aF==az.up||aF==az.left)&&aC<0){aC=c.length-1
}else{if((aF==az.down||aF==az.right)&&(aC==-1||aC>=c.length)){aC=0
}}ag(aC)
};
var ag=function(ax){var aA=g;
if(aA>-1){c.eq(aA).removeClass("key_selection")
}g=ax;
var ay=c.eq(g);
var az=ay.find("a");
ae(az);
r(az.data("name"),az.data("names"));
ay.addClass("key_selection").scrollintoview({offset:(g<aA)?"top":"bottom",px_offset:(g<aA)?26:-6,duration:100})
};
var I=function(){if(!x){return
}x=false;
ap=null;
n.removeClass("key_mode");
c.removeClass("key_selection");
g=-1;
$("body").unbind("mousedown.emoji_key_mode");
K.unbind("mousemove.emoji_key_mode");
o.unbind("mousemove.emoji_key_mode")
};
var E=function(){if(ao){return
}ao=true;
I();
Y.addClass("hidden");
l.removeClass("hidden");
q.css("display","inline");
$(".emoji_section_div").css("display","inline");
au.addClass("hidden");
t.addClass("hidden")
};
var L=function(){if(!ao){return
}ao=false;
ar=null;
Y.removeClass("hidden");
l.addClass("hidden");
q.css("display","block");
$(".emoji_section_div").css("display","block");
au.removeClass("hidden");
t.addClass("hidden");
ad.val("");
aw.removeClass("hidden");
K.scrollTop(0);
K.data("monkeyScroll").updateFunc();
w()
};
var w=function(){v=[];
D={};
var ax;
var az;
var aB;
var ay=-1;
Y.each(function(aE,aD){var aC=$(aD);
aB=aC.data("group-name");
if(!TS.model.supports_sticky_position){aC.css("top",0)
}if(aC.hasClass("hidden")){return
}ay++;
D[aB]=v[ay]={index:ay,$el:aC,id:aC.attr("id"),group_name:aB,rect:aC.dimensions_rect(),vis:{top:0,bottom:0,max_top:0,set_top:0}}
});
for(var aA=0;
aA<v.length;
aA++){ax=v[aA];
az=v[aA+1];
ax.vis.top=ax.rect.top-z.top;
ax.vis.bottom=(az)?az.rect.top-z.top:100000000000;
ax.vis.max_top=(ax.vis.bottom-ax.vis.top)-ax.rect.height;
delete ax.rect
}};
var ac=function(){var ax=0;
var ay=0;
var az;
aw.each(function(aB,aA){az=$(aA);
az.attr("data-col",ax);
az.attr("data-row",ay);
if((ax+1==TS.model.emoji_menu_columns)||(az[0]==az.parent().find("li").last()[0])){ay++;
ax=0
}else{ax++
}})
};
var V=function(){aa=false;
TS.emoji_menu.is_dirty=false;
u=TS.emoji_menu.active_emoji_group;
N.html(TS.templates.emoji_header({emoji_groups:TS.model.emoji_groups,active_group:TS.emoji_menu.active_emoji_group}));
var ay=TS.templates.menu_emoticons({emoji_groups:TS.model.emoji_groups,active_group:TS.emoji_menu.active_emoji_group});
if(!TS.model.user.is_restricted){if(!TS.model.team.prefs.emoji_only_admins||TS.model.user.is_admin){ay+='<i class="ts_icon ts_icon_plus"></i> &nbsp;You can <a href="/admin/emoji" target="_blank">add custom emoji here</a>'
}}ay+="</div>";
al.html(ay);
ad=al.find("#emoji_input");
ad.bind("textchange",T);
Y=al.find("h3");
q=al.find("ul");
aw=q.find("li");
ac();
l=al.find("#emoji_search_results_h3");
t=al.find("#emoji_zero_results");
au=al.find("#emoji_tip");
y={};
var ax=al.find("ul:not(#emoji_ul_mine)").find("li");
ax.each(function(aB,az){var aF=$(az);
var aE=aF.data("names");
if(!aE){return
}var aD=aE.split(" ");
var aA;
for(var aC=0;
aC<aD.length;
aC++){aA=TS.emoji.stripWrappingColons(aD[aC]);
if(!y.hasOwnProperty(aA)){y[aA]={$li:aF,names:aF.data("names")}
}}});
if(TS.emoji_menu.is_showing){w()
}if(!ah){ah=true;
al.on("click.emoji_menu",".emoji_ul a",d);
al.on("mouseenter",".emoji_ul a",a);
al.on("mouseleave",".emoji_ul a",an);
o.on("click.emoji_menu",".emoji_ul a",d);
o.on("mouseenter",".emoji_ul a",a);
o.on("mouseleave",".emoji_ul a",an);
N.on("click.emoji_menu","a.emoji_grouping_tab",B)
}};
var G=function(ax){if(!TS.model.supports_sticky_position){P()
}clearTimeout(ak);
ak=setTimeout(function(){var ay=P();
if(ay!=TS.emoji_menu.active_emoji_group){TS.emoji_menu.active_emoji_group=ay;
$(".emoji_grouping_tab").removeClass("active");
$('.emoji_grouping_tab[data-group-name="'+TS.emoji_menu.active_emoji_group+'"]').addClass("active")
}},100)
};
var P=function(){var aA=K.scrollTop();
var ax;
var az;
for(var ay=0;
ay<v.length;
ay++){ax=v[ay];
if(aA+ay===0){az=ax.group_name
}if(aA>=ax.vis.top&&aA<=ax.vis.bottom){az=ax.group_name;
if(!TS.model.supports_sticky_position){ax.set_top=Math.min(aA-ax.vis.top,ax.vis.max_top);
ax.$el.css("top",ax.set_top)
}}else{if(ax.set_top&&!TS.model.supports_sticky_position){ax.set_top=0;
ax.$el.css("top",ax.set_top)
}}af.top=ax.vis.top-aA;
af.bottom=af.top+25;
if(aA>0&&TS.utility.doesRectContainRect(A,af,0,true)){az=ax.group_name
}else{if(parseInt(K.css("height"))+aA+40>=K[0].scrollHeight){az=v[v.length-1].group_name
}}}return az
};
var T=function(aK,aA){var aC=$.trim(ad.val());
var aB=Date.now();
TS.log(96,"--- _onInputTextchange ---");
if(!aC){L();
return
}E();
TS.log(96,"after _startSearchMode "+(Date.now()-aB));
aw.addClass("hidden");
TS.log(96,"after hiding all "+(Date.now()-aB));
var aI=aC.split(" ");
var aF;
var aJ=[];
var ax;
var aE;
var ay;
var az;
var aH;
var aG;
names_loop:for(var aD=0;
aD<TS.model.emoji_names.length;
aD++){ay=TS.model.emoji_names[aD];
for(aG=0;
aG<aI.length;
aG++){aF=aI[aG];
if(aF.substr(0,1)==":"){aH="^"+TS.utility.regexpEscape(TS.emoji.stripWrappingColons(aF));
if(aF.length>1&&aF.substr(-1,1)==":"){aH+="$"
}}else{aH=TS.utility.regexpEscape(aF)
}az=new RegExp(aH,"i");
if(az.test(ay)){aJ[aJ.length]=ay;
continue names_loop
}}}TS.log(96,"after regex "+(Date.now()-aB));
var aN;
var aM=false;
var aL=false;
for(ay in y){if(aJ.indexOf(ay)===-1){continue
}aN=y[ay];
aL=aM;
aM=true;
ax=":"+ay+":";
aE=aN.names;
aN.$li.removeClass("hidden")
}TS.log(96,"after show/hide "+(Date.now()-aB));
if(!TS.model.supports_sticky_position){l.css("top",0);
TS.log(96," after _$emoji_search_results_h3.css "+(Date.now()-aB))
}t.toggleClass("hidden",aM);
TS.log(96," after emoji_zero_results.toggleClass "+(Date.now()-aB));
if(K[0]["scrollTop"]){K[0]["scrollTop"]=0
}TS.log(96,"after scroller[0].scrollTop = 0 "+(Date.now()-aB));
w();
TS.log(96,"after _calcHeaderRanges "+(Date.now()-aB));
setTimeout(K.data("monkeyScroll").updateFunc,0);
ar=null;
if(aL){aE=ax=aj
}else{if(aM){ar=ax;
ax=ax;
aE=aE
}else{aE=ax=":cry:"
}}r(ax,aE);
TS.log(96,"end "+(Date.now()-aB))
};
var r=function(ay,ax){if(TS.boot_data.feature_reactions){if(ay){m.addClass("previewing");
U.html(TS.emoji.graphicReplace(ay));
J.html(TS.emoji.stripWrappingColons(ay));
j.html(ax||"")
}else{m.removeClass("previewing")
}}else{if(!ay){return
}U.html(TS.emoji.graphicReplace(ay));
J.html(ax||ay)
}};
var M=function(aC,aB){if(!TS.emoji_menu.is_showing){return
}if(am){setTimeout(am,0,aC);
if(!aB||!aB.shiftKey){at()
}return
}var aA=TS.utility.getCursorPosition(f);
var az=aA+aC.length;
var ay=$(f).val();
var ax=ay.substr(0,aA)+aC+ay.substr(aA);
$(f).val(ax).trigger("autosize").trigger("autosize-resize").trigger("textchange");
if(!aB||!aB.shiftKey){setTimeout(TS.utility.setCursorPosition,0,f,az);
at()
}};
var W=function(aB){var az=TS.utility.keymap;
if(TS.boot_data.feature_reactions){if(x){if(TS.utility.isArrowKey(aB.which)){s(aB.which);
aB.preventDefault();
return
}if(aB.which==az.shift||aB.which==az.esc||aB.which==az.alt||aB.which==az.ctrl||aB.which==az.cmd_ff||aB.which==az.cmd_other||aB.which==az.cmd_right){return
}if(aB.which==az.enter){M(c.eq(g).find("a").data("name"),aB);
aB.preventDefault();
aB.stopPropagation();
return
}I()
}var ax=TS.utility.isFocusOnInput();
var aC=ax&&(ad[0]===document.activeElement);
var aD=ax&&!aC;
if(aD){if(aB.which==az.enter){at();
return
}else{if(aB.which==az.semicolon&&aB.shiftKey){at();
return
}}}else{if(aC){if(aB.which==az.down){var aA=ad.getCursorPosition();
var ay=ad.val().length;
if(aA==ay){ai(aB.which,true);
aB.preventDefault();
return
}}if(!ad.val()&&TS.utility.isArrowKey(aB.which)){ai(aB.which);
aB.preventDefault()
}}if(TS.utility.isArrowKey(aB.which)){ai(aB.which);
aB.preventDefault();
return
}}if(aC){if(aB.which==az.enter){if(ao&&ar){M(ar,aB);
aB.preventDefault();
aB.stopPropagation()
}return
}}if(aB.which==az.esc||aB.which==az.tab||(aB.which==az.enter&&!aB.shiftKey)){at();
aB.preventDefault();
return
}if(!ax&&(!TS.client||TS.client.ui.isUserAttentionOnChat())&&!TS.utility.isArrowKey(aB.which)&&!TS.utility.isPageKey(aB.which)&&!aB.metaKey&&!aB.ctrlKey&&!aB.altKey&&aB.which!=az.shift){ad.focus()
}}else{if(aB.which==az.esc||aB.which==az.enter||aB.which==az.tab||(aB.which==az.semicolon&&aB.shiftKey)){at();
aB.preventDefault()
}}};
var p=function(){var az=10;
var aA=n.dimensions_rect();
var ax=n.offset();
var ay={top:0+az,right:$(window).width()-az,bottom:$(window).height()-(az+14),left:0+az};
if(TS.utility.doesRectContainRect(ay,aA)){return
}if(aA.left<ay.left){n.css("left",parseInt(ay.left))
}else{if(aA.right>ay.right){n.css("left",parseInt(Math.max(ay.left,ay.right-n.width())))
}}if(aA.top<ay.top){n.css("top",parseInt(ax.top+(ay.top-aA.top)))
}else{if(aA.bottom>ay.bottom){var aB=aA.bottom-Math.max(ay.top,ay.bottom-n.height());
n.css("top",parseInt(ax.top-aB))
}}};
var aq=function(){return !!h
};
var at=function(ax){TS.emoji_menu.is_showing=false;
h=null;
n.stop().transition({opacity:0},150,function(){n.detach();
k=false;
if(ax){ax()
}});
am=null;
i.closest("a.emo_menu").removeClass("active");
i.closest(".menu_rxn").removeClass("active");
i.closest(".rxn_panel").removeClass("active");
f=O;
$(window).unbind("resize",p);
$(window.document).unbind("keydown",W);
$("html").unbind("mousedown",e);
i=null
};
var e=function(ay){var ax=$(ay.target);
if(ax.closest("#emoji_menu").length===0&&ax.closest("#message-form").length===0&&ax.closest("#message_edit_form").length===0&&ax.closest(".menu_rxn").length===0){at()
}};
var d=function(ax){var ay=$(this).data("icon");
M(ay,ax)
};
var an=function(ax){Z=null;
r()
};
var a=function(aA){var ay=$(this);
var ax=ay.data("name");
var az=ay.data("names");
if(TS.boot_data.feature_reactions){ae(ay);
Z=ay.parent()
}r(ax,az)
};
var ae=function(ax){ax.removeClass(C.join(" "));
var ay;
while(!ay||ay==S){ay=TS.utility.randomFromArray(C)
}ax.addClass(ay);
S=ay
};
var B=function(ax){ab($(this))
};
var ab=function(az){TS.emoji_menu.active_emoji_group=az.data("group-name");
if(TS.boot_data.feature_reactions){if(TS.emoji_menu.is_dirty){V()
}else{L()
}var ax=D[TS.emoji_menu.active_emoji_group];
if(ax){var ay=(ax.index===0)?0:ax.vis.top;
av(ay)
}}else{if(aa&&TS.emoji_menu.active_emoji_group=="mine"){V()
}$(".emoji_ul").addClass("hidden");
$("#emoji_ul_"+TS.emoji_menu.active_emoji_group).removeClass("hidden");
K.data("monkeyScroll").updateFunc()
}$(".emoji_grouping_tab").removeClass("active");
az.addClass("active")
};
var av=function(ax){var ay=Math.abs(ax-K.scrollTop());
var az=50*(ay/300);
K.stop().animate({scrollTop:ax},az)
};
var Q=function(ax,ay){if(TS.emoji_menu.is_showing){if(i&&i[0]===ax[0]){ay=null
}at(ay);
return true
}return false
};
var S;
var C=["green","yellow","blue","pink"]
})();
(function(){TS.registerModule("menu",{$menu:null,$menu_header:null,$menu_items:null,$menu_footer:null,menu_lazy_load:null,channel:null,member:null,user_group:null,end_tim:0,$target_element:null,members_html_cache:null,large_list_trigger:1500,large_dom_trigger:500,watching_members_model:false,menu_items_hidden:true,onStart:function(){if(TS.client){$("#client-ui").append(TS.templates.menu())
}else{$("body").append(TS.templates.menu())
}var g=TS.menu.$menu=$("#menu");
if(TS.boot_data.app!="mobile"&&TS.qs_args.new_scroll!="0"){var f=TS.qs_args.debug_scroll=="1";
g.find("#menu_items_scroller").monkeyScroll({debug:f})
}TS.menu.$menu_header=g.find("#menu_header");
TS.menu.$menu_items=g.find("#menu_items");
TS.menu.$menu_footer=g.find("#menu_footer");
g.detach();
d()
},startWithChannel:function(k,g){if(TS.menu.isRedundantClick(k)){return
}if(TS.client.ui.checkForEditing(k)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
TS.menu.channel=TS.channels.getChannelById(g);
var j=TS.menu.channel;
var i=(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration)&&TS.model.team.prefs.allow_email_ingestion;
TS.menu.$menu.addClass("headless");
TS.menu.$menu_header.addClass("hidden").empty();
var l={channel:j,user:TS.model.user,show_email_item:i};
if(!j.is_general||TS.members.canUserPostInGeneral()){if(j.purpose.last_set===0&&!TS.model.user.is_ultra_restricted&&j.is_member){l.show_purpose_item=true
}}var f=TS.channels.makeMembersWithPreselectsForTemplate(TS.channels.getActiveMembersNotInThisChannelForInviting(g));
if(f.length===0){l.disable_invite=true
}if(j.is_member&&(!j.is_general||TS.members.canUserPostInGeneral())){l.show_advanced_item=true
}TS.menu.$menu_items.html(TS.templates.menu_channel_items(l));
if(!TS.boot_data.feature_channel_details){TS.menu.$menu_footer.html(TS.templates.menu_channel_footer({channel:j,user:TS.model.user,show_topic:j.is_member&&!TS.model.user.is_restricted&&(!j.is_general||TS.members.canUserPostInGeneral())}))
}TS.menu.$menu_header.bind("click.menu",TS.menu.onChannelHeaderClick);
TS.menu.$menu_items.on("click.menu","li",TS.menu.onChannelItemClick);
TS.kb_nav.setSubmitItemHandler(TS.menu.onChannelItemClick);
TS.menu.start(k);
var h=TS.utility.keymap;
$("#menu_channel_topic_input").bind("keydown",function(n){var m=$(this);
if(n.which==h.enter&&!n.shiftKey){TS.channels.setTopic(g,$.trim(m.val()));
TS.menu.end()
}});
TS.menu.positionAt($("#active_channel_name .name"),24,47);
if(l.disable_invite){$("#channel_invite_item a").tooltip({title:"Everyone on your team is already in this channel",delay:{show:500,hide:0}})
}},onChannelHeaderClick:function(f){f.preventDefault()
},onChannelItemClick:function(f){var g=$(this).attr("id");
if($(this).hasClass("disabled")){TS.menu.end();
return
}if(g=="channel_join_item"){f.preventDefault();
if(TS.model.archive_view_is_showing&&TS.client.archives.current_model_ob.id==TS.menu.channel.id){TS.channels.join(TS.client.archives.current_model_ob.name)
}else{TS.channels.displayChannel(TS.menu.channel.id)
}}else{if(g=="channel_display_item"){f.preventDefault();
TS.channels.displayChannel(TS.menu.channel.id)
}else{if(g=="channel_close_archived_item"){f.preventDefault();
TS.channels.closeArchivedChannel(TS.menu.channel.id)
}else{if(g=="channel_leave_item"){f.preventDefault();
TS.channels.leave(TS.menu.channel.id)
}else{if(g=="channel_star_item"){f.preventDefault();
TS.stars.checkForStarClick(f)
}else{if(g=="channel_email_item"){}else{if(g=="channel_advanced_item"){f.preventDefault();
TS.ui.channel_options_dialog.start(TS.menu.channel.id)
}else{if(g=="channel_unarchive_item"){f.preventDefault();
TS.api.call("channels.unarchive",{channel:TS.menu.channel.id},function(i,j,h){if(i){return
}var k='Un-archiving failed with error "'+j.error+'"';
if(j.error=="restricted_action"){k="<p>You don't have permission to un-archive channels.</p><p>Talk to your team owner.</p>"
}setTimeout(TS.generic_dialog.alert,100,k)
})
}else{if(g=="channel_archives_item"){}else{if(g=="channel_rename_item"){f.preventDefault();
TS.ui.channel_create_dialog.start(TS.menu.channel.name,TS.menu.channel)
}else{if(g=="channel_purpose_item"){f.preventDefault();
TS.ui.purpose_dialog.start(TS.menu.channel.name,TS.menu.channel)
}else{if(g=="channel_invite_item"){f.preventDefault();
if(TS.boot_data.feature_private_channels){TS.ui.channel_invite_modal.startInviteToChannelModal(TS.menu.channel.id)
}else{TS.ui.invite.showInviteMembersFromChannelDialog(TS.menu.channel.id)
}}else{if(g=="channel_prefs"){f.preventDefault();
TS.ui.channel_prefs_dialog.start(TS.menu.channel.id)
}else{if(g=="channel_add_service_item"){}else{TS.warn("not sure what to do with clicked element id:"+g);
return
}}}}}}}}}}}}}}TS.menu.end()
},startWithGroup:function(k,i){if(TS.menu.isRedundantClick(k)){return
}if(TS.client.ui.checkForEditing(k)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var j=TS.menu.group=TS.groups.getGroupById(i);
var h=(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration)&&TS.model.team.prefs.allow_email_ingestion;
TS.menu.$menu_header.addClass("hidden").empty();
var l={group:j,user:TS.model.user,show_email_item:h,leave_action:TS.groups.getLeaveAction(i)};
if(j.purpose.last_set===0&&!TS.model.user.is_ultra_restricted){l.show_purpose_item=true
}var f=TS.channels.makeMembersWithPreselectsForTemplate(TS.groups.getActiveMembersNotInThisGroupForInviting(i));
if(f.length===0){l.disable_invite=true
}TS.menu.$menu_items.html(TS.templates.menu_group_items(l));
if(!TS.boot_data.feature_channel_details){TS.menu.$menu_footer.html(TS.templates.menu_group_footer({group:j,user:TS.model.user}))
}TS.menu.$menu_header.bind("click.menu",TS.menu.onGroupHeaderClick);
TS.menu.$menu_items.on("click.menu","li",TS.menu.onGroupItemClick);
TS.menu.start(k);
var g=TS.utility.keymap;
$("#menu_group_topic_input").bind("keydown",function(n){var m=$(this);
if(n.which==g.enter&&!n.shiftKey){TS.groups.setTopic(i,$.trim(m.val()));
TS.menu.end()
}});
TS.menu.positionAt($("#active_channel_name .name"),24,53);
if(l.disable_invite){$("#group_invite_item a").tooltip({title:"Everyone on your team is already in this "+TS.templates.builders.groupCopy(),delay:{show:500,hide:0}})
}},onGroupHeaderClick:function(f){f.preventDefault()
},onGroupItemClick:function(f){var g=$(this).attr("id");
if($(this).hasClass("disabled")){TS.menu.end();
return
}if(g=="group_display_item"){f.preventDefault();
TS.groups.displayGroup(TS.menu.group.id)
}else{if(g=="group_star_item"){f.preventDefault();
TS.stars.checkForStarClick(f)
}else{if(g=="group_email_item"){}else{if(g=="group_leave_item"){f.preventDefault();
TS.groups.leave(TS.menu.group.id)
}else{if(g=="group_unarchive_item"){f.preventDefault();
TS.api.call("groups.unarchive",{channel:TS.menu.group.id})
}else{if(g=="group_archives_item"){}else{if(g=="group_advanced_item"){f.preventDefault();
TS.ui.channel_options_dialog.start(TS.menu.group.id)
}else{if(g=="group_purpose_item"){f.preventDefault();
TS.ui.purpose_dialog.start(TS.menu.group.name,TS.menu.group)
}else{if(g=="group_invite_item"){f.preventDefault();
if(TS.boot_data.feature_private_channels){TS.ui.channel_invite_modal.startInviteToChannelModal(TS.menu.group.id)
}else{TS.ui.invite.showInviteMembersFromGroupDialog(TS.menu.group.id)
}}else{if(g=="group_prefs"){f.preventDefault();
TS.ui.channel_prefs_dialog.start(TS.menu.group.id)
}else{if(g=="group_add_service_item"){}else{TS.warn("not sure what to do with clicked element id:"+g);
return
}}}}}}}}}}}TS.menu.end()
},startWithMpim:function(h,j){if(TS.menu.isRedundantClick(h)){return
}if(TS.client.ui.checkForEditing(h)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var g=TS.menu.mpim=TS.mpims.getMpimById(j);
if(g.members.length>4){$("#active_channel_name").find(".name").tooltip("disable")
}TS.menu.$menu_header.addClass("hidden").empty();
var i={mpim:g,user:TS.model.user};
var f=TS.channels.makeMembersWithPreselectsForTemplate(TS.groups.getActiveMembersNotInThisGroupForInviting(j));
if(f.length===0){i.disable_invite=true
}if(g.members.length>=9){i.hide_invite=true
}if(TS.members.canUserCreateGroups()){i.show_group_create=true
}TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.menu_mpim_items(i));
TS.menu.$menu_header.bind("click.menu",TS.menu.onMpimHeaderClick);
TS.menu.$menu_items.on("click.menu","li",TS.menu.onMpimItemClick);
TS.menu.start(h);
TS.menu.positionAt($("#active_channel_name .name"),24,53);
if(i.disable_invite){$("#mpim_invite_item a").tooltip({title:"Everyone on your team is already in this conversation",delay:{show:500,hide:0}})
}},onMpimHeaderClick:function(f){f.preventDefault()
},onMpimItemClick:function(f){var g=$(this).attr("id");
if($(this).hasClass("disabled")){TS.menu.end();
return
}if(g=="mpim_star_item"){f.preventDefault();
TS.stars.checkForStarClick(f)
}else{if(g=="mpim_archives_item"){}else{if(g=="mpim_invite_item"){f.preventDefault();
TS.ui.new_mpim_modal.start(TS.menu.mpim.members)
}else{if(g=="mpim_create_group_item"){f.preventDefault();
TS.ui.new_channel_modal.start("",false,TS.menu.mpim.members)
}else{if(g=="mpim_prefs"){f.preventDefault();
TS.ui.channel_prefs_dialog.start(TS.menu.mpim.id)
}else{TS.warn("not sure what to do with clicked element id:"+g);
return
}}}}}TS.menu.end()
},startWithGroups:function(j){if(TS.menu.isRedundantClick(j)){return
}if(TS.client.ui.checkForEditing(j)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var k=[];
var g=0;
var h;
for(var f=0;
f<TS.model.groups.length;
f++){h=TS.model.groups[f];
if(h.is_archived){g++;
continue
}if(TS.model.prefs.sidebar_behavior=="hide_read_channels"){if(h.unread_cnt){continue
}k.push(h)
}else{if(TS.model.prefs.sidebar_behavior=="hide_read_channels_unless_starred"){if(h.unread_cnt||h.is_starred){continue
}k.push(h)
}else{k.push(h)
}}}TS.menu.$menu_header.html(TS.templates.menu_groups_header());
TS.menu.$menu_items.html(TS.templates.menu_groups_items({nondisplayed_groups:k,show_archived_item:g,user:TS.model.user}));
TS.menu.$menu_items.on("click.menu","li",TS.menu.onGroupsItemClick);
TS.menu.start(j)
},onGroupsItemClick:function(g){var h=$(this).attr("id");
if(h=="new_group_item"){TS.menu.onNewGroupClick(g)
}else{if(h=="groups_archives_item"){}else{if(h=="about_groups_item"){g.preventDefault();
TS.coachmark.start(TS.coachmarks.coachmarks.private_groups_ura)
}else{g.preventDefault();
var f=$(this).data("group-id");
if(f){TS.groups.displayGroup(f)
}}}}TS.menu.end()
},onNewGroupClick:function(f){f.preventDefault();
TS.ui.group_create_dialog.start();
TS.menu.end()
},reported_no_file_reader:false,startWithNewFileOptions:function(h,g){if(TS.menu.isRedundantClick(h)){return
}if(TS.client.ui.checkForEditing(h)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
TS.menu.$menu.addClass("headless footless file_menu");
TS.menu.$menu_header.addClass("hidden").empty();
var f=[];
if(window.File){f.push('<li data-which="choose" class="file_menu_item"><a><i class="file_menu_icon ts_icon ts_icon_upload"></i> Upload a file</a></li>')
}else{if(!TS.menu.reported_no_file_reader){TS.menu.reported_no_file_reader=true;
TS.logError({message:"navigator.userAgent: "+navigator.userAgent},"TS.menu: No File support?")
}}if(TS.boot_data.feature_email_ingestion&&TS.model.team.prefs.allow_email_ingestion){f.push('<li data-which="email" class="file_menu_item"><a target="_blank" href="/account/settings"><i class="file_menu_icon ts_icon ts_icon_share_email"></i> Import an email</a></li>')
}f.push('<li data-which="snippet" class="file_menu_item"><a target="_blank" href="/files/create/snippet"><i class="file_menu_icon ts_icon ts_icon_create_snippet"></i> Create a text snippet</a></li>');
if(TS.boot_data.feature_spaces){f.push('<li data-which="space" class="file_menu_item"><a target="_blank" href="/files/create/space"><i class="file_menu_icon ts_icon ts_icon_create_post"></i> Create a Post</a></li>')
}if(!TS.boot_data.feature_spaces){f.push('<li data-which="post" class="file_menu_item"><a target="_blank" href="/files/create/post"><i class="file_menu_icon ts_icon ts_icon_create_post"></i> Create a post</a></li>')
}if(TS.utility.box.isBrowserSupported()&&TS.model.prefs.box_enabled){f.push('<li data-which="box" class="file_menu_item"><a><i class="file_menu_icon ts_icon ts_icon_box"></i> Import from Box</a></li>')
}if(window.Dropbox&&Dropbox.isBrowserSupported()&&TS.model.prefs.dropbox_enabled){f.push('<li data-which="dropbox" class="file_menu_item"><a><i class="file_menu_icon ts_icon ts_icon_dropbox"></i> Import from Dropbox</a></li>')
}TS.menu.$menu_items.html(f.join("\n"));
TS.menu.$menu_items.on("click.menu","li",TS.menu.onNewFileOptionsItemClick);
TS.kb_nav.setSubmitItemHandler(TS.menu.onNewFileOptionsItemClick);
TS.menu.start(h);
if(g.attr("id")=="primary_file_button"){TS.menu.positionAt(g,1,-(TS.menu.$menu.height()+6))
}else{TS.menu.positionAt(g,g.width()-TS.menu.$menu.width(),g.outerHeight()+10)
}},onNewFileOptionsItemClick:function(g){var h=$(this).data("which");
if(h=="choose"){g.preventDefault();
$("#file-upload").trigger("click")
}else{if(h=="email"){}else{if(h=="snippet"){g.preventDefault();
TS.client.ui.startSnippetFromChatInput()
}else{if(h=="post"){}else{if(h=="box"){g.preventDefault();
TS.files.openBoxChooser()
}else{if(h=="dropbox"){g.preventDefault();
TS.files.openDropboxChooser()
}else{if(h=="space"&&TS.boot_data.feature_spaces){g.preventDefault();
var f=(g&&((g.ctrlKey&&!TS.model.is_mac)||(g.metaKey&&TS.model.is_mac)));
TS.files.createAndOpenNewSpace(null,f)
}else{g.preventDefault();
TS.warn("not sure what to do with clicked element:"+h)
}}}}}}}TS.menu.end()
},startWithService:function(k,g){if(TS.menu.isRedundantClick(k)||TS.client.ui.checkForEditing(k)||TS.model.menu_is_showing||typeof g==="undefined"){return false
}var l=TS.bots.getBotById(g.service_id);
TS.menu.clean();
TS.menu.$menu.addClass("profile_preview");
var j={avatar:l.icons.image_48,name:l.name,integration_type:"Twitter",details:"Posts tweets sent to @slackhq to #slackhq",added_by:"James Sherrett",label:"SlackHQ Tweets"};
var i={id:l.id,files:false};
var h=TS.templates.service_preview_header(j);
var f=TS.templates.service_preview_body(i);
TS.menu.$menu_header.html(h);
TS.menu.$menu_items.html(f);
TS.menu.start(k,g.position_by_click)
},onServiceClick:function(g,f){},startWithMember:function(l,i,k,m,g){if(TS.menu.isRedundantClick(l)){return
}if(TS.client.ui.checkForEditing(l)){return
}if(TS.model.menu_is_showing){return
}var h=TS.menu.member=TS.members.getMemberById(i);
if(!h){return
}if(!TS.members.canUserSeeMember(h)){return
}var o=(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration)&&TS.model.team.prefs.allow_email_ingestion;
TS.menu.clean();
var n={member:h,show_dm_item:!g,show_hide_messages_item:TS.boot_data.feature_user_hidden_msgs&&TS.model.user_hiddens.indexOf(h.id)==-1,show_unhide_messages_item:TS.boot_data.feature_user_hidden_msgs&&TS.model.user_hiddens.indexOf(h.id)>-1,show_email_item:o};
if(g){TS.menu.$menu_header.addClass("hidden").empty();
n.im=TS.ims.getImByMemberId(i)
}else{TS.menu.$menu_header.html(TS.templates.menu_member_header(n))
}if(m&&i==TS.model.user.id){n.other_accounts=TS.boot_data.other_accounts;
n.logout_url=TS.boot_data.logout_url;
n.signin_url=TS.boot_data.signin_url
}if(!h.deleted&&!h.is_slackbot&&i!=TS.model.user.id){if(!TS.model.user.is_ultra_restricted&&!h.is_ultra_restricted){var p=TS.members.getMyChannelsThatThisMemberIsNotIn(i);
if(p.length){n.show_channel_invite=true
}n.show_group_create=true;
if(TS.model.allow_invite_to_group_from_person){n.show_group_invite=true
}}}var f=TS.shared.getActiveModelOb();
if(TS.model.active_channel_id||TS.model.active_group_id){if((!f.is_general||h.is_restricted)&&i!=TS.model.user.id&&f.members&&f.members.indexOf(i)!=-1){if(!h.is_ultra_restricted){if((f.is_group&&TS.members.canUserKickFromGroups())||(f.is_channel&&TS.members.canUserKickFromChannels())){n.channel_kick_name=(TS.model.active_channel_id?"#":"")+f.name
}}}}if(i=="USLACKBOT"){var q=false;
if(TS.model.user.is_admin){q=true
}else{if(!TS.model.team.prefs.slackbot_responses_disabled&&!TS.model.team.prefs.slackbot_responses_only_admins){q=true
}}n.show_slackbot_responses_item=q
}TS.menu.$menu_items.html(TS.templates.menu_member_items(n));
if(i==TS.model.user.id){TS.menu.$menu_footer.html(TS.templates.menu_user_footer({user:h}));
TS.menu.$menu.addClass("footless")
}else{if(!g){TS.menu.$menu_footer.html(TS.templates.menu_member_footer({member:h}))
}}TS.menu.start(l,k);
var j=TS.utility.keymap;
$("#menu_member_dm_input").bind("keydown",function(s){var r=$(this);
if(s.which==j.enter&&!s.shiftKey){if($.trim(r.val())!==""){s.preventDefault();
TS.ims.startImByMemberId(h.id,false,r.val());
TS.menu.end()
}}});
TS.menu.$menu_header.bind("click.menu",TS.menu.onMemberHeaderClick);
TS.menu.$menu_items.on("click.menu","li",TS.menu.onMemberItemClick);
TS.kb_nav.setSubmitItemHandler(TS.menu.onMemberItemClick);
if(g){TS.menu.positionAt($("#active_channel_name .name"),24,47)
}$("#menu_user_status_input").select();
if(g){TS.view.setFlexMenuSize()
}else{TS.menu.keepInBounds()
}},onMemberHeaderClick:function(f){f.preventDefault();
TS.client.ui.previewMember(TS.menu.member.id);
TS.menu.end()
},onMemberItemClick:function(h){var i=$(this).attr("id");
clearTimeout(TS.menu.end_time);
if(i=="member_photo_item"){}else{if(i=="member_archives_item"){}else{if(i=="member_star_item"){h.preventDefault();
TS.stars.checkForStarClick(h)
}else{if(i=="member_email_item"){}else{if(i=="member_skype_item"){}else{if(i=="member_account_item"){}else{if(i=="member_prefs_item"){h.preventDefault();
TS.ui.prefs_dialog.start()
}else{if(i=="member_files_item"){h.preventDefault();
TS.view.fileClearFilter();
TS.client.ui.filterFileList(TS.menu.member.id)
}else{if(i=="member_dm_item"){h.preventDefault();
TS.ims.startImByMemberId(TS.menu.member.id)
}else{if(i=="member_invite_channel_item"){h.preventDefault();
TS.ui.invite.showInviteMemberToChannelDialog(TS.menu.member.id)
}else{if(i=="member_invite_group_item"){h.preventDefault();
TS.ui.invite.showInviteMemberToGroupDialog(TS.menu.member.id)
}else{if(i=="member_create_group_item"){h.preventDefault();
if(TS.boot_data.feature_private_channels){TS.ui.new_channel_modal.start("",false,[TS.menu.member.id])
}else{TS.ui.group_create_dialog.startWithMember(TS.menu.member.id)
}}else{if(i=="member_profile_item"){h.preventDefault();
TS.client.ui.previewMember(TS.menu.member.id)
}else{if(i=="member_presence"){h.preventDefault();
TS.members.toggleUserPresence();
TS.menu.end_time=setTimeout(function(){TS.menu.end()
},1000);
return
}else{if(i=="logout"){h.preventDefault();
TS.utility.loadUrlInWindowIfOnline(TS.boot_data.logout_url)
}else{if($(this).hasClass("switch_team")){h.preventDefault();
var g=$(this).data("team-id");
if(TSSSB.call("displayTeam",g)){h.preventDefault()
}else{var f=$(this).find("a").attr("href");
if(f&&f.indexOf("?")==-1){$(this).find("a").attr("href",f+="?"+TS.appendQSArgsToUrl())
}}}else{if(i=="member_kick_channel_item"){h.preventDefault();
if(TS.model.active_channel_id){TS.channels.kickMember(TS.model.active_channel_id,TS.menu.member.id)
}else{if(TS.model.active_group_id){TS.groups.kickMember(TS.model.active_group_id,TS.menu.member.id)
}}}else{if(i=="member_hide_messages_item"){TS.utility.msgs.hideMessagesFrom(TS.menu.member.id)
}else{if(i=="member_unhide_messages_item"){TS.utility.msgs.unHideMessagesFrom(TS.menu.member.id)
}else{if(i=="member_slackbot_responses"){}else{if(i=="member_open_profile_item"){}else{h.preventDefault();
TS.warn("not sure what to do with clicked element id:"+i);
return
}}}}}}}}}}}}}}}}}}}}}TS.menu.end()
},startWithMemberPreview:function(k,h,i,f){if(TS.menu.isRedundantClick(k)){return
}if(TS.client&&TS.client.ui.checkForEditing(k)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var o=$(k.target).closest(".member_preview_menu_target");
if(!h){h=o.closest("[data-member-id]").data("member-id")
}var g=TS.menu.member=TS.members.getMemberById(h);
var m=TS.ims.getImByMemberId(h);
var l={member:g,is_team_directory:true,im_id:m&&m.id,hide_view_profile:f};
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu.addClass("headless footless").css("min-width",245);
if(!g.deleted&&!g.is_slackbot&&h!=TS.model.user.id){if(!TS.model.user.is_ultra_restricted&&!g.is_ultra_restricted){var n=TS.members.getMyChannelsThatThisMemberIsNotIn(h);
if(n.length){l.show_channel_invite=true
}l.show_group_create=true;
if(TS.model.allow_invite_to_group_from_person){l.show_group_invite=true
}}}if(i){TS.menu.$menu_items.html(TS.templates.menu_member_items_short(l))
}else{TS.menu.$menu_items.html(TS.templates.menu_member_items(l));
TS.menu.$menu_items.on("click.menu","li",TS.menu.onMemberItemClick)
}TS.menu.start(k);
TS.kb_nav.setSubmitItemHandler(TS.menu.onMemberItemClick);
var j=0;
if(!g.is_self||TS.web){j=o.outerWidth()-TS.menu.$menu.width()-1
}TS.menu.positionAt(o,j,o.outerHeight()+5);
TS.menu.keepInBounds()
},startWithMembers:function(i){if(TS.menu.isRedundantClick(i)){return
}if(TS.client.ui.checkForEditing(i)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var f=false;
var g=TS.members.getActiveMembersWithSlackbotAndNotSelf();
if(g.length>5){f=true
}var h=false;
if(TS.menu.large_list_trigger>0&&g.length>TS.menu.large_list_trigger){h=true
}TS.menu.$menu_header.html(TS.templates.menu_members_header({show_filter:f,large_team:h}));
if(h){TS.menu.$menu_items[0].style.display="none";
TS.menu.$menu_header.find(".show_all").one("click",function(l){TS.menu.large_list_trigger=0;
$("#dms_filter_show_all").remove();
TS.menu.$menu_items[0].style.display="block";
var m=$("#dms_filter").find(".member_filter");
var j=m.val();
m.focus();
if(j&&j.length){m.val("");
m.trigger("update-team-filter")
}else{var k=TS.menu.$menu.find("#menu_items_scroller").data("monkeyScroll");
if(k){k.updateFunc(true)
}TS.menu.$menu_items.trigger("scroll.lazyload")
}TS.menu.keepInBounds();
l.preventDefault();
return false
})
}else{TS.menu.$menu_items[0].style.display="block"
}if(!TS.menu.members_html_cache){TS.menu.members_html_cache=TS.templates.menu_members_items({members:g})
}TS.menu.$menu_items.html(TS.menu.members_html_cache);
TS.menu.$menu_footer.html(TS.templates.menu_members_footer());
TS.menu.$menu_items.on("click.menu","li",TS.menu.onMembersItemClick);
TS.menu.start(i);
$("#about_dms_link").on("click",function(j){j.preventDefault();
TS.menu.end();
TS.coachmark.start(TS.coachmarks.coachmarks.direct_messages)
});
if(f){TS.members.view.bindTeamFilter("#dms_filter","#menu_items_scroller");
$("#dms_filter").find(".member_filter").focus();
TS.members.view.team_filter_changed_sig.add(TS.kb_nav.clearHighlightedItem,TS.kb_nav);
TS.members.view.team_filter_changed_sig.add(TS.menu.filterChanged,TS.menu);
TS.kb_nav.setAllowHighlightWithoutBlurringInput(true)
}if(!TS.menu.watching_members_model){TS.members.members_for_user_changed_sig.add(TS.menu.membersModelChanged,TS.menu);
TS.members.changed_name_sig.add(TS.menu.membersModelChanged,TS.menu);
TS.members.changed_deleted_sig.add(TS.menu.membersModelChanged,TS.menu);
TS.members.presence_changed_sig.add(TS.menu.membersModelChanged,TS.menu);
TS.menu.watching_members_model=true
}},filterChanged:function(f,g){if(!TS.menu.$menu_items){return
}if(TS.menu.large_list_trigger>0&&g>TS.menu.large_list_trigger&&(!f||!f.length)){if(!TS.menu.menu_items_hidden){TS.menu.$menu_items[0].style.display="none";
TS.menu.menu_items_hidden=true
}}else{if(TS.menu.menu_items_hidden){TS.menu.$menu_items[0].style.display="block";
TS.menu.menu_items_hidden=false
}}TS.menu.keepInBounds()
},membersModelChanged:function(){TS.menu.members_html_cache=null;
if(!TS.model.menu_is_showing||!$("#menu_items .dm_list_item").length){TS.members.members_for_user_changed_sig.remove(TS.menu.membersModelChanged,TS.menu);
TS.members.changed_name_sig.remove(TS.menu.membersModelChanged,TS.menu);
TS.members.changed_deleted_sig.remove(TS.menu.membersModelChanged,TS.menu);
TS.members.presence_changed_sig.remove(TS.menu.membersModelChanged,TS.menu);
TS.menu.watching_members_model=false;
return
}},onMembersItemClick:function(g){g.preventDefault();
var f=$(this).data("member-id");
if(f){TS.ims.startImByMemberId(f)
}TS.menu.end()
},startWithFileFilter:function(i,f){if(TS.menu.isRedundantClick(i)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
TS.menu.$menu.addClass("headless footless no_min_width");
var h="all";
if(TS.model.file_list_types){h=TS.model.file_list_types[0]
}var g=(TS.boot_data.feature_email_ingestion&&TS.model.team.prefs.allow_email_ingestion)||(TS.boot_data.feature_email_integration&&TS.model.team.plan);
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.menu_file_filter_items({active_type:h,show_email_item:g}));
if(f){TS.menu.$menu_items.on("click.menu","li",TS.menu.onSearchFileFilterItemClick)
}else{TS.menu.$menu_items.on("click.menu","li",TS.menu.onFileFilterItemClick)
}TS.menu.start(i);
if(f){TS.menu.positionAt($("#search_results_container"),8,74)
}else{TS.menu.positionAt($("#file_list_container"),8,44)
}},onFileFilterItemClick:function(f){f.preventDefault();
TS.client.ui.filterFileList($(this).data("filetype"));
TS.view.fileSetButtonState($(this).data("filetype"));
TS.menu.end()
},onSearchFileFilterItemClick:function(f){f.preventDefault();
TS.search.setFiletypeFilter($(this).data("filetype"));
TS.view.fileSetButtonState($(this).data("filetype"));
TS.menu.end()
},startWithFileMemberFilter:function(o,g){var l,k,h,f,m;
if(TS.menu.isRedundantClick(o)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
TS.menu.$menu.addClass("footless no_min_width");
TS.menu.$menu_header.html(TS.templates.menu_file_member_header());
h=TS.members.getMembersForUser();
f=[];
m=[];
for(l=0,k=h.length;
l<k;
l++){if(h[l].is_bot||h[l].is_slackbot){m.push(h[l])
}else{f.push(h[l])
}}h=f.concat(m);
TS.menu.$menu_items.html(TS.templates.menu_file_member_filter_items({members:h}));
if(g){TS.menu.$menu_items.on("click.menu","li",TS.menu.onSearchFileMemberFilterItemClick)
}else{TS.menu.$menu_items.on("click.menu","li",TS.menu.onFileMemberFilterItemClick)
}TS.menu.start(o);
if(g){TS.menu.positionAt($("#search_results_container"),102,100)
}else{var n=$("#file_list_toggle_user");
TS.menu.positionAt($("#file_list_toggle_user"),0,n.outerHeight())
}TS.members.view.bindTeamFilter("#file_member_filter","#menu_items_scroller");
$("#file_member_filter").find(".member_filter").focus().keydown(function(i){if(i.which==TS.utility.keymap.enter){var j=$("#menu_items .member_item.active");
if(j.length==1){j.find("a").click()
}}});
TS.members.view.team_filter_changed_sig.add(TS.kb_nav.clearHighlightedItem,TS.kb_nav);
TS.kb_nav.setAllowHighlightWithoutBlurringInput(true)
},onFileMemberFilterItemClick:function(f){f.preventDefault();
var g=$(this).data("member-id");
TS.client.ui.toggleFileList(g);
TS.menu.end()
},onSearchFileMemberFilterItemClick:function(f){f.preventDefault();
var g=$(this).data("member-id");
TS.search.setMember(g);
TS.menu.end()
},startWithMessageActions:function(j,n,m){if(TS.client&&!TS.model.ms_connected){TS.sounds.play("beep");
return
}if(TS.menu.isRedundantClick(j)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
TS.menu.$menu.addClass("headless footless");
var f=TS.utility.msgs.getMsg(n,m);
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.menu_message_action_items({msg:f,actions:TS.utility.msgs.getMsgActions(f),model_ob:TS.shared.getActiveModelOb()}));
TS.menu.$menu.addClass("no_min_width");
TS.menu.$menu_items.on("click.menu","li",TS.menu.onMessageActionClick);
TS.menu.start(j);
var o=$(j.target);
var g=0;
var h=o.width()+10;
if(TS.client&&!TS.model.ui_state.flex_visible){h=-(TS.menu.$menu.width()+10)
}var i=TS.menu.$menu.find("#edit_link");
if(i.length===0){i=TS.menu.$menu.find("#rxn_link")
}if(i.length>0){var l=TS.menu.$menu.offset().top;
var k=i.offset().top;
g=-(k-l+(i.height()/2)-5)
}TS.menu.positionAt(o,h,g);
TS.menu.keepInBounds()
},onMessageActionClick:function(h){h.preventDefault();
var j=$(this).attr("id");
var i=$(this).data("msg-ts");
var f=$(this).data("rxn-key");
var g=TS.shared.getActiveModelOb();
if(j=="edit_link"){TS.msg_edit.startEdit(i,g)
}else{if(j=="delete_link"){TS.msg_edit.startDelete(i,g)
}else{if(j==="pin_link"){TS.pins.pinMessage(i,g)
}else{if(j==="unpin_link"){TS.pins.unPinMessage(i,g)
}else{if(j==="rxn_link"){TS.emoji_menu.startEmoForRxn(h,f)
}else{if(j==="open_original_link"){}}}}}}TS.menu.end()
},startWithCommentActions:function(o,n,g){if(TS.client&&!TS.model.ms_connected){TS.sounds.play("beep");
return
}if(TS.menu.isRedundantClick(o)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var h=TS.files.getFileById(n);
if(!h){return
}var l=TS.files.getFileCommentById(h,g);
if(!l){return
}var f=TS.shared.getActiveModelOb();
var i=TS.files.getFileCommentActions(l,h);
TS.menu.$menu.addClass("headless footless");
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.menu_comment_action_items({model_ob:f,file:h,comment:l,actions:i}));
TS.menu.$menu.addClass("no_min_width");
TS.menu.$menu_items.on("click.menu","li",TS.menu.onCommentActionClick);
TS.menu.start(o);
var r=$(o.target);
var k=0;
var j=-(TS.menu.$menu.width()+10);
var m=TS.menu.$menu.find("#edit_file_comment");
if(m.length===0){m=TS.menu.$menu.find("#rxn_file_comment")
}if(m.length>0){var q=TS.menu.$menu.offset().top;
var p=m.offset().top;
k=-(p-q+(m.height()/2)-5)
}TS.menu.positionAt(r,j,k);
TS.menu.keepInBounds()
},onCommentActionClick:function(h){h.preventDefault();
var i=$(this).attr("id");
var f=$(this).data("rxn-key");
var g=TS.shared.getActiveModelOb();
if(i=="edit_file_comment"){h.preventDefault();
TS.comments.ui.startEdit($(this).data("file-id"),$(this).data("comment-id"))
}else{if(i=="delete_file_comment"){h.preventDefault();
TS.comments.ui.startDelete($(this).data("file-id"),$(this).data("comment-id"))
}else{if(i=="rxn_file_comment"){h.preventDefault();
TS.emoji_menu.startEmoForRxn(h,f)
}else{if(i=="pin_comment"&&g){h.preventDefault();
TS.pins.pinFileComment($(this).data("comment-id"),$(this).data("file-id"),g)
}else{if(i=="unpin_comment"&&g){h.preventDefault();
TS.pins.unPinFileComment($(this).data("comment-id"),$(this).data("file-id"),g)
}else{h.preventDefault();
TS.warn("not sure what to do with clicked element id:"+i);
return
}}}}}TS.menu.end()
},file_list_menu_up:false,startWithFileActions:function(l,k){if(TS.client&&!TS.model.ms_connected){TS.sounds.play("beep");
return
}if(TS.menu.isRedundantClick(l)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var h=TS.files.getFileById(k);
if(!h){return
}TS.menu.$menu.addClass("headless footless");
var j=TS.files.getFileActions(h);
var n=$(l.target);
var m=n.closest(".file_actions");
if(j.comment&&m.data("exclude-comment")){j.comment=false
}if(j.download&&m.data("exclude-download")){j.download=false
}if(j.open_original&&m.data("exclude-original")){j.open_original=false
}if(j.edit&&m.data("exclude-edit")){j.edit=false
}if(j.print&&m.data("exclude-print")){j.print=false
}if(j.create_public_link&&m.data("exclude-create-public-link")){j.create_public_link=false
}if(j.revoke_public_link&&m.data("exclude-revoke-public-link")){j.revoke_public_link=false
}if(m.data("include-open-flexpane")){j.open_in_flexpane=true
}if(m.data("include-open-file-page")){j.open_file_page=true
}if(m.data("include-copy-file-link")&&TS.clipboard.canWriteText()){j.copy_file_link=true
}if(m.data("include-copy-file-link")&&c()){j.copy_file_link_flash=true
}if(m.data("include-view-public-link")){j.view_public_link=true
}var g=n.closest(".file_list_item").length>0;
if(g){j.share=false;
TS.menu.file_list_menu_up=true
}var i=n.closest(".inline_file_preview_container, .file_container");
if(i.length>0){i.addClass("file_menu_open")
}TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.menu_file_action_items({file:h,actions:j,is_refreshing:TS.files.waiting_for_refresh[h.id],model_ob:TS.shared.getActiveModelOb()}));
if(TS.boot_data.feature_fix_files){TS.menu.$menu.addClass("no_icons")
}if(TS.web){TS.menu.$menu_items.on("click.menu","li",TS.menu.onFileActionClickWeb)
}else{if(TS.client){TS.menu.$menu_items.on("click.menu","li",TS.menu.onFileActionClickClient)
}}TS.menu.start(l);
n.closest(".file_list_item").addClass("active");
n.closest(".ts_tip").addClass("ts_tip_hide");
TS.menu.positionAt(n,-(TS.menu.$menu.width()+6),0);
TS.menu.keepInBounds();
if(c()){var f=$("#copy_file_link_flash");
b=new ZeroClipboard(f);
b.on("ready",function(){f.removeClass("hidden");
TS.menu.keepInBounds()
})
}},onFileActionClickClient:function(i){var j=$(this).attr("id");
var f=$(this).data("rxn-key");
var h=TS.files.getFileById($(this).data("file-id"));
var g=TS.shared.getActiveModelOb();
if(!h){TS.error("no file id:"+$(this).data("file-id"));
return
}if(j=="share_file"){i.preventDefault();
TS.view.shareFileInCurrentChannelOrIM(h.id)
}else{if(j=="edit_file_snippet"){i.preventDefault();
TS.ui.snippet_dialog.startEdit(h.id)
}else{if(j=="edit_file_post"){}else{if(j=="edit_file_space"){if(TS.client.windows.openFileWindow(h.id)){i.preventDefault()
}}else{if(j=="edit_file_title"){i.preventDefault();
if(TS.model.previewed_file_id!=h.id){TS.client.ui.previewFile(h.id,"file_list")
}TS.files.editFileTitle(h.id)
}else{if(j=="delete_file"){i.preventDefault();
TS.view.deleteFile(h.id)
}else{if(j=="create_public_link"){i.preventDefault();
if(TS.model.team.prefs.disallow_public_file_urls){TS.generic_dialog.alert("An administator has disabled public file URL creation. You will not be able to create a public URL for this file.");
return
}TS.files.createPublicURL(h,function(l,m,k){if(l){if(TS.model.previewed_file_id){$("#file_preview_scroller").find(".file_actions_link").scrollintoview({duration:500,offset:"top",px_offset:-50})
}$(".file_public_link_"+h.id).highlightText();
if(TS.boot_data.feature_fix_files){TS.ui.fileShowPublicUrlDialog(h)
}}})
}else{if(j=="revoke_public_link"){i.preventDefault();
TS.ui.fileRevokePublicLink(h.id)
}else{if(j=="view_public_link"){i.preventDefault();
TS.ui.fileShowPublicUrlDialog(h)
}else{if(j=="refresh_file"){i.preventDefault();
TS.files.refreshFile(h.id);
TS.menu.$menu.find("#refresh_file").find(".item_label").text("Refreshing...").end().find("i").addClass("ts_icon_spin");
return
}else{if(j=="download_file"){if(TS.client&&TS.client.downloads.startDownload(h)){i.preventDefault()
}}else{if(j=="open_original_file"){}else{if(j=="comment_file"){i.preventDefault();
if(TS.model.previewed_file_id!=h.id){TS.client.ui.previewFile(h.id,"file_list",false,true)
}else{$("#file_comment").focus()
}}else{if(j=="save_to_dropbox"){return Dropbox.save(h.url_download,h.name)
}else{if(j==="rxn_file"){i.preventDefault();
TS.emoji_menu.startEmoForRxn(i,f)
}else{if(j==="share_private_file"){i.preventDefault();
TS.files.shareOrReshareFile(h.id)
}else{if(j==="pin_file"&&g){i.preventDefault();
TS.pins.pinFile(h.id,g)
}else{if(j==="unpin_file"&&g){i.preventDefault();
TS.pins.unPinFile(h.id,g)
}else{if(j==="open_in_flexpane"){i.preventDefault();
TS.client.ui.previewFile(h.id)
}else{if(j==="copy_file_link"){i.preventDefault();
if(TS.clipboard.canWriteText()){TS.clipboard.writeText(h.permalink)
}else{TS.warn("User clicked copy link, but we can't write to the clipboard right now")
}}else{if(j==="copy_file_link_flash"){return
}else{i.preventDefault();
TS.warn("not sure what to do with clicked element id:"+j);
return
}}}}}}}}}}}}}}}}}}}}}TS.menu.end()
},onFileActionClickWeb:function(i){var j=$(this).attr("id");
var f=$(this).data("rxn-key");
var h=TS.files.getFileById($(this).data("file-id"));
var g=TS.shared.getActiveModelOb();
if(!h){TS.error("no file id:"+$(this).data("file-id"));
return
}if(j=="share_file"){i.preventDefault();
TS.ui.share_dialog.start(h.id)
}else{if(j==="share_private_file"){i.preventDefault();
TS.files.shareOrReshareFile(h.id)
}else{if(j=="edit_file_snippet"){}else{if(j=="edit_file_post"){}else{if(j=="edit_file_space"){}else{if(j=="edit_file_title"){}else{if(j=="delete_file"){i.preventDefault();
TS.web.file.deleteFile(h.id)
}else{if(j=="create_public_link"){i.preventDefault();
if(!TS.model.team.prefs.disallow_public_file_urls){TS.api.callImmediately("files.sharedPublicURL",{file:h.id},function(m,n,k){if(m){var l=$(".file_public_link_shared");
l.slideToggle(100);
TS.files.upsertAndSignal({id:h.id,public_url_shared:true});
if(TS.boot_data.feature_fix_files&&l.length===0){TS.ui.fileShowPublicUrlDialog(h)
}}else{if(n.error&&n.error==="not_allowed"){TS.model.team.prefs.disallow_public_file_urls=true;
TS.generic_dialog.alert("An administator has disabled public file URL creation. You will not be able to create a public URL for this file.")
}}})
}}else{if(j=="revoke_public_link"){i.preventDefault();
if(TS.web.file){TS.web.file.revokePublicURL(h)
}else{TS.ui.fileRevokePublicLink(h.id)
}}else{if(j=="view_public_link"){i.preventDefault();
TS.ui.fileShowPublicUrlDialog(h)
}else{if(j=="refresh_file"){i.preventDefault();
TS.files.refreshFile(h.id);
TS.menu.$menu.find("#refresh_file").find(".item_label").text("Refreshing...").end().find("i").addClass("ts_icon_spin");
return
}else{if(j=="download_file"){}else{if(j=="print_file"){window.print();
i.preventDefault()
}else{if(j=="open_original_file"){}else{if(j=="comment_file"){i.preventDefault();
$("#file_comment").focus()
}else{if(j=="save_to_dropbox"){return Dropbox.save(h.url_download,h.name)
}else{if(j==="rxn_file"){i.preventDefault();
TS.emoji_menu.startEmoForRxn(i,f)
}else{if(j==="pin_file"&&g){i.preventDefault();
TS.pins.pinFile(h.id,g)
}else{if(j==="unpin_file"&&g){i.preventDefault();
TS.pins.unPinFile(h.id,g)
}else{if(j==="open_file_page"){}else{i.preventDefault();
TS.warn("not sure what to do with clicked element id:"+j);
return
}}}}}}}}}}}}}}}}}}}}TS.menu.end()
},startWithSpaceWeb:function(l,k){var n=5;
if(TS.menu.isRedundantClick(l)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var g=TS.files.getFileById(k);
if(!g){return
}var h=TS.files.getFileActions(g);
var m={file:g,actions:h,can_write_to_clipboard:TS.clipboard.canWriteText()};
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.menu_space_action_items(m));
TS.menu.$menu_items.on("click.menu","li",TS.menu.onSpaceClickWeb);
TS.kb_nav.setSubmitItemHandler(TS.menu.onSpaceClickWeb);
TS.menu.start(l);
var i=$(".space_btn_more");
var j=-TS.menu.$menu.outerWidth()+i.outerWidth();
var f=i.outerHeight()+n;
TS.menu.positionAt(i,j,f)
},onSpaceClickWeb:function(g){var h=$(this).attr("id");
var f=TS.files.getFileById($(this).data("file-id"));
if(!f){return
}if(h=="keyboard_shortcuts"){g.preventDefault();
TS.ui.shortcuts_dialog.start(true)
}else{if(h=="learn_more"){g.preventDefault();
if(f.mode==="space"){TS.web.space.learnMore()
}}else{if(h=="delete_space"){g.preventDefault();
TS.web.file.deleteFile(f.id)
}else{if(h=="copy_space_link"){g.preventDefault();
if(TS.clipboard.canWriteText()){TS.clipboard.writeText(f.permalink)
}else{TS.warn("User clicked copy link, but we can't write to the clipboard right now")
}}else{if(h=="create_public_space_link"||h=="view_public_space_link"){g.preventDefault();
TS.files.createPublicURL(f)
}else{if(h=="print_space"){window.print();
g.preventDefault()
}else{g.preventDefault();
TS.warn("not sure what to do with clicked element id:"+h);
return
}}}}}}TS.menu.end()
},startWithTeamAndUser:function(f){if(TS.menu.isRedundantClick(f)){return
}if(TS.client.ui.checkForEditing(f)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
var g={user:TS.model.user,team_name:TS.model.team.name,logout_url:TS.boot_data.logout_url,signin_url:TS.boot_data.signin_url,help_url:TS.boot_data.help_url};
if(Object.keys(TS.boot_data.other_accounts).length){g.other_accounts=TS.boot_data.other_accounts
}TS.menu.$menu.addClass("headless footless team_menu");
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.menu_team_and_user_items(g));
TS.menu.$menu_items.on("click.menu","li",TS.menu.onTeamAndUserItemClick);
TS.menu.$menu_items.on("mouseenter.section_header","> div.section_header",TS.kb_nav.clearHighlightedItem);
TS.kb_nav.setSubmitItemHandler(TS.menu.onTeamAndUserItemClick);
TS.menu.start(f);
TS.menu.positionAt($("#team_menu"),150,49);
TS.view.setFlexMenuSize()
},onTeamAndUserItemClick:function(i){clearTimeout(TS.menu.end_time);
var f=$(this).attr("id");
if(!f&&$(this).hasClass("switch_team")){f="switch_team"
}switch(f){case"member_account_item":case"team_settings":case"manage_team":case"team_billing":case"team_services":case"team_customize":case"team_apps":break;
case"team_invitations":i.preventDefault();
TS.ui.admin_invites.start();
break;
case"member_prefs_item":i.preventDefault();
TS.ui.prefs_dialog.start();
break;
case"team_help":i.preventDefault();
TS.help_dialog.start();
break;
case"team_home":i.preventDefault();
TS.client.ui.showTeamList();
break;
case"add_team":if(TSSSB.call("signInTeam")){i.preventDefault()
}break;
case"member_presence":i.preventDefault();
TS.members.toggleUserPresence();
TS.menu.end_time=setTimeout(TS.menu.end,1000);
return;
case"logout":i.preventDefault();
TS.utility.loadUrlInWindowIfOnline(TS.boot_data.logout_url);
break;
case"switch_team":var h=$(this).data("user-id");
if(TSSSB.call("displayTeam",h)){i.preventDefault()
}else{var g=$(this).find("a").attr("href");
if(g&&g.indexOf("?")==-1){$(this).find("a").attr("href",[g,TS.appendQSArgsToUrl()].join("?"))
}}break;
default:i.preventDefault();
return
}TS.menu.end()
},startWithFlexMenu:function(g){if(TS.menu.isRedundantClick(g)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
TS.menu.$menu_header.html(TS.templates.menu_flexpane_header());
TS.menu.$menu_items.html(TS.templates.menu_flexpane_items({special_flex_panes:TS.boot_data.special_flex_panes,show_downloads:TS.model.supports_downloads}));
TS.menu.$menu_footer.html(TS.templates.menu_flexpane_footer());
TS.menu.$menu_items.on("click.menu","li",TS.menu.onFlexMenuItemClick);
TS.menu.start(g);
TS.menu.$menu.addClass("flex_menu");
TS.utility.queueRAF(function f(){TS.menu.positionAt($("#flex_menu_toggle"),-(TS.menu.$menu.width()-$("#flex_menu_toggle").width()),37)
});
TS.help.updateIcon();
$("#flex_menu_toggle").addClass("menu_open");
$("#flex_menu_toggle").attr("title","Close Flexpane Menu");
$("#flex_menu_callout").bind("click",function(h){TS.menu.end()
});
TS.view.setFlexMenuSize()
},onFlexMenuItemClick:function(k){var j=200;
var g=$(this).data("tab-id");
if(g){var i=g;
setTimeout(function(){TS.client.ui.cleanupFlexExcluding(i);
if(i=="files"){TS.client.ui.toggleFileList("all");
TS.client.ui.filterFileList("all")
}else{if(i=="team"){TS.client.ui.showTeamList()
}else{TS.client.ui.openFlexTab(i)
}}},j)
}else{if($(this).data("filetype")){var h=$(this).data("filetype");
var f=$("#file_list");
if(!f.length||!f.children().length){if(TS.view.last_files_html){TS.view.last_files_html=""
}}setTimeout(function(){TS.client.ui.cleanupFlexExcluding("files");
TS.client.ui.toggleFileList("all");
TS.client.ui.filterFileList(h);
TS.view.fileSetButtonState(h)
},j)
}else{var l=$(this).attr("id");
if(l=="help"){k.preventDefault();
setTimeout(function(){TS.help_dialog.start()
},j)
}}}TS.menu.end()
},startWithUserGroupMenu:function(j,f){if(TS.menu.isRedundantClick(j)){return
}if(TS.model.menu_is_showing){return
}TS.menu.clean();
TS.menu.user_group=TS.user_groups.getUserGroupsById(f);
TS.menu.$menu.addClass("headless footless no_min_width");
var h=TS.members.canUserCreateAndDeleteUserGroups()&&!TS.menu.user_group.date_delete;
var i=TS.members.canUserCreateAndDeleteUserGroups()&&TS.menu.user_group.date_delete;
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.user_group_items({show_user_groups_edit:TS.members.canUserEditUserGroups(),show_user_groups_disable:h,show_user_groups_enable:i}));
TS.menu.$menu_items.on("click.menu","li",TS.menu.onUserGroupMenuItemClick);
TS.menu.start(j);
TS.utility.queueRAF(function g(){TS.menu.positionAt($("#user_group_menu_toggle"),-(TS.menu.$menu.width()-$("#user_group_menu_toggle").width()),37)
})
},onUserGroupMenuItemClick:function(g){var f=$(this).data("action");
if(f==="edit_info"){TS.ui.admin_user_groups.editInfo(TS.menu.user_group)
}else{if(f==="edit_members"){TS.ui.admin_user_groups.editMembers(TS.menu.user_group)
}else{if(f==="disable"){TS.ui.admin_user_groups.disable(TS.menu.user_group)
}else{if(f==="enable"){TS.ui.admin_user_groups.enable(TS.menu.user_group)
}}}}TS.menu.end()
},startWithChannelPickerForChange:function(j,h){if(TS.menu.isRedundantClick(j)){return
}TS.menu.clean();
var l=TS.members.getMemberById(h);
var g=[],f=[];
$.each(TS.channels.getUnarchivedChannelsForUser(),function(m,n){if(!l.channels.hasOwnProperty(n.id)){g.push(n)
}});
$.each(TS.groups.getUnarchivedGroups(),function(m,n){if(!l.groups.hasOwnProperty(n.id)){f.push(n)
}});
var k={user_id:h,channels:g,groups:f};
TS.menu.$menu_header.html(TS.templates.menu_channel_picker_header(k));
TS.menu.$menu_items.html(TS.templates.menu_channel_picker(k)).css("max-height",274);
TS.menu.$menu_items.on("click.menu","li",TS.menu.onChannelPickerItemClickChangeChannel);
TS.menu.$menu.addClass("footless").css("width",274);
TS.menu.start(j);
var i=$(j.target).closest(".pill");
if(TS.boot_data.app=="mobile"){TS.menu.positionAt(i,-(i.offset().left)+16,0)
}else{TS.menu.positionAt(i,-(TS.menu.$menu.width())+i.outerWidth(),i.height()+4)
}TS.menu.$menu.scrollintoview({duration:500,offset:"bottom",px_offset:-25});
a();
TS.kb_nav.setAllowHighlightWithoutBlurringInput(true)
},onChannelPickerItemClickChangeChannel:function(i){var g=$(this).data("user-id"),f=$(this).data("channel-id"),h=$(this).data("group-id");
if(f){TS.api.call("users.admin.changeURAChannel",{user:g,channel:f},TS.web.admin.onMemberURAChanged)
}else{if(h){TS.api.call("users.admin.changeURAChannel",{user:g,channel:h},TS.web.admin.onMemberURAChanged)
}}TS.menu.end()
},startWithChannelPickerForInvite:function(i,g){if(TS.menu.isRedundantClick(i)){return
}TS.menu.clean();
var l=TS.members.getMemberById(g);
var k=[],f=[];
$.each(TS.channels.getUnarchivedChannelsForUser(),function(m,n){if(!l.channels.hasOwnProperty(n.id)){k.push(n)
}});
$.each(TS.groups.getUnarchivedGroups(),function(m,n){if(!l.groups.hasOwnProperty(n.id)){f.push(n)
}});
var j={user_id:g,channels:k,groups:f};
TS.menu.$menu_header.html(TS.templates.menu_channel_picker_header(j));
TS.menu.$menu_items.html(TS.templates.menu_channel_picker(j)).css("max-height",274);
TS.menu.$menu_items.on("click.menu","li",TS.menu.onChannelPickerItemClickInviteChannel);
TS.menu.$menu.addClass("footless").css("max-width",300);
TS.menu.start(i);
var h=$(i.target).closest(".pill");
if(TS.boot_data.app=="mobile"){TS.menu.positionAt(h,-(h.offset().left)+16,0)
}else{TS.menu.positionAt(h,-(h.width())+10,h.height()+4)
}TS.menu.$menu.scrollintoview({duration:500,offset:"bottom",px_offset:-25});
a();
TS.kb_nav.setAllowHighlightWithoutBlurringInput(true)
},onChannelPickerItemClickInviteChannel:function(i){var g=$(this).data("user-id"),f=$(this).data("channel-id"),h=$(this).data("group-id");
if(f){TS.api.call("channels.invite",{user:g,channel:f},TS.web.admin.onMemberInviteChannel)
}else{if(h){TS.api.call("groups.invite",{user:g,channel:h},TS.web.admin.onMemberInviteGroup)
}}TS.menu.end()
},startWithChannelPicker:function(i,g,f,h){if(TS.menu.isRedundantClick(i)){return
}TS.menu.clean();
var j={user_id:TS.model.user.id,channels:g,groups:f};
TS.menu.$menu_header.html(TS.templates.menu_channel_picker_header(j));
TS.menu.$menu_items.html(TS.templates.menu_channel_picker(j)).css("max-height",274);
TS.menu.$menu_items.on("click.menu","li",h);
TS.menu.$menu.addClass("footless").css("max-width",300);
TS.menu.start(i);
a();
TS.kb_nav.setAllowHighlightWithoutBlurringInput(true)
},startWithSearchFilter:function(g){if(TS.menu.isRedundantClick(g)){return
}if(TS.model.menu_is_showing){return
}var h={search_exclude_bots:TS.model.prefs.search_exclude_bots,search_only_my_channels:TS.model.prefs.search_only_my_channels,files_filter:TS.search.filter==="files",result_type:TS.search.filter==="messages"?"messages":"files"};
TS.menu.clean();
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu.addClass("footless search_filter_menu");
TS.menu.$menu_items.html(TS.templates.menu_search_filter_items(h));
TS.menu.start(g);
e();
var f=$("#search_filter_menu_label");
TS.menu.positionAt(f,-8,f.height()+10);
$("#search_only_my_channels_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"search_only_my_channels",value:!$(this).prop("checked")})
});
$("#search_exclude_bots_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"search_exclude_bots",value:!$(this).prop("checked")})
});
TS.menu.search_filter_is_showing=true;
$("#search_filter_menu_label").addClass("active")
},startWithEditTeamProfileListActions:function(i,f){if(TS.menu.isRedundantClick(i)){return
}if(TS.model.menu_is_showing){return
}var g=$(i.target);
var h=TS.team.getTeamProfileFieldById(g.data("id"));
var j={id:h.id,hidden:!!(h&&h.options&&h.options.is_hidden)};
TS.menu.clean();
TS.menu.$menu.addClass("headless footless fs_modal_menu");
TS.menu.$menu_header.addClass("hidden").empty();
TS.menu.$menu_items.html(TS.templates.admin_menu_edit_team_profile_list_action_items(j));
TS.menu.$menu.addClass("no_min_width");
TS.menu.$menu_items.on("click.menu","li",f);
TS.menu.start(i);
TS.menu.positionAt(g.find('[data-action="edit_team_profile_list_menu"]'),-(TS.menu.$menu.width()+6),0);
TS.menu.keepInBounds()
},positionAt:function(h,g,k){g=g||0;
k=k||0;
var i=h.offset();
var f=i.left+g;
var j=i.top+k;
TS.menu.$menu.css({top:j,left:f})
},isRedundantClick:function(f){if(f&&TS.menu.last_e&&(f.target==TS.menu.last_e.target||f.currentTarget==TS.menu.last_e.currentTarget)){return true
}return false
},isLarge:function(){return(TS.menu&&TS.menu.$menu&&TS.menu.$menu.find("li").length>TS.menu.large_dom_trigger)
},start:function(j,i){TS.menu.last_e=j;
var h=$(j.target).offset();
var m=h.left+$(j.target).width()+10;
var l=h.top;
if(i){m=j.pageX+10;
l=j.pageY+10
}$(".tooltip").hide();
$(j.currentTarget).addClass("active");
TS.menu.$target_element=$(j.currentTarget);
TS.model.menu_is_showing=true;
var f=TS.menu.$menu;
var k=TS.menu.isLarge();
f.css({top:l,left:m});
var o=f.find("#menu_items_scroller");
o.scrollTop(0);
if(TS.client){f.appendTo($("#client-ui"))
}else{f.appendTo($("body"))
}if(!k){f.css("opacity",0);
f.stop().transition({opacity:1},200)
}else{f.css("opacity",1)
}f.find(".menu_close").on("click",TS.menu.end);
TS.menu.keepInBounds();
var n=o.data("monkeyScroll");
if(n){var g=true;
n.updateFunc(g)
}if(TS.menu.menu_lazy_load&&TS.menu.menu_lazy_load.detachEvents){TS.menu.menu_lazy_load.detachEvents()
}TS.menu.menu_lazy_load=TS.menu.$menu_items.find(".lazy").lazyload({container:$("#menu_items_scroller"),all_images_same_size:true,throttle:250});
$(window).bind("resize",TS.menu.keepInBounds);
$(window.document).bind("keydown",TS.menu.onKeyDown);
$("html").bind("mousedown touchstart",TS.menu.onMouseDown);
TS.kb_nav.start(f.find("#menu_items"),"li:not(.divider)")
},clean:function(){TS.menu.$menu_footer.empty();
TS.menu.$menu_header.removeClass("hidden");
TS.menu.$menu.removeClass("no_min_width headless profile_preview footless flex_menu search_filter_menu popover_menu no_icons team_menu file_menu fs_modal_menu").css("min-width",0).css("max-height","");
TS.menu.$menu.find("#menu_items_scroller").css("max-height","");
TS.menu.$menu.find(".arrow, .arrow_shadow").remove();
TS.menu.$menu_items.off("mouseenter.section_header")
},end:function(){TS.model.menu_is_showing=false;
TS.menu.menu_items_hidden=true;
var g=TS.menu.$menu;
var f=function(){if(TS.model.menu_is_showing){return
}setTimeout(function(){if(!TS.model.menu_is_showing){TS.menu.last_e=null
}},50);
g.detach();
TS.menu.$menu_header.empty();
TS.menu.$menu_footer.empty();
TS.menu.$menu_items.empty();
TS.menu.clean()
};
if(!TS.menu.isLarge()){g.stop().transition({opacity:0},200,f)
}else{f()
}if(TS.menu.$target_element){TS.menu.$target_element.removeClass("active");
TS.menu.$target_element=null
}if(TS.boot_data.feature_mpim_client&&TS.menu.mpim&&TS.menu.mpim.members.length>4){$("#active_channel_name").find(".name").tooltip("enable")
}TS.menu.member=null;
TS.menu.channel=null;
TS.menu.mpim=null;
TS.menu.user_group=null;
TS.menu.$menu_header.unbind("click.menu");
TS.menu.$menu_items.off("click.menu");
$(window).unbind("resize",TS.menu.keepInBounds);
$(window.document).unbind("keydown",TS.menu.onKeyDown);
$("html").unbind("mousedown touchstart",TS.menu.onMouseDown);
TS.members.view.team_filter_changed_sig.remove(TS.kb_nav.clearHighlightedItem);
TS.members.view.team_filter_changed_sig.remove(TS.menu.filterChanged,TS.menu);
$(".file_list_item.active").removeClass("active");
$(".ts_tip.ts_tip_hide").removeClass("ts_tip_hide");
TS.menu.search_filter_is_showing=false;
$("#search_filter_menu_label").removeClass("active");
$("#flex_menu_toggle").removeClass("menu_open");
$("#flex_menu_toggle").attr("title","Open Flexpane Menu");
if(b){b.destroy();
b=null
}setTimeout(function(){TS.menu.file_list_menu_up=false;
$(".inline_file_preview_container.file_menu_open, .file_container.file_menu_open").removeClass("file_menu_open")
},100);
if(TS.menu.menu_lazy_load&&TS.menu.menu_lazy_load.detachEvents){TS.menu.menu_lazy_load.detachEvents();
TS.menu.menu_lazy_load=null
}TS.kb_nav.end()
},onKeyDown:function(h){var f=TS.utility.keymap;
var g=h.which;
var i=h.metaKey||h.ctrlKey||h.altKey;
if(g==f.esc){h.stopPropagation();
h.preventDefault();
TS.menu.end();
return
}else{if(!i&&!TS.utility.isArrowKey(g)&&g!=f.tab&&g!=f.enter){TS.kb_nav.clearHighlightedItem();
if(g==f.enter){setTimeout(function(){$("#menu_member_dm_input").focus()
},0)
}else{$("#menu_member_dm_input").focus()
}}}},onMouseDown:function(f){if($(f.target).closest("#menu").length===0){TS.menu.end()
}},keepInBounds:function(){if(window.requestAnimationFrame){window.requestAnimationFrame(TS.menu.keepInBoundsThrottled)
}else{TS.menu.keepInBoundsThrottled()
}},keepInBoundsThrottled:function(){var h=TS.menu.$menu;
var g=10;
var i=h.dimensions_rect();
var f={top:0+g,right:$(window).width()-g,bottom:$(window).height()-(g+14),left:0+g};
if(TS.utility.doesRectContainRect(f,i)){return
}if(i.left<f.left){h.css("left",f.left)
}else{if(i.right>f.right){h.css("left",Math.max(f.left,f.right-i.width))
}}if(i.top<f.top){h.css("top",f.top)
}else{if(i.bottom>f.bottom){h.css("top",Math.max(f.top,f.bottom-i.height+$(window).scrollTop()))
}}}});
var b;
var a=function(){var h=TS.menu.$menu.find(".no_results");
var g=TS.menu.$menu.find(".icon_close");
var i=TS.menu.$menu.find(".menu_filter");
var f="";
g.click(function(){i.val("").trigger("change");
i.focus()
});
TS.menu.$menu_items.children("li").each(function(){var j=$(this).data("channel-id");
if(j){var l=TS.channels.getChannelById(j);
if(l){$(this).data("name","#"+l.name)
}return
}var k=$(this).data("group-id");
if(k){var m=TS.groups.getGroupById(k);
if(m){$(this).data("name",m.name)
}}});
i.on("keyup change paste",TS.utility.debounce(function(n){var m=$(this).val();
if(m){if(f!==m){var k=new RegExp(TS.utility.regexpEscape(m),"i");
var j=false;
g.removeClass("hidden");
TS.menu.$menu_items.children("li").removeClass("hidden").each(function(){var p=$(this).data("name");
if(p){var o=p.match(k);
if(o){j=true;
return
}}$(this).addClass("hidden")
});
if(j){h.addClass("hidden")
}else{h.removeClass("hidden");
h.find(".query").text(m)
}TS.kb_nav.clearHighlightedItem()
}}else{TS.menu.$menu_items.children("li.hidden").removeClass("hidden");
h.addClass("hidden");
g.addClass("hidden");
if(f!==m){TS.kb_nav.clearHighlightedItem()
}}f=m;
if(TS.menu.$menu.find("#menu_items_scroller").data("monkeyScroll")){var l=true;
TS.menu.$menu.find("#menu_items_scroller").data("monkeyScroll").updateFunc(l)
}},250));
i.focus()
};
var e=function(){var f=TS.menu.$menu;
f.addClass("popover_menu");
f.prepend('<span class="arrow"></span><span class="arrow_shadow"></span>')
};
var c=function(){if(!TS.boot_data.feature_fix_files){return false
}if(TS.clipboard.canWriteText()){return false
}if(window.ZeroClipboard&&window.FlashDetect&&FlashDetect.installed){return true
}return false
};
var d=function(){if(!c()){return
}ZeroClipboard.config({swfPath:"/img/zc/ZeroClipboard.swf",hoverClass:"highlighted",forceHandCursor:true});
b=new ZeroClipboard();
b.on("ready",function(){if(b){b.destroy()
}b=null
})
}
})();
(function(){TS.registerModule("cmd_handlers",{server_cmds:null,onStart:function(){if(TS.boot_data.feature_private_channels){TS.cmd_handlers["/open"].desc="Open a "+TS.templates.builders.channelOrGroupCopy();
TS.cmd_handlers["/invite"].desc="Invite another member to a "+TS.templates.builders.channelOrGroupCopy();
TS.cmd_handlers["/archive"].desc="Archive the current "+TS.templates.builders.channelOrGroupCopy();
TS.cmd_handlers["/topic"].desc="Set the "+TS.templates.builders.channelOrGroupCopy()+" topic";
TS.cmd_handlers["/rename"].desc="Rename a "+TS.templates.builders.channelOrGroupCopy();
TS.cmd_handlers["/remove"].desc="Remove a person from the current "+TS.templates.builders.channelOrGroupCopy()
}},mergeInServerCmds:function(a){TS.cmd_handlers.server_cmds=a;
var c;
for(var b in TS.cmd_handlers){if(b.indexOf("/")!==0){continue
}if(TS.cmd_handlers[b].type=="client"){delete TS.cmd_handlers[b].override
}else{TS.log(65,'mergeInCmds is removing the server command "'+b+'" from cmd_handlers');
delete TS.cmd_handlers[b]
}}for(c in a){if(c.indexOf("/")!==0){continue
}if(TS.cmd_handlers[c]){TS.cmd_handlers[c].override=true;
TS.log(65,'mergeInCmds is NOT overwriting a client command for "'+c+'"');
continue
}TS.log(65,'mergeInCmds is adding the server command "'+c+'" to cmd_handlers');
TS.cmd_handlers[c]=TS.cmd_handlers.makeInternalCmdObject(a[c])
}for(c in a){if(c.indexOf("/")!==0){continue
}if(!TS.cmd_handlers[c].alias_of){continue
}var d=TS.cmd_handlers[TS.cmd_handlers[c].alias_of];
if(!d){TS.log(65,'mergeInCmds is NOT adding an alias of "'+c+'" to "'+TS.cmd_handlers[c].alias_of+'" because it was not found');
continue
}if(d.type=="client"){TS.log(65,'mergeInCmds is NOT adding an alias of "'+c+'" to "'+TS.cmd_handlers[c].alias_of+'" because it is not a server command');
continue
}TS.log(65,'mergeInCmds is adding on alias of "'+c+'" to "'+TS.cmd_handlers[c].alias_of+'"');
if(!d.aliases){d.aliases=[]
}d.aliases.push(c)
}},makeInternalCmdObject:function(a){return{autocomplete:true,alias_of:a.alias_of?a.alias_of:null,aliases:null,usage:a.usage||"",desc:a.desc||"",help_text:a.help_text||"",type:a.type||""}
},addTempEphemeralFeedback:function(b,a){if(a){TS.client.ui.$msg_input.val(a)
}TS.client.ui.addOrFlashEphemeralBotMsg({text:b,ephemeral_type:"temp_slash_cmd_feedback"})
},addEphemeralFeedback:function(b,a){if(a){TS.client.ui.$msg_input.val(a)
}TS.utility.msgs.removeAllEphemeralMsgsByType("temp_slash_cmd_feedback",TS.model.active_cid);
TS.client.ui.addEphemeralBotMsg({text:b})
},runCommand:function(b,a,d,c){if(!TS.cmd_handlers[b]){return
}if(TS.model.last_active_cid){TS.utility.msgs.removeAllEphemeralMsgsByType("temp_slash_cmd_feedback",TS.model.last_active_cid)
}TS.cmd_handlers[b].func(b,a,d,c)
},"/status":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.members.setUserStatus(a)
}},"/away":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:'Toggle your "away" status',func:function(c,a,f,d){TS.members.toggleUserPresence();
TS.members.presence_changed_sig.add(function b(e){if(!e||e.id!=TS.model.user.id){return
}TS.members.presence_changed_sig.remove(b);
TS.cmd_handlers.addEphemeralFeedback(":white_check_mark: You are now marked as *"+e.presence+"*.")
});
if(a){TS.members.setUserStatus(a)
}}},"/prefs":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Open the preferences dialog",func:function(b,a,d,c){TS.ui.prefs_dialog.start()
}},"/shortcuts":{type:"client",autocomplete:true,alias_of:null,aliases:["/keys"],desc:"Open the keyboard shortcuts dialog",func:function(b,a,d,c){TS.ui.shortcuts_dialog.start()
}},"/keys":{type:"client",autocomplete:true,alias_of:"/shortcuts",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/shortcuts"].func(b,a,d,c)
}},"/open":{type:"client",autocomplete:true,alias_of:null,aliases:["/join"],desc:"Open a channel or group",args:[{name:"channel",optional:true}],func:function(d,b,h,g){if(h.length==1){if(TS.boot_data.feature_private_channels){TS.ui.channel_browser.start()
}else{TS.ui.list_browser_dialog.start("channels")
}}else{var a=TS.utility.cleanChannelName(b);
var c=TS.channels.getChannelByName(a);
var f=TS.groups.getGroupByName(a);
if(c){if(c.is_member){TS.channels.displayChannel(c.id)
}else{if(!TS.model.user.is_restricted){TS.channels.join(c.name)
}}}else{if(f){if(!f.is_archived||f.was_archived_this_session){TS.groups.displayGroup(f.id)
}}else{if(TS.members.canUserCreateChannels()){if(TS.boot_data.feature_private_channels){TS.ui.new_channel_modal.start(a)
}else{TS.ui.channel_create_dialog.start(a)
}}else{TS.cmd_handlers.addEphemeralFeedback("I couldn't find a "+TS.templates.builders.channelOrGroupCopy()+' named "'+a+'", sorry :disappointed:')
}}}}}},"/join":{type:"client",autocomplete:true,alias_of:"/open",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/open"].func(b,a,d,c)
}},"/msg":{type:"client",autocomplete:true,alias_of:null,aliases:["/dm"],desc:"Send a DM message to another user",args:[{name:"@user",optional:false},{name:"your message",optional:true}],func:function(d,b,i,h){var a=(i.length>1)?i[1]:"";
var f=TS.members.getMemberByName(a);
var g;
if(!f){if(a){var c=a.replace("#","");
g=TS.channels.getChannelByName(c);
if(!g){g=TS.groups.getGroupByName(c)
}if(!g){TS.cmd_handlers.addTempEphemeralFeedback("A valid team member name is required.",d+" "+b);
return
}}else{$("#direct_messages_header").trigger("click.open_dialog").scrollintoview({duration:500})
}}var j=b.replace(a,"");
if(f){if(f.deleted){TS.cmd_handlers.addTempEphemeralFeedback("That user has been deactivated :disappointed:",d+" "+b);
return
}TS.ims.startImByMemberId(f.id,false,j)
}else{if(g){if(g.is_archived){TS.cmd_handlers.addTempEphemeralFeedback("That "+(g.is_channel?"channel":TS.templates.builders.groupCopy())+" has been archived :disappointed:");
return
}if(g.is_channel){TS.channels.displayChannel(g.id,j)
}else{TS.groups.displayGroup(g.id,j)
}}}}},"/invite":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Invite another member to a channel or group",args:[{name:"@user",optional:false},{name:"channel",optional:true}],func:function(d,b,l,j){var a=(l.length>1)?l[1]:"";
var f=TS.members.getMemberByName(a);
if(!f&&a){TS.cmd_handlers.addTempEphemeralFeedback("A valid team member name is required.",d+" "+b);
return
}if(f&&f.deleted){TS.cmd_handlers.addTempEphemeralFeedback("That user has been deactivated :disappointed:",d+" "+b);
return
}if(f&&f.is_ultra_restricted){TS.cmd_handlers.addTempEphemeralFeedback(TS.utility.htmlEntities(a)+" is a single channel guest.",d+" "+b);
return
}var n=(l.length>2)?l[2]:"";
if(n){if(!f){TS.cmd_handlers.addTempEphemeralFeedback("A valid channel name is required.",d+" "+b);
return
}var k=TS.channels.getChannelByName(n);
var h=TS.groups.getGroupByName(n);
if(k){if(k.members.indexOf(f.id)!==-1){TS.cmd_handlers.addTempEphemeralFeedback("@"+f.name+" is already in this channel.",d+" "+b);
return
}TS.api.call("channels.invite",{channel:k.id,user:f.id})
}else{if(h){if(h.members.indexOf(f.id)!==-1){TS.cmd_handlers.addTempEphemeralFeedback("@"+f.name+" is already in this group.",d+" "+b);
return
}TS.ui.invite.showInviteMembersPreSelected(h.id,[f.id])
}else{TS.cmd_handlers.addTempEphemeralFeedback("A valid channel name is required.",d+" "+b);
return
}}}else{if(TS.model.active_channel_id){if(f){var i=TS.channels.getChannelById(TS.model.active_channel_id);
if(i&&i.members.indexOf(f.id)!==-1){TS.cmd_handlers.addTempEphemeralFeedback("@"+f.name+" is already in this channel.",d+" "+b);
return
}TS.api.call("channels.invite",{channel:TS.model.active_channel_id,user:f.id})
}else{if(j&&j.which==TS.utility.keymap.enter){$(window.document).bind("keyup.wait_for_invite",function(c){if(TS.boot_data.feature_private_channels){TS.ui.channel_invite_modal.startInviteToChannelModal(TS.model.active_channel_id)
}else{TS.ui.invite.showInviteMembersFromChannelDialog(TS.model.active_channel_id)
}$(window.document).unbind("keyup.wait_for_invite")
})
}else{if(TS.boot_data.feature_private_channels){TS.ui.channel_invite_modal.startInviteToChannelModal(TS.model.active_channel_id)
}else{TS.ui.invite.showInviteMembersFromChannelDialog(TS.model.active_channel_id)
}}}}else{if(TS.model.active_group_id){if(f){var o=TS.groups.getGroupById(TS.model.active_group_id);
if(o&&o.members.indexOf(f.id)!==-1){TS.cmd_handlers.addTempEphemeralFeedback("@"+f.name+" is already in this group.",d+" "+b);
return
}TS.ui.invite.showInviteMembersPreSelected(TS.model.active_group_id,[f.id])
}else{if(j&&j.which==TS.utility.keymap.enter){$(window.document).bind("keyup.wait_for_invite",function(c){if(TS.boot_data.feature_private_channels){TS.ui.channel_invite_modal.startInviteToChannelModal(TS.model.active_group_id)
}else{TS.ui.invite.showInviteMembersFromGroupDialog(TS.model.active_group_id)
}$(window.document).unbind("keyup.wait_for_invite")
})
}else{if(TS.boot_data.feature_private_channels){TS.ui.channel_invite_modal.startInviteToChannelModal(TS.model.active_group_id)
}else{TS.ui.invite.showInviteMembersFromGroupDialog(TS.model.active_group_id)
}}}}else{TS.cmd_handlers.addTempEphemeralFeedback("A valid channel name is required.",d+" "+b);
return
}}}}},"/invite_people":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Invite people to your Slack team",args:[{name:"name@domain.com, ...",optional:true}],func:function(b,a,d,c){if(TS.model.user.is_admin){a=a&&a.trim();
if(a){TS.ui.admin_invites.populateInvites(a.split(/\s*,\s*|\s+/).map(function(e){return{email:e}
}))
}TS.ui.admin_invites.start()
}else{TS.cmd_handlers.addTempEphemeralFeedback("You don't have permission to invite people.")
}}},"/dm":{type:"client",autocomplete:true,alias_of:"/msg",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/msg"].func(b,a,d,c)
}},"/archive":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Archive the current channel or group",func:function(d,b,h,g){var a=TS.shared.getActiveModelOb();
if(a.is_archived){return
}if(TS.model.active_channel_id){if(!TS.members.canUserArchiveChannels()){return
}var c=TS.channels.getChannelById(TS.model.active_channel_id);
TS.channels.ui.showArchiveChannelDialog(c)
}else{if(TS.model.active_group_id){if(TS.model.user.is_restricted){return
}var f=TS.groups.getGroupById(TS.model.active_group_id);
TS.channels.ui.showArchiveGroupDialog(f)
}}}},"/leave":{type:"client",autocomplete:true,alias_of:null,aliases:["/close","/part"],desc:"Leave a channel or DM",func:function(d,b,g,f){if(g.length==1){var a=TS.shared.getActiveModelOb();
if(TS.model.active_channel_id){if(a.is_archived){TS.channels.closeArchivedChannel(TS.model.active_channel_id)
}else{TS.channels.leave(TS.model.active_channel_id)
}}else{if(TS.model.active_im_id){TS.ims.closeIm(TS.model.active_im_id)
}else{if(TS.boot_data.feature_mpim_client&&TS.model.active_mpim_id){TS.mpims.closeMpim(TS.model.active_mpim_id)
}else{if(TS.model.active_group_id){if(a.is_archived){if(TS.boot_data.feature_private_channels){TS.shared.closeArchivedChannel(a.id)
}else{TS.groups.closeGroup(a.id)
}}else{TS.groups.leave(a.id)
}}else{TS.cmd_handlers.addTempEphemeralFeedback("A valid channel or team member name is required.")
}}}}}else{var c=TS.channels.getChannelByName(b);
if(c){TS.channels.leave(c.id)
}else{TS.cmd_handlers.addTempEphemeralFeedback("A valid channel name is required.")
}}}},"/close":{type:"client",autocomplete:true,alias_of:"/leave",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/leave"].func(b,a,d,c)
}},"/part":{type:"client",autocomplete:true,alias_of:"/leave",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/leave"].func(b,a,d,c)
}},"/topic":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Set the channel or group topic",args:[{name:"new topic",optional:true}],func:function(b,a,d,c){if(TS.model.user.is_restricted||(TS.shared.getActiveModelOb().is_general&&!TS.members.canUserPostInGeneral())){TS.cmd_handlers.addTempEphemeralFeedback("Setting the topic is a restricted action.",b+" "+a);
return
}if(a.length>TS.model.channel_topic_max_length){TS.cmd_handlers.addTempEphemeralFeedback("Topics cannot exceed "+TS.model.channel_topic_max_length+" characters.",b+" "+a);
return
}if(TS.model.active_channel_id){if(a){TS.channels.setTopic(TS.model.active_channel_id,a)
}else{$("#active_channel_name .name, #group_actions").trigger("click.channel_actions");
$("#menu_channel_topic_input").focus().select()
}}else{if(TS.model.active_group_id){if(a){TS.groups.setTopic(TS.model.active_group_id,a)
}else{$("#active_channel_name .name, #group_actions").trigger("click.channel_actions");
$("#menu_channel_topic_input").focus().select()
}}else{TS.cmd_handlers.addTempEphemeralFeedback("IM channels do not have topics :disappointed:")
}}}},"/togglethemes":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.prefs.setPrefByAPI({name:"messages_theme",value:(TS.model.prefs.messages_theme=="light_with_avatars"?"dense":"light_with_avatars")})
}},"/search":{type:"client",autocomplete:false,alias_of:null,aliases:["/s"],desc:"Perform a search",args:[{name:"your text",optional:true}],func:function(b,a,d,c){var f=$("#search_terms");
TS.client.ui.openFlexTab("search");
TS.view.resizeManually("TS.search.view.showResults");
f.autocomplete("preventMenuOnNextFocus");
f.val(a).removeClass("placeholder").focus();
f.closest("form").submit()
}},"/s":{type:"client",autocomplete:true,alias_of:"/search",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/search"].func(b,a,d,c)
}},"/rename":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Rename a channel or group",args:[{name:"new name",optional:true}],func:function(c,b,f,d){if(TS.model.user.is_restricted){TS.cmd_handlers.addTempEphemeralFeedback("You don't have permission to rename.");
return
}if(!TS.model.active_channel_id&&!TS.model.active_group_id){TS.cmd_handlers.addTempEphemeralFeedback("IM channels cannot be renamed :disappointed:");
return
}var a=TS.shared.getActiveModelOb();
if(TS.model.active_channel_id){if(!TS.model.user.is_admin&&a.creator!=TS.model.user.id){TS.cmd_handlers.addTempEphemeralFeedback("Only team admins (or the channel creator) are allowed to rename channels. :disappointed:");
return
}}TS.ui.channel_create_dialog.start(TS.utility.htmlEntities(b)||a.name,a)
}},"/trigger_w":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.model.collapse_trigger_w=parseInt(a);
alert("collapse_trigger_w = "+TS.model.collapse_trigger_w)
}},"/beep":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.sounds.play("new_message")
}},"/upload":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(c,b,f,d){var a=TS.utility.base64StrtoBlob(b);
TS.client.ui.file_pasted_sig.dispatch(a)
}},"/colors":{type:"client",autocomplete:false,alias_of:null,aliases:["/colours"],desc:"View any custom colors you have set for other members",func:function(d,c,h,f){var a=TS.members.getMembersForUser();
var j;
var g="";
for(var b=0;
b<a.length;
b++){j=a[b];
if(j.member_color!=j.color){g+=j.name+": "+j.member_color+"\n"
}}TS.cmd_handlers.addEphemeralFeedback((g)?"You have overridden colors as follows:\n"+g:"No user color overrides have been set.")
}},"/colours":{type:"client",autocomplete:true,alias_of:"/colors",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/colors"].func(b,a,d,c)
}},"/color":{type:"client",autocomplete:false,alias_of:null,aliases:["/colour"],desc:"Set a custom color for another member",func:function(f,d,h,g){var c=(h.length>1)?h[1]:"";
var b=(h.length>2)?h[2].replace(/\#/g,""):"";
var a=TS.members.getMemberByName(c);
if(!a){TS.cmd_handlers.addTempEphemeralFeedback("A valid team member name is required.",f+" "+d);
return
}if(b&&(b.length!=6||!("#"+b).match(TS.format.hex_rx))){TS.cmd_handlers.addTempEphemeralFeedback("A valid 6 character hex code is required, like `FF0000`.",f+" "+d);
return
}TS.members.setMemberUserColor(a,b);
TS.model.prefs.user_colors=JSON.stringify(TS.model.user_colors);
TS.prefs.setPrefByAPI({name:"user_colors",value:TS.model.prefs.user_colors});
if(b){TS.cmd_handlers.addEphemeralFeedback("You've set your custom color for @"+a.name+" to #"+b)
}else{TS.cmd_handlers.addEphemeralFeedback("You've removed your custom color for @"+a.name+".")
}}},"/colour":{type:"client",autocomplete:true,alias_of:"/color",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/color"].func(b,a,d,c)
}},"/colortest":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(g,f,j,h){var a=null;
if(f){try{a=JSON.parse(f)
}catch(d){TS.cmd_handlers.addTempEphemeralFeedback("Not a good value for colors: "+f);
return
}}if(!a||!a.length){a=["#DDCFFA","#2EF645","#F38303","#E702AE","#3C986D","#9D6158","#F43368","#97C10A","#7491F9","#9E63A3","#FACE41","#35A5CC","#39A93E","#4FECA8","#CA5B34","#E2A974","#2BCFCB","#F89BA7","#89868A","#6A7841","#ADC498","#B1DBDD","#B849C3","#9CDB81","#E72F36","#A16A28","#F68CCF","#317C84","#58851C","#FC4A97","#5774BB","#97B7FE","#C64D97","#CB4A5C","#F68B6B","#81EE4F","#B7ED6D","#756D8E","#3AED69","#81E7FB","#91ECB7","#ED8947","#57AF19","#28BC89","#4A9788","#D645DF","#B498FE","#71C8F9","#C07B1D","#16BD60","#EFCAE3","#A4E0BB","#478AAF","#59953E","#886CA7","#F0C3F1","#29AF70","#80A5F8","#636BB8"]
}var c;
for(c=0;
c<a.length;
c++){a[c]=a[c].replace("#","")
}var b=TS.members.getMembersForUser();
for(c=0;
c<b.length;
c++){TS.members.setMemberUserColor(b[c],a[TS.utility.randomInt(0,a.length-1)])
}}},"/discon":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.ms.disconnect()
}},"/sleep":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.sleepMS()
}},"/wake":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.wakeMS()
}},"/discon2":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.model.break_token=true;
TS.ms.disconnect()
}},"/discon3":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.model.break_reconnections=true;
TS.ms.disconnect()
}},"/overloaddontdothiseverpleaseyouwillbesorry":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(g,d,j,h){if(TS.model.user.is_restricted){return
}var f=d||10;
var c=0;
var b=TS.members.getActiveMembersWithSelfAndNotSlackbot();
var a=setInterval(function(){c++;
TS.ms.msg_handlers.message({channel:TS.channels.getGeneralChannel().id,type:"message",user:b[TS.utility.randomInt(0,b.length-1)].id,ts:TS.utility.date.makeTsStamp(null,"0"),text:"overload #"+c});
if(c>=f){clearInterval(a)
}},0)
}},"/babbledontdothiseverpleaseyouwillbesorry":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(c,a,j,h){if(TS.model.team.domain!=="tinyspeck"){return
}var b=TS.utility.msgs.ipsum();
var f=1;
var g=a;
var k;
var d=function(){var i="("+f+") "+b[TS.utility.randomInt(0,b.length-1)];
var e=true;
if(parseInt(g)){if(f>parseInt(g)){clearInterval(k);
e=false
}}if(e){if(TS.model.active_channel_id){TS.channels.sendMsg(TS.model.active_channel_id,i)
}else{if(TS.model.active_im_id){TS.ims.sendMsg(TS.model.active_im_id,i)
}else{if(TS.model.active_group_id){TS.groups.sendMsg(TS.model.active_group_id,i)
}}}}f++
};
if(parseInt(g)){d();
k=setInterval(d,1000)
}else{if(confirm("You sure you want to do this? It will put a lot of crap messages into this channel, y'know? Also, it can't be stopped without a reload.")){d();
k=setInterval(d,1000)
}}}},"/nohrs":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){$('<style type="text/css">.message {border-top:1px solid transparent !important;}</style>').appendTo("head")
}},"/emo":{type:"client",autocomplete:false,alias_of:null,aliases:["/emote","/emoji"],desc:"",func:function(a){var b={};
b.target=$("#message-form");
TS.emoji_menu.startEmo(b)
}},"/emoji":{type:"client",autocomplete:false,alias_of:"/emo",aliases:null,desc:"",func:function(a){TS.cmd_handlers["/emo"].func(a)
}},"/emote":{type:"client",autocomplete:false,alias_of:"/emo",aliases:null,desc:"",func:function(a){TS.cmd_handlers["/emo"].func(a)
}},"/editlast":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"Edit the last message you posted",func:function(c,b,g,d){var a=TS.shared.getActiveModelOb();
if(!a){return
}b=$.trim(b);
if(!b){TS.cmd_handlers.addTempEphemeralFeedback("You must enter some text!",c+" "+b);
return
}var f=TS.utility.msgs.getEditableMsgByProp("user",TS.model.user.id,a.msgs);
if(!f){TS.cmd_handlers.addTempEphemeralFeedback("Found no recent messages from you to edit :disappointed:",c+" "+b);
return
}TS.msg_edit.commitEdit(f,TS.shared.getActiveModelOb(),b)
}},"/deletelast":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"Delete the last message you posted",func:function(c,b,g,d){var a=TS.shared.getActiveModelOb();
if(!a){return
}var f=TS.utility.msgs.getEditableMsgByProp("user",TS.model.user.id,a.msgs);
if(!f){TS.cmd_handlers.addTempEphemeralFeedback("Found no recent messages from you to delete :disappointed:");
return
}TS.msg_edit.startDelete(f.ts)
}},"/collapse":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Collapse all files in the current channel (opposite of /expand)",func:function(b,a,d,c){TS.inline_imgs.collapseAllInCurrent();
TS.inline_videos.collapseAllInCurrent();
TS.inline_attachments.collapseAllInCurrent();
TS.inline_audios.collapseAllInCurrent();
TS.inline_others.collapseAllInCurrent();
if(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration||TS.boot_data.feature_fix_files){TS.inline_file_previews.collapseAllInCurrent()
}TS.cmd_handlers.addEphemeralFeedback("I've collapsed all files in this channel for you.")
}},"/expand":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Expand all files in the current channel (opposite of /collapse)",func:function(b,a,d,c){TS.inline_imgs.expandAllInCurrent();
TS.inline_videos.expandAllInCurrent();
TS.inline_attachments.expandAllInCurrent();
TS.inline_audios.expandAllInCurrent();
TS.inline_others.expandAllInCurrent();
if(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration||TS.boot_data.feature_fix_files){TS.inline_file_previews.expandAllInCurrent()
}TS.cmd_handlers.addEphemeralFeedback("I've expanded all files in this channel for you.")
}},"/attach_align":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){$("body").toggleClass("attachments_flush_with_avatar")
}},"/attach_thumb_align":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){window.attach_thumb_align_title=!window.attach_thumb_align_title;
TS.client.msg_pane.rebuildMsgs()
}},"/remove":{type:"client",autocomplete:true,alias_of:null,aliases:["/kick"],desc:"Remove a person from the current channel or group",args:[{name:"@user",optional:false}],func:function(c,b,f,d){if(TS.model.active_channel_id&&!TS.members.canUserKickFromChannels()){TS.cmd_handlers.addTempEphemeralFeedback("Removing from channels is a restricted action.");
return
}if(TS.model.active_group_id&&!TS.members.canUserKickFromGroups()){TS.cmd_handlers.addTempEphemeralFeedback("Removing from "+TS.templates.builders.groupCopy()+"s is a restricted action.");
return
}if(TS.model.active_im_id){TS.cmd_handlers.addTempEphemeralFeedback("You can't remove someone from a DM.");
return
}var a=TS.shared.getActiveModelOb();
if(a.is_archived){TS.cmd_handlers.addTempEphemeralFeedback("You can't remove anyone from *"+(TS.model.active_channel_id?"#":"")+a.name+"* while it is archived.");
return
}b=$.trim(b);
if(!b){TS.cmd_handlers.addTempEphemeralFeedback("Please specifiy someone to remove!",c+" "+b);
return
}var g=TS.members.getMemberByName(b);
if(!g){TS.cmd_handlers.addTempEphemeralFeedback("*"+TS.utility.htmlEntities(b)+"* is not a recognized member name.",c+" "+b);
return
}if(a.is_general&&!g.is_restricted&&!g.is_bot){TS.cmd_handlers.addTempEphemeralFeedback("You can't remove this member from *"+(TS.model.active_channel_id?"#":"")+a.name+"*!");
return
}if(a.members.indexOf(g.id)==-1){TS.cmd_handlers.addTempEphemeralFeedback("*"+TS.utility.htmlEntities(b)+"* is not a member of this "+(TS.model.active_channel_id?"channel":TS.templates.builders.groupCopy())+".",c+" "+b);
return
}if(g.is_self){TS.client.ui.onSubmit("/leave");
return
}if(TS.model.active_channel_id){TS.channels.kickMember(TS.model.active_channel_id,g.id)
}else{if(TS.model.active_group_id){TS.groups.kickMember(TS.model.active_group_id,g.id)
}else{return
}}}},"/kick":{type:"client",autocomplete:true,alias_of:"/remove",aliases:null,desc:"",func:function(b,a,d,c){TS.cmd_handlers["/remove"].func(b,a,d,c)
}},"/feedback":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Send feedback to Slack",args:[{name:"your message",optional:false}],func:function(b,a,d,c){if(!a){TS.cmd_handlers.addTempEphemeralFeedback("Looks like you are trying to send us some feedback, but you didn't say anything!",b+" "+a);
return
}TS.generic_dialog.start({title:"Send feedback",body:'<p class="bold">Looks like you are trying to send us some feedback! Yes?</p>',show_cancel_button:true,show_go_button:true,go_button_text:"Yes, send it",on_go:function(){TS.api.call("chat.command",{agent:"webapp",command:b,text:a,channel:TS.model.active_cid},TS.client.ui.onAPICommand)
},on_cancel:function(){TS.client.ui.$msg_input.val(b+" "+a)
}})
}},"/shrug":{type:"client",autocomplete:true,alias_of:null,aliases:null,desc:"Appends ¯\\_(ツ)_/¯ to your message",args:[{name:"your message",optional:true}],func:function(c,b,f,d){var a=b||"";
if(a&&a.substr(a.length-1)!=" "){a+=" "
}a+="¯\\_(ツ)_/¯ ";
if(TS.model.active_channel_id){TS.channels.sendMsg(TS.model.active_channel_id,a)
}else{if(TS.model.active_im_id){TS.ims.sendMsg(TS.model.active_im_id,a)
}else{if(TS.model.active_group_id){TS.groups.sendMsg(TS.model.active_group_id,a)
}else{if(TS.model.active_mpim_id){TS.mpims.sendMsg(TS.model.active_mpim_id,a)
}}}}}},"/showfallbacks":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.model.show_attachment_fallback=!TS.model.show_attachment_fallback;
TS.client.msg_pane.rebuildMsgs()
}},"/macgap.app.enableDeveloperTools()":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){if(window.macgap&&window.macgap.app&&window.macgap.app.enableDeveloperTools){macgap.app.enableDeveloperTools()
}}},"/toggle_debugging_prefs":{type:"client",autocomplete:false,alias_of:null,aliases:null,desc:"",func:function(b,a,d,c){TS.ui.debug_prefs_dialog.start()
}}})
})();
(function(){TS.registerModule("stars",{member_stars_fetched_sig:new signals.Signal(),member_stars_being_fetched_sig:new signals.Signal(),onStart:function(){TS.files.team_file_changed_sig.add(TS.stars.teamFileChanged,TS.stars)
},teamFileChanged:function(b){if("is_starred" in b){TS.stars.updateFileStar(b.id,b.is_starred,b.id)
}},maybeUpdateStarredItems:function(){if(TS.boot_data.app!="client"){return
}if(!TS.model.team){return
}if(TS.stars.stars_being_fetched){TS.stars.stars_needs_fetched=true;
return
}TS.stars.updateStarredItems()
},stars_being_fetched:false,stars_needs_fetched:false,updateStarredItems:function(){TS.stars.stars_being_fetched=true;
TS.stars.stars_needs_fetched=false;
TS.stars.member_stars_being_fetched_sig.dispatch(TS.model.user,true);
var c=true;
var b=a(TS.model.user.id);
TS.api.call("stars.list",b,TS.stars.onFetchStarredItems,c)
},fetchStarredItems:function(b,d){if(b!=TS.model.user.id){alert("currently this should only be called for the current user; there are issues with is_starred that need to be fixed before we can handle starred items from another user");
return
}var c=a(b);
c.page=d||1;
TS.api.call("stars.list",c,TS.stars.onFetchStarredItems)
},onFetchStarredItems:function(e,g,c){TS.stars.stars_being_fetched=false;
if(TS.stars.stars_needs_fetched){setTimeout(TS.stars.maybeUpdateStarredItems,100)
}var j=TS.members.getMemberById(c.user);
if(!j){TS.stars.member_stars_being_fetched_sig.dispatch(TS.model.user,false);
TS.error("no member? user:"+c.user);
return
}if(!e){TS.error("failed fetchStarredItems");
return
}for(var d=0;
d<g.items.length;
d++){var f=g.items[d];
if(j.id==TS.model.user.id){if(TS.web&&f.type=="message"){var b=TS.shared.getModelObById(f.channel);
var h;
if(!b){TS.warn("onFetchStarredItems item.channel:"+f.channel+" not found")
}else{if(!b.msgs){b.msgs=[]
}h=TS.utility.msgs.getMsg(f.message.ts,b.msgs);
if(!h){TS.utility.msgs.appendMsg(b.msgs,f.message)
}}}TS.stars.starStatusHasChanged(true,f,"stars.list")
}else{TS.stars.slurpStarItem(f,"stars.list")
}}if(c.start_ts){j.stars=j.stars.concat(g.items)
}else{j.stars=g.items
}TS.stars.member_stars_fetched_sig.dispatch(j)
},starStatusHasChanged:function(g,e,f){TS.stars.slurpStarItem(e,f);
if(e.type=="message"){TS.stars.updateMsgStar(e.message.ts,e.channel,g)
}else{if(e.type=="file"){if(e.file.is_starred!=g){TS.stars.updateFileStar(e.file.id,g)
}}else{if(e.type=="file_comment"){if(e.comment.is_starred!=g){TS.stars.updateFileCommentStar(e.comment.id,e.file.id,g)
}}else{if(e.type=="channel"){var d=TS.channels.getChannelById(e.channel);
if(!d){TS.warn("starStatusHasChanged channel_id:"+e.channel+" not found")
}else{if(d.is_starred!=g){TS.stars.updateChannelStar(e.channel,g)
}}}else{if(e.type=="group"){var c=TS.groups.getGroupById(e.channel);
if(!c){c=TS.mpims.getMpimById(e.channel)
}if(!c){TS.warn("starStatusHasChanged group_id:"+e.channel+" not found")
}else{if(c.is_starred!=g){if(c.is_mpim&&TS.boot_data.feature_mpim_client){TS.stars.updateMpimStar(e.channel,g)
}else{TS.stars.updateGroupStar(e.channel,g)
}}}}else{if(e.type=="im"){var b=TS.ims.getImById(e.channel);
if(!b){TS.warn("starStatusHasChanged im_id:"+e.channel+" not found")
}else{if(b.is_starred!=g){TS.stars.updateImStar(e.channel,g)
}}}else{TS.error("starStatusHasChanged needs to handle star item type:"+e.type)
}}}}}}},checkForStarClick:function(h){if(!h.target){return
}var f=$(h.target);
var b;
if(f.closest(".star").length){b=f.closest(".star")
}else{b=f.closest(".star_link")
}if(!b||!b.length){return
}if(b.hasClass("not-clickable")){return
}var g=b.hasClass("starred");
var d={};
var c;
if(b.hasClass("star_message")){d.channel=b.data("c-id");
d.timestamp=b.data("msg-id");
c=function(e){TS.stars.updateMsgStar(d.timestamp,d.channel,e)
}
}else{if(b.hasClass("star_file")){d.file=b.data("file-id");
c=function(e){TS.stars.updateFileStar(d.file,e)
}
}else{if(b.hasClass("star_file_comment")){d.file_comment=b.data("comment-id");
c=function(e){TS.stars.updateFileCommentStar(d.file_comment,b.data("file-id"),e)
}
}else{if(b.hasClass("star_channel")){d.channel=b.data("channel-id");
c=function(e){TS.stars.updateChannelStar(d.channel,e)
}
}else{if(b.hasClass("star_group")){d.channel=b.data("group-id");
c=function(e){TS.stars.updateGroupStar(d.channel,e)
}
}else{if(b.hasClass("star_im")){d.channel=b.data("im-id");
c=function(e){TS.stars.updateImStar(d.channel,e)
}
}else{if(b.hasClass("star_mpim")){d.channel=b.data("mpim-id");
c=function(e){TS.stars.updateMpimStar(d.channel,e)
}
}else{TS.error("checkForStarClick doesn't know what to do with a click on "+b[0].outerHTML);
return
}}}}}}}c(!g);
if(g){TS.api.call("stars.remove",d,function(i,j,e){if(i){return
}if(j.error=="not_starred"){if(TS.client&&TS.model.team.domain=="tinyspeck"){alert("tell eric not_starred (this message is for team tinyspeck only)")
}c(false)
}else{c()
}})
}else{TS.api.call("stars.add",d,function(i,j,e){if(i){return
}if(j.error=="already_starred"){if(TS.client&&TS.model.team.domain=="tinyspeck"){alert("tell eric already_starred (this message is for team tinyspeck only)")
}c()
}else{c(false)
}})
}},updateMsgStar:function(e,d,g){var c=TS.shared.getModelObById(d);
var f;
if(!c){TS.warn("updateMsgStar c_id:"+d+" not found")
}else{f=TS.utility.msgs.getMsg(e,c.msgs);
if(!f){}}var b='.star_message[data-msg-id="'+e+'"][data-c-id="'+d+'"]';
TS.stars.updateStar($(b),g,f,b);
if(TS.client){if(c){TS.utility.msgs.maybeStoreMsgs(c.id,c.msgs)
}}},updateFileCommentStar:function(d,e,f){var c=TS.files.getFileById(e);
var g;
if(!c){TS.warn("updateFileCommentStar file_id:"+e+" not found")
}else{g=TS.files.getFileCommentById(c,d)
}var b='.star_comment[data-comment-id="'+d+'"]';
TS.stars.updateStar($(b),f,g,b);
TS.files.makeSureReferencesGetSavedToLS(e)
},updateFileStar:function(d,e){var c=TS.files.getFileById(d);
if(!c){TS.warn("updateFileStar file_id:"+d+" not found")
}var b='.star_file[data-file-id="'+d+'"]';
TS.stars.updateStar($(b),e,c,b);
TS.files.makeSureReferencesGetSavedToLS(d)
},updateChannelStar:function(c,e){var d=TS.channels.getChannelById(c);
if(!d){TS.warn("updateChannelStar channel_id:"+c+" not found")
}var b='.star_channel[data-channel-id="'+c+'"]';
TS.stars.updateStar($(b),e,d,b);
if(TS.client){TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildStarredList()
}},updateGroupStar:function(c,e){var d=TS.groups.getGroupById(c);
if(!d){TS.warn("updateGroupStar group_id:"+c+" not found")
}var b='.star_group[data-group-id="'+c+'"]';
TS.stars.updateStar($(b),e,d,b);
if(TS.client){TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList()
}},updateImStar:function(e,d){var c=TS.ims.getImById(e);
if(!c){TS.warn("updateImStar im_id:"+e+" not found")
}var b='.star_im[data-im-id="'+e+'"]';
TS.stars.updateStar($(b),d,c,b);
if(TS.client){TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList()
}},updateMpimStar:function(e,d){var c=TS.mpims.getMpimById(e);
if(!c){TS.warn("updateMpimStar mpim_id:"+e+" not found")
}var b='.star_mpim[data-mpim-id="'+e+'"]';
TS.stars.updateStar($(b),d,c,b);
if(TS.client){TS.client.channel_pane.rebuildImAndMpimList();
TS.client.channel_pane.rebuildStarredList()
}},updateStar:function(c,e,d,b){if(e){if(!c.hasClass("starred")){c.addClass("starred");
if(TS.boot_data.feature_new_message_markup){c.addClass("ts_icon_star").removeClass("ts_icon_star_o")
}}}else{c.removeClass("starred");
if(TS.boot_data.feature_new_message_markup){c.removeClass("ts_icon_star").addClass("ts_icon_star_o")
}}if(d){d.is_starred=e
}else{}},slurpStarItem:function(b,d){var c;
if(b.type=="message"){b.message.is_starred=true;
if(TS.boot_data.feature_reactions){b.message._rxn_key=TS.rxns.getRxnKey("message",b.message.ts,b.channel)
}if(b.message.type=="channel_topic"||b.message.type=="channel_purpose"||b.message.type=="channel_join"||b.message.type=="channel_leave"){b.message.subtype=b.message.type
}b.message.type="message"
}else{if(b.type=="file"||b.type=="file_comment"){if(b.file){c=TS.files.upsertAndSignal(b.file);
b.file=c.file;
if(b.type=="file_comment"){if(b.comment){b.comment=TS.files.addCommentToFile(b.comment,b.file)
}else{TS.error("WTF no comment in type "+b.type+" in "+d);
return false
}}}else{TS.error("WTF no file in type "+b.type+" in "+d);
return false
}}else{if(b.type=="channel"){}else{if(b.type=="group"){}else{if(b.type=="im"){}else{TS.error("need to handle star item type:"+b.type+" in "+d);
return false
}}}}}return true
}});
var a=function(b){var c={user:b||TS.model.user.id};
c.exclude="Ch,Gh,Dh";
return c
}
})();
(function(){TS.registerModule("mentions",{mention_changed_sig:new signals.Signal(),mention_removed_sig:new signals.Signal(),mentions_fetched_sig:new signals.Signal(),mentions_being_fetched_sig:new signals.Signal(),mentions_being_fetched:false,mentions_needs_fetched:false,has_more:false,after_ts:null,fetched_once:false,onStart:function(){TS.prefs.mentions_exclude_at_channels_changed_sig.add(c);
TS.prefs.mentions_exclude_at_user_groups_changed_sig.add(d)
},maybeUpdateMentions:function(){if(TS.boot_data.app!="client"){return
}if(!TS.model.team){return
}if(TS.mentions.mentions_being_fetched){TS.mentions.mentions_needs_fetched=true;
return
}TS.mentions.updateMentions()
},updateMentions:function(){TS.mentions.mentions_being_fetched=true;
TS.mentions.mentions_needs_fetched=false;
TS.mentions.mentions_being_fetched_sig.dispatch();
var e=true;
TS.api.call("activity.mentions",b(),TS.mentions.onFetchMentions,e)
},fetchMoreMentions:function(){TS.mentions.fetchMentions(TS.mentions.after_ts)
},fetchMentions:function(f){TS.mentions.fetched_once=true;
var e=b();
f=f||"";
e.after_ts=f;
TS.api.call("activity.mentions",e,TS.mentions.onFetchMentions)
},getMentionByMsgId:function(j,h,e){for(var g=0;
g<TS.model.user.mentions.length;
g++){var f=TS.model.user.mentions[g];
if(!f.message){continue
}if(f.message.ts==j){if(h){TS.model.user.mentions[g].message=h
}else{if(e){TS.model.user.mentions.splice(g,1)
}}return f
}}return null
},onFetchMentions:function(p,l,o){TS.mentions.mentions_being_fetched=false;
if(TS.mentions.mentions_needs_fetched){setTimeout(TS.mentions.maybeUpdateMentions,100)
}if(!p){TS.error("failed fetchMentions");
return
}var k=[];
var f;
for(var m=0;
m<l.mentions.length;
m++){var q=l.mentions[m];
var g=q.message;
if(!g){continue
}var h=g.file;
var n=g.comment;
if(g.subtype=="file_share"||g.subtype=="file_mention"||g.subtype=="file_comment"){if(!h){continue
}if(g.subtype=="file_comment"){if(!n){continue
}}}if(g.ts=="0000000000.000000"){TS.warn("bad mention! msg.ts == 0000000000.000000");
continue
}if(TS.boot_data.feature_reactions){if(g.subtype=="file_share"||g.subtype=="file_mention"||g.subtype=="file_comment"){h._rxn_key=TS.rxns.getRxnKey("file",h.id);
f=TS.rxns.getExistingRxnsByKey(h._rxn_key);
if(f&&!h.reactions){TS.warn("file:"+h.id+" has reactions in local model, but we got an object in mentions that does NOT have reactions, which seems suspicious")
}else{TS.rxns.upsertRxnsFromDataAndUpdateUI(h._rxn_key,h.reactions)
}if(g.subtype=="file_comment"){n._rxn_key=TS.rxns.getRxnKey("file_comment",n.id);
f=TS.rxns.getExistingRxnsByKey(n._rxn_key);
if(f&&!n.reactions){TS.warn("comment:"+n.id+" has reactions in local model, but we got an object in mentions that does NOT have reactions, which seems suspicious")
}else{TS.rxns.upsertRxnsFromDataAndUpdateUI(n._rxn_key,n.reactions)
}}}else{g._rxn_key=TS.rxns.getRxnKey("message",g.ts,q.channel);
f=TS.rxns.getExistingRxnsByKey(g._rxn_key);
if(f&&!g.reactions){TS.warn("msg:"+g.ts+" has reactions in local model, but we got an object in mentions that does NOT have reactions, which seems suspicious")
}else{TS.rxns.upsertRxnsFromDataAndUpdateUI(g._rxn_key,g.reactions)
}var e=TS.shared.getModelObById(q.channel);
var j=TS.utility.msgs.getMsg(g.ts,e.msgs);
if(j){g.is_starred=j.is_starred
}}}if(TS.mentions.getMentionByMsgId(g.ts,g)){continue
}k.push(q)
}TS.model.user.mentions=TS.model.user.mentions.concat(k);
TS.mentions.sortMentions();
if(TS.mentions.after_ts===null||o.after_ts){TS.mentions.has_more=l.has_more;
if(TS.model.user.mentions.length){TS.mentions.after_ts=TS.model.user.mentions[TS.model.user.mentions.length-1].message.ts
}}TS.mentions.mentions_fetched_sig.dispatch()
},sortMentions:function(){var g;
var e;
function f(i,h){g=i.rxn_ts||i.message.ts;
e=h.rxn_ts||h.message.ts;
if(g<e){return 1
}if(g>e){return -1
}return 0
}TS.model.user.mentions.sort(f)
},replaceMsg:function(e){var f=TS.mentions.getMentionByMsgId(e.ts,e);
if(f){TS.mentions.mention_changed_sig.dispatch(f)
}},removeMsg:function(f){var e=TS.mentions.getMentionByMsgId(f,null,true);
if(e){TS.mentions.mention_removed_sig.dispatch(f)
}},setExcludeAtChannelsPref:function(e){e=!!e;
TS.model.prefs.mentions_exclude_at_channels=e;
TS.prefs.setPrefByAPI({name:"mentions_exclude_at_channels",value:e});
c()
},setExcludeAtUserGroupsPref:function(e){e=!!e;
TS.model.prefs.mentions_exclude_at_user_groups=e;
TS.prefs.setPrefByAPI({name:"mentions_exclude_at_user_groups",value:e});
d()
},weaveInRxnRecords:function(){if(!TS.boot_data.feature_reactions){return
}var k=TS.rxns.getRxnRecords();
var h;
var e;
var l;
var g;
var f;
TS.model.user.mentions=TS.model.user.mentions.filter(function(i){return i.type!="rxn"
});
for(var j=0;
j<k.length;
j++){e=k[j].rxn_key;
h=TS.rxns.getRxnKeyParts(e);
if(h.type=="message"){g=TS.shared.getModelObById(h.c_id);
f=g&&TS.utility.msgs.getMsg(h.id,g.msgs);
if(!f){continue
}TS.mentions.getMentionByMsgId(h.id,null,true);
l={channel:h.c_id,type:"rxn",rxn_ts:k[j].last_update,message:TS.utility.clone(f)};
l.message._rxn_key=e
}else{if(h.type=="file"){continue
}else{if(h.type=="file_comment"){continue
}else{continue
}}}TS.model.user.mentions.push(l)
}TS.mentions.sortMentions()
}});
var b=function(){var e={};
var f=TS.model.prefs.mentions_exclude_at_channels;
if(f){e.exclude="everyone,channel"
}if(TS.boot_data.feature_subteams&&TS.model.prefs.mentions_exclude_at_user_groups){e.exclude=e.exclude?"user_group":"everyone,channel,user_group"
}return e
};
var c=function(){var e=TS.model.prefs.mentions_exclude_at_channels;
if(e){a(["everyone","channel"]);
TS.mentions.mentions_fetched_sig.dispatch()
}else{TS.mentions.maybeUpdateMentions()
}};
var d=function(){var e=TS.model.prefs.mentions_exclude_at_user_groups;
if(e){a(["user_group"]);
TS.mentions.mentions_fetched_sig.dispatch()
}else{TS.mentions.maybeUpdateMentions()
}};
var a=function(g){var e;
for(var f=TS.model.user.mentions.length-1;
f>=0;
f--){e=TS.model.user.mentions[f];
if(g.indexOf(e.type)!==-1){TS.model.user.mentions.splice(f,1)
}}}
})();
(function(){TS.registerModule("inline_imgs",{no_scrolling:false,onStart:function(){},shouldExpand:function(a,b){if(!b||!b.src){return false
}if(TS.model.expandable_state["img_"+a+b.src]){return true
}if(TS.model.expandable_state["img_"+a+b.src]===false){return false
}if(b.should_expand===true){return true
}if(!b.internal_file_id){if(TS.model.prefs.obey_inline_img_limit&&b.bytes>TS.model.inline_img_byte_limit){return false
}if(b.width&&b.height){if((b.width*b.height)>TS.model.inline_img_pixel_limit){return false
}}}if(b.internal_file_id){return TS.model.prefs.expand_internal_inline_imgs
}return TS.model.prefs.expand_inline_imgs
},expandAllInCurrent:function(){TS.inline_imgs.no_scrolling=true;
$(".msg_inline_img_expander").trigger("click");
$(".msg_inline_img_toggler.collapsed").trigger("click");
TS.inline_imgs.no_scrolling=false;
if(TS.client){TS.client.ui.instaScrollMsgsToBottom(false)
}},collapseAllInCurrent:function(){$(".msg_inline_img_collapser").trigger("click");
$(".msg_inline_img_toggler.expanded").trigger("click")
},expand:function(f,g){TS.model.expandable_state["img_"+f+g]=true;
TS.storage.storeExpandableState(TS.model.expandable_state);
var a="#"+TS.utility.makeSafeForDomId(f);
var b=$(a);
if(!b.length){return
}var d=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var c=function(h){return $(this).data("real-src")==g
};
var e=(TS.boot_data.feature_attachments_inline)?b.find(".inline_attachment").filter(c):null;
if(!e||!e.length){e=b.find(".msg_inline_img_holder").filter(c)
}e.removeClass("hidden");
b.find(".msg_inline_img_expander").filter(c).addClass("hidden");
b.find(".msg_inline_img_collapser").filter(c).removeClass("hidden");
b.find(".msg_inline_img_toggler").removeClass("collapsed").addClass("expanded");
b.find(".too_large_for_auto_expand").addClass("hidden");
b.find(".inline_img_bytes").removeClass("hidden");
if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}e.css("opacity",0).stop().animate({opacity:1},300);
if(!TS.inline_imgs.no_scrolling){if(TS.client&&d){TS.client.ui.instaScrollMsgsToBottom(false);
e.scrollintoview({duration:0,offset:"top",px_offset:10,direction:"y"})
}else{e.scrollintoview({duration:200,offset:"bottom",px_offset:-10,direction:"y"})
}}if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}},collapse:function(e,f){TS.model.expandable_state["img_"+e+f]=false;
TS.storage.storeExpandableState(TS.model.expandable_state);
var a="#"+TS.utility.makeSafeForDomId(e);
var b=$(a);
if(!b.length){return
}var c=function(g){return $(this).data("real-src")==f
};
var d=(TS.boot_data.feature_attachments_inline)?b.find(".inline_attachment").filter(c):null;
if(!d||!d.length){d=b.find(".msg_inline_img_holder").filter(c)
}b.find(".msg_inline_img_expander").filter(c).removeClass("hidden");
b.find(".msg_inline_img_collapser").filter(c).addClass("hidden");
b.find(".msg_inline_img_toggler").removeClass("expanded").addClass("collapsed");
d.addClass("hidden")
},checkForInlineImgClick:function(g,f){if(!g.target){return
}var k=$(g.target);
var b=k.closest(".message").data("ts");
var d=TS.templates.makeMsgDomId(b);
if(f){b=k.closest(".search_message_result").data("ts");
d=TS.templates.makeMSRDomId(f)
}if(!b){return
}b=b.toString();
var i=k.closest(".too_large_but_expand_anyway");
if(i.length){g.preventDefault();
TS.inline_imgs.expand(d,i.data("real-src"))
}var c=k.closest(".msg_inline_img_toggler");
if(c.length){g.preventDefault();
var a=c.next("*[data-real-src]").data("real-src");
if(TS.inline_imgs.shouldExpand(d,TS.model.inline_imgs[a])){TS.inline_imgs.collapse(d,a)
}else{TS.inline_imgs.expand(d,a)
}return
}var h=k.closest(".msg_inline_img_expander");
if(h.length){g.preventDefault();
TS.inline_imgs.expand(d,h.data("real-src"))
}var j=k.closest(".msg_inline_img_collapser");
if(j.length){g.preventDefault();
TS.inline_imgs.collapse(d,j.data("real-src"))
}},makeInternalInlineImg:function(c,b){var e=400;
var a=500;
if(TS.boot_data.feature_fix_files&&TS.qs_args["480_thumbs"]=="1"&&b.internal_file_id){e=500;
a=600
}if(TS.model.inline_imgs[c]){b.internal_file_id=TS.model.inline_imgs[c].internal_file_id||b.internal_file_id;
b.link_url=TS.model.inline_imgs[c].link_url||b.link_url;
b.src=TS.model.inline_imgs[c].src||b.src
}TS.model.inline_imgs[c]=b;
b.src=b.src||c;
b.bytes=parseInt(b.bytes);
b.width=b.display_w=parseInt(b.width);
b.height=b.display_h=parseInt(b.height);
if(b.display_w>e){b.display_w=e;
b.display_h=parseInt(b.height*(b.display_w/b.width))
}if(b.display_h>a){b.display_h=a;
b.display_w=parseInt(b.width*(b.display_h/b.height))
}var d=TS.utility.getImgProxyURL(b.src,b.display_w,b.display_h);
if(d!=b.src){b.proxied_src=d
}else{delete b.proxied_src
}}})
})();
(function(){TS.registerModule("inline_videos",{no_scrolling:false,onStart:function(){},shouldExpand:function(d,c){if(TS.model.expandable_state["vid_"+d+c.src]){return true
}if(TS.model.expandable_state["vid_"+d+c.src]===false){return false
}if(c.internal_file_id){return TS.model.prefs.expand_internal_inline_imgs
}return TS.model.prefs.expand_inline_imgs
},expandAllInCurrent:function(){TS.inline_videos.no_scrolling=true;
$(".msg_inline_video_expander").trigger("click");
TS.inline_videos.no_scrolling=false;
if(TS.client){TS.client.ui.instaScrollMsgsToBottom(false)
}},collapseAllInCurrent:function(){$(".msg_inline_video_collapser").trigger("click")
},expand:function(h,i){TS.model.expandable_state["vid_"+h+i]=true;
TS.storage.storeExpandableState(TS.model.expandable_state);
var c="#"+TS.utility.makeSafeForDomId(h);
var d=$(c);
if(!d.length){return
}var f=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var e=function(j){return $(this).data("real-src")==i
};
var g=(TS.boot_data.feature_attachments_inline)?d.find(".inline_attachment").filter(e):null;
if(!g||!g.length){g=d.find(".msg_inline_video_holder").filter(e)
}g.find(".msg_inline_video_thumb_div").removeClass("hidden");
g.removeClass("hidden");
d.find(".msg_inline_video_expander").filter(e).addClass("hidden");
d.find(".msg_inline_video_collapser").filter(e).removeClass("hidden");
if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}g.css("opacity",0).stop().animate({opacity:1},300);
if(!TS.inline_videos.no_scrolling){if(TS.client&&f){TS.client.ui.instaScrollMsgsToBottom(false);
d.children().first().scrollintoview({duration:0,offset:"top",px_offset:10,direction:"y"})
}else{d.find(".msg_inline_video").last().scrollintoview({duration:200,offset:"bottom",px_offset:-10,direction:"y"})
}}if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}},collapse:function(g,h){TS.model.expandable_state["vid_"+g+h]=false;
TS.storage.storeExpandableState(TS.model.expandable_state);
var c="#"+TS.utility.makeSafeForDomId(g);
var d=$(c);
if(!d.length){return
}var e=function(j){return $(this).data("real-src")==h
};
var f=(TS.boot_data.feature_attachments_inline)?d.find(".inline_attachment").filter(e):null;
if(!f||!f.length){f=d.find(".msg_inline_video_holder").filter(e)
}f.css("visibility","hidden");
d.find(".msg_inline_video_expander").filter(e).removeClass("hidden");
d.find(".msg_inline_video_collapser").filter(e).addClass("hidden");
f.find(".msg_inline_video_iframe_div").html("");
setTimeout(function(){f.addClass("hidden");
f.css("visibility","visible")
},200)
},enCommentHTML:function(c){if(!c){return""
}var f=new DOMParser();
var d=f.parseFromString("<body>"+c+"</body>","text/html");
if(!d||!d.body){return""
}if(d.body.childNodes.length===0){return""
}if(d.body.childNodes.length==1&&d.body.childNodes[0].nodeType==Node.COMMENT_NODE){return d.body.innerHTML
}var e=document.createComment(c);
return $("<div>").append(e).html()
},unCommentHTML:function(c){if(!c){return""
}var f=new DOMParser();
var d=f.parseFromString("<body>"+c+"</body>","text/html");
if(!d||!d.body){return""
}if(d.body.childNodes.length!=1){return""
}var e=d.body.childNodes[0];
if(e.nodeType!=Node.COMMENT_NODE){return""
}return e.textContent
},checkForInlineVideoClick:function(m,l){if(!m.target){return
}var p=$(m.target);
var h=p.closest(".message").data("ts");
var j=TS.templates.makeMsgDomId(h);
if(!h&&l){h=p.closest(".search_message_result").data("ts");
j=TS.templates.makeMSRDomId(l)
}if(!h){return
}h=h.toString();
var k=p.closest(".msg_inline_video_expander");
if(k.length){m.preventDefault();
TS.inline_videos.expand(j,k.data("real-src"));
return
}var o=p.closest(".msg_inline_video_collapser");
if(o.length){m.preventDefault();
TS.inline_videos.collapse(j,o.data("real-src"));
return
}var d=p.closest(".msg_inline_video_play_button");
if(d.length){var g=d.closest(".msg_inline_video_holder");
var n=g.find(".msg_inline_video_iframe_div");
n.removeClass("hidden");
g.find(".msg_inline_video_thumb_div").addClass("hidden");
var c=n.data("url");
var f=TS.model.inline_videos[c];
if(!f){var i=c.replace(/\&/g,"&amp;");
f=TS.model.inline_videos[i]
}if(f){n.html(TS.inline_videos.unCommentHTML(f.html))
}else{n.html('<div style="padding:10px; color:white">Error: unable to find "'+TS.utility.htmlEntities(c)+'" in TS.model.inline_videos</div>')
}return
}},makeInternalInlineVideo:function(d,e){var g=400;
var c=500;
TS.model.inline_videos[d]=e;
e.src=e.thumbnail.url||d;
e.width=e.display_w=parseInt(e.thumbnail.width);
e.height=e.display_h=parseInt(e.thumbnail.height);
if(e.display_w>g){e.display_w=g;
e.display_h=parseInt(e.height*(e.display_w/e.width))
}if(e.display_h>c){e.display_h=c;
e.display_w=parseInt(e.width*(e.display_h/e.height))
}if(!e.html){e.html="MISSING video.html"
}if(e.html.indexOf("gfycat.com/ifr")>-1){e.html=b(e.html)
}e.html=e.html.replace("http://","//");
if(e.html.indexOf("oldwidth")==-1){e.html=e.html.replace(" width=",' width="'+e.display_w+'" oldwidth=');
e.html=e.html.replace(" height=",' height="'+e.display_h+'" oldheight=')
}if(e.html.indexOf("autoplay")==-1){e.html=e.html.replace("feature=oembed","feature=oembed&autoplay=1");
e.html=e.html.replace('" width','?autoplay=1" width')
}e.html=TS.inline_videos.enCommentHTML(e.html);
e.html=TS.utility.swapInRedirUrlForIframe(e.html);
var f=TS.utility.getImgProxyURL(e.src,e.display_w,e.display_h);
if(f!=e.src){e.proxied_src=f
}else{delete e.proxied_src
}},test:function(){return{maybeRewriteGfyCatHtml:b}
}});
var a=/^[a-zA-Z0-9]+$/;
var b=function(f){var g=TS.utility.getAttributesFromHTMLString(f);
var e=g.src;
if(!e){return f
}var i=e.split("ifr/")[1]||"";
if(!i.match(a)){return f
}var h=parseInt(g.width,10);
var c=parseInt(g.height,10);
if(!h||!c){return f
}g.src="https://"+document.location.host+"/gfycat_iframe.php?key="+i+"&w="+h+"&h="+c+"&"+Date.now();
var d=$("<iframe>").attr(g);
return d[0].outerHTML
}
})();
(function(c){var b=c.prototype;
var d=b.parseFromString;
try{if((new c()).parseFromString("","text/html")){return
}}catch(a){}b.parseFromString=function(e,f){if(/^\s*text\/html\s*(?:;|$)/i.test(f)){var g=document.implementation.createHTMLDocument("");
e=e||"";
if(e.toLowerCase().indexOf("<!doctype")>-1){g.documentElement.innerHTML=e
}else{g.body.innerHTML=e
}return g
}else{return d.apply(this,arguments)
}}
}(DOMParser));
(function(){TS.registerModule("inline_attachments",{no_scrolling:false,onStart:function(){},shouldExpand:function(b,a){if(TS.model.expandable_state["attach_"+b+a.from_url]){return true
}if(TS.model.expandable_state["attach_"+b+a.from_url]===false){return false
}return true
},shouldShow:function(b,a){if(!b.from_url){return true
}if(a&&a.text){if(a.text.indexOf(b.from_url)==-1){if(TS.model.ampersands_are_inconsistent_in_from_urls){if(a.text.indexOf(b.from_url.replace(/\&/g,"&amp;"))==-1){return true
}}else{return true
}}}if(TS.model.prefs.expand_inline_imgs){if(b.audio_html){return true
}if(b.other_html){return true
}if(b.video_html){return true
}if(b.image_url){return true
}if(b.service_name&&b.service_name.toString().toLowerCase()=="twitter"){return true
}}return !!TS.model.prefs.expand_non_media_attachments
},expandAllInCurrent:function(){TS.inline_attachments.no_scrolling=true;
$(".msg_inline_attachment_expander").trigger("click");
TS.inline_attachments.no_scrolling=false;
if(TS.client){TS.client.ui.instaScrollMsgsToBottom(false)
}},collapseAllInCurrent:function(){$(".msg_inline_attachment_collapser").trigger("click")
},expand:function(f,g){TS.model.expandable_state["attach_"+f+g]=true;
TS.storage.storeExpandableState(TS.model.expandable_state);
var a="#"+TS.utility.makeSafeForDomId(f);
var b=$(a);
if(!b.length){return
}var d=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var c=function(h){return $(this).data("real-src")==g
};
var e=b.find(".inline_attachment").filter(c);
e.removeClass("hidden");
b.find(".msg_inline_attachment_expander").filter(c).addClass("hidden");
b.find(".msg_inline_attachment_collapser").filter(c).removeClass("hidden");
if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}e.css("opacity",0).stop().animate({opacity:1},300);
if(!TS.inline_attachments.no_scrolling){if(TS.client&&d){TS.client.ui.instaScrollMsgsToBottom(false);
b.children().first().scrollintoview({duration:0,offset:"top",px_offset:10,direction:"y"})
}else{e.scrollintoview({duration:200,offset:"bottom",px_offset:-10,direction:"y"})
}}if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}},collapse:function(e,f){TS.model.expandable_state["attach_"+e+f]=false;
TS.storage.storeExpandableState(TS.model.expandable_state);
var a="#"+TS.utility.makeSafeForDomId(e);
var b=$(a);
if(!b.length){return
}var c=function(g){return $(this).data("real-src")==f
};
var d=b.find(".inline_attachment").filter(c);
if(!d.length){d=b.find(".msg_inline_attachment_holder").filter(c)
}d.css("visibility","hidden");
b.find(".msg_inline_attachment_expander").filter(c).removeClass("hidden");
b.find(".msg_inline_attachment_collapser").filter(c).addClass("hidden");
setTimeout(function(){d.addClass("hidden");
d.css("visibility","visible")
},200)
},checkForInlineAttachmentClick:function(q,h){if(!q.target){return
}var u=$(q.target);
var o=u.closest(".message").data("ts");
var m=TS.templates.makeMsgDomId(o);
if(!o&&h){o=u.closest(".search_message_result").data("ts");
m=TS.templates.makeMSRDomId(h)
}if(!o){return
}o=o.toString();
var r=u.closest(".msg_inline_attachment_expander");
if(r.length){q.preventDefault();
TS.inline_attachments.expand(m,r.data("real-src"))
}var p=u.closest(".msg_inline_attachment_collapser");
if(p.length){q.preventDefault();
TS.inline_attachments.collapse(m,p.data("real-src"))
}var n=u.closest(".rest_text_expander");
if(n.length){q.preventDefault();
var a=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var b=n.parent().find(".short_text");
var t;
var k=n.parent().find(".more_text");
if(n.data("show-text")){if(k.length){k.addClass("hidden");
t=n.find("a span");
n.data("hide-text",t.text());
t.text(n.data("show-text"));
n.data("show-text","");
n.find("a .ts_icon").removeClass("ts_icon_caret_down").addClass("ts_icon_caret_right")
}}else{if(b.data("all-text")){b.html(b.data("all-text"));
b.data("all-text","")
}if(k.length){k.removeClass("hidden")
}if(k.length&&n.data("hide-text")){t=n.find("a span");
n.data("show-text",t.text());
t.text(n.data("hide-text"));
n.data("hide-text","");
n.find("a .ts_icon").removeClass("ts_icon_caret_right").addClass("ts_icon_caret_down")
}else{n.css("display","none")
}}b.css("opacity",0).transition({opacity:1},300);
TS.inline_attachments.rest_texts_expanded[n.attr("id")]=true;
if(TS.client){TS.client.ui.updateClosestMonkeyScroller(b)
}if(TS.client&&a){TS.client.ui.instaScrollMsgsToBottom(false);
b.scrollintoview({duration:0,offset:"top",px_offset:10,direction:"y"})
}}var l=u.closest(".delete_attachment_link");
if(l.length){q.preventDefault();
var d=l.data("attachment-id").toString();
var j=TS.shared.getActiveModelOb();
if(!j){alert("missing model_ob");
return
}if(!d){alert("missing attachment-id");
return
}var s=j.id;
var g=TS.utility.msgs.getMsg(o,j.msgs);
var f="";
if(TS.model.user.is_admin){var i=TS.inline_attachments.getAttachmentById(g.attachments,d);
if(i&&i.from_url){var c=TS.inline_attachments.makeBlackListSelect(i.from_url);
f='						<p class="large_left_margin '+(c?"no_bottom_margin":"")+'">							<label class="checkbox normal" style="font-size: 16px;">								<input id="attachment_blacklist_cb" type="checkbox" class="small_right_margin" />								Disable future attachments from this website?</label>';
if(c){f+=c
}f+="</p>"
}}TS.generic_dialog.start({title:"Remove attachment",body:'<p class="'+(f?"small_bottom_margin":"")+'">Are you sure you wish to remove this attachment from the message?</p>'+f,go_button_text:"Yes, remove",on_show:function(){$("#attachment_blacklist_cb").bind("change",function(){var e=!!$("#attachment_blacklist_cb").prop("checked");
TS.info(e);
if(e){$("#attachment_blacklist_select").prop("disabled",false)
}else{$("#attachment_blacklist_select").prop("disabled",true)
}})
},on_go:function(){var x=!!$("#attachment_blacklist_cb").prop("checked");
var v=x?$("#attachment_blacklist_select").val():"none";
var e=x?$("#attachment_blacklist_select").find(":selected").data("url"):"";
var w={channel:s,ts:o,attachment:d,blacklist:x,blacklist_type:v,blacklist_url:e};
TS.dir(0,w);
TS.api.call("chat.deleteAttachment",w,function(z,A,y){if(z){if(TS.web){g.attachments=TS.inline_attachments.removeAttachmentById(g.attachments,d);
TS.utility.msgs.replaceMsg(j,g)
}}else{TS.generic_dialog.alert("Attachment removing failed!")
}})
}})
}},makeBlackListSelect:function(a){if(!a){return""
}a=TS.utility.htmlEntities(a).replace("https://","").replace("http://","");
var b="";
var g=a.split("/");
var f=g[0];
var e=g[g.length-1];
b+='<label class="select small full_width">\r';
b+='<select id="attachment_blacklist_select" disabled="disabled" class="small" style="margin-bottom: 4px;">\r';
b+='<option value="all" data-url="'+f+'">All links from '+f+"</option>\r";
b+='<option value="just" data-url="'+a+'">Just the link '+a+"</option>\r";
if(e!=f){TS.info(e);
var d=g.concat();
d.length=d.length-1;
var c=d.join("/");
if(c!=f){c+="/";
b+='<option value="under" data-url="'+c+'">All links under '+c+"</option>\r"
}}b+="</select>\r";
b+="</label>\r";
return b
},rest_texts_expanded:{},shouldExpandText:function(a){return !!TS.inline_attachments.rest_texts_expanded[a]
},makeInternalInlineAttachment:function(a,b){TS.model.inline_attachments[a]=b
},renderStandaloneAttachment:function(d){TS.inline_attachments.massageAttachment(d,0);
if(d.image_url&&!TS.model.inline_imgs[d.from_url]){TS.inline_imgs.makeInternalInlineImg(d.from_url,{link_url:d.from_url,bytes:d.image_bytes,src:d.image_url,width:isNaN(d.image_width)?null:d.image_width,height:isNaN(d.image_height)?null:d.image_height,should_expand:true})
}if(d.video_html&&!TS.model.inline_videos[d.from_url]){TS.inline_videos.makeInternalInlineVideo(d.from_url,{src:d.thumb_url,html:d.video_html,proxied_src:d.proxied_thumb_url,title:d.title,display_h:d.video_html_height,display_w:d.video_html_width,thumbnail:{link_url:d.from_url,url:d.thumb_url,height:d.thumb_height,width:d.thumb_width}})
}var b=TS.utility.date.makeTsStamp();
var a=TS.templates.builders.buildAttachmentHTML({attachment:d,msg:{enable_slack_action_links:false,text:d.from_url,ts:b,url:d.from_url},can_delete:false,maybe_show_lightbox:false});
var c=TS.templates.makeMsgDomId(b);
return'<div class="message standalone-attachment" id="'+c+'" data-ts="'+b+'">'+a+"</div>"
},massageAttachment:function(f,j){f._index=j;
if("id" in f){f.id=f.id.toString()
}var h=500;
var r=3;
var a="";
var l=0;
if(f.text){var q="";
var p="";
var m="";
var k;
var o=0;
var d=false;
for(var b=0;
b<f.text.length;
b++){k=f.text.charAt(b);
if(p||k=="<"){p+=k;
if(m||k=="|"){m+=k
}if(k==">"){a+=p;
l+=m.length-2;
if(l>h){d=true
}p="";
m=""
}}else{if(k=="\n"){o++
}if(o>r+1){q=f.text.replace(a,"");
break
}a+=k;
l++;
if(l>h){d=true
}if(d&&k==" "){q=f.text.replace(a,"");
break
}}}f._short_text=(a==f.text)?"":a;
var e=a.match(/```/g);
var n=q.match(/```/g);
if(e&&n){f._short_text+="```"
}}f._floated_thumb_display_height=75;
f._floated_thumb_display_width=75;
if(f.thumb_height&&f.thumb_width){if(f.thumb_height>f.thumb_width){f._floated_thumb_display_width=parseInt(f.thumb_width*(f._floated_thumb_display_height/f.thumb_height))
}else{f._floated_thumb_display_height=parseInt(f.thumb_height*(f._floated_thumb_display_width/f.thumb_width))
}}var g=TS.utility.getImgProxyURL(f.thumb_url,f._floated_thumb_display_width,f._floated_thumb_display_height);
if(g!=f.thumb_url){f.proxied_thumb_url=g
}else{delete f.proxied_thumb_url
}},getAttachmentByFromUrl:function(a,b){if(!a){return null
}for(var c=0;
c<a.length;
c++){if(!a[c]){TS.info(b);
TS.dir(0,a);
continue
}if(!a[c].from_url){continue
}if(a[c].from_url==b){return a[c]
}if(TS.model.ampersands_are_inconsistent_in_from_urls){if(a[c].from_url.replace(/\&/g,"&amp;")==b){return a[c]
}}}return null
},getAttachmentBySlackFileId:function(a,b){if(!a){return null
}if(!b){return null
}for(var c=0;
c<a.length;
c++){if(!a[c]){continue
}if(a[c].slack_file_id==b){return a[c]
}}return null
},removeAttachmentById:function(b,d){if(!b){return null
}var a=[];
for(var c=0;
c<b.length;
c++){if(b[c].id!=d){a.push(b[c])
}}return a
},getAttachmentById:function(a,c){if(!a){return null
}for(var b=0;
b<a.length;
b++){if(a[b].id==c){return a[b]
}}return null
}})
})();
(function(){TS.registerModule("inline_audios",{no_scrolling:false,onStart:function(){},shouldExpand:function(b,a){if(TS.model.expandable_state["aud_"+b+TS.utility.htmlEntities(a.src)]){return true
}if(TS.model.expandable_state["aud_"+b+TS.utility.htmlEntities(a.src)]===false){return false
}if(a.internal_file_id){return TS.model.prefs.expand_internal_inline_imgs
}return TS.model.prefs.expand_inline_imgs
},expandAllInCurrent:function(){TS.inline_audios.no_scrolling=true;
$(".msg_inline_audio_expander").trigger("click");
TS.inline_audios.no_scrolling=false;
if(TS.client){TS.client.ui.instaScrollMsgsToBottom(false)
}},collapseAllInCurrent:function(){$(".msg_inline_audio_collapser").trigger("click")
},expand:function(f,g){TS.model.expandable_state["aud_"+f+TS.utility.htmlEntities(g)]=true;
TS.storage.storeExpandableState(TS.model.expandable_state);
var a="#"+TS.utility.makeSafeForDomId(f);
var b=$(a);
if(!b.length){return
}var d=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var c=function(h){return $(this).data("real-src")==g
};
var e=(TS.boot_data.feature_attachments_inline)?b.find(".inline_attachment").filter(c):null;
if(!e||!e.length){e=b.find(".msg_inline_audio_holder").filter(c)
}e.removeClass("hidden");
b.find(".msg_inline_audio_expander").filter(c).addClass("hidden");
b.find(".msg_inline_audio_collapser").filter(c).removeClass("hidden");
if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}e.css("opacity",0).stop().animate({opacity:1},300);
if(!TS.inline_audios.no_scrolling){if(TS.client&&d){TS.client.ui.instaScrollMsgsToBottom(false);
b.children().first().scrollintoview({duration:0,offset:"top",px_offset:10,direction:"y"})
}else{b.find(".msg_inline_audio").last().scrollintoview({duration:200,offset:"bottom",px_offset:-10,direction:"y"})
}}if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}},collapse:function(e,f){TS.model.expandable_state["aud_"+e+TS.utility.htmlEntities(f)]=false;
TS.storage.storeExpandableState(TS.model.expandable_state);
var a="#"+TS.utility.makeSafeForDomId(e);
var b=$(a);
if(!b.length){return
}var c=function(g){return $(this).data("real-src")==f
};
var d=(TS.boot_data.feature_attachments_inline)?b.find(".inline_attachment").filter(c):null;
if(!d||!d.length){d=b.find(".msg_inline_audio_holder").filter(c)
}d.css("visibility","hidden");
b.find(".msg_inline_audio_expander").filter(c).removeClass("hidden");
b.find(".msg_inline_audio_collapser").filter(c).addClass("hidden");
d.find(".msg_inline_audio_iframe_div").html("");
setTimeout(function(){d.addClass("hidden");
d.css("visibility","visible")
},200)
},checkForInlineAudioClick:function(h,g){if(!h.target){return
}var j=$(h.target);
var c=j.closest(".message").data("ts");
var d=TS.templates.makeMsgDomId(c);
if(!c&&g){c=j.closest(".search_message_result").data("ts");
d=TS.templates.makeMSRDomId(g)
}if(!c){return
}c=c.toString();
var i=j.closest(".msg_inline_audio_expander");
if(i.length){h.preventDefault();
TS.inline_audios.expand(d,i.data("real-src"))
}var f=j.closest(".msg_inline_audio_collapser");
if(f.length){h.preventDefault();
TS.inline_audios.collapse(d,f.data("real-src"))
}var b=j.closest(".inline_audio_play_link");
if(b.length){h.preventDefault();
var a=b.attr("href");
return alert("play "+a)
}},makeInternalInlineAudio:function(a,b){if(!b.audio_html){return
}b.safe_audio_html=b.audio_html;
b.safe_audio_html=TS.utility.swapInRedirUrlForIframe(b.safe_audio_html);
if(TS.client){b.safe_audio_html=TS.utility.getPlaceholderHTMLFromIframe(b.safe_audio_html)
}TS.model.inline_audios[a]={src:TS.utility.htmlEntities(b.audio_url||b.audio_html),attachment:b}
}})
})();
(function(){TS.registerModule("inline_others",{no_scrolling:false,onStart:function(){},shouldExpand:function(b,c){if(TS.model.expandable_state["vid_"+b+c.src]){return true
}if(TS.model.expandable_state["vid_"+b+c.src]===false){return false
}if(c.internal_file_id){return TS.model.prefs.expand_internal_inline_imgs
}return TS.model.prefs.expand_inline_imgs
},expandAllInCurrent:function(){TS.inline_others.no_scrolling=true;
$(".msg_inline_other_expander").trigger("click");
TS.inline_others.no_scrolling=false;
if(TS.client){TS.client.ui.instaScrollMsgsToBottom(false)
}},collapseAllInCurrent:function(){$(".msg_inline_other_collapser").trigger("click")
},expand:function(g,h){TS.model.expandable_state["vid_"+g+h]=true;
TS.storage.storeExpandableState(TS.model.expandable_state);
var b="#"+TS.utility.makeSafeForDomId(g);
var c=$(b);
if(!c.length){return
}var e=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var d=function(j){return $(this).data("real-src")==h
};
var f=(TS.boot_data.feature_attachments_inline)?c.find(".inline_attachment").filter(d):null;
if(!f||!f.length){f=c.find(".msg_inline_other_holder").filter(d)
}f.removeClass("hidden");
c.find(".msg_inline_other_expander").filter(d).addClass("hidden");
c.find(".msg_inline_other_collapser").filter(d).removeClass("hidden");
if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}f.css("opacity",0).stop().animate({opacity:1},300);
if(!TS.inline_others.no_scrolling){if(TS.client&&e){TS.client.ui.instaScrollMsgsToBottom(false);
c.children().first().scrollintoview({duration:0,offset:"top",px_offset:10,direction:"y"})
}else{c.find(".msg_inline_other").last().scrollintoview({duration:200,offset:"bottom",px_offset:-10,direction:"y"})
}}if(TS.client){TS.client.ui.checkInlineImgsAndIframesEverywhere()
}},collapse:function(f,g){TS.model.expandable_state["vid_"+f+g]=false;
TS.storage.storeExpandableState(TS.model.expandable_state);
var b="#"+TS.utility.makeSafeForDomId(f);
var c=$(b);
if(!c.length){return
}var d=function(h){return $(this).data("real-src")==g
};
var e=(TS.boot_data.feature_attachments_inline)?c.find(".inline_attachment").filter(d):null;
if(!e||!e.length){e=c.find(".msg_inline_other_holder").filter(d)
}e.css("visibility","hidden");
c.find(".msg_inline_other_expander").filter(d).removeClass("hidden");
c.find(".msg_inline_other_collapser").filter(d).addClass("hidden");
e.find(".msg_inline_other_iframe_div").html("");
setTimeout(function(){e.addClass("hidden");
e.css("visibility","visible")
},200)
},checkForInlineOtherClick:function(h,c){if(!h.target){return
}var d=$(h.target);
var b=d.closest(".message").data("ts");
var g=TS.templates.makeMsgDomId(b);
if(!b&&c){b=d.closest(".search_message_result").data("ts");
g=TS.templates.makeMSRDomId(c)
}if(!b){return
}b=b.toString();
var f=d.closest(".msg_inline_other_expander");
if(f.length){h.preventDefault();
TS.inline_others.expand(g,f.data("real-src"));
return
}var i=d.closest(".msg_inline_other_collapser");
if(i.length){h.preventDefault();
TS.inline_others.collapse(g,i.data("real-src"));
return
}},makeInternalInlineOther:function(g){var f=400;
var b=500;
if(g.other_html_width>f){g.other_html_height=parseInt(g.other_html_height*(f/g.other_html_width));
g.other_html_width=f
}if(g.other_html_height>b){g.other_html_width=parseInt(g.other_html_width*(b/g.other_html_height));
g.other_html_height=b
}var e;
if(g.google_map_config){try{e=JSON.parse(g.google_map_config)
}catch(d){}}if(e&&e.center&&(typeof e.center.lat!="string")){e.scrollwheel=false;
var c="googmap_"+(a++);
g.other_html='<div class="google-maps" id="'+c+'" style="width:100%; min-width:'+TS.utility.htmlEntities(g.other_html_width)+"px; height:"+TS.utility.htmlEntities(g.other_html_height)+'px;"></div>			<script>TS.inline_others.runGoogleMapCode("'+c+"\", '"+JSON.stringify(e)+"')<\/script>";
g.safe_other_html=g.other_html
}else{if(g.other_html.indexOf("oldwidth")==-1){g.other_html=g.other_html.replace(" width=",' width="'+g.other_html_width+'" oldwidth=');
g.other_html=g.other_html.replace(" height=",' height="'+g.other_html_height+'" oldheight=')
}g.safe_other_html=g.other_html;
g.safe_other_html=TS.utility.swapInRedirUrlForIframe(g.safe_other_html);
if(TS.client){g.safe_other_html=TS.utility.getPlaceholderHTMLFromIframe(g.safe_other_html)
}}TS.model.inline_others[g.other_html]={src:TS.utility.htmlEntities(g.other_html),attachment:g}
},runGoogleMapCode:function(b,e){if(!window.google){return
}if(!e){return
}var c=JSON.parse(e);
var g=new google.maps.Map(document.getElementById(b),c);
if(!c.query){return
}var f=new google.maps.Geocoder();
var h=(typeof c.max_results=="number")?c.max_results:10;
if(h<0){h=Number.MAX_VALUE
}var d=function(){google.maps.event.clearListeners(g,"bounds_changed");
var k=g.getBounds();
var j=0;
var i=function(m){new google.maps.Marker({map:g,position:m.geometry.location});
j++
};
var l=function(q,o){var p=false;
if(o==google.maps.GeocoderStatus.OK){q.slice(0,h).map(function(r){i(r);
p=p||!r.partial_match
})
}else{TS.warn("Geocoder failed due to: "+o)
}if(!p&&j<h){var n=new google.maps.places.PlacesService(g);
var m=function(s,r){if(r==google.maps.places.PlacesServiceStatus.OK){s.slice(0,h-j).map(i)
}else{TS.warn("PlacesService failed due to: "+r)
}};
n.nearbySearch({bounds:k,name:c.query},m)
}};
f.geocode({address:c.query,bounds:k},l)
};
google.maps.event.addListener(g,"bounds_changed",d)
}});
var a=0
})();
(function(){TS.registerModule("comments",{onStart:function(){}})
})();
(function(){TS.registerModule("comments.ui",{editing_file:null,editing_comment:null,editing:false,$edit_form:null,bound:false,onStart:function(){TS.comments.ui.$edit_form=$("#file_edit_comment_form");
TS.comments.ui.bindInput($("#file_comment"))
},bindInput:function(a,b){a.TS_tabComplete2({complete_cmds:false,complete_channels:true,complete_emoji:true,complete_member_specials:false,onComplete:function(c){TS.utility.populateInput(a,c)
}});
a.bind("keydown.cmd_submit",function(c){if(TS.boot_data.feature_fix_files){if(c.which===TS.utility.keymap.enter){if(a.tab_complete_ui("isShowing")){c.preventDefault();
return
}if(!c.shiftKey&&!c.altKey&&!c.ctrlKey){if(b){b()
}else{$(this).closest("form").submit()
}c.preventDefault()
}}}else{if(c.which===TS.utility.keymap.enter&&!TS.utility.cmdKey(c)){if(a.tab_complete_ui("isShowing")){c.preventDefault()
}return
}if(c.which==TS.utility.keymap.enter&&TS.utility.cmdKey(c)){if(b){b()
}else{$(this).closest("form").submit()
}c.preventDefault()
}}});
a.tab_complete_ui({id:"comment_input_tab_ui",min_width:300,narrow:!!TS.client,no_model_ob:true,scroll_with_element:!!TS.client})
},unbindInput:function(a){if(!a){return
}a.unbind("keydown.cmd_submit");
a.removeData()
},bindEditForm:function(){TS.comments.ui.bound=true;
var a=TS.comments.ui.$edit_form;
$("#file_edit_comment").css("overflow","hidden").autogrow();
TS.comments.ui.bindInput($("#file_edit_comment"));
a.unbind("submit").bind("submit",TS.comments.ui.submitEditForm);
a.find(".save").unbind("click").bind("click",function(b){TS.comments.ui.submitEditForm();
return false
});
a.find(".cancel").unbind("click").bind("click",function(b){TS.comments.ui.onEndEdit();
return false
});
a.unbind("destroyed").bind("destroyed",function(){$("#file_comment_form").after($(this)[0].outerHTML);
TS.comments.ui.$edit_form=$("#file_edit_comment_form");
TS.comments.ui.bound=false;
if(!TS.comments.ui.editing){return
}TS.comments.ui.onEndEdit()
})
},submitEditForm:function(){var a=$("#file_edit_comment").val();
if(!$.trim(a)){if(TS.client){TS.sounds.play("beep")
}return false
}TS.comments.ui.saveEdit();
return false
},startEdit:function(c,b){if(TS.comments.ui.editing){TS.comments.ui.onEndEdit()
}var a=TS.files.getFileById(c);
if(!a){TS.error("no file?");
return null
}var f=TS.files.getFileCommentById(a,b);
if(!f){TS.error("no comment?");
return null
}var e=TS.comments.ui.$edit_form;
var d=$("#"+f.id);
if(!d.length){TS.error("no #"+f.id+"?");
return
}d.find(".comment_meta").addClass("hidden");
d.find(".comment_body").addClass("hidden").after(e);
$("#file_edit_comment").val("").css("height","");
if(!TS.comments.ui.bound){TS.comments.ui.bindEditForm()
}e.removeClass("hidden");
$("#file_edit_comment").val(TS.format.unFormatMsg(f.comment)).focus().setCursorPosition(1000000).trigger("keyup");
$("#file_comment_form").css("visibility","hidden");
TS.comments.ui.editing=true;
TS.comments.ui.editing_file=a;
TS.comments.ui.editing_comment=f
},saveEdit:function(){var a=TS.comments.ui.editing_file;
var e=TS.comments.ui.editing_comment;
var b=$("#"+e.id);
var d=TS.format.cleanMsg($("#file_edit_comment").val());
if(d!=e.comment){var c=e.comment;
e.comment=d;
b.find(".comment_body").html(TS.format.formatJustText(e.comment));
TS.api.call("files.comments.edit",{file:a.id,id:e.id,comment:d},function(g,h,f){if(!g){e.comment=c;
b.find(".comment_body").html(TS.format.formatJustText(e.comment));
alert("save failed")
}})
}TS.comments.ui.onEndEdit()
},onEndEdit:function(){var b=TS.comments.ui.editing_comment;
var a=$("#"+b.id);
TS.comments.ui.$edit_form.addClass("hidden");
a.find(".comment_meta").removeClass("hidden");
a.find(".comment_body").removeClass("hidden");
$("#file_comment_form").css("visibility","");
TS.comments.ui.editing=false;
TS.comments.ui.editing_file=null;
TS.comments.ui.editing_comment=null
},startDelete:function(c,b){var a=TS.files.getFileById(c);
if(!a){TS.error("no file?");
return null
}var d=TS.files.getFileCommentById(a,b);
if(!d){TS.error("no comment?");
return null
}TS.generic_dialog.start({title:"Delete a file comment",body:"<p>Are you sure you want to delete this comment? This cannot be undone.</p>"+TS.templates.comment({comment:d,file:a,show_comment_actions:false,hide_star:true}),go_button_text:"Yes, delete the comment",go_button_class:"btn_danger",on_go:function(){TS.comments.ui.commitDelete(c,b)
}})
},commitDelete:function(c,b){var a=TS.files.getFileById(c);
if(!a){TS.error("no file?");
return null
}var d=TS.files.getFileCommentById(a,b);
if(!d){TS.error("no comment?");
return null
}TS.api.call("files.comments.delete",{file:c,id:b},function(f,g,e){if(f){if(TS.client){}else{TS.files.deleteCommentOnFile(d.id,a)
}}else{if(g.error=="comment_not_found"){TS.files.deleteCommentOnFile(d.id,a)
}}})
},removeFileComment:function(b,c,a){$("#"+c).slideUp(200,a)
}})
})();
(function(){TS.registerModule("msg_edit",{edit_started_sig:new signals.Signal(),edit_ended_sig:new signals.Signal(),editing:false,deleting_from_editing:false,current_msg:null,current_model_ob:null,edit_interv:0,onStart:function(){},onCountDownInterval:function(){if(!TS.msg_edit.current_msg){return
}if(TS.model.team.prefs.msg_edit_window_mins==-1){$("#edit_countdown").empty();
return
}var c=TS.utility.date.toDateObject(TS.msg_edit.current_msg.ts).getTime()+(TS.model.team.prefs.msg_edit_window_mins*60*1000);
var b=Math.floor((c-Date.now())/1000);
if(b<1){$("#edit_countdown").html("(your time to edit ran out)&nbsp&nbsp&nbsp&nbsp")
}else{if(b<61){$("#edit_countdown").html("(you have <b>"+b+"</b> seconds)&nbsp&nbsp&nbsp&nbsp")
}else{$("#edit_countdown").empty()
}}},cancelEditingINothingHasChanged:function(){if(!TS.msg_edit.editing){return true
}var c=TS.format.unFormatMsg(TS.msg_edit.current_msg.text);
var b=$("#message_edit_form").find("#msg_text").val();
if(b===c){TS.msg_edit.onCancelEdit();
return true
}return false
},editExpiration:function(b){var d="Message not editable. ";
var c;
if(b>0){d+="You have ";
if(b==1){d+="1 minute "
}else{c=TS.utility.date.toTimeAmount(b);
if(c.w>=1){d+=c.w+" week"+(c.w>1?"s ":" ")
}if(c.d>=1){d+=c.d+" day"+(c.d>1?"s ":" ")
}if(c.h>=1){d+=c.h+" hour"+(c.h>1?"s ":" ")
}if(c.mi>=1){d+=c.mi+" minute"+(c.mi>1?"s ":" ")
}}d+="to edit a message after posting."
}else{d+="You cannot edit your message after posting."
}return d
},startEdit:function(j,c){if($("#message_edit_form").length&&!TS.msg_edit.cancelEditingINothingHasChanged()){TS.msg_edit.promptEdit();
return
}if(!j){TS.error("no msg_ts?");
return null
}if(!c){TS.error("no model_ob?");
return null
}if(!c.msgs){TS.error("no model_ob.msgs?");
return null
}var e=TS.utility.msgs.getMsg(j,a(c));
if(!e){TS.error("no msg in msgs?");
return null
}var k=TS.format.unFormatMsg(e.text);
if(TS.model.team.prefs.msg_edit_window_mins>=0&&(Date.now()-TS.utility.date.toDateObject(e.ts))/60000>TS.model.team.prefs.msg_edit_window_mins){TS.generic_dialog.alert(TS.msg_edit.editExpiration(TS.model.team.prefs.msg_edit_window_mins));
return
}TS.msg_edit.current_msg=e;
TS.msg_edit.current_model_ob=c;
var b=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
var f=TS.msg_edit.getDivForMsg(e.ts);
f.addClass("hidden");
var g=TS.templates.message_edit_form({msg:e,permalink:TS.utility.msgs.constructMsgPermalink(c,e.ts),first_in_block:f.hasClass("first"),include_emo:!!TS.client});
f.after(g);
var d=$("#message_edit_form");
var i=d.find("#msg_text");
TS.msg_edit.checkLengthOK(i);
TS.info("message_edit_form added");
TS.msg_edit.editing=true;
TS.msg_edit.edit_started_sig.dispatch();
d.bind("destroyed",function(){TS.info("message_edit_form removed");
TS.msg_edit.editing=false;
TS.msg_edit.edit_ended_sig.dispatch();
TS.msg_edit.resetEditUI()
});
i.TS_tabComplete2({complete_cmds:false,complete_channels:true,complete_emoji:true,complete_member_specials:true,no_tab_out:true,onComplete:function(l){TS.utility.populateInput(i,l)
},sort_by_membership:true});
i.tab_complete_ui({id:"msg_edit_tab_ui",scroll_with_element:!!TS.client});
d.bind("submit",function(m){m.preventDefault();
var l=i.val();
if(l===k){TS.msg_edit.onCancelEdit();
return
}if(!l){TS.msg_edit.startDelete(TS.msg_edit.current_msg.ts,TS.msg_edit.current_model_ob,TS.msg_edit.onCancelEdit,true);
return
}if(!$.trim(l)){return
}TS.msg_edit.onConfirmEdit(l)
});
i.bind("textchange",function(l,m){TS.msg_edit.checkLengthOK(i)
}).bind("keyup",function(m){var l;
if(window.getSelection){l=window.getSelection();
if(l&&l.toString&&!l.toString()){$("#edit_controls").scrollintoview({px_offset:-50})
}}}).bind("keydown",function(m){if(m.which==TS.utility.keymap.enter&&(m.ctrlKey||m.altKey)){if(!TS.model.is_mac||TS.model.is_FF){var l=i.getCursorPosition();
var n=i.val();
i.val(n.substr(0,l)+"\n"+n.substr(l)).trigger("autosize.resize").setCursorPosition(l+1)
}}else{if(m.which==TS.utility.keymap.enter){if(TS.model.prefs.enter_is_special_in_tbt&&TS.utility.isCursorWithinTBTs(i)&&!m.shiftKey){return
}else{if(TS.model.prefs.enter_is_special_in_tbt&&TS.utility.isCursorWithinTBTs(i)&&m.shiftKey){m.preventDefault();
TS.msg_edit.checkAndSubmit(i,d);
return
}else{if(i.tab_complete_ui("isShowing")){m.preventDefault();
return
}else{if(!m.shiftKey&&!m.altKey){m.preventDefault();
TS.msg_edit.checkAndSubmit(i,d);
return
}}}}}}}).autosize();
$("body").bind("keydown.close_message_edit_form",function(l){if(l.which==TS.utility.keymap.esc){if(i.tab_complete_ui("isShowing")||i.tab_complete_ui("wasJustHidden")){return
}if(!TS.model.menu_is_showing&&!TS.model.dialog_is_showing){setTimeout(TS.msg_edit.onCancelEdit,0)
}}});
d.find("#commit_edit").bind("click",function(){TS.msg_edit.checkAndSubmit(i,d)
});
d.find("#cancel_edit").bind("click",function(){TS.msg_edit.onCancelEdit()
});
var h=d.find(".emo_menu");
h.removeClass("hidden");
h.bind("click.open_dialog",function(l){TS.emoji_menu.startEmo(l,"#msg_text")
});
h.html(TS.emoji.graphicReplace(h.html()));
if(TS.client&&b){TS.client.ui.instaScrollMsgsToBottom(false)
}$("#edit_controls").scrollintoview({duration:500,px_offset:100,complete:function(){i.focus();
TS.utility.setCursorPosition("#msg_text",100000000)
}});
TS.msg_edit.onCountDownInterval();
TS.msg_edit.edit_interv=setInterval(TS.msg_edit.onCountDownInterval,1000)
},checkLengthOK:function(c){var b=c.val().length>TS.model.input_maxlength;
if(b){$("#edit_warning").removeClass("hidden");
$("#edit_saver").addClass("hidden");
return false
}else{$("#edit_warning").addClass("hidden");
$("#edit_saver").removeClass("hidden");
return true
}},checkAndSubmit:function(b,c){if(TS.msg_edit.checkLengthOK(b)){c.submit()
}},onConfirmEdit:function(b){if(!TS.msg_edit.current_msg){TS.error("no TS.msg_edit.current_msg?");
return null
}if(!b){TS.error("no edited_text?");
return null
}TS.msg_edit.commitEditInternal(b);
TS.msg_edit.resetEditUI()
},onCancelEdit:function(){if(!TS.msg_edit.current_msg){TS.error("no TS.msg_edit.current_msg?");
return null
}TS.msg_edit.resetEditUI();
if(TS.view){TS.view.focusMessageInput()
}},resetEditUI:function(){clearInterval(TS.msg_edit.edit_interv);
if(!TS.msg_edit.current_msg){TS.error("no TS.msg_edit.current_msg?");
return null
}var b=TS.msg_edit.getDivForMsg(TS.msg_edit.current_msg.ts);
b.removeClass("hidden");
$("#message_edit_container").remove();
$("body").unbind("keydown.close_message_edit_form")
},getDivForMsg:function(b){return $("#"+TS.templates.makeMsgDomId(b))
},commitEditInternal:function(b){TS.msg_edit.commitEdit(TS.msg_edit.current_msg,TS.msg_edit.current_model_ob,b)
},commitEdit:function(f,b,c,d,e){if(!f){TS.error("no msg?");
return null
}if(!b){TS.error("no model_ob?");
return null
}if(!d){d=0
}if(!e){e=100
}TS.api.call("chat.update",{channel:b.id,ts:f.ts,text:TS.format.cleanMsg(c),_attempts:d,_delay_ms:e},function(h,i,g){if(h){if(TS.web||(b.is_channel&&!b.is_member)){f.text=i.text;
f.edited={ts:TS.utility.date.makeTsStamp(null,"0")};
TS.utility.msgs.replaceMsg(b,f)
}}else{if(!i||!i.error){TS.generic_dialog.alert("Sorry, something went wrong with editing your message. Try again in a moment.","Message editing failed")
}else{if(i.error=="message_not_found"){if(g._attempts<10){g._delay_ms*=1.75;
setTimeout(function(){TS.msg_edit.commitEdit(f,b,c,g._attempts,g._delay_ms)
},g._delay_ms);
return
}if(b.is_channel){TS.channels.removeMsg(b.id,f)
}else{if(b.is_im){TS.ims.removeMsg(b.id,f)
}else{if(TS.boot_data.feature_mpim_client&&b.is_mpim){TS.mpims.removeMsg(b.id,f)
}else{if(b.is_group){TS.groups.removeMsg(b.id,f)
}}}}TS.generic_dialog.alert("Sorry, something went wrong with editing your message. Try again in a moment.","Message editing failed")
}else{if(i.error=="edit_window_closed"){TS.generic_dialog.alert("You have only "+TS.model.team.prefs.msg_edit_window_mins+" minutes to edit a message after posting.","Message editing failed")
}else{TS.generic_dialog.alert("Sorry, something went wrong with editing your message. Try again in a moment.","Message editing failed")
}}}}})
},promptEdit:function(){if($("#message_editing_info").css("display")!="none"){$("#message_edit_container").scrollintoview({duration:300,px_offset:0});
return
}$("#message_editing_info").css("display","");
$("#message_editing_info").css("opacity",0);
$("#message_edit_container").scrollintoview({duration:300,px_offset:0,complete:function(){$("#message_editing_info").transition({opacity:1},250)
}})
},startDelete:function(j,b,h,f){if(!j){TS.error("no msg_ts?");
return null
}if(!b){TS.error("no model_ob?");
return null
}if(!b.msgs){TS.error("no model_ob.msgs?");
return null
}var c=TS.utility.msgs.getMsg(j,a(b));
if(!c){TS.error("no msg in msgs?");
return null
}TS.msg_edit.deleting_from_editing=!!f;
TS.msg_edit.current_msg=c;
TS.msg_edit.current_model_ob=b;
var d=TS.msg_edit.getDivForMsg(c.ts);
var i='<p class="small_bottom_margin">Are you sure you want to delete this message? This cannot be undone.</p>';
if(c.subtype){var g;
if(c.file){g="file";
if(c.file.mode=="snippet"){g="snippet"
}else{if(c.file.mode=="post"){g="post"
}}}var e="";
if(c.subtype=="file_upload"){e="Note that deleting this message will not delete the "+g+" that was uploaded."
}else{if(c.subtype=="file_share"){e="Note that deleting this message will not unshare the "+g+"."
}else{if(c.subtype=="file_comment"){e="Note that deleting this message will not delete the comment."
}}}if(e){i+="<p>"+e+"</p>"
}}d.addClass("delete_mode");
TS.generic_dialog.start({title:"Delete Message",body:i+TS.templates.builders.buildMsgHTML({msg:c,model_ob:b,standalone:true}),go_button_text:"Yes, delete this message",go_button_class:"btn_danger",on_go:function(){if(TS.msg_edit.deleting_from_editing){TS.msg_edit.onCancelEdit()
}TS.msg_edit.commitDeleteInternal(h)
},on_cancel:function(){TS.msg_edit.onCancelDelete()
}});
TS.generic_dialog.div.find("img.msg_inline_img.hidden").each(function(l,m){var k=$(m);
k.prop("src",k.data("real-src"));
k.removeClass("hidden")
})
},onCancelDelete:function(){if(!TS.msg_edit.current_msg){TS.error("no TS.msg_edit.current_msg?");
return null
}var b=TS.msg_edit.getDivForMsg(TS.msg_edit.current_msg.ts);
b.removeClass("delete_mode");
if(TS.msg_edit.deleting_from_editing){$("#msg_text").focus()
}},commitDeleteInternal:function(b){TS.msg_edit.commitDelete(TS.msg_edit.current_msg,TS.msg_edit.current_model_ob,TS.msg_edit.onCancelDelete,b)
},commitDelete:function(c,b,g,f,e,k,j){if(!c){TS.error("no msg?");
return null
}if(!b){TS.error("no model_ob?");
return null
}var l=b.id;
if(!k){k=0
}if(!j){j=100
}if(c.is_ephemeral||TS.utility.msgs.isTempMsg(c)){if(b.is_channel){TS.channels.removeMsg(b.id,c)
}else{if(b.is_im){TS.ims.removeMsg(b.id,c)
}else{if(TS.boot_data.feature_mpim_client&&b.is_mpim){TS.mpims.removeMsg(b.id,c)
}else{if(b.is_group){TS.groups.removeMsg(b.id,c)
}else{return
}}}}}else{if(c._jl_rollup_hash&&c._jl_rollup_hash.msg_ids){var h=c._jl_rollup_hash.msg_ids;
for(var d=0;
d<h.length;
d++){if(h[d]==c.ts){continue
}TS.api.call("chat.delete",{channel:l,ts:h[d],_attempts:k,_delay_ms:j},function(m,n,i){if(m||n.error=="message_not_found"){if(n.error=="message_not_found"){if(i._attempts<10){i._delay_ms*=1.75;
setTimeout(function(){TS.msg_edit.commitDelete(c,b,g,f,e,i._attempts,i._delay_ms)
},i._delay_ms);
return
}}if(TS.web||(b.is_channel&&!b.is_member)){if(b.is_channel){TS.channels.removeMsg(b.id,TS.utility.msgs.getMsg(i.ts,a(b)))
}else{if(b.is_im){TS.ims.removeMsg(b.id,TS.utility.msgs.getMsg(i.ts,a(b)))
}else{if(TS.boot_data.feature_mpim_client&&b.is_mpim){TS.mpims.removeMsg(b.id,TS.utility.msgs.getMsg(i.ts,a(b)))
}else{if(b.is_group){TS.groups.removeMsg(b.id,TS.utility.msgs.getMsg(i.ts,a(b)))
}}}}}}})
}}TS.api.call("chat.delete",{channel:l,ts:c.ts,_attempts:k,_delay_ms:j},function(o,p,m){if(o||p.error=="message_not_found"){if(p.error=="message_not_found"){if(m._attempts<10){m._delay_ms*=1.75;
setTimeout(function(){TS.msg_edit.commitDelete(c,b,g,f,e,m._attempts,m._delay_ms)
},m._delay_ms);
return
}}if(TS.web||(b.is_channel&&!b.is_member)){if(b.is_channel){TS.channels.removeMsg(b.id,c)
}else{if(b.is_im){TS.ims.removeMsg(b.id,c)
}else{if(TS.boot_data.feature_mpim_client&&b.is_mpim){TS.mpims.removeMsg(b.id,c)
}else{if(b.is_group){TS.groups.removeMsg(b.id,c)
}}}}}if(f){f()
}}else{if(g){g()
}if(!e){var i="The message was not deleted.  The error was: "+(p&&p.error?p.error:"unknown");
TS.generic_dialog.start({title:"Delete Message Failed",body:i,show_cancel_button:false,esc_for_ok:true})
}}if(TS.web){var n=!TS.utility.msgs.getDisplayedMsgs(b.msgs).length;
if(n){var q=$(".pager .previous a");
if(q.attr("href")){window.location=q.attr("href")
}else{window.location.reload()
}}}})
}},$last_clicked_cb:null,startBatchDelete:function(){$("#msgs_div").addClass("selecting_messages");
$("#channel_actions_div").addClass("hidden");
$("#batch_delete_div").removeClass("hidden");
TS.msg_edit.batchDeleteSelectionChanged()
},cancelBatchDelete:function(){TS.msg_edit.selectNoneBatchDelete();
$("#msgs_div").removeClass("selecting_messages");
$("#channel_actions_div").removeClass("hidden");
$("#batch_delete_div").addClass("hidden")
},doBatchDelete:function(){var h=$("#msgs_div").find(".msg_select_cb:checked");
var b=TS.shared.getActiveModelOb();
if(h.length){var e=h.length;
if(e==1){TS.msg_edit.startDelete(h.eq(0).closest(".msg_actions").data("msg-ts"),b,TS.msg_edit.cancelBatchDelete);
return
}var f=(e==1)?"this message":"these "+e+" messages";
var g='<p class="small_bottom_margin">Are you sure you want to delete '+f+"? This cannot be undone! Note that deleting these messages will not delete any files or file comments.</p>";
var k;
var c;
for(var d=0;
d<e;
d++){if(c&&!c.no_display){k=c
}var j=h.eq(d).closest(".msg_actions").data("msg-ts");
c=TS.utility.msgs.getMsg(j,a(b));
if(!c){continue
}g+=TS.templates.builders.buildMsgHTML({msg:c,prev_msg:k,model_ob:b,standalone:true})
}var l=function(i){function n(o){TS.msg_edit.commitDelete(o,b,m,m,true)
}function m(){if(i.length){setTimeout(function(){n(i.pop())
},100)
}else{TS.generic_dialog.cancel();
TS.generic_dialog.start({title:"",body:"Messages deleted.",show_cancel_button:false,esc_for_ok:true})
}}TS.generic_dialog.start({title:"",body:"Deleting messages...",show_cancel_button:false,show_go_button:false});
m()
};
TS.generic_dialog.start({title:"Delete Messages",body:g,go_button_text:"Yes, delete these messages",go_button_class:"btn_danger",on_go:function(){var m=[];
for(var n=0;
n<e;
n++){var p=h.eq(n).closest(".msg_actions").data("msg-ts");
if(!p){alert("no msg_ts");
return
}var o=TS.utility.msgs.getMsg(p,a(b));
if(!o){alert("no msg");
return
}m.push(o)
}TS.msg_edit.cancelBatchDelete();
l(m)
},on_cancel:function(){}})
}else{}},batchDeleteSelectionChanged:function(c,g){var j=TS.msg_edit.$last_clicked_cb;
if(j&&c&&g){var b=$("#msgs_div").find(".msg_select_cb:visible");
var e=b.index(j);
var h=b.index(c);
if(e>h){h=e;
e=b.index(c)
}var l=j.prop("checked")=="checked";
for(var d=e;
d<=h;
d++){b.eq(d).prop("checked",l)
}}TS.msg_edit.$last_clicked_cb=j=c;
var f="0 messages";
var k=$("#msgs_div").find(".msg_select_cb:checked");
$("#msgs_div").find(".multi_delete_mode").removeClass("multi_delete_mode");
if(k.length){if(k.length==1){f="1 message"
}else{f=k.length+" messages"
}$("#batch_delete_button").removeClass("disabled");
k.each(function(){$(this).closest(".message").addClass("multi_delete_mode")
})
}else{$("#batch_delete_button").addClass("disabled")
}$("#batch_delete_count_span").html(f)
},selectAllBatchDelete:function(){$("#msgs_div").find(".msg_select_cb:visible").prop("checked",true);
TS.msg_edit.batchDeleteSelectionChanged()
},selectNoneBatchDelete:function(){$("#msgs_div").find(".msg_select_cb:visible").prop("checked",false);
TS.msg_edit.batchDeleteSelectionChanged()
}});
var a=function(b){return(TS.model.archive_view_is_showing&&b._archive_msgs)?b._archive_msgs:b.msgs
}
})();
(function(){TS.registerModule("generic_dialog",{div:null,is_showing:false,default_setting:{title:"",body:"BODY",body_template:null,show_go_button:true,show_secondary_go_button:false,show_cancel_button:true,go_button_text:"OK",go_button_class:"",secondary_go_button_text:"OK 2",secondary_go_button_class:"",cancel_button_text:"Cancel",on_go:null,on_secondary_go:null,on_cancel:null,on_end:null,show_throbber:false,esc_for_ok:false,on_show:null,force_small:false,enter_always_gos:false,fullscreen:false},current_setting:null,body_template_html:{},Q:[],onStart:function(){TS.generic_dialog.body_template_html.generic_dialog_sample=TS.templates.generic_dialog_sample()
},onKeydown:function(a){var b=TS.generic_dialog.current_setting;
if(a.which==TS.utility.keymap.enter){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"||b.enter_always_gos){if(b.show_go_button){TS.generic_dialog.go();
a.preventDefault()
}}}else{if(a.which==TS.utility.keymap.esc){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){if(b.show_cancel_button){TS.generic_dialog.cancel()
}else{if(b.esc_for_ok){TS.generic_dialog.go()
}}}}}},alert:function(a,b){TS.generic_dialog.start({title:b||"",body:a,show_cancel_button:false,esc_for_ok:true,fullscreen:false})
},start:function(c){if(c.fullscreen){TS.ui.fs_modal.start(c);
return
}if(TS.generic_dialog.is_showing){if(c.unique&&TS.generic_dialog.current_setting.unique==c.unique){TS.info("redundant generic dialog not Qed: "+c.unique)
}else{TS.generic_dialog.Q.push(c)
}return
}var e=TS.generic_dialog.current_setting=$.extend(TS.utility.clone(TS.generic_dialog.default_setting),c);
if(typeof c.show_close_button==="undefined"){e.show_close_button=e.show_cancel_button
}if(!TS.generic_dialog.div){TS.generic_dialog.build()
}var d=TS.generic_dialog.div;
var a=e.body;
if(e.body_template){if(TS.generic_dialog.body_template_html[e.body_template]){a=TS.generic_dialog.body_template_html[e.body_template];
if(e.body){TS.warn("both body and body_template were passed on settings, using body_template")
}}else{TS.error(e.body_template+" not found in TS.generic_dialog.body_template_html")
}}var b=TS.templates.generic_dialog({title:e.title,body:a});
d.empty();
d.html(b);
d.find(".close").bind("click",function(){if(e.show_cancel_button){TS.generic_dialog.cancel()
}else{if(e.esc_for_ok){TS.generic_dialog.go()
}}});
d.find(".dialog_go").click(TS.generic_dialog.go);
d.find(".dialog_go").html(e.go_button_text);
if(e.show_go_button){d.find(".dialog_go").removeClass("hidden").addClass(e.go_button_class)
}else{d.find(".dialog_go").addClass("hidden")
}d.find(".dialog_secondary_go").click(TS.generic_dialog.secondary_go);
d.find(".dialog_secondary_go").html(e.secondary_go_button_text);
if(e.show_secondary_go_button){d.find(".dialog_secondary_go").removeClass("hidden").addClass(e.secondary_go_button_class)
}else{d.find(".dialog_secondary_go").addClass("hidden")
}d.find(".dialog_cancel").click(TS.generic_dialog.cancel);
d.find(".dialog_cancel").html(e.cancel_button_text);
d.find(".dialog_cancel").toggleClass("hidden",!e.show_cancel_button);
d.find(".close").toggleClass("hidden",!e.show_close_button);
if(e.show_throbber){d.find(".throbber").removeClass("hidden")
}else{d.find(".throbber").addClass("hidden")
}if(e.title){d.find(".modal-header").removeClass("hidden")
}else{d.find(".modal-header").addClass("hidden")
}if(!e.show_go_button&&!e.show_secondary_go_button&&!e.show_cancel_button){d.find(".modal-footer").addClass("hidden")
}else{d.find(".modal-footer").removeClass("hidden")
}d.modal("show");
if(e.title||e.force_small){d.removeClass("small")
}else{d.addClass("small");
d.css("margin-left",-d.width()/2)
}if(document.activeElement&&document.activeElement!=document.body){document.activeElement.blur()
}if(e.on_show){e.on_show()
}},go:function(){if(!TS.generic_dialog.is_showing){TS.error("not showing?");
return
}var b=TS.generic_dialog.current_setting;
var a=TS.generic_dialog.div;
if(b.on_go){if(b.on_go()!==false){a.modal("hide")
}}else{a.modal("hide")
}},secondary_go:function(a){if(!TS.generic_dialog.is_showing){TS.error("not showing?");
return
}var c=TS.generic_dialog.current_setting;
var b=TS.generic_dialog.div;
if(c.on_secondary_go){if(c.on_secondary_go(a)!==false){b.modal("hide")
}}else{b.modal("hide")
}},cancel:function(){var a=TS.generic_dialog.current_setting;
TS.generic_dialog.div.modal("hide");
if(a.on_cancel){a.on_cancel()
}},end:function(){var b=TS.generic_dialog.current_setting;
TS.generic_dialog.is_showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.generic_dialog.onKeydown);
TS.generic_dialog.div.empty();
if(b.on_end){b.on_end()
}if(!TS.generic_dialog.is_showing&&TS.generic_dialog.Q.length){var a=TS.generic_dialog.Q.shift();
TS.generic_dialog.start(a)
}},build:function(){$("body").append('<div id="generic_dialog" class="modal hide fade" data-keyboard="false" data-backdrop="static"></div>');
var a=TS.generic_dialog.div=$("#generic_dialog");
a.on("hidden",function(b){if(b.target!=this){return
}setTimeout(function(){TS.generic_dialog.end()
},200)
});
a.on("show",function(b){if(b.target!=this){return
}TS.generic_dialog.is_showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}setTimeout(function(){if(!TS.generic_dialog.is_showing){return
}a.find(".title_input").select();
$(window.document).bind("keydown",TS.generic_dialog.onKeydown)
},100)
})
}})
})();
(function(){TS.registerModule("ui.fs_modal",{is_showing:false,onStart:function(){},start:function(r){if(r){h=$.extend(TS.utility.clone(d),r)
}else{h=d
}if(typeof h.show_close_button==="undefined"){h.show_close_button=h.show_cancel_button
}TS.ui.fs_modal.is_showing=true;
if(!f){a()
}if(h.modal_class){f.find(".contents_container").addClass(h.modal_class)
}c=f.find(".contents");
var p;
if(h.body_template_html){p=h.body_template_html;
if(h.body){TS.warn("Both body and body_template_html were passed in settings to TS.ui.fs_modal.start(). Using body_template.")
}}else{p=TS.templates.fs_modal_generic_contents({settings:h})
}c.html(p);
f.on("click",".dialog_go",n);
f.on("click",".dialog_secondary_go",b);
f.on("click",".dialog_cancel",e);
$(window.document).on("keydown.fs_modal",k);
l.on("click",function(){if(h.show_cancel_button){e()
}else{if(h.esc_for_ok){n()
}}});
l.toggleClass("hidden",!h.show_close_button);
$("html").addClass("fs_modal_active");
setTimeout(function(){g.addClass("active");
f.addClass("active")
},0);
if(f.find("input").length){f.find("input").first().focus()
}else{if(document.activeElement&&document.activeElement!==document.body){document.activeElement.blur()
}}if(h.on_show){h.on_show()
}if(h.on_show_complete){var o=false;
var s=m();
var q=setTimeout(function(){o=true;
h.on_show_complete();
f.off(s+".fs_modal_show_complete")
},600);
f.one(s+".fs_modal_show_complete",function(){if(!o){clearTimeout(q);
h.on_show_complete()
}})
}document.activeElement.blur()
},close:function(){e()
},bindBackButton:function(o){$("#fs_modal_back_btn").off("click.fs_modal").on("click.fs_modal",o)
},unbindBackButton:function(){$("#fs_modal_back_btn").off("click.fs_modal")
},showBackButton:function(o){$("#fs_modal_back_btn").removeClass("hidden")
},hideBackButton:function(o){$("#fs_modal_back_btn").addClass("hidden")
}});
var f;
var g;
var l;
var c;
var j=250;
var h=null;
var d={title:"",body:"",body_template_html:null,show_go_button:true,show_secondary_go_button:false,show_cancel_button:true,go_button_text:"OK",go_button_class:"",secondary_go_button_text:"OK 2",secondary_go_button_class:"",cancel_button_text:"Cancel",on_go:null,on_secondary_go:null,on_cancel:null,on_end:null,esc_for_ok:false,on_show:null,enter_always_gos:false,fullscreen:false,modal_class:null};
var a=function(){var o=$(TS.templates.fs_modal());
$("body").append(o);
g=$("#fs_modal_bg");
f=$("#fs_modal");
l=$("#fs_modal_close_btn")
};
var n=function(){if(!TS.ui.fs_modal.is_showing){TS.error("not showing?");
return
}if(h.on_go){if(h.on_go()!==false){e()
}}else{e()
}};
var b=function(o){if(!TS.ui.fs_modal.is_showing){TS.error("not showing?");
return
}if(h.on_secondary_go){if(h.on_secondary_go()!==false){e()
}}else{e()
}};
var k=function(o){if(o.which==TS.utility.keymap.enter&&(TS.utility.getActiveElementProp("NODENAME")=="BODY"||h.enter_always_gos)){if(h.show_go_button){n();
o.preventDefault()
}}else{if(o.which==TS.utility.keymap.esc&&TS.utility.getActiveElementProp("NODENAME")=="BODY"&&h.show_close_button){if(h.esc_for_ok){n()
}else{e()
}}}};
var e=function(){f.removeClass("active");
g.removeClass("active");
setTimeout(function(){$("html").removeClass("fs_modal_active")
},j);
if(h.on_cancel){h.on_cancel()
}i()
};
var i=function(){TS.ui.fs_modal.is_showing=false;
setTimeout(function(){if(!TS.ui.fs_modal.is_showing){f.find(".contents_container").html('<div class="contents"></div>')
}if(h.modal_class){f.find(".contents_container").removeClass(h.modal_class)
}},j);
TS.ui.fs_modal.unbindBackButton();
TS.ui.fs_modal.hideBackButton();
$(window.document).off("keydown.fs_modal").off("resize.fs_modal");
f.off("click");
l.off("click");
c=null;
if(h.on_end){h.on_end()
}};
var m=function(){var p={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",transition:"transitionend"};
for(var o in p){if(f[0].style[o]!==undefined){return p[o]
}}}
})();
(function(){TS.registerModule("ui.admin_invites",{invites_sent_sig:new signals.Signal(),emails_parsed_sig:new signals.Signal(),onStart:function(){TS.ui.admin_invites.invites_sent_sig.add(u,TS.ui.admin_invites);
TS.ui.admin_invites.emails_parsed_sig.add(k,TS.ui.admin_invites);
TS.team.team_email_domain_changed_sig.add(h,TS.ui.admin_invites);
TS.prefs.team_auth_mode_changed_sig.add(p,TS.ui.admin_invites);
TS.prefs.team_sso_auth_restrictions_changed_sig.add(p,TS.ui.admin_invites);
if(TS.web){TS.web.login_sig.add(TS.ui.admin_invites.onLogin,TS.ui.admin_invites)
}if(TS.client){TS.client.login_sig.add(TS.ui.admin_invites.onLogin,TS.ui.admin_invites)
}d=TS.storage.fetchInvitesState();
$("body").on("click",'[data-action="admin_invites_modal"]',function(){o($(this).data("account-type"))
})
},onLogin:function(){h()
},start:function(){if(TS.model.user.is_admin){o()
}},switchToPicker:function(){if(TS.model.user.is_admin){K()
}},maybeShowInviteLink:function(){if(!TS.client){return
}var M=false;
var N=false;
var L=false;
if(TS.model.user.is_admin&&TS.members.getActiveMembersWithSelfAndNotSlackbot().length<26){M=true
}if(TS.model.user.is_admin&&TS.members.getActiveMembersExceptSelfAndSlackbot().length===0){N=true
}if(TS.model.user.is_admin&&TS.members.getActiveMembersWithSelfAndNotSlackbot().length>=2){L=true
}$("#channel_list_invites_link_label").toggleClass("hidden",!N);
$("#channel_list_invites_link").toggleClass("hidden",!M).toggleClass("dim",L)
},populateInvites:function(M){if(!TS.model.user.is_admin){return
}if(!M){return
}var L=d.reduce(function(O,N){O[N.email]=true;
return O
},{});
M.forEach(function(N){if(!L[N.email]){L[N.email]=true;
d.push(N)
}});
TS.storage.storeInvitesState(d);
if(d.length&&TS.ui.fs_modal.is_showing){A.find(".admin_invite_row").remove();
d.forEach(function(N){a(N)
})
}}});
var A;
var H=0;
var e=0;
var g=[];
var v=[];
var d=[];
var i="name@domain.com";
var z=i;
var E="";
var w={invalid_email:"That doesn't look like a valid email address!",already_in_team:"This person is already on your team.",already_invited:"This person has already been invited to your team.",sent_recently:"This person was recently invited. No need to invite them again just yet.",invite_failed:"Something went wrong with this invite :(",ura_limit_reached:"You've reached your team limit for Single-channel Guests. You must invite more paid team members first.",user_limit_reached:"You've reached the maximum number of users for this team.",not_allowed:"You can't invite this type of account based on your current SSO settings.",domain_mismatch:"Your SSO settings prevent you from inviting people from this email domain."};
var o=function(N){var L=TS.templates.admin_invite_modal({can_add_ura:TS.boot_data.can_add_ura,team_has_paid:TS.model.team.plan!=="",team_name:TS.model.team.name,hide_full_member_option:TS.model.team.prefs.auth_mode=="saml"&&(TS.model.team.prefs.sso_auth_restrictions===0||TS.model.team.prefs.sso_auth_restrictions===1),team_signup_url:"https://"+TS.model.team.domain+".slack.com/signup"});
var M={body_template_html:L,on_show:J,on_cancel:c};
if(TS.client){TS.ui.a11y.saveCurrentFocus()
}TS.ui.fs_modal.start(M);
if(N){setTimeout(function(){F(N)
},0)
}};
var J=function(){A=$("#admin_invites_container");
A.find("#admin_invites_switcher").find('[data-action="switch_type"]').on("click",function(M){var L=$(M.target);
if(L.is("a")){return
}if(L.closest(".admin_invites_account_type_option").hasClass("disabled")){return
}F($(this).data("account-type"))
});
A.find('[data-action="admin_invites_add_row"]').on("click",a);
A.find('a[data-action="admin_invites_switch_view"]').on("click",function(){n($(this).data("view"))
});
A.find('button[data-action="api_send_invites"]').on("click",function(L){L.preventDefault();
r()
});
A.find('[data-action="open_switcher"]').on("click",function(){K()
});
A.find('button[data-action="api_parse_emails"]').on("click",function(L){L.preventDefault();
b();
$(this).find(".ladda-label").text("Processing email addresses ...")
});
A.find("#bulk_emails").css("overflow","hidden").autogrow();
d=TS.storage.fetchInvitesState();
if(d.length){TS.ui.admin_invites.populateInvites(d)
}else{a()
}};
var c=function(){H=0;
e=0;
d=v.length?[]:D();
g=[];
v=[];
TS.storage.storeInvitesState(d);
if(TS.client){TS.ui.a11y.restorePreviousFocus()
}};
var h=function(){z=i
};
var a=function(M){var N=true;
if(A.find(".admin_invite_row").length===0){N=false
}else{A.find(".admin_invite_row").first().find(".delete_row").removeClass("hidden")
}A.find("#invite_rows").append(TS.templates.admin_invite_row({index:H,show_delete_btn:N,placeholder_email_address:z}));
var L=A.find("#invite_"+H);
L.find('[data-action="admin_invites_delete_row"]').on("click",function(){I(L)
}).hover(function(){L.addClass("delete_highlight")
},function(){L.removeClass("delete_highlight")
});
if(M){L.find('[name="email_address"]').val(M.email);
L.find('[name="first_name"]').val(M.first_name);
L.find('[name="last_name"]').val(M.last_name)
}m();
H++
};
var I=function(L){if(!L||!L.length){return
}L.slideToggle(100,function(){L.remove();
var M=$(".admin_invite_row").length;
if(M===0){a()
}else{if(M===1){A.find(".admin_invite_row").first().find(".delete_row").addClass("hidden")
}}m()
})
};
var m=function(){var N=$(".admin_invite_row").length;
var L="Invite "+N+" ";
var M=$("#account_type").val();
if(M=="full"){if(N===1){L+="Person"
}else{L+="People"
}}else{if(M=="restricted"){L+="Restricted Account";
if(N>1){L+="s"
}}else{if(M=="ultra_restricted"){L+="Single-Channel Guest";
if(N>1){L+="s"
}if($("#ultra_restricted_channel_picker").val()){L+=" to "+$("#ultra_restricted_channel_picker")[0].options[$("#ultra_restricted_channel_picker")[0].selectedIndex].text
}}}}A.find('button[data-action="api_send_invites"]').find(".ladda-label").text(L)
};
var p=function(){var M=A.find("#account_type").val();
var L=false;
var O=false;
if((TS.model.team.prefs.auth_mode=="google"||TS.model.team.prefs.auth_mode=="saml")&&TS.model.team.prefs.sso_auth_restrictions===0){O=true
}if(TS.model.team.prefs.auth_mode=="google"){if(M=="full"&&(TS.model.team.prefs.sso_auth_restrictions===0||TS.model.team.prefs.sso_auth_restrictions===1)){L=true
}else{if((M=="restricted"||M=="ultra_restricted")&&TS.model.team.prefs.sso_auth_restrictions===0){L=true
}}}else{if(TS.model.team.prefs.auth_mode=="saml"){if(TS.model.team.prefs.sso_auth_restrictions===0||TS.model.team.prefs.sso_auth_restrictions===1){if(M=="full"){var N=TS.templates.admin_invite_switcher({can_add_ura:TS.boot_data.can_add_ura,team_has_paid:TS.model.team.plan!=="",hide_full_member_option:TS.model.team.prefs.auth_mode=="saml"&&(TS.model.team.prefs.sso_auth_restrictions===0||TS.model.team.prefs.sso_auth_restrictions===1),team_signup_url:"https://"+TS.model.team.domain+".slack.com/signup"});
$("#admin_invites_switcher").html(N);
K()
}}}}$("#google_auth_email_domain_notice").toggleClass("hidden",!L);
$("#sso_signup_notice").toggleClass("hidden",!O)
};
var t=function(M){var L;
A.find('input[name="email_address"]').each(function(){if($(this).val()==M){L=$(this).closest(".admin_invite_row")
}});
return L
};
var j=function(L,M){var N=w[M];
if(L){L.find("label.email").addClass("error").end().find(".error_msg").removeClass("hidden").text(N).end().find("input").prop("disabled",false)
}};
var q=function(L){if(L){L.find("label.email").removeClass("error").end().find(".error_msg").addClass("hidden").end().find("input").prop("disabled",false)
}};
var s=function(){setTimeout(function(){Ladda.stopAll();
A.find(".admin_invite_row").remove();
g=[];
v=[];
m();
a()
},0)
};
var y=function(){setTimeout(function(){Ladda.stopAll();
A.find('button[data-action="api_parse_emails"]').find(".ladda-label").text("Add Invitees");
A.find("#bulk_emails").prop("disabled",false)
},0)
};
var K=function(){A.find("#admin_invites_header").removeClass("cursor_pointer").find(".admin_invites_header_type").removeClass("normal").text("people").end().find(".admin_invites_header_team_name").removeClass("hidden");
A.find("#admin_invites_switcher").removeClass("hidden");
A.find("#admin_invites_workflow").addClass("hidden");
TS.ui.fs_modal.hideBackButton()
};
var n=function(L){if(L=="individual"){A.find("#individual_invites").removeClass("hidden");
A.find("#bulk_invites, #bulk_notice").addClass("hidden");
A.find("#bulk_emails").val("");
A.find(".email_field").first().focus();
y()
}else{if(L=="bulk"){A.find("#bulk_invites").removeClass("hidden");
A.find("#individual_invites").addClass("hidden");
var M=A.find('button[data-action="api_parse_emails"]');
if(!M.hasClass("ladda")){Ladda.bind('button[data-action="api_parse_emails"]');
M.addClass("ladda")
}M.find(".ladda-label").text("Add Invitees");
var N=D();
if(N){var O="";
$.each(N,function(Q,P){if(P.first_name){O+=P.first_name+" "
}if(P.last_name){O+=P.last_name+" "
}O+="<"+P.email+">, "
});
A.find("#bulk_emails").val(O).autogrow()
}A.find("#bulk_emails").focus()
}}};
var F=function(P){var L=TS.channels.getUnarchivedChannelsForUser();
TS.boot_data.default_channels.forEach(function(Q){L.forEach(function(R){if(R.id==Q.id){R.is_default=true
}})
});
var O=TS.templates.admin_invite_channel_picker({invite_type:P,channels:L,default_channels:TS.boot_data.default_channels,general_name:TS.channels.getGeneralChannel().name,groups:TS.groups.getUnarchivedGroups(),email_domains:TS.model.team.email_domain.split(",")});
var N="Full Members";
if(P=="restricted"){N="Restricted Accounts"
}else{if(P=="ultra_restricted"){N="Single-Channel Guests"
}}A.find("#admin_invites_header").addClass("cursor_pointer").find(".admin_invites_header_type").addClass("normal").text(N).end().find(".admin_invites_header_team_name").addClass("hidden");
A.find("#admin_invites_channel_picker_container").html(O);
A.find("#account_type").val(P);
A.find("#admin_invites_switcher, #admin_invites_workflow").toggleClass("hidden");
A.find("#admin_invites_billing_notice").toggleClass("hidden",!(TS.model.team.plan!==""&&P!="ultra_restricted"));
A.find("#ultra_restricted_channel_picker").on("change",m);
A.find(".email_field").first().focus();
var M=A.find('button[data-action="api_send_invites"]');
if(!M.hasClass("ladda")){Ladda.bind('button[data-action="api_send_invites"]');
M.addClass("ladda")
}m();
p();
if(TS.boot_data.feature_filter_select_component){A.find("#defaultchannelsmulti, #ultra_restricted_channel_picker").filterSelect().addClass("hidden")
}else{A.find("#defaultchannelsmulti, #ultra_restricted_channel_picker").chosen({optional_prefix:"#"})
}A.find("#defaultchannelsmulti_chzn").css("width","100%");
A.find("#defaultchannelsmulti_chzn input").attr("style","width: 100% !important");
TS.ui.fs_modal.bindBackButton(TS.ui.admin_invites.switchToPicker);
TS.ui.fs_modal.showBackButton()
};
var D=function(){var O=[];
var M,N,L;
A.find(".admin_invite_row").each(function(){M=$.trim($(this).find('[name="email_address"]').val());
N=$.trim($(this).find('[name="first_name"]').val());
L=$.trim($(this).find('[name="last_name"]').val());
if(M){var P={};
P.email=M;
if(N){P.first_name=N
}if(L){P.last_name=L
}O.push(P)
}else{if($(".admin_invite_row").length>1){I($(this))
}}});
d=O;
TS.storage.storeInvitesState(d);
return O
};
var r=function(){var M=false;
A.find(".admin_invite_row").each(function(){var Q=$.trim($(this).find('[name="email_address"]').val());
if(Q){if(!TS.utility.email_regex.test(Q)){j($(this),"invalid_email");
M=true
}else{q($(this))
}}else{if($(".admin_invite_row").length>1){I($(this))
}}});
if(M){setTimeout(Ladda.stopAll,0);
return
}var N=D();
if(!N.length){A.find("#invite_notice").html('<i class="ts_icon ts_icon_info_circle"></i> Add at least one email address before sending invitations.').slideDown(100);
setTimeout(Ladda.stopAll,0)
}else{if(N){A.find(".admin_invite_row").find("input").prop("disabled",true);
var P=A.find("#account_type").val();
var L;
if(P=="full"||P=="restricted"){var O=A.find("#defaultchannelsmulti").val();
if(O){L=O.join(",")
}}else{if(P=="ultra_restricted"){L=A.find("#ultra_restricted_channel_picker").val()
}}e=N.length;
$.each(N,function(S,Q){var R={email:Q.email};
if(L){R.channels=L
}if(Q.first_name){R.first_name=Q.first_name
}if(Q.last_name){R.last_name=Q.last_name
}if(P=="restricted"){R.restricted=1
}else{if(P=="ultra_restricted"){R.ultra_restricted=1
}}TS.api.call("users.admin.invite",R,l)
})
}}};
var l=function(O,P,N){if(O){g.push({email:N.email,first_name:N.first_name,last_name:N.last_name});
var L=t(N.email);
I(L)
}else{if(P.error=="requires_channel"){setTimeout(Ladda.stopAll,0);
A.find("#ra_channel_picker_header").highlightText();
A.find("#invite_notice").html('<i class="ts_icon ts_icon_info_circle"></i> Pick at least one '+TS.templates.builders.channelOrPrivateGroupCopy()+" before inviting Restricted Accounts.").slideDown(100);
A.find(".admin_invite_row").find("input").prop("disabled",false);
return
}else{if(P.error=="requires_one_channel"){setTimeout(Ladda.stopAll,0);
A.find("#ura_channel_picker_header").highlightText();
A.find("#invite_notice").html('<i class="ts_icon ts_icon_info_circle"></i> Pick a '+TS.templates.builders.channelOrPrivateGroupCopy()+" before inviting Single-Channel Guests.").slideDown(100);
A.find(".admin_invite_row").find("input").prop("disabled",false);
return
}else{v.push({email:N.email,error:P.error,error_msg:w[P.error]})
}}}e--;
if(e===0){d=[];
TS.storage.storeInvitesState(d);
var M=function(){setTimeout(Ladda.stopAll,0);
TS.ui.admin_invites.invites_sent_sig.dispatch()
};
E=x(g);
if(E){TS.api.call("team.checkEmailDomains",{email_domains:E}).then(function(Q){if(Q.data.ok){E=Q.data.email_domains
}else{E=""
}},function(Q){E=""
}).lastly(M)
}else{M()
}}};
var u=function(){var Q=$("#account_type").val();
var M;
var L=g.length>1?"s":"";
if(Q=="full"){M="<strong>"+g.length+" Full Member"+L+"</strong>"
}else{if(Q=="restricted"){M="<strong>"+g.length+" Restricted Account"+L+"</strong>"
}else{if(Q=="ultra_restricted"){M="<strong>"+g.length+" Single-Channel Guest"+L+"</strong>"
}}}var O=TS.templates.admin_invite_summary({success_invites_html:M,success_invites:g,error_invites:v,team_name:TS.model.team.name,domains:E,paid_team:""!==TS.model.team.plan});
A.find("#invite_notice").slideUp(100);
A.find("#admin_invites_workflow, #admin_invites_header").addClass("hidden");
A.find("#admin_invites_success").html(O).removeClass("hidden");
function N(){s();
$("#admin_invites_workflow, #admin_invites_success").toggleClass("hidden");
$("#admin_invites_header").removeClass("hidden");
TS.ui.fs_modal.bindBackButton(TS.ui.admin_invites.switchToPicker)
}A.find('button[data-action="admin_invites_reset"]').on("click",N);
TS.ui.fs_modal.bindBackButton(N);
A.find('button[data-action="admin_invites_try_again"]').on("click",function(){$.each(v,function(T,S){var R=t(S.email);
j(R,S.error)
});
$("#admin_invites_workflow, #admin_invites_success").toggleClass("hidden");
$("#admin_invites_header").removeClass("hidden");
TS.ui.fs_modal.bindBackButton(TS.ui.admin_invites.switchToPicker);
g=[];
v=[]
});
if(f()){var P=A.find('button[data-action="add_signup_domains"]').on("click",G);
A.on("keyup","#invite_signup_domains",TS.ui.resetButtonSpinner.bind(Object.create(null),P.get(0)))
}};
var b=function(){var L=$.trim($("#bulk_emails").val().replace(/[\u200B-\u200D\uFEFF]/g,""));
A.find("#bulk_emails").prop("disabled",true);
TS.api.call("users.admin.parseEmails",{emails:L},C)
};
var C=function(M,N,L){if(!M){TS.error("failed onEmailsParsed");
A.find("#bulk_notice").html('<i class="ts_icon ts_icon_warning"></i> Oops! There was an error processing those emails. Please try again.').removeClass("hidden");
y();
return
}if(N.emails.length===0){A.find("#bulk_notice").html('<i class="ts_icon ts_icon_warning"></i> We couldn\'t find any email addresses in that text. Please try again.').removeClass("hidden");
y();
return
}TS.ui.admin_invites.emails_parsed_sig.dispatch(N.emails)
};
var k=function(M){A.find(".admin_invite_row").remove();
n("individual");
var L;
if(M.length==1){L='<i class="ts_icon ts_icon_check_circle_o_large"></i> We found 1 email address to invite. We\'ve done our best to guess a name. See if it looks right, then press Invite.'
}else{L='<i class="ts_icon ts_icon_check_circle_o_large"></i> We found '+M.length+" email addresses to invite. We've done our best to guess a name for each one. See if everything looks right, then press Invite."
}A.find("#invite_notice").html(L).slideDown(100);
A.find(".admin_invite_row").each(function(){var N=$.trim($(this).find('[name="email_address"]').val());
if(!N){I($(this))
}});
$.each(M,function(O,N){a(N)
});
d=M;
TS.storage.storeInvitesState(d)
};
var f=function(){return TS.model.user.is_owner&&TS.model.team.prefs.auth_mode=="normal"
};
var x=function(M){if(!f()){return""
}var L=M.map(function(O){return O.email.split("@")[1]
});
if(TS.model.team.email_domain){var N=TS.model.team.email_domain.split(",").reduce(function(O,P){O[P]=true;
return O
},{});
L=L.filter(function(O){return !N[O]
})
}return L.join(", ")
};
var B=function(L){if(!L){return L
}var M=L.split(",").reduce(function(N,O){N[O]=true;
return N
},{});
return Object.keys(M).join(",")
};
var G=function(N){TS.ui.startButtonSpinner(A.find('button[data-action="add_signup_domains"]').get(0));
var L=A.find("#invite_signup_domains").val();
if(TS.model.team.email_domain){L=[TS.model.team.email_domain,L].join(",")
}L=B(L);
var M={prefs:JSON.stringify({signup_mode:"email",signup_domains:L})};
TS.api.call("team.prefs.set",M).then(function(O){TS.ui.stopButtonSpinner(A.find('button[data-action="add_signup_domains"]').get(0),true);
TS.model.team.email_domain=O.data.prefs.signup_domains
},function(O){TS.ui.stopButtonSpinner(A.find('button[data-action="add_signup_domains"]').get(0),false);
var P="Sorry! Something went wrong. Please try again.";
if(O.data.error==="signup_domains_missing"){P="Please enter a domain"
}else{if(O.data.error==="bad_domain"){P="Sorry! You can't use "+O.data.domain+"."
}else{if(O.data.error==="invalid_domain"){P="Hmm, this doesn't look like a domain! Check for typos?"
}}}$("#invite_signup_domains").focus().tooltip({title:P,trigger:"manual"}).tooltip("show").on("blur",function(){$(this).tooltip("destroy")
})
})
}
})();
(function(){TS.registerModule("ui.admin_edit_team_profile",{onStart:function(){if(TS.web){TS.web.login_sig.add(TS.ui.admin_edit_team_profile.onLogin,TS.ui.admin_edit_team_profile)
}if(TS.client){TS.client.login_sig.add(TS.ui.admin_edit_team_profile.onLogin,TS.ui.admin_edit_team_profile)
}$("body").on("click",'[data-action="edit_team_profile_modal"]',TS.ui.admin_edit_team_profile.start)
},onLogin:function(){},start:function(){if(q()){u()
}}});
var C;
var B=[];
var u=function(){var N=TS.templates.admin_edit_team_profile_modal();
var O={body_template_html:N,on_show:K,on_cancel:c,modal_class:"stretch_vertically"};
TS.ui.fs_modal.start(O)
};
var K=function(){C=$("#edit_team_profile_container");
C.find("#edit_team_profile_list_scroller").monkeyScroll();
a();
C.on("click",'[data-action="edit_team_profile_to_custom"]',k);
C.on("click",'[data-action="edit_team_profile_to_add"]',f);
C.on("click",'[data-action="edit_team_profile_to_edit"]',L);
C.on("click",'[data-action="edit_team_profile_to_hide"]',o);
C.on("click",'[data-action="edit_team_profile_to_delete"]',v);
C.on("click",'[data-action="edit_team_profile_cancel"]',a);
C.on("click",'[data-action="edit_team_profile_confirm_edit"]',A);
C.on("click",'[data-action="edit_team_profile_confirm_hide"]',x);
C.on("click",'[data-action="edit_team_profile_confirm_delete"]',d);
C.on("click",'[data-action="edit_team_profile_remove_option"]',D);
C.on("click",'[data-action="edit_team_profile_add_option"]',l);
C.on("focusin",'[data-action="edit_team_profile_update_preview_label"], [data-action="edit_team_profile_update_preview_hint"], .option_header_row + .option_row [data-action="edit_team_profile_update_preview_option"]',b);
C.on("focusout",'[data-action="edit_team_profile_update_preview_label"], [data-action="edit_team_profile_update_preview_hint"], .option_header_row + .option_row [data-action="edit_team_profile_update_preview_option"]',i);
C.on("keyup",'[data-action="edit_team_profile_update_preview_label"], [data-action="edit_team_profile_update_preview_hint"], .option_header_row + .option_row [data-action="edit_team_profile_update_preview_option"]',F);
C.on("click",'[data-action="edit_team_profile_list_menu"]',E)
};
var c=function(){g(true);
C=null
};
var y=function(O,N){if(!O){return
}TS.api.call(O,N).then(function(P){if(TS.web){TS.team.upsertTeam(P.data)
}if(N.resolve){N.resolve()
}},function(P){if(N.reject){N.reject()
}})
};
var d=function(N){};
var x=function(N){j(N,true)
};
var t=function(N){j(N,false)
};
var j=function(Q,O){var N=$(Q.target);
var R=N.data("id");
if(!R){N=N.closest("[data-id]")
}R=N.data("id");
if(!R){return
}var P=TS.team.getTeamProfileFieldById(R);
if(!P){return
}P.options=P.options||{};
P.options.is_hidden=O;
G("team.profile.set",[P],function(){a();
H(R);
Ladda.stopAll()
})
};
var A=function(Q){var R=C.find("#edit_team_profile_edit");
if(!TS.ui.validation.validate(R,{quiet:true,fast:true})){TS.ui.validation.validate(R);
Ladda.stopAll();
return
}var V=$(Q.target);
var O=V.data("id");
if(!O){V=V.closest("[data-id], [data-type]")
}O=V.data("id");
var S=C.find('input[name="label"]');
var P=C.find('input[name="hint"]');
var T=TS.team.getTeamProfileFieldById(O)||{};
var N=JSON.stringify(T);
T.type=T.type||V.data("type")||"text";
T.label=S.val();
T.hint=P.val();
T.ordering=T.ordering!==undefined?T.ordering:TS.team.getVisibleTeamProfileFields().length;
if(T.type==="options_list"){T.possible_values=C.find('input[name^="option_"]').map(function(){return $(this).val()
}).toArray()
}function U(){a();
H(O);
Ladda.stopAll()
}if(JSON.stringify(T)==N){U()
}else{G("team.profile.set",[T],U)
}};
var G=function(R,N,Q,P){N=N&&N.length?N:TS.model.team.profile.fields;
var O={resolve:Q||$.noop,reject:P||$.noop,profile:JSON.stringify({fields:N})};
y(R,O)
};
var a=function(){B.length=0;
B.push({back:a});
var P={};
P.team_profile_fields=z();
P.hidden_team_profile_fields=J();
var N=TS.templates.admin_edit_team_profile_list(P);
C.find("#edit_team_profile_header").text("Team profile fields");
var O;
if(TS.model.team.profile&&TS.model.team.profile.fields.length===50){O='<div class="alert alert_info"><i class="ts_icon ts_icon_info_circle"></i> You have reached the maximum number of fields that can be added to profiles.</div>'
}else{O="Expand your team's profiles by adding additional fields below"
}C.find("#edit_team_profile_value_note").html(O).removeClass("hidden");
C.find("#edit_team_profile_list").html(N);
n("#edit_team_profile_list");
p();
I();
g(true)
};
var f=function(){B.push({back:f});
var O={};
O.default_team_profile_fields=r();
var N=TS.templates.admin_edit_team_profile_add(O);
C.find("#edit_team_profile_header").text("Select a field type");
C.find("#edit_team_profile_value_note").addClass("hidden");
C.find("#edit_team_profile_add").html(N);
n("#edit_team_profile_add");
I();
g()
};
var k=function(){B.push({back:k});
var N=TS.templates.admin_edit_team_profile_custom();
C.find("#edit_team_profile_header").text("Create a new field");
C.find("#edit_team_profile_value_note").text("Which type of field would you like to create?").removeClass("hidden");
C.find("#edit_team_profile_custom").html(N);
n("#edit_team_profile_custom");
I();
g()
};
var L=function(Q){var O=$(Q.target);
if(O.hasClass("ts_icon_grabby_patty")){return false
}var T=O.data("id");
if(!T){O=O.closest("[data-id], [data-type]")
}T=O.data("id");
var R={};
var S;
if(!T){R.type=O.data("type");
R.label=O.data("label");
var P=R.label||R.type;
S="Customize "+P.replace("_"," ")+" field"
}else{R=TS.team.getTeamProfileFieldById(T);
if(!R){return
}S="Edit "+R.label+" field"
}Q.stopPropagation();
B.push({back:L,event:Q});
var N=TS.templates.admin_edit_team_profile_edit(R);
C.find("#edit_team_profile_header").text(S);
C.find("#edit_team_profile_value_note").addClass("hidden");
C.find("#edit_team_profile_edit").html(N);
n("#edit_team_profile_edit");
M();
h();
Ladda.bind("#edit_team_profile_confirm_edit_btn");
I();
g()
};
var o=function(R){var N=$(R.target);
var T=N.data("id");
if(!T){N=N.closest("[data-id]")
}T=N.data("id");
if(!T){return
}var Q=TS.team.getTeamProfileFieldById(T);
if(!Q){return
}R.stopPropagation();
B.push({back:o,event:R});
var S='Disable "'+Q.label+'"';
C.find("#edit_team_profile_header").text(S);
var O;
var P=TS.team.getTeamProfileFieldUsageCountById(T);
if(P){O="<strong>Are you sure?</strong> "+P+(P==1?" member ":" members ")+"of your team have entered data for this field that will no longer be visible."
}else{O="If you choose to hide this field, it will be unavailable to your team for now. You can always change your mind later."
}C.find("#edit_team_profile_value_note").html(O).removeClass("hidden");
C.find("#edit_team_profile_confirm_hide_btn").data("id",T).get(0).dataset.id=T;
C.find("#edit_team_profile_to_delete_link").data("id",T).get(0).dataset.id=T;
n("#edit_team_profile_hide");
Ladda.bind("#edit_team_profile_confirm_hide_btn");
e();
g()
};
var v=function(Q){var N=$(Q.target);
var S=N.data("id");
if(!S){N=N.closest("[data-id]")
}S=N.data("id");
if(!S){return
}var P=TS.team.getTeamProfileFieldById(S);
if(!P){return
}Q.stopPropagation();
B.push({back:v,event:Q});
var R='Delete "'+P.label+'"';
C.find("#edit_team_profile_header").text(R);
var O="<strong>Are you sure?</strong> All data associated with "+P.label+" will be permanently removed and this <strong>cannot</strong> be undone.";
C.find("#edit_team_profile_value_note").html(O).removeClass("hidden");
C.find("#edit_team_profile_confirm_delete_btn").data("id",S).get(0).dataset.id=S;
n("#edit_team_profile_delete");
Ladda.bind("#edit_team_profile_confirm_delete_btn");
e();
g()
};
var e=function(){C.closest(".contents").addClass("display_flex flex_direction_column").css("height","100vh");
C.css({margin:"auto 0",height:"auto","padding-top":0})
};
var I=function(){C.closest(".contents").removeClass("display_flex flex_direction_column").css("height","");
C.css({margin:"",height:"","padding-top":""})
};
var q=function(){var N=TS.model.user;
if(N&&(N.is_restricted||!N.is_admin||!TS.boot_data.feature_custom_fields)){return false
}if(TS.model.team.prefs.who_can_change_team_profile==="admin"){return N.is_admin
}if(TS.model.team.prefs.who_can_change_team_profile==="owner"){return N.is_owner
}return true
};
var g=function(N){if(N){TS.ui.fs_modal.unbindBackButton();
TS.ui.fs_modal.hideBackButton()
}else{TS.ui.fs_modal.bindBackButton(function(){B.pop();
var O=B.pop();
O.back(O.event)
});
TS.ui.fs_modal.showBackButton()
}};
var M=function(){var N=C.find(".option_row");
if(N.length>=3){return void N.addClass("show_remove_action")
}N.removeClass("show_remove_action")
};
var h=function(){F({target:C.find('.option_header_row + .option_row [data-action="edit_team_profile_update_preview_option"]')})
};
var D=function(N){$(N.target).closest(".row.option_row").remove();
M();
h();
w()
};
var l=function(N){C.find("#option_rows").append(TS.templates.admin_edit_team_profile_option_row({index:C.find(".row.option_row").length}));
M();
w()
};
var w=function(){if(C.find(".row.option_row").length===50){C.find('[data-action="edit_team_profile_add_option"]').addClass("hidden").next().removeClass("hidden")
}else{C.find('[data-action="edit_team_profile_add_option"]').removeClass("hidden").next().addClass("hidden")
}};
var F=function(P){var N=$(P.target);
var O=N.val();
if(O!==undefined&&!O.length){O=N.data("default")
}C.find('.profile_field_preview [data-id="'+N.data("target")+'"]').text(O)
};
var b=function(P){var O=C.find('.profile_field_preview [data-id="'+$(P.target).data("target")+'"]');
var N=O.closest("select");
if(N.length){O=N
}O.addClass("highlight_yellow_bg")
};
var i=function(P){var O=C.find('.profile_field_preview [data-id="'+$(P.target).data("target")+'"]');
var N=O.closest("select");
if(N.length){O=N
}O.removeClass("highlight_yellow_bg")
};
var p=function(){C.find("#edit_team_profile_list").sortable("destroy").sortable({items:".visible_row[data-id]",handle:".ts_icon_grabby_patty",forcePlaceholderSize:true}).on("sortupdate",function(P,O){var N=[];
$(this).find(".row[data-id]").each(function(Q){var R=TS.team.getTeamProfileFieldById($(this).data("id"));
if(R&&R.ordering!=Q){R.ordering=Q;
N.push({id:R.id,ordering:Q})
}});
TS.team.sortTeamProfileFieldsByOrdering();
G("team.profile.reorder",N)
})
};
var E=function(P){P.stopPropagation();
var O=$(P.target).closest("[data-id").get(0);
var N=jQuery.Event("click",{target:O,currentTarget:O});
TS.menu.startWithEditTeamProfileListActions(N,m)
};
var m=function(N){var O=$(N.target).closest("[data-id]");
if(O.is('[data-action="edit_team_profile_to_show"]')){t(N)
}else{if(O.is('[data-action="edit_team_profile_to_hide"]')){o(N)
}else{if(O.is('[data-action="edit_team_profile_to_delete"]')){v(N)
}}}TS.menu.end()
};
var n=function(O){var N=["#edit_team_profile_list","#edit_team_profile_add","#edit_team_profile_custom","#edit_team_profile_edit","#edit_team_profile_hide","#edit_team_profile_delete"].filter(function(P){return P!==O
}).join(", ");
C.find(N).addClass("hidden");
C.find(O).removeClass("hidden")
};
var z=function(){var N=TS.team.getVisibleTeamProfileFields();
return N.length?N:null
};
var J=function(){var N=TS.team.getHiddenTeamProfileFields();
return N.length?N:null
};
var s=function(){return TS.model.team.profile.fields.reduce(function(N,O){N[O.label.toLowerCase()]=true;
return N
},{})
};
var r=function(){var O=s();
var N=[{type:"text",label:"Address"},{type:"date",label:"Birthdate"},{type:"link",label:"Facebook"},{type:"link",label:"Flickr"},{type:"link",label:"GitHub"},{type:"link",label:"Instagram"},{type:"link",label:"LinkedIn"},{type:"text",label:"Manager"},{type:"link",label:"Pinterest"},{type:"link",label:"Skype"},{type:"link",label:"SoundCloud"},{type:"date",label:"Start Date"},{type:"link",label:"Tumblr"},{type:"link",label:"Twitter"},{type:"link",label:"YouTube"}].filter(function(P){return !O[P.label.toLowerCase()]
});
return N.length?N:null
};
var H=function(Q){var N=Q?"[data-id="+Q+"]":".visible_row[data-id]";
var O=C.find("#edit_team_profile_list").find(N).last();
var P=O.outerHeight()*-2;
O.highlight(1500,"",null,0);
O.scrollintoview({duration:200,px_offset:P,direction:"y"})
}
})();
(function(){TS.registerModule("ui.validation",{onStart:function(){$("body").on("keyup.validation paste.validation change.validation blur.validation","[data-validation]",function(p){l($(p.target))
})
},validate:function(r,p){var s=document;
if(r){if(r.is("[data-validation]")){return l(r,p)
}s=r.get(0)
}var q=Array.prototype.slice.call(s.querySelectorAll("[data-validation]"));
if(p&&p.fast){return q.every(function(t){return l($(t),p)
})
}else{return q.reduce(function(t,u){return l($(u),p)&&t
},true)
}}});
var l=function(q,p){var r=f(q).every(function(s){return s(q,p)
});
if(g(q,r,p)){n(q,"Nice, thanks!",3000)
}return r
};
var f=function(q){var p=[];
if(q.prop("required")){p.push(h)
}if(q.attr("minlength")){p.push(b)
}if(q.attr("maxlength")){p.push(m)
}return p
};
var h=function(q,p){if(q.is('input[type="radio"]')){if($(document.querySelectorAll('[name="'+q.prop("name")+'"][data-validation]')).filter(":checked").length){return true
}if(p&&p.quiet){return false
}return void k(q,"Please select an option")
}else{if(q.is('input[type="checkbox"]')){if($(document.querySelectorAll('[name="'+q.prop("name")+'"][data-validation]')).filter(":checked").length){return true
}if(p&&p.quiet){return false
}return void k(q,"Please select at least one option")
}else{if(q.is("select")){if(q.val()){return true
}if(p&&p.quiet){return false
}return void k(q,"Please select an option")
}else{if(q.is("input")||q.is("textarea")){if(q.val()){return true
}if(p&&p.quiet){return false
}return void k(q,"This field can't be empty")
}else{return void TS.error("WTF: cannot validate")
}}}}};
var b=function(q,p){return e(q,"minlength",p)
};
var m=function(q,p){return e(q,"maxlength",p)
};
var e=function(r,q,p){if(r.is('input[type="radio"]')||r.is('input[type="checkbox"]')||r.is("select")){return true
}if(r.is("input")||r.is("textarea")){var t=r.val();
var s=+r.attr(q);
if(t===undefined||isNaN(s)){return void TS.error("WTF: no length to validate")
}if("minlength"===q){if(t.length>=s){return true
}if(p&&p.quiet){return false
}return void d(r,"This field can't be less than "+s+" characters")
}else{if("maxlength"===q){j(r,t.length,s);
if(t.length===s&&!(p&&p.quiet)){d(r,"This field can't be more than "+s+" characters",3000)
}return true
}}}else{return void TS.error("WTF: cannot validate")
}};
var g=function(r,s,q){var p=$(document.querySelector('label[for="'+r.attr("name")+'"]'));
if(!p.length){return
}return !(q&&q.quiet)&&s&&p.data("validation-ephemeral")===false
};
var d=function(q,r,p){a(q,r,"validation_error",p)
};
var k=function(q,r,p){a(q,r,"validation_warning",p)
};
var n=function(q,r,p){a(q,r,"validation_success",p)
};
var a=function(s,t,v,q){var p=$(document.querySelector('label[for="'+s.attr("name")+'"]'));
if(!p.length){return
}var u=p.data("validation-timeout");
clearTimeout(u);
var r=p.find(".validation_message");
if(!r.length){r=$("<span />").addClass("validation_message overflow_ellipsis");
if(s.is("select")){r.insertBefore(p.find("select"))
}else{r.appendTo(p)
}}i(p,v);
r.get(0).title=t;
r.fadeIn(100);
p.data("validation-ephemeral",!!q);
if(q){p.data("validation-timeout",setTimeout(function(){p.removeData("validation-ephemeral").removeData("validation-timeout");
r.fadeOut(100,function(){i(p);
r.remove()
})
},q))
}};
var i=function(p,r){if(p.hasClass(r)){return
}var q=["validation_error","validation_warning","validation_success"].filter(function(s){return s!==r
}).join(" ");
p.addClass(r);
p.removeClass(q)
};
var j=function(q,r,p){if(p-r<=6){c(q,r,p)
}else{o(q)
}};
var c=function(r,t,p){var q=document.querySelector('label[for="'+r.attr("name")+'"]');
if(!q){return
}q.dataset.countdown=[t,p].join("/");
q.classList.add("countdown");
var s=window.getComputedStyle(q,":after");
if(!r.data("countdown-padding-right")){r.data("countdown-padding-right",parseFloat(r.css("padding-right")))
}r.css("padding-right",parseFloat(s.width)+parseFloat(s.right)+r.data("countdown-padding-right"))
};
var o=function(q){var p=document.querySelector('label[for="'+q.attr("name")+'"]');
if(!p){return
}delete p.dataset.countdown;
p.classList.remove("countdown");
q.removeData("countdown-padding-right");
q.css("padding-right","")
}
})();
(function(){TS.registerModule("help",{issues_sorted_sig:new signals.Signal(),issues:[],more_url:null,fake_api_rsps:false,max_title_chars:100,onStart:function(){if(!TS.client){return
}TS.ms.connected_sig.addOnce(function(){TS.api.call("help.issues.list",{},TS.help.onListIssues)
})
},getIssueById:function(c){var a;
for(var b=0;
b<TS.help.issues.length;
b++){a=TS.help.issues[b];
if(a.id==c){return a
}}return null
},onListIssues:function(b,c,a){if(TS.help.fake_api_rsps){TS.help.more_url="/help";
TS.help.issues=[{id:"T00001",title:"issue 1",ts:"1111111111",short_text:"blah blah blah blah blah",state:"resolved"},{id:"T00002",title:"issue 2",ts:"1141111111",short_text:"I think this is ok",state:"open"},{id:"T00003",title:"issue 3",ts:"1121111111",short_text:"but I am not so sure abotu this",state:"unread"},{id:"T00004",title:"issue 4",ts:"1161111111",short_text:"what about that?",state:"open"},{id:"T00005",title:"issue 5",ts:"1151111111",short_text:"fuck it all to hell",state:"open"},{id:"T00006",title:"issue 6",ts:"1171111111",short_text:"MORE BATTRY PLZ",state:"read"},{id:"T00007",title:"issue 7",ts:"1191111111",short_text:"halp",state:"unread"},{id:"T00008",title:"issue 8",ts:"191111111",short_text:"halp",state:"unread"},{id:"T00009",title:"issue 9",ts:"181111111",short_text:"halp",state:"unread"},{id:"T000010",title:"issue 10",ts:"171111111",short_text:"halp halp halp halp halp halp halp halp halp halp ...",state:"unread"}]
}else{if(b){TS.help.issues=c.issues
}}TS.help.sortIssues();
TS.help.updateIcon()
},sortIssues:function(){var c={unread:4,open:3,read:2,resolved:1};
var a;
for(var b=0;
b<TS.help.issues.length;
b++){a=TS.help.issues[b];
a._sorter=parseFloat((c[a.state]||5)+"."+a.ts)
}TS.help.issues.sort(function d(f,e){if(f._sorter<e._sorter){return 1
}if(f._sorter>e._sorter){return -1
}return 0
});
TS.help.issues_sorted_sig.dispatch()
},updateIcon:function(){var e="normal";
var d=0;
var b=0;
var a;
for(var c=0;
c<TS.help.issues.length;
c++){a=TS.help.issues[c];
if(a.state=="unread"){e="unread";
d++
}else{if(a.state=="open"){}}}$("#help_icon").removeClass("normal open unread").addClass(e);
if(d){$("#help_icon_circle_count").text(d)
}else{$("#help_icon_circle_count").text(b)
}$("#flex_menu_toggle").removeClass("normal open unread").addClass(e);
$(".help_icon_circle_count").addClass("hidden");
if(d){$(".help_icon_circle_count").removeClass("hidden").text(d)
}},createIssue:function(b,e){var d=b.title;
var c=b.text;
if(!d){return
}c=c||"";
var a={title:d,text:c};
if(b.tags){a.tags=b.tags
}TS.api.call("help.issues.create",a,function(h,i,g){if(h){}else{if(TS.help.fake_api_rsps){var f={id:Date.now(),title:d,ts:Date.now()/1000,short_text:c.substr(0,50),state:"open"};
setTimeout(function(){TS.ms.handleMsg({type:"issue_created",issue:f})
},2000)
}}if(e){e(h,TS.help.makeErrStr(i))
}})
},fetchIssueDetails:function(c,b){var a=TS.help.getIssueById(c);
if(!a){if(b){b(false,a,"unknown issue")
}return
}TS.api.call("help.issues.info",{id:c},function(e,f,d){var g;
if(TS.help.fake_api_rsps){e=true;
g=TS.utility.clone(a);
g.comments=[{ts:112211111,from:"eeric",text:"comment 1"},{ts:112214444,from:"whoop",text:"comment 2"}]
}else{if(e){g=f.issue
}}TS.help.onIssueChange(g);
if(b){b(e,a,TS.help.makeErrStr(f))
}})
},markIssueRead:function(c,b){var a=TS.help.getIssueById(c);
if(!a){if(b){b(false,"unknown issue")
}return
}if(a.state!="unread"){if(b){b(true)
}return
}TS.api.call("help.issues.markRead",{id:c},function(e,f,d){if(e){}else{if(TS.help.fake_api_rsps){var g=TS.utility.clone(a);
g.state="read";
setTimeout(function(){TS.ms.handleMsg({type:"issue_change",issue:g})
},2000)
}}if(b){b(e,TS.help.makeErrStr(f))
}})
},replyToIssue:function(c,a,b){TS.api.call("help.issues.replyTo",{id:c,text:a},function(e,f,d){if(b){b(e,TS.help.makeErrStr(f),(f&&f.error)?f.error:"")
}})
},markIssueResolved:function(c,b){var a=TS.help.getIssueById(c);
if(!a){if(b){b(false,"unknown issue")
}return
}TS.api.call("help.issues.markResolved",{id:c},function(e,f,d){if(TS.help.fake_api_rsps||(!e&&f&&f.error=="ticket_closed")){e=true;
var g=TS.utility.clone(a);
g.state="resolved";
setTimeout(function(){TS.ms.handleMsg({type:"issue_change",issue:g})
},1000)
}if(b){b(e,TS.help.makeErrStr(f))
}})
},onIssueChange:function(b){var a=TS.help.getIssueById(b.id);
if(a){TS.help.updateIssue(b,a)
}else{TS.help.issues.push(b)
}TS.help.sortIssues();
TS.help.updateIcon()
},updateIssue:function(d,a){for(var b in d){a[b]=d[b]
}if(a.comments){a.comments.sort(function c(f,e){if(f.ts<e.ts){return 1
}if(f.ts>e.ts){return -1
}return 0
})
}},makeErrStr:function(b){if(!b){return"missing data"
}if(b.ok){return null
}if(b.error&&b.info&&TS.model.team.domain=="tinyspeck"){try{return'api error: "'+b.error+'"<br><br><div class="admin-section" style="word-wrap: break-word; word-break: break-word;">api rsp: '+JSON.stringify(b).replace(/\,/g,", ")+"</div>"
}catch(a){}}if(b.error){return'api error: "'+b.error+'"'
}}})
})();
(function(){TS.registerModule("help_dialog",{div:null,showing:false,last_tab:null,last_issue_screen:null,onStart:function(){TS.help.issues_sorted_sig.add(TS.help_dialog.onIssuesSorted);
TS.help_dialog.just_docs=TS.qs_args.just_docs!="0"
},onKeydown:function(a){if(!TS.help_dialog.showing){return
}if(a.which==TS.utility.keymap.enter&&TS.utility.cmdKey(a)){if(TS.utility.getActiveElementProp("id")=="issue_reply_text"){TS.help_dialog.replyToIssue();
a.preventDefault()
}else{if(TS.utility.getActiveElementProp("id")=="issue_new_text"){TS.help_dialog.createIssue();
a.preventDefault()
}}}else{if(a.which==TS.utility.keymap.esc){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"&&TS.help_dialog.last_issue_screen!="new"&&TS.help_dialog.last_issue_screen!="reply"){TS.help_dialog.cancel()
}}}},start:function(c,a){c=c||TS.help_dialog.last_tab;
if(TS.help_dialog.just_docs){if(c=="issues"){c="docs"
}}if(!TS.help_dialog.div){TS.help_dialog.build()
}if(TS.help_dialog.showing){return
}var d=TS.help_dialog.div;
var b=TS.templates.help_dialog({member:TS.model.user,issue_list_html:TS.help_dialog.buildIssueListHTML(),more_url:TS.help.more_url,max_title_chars:TS.help.max_title_chars});
d.empty();
d.html(b);
d.find(".dialog_tabs a").bind("click",function(g){var f=$(this);
d.find(".dialog_tabs a").removeClass("active");
d.find(".dialog_tab_pane").removeClass("active");
f.addClass("active");
$("#"+f.data("pane-id")).addClass("active");
TS.help_dialog.last_tab=f.data("which");
TS.client.ui.updateClosestMonkeyScroller($("#help_docs_scroller"));
TS.client.ui.updateClosestMonkeyScroller($("#help_issues_scroller"));
if(TS.help_dialog.last_tab=="docs"){}else{d.find(".modal-footer").removeClass("hidden")
}});
if(c=="issues"){$("#help_issues_tab").trigger("click")
}else{$("#help_docs_tab").trigger("click")
}$("#help_issues_list").bind("click",function(h){var g=$(h.target);
var f=g.closest(".issue_list_div").data("issue-id");
if(!f){return
}TS.help_dialog.showIssue(f)
});
$("#new_issue_submit_btn").bind("click",TS.help_dialog.createIssue);
$("#new_issue_cancel_btn").bind("click",TS.help_dialog.showIssueList);
$("#new_issue_btn").click(TS.help_dialog.showNewIssueForm);
$("#issue_resolved_btn").bind("click",TS.help_dialog.markIssueResolved);
$("#issue_back_btn").bind("click",TS.help_dialog.showIssueList);
$("#issue_reply_btn").bind("click",TS.help_dialog.showIssueReplyForm);
$("#issue_reply_submit_btn").bind("click",TS.help_dialog.replyToIssue);
$("#issue_reply_cancel_btn, #issue_reply_title").bind("click",function(){TS.help_dialog.showIssue()
});
TS.help_dialog.last_issue_screen="list";
TS.help_dialog.getElsForScreen("new").addClass("hidden");
TS.help_dialog.getElsForScreen("issue").addClass("hidden");
TS.help_dialog.getElsForScreen("reply").addClass("hidden");
$("#issues_overlaid_throbber").addClass("hidden");
$("#issue_new_title").bind("textchange",function(g,i){var f=$(this);
var h=f.val();
if(h.length>TS.help.max_title_chars){f.val(h.substr(0,TS.help.max_title_chars))
}});
if(TS.help_dialog.just_docs){$("#help_dialog").find(".with_tabs").removeClass("with_tabs");
$("#help_dialog").find(".dialog_tabs").addClass("hidden");
$("#help_dialog").find(".no_tabs_title").removeClass("hidden");
$("#help_dialog").find("#cant_find").removeClass("hidden")
}TS.help_dialog.updateDocsTab();
d.modal("show")
},updateDocsTab:function(){if(!TS.help_dialog.just_docs){return
}var e=0;
var c=0;
var a=TS.help.issues.length;
var b;
for(var d=0;
d<TS.help.issues.length;
d++){b=TS.help.issues[d];
if(b.state=="unread"){e++
}else{if(b.state=="open"){c++
}}}$("#help_dialog").find("#no_open_issues, #unread_issues, #open_issues, #unread_issues_many, #unread_issues_singular, #open_issues_many, #open_issues_singular").addClass("hidden");
if(a){$("#no_open_issues").removeClass("hidden")
}else{$("#cant_find").removeClass("hidden");
$("#help_divider").addClass("hidden")
}if(e){$("#unread_issues").removeClass("hidden");
$("#help_divider").removeClass("hidden");
$("#no_open_issues").addClass("hidden");
if(e>1){$("#unread_issues_count_txt").text(e);
$("#unread_issues_many").removeClass("hidden")
}else{$("#unread_issues_singular").removeClass("hidden")
}}else{if(c){$("#open_issues").removeClass("hidden");
$("#help_divider").removeClass("hidden");
$("#no_open_issues").addClass("hidden");
if(c>1){$("#open_issues_count_txt").text(c);
$("#open_issues_many").removeClass("hidden")
}else{$("#open_issues_singular").removeClass("hidden")
}}}},onIssuesSorted:function(){if(!TS.help_dialog.showing){return
}TS.help_dialog.updateDocsTab();
$("#help_issues_list").html(TS.help_dialog.buildIssueListHTML())
},buildIssueListHTML:function(){var c="";
var a;
for(var b=0;
b<TS.help.issues.length;
b++){a=TS.help.issues[b];
c+=TS.templates.issue_list_item({issue:a})
}return c
},getElsForScreen:function(a){if(a=="list"){return $("#help_issues_list, #help_issues_list_btns")
}if(a=="new"){return $("#help_issue_new_form_div, #help_issue_new_form_btns")
}if(a=="issue"){return $("#help_issue_div, #help_issue_btns")
}if(a=="reply"){return $("#help_issue_reply_form_div, #help_issue_reply_form_btns")
}return $("#wtfjones")
},startWorking:function(){$("#issues_overlaid_throbber").removeClass("hidden").css("opacity",0).transition({opacity:1},200);
$("#help_dialog .modal-footer").find(".btn.disable_when_working").addClass("disabled")
},stopWorking:function(){$("#issues_overlaid_throbber").transition({opacity:0},100).delay(100).addClass("hidden");
$("#help_dialog .modal-footer").find(".btn").removeClass("disabled")
},showIssueScreen:function(a,e){var d=TS.help_dialog.getElsForScreen(TS.help_dialog.last_issue_screen);
var b=TS.help_dialog.getElsForScreen(a);
d.transition({opacity:0},100,function c(){if(c.run){return
}c.run=true;
if(!TS.help_dialog.showing){return
}d.addClass("hidden");
b.removeClass("hidden").css("opacity",0).transition({opacity:1},100,function f(){if(f.run){return
}f.run=true;
if(!TS.help_dialog.showing){return
}if(e){e()
}TS.client.ui.updateClosestMonkeyScroller($("#help_issues_scroller"))
})
});
TS.help_dialog.last_issue_screen=a
},showIssueList:function(){TS.help_dialog.showIssueScreen("list")
},showIssueReplyForm:function(){var a=TS.help.getIssueById(TS.help_dialog.last_issue_id);
if(!a){return
}$("#issue_reply_title").text(a.title);
$("#issue_reply_footer").html(TS.templates.help_issue_reply_comments({issue:a}));
TS.client.ui.updateClosestMonkeyScroller($("#help_issues_scroller"));
TS.help_dialog.showIssueScreen("reply",function(){$("#issue_reply_text").focus();
TS.client.ui.updateClosestMonkeyScroller($("#help_issues_scroller"))
})
},showNewIssueForm:function(){TS.help_dialog.showIssueScreen("new",function(){$("#issue_new_title").focus()
})
},showIssue:function(c){var a=TS.help.getIssueById(c);
var b;
if(c&&!a){return
}if(a){TS.help_dialog.last_issue_id=c;
TS.help_dialog.startWorking();
$("#help_issue_div").empty();
b=function(){TS.help.fetchIssueDetails(c,function(e,d,f){if(!TS.help_dialog.showing){return
}if(!e){TS.generic_dialog.alert("Failed to retrieve the request details.<br><br>"+f);
TS.help_dialog.stopWorking();
TS.help_dialog.showIssueList();
return
}setTimeout(function(){if(!TS.help_dialog.showing){return
}TS.help.markIssueRead(c,function(g,h){if(!TS.help_dialog.showing){return
}$("#help_issue_div").html(TS.templates.help_issue_div({issue:d,show_comments:true}));
TS.client.ui.updateClosestMonkeyScroller($("#help_issues_scroller"));
TS.help_dialog.stopWorking()
});
if(d.state=="resolved"||d.is_closed){$("#issue_resolved_btn").addClass("hidden")
}else{$("#issue_resolved_btn").removeClass("hidden")
}if(d.is_closed){$("#issue_reply_btn").addClass("hidden")
}else{$("#issue_reply_btn").removeClass("hidden")
}},1000)
});
$("#help_issue_div").html(TS.templates.help_issue_div({issue:a}));
TS.client.ui.updateClosestMonkeyScroller($("#help_issues_scroller"))
}
}TS.help_dialog.showIssueScreen("issue",b)
},markIssueResolved:function(){TS.help_dialog.startWorking();
TS.help.markIssueResolved(TS.help_dialog.last_issue_id,function(a,b){if(!TS.help_dialog.showing){return
}if(!a){TS.generic_dialog.alert("Failed to mark the request resolved.<br><br>"+b)
}TS.help_dialog.stopWorking();
TS.help_dialog.showIssueList()
})
},createIssue:function(){var c=$("#issue_new_text").val();
var b=$("#issue_new_title").val()||"";
if(b.length>TS.help.max_title_chars){TS.info("too long");
return
}if(!c){return
}if(!b){b=c.substr(0,50)
}var a={title:b,text:c};
TS.help_dialog.startWorking();
TS.help.createIssue(a,function(d,e){if(!TS.help_dialog.showing){return
}TS.help_dialog.stopWorking();
if(!d){TS.generic_dialog.alert("Failed to create request.<br><br>"+e)
}else{TS.help_dialog.showIssueList();
$("#issue_new_text").val("");
$("#issue_new_title").val("")
}})
},replyToIssue:function(){var a=$("#issue_reply_text").val();
if(!a){return
}TS.help_dialog.startWorking();
TS.help.replyToIssue(TS.help_dialog.last_issue_id,a,function(c,d,b){if(!TS.help_dialog.showing){return
}TS.help_dialog.stopWorking();
if(!c){if(b=="ticket_closed"){TS.generic_dialog.alert("Failed to add comment.<br><br>"+d)
}else{TS.generic_dialog.alert("Failed to add comment.<br><br>"+d)
}}else{TS.help_dialog.showIssue(TS.help_dialog.last_issue_id);
$("#issue_reply_text").val("")
}})
},go:function(){if(!TS.help_dialog.showing){TS.error("not showing?");
return
}var a=TS.help_dialog.div;
a.modal("hide")
},cancel:function(){TS.help_dialog.div.modal("hide")
},end:function(){TS.help_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.help_dialog.onKeydown)
},build:function(){$("body").append('<div id="help_dialog" class="modal hide fade"></div>');
var a=TS.help_dialog.div=$("#help_dialog");
a.on("hide",function(b){if(b.target!=this){return
}TS.help_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.help_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}$(window.document).bind("keydown",TS.help_dialog.onKeydown);
TS.client.ui.updateClosestMonkeyScroller($("#help_issues_scroller"));
TS.client.ui.updateClosestMonkeyScroller($("#help_docs_scroller"))
})
}})
})();
(function(){TS.registerModule("kb_nav",{onStart:function(){},start:function(B,A,D,C){r=B;
g=A;
f.lastX=null;
f.lastY=null;
if(!D){D="#menu"
}d=$(D);
i=C&&!!C.use_data_ordering;
b=C;
$(document).on("mousemove.keyboard_navigation",j);
$(document).on("keydown",TS.kb_nav.onKeyDown);
r.on("mouseenter.keyboard_navigation",g,u)
},end:function(){e();
if(r){r.off(".keyboard_navigation")
}r=null;
g=null;
s=null;
k=false;
h=null;
i=false;
b=null;
$(document).off("mousemove.keyboard_navigation",j);
$(document).off("keydown",TS.kb_nav.onKeyDown)
},clearHighlightedItem:function(){y()
},highlightFirstItem:function(){var A=x();
if(A&&A.length>0){v();
z(A)
}},setAllowHighlightWithoutBlurringInput:function(A){k=A
},setSubmitItemHandler:function(A){h=A
},onKeyDown:function(D){var B=TS.utility.keymap;
var C=D.which;
var E=D.metaKey||D.ctrlKey||D.shiftKey||D.altKey;
if((C==B.up)&&((k&&!E)||!q(D.target))){D.stopPropagation();
D.preventDefault();
v();
n(D);
return
}if((C==B.down)&&((k&&!E)||!q(D.target))){D.stopPropagation();
D.preventDefault();
v();
w(D);
return
}if(C==B.left&&!q(D.target)){D.stopPropagation();
D.preventDefault();
v();
n(D);
return
}if(C==B.right&&!q(D.target)){D.stopPropagation();
D.preventDefault();
v();
w(D);
return
}if(C==B.tab){D.stopPropagation();
D.preventDefault();
v();
if(!k&&q(D.target)){$(D.target).blur()
}if(D.shiftKey){n(D)
}else{w(D)
}return
}if(C==B.enter&&s){if(h){var A=s.get(0);
if(A){h.call(A,D)
}else{h(D)
}return
}D.stopPropagation();
D.preventDefault();
p();
return
}}});
var m={keyboard_active:"keyboard_active",no_pointer_events:"no_pointer_events"};
var d=null;
var r=null;
var o=false;
var g=null;
var s=null;
var k=false;
var h=null;
var i=false;
var b;
var v=function(){if(o){return
}d.addClass(m.keyboard_active);
d.addClass(m.no_pointer_events);
o=true
};
var f={lastX:null,lastY:null};
var j=function(A){if(!o){f.lastX=A.clientX;
f.lastY=A.clientY;
return
}if(f.lastX===null){f.lastX=A.clientX;
f.lastY=A.clientY
}else{if(A.clientX!==f.lastX||A.clientY!==f.lastY){e()
}f.lastX=A.clientX;
f.lastY=A.clientY
}};
var e=function(){if(!o){return
}if(s){s.removeClass("highlighted")
}d.removeClass(m.keyboard_active);
d.removeClass(m.no_pointer_events);
o=false
};
var n=function(C){var B;
var A=g;
if(s){B=a(s)
}else{B=t()
}if(B&&B.length>0){z(B,C)
}else{if(r.children(A).filter(":not(.disabled):visible").length!==0){y();
n(C)
}}};
var w=function(C){var B;
var A=g;
if(s){B=c(s)
}else{B=x()
}if(B&&B.length>0){z(B,C)
}else{if(r.children(A).filter(":not(.disabled):visible").length!==0){y();
w(C)
}}};
var z=function(B,C){y();
s=B;
var A=0;
if(b&&b.px_offset){A=b.px_offset
}B.addClass("highlighted").scrollintoview({offset:"top",px_offset:A,duration:0});
if(!b||!b.no_blur){B.find("a:first").focus()
}};
var y=function(){if(s){s.removeClass("highlighted");
s=null
}};
var u=function(A){s=$(A.target).closest(g)
};
var p=function(){if(s){s.find("a:first").click()
}};
var q=function(A){return $(A).is("input, textarea")
};
var x=function(){if(i){if(b.scrollToStartImmediately){b.scrollToStartImmediately()
}var A=l();
if(A.length===0){return null
}return $(A[0])
}else{return r.children(g).filter(":not(.disabled):visible:first")
}};
var t=function(){if(i){if(b.scrollToEndImmediately){b.scrollToEndImmediately()
}var A=l();
if(A.length===0){return null
}return $(A[A.length-1])
}else{return r.children(g).filter(":not(.disabled):visible:last")
}};
var c=function(D){if(i){var A=l();
var C=D.data("order-index");
for(var B=0;
B<A.length;
B++){if($(A[B]).data("order-index")==C){if(B+1<A.length){return $(A[B+1])
}break
}}return null
}else{return D.nextAll(g).filter(":not(.disabled):visible:first")
}};
var a=function(D){if(i){var A=l();
var C=D.data("order-index");
for(var B=0;
B<A.length;
B++){if($(A[B]).data("order-index")==C){if(B-1>=0){return $(A[B-1])
}break
}}return null
}else{return D.prevAll(g).filter(":not(.disabled):visible:first")
}};
var l=function(){var B=r.children(g).filter(":not(.disabled):visible");
var A=$.makeArray(B);
A.sort(function(D,C){var E=$(D).data("order-index");
var F=$(C).data("order-index");
return E-F
});
return A
}
})();
(function(){TS.registerModule("privacy_policy_dialog",{div:null,is_showing:false,default_setting:{title:"",body:"BODY",body_template:null,on_go:null,on_cancel:null,on_end:null,esc_for_ok:false,on_show:null,force_small:false,enter_always_gos:false},current_setting:null,body_template_html:{},Q:[],onStart:function(){},start:function(b){if(TS.privacy_policy_dialog.is_showing){if(b.unique&&TS.privacy_policy_dialog.current_setting.unique==b.unique){TS.info("redundant generic dialog not Qed: "+b.unique)
}else{TS.privacy_policy_dialog.Q.push(b)
}return
}var d=TS.privacy_policy_dialog.current_setting=$.extend(TS.utility.clone(TS.privacy_policy_dialog.default_setting),b);
if(!TS.privacy_policy_dialog.div){TS.privacy_policy_dialog.build()
}var c=TS.privacy_policy_dialog.div;
var a=TS.templates.privacy_policy_dialog({title:d.title,body:d.body,footer:d.footer});
c.empty();
c.html(a);
c.find(".close").bind("click",function(){if(d.show_cancel_button){TS.privacy_policy_dialog.cancel()
}else{if(d.esc_for_ok){TS.privacy_policy_dialog.go()
}}});
c.find(".dialog_go").click(TS.privacy_policy_dialog.go);
if(d.go_button_text){c.find(".dialog_go").html(d.go_button_text)
}if(d.show_go_button){c.find(".dialog_go").removeClass("hidden").addClass(d.go_button_class)
}c.css("opacity",0);
c.css("display","block");
window.setTimeout(function(){c.css("marginLeft","0px");
c.slideDown(function(){c.animate({opacity:1},{duration:500,complete:function(){c.addClass("fading-in");
c.modal({backdrop:false}).show();
if(document.activeElement&&document.activeElement!=document.body){document.activeElement.blur()
}if(d.on_show){d.on_show()
}}})
})
},1)
},go:function(b){if(!TS.privacy_policy_dialog.is_showing){TS.error("not showing?");
return
}var d=TS.privacy_policy_dialog.current_setting;
var c=TS.privacy_policy_dialog.div;
function a(){c.removeClass("fading-in");
c.fadeOut(750,function(){c.modal("hide")
})
}if(d.on_go){if(d.on_go(b)!==false){a()
}}else{a()
}},cancel:function(){var b=TS.privacy_policy_dialog.current_setting;
var a=TS.privacy_policy_dialog.div;
a.removeClass("fading-in");
a.fadeOut(750,function(){a.modal("hide")
});
if(b.on_cancel){b.on_cancel()
}},end:function(){var b=TS.privacy_policy_dialog.current_setting;
TS.privacy_policy_dialog.is_showing=TS.model.dialog_is_showing=false;
TS.privacy_policy_dialog.div.empty();
if(b.on_end){b.on_end()
}if(!TS.privacy_policy_dialog.is_showing&&TS.privacy_policy_dialog.Q.length){var a=TS.privacy_policy_dialog.Q.shift();
TS.privacy_policy_dialog.start(a)
}},build:function(){$("body").append('<div id="privacy_policy_dialog" class="modal" data-keyboard="false"></div>');
var a=TS.privacy_policy_dialog.div=$("#privacy_policy_dialog");
a.on("hidden",function(b){if(b.target!=this){return
}setTimeout(function(){TS.privacy_policy_dialog.end()
},200)
});
a.on("show",function(b){if(b.target!=this){return
}TS.privacy_policy_dialog.is_showing=TS.model.dialog_is_showing=true
})
}})
})();
(function(){TS.registerModule("sidebar_themes",{default_themes:{default_theme:{column_bg:"#4D394B",menu_bg:"#3E313C",active_item:"#4C9689",active_item_text:"#FFFFFF",hover_item:"#3E313C",text_color:"#FFFFFF",active_presence:"#38978D",badge:"#EB4D5C"},hoth_theme:{column_bg:"#F8F8FA",menu_bg:"#F8F8FA",active_item:"#CAD1D9",active_item_text:"#FFFFFF",hover_item:"#FFFFFF",text_color:"#383F45",active_presence:"#60D156",badge:"#FF8669"},cotton_theme:{column_bg:"#BB6A76",menu_bg:"#AD5B67",active_item:"#62B791",active_item_text:"#FFFFFF",hover_item:"#A5516A",text_color:"#FFFFFF",active_presence:"#68F798",badge:"#694464"},eco_theme:{column_bg:"#86A34E",menu_bg:"#94AF63",active_item:"#FFFFFF",active_item_text:"#6D8B42",hover_item:"#94AF63",text_color:"#FFFFFF",active_presence:"#FFB10A",badge:"#DFA044"},monument_theme:{column_bg:"#0D7E83",menu_bg:"#076570",active_item:"#F79F66",active_item_text:"#FFFFFF",hover_item:"#D37C71",text_color:"#FFFFFF",active_presence:"#F79F66",badge:"#F15340"},chocolate_theme:{column_bg:"#544538",menu_bg:"#42362B",active_item:"#5DB09D",active_item_text:"#FFFFFF",hover_item:"#4A3C30",text_color:"#FFFFFF",active_presence:"#FFFFFF",badge:"#5DB09D"},ocean_theme:{column_bg:"#303E4D",menu_bg:"#2C3849",active_item:"#6698C8",active_item_text:"#FFFFFF",hover_item:"#4A5664",text_color:"#FFFFFF",active_presence:"#94E864",badge:"#78AF8F"},workhard_theme:{column_bg:"#4D5250",menu_bg:"#444A47",active_item:"#D39B46",active_item_text:"#FFFFFF",hover_item:"#434745",text_color:"#FFFFFF",active_presence:"#99D04A",badge:"#DB6668"}},onStart:function(){if(TS.client){TS.client.login_sig.add(TS.sidebar_themes.onLogin,TS.sidebar_themes)
}},onLogin:function(a,b){if(TS.model.prefs.sidebar_theme){TS.prefs.sidebar_theme_changed_sig.dispatch()
}}})
})();
(function(){TS.registerModule("ui.share_dialog",{div:null,showing:false,delegate:undefined,onStart:function(){},onKeydown:function(a){if(!TS.ui.share_dialog.showing){return
}if(a.which==TS.utility.keymap.enter){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){TS.ui.share_dialog.go();
a.preventDefault()
}}else{if(a.which==TS.utility.keymap.esc){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){TS.ui.share_dialog.cancel()
}}}},start:function(h,f,i){if(TS.client&&TS.client.ui.checkForEditing()){return
}var g=TS.files.getFileById(h);
var d="file";
if(g.mode=="post"){d="file_post"
}else{if(g.mode=="space"){d="file_space"
}else{if(g.mode=="snippet"){d="file_snippet"
}}}var e={type:d,item:g,item_owner:TS.members.getMemberById(g.user),sharing_html:TS.templates.builders.buildFileSharingControls(g,true,null,i),file_html:(f?"":TS.templates.builders.fileHTML(g,{for_share_dialog:true}))};
e.icon_class=TS.utility.getImageIconClass(g,"thumb_80");
if(!TS.ui.share_dialog.div){TS.ui.share_dialog.build()
}var b=TS.templates.share_dialog(e);
b=b.replace(/\ue000/g,"").replace(/\ue001/g,"");
var a=TS.ui.share_dialog.div;
a.html(b);
TS.ui.share_dialog.div.find("img.lazy").lazyload();
var c=$("#file_comment_textarea");
TS.comments.ui.bindInput(c,TS.ui.share_dialog.go);
c.autogrow();
c=null;
a.modal("show");
a.find(".dialog_cancel").click(TS.ui.share_dialog.cancel);
a.find(".dialog_go").click(TS.ui.share_dialog.go);
TS.ui.bindFileShareDropdowns();
TS.ui.bindFileShareShareToggle();
TS.ui.bindFileShareCommentField()
},go:function(){if(!TS.ui.share_dialog.showing){TS.error("not showing?");
return
}if(TS.ui.shouldBlockUploadDialogSubmission()){return
}var f=$("#share_dialog");
var b=f.find("#share_item_id").val();
var a=f.find("#share_model_ob_id").val();
if(!a){if(TS.boot_data.feature_private_channels){var c=$("#select_share_channels").filterSelect("value")[0];
if(c){a=c.model_ob.id
}}else{a=$("#select_share_channels").val()
}}if(!a){TS.warn("model_ob_id is not set! "+$("#select_share_channels").val());
return
}var e=TS.format.cleanMsg($("#file_comment_textarea").val());
if($.trim(e)===""){e=""
}var d=function(){TS.shared.getShareModelObId(a,function(g){var h=false;
TS.files.shareFile(b,g,e,h)
})
};
if(TS.ui.share_dialog.delegate&&typeof TS.ui.share_dialog.delegate.submit=="function"){TS.ui.share_dialog.delegate.submit(f,d)
}else{d()
}TS.ui.share_dialog.div.modal("hide")
},cancel:function(){TS.ui.share_dialog.div.modal("hide")
},end:function(){TS.ui.share_dialog.showing=TS.model.dialog_is_showing=false;
TS.comments.ui.unbindInput($("#file_comment_textarea"));
TS.ui.share_dialog.div.empty();
$(window.document).unbind("keydown",TS.ui.share_dialog.onKeydown)
},build:function(){$("body").append('<div id="share_dialog" class="modal hide fade"></div>');
var a=TS.ui.share_dialog.div=$("#share_dialog");
a.on("hidden",function(b){if(b.target!=this){return
}TS.ui.share_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.share_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}$("#file_comment_textarea").focus();
$(window.document).bind("keydown",TS.ui.share_dialog.onKeydown)
});
a.on("click",function(b){if(TS.view){TS.view.doLinkThings(b)
}})
}})
})();
(function(){TS.registerModule("ui.tabs",{instances:[],onStart:function(){},create:function(e){if(!e){return false
}return new a(e)
}});
function a(g,f){if(typeof g==="undefined"){return null
}this.element=g;
var e=d(g);
var h=b(e);
this.element.on("click",".tab",function(){return c(this,g,e,h).bind(this)
});
c(e[0],g,e,h);
return this
}a.prototype.destroy=function(){this.element.off();
this.element.remove()
};
function b(e){if(typeof e==="undefined"){return[]
}return e.map(function(f,g){return $(g).attr("href")
}).map(function(f,g){return $(g)
})
}function d(e){if(typeof e==="undefined"){return[]
}return e.find(".tab").map(function(f,g){return $(g)
})
}function c(h,g,f,e){if(typeof h==="undefined"){return false
}e.map(function(k,j){return j.removeClass("active")
});
f.map(function(j,k){return k.removeClass("active")
});
$(h).addClass("active");
var i=$(h).attr("href");
return $(i).addClass("active")
}})();
(function(){TS.registerModule("pins",{pins_fetched_sig:new signals.Signal(),pinned_status_changed_sig:new signals.Signal(),pinned_message_changed_sig:new signals.Signal(),pinned_message_deleted_sig:new signals.Signal(),onStart:function(){TS.files.team_file_comment_deleted_sig.add(b);
TS.files.team_file_deleted_sig.add(a)
},fetchPins:function(l,m){TS.api.call("pins.list",{channel:l.id},function(o,p,n){if(o){var q=p.items;
TS.pins.upsertPinnedItems(q);
l.pinned_items=q;
TS.pins.pins_fetched_sig.dispatch(l,q)
}m(o,p,n)
})
},pinFile:function(n,l){var m=TS.files.getFileById(n);
if(!m){return
}f(l,{file:m,type:"file"})
},unPinFile:function(o,l){var m=c(o,l);
if(!m){return
}var n={file:m,type:"file"};
g(n,l,function(){d(l,n)
})
},pinFileComment:function(n,o,l){var m=TS.files.getFileById(o);
if(!m){return
}var p=TS.files.getFileCommentById(m,n);
if(!p){return
}f(l,{file:m,comment:p,type:"file_comment"})
},unPinFileComment:function(n,p,l){var q=j(n,p,l);
var m=TS.files.getFileById(p);
if(!q||!m){return
}var o={file:m,comment:q,type:"file_comment"};
g(o,l,function(){d(l,o)
})
},pinMessage:function(n,l){n=n.toString();
var m=TS.utility.msgs.getMsg(n,l.msgs);
if(!m&&l._archive_msgs){m=TS.utility.msgs.getMsg(n,l._archive_msgs)
}if(m){if(m.subtype==="file_comment"){TS.pins.pinFileComment(m.comment.id,m.file.id,l)
}else{if(m.file){TS.pins.pinFile(m.file.id,l)
}else{f(l,{message:m,type:"message"})
}}}},unPinMessage:function(o,l){o=o.toString();
var n=k(o,l);
if(n){if(n.subtype==="file_comment"){TS.pins.unPinFileComment(n.comment.id,n.file.id,l)
}else{if(n.file){TS.pins.unPinFile(n.file.id,l)
}else{var m={message:n,type:"message"};
g(m,l,function(){d(l,m)
})
}}}},isMessagePinned:function(m,l){if(m.subtype==="file_comment"){if(!m.comment){return false
}return !!j(m.comment.id,m.file.id,l)
}else{if(m.file){return !!c(m.file.id,l)
}else{return !!k(m.ts,l)
}}},pinStatusHasChanged:function(t,s,r,l){var m,n,p;
var q,u,o;
if(r==="message"&&(l.msgs||l._archive_msgs)){m=TS.utility.msgs.getMsg(s.message.ts,l.msgs);
if(!m&&l._archive_msgs){m=TS.utility.msgs.getMsg(s.message.ts,l._archive_msgs)
}if(m){s.message=m;
q=i(t,m,l)
}TS.utility.msgs.maybeStoreMsgs(l.id,l.msgs)
}else{if(r==="file_comment"){o=TS.files.upsertFile(s.file);
n=TS.files.getFileById(s.file.id);
s.file=n;
p=TS.files.getFileCommentById(n,s.comment.id);
if(p){s.comment=p;
q=i(t,p,l)
}else{p=TS.files.addCommentToFile(s.comment,n);
s.comment=p
}q=q||o.status==="CHANGED"
}else{if(r==="file"){o=TS.files.upsertFile(s.file);
n=TS.files.getFileById(s.file.id);
s.file=n;
q=i(t,n,l);
q=q||o.status==="CHANGED"
}}}if(s.file){TS.files.makeSureReferencesGetSavedToLS(s.file.id)
}u=e(t,s,r,l);
if(q||u){TS.pins.pinned_status_changed_sig.dispatch(l,s)
}},upsertPinnedItems:function(l){l.forEach(function(m){if(m.type==="file"){TS.files.upsertFile(m.file);
m.file=TS.files.getFileById(m.file.id)
}else{if(m.type==="file_comment"){TS.files.upsertFile(m.file);
m.file=TS.files.getFileById(m.file.id);
var n=TS.files.getFileCommentById(m.file,m.comment.id);
if(!n){n=TS.files.addCommentToFile(m.comment,m.file)
}m.comment=n
}}})
},replaceMsg:function(m,l){if(!l.pinned_items){return
}l.pinned_items.forEach(function(n){if(n.type==="message"&&n.message.ts===m.ts){n.message=m;
TS.pins.pinned_message_changed_sig.dispatch(l,n)
}})
},removeMsg:function(m,l){if(!l.pinned_items){return
}e(false,{message:{ts:m}},"message",l);
TS.pins.pinned_message_deleted_sig.dispatch(l)
},canUserPinHere:function(l){if(!TS.client||!l){return false
}if(!TS.boot_data.feature_channel_details){if(l.is_im){return false
}if(l.is_mpim){return false
}}if(l.is_general&&!TS.members.canUserPostInGeneral()){return false
}if(l.is_channel&&!l.is_member){return false
}return true
},test:function(){return{fileDeleted:a,fileCommentDeleted:b}
}});
var c=function(o,l){var m=TS.files.getFileById(o);
if(!m||!m.pinned_to){return null
}var n=m.pinned_to.indexOf(l.id)!==-1;
return n?m:null
};
var j=function(o,p,l){var m=TS.files.getFileById(p);
if(!m){return null
}var q=TS.files.getFileCommentById(m,o);
if(!q||!q.pinned_to){return null
}var n=q.pinned_to.indexOf(l.id)!==-1;
return n?q:null
};
var k=function(p,l){if(l.pinned_items){var n;
for(var m=0;
m<l.pinned_items.length;
m++){n=l.pinned_items[m];
if(n.type==="message"&&n.message.ts===p){return n.message
}}}var o=TS.utility.msgs.getMsg(p,l.msgs);
if(!o&&l._archive_msgs){o=TS.utility.msgs.getMsg(p,l._archive_msgs)
}if(!o){return null
}if(o.subtype==="file_comment"){if(j(o.comment.id,o.file.id,l)){return o
}}else{if(o.file){if(c(o.file.id,l)){return o
}}else{if(o.pinned_to&&o.pinned_to.indexOf(l.id)!==-1){return o
}}}return null
};
var i=function(n,o,l){var p=false;
if(!o.pinned_to){o.pinned_to=[]
}if(n){if(o.pinned_to.indexOf(l.id)===-1){o.pinned_to.push(l.id);
p=true
}}else{var m=o.pinned_to.indexOf(l.id);
if(m!==-1){o.pinned_to.splice(m,1);
p=true
}}return p
};
var e=function(n,o,m,l){var q=false;
if(!l.pinned_items){l.pinned_items=[]
}var p=-1;
l.pinned_items.some(function(s,r){var t=false;
if(m==="message"&&s.type==="message"){if(s.message.ts===o.message.ts){t=true
}}else{if(m==="file"&&s.type==="file"){if(s.file.id===o.file.id){t=true
}}else{if(m==="file_comment"&&s.type==="file_comment"){if(s.comment.id===o.comment.id){t=true
}}}}if(t){p=r;
return true
}});
if(!n&&p!==-1){l.pinned_items.splice(p,1);
q=true
}else{if(n&&p===-1){l.pinned_items.unshift(o);
q=true
}}return q
};
var f=function(l,n){var m=h(l,n);
TS.api.call("pins.add",m,function(o,q){if(!o){if(q.error==="too_many_pins"){var p="message";
if(n.type==="file"){p="file"
}if(n.type==="file_comment"){p="comment"
}TS.generic_dialog.start({title:"Couldn't pin "+p,body:"<p>Sorry! You've hit the limit on how many pins you can have in this "+(l.is_channel?"channel":TS.templates.builders.groupCopy({skip_private:true}))+".</p>",show_cancel_button:false})
}else{TS.logError(q.error,"pins.add got a not ok rsp")
}if(q.error!=="already_pinned"){return
}}TS.pins.pinStatusHasChanged(true,n,n.type,l)
})
};
var d=function(l,n){var m=h(l,n);
TS.api.call("pins.remove",m,function(o,p){if(!o){if(p.error!=="not_pinned"){return
}}TS.pins.pinStatusHasChanged(false,n,n.type,l)
})
};
var h=function(l,n){var m={channel:l.id};
if(n.type==="message"){m.timestamp=n.message.ts
}else{if(n.type==="file"){m.file=n.file.id
}else{if(n.type==="file_comment"){m.file_comment=n.comment.id
}}}return m
};
var g=function(n,l,o){TS.client.channel_page.highlightPinnedItemForRemoval(n);
var m=TS.client.channel_page.pinnedItemHtml(n,l);
TS.generic_dialog.start({title:"Remove Pinned Item",body:"<p>Are you sure you want to remove this pinned item?</p>"+m,go_button_text:"Yes, remove this pinned item",on_go:o,on_cancel:function(){TS.client.channel_page.unHighlightPinnedItemForRemoval(n)
}})
};
var b=function(l,m,n){if(!n||!n.pinned_to){return
}n.pinned_to.forEach(function(o){var p=TS.shared.getModelObById(o);
if(!p){return
}var q=e(false,{comment:n},"file_comment",p);
if(q){TS.pins.pinned_status_changed_sig.dispatch(p)
}})
};
var a=function(l){if(!l){return
}if(l.pinned_to){l.pinned_to.forEach(function(m){var n=TS.shared.getModelObById(m);
if(!n){return
}var o=e(false,{file:l},"file",n);
if(o){TS.pins.pinned_status_changed_sig.dispatch(n)
}})
}if(l.comments){l.comments.forEach(function(m){b(l,m.id,m)
})
}}
})();
(function(){TS.registerModule("sounds",{onStart:function(){var d=TS.boot_data.abs_root_url;
var c=[].concat(TS.boot_data.notification_sounds||[]).concat(TS.boot_data.alert_sounds||[]).concat(TS.boot_data.chat_sounds||[]).concat(TS.boot_data.call_sounds||[]);
var b=[];
try{TS.log(37,"adding all_sounds: "+c.length);
c.forEach(function(f){if(!f.url){return
}if(f.url.indexOf("http")!==0){f.url=d+f.url.replace("/","")
}TS.log(37,"adding sound: "+f.value);
a[f.value]={url:f.url};
if(window.Audio){a[f.value]=soundManager.createSound(a[f.value])
}TS.log(37,"_sounds["+f.value+"] = "+a[f.value]);
b.push(f.url)
});
try{if(TSSSB.call("preloadSounds",b)){TS.log(37,"called TSSSB.call('preloadSounds', '"+b+"')")
}else{TS.log(37,"NOT CALLED TSSSB.call('preloadSounds', '"+b+"')")
}}catch(e){TS.warn("error calling TSSSB.preloadSounds "+e+" "+b)
}}catch(e){TS.warn("error calling soundManager.createSound "+e);
TS.logError({message:"soundManager.ok(): "+(soundManager?soundManager.ok():" soundManager null/undefined?")+", soundManager.html5Only: "+(soundManager.html5Only?"true":"false")},"soundManager.createSound failed")
}},play:function(e,c){c=c||{};
c.should_loop=c.should_loop||false;
c.playback_device=c.playback_device||"";
c.ignore_mute=c.ignore_mute||false;
if(e=="new_message"){e=TS.model.prefs.new_msg_snd;
if(e=="none"){return
}}if(e=="beep"){e="frog.mp3"
}if(!(e in a)){TS.warn("unknown sound:"+e);
return
}if(TS.model&&TS.model.prefs&&TS.model.prefs.mute_sounds&&!c.ignore_mute){return
}var d=a[e];
if(d){var b={url:d.url,should_loop:c.should_loop,playback_device:c.playback_device};
if(TSSSB.call("playRemoteSound",b)){TS.log(37,"called TSSSB.call('playRemoteSound', '"+JSON.stringify(b)+"'})")
}else{TS.log(37,"calling sound.play()");
d.play({loops:c.should_loop?999999:0})
}}else{if(soundManager){TS.warn("sound is null: "+e+" window.Audio: "+window.Audio+" window.winssb: "+window.winssb+" soundManager.ok(): "+soundManager.ok()+" soundManager.html5Only: "+soundManager.html5Only+" soundManager.canPlayMIME('audio/mp3'): "+soundManager.canPlayMIME("audio/mp3"))
}}},stop:function(d,b){b=b||{};
b.ignore_mute=b.ignore_mute||false;
if(d=="new_message"){d=TS.model.prefs.new_msg_snd;
if(d=="none"){return
}}if(d=="beep"){d="frog.mp3"
}if(!(d in a)){TS.warn("unknown sound:"+d);
return
}if(TS.model&&TS.model.prefs&&TS.model.prefs.mute_sounds&&!b.ignore_mute){return
}var c=a[d];
if(c){if(TSSSB.call("stopRemoteSound",c.url)){TS.log(37,"called TSSSB.call('stopRemoteSound', '"+c.url+"')")
}else{TS.log(37,"calling sound.stop()");
c.stop()
}}else{if(soundManager){TS.warn("sound is null: "+d+" window.Audio: "+window.Audio+" window.winssb: "+window.winssb+" soundManager.ok(): "+soundManager.ok()+" soundManager.html5Only: "+soundManager.html5Only+" soundManager.canPlayMIME('audio/mp3'): "+soundManager.canPlayMIME("audio/mp3"))
}}}});
var a={}
})();
(function(){TS.registerModule("ui.toggle",{onStart:function(){$('input[type="checkbox"][data-style="toggle"]').each(function(){$(this).togglify()
})
},togglify:function(e,d){if(d){d=$.extend(TS.utility.clone(a),d)
}else{d={};
d.initial_state=e.data("initial_state")?e.data("initial_state"):a.initial_state;
d.label=e.data("label")?e.data("label"):a.label;
d.on_class=e.data("on-class")?e.data("on-class"):a.on_class;
d.on_text=e.data("on-text")?e.data("on-text"):a.on_text;
d.off_text=e.data("off-text")?e.data("off-text"):a.off_text;
d.off_class=e.data("off-class")?e.data("off-class"):a.off_class;
d.off_label=e.data("off-label")?e.data("off-label"):a.off_label
}if(d.initial_state===null){d.initial_state=e.is(":checked")?true:false
}c(e,d);
return this
}});
var a={initial_state:null,label:"",on_text:"On",on_class:"",off_text:"Off",off_class:"",off_label:""};
var c=function(h,g){var i=h;
var d=h.closest("label");
if(d.length){i=d;
var j=$.trim(d.text());
if(j&&g.label===a.label&&g.off_label===a.off_label){g.label=j
}}var f=b(g);
var e=$(f);
i.addClass("hidden").after(e);
e.on("click",function(){$(this).toggleClass("checked");
h.prop("checked",$(this).hasClass("checked")).trigger("change");
$(this).toggleClass(g.on_class,$(this).hasClass("checked"));
$(this).toggleClass(g.off_class,!$(this).hasClass("checked"))
})
};
var b=function(e){var d=TS.templates.toggle({settings:e});
return d
}
})();
$.fn.togglify=function(a){return TS.ui.toggle.togglify($(this),a)
};