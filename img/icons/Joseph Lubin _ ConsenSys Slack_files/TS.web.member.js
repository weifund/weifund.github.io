(function(){TS.registerModule("web.member",{onStart:function(){TS.web.login_sig.add(TS.web.member.onLogin,TS.web.member)
},onLogin:function(a,b){var c=TS.members.getMemberById(TS.boot_data.member_id);
if(!c){TS.error("wtf");
return
}$("#member_tz").html(TS.utility.date.timezoneLabel(c,false))
}})
})();