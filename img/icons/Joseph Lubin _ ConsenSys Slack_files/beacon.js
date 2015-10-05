(function(){var e=window.SlackBeaconObject;
var f=window[e].q;
var a=window[e].l;
var b={};
var h={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(l){var j="";
var s,q,o,r,p,n,m;
var k=0;
while(k<l.length){s=l.charCodeAt(k++);
q=l.charCodeAt(k++);
o=l.charCodeAt(k++);
r=s>>2;
p=((s&3)<<4)|(q>>4);
n=((q&15)<<2)|(o>>6);
m=o&63;
if(isNaN(q)){n=m=64
}else{if(isNaN(o)){m=64
}}j=j+this._keyStr.charAt(r)+this._keyStr.charAt(p)+this._keyStr.charAt(n)+this._keyStr.charAt(m)
}return j
}};
function d(i){return(i==undefined)?"":encodeURIComponent(""+i)
}function g(p,l){if(l[0]=="init"){b.token=l[1];
return
}if(l[0]=="identify"){b.distinct_id=l[1];
return
}if(l[0]=="people_set"){b.person=l[1];
return
}if(l[0]=="name_tag"){b.name_tag=l[1];
return
}if(l[0]=="set"){b[l[1]]=l[2];
return
}if(l[0]=="track"){var o=b;
if(l[2]){for(var n in l[2]){o[n]=l[2][n]
}}if(l[1]=="pageview"){o.url=window.location.href
}var q={time:p,event:l[1]};
for(var n in o){q[n]=o[n]
}var m=JSON.stringify(q);
var j=h.encode(m);
var k="/beacon/track/?d="+d(j);
new Image().src=k;
return
}if(console&&console.log){console.log("unknown beacon event",p,l)
}}window[e]=function(){g(1*new Date(),arguments)
};
for(var c=0;
c<f.length;
c++){g(f[c][0],f[c][1])
}})();