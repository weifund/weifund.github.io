(function(){TS.registerModule("rxns",{rxn_records_changed_sig:new signals.Signal(),member_rxns_fetched_sig:new signals.Signal(),member_rxns_being_fetched_sig:new signals.Signal(),need_alerts:{},onStart:function(){if(!TS.client){return
}if(!TS.boot_data.feature_reactions){return
}v=TS.utility.throttleFunc(b,100);
var G=TS.utility.throttleFunc(E,1000);
c=function(I){G(I)
};
var H=TS.storage.fetchRxnRecords();
if(parseInt(TS.qs_args.rxn_record_days)||!H.length){TS.info("going to call _backFillRxnRecords because ls_rxn_records.length:"+H.length);
TS.ms.connected_sig.addOnce(z)
}else{p=H;
for(var F=0;
F<p.length;
F++){o[p[F].rxn_key]=p[F]
}}},upsertRxnsFromDataAndUpdateUI:function(F,H){var G=D(F,H);
if(G.status!="NOOP"){c(F)
}return G
},getRxnKey:function(G,H,F){if(G=="message"&&!F){TS.error("getRxnKey: no c_id provided for message rxn_key")
}if(G!="message"&&F){TS.error("getRxnKey: c_id provided for but this is not a message rxn_key")
}return G+"-"+H+"-"+(F||"")
},getRxnKeyByMsgType:function(G){var F;
if(G.subtype=="file_upload"||G.subtype=="file_share"||G.subtype=="file_mention"){if(G.file){F=G.file._rxn_key
}}else{if(G.subtype=="file_comment"){if(G.comment){F=G.comment._rxn_key
}}else{F=G._rxn_key
}}return F
},getRxnKeyFromData:function(F){var G;
if(F.type=="message"){G=F.ts||F.message.ts
}else{if(F.type=="file"){G=F.file.id||F.file
}else{if(F.type=="file_comment"){G=F.file_comment||F.comment.id
}else{throw ("item.type not handled")
}}}return TS.rxns.getRxnKey(F.type,G,F.channel)
},getExistingRxnsByKey:function(F){return C[F]||null
},getRxnRecordByKey:function(F){if(o[F]){return o[F]
}for(var G=p.length-1;
G>-1;
G--){if(p[G].rxn_key===F){o[F]=p[G];
return o[F]
}}return null
},getNextRxnRecordThatNeedsAlert:function(){var G;
for(var F=p.length-1;
F>-1;
F--){if(TS.rxns.need_alerts[p[F].rxn_key]){G=p[F]
}else{break
}}return G
},getRxnsFromData:function(F){if(F.type=="message"){return F.message&&F.message.reactions&&F.message.reactions
}if(F.type=="file"){return F.file&&F.file.reactions&&F.file.reactions
}if(F.type=="file_comment"){return F.comment&&F.comment.reactions&&F.comment.reactions
}return null
},doesRxnsHaveRxnFromMember:function(I,G,H){G=TS.emoji.nameToCanonicalName(G);
if(!I){return false
}var F=TS.rxns.getRxnFromRxns(I,G);
if(!F){return false
}if(!F){return false
}if(!F.users){return false
}return(F.users.indexOf(H)!=-1)
},doesRxnsHaveRxnFromUser:function(G,F){return TS.rxns.doesRxnsHaveRxnFromMember(G,F,TS.model.user.id)
},doesRxnsHaveRxn:function(G,F){if(!G){return false
}return !!TS.rxns.getRxnFromRxns(G,F)
},countAllRxns:function(G){if(!G){return 0
}var F=0;
G.forEach(function(H){F+=(H.count||0)
});
return F
},countAllEmoji:function(F){if(!F){return 0
}return F.length
},countAllUsersRxns:function(H,F){if(!H){return 0
}var G=0;
H.forEach(function(I){if(I.users.indexOf(F)>-1){G++
}});
return G
},getAllUniqueRxners:function(H,F){if(!H){return[]
}var G=[];
H.forEach(function(I){if(!I){return
}if(!I.count){return
}if(!I.users){return
}I.users.forEach(function(J){if(F==J){return
}if(G.indexOf(J)!=-1){return
}G.push(J)
})
});
return G
},getRxnFromRxns:function(G,F){if(!G){return null
}return G.filter(function(H){return H.name==F
})[0]||null
},changeRxnsFromIMsg:function(N){if(!TS.boot_data.feature_reactions){return
}if(!N.item){return
}var J=false;
if(N.item.type=="message"&&N.item.ts){J=true
}else{if(N.item.type=="file"&&typeof N.item.file=="string"){J=true
}else{if(N.item.type=="file_comment"&&N.item.file_comment){J=true
}}}if(J&&!i(N.item)){return
}var F=(N.user==TS.model.user.id);
var I=TS.rxns.getRxnKeyFromData(N.item);
var H=TS.rxns.getExistingRxnsByKey(I);
var L;
if(J){var G=(N.type=="reaction_added");
L=d(G,TS.utility.clone(H)||[],N.reaction,N.user)
}else{L=TS.rxns.getRxnsFromData(N.item);
if(F){}else{for(var K in H){if(TS.rxns.doesRxnsHaveRxnFromUser(H,K)){if(TS.utility.ensureInArray(H[K].users,TS.model.user.id)){TS.warn('handleRxnChangeFromMS had to manually add the user to rxns "'+K+'" users')
}}}}}var M=D(I,L);
TS.dir(888,M,"handleRxnChangeFromMS upsert status:"+M.status);
l(N);
if(M.status=="NOOP"){return
}if(F&&!N._from_evt_log){E(I,N.reaction,N.user)
}else{c(I)
}},changeRxnsFromUserAction:function(K,H,I){H=TS.emoji.nameToCanonicalName(H);
if(!TS.boot_data.feature_reactions){return
}TS.log(888,"changeRxnsFromUserAction rxn_key:"+K+" name:"+H+" adding:"+I);
if(!TS.emoji.isValidName(H)){TS.error('"'+H+'" is not a valid emoji');
return
}var J=TS.rxns.getExistingRxnsByKey(K)||[];
if(I){var G=TS.rxns.countAllEmoji(J);
var N=TS.rxns.countAllUsersRxns(J,TS.model.user.id);
if(G>=50){a(h);
return
}else{if(N>=10){a(t);
return
}}}var L=A(I,TS.utility.clone(J),H);
TS.dir(888,J,"existing_rxns");
TS.dir(888,L,"new_rxns");
var M=m(K,L);
TS.dir(888,M,"changeRxnsFromUserAction upsert status:"+M.status);
if(M.status=="NOOP"){TS.error("changeRxnsFromUserAction called but no NOOP?");
return
}E(K,H,TS.model.user.id);
var F=(I)?"reactions.add":"reactions.remove";
var O=n(K,{name:H});
B(K);
TS.api.call(F,O,function(S,U,R){f(K);
var W=false;
if(S){if(I){TS.prefs.recordEmojiUse(":"+R.name+":")
}}else{if(!I&&U.error&&U.error=="no_reaction"){}else{if(U.error==h||U.error==t){a(U.error)
}else{if(U.error==y){TS.generic_dialog.alert("Darn it, "+TS.emoji.graphicReplace(":"+R.name+":")+" doesn't work as a reaction yet! But rest assured, the full range of skin tones will be supported soon. We’re working on it!"+TS.emoji.graphicReplace(":wrench:"),"Invalid Emoji Name")
}}var V=TS.rxns.getExistingRxnsByKey(K)||[];
var Q=A(!I,TS.utility.clone(V),H);
var T=m(K,Q);
TS.dir(888,T,"changeRxnsFromUserAction UNDO upsert status:"+T.status);
if(T.status=="NOOP"){TS.log(888,"changeRxnsFromUserAction trying to undo because of API rsp, but no NOOP?")
}else{W=true
}}}var P=function(){TS.log(888,"maybeUpdateModel pending:"+q[K]+" _pending_last:"+e[K]);
if(q[K]){return false
}if(!e.hasOwnProperty(K)){return false
}var X=m(K,e[K]);
delete e[K];
TS.dir(888,X,"maybeUpdateModel status:"+X.status);
if(X.status=="NOOP"){return false
}E(K);
u(K);
return true
};
if(!P()&&!W){return
}E(K)
})
},checkForRxnClick:function(M){if(!TS.boot_data.feature_reactions){return
}if(!M||!M.target){return
}var K=$(M.target);
var J=K.closest(".emoji_rxn");
if(!J.length){return
}var I=String(J.data("emoji"));
if(J.hasClass("emoji_rxn")){var H=K.closest(".rxn_panel");
var G=H.data("rxn-key");
var F;
if(J.hasClass("menu_rxn")){TS.emoji_menu.startEmoForRxn(M,G)
}else{F=!J.hasClass("user_reacted");
if(!F&&M.shiftKey){var L=TS.rxns.getExistingRxnsByKey(G);
L.forEach(function(N){if(!TS.rxns.doesRxnsHaveRxnFromUser(L,N.name)){return
}TS.rxns.changeRxnsFromUserAction(G,N.name,F)
})
}else{TS.rxns.changeRxnsFromUserAction(G,I,F)
}}}},getRxnRecords:function(){return p
},getRxnKeyParts:function(F){var G=F.split("-");
return{type:G[0],id:G[1],c_id:G[2]}
},test:function(){return{updateUI:E,addOrRemoveRxnFromRxns:d,upsertRxnsFromData:D,upsertRxns:w,incrementPendingCnt:B,decrementPendingCnt:f,fetchAndUpdateRxns:u,backFillRxnRecords:z,displayTooManyError:a}
}});
var p=[];
var o={};
var C={};
var q={};
var e={};
var E=function(F,G,H){var I=TS.client&&TS.client.ui&&TS.client.ui.areMsgsScrolledToBottom();
TS.templates.builders.updateMsgRxnPanels(F,G,H);
if(TS.client&&I){TS.client.ui.instaScrollMsgsToBottom(true)
}};
var c=function(F){E(F)
};
var A=function(F,H,G){return d(F,H,G,TS.model.user.id)
};
var d=function(F,J,H,I){var G=TS.rxns.getRxnFromRxns(J,H);
if(F){if(!G){J.push({users:[I],count:1,name:H})
}else{if(TS.utility.ensureInArray(G.users,I)){G.count++
}else{}}}else{if(G){if(TS.utility.removeFromArray(G.users,I)){G.count--;
if(G.count<1||G.users.length===0){TS.utility.removeFromArray(J,G)
}if(!J.length){J=null
}}else{}}else{}}return J
};
var m=function(F,G){return w(F,G,true)
};
var D=function(F,G){return w(F,G,false)
};
var w=function(F,K,J){if(!TS.boot_data.feature_reactions){return
}var I={status:"NOOP",what_changed:[],rxns:K};
if(!J&&q[F]){e[F]=TS.utility.clone(K||null);
TS.log(888,"_upsertRxns call ignored because !force && _pending_counts["+F+"]:"+q[F]);
return I
}var M=TS.rxns.getExistingRxnsByKey(F);
var H=TS.rxns.getRxnKeyParts(F);
if(K){if(M){if(!TS.utility.areSimpleObjectsEqual(M,K,"rxn_key:"+F)){I.status="CHANGED";
C[F]=K
}}else{I.status="ADDED";
C[F]=K
}}else{if(M){I.status="CHANGED";
delete C[F]
}}I.rxns=C[F]||null;
if(I.status!="NOOP"){if(H.type=="message"){if(!H.c_id){TS.error("_upsertRxns: no c_id provided but type is message")
}var G=TS.shared.getModelObById(H.c_id);
var L=G&&TS.utility.msgs.getMsg(H.id,G.msgs);
if(!L){TS.dir(888,I.rxns,"_upsertRxns no need to update msg reactions key:"+F)
}else{TS.dir(888,I.rxns,"_upsertRxns updated msg reactions key:"+F);
TS.utility.msgs.maybeStoreMsgs(H.c_id,G.msgs,true)
}}else{if(H.type=="file"){TS.files.makeSureReferencesGetSavedToLS(H.id)
}else{if(H.type=="file_comment"){TS.files.makeSureReferencesGetSavedToLS(H.id)
}else{throw ("type not handled")
}}}}TS.dir(888,I,F);
return I
};
var B=function(F){if(!F){return
}q[F]=q[F]||0;
q[F]++;
TS.log(888,"_incrementPendingCnt "+F+": "+q[F])
};
var f=function(F){if(!q[F]){TS.log(888,"_decrementPendingCnt "+F+": "+q[F]);
return
}q[F]--;
if(q[F]===0){delete q[F]
}TS.log(888,"_decrementPendingCnt "+F+": "+q[F])
};
var n=function(F,H){H=H||{};
var G=TS.rxns.getRxnKeyParts(F);
if(G.type=="message"){H.channel=G.c_id;
H.timestamp=G.id
}else{if(G.type=="file"){H.file=G.id
}else{if(G.type=="file_comment"){H.file_comment=G.id
}else{throw ("type not handled")
}}}return H
};
var u=function(F,H){H=H||1;
var I=2;
var G=n(F,{full:true});
TS.log(888,"_fetchAndUpdateRxns rxn_key:"+F+" attempt:"+H);
B(F);
TS.api.call("reactions.get",G,function(K,M,J){f(F);
if(K){var N=TS.rxns.getRxnsFromData(M);
var L=D(F,N);
TS.dir(888,L,"_fetchAndUpdateRxns upsert status:"+L.status);
if(L.status=="NOOP"){return
}E(F)
}else{TS.error("_fetchAndUpdateRxns got an err:"+JSON.stringify(M||null))
}if(H<I){u(F,++H)
}})
};
var s=function(F,G,I){if(!F.emoji){return null
}if(!F.emoji.hasOwnProperty(G)){return null
}for(var H=0;
H<F.emoji[G].length;
H++){if(F.emoji[G][H].id===I){return F.emoji[G][H]
}}return null
};
var r=function(F){if(!TS.client){return false
}if(F.user==TS.model.user.id){return false
}if(F.item.type=="message"&&typeof F.item.message!=="undefined"&&F.item.message.user!=TS.model.user.id){return false
}if(F.item.type=="file"&&typeof F.item.file!=="undefined"&&F.item.file.user!=TS.model.user.id){return false
}if(F.item.type=="file_comment"&&typeof F.item.comment!=="undefined"&&F.item.comment.user!=TS.model.user.id){return false
}return true
};
var l=function(G){if(!r(G)){return
}var F=TS.rxns.getRxnKeyFromData(G.item);
if(G.type=="reaction_added"){var H=(!G._from_evt_log&&G.item.type=="message");
j(G.reaction,F,G.user,G.event_ts,H)
}else{g(G.reaction,F,G.user)
}};
var i=function(G){if(!G){return false
}if(G.type=="message"){var H=TS.utility.msgs.findMsg(G.ts,G.channel);
if(!H){return false
}G.message=H;
return true
}else{if(G.type=="file"||G.type=="file_comment"){var F=TS.files.getFileById(G.file);
if(!F){return false
}G.file=F;
if(G.type=="file_comment"){var I=TS.files.getFileCommentById(F,G.file_comment);
if(!I){return false
}G.comment=I
}return true
}}return false
};
var j=function(G,I,L,O,J){O=O||TS.utility.date.makeTsStamp();
J=!!J;
var Q=false;
var M=o[I];
if(!M){Q=true;
M=o[I]=p[p.length]={rxn_key:I}
}M.last_update=O;
if(J){TS.rxns.need_alerts[I]=TS.rxns.need_alerts[I]||O
}M.emoji=M.emoji||{};
var K=M.emoji[G]=(M.emoji.hasOwnProperty(G)&&M.emoji[G])||[];
var R=s(M,G,L)||(K[K.length]={id:L});
R.when=O;
TS.dir(877,p,G+" "+I+" "+L);
var N=p.length;
if(Q&&N>1&&p[N-1].last_update<p[N-2].last_update){TS.error("_rxn_records sorted!");
p.sort(function H(T,S){if(T.last_update<S.last_update){return -1
}if(T.last_update>S.last_update){return 1
}return 0
})
}v(J);
var P=2000;
var F=(p.length>P)?p.slice(0,P):p;
TS.storage.storeRxnRecords(F)
};
var b=function(F){TS.rxns.rxn_records_changed_sig.dispatch(F)
};
var v=function(){b()
};
var g=function(H,F,I){var G=TS.rxns.getRxnRecordByKey(F);
if(!G){return
}var J=s(G,H,I);
if(!J){return
}TS.utility.removeFromArray(G.emoji[H],J);
if(!G.emoji[H].length){delete G.emoji[H]
}if(!Object.keys(G.emoji).length){delete o[F];
TS.utility.removeFromArray(p,G)
}TS.rxns.rxn_records_changed_sig.dispatch();
TS.storage.storeRxnRecords(p)
};
var k=[];
var x=function(J,K,H){if(!J){TS.error("_onEventLog "+K);
return
}if(!K.events){TS.error("_onEventLog missing events");
return
}var I;
var F;
for(I=0;
I<K.events.length;
I++){F=K.events[I];
if(F.type!="reaction_added"&&F.type!="reaction_removed"){continue
}if(!r(F)){continue
}F._from_evt_log=true;
k[k.length]=F
}TS.log(866,"LOADED _temp_evt_log_events.length: "+k.length);
if(K.has_more){z(F.event_ts)
}else{c.always_wait=true;
v.always_wait=true;
TS.log(866,"_temp_evt_log_events.length: "+k.length);
if(TS.shouldLog(866)){console.profile("rxn records")
}var G=Date.now();
for(I=0;
I<k.length;
I++){F=k[I];
TS.ms.handleMsg(F)
}k.length=0;
if(TS.shouldLog(866)){console.profileEnd()
}TS.log(866,"TS.ms.handleMsg: "+(Date.now()-G));
c.always_wait=false;
v.always_wait=false
}};
var z=function(H){if(!H){var G=Math.min(29,(parseInt(TS.qs_args.rxn_record_days)||7));
var F=(1000*60*60*24)*G;
H=Math.round((Date.now()-F)/1000)
}TS.api.call("eventlog.history",{start:H,count:(TS.boot_data.version_ts=="dev"?200:2000)},x)
};
var a=function(F){if(F==t){TS.generic_dialog.alert("You can only add up to 10 reactions to a message.","Reaction Limit Reached")
}else{if(F==h){TS.generic_dialog.alert("A message can contain up to 50 different emojis in its reactions. Sorry, you can’t add any more than this!","Reaction Limit Reached")
}else{return
}}};
var t="too_many_reactions";
var h="too_many_emoji";
var y="invalid_name"
})();