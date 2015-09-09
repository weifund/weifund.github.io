/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */
(function(b,a){if(typeof module==="object"&&typeof module.exports==="object"){module.exports=b.document?a(b,true):function(c){if(!c.document){throw new Error("jQuery requires a window with a document")
}return a(c)
}
}else{a(b)
}}(typeof window!=="undefined"?window:this,function(window,noGlobal){var arr=[];
var slice=arr.slice;
var concat=arr.concat;
var push=arr.push;
var indexOf=arr.indexOf;
var class2type={};
var toString=class2type.toString;
var hasOwn=class2type.hasOwnProperty;
var support={};
var document=window.document,version="2.1.4",jQuery=function(selector,context){return new jQuery.fn.init(selector,context)
},rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,rmsPrefix=/^-ms-/,rdashAlpha=/-([\da-z])/gi,fcamelCase=function(all,letter){return letter.toUpperCase()
};
jQuery.fn=jQuery.prototype={jquery:version,constructor:jQuery,selector:"",length:0,toArray:function(){return slice.call(this)
},get:function(num){return num!=null?(num<0?this[num+this.length]:this[num]):slice.call(this)
},pushStack:function(elems){var ret=jQuery.merge(this.constructor(),elems);
ret.prevObject=this;
ret.context=this.context;
return ret
},each:function(callback,args){return jQuery.each(this,callback,args)
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))
},slice:function(){return this.pushStack(slice.apply(this,arguments))
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},eq:function(i){var len=this.length,j=+i+(i<0?len:0);
return this.pushStack(j>=0&&j<len?[this[j]]:[])
},end:function(){return this.prevObject||this.constructor(null)
},push:push,sort:arr.sort,splice:arr.splice};
jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;
if(typeof target==="boolean"){deep=target;
target=arguments[i]||{};
i++
}if(typeof target!=="object"&&!jQuery.isFunction(target)){target={}
}if(i===length){target=this;
i--
}for(;
i<length;
i++){if((options=arguments[i])!=null){for(name in options){src=target[name];
copy=options[name];
if(target===copy){continue
}if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;
clone=src&&jQuery.isArray(src)?src:[]
}else{clone=src&&jQuery.isPlainObject(src)?src:{}
}target[name]=jQuery.extend(deep,clone,copy)
}else{if(copy!==undefined){target[name]=copy
}}}}}return target
};
jQuery.extend({expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),isReady:true,error:function(msg){throw new Error(msg)
},noop:function(){},isFunction:function(obj){return jQuery.type(obj)==="function"
},isArray:Array.isArray,isWindow:function(obj){return obj!=null&&obj===obj.window
},isNumeric:function(obj){return !jQuery.isArray(obj)&&(obj-parseFloat(obj)+1)>=0
},isPlainObject:function(obj){if(jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false
}if(obj.constructor&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false
}return true
},isEmptyObject:function(obj){var name;
for(name in obj){return false
}return true
},type:function(obj){if(obj==null){return obj+""
}return typeof obj==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj
},globalEval:function(code){var script,indirect=eval;
code=jQuery.trim(code);
if(code){if(code.indexOf("use strict")===1){script=document.createElement("script");
script.text=code;
document.head.appendChild(script).parentNode.removeChild(script)
}else{indirect(code)
}}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase)
},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase()
},each:function(obj,callback,args){var value,i=0,length=obj.length,isArray=isArraylike(obj);
if(args){if(isArray){for(;
i<length;
i++){value=callback.apply(obj[i],args);
if(value===false){break
}}}else{for(i in obj){value=callback.apply(obj[i],args);
if(value===false){break
}}}}else{if(isArray){for(;
i<length;
i++){value=callback.call(obj[i],i,obj[i]);
if(value===false){break
}}}else{for(i in obj){value=callback.call(obj[i],i,obj[i]);
if(value===false){break
}}}}return obj
},trim:function(text){return text==null?"":(text+"").replace(rtrim,"")
},makeArray:function(arr,results){var ret=results||[];
if(arr!=null){if(isArraylike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr)
}else{push.call(ret,arr)
}}return ret
},inArray:function(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i)
},merge:function(first,second){var len=+second.length,j=0,i=first.length;
for(;
j<len;
j++){first[i++]=second[j]
}first.length=i;
return first
},grep:function(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;
for(;
i<length;
i++){callbackInverse=!callback(elems[i],i);
if(callbackInverse!==callbackExpect){matches.push(elems[i])
}}return matches
},map:function(elems,callback,arg){var value,i=0,length=elems.length,isArray=isArraylike(elems),ret=[];
if(isArray){for(;
i<length;
i++){value=callback(elems[i],i,arg);
if(value!=null){ret.push(value)
}}}else{for(i in elems){value=callback(elems[i],i,arg);
if(value!=null){ret.push(value)
}}}return concat.apply([],ret)
},guid:1,proxy:function(fn,context){var tmp,args,proxy;
if(typeof context==="string"){tmp=fn[context];
context=fn;
fn=tmp
}if(!jQuery.isFunction(fn)){return undefined
}args=slice.call(arguments,2);
proxy=function(){return fn.apply(context||this,args.concat(slice.call(arguments)))
};
proxy.guid=fn.guid=fn.guid||jQuery.guid++;
return proxy
},now:Date.now,support:support});
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()
});
function isArraylike(obj){var length="length" in obj&&obj.length,type=jQuery.type(obj);
if(type==="function"||jQuery.isWindow(obj)){return false
}if(obj.nodeType===1&&length){return true
}return type==="array"||length===0||typeof length==="number"&&length>0&&(length-1) in obj
}var Sizzle=
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function(a,b){if(a===b){hasDuplicate=true
}return 0
},MAX_NEGATIVE=1<<31,hasOwn=({}).hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,indexOf=function(list,elem){var i=0,len=list.length;
for(;
i<len;
i++){if(list[i]===elem){return i
}}return -1
},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",whitespace="[\\x20\\t\\r\\n\\f]",characterEncoding="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",identifier=characterEncoding.replace("w","w#"),attributes="\\["+whitespace+"*("+characterEncoding+")(?:"+whitespace+"*([*^$|!~]?=)"+whitespace+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+characterEncoding+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|.*)\\)|)",rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={ID:new RegExp("^#("+characterEncoding+")"),CLASS:new RegExp("^\\.("+characterEncoding+")"),TAG:new RegExp("^("+characterEncoding.replace("w","w*")+")"),ATTR:new RegExp("^"+attributes),PSEUDO:new RegExp("^"+pseudos),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),bool:new RegExp("^(?:"+booleans+")$","i"),needsContext:new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,rescape=/'|\\/g,runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function(_,escaped,escapedWhitespace){var high="0x"+escaped-65536;
return high!==high||escapedWhitespace?escaped:high<0?String.fromCharCode(high+65536):String.fromCharCode(high>>10|55296,high&1023|56320)
},unloadHandler=function(){setDocument()
};
try{push.apply((arr=slice.call(preferredDoc.childNodes)),preferredDoc.childNodes);
arr[preferredDoc.childNodes.length].nodeType
}catch(e){push={apply:arr.length?function(target,els){push_native.apply(target,slice.call(els))
}:function(target,els){var j=target.length,i=0;
while((target[j++]=els[i++])){}target.length=j-1
}}
}function Sizzle(selector,context,results,seed){var match,elem,m,nodeType,i,groups,old,nid,newContext,newSelector;
if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context)
}context=context||document;
results=results||[];
nodeType=context.nodeType;
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results
}if(!seed&&documentIsHTML){if(nodeType!==11&&(match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){elem=context.getElementById(m);
if(elem&&elem.parentNode){if(elem.id===m){results.push(elem);
return results
}}else{return results
}}else{if(context.ownerDocument&&(elem=context.ownerDocument.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);
return results
}}}else{if(match[2]){push.apply(results,context.getElementsByTagName(selector));
return results
}else{if((m=match[3])&&support.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));
return results
}}}}if(support.qsa&&(!rbuggyQSA||!rbuggyQSA.test(selector))){nid=old=expando;
newContext=context;
newSelector=nodeType!==1&&selector;
if(nodeType===1&&context.nodeName.toLowerCase()!=="object"){groups=tokenize(selector);
if((old=context.getAttribute("id"))){nid=old.replace(rescape,"\\$&")
}else{context.setAttribute("id",nid)
}nid="[id='"+nid+"'] ";
i=groups.length;
while(i--){groups[i]=nid+toSelector(groups[i])
}newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;
newSelector=groups.join(",")
}if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));
return results
}catch(qsaError){}finally{if(!old){context.removeAttribute("id")
}}}}}return select(selector.replace(rtrim,"$1"),context,results,seed)
}function createCache(){var keys=[];
function cache(key,value){if(keys.push(key+" ")>Expr.cacheLength){delete cache[keys.shift()]
}return(cache[key+" "]=value)
}return cache
}function markFunction(fn){fn[expando]=true;
return fn
}function assert(fn){var div=document.createElement("div");
try{return !!fn(div)
}catch(e){return false
}finally{if(div.parentNode){div.parentNode.removeChild(div)
}div=null
}}function addHandle(attrs,handler){var arr=attrs.split("|"),i=attrs.length;
while(i--){Expr.attrHandle[arr[i]]=handler
}}function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||MAX_NEGATIVE)-(~a.sourceIndex||MAX_NEGATIVE);
if(diff){return diff
}if(cur){while((cur=cur.nextSibling)){if(cur===b){return -1
}}}return a?1:-1
}function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();
return name==="input"&&elem.type===type
}
}function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();
return(name==="input"||name==="button")&&elem.type===type
}
}function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;
return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;
while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j])
}}})
})
}function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context
}support=Sizzle.support={};
isXML=Sizzle.isXML=function(elem){var documentElement=elem&&(elem.ownerDocument||elem).documentElement;
return documentElement?documentElement.nodeName!=="HTML":false
};
setDocument=Sizzle.setDocument=function(node){var hasCompare,parent,doc=node?node.ownerDocument||node:preferredDoc;
if(doc===document||doc.nodeType!==9||!doc.documentElement){return document
}document=doc;
docElem=doc.documentElement;
parent=doc.defaultView;
if(parent&&parent!==parent.top){if(parent.addEventListener){parent.addEventListener("unload",unloadHandler,false)
}else{if(parent.attachEvent){parent.attachEvent("onunload",unloadHandler)
}}}documentIsHTML=!isXML(doc);
support.attributes=assert(function(div){div.className="i";
return !div.getAttribute("className")
});
support.getElementsByTagName=assert(function(div){div.appendChild(doc.createComment(""));
return !div.getElementsByTagName("*").length
});
support.getElementsByClassName=rnative.test(doc.getElementsByClassName);
support.getById=assert(function(div){docElem.appendChild(div).id=expando;
return !doc.getElementsByName||!doc.getElementsByName(expando).length
});
if(support.getById){Expr.find.ID=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var m=context.getElementById(id);
return m&&m.parentNode?[m]:[]
}};
Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);
return function(elem){return elem.getAttribute("id")===attrId
}
}
}else{delete Expr.find.ID;
Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);
return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return node&&node.value===attrId
}
}
}Expr.find.TAG=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag)
}else{if(support.qsa){return context.querySelectorAll(tag)
}}}:function(tag,context){var elem,tmp=[],i=0,results=context.getElementsByTagName(tag);
if(tag==="*"){while((elem=results[i++])){if(elem.nodeType===1){tmp.push(elem)
}}return tmp
}return results
};
Expr.find.CLASS=support.getElementsByClassName&&function(className,context){if(documentIsHTML){return context.getElementsByClassName(className)
}};
rbuggyMatches=[];
rbuggyQSA=[];
if((support.qsa=rnative.test(doc.querySelectorAll))){assert(function(div){docElem.appendChild(div).innerHTML="<a id='"+expando+"'></a><select id='"+expando+"-\f]' msallowcapture=''><option selected=''></option></select>";
if(div.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")")
}if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")")
}if(!div.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=")
}if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked")
}if(!div.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]")
}});
assert(function(div){var input=doc.createElement("input");
input.setAttribute("type","hidden");
div.appendChild(input).setAttribute("name","D");
if(div.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=")
}if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled")
}div.querySelectorAll("*,:x");
rbuggyQSA.push(",.*:")
})
}if((support.matchesSelector=rnative.test((matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)))){assert(function(div){support.disconnectedMatch=matches.call(div,"div");
matches.call(div,"[s!='']:x");
rbuggyMatches.push("!=",pseudos)
})
}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));
rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));
hasCompare=rnative.test(docElem.compareDocumentPosition);
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;
return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16))
}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true
}}}return false
};
sortOrder=hasCompare?function(a,b){if(a===b){hasDuplicate=true;
return 0
}var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;
if(compare){return compare
}compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1;
if(compare&1||(!support.sortDetached&&b.compareDocumentPosition(a)===compare)){if(a===doc||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return -1
}if(b===doc||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1
}return sortInput?(indexOf(sortInput,a)-indexOf(sortInput,b)):0
}return compare&4?-1:1
}:function(a,b){if(a===b){hasDuplicate=true;
return 0
}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];
if(!aup||!bup){return a===doc?-1:b===doc?1:aup?-1:bup?1:sortInput?(indexOf(sortInput,a)-indexOf(sortInput,b)):0
}else{if(aup===bup){return siblingCheck(a,b)
}}cur=a;
while((cur=cur.parentNode)){ap.unshift(cur)
}cur=b;
while((cur=cur.parentNode)){bp.unshift(cur)
}while(ap[i]===bp[i]){i++
}return i?siblingCheck(ap[i],bp[i]):ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0
};
return doc
};
Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements)
};
Sizzle.matchesSelector=function(elem,expr){if((elem.ownerDocument||elem)!==document){setDocument(elem)
}expr=expr.replace(rattributeQuotes,"='$1']");
if(support.matchesSelector&&documentIsHTML&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);
if(ret||support.disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret
}}catch(e){}}return Sizzle(expr,document,null,[elem]).length>0
};
Sizzle.contains=function(context,elem){if((context.ownerDocument||context)!==document){setDocument(context)
}return contains(context,elem)
};
Sizzle.attr=function(elem,name){if((elem.ownerDocument||elem)!==document){setDocument(elem)
}var fn=Expr.attrHandle[name.toLowerCase()],val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;
return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null
};
Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg)
};
Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;
hasDuplicate=!support.detectDuplicates;
sortInput=!support.sortStable&&results.slice(0);
results.sort(sortOrder);
if(hasDuplicate){while((elem=results[i++])){if(elem===results[i]){j=duplicates.push(i)
}}while(j--){results.splice(duplicates[j],1)
}}sortInput=null;
return results
};
getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;
if(!nodeType){while((node=elem[i++])){ret+=getText(node)
}}else{if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent
}else{for(elem=elem.firstChild;
elem;
elem=elem.nextSibling){ret+=getText(elem)
}}}else{if(nodeType===3||nodeType===4){return elem.nodeValue
}}}return ret
};
Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(match){match[1]=match[1].replace(runescape,funescape);
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);
if(match[2]==="~="){match[3]=" "+match[3]+" "
}return match.slice(0,4)
},CHILD:function(match){match[1]=match[1].toLowerCase();
if(match[1].slice(0,3)==="nth"){if(!match[3]){Sizzle.error(match[0])
}match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));
match[5]=+((match[7]+match[8])||match[3]==="odd")
}else{if(match[3]){Sizzle.error(match[0])
}}return match
},PSEUDO:function(match){var excess,unquoted=!match[6]&&match[2];
if(matchExpr.CHILD.test(match[0])){return null
}if(match[3]){match[2]=match[4]||match[5]||""
}else{if(unquoted&&rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){match[0]=match[0].slice(0,excess);
match[2]=unquoted.slice(0,excess)
}}return match.slice(0,3)
}},filter:{TAG:function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();
return nodeNameSelector==="*"?function(){return true
}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName
}
},CLASS:function(className){var pattern=classCache[className+" "];
return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"")
})
},ATTR:function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);
if(result==null){return operator==="!="
}if(!operator){return true
}result+="";
return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false
}
},CHILD:function(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";
return first===1&&last===0?function(elem){return !!elem.parentNode
}:function(elem,context,xml){var cache,outerCache,node,diff,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType;
if(parent){if(simple){while(dir){node=elem;
while((node=node[dir])){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false
}}start=dir=type==="only"&&!start&&"nextSibling"
}return true
}start=[forward?parent.firstChild:parent.lastChild];
if(forward&&useCache){outerCache=parent[expando]||(parent[expando]={});
cache=outerCache[type]||[];
nodeIndex=cache[0]===dirruns&&cache[1];
diff=cache[0]===dirruns&&cache[2];
node=nodeIndex&&parent.childNodes[nodeIndex];
while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if(node.nodeType===1&&++diff&&node===elem){outerCache[type]=[dirruns,nodeIndex,diff];
break
}}}else{if(useCache&&(cache=(elem[expando]||(elem[expando]={}))[type])&&cache[0]===dirruns){diff=cache[1]
}else{while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){if(useCache){(node[expando]||(node[expando]={}))[type]=[dirruns,diff]
}if(node===elem){break
}}}}}diff-=last;
return diff===first||(diff%first===0&&diff/first>=0)
}}
},PSEUDO:function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);
if(fn[expando]){return fn(argument)
}if(fn.length>1){args=[pseudo,pseudo,"",argument];
return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;
while(i--){idx=indexOf(seed,matched[i]);
seed[idx]=!(matches[idx]=matched[i])
}}):function(elem){return fn(elem,0,args)
}
}return fn
}},pseudos:{not:markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));
return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;
while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem)
}}}):function(elem,context,xml){input[0]=elem;
matcher(input,null,xml,results);
input[0]=null;
return !results.pop()
}
}),has:markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0
}
}),contains:markFunction(function(text){text=text.replace(runescape,funescape);
return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1
}
}),lang:markFunction(function(lang){if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang)
}lang=lang.replace(runescape,funescape).toLowerCase();
return function(elem){var elemLang;
do{if((elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang"))){elemLang=elemLang.toLowerCase();
return elemLang===lang||elemLang.indexOf(lang+"-")===0
}}while((elem=elem.parentNode)&&elem.nodeType===1);
return false
}
}),target:function(elem){var hash=window.location&&window.location.hash;
return hash&&hash.slice(1)===elem.id
},root:function(elem){return elem===docElem
},focus:function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex)
},enabled:function(elem){return elem.disabled===false
},disabled:function(elem){return elem.disabled===true
},checked:function(elem){var nodeName=elem.nodeName.toLowerCase();
return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected)
},selected:function(elem){if(elem.parentNode){elem.parentNode.selectedIndex
}return elem.selected===true
},empty:function(elem){for(elem=elem.firstChild;
elem;
elem=elem.nextSibling){if(elem.nodeType<6){return false
}}return true
},parent:function(elem){return !Expr.pseudos.empty(elem)
},header:function(elem){return rheader.test(elem.nodeName)
},input:function(elem){return rinputs.test(elem.nodeName)
},button:function(elem){var name=elem.nodeName.toLowerCase();
return name==="input"&&elem.type==="button"||name==="button"
},text:function(elem){var attr;
return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text")
},first:createPositionalPseudo(function(){return[0]
}),last:createPositionalPseudo(function(matchIndexes,length){return[length-1]
}),eq:createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument]
}),even:createPositionalPseudo(function(matchIndexes,length){var i=0;
for(;
i<length;
i+=2){matchIndexes.push(i)
}return matchIndexes
}),odd:createPositionalPseudo(function(matchIndexes,length){var i=1;
for(;
i<length;
i+=2){matchIndexes.push(i)
}return matchIndexes
}),lt:createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;
for(;
--i>=0;
){matchIndexes.push(i)
}return matchIndexes
}),gt:createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;
for(;
++i<length;
){matchIndexes.push(i)
}return matchIndexes
})}};
Expr.pseudos.nth=Expr.pseudos.eq;
for(i in {radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i)
}for(i in {submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i)
}function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;
Expr.setFilters=new setFilters();
tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];
if(cached){return parseOnly?0:cached.slice(0)
}soFar=selector;
groups=[];
preFilters=Expr.preFilter;
while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length)||soFar
}groups.push((tokens=[]))
}matched=false;
if((match=rcombinators.exec(soFar))){matched=match.shift();
tokens.push({value:matched,type:match[0].replace(rtrim," ")});
soFar=soFar.slice(matched.length)
}for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();
tokens.push({value:matched,type:type,matches:match});
soFar=soFar.slice(matched.length)
}}if(!matched){break
}}return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0)
};
function toSelector(tokens){var i=0,len=tokens.length,selector="";
for(;
i<len;
i++){selector+=tokens[i].value
}return selector
}function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&dir==="parentNode",doneName=done++;
return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml)
}}}:function(elem,context,xml){var oldCache,outerCache,newCache=[dirruns,doneName];
if(xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true
}}}}else{while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});
if((oldCache=outerCache[dir])&&oldCache[0]===dirruns&&oldCache[1]===doneName){return(newCache[2]=oldCache[2])
}else{outerCache[dir]=newCache;
if((newCache[2]=matcher(elem,context,xml))){return true
}}}}}}
}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;
while(i--){if(!matchers[i](elem,context,xml)){return false
}}return true
}:matchers[0]
}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;
for(;
i<len;
i++){Sizzle(selector,contexts[i],results)
}return results
}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;
for(;
i<len;
i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);
if(mapped){map.push(i)
}}}}return newUnmatched
}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter)
}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector)
}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;
if(matcher){matcher(matcherIn,matcherOut,context,xml)
}if(postFilter){temp=condense(matcherOut,postMap);
postFilter(temp,[],context,xml);
i=temp.length;
while(i--){if((elem=temp[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem)
}}}if(seed){if(postFinder||preFilter){if(postFinder){temp=[];
i=matcherOut.length;
while(i--){if((elem=matcherOut[i])){temp.push((matcherIn[i]=elem))
}}postFinder(null,(matcherOut=[]),temp,xml)
}i=matcherOut.length;
while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem)
}}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);
if(postFinder){postFinder(null,results,matcherOut,xml)
}else{push.apply(results,matcherOut)
}}})
}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext
},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1
},implicitRelative,true),matchers=[function(elem,context,xml){var ret=(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));
checkContext=null;
return ret
}];
for(;
i<len;
i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)]
}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);
if(matcher[expando]){j=++i;
for(;
j<len;
j++){if(Expr.relative[tokens[j].type]){break
}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&toSelector(tokens))
}matchers.push(matcher)
}}return elementMatcher(matchers)
}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,elems=seed||byElement&&Expr.find.TAG("*",outermost),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.random()||0.1),len=elems.length;
if(outermost){outermostContext=context!==document&&context
}for(;
i!==len&&(elem=elems[i])!=null;
i++){if(byElement&&elem){j=0;
while((matcher=elementMatchers[j++])){if(matcher(elem,context,xml)){results.push(elem);
break
}}if(outermost){dirruns=dirrunsUnique
}}if(bySet){if((elem=!matcher&&elem)){matchedCount--
}if(seed){unmatched.push(elem)
}}}matchedCount+=i;
if(bySet&&i!==matchedCount){j=0;
while((matcher=setMatchers[j++])){matcher(unmatched,setMatched,context,xml)
}if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results)
}}}setMatched=condense(setMatched)
}push.apply(results,setMatched);
if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results)
}}if(outermost){dirruns=dirrunsUnique;
outermostContext=contextBackup
}return unmatched
};
return bySet?markFunction(superMatcher):superMatcher
}compile=Sizzle.compile=function(selector,match){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];
if(!cached){if(!match){match=tokenize(selector)
}i=match.length;
while(i--){cached=matcherFromTokens(match[i]);
if(cached[expando]){setMatchers.push(cached)
}else{elementMatchers.push(cached)
}}cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));
cached.selector=selector
}return cached
};
select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize((selector=compiled.selector||selector));
results=results||[];
if(match.length===1){tokens=match[0]=match[0].slice(0);
if(tokens.length>2&&(token=tokens[0]).type==="ID"&&support.getById&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find.ID(token.matches[0].replace(runescape,funescape),context)||[])[0];
if(!context){return results
}else{if(compiled){context=context.parentNode
}}selector=selector.slice(tokens.shift().value.length)
}i=matchExpr.needsContext.test(selector)?0:tokens.length;
while(i--){token=tokens[i];
if(Expr.relative[(type=token.type)]){break
}if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context))){tokens.splice(i,1);
selector=seed.length&&toSelector(tokens);
if(!selector){push.apply(results,seed);
return results
}break
}}}}(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,rsibling.test(selector)&&testContext(context.parentNode)||context);
return results
};
support.sortStable=expando.split("").sort(sortOrder).join("")===expando;
support.detectDuplicates=!!hasDuplicate;
setDocument();
support.sortDetached=assert(function(div1){return div1.compareDocumentPosition(document.createElement("div"))&1
});
if(!assert(function(div){div.innerHTML="<a href='#'></a>";
return div.firstChild.getAttribute("href")==="#"
})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2)
}})
}if(!support.attributes||!assert(function(div){div.innerHTML="<input/>";
div.firstChild.setAttribute("value","");
return div.firstChild.getAttribute("value")===""
})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue
}})
}if(!assert(function(div){return div.getAttribute("disabled")==null
})){addHandle(booleans,function(elem,name,isXML){var val;
if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null
}})
}return Sizzle
})(window);
jQuery.find=Sizzle;
jQuery.expr=Sizzle.selectors;
jQuery.expr[":"]=jQuery.expr.pseudos;
jQuery.unique=Sizzle.uniqueSort;
jQuery.text=Sizzle.getText;
jQuery.isXMLDoc=Sizzle.isXML;
jQuery.contains=Sizzle.contains;
var rneedsContext=jQuery.expr.match.needsContext;
var rsingleTag=(/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
var risSimple=/^.[^:#\[\.,]*$/;
function winnow(elements,qualifier,not){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return !!qualifier.call(elem,i,elem)!==not
})
}if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return(elem===qualifier)!==not
})
}if(typeof qualifier==="string"){if(risSimple.test(qualifier)){return jQuery.filter(qualifier,elements,not)
}qualifier=jQuery.filter(qualifier,elements)
}return jQuery.grep(elements,function(elem){return(indexOf.call(qualifier,elem)>=0)!==not
})
}jQuery.filter=function(expr,elems,not){var elem=elems[0];
if(not){expr=":not("+expr+")"
}return elems.length===1&&elem.nodeType===1?jQuery.find.matchesSelector(elem,expr)?[elem]:[]:jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1
}))
};
jQuery.fn.extend({find:function(selector){var i,len=this.length,ret=[],self=this;
if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;
i<len;
i++){if(jQuery.contains(self[i],this)){return true
}}}))
}for(i=0;
i<len;
i++){jQuery.find(selector,self[i],ret)
}ret=this.pushStack(len>1?jQuery.unique(ret):ret);
ret.selector=this.selector?this.selector+" "+selector:selector;
return ret
},filter:function(selector){return this.pushStack(winnow(this,selector||[],false))
},not:function(selector){return this.pushStack(winnow(this,selector||[],true))
},is:function(selector){return !!winnow(this,typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length
}});
var rootjQuery,rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,init=jQuery.fn.init=function(selector,context){var match,elem;
if(!selector){return this
}if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){match=[null,selector,null]
}else{match=rquickExpr.exec(selector)
}if(match&&(match[1]||!context)){if(match[1]){context=context instanceof jQuery?context[0]:context;
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true));
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){if(jQuery.isFunction(this[match])){this[match](context[match])
}else{this.attr(match,context[match])
}}}return this
}else{elem=document.getElementById(match[2]);
if(elem&&elem.parentNode){this.length=1;
this[0]=elem
}this.context=document;
this.selector=selector;
return this
}}else{if(!context||context.jquery){return(context||rootjQuery).find(selector)
}else{return this.constructor(context).find(selector)
}}}else{if(selector.nodeType){this.context=this[0]=selector;
this.length=1;
return this
}else{if(jQuery.isFunction(selector)){return typeof rootjQuery.ready!=="undefined"?rootjQuery.ready(selector):selector(jQuery)
}}}if(selector.selector!==undefined){this.selector=selector.selector;
this.context=selector.context
}return jQuery.makeArray(selector,this)
};
init.prototype=jQuery.fn;
rootjQuery=jQuery(document);
var rparentsprev=/^(?:parents|prev(?:Until|All))/,guaranteedUnique={children:true,contents:true,next:true,prev:true};
jQuery.extend({dir:function(elem,dir,until){var matched=[],truncate=until!==undefined;
while((elem=elem[dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break
}matched.push(elem)
}}return matched
},sibling:function(n,elem){var matched=[];
for(;
n;
n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n)
}}return matched
}});
jQuery.fn.extend({has:function(target){var targets=jQuery(target,this),l=targets.length;
return this.filter(function(){var i=0;
for(;
i<l;
i++){if(jQuery.contains(this,targets[i])){return true
}}})
},closest:function(selectors,context){var cur,i=0,l=this.length,matched=[],pos=rneedsContext.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;
for(;
i<l;
i++){for(cur=this[i];
cur&&cur!==context;
cur=cur.parentNode){if(cur.nodeType<11&&(pos?pos.index(cur)>-1:cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);
break
}}}return this.pushStack(matched.length>1?jQuery.unique(matched):matched)
},index:function(elem){if(!elem){return(this[0]&&this[0].parentNode)?this.first().prevAll().length:-1
}if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0])
}return indexOf.call(this,elem.jquery?elem[0]:elem)
},add:function(selector,context){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),jQuery(selector,context))))
},addBack:function(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector))
}});
function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur
}jQuery.each({parent:function(elem){var parent=elem.parentNode;
return parent&&parent.nodeType!==11?parent:null
},parents:function(elem){return jQuery.dir(elem,"parentNode")
},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until)
},next:function(elem){return sibling(elem,"nextSibling")
},prev:function(elem){return sibling(elem,"previousSibling")
},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")
},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")
},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until)
},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until)
},siblings:function(elem){return jQuery.sibling((elem.parentNode||{}).firstChild,elem)
},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return elem.contentDocument||jQuery.merge([],elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);
if(name.slice(-5)!=="Until"){selector=until
}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched)
}if(this.length>1){if(!guaranteedUnique[name]){jQuery.unique(matched)
}if(rparentsprev.test(name)){matched.reverse()
}}return this.pushStack(matched)
}
});
var rnotwhite=(/\S+/g);
var optionsCache={};
function createOptions(options){var object=optionsCache[options]={};
jQuery.each(options.match(rnotwhite)||[],function(_,flag){object[flag]=true
});
return object
}jQuery.Callbacks=function(options){options=typeof options==="string"?(optionsCache[options]||createOptions(options)):jQuery.extend({},options);
var memory,fired,firing,firingStart,firingLength,firingIndex,list=[],stack=!options.once&&[],fire=function(data){memory=options.memory&&data;
fired=true;
firingIndex=firingStart||0;
firingStart=0;
firingLength=list.length;
firing=true;
for(;
list&&firingIndex<firingLength;
firingIndex++){if(list[firingIndex].apply(data[0],data[1])===false&&options.stopOnFalse){memory=false;
break
}}firing=false;
if(list){if(stack){if(stack.length){fire(stack.shift())
}}else{if(memory){list=[]
}else{self.disable()
}}}},self={add:function(){if(list){var start=list.length;
(function add(args){jQuery.each(args,function(_,arg){var type=jQuery.type(arg);
if(type==="function"){if(!options.unique||!self.has(arg)){list.push(arg)
}}else{if(arg&&arg.length&&type!=="string"){add(arg)
}}})
})(arguments);
if(firing){firingLength=list.length
}else{if(memory){firingStart=start;
fire(memory)
}}}return this
},remove:function(){if(list){jQuery.each(arguments,function(_,arg){var index;
while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);
if(firing){if(index<=firingLength){firingLength--
}if(index<=firingIndex){firingIndex--
}}}})
}return this
},has:function(fn){return fn?jQuery.inArray(fn,list)>-1:!!(list&&list.length)
},empty:function(){list=[];
firingLength=0;
return this
},disable:function(){list=stack=memory=undefined;
return this
},disabled:function(){return !list
},lock:function(){stack=undefined;
if(!memory){self.disable()
}return this
},locked:function(){return !stack
},fireWith:function(context,args){if(list&&(!fired||stack)){args=args||[];
args=[context,args.slice?args.slice():args];
if(firing){stack.push(args)
}else{fire(args)
}}return this
},fire:function(){self.fireWith(this,arguments);
return this
},fired:function(){return !!fired
}};
return self
};
jQuery.extend({Deferred:function(func){var tuples=[["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],state="pending",promise={state:function(){return state
},always:function(){deferred.done(arguments).fail(arguments);
return this
},then:function(){var fns=arguments;
return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var fn=jQuery.isFunction(fns[i])&&fns[i];
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);
if(returned&&jQuery.isFunction(returned.promise)){returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
}else{newDefer[tuple[0]+"With"](this===promise?newDefer.promise():this,fn?[returned]:arguments)
}})
});
fns=null
}).promise()
},promise:function(obj){return obj!=null?jQuery.extend(obj,promise):promise
}},deferred={};
promise.pipe=promise.then;
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3];
promise[tuple[1]]=list.add;
if(stateString){list.add(function(){state=stateString
},tuples[i^1][2].disable,tuples[2][2].lock)
}deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?promise:this,arguments);
return this
};
deferred[tuple[0]+"With"]=list.fireWith
});
promise.promise(deferred);
if(func){func.call(deferred,deferred)
}return deferred
},when:function(subordinate){var i=0,resolveValues=slice.call(arguments),length=resolveValues.length,remaining=length!==1||(subordinate&&jQuery.isFunction(subordinate.promise))?length:0,deferred=remaining===1?subordinate:jQuery.Deferred(),updateFunc=function(i,contexts,values){return function(value){contexts[i]=this;
values[i]=arguments.length>1?slice.call(arguments):value;
if(values===progressValues){deferred.notifyWith(contexts,values)
}else{if(!(--remaining)){deferred.resolveWith(contexts,values)
}}}
},progressValues,progressContexts,resolveContexts;
if(length>1){progressValues=new Array(length);
progressContexts=new Array(length);
resolveContexts=new Array(length);
for(;
i<length;
i++){if(resolveValues[i]&&jQuery.isFunction(resolveValues[i].promise)){resolveValues[i].promise().done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject).progress(updateFunc(i,progressContexts,progressValues))
}else{--remaining
}}}if(!remaining){deferred.resolveWith(resolveContexts,resolveValues)
}return deferred.promise()
}});
var readyList;
jQuery.fn.ready=function(fn){jQuery.ready.promise().done(fn);
return this
};
jQuery.extend({isReady:false,readyWait:1,holdReady:function(hold){if(hold){jQuery.readyWait++
}else{jQuery.ready(true)
}},ready:function(wait){if(wait===true?--jQuery.readyWait:jQuery.isReady){return
}jQuery.isReady=true;
if(wait!==true&&--jQuery.readyWait>0){return
}readyList.resolveWith(document,[jQuery]);
if(jQuery.fn.triggerHandler){jQuery(document).triggerHandler("ready");
jQuery(document).off("ready")
}}});
function completed(){document.removeEventListener("DOMContentLoaded",completed,false);
window.removeEventListener("load",completed,false);
jQuery.ready()
}jQuery.ready.promise=function(obj){if(!readyList){readyList=jQuery.Deferred();
if(document.readyState==="complete"){setTimeout(jQuery.ready)
}else{document.addEventListener("DOMContentLoaded",completed,false);
window.addEventListener("load",completed,false)
}}return readyList.promise(obj)
};
jQuery.ready.promise();
var access=jQuery.access=function(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null;
if(jQuery.type(key)==="object"){chainable=true;
for(i in key){jQuery.access(elems,fn,i,key[i],true,emptyGet,raw)
}}else{if(value!==undefined){chainable=true;
if(!jQuery.isFunction(value)){raw=true
}if(bulk){if(raw){fn.call(elems,value);
fn=null
}else{bulk=fn;
fn=function(elem,key,value){return bulk.call(jQuery(elem),value)
}
}}if(fn){for(;
i<len;
i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)))
}}}}return chainable?elems:bulk?fn.call(elems):len?fn(elems[0],key):emptyGet
};
jQuery.acceptData=function(owner){return owner.nodeType===1||owner.nodeType===9||!(+owner.nodeType)
};
function Data(){Object.defineProperty(this.cache={},0,{get:function(){return{}
}});
this.expando=jQuery.expando+Data.uid++
}Data.uid=1;
Data.accepts=jQuery.acceptData;
Data.prototype={key:function(owner){if(!Data.accepts(owner)){return 0
}var descriptor={},unlock=owner[this.expando];
if(!unlock){unlock=Data.uid++;
try{descriptor[this.expando]={value:unlock};
Object.defineProperties(owner,descriptor)
}catch(e){descriptor[this.expando]=unlock;
jQuery.extend(owner,descriptor)
}}if(!this.cache[unlock]){this.cache[unlock]={}
}return unlock
},set:function(owner,data,value){var prop,unlock=this.key(owner),cache=this.cache[unlock];
if(typeof data==="string"){cache[data]=value
}else{if(jQuery.isEmptyObject(cache)){jQuery.extend(this.cache[unlock],data)
}else{for(prop in data){cache[prop]=data[prop]
}}}return cache
},get:function(owner,key){var cache=this.cache[this.key(owner)];
return key===undefined?cache:cache[key]
},access:function(owner,key,value){var stored;
if(key===undefined||((key&&typeof key==="string")&&value===undefined)){stored=this.get(owner,key);
return stored!==undefined?stored:this.get(owner,jQuery.camelCase(key))
}this.set(owner,key,value);
return value!==undefined?value:key
},remove:function(owner,key){var i,name,camel,unlock=this.key(owner),cache=this.cache[unlock];
if(key===undefined){this.cache[unlock]={}
}else{if(jQuery.isArray(key)){name=key.concat(key.map(jQuery.camelCase))
}else{camel=jQuery.camelCase(key);
if(key in cache){name=[key,camel]
}else{name=camel;
name=name in cache?[name]:(name.match(rnotwhite)||[])
}}i=name.length;
while(i--){delete cache[name[i]]
}}},hasData:function(owner){return !jQuery.isEmptyObject(this.cache[owner[this.expando]]||{})
},discard:function(owner){if(owner[this.expando]){delete this.cache[owner[this.expando]]
}}};
var data_priv=new Data();
var data_user=new Data();
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/([A-Z])/g;
function dataAttr(elem,key,data){var name;
if(data===undefined&&elem.nodeType===1){name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();
data=elem.getAttribute(name);
if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:+data+""===data?+data:rbrace.test(data)?jQuery.parseJSON(data):data
}catch(e){}data_user.set(elem,key,data)
}else{data=undefined
}}return data
}jQuery.extend({hasData:function(elem){return data_user.hasData(elem)||data_priv.hasData(elem)
},data:function(elem,name,data){return data_user.access(elem,name,data)
},removeData:function(elem,name){data_user.remove(elem,name)
},_data:function(elem,name,data){return data_priv.access(elem,name,data)
},_removeData:function(elem,name){data_priv.remove(elem,name)
}});
jQuery.fn.extend({data:function(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes;
if(key===undefined){if(this.length){data=data_user.get(elem);
if(elem.nodeType===1&&!data_priv.get(elem,"hasDataAttrs")){i=attrs.length;
while(i--){if(attrs[i]){name=attrs[i].name;
if(name.indexOf("data-")===0){name=jQuery.camelCase(name.slice(5));
dataAttr(elem,name,data[name])
}}}data_priv.set(elem,"hasDataAttrs",true)
}}return data
}if(typeof key==="object"){return this.each(function(){data_user.set(this,key)
})
}return access(this,function(value){var data,camelKey=jQuery.camelCase(key);
if(elem&&value===undefined){data=data_user.get(elem,key);
if(data!==undefined){return data
}data=data_user.get(elem,camelKey);
if(data!==undefined){return data
}data=dataAttr(elem,camelKey,undefined);
if(data!==undefined){return data
}return
}this.each(function(){var data=data_user.get(this,camelKey);
data_user.set(this,camelKey,value);
if(key.indexOf("-")!==-1&&data!==undefined){data_user.set(this,key,value)
}})
},null,value,arguments.length>1,null,true)
},removeData:function(key){return this.each(function(){data_user.remove(this,key)
})
}});
jQuery.extend({queue:function(elem,type,data){var queue;
if(elem){type=(type||"fx")+"queue";
queue=data_priv.get(elem,type);
if(data){if(!queue||jQuery.isArray(data)){queue=data_priv.access(elem,type,jQuery.makeArray(data))
}else{queue.push(data)
}}return queue||[]
}},dequeue:function(elem,type){type=type||"fx";
var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function(){jQuery.dequeue(elem,type)
};
if(fn==="inprogress"){fn=queue.shift();
startLength--
}if(fn){if(type==="fx"){queue.unshift("inprogress")
}delete hooks.stop;
fn.call(elem,next,hooks)
}if(!startLength&&hooks){hooks.empty.fire()
}},_queueHooks:function(elem,type){var key=type+"queueHooks";
return data_priv.get(elem,key)||data_priv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){data_priv.remove(elem,[type+"queue",key])
})})
}});
jQuery.fn.extend({queue:function(type,data){var setter=2;
if(typeof type!=="string"){data=type;
type="fx";
setter--
}if(arguments.length<setter){return jQuery.queue(this[0],type)
}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);
jQuery._queueHooks(this,type);
if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type)
}})
},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type)
})
},clearQueue:function(type){return this.queue(type||"fx",[])
},promise:function(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function(){if(!(--count)){defer.resolveWith(elements,[elements])
}};
if(typeof type!=="string"){obj=type;
type=undefined
}type=type||"fx";
while(i--){tmp=data_priv.get(elements[i],type+"queueHooks");
if(tmp&&tmp.empty){count++;
tmp.empty.add(resolve)
}}resolve();
return defer.promise(obj)
}});
var pnum=(/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
var cssExpand=["Top","Right","Bottom","Left"];
var isHidden=function(elem,el){elem=el||elem;
return jQuery.css(elem,"display")==="none"||!jQuery.contains(elem.ownerDocument,elem)
};
var rcheckableType=(/^(?:checkbox|radio)$/i);
(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input");
input.setAttribute("type","radio");
input.setAttribute("checked","checked");
input.setAttribute("name","t");
div.appendChild(input);
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked;
div.innerHTML="<textarea>x</textarea>";
support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue
})();
var strundefined=typeof undefined;
support.focusinBubbles="onfocusin" in window;
var rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|pointer|contextmenu)|click/,rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,rtypenamespace=/^([^.]*)(?:\.(.+)|)$/;
function returnTrue(){return true
}function returnFalse(){return false
}function safeActiveElement(){try{return document.activeElement
}catch(err){}}jQuery.event={global:{},add:function(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=data_priv.get(elem);
if(!elemData){return
}if(handler.handler){handleObjIn=handler;
handler=handleObjIn.handler;
selector=handleObjIn.selector
}if(!handler.guid){handler.guid=jQuery.guid++
}if(!(events=elemData.events)){events=elemData.events={}
}if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){return typeof jQuery!==strundefined&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):undefined
}
}types=(types||"").match(rnotwhite)||[""];
t=types.length;
while(t--){tmp=rtypenamespace.exec(types[t])||[];
type=origType=tmp[1];
namespaces=(tmp[2]||"").split(".").sort();
if(!type){continue
}special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
special=jQuery.event.special[type]||{};
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);
if(!(handlers=events[type])){handlers=events[type]=[];
handlers.delegateCount=0;
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false)
}}}if(special.add){special.add.call(elem,handleObj);
if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid
}}if(selector){handlers.splice(handlers.delegateCount++,0,handleObj)
}else{handlers.push(handleObj)
}jQuery.event.global[type]=true
}},remove:function(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=data_priv.hasData(elem)&&data_priv.get(elem);
if(!elemData||!(events=elemData.events)){return
}types=(types||"").match(rnotwhite)||[""];
t=types.length;
while(t--){tmp=rtypenamespace.exec(types[t])||[];
type=origType=tmp[1];
namespaces=(tmp[2]||"").split(".").sort();
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true)
}continue
}special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
handlers=events[type]||[];
tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)");
origCount=j=handlers.length;
while(j--){handleObj=handlers[j];
if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);
if(handleObj.selector){handlers.delegateCount--
}if(special.remove){special.remove.call(elem,handleObj)
}}}if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle)
}delete events[type]
}}if(jQuery.isEmptyObject(events)){delete elemData.handle;
data_priv.remove(elem,"events")
}},trigger:function(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];
cur=tmp=elem=elem||document;
if(elem.nodeType===3||elem.nodeType===8){return
}if(rfocusMorph.test(type+jQuery.event.triggered)){return
}if(type.indexOf(".")>=0){namespaces=type.split(".");
type=namespaces.shift();
namespaces.sort()
}ontype=type.indexOf(":")<0&&"on"+type;
event=event[jQuery.expando]?event:new jQuery.Event(type,typeof event==="object"&&event);
event.isTrigger=onlyHandlers?2:3;
event.namespace=namespaces.join(".");
event.namespace_re=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
event.result=undefined;
if(!event.target){event.target=elem
}data=data==null?[event]:jQuery.makeArray(data,[event]);
special=jQuery.event.special[type]||{};
if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return
}if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;
if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode
}for(;
cur;
cur=cur.parentNode){eventPath.push(cur);
tmp=cur
}if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window)
}}i=0;
while((cur=eventPath[i++])&&!event.isPropagationStopped()){event.type=i>1?bubbleType:special.bindType||type;
handle=(data_priv.get(cur,"events")||{})[event.type]&&data_priv.get(cur,"handle");
if(handle){handle.apply(cur,data)
}handle=ontype&&cur[ontype];
if(handle&&handle.apply&&jQuery.acceptData(cur)){event.result=handle.apply(cur,data);
if(event.result===false){event.preventDefault()
}}}event.type=type;
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&jQuery.acceptData(elem)){if(ontype&&jQuery.isFunction(elem[type])&&!jQuery.isWindow(elem)){tmp=elem[ontype];
if(tmp){elem[ontype]=null
}jQuery.event.triggered=type;
elem[type]();
jQuery.event.triggered=undefined;
if(tmp){elem[ontype]=tmp
}}}}return event.result
},dispatch:function(event){event=jQuery.event.fix(event);
var i,j,ret,matched,handleObj,handlerQueue=[],args=slice.call(arguments),handlers=(data_priv.get(this,"events")||{})[event.type]||[],special=jQuery.event.special[event.type]||{};
args[0]=event;
event.delegateTarget=this;
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return
}handlerQueue=jQuery.event.handlers.call(this,event,handlers);
i=0;
while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;
j=0;
while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){if(!event.namespace_re||event.namespace_re.test(handleObj.namespace)){event.handleObj=handleObj;
event.data=handleObj.data;
ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);
if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();
event.stopPropagation()
}}}}}if(special.postDispatch){special.postDispatch.call(this,event)
}return event.result
},handlers:function(event,handlers){var i,matches,sel,handleObj,handlerQueue=[],delegateCount=handlers.delegateCount,cur=event.target;
if(delegateCount&&cur.nodeType&&(!event.button||event.type!=="click")){for(;
cur!==this;
cur=cur.parentNode||this){if(cur.disabled!==true||event.type!=="click"){matches=[];
for(i=0;
i<delegateCount;
i++){handleObj=handlers[i];
sel=handleObj.selector+" ";
if(matches[sel]===undefined){matches[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>=0:jQuery.find(sel,this,null,[cur]).length
}if(matches[sel]){matches.push(handleObj)
}}if(matches.length){handlerQueue.push({elem:cur,handlers:matches})
}}}}if(delegateCount<handlers.length){handlerQueue.push({elem:this,handlers:handlers.slice(delegateCount)})
}return handlerQueue
},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(event,original){if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode
}return event
}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(event,original){var eventDoc,doc,body,button=original.button;
if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;
doc=eventDoc.documentElement;
body=eventDoc.body;
event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)
}if(!event.which&&button!==undefined){event.which=(button&1?1:(button&2?3:(button&4?2:0)))
}return event
}},fix:function(event){if(event[jQuery.expando]){return event
}var i,prop,copy,type=event.type,originalEvent=event,fixHook=this.fixHooks[type];
if(!fixHook){this.fixHooks[type]=fixHook=rmouseEvent.test(type)?this.mouseHooks:rkeyEvent.test(type)?this.keyHooks:{}
}copy=fixHook.props?this.props.concat(fixHook.props):this.props;
event=new jQuery.Event(originalEvent);
i=copy.length;
while(i--){prop=copy[i];
event[prop]=originalEvent[prop]
}if(!event.target){event.target=document
}if(event.target.nodeType===3){event.target=event.target.parentNode
}return fixHook.filter?fixHook.filter(event,originalEvent):event
},special:{load:{noBubble:true},focus:{trigger:function(){if(this!==safeActiveElement()&&this.focus){this.focus();
return false
}},delegateType:"focusin"},blur:{trigger:function(){if(this===safeActiveElement()&&this.blur){this.blur();
return false
}},delegateType:"focusout"},click:{trigger:function(){if(this.type==="checkbox"&&this.click&&jQuery.nodeName(this,"input")){this.click();
return false
}},_default:function(event){return jQuery.nodeName(event.target,"a")
}},beforeunload:{postDispatch:function(event){if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result
}}}},simulate:function(type,elem,event,bubble){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true,originalEvent:{}});
if(bubble){jQuery.event.trigger(e,null,elem)
}else{jQuery.event.dispatch.call(elem,e)
}if(e.isDefaultPrevented()){event.preventDefault()
}}};
jQuery.removeEvent=function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false)
}};
jQuery.Event=function(src,props){if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props)
}if(src&&src.type){this.originalEvent=src;
this.type=src.type;
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&&src.returnValue===false?returnTrue:returnFalse
}else{this.type=src
}if(props){jQuery.extend(this,props)
}this.timeStamp=src&&src.timeStamp||jQuery.now();
this[jQuery.expando]=true
};
jQuery.Event.prototype={isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,preventDefault:function(){var e=this.originalEvent;
this.isDefaultPrevented=returnTrue;
if(e&&e.preventDefault){e.preventDefault()
}},stopPropagation:function(){var e=this.originalEvent;
this.isPropagationStopped=returnTrue;
if(e&&e.stopPropagation){e.stopPropagation()
}},stopImmediatePropagation:function(){var e=this.originalEvent;
this.isImmediatePropagationStopped=returnTrue;
if(e&&e.stopImmediatePropagation){e.stopImmediatePropagation()
}this.stopPropagation()
}};
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;
if(!related||(related!==target&&!jQuery.contains(target,related))){event.type=handleObj.origType;
ret=handleObj.handler.apply(this,arguments);
event.type=fix
}return ret
}}
});
if(!support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){var handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true)
};
jQuery.event.special[fix]={setup:function(){var doc=this.ownerDocument||this,attaches=data_priv.access(doc,fix);
if(!attaches){doc.addEventListener(orig,handler,true)
}data_priv.access(doc,fix,(attaches||0)+1)
},teardown:function(){var doc=this.ownerDocument||this,attaches=data_priv.access(doc,fix)-1;
if(!attaches){doc.removeEventListener(orig,handler,true);
data_priv.remove(doc,fix)
}else{data_priv.access(doc,fix,attaches)
}}}
})
}jQuery.fn.extend({on:function(types,selector,data,fn,one){var origFn,type;
if(typeof types==="object"){if(typeof selector!=="string"){data=data||selector;
selector=undefined
}for(type in types){this.on(type,selector,data,types[type],one)
}return this
}if(data==null&&fn==null){fn=selector;
data=selector=undefined
}else{if(fn==null){if(typeof selector==="string"){fn=data;
data=undefined
}else{fn=data;
data=selector;
selector=undefined
}}}if(fn===false){fn=returnFalse
}else{if(!fn){return this
}}if(one===1){origFn=fn;
fn=function(event){jQuery().off(event);
return origFn.apply(this,arguments)
};
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++)
}return this.each(function(){jQuery.event.add(this,types,fn,data,selector)
})
},one:function(types,selector,data,fn){return this.on(types,selector,data,fn,1)
},off:function(types,selector,fn){var handleObj,type;
if(types&&types.preventDefault&&types.handleObj){handleObj=types.handleObj;
jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);
return this
}if(typeof types==="object"){for(type in types){this.off(type,selector,types[type])
}return this
}if(selector===false||typeof selector==="function"){fn=selector;
selector=undefined
}if(fn===false){fn=returnFalse
}return this.each(function(){jQuery.event.remove(this,types,fn,selector)
})
},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this)
})
},triggerHandler:function(type,data){var elem=this[0];
if(elem){return jQuery.event.trigger(type,data,elem,true)
}}});
var rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,rtagName=/<([\w:]+)/,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style|link)/i,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/^$|\/(?:java|ecma)script/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};
wrapMap.optgroup=wrapMap.option;
wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;
wrapMap.th=wrapMap.td;
function manipulationTarget(elem,content){return jQuery.nodeName(elem,"table")&&jQuery.nodeName(content.nodeType!==11?content:content.firstChild,"tr")?elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody")):elem
}function disableScript(elem){elem.type=(elem.getAttribute("type")!==null)+"/"+elem.type;
return elem
}function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);
if(match){elem.type=match[1]
}else{elem.removeAttribute("type")
}return elem
}function setGlobalEval(elems,refElements){var i=0,l=elems.length;
for(;
i<l;
i++){data_priv.set(elems[i],"globalEval",!refElements||data_priv.get(refElements[i],"globalEval"))
}}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,pdataCur,udataOld,udataCur,events;
if(dest.nodeType!==1){return
}if(data_priv.hasData(src)){pdataOld=data_priv.access(src);
pdataCur=data_priv.set(dest,pdataOld);
events=pdataOld.events;
if(events){delete pdataCur.handle;
pdataCur.events={};
for(type in events){for(i=0,l=events[type].length;
i<l;
i++){jQuery.event.add(dest,type,events[type][i])
}}}}if(data_user.hasData(src)){udataOld=data_user.access(src);
udataCur=jQuery.extend({},udataOld);
data_user.set(dest,udataCur)
}}function getAll(context,tag){var ret=context.getElementsByTagName?context.getElementsByTagName(tag||"*"):context.querySelectorAll?context.querySelectorAll(tag||"*"):[];
return tag===undefined||tag&&jQuery.nodeName(context,tag)?jQuery.merge([context],ret):ret
}function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase();
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked
}else{if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue
}}}jQuery.extend({clone:function(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=jQuery.contains(elem.ownerDocument,elem);
if(!support.noCloneChecked&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){destElements=getAll(clone);
srcElements=getAll(elem);
for(i=0,l=srcElements.length;
i<l;
i++){fixInput(srcElements[i],destElements[i])
}}if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);
destElements=destElements||getAll(clone);
for(i=0,l=srcElements.length;
i<l;
i++){cloneCopyEvent(srcElements[i],destElements[i])
}}else{cloneCopyEvent(elem,clone)
}}destElements=getAll(clone,"script");
if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"))
}return clone
},buildFragment:function(elems,context,scripts,selection){var elem,tmp,tag,wrap,contains,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;
for(;
i<l;
i++){elem=elems[i];
if(elem||elem===0){if(jQuery.type(elem)==="object"){jQuery.merge(nodes,elem.nodeType?[elem]:elem)
}else{if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem))
}else{tmp=tmp||fragment.appendChild(context.createElement("div"));
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();
wrap=wrapMap[tag]||wrapMap._default;
tmp.innerHTML=wrap[1]+elem.replace(rxhtmlTag,"<$1></$2>")+wrap[2];
j=wrap[0];
while(j--){tmp=tmp.lastChild
}jQuery.merge(nodes,tmp.childNodes);
tmp=fragment.firstChild;
tmp.textContent=""
}}}}fragment.textContent="";
i=0;
while((elem=nodes[i++])){if(selection&&jQuery.inArray(elem,selection)!==-1){continue
}contains=jQuery.contains(elem.ownerDocument,elem);
tmp=getAll(fragment.appendChild(elem),"script");
if(contains){setGlobalEval(tmp)
}if(scripts){j=0;
while((elem=tmp[j++])){if(rscriptType.test(elem.type||"")){scripts.push(elem)
}}}}return fragment
},cleanData:function(elems){var data,elem,type,key,special=jQuery.event.special,i=0;
for(;
(elem=elems[i])!==undefined;
i++){if(jQuery.acceptData(elem)){key=elem[data_priv.expando];
if(key&&(data=data_priv.cache[key])){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type)
}else{jQuery.removeEvent(elem,type,data.handle)
}}}if(data_priv.cache[key]){delete data_priv.cache[key]
}}}delete data_user.cache[elem[data_user.expando]]
}}});
jQuery.fn.extend({text:function(value){return access(this,function(value){return value===undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.textContent=value
}})
},null,value,arguments.length)
},append:function(){return this.domManip(arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);
target.appendChild(elem)
}})
},prepend:function(){return this.domManip(arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);
target.insertBefore(elem,target.firstChild)
}})
},before:function(){return this.domManip(arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this)
}})
},after:function(){return this.domManip(arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling)
}})
},remove:function(selector,keepData){var elem,elems=selector?jQuery.filter(selector,this):this,i=0;
for(;
(elem=elems[i])!=null;
i++){if(!keepData&&elem.nodeType===1){jQuery.cleanData(getAll(elem))
}if(elem.parentNode){if(keepData&&jQuery.contains(elem.ownerDocument,elem)){setGlobalEval(getAll(elem,"script"))
}elem.parentNode.removeChild(elem)
}}return this
},empty:function(){var elem,i=0;
for(;
(elem=this[i])!=null;
i++){if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));
elem.textContent=""
}}return this
},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;
deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;
return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents)
})
},html:function(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;
if(value===undefined&&elem.nodeType===1){return elem.innerHTML
}if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");
try{for(;
i<l;
i++){elem=this[i]||{};
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));
elem.innerHTML=value
}}elem=0
}catch(e){}}if(elem){this.empty().append(value)
}},null,value,arguments.length)
},replaceWith:function(){var arg=arguments[0];
this.domManip(arguments,function(elem){arg=this.parentNode;
jQuery.cleanData(getAll(this));
if(arg){arg.replaceChild(elem,this)
}});
return arg&&(arg.length||arg.nodeType)?this:this.remove()
},detach:function(selector){return this.remove(selector,true)
},domManip:function(args,callback){args=concat.apply([],args);
var fragment,first,scripts,hasScripts,node,doc,i=0,l=this.length,set=this,iNoClone=l-1,value=args[0],isFunction=jQuery.isFunction(value);
if(isFunction||(l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value))){return this.each(function(index){var self=set.eq(index);
if(isFunction){args[0]=value.call(this,index,self.html())
}self.domManip(args,callback)
})
}if(l){fragment=jQuery.buildFragment(args,this[0].ownerDocument,false,this);
first=fragment.firstChild;
if(fragment.childNodes.length===1){fragment=first
}if(first){scripts=jQuery.map(getAll(fragment,"script"),disableScript);
hasScripts=scripts.length;
for(;
i<l;
i++){node=fragment;
if(i!==iNoClone){node=jQuery.clone(node,true,true);
if(hasScripts){jQuery.merge(scripts,getAll(node,"script"))
}}callback.call(this[i],node,i)
}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument;
jQuery.map(scripts,restoreScript);
for(i=0;
i<hasScripts;
i++){node=scripts[i];
if(rscriptType.test(node.type||"")&&!data_priv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src){if(jQuery._evalUrl){jQuery._evalUrl(node.src)
}}else{jQuery.globalEval(node.textContent.replace(rcleanScript,""))
}}}}}}return this
}});
jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;
for(;
i<=last;
i++){elems=i===last?this:this.clone(true);
jQuery(insert[i])[original](elems);
push.apply(ret,elems.get())
}return this.pushStack(ret)
}
});
var iframe,elemdisplay={};
function actualDisplay(name,doc){var style,elem=jQuery(doc.createElement(name)).appendTo(doc.body),display=window.getDefaultComputedStyle&&(style=window.getDefaultComputedStyle(elem[0]))?style.display:jQuery.css(elem[0],"display");
elem.detach();
return display
}function defaultDisplay(nodeName){var doc=document,display=elemdisplay[nodeName];
if(!display){display=actualDisplay(nodeName,doc);
if(display==="none"||!display){iframe=(iframe||jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
doc=iframe[0].contentDocument;
doc.write();
doc.close();
display=actualDisplay(nodeName,doc);
iframe.detach()
}elemdisplay[nodeName]=display
}return display
}var rmargin=(/^margin/);
var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");
var getStyles=function(elem){if(elem.ownerDocument.defaultView.opener){return elem.ownerDocument.defaultView.getComputedStyle(elem,null)
}return window.getComputedStyle(elem,null)
};
function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,style=elem.style;
computed=computed||getStyles(elem);
if(computed){ret=computed.getPropertyValue(name)||computed[name]
}if(computed){if(ret===""&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name)
}if(rnumnonpx.test(ret)&&rmargin.test(name)){width=style.width;
minWidth=style.minWidth;
maxWidth=style.maxWidth;
style.minWidth=style.maxWidth=style.width=ret;
ret=computed.width;
style.width=width;
style.minWidth=minWidth;
style.maxWidth=maxWidth
}}return ret!==undefined?ret+"":ret
}function addGetHookIf(conditionFn,hookFn){return{get:function(){if(conditionFn()){delete this.get;
return
}return(this.get=hookFn).apply(this,arguments)
}}
}(function(){var pixelPositionVal,boxSizingReliableVal,docElem=document.documentElement,container=document.createElement("div"),div=document.createElement("div");
if(!div.style){return
}div.style.backgroundClip="content-box";
div.cloneNode(true).style.backgroundClip="";
support.clearCloneStyle=div.style.backgroundClip==="content-box";
container.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute";
container.appendChild(div);
function computePixelPositionAndBoxSizingReliable(){div.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
div.innerHTML="";
docElem.appendChild(container);
var divStyle=window.getComputedStyle(div,null);
pixelPositionVal=divStyle.top!=="1%";
boxSizingReliableVal=divStyle.width==="4px";
docElem.removeChild(container)
}if(window.getComputedStyle){jQuery.extend(support,{pixelPosition:function(){computePixelPositionAndBoxSizingReliable();
return pixelPositionVal
},boxSizingReliable:function(){if(boxSizingReliableVal==null){computePixelPositionAndBoxSizingReliable()
}return boxSizingReliableVal
},reliableMarginRight:function(){var ret,marginDiv=div.appendChild(document.createElement("div"));
marginDiv.style.cssText=div.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
marginDiv.style.marginRight=marginDiv.style.width="0";
div.style.width="1px";
docElem.appendChild(container);
ret=!parseFloat(window.getComputedStyle(marginDiv,null).marginRight);
docElem.removeChild(container);
div.removeChild(marginDiv);
return ret
}})
}})();
jQuery.swap=function(elem,options,callback,args){var ret,name,old={};
for(name in options){old[name]=elem.style[name];
elem.style[name]=options[name]
}ret=callback.apply(elem,args||[]);
for(name in options){elem.style[name]=old[name]
}return ret
};
var rdisplayswap=/^(none|table(?!-c[ea]).+)/,rnumsplit=new RegExp("^("+pnum+")(.*)$","i"),rrelNum=new RegExp("^([+-])=("+pnum+")","i"),cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"},cssPrefixes=["Webkit","O","Moz","ms"];
function vendorPropName(style,name){if(name in style){return name
}var capName=name[0].toUpperCase()+name.slice(1),origName=name,i=cssPrefixes.length;
while(i--){name=cssPrefixes[i]+capName;
if(name in style){return name
}}return origName
}function setPositiveNumber(elem,value,subtract){var matches=rnumsplit.exec(value);
return matches?Math.max(0,matches[1]-(subtract||0))+(matches[2]||"px"):value
}function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i=extra===(isBorderBox?"border":"content")?4:name==="width"?1:0,val=0;
for(;
i<4;
i+=2){if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true,styles)
}if(isBorderBox){if(extra==="content"){val-=jQuery.css(elem,"padding"+cssExpand[i],true,styles)
}if(extra!=="margin"){val-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles)
}}else{val+=jQuery.css(elem,"padding"+cssExpand[i],true,styles);
if(extra!=="padding"){val+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles)
}}}return val
}function getWidthOrHeight(elem,name,extra){var valueIsBorderBox=true,val=name==="width"?elem.offsetWidth:elem.offsetHeight,styles=getStyles(elem),isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box";
if(val<=0||val==null){val=curCSS(elem,name,styles);
if(val<0||val==null){val=elem.style[name]
}if(rnumnonpx.test(val)){return val
}valueIsBorderBox=isBorderBox&&(support.boxSizingReliable()||val===elem.style[name]);
val=parseFloat(val)||0
}return(val+augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles))+"px"
}function showHide(elements,show){var display,elem,hidden,values=[],index=0,length=elements.length;
for(;
index<length;
index++){elem=elements[index];
if(!elem.style){continue
}values[index]=data_priv.get(elem,"olddisplay");
display=elem.style.display;
if(show){if(!values[index]&&display==="none"){elem.style.display=""
}if(elem.style.display===""&&isHidden(elem)){values[index]=data_priv.access(elem,"olddisplay",defaultDisplay(elem.nodeName))
}}else{hidden=isHidden(elem);
if(display!=="none"||!hidden){data_priv.set(elem,"olddisplay",hidden?display:jQuery.css(elem,"display"))
}}}for(index=0;
index<length;
index++){elem=elements[index];
if(!elem.style){continue
}if(!show||elem.style.display==="none"||elem.style.display===""){elem.style.display=show?values[index]||"":"none"
}}return elements
}jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity");
return ret===""?"1":ret
}}}},cssNumber:{columnCount:true,fillOpacity:true,flexGrow:true,flexShrink:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":"cssFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return
}var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;
name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(style,origName));
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];
if(value!==undefined){type=typeof value;
if(type==="string"&&(ret=rrelNum.exec(value))){value=(ret[1]+1)*ret[2]+parseFloat(jQuery.css(elem,name));
type="number"
}if(value==null||value!==value){return
}if(type==="number"&&!jQuery.cssNumber[origName]){value+="px"
}if(!support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit"
}if(!hooks||!("set" in hooks)||(value=hooks.set(elem,value,extra))!==undefined){style[name]=value
}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret
}return style[name]
}},css:function(elem,name,extra,styles){var val,num,hooks,origName=jQuery.camelCase(name);
name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(elem.style,origName));
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];
if(hooks&&"get" in hooks){val=hooks.get(elem,true,extra)
}if(val===undefined){val=curCSS(elem,name,styles)
}if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name]
}if(extra===""||extra){num=parseFloat(val);
return extra===true||jQuery.isNumeric(num)?num||0:val
}return val
}});
jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){if(computed){return rdisplayswap.test(jQuery.css(elem,"display"))&&elem.offsetWidth===0?jQuery.swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra)
}):getWidthOrHeight(elem,name,extra)
}},set:function(elem,value,extra){var styles=extra&&getStyles(elem);
return setPositiveNumber(elem,value,extra?augmentWidthOrHeight(elem,name,extra,jQuery.css(elem,"boxSizing",false,styles)==="border-box",styles):0)
}}
});
jQuery.cssHooks.marginRight=addGetHookIf(support.reliableMarginRight,function(elem,computed){if(computed){return jQuery.swap(elem,{display:"inline-block"},curCSS,[elem,"marginRight"])
}});
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function(value){var i=0,expanded={},parts=typeof value==="string"?value.split(" "):[value];
for(;
i<4;
i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0]
}return expanded
}};
if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber
}});
jQuery.fn.extend({css:function(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;
if(jQuery.isArray(name)){styles=getStyles(elem);
len=name.length;
for(;
i<len;
i++){map[name[i]]=jQuery.css(elem,name[i],false,styles)
}return map
}return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name)
},name,value,arguments.length>1)
},show:function(){return showHide(this,true)
},hide:function(){return showHide(this)
},toggle:function(state){if(typeof state==="boolean"){return state?this.show():this.hide()
}return this.each(function(){if(isHidden(this)){jQuery(this).show()
}else{jQuery(this).hide()
}})
}});
function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing)
}jQuery.Tween=Tween;
Tween.prototype={constructor:Tween,init:function(elem,options,prop,end,easing,unit){this.elem=elem;
this.prop=prop;
this.easing=easing||"swing";
this.options=options;
this.start=this.now=this.cur();
this.end=end;
this.unit=unit||(jQuery.cssNumber[prop]?"":"px")
},cur:function(){var hooks=Tween.propHooks[this.prop];
return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this)
},run:function(percent){var eased,hooks=Tween.propHooks[this.prop];
if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration)
}else{this.pos=eased=percent
}this.now=(this.end-this.start)*eased+this.start;
if(this.options.step){this.options.step.call(this.elem,this.now,this)
}if(hooks&&hooks.set){hooks.set(this)
}else{Tween.propHooks._default.set(this)
}return this
}};
Tween.prototype.init.prototype=Tween.prototype;
Tween.propHooks={_default:{get:function(tween){var result;
if(tween.elem[tween.prop]!=null&&(!tween.elem.style||tween.elem.style[tween.prop]==null)){return tween.elem[tween.prop]
}result=jQuery.css(tween.elem,tween.prop,"");
return !result||result==="auto"?0:result
},set:function(tween){if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween)
}else{if(tween.elem.style&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit)
}else{tween.elem[tween.prop]=tween.now
}}}}};
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now
}}};
jQuery.easing={linear:function(p){return p
},swing:function(p){return 0.5-Math.cos(p*Math.PI)/2
}};
jQuery.fx=Tween.prototype.init;
jQuery.fx.step={};
var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i"),rrun=/queueHooks$/,animationPrefilters=[defaultPrefilter],tweeners={"*":[function(prop,value){var tween=this.createTween(prop,value),target=tween.cur(),parts=rfxnum.exec(value),unit=parts&&parts[3]||(jQuery.cssNumber[prop]?"":"px"),start=(jQuery.cssNumber[prop]||unit!=="px"&&+target)&&rfxnum.exec(jQuery.css(tween.elem,prop)),scale=1,maxIterations=20;
if(start&&start[3]!==unit){unit=unit||start[3];
parts=parts||[];
start=+target||1;
do{scale=scale||".5";
start=start/scale;
jQuery.style(tween.elem,prop,start+unit)
}while(scale!==(scale=tween.cur()/target)&&scale!==1&&--maxIterations)
}if(parts){start=tween.start=+start||+target||0;
tween.unit=unit;
tween.end=parts[1]?start+(parts[1]+1)*parts[2]:+parts[2]
}return tween
}]};
function createFxNow(){setTimeout(function(){fxNow=undefined
});
return(fxNow=jQuery.now())
}function genFx(type,includeWidth){var which,i=0,attrs={height:type};
includeWidth=includeWidth?1:0;
for(;
i<4;
i+=2-includeWidth){which=cssExpand[i];
attrs["margin"+which]=attrs["padding"+which]=type
}if(includeWidth){attrs.opacity=attrs.width=type
}return attrs
}function createTween(value,prop,animation){var tween,collection=(tweeners[prop]||[]).concat(tweeners["*"]),index=0,length=collection.length;
for(;
index<length;
index++){if((tween=collection[index].call(animation,prop,value))){return tween
}}}function defaultPrefilter(elem,props,opts){var prop,value,toggle,tween,hooks,oldfire,display,checkDisplay,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHidden(elem),dataShow=data_priv.get(elem,"fxshow");
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");
if(hooks.unqueued==null){hooks.unqueued=0;
oldfire=hooks.empty.fire;
hooks.empty.fire=function(){if(!hooks.unqueued){oldfire()
}}
}hooks.unqueued++;
anim.always(function(){anim.always(function(){hooks.unqueued--;
if(!jQuery.queue(elem,"fx").length){hooks.empty.fire()
}})
})
}if(elem.nodeType===1&&("height" in props||"width" in props)){opts.overflow=[style.overflow,style.overflowX,style.overflowY];
display=jQuery.css(elem,"display");
checkDisplay=display==="none"?data_priv.get(elem,"olddisplay")||defaultDisplay(elem.nodeName):display;
if(checkDisplay==="inline"&&jQuery.css(elem,"float")==="none"){style.display="inline-block"
}}if(opts.overflow){style.overflow="hidden";
anim.always(function(){style.overflow=opts.overflow[0];
style.overflowX=opts.overflow[1];
style.overflowY=opts.overflow[2]
})
}for(prop in props){value=props[prop];
if(rfxtypes.exec(value)){delete props[prop];
toggle=toggle||value==="toggle";
if(value===(hidden?"hide":"show")){if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true
}else{continue
}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop)
}else{display=undefined
}}if(!jQuery.isEmptyObject(orig)){if(dataShow){if("hidden" in dataShow){hidden=dataShow.hidden
}}else{dataShow=data_priv.access(elem,"fxshow",{})
}if(toggle){dataShow.hidden=!hidden
}if(hidden){jQuery(elem).show()
}else{anim.done(function(){jQuery(elem).hide()
})
}anim.done(function(){var prop;
data_priv.remove(elem,"fxshow");
for(prop in orig){jQuery.style(elem,prop,orig[prop])
}});
for(prop in orig){tween=createTween(hidden?dataShow[prop]:0,prop,anim);
if(!(prop in dataShow)){dataShow[prop]=tween.start;
if(hidden){tween.end=tween.start;
tween.start=prop==="width"||prop==="height"?1:0
}}}}else{if((display==="none"?defaultDisplay(elem.nodeName):display)==="inline"){style.display=display
}}}function propFilter(props,specialEasing){var index,name,easing,value,hooks;
for(index in props){name=jQuery.camelCase(index);
easing=specialEasing[name];
value=props[index];
if(jQuery.isArray(value)){easing=value[1];
value=props[index]=value[0]
}if(index!==name){props[name]=value;
delete props[index]
}hooks=jQuery.cssHooks[name];
if(hooks&&"expand" in hooks){value=hooks.expand(value);
delete props[name];
for(index in value){if(!(index in props)){props[index]=value[index];
specialEasing[index]=easing
}}}else{specialEasing[name]=easing
}}}function Animation(elem,properties,options){var result,stopped,index=0,length=animationPrefilters.length,deferred=jQuery.Deferred().always(function(){delete tick.elem
}),tick=function(){if(stopped){return false
}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;
for(;
index<length;
index++){animation.tweens[index].run(percent)
}deferred.notifyWith(elem,[animation,percent,remaining]);
if(percent<1&&length){return remaining
}else{deferred.resolveWith(elem,[animation]);
return false
}},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{}},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);
animation.tweens.push(tween);
return tween
},stop:function(gotoEnd){var index=0,length=gotoEnd?animation.tweens.length:0;
if(stopped){return this
}stopped=true;
for(;
index<length;
index++){animation.tweens[index].run(1)
}if(gotoEnd){deferred.resolveWith(elem,[animation,gotoEnd])
}else{deferred.rejectWith(elem,[animation,gotoEnd])
}return this
}}),props=animation.props;
propFilter(props,animation.opts.specialEasing);
for(;
index<length;
index++){result=animationPrefilters[index].call(animation,elem,props,animation.opts);
if(result){return result
}}jQuery.map(props,createTween,animation);
if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation)
}jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue}));
return animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
}jQuery.Animation=jQuery.extend(Animation,{tweener:function(props,callback){if(jQuery.isFunction(props)){callback=props;
props=["*"]
}else{props=props.split(" ")
}var prop,index=0,length=props.length;
for(;
index<length;
index++){prop=props[index];
tweeners[prop]=tweeners[prop]||[];
tweeners[prop].unshift(callback)
}},prefilter:function(callback,prepend){if(prepend){animationPrefilters.unshift(callback)
}else{animationPrefilters.push(callback)
}}});
jQuery.speed=function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};
opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;
if(opt.queue==null||opt.queue===true){opt.queue="fx"
}opt.old=opt.complete;
opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this)
}if(opt.queue){jQuery.dequeue(this,opt.queue)
}};
return opt
};
jQuery.fn.extend({fadeTo:function(speed,to,easing,callback){return this.filter(isHidden).css("opacity",0).show().end().animate({opacity:to},speed,easing,callback)
},animate:function(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function(){var anim=Animation(this,jQuery.extend({},prop),optall);
if(empty||data_priv.get(this,"finish")){anim.stop(true)
}};
doAnimation.finish=doAnimation;
return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation)
},stop:function(type,clearQueue,gotoEnd){var stopQueue=function(hooks){var stop=hooks.stop;
delete hooks.stop;
stop(gotoEnd)
};
if(typeof type!=="string"){gotoEnd=clearQueue;
clearQueue=type;
type=undefined
}if(clearQueue&&type!==false){this.queue(type||"fx",[])
}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=data_priv.get(this);
if(index){if(data[index]&&data[index].stop){stopQueue(data[index])
}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index])
}}}for(index=timers.length;
index--;
){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);
dequeue=false;
timers.splice(index,1)
}}if(dequeue||!gotoEnd){jQuery.dequeue(this,type)
}})
},finish:function(type){if(type!==false){type=type||"fx"
}return this.each(function(){var index,data=data_priv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;
data.finish=true;
jQuery.queue(this,type,[]);
if(hooks&&hooks.stop){hooks.stop.call(this,true)
}for(index=timers.length;
index--;
){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);
timers.splice(index,1)
}}for(index=0;
index<length;
index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this)
}}delete data.finish
})
}});
jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];
jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback)
}
});
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback)
}
});
jQuery.timers=[];
jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;
fxNow=jQuery.now();
for(;
i<timers.length;
i++){timer=timers[i];
if(!timer()&&timers[i]===timer){timers.splice(i--,1)
}}if(!timers.length){jQuery.fx.stop()
}fxNow=undefined
};
jQuery.fx.timer=function(timer){jQuery.timers.push(timer);
if(timer()){jQuery.fx.start()
}else{jQuery.timers.pop()
}};
jQuery.fx.interval=13;
jQuery.fx.start=function(){if(!timerId){timerId=setInterval(jQuery.fx.tick,jQuery.fx.interval)
}};
jQuery.fx.stop=function(){clearInterval(timerId);
timerId=null
};
jQuery.fx.speeds={slow:600,fast:200,_default:400};
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;
type=type||"fx";
return this.queue(type,function(next,hooks){var timeout=setTimeout(next,time);
hooks.stop=function(){clearTimeout(timeout)
}
})
};
(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));
input.type="checkbox";
support.checkOn=input.value!=="";
support.optSelected=opt.selected;
select.disabled=true;
support.optDisabled=!opt.disabled;
input=document.createElement("input");
input.value="t";
input.type="radio";
support.radioValue=input.value==="t"
})();
var nodeHook,boolHook,attrHandle=jQuery.expr.attrHandle;
jQuery.fn.extend({attr:function(name,value){return access(this,jQuery.attr,name,value,arguments.length>1)
},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name)
})
}});
jQuery.extend({attr:function(elem,name,value){var hooks,ret,nType=elem.nodeType;
if(!elem||nType===3||nType===8||nType===2){return
}if(typeof elem.getAttribute===strundefined){return jQuery.prop(elem,name,value)
}if(nType!==1||!jQuery.isXMLDoc(elem)){name=name.toLowerCase();
hooks=jQuery.attrHooks[name]||(jQuery.expr.match.bool.test(name)?boolHook:nodeHook)
}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name)
}else{if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret
}else{elem.setAttribute(name,value+"");
return value
}}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){return ret
}else{ret=jQuery.find.attr(elem,name);
return ret==null?undefined:ret
}}},removeAttr:function(elem,value){var name,propName,i=0,attrNames=value&&value.match(rnotwhite);
if(attrNames&&elem.nodeType===1){while((name=attrNames[i++])){propName=jQuery.propFix[name]||name;
if(jQuery.expr.match.bool.test(name)){elem[propName]=false
}elem.removeAttribute(name)
}}},attrHooks:{type:{set:function(elem,value){if(!support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;
elem.setAttribute("type",value);
if(val){elem.value=val
}return value
}}}}});
boolHook={set:function(elem,value,name){if(value===false){jQuery.removeAttr(elem,name)
}else{elem.setAttribute(name,name)
}return name
}};
jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=attrHandle[name]||jQuery.find.attr;
attrHandle[name]=function(elem,name,isXML){var ret,handle;
if(!isXML){handle=attrHandle[name];
attrHandle[name]=ret;
ret=getter(elem,name,isXML)!=null?name.toLowerCase():null;
attrHandle[name]=handle
}return ret
}
});
var rfocusable=/^(?:input|select|textarea|button)$/i;
jQuery.fn.extend({prop:function(name,value){return access(this,jQuery.prop,name,value,arguments.length>1)
},removeProp:function(name){return this.each(function(){delete this[jQuery.propFix[name]||name]
})
}});
jQuery.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(elem,name,value){var ret,hooks,notxml,nType=elem.nodeType;
if(!elem||nType===3||nType===8||nType===2){return
}notxml=nType!==1||!jQuery.isXMLDoc(elem);
if(notxml){name=jQuery.propFix[name]||name;
hooks=jQuery.propHooks[name]
}if(value!==undefined){return hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined?ret:(elem[name]=value)
}else{return hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null?ret:elem[name]
}},propHooks:{tabIndex:{get:function(elem){return elem.hasAttribute("tabindex")||rfocusable.test(elem.nodeName)||elem.href?elem.tabIndex:-1
}}}});
if(!support.optSelected){jQuery.propHooks.selected={get:function(elem){var parent=elem.parentNode;
if(parent&&parent.parentNode){parent.parentNode.selectedIndex
}return null
}}
}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this
});
var rclass=/[\t\r\n\f]/g;
jQuery.fn.extend({addClass:function(value){var classes,elem,cur,clazz,j,finalValue,proceed=typeof value==="string"&&value,i=0,len=this.length;
if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className))
})
}if(proceed){classes=(value||"").match(rnotwhite)||[];
for(;
i<len;
i++){elem=this[i];
cur=elem.nodeType===1&&(elem.className?(" "+elem.className+" ").replace(rclass," "):" ");
if(cur){j=0;
while((clazz=classes[j++])){if(cur.indexOf(" "+clazz+" ")<0){cur+=clazz+" "
}}finalValue=jQuery.trim(cur);
if(elem.className!==finalValue){elem.className=finalValue
}}}}return this
},removeClass:function(value){var classes,elem,cur,clazz,j,finalValue,proceed=arguments.length===0||typeof value==="string"&&value,i=0,len=this.length;
if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className))
})
}if(proceed){classes=(value||"").match(rnotwhite)||[];
for(;
i<len;
i++){elem=this[i];
cur=elem.nodeType===1&&(elem.className?(" "+elem.className+" ").replace(rclass," "):"");
if(cur){j=0;
while((clazz=classes[j++])){while(cur.indexOf(" "+clazz+" ")>=0){cur=cur.replace(" "+clazz+" "," ")
}}finalValue=value?jQuery.trim(cur):"";
if(elem.className!==finalValue){elem.className=finalValue
}}}}return this
},toggleClass:function(value,stateVal){var type=typeof value;
if(typeof stateVal==="boolean"&&type==="string"){return stateVal?this.addClass(value):this.removeClass(value)
}if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal)
})
}return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),classNames=value.match(rnotwhite)||[];
while((className=classNames[i++])){if(self.hasClass(className)){self.removeClass(className)
}else{self.addClass(className)
}}}else{if(type===strundefined||type==="boolean"){if(this.className){data_priv.set(this,"__className__",this.className)
}this.className=this.className||value===false?"":data_priv.get(this,"__className__")||""
}}})
},hasClass:function(selector){var className=" "+selector+" ",i=0,l=this.length;
for(;
i<l;
i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>=0){return true
}}return false
}});
var rreturn=/\r/g;
jQuery.fn.extend({val:function(value){var hooks,ret,isFunction,elem=this[0];
if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];
if(hooks&&"get" in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret
}ret=elem.value;
return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret
}return
}isFunction=jQuery.isFunction(value);
return this.each(function(i){var val;
if(this.nodeType!==1){return
}if(isFunction){val=value.call(this,i,jQuery(this).val())
}else{val=value
}if(val==null){val=""
}else{if(typeof val==="number"){val+=""
}else{if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+""
})
}}}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];
if(!hooks||!("set" in hooks)||hooks.set(this,val,"value")===undefined){this.value=val
}})
}});
jQuery.extend({valHooks:{option:{get:function(elem){var val=jQuery.find.attr(elem,"value");
return val!=null?val:jQuery.trim(jQuery.text(elem))
}},select:{get:function(elem){var value,option,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one"||index<0,values=one?null:[],max=one?index+1:options.length,i=index<0?max:one?index:0;
for(;
i<max;
i++){option=options[i];
if((option.selected||i===index)&&(support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();
if(one){return value
}values.push(value)
}}return values
},set:function(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;
while(i--){option=options[i];
if((option.selected=jQuery.inArray(option.value,values)>=0)){optionSet=true
}}if(!optionSet){elem.selectedIndex=-1
}return values
}}}});
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function(elem,value){if(jQuery.isArray(value)){return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0)
}}};
if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value
}
}});
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name)
}
});
jQuery.fn.extend({hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)
},bind:function(types,data,fn){return this.on(types,null,data,fn)
},unbind:function(types,fn){return this.off(types,null,fn)
},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn)
},undelegate:function(selector,types,fn){return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn)
}});
var nonce=jQuery.now();
var rquery=(/\?/);
jQuery.parseJSON=function(data){return JSON.parse(data+"")
};
jQuery.parseXML=function(data){var xml,tmp;
if(!data||typeof data!=="string"){return null
}try{tmp=new DOMParser();
xml=tmp.parseFromString(data,"text/xml")
}catch(e){xml=undefined
}if(!xml||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data)
}return xml
};
var rhash=/#.*$/,rts=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg,rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rurl=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,prefilters={},transports={},allTypes="*/".concat("*"),ajaxLocation=window.location.href,ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];
function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;
dataTypeExpression="*"
}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnotwhite)||[];
if(jQuery.isFunction(func)){while((dataType=dataTypes[i++])){if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";
(structure[dataType]=structure[dataType]||[]).unshift(func)
}else{(structure[dataType]=structure[dataType]||[]).push(func)
}}}}
}function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=(structure===transports);
function inspect(dataType){var selected;
inspected[dataType]=true;
jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);
if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);
inspect(dataTypeOrTransport);
return false
}else{if(seekingTransport){return !(selected=dataTypeOrTransport)
}}});
return selected
}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*")
}function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};
for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:(deep||(deep={})))[key]=src[key]
}}if(deep){jQuery.extend(true,target,deep)
}return target
}function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes;
while(dataTypes[0]==="*"){dataTypes.shift();
if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type")
}}if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);
break
}}}if(dataTypes[0] in responses){finalDataType=dataTypes[0]
}else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;
break
}if(!firstDataType){firstDataType=type
}}finalDataType=finalDataType||firstDataType
}if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType)
}return responses[finalDataType]
}}function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},dataTypes=s.dataTypes.slice();
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv]
}}current=dataTypes.shift();
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response
}if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType)
}prev=current;
current=dataTypes.shift();
if(current){if(current==="*"){current=prev
}else{if(prev!=="*"&&prev!==current){conv=converters[prev+" "+current]||converters["* "+current];
if(!conv){for(conv2 in converters){tmp=conv2.split(" ");
if(tmp[1]===current){conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];
if(conv){if(conv===true){conv=converters[conv2]
}else{if(converters[conv2]!==true){current=tmp[0];
dataTypes.unshift(tmp[1])
}}break
}}}}if(conv!==true){if(conv&&s["throws"]){response=conv(response)
}else{try{response=conv(response)
}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current}
}}}}}}}return{state:"success",data:response}
}jQuery.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ajaxLocation,type:"GET",isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":true,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{url:true,context:true}},ajaxSetup:function(target,settings){return settings?ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):ajaxExtend(jQuery.ajaxSettings,target)
},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){if(typeof url==="object"){options=url;
url=undefined
}options=options||{};
var transport,cacheURL,responseHeadersString,responseHeaders,timeoutTimer,parts,fireGlobals,i,s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),statusCode=s.statusCode||{},requestHeaders={},requestHeadersNames={},state=0,strAbort="canceled",jqXHR={readyState:0,getResponseHeader:function(key){var match;
if(state===2){if(!responseHeaders){responseHeaders={};
while((match=rheaders.exec(responseHeadersString))){responseHeaders[match[1].toLowerCase()]=match[2]
}}match=responseHeaders[key.toLowerCase()]
}return match==null?null:match
},getAllResponseHeaders:function(){return state===2?responseHeadersString:null
},setRequestHeader:function(name,value){var lname=name.toLowerCase();
if(!state){name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;
requestHeaders[name]=value
}return this
},overrideMimeType:function(type){if(!state){s.mimeType=type
}return this
},statusCode:function(map){var code;
if(map){if(state<2){for(code in map){statusCode[code]=[statusCode[code],map[code]]
}}else{jqXHR.always(map[jqXHR.status])
}}return this
},abort:function(statusText){var finalText=statusText||strAbort;
if(transport){transport.abort(finalText)
}done(0,finalText);
return this
}};
deferred.promise(jqXHR).complete=completeDeferred.add;
jqXHR.success=jqXHR.done;
jqXHR.error=jqXHR.fail;
s.url=((url||s.url||ajaxLocation)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");
s.type=options.method||options.type||s.method||s.type;
s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().match(rnotwhite)||[""];
if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());
s.crossDomain=!!(parts&&(parts[1]!==ajaxLocParts[1]||parts[2]!==ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?"80":"443"))!==(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?"80":"443"))))
}if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional)
}inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);
if(state===2){return jqXHR
}fireGlobals=jQuery.event&&s.global;
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart")
}s.type=s.type.toUpperCase();
s.hasContent=!rnoContent.test(s.type);
cacheURL=s.url;
if(!s.hasContent){if(s.data){cacheURL=(s.url+=(rquery.test(cacheURL)?"&":"?")+s.data);
delete s.data
}if(s.cache===false){s.url=rts.test(cacheURL)?cacheURL.replace(rts,"$1_="+nonce++):cacheURL+(rquery.test(cacheURL)?"&":"?")+"_="+nonce++
}}if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL])
}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL])
}}if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType)
}jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i])
}if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){return jqXHR.abort()
}strAbort="abort";
for(i in {success:1,error:1,complete:1}){jqXHR[i](s[i])
}transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);
if(!transport){done(-1,"No Transport")
}else{jqXHR.readyState=1;
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s])
}if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout")
},s.timeout)
}try{state=1;
transport.send(requestHeaders,done)
}catch(e){if(state<2){done(-1,e)
}else{throw e
}}}function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;
if(state===2){return
}state=2;
if(timeoutTimer){clearTimeout(timeoutTimer)
}transport=undefined;
responseHeadersString=headers||"";
jqXHR.readyState=status>0?4:0;
isSuccess=status>=200&&status<300||status===304;
if(responses){response=ajaxHandleResponses(s,jqXHR,responses)
}response=ajaxConvert(s,response,jqXHR,isSuccess);
if(isSuccess){if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");
if(modified){jQuery.lastModified[cacheURL]=modified
}modified=jqXHR.getResponseHeader("etag");
if(modified){jQuery.etag[cacheURL]=modified
}}if(status===204||s.type==="HEAD"){statusText="nocontent"
}else{if(status===304){statusText="notmodified"
}else{statusText=response.state;
success=response.data;
error=response.error;
isSuccess=!error
}}}else{error=statusText;
if(status||!statusText){statusText="error";
if(status<0){status=0
}}}jqXHR.status=status;
jqXHR.statusText=(nativeStatusText||statusText)+"";
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR])
}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error])
}jqXHR.statusCode(statusCode);
statusCode=undefined;
if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error])
}completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);
if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);
if(!(--jQuery.active)){jQuery.event.trigger("ajaxStop")
}}}return jqXHR
},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script")
}});
jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;
callback=data;
data=undefined
}return jQuery.ajax({url:url,type:method,dataType:type,data:data,success:callback})
}
});
jQuery._evalUrl=function(url){return jQuery.ajax({url:url,type:"GET",dataType:"script",async:false,global:false,"throws":true})
};
jQuery.fn.extend({wrapAll:function(html){var wrap;
if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i))
})
}if(this[0]){wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);
if(this[0].parentNode){wrap.insertBefore(this[0])
}wrap.map(function(){var elem=this;
while(elem.firstElementChild){elem=elem.firstElementChild
}return elem
}).append(this)
}return this
},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i))
})
}return this.each(function(){var self=jQuery(this),contents=self.contents();
if(contents.length){contents.wrapAll(html)
}else{self.append(html)
}})
},wrap:function(html){var isFunction=jQuery.isFunction(html);
return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html)
})
},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes)
}}).end()
}});
jQuery.expr.filters.hidden=function(elem){return elem.offsetWidth<=0&&elem.offsetHeight<=0
};
jQuery.expr.filters.visible=function(elem){return !jQuery.expr.filters.hidden(elem)
};
var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;
function buildParams(prefix,obj,traditional,add){var name;
if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v)
}else{buildParams(prefix+"["+(typeof v==="object"?i:"")+"]",v,traditional,add)
}})
}else{if(!traditional&&jQuery.type(obj)==="object"){for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add)
}}else{add(prefix,obj)
}}}jQuery.param=function(a,traditional){var prefix,s=[],add=function(key,value){value=jQuery.isFunction(value)?value():(value==null?"":value);
s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value)
};
if(traditional===undefined){traditional=jQuery.ajaxSettings&&jQuery.ajaxSettings.traditional
}if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){jQuery.each(a,function(){add(this.name,this.value)
})
}else{for(prefix in a){buildParams(prefix,a[prefix],traditional,add)
}}return s.join("&").replace(r20,"+")
};
jQuery.fn.extend({serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){var elements=jQuery.prop(this,"elements");
return elements?jQuery.makeArray(elements):this
}).filter(function(){var type=this.type;
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type))
}).map(function(i,elem){var val=jQuery(this).val();
return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")}
}):{name:elem.name,value:val.replace(rCRLF,"\r\n")}
}).get()
}});
jQuery.ajaxSettings.xhr=function(){try{return new XMLHttpRequest()
}catch(e){}};
var xhrId=0,xhrCallbacks={},xhrSuccessStatus={0:200,1223:204},xhrSupported=jQuery.ajaxSettings.xhr();
if(window.attachEvent){window.attachEvent("onunload",function(){for(var key in xhrCallbacks){xhrCallbacks[key]()
}})
}support.cors=!!xhrSupported&&("withCredentials" in xhrSupported);
support.ajax=xhrSupported=!!xhrSupported;
jQuery.ajaxTransport(function(options){var callback;
if(support.cors||xhrSupported&&!options.crossDomain){return{send:function(headers,complete){var i,xhr=options.xhr(),id=++xhrId;
xhr.open(options.type,options.url,options.async,options.username,options.password);
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i]
}}if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType)
}if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest"
}for(i in headers){xhr.setRequestHeader(i,headers[i])
}callback=function(type){return function(){if(callback){delete xhrCallbacks[id];
callback=xhr.onload=xhr.onerror=null;
if(type==="abort"){xhr.abort()
}else{if(type==="error"){complete(xhr.status,xhr.statusText)
}else{complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText,typeof xhr.responseText==="string"?{text:xhr.responseText}:undefined,xhr.getAllResponseHeaders())
}}}}
};
xhr.onload=callback();
xhr.onerror=callback("error");
callback=xhrCallbacks[id]=callback("abort");
try{xhr.send(options.hasContent&&options.data||null)
}catch(e){if(callback){throw e
}}},abort:function(){if(callback){callback()
}}}
}});
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(text){jQuery.globalEval(text);
return text
}}});
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false
}if(s.crossDomain){s.type="GET"
}});
jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,callback;
return{send:function(_,complete){script=jQuery("<script>").prop({async:true,charset:s.scriptCharset,src:s.url}).on("load error",callback=function(evt){script.remove();
callback=null;
if(evt){complete(evt.type==="error"?404:200,evt.type)
}});
document.head.appendChild(script[0])
},abort:function(){if(callback){callback()
}}}
}});
var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var callback=oldCallbacks.pop()||(jQuery.expando+"_"+(nonce++));
this[callback]=true;
return callback
}});
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&!(s.contentType||"").indexOf("application/x-www-form-urlencoded")&&rjsonp.test(s.data)&&"data");
if(jsonProp||s.dataTypes[0]==="jsonp"){callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName)
}else{if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName
}}s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called")
}return responseContainer[0]
};
s.dataTypes[0]="json";
overwritten=window[callbackName];
window[callbackName]=function(){responseContainer=arguments
};
jqXHR.always(function(){window[callbackName]=overwritten;
if(s[callbackName]){s.jsonpCallback=originalSettings.jsonpCallback;
oldCallbacks.push(callbackName)
}if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0])
}responseContainer=overwritten=undefined
});
return"script"
}});
jQuery.parseHTML=function(data,context,keepScripts){if(!data||typeof data!=="string"){return null
}if(typeof context==="boolean"){keepScripts=context;
context=false
}context=context||document;
var parsed=rsingleTag.exec(data),scripts=!keepScripts&&[];
if(parsed){return[context.createElement(parsed[1])]
}parsed=jQuery.buildFragment([data],context,scripts);
if(scripts&&scripts.length){jQuery(scripts).remove()
}return jQuery.merge([],parsed.childNodes)
};
var _load=jQuery.fn.load;
jQuery.fn.load=function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments)
}var selector,type,response,self=this,off=url.indexOf(" ");
if(off>=0){selector=jQuery.trim(url.slice(off));
url=url.slice(0,off)
}if(jQuery.isFunction(params)){callback=params;
params=undefined
}else{if(params&&typeof params==="object"){type="POST"
}}if(self.length>0){jQuery.ajax({url:url,type:type,dataType:"html",data:params}).done(function(responseText){response=arguments;
self.html(selector?jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):responseText)
}).complete(callback&&function(jqXHR,status){self.each(callback,response||[jqXHR.responseText,status,jqXHR])
})
}return this
};
jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type]=function(fn){return this.on(type,fn)
}
});
jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem
}).length
};
var docElem=window.document.documentElement;
function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9&&elem.defaultView
}jQuery.offset={setOffset:function(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={};
if(position==="static"){elem.style.position="relative"
}curOffset=curElem.offset();
curCSSTop=jQuery.css(elem,"top");
curCSSLeft=jQuery.css(elem,"left");
calculatePosition=(position==="absolute"||position==="fixed")&&(curCSSTop+curCSSLeft).indexOf("auto")>-1;
if(calculatePosition){curPosition=curElem.position();
curTop=curPosition.top;
curLeft=curPosition.left
}else{curTop=parseFloat(curCSSTop)||0;
curLeft=parseFloat(curCSSLeft)||0
}if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset)
}if(options.top!=null){props.top=(options.top-curOffset.top)+curTop
}if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft
}if("using" in options){options.using.call(elem,props)
}else{curElem.css(props)
}}};
jQuery.fn.extend({offset:function(options){if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i)
})
}var docElem,win,elem=this[0],box={top:0,left:0},doc=elem&&elem.ownerDocument;
if(!doc){return
}docElem=doc.documentElement;
if(!jQuery.contains(docElem,elem)){return box
}if(typeof elem.getBoundingClientRect!==strundefined){box=elem.getBoundingClientRect()
}win=getWindow(doc);
return{top:box.top+win.pageYOffset-docElem.clientTop,left:box.left+win.pageXOffset-docElem.clientLeft}
},position:function(){if(!this[0]){return
}var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0};
if(jQuery.css(elem,"position")==="fixed"){offset=elem.getBoundingClientRect()
}else{offsetParent=this.offsetParent();
offset=this.offset();
if(!jQuery.nodeName(offsetParent[0],"html")){parentOffset=offsetParent.offset()
}parentOffset.top+=jQuery.css(offsetParent[0],"borderTopWidth",true);
parentOffset.left+=jQuery.css(offsetParent[0],"borderLeftWidth",true)
}return{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)}
},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||docElem;
while(offsetParent&&(!jQuery.nodeName(offsetParent,"html")&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent
}return offsetParent||docElem
})
}});
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;
jQuery.fn[method]=function(val){return access(this,function(elem,method,val){var win=getWindow(elem);
if(val===undefined){return win?win[prop]:elem[method]
}if(win){win.scrollTo(!top?val:window.pageXOffset,top?val:window.pageYOffset)
}else{elem[method]=val
}},method,val,arguments.length,null)
}
});
jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop);
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed
}})
});
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");
return access(this,function(elem,type,value){var doc;
if(jQuery.isWindow(elem)){return elem.document.documentElement["client"+name]
}if(elem.nodeType===9){doc=elem.documentElement;
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name])
}return value===undefined?jQuery.css(elem,type,extra):jQuery.style(elem,type,value,extra)
},type,chainable?margin:undefined,chainable,null)
}
})
});
jQuery.fn.size=function(){return this.length
};
jQuery.fn.andSelf=jQuery.fn.addBack;
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return jQuery
})
}var _jQuery=window.jQuery,_$=window.$;
jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$
}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery
}return jQuery
};
if(typeof noGlobal===strundefined){window.jQuery=window.$=jQuery
}return jQuery
}));
var FlashDetect=new function(){var a=this;
a.installed=false;
a.raw="";
a.major=-1;
a.minor=-1;
a.revision=-1;
a.revisionStr="";
var b=[{name:"ShockwaveFlash.ShockwaveFlash.7",version:function(h){return d(h)
}},{name:"ShockwaveFlash.ShockwaveFlash.6",version:function(k){var h="6,0,21";
try{k.AllowScriptAccess="always";
h=d(k)
}catch(j){}return h
}},{name:"ShockwaveFlash.ShockwaveFlash",version:function(h){return d(h)
}}];
var d=function(k){var h=-1;
try{h=k.GetVariable("$version")
}catch(j){}return h
};
var g=function(h){var k=-1;
try{k=new ActiveXObject(h)
}catch(j){k={activeXError:true}
}return k
};
var c=function(j){var h=j.split(",");
return{raw:j,major:parseInt(h[0].split(" ")[1],10),minor:parseInt(h[1],10),revision:parseInt(h[2],10),revisionStr:h[2]}
};
var f=function(l){var j=l.split(/ +/);
var k=j[2].split(/\./);
var h=j[3];
return{raw:l,major:parseInt(k[0],10),minor:parseInt(k[1],10),revisionStr:h,revision:e(h)}
};
var e=function(h){return parseInt(h.replace(/[a-zA-Z]/g,""),10)||a.revision
};
a.majorAtLeast=function(h){return a.major>=h
};
a.minorAtLeast=function(h){return a.minor>=h
};
a.revisionAtLeast=function(h){return a.revision>=h
};
a.versionAtLeast=function(j){var k=[a.major,a.minor,a.revision];
var h=Math.min(k.length,arguments.length);
for(i=0;
i<h;
i++){if(k[i]>=arguments[i]){if(i+1<h&&k[i]==arguments[i]){continue
}else{return true
}}else{return false
}}};
a.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var l="application/x-shockwave-flash";
var k=navigator.mimeTypes;
if(k&&k[l]&&k[l].enabledPlugin&&k[l].enabledPlugin.description){var h=k[l].enabledPlugin.description;
var m=f(h);
a.raw=m.raw;
a.major=m.major;
a.minor=m.minor;
a.revisionStr=m.revisionStr;
a.revision=m.revision;
a.installed=true
}}else{if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var h=-1;
for(var j=0;
j<b.length&&h==-1;
j++){var n=g(b[j].name);
if(!n.activeXError){a.installed=true;
h=b[j].version(n);
if(h!=-1){var m=c(h);
a.raw=m.raw;
a.major=m.major;
a.minor=m.minor;
a.revision=m.revision;
a.revisionStr=m.revisionStr
}}}}}}()
};
FlashDetect.JS_RELEASE="1.0.4";
(function(c,d){if(!c||!c.document){throw new Error("SoundManager requires a browser with window and document objects.")
}var b=null;
function a(a1,aj){this.setupOptions={url:(a1||null),flashVersion:8,debugMode:true,debugFlash:false,useConsole:true,consoleOnly:true,waitForWindowLoad:false,bgColor:"#ffffff",useHighPerformance:false,flashPollingInterval:null,html5PollingInterval:null,flashLoadTimeout:1000,wmode:null,allowScriptAccess:"always",useFlashBlock:false,useHTML5Audio:true,html5Test:/^(probably|maybe)$/i,preferFlash:false,noSWFCache:false,idPrefix:"sound"};
this.defaultOptions={autoLoad:false,autoPlay:false,from:null,loops:1,onid3:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onposition:null,onstop:null,onfailure:null,onfinish:null,multiShot:true,multiShotEvents:false,position:null,pan:0,stream:true,to:null,type:null,usePolicyFile:false,volume:100};
this.flash9Options={isMovieStar:null,usePeakData:false,useWaveformData:false,useEQData:false,onbufferchange:null,ondataerror:null};
this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null};
this.audioFormats={mp3:{type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:true},mp4:{related:["aac","m4a","m4b"],type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:false},ogg:{type:["audio/ogg; codecs=vorbis"],required:false},opus:{type:["audio/ogg; codecs=opus","audio/opus"],required:false},wav:{type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],required:false}};
this.movieID="sm2-container";
this.id=(aj||"sm2movie");
this.debugID="soundmanager-debug";
this.debugURLParam=/([#?&])debug=1/i;
this.versionNumber="V2.97a.20140901";
this.version=null;
this.movieURL=null;
this.altURL=null;
this.swfLoaded=false;
this.enabled=false;
this.oMC=null;
this.sounds={};
this.soundIDs=[];
this.muted=false;
this.didFlashBlock=false;
this.filePattern=null;
this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};
this.features={buffering:false,peakData:false,waveformData:false,eqData:false,movieStar:false};
this.sandbox={type:null,types:{remote:"remote (domain-based) rules",localWithFile:"local with file access (no internet access)",localWithNetwork:"local with network (internet access only, no local access)",localTrusted:"local, trusted (local+internet access)"},description:null,noRemote:null,noLocal:null};
this.html5={usingFlash:null};
this.flash={};
this.html5Only=false;
this.ignoreFlash=false;
var al,ap=this,a9=null,ae=null,aY="soundManager",G=aY+": ",a5="HTML5::",ao,av=navigator.userAgent,y=c.location.href.toString(),aa=document,U,A,aK,bi,w=[],bh=true,N,aq=false,aV=false,ay=false,a2=false,bc=false,W,ax=0,x,a3,a7,a4,Z,aS,t,z,bd,ad,aW,u,e,k,aE,M,bk,q,bg,I,ab,m,E,aI=["log","info","warn","error"],Y=8,X,s,aA,aL=null,ak=null,bf,aB,n,F,aD,B,p,at,J,aR=false,aJ=false,aP,O,af,L=0,be=null,ac,ar=[],ag,C=null,T,bb,an,aM,g,P,aO,am,S=Array.prototype.slice,a0=false,l,au,R,D,j,aG,Q,aF,ah=0,aX=av.match(/(ipad|iphone|ipod)/i),aw=av.match(/android/i),a8=av.match(/msie/i),aH=av.match(/webkit/i),aZ=(av.match(/safari/i)&&!av.match(/chrome/i)),v=(av.match(/opera/i)),aU=(av.match(/(mobile|pre\/|xoom)/i)||aX||aw),a6=(!y.match(/usehtml5audio/i)&&!y.match(/sm2\-ignorebadua/i)&&aZ&&!av.match(/silk/i)&&av.match(/OS X 10_6_([3-7])/i)),K=(c.console!==d&&console.log!==d),aC=(aa.hasFocus!==d?aa.hasFocus():null),ba=(aZ&&(aa.hasFocus===d||!aa.hasFocus())),az=!ba,r=/(mp3|mp4|mpa|m4a|m4b)/i,h=1000,o="about:blank",aT="data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==",H=(aa.location?aa.location.protocol.match(/http/i):null),aN=(!H?"http://":""),f=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,V=["mpeg4","aac","flv","mov","mp4","m4v","f4v","m4a","m4b","mp4v","3gp","3g2"],ai=new RegExp("\\.("+V.join("|")+")(\\?.*)?$","i");
this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
this.useAltURL=!H;
F={swfBox:"sm2-object-box",swfDefault:"movieContainer",swfError:"swf_error",swfTimedout:"swf_timedout",swfLoaded:"swf_loaded",swfUnblocked:"swf_unblocked",sm2Debug:"sm2_debug",highPerf:"high_performance",flashDebug:"flash_debug"};
this.hasHTML5=(function(){try{return(Audio!==d&&(v&&opera!==d&&opera.version()<10?new Audio(null):new Audio()).canPlayType!==d)
}catch(bl){return false
}}());
this.setup=function(bl){var bm=(!ap.url);
if(bl!==d&&ay&&C&&ap.ok()&&(bl.flashVersion!==d||bl.url!==d||bl.html5Test!==d)){at(bf("setupLate"))
}a7(bl);
if(bl){if(bm&&q&&bl.url!==d){ap.beginDelayedInit()
}if(!q&&bl.url!==d&&aa.readyState==="complete"){setTimeout(M,1)
}}return ap
};
this.ok=function(){return(C?(ay&&!a2):(ap.useHTML5Audio&&ap.hasHTML5))
};
this.supported=this.ok;
this.getMovie=function(bl){return ao(bl)||aa[bl]||c[bl]
};
this.createSound=function(bn,bp){var bq,br,bm,bo=null;
bq=aY+".createSound(): ";
br=bq+bf(!ay?"notReady":"notOK");
if(!ay||!ap.ok()){at(br);
return false
}if(bp!==d){bn={id:bn,url:bp}
}bm=a3(bn);
bm.url=ac(bm.url);
if(bm.id===undefined){bm.id=ap.setupOptions.idPrefix+(ah++)
}if(bm.id.toString().charAt(0).match(/^[0-9]$/)){ap._wD(bq+bf("badID",bm.id),2)
}ap._wD(bq+bm.id+(bm.url?" ("+bm.url+")":""),1);
if(J(bm.id,true)){ap._wD(bq+bm.id+" exists",1);
return ap.sounds[bm.id]
}function bl(){bm=B(bm);
ap.sounds[bm.id]=new al(bm);
ap.soundIDs.push(bm.id);
return ap.sounds[bm.id]
}if(bb(bm)){bo=bl();
ap._wD(bm.id+": Using HTML5");
bo._setup_html5(bm)
}else{if(ap.html5Only){ap._wD(bm.id+": No HTML5 support for this sound, and no Flash. Exiting.");
return bl()
}if(ap.html5.usingFlash&&bm.url&&bm.url.match(/data\:/i)){ap._wD(bm.id+": data: URIs not supported via Flash. Exiting.");
return bl()
}if(bi>8){if(bm.isMovieStar===null){bm.isMovieStar=!!(bm.serverURL||(bm.type?bm.type.match(f):false)||(bm.url&&bm.url.match(ai)))
}if(bm.isMovieStar){ap._wD(bq+"using MovieStar handling");
if(bm.loops>1){W("noNSLoop")
}}}bm=p(bm,bq);
bo=bl();
if(bi===8){ae._createSound(bm.id,bm.loops||1,bm.usePolicyFile)
}else{ae._createSound(bm.id,bm.url,bm.usePeakData,bm.useWaveformData,bm.useEQData,bm.isMovieStar,(bm.isMovieStar?bm.bufferTime:false),bm.loops||1,bm.serverURL,bm.duration||null,bm.autoPlay,true,bm.autoLoad,bm.usePolicyFile);
if(!bm.serverURL){bo.connected=true;
if(bm.onconnect){bm.onconnect.apply(bo)
}}}if(!bm.serverURL&&(bm.autoLoad||bm.autoPlay)){bo.load(bm)
}}if(!bm.serverURL&&bm.autoPlay){bo.play()
}return bo
};
this.destroySound=function(bl,bo){if(!J(bl)){return false
}var bn=ap.sounds[bl],bm;
bn._iO={};
bn.stop();
bn.unload();
for(bm=0;
bm<ap.soundIDs.length;
bm++){if(ap.soundIDs[bm]===bl){ap.soundIDs.splice(bm,1);
break
}}if(!bo){bn.destruct(true)
}bn=null;
delete ap.sounds[bl];
return true
};
this.load=function(bl,bm){if(!J(bl)){return false
}return ap.sounds[bl].load(bm)
};
this.unload=function(bl){if(!J(bl)){return false
}return ap.sounds[bl].unload()
};
this.onPosition=function(bo,bn,bm,bl){if(!J(bo)){return false
}return ap.sounds[bo].onposition(bn,bm,bl)
};
this.onposition=this.onPosition;
this.clearOnPosition=function(bn,bm,bl){if(!J(bn)){return false
}return ap.sounds[bn].clearOnPosition(bm,bl)
};
this.play=function(bn,bo){var bl=null,bm=(bo&&!(bo instanceof Object));
if(!ay||!ap.ok()){at(aY+".play(): "+bf(!ay?"notReady":"notOK"));
return false
}if(!J(bn,bm)){if(!bm){return false
}if(bm){bo={url:bo}
}if(bo&&bo.url){ap._wD(aY+'.play(): Attempting to create "'+bn+'"',1);
bo.id=bn;
bl=ap.createSound(bo).play()
}}else{if(bm){bo={url:bo}
}}if(bl===null){bl=ap.sounds[bn].play(bo)
}return bl
};
this.start=this.play;
this.setPosition=function(bl,bm){if(!J(bl)){return false
}return ap.sounds[bl].setPosition(bm)
};
this.stop=function(bl){if(!J(bl)){return false
}ap._wD(aY+".stop("+bl+")",1);
return ap.sounds[bl].stop()
};
this.stopAll=function(){var bl;
ap._wD(aY+".stopAll()",1);
for(bl in ap.sounds){if(ap.sounds.hasOwnProperty(bl)){ap.sounds[bl].stop()
}}};
this.pause=function(bl){if(!J(bl)){return false
}return ap.sounds[bl].pause()
};
this.pauseAll=function(){var bl;
for(bl=ap.soundIDs.length-1;
bl>=0;
bl--){ap.sounds[ap.soundIDs[bl]].pause()
}};
this.resume=function(bl){if(!J(bl)){return false
}return ap.sounds[bl].resume()
};
this.resumeAll=function(){var bl;
for(bl=ap.soundIDs.length-1;
bl>=0;
bl--){ap.sounds[ap.soundIDs[bl]].resume()
}};
this.togglePause=function(bl){if(!J(bl)){return false
}return ap.sounds[bl].togglePause()
};
this.setPan=function(bl,bm){if(!J(bl)){return false
}return ap.sounds[bl].setPan(bm)
};
this.setVolume=function(bm,bl){if(!J(bm)){return false
}return ap.sounds[bm].setVolume(bl)
};
this.mute=function(bl){var bm=0;
if(bl instanceof String){bl=null
}if(!bl){ap._wD(aY+".mute(): Muting all sounds");
for(bm=ap.soundIDs.length-1;
bm>=0;
bm--){ap.sounds[ap.soundIDs[bm]].mute()
}ap.muted=true
}else{if(!J(bl)){return false
}ap._wD(aY+'.mute(): Muting "'+bl+'"');
return ap.sounds[bl].mute()
}return true
};
this.muteAll=function(){ap.mute()
};
this.unmute=function(bl){var bm;
if(bl instanceof String){bl=null
}if(!bl){ap._wD(aY+".unmute(): Unmuting all sounds");
for(bm=ap.soundIDs.length-1;
bm>=0;
bm--){ap.sounds[ap.soundIDs[bm]].unmute()
}ap.muted=false
}else{if(!J(bl)){return false
}ap._wD(aY+'.unmute(): Unmuting "'+bl+'"');
return ap.sounds[bl].unmute()
}return true
};
this.unmuteAll=function(){ap.unmute()
};
this.toggleMute=function(bl){if(!J(bl)){return false
}return ap.sounds[bl].toggleMute()
};
this.getMemoryUse=function(){var bl=0;
if(ae&&bi!==8){bl=parseInt(ae._getMemoryUse(),10)
}return bl
};
this.disable=function(bm){var bl;
if(bm===d){bm=false
}if(a2){return false
}a2=true;
W("shutdown",1);
for(bl=ap.soundIDs.length-1;
bl>=0;
bl--){X(ap.sounds[ap.soundIDs[bl]])
}x(bm);
am.remove(c,"load",t);
return true
};
this.canPlayMIME=function(bm){var bl;
if(ap.hasHTML5){bl=an({type:bm})
}if(!bl&&C){bl=(bm&&ap.ok()?!!((bi>8?bm.match(f):null)||bm.match(ap.mimePattern)):null)
}return bl
};
this.canPlayURL=function(bm){var bl;
if(ap.hasHTML5){bl=an({url:bm})
}if(!bl&&C){bl=(bm&&ap.ok()?!!(bm.match(ap.filePattern)):null)
}return bl
};
this.canPlayLink=function(bl){if(bl.type!==d&&bl.type){if(ap.canPlayMIME(bl.type)){return true
}}return ap.canPlayURL(bl.href)
};
this.getSoundById=function(bm,bn){if(!bm){return null
}var bl=ap.sounds[bm];
if(!bl&&!bn){ap._wD(aY+'.getSoundById(): Sound "'+bm+'" not found.',2)
}return bl
};
this.onready=function(bn,bm){var bo="onready",bl=false;
if(typeof bn==="function"){if(ay){ap._wD(bf("queue",bo))
}if(!bm){bm=c
}Z(bo,bn,bm);
aS();
bl=true
}else{throw bf("needFunction",bo)
}return bl
};
this.ontimeout=function(bn,bm){var bo="ontimeout",bl=false;
if(typeof bn==="function"){if(ay){ap._wD(bf("queue",bo))
}if(!bm){bm=c
}Z(bo,bn,bm);
aS({type:bo});
bl=true
}else{throw bf("needFunction",bo)
}return bl
};
this._writeDebug=function(bm,bl){var bp="soundmanager-debug",bo,bn;
if(!ap.debugMode){return false
}if(K&&ap.useConsole){if(bl&&typeof bl==="object"){console.log(bm,bl)
}else{if(aI[bl]!==d){console[aI[bl]](bm)
}else{console.log(bm)
}}if(ap.consoleOnly){return true
}}bo=ao(bp);
if(!bo){return false
}bn=aa.createElement("div");
if(++ax%2===0){bn.className="sm2-alt"
}if(bl===d){bl=0
}else{bl=parseInt(bl,10)
}bn.appendChild(aa.createTextNode(bm));
if(bl){if(bl>=2){bn.style.fontWeight="bold"
}if(bl===3){bn.style.color="#ff3333"
}}bo.insertBefore(bn,bo.firstChild);
bo=null;
return true
};
if(y.indexOf("sm2-debug=alert")!==-1){this._writeDebug=function(bl){c.alert(bl)
}
}this._wD=this._writeDebug;
this._debug=function(){var bm,bl;
W("currentObj",1);
for(bm=0,bl=ap.soundIDs.length;
bm<bl;
bm++){ap.sounds[ap.soundIDs[bm]]._debug()
}};
this.reboot=function(bp,bo){if(ap.soundIDs.length){ap._wD("Destroying "+ap.soundIDs.length+" SMSound object"+(ap.soundIDs.length!==1?"s":"")+"...")
}var bn,bm,bl;
for(bn=ap.soundIDs.length-1;
bn>=0;
bn--){ap.sounds[ap.soundIDs[bn]].destruct()
}if(ae){try{if(a8){ak=ae.innerHTML
}aL=ae.parentNode.removeChild(ae)
}catch(bq){W("badRemove",2)
}}ak=aL=C=ae=null;
ap.enabled=q=ay=aR=aJ=aq=aV=a2=a0=ap.swfLoaded=false;
ap.soundIDs=[];
ap.sounds={};
ah=0;
if(!bp){for(bn in w){if(w.hasOwnProperty(bn)){for(bm=0,bl=w[bn].length;
bm<bl;
bm++){w[bn][bm].fired=false
}}}}else{w=[]
}if(!bo){ap._wD(aY+": Rebooting...")
}ap.html5={usingFlash:null};
ap.flash={};
ap.html5Only=false;
ap.ignoreFlash=false;
c.setTimeout(function(){aE();
if(!bo){ap.beginDelayedInit()
}},20);
return ap
};
this.reset=function(){W("reset");
return ap.reboot(true,true)
};
this.getMoviePercent=function(){return(ae&&"PercentLoaded" in ae?ae.PercentLoaded():null)
};
this.beginDelayedInit=function(){bc=true;
M();
setTimeout(function(){if(aJ){return false
}I();
k();
aJ=true;
return true
},20);
z()
};
this.destruct=function(){ap._wD(aY+".destruct()");
ap.disable(true)
};
al=function(bz){var bA=this,bl,bw,bt,bm,bq,br,bn=false,bp=[],bx=0,bo,bs,bu=null,bv,by;
bv={duration:null,time:null};
this.id=bz.id;
this.sID=this.id;
this.url=bz.url;
this.options=a3(bz);
this.instanceOptions=this.options;
this._iO=this.instanceOptions;
this.pan=this.options.pan;
this.volume=this.options.volume;
this.isHTML5=false;
this._a=null;
by=(this.url?false:true);
this.id3={};
this._debug=function(){ap._wD(bA.id+": Merged options:",bA.options)
};
this.load=function(bB){var bC=null,bD;
if(bB!==d){bA._iO=a3(bB,bA.options)
}else{bB=bA.options;
bA._iO=bB;
if(bu&&bu!==bA.url){W("manURL");
bA._iO.url=bA.url;
bA.url=null
}}if(!bA._iO.url){bA._iO.url=bA.url
}bA._iO.url=ac(bA._iO.url);
bA.instanceOptions=bA._iO;
bD=bA._iO;
ap._wD(bA.id+": load ("+bD.url+")");
if(!bD.url&&!bA.url){ap._wD(bA.id+": load(): url is unassigned. Exiting.",2);
return bA
}if(!bA.isHTML5&&bi===8&&!bA.url&&!bD.autoPlay){ap._wD(bA.id+": Flash 8 load() limitation: Wait for onload() before calling play().",1)
}if(bD.url===bA.url&&bA.readyState!==0&&bA.readyState!==2){W("onURL",1);
if(bA.readyState===3&&bD.onload){aF(bA,function(){bD.onload.apply(bA,[(!!bA.duration)])
})
}return bA
}bA.loaded=false;
bA.readyState=1;
bA.playState=0;
bA.id3={};
if(bb(bD)){bC=bA._setup_html5(bD);
if(!bC._called_load){bA._html5_canplay=false;
if(bA.url!==bD.url){ap._wD(W("manURL")+": "+bD.url);
bA._a.src=bD.url;
bA.setPosition(0)
}bA._a.autobuffer="auto";
bA._a.preload="auto";
bA._a._called_load=true
}else{ap._wD(bA.id+": Ignoring request to load again")
}}else{if(ap.html5Only){ap._wD(bA.id+": No flash support. Exiting.");
return bA
}if(bA._iO.url&&bA._iO.url.match(/data\:/i)){ap._wD(bA.id+": data: URIs not supported via Flash. Exiting.");
return bA
}try{bA.isHTML5=false;
bA._iO=p(B(bD));
if(bA._iO.autoPlay&&(bA._iO.position||bA._iO.from)){ap._wD(bA.id+": Disabling autoPlay because of non-zero offset case");
bA._iO.autoPlay=false
}bD=bA._iO;
if(bi===8){ae._load(bA.id,bD.url,bD.stream,bD.autoPlay,bD.usePolicyFile)
}else{ae._load(bA.id,bD.url,!!(bD.stream),!!(bD.autoPlay),bD.loops||1,!!(bD.autoLoad),bD.usePolicyFile)
}}catch(bE){W("smError",2);
N("onload",false);
ab({type:"SMSOUND_LOAD_JS_EXCEPTION",fatal:true})
}}bA.url=bD.url;
return bA
};
this.unload=function(){if(bA.readyState!==0){ap._wD(bA.id+": unload()");
if(!bA.isHTML5){if(bi===8){ae._unload(bA.id,o)
}else{ae._unload(bA.id)
}}else{bm();
if(bA._a){bA._a.pause();
bu=g(bA._a)
}}bl()
}return bA
};
this.destruct=function(bB){ap._wD(bA.id+": Destruct");
if(!bA.isHTML5){bA._iO.onfailure=null;
ae._destroySound(bA.id)
}else{bm();
if(bA._a){bA._a.pause();
g(bA._a);
if(!a0){bt()
}bA._a._s=null;
bA._a=null
}}if(!bB){ap.destroySound(bA.id,true)
}};
this.play=function(bH,bD){var bB,bE,bK,bJ,bL,bI,bG,bF=true,bC=null;
bB=bA.id+": play(): ";
bD=(bD===d?true:bD);
if(!bH){bH={}
}if(bA.url){bA._iO.url=bA.url
}bA._iO=a3(bA._iO,bA.options);
bA._iO=a3(bH,bA._iO);
bA._iO.url=ac(bA._iO.url);
bA.instanceOptions=bA._iO;
if(!bA.isHTML5&&bA._iO.serverURL&&!bA.connected){if(!bA.getAutoPlay()){ap._wD(bB+" Netstream not connected yet - setting autoPlay");
bA.setAutoPlay(true)
}return bA
}if(bb(bA._iO)){bA._setup_html5(bA._iO);
bq()
}if(bA.playState===1&&!bA.paused){bE=bA._iO.multiShot;
if(!bE){ap._wD(bB+"Already playing (one-shot)",1);
if(bA.isHTML5){bA.setPosition(bA._iO.position)
}bC=bA
}else{ap._wD(bB+"Already playing (multi-shot)",1)
}}if(bC!==null){return bC
}if(bH.url&&bH.url!==bA.url){if(!bA.readyState&&!bA.isHTML5&&bi===8&&by){by=false
}else{bA.load(bA._iO)
}}if(!bA.loaded){if(bA.readyState===0){ap._wD(bB+"Attempting to load");
if(!bA.isHTML5&&!ap.html5Only){bA._iO.autoPlay=true;
bA.load(bA._iO)
}else{if(bA.isHTML5){bA.load(bA._iO)
}else{ap._wD(bB+"Unsupported type. Exiting.");
bC=bA
}}bA.instanceOptions=bA._iO
}else{if(bA.readyState===2){ap._wD(bB+"Could not load - exiting",2);
bC=bA
}else{ap._wD(bB+"Loading - attempting to play...")
}}}else{ap._wD(bB.substr(0,bB.lastIndexOf(":")))
}if(bC!==null){return bC
}if(!bA.isHTML5&&bi===9&&bA.position>0&&bA.position===bA.duration){ap._wD(bB+"Sound at end, resetting to position:0");
bH.position=0
}if(bA.paused&&bA.position>=0&&(!bA._iO.serverURL||bA.position>0)){ap._wD(bB+"Resuming from paused state",1);
bA.resume()
}else{bA._iO=a3(bH,bA._iO);
if(((!bA.isHTML5&&bA._iO.position!==null&&bA._iO.position>0)||(bA._iO.from!==null&&bA._iO.from>0)||bA._iO.to!==null)&&bA.instanceCount===0&&bA.playState===0&&!bA._iO.serverURL){bJ=function(){bA._iO=a3(bH,bA._iO);
bA.play(bA._iO)
};
if(bA.isHTML5&&!bA._html5_canplay){ap._wD(bB+"Beginning load for non-zero offset case");
bA.load({_oncanplay:bJ});
bC=false
}else{if(!bA.isHTML5&&!bA.loaded&&(!bA.readyState||bA.readyState!==2)){ap._wD(bB+"Preloading for non-zero offset case");
bA.load({onload:bJ});
bC=false
}}if(bC!==null){return bC
}bA._iO=bs()
}if(!bA.instanceCount||bA._iO.multiShotEvents||(bA.isHTML5&&bA._iO.multiShot&&!a0)||(!bA.isHTML5&&bi>8&&!bA.getAutoPlay())){bA.instanceCount++
}if(bA._iO.onposition&&bA.playState===0){br(bA)
}bA.playState=1;
bA.paused=false;
bA.position=(bA._iO.position!==d&&!isNaN(bA._iO.position)?bA._iO.position:0);
if(!bA.isHTML5){bA._iO=p(B(bA._iO))
}if(bA._iO.onplay&&bD){bA._iO.onplay.apply(bA);
bn=true
}bA.setVolume(bA._iO.volume,true);
bA.setPan(bA._iO.pan,true);
if(!bA.isHTML5){bF=ae._start(bA.id,bA._iO.loops||1,(bi===9?bA.position:bA.position/h),bA._iO.multiShot||false);
if(bi===9&&!bF){ap._wD(bB+"No sound hardware, or 32-sound ceiling hit",2);
if(bA._iO.onplayerror){bA._iO.onplayerror.apply(bA)
}}}else{if(bA.instanceCount<2){bq();
bK=bA._setup_html5();
bA.setPosition(bA._iO.position);
bK.play()
}else{ap._wD(bA.id+": Cloning Audio() for instance #"+bA.instanceCount+"...");
bL=new Audio(bA._iO.url);
bI=function(){am.remove(bL,"ended",bI);
bA._onfinish(bA);
g(bL);
bL=null
};
bG=function(){am.remove(bL,"canplay",bG);
try{bL.currentTime=bA._iO.position/h
}catch(bM){at(bA.id+": multiShot play() failed to apply position of "+(bA._iO.position/h))
}bL.play()
};
am.add(bL,"ended",bI);
if(bA._iO.volume!==undefined){bL.volume=Math.max(0,Math.min(1,bA._iO.volume/100))
}if(bA.muted){bL.muted=true
}if(bA._iO.position){am.add(bL,"canplay",bG)
}else{bL.play()
}}}}return bA
};
this.start=this.play;
this.stop=function(bB){var bD=bA._iO,bC;
if(bA.playState===1){ap._wD(bA.id+": stop()");
bA._onbufferchange(0);
bA._resetOnPosition(0);
bA.paused=false;
if(!bA.isHTML5){bA.playState=0
}bo();
if(bD.to){bA.clearOnPosition(bD.to)
}if(!bA.isHTML5){ae._stop(bA.id,bB);
if(bD.serverURL){bA.unload()
}}else{if(bA._a){bC=bA.position;
bA.setPosition(0);
bA.position=bC;
bA._a.pause();
bA.playState=0;
bA._onTimer();
bm()
}}bA.instanceCount=0;
bA._iO={};
if(bD.onstop){bD.onstop.apply(bA)
}}return bA
};
this.setAutoPlay=function(bB){ap._wD(bA.id+": Autoplay turned "+(bB?"on":"off"));
bA._iO.autoPlay=bB;
if(!bA.isHTML5){ae._setAutoPlay(bA.id,bB);
if(bB){if(!bA.instanceCount&&bA.readyState===1){bA.instanceCount++;
ap._wD(bA.id+": Incremented instance count to "+bA.instanceCount)
}}}};
this.getAutoPlay=function(){return bA._iO.autoPlay
};
this.setPosition=function(bD){if(bD===d){bD=0
}var bB,bC,bF=(bA.isHTML5?Math.max(bD,0):Math.min(bA.duration||bA._iO.duration,Math.max(bD,0)));
bA.position=bF;
bC=bA.position/h;
bA._resetOnPosition(bA.position);
bA._iO.position=bF;
if(!bA.isHTML5){bB=(bi===9?bA.position:bC);
if(bA.readyState&&bA.readyState!==2){ae._setPosition(bA.id,bB,(bA.paused||!bA.playState),bA._iO.multiShot)
}}else{if(bA._a){if(bA._html5_canplay){if(bA._a.currentTime!==bC){ap._wD(bA.id+": setPosition("+bC+")");
try{bA._a.currentTime=bC;
if(bA.playState===0||bA.paused){bA._a.pause()
}}catch(bE){ap._wD(bA.id+": setPosition("+bC+") failed: "+bE.message,2)
}}}else{if(bC){ap._wD(bA.id+": setPosition("+bC+"): Cannot seek yet, sound not ready",2);
return bA
}}if(bA.paused){bA._onTimer(true)
}}}return bA
};
this.pause=function(bB){if(bA.paused||(bA.playState===0&&bA.readyState!==1)){return bA
}ap._wD(bA.id+": pause()");
bA.paused=true;
if(!bA.isHTML5){if(bB||bB===d){ae._pause(bA.id,bA._iO.multiShot)
}}else{bA._setup_html5().pause();
bm()
}if(bA._iO.onpause){bA._iO.onpause.apply(bA)
}return bA
};
this.resume=function(){var bB=bA._iO;
if(!bA.paused){return bA
}ap._wD(bA.id+": resume()");
bA.paused=false;
bA.playState=1;
if(!bA.isHTML5){if(bB.isMovieStar&&!bB.serverURL){bA.setPosition(bA.position)
}ae._pause(bA.id,bB.multiShot)
}else{bA._setup_html5().play();
bq()
}if(!bn&&bB.onplay){bB.onplay.apply(bA);
bn=true
}else{if(bB.onresume){bB.onresume.apply(bA)
}}return bA
};
this.togglePause=function(){ap._wD(bA.id+": togglePause()");
if(bA.playState===0){bA.play({position:(bi===9&&!bA.isHTML5?bA.position:bA.position/h)});
return bA
}if(bA.paused){bA.resume()
}else{bA.pause()
}return bA
};
this.setPan=function(bC,bB){if(bC===d){bC=0
}if(bB===d){bB=false
}if(!bA.isHTML5){ae._setPan(bA.id,bC)
}bA._iO.pan=bC;
if(!bB){bA.pan=bC;
bA.options.pan=bC
}return bA
};
this.setVolume=function(bB,bC){if(bB===d){bB=100
}if(bC===d){bC=false
}if(!bA.isHTML5){ae._setVolume(bA.id,(ap.muted&&!bA.muted)||bA.muted?0:bB)
}else{if(bA._a){if(ap.muted&&!bA.muted){bA.muted=true;
bA._a.muted=true
}bA._a.volume=Math.max(0,Math.min(1,bB/100))
}}bA._iO.volume=bB;
if(!bC){bA.volume=bB;
bA.options.volume=bB
}return bA
};
this.mute=function(){bA.muted=true;
if(!bA.isHTML5){ae._setVolume(bA.id,0)
}else{if(bA._a){bA._a.muted=true
}}return bA
};
this.unmute=function(){bA.muted=false;
var bB=(bA._iO.volume!==d);
if(!bA.isHTML5){ae._setVolume(bA.id,bB?bA._iO.volume:bA.options.volume)
}else{if(bA._a){bA._a.muted=false
}}return bA
};
this.toggleMute=function(){return(bA.muted?bA.unmute():bA.mute())
};
this.onPosition=function(bD,bC,bB){bp.push({position:parseInt(bD,10),method:bC,scope:(bB!==d?bB:bA),fired:false});
return bA
};
this.onposition=this.onPosition;
this.clearOnPosition=function(bC,bB){var bD;
bC=parseInt(bC,10);
if(isNaN(bC)){return false
}for(bD=0;
bD<bp.length;
bD++){if(bC===bp[bD].position){if(!bB||(bB===bp[bD].method)){if(bp[bD].fired){bx--
}bp.splice(bD,1)
}}}};
this._processOnPosition=function(){var bC,bD,bB=bp.length;
if(!bB||!bA.playState||bx>=bB){return false
}for(bC=bB-1;
bC>=0;
bC--){bD=bp[bC];
if(!bD.fired&&bA.position>=bD.position){bD.fired=true;
bx++;
bD.method.apply(bD.scope,[bD.position]);
bB=bp.length
}}return true
};
this._resetOnPosition=function(bB){var bD,bE,bC=bp.length;
if(!bC){return false
}for(bD=bC-1;
bD>=0;
bD--){bE=bp[bD];
if(bE.fired&&bB<=bE.position){bE.fired=false;
bx--
}}return true
};
bs=function(){var bE=bA._iO,bD=bE.from,bC=bE.to,bF,bB;
bB=function(){ap._wD(bA.id+': "To" time of '+bC+" reached.");
bA.clearOnPosition(bC,bB);
bA.stop()
};
bF=function(){ap._wD(bA.id+': Playing "from" '+bD);
if(bC!==null&&!isNaN(bC)){bA.onPosition(bC,bB)
}};
if(bD!==null&&!isNaN(bD)){bE.position=bD;
bE.multiShot=false;
bF()
}return bE
};
br=function(){var bB,bC=bA._iO.onposition;
if(bC){for(bB in bC){if(bC.hasOwnProperty(bB)){bA.onPosition(parseInt(bB,10),bC[bB])
}}}};
bo=function(){var bB,bC=bA._iO.onposition;
if(bC){for(bB in bC){if(bC.hasOwnProperty(bB)){bA.clearOnPosition(parseInt(bB,10))
}}}};
bq=function(){if(bA.isHTML5){aP(bA)
}};
bm=function(){if(bA.isHTML5){O(bA)
}};
bl=function(bB){if(!bB){bp=[];
bx=0
}bn=false;
bA._hasTimer=null;
bA._a=null;
bA._html5_canplay=false;
bA.bytesLoaded=null;
bA.bytesTotal=null;
bA.duration=(bA._iO&&bA._iO.duration?bA._iO.duration:null);
bA.durationEstimate=null;
bA.buffered=[];
bA.eqData=[];
bA.eqData.left=[];
bA.eqData.right=[];
bA.failures=0;
bA.isBuffering=false;
bA.instanceOptions={};
bA.instanceCount=0;
bA.loaded=false;
bA.metadata={};
bA.readyState=0;
bA.muted=false;
bA.paused=false;
bA.peakData={left:0,right:0};
bA.waveformData={left:[],right:[]};
bA.playState=0;
bA.position=null;
bA.id3={}
};
bl();
this._onTimer=function(bD){var bF,bC=false,bE,bB={};
if(bA._hasTimer||bD){if(bA._a&&(bD||((bA.playState>0||bA.readyState===1)&&!bA.paused))){bF=bA._get_html5_duration();
if(bF!==bv.duration){bv.duration=bF;
bA.duration=bF;
bC=true
}bA.durationEstimate=bA.duration;
bE=(bA._a.currentTime*h||0);
if(bE!==bv.time){bv.time=bE;
bC=true
}if(bC||bD){bA._whileplaying(bE,bB,bB,bB,bB)
}}return bC
}};
this._get_html5_duration=function(){var bC=bA._iO,bD=(bA._a&&bA._a.duration?bA._a.duration*h:(bC&&bC.duration?bC.duration:null)),bB=(bD&&!isNaN(bD)&&bD!==Infinity?bD:null);
return bB
};
this._apply_loop=function(bB,bC){if(!bB.loop&&bC>1){ap._wD("Note: Native HTML5 looping is infinite.",1)
}bB.loop=(bC>1?"loop":"")
};
this._setup_html5=function(bC){var bD=a3(bA._iO,bC),bB=a0?a9:bA._a,bF=decodeURI(bD.url),bE;
if(a0){if(bF===decodeURI(l)){bE=true
}}else{if(bF===decodeURI(bu)){bE=true
}}if(bB){if(bB._s){if(a0){if(bB._s&&bB._s.playState&&!bE){bB._s.stop()
}}else{if(!a0&&bF===decodeURI(bu)){bA._apply_loop(bB,bD.loops);
return bB
}}}if(!bE){if(bu){bl(false)
}bB.src=bD.url;
bA.url=bD.url;
bu=bD.url;
l=bD.url;
bB._called_load=false
}}else{if(bD.autoLoad||bD.autoPlay){bA._a=new Audio(bD.url);
bA._a.load()
}else{bA._a=(v&&opera.version()<10?new Audio(null):new Audio())
}bB=bA._a;
bB._called_load=false;
if(a0){a9=bB
}}bA.isHTML5=true;
bA._a=bB;
bB._s=bA;
bw();
bA._apply_loop(bB,bD.loops);
if(bD.autoLoad||bD.autoPlay){bA.load()
}else{bB.autobuffer=false;
bB.preload="auto"
}return bB
};
bw=function(){if(bA._a._added_events){return false
}var bB;
function bC(bE,bD,bF){return bA._a?bA._a.addEventListener(bE,bD,bF||false):null
}bA._a._added_events=true;
for(bB in j){if(j.hasOwnProperty(bB)){bC(bB,j[bB])
}}return true
};
bt=function(){var bC;
function bB(bE,bD,bF){return(bA._a?bA._a.removeEventListener(bE,bD,bF||false):null)
}ap._wD(bA.id+": Removing event listeners");
bA._a._added_events=false;
for(bC in j){if(j.hasOwnProperty(bC)){bB(bC,j[bC])
}}};
this._onload=function(bD){var bB,bC=!!bD||(!bA.isHTML5&&bi===8&&bA.duration);
bB=bA.id+": ";
ap._wD(bB+(bC?"onload()":"Failed to load / invalid sound?"+(!bA.duration?" Zero-length duration reported.":" -")+" ("+bA.url+")"),(bC?1:2));
if(!bC&&!bA.isHTML5){if(ap.sandbox.noRemote===true){ap._wD(bB+bf("noNet"),1)
}if(ap.sandbox.noLocal===true){ap._wD(bB+bf("noLocal"),1)
}}bA.loaded=bC;
bA.readyState=bC?3:2;
bA._onbufferchange(0);
if(bA._iO.onload){aF(bA,function(){bA._iO.onload.apply(bA,[bC])
})
}return true
};
this._onbufferchange=function(bB){if(bA.playState===0){return false
}if((bB&&bA.isBuffering)||(!bB&&!bA.isBuffering)){return false
}bA.isBuffering=(bB===1);
if(bA._iO.onbufferchange){ap._wD(bA.id+": Buffer state change: "+bB);
bA._iO.onbufferchange.apply(bA,[bB])
}return true
};
this._onsuspend=function(){if(bA._iO.onsuspend){ap._wD(bA.id+": Playback suspended");
bA._iO.onsuspend.apply(bA)
}return true
};
this._onfailure=function(bC,bD,bB){bA.failures++;
ap._wD(bA.id+": Failure ("+bA.failures+"): "+bC);
if(bA._iO.onfailure&&bA.failures===1){bA._iO.onfailure(bC,bD,bB)
}else{ap._wD(bA.id+": Ignoring failure")
}};
this._onwarning=function(bC,bD,bB){if(bA._iO.onwarning){bA._iO.onwarning(bC,bD,bB)
}};
this._onfinish=function(){var bB=bA._iO.onfinish;
bA._onbufferchange(0);
bA._resetOnPosition(0);
if(bA.instanceCount){bA.instanceCount--;
if(!bA.instanceCount){bo();
bA.playState=0;
bA.paused=false;
bA.instanceCount=0;
bA.instanceOptions={};
bA._iO={};
bm();
if(bA.isHTML5){bA.position=0
}}if(!bA.instanceCount||bA._iO.multiShotEvents){if(bB){ap._wD(bA.id+": onfinish()");
aF(bA,function(){bB.apply(bA)
})
}}}};
this._whileloading=function(bB,bC,bF,bE){var bD=bA._iO;
bA.bytesLoaded=bB;
bA.bytesTotal=bC;
bA.duration=Math.floor(bF);
bA.bufferLength=bE;
if(!bA.isHTML5&&!bD.isMovieStar){if(bD.duration){bA.durationEstimate=(bA.duration>bD.duration)?bA.duration:bD.duration
}else{bA.durationEstimate=parseInt((bA.bytesTotal/bA.bytesLoaded)*bA.duration,10)
}}else{bA.durationEstimate=bA.duration
}if(!bA.isHTML5){bA.buffered=[{start:0,end:bA.duration}]
}if((bA.readyState!==3||bA.isHTML5)&&bD.whileloading){bD.whileloading.apply(bA)
}};
this._whileplaying=function(bD,bE,bH,bC,bG){var bF=bA._iO,bB;
if(isNaN(bD)||bD===null){return false
}bA.position=Math.max(0,bD);
bA._processOnPosition();
if(!bA.isHTML5&&bi>8){if(bF.usePeakData&&bE!==d&&bE){bA.peakData={left:bE.leftPeak,right:bE.rightPeak}
}if(bF.useWaveformData&&bH!==d&&bH){bA.waveformData={left:bH.split(","),right:bC.split(",")}
}if(bF.useEQData){if(bG!==d&&bG&&bG.leftEQ){bB=bG.leftEQ.split(",");
bA.eqData=bB;
bA.eqData.left=bB;
if(bG.rightEQ!==d&&bG.rightEQ){bA.eqData.right=bG.rightEQ.split(",")
}}}}if(bA.playState===1){if(!bA.isHTML5&&bi===8&&!bA.position&&bA.isBuffering){bA._onbufferchange(0)
}if(bF.whileplaying){bF.whileplaying.apply(bA)
}}return true
};
this._oncaptiondata=function(bB){ap._wD(bA.id+": Caption data received.");
bA.captiondata=bB;
if(bA._iO.oncaptiondata){bA._iO.oncaptiondata.apply(bA,[bB])
}};
this._onmetadata=function(bE,bB){ap._wD(bA.id+": Metadata received.");
var bF={},bD,bC;
for(bD=0,bC=bE.length;
bD<bC;
bD++){bF[bE[bD]]=bB[bD]
}bA.metadata=bF;
console.log("updated metadata",bA.metadata);
if(bA._iO.onmetadata){bA._iO.onmetadata.call(bA,bA.metadata)
}};
this._onid3=function(bE,bB){ap._wD(bA.id+": ID3 data received.");
var bF=[],bD,bC;
for(bD=0,bC=bE.length;
bD<bC;
bD++){bF[bE[bD]]=bB[bD]
}bA.id3=a3(bA.id3,bF);
if(bA._iO.onid3){bA._iO.onid3.apply(bA)
}};
this._onconnect=function(bB){bB=(bB===1);
ap._wD(bA.id+": "+(bB?"Connected.":"Failed to connect? - "+bA.url),(bB?1:2));
bA.connected=bB;
if(bB){bA.failures=0;
if(J(bA.id)){if(bA.getAutoPlay()){bA.play(d,bA.getAutoPlay())
}else{if(bA._iO.autoLoad){bA.load()
}}}if(bA._iO.onconnect){bA._iO.onconnect.apply(bA,[bB])
}}};
this._ondataerror=function(bB){if(bA.playState>0){ap._wD(bA.id+": Data error: "+bB);
if(bA._iO.ondataerror){bA._iO.ondataerror.apply(bA)
}}};
this._debug()
};
bg=function(){return(aa.body||aa.getElementsByTagName("div")[0])
};
ao=function(bl){return aa.getElementById(bl)
};
a3=function(bm,bl){var bo=(bm||{}),bn,bp;
bn=(bl===d?ap.defaultOptions:bl);
for(bp in bn){if(bn.hasOwnProperty(bp)&&bo[bp]===d){if(typeof bn[bp]!=="object"||bn[bp]===null){bo[bp]=bn[bp]
}else{bo[bp]=a3(bo[bp],bn[bp])
}}}return bo
};
aF=function(bl,bm){if(!bl.isHTML5&&bi===8){c.setTimeout(bm,0)
}else{bm()
}};
a4={onready:1,ontimeout:1,defaultOptions:1,flash9Options:1,movieStarOptions:1};
a7=function(br,bq){var bp,bm=true,bl=(bq!==d),bo=ap.setupOptions,bn=a4;
if(br===d){bm=[];
for(bp in bo){if(bo.hasOwnProperty(bp)){bm.push(bp)
}}for(bp in bn){if(bn.hasOwnProperty(bp)){if(typeof ap[bp]==="object"){bm.push(bp+": {...}")
}else{if(ap[bp] instanceof Function){bm.push(bp+": function() {...}")
}else{bm.push(bp)
}}}}ap._wD(bf("setup",bm.join(", ")));
return false
}for(bp in br){if(br.hasOwnProperty(bp)){if(typeof br[bp]!=="object"||br[bp]===null||br[bp] instanceof Array||br[bp] instanceof RegExp){if(bl&&bn[bq]!==d){ap[bq][bp]=br[bp]
}else{if(bo[bp]!==d){ap.setupOptions[bp]=br[bp];
ap[bp]=br[bp]
}else{if(bn[bp]===d){at(bf((ap[bp]===d?"setupUndef":"setupError"),bp),2);
bm=false
}else{if(ap[bp] instanceof Function){ap[bp].apply(ap,(br[bp] instanceof Array?br[bp]:[br[bp]]))
}else{ap[bp]=br[bp]
}}}}}else{if(bn[bp]===d){at(bf((ap[bp]===d?"setupUndef":"setupError"),bp),2);
bm=false
}else{return a7(br[bp],bp)
}}}}return bm
};
function bj(bl){return(ap.preferFlash&&au&&!ap.ignoreFlash&&(ap.flash[bl]!==d&&ap.flash[bl]))
}am=(function(){var bn=(c.attachEvent),bm={add:(bn?"attachEvent":"addEventListener"),remove:(bn?"detachEvent":"removeEventListener")};
function bp(bt){var bs=S.call(bt),br=bs.length;
if(bn){bs[1]="on"+bs[1];
if(br>3){bs.pop()
}}else{if(br===3){bs.push(false)
}}return bs
}function bo(br,bu){var bs=br.shift(),bt=[bm[bu]];
if(bn){bs[bt](br[0],br[1])
}else{bs[bt].apply(bs,br)
}}function bq(){bo(bp(arguments),"add")
}function bl(){bo(bp(arguments),"remove")
}return{add:bq,remove:bl}
}());
function aQ(bl){return function(bo){var bn=this._s,bm;
if(!bn||!bn._a){if(bn&&bn.id){ap._wD(bn.id+": Ignoring "+bo.type)
}else{ap._wD(a5+"Ignoring "+bo.type)
}bm=null
}else{bm=bl.call(this,bo)
}return bm
}
}j={abort:aQ(function(){ap._wD(this._s.id+": abort")
}),canplay:aQ(function(){var bn=this._s,bm;
if(bn._html5_canplay){return true
}bn._html5_canplay=true;
ap._wD(bn.id+": canplay");
bn._onbufferchange(0);
bm=(bn._iO.position!==d&&!isNaN(bn._iO.position)?bn._iO.position/h:null);
if(this.currentTime!==bm){ap._wD(bn.id+": canplay: Setting position to "+bm);
try{this.currentTime=bm
}catch(bl){ap._wD(bn.id+": canplay: Setting position of "+bm+" failed: "+bl.message,2)
}}if(bn._iO._oncanplay){bn._iO._oncanplay()
}}),canplaythrough:aQ(function(){var bl=this._s;
if(!bl.loaded){bl._onbufferchange(0);
bl._whileloading(bl.bytesLoaded,bl.bytesTotal,bl._get_html5_duration());
bl._onload(true)
}}),durationchange:aQ(function(){var bl=this._s,bm;
bm=bl._get_html5_duration();
if(!isNaN(bm)&&bm!==bl.duration){ap._wD(this._s.id+": durationchange ("+bm+")"+(bl.duration?", previously "+bl.duration:""));
bl.durationEstimate=bl.duration=bm
}}),ended:aQ(function(){var bl=this._s;
ap._wD(bl.id+": ended");
bl._onfinish()
}),error:aQ(function(){ap._wD(this._s.id+": HTML5 error, code "+this.error.code);
this._s._onload(false)
}),loadeddata:aQ(function(){var bl=this._s;
ap._wD(bl.id+": loadeddata");
if(!bl._loaded&&!aZ){bl.duration=bl._get_html5_duration()
}}),loadedmetadata:aQ(function(){ap._wD(this._s.id+": loadedmetadata")
}),loadstart:aQ(function(){ap._wD(this._s.id+": loadstart");
this._s._onbufferchange(1)
}),play:aQ(function(){this._s._onbufferchange(0)
}),playing:aQ(function(){ap._wD(this._s.id+": playing "+String.fromCharCode(9835));
this._s._onbufferchange(0)
}),progress:aQ(function(bq){var bu=this._s,bp,bn,bt,bm=0,bs=(bq.type==="progress"),bl=bq.target.buffered,bo=(bq.loaded||0),br=(bq.total||1);
bu.buffered=[];
if(bl&&bl.length){for(bp=0,bn=bl.length;
bp<bn;
bp++){bu.buffered.push({start:bl.start(bp)*h,end:bl.end(bp)*h})
}bm=(bl.end(0)-bl.start(0))*h;
bo=Math.min(1,bm/(bq.target.duration*h));
if(bs&&bl.length>1){bt=[];
bn=bl.length;
for(bp=0;
bp<bn;
bp++){bt.push(bq.target.buffered.start(bp)*h+"-"+bq.target.buffered.end(bp)*h)
}ap._wD(this._s.id+": progress, timeRanges: "+bt.join(", "))
}if(bs&&!isNaN(bo)){ap._wD(this._s.id+": progress, "+Math.floor(bo*100)+"% loaded")
}}if(!isNaN(bo)){bu._whileloading(bo,br,bu._get_html5_duration());
if(bo&&br&&bo===br){j.canplaythrough.call(this,bq)
}}}),ratechange:aQ(function(){ap._wD(this._s.id+": ratechange")
}),suspend:aQ(function(bm){var bl=this._s;
ap._wD(this._s.id+": suspend");
j.progress.call(this,bm);
bl._onsuspend()
}),stalled:aQ(function(){ap._wD(this._s.id+": stalled")
}),timeupdate:aQ(function(){this._s._onTimer()
}),waiting:aQ(function(){var bl=this._s;
ap._wD(this._s.id+": waiting");
bl._onbufferchange(1)
})};
bb=function(bm){var bl;
if(!bm||(!bm.type&&!bm.url&&!bm.serverURL)){bl=false
}else{if(bm.serverURL||(bm.type&&bj(bm.type))){bl=false
}else{bl=((bm.type?an({type:bm.type}):an({url:bm.url})||ap.html5Only||bm.url.match(/data\:/i)))
}}return bl
};
g=function(bl){var bm;
if(bl){bm=(aZ?o:(ap.html5.canPlayType("audio/wav")?aT:o));
bl.src=bm;
if(bl._called_unload!==undefined){bl._called_load=false
}}if(a0){l=null
}return bm
};
an=function(bs){if(!ap.useHTML5Audio||!ap.hasHTML5){return false
}var bo=(bs.url||null),bq=(bs.type||null),bm=ap.audioFormats,bl,br,bn,bp;
if(bq&&ap.html5[bq]!==d){return(ap.html5[bq]&&!bj(bq))
}if(!aM){aM=[];
for(bp in bm){if(bm.hasOwnProperty(bp)){aM.push(bp);
if(bm[bp].related){aM=aM.concat(bm[bp].related)
}}}aM=new RegExp("\\.("+aM.join("|")+")(\\?.*)?$","i")
}bn=(bo?bo.toLowerCase().match(aM):null);
if(!bn||!bn.length){if(!bq){bl=false
}else{br=bq.indexOf(";");
bn=(br!==-1?bq.substr(0,br):bq).substr(6)
}}else{bn=bn[1]
}if(bn&&ap.html5[bn]!==d){bl=(ap.html5[bn]&&!bj(bn))
}else{bq="audio/"+bn;
bl=ap.html5.canPlayType({type:bq});
ap.html5[bn]=bl;
bl=(bl&&ap.html5[bq]&&!bj(bq))
}return bl
};
aO=function(){if(!ap.useHTML5Audio||!ap.hasHTML5){ap.html5.usingFlash=true;
C=true;
return false
}var bl=(Audio!==d?(v&&opera.version()<10?new Audio(null):new Audio()):null),bp,br,bo={},bm,bn;
function bq(bu){var bw,bv,bt=false,bs=false;
if(!bl||typeof bl.canPlayType!=="function"){return bt
}if(bu instanceof Array){for(bn=0,bv=bu.length;
bn<bv;
bn++){if(ap.html5[bu[bn]]||bl.canPlayType(bu[bn]).match(ap.html5Test)){bs=true;
ap.html5[bu[bn]]=true;
ap.flash[bu[bn]]=!!(bu[bn].match(r))
}}bt=bs
}else{bw=(bl&&typeof bl.canPlayType==="function"?bl.canPlayType(bu):false);
bt=!!(bw&&(bw.match(ap.html5Test)))
}return bt
}bm=ap.audioFormats;
for(bp in bm){if(bm.hasOwnProperty(bp)){br="audio/"+bp;
bo[bp]=bq(bm[bp].type);
bo[br]=bo[bp];
if(bp.match(r)){ap.flash[bp]=true;
ap.flash[br]=true
}else{ap.flash[bp]=false;
ap.flash[br]=false
}if(bm[bp]&&bm[bp].related){for(bn=bm[bp].related.length-1;
bn>=0;
bn--){bo["audio/"+bm[bp].related[bn]]=bo[bp];
ap.html5[bm[bp].related[bn]]=bo[bp];
ap.flash[bm[bp].related[bn]]=bo[bp]
}}}}bo.canPlayType=(bl?bq:null);
ap.html5=a3(ap.html5,bo);
ap.html5.usingFlash=T();
C=ap.html5.usingFlash;
return true
};
e={notReady:"Unavailable - wait until onready() has fired.",notOK:"Audio support is not available.",domError:aY+"exception caught while appending SWF to DOM.",spcWmode:"Removing wmode, preventing known SWF loading issue(s)",swf404:G+"Verify that %s is a valid path.",tryDebug:"Try "+aY+".debugFlash = true for more security details (output goes to SWF.)",checkSWF:"See SWF output for more debug info.",localFail:G+"Non-HTTP page ("+aa.location.protocol+" URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",waitFocus:G+"Special case: Waiting for SWF to load with window focus...",waitForever:G+"Waiting indefinitely for Flash (will recover if unblocked)...",waitSWF:G+"Waiting for 100% SWF load...",needFunction:G+"Function object expected for %s",badID:'Sound ID "%s" should be a string, starting with a non-numeric character',currentObj:G+"_debug(): Current sound objects",waitOnload:G+"Waiting for window.onload()",docLoaded:G+"Document already loaded",onload:G+"initComplete(): calling soundManager.onload()",onloadOK:aY+".onload() complete",didInit:G+"init(): Already called?",secNote:"Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",badRemove:G+"Failed to remove Flash node.",shutdown:aY+".disable(): Shutting down",queue:G+"Queueing %s handler",smError:"SMSound.load(): Exception: JS-Flash communication failed, or JS error.",fbTimeout:"No flash response, applying ."+F.swfTimedout+" CSS...",fbLoaded:"Flash loaded",fbHandler:G+"flashBlockHandler()",manURL:"SMSound.load(): Using manually-assigned URL",onURL:aY+".load(): current URL already assigned.",badFV:aY+'.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',as2loop:"Note: Setting stream:false so looping can work (flash 8 limitation)",noNSLoop:"Note: Looping not implemented for MovieStar formats",needfl9:"Note: Switching to flash 9, required for MP4 formats.",mfTimeout:"Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",needFlash:G+"Fatal error: Flash is needed to play some required formats, but is not available.",gotFocus:G+"Got window focus.",policy:"Enabling usePolicyFile for data access",setup:aY+".setup(): allowed parameters: %s",setupError:aY+'.setup(): "%s" cannot be assigned with this method.',setupUndef:aY+'.setup(): Could not find option "%s"',setupLate:aY+".setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",noURL:G+"Flash URL required. Call soundManager.setup({url:...}) to get started.",sm2Loaded:"SoundManager 2: Ready. "+String.fromCharCode(10003),reset:aY+".reset(): Removing event callbacks",mobileUA:"Mobile UA detected, preferring HTML5 by default.",globalHTML5:"Using singleton HTML5 Audio() pattern for this device."};
bf=function(){var bm,bn,bl,bp,bo;
bm=S.call(arguments);
bp=bm.shift();
bo=(e&&e[bp]?e[bp]:"");
if(bo&&bm&&bm.length){for(bn=0,bl=bm.length;
bn<bl;
bn++){bo=bo.replace("%s",bm[bn])
}}return bo
};
B=function(bl){if(bi===8&&bl.loops>1&&bl.stream){W("as2loop");
bl.stream=false
}return bl
};
p=function(bm,bl){if(bm&&!bm.usePolicyFile&&(bm.onid3||bm.usePeakData||bm.useWaveformData||bm.useEQData)){ap._wD((bl||"")+bf("policy"));
bm.usePolicyFile=true
}return bm
};
at=function(bl){if(K&&console.warn!==d){console.warn(bl)
}else{ap._wD(bl)
}};
U=function(){return false
};
X=function(bm){var bl;
for(bl in bm){if(bm.hasOwnProperty(bl)&&typeof bm[bl]==="function"){bm[bl]=U
}}bl=null
};
s=function(bl){if(bl===d){bl=false
}if(a2||bl){ap.disable(bl)
}};
aA=function(bl){var bm=null,bn;
if(bl){if(bl.match(/\.swf(\?.*)?$/i)){bm=bl.substr(bl.toLowerCase().lastIndexOf(".swf?")+4);
if(bm){return bl
}}else{if(bl.lastIndexOf("/")!==bl.length-1){bl+="/"
}}}bn=(bl&&bl.lastIndexOf("/")!==-1?bl.substr(0,bl.lastIndexOf("/")+1):"./")+ap.movieURL;
if(ap.noSWFCache){bn+=("?ts="+new Date().getTime())
}return bn
};
aW=function(){bi=parseInt(ap.flashVersion,10);
if(bi!==8&&bi!==9){ap._wD(bf("badFV",bi,Y));
ap.flashVersion=bi=Y
}var bl=(ap.debugMode||ap.debugFlash?"_debug.swf":".swf");
if(ap.useHTML5Audio&&!ap.html5Only&&ap.audioFormats.mp4.required&&bi<9){ap._wD(bf("needfl9"));
ap.flashVersion=bi=9
}ap.version=ap.versionNumber+(ap.html5Only?" (HTML5-only mode)":(bi===9?" (AS3/Flash 9)":" (AS2/Flash 8)"));
if(bi>8){ap.defaultOptions=a3(ap.defaultOptions,ap.flash9Options);
ap.features.buffering=true;
ap.defaultOptions=a3(ap.defaultOptions,ap.movieStarOptions);
ap.filePatterns.flash9=new RegExp("\\.(mp3|"+V.join("|")+")(\\?.*)?$","i");
ap.features.movieStar=true
}else{ap.features.movieStar=false
}ap.filePattern=ap.filePatterns[(bi!==8?"flash9":"flash8")];
ap.movieURL=(bi===8?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",bl);
ap.features.peakData=ap.features.waveformData=ap.features.eqData=(bi>8)
};
m=function(bl,bm){if(!ae){return false
}ae._setPolling(bl,bm)
};
E=function(){if(ap.debugURLParam.test(y)){ap.debugMode=true
}if(ao(ap.debugID)){return false
}var bq,bp,bl,bn,bm;
if(ap.debugMode&&!ao(ap.debugID)&&(!K||!ap.useConsole||!ap.consoleOnly)){bq=aa.createElement("div");
bq.id=ap.debugID+"-toggle";
bn={position:"fixed",bottom:"0px",right:"0px",width:"1.2em",height:"1.2em",lineHeight:"1.2em",margin:"2px",textAlign:"center",border:"1px solid #999",cursor:"pointer",background:"#fff",color:"#333",zIndex:10001};
bq.appendChild(aa.createTextNode("-"));
bq.onclick=aD;
bq.title="Toggle SM2 debug console";
if(av.match(/msie 6/i)){bq.style.position="absolute";
bq.style.cursor="hand"
}for(bm in bn){if(bn.hasOwnProperty(bm)){bq.style[bm]=bn[bm]
}}bp=aa.createElement("div");
bp.id=ap.debugID;
bp.style.display=(ap.debugMode?"block":"none");
if(ap.debugMode&&!ao(bq.id)){try{bl=bg();
bl.appendChild(bq)
}catch(bo){throw new Error(bf("domError")+" \n"+bo.toString())
}bl.appendChild(bp)
}}bl=null
};
J=this.getSoundById;
W=function(bm,bl){return(!bm?"":ap._wD(bf(bm),bl))
};
aD=function(){var bm=ao(ap.debugID),bl=ao(ap.debugID+"-toggle");
if(!bm){return false
}if(bh){bl.innerHTML="+";
bm.style.display="none"
}else{bl.innerHTML="-";
bm.style.display="block"
}bh=!bh
};
N=function(bo,bl,bm){if(c.sm2Debugger!==d){try{sm2Debugger.handleEvent(bo,bl,bm)
}catch(bn){return false
}}return true
};
n=function(){var bl=[];
if(ap.debugMode){bl.push(F.sm2Debug)
}if(ap.debugFlash){bl.push(F.flashDebug)
}if(ap.useHighPerformance){bl.push(F.highPerf)
}return bl.join(" ")
};
aB=function(){var bm=bf("fbHandler"),bo=ap.getMoviePercent(),bn=F,bl={type:"FLASHBLOCK"};
if(ap.html5Only){return false
}if(!ap.ok()){if(C){ap.oMC.className=n()+" "+bn.swfDefault+" "+(bo===null?bn.swfTimedout:bn.swfError);
ap._wD(bm+": "+bf("fbTimeout")+(bo?" ("+bf("fbLoaded")+")":""))
}ap.didFlashBlock=true;
aS({type:"ontimeout",ignoreInit:true,error:bl});
ab(bl)
}else{if(ap.didFlashBlock){ap._wD(bm+": Unblocked")
}if(ap.oMC){ap.oMC.className=[n(),bn.swfDefault,bn.swfLoaded+(ap.didFlashBlock?" "+bn.swfUnblocked:"")].join(" ")
}}};
Z=function(bn,bm,bl){if(w[bn]===d){w[bn]=[]
}w[bn].push({method:bm,scope:(bl||null),fired:false})
};
aS=function(br){if(!br){br={type:(ap.ok()?"onready":"ontimeout")}
}if(!ay&&br&&!br.ignoreInit){return false
}if(br.type==="ontimeout"&&(ap.ok()||(a2&&!br.ignoreInit))){return false
}var bn={success:(br&&br.ignoreInit?ap.ok():!a2)},bm=(br&&br.type?w[br.type]||[]:[]),bl=[],bs,bq,bp=[bn],bo=(C&&!ap.ok());
if(br.error){bp[0].error=br.error
}for(bs=0,bq=bm.length;
bs<bq;
bs++){if(bm[bs].fired!==true){bl.push(bm[bs])
}}if(bl.length){for(bs=0,bq=bl.length;
bs<bq;
bs++){if(bl[bs].scope){bl[bs].method.apply(bl[bs].scope,bp)
}else{bl[bs].method.apply(this,bp)
}if(!bo){bl[bs].fired=true
}}}return true
};
t=function(){c.setTimeout(function(){if(ap.useFlashBlock){aB()
}aS();
if(typeof ap.onload==="function"){W("onload",1);
ap.onload.apply(c);
W("onloadOK",1)
}if(ap.waitForWindowLoad){am.add(c,"load",t)
}},1)
};
R=function(){if(au!==d){return au
}var bl=false,bs=navigator,bo=bs.plugins,br,bn,bm,bq=c.ActiveXObject;
if(bo&&bo.length){bn="application/x-shockwave-flash";
bm=bs.mimeTypes;
if(bm&&bm[bn]&&bm[bn].enabledPlugin&&bm[bn].enabledPlugin.description){bl=true
}}else{if(bq!==d&&!av.match(/MSAppHost/i)){try{br=new bq("ShockwaveFlash.ShockwaveFlash")
}catch(bp){br=null
}bl=(!!br);
br=null
}}au=bl;
return bl
};
T=function(){var bm,bo,bl=ap.audioFormats,bn=(aX&&!!(av.match(/os (1|2|3_0|3_1)\s/i)));
if(bn){ap.hasHTML5=false;
ap.html5Only=true;
if(ap.oMC){ap.oMC.style.display="none"
}}else{if(ap.useHTML5Audio){if(!ap.html5||!ap.html5.canPlayType){ap._wD("SoundManager: No HTML5 Audio() support detected.");
ap.hasHTML5=false
}if(a6){ap._wD(G+"Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - "+(!au?" would use flash fallback for MP3/MP4, but none detected.":"will use flash fallback for MP3/MP4, if available"),1)
}}}if(ap.useHTML5Audio&&ap.hasHTML5){ag=true;
for(bo in bl){if(bl.hasOwnProperty(bo)){if(bl[bo].required){if(!ap.html5.canPlayType(bl[bo].type)){ag=false;
bm=true
}else{if(ap.preferFlash&&(ap.flash[bo]||ap.flash[bl[bo].type])){bm=true
}}}}}}if(ap.ignoreFlash){bm=false;
ag=true
}ap.html5Only=(ap.hasHTML5&&ap.useHTML5Audio&&!bm);
return(!ap.html5Only)
};
ac=function(bn){var bp,bm,bo=0,bl;
if(bn instanceof Array){for(bp=0,bm=bn.length;
bp<bm;
bp++){if(bn[bp] instanceof Object){if(ap.canPlayMIME(bn[bp].type)){bo=bp;
break
}}else{if(ap.canPlayURL(bn[bp])){bo=bp;
break
}}}if(bn[bo].url){bn[bo]=bn[bo].url
}bl=bn[bo]
}else{bl=bn
}return bl
};
aP=function(bl){if(!bl._hasTimer){bl._hasTimer=true;
if(!aU&&ap.html5PollingInterval){if(be===null&&L===0){be=setInterval(af,ap.html5PollingInterval)
}L++
}}};
O=function(bl){if(bl._hasTimer){bl._hasTimer=false;
if(!aU&&ap.html5PollingInterval){L--
}}};
af=function(){var bl;
if(be!==null&&!L){clearInterval(be);
be=null;
return false
}for(bl=ap.soundIDs.length-1;
bl>=0;
bl--){if(ap.sounds[ap.soundIDs[bl]].isHTML5&&ap.sounds[ap.soundIDs[bl]]._hasTimer){ap.sounds[ap.soundIDs[bl]]._onTimer()
}}};
ab=function(bl){bl=(bl!==d?bl:{});
if(typeof ap.onerror==="function"){ap.onerror.apply(c,[{type:(bl.type!==d?bl.type:null)}])
}if(bl.fatal!==d&&bl.fatal){ap.disable()
}};
D=function(){if(!a6||!R()){return false
}var bl=ap.audioFormats,bm,bn;
for(bn in bl){if(bl.hasOwnProperty(bn)){if(bn==="mp3"||bn==="mp4"){ap._wD(aY+": Using flash fallback for "+bn+" format");
ap.html5[bn]=false;
if(bl[bn]&&bl[bn].related){for(bm=bl[bn].related.length-1;
bm>=0;
bm--){ap.html5[bl[bn].related[bm]]=false
}}}}}};
this._setSandboxType=function(bl){var bm=ap.sandbox;
bm.type=bl;
bm.description=bm.types[(bm.types[bl]!==d?bl:"unknown")];
if(bm.type==="localWithFile"){bm.noRemote=true;
bm.noLocal=false;
W("secNote",2)
}else{if(bm.type==="localWithNetwork"){bm.noRemote=false;
bm.noLocal=true
}else{if(bm.type==="localTrusted"){bm.noRemote=false;
bm.noLocal=false
}}}};
this._externalInterfaceOK=function(bm){if(ap.swfLoaded){return false
}var bn;
N("swf",true);
N("flashtojs",true);
ap.swfLoaded=true;
ba=false;
if(a6){D()
}if(!bm||bm.replace(/\+dev/i,"")!==ap.versionNumber.replace(/\+dev/i,"")){bn=aY+': Fatal: JavaScript file build "'+ap.versionNumber+'" does not match Flash SWF build "'+bm+'" at '+ap.url+". Ensure both are up-to-date.";
setTimeout(function bl(){throw new Error(bn)
},0);
return false
}setTimeout(aK,a8?100:1)
};
I=function(by,bp){if(aq&&aV){return false
}function bA(){var bG=[],bI,bH=[],bF=" + ";
bI="SoundManager "+ap.version+(!ap.html5Only&&ap.useHTML5Audio?(ap.hasHTML5?" + HTML5 audio":", no HTML5 audio support"):"");
if(!ap.html5Only){if(ap.preferFlash){bG.push("preferFlash")
}if(ap.useHighPerformance){bG.push("useHighPerformance")
}if(ap.flashPollingInterval){bG.push("flashPollingInterval ("+ap.flashPollingInterval+"ms)")
}if(ap.html5PollingInterval){bG.push("html5PollingInterval ("+ap.html5PollingInterval+"ms)")
}if(ap.wmode){bG.push("wmode ("+ap.wmode+")")
}if(ap.debugFlash){bG.push("debugFlash")
}if(ap.useFlashBlock){bG.push("flashBlock")
}}else{if(ap.html5PollingInterval){bG.push("html5PollingInterval ("+ap.html5PollingInterval+"ms)")
}}if(bG.length){bH=bH.concat([bG.join(bF)])
}ap._wD(bI+(bH.length?bF+bH.join(", "):""),1);
aG()
}if(ap.html5Only){aW();
bA();
ap.oMC=ao(ap.movieID);
aK();
aq=true;
aV=true;
return false
}var bx=(bp||ap.url),bt=(ap.altURL||bx),bE="JS/Flash audio component (SoundManager 2)",bw=bg(),bv=n(),bl=null,bo=aa.getElementsByTagName("html")[0],bB,bq,bC,bu,bs,br,bn,bD;
bl=(bo&&bo.dir&&bo.dir.match(/rtl/i));
by=(by===d?ap.id:by);
function bm(bF,bG){return'<param name="'+bF+'" value="'+bG+'" />'
}aW();
ap.url=aA(H?bx:bt);
bp=ap.url;
ap.wmode=(!ap.wmode&&ap.useHighPerformance?"transparent":ap.wmode);
if(ap.wmode!==null&&(av.match(/msie 8/i)||(!a8&&!ap.useHighPerformance))&&navigator.platform.match(/win32|win64/i)){ar.push(e.spcWmode);
ap.wmode=null
}bB={name:by,id:by,src:bp,quality:"high",allowScriptAccess:ap.allowScriptAccess,bgcolor:ap.bgColor,pluginspage:aN+"www.macromedia.com/go/getflashplayer",title:bE,type:"application/x-shockwave-flash",wmode:ap.wmode,hasPriority:"true"};
if(ap.debugFlash){bB.FlashVars="debug=1"
}if(!ap.wmode){delete bB.wmode
}if(a8){bq=aa.createElement("div");
bu=['<object id="'+by+'" data="'+bp+'" type="'+bB.type+'" title="'+bB.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+aN+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',bm("movie",bp),bm("AllowScriptAccess",ap.allowScriptAccess),bm("quality",bB.quality),(ap.wmode?bm("wmode",ap.wmode):""),bm("bgcolor",ap.bgColor),bm("hasPriority","true"),(ap.debugFlash?bm("FlashVars",bB.FlashVars):""),"</object>"].join("")
}else{bq=aa.createElement("embed");
for(bC in bB){if(bB.hasOwnProperty(bC)){bq.setAttribute(bC,bB[bC])
}}}E();
bv=n();
bw=bg();
if(bw){ap.oMC=(ao(ap.movieID)||aa.createElement("div"));
if(!ap.oMC.id){ap.oMC.id=ap.movieID;
ap.oMC.className=F.swfDefault+" "+bv;
br=null;
bs=null;
if(!ap.useFlashBlock){if(ap.useHighPerformance){br={position:"fixed",width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"}
}else{br={position:"absolute",width:"6px",height:"6px",top:"-9999px",left:"-9999px"};
if(bl){br.left=Math.abs(parseInt(br.left,10))+"px"
}}}if(aH){ap.oMC.style.zIndex=10000
}if(!ap.debugFlash){for(bn in br){if(br.hasOwnProperty(bn)){ap.oMC.style[bn]=br[bn]
}}}try{if(!a8){ap.oMC.appendChild(bq)
}bw.appendChild(ap.oMC);
if(a8){bs=ap.oMC.appendChild(aa.createElement("div"));
bs.className=F.swfBox;
bs.innerHTML=bu
}aV=true
}catch(bz){throw new Error(bf("domError")+" \n"+bz.toString())
}}else{bD=ap.oMC.className;
ap.oMC.className=(bD?bD+" ":F.swfDefault)+(bv?" "+bv:"");
ap.oMC.appendChild(bq);
if(a8){bs=ap.oMC.appendChild(aa.createElement("div"));
bs.className=F.swfBox;
bs.innerHTML=bu
}aV=true
}}aq=true;
bA();
return true
};
k=function(){if(ap.html5Only){I();
return false
}if(ae){return false
}if(!ap.url){W("noURL");
return false
}ae=ap.getMovie(ap.id);
if(!ae){if(!aL){I(ap.id,ap.url)
}else{if(!a8){ap.oMC.appendChild(aL)
}else{ap.oMC.innerHTML=ak
}aL=null;
aq=true
}ae=ap.getMovie(ap.id)
}if(typeof ap.oninitmovie==="function"){setTimeout(ap.oninitmovie,1)
}Q();
return true
};
z=function(){setTimeout(bd,1000)
};
ad=function(){c.setTimeout(function(){at(G+"useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...");
ap.setup({preferFlash:false}).reboot();
ap.didFlashBlock=true;
ap.beginDelayedInit()
},1)
};
bd=function(){var bm,bl=false;
if(!ap.url){return false
}if(aR){return false
}aR=true;
am.remove(c,"load",z);
if(au&&ba&&!aC){W("waitFocus");
return false
}if(!ay){bm=ap.getMoviePercent();
if(bm>0&&bm<100){bl=true
}}setTimeout(function(){bm=ap.getMoviePercent();
if(bl){aR=false;
ap._wD(bf("waitSWF"));
c.setTimeout(z,1);
return false
}if(!ay){ap._wD(aY+": No Flash response within expected time. Likely causes: "+(bm===0?"SWF load failed, ":"")+"Flash blocked or JS-Flash security error."+(ap.debugFlash?" "+bf("checkSWF"):""),2);
if(!H&&bm){W("localFail",2);
if(!ap.debugFlash){W("tryDebug",2)
}}if(bm===0){ap._wD(bf("swf404",ap.url),1)
}N("flashtojs",false,": Timed out"+H?" (Check flash security or flash blockers)":" (No plugin/missing SWF?)")
}if(!ay&&az){if(bm===null){if(ap.useFlashBlock||ap.flashLoadTimeout===0){if(ap.useFlashBlock){aB()
}W("waitForever")
}else{if(!ap.useFlashBlock&&ag){ad()
}else{W("waitForever");
aS({type:"ontimeout",ignoreInit:true,error:{type:"INIT_FLASHBLOCK"}})
}}}else{if(ap.flashLoadTimeout===0){W("waitForever")
}else{if(!ap.useFlashBlock&&ag){ad()
}else{s(true)
}}}}},ap.flashLoadTimeout)
};
u=function(){function bl(){am.remove(c,"focus",u)
}if(aC||!ba){bl();
return true
}az=true;
aC=true;
W("gotFocus");
aR=false;
z();
bl();
return true
};
Q=function(){if(ar.length){ap._wD("SoundManager 2: "+ar.join(" "),1);
ar=[]
}};
aG=function(){Q();
var bm,bl=[];
if(ap.useHTML5Audio&&ap.hasHTML5){for(bm in ap.audioFormats){if(ap.audioFormats.hasOwnProperty(bm)){bl.push(bm+" = "+ap.html5[bm]+(!ap.html5[bm]&&C&&ap.flash[bm]?" (using flash)":(ap.preferFlash&&ap.flash[bm]&&C?" (preferring flash)":(!ap.html5[bm]?" ("+(ap.audioFormats[bm].required?"required, ":"")+"and no flash support)":""))))
}}ap._wD("SoundManager 2 HTML5 support: "+bl.join(", "),1)
}};
x=function(bo){if(ay){return false
}if(ap.html5Only){W("sm2Loaded",1);
ay=true;
t();
N("onload",true);
return true
}var bm=(ap.useFlashBlock&&ap.flashLoadTimeout&&!ap.getMoviePercent()),bl=true,bn;
if(!bm){ay=true
}bn={type:(!au&&C?"NO_FLASH":"INIT_TIMEOUT")};
ap._wD("SoundManager 2 "+(a2?"failed to load":"loaded")+" ("+(a2?"Flash security/load error":"OK")+") "+String.fromCharCode(a2?10006:10003),a2?2:1);
if(a2||bo){if(ap.useFlashBlock&&ap.oMC){ap.oMC.className=n()+" "+(ap.getMoviePercent()===null?F.swfTimedout:F.swfError)
}aS({type:"ontimeout",error:bn,ignoreInit:true});
N("onload",false);
ab(bn);
bl=false
}else{N("onload",true)
}if(!a2){if(ap.waitForWindowLoad&&!bc){W("waitOnload");
am.add(c,"load",t)
}else{if(ap.waitForWindowLoad&&bc){W("docLoaded")
}t()
}}return bl
};
A=function(){var bl,bm=ap.setupOptions;
for(bl in bm){if(bm.hasOwnProperty(bl)){if(ap[bl]===d){ap[bl]=bm[bl]
}else{if(ap[bl]!==bm[bl]){ap.setupOptions[bl]=ap[bl]
}}}}};
aK=function(){if(ay){W("didInit");
return false
}function bl(){am.remove(c,"load",ap.beginDelayedInit)
}if(ap.html5Only){if(!ay){bl();
ap.enabled=true;
x()
}return true
}k();
try{ae._externalInterfaceTest(false);
m(true,(ap.flashPollingInterval||(ap.useHighPerformance?10:50)));
if(!ap.debugMode){ae._disableDebug()
}ap.enabled=true;
N("jstoflash",true);
if(!ap.html5Only){am.add(c,"unload",U)
}}catch(bm){ap._wD("js/flash exception: "+bm.toString());
N("jstoflash",false);
ab({type:"JS_TO_FLASH_EXCEPTION",fatal:true});
s(true);
x();
return false
}x();
bl();
return true
};
M=function(){if(q){return false
}q=true;
A();
E();
(function(){var bo="sm2-usehtml5audio=",bm="sm2-preferflash=",bl=null,bp=null,bn=y.toLowerCase();
if(bn.indexOf(bo)!==-1){bl=(bn.charAt(bn.indexOf(bo)+bo.length)==="1");
if(K){console.log((bl?"Enabling ":"Disabling ")+"useHTML5Audio via URL parameter")
}ap.setup({useHTML5Audio:bl})
}if(bn.indexOf(bm)!==-1){bp=(bn.charAt(bn.indexOf(bm)+bm.length)==="1");
if(K){console.log((bp?"Enabling ":"Disabling ")+"preferFlash via URL parameter")
}ap.setup({preferFlash:bp})
}}());
if(!au&&ap.hasHTML5){ap._wD("SoundManager 2: No Flash detected"+(!ap.useHTML5Audio?", enabling HTML5.":". Trying HTML5-only mode."),1);
ap.setup({useHTML5Audio:true,preferFlash:false})
}aO();
if(!au&&C){ar.push(e.needFlash);
ap.setup({flashLoadTimeout:1})
}if(aa.removeEventListener){aa.removeEventListener("DOMContentLoaded",M,false)
}k();
return true
};
P=function(){if(aa.readyState==="complete"){M();
aa.detachEvent("onreadystatechange",P)
}return true
};
bk=function(){bc=true;
M();
am.remove(c,"load",bk)
};
aE=function(){if(aU){if(!ap.setupOptions.useHTML5Audio||ap.setupOptions.preferFlash){ar.push(e.mobileUA)
}ap.setupOptions.useHTML5Audio=true;
ap.setupOptions.preferFlash=false;
if(aX||(aw&&!av.match(/android\s2\.3/i))){ar.push(e.globalHTML5);
if(aX){ap.ignoreFlash=true
}a0=true
}}};
aE();
R();
am.add(c,"focus",u);
am.add(c,"load",z);
am.add(c,"load",bk);
if(aa.addEventListener){aa.addEventListener("DOMContentLoaded",M,false)
}else{if(aa.attachEvent){aa.attachEvent("onreadystatechange",P)
}else{N("onload",false);
ab({type:"NO_DOM2_EVENTS",fatal:true})
}}}if(c.SM2_DEFER===undefined||!SM2_DEFER){b=new a()
}if(typeof module==="object"&&module&&typeof module.exports==="object"){c.soundManager=b;
module.exports.SoundManager=a;
module.exports.soundManager=b
}else{if(typeof define==="function"&&define.amd){define("SoundManager",[],function(){return{SoundManager:a,soundManager:b}
})
}else{c.SoundManager=a;
c.soundManager=b
}}}(window));
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */
;
!function(a,b){if(typeof module!="undefined"&&module.exports){module.exports.browser=b()
}else{if(typeof define=="function"&&define.amd){define(b)
}else{this[a]=b()
}}}("bowser",function(){var b=true;
function a(e){function j(q){var p=e.match(q);
return(p&&p.length>1&&p[1])||""
}var n=j(/(ipod|iphone|ipad)/i).toLowerCase(),m=/like android/i.test(e),g=!m&&/android/i.test(e),d=j(/version\/(\d+(\.\d+)?)/i),l=/tablet/i.test(e),f=!l&&/[^-]mobi/i.test(e),o;
if(/opera|opr/i.test(e)){o={name:"Opera",opera:b,version:d||j(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)}
}else{if(/windows phone/i.test(e)){o={name:"Windows Phone",windowsphone:b,msie:b,version:j(/iemobile\/(\d+(\.\d+)?)/i)}
}else{if(/msie|trident/i.test(e)){o={name:"Internet Explorer",msie:b,version:j(/(?:msie |rv:)(\d+(\.\d+)?)/i)}
}else{if(/chrome|crios|crmo/i.test(e)){o={name:"Chrome",chrome:b,version:j(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}
}else{if(n){o={name:n=="iphone"?"iPhone":n=="ipad"?"iPad":"iPod"};
if(d){o.version=d
}}else{if(/sailfish/i.test(e)){o={name:"Sailfish",sailfish:b,version:j(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}
}else{if(/seamonkey\//i.test(e)){o={name:"SeaMonkey",seamonkey:b,version:j(/seamonkey\/(\d+(\.\d+)?)/i)}
}else{if(/firefox|iceweasel/i.test(e)){o={name:"Firefox",firefox:b,version:j(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)};
if(/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)){o.firefoxos=b
}}else{if(/silk/i.test(e)){o={name:"Amazon Silk",silk:b,version:j(/silk\/(\d+(\.\d+)?)/i)}
}else{if(g){o={name:"Android",version:d}
}else{if(/phantom/i.test(e)){o={name:"PhantomJS",phantom:b,version:j(/phantomjs\/(\d+(\.\d+)?)/i)}
}else{if(/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)){o={name:"BlackBerry",blackberry:b,version:d||j(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}
}else{if(/(web|hpw)os/i.test(e)){o={name:"WebOS",webos:b,version:d||j(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)};
/touchpad\//i.test(e)&&(o.touchpad=b)
}else{if(/bada/i.test(e)){o={name:"Bada",bada:b,version:j(/dolfin\/(\d+(\.\d+)?)/i)}
}else{if(/tizen/i.test(e)){o={name:"Tizen",tizen:b,version:j(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||d}
}else{if(/safari/i.test(e)){o={name:"Safari",safari:b,version:d}
}else{o={}
}}}}}}}}}}}}}}}}if(/(apple)?webkit/i.test(e)){o.name=o.name||"Webkit";
o.webkit=b;
if(!o.version&&d){o.version=d
}}else{if(!o.opera&&/gecko\//i.test(e)){o.name=o.name||"Gecko";
o.gecko=b;
o.version=o.version||j(/gecko\/(\d+(\.\d+)?)/i)
}}if(g||o.silk){o.android=b
}else{if(n){o[n]=b;
o.ios=b
}}var h="";
if(n){h=j(/os (\d+([_\s]\d+)*) like mac os x/i);
h=h.replace(/[_\s]/g,".")
}else{if(g){h=j(/android[ \/-](\d+(\.\d+)*)/i)
}else{if(o.windowsphone){h=j(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i)
}else{if(o.webos){h=j(/(?:web|hpw)os\/(\d+(\.\d+)*)/i)
}else{if(o.blackberry){h=j(/rim\stablet\sos\s(\d+(\.\d+)*)/i)
}else{if(o.bada){h=j(/bada\/(\d+(\.\d+)*)/i)
}else{if(o.tizen){h=j(/tizen[\/\s](\d+(\.\d+)*)/i)
}}}}}}}if(h){o.osversion=h
}var k=h.split(".")[0];
if(l||n=="ipad"||(g&&(k==3||(k==4&&!f)))||o.silk){o.tablet=b
}else{if(f||n=="iphone"||n=="ipod"||g||o.blackberry||o.webos||o.bada){o.mobile=b
}}if((o.msie&&o.version>=10)||(o.chrome&&o.version>=20)||(o.firefox&&o.version>=20)||(o.safari&&o.version>=6)||(o.opera&&o.version>=10)||(o.ios&&o.osversion&&o.osversion.split(".")[0]>=6)||(o.blackberry&&o.version>=10.1)){o.a=b
}else{if((o.msie&&o.version<10)||(o.chrome&&o.version<20)||(o.firefox&&o.version<20)||(o.safari&&o.version<6)||(o.opera&&o.version<10)||(o.ios&&o.osversion&&o.osversion.split(".")[0]<6)){o.c=b
}else{o.x=b
}}return o
}var c=a(typeof navigator!=="undefined"?navigator.userAgent:"");
c._detect=a;
return c
});
(function(e){function c(k,j,g,h,f){this._listener=j;
this._isOnce=g;
this.context=h;
this._signal=k;
this._priority=f||0
}c.prototype={active:true,params:null,execute:function(f){var h,g;
if(this.active&&!!this._listener){g=this.params?this.params.concat(f):f;
h=this._listener.apply(this.context,g);
if(this._isOnce){this.detach()
}}return h
},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null
},isBound:function(){return(!!this._signal&&!!this._listener)
},isOnce:function(){return this._isOnce
},getListener:function(){return this._listener
},getSignal:function(){return this._signal
},_destroy:function(){delete this._signal;
delete this._listener;
delete this.context
},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"
}};
function a(f,g){if(typeof f!=="function"){throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",g))
}}function d(){this._bindings=[];
this._prevParams=null;
var f=this;
this.dispatch=function(){d.prototype.dispatch.apply(f,arguments)
}
}d.prototype={VERSION:"1.0.0",memorize:false,_shouldPropagate:true,active:true,_registerListener:function(k,h,j,g){var f=this._indexOfListener(k,j),l;
if(f!==-1){l=this._bindings[f];
if(l.isOnce()!==h){throw new Error("You cannot add"+(h?"":"Once")+"() then add"+(!h?"":"Once")+"() the same listener without removing the relationship first.")
}}else{l=new c(this,k,h,j,g);
this._addBinding(l)
}if(this.memorize&&this._prevParams){l.execute(this._prevParams)
}return l
},_addBinding:function(f){var g=this._bindings.length;
do{--g
}while(this._bindings[g]&&f._priority<=this._bindings[g]._priority);
this._bindings.splice(g+1,0,f)
},_indexOfListener:function(g,f){var j=this._bindings.length,h;
while(j--){h=this._bindings[j];
if(h._listener===g&&h.context===f){return j
}}return -1
},has:function(g,f){return this._indexOfListener(g,f)!==-1
},add:function(h,g,f){a(h,"add");
return this._registerListener(h,false,g,f)
},addOnce:function(h,g,f){a(h,"addOnce");
return this._registerListener(h,true,g,f)
},remove:function(h,g){a(h,"remove");
var f=this._indexOfListener(h,g);
if(f!==-1){this._bindings[f]._destroy();
this._bindings.splice(f,1)
}return h
},removeAll:function(){var f=this._bindings.length;
while(f--){this._bindings[f]._destroy()
}this._bindings.length=0
},getNumListeners:function(){return this._bindings.length
},halt:function(){this._shouldPropagate=false
},dispatch:function(g){if(!this.active){return
}var f=Array.prototype.slice.call(arguments),j=this._bindings.length,h;
if(this.memorize){this._prevParams=f
}if(!j){return
}h=this._bindings.slice();
this._shouldPropagate=true;
do{j--
}while(h[j]&&this._shouldPropagate&&h[j].execute(f)!==false)
},forget:function(){this._prevParams=null
},dispose:function(){this.removeAll();
delete this._bindings;
delete this._prevParams
},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"
}};
var b=d;
b.Signal=d;
if(typeof define==="function"&&define.amd){define(function(){return b
})
}else{if(typeof module!=="undefined"&&module.exports){module.exports=b
}else{e.signals=b
}}}(this));
(function(window,True,False,Null,undefined){var document=window.document,documentElement=document.documentElement,windowHistory=window.history||{},windowLocation=window.location,api=!!windowHistory.pushState,initialState=api&&windowHistory.state===undefined,initialFire=windowLocation.href,JSON=window.JSON||{},defineProp=Object.defineProperty,defineGetter=Object.prototype.__defineGetter__,defineSetter=Object.prototype.__defineSetter__,historyPushState=windowHistory.pushState,historyReplaceState=windowHistory.replaceState,sessionStorage=window.sessionStorage,hasOwnProperty=Object.prototype.hasOwnProperty,toString=Object.prototype.toString,msie=+(((window.eval&&eval("/*@cc_on 1;@*/")&&/msie (\d+)/i.exec(navigator.userAgent))||[])[1]||0),libID=(new Date()).getTime(),VBInc=(defineProp||defineGetter)&&(!msie||msie>8)?0:1,iframe=msie<8?document.createElement("iframe"):False,_a,_r,_d,eventPrefix="",addEvent=(_a="addEventListener",window[_a])||(_a="attachEvent",eventPrefix="on",window[_a]),removeEvent=(_r="removeEventListener",window[_r])||(_r="detachEvent",window[_r]),fireEvent=(_d="dispatchEvent",window[_d])||(_d="fireEvent",window[_d]),eventsListPopState=[],eventsListHashChange=[],skipHashChange=0,eventsList={onpopstate:eventsListPopState,popstate:eventsListPopState,onhashchange:eventsListHashChange,hashchange:eventsListHashChange},sets=(function(){var i,m,s,config={basepath:"/",redirect:0,type:"/"},el=document.getElementsByTagName("SCRIPT");
for(i=0;
el[i];
i++){if(m=/(.*)\/(?:history|spike)(?:\.iegte8)?(?:-\d\.\d(?:\.\d)?\w?)?(?:\.min)?.js\?(.*)$/i.exec(el[i].src)||(i===el.length-1&&(m=el[i].src.split("?")).length===2&&(m[2]=m[1])&&m)){for(i=0,s=m[2].split("&");
s[i];
){m=s[i++].split("=");
config[m[0]]=m[1]=="true"?True:m[1]=="false"?False:m[1]||""
}config.basepath=config.basepath||"/";
break
}}return config
})(),normalizeUrl=(function(a){var _href,relative,special,nohash,host,port,pathname;
return function(href,test){var re=new RegExp("^"+sets.basepath,"i");
if(!href){href=windowLocation.href;
if(!api||test){href=windowLocation.protocol+"//"+windowLocation.host+sets.basepath+(href.replace(/^[^#]*/,"")||"#").replace(new RegExp("^#[/]?(?:"+sets.type+")?"),"")
}}else{if(!api||msie){var current=normalizeUrl(),_pathname=current._pathname,_protocol=current._protocol;
href=/^(?:[\w0-9]+\:)?\/\//.test(href)?href.indexOf("/")===0?_protocol+href:href:_protocol+"//"+current._host+(href.indexOf("/")===0?href:href.indexOf("?")===0?_pathname+href:href.indexOf("#")===0?_pathname+current._search+href:_pathname.replace(/[^\/]+$/g,"")+href)
}}if(_href!==href){a.href=_href=href;
port=a.port;
host=a.host;
pathname=a.pathname;
if((a.protocol==="http:"&&port==80)||(a.protocol==="https:"&&port==443)){host=a.hostname;
port=""
}pathname=pathname.indexOf("/")===0?pathname:"/"+pathname;
relative=pathname+a.search+a.hash;
nohash=pathname.replace(re,sets.type)+a.search;
special=nohash+a.hash
}return{_href:a.protocol+"//"+host+relative,_protocol:a.protocol,_host:host,_hostname:a.hostname||windowLocation.hostname,_port:port||windowLocation.port,_pathname:pathname,_search:a.search,_hash:a.hash,_relative:relative,_nohash:nohash,_special:special}
}
})(document.createElement("a")),History=!VBInc?windowHistory:{back:windowHistory.back,forward:windowHistory.forward,go:windowHistory.go,pushState:Null,replaceState:Null,emulate:!api,toString:function(){return"[object History]"
}},HistoryAccessors={state:{get:function(){return iframe&&iframe.storage||historyStorage()[History.location.href]||Null
}},length:{get:function(){return windowHistory.length
}},location:{set:function(val){window.location=val
},get:function(){return api?windowLocation:Location
}}},Location={assign:function(url){windowLocation.assign(api||url.indexOf("#")!==0?url:"#"+normalizeUrl()._nohash+url)
},reload:windowLocation.reload,replace:function(url){windowLocation.replace(api||url.indexOf("#")!==0?url:"#"+normalizeUrl()._nohash+url)
},toString:function(){return this.href
}},LocationAccessors={href:{set:function(val){windowLocation.href=val
},get:function(){return normalizeUrl()._href
}},protocol:{set:function(val){windowLocation.protocol=val
},get:function(){return windowLocation.protocol
}},host:{set:function(val){windowLocation.host=val
},get:function(){return windowLocation.host
}},hostname:{set:function(val){windowLocation.hostname=val
},get:function(){return windowLocation.hostname
}},port:{set:function(val){windowLocation.port=val
},get:function(){return windowLocation.port
}},pathname:{set:function(val){windowLocation.pathname=val
},get:function(){return normalizeUrl()._pathname
}},search:{set:function(val){windowLocation.search=val
},get:function(){return normalizeUrl()._search
}},hash:{set:function(val){var hash=(val.indexOf("#")===0?val:"#"+val),urlObject=normalizeUrl();
if(iframe){if(hash!=urlObject._hash){History.pushState(Null,Null,urlObject._nohash+hash);
hashChanged({oldURL:urlObject._href})
}}else{windowLocation.hash="#"+urlObject._nohash+hash
}},get:function(){return normalizeUrl()._hash
}}},createStaticObject=function(obj,props,novb){var tmp=obj,key,vb=False;
if(defineProp||defineGetter){for(key in props){if(hasOwnProperty.call(props,key)){if(defineGetter){props[key].get&&defineGetter.call(obj,key,props[key].get);
props[key].set&&defineSetter.call(obj,key,props[key].set)
}else{if(defineProp){try{defineProp(obj,key,props[key])
}catch(_e_){if(novb){return False
}vb=True;
break
}}}}}}else{vb=True
}if(vb&&VBInc){var staticClass="StaticClass"+libID+VBInc++,parts=["Class "+staticClass];
if(!("execVB" in window)){execScript("Function execVB(c) ExecuteGlobal(c) End Function","VBScript")
}if(!("VBCVal" in window)){execScript("Function VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function","VBScript")
}for(key in obj){parts[parts.length]="Public ["+key+"]"
}if(hasOwnProperty.call(obj,"toString")){if(!obj.propertyIsEnumerable("toString")){parts[parts.length]="Public [toString]"
}props["(toString)"]={get:function(){return this.toString.call(this)
}}
}for(key in props){if(hasOwnProperty.call(props,key)){if(props[key].get){obj["get "+key]=props[key].get;
parts.push("Public [get "+key+"]","Public "+(key==="(toString)"?"Default ":"")+"Property Get ["+key+"]","Call VBCVal(me.[get "+key+"].call(me),["+key+"])","End Property")
}if(props[key].set){obj["set "+key]=props[key].set;
parts.push("Public [set "+key+"]","Public Property Let ["+key+"](v)","Call me.[set "+key+"].call(me,v)","End Property","Public Property Set ["+key+"](v)","Call me.[set "+key+"].call(me,v)","End Property")
}}}parts.push("End Class","Function "+staticClass+"Factory()","Set "+staticClass+"Factory=New "+staticClass,"End Function");
execVB(parts.join("\n"));
tmp=window[staticClass+"Factory"]();
for(key in obj){tmp[key]=obj[key]
}if(hasOwnProperty.call(obj,"toString")){tmp.toString=obj.toString
}}return tmp
},JSONStringify=JSON.stringify||(function(undefined){function quote(string){var escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}var str=function(value){var isArray,result,k,n=(typeof value).charCodeAt(2);
return n===114?quote(value):n===109?isFinite(value)?String(value):"null":n===111||n===108?String(value):n===106?function(){if(!value){return"null"
}isArray=toString.apply(value)==="[object Array]";
result=isArray?"[":"{";
if(isArray){for(k=0;
k<value.length;
k++){result+=(k==0?"":",")+str(value[k])
}}else{for(k in value){if(hasOwnProperty.call(value,k)&&value[k]!==undefined){result+=(result.length==1?"":",")+quote(k)+":"+str(value[k])
}}}return result+(isArray?"]":"}")
}():undefined
};
return str
})(),JSONParse=(function(){var parse=JSON.parse;
return function(source){return source?parse?parse(source):(new Function("return "+source))():Null
}
})(),historyStorage=function(state){return sessionStorage?state?sessionStorage.setItem("__hitoryapi__",JSONStringify(state)):JSONParse(sessionStorage.getItem("__hitoryapi__"))||{}:{}
},fireStateChange=function(type,oldURL,newURL){var winHndl=type===2?window.onhashchange:window.onpopstate,name=type===2?"hashchange":"popstate",o,list=eventsList[name];
if(document.createEvent){o=document.createEvent("Events");
o.initEvent(name,False,False)
}else{o=document.createEventObject();
o.type=name
}o.state=History.state;
o.oldURL=oldURL;
o.newURL=newURL;
if(winHndl){winHndl.call(window,o)
}for(var i=0,len=list.length;
i<len;
i++){list[i].call(window,o)
}},hashChanged=(function(){var windowPopState=window.onpopstate||Null,windowHashChange=window.onhashchange||Null,popstateFired=0,initialStateHandler=Null,urlObject=normalizeUrl(),oldURL=urlObject._href,oldHash=urlObject._hash.replace(/^#/,""),fireInitialState=function(){if(initialFire&&!(initialFire=0)&&urlObject._relative!==sets.basepath){clearInterval(initialStateHandler);
setTimeout(fireStateChange,10)
}},change=function(e){var urlObject=normalizeUrl();
if(skipHashChange){oldURL=urlObject._href;
return skipHashChange=0
}var oldUrl=e.oldURL||oldURL,newUrl=oldURL=e.newURL||urlObject._href,oldHash=oldUrl.replace(/^.*?(#|$)/,""),newHash=newUrl.replace(/^.*?(#|$)/,"");
if(oldUrl!=newUrl&&!popstateFired){fireStateChange()
}popstateFired=0;
initialFire=0;
if(oldHash!=newHash){fireStateChange(2,oldUrl,newUrl)
}};
addEvent(eventPrefix+"hashchange",change,False);
addEvent(eventPrefix+"popstate",function(){if(initialFire===windowLocation.href){return initialFire=0
}initialFire=0;
fireStateChange(popstateFired=1)
},False);
History.redirect=function(type,basepath){sets.type=type==Null?sets.type:type;
sets.basepath=basepath==Null?sets.basepath:basepath;
if(window.top==window.self){var relative=normalizeUrl(Null,True)._relative,search=windowLocation.search,path=windowLocation.pathname,basepath=sets.basepath;
if(api){if(relative!=basepath&&(new RegExp("^"+basepath+"$","i")).test(path)){windowLocation.href=relative
}if((new RegExp("^"+basepath+"$","i")).test(path+"/")){windowLocation.href=basepath
}else{if(!(new RegExp("^"+basepath,"i")).test(path)){windowLocation.href=path.replace(/^\//,basepath)+search
}}}else{if(path!=basepath){windowLocation.href=basepath+"#"+path.replace(new RegExp("^"+basepath,"i"),sets.type)+search+windowLocation.hash
}}}};
History=createStaticObject(History,VBInc?HistoryAccessors:windowHistory.state===undefined?{state:HistoryAccessors.state,location:HistoryAccessors.location}:{location:HistoryAccessors.location});
Location=createStaticObject(Location,LocationAccessors);
window[_a]=function(event,listener,capture){if(eventsList[event]){eventsList[event].push(listener);
if(!api&&eventsListPopState===eventsList[event]){fireInitialState()
}}else{if(arguments.length>3){addEvent(event,listener,capture,arguments[3])
}else{addEvent(event,listener,capture)
}}};
window[_r]=function(event,listener,capture){var list=eventsList[event];
if(list){for(var i=list.length;
--i;
){if(list[i]===listener){list.splice(i,1);
break
}}}else{removeEvent(event,listener,capture)
}};
window[_d]=function(event,eventObject){var type=event&&event.type||event,list=eventsList[event],winHndl=list===eventsListPopState?window.onpopstate:window.onhashchange;
if(list){eventObject=eventObject||(typeof event=="string"?window.event:event);
try{eventObject&&(eventObject.target=window)
}catch(_e_){try{eventObject.srcElement=window
}catch(_e_){}}if(winHndl){winHndl.call(window,eventObject)
}for(var i=0,len=list.length;
i<len;
i++){list[i].call(window,eventObject)
}return True
}else{return fireEvent(event,eventObject)
}};
if(VBInc){execScript("Public history, onhashchange","VBScript")
}if(((!defineProp&&!defineGetter)||!createStaticObject(window,{onhashchange:{get:function(){return windowHashChange
},set:function(val){windowHashChange=val||Null
}},onpopstate:{get:function(){return windowPopState
},set:function(val){if(windowPopState=(val||Null)){!api&&fireInitialState()
}}}},1))&&!api){initialStateHandler=setInterval(function(){if(window.onpopstate){fireInitialState()
}},100)
}if(sets.redirect){History.redirect()
}if(!api){document[_a](eventPrefix+"click",function(e){var event=e||window.event,target=event.target||event.srcElement,defaultPrevented="defaultPrevented" in event?event.defaultPrevented:event.returnValue===False;
if(target&&target.nodeName==="A"&&!defaultPrevented){e=normalizeUrl(target.getAttribute("href",2),True);
if(e._hash&&e._hash!=="#"&&e._hash===e._href.replace(normalizeUrl()._href.split("#").shift(),"")){history.location.hash=e._hash;
e=e._hash.replace(/^#/,"");
if((target=document.getElementById(e))&&target.id===e&&target.nodeName==="A"){var rect=target.getBoundingClientRect();
window.scrollTo((documentElement.scrollLeft||0),rect.top+(documentElement.scrollTop||0)-(documentElement.clientTop||0))
}if(event.preventDefault){event.preventDefault()
}else{event.returnValue=false
}}}},False)
}return change
})();
History.pushState=function(state,title,url,replace){var stateObject=historyStorage(),currentHref=normalizeUrl()._href,urlObject=url&&normalizeUrl(url);
initialFire=0;
url=urlObject?urlObject._href:currentHref;
if(replace&&stateObject[currentHref]){delete stateObject[currentHref]
}if((!api||initialState)&&sessionStorage&&state){stateObject[url]=state;
historyStorage(stateObject);
state=Null
}if(historyPushState&&historyReplaceState){if(replace){historyReplaceState.call(History,state,title,url)
}else{historyPushState.call(History,state,title,url)
}}else{if(urlObject&&urlObject._relative!=normalizeUrl()._relative){skipHashChange=1;
if(replace){windowLocation.replace("#"+urlObject._special)
}else{windowLocation.hash=urlObject._special
}}}};
History.replaceState=function(state,title,url){History.pushState(state,title,url,1)
};
if(VBInc){window.history=History;
(function(cookie,currentHref){if(!iframe){return
}var pushState,hashCheckerHandler,checker=function(){var href=normalizeUrl()._href;
if(currentHref!=href){hashChanged({oldURL:currentHref,newURL:currentHref=href})
}};
hashCheckerHandler=setInterval(checker,100);
iframe.src="javascript:true;";
iframe=documentElement.firstChild.appendChild(iframe).contentWindow;
History.pushState=pushState=function(state,title,url,replace,lfirst){var i=iframe.document,content=["<script>","lfirst=1;",,"storage="+JSONStringify(state)+";","<\/script>"],urlObject=url&&normalizeUrl(url);
if(!urlObject){iframe.storage=state;
return
}if(!lfirst){clearInterval(hashCheckerHandler)
}if(replace){if(iframe.lfirst){history.back();
pushState(state,title,urlObject._href,0,1)
}else{iframe.storage=state;
windowLocation.replace("#"+urlObject._special)
}}else{if(urlObject._href!=currentHref||lfirst){if(!iframe.lfirst){iframe.lfirst=1;
pushState(iframe.storage,title,currentHref,0,1)
}content[2]='parent.location.hash="'+urlObject._special.replace(/"/g,'\\"')+'";';
i.open();
i.write(content.join(""));
i.close()
}}if(!lfirst){currentHref=normalizeUrl()._href;
hashCheckerHandler=setInterval(checker,100)
}};
addEvent(eventPrefix+"unload",function(){if(iframe.storage){var state={};
state[normalizeUrl()._href]=iframe.storage;
document.cookie="_historyAPI="+escape(JSONStringify(state))
}clearInterval(hashCheckerHandler)
},False);
if(cookie.length>1){cookie=unescape(cookie.pop().split(";").shift());
try{iframe.storage=JSONParse(cookie)[normalizeUrl()._href]
}catch(_e_){}}if(!JSON.parse&&!JSON.stringify){JSON.parse=JSONParse;
JSON.stringify=JSONStringify;
window.JSON=JSON
}})(document.cookie.split("_historyAPI="),normalizeUrl()._href)
}else{window.history.emulate=!api
}})(window,true,false,null);
function createCookie(c,e,f,d){if(f){var b=new Date();
b.setTime(b.getTime()+(f*24*60*60*1000));
var a="; expires="+b.toGMTString()
}else{var a=""
}var d=(d)?"; domain="+d:"";
document.cookie=c+"="+e+a+d+"; path=/"
}function readCookie(b){var e=b+"=";
var a=document.cookie.split(";");
for(var d=0;
d<a.length;
d++){var f=a[d];
while(f.charAt(0)==" "){f=f.substring(1,f.length)
}if(f.indexOf(e)==0){return f.substring(e.length,f.length)
}}return null
}function eraseCookie(a,b){var b=(b)?"; domain="+b:"";
createCookie(a,"",-1,b)
}(function(b){function a(){}a.img_set="apple";
a.img_sets={apple:{path:"/emoji-data/img-apple-64/",sheet:"/emoji-data/sheet_apple_64.png",mask:1},google:{path:"/emoji-data/img-google-64/",sheet:"/emoji-data/sheet_google_64.png",mask:2},twitter:{path:"/emoji-data/img-twitter-64/",sheet:"/emoji-data/sheet_twitter_64.png",mask:4},emojione:{path:"/emoji-data/img-emojione-64/",sheet:"/emoji-data/sheet_emojione_64.png",mask:8}};
a.use_css_imgs=false;
a.colons_mode=false;
a.text_mode=false;
a.include_title=false;
a.allow_native=true;
a.use_sheet=false;
a.avoid_ms_emoji=true;
a.inits={};
a.map={};
a.replace_emoticons=function(c){a.init_emoticons();
return c.replace(a.rx_emoticons,function(e,d,g){var f=a.map.emoticons[g];
return f?d+a.replacement(f,g):e
})
};
a.replace_emoticons_with_colons=function(c){a.init_emoticons();
return c.replace(a.rx_emoticons,function(e,d,g){var f=a.data[a.map.emoticons[g]][3][0];
return f?d+":"+f+":":e
})
};
a.replace_colons=function(c){a.init_colons();
return c.replace(a.rx_colons,function(f){var e=f.substr(1,f.length-2);
if(e.indexOf("::skin-tone-")>-1){var j=e.substr(-1,1);
var g="skin-tone-"+j;
var d=a.map.colons[g];
e=e.substr(0,e.length-13);
var h=a.map.colons[e];
if(h){return a.replacement(h,e,":",{idx:d,actual:g,wrapper:":"})
}else{return":"+e+":"+a.replacement(d,g,":")
}}else{var h=a.map.colons[e];
return h?a.replacement(h,e,":"):f
}})
};
a.replace_unified=function(c){a.init_unified();
return c.replace(a.rx_unified,function(e,h,f){var g=a.map.unified[h];
if(!g){return e
}var d=null;
if(f=="\uD83C\uDFFB"){d="1f3fb"
}if(f=="\uD83C\uDFFC"){d="1f3fc"
}if(f=="\uD83C\uDFFD"){d="1f3fd"
}if(f=="\uD83C\uDFFE"){d="1f3fe"
}if(f=="\uD83C\uDFFF"){d="1f3ff"
}if(d){return a.replacement(g,null,null,{idx:d,actual:f,wrapper:""})
}return a.replacement(g)
})
};
a.replacement=function(p,r,d,h){var f="";
var e=0;
if(typeof h==="object"){f=a.replacement(h.idx,h.actual,h.wrapper);
e=p+"-"+h.idx
}var j=a.img_set;
if(!a.use_sheet&&!(a.data[p][6]&a.img_sets[a.img_set].mask)){j="apple"
}d=d||"";
if(a.colons_mode){return":"+a.data[p][3][0]+":"+f
}var l=(r)?d+r+d:a.data[p][8]||d+a.data[p][3][0]+d;
if(a.text_mode){return l+f
}a.init_env();
if(a.replace_mode=="unified"&&a.allow_native&&a.data[p][0][0]){return a.data[p][0][0]+f
}if(a.replace_mode=="softbank"&&a.allow_native&&a.data[p][1]){return a.data[p][1]+f
}if(a.replace_mode=="google"&&a.allow_native&&a.data[p][2]){return a.data[p][2]+f
}var k=a.data[p][7]||a.img_sets[j].path+p+".png";
var n=a.include_title?' title="'+(r||a.data[p][3][0])+'"':"";
var q=a.include_text?d+(r||a.data[p][3][0])+d:"";
var o=a.data[p][4];
var m=a.data[p][5];
if(e&&a.variations_data[e]&&a.variations_data[e][2]&&!a.data[p][7]){if(a.variations_data[e][2]&a.img_sets[a.img_set].mask){k=a.img_sets[a.img_set].path+e+".png";
o=a.variations_data[e][0];
m=a.variations_data[e][1];
f=""
}}if(a.supports_css){if(a.use_sheet&&o!=null&&m!=null){var g=100/(a.sheet_size-1);
var c="background: url("+a.img_sets[j].sheet+");background-position:"+(g*o)+"% "+(g*m)+"%;background-size:"+a.sheet_size+"00%";
return'<span class="emoji-outer emoji-sizer"><span class="emoji-inner" style="'+c+'"'+n+">"+q+"</span></span>"+f
}else{if(a.use_css_imgs){return'<span class="emoji emoji-'+p+'"'+n+">"+q+"</span>"+f
}else{return'<span class="emoji emoji-sizer" style="background-image:url('+k+')"'+n+">"+q+"</span>"+f
}}}return'<img src="'+k+'" class="emoji" '+n+"/>"+f
};
a.init_emoticons=function(){if(a.inits.emoticons){return
}a.init_colons();
a.inits.emoticons=1;
var c=[];
a.map.emoticons={};
for(var e in a.emoticons_data){var d=e.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
if(!a.map.colons[a.emoticons_data[e]]){continue
}a.map.emoticons[d]=a.map.colons[a.emoticons_data[e]];
c.push(a.escape_rx(d))
}a.rx_emoticons=new RegExp(("(^|\\s)("+c.join("|")+")(?=$|[\\s|\\?\\.,!])"),"g")
};
a.init_colons=function(){if(a.inits.colons){return
}a.inits.colons=1;
a.rx_colons=new RegExp(":[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?","g");
a.map.colons={};
for(var d in a.data){for(var c=0;
c<a.data[d][3].length;
c++){a.map.colons[a.data[d][3][c]]=d
}}};
a.init_unified=function(){if(a.inits.unified){return
}a.inits.unified=1;
var c=[];
a.map.unified={};
for(var e in a.data){for(var d=0;
d<a.data[e][0].length;
d++){c.push(a.data[e][0][d]);
a.map.unified[a.data[e][0][d]]=e
}}a.rx_unified=new RegExp("("+c.join("|")+")(\uD83C[\uDFFB-\uDFFF])?","g")
};
a.init_env=function(){if(a.inits.env){return
}a.inits.env=1;
a.replace_mode="img";
a.supports_css=false;
var d=navigator.userAgent;
if(window.getComputedStyle){var c=window.getComputedStyle(document.body);
if(c["background-size"]||c.backgroundSize){a.supports_css=true
}}if(d.match(/(iPhone|iPod|iPad|iPhone\s+Simulator)/i)){if(d.match(/OS\s+[12345]/i)){a.replace_mode="softbank";
return
}if(d.match(/OS\s+[6789]/i)){a.replace_mode="unified";
return
}}if(d.match(/Mac OS X 10[._ ](?:[789]|1\d)/i)){if(!d.match(/Chrome/i)&&!d.match(/Firefox/i)){a.replace_mode="unified";
return
}}if(!a.avoid_ms_emoji){if(d.match(/Windows NT 6.[1-9]/i)||d.match(/Windows NT 10.[0-9]/i)){if(!d.match(/Chrome/i)&&!d.match(/MSIE 8/i)){a.replace_mode="unified";
return
}}}if(false&&d.match(/Android/i)){a.replace_mode="google";
return
}if(a.supports_css){a.replace_mode="css"
}};
a.escape_rx=function(c){return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
};
a.sheet_size=35;
a.data={"00a9":[["\u00A9\uFE0F","\u00A9"],"\uE24E","\uDBBA\uDF29",["copyright"],0,0,11,0],"00ae":[["\u00AE\uFE0F","\u00AE"],"\uE24F","\uDBBA\uDF2D",["registered"],0,1,11,0],"203c":[["\u203C\uFE0F","\u203C"],"","\uDBBA\uDF06",["bangbang"],0,2,15,0],"2049":[["\u2049\uFE0F","\u2049"],"","\uDBBA\uDF05",["interrobang"],0,3,15,0],"2122":[["\u2122\uFE0F","\u2122"],"\uE537","\uDBBA\uDF2A",["tm"],0,4,15,0],"2139":[["\u2139\uFE0F","\u2139"],"","\uDBBA\uDF47",["information_source"],0,5,15,0],"2194":[["\u2194\uFE0F","\u2194"],"","\uDBBA\uDEF6",["left_right_arrow"],0,6,15,0],"2195":[["\u2195\uFE0F","\u2195"],"","\uDBBA\uDEF7",["arrow_up_down"],0,7,15,0],"2196":[["\u2196\uFE0F","\u2196"],"\uE237","\uDBBA\uDEF2",["arrow_upper_left"],0,8,15,0],"2197":[["\u2197\uFE0F","\u2197"],"\uE236","\uDBBA\uDEF0",["arrow_upper_right"],0,9,15,0],"2198":[["\u2198\uFE0F","\u2198"],"\uE238","\uDBBA\uDEF1",["arrow_lower_right"],0,10,15,0],"2199":[["\u2199\uFE0F","\u2199"],"\uE239","\uDBBA\uDEF3",["arrow_lower_left"],0,11,15,0],"21a9":[["\u21A9\uFE0F","\u21A9"],"","\uDBBA\uDF83",["leftwards_arrow_with_hook"],0,12,15,0],"21aa":[["\u21AA\uFE0F","\u21AA"],"","\uDBBA\uDF88",["arrow_right_hook"],0,13,15,0],"231a":[["\u231A\uFE0F","\u231A"],"","\uDBB8\uDC1D",["watch"],0,14,15,0],"231b":[["\u231B\uFE0F","\u231B"],"","\uDBB8\uDC1C",["hourglass"],0,15,15,0],"23e9":[["\u23E9"],"\uE23C","\uDBBA\uDEFE",["fast_forward"],0,16,15,0],"23ea":[["\u23EA"],"\uE23D","\uDBBA\uDEFF",["rewind"],0,17,15,0],"23eb":[["\u23EB"],"","\uDBBA\uDF03",["arrow_double_up"],0,18,15,0],"23ec":[["\u23EC"],"","\uDBBA\uDF02",["arrow_double_down"],0,19,15,0],"23f0":[["\u23F0"],"\uE02D","\uDBB8\uDC2A",["alarm_clock"],0,20,15,0],"23f3":[["\u23F3"],"","\uDBB8\uDC1B",["hourglass_flowing_sand"],0,21,15,0],"24c2":[["\u24C2\uFE0F","\u24C2"],"\uE434","\uDBB9\uDFE1",["m"],0,22,15,0],"25aa":[["\u25AA\uFE0F","\u25AA"],"\uE21A","\uDBBA\uDF6E",["black_small_square"],0,23,15,0],"25ab":[["\u25AB\uFE0F","\u25AB"],"\uE21B","\uDBBA\uDF6D",["white_small_square"],0,24,15,0],"25b6":[["\u25B6\uFE0F","\u25B6"],"\uE23A","\uDBBA\uDEFC",["arrow_forward"],0,25,15,0],"25c0":[["\u25C0\uFE0F","\u25C0"],"\uE23B","\uDBBA\uDEFD",["arrow_backward"],0,26,15,0],"25fb":[["\u25FB\uFE0F","\u25FB"],"\uE21B","\uDBBA\uDF71",["white_medium_square"],0,27,15,0],"25fc":[["\u25FC\uFE0F","\u25FC"],"\uE21A","\uDBBA\uDF72",["black_medium_square"],0,28,15,0],"25fd":[["\u25FD\uFE0F","\u25FD"],"\uE21B","\uDBBA\uDF6F",["white_medium_small_square"],0,29,15,0],"25fe":[["\u25FE\uFE0F","\u25FE"],"\uE21A","\uDBBA\uDF70",["black_medium_small_square"],0,30,15,0],"2600":[["\u2600\uFE0F","\u2600"],"\uE04A","\uDBB8\uDC00",["sunny"],0,31,15,0],"2601":[["\u2601\uFE0F","\u2601"],"\uE049","\uDBB8\uDC01",["cloud"],0,32,15,0],"260e":[["\u260E\uFE0F","\u260E"],"\uE009","\uDBB9\uDD23",["phone","telephone"],0,33,15,0],"2611":[["\u2611\uFE0F","\u2611"],"","\uDBBA\uDF8B",["ballot_box_with_check"],0,34,15,0],"2614":[["\u2614\uFE0F","\u2614"],"\uE04B","\uDBB8\uDC02",["umbrella"],1,0,15,0],"2615":[["\u2615\uFE0F","\u2615"],"\uE045","\uDBBA\uDD81",["coffee"],1,1,15,0],"261d":[["\u261D\uFE0F","\u261D"],"\uE00F","\uDBBA\uDF98",["point_up"],1,2,15,0],"263a":[["\u263A\uFE0F","\u263A"],"\uE414","\uDBB8\uDF36",["relaxed"],1,8,15,0],"2648":[["\u2648\uFE0F","\u2648"],"\uE23F","\uDBB8\uDC2B",["aries"],1,9,15,0],"2649":[["\u2649\uFE0F","\u2649"],"\uE240","\uDBB8\uDC2C",["taurus"],1,10,15,0],"264a":[["\u264A\uFE0F","\u264A"],"\uE241","\uDBB8\uDC2D",["gemini"],1,11,15,0],"264b":[["\u264B\uFE0F","\u264B"],"\uE242","\uDBB8\uDC2E",["cancer"],1,12,15,0],"264c":[["\u264C\uFE0F","\u264C"],"\uE243","\uDBB8\uDC2F",["leo"],1,13,15,0],"264d":[["\u264D\uFE0F","\u264D"],"\uE244","\uDBB8\uDC30",["virgo"],1,14,15,0],"264e":[["\u264E\uFE0F","\u264E"],"\uE245","\uDBB8\uDC31",["libra"],1,15,15,0],"264f":[["\u264F\uFE0F","\u264F"],"\uE246","\uDBB8\uDC32",["scorpius"],1,16,15,0],"2650":[["\u2650\uFE0F","\u2650"],"\uE247","\uDBB8\uDC33",["sagittarius"],1,17,15,0],"2651":[["\u2651\uFE0F","\u2651"],"\uE248","\uDBB8\uDC34",["capricorn"],1,18,15,0],"2652":[["\u2652\uFE0F","\u2652"],"\uE249","\uDBB8\uDC35",["aquarius"],1,19,15,0],"2653":[["\u2653\uFE0F","\u2653"],"\uE24A","\uDBB8\uDC36",["pisces"],1,20,15,0],"2660":[["\u2660\uFE0F","\u2660"],"\uE20E","\uDBBA\uDF1B",["spades"],1,21,15,0],"2663":[["\u2663\uFE0F","\u2663"],"\uE20F","\uDBBA\uDF1D",["clubs"],1,22,15,0],"2665":[["\u2665\uFE0F","\u2665"],"\uE20C","\uDBBA\uDF1A",["hearts"],1,23,15,0],"2666":[["\u2666\uFE0F","\u2666"],"\uE20D","\uDBBA\uDF1C",["diamonds"],1,24,15,0],"2668":[["\u2668\uFE0F","\u2668"],"\uE123","\uDBB9\uDFFA",["hotsprings"],1,25,15,0],"267b":[["\u267B\uFE0F","\u267B"],"","\uDBBA\uDF2C",["recycle"],1,26,15,0],"267f":[["\u267F\uFE0F","\u267F"],"\uE20A","\uDBBA\uDF20",["wheelchair"],1,27,15,0],"2693":[["\u2693\uFE0F","\u2693"],"\uE202","\uDBB9\uDCC1",["anchor"],1,28,15,0],"26a0":[["\u26A0\uFE0F","\u26A0"],"\uE252","\uDBBA\uDF23",["warning"],1,29,15,0],"26a1":[["\u26A1\uFE0F","\u26A1"],"\uE13D","\uDBB8\uDC04",["zap"],1,30,15,0],"26aa":[["\u26AA\uFE0F","\u26AA"],"\uE219","\uDBBA\uDF65",["white_circle"],1,31,15,0],"26ab":[["\u26AB\uFE0F","\u26AB"],"\uE219","\uDBBA\uDF66",["black_circle"],1,32,15,0],"26bd":[["\u26BD\uFE0F","\u26BD"],"\uE018","\uDBB9\uDFD4",["soccer"],1,33,15,0],"26be":[["\u26BE\uFE0F","\u26BE"],"\uE016","\uDBB9\uDFD1",["baseball"],1,34,15,0],"26c4":[["\u26C4\uFE0F","\u26C4"],"\uE048","\uDBB8\uDC03",["snowman"],2,0,15,0],"26c5":[["\u26C5\uFE0F","\u26C5"],"\uE04A\uE049","\uDBB8\uDC0F",["partly_sunny"],2,1,15,0],"26ce":[["\u26CE"],"\uE24B","\uDBB8\uDC37",["ophiuchus"],2,2,15,0],"26d4":[["\u26D4\uFE0F","\u26D4"],"\uE137","\uDBBA\uDF26",["no_entry"],2,3,15,0],"26ea":[["\u26EA\uFE0F","\u26EA"],"\uE037","\uDBB9\uDCBB",["church"],2,4,15,0],"26f2":[["\u26F2\uFE0F","\u26F2"],"\uE121","\uDBB9\uDCBC",["fountain"],2,5,15,0],"26f3":[["\u26F3\uFE0F","\u26F3"],"\uE014","\uDBB9\uDFD2",["golf"],2,6,15,0],"26f5":[["\u26F5\uFE0F","\u26F5"],"\uE01C","\uDBB9\uDFEA",["boat","sailboat"],2,7,15,0],"26fa":[["\u26FA\uFE0F","\u26FA"],"\uE122","\uDBB9\uDFFB",["tent"],2,8,15,0],"26fd":[["\u26FD\uFE0F","\u26FD"],"\uE03A","\uDBB9\uDFF5",["fuelpump"],2,9,15,0],"2702":[["\u2702\uFE0F","\u2702"],"\uE313","\uDBB9\uDD3E",["scissors"],2,10,15,0],"2705":[["\u2705"],"","\uDBBA\uDF4A",["white_check_mark"],2,11,15,0],"2708":[["\u2708\uFE0F","\u2708"],"\uE01D","\uDBB9\uDFE9",["airplane"],2,12,15,0],"2709":[["\u2709\uFE0F","\u2709"],"\uE103","\uDBB9\uDD29",["email","envelope"],2,13,15,0],"270a":[["\u270A"],"\uE010","\uDBBA\uDF93",["fist"],2,14,15,0],"270b":[["\u270B"],"\uE012","\uDBBA\uDF95",["hand","raised_hand"],2,20,15,0],"270c":[["\u270C\uFE0F","\u270C"],"\uE011","\uDBBA\uDF94",["v"],2,26,15,0],"270f":[["\u270F\uFE0F","\u270F"],"\uE301","\uDBB9\uDD39",["pencil2"],2,32,15,0],"2712":[["\u2712\uFE0F","\u2712"],"","\uDBB9\uDD36",["black_nib"],2,33,15,0],"2714":[["\u2714\uFE0F","\u2714"],"","\uDBBA\uDF49",["heavy_check_mark"],2,34,15,0],"2716":[["\u2716\uFE0F","\u2716"],"\uE333","\uDBBA\uDF53",["heavy_multiplication_x"],3,0,15,0],"2728":[["\u2728"],"\uE32E","\uDBBA\uDF60",["sparkles"],3,1,15,0],"2733":[["\u2733\uFE0F","\u2733"],"\uE206","\uDBBA\uDF62",["eight_spoked_asterisk"],3,2,15,0],"2734":[["\u2734\uFE0F","\u2734"],"\uE205","\uDBBA\uDF61",["eight_pointed_black_star"],3,3,15,0],"2744":[["\u2744\uFE0F","\u2744"],"","\uDBB8\uDC0E",["snowflake"],3,4,15,0],"2747":[["\u2747\uFE0F","\u2747"],"\uE32E","\uDBBA\uDF77",["sparkle"],3,5,15,0],"274c":[["\u274C"],"\uE333","\uDBBA\uDF45",["x"],3,6,15,0],"274e":[["\u274E"],"\uE333","\uDBBA\uDF46",["negative_squared_cross_mark"],3,7,15,0],"2753":[["\u2753"],"\uE020","\uDBBA\uDF09",["question"],3,8,15,0],"2754":[["\u2754"],"\uE336","\uDBBA\uDF0A",["grey_question"],3,9,15,0],"2755":[["\u2755"],"\uE337","\uDBBA\uDF0B",["grey_exclamation"],3,10,15,0],"2757":[["\u2757\uFE0F","\u2757"],"\uE021","\uDBBA\uDF04",["exclamation","heavy_exclamation_mark"],3,11,15,0],"2764":[["\u2764\uFE0F","\u2764"],"\uE022","\uDBBA\uDF0C",["heart"],3,12,15,0,"<3"],"2795":[["\u2795"],"","\uDBBA\uDF51",["heavy_plus_sign"],3,13,15,0],"2796":[["\u2796"],"","\uDBBA\uDF52",["heavy_minus_sign"],3,14,15,0],"2797":[["\u2797"],"","\uDBBA\uDF54",["heavy_division_sign"],3,15,15,0],"27a1":[["\u27A1\uFE0F","\u27A1"],"\uE234","\uDBBA\uDEFA",["arrow_right"],3,16,15,0],"27b0":[["\u27B0"],"","\uDBBA\uDF08",["curly_loop"],3,17,15,0],"27bf":[["\u27BF"],"\uE211","\uDBBA\uDC2B",["loop"],3,18,15,0],"2934":[["\u2934\uFE0F","\u2934"],"\uE236","\uDBBA\uDEF4",["arrow_heading_up"],3,19,15,0],"2935":[["\u2935\uFE0F","\u2935"],"\uE238","\uDBBA\uDEF5",["arrow_heading_down"],3,20,15,0],"2b05":[["\u2B05\uFE0F","\u2B05"],"\uE235","\uDBBA\uDEFB",["arrow_left"],3,21,15,0],"2b06":[["\u2B06\uFE0F","\u2B06"],"\uE232","\uDBBA\uDEF8",["arrow_up"],3,22,15,0],"2b07":[["\u2B07\uFE0F","\u2B07"],"\uE233","\uDBBA\uDEF9",["arrow_down"],3,23,15,0],"2b1b":[["\u2B1B\uFE0F","\u2B1B"],"\uE21A","\uDBBA\uDF6C",["black_large_square"],3,24,15,0],"2b1c":[["\u2B1C\uFE0F","\u2B1C"],"\uE21B","\uDBBA\uDF6B",["white_large_square"],3,25,15,0],"2b50":[["\u2B50\uFE0F","\u2B50"],"\uE32F","\uDBBA\uDF68",["star"],3,26,15,0],"2b55":[["\u2B55\uFE0F","\u2B55"],"\uE332","\uDBBA\uDF44",["o"],3,27,15,0],"3030":[["\u3030\uFE0F","\u3030"],"","\uDBBA\uDF07",["wavy_dash"],3,28,15,0],"303d":[["\u303D\uFE0F","\u303D"],"\uE12C","\uDBBA\uDC1B",["part_alternation_mark"],3,29,15,0],"3297":[["\u3297\uFE0F","\u3297"],"\uE30D","\uDBBA\uDF43",["congratulations"],3,30,15,0],"3299":[["\u3299\uFE0F","\u3299"],"\uE315","\uDBBA\uDF2B",["secret"],3,31,15,0],"1f004":[["\uD83C\uDC04\uFE0F","\uD83C\uDC04"],"\uE12D","\uDBBA\uDC0B",["mahjong"],3,32,15,0],"1f0cf":[["\uD83C\uDCCF"],"","\uDBBA\uDC12",["black_joker"],3,33,15,0],"1f170":[["\uD83C\uDD70\uFE0F","\uD83C\uDD70"],"\uE532","\uDBB9\uDD0B",["a"],3,34,15,0],"1f171":[["\uD83C\uDD71\uFE0F","\uD83C\uDD71"],"\uE533","\uDBB9\uDD0C",["b"],4,0,15,0],"1f17e":[["\uD83C\uDD7E\uFE0F","\uD83C\uDD7E"],"\uE535","\uDBB9\uDD0E",["o2"],4,1,15,0],"1f17f":[["\uD83C\uDD7F\uFE0F","\uD83C\uDD7F"],"\uE14F","\uDBB9\uDFF6",["parking"],4,2,15,0],"1f18e":[["\uD83C\uDD8E"],"\uE534","\uDBB9\uDD0D",["ab"],4,3,15,0],"1f191":[["\uD83C\uDD91"],"","\uDBBA\uDF84",["cl"],4,4,15,0],"1f192":[["\uD83C\uDD92"],"\uE214","\uDBBA\uDF38",["cool"],4,5,15,0],"1f193":[["\uD83C\uDD93"],"","\uDBBA\uDF21",["free"],4,6,15,0],"1f194":[["\uD83C\uDD94"],"\uE229","\uDBBA\uDF81",["id"],4,7,15,0],"1f195":[["\uD83C\uDD95"],"\uE212","\uDBBA\uDF36",["new"],4,8,15,0],"1f196":[["\uD83C\uDD96"],"","\uDBBA\uDF28",["ng"],4,9,15,0],"1f197":[["\uD83C\uDD97"],"\uE24D","\uDBBA\uDF27",["ok"],4,10,15,0],"1f198":[["\uD83C\uDD98"],"","\uDBBA\uDF4F",["sos"],4,11,15,0],"1f199":[["\uD83C\uDD99"],"\uE213","\uDBBA\uDF37",["up"],4,12,15,0],"1f19a":[["\uD83C\uDD9A"],"\uE12E","\uDBBA\uDF32",["vs"],4,13,15,0],"1f201":[["\uD83C\uDE01"],"\uE203","\uDBBA\uDF24",["koko"],4,14,15,0],"1f202":[["\uD83C\uDE02\uFE0F","\uD83C\uDE02"],"\uE228","\uDBBA\uDF3F",["sa"],4,15,15,0],"1f21a":[["\uD83C\uDE1A\uFE0F","\uD83C\uDE1A"],"\uE216","\uDBBA\uDF3A",["u7121"],4,16,15,0],"1f22f":[["\uD83C\uDE2F\uFE0F","\uD83C\uDE2F"],"\uE22C","\uDBBA\uDF40",["u6307"],4,17,15,0],"1f232":[["\uD83C\uDE32"],"","\uDBBA\uDF2E",["u7981"],4,18,15,0],"1f233":[["\uD83C\uDE33"],"\uE22B","\uDBBA\uDF2F",["u7a7a"],4,19,15,0],"1f234":[["\uD83C\uDE34"],"","\uDBBA\uDF30",["u5408"],4,20,15,0],"1f235":[["\uD83C\uDE35"],"\uE22A","\uDBBA\uDF31",["u6e80"],4,21,15,0],"1f236":[["\uD83C\uDE36"],"\uE215","\uDBBA\uDF39",["u6709"],4,22,15,0],"1f237":[["\uD83C\uDE37\uFE0F","\uD83C\uDE37"],"\uE217","\uDBBA\uDF3B",["u6708"],4,23,15,0],"1f238":[["\uD83C\uDE38"],"\uE218","\uDBBA\uDF3C",["u7533"],4,24,15,0],"1f239":[["\uD83C\uDE39"],"\uE227","\uDBBA\uDF3E",["u5272"],4,25,15,0],"1f23a":[["\uD83C\uDE3A"],"\uE22D","\uDBBA\uDF41",["u55b6"],4,26,15,0],"1f250":[["\uD83C\uDE50"],"\uE226","\uDBBA\uDF3D",["ideograph_advantage"],4,27,15,0],"1f251":[["\uD83C\uDE51"],"","\uDBBA\uDF50",["accept"],4,28,15,0],"1f300":[["\uD83C\uDF00"],"\uE443","\uDBB8\uDC05",["cyclone"],4,29,15,0],"1f301":[["\uD83C\uDF01"],"","\uDBB8\uDC06",["foggy"],4,30,15,0],"1f302":[["\uD83C\uDF02"],"\uE43C","\uDBB8\uDC07",["closed_umbrella"],4,31,15,0],"1f303":[["\uD83C\uDF03"],"\uE44B","\uDBB8\uDC08",["night_with_stars"],4,32,15,0],"1f304":[["\uD83C\uDF04"],"\uE04D","\uDBB8\uDC09",["sunrise_over_mountains"],4,33,15,0],"1f305":[["\uD83C\uDF05"],"\uE449","\uDBB8\uDC0A",["sunrise"],4,34,15,0],"1f306":[["\uD83C\uDF06"],"\uE146","\uDBB8\uDC0B",["city_sunset"],5,0,15,0],"1f307":[["\uD83C\uDF07"],"\uE44A","\uDBB8\uDC0C",["city_sunrise"],5,1,15,0],"1f308":[["\uD83C\uDF08"],"\uE44C","\uDBB8\uDC0D",["rainbow"],5,2,15,0],"1f309":[["\uD83C\uDF09"],"\uE44B","\uDBB8\uDC10",["bridge_at_night"],5,3,15,0],"1f30a":[["\uD83C\uDF0A"],"\uE43E","\uDBB8\uDC38",["ocean"],5,4,15,0],"1f30b":[["\uD83C\uDF0B"],"","\uDBB8\uDC3A",["volcano"],5,5,15,0],"1f30c":[["\uD83C\uDF0C"],"\uE44B","\uDBB8\uDC3B",["milky_way"],5,6,15,0],"1f30d":[["\uD83C\uDF0D"],"","",["earth_africa"],5,7,15,0],"1f30e":[["\uD83C\uDF0E"],"","",["earth_americas"],5,8,15,0],"1f30f":[["\uD83C\uDF0F"],"","\uDBB8\uDC39",["earth_asia"],5,9,15,0],"1f310":[["\uD83C\uDF10"],"","",["globe_with_meridians"],5,10,15,0],"1f311":[["\uD83C\uDF11"],"","\uDBB8\uDC11",["new_moon"],5,11,15,0],"1f312":[["\uD83C\uDF12"],"","",["waxing_crescent_moon"],5,12,15,0],"1f313":[["\uD83C\uDF13"],"\uE04C","\uDBB8\uDC13",["first_quarter_moon"],5,13,15,0],"1f314":[["\uD83C\uDF14"],"\uE04C","\uDBB8\uDC12",["moon","waxing_gibbous_moon"],5,14,15,0],"1f315":[["\uD83C\uDF15"],"","\uDBB8\uDC15",["full_moon"],5,15,15,0],"1f316":[["\uD83C\uDF16"],"","",["waning_gibbous_moon"],5,16,15,0],"1f317":[["\uD83C\uDF17"],"","",["last_quarter_moon"],5,17,15,0],"1f318":[["\uD83C\uDF18"],"","",["waning_crescent_moon"],5,18,15,0],"1f319":[["\uD83C\uDF19"],"\uE04C","\uDBB8\uDC14",["crescent_moon"],5,19,15,0],"1f31a":[["\uD83C\uDF1A"],"","",["new_moon_with_face"],5,20,15,0],"1f31b":[["\uD83C\uDF1B"],"\uE04C","\uDBB8\uDC16",["first_quarter_moon_with_face"],5,21,15,0],"1f31c":[["\uD83C\uDF1C"],"","",["last_quarter_moon_with_face"],5,22,15,0],"1f31d":[["\uD83C\uDF1D"],"","",["full_moon_with_face"],5,23,15,0],"1f31e":[["\uD83C\uDF1E"],"","",["sun_with_face"],5,24,15,0],"1f31f":[["\uD83C\uDF1F"],"\uE335","\uDBBA\uDF69",["star2"],5,25,15,0],"1f320":[["\uD83C\uDF20"],"","\uDBBA\uDF6A",["stars"],5,26,15,0],"1f330":[["\uD83C\uDF30"],"","\uDBB8\uDC4C",["chestnut"],5,27,15,0],"1f331":[["\uD83C\uDF31"],"\uE110","\uDBB8\uDC3E",["seedling"],5,28,15,0],"1f332":[["\uD83C\uDF32"],"","",["evergreen_tree"],5,29,15,0],"1f333":[["\uD83C\uDF33"],"","",["deciduous_tree"],5,30,15,0],"1f334":[["\uD83C\uDF34"],"\uE307","\uDBB8\uDC47",["palm_tree"],5,31,15,0],"1f335":[["\uD83C\uDF35"],"\uE308","\uDBB8\uDC48",["cactus"],5,32,15,0],"1f337":[["\uD83C\uDF37"],"\uE304","\uDBB8\uDC3D",["tulip"],5,33,15,0],"1f338":[["\uD83C\uDF38"],"\uE030","\uDBB8\uDC40",["cherry_blossom"],5,34,15,0],"1f339":[["\uD83C\uDF39"],"\uE032","\uDBB8\uDC41",["rose"],6,0,15,0],"1f33a":[["\uD83C\uDF3A"],"\uE303","\uDBB8\uDC45",["hibiscus"],6,1,15,0],"1f33b":[["\uD83C\uDF3B"],"\uE305","\uDBB8\uDC46",["sunflower"],6,2,15,0],"1f33c":[["\uD83C\uDF3C"],"\uE305","\uDBB8\uDC4D",["blossom"],6,3,15,0],"1f33d":[["\uD83C\uDF3D"],"","\uDBB8\uDC4A",["corn"],6,4,15,0],"1f33e":[["\uD83C\uDF3E"],"\uE444","\uDBB8\uDC49",["ear_of_rice"],6,5,15,0],"1f33f":[["\uD83C\uDF3F"],"\uE110","\uDBB8\uDC4E",["herb"],6,6,15,0],"1f340":[["\uD83C\uDF40"],"\uE110","\uDBB8\uDC3C",["four_leaf_clover"],6,7,15,0],"1f341":[["\uD83C\uDF41"],"\uE118","\uDBB8\uDC3F",["maple_leaf"],6,8,15,0],"1f342":[["\uD83C\uDF42"],"\uE119","\uDBB8\uDC42",["fallen_leaf"],6,9,15,0],"1f343":[["\uD83C\uDF43"],"\uE447","\uDBB8\uDC43",["leaves"],6,10,15,0],"1f344":[["\uD83C\uDF44"],"","\uDBB8\uDC4B",["mushroom"],6,11,15,0],"1f345":[["\uD83C\uDF45"],"\uE349","\uDBB8\uDC55",["tomato"],6,12,15,0],"1f346":[["\uD83C\uDF46"],"\uE34A","\uDBB8\uDC56",["eggplant"],6,13,15,0],"1f347":[["\uD83C\uDF47"],"","\uDBB8\uDC59",["grapes"],6,14,15,0],"1f348":[["\uD83C\uDF48"],"","\uDBB8\uDC57",["melon"],6,15,15,0],"1f349":[["\uD83C\uDF49"],"\uE348","\uDBB8\uDC54",["watermelon"],6,16,15,0],"1f34a":[["\uD83C\uDF4A"],"\uE346","\uDBB8\uDC52",["tangerine"],6,17,15,0],"1f34b":[["\uD83C\uDF4B"],"","",["lemon"],6,18,15,0],"1f34c":[["\uD83C\uDF4C"],"","\uDBB8\uDC50",["banana"],6,19,15,0],"1f34d":[["\uD83C\uDF4D"],"","\uDBB8\uDC58",["pineapple"],6,20,15,0],"1f34e":[["\uD83C\uDF4E"],"\uE345","\uDBB8\uDC51",["apple"],6,21,15,0],"1f34f":[["\uD83C\uDF4F"],"\uE345","\uDBB8\uDC5B",["green_apple"],6,22,15,0],"1f350":[["\uD83C\uDF50"],"","",["pear"],6,23,15,0],"1f351":[["\uD83C\uDF51"],"","\uDBB8\uDC5A",["peach"],6,24,15,0],"1f352":[["\uD83C\uDF52"],"","\uDBB8\uDC4F",["cherries"],6,25,15,0],"1f353":[["\uD83C\uDF53"],"\uE347","\uDBB8\uDC53",["strawberry"],6,26,15,0],"1f354":[["\uD83C\uDF54"],"\uE120","\uDBBA\uDD60",["hamburger"],6,27,15,0],"1f355":[["\uD83C\uDF55"],"","\uDBBA\uDD75",["pizza"],6,28,15,0],"1f356":[["\uD83C\uDF56"],"","\uDBBA\uDD72",["meat_on_bone"],6,29,15,0],"1f357":[["\uD83C\uDF57"],"","\uDBBA\uDD76",["poultry_leg"],6,30,15,0],"1f358":[["\uD83C\uDF58"],"\uE33D","\uDBBA\uDD69",["rice_cracker"],6,31,15,0],"1f359":[["\uD83C\uDF59"],"\uE342","\uDBBA\uDD61",["rice_ball"],6,32,15,0],"1f35a":[["\uD83C\uDF5A"],"\uE33E","\uDBBA\uDD6A",["rice"],6,33,15,0],"1f35b":[["\uD83C\uDF5B"],"\uE341","\uDBBA\uDD6C",["curry"],6,34,15,0],"1f35c":[["\uD83C\uDF5C"],"\uE340","\uDBBA\uDD63",["ramen"],7,0,15,0],"1f35d":[["\uD83C\uDF5D"],"\uE33F","\uDBBA\uDD6B",["spaghetti"],7,1,15,0],"1f35e":[["\uD83C\uDF5E"],"\uE339","\uDBBA\uDD64",["bread"],7,2,15,0],"1f35f":[["\uD83C\uDF5F"],"\uE33B","\uDBBA\uDD67",["fries"],7,3,15,0],"1f360":[["\uD83C\uDF60"],"","\uDBBA\uDD74",["sweet_potato"],7,4,15,0],"1f361":[["\uD83C\uDF61"],"\uE33C","\uDBBA\uDD68",["dango"],7,5,15,0],"1f362":[["\uD83C\uDF62"],"\uE343","\uDBBA\uDD6D",["oden"],7,6,15,0],"1f363":[["\uD83C\uDF63"],"\uE344","\uDBBA\uDD6E",["sushi"],7,7,15,0],"1f364":[["\uD83C\uDF64"],"","\uDBBA\uDD7F",["fried_shrimp"],7,8,15,0],"1f365":[["\uD83C\uDF65"],"","\uDBBA\uDD73",["fish_cake"],7,9,15,0],"1f366":[["\uD83C\uDF66"],"\uE33A","\uDBBA\uDD66",["icecream"],7,10,15,0],"1f367":[["\uD83C\uDF67"],"\uE43F","\uDBBA\uDD71",["shaved_ice"],7,11,15,0],"1f368":[["\uD83C\uDF68"],"","\uDBBA\uDD77",["ice_cream"],7,12,15,0],"1f369":[["\uD83C\uDF69"],"","\uDBBA\uDD78",["doughnut"],7,13,15,0],"1f36a":[["\uD83C\uDF6A"],"","\uDBBA\uDD79",["cookie"],7,14,15,0],"1f36b":[["\uD83C\uDF6B"],"","\uDBBA\uDD7A",["chocolate_bar"],7,15,15,0],"1f36c":[["\uD83C\uDF6C"],"","\uDBBA\uDD7B",["candy"],7,16,15,0],"1f36d":[["\uD83C\uDF6D"],"","\uDBBA\uDD7C",["lollipop"],7,17,15,0],"1f36e":[["\uD83C\uDF6E"],"","\uDBBA\uDD7D",["custard"],7,18,15,0],"1f36f":[["\uD83C\uDF6F"],"","\uDBBA\uDD7E",["honey_pot"],7,19,15,0],"1f370":[["\uD83C\uDF70"],"\uE046","\uDBBA\uDD62",["cake"],7,20,15,0],"1f371":[["\uD83C\uDF71"],"\uE34C","\uDBBA\uDD6F",["bento"],7,21,15,0],"1f372":[["\uD83C\uDF72"],"\uE34D","\uDBBA\uDD70",["stew"],7,22,15,0],"1f373":[["\uD83C\uDF73"],"\uE147","\uDBBA\uDD65",["egg"],7,23,15,0],"1f374":[["\uD83C\uDF74"],"\uE043","\uDBBA\uDD80",["fork_and_knife"],7,24,15,0],"1f375":[["\uD83C\uDF75"],"\uE338","\uDBBA\uDD84",["tea"],7,25,15,0],"1f376":[["\uD83C\uDF76"],"\uE30B","\uDBBA\uDD85",["sake"],7,26,15,0],"1f377":[["\uD83C\uDF77"],"\uE044","\uDBBA\uDD86",["wine_glass"],7,27,15,0],"1f378":[["\uD83C\uDF78"],"\uE044","\uDBBA\uDD82",["cocktail"],7,28,15,0],"1f379":[["\uD83C\uDF79"],"\uE044","\uDBBA\uDD88",["tropical_drink"],7,29,15,0],"1f37a":[["\uD83C\uDF7A"],"\uE047","\uDBBA\uDD83",["beer"],7,30,15,0],"1f37b":[["\uD83C\uDF7B"],"\uE30C","\uDBBA\uDD87",["beers"],7,31,15,0],"1f37c":[["\uD83C\uDF7C"],"","",["baby_bottle"],7,32,15,0],"1f380":[["\uD83C\uDF80"],"\uE314","\uDBB9\uDD0F",["ribbon"],7,33,15,0],"1f381":[["\uD83C\uDF81"],"\uE112","\uDBB9\uDD10",["gift"],7,34,15,0],"1f382":[["\uD83C\uDF82"],"\uE34B","\uDBB9\uDD11",["birthday"],8,0,15,0],"1f383":[["\uD83C\uDF83"],"\uE445","\uDBB9\uDD1F",["jack_o_lantern"],8,1,15,0],"1f384":[["\uD83C\uDF84"],"\uE033","\uDBB9\uDD12",["christmas_tree"],8,2,15,0],"1f385":[["\uD83C\uDF85"],"\uE448","\uDBB9\uDD13",["santa"],8,3,15,0],"1f386":[["\uD83C\uDF86"],"\uE117","\uDBB9\uDD15",["fireworks"],8,9,15,0],"1f387":[["\uD83C\uDF87"],"\uE440","\uDBB9\uDD1D",["sparkler"],8,10,15,0],"1f388":[["\uD83C\uDF88"],"\uE310","\uDBB9\uDD16",["balloon"],8,11,15,0],"1f389":[["\uD83C\uDF89"],"\uE312","\uDBB9\uDD17",["tada"],8,12,15,0],"1f38a":[["\uD83C\uDF8A"],"","\uDBB9\uDD20",["confetti_ball"],8,13,15,0],"1f38b":[["\uD83C\uDF8B"],"","\uDBB9\uDD21",["tanabata_tree"],8,14,15,0],"1f38c":[["\uD83C\uDF8C"],"\uE143","\uDBB9\uDD14",["crossed_flags"],8,15,15,0],"1f38d":[["\uD83C\uDF8D"],"\uE436","\uDBB9\uDD18",["bamboo"],8,16,15,0],"1f38e":[["\uD83C\uDF8E"],"\uE438","\uDBB9\uDD19",["dolls"],8,17,15,0],"1f38f":[["\uD83C\uDF8F"],"\uE43B","\uDBB9\uDD1C",["flags"],8,18,15,0],"1f390":[["\uD83C\uDF90"],"\uE442","\uDBB9\uDD1E",["wind_chime"],8,19,15,0],"1f391":[["\uD83C\uDF91"],"\uE446","\uDBB8\uDC17",["rice_scene"],8,20,15,0],"1f392":[["\uD83C\uDF92"],"\uE43A","\uDBB9\uDD1B",["school_satchel"],8,21,15,0],"1f393":[["\uD83C\uDF93"],"\uE439","\uDBB9\uDD1A",["mortar_board"],8,22,15,0],"1f3a0":[["\uD83C\uDFA0"],"","\uDBB9\uDFFC",["carousel_horse"],8,23,15,0],"1f3a1":[["\uD83C\uDFA1"],"\uE124","\uDBB9\uDFFD",["ferris_wheel"],8,24,15,0],"1f3a2":[["\uD83C\uDFA2"],"\uE433","\uDBB9\uDFFE",["roller_coaster"],8,25,15,0],"1f3a3":[["\uD83C\uDFA3"],"\uE019","\uDBB9\uDFFF",["fishing_pole_and_fish"],8,26,15,0],"1f3a4":[["\uD83C\uDFA4"],"\uE03C","\uDBBA\uDC00",["microphone"],8,27,15,0],"1f3a5":[["\uD83C\uDFA5"],"\uE03D","\uDBBA\uDC01",["movie_camera"],8,28,15,0],"1f3a6":[["\uD83C\uDFA6"],"\uE507","\uDBBA\uDC02",["cinema"],8,29,15,0],"1f3a7":[["\uD83C\uDFA7"],"\uE30A","\uDBBA\uDC03",["headphones"],8,30,15,0],"1f3a8":[["\uD83C\uDFA8"],"\uE502","\uDBBA\uDC04",["art"],8,31,15,0],"1f3a9":[["\uD83C\uDFA9"],"\uE503","\uDBBA\uDC05",["tophat"],8,32,15,0],"1f3aa":[["\uD83C\uDFAA"],"","\uDBBA\uDC06",["circus_tent"],8,33,15,0],"1f3ab":[["\uD83C\uDFAB"],"\uE125","\uDBBA\uDC07",["ticket"],8,34,15,0],"1f3ac":[["\uD83C\uDFAC"],"\uE324","\uDBBA\uDC08",["clapper"],9,0,15,0],"1f3ad":[["\uD83C\uDFAD"],"\uE503","\uDBBA\uDC09",["performing_arts"],9,1,15,0],"1f3ae":[["\uD83C\uDFAE"],"","\uDBBA\uDC0A",["video_game"],9,2,15,0],"1f3af":[["\uD83C\uDFAF"],"\uE130","\uDBBA\uDC0C",["dart"],9,3,15,0],"1f3b0":[["\uD83C\uDFB0"],"\uE133","\uDBBA\uDC0D",["slot_machine"],9,4,15,0],"1f3b1":[["\uD83C\uDFB1"],"\uE42C","\uDBBA\uDC0E",["8ball"],9,5,15,0],"1f3b2":[["\uD83C\uDFB2"],"","\uDBBA\uDC0F",["game_die"],9,6,15,0],"1f3b3":[["\uD83C\uDFB3"],"","\uDBBA\uDC10",["bowling"],9,7,15,0],"1f3b4":[["\uD83C\uDFB4"],"","\uDBBA\uDC11",["flower_playing_cards"],9,8,15,0],"1f3b5":[["\uD83C\uDFB5"],"\uE03E","\uDBBA\uDC13",["musical_note"],9,9,15,0],"1f3b6":[["\uD83C\uDFB6"],"\uE326","\uDBBA\uDC14",["notes"],9,10,15,0],"1f3b7":[["\uD83C\uDFB7"],"\uE040","\uDBBA\uDC15",["saxophone"],9,11,15,0],"1f3b8":[["\uD83C\uDFB8"],"\uE041","\uDBBA\uDC16",["guitar"],9,12,15,0],"1f3b9":[["\uD83C\uDFB9"],"","\uDBBA\uDC17",["musical_keyboard"],9,13,15,0],"1f3ba":[["\uD83C\uDFBA"],"\uE042","\uDBBA\uDC18",["trumpet"],9,14,15,0],"1f3bb":[["\uD83C\uDFBB"],"","\uDBBA\uDC19",["violin"],9,15,15,0],"1f3bc":[["\uD83C\uDFBC"],"\uE326","\uDBBA\uDC1A",["musical_score"],9,16,15,0],"1f3bd":[["\uD83C\uDFBD"],"","\uDBB9\uDFD0",["running_shirt_with_sash"],9,17,15,0],"1f3be":[["\uD83C\uDFBE"],"\uE015","\uDBB9\uDFD3",["tennis"],9,18,15,0],"1f3bf":[["\uD83C\uDFBF"],"\uE013","\uDBB9\uDFD5",["ski"],9,19,15,0],"1f3c0":[["\uD83C\uDFC0"],"\uE42A","\uDBB9\uDFD6",["basketball"],9,20,15,0],"1f3c1":[["\uD83C\uDFC1"],"\uE132","\uDBB9\uDFD7",["checkered_flag"],9,21,15,0],"1f3c2":[["\uD83C\uDFC2"],"","\uDBB9\uDFD8",["snowboarder"],9,22,15,0],"1f3c3":[["\uD83C\uDFC3"],"\uE115","\uDBB9\uDFD9",["runner","running"],9,23,15,0],"1f3c4":[["\uD83C\uDFC4"],"\uE017","\uDBB9\uDFDA",["surfer"],9,29,15,0],"1f3c6":[["\uD83C\uDFC6"],"\uE131","\uDBB9\uDFDB",["trophy"],10,0,15,0],"1f3c7":[["\uD83C\uDFC7"],"","",["horse_racing"],10,1,15,0],"1f3c8":[["\uD83C\uDFC8"],"\uE42B","\uDBB9\uDFDD",["football"],10,7,15,0],"1f3c9":[["\uD83C\uDFC9"],"","",["rugby_football"],10,8,15,0],"1f3ca":[["\uD83C\uDFCA"],"\uE42D","\uDBB9\uDFDE",["swimmer"],10,9,15,0],"1f3e0":[["\uD83C\uDFE0"],"\uE036","\uDBB9\uDCB0",["house"],10,15,15,0],"1f3e1":[["\uD83C\uDFE1"],"\uE036","\uDBB9\uDCB1",["house_with_garden"],10,16,15,0],"1f3e2":[["\uD83C\uDFE2"],"\uE038","\uDBB9\uDCB2",["office"],10,17,15,0],"1f3e3":[["\uD83C\uDFE3"],"\uE153","\uDBB9\uDCB3",["post_office"],10,18,15,0],"1f3e4":[["\uD83C\uDFE4"],"","",["european_post_office"],10,19,15,0],"1f3e5":[["\uD83C\uDFE5"],"\uE155","\uDBB9\uDCB4",["hospital"],10,20,15,0],"1f3e6":[["\uD83C\uDFE6"],"\uE14D","\uDBB9\uDCB5",["bank"],10,21,15,0],"1f3e7":[["\uD83C\uDFE7"],"\uE154","\uDBB9\uDCB6",["atm"],10,22,15,0],"1f3e8":[["\uD83C\uDFE8"],"\uE158","\uDBB9\uDCB7",["hotel"],10,23,15,0],"1f3e9":[["\uD83C\uDFE9"],"\uE501","\uDBB9\uDCB8",["love_hotel"],10,24,15,0],"1f3ea":[["\uD83C\uDFEA"],"\uE156","\uDBB9\uDCB9",["convenience_store"],10,25,15,0],"1f3eb":[["\uD83C\uDFEB"],"\uE157","\uDBB9\uDCBA",["school"],10,26,15,0],"1f3ec":[["\uD83C\uDFEC"],"\uE504","\uDBB9\uDCBD",["department_store"],10,27,15,0],"1f3ed":[["\uD83C\uDFED"],"\uE508","\uDBB9\uDCC0",["factory"],10,28,15,0],"1f3ee":[["\uD83C\uDFEE"],"\uE30B","\uDBB9\uDCC2",["izakaya_lantern","lantern"],10,29,15,0],"1f3ef":[["\uD83C\uDFEF"],"\uE505","\uDBB9\uDCBE",["japanese_castle"],10,30,15,0],"1f3f0":[["\uD83C\uDFF0"],"\uE506","\uDBB9\uDCBF",["european_castle"],10,31,15,0],"1f3fb":[["\uD83C\uDFFB"],"","",["skin-tone-2"],10,32,1,0],"1f3fc":[["\uD83C\uDFFC"],"","",["skin-tone-3"],10,33,1,0],"1f3fd":[["\uD83C\uDFFD"],"","",["skin-tone-4"],10,34,1,0],"1f3fe":[["\uD83C\uDFFE"],"","",["skin-tone-5"],11,0,1,0],"1f3ff":[["\uD83C\uDFFF"],"","",["skin-tone-6"],11,1,1,0],"1f400":[["\uD83D\uDC00"],"","",["rat"],11,2,15,0],"1f401":[["\uD83D\uDC01"],"","",["mouse2"],11,3,15,0],"1f402":[["\uD83D\uDC02"],"","",["ox"],11,4,15,0],"1f403":[["\uD83D\uDC03"],"","",["water_buffalo"],11,5,15,0],"1f404":[["\uD83D\uDC04"],"","",["cow2"],11,6,15,0],"1f405":[["\uD83D\uDC05"],"","",["tiger2"],11,7,15,0],"1f406":[["\uD83D\uDC06"],"","",["leopard"],11,8,15,0],"1f407":[["\uD83D\uDC07"],"","",["rabbit2"],11,9,15,0],"1f408":[["\uD83D\uDC08"],"","",["cat2"],11,10,15,0],"1f409":[["\uD83D\uDC09"],"","",["dragon"],11,11,15,0],"1f40a":[["\uD83D\uDC0A"],"","",["crocodile"],11,12,15,0],"1f40b":[["\uD83D\uDC0B"],"","",["whale2"],11,13,15,0],"1f40c":[["\uD83D\uDC0C"],"","\uDBB8\uDDB9",["snail"],11,14,15,0],"1f40d":[["\uD83D\uDC0D"],"\uE52D","\uDBB8\uDDD3",["snake"],11,15,15,0],"1f40e":[["\uD83D\uDC0E"],"\uE134","\uDBB9\uDFDC",["racehorse"],11,16,15,0],"1f40f":[["\uD83D\uDC0F"],"","",["ram"],11,17,15,0],"1f410":[["\uD83D\uDC10"],"","",["goat"],11,18,15,0],"1f411":[["\uD83D\uDC11"],"\uE529","\uDBB8\uDDCF",["sheep"],11,19,15,0],"1f412":[["\uD83D\uDC12"],"\uE528","\uDBB8\uDDCE",["monkey"],11,20,15,0],"1f413":[["\uD83D\uDC13"],"","",["rooster"],11,21,15,0],"1f414":[["\uD83D\uDC14"],"\uE52E","\uDBB8\uDDD4",["chicken"],11,22,15,0],"1f415":[["\uD83D\uDC15"],"","",["dog2"],11,23,15,0],"1f416":[["\uD83D\uDC16"],"","",["pig2"],11,24,15,0],"1f417":[["\uD83D\uDC17"],"\uE52F","\uDBB8\uDDD5",["boar"],11,25,15,0],"1f418":[["\uD83D\uDC18"],"\uE526","\uDBB8\uDDCC",["elephant"],11,26,15,0],"1f419":[["\uD83D\uDC19"],"\uE10A","\uDBB8\uDDC5",["octopus"],11,27,15,0],"1f41a":[["\uD83D\uDC1A"],"\uE441","\uDBB8\uDDC6",["shell"],11,28,15,0],"1f41b":[["\uD83D\uDC1B"],"\uE525","\uDBB8\uDDCB",["bug"],11,29,15,0],"1f41c":[["\uD83D\uDC1C"],"","\uDBB8\uDDDA",["ant"],11,30,15,0],"1f41d":[["\uD83D\uDC1D"],"","\uDBB8\uDDE1",["bee","honeybee"],11,31,15,0],"1f41e":[["\uD83D\uDC1E"],"","\uDBB8\uDDE2",["beetle"],11,32,15,0],"1f41f":[["\uD83D\uDC1F"],"\uE019","\uDBB8\uDDBD",["fish"],11,33,15,0],"1f420":[["\uD83D\uDC20"],"\uE522","\uDBB8\uDDC9",["tropical_fish"],11,34,15,0],"1f421":[["\uD83D\uDC21"],"\uE019","\uDBB8\uDDD9",["blowfish"],12,0,15,0],"1f422":[["\uD83D\uDC22"],"","\uDBB8\uDDDC",["turtle"],12,1,15,0],"1f423":[["\uD83D\uDC23"],"\uE523","\uDBB8\uDDDD",["hatching_chick"],12,2,15,0],"1f424":[["\uD83D\uDC24"],"\uE523","\uDBB8\uDDBA",["baby_chick"],12,3,15,0],"1f425":[["\uD83D\uDC25"],"\uE523","\uDBB8\uDDBB",["hatched_chick"],12,4,15,0],"1f426":[["\uD83D\uDC26"],"\uE521","\uDBB8\uDDC8",["bird"],12,5,15,0],"1f427":[["\uD83D\uDC27"],"\uE055","\uDBB8\uDDBC",["penguin"],12,6,15,0],"1f428":[["\uD83D\uDC28"],"\uE527","\uDBB8\uDDCD",["koala"],12,7,15,0],"1f429":[["\uD83D\uDC29"],"\uE052","\uDBB8\uDDD8",["poodle"],12,8,15,0],"1f42a":[["\uD83D\uDC2A"],"","",["dromedary_camel"],12,9,15,0],"1f42b":[["\uD83D\uDC2B"],"\uE530","\uDBB8\uDDD6",["camel"],12,10,15,0],"1f42c":[["\uD83D\uDC2C"],"\uE520","\uDBB8\uDDC7",["dolphin","flipper"],12,11,15,0],"1f42d":[["\uD83D\uDC2D"],"\uE053","\uDBB8\uDDC2",["mouse"],12,12,15,0],"1f42e":[["\uD83D\uDC2E"],"\uE52B","\uDBB8\uDDD1",["cow"],12,13,15,0],"1f42f":[["\uD83D\uDC2F"],"\uE050","\uDBB8\uDDC0",["tiger"],12,14,15,0],"1f430":[["\uD83D\uDC30"],"\uE52C","\uDBB8\uDDD2",["rabbit"],12,15,15,0],"1f431":[["\uD83D\uDC31"],"\uE04F","\uDBB8\uDDB8",["cat"],12,16,15,0],"1f432":[["\uD83D\uDC32"],"","\uDBB8\uDDDE",["dragon_face"],12,17,15,0],"1f433":[["\uD83D\uDC33"],"\uE054","\uDBB8\uDDC3",["whale"],12,18,15,0],"1f434":[["\uD83D\uDC34"],"\uE01A","\uDBB8\uDDBE",["horse"],12,19,15,0],"1f435":[["\uD83D\uDC35"],"\uE109","\uDBB8\uDDC4",["monkey_face"],12,20,15,0],"1f436":[["\uD83D\uDC36"],"\uE052","\uDBB8\uDDB7",["dog"],12,21,15,0],"1f437":[["\uD83D\uDC37"],"\uE10B","\uDBB8\uDDBF",["pig"],12,22,15,0],"1f438":[["\uD83D\uDC38"],"\uE531","\uDBB8\uDDD7",["frog"],12,23,15,0],"1f439":[["\uD83D\uDC39"],"\uE524","\uDBB8\uDDCA",["hamster"],12,24,15,0],"1f43a":[["\uD83D\uDC3A"],"\uE52A","\uDBB8\uDDD0",["wolf"],12,25,15,0],"1f43b":[["\uD83D\uDC3B"],"\uE051","\uDBB8\uDDC1",["bear"],12,26,15,0],"1f43c":[["\uD83D\uDC3C"],"","\uDBB8\uDDDF",["panda_face"],12,27,15,0],"1f43d":[["\uD83D\uDC3D"],"\uE10B","\uDBB8\uDDE0",["pig_nose"],12,28,15,0],"1f43e":[["\uD83D\uDC3E"],"\uE536","\uDBB8\uDDDB",["feet","paw_prints"],12,29,15,0],"1f440":[["\uD83D\uDC40"],"\uE419","\uDBB8\uDD90",["eyes"],12,30,15,0],"1f442":[["\uD83D\uDC42"],"\uE41B","\uDBB8\uDD91",["ear"],12,31,15,0],"1f443":[["\uD83D\uDC43"],"\uE41A","\uDBB8\uDD92",["nose"],13,2,15,0],"1f444":[["\uD83D\uDC44"],"\uE41C","\uDBB8\uDD93",["lips"],13,8,15,0],"1f445":[["\uD83D\uDC45"],"\uE409","\uDBB8\uDD94",["tongue"],13,9,15,0],"1f446":[["\uD83D\uDC46"],"\uE22E","\uDBBA\uDF99",["point_up_2"],13,10,15,0],"1f447":[["\uD83D\uDC47"],"\uE22F","\uDBBA\uDF9A",["point_down"],13,16,15,0],"1f448":[["\uD83D\uDC48"],"\uE230","\uDBBA\uDF9B",["point_left"],13,22,15,0],"1f449":[["\uD83D\uDC49"],"\uE231","\uDBBA\uDF9C",["point_right"],13,28,15,0],"1f44a":[["\uD83D\uDC4A"],"\uE00D","\uDBBA\uDF96",["facepunch","punch"],13,34,15,0],"1f44b":[["\uD83D\uDC4B"],"\uE41E","\uDBBA\uDF9D",["wave"],14,5,15,0],"1f44c":[["\uD83D\uDC4C"],"\uE420","\uDBBA\uDF9F",["ok_hand"],14,11,15,0],"1f44d":[["\uD83D\uDC4D"],"\uE00E","\uDBBA\uDF97",["+1","thumbsup"],14,17,15,0],"1f44e":[["\uD83D\uDC4E"],"\uE421","\uDBBA\uDFA0",["-1","thumbsdown"],14,23,15,0],"1f44f":[["\uD83D\uDC4F"],"\uE41F","\uDBBA\uDF9E",["clap"],14,29,15,0],"1f450":[["\uD83D\uDC50"],"\uE422","\uDBBA\uDFA1",["open_hands"],15,0,15,0],"1f451":[["\uD83D\uDC51"],"\uE10E","\uDBB9\uDCD1",["crown"],15,6,15,0],"1f452":[["\uD83D\uDC52"],"\uE318","\uDBB9\uDCD4",["womans_hat"],15,7,15,0],"1f453":[["\uD83D\uDC53"],"","\uDBB9\uDCCE",["eyeglasses"],15,8,15,0],"1f454":[["\uD83D\uDC54"],"\uE302","\uDBB9\uDCD3",["necktie"],15,9,15,0],"1f455":[["\uD83D\uDC55"],"\uE006","\uDBB9\uDCCF",["shirt","tshirt"],15,10,15,0],"1f456":[["\uD83D\uDC56"],"","\uDBB9\uDCD0",["jeans"],15,11,15,0],"1f457":[["\uD83D\uDC57"],"\uE319","\uDBB9\uDCD5",["dress"],15,12,15,0],"1f458":[["\uD83D\uDC58"],"\uE321","\uDBB9\uDCD9",["kimono"],15,13,15,0],"1f459":[["\uD83D\uDC59"],"\uE322","\uDBB9\uDCDA",["bikini"],15,14,15,0],"1f45a":[["\uD83D\uDC5A"],"\uE006","\uDBB9\uDCDB",["womans_clothes"],15,15,15,0],"1f45b":[["\uD83D\uDC5B"],"","\uDBB9\uDCDC",["purse"],15,16,15,0],"1f45c":[["\uD83D\uDC5C"],"\uE323","\uDBB9\uDCF0",["handbag"],15,17,15,0],"1f45d":[["\uD83D\uDC5D"],"","\uDBB9\uDCF1",["pouch"],15,18,15,0],"1f45e":[["\uD83D\uDC5E"],"\uE007","\uDBB9\uDCCC",["mans_shoe","shoe"],15,19,15,0],"1f45f":[["\uD83D\uDC5F"],"\uE007","\uDBB9\uDCCD",["athletic_shoe"],15,20,15,0],"1f460":[["\uD83D\uDC60"],"\uE13E","\uDBB9\uDCD6",["high_heel"],15,21,15,0],"1f461":[["\uD83D\uDC61"],"\uE31A","\uDBB9\uDCD7",["sandal"],15,22,15,0],"1f462":[["\uD83D\uDC62"],"\uE31B","\uDBB9\uDCD8",["boot"],15,23,15,0],"1f463":[["\uD83D\uDC63"],"\uE536","\uDBB9\uDD53",["footprints"],15,24,15,0],"1f464":[["\uD83D\uDC64"],"","\uDBB8\uDD9A",["bust_in_silhouette"],15,25,15,0],"1f465":[["\uD83D\uDC65"],"","",["busts_in_silhouette"],15,26,15,0],"1f466":[["\uD83D\uDC66"],"\uE001","\uDBB8\uDD9B",["boy"],15,27,15,0],"1f467":[["\uD83D\uDC67"],"\uE002","\uDBB8\uDD9C",["girl"],15,33,15,0],"1f468":[["\uD83D\uDC68"],"\uE004","\uDBB8\uDD9D",["man"],16,4,15,0],"1f469":[["\uD83D\uDC69"],"\uE005","\uDBB8\uDD9E",["woman"],16,10,15,0],"1f46a":[["\uD83D\uDC6A"],"","\uDBB8\uDD9F",["family"],16,16,15,0],"1f46b":[["\uD83D\uDC6B"],"\uE428","\uDBB8\uDDA0",["couple"],16,17,15,0],"1f46c":[["\uD83D\uDC6C"],"","",["two_men_holding_hands"],16,18,15,0],"1f46d":[["\uD83D\uDC6D"],"","",["two_women_holding_hands"],16,19,15,0],"1f46e":[["\uD83D\uDC6E"],"\uE152","\uDBB8\uDDA1",["cop"],16,20,15,0],"1f46f":[["\uD83D\uDC6F"],"\uE429","\uDBB8\uDDA2",["dancers"],16,26,15,0],"1f470":[["\uD83D\uDC70"],"","\uDBB8\uDDA3",["bride_with_veil"],16,27,15,0],"1f471":[["\uD83D\uDC71"],"\uE515","\uDBB8\uDDA4",["person_with_blond_hair"],16,33,15,0],"1f472":[["\uD83D\uDC72"],"\uE516","\uDBB8\uDDA5",["man_with_gua_pi_mao"],17,4,15,0],"1f473":[["\uD83D\uDC73"],"\uE517","\uDBB8\uDDA6",["man_with_turban"],17,10,15,0],"1f474":[["\uD83D\uDC74"],"\uE518","\uDBB8\uDDA7",["older_man"],17,16,15,0],"1f475":[["\uD83D\uDC75"],"\uE519","\uDBB8\uDDA8",["older_woman"],17,22,15,0],"1f476":[["\uD83D\uDC76"],"\uE51A","\uDBB8\uDDA9",["baby"],17,28,15,0],"1f477":[["\uD83D\uDC77"],"\uE51B","\uDBB8\uDDAA",["construction_worker"],17,34,15,0],"1f478":[["\uD83D\uDC78"],"\uE51C","\uDBB8\uDDAB",["princess"],18,5,15,0],"1f479":[["\uD83D\uDC79"],"","\uDBB8\uDDAC",["japanese_ogre"],18,11,15,0],"1f47a":[["\uD83D\uDC7A"],"","\uDBB8\uDDAD",["japanese_goblin"],18,12,15,0],"1f47b":[["\uD83D\uDC7B"],"\uE11B","\uDBB8\uDDAE",["ghost"],18,13,15,0],"1f47c":[["\uD83D\uDC7C"],"\uE04E","\uDBB8\uDDAF",["angel"],18,14,15,0],"1f47d":[["\uD83D\uDC7D"],"\uE10C","\uDBB8\uDDB0",["alien"],18,20,15,0],"1f47e":[["\uD83D\uDC7E"],"\uE12B","\uDBB8\uDDB1",["space_invader"],18,21,15,0],"1f47f":[["\uD83D\uDC7F"],"\uE11A","\uDBB8\uDDB2",["imp"],18,22,15,0],"1f480":[["\uD83D\uDC80"],"\uE11C","\uDBB8\uDDB3",["skull"],18,23,15,0],"1f481":[["\uD83D\uDC81"],"\uE253","\uDBB8\uDDB4",["information_desk_person"],18,24,15,0],"1f482":[["\uD83D\uDC82"],"\uE51E","\uDBB8\uDDB5",["guardsman"],18,30,15,0],"1f483":[["\uD83D\uDC83"],"\uE51F","\uDBB8\uDDB6",["dancer"],19,1,15,0],"1f484":[["\uD83D\uDC84"],"\uE31C","\uDBB8\uDD95",["lipstick"],19,7,15,0],"1f485":[["\uD83D\uDC85"],"\uE31D","\uDBB8\uDD96",["nail_care"],19,8,15,0],"1f486":[["\uD83D\uDC86"],"\uE31E","\uDBB8\uDD97",["massage"],19,14,15,0],"1f487":[["\uD83D\uDC87"],"\uE31F","\uDBB8\uDD98",["haircut"],19,20,15,0],"1f488":[["\uD83D\uDC88"],"\uE320","\uDBB8\uDD99",["barber"],19,26,15,0],"1f489":[["\uD83D\uDC89"],"\uE13B","\uDBB9\uDD09",["syringe"],19,27,15,0],"1f48a":[["\uD83D\uDC8A"],"\uE30F","\uDBB9\uDD0A",["pill"],19,28,15,0],"1f48b":[["\uD83D\uDC8B"],"\uE003","\uDBBA\uDC23",["kiss"],19,29,15,0],"1f48c":[["\uD83D\uDC8C"],"\uE103\uE328","\uDBBA\uDC24",["love_letter"],19,30,15,0],"1f48d":[["\uD83D\uDC8D"],"\uE034","\uDBBA\uDC25",["ring"],19,31,15,0],"1f48e":[["\uD83D\uDC8E"],"\uE035","\uDBBA\uDC26",["gem"],19,32,15,0],"1f48f":[["\uD83D\uDC8F"],"\uE111","\uDBBA\uDC27",["couplekiss"],19,33,15,0],"1f490":[["\uD83D\uDC90"],"\uE306","\uDBBA\uDC28",["bouquet"],19,34,15,0],"1f491":[["\uD83D\uDC91"],"\uE425","\uDBBA\uDC29",["couple_with_heart"],20,0,15,0],"1f492":[["\uD83D\uDC92"],"\uE43D","\uDBBA\uDC2A",["wedding"],20,1,15,0],"1f493":[["\uD83D\uDC93"],"\uE327","\uDBBA\uDF0D",["heartbeat"],20,2,15,0],"1f494":[["\uD83D\uDC94"],"\uE023","\uDBBA\uDF0E",["broken_heart"],20,3,15,0,"</3"],"1f495":[["\uD83D\uDC95"],"\uE327","\uDBBA\uDF0F",["two_hearts"],20,4,15,0],"1f496":[["\uD83D\uDC96"],"\uE327","\uDBBA\uDF10",["sparkling_heart"],20,5,15,0],"1f497":[["\uD83D\uDC97"],"\uE328","\uDBBA\uDF11",["heartpulse"],20,6,15,0],"1f498":[["\uD83D\uDC98"],"\uE329","\uDBBA\uDF12",["cupid"],20,7,15,0],"1f499":[["\uD83D\uDC99"],"\uE32A","\uDBBA\uDF13",["blue_heart"],20,8,15,0,"<3"],"1f49a":[["\uD83D\uDC9A"],"\uE32B","\uDBBA\uDF14",["green_heart"],20,9,15,0,"<3"],"1f49b":[["\uD83D\uDC9B"],"\uE32C","\uDBBA\uDF15",["yellow_heart"],20,10,15,0,"<3"],"1f49c":[["\uD83D\uDC9C"],"\uE32D","\uDBBA\uDF16",["purple_heart"],20,11,15,0,"<3"],"1f49d":[["\uD83D\uDC9D"],"\uE437","\uDBBA\uDF17",["gift_heart"],20,12,15,0],"1f49e":[["\uD83D\uDC9E"],"\uE327","\uDBBA\uDF18",["revolving_hearts"],20,13,15,0],"1f49f":[["\uD83D\uDC9F"],"\uE204","\uDBBA\uDF19",["heart_decoration"],20,14,15,0],"1f4a0":[["\uD83D\uDCA0"],"","\uDBBA\uDF55",["diamond_shape_with_a_dot_inside"],20,15,15,0],"1f4a1":[["\uD83D\uDCA1"],"\uE10F","\uDBBA\uDF56",["bulb"],20,16,15,0],"1f4a2":[["\uD83D\uDCA2"],"\uE334","\uDBBA\uDF57",["anger"],20,17,15,0],"1f4a3":[["\uD83D\uDCA3"],"\uE311","\uDBBA\uDF58",["bomb"],20,18,15,0],"1f4a4":[["\uD83D\uDCA4"],"\uE13C","\uDBBA\uDF59",["zzz"],20,19,15,0],"1f4a5":[["\uD83D\uDCA5"],"","\uDBBA\uDF5A",["boom","collision"],20,20,15,0],"1f4a6":[["\uD83D\uDCA6"],"\uE331","\uDBBA\uDF5B",["sweat_drops"],20,21,15,0],"1f4a7":[["\uD83D\uDCA7"],"\uE331","\uDBBA\uDF5C",["droplet"],20,22,15,0],"1f4a8":[["\uD83D\uDCA8"],"\uE330","\uDBBA\uDF5D",["dash"],20,23,15,0],"1f4a9":[["\uD83D\uDCA9"],"\uE05A","\uDBB9\uDCF4",["hankey","poop","shit"],20,24,15,0],"1f4aa":[["\uD83D\uDCAA"],"\uE14C","\uDBBA\uDF5E",["muscle"],20,25,15,0],"1f4ab":[["\uD83D\uDCAB"],"\uE407","\uDBBA\uDF5F",["dizzy"],20,31,15,0],"1f4ac":[["\uD83D\uDCAC"],"","\uDBB9\uDD32",["speech_balloon"],20,32,15,0],"1f4ad":[["\uD83D\uDCAD"],"","",["thought_balloon"],20,33,15,0],"1f4ae":[["\uD83D\uDCAE"],"","\uDBBA\uDF7A",["white_flower"],20,34,15,0],"1f4af":[["\uD83D\uDCAF"],"","\uDBBA\uDF7B",["100"],21,0,15,0],"1f4b0":[["\uD83D\uDCB0"],"\uE12F","\uDBB9\uDCDD",["moneybag"],21,1,15,0],"1f4b1":[["\uD83D\uDCB1"],"\uE149","\uDBB9\uDCDE",["currency_exchange"],21,2,15,0],"1f4b2":[["\uD83D\uDCB2"],"\uE12F","\uDBB9\uDCE0",["heavy_dollar_sign"],21,3,15,0],"1f4b3":[["\uD83D\uDCB3"],"","\uDBB9\uDCE1",["credit_card"],21,4,15,0],"1f4b4":[["\uD83D\uDCB4"],"","\uDBB9\uDCE2",["yen"],21,5,15,0],"1f4b5":[["\uD83D\uDCB5"],"\uE12F","\uDBB9\uDCE3",["dollar"],21,6,15,0],"1f4b6":[["\uD83D\uDCB6"],"","",["euro"],21,7,15,0],"1f4b7":[["\uD83D\uDCB7"],"","",["pound"],21,8,15,0],"1f4b8":[["\uD83D\uDCB8"],"","\uDBB9\uDCE4",["money_with_wings"],21,9,15,0],"1f4b9":[["\uD83D\uDCB9"],"\uE14A","\uDBB9\uDCDF",["chart"],21,10,15,0],"1f4ba":[["\uD83D\uDCBA"],"\uE11F","\uDBB9\uDD37",["seat"],21,11,15,0],"1f4bb":[["\uD83D\uDCBB"],"\uE00C","\uDBB9\uDD38",["computer"],21,12,15,0],"1f4bc":[["\uD83D\uDCBC"],"\uE11E","\uDBB9\uDD3B",["briefcase"],21,13,15,0],"1f4bd":[["\uD83D\uDCBD"],"\uE316","\uDBB9\uDD3C",["minidisc"],21,14,15,0],"1f4be":[["\uD83D\uDCBE"],"\uE316","\uDBB9\uDD3D",["floppy_disk"],21,15,15,0],"1f4bf":[["\uD83D\uDCBF"],"\uE126","\uDBBA\uDC1D",["cd"],21,16,15,0],"1f4c0":[["\uD83D\uDCC0"],"\uE127","\uDBBA\uDC1E",["dvd"],21,17,15,0],"1f4c1":[["\uD83D\uDCC1"],"","\uDBB9\uDD43",["file_folder"],21,18,15,0],"1f4c2":[["\uD83D\uDCC2"],"","\uDBB9\uDD44",["open_file_folder"],21,19,15,0],"1f4c3":[["\uD83D\uDCC3"],"\uE301","\uDBB9\uDD40",["page_with_curl"],21,20,15,0],"1f4c4":[["\uD83D\uDCC4"],"\uE301","\uDBB9\uDD41",["page_facing_up"],21,21,15,0],"1f4c5":[["\uD83D\uDCC5"],"","\uDBB9\uDD42",["date"],21,22,15,0],"1f4c6":[["\uD83D\uDCC6"],"","\uDBB9\uDD49",["calendar"],21,23,15,0],"1f4c7":[["\uD83D\uDCC7"],"\uE148","\uDBB9\uDD4D",["card_index"],21,24,15,0],"1f4c8":[["\uD83D\uDCC8"],"\uE14A","\uDBB9\uDD4B",["chart_with_upwards_trend"],21,25,15,0],"1f4c9":[["\uD83D\uDCC9"],"","\uDBB9\uDD4C",["chart_with_downwards_trend"],21,26,15,0],"1f4ca":[["\uD83D\uDCCA"],"\uE14A","\uDBB9\uDD4A",["bar_chart"],21,27,15,0],"1f4cb":[["\uD83D\uDCCB"],"\uE301","\uDBB9\uDD48",["clipboard"],21,28,15,0],"1f4cc":[["\uD83D\uDCCC"],"","\uDBB9\uDD4E",["pushpin"],21,29,15,0],"1f4cd":[["\uD83D\uDCCD"],"","\uDBB9\uDD3F",["round_pushpin"],21,30,15,0],"1f4ce":[["\uD83D\uDCCE"],"","\uDBB9\uDD3A",["paperclip"],21,31,15,0],"1f4cf":[["\uD83D\uDCCF"],"","\uDBB9\uDD50",["straight_ruler"],21,32,15,0],"1f4d0":[["\uD83D\uDCD0"],"","\uDBB9\uDD51",["triangular_ruler"],21,33,15,0],"1f4d1":[["\uD83D\uDCD1"],"\uE301","\uDBB9\uDD52",["bookmark_tabs"],21,34,15,0],"1f4d2":[["\uD83D\uDCD2"],"\uE148","\uDBB9\uDD4F",["ledger"],22,0,15,0],"1f4d3":[["\uD83D\uDCD3"],"\uE148","\uDBB9\uDD45",["notebook"],22,1,15,0],"1f4d4":[["\uD83D\uDCD4"],"\uE148","\uDBB9\uDD47",["notebook_with_decorative_cover"],22,2,15,0],"1f4d5":[["\uD83D\uDCD5"],"\uE148","\uDBB9\uDD02",["closed_book"],22,3,15,0],"1f4d6":[["\uD83D\uDCD6"],"\uE148","\uDBB9\uDD46",["book","open_book"],22,4,15,0],"1f4d7":[["\uD83D\uDCD7"],"\uE148","\uDBB9\uDCFF",["green_book"],22,5,15,0],"1f4d8":[["\uD83D\uDCD8"],"\uE148","\uDBB9\uDD00",["blue_book"],22,6,15,0],"1f4d9":[["\uD83D\uDCD9"],"\uE148","\uDBB9\uDD01",["orange_book"],22,7,15,0],"1f4da":[["\uD83D\uDCDA"],"\uE148","\uDBB9\uDD03",["books"],22,8,15,0],"1f4db":[["\uD83D\uDCDB"],"","\uDBB9\uDD04",["name_badge"],22,9,15,0],"1f4dc":[["\uD83D\uDCDC"],"","\uDBB9\uDCFD",["scroll"],22,10,15,0],"1f4dd":[["\uD83D\uDCDD"],"\uE301","\uDBB9\uDD27",["memo","pencil"],22,11,15,0],"1f4de":[["\uD83D\uDCDE"],"\uE009","\uDBB9\uDD24",["telephone_receiver"],22,12,15,0],"1f4df":[["\uD83D\uDCDF"],"","\uDBB9\uDD22",["pager"],22,13,15,0],"1f4e0":[["\uD83D\uDCE0"],"\uE00B","\uDBB9\uDD28",["fax"],22,14,15,0],"1f4e1":[["\uD83D\uDCE1"],"\uE14B","\uDBB9\uDD31",["satellite"],22,15,15,0],"1f4e2":[["\uD83D\uDCE2"],"\uE142","\uDBB9\uDD2F",["loudspeaker"],22,16,15,0],"1f4e3":[["\uD83D\uDCE3"],"\uE317","\uDBB9\uDD30",["mega"],22,17,15,0],"1f4e4":[["\uD83D\uDCE4"],"","\uDBB9\uDD33",["outbox_tray"],22,18,15,0],"1f4e5":[["\uD83D\uDCE5"],"","\uDBB9\uDD34",["inbox_tray"],22,19,15,0],"1f4e6":[["\uD83D\uDCE6"],"\uE112","\uDBB9\uDD35",["package"],22,20,15,0],"1f4e7":[["\uD83D\uDCE7"],"\uE103","\uDBBA\uDF92",["e-mail"],22,21,15,0],"1f4e8":[["\uD83D\uDCE8"],"\uE103","\uDBB9\uDD2A",["incoming_envelope"],22,22,15,0],"1f4e9":[["\uD83D\uDCE9"],"\uE103","\uDBB9\uDD2B",["envelope_with_arrow"],22,23,15,0],"1f4ea":[["\uD83D\uDCEA"],"\uE101","\uDBB9\uDD2C",["mailbox_closed"],22,24,15,0],"1f4eb":[["\uD83D\uDCEB"],"\uE101","\uDBB9\uDD2D",["mailbox"],22,25,15,0],"1f4ec":[["\uD83D\uDCEC"],"","",["mailbox_with_mail"],22,26,15,0],"1f4ed":[["\uD83D\uDCED"],"","",["mailbox_with_no_mail"],22,27,15,0],"1f4ee":[["\uD83D\uDCEE"],"\uE102","\uDBB9\uDD2E",["postbox"],22,28,15,0],"1f4ef":[["\uD83D\uDCEF"],"","",["postal_horn"],22,29,15,0],"1f4f0":[["\uD83D\uDCF0"],"","\uDBBA\uDC22",["newspaper"],22,30,15,0],"1f4f1":[["\uD83D\uDCF1"],"\uE00A","\uDBB9\uDD25",["iphone"],22,31,15,0],"1f4f2":[["\uD83D\uDCF2"],"\uE104","\uDBB9\uDD26",["calling"],22,32,15,0],"1f4f3":[["\uD83D\uDCF3"],"\uE250","\uDBBA\uDC39",["vibration_mode"],22,33,15,0],"1f4f4":[["\uD83D\uDCF4"],"\uE251","\uDBBA\uDC3A",["mobile_phone_off"],22,34,15,0],"1f4f5":[["\uD83D\uDCF5"],"","",["no_mobile_phones"],23,0,15,0],"1f4f6":[["\uD83D\uDCF6"],"\uE20B","\uDBBA\uDC38",["signal_strength"],23,1,15,0],"1f4f7":[["\uD83D\uDCF7"],"\uE008","\uDBB9\uDCEF",["camera"],23,2,15,0],"1f4f9":[["\uD83D\uDCF9"],"\uE03D","\uDBB9\uDCF9",["video_camera"],23,3,15,0],"1f4fa":[["\uD83D\uDCFA"],"\uE12A","\uDBBA\uDC1C",["tv"],23,4,15,0],"1f4fb":[["\uD83D\uDCFB"],"\uE128","\uDBBA\uDC1F",["radio"],23,5,15,0],"1f4fc":[["\uD83D\uDCFC"],"\uE129","\uDBBA\uDC20",["vhs"],23,6,15,0],"1f500":[["\uD83D\uDD00"],"","",["twisted_rightwards_arrows"],23,7,15,0],"1f501":[["\uD83D\uDD01"],"","",["repeat"],23,8,15,0],"1f502":[["\uD83D\uDD02"],"","",["repeat_one"],23,9,15,0],"1f503":[["\uD83D\uDD03"],"","\uDBBA\uDF91",["arrows_clockwise"],23,10,15,0],"1f504":[["\uD83D\uDD04"],"","",["arrows_counterclockwise"],23,11,15,0],"1f505":[["\uD83D\uDD05"],"","",["low_brightness"],23,12,15,0],"1f506":[["\uD83D\uDD06"],"","",["high_brightness"],23,13,15,0],"1f507":[["\uD83D\uDD07"],"","",["mute"],23,14,15,0],"1f508":[["\uD83D\uDD08"],"","",["speaker"],23,15,15,0],"1f509":[["\uD83D\uDD09"],"","",["sound"],23,16,15,0],"1f50a":[["\uD83D\uDD0A"],"\uE141","\uDBBA\uDC21",["loud_sound"],23,17,15,0],"1f50b":[["\uD83D\uDD0B"],"","\uDBB9\uDCFC",["battery"],23,18,15,0],"1f50c":[["\uD83D\uDD0C"],"","\uDBB9\uDCFE",["electric_plug"],23,19,15,0],"1f50d":[["\uD83D\uDD0D"],"\uE114","\uDBBA\uDF85",["mag"],23,20,15,0],"1f50e":[["\uD83D\uDD0E"],"\uE114","\uDBBA\uDF8D",["mag_right"],23,21,15,0],"1f50f":[["\uD83D\uDD0F"],"\uE144","\uDBBA\uDF90",["lock_with_ink_pen"],23,22,15,0],"1f510":[["\uD83D\uDD10"],"\uE144","\uDBBA\uDF8A",["closed_lock_with_key"],23,23,15,0],"1f511":[["\uD83D\uDD11"],"\uE03F","\uDBBA\uDF82",["key"],23,24,15,0],"1f512":[["\uD83D\uDD12"],"\uE144","\uDBBA\uDF86",["lock"],23,25,15,0],"1f513":[["\uD83D\uDD13"],"\uE145","\uDBBA\uDF87",["unlock"],23,26,15,0],"1f514":[["\uD83D\uDD14"],"\uE325","\uDBB9\uDCF2",["bell"],23,27,15,0],"1f515":[["\uD83D\uDD15"],"","",["no_bell"],23,28,15,0],"1f516":[["\uD83D\uDD16"],"","\uDBBA\uDF8F",["bookmark"],23,29,15,0],"1f517":[["\uD83D\uDD17"],"","\uDBBA\uDF4B",["link"],23,30,15,0],"1f518":[["\uD83D\uDD18"],"","\uDBBA\uDF8C",["radio_button"],23,31,15,0],"1f519":[["\uD83D\uDD19"],"\uE235","\uDBBA\uDF8E",["back"],23,32,15,0],"1f51a":[["\uD83D\uDD1A"],"","\uDBB8\uDC1A",["end"],23,33,15,0],"1f51b":[["\uD83D\uDD1B"],"","\uDBB8\uDC19",["on"],23,34,15,0],"1f51c":[["\uD83D\uDD1C"],"","\uDBB8\uDC18",["soon"],24,0,15,0],"1f51d":[["\uD83D\uDD1D"],"\uE24C","\uDBBA\uDF42",["top"],24,1,15,0],"1f51e":[["\uD83D\uDD1E"],"\uE207","\uDBBA\uDF25",["underage"],24,2,15,0],"1f51f":[["\uD83D\uDD1F"],"","\uDBBA\uDC3B",["keycap_ten"],24,3,15,0],"1f520":[["\uD83D\uDD20"],"","\uDBBA\uDF7C",["capital_abcd"],24,4,15,0],"1f521":[["\uD83D\uDD21"],"","\uDBBA\uDF7D",["abcd"],24,5,15,0],"1f522":[["\uD83D\uDD22"],"","\uDBBA\uDF7E",["1234"],24,6,15,0],"1f523":[["\uD83D\uDD23"],"","\uDBBA\uDF7F",["symbols"],24,7,15,0],"1f524":[["\uD83D\uDD24"],"","\uDBBA\uDF80",["abc"],24,8,15,0],"1f525":[["\uD83D\uDD25"],"\uE11D","\uDBB9\uDCF6",["fire"],24,9,15,0],"1f526":[["\uD83D\uDD26"],"","\uDBB9\uDCFB",["flashlight"],24,10,15,0],"1f527":[["\uD83D\uDD27"],"","\uDBB9\uDCC9",["wrench"],24,11,15,0],"1f528":[["\uD83D\uDD28"],"\uE116","\uDBB9\uDCCA",["hammer"],24,12,15,0],"1f529":[["\uD83D\uDD29"],"","\uDBB9\uDCCB",["nut_and_bolt"],24,13,15,0],"1f52a":[["\uD83D\uDD2A"],"","\uDBB9\uDCFA",["hocho","knife"],24,14,15,0],"1f52b":[["\uD83D\uDD2B"],"\uE113","\uDBB9\uDCF5",["gun"],24,15,15,0],"1f52c":[["\uD83D\uDD2C"],"","",["microscope"],24,16,15,0],"1f52d":[["\uD83D\uDD2D"],"","",["telescope"],24,17,15,0],"1f52e":[["\uD83D\uDD2E"],"\uE23E","\uDBB9\uDCF7",["crystal_ball"],24,18,15,0],"1f52f":[["\uD83D\uDD2F"],"\uE23E","\uDBB9\uDCF8",["six_pointed_star"],24,19,15,0],"1f530":[["\uD83D\uDD30"],"\uE209","\uDBB8\uDC44",["beginner"],24,20,15,0],"1f531":[["\uD83D\uDD31"],"\uE031","\uDBB9\uDCD2",["trident"],24,21,15,0],"1f532":[["\uD83D\uDD32"],"\uE21A","\uDBBA\uDF64",["black_square_button"],24,22,15,0],"1f533":[["\uD83D\uDD33"],"\uE21B","\uDBBA\uDF67",["white_square_button"],24,23,15,0],"1f534":[["\uD83D\uDD34"],"\uE219","\uDBBA\uDF63",["red_circle"],24,24,15,0],"1f535":[["\uD83D\uDD35"],"\uE21A","\uDBBA\uDF64",["large_blue_circle"],24,25,15,0],"1f536":[["\uD83D\uDD36"],"\uE21B","\uDBBA\uDF73",["large_orange_diamond"],24,26,15,0],"1f537":[["\uD83D\uDD37"],"\uE21B","\uDBBA\uDF74",["large_blue_diamond"],24,27,15,0],"1f538":[["\uD83D\uDD38"],"\uE21B","\uDBBA\uDF75",["small_orange_diamond"],24,28,15,0],"1f539":[["\uD83D\uDD39"],"\uE21B","\uDBBA\uDF76",["small_blue_diamond"],24,29,15,0],"1f53a":[["\uD83D\uDD3A"],"","\uDBBA\uDF78",["small_red_triangle"],24,30,15,0],"1f53b":[["\uD83D\uDD3B"],"","\uDBBA\uDF79",["small_red_triangle_down"],24,31,15,0],"1f53c":[["\uD83D\uDD3C"],"","\uDBBA\uDF01",["arrow_up_small"],24,32,15,0],"1f53d":[["\uD83D\uDD3D"],"","\uDBBA\uDF00",["arrow_down_small"],24,33,15,0],"1f550":[["\uD83D\uDD50"],"\uE024","\uDBB8\uDC1E",["clock1"],24,34,15,0],"1f551":[["\uD83D\uDD51"],"\uE025","\uDBB8\uDC1F",["clock2"],25,0,15,0],"1f552":[["\uD83D\uDD52"],"\uE026","\uDBB8\uDC20",["clock3"],25,1,15,0],"1f553":[["\uD83D\uDD53"],"\uE027","\uDBB8\uDC21",["clock4"],25,2,15,0],"1f554":[["\uD83D\uDD54"],"\uE028","\uDBB8\uDC22",["clock5"],25,3,15,0],"1f555":[["\uD83D\uDD55"],"\uE029","\uDBB8\uDC23",["clock6"],25,4,15,0],"1f556":[["\uD83D\uDD56"],"\uE02A","\uDBB8\uDC24",["clock7"],25,5,15,0],"1f557":[["\uD83D\uDD57"],"\uE02B","\uDBB8\uDC25",["clock8"],25,6,15,0],"1f558":[["\uD83D\uDD58"],"\uE02C","\uDBB8\uDC26",["clock9"],25,7,15,0],"1f559":[["\uD83D\uDD59"],"\uE02D","\uDBB8\uDC27",["clock10"],25,8,15,0],"1f55a":[["\uD83D\uDD5A"],"\uE02E","\uDBB8\uDC28",["clock11"],25,9,15,0],"1f55b":[["\uD83D\uDD5B"],"\uE02F","\uDBB8\uDC29",["clock12"],25,10,15,0],"1f55c":[["\uD83D\uDD5C"],"","",["clock130"],25,11,15,0],"1f55d":[["\uD83D\uDD5D"],"","",["clock230"],25,12,15,0],"1f55e":[["\uD83D\uDD5E"],"","",["clock330"],25,13,15,0],"1f55f":[["\uD83D\uDD5F"],"","",["clock430"],25,14,15,0],"1f560":[["\uD83D\uDD60"],"","",["clock530"],25,15,15,0],"1f561":[["\uD83D\uDD61"],"","",["clock630"],25,16,15,0],"1f562":[["\uD83D\uDD62"],"","",["clock730"],25,17,15,0],"1f563":[["\uD83D\uDD63"],"","",["clock830"],25,18,15,0],"1f564":[["\uD83D\uDD64"],"","",["clock930"],25,19,15,0],"1f565":[["\uD83D\uDD65"],"","",["clock1030"],25,20,15,0],"1f566":[["\uD83D\uDD66"],"","",["clock1130"],25,21,15,0],"1f567":[["\uD83D\uDD67"],"","",["clock1230"],25,22,15,0],"1f5fb":[["\uD83D\uDDFB"],"\uE03B","\uDBB9\uDCC3",["mount_fuji"],25,23,15,0],"1f5fc":[["\uD83D\uDDFC"],"\uE509","\uDBB9\uDCC4",["tokyo_tower"],25,24,15,0],"1f5fd":[["\uD83D\uDDFD"],"\uE51D","\uDBB9\uDCC6",["statue_of_liberty"],25,25,15,0],"1f5fe":[["\uD83D\uDDFE"],"","\uDBB9\uDCC7",["japan"],25,26,15,0],"1f5ff":[["\uD83D\uDDFF"],"","\uDBB9\uDCC8",["moyai"],25,27,15,0],"1f600":[["\uD83D\uDE00"],"","",["grinning"],25,28,15,0,":D"],"1f601":[["\uD83D\uDE01"],"\uE404","\uDBB8\uDF33",["grin"],25,29,15,0],"1f602":[["\uD83D\uDE02"],"\uE412","\uDBB8\uDF34",["joy"],25,30,15,0],"1f603":[["\uD83D\uDE03"],"\uE057","\uDBB8\uDF30",["smiley"],25,31,15,0,":)"],"1f604":[["\uD83D\uDE04"],"\uE415","\uDBB8\uDF38",["smile"],25,32,15,0,":)"],"1f605":[["\uD83D\uDE05"],"\uE415\uE331","\uDBB8\uDF31",["sweat_smile"],25,33,15,0],"1f606":[["\uD83D\uDE06"],"\uE40A","\uDBB8\uDF32",["laughing","satisfied"],25,34,15,0],"1f607":[["\uD83D\uDE07"],"","",["innocent"],26,0,15,0],"1f608":[["\uD83D\uDE08"],"","",["smiling_imp"],26,1,15,0],"1f609":[["\uD83D\uDE09"],"\uE405","\uDBB8\uDF47",["wink"],26,2,15,0,";)"],"1f60a":[["\uD83D\uDE0A"],"\uE056","\uDBB8\uDF35",["blush"],26,3,15,0,":)"],"1f60b":[["\uD83D\uDE0B"],"\uE056","\uDBB8\uDF2B",["yum"],26,4,15,0],"1f60c":[["\uD83D\uDE0C"],"\uE40A","\uDBB8\uDF3E",["relieved"],26,5,15,0],"1f60d":[["\uD83D\uDE0D"],"\uE106","\uDBB8\uDF27",["heart_eyes"],26,6,15,0],"1f60e":[["\uD83D\uDE0E"],"","",["sunglasses"],26,7,15,0],"1f60f":[["\uD83D\uDE0F"],"\uE402","\uDBB8\uDF43",["smirk"],26,8,15,0],"1f610":[["\uD83D\uDE10"],"","",["neutral_face"],26,9,15,0],"1f611":[["\uD83D\uDE11"],"","",["expressionless"],26,10,15,0],"1f612":[["\uD83D\uDE12"],"\uE40E","\uDBB8\uDF26",["unamused"],26,11,15,0,":("],"1f613":[["\uD83D\uDE13"],"\uE108","\uDBB8\uDF44",["sweat"],26,12,15,0],"1f614":[["\uD83D\uDE14"],"\uE403","\uDBB8\uDF40",["pensive"],26,13,15,0],"1f615":[["\uD83D\uDE15"],"","",["confused"],26,14,15,0],"1f616":[["\uD83D\uDE16"],"\uE407","\uDBB8\uDF3F",["confounded"],26,15,15,0],"1f617":[["\uD83D\uDE17"],"","",["kissing"],26,16,15,0],"1f618":[["\uD83D\uDE18"],"\uE418","\uDBB8\uDF2C",["kissing_heart"],26,17,15,0],"1f619":[["\uD83D\uDE19"],"","",["kissing_smiling_eyes"],26,18,15,0],"1f61a":[["\uD83D\uDE1A"],"\uE417","\uDBB8\uDF2D",["kissing_closed_eyes"],26,19,15,0],"1f61b":[["\uD83D\uDE1B"],"","",["stuck_out_tongue"],26,20,15,0,":p"],"1f61c":[["\uD83D\uDE1C"],"\uE105","\uDBB8\uDF29",["stuck_out_tongue_winking_eye"],26,21,15,0,";p"],"1f61d":[["\uD83D\uDE1D"],"\uE409","\uDBB8\uDF2A",["stuck_out_tongue_closed_eyes"],26,22,15,0],"1f61e":[["\uD83D\uDE1E"],"\uE058","\uDBB8\uDF23",["disappointed"],26,23,15,0,":("],"1f61f":[["\uD83D\uDE1F"],"","",["worried"],26,24,15,0],"1f620":[["\uD83D\uDE20"],"\uE059","\uDBB8\uDF20",["angry"],26,25,15,0],"1f621":[["\uD83D\uDE21"],"\uE416","\uDBB8\uDF3D",["rage"],26,26,15,0],"1f622":[["\uD83D\uDE22"],"\uE413","\uDBB8\uDF39",["cry"],26,27,15,0,":'("],"1f623":[["\uD83D\uDE23"],"\uE406","\uDBB8\uDF3C",["persevere"],26,28,15,0],"1f624":[["\uD83D\uDE24"],"\uE404","\uDBB8\uDF28",["triumph"],26,29,15,0],"1f625":[["\uD83D\uDE25"],"\uE401","\uDBB8\uDF45",["disappointed_relieved"],26,30,15,0],"1f626":[["\uD83D\uDE26"],"","",["frowning"],26,31,15,0],"1f627":[["\uD83D\uDE27"],"","",["anguished"],26,32,15,0],"1f628":[["\uD83D\uDE28"],"\uE40B","\uDBB8\uDF3B",["fearful"],26,33,15,0],"1f629":[["\uD83D\uDE29"],"\uE403","\uDBB8\uDF21",["weary"],26,34,15,0],"1f62a":[["\uD83D\uDE2A"],"\uE408","\uDBB8\uDF42",["sleepy"],27,0,15,0],"1f62b":[["\uD83D\uDE2B"],"\uE406","\uDBB8\uDF46",["tired_face"],27,1,15,0],"1f62c":[["\uD83D\uDE2C"],"","",["grimacing"],27,2,15,0],"1f62d":[["\uD83D\uDE2D"],"\uE411","\uDBB8\uDF3A",["sob"],27,3,15,0,":'("],"1f62e":[["\uD83D\uDE2E"],"","",["open_mouth"],27,4,15,0],"1f62f":[["\uD83D\uDE2F"],"","",["hushed"],27,5,15,0],"1f630":[["\uD83D\uDE30"],"\uE40F","\uDBB8\uDF25",["cold_sweat"],27,6,15,0],"1f631":[["\uD83D\uDE31"],"\uE107","\uDBB8\uDF41",["scream"],27,7,15,0],"1f632":[["\uD83D\uDE32"],"\uE410","\uDBB8\uDF22",["astonished"],27,8,15,0],"1f633":[["\uD83D\uDE33"],"\uE40D","\uDBB8\uDF2F",["flushed"],27,9,15,0],"1f634":[["\uD83D\uDE34"],"","",["sleeping"],27,10,15,0],"1f635":[["\uD83D\uDE35"],"\uE406","\uDBB8\uDF24",["dizzy_face"],27,11,15,0],"1f636":[["\uD83D\uDE36"],"","",["no_mouth"],27,12,15,0],"1f637":[["\uD83D\uDE37"],"\uE40C","\uDBB8\uDF2E",["mask"],27,13,15,0],"1f638":[["\uD83D\uDE38"],"\uE404","\uDBB8\uDF49",["smile_cat"],27,14,15,0],"1f639":[["\uD83D\uDE39"],"\uE412","\uDBB8\uDF4A",["joy_cat"],27,15,15,0],"1f63a":[["\uD83D\uDE3A"],"\uE057","\uDBB8\uDF48",["smiley_cat"],27,16,15,0],"1f63b":[["\uD83D\uDE3B"],"\uE106","\uDBB8\uDF4C",["heart_eyes_cat"],27,17,15,0],"1f63c":[["\uD83D\uDE3C"],"\uE404","\uDBB8\uDF4F",["smirk_cat"],27,18,15,0],"1f63d":[["\uD83D\uDE3D"],"\uE418","\uDBB8\uDF4B",["kissing_cat"],27,19,15,0],"1f63e":[["\uD83D\uDE3E"],"\uE416","\uDBB8\uDF4E",["pouting_cat"],27,20,15,0],"1f63f":[["\uD83D\uDE3F"],"\uE413","\uDBB8\uDF4D",["crying_cat_face"],27,21,15,0],"1f640":[["\uD83D\uDE40"],"\uE403","\uDBB8\uDF50",["scream_cat"],27,22,15,0],"1f645":[["\uD83D\uDE45"],"\uE423","\uDBB8\uDF51",["no_good"],27,23,15,0],"1f646":[["\uD83D\uDE46"],"\uE424","\uDBB8\uDF52",["ok_woman"],27,29,15,0],"1f647":[["\uD83D\uDE47"],"\uE426","\uDBB8\uDF53",["bow"],28,0,15,0],"1f648":[["\uD83D\uDE48"],"","\uDBB8\uDF54",["see_no_evil"],28,6,15,0],"1f649":[["\uD83D\uDE49"],"","\uDBB8\uDF56",["hear_no_evil"],28,7,15,0],"1f64a":[["\uD83D\uDE4A"],"","\uDBB8\uDF55",["speak_no_evil"],28,8,15,0],"1f64b":[["\uD83D\uDE4B"],"\uE012","\uDBB8\uDF57",["raising_hand"],28,9,15,0],"1f64c":[["\uD83D\uDE4C"],"\uE427","\uDBB8\uDF58",["raised_hands"],28,15,15,0],"1f64d":[["\uD83D\uDE4D"],"\uE403","\uDBB8\uDF59",["person_frowning"],28,21,15,0],"1f64e":[["\uD83D\uDE4E"],"\uE416","\uDBB8\uDF5A",["person_with_pouting_face"],28,27,15,0],"1f64f":[["\uD83D\uDE4F"],"\uE41D","\uDBB8\uDF5B",["pray"],28,33,15,0],"1f680":[["\uD83D\uDE80"],"\uE10D","\uDBB9\uDFED",["rocket"],29,4,15,0],"1f681":[["\uD83D\uDE81"],"","",["helicopter"],29,5,15,0],"1f682":[["\uD83D\uDE82"],"","",["steam_locomotive"],29,6,15,0],"1f683":[["\uD83D\uDE83"],"\uE01E","\uDBB9\uDFDF",["railway_car"],29,7,15,0],"1f684":[["\uD83D\uDE84"],"\uE435","\uDBB9\uDFE2",["bullettrain_side"],29,8,15,0],"1f685":[["\uD83D\uDE85"],"\uE01F","\uDBB9\uDFE3",["bullettrain_front"],29,9,15,0],"1f686":[["\uD83D\uDE86"],"","",["train2"],29,10,15,0],"1f687":[["\uD83D\uDE87"],"\uE434","\uDBB9\uDFE0",["metro"],29,11,15,0],"1f688":[["\uD83D\uDE88"],"","",["light_rail"],29,12,15,0],"1f689":[["\uD83D\uDE89"],"\uE039","\uDBB9\uDFEC",["station"],29,13,15,0],"1f68a":[["\uD83D\uDE8A"],"","",["tram"],29,14,15,0],"1f68b":[["\uD83D\uDE8B"],"","",["train"],29,15,15,0],"1f68c":[["\uD83D\uDE8C"],"\uE159","\uDBB9\uDFE6",["bus"],29,16,15,0],"1f68d":[["\uD83D\uDE8D"],"","",["oncoming_bus"],29,17,15,0],"1f68e":[["\uD83D\uDE8E"],"","",["trolleybus"],29,18,15,0],"1f68f":[["\uD83D\uDE8F"],"\uE150","\uDBB9\uDFE7",["busstop"],29,19,15,0],"1f690":[["\uD83D\uDE90"],"","",["minibus"],29,20,15,0],"1f691":[["\uD83D\uDE91"],"\uE431","\uDBB9\uDFF3",["ambulance"],29,21,15,0],"1f692":[["\uD83D\uDE92"],"\uE430","\uDBB9\uDFF2",["fire_engine"],29,22,15,0],"1f693":[["\uD83D\uDE93"],"\uE432","\uDBB9\uDFF4",["police_car"],29,23,15,0],"1f694":[["\uD83D\uDE94"],"","",["oncoming_police_car"],29,24,15,0],"1f695":[["\uD83D\uDE95"],"\uE15A","\uDBB9\uDFEF",["taxi"],29,25,15,0],"1f696":[["\uD83D\uDE96"],"","",["oncoming_taxi"],29,26,15,0],"1f697":[["\uD83D\uDE97"],"\uE01B","\uDBB9\uDFE4",["car","red_car"],29,27,15,0],"1f698":[["\uD83D\uDE98"],"","",["oncoming_automobile"],29,28,15,0],"1f699":[["\uD83D\uDE99"],"\uE42E","\uDBB9\uDFE5",["blue_car"],29,29,15,0],"1f69a":[["\uD83D\uDE9A"],"\uE42F","\uDBB9\uDFF1",["truck"],29,30,15,0],"1f69b":[["\uD83D\uDE9B"],"","",["articulated_lorry"],29,31,15,0],"1f69c":[["\uD83D\uDE9C"],"","",["tractor"],29,32,15,0],"1f69d":[["\uD83D\uDE9D"],"","",["monorail"],29,33,15,0],"1f69e":[["\uD83D\uDE9E"],"","",["mountain_railway"],29,34,15,0],"1f69f":[["\uD83D\uDE9F"],"","",["suspension_railway"],30,0,15,0],"1f6a0":[["\uD83D\uDEA0"],"","",["mountain_cableway"],30,1,15,0],"1f6a1":[["\uD83D\uDEA1"],"","",["aerial_tramway"],30,2,15,0],"1f6a2":[["\uD83D\uDEA2"],"\uE202","\uDBB9\uDFE8",["ship"],30,3,15,0],"1f6a3":[["\uD83D\uDEA3"],"","",["rowboat"],30,4,15,0],"1f6a4":[["\uD83D\uDEA4"],"\uE135","\uDBB9\uDFEE",["speedboat"],30,10,15,0],"1f6a5":[["\uD83D\uDEA5"],"\uE14E","\uDBB9\uDFF7",["traffic_light"],30,11,15,0],"1f6a6":[["\uD83D\uDEA6"],"","",["vertical_traffic_light"],30,12,15,0],"1f6a7":[["\uD83D\uDEA7"],"\uE137","\uDBB9\uDFF8",["construction"],30,13,15,0],"1f6a8":[["\uD83D\uDEA8"],"\uE432","\uDBB9\uDFF9",["rotating_light"],30,14,15,0],"1f6a9":[["\uD83D\uDEA9"],"","\uDBBA\uDF22",["triangular_flag_on_post"],30,15,15,0],"1f6aa":[["\uD83D\uDEAA"],"","\uDBB9\uDCF3",["door"],30,16,15,0],"1f6ab":[["\uD83D\uDEAB"],"","\uDBBA\uDF48",["no_entry_sign"],30,17,15,0],"1f6ac":[["\uD83D\uDEAC"],"\uE30E","\uDBBA\uDF1E",["smoking"],30,18,15,0],"1f6ad":[["\uD83D\uDEAD"],"\uE208","\uDBBA\uDF1F",["no_smoking"],30,19,15,0],"1f6ae":[["\uD83D\uDEAE"],"","",["put_litter_in_its_place"],30,20,15,0],"1f6af":[["\uD83D\uDEAF"],"","",["do_not_litter"],30,21,15,0],"1f6b0":[["\uD83D\uDEB0"],"","",["potable_water"],30,22,15,0],"1f6b1":[["\uD83D\uDEB1"],"","",["non-potable_water"],30,23,15,0],"1f6b2":[["\uD83D\uDEB2"],"\uE136","\uDBB9\uDFEB",["bike"],30,24,15,0],"1f6b3":[["\uD83D\uDEB3"],"","",["no_bicycles"],30,25,15,0],"1f6b4":[["\uD83D\uDEB4"],"","",["bicyclist"],30,26,15,0],"1f6b5":[["\uD83D\uDEB5"],"","",["mountain_bicyclist"],30,32,15,0],"1f6b6":[["\uD83D\uDEB6"],"\uE201","\uDBB9\uDFF0",["walking"],31,3,15,0],"1f6b7":[["\uD83D\uDEB7"],"","",["no_pedestrians"],31,9,15,0],"1f6b8":[["\uD83D\uDEB8"],"","",["children_crossing"],31,10,15,0],"1f6b9":[["\uD83D\uDEB9"],"\uE138","\uDBBA\uDF33",["mens"],31,11,15,0],"1f6ba":[["\uD83D\uDEBA"],"\uE139","\uDBBA\uDF34",["womens"],31,12,15,0],"1f6bb":[["\uD83D\uDEBB"],"\uE151","\uDBB9\uDD06",["restroom"],31,13,15,0],"1f6bc":[["\uD83D\uDEBC"],"\uE13A","\uDBBA\uDF35",["baby_symbol"],31,14,15,0],"1f6bd":[["\uD83D\uDEBD"],"\uE140","\uDBB9\uDD07",["toilet"],31,15,15,0],"1f6be":[["\uD83D\uDEBE"],"\uE309","\uDBB9\uDD08",["wc"],31,16,15,0],"1f6bf":[["\uD83D\uDEBF"],"","",["shower"],31,17,15,0],"1f6c0":[["\uD83D\uDEC0"],"\uE13F","\uDBB9\uDD05",["bath"],31,18,15,0],"1f6c1":[["\uD83D\uDEC1"],"","",["bathtub"],31,24,15,0],"1f6c2":[["\uD83D\uDEC2"],"","",["passport_control"],31,25,15,0],"1f6c3":[["\uD83D\uDEC3"],"","",["customs"],31,26,15,0],"1f6c4":[["\uD83D\uDEC4"],"","",["baggage_claim"],31,27,15,0],"1f6c5":[["\uD83D\uDEC5"],"","",["left_luggage"],31,28,15,0],"0023-20e3":[["\u0023\uFE0F\u20E3","\u0023\u20E3"],"\uE210","\uDBBA\uDC2C",["hash"],31,29,15,0],"0030-20e3":[["\u0030\uFE0F\u20E3","\u0030\u20E3"],"\uE225","\uDBBA\uDC37",["zero"],31,30,15,0],"0031-20e3":[["\u0031\uFE0F\u20E3","\u0031\u20E3"],"\uE21C","\uDBBA\uDC2E",["one"],31,31,15,0],"0032-20e3":[["\u0032\uFE0F\u20E3","\u0032\u20E3"],"\uE21D","\uDBBA\uDC2F",["two"],31,32,15,0],"0033-20e3":[["\u0033\uFE0F\u20E3","\u0033\u20E3"],"\uE21E","\uDBBA\uDC30",["three"],31,33,15,0],"0034-20e3":[["\u0034\uFE0F\u20E3","\u0034\u20E3"],"\uE21F","\uDBBA\uDC31",["four"],31,34,15,0],"0035-20e3":[["\u0035\uFE0F\u20E3","\u0035\u20E3"],"\uE220","\uDBBA\uDC32",["five"],32,0,15,0],"0036-20e3":[["\u0036\uFE0F\u20E3","\u0036\u20E3"],"\uE221","\uDBBA\uDC33",["six"],32,1,15,0],"0037-20e3":[["\u0037\uFE0F\u20E3","\u0037\u20E3"],"\uE222","\uDBBA\uDC34",["seven"],32,2,15,0],"0038-20e3":[["\u0038\uFE0F\u20E3","\u0038\u20E3"],"\uE223","\uDBBA\uDC35",["eight"],32,3,15,0],"0039-20e3":[["\u0039\uFE0F\u20E3","\u0039\u20E3"],"\uE224","\uDBBA\uDC36",["nine"],32,4,15,0],"1f1e6-1f1ea":[["\uD83C\uDDE6\uD83C\uDDEA"],"","",["flag-ae"],32,5,11,0],"1f1e6-1f1f9":[["\uD83C\uDDE6\uD83C\uDDF9"],"","",["flag-at"],32,6,11,0],"1f1e6-1f1fa":[["\uD83C\uDDE6\uD83C\uDDFA"],"","",["flag-au"],32,7,11,0],"1f1e7-1f1ea":[["\uD83C\uDDE7\uD83C\uDDEA"],"","",["flag-be"],32,8,11,0],"1f1e7-1f1f7":[["\uD83C\uDDE7\uD83C\uDDF7"],"","",["flag-br"],32,9,11,0],"1f1e8-1f1e6":[["\uD83C\uDDE8\uD83C\uDDE6"],"","",["flag-ca"],32,10,11,0],"1f1e8-1f1ed":[["\uD83C\uDDE8\uD83C\uDDED"],"","",["flag-ch"],32,11,11,0],"1f1e8-1f1f1":[["\uD83C\uDDE8\uD83C\uDDF1"],"","",["flag-cl"],32,12,11,0],"1f1e8-1f1f3":[["\uD83C\uDDE8\uD83C\uDDF3"],"\uE513","\uDBB9\uDCED",["flag-cn","cn"],32,13,15,0],"1f1e8-1f1f4":[["\uD83C\uDDE8\uD83C\uDDF4"],"","",["flag-co"],32,14,11,0],"1f1e9-1f1ea":[["\uD83C\uDDE9\uD83C\uDDEA"],"\uE50E","\uDBB9\uDCE8",["flag-de","de"],32,15,15,0],"1f1e9-1f1f0":[["\uD83C\uDDE9\uD83C\uDDF0"],"","",["flag-dk"],32,16,11,0],"1f1ea-1f1f8":[["\uD83C\uDDEA\uD83C\uDDF8"],"\uE511","\uDBB9\uDCEB",["flag-es","es"],32,17,15,0],"1f1eb-1f1ee":[["\uD83C\uDDEB\uD83C\uDDEE"],"","",["flag-fi"],32,18,11,0],"1f1eb-1f1f7":[["\uD83C\uDDEB\uD83C\uDDF7"],"\uE50D","\uDBB9\uDCE7",["flag-fr","fr"],32,19,15,0],"1f1ec-1f1e7":[["\uD83C\uDDEC\uD83C\uDDE7"],"\uE510","\uDBB9\uDCEA",["flag-gb","gb","uk"],32,20,15,0],"1f1ed-1f1f0":[["\uD83C\uDDED\uD83C\uDDF0"],"","",["flag-hk"],32,21,11,0],"1f1ee-1f1e9":[["\uD83C\uDDEE\uD83C\uDDE9"],"","",["flag-id"],32,22,11,0],"1f1ee-1f1ea":[["\uD83C\uDDEE\uD83C\uDDEA"],"","",["flag-ie"],32,23,11,0],"1f1ee-1f1f1":[["\uD83C\uDDEE\uD83C\uDDF1"],"","",["flag-il"],32,24,11,0],"1f1ee-1f1f3":[["\uD83C\uDDEE\uD83C\uDDF3"],"","",["flag-in"],32,25,11,0],"1f1ee-1f1f9":[["\uD83C\uDDEE\uD83C\uDDF9"],"\uE50F","\uDBB9\uDCE9",["flag-it","it"],32,26,15,0],"1f1ef-1f1f5":[["\uD83C\uDDEF\uD83C\uDDF5"],"\uE50B","\uDBB9\uDCE5",["flag-jp","jp"],32,27,15,0],"1f1f0-1f1f7":[["\uD83C\uDDF0\uD83C\uDDF7"],"\uE514","\uDBB9\uDCEE",["flag-kr","kr"],32,28,15,0],"1f1f2-1f1f4":[["\uD83C\uDDF2\uD83C\uDDF4"],"","",["flag-mo"],32,29,11,0],"1f1f2-1f1fd":[["\uD83C\uDDF2\uD83C\uDDFD"],"","",["flag-mx"],32,30,11,0],"1f1f2-1f1fe":[["\uD83C\uDDF2\uD83C\uDDFE"],"","",["flag-my"],32,31,11,0],"1f1f3-1f1f1":[["\uD83C\uDDF3\uD83C\uDDF1"],"","",["flag-nl"],32,32,11,0],"1f1f3-1f1f4":[["\uD83C\uDDF3\uD83C\uDDF4"],"","",["flag-no"],32,33,11,0],"1f1f3-1f1ff":[["\uD83C\uDDF3\uD83C\uDDFF"],"","",["flag-nz"],32,34,11,0],"1f1f5-1f1ed":[["\uD83C\uDDF5\uD83C\uDDED"],"","",["flag-ph"],33,0,11,0],"1f1f5-1f1f1":[["\uD83C\uDDF5\uD83C\uDDF1"],"","",["flag-pl"],33,1,11,0],"1f1f5-1f1f7":[["\uD83C\uDDF5\uD83C\uDDF7"],"","",["flag-pr"],33,2,11,0],"1f1f5-1f1f9":[["\uD83C\uDDF5\uD83C\uDDF9"],"","",["flag-pt"],33,3,11,0],"1f1f7-1f1fa":[["\uD83C\uDDF7\uD83C\uDDFA"],"\uE512","\uDBB9\uDCEC",["flag-ru","ru"],33,4,15,0],"1f1f8-1f1e6":[["\uD83C\uDDF8\uD83C\uDDE6"],"","",["flag-sa"],33,5,11,0],"1f1f8-1f1ea":[["\uD83C\uDDF8\uD83C\uDDEA"],"","",["flag-se"],33,6,11,0],"1f1f8-1f1ec":[["\uD83C\uDDF8\uD83C\uDDEC"],"","",["flag-sg"],33,7,11,0],"1f1f9-1f1f7":[["\uD83C\uDDF9\uD83C\uDDF7"],"","",["flag-tr"],33,8,11,0],"1f1fa-1f1f8":[["\uD83C\uDDFA\uD83C\uDDF8"],"\uE50C","\uDBB9\uDCE6",["flag-us","us"],33,9,15,0],"1f1fb-1f1f3":[["\uD83C\uDDFB\uD83C\uDDF3"],"","",["flag-vn"],33,10,11,0],"1f1ff-1f1e6":[["\uD83C\uDDFF\uD83C\uDDE6"],"","",["flag-za"],33,11,11,0],"1f468-200d-1f468-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66"],"","",["man-man-boy"],33,12,1,0],"1f468-200d-1f468-200d-1f466-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["man-man-boy-boy"],33,13,1,0],"1f468-200d-1f468-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67"],"","",["man-man-girl"],33,14,1,0],"1f468-200d-1f468-200d-1f467-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["man-man-girl-boy"],33,15,1,0],"1f468-200d-1f468-200d-1f467-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["man-man-girl-girl"],33,16,1,0],"1f468-200d-1f469-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66"],"","",["man-woman-boy"],33,17,1,0],"1f468-200d-1f469-200d-1f466-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["man-woman-boy-boy"],33,18,1,0],"1f468-200d-1f469-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67"],"","",["man-woman-girl"],33,19,1,0],"1f468-200d-1f469-200d-1f467-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["man-woman-girl-boy"],33,20,1,0],"1f468-200d-1f469-200d-1f467-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["man-woman-girl-girl"],33,21,1,0],"1f468-200d-2764-fe0f-200d-1f468":[["\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC68"],"","",["man-heart-man"],33,22,1,0],"1f468-200d-2764-fe0f-200d-1f48b-200d-1f468":[["\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68"],"","",["man-kiss-man"],33,23,1,0],"1f469-200d-1f469-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66"],"","",["woman-woman-boy"],33,24,1,0],"1f469-200d-1f469-200d-1f466-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["woman-woman-boy-boy"],33,25,1,0],"1f469-200d-1f469-200d-1f467":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67"],"","",["woman-woman-girl"],33,26,1,0],"1f469-200d-1f469-200d-1f467-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["woman-woman-girl-boy"],33,27,1,0],"1f469-200d-1f469-200d-1f467-200d-1f467":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["woman-woman-girl-girl"],33,28,1,0],"1f469-200d-2764-fe0f-200d-1f469":[["\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC69"],"","",["woman-heart-woman"],33,29,1,0],"1f469-200d-2764-fe0f-200d-1f48b-200d-1f469":[["\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC69"],"","",["woman-kiss-woman"],33,30,1,0]};
a.emoticons_data={"<3":"heart",":o)":"monkey_face",":*":"kiss",":-*":"kiss","</3":"broken_heart","=)":"smiley","=-)":"smiley","C:":"smile","c:":"smile",":D":"smile",":-D":"smile",":>":"laughing",":->":"laughing",";)":"wink",";-)":"wink",":)":"blush","(:":"blush",":-)":"blush","8)":"sunglasses",":|":"neutral_face",":-|":"neutral_face",":\\":"confused",":-\\":"confused",":/":"confused",":-/":"confused",":p":"stuck_out_tongue",":-p":"stuck_out_tongue",":P":"stuck_out_tongue",":-P":"stuck_out_tongue",":b":"stuck_out_tongue",":-b":"stuck_out_tongue",";p":"stuck_out_tongue_winking_eye",";-p":"stuck_out_tongue_winking_eye",";b":"stuck_out_tongue_winking_eye",";-b":"stuck_out_tongue_winking_eye",";P":"stuck_out_tongue_winking_eye",";-P":"stuck_out_tongue_winking_eye","):":"disappointed",":(":"disappointed",":-(":"disappointed",">:(":"angry",">:-(":"angry",":'(":"cry","D:":"anguished",":o":"open_mouth",":-o":"open_mouth"};
a.variations_data={"261d-1f3fb":[1,3,1],"261d-1f3fc":[1,4,1],"261d-1f3fd":[1,5,1],"261d-1f3fe":[1,6,1],"261d-1f3ff":[1,7,1],"270a-1f3fb":[2,15,1],"270a-1f3fc":[2,16,1],"270a-1f3fd":[2,17,1],"270a-1f3fe":[2,18,1],"270a-1f3ff":[2,19,1],"270b-1f3fb":[2,21,1],"270b-1f3fc":[2,22,1],"270b-1f3fd":[2,23,1],"270b-1f3fe":[2,24,1],"270b-1f3ff":[2,25,1],"270c-1f3fb":[2,27,1],"270c-1f3fc":[2,28,1],"270c-1f3fd":[2,29,1],"270c-1f3fe":[2,30,1],"270c-1f3ff":[2,31,1],"1f385-1f3fb":[8,4,1],"1f385-1f3fc":[8,5,1],"1f385-1f3fd":[8,6,1],"1f385-1f3fe":[8,7,1],"1f385-1f3ff":[8,8,1],"1f3c3-1f3fb":[9,24,1],"1f3c3-1f3fc":[9,25,1],"1f3c3-1f3fd":[9,26,1],"1f3c3-1f3fe":[9,27,1],"1f3c3-1f3ff":[9,28,1],"1f3c4-1f3fb":[9,30,1],"1f3c4-1f3fc":[9,31,1],"1f3c4-1f3fd":[9,32,1],"1f3c4-1f3fe":[9,33,1],"1f3c4-1f3ff":[9,34,1],"1f3c7-1f3fb":[10,2,1],"1f3c7-1f3fc":[10,3,1],"1f3c7-1f3fd":[10,4,1],"1f3c7-1f3fe":[10,5,1],"1f3c7-1f3ff":[10,6,1],"1f3ca-1f3fb":[10,10,1],"1f3ca-1f3fc":[10,11,1],"1f3ca-1f3fd":[10,12,1],"1f3ca-1f3fe":[10,13,1],"1f3ca-1f3ff":[10,14,1],"1f442-1f3fb":[12,32,1],"1f442-1f3fc":[12,33,1],"1f442-1f3fd":[12,34,1],"1f442-1f3fe":[13,0,1],"1f442-1f3ff":[13,1,1],"1f443-1f3fb":[13,3,1],"1f443-1f3fc":[13,4,1],"1f443-1f3fd":[13,5,1],"1f443-1f3fe":[13,6,1],"1f443-1f3ff":[13,7,1],"1f446-1f3fb":[13,11,1],"1f446-1f3fc":[13,12,1],"1f446-1f3fd":[13,13,1],"1f446-1f3fe":[13,14,1],"1f446-1f3ff":[13,15,1],"1f447-1f3fb":[13,17,1],"1f447-1f3fc":[13,18,1],"1f447-1f3fd":[13,19,1],"1f447-1f3fe":[13,20,1],"1f447-1f3ff":[13,21,1],"1f448-1f3fb":[13,23,1],"1f448-1f3fc":[13,24,1],"1f448-1f3fd":[13,25,1],"1f448-1f3fe":[13,26,1],"1f448-1f3ff":[13,27,1],"1f449-1f3fb":[13,29,1],"1f449-1f3fc":[13,30,1],"1f449-1f3fd":[13,31,1],"1f449-1f3fe":[13,32,1],"1f449-1f3ff":[13,33,1],"1f44a-1f3fb":[14,0,1],"1f44a-1f3fc":[14,1,1],"1f44a-1f3fd":[14,2,1],"1f44a-1f3fe":[14,3,1],"1f44a-1f3ff":[14,4,1],"1f44b-1f3fb":[14,6,1],"1f44b-1f3fc":[14,7,1],"1f44b-1f3fd":[14,8,1],"1f44b-1f3fe":[14,9,1],"1f44b-1f3ff":[14,10,1],"1f44c-1f3fb":[14,12,1],"1f44c-1f3fc":[14,13,1],"1f44c-1f3fd":[14,14,1],"1f44c-1f3fe":[14,15,1],"1f44c-1f3ff":[14,16,1],"1f44d-1f3fb":[14,18,1],"1f44d-1f3fc":[14,19,1],"1f44d-1f3fd":[14,20,1],"1f44d-1f3fe":[14,21,1],"1f44d-1f3ff":[14,22,1],"1f44e-1f3fb":[14,24,1],"1f44e-1f3fc":[14,25,1],"1f44e-1f3fd":[14,26,1],"1f44e-1f3fe":[14,27,1],"1f44e-1f3ff":[14,28,1],"1f44f-1f3fb":[14,30,1],"1f44f-1f3fc":[14,31,1],"1f44f-1f3fd":[14,32,1],"1f44f-1f3fe":[14,33,1],"1f44f-1f3ff":[14,34,1],"1f450-1f3fb":[15,1,1],"1f450-1f3fc":[15,2,1],"1f450-1f3fd":[15,3,1],"1f450-1f3fe":[15,4,1],"1f450-1f3ff":[15,5,1],"1f466-1f3fb":[15,28,1],"1f466-1f3fc":[15,29,1],"1f466-1f3fd":[15,30,1],"1f466-1f3fe":[15,31,1],"1f466-1f3ff":[15,32,1],"1f467-1f3fb":[15,34,1],"1f467-1f3fc":[16,0,1],"1f467-1f3fd":[16,1,1],"1f467-1f3fe":[16,2,1],"1f467-1f3ff":[16,3,1],"1f468-1f3fb":[16,5,1],"1f468-1f3fc":[16,6,1],"1f468-1f3fd":[16,7,1],"1f468-1f3fe":[16,8,1],"1f468-1f3ff":[16,9,1],"1f469-1f3fb":[16,11,1],"1f469-1f3fc":[16,12,1],"1f469-1f3fd":[16,13,1],"1f469-1f3fe":[16,14,1],"1f469-1f3ff":[16,15,1],"1f46e-1f3fb":[16,21,1],"1f46e-1f3fc":[16,22,1],"1f46e-1f3fd":[16,23,1],"1f46e-1f3fe":[16,24,1],"1f46e-1f3ff":[16,25,1],"1f470-1f3fb":[16,28,1],"1f470-1f3fc":[16,29,1],"1f470-1f3fd":[16,30,1],"1f470-1f3fe":[16,31,1],"1f470-1f3ff":[16,32,1],"1f471-1f3fb":[16,34,1],"1f471-1f3fc":[17,0,1],"1f471-1f3fd":[17,1,1],"1f471-1f3fe":[17,2,1],"1f471-1f3ff":[17,3,1],"1f472-1f3fb":[17,5,1],"1f472-1f3fc":[17,6,1],"1f472-1f3fd":[17,7,1],"1f472-1f3fe":[17,8,1],"1f472-1f3ff":[17,9,1],"1f473-1f3fb":[17,11,1],"1f473-1f3fc":[17,12,1],"1f473-1f3fd":[17,13,1],"1f473-1f3fe":[17,14,1],"1f473-1f3ff":[17,15,1],"1f474-1f3fb":[17,17,1],"1f474-1f3fc":[17,18,1],"1f474-1f3fd":[17,19,1],"1f474-1f3fe":[17,20,1],"1f474-1f3ff":[17,21,1],"1f475-1f3fb":[17,23,1],"1f475-1f3fc":[17,24,1],"1f475-1f3fd":[17,25,1],"1f475-1f3fe":[17,26,1],"1f475-1f3ff":[17,27,1],"1f476-1f3fb":[17,29,1],"1f476-1f3fc":[17,30,1],"1f476-1f3fd":[17,31,1],"1f476-1f3fe":[17,32,1],"1f476-1f3ff":[17,33,1],"1f477-1f3fb":[18,0,1],"1f477-1f3fc":[18,1,1],"1f477-1f3fd":[18,2,1],"1f477-1f3fe":[18,3,1],"1f477-1f3ff":[18,4,1],"1f478-1f3fb":[18,6,1],"1f478-1f3fc":[18,7,1],"1f478-1f3fd":[18,8,1],"1f478-1f3fe":[18,9,1],"1f478-1f3ff":[18,10,1],"1f47c-1f3fb":[18,15,1],"1f47c-1f3fc":[18,16,1],"1f47c-1f3fd":[18,17,1],"1f47c-1f3fe":[18,18,1],"1f47c-1f3ff":[18,19,1],"1f481-1f3fb":[18,25,1],"1f481-1f3fc":[18,26,1],"1f481-1f3fd":[18,27,1],"1f481-1f3fe":[18,28,1],"1f481-1f3ff":[18,29,1],"1f482-1f3fb":[18,31,1],"1f482-1f3fc":[18,32,1],"1f482-1f3fd":[18,33,1],"1f482-1f3fe":[18,34,1],"1f482-1f3ff":[19,0,1],"1f483-1f3fb":[19,2,1],"1f483-1f3fc":[19,3,1],"1f483-1f3fd":[19,4,1],"1f483-1f3fe":[19,5,1],"1f483-1f3ff":[19,6,1],"1f485-1f3fb":[19,9,1],"1f485-1f3fc":[19,10,1],"1f485-1f3fd":[19,11,1],"1f485-1f3fe":[19,12,1],"1f485-1f3ff":[19,13,1],"1f486-1f3fb":[19,15,1],"1f486-1f3fc":[19,16,1],"1f486-1f3fd":[19,17,1],"1f486-1f3fe":[19,18,1],"1f486-1f3ff":[19,19,1],"1f487-1f3fb":[19,21,1],"1f487-1f3fc":[19,22,1],"1f487-1f3fd":[19,23,1],"1f487-1f3fe":[19,24,1],"1f487-1f3ff":[19,25,1],"1f4aa-1f3fb":[20,26,1],"1f4aa-1f3fc":[20,27,1],"1f4aa-1f3fd":[20,28,1],"1f4aa-1f3fe":[20,29,1],"1f4aa-1f3ff":[20,30,1],"1f645-1f3fb":[27,24,1],"1f645-1f3fc":[27,25,1],"1f645-1f3fd":[27,26,1],"1f645-1f3fe":[27,27,1],"1f645-1f3ff":[27,28,1],"1f646-1f3fb":[27,30,1],"1f646-1f3fc":[27,31,1],"1f646-1f3fd":[27,32,1],"1f646-1f3fe":[27,33,1],"1f646-1f3ff":[27,34,1],"1f647-1f3fb":[28,1,1],"1f647-1f3fc":[28,2,1],"1f647-1f3fd":[28,3,1],"1f647-1f3fe":[28,4,1],"1f647-1f3ff":[28,5,1],"1f64b-1f3fb":[28,10,1],"1f64b-1f3fc":[28,11,1],"1f64b-1f3fd":[28,12,1],"1f64b-1f3fe":[28,13,1],"1f64b-1f3ff":[28,14,1],"1f64c-1f3fb":[28,16,1],"1f64c-1f3fc":[28,17,1],"1f64c-1f3fd":[28,18,1],"1f64c-1f3fe":[28,19,1],"1f64c-1f3ff":[28,20,1],"1f64d-1f3fb":[28,22,1],"1f64d-1f3fc":[28,23,1],"1f64d-1f3fd":[28,24,1],"1f64d-1f3fe":[28,25,1],"1f64d-1f3ff":[28,26,1],"1f64e-1f3fb":[28,28,1],"1f64e-1f3fc":[28,29,1],"1f64e-1f3fd":[28,30,1],"1f64e-1f3fe":[28,31,1],"1f64e-1f3ff":[28,32,1],"1f64f-1f3fb":[28,34,1],"1f64f-1f3fc":[29,0,1],"1f64f-1f3fd":[29,1,1],"1f64f-1f3fe":[29,2,1],"1f64f-1f3ff":[29,3,1],"1f6a3-1f3fb":[30,5,1],"1f6a3-1f3fc":[30,6,1],"1f6a3-1f3fd":[30,7,1],"1f6a3-1f3fe":[30,8,1],"1f6a3-1f3ff":[30,9,1],"1f6b4-1f3fb":[30,27,1],"1f6b4-1f3fc":[30,28,1],"1f6b4-1f3fd":[30,29,1],"1f6b4-1f3fe":[30,30,1],"1f6b4-1f3ff":[30,31,1],"1f6b5-1f3fb":[30,33,1],"1f6b5-1f3fc":[30,34,1],"1f6b5-1f3fd":[31,0,1],"1f6b5-1f3fe":[31,1,1],"1f6b5-1f3ff":[31,2,1],"1f6b6-1f3fb":[31,4,1],"1f6b6-1f3fc":[31,5,1],"1f6b6-1f3fd":[31,6,1],"1f6b6-1f3fe":[31,7,1],"1f6b6-1f3ff":[31,8,1],"1f6c0-1f3fb":[31,19,1],"1f6c0-1f3fc":[31,20,1],"1f6c0-1f3fd":[31,21,1],"1f6c0-1f3fe":[31,22,1],"1f6c0-1f3ff":[31,23,1]};
if(typeof exports==="object"){module.exports=a
}else{if(typeof define==="function"&&define.amd){define(function(){return a
})
}else{this.emoji=a
}}if(b){b(a)
}}).call(function(){return this||(typeof window!=="undefined"?window:global)
}(),function(c){c.include_title=true;
c.allow_native=false;
var a=(function(){if(!window.TSSSB){return false
}if(!TSSSB.env){return false
}if(!TSSSB.env.mac_ssb_version&&!TSSSB.env.win_ssb_version){return false
}if(TSSSB.env.mac_ssb_version){if(TSSSB.env.mac_ssb_version>1.1&&TSSSB.env.mac_ssb_version<2){return true
}if(TSSSB.env.mac_ssb_version==1.1&&TSSSB.env.mac_ssb_version_minor>=1){return true
}}if(TSSSB.env.win_ssb_version){if(TSSSB.env.win_ssb_version>1.1){return true
}if(TSSSB.env.win_ssb_version==1.1&&TSSSB.env.win_ssb_version_minor>=5){return true
}}return false
})();
if(window.inc_js_setup_data===undefined){window.inc_js_setup_data={}
}if(window.inc_js_setup_data.emoji_sheets===undefined){window.inc_js_setup_data.emoji_sheets={apple:"/img/emoji_2015/sheet_apple_64_indexed_256colors.png",google:"/img/emoji_2015/sheet_google_64_indexed_128colors.png",twitter:"/img/emoji_2015/sheet_twitter_64_indexed_128colors.png",emojione:"/img/emoji_2015/sheet_emojione_64_indexed_128colors.png"}
}c.img_sets={apple:{path:"https://slack-assets2.s3-us-west-2.amazonaws.com/ad0d/img/emoji_2015/apple/",sheet:a?"slack-resources:emoji_2015_apple_64_indexed_256colors.png":window.inc_js_setup_data.emoji_sheets.apple,mask:1},google:{path:"https://slack-assets2.s3-us-west-2.amazonaws.com/9500/img/emoji_2015/google/",sheet:a?"slack-resources:emoji_2015_google_64_indexed_128colors.png":window.inc_js_setup_data.emoji_sheets.google,mask:2},twitter:{path:"https://slack-assets2.s3-us-west-2.amazonaws.com/9500/img/emoji_2015/twitter/",sheet:a?"slack-resources:emoji_2015_twitter_64_indexed_128colors.png":window.inc_js_setup_data.emoji_sheets.twitter,mask:4},emojione:{path:"https://slack-assets2.s3-us-west-2.amazonaws.com/9500/img/emoji_2015/emojione/",sheet:a?"slack-resources:emoji_2015_emojione_64_indexed_128colors.png":window.inc_js_setup_data.emoji_sheets.emojione,mask:8}};
delete c.emoticons_data["C:"];
delete c.emoticons_data["c:"];
c.replace_colons=function(f,e){var d=function(g){return e?e(g):g
};
c.init_colons();
return f.replace(c.rx_colons,function(j){var h=j.substr(1,j.length-2);
if(h.indexOf("::skin-tone-")>-1){var n=h.substr(-1,1);
var k="skin-tone-"+n;
var g=c.map.colons[k];
h=h.substr(0,h.length-13);
var l=c.map.colons[h];
if(l){return d(c.replacement(l,h,":",{idx:g,actual:k,wrapper:":"}))
}else{return d(":"+h+":"+c.replacement(g,k,":"))
}}else{var l=c.map.colons[h];
return l?d(c.replacement(l,h,":")):j
}})
};
c.replace_colons_with_unified=function(d){c.init_colons();
return d.replace(c.rx_colons,function(g){var f=g.substr(1,g.length-2).toLowerCase();
if(f.indexOf("::skin-tone-")>-1){var l=f.substr(-1,1);
var h="skin-tone-"+l;
var e=c.map.colons[h];
f=f.substr(0,f.length-13);
var k=c.map.colons[f];
var j=(k&&c.data[k][0][0])?c.data[k][0][0]:":"+f+":";
j+=(e&&c.data[e][0][0])?c.data[e][0][0]:":"+h+":";
return j
}else{var k=c.map.colons.hasOwnProperty(f)&&c.map.colons[f];
return(k&&c.data[k][0][0])?c.data[k][0][0]:g
}})
};
c.skin_tones=["1f3fb","1f3fc","1f3fd","1f3fe","1f3ff"];
var b={"2049":["symbol"],"2122":["symbol"],"2139":["symbol"],"2194":["symbol"],"2195":["symbol","arrow"],"2196":["symbol","arrow"],"2197":["symbol","arrow"],"2198":["symbol","arrow"],"2199":["symbol","arrow"],"2600":["sun","weather"],"2601":["weather","sky"],"2611":["check_box_black","check"],"2614":[],"2615":["drink","food"],"2648":["horoscope","astrology"],"2649":["horoscope","astrology"],"2650":["horoscope","astrology"],"2651":["horoscope","astrology"],"2652":["horoscope","astrology"],"2653":["horoscope","astrology"],"2660":["symbol"],"2663":["symbol"],"2665":["heart"],"2666":["symbol"],"2668":["symbol"],"2693":[],"2702":[],"2705":["check_green","check"],"2708":["plane","travel","fly","transport"],"2709":["mail","envelope"],"2712":["symbol"],"2714":["check","symbol"],"2716":["symbol"],"2728":["glitter","shine","star"],"2733":["symbol"],"2734":["symbol"],"2744":["snow","weather"],"2747":["symbol"],"2753":["symbol"],"2754":["symbol"],"2755":["symbol"],"2757":["symbol"],"2764":[],"2795":["symbol"],"2796":["symbol"],"2797":["symbol"],"2934":["symbol","arrow"],"2935":["symbol","arrow"],"3030":["symbol"],"3297":["symbol"],"3299":["symbol"],"00a9":["symbol"],"00ae":["symbol"],"203c":["symbols"],"21a9":["symbol"],"21aa":["symbol","arrow"],"231a":["clock","time"],"231b":[],"23e9":["symbol"],"23ea":["symbol"],"23eb":["symbol","arrow"],"23ec":["symbol","arrow"],"23f0":["alarm","clock"],"23f3":[],"24c2":[],"25aa":["symbol"],"25ab":["symbol"],"25b6":["symbol","arrow"],"25c0":["symbol","arrow"],"25fb":["symbol"],"25fc":["symbol"],"25fd":["symbol"],"25fe":["symbol"],"260e":["telephone"],"261d":["hand","finger","person","people"],"263a":["people","person","face"],"264a":["horoscope","astrology"],"264b":["horoscope","astrology"],"264c":["horoscope","astrology"],"264d":["horoscope","astrology"],"264e":["horoscope","astrology"],"264f":["horoscope","astrology"],"267b":["symbol"],"267f":["symbol"],"26a0":["symbol"],"26a1":["lightning","bolt","shock","weather"],"26aa":["symbol"],"26ab":["symbol"],"26bd":["sport"],"26be":["sports"],"26c4":["snow"],"26c5":["sun_with_clouds"],"26ce":["symbol"],"26d4":["symbol"],"26ea":["building"],"26f2":[],"26f3":["sport"],"26f5":[],"26fa":["camping"],"26fd":["gas"],"270a":["facepunch","fistbump","punch","hand","person","people"],"270b":["people","person"],"270c":["peace","hand","people","person"],"270f":[],"274c":["letter","cross","symbol"],"274e":["cross_green","x"],"27a1":["symbol","arrow"],"27b0":["symbol"],"27bf":["symbol"],"2b05":["symbol","arrow"],"2b06":["symbol","arrow"],"2b07":["symbol","arrow"],"2b1b":["symbol"],"2b1c":["symbol"],"2b50":[],"2b55":["symbol","letter","circle"],"303d":["symbol"],"1f004":["game"],"1f0cf":["card","symbol"],"1f170":["letters"],"1f171":["symbols"],"1f17e":["symbol"],"1f17f":["symbol"],"1f18e":["letters"],"1f191":[],"1f192":["symbol"],"1f193":["symbol"],"1f194":[],"1f195":[],"1f196":[],"1f197":["letters","symbol"],"1f198":["symbol"],"1f199":["symbol"],"1f19a":[],"1f201":["symbol"],"1f202":[],"1f21a":[],"1f22f":[],"1f232":[],"1f233":[],"1f234":[],"1f235":[],"1f236":[],"1f237":[],"1f238":[],"1f239":[],"1f23a":[],"1f250":["symbol"],"1f251":[],"1f300":["symbol"],"1f301":[],"1f302":["umbrella"],"1f303":["sky","night"],"1f304":[],"1f305":[],"1f306":[],"1f307":[],"1f308":[],"1f309":["bridge"],"1f30a":["tidal_wave","wave","water"],"1f30b":["eruption"],"1f30c":["galaxy","space"],"1f30d":["world","globe"],"1f30e":["world","globe"],"1f30f":["world","globe"],"1f310":["globe","world"],"1f311":["moon_new","moon"],"1f312":["moon_waxing_crescent","moon"],"1f313":["moon_first_quarter","moon"],"1f314":[],"1f315":["moon_full","moon"],"1f316":["moon_waning_gibbous","moon"],"1f317":["moon_last_quarter"],"1f318":["moon_waning_crescent","moon"],"1f319":["moon_crescent","moon"],"1f31a":["moon_new_with_face","moon"],"1f31b":["moon_first_quarter_with_face","moon"],"1f31c":["moon_last_quarter_with_face"],"1f31d":["moon_full_with_face","moon"],"1f31e":["sun","weather","face"],"1f31f":[],"1f320":[],"1f330":["food"],"1f331":["plant"],"1f332":["tree_evergreen","tree","plant"],"1f333":["tree_deciduous","tree","plant"],"1f334":["tree","plant"],"1f335":["plant"],"1f337":["flower","plant"],"1f338":["sakura","flower"],"1f339":["flower","plant"],"1f33a":["plant"],"1f33b":["flower","plant"],"1f33c":["flower","plant"],"1f33d":["vegetable","food"],"1f33e":["food"],"1f33f":["plant"],"1f340":["clover","plant"],"1f341":["leaf","plant"],"1f342":["leaves_brown","plant","leaf"],"1f343":["leaf","plant"],"1f344":["food"],"1f345":["vegetable","food"],"1f346":["vegetable","food"],"1f347":["fruit","food"],"1f348":["fruit","food"],"1f349":["fruit","food"],"1f34a":["orange","fruit","food"],"1f34b":["fruit","food"],"1f34c":["fruit","food"],"1f34d":["fruit","food"],"1f34e":["fruit","food"],"1f34f":["apple_green","fruit","food"],"1f350":["fruit","food"],"1f351":["fruit","food"],"1f352":["fruit","food"],"1f353":["fruit","food"],"1f354":["cheeseburger","burger","food"],"1f355":["food"],"1f356":["food"],"1f357":["drumstick","meat","food"],"1f358":["food"],"1f359":["food"],"1f35a":["food"],"1f35b":["food"],"1f35c":["noodles","food"],"1f35d":["pasta","food"],"1f35e":[],"1f35f":["french_fries","food"],"1f360":["yam","vegetable","food"],"1f361":["food"],"1f362":["food"],"1f363":["food"],"1f364":["shrimp","tempura","food"],"1f365":["food"],"1f366":["ice_cream","food"],"1f367":["snow_cone","food"],"1f368":["icecream","food"],"1f369":["donut","food"],"1f36a":["food"],"1f36b":["candy_bar","food"],"1f36c":["food"],"1f36d":["food","candy"],"1f36e":["food"],"1f36f":["food"],"1f370":["birthday","food"],"1f371":["food"],"1f372":["food"],"1f373":["food"],"1f374":["cutlery","silverware","food"],"1f375":["drink","food"],"1f376":["drink","food"],"1f377":["drink","food"],"1f378":["drink","martini","food"],"1f379":["drink","food"],"1f37a":["ale","drink","food"],"1f37b":["beer","ale","drink","food"],"1f37c":["infant"],"1f380":["bow","present","gift"],"1f381":["present"],"1f382":["cake","food"],"1f383":["pumpkin","scary"],"1f384":["plant","tree"],"1f385":["christmas","holidays"],"1f386":["explosions","celebrate","celebration"],"1f387":["celebration"],"1f388":[],"1f389":["celebrate","fan_fare","celebration","confetti"],"1f38a":["party_ball","celebrate","celebration"],"1f38b":["tree","plant"],"1f38c":["flag"],"1f38d":["plants"],"1f38e":[],"1f38f":["flag"],"1f390":[],"1f391":[],"1f392":["bag"],"1f393":["hat","graduation","cap"],"1f3a0":["carnival"],"1f3a1":["carnival"],"1f3a2":["ride","carnival"],"1f3a3":["fishing_rod","fish"],"1f3a4":["music","instrument"],"1f3a5":["film"],"1f3a6":["symbol"],"1f3a7":["music"],"1f3a8":["palette","paint"],"1f3a9":["hat","clothing"],"1f3aa":["big_top"],"1f3ab":[],"1f3ac":["movie","cinema"],"1f3ad":["comedy_tragedy","tragedy_comedy","mask"],"1f3ae":["controller","game"],"1f3af":["target","bullseye"],"1f3b0":["gambling","casino"],"1f3b1":["eightball"],"1f3b2":["die","dice","game"],"1f3b3":["sport"],"1f3b4":["card"],"1f3b5":["music"],"1f3b6":["music"],"1f3b7":["music","instrument"],"1f3b8":["music","instrument"],"1f3b9":["music","instrument"],"1f3ba":["horn","instrument","music"],"1f3bb":["instrument","music"],"1f3bc":["music"],"1f3bd":["clothing"],"1f3be":["sport"],"1f3bf":["sport"],"1f3c0":["sports"],"1f3c1":["finish_line","race"],"1f3c2":["sport"],"1f3c3":["run","sport"],"1f3c4":["sport"],"1f3c6":[],"1f3c7":["animal"],"1f3c8":["sport"],"1f3c9":["sport"],"1f3ca":["sport"],"1f3e0":["building"],"1f3e1":["building"],"1f3e2":["building"],"1f3e3":["building"],"1f3e4":["building"],"1f3e5":["building"],"1f3e6":["building"],"1f3e7":["symbols"],"1f3e8":["building"],"1f3e9":["building"],"1f3ea":["building"],"1f3eb":["building"],"1f3ec":["building"],"1f3ed":["building"],"1f3ee":["lantern"],"1f3ef":["castle","building"],"1f3f0":["castle"],"1f3fb":[],"1f3fc":[],"1f3fd":[],"1f3fe":[],"1f3ff":[],"1f400":["animal"],"1f401":["animal"],"1f402":["animal"],"1f403":["buffalo","animal"],"1f404":["animal"],"1f405":["animal","cat"],"1f406":["cat","animal"],"1f407":["animal"],"1f408":["animal"],"1f409":["animal"],"1f40a":["alligator","animal"],"1f40b":["animal","fish"],"1f40c":["bug","insect"],"1f40d":["animal"],"1f40e":["animal"],"1f40f":["animal"],"1f410":["animal"],"1f411":["animal"],"1f412":["animal"],"1f413":["animal"],"1f414":["animal","bird"],"1f415":["animal"],"1f416":["animal"],"1f417":["animal"],"1f418":["animal"],"1f419":["animal","fish"],"1f41a":["beach"],"1f41b":["caterpiller","insect"],"1f41c":["bug","insect"],"1f41d":["honeybee","bug","insect"],"1f41e":["ladybug","bug","insect"],"1f41f":["animal"],"1f420":["fish","animal"],"1f421":["fish","animal"],"1f422":["tortoise","animal"],"1f423":["animal","bird"],"1f424":["animal"],"1f425":["animal","bird"],"1f426":["animal"],"1f427":["bird","animal"],"1f428":["bear","animal"],"1f429":["dog","animal"],"1f42a":["animal","camel"],"1f42b":["animal"],"1f42c":["animal","fish"],"1f42d":["animal"],"1f42e":["animal"],"1f42f":["animal","cat"],"1f430":["animal"],"1f431":["animal"],"1f432":["animal"],"1f433":["animal","fish"],"1f434":["animal"],"1f435":["animal","face"],"1f436":["animal"],"1f437":["animal"],"1f438":["toad","animal"],"1f439":["animal"],"1f43a":["animal"],"1f43b":["animal"],"1f43c":["bear","panda","face"],"1f43d":["animal","face"],"1f43e":["paw_prints","paws"],"1f440":["face","person","people"],"1f442":["person","people","head"],"1f443":["face","people","person"],"1f444":["mouth","face","person","people"],"1f445":["face","person","people"],"1f446":["hand","finger","person","people"],"1f447":["hand","finger","person","people"],"1f448":["hand","finger","person","people"],"1f449":["hand","finger","person","people"],"1f44a":["fistbump","punch","hand","person","people"],"1f44b":["hand","people","person"],"1f44c":["hand","people","person"],"1f44d":["thumbsup","y","yes","hand","people","person"],"1f44e":["thumbsdown","n","no","hand","people","person"],"1f44f":["hands","people","person"],"1f450":["hands","people","person"],"1f451":["hat"],"1f452":["hat","woman"],"1f453":["glasses","spectacles"],"1f454":["clothing"],"1f455":["clothing"],"1f456":["pants","trousers","clothing"],"1f457":["clothing"],"1f458":["clothing"],"1f459":["swimsuit","clothes"],"1f45a":["clothes","woman"],"1f45b":["handbag","bag"],"1f45c":["purse"],"1f45d":["clutch","bag"],"1f45e":["shoe","clothing"],"1f45f":["sneaker","runner","shoe","clothing"],"1f460":["stiletto","shoe","clothing"],"1f461":["clothing","shoe"],"1f462":["shoe","clothes"],"1f463":["feet","foot"],"1f464":["person","people"],"1f465":["person","people"],"1f466":["person","people","face"],"1f467":["person","people","face"],"1f468":["person","people","face"],"1f469":["lady","face","person","people"],"1f46a":["man_woman_boy","people","person"],"1f46b":["man_woman","woman_man","people"],"1f46c":["man","couple","person","people"],"1f46d":["woman","couple","person","people"],"1f46e":["police_officer","people","person","face"],"1f46f":["people","person"],"1f470":["bride","person","people","face","woman","wedding","marriage"],"1f471":["face","person","people"],"1f472":["person","people","face"],"1f473":["person","people","face"],"1f474":["senior_man","elder_man","man","person","people","face"],"1f475":["senior_woman","senior_woman","woman","people","person","face"],"1f476":["infant","face","people","person"],"1f477":["person","people","face"],"1f478":["face","crown","people","person","woman"],"1f479":["ogre","face"],"1f47a":["goblin","face"],"1f47b":["ghoul","scary"],"1f47c":["heaven","saint","people","person"],"1f47d":["martian","space"],"1f47e":["video_game","game"],"1f47f":["devil","evil","face","person","people"],"1f480":["dead","skeleton","scary"],"1f481":["help_desk","person","people","becky"],"1f482":["face","people","person"],"1f483":["person","people"],"1f484":["makeup"],"1f485":["manicure","hand","people","person"],"1f486":["relax","becky"],"1f487":["face","people","person","barber","salon"],"1f488":[],"1f489":["needle","medicine"],"1f48a":["medicine","drugs"],"1f48b":["love","lips","mouth","face"],"1f48c":["letter","mail"],"1f48d":["jewellery"],"1f48e":["jewel","diamond"],"1f48f":["man_woman_kiss","woman_man_kiss","people"],"1f490":["flower","plant"],"1f491":["man_heart_woman","woman_heart_man","people"],"1f492":["marriage"],"1f493":["heart"],"1f494":["heartbreak","heart"],"1f495":["heart"],"1f496":["heart_sparkling","glitter","shine"],"1f497":["pulse"],"1f498":["heart_arrow","heart"],"1f499":["heart_blue","heart"],"1f49a":["heart_green","heart"],"1f49b":["heart"],"1f49c":["heart_purple","heart"],"1f49d":["present_heart"],"1f49e":["heart"],"1f49f":["heart"],"1f4a0":["diamond","gem","jewel"],"1f4a1":["light_bulb"],"1f4a2":["mad","angry","face","people","person"],"1f4a3":[],"1f4a4":["snore","sleep","snooze"],"1f4a5":["bang","explosion","collision","bomb"],"1f4a6":["water","spray"],"1f4a7":["water","sweat","tear","cry"],"1f4a8":["gust","whoosh","wind","fart"],"1f4a9":["poo","poop","shit"],"1f4aa":["bicep","arm","person","people"],"1f4ab":["shooting_star","star"],"1f4ac":["talk","bubble"],"1f4ad":["bubble"],"1f4ae":["flower","plant"],"1f4af":["hundred"],"1f4b0":["money","cash","dollar"],"1f4b1":["symbol"],"1f4b2":["symbol"],"1f4b3":[],"1f4b4":["money","cash"],"1f4b5":["money","cash"],"1f4b6":["money","cash"],"1f4b7":["money","cash"],"1f4b8":["money","cash","dollar"],"1f4b9":["graph"],"1f4ba":["airplane_seat","chair"],"1f4bb":["desktop","pc","work"],"1f4bc":["work"],"1f4bd":[],"1f4be":["computer"],"1f4bf":[],"1f4c0":["cd","disk","disc"],"1f4c1":["folder","work"],"1f4c2":["folder_open","folder","work"],"1f4c3":["paper","document"],"1f4c4":["paper","document"],"1f4c5":["calendar"],"1f4c6":["work","date"],"1f4c7":[],"1f4c8":["graph_with_upwards_trend"],"1f4c9":["graph_with_downwards_trend"],"1f4ca":["graph","chart"],"1f4cb":["work"],"1f4cc":["thumbtack"],"1f4cd":["map_pin"],"1f4ce":["work"],"1f4cf":["ruler"],"1f4d0":[],"1f4d1":[],"1f4d2":["book"],"1f4d3":["book"],"1f4d4":["book"],"1f4d5":["book"],"1f4d6":[],"1f4d7":["book"],"1f4d8":["book"],"1f4d9":["book"],"1f4da":[],"1f4db":[],"1f4dc":["paper"],"1f4dd":["note","pencil","work"],"1f4de":["phone"],"1f4df":[],"1f4e0":["work"],"1f4e1":["dish","tv"],"1f4e2":["speaker"],"1f4e3":["sound","speaker"],"1f4e4":["mail","letter"],"1f4e5":["mail","email","work"],"1f4e6":["box","shipping"],"1f4e7":["envelope","mail"],"1f4e8":["mail","email","work"],"1f4e9":[],"1f4ea":["mail","post"],"1f4eb":["mail","post"],"1f4ec":["mail","post"],"1f4ed":["mail","post"],"1f4ee":["mail","post"],"1f4ef":["horn"],"1f4f0":["paper","news"],"1f4f1":["phone","ios"],"1f4f2":["phone"],"1f4f3":["symbol"],"1f4f4":["phone"],"1f4f5":["phone","symbol"],"1f4f6":["symbol"],"1f4f7":[],"1f4f9":["camera"],"1f4fa":["television"],"1f4fb":["stereo"],"1f4fc":["tape"],"1f500":["symbol"],"1f501":["symbol"],"1f502":["symbol"],"1f503":["symbol","arrow"],"1f504":["symbol","arrow"],"1f505":["symbol"],"1f506":["symbol"],"1f507":["sound","speaker","volume"],"1f508":["volume","sound"],"1f509":["speaker"],"1f50a":["sound","speaker"],"1f50b":[],"1f50c":["plug","cord"],"1f50d":["zoom","search"],"1f50e":["zoom","search"],"1f50f":["security"],"1f510":[],"1f511":["lock"],"1f512":[],"1f513":["lock","security"],"1f514":[],"1f515":["bell"],"1f516":[],"1f517":["symbol"],"1f518":[],"1f519":["symbol"],"1f51a":["symbol"],"1f51b":["symbol"],"1f51c":["symbol"],"1f51d":["symbol"],"1f51e":["symbol"],"1f51f":["number"],"1f520":["letters"],"1f521":["letters"],"1f522":[],"1f523":[],"1f524":["letters"],"1f525":["flames","burn"],"1f526":["torch"],"1f527":["tool"],"1f528":["tool"],"1f529":[],"1f52a":["knife"],"1f52b":["bullet","shoot"],"1f52c":["science"],"1f52d":[],"1f52e":["future","fortune"],"1f52f":["symbol"],"1f530":["symbol"],"1f531":[],"1f532":["symbol"],"1f533":["symbol"],"1f534":["symbol"],"1f535":["symbol"],"1f536":["symbol"],"1f537":["symbol"],"1f538":["symbol"],"1f539":["symbol"],"1f53a":["symbol"],"1f53b":["symbol"],"1f53c":["symbol","arrow"],"1f53d":["symbol","arrow"],"1f550":["time"],"1f551":["time"],"1f552":["time"],"1f553":["time"],"1f554":["time"],"1f555":["time"],"1f556":["time"],"1f557":["time"],"1f558":["time"],"1f559":["time"],"1f55a":["time"],"1f55b":["time"],"1f55c":["time"],"1f55d":["time"],"1f55e":["time"],"1f55f":["time"],"1f560":["time"],"1f561":["time"],"1f562":["time"],"1f563":["time"],"1f564":["time"],"1f565":["time"],"1f566":["time"],"1f567":["time"],"1f5fb":[],"1f5fc":["building"],"1f5fd":["statue"],"1f5fe":[],"1f5ff":["easter_island_head","statue"],"1f600":["face","people","person"],"1f601":["face","people","person"],"1f602":["happy","face","person","people"],"1f603":["face","person","people"],"1f604":["face","person","people"],"1f605":["face","person","people"],"1f606":["face","person","people","funny","lol"],"1f607":["saint","angel","face","person","people"],"1f608":["face","person","people","devil","evil"],"1f609":["face","person","people"],"1f60a":["smile","face","person","people"],"1f60b":["delicious","face","person","people"],"1f60c":["people","person","face"],"1f60d":["heart","face","person","people"],"1f60e":["shades","face","person","people"],"1f60f":["face","person","people"],"1f610":["nonplussed","face","people","person"],"1f611":["deadpan","face","people","person"],"1f612":["unimpressed","face","person","people"],"1f613":["face","person","people"],"1f614":["face","person","people"],"1f615":["face","person","people"],"1f616":["dumbfounded","face","person","people"],"1f617":["face","person","people"],"1f618":["face","person","people","heart"],"1f619":["face","person","people"],"1f61a":["face","person","people"],"1f61b":["tongue","face","person","people"],"1f61c":["tongue","face","person","people"],"1f61d":["tongue","face","person","people"],"1f61e":["face","person","people"],"1f61f":["face","person","people"],"1f620":["mad","anger","face","people","person"],"1f621":["anger","mad","angry","face","person","people"],"1f622":["tears","face","people","person"],"1f623":["face","person","people"],"1f624":["hmph","person","people","face"],"1f625":["phew","face","person","people"],"1f626":["face","people","person"],"1f627":["upset","shocked","face","people","person"],"1f628":["scared","face","people","person"],"1f629":["face","person","people"],"1f62a":["face","person","people"],"1f62b":["tantrum","face","person","people"],"1f62c":["face","people","person"],"1f62d":["face","person","people"],"1f62e":["surprised","face","people","person"],"1f62f":["face","person","people"],"1f630":["nervous","face","person","people"],"1f631":["face","person","people"],"1f632":["shocked","face","people","person"],"1f633":["embarrassed","face","people","person"],"1f634":["face","person","people"],"1f635":["face","person","people"],"1f636":["face","person","people"],"1f637":[],"1f638":["face","animal","cat"],"1f639":["happy","face","cat","animal"],"1f63a":["face","animal","cat"],"1f63b":["heart","animal","face","cat"],"1f63c":["face","animal","cat"],"1f63d":["face","cat","animal"],"1f63e":["face","animal","cat","sad"],"1f63f":["face","animal","cat"],"1f640":["face","animal","cat"],"1f645":["person","peopl","becky"],"1f646":["woman","people","person","becky"],"1f647":["person","people"],"1f648":["face","animal","monkey"],"1f649":["face","animal","monkey"],"1f64a":["face","monkey","animal"],"1f64b":["hand","people","person","becky"],"1f64c":["hand","people","person"],"1f64d":["face","person","people","sad"],"1f64e":["face","person","people"],"1f64f":["bless","hand","people","person"],"1f680":["spaceship","space"],"1f681":["chopper","fly"],"1f682":["train","transport"],"1f683":["train","transport"],"1f684":["train","transport"],"1f685":["transport"],"1f686":["vehicle","transport"],"1f687":["symbol"],"1f688":["transport","train"],"1f689":["building"],"1f68a":["vehicle","transport","train"],"1f68b":["transport"],"1f68c":["automobile","transport","vehicle"],"1f68d":["bus_front","bus","vehicle","automobile","transport"],"1f68e":["bus","vehicle","automobile"],"1f68f":["bus"],"1f690":["bus","vehicle","transport","automobile"],"1f691":["paramedic"],"1f692":["fire_truck","vehicle","automobile"],"1f693":["cop_car","car","automobile","vehicle","transport"],"1f694":["police_car_front","cop","car","vehicle","automobile","transport"],"1f695":["cab","car","automobile","vehicle","transport"],"1f696":["taxi_fron","cab","car","vehicle","automobile","transport"],"1f697":["vehicle","automobile","transport"],"1f698":["car_front","car","vehicle","automobile","transport"],"1f699":["car","automobile","transport"],"1f69a":["vehicle","automobile","transport"],"1f69b":["truck","automobile","vehicle","transport"],"1f69c":["vehicle","farm"],"1f69d":["train","transport"],"1f69e":["train"],"1f69f":["train","transport"],"1f6a0":["gondola","transport"],"1f6a1":["gondola","transport"],"1f6a2":["boat"],"1f6a3":["boat"],"1f6a4":["boat"],"1f6a5":[],"1f6a6":[],"1f6a7":[],"1f6a8":["siren","police"],"1f6a9":["flag"],"1f6aa":[],"1f6ab":["symbol"],"1f6ac":["cigarette"],"1f6ad":["symbol"],"1f6ae":["symbol","garbage"],"1f6af":["symbol"],"1f6b0":["symbol"],"1f6b1":["symbol"],"1f6b2":["bicycle","cycle","sport","cyclist"],"1f6b3":["bike","symbol"],"1f6b4":["cyclist","bike","sport"],"1f6b5":["bike","cyclist","sport"],"1f6b6":["person","people"],"1f6b7":["symbol"],"1f6b8":["symbol"],"1f6b9":["symbol"],"1f6ba":["symbol"],"1f6bb":["symbol"],"1f6bc":["symbol"],"1f6bd":["bathroom","washroom","restroom"],"1f6be":["symbol"],"1f6bf":["bathroom","restroom","washroom"],"1f6c0":["washroom","restroom"],"1f6c1":["washroom","restroom"],"1f6c2":["symbol"],"1f6c3":["symbol"],"1f6c4":["symbol"],"1f6c5":["symbol"],"0023-20e3":["symbol"],"0030-20e3":["number"],"0031-20e3":["number"],"0032-20e3":["number"],"0033-20e3":["number"],"0034-20e3":["number"],"0035-20e3":["number"],"0036-20e3":["number"],"0037-20e3":["number"],"0038-20e3":["number"],"0039-20e3":["number"],"1f1e6-1f1ea":["flag"],"1f1e6-1f1f9":["flag"],"1f1e6-1f1fa":["flag"],"1f1e7-1f1ea":["flag"],"1f1e7-1f1f7":["flag"],"1f1e8-1f1e6":["flag"],"1f1e8-1f1ed":["flag"],"1f1e8-1f1f1":["flag"],"1f1e8-1f1f3":["flag"],"1f1e8-1f1f4":["flag"],"1f1e9-1f1ea":["flag"],"1f1e9-1f1f0":["flag"],"1f1ea-1f1f8":["flag"],"1f1eb-1f1ee":["flag"],"1f1eb-1f1f7":["flag"],"1f1ec-1f1e7":["flag"],"1f1ed-1f1f0":["flag"],"1f1ee-1f1e9":["flag"],"1f1ee-1f1ea":["flag"],"1f1ee-1f1f1":["flag"],"1f1ee-1f1f3":["flag"],"1f1ee-1f1f9":["flag"],"1f1ef-1f1f5":["flag"],"1f1f0-1f1f7":["flag"],"1f1f2-1f1f4":["flag"],"1f1f2-1f1fd":["flag"],"1f1f2-1f1fe":["flag"],"1f1f3-1f1f1":["flag"],"1f1f3-1f1f4":["flag"],"1f1f3-1f1ff":["flag"],"1f1f5-1f1ed":["flag"],"1f1f5-1f1f1":["flag"],"1f1f5-1f1f7":["flag"],"1f1f5-1f1f9":["flag"],"1f1f7-1f1fa":["flag"],"1f1f8-1f1e6":["flag"],"1f1f8-1f1ea":["flag"],"1f1f8-1f1ec":["flag"],"1f1f9-1f1f7":["flag"],"1f1fa-1f1f8":["flag"],"1f1fb-1f1f3":["flag"],"1f1ff-1f1e6":["flag"],"1f468-200d-1f468-200d-1f466":["person","people","family"],"1f468-200d-1f468-200d-1f466-200d-1f466":["person","people","family"],"1f468-200d-1f468-200d-1f467":["person","people","family"],"1f468-200d-1f468-200d-1f467-200d-1f466":["person","people","family"],"1f468-200d-1f468-200d-1f467-200d-1f467":["person","people","family"],"1f468-200d-1f469-200d-1f466":["person","people","family"],"1f468-200d-1f469-200d-1f466-200d-1f466":["person","people","family"],"1f468-200d-1f469-200d-1f467":["person","people","family"],"1f468-200d-1f469-200d-1f467-200d-1f466":["person","people","family"],"1f468-200d-1f469-200d-1f467-200d-1f467":["person","people","family"],"1f468-200d-2764-fe0f-200d-1f468":["person","people","couple"],"1f468-200d-2764-fe0f-200d-1f48b-200d-1f468":["person","people","couple"],"1f469-200d-1f469-200d-1f466":["family","people","person","woman"],"1f469-200d-1f469-200d-1f466-200d-1f466":["family","people","person","woman"],"1f469-200d-1f469-200d-1f467":["family","people","person","woman"],"1f469-200d-1f469-200d-1f467-200d-1f466":["family","people","person","woman"],"1f469-200d-1f469-200d-1f467-200d-1f467":["family","people","person","woman"],"1f469-200d-2764-fe0f-200d-1f469":["couple","people","person","woman"],"1f469-200d-2764-fe0f-200d-1f48b-200d-1f469":["couple","people","person","woman"]};
c.unaltered_data=JSON.parse(JSON.stringify(c.data));
c.init_colons();
window._private_emoji=window.emoji;
delete window.emoji
});
/*!
Chosen, a Select Box Enhancer for jQuery and Prototype
by Patrick Filler for Harvest, http://getharvest.com

Version 1.4.2
Full source at https://github.com/harvesthq/chosen
Copyright (c) 2011-2015 Harvest http://getharvest.com

MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
This file is generated by `grunt build`, do not edit it by hand.
*/
(function(){var f,a,g,d,e,b={}.hasOwnProperty,c=function(l,j){for(var h in j){if(b.call(j,h)){l[h]=j[h]
}}function k(){this.constructor=l
}k.prototype=j.prototype;
l.prototype=new k();
l.__super__=j.prototype;
return l
};
d=(function(){function h(){this.options_index=0;
this.parsed=[]
}h.prototype.add_node=function(j){if(j.nodeName.toUpperCase()==="OPTGROUP"){return this.add_group(j)
}else{return this.add_option(j)
}};
h.prototype.add_group=function(p){var o,l,n,k,m,j;
o=this.parsed.length;
this.parsed.push({array_index:o,group:true,label:this.escapeExpression(p.label),title:p.title?p.title:void 0,children:0,disabled:p.disabled,classes:p.className});
m=p.childNodes;
j=[];
for(n=0,k=m.length;
n<k;
n++){l=m[n];
j.push(this.add_option(l,o,p.disabled))
}return j
};
h.prototype.add_option=function(k,l,j){if(k.nodeName.toUpperCase()==="OPTION"){if(k.text!==""){if(l!=null){this.parsed[l].children+=1
}this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:k.value,text:k.text,html:k.innerHTML,extra:k.getAttribute("data-additional-search-field"),image:k.getAttribute("data-img-src"),presence_id:k.getAttribute("data-presence-id"),title:k.title?k.title:void 0,selected:k.selected,disabled:j===true?j:k.disabled,group_array_index:l,group_label:l!=null?this.parsed[l].label:null,classes:k.className,style:k.style.cssText})
}else{this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:true})
}return this.options_index+=1
}};
h.prototype.escapeExpression=function(l){var k,j;
if((l==null)||l===false){return""
}if(!/[\&\<\>\"\'\`]/.test(l)){return l
}k={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};
j=/&(?!\w+;)|[\<\>\"\'\`]/g;
return l.replace(j,function(m){return k[m]||"&amp;"
})
};
return h
})();
d.select_to_array=function(h){var n,m,l,j,k;
m=new d();
k=h.childNodes;
for(l=0,j=k.length;
l<j;
l++){n=k[l];
m.add_node(n)
}return m.parsed
};
a=(function(){function h(j,k){this.form_field=j;
this.options=k!=null?k:{};
if(!h.browser_is_supported()){return
}this.is_multiple=this.form_field.multiple;
if(!this.is_multiple){this.options.multiple_always_open=false
}this.set_default_text();
this.set_default_values();
this.setup();
this.set_up_html();
this.register_observers();
if(this.options.multiple_always_open){this.container_mousedown()
}this.on_ready()
}h.prototype.set_default_values=function(){var j=this;
this.click_test_action=function(k){return j.test_active_click(k)
};
this.activate_action=function(k){return j.activate_field(k)
};
this.active_field=false;
this.mouse_on_container=false;
this.results_showing=false;
this.result_highlighted=null;
this.allow_single_deselect=(this.options.allow_single_deselect!=null)&&(this.form_field.options[0]!=null)&&this.form_field.options[0].text===""?this.options.allow_single_deselect:false;
this.disable_search_threshold=this.options.disable_search_threshold||0;
this.disable_search=this.options.disable_search||false;
this.enable_split_word_search=this.options.enable_split_word_search!=null?this.options.enable_split_word_search:true;
this.group_search=this.options.group_search!=null?this.options.group_search:true;
this.search_contains=this.options.search_contains||false;
this.single_backstroke_delete=this.options.single_backstroke_delete!=null?this.options.single_backstroke_delete:false;
this.max_selected_options=this.options.max_selected_options||Infinity;
this.optional_prefix=this.options.optional_prefix||null;
this.inherit_select_classes=this.options.inherit_select_classes||false;
this.display_selected_options=this.options.display_selected_options!=null?this.options.display_selected_options:true;
this.display_disabled_options=this.options.display_disabled_options!=null?this.options.display_disabled_options:true;
return this.include_group_label_in_selected=this.options.include_group_label_in_selected||false
};
h.prototype.set_default_text=function(){if(this.form_field.getAttribute("data-placeholder")){this.default_text=this.form_field.getAttribute("data-placeholder")
}else{if(this.is_multiple){this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||h.default_multiple_text
}else{this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||h.default_single_text
}}return this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||h.default_no_result_text
};
h.prototype.choice_label=function(j){if(this.include_group_label_in_selected&&(j.group_label!=null)){return"<b class='group-name'>"+j.group_label+"</b>"+j.html
}else{return j.html
}};
h.prototype.mouse_enter=function(){return this.mouse_on_container=true
};
h.prototype.mouse_leave=function(){return this.mouse_on_container=false
};
h.prototype.input_focus=function(j){var k=this;
if(this.is_multiple){if(!this.active_field){return setTimeout((function(){return k.container_mousedown()
}),50)
}}else{if(!this.active_field){return this.activate_field()
}}};
h.prototype.input_blur=function(j){var k=this;
if(!this.mouse_on_container){this.active_field=false;
return setTimeout((function(){return k.blur_test()
}),100)
}};
h.prototype.results_option_build=function(k){var l,o,n,j,m;
l="";
m=this.results_data;
for(n=0,j=m.length;
n<j;
n++){o=m[n];
if(o.group){l+=this.result_add_group(o)
}else{l+=this.result_add_option(o)
}if(k!=null?k.first:void 0){if(o.selected&&this.is_multiple){this.choice_build(o)
}else{if(o.selected&&!this.is_multiple){this.single_set_selected_text(this.choice_label(o))
}}}}return l
};
h.prototype.result_add_option=function(l){var k,j;
if(!l.search_match){return""
}if(!this.include_option_in_results(l)){return""
}k=[];
if(!l.disabled&&!(l.selected&&this.is_multiple)){k.push("active-result")
}if(l.disabled&&!(l.selected&&this.is_multiple)){k.push("disabled-result")
}if(l.selected){k.push("result-selected")
}if(l.group_array_index!=null){k.push("group-option")
}if(l.classes!==""){k.push(l.classes)
}j=document.createElement("li");
j.className=k.join(" ");
j.style.cssText=l.style;
j.setAttribute("data-option-array-index",l.array_index);
j.innerHTML=l.search_text;
if(l.image){f(j).prepend(f("<img>").attr("src",l.image))
}if(l.presence_id&&TS&&TS.members){var m=TS.members.getMemberById(l.presence_id);
if(m){f(j).append(TS.templates.makeMemberPresenceIcon(m));
f(j).addClass(m.presence)
}}if(l.title){j.title=l.title
}return this.outerHTML(j)
};
h.prototype.result_add_group=function(l){var k,j;
if(!(l.search_match||l.group_match)){return""
}if(!(l.active_options>0)){return""
}k=[];
k.push("group-result");
if(l.classes){k.push(l.classes)
}j=document.createElement("li");
j.className=k.join(" ");
j.innerHTML=l.search_text;
if(l.title){j.title=l.title
}return this.outerHTML(j)
};
h.prototype.results_update_field=function(){this.set_default_text();
if(!this.is_multiple){this.results_reset_cleanup()
}this.result_clear_highlight();
this.results_build();
if(this.results_showing){return this.winnow_results()
}};
h.prototype.reset_single_select_options=function(){var j,n,l,m,k;
m=this.results_data;
k=[];
for(n=0,l=m.length;
n<l;
n++){j=m[n];
if(j.selected){k.push(j.selected=false)
}else{k.push(void 0)
}}return k
};
h.prototype.results_toggle=function(){if(this.results_showing){return this.results_hide()
}else{return this.results_show()
}};
h.prototype.results_search=function(j){if(this.results_showing){return this.winnow_results()
}else{return this.results_show()
}};
h.prototype.winnow_results=function(){var u,o,r,n,j,t,p,s,k,l,q,m;
this.no_results_clear();
n=0;
t=this.get_search_text();
u=t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
k=new RegExp(u,"i");
r=this.get_search_regex(u);
m=this.results_data;
for(l=0,q=m.length;
l<q;
l++){o=m[l];
o.search_match=false;
j=null;
if(this.include_option_in_results(o)){if(o.group){o.group_match=false;
o.active_options=0
}if((o.group_array_index!=null)&&this.results_data[o.group_array_index]){j=this.results_data[o.group_array_index];
if(j.active_options===0&&j.search_match){n+=1
}j.active_options+=1
}o.search_text=(o.group?o.label:o.html)+(o.extra?" "+o.extra:"");
if(!(o.group&&!this.group_search)){o.search_match=this.search_string_match(o.search_text,r);
if(o.search_match&&!o.group){n+=1
}if(o.search_match){if(t.length){p=o.search_text.search(k);
s=o.search_text.substr(0,p+t.length)+"</em>"+o.search_text.substr(p+t.length);
o.search_text=s.substr(0,p)+"<em>"+s.substr(p)
}if(j!=null){j.group_match=true
}}else{if((o.group_array_index!=null)&&this.results_data[o.group_array_index].search_match){o.search_match=true
}}}}}this.result_clear_highlight();
if(n<1&&t.length){this.update_results_content("");
return this.no_results(t)
}else{this.update_results_content(this.results_option_build());
return this.winnow_results_set_highlight()
}};
h.prototype.get_search_regex=function(k){var j;
j=this.search_contains?"":"^";
if(this.optional_prefix){j+=this.optional_prefix+"?"
}return new RegExp(j+k,"i")
};
h.prototype.search_string_match=function(o,l){var k,n,m,j;
if(l.test(o)){return true
}else{if(this.enable_split_word_search&&(o.indexOf(" ")>=0||o.indexOf("[")===0)){n=o.replace(/\[|\]/g,"").split(" ");
if(n.length){for(m=0,j=n.length;
m<j;
m++){k=n[m];
if(l.test(k)){return true
}}}}}};
h.prototype.choices_count=function(){var k,m,j,l;
if(this.selected_option_count!=null){return this.selected_option_count
}this.selected_option_count=0;
l=this.form_field.options;
for(m=0,j=l.length;
m<j;
m++){k=l[m];
if(k.selected){this.selected_option_count+=1
}}return this.selected_option_count
};
h.prototype.choices_click=function(j){j.preventDefault();
if(!(this.results_showing||this.is_disabled)){return this.results_show()
}};
h.prototype.keyup_checker=function(j){var l,k;
l=(k=j.which)!=null?k:j.keyCode;
this.search_field_scale();
switch(l){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0){return this.keydown_backstroke()
}else{if(!this.pending_backstroke){this.result_clear_highlight();
return this.results_search()
}}break;
case 13:j.preventDefault();
if(this.results_showing){return this.result_select(j)
}break;
case 27:if(this.results_showing){this.results_hide()
}return true;
case 9:case 38:case 40:case 16:case 91:case 17:break;
default:return this.results_search()
}};
h.prototype.clipboard_event_checker=function(j){var k=this;
return setTimeout((function(){return k.results_search()
}),50)
};
h.prototype.container_width=function(){if(this.options.width!=null){return this.options.width
}else{return""+this.form_field.offsetWidth+"px"
}};
h.prototype.include_option_in_results=function(j){if(this.is_multiple&&(!this.display_selected_options&&j.selected)){return false
}if(!this.display_disabled_options&&j.disabled){return false
}if(j.empty){return false
}return true
};
h.prototype.search_results_touchstart=function(j){this.touch_started=true;
return this.search_results_mouseover(j)
};
h.prototype.search_results_touchmove=function(j){this.touch_started=false;
return this.search_results_mouseout(j)
};
h.prototype.search_results_touchend=function(j){if(this.touch_started){return this.search_results_mouseup(j)
}};
h.prototype.outerHTML=function(k){var j;
if(k.outerHTML){return k.outerHTML
}j=document.createElement("div");
j.appendChild(k);
return j.innerHTML
};
h.browser_is_supported=function(){if(window.navigator.appName==="Microsoft Internet Explorer"){return document.documentMode>=8
}if(/iP(od|hone)/i.test(window.navigator.userAgent)){return false
}if(/Android/i.test(window.navigator.userAgent)){if(/Mobile/i.test(window.navigator.userAgent)){return false
}}return true
};
h.default_multiple_text="Select Some Options";
h.default_single_text="Select an Option";
h.default_no_result_text="No results match";
return h
})();
f=jQuery;
f.fn.extend({chosen:function(h){if(!a.browser_is_supported()){return this
}return this.each(function(k){var l,j;
l=f(this);
j=l.data("chosen");
if(h==="destroy"&&j instanceof g){j.destroy()
}else{if(!(j instanceof g)){l.data("chosen",new g(this,h))
}}})
}});
g=(function(h){c(j,h);
function j(){e=j.__super__.constructor.apply(this,arguments);
return e
}j.prototype.setup=function(){this.form_field_jq=f(this.form_field);
this.current_selectedIndex=this.form_field.selectedIndex;
return this.is_rtl=this.form_field_jq.hasClass("chzn-rtl")
};
j.prototype.set_up_html=function(){var k,l;
k=["chzn-container"];
k.push("chzn-container-"+(this.is_multiple?"multi":"single"));
if(this.inherit_select_classes&&this.form_field.className){k.push(this.form_field.className)
}if(this.is_rtl){k.push("chzn-rtl")
}l={"class":k.join(" "),style:"width: "+(this.container_width())+";",title:this.form_field.title};
if(this.form_field.id.length){l.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chzn"
}this.container=f("<div />",l);
if(this.is_multiple){this.container.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop"><ul class="chzn-results"></ul></div>')
}else{this.container.html('<a class="chzn-single chzn-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chzn-drop"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>')
}this.form_field_jq.hide().after(this.container);
this.dropdown=this.container.find("div.chzn-drop").first();
this.search_field=this.container.find("input").first();
this.search_results=this.container.find("ul.chzn-results").first();
this.search_field_scale();
this.search_no_results=this.container.find("li.no-results").first();
if(this.is_multiple){this.search_choices=this.container.find("ul.chzn-choices").first();
this.search_container=this.container.find("li.search-field").first()
}else{this.search_container=this.container.find("div.chzn-search").first();
this.selected_item=this.container.find(".chzn-single").first()
}this.results_build();
this.set_tab_index();
return this.set_label_behavior()
};
j.prototype.on_ready=function(){return this.form_field_jq.trigger("chosen:ready",{chosen:this})
};
j.prototype.register_observers=function(){var k=this;
this.container.bind("touchstart.chosen",function(l){k.container_mousedown(l);
return l.preventDefault()
});
this.container.bind("touchend.chosen",function(l){k.container_mouseup(l);
return l.preventDefault()
});
this.container.bind("mousedown.chosen",function(l){k.container_mousedown(l)
});
this.container.bind("mouseup.chosen",function(l){k.container_mouseup(l)
});
this.container.bind("mouseenter.chosen",function(l){k.mouse_enter(l)
});
this.container.bind("mouseleave.chosen",function(l){k.mouse_leave(l)
});
this.search_results.bind("mouseup.chosen",function(l){k.search_results_mouseup(l)
});
this.search_results.bind("mouseover.chosen",function(l){k.search_results_mouseover(l)
});
this.search_results.bind("mouseout.chosen",function(l){k.search_results_mouseout(l)
});
this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(l){k.search_results_mousewheel(l)
});
this.search_results.bind("touchstart.chosen",function(l){k.search_results_touchstart(l)
});
this.search_results.bind("touchmove.chosen",function(l){k.search_results_touchmove(l)
});
this.search_results.bind("touchend.chosen",function(l){k.search_results_touchend(l)
});
this.form_field_jq.bind("chosen:updated.chosen",function(l){k.results_update_field(l)
});
this.form_field_jq.bind("chosen:activate.chosen",function(l){k.activate_field(l)
});
this.form_field_jq.bind("chosen:open.chosen",function(l){k.container_mousedown(l)
});
this.form_field_jq.bind("chosen:close.chosen",function(l){k.input_blur(l)
});
this.search_field.bind("blur.chosen",function(l){k.input_blur(l)
});
this.search_field.bind("keyup.chosen",function(l){k.keyup_checker(l)
});
this.search_field.bind("keydown.chosen",function(l){k.keydown_checker(l)
});
this.search_field.bind("focus.chosen",function(l){k.input_focus(l)
});
this.search_field.bind("cut.chosen",function(l){k.clipboard_event_checker(l)
});
this.search_field.bind("paste.chosen",function(l){k.clipboard_event_checker(l)
});
if(this.is_multiple){return this.search_choices.bind("click.chosen",function(l){k.choices_click(l)
})
}else{return this.container.bind("click.chosen",function(l){l.preventDefault()
})
}};
j.prototype.destroy=function(){f(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action);
if(this.search_field[0].tabIndex){this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex
}this.container.remove();
this.form_field_jq.removeData("chosen");
return this.form_field_jq.show()
};
j.prototype.search_field_disabled=function(){this.is_disabled=this.form_field_jq[0].disabled;
if(this.is_disabled){this.container.addClass("chzn-disabled");
this.search_field[0].disabled=true;
if(!this.is_multiple){this.selected_item.unbind("focus.chosen",this.activate_action)
}return this.close_field()
}else{this.container.removeClass("chzn-disabled");
this.search_field[0].disabled=false;
if(!this.is_multiple){return this.selected_item.bind("focus.chosen",this.activate_action)
}}};
j.prototype.container_mousedown=function(k){if(!this.is_disabled){if(k&&k.type==="mousedown"&&!this.results_showing){k.preventDefault()
}if(!((k!=null)&&(f(k.target)).hasClass("search-choice-close"))){if(!this.active_field&&!this.multiple_always_open){if(this.is_multiple){this.search_field.val("")
}f(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action);
this.results_show()
}else{if(!this.is_multiple&&k&&((f(k.target)[0]===this.selected_item[0])||f(k.target).parents("a.chzn-single").length)){k.preventDefault();
this.results_toggle()
}}return this.activate_field()
}}};
j.prototype.container_mouseup=function(k){if(k.target.nodeName==="ABBR"&&!this.is_disabled){return this.results_reset(k)
}};
j.prototype.search_results_mousewheel=function(k){var l;
if(k.originalEvent){l=k.originalEvent.deltaY||-k.originalEvent.wheelDelta||k.originalEvent.detail
}if(l!=null){k.preventDefault();
if(k.type==="DOMMouseScroll"){l=l*40
}return this.search_results.scrollTop(l+this.search_results.scrollTop())
}};
j.prototype.blur_test=function(k){if(!this.active_field&&this.container.hasClass("chzn-container-active")){return this.close_field()
}};
j.prototype.close_field=function(){f(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action);
this.active_field=false;
this.results_hide();
this.container.removeClass("chzn-container-active");
this.clear_backstroke();
this.show_search_field_default();
return this.search_field_scale()
};
j.prototype.activate_field=function(){this.container.addClass("chzn-container-active");
this.active_field=true;
this.search_field.val(this.search_field.val());
return this.search_field.focus()
};
j.prototype.test_active_click=function(k){var l;
l=f(k.target).closest(".chzn-container");
if(l.length&&this.container[0]===l[0]){return this.active_field=true
}else{return this.close_field()
}};
j.prototype.results_build=function(){this.parsing=true;
this.selected_option_count=null;
this.results_data=d.select_to_array(this.form_field);
if(this.is_multiple){this.search_choices.find("li.search-choice").remove()
}else{if(!this.is_multiple){this.single_set_selected_text();
if(this.disable_search||this.form_field.options.length<=this.disable_search_threshold){this.search_field[0].readOnly=true;
this.container.addClass("chzn-container-single-nosearch")
}else{this.search_field[0].readOnly=false;
this.container.removeClass("chzn-container-single-nosearch")
}}}this.update_results_content(this.results_option_build({first:true}));
this.search_field_disabled();
this.show_search_field_default();
this.search_field_scale();
return this.parsing=false
};
j.prototype.result_do_highlight=function(l){var p,o,m,n,k;
if(l.length){this.result_clear_highlight();
this.result_highlight=l;
this.result_highlight.addClass("highlighted");
m=parseInt(this.search_results.css("maxHeight"),10);
k=this.search_results.scrollTop();
n=m+k;
o=this.result_highlight.position().top+this.search_results.scrollTop();
p=o+this.result_highlight.outerHeight();
if(p>=n){return this.search_results.scrollTop((p-m)>0?p-m:0)
}else{if(o<k){return this.search_results.scrollTop(o)
}}}};
j.prototype.result_clear_highlight=function(){if(this.result_highlight){this.result_highlight.removeClass("highlighted")
}return this.result_highlight=null
};
j.prototype.results_show=function(){if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field_jq.trigger("chosen:maxselected",{chosen:this});
return false
}this.container.addClass("chzn-with-drop");
this.results_showing=true;
this.search_field.focus();
this.search_field.val(this.search_field.val());
this.winnow_results();
return this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this})
};
j.prototype.update_results_content=function(k){return this.search_results.html(k)
};
j.prototype.results_hide=function(){if(this.options.multiple_always_open){return
}if(this.results_showing){this.result_clear_highlight();
this.container.removeClass("chzn-with-drop");
this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})
}return this.results_showing=false
};
j.prototype.set_tab_index=function(l){var k;
if(this.form_field.tabIndex){k=this.form_field.tabIndex;
this.form_field.tabIndex=-1;
return this.search_field[0].tabIndex=k
}};
j.prototype.set_label_behavior=function(){var k=this;
this.form_field_label=this.form_field_jq.parents("label");
if(!this.form_field_label.length&&this.form_field.id.length){this.form_field_label=f("label[for='"+this.form_field.id+"']")
}if(this.form_field_label.length>0){return this.form_field_label.bind("click.chosen",function(l){if(k.is_multiple){return k.container_mousedown(l)
}else{return k.activate_field()
}})
}};
j.prototype.show_search_field_default=function(){if(this.is_multiple&&this.choices_count()<1&&!this.active_field){if(!this.options.multiple_always_open){this.search_field.val(this.default_text)
}return this.search_field.addClass("default")
}else{this.search_field.val("");
return this.search_field.removeClass("default")
}};
j.prototype.search_results_mouseup=function(k){var l;
l=f(k.target).hasClass("active-result")?f(k.target):f(k.target).parents(".active-result").first();
if(l.length){this.result_highlight=l;
this.result_select(k);
return this.search_field.focus()
}};
j.prototype.search_results_mouseover=function(k){var l;
l=f(k.target).hasClass("active-result")?f(k.target):f(k.target).parents(".active-result").first();
if(l){return this.result_do_highlight(l)
}};
j.prototype.search_results_mouseout=function(k){if(f(k.target).hasClass("active-result"||f(k.target).parents(".active-result").first())){return this.result_clear_highlight()
}};
j.prototype.choice_build=function(l){var k,m,n=this;
k=f("<li />",{"class":"search-choice"}).html("<span>"+(this.choice_label(l))+"</span>");
if(l.disabled){k.addClass("search-choice-disabled")
}else{m=f("<a />",{"class":"search-choice-close","data-option-array-index":l.array_index});
m.bind("click.chosen",function(o){return n.choice_destroy_link_click(o)
});
k.append(m)
}return this.search_container.before(k)
};
j.prototype.choice_destroy_link_click=function(k){k.preventDefault();
k.stopPropagation();
if(!this.is_disabled){return this.choice_destroy(f(k.target))
}};
j.prototype.choice_destroy=function(k){if(this.result_deselect(k[0].getAttribute("data-option-array-index"))){if(!this.options.multiple_always_open){this.show_search_field_default();
if(this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1){this.results_hide()
}}if(this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1){this.results_hide()
}k.parents("li").first().remove();
if(this.options.multiple_always_open){this.search_field.focus()
}return this.search_field_scale()
}};
j.prototype.results_reset=function(){this.reset_single_select_options();
this.form_field.options[0].selected=true;
this.single_set_selected_text();
this.show_search_field_default();
this.results_reset_cleanup();
this.form_field_jq.trigger("change");
if(this.active_field){return this.results_hide()
}};
j.prototype.results_reset_cleanup=function(){this.current_selectedIndex=this.form_field.selectedIndex;
return this.selected_item.find("abbr").remove()
};
j.prototype.result_select=function(k){var m,l;
if(this.result_highlight){m=this.result_highlight;
this.result_clear_highlight();
if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field_jq.trigger("chosen:maxselected",{chosen:this});
return false
}if(this.is_multiple){m.removeClass("active-result")
}else{this.reset_single_select_options()
}m.addClass("result-selected");
l=this.results_data[m[0].getAttribute("data-option-array-index")];
l.selected=true;
this.form_field.options[l.options_index].selected=true;
this.selected_option_count=null;
if(this.is_multiple){this.choice_build(l)
}else{this.single_set_selected_text(this.choice_label(l))
}if(!((k.metaKey||k.ctrlKey)&&this.is_multiple)){this.results_hide()
}this.search_field.val("");
if(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex){this.form_field_jq.trigger("change",{selected:this.form_field.options[l.options_index].value})
}this.current_selectedIndex=this.form_field.selectedIndex;
k.preventDefault();
return this.search_field_scale()
}};
j.prototype.single_set_selected_text=function(k){if(k==null){k=this.default_text
}if(k===this.default_text){this.selected_item.addClass("chzn-default")
}else{this.single_deselect_control_build();
this.selected_item.removeClass("chzn-default")
}return this.selected_item.find("span").html(k)
};
j.prototype.result_deselect=function(l){var k;
k=this.results_data[l];
if(!this.form_field.options[k.options_index].disabled){k.selected=false;
this.form_field.options[k.options_index].selected=false;
this.selected_option_count=null;
this.result_clear_highlight();
if(this.results_showing){this.winnow_results()
}this.form_field_jq.trigger("change",{deselected:this.form_field.options[k.options_index].value});
this.search_field_scale();
return true
}else{return false
}};
j.prototype.single_deselect_control_build=function(){if(!this.allow_single_deselect){return
}if(!this.selected_item.find("abbr").length){this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>')
}return this.selected_item.addClass("chzn-single-with-deselect")
};
j.prototype.get_search_text=function(){return f("<div/>").text(f.trim(this.search_field.val())).html()
};
j.prototype.winnow_results_set_highlight=function(){var k,l;
l=!this.is_multiple?this.search_results.find(".result-selected.active-result"):[];
k=l.length?l.first():this.search_results.find(".active-result").first();
if(k!=null){return this.result_do_highlight(k)
}};
j.prototype.no_results=function(k){var l;
l=f('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>');
l.find("span").first().html(k);
this.search_results.append(l);
return this.form_field_jq.trigger("chosen:no_results",{chosen:this})
};
j.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()
};
j.prototype.keydown_arrow=function(){var k;
if(this.results_showing&&this.result_highlight){k=this.result_highlight.nextAll("li.active-result").first();
if(k){return this.result_do_highlight(k)
}}else{return this.results_show()
}};
j.prototype.keyup_arrow=function(){var k;
if(!this.results_showing&&!this.is_multiple){return this.results_show()
}else{if(this.result_highlight){k=this.result_highlight.prevAll("li.active-result");
if(k.length){return this.result_do_highlight(k.first())
}else{if(this.choices_count()>0){this.results_hide()
}return this.result_clear_highlight()
}}}};
j.prototype.key_tab=function(l){var k;
if(this.results_showing&&this.result_highlight){l.preventDefault();
k=this.result_highlight.nextAll("li.active-result").first();
if(k.length){return this.result_do_highlight(k)
}else{var m=this.search_results.find(".active-result").first();
return this.result_do_highlight(m)
}}};
j.prototype.key_tab_shift=function(m){var l;
if(this.results_showing&&this.result_highlight){m.preventDefault();
prev_sib=this.result_highlight.prevAll("li.active-result").first();
if(prev_sib.length){return this.result_do_highlight(prev_sib)
}else{var k=this.search_results.find(".active-result").last();
return this.result_do_highlight(k)
}}};
j.prototype.keydown_backstroke=function(){var k;
if(this.pending_backstroke){this.choice_destroy(this.pending_backstroke.find("a").first());
return this.clear_backstroke()
}else{k=this.search_container.siblings("li.search-choice").last();
if(k.length&&!k.hasClass("search-choice-disabled")){this.pending_backstroke=k;
if(this.single_backstroke_delete){return this.keydown_backstroke()
}else{return this.pending_backstroke.addClass("search-choice-focus")
}}}};
j.prototype.clear_backstroke=function(){if(this.pending_backstroke){this.pending_backstroke.removeClass("search-choice-focus")
}return this.pending_backstroke=null
};
j.prototype.keydown_checker=function(l){var m,k;
m=(k=l.which)!=null?k:l.keyCode;
this.search_field_scale();
if(m!==8&&this.pending_backstroke){this.clear_backstroke()
}switch(m){case 8:this.backstroke_length=this.search_field.val().length;
break;
case 9:if(l.shiftKey){this.key_tab_shift(l)
}else{this.key_tab(l)
}break;
case 13:if(this.results_showing){l.preventDefault()
}break;
case 32:if(this.disable_search){l.preventDefault()
}break;
case 38:l.preventDefault();
this.keyup_arrow();
break;
case 40:l.preventDefault();
this.keydown_arrow();
break
}};
j.prototype.search_field_scale=function(){var k,o,n,l,r,s,q,m,p;
if(this.is_multiple){n=0;
q=0;
r="position:absolute; left: -1000px; top: -1000px; display:none;";
s=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"];
for(m=0,p=s.length;
m<p;
m++){l=s[m];
r+=l+":"+this.search_field.css(l)+";"
}k=f("<div />",{style:r});
k.text(this.search_field.val());
f("body").append(k);
q=k.width()+25;
k.remove();
o=this.container.outerWidth();
if(q>o-10){q=o-10
}return this.search_field.css({width:q+"px"})
}};
return j
})(a)
}).call(this);
(function(e,h,k,d){var c=e(h);
var f={};
var b={innerHeight:null,scrollTop:null,scrollLeft:null};
var a=0;
var n=false;
var g=0;
function m(){b.innerHeight=h.innerHeight||c.height();
b.scrollTop=c.scrollTop();
b.scrollLeft=c.scrollLeft()
}function j(){b.scrollLeft=c.scrollLeft();
b.scrollTop=c.scrollTop()
}function q(){if(n){return
}c.bind("scroll",j);
c.bind("resize",m);
j();
m();
n=true
}function o(){if(!n){return
}n=false;
c.unbind("scroll",j);
c.unbind("resize",m)
}function l(){q();
a++
}function p(){a=Math.max(0,a-1);
if(a===0){o()
}}e.fn.lazyload=function(G){var r=this;
var E;
var A;
var v=null;
var D={width:null,height:null};
var w={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:h,data_attribute:"original",skip_invisible:(G&&G.skip_invisible!==d?G.skip_invisible:true),ignore_when_hidden_element:(G&&G.ignore_when_hidden_element?G.ignore_when_hidden_element:null),check_horizontal_offscreen:(G&&G.check_horizontal_offscreen!==d?G.check_horizontal_offscreen:false),all_images_same_size:(G&&G.all_images_same_size!==d?G.all_images_same_size:false),appear:null,load:null,placeholder:null};
l();
G=G||{};
G.throttle=(G.throttle||125);
function B(){if(!E||!E.length){return
}if(h.TS===d||!G.throttle){C(true);
return x()
}else{TS.utility.throttle.method(function(){C(true);
x()
},"jquery_lazyload",G.throttle)
}}function C(H){if(!E||!E.length){return
}if(!v||H){v={container_offset:E.offset(),container_width:E.width(),container_height:E.height()}
}return v
}function u(I,L,K,J){var H;
if(L.container===d||L.container===h){H=b.scrollTop+b.innerHeight
}else{H=J.container_offset.top+J.container_height
}return H<=K.top-L.threshold
}function F(I,L,K,J){var H;
if(L.container===d||L.container===h){H=b.width+b.scrollLeft
}else{H=J.container_offset.left+J.container_width
}return H<=K.left-L.threshold
}function z(I,L,K,J){var H;
if(L.container===d||L.container===h){H=b.scrollTop
}else{H=J.container_offset.top
}return H>=K.top+L.threshold+(D.height||e(I).height())
}function t(I,L,K,J){var H;
if(L.container===d||L.container===h){H=b.scrollLeft
}else{H=J.container_offset.left
}return H>=K.left+L.threshold+(D.width||e(I).width())
}function x(){var H=0;
var I=0;
var J;
if((!r||!r.each||!r.length)){y();
return false
}J=r.length;
if(w.skip_invisible){if(A&&A[0]&&(!A[0].offsetWidth||!A[0].offsetHeight)){return
}else{if(E[0]&&E[0]!==h&&(!E[0].offsetWidth||!E[0].offsetHeight)){return
}}}if(w.all_images_same_size&&!D.width&&r&&r[0]){D.width=e(r[0]).width();
D.height=e(r[0]).height()
}v=C();
r.each(function(K){var M=e(this);
if(w.skip_invisible&&(!M[0].offsetWidth||!M[0].offsetHeight)){M=null;
return
}var L=M.offset();
if(z(this,w,L,v)||(w.check_horizontal_offscreen&&t(this,w,L,v))){}else{if(!u(this,w,L,v)&&(!w.check_horizontal_offscreen||!F(this,w,L,v))){M.trigger("appear");
H=0
}else{if(++H>w.failure_limit){M=null;
return false
}}}M=null
})
}function y(){if(E&&r){E.unbind(w.event+".lazyload");
c.unbind("resize",B);
c.unbind("resize-immediate",x);
r.each(function(){e(this).unbind()
})
}E=null;
A=null;
r=null;
p()
}function s(H){if(!r){return
}r=r.not(H);
if(!r.length){y()
}}if(G){e.extend(w,G)
}E=(w.container===d||w.container===h)?c:e(w.container);
A=w.ignore_when_hidden_element;
if(w.event.indexOf("scroll")===0){E.bind(w.event+".lazyload",B)
}this.each(function(){var H=this;
var K=e(H);
var J=K.attr("src");
var L=K.attr("data-"+w.data_attribute);
H.loaded=false;
function I(){var M;
if(K.is("img")){K.attr("src",L)
}else{if(L.indexOf("url(")!==-1){K.css("background-image",L)
}else{K.css("background-image","url('"+L+"')")
}}H.loaded=true;
if(r){M=e.grep(r,function(O){return !O.loaded
});
r=e(M)
}f[L]=true;
if(w.load&&r){var N=r.length;
w.load.call(H,N,w)
}K.trigger("lazyloaded")
}K.one("appear",function(){if(!this.loaded){if(w.appear){if(r){var N=r.length;
w.appear.call(H,N,w)
}}if(L.indexOf("url(")!==-1){I()
}else{var M=e(new Image());
M.one("load",I);
M.attr("src",L)
}}});
if(J===d||J===false){if(K.is("img")){if(f[L]){K.trigger("appear")
}else{if(w.placeholder){K.attr("src",w.placeholder)
}}}}else{if(f[L]){K.trigger("appear")
}}if(w.event.indexOf("scroll")!==0){K.bind(w.event,function(){if(!H.loaded){K.trigger("appear")
}})
}});
c.bind("resize",B);
c.bind("resize-immediate",x);
if((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)){c.bind("pageshow",function(H){if(H.originalEvent&&H.originalEvent.persisted){r.each(function(){e(this).trigger("appear")
})
}})
}e(k).ready(B);
this.detachEvents=y;
this.detachSome=s;
return this
}
})(jQuery,window,document);
/*!

 handlebars v3.0.3

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(a,b){if(typeof exports==="object"&&typeof module==="object"){module.exports=b()
}else{if(typeof define==="function"&&define.amd){define(b)
}else{if(typeof exports==="object"){exports.Handlebars=b()
}else{a.Handlebars=b()
}}}})(this,function(){return(function(a){var b={};
function c(e){if(b[e]){return b[e].exports
}var d=b[e]={exports:{},id:e,loaded:false};
a[e].call(d.exports,d,d.exports,c);
d.loaded=true;
return d.exports
}c.m=a;
c.c=b;
c.p="";
return c(0)
})([function(b,t,c){var a=c(8)["default"];
t.__esModule=true;
var e=c(1);
var j=a(e);
var m=c(2);
var o=a(m);
var f=c(3);
var p=c(4);
var l=c(5);
var n=a(l);
var r=c(6);
var g=a(r);
var s=c(7);
var h=a(s);
var q=j["default"].create;
function k(){var u=q();
u.compile=function(v,w){return p.compile(v,w,u)
};
u.precompile=function(v,w){return p.precompile(v,w,u)
};
u.AST=o["default"];
u.Compiler=p.Compiler;
u.JavaScriptCompiler=n["default"];
u.Parser=f.parser;
u.parse=f.parse;
return u
}var d=k();
d.create=k;
h["default"](d);
d.Visitor=g["default"];
d["default"]=d;
t["default"]=d;
b.exports=t["default"]
},function(b,t,d){var s=d(9)["default"];
var a=d(8)["default"];
t.__esModule=true;
var q=d(10);
var f=s(q);
var o=d(11);
var r=a(o);
var n=d(12);
var j=a(n);
var l=d(13);
var c=s(l);
var k=d(14);
var m=s(k);
var p=d(7);
var g=a(p);
function h(){var u=new f.HandlebarsEnvironment();
c.extend(u,f);
u.SafeString=r["default"];
u.Exception=j["default"];
u.Utils=c;
u.escapeExpression=c.escapeExpression;
u.VM=m;
u.template=function(v){return m.template(v,u)
};
return u
}var e=h();
e.create=h;
g["default"](e);
e["default"]=e;
t["default"]=e;
b.exports=t["default"]
},function(a,w,b){w.__esModule=true;
var k={Program:function u(x,A,z,y){this.loc=y;
this.type="Program";
this.body=x;
this.blockParams=A;
this.strip=z
},MustacheStatement:function d(B,C,A,z,y,x){this.loc=x;
this.type="MustacheStatement";
this.path=B;
this.params=C||[];
this.hash=A;
this.escaped=z;
this.strip=y
},BlockStatement:function v(F,z,B,C,A,y,x,E,D){this.loc=D;
this.type="BlockStatement";
this.path=F;
this.params=z||[];
this.hash=B;
this.program=C;
this.inverse=A;
this.openStrip=y;
this.inverseStrip=x;
this.closeStrip=E
},PartialStatement:function m(x,B,A,z,y){this.loc=y;
this.type="PartialStatement";
this.name=x;
this.params=B||[];
this.hash=A;
this.indent="";
this.strip=z
},ContentStatement:function r(x,y){this.loc=y;
this.type="ContentStatement";
this.original=this.value=x
},CommentStatement:function n(z,y,x){this.loc=x;
this.type="CommentStatement";
this.value=z;
this.strip=y
},SubExpression:function q(z,A,y,x){this.loc=x;
this.type="SubExpression";
this.path=z;
this.params=A||[];
this.hash=y
},PathExpression:function c(z,B,A,y,x){this.loc=x;
this.type="PathExpression";
this.data=z;
this.original=y;
this.parts=A;
this.depth=B
},StringLiteral:function p(x,y){this.loc=y;
this.type="StringLiteral";
this.original=this.value=x
},NumberLiteral:function s(y,x){this.loc=x;
this.type="NumberLiteral";
this.original=this.value=Number(y)
},BooleanLiteral:function j(x,y){this.loc=y;
this.type="BooleanLiteral";
this.original=this.value=x==="true"
},UndefinedLiteral:function o(x){this.loc=x;
this.type="UndefinedLiteral";
this.original=this.value=undefined
},NullLiteral:function h(x){this.loc=x;
this.type="NullLiteral";
this.original=this.value=null
},Hash:function e(y,x){this.loc=x;
this.type="Hash";
this.pairs=y
},HashPair:function g(y,z,x){this.loc=x;
this.type="HashPair";
this.key=y;
this.value=z
},helpers:{helperExpression:function l(x){return !!(x.type==="SubExpression"||x.params.length||x.hash)
},scopedId:function f(x){return/^\.|this\b/.test(x.original)
},simpleId:function t(x){return x.parts.length===1&&!k.helpers.scopedId(x)&&!x.depth
}}};
w["default"]=k;
a.exports=w["default"]
},function(c,e,b){var q=b(8)["default"];
var h=b(9)["default"];
e.__esModule=true;
e.parse=d;
var j=b(15);
var l=q(j);
var o=b(2);
var g=q(o);
var k=b(16);
var p=q(k);
var f=b(17);
var n=h(f);
var a=b(13);
e.parser=l["default"];
var m={};
a.extend(m,n,g["default"]);
function d(r,s){if(r.type==="Program"){return r
}l["default"].yy=m;
m.locInfo=function(u){return new m.SourceLocation(s&&s.srcName,u)
};
var t=new p["default"]();
return t.accept(l["default"].parse(r))
}},function(c,H,h){var Q=h(8)["default"];
H.__esModule=true;
H.Compiler=w;
H.precompile=P;
H.compile=j;
var m=h(12);
var F=Q(m);
var a=h(13);
var t=h(2);
var d=Q(t);
var p=[].slice;
function w(){}w.prototype={compiler:w,equals:function v(S){var R=this.opcodes.length;
if(S.opcodes.length!==R){return false
}for(var U=0;
U<R;
U++){var V=this.opcodes[U],T=S.opcodes[U];
if(V.opcode!==T.opcode||!u(V.args,T.args)){return false
}}R=this.children.length;
for(var U=0;
U<R;
U++){if(!this.children[U].equals(S.children[U])){return false
}}return true
},guid:0,compile:function j(S,T){this.sourceNode=[];
this.opcodes=[];
this.children=[];
this.options=T;
this.stringParams=T.stringParams;
this.trackIds=T.trackIds;
T.blockParams=T.blockParams||[];
var U=T.knownHelpers;
T.knownHelpers={helperMissing:true,blockHelperMissing:true,each:true,"if":true,unless:true,"with":true,log:true,lookup:true};
if(U){for(var R in U){if(R in U){T.knownHelpers[R]=U[R]
}}}return this.accept(S)
},compileProgram:function o(S){var U=new this.compiler(),R=U.compile(S,this.options),T=this.guid++;
this.usePartial=this.usePartial||R.usePartial;
this.children[T]=R;
this.useDepths=this.useDepths||R.useDepths;
return T
},accept:function e(S){this.sourceNode.unshift(S);
var R=this[S.type](S);
this.sourceNode.shift();
return R
},Program:function O(S){this.options.blockParams.unshift(S.blockParams);
var R=S.body,U=R.length;
for(var T=0;
T<U;
T++){this.accept(R[T])
}this.options.blockParams.shift();
this.isSimple=U===1;
this.blockParams=S.blockParams?S.blockParams.length:0;
return this
},BlockStatement:function N(U){f(U);
var S=U.program,R=U.inverse;
S=S&&this.compileProgram(S);
R=R&&this.compileProgram(R);
var T=this.classifySexpr(U);
if(T==="helper"){this.helperSexpr(U,S,R)
}else{if(T==="simple"){this.simpleSexpr(U);
this.opcode("pushProgram",S);
this.opcode("pushProgram",R);
this.opcode("emptyHash");
this.opcode("blockValue",U.path.original)
}else{this.ambiguousSexpr(U,S,R);
this.opcode("pushProgram",S);
this.opcode("pushProgram",R);
this.opcode("emptyHash");
this.opcode("ambiguousBlockValue")
}}this.opcode("append")
},PartialStatement:function J(T){this.usePartial=true;
var V=T.params;
if(V.length>1){throw new F["default"]("Unsupported number of partial arguments: "+V.length,T)
}else{if(!V.length){V.push({type:"PathExpression",parts:[],depth:0})
}}var U=T.name.original,S=T.name.type==="SubExpression";
if(S){this.accept(T.name)
}this.setupFullMustacheParams(T,undefined,undefined,true);
var R=T.indent||"";
if(this.options.preventIndent&&R){this.opcode("appendContent",R);
R=""
}this.opcode("invokePartial",S,U,R);
this.opcode("append")
},MustacheStatement:function y(R){this.SubExpression(R);
if(R.escaped&&!this.options.noEscape){this.opcode("appendEscaped")
}else{this.opcode("append")
}},ContentStatement:function g(R){if(R.value){this.opcode("appendContent",R.value)
}},CommentStatement:function x(){},SubExpression:function G(S){f(S);
var R=this.classifySexpr(S);
if(R==="simple"){this.simpleSexpr(S)
}else{if(R==="helper"){this.helperSexpr(S)
}else{this.ambiguousSexpr(S)
}}},ambiguousSexpr:function s(V,T,S){var W=V.path,U=W.parts[0],R=T!=null||S!=null;
this.opcode("getContext",W.depth);
this.opcode("pushProgram",T);
this.opcode("pushProgram",S);
this.accept(W);
this.opcode("invokeAmbiguous",U,R)
},simpleSexpr:function D(R){this.accept(R.path);
this.opcode("resolvePossibleLambda")
},helperSexpr:function q(U,S,R){var W=this.setupFullMustacheParams(U,S,R),V=U.path,T=V.parts[0];
if(this.options.knownHelpers[T]){this.opcode("invokeKnownHelper",W.length,T)
}else{if(this.options.knownHelpersOnly){throw new F["default"]("You specified knownHelpersOnly, but used the unknown helper "+T,U)
}else{V.falsy=true;
this.accept(V);
this.opcode("invokeHelper",W.length,V.original,d["default"].helpers.simpleId(V))
}}},PathExpression:function b(S){this.addDepth(S.depth);
this.opcode("getContext",S.depth);
var R=S.parts[0],U=d["default"].helpers.scopedId(S),T=!S.depth&&!U&&this.blockParamIndex(R);
if(T){this.opcode("lookupBlockParam",T,S.parts)
}else{if(!R){this.opcode("pushContext")
}else{if(S.data){this.options.data=true;
this.opcode("lookupData",S.depth,S.parts)
}else{this.opcode("lookupOnContext",S.parts,S.falsy,U)
}}}},StringLiteral:function k(R){this.opcode("pushString",R.value)
},NumberLiteral:function B(R){this.opcode("pushLiteral",R.value)
},BooleanLiteral:function L(R){this.opcode("pushLiteral",R.value)
},UndefinedLiteral:function l(){this.opcode("pushLiteral","undefined")
},NullLiteral:function M(){this.opcode("pushLiteral","null")
},Hash:function A(U){var T=U.pairs,S=0,R=T.length;
this.opcode("pushHash");
for(;
S<R;
S++){this.pushParam(T[S].value)
}while(S--){this.opcode("assignToHash",T[S].key)
}this.opcode("popHash")
},opcode:function C(R){this.opcodes.push({opcode:R,args:p.call(arguments,1),loc:this.sourceNode[0].loc})
},addDepth:function r(R){if(!R){return
}this.useDepths=true
},classifySexpr:function I(U){var V=d["default"].helpers.simpleId(U.path);
var W=V&&!!this.blockParamIndex(U.path.parts[0]);
var T=!W&&d["default"].helpers.helperExpression(U);
var X=!W&&(T||V);
if(X&&!T){var R=U.path.parts[0],S=this.options;
if(S.knownHelpers[R]){T=true
}else{if(S.knownHelpersOnly){X=false
}}}if(T){return"helper"
}else{if(X){return"ambiguous"
}else{return"simple"
}}},pushParams:function K(T){for(var S=0,R=T.length;
S<R;
S++){this.pushParam(T[S])
}},pushParam:function E(U){var T=U.value!=null?U.value:U.original||"";
if(this.stringParams){if(T.replace){T=T.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")
}if(U.depth){this.addDepth(U.depth)
}this.opcode("getContext",U.depth||0);
this.opcode("pushStringParam",T,U.type);
if(U.type==="SubExpression"){this.accept(U)
}}else{if(this.trackIds){var S=undefined;
if(U.parts&&!d["default"].helpers.scopedId(U)&&!U.depth){S=this.blockParamIndex(U.parts[0])
}if(S){var R=U.parts.slice(1).join(".");
this.opcode("pushId","BlockParam",S,R)
}else{T=U.original||T;
if(T.replace){T=T.replace(/^\.\//g,"").replace(/^\.$/g,"")
}this.opcode("pushId",U.type,T)
}}this.accept(U)
}},setupFullMustacheParams:function z(U,S,R,T){var V=U.params;
this.pushParams(V);
this.opcode("pushProgram",S);
this.opcode("pushProgram",R);
if(U.hash){this.accept(U.hash)
}else{this.opcode("emptyHash",T)
}return V
},blockParamIndex:function n(S){for(var V=0,R=this.options.blockParams.length;
V<R;
V++){var T=this.options.blockParams[V],U=T&&a.indexOf(T,S);
if(T&&U>=0){return[V,U]
}}}};
function P(T,U,V){if(T==null||typeof T!=="string"&&T.type!=="Program"){throw new F["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+T)
}U=U||{};
if(!("data" in U)){U.data=true
}if(U.compat){U.useDepths=true
}var S=V.parse(T,U),R=new V.Compiler().compile(S,U);
return new V.JavaScriptCompiler().compile(R,U)
}function j(R,U,V){var T=arguments[1]===undefined?{}:arguments[1];
if(R==null||typeof R!=="string"&&R.type!=="Program"){throw new F["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+R)
}if(!("data" in T)){T.data=true
}if(T.compat){T.useDepths=true
}var X=undefined;
function W(){var aa=V.parse(R,T),Z=new V.Compiler().compile(aa,T),Y=new V.JavaScriptCompiler().compile(Z,T,undefined,true);
return V.template(Y)
}function S(Y,Z){if(!X){X=W()
}return X.call(this,Y,Z)
}S._setup=function(Y){if(!X){X=W()
}return X._setup(Y)
};
S._child=function(Y,aa,Z,ab){if(!X){X=W()
}return X._child(Y,aa,Z,ab)
};
return S
}function u(S,R){if(S===R){return true
}if(a.isArray(S)&&a.isArray(R)&&S.length===R.length){for(var T=0;
T<S.length;
T++){if(!u(S[T],R[T])){return false
}}return true
}}function f(S){if(!S.path.parts){var R=S.path;
S.path=new d["default"].PathExpression(false,0,[R.original+""],R.original+"",R.loc)
}}},function(f,af,p){var ao=p(8)["default"];
af.__esModule=true;
var I=p(10);
var y=p(12);
var ae=ao(y);
var am=p(13);
var Q=p(18);
var aq=ao(Q);
function j(ar){this.value=ar
}function b(){}b.prototype={nameLookup:function M(at,ar){if(b.isValidJavaScriptVariableName(ar)){return[at,".",ar]
}else{return[at,"['",ar,"']"]
}},depthedLookup:function N(ar){return[this.aliasable("this.lookup"),'(depths, "',ar,'")']
},compilerInfo:function A(){var at=I.COMPILER_REVISION,ar=I.REVISION_CHANGES[at];
return[at,ar]
},appendToBuffer:function al(au,ar,at){if(!am.isArray(au)){au=[au]
}au=this.source.wrap(au,ar);
if(this.environment.isSimple){return["return ",au,";"]
}else{if(at){return["buffer += ",au,";"]
}else{au.appendToBuffer=true;
return au
}}},initializeBuffer:function ai(){return this.quotedString("")
},compile:function q(av,aD,ar,ay){this.environment=av;
this.options=aD;
this.stringParams=this.options.stringParams;
this.trackIds=this.options.trackIds;
this.precompile=!ay;
this.name=this.environment.name;
this.isChild=!!ar;
this.context=ar||{programs:[],environments:[]};
this.preamble();
this.stackSlot=0;
this.stackVars=[];
this.aliases={};
this.registers={list:[]};
this.hashes=[];
this.compileStack=[];
this.inlineStack=[];
this.blockParams=[];
this.compileChildren(av,aD);
this.useDepths=this.useDepths||av.useDepths||this.options.compat;
this.useBlockParams=this.useBlockParams||av.useBlockParams;
var aA=av.opcodes,aw=undefined,aC=undefined,ax=undefined,au=undefined;
for(ax=0,au=aA.length;
ax<au;
ax++){aw=aA[ax];
this.source.currentLocation=aw.loc;
aC=aC||aw.loc;
this[aw.opcode].apply(this,aw.args)
}this.source.currentLocation=aC;
this.pushSource("");
if(this.stackSlot||this.inlineStack.length||this.compileStack.length){throw new ae["default"]("Compile completed with content left on stack")
}var aB=this.createFunctionContext(ay);
if(!this.isChild){var az={compiler:this.compilerInfo(),main:aB};
var at=this.context.programs;
for(ax=0,au=at.length;
ax<au;
ax++){if(at[ax]){az[ax]=at[ax]
}}if(this.environment.usePartial){az.usePartial=true
}if(this.options.data){az.useData=true
}if(this.useDepths){az.useDepths=true
}if(this.useBlockParams){az.useBlockParams=true
}if(this.options.compat){az.compat=true
}if(!ay){az.compiler=JSON.stringify(az.compiler);
this.source.currentLocation={start:{line:1,column:0}};
az=this.objectLiteral(az);
if(aD.srcName){az=az.toStringWithSourceMap({file:aD.destName});
az.map=az.map&&az.map.toString()
}else{az=az.toString()
}}else{az.compilerOptions=this.options
}return az
}else{return aB
}},preamble:function W(){this.lastContext=0;
this.source=new aq["default"](this.options.srcName)
},createFunctionContext:function ak(at){var ay="";
var ax=this.stackVars.concat(this.registers.list);
if(ax.length>0){ay+=", "+ax.join(", ")
}var aw=0;
for(var ar in this.aliases){var au=this.aliases[ar];
if(this.aliases.hasOwnProperty(ar)&&au.children&&au.referenceCount>1){ay+=", alias"+ ++aw+"="+ar;
au.children[0]="alias"+aw
}}var az=["depth0","helpers","partials","data"];
if(this.useBlockParams||this.useDepths){az.push("blockParams")
}if(this.useDepths){az.push("depths")
}var av=this.mergeSource(ay);
if(at){az.push(av);
return Function.apply(this,az)
}else{return this.source.wrap(["function(",az.join(","),") {\n  ",av,"}"])
}},mergeSource:function D(ax){var av=this.environment.isSimple,au=!this.forceBuffer,ar=undefined,at=undefined,aw=undefined,ay=undefined;
this.source.each(function(az){if(az.appendToBuffer){if(aw){az.prepend("  + ")
}else{aw=az
}ay=az
}else{if(aw){if(!at){ar=true
}else{aw.prepend("buffer += ")
}ay.add(";");
aw=ay=undefined
}at=true;
if(!av){au=false
}}});
if(au){if(aw){aw.prepend("return ");
ay.add(";")
}else{if(!at){this.source.push('return "";')
}}}else{ax+=", buffer = "+(ar?"":this.initializeBuffer());
if(aw){aw.prepend("return buffer + ");
ay.add(";")
}else{this.source.push("return buffer;")
}}if(ax){this.source.prepend("var "+ax.substring(2)+(ar?"":";\n"))
}return this.source.merge()
},blockValue:function c(at){var au=this.aliasable("helpers.blockHelperMissing"),av=[this.contextName(0)];
this.setupHelperArgs(at,0,av);
var ar=this.popStack();
av.splice(1,0,ar);
this.push(this.source.functionCall(au,"call",av))
},ambiguousBlockValue:function S(){var ar=this.aliasable("helpers.blockHelperMissing"),au=[this.contextName(0)];
this.setupHelperArgs("",0,au,true);
this.flushInline();
var at=this.topStack();
au.splice(1,0,at);
this.pushSource(["if (!",this.lastHelper,") { ",at," = ",this.source.functionCall(ar,"call",au),"}"])
},appendContent:function e(ar){if(this.pendingContent){ar=this.pendingContent+ar
}else{this.pendingLocation=this.source.currentLocation
}this.pendingContent=ar
},append:function Y(){if(this.isInline()){this.replaceStack(function(at){return[" != null ? ",at,' : ""']
});
this.pushSource(this.appendToBuffer(this.popStack()))
}else{var ar=this.popStack();
this.pushSource(["if (",ar," != null) { ",this.appendToBuffer(ar,undefined,true)," }"]);
if(this.environment.isSimple){this.pushSource(["else { ",this.appendToBuffer("''",undefined,true)," }"])
}}},appendEscaped:function m(){this.pushSource(this.appendToBuffer([this.aliasable("this.escapeExpression"),"(",this.popStack(),")"]))
},getContext:function B(ar){this.lastContext=ar
},pushContext:function t(){this.pushStackLiteral(this.contextName(this.lastContext))
},lookupOnContext:function ap(au,at,av){var ar=0;
if(!av&&this.options.compat&&!this.lastContext){this.push(this.depthedLookup(au[ar++]))
}else{this.pushContext()
}this.resolvePath("context",au,ar,at)
},lookupBlockParam:function C(at,ar){this.useBlockParams=true;
this.push(["blockParams[",at[0],"][",at[1],"]"]);
this.resolvePath("context",ar,1)
},lookupData:function o(at,ar){if(!at){this.pushStackLiteral("data")
}else{this.pushStackLiteral("this.data(data, "+at+")")
}this.resolvePath("data",ar,0,true)
},resolvePath:function O(au,aw,at,av){var ax=this;
if(this.options.strict||this.options.assumeObjects){this.push(U(this.options.strict,this,aw,au));
return
}var ar=aw.length;
for(;
at<ar;
at++){this.replaceStack(function(az){var ay=ax.nameLookup(az,aw[at],au);
if(!av){return[" != null ? ",ay," : ",az]
}else{return[" && ",ay]
}})
}},resolvePossibleLambda:function ad(){this.push([this.aliasable("this.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])
},pushStringParam:function an(ar,at){this.pushContext();
this.pushString(at);
if(at!=="SubExpression"){if(typeof ar==="string"){this.pushString(ar)
}else{this.pushStackLiteral(ar)
}}},emptyHash:function x(ar){if(this.trackIds){this.push("{}")
}if(this.stringParams){this.push("{}");
this.push("{}")
}this.pushStackLiteral(ar?"undefined":"{}")
},pushHash:function P(){if(this.hash){this.hashes.push(this.hash)
}this.hash={values:[],types:[],contexts:[],ids:[]}
},popHash:function L(){var ar=this.hash;
this.hash=this.hashes.pop();
if(this.trackIds){this.push(this.objectLiteral(ar.ids))
}if(this.stringParams){this.push(this.objectLiteral(ar.contexts));
this.push(this.objectLiteral(ar.types))
}this.push(this.objectLiteral(ar.values))
},pushString:function k(ar){this.pushStackLiteral(this.quotedString(ar))
},pushLiteral:function H(ar){this.pushStackLiteral(ar)
},pushProgram:function v(ar){if(ar!=null){this.pushStackLiteral(this.programExpression(ar))
}else{this.pushStackLiteral(null)
}},invokeHelper:function X(aw,ar,au){var ay=this.popStack(),at=this.setupHelper(aw,ar),ax=au?[at.name," || "]:"";
var av=["("].concat(ax,ay);
if(!this.options.strict){av.push(" || ",this.aliasable("helpers.helperMissing"))
}av.push(")");
this.push(this.source.functionCall(av,"call",at.callParams))
},invokeKnownHelper:function n(au,ar){var at=this.setupHelper(au,ar);
this.push(this.source.functionCall(at.name,"call",at.callParams))
},invokeAmbiguous:function aj(ar,aw){this.useRegister("helper");
var ax=this.popStack();
this.emptyHash();
var at=this.setupHelper(0,ar,aw);
var au=this.lastHelper=this.nameLookup("helpers",ar,"helper");
var av=["(","(helper = ",au," || ",ax,")"];
if(!this.options.strict){av[0]="(helper = ";
av.push(" != null ? helper : ",this.aliasable("helpers.helperMissing"))
}this.push(["(",av,at.paramsInit?["),(",at.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",at.callParams)," : helper))"])
},invokePartial:function R(at,av,ar){var aw=[],au=this.setupParams(av,1,aw,false);
if(at){av=this.popStack();
delete au.name
}if(ar){au.indent=JSON.stringify(ar)
}au.helpers="helpers";
au.partials="partials";
if(!at){aw.unshift(this.nameLookup("partials",av,"partial"))
}else{aw.unshift(av)
}if(this.options.compat){au.depths="depths"
}au=this.objectLiteral(au);
aw.push(au);
this.push(this.source.functionCall("this.invokePartial","",aw))
},assignToHash:function h(at){var av=this.popStack(),ar=undefined,au=undefined,ax=undefined;
if(this.trackIds){ax=this.popStack()
}if(this.stringParams){au=this.popStack();
ar=this.popStack()
}var aw=this.hash;
if(ar){aw.contexts[at]=ar
}if(au){aw.types[at]=au
}if(ax){aw.ids[at]=ax
}aw.values[at]=av
},pushId:function d(at,ar,au){if(at==="BlockParam"){this.pushStackLiteral("blockParams["+ar[0]+"].path["+ar[1]+"]"+(au?" + "+JSON.stringify("."+au):""))
}else{if(at==="PathExpression"){this.pushString(ar)
}else{if(at==="SubExpression"){this.pushStackLiteral("true")
}else{this.pushStackLiteral("null")
}}}},compiler:b,compileChildren:function F(ar,av){var ax=ar.children,az=undefined,ay=undefined;
for(var aw=0,at=ax.length;
aw<at;
aw++){az=ax[aw];
ay=new this.compiler();
var au=this.matchExistingProgram(az);
if(au==null){this.context.programs.push("");
au=this.context.programs.length;
az.index=au;
az.name="program"+au;
this.context.programs[au]=ay.compile(az,av,this.context,!this.precompile);
this.context.environments[au]=az;
this.useDepths=this.useDepths||ay.useDepths;
this.useBlockParams=this.useBlockParams||ay.useBlockParams
}else{az.index=au;
az.name="program"+au;
this.useDepths=this.useDepths||az.useDepths;
this.useBlockParams=this.useBlockParams||az.useBlockParams
}}},matchExistingProgram:function s(av){for(var au=0,at=this.context.environments.length;
au<at;
au++){var ar=this.context.environments[au];
if(ar&&ar.equals(av)){return au
}}},programExpression:function G(ar){var au=this.environment.children[ar],at=[au.index,"data",au.blockParams];
if(this.useBlockParams||this.useDepths){at.push("blockParams")
}if(this.useDepths){at.push("depths")
}return"this.program("+at.join(", ")+")"
},useRegister:function V(ar){if(!this.registers[ar]){this.registers[ar]=true;
this.registers.list.push(ar)
}},push:function ac(ar){if(!(ar instanceof j)){ar=this.source.wrap(ar)
}this.inlineStack.push(ar);
return ar
},pushStackLiteral:function l(ar){this.push(new j(ar))
},pushSource:function u(ar){if(this.pendingContent){this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation));
this.pendingContent=undefined
}if(ar){this.source.push(ar)
}},replaceStack:function a(az){var ax=["("],ar=undefined,aw=undefined,au=undefined;
if(!this.isInline()){throw new ae["default"]("replaceStack on non-inline")
}var ay=this.popStack(true);
if(ay instanceof j){ar=[ay.value];
ax=["(",ar];
au=true
}else{aw=true;
var at=this.incrStack();
ax=["((",this.push(at)," = ",ay,")"];
ar=this.topStack()
}var av=az.call(this,ar);
if(!au){this.popStack()
}if(aw){this.stackSlot--
}this.push(ax.concat(av,")"))
},incrStack:function T(){this.stackSlot++;
if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot)
}return this.topStackName()
},topStackName:function ah(){return"stack"+this.stackSlot
},flushInline:function ag(){var av=this.inlineStack;
this.inlineStack=[];
for(var au=0,at=av.length;
au<at;
au++){var aw=av[au];
if(aw instanceof j){this.compileStack.push(aw)
}else{var ar=this.incrStack();
this.pushSource([ar," = ",aw,";"]);
this.compileStack.push(ar)
}}},isInline:function w(){return this.inlineStack.length
},popStack:function g(ar){var au=this.isInline(),at=(au?this.inlineStack:this.compileStack).pop();
if(!ar&&at instanceof j){return at.value
}else{if(!au){if(!this.stackSlot){throw new ae["default"]("Invalid stack pop")
}this.stackSlot--
}return at
}},topStack:function E(){var ar=this.isInline()?this.inlineStack:this.compileStack,at=ar[ar.length-1];
if(at instanceof j){return at.value
}else{return at
}},contextName:function ab(ar){if(this.useDepths&&ar){return"depths["+ar+"]"
}else{return"depth"+ar
}},quotedString:function z(ar){return this.source.quotedString(ar)
},objectLiteral:function r(ar){return this.source.objectLiteral(ar)
},aliasable:function aa(at){var ar=this.aliases[at];
if(ar){ar.referenceCount++;
return ar
}ar=this.aliases[at]=this.source.wrap(at);
ar.aliasable=true;
ar.referenceCount=1;
return ar
},setupHelper:function Z(aw,au,at){var av=[],ax=this.setupHelperArgs(au,aw,av,at);
var ar=this.nameLookup("helpers",au,"helper");
return{params:av,paramsInit:ax,name:ar,callParams:[this.contextName(0)].concat(av)}
},setupParams:function K(at,ax,av){var aC={},aA=[],aB=[],ar=[],au=undefined;
aC.name=this.quotedString(at);
aC.hash=this.popStack();
if(this.trackIds){aC.hashIds=this.popStack()
}if(this.stringParams){aC.hashTypes=this.popStack();
aC.hashContexts=this.popStack()
}var aw=this.popStack(),az=this.popStack();
if(az||aw){aC.fn=az||"this.noop";
aC.inverse=aw||"this.noop"
}var ay=ax;
while(ay--){au=this.popStack();
av[ay]=au;
if(this.trackIds){ar[ay]=this.popStack()
}if(this.stringParams){aB[ay]=this.popStack();
aA[ay]=this.popStack()
}}if(this.trackIds){aC.ids=this.source.generateArray(ar)
}if(this.stringParams){aC.types=this.source.generateArray(aB);
aC.contexts=this.source.generateArray(aA)
}if(this.options.data){aC.data="data"
}if(this.useBlockParams){aC.blockParams="blockParams"
}return aC
},setupHelperArgs:function J(au,aw,av,at){var ar=this.setupParams(au,aw,av,true);
ar=this.objectLiteral(ar);
if(at){this.useRegister("options");
av.push("options");
return["options=",ar]
}else{av.push(ar);
return""
}}};
(function(){var ar=("break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false").split(" ");
var av=b.RESERVED_WORDS={};
for(var au=0,at=ar.length;
au<at;
au++){av[ar[au]]=true
}})();
b.isValidJavaScriptVariableName=function(ar){return !b.RESERVED_WORDS[ar]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(ar)
};
function U(ay,aw,ax,av){var at=aw.popStack(),au=0,ar=ax.length;
if(ay){ar--
}for(;
au<ar;
au++){at=aw.nameLookup(at,ax[au],av)
}if(ay){return[aw.aliasable("this.strict"),"(",at,", ",aw.quotedString(ax[au]),")"]
}else{return at
}}af["default"]=b;
f.exports=af["default"]
},function(b,C,c){var a=c(8)["default"];
C.__esModule=true;
var x=c(12);
var l=a(x);
var p=c(2);
var t=a(p);
function A(){this.parents=[]
}A.prototype={constructor:A,mutating:false,acceptKey:function s(E,D){var F=this.accept(E[D]);
if(this.mutating){if(F&&(!F.type||!t["default"][F.type])){throw new l["default"]('Unexpected node type "'+F.type+'" found when accepting '+D+" on "+E.type)
}E[D]=F
}},acceptRequired:function w(E,D){this.acceptKey(E,D);
if(!E[D]){throw new l["default"](E.type+" requires "+D)
}},acceptArray:function y(F){for(var E=0,D=F.length;
E<D;
E++){this.acceptKey(F,E);
if(!F[E]){F.splice(E,1);
E--;
D--
}}},accept:function d(E){if(!E){return
}if(this.current){this.parents.unshift(this.current)
}this.current=E;
var D=this[E.type](E);
this.current=this.parents.shift();
if(!this.mutating||D){return D
}else{if(D!==false){return E
}}},Program:function z(D){this.acceptArray(D.body)
},MustacheStatement:function f(D){this.acceptRequired(D,"path");
this.acceptArray(D.params);
this.acceptKey(D,"hash")
},BlockStatement:function B(D){this.acceptRequired(D,"path");
this.acceptArray(D.params);
this.acceptKey(D,"hash");
this.acceptKey(D,"program");
this.acceptKey(D,"inverse")
},PartialStatement:function m(D){this.acceptRequired(D,"name");
this.acceptArray(D.params);
this.acceptKey(D,"hash")
},ContentStatement:function v(){},CommentStatement:function n(){},SubExpression:function r(D){this.acceptRequired(D,"path");
this.acceptArray(D.params);
this.acceptKey(D,"hash")
},PathExpression:function e(){},StringLiteral:function q(){},NumberLiteral:function u(){},BooleanLiteral:function k(){},UndefinedLiteral:function o(){},NullLiteral:function j(){},Hash:function g(D){this.acceptArray(D.pairs)
},HashPair:function h(D){this.acceptRequired(D,"value")
}};
C["default"]=A;
b.exports=C["default"]
},function(b,a,c){(function(d){a.__esModule=true;
a["default"]=function(g){var e=typeof d!=="undefined"?d:window,f=e.Handlebars;
g.noConflict=function(){if(e.Handlebars===g){e.Handlebars=f
}}
};
b.exports=a["default"]
}.call(a,(function(){return this
}())))
},function(b,a,c){a["default"]=function(d){return d&&d.__esModule?d:{"default":d}
};
a.__esModule=true
},function(b,a,c){a["default"]=function(f){if(f&&f.__esModule){return f
}else{var d={};
if(typeof f==="object"&&f!==null){for(var e in f){if(Object.prototype.hasOwnProperty.call(f,e)){d[e]=f[e]
}}}d["default"]=f;
return d
}};
a.__esModule=true
},function(c,y,e){var x=e(9)["default"];
var b=e(8)["default"];
y.__esModule=true;
y.HandlebarsEnvironment=h;
y.createFrame=v;
var w=e(13);
var d=x(w);
var u=e(12);
var m=b(u);
var t="3.0.1";
y.VERSION=t;
var o=6;
y.COMPILER_REVISION=o;
var q={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};
y.REVISION_CHANGES=q;
var l=d.isArray,a=d.isFunction,r=d.toString,n="[object Object]";
function h(B,A){this.helpers=B||{};
this.partials=A||{};
s(this)
}h.prototype={constructor:h,logger:z,log:j,registerHelper:function k(A,B){if(r.call(A)===n){if(B){throw new m["default"]("Arg not supported with multiple helpers")
}d.extend(this.helpers,A)
}else{this.helpers[A]=B
}},unregisterHelper:function f(A){delete this.helpers[A]
},registerPartial:function g(B,A){if(r.call(B)===n){d.extend(this.partials,B)
}else{if(typeof A==="undefined"){throw new m["default"]("Attempting to register a partial as undefined")
}this.partials[B]=A
}},unregisterPartial:function p(A){delete this.partials[A]
}};
function s(A){A.registerHelper("helperMissing",function(){if(arguments.length===1){return undefined
}else{throw new m["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')
}});
A.registerHelper("blockHelperMissing",function(D,C){var B=C.inverse,E=C.fn;
if(D===true){return E(this)
}else{if(D===false||D==null){return B(this)
}else{if(l(D)){if(D.length>0){if(C.ids){C.ids=[C.name]
}return A.helpers.each(D,C)
}else{return B(this)
}}else{if(C.data&&C.ids){var F=v(C.data);
F.contextPath=d.appendContextPath(C.data.contextPath,C.name);
C={data:F}
}return E(D,C)
}}}});
A.registerHelper("each",function(B,M){if(!M){throw new m["default"]("Must pass iterator to #each")
}var K=M.fn,F=M.inverse,H=0,J="",G=undefined,C=undefined;
if(M.data&&M.ids){C=d.appendContextPath(M.data.contextPath,M.ids[0])+"."
}if(a(B)){B=B.call(this)
}if(M.data){G=v(M.data)
}function D(P,N,O){if(G){G.key=P;
G.index=N;
G.first=N===0;
G.last=!!O;
if(C){G.contextPath=C+P
}}J=J+K(B[P],{data:G,blockParams:d.blockParams([B[P],P],[C+P,null])})
}if(B&&typeof B==="object"){if(l(B)){for(var E=B.length;
H<E;
H++){D(H,H,H===B.length-1)
}}else{var I=undefined;
for(var L in B){if(B.hasOwnProperty(L)){if(I){D(I,H-1)
}I=L;
H++
}}if(I){D(I,H-1,true)
}}}if(H===0){J=F(this)
}return J
});
A.registerHelper("if",function(C,B){if(a(C)){C=C.call(this)
}if(!B.hash.includeZero&&!C||d.isEmpty(C)){return B.inverse(this)
}else{return B.fn(this)
}});
A.registerHelper("unless",function(C,B){return A.helpers["if"].call(this,C,{fn:B.inverse,inverse:B.fn,hash:B.hash})
});
A.registerHelper("with",function(C,B){if(a(C)){C=C.call(this)
}var D=B.fn;
if(!d.isEmpty(C)){if(B.data&&B.ids){var E=v(B.data);
E.contextPath=d.appendContextPath(B.data.contextPath,B.ids[0]);
B={data:E}
}return D(C,B)
}else{return B.inverse(this)
}});
A.registerHelper("log",function(C,B){var D=B.data&&B.data.level!=null?parseInt(B.data.level,10):1;
A.log(D,C)
});
A.registerHelper("lookup",function(C,B){return C&&C[B]
})
}var z={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:1,log:function j(C,A){if(typeof console!=="undefined"&&z.level<=C){var B=z.methodMap[C];
(console[B]||console.log).call(console,A)
}}};
y.logger=z;
var j=z.log;
y.log=j;
function v(A){var B=d.extend({},A);
B._parent=A;
return B
}},function(b,a,d){a.__esModule=true;
function c(e){this.string=e
}c.prototype.toString=c.prototype.toHTML=function(){return""+this.string
};
a["default"]=c;
b.exports=a["default"]
},function(c,a,d){a.__esModule=true;
var e=["description","fileName","lineNumber","message","name","number","stack"];
function b(l,k){var m=k&&k.loc,g=undefined,j=undefined;
if(m){g=m.start.line;
j=m.start.column;
l+=" - "+g+":"+j
}var h=Error.prototype.constructor.call(this,l);
for(var f=0;
f<e.length;
f++){this[e[f]]=h[e[f]]
}if(Error.captureStackTrace){Error.captureStackTrace(this,b)
}if(m){this.lineNumber=g;
this.column=j
}}b.prototype=new Error();
a["default"]=b;
c.exports=a["default"]
},function(e,h,d){h.__esModule=true;
h.extend=n;
h.indexOf=o;
h.escapeExpression=k;
h.isEmpty=j;
h.blockParams=m;
h.appendContextPath=f;
var p={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};
var a=/[&<>"'`]/g,g=/[&<>"'`]/;
function q(r){return p[r]
}function n(t){for(var s=1;
s<arguments.length;
s++){for(var r in arguments[s]){if(Object.prototype.hasOwnProperty.call(arguments[s],r)){t[r]=arguments[s][r]
}}}return t
}var c=Object.prototype.toString;
h.toString=c;
var b=function b(r){return typeof r==="function"
};
if(b(/x/)){h.isFunction=b=function(r){return typeof r==="function"&&c.call(r)==="[object Function]"
}
}var b;
h.isFunction=b;
var l=Array.isArray||function(r){return r&&typeof r==="object"?c.call(r)==="[object Array]":false
};
h.isArray=l;
function o(u,t){for(var s=0,r=u.length;
s<r;
s++){if(u[s]===t){return s
}}return -1
}function k(r){if(typeof r!=="string"){if(r&&r.toHTML){return r.toHTML()
}else{if(r==null){return""
}else{if(!r){return r+""
}}}r=""+r
}if(!g.test(r)){return r
}return r.replace(a,q)
}function j(r){if(!r&&r!==0){return true
}else{if(l(r)&&r.length===0){return true
}else{return false
}}}function m(s,r){s.path=r;
return s
}function f(r,s){return(r?r+".":"")+s
}},function(d,g,c){var k=c(9)["default"];
var r=c(8)["default"];
g.__esModule=true;
g.checkRevision=b;
g.template=o;
g.wrapProgram=l;
g.resolvePartial=e;
g.invokePartial=a;
g.noop=q;
var h=c(13);
var m=k(h);
var f=c(12);
var p=r(f);
var j=c(10);
function b(u){var t=u&&u[0]||1,w=j.COMPILER_REVISION;
if(t!==w){if(t<w){var s=j.REVISION_CHANGES[w],v=j.REVISION_CHANGES[t];
throw new p["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+s+") or downgrade your runtime to an older version ("+v+").")
}else{throw new p["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+u[1]+").")
}}}function o(C,w){if(!w){throw new p["default"]("No environment passed to template")
}if(!C||!C.main){throw new p["default"]("Unknown template object: "+typeof C)
}w.VM.checkRevision(C.compiler);
function D(H,K,I){if(I.hash){K=m.extend({},K,I.hash)
}H=w.VM.resolvePartial.call(this,H,K,I);
var E=w.VM.invokePartial.call(this,H,K,I);
if(E==null&&w.compile){I.partials[I.name]=w.compile(H,C.compilerOptions,w);
E=I.partials[I.name](K,I)
}if(E!=null){if(I.indent){var G=E.split("\n");
for(var J=0,F=G.length;
J<F;
J++){if(!G[J]&&J+1===F){break
}G[J]=I.indent+G[J]
}E=G.join("\n")
}return E
}else{throw new p["default"]("The partial "+I.name+" could not be compiled when running in runtime-only mode")
}}var s={strict:function B(F,E){if(!(E in F)){throw new p["default"]('"'+E+'" not defined in '+F)
}return F[E]
},lookup:function t(H,F){var E=H.length;
for(var G=0;
G<E;
G++){if(H[G]&&H[G][F]!=null){return H[G][F]
}}},lambda:function x(F,E){return typeof F==="function"?F.call(E):F
},escapeExpression:m.escapeExpression,invokePartial:D,fn:function A(E){return C[E]
},programs:[],program:function v(G,J,F,I,K){var E=this.programs[G],H=this.fn(G);
if(J||K||I||F){E=l(this,G,H,J,F,I,K)
}else{if(!E){E=this.programs[G]=l(this,G,H)
}}return E
},data:function u(E,F){while(E&&F--){E=E._parent
}return E
},merge:function z(G,E){var F=G||E;
if(G&&E&&G!==E){F=m.extend({},E,G)
}return F
},noop:w.VM.noop,compilerInfo:C.compiler};
function y(F){var E=arguments[1]===undefined?{}:arguments[1];
var H=E.data;
y._setup(E);
if(!E.partial&&C.useData){H=n(F,H)
}var I=undefined,G=C.useBlockParams?[]:undefined;
if(C.useDepths){I=E.depths?[F].concat(E.depths):[F]
}return C.main.call(s,F,s.helpers,s.partials,H,G,I)
}y.isTop=true;
y._setup=function(E){if(!E.partial){s.helpers=s.merge(E.helpers,w.helpers);
if(C.usePartial){s.partials=s.merge(E.partials,w.partials)
}}else{s.helpers=E.helpers;
s.partials=E.partials
}};
y._child=function(E,G,F,H){if(C.useBlockParams&&!F){throw new p["default"]("must pass block params")
}if(C.useDepths&&!H){throw new p["default"]("must pass parent depths")
}return l(s,E,C[E],G,0,F,H)
};
return y
}function l(s,u,v,x,t,w,z){function y(B){var A=arguments[1]===undefined?{}:arguments[1];
return v.call(s,B,s.helpers,s.partials,A.data||x,w&&[A.blockParams].concat(w),z&&[B].concat(z))
}y.program=u;
y.depth=z?z.length:0;
y.blockParams=t||0;
return y
}function e(s,u,t){if(!s){s=t.partials[t.name]
}else{if(!s.call&&!t.name){t.name=s;
s=t.partials[s]
}}return s
}function a(s,u,t){t.partial=true;
if(s===undefined){throw new p["default"]("The partial "+t.name+" could not be found")
}else{if(s instanceof Function){return s(u,t)
}}}function q(){return""
}function n(s,t){if(!t||!("root" in t)){t=t?j.createFrame(t):{};
t.root=s
}return t
}},function(c,b,d){b.__esModule=true;
var a=(function(){var l={trace:function g(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,content:12,COMMENT:13,CONTENT:14,openRawBlock:15,END_RAW_BLOCK:16,OPEN_RAW_BLOCK:17,helperName:18,openRawBlock_repetition0:19,openRawBlock_option0:20,CLOSE_RAW_BLOCK:21,openBlock:22,block_option0:23,closeBlock:24,openInverse:25,block_option1:26,OPEN_BLOCK:27,openBlock_repetition0:28,openBlock_option0:29,openBlock_option1:30,CLOSE:31,OPEN_INVERSE:32,openInverse_repetition0:33,openInverse_option0:34,openInverse_option1:35,openInverseChain:36,OPEN_INVERSE_CHAIN:37,openInverseChain_repetition0:38,openInverseChain_option0:39,openInverseChain_option1:40,inverseAndProgram:41,INVERSE:42,inverseChain:43,inverseChain_option0:44,OPEN_ENDBLOCK:45,OPEN:46,mustache_repetition0:47,mustache_option0:48,OPEN_UNESCAPED:49,mustache_repetition1:50,mustache_option1:51,CLOSE_UNESCAPED:52,OPEN_PARTIAL:53,partialName:54,partial_repetition0:55,partial_option0:56,param:57,sexpr:58,OPEN_SEXPR:59,sexpr_repetition0:60,sexpr_option0:61,CLOSE_SEXPR:62,hash:63,hash_repetition_plus0:64,hashSegment:65,ID:66,EQUALS:67,blockParams:68,OPEN_BLOCK_PARAMS:69,blockParams_repetition_plus0:70,CLOSE_BLOCK_PARAMS:71,path:72,dataName:73,STRING:74,NUMBER:75,BOOLEAN:76,UNDEFINED:77,NULL:78,DATA:79,pathSegments:80,SEP:81,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",13:"COMMENT",14:"CONTENT",16:"END_RAW_BLOCK",17:"OPEN_RAW_BLOCK",21:"CLOSE_RAW_BLOCK",27:"OPEN_BLOCK",31:"CLOSE",32:"OPEN_INVERSE",37:"OPEN_INVERSE_CHAIN",42:"INVERSE",45:"OPEN_ENDBLOCK",46:"OPEN",49:"OPEN_UNESCAPED",52:"CLOSE_UNESCAPED",53:"OPEN_PARTIAL",59:"OPEN_SEXPR",62:"CLOSE_SEXPR",66:"ID",67:"EQUALS",69:"OPEN_BLOCK_PARAMS",71:"CLOSE_BLOCK_PARAMS",74:"STRING",75:"NUMBER",76:"BOOLEAN",77:"UNDEFINED",78:"NULL",79:"DATA",81:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[12,1],[10,3],[15,5],[9,4],[9,4],[22,6],[25,6],[36,6],[41,2],[43,3],[43,1],[24,3],[8,5],[8,5],[11,5],[57,1],[57,1],[58,5],[63,1],[65,3],[68,3],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[54,1],[54,1],[73,2],[72,1],[80,3],[80,1],[6,0],[6,2],[19,0],[19,2],[20,0],[20,1],[23,0],[23,1],[26,0],[26,1],[28,0],[28,2],[29,0],[29,1],[30,0],[30,1],[33,0],[33,2],[34,0],[34,1],[35,0],[35,1],[38,0],[38,2],[39,0],[39,1],[40,0],[40,1],[44,0],[44,1],[47,0],[47,2],[48,0],[48,1],[50,0],[50,2],[51,0],[51,1],[55,0],[55,2],[56,0],[56,1],[60,0],[60,2],[61,0],[61,1],[64,1],[64,2],[70,1],[70,2]],performAction:function f(r,s,m,t,u,v,o){var p=v.length-1;
switch(u){case 1:return v[p-1];
break;
case 2:this.$=new t.Program(v[p],null,{},t.locInfo(this._$));
break;
case 3:this.$=v[p];
break;
case 4:this.$=v[p];
break;
case 5:this.$=v[p];
break;
case 6:this.$=v[p];
break;
case 7:this.$=v[p];
break;
case 8:this.$=new t.CommentStatement(t.stripComment(v[p]),t.stripFlags(v[p],v[p]),t.locInfo(this._$));
break;
case 9:this.$=new t.ContentStatement(v[p],t.locInfo(this._$));
break;
case 10:this.$=t.prepareRawBlock(v[p-2],v[p-1],v[p],this._$);
break;
case 11:this.$={path:v[p-3],params:v[p-2],hash:v[p-1]};
break;
case 12:this.$=t.prepareBlock(v[p-3],v[p-2],v[p-1],v[p],false,this._$);
break;
case 13:this.$=t.prepareBlock(v[p-3],v[p-2],v[p-1],v[p],true,this._$);
break;
case 14:this.$={path:v[p-4],params:v[p-3],hash:v[p-2],blockParams:v[p-1],strip:t.stripFlags(v[p-5],v[p])};
break;
case 15:this.$={path:v[p-4],params:v[p-3],hash:v[p-2],blockParams:v[p-1],strip:t.stripFlags(v[p-5],v[p])};
break;
case 16:this.$={path:v[p-4],params:v[p-3],hash:v[p-2],blockParams:v[p-1],strip:t.stripFlags(v[p-5],v[p])};
break;
case 17:this.$={strip:t.stripFlags(v[p-1],v[p-1]),program:v[p]};
break;
case 18:var n=t.prepareBlock(v[p-2],v[p-1],v[p],v[p],false,this._$),q=new t.Program([n],null,{},t.locInfo(this._$));
q.chained=true;
this.$={strip:v[p-2].strip,program:q,chain:true};
break;
case 19:this.$=v[p];
break;
case 20:this.$={path:v[p-1],strip:t.stripFlags(v[p-2],v[p])};
break;
case 21:this.$=t.prepareMustache(v[p-3],v[p-2],v[p-1],v[p-4],t.stripFlags(v[p-4],v[p]),this._$);
break;
case 22:this.$=t.prepareMustache(v[p-3],v[p-2],v[p-1],v[p-4],t.stripFlags(v[p-4],v[p]),this._$);
break;
case 23:this.$=new t.PartialStatement(v[p-3],v[p-2],v[p-1],t.stripFlags(v[p-4],v[p]),t.locInfo(this._$));
break;
case 24:this.$=v[p];
break;
case 25:this.$=v[p];
break;
case 26:this.$=new t.SubExpression(v[p-3],v[p-2],v[p-1],t.locInfo(this._$));
break;
case 27:this.$=new t.Hash(v[p],t.locInfo(this._$));
break;
case 28:this.$=new t.HashPair(t.id(v[p-2]),v[p],t.locInfo(this._$));
break;
case 29:this.$=t.id(v[p-1]);
break;
case 30:this.$=v[p];
break;
case 31:this.$=v[p];
break;
case 32:this.$=new t.StringLiteral(v[p],t.locInfo(this._$));
break;
case 33:this.$=new t.NumberLiteral(v[p],t.locInfo(this._$));
break;
case 34:this.$=new t.BooleanLiteral(v[p],t.locInfo(this._$));
break;
case 35:this.$=new t.UndefinedLiteral(t.locInfo(this._$));
break;
case 36:this.$=new t.NullLiteral(t.locInfo(this._$));
break;
case 37:this.$=v[p];
break;
case 38:this.$=v[p];
break;
case 39:this.$=t.preparePath(true,v[p],this._$);
break;
case 40:this.$=t.preparePath(false,v[p],this._$);
break;
case 41:v[p-2].push({part:t.id(v[p]),original:v[p],separator:v[p-1]});
this.$=v[p-2];
break;
case 42:this.$=[{part:t.id(v[p]),original:v[p]}];
break;
case 43:this.$=[];
break;
case 44:v[p-1].push(v[p]);
break;
case 45:this.$=[];
break;
case 46:v[p-1].push(v[p]);
break;
case 53:this.$=[];
break;
case 54:v[p-1].push(v[p]);
break;
case 59:this.$=[];
break;
case 60:v[p-1].push(v[p]);
break;
case 65:this.$=[];
break;
case 66:v[p-1].push(v[p]);
break;
case 73:this.$=[];
break;
case 74:v[p-1].push(v[p]);
break;
case 77:this.$=[];
break;
case 78:v[p-1].push(v[p]);
break;
case 81:this.$=[];
break;
case 82:v[p-1].push(v[p]);
break;
case 85:this.$=[];
break;
case 86:v[p-1].push(v[p]);
break;
case 89:this.$=[v[p]];
break;
case 90:v[p-1].push(v[p]);
break;
case 91:this.$=[v[p]];
break;
case 92:v[p-1].push(v[p]);
break
}},table:[{3:1,4:2,5:[2,43],6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],46:[2,43],49:[2,43],53:[2,43]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:[1,11],14:[1,18],15:16,17:[1,21],22:14,25:15,27:[1,19],32:[1,20],37:[2,2],42:[2,2],45:[2,2],46:[1,12],49:[1,13],53:[1,17]},{1:[2,1]},{5:[2,44],13:[2,44],14:[2,44],17:[2,44],27:[2,44],32:[2,44],37:[2,44],42:[2,44],45:[2,44],46:[2,44],49:[2,44],53:[2,44]},{5:[2,3],13:[2,3],14:[2,3],17:[2,3],27:[2,3],32:[2,3],37:[2,3],42:[2,3],45:[2,3],46:[2,3],49:[2,3],53:[2,3]},{5:[2,4],13:[2,4],14:[2,4],17:[2,4],27:[2,4],32:[2,4],37:[2,4],42:[2,4],45:[2,4],46:[2,4],49:[2,4],53:[2,4]},{5:[2,5],13:[2,5],14:[2,5],17:[2,5],27:[2,5],32:[2,5],37:[2,5],42:[2,5],45:[2,5],46:[2,5],49:[2,5],53:[2,5]},{5:[2,6],13:[2,6],14:[2,6],17:[2,6],27:[2,6],32:[2,6],37:[2,6],42:[2,6],45:[2,6],46:[2,6],49:[2,6],53:[2,6]},{5:[2,7],13:[2,7],14:[2,7],17:[2,7],27:[2,7],32:[2,7],37:[2,7],42:[2,7],45:[2,7],46:[2,7],49:[2,7],53:[2,7]},{5:[2,8],13:[2,8],14:[2,8],17:[2,8],27:[2,8],32:[2,8],37:[2,8],42:[2,8],45:[2,8],46:[2,8],49:[2,8],53:[2,8]},{18:22,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:33,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{4:34,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],37:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{4:35,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{12:36,14:[1,18]},{18:38,54:37,58:39,59:[1,40],66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,9],13:[2,9],14:[2,9],16:[2,9],17:[2,9],27:[2,9],32:[2,9],37:[2,9],42:[2,9],45:[2,9],46:[2,9],49:[2,9],53:[2,9]},{18:41,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:42,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:43,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{31:[2,73],47:44,59:[2,73],66:[2,73],74:[2,73],75:[2,73],76:[2,73],77:[2,73],78:[2,73],79:[2,73]},{21:[2,30],31:[2,30],52:[2,30],59:[2,30],62:[2,30],66:[2,30],69:[2,30],74:[2,30],75:[2,30],76:[2,30],77:[2,30],78:[2,30],79:[2,30]},{21:[2,31],31:[2,31],52:[2,31],59:[2,31],62:[2,31],66:[2,31],69:[2,31],74:[2,31],75:[2,31],76:[2,31],77:[2,31],78:[2,31],79:[2,31]},{21:[2,32],31:[2,32],52:[2,32],59:[2,32],62:[2,32],66:[2,32],69:[2,32],74:[2,32],75:[2,32],76:[2,32],77:[2,32],78:[2,32],79:[2,32]},{21:[2,33],31:[2,33],52:[2,33],59:[2,33],62:[2,33],66:[2,33],69:[2,33],74:[2,33],75:[2,33],76:[2,33],77:[2,33],78:[2,33],79:[2,33]},{21:[2,34],31:[2,34],52:[2,34],59:[2,34],62:[2,34],66:[2,34],69:[2,34],74:[2,34],75:[2,34],76:[2,34],77:[2,34],78:[2,34],79:[2,34]},{21:[2,35],31:[2,35],52:[2,35],59:[2,35],62:[2,35],66:[2,35],69:[2,35],74:[2,35],75:[2,35],76:[2,35],77:[2,35],78:[2,35],79:[2,35]},{21:[2,36],31:[2,36],52:[2,36],59:[2,36],62:[2,36],66:[2,36],69:[2,36],74:[2,36],75:[2,36],76:[2,36],77:[2,36],78:[2,36],79:[2,36]},{21:[2,40],31:[2,40],52:[2,40],59:[2,40],62:[2,40],66:[2,40],69:[2,40],74:[2,40],75:[2,40],76:[2,40],77:[2,40],78:[2,40],79:[2,40],81:[1,45]},{66:[1,32],80:46},{21:[2,42],31:[2,42],52:[2,42],59:[2,42],62:[2,42],66:[2,42],69:[2,42],74:[2,42],75:[2,42],76:[2,42],77:[2,42],78:[2,42],79:[2,42],81:[2,42]},{50:47,52:[2,77],59:[2,77],66:[2,77],74:[2,77],75:[2,77],76:[2,77],77:[2,77],78:[2,77],79:[2,77]},{23:48,36:50,37:[1,52],41:51,42:[1,53],43:49,45:[2,49]},{26:54,41:55,42:[1,53],45:[2,51]},{16:[1,56]},{31:[2,81],55:57,59:[2,81],66:[2,81],74:[2,81],75:[2,81],76:[2,81],77:[2,81],78:[2,81],79:[2,81]},{31:[2,37],59:[2,37],66:[2,37],74:[2,37],75:[2,37],76:[2,37],77:[2,37],78:[2,37],79:[2,37]},{31:[2,38],59:[2,38],66:[2,38],74:[2,38],75:[2,38],76:[2,38],77:[2,38],78:[2,38],79:[2,38]},{18:58,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{28:59,31:[2,53],59:[2,53],66:[2,53],69:[2,53],74:[2,53],75:[2,53],76:[2,53],77:[2,53],78:[2,53],79:[2,53]},{31:[2,59],33:60,59:[2,59],66:[2,59],69:[2,59],74:[2,59],75:[2,59],76:[2,59],77:[2,59],78:[2,59],79:[2,59]},{19:61,21:[2,45],59:[2,45],66:[2,45],74:[2,45],75:[2,45],76:[2,45],77:[2,45],78:[2,45],79:[2,45]},{18:65,31:[2,75],48:62,57:63,58:66,59:[1,40],63:64,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{66:[1,70]},{21:[2,39],31:[2,39],52:[2,39],59:[2,39],62:[2,39],66:[2,39],69:[2,39],74:[2,39],75:[2,39],76:[2,39],77:[2,39],78:[2,39],79:[2,39],81:[1,45]},{18:65,51:71,52:[2,79],57:72,58:66,59:[1,40],63:73,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{24:74,45:[1,75]},{45:[2,50]},{4:76,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],37:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{45:[2,19]},{18:77,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{4:78,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{24:79,45:[1,75]},{45:[2,52]},{5:[2,10],13:[2,10],14:[2,10],17:[2,10],27:[2,10],32:[2,10],37:[2,10],42:[2,10],45:[2,10],46:[2,10],49:[2,10],53:[2,10]},{18:65,31:[2,83],56:80,57:81,58:66,59:[1,40],63:82,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{59:[2,85],60:83,62:[2,85],66:[2,85],74:[2,85],75:[2,85],76:[2,85],77:[2,85],78:[2,85],79:[2,85]},{18:65,29:84,31:[2,55],57:85,58:66,59:[1,40],63:86,64:67,65:68,66:[1,69],69:[2,55],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:65,31:[2,61],34:87,57:88,58:66,59:[1,40],63:89,64:67,65:68,66:[1,69],69:[2,61],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:65,20:90,21:[2,47],57:91,58:66,59:[1,40],63:92,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{31:[1,93]},{31:[2,74],59:[2,74],66:[2,74],74:[2,74],75:[2,74],76:[2,74],77:[2,74],78:[2,74],79:[2,74]},{31:[2,76]},{21:[2,24],31:[2,24],52:[2,24],59:[2,24],62:[2,24],66:[2,24],69:[2,24],74:[2,24],75:[2,24],76:[2,24],77:[2,24],78:[2,24],79:[2,24]},{21:[2,25],31:[2,25],52:[2,25],59:[2,25],62:[2,25],66:[2,25],69:[2,25],74:[2,25],75:[2,25],76:[2,25],77:[2,25],78:[2,25],79:[2,25]},{21:[2,27],31:[2,27],52:[2,27],62:[2,27],65:94,66:[1,95],69:[2,27]},{21:[2,89],31:[2,89],52:[2,89],62:[2,89],66:[2,89],69:[2,89]},{21:[2,42],31:[2,42],52:[2,42],59:[2,42],62:[2,42],66:[2,42],67:[1,96],69:[2,42],74:[2,42],75:[2,42],76:[2,42],77:[2,42],78:[2,42],79:[2,42],81:[2,42]},{21:[2,41],31:[2,41],52:[2,41],59:[2,41],62:[2,41],66:[2,41],69:[2,41],74:[2,41],75:[2,41],76:[2,41],77:[2,41],78:[2,41],79:[2,41],81:[2,41]},{52:[1,97]},{52:[2,78],59:[2,78],66:[2,78],74:[2,78],75:[2,78],76:[2,78],77:[2,78],78:[2,78],79:[2,78]},{52:[2,80]},{5:[2,12],13:[2,12],14:[2,12],17:[2,12],27:[2,12],32:[2,12],37:[2,12],42:[2,12],45:[2,12],46:[2,12],49:[2,12],53:[2,12]},{18:98,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{36:50,37:[1,52],41:51,42:[1,53],43:100,44:99,45:[2,71]},{31:[2,65],38:101,59:[2,65],66:[2,65],69:[2,65],74:[2,65],75:[2,65],76:[2,65],77:[2,65],78:[2,65],79:[2,65]},{45:[2,17]},{5:[2,13],13:[2,13],14:[2,13],17:[2,13],27:[2,13],32:[2,13],37:[2,13],42:[2,13],45:[2,13],46:[2,13],49:[2,13],53:[2,13]},{31:[1,102]},{31:[2,82],59:[2,82],66:[2,82],74:[2,82],75:[2,82],76:[2,82],77:[2,82],78:[2,82],79:[2,82]},{31:[2,84]},{18:65,57:104,58:66,59:[1,40],61:103,62:[2,87],63:105,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{30:106,31:[2,57],68:107,69:[1,108]},{31:[2,54],59:[2,54],66:[2,54],69:[2,54],74:[2,54],75:[2,54],76:[2,54],77:[2,54],78:[2,54],79:[2,54]},{31:[2,56],69:[2,56]},{31:[2,63],35:109,68:110,69:[1,108]},{31:[2,60],59:[2,60],66:[2,60],69:[2,60],74:[2,60],75:[2,60],76:[2,60],77:[2,60],78:[2,60],79:[2,60]},{31:[2,62],69:[2,62]},{21:[1,111]},{21:[2,46],59:[2,46],66:[2,46],74:[2,46],75:[2,46],76:[2,46],77:[2,46],78:[2,46],79:[2,46]},{21:[2,48]},{5:[2,21],13:[2,21],14:[2,21],17:[2,21],27:[2,21],32:[2,21],37:[2,21],42:[2,21],45:[2,21],46:[2,21],49:[2,21],53:[2,21]},{21:[2,90],31:[2,90],52:[2,90],62:[2,90],66:[2,90],69:[2,90]},{67:[1,96]},{18:65,57:112,58:66,59:[1,40],66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,22],13:[2,22],14:[2,22],17:[2,22],27:[2,22],32:[2,22],37:[2,22],42:[2,22],45:[2,22],46:[2,22],49:[2,22],53:[2,22]},{31:[1,113]},{45:[2,18]},{45:[2,72]},{18:65,31:[2,67],39:114,57:115,58:66,59:[1,40],63:116,64:67,65:68,66:[1,69],69:[2,67],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,23],13:[2,23],14:[2,23],17:[2,23],27:[2,23],32:[2,23],37:[2,23],42:[2,23],45:[2,23],46:[2,23],49:[2,23],53:[2,23]},{62:[1,117]},{59:[2,86],62:[2,86],66:[2,86],74:[2,86],75:[2,86],76:[2,86],77:[2,86],78:[2,86],79:[2,86]},{62:[2,88]},{31:[1,118]},{31:[2,58]},{66:[1,120],70:119},{31:[1,121]},{31:[2,64]},{14:[2,11]},{21:[2,28],31:[2,28],52:[2,28],62:[2,28],66:[2,28],69:[2,28]},{5:[2,20],13:[2,20],14:[2,20],17:[2,20],27:[2,20],32:[2,20],37:[2,20],42:[2,20],45:[2,20],46:[2,20],49:[2,20],53:[2,20]},{31:[2,69],40:122,68:123,69:[1,108]},{31:[2,66],59:[2,66],66:[2,66],69:[2,66],74:[2,66],75:[2,66],76:[2,66],77:[2,66],78:[2,66],79:[2,66]},{31:[2,68],69:[2,68]},{21:[2,26],31:[2,26],52:[2,26],59:[2,26],62:[2,26],66:[2,26],69:[2,26],74:[2,26],75:[2,26],76:[2,26],77:[2,26],78:[2,26],79:[2,26]},{13:[2,14],14:[2,14],17:[2,14],27:[2,14],32:[2,14],37:[2,14],42:[2,14],45:[2,14],46:[2,14],49:[2,14],53:[2,14]},{66:[1,125],71:[1,124]},{66:[2,91],71:[2,91]},{13:[2,15],14:[2,15],17:[2,15],27:[2,15],32:[2,15],42:[2,15],45:[2,15],46:[2,15],49:[2,15],53:[2,15]},{31:[1,126]},{31:[2,70]},{31:[2,29]},{66:[2,92],71:[2,92]},{13:[2,16],14:[2,16],17:[2,16],27:[2,16],32:[2,16],37:[2,16],42:[2,16],45:[2,16],46:[2,16],49:[2,16],53:[2,16]}],defaultActions:{4:[2,1],49:[2,50],51:[2,19],55:[2,52],64:[2,76],73:[2,80],78:[2,17],82:[2,84],92:[2,48],99:[2,18],100:[2,72],105:[2,88],107:[2,58],110:[2,64],111:[2,11],123:[2,70],124:[2,29]},parseError:function h(n,m){throw new Error(n)
},parse:function k(x){var E=this,u=[0],N=[null],z=[],O=this.table,n="",y=0,L=0,q=0,w=2,B=1;
this.lexer.setInput(x);
this.lexer.yy=this.yy;
this.yy.lexer=this.lexer;
this.yy.parser=this;
if(typeof this.lexer.yylloc=="undefined"){this.lexer.yylloc={}
}var o=this.lexer.yylloc;
z.push(o);
var s=this.lexer.options&&this.lexer.options.ranges;
if(typeof this.yy.parseError==="function"){this.parseError=this.yy.parseError
}function D(p){u.length=u.length-2*p;
N.length=N.length-p;
z.length=z.length-p
}function C(){var p;
p=E.lexer.lex()||1;
if(typeof p!=="number"){p=E.symbols_[p]||p
}return p
}var K,G,t,J,P,A,I={},F,M,m,v;
while(true){t=u[u.length-1];
if(this.defaultActions[t]){J=this.defaultActions[t]
}else{if(K===null||typeof K=="undefined"){K=C()
}J=O[t]&&O[t][K]
}if(typeof J==="undefined"||!J.length||!J[0]){var H="";
if(!q){v=[];
for(F in O[t]){if(this.terminals_[F]&&F>2){v.push("'"+this.terminals_[F]+"'")
}}if(this.lexer.showPosition){H="Parse error on line "+(y+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[K]||K)+"'"
}else{H="Parse error on line "+(y+1)+": Unexpected "+(K==1?"end of input":"'"+(this.terminals_[K]||K)+"'")
}this.parseError(H,{text:this.lexer.match,token:this.terminals_[K]||K,line:this.lexer.yylineno,loc:o,expected:v})
}}if(J[0] instanceof Array&&J.length>1){throw new Error("Parse Error: multiple actions possible at state: "+t+", token: "+K)
}switch(J[0]){case 1:u.push(K);
N.push(this.lexer.yytext);
z.push(this.lexer.yylloc);
u.push(J[1]);
K=null;
if(!G){L=this.lexer.yyleng;
n=this.lexer.yytext;
y=this.lexer.yylineno;
o=this.lexer.yylloc;
if(q>0){q--
}}else{K=G;
G=null
}break;
case 2:M=this.productions_[J[1]][1];
I.$=N[N.length-M];
I._$={first_line:z[z.length-(M||1)].first_line,last_line:z[z.length-1].last_line,first_column:z[z.length-(M||1)].first_column,last_column:z[z.length-1].last_column};
if(s){I._$.range=[z[z.length-(M||1)].range[0],z[z.length-1].range[1]]
}A=this.performAction.call(I,n,L,y,this.yy,J[1],N,z);
if(typeof A!=="undefined"){return A
}if(M){u=u.slice(0,-1*M*2);
N=N.slice(0,-1*M);
z=z.slice(0,-1*M)
}u.push(this.productions_[J[1]][0]);
N.push(I.$);
z.push(I._$);
m=O[u[u.length-2]][u[u.length-1]];
u.push(m);
break;
case 3:return true
}}return true
}};
var e=(function(){var o={EOF:1,parseError:function q(E,D){if(this.yy.parser){this.yy.parser.parseError(E,D)
}else{throw new Error(E)
}},setInput:function p(D){this._input=D;
this._more=this._less=this.done=false;
this.yylineno=this.yyleng=0;
this.yytext=this.matched=this.match="";
this.conditionStack=["INITIAL"];
this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};
if(this.options.ranges){this.yylloc.range=[0,0]
}this.offset=0;
return this
},input:function z(){var E=this._input[0];
this.yytext+=E;
this.yyleng++;
this.offset++;
this.match+=E;
this.matched+=E;
var D=E.match(/(?:\r\n?|\n).*/g);
if(D){this.yylineno++;
this.yylloc.last_line++
}else{this.yylloc.last_column++
}if(this.options.ranges){this.yylloc.range[1]++
}this._input=this._input.slice(1);
return E
},unput:function x(F){var D=F.length;
var E=F.split(/(?:\r\n?|\n)/g);
this._input=F+this._input;
this.yytext=this.yytext.substr(0,this.yytext.length-D-1);
this.offset-=D;
var H=this.match.split(/(?:\r\n?|\n)/g);
this.match=this.match.substr(0,this.match.length-1);
this.matched=this.matched.substr(0,this.matched.length-1);
if(E.length-1){this.yylineno-=E.length-1
}var G=this.yylloc.range;
this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:E?(E.length===H.length?this.yylloc.first_column:0)+H[H.length-E.length].length-E[0].length:this.yylloc.first_column-D};
if(this.options.ranges){this.yylloc.range=[G[0],G[0]+this.yyleng-D]
}return this
},more:function v(){this._more=true;
return this
},less:function A(D){this.unput(this.match.slice(D))
},pastInput:function t(){var D=this.matched.substr(0,this.matched.length-this.match.length);
return(D.length>20?"...":"")+D.substr(-20).replace(/\n/g,"")
},upcomingInput:function B(){var D=this.match;
if(D.length<20){D+=this._input.substr(0,20-D.length)
}return(D.substr(0,20)+(D.length>20?"...":"")).replace(/\n/g,"")
},showPosition:function w(){var D=this.pastInput();
var E=new Array(D.length+1).join("-");
return D+this.upcomingInput()+"\n"+E+"^"
},next:function s(){if(this.done){return this.EOF
}if(!this._input){this.done=true
}var J,H,E,G,F,D;
if(!this._more){this.yytext="";
this.match=""
}var K=this._currentRules();
for(var I=0;
I<K.length;
I++){E=this._input.match(this.rules[K[I]]);
if(E&&(!H||E[0].length>H[0].length)){H=E;
G=I;
if(!this.options.flex){break
}}}if(H){D=H[0].match(/(?:\r\n?|\n).*/g);
if(D){this.yylineno+=D.length
}this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:D?D[D.length-1].length-D[D.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+H[0].length};
this.yytext+=H[0];
this.match+=H[0];
this.matches=H;
this.yyleng=this.yytext.length;
if(this.options.ranges){this.yylloc.range=[this.offset,this.offset+=this.yyleng]
}this._more=false;
this._input=this._input.slice(H[0].length);
this.matched+=H[0];
J=this.performAction.call(this,this.yy,this,K[G],this.conditionStack[this.conditionStack.length-1]);
if(this.done&&this._input){this.done=false
}if(J){return J
}else{return
}}if(this._input===""){return this.EOF
}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})
}},lex:function m(){var D=this.next();
if(typeof D!=="undefined"){return D
}else{return this.lex()
}},begin:function n(D){this.conditionStack.push(D)
},popState:function r(){return this.conditionStack.pop()
},_currentRules:function C(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules
},topState:function u(){return this.conditionStack[this.conditionStack.length-2]
},pushState:function n(D){this.begin(D)
}};
o.options={};
o.performAction=function y(I,E,H,D){function F(K,J){return E.yytext=E.yytext.substr(K,E.yyleng-J)
}var G=D;
switch(H){case 0:if(E.yytext.slice(-2)==="\\\\"){F(0,1);
this.begin("mu")
}else{if(E.yytext.slice(-1)==="\\"){F(0,1);
this.begin("emu")
}else{this.begin("mu")
}}if(E.yytext){return 14
}break;
case 1:return 14;
break;
case 2:this.popState();
return 14;
break;
case 3:E.yytext=E.yytext.substr(5,E.yyleng-9);
this.popState();
return 16;
break;
case 4:return 14;
break;
case 5:this.popState();
return 13;
break;
case 6:return 59;
break;
case 7:return 62;
break;
case 8:return 17;
break;
case 9:this.popState();
this.begin("raw");
return 21;
break;
case 10:return 53;
break;
case 11:return 27;
break;
case 12:return 45;
break;
case 13:this.popState();
return 42;
break;
case 14:this.popState();
return 42;
break;
case 15:return 32;
break;
case 16:return 37;
break;
case 17:return 49;
break;
case 18:return 46;
break;
case 19:this.unput(E.yytext);
this.popState();
this.begin("com");
break;
case 20:this.popState();
return 13;
break;
case 21:return 46;
break;
case 22:return 67;
break;
case 23:return 66;
break;
case 24:return 66;
break;
case 25:return 81;
break;
case 26:break;
case 27:this.popState();
return 52;
break;
case 28:this.popState();
return 31;
break;
case 29:E.yytext=F(1,2).replace(/\\"/g,'"');
return 74;
break;
case 30:E.yytext=F(1,2).replace(/\\'/g,"'");
return 74;
break;
case 31:return 79;
break;
case 32:return 76;
break;
case 33:return 76;
break;
case 34:return 77;
break;
case 35:return 78;
break;
case 36:return 75;
break;
case 37:return 69;
break;
case 38:return 71;
break;
case 39:return 66;
break;
case 40:return 66;
break;
case 41:return"INVALID";
break;
case 42:return 5;
break
}};
o.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
o.conditions={mu:{rules:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],inclusive:false},emu:{rules:[2],inclusive:false},com:{rules:[5],inclusive:false},raw:{rules:[3,4],inclusive:false},INITIAL:{rules:[0,1,42],inclusive:true}};
return o
})();
l.lexer=e;
function j(){this.yy={}
}j.prototype=l;
l.Parser=j;
return new j()
})();
b["default"]=a;
c.exports=b["default"]
},function(b,d,a){var l=a(8)["default"];
d.__esModule=true;
var c=a(6);
var g=l(c);
function e(){}e.prototype=new g["default"]();
e.prototype.Program=function(t){var p=!this.isRootSeen;
this.isRootSeen=true;
var u=t.body;
for(var s=0,q=u.length;
s<q;
s++){var v=u[s],m=this.accept(v);
if(!m){continue
}var o=f(u,s,p),r=j(u,s,p),n=m.openStandalone&&o,x=m.closeStandalone&&r,w=m.inlineStandalone&&o&&r;
if(m.close){h(u,s,true)
}if(m.open){k(u,s,true)
}if(w){h(u,s);
if(k(u,s)){if(v.type==="PartialStatement"){v.indent=/([ \t]+$)/.exec(u[s-1].original)[1]
}}}if(n){h((v.program||v.inverse).body);
k(u,s)
}if(x){h(u,s);
k((v.inverse||v.program).body)
}}return t
};
e.prototype.BlockStatement=function(s){this.accept(s.program);
this.accept(s.inverse);
var o=s.program||s.inverse,m=s.program&&s.inverse,n=m,r=m;
if(m&&m.chained){n=m.body[0].program;
while(r.chained){r=r.body[r.body.length-1].program
}}var p={open:s.openStrip.open,close:s.closeStrip.close,openStandalone:j(o.body),closeStandalone:f((n||o).body)};
if(s.openStrip.close){h(o.body,null,true)
}if(m){var q=s.inverseStrip;
if(q.open){k(o.body,null,true)
}if(q.close){h(n.body,null,true)
}if(s.closeStrip.open){k(r.body,null,true)
}if(f(o.body)&&j(n.body)){k(o.body);
h(n.body)
}}else{if(s.closeStrip.open){k(o.body,null,true)
}}return p
};
e.prototype.MustacheStatement=function(m){return m.strip
};
e.prototype.PartialStatement=e.prototype.CommentStatement=function(n){var m=n.strip||{};
return{inlineStandalone:true,open:m.open,close:m.close}
};
function f(m,o,n){if(o===undefined){o=m.length
}var q=m[o-1],p=m[o-2];
if(!q){return n
}if(q.type==="ContentStatement"){return(p||!n?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(q.original)
}}function j(m,o,n){if(o===undefined){o=-1
}var q=m[o+1],p=m[o+2];
if(!q){return n
}if(q.type==="ContentStatement"){return(p||!n?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(q.original)
}}function h(n,p,m){var q=n[p==null?0:p+1];
if(!q||q.type!=="ContentStatement"||!m&&q.rightStripped){return
}var o=q.value;
q.value=q.value.replace(m?/^\s+/:/^[ \t]*\r?\n?/,"");
q.rightStripped=q.value!==o
}function k(n,p,m){var q=n[p==null?n.length-1:p-1];
if(!q||q.type!=="ContentStatement"||!m&&q.leftStripped){return
}var o=q.value;
q.value=q.value.replace(m?/\s+$/:/[ \t]+$/,"");
q.leftStripped=q.value!==o;
return q.leftStripped
}d["default"]=e;
b.exports=d["default"]
},function(c,g,b){var o=b(8)["default"];
g.__esModule=true;
g.SourceLocation=j;
g.id=a;
g.stripFlags=e;
g.stripComment=l;
g.preparePath=d;
g.prepareMustache=h;
g.prepareRawBlock=k;
g.prepareBlock=m;
var f=b(12);
var n=o(f);
function j(q,p){this.source=q;
this.start={line:p.first_line,column:p.first_column};
this.end={line:p.last_line,column:p.last_column}
}function a(p){if(/^\[.*\]$/.test(p)){return p.substr(1,p.length-2)
}else{return p
}}function e(p,q){return{open:p.charAt(2)==="~",close:q.charAt(q.length-3)==="~"}
}function l(p){return p.replace(/^\{\{~?\!-?-?/,"").replace(/-?-?~?\}\}$/,"")
}function d(w,u,y){y=this.locInfo(y);
var s=w?"@":"",z=[],v=0,r="";
for(var x=0,t=u.length;
x<t;
x++){var q=u[x].part,p=u[x].original!==q;
s+=(u[x].separator||"")+q;
if(!p&&(q===".."||q==="."||q==="this")){if(z.length>0){throw new n["default"]("Invalid path: "+s,{loc:y})
}else{if(q===".."){v++;
r+="../"
}}}else{z.push(q)
}}return new this.PathExpression(w,v,z,s,y)
}function h(v,w,u,p,r,q){var t=p.charAt(3)||p.charAt(2),s=t!=="{"&&t!=="&";
return new this.MustacheStatement(v,w,u,s,r,this.locInfo(q))
}function k(p,s,u,r){if(p.path.original!==u){var t={loc:p.path.loc};
throw new n["default"](p.path.original+" doesn't match "+u,t)
}r=this.locInfo(r);
var q=new this.Program([s],null,{},r);
return new this.BlockStatement(p.path,p.params,p.hash,q,undefined,{},{},{},r)
}function m(t,s,u,x,q,v){if(x&&x.path&&t.path.original!==x.path.original){var w={loc:t.path.loc};
throw new n["default"](t.path.original+" doesn't match "+x.path.original,w)
}s.blockParams=t.blockParams;
var r=undefined,p=undefined;
if(u){if(u.chain){u.program.body[0].closeStrip=x.strip
}p=u.strip;
r=u.program
}if(q){q=r;
r=s;
s=q
}return new this.BlockStatement(t.path,t.params,t.hash,s,r,t.strip,p,x&&x.strip,this.locInfo(v))
}},function(b,x,d){x.__esModule=true;
var n=d(13);
var g=undefined;
try{if(false){var s=require("source-map");
g=s.SourceNode
}}catch(h){}if(!g){g=function(y,z,A,B){this.src="";
if(B){this.add(B)
}};
g.prototype={add:function r(y){if(n.isArray(y)){y=y.join("")
}this.src+=y
},prepend:function w(y){if(n.isArray(y)){y=y.join("")
}this.src=y+this.src
},toStringWithSourceMap:function e(){return{code:this.toString()}
},toString:function u(){return this.src
}}
}function c(B,z,D){if(n.isArray(B)){var A=[];
for(var C=0,y=B.length;
C<y;
C++){A.push(z.wrap(B[C],D))
}return A
}else{if(typeof B==="boolean"||typeof B==="number"){return B+""
}}return B
}function l(y){this.srcFile=y;
this.source=[]
}l.prototype={prepend:function w(y,z){this.source.unshift(this.wrap(y,z))
},push:function m(y,z){this.source.push(this.wrap(y,z))
},merge:function j(){var y=this.empty();
this.each(function(z){y.add(["  ",z,"\n"])
});
return y
},each:function f(z){for(var A=0,y=this.source.length;
A<y;
A++){z(this.source[A])
}},empty:function q(){var y=arguments[0]===undefined?this.currentLocation||{start:{}}:arguments[0];
return new g(y.start.line,y.start.column,this.srcFile)
},wrap:function p(y){var z=arguments[1]===undefined?this.currentLocation||{start:{}}:arguments[1];
if(y instanceof g){return y
}y=c(y,this,z);
return new g(z.start.line,z.start.column,this.srcFile,y)
},functionCall:function v(z,y,A){A=this.generateList(A);
return this.wrap([z,y?"."+y+"(":"(",A,")"])
},quotedString:function o(y){return'"'+(y+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'
},objectLiteral:function t(C){var B=[];
for(var z in C){if(C.hasOwnProperty(z)){var A=c(C[z],this);
if(A!=="undefined"){B.push([this.quotedString(z),":",A])
}}}var y=this.generateList(B);
y.prepend("{");
y.add("}");
return y
},generateList:function a(z,C){var A=this.empty(C);
for(var B=0,y=z.length;
B<y;
B++){if(B){A.add(",")
}A.add(c(z[B],this,C))
}return A
},generateArray:function k(y,A){var z=this.generateList(y,A);
z.prepend("[");
z.add("]");
return z
}};
x["default"]=l;
b.exports=x["default"]
}])
});
(function(e){var b=Date.now?Date.now():+(new Date),g=e.performance||{},f=[],a={},d=function(k,l){var j=0,m=f.length,h=[];
for(;
j<m;
j++){if(f[j][k]==l){h.push(f[j])
}}return h
},c=function(k,h){var j=f.length,l;
while(j--){l=f[j];
if(l.entryType==k&&(h===void 0||l.name==h)){f.splice(j,1)
}}};
if(!g.now){g.now=g.webkitNow||g.mozNow||g.msNow||function(){return(Date.now?Date.now():+(new Date))-b
}
}if(!g.mark){g.mark=g.webkitMark||function(h){var j={name:h,entryType:"mark",startTime:g.now(),duration:0};
f.push(j);
a[h]=j
}
}if(!g.measure){g.measure=g.webkitMeasure||function(h,k,j){k=a[k].startTime;
j=a[j].startTime;
f.push({name:h,entryType:"measure",startTime:k,duration:j-k})
}
}if(!g.getEntriesByType){g.getEntriesByType=g.webkitGetEntriesByType||function(h){return d("entryType",h)
}
}if(!g.getEntriesByName){g.getEntriesByName=g.webkitGetEntriesByName||function(h){return d("name",h)
}
}if(!g.clearMarks){g.clearMarks=g.webkitClearMarks||function(h){c("mark",h)
}
}if(!g.clearMeasures){g.clearMeasures=g.webkitClearMeasures||function(h){c("measure",h)
}
}e.performance=g;
if(typeof define==="function"&&(define.amd||define.ajs)){define("performance",[],function(){return g
})
}})(window);
(function(a){if(typeof exports=="object"&&typeof module=="object"){module.exports=a()
}else{if(typeof define=="function"&&define.amd){return define([],a)
}else{this.CodeMirror=a()
}}})(function(){var co=/gecko\/\d/i.test(navigator.userAgent);
var eC=/MSIE \d/.test(navigator.userAgent);
var bI=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
var dB=eC||bI;
var m=dB&&(eC?document.documentMode||6:bI[1]);
var cW=/WebKit\//.test(navigator.userAgent);
var dE=cW&&/Qt\/\d+\.\d+/.test(navigator.userAgent);
var c8=/Chrome\//.test(navigator.userAgent);
var dT=/Opera\//.test(navigator.userAgent);
var aB=/Apple Computer/.test(navigator.vendor);
var a7=/KHTML\//.test(navigator.userAgent);
var c3=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
var fm=/PhantomJS/.test(navigator.userAgent);
var eT=/AppleWebKit/.test(navigator.userAgent)&&/Mobile\/\w+/.test(navigator.userAgent);
var d7=eT||/Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
var b6=eT||/Mac/.test(navigator.platform);
var aM=/win/i.test(navigator.platform);
var aU=dT&&navigator.userAgent.match(/Version\/(\d*\.\d*)/);
if(aU){aU=Number(aU[1])
}if(aU&&aU>=15){dT=false;
cW=true
}var bP=b6&&(dE||dT&&(aU==null||aU<12.11));
var fW=co||(dB&&m>=9);
var fZ=false,a3=false;
function K(f4,f5){if(!(this instanceof K)){return new K(f4,f5)
}this.options=f5=f5?aK(f5):{};
aK(eV,f5,false);
cd(f5);
var f9=f5.value;
if(typeof f9=="string"){f9=new at(f9,f5.mode)
}this.doc=f9;
var f8=this.display=new eA(f4,f9);
f8.wrapper.CodeMirror=this;
d3(this);
cM(this);
if(f5.lineWrapping){this.display.wrapper.className+=" CodeMirror-wrap"
}if(f5.autofocus&&!d7){er(this)
}this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:false,focused:false,suppressEdits:false,pasteIncoming:false,cutIncoming:false,draggingText:false,highlight:new f3(),keySeq:null};
if(dB&&m<11){setTimeout(cv(fg,this,true),20)
}fH(this);
bf();
cG(this);
this.curOp.forceUpdate=true;
d2(this,f9);
if((f5.autofocus&&!d7)||dF()==f8.input){setTimeout(cv(cA,this),20)
}else{aR(this)
}for(var f7 in bb){if(bb.hasOwnProperty(f7)){bb[f7](this,f5[f7],cb)
}}dW(this);
for(var f6=0;
f6<a4.length;
++f6){a4[f6](this)
}am(this)
}function eA(f4,f6){var f7=this;
var f5=f7.input=fO("textarea",null,null,"position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
if(cW){f5.style.width="1000px"
}else{f5.setAttribute("wrap","off")
}if(eT){f5.style.border="1px solid black"
}f5.setAttribute("autocorrect","off");
f5.setAttribute("autocapitalize","off");
f5.setAttribute("spellcheck","false");
f7.inputDiv=fO("div",[f5],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");
f7.scrollbarH=fO("div",[fO("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");
f7.scrollbarV=fO("div",[fO("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar");
f7.scrollbarFiller=fO("div",null,"CodeMirror-scrollbar-filler");
f7.gutterFiller=fO("div",null,"CodeMirror-gutter-filler");
f7.lineDiv=fO("div",null,"CodeMirror-code");
f7.selectionDiv=fO("div",null,null,"position: relative; z-index: 1");
f7.cursorDiv=fO("div",null,"CodeMirror-cursors");
f7.measure=fO("div",null,"CodeMirror-measure");
f7.lineMeasure=fO("div",null,"CodeMirror-measure");
f7.lineSpace=fO("div",[f7.measure,f7.lineMeasure,f7.selectionDiv,f7.cursorDiv,f7.lineDiv],null,"position: relative; outline: none");
f7.mover=fO("div",[fO("div",[f7.lineSpace],"CodeMirror-lines")],null,"position: relative");
f7.sizer=fO("div",[f7.mover],"CodeMirror-sizer");
f7.heightForcer=fO("div",null,null,"position: absolute; height: "+bh+"px; width: 1px;");
f7.gutters=fO("div",null,"CodeMirror-gutters");
f7.lineGutter=null;
f7.scroller=fO("div",[f7.sizer,f7.heightForcer,f7.gutters],"CodeMirror-scroll");
f7.scroller.setAttribute("tabIndex","-1");
f7.wrapper=fO("div",[f7.inputDiv,f7.scrollbarH,f7.scrollbarV,f7.scrollbarFiller,f7.gutterFiller,f7.scroller],"CodeMirror");
if(dB&&m<8){f7.gutters.style.zIndex=-1;
f7.scroller.style.paddingRight=0
}if(eT){f5.style.width="0px"
}if(!cW){f7.scroller.draggable=true
}if(a7){f7.inputDiv.style.height="1px";
f7.inputDiv.style.position="absolute"
}if(dB&&m<8){f7.scrollbarH.style.minHeight=f7.scrollbarV.style.minWidth="18px"
}if(f4){if(f4.appendChild){f4.appendChild(f7.wrapper)
}else{f4(f7.wrapper)
}}f7.viewFrom=f7.viewTo=f6.first;
f7.view=[];
f7.externalMeasured=null;
f7.viewOffset=0;
f7.lastWrapHeight=f7.lastWrapWidth=0;
f7.updateLineNumbers=null;
f7.lineNumWidth=f7.lineNumInnerWidth=f7.lineNumChars=null;
f7.prevInput="";
f7.alignWidgets=false;
f7.pollingFast=false;
f7.poll=new f3();
f7.cachedCharWidth=f7.cachedTextHeight=f7.cachedPaddingH=null;
f7.inaccurateSelection=false;
f7.maxLine=null;
f7.maxLineLength=0;
f7.maxLineChanged=false;
f7.wheelDX=f7.wheelDY=f7.wheelStartX=f7.wheelStartY=null;
f7.shift=false;
f7.selForContextMenu=null
}function bq(f4){f4.doc.mode=K.getMode(f4.options,f4.doc.modeOption);
ec(f4)
}function ec(f4){f4.doc.iter(function(f5){if(f5.stateAfter){f5.stateAfter=null
}if(f5.styles){f5.styles=null
}});
f4.doc.frontier=f4.doc.first;
d6(f4,100);
f4.state.modeGen++;
if(f4.curOp){ah(f4)
}}function ey(f4){if(f4.options.lineWrapping){fs(f4.display.wrapper,"CodeMirror-wrap");
f4.display.sizer.style.minWidth=""
}else{f(f4.display.wrapper,"CodeMirror-wrap");
g(f4)
}Z(f4);
ah(f4);
ak(f4);
setTimeout(function(){eQ(f4)
},100)
}function ba(f4){var f6=aT(f4.display),f5=f4.options.lineWrapping;
var f7=f5&&Math.max(5,f4.display.scroller.clientWidth/dv(f4.display)-3);
return function(f9){if(fo(f4.doc,f9)){return 0
}var f8=0;
if(f9.widgets){for(var ga=0;
ga<f9.widgets.length;
ga++){if(f9.widgets[ga].height){f8+=f9.widgets[ga].height
}}}if(f5){return f8+(Math.ceil(f9.text.length/f7)||1)*f6
}else{return f8+f6
}}
}function Z(f4){var f6=f4.doc,f5=ba(f4);
f6.iter(function(f7){var f8=f5(f7);
if(f8!=f7.height){fS(f7,f8)
}})
}function cM(f4){f4.display.wrapper.className=f4.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+f4.options.theme.replace(/(^|\s)\s*/g," cm-s-");
ak(f4)
}function dn(f4){d3(f4);
ah(f4);
setTimeout(function(){ew(f4)
},20)
}function d3(f4){var f5=f4.display.gutters,f9=f4.options.gutters;
dS(f5);
for(var f6=0;
f6<f9.length;
++f6){var f7=f9[f6];
var f8=f5.appendChild(fO("div",null,"CodeMirror-gutter "+f7));
if(f7=="CodeMirror-linenumbers"){f4.display.lineGutter=f8;
f8.style.width=(f4.display.lineNumWidth||1)+"px"
}}f5.style.display=f6?"":"none";
c0(f4)
}function c0(f4){var f5=f4.display.gutters.offsetWidth;
f4.display.sizer.style.marginLeft=f5+"px";
f4.display.scrollbarH.style.left=f4.options.fixedGutter?f5+"px":0
}function ed(f6){if(f6.height==0){return 0
}var f5=f6.text.length,f4,f8=f6;
while(f4=eG(f8)){var f7=f4.find(0,true);
f8=f7.from.line;
f5+=f7.from.ch-f7.to.ch
}f8=f6;
while(f4=em(f8)){var f7=f4.find(0,true);
f5-=f8.text.length-f7.from.ch;
f8=f7.to.line;
f5+=f8.text.length-f7.to.ch
}return f5
}function g(f4){var f6=f4.display,f5=f4.doc;
f6.maxLine=e6(f5,f5.first);
f6.maxLineLength=ed(f6.maxLine);
f6.maxLineChanged=true;
f5.iter(function(f8){var f7=ed(f8);
if(f7>f6.maxLineLength){f6.maxLineLength=f7;
f6.maxLine=f8
}})
}function cd(f4){var f5=dd(f4.gutters,"CodeMirror-linenumbers");
if(f5==-1&&f4.lineNumbers){f4.gutters=f4.gutters.concat(["CodeMirror-linenumbers"])
}else{if(f5>-1&&!f4.lineNumbers){f4.gutters=f4.gutters.slice(0);
f4.gutters.splice(f5,1)
}}}function cO(f4){return f4.display.scroller.clientHeight-f4.display.wrapper.clientHeight<bh-3
}function ds(f5){var f4=f5.display.scroller;
return{clientHeight:f4.clientHeight,barHeight:f5.display.scrollbarV.clientHeight,scrollWidth:f4.scrollWidth,clientWidth:f4.clientWidth,hScrollbarTakesSpace:cO(f5),barWidth:f5.display.scrollbarH.clientWidth,docHeight:Math.round(f5.doc.height+bH(f5.display))}
}function eQ(gb,f4){if(!f4){f4=ds(gb)
}var f8=gb.display,f5=l(f8.measure);
var gc=f4.docHeight+bh;
var f6=f4.scrollWidth>f4.clientWidth;
if(f6&&f4.scrollWidth<=f4.clientWidth+1&&f5>0&&!f4.hScrollbarTakesSpace){f6=false
}var f7=gc>f4.clientHeight;
if(f7){f8.scrollbarV.style.display="block";
f8.scrollbarV.style.bottom=f6?f5+"px":"0";
f8.scrollbarV.firstChild.style.height=Math.max(0,gc-f4.clientHeight+(f4.barHeight||f8.scrollbarV.clientHeight))+"px"
}else{f8.scrollbarV.style.display="";
f8.scrollbarV.firstChild.style.height="0"
}if(f6){f8.scrollbarH.style.display="block";
f8.scrollbarH.style.right=f7?f5+"px":"0";
f8.scrollbarH.firstChild.style.width=(f4.scrollWidth-f4.clientWidth+(f4.barWidth||f8.scrollbarH.clientWidth))+"px"
}else{f8.scrollbarH.style.display="";
f8.scrollbarH.firstChild.style.width="0"
}if(f6&&f7){f8.scrollbarFiller.style.display="block";
f8.scrollbarFiller.style.height=f8.scrollbarFiller.style.width=f5+"px"
}else{f8.scrollbarFiller.style.display=""
}if(f6&&gb.options.coverGutterNextToScrollbar&&gb.options.fixedGutter){f8.gutterFiller.style.display="block";
f8.gutterFiller.style.height=f5+"px";
f8.gutterFiller.style.width=f8.gutters.offsetWidth+"px"
}else{f8.gutterFiller.style.display=""
}if(!gb.state.checkedOverlayScrollbar&&f4.clientHeight>0){if(f5===0){var ga=b6&&!c3?"12px":"18px";
f8.scrollbarV.style.minWidth=f8.scrollbarH.style.minHeight=ga;
var f9=function(gd){if(N(gd)!=f8.scrollbarV&&N(gd)!=f8.scrollbarH){cY(gb,ek)(gd)
}};
bW(f8.scrollbarV,"mousedown",f9);
bW(f8.scrollbarH,"mousedown",f9)
}gb.state.checkedOverlayScrollbar=true
}}function b5(f7,gb,f6){var f8=f6&&f6.top!=null?Math.max(0,f6.top):f7.scroller.scrollTop;
f8=Math.floor(f8-eZ(f7));
var f4=f6&&f6.bottom!=null?f6.bottom:f8+f7.wrapper.clientHeight;
var f9=bF(gb,f8),ga=bF(gb,f4);
if(f6&&f6.ensure){var f5=f6.ensure.from.line,gc=f6.ensure.to.line;
if(f5<f9){return{from:f5,to:bF(gb,bL(e6(gb,f5))+f7.wrapper.clientHeight)}
}if(Math.min(gc,gb.lastLine())>=ga){return{from:bF(gb,bL(e6(gb,gc))-f7.wrapper.clientHeight),to:gc}
}}return{from:f9,to:Math.max(ga,f9+1)}
}function ew(gc){var ga=gc.display,gb=ga.view;
if(!ga.alignWidgets&&(!ga.gutters.firstChild||!gc.options.fixedGutter)){return
}var f8=dO(ga)-ga.scroller.scrollLeft+gc.doc.scrollLeft;
var f4=ga.gutters.offsetWidth,f5=f8+"px";
for(var f7=0;
f7<gb.length;
f7++){if(!gb[f7].hidden){if(gc.options.fixedGutter&&gb[f7].gutter){gb[f7].gutter.style.left=f5
}var f9=gb[f7].alignable;
if(f9){for(var f6=0;
f6<f9.length;
f6++){f9[f6].style.left=f5
}}}}if(gc.options.fixedGutter){ga.gutters.style.left=(f8+f4)+"px"
}}function dW(f4){if(!f4.options.lineNumbers){return false
}var f9=f4.doc,f5=ej(f4.options,f9.first+f9.size-1),f8=f4.display;
if(f5.length!=f8.lineNumChars){var ga=f8.measure.appendChild(fO("div",[fO("div",f5)],"CodeMirror-linenumber CodeMirror-gutter-elt"));
var f6=ga.firstChild.offsetWidth,f7=ga.offsetWidth-f6;
f8.lineGutter.style.width="";
f8.lineNumInnerWidth=Math.max(f6,f8.lineGutter.offsetWidth-f7);
f8.lineNumWidth=f8.lineNumInnerWidth+f7;
f8.lineNumChars=f8.lineNumInnerWidth?f5.length:-1;
f8.lineGutter.style.width=f8.lineNumWidth+"px";
c0(f4);
return true
}return false
}function ej(f4,f5){return String(f4.lineNumberFormatter(f5+f4.firstLineNumber))
}function dO(f4){return f4.scroller.getBoundingClientRect().left-f4.sizer.getBoundingClientRect().left
}function aG(f5,f4,f6){var f7=f5.display;
this.viewport=f4;
this.visible=b5(f7,f5.doc,f4);
this.editorIsHidden=!f7.wrapper.offsetWidth;
this.wrapperHeight=f7.wrapper.clientHeight;
this.wrapperWidth=f7.wrapper.clientWidth;
this.oldViewFrom=f7.viewFrom;
this.oldViewTo=f7.viewTo;
this.oldScrollerWidth=f7.scroller.clientWidth;
this.force=f6;
this.dims=e4(f5)
}function E(gd,f7){var f8=gd.display,gc=gd.doc;
if(f7.editorIsHidden){eo(gd);
return false
}if(!f7.force&&f7.visible.from>=f8.viewFrom&&f7.visible.to<=f8.viewTo&&(f8.updateLineNumbers==null||f8.updateLineNumbers>=f8.viewTo)&&c7(gd)==0){return false
}if(dW(gd)){eo(gd);
f7.dims=e4(gd)
}var f6=gc.first+gc.size;
var ga=Math.max(f7.visible.from-gd.options.viewportMargin,gc.first);
var gb=Math.min(f6,f7.visible.to+gd.options.viewportMargin);
if(f8.viewFrom<ga&&ga-f8.viewFrom<20){ga=Math.max(gc.first,f8.viewFrom)
}if(f8.viewTo>gb&&f8.viewTo-gb<20){gb=Math.min(f6,f8.viewTo)
}if(a3){ga=aS(gd.doc,ga);
gb=dU(gd.doc,gb)
}var f5=ga!=f8.viewFrom||gb!=f8.viewTo||f8.lastWrapHeight!=f7.wrapperHeight||f8.lastWrapWidth!=f7.wrapperWidth;
cP(gd,ga,gb);
f8.viewOffset=bL(e6(gd.doc,f8.viewFrom));
gd.display.mover.style.top=f8.viewOffset+"px";
var f4=c7(gd);
if(!f5&&f4==0&&!f7.force&&(f8.updateLineNumbers==null||f8.updateLineNumbers>=f8.viewTo)){return false
}var f9=dF();
if(f4>4){f8.lineDiv.style.display="none"
}cm(gd,f8.updateLineNumbers,f7.dims);
if(f4>4){f8.lineDiv.style.display=""
}if(f9&&dF()!=f9&&f9.offsetHeight){f9.focus()
}dS(f8.cursorDiv);
dS(f8.selectionDiv);
if(f5){f8.lastWrapHeight=f7.wrapperHeight;
f8.lastWrapWidth=f7.wrapperWidth;
d6(gd,400)
}f8.updateLineNumbers=null;
return true
}function cj(f5,f9){var f7=f9.force,f4=f9.viewport;
for(var f8=true;
;
f8=false){if(f8&&f5.options.lineWrapping&&f9.oldScrollerWidth!=f5.display.scroller.clientWidth){f7=true
}else{f7=false;
if(f4&&f4.top!=null){f4={top:Math.min(f5.doc.height+bH(f5.display)-bh-f5.display.scroller.clientHeight,f4.top)}
}f9.visible=b5(f5.display,f5.doc,f4);
if(f9.visible.from>=f5.display.viewFrom&&f9.visible.to<=f5.display.viewTo){break
}}if(!E(f5,f9)){break
}a5(f5);
var f6=ds(f5);
bB(f5);
dr(f5,f6);
eQ(f5,f6)
}ae(f5,"update",f5);
if(f5.display.viewFrom!=f9.oldViewFrom||f5.display.viewTo!=f9.oldViewTo){ae(f5,"viewportChange",f5,f5.display.viewFrom,f5.display.viewTo)
}}function dK(f5,f4){var f7=new aG(f5,f4);
if(E(f5,f7)){a5(f5);
cj(f5,f7);
var f6=ds(f5);
bB(f5);
dr(f5,f6);
eQ(f5,f6)
}}function dr(f4,f5){f4.display.sizer.style.minHeight=f4.display.heightForcer.style.top=f5.docHeight+"px";
f4.display.gutters.style.height=Math.max(f5.docHeight,f5.clientHeight-bh)+"px"
}function fR(f4,f5){if(f4.display.sizer.offsetWidth+f4.display.gutters.offsetWidth<f4.display.scroller.clientWidth-1){f4.display.sizer.style.minHeight=f4.display.heightForcer.style.top="0px";
f4.display.gutters.style.height=f5.docHeight+"px"
}}function a5(gb){var f9=gb.display;
var f5=f9.lineDiv.offsetTop;
for(var f6=0;
f6<f9.view.length;
f6++){var gc=f9.view[f6],gd;
if(gc.hidden){continue
}if(dB&&m<8){var f8=gc.node.offsetTop+gc.node.offsetHeight;
gd=f8-f5;
f5=f8
}else{var f7=gc.node.getBoundingClientRect();
gd=f7.bottom-f7.top
}var ga=gc.line.height-gd;
if(gd<2){gd=aT(f9)
}if(ga>0.001||ga<-0.001){fS(gc.line,gd);
ca(gc.line);
if(gc.rest){for(var f4=0;
f4<gc.rest.length;
f4++){ca(gc.rest[f4])
}}}}}function ca(f4){if(f4.widgets){for(var f5=0;
f5<f4.widgets.length;
++f5){f4.widgets[f5].height=f4.widgets[f5].node.offsetHeight
}}}function e4(f4){var f9=f4.display,f7={},f6={};
var f8=f9.gutters.clientLeft;
for(var ga=f9.gutters.firstChild,f5=0;
ga;
ga=ga.nextSibling,++f5){f7[f4.options.gutters[f5]]=ga.offsetLeft+ga.clientLeft+f8;
f6[f4.options.gutters[f5]]=ga.clientWidth
}return{fixedPos:dO(f9),gutterTotalWidth:f9.gutters.offsetWidth,gutterLeft:f7,gutterWidth:f6,wrapperWidth:f9.wrapper.clientWidth}
}function cm(gf,f6,ge){var gb=gf.display,gh=gf.options.lineNumbers;
var f4=gb.lineDiv,gg=f4.firstChild;
function ga(gj){var gi=gj.nextSibling;
if(cW&&b6&&gf.display.currentWheelTarget==gj){gj.style.display="none"
}else{gj.parentNode.removeChild(gj)
}return gi
}var gc=gb.view,f9=gb.viewFrom;
for(var f7=0;
f7<gc.length;
f7++){var f8=gc[f7];
if(f8.hidden){}else{if(!f8.node){var f5=aD(gf,f8,f9,ge);
f4.insertBefore(f5,gg)
}else{while(gg!=f8.node){gg=ga(gg)
}var gd=gh&&f6!=null&&f6<=f9&&f8.lineNumber;
if(f8.changes){if(dd(f8.changes,"gutter")>-1){gd=false
}ab(gf,f8,f9,ge)
}if(gd){dS(f8.lineNumber);
f8.lineNumber.appendChild(document.createTextNode(ej(gf.options,f9)))
}gg=f8.node.nextSibling
}}f9+=f8.size
}while(gg){gg=ga(gg)
}}function ab(f4,f6,f8,f9){for(var f5=0;
f5<f6.changes.length;
f5++){var f7=f6.changes[f5];
if(f7=="text"){fc(f4,f6)
}else{if(f7=="gutter"){db(f4,f6,f8,f9)
}else{if(f7=="class"){dy(f6)
}else{if(f7=="widget"){ao(f6,f9)
}}}}}f6.changes=null
}function fA(f4){if(f4.node==f4.text){f4.node=fO("div",null,null,"position: relative");
if(f4.text.parentNode){f4.text.parentNode.replaceChild(f4.node,f4.text)
}f4.node.appendChild(f4.text);
if(dB&&m<8){f4.node.style.zIndex=2
}}return f4.node
}function el(f5){var f4=f5.bgClass?f5.bgClass+" "+(f5.line.bgClass||""):f5.line.bgClass;
if(f4){f4+=" CodeMirror-linebackground"
}if(f5.background){if(f4){f5.background.className=f4
}else{f5.background.parentNode.removeChild(f5.background);
f5.background=null
}}else{if(f4){var f6=fA(f5);
f5.background=f6.insertBefore(fO("div",null,f4),f6.firstChild)
}}}function dM(f4,f5){var f6=f4.display.externalMeasured;
if(f6&&f6.line==f5.line){f4.display.externalMeasured=null;
f5.measure=f6.measure;
return f6.built
}return eJ(f4,f5)
}function fc(f4,f7){var f5=f7.text.className;
var f6=dM(f4,f7);
if(f7.text==f7.node){f7.node=f6.pre
}f7.text.parentNode.replaceChild(f6.pre,f7.text);
f7.text=f6.pre;
if(f6.bgClass!=f7.bgClass||f6.textClass!=f7.textClass){f7.bgClass=f6.bgClass;
f7.textClass=f6.textClass;
dy(f7)
}else{if(f5){f7.text.className=f5
}}}function dy(f5){el(f5);
if(f5.line.wrapClass){fA(f5).className=f5.line.wrapClass
}else{if(f5.node!=f5.text){f5.node.className=""
}}var f4=f5.textClass?f5.textClass+" "+(f5.line.textClass||""):f5.line.textClass;
f5.text.className=f4||""
}function db(gc,ga,f9,gb){if(ga.gutter){ga.node.removeChild(ga.gutter);
ga.gutter=null
}var f7=ga.line.gutterMarkers;
if(gc.options.lineNumbers||f7){var f5=fA(ga);
var f8=ga.gutter=f5.insertBefore(fO("div",null,"CodeMirror-gutter-wrapper","left: "+(gc.options.fixedGutter?gb.fixedPos:-gb.gutterTotalWidth)+"px; width: "+gb.gutterTotalWidth+"px"),ga.text);
if(ga.line.gutterClass){f8.className+=" "+ga.line.gutterClass
}if(gc.options.lineNumbers&&(!f7||!f7["CodeMirror-linenumbers"])){ga.lineNumber=f8.appendChild(fO("div",ej(gc.options,f9),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+gb.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+gc.display.lineNumInnerWidth+"px"))
}if(f7){for(var f6=0;
f6<gc.options.gutters.length;
++f6){var f4=gc.options.gutters[f6],gd=f7.hasOwnProperty(f4)&&f7[f4];
if(gd){f8.appendChild(fO("div",[gd],"CodeMirror-gutter-elt","left: "+gb.gutterLeft[f4]+"px; width: "+gb.gutterWidth[f4]+"px"))
}}}}}function ao(f4,f7){if(f4.alignable){f4.alignable=null
}for(var f6=f4.node.firstChild,f5;
f6;
f6=f5){var f5=f6.nextSibling;
if(f6.className=="CodeMirror-linewidget"){f4.node.removeChild(f6)
}}fl(f4,f7)
}function aD(f4,f6,f7,f8){var f5=dM(f4,f6);
f6.text=f6.node=f5.pre;
if(f5.bgClass){f6.bgClass=f5.bgClass
}if(f5.textClass){f6.textClass=f5.textClass
}dy(f6);
db(f4,f6,f7,f8);
fl(f6,f8);
return f6.node
}function fl(f5,f6){fT(f5.line,f5,f6,true);
if(f5.rest){for(var f4=0;
f4<f5.rest.length;
f4++){fT(f5.rest[f4],f5,f6,false)
}}}function fT(gc,f9,gb,f7){if(!gc.widgets){return
}var f4=fA(f9);
for(var f6=0,ga=gc.widgets;
f6<ga.length;
++f6){var f8=ga[f6],f5=fO("div",[f8.node],"CodeMirror-linewidget");
if(!f8.handleMouseEvents){f5.ignoreEvents=true
}bE(f8,f5,f9,gb);
if(f7&&f8.above){f4.insertBefore(f5,f9.gutter||f9.text)
}else{f4.appendChild(f5)
}ae(f8,"redraw")
}}function bE(f7,f6,f4,f8){if(f7.noHScroll){(f4.alignable||(f4.alignable=[])).push(f6);
var f5=f8.wrapperWidth;
f6.style.left=f8.fixedPos+"px";
if(!f7.coverGutter){f5-=f8.gutterTotalWidth;
f6.style.paddingLeft=f8.gutterTotalWidth+"px"
}f6.style.width=f5+"px"
}if(f7.coverGutter){f6.style.zIndex=5;
f6.style.position="relative";
if(!f7.noHScroll){f6.style.marginLeft=-f8.gutterTotalWidth+"px"
}}}var Y=K.Pos=function(f4,f5){if(!(this instanceof Y)){return new Y(f4,f5)
}this.line=f4;
this.ch=f5
};
var ce=K.cmpPos=function(f5,f4){return f5.line-f4.line||f5.ch-f4.ch
};
function ci(f4){return Y(f4.line,f4.ch)
}function bw(f5,f4){return ce(f5,f4)<0?f4:f5
}function ar(f5,f4){return ce(f5,f4)<0?f5:f4
}function fP(f4,f5){this.ranges=f4;
this.primIndex=f5
}fP.prototype={primary:function(){return this.ranges[this.primIndex]
},equals:function(f4){if(f4==this){return true
}if(f4.primIndex!=this.primIndex||f4.ranges.length!=this.ranges.length){return false
}for(var f6=0;
f6<this.ranges.length;
f6++){var f5=this.ranges[f6],f7=f4.ranges[f6];
if(ce(f5.anchor,f7.anchor)!=0||ce(f5.head,f7.head)!=0){return false
}}return true
},deepCopy:function(){for(var f4=[],f5=0;
f5<this.ranges.length;
f5++){f4[f5]=new dP(ci(this.ranges[f5].anchor),ci(this.ranges[f5].head))
}return new fP(f4,this.primIndex)
},somethingSelected:function(){for(var f4=0;
f4<this.ranges.length;
f4++){if(!this.ranges[f4].empty()){return true
}}return false
},contains:function(f7,f4){if(!f4){f4=f7
}for(var f6=0;
f6<this.ranges.length;
f6++){var f5=this.ranges[f6];
if(ce(f4,f5.from())>=0&&ce(f7,f5.to())<=0){return f6
}}return -1
}};
function dP(f4,f5){this.anchor=f4;
this.head=f5
}dP.prototype={from:function(){return ar(this.anchor,this.head)
},to:function(){return bw(this.anchor,this.head)
},empty:function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch
}};
function cw(f4,gb){var f6=f4[gb];
f4.sort(function(ge,gd){return ce(ge.from(),gd.from())
});
gb=dd(f4,f6);
for(var f8=1;
f8<f4.length;
f8++){var gc=f4[f8],f5=f4[f8-1];
if(ce(f5.to(),gc.from())>=0){var f9=ar(f5.from(),gc.from()),ga=bw(f5.to(),gc.to());
var f7=f5.empty()?gc.from()==gc.head:f5.from()==f5.head;
if(f8<=gb){--gb
}f4.splice(--f8,2,new dP(f7?ga:f9,f7?f9:ga))
}}return new fP(f4,gb)
}function eK(f4,f5){return new fP([new dP(f4,f5||f4)],0)
}function c1(f4,f5){return Math.max(f4.first,Math.min(f5,f4.first+f4.size-1))
}function fB(f5,f6){if(f6.line<f5.first){return Y(f5.first,0)
}var f4=f5.first+f5.size-1;
if(f6.line>f4){return Y(f4,e6(f5,f4).text.length)
}return fk(f6,e6(f5,f6.line).text.length)
}function fk(f6,f5){var f4=f6.ch;
if(f4==null||f4>f5){return Y(f6.line,f5)
}else{if(f4<0){return Y(f6.line,0)
}else{return f6
}}}function b8(f5,f4){return f4>=f5.first&&f4<f5.first+f5.size
}function dQ(f6,f7){for(var f4=[],f5=0;
f5<f7.length;
f5++){f4[f5]=fB(f6,f7[f5])
}return f4
}function fn(f9,f5,f8,f4){if(f9.cm&&f9.cm.display.shift||f9.extend){var f7=f5.anchor;
if(f4){var f6=ce(f8,f7)<0;
if(f6!=(ce(f4,f7)<0)){f7=f8;
f8=f4
}else{if(f6!=(ce(f8,f4)<0)){f8=f4
}}}return new dP(f7,f8)
}else{return new dP(f4||f8,f8)
}}function fL(f7,f6,f4,f5){bT(f7,new fP([fn(f7,f7.sel.primary(),f6,f4)],0),f5)
}function aw(f9,f8,f6){for(var f5=[],f7=0;
f7<f9.sel.ranges.length;
f7++){f5[f7]=fn(f9,f9.sel.ranges[f7],f8[f7],null)
}var f4=cw(f5,f9.sel.primIndex);
bT(f9,f4,f6)
}function e(f8,f7,f5,f6){var f4=f8.sel.ranges.slice(0);
f4[f7]=f5;
bT(f8,cw(f4,f8.sel.primIndex),f6)
}function I(f7,f5,f6,f4){bT(f7,eK(f5,f6),f4)
}function c(f6,f4){var f5={ranges:f4.ranges,update:function(f7){this.ranges=[];
for(var f8=0;
f8<f7.length;
f8++){this.ranges[f8]=new dP(fB(f6,f7[f8].anchor),fB(f6,f7[f8].head))
}}};
aC(f6,"beforeSelectionChange",f6,f5);
if(f6.cm){aC(f6.cm,"beforeSelectionChange",f6.cm,f5)
}if(f5.ranges!=f4.ranges){return cw(f5.ranges,f5.ranges.length-1)
}else{return f4
}}function eY(f8,f7,f5){var f4=f8.history.done,f6=fz(f4);
if(f6&&f6.ranges){f4[f4.length-1]=f7;
eg(f8,f7,f5)
}else{bT(f8,f7,f5)
}}function bT(f6,f5,f4){eg(f6,f5,f4);
fY(f6,f6.sel,f6.cm?f6.cm.curOp.id:NaN,f4)
}function eg(f7,f6,f5){if(e9(f7,"beforeSelectionChange")||f7.cm&&e9(f7.cm,"beforeSelectionChange")){f6=c(f7,f6)
}var f4=f5&&f5.bias||(ce(f6.primary().head,f7.sel.primary().head)<0?-1:1);
c5(f7,p(f7,f6,f4,true));
if(!(f5&&f5.scroll===false)&&f7.cm){fy(f7.cm)
}}function c5(f5,f4){if(f4.equals(f5.sel)){return
}f5.sel=f4;
if(f5.cm){f5.cm.curOp.updateInput=f5.cm.curOp.selectionChanged=true;
X(f5.cm)
}ae(f5,"cursorActivity",f5)
}function ep(f4){c5(f4,p(f4,f4.sel,null,false),aa)
}function p(gc,f4,f9,ga){var f6;
for(var f7=0;
f7<f4.ranges.length;
f7++){var f8=f4.ranges[f7];
var gb=bU(gc,f8.anchor,f9,ga);
var f5=bU(gc,f8.head,f9,ga);
if(f6||gb!=f8.anchor||f5!=f8.head){if(!f6){f6=f4.ranges.slice(0,f7)
}f6[f7]=new dP(gb,f5)
}}return f6?cw(f6,f4.primIndex):f4
}function bU(gd,gc,f9,ga){var ge=false,f6=gc;
var f7=f9||1;
gd.cantEdit=false;
search:for(;
;
){var gf=e6(gd,f6.line);
if(gf.markedSpans){for(var f8=0;
f8<gf.markedSpans.length;
++f8){var f4=gf.markedSpans[f8],f5=f4.marker;
if((f4.from==null||(f5.inclusiveLeft?f4.from<=f6.ch:f4.from<f6.ch))&&(f4.to==null||(f5.inclusiveRight?f4.to>=f6.ch:f4.to>f6.ch))){if(ga){aC(f5,"beforeCursorEnter");
if(f5.explicitlyCleared){if(!gf.markedSpans){break
}else{--f8;
continue
}}}if(!f5.atomic){continue
}var gb=f5.find(f7<0?-1:1);
if(ce(gb,f6)==0){gb.ch+=f7;
if(gb.ch<0){if(gb.line>gd.first){gb=fB(gd,Y(gb.line-1))
}else{gb=null
}}else{if(gb.ch>gf.text.length){if(gb.line<gd.first+gd.size-1){gb=Y(gb.line+1,0)
}else{gb=null
}}}if(!gb){if(ge){if(!ga){return bU(gd,gc,f9,true)
}gd.cantEdit=true;
return Y(gd.first,0)
}ge=true;
gb=gc;
f7=-f7
}}f6=gb;
continue search
}}}return f6
}}function bk(ge){var ga=ge.display,gd=ge.doc,gf={};
var gc=gf.cursors=document.createDocumentFragment();
var f6=gf.selection=document.createDocumentFragment();
for(var f8=0;
f8<gd.sel.ranges.length;
f8++){var f9=gd.sel.ranges[f8];
var f7=f9.empty();
if(f7||ge.options.showCursorWhenSelecting){C(ge,f9,gc)
}if(!f7){bC(ge,f9,f6)
}}if(ge.options.moveInputWithCursor){var gb=dL(ge,gd.sel.primary().head,"div");
var f4=ga.wrapper.getBoundingClientRect(),f5=ga.lineDiv.getBoundingClientRect();
gf.teTop=Math.max(0,Math.min(ga.wrapper.clientHeight-10,gb.top+f5.top-f4.top));
gf.teLeft=Math.max(0,Math.min(ga.wrapper.clientWidth-10,gb.left+f5.left-f4.left))
}return gf
}function al(f4,f5){bQ(f4.display.cursorDiv,f5.cursors);
bQ(f4.display.selectionDiv,f5.selection);
if(f5.teTop!=null){f4.display.inputDiv.style.top=f5.teTop+"px";
f4.display.inputDiv.style.left=f5.teLeft+"px"
}}function bB(f4){al(f4,bk(f4))
}function C(f4,f7,f6){var f9=dL(f4,f7.head,"div",null,null,!f4.options.singleCursorHeightPerLine);
var f8=f6.appendChild(fO("div","\u00a0","CodeMirror-cursor"));
f8.style.left=f9.left+"px";
f8.style.top=f9.top+"px";
f8.style.height=Math.max(0,f9.bottom-f9.top)*f4.options.cursorHeight+"px";
if(f9.other){var f5=f6.appendChild(fO("div","\u00a0","CodeMirror-cursor CodeMirror-secondarycursor"));
f5.style.display="";
f5.style.left=f9.other.left+"px";
f5.style.top=f9.other.top+"px";
f5.style.height=(f9.other.bottom-f9.other.top)*0.85+"px"
}}function bC(f8,ge,f9){var gh=f8.display,gl=f8.doc;
var f4=document.createDocumentFragment();
var gd=eW(f8.display),f7=gd.left,gi=gh.lineSpace.offsetWidth-gd.right;
function gf(gp,go,gn,gm){if(go<0){go=0
}go=Math.round(go);
gm=Math.round(gm);
f4.appendChild(fO("div",null,"CodeMirror-selected","position: absolute; left: "+gp+"px; top: "+go+"px; width: "+(gn==null?gi-gp:gn)+"px; height: "+(gm-go)+"px"))
}function f5(gn,gp,gs){var go=e6(gl,gn);
var gq=go.text.length;
var gt,gm;
function gr(gv,gu){return cH(f8,Y(gn,gv),"div",go,gu)
}dV(a(go),gp||0,gs==null?gq:gs,function(gB,gA,gu){var gx=gr(gB,"left"),gy,gz,gw;
if(gB==gA){gy=gx;
gz=gw=gx.left
}else{gy=gr(gA-1,"right");
if(gu=="rtl"){var gv=gx;
gx=gy;
gy=gv
}gz=gx.left;
gw=gy.right
}if(gp==null&&gB==0){gz=f7
}if(gy.top-gx.top>3){gf(gz,gx.top,null,gx.bottom);
gz=f7;
if(gx.bottom<gy.top){gf(gz,gx.bottom,null,gy.top)
}}if(gs==null&&gA==gq){gw=gi
}if(!gt||gx.top<gt.top||gx.top==gt.top&&gx.left<gt.left){gt=gx
}if(!gm||gy.bottom>gm.bottom||gy.bottom==gm.bottom&&gy.right>gm.right){gm=gy
}if(gz<f7+1){gz=f7
}gf(gz,gy.top,gw-gz,gy.bottom)
});
return{start:gt,end:gm}
}var gk=ge.from(),gj=ge.to();
if(gk.line==gj.line){f5(gk.line,gk.ch,gj.ch)
}else{var f6=e6(gl,gk.line),gb=e6(gl,gj.line);
var ga=A(f6)==A(gb);
var gc=f5(gk.line,gk.ch,ga?f6.text.length+1:null).end;
var gg=f5(gj.line,ga?0:null,gj.ch).start;
if(ga){if(gc.top<gg.top-2){gf(gc.right,gc.top,null,gc.bottom);
gf(f7,gg.top,gg.left,gg.bottom)
}else{gf(gc.right,gc.top,gg.left-gc.right,gc.bottom)
}}if(gc.bottom<gg.top){gf(f7,gc.bottom,null,gg.top)
}}f9.appendChild(f4)
}function q(f4){if(!f4.state.focused){return
}var f6=f4.display;
clearInterval(f6.blinker);
var f5=true;
f6.cursorDiv.style.visibility="";
if(f4.options.cursorBlinkRate>0){f6.blinker=setInterval(function(){f6.cursorDiv.style.visibility=(f5=!f5)?"":"hidden"
},f4.options.cursorBlinkRate)
}else{if(f4.options.cursorBlinkRate<0){f6.cursorDiv.style.visibility="hidden"
}}}function d6(f4,f5){if(f4.doc.mode.startState&&f4.doc.frontier<f4.display.viewTo){f4.state.highlight.set(f5,cv(cN,f4))
}}function cN(f4){var f8=f4.doc;
if(f8.frontier<f8.first){f8.frontier=f8.first
}if(f8.frontier>=f4.display.viewTo){return
}var f6=+new Date+f4.options.workTime;
var f7=b2(f8.mode,dt(f4,f8.frontier));
var f5=[];
f8.iter(f8.frontier,Math.min(f8.first+f8.size,f4.display.viewTo+500),function(f9){if(f8.frontier>=f4.display.viewFrom){var gc=f9.styles;
var ge=fr(f4,f9,f7,true);
f9.styles=ge.styles;
var gb=f9.styleClasses,gd=ge.classes;
if(gd){f9.styleClasses=gd
}else{if(gb){f9.styleClasses=null
}}var gf=!gc||gc.length!=f9.styles.length||gb!=gd&&(!gb||!gd||gb.bgClass!=gd.bgClass||gb.textClass!=gd.textClass);
for(var ga=0;
!gf&&ga<gc.length;
++ga){gf=gc[ga]!=f9.styles[ga]
}if(gf){f5.push(f8.frontier)
}f9.stateAfter=b2(f8.mode,f7)
}else{dp(f4,f9.text,f7);
f9.stateAfter=f8.frontier%5==0?b2(f8.mode,f7):null
}++f8.frontier;
if(+new Date>f6){d6(f4,f4.options.workDelay);
return true
}});
if(f5.length){cK(f4,function(){for(var f9=0;
f9<f5.length;
f9++){T(f4,f5[f9],"text")
}})
}}function cy(ga,f4,f7){var f5,f8,f9=ga.doc;
var f6=f7?-1:f4-(ga.doc.mode.innerMode?1000:100);
for(var gd=f4;
gd>f6;
--gd){if(gd<=f9.first){return f9.first
}var gc=e6(f9,gd-1);
if(gc.stateAfter&&(!f7||gd<=f9.frontier)){return gd
}var gb=bS(gc.text,null,ga.options.tabSize);
if(f8==null||f5>gb){f8=gd-1;
f5=gb
}}return f8
}function dt(f4,ga,f5){var f8=f4.doc,f7=f4.display;
if(!f8.mode.startState){return true
}var f9=cy(f4,ga,f5),f6=f9>f8.first&&e6(f8,f9-1).stateAfter;
if(!f6){f6=bZ(f8.mode)
}else{f6=b2(f8.mode,f6)
}f8.iter(f9,ga,function(gb){dp(f4,gb.text,f6);
var gc=f9==ga-1||f9%5==0||f9>=f7.viewFrom&&f9<f7.viewTo;
gb.stateAfter=gc?b2(f8.mode,f6):null;
++f9
});
if(f5){f8.frontier=f9
}return f6
}function eZ(f4){return f4.lineSpace.offsetTop
}function bH(f4){return f4.mover.offsetHeight-f4.lineSpace.offsetHeight
}function eW(f7){if(f7.cachedPaddingH){return f7.cachedPaddingH
}var f6=bQ(f7.measure,fO("pre","x"));
var f4=window.getComputedStyle?window.getComputedStyle(f6):f6.currentStyle;
var f5={left:parseInt(f4.paddingLeft),right:parseInt(f4.paddingRight)};
if(!isNaN(f5.left)&&!isNaN(f5.right)){f7.cachedPaddingH=f5
}return f5
}function ch(gb,f7,ga){var f6=gb.options.lineWrapping;
var f8=f6&&gb.display.scroller.clientWidth;
if(!f7.measure.heights||f6&&f7.measure.width!=f8){var f9=f7.measure.heights=[];
if(f6){f7.measure.width=f8;
var gd=f7.text.firstChild.getClientRects();
for(var f4=0;
f4<gd.length-1;
f4++){var gc=gd[f4],f5=gd[f4+1];
if(Math.abs(gc.bottom-f5.bottom)>2){f9.push((gc.bottom+f5.top)/2-ga.top)
}}}f9.push(ga.bottom-ga.top)
}}function ct(f6,f4,f7){if(f6.line==f4){return{map:f6.measure.map,cache:f6.measure.cache}
}for(var f5=0;
f5<f6.rest.length;
f5++){if(f6.rest[f5]==f4){return{map:f6.measure.maps[f5],cache:f6.measure.caches[f5]}
}}for(var f5=0;
f5<f6.rest.length;
f5++){if(bM(f6.rest[f5])>f7){return{map:f6.measure.maps[f5],cache:f6.measure.caches[f5],before:true}
}}}function cX(f4,f6){f6=A(f6);
var f8=bM(f6);
var f5=f4.display.externalMeasured=new bu(f4.doc,f6,f8);
f5.lineN=f8;
var f7=f5.built=eJ(f4,f5);
f5.text=f7.pre;
bQ(f4.display.lineMeasure,f7.pre);
return f5
}function d8(f4,f5,f7,f6){return F(f4,a0(f4,f5),f7,f6)
}function e2(f4,f6){if(f6>=f4.display.viewFrom&&f6<f4.display.viewTo){return f4.display.view[dj(f4,f6)]
}var f5=f4.display.externalMeasured;
if(f5&&f6>=f5.lineN&&f6<f5.lineN+f5.size){return f5
}}function a0(f4,f6){var f7=bM(f6);
var f5=e2(f4,f7);
if(f5&&!f5.text){f5=null
}else{if(f5&&f5.changes){ab(f4,f5,f7,e4(f4))
}}if(!f5){f5=cX(f4,f6)
}var f8=ct(f5,f6,f7);
return{line:f6,view:f5,rect:null,map:f8.map,cache:f8.cache,before:f8.before,hasHeights:false}
}function F(f4,ga,f8,f5,f7){if(ga.before){f8=-1
}var f6=f8+(f5||""),f9;
if(ga.cache.hasOwnProperty(f6)){f9=ga.cache[f6]
}else{if(!ga.rect){ga.rect=ga.view.text.getBoundingClientRect()
}if(!ga.hasHeights){ch(f4,ga.view,ga.rect);
ga.hasHeights=true
}f9=k(f4,ga,f8,f5);
if(!f9.bogus){ga.cache[f6]=f9
}}return{left:f9.left,right:f9.right,top:f7?f9.rtop:f9.top,bottom:f7?f9.rbottom:f9.bottom}
}var es={left:0,right:0,top:0,bottom:0};
function k(gb,gl,gd,f9){var gp=gl.map;
var gi,f8,f7,f4;
for(var gk=0;
gk<gp.length;
gk+=3){var gn=gp[gk],gj=gp[gk+1];
if(gd<gn){f8=0;
f7=1;
f4="left"
}else{if(gd<gj){f8=gd-gn;
f7=f8+1
}else{if(gk==gp.length-3||gd==gj&&gp[gk+3]>gd){f7=gj-gn;
f8=f7-1;
if(gd>=gj){f4="right"
}}}}if(f8!=null){gi=gp[gk+2];
if(gn==gj&&f9==(gi.insertLeft?"left":"right")){f4=f9
}if(f9=="left"&&f8==0){while(gk&&gp[gk-2]==gp[gk-3]&&gp[gk-1].insertLeft){gi=gp[(gk-=3)+2];
f4="left"
}}if(f9=="right"&&f8==gj-gn){while(gk<gp.length-3&&gp[gk+3]==gp[gk+4]&&!gp[gk+5].insertLeft){gi=gp[(gk+=3)+2];
f4="right"
}}break
}}var f5;
if(gi.nodeType==3){for(var gk=0;
gk<4;
gk++){while(f8&&fh(gl.line.text.charAt(gn+f8))){--f8
}while(gn+f7<gj&&fh(gl.line.text.charAt(gn+f7))){++f7
}if(dB&&m<9&&f8==0&&f7==gj-gn){f5=gi.parentNode.getBoundingClientRect()
}else{if(dB&&gb.options.lineWrapping){var f6=cl(gi,f8,f7).getClientRects();
if(f6.length){f5=f6[f9=="right"?f6.length-1:0]
}else{f5=es
}}else{f5=cl(gi,f8,f7).getBoundingClientRect()||es
}}if(f5.left||f5.right||f8==0){break
}f7=f8;
f8=f8-1;
f4="right"
}if(dB&&m<11){f5=eF(gb.display.measure,f5)
}}else{if(f8>0){f4=f9="right"
}var f6;
if(gb.options.lineWrapping&&(f6=gi.getClientRects()).length>1){f5=f6[f9=="right"?f6.length-1:0]
}else{f5=gi.getBoundingClientRect()
}}if(dB&&m<9&&!f8&&(!f5||!f5.left&&!f5.right)){var ga=gi.parentNode.getClientRects()[0];
if(ga){f5={left:ga.left,right:ga.left+dv(gb.display),top:ga.top,bottom:ga.bottom}
}else{f5=es
}}var gg=f5.top-gl.rect.top,ge=f5.bottom-gl.rect.top;
var go=(gg+ge)/2;
var gm=gl.view.measure.heights;
for(var gk=0;
gk<gm.length-1;
gk++){if(go<gm[gk]){break
}}var gh=gk?gm[gk-1]:0,gf=gm[gk];
var gc={left:(f4=="right"?f5.right:f5.left)-gl.rect.left,right:(f4=="left"?f5.left:f5.right)-gl.rect.left,top:gh,bottom:gf};
if(!f5.left&&!f5.right){gc.bogus=true
}if(!gb.options.singleCursorHeightPerLine){gc.rtop=gg;
gc.rbottom=ge
}return gc
}function eF(f6,f7){if(!window.screen||screen.logicalXDPI==null||screen.logicalXDPI==screen.deviceXDPI||!aI(f6)){return f7
}var f5=screen.logicalXDPI/screen.deviceXDPI;
var f4=screen.logicalYDPI/screen.deviceYDPI;
return{left:f7.left*f5,right:f7.right*f5,top:f7.top*f4,bottom:f7.bottom*f4}
}function au(f5){if(f5.measure){f5.measure.cache={};
f5.measure.heights=null;
if(f5.rest){for(var f4=0;
f4<f5.rest.length;
f4++){f5.measure.caches[f4]={}
}}}}function aL(f4){f4.display.externalMeasure=null;
dS(f4.display.lineMeasure);
for(var f5=0;
f5<f4.display.view.length;
f5++){au(f4.display.view[f5])
}}function ak(f4){aL(f4);
f4.display.cachedCharWidth=f4.display.cachedTextHeight=f4.display.cachedPaddingH=null;
if(!f4.options.lineWrapping){f4.display.maxLineChanged=true
}f4.display.lineNumChars=null
}function cu(){return window.pageXOffset||(document.documentElement||document.body).scrollLeft
}function cs(){return window.pageYOffset||(document.documentElement||document.body).scrollTop
}function eI(ga,f7,f9,f5){if(f7.widgets){for(var f6=0;
f6<f7.widgets.length;
++f6){if(f7.widgets[f6].above){var gc=cU(f7.widgets[f6]);
f9.top+=gc;
f9.bottom+=gc
}}}if(f5=="line"){return f9
}if(!f5){f5="local"
}var f8=bL(f7);
if(f5=="local"){f8+=eZ(ga.display)
}else{f8-=ga.display.viewOffset
}if(f5=="page"||f5=="window"){var f4=ga.display.lineSpace.getBoundingClientRect();
f8+=f4.top+(f5=="window"?0:cs());
var gb=f4.left+(f5=="window"?0:cu());
f9.left+=gb;
f9.right+=gb
}f9.top+=f8;
f9.bottom+=f8;
return f9
}function f1(f5,f8,f6){if(f6=="div"){return f8
}var ga=f8.left,f9=f8.top;
if(f6=="page"){ga-=cu();
f9-=cs()
}else{if(f6=="local"||!f6){var f7=f5.display.sizer.getBoundingClientRect();
ga+=f7.left;
f9+=f7.top
}}var f4=f5.display.lineSpace.getBoundingClientRect();
return{left:ga-f4.left,top:f9-f4.top}
}function cH(f4,f8,f7,f6,f5){if(!f6){f6=e6(f4.doc,f8.line)
}return eI(f4,f6,d8(f4,f6,f8.ch,f5),f7)
}function dL(gd,gc,f6,ga,gf,gb){ga=ga||e6(gd.doc,gc.line);
if(!gf){gf=a0(gd,ga)
}function f8(gi,gh){var gg=F(gd,gf,gi,gh?"right":"left",gb);
if(gh){gg.left=gg.right
}else{gg.right=gg.left
}return eI(gd,ga,gg,f6)
}function ge(gj,gg){var gh=f9[gg],gi=gh.level%2;
if(gj==dq(gh)&&gg&&gh.level<f9[gg-1].level){gh=f9[--gg];
gj=f0(gh)-(gh.level%2?0:1);
gi=true
}else{if(gj==f0(gh)&&gg<f9.length-1&&gh.level<f9[gg+1].level){gh=f9[++gg];
gj=dq(gh)-gh.level%2;
gi=false
}}if(gi&&gj==gh.to&&gj>gh.from){return f8(gj-1)
}return f8(gj,gi)
}var f9=a(ga),f4=gc.ch;
if(!f9){return f8(f4)
}var f5=aE(f9,f4);
var f7=ge(f4,f5);
if(eU!=null){f7.other=ge(f4,eU)
}return f7
}function dz(f4,f8){var f7=0,f8=fB(f4.doc,f8);
if(!f4.options.lineWrapping){f7=dv(f4.display)*f8.ch
}var f5=e6(f4.doc,f8.line);
var f6=bL(f5)+eZ(f4.display);
return{left:f7,right:f7,top:f6,bottom:f6+f5.height}
}function fN(f4,f5,f6,f8){var f7=Y(f4,f5);
f7.xRel=f8;
if(f6){f7.outside=true
}return f7
}function fG(gb,f8,f7){var ga=gb.doc;
f7+=gb.display.viewOffset;
if(f7<0){return fN(ga.first,0,true,-1)
}var f6=bF(ga,f7),gc=ga.first+ga.size-1;
if(f6>gc){return fN(ga.first+ga.size-1,e6(ga,gc).text.length,true,1)
}if(f8<0){f8=0
}var f5=e6(ga,f6);
for(;
;
){var gd=cV(gb,f5,f6,f8,f7);
var f9=em(f5);
var f4=f9&&f9.find(0,true);
if(f9&&(gd.ch>f4.from.ch||gd.ch==f4.from.ch&&gd.xRel>0)){f6=bM(f5=f4.to.line)
}else{return gd
}}}function cV(ge,f6,gh,gg,gf){var gd=gf-bL(f6);
var ga=false,gn=2*ge.display.wrapper.clientWidth;
var gk=a0(ge,f6);
function gr(gt){var gu=dL(ge,Y(gh,gt),"line",f6,gk);
ga=true;
if(gd>gu.bottom){return gu.left-gn
}else{if(gd<gu.top){return gu.left+gn
}else{ga=false
}}return gu.left
}var gj=a(f6),gm=f6.text.length;
var go=cD(f6),f7=cQ(f6);
var gl=gr(go),f4=ga,f5=gr(f7),f9=ga;
if(gg>f5){return fN(gh,f7,f9,1)
}for(;
;
){if(gj?f7==go||f7==w(f6,go,1):f7-go<=1){var gi=gg<gl||gg-gl<=f5-gg?go:f7;
var gq=gg-(gi==go?gl:f5);
while(fh(f6.text.charAt(gi))){++gi
}var gc=fN(gh,gi,gi==go?f4:f9,gq<-1?-1:gq>1?1:0);
return gc
}var gb=Math.ceil(gm/2),gs=go+gb;
if(gj){gs=go;
for(var gp=0;
gp<gb;
++gp){gs=w(f6,gs,1)
}}var f8=gr(gs);
if(f8>gg){f7=gs;
f5=f8;
if(f9=ga){f5+=1000
}gm=gb
}else{go=gs;
gl=f8;
f4=ga;
gm-=gb
}}}var aF;
function aT(f6){if(f6.cachedTextHeight!=null){return f6.cachedTextHeight
}if(aF==null){aF=fO("pre");
for(var f5=0;
f5<49;
++f5){aF.appendChild(document.createTextNode("x"));
aF.appendChild(fO("br"))
}aF.appendChild(document.createTextNode("x"))
}bQ(f6.measure,aF);
var f4=aF.offsetHeight/50;
if(f4>3){f6.cachedTextHeight=f4
}dS(f6.measure);
return f4||1
}function dv(f8){if(f8.cachedCharWidth!=null){return f8.cachedCharWidth
}var f4=fO("span","xxxxxxxxxx");
var f7=fO("pre",[f4]);
bQ(f8.measure,f7);
var f6=f4.getBoundingClientRect(),f5=(f6.right-f6.left)/10;
if(f5>2){f8.cachedCharWidth=f5
}return f5||10
}var bo=null;
var dZ=0;
function cG(f4){f4.curOp={cm:f4,viewChanged:false,startHeight:f4.doc.height,forceUpdate:false,updateInput:null,typing:false,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:false,updateMaxLine:false,scrollLeft:null,scrollTop:null,scrollToPos:null,id:++dZ};
if(bo){bo.ops.push(f4.curOp)
}else{f4.curOp.ownsGroup=bo={ops:[f4.curOp],delayedCallbacks:[]}
}}function cR(f7){var f6=f7.delayedCallbacks,f5=0;
do{for(;
f5<f6.length;
f5++){f6[f5]()
}for(var f4=0;
f4<f7.ops.length;
f4++){var f8=f7.ops[f4];
if(f8.cursorActivityHandlers){while(f8.cursorActivityCalled<f8.cursorActivityHandlers.length){f8.cursorActivityHandlers[f8.cursorActivityCalled++](f8.cm)
}}}}while(f5<f6.length)
}function am(f4){var f7=f4.curOp,f6=f7.ownsGroup;
if(!f6){return
}try{cR(f6)
}finally{bo=null;
for(var f5=0;
f5<f6.ops.length;
f5++){f6.ops[f5].cm.curOp=null
}cI(f6)
}}function cI(f6){var f5=f6.ops;
for(var f4=0;
f4<f5.length;
f4++){b4(f5[f4])
}for(var f4=0;
f4<f5.length;
f4++){aq(f5[f4])
}for(var f4=0;
f4<f5.length;
f4++){b1(f5[f4])
}for(var f4=0;
f4<f5.length;
f4++){ap(f5[f4])
}for(var f4=0;
f4<f5.length;
f4++){eS(f5[f4])
}}function b4(f6){var f4=f6.cm,f5=f4.display;
if(f6.updateMaxLine){g(f4)
}f6.mustUpdate=f6.viewChanged||f6.forceUpdate||f6.scrollTop!=null||f6.scrollToPos&&(f6.scrollToPos.from.line<f5.viewFrom||f6.scrollToPos.to.line>=f5.viewTo)||f5.maxLineChanged&&f4.options.lineWrapping;
f6.update=f6.mustUpdate&&new aG(f4,f6.mustUpdate&&{top:f6.scrollTop,ensure:f6.scrollToPos},f6.forceUpdate)
}function aq(f4){f4.updatedDisplay=f4.mustUpdate&&E(f4.cm,f4.update)
}function b1(f6){var f4=f6.cm,f5=f4.display;
if(f6.updatedDisplay){a5(f4)
}f6.barMeasure=ds(f4);
if(f5.maxLineChanged&&!f4.options.lineWrapping){f6.adjustWidthTo=d8(f4,f5.maxLine,f5.maxLine.text.length).left+3;
f6.maxScrollLeft=Math.max(0,f5.sizer.offsetLeft+f6.adjustWidthTo+bh-f5.scroller.clientWidth)
}if(f6.updatedDisplay||f6.selectionChanged){f6.newSelectionNodes=bk(f4)
}}function ap(f5){var f4=f5.cm;
if(f5.adjustWidthTo!=null){f4.display.sizer.style.minWidth=f5.adjustWidthTo+"px";
if(f5.maxScrollLeft<f4.doc.scrollLeft){bD(f4,Math.min(f4.display.scroller.scrollLeft,f5.maxScrollLeft),true)
}f4.display.maxLineChanged=false
}if(f5.newSelectionNodes){al(f4,f5.newSelectionNodes)
}if(f5.updatedDisplay){dr(f4,f5.barMeasure)
}if(f5.updatedDisplay||f5.startHeight!=f4.doc.height){eQ(f4,f5.barMeasure)
}if(f5.selectionChanged){q(f4)
}if(f4.state.focused&&f5.updateInput){fg(f4,f5.typing)
}}function eS(f7){var gd=f7.cm,f9=gd.display,gc=gd.doc;
if(f7.adjustWidthTo!=null&&Math.abs(f7.barMeasure.scrollWidth-gd.display.scroller.scrollWidth)>1){eQ(gd)
}if(f7.updatedDisplay){cj(gd,f7.update)
}if(f9.wheelStartX!=null&&(f7.scrollTop!=null||f7.scrollLeft!=null||f7.scrollToPos)){f9.wheelStartX=f9.wheelStartY=null
}if(f7.scrollTop!=null&&(f9.scroller.scrollTop!=f7.scrollTop||f7.forceScroll)){var ga=Math.max(0,Math.min(f9.scroller.scrollHeight-f9.scroller.clientHeight,f7.scrollTop));
f9.scroller.scrollTop=f9.scrollbarV.scrollTop=gc.scrollTop=ga
}if(f7.scrollLeft!=null&&(f9.scroller.scrollLeft!=f7.scrollLeft||f7.forceScroll)){var f5=Math.max(0,Math.min(f9.scroller.scrollWidth-f9.scroller.clientWidth,f7.scrollLeft));
f9.scroller.scrollLeft=f9.scrollbarH.scrollLeft=gc.scrollLeft=f5;
ew(gd)
}if(f7.scrollToPos){var gb=G(gd,fB(gc,f7.scrollToPos.from),fB(gc,f7.scrollToPos.to),f7.scrollToPos.margin);
if(f7.scrollToPos.isCursor&&gd.state.focused){dX(gd,gb)
}}var f8=f7.maybeHiddenMarkers,f4=f7.maybeUnhiddenMarkers;
if(f8){for(var f6=0;
f6<f8.length;
++f6){if(!f8[f6].lines.length){aC(f8[f6],"hide")
}}}if(f4){for(var f6=0;
f6<f4.length;
++f6){if(f4[f6].lines.length){aC(f4[f6],"unhide")
}}}if(f9.wrapper.offsetHeight){gc.scrollTop=gd.display.scroller.scrollTop
}if(f7.updatedDisplay&&cW){if(gd.options.lineWrapping){fR(gd,f7.barMeasure)
}if(f7.barMeasure.scrollWidth>f7.barMeasure.clientWidth&&f7.barMeasure.scrollWidth<f7.barMeasure.clientWidth+1&&!cO(gd)){eQ(gd)
}}if(f7.changeObjs){aC(gd,"changes",gd,f7.changeObjs)
}}function cK(f4,f5){if(f4.curOp){return f5()
}cG(f4);
try{return f5()
}finally{am(f4)
}}function cY(f4,f5){return function(){if(f4.curOp){return f5.apply(f4,arguments)
}cG(f4);
try{return f5.apply(f4,arguments)
}finally{am(f4)
}}
}function c4(f4){return function(){if(this.curOp){return f4.apply(this,arguments)
}cG(this);
try{return f4.apply(this,arguments)
}finally{am(this)
}}
}function cC(f4){return function(){var f5=this.cm;
if(!f5||f5.curOp){return f4.apply(this,arguments)
}cG(f5);
try{return f4.apply(this,arguments)
}finally{am(f5)
}}
}function bu(f6,f4,f5){this.line=f4;
this.rest=h(f4);
this.size=this.rest?bM(fz(this.rest))-f5+1:1;
this.node=this.text=null;
this.hidden=fo(f6,f4)
}function eN(f4,ga,f9){var f8=[],f6;
for(var f7=ga;
f7<f9;
f7=f6){var f5=new bu(f4.doc,e6(f4.doc,f7),f7);
f6=f7+f5.size;
f8.push(f5)
}return f8
}function ah(gb,f9,ga,gc){if(f9==null){f9=gb.doc.first
}if(ga==null){ga=gb.doc.first+gb.doc.size
}if(!gc){gc=0
}var f6=gb.display;
if(gc&&ga<f6.viewTo&&(f6.updateLineNumbers==null||f6.updateLineNumbers>f9)){f6.updateLineNumbers=f9
}gb.curOp.viewChanged=true;
if(f9>=f6.viewTo){if(a3&&aS(gb.doc,f9)<f6.viewTo){eo(gb)
}}else{if(ga<=f6.viewFrom){if(a3&&dU(gb.doc,ga+gc)>f6.viewFrom){eo(gb)
}else{f6.viewFrom+=gc;
f6.viewTo+=gc
}}else{if(f9<=f6.viewFrom&&ga>=f6.viewTo){eo(gb)
}else{if(f9<=f6.viewFrom){var f8=da(gb,ga,ga+gc,1);
if(f8){f6.view=f6.view.slice(f8.index);
f6.viewFrom=f8.lineN;
f6.viewTo+=gc
}else{eo(gb)
}}else{if(ga>=f6.viewTo){var f8=da(gb,f9,f9,-1);
if(f8){f6.view=f6.view.slice(0,f8.index);
f6.viewTo=f8.lineN
}else{eo(gb)
}}else{var f7=da(gb,f9,f9,-1);
var f5=da(gb,ga,ga+gc,1);
if(f7&&f5){f6.view=f6.view.slice(0,f7.index).concat(eN(gb,f7.lineN,f5.lineN)).concat(f6.view.slice(f5.index));
f6.viewTo+=gc
}else{eo(gb)
}}}}}}var f4=f6.externalMeasured;
if(f4){if(ga<f4.lineN){f4.lineN+=gc
}else{if(f9<f4.lineN+f4.size){f6.externalMeasured=null
}}}}function T(f5,f6,f9){f5.curOp.viewChanged=true;
var ga=f5.display,f8=f5.display.externalMeasured;
if(f8&&f6>=f8.lineN&&f6<f8.lineN+f8.size){ga.externalMeasured=null
}if(f6<ga.viewFrom||f6>=ga.viewTo){return
}var f7=ga.view[dj(f5,f6)];
if(f7.node==null){return
}var f4=f7.changes||(f7.changes=[]);
if(dd(f4,f9)==-1){f4.push(f9)
}}function eo(f4){f4.display.viewFrom=f4.display.viewTo=f4.doc.first;
f4.display.view=[];
f4.display.viewOffset=0
}function dj(f4,f7){if(f7>=f4.display.viewTo){return null
}f7-=f4.display.viewFrom;
if(f7<0){return null
}var f5=f4.display.view;
for(var f6=0;
f6<f5.length;
f6++){f7-=f5[f6].size;
if(f7<0){return f6
}}}function da(gc,f6,f8,f5){var f9=dj(gc,f6),gb,ga=gc.display.view;
if(!a3||f8==gc.doc.first+gc.doc.size){return{index:f9,lineN:f8}
}for(var f7=0,f4=gc.display.viewFrom;
f7<f9;
f7++){f4+=ga[f7].size
}if(f4!=f6){if(f5>0){if(f9==ga.length-1){return null
}gb=(f4+ga[f9].size)-f6;
f9++
}else{gb=f4-f6
}f6+=gb;
f8+=gb
}while(aS(gc.doc,f8)!=f8){if(f9==(f5<0?0:ga.length-1)){return null
}f8+=f5*ga[f9-(f5<0?1:0)].size;
f9+=f5
}return{index:f9,lineN:f8}
}function cP(f4,f8,f7){var f6=f4.display,f5=f6.view;
if(f5.length==0||f8>=f6.viewTo||f7<=f6.viewFrom){f6.view=eN(f4,f8,f7);
f6.viewFrom=f8
}else{if(f6.viewFrom>f8){f6.view=eN(f4,f8,f6.viewFrom).concat(f6.view)
}else{if(f6.viewFrom<f8){f6.view=f6.view.slice(dj(f4,f8))
}}f6.viewFrom=f8;
if(f6.viewTo<f7){f6.view=f6.view.concat(eN(f4,f6.viewTo,f7))
}else{if(f6.viewTo>f7){f6.view=f6.view.slice(0,dj(f4,f7))
}}}f6.viewTo=f7
}function c7(f4){var f5=f4.display.view,f8=0;
for(var f7=0;
f7<f5.length;
f7++){var f6=f5[f7];
if(!f6.hidden&&(!f6.node||f6.changes)){++f8
}}return f8
}function bl(f4){if(f4.display.pollingFast){return
}f4.display.poll.set(f4.options.pollInterval,function(){cg(f4);
if(f4.state.focused){bl(f4)
}})
}function D(f4){var f5=false;
f4.display.pollingFast=true;
function f6(){var f7=cg(f4);
if(!f7&&!f5){f5=true;
f4.display.poll.set(60,f6)
}else{f4.display.pollingFast=false;
bl(f4)
}}f4.display.poll.set(20,f6)
}var bj=null;
function cg(f8){var f9=f8.display.input,gc=f8.display.prevInput,gn=f8.doc;
if(!f8.state.focused||(br(f9)&&!gc)||aj(f8)||f8.options.disableInput||f8.state.keySeq){return false
}if(f8.state.pasteIncoming&&f8.state.fakedLastChar){f9.value=f9.value.substring(0,f9.value.length-1);
f8.state.fakedLastChar=false
}var gb=f9.value;
if(gb==gc&&!f8.somethingSelected()){return false
}if(dB&&m>=9&&f8.display.inputHasSelection===gb||b6&&/[\uf700-\uf7ff]/.test(gb)){fg(f8);
return false
}var gj=!f8.curOp;
if(gj){cG(f8)
}f8.display.shift=false;
if(gb.charCodeAt(0)==8203&&gn.sel==f8.display.selForContextMenu&&!gc){gc="\u200b"
}var gi=0,gf=Math.min(gc.length,gb.length);
while(gi<gf&&gc.charCodeAt(gi)==gb.charCodeAt(gi)){++gi
}var f5=gb.slice(gi),gd=aW(f5);
var gm=null;
if(f8.state.pasteIncoming&&gn.sel.ranges.length>1){if(bj&&bj.join("\n")==f5){gm=gn.sel.ranges.length%bj.length==0&&bR(bj,aW)
}else{if(gd.length==gn.sel.ranges.length){gm=bR(gd,function(go){return[go]
})
}}}for(var gk=gn.sel.ranges.length-1;
gk>=0;
gk--){var ge=gn.sel.ranges[gk];
var gg=ge.from(),f4=ge.to();
if(gi<gc.length){gg=Y(gg.line,gg.ch-(gc.length-gi))
}else{if(f8.state.overwrite&&ge.empty()&&!f8.state.pasteIncoming){f4=Y(f4.line,Math.min(e6(gn,f4.line).text.length,f4.ch+fz(gd).length))
}}var f7=f8.curOp.updateInput;
var gl={from:gg,to:f4,text:gm?gm[gk%gm.length]:gd,origin:f8.state.pasteIncoming?"paste":f8.state.cutIncoming?"cut":"+input"};
bc(f8.doc,gl);
ae(f8,"inputRead",f8,gl);
if(f5&&!f8.state.pasteIncoming&&f8.options.electricChars&&f8.options.smartIndent&&ge.head.ch<100&&(!gk||gn.sel.ranges[gk-1].head.line!=ge.head.line)){var ga=f8.getModeAt(ge.head);
var f6=cT(gl);
if(ga.electricChars){for(var gh=0;
gh<ga.electricChars.length;
gh++){if(f5.indexOf(ga.electricChars.charAt(gh))>-1){ad(f8,f6.line,"smart");
break
}}}else{if(ga.electricInput){if(ga.electricInput.test(e6(gn,f6.line).text.slice(0,f6.ch))){ad(f8,f6.line,"smart")
}}}}}fy(f8);
f8.curOp.updateInput=f7;
f8.curOp.typing=true;
if(gb.length>1000||gb.indexOf("\n")>-1){f9.value=f8.display.prevInput=""
}else{f8.display.prevInput=gb
}if(gj){am(f8)
}f8.state.pasteIncoming=f8.state.cutIncoming=false;
return true
}function fg(f4,f8){var f5,f7,ga=f4.doc;
if(f4.somethingSelected()){f4.display.prevInput="";
var f6=ga.sel.primary();
f5=c6&&(f6.to().line-f6.from().line>100||(f7=f4.getSelection()).length>1000);
var f9=f5?"-":f7||f4.getSelection();
f4.display.input.value=f9;
if(f4.state.focused){dC(f4.display.input)
}if(dB&&m>=9){f4.display.inputHasSelection=f9
}}else{if(!f8){f4.display.prevInput=f4.display.input.value="";
if(dB&&m>=9){f4.display.inputHasSelection=null
}}}f4.display.inaccurateSelection=f5
}function er(f4){if(f4.options.readOnly!="nocursor"&&(!d7||dF()!=f4.display.input)){f4.display.input.focus()
}}function t(f4){if(!f4.state.focused){er(f4);
cA(f4)
}}function aj(f4){return f4.options.readOnly||f4.doc.cantEdit
}function fH(f4){var f6=f4.display;
bW(f6.scroller,"mousedown",cY(f4,ek));
if(dB&&m<11){bW(f6.scroller,"dblclick",cY(f4,function(ga){if(aO(f4,ga)){return
}var gb=cn(f4,ga);
if(!gb||n(f4,ga)||a6(f4.display,ga)){return
}cE(ga);
var f9=f4.findWordAt(gb);
fL(f4.doc,f9.anchor,f9.head)
}))
}else{bW(f6.scroller,"dblclick",function(f9){aO(f4,f9)||cE(f9)
})
}bW(f6.lineSpace,"selectstart",function(f9){if(!a6(f6,f9)){cE(f9)
}});
if(!fW){bW(f6.scroller,"contextmenu",function(f9){ay(f4,f9)
})
}bW(f6.scroller,"scroll",function(){if(f6.scroller.clientHeight){P(f4,f6.scroller.scrollTop);
bD(f4,f6.scroller.scrollLeft,true);
aC(f4,"scroll",f4)
}});
bW(f6.scrollbarV,"scroll",function(){if(f6.scroller.clientHeight){P(f4,f6.scrollbarV.scrollTop)
}});
bW(f6.scrollbarH,"scroll",function(){if(f6.scroller.clientHeight){bD(f4,f6.scrollbarH.scrollLeft)
}});
bW(f6.scroller,"mousewheel",function(f9){b(f4,f9)
});
bW(f6.scroller,"DOMMouseScroll",function(f9){b(f4,f9)
});
function f8(){if(f4.state.focused){setTimeout(cv(er,f4),0)
}}bW(f6.scrollbarH,"mousedown",f8);
bW(f6.scrollbarV,"mousedown",f8);
bW(f6.wrapper,"scroll",function(){f6.wrapper.scrollTop=f6.wrapper.scrollLeft=0
});
bW(f6.input,"keyup",function(f9){be.call(f4,f9)
});
bW(f6.input,"input",function(){if(dB&&m>=9&&f4.display.inputHasSelection){f4.display.inputHasSelection=null
}D(f4)
});
bW(f6.input,"keydown",cY(f4,r));
bW(f6.input,"keypress",cY(f4,cx));
bW(f6.input,"focus",cv(cA,f4));
bW(f6.input,"blur",cv(aR,f4));
function f5(f9){if(!aO(f4,f9)){ei(f9)
}}if(f4.options.dragDrop){bW(f6.scroller,"dragstart",function(f9){S(f4,f9)
});
bW(f6.scroller,"dragenter",f5);
bW(f6.scroller,"dragover",f5);
bW(f6.scroller,"drop",cY(f4,bg))
}bW(f6.scroller,"paste",function(f9){if(a6(f6,f9)){return
}f4.state.pasteIncoming=true;
er(f4);
D(f4)
});
bW(f6.input,"paste",function(){if(cW&&!f4.state.fakedLastChar&&!(new Date-f4.state.lastMiddleDown<200)){var ga=f6.input.selectionStart,f9=f6.input.selectionEnd;
f6.input.value+="$";
f6.input.selectionEnd=f9;
f6.input.selectionStart=ga;
f4.state.fakedLastChar=true
}f4.state.pasteIncoming=true;
D(f4)
});
function f7(gd){if(f4.somethingSelected()){bj=f4.getSelections();
if(f6.inaccurateSelection){f6.prevInput="";
f6.inaccurateSelection=false;
f6.input.value=bj.join("\n");
dC(f6.input)
}}else{var ge=[],ga=[];
for(var gb=0;
gb<f4.doc.sel.ranges.length;
gb++){var f9=f4.doc.sel.ranges[gb].head.line;
var gc={anchor:Y(f9,0),head:Y(f9+1,0)};
ga.push(gc);
ge.push(f4.getRange(gc.anchor,gc.head))
}if(gd.type=="cut"){f4.setSelections(ga,null,aa)
}else{f6.prevInput="";
f6.input.value=ge.join("\n");
dC(f6.input)
}bj=ge
}if(gd.type=="cut"){f4.state.cutIncoming=true
}}bW(f6.input,"cut",f7);
bW(f6.input,"copy",f7);
if(a7){bW(f6.sizer,"mouseup",function(){if(dF()==f6.input){f6.input.blur()
}er(f4)
})
}}function aQ(f4){var f5=f4.display;
if(f5.lastWrapHeight==f5.wrapper.clientHeight&&f5.lastWrapWidth==f5.wrapper.clientWidth){return
}f5.cachedCharWidth=f5.cachedTextHeight=f5.cachedPaddingH=null;
f4.setSize()
}function a6(f5,f4){for(var f6=N(f4);
f6!=f5.wrapper;
f6=f6.parentNode){if(!f6||f6.ignoreEvents||f6.parentNode==f5.sizer&&f6!=f5.mover){return true
}}}function cn(ge,f8,f5,f6){var ga=ge.display;
if(!f5){var f9=N(f8);
if(f9==ga.scrollbarH||f9==ga.scrollbarV||f9==ga.scrollbarFiller||f9==ga.gutterFiller){return null
}}var gd,gb,f4=ga.lineSpace.getBoundingClientRect();
try{gd=f8.clientX-f4.left;
gb=f8.clientY-f4.top
}catch(f8){return null
}var gc=fG(ge,gd,gb),gf;
if(f6&&gc.xRel==1&&(gf=e6(ge.doc,gc.line).text).length==gc.ch){var f7=bS(gf,gf.length,ge.options.tabSize)-gf.length;
gc=Y(gc.line,Math.max(0,Math.round((gd-eW(ge.display).left)/dv(ge.display))-f7))
}return gc
}function ek(f6){if(aO(this,f6)){return
}var f4=this,f5=f4.display;
f5.shift=f6.shiftKey;
if(a6(f5,f6)){if(!cW){f5.scroller.draggable=false;
setTimeout(function(){f5.scroller.draggable=true
},100)
}return
}if(n(f4,f6)){return
}var f7=cn(f4,f6);
window.focus();
switch(fF(f6)){case 1:if(f7){ax(f4,f6,f7)
}else{if(N(f6)==f5.scroller){cE(f6)
}}break;
case 2:if(cW){f4.state.lastMiddleDown=+new Date
}if(f7){fL(f4.doc,f7)
}setTimeout(cv(er,f4),20);
cE(f6);
break;
case 3:if(fW){ay(f4,f6)
}break
}}var dg,c9;
function ax(f5,f9,ga){setTimeout(cv(t,f5),0);
var f6=+new Date,f7;
if(c9&&c9.time>f6-400&&ce(c9.pos,ga)==0){f7="triple"
}else{if(dg&&dg.time>f6-400&&ce(dg.pos,ga)==0){f7="double";
c9={time:f6,pos:ga}
}else{f7="single";
dg={time:f6,pos:ga}
}}var f8=f5.doc.sel,f4=b6?f9.metaKey:f9.ctrlKey;
if(f5.options.dragDrop&&eD&&!aj(f5)&&f7=="single"&&f8.contains(ga)>-1&&f8.somethingSelected()){aZ(f5,f9,ga,f4)
}else{o(f5,f9,ga,f7,f4)
}}function aZ(f6,f8,f9,f5){var f7=f6.display;
var f4=cY(f6,function(ga){if(cW){f7.scroller.draggable=false
}f6.state.draggingText=false;
d4(document,"mouseup",f4);
d4(f7.scroller,"drop",f4);
if(Math.abs(f8.clientX-ga.clientX)+Math.abs(f8.clientY-ga.clientY)<10){cE(ga);
if(!f5){fL(f6.doc,f9)
}er(f6);
if(dB&&m==9){setTimeout(function(){document.body.focus();
er(f6)
},20)
}}});
if(cW){f7.scroller.draggable=true
}f6.state.draggingText=f4;
if(f7.scroller.dragDrop){f7.scroller.dragDrop()
}bW(document,"mouseup",f4);
bW(f7.scroller,"drop",f4)
}function o(f7,gl,f6,f4,f9){var gi=f7.display,gn=f7.doc;
cE(gl);
var f5,gm,f8=gn.sel;
if(f9&&!gl.shiftKey){gm=gn.sel.contains(f6);
if(gm>-1){f5=gn.sel.ranges[gm]
}else{f5=new dP(f6,f6)
}}else{f5=gn.sel.primary()
}if(gl.altKey){f4="rect";
if(!f9){f5=new dP(f6,f6)
}f6=cn(f7,gl,true,true);
gm=-1
}else{if(f4=="double"){var gj=f7.findWordAt(f6);
if(f7.display.shift||gn.extend){f5=fn(gn,f5,gj.anchor,gj.head)
}else{f5=gj
}}else{if(f4=="triple"){var gc=new dP(Y(f6.line,0),fB(gn,Y(f6.line+1,0)));
if(f7.display.shift||gn.extend){f5=fn(gn,f5,gc.anchor,gc.head)
}else{f5=gc
}}else{f5=fn(gn,f5,f6)
}}}if(!f9){gm=0;
bT(gn,new fP([f5],0),O);
f8=gn.sel
}else{if(gm>-1){e(gn,gm,f5,O)
}else{gm=gn.sel.ranges.length;
bT(gn,cw(gn.sel.ranges.concat([f5]),gm),{scroll:false,origin:"*mouse"})
}}var gh=f6;
function gg(gy){if(ce(gh,gy)==0){return
}gh=gy;
if(f4=="rect"){var gp=[],gv=f7.options.tabSize;
var go=bS(e6(gn,f6.line).text,f6.ch,gv);
var gB=bS(e6(gn,gy.line).text,gy.ch,gv);
var gq=Math.min(go,gB),gz=Math.max(go,gB);
for(var gC=Math.min(f6.line,gy.line),gs=Math.min(f7.lastLine(),Math.max(f6.line,gy.line));
gC<=gs;
gC++){var gA=e6(gn,gC).text,gr=eh(gA,gq,gv);
if(gq==gz){gp.push(new dP(Y(gC,gr),Y(gC,gr)))
}else{if(gA.length>gr){gp.push(new dP(Y(gC,gr),Y(gC,eh(gA,gz,gv))))
}}}if(!gp.length){gp.push(new dP(f6,f6))
}bT(gn,cw(f8.ranges.slice(0,gm).concat(gp),gm),{origin:"*mouse",scroll:false});
f7.scrollIntoView(gy)
}else{var gw=f5;
var gt=gw.anchor,gx=gy;
if(f4!="single"){if(f4=="double"){var gu=f7.findWordAt(gy)
}else{var gu=new dP(Y(gy.line,0),fB(gn,Y(gy.line+1,0)))
}if(ce(gu.anchor,gt)>0){gx=gu.head;
gt=ar(gw.from(),gu.anchor)
}else{gx=gu.anchor;
gt=bw(gw.to(),gu.head)
}}var gp=f8.ranges.slice(0);
gp[gm]=new dP(fB(gn,gt),gx);
bT(gn,cw(gp,gm),O)
}}var ge=gi.wrapper.getBoundingClientRect();
var ga=0;
function gk(gq){var go=++ga;
var gs=cn(f7,gq,true,f4=="rect");
if(!gs){return
}if(ce(gs,gh)!=0){t(f7);
gg(gs);
var gr=b5(gi,gn);
if(gs.line>=gr.to||gs.line<gr.from){setTimeout(cY(f7,function(){if(ga==go){gk(gq)
}}),150)
}}else{var gp=gq.clientY<ge.top?-20:gq.clientY>ge.bottom?20:0;
if(gp){setTimeout(cY(f7,function(){if(ga!=go){return
}gi.scroller.scrollTop+=gp;
gk(gq)
}),50)
}}}function gd(go){ga=Infinity;
cE(go);
er(f7);
d4(document,"mousemove",gf);
d4(document,"mouseup",gb);
gn.history.lastSelOrigin=null
}var gf=cY(f7,function(go){if(!fF(go)){gd(go)
}else{gk(go)
}});
var gb=cY(f7,gd);
bW(document,"mousemove",gf);
bW(document,"mouseup",gb)
}function f2(gf,gb,gd,ge,f7){try{var f5=gb.clientX,f4=gb.clientY
}catch(gb){return false
}if(f5>=Math.floor(gf.display.gutters.getBoundingClientRect().right)){return false
}if(ge){cE(gb)
}var gc=gf.display;
var ga=gc.lineDiv.getBoundingClientRect();
if(f4>ga.bottom||!e9(gf,gd)){return bK(gb)
}f4-=ga.top-gc.viewOffset;
for(var f8=0;
f8<gf.options.gutters.length;
++f8){var f9=gc.gutters.childNodes[f8];
if(f9&&f9.getBoundingClientRect().right>=f5){var gg=bF(gf.doc,f4);
var f6=gf.options.gutters[f8];
f7(gf,gd,gf,gg,f6,gb);
return bK(gb)
}}}function n(f4,f5){return f2(f4,f5,"gutterClick",true,ae)
}var ag=0;
function bg(ga){var gc=this;
if(aO(gc,ga)||a6(gc.display,ga)){return
}cE(ga);
if(dB){ag=+new Date
}var gb=cn(gc,ga,true),f4=ga.dataTransfer.files;
if(!gb||aj(gc)){return
}if(f4&&f4.length&&window.FileReader&&window.File){var f6=f4.length,gd=Array(f6),f5=0;
var f8=function(gg,gf){var ge=new FileReader;
ge.onload=cY(gc,function(){gd[gf]=ge.result;
if(++f5==f6){gb=fB(gc.doc,gb);
var gh={from:gb,to:gb,text:aW(gd.join("\n")),origin:"paste"};
bc(gc.doc,gh);
eY(gc.doc,eK(gb,cT(gh)))
}});
ge.readAsText(gg)
};
for(var f9=0;
f9<f6;
++f9){f8(f4[f9],f9)
}}else{if(gc.state.draggingText&&gc.doc.sel.contains(gb)>-1){gc.state.draggingText(ga);
setTimeout(cv(er,gc),20);
return
}try{var gd=ga.dataTransfer.getData("Text");
if(gd){if(gc.state.draggingText&&!(b6?ga.metaKey:ga.ctrlKey)){var f7=gc.listSelections()
}eg(gc.doc,eK(gb,gb));
if(f7){for(var f9=0;
f9<f7.length;
++f9){aX(gc.doc,"",f7[f9].anchor,f7[f9].head,"drag")
}}gc.replaceSelection(gd,"around","paste");
er(gc)
}}catch(ga){}}}function S(f4,f6){if(dB&&(!f4.state.draggingText||+new Date-ag<100)){ei(f6);
return
}if(aO(f4,f6)||a6(f4.display,f6)){return
}f6.dataTransfer.setData("Text",f4.getSelection());
if(f6.dataTransfer.setDragImage&&!aB){var f5=fO("img",null,null,"position: fixed; left: 0; top: 0;");
f5.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
if(dT){f5.width=f5.height=1;
f4.display.wrapper.appendChild(f5);
f5._top=f5.offsetTop
}f6.dataTransfer.setDragImage(f5,0,0);
if(dT){f5.parentNode.removeChild(f5)
}}}function P(f4,f5){if(Math.abs(f4.doc.scrollTop-f5)<2){return
}f4.doc.scrollTop=f5;
if(!co){dK(f4,{top:f5})
}if(f4.display.scroller.scrollTop!=f5){f4.display.scroller.scrollTop=f5
}if(f4.display.scrollbarV.scrollTop!=f5){f4.display.scrollbarV.scrollTop=f5
}if(co){dK(f4)
}d6(f4,100)
}function bD(f4,f6,f5){if(f5?f6==f4.doc.scrollLeft:Math.abs(f4.doc.scrollLeft-f6)<2){return
}f6=Math.min(f6,f4.display.scroller.scrollWidth-f4.display.scroller.clientWidth);
f4.doc.scrollLeft=f6;
ew(f4);
if(f4.display.scroller.scrollLeft!=f6){f4.display.scroller.scrollLeft=f6
}if(f4.display.scrollbarH.scrollLeft!=f6){f4.display.scrollbarH.scrollLeft=f6
}}var fd=0,cf=null;
if(dB){cf=-0.53
}else{if(co){cf=15
}else{if(c8){cf=-0.7
}else{if(aB){cf=-1/3
}}}}function b(gc,f6){var gf=f6.wheelDeltaX,ge=f6.wheelDeltaY;
if(gf==null&&f6.detail&&f6.axis==f6.HORIZONTAL_AXIS){gf=f6.detail
}if(ge==null&&f6.detail&&f6.axis==f6.VERTICAL_AXIS){ge=f6.detail
}else{if(ge==null){ge=f6.wheelDelta
}}var f8=gc.display,gb=f8.scroller;
if(!(gf&&gb.scrollWidth>gb.clientWidth||ge&&gb.scrollHeight>gb.clientHeight)){return
}if(ge&&b6&&cW){outer:for(var gd=f6.target,ga=f8.view;
gd!=gb;
gd=gd.parentNode){for(var f5=0;
f5<ga.length;
f5++){if(ga[f5].node==gd){gc.display.currentWheelTarget=gd;
break outer
}}}}if(gf&&!co&&!dT&&cf!=null){if(ge){P(gc,Math.max(0,Math.min(gb.scrollTop+ge*cf,gb.scrollHeight-gb.clientHeight)))
}bD(gc,Math.max(0,Math.min(gb.scrollLeft+gf*cf,gb.scrollWidth-gb.clientWidth)));
cE(f6);
f8.wheelStartX=null;
return
}if(ge&&cf!=null){var f4=ge*cf;
var f9=gc.doc.scrollTop,f7=f9+f8.wrapper.clientHeight;
if(f4<0){f9=Math.max(0,f9+f4-50)
}else{f7=Math.min(gc.doc.height,f7+f4+50)
}dK(gc,{top:f9,bottom:f7})
}if(fd<20){if(f8.wheelStartX==null){f8.wheelStartX=gb.scrollLeft;
f8.wheelStartY=gb.scrollTop;
f8.wheelDX=gf;
f8.wheelDY=ge;
setTimeout(function(){if(f8.wheelStartX==null){return
}var gg=gb.scrollLeft-f8.wheelStartX;
var gi=gb.scrollTop-f8.wheelStartY;
var gh=(gi&&f8.wheelDY&&gi/f8.wheelDY)||(gg&&f8.wheelDX&&gg/f8.wheelDX);
f8.wheelStartX=f8.wheelStartY=null;
if(!gh){return
}cf=(cf*fd+gh)/(fd+1);
++fd
},200)
}else{f8.wheelDX+=gf;
f8.wheelDY+=ge
}}}function fI(f5,f8,f4){if(typeof f8=="string"){f8=ev[f8];
if(!f8){return false
}}if(f5.display.pollingFast&&cg(f5)){f5.display.pollingFast=false
}var f7=f5.display.shift,f6=false;
try{if(aj(f5)){f5.state.suppressEdits=true
}if(f4){f5.display.shift=false
}f6=f8(f5)!=b9
}finally{f5.display.shift=f7;
f5.state.suppressEdits=false
}return f6
}function d1(f5,f6,f8){for(var f7=0;
f7<f5.state.keyMaps.length;
f7++){var f4=j(f6,f5.state.keyMaps[f7],f8);
if(f4){return f4
}}return(f5.options.extraKeys&&j(f6,f5.options.extraKeys,f8))||j(f6,f5.options.keyMap,f8)
}var dD=new f3;
function a9(f5,f7,f9,f8){var f6=f5.state.keySeq;
if(f6){if(eu(f7)){return"handled"
}dD.set(50,function(){if(f5.state.keySeq==f6){f5.state.keySeq=null;
fg(f5)
}});
f7=f6+" "+f7
}var f4=d1(f5,f7,f8);
if(f4=="multi"){f5.state.keySeq=f7
}if(f4=="handled"){ae(f5,"keyHandled",f5,f7,f9)
}if(f4=="handled"||f4=="multi"){cE(f9);
q(f5)
}if(f6&&!f4&&/\'$/.test(f7)){cE(f9);
return true
}return !!f4
}function fa(f4,f6){var f5=fj(f6,true);
if(!f5){return false
}if(f6.shiftKey&&!f4.state.keySeq){return a9(f4,"Shift-"+f5,f6,function(f7){return fI(f4,f7,true)
})||a9(f4,f5,f6,function(f7){if(typeof f7=="string"?/^go[A-Z]/.test(f7):f7.motion){return fI(f4,f7)
}})
}else{return a9(f4,f5,f6,function(f7){return fI(f4,f7)
})
}}function ea(f4,f6,f5){return a9(f4,"'"+f5+"'",f6,function(f7){return fI(f4,f7,true)
})
}var df=null;
function r(f7){var f4=this;
t(f4);
if(aO(f4,f7)){return
}if(dB&&m<11&&f7.keyCode==27){f7.returnValue=false
}var f5=f7.keyCode;
f4.display.shift=f5==16||f7.shiftKey;
var f6=fa(f4,f7);
if(dT){df=f6?f5:null;
if(!f6&&f5==88&&!c6&&(b6?f7.metaKey:f7.ctrlKey)){f4.replaceSelection("",null,"cut")
}}if(f5==18&&!/\bCodeMirror-crosshair\b/.test(f4.display.lineDiv.className)){av(f4)
}}function av(f5){var f6=f5.display.lineDiv;
fs(f6,"CodeMirror-crosshair");
function f4(f7){if(f7.keyCode==18||!f7.altKey){f(f6,"CodeMirror-crosshair");
d4(document,"keyup",f4);
d4(document,"mouseover",f4)
}}bW(document,"keyup",f4);
bW(document,"mouseover",f4)
}function be(f4){if(f4.keyCode==16){this.doc.sel.shift=false
}aO(this,f4)
}function cx(f8){var f4=this;
if(aO(f4,f8)||f8.ctrlKey&&!f8.altKey||b6&&f8.metaKey){return
}var f7=f8.keyCode,f5=f8.charCode;
if(dT&&f7==df){df=null;
cE(f8);
return
}if(((dT&&(!f8.which||f8.which<10))||a7)&&fa(f4,f8)){return
}var f6=String.fromCharCode(f5==null?f7:f5);
if(ea(f4,f8,f6)){return
}if(dB&&m>=9){f4.display.inputHasSelection=null
}D(f4)
}function cA(f4){if(f4.options.readOnly=="nocursor"){return
}if(!f4.state.focused){aC(f4,"focus",f4);
f4.state.focused=true;
fs(f4.display.wrapper,"CodeMirror-focused");
if(!f4.curOp&&f4.display.selForContextMenu!=f4.doc.sel){fg(f4);
if(cW){setTimeout(cv(fg,f4,true),0)
}}}bl(f4);
q(f4)
}function aR(f4){if(f4.state.focused){aC(f4,"blur",f4);
f4.state.focused=false;
f(f4.display.wrapper,"CodeMirror-focused")
}clearInterval(f4.display.blinker);
setTimeout(function(){if(!f4.state.focused){f4.display.shift=false
}},150)
}function ay(gd,f8){if(aO(gd,f8,"contextmenu")){return
}var ga=gd.display;
if(a6(ga,f8)||dc(gd,f8)){return
}var gc=cn(gd,f8),f4=ga.scroller.scrollTop;
if(!gc||dT){return
}var f7=gd.options.resetSelectionOnContextMenu;
if(f7&&gd.doc.sel.contains(gc)==-1){cY(gd,bT)(gd.doc,eK(gc),aa)
}var f9=ga.input.style.cssText;
ga.inputDiv.style.position="absolute";
ga.input.style.cssText="position: fixed; width: 30px; height: 30px; top: "+(f8.clientY-5)+"px; left: "+(f8.clientX-5)+"px; z-index: 1000; background: "+(dB?"rgba(255, 255, 255, .05)":"transparent")+"; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
if(cW){var ge=window.scrollY
}er(gd);
if(cW){window.scrollTo(null,ge)
}fg(gd);
if(!gd.somethingSelected()){ga.input.value=ga.prevInput=" "
}ga.selForContextMenu=gd.doc.sel;
clearTimeout(ga.detectingSelectAll);
function f6(){if(ga.input.selectionStart!=null){var gf=gd.somethingSelected();
var gg=ga.input.value="\u200b"+(gf?ga.input.value:"");
ga.prevInput=gf?"":"\u200b";
ga.input.selectionStart=1;
ga.input.selectionEnd=gg.length;
ga.selForContextMenu=gd.doc.sel
}}function gb(){ga.inputDiv.style.position="relative";
ga.input.style.cssText=f9;
if(dB&&m<9){ga.scrollbarV.scrollTop=ga.scroller.scrollTop=f4
}bl(gd);
if(ga.input.selectionStart!=null){if(!dB||(dB&&m<9)){f6()
}var gf=0,gg=function(){if(ga.selForContextMenu==gd.doc.sel&&ga.input.selectionStart==0){cY(gd,ev.selectAll)(gd)
}else{if(gf++<10){ga.detectingSelectAll=setTimeout(gg,500)
}else{fg(gd)
}}};
ga.detectingSelectAll=setTimeout(gg,200)
}}if(dB&&m>=9){f6()
}if(fW){ei(f8);
var f5=function(){d4(window,"mouseup",f5);
setTimeout(gb,20)
};
bW(window,"mouseup",f5)
}else{setTimeout(gb,50)
}}function dc(f4,f5){if(!e9(f4,"gutterContextMenu")){return false
}return f2(f4,f5,"gutterContextMenu",false,aC)
}var cT=K.changeEnd=function(f4){if(!f4.text){return f4.to
}return Y(f4.from.line+f4.text.length-1,fz(f4.text).length+(f4.text.length==1?f4.from.ch:0))
};
function bY(f7,f6){if(ce(f7,f6.from)<0){return f7
}if(ce(f7,f6.to)<=0){return cT(f6)
}var f4=f7.line+f6.text.length-(f6.to.line-f6.from.line)-1,f5=f7.ch;
if(f7.line==f6.to.line){f5+=cT(f6).ch-f6.to.ch
}return Y(f4,f5)
}function fb(f7,f8){var f5=[];
for(var f6=0;
f6<f7.sel.ranges.length;
f6++){var f4=f7.sel.ranges[f6];
f5.push(new dP(bY(f4.anchor,f8),bY(f4.head,f8)))
}return cw(f5,f7.sel.primIndex)
}function bt(f6,f5,f4){if(f6.line==f5.line){return Y(f4.line,f6.ch-f5.ch+f4.ch)
}else{return Y(f4.line+(f6.line-f5.line),f6.ch)
}}function af(ge,gb,f5){var f6=[];
var f4=Y(ge.first,0),gf=f4;
for(var f8=0;
f8<gb.length;
f8++){var ga=gb[f8];
var gd=bt(ga.from,f4,gf);
var gc=bt(cT(ga),f4,gf);
f4=ga.to;
gf=gc;
if(f5=="around"){var f9=ge.sel.ranges[f8],f7=ce(f9.head,f9.anchor)<0;
f6[f8]=new dP(f7?gc:gd,f7?gd:gc)
}else{f6[f8]=new dP(gd,gd)
}}return new fP(f6,ge.sel.primIndex)
}function dI(f5,f7,f6){var f4={canceled:false,from:f7.from,to:f7.to,text:f7.text,origin:f7.origin,cancel:function(){this.canceled=true
}};
if(f6){f4.update=function(gb,ga,f9,f8){if(gb){this.from=fB(f5,gb)
}if(ga){this.to=fB(f5,ga)
}if(f9){this.text=f9
}if(f8!==undefined){this.origin=f8
}}
}aC(f5,"beforeChange",f5,f4);
if(f5.cm){aC(f5.cm,"beforeChange",f5.cm,f4)
}if(f4.canceled){return null
}return{from:f4.from,to:f4.to,text:f4.text,origin:f4.origin}
}function bc(f7,f8,f6){if(f7.cm){if(!f7.cm.curOp){return cY(f7.cm,bc)(f7,f8,f6)
}if(f7.cm.state.suppressEdits){return
}}if(e9(f7,"beforeChange")||f7.cm&&e9(f7.cm,"beforeChange")){f8=dI(f7,f8,true);
if(!f8){return
}}var f5=fZ&&!f6&&cF(f7,f8.from,f8.to);
if(f5){for(var f4=f5.length-1;
f4>=0;
--f4){M(f7,{from:f5[f4].from,to:f5[f4].to,text:f4?[""]:f8.text})
}}else{M(f7,f8)
}}function M(f6,f7){if(f7.text.length==1&&f7.text[0]==""&&ce(f7.from,f7.to)==0){return
}var f5=fb(f6,f7);
fE(f6,f7,f5,f6.cm?f6.cm.curOp.id:NaN);
d5(f6,f7,f5,eb(f6,f7));
var f4=[];
dY(f6,function(f9,f8){if(!f8&&dd(f4,f9.history)==-1){dw(f9.history,f7);
f4.push(f9.history)
}d5(f9,f7,null,eb(f9,f7))
})
}function b7(gf,gd,gh){if(gf.cm&&gf.cm.state.suppressEdits){return
}var gc=gf.history,f6,f8=gf.sel;
var f4=gd=="undo"?gc.done:gc.undone,gg=gd=="undo"?gc.undone:gc.done;
for(var f9=0;
f9<f4.length;
f9++){f6=f4[f9];
if(gh?f6.ranges&&!f6.equals(gf.sel):!f6.ranges){break
}}if(f9==f4.length){return
}gc.lastOrigin=gc.lastSelOrigin=null;
for(;
;
){f6=f4.pop();
if(f6.ranges){cL(f6,gg);
if(gh&&!f6.equals(gf.sel)){bT(gf,f6,{clearRedo:false});
return
}f8=f6
}else{break
}}var gb=[];
cL(f8,gg);
gg.push({changes:gb,generation:gc.generation});
gc.generation=f6.generation||++gc.maxGeneration;
var f7=e9(gf,"beforeChange")||gf.cm&&e9(gf.cm,"beforeChange");
for(var f9=f6.changes.length-1;
f9>=0;
--f9){var ge=f6.changes[f9];
ge.origin=gd;
if(f7&&!dI(gf,ge,false)){f4.length=0;
return
}gb.push(dm(gf,ge));
var f5=f9?fb(gf,ge):fz(f4);
d5(gf,ge,f5,d0(gf,ge));
if(!f9&&gf.cm){gf.cm.scrollIntoView({from:ge.from,to:cT(ge)})
}var ga=[];
dY(gf,function(gj,gi){if(!gi&&dd(ga,gj.history)==-1){dw(gj.history,ge);
ga.push(gj.history)
}d5(gj,ge,null,d0(gj,ge))
})
}}function fe(f5,f7){if(f7==0){return
}f5.first+=f7;
f5.sel=new fP(bR(f5.sel.ranges,function(f8){return new dP(Y(f8.anchor.line+f7,f8.anchor.ch),Y(f8.head.line+f7,f8.head.ch))
}),f5.sel.primIndex);
if(f5.cm){ah(f5.cm,f5.first,f5.first-f7,f7);
for(var f6=f5.cm.display,f4=f6.viewFrom;
f4<f6.viewTo;
f4++){T(f5.cm,f4,"gutter")
}}}function d5(f8,f9,f7,f5){if(f8.cm&&!f8.cm.curOp){return cY(f8.cm,d5)(f8,f9,f7,f5)
}if(f9.to.line<f8.first){fe(f8,f9.text.length-1-(f9.to.line-f9.from.line));
return
}if(f9.from.line>f8.lastLine()){return
}if(f9.from.line<f8.first){var f4=f9.text.length-1-(f8.first-f9.from.line);
fe(f8,f4);
f9={from:Y(f8.first,0),to:Y(f9.to.line+f4,f9.to.ch),text:[fz(f9.text)],origin:f9.origin}
}var f6=f8.lastLine();
if(f9.to.line>f6){f9={from:f9.from,to:Y(f6,e6(f8,f6).text.length),text:[f9.text[0]],origin:f9.origin}
}f9.removed=fQ(f8,f9.from,f9.to);
if(!f7){f7=fb(f8,f9)
}if(f8.cm){aH(f8.cm,f9,f5)
}else{fq(f8,f9,f5)
}eg(f8,f7,aa)
}function aH(gf,gb,f9){var ge=gf.doc,ga=gf.display,gc=gb.from,gd=gb.to;
var f4=false,f8=gc.line;
if(!gf.options.lineWrapping){f8=bM(A(e6(ge,gc.line)));
ge.iter(f8,gd.line+1,function(gh){if(gh==ga.maxLine){f4=true;
return true
}})
}if(ge.sel.contains(gb.from,gb.to)>-1){X(gf)
}fq(ge,gb,f9,ba(gf));
if(!gf.options.lineWrapping){ge.iter(f8,gc.line+gb.text.length,function(gi){var gh=ed(gi);
if(gh>ga.maxLineLength){ga.maxLine=gi;
ga.maxLineLength=gh;
ga.maxLineChanged=true;
f4=false
}});
if(f4){gf.curOp.updateMaxLine=true
}}ge.frontier=Math.min(ge.frontier,gc.line);
d6(gf,400);
var gg=gb.text.length-(gd.line-gc.line)-1;
if(gc.line==gd.line&&gb.text.length==1&&!dJ(gf.doc,gb)){T(gf,gc.line,"text")
}else{ah(gf,gc.line,gd.line+1,gg)
}var f6=e9(gf,"changes"),f7=e9(gf,"change");
if(f7||f6){var f5={from:gc,to:gd,text:gb.text,removed:gb.removed,origin:gb.origin};
if(f7){ae(gf,"change",gf,f5)
}if(f6){(gf.curOp.changeObjs||(gf.curOp.changeObjs=[])).push(f5)
}}gf.display.selForContextMenu=null
}function aX(f7,f6,f9,f8,f4){if(!f8){f8=f9
}if(ce(f8,f9)<0){var f5=f8;
f8=f9;
f9=f5
}if(typeof f6=="string"){f6=aW(f6)
}bc(f7,{from:f9,to:f8,text:f6,origin:f4})
}function dX(f5,f8){if(aO(f5,"scrollCursorIntoView")){return
}var f9=f5.display,f6=f9.sizer.getBoundingClientRect(),f4=null;
if(f8.top+f6.top<0){f4=true
}else{if(f8.bottom+f6.top>(window.innerHeight||document.documentElement.clientHeight)){f4=false
}}if(f4!=null&&!fm){var f7=fO("div","\u200b",null,"position: absolute; top: "+(f8.top-f9.viewOffset-eZ(f5.display))+"px; height: "+(f8.bottom-f8.top+bh)+"px; left: "+f8.left+"px; width: 2px;");
f5.display.lineSpace.appendChild(f7);
f7.scrollIntoView(f4);
f5.display.lineSpace.removeChild(f7)
}}function G(ge,gc,f8,f7){if(f7==null){f7=0
}for(var f9=0;
f9<5;
f9++){var ga=false,gd=dL(ge,gc);
var f4=!f8||f8==gc?gd:dL(ge,f8);
var f6=J(ge,Math.min(gd.left,f4.left),Math.min(gd.top,f4.top)-f7,Math.max(gd.left,f4.left),Math.max(gd.bottom,f4.bottom)+f7);
var gb=ge.doc.scrollTop,f5=ge.doc.scrollLeft;
if(f6.scrollTop!=null){P(ge,f6.scrollTop);
if(Math.abs(ge.doc.scrollTop-gb)>1){ga=true
}}if(f6.scrollLeft!=null){bD(ge,f6.scrollLeft);
if(Math.abs(ge.doc.scrollLeft-f5)>1){ga=true
}}if(!ga){return gd
}}}function H(f4,f6,f8,f5,f7){var f9=J(f4,f6,f8,f5,f7);
if(f9.scrollTop!=null){P(f4,f9.scrollTop)
}if(f9.scrollLeft!=null){bD(f4,f9.scrollLeft)
}}function J(gg,f7,gf,f5,ge){var gc=gg.display,ga=aT(gg.display);
if(gf<0){gf=0
}var f8=gg.curOp&&gg.curOp.scrollTop!=null?gg.curOp.scrollTop:gc.scroller.scrollTop;
var gi=gc.scroller.clientHeight-bh,gk={};
if(ge-gf>gi){ge=gf+gi
}var f6=gg.doc.height+bH(gc);
var f4=gf<ga,gb=ge>f6-ga;
if(gf<f8){gk.scrollTop=f4?0:gf
}else{if(ge>f8+gi){var gd=Math.min(gf,(gb?f6:ge)-gi);
if(gd!=f8){gk.scrollTop=gd
}}}var gj=gg.curOp&&gg.curOp.scrollLeft!=null?gg.curOp.scrollLeft:gc.scroller.scrollLeft;
var gh=gc.scroller.clientWidth-bh-gc.gutters.offsetWidth;
var f9=f5-f7>gh;
if(f9){f5=f7+gh
}if(f7<10){gk.scrollLeft=0
}else{if(f7<gj){gk.scrollLeft=Math.max(0,f7-(f9?0:10))
}else{if(f5>gh+gj-3){gk.scrollLeft=f5+(f9?0:10)-gh
}}}return gk
}function cJ(f4,f6,f5){if(f6!=null||f5!=null){fu(f4)
}if(f6!=null){f4.curOp.scrollLeft=(f4.curOp.scrollLeft==null?f4.doc.scrollLeft:f4.curOp.scrollLeft)+f6
}if(f5!=null){f4.curOp.scrollTop=(f4.curOp.scrollTop==null?f4.doc.scrollTop:f4.curOp.scrollTop)+f5
}}function fy(f4){fu(f4);
var f5=f4.getCursor(),f7=f5,f6=f5;
if(!f4.options.lineWrapping){f7=f5.ch?Y(f5.line,f5.ch-1):f5;
f6=Y(f5.line,f5.ch+1)
}f4.curOp.scrollToPos={from:f7,to:f6,margin:f4.options.cursorScrollMargin,isCursor:true}
}function fu(f4){var f6=f4.curOp.scrollToPos;
if(f6){f4.curOp.scrollToPos=null;
var f8=dz(f4,f6.from),f7=dz(f4,f6.to);
var f5=J(f4,Math.min(f8.left,f7.left),Math.min(f8.top,f7.top)-f6.margin,Math.max(f8.right,f7.right),Math.max(f8.bottom,f7.bottom)+f6.margin);
f4.scrollTo(f5.scrollLeft,f5.scrollTop)
}}function ad(gh,f7,gg,f6){var gf=gh.doc,f5;
if(gg==null){gg="add"
}if(gg=="smart"){if(!gf.mode.indent){gg="prev"
}else{f5=dt(gh,f7)
}}var gb=gh.options.tabSize;
var gi=e6(gf,f7),ga=bS(gi.text,null,gb);
if(gi.stateAfter){gi.stateAfter=null
}var f4=gi.text.match(/^\s*/)[0],gd;
if(!f6&&!/\S/.test(gi.text)){gd=0;
gg="not"
}else{if(gg=="smart"){gd=gf.mode.indent(f5,gi.text.slice(f4.length),gi.text);
if(gd==b9||gd>150){if(!f6){return
}gg="prev"
}}}if(gg=="prev"){if(f7>gf.first){gd=bS(e6(gf,f7-1).text,null,gb)
}else{gd=0
}}else{if(gg=="add"){gd=ga+gh.options.indentUnit
}else{if(gg=="subtract"){gd=ga-gh.options.indentUnit
}else{if(typeof gg=="number"){gd=ga+gg
}}}}gd=Math.max(0,gd);
var ge="",gc=0;
if(gh.options.indentWithTabs){for(var f8=Math.floor(gd/gb);
f8;
--f8){gc+=gb;
ge+="\t"
}}if(gc<gd){ge+=cp(gd-gc)
}if(ge!=f4){aX(gf,ge,Y(f7,0),Y(f7,f4.length),"+input")
}else{for(var f8=0;
f8<gf.sel.ranges.length;
f8++){var f9=gf.sel.ranges[f8];
if(f9.head.line==f7&&f9.head.ch<f4.length){var gc=Y(f7,f4.length);
e(gf,f8,new dP(gc,gc));
break
}}}gi.stateAfter=null
}function eq(f7,f6,f4,f9){var f8=f6,f5=f6;
if(typeof f6=="number"){f5=e6(f7,c1(f7,f6))
}else{f8=bM(f6)
}if(f8==null){return null
}if(f9(f5,f8)&&f7.cm){T(f7.cm,f8,f4)
}return f5
}function eP(f4,ga){var f5=f4.doc.sel.ranges,f8=[];
for(var f7=0;
f7<f5.length;
f7++){var f6=ga(f5[f7]);
while(f8.length&&ce(f6.from,fz(f8).to)<=0){var f9=f8.pop();
if(ce(f9.from,f6.from)<0){f6.from=f9.from;
break
}}f8.push(f6)
}cK(f4,function(){for(var gb=f8.length-1;
gb>=0;
gb--){aX(f4.doc,"",f8[gb].from,f8[gb].to,"+delete")
}fy(f4)
})
}function bv(gm,f8,gg,gf,ga){var gd=f8.line,ge=f8.ch,gl=gg;
var f5=e6(gm,gd);
var gj=true;
function gk(){var gn=gd+gg;
if(gn<gm.first||gn>=gm.first+gm.size){return(gj=false)
}gd=gn;
return f5=e6(gm,gn)
}function gi(go){var gn=(ga?w:ai)(f5,ge,gg,true);
if(gn==null){if(!go&&gk()){if(ga){ge=(gg<0?cQ:cD)(f5)
}else{ge=gg<0?f5.text.length:0
}}else{return(gj=false)
}}else{ge=gn
}return true
}if(gf=="char"){gi()
}else{if(gf=="column"){gi(true)
}else{if(gf=="word"||gf=="group"){var gh=null,gb=gf=="group";
var f4=gm.cm&&gm.cm.getHelper(f8,"wordChars");
for(var f9=true;
;
f9=false){if(gg<0&&!gi(!f9)){break
}var f6=f5.text.charAt(ge)||"\n";
var f7=cz(f6,f4)?"w":gb&&f6=="\n"?"n":!gb||/\s/.test(f6)?null:"p";
if(gb&&!f9&&!f7){f7="s"
}if(gh&&gh!=f7){if(gg<0){gg=1;
gi()
}break
}if(f7){gh=f7
}if(gg>0&&!gi(!f9)){break
}}}}}var gc=bU(gm,Y(gd,ge),gl,true);
if(!gj){gc.hitSide=true
}return gc
}function bp(gc,f7,f4,gb){var ga=gc.doc,f9=f7.left,f8;
if(gb=="page"){var f6=Math.min(gc.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight);
f8=f7.top+f4*(f6-(f4<0?1.5:0.5)*aT(gc.display))
}else{if(gb=="line"){f8=f4>0?f7.bottom+3:f7.top-3
}}for(;
;
){var f5=fG(gc,f9,f8);
if(!f5.outside){break
}if(f4<0?f8<=0:f8>=ga.height){f5.hitSide=true;
break
}f8+=f4*5
}return f5
}K.prototype={constructor:K,focus:function(){window.focus();
er(this);
D(this)
},setOption:function(f6,f7){var f5=this.options,f4=f5[f6];
if(f5[f6]==f7&&f6!="mode"){return
}f5[f6]=f7;
if(bb.hasOwnProperty(f6)){cY(this,bb[f6])(this,f7,f4)
}},getOption:function(f4){return this.options[f4]
},getDoc:function(){return this.doc
},addKeyMap:function(f5,f4){this.state.keyMaps[f4?"push":"unshift"](fM(f5))
},removeKeyMap:function(f5){var f6=this.state.keyMaps;
for(var f4=0;
f4<f6.length;
++f4){if(f6[f4]==f5||f6[f4].name==f5){f6.splice(f4,1);
return true
}}},addOverlay:c4(function(f4,f5){var f6=f4.token?f4:K.getMode(this.options,f4);
if(f6.startState){throw new Error("Overlays may not be stateful.")
}this.state.overlays.push({mode:f6,modeSpec:f4,opaque:f5&&f5.opaque});
this.state.modeGen++;
ah(this)
}),removeOverlay:c4(function(f4){var f6=this.state.overlays;
for(var f5=0;
f5<f6.length;
++f5){var f7=f6[f5].modeSpec;
if(f7==f4||typeof f4=="string"&&f7.name==f4){f6.splice(f5,1);
this.state.modeGen++;
ah(this);
return
}}}),indentLine:c4(function(f6,f4,f5){if(typeof f4!="string"&&typeof f4!="number"){if(f4==null){f4=this.options.smartIndent?"smart":"prev"
}else{f4=f4?"add":"subtract"
}}if(b8(this.doc,f6)){ad(this,f6,f4,f5)
}}),indentSelection:c4(function(gd){var f4=this.doc.sel.ranges,f7=-1;
for(var f9=0;
f9<f4.length;
f9++){var ga=f4[f9];
if(!ga.empty()){var gb=ga.from(),gc=ga.to();
var f5=Math.max(f7,gb.line);
f7=Math.min(this.lastLine(),gc.line-(gc.ch?0:1))+1;
for(var f8=f5;
f8<f7;
++f8){ad(this,f8,gd)
}var f6=this.doc.sel.ranges;
if(gb.ch==0&&f4.length==f6.length&&f6[f9].from().ch>0){e(this.doc,f9,new dP(gb,f6[f9].to()),aa)
}}else{if(ga.head.line>f7){ad(this,ga.head.line,gd,true);
f7=ga.head.line;
if(f9==this.doc.sel.primIndex){fy(this)
}}}}}),getTokenAt:function(f5,f4){return cq(this,f5,f4)
},getLineTokens:function(f5,f4){return cq(this,Y(f5),f4,true)
},getTokenTypeAt:function(gb){gb=fB(this.doc,gb);
var f7=c2(this,e6(this.doc,gb.line));
var f9=0,ga=(f7.length-1)/2,f6=gb.ch;
var f5;
if(f6==0){f5=f7[2]
}else{for(;
;
){var f4=(f9+ga)>>1;
if((f4?f7[f4*2-1]:0)>=f6){ga=f4
}else{if(f7[f4*2+1]<f6){f9=f4+1
}else{f5=f7[f4*2+2];
break
}}}}var f8=f5?f5.indexOf("cm-overlay "):-1;
return f8<0?f5:f8==0?null:f5.slice(0,f8-1)
},getModeAt:function(f5){var f4=this.doc.mode;
if(!f4.innerMode){return f4
}return K.innerMode(f4,this.getTokenAt(f5).state).mode
},getHelper:function(f5,f4){return this.getHelpers(f5,f4)[0]
},getHelpers:function(gb,f6){var f7=[];
if(!ff.hasOwnProperty(f6)){return ff
}var f4=ff[f6],ga=this.getModeAt(gb);
if(typeof ga[f6]=="string"){if(f4[ga[f6]]){f7.push(f4[ga[f6]])
}}else{if(ga[f6]){for(var f5=0;
f5<ga[f6].length;
f5++){var f9=f4[ga[f6][f5]];
if(f9){f7.push(f9)
}}}else{if(ga.helperType&&f4[ga.helperType]){f7.push(f4[ga.helperType])
}else{if(f4[ga.name]){f7.push(f4[ga.name])
}}}}for(var f5=0;
f5<f4._global.length;
f5++){var f8=f4._global[f5];
if(f8.pred(ga,this)&&dd(f7,f8.val)==-1){f7.push(f8.val)
}}return f7
},getStateAfter:function(f5,f4){var f6=this.doc;
f5=c1(f6,f5==null?f6.first+f6.size-1:f5);
return dt(this,f5+1,f4)
},cursorCoords:function(f7,f5){var f6,f4=this.doc.sel.primary();
if(f7==null){f6=f4.head
}else{if(typeof f7=="object"){f6=fB(this.doc,f7)
}else{f6=f7?f4.from():f4.to()
}}return dL(this,f6,f5||"page")
},charCoords:function(f5,f4){return cH(this,fB(this.doc,f5),f4||"page")
},coordsChar:function(f4,f5){f4=f1(this,f4,f5||"page");
return fG(this,f4.left,f4.top)
},lineAtHeight:function(f4,f5){f4=f1(this,{top:f4,left:0},f5||"page").top;
return bF(this.doc,f4+this.display.viewOffset)
},heightAtLine:function(f5,f8){var f4=false,f7=this.doc.first+this.doc.size-1;
if(f5<this.doc.first){f5=this.doc.first
}else{if(f5>f7){f5=f7;
f4=true
}}var f6=e6(this.doc,f5);
return eI(this,f6,{top:0,left:0},f8||"page").top+(f4?this.doc.height-bL(f6):0)
},defaultTextHeight:function(){return aT(this.display)
},defaultCharWidth:function(){return dv(this.display)
},setGutterMarker:c4(function(f4,f5,f6){return eq(this.doc,f4,"gutter",function(f7){var f8=f7.gutterMarkers||(f7.gutterMarkers={});
f8[f5]=f6;
if(!f6&&eM(f8)){f7.gutterMarkers=null
}return true
})
}),clearGutter:c4(function(f6){var f4=this,f7=f4.doc,f5=f7.first;
f7.iter(function(f8){if(f8.gutterMarkers&&f8.gutterMarkers[f6]){f8.gutterMarkers[f6]=null;
T(f4,f5,"gutter");
if(eM(f8.gutterMarkers)){f8.gutterMarkers=null
}}++f5
})
}),addLineWidget:c4(function(f6,f5,f4){return bG(this,f6,f5,f4)
}),removeLineWidget:function(f4){f4.clear()
},lineInfo:function(f4){if(typeof f4=="number"){if(!b8(this.doc,f4)){return null
}var f5=f4;
f4=e6(this.doc,f4);
if(!f4){return null
}}else{var f5=bM(f4);
if(f5==null){return null
}}return{line:f5,handle:f4,text:f4.text,gutterMarkers:f4.gutterMarkers,textClass:f4.textClass,bgClass:f4.bgClass,wrapClass:f4.wrapClass,widgets:f4.widgets}
},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}
},addWidget:function(f9,f6,gb,f7,gd){var f8=this.display;
f9=dL(this,fB(this.doc,f9));
var ga=f9.bottom,f5=f9.left;
f6.style.position="absolute";
f8.sizer.appendChild(f6);
if(f7=="over"){ga=f9.top
}else{if(f7=="above"||f7=="near"){var f4=Math.max(f8.wrapper.clientHeight,this.doc.height),gc=Math.max(f8.sizer.clientWidth,f8.lineSpace.clientWidth);
if((f7=="above"||f9.bottom+f6.offsetHeight>f4)&&f9.top>f6.offsetHeight){ga=f9.top-f6.offsetHeight
}else{if(f9.bottom+f6.offsetHeight<=f4){ga=f9.bottom
}}if(f5+f6.offsetWidth>gc){f5=gc-f6.offsetWidth
}}}f6.style.top=ga+"px";
f6.style.left=f6.style.right="";
if(gd=="right"){f5=f8.sizer.clientWidth-f6.offsetWidth;
f6.style.right="0px"
}else{if(gd=="left"){f5=0
}else{if(gd=="middle"){f5=(f8.sizer.clientWidth-f6.offsetWidth)/2
}}f6.style.left=f5+"px"
}if(gb){H(this,f5,ga,f5+f6.offsetWidth,ga+f6.offsetHeight)
}},triggerOnKeyDown:c4(r),triggerOnKeyPress:c4(cx),triggerOnKeyUp:be,execCommand:function(f4){if(ev.hasOwnProperty(f4)){return ev[f4](this)
}},findPosH:function(ga,f7,f8,f5){var f4=1;
if(f7<0){f4=-1;
f7=-f7
}for(var f6=0,f9=fB(this.doc,ga);
f6<f7;
++f6){f9=bv(this.doc,f9,f4,f8,f5);
if(f9.hitSide){break
}}return f9
},moveH:c4(function(f5,f6){var f4=this;
f4.extendSelectionsBy(function(f7){if(f4.display.shift||f4.doc.extend||f7.empty()){return bv(f4.doc,f7.head,f5,f6,f4.options.rtlMoveVisually)
}else{return f5<0?f7.from():f7.to()
}},cS)
}),deleteH:c4(function(f4,f5){var f6=this.doc.sel,f7=this.doc;
if(f6.somethingSelected()){f7.replaceSelection("",null,"+delete")
}else{eP(this,function(f9){var f8=bv(f7,f9.head,f4,f5,false);
return f4<0?{from:f8,to:f9.head}:{from:f9.head,to:f8}
})
}}),findPosV:function(f9,f6,ga,gc){var f4=1,f8=gc;
if(f6<0){f4=-1;
f6=-f6
}for(var f5=0,gb=fB(this.doc,f9);
f5<f6;
++f5){var f7=dL(this,gb,"div");
if(f8==null){f8=f7.left
}else{f7.left=f8
}gb=bp(this,f7,f4,ga);
if(gb.hitSide){break
}}return gb
},moveV:c4(function(f5,f7){var f4=this,f9=this.doc,f8=[];
var ga=!f4.display.shift&&!f9.extend&&f9.sel.somethingSelected();
f9.extendSelectionsBy(function(gb){if(ga){return f5<0?gb.from():gb.to()
}var gd=dL(f4,gb.head,"div");
if(gb.goalColumn!=null){gd.left=gb.goalColumn
}f8.push(gd.left);
var gc=bp(f4,gd,f5,f7);
if(f7=="page"&&gb==f9.sel.primary()){cJ(f4,null,cH(f4,gc,"div").top-gd.top)
}return gc
},cS);
if(f8.length){for(var f6=0;
f6<f9.sel.ranges.length;
f6++){f9.sel.ranges[f6].goalColumn=f8[f6]
}}}),findWordAt:function(gb){var f9=this.doc,f7=e6(f9,gb.line).text;
var ga=gb.ch,f6=gb.ch;
if(f7){var f8=this.getHelper(gb,"wordChars");
if((gb.xRel<0||f6==f7.length)&&ga){--ga
}else{++f6
}var f5=f7.charAt(ga);
var f4=cz(f5,f8)?function(gc){return cz(gc,f8)
}:/\s/.test(f5)?function(gc){return/\s/.test(gc)
}:function(gc){return !/\s/.test(gc)&&!cz(gc)
};
while(ga>0&&f4(f7.charAt(ga-1))){--ga
}while(f6<f7.length&&f4(f7.charAt(f6))){++f6
}}return new dP(Y(gb.line,ga),Y(gb.line,f6))
},toggleOverwrite:function(f4){if(f4!=null&&f4==this.state.overwrite){return
}if(this.state.overwrite=!this.state.overwrite){fs(this.display.cursorDiv,"CodeMirror-overwrite")
}else{f(this.display.cursorDiv,"CodeMirror-overwrite")
}aC(this,"overwriteToggle",this,this.state.overwrite)
},hasFocus:function(){return dF()==this.display.input
},scrollTo:c4(function(f4,f5){if(f4!=null||f5!=null){fu(this)
}if(f4!=null){this.curOp.scrollLeft=f4
}if(f5!=null){this.curOp.scrollTop=f5
}}),getScrollInfo:function(){var f4=this.display.scroller,f5=bh;
return{left:f4.scrollLeft,top:f4.scrollTop,height:f4.scrollHeight-f5,width:f4.scrollWidth-f5,clientHeight:f4.clientHeight-f5,clientWidth:f4.clientWidth-f5}
},scrollIntoView:c4(function(f5,f6){if(f5==null){f5={from:this.doc.sel.primary().head,to:null};
if(f6==null){f6=this.options.cursorScrollMargin
}}else{if(typeof f5=="number"){f5={from:Y(f5,0),to:null}
}else{if(f5.from==null){f5={from:f5,to:null}
}}}if(!f5.to){f5.to=f5.from
}f5.margin=f6||0;
if(f5.from.line!=null){fu(this);
this.curOp.scrollToPos=f5
}else{var f4=J(this,Math.min(f5.from.left,f5.to.left),Math.min(f5.from.top,f5.to.top)-f5.margin,Math.max(f5.from.right,f5.to.right),Math.max(f5.from.bottom,f5.to.bottom)+f5.margin);
this.scrollTo(f4.scrollLeft,f4.scrollTop)
}}),setSize:c4(function(f7,f5){var f4=this;
function f6(f9){return typeof f9=="number"||/^\d+$/.test(String(f9))?f9+"px":f9
}if(f7!=null){f4.display.wrapper.style.width=f6(f7)
}if(f5!=null){f4.display.wrapper.style.height=f6(f5)
}if(f4.options.lineWrapping){aL(this)
}var f8=f4.display.viewFrom;
f4.doc.iter(f8,f4.display.viewTo,function(f9){if(f9.widgets){for(var ga=0;
ga<f9.widgets.length;
ga++){if(f9.widgets[ga].noHScroll){T(f4,f8,"widget");
break
}}}++f8
});
f4.curOp.forceUpdate=true;
aC(f4,"refresh",this)
}),operation:function(f4){return cK(this,f4)
},refresh:c4(function(){var f4=this.display.cachedTextHeight;
ah(this);
this.curOp.forceUpdate=true;
ak(this);
this.scrollTo(this.doc.scrollLeft,this.doc.scrollTop);
c0(this);
if(f4==null||Math.abs(f4-aT(this.display))>0.5){Z(this)
}aC(this,"refresh",this)
}),swapDoc:c4(function(f5){var f4=this.doc;
f4.cm=null;
d2(this,f5);
ak(this);
fg(this);
this.scrollTo(f5.scrollLeft,f5.scrollTop);
this.curOp.forceScroll=true;
ae(this,"swapDoc",this,f4);
return f4
}),getInputField:function(){return this.display.input
},getWrapperElement:function(){return this.display.wrapper
},getScrollerElement:function(){return this.display.scroller
},getGutterElement:function(){return this.display.gutters
}};
bx(K);
var eV=K.defaults={};
var bb=K.optionHandlers={};
function u(f4,f7,f6,f5){K.defaults[f4]=f7;
if(f6){bb[f4]=f5?function(f8,ga,f9){if(f9!=cb){f6(f8,ga,f9)
}}:f6
}}var cb=K.Init={toString:function(){return"CodeMirror.Init"
}};
u("value","",function(f4,f5){f4.setValue(f5)
},true);
u("mode",null,function(f4,f5){f4.doc.modeOption=f5;
bq(f4)
},true);
u("indentUnit",2,bq,true);
u("indentWithTabs",false);
u("smartIndent",true);
u("tabSize",4,function(f4){ec(f4);
ak(f4);
ah(f4)
},true);
u("specialChars",/[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,function(f4,f5){f4.options.specialChars=new RegExp(f5.source+(f5.test("\t")?"":"|\t"),"g");
f4.refresh()
},true);
u("specialCharPlaceholder",e3,function(f4){f4.refresh()
},true);
u("electricChars",true);
u("rtlMoveVisually",!aM);
u("wholeLineUpdateBefore",true);
u("theme","default",function(f4){cM(f4);
dn(f4)
},true);
u("keyMap","default",function(f4,f8,f5){var f6=fM(f8);
var f7=f5!=K.Init&&fM(f5);
if(f7&&f7.detach){f7.detach(f4,f6)
}if(f6.attach){f6.attach(f4,f7||null)
}});
u("extraKeys",null);
u("lineWrapping",false,ey,true);
u("gutters",[],function(f4){cd(f4.options);
dn(f4)
},true);
u("fixedGutter",true,function(f4,f5){f4.display.gutters.style.left=f5?dO(f4.display)+"px":"0";
f4.refresh()
},true);
u("coverGutterNextToScrollbar",false,eQ,true);
u("lineNumbers",false,function(f4){cd(f4.options);
dn(f4)
},true);
u("firstLineNumber",1,dn,true);
u("lineNumberFormatter",function(f4){return f4
},dn,true);
u("showCursorWhenSelecting",false,bB,true);
u("resetSelectionOnContextMenu",true);
u("readOnly",false,function(f4,f5){if(f5=="nocursor"){aR(f4);
f4.display.input.blur();
f4.display.disabled=true
}else{f4.display.disabled=false;
if(!f5){fg(f4)
}}});
u("disableInput",false,function(f4,f5){if(!f5){fg(f4)
}},true);
u("dragDrop",true);
u("cursorBlinkRate",530);
u("cursorScrollMargin",0);
u("cursorHeight",1,bB,true);
u("singleCursorHeightPerLine",true,bB,true);
u("workTime",100);
u("workDelay",100);
u("flattenSpans",true,ec,true);
u("addModeClass",false,ec,true);
u("pollInterval",100);
u("undoDepth",200,function(f4,f5){f4.doc.history.undoDepth=f5
});
u("historyEventDelay",1250);
u("viewportMargin",10,function(f4){f4.refresh()
},true);
u("maxHighlightLength",10000,ec,true);
u("moveInputWithCursor",true,function(f4,f5){if(!f5){f4.display.inputDiv.style.top=f4.display.inputDiv.style.left=0
}});
u("tabindex",null,function(f4,f5){f4.display.input.tabIndex=f5||""
});
u("autofocus",null);
var dk=K.modes={},aP=K.mimeModes={};
K.defineMode=function(f4,f5){if(!K.defaults.mode&&f4!="null"){K.defaults.mode=f4
}if(arguments.length>2){f5.dependencies=Array.prototype.slice.call(arguments,2)
}dk[f4]=f5
};
K.defineMIME=function(f5,f4){aP[f5]=f4
};
K.resolveMode=function(f4){if(typeof f4=="string"&&aP.hasOwnProperty(f4)){f4=aP[f4]
}else{if(f4&&typeof f4.name=="string"&&aP.hasOwnProperty(f4.name)){var f5=aP[f4.name];
if(typeof f5=="string"){f5={name:f5}
}f4=ck(f5,f4);
f4.name=f5.name
}else{if(typeof f4=="string"&&/^[\w\-]+\/[\w\-]+\+xml$/.test(f4)){return K.resolveMode("application/xml")
}}}if(typeof f4=="string"){return{name:f4}
}else{return f4||{name:"null"}
}};
K.getMode=function(f5,f4){var f4=K.resolveMode(f4);
var f7=dk[f4.name];
if(!f7){return K.getMode(f5,"text/plain")
}var f8=f7(f5,f4);
if(dh.hasOwnProperty(f4.name)){var f6=dh[f4.name];
for(var f9 in f6){if(!f6.hasOwnProperty(f9)){continue
}if(f8.hasOwnProperty(f9)){f8["_"+f9]=f8[f9]
}f8[f9]=f6[f9]
}}f8.name=f4.name;
if(f4.helperType){f8.helperType=f4.helperType
}if(f4.modeProps){for(var f9 in f4.modeProps){f8[f9]=f4.modeProps[f9]
}}return f8
};
K.defineMode("null",function(){return{token:function(f4){f4.skipToEnd()
}}
});
K.defineMIME("text/plain","null");
var dh=K.modeExtensions={};
K.extendMode=function(f6,f5){var f4=dh.hasOwnProperty(f6)?dh[f6]:(dh[f6]={});
aK(f5,f4)
};
K.defineExtension=function(f4,f5){K.prototype[f4]=f5
};
K.defineDocExtension=function(f4,f5){at.prototype[f4]=f5
};
K.defineOption=u;
var a4=[];
K.defineInitHook=function(f4){a4.push(f4)
};
var ff=K.helpers={};
K.registerHelper=function(f5,f4,f6){if(!ff.hasOwnProperty(f5)){ff[f5]=K[f5]={_global:[]}
}ff[f5][f4]=f6
};
K.registerGlobalHelper=function(f6,f5,f4,f7){K.registerHelper(f6,f5,f7);
ff[f6]._global.push({pred:f4,val:f7})
};
var b2=K.copyState=function(f7,f4){if(f4===true){return f4
}if(f7.copyState){return f7.copyState(f4)
}var f6={};
for(var f8 in f4){var f5=f4[f8];
if(f5 instanceof Array){f5=f5.concat([])
}f6[f8]=f5
}return f6
};
var bZ=K.startState=function(f6,f5,f4){return f6.startState?f6.startState(f5,f4):true
};
K.innerMode=function(f6,f4){while(f6.innerMode){var f5=f6.innerMode(f4);
if(!f5||f5.mode==f6){break
}f4=f5.state;
f6=f5.mode
}return f5||{mode:f6,state:f4}
};
var ev=K.commands={selectAll:function(f4){f4.setSelection(Y(f4.firstLine(),0),Y(f4.lastLine()),aa)
},singleSelection:function(f4){f4.setSelection(f4.getCursor("anchor"),f4.getCursor("head"),aa)
},killLine:function(f4){eP(f4,function(f6){if(f6.empty()){var f5=e6(f4.doc,f6.head.line).text.length;
if(f6.head.ch==f5&&f6.head.line<f4.lastLine()){return{from:f6.head,to:Y(f6.head.line+1,0)}
}else{return{from:f6.head,to:Y(f6.head.line,f5)}
}}else{return{from:f6.from(),to:f6.to()}
}})
},deleteLine:function(f4){eP(f4,function(f5){return{from:Y(f5.from().line,0),to:fB(f4.doc,Y(f5.to().line+1,0))}
})
},delLineLeft:function(f4){eP(f4,function(f5){return{from:Y(f5.from().line,0),to:f5.from()}
})
},delWrappedLineLeft:function(f4){eP(f4,function(f5){var f7=f4.charCoords(f5.head,"div").top+5;
var f6=f4.coordsChar({left:0,top:f7},"div");
return{from:f6,to:f5.from()}
})
},delWrappedLineRight:function(f4){eP(f4,function(f5){var f7=f4.charCoords(f5.head,"div").top+5;
var f6=f4.coordsChar({left:f4.display.lineDiv.offsetWidth+100,top:f7},"div");
return{from:f5.from(),to:f6}
})
},undo:function(f4){f4.undo()
},redo:function(f4){f4.redo()
},undoSelection:function(f4){f4.undoSelection()
},redoSelection:function(f4){f4.redoSelection()
},goDocStart:function(f4){f4.extendSelection(Y(f4.firstLine(),0))
},goDocEnd:function(f4){f4.extendSelection(Y(f4.lastLine()))
},goLineStart:function(f4){f4.extendSelectionsBy(function(f5){return bs(f4,f5.head.line)
},{origin:"+move",bias:1})
},goLineStartSmart:function(f4){f4.extendSelectionsBy(function(f5){return dA(f4,f5.head)
},{origin:"+move",bias:1})
},goLineEnd:function(f4){f4.extendSelectionsBy(function(f5){return dG(f4,f5.head.line)
},{origin:"+move",bias:-1})
},goLineRight:function(f4){f4.extendSelectionsBy(function(f5){var f6=f4.charCoords(f5.head,"div").top+5;
return f4.coordsChar({left:f4.display.lineDiv.offsetWidth+100,top:f6},"div")
},cS)
},goLineLeft:function(f4){f4.extendSelectionsBy(function(f5){var f6=f4.charCoords(f5.head,"div").top+5;
return f4.coordsChar({left:0,top:f6},"div")
},cS)
},goLineLeftSmart:function(f4){f4.extendSelectionsBy(function(f5){var f6=f4.charCoords(f5.head,"div").top+5;
var f7=f4.coordsChar({left:0,top:f6},"div");
if(f7.ch<f4.getLine(f7.line).search(/\S/)){return dA(f4,f5.head)
}return f7
},cS)
},goLineUp:function(f4){f4.moveV(-1,"line")
},goLineDown:function(f4){f4.moveV(1,"line")
},goPageUp:function(f4){f4.moveV(-1,"page")
},goPageDown:function(f4){f4.moveV(1,"page")
},goCharLeft:function(f4){f4.moveH(-1,"char")
},goCharRight:function(f4){f4.moveH(1,"char")
},goColumnLeft:function(f4){f4.moveH(-1,"column")
},goColumnRight:function(f4){f4.moveH(1,"column")
},goWordLeft:function(f4){f4.moveH(-1,"word")
},goGroupRight:function(f4){f4.moveH(1,"group")
},goGroupLeft:function(f4){f4.moveH(-1,"group")
},goWordRight:function(f4){f4.moveH(1,"word")
},delCharBefore:function(f4){f4.deleteH(-1,"char")
},delCharAfter:function(f4){f4.deleteH(1,"char")
},delWordBefore:function(f4){f4.deleteH(-1,"word")
},delWordAfter:function(f4){f4.deleteH(1,"word")
},delGroupBefore:function(f4){f4.deleteH(-1,"group")
},delGroupAfter:function(f4){f4.deleteH(1,"group")
},indentAuto:function(f4){f4.indentSelection("smart")
},indentMore:function(f4){f4.indentSelection("add")
},indentLess:function(f4){f4.indentSelection("subtract")
},insertTab:function(f4){f4.replaceSelection("\t")
},insertSoftTab:function(f4){var f6=[],f5=f4.listSelections(),f9=f4.options.tabSize;
for(var f8=0;
f8<f5.length;
f8++){var ga=f5[f8].from();
var f7=bS(f4.getLine(ga.line),ga.ch,f9);
f6.push(new Array(f9-f7%f9+1).join(" "))
}f4.replaceSelections(f6)
},defaultTab:function(f4){if(f4.somethingSelected()){f4.indentSelection("add")
}else{f4.execCommand("insertTab")
}},transposeChars:function(f4){cK(f4,function(){var f7=f4.listSelections(),f6=[];
for(var f8=0;
f8<f7.length;
f8++){var ga=f7[f8].head,f5=e6(f4.doc,ga.line).text;
if(f5){if(ga.ch==f5.length){ga=new Y(ga.line,ga.ch-1)
}if(ga.ch>0){ga=new Y(ga.line,ga.ch+1);
f4.replaceRange(f5.charAt(ga.ch-1)+f5.charAt(ga.ch-2),Y(ga.line,ga.ch-2),ga,"+transpose")
}else{if(ga.line>f4.doc.first){var f9=e6(f4.doc,ga.line-1).text;
if(f9){f4.replaceRange(f5.charAt(0)+"\n"+f9.charAt(f9.length-1),Y(ga.line-1,f9.length-1),Y(ga.line,1),"+transpose")
}}}}f6.push(new dP(ga,ga))
}f4.setSelections(f6)
})
},newlineAndIndent:function(f4){cK(f4,function(){var f5=f4.listSelections().length;
for(var f7=0;
f7<f5;
f7++){var f6=f4.listSelections()[f7];
f4.replaceRange("\n",f6.anchor,f6.head,"+input");
f4.indentLine(f6.from().line+1,null,true);
fy(f4)
}})
},toggleOverwrite:function(f4){f4.toggleOverwrite()
}};
var e1=K.keyMap={};
e1.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"};
e1.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"};
e1.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars"};
e1.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]};
e1["default"]=b6?e1.macDefault:e1.pcDefault;
function dl(f5){var gb=f5.split(/-(?!$)/),f5=gb[gb.length-1];
var ga,f9,f4,f8;
for(var f7=0;
f7<gb.length-1;
f7++){var f6=gb[f7];
if(/^(cmd|meta|m)$/i.test(f6)){f8=true
}else{if(/^a(lt)?$/i.test(f6)){ga=true
}else{if(/^(c|ctrl|control)$/i.test(f6)){f9=true
}else{if(/^s(hift)$/i.test(f6)){f4=true
}else{throw new Error("Unrecognized modifier name: "+f6)
}}}}}if(ga){f5="Alt-"+f5
}if(f9){f5="Ctrl-"+f5
}if(f8){f5="Cmd-"+f5
}if(f4){f5="Shift-"+f5
}return f5
}K.normalizeKeyMap=function(gb){var f5={};
for(var ga in gb){if(gb.hasOwnProperty(ga)){var gc=gb[ga];
if(/^(name|fallthrough|(de|at)tach)$/.test(ga)){continue
}if(gc=="..."){delete gb[ga];
continue
}var gd=bR(ga.split(" "),dl);
for(var f9=0;
f9<gd.length;
f9++){var f7,f6;
if(f9==gd.length-1){f6=ga;
f7=gc
}else{f6=gd.slice(0,f9+1).join(" ");
f7="..."
}var f8=f5[f6];
if(!f8){f5[f6]=f7
}else{if(f8!=f7){throw new Error("Inconsistent bindings for "+f6)
}}}delete gb[ga]
}}for(var f4 in f5){gb[f4]=f5[f4]
}return gb
};
var j=K.lookupKey=function(f6,f9,f8){f9=fM(f9);
var f7=f9.call?f9.call(f6):f9[f6];
if(f7===false){return"nothing"
}if(f7==="..."){return"multi"
}if(f7!=null&&f8(f7)){return"handled"
}if(f9.fallthrough){if(Object.prototype.toString.call(f9.fallthrough)!="[object Array]"){return j(f6,f9.fallthrough,f8)
}for(var f5=0;
f5<f9.fallthrough.length;
f5++){var f4=j(f6,f9.fallthrough[f5],f8);
if(f4){return f4
}}}};
var eu=K.isModifierKey=function(f5){var f4=typeof f5=="string"?f5:e7[f5.keyCode];
return f4=="Ctrl"||f4=="Alt"||f4=="Shift"||f4=="Mod"
};
var fj=K.keyName=function(f5,f7){if(dT&&f5.keyCode==34&&f5["char"]){return false
}var f6=e7[f5.keyCode],f4=f6;
if(f4==null||f5.altGraphKey){return false
}if(f5.altKey&&f6!="Alt"){f4="Alt-"+f4
}if((bP?f5.metaKey:f5.ctrlKey)&&f6!="Ctrl"){f4="Ctrl-"+f4
}if((bP?f5.ctrlKey:f5.metaKey)&&f6!="Cmd"){f4="Cmd-"+f4
}if(!f7&&f5.shiftKey&&f6!="Shift"){f4="Shift-"+f4
}return f4
};
function fM(f4){return typeof f4=="string"?e1[f4]:f4
}K.fromTextArea=function(f5,f7){if(!f7){f7={}
}f7.value=f5.value;
if(!f7.tabindex&&f5.tabindex){f7.tabindex=f5.tabindex
}if(!f7.placeholder&&f5.placeholder){f7.placeholder=f5.placeholder
}if(f7.autofocus==null){var ga=dF();
f7.autofocus=ga==f5||f5.getAttribute("autofocus")!=null&&ga==document.body
}function f8(){f5.value=f4.getValue()
}if(f5.form){bW(f5.form,"submit",f8);
if(!f7.leaveSubmitMethodAlone){var f6=f5.form.submit;
try{var gb=f5.form.submit=function(){f8();
f5.form.submit=f6;
f5.form.submit();
f5.form.submit=gb
}
}catch(f9){}}}f5.style.display="none";
var f4=K(function(gc){f5.parentNode.insertBefore(gc,f5.nextSibling)
},f7);
f4.save=f8;
f4.getTextArea=function(){return f5
};
f4.toTextArea=function(){f4.toTextArea=isNaN;
f8();
f5.parentNode.removeChild(f4.getWrapperElement());
f5.style.display="";
if(f5.form){d4(f5.form,"submit",f8);
if(typeof f5.form.submit=="function"){f5.form.submit=f6
}}};
f4.cleanup=function(){if(f5.form){d4(f5.form,"submit",f8)
}f4.toTextArea();
f5=null;
f4=null;
K.cleanup.apply(this)
};
return f4
};
var eL=K.StringStream=function(f4,f5){this.pos=this.start=0;
this.string=f4;
this.tabSize=f5||8;
this.lastColumnPos=this.lastColumnValue=0;
this.lineStart=0
};
eL.prototype={eol:function(){return this.pos>=this.string.length
},sol:function(){return this.pos==this.lineStart
},peek:function(){return this.string.charAt(this.pos)||undefined
},next:function(){if(this.pos<this.string.length){return this.string.charAt(this.pos++)
}},eat:function(f4){var f6=this.string.charAt(this.pos);
if(typeof f4=="string"){var f5=f6==f4
}else{var f5=f6&&(f4.test?f4.test(f6):f4(f6))
}if(f5){++this.pos;
return f6
}},eatWhile:function(f4){var f5=this.pos;
while(this.eat(f4)){}return this.pos>f5
},eatSpace:function(){var f4=this.pos;
while(/[\s\u00a0]/.test(this.string.charAt(this.pos))){++this.pos
}return this.pos>f4
},skipToEnd:function(){this.pos=this.string.length
},skipTo:function(f4){var f5=this.string.indexOf(f4,this.pos);
if(f5>-1){this.pos=f5;
return true
}},backUp:function(f4){this.pos-=f4
},column:function(){if(this.lastColumnPos<this.start){this.lastColumnValue=bS(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue);
this.lastColumnPos=this.start
}return this.lastColumnValue-(this.lineStart?bS(this.string,this.lineStart,this.tabSize):0)
},indentation:function(){return bS(this.string,null,this.tabSize)-(this.lineStart?bS(this.string,this.lineStart,this.tabSize):0)
},match:function(f8,f5,f4){if(typeof f8=="string"){var f9=function(ga){return f4?ga.toLowerCase():ga
};
var f7=this.string.substr(this.pos,f8.length);
if(f9(f7)==f9(f8)){if(f5!==false){this.pos+=f8.length
}return true
}}else{var f6=this.string.slice(this.pos).match(f8);
if(f6&&f6.index>0){return null
}if(f6&&f5!==false){this.pos+=f6[0].length
}return f6
}},current:function(){return this.string.slice(this.start,this.pos)
},hideFirstChars:function(f5,f4){this.lineStart+=f5;
try{return f4()
}finally{this.lineStart-=f5
}}};
var R=K.TextMarker=function(f5,f4){this.lines=[];
this.type=f4;
this.doc=f5
};
bx(R);
R.prototype.clear=function(){if(this.explicitlyCleared){return
}var gb=this.doc.cm,f5=gb&&!gb.curOp;
if(f5){cG(gb)
}if(e9(this,"clear")){var gc=this.find();
if(gc){ae(this,"clear",gc.from,gc.to)
}}var f6=null,f9=null;
for(var f7=0;
f7<this.lines.length;
++f7){var gd=this.lines[f7];
var ga=e0(gd.markedSpans,this);
if(gb&&!this.collapsed){T(gb,bM(gd),"text")
}else{if(gb){if(ga.to!=null){f9=bM(gd)
}if(ga.from!=null){f6=bM(gd)
}}}gd.markedSpans=ez(gd.markedSpans,ga);
if(ga.from==null&&this.collapsed&&!fo(this.doc,gd)&&gb){fS(gd,aT(gb.display))
}}if(gb&&this.collapsed&&!gb.options.lineWrapping){for(var f7=0;
f7<this.lines.length;
++f7){var f4=A(this.lines[f7]),f8=ed(f4);
if(f8>gb.display.maxLineLength){gb.display.maxLine=f4;
gb.display.maxLineLength=f8;
gb.display.maxLineChanged=true
}}}if(f6!=null&&gb&&this.collapsed){ah(gb,f6,f9+1)
}this.lines.length=0;
this.explicitlyCleared=true;
if(this.atomic&&this.doc.cantEdit){this.doc.cantEdit=false;
if(gb){ep(gb.doc)
}}if(gb){ae(gb,"markerCleared",gb,this)
}if(f5){am(gb)
}if(this.parent){this.parent.clear()
}};
R.prototype.find=function(f7,f5){if(f7==null&&this.type=="bookmark"){f7=1
}var ga,f9;
for(var f6=0;
f6<this.lines.length;
++f6){var f4=this.lines[f6];
var f8=e0(f4.markedSpans,this);
if(f8.from!=null){ga=Y(f5?f4:bM(f4),f8.from);
if(f7==-1){return ga
}}if(f8.to!=null){f9=Y(f5?f4:bM(f4),f8.to);
if(f7==1){return f9
}}}return ga&&{from:ga,to:f9}
};
R.prototype.changed=function(){var f6=this.find(-1,true),f5=this,f4=this.doc.cm;
if(!f6||!f4){return
}cK(f4,function(){var f8=f6.line,f9=bM(f6.line);
var f7=e2(f4,f9);
if(f7){au(f7);
f4.curOp.selectionChanged=f4.curOp.forceUpdate=true
}f4.curOp.updateMaxLine=true;
if(!fo(f5.doc,f8)&&f5.height!=null){var gb=f5.height;
f5.height=null;
var ga=cU(f5)-gb;
if(ga){fS(f8,f8.height+ga)
}}})
};
R.prototype.attachLine=function(f4){if(!this.lines.length&&this.doc.cm){var f5=this.doc.cm.curOp;
if(!f5.maybeHiddenMarkers||dd(f5.maybeHiddenMarkers,this)==-1){(f5.maybeUnhiddenMarkers||(f5.maybeUnhiddenMarkers=[])).push(this)
}}this.lines.push(f4)
};
R.prototype.detachLine=function(f4){this.lines.splice(dd(this.lines,f4),1);
if(!this.lines.length&&this.doc.cm){var f5=this.doc.cm.curOp;
(f5.maybeHiddenMarkers||(f5.maybeHiddenMarkers=[])).push(this)
}};
var a1=0;
function ex(gc,ga,gb,ge,f8){if(ge&&ge.shared){return Q(gc,ga,gb,ge,f8)
}if(gc.cm&&!gc.cm.curOp){return cY(gc.cm,ex)(gc,ga,gb,ge,f8)
}var f7=new R(gc,f8),gd=ce(ga,gb);
if(ge){aK(ge,f7,false)
}if(gd>0||gd==0&&f7.clearWhenEmpty!==false){return f7
}if(f7.replacedWith){f7.collapsed=true;
f7.widgetNode=fO("span",[f7.replacedWith],"CodeMirror-widget");
if(!ge.handleMouseEvents){f7.widgetNode.ignoreEvents=true
}if(ge.insertLeft){f7.widgetNode.insertLeft=true
}}if(f7.collapsed){if(B(gc,ga.line,ga,gb,f7)||ga.line!=gb.line&&B(gc,gb.line,ga,gb,f7)){throw new Error("Inserting collapsed marker partially overlapping an existing one")
}a3=true
}if(f7.addToHistory){fE(gc,{from:ga,to:gb,origin:"markText"},gc.sel,NaN)
}var f5=ga.line,f9=gc.cm,f4;
gc.iter(f5,gb.line+1,function(gf){if(f9&&f7.collapsed&&!f9.options.lineWrapping&&A(gf)==f9.display.maxLine){f4=true
}if(f7.collapsed&&f5!=ga.line){fS(gf,0)
}cc(gf,new d9(f7,f5==ga.line?ga.ch:null,f5==gb.line?gb.ch:null));
++f5
});
if(f7.collapsed){gc.iter(ga.line,gb.line+1,function(gf){if(fo(gc,gf)){fS(gf,0)
}})
}if(f7.clearOnEnter){bW(f7,"beforeCursorEnter",function(){f7.clear()
})
}if(f7.readOnly){fZ=true;
if(gc.history.done.length||gc.history.undone.length){gc.clearHistory()
}}if(f7.collapsed){f7.id=++a1;
f7.atomic=true
}if(f9){if(f4){f9.curOp.updateMaxLine=true
}if(f7.collapsed){ah(f9,ga.line,gb.line+1)
}else{if(f7.className||f7.title||f7.startStyle||f7.endStyle){for(var f6=ga.line;
f6<=gb.line;
f6++){T(f9,f6,"text")
}}}if(f7.atomic){ep(f9.doc)
}ae(f9,"markerAdded",f9,f7)
}return f7
}var z=K.SharedTextMarker=function(f6,f5){this.markers=f6;
this.primary=f5;
for(var f4=0;
f4<f6.length;
++f4){f6[f4].parent=this
}};
bx(z);
z.prototype.clear=function(){if(this.explicitlyCleared){return
}this.explicitlyCleared=true;
for(var f4=0;
f4<this.markers.length;
++f4){this.markers[f4].clear()
}ae(this,"clear")
};
z.prototype.find=function(f5,f4){return this.primary.find(f5,f4)
};
function Q(f8,gb,ga,f4,f6){f4=aK(f4);
f4.shared=false;
var f9=[ex(f8,gb,ga,f4,f6)],f5=f9[0];
var f7=f4.widgetNode;
dY(f8,function(gd){if(f7){f4.widgetNode=f7.cloneNode(true)
}f9.push(ex(gd,fB(gd,gb),fB(gd,ga),f4,f6));
for(var gc=0;
gc<gd.linked.length;
++gc){if(gd.linked[gc].isParent){return
}}f5=fz(f9)
});
return new z(f9,f5)
}function eH(f4){return f4.findMarks(Y(f4.first,0),f4.clipPos(Y(f4.lastLine())),function(f5){return f5.parent
})
}function dx(f9,ga){for(var f7=0;
f7<ga.length;
f7++){var f5=ga[f7],gb=f5.find();
var f4=f9.clipPos(gb.from),f8=f9.clipPos(gb.to);
if(ce(f4,f8)){var f6=ex(f9,f4,f8,f5.primary,f5.primary.type);
f5.markers.push(f6);
f6.parent=f5
}}}function ef(f7){for(var f6=0;
f6<f7.length;
f6++){var f4=f7[f6],f9=[f4.primary.doc];
dY(f4.primary.doc,function(ga){f9.push(ga)
});
for(var f5=0;
f5<f4.markers.length;
f5++){var f8=f4.markers[f5];
if(dd(f9,f8.doc)==-1){f8.parent=null;
f4.markers.splice(f5--,1)
}}}}function d9(f4,f6,f5){this.marker=f4;
this.from=f6;
this.to=f5
}function e0(f6,f4){if(f6){for(var f5=0;
f5<f6.length;
++f5){var f7=f6[f5];
if(f7.marker==f4){return f7
}}}}function ez(f5,f6){for(var f7,f4=0;
f4<f5.length;
++f4){if(f5[f4]!=f6){(f7||(f7=[])).push(f5[f4])
}}return f7
}function cc(f4,f5){f4.markedSpans=f4.markedSpans?f4.markedSpans.concat([f5]):[f5];
f5.marker.attachLine(f4)
}function aN(f5,f6,ga){if(f5){for(var f8=0,gb;
f8<f5.length;
++f8){var gc=f5[f8],f9=gc.marker;
var f4=gc.from==null||(f9.inclusiveLeft?gc.from<=f6:gc.from<f6);
if(f4||gc.from==f6&&f9.type=="bookmark"&&(!ga||!gc.marker.insertLeft)){var f7=gc.to==null||(f9.inclusiveRight?gc.to>=f6:gc.to>f6);
(gb||(gb=[])).push(new d9(f9,gc.from,f7?null:gc.to))
}}}return gb
}function aA(f5,f7,ga){if(f5){for(var f8=0,gb;
f8<f5.length;
++f8){var gc=f5[f8],f9=gc.marker;
var f6=gc.to==null||(f9.inclusiveRight?gc.to>=f7:gc.to>f7);
if(f6||gc.from==f7&&f9.type=="bookmark"&&(!ga||gc.marker.insertLeft)){var f4=gc.from==null||(f9.inclusiveLeft?gc.from<=f7:gc.from<f7);
(gb||(gb=[])).push(new d9(f9,f4?null:gc.from-f7,gc.to==null?null:gc.to-f7))
}}}return gb
}function eb(gg,gd){var gc=b8(gg,gd.from.line)&&e6(gg,gd.from.line).markedSpans;
var gj=b8(gg,gd.to.line)&&e6(gg,gd.to.line).markedSpans;
if(!gc&&!gj){return null
}var f5=gd.from.ch,f8=gd.to.ch,gb=ce(gd.from,gd.to)==0;
var ga=aN(gc,f5,gb);
var gi=aA(gj,f8,gb);
var gh=gd.text.length==1,f6=fz(gd.text).length+(gh?f5:0);
if(ga){for(var f7=0;
f7<ga.length;
++f7){var gf=ga[f7];
if(gf.to==null){var gk=e0(gi,gf.marker);
if(!gk){gf.to=f5
}else{if(gh){gf.to=gk.to==null?null:gk.to+f6
}}}}}if(gi){for(var f7=0;
f7<gi.length;
++f7){var gf=gi[f7];
if(gf.to!=null){gf.to+=f6
}if(gf.from==null){var gk=e0(ga,gf.marker);
if(!gk){gf.from=f6;
if(gh){(ga||(ga=[])).push(gf)
}}}else{gf.from+=f6;
if(gh){(ga||(ga=[])).push(gf)
}}}}if(ga){ga=s(ga)
}if(gi&&gi!=ga){gi=s(gi)
}var f9=[ga];
if(!gh){var ge=gd.text.length-2,f4;
if(ge>0&&ga){for(var f7=0;
f7<ga.length;
++f7){if(ga[f7].to==null){(f4||(f4=[])).push(new d9(ga[f7].marker,null,null))
}}}for(var f7=0;
f7<ge;
++f7){f9.push(f4)
}f9.push(gi)
}return f9
}function s(f5){for(var f4=0;
f4<f5.length;
++f4){var f6=f5[f4];
if(f6.from!=null&&f6.from==f6.to&&f6.marker.clearWhenEmpty!==false){f5.splice(f4--,1)
}}if(!f5.length){return null
}return f5
}function d0(gc,ga){var f4=b3(gc,ga);
var gd=eb(gc,ga);
if(!f4){return gd
}if(!gd){return f4
}for(var f7=0;
f7<f4.length;
++f7){var f8=f4[f7],f9=gd[f7];
if(f8&&f9){spans:for(var f6=0;
f6<f9.length;
++f6){var gb=f9[f6];
for(var f5=0;
f5<f8.length;
++f5){if(f8[f5].marker==gb.marker){continue spans
}}f8.push(gb)
}}else{if(f9){f4[f7]=f9
}}}return f4
}function cF(gg,ge,gf){var f8=null;
gg.iter(ge.line,gf.line+1,function(gh){if(gh.markedSpans){for(var gi=0;
gi<gh.markedSpans.length;
++gi){var gj=gh.markedSpans[gi].marker;
if(gj.readOnly&&(!f8||dd(f8,gj)==-1)){(f8||(f8=[])).push(gj)
}}}});
if(!f8){return null
}var f9=[{from:ge,to:gf}];
for(var ga=0;
ga<f8.length;
++ga){var gb=f8[ga],f6=gb.find(0);
for(var f7=0;
f7<f9.length;
++f7){var f5=f9[f7];
if(ce(f5.to,f6.from)<0||ce(f5.from,f6.to)>0){continue
}var gd=[f7,1],f4=ce(f5.from,f6.from),gc=ce(f5.to,f6.to);
if(f4<0||!gb.inclusiveLeft&&!f4){gd.push({from:f5.from,to:f6.from})
}if(gc>0||!gb.inclusiveRight&&!gc){gd.push({from:f6.to,to:f5.to})
}f9.splice.apply(f9,gd);
f7+=gd.length-1
}}return f9
}function fV(f4){var f6=f4.markedSpans;
if(!f6){return
}for(var f5=0;
f5<f6.length;
++f5){f6[f5].marker.detachLine(f4)
}f4.markedSpans=null
}function cZ(f4,f6){if(!f6){return
}for(var f5=0;
f5<f6.length;
++f5){f6[f5].marker.attachLine(f4)
}f4.markedSpans=f6
}function x(f4){return f4.inclusiveLeft?-1:0
}function bV(f4){return f4.inclusiveRight?1:0
}function dH(f7,f5){var f9=f7.lines.length-f5.lines.length;
if(f9!=0){return f9
}var f6=f7.find(),ga=f5.find();
var f4=ce(f6.from,ga.from)||x(f7)-x(f5);
if(f4){return -f4
}var f8=ce(f6.to,ga.to)||bV(f7)-bV(f5);
if(f8){return f8
}return f5.id-f7.id
}function a2(f5,f9){var f4=a3&&f5.markedSpans,f8;
if(f4){for(var f7,f6=0;
f6<f4.length;
++f6){f7=f4[f6];
if(f7.marker.collapsed&&(f9?f7.from:f7.to)==null&&(!f8||dH(f8,f7.marker)<0)){f8=f7.marker
}}}return f8
}function eG(f4){return a2(f4,true)
}function em(f4){return a2(f4,false)
}function B(gc,f6,ga,gb,f8){var gf=e6(gc,f6);
var f4=a3&&gf.markedSpans;
if(f4){for(var f7=0;
f7<f4.length;
++f7){var f5=f4[f7];
if(!f5.marker.collapsed){continue
}var ge=f5.marker.find(0);
var gd=ce(ge.from,ga)||x(f5.marker)-x(f8);
var f9=ce(ge.to,gb)||bV(f5.marker)-bV(f8);
if(gd>=0&&f9<=0||gd<=0&&f9>=0){continue
}if(gd<=0&&(ce(ge.to,ga)>0||(f5.marker.inclusiveRight&&f8.inclusiveLeft))||gd>=0&&(ce(ge.from,gb)<0||(f5.marker.inclusiveLeft&&f8.inclusiveRight))){return true
}}}}function A(f5){var f4;
while(f4=eG(f5)){f5=f4.find(-1,true).line
}return f5
}function h(f6){var f4,f5;
while(f4=em(f6)){f6=f4.find(1,true).line;
(f5||(f5=[])).push(f6)
}return f5
}function aS(f7,f5){var f4=e6(f7,f5),f6=A(f4);
if(f4==f6){return f5
}return bM(f6)
}function dU(f7,f6){if(f6>f7.lastLine()){return f6
}var f5=e6(f7,f6),f4;
if(!fo(f7,f5)){return f6
}while(f4=em(f5)){f5=f4.find(1,true).line
}return bM(f5)+1
}function fo(f8,f5){var f4=a3&&f5.markedSpans;
if(f4){for(var f7,f6=0;
f6<f4.length;
++f6){f7=f4[f6];
if(!f7.marker.collapsed){continue
}if(f7.from==null){return true
}if(f7.marker.widgetNode){continue
}if(f7.from==0&&f7.marker.inclusiveLeft&&V(f8,f5,f7)){return true
}}}}function V(f9,f5,f7){if(f7.to==null){var f4=f7.marker.find(1,true);
return V(f9,f4.line,e0(f4.line.markedSpans,f7.marker))
}if(f7.marker.inclusiveRight&&f7.to==f5.text.length){return true
}for(var f8,f6=0;
f6<f5.markedSpans.length;
++f6){f8=f5.markedSpans[f6];
if(f8.marker.collapsed&&!f8.marker.widgetNode&&f8.from==f7.to&&(f8.to==null||f8.to!=f7.from)&&(f8.marker.inclusiveLeft||f7.marker.inclusiveRight)&&V(f9,f5,f8)){return true
}}}var du=K.LineWidget=function(f4,f7,f5){if(f5){for(var f6 in f5){if(f5.hasOwnProperty(f6)){this[f6]=f5[f6]
}}}this.cm=f4;
this.node=f7
};
bx(du);
function dR(f4,f5,f6){if(bL(f5)<((f4.curOp&&f4.curOp.scrollTop)||f4.doc.scrollTop)){cJ(f4,null,f6)
}}du.prototype.clear=function(){var f5=this.cm,f7=this.line.widgets,f6=this.line,f9=bM(f6);
if(f9==null||!f7){return
}for(var f8=0;
f8<f7.length;
++f8){if(f7[f8]==this){f7.splice(f8--,1)
}}if(!f7.length){f6.widgets=null
}var f4=cU(this);
cK(f5,function(){dR(f5,f6,-f4);
T(f5,f9,"widget");
fS(f6,Math.max(0,f6.height-f4))
})
};
du.prototype.changed=function(){var f5=this.height,f4=this.cm,f6=this.line;
this.height=null;
var f7=cU(this)-f5;
if(!f7){return
}cK(f4,function(){f4.curOp.forceUpdate=true;
dR(f4,f6,f7);
fS(f6,f6.height+f7)
})
};
function cU(f5){if(f5.height!=null){return f5.height
}if(!fX(document.body,f5.node)){var f4="position: relative;";
if(f5.coverGutter){f4+="margin-left: -"+f5.cm.getGutterElement().offsetWidth+"px;"
}bQ(f5.cm.display.measure,fO("div",[f5.node],null,f4))
}return f5.height=f5.node.offsetHeight
}function bG(f4,f8,f6,f5){var f7=new du(f4,f6,f5);
if(f7.noHScroll){f4.display.alignWidgets=true
}eq(f4.doc,f8,"widget",function(ga){var gb=ga.widgets||(ga.widgets=[]);
if(f7.insertAt==null){gb.push(f7)
}else{gb.splice(Math.min(gb.length-1,Math.max(0,f7.insertAt)),0,f7)
}f7.line=ga;
if(!fo(f4.doc,ga)){var f9=bL(ga)<f4.doc.scrollTop;
fS(ga,ga.height+cU(f7));
if(f9){cJ(f4,null,f7.height)
}f4.curOp.forceUpdate=true
}return true
});
return f7
}var fU=K.Line=function(f6,f5,f4){this.text=f6;
cZ(this,f5);
this.height=f4?f4(this):1
};
bx(fU);
fU.prototype.lineNo=function(){return bM(this)
};
function ee(f5,f8,f6,f4){f5.text=f8;
if(f5.stateAfter){f5.stateAfter=null
}if(f5.styles){f5.styles=null
}if(f5.order!=null){f5.order=null
}fV(f5);
cZ(f5,f6);
var f7=f4?f4(f5):1;
if(f7!=f5.height){fS(f5,f7)
}}function bA(f4){f4.parent=null;
fV(f4)
}function de(f6,f5){if(f6){for(;
;
){var f4=f6.match(/(?:^|\s+)line-(background-)?(\S+)/);
if(!f4){break
}f6=f6.slice(0,f4.index)+f6.slice(f4.index+f4[0].length);
var f7=f4[1]?"bgClass":"textClass";
if(f5[f7]==null){f5[f7]=f4[2]
}else{if(!(new RegExp("(?:^|s)"+f4[2]+"(?:$|s)")).test(f5[f7])){f5[f7]+=" "+f4[2]
}}}}return f6
}function fi(f6,f5){if(f6.blankLine){return f6.blankLine(f5)
}if(!f6.innerMode){return
}var f4=K.innerMode(f6,f5);
if(f4.mode.blankLine){return f4.mode.blankLine(f4.state)
}}function et(f9,f8,f7,f4){for(var f5=0;
f5<10;
f5++){if(f4){f4[0]=K.innerMode(f9,f7).mode
}var f6=f9.token(f8,f7);
if(f8.pos>f8.start){return f6
}}throw new Error("Mode "+f9.name+" failed to advance stream.")
}function cq(gd,gb,f8,f7){function f4(gg){return{start:ge.start,end:ge.pos,string:ge.current(),type:f6||null,state:gg?b2(gc.mode,f5):f5}
}var gc=gd.doc,f9=gc.mode,f6;
gb=fB(gc,gb);
var gf=e6(gc,gb.line),f5=dt(gd,gb.line,f8);
var ge=new eL(gf.text,gd.options.tabSize),ga;
if(f7){ga=[]
}while((f7||ge.pos<gb.ch)&&!ge.eol()){ge.start=ge.pos;
f6=et(f9,ge,f5);
if(f7){ga.push(f4(true))
}}return f7?ga:f4()
}function y(ge,gg,f9,f5,ga,f7,f8){var f6=f9.flattenSpans;
if(f6==null){f6=ge.options.flattenSpans
}var gc=0,gb=null;
var gf=new eL(gg,ge.options.tabSize),f4;
var gi=ge.options.addModeClass&&[null];
if(gg==""){de(fi(f9,f5),f7)
}while(!gf.eol()){if(gf.pos>ge.options.maxHighlightLength){f6=false;
if(f8){dp(ge,gg,f5,gf.pos)
}gf.pos=gg.length;
f4=null
}else{f4=de(et(f9,gf,f5,gi),f7)
}if(gi){var gh=gi[0].name;
if(gh){f4="m-"+(f4?gh+" "+f4:gh)
}}if(!f6||gb!=f4){if(gc<gf.start){ga(gf.start,gb)
}gc=gf.start;
gb=f4
}gf.start=gf.pos
}while(gc<gf.pos){var gd=Math.min(gf.pos,gc+50000);
ga(gd,gb);
gc=gd
}}function fr(gb,gd,f4,f8){var gc=[gb.state.modeGen],f7={};
y(gb,gd.text,gb.doc.mode,f4,function(ge,gf){gc.push(ge,gf)
},f7,f8);
for(var f5=0;
f5<gb.state.overlays.length;
++f5){var f9=gb.state.overlays[f5],ga=1,f6=0;
y(gb,gd.text,f9.mode,true,function(ge,gg){var gi=ga;
while(f6<ge){var gf=gc[ga];
if(gf>ge){gc.splice(ga,1,ge,gc[ga+1],gf)
}ga+=2;
f6=Math.min(ge,gf)
}if(!gg){return
}if(f9.opaque){gc.splice(gi,ga-gi,ge,"cm-overlay "+gg);
ga=gi+2
}else{for(;
gi<ga;
gi+=2){var gh=gc[gi+1];
gc[gi+1]=(gh?gh+" ":"")+"cm-overlay "+gg
}}},f7)
}return{styles:gc,classes:f7.bgClass||f7.textClass?f7:null}
}function c2(f5,f6,f7){if(!f6.styles||f6.styles[0]!=f5.state.modeGen){var f4=fr(f5,f6,f6.stateAfter=dt(f5,bM(f6)));
f6.styles=f4.styles;
if(f4.classes){f6.styleClasses=f4.classes
}else{if(f6.styleClasses){f6.styleClasses=null
}}if(f7===f5.doc.frontier){f5.doc.frontier++
}}return f6.styles
}function dp(f4,f9,f6,f5){var f8=f4.doc.mode;
var f7=new eL(f9,f4.options.tabSize);
f7.start=f7.pos=f5||0;
if(f9==""){fi(f8,f6)
}while(!f7.eol()&&f7.pos<=f4.options.maxHighlightLength){et(f8,f7,f6);
f7.start=f7.pos
}}var dN={},b0={};
function eO(f6,f5){if(!f6||/^\s*$/.test(f6)){return null
}var f4=f5.addModeClass?b0:dN;
return f4[f6]||(f4[f6]=f6.replace(/\S+/g,"cm-$&"))
}function eJ(f5,f9){var ga=fO("span",null,null,cW?"padding-right: .1px":null);
var f7={pre:fO("pre",[ga]),content:ga,col:0,pos:0,cm:f5};
f9.measure={};
for(var f8=0;
f8<=(f9.rest?f9.rest.length:0);
f8++){var f6=f8?f9.rest[f8-1]:f9.line,f4;
f7.pos=0;
f7.addToken=v;
if((dB||cW)&&f5.getOption("lineWrapping")){f7.addToken=fx(f7.addToken)
}if(bN(f5.display.measure)&&(f4=a(f6))){f7.addToken=W(f7.addToken,f4)
}f7.map=[];
var gb=f9!=f5.display.externalMeasured&&bM(f6);
bn(f6,f7,c2(f5,f6,gb));
if(f6.styleClasses){if(f6.styleClasses.bgClass){f7.bgClass=fJ(f6.styleClasses.bgClass,f7.bgClass||"")
}if(f6.styleClasses.textClass){f7.textClass=fJ(f6.styleClasses.textClass,f7.textClass||"")
}}if(f7.map.length==0){f7.map.push(0,0,f7.content.appendChild(bm(f5.display.measure)))
}if(f8==0){f9.measure.map=f7.map;
f9.measure.cache={}
}else{(f9.measure.maps||(f9.measure.maps=[])).push(f7.map);
(f9.measure.caches||(f9.measure.caches=[])).push({})
}}if(cW&&/\bcm-tab\b/.test(f7.content.lastChild.className)){f7.content.className="cm-tab-wrap-hack"
}aC(f5,"renderLine",f5,f9.line,f7.pre);
if(f7.pre.className){f7.textClass=fJ(f7.pre.className,f7.textClass||"")
}return f7
}function e3(f5){var f4=fO("span","\u2022","cm-invalidchar");
f4.title="\\u"+f5.charCodeAt(0).toString(16);
return f4
}function v(f9,gj,f4,f7,gk,gi){if(!gj){return
}var ge=f9.cm.options.specialChars,gd=false;
if(!ge.test(gj)){f9.col+=gj.length;
var gc=document.createTextNode(gj);
f9.map.push(f9.pos,f9.pos+gj.length,gc);
if(dB&&m<9){gd=true
}f9.pos+=gj.length
}else{var gc=document.createDocumentFragment(),gg=0;
while(true){ge.lastIndex=gg;
var f5=ge.exec(gj);
var gb=f5?f5.index-gg:gj.length-gg;
if(gb){var f8=document.createTextNode(gj.slice(gg,gg+gb));
if(dB&&m<9){gc.appendChild(fO("span",[f8]))
}else{gc.appendChild(f8)
}f9.map.push(f9.pos,f9.pos+gb,f8);
f9.col+=gb;
f9.pos+=gb
}if(!f5){break
}gg+=gb+1;
if(f5[0]=="\t"){var ga=f9.cm.options.tabSize,gf=ga-f9.col%ga;
var f8=gc.appendChild(fO("span",cp(gf),"cm-tab"));
f9.col+=gf
}else{var f8=f9.cm.options.specialCharPlaceholder(f5[0]);
if(dB&&m<9){gc.appendChild(fO("span",[f8]))
}else{gc.appendChild(f8)
}f9.col+=1
}f9.map.push(f9.pos,f9.pos+1,f8);
f9.pos++
}}if(f4||f7||gk||gd){var gh=f4||"";
if(f7){gh+=f7
}if(gk){gh+=gk
}var f6=fO("span",[gc],gh);
if(gi){f6.title=gi
}return f9.content.appendChild(f6)
}f9.content.appendChild(gc)
}function fx(f4){function f5(f6){var f7=" ";
for(var f8=0;
f8<f6.length-2;
++f8){f7+=f8%2?" ":"\u00a0"
}f7+=" ";
return f7
}return function(f7,gb,f8,f6,ga,f9){f4(f7,gb.replace(/ {3,}/g,f5),f8,f6,ga,f9)
}
}function W(f5,f4){return function(gc,ge,f6,ga,gf,gd){f6=f6?f6+" cm-force-border":"cm-force-border";
var f7=gc.pos,f9=f7+ge.length;
for(;
;
){for(var gb=0;
gb<f4.length;
gb++){var f8=f4[gb];
if(f8.to>f7&&f8.from<=f7){break
}}if(f8.to>=f9){return f5(gc,ge,f6,ga,gf,gd)
}f5(gc,ge.slice(0,f8.to-f7),f6,ga,null,gd);
ga=null;
ge=ge.slice(f8.to-f7);
f7=f8.to
}}
}function ac(f5,f7,f4,f6){var f8=!f6&&f4.widgetNode;
if(f8){f5.map.push(f5.pos,f5.pos+f7,f8);
f5.content.appendChild(f8)
}f5.pos+=f7
}function bn(gd,gj,gc){var f9=gd.markedSpans,gb=gd.text,gh=0;
if(!f9){for(var gm=1;
gm<gc.length;
gm+=2){gj.addToken(gj,gb.slice(gh,gh=gc[gm]),eO(gc[gm+1],gj.cm.options))
}return
}var gn=gb.length,f8=0,gm=1,gf="",go;
var gq=0,f4,gp,gg,gr,f6;
for(;
;
){if(gq==f8){f4=gp=gg=gr="";
f6=null;
gq=Infinity;
var ga=[];
for(var gk=0;
gk<f9.length;
++gk){var gl=f9[gk],gi=gl.marker;
if(gl.from<=f8&&(gl.to==null||gl.to>f8)){if(gl.to!=null&&gq>gl.to){gq=gl.to;
gp=""
}if(gi.className){f4+=" "+gi.className
}if(gi.startStyle&&gl.from==f8){gg+=" "+gi.startStyle
}if(gi.endStyle&&gl.to==gq){gp+=" "+gi.endStyle
}if(gi.title&&!gr){gr=gi.title
}if(gi.collapsed&&(!f6||dH(f6.marker,gi)<0)){f6=gl
}}else{if(gl.from>f8&&gq>gl.from){gq=gl.from
}}if(gi.type=="bookmark"&&gl.from==f8&&gi.widgetNode){ga.push(gi)
}}if(f6&&(f6.from||0)==f8){ac(gj,(f6.to==null?gn+1:f6.to)-f8,f6.marker,f6.from==null);
if(f6.to==null){return
}}if(!f6&&ga.length){for(var gk=0;
gk<ga.length;
++gk){ac(gj,0,ga[gk])
}}}if(f8>=gn){break
}var ge=Math.min(gn,gq);
while(true){if(gf){var f5=f8+gf.length;
if(!f6){var f7=f5>ge?gf.slice(0,ge-f8):gf;
gj.addToken(gj,f7,go?go+f4:f4,gg,f8+f7.length==gq?gp:"",gr)
}if(f5>=ge){gf=gf.slice(ge-f8);
f8=ge;
break
}f8=f5;
gg=""
}gf=gb.slice(gh,gh=gc[gm++]);
go=eO(gc[gm++],gj.cm.options)
}}}function dJ(f4,f5){return f5.from.ch==0&&f5.to.ch==0&&fz(f5.text)==""&&(!f4.cm||f4.cm.options.wholeLineUpdateBefore)
}function fq(gh,gc,f4,f8){function gi(gk){return f4?f4[gk]:null
}function f5(gk,gm,gl){ee(gk,gm,gl,f8);
ae(gk,"change",gk,gc)
}var gf=gc.from,gg=gc.to,gj=gc.text;
var gd=e6(gh,gf.line),ge=e6(gh,gg.line);
var gb=fz(gj),f7=gi(gj.length-1),ga=gg.line-gf.line;
if(dJ(gh,gc)){for(var f6=0,f9=[];
f6<gj.length-1;
++f6){f9.push(new fU(gj[f6],gi(f6),f8))
}f5(ge,ge.text,f7);
if(ga){gh.remove(gf.line,ga)
}if(f9.length){gh.insert(gf.line,f9)
}}else{if(gd==ge){if(gj.length==1){f5(gd,gd.text.slice(0,gf.ch)+gb+gd.text.slice(gg.ch),f7)
}else{for(var f9=[],f6=1;
f6<gj.length-1;
++f6){f9.push(new fU(gj[f6],gi(f6),f8))
}f9.push(new fU(gb+gd.text.slice(gg.ch),f7,f8));
f5(gd,gd.text.slice(0,gf.ch)+gj[0],gi(0));
gh.insert(gf.line+1,f9)
}}else{if(gj.length==1){f5(gd,gd.text.slice(0,gf.ch)+gj[0]+ge.text.slice(gg.ch),gi(0));
gh.remove(gf.line+1,ga)
}else{f5(gd,gd.text.slice(0,gf.ch)+gj[0],gi(0));
f5(ge,gb+ge.text.slice(gg.ch),f7);
for(var f6=1,f9=[];
f6<gj.length-1;
++f6){f9.push(new fU(gj[f6],gi(f6),f8))
}if(ga>1){gh.remove(gf.line+1,ga-1)
}gh.insert(gf.line+1,f9)
}}}ae(gh,"change",gh,gc)
}function eR(f5){this.lines=f5;
this.parent=null;
for(var f6=0,f4=0;
f6<f5.length;
++f6){f5[f6].parent=this;
f4+=f5[f6].height
}this.height=f4
}eR.prototype={chunkSize:function(){return this.lines.length
},removeInner:function(f4,f8){for(var f6=f4,f7=f4+f8;
f6<f7;
++f6){var f5=this.lines[f6];
this.height-=f5.height;
bA(f5);
ae(f5,"delete")
}this.lines.splice(f4,f8)
},collapse:function(f4){f4.push.apply(f4,this.lines)
},insertInner:function(f5,f6,f4){this.height+=f4;
this.lines=this.lines.slice(0,f5).concat(f6).concat(this.lines.slice(f5));
for(var f7=0;
f7<f6.length;
++f7){f6[f7].parent=this
}},iterN:function(f4,f7,f6){for(var f5=f4+f7;
f4<f5;
++f4){if(f6(this.lines[f4])){return true
}}}};
function fp(f7){this.children=f7;
var f6=0,f4=0;
for(var f5=0;
f5<f7.length;
++f5){var f8=f7[f5];
f6+=f8.chunkSize();
f4+=f8.height;
f8.parent=this
}this.size=f6;
this.height=f4;
this.parent=null
}fp.prototype={chunkSize:function(){return this.size
},removeInner:function(f4,gb){this.size-=gb;
for(var f6=0;
f6<this.children.length;
++f6){var ga=this.children[f6],f8=ga.chunkSize();
if(f4<f8){var f7=Math.min(gb,f8-f4),f9=ga.height;
ga.removeInner(f4,f7);
this.height-=f9-ga.height;
if(f8==f7){this.children.splice(f6--,1);
ga.parent=null
}if((gb-=f7)==0){break
}f4=0
}else{f4-=f8
}}if(this.size-gb<25&&(this.children.length>1||!(this.children[0] instanceof eR))){var f5=[];
this.collapse(f5);
this.children=[new eR(f5)];
this.children[0].parent=this
}},collapse:function(f4){for(var f5=0;
f5<this.children.length;
++f5){this.children[f5].collapse(f4)
}},insertInner:function(f5,f6,f4){this.size+=f6.length;
this.height+=f4;
for(var f9=0;
f9<this.children.length;
++f9){var gb=this.children[f9],ga=gb.chunkSize();
if(f5<=ga){gb.insertInner(f5,f6,f4);
if(gb.lines&&gb.lines.length>50){while(gb.lines.length>50){var f8=gb.lines.splice(gb.lines.length-25,25);
var f7=new eR(f8);
gb.height-=f7.height;
this.children.splice(f9+1,0,f7);
f7.parent=this
}this.maybeSpill()
}break
}f5-=ga
}},maybeSpill:function(){if(this.children.length<=10){return
}var f7=this;
do{var f5=f7.children.splice(f7.children.length-5,5);
var f6=new fp(f5);
if(!f7.parent){var f8=new fp(f7.children);
f8.parent=f7;
f7.children=[f8,f6];
f7=f8
}else{f7.size-=f6.size;
f7.height-=f6.height;
var f4=dd(f7.parent.children,f7);
f7.parent.children.splice(f4+1,0,f6)
}f6.parent=f7.parent
}while(f7.children.length>10);
f7.parent.maybeSpill()
},iterN:function(f4,ga,f9){for(var f5=0;
f5<this.children.length;
++f5){var f8=this.children[f5],f7=f8.chunkSize();
if(f4<f7){var f6=Math.min(ga,f7-f4);
if(f8.iterN(f4,f6,f9)){return true
}if((ga-=f6)==0){break
}f4=0
}else{f4-=f7
}}}};
var cr=0;
var at=K.Doc=function(f6,f5,f4){if(!(this instanceof at)){return new at(f6,f5,f4)
}if(f4==null){f4=0
}fp.call(this,[new eR([new fU("",null)])]);
this.first=f4;
this.scrollTop=this.scrollLeft=0;
this.cantEdit=false;
this.cleanGeneration=1;
this.frontier=f4;
var f7=Y(f4,0);
this.sel=eK(f7);
this.history=new fK(null);
this.id=++cr;
this.modeOption=f5;
if(typeof f6=="string"){f6=aW(f6)
}fq(this,{from:f7,to:f7,text:f6});
bT(this,eK(f7),aa)
};
at.prototype=ck(fp.prototype,{constructor:at,iter:function(f6,f5,f4){if(f4){this.iterN(f6-this.first,f5-f6,f4)
}else{this.iterN(this.first,this.first+this.size,f6)
}},insert:function(f5,f6){var f4=0;
for(var f7=0;
f7<f6.length;
++f7){f4+=f6[f7].height
}this.insertInner(f5-this.first,f6,f4)
},remove:function(f4,f5){this.removeInner(f4-this.first,f5)
},getValue:function(f5){var f4=aY(this,this.first,this.first+this.size);
if(f5===false){return f4
}return f4.join(f5||"\n")
},setValue:cC(function(f5){var f6=Y(this.first,0),f4=this.first+this.size-1;
bc(this,{from:f6,to:Y(f4,e6(this,f4).text.length),text:aW(f5),origin:"setValue"},true);
bT(this,eK(f6))
}),replaceRange:function(f5,f7,f6,f4){f7=fB(this,f7);
f6=f6?fB(this,f6):f7;
aX(this,f5,f7,f6,f4)
},getRange:function(f7,f6,f5){var f4=fQ(this,fB(this,f7),fB(this,f6));
if(f5===false){return f4
}return f4.join(f5||"\n")
},getLine:function(f5){var f4=this.getLineHandle(f5);
return f4&&f4.text
},getLineHandle:function(f4){if(b8(this,f4)){return e6(this,f4)
}},getLineNumber:function(f4){return bM(f4)
},getLineHandleVisualStart:function(f4){if(typeof f4=="number"){f4=e6(this,f4)
}return A(f4)
},lineCount:function(){return this.size
},firstLine:function(){return this.first
},lastLine:function(){return this.first+this.size-1
},clipPos:function(f4){return fB(this,f4)
},getCursor:function(f6){var f4=this.sel.primary(),f5;
if(f6==null||f6=="head"){f5=f4.head
}else{if(f6=="anchor"){f5=f4.anchor
}else{if(f6=="end"||f6=="to"||f6===false){f5=f4.to()
}else{f5=f4.from()
}}}return f5
},listSelections:function(){return this.sel.ranges
},somethingSelected:function(){return this.sel.somethingSelected()
},setCursor:cC(function(f4,f6,f5){I(this,fB(this,typeof f4=="number"?Y(f4,f6||0):f4),null,f5)
}),setSelection:cC(function(f5,f6,f4){I(this,fB(this,f5),fB(this,f6||f5),f4)
}),extendSelection:cC(function(f6,f4,f5){fL(this,fB(this,f6),f4&&fB(this,f4),f5)
}),extendSelections:cC(function(f5,f4){aw(this,dQ(this,f5,f4))
}),extendSelectionsBy:cC(function(f5,f4){aw(this,bR(this.sel.ranges,f5),f4)
}),setSelections:cC(function(f4,f8,f6){if(!f4.length){return
}for(var f7=0,f5=[];
f7<f4.length;
f7++){f5[f7]=new dP(fB(this,f4[f7].anchor),fB(this,f4[f7].head))
}if(f8==null){f8=Math.min(f4.length-1,this.sel.primIndex)
}bT(this,cw(f5,f8),f6)
}),addSelection:cC(function(f6,f7,f5){var f4=this.sel.ranges.slice(0);
f4.push(new dP(fB(this,f6),fB(this,f7||f6)));
bT(this,cw(f4,f4.length-1),f5)
}),getSelection:function(f8){var f5=this.sel.ranges,f4;
for(var f6=0;
f6<f5.length;
f6++){var f7=fQ(this,f5[f6].from(),f5[f6].to());
f4=f4?f4.concat(f7):f7
}if(f8===false){return f4
}else{return f4.join(f8||"\n")
}},getSelections:function(f8){var f7=[],f4=this.sel.ranges;
for(var f5=0;
f5<f4.length;
f5++){var f6=fQ(this,f4[f5].from(),f4[f5].to());
if(f8!==false){f6=f6.join(f8||"\n")
}f7[f5]=f6
}return f7
},replaceSelection:function(f6,f8,f4){var f7=[];
for(var f5=0;
f5<this.sel.ranges.length;
f5++){f7[f5]=f6
}this.replaceSelections(f7,f8,f4||"+input")
},replaceSelections:cC(function(f9,gb,f6){var f8=[],ga=this.sel;
for(var f7=0;
f7<ga.ranges.length;
f7++){var f5=ga.ranges[f7];
f8[f7]={from:f5.from(),to:f5.to(),text:aW(f9[f7]),origin:f6}
}var f4=gb&&gb!="end"&&af(this,f8,gb);
for(var f7=f8.length-1;
f7>=0;
f7--){bc(this,f8[f7])
}if(f4){eY(this,f4)
}else{if(this.cm){fy(this.cm)
}}}),undo:cC(function(){b7(this,"undo")
}),redo:cC(function(){b7(this,"redo")
}),undoSelection:cC(function(){b7(this,"undo",true)
}),redoSelection:cC(function(){b7(this,"redo",true)
}),setExtending:function(f4){this.extend=f4
},getExtending:function(){return this.extend
},historySize:function(){var f7=this.history,f4=0,f6=0;
for(var f5=0;
f5<f7.done.length;
f5++){if(!f7.done[f5].ranges){++f4
}}for(var f5=0;
f5<f7.undone.length;
f5++){if(!f7.undone[f5].ranges){++f6
}}return{undo:f4,redo:f6}
},clearHistory:function(){this.history=new fK(this.history.maxGeneration)
},markClean:function(){this.cleanGeneration=this.changeGeneration(true)
},changeGeneration:function(f4){if(f4){this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null
}return this.history.generation
},isClean:function(f4){return this.history.generation==(f4||this.cleanGeneration)
},getHistory:function(){return{done:bO(this.history.done),undone:bO(this.history.undone)}
},setHistory:function(f5){var f4=this.history=new fK(this.history.maxGeneration);
f4.done=bO(f5.done.slice(0),null,true);
f4.undone=bO(f5.undone.slice(0),null,true)
},addLineClass:cC(function(f6,f5,f4){return eq(this,f6,f5=="gutter"?"gutter":"class",function(f7){var f8=f5=="text"?"textClass":f5=="background"?"bgClass":f5=="gutter"?"gutterClass":"wrapClass";
if(!f7[f8]){f7[f8]=f4
}else{if(U(f4).test(f7[f8])){return false
}else{f7[f8]+=" "+f4
}}return true
})
}),removeLineClass:cC(function(f6,f5,f4){return eq(this,f6,"class",function(f8){var gb=f5=="text"?"textClass":f5=="background"?"bgClass":f5=="gutter"?"gutterClass":"wrapClass";
var ga=f8[gb];
if(!ga){return false
}else{if(f4==null){f8[gb]=null
}else{var f9=ga.match(U(f4));
if(!f9){return false
}var f7=f9.index+f9[0].length;
f8[gb]=ga.slice(0,f9.index)+(!f9.index||f7==ga.length?"":" ")+ga.slice(f7)||null
}}return true
})
}),markText:function(f6,f5,f4){return ex(this,fB(this,f6),fB(this,f5),f4,"range")
},setBookmark:function(f6,f4){var f5={replacedWith:f4&&(f4.nodeType==null?f4.widget:f4),insertLeft:f4&&f4.insertLeft,clearWhenEmpty:false,shared:f4&&f4.shared};
f6=fB(this,f6);
return ex(this,f6,f6,f5,"bookmark")
},findMarksAt:function(f8){f8=fB(this,f8);
var f7=[],f5=e6(this,f8.line).markedSpans;
if(f5){for(var f4=0;
f4<f5.length;
++f4){var f6=f5[f4];
if((f6.from==null||f6.from<=f8.ch)&&(f6.to==null||f6.to>=f8.ch)){f7.push(f6.marker.parent||f6.marker)
}}}return f7
},findMarks:function(f8,f7,f4){f8=fB(this,f8);
f7=fB(this,f7);
var f5=[],f6=f8.line;
this.iter(f8.line,f7.line+1,function(f9){var gb=f9.markedSpans;
if(gb){for(var ga=0;
ga<gb.length;
ga++){var gc=gb[ga];
if(!(f6==f8.line&&f8.ch>gc.to||gc.from==null&&f6!=f8.line||f6==f7.line&&gc.from>f7.ch)&&(!f4||f4(gc.marker))){f5.push(gc.marker.parent||gc.marker)
}}}++f6
});
return f5
},getAllMarks:function(){var f4=[];
this.iter(function(f6){var f5=f6.markedSpans;
if(f5){for(var f7=0;
f7<f5.length;
++f7){if(f5[f7].from!=null){f4.push(f5[f7].marker)
}}}});
return f4
},posFromIndex:function(f5){var f4,f6=this.first;
this.iter(function(f7){var f8=f7.text.length+1;
if(f8>f5){f4=f5;
return true
}f5-=f8;
++f6
});
return fB(this,Y(f6,f4))
},indexFromPos:function(f5){f5=fB(this,f5);
var f4=f5.ch;
if(f5.line<this.first||f5.ch<0){return 0
}this.iter(this.first,f5.line,function(f6){f4+=f6.text.length+1
});
return f4
},copy:function(f4){var f5=new at(aY(this,this.first,this.first+this.size),this.modeOption,this.first);
f5.scrollTop=this.scrollTop;
f5.scrollLeft=this.scrollLeft;
f5.sel=this.sel;
f5.extend=false;
if(f4){f5.history.undoDepth=this.history.undoDepth;
f5.setHistory(this.getHistory())
}return f5
},linkedDoc:function(f4){if(!f4){f4={}
}var f7=this.first,f6=this.first+this.size;
if(f4.from!=null&&f4.from>f7){f7=f4.from
}if(f4.to!=null&&f4.to<f6){f6=f4.to
}var f5=new at(aY(this,f7,f6),f4.mode||this.modeOption,f7);
if(f4.sharedHist){f5.history=this.history
}(this.linked||(this.linked=[])).push({doc:f5,sharedHist:f4.sharedHist});
f5.linked=[{doc:this,isParent:true,sharedHist:f4.sharedHist}];
dx(f5,eH(this));
return f5
},unlinkDoc:function(f5){if(f5 instanceof K){f5=f5.doc
}if(this.linked){for(var f6=0;
f6<this.linked.length;
++f6){var f7=this.linked[f6];
if(f7.doc!=f5){continue
}this.linked.splice(f6,1);
f5.unlinkDoc(this);
ef(eH(this));
break
}}if(f5.history==this.history){var f4=[f5.id];
dY(f5,function(f8){f4.push(f8.id)
},true);
f5.history=new fK(null);
f5.history.done=bO(this.history.done,f4);
f5.history.undone=bO(this.history.undone,f4)
}},iterLinkedDocs:function(f4){dY(this,f4)
},getMode:function(){return this.mode
},getEditor:function(){return this.cm
}});
at.prototype.eachLine=at.prototype.iter;
var d="iter insert remove copy getEditor".split(" ");
for(var bJ in at.prototype){if(at.prototype.hasOwnProperty(bJ)&&dd(d,bJ)<0){K.prototype[bJ]=(function(f4){return function(){return f4.apply(this.doc,arguments)
}
})(at.prototype[bJ])
}}bx(at);
function dY(f7,f6,f5){function f4(gd,gb,f9){if(gd.linked){for(var ga=0;
ga<gd.linked.length;
++ga){var f8=gd.linked[ga];
if(f8.doc==gb){continue
}var gc=f9&&f8.sharedHist;
if(f5&&!gc){continue
}f6(f8.doc,gc);
f4(f8.doc,gd,gc)
}}}f4(f7,null,true)
}function d2(f4,f5){if(f5.cm){throw new Error("This document is already in use.")
}f4.doc=f5;
f5.cm=f4;
Z(f4);
bq(f4);
if(!f4.options.lineWrapping){g(f4)
}f4.options.mode=f5.modeOption;
ah(f4)
}function e6(f7,f9){f9-=f7.first;
if(f9<0||f9>=f7.size){throw new Error("There is no line "+(f9+f7.first)+" in the document.")
}for(var f4=f7;
!f4.lines;
){for(var f5=0;
;
++f5){var f8=f4.children[f5],f6=f8.chunkSize();
if(f9<f6){f4=f8;
break
}f9-=f6
}}return f4.lines[f9]
}function fQ(f6,f8,f4){var f5=[],f7=f8.line;
f6.iter(f8.line,f4.line+1,function(f9){var ga=f9.text;
if(f7==f4.line){ga=ga.slice(0,f4.ch)
}if(f7==f8.line){ga=ga.slice(f8.ch)
}f5.push(ga);
++f7
});
return f5
}function aY(f5,f7,f6){var f4=[];
f5.iter(f7,f6,function(f8){f4.push(f8.text)
});
return f4
}function fS(f5,f4){var f6=f4-f5.height;
if(f6){for(var f7=f5;
f7;
f7=f7.parent){f7.height+=f6
}}}function bM(f4){if(f4.parent==null){return null
}var f8=f4.parent,f7=dd(f8.lines,f4);
for(var f5=f8.parent;
f5;
f8=f5,f5=f5.parent){for(var f6=0;
;
++f6){if(f5.children[f6]==f8){break
}f7+=f5.children[f6].chunkSize()
}}return f7+f8.first
}function bF(f6,f9){var gb=f6.first;
outer:do{for(var f7=0;
f7<f6.children.length;
++f7){var ga=f6.children[f7],f8=ga.height;
if(f9<f8){f6=ga;
continue outer
}f9-=f8;
gb+=ga.chunkSize()
}return gb
}while(!f6.lines);
for(var f7=0;
f7<f6.lines.length;
++f7){var f5=f6.lines[f7],f4=f5.height;
if(f9<f4){break
}f9-=f4
}return gb+f7
}function bL(f6){f6=A(f6);
var f8=0,f5=f6.parent;
for(var f7=0;
f7<f5.lines.length;
++f7){var f4=f5.lines[f7];
if(f4==f6){break
}else{f8+=f4.height
}}for(var f9=f5.parent;
f9;
f5=f9,f9=f5.parent){for(var f7=0;
f7<f9.children.length;
++f7){var ga=f9.children[f7];
if(ga==f5){break
}else{f8+=ga.height
}}}return f8
}function a(f5){var f4=f5.order;
if(f4==null){f4=f5.order=bd(f5.text)
}return f4
}function fK(f4){this.done=[];
this.undone=[];
this.undoDepth=Infinity;
this.lastModTime=this.lastSelTime=0;
this.lastOp=this.lastSelOp=null;
this.lastOrigin=this.lastSelOrigin=null;
this.generation=this.maxGeneration=f4||1
}function dm(f4,f6){var f5={from:ci(f6.from),to:cT(f6),text:fQ(f4,f6.from,f6.to)};
bX(f4,f5,f6.from.line,f6.to.line+1);
dY(f4,function(f7){bX(f7,f5,f6.from.line,f6.to.line+1)
},true);
return f5
}function ft(f5){while(f5.length){var f4=fz(f5);
if(f4.ranges){f5.pop()
}else{break
}}}function eE(f5,f4){if(f4){ft(f5.done);
return fz(f5.done)
}else{if(f5.done.length&&!fz(f5.done).ranges){return fz(f5.done)
}else{if(f5.done.length>1&&!f5.done[f5.done.length-2].ranges){f5.done.pop();
return fz(f5.done)
}}}}function fE(ga,f8,f4,f7){var f6=ga.history;
f6.undone.length=0;
var f5=+new Date,gb;
if((f6.lastOp==f7||f6.lastOrigin==f8.origin&&f8.origin&&((f8.origin.charAt(0)=="+"&&ga.cm&&f6.lastModTime>f5-ga.cm.options.historyEventDelay)||f8.origin.charAt(0)=="*"))&&(gb=eE(f6,f6.lastOp==f7))){var gc=fz(gb.changes);
if(ce(f8.from,f8.to)==0&&ce(f8.from,gc.to)==0){gc.to=cT(f8)
}else{gb.changes.push(dm(ga,f8))
}}else{var f9=fz(f6.done);
if(!f9||!f9.ranges){cL(ga.sel,f6.done)
}gb={changes:[dm(ga,f8)],generation:f6.generation};
f6.done.push(gb);
while(f6.done.length>f6.undoDepth){f6.done.shift();
if(!f6.done[0].ranges){f6.done.shift()
}}}f6.done.push(f4);
f6.generation=++f6.maxGeneration;
f6.lastModTime=f6.lastSelTime=f5;
f6.lastOp=f6.lastSelOp=f7;
f6.lastOrigin=f6.lastSelOrigin=f8.origin;
if(!gc){aC(ga,"historyAdded")
}}function bz(f8,f4,f6,f7){var f5=f4.charAt(0);
return f5=="*"||f5=="+"&&f6.ranges.length==f7.ranges.length&&f6.somethingSelected()==f7.somethingSelected()&&new Date-f8.history.lastSelTime<=(f8.cm?f8.cm.options.historyEventDelay:500)
}function fY(f9,f7,f4,f6){var f8=f9.history,f5=f6&&f6.origin;
if(f4==f8.lastSelOp||(f5&&f8.lastSelOrigin==f5&&(f8.lastModTime==f8.lastSelTime&&f8.lastOrigin==f5||bz(f9,f5,fz(f8.done),f7)))){f8.done[f8.done.length-1]=f7
}else{cL(f7,f8.done)
}f8.lastSelTime=+new Date;
f8.lastSelOrigin=f5;
f8.lastSelOp=f4;
if(f6&&f6.clearRedo!==false){ft(f8.undone)
}}function cL(f5,f4){var f6=fz(f4);
if(!(f6&&f6.ranges&&f6.equals(f5))){f4.push(f5)
}}function bX(f5,f9,f8,f7){var f4=f9["spans_"+f5.id],f6=0;
f5.iter(Math.max(f5.first,f8),Math.min(f5.first+f5.size,f7),function(ga){if(ga.markedSpans){(f4||(f4=f9["spans_"+f5.id]={}))[f6]=ga.markedSpans
}++f6
})
}function bi(f6){if(!f6){return null
}for(var f5=0,f4;
f5<f6.length;
++f5){if(f6[f5].marker.explicitlyCleared){if(!f4){f4=f6.slice(0,f5)
}}else{if(f4){f4.push(f6[f5])
}}}return !f4?f6:f4.length?f4:null
}function b3(f7,f8){var f6=f8["spans_"+f7.id];
if(!f6){return null
}for(var f5=0,f4=[];
f5<f8.text.length;
++f5){f4.push(bi(f6[f5]))
}return f4
}function bO(gf,f7,ge){for(var ga=0,f5=[];
ga<gf.length;
++ga){var f6=gf[ga];
if(f6.ranges){f5.push(ge?fP.prototype.deepCopy.call(f6):f6);
continue
}var gc=f6.changes,gd=[];
f5.push({changes:gd});
for(var f9=0;
f9<gc.length;
++f9){var gb=gc[f9],f8;
gd.push({from:gb.from,to:gb.to,text:gb.text});
if(f7){for(var f4 in gb){if(f8=f4.match(/^spans_(\d+)$/)){if(dd(f7,Number(f8[1]))>-1){fz(gd)[f4]=gb[f4];
delete gb[f4]
}}}}}}return f5
}function L(f7,f6,f5,f4){if(f5<f7.line){f7.line+=f4
}else{if(f6<f7.line){f7.line=f6;
f7.ch=0
}}}function e8(f7,f9,ga,gb){for(var f6=0;
f6<f7.length;
++f6){var f4=f7[f6],f8=true;
if(f4.ranges){if(!f4.copied){f4=f7[f6]=f4.deepCopy();
f4.copied=true
}for(var f5=0;
f5<f4.ranges.length;
f5++){L(f4.ranges[f5].anchor,f9,ga,gb);
L(f4.ranges[f5].head,f9,ga,gb)
}continue
}for(var f5=0;
f5<f4.changes.length;
++f5){var gc=f4.changes[f5];
if(ga<gc.from.line){gc.from=Y(gc.from.line+gb,gc.from.ch);
gc.to=Y(gc.to.line+gb,gc.to.ch)
}else{if(f9<=gc.to.line){f8=false;
break
}}}if(!f8){f7.splice(0,f6+1);
f6=0
}}}function dw(f5,f8){var f7=f8.from.line,f6=f8.to.line,f4=f8.text.length-(f6-f7)-1;
e8(f5.done,f7,f6,f4);
e8(f5.undone,f7,f6,f4)
}var cE=K.e_preventDefault=function(f4){if(f4.preventDefault){f4.preventDefault()
}else{f4.returnValue=false
}};
var di=K.e_stopPropagation=function(f4){if(f4.stopPropagation){f4.stopPropagation()
}else{f4.cancelBubble=true
}};
function bK(f4){return f4.defaultPrevented!=null?f4.defaultPrevented:f4.returnValue==false
}var ei=K.e_stop=function(f4){cE(f4);
di(f4)
};
function N(f4){return f4.target||f4.srcElement
}function fF(f5){var f4=f5.which;
if(f4==null){if(f5.button&1){f4=1
}else{if(f5.button&2){f4=3
}else{if(f5.button&4){f4=2
}}}}if(b6&&f5.ctrlKey&&f4==1){f4=3
}return f4
}var bW=K.on=function(f7,f5,f6){if(f7.addEventListener){f7.addEventListener(f5,f6,false)
}else{if(f7.attachEvent){f7.attachEvent("on"+f5,f6)
}else{var f8=f7._handlers||(f7._handlers={});
var f4=f8[f5]||(f8[f5]=[]);
f4.push(f6)
}}};
var d4=K.off=function(f8,f6,f7){if(f8.removeEventListener){f8.removeEventListener(f6,f7,false)
}else{if(f8.detachEvent){f8.detachEvent("on"+f6,f7)
}else{var f4=f8._handlers&&f8._handlers[f6];
if(!f4){return
}for(var f5=0;
f5<f4.length;
++f5){if(f4[f5]==f7){f4.splice(f5,1);
break
}}}}};
var aC=K.signal=function(f8,f7){var f4=f8._handlers&&f8._handlers[f7];
if(!f4){return
}var f5=Array.prototype.slice.call(arguments,2);
for(var f6=0;
f6<f4.length;
++f6){f4[f6].apply(null,f5)
}};
var by=null;
function ae(ga,f8){var f4=ga._handlers&&ga._handlers[f8];
if(!f4){return
}var f6=Array.prototype.slice.call(arguments,2),f9;
if(bo){f9=bo.delayedCallbacks
}else{if(by){f9=by
}else{f9=by=[];
setTimeout(aJ,0)
}}function f5(gb){return function(){gb.apply(null,f6)
}
}for(var f7=0;
f7<f4.length;
++f7){f9.push(f5(f4[f7]))
}}function aJ(){var f4=by;
by=null;
for(var f5=0;
f5<f4.length;
++f5){f4[f5]()
}}function aO(f4,f6,f5){if(typeof f6=="string"){f6={type:f6,preventDefault:function(){this.defaultPrevented=true
}}
}aC(f4,f5||f6.type,f4,f6);
return bK(f6)||f6.codemirrorIgnore
}function X(f5){var f4=f5._handlers&&f5._handlers.cursorActivity;
if(!f4){return
}var f7=f5.curOp.cursorActivityHandlers||(f5.curOp.cursorActivityHandlers=[]);
for(var f6=0;
f6<f4.length;
++f6){if(dd(f7,f4[f6])==-1){f7.push(f4[f6])
}}}function e9(f6,f5){var f4=f6._handlers&&f6._handlers[f5];
return f4&&f4.length>0
}function bx(f4){f4.prototype.on=function(f5,f6){bW(this,f5,f6)
};
f4.prototype.off=function(f5,f6){d4(this,f5,f6)
}
}var bh=30;
var b9=K.Pass={toString:function(){return"CodeMirror.Pass"
}};
var aa={scroll:false},O={origin:"*mouse"},cS={origin:"+move"};
function f3(){this.id=null
}f3.prototype.set=function(f4,f5){clearTimeout(this.id);
this.id=setTimeout(f5,f4)
};
var bS=K.countColumn=function(f7,f5,f9,ga,f6){if(f5==null){f5=f7.search(/[^\s\u00a0]/);
if(f5==-1){f5=f7.length
}}for(var f8=ga||0,gb=f6||0;
;
){var f4=f7.indexOf("\t",f8);
if(f4<0||f4>=f5){return gb+(f5-f8)
}gb+=f4-f8;
gb+=f9-(gb%f9);
f8=f4+1
}};
function eh(f8,f7,f9){for(var ga=0,f6=0;
;
){var f5=f8.indexOf("\t",ga);
if(f5==-1){f5=f8.length
}var f4=f5-ga;
if(f5==f8.length||f6+f4>=f7){return ga+Math.min(f4,f7-f6)
}f6+=f5-ga;
f6+=f9-(f6%f9);
ga=f5+1;
if(f6>=f7){return ga
}}}var aV=[""];
function cp(f4){while(aV.length<=f4){aV.push(fz(aV)+" ")
}return aV[f4]
}function fz(f4){return f4[f4.length-1]
}var dC=function(f4){f4.select()
};
if(eT){dC=function(f4){f4.selectionStart=0;
f4.selectionEnd=f4.value.length
}
}else{if(dB){dC=function(f5){try{f5.select()
}catch(f4){}}
}}function dd(f6,f4){for(var f5=0;
f5<f6.length;
++f5){if(f6[f5]==f4){return f5
}}return -1
}if([].indexOf){dd=function(f5,f4){return f5.indexOf(f4)
}
}function bR(f7,f6){var f4=[];
for(var f5=0;
f5<f7.length;
f5++){f4[f5]=f6(f7[f5],f5)
}return f4
}if([].map){bR=function(f5,f4){return f5.map(f4)
}
}function ck(f7,f4){var f6;
if(Object.create){f6=Object.create(f7)
}else{var f5=function(){};
f5.prototype=f7;
f6=new f5()
}if(f4){aK(f4,f6)
}return f6
}function aK(f6,f5,f4){if(!f5){f5={}
}for(var f7 in f6){if(f6.hasOwnProperty(f7)&&(f4!==false||!f5.hasOwnProperty(f7))){f5[f7]=f6[f7]
}}return f5
}function cv(f5){var f4=Array.prototype.slice.call(arguments,1);
return function(){return f5.apply(null,f4)
}
}var a8=/[\u00df\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
var fv=K.isWordChar=function(f4){return/\w/.test(f4)||f4>"\x80"&&(f4.toUpperCase()!=f4.toLowerCase()||a8.test(f4))
};
function cz(f4,f5){if(!f5){return fv(f4)
}if(f5.source.indexOf("\\w")>-1&&fv(f4)){return true
}return f5.test(f4)
}function eM(f4){for(var f5 in f4){if(f4.hasOwnProperty(f5)&&f4[f5]){return false
}}return true
}var eB=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
function fh(f4){return f4.charCodeAt(0)>=768&&eB.test(f4)
}function fO(f4,f8,f7,f6){var f9=document.createElement(f4);
if(f7){f9.className=f7
}if(f6){f9.style.cssText=f6
}if(typeof f8=="string"){f9.appendChild(document.createTextNode(f8))
}else{if(f8){for(var f5=0;
f5<f8.length;
++f5){f9.appendChild(f8[f5])
}}}return f9
}var cl;
if(document.createRange){cl=function(f6,f7,f4){var f5=document.createRange();
f5.setEnd(f6,f4);
f5.setStart(f6,f7);
return f5
}
}else{cl=function(f6,f8,f4){var f5=document.body.createTextRange();
try{f5.moveToElementText(f6.parentNode)
}catch(f7){return f5
}f5.collapse(true);
f5.moveEnd("character",f4);
f5.moveStart("character",f8);
return f5
}
}function dS(f5){for(var f4=f5.childNodes.length;
f4>0;
--f4){f5.removeChild(f5.firstChild)
}return f5
}function bQ(f4,f5){return dS(f4).appendChild(f5)
}function fX(f4,f5){if(f4.contains){return f4.contains(f5)
}while(f5=f5.parentNode){if(f5==f4){return true
}}}function dF(){return document.activeElement
}if(dB&&m<11){dF=function(){try{return document.activeElement
}catch(f4){return document.body
}}
}function U(f4){return new RegExp("(^|\\s)"+f4+"(?:$|\\s)\\s*")
}var f=K.rmClass=function(f6,f4){var f7=f6.className;
var f5=U(f4).exec(f7);
if(f5){var f8=f7.slice(f5.index+f5[0].length);
f6.className=f7.slice(0,f5.index)+(f8?f5[1]+f8:"")
}};
var fs=K.addClass=function(f5,f4){var f6=f5.className;
if(!U(f4).test(f6)){f5.className+=(f6?" ":"")+f4
}};
function fJ(f6,f4){var f5=f6.split(" ");
for(var f7=0;
f7<f5.length;
f7++){if(f5[f7]&&!U(f5[f7]).test(f4)){f4+=" "+f5[f7]
}}return f4
}function az(f7){if(!document.body.getElementsByClassName){return
}var f6=document.body.getElementsByClassName("CodeMirror");
for(var f5=0;
f5<f6.length;
f5++){var f4=f6[f5].CodeMirror;
if(f4){f7(f4)
}}}var cB=false;
function bf(){if(cB){return
}fw();
cB=true
}function fw(){var f4;
bW(window,"resize",function(){if(f4==null){f4=setTimeout(function(){f4=null;
en=null;
az(aQ)
},100)
}});
bW(window,"blur",function(){az(aR)
})
}var eD=function(){if(dB&&m<9){return false
}var f4=fO("div");
return"draggable" in f4||"dragDrop" in f4
}();
var en;
function l(f4){if(en!=null){return en
}var f5=fO("div",null,null,"width: 50px; height: 50px; overflow-x: scroll");
bQ(f4,f5);
if(f5.offsetWidth){en=f5.offsetHeight-f5.clientHeight
}return en||0
}var fD;
function bm(f4){if(fD==null){var f5=fO("span","\u200b");
bQ(f4,fO("span",[f5,document.createTextNode("x")]));
if(f4.firstChild.offsetHeight!=0){fD=f5.offsetWidth<=1&&f5.offsetHeight>2&&!(dB&&m<8)
}}if(fD){return fO("span","\u200b")
}else{return fO("span","\u00a0",null,"display: inline-block; width: 1px; margin-right: -1px")
}}var fC;
function bN(f7){if(fC!=null){return fC
}var f4=bQ(f7,document.createTextNode("A\u062eA"));
var f6=cl(f4,0,1).getBoundingClientRect();
if(!f6||f6.left==f6.right){return false
}var f5=cl(f4,1,2).getBoundingClientRect();
return fC=(f5.right-f6.right<3)
}var aW=K.splitLines="\n\nb".split(/\n/).length!=3?function(f9){var ga=0,f4=[],f8=f9.length;
while(ga<=f8){var f7=f9.indexOf("\n",ga);
if(f7==-1){f7=f9.length
}var f6=f9.slice(ga,f9.charAt(f7-1)=="\r"?f7-1:f7);
var f5=f6.indexOf("\r");
if(f5!=-1){f4.push(f6.slice(0,f5));
ga+=f5+1
}else{f4.push(f6);
ga=f7+1
}}return f4
}:function(f4){return f4.split(/\r\n?|\n/)
};
var br=window.getSelection?function(f5){try{return f5.selectionStart!=f5.selectionEnd
}catch(f4){return false
}}:function(f6){try{var f4=f6.ownerDocument.selection.createRange()
}catch(f5){}if(!f4||f4.parentElement()!=f6){return false
}return f4.compareEndPoints("StartToEnd",f4)!=0
};
var c6=(function(){var f4=fO("div");
if("oncopy" in f4){return true
}f4.setAttribute("oncopy","return;");
return typeof f4.oncopy=="function"
})();
var eX=null;
function aI(f5){if(eX!=null){return eX
}var f6=bQ(f5,fO("span","x"));
var f7=f6.getBoundingClientRect();
var f4=cl(f6,0,1).getBoundingClientRect();
return eX=Math.abs(f7.left-f4.left)>1
}var e7={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",107:"=",109:"-",127:"Delete",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"};
K.keyNames=e7;
(function(){for(var f4=0;
f4<10;
f4++){e7[f4+48]=e7[f4+96]=String(f4)
}for(var f4=65;
f4<=90;
f4++){e7[f4]=String.fromCharCode(f4)
}for(var f4=1;
f4<=12;
f4++){e7[f4+111]=e7[f4+63235]="F"+f4
}})();
function dV(f4,ga,f9,f8){if(!f4){return f8(ga,f9,"ltr")
}var f7=false;
for(var f6=0;
f6<f4.length;
++f6){var f5=f4[f6];
if(f5.from<f9&&f5.to>ga||ga==f9&&f5.to==ga){f8(Math.max(f5.from,ga),Math.min(f5.to,f9),f5.level==1?"rtl":"ltr");
f7=true
}}if(!f7){f8(ga,f9,"ltr")
}}function dq(f4){return f4.level%2?f4.to:f4.from
}function f0(f4){return f4.level%2?f4.from:f4.to
}function cD(f5){var f4=a(f5);
return f4?dq(f4[0]):0
}function cQ(f5){var f4=a(f5);
if(!f4){return f5.text.length
}return f0(fz(f4))
}function bs(f5,f8){var f6=e6(f5.doc,f8);
var f9=A(f6);
if(f9!=f6){f8=bM(f9)
}var f4=a(f9);
var f7=!f4?0:f4[0].level%2?cQ(f9):cD(f9);
return Y(f8,f7)
}function dG(f6,f9){var f5,f7=e6(f6.doc,f9);
while(f5=em(f7)){f7=f5.find(1,true).line;
f9=null
}var f4=a(f7);
var f8=!f4?f7.text.length:f4[0].level%2?cD(f7):cQ(f7);
return Y(f9==null?bM(f7):f9,f8)
}function dA(f5,ga){var f9=bs(f5,ga.line);
var f6=e6(f5.doc,f9.line);
var f4=a(f6);
if(!f4||f4[0].level==0){var f8=Math.max(0,f6.text.search(/\S/));
var f7=ga.line==f9.line&&ga.ch<=f8&&ga.ch;
return Y(f9.line,f7?0:f8)
}return f9
}function an(f5,f6,f4){var f7=f5[0].level;
if(f6==f7){return true
}if(f4==f7){return false
}return f6<f4
}var eU;
function aE(f4,f8){eU=null;
for(var f5=0,f6;
f5<f4.length;
++f5){var f7=f4[f5];
if(f7.from<f8&&f7.to>f8){return f5
}if((f7.from==f8||f7.to==f8)){if(f6==null){f6=f5
}else{if(an(f4,f7.level,f4[f6].level)){if(f7.from!=f7.to){eU=f6
}return f5
}else{if(f7.from!=f7.to){eU=f5
}return f6
}}}}return f6
}function e5(f4,f7,f5,f6){if(!f6){return f7+f5
}do{f7+=f5
}while(f7>0&&fh(f4.text.charAt(f7)));
return f7
}function w(f4,gb,f6,f7){var f8=a(f4);
if(!f8){return ai(f4,gb,f6,f7)
}var ga=aE(f8,gb),f5=f8[ga];
var f9=e5(f4,gb,f5.level%2?-f6:f6,f7);
for(;
;
){if(f9>f5.from&&f9<f5.to){return f9
}if(f9==f5.from||f9==f5.to){if(aE(f8,f9)==ga){return f9
}f5=f8[ga+=f6];
return(f6>0)==f5.level%2?f5.to:f5.from
}else{f5=f8[ga+=f6];
if(!f5){return null
}if((f6>0)==f5.level%2){f9=e5(f4,f5.to,-1,f7)
}else{f9=e5(f4,f5.from,1,f7)
}}}}function ai(f4,f8,f5,f6){var f7=f8+f5;
if(f6){while(f7>0&&fh(f4.text.charAt(f7))){f7+=f5
}}return f7<0||f7>f4.text.length?null:f7
}var bd=(function(){var ga="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
var f8="rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
function f7(ge){if(ge<=247){return ga.charAt(ge)
}else{if(1424<=ge&&ge<=1524){return"R"
}else{if(1536<=ge&&ge<=1773){return f8.charAt(ge-1536)
}else{if(1774<=ge&&ge<=2220){return"r"
}else{if(8192<=ge&&ge<=8203){return"w"
}else{if(ge==8204){return"b"
}else{return"L"
}}}}}}}var f4=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
var gd=/[stwN]/,f6=/[LRr]/,f5=/[Lb1n]/,f9=/[1n]/;
var gc="L";
function gb(gg,gf,ge){this.level=gg;
this.from=gf;
this.to=ge
}return function(go){if(!f4.test(go)){return false
}var gu=go.length,gk=[];
for(var gt=0,gg;
gt<gu;
++gt){gk.push(gg=f7(go.charCodeAt(gt)))
}for(var gt=0,gn=gc;
gt<gu;
++gt){var gg=gk[gt];
if(gg=="m"){gk[gt]=gn
}else{gn=gg
}}for(var gt=0,ge=gc;
gt<gu;
++gt){var gg=gk[gt];
if(gg=="1"&&ge=="r"){gk[gt]="n"
}else{if(f6.test(gg)){ge=gg;
if(gg=="r"){gk[gt]="R"
}}}}for(var gt=1,gn=gk[0];
gt<gu-1;
++gt){var gg=gk[gt];
if(gg=="+"&&gn=="1"&&gk[gt+1]=="1"){gk[gt]="1"
}else{if(gg==","&&gn==gk[gt+1]&&(gn=="1"||gn=="n")){gk[gt]=gn
}}gn=gg
}for(var gt=0;
gt<gu;
++gt){var gg=gk[gt];
if(gg==","){gk[gt]="N"
}else{if(gg=="%"){for(var gh=gt+1;
gh<gu&&gk[gh]=="%";
++gh){}var gv=(gt&&gk[gt-1]=="!")||(gh<gu&&gk[gh]=="1")?"1":"N";
for(var gr=gt;
gr<gh;
++gr){gk[gr]=gv
}gt=gh-1
}}}for(var gt=0,ge=gc;
gt<gu;
++gt){var gg=gk[gt];
if(ge=="L"&&gg=="1"){gk[gt]="L"
}else{if(f6.test(gg)){ge=gg
}}}for(var gt=0;
gt<gu;
++gt){if(gd.test(gk[gt])){for(var gh=gt+1;
gh<gu&&gd.test(gk[gh]);
++gh){}var gl=(gt?gk[gt-1]:gc)=="L";
var gf=(gh<gu?gk[gh]:gc)=="L";
var gv=gl||gf?"L":"R";
for(var gr=gt;
gr<gh;
++gr){gk[gr]=gv
}gt=gh-1
}}var gs=[],gp;
for(var gt=0;
gt<gu;
){if(f5.test(gk[gt])){var gi=gt;
for(++gt;
gt<gu&&f5.test(gk[gt]);
++gt){}gs.push(new gb(0,gi,gt))
}else{var gj=gt,gm=gs.length;
for(++gt;
gt<gu&&gk[gt]!="L";
++gt){}for(var gr=gj;
gr<gt;
){if(f9.test(gk[gr])){if(gj<gr){gs.splice(gm,0,new gb(1,gj,gr))
}var gq=gr;
for(++gr;
gr<gt&&f9.test(gk[gr]);
++gr){}gs.splice(gm,0,new gb(2,gq,gr));
gj=gr
}else{++gr
}}if(gj<gt){gs.splice(gm,0,new gb(1,gj,gt))
}}}if(gs[0].level==1&&(gp=go.match(/^\s+/))){gs[0].from=gp[0].length;
gs.unshift(new gb(0,0,gp[0].length))
}if(fz(gs).level==1&&(gp=go.match(/\s+$/))){fz(gs).to-=gp[0].length;
gs.push(new gb(0,gu-gp[0].length,gu))
}if(gs[0].level!=fz(gs).level){gs.push(new gb(gs[0].level,gu,gu))
}return gs
}
})();
K.cleanup=function(){var f7=this.display;
var f4=this.display.view;
for(var f6=0,f5=f4.length;
f6<f5;
f6++){f4[f6].lineNumber=null;
f4[f6].gutter=null;
f4[f6].line.parent=null;
f4[f6].line=null;
f4[f6].measure=null;
f4[f6].node=null;
f4[f6].text=null;
f4[f6].parent=null
}aF=null;
f7.wrapper=null;
f7.doc=null;
f7.input=null;
f7.maxLine=null;
f7.inputDiv=null;
f7.scrollbarH=null;
f7.scrollbarV=null;
f7.scrollbarFiller=null;
f7.gutterFiller=null;
f7.lineDiv=null;
f7.selectionDiv=null;
f7.cursorDiv=null;
f7.measure=null;
f7.lineMeasure=null;
f7.lineSpace=null;
f7.mover=null;
f7.sizer=null;
f7.heightForcer=null;
f7.gutters=null;
f7.lineGutter=null;
f7.scroller=null;
f7.wrapper=null;
this.display=null;
this.doc=null;
this.state=null;
f7=f4=null
};
K.version="4.8.0";
return K
});
(function(){CodeMirror.switchSlackMode=function(f,g){var e={php:["php","application/x-httpd-php"],sql:["sql","text/x-sql"],mysql:["sql","text/x-mysql"],html:["htmlmixed","text/html"],javascript:["javascript","text/javascript"],markdown:["markdown","text/x-markdown"],c:["clike","text/x-csrc"],cpp:["clike","text/x-c++src"],csharp:["clike","text/x-csharp"],vb:["vb","text/x-vb"],vbscript:["vbscript","text/vbscript"],java:["clike","text/x-java"],css:["css","text/css"],perl:["perl","text/x-perl"],python:["python","text/x-python"],ruby:["ruby","text/x-ruby"],erlang:["erlang","text/x-erlang"],diff:["diff","text/x-diff"],xml:["xml","text/xml"],coffeescript:["coffeescript","text/x-coffeescript"],clojure:["clojure","text/x-clojure"],scheme:["scheme","text/x-scheme"],haskell:["haskell","text/x-haskell"],scala:["clike","text/x-scala"],shell:["shell","text/x-sh"],go:["go","text/x-go"],groovy:["groovy","text/x-groovy"],yaml:["yaml","text/x-yaml"],lua:["lua","text/x-lua"],matlab:["octave","text/x-octave"],r:["r","text/x-rsrc"],puppet:["puppet","text/x-puppet"],smalltalk:["smalltalk","text/x-stsrc"],latex:["stex","text/x-stex"],objc:["clike","text/x-objectivec"]};
if(e[g]){f.setOption("mode",e[g][1]);
CodeMirror.autoLoadMode(f,e[g][0])
}else{f.setOption("mode",null)
}};
function c(e){switch(e){case"apl":return cdn_url+"/62b3/js/libs/codemirror/apl.js";
case"asterisk":return cdn_url+"/aec9/js/libs/codemirror/asterisk.js";
case"clike":return cdn_url+"/a13a/js/libs/codemirror/clike.js";
case"clojure":return cdn_url+"/b6a7/js/libs/codemirror/clojure.js";
case"cobol":return cdn_url+"/e457/js/libs/codemirror/cobol.js";
case"coffeescript":return cdn_url+"/e077/js/libs/codemirror/coffeescript.js";
case"commonlisp":return cdn_url+"/c712/js/libs/codemirror/commonlisp.js";
case"css":return cdn_url+"/def2/js/libs/codemirror/css.js";
case"cypher":return cdn_url+"/aa98/js/libs/codemirror/cypher.js";
case"d":return cdn_url+"/1cda/js/libs/codemirror/d.js";
case"diff":return cdn_url+"/5f39/js/libs/codemirror/diff.js";
case"django":return cdn_url+"/25cc/js/libs/codemirror/django.js";
case"dockerfile":return cdn_url+"/8fd3/js/libs/codemirror/dockerfile.js";
case"dtd":return cdn_url+"/aadf/js/libs/codemirror/dtd.js";
case"dylan":return cdn_url+"/81de/js/libs/codemirror/dylan.js";
case"ecl":return cdn_url+"/6bf4/js/libs/codemirror/ecl.js";
case"eiffel":return cdn_url+"/f7a8/js/libs/codemirror/eiffel.js";
case"erlang":return cdn_url+"/9e1a/js/libs/codemirror/erlang.js";
case"fortran":return cdn_url+"/4cd8/js/libs/codemirror/fortran.js";
case"gas":return cdn_url+"/fb60/js/libs/codemirror/gas.js";
case"gfm":return cdn_url+"/55ab/js/libs/codemirror/gfm.js";
case"gherkin":return cdn_url+"/1731/js/libs/codemirror/gherkin.js";
case"go":return cdn_url+"/81a5/js/libs/codemirror/go.js";
case"groovy":return cdn_url+"/aeb7/js/libs/codemirror/groovy.js";
case"haml":return cdn_url+"/2ab9/js/libs/codemirror/haml.js";
case"haskell":return cdn_url+"/4890/js/libs/codemirror/haskell.js";
case"haxe":return cdn_url+"/c205/js/libs/codemirror/haxe.js";
case"htmlembedded":return cdn_url+"/82ef/js/libs/codemirror/htmlembedded.js";
case"htmlmixed":return cdn_url+"/9ddc/js/libs/codemirror/htmlmixed.js";
case"http":return cdn_url+"/b911/js/libs/codemirror/http.js";
case"idl":return cdn_url+"/2678/js/libs/codemirror/idl.js";
case"jade":return cdn_url+"/c50e/js/libs/codemirror/jade.js";
case"javascript":return cdn_url+"/fe22/js/libs/codemirror/javascript.js";
case"jinja2":return cdn_url+"/d7c1/js/libs/codemirror/jinja2.js";
case"julia":return cdn_url+"/abd0/js/libs/codemirror/julia.js";
case"kotlin":return cdn_url+"/95b4/js/libs/codemirror/kotlin.js";
case"livescript":return cdn_url+"/57ed/js/libs/codemirror/livescript.js";
case"lua":return cdn_url+"/d291/js/libs/codemirror/lua.js";
case"markdown":return cdn_url+"/aba4/js/libs/codemirror/markdown.js";
case"mirc":return cdn_url+"/bdf0/js/libs/codemirror/mirc.js";
case"mllike":return cdn_url+"/de4e/js/libs/codemirror/mllike.js";
case"modelica":return cdn_url+"/08a91/js/libs/codemirror/modelica.js";
case"nginx":return cdn_url+"/171c/js/libs/codemirror/nginx.js";
case"ntriples":return cdn_url+"/3946/js/libs/codemirror/ntriples.js";
case"octave":return cdn_url+"/cf67/js/libs/codemirror/octave.js";
case"pascal":return cdn_url+"/df9e/js/libs/codemirror/pascal.js";
case"pegjs":return cdn_url+"/2d1d/js/libs/codemirror/pegjs.js";
case"perl":return cdn_url+"/ddc2/js/libs/codemirror/perl.js";
case"php":return cdn_url+"/2da3/js/libs/codemirror/php.js";
case"pig":return cdn_url+"/d4bd/js/libs/codemirror/pig.js";
case"properties":return cdn_url+"/b5e4/js/libs/codemirror/properties.js";
case"puppet":return cdn_url+"/4445/js/libs/codemirror/puppet.js";
case"python":return cdn_url+"/7e01/js/libs/codemirror/python.js";
case"q":return cdn_url+"/6912/js/libs/codemirror/q.js";
case"r":return cdn_url+"/f25f/js/libs/codemirror/r.js";
case"rpm":return cdn_url+"/33de/js/libs/codemirror/rpm.js";
case"rst":return cdn_url+"/4792/js/libs/codemirror/rst.js";
case"ruby":return cdn_url+"/558f/js/libs/codemirror/ruby.js";
case"rust":return cdn_url+"/b945/js/libs/codemirror/rust.js";
case"sass":return cdn_url+"/b9c0/js/libs/codemirror/sass.js";
case"scheme":return cdn_url+"/8e42/js/libs/codemirror/scheme.js";
case"shell":return cdn_url+"/7484/js/libs/codemirror/shell.js";
case"sieve":return cdn_url+"/774e/js/libs/codemirror/sieve.js";
case"slim":return cdn_url+"/9647/js/libs/codemirror/slim.js";
case"smalltalk":return cdn_url+"/0918/js/libs/codemirror/smalltalk.js";
case"smarty":return cdn_url+"/548a/js/libs/codemirror/smarty.js";
case"smartymixed":return cdn_url+"/40d8/js/libs/codemirror/smartymixed.js";
case"solr":return cdn_url+"/c6f4/js/libs/codemirror/solr.js";
case"sparql":return cdn_url+"/a1c7/js/libs/codemirror/sparql.js";
case"sql":return cdn_url+"/6660/js/libs/codemirror/sql.js";
case"stex":return cdn_url+"/b178/js/libs/codemirror/stex.js";
case"tcl":return cdn_url+"/98d9/js/libs/codemirror/tcl.js";
case"textile":return cdn_url+"/5755/js/libs/codemirror/textile.js";
case"tiddlywiki":return cdn_url+"/5f7e/js/libs/codemirror/tiddlywiki.js";
case"tiki":return cdn_url+"/6876/js/libs/codemirror/tiki.js";
case"toml":return cdn_url+"/4596/js/libs/codemirror/toml.js";
case"tornado":return cdn_url+"/cd62/js/libs/codemirror/tornado.js";
case"turtle":return cdn_url+"/9538/js/libs/codemirror/turtle.js";
case"vb":return cdn_url+"/c2b2/js/libs/codemirror/vb.js";
case"vbscript":return cdn_url+"/6553/js/libs/codemirror/vbscript.js";
case"velocity":return cdn_url+"/cc3e/js/libs/codemirror/velocity.js";
case"verilog":return cdn_url+"/d38a/js/libs/codemirror/verilog.js";
case"xml":return cdn_url+"/b474f/js/libs/codemirror/xml.js";
case"xquery":return cdn_url+"/ef72/js/libs/codemirror/xquery.js";
case"yaml":return cdn_url+"/3f7c/js/libs/codemirror/yaml.js";
case"z80":return cdn_url+"/48d4/js/libs/codemirror/z80.js"
}return null
}var d={};
function b(e,g){var f=g;
return function(){if(--f==0){e()
}}
}function a(k,e){var j=CodeMirror.modes[k].dependencies;
if(!j){return e()
}var h=[];
for(var g=0;
g<j.length;
++g){if(!CodeMirror.modes.hasOwnProperty(j[g])){h.push(j[g])
}}if(!h.length){return e()
}var f=b(e,h.length);
for(var g=0;
g<h.length;
++g){CodeMirror.requireMode(h[g],f)
}}CodeMirror.requireMode=function(l,e){if(typeof l!="string"){l=l.name
}if(CodeMirror.modes.hasOwnProperty(l)){return a(l,e)
}if(d.hasOwnProperty(l)){return d[l].push(e)
}var f=document.createElement("script");
f.src=c(l);
var g=document.getElementsByTagName("script")[0];
g.parentNode.insertBefore(f,g);
var j=d[l]=[e];
var h=0,k=setInterval(function(){if(++h>100){return clearInterval(k)
}if(CodeMirror.modes.hasOwnProperty(l)){clearInterval(k);
d[l]=null;
a(l,function(){for(var m=0;
m<j.length;
++m){j[m]()
}})
}},200)
};
CodeMirror.autoLoadMode=function(e,f){if(!CodeMirror.modes.hasOwnProperty(f)){CodeMirror.requireMode(f,function(){e.setOption("mode",e.getOption("mode"))
})
}}
}());
(function(){window.TS={session_ms:Date.now(),dom_ready_ms:0,modules:{},boot_data:{},qs_args:{},pri:0,dom_ready:false,requireds:{view:{clearMessageInput:true,focusMessageInput:true,onMsgsDivClick:true}},logLoad:function(w){if(!window.logLoad){TS.log(88,w);
return
}window.logLoad(w)
},reportLoad:function(y,z){if(!window.load_log||!window.load_log.length){return
}if(!TS.model||!TS.model.team||TS.model.team.domain!="tinyspeck"){return
}if(TS.model.prefs&&!TS.model.prefs.seen_welcome_2){return
}TS.dir(88,window.load_log);
if(!TS.client||!TS.ims){return
}z=z||"short";
y=y||window.load_log.length-1;
var A=window.load_log[y]["t"];
var C="total time: "+A+"s (at index "+y+")";
var x;
var w;
if(z=="complete"){x="TS.reportLoad("+y+", 'snippet')";
TS.client.msg_pane.addMaybeClick(x,TS.reportLoad.bind(Object.create(null),y,"snippet"));
C+="\n"+JSON.stringify(window.load_log,null,"\t");
C+="\n<javascript:"+x+")|share this with eric as a snippet>"
}else{if(z=="short"){x="TS.reportLoad("+y+", 'complete')";
TS.client.msg_pane.addMaybeClick(x,TS.reportLoad.bind(Object.create(null),y,"complete"));
C+=" <javascript:"+x+"|click for details>"
}else{if(z=="snippet"){C+="\n"+navigator.userAgent+"\nversion_ts: "+TS.boot_data.version_ts+"\n";
"version_uid: "+TS.boot_data.version_uid+"\n";
if(TS.storage&&TS.storage.storageAvailable){C+="TS.storage.storageAvailable: "+TS.storage.storageAvailable+"\nTS.storage.storageSize(): "+TS.storage.storageSize()+"\n";
C+="TS.storage.version: "+TS.storage.version+"\nTS.storage._get('storage_version'): "+TS.storage._get("storage_version")+"\nTS.storage.msgs_version: "+TS.storage.msgs_version+"\nTS.storage._get('storage_msgs_version'): "+TS.storage._get("storage_msgs_version")+"\n";
if(TS.model){C+="TS.model.initial_ui_state_str: "+TS.model.initial_ui_state_str+"\n"
}}C+=JSON.stringify(window.load_log,null,"\t");
w=TS.ims.getImByUsername("eric");
TS.files.upload({text:C,title:"load times "+TS.utility.date.toDate(TS.utility.date.makeTsStamp()),filetype:"javascript",channels:(w)?[w.id]:null,initial_comment:""});
return
}else{alert("type:"+z);
return
}}}var B={type:"message",subtype:"bot_message",username:"loadBot",icons:{emoji:":rocket:"},is_ephemeral:true,ts:TS.utility.date.makeTsStamp(),text:C,no_notifications:true};
w=TS.ims.getImByMemberId("USLACKBOT");
if(w){TS.ims.addMsg(w.id,B)
}},delayed_module_loads:{},registerModule:function(w,x,A){var D=(typeof window.jasmine!=="undefined")||(TS.boot_data.version_ts=="dev"&&TS.qs_args.export_test);
if(x.test&&!D){delete x.test
}else{if(typeof x.test==="function"){var y=x.test;
Object.defineProperty(x,"test",{get:y})
}}if(TS.dom_ready){TS.error('module "'+w+'" must be registered on before dom ready');
return
}if(TS.modules[w]){TS.error('module "'+w+'" already exists');
return
}var E;
var F;
if(w.indexOf(".")!=-1){var C=w.split(".");
if(C.length>2){TS.error('module "'+w+'" cannot be registered, as we only support a depth of one sub module right now');
return
}E=C[0];
F=C[1];
if(!F){TS.error('module "'+w+'" cannot be registered because of a bad name');
return
}if(!TS.modules[E]){if(A){TS.error('module "'+w+'" cannot be registered after delay; "'+E+'" is not registered')
}else{TS.delayed_module_loads[w]=x
}return
}if(F in TS.modules[E]){TS.error('module "'+w+'" cannot be registered; "'+F+'" already exists on "'+E+'"');
return
}}if(TS.requireds[w]){var z=true;
for(var B in TS.requireds[w]){if(!(B in x)){TS.warn('all mudules registering as "'+w+'" must implement "'+B+'"');
z=false
}}if(!z){TS.error('module "'+w+'" does not implement all requireds');
return
}}if(E){TS[E][F]=x
}else{TS[w]=x
}x._name=w;
TS.modules[w]=x
},makeLogDate:function(){if(window.TSMakeLogDate){return TSMakeLogDate()
}return"(TSMakeLogDate not loaded) "
},shouldLog:function(x){var w=String(TS.pri).split(",");
if(w.indexOf("all")!=-1){return true
}return w.indexOf(String(x))!=-1
},log:function(x,w){if(!window.console){return
}if(x){if(!TS.shouldLog(x)){return
}}if(typeof w=="object"){console.log(w)
}else{console.log(TS.makeLogDate()+"[** "+x+" **] "+w)
}},info:function(w){if(!window.console||!console.info){return
}console.info(TS.makeLogDate()+w)
},warn:function(w){if(!window.console||!console.warn){return
}console.warn(TS.makeLogDate()+w)
},dir:function(A,y,w){if(!window.console||!console.dir){return
}if(A){if(!TS.shouldLog(A)){return
}}w=w||"";
var C=parseInt(TS.qs_args.dir_json);
if(C){var x=(C==1)?"2000":C;
try{var z=JSON.stringify(y,null,"  ");
if(z.length>x){throw"too long"
}console.info(TS.makeLogDate()+"[** "+A+" **] "+w+" "+z);
return
}catch(B){if(B!="too long"){console.info(TS.makeLogDate()+"[** "+A+" **] "+w+" "+y);
return
}}}try{var D=TS.utility.clone(y);
console.info(TS.makeLogDate()+"[** "+A+" **] "+w+" 👇");
console.dir(D)
}catch(B){TS.warn("could not dir ob:"+y+" err:"+B)
}},error:function(w){if(!window.console||!console.error){return
}console.error(TS.makeLogDate()+w)
},logError:function(w,x){if(!window.Bugsnag||!window.Bugsnag.notifyException){if(window.console&&console.error){console.error(TS.makeLogDate()+"no Bugsnag.notifyException trying to log e:"+w+" e.stack:"+w.stack+" desc:"+x)
}return
}Bugsnag.notifyException(w,x);
if(window.console&&console.error){console.error(TS.makeLogDate()+"logging e:"+w+" e.stack:"+w.stack+" desc:"+x)
}},reportLoadTiming:function(y){window.clearTimeout(a);
if(window.performance===undefined||window.performance.timing===undefined){return
}var x=Date.now();
var w=x-window.performance.timing.navigationStart;
TS.logDataToServer(y,w)
},logDataToServer:function(y,z){var x="";
if(TS&&TS.model&&TS.model.team){x=TS.model.team.id
}var A=new XMLHttpRequest();
var w="/log204?k="+y+"&v="+z+"&t="+x;
A.open("GET",w,true);
A.send()
},track:function(w){if(window.track){TS.info("tracking: "+w);
window.track(w)
}else{TS.warn('could not track "'+w+'" because there is no window.track')
}},boot:function(w){TS.logLoad("TS.boot");
d();
TS.boot_data=w;
TS.model.api_url=TS.boot_data.api_url;
TS.model.async_api_url=TS.boot_data.async_api_url;
TS.model.api_token=TS.boot_data.api_token;
TS.model.webhook_url=TS.boot_data.webhook_url;
TS.qs_args=TS.getQsArgs(location.search.substring(1));
TS.pri=(TS.qs_args.pri)?TS.qs_args.pri+",0":TS.pri;
TS.info("booted! pri:"+TS.pri);
if(window.load_start_ms){TS.warn((Date.now()-window.load_start_ms)+"ms from first html to TS.boot()")
}if(TS.boot_data.feature_fast_space_previews&&TS.web&&TS.web.space){TS.web.space.showFastPreview()
}$(document).ready(TS.onDOMReady)
},getQsArgs:function(w){var y={};
var B;
B=w.split("&");
for(var z=0;
z<B.length;
z++){var C=B[z].indexOf("=");
if(C!=-1){var x=B[z].substring(0,C);
var A=B[z].substring(C+1);
y[x]=unescape(A)
}}return y
},onDOMReady:function(){TS.dom_ready_ms=new Date().getTime();
TS.info("onDOMReady");
if(TS.client&&window.WEB_SOCKET_USING_FLASH_BUT_NO_FLASH){TS.info("WEB_SOCKET_USING_FLASH_BUT_NO_FLASH");
$("#loading_animation").addClass("hidden");
$("#no_ws_and_bad_flash").css("display","inline");
$("#loading_nag").css("display","none");
return
}if(TS.client){TSSSB.call("didStartLoading",30000)
}else{TS.info("no TS.client on page:"+document.location.href)
}TS.logLoad("TS.onDOMReady");
soundManager.setup({url:"/img/sm/",debugMode:false,preferFlash:false,onready:function(){}});
var z=new Date();
var w=(TS.boot_data.version_ts=="dev")?z.getTime():TS.boot_data.version_ts;
var C="/templates.php?cb="+w+TS.appendQSArgsToUrl();
var A=new XMLHttpRequest();
var y=0;
function B(){return new Promise(function(D){y++;
A.onreadystatechange=function(){if(A.readyState!=4){return
}if(A.status!=200){var F=Math.min(1000*y,10000);
TS.warn("loading "+C+" failed (req.status:"+A.status+" attempts"+y+"), trying again in "+F+"ms");
setTimeout(B,F);
return
}A.onreadystatechange=null;
var E=(Date.now()-z);
TS.logLoad(C+" is loaded (took "+E+"ms), doing $('body').append(req.responseText)");
$("body").append(A.responseText);
TS.onTemplatesLoaded(D)
};
TS.logLoad("loading "+C);
A.open("GET",C,1);
A.send()
})
}var x=[B(),TS.setUpCmds(),TS.emoji.setUpEmoji()];
if(TS.client||(TS.web&&TS.web.space)){x.push(TS.callRTMStartInParallel())
}if(TS.web&&TS.web.space&&!TS.boot_data.space_login_data){x.push(l())
}Promise.all(x).then(k)
},onTemplatesLoaded:function(w){TS.logLoad("onTemplatesLoaded(), calling TS.storage.onStart()");
if(window.load_start_ms){TS.warn((new Date()-window.load_start_ms)+"ms from first html to calling onStarts()")
}TS.warn((new Date()-TS.dom_ready_ms)+"ms from dom ready to calling onStarts()");
for(var x in TS.delayed_module_loads){TS.registerModule(x,TS.delayed_module_loads[x],true)
}TS.storage.onStart(function(){TS.onStorageStart(w)
})
},onStorageStart:function(w){TS.logLoad("onStorageStart, calling other onStarts()");
if(TS.boot_data.app=="client"){TS.client.onStart();
TS.client.onStart=function(){}
}else{if(TS.boot_data.app=="web"||TS.boot_data.app=="mobile"||TS.boot_data.app=="space"){TS.web.onStart();
TS.web.onStart=function(){}
}else{if(TS.boot_data.app=="test"){return
}else{TS.error("WTF app? "+TS.boot_data.app);
return
}}}TS.ms.reconnect_requested_sig.add(t);
TS.ds.reconnect_requested_sig.add(s);
TS.ms.connected_sig.add(p);
TS.ms.disconnected_sig.add(o);
TS.ds.disconnected_sig.add(g);
TS.callModuleMethod("onStart",true);
TS.dom_ready=true;
w()
},setUpCmds:function(){return new Promise(function(w){if(!TS.boot_data.page_needs_custom_cmds){return w()
}TS.api.call("commands.list",{},function(y,z,x){if(!y||!z.commands){return w()
}TS.cmd_handlers.mergeInServerCmds(z.commands);
w()
})
})
},setUpModel:function(z){var E=!TS.model.ms_logged_in_once;
TS.model.team=z.team;
TS.model.bots_legacy=z.team.bots;
TS.model.team.url=z.url;
if(!TS.model.last_team_name){TS.model.last_team_name=TS.model.team.name;
TS.model.last_team_domain=TS.model.team.domain
}TS.model.team.activity=[];
if(TS.model.break_token){TS.model.team.url+="f"
}if(TS.model.break_reconnections){TS.model.team.url=TS.model.team.url.replace("websocket","BUSTED")
}if(E){TS.model.bots=[];
TS.model.members=[];
TS.model.rooms=[];
TS.model.channels=[];
TS.model.ims=[];
TS.model.groups=[];
TS.model.mpims=[];
TS.model.user_groups=[]
}else{TS.refreshTeams()
}TS.prefs.setPrefs(z.self.prefs);
delete z.self.prefs;
var A;
var x;
var C;
var y;
var F=function(H){TS.model.user=H;
TS.model.user.is_self=true
};
if(TS.boot_data.feature_web_cache_users){var w=TS.storage.fetchMembers();
for(A=0;
A<w.length;
A++){y=w[A];
if(TS.utility.getObjectWithPropValueFromArray("id",y.id,z.updated_users)){continue
}y.presence=(TS.utility.inArray(z.online_users,y.id)?"active":"away");
x=TS.members.upsertAndSignal(y);
if(x.member.id==z.self.id){F(x.member)
}}for(A=0;
A<z.updated_users.length;
A++){y=z.updated_users[A];
y.presence=(TS.utility.inArray(z.online_users,y.id)?"active":"away");
x=TS.members.upsertAndSignal(y);
if(x.member.id==z.self.id){F(x.member)
}}var G=TS.storage.fetchBots();
for(A=0;
A<G.length;
A++){C=G[A];
if(TS.utility.getObjectWithPropValueFromArray("id",C.id,z.updated_bots)){continue
}x=TS.bots.upsertAndSignal(C)
}for(A=0;
A<z.updated_bots.length;
A++){C=z.updated_bots[A];
TS.bots.upsertAndSignal(C)
}TS.info("TS.model.supports_user_caching:"+TS.model.supports_user_caching+"\nmembers from LS:"+w.length+", from updated_users in rtm.start:"+z.updated_users.length+" (slackbot will always be in updated_users)\nbots from LS:"+G.length+", from updated_bots in rtm.start:"+z.updated_bots.length)
}else{for(A=0;
A<z.users.length;
A++){y=z.users[A];
x=TS.members.upsertAndSignal(y);
if(x.member.id==z.self.id){F(x.member)
}}for(A=0;
A<z.bots.length;
A++){C=z.bots[A];
TS.bots.upsertAndSignal(C)
}}TS.members.upsertMember(z.self);
if(TS.model.supports_user_caching){TS.members.maybeStoreMembers();
TS.bots.maybeStoreBots();
TS.storage.storeLastCacheTS(z.cache_ts)
}TS.model.makeYouRegex();
if(E||true){TS.prefs.setHighlightWords(TS.model.prefs.highlight_words)
}var B=0;
z.channels.forEach(function(H){if(H.is_member){B++
}});
z.ims.forEach(function(H){if(H.is_open){B++
}});
z.groups.forEach(function(H){if((TS.boot_data.feature_private_channels||H.is_open)&&!H.is_archived){B++
}});
if(TS.boot_data.feature_mpim_client&&z.mpims){z.mpims.forEach(function(H){if(H.is_open&&!H.is_archived){B++
}})
}if(TS.qs_args.api_count){TS.model.initial_msgs_cnt=parseInt(TS.qs_args.api_count)||TS.model.initial_msgs_cnt
}else{if(B<10){TS.model.initial_msgs_cnt=200
}else{if(B<20){TS.model.initial_msgs_cnt=180
}else{if(B<30){TS.model.initial_msgs_cnt=160
}else{if(B<40){TS.model.initial_msgs_cnt=140
}else{if(B<50){TS.model.initial_msgs_cnt=120
}else{if(B<60){TS.model.initial_msgs_cnt=100
}else{if(B<70){TS.model.initial_msgs_cnt=80
}else{if(B<80){TS.model.initial_msgs_cnt=60
}else{if(B<90){TS.model.initial_msgs_cnt=50
}else{if(B<100){TS.model.initial_msgs_cnt=40
}else{TS.model.initial_msgs_cnt=30
}}}}}}}}}}}var D=TS.model.hard_msg_limit;
TS.model.subsequent_msgs_cnt=Math.min(D,TS.model.initial_msgs_cnt*2);
TS.model.special_initial_msgs_cnt=Math.min(D,TS.model.initial_msgs_cnt*2);
TS.info("open channels/groups/ims:"+B+" initial_msgs_cnt:"+TS.model.initial_msgs_cnt+" subsequent_msgs_cnt:"+TS.model.subsequent_msgs_cnt+" special_initial_msgs_cnt:"+TS.model.special_initial_msgs_cnt);
z.channels.forEach(function(H){H.all_read_this_session_once=false;
TS.channels.upsertChannel(H)
});
z.ims.forEach(function(H){H.all_read_this_session_once=false;
TS.ims.upsertIm(H)
});
z.groups.forEach(function(H){H.all_read_this_session_once=false;
TS.groups.upsertGroup(H)
});
if(TS.boot_data.feature_subteams&&z.subteams){z.subteams.all.forEach(function(H){TS.user_groups.upsertUserGroup(H)
});
z.subteams.self.forEach(function(H){TS.user_groups.upsertSelfUserGroup(H)
})
}if(TS.boot_data.feature_mpim_client&&z.mpims){z.mpims.forEach(function(H){H.all_read_this_session_once=false;
TS.mpims.upsertMpim(H)
})
}},setThemeClasses:function(w){$("body").removeClass("dense_theme light_theme");
if(TS.model.prefs.theme=="dense"){$("body").addClass("dense_theme")
}else{if(TS.model.prefs.theme=="light"){$("body").addClass("light_theme")
}else{TS.error("no theme?");
return
}}if(TS.model.prefs.avatars){$("body").removeClass("no_avatars")
}else{$("body").addClass("no_avatars")
}if(TS.client&&!w&&!TS.boot_data.feature_new_message_markup){if(TS.shared.getActiveModelOb()){TS.client.msg_pane.rebuildMsgs()
}}},callModuleMethod:function(B,C){var x;
var z;
var w=[];
for(x in TS.modules){z=TS.modules[x];
w.push(z)
}for(var y=0;
y<w.length;
y++){z=w[y];
if(!(B in z)||typeof z[B]!="function"){if(C){TS.error('module:"'+z._name+'" does not have method:"'+B+'"')
}continue
}TS.log(4,'calling "'+B+'" on "'+z._name);
z[B]()
}},getAllTeams:function(){if(!TS.boot_data){return null
}if(!TS.model){return null
}if(!TS.model.team){return null
}if(!TS.model.user){return null
}var w=[{id:TS.model.user.id,name:TS.model.user.name,team_id:TS.model.team.id,team_name:TS.model.team.name.replace(/ +/g," "),team_url:TS.boot_data.team_url}];
if(TS.boot_data.other_accounts&&typeof TS.boot_data.other_accounts=="object"&&!TS.boot_data.other_accounts.length){for(var x in TS.boot_data.other_accounts){var y=TS.utility.clone(TS.boot_data.other_accounts[x]);
y.id=x;
y.team_name=y.team_name.replace(/ +/g," ");
w.push(y)
}}return w
},getOtherAccountsCount:function(){var w=0;
if(!TS.boot_data.other_accounts){return w
}w=Object.keys(TS.boot_data.other_accounts).length;
return w
},refreshTeams:function(){if(!TS.boot_data){return
}if(!TS.model){return
}if(!TS.model.team){return
}if(!TS.model.user){return
}var w="/account-list-api";
var x=new XMLHttpRequest();
x.onreadystatechange=function(){if(x.readyState!=4){return
}if(x.status!=200){return
}x.onreadystatechange=null;
if(x.responseText.indexOf("{")!==0){return
}var A;
try{A=JSON.parse(x.responseText);
if(A.ok){TS.boot_data.other_accounts={};
var B=0;
for(var y in A.accounts){if(y==TS.model.user.id){continue
}TS.boot_data.other_accounts[y]=A.accounts[y];
B++
}if(TSSSB.call("teamsUpdate",TS.getAllTeams())){TS.info("called TSSSB.call('teamsUpdate')")
}if(TS.view&&!B){TS.view.updateTitleBarColor()
}}else{}}catch(z){if(window.console&&console.warn&&console.error){console.warn("unable to do anything with refreshTeams rsp");
console.error(z)
}}};
x.open("POST",w,1);
x.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
x.send("token="+encodeURIComponent(TS.model.api_token))
},qs_url_args:null,appendQSArgsToUrl:function(x){if(!x&&TS.qs_url_args!==null){return TS.qs_url_args
}TS.qs_url_args="";
for(var w in TS.qs_args){if(w=="export_test"){continue
}TS.qs_url_args+="&"+w+"="+TS.qs_args[w]
}return TS.qs_url_args
},ssbChromeClicked:function(w){if(w){return
}$("html").trigger("mousedown");
$(".modal-backdrop").trigger("click")
},loginMS:function(){if(TS.model.ms_logged_in_once){var y=Date.now()-TS.ms.last_pong_time;
if(y>1000*60*5){if(TS.storage.cleanOutMsgStorageIfTooOld()){TS.info("going to call TS.reload() after a TS.storage.cleanOutMsgStorageIfTooOld() because since_last_pong_ms > 1000*60*5");
TS.reload(null,"TS.reload() after a TS.storage.cleanOutMsgStorageIfTooOld() because since_last_pong_ms > 1000*60*5")
}}}else{TS.storage.cleanOutMsgStorageIfTooOld()
}if(TS.client&&TS.boot_data.login_data){var x=Date.now()-TS.boot_data.start_ms;
var w=25000;
if(x>w){TS.info("forcing a call to rtm.start because the WS url is tool old at this point: "+x+"ms");
delete TS.boot_data.login_data;
TS.warn(JSON.stringify(window.load_log,null,"\t"));
TSSSB.call("didStartLoading",30000)
}}var z=TS.getMSLoginArgs();
if(TS.boot_data.login_data){TS.logLoad("login_with_boot_data");
TS.ms.logConnectionFlow("login_with_boot_data");
n(true,TS.boot_data.login_data,z);
delete TS.boot_data.login_data
}else{if(j){TS.ms.logConnectionFlow("login_with_parallel_rtm_start_rsp");
TS.logLoad("login_with_parallel_rtm_start_rsp");
n(j.ok,j.login_data,j.login_args);
j=null
}else{TS.callRTMStart(n)
}}},callRTMStartInParallel:function(){return new Promise(function(w){TS.callRTMStart(function(y,z,x){j={ok:y,login_data:z,login_args:x};
w()
})
})
},callRTMStart:function(x){TS.ms.logConnectionFlow("login");
TS.logLoad("TS.callRTMStart");
r=Date.now();
var w=function(){clearTimeout(f);
f=setTimeout(function(){clearTimeout(f);
TS.ms.logConnectionFlow("last_login_timeout");
TS.ms.onFailure("15secs passed, no rtm.start preogress")
},15000)
};
w();
TS.model.rtm_start_throttler++;
TS.api.callImmediately("rtm.start",TS.getMSLoginArgs(),x,false,w)
},getMSLoginArgs:function(){var x={agent:"webapp_"+TS.boot_data.version_uid,login_ms:r,simple_latest:true};
if(TS.boot_data.feature_no_unread_counts){x.no_unreads=true
}if(TS.boot_data.feature_web_cache_users){var w=(TS.storage.fetchMembers().length&&TS.storage.fetchLastCacheTS())||0;
x.cache_ts=w
}if(TS.web){x.no_presence=true
}if(TS.boot_data.feature_mpim_client){x.mpim_aware=true
}return x
},reload:function(x,w){if(x){TS.info("TS.reload called msg:"+x);
TS.generic_dialog.start({title:"Reloading!",body:x,show_cancel_button:false,esc_for_ok:true,on_go:function(){TS.reload()
}});
return
}TS.info("TS.reload happening!");
if(TS.client&&TSSSB.call("reload")){if(TS.model.mac_ssb_version){setInterval(function(){window.callSlackAPIUnauthed("api.test",{},function(z,A,y){if(z){window.location.reload()
}})
},1000)
}}else{window.location.reload()
}},sleepMS:function(){if(TS.model.ms_asleep){return
}if(!TS.model.ms_connected){return
}TS.model.ms_asleep=true;
TS.ms.disconnect()
},wakeMS:function(){if(!TS.model.ms_asleep){return
}TS.model.ms_asleep=false;
TS.ms.startReconnection()
},sleepDS:function(){if(TS.model.ds_asleep){return
}if(!TS.model.ds_connected){return
}TS.model.ds_asleep=true;
TS.ds.disconnect()
},wakeDS:function(){if(!TS.model.ds_asleep){return
}TS.model.ds_asleep=false;
TS.ds.startReconnection()
}};
var f=0;
var r=0;
var t=function(){if(TS.model.ms_asleep){TS.error("NOT reconnecting, we are asleep");
return
}TS.loginMS()
};
var n=function(y,z,x){clearTimeout(f);
if(r!=x.login_ms){TS.warn("ignoring this rtm.start rsp, it came too late: _ms_last_login_ms ("+r+") != args.login_ms ("+x.login_ms+")");
return
}if(TS.boot_data.feature_latest_event_ts){if(!TS.model.ms_logged_in_once&&!TS.storage.fetchLastEventTS()&&z.latest_event_ts){TS.ms.connected_sig.addOnce(function(){TS.ms.storeLastEventTS(z.latest_event_ts)
})
}}if(TS.client){if(TS.model.ms_logged_in_once&&z.min_version_ts){if(TS.boot_data.version_ts=="dev"){}else{if(parseInt(TS.boot_data.version_ts)<parseInt(z.min_version_ts)){TS.info("calling TS.reload() because parseInt(TS.boot_data.version_ts) < parseInt(data.min_version_ts)");
TS.reload(null,"calling TS.reload() because parseInt(TS.boot_data.version_ts) < parseInt(data.min_version_ts)");
return
}}}if(TS.model.ms_logged_in_once&&z.cache_version){if(z.cache_version!=TS.storage.msgs_version){TS.reload(null,"TS.reload() because data.cache_version "+z.cache_version+" != TS.storage.msgs_version "+TS.storage.msgs_version);
return
}}if(TS.model.ms_logged_in_once&&z.cache_ts_version){if(z.cache_ts_version!=TS.storage.cache_ts_version){TS.reload(null,"TS.reload() because data.cache_ts_version "+z.cache_ts_version+" != TS.storage.cache_ts_version "+TS.storage.cache_ts_version);
return
}}}if(!y){if(z&&(z.error=="account_inactive"||z.error=="team_disabled"||z.error=="invalid_auth")){TSSSB.call("invalidateAuth");
TS.info("calling TS.reload() because data.error: "+z.error);
TS.reload(null,"calling TS.reload() because data.error: "+z.error);
return
}TS.ms.logConnectionFlow("on_login_failure");
TS.ms.onFailure("API rtm.start rsp was no good: "+(z&&z.error?"data.error:"+z.error:"unspecified error"));
return
}if(!z.self){TS.error("No self?");
return
}if(!z.team){TS.error("No team?");
return
}TS.ms.logConnectionFlow("on_login");
TS.setUpModel(z);
TS.setThemeClasses();
if(TS.client){TSSSB.call("setCurrentTeam",TS.model.team.domain);
TS.client.updateTeamIcon();
if(Object.keys(TS.model.emoji_use).length===0){TS.log(888,"kicking off emoji_use filling because it is empty");
TS.utility.callFuncWhenApiQisEmpty(TS.utility.msgs.populateEmojiUsePrefFromExistingMsgs)
}}var w=function(){if(!TS.model.ms_logged_in_once){if(TS.client){TS.client.onFirstLoginMS(z)
}if(TS.web){TS.web.onFirstLoginMS(z);
if(!TS.boot_data.page_has_ms){if(TS.web.space){v()
}}}}if(TS.client){TS.client.onEveryLoginMS(z)
}if(TS.web){TS.web.onEveryLoginMS(z)
}if(TS.client||(TS.web&&TS.boot_data.page_has_ms)){TS.ms.connect()
}TS.model.ms_logged_in_once=true
};
TS.emoji.maybePreloadSheet(w)
};
var p=function(){if(!TS.boot_data.page_has_ms){return
}if(!TS.web){return
}if(!TS.web.space){return
}s()
};
var o=function(){if(!TS.boot_data.page_has_ms){return
}if(!TS.web){return
}if(!TS.web.space){return
}TS.ds.disconnect()
};
var q=0;
var u=0;
var j;
var e;
var k=function(){TS.logLoad("_allParallelCallsComplete(), calling gogogos");
if(TS.client){TSSSB.call("didStartLoading",60000)
}if(window.macgap){window.addEventListener("sleep",function(){TS.info("sleep event!");
if(TS.client){TS.sleepMS()
}if(TS.web&&TS.web.space){TS.sleepDS()
}},false);
window.addEventListener("wake",function(){TS.info("wake event!");
if(TS.client){TS.wakeMS()
}if(TS.web){TS.wakeDS()
}},false)
}TS.ui.setUpWindowUnloadHandlers();
if(TS.boot_data.app=="client"){TS.client.gogogo()
}else{if(TS.boot_data.app=="web"||TS.boot_data.app=="mobile"||TS.boot_data.app=="space"){TS.web.gogogo()
}}if(TS.boot_data.login_data||TS.client||(TS.web&&TS.web.space)){TS.loginMS()
}else{TS.info("running without a user")
}};
TS.allParallelCallsLoaded=k;
var s=function(){if(TS.model.ds_asleep){TS.error("NOT reconnecting, we are asleep");
return
}if(TS.boot_data.page_has_ms){if(TS.model.ms_connected){v()
}}else{v()
}};
var m=function(){var w={agent:"webapp_"+TS.boot_data.version_uid,login_ms:u};
w.file=boot_data.file.id;
return w
};
var l=function(){return Promise(function(w){b(function(y,z,x){e={ok:y,login_data:z,login_args:x};
w()
})
})
};
var b=function(w){TS.ds.logConnectionFlow("_loginDS");
TS.logLoad("TS._callDocumentsConnect");
clearTimeout(q);
q=setTimeout(function(){clearTimeout(q);
TS.ds.logConnectionFlow("last_login_timeout");
TS.ds.onFailure("15secs passed, no files.documents.connect rsp")
},15000);
TS.model.rtd_start_throttler++;
TS.api.callImmediately("files.documents.connect",m(),w)
};
var v=function(){TS.info("_loginDS");
u=Date.now();
var w=m();
if(TS.boot_data.space_login_data){TS.logLoad("ds_login_with_boot_data");
TS.ds.logConnectionFlow("login_with_boot_data");
h(true,{data:TS.boot_data.space_login_data},w);
delete TS.boot_data.space_login_data
}else{if(e){TS.ms.logConnectionFlow("login_with_parallel_documents_connect_rsp");
TS.logLoad("login_with_parallel_documents_connect_rsp");
h(e.ok,e.login_data,e.login_args);
e=null
}else{b(h)
}}};
var h=function(x,y,w){clearTimeout(q);
if(u!=w.login_ms){TS.warn("ignoring this files.documents.connect rsp, it came too late (_ds_last_login_ms != args.login_ms)");
return
}if(!x){if(y&&(y.error=="account_inactive"||y.error=="team_disabled"||y.error=="invalid_auth")){alert("_onLoginDS data.error: "+y.error);
return
}TS.ds.logConnectionFlow("on_login_failure");
TS.ds.onFailure("API files.documents.connect rsp was no good: "+(y&&y.error?"data.error:"+y.error:"unspecified error"));
return
}if(!y.data){TS.error("No data.data?");
return
}if(!y.data.ws){TS.error("No ws url?");
TS.ds.logConnectionFlow("on_login_missing_ws");
TS.ds.onFailure("no ws url in response to a documents.connectUser call, calling api again now.");
return
}TS.web.space.login_data=y.data;
TS.ds.logConnectionFlow("on_login");
if(!TS.model.ds_logged_in_once){TS.logLoad("_onLoginDS first time");
TS.reportLoad();
TS.reportLoadTiming("timing-spaces-perceived-load")
}if(!TS.model.ds_logged_in_once){if(window.load_start_ms){TS.warn((new Date()-window.load_start_ms)+"ms from first html to ds_login_sig.dispatch()")
}TS.web.ds_login_sig.dispatch()
}TS.ds.connect();
TS.model.ds_logged_in_once=true
};
var g=function(){if(!TS.boot_data.page_has_ms){return
}TS.ms.disconnect()
};
var a=null;
var c=10000;
var d=function(){if(window.location.pathname.indexOf("/messages")!==0){return
}if(a!==null){TS.logDataToServer("www-load-watchdog-v2",c);
c*=2
}if(c<300000){a=window.setTimeout(d,c)
}}
})();
(function(){TS.registerModule("timing",{onStart:function(){if(!TS.boot_data.feature_client_side_perf_monitoring){return
}var k=Math.floor(Math.random()*a);
setInterval(j,e+k);
$(window).on("beforeunload",j)
},mark:function(k){if(!TS.boot_data.feature_client_side_perf_monitoring){return
}performance.mark(k)
},getLatestMark:function(l){if(!TS.boot_data.feature_client_side_perf_monitoring){return
}var k=performance.getEntriesByName(l);
if(k.length===0){return false
}return k[k.length-1]
},clearMarks:function(k){if(!TS.boot_data.feature_client_side_perf_monitoring){return
}performance.clearMarks(k)
},measure:function(q,p,k,o){if(!TS.boot_data.feature_client_side_perf_monitoring){return
}if(!k){k=p+"_end";
performance.mark(k)
}try{performance.measure(q,p,k)
}catch(n){TS.warn("Couldn't complete TS.timing measurement for start mark \""+p+'"');
return
}var m=performance.getEntriesByName(q);
if(m.length===0){return
}var l=m[0].duration;
if(l>0){l=c(l);
if(!o){if(!b[q]){b[q]=[]
}b[q].push(l)
}}performance.clearMeasures(q);
return l
},flush:function(){if(!TS.boot_data.feauture_client_side_perf_monitoring){return
}j()
},test:function(){return{createBeaconURL:f,getMeasures:function(){return b
},reset:function(){performance.clearMarks();
performance.clearMeasures();
b={}
}}
}});
var e=25*1000;
var a=10*1000;
var b={};
var j=function(){if(Object.keys(b).length===0){return
}if(performance.memory&&performance.memory.usedJSHeapSize){b.used_js_heap_size=[g(performance.memory.usedJSHeapSize)]
}var l=f(b);
var k=new Image();
k.src=l;
performance.clearMeasures();
b={}
};
var f=function(n){var k;
var o={team_id:TS.model.team.id,team_size:TS.model.members.length,ver:TS.boot_data.version_uid+"-"+TS.boot_data.version_ts,session_age:0,data:[]};
var m;
if(TS.client&&TS.timing.getLatestMark("start_load")){var l=TS.timing.measure("session_age","start_load",null,true);
o.session_age=h(l)
}for(k in n){if(!n.hasOwnProperty(k)){continue
}o.data.push(k+":"+n[k].join(","))
}if(o.data.length===0){return""
}o.data=o.data.join(";");
m=TS.boot_data.beacon_timing_url+"?"+d(o);
return m
};
var d=function(l){var m=[];
for(var k in l){if(l.hasOwnProperty(k)){m.push(encodeURIComponent(k)+"="+encodeURIComponent(l[k]))
}}return m.join("&")
};
var c=function(k){return +(Math.round(k+"e+3")+"e-3")
};
var g=function(k){return c(k/1024/1024)
};
var h=function(k){return Math.round(k/1000)
}
})();
(function(){TS.registerModule("model",{api_url:"",api_token:"",async_api_url:"",webhook_url:"",user:null,team:null,ims:null,channels:null,groups:null,mpims:null,members:null,rooms:null,bots:null,user_groups:null,files:[],requested_im_opens:{},requested_group_opens:{},requested_mpim_opens:{},requested_channel_joins:{},created_channels:{},created_groups:{},archives_and_recreated_groups:{},last_team_name:"",last_team_domain:"",unsent_msgs:{},display_unsent_msgs:{},inline_img_byte_limit:2097152,inline_img_pixel_limit:7360*4912,code_wrap_long_lines:true,last_reads_set_by_client:{},ms_asleep:false,ms_connected:false,ms_connecting:false,ms_logged_in_once:false,ds_asleep:false,ds_connected:false,ds_connecting:false,ds_logged_in_once:false,window_unloading:false,active_cid:null,last_active_cid:null,active_group_id:null,active_channel_id:null,active_im_id:null,active_mpim_id:null,active_history:[],all_custom_emoji:[],user_hiddens:[],user_colors:null,at_channel_suppressed_channels:null,push_at_channel_suppressed_channels:null,loud_channels:null,never_channels:null,loud_channels_set:null,push_loud_channels:null,push_mention_channels:null,push_loud_channels_set:null,muted_channels:null,highlight_words:null,highlight_words_regex:null,everyone_regex:/<!everyone\b/,channel_regex:/<!channel\b/,group_regex:/<!group\b/,here_regex:/<!here\b/,you_regex:null,your_user_group_regex:{},inline_attachments:{},inline_imgs:{},inline_img_exclude_filetypes:["gdoc","gsheet","gpres","gdraw"],inline_videos:{},inline_others:{},inline_audios:{},expandable_state:{},break_token:false,break_reconnections:false,ms_reconnect_ms:0,ms_reconnect_time:0,rtm_start_throttler:0,ds_reconnect_ms:0,ds_reconnect_time:0,rtd_start_throttler:0,initial_msgs_cnt:50,subsequent_msgs_cnt:100,special_initial_msgs_cnt:100,hard_msg_limit:500,input_maxlength:4000,all_unread_cnt:0,all_unread_highlights_cnt:0,c_name_in_url:"",flex_name_in_url:"",flex_extra_in_url:"",flex_names:["activity","files","team","search","stars","mentions","details"],default_flex_name:"files",prefs:null,ui_state:null,input_history:null,input_history_index:-1,last_net_send:0,previewed_file_id:null,last_previewed_file_id:null,previewed_member_name:null,previewed_member_id:null,last_previewed_member_id:null,previewed_user_group_id:null,last_previewed_user_group_id:null,channel_name_max_length:21,channel_purpose_max_length:250,channel_topic_max_length:250,upload_file_size_limit_bytes:1073741824,msg_activity_interval:5,msg_preview_showing:false,dialog_is_showing:false,archive_view_is_showing:false,menu_is_showing:false,overlay_is_showing:false,seen_welcome_2_this_session:false,showing_welcome_2:false,cancelled_welcome_2_this_session:false,show_inline_img_size_pref_reminder:false,shown_inline_img_size_pref_reminder_once:false,collapse_trigger_w:30,last_key_down_e:null,is_retina:false,group_prefix:"",allow_invite_to_group_from_person:false,ms_conn_log:[],ds_conn_log:[],is_iOS:(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?true:false),is_FF:(navigator.userAgent.match(/(Firefox)/g)?true:false),is_chrome:(navigator.userAgent.match(/(Chrome)/g)?true:false),is_safari_desktop:(navigator.userAgent.match(/(Safari)/g)&&!navigator.userAgent.match(/(Chrome)/g)&&navigator.userAgent.match(/(OS X)/g)&&!navigator.userAgent.match(/(iPhone)/g)&&!navigator.userAgent.match(/(iPad)/g)?true:false),is_apple_webkit:false,is_mac:(navigator.userAgent.match(/(OS X)/g)?true:false),is_mac_10_6:(navigator.userAgent.match(/(OS X 10_6)/g)?true:false),is_win:(navigator.appVersion.indexOf("Windows")!==-1),is_win_7_plus:(function(a){var b=a.match(/Windows NT ([0-9]+\.[0-9]+);/);
if(!b||b.length<2){return false
}return(parseInt(b[1])>=6)
})(navigator.userAgent),is_lin:(navigator.appVersion.indexOf("Linux")!==-1),is_our_app:(navigator.userAgent.match(/(Slack)/g)?true:false),mac_ssb_version:TSSSB.env.mac_ssb_version,mac_ssb_version_minor:TSSSB.env.mac_ssb_version_minor,win_ssb_version:TSSSB.env.win_ssb_version,win_ssb_version_minor:TSSSB.env.win_ssb_version_minor,lin_ssb_version:TSSSB.env.lin_ssb_version,lin_ssb_version_minor:TSSSB.env.lin_ssb_version_minor,supports_downloads:false,supports_spaces_in_windows:false,supports_sticky_position:false,supports_line_clamp:false,supports_growl_subtitle:false,supports_voice_calls:false,supports_user_caching:false,active_file_list_filter:"all",active_file_list_member_filter:"all",file_list_types:null,shift_key_pressed:false,insert_key_pressed:false,alt_key_pressed:false,join_leave_subtypes:["channel_leave","channel_join","group_leave","group_join"],file_list_type_map:{all:"All File Types",posts:"Posts",spaces:"Posts",snippets:"Snippets",emails:"Emails",images:"Images",pdfs:"PDF Files",gdocs:"Google Docs"},marked_reasons:{viewed:"viewed",left:"left",esc:"esc",esc_all:"esc_all",closed:"closed",muted:"muted",back:"back",sent:"sent",clicked:"clicked",deleted:"deleted",none_qualify:"none_qualify"},default_rxns:["simple_smile","thumbsup","white_check_mark","heart","eyes"],welcome_model_ob:{},change_channels_when_offline:true,ampersands_are_inconsistent_in_from_urls:true,ui:{cached_file_preview_scroller_rect:null,cached_msgs_scroller_rect:null,cached_msgs_scroll_result:null,cached_search_scroller_rect:null,cached_channels_scroller_rect:null,cached_archives_scroller_rect:null,cached_archive_scroll_result:null,is_window_focused:(document.hasFocus&&document.hasFocus()&&window.macgap_is_in_active_space)?true:false,msgs_are_auto_scrolling:false,is_mouse_down:false,last_flex_extra:null,active_tab_id:null,active_tab_ts:null,is_collapsible:false,is_collapsed:false,was_just_collapsed:false,collapse_moves_whole:true,debug_channel_lists:true,collapsible_ms:100,last_top_msg:null},client:{reads:[],last_user_active_timestamp:new Date()},data_urls:{connection_icon_trouble:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF50lEQVR4AcWXX4icVxnGf+/5zvzbndlkk520sQnV7ppiMUsNFosXRYm2eiPY3kmvihSxJVAVCv65EFF6KbbWgoJ/ciH0qupFvVHSIhpRWq00sW2W3Ro1abKb3c1Mdmfm+877ejJzMDOzi7sRwRd++5xv9sx5nvMe9tvv4/9dwk2WmbkdvmeA3syCuyWLyC7nujSfnfDsXJIIAEAdNqfpFhMI0gPKAIahfoNaexVoA0DTAZb4rzrgbozXpi3P7zez70XORvKIRkLSXuT1yHfN8uNmq3sjREbWGec/mQ+1O/9o1BcjA7/eqll3xayzHHU5abzOV1Oefv3CLL8vwoDtj6//4TblAAUqqH4B574M1HXzn2xc/B3dCz+1sHHKRFdwqcmWNckmPiKVg5+R6oF7cbVbAa4C34Az3wF6cFdaF1KlANube+Ap4IvQpfX2KdrnnrJi4xTOO3HO4cQQCYBgJqgpWmB+4mNMzj0p9cP3AWXSOl8BdGj9bQMIYACq+lg0eYZ8jctnTmpr4YTL/F5cNo04jxOJCoIBYKTj1AItLqG6QWP2Wd33vocdWQMIjwLfB4As+WwNkNIVHwb/AnSbl/70A1t763Hx5VkyV0ZcQChwzkAMAYCUWlDzGB7VDkVvkb1HnrOZo48IlC5C/ingD1BKPuC2mtMAfwJoXl36DesLjyN+FqiglqOqg3ZrJDhCQq9jgpmimmPUkOzdrJ/7HK3zvwW4FUonIhNDR4FjvIriGPBp7ayw8sYzVoQ9YlYlLhoRzCBqom8aSWOVFIIUYoIiTMiVN541660BPFgUm3dHABgOIICytFTF+weAcuud19i48gLIzGBXNmQ+riPjgVpfDbglrvM87Xf+AjDhfe0B7xfLcEYBGQ4A+/fXgaPkLdaWfoZaQ4xyaitptxD+vWtGMUm/48ZxUCUS1/s5VrQBjq6v1ycjAOJHApRKDeADGgo2Vl41qIpZRjDFycBERCKgYltO0DDoG5MwDIdpRa5dec1QFeDYnnJzElgdDgBAzxXVMtymqnTaL5vLDgoqfVNNKcUMEUAEYbQMgWRuSF/pB8jotV8xzAQ43HW9CkCFGp6RMgMMEFUYbHsg5gRnYAKSpsrY3cMAkjEmKEn1OgUGCATASOXH7A0ogJJzNSydtRlI+rb00ySjlAAbVU0/1MAYaJZNk6YXFasYAOOHWLFSBzjvXEa5cVxCCOkcB0GCRg1EBd2GMCDNSeHNIsT1jgniAM5v2rVeZCSAAdDrtYBXnffU9t0tqpumajf+/g1CamnSUWxIDTCHqqKhZ7V984JzAK/UOq4dAbDRAFNTV4CX8HVm3vsQ2Doh5Kj6oZtM0tRi1YSBKWlOCqwZGrpAi5m5BxE/CXCK6en1yJYADoDetZeAC1MHjrD30GOEfGno1iuEQGr39XH6PI1Df0yak/Wvi3yBPYefoH5gDuA8vfbLEQA3HADAAChPnkX5CX6Cg/OPSql6i4XiKmZlIJmNmI+HAFWHWYlQrFKuHbF3zX9WcFWAH1GuvxVJfjAewAF5N+/+EPjj1MF5Dt3zHGaLVuRrBM0wPNY3SMdhREjXDqyMkVHkK8Df7NA9T8fd3wVwutvt/jhSAG7rv+OxKoriE97754HGhbO/tLdPf55e56Jk/jAiZZAMEGTkLhgw6xKKRSoTs3b7vU9z650fF2ANioeAXzNWYpYzWn74ieUR4NtAo33pr/z9zyft8sK3wGYw8SLY2OtFbiIrNOe+xm3zD0u9eYSBOSeAkwA7PRGxdVJxP/hvAh9Eu7QuLXB54UVal1+n6KwgzmMaKNX202i+n+bsJ6k37wBXBjgdO/lV4FcA3o9sDoBdPpJvvifqk5FzEdP8moXuVSs665boX2uxYaneDCF8KX7v9ggDzO30VLxDJ77uut0n7qhUpj4EHAfmxm7lBfDmYLfd30NlETBg/IbNTk/FOwQBlpcbVKtVQNpAPRksd/7RAVqkmpm50wH6v3o3lNRGdoHb7Xtkf9JNluzi7djYZf0LQppd/ul0XC8AAAAASUVORK5CYII=",connection_icon_online:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABmFBMVEUAAAD////////////////////////////////////2+/LR5bKw1Hmfy1KUxz2VyD2izVKz1nnS5rP////A3JuOw0qKwkCNxD+QxT6Sxj6Txz6SxUnC3Jv1+fGXx2GDvkCGwECIwUCLwj+PxD6PxT+JwUCFwECZyGD2+vGSxWF9vEGAvkGDv0CMwz+Wx2GPw2F4ukJ7u0J+vUGBvkGHwUB8u0KSxGG31pp0uEN3uUJ5u0KFv0CCv0B6u0K415p5uU1yt0N/vUF1uEN8u0zG3bFttURwtkR5ukLH3rGWxnlqtERutUR2uUOZx3l6uVZos0VvtkRxt0Nzt0N8ulVisUVlskVns0VzuENmskVfsEVps0VztlZer0VhsEVjsUVstER1t1aOwXhcrkZdr0VgsEaQwnm/2a9YrUZbrka/2rDz+PFhr09XrEZksE6pzplUq0ZVrEZarUaqzpl0tWJRq0dWrEZ1tmJztWJOqUdSq0dxtGJMqEdNqUdQqkdytWKmzJhXrFBKqEdZrU+716+GvXhjr1dIp0hkr1dYtVOVAAAAFHRSTlMAV8/v/wCH+x/n////////////9kvBHZAAAAG7SURBVHgBvdOxjtNAEIDhGe/MZO3sxVaiIJkiSNdQUPJOeQlqXoCCIg/EU9BQHRKg5CT7ErzrHTa+aBOqaxC/tdLK+2kbj+H/hoWhlCmQr0HeyYxyM8mvkWHKoAfBS6cBWEeYugAzf4QGp1SV8DvU/ZjBdN7iud6hdnOTdl+TuALyrUPEwfdu3nc1ipr9AwdIFZPysJylRDfa6cZL2rfgMd9QjO8R0Y+/u7sa4LHZz4wN/MXEyw1hbK1VZdV7PZ1OyufzktsxXADCW5EkXq06Paan02Uoo3kHmAEzJ8HBN6v5qlkqaxTmCdAzQK8Noi6rXwCrJyutepUMAARnXS++3cvm2xvftR0PzAyQAXtwdNChifvFHppBdR003IDCIg6JDOse4DX8WIdo1TwfpaUgqWC9c4eqqg5HF20QZdAMmDlasdHWkrKR03J0A4iIXRTrpba29laiY8YMyOyMKYkXroyROZZuwVTyztAFJPmZKBGq+FxFVBr5BHr7ubd3GICfAM+88qDHHYe/BmbbIAaGKU/Fz10emDxyHxBhgJTg+DGP3O3QbltMBkd92F2H9sWxB772wo9z2z8FfwDHWbdKLDfq1AAAAABJRU5ErkJggg==",connection_icon_offline:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF30lEQVR42tWXW2xUVRSGT8EihUojBUJvM9POTC+gBg3GF2PUKEQwUaI+CDEkGhIfeDL6LImx+iDEK1BoS8t0KL1RaEtbC4W29CISEEqRB7AYIFp770w77XTmnN9/DWc37WR0SMEHV/LlzD5n7bX+vc7e++zR/ncGYAFZGAnzWcx/mTjmvn3JQ0kcnhT9/fHw+dKmPJ4sv8eTHcLvz54aG3NiYiIJuLU4iuj5JZfgQX/wDQB7yXUSIAbRiZiXdJEvA4HA8wDiZwuZd3IAjwaDwbcAnCVA0I/gyBCmh8jg4AwBtnXPCEybJG5MT6+PIiJq8iXkCxIk8N3pxe3yfFzcst7oTI7V2zVN7yId5HzOcqNn5xb0t9RTUJ8S0otgcGu4iOjJ1bsGviIwfF78XldptGZqRpOmGWcWLEfrokSci1uJ9sWE17bYFWjRlqGZz8+/vtb463y7EuFhBT8Iix915LG6rn8GWmC4D927d+kneLsxIQWnLE40O9agxbkGrZlr0WbSyvZZew6aUx34UXscjRTSW1NhzBLxTlQRyoJ+/5vSyZj04vLuXUY1+9RbnWh05qApIxOnrA40s30mjGabE6ftWWjKXIP6RCvq2K+3rlKJ6JHVEvFVqJtqtqsJd5Ody3mrhqM+6cimCDsarRwhERGnmXQ2TeYz8WnIWova+BTUsBIDly9ATNeRi2vXFkWsgrphLjV4b//GxJpRtSwJxx3Z/G1HHamX4EQJUcwkJiet9CU1jhxUMXT7h1sM3TcO2l3uH5nhVVANNfH2IuDH9SN5KNUoIM2O6nQHjjO5iKglTCBClBjhXtsiyelj+h7n66hKTEYF4wz2/AKxILAtfNDyY6FcJ4eHLbLJ+IeH0LDxCeOotgSVGQxiycAxIiJOKCEmMlJBtWtMH/E9ZrOjkqLKKOBS7kcITnhAKxwYGHhMDXyOANleAQR8Q4M4ulTTS7U4lHMUFWnpqEq7J6JaCYmASlxtChbhFZy0rCSatm7AtGcUtDav17syogDZ1wEYE9zZirm5uGPiUObIQhkFKBGhaqSJEIVdUG15FvKrJNJHBuBmitqN6+EfHQGtkwJW/ZsAXQQUUUAJK1Bq5wgYSESUixAJblI1h/SZ++Xib1JKAS5ZSZueg38sJKDD29cXWYCsU9DGKSCfAoq1xSihAHeqDUcY7KigxCjMhIoy00dESx83XwGriepXnsHUvQp04Z8qEPqkAl6ZA64UzSjUYnGYAVwUUELcEnSOGBuZ+5vPxIei01HCe650Jw4xRcN7r6k50ASPJ1EJiLQJdflHh9GwfSOrEIMimwPFDHSYQWeEKESMEHZPfFyCNQPFyVappnG16BsYUz7Q9uDOnbg5y1D9kMOEfM8Jbp6qxX52LFidhiIGKkq1ojjVRqwSPCKHBfEjRQL3j8IliSh6RNNHbt2AaZtVzohbsXmYmJzo/xPlLyQZ+7VFKOA8KEixoDDFikOCSiDJTFRbnolPocWGApsTexm6I/cTw/BPgnbFNzSUql57RAEA4omb4FbXOexjFfYnrEa+IxP5FJGfbKEYK2GSMESkkJ9mo3+WVBDupzR9+OZ1mLYjfBeMKGKaJxkAvQTd1WXGD3y0j9/8AxlOHLTZmcAqYkIcNAm1OeqD6XYc4LyRkRev0IzbFzpV8rrZ6z/qGTDIkwwAD2Dg6olyQ+bDdyIkYQXyuPTymEQEHUgncmU7L8mCfUsT8S39XE9q+qzk3dPT4+uingXC1QF4n4wR3L30M2q2bxIRCnxP1JVIYiOPtH7+sTF049eZ5OC8Ch/kfYuQkwyAHoLAxDj+6L6Elk93ouLtl+F66WmUvPosXC+uQ9W7G3Cx8GsM996ATDhVdr7OdVGSRxchO6QO5EohQkLGPZgaG8UkdzaFtHWuc9OukB3yzueVPFInOcnIYQLANlJI2kgn6SA/kSayh2xWS03FeOA/J+GzVr7n8kklq7zevlXgVbZXtcNFO4Y/uJDofgvDR/3QhURiPkn/Bo/wqzC0qdolAAAAAElFTkSuQmCC",connection_icon_online_away:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFb0lEQVR42u2Xe0xTVxzH2ZZlWfxvW2YW98f+2OaiidmmZlaglEefvBRE2RwjguJijKJxDpzipjiGL0Kckc2Z4OJmKW15WoRKsSqi+CA+shUqMnUOfJRy21IotOe7323aIGmujG2JW+Iv+eTe3nPu+X1/v3N+556GPbX/hQF4JnB9jVhNHCF+w5iNEBbiIJFATAm+9285foUoIVx4jDHGELBuIod48W8LAfBs4BpJdAd9/MF1otlagp86srC/TYxv2yLwfXsc9NfW4mzPIXBD9/CIGYjXg+NNKmrevF5vFguE1ee8wSqvbEKxORy7T0tQ0hqF0lYx9rX58d/vPSNGCV2NXfsw6LGzQFbuABAJixBOezLhZfCi446RFZtl+KpFjCJzNHaaJSQiKuAwivA79z/beSoa200iHGjLwN2BzuCc9BDTA+M+J+g82Mh3DryES7eNLN/4LgqaJSQgBjtaJPjmpIQcRWEXQU4DjiUoJmFfU1vhyRhsNUXQbzm73W8Bbz741ABeGsuEYOR9UwDsJXDLZsEXRhHLaxJjy4lYbG2OxjZTNApbyJGZhDxCUdA5tVEfEhCLvCYR9rVmM8ewDbx5vZ60CaP3eDwzALjdoxx+OJ/Hcg3zaKBYEhKLzSdi/INrO3ag514n7JwbtgEHHtj78cvv7TjcvoEyNYd37hecb4zGuob3YLZqAIwSaHa5XFPHshA6788TmwlY+i5jZf0stq5Bgs8bZdjYyEcWh3M3jOAcw3g4wPmdj2cAx68fJsHTsckoRX6TlASEY1NTHOMCWRgdHY0J+gwpOZfr3lRe5ZDXhUPnC/Bp3TwaQIrPjiuQa5iGpusaOJwe2EKd++kfcKLX1oefL+7BGsM0Eq6k96Ox6thcdrq7Cj6MgKzQarW+EBQxLv3cMPcWQAF67KR6AcupC8d6gwor6mZgf2s+bvZ1UdoHeWeCDDiGcOFmC1VCKomIxPoGuT+Q8gvbMewdBFmjw+F4ORj4OAEOj+MdAMw+ZENG1Wzf8tpIrDUkIrMmDLrL5RT9cMCRMP2cC7fv9+BA6xZk176JdYZ4rKgVociUjcERB8jOOp3OV8cJCN6MjAzOBcD63TZ8qJ/ty66Jwqp6FVZSBhquaUIECMH3O9JehvSqMH8Ay2pEKGyepIDFutm+zGoxOVdhee1MGK5OTsCP58uQqgvD6mNJyKyej20nQgQITwEvIEU7x7e0Soyc2iQka8NQcbEczr8gwE5TcIumoPRUAZbop9P8J2Cpfj6+NGbDJSAgZBFyw3asqU9hS3SRyK6JR4puFnafzEd3b+eEi5CjRdhmNWFDQyoyqqOQVaOkbM5HWes2oUUYWobuUSdKTxdgQWU4PtbL8UmVCmm6N1B3pRLOx5Uh56Iy7MXBs3tI9NvIqo6n6OMomyJmtOjhZaFlKLgRXb17CfKK91maNpYGUSJdJ0VOjQxmi5HmWHgj0l46TBHPpCpS+knVRmFZtZQqS2AjEtqKXSMcdrXksYSKCCzWykkAjwyZeinKzhSi666Faj64FdvR0XMOxaYNlKkIEqzARzo5vSeFquID1F9Twye8FQt/jG7ct2CRVsySNbE0mAJpWhmWBCEx6eOhZ2PtfP8kjRgbG7KY3S34MZr4c2y2NjGZeh6SNTKkVCqwsFKOVGJRpYwEjbGIoGd8G/VTIpFE09phfBC8+XwCn+OJDiSUOhLRyNK1KigrpEiqUJAYORYIooBcHUNVlIHuB4IHkskfyXoedrEiUz4U6jio1ArEq+VIeIREQkUspEyVnysF5+4XOJL9s0MppfRXHGzbjdz6FeRQCdlRmg5NIrY05uLoxe/wwNEreCh9osfyJ/fH5Kn91+1P0yiqwz6mfpkAAAAASUVORK5CYII=",app_icon_32px_green:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lJREFUeNqMVk1vGkEMndmu4MLmkOWQoCqkh0APqAdUVNpKiXLux/+tFKlSDlEitcm15RI4BBBiucCFjdDUs571eL1L1EEC450d28/P9ujvH7+qbBljFFtaa9SgAN9ij9Xnb/LNdBrKIUn0rNKGKi1vvkpPQqi0syYiIBvlN7lt2kM7C6ErE2gr6BfcpCXO4mg4AURlCg6ZHCIrGuk1Kckp/q20P13u1NknW4E7VMkAreE8ONTLEA0Lpep0jDvgSReZIGRQbkSNuBnT0+ggOowP0X3uB0cC1qvu6453Te8lT3/Qv7i8SLfpbDrDN4efh4MPg91ut1gsMBprqYSEY1EledA1fNo+bcN3kiS0HzVgz7pMwGrJhRBs5glS+EuVQbkDZKIoAmHyOEEP2m/s6WmaJsnKRZ5XoijJkIrAWtKG8sP5dNw6ds46Puhmswni+HFsmclKnZe9M0BmiXD4uFavdbod3ERC713PRZDhA2GhJlkmmBuOj0vkt+EXbhl5BnY6bzvDT0P1f+v25nb0Z8SZ6rikMwO51gcGf8G7xkEDNtRqtfPLc1Be/7zebreYkv77PghXP65g5ypZWT3RP3ufjIWeOb6A7LPNZrNerymfIE/GE4wSKgAZNX2aenIrhwF5jzZCOpg3Ly4jf1bIlozsWF+zpxmxQ+liN81UWBaBMrIjOhpoZwkpBGl0hW0U1vNmvXGFooycHMbHFJY7OO4jwqAB6BOkieMYM9GrW818Oge4CuzUDCIqcW4GDsU00iKm0jrrnqFw/+t+uVxyHhZA9jRlZuAvOg5wgyXI8N3NHb55cnoCxgCxh98P6A1gBR/uIkc7LGQ4xx0WFA4lAEAAwuA76Ph85jR82ogJmje7whD37RBfOGodYYaJ4GgSMKFZW25BHiiVzwMaOx47KLF6DfPpupAxkFioO99Eiye6GhYRFEZYcdi2Wi0sMYCYJwYCek6fOdC+GRt5zQmlC8wSdGNgiG3RxlX46O8ITfojlBHDkuLwzU7cscr1LLqhd5y3hfK8Iogq7lLZ8jZK9zU+9co3KK4P+LnCca9nG8T9RedLXBL8tUUMIGwvojXtc99dthiqLnoWViADNHvvAGL2uROVFtcykZjwhZdFcAJc6TjbwTEM3QAq3lP40VSThRxU3U0rgf0nwADpJQebhAz3/AAAAABJRU5ErkJggg==",app_icon_32px_green_unreads:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JJREFUeNqMVj1MFEEUntlsx1FzQgmXnI13JGA0XIWJmvgTEzAxBhXbw0Rjg4VWamFLIjWGUkwgFoIFNkAhJN5VHGEpMVBz1OPbfW/evJldyc1d9t7Nzrzf7/3o+9fvqmwZY5RYWmvcQQKewZl0396Uh5kb0jFT/K5QhsotJ75on4lYaZIWWMAy8jelbD7DJz3TlYl0SugL1OQV8JLeIAJIZTyFjHVRSppQa95kpeRTacc9PKmzT7YiYqpCA1PB1jjcD000wpQi7mh3JIMeRII9k8eYp4oyUg/pCVix5zJdAFAg+kp98x/f1Mbr3bPu45uPkN3aznd4tndb716+ZT+z7nw3QhTltaMLGa+JGw3gjuzw/JWxGp7s6y+lKiM7Gwp2XWoByLQBUvjLmcEXRqojyK4FArIzvNPea1G8tZZ3WemYzUklaWejxFNtrE7sMgvg05hskMjfLSVSXaY9CQhcJiMGXAYGB4AoD5VxZ2KygRYPWwtGqpVKtQI735ZXgiyhQN67dkdKplAbNf3k4dPmM9XbSjrJ6+evJFIJSzrLA7trI5N5CXXvcW1vbiltPSrSIs0VsCBwnKEkpUjMzb+49eA2EIufPq+v/oBjUzPTaNyXxSXwDOqbL7pUTW0KK1m8JM3uTg4SxG5tnDB6+veUqoBWQT5hqOAZKRNWRFIkMxlSjBGZ7B8i2J3IziGKDDsHwT79G+crOPG9XIG/jnsnwVwr9Zfgi5vloUvwPeokkOEeOrVIWOhoaIvMZ+D1fuFDjxHm+uFSSjg5MlzDtSvUAO3eIXRyfBIEkksnJZos8Sh8ZfkrhBSI2eYsehwAc3RwBMTUzBT6CvDT3mvDmfOzrqxCxu+Asd/EDQOitftHxnNjdb3bPYdLzfk5wv6vrWQ/8Qq1bNS2vsZeERWRAHq4OsxOAEdjhMuDZQuqpKCRcA5bvMZeC/ObbX181CuZWtevjrqq52tNrHMZF8ms81ouVIuhAcYoZjjXD6jbdIUbgHEhlO06LmxhqALwPTleAv9AqcFXP9c20Hs7m9uyqJFOHGqR2Ronu8KZR3g21bZwCAumIzEREPqjoDbJHHH7/3EjR5hfSYy4RPPGN+VyJGh+8qScnaQRqB/PWPA3Cg00xTOAlOFxVDoYyyRS0yBfcDkwzjk3531vBDZezYjxV1nMkY2y//DMI2NQNJsWOvafAAMAxE3MJSrFyPAAAAAASUVORK5CYII=",app_icon_32px_green_mentions:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABExJREFUeNqkVktsG0UYnpl9OF6/4JDYaWirNrFIgTbvNEilByS4FHogQeJQoCcOidQjiF6LBGcEnIs4cABBKZeUQw+IQkUicFDVJo0TJ0gtSW2paWLHr90d/t2ZnZ11TBubie3Mzu7+3//9b3z2xdeQuyilKLhMy6yb8KmVq+VLPT0j0RhqfakgF2MMO/YrlnfOYa098PsFQJjLamBA3SVQdyyrPQCCHdWbMJCx4PtPrdYmA64+osgjIJA4MMKEkFy10iYDLgv5QoWtYA+i4Qc+i+Xy/wJgPBo9QZ0PcWHyprVU3m3LyZJXGQ0B46huExAfiUSmzk2VCg/R3VzrDHCTDGBsYKMQomAyOjH63InnN48e3ia4nSjypLJ48fHYLeDR198XiUY6nk5cteotA/iJxv48T7gWc6yvEGVodCgWi8UT8av37y+36AlVeJgpDtEqwvTUy6e6urtM0zx45NDWw61EIv7C8MB3j7YvVMwwwi07WbiXZcTU22++M/0uXAFAtVI1IkY8kXjjrcnNjc3fF7On/7qD6b4BuPpSPgNG8kCSPQEm0jTNMAxAqtfr8M2nj96s1k4urZJ9FCj8+sQZBiAsQxHnz4w2/f7MK2dfrdVqn3/y2eyPs6ZVP/nSxND4sLq6NvLHrfiTbEXEA9Rb2NszQn3H0uBqILGeW9cUVVXUkfGRzmQnerbv43plfmf7SSZyFRYkRBF1vI0wRCfEKJwAxtrdHPyqSD0+fBxMpev631vbF/P5gXD4vVR3Omw8LorkngPSHbnH0nAJ0tlJdjE7MDYIJx1GONWdKpV29ZD+zKGDncmulbX1mdzqoGGMRaKnE08ldT3gA+hoTFk5n0HWpU8/aqza7rJtm8VVpVIpl3aLpVLhQeHihQ/h3LJNeKBH06KKciQUUjGGa5XLxTzT2GW6P90kHljxUBSnymKiqqquaaFwR2Gz0KGHbGpblgYK5Kn9wLRzZpnFixpoyJ4zvv3qm+xSFjbnp8/3ulb68ovLK0srsJk8N3lidABr+MrX3y/ML0DfLj7a0VTNIUdseMB2Mwl7MtVAlrm2YpeZuT9BASYd1rUrs8ViCV6a/mCGUbn582/Lt5eZQhBaTEvgwaIGds4tTIOZLHkC9r39vWy/cW+juFOETTQWTR1IcbffyTIkpylRN/wwJRD3DIBwk6h+FdozXgyODbHNwnyGnQ+OeydzGT/tRfOgvPo6ogi/RURoikcFiWQPrxYQo8xjon5k5jKiqPDXpXxiZvZ94LewIBuQu3HvMtjnxvVf2K2ffrjGrPfr9RtckNxCvNEBS/UDs8lOToK9eIiPYLTpfNYwi3gFjY8pBAXflPu+f/4fZhSjgrjV0A0DHU0gixdkiXIUyPpSRGUSckfhg08jQdp8BpAxAhIRlj0n93Ze7B7zcgM537h7rO8mqTxp+jZU2X/kxZxcsQPAXq/2WneAVmDUDBr2XwEGADZFpKJDFtSPAAAAAElFTkSuQmCC",app_icon_32px_yellow:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6VJREFUeNp8Vr1PVEEQn3m+Ais+TOQ4TCCeARMxRyESC6EwkUIDpf530kqnJVZqZayMFBI5wpGAYMEdDZzR3Dqzszs7b+9gL7k3b97sfP5mdnH9yUvwyzkHZiGicISg/0yG+XGnFVZtQpdK6behNmBgJfPD+EqUgMFaFoHaGNxpbauMSlZCB1cgE3iNm7oyXTYbgSASXMUhF1PEpMu9VqY6Zf8Bk/ZcEv3PryIohTxANhyDE34eojOhDNMucRe26FklNDNCj4/CdC3pnxjD+mRw3/phM0HrxvydueQaXgmetVX3eqPf60GrLRtxY63/4pn7+w8Oj1CiYUsDmQgoGgoecU2+Lswz/+gEVN5zcL/tXdbEYo6FkmzGAoE8tTO0dpSZ8TEmdnaDgwvz/HrZg6NT3ib67F51ukiNJr9YCV+usO7OsHTrAAMeEKdrrHfnB2uCak9k+SjVrAJO7N0cgaVmwPXjZqjP02XnI+5LxibGiMM5o9S12i7rkliDgdkgSh/eh+erfUi5w8asa8yC0ML3HH59t42ttnE0ZpuI0uAXbXl/HsCbLepzDuXVOou/fV9cXPKueo1AxbY3tyjD8Os3Xlya5mKkpimZIsDUQPytew6drov1xE6XKyw+3hpn/vEJ7h3ITielCc0EaVzQW6mKhxaKaI8f59ESwD51m01STsIkT3Mg6vEsaYtCuzzlR3CFYf89zjtSGQO0XOjns25sFHD5yRFgH1OUTXCRW1kmMU50w2N0YhQJQiJWr3EE9RqujPAm6u3jU9M9Jt2cIm1xa6YxQxBysSK8lhbB5NZzmoIx2P5YUHzqfna6lGn2IqiZ/UPc3GL21CRPoU6XgSguPphzS4sM/A+fCu8NnJ1DVkjbz2WlwjHvtChwHwqDYq/NgJE9j5reg8ixp012gsqnonqIm1ntaSnA8Yk0ecien3pOz1oFSLDHuEpIKSqdbCpBNLVYnQGDFIG4RPi5yYXloa2TMY0A6eEsgsGjVZ3yAKUCQOc88L37VADs/al4nVS7VG3Ba5m7YEpE05gQ8n03jnGAr99YA5lMZQSXHZZqLA277I6lNqiMYRjET+T45y8QnDNDLUQfzw/b2eXgzUejSSAZuK/ZsTh4g7L8wurNBlHiG4Hs/hLPJMwuCenaUmnxeOBko+kq98Nlq4oOPVGEU+QBuivvANnZFzQCZtcywMpMKa/ZnAWXJTd33EjYHJbyhOo9xarWu2WlBsPupkMT+1+AAQCmPwV2bobFnwAAAABJRU5ErkJggg==",app_icon_32px_yellow_unreads:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1hJREFUeNqMVr1PFUEQn9lcIc+ORylHB9gBNpLY+dEISKWhNHYWdhb+FRaa+CeYWJnYKVoJdAiVQMc7Oh90go1vnX2zOzs7dxj2JXfz9mbne36zuLa8AuPlvQe1EJF3mKCn4Qn76aRmFmlMV0LJt04d0FpZfde+EBVg1GY8EB3tk1q38Ahn4Tp4h4HA/5gpy8jS0YgEkeALg3wKUSC9tVo2xSj9BMzSLSeOf+PlolCwDgbFyTnety565UqXdPbb6aSbTEhk2jVWmAJe26EjQasqQoYdBUrExDX/7Kmfnx2dX8DLV47FvX39l54HR/jmHUqcxXY5G6uos3jYNPq6tEjSA8/BITL/3Gzk7PUCH4g3aGuhohMpQcBv6QzJ3fR0FHd4FHnqaZ92MOYbUZ8Vo11uNP6lTIwjFhebLx7QztJiVPnzIJtv+oNXZUKmM3ZrwU9Ohs2pfuReXGDOUX0jSqlrmKmDNV++2i5JOWgVBoflwT14tDIyuVlf9QCFgetjnsEJkoJsaIo2EU7Vb9TMldDvdyDHZWv3B3Do2Expi9Arq7cfarwELgpV+xtP/J3lQLz/4L5vh2P373p27uMnMhzZ3jboxipKLQydiSJaCqY5ifg1l3J+dparw/QTFyc9XXZHyp8NGbtMLSb5PB5E/BKVx01UaSdHLPvwt2ojeJRbh78ia9AgN9f1nu9NRGOpuqb6vmmQOlwHWRwKGaWJxr7o+iVZL56PrphhwQ+pIh1k5wXDMQP1TH31CoLhEE0iBTpzHwjEs/LPmxQT0g3razEHVDDNSThAJcSNTfVDSEc8FxcZVPQEtY2m4XAMk+GYZHhrG8//BJzbeJxqfx8HA3HaFqjgqys6WWWC6Dph3PA0BJpOU3qnUgOSdCNRAL/woBhh5bCdn4PkTdy/OV+CqAZOhodWxznddcXIhWxs08QOZ+wLIHqYZ0YeZJinZpGD9ghjEwYN/Bri6Sns7kUM396hkI6I3tsvQC3aJKlWkaraNx8J6NaOS+5Hnt/nfvObM1OvfYPS+85gk+6RvH9JGKXe5ZOuETvRRLMcMMNPc+q7k0ZGPVF4x1kH/aV3ADP7ZHiYa1meNiYH7cPGORNca7ji0DGs+A3lPaWYP3Ln0Tnoupt2BvafAAMA603M1k3efM4AAAAASUVORK5CYII=",app_icon_32px_yellow_mentions:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABBhJREFUeNqkVk1vG0UYfudj/bExbWo3kJLaKRWO3aaooIoKOMCBDwlBI06F/oEeQOIHcIU7N34CEieQekMIkBDtBaEgDk1aRIgdRGiSpqSpN1nvzPDOzuzurO2SxozX69lZz/vM836ThRffhngopSA/IhH1I7zCYD/4eGbmQuUxOPzgKJcQgjNzT0eybmHFEPyjAgCxsgYYqHikqPeFGA+AEn30EQxcLPz+FYZjMrDHBwUJgRTJAgOhlK7s743JwMqCTGiqK5yjaLzhtRQE/wvA8Bi0hNIXjWE2IrEc9MYHsFaN1ZTC6KPjl1K/RBbepJv1u2MBkBERYNjghFHKCD13lj59mv4xtf0PhON4USLV+EuGZ14hh0ad+WVWrNAvg/VDA2SBZj6JJTRMrH1G2ZkWmZjglQq/dmfn9iEtwVon54adx0wuPAfzZ+WpWTh/DqRUeG3dVUti5yI95hF6aIBMdHx74zW4clm256DVNHrT+ntyWvnV/hrsNnePZbo90Ivs8RMMs7NWs4QoBY+TcolVfH7kiDc5Wdid3vt2alXAI2UncumFtwxAqhllOVhrv/eueumi7Efy8y/ghxtRJPrPzIft5r7/d/GVtVNHqXewm7rZTSMlc0Noto4kCOd0fZ16jHPG59terVoIZ8JPdn/76f7OQdk0PnBKIk2iqHNcLpdU46TGYpSs/YlOhRt4q6n6EXge6T4QH213zpfLV6dPNMv+QwAcx09PreU29GOjblZgtUNacwhPSyU1VeO9PVLw6InHRXWS3V7vf7Dy+7O+//xE5eWjk08UCjkbYEUzh3XjuTUHH74vB7N2/F5IJSIVhnI/FMGe7AXR9rb49DN0YilkhEJmPK/C2FPFIicEn7mVS2ykmcfZxih/0ElF64pwncEZJx6XxQK9d0+VCjpOhPCUkhtK3onkShQYf+G5gpwY4+tvoNPFIId3FrQN8M1X10h3TfvD668qjAw0+3ffw81lJoR80FOIhLsk1aRlnDRJIpO7Cc7oyjwu3dIHMNJx/HidoN5x05XLlsrir3R1Fd1B64AzaU6JPIzX4EwLJIrnlOBYAuf1up1vbkEvZuyX4XjNmr3TsZGvi5KK3Y8oin5vAKhVCU+z0HB70W5Bwsaun2lbyOVb2T+z4qFs9tWiqH1FU9dM/5qSOJ5ki27XRni1alduLidbkhrlxpNRc2aDrITl2XS6sLFJtrbg50Wbw6/fwNwlcb74SyLILSFJ6+DmQWI6OzcIhvHAtmBqZH82kOSThGbbFAr5nW5hyNYfosa0VUhfDVTDXEVLkdMNrkTXC9zzKlAuCZvNwGl8Bgmq0T2Ai5GTCMS1nFvbbbL7j80D5DLlDmk/DlK308x0yM0vJD7nZuwcMKicDfK0cq1mXrH/CjAAfjaCPa5V5tYAAAAASUVORK5CYII=",app_icon_32px_red:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2pJREFUeNp8Vr13EzEMly5uQl+nlKnpRrtRNsp7DO1Ilz5W/gZW/iG6MrLCyMhIN9JsKVvDlH7dRdiWLcu6K27fxaeTrY/fT7Lx/dtziIOIQA1EZAlP/NPoBHleqZVlN547mcm3QRvQG8X8kFwmDjBZMxGIjf5KbVt0RLMKHajBMMH/uCnD7KWzkSZ+ClQ5RDlFYUrWaxGKU/oJWHa3mhj/4mjSpmADDIZzcCy3IZIKZWh3jrvRoBskJDM8nzawPyr7745w1iT3tR86E3401XZAg+Txr2fP4NMOHbmy8t2EPu7Aybj4J1mWHPiRWDRIHnaNv/LWyw2IPksWm6AHkli0XHA+Xxkg4F+pDMFu38E0hnr5mDw42grPW4JlF5bxfnqtOO2kCIIlJMFH8+lFzPVVK3zACAYFewFV1NVa/GMDJYNUIbaNcDxOlt6Mk7bPOGtyfnYbOJkE7WXnzZOpklzJvd7AaXm1FWDUXw9c+AdVSlESXr/e4VUEVZiatDAayFLU8P5u6fM6ZMOH8mE7qH+5xXV0ajbCs2j7Yh3w+7PB9UYVV2BqYWOJAEsBhW9/CVatnxLjudrAZcsJx+cR8OsO5i1DRQxNKiYVo39zsrFuXno+jQgHgub+tRcNeMyFHYB1N42iACf4QiPbERMNMK0/jNW7bHNhU6rnm00uFCB7ciTa5xSZDs56p5MUx4EQJnNpFg3MHJ5yKB36dFXsRJUidoGtiRm/qaHQ8dh28uOtpPDtHpctifvmdHGl9yKImUWHF+sg3hvR2SQg7InIfrx05I154n+/T3y7iRQyXUiy7SqEc9798IHHUAIp5h3Ocx29jqEsskTaWGmU9Qno6kOchBC84GAUntctpQLzJhnzjuSs7begkiigpqpkhQSXGOM575JLnj/bmDgqnbG0ACLL19BN9RFWH7aHMT8egFWmMrcKD8Bd7AZV4+QCI3vNcdYFZcl3Y8+QX4+pnfvHz4egsiKVE31GCU2wxsDcscSGh3HeVn3wDvHHAx+uoJtaCiKfH7qyXf/mI9EUOvfua7ot9m9QWt7ofU0jKnKlYO4vmIe5JJRrizmAuL2Y1vSU++mypTqjPlFY0tgA6ck7gDn70o6A5loGul9rDPqLTXAmudZxpaFz6PgX6nuK3lpqssJg6G46mNh/AgwA1LYLPz5hMyUAAAAASUVORK5CYII=",app_icon_32px_red_unreads:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzFJREFUeNqMVr1zUzEMlxyHtincsdDOyUo6Aytz6Qoz3HVk5y/gr6ATQ2dgBWZYKWvDDAsDaZvmJUZ+smVZ77UXp5e4sqyPn76MR08OoV0hBFALEZnCG/o2PJGeb2pmkcZ7Lzs569UBnVXU99Fl4wGTNuOB6Oje1LqFRzgr1yE4jBu8xUxZRpZGI21oC6EyKGSI4jZYq4UoRulvwCLdcmL7aZdLQsE6GBVn55huXQzKlT7p7LfTQTeREGS6OVaZAkHboZGg5SvIsCdBaTOC8PoeTH2YBzj+mwx/fz8enS3h7RwEZ7Fd7qYs6k0eNo1OH90h6cDimH86TJy7LvKBeIM2FzzpzAEC/pXKkNiNs59nTeIZDxSF442o74rRrhQaf3IkWsTSmoqC1gOikE+KUtWEwcMbyHTEHg/hgYvEvZQKQHLZY/FgPMDJIHr18SqYKskx6CQGw3K0jc93bGxe7ABAqCnx39mKFChDM9q0cSp/k2bOBLZ9w/XtOkHHZkpZxEou5pcCimcnl/DuIjK+GsHTrUg/ucDPi2jjsy1g504vo+FsrzRdVD62dYC2l5lGNvZpTzhwsj/MVv1ZR2mqL5R64lDRtyvuSPpzXrUuj1Q8z5sUIMna81WqLzs5UtrHf323g7Pcia+yhczn4trF+Mdr3+G+oyOc6+pRcEfEaKKxLzp/Sdabu5tGWPqHZJEG2QXp4Vga9WSAm6fQ7zWYQErrLHUgLZ6Vf7gK5DhppsRnlChhfq3ihcPtwIVN+fOziTzzdWkqeoLaQtPtkNaPpo1nBurLAubtpZejnPtLmDWCe9WCClCQ54GMnZKggBJhAoGAptsUXmkbswaMRGn4lQfVCKuH7cEwFU1qmYgHQzCUaoKGquL4yOlpXo1c6haDUBmr+gc1UZkZZZBhmZpVDLojjE0guaeriA+1Gj76ep1K9/sSdFNLNkmoFVK++/IRQElcdj/x/FuHTws0U6/7gtJ0p+WaRlToN8Ao+S5HOkfsRBPNcsEMP82p3066M+qJwhRnHQw3vgHM7JPhYZ5lgNVM8rdcNs4ZcK3hikNj6PkX6neKFl3ePDoGfW/TXmD/CzAAcryyBfjeu1oAAAAASUVORK5CYII=",app_icon_32px_red_mentions:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+pJREFUeNqkVktvHEUQ7q7unp19xAkHJ6BFAhshgeI8pAgpuSAO3OLkCJw5cOEXwBX4F/yAiBMCxA1yyQWUG4kEIsoGoyiWDYg4jsc7091F9XRPT8/YkeNlPLvunUd99X1V1VX8+pV1Vh+IyLqHNrrSdJbFvPhsOr00OcGOf0iyyzmnlf+OR3M9wJoD8M8LwHiw1WOA9RFRnxizGABw5/ohDFIs+jwqywUZBPcZsoZARArAjAPAbL6/IINgi7VGo1a0JtP0ReevRfG/ADyPfiTQnVDDbGvzW7G3OECIai1ThHGu0wdgzPl7Y3i8+89CAPyQCvBsaCEABIeLA/FGJh7uPd6pykWyqLHq86XF87eIw0oGIyEHnH+9vXlsgLbQ/F8TCQdTqy9AnM/ERIolJb/9d+f3Y0YCYoR9CFK5Liu2PsCrOZ9KGAt5Qqo3c/HVo43iOEUne9LHUF/P+ftDx0IjKw1JJJakvDZWW/Py1ubs3elrrbZHMgjuN/Xs31yGQEWQFwBDQSrJk0q9oFSh57c2N55zd+LXLl/1ALGAkQXfvFwfjtg7GVbWfrmLPxSVNtUlVq6xciAHV868siTV0Wma7m4OqVl7QqvS1RqReIighJRCns+z5UFmTPnFg3u3n+wcFYPa4UgibqIUCbo8Yrgi3COE8YdllFSSybNDXmmmOGzMq0//3LgwHH704kuvD0fPDHLMnOg12V2VDoOs+wqZGbaWETzkyE4rXnCeAbyci2Wp71XVx7P7F0ejt8aTt0+eOpNlnRhQR/POpgm6ptgnk0N2bTotokYsjd23hvJ1z5i/KvP5jrHWGkt3cKrURIiVwUByykCUwS4PleZ/roqmrFNffFLVyeDKD7gCyEH8zU2eWYvWGIVot9FuaTvThfdJdhpyE4xv9nFmnEQfDJlX6UbBHhgHsZ7jWemS+fsC71ag0ewaUJKIoQXLaoq1JMGm7FRZrZX/+Yt2BbfSCPXjnD2tHaGs9U/c1vy+pnSQ9JwU1ntJPHzW0MoZ5Nit5CQStH5VhPWWZU/dEsecnYYm7Dq0PNeUsE4/jkB57wEgSCLj7n9wvDinQiTu6EDxnGK9K23ugXPYL5wpCLcgpmZ8NJJYbhjMdMiiuH/cqZpXmh6V1pMXsY1B28K6bMjuDeP0+akMt26WjhPZ+bliwVDaQprRId0HZTqtpDDeXJNd4Zldi9/NOzNHHEb6c1tzHVK7vamivf4MGeOoEG/1umGno0Xk+EJqMc2C1F9kmI45aUcJg0+fIB4+A6QYHYuMp5FLe3s/Bgdf7pHridt3vDNpthpK/581EUt37A4ww04MurQ6o2ZX2P8EGAAu1YEi4TmT9gAAAABJRU5ErkJggg=="},emoji_groups:[],emoji_names:[],emoji_complex_customs:null,emoji_menu_columns:9,emoji_names_to_canonical_names:{},onStart:function(){TS.model.is_retina=TS.utility.isRetina();
if(TS.model.is_safari_desktop){TS.model.supports_sticky_position=true;
$("html").addClass("is_safari_desktop")
}if(TS.boot_data.feature_reactions){TS.model.supports_sticky_position=TS.model.is_safari_desktop||TS.model.is_FF||TS.model.mac_ssb_version;
if(TS.model.supports_sticky_position){$("html").addClass("supports_sticky_position")
}}TS.model.supports_line_clamp=TS.utility.cssPropertySupported("line-clamp");
if(TS.model.supports_line_clamp&&TS.boot_data.feature_fix_files){$("html").addClass("supports_line_clamp")
}if(TS.model.mac_ssb_version||TS.model.is_safari_desktop){TS.model.is_apple_webkit=true;
$("html").addClass("is_apple_webkit")
}var d=function(){if(!TS.model.mac_ssb_version){return 0
}var h=navigator.userAgent.match(/(?:Mac OS X )([0-9][0-9]_[0-9])(_[0-9])/);
if(!h){return 0
}if(h.length<2){return 0
}var g=parseFloat(h[1].replace("_","."))||0;
return g
}();
TS.model.supports_growl_subtitle=(TS.model.mac_ssb_version&&TS.model.mac_ssb_version>=0.61&&d>10.7);
if(window.winssb){TS.model.supports_voice_calls=!!(winssb.screenhero)
}else{if(window.macgap){TS.model.supports_voice_calls=!!(macgap.screenhero)
}else{if(TS.model.is_chrome){TS.model.supports_voice_calls=true
}}}if(TS.boot_data.feature_web_cache_users&&(TS.model.is_our_app||TS.model.is_chrome)){TS.model.supports_user_caching=true
}if(!TS.model.supports_user_caching||!TS.storage.fetchLastCacheTS()){TS.storage.cleanOutCacheTsStorage()
}if((window.macgap&&macgap.downloads)||(window.winssb&&winssb.downloads)){TS.model.supports_downloads=true;
TS.model.flex_names.push("downloads")
}if(TS.boot_data.feature_spaces){if(window.macgap&&macgap.window&&macgap.window.list){TS.model.supports_spaces_in_windows=true
}else{if(window.winssb&&winssb.window&&winssb.window.list){TS.model.supports_spaces_in_windows=true
}}}var b;
if(TS.boot_data.special_flex_panes){for(b in TS.boot_data.special_flex_panes){var c=TS.boot_data.special_flex_panes[b];
TS.model.flex_names.push(c.flex_name)
}}TS.model.expandable_state=TS.storage.fetchExpandableState();
var e=TS.storage.fetchInlineImgState();
var a=TS.storage.fetchInlineVideoState();
var f=TS.storage.fetchInlineAttachmentState();
for(b in e){if(!TS.model.expandable_state["img_"+b]){TS.model.expandable_state["img_"+b]=e[b]
}}for(b in a){if(!TS.model.expandable_state["vid_"+b]){TS.model.expandable_state["vid_"+b]=a[b]
}}for(b in f){if(!TS.model.expandable_state["attach_"+b]){TS.model.expandable_state["attach_"+b]=f[b]
}}TS.storage.storeInlineImgState({});
TS.storage.storeInlineVideoState({});
TS.storage.storeInlineAttachmentState({})
},makeYouRegex:function(){var a=TS.model.user;
if(a){TS.model.you_regex=new RegExp("<@("+a.id+"|"+a.name+")\\b")
}},addProfilingKeyTime:function(b,a){if(!a||!b){return
}if(!TS.model.profiling_key_times){TS.model.profiling_key_times=[]
}TS.model.profiling_key_times.push({name:b,ms:a})
}})
}());
(function(){TS.registerModule("emoji",{onStart:function(){},isValidName:function(e){if(!e){return false
}e=TS.emoji.stripWrappingColons(e).toLowerCase();
if(TS.model.emoji_names.indexOf(e)==-1){return false
}return e
},stripWrappingColons:function(e){e=String(e);
if(!e){return e
}return e.replace(/^:|:$/g,"")
},nameToCanonicalName:function(e){e=TS.emoji.stripWrappingColons(e);
e=String(e).toLowerCase();
if(!e){return e
}return TS.model.emoji_names_to_canonical_names[e]||e
},ingestCustoms:function(f){var j=false;
var l=false;
TS.model.all_custom_emoji.length=0;
TS.model.emoji_complex_customs={};
var m;
var g;
var k;
var e;
function h(o){var q;
for(var n in a.data){q=a.data[n][3];
for(var p=0;
p<q.length;
p++){if(o==q[p]){if(l){delete a.data[n]
}return false
}}}return true
}for(e in f){k=f[e];
if(typeof k=="object"){TS.model.emoji_complex_customs[e]=k;
a.data[e]=[[],null,null,[e],null,null,null,k.apple];
a.map.colons[e]=e;
TS.model.all_custom_emoji.push(e);
if(e=="simple_smile"){a.emoticons_data[":)"]="simple_smile";
a.emoticons_data["(:"]="simple_smile";
a.emoticons_data[":-)"]="simple_smile"
}}else{if(k.indexOf("alias:")===0){continue
}if(!h(e)){if(l){TS.error("allowing custom emoji :"+e+": to overwrite")
}else{TS.error("can't ingest custom emoji :"+e+": because that already exists");
continue
}}a.data[e]=[[],null,null,[e],null,null,null,k];
a.map.colons[e]=e;
TS.model.all_custom_emoji.push(e)
}}for(e in f){k=f[e];
if(typeof k=="object"||k.indexOf("alias:")!==0){continue
}if(!h(e)){if(l){TS.error("allowing custom emoji :"+e+": to overwrite")
}else{TS.error("can't ingest custom emoji :"+e+": because that already exists");
continue
}}m=k.replace("alias:","");
g=a.data.hasOwnProperty(m)&&a.data[m];
if(g){g[3].push(e);
a.map.colons[e]=m;
if(j){TS.model.all_custom_emoji.push(e)
}continue
}m=a.map.colons.hasOwnProperty(m)&&a.map.colons[m];
g=a.data.hasOwnProperty(m)&&a.data[m];
if(g){g[3].push(e);
a.map.colons[e]=m;
if(j){TS.model.all_custom_emoji.push(e)
}continue
}TS.warn('alias for "'+e+'":"'+k+'" not recognized')
}TS.model.all_custom_emoji=TS.model.all_custom_emoji.sort();
if(a&&a.inits){delete a.inits.emoticons;
a.init_emoticons()
}},setUpEmoji:function(){return new Promise(function(e){if(!a){return e()
}a.include_text=true;
if(a.unaltered_data){a.data=TS.utility.clone(a.unaltered_data);
a.inits={}
}a.init_colons();
if(TS.boot_data.emoji_customs){TS.emoji.ingestCustoms(TS.boot_data.emoji_customs);
TS.boot_data.emoji_customs=null;
return e()
}if(!TS.boot_data.page_needs_custom_emoji){return e()
}TS.api.call("emoji.list",{include_complex_values:1},function(g,h,f){if(!g||!h.emoji){return e()
}TS.emoji.ingestCustoms(h.emoji);
e()
})
})
},resetUpEmoji:function(){TS.emoji.setUpEmoji().then(function(){TS.emoji.setEmojiMode();
TS.emoji.makeEmoticonList();
if(TS.client){TS.client.ui.rebuildAll()
}})
},makeEmoticonList:function(){var h=TS.model.emoji_groups||[];
TS.model.emoji_groups=[];
TS.model.emoji_names=[];
var o=TS.utility.clone(c());
if(TS.model.all_custom_emoji&&TS.model.all_custom_emoji.length){o.push({display_name:"Custom",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_slack"></i></span>',name:"slack",emoji_names:TS.model.all_custom_emoji})
}if(TS.boot_data.feature_reactions){var l=TS.model.emoji_use_for_menu||[];
var n=["simple_smile","heart","+1","100","bug"];
while(l.length<5){l.push(n.shift())
}o.unshift({name:"mine",display_name:"Frequently Used",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_clock_o"></i></span>',emoji_names:l})
}var y,w;
var F;
var q=[];
for(y=0;
y<o.length;
y++){q=q.concat(o[y].emoji_names)
}var u={};
for(var t in a.data){var r=a.data[t][3];
for(y=0;
y<r.length;
y++){F=r[y];
TS.model.emoji_names.push(F);
u[F]={html:TS.emoji.graphicReplace(":"+F+":"),name:":"+F+":",names:":"+r.join(": :")+":"};
a.skin_tones.forEach(function(H){if(!a.variations_data[t+"-"+H]){return
}var I=a.data[H];
var J=I[3][0];
var G=F+"::"+J;
TS.model.emoji_names.push(G);
var m=":"+G+":";
u[G]={is_skin:true,html:TS.emoji.graphicReplace(m),name:m,names:m}
})
}}for(y=0;
y<q.length;
y++){F=q[y];
if(!u[F]){TS.info(F+" not in cat_map?")
}}var f=function(J){var P,N;
var M;
var U=0;
var O=0;
var R=[];
var L=[];
var S;
var T;
var K;
var H;
var Q=4;
function G(){var W,V,X;
for(W=0,V=R.length;
W<V;
W++){if(!R[W].src||R[W].complete){return R[W]
}}X=new Image();
R.push(X);
return X
}function m(){this.onload=null;
U++;
if(U<M){if(O<L.length){I(this)
}}else{R=null
}}function I(V){V=V||G();
V.onload=m;
V.src=L[O];
O++
}for(P=0,N=J.emoji_names.length;
P<N;
P++){K=a.map.colons[J.emoji_names[P]];
T=a.data[K];
if(!T||!T.length){TS.error(J.emoji_names[P]+" does not have a member in in _emoji.data");
continue
}H=T[7]||TS.emoji.getCurrentImagePath()+K+".png";
L.push(H)
}M=L.length;
S=Math.min(Q,M);
for(P=0;
P<S;
P++){I()
}};
var C;
var v;
var z;
var x;
for(y=0;
y<o.length;
y++){C=o[y];
v=[];
z=null;
x="";
if(C.tab_icon_html&&TS.boot_data.feature_reactions){x=C.tab_icon_html
}for(w=0;
w<C.emoji_names.length;
w++){z=u[C.emoji_names[w]];
v.push(z);
if(x){continue
}if(C.emoji_names[w]==C.name){x=z.html
}}z=v[0];
TS.model.emoji_groups.push({name:C.name,display_name:C.display_name,tab_html:x||z.html,items:v});
if(C.name=="slack"){(function(m){window.setTimeout(function(){f(m)
},5000)
}(C))
}if(!TS.model.prefs.ss_emojis){if(C.name==TS.emoji_menu.default_emoji_group){f(C)
}}}var g=TS.emoji.getCurrentSheetUrl();
if(TS.model.prefs.ss_emojis&&g){var E=new Image();
E.onload=function(){E.onload=null;
E.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
E=null
};
E.src=g
}var j={};
var A;
for(F in a.data){A=a.data[F];
j[A[3][0]]=null;
A[3].forEach(function(m){if(j.hasOwnProperty(m)){return
}j[m]=A[3][0]
})
}TS.model.emoji_names_to_canonical_names=j;
TS.model.emoji_names.sort();
if(TS.boot_data.feature_reactions&&!TS.emoji_menu.is_dirty){TS.emoji_menu.is_dirty=!TS.utility.areSimpleObjectsEqual(h,TS.model.emoji_groups,"emoji_menu.is_dirty")
}var s=TS.model.emoji_names.indexOf("thumbsdown");
var k=TS.model.emoji_names.indexOf("thumbsup");
var B=TS.model.emoji_names.indexOf("thought_balloon");
var p=TS.model.emoji_names.indexOf("three");
TS.model.emoji_names[B]="thumbsup";
TS.model.emoji_names[p]="thumbsdown";
TS.model.emoji_names[s]="thought_balloon";
TS.model.emoji_names[k]="three";
var D=TS.model.emoji_names.indexOf("ok");
var e=TS.model.emoji_names.indexOf("ok_hand");
TS.model.emoji_names[D]="ok_hand";
TS.model.emoji_names[e]="ok"
},maybePreloadSheet:function(g){var f=TS.emoji.getCurrentSheetUrl();
if(TS.client&&!TS.model.ms_logged_in_once&&TS.model.prefs.ss_emojis&&f){TS.logLoad("TS.client preloading "+f);
var e=Date.now();
$("body").append('<img style="position:absolute; width:100px; left:-200px; top:-200%; z-index:100" id="emoji_ss_preloader" src="'+f+'">');
$("#emoji_ss_preloader").bind("load",function(){$("#emoji_ss_preloader").remove();
TS.logLoad("TS.client preloaded "+f+" (took "+(Date.now()-e)+"ms)");
g()
});
$("#emoji_ss_preloader").bind("abort error",function(){TS.error("emoji sheet preload failed!");
g()
})
}else{g()
}},graphicReplace:function(l,n,m,g){if(!l){return""
}a.init_env();
var k=a.text_mode;
var f=a.include_title;
var e=a.include_text;
var h=a.allow_native;
a.text_mode=false;
a.include_title=!!m;
a.include_text=!g;
a.allow_native=false;
var j=TS.emoji.replace(l);
a.text_mode=k;
a.include_title=f;
a.include_text=e;
a.allow_native=h;
return j
},replace:function(j,g,f){if(!j){return""
}var e;
a.init_env();
var h=a.supports_css;
if(f){a.supports_css=false
}if(g){e=a.replace_colons(j,function(k){return TS.format.tokenizeStr(g,k)
})
}else{e=a.replace_colons(j)
}a.supports_css=h;
return e
},replaceColons:function(e){return a.replace_colons(e)
},maybeUnifiedReplace:function(e){if(a.replace_mode!="unified"){return e
}return a.replace_colons_with_unified(e)
},replaceEmoticons:function(e){return a.replace_emoticons_with_colons(e)
},setEmojiMode:function(){a.text_mode=TS.model.prefs.emoji_mode=="as_text";
a.do_emoticons=!!TS.model.prefs.graphic_emoticons;
a.allow_native=false;
a.use_sheet=(function(){if(!TS.model.prefs.ss_emojis){return false
}if(TS.boot_data.feature_reactions){return !!TS.boot_data.page_needs_custom_emoji
}return !!(TS.client)
})();
if(TS.model.prefs.emoji_mode=="google"||TS.model.prefs.emoji_mode=="emojione"||TS.model.prefs.emoji_mode=="twitter"){a.img_set=TS.model.prefs.emoji_mode
}else{a.img_set="apple"
}if(!TS.model.emoji_complex_customs){return
}for(var e in TS.model.emoji_complex_customs){if(!a.data[e]){continue
}a.data[e][7]=TS.model.emoji_complex_customs[e][TS.model.prefs.emoji_mode]||TS.model.emoji_complex_customs[e]["apple"]
}},getColonsRx:function(){return a.rx_colons
},getEmojiForSpaces:function(){var g={emoticonEmojiNames:a.emoticons_data,emoji:{},sheetSize:a.sheet_size,sheetPath:TS.emoji.getCurrentSheetUrl()};
for(var e in a.data){var f=a.data[e];
var m=f[3];
var k=f[4];
var j=f[5];
var h=f[7];
var l;
if(k!==null&&j!==null){l=[k,j]
}else{if(h){l=h
}else{TS.error('WTF, _emoji "'+e+'" is missing coords or and a url, or something!');
continue
}}m.forEach(function(n){g.emoji[n]=l
})
}return g
},getCurrentSheetUrl:function(){return a.img_sets[a.img_set].sheet
},getCurrentImagePath:function(){return a.img_sets[a.img_set].path
},test:function(){return{emoji:a}
}});
var a=window._private_emoji;
delete window._private_emoji;
var c=function(){if((TS.boot_data||window.boot_data||{}).feature_reactions){return d
}else{return b
}};
var b=[{name:"grinning",emoji_names:["grinning","grin","joy","smiley","smile","sweat_smile","satisfied","innocent","smiling_imp","wink","blush","yum","relieved","heart_eyes","sunglasses","smirk","neutral_face","expressionless","unamused","sweat","pensive","confused","confounded","kissing","kissing_heart","kissing_smiling_eyes","kissing_closed_eyes","stuck_out_tongue","stuck_out_tongue_winking_eye","stuck_out_tongue_closed_eyes","disappointed","worried","angry","rage","cry","persevere","triumph","disappointed_relieved","frowning","anguished","fearful","weary","sleepy","tired_face","grimacing","sob","open_mouth","hushed","cold_sweat","scream","astonished","flushed","sleeping","dizzy_face","no_mouth","relaxed","mask","smile_cat","joy_cat","smiley_cat","heart_eyes_cat","smirk_cat","kissing_cat","pouting_cat","crying_cat_face","scream_cat","no_good","ok_woman","bow","see_no_evil","hear_no_evil","speak_no_evil","raising_hand","raised_hands","person_frowning","person_with_pouting_face","bust_in_silhouette","busts_in_silhouette","boy","girl","man","woman","family","couple","two_men_holding_hands","two_women_holding_hands","cop","dancers","bride_with_veil","person_with_blond_hair","man_with_gua_pi_mao","man_with_turban","older_man","older_woman","baby","construction_worker","princess","japanese_ogre","japanese_goblin","ghost","angel","alien","space_invader","imp","skull","information_desk_person","guardsman"]},{name:"rat",emoji_names:["rat","mouse2","ox","water_buffalo","cow2","tiger2","leopard","rabbit2","cat2","dragon","crocodile","whale2","snail","snake","racehorse","ram","goat","sheep","monkey","rooster","chicken","dog2","pig2","boar","elephant","octopus","shell","bug","ant","honeybee","beetle","fish","tropical_fish","blowfish","turtle","hatching_chick","baby_chick","hatched_chick","bird","penguin","koala","poodle","dromedary_camel","camel","flipper","mouse","cow","tiger","rabbit","cat","dragon_face","whale","horse","monkey_face","dog","pig","frog","hamster","wolf","bear","panda_face","pig_nose","paw_prints","eyes","ear","nose","lips","tongue","point_up","fist","raised_hand","v","point_up_2","point_down","point_left","point_right","punch","wave","ok_hand","thumbsup","thumbsdown","clap","open_hands"]},{name:"hamburger",emoji_names:["hamburger","coffee","pizza","meat_on_bone","poultry_leg","rice_cracker","rice_ball","rice","curry","ramen","spaghetti","bread","fries","sweet_potato","dango","oden","sushi","fried_shrimp","fish_cake","icecream","shaved_ice","ice_cream","doughnut","cookie","chocolate_bar","candy","lollipop","custard","honey_pot","cake","bento","stew","egg","fork_and_knife","tea","sake","wine_glass","cocktail","tropical_drink","beer","beers","baby_bottle","mushroom","tomato","eggplant","grapes","melon","watermelon","tangerine","lemon","banana","pineapple","apple","green_apple","pear","peach","cherries","strawberry","chestnut","seedling","evergreen_tree","deciduous_tree","palm_tree","cactus","tulip","cherry_blossom","rose","hibiscus","sunflower","blossom","corn","ear_of_rice","herb","four_leaf_clover","maple_leaf","fallen_leaf","leaves"]},{name:"sunny",emoji_names:["sunny","cloud","telephone","umbrella","spades","clubs","hearts","diamonds","recycle","wheelchair","warning","copyright","registered","tm","zap","soccer","baseball","snowman","partly_sunny","no_entry","golf","sailboat","fuelpump","scissors","ballot_box_with_check","white_check_mark","airplane","envelope","pencil2","black_nib","heavy_check_mark","heavy_multiplication_x","sparkles","snowflake","x","negative_squared_cross_mark","question","heavy_exclamation_mark","bangbang","interrobang","heart","heavy_plus_sign","heavy_minus_sign","heavy_division_sign","star","o","black_joker","cyclone","foggy","closed_umbrella","sunrise","ocean","earth_africa","earth_americas","earth_asia","globe_with_meridians","waxing_crescent_moon","waning_gibbous_moon","last_quarter_moon","waning_crescent_moon","crescent_moon","new_moon_with_face","first_quarter_moon_with_face","last_quarter_moon_with_face","full_moon_with_face","sun_with_face","star2","ribbon","gift","birthday","jack_o_lantern","christmas_tree","santa","fireworks","sparkler","balloon","tada","confetti_ball","tanabata_tree","crossed_flags","bamboo","dolls","flags","wind_chime","rice_scene","school_satchel","mortar_board","microphone","movie_camera","cinema","headphones","art","tophat","circus_tent","ticket","clapper","performing_arts","video_game","dart","slot_machine","8ball","game_die","bowling","flower_playing_cards","musical_note","notes","saxophone","guitar","musical_keyboard","trumpet","violin","musical_score","tennis","ski","basketball","checkered_flag","snowboarder","running","surfer","trophy","horse_racing","football","rugby_football","swimmer","dancer","lipstick","nail_care","massage","haircut","barber","syringe","pill"]},{name:"kiss",emoji_names:["kiss","love_letter","ring","gem","couplekiss","bouquet","couple_with_heart","wedding","heartbeat","broken_heart","two_hearts","sparkling_heart","heartpulse","cupid","blue_heart","green_heart","yellow_heart","purple_heart","gift_heart","revolving_hearts","heart_decoration","diamond_shape_with_a_dot_inside","bulb","anger","bomb","zzz","collision","sweat_drops","droplet","dash","shit","muscle","dizzy","speech_balloon","thought_balloon","heavy_dollar_sign","credit_card","yen","dollar","euro","pound","money_with_wings","seat","computer","briefcase","minidisc","floppy_disk","cd","dvd","file_folder","open_file_folder","page_with_curl","page_facing_up","date","card_index","chart_with_upwards_trend","chart_with_downwards_trend","bar_chart","pushpin","round_pushpin","paperclip","notebook","open_book","books","pencil","telephone_receiver","pager","fax","satellite","loudspeaker","mega","outbox_tray","inbox_tray","package","mailbox_closed","mailbox","mailbox_with_mail","mailbox_with_no_mail","postbox","postal_horn","newspaper","iphone","no_mobile_phones","camera","video_camera","tv","radio","vhs","low_brightness","high_brightness","mute","sound","speaker","battery","electric_plug","mag","mag_right","lock_with_ink_pen","closed_lock_with_key","key","lock","unlock","bell","no_bell","bookmark","link","radio_button","underage","fire","flashlight","wrench","hammer","nut_and_bolt","hocho","gun","microscope","telescope","crystal_ball","clock3","pray"]},{name:"rocket",emoji_names:["rocket","helicopter","steam_locomotive","train","bullettrain_side","bullettrain_front","train2","light_rail","station","tram","bus","oncoming_bus","trolleybus","busstop","minibus","ambulance","fire_engine","police_car","oncoming_police_car","taxi","oncoming_taxi","red_car","oncoming_automobile","blue_car","truck","articulated_lorry","tractor","monorail","mountain_railway","suspension_railway","mountain_cableway","aerial_tramway","ship","rowboat","speedboat","traffic_light","vertical_traffic_light","construction","rotating_light","triangular_flag_on_post","door","house","house_with_garden","european_post_office","convenience_store","school","no_entry_sign","smoking","no_smoking","put_litter_in_its_place","bike","no_bicycles","bicyclist","mountain_bicyclist","walking","no_pedestrians","mens","womens","toilet","shower","bath","bathtub","cn","de","es","fr","uk","it","jp","kr","ru","us"]}];
var d=[{name:"people",display_name:"People",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_happy_smile"></i></span>',emoji_names:["grinning","grin","joy","smiley","smile","sweat_smile","satisfied","innocent","smiling_imp","imp","wink","blush","relaxed","yum","relieved","heart_eyes","sunglasses","smirk","neutral_face","expressionless","unamused","sweat","pensive","confused","confounded","kissing","kissing_heart","kissing_smiling_eyes","kissing_closed_eyes","stuck_out_tongue","stuck_out_tongue_winking_eye","stuck_out_tongue_closed_eyes","disappointed","worried","angry","rage","cry","persevere","triumph","disappointed_relieved","frowning","anguished","fearful","weary","sleepy","tired_face","grimacing","sob","open_mouth","hushed","cold_sweat","scream","astonished","flushed","sleeping","dizzy_face","no_mouth","mask","smile_cat","joy_cat","smiley_cat","heart_eyes_cat","smirk_cat","kissing_cat","pouting_cat","crying_cat_face","scream_cat","footprints","bust_in_silhouette","busts_in_silhouette","baby","boy","girl","man","woman","family","couple","two_men_holding_hands","two_women_holding_hands","dancers","bride_with_veil","person_with_blond_hair","man_with_gua_pi_mao","man_with_turban","older_man","older_woman","cop","construction_worker","princess","guardsman","angel","santa","ghost","japanese_ogre","japanese_goblin","shit","skull","alien","space_invader","bow","information_desk_person","no_good","ok_woman","raising_hand","person_with_pouting_face","person_frowning","massage","haircut","couple_with_heart","couplekiss","raised_hands","clap","ear","eyes","nose","lips","kiss","tongue","nail_care","wave","thumbsup","thumbsdown","point_up","point_up_2","point_down","point_left","point_right","ok_hand","v","punch","fist","raised_hand","muscle","open_hands","pray"]},{name:"nature",display_name:"Nature",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_emoji_nature"></i></span>',emoji_names:["seedling","evergreen_tree","deciduous_tree","palm_tree","cactus","tulip","cherry_blossom","rose","hibiscus","sunflower","blossom","bouquet","ear_of_rice","herb","four_leaf_clover","maple_leaf","fallen_leaf","leaves","mushroom","chestnut","rat","mouse2","mouse","hamster","ox","water_buffalo","cow2","cow","tiger2","leopard","tiger","rabbit2","rabbit","cat2","cat","racehorse","horse","ram","sheep","goat","rooster","chicken","baby_chick","hatching_chick","hatched_chick","bird","penguin","elephant","dromedary_camel","camel","boar","pig2","pig","pig_nose","dog2","poodle","dog","wolf","bear","koala","panda_face","monkey_face","see_no_evil","hear_no_evil","speak_no_evil","monkey","dragon","dragon_face","crocodile","snake","turtle","frog","whale2","whale","flipper","octopus","fish","tropical_fish","blowfish","shell","snail","bug","ant","honeybee","beetle","paw_prints","zap","fire","crescent_moon","sunny","partly_sunny","cloud","droplet","sweat_drops","umbrella","dash","snowflake","star2","star","stars","sunrise_over_mountains","sunrise","rainbow","ocean","volcano","milky_way","mount_fuji","japan","globe_with_meridians","earth_africa","earth_americas","earth_asia","new_moon","waxing_crescent_moon","first_quarter_moon","waxing_gibbous_moon","full_moon","waning_gibbous_moon","last_quarter_moon","waning_crescent_moon","new_moon_with_face","full_moon_with_face","first_quarter_moon_with_face","last_quarter_moon_with_face","sun_with_face"]},{name:"food_and_drink",display_name:"Food & Drink",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_emoji_food"></i></span>',emoji_names:["tomato","eggplant","corn","sweet_potato","grapes","melon","watermelon","tangerine","lemon","banana","pineapple","apple","green_apple","pear","peach","cherries","strawberry","hamburger","pizza","meat_on_bone","poultry_leg","rice_cracker","rice_ball","rice","curry","ramen","spaghetti","bread","fries","dango","oden","sushi","fried_shrimp","fish_cake","icecream","shaved_ice","ice_cream","doughnut","cookie","chocolate_bar","candy","lollipop","custard","honey_pot","cake","bento","stew","egg","fork_and_knife","tea","coffee","sake","wine_glass","cocktail","tropical_drink","beer","beers","baby_bottle"]},{name:"celebration",display_name:"Celebration",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_emoji_celebration"></i></span>',emoji_names:["ribbon","gift","birthday","jack_o_lantern","christmas_tree","tanabata_tree","bamboo","rice_scene","fireworks","sparkler","tada","confetti_ball","balloon","dizzy","sparkles","collision","mortar_board","crown","dolls","flags","wind_chime","crossed_flags","lantern","ring","heart","broken_heart","love_letter","two_hearts","revolving_hearts","heartbeat","heartpulse","sparkling_heart","cupid","gift_heart","heart_decoration","purple_heart","yellow_heart","green_heart","blue_heart"]},{name:"activity",display_name:"Activity",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_emoji_activities"></i></span>',emoji_names:["running","walking","dancer","rowboat","swimmer","surfer","bath","snowboarder","ski","snowman","bicyclist","mountain_bicyclist","horse_racing","tent","fishing_pole_and_fish","soccer","basketball","football","baseball","tennis","rugby_football","golf","trophy","running_shirt_with_sash","checkered_flag","musical_keyboard","guitar","violin","saxophone","trumpet","musical_note","notes","musical_score","headphones","microphone","performing_arts","ticket","tophat","circus_tent","clapper","art","dart","8ball","bowling","slot_machine","game_die","video_game","flower_playing_cards","black_joker","mahjong","carousel_horse","ferris_wheel","roller_coaster"]},{name:"travel_and_places",display_name:"Travel & Places",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_emoji_travel"></i></span>',emoji_names:["train","mountain_railway","steam_locomotive","monorail","bullettrain_side","bullettrain_front","train2","metro","light_rail","station","tram","bus","oncoming_bus","trolleybus","minibus","ambulance","fire_engine","police_car","oncoming_police_car","rotating_light","taxi","oncoming_taxi","red_car","oncoming_automobile","blue_car","truck","articulated_lorry","tractor","bike","busstop","fuelpump","construction","vertical_traffic_light","traffic_light","rocket","helicopter","airplane","seat","anchor","ship","speedboat","sailboat","aerial_tramway","mountain_cableway","suspension_railway","passport_control","customs","baggage_claim","left_luggage","yen","euro","pound","dollar","statue_of_liberty","moyai","foggy","tokyo_tower","fountain","european_castle","japanese_castle","city_sunrise","city_sunset","night_with_stars","bridge_at_night","house","house_with_garden","office","department_store","factory","post_office","european_post_office","hospital","bank","hotel","love_hotel","wedding","church","convenience_store","school","cn","de","es","fr","uk","it","jp","kr","ru","us"]},{name:"OBJECTS_AND_SYMBOLS",display_name:"Objects & Symbols",tab_icon_html:'<span class="emoji-sizer"><i class="ts_icon ts_icon_emoji_objects"></i></span>',emoji_names:["watch","iphone","calling","computer","alarm_clock","hourglass_flowing_sand","hourglass","camera","video_camera","movie_camera","tv","radio","pager","telephone_receiver","telephone","fax","minidisc","floppy_disk","cd","dvd","vhs","battery","electric_plug","bulb","flashlight","satellite","credit_card","money_with_wings","moneybag","gem","closed_umbrella","pouch","purse","handbag","briefcase","school_satchel","lipstick","eyeglasses","womans_hat","sandal","high_heel","boot","shoe","athletic_shoe","bikini","dress","kimono","womans_clothes","tshirt","necktie","jeans","door","shower","bathtub","toilet","barber","syringe","pill","microscope","telescope","crystal_ball","wrench","hocho","nut_and_bolt","hammer","bomb","smoking","gun","bookmark","newspaper","key","envelope","envelope_with_arrow","incoming_envelope","e-mail","inbox_tray","outbox_tray","package","postal_horn","postbox","mailbox_closed","mailbox","mailbox_with_mail","mailbox_with_no_mail","page_facing_up","page_with_curl","bookmark_tabs","chart_with_upwards_trend","chart_with_downwards_trend","bar_chart","date","calendar","low_brightness","high_brightness","scroll","clipboard","open_book","notebook","notebook_with_decorative_cover","ledger","closed_book","green_book","blue_book","orange_book","books","card_index","link","paperclip","pushpin","scissors","triangular_ruler","round_pushpin","straight_ruler","triangular_flag_on_post","file_folder","open_file_folder","black_nib","pencil2","pencil","lock_with_ink_pen","closed_lock_with_key","lock","unlock","mega","loudspeaker","sound","speaker","mute","zzz","bell","no_bell","thought_balloon","speech_balloon","children_crossing","mag","mag_right","no_entry_sign","no_entry","name_badge","no_pedestrians","do_not_litter","no_bicycles","non-potable_water","no_mobile_phones","underage","accept","ideograph_advantage","white_flower","secret","congratulations","u5408","u6e80","u7981","u6709","u7121","u7533","u55b6","u6708","u5272","u7a7a","sa","koko","u6307","chart","sparkle","eight_spoked_asterisk","negative_squared_cross_mark","white_check_mark","eight_pointed_black_star","vibration_mode","mobile_phone_off","vs","a","b","ab","cl","o2","sos","id","parking","wc","cool","free","new","ng","ok","up","atm","aries","taurus","gemini","cancer","leo","virgo","libra","scorpius","sagittarius","capricorn","aquarius","pisces","restroom","mens","womens","baby_symbol","wheelchair","potable_water","no_smoking","put_litter_in_its_place","arrow_forward","arrow_backward","arrow_up_small","arrow_down_small","fast_forward","rewind","arrow_double_up","arrow_double_down","arrow_right","arrow_left","arrow_up","arrow_down","arrow_upper_right","arrow_lower_right","arrow_lower_left","arrow_upper_left","arrow_up_down","left_right_arrow","arrows_counterclockwise","arrow_right_hook","leftwards_arrow_with_hook","arrow_heading_up","arrow_heading_down","twisted_rightwards_arrows","repeat","repeat_one","zero","one","two","three","four","five","six","seven","eight","nine","keycap_ten","1234","abc","abcd","capital_abcd","information_source","signal_strength","cinema","symbols","heavy_plus_sign","heavy_minus_sign","wavy_dash","heavy_division_sign","heavy_multiplication_x","heavy_check_mark","arrows_clockwise","tm","copyright","registered","currency_exchange","heavy_dollar_sign","curly_loop","loop","part_alternation_mark","heavy_exclamation_mark","question","grey_exclamation","grey_question","interrobang","x","o","100","end","back","on","top","soon","cyclone","m","ophiuchus","six_pointed_star","beginner","trident","warning","hotsprings","recycle","anger","diamond_shape_with_a_dot_inside","spades","clubs","hearts","diamonds","ballot_box_with_check","white_circle","black_circle","radio_button","red_circle","large_blue_circle","small_red_triangle","small_red_triangle_down","small_orange_diamond","small_blue_diamond","large_orange_diamond","large_blue_diamond","black_small_square","white_small_square","black_large_square","white_large_square","black_medium_square","white_medium_square","black_medium_small_square","white_medium_small_square","black_square_button","white_square_button","clock1","clock2","clock3","clock4","clock5","clock6","clock7","clock8","clock9","clock10","clock11","clock12","clock130","clock230","clock330","clock430","clock530","clock630","clock730","clock830","clock930","clock1030","clock1130","clock1230"]}];
d.forEach(function(f){var e=0;
f.emoji_names.concat().forEach(function(k,j){var g=a.map.colons[k];
var h=a.data.hasOwnProperty(g)&&a.data[g];
if(!h){return
}a.skin_tones.forEach(function(m){if(!a.variations_data[g+"-"+m]){return
}var n=a.data[m];
var o=n[3][0];
var l=k+"::"+o;
var p=++e+j;
f.emoji_names.splice(p,0,l)
})
})
})
})();
(function(){TS.registerModule("ssb",{teams_did_load_sig:new signals.Signal(),onStart:function(){TS.files.team_file_deleted_sig.add(e)
},openNewFileWindow:function(o,n,m){TS.log(438,"TS.ssb.openNewFileWindow url: "+n);
if(TS.client){return TS.client.windows.openFileWindow(o.id,m)
}else{if(window.is_in_ssb){if(document.ssb_main){if(document.ssb_main.TS){return document.ssb_main.TS.client.windows.openFileWindow(o.id,n)
}else{return true
}}else{if(window.winssb&&window.opener&&window.opener.executeJavaScript){TS.log(438,"calling _executeInAtomSSBParentWin for TS.client.windows.openFileWindow");
h("TS.client.windows.openFileWindow("+f(o.id)+", "+f(n)+");");
return true
}}}}return false
},closeWindow:function(){if(!window.is_in_ssb){return false
}window.close();
return true
},setUpAtomSSBWin:function(m){l(m,"window.is_in_ssb = true;");
if(TS.shouldLog(438)&&!m._has_console){m._has_console=1
}},upsertFileInSSBParentWin:function(m){if(!TS.web){return
}if(document.ssb_main){if(document.ssb_main.TS){document.ssb_main.TS.files.upsertAndSignal(m)
}}else{if(window.winssb&&window.opener&&window.opener.executeJavaScript){TS.log(438,"calling _executeInAtomSSBParentWin for TS.files.upsertAndSignal");
h("TS.files.upsertAndSignal("+c(m)+");")
}}},updateAtomSSBWin:function(n,o){TS.log(438,"updateAtomSSBWin token: "+n.token);
var m=function(){return{x:window.screenX,y:window.screenY,width:window.innerWidth,height:window.innerHeight+22,title:window.document&&window.document.title}
};
l(n,d(m),function(p,q){if(p){TS.error("updateAtomSSBWin got err: "+p);
return
}if(!q.width){TS.error("updateAtomSSBWin got bad values:");
TS.dir(0,q);
return
}TS.log(438,"updateAtomSSBWin SETTING VALUES token: "+n.token);
n.x=q.x;
n.y=q.y;
n.width=q.width;
n.height=q.height;
if(q.title){n.title=q.title
}o()
})
},toggleMuteInWin:function(o,r,p){TS.log(438,"toggleMuteInWin called with token: "+o);
if(!TS.client){return
}var s=TS.client.windows.getWinByToken(o);
if(!s){TS.error("toggleMuteInWin called with bad token: "+o);
return
}if(window.macgap){var n;
var m;
try{n=s.window.toggleMute(r)
}catch(q){TS.error("error calling macgap win.window.toggleMute");
TS.error(q);
m=q
}if(p){setTimeout(p,0,m,n)
}}else{l(s,"window.toggleMute("+j(r)+");",p)
}},teamsDidLoad:function(){TS.ssb.teams_did_load_sig.dispatch()
},distributeMsgToWin:function(n,m){TS.log(438,"distributeMsgToWin called with token: "+n);
if(!TS.client){return
}var p=TS.client.windows.getWinByToken(n);
if(!p){TS.error("distributeMsgToWin called with bad token: "+n);
return
}if(window.macgap){try{if(p&&p.window&&p.window.TS&&p.window.TS.ms&&p.window.TS.ms.msg_handlers){p.window.TS.ms.msg_handlers.msgReceivedFromParentWindow(m)
}else{TS.warn("distributeMsgToWin win.window not ready! token: "+n)
}}catch(o){TS.error("error calling macgap win.window.TS.ms.msg_handlers.msgReceivedFromParentWindow");
TS.error(o)
}}else{l(p,"TS.ms.msg_handlers.msgReceivedFromParentWindow("+c(m)+");")
}}});
var j=function(m){return(!!m).toString()
};
var d=function(m){return"("+m.toString()+")()"
};
var c=function(m){return"JSON.parse('"+JSON.stringify(m||null)+"')"
};
var f=function(m){m=String(m);
m=m.replace(/"/g,'\\"');
return'"'+m+'"'
};
var e=function(m){if(!m){return
}if(!TS.client){return
}var n=TS.client.windows.getWinByProp("file_id",m.id);
if(!n){return
}setTimeout(function(){if(window.macgap){try{n.window.TS.files.team_file_deleted_sig.dispatch(m)
}catch(o){}}else{l(n,"window.TS.files.team_file_deleted_sig.dispatch(TS.files.getFileById("+f(m.id)+"));")
}},1000)
};
var k=[];
var h=function(n,m){k.push(arguments);
if(k.length==1){a(n,m)
}};
var a=function(s,r){TS.log(438,'CALLING _executeInAtomSSBParentWin\n\n"'+s+'"');
var t=function(){k.shift();
if(k.length){a.apply(null,k[0])
}};
var p=2000;
var o=1;
var n=2;
var q=function(){var v=setTimeout(function(){o++;
if(o>n){TS.error('_executeInAtomSSBParentWin\n\n"'+s+'"\n\ndid not get a callback in '+p+"ms, bailing");
t()
}else{TS.error('_executeInAtomSSBParentWin\n\n"'+s+'"\n\ndid not get a callback in '+p+"ms, trying again");
q()
}},p);
var u=TSSSB.call("executeJavaScriptInParentWindow",{code:s,callback:function(y,z){clearTimeout(v);
if(y){TS.error('_executeInAtomSSBParentWin\n\n"'+s+'"\n\nreturned err: '+y)
}else{var x=(typeof z=="object")?JSON.stringify(z,null,2):z;
var w=(o==1)?438:0;
TS.log(w,'_executeInAtomSSBParentWin\n\n"'+s+'"\n\nreturned data: '+x)
}if(r){r(y,z)
}setTimeout(t,0)
}});
TS.log(438,'CALLED _executeInAtomSSBParentWin\n\n"'+s+'"\n\n ret: '+u);
return u
};
var m=q();
return !!m
};
var b=[];
var l=function(o,n,m){b.push(arguments);
TS.log(438,"_executeInAtomSSBWin _execute_win_Q: "+b.length);
if(b.length==1){g(o,n,m)
}};
var g=function(o,m,s){TS.log(438,"CALLING _executeInAtomSSBWin token: "+o.token+'\n\n"'+m+'"');
var n=function(){b.shift();
if(b.length){g.apply(null,b[0])
}};
var r=2000;
var t=1;
var q=2;
var u=function(){var w=setTimeout(function(){t++;
if(t>q){TS.error("_executeInAtomSSBWin token: "+o.token+'\n\n"'+m+'"\n\ndid not get a callback in '+r+"ms, bailing");
n()
}else{TS.error("_executeInAtomSSBWin token: "+o.token+'\n\n"'+m+'"\n\ndid not get a callback in '+r+"ms, trying again");
u()
}},r);
var v=TSSSB.call("executeJavaScriptInWindow",{window_token:o.token,code:m,callback:function(z,A){clearTimeout(w);
if(z){TS.error("_executeInAtomSSBWin token: "+o.token+'\n\n"'+m+'"\n\nreturned err: '+z)
}else{var y=(typeof A=="object")?JSON.stringify(A,null,2):A;
var x=(t==1)?438:0;
TS.log(x,"_executeInAtomSSBWin token: "+o.token+'\n\n"'+m+'"\n\nreturned data: '+y)
}if(s){s(z,A)
}setTimeout(n,0)
}});
TS.log(438,"CALLED _executeInAtomSSBWin token: "+o.token+'\n\n"'+m+'"\n\n ret: '+v);
return v
};
var p=u();
return !!p
}
})();
(function(){TS.registerModule("ui",{window_focus_changed_sig:new signals.Signal(),window_unloaded_sig:new signals.Signal(),retina_changed_sig:new signals.Signal(),onStart:function(){$(window).bind("focus",TS.ui.onWindowFocus);
$(window).bind("blur",TS.ui.onWindowBlur);
$("html").bind("mousedown",function(f){TS.ui.onWindowFocus({target:window})
});
var e=(document.hasFocus&&document.hasFocus()&&window.macgap_is_in_active_space)?true:false;
if(e){TS.ui.onWindowFocus({target:window})
}else{TS.ui.onWindowBlur({target:window})
}if(!!window.matchMedia){var d="screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min--moz-device-pixel-ratio: 1.5), screen and (min-device-pixel-ratio: 1.5)";
window.matchMedia(d).addListener(function(){var f=TS.model.is_retina;
TS.model.is_retina=TS.utility.isRetina();
if(TS.model.is_retina===f){return
}TS.info("TS.model.is_retina changed from "+f+" to "+TS.model.is_retina);
TS.ui.retina_changed_sig.dispatch(TS.model.is_retina)
})
}if(TS.model.win_ssb_version){$("body").addClass("winssb")
}$("BODY").delegate(".ts_tip_lazy","mouseenter",function(g){var f=$(g.currentTarget);
var h=f.prop("title");
f.addClass("ts_tip_just_tipped");
f.removeClass("ts_tip_lazy");
f.removeAttr("title");
if(f.hasClass("ts_tip_multiline")){f.append('<span class="ts_tip_tip"><span class="ts_tip_multiline_inner">'+h+"</span></span>")
}else{f.append('<span class="ts_tip_tip">'+h+"</span></span>")
}setTimeout(function(){f.removeClass("ts_tip_just_tipped")
},50)
})
},setUpWindowUnloadHandlers:function(){if(window.macgap){window.onbeforeunload=TS.ui.onWindowUnload
}else{if(typeof window.addEventListener!="undefined"){window.addEventListener("beforeunload",TS.ui.onWindowUnload,false)
}else{if(typeof document.addEventListener!="undefined"){document.addEventListener("beforeunload",TS.ui.onWindowUnload,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onbeforeunload",TS.ui.onWindowUnload)
}else{if(typeof window.onbeforeunload=="function"){window.onbeforeunload=function(){TS.ui.onWindowUnload();
return false
}
}else{window.onbeforeunload=TS.ui.onWindowUnload
}}}}}},onWindowUnload:function(){if(TS.client){TS.client.markLastReadsWithAPI()
}TS.model.window_unloading=true;
TS.ui.window_unloaded_sig.dispatch();
return
},maybeTickleMS:function(){if(!TS.client){return
}TS.client.ui.maybeTickleMS()
},handleDraghoverstartFromWinSSB:function(){$(window).trigger("draghoverstart",[null,true])
},handleDraghoverendFromWinSSB:function(){$(window).trigger("draghoverend")
},handleDropFromWinSSB:function(d){TS.info("handleDropFromWinSSB called files:"+d);
$("body").removeClass("drop-target");
if(TS.client.ui.checkForEditing()){return
}if(!d||!d.length){TS.warn("handleDropFromWinSSB called with no files");
return
}TS.client.ui.validateFiles(d,TS.model.shift_key_pressed)
},onMacSpaceChanged:function(d){if(!d){TS.ui.onWindowBlur({target:window})
}else{if(document.hasFocus()){TS.ui.onWindowFocus({target:window})
}}},onWindowFocus:function(d){if(d.target!==window){return
}if(TS.model.ui.is_window_focused){return
}TS.model.shift_key_pressed=false;
TS.model.insert_key_pressed=false;
TS.model.ui.is_window_focused=true;
if(TS.view){TS.view.updateTitleBarColor()
}TS.ui.window_focus_changed_sig.dispatch(true)
},onWindowBlur:function(d){if(d.target!==window){return
}if(!TS.model.ui.is_window_focused){return
}TS.model.shift_key_pressed=false;
TS.model.insert_key_pressed=false;
TS.model.ui.is_window_focused=false;
TS.ui.window_focus_changed_sig.dispatch(false)
},getFileShareSelectOptions:function(f){var s,r;
var u=(TS.model.archive_view_is_showing&&TS.client.archives.current_model_ob)?TS.client.archives.current_model_ob.id:null;
var d=[];
var w;
var h=TS.members.canUserPostInGeneral();
for(s=0;
s<TS.model.channels.length;
s++){w=TS.model.channels[s];
if((w.is_member||u==w.id)&&(!w.is_general||h)&&!w.is_archived){d.push({model_ob:w,preselected:w.id===TS.model.active_channel_id})
}}var t=[];
var l;
for(s=0;
s<TS.model.groups.length;
s++){l=TS.model.groups[s];
if(!l.is_archived){t.push({model_ob:l,preselected:l.id===TS.model.active_group_id})
}}var v=[];
var e;
var o={};
var g=TS.members.getMembersForUser();
var m;
var k;
for(s=0;
s<g.length;
s++){e=g[s];
if(!e||e.deleted||e.is_self){continue
}m=TS.ims.getImByMemberId(e.id);
k=m?m.id:null;
v.push({model_ob:e,preselected:m&&k===TS.model.active_im_id});
o[e.id]=TS.members.getMemberDisplayNameLowerCase(e)
}var q=[];
var p;
var n={};
if(TS.boot_data.feature_mpim_client){for(s=0;
s<TS.model.mpims.length;
s++){p=TS.model.mpims[s];
q.push({model_ob:p,preselected:p.id===TS.model.active_mpim_id});
n[p.id]=TS.mpims.getDisplayName(p).toLowerCase()
}}if(!TS.model.active_channel_id&&!TS.model.active_group_id&&!TS.model.active_im_id&&!TS.model.active_mpim_id){if(d.length){d[0].preselected=true
}else{if(t.length){t[0].preselected=true
}}}d.sort(function(x,j){return(x.model_ob._name_lc>j.model_ob._name_lc)?1:((j.model_ob._name_lc>x.model_ob._name_lc)?-1:0)
});
t.sort(function(x,j){return(x.model_ob._name_lc>j.model_ob._name_lc)?1:((j.model_ob._name_lc>x.model_ob._name_lc)?-1:0)
});
v.sort(function(x,j){return(o[x.model_ob.id]>o[j.model_ob.id])?1:((o[j.model_ob.id]>o[x.model_ob.id])?-1:0)
});
q.sort(function(x,j){return(n[x.model_ob.id]>n[j.model_ob.id])?1:((n[j.model_ob.id]>n[x.model_ob.id])?-1:0)
});
for(s=0,r=v.length;
s<r;
s++){if(v[s].model_ob.is_slackbot){v.push(v[s]);
v.splice(s,1);
break
}}if(f){return{channels:d.map(function(j){return j.model_ob
}),groups:t.map(function(j){return j.model_ob
}),members:v.map(function(j){return j.model_ob
})}
}return[{fsl_group:true,label:"Channels",children:d.concat(t)},{fsl_group:true,label:"Direct Messages",children:v.concat(q)}]
},bindFileShareDropdowns:function(){var l=$("#select_share_channels");
var f="60%";
if(TS.web&&TS.web.space){f="100%"
}if(l.length!=1){alert("error: "+l.length+" $('#select_share_channels')s");
return
}if(!TS.boot_data.feature_private_channels){l.find('optgroup[label="People"] option').each(function(){var m=$(this).val();
if(m){var o=TS.members.getMemberById(m);
var n=c(o);
if(n){$(this).attr("data-additional-search-field",n)
}}})
}if(!TS.boot_data.feature_private_channels){l.on("change",a).each(function(){$(this).addClass("hidden")
})
}if(TS.boot_data.feature_filter_select_component){if(TS.boot_data.feature_private_channels){var e;
var g;
var h;
var k;
var j;
var d=true;
l.filterSelect({append:true,single:true,data:TS.ui.getFileShareSelectOptions(),template:function(m){return new Handlebars.SafeString(TS.templates.file_sharing_channel_row({item:m.model_ob}))
},filter:function(p,q){if(e!==q){g=[];
h=[];
var n=q.split(/[,| ]/).filter(function(r){return !!r
});
for(var o=0;
o<n.length;
o++){g.push(new RegExp("^"+TS.utility.regexpEscape(n[o]),"i"));
h.push(new RegExp("(-|_|\\+|\\s|\\.|@)"+TS.utility.regexpEscape(n[o]),"i"))
}k=new RegExp("^"+TS.utility.regexpEscape(q),"i");
j=new RegExp("(-|_|\\+|\\s|\\.|@)"+TS.utility.regexpEscape(q),"i");
e=q
}var m=p.model_ob;
if(TS.boot_data.feature_mpim_client&&m.is_mpim){return TS.mpims.checkMpimMatch(m,g,h)
}else{if(m.is_group||m.is_channel){return m.name.match(k)
}else{return TS.members.checkMemberMatch(m,k,d)||TS.members.checkMemberMatch(m,j,d)
}}},onItemAdded:a});
l.css({width:f})
}else{l.filterSelect();
l.filterSelect("getInstance").$container.css({width:f,display:"inline-block",vertical_align:"middle"})
}}else{l.chosen({search_contains:true,width:f})
}l.one("remove",function(){if(TS.boot_data.feature_filter_select_component){$(this).filterSelect("destroy")
}else{$(this).chosen("destroy")
}});
$("#file_sharing_div").on("keydown",function(m){m.stopPropagation()
})
},bindFileShareShareToggle:function(){$("#share_cb").bind("click.toggle_select_list",function(){if($(this).prop("checked")){$(".file_share_select").prop("disabled",false)
}else{$(".file_share_select").prop("disabled",true)
}TS.ui.updateAtChannelWarningNote();
TS.ui.updateAtChannelBlockedNote()
})
},bindFileShareCommentField:function(){$("#file_comment_textarea").bind("keyup",function(){TS.ui.updateAtChannelWarningNote();
TS.ui.updateAtChannelBlockedNote()
})
},needToShowAtChannelWarning:function(m,k){var e;
var f=TS.format.cleanMsg(k);
var l=TS.model.everyone_regex.test(f);
var d=TS.model.channel_regex.test(f);
var g=TS.model.group_regex.test(f);
var j=!!TS.model.prefs.last_seen_at_channel_warning;
var h=j&&TS.utility.date.sameDay(new Date(TS.model.prefs.last_seen_at_channel_warning),new Date());
if(!l&&!d&&!g){return false
}e=TS.shared.getModelObById(m);
if(!e||e.is_im){return false
}if((d||g)&&!TS.members.canUserAtChannelOrAtGroup()){return false
}if(e.is_general&&l&&!TS.members.canUserAtEveryone()){return false
}if(TS.model.team.prefs.warn_before_at_channel==="never"){return false
}if(TS.model.team.prefs.warn_before_at_channel==="once"&&j){return false
}if(TS.model.team.prefs.warn_before_at_channel==="daily"&&h){return false
}return true
},updateAtChannelWarningNote:function(){var m=$("#file_comment_textarea").val();
var n;
if(TS.boot_data.feature_private_channels){var g=$("#select_share_channels").filterSelect("value")[0];
if(g){n=g.model_ob.id||""
}}else{n=$("#select_share_channels").val()
}var k=$("#select_share_at_channel_note");
if(TS.ui.needToShowAtChannelWarning(n,m)){var e=TS.format.cleanMsg(m);
var j="";
var l=true;
if(TS.model.everyone_regex.test(e)){j="everyone"
}else{if(TS.model.channel_regex.test(e)){j="channel"
}else{if(TS.model.group_regex.test(e)){j="group"
}}}var d=TS.shared.getModelObById(n);
if(!d||d.is_im){l=false
}var f=d.members.filter(function(p){var q=TS.members.getMemberById(p);
var o=(q&&!q.deleted&&!q.is_bot&&!q.is_slackbot);
return o&&!q.is_self
}).sort(TS.members.memberSorterByName);
if(f.length<1){l=false
}if(l){var h=TS.templates.at_channel_warning_note({keyword:j,member_count:f.length});
k.html(h);
k.removeClass("hidden");
return
}}k.addClass("hidden")
},updateAtChannelBlockedNote:function(){var j=$("#file_comment_textarea").val();
var g;
if(TS.boot_data.feature_private_channels){var h=$("#select_share_channels").filterSelect("value")[0];
if(h){g=$("#share_cb").is(":checked")&&h.model_ob.id
}}else{g=$("#share_cb").is(":checked")&&$("#select_share_channels").val()
}var e=$("#select_share_at_channel_blocked_note");
var d=$(".modal .btn.dialog_go");
var f=TS.ui.needToBlockAtChannelKeyword(j,null,g);
if(f){e.html(TS.templates.at_channel_blocked_note({keyword:f}));
e.removeClass("hidden");
d.addClass("disabled")
}else{e.addClass("hidden");
d.removeClass("disabled")
}},needToBlockAtChannelKeyword:function(n,f,j){var k=TS.format.cleanMsg(n);
var q=j&&TS.shared.getModelObById(j);
var m=(q&&!q.is_im&&!(TS.boot_data.feature_mpim_client&&q.is_mpim))||(f&&(f.channels.length||f.groups.length));
if(!m){return false
}var h=TS.model.everyone_regex.test(k);
var e=TS.model.here_regex.test(k);
var l=TS.model.channel_regex.test(k);
var o=TS.model.group_regex.test(k);
var g=false;
if(q){g=!!q.is_general
}else{if(f&&f.groups.length===0&&f.channels.length===1){var p=TS.channels.getChannelById(f.channels[0]);
g=!!p.is_general
}}if(g&&h&&(!e&&!l&&!o)){if(TS.members.canUserAtEveryone()){return false
}}if(!TS.members.canUserAtChannelOrAtGroup()){if(e){return"@here"
}if(l){return"@channel"
}if(o){return"@group"
}if(h){return"@everyone"
}}var d=(q&&q.is_general);
if(!d&&f&&f.channels){f.channels.forEach(function(r){var s=TS.channels.getChannelById(r);
if(s.is_general){d=true
}})
}if(d&&!TS.members.canUserAtEveryone()){if(h||e||o||l){return"@everyone"
}}return false
},shouldBlockUploadDialogSubmission:function(){var g=$("#file_comment_textarea").val();
var e;
if(TS.boot_data.feature_private_channels){var f=$("#select_share_channels").filterSelect("value")[0];
if(f){e=$("#share_cb").is(":checked")&&f.model_ob.id
}}else{e=$("#share_cb").is(":checked")&&$("#select_share_channels").val()
}var d=TS.ui.needToBlockAtChannelKeyword(g,null,e);
if(d){TS.info("Can't submit dialog because comment contains "+d);
return true
}return false
},fileShowPublicUrlDialog:function(e){if(!e||!e.public_url_shared){return
}var d=$('<input type="text" id="public_url" class="full_width small">').attr("value",e.permalink_public)[0].outerHTML;
TS.generic_dialog.start({title:"Public link to this file",body:d,show_cancel_button:false,show_close_button:true,show_secondary_go_button:true,secondary_go_button_class:"btn_outline",secondary_go_button_text:"Revoke",show_go_button:true,go_button_text:"Done",esc_for_ok:true,on_secondary_go:function(){TS.ui.fileRevokePublicLink(e.id)
},on_go:function(){TS.generic_dialog.cancel()
},on_show:function(){TS.generic_dialog.div.on("shown",function f(){TS.generic_dialog.div.off("shown",f);
$("#public_url").select().focus().on("keydown",function(g){if(g.which==TS.utility.keymap.esc){TS.generic_dialog.cancel()
}})
})
}})
},fileRevokePublicLink:function(e){var d=TS.files.getFileById(e);
if(!d){return false
}TS.generic_dialog.start({title:"Revoke public file link",body:'<p class="no_bottom_margin">This will disable the Public Link for this file. This will cause any previously shared links to stop working.<br /><br />Are you sure you want to revoke this public link?</p>',go_button_text:"Revoke it",go_button_class:"btn_warning",on_go:function(){TS.files.upsertAndSignal({id:d.id,public_url_shared:false});
TS.api.callImmediately("files.revokePublicURL",{file:d.id})
}})
},startButtonSpinner:function(e){TS.ui.resetButtonSpinner(e);
var d=b(e);
if(!d.isLoading()){d.start()
}},stopButtonSpinner:function(e,g){var d=b(e);
if(d.isLoading()){d.stop();
if(g){var f=$(e).find(".ladda-label").text();
$(e).data("original_text",f);
$(e).removeClass("").addClass("btn_success").find(".ladda-label").html('<i class="ts_icon ts_icon_check_circle_o small_right_margin"></i>Saved')
}}},resetButtonSpinner:function(e){var d=b(e);
if(d.isLoading()){return
}var f=$(e).data("original_text");
if(f){$(e).find(".ladda-label").text(f);
$(e).removeData("original_text");
$(e).removeClass("btn_success").addClass("")
}},test:function(){return{getAdditionalSearchText:c}
}});
var b=function(e){var d=$(e).data("ladda");
if(!d){d=Ladda.create(e);
$(e).data("ladda",d)
}return d
};
function a(f){var d,g;
var h=$("#select_share_channels");
if(TS.boot_data.feature_private_channels){d=f.model_ob.id
}else{d=h.val()
}if(!TS.boot_data.feature_private_channels&&(d=="ts_null_value"||d===null)){h[0].selectedIndex=0;
h.trigger("chosen:updated.chosen");
return
}else{if(!d){return
}else{$("#share_model_ob_id").val(d)
}}$("#select_share_groups_note, #select_share_channels_note, #select_share_ims_note, #select_share_mpims_note, #select_share_channels_join_note").addClass("hidden");
g=d.substring(0,1);
if(g==="C"){$("#select_share_channels_note").removeClass("hidden");
$("#share_context_label").text("in");
var e=TS.shared.getModelObById(d);
if(e&&!e.is_member){$("#select_share_channels_join_note").removeClass("hidden")
}}else{if(g==="U"||g==="D"){$("#select_share_ims_note").removeClass("hidden");
$("#share_context_label").text("with")
}else{if(TS.boot_data.feature_mpim_client&&f&&f.model_ob&&f.model_ob.is_mpim){$("#select_share_mpims_note").removeClass("hidden");
$("#share_context_label").text("with")
}else{$("#select_share_groups_note").removeClass("hidden");
$("#share_context_label").text("in")
}}}TS.ui.updateAtChannelWarningNote();
TS.ui.updateAtChannelBlockedNote()
}function c(f){var d=TS.model.prefs.display_real_names_override;
var e=((TS.model.team.prefs.display_real_names&&d!=-1)||d==1);
if(!f.is_slackbot&&!f.is_bot){if(f.real_name&&f.name){if(e){return"(@"+f.name+")"
}else{return"("+TS.utility.htmlEntities(f.real_name)+")"
}}}return""
}})();
(function(a,b){if(typeof exports=="object"){module.exports=b()
}else{if(typeof define=="function"&&define.amd){define(b)
}else{a.Spinner=b()
}}}(this,function(){var e=["webkit","Moz","ms","O"],q={},p;
function g(r,u){var s=document.createElement(r||"div"),t;
for(t in u){s[t]=u[t]
}return s
}function h(s){for(var r=1,t=arguments.length;
r<t;
r++){s.appendChild(arguments[r])
}return s
}var j=(function(){var r=g("style",{type:"text/css"});
h(document.getElementsByTagName("head")[0],r);
return r.sheet||r.styleSheet
}());
function c(v,r,w,A){var s=["opacity",r,~~(v*100),w,A].join("-"),t=0.01+w/A*100,y=Math.max(1-(1-v)/r*(100-t),v),x=p.substring(0,p.indexOf("Animation")).toLowerCase(),u=x&&"-"+x+"-"||"";
if(!q[s]){j.insertRule("@"+u+"keyframes "+s+"{0%{opacity:"+y+"}"+t+"%{opacity:"+v+"}"+(t+0.01)+"%{opacity:1}"+(t+r)%100+"%{opacity:"+v+"}100%{opacity:"+y+"}}",j.cssRules.length);
q[s]=1
}return s
}function n(v,w){var u=v.style,r,t;
w=w.charAt(0).toUpperCase()+w.slice(1);
for(t=0;
t<e.length;
t++){r=e[t]+w;
if(u[r]!==undefined){return r
}}if(u[w]!==undefined){return w
}}function f(r,t){for(var s in t){r.style[n(r,s)||s]=t[s]
}return r
}function l(t){for(var r=1;
r<arguments.length;
r++){var s=arguments[r];
for(var u in s){if(t[u]===undefined){t[u]=s[u]
}}}return t
}function k(r){var s={x:r.offsetLeft,y:r.offsetTop};
while((r=r.offsetParent)){s.x+=r.offsetLeft,s.y+=r.offsetTop
}return s
}function o(s,r){return typeof s=="string"?s:s[r%s.length]
}var d={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:1/4,fps:20,zIndex:2000000000,className:"spinner",top:"auto",left:"auto",position:"relative"};
function b(r){if(typeof this=="undefined"){return new b(r)
}this.opts=l(r||{},b.defaults,d)
}b.defaults={};
l(b.prototype,{spin:function(A){this.stop();
var E=this,s=E.opts,t=E.el=f(g(0,{className:s.className}),{position:s.position,width:0,zIndex:s.zIndex}),D=s.radius+s.length+s.width,F,C;
if(A){A.insertBefore(t,A.firstChild||null);
C=k(A);
F=k(t);
f(t,{left:(s.left=="auto"?C.x-F.x+(A.offsetWidth>>1):parseInt(s.left,10)+D)+"px",top:(s.top=="auto"?C.y-F.y+(A.offsetHeight>>1):parseInt(s.top,10)+D)+"px"})
}t.setAttribute("role","progressbar");
E.lines(t,E.opts);
if(!p){var x=0,r=(s.lines-1)*(1-s.direction)/2,w,u=s.fps,z=u/s.speed,y=(1-s.opacity)/(z*s.trail/100),B=z/s.lines;
(function v(){x++;
for(var G=0;
G<s.lines;
G++){w=Math.max(1-(x+(s.lines-G)*B)%z*y,s.opacity);
E.opacity(t,G*s.direction+r,w,s)
}E.timeout=E.el&&setTimeout(v,~~(1000/u))
})()
}return E
},stop:function(){var r=this.el;
if(r){clearTimeout(this.timeout);
if(r.parentNode){r.parentNode.removeChild(r)
}this.el=undefined
}return this
},lines:function(t,v){var s=0,w=(v.lines-1)*(1-v.direction)/2,r;
function u(x,y){return f(g(),{position:"absolute",width:(v.length+v.width)+"px",height:v.width+"px",background:x,boxShadow:y,transformOrigin:"left",transform:"rotate("+~~(360/v.lines*s+v.rotate)+"deg) translate("+v.radius+"px,0)",borderRadius:(v.corners*v.width>>1)+"px"})
}for(;
s<v.lines;
s++){r=f(g(),{position:"absolute",top:1+~(v.width/2)+"px",transform:v.hwaccel?"translate3d(0,0,0)":"",opacity:v.opacity,animation:p&&c(v.opacity,v.trail,w+s*v.direction,v.lines)+" "+1/v.speed+"s linear infinite"});
if(v.shadow){h(r,f(u("#000","0 0 4px #000"),{top:2+"px"}))
}h(t,h(r,u(o(v.color,s),"0 0 1px rgba(0,0,0,.1)")))
}return t
},opacity:function(s,r,t){if(r<s.childNodes.length){s.childNodes[r].style.opacity=t
}}});
function m(){function r(t,s){return g("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',s)
}j.addRule(".spin-vml","behavior:url(#default#VML)");
b.prototype.lines=function(v,u){var t=u.length+u.width,B=2*t;
function A(){return f(r("group",{coordsize:B+" "+B,coordorigin:-t+" "+-t}),{width:B,height:B})
}var w=-(u.width+u.length)*2+"px",z=f(A(),{position:"absolute",top:w,left:w}),y;
function x(C,s,D){h(z,h(f(A(),{rotation:360/u.lines*C+"deg",left:~~s}),h(f(r("roundrect",{arcsize:u.corners}),{width:t,height:u.width,left:u.radius,top:-u.width>>1,filter:D}),r("fill",{color:o(u.color,C),opacity:u.opacity}),r("stroke",{opacity:0}))))
}if(u.shadow){for(y=1;
y<=u.lines;
y++){x(y,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")
}}for(y=1;
y<=u.lines;
y++){x(y)
}return h(v,z)
};
b.prototype.opacity=function(t,s,v,u){var w=t.firstChild;
u=u.shadow&&u.lines||0;
if(w&&s+u<w.childNodes.length){w=w.childNodes[s+u];
w=w&&w.firstChild;
w=w&&w.firstChild;
if(w){w.opacity=v
}}}
}var a=f(g("group"),{behavior:"url(#default#VML)"});
if(!n(a,"transform")&&a.adj){m()
}else{p=n(a,"animation")
}return b
}));
(function(b){function a(c){this.init(c)
}a.prototype={value:0,size:100,startAngle:-Math.PI,thickness:"auto",fill:{gradient:["#3aeabb","#fdd250"]},emptyFill:"rgba(0, 0, 0, .1)",animation:{duration:1200,easing:"circleProgressEasing"},animationStartValue:0,reverse:false,lineCap:"butt",constructor:a,el:null,canvas:null,ctx:null,radius:0,arcFill:null,lastFrameValue:0,init:function(c){b.extend(this,c);
this.radius=this.size/2;
this.initWidget();
this.initFill();
this.draw()
},initWidget:function(){var c=this.canvas=this.canvas||b("<canvas>").prependTo(this.el)[0];
c.width=this.size;
c.height=this.size;
this.ctx=c.getContext("2d")
},initFill:function(){var m=this,l=this.fill,o=this.ctx,p=this.size;
if(!l){throw Error("The fill is not specified!")
}if(l.color){this.arcFill=l.color
}if(l.gradient){var c=l.gradient;
if(c.length==1){this.arcFill=c[0]
}else{if(c.length>1){var k=l.gradientAngle||0,j=l.gradientDirection||[p/2*(1-Math.cos(k)),p/2*(1+Math.sin(k)),p/2*(1+Math.cos(k)),p/2*(1-Math.sin(k))];
var n=o.createLinearGradient.apply(o,j);
for(var f=0;
f<c.length;
f++){var d=c[f],g=f/(c.length-1);
if(b.isArray(d)){g=d[1];
d=d[0]
}n.addColorStop(g,d)
}this.arcFill=n
}}}if(l.image){var e;
if(l.image instanceof Image){e=l.image
}else{e=new Image();
e.src=l.image
}if(e.complete){h()
}else{e.onload=h
}}function h(){var q=b("<canvas>")[0];
q.width=m.size;
q.height=m.size;
q.getContext("2d").drawImage(e,0,0,p,p);
m.arcFill=m.ctx.createPattern(q,"no-repeat");
m.drawFrame(m.lastFrameValue)
}},draw:function(){if(this.animation){this.drawAnimated(this.value)
}else{this.drawFrame(this.value)
}},drawFrame:function(c){this.lastFrameValue=c;
this.ctx.clearRect(0,0,this.size,this.size);
this.drawEmptyArc(c);
this.drawArc(c)
},drawArc:function(e){var d=this.ctx,g=this.radius,f=this.getThickness(),c=this.startAngle;
d.save();
d.beginPath();
if(!this.reverse){d.arc(g,g,g-f/2,c,c+Math.PI*2*e)
}else{d.arc(g,g,g-f/2,c-Math.PI*2*e,c)
}d.lineWidth=f;
d.lineCap=this.lineCap;
d.strokeStyle=this.arcFill;
d.stroke();
d.restore()
},drawEmptyArc:function(e){var d=this.ctx,g=this.radius,f=this.getThickness(),c=this.startAngle;
if(e<1){d.save();
d.beginPath();
if(e<=0){d.arc(g,g,g-f/2,0,Math.PI*2)
}else{if(!this.reverse){d.arc(g,g,g-f/2,c+Math.PI*2*e,c)
}else{d.arc(g,g,g-f/2,c,c-Math.PI*2*e)
}}d.lineWidth=f;
d.strokeStyle=this.emptyFill;
d.stroke();
d.restore()
}},drawAnimated:function(d){var c=this,e=this.el;
e.trigger("circle-animation-start");
b(this.canvas).stop(true,true).css({animationProgress:0}).animate({animationProgress:1},b.extend({},this.animation,{step:function(g){var f=c.animationStartValue*(1-g)+d*g;
c.drawFrame(f);
e.trigger("circle-animation-progress",[g,f])
},complete:function(){e.trigger("circle-animation-end")
}}))
},getThickness:function(){return b.isNumeric(this.thickness)?this.thickness:this.size/14
}};
b.circleProgress={defaults:a.prototype};
b.easing.circleProgressEasing=function(f,g,e,j,h){if((g/=h/2)<1){return j/2*g*g*g+e
}return j/2*((g-=2)*g*g+2)+e
};
b.fn.circleProgress=function(d){var c="circle-progress";
if(d=="widget"){var e=this.data(c);
return e&&e.canvas
}return this.each(function(){var h=b(this),f=h.data(c),g=b.isPlainObject(d)?d:{};
if(f){f.init(g)
}else{g.el=h;
f=new a(g);
h.data(c,f)
}})
}
})(jQuery);
/*!
 * Ladda 0.9.0
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2013 Hakim El Hattab, http://hakim.se
 *
 * Slack-specific changes to work around winssb problems. - PK
 */
(function(a,b){if(typeof exports==="object"){module.exports=b()
}else{if(typeof define==="function"&&define.amd){define(["spin"],b)
}else{a.Ladda=b(a.Spinner)
}}}(this,function(c){var e=[];
var j=/atomshell/i.test(navigator.userAgent);
function f(m){if(typeof m==="undefined"){console.warn("Ladda button target must be defined.");
return
}if(!m.querySelector(".ladda-label")){m.innerHTML='<span class="ladda-label">'+m.innerHTML+"</span>"
}var o=k(m);
var n=document.createElement("span");
n.className="ladda-spinner";
m.appendChild(n);
var p;
var l={start:function(){m.setAttribute("disabled","");
if(!j){m.setAttribute("data-loading","")
}clearTimeout(p);
if(!j){o.spin(n)
}this.setProgress(0);
return this
},startAfter:function(q){clearTimeout(p);
p=setTimeout(function(){l.start()
},q);
return this
},stop:function(){m.removeAttribute("disabled");
m.removeAttribute("data-loading");
clearTimeout(p);
p=setTimeout(function(){o.stop()
},1000);
return this
},toggle:function(){if(this.isLoading()){this.stop()
}else{this.start()
}return this
},setProgress:function(q){if(j){return
}q=Math.max(Math.min(q,1),0);
var r=m.querySelector(".ladda-progress");
if(q===0&&r&&r.parentNode){r.parentNode.removeChild(r)
}else{if(!r){r=document.createElement("div");
r.className="ladda-progress";
m.appendChild(r)
}r.style.width=((q||0)*m.offsetWidth)+"px"
}},enable:function(){this.stop();
return this
},disable:function(){this.stop();
m.setAttribute("disabled","");
return this
},isLoading:function(){return m.hasAttribute("data-loading")
}};
e.push(l);
return l
}function g(m,l){while(m.parentNode&&m.tagName!==l){m=m.parentNode
}return m
}function b(p){var o=["input","textarea"];
var l=[];
for(var n=0;
n<o.length;
n++){var q=p.getElementsByTagName(o[n]);
for(var m=0;
m<q.length;
m++){if(q[m].hasAttribute("required")){l.push(q[m])
}}}return l
}function h(p,n){n=n||{};
var m=[];
if(typeof p==="string"){m=d(document.querySelectorAll(p))
}else{if(typeof p==="object"&&typeof p.nodeName==="string"){m=[p]
}}for(var o=0,l=m.length;
o<l;
o++){(function(){var r=m[o];
if(typeof r.addEventListener==="function"){var q=f(r);
var s=-1;
r.addEventListener("click",function(x){var w=true;
var v=g(r,"FORM");
var t=b(v);
if(v&&v.checkValidity){w=v.checkValidity()
}else{for(var u=0;
u<t.length;
u++){if(t[u].value.replace(/^\s+|\s+$/g,"")===""){w=false
}}}if(w){q.startAfter(1);
if(typeof n.timeout==="number"){clearTimeout(s);
s=setTimeout(q.stop,n.timeout)
}if(typeof n.callback==="function"){n.callback.apply(null,[q])
}}},false)
}})()
}}function a(){for(var m=0,l=e.length;
m<l;
m++){e[m].stop()
}}function k(o){var m=o.offsetHeight,r;
if(m>32){m*=0.8
}if(o.hasAttribute("data-spinner-size")){m=parseInt(o.getAttribute("data-spinner-size"),10)
}if(o.hasAttribute("data-spinner-color")){r=o.getAttribute("data-spinner-color")
}var n=12,l=m*0.2,q=l*0.6,p=l<7?2:3;
return new c({color:r||"#fff",lines:n,radius:l,length:q,width:p,zIndex:"auto",top:"auto",left:"auto",className:""})
}function d(m){var l=[];
for(var n=0;
n<m.length;
n++){l.push(m[n])
}return l
}return{bind:h,create:f,stopAll:a}
}));
/*!
 * jQuery scrollintoview() plugin and :scrollable selector filter
 *
 * Version 1.8 (14 Jul 2011)
 * Requires jQuery 1.4 or newer
 *
 * Copyright (c) 2011 Robert Koritnik
 * Licensed under the terms of the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(g){var d={vertical:{x:false,y:true},horizontal:{x:true,y:false},both:{x:true,y:true},x:{x:true,y:false},y:{x:false,y:true}};
var c={duration:"fast",direction:"both",offset:null,px_offset:0};
var f=/^(?:html)$/i;
var h=function(m,l){l=l||(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(m,null):m.currentStyle);
var k=document.defaultView&&document.defaultView.getComputedStyle?true:false;
var j={top:(parseFloat(k?l.borderTopWidth:g.css(m,"borderTopWidth"))||0),left:(parseFloat(k?l.borderLeftWidth:g.css(m,"borderLeftWidth"))||0),bottom:(parseFloat(k?l.borderBottomWidth:g.css(m,"borderBottomWidth"))||0),right:(parseFloat(k?l.borderRightWidth:g.css(m,"borderRightWidth"))||0)};
return{top:j.top,left:j.left,bottom:j.bottom,right:j.right,vertical:j.top+j.bottom,horizontal:j.left+j.right}
};
var e=function(j){var l=g(window);
var k=f.test(j[0].nodeName);
return{border:k?{top:0,left:0,bottom:0,right:0}:h(j[0]),scroll:{top:(k?l:j).scrollTop(),left:(k?l:j).scrollLeft()},scrollbar:{right:k?0:j.innerWidth()-j[0].clientWidth,bottom:k?0:j.innerHeight()-j[0].clientHeight},rect:a(j)}
};
var a=function(j){var k=f.test(j[0].nodeName);
if(!j.___dimensions_rect){j.___dimensions_rect={}
}var m=j.___dimensions_rect;
if(k){m.top=0,m.left=0,m.bottom=j[0].clientHeight,m.right=j[0].clientWidth
}else{var l=j[0].getBoundingClientRect();
m.top=l.top,m.left=l.left,m.bottom=l.bottom,m.right=l.right
}m.height=m.bottom-m.top;
m.width=m.right-m.left;
return m
};
g.fn.extend({dimensions:function(){var j=this.eq(0);
return e(j)
}});
g.fn.extend({dimensions_rect:function(){var j=this.eq(0);
return a(j)
}});
g.fn.extend({scrollintoview:function(s){var l=window.log_scrollintoview;
s=g.extend({},c,s);
s.direction=d[typeof(s.direction)==="string"&&s.direction.toLowerCase()]||d.both;
var o="";
if(s.direction.x===true){o="horizontal"
}if(s.direction.y===true){o=o?"both":"vertical"
}var j=this.eq(0);
var n=j.closest(".monkey_scroller");
if(!n.length){n=j.closest(":scrollable("+o+")")
}var p=s.px_offset;
if(n.length>0){n=n.eq(0);
var m={e:e(j),s:e(n)};
var r={top:m.e.rect.top-(m.s.rect.top+m.s.border.top),bottom:m.s.rect.bottom-m.s.border.bottom-m.s.scrollbar.bottom-m.e.rect.bottom,left:m.e.rect.left-(m.s.rect.left+m.s.border.left),right:m.s.rect.right-m.s.border.right-m.s.scrollbar.right-m.e.rect.right};
if(l&&TS){TS.info("scroller id:"+n.attr("id")+" scrollTop():"+n.scrollTop());
TS.info("dim: "+JSON.stringify(m,null,"  "));
TS.info("rel: "+JSON.stringify(r))
}var k={};
if(s.direction.y===true){var q=(s.offset=="center"||s.offset=="center_vertical")?((m.s.rect.height)-(m.e.rect.height))/2:0;
if(r.top<0){if(l&&TS){TS.warn("case rel.top < 0")
}if(s.offset=="bottom"){q=m.s.rect.height-m.e.rect.height
}k.scrollTop=m.s.scroll.top+r.top-q-p
}else{if(r.top>0&&r.bottom<0){if(l&&TS){TS.warn("case rel.top > 0 && rel.bottom < 0")
}if(s.offset=="top"){q=m.s.rect.height-m.e.rect.height
}k.scrollTop=m.s.scroll.top+Math.min(r.top,-r.bottom)+q-p
}else{if(l&&TS){TS.warn("case WTF")
}}}}if(s.direction.x===true){if(r.left<0){k.scrollLeft=m.s.scroll.left+r.left
}else{if(r.left>0&&r.right<0){k.scrollLeft=m.s.scroll.left+Math.min(r.left,-r.right)
}}}if(!g.isEmptyObject(k)){if(f.test(n[0].nodeName)){n=g("html,body")
}if(l&&TS){TS.info("dest:"+k.scrollTop)
}n.stop().animate(k,{progress:function(t,u,v){if(l&&TS){TS.info(100*u+"% "+n.scrollTop())
}},duration:s.duration}).eq(0).queue(function(t){g.isFunction(s.complete)&&s.complete.call(n[0]);
t()
})
}else{g.isFunction(s.complete)&&s.complete.call(n[0])
}}return this
}});
var b={auto:true,scroll:true,visible:false,hidden:false};
g.extend(g.expr[":"],{scrollable:function(m,k,p,j){var o=d[typeof(p[3])==="string"&&p[3].toLowerCase()]||d.both;
var n=(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(m,null):m.currentStyle);
var q={x:b[n.overflowX.toLowerCase()]||false,y:b[n.overflowY.toLowerCase()]||false,isRoot:f.test(m.nodeName)};
if(!q.x&&!q.y&&!q.isRoot){return false
}var l={height:{scroll:m.scrollHeight,client:m.clientHeight},width:{scroll:m.scrollWidth,client:m.clientWidth},scrollableX:function(){return(q.x||q.isRoot)&&this.width.scroll>this.width.client
},scrollableY:function(){return(q.y||q.isRoot)&&this.height.scroll>this.height.client
}};
return o.y&&l.scrollableY()||o.x&&l.scrollableX()
}})
})(jQuery);
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(l){l.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};
var d=document.createElement("div");
var r={};
function b(w){if(w in d.style){return w
}var v=["Moz","Webkit","O","ms"];
var s=w.charAt(0).toUpperCase()+w.substr(1);
if(w in d.style){return w
}for(var u=0;
u<v.length;
++u){var t=v[u]+s;
if(t in d.style){return t
}}}function e(){d.style[r.transform]="";
d.style[r.transform]="rotateY(90deg)";
return d.style[r.transform]!==""
}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
r.transition=b("transition");
r.transitionDelay=b("transitionDelay");
r.transform=b("transform");
r.transformOrigin=b("transformOrigin");
r.transform3d=e();
var j={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};
var f=r.transitionEnd=j[r.transition]||null;
for(var q in r){if(r.hasOwnProperty(q)&&typeof l.support[q]==="undefined"){l.support[q]=r[q]
}}d=null;
l.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};
l.cssHooks["transit:transform"]={get:function(s){return l(s).data("transform")||new k()
},set:function(t,s){var u=s;
if(!(u instanceof k)){u=new k(u)
}if(r.transform==="WebkitTransform"&&!a){t.style[r.transform]=u.toString(true)
}else{t.style[r.transform]=u.toString()
}l(t).data("transform",u)
}};
l.cssHooks.transform={set:l.cssHooks["transit:transform"].set};
if(l.fn.jquery<"1.8"){l.cssHooks.transformOrigin={get:function(s){return s.style[r.transformOrigin]
},set:function(s,t){s.style[r.transformOrigin]=t
}};
l.cssHooks.transition={get:function(s){return s.style[r.transition]
},set:function(s,t){s.style[r.transition]=t
}}
}o("scale");
o("translate");
o("rotate");
o("rotateX");
o("rotateY");
o("rotate3d");
o("perspective");
o("skewX");
o("skewY");
o("x",true);
o("y",true);
function k(s){if(typeof s==="string"){this.parse(s)
}return this
}k.prototype={setFromString:function(u,t){var s=(typeof t==="string")?t.split(","):(t.constructor===Array)?t:[t];
s.unshift(u);
k.prototype.set.apply(this,s)
},set:function(t){var s=Array.prototype.slice.apply(arguments,[1]);
if(this.setter[t]){this.setter[t].apply(this,s)
}else{this[t]=s.join(",")
}},get:function(s){if(this.getter[s]){return this.getter[s].apply(this)
}else{return this[s]||0
}},setter:{rotate:function(s){this.rotate=p(s,"deg")
},rotateX:function(s){this.rotateX=p(s,"deg")
},rotateY:function(s){this.rotateY=p(s,"deg")
},scale:function(s,t){if(t===undefined){t=s
}this.scale=s+","+t
},skewX:function(s){this.skewX=p(s,"deg")
},skewY:function(s){this.skewY=p(s,"deg")
},perspective:function(s){this.perspective=p(s,"px")
},x:function(s){this.set("translate",s,null)
},y:function(s){this.set("translate",null,s)
},translate:function(s,t){if(this._translateX===undefined){this._translateX=0
}if(this._translateY===undefined){this._translateY=0
}if(s!==null&&s!==undefined){this._translateX=p(s,"px")
}if(t!==null&&t!==undefined){this._translateY=p(t,"px")
}this.translate=this._translateX+","+this._translateY
}},getter:{x:function(){return this._translateX||0
},y:function(){return this._translateY||0
},scale:function(){var t=(this.scale||"1,1").split(",");
if(t[0]){t[0]=parseFloat(t[0])
}if(t[1]){t[1]=parseFloat(t[1])
}return(t[0]===t[1])?t[0]:t
},rotate3d:function(){var u=(this.rotate3d||"0,0,0,0deg").split(",");
for(var t=0;
t<=3;
++t){if(u[t]){u[t]=parseFloat(u[t])
}}if(u[3]){u[3]=p(u[3],"deg")
}return u
}},parse:function(t){var s=this;
t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(u,w,v){s.setFromString(w,v)
})
},toString:function(u){var t=[];
for(var s in this){if(this.hasOwnProperty(s)){if((!r.transform3d)&&((s==="rotateX")||(s==="rotateY")||(s==="perspective")||(s==="transformOrigin"))){continue
}if(s[0]!=="_"){if(u&&(s==="scale")){t.push(s+"3d("+this[s]+",1)")
}else{if(u&&(s==="translate")){t.push(s+"3d("+this[s]+",0)")
}else{t.push(s+"("+this[s]+")")
}}}}}return t.join(" ")
}};
function n(t,s,u){if(s===true){t.queue(u)
}else{if(s){t.queue(s,u)
}else{u()
}}}function h(t){var s=[];
l.each(t,function(u){u=l.camelCase(u);
u=l.transit.propertyMap[u]||l.cssProps[u]||u;
u=c(u);
if(l.inArray(u,s)===-1){s.push(u)
}});
return s
}function g(t,w,y,s){var u=h(t);
if(l.cssEase[y]){y=l.cssEase[y]
}var x=""+m(w)+" "+y;
if(parseInt(s,10)>0){x+=" "+m(s)
}var v=[];
l.each(u,function(A,z){v.push(z+" "+x)
});
return v.join(", ")
}l.fn.transition=l.fn.transit=function(B,u,A,E){var F=this;
var w=0;
var y=true;
var s=jQuery.extend(true,{},B);
if(typeof u==="function"){E=u;
u=undefined
}if(typeof u==="object"){A=u.easing;
w=u.delay||0;
y=u.queue||true;
E=u.complete;
u=u.duration
}if(typeof A==="function"){E=A;
A=undefined
}if(typeof s.easing!=="undefined"){A=s.easing;
delete s.easing
}if(typeof s.duration!=="undefined"){u=s.duration;
delete s.duration
}if(typeof s.complete!=="undefined"){E=s.complete;
delete s.complete
}if(typeof s.queue!=="undefined"){y=s.queue;
delete s.queue
}if(typeof s.delay!=="undefined"){w=s.delay;
delete s.delay
}if(typeof u==="undefined"){u=l.fx.speeds._default
}if(typeof A==="undefined"){A=l.cssEase._default
}u=m(u);
var G=g(s,u,A,w);
var D=l.transit.enabled&&r.transition;
var v=D?(parseInt(u,10)+parseInt(w,10)):0;
if(v===0){var C=function(H){F.css(s);
if(E){E.apply(F)
}if(H){H()
}};
n(F,y,C);
return F
}var z={};
var t=function(J){var I=false;
var H=function(){if(I){F.unbind(f,H)
}if(v>0){F.each(function(){this.style[r.transition]=(z[this]||null)
})
}if(typeof E==="function"){E.apply(F)
}if(typeof J==="function"){J()
}};
if((v>0)&&(f)&&(l.transit.useTransitionEnd)){I=true;
F.bind(f,H)
}else{window.setTimeout(H,v)
}F.each(function(){if(v>0){this.style[r.transition]=G
}l(this).css(B)
})
};
var x=function(H){this.offsetWidth;
t(H)
};
n(F,y,x);
return this
};
function o(t,s){if(!s){l.cssNumber[t]=true
}l.transit.propertyMap[t]=r.transform;
l.cssHooks[t]={get:function(v){var u=l(v).css("transit:transform");
return u.get(t)
},set:function(v,w){var u=l(v).css("transit:transform");
u.setFromString(t,w);
l(v).css({"transit:transform":u})
}}
}function c(s){return s.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()
})
}function p(t,s){if((typeof t==="string")&&(!t.match(/^[\-0-9\.]+$/))){return t
}else{return""+t+s
}}function m(t){var s=t;
if(typeof s==="string"&&(!s.match(/^[\-0-9\.]+/))){s=l.fx.speeds[s]||l.fx.speeds._default
}return p(s,"ms")
}l.transit.getTransitionValue=g
})(jQuery);
(function(e){var d=70;
var b=17;
var a;
var c=function(){if(window.chrome){return b
}var j=e('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>').appendTo("body");
var h=e('<div style="height:100px;"></div>').appendTo(j);
var g=h.innerWidth();
j.css("overflow-y","auto");
var f=h.innerWidth();
j.remove();
return Math.max(g-f,b)
};
e.fn.extend({monkeyScroll:function(f){f=f||{};
return this.each(function(t,K){var j=e(K);
if(j.data("monkeyScroll")){return
}j.addClass("monkey_scroller");
var M=false;
var w=(K.id)?"monkey_scroll_wrapper_for_"+K.id:"";
var n=(f.debug)?"debug":"";
var C=j.wrap('<div class="monkey_scroll_hider '+n+'" />').parent();
var G=C.wrap('<div id="'+w+'" class="monkey_scroll_wrapper '+n+'" />').parent();
var q=G.prepend('<div class="monkey_scroll_bar '+n+'" />').children(".monkey_scroll_bar");
var k=q.prepend(['<div class="monkey_scroll_handle '+n+'">','	<div class="monkey_scroll_handle_inner '+n+'"></div>',"</div>"].join("")).children(".monkey_scroll_handle");
var y=k.find(".monkey_scroll_handle_inner");
var m=Math.max(q.width(),k.width());
var J=parseInt(q.css("margin-top"));
var x=parseInt(q.css("margin-bottom"));
k.css("left",-((k.width()-q.width())/2));
var o=function(){var N=Math.max(Math.min(d,j[0].clientHeight),j[0].clientHeight-(J+x));
return N
};
var z=function(){a=a||c();
return Math.max(m,a)
};
var s="";
var I=function(P){var O=f.bar_colors;
var N,R;
var Q="";
if(!O){return
}for(R in O){if(O.hasOwnProperty(R)){if(R<=P&&(!N||R>N)){N=R
}}}if(N){Q=O[N]
}if(Q!==s){y.css("background",Q);
s=Q
}};
var B=function(){var T=j.data("monkeyScroll");
if(!T){L();
return null
}var S=j[0].clientHeight;
var Q=j[0].scrollHeight;
var P=j[0].scrollTop;
var N=j.width();
var U=Q-S;
var R=(U)?P/U:1;
var O=S/Q;
T.state_ob.st=P;
T.state_ob.sh=Q;
T.state_ob.ch=S;
T.state_ob.w=N;
T.state_ob.ratio=R;
T.state_ob.perc_visible=O;
return T.state_ob
};
var H=function(){var Q=B(j);
if(!Q){return
}var P=Q.perc_visible<1;
C.css("margin-right",P?z():"");
if(!P){if(f.always_show){k.addClass("hidden")
}else{if(j.css("overflow-y")!="scroll"){C.css("width","100%")
}q.addClass("hidden");
return
}}else{if(f.always_show){k.removeClass("hidden")
}}q.removeClass("hidden");
var O=o();
q.css("height",O);
k.css("height",Math.max(d,O*Q.perc_visible));
var N=O-k.height();
k.css("top",N*Q.ratio);
I(Q.ratio)
};
var u=function(){var Q=Date.now();
var N=5;
C.css("width","");
C.css("margin-right","");
j.css("width","");
j.width(j.width());
var P=j.innerWidth()-z();
if(f.no_gutter){P+=N
}C.width(P);
if(f.bar_on_left){if("bar_on_left_y" in f){q.css("margin-left",f.bar_on_left_y)
}else{q.css("margin-left",(z()-q.width())/2)
}}else{var O=C.width()+((z()-q.width())/2);
if(f.no_gutter){O-=N
}q.css("margin-left",O)
}H();
TS.log(389,"update for "+j.attr("id")+" took "+(Date.now()-Q)+"ms")
};
j.data("monkeyScroll",{bar:q,handle:k,state_ob:{},updateFunc:g});
var D=function(N){if(j.data("disable-scroll")){return
}H()
};
var v=function(S){S.preventDefault();
var O=function(X){var W=k.height();
var V=(X-(W/2))/(q.height()-W);
var U=j[0].scrollHeight-j[0].clientHeight;
return U*V
};
var P=e(S.target);
var T=S.pageY-P.offset().top;
if(P.hasClass("monkey_scroll_bar")){j.animate({scrollTop:O(T)},200);
return
}var R=T;
var N=function(U){var V=U.pageY-q.offset().top+(k.height()/2)-R;
j.scrollTop(O(V))
};
var Q=function(){e("html").unbind("mousemove.monkeyScroll",N);
e("html").unbind("mouseup.monkeyScroll",Q)
};
Q();
e("html").bind("mousemove.monkeyScroll",N);
e("html").bind("mouseup.monkeyScroll",Q)
};
q.bind("mousedown",v);
j.bind("scroll",D);
var A=function(){a=null;
j.css("width","");
g()
};
var F=function(N){M=true;
TS.utility.throttle.method(A,"resize_monkey",150)
};
e(window).bind("resize.monkey",F);
var l;
var E=function(){if(l){return
}l=true;
e("html").bind("mouseup.monkeyScrollOverflowfixer",r)
};
var r=function(){C.scrollLeft(0);
l=false;
e("html").unbind("mouseup.monkeyScrollOverflowfixer",arguments.callee)
};
C.bind("scroll",E);
u();
var h;
function g(O){if(j.data("disable-scroll")){return
}function N(){var P=B();
if(!P){return
}if(O||!h||P.sh!=h.sh||P.ch!=h.ch||P.w!=h.w){u();
if(!h){h={}
}h.st=P.st;
h.sh=P.sh;
h.ch=P.ch;
h.w=P.w;
h.ratio=P.ratio;
h.perc_visible=P.perc_visible
}}if(window.bowser&&(bowser.msie||(M&&TS.model.is_mac&&(bowser.safari||TS.model.is_our_app)))){N()
}else{TS.utility.queueRAF(N)
}M=false
}var p;
if(f.update_on_interval){p=setInterval(g,200)
}var L=function(){e(window).unbind("resize.monkey",F);
e("html").unbind("mouseup.monkeyScrollOverflowfixer",r);
if(p){clearInterval(p)
}j.removeData("monkeyScroll")
};
j.bind("remove",function(){L()
})
})
}})
})(jQuery);
(function(a){a.fn.setCursorPosition=function(b){this.each(function(d,e){if(e.setSelectionRange){e.setSelectionRange(b,b)
}else{if(e.createTextRange){var c=e.createTextRange();
c.collapse(true);
c.moveEnd("character",b);
c.moveStart("character",b);
c.select()
}}});
return this
};
a.fn.getCursorPosition=function(){var c=this.get(0);
if(!c){return
}if("selectionStart" in c){return c.selectionStart
}else{if(document.selection){c.focus();
var d=document.selection.createRange();
var b=document.selection.createRange().text.length;
d.moveStart("character",-c.value.length);
return d.text.length-b
}}};
a.fn.getCursorRange=function(){var b=this.get(0);
if(!b){return
}if("selectionStart" in b){return{s:b.selectionStart,l:b.selectionEnd-b.selectionStart}
}else{if(document.selection){}}};
jQuery.fn.highlight=function(e,c,d,b){b=(b==undefined)?2000:b;
a(this).each(function(){var f=a(this);
var g=false;
if(f.data("highlighted")){return
}f.data("highlighted",true);
if(f.css("position")=="static"){f.css("position","relative");
g=true
}a('<div class="'+c+'" />').width(f.outerWidth()).height(f.outerHeight()).css({position:"absolute",left:0,top:0,"background-color":"#FFF3B8",opacity:".6","z-index":"1030","pointer-events":"none"}).appendTo(f).delay(b).fadeOut(e).queue(function(){a(this).remove();
f.data("highlighted",false);
if(g){f.css("position","static")
}if(d){d()
}})
})
},jQuery.fn.highlightText=function(e,c,d,b){b=(b==undefined)?2000:b;
a(this).each(function(){var f=a(this);
var g=a(this).css("background-color");
if(f.data("highlighted")){return
}f.data("highlighted",true);
f.css({"background-color":"#FFF3B8",transition:"background-color 0.25s"}).delay(b).queue(function(){f.css({"background-color":g});
f.data("highlighted",false);
if(d){d()
}})
})
},jQuery.fn.hideWithRememberedScrollTop=function(){a(this).each(function(){var b=a(this);
if(b.hasClass("hidden")){return
}b.data("remembered_scrolltop",b.scrollTop());
var c=b.find(":scrollable()");
c.each(function(d,f){var e=a(f);
e.data("remembered_scrolltop",e.scrollTop())
});
b.addClass("hidden")
})
};
jQuery.fn.unhideWithRememberedScrollTop=function(){a(this).each(function(){var c=a(this);
if(!c.hasClass("hidden")){return
}c.removeClass("hidden");
var b=c.data("remembered_scrolltop");
if(b!=undefined){c.scrollTop(b)
}var d=c.find(":scrollable()");
if(d){d.each(function(e,g){var f=a(g);
b=f.data("remembered_scrolltop");
if(b!=undefined){f.scrollTop(b)
}})
}})
}
})(jQuery);
(function(a){if(!a){return
}a.fn.headroom=function(b){return this.each(function(){var e=a(this),d=e.data("headroom"),c=typeof b==="object"&&b;
c=a.extend(true,{},Headroom.options,c);
if(!d){d=new Headroom(this,c);
d.init();
e.data("headroom",d)
}if(typeof b==="string"){d[b]()
}})
};
a("[data-headroom]").each(function(){var b=a(this);
b.headroom(b.data())
})
}(window.Zepto||window.jQuery));
/*!
 * jQuery TextChange Plugin
 * http://www.zurb.com/playground/jquery-text-change-custom-event
 *
 * Copyright 2010, ZURB
 * Released under the MIT License
 */
(function(a){a.event.special.textchange={setup:function(c,b){a(this).data("textchange_lastvalue",this.contentEditable==="true"?a(this).html():a(this).val());
a(this).bind("keyup.textchange",a.event.special.textchange.handler);
a(this).bind("cut.textchange paste.textchange input.textchange",a.event.special.textchange.delayedHandler)
},teardown:function(b){a(this).unbind(".textchange")
},handler:function(b){a.event.special.textchange.triggerIfChanged(a(this))
},delayedHandler:function(c){var b=a(this);
if(!a.event.special.textchange.timer){a.event.special.textchange.timer=setTimeout(function(){a.event.special.textchange.timer=null;
a.event.special.textchange.triggerIfChanged(b)
},250)
}},triggerIfChanged:function(b){var c=b[0].contentEditable==="true"?b.html():b.val();
if(c!==b.data("textchange_lastvalue")){b.trigger("textchange",[b.data("textchange_lastvalue")]);
b.data("textchange_lastvalue",c)
}},timer:null};
a.event.special.hastext={setup:function(c,b){a(this).bind("textchange",a.event.special.hastext.handler)
},teardown:function(b){a(this).unbind("textchange",a.event.special.hastext.handler)
},handler:function(c,b){if((b==="")&&b!==a(this).val()){a(this).trigger("hastext")
}}};
a.event.special.notext={setup:function(c,b){a(this).bind("textchange",a.event.special.notext.handler)
},teardown:function(b){a(this).unbind("textchange",a.event.special.notext.handler)
},handler:function(c,b){if(a(this).val()===""&&a(this).val()!==b){a(this).trigger("notext")
}}}
})(jQuery);
(function(a){a.fn.autogrow=function(b){return this.filter("textarea").each(function(){var d=this;
var f=a(d);
var e=f.height();
var c=f.hasClass("autogrow-short")?0:parseInt(f.css("lineHeight"))||0;
var h=a("<div></div>").css({position:"absolute",top:-10000,left:-10000,width:f.width(),fontSize:f.css("fontSize"),fontFamily:f.css("fontFamily"),fontWeight:f.css("fontWeight"),lineHeight:f.css("lineHeight"),resize:"none","word-wrap":"break-word"}).appendTo(document.body);
var g=function(k){var j=function(s,v){for(var t=0,u="";
t<v;
t++){u+=s
}return u
};
var l=d.value.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>").replace(/ {2,}/g,function(s){return j("&nbsp;",s.length-1)+" "
});
if(k&&k.data&&k.data.event==="keydown"&&k.keyCode===13){l+="<br />"
}var q=f.height();
h.css("width",f.width());
h.html(l+(c===0?"...":""));
f.height(Math.max(h.height()+c,e));
var p=f.getCursorPosition();
var r=f.val().length;
if(r-p<10){if(f.length&&document.activeElement==f[0]){var n=f.closest(".flex_content_scroller");
var o=f.closest(".modal");
if(n.length){var m=f;
if(f.data("el-id-to-keep-in-view")){m=a("#"+f.data("el-id-to-keep-in-view"));
if(!m.length){m=f
}}if(!TS.client.ui.isElInView(m,-50,n.dimensions_rect())){m.scrollintoview({offset:"bottom",px_offset:-50,duration:200})
}if(f.height()!=q){if(n.data("monkeyScroll")){n.data("monkeyScroll").updateFunc()
}}}else{if(o.length==-1){f.scrollintoview({offset:"bottom",px_offset:-50,duration:200})
}}}}};
f.change(g).keyup(g).keydown({event:"keydown"},g);
a(window).on("resize",g);
f.one("remove",function(){a(window).off("resize",g)
});
g()
})
}
})(jQuery);
(function(a){a.event.special.destroyed={remove:function(b){if(b.handler){b.handler()
}}}
})(jQuery);
$.fn.draghover=function(a){return this.each(function(){var c=$(),b=$(this);
b.on("dragenter",function(d){if(c.size()===0){b.trigger("draghoverstart",d)
}c=c.add(d.target)
});
b.on("dragleave drop",function(d){setTimeout(function(){c=c.not(d.target);
if(c.size()===0){b.trigger("draghoverend")
}},1)
})
})
};
/*!
	Autosize v1.18.9 - 2014-05-27
	Automatically adjust textarea height based on user input.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(b){var e={className:"autosizejs",id:"autosizejs",append:"\n",callback:false,resizeDelay:200,placeholder:true},f='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',a=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],d,c=b(f).data("autosize",true)[0];
c.style.lineHeight="99px";
if(b(c).css("lineHeight")==="99px"){a.push("lineHeight")
}c.style.lineHeight="";
b.fn.autosize=function(g){if(!this.length){return this
}g=b.extend({},e,g||{});
if(c.parentNode!==document.body){b(document.body).append(c)
}return this.each(function(){var n=this,m=b(n),t,v,l=0,u=b.isFunction(g.callback),o={height:n.style.height,overflow:n.style.overflow,overflowY:n.style.overflowY,wordWrap:n.style.wordWrap,resize:n.style.resize},h=m.width(),k=m.css("resize");
if(m.data("autosize")){return
}m.data("autosize",true);
if(m.css("box-sizing")==="border-box"||m.css("-moz-box-sizing")==="border-box"||m.css("-webkit-box-sizing")==="border-box"){l=m.outerHeight()-m.height()
}l-=(typeof g.boxOffset!=="undefined"?g.boxOffset:0);
v=Math.max(parseInt(m.css("minHeight"),10)-l||0,m.height());
m.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"});
if(k==="vertical"){m.css("resize","none")
}else{if(k==="both"){m.css("resize","horizontal")
}}function p(){var x;
var w=window.getComputedStyle?window.getComputedStyle(n,null):false;
if(w){x=n.getBoundingClientRect().width;
if(x===0||typeof x!=="number"){x=parseInt(w.width,10)
}b.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(y,z){x-=parseInt(w[z],10)
})
}else{x=m.width()
}c.style.width=Math.max(x,0)+"px"
}function s(){var x={};
d=n;
c.className=g.className;
c.id=g.id;
t=parseInt(m.css("maxHeight"),10);
b.each(a,function(z,A){x[A]=m.css(A)
});
b(c).css(x).attr("wrap",m.attr("wrap"));
p();
if(window.chrome){var w=n.style.width;
n.style.width="0px";
var y=n.offsetWidth;
n.style.width=w
}}function r(){var w,x;
if(d!==n){s()
}else{p()
}if(!n.value&&g.placeholder){c.value=(m.attr("placeholder")||"")+g.append
}else{c.value=n.value+g.append
}c.style.overflowY=n.style.overflowY;
x=parseInt(n.style.height,10);
c.scrollTop=90000;
w=c.scrollTop;
if(t&&w>t){n.style.overflowY="scroll";
w=t
}else{n.style.overflowY="hidden";
if(w<v){w=v
}}w=parseInt(w,10);
if(x!==w){n.style.height=w+"px";
if(u){g.callback.call(n,x,w)
}}}function q(){var w=m.width();
if(w!==h){h=w;
r()
}}function j(){TS.utility.throttle.method(q,"autosize_resize",g.resizeDelay)
}if("onpropertychange" in n){if("oninput" in n){m.on("input keyup",r)
}else{m.on("propertychange.autosize",function(){if(event.propertyName==="value"){r()
}})
}}else{m.on("input",r)
}if(g.resizeDelay!==false){b(window).on("resize.autosize",j)
}m.on("autosize.resize",r);
m.on("autosize-resize",r);
m.on("autosize.resizeIncludeStyle",function(){d=null;
r()
});
m.on("autosize.destroy",function(){d=null;
b(window).off("resize",j);
m.off("autosize").off(".autosize").css(o).removeData("autosize")
});
r()
})
}
}(window.jQuery||window.$));
(function(c){var b,a=c();
c.fn.sortable=function(d){var e=String(d);
d=c.extend({connectWith:false},d);
return this.each(function(){if(/^(enable|disable|destroy)$/.test(e)){var f=c(this).children(c(this).data("items")).attr("draggable",e=="enable");
if(e=="destroy"){f.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s")
}return
}var h,g,f=c(this).children(d.items);
var j=c("<"+(/^(ul|ol)$/i.test(this.tagName)?"li":"div")+' class="sortable-placeholder">');
f.find(d.handle).mousedown(function(){h=true
}).mouseup(function(){h=false
});
c(this).data("items",d.items);
a=a.add(j);
if(d.connectWith){c(d.connectWith).add(this).data("connectWith",d.connectWith)
}f.attr("draggable","true").on("dragstart.h5s",function(l){if(d.handle&&!h){return false
}h=false;
var k=l.originalEvent.dataTransfer;
k.effectAllowed="move";
k.setData("Text","dummy");
g=(b=c(this)).addClass("sortable-dragging").index()
}).on("dragend.h5s",function(){if(!b){return
}b.removeClass("sortable-dragging").show();
a.detach();
if(g!=b.index()){b.parent().trigger("sortupdate",{item:b})
}b=null
}).not("a[href], img").on("selectstart.h5s",function(){this.dragDrop&&this.dragDrop();
return false
}).end().add([this,j]).on("dragover.h5s dragenter.h5s drop.h5s",function(k){if(!f.is(b)&&d.connectWith!==c(b).parent().data("connectWith")){return true
}if(k.type=="drop"){k.stopPropagation();
a.filter(":visible").after(b);
b.trigger("dragend.h5s");
return false
}k.preventDefault();
k.originalEvent.dataTransfer.dropEffect="move";
if(f.is(this)){if(d.forcePlaceholderSize&&b.is(":visible")){j.height(b.outerHeight())
}b.hide();
c(this)[j.index()<c(this).index()?"after":"before"](j);
a.not(j).detach()
}else{if(!a.is(this)&&!c(this).children(d.items).length){a.detach();
c(this).append(j)
}}return false
})
})
}
})(jQuery);
(function(f){function h(l){var o=l.data("TS-tabComplete");
var k=o.cmds=[];
var p=TS.model.input_history;
var n;
for(var m=0;
m<p.length;
m++){n=p[m];
if(n.indexOf("/")==0){k.push(n)
}}return k
}function j(o,r,q){if(TS.model.input_history.length==0){return false
}var m=r.data("TS-tabComplete");
var k=m.cmds||h(r);
var s;
if(m.cmd_matches){s=m.cmd_matches;
if(q.shiftKey){m.cmd_matches_index--;
if(m.cmd_matches_index<0){m.cmd_matches_index=m.cmd_matches.length-1
}}else{m.cmd_matches_index++;
if(m.cmd_matches_index>=m.cmd_matches.length){m.cmd_matches_index=0
}}}else{s=[];
m.cmd_matches_index=0;
var l;
for(var n=0;
n<k.length;
n++){l=k[n];
if(o&&l.toLowerCase().indexOf(o.toLowerCase())!=0){continue
}s.push(l)
}if(!s.length){return false
}if(s.length>1){m.cmd_matches=s
}}var p=s[m.cmd_matches_index];
if(m.onComplete){m.onComplete(p)
}r.setCursorPosition(r.val().length);
return true
}function b(t,r,z){var C=r.data("TS-tabComplete");
var l=r.getCursorPosition();
if(l==0){return false
}var s=t.substr(0,l);
var u=s.split(" ");
var m=u[u.length-1].toLowerCase();
var w="";
if(!m&&!C.channel_matches){return false
}if(m){var q=false;
if(m.indexOf("#")==0){q=true
}if(C.channel_prefix){if(m.indexOf(C.channel_prefix+"#")==0){q=true
}if(m.indexOf(C.channel_prefix)==0){q=true
}}if(!q){return false
}}var n;
var o;
if(!m){n=C.channel_matches;
if(z.shiftKey){C.channel_matches_index--;
if(C.channel_matches_index<0){C.channel_matches_index=C.channel_matches.length-1
}}else{C.channel_matches_index++;
if(C.channel_matches_index>=C.channel_matches.length){C.channel_matches_index=0
}}o=n[C.channel_matches_index];
var v=u[u.length-2];
if(C.channel_prefix&&v.toLowerCase().indexOf(C.channel_prefix.toLowerCase())==0){w=C.channel_prefix
}u[u.length-2]=w+"#"+o
}else{n=[];
var k=TS.channels.getChannelsForUser();
var D;
var E;
var y=m.replace("#","");
if(C.channel_prefix&&m.toLowerCase().indexOf(C.channel_prefix.toLowerCase())==0){y=y.substr(C.channel_prefix.length);
w=C.channel_prefix
}for(var x=0;
x<k.length;
x++){D=k[x];
if(D.is_archived){continue
}E=D._name_lc;
if(E.indexOf(y)==0||("#"+E).indexOf(y)==0){n.push(D.name)
}}if(!n.length){return false
}g(r,"subsequent name match press");
C.channel_matches_index=0;
if(n.length>1){C.channel_matches=n
}o=n[C.channel_matches_index];
u[u.length-1]=w+"#"+o+" "
}var B=u.join(" ");
var p=B.length;
var A=t.replace(s,B);
if(C.onComplete){C.onComplete(A)
}r.setCursorPosition(p);
return true
}function c(t,r,B){var F=r.data("TS-tabComplete");
var m=r.getCursorPosition();
if(m==0){return false
}var s=t.substr(0,m);
var v=s.split(" ");
var n=v[v.length-1].toLowerCase();
var x="";
if(!n&&!F.member_matches){return false
}var A="";
var u="";
var o;
var p;
if(!n){o=F.member_matches;
if(B.shiftKey){F.member_matches_index--;
if(F.member_matches_index<0){F.member_matches_index=F.member_matches.length-1
}}else{F.member_matches_index++;
if(F.member_matches_index>=F.member_matches.length){F.member_matches_index=0
}}p=o[F.member_matches_index];
var w=v[v.length-2];
if(F.member_prefix&&w.toLowerCase().indexOf(F.member_prefix.toLowerCase())==0){x=F.member_prefix
}if(v.length-2==0&&F.member_colon){A=":"
}if(w.indexOf("@")>-1){u="@"
}v[v.length-2]=x+u+p+A
}else{o=[];
var E=[];
var l=(F.include_self)?TS.members.getActiveMembersWithSelfAndSlackbot():TS.members.getActiveMembersWithSlackbotAndNotSelf();
for(var y=0;
y<l.length;
y++){if(l[y].deleted){continue
}E.push(l[y])
}var k;
var G;
var z=n;
if(F.member_prefix&&n.toLowerCase().indexOf(F.member_prefix.toLowerCase())==0){z=z.substr(F.member_prefix.length);
x=F.member_prefix
}for(var y=0;
y<E.length;
y++){k=E[y];
G=k._name_lc;
if(G.indexOf(z)==0||("@"+G).indexOf(z)==0){o.push(k.name)
}}if(F.complete_member_specials){if(("@everyone").indexOf(z)==0){o.push("everyone")
}if(("@channel").indexOf(z)==0){o.push("channel")
}if(("@group").indexOf(z)==0){o.push("group")
}}if(!o.length){return false
}g(r,"subsequent name match press");
F.member_matches_index=0;
if(o.length>1){F.member_matches=o
}p=o[F.member_matches_index];
if(v.length-1==0&&F.member_colon){A=":"
}if(v[v.length-1].indexOf("@")>-1){u="@"
}v[v.length-1]=x+u+p+A+" "
}var D=v.join(" ");
var q=D.length;
var C=t.replace(s,D);
if(F.onComplete){F.onComplete(C)
}r.setCursorPosition(q);
return true
}function a(t,r,y){var B=r.data("TS-tabComplete");
var m=r.getCursorPosition();
if(m==0){return false
}var s=t.substr(0,m);
var u=s.split(" ");
var n=u[u.length-1].toLowerCase();
if(!n&&!B.emoji_matches){return false
}if(n&&n.indexOf(":")!=0){return false
}var q;
var o;
if(!n){q=B.emoji_matches;
if(y.shiftKey){B.emoji_matches_index--;
if(B.emoji_matches_index<0){B.emoji_matches_index=B.emoji_matches.length-1
}}else{B.emoji_matches_index++;
if(B.emoji_matches_index>=B.emoji_matches.length){B.emoji_matches_index=0
}}o=q[B.emoji_matches_index];
var v=u[u.length-2];
u[u.length-2]=":"+o+":"
}else{q=[];
var l=TS.model.emoji_names;
var C;
var x=n.replace(":","");
var k=new RegExp("(^)"+TS.utility.regexpEscape(x,1000),"i");
for(var w=0;
w<l.length;
w++){C=l[w];
if(!x||C.match(x)){q.push(C)
}}if(!q.length){return false
}g(r,"subsequent emoji match press");
B.emoji_matches_index=0;
if(q.length>1){B.emoji_matches=q
}o=q[B.emoji_matches_index];
u[u.length-1]=":"+o+": "
}var A=u.join(" ");
var p=A.length;
var z=t.replace(s,A);
if(B.onComplete){B.onComplete(z)
}r.setCursorPosition(p);
return true
}function g(k,l){var m=k.data("TS-tabComplete");
m.cmds=null;
m.cmd_matches=null;
m.cmd_matches_index=-1;
m.member_matches=null;
m.member_matches_index=-1;
m.emoji_matches=null;
m.emoji_matches_index=-1;
m.channel_matches=null;
m.channel_matches_index=-1
}function e(l,n){var m=l.data("TS-tabComplete");
var k=(l.val());
if(m.complete_emoji&&a(k,l,n)){}else{if(m.complete_channels&&b(k,l,n)){}else{if(m.complete_members&&c(k,l,n)){}else{if(m.complete_cmds&&(!k||k.indexOf("/")==0)&&j(k,l,n)){}}}}}var d={init:function(k){var l=f.extend({complete_member_specials:false,complete_members:true,member_prefix:"",member_colon:true,complete_cmds:false,complete_emoji:false,complete_channels:false,channel_prefix:"",include_self:false},k);
return this.each(function(){var m=f(this);
if(m.data("TS-tabComplete")){return
}m.data("TS-tabComplete",{cmds:null,cmd_matches:null,cmd_matches_index:-1,member_matches:null,member_matches_index:-1,complete_member_specials:l.complete_member_specials,complete_members:l.complete_members,member_prefix:l.member_prefix,member_colon:l.member_colon,complete_cmds:l.complete_cmds,complete_emoji:l.complete_emoji,complete_channels:l.complete_channels,channel_prefix:l.channel_prefix,include_self:l.include_self,onComplete:l.onComplete});
m.bind("focus",function(n){m.TS_tabComplete("resetMatches","focus")
})
})
},resetMatches:function(k){return this.each(function(){g(f(this),k)
})
},onTabKey:function(k){k.preventDefault();
return this.each(function(){e(f(this),k)
})
}};
f.fn.TS_tabComplete=function(k){if(d[k]){return d[k].apply(this,Array.prototype.slice.call(arguments,1))
}else{if(typeof k==="object"||!k){return d.init.apply(this,arguments)
}else{f.error("Method "+k+" does not exist on jQuery.tooltip")
}}}
})(jQuery);
(function(j){var o=false;
var n="MATCHES_SET";
var e="MATCH_CHANGED";
function h(s,r){if(s>r){return 0
}if(s<0){return r
}return s
}function m(s){var v=s.data("TS-tabComplete");
var r=v.cmds=[];
var w=TS.model.input_history;
var u;
for(var t=0;
t<w.length;
t++){u=w[t];
if(u.indexOf("/")==0){r.push(u)
}}return r
}function p(v,y,x){if(TS.model.input_history.length==0){return false
}var t=y.data("TS-tabComplete");
var r=t.cmds||m(y);
var z;
if(t.cmd_matches){z=t.cmd_matches;
if(x&&x.shiftKey){t.cmd_matches_index--;
if(t.cmd_matches_index<0){t.cmd_matches_index=t.cmd_matches.length-1
}}else{t.cmd_matches_index++;
if(t.cmd_matches_index>=t.cmd_matches.length){t.cmd_matches_index=0
}}}else{z=[];
t.cmd_matches_index=0;
var s;
for(var u=0;
u<r.length;
u++){s=r[u];
if(v&&s.toLowerCase().indexOf(v.toLowerCase())!=0){continue
}z.push(s)
}if(!z.length){return false
}if(z.length>1){t.cmd_matches=z
}}if(!x){return true
}var w=z[t.cmd_matches_index];
if(t.onComplete){t.onComplete(w)
}y.focus().setCursorPosition(1000000);
return true
}function g(B,z,J){var O=z.data("TS-tabComplete");
var u=z.getCursorPosition();
if(u==0){}if(B.indexOf("/")!=0){return false
}var y=B.substr(u);
var M=B.substr(0,u).split("\n");
var A=M.pop();
var C=A.split(" ");
var v=C[C.length-1].toLowerCase();
var s=TS.cmd_handlers;
var D="";
if(!v&&!O.cmd_matches){return false
}if(C.length>1&&C[0] in s){}if(v&&v.indexOf("/")!=0){return false
}var r;
var w;
if(J&&J.chosen_index!=undefined){r=O.cmd_matches;
O.cmd_matches_index=h(J.chosen_index,O.cmd_matches.length-1);
w=r[O.cmd_matches_index]
}else{if(D){TS.dir(0,J);
O.matched_on=D;
O.cmd_matches_index=0;
O.cmd_matches=[D];
return n
}else{if(!v){r=O.cmd_matches;
if(J&&J.shiftKey){O.cmd_matches_index--;
if(O.cmd_matches_index<0){O.cmd_matches_index=O.cmd_matches.length-1
}}else{O.cmd_matches_index++;
if(O.cmd_matches_index>=O.cmd_matches.length){O.cmd_matches_index=0
}}w=r[O.cmd_matches_index]
}else{r=[];
var F;
var I=v;
var t=new RegExp(TS.utility.regexpEscape(I,1000),"i");
var E=TS.shared.getActiveModelOb();
for(var G in s){F=s[G];
if((typeof F.autocomplete==="function"&&!F.autocomplete())||F.autocomplete===false||F.alias_of){continue
}if(G=="/archive"||G=="/unarchive"){if(TS.model.active_group_id&&TS.model.user.is_restricted){continue
}if(TS.model.active_channel_id&&!TS.members.canUserArchiveChannels()){continue
}if(TS.model.active_im_id){continue
}if(TS.model.active_mpim_id){continue
}}else{if(G=="/kick"||G=="/remove"){if(E.is_archived){continue
}if(TS.model.active_group_id&&!TS.members.canUserKickFromGroups()){continue
}if(TS.model.active_channel_id&&!TS.members.canUserKickFromChannels()){continue
}if(TS.model.active_im_id){continue
}if(TS.model.active_mpim_id){continue
}}else{if(G=="/join"){if(TS.model.user.is_restricted){continue
}}else{if(G=="/feed"){if(TS.model.user.is_restricted){continue
}}else{if(G=="/invite"){if(TS.model.user.is_ultra_restricted){continue
}}else{if(G=="/invite_people"){if(!TS.model.user.is_admin){continue
}}else{if(G=="/topic"||G=="/purpose"){if(TS.model.active_im_id){continue
}if(TS.model.active_mpim_id){continue
}if(TS.model.user.is_restricted){continue
}if(E.is_general&&!TS.members.canUserPostInGeneral()){continue
}}else{if(G=="/leave"){if(TS.model.active_group_id){continue
}}}}}}}}}if(F.type==="custom"||F.type==="service"){if(TS.boot_data.feature_client_integration_management){if(!TS.members.canUserUseSlashCommands()){continue
}}else{if(TS.model.user.is_restricted){if(TS.model.user.is_ultra_restricted){continue
}if(TS.model.team.prefs.commands_only_regular){continue
}}}}name=G;
if(!I||name.match(t)){r.push(name)
}else{if(F.aliases){for(var H=0;
H<F.aliases.length;
H++){if(F.aliases[H].match(t)){r.push(name);
break
}}}}}if(!r.length){return false
}r.sort(function N(Q,P){var R=Q.toLowerCase();
var S=P.toLowerCase();
if(R<S){return -1
}if(R>S){return 1
}return 0
});
O.cmd_matches_index=0;
if(r.length>0){O.cmd_matches=r
}w=r[O.cmd_matches_index]
}}}O.matched_on=v;
if(!v){C[C.length-2]=w
}else{C[C.length-1]=w+" "
}if(!J){return n
}var L=C.join(" ");
var x=L.length;
var K=B.replace(A,L);
if(M.length){x+=M.join("\n").length+1;
K=M.join("\n")+"\n"+L+y
}if(O.onComplete){O.onComplete(K)
}z.focus().setCursorPosition(x);
O.selected_index=O.cmd_matches_index;
return e
}function b(B,z,H){var L=z.data("TS-tabComplete");
var s=z.getCursorPosition();
if(s==0){return false
}var y=B.substr(s);
var K=B.substr(0,s).split("\n");
var A=K.pop();
var C=A.split(" ");
var t=C[C.length-1].toLowerCase();
var E="";
if(!t&&!L.channel_matches){return false
}if(t){var x=false;
if(t.indexOf("#")==0){x=true
}if(L.channel_prefix){if(t.indexOf(L.channel_prefix+"#")==0){x=true
}if(t.indexOf(L.channel_prefix)==0){x=true
}}if(!x){return false
}}var u;
var v;
if(H&&H.chosen_index!=undefined){u=L.channel_matches;
L.channel_matches_index=h(H.chosen_index,L.channel_matches.length-1);
v=u[L.channel_matches_index]
}else{if(!t){u=L.channel_matches;
if(H&&H.shiftKey){L.channel_matches_index--;
if(L.channel_matches_index<0){L.channel_matches_index=L.channel_matches.length-1
}}else{L.channel_matches_index++;
if(L.channel_matches_index>=L.channel_matches.length){L.channel_matches_index=0
}}v=u[L.channel_matches_index]
}else{u=[];
var r=TS.channels.getChannelsForUser();
var M;
var N;
var G=t.replace("#","");
if(L.channel_prefix&&t.toLowerCase().indexOf(L.channel_prefix.toLowerCase())==0){G=G.substr(L.channel_prefix.length);
E=L.channel_prefix
}for(var F=0;
F<r.length;
F++){M=r[F];
if(M.is_archived){continue
}N=M._name_lc;
if(N.indexOf(G)==0||("#"+N).indexOf(G)==0){u.push(M.name)
}}if(!u.length){return false
}L.channel_matches_index=0;
if(u.length>0){L.channel_matches=u
}v=u[L.channel_matches_index]
}}L.matched_on=t;
if(!t){var D=C[C.length-2];
if(L.channel_prefix&&D.toLowerCase().indexOf(L.channel_prefix.toLowerCase())==0){E=L.channel_prefix
}C[C.length-2]=E+"#"+v
}else{C[C.length-1]=E+"#"+v+" "
}if(!H){return n
}var J=C.join(" ");
var w=J.length;
var I=B.replace(A,J);
if(K.length){w+=K.join("\n").length+1;
I=K.join("\n")+"\n"+J+y
}if(L.onComplete){L.onComplete(I)
}z.focus().setCursorPosition(w);
L.selected_index=L.channel_matches_index;
return e
}function d(G,v,au){var av=v.data("TS-tabComplete");
var W=v.getCursorPosition();
if(W==0){return false
}var I=G.substr(W);
var ap=G.substr(0,W).split("\n");
var ag=ap.pop();
var E=ag.split(" ");
var Q=E[E.length-1].toLowerCase();
var ai="";
if(!Q&&!av.member_matches){return false
}var ab="";
var z="";
var U;
var D;
if(au&&au.chosen_index!=undefined){U=av.member_matches;
av.member_matches_index=h(au.chosen_index,av.member_matches.length-1);
D=U[av.member_matches_index]
}else{if(!Q){U=av.member_matches;
if(au&&au.shiftKey){av.member_matches_index--;
if(av.member_matches_index<0){av.member_matches_index=av.member_matches.length-1
}}else{av.member_matches_index++;
if(av.member_matches_index>=av.member_matches.length){av.member_matches_index=0
}}D=U[av.member_matches_index]
}else{U=[];
var H=[];
var x=[];
var ak=[];
var aa=[];
var af=[];
var aq,an;
var at=(av.include_self)?TS.members.getActiveMembersWithSelfAndSlackbot():TS.members.getActiveMembersWithSlackbotAndNotSelf();
for(aq=0;
aq<at.length;
aq++){if(at[aq].deleted){continue
}af.push(at[aq])
}var am;
var M;
var X;
var T;
var Y;
var J;
var s;
var K;
var ah;
var ad;
var t=Q;
var al=TS.shared.getActiveModelOb();
if(av.member_prefix&&Q.toLowerCase().indexOf(av.member_prefix.toLowerCase())==0){t=t.substr(av.member_prefix.length);
ai=av.member_prefix
}var B=new RegExp("\\b"+TS.utility.regexpEscape(t.replace(/^@/,""),1000),"i");
for(aq=0;
aq<af.length;
aq++){am=af[aq];
M=am._name_lc;
X=M+":";
T="@"+M;
Y="@"+M+":";
J=(am.profile.first_name)?am._first_nam_lc:"";
s=(am.profile.last_name)?am._last_name_lc:"";
K="@"+J;
ah="@"+s;
ad=(am.profile.real_name_normalized)?am.profile.real_name_normalized:"";
if(M.indexOf(t)==0){H.push(am)
}else{if(X.indexOf(t)==0){H.push(am)
}else{if(T.indexOf(t)==0){H.push(am)
}else{if(Y.indexOf(t)==0){H.push(am)
}else{if(J&&J.indexOf(t)==0){x.push(am)
}else{if(s&&s.indexOf(t)==0){ak.push(am)
}else{if(J&&K.indexOf(t)==0){x.push(am)
}else{if(s&&ah.indexOf(t)==0){ak.push(am)
}else{if(ad&&B.test(ad)){aa.push(am)
}}}}}}}}}}H.sort(function F(ax,A){var ay=ax._name_lc;
var az=A._name_lc;
if(ay<az){return -1
}if(ay>az){return 1
}return 0
});
x.sort(function F(ax,A){var ay=ax._first_nam_lc;
var az=A._first_nam_lc;
if(ay<az){return -1
}if(ay>az){return 1
}return 0
});
ak.sort(function F(ax,A){var ay=ax._last_name_lc;
var az=A._last_name_lc;
if(ay<az){return -1
}if(ay>az){return 1
}return 0
});
aa.sort(function F(ax,A){var ay=ax._real_name_normalized_lc;
var az=A._real_name_normalized_lc;
if(ay<az){return -1
}if(ay>az){return 1
}return 0
});
H=H.concat(x).concat(ak).concat(aa);
if(TS.boot_data.feature_subteams&&av.complete_user_groups){var P=[];
var R=TS.model.user_groups;
var ao;
var aj;
var Z;
var L;
var ar;
var S;
var C;
var u;
var ae;
var B=new RegExp("\\b"+TS.utility.regexpEscape(t.replace(/^@/,""),1000),"i");
for(aq=0;
aq<R.length;
aq++){ao=R[aq];
if(ao.date_delete||!ao.handle){continue
}aj=ao.name;
Z=aj+":";
L="@"+aj;
ar="@"+aj+":";
S=ao.handle;
C=S+":";
u="@"+S;
ae="@"+S+":";
if(aj.indexOf(t)==0||Z.indexOf(t)==0||L.indexOf(t)==0||ar.indexOf(t)==0||S.indexOf(t)==0||C.indexOf(t)==0||u.indexOf(t)==0||ae.indexOf(t)==0){P.push(ao)
}}P.sort(function F(ax,A){var ay=ax.name;
var az=A.name;
if(ay<az){return -1
}if(ay>az){return 1
}return 0
});
H=H.concat(P)
}var ac=av.sort_by_membership&&al&&!al.is_im;
if(ac){var O=[];
for(aq=0;
aq<H.length;
aq++){am=H[aq];
if(TS.boot_data.feature_subteams&&am.is_subteam){O.push({sort_by:30000+aq,name:am.handle})
}else{if(am.is_bot||am.is_slackbot){O.push({sort_by:(al.members.indexOf(am.id)==-1?2000000:20000)+aq,name:am.name})
}else{O.push({sort_by:(al.members.indexOf(am.id)==-1?1000000:10000)+aq,name:am.name})
}}}if(av.complete_member_specials){if(al&&al.is_general&&TS.members.canUserAtEveryone()){if("@everyone".indexOf(t)==0||"@all".indexOf(t)==0){O.push({sort_by:("@everyone"==t||"@all"==t)?1:2000000,name:"everyone"})
}}if(TS.members.canUserAtChannelOrAtGroup()&&al&&(al.is_channel||(al.is_group&&TS.boot_data.feature_private_channels))&&(!al.is_general||TS.members.canUserAtEveryone())){if(("@channel").indexOf(t)==0){O.push({sort_by:500000,name:"channel"})
}if(("@here").indexOf(t)==0){O.push({sort_by:500000,name:"here"})
}}else{if(TS.members.canUserAtChannelOrAtGroup()&&al&&al.is_group&&!TS.boot_data.feature_private_channels){if(("@group").indexOf(t)==0){O.push({sort_by:500000,name:"group"})
}if(("@here").indexOf(t)==0){O.push({sort_by:500000,name:"here"})
}}}}O.sort(function F(ax,A){if(ax.sort_by<A.sort_by){return -1
}if(ax.sort_by>A.sort_by){return 1
}return 0
});
for(aq=0;
aq<O.length;
aq++){U.push(O[aq].name)
}}else{var w,N,R;
w=[];
N=[];
R=[];
for(aq=0;
aq<H.length;
aq++){am=H[aq];
if(TS.boot_data.feature_subteams&&am.is_subteam){R.push(am.handle)
}else{if(am.is_bot||am.is_slackbot){N.push(am.name)
}else{w.push(am.name)
}}}U=w.concat(R).concat(N);
if(av.complete_member_specials){if(al&&al.is_general&&!TS.model.user.is_restricted){if(("@everyone").indexOf(t)==0||("@all").indexOf(t)==0){if("@everyone"==t||"@all"==t){U.unshift("everyone")
}else{U.push("everyone")
}}}if(al&&al.is_channel){if(("@channel").indexOf(t)==0){if("@channel"==t){U.unshift("channel")
}else{U.push("channel")
}}}else{if(al&&al.is_group){if(("@group").indexOf(t)==0){if("@group"==t){U.unshift("group")
}else{U.push("group")
}}}}}}if(!U.length){return false
}av.member_matches_index=0;
if(U.length>0){av.member_matches=U
}D=U[av.member_matches_index]
}}av.matched_on=Q;
if(!Q){var aw=E[E.length-2];
if(av.member_prefix&&aw.toLowerCase().indexOf(av.member_prefix.toLowerCase())==0){ai=av.member_prefix
}if(E.length-2==0&&av.member_colon){ab=":"
}if(aw&&(aw.indexOf("@")>-1||TS.model.team.prefs.require_at_for_mention)){z="@"
}E[E.length-2]=ai+z+D+ab
}else{if(E.length-1==0&&av.member_colon){ab=":"
}if(E[E.length-1].indexOf("@")>-1||TS.model.team.prefs.require_at_for_mention){z="@"
}E[E.length-1]=ai+z+D+ab+" "
}if(!au){return n
}var y=E.join(" ");
var V=y.length;
var r=G.replace(ag,y);
if(ap.length){V+=ap.join("\n").length+1;
r=ap.join("\n")+"\n"+y+I
}if(av.onComplete){av.onComplete(r)
}v.focus().setCursorPosition(V);
av.selected_index=av.member_matches_index;
return e
}function a(D,B,I){var M=B.data("TS-tabComplete");
var u=B.getCursorPosition();
if(u==0){return false
}var A=D.substr(u);
var L=D.substr(0,u).split("\n");
var C=L.pop();
var E=C.split(" ");
var v=E[E.length-1].toLowerCase();
if(!v&&!M.emoji_matches){return false
}var F="";
if(v){var z=false;
if(v.indexOf(":")==0){z=true
}else{if(v.indexOf("+:")==0){F="+";
z=true
}else{if(v.indexOf("-:")==0){F="-";
z=true
}}}if(!z){return false
}}else{if(E.length>1){var r=E[E.length-2].toLowerCase();
if(r.indexOf("+:")==0){F="+"
}else{if(r.indexOf("-:")==0){F="-"
}}}}var y;
var w;
if(I&&I.chosen_index!=undefined){y=M.emoji_matches;
M.emoji_matches_index=h(I.chosen_index,M.emoji_matches.length-1);
w=y[M.emoji_matches_index]
}else{if(!v){y=M.emoji_matches;
if(I&&I.shiftKey){M.emoji_matches_index--;
if(M.emoji_matches_index<0){M.emoji_matches_index=M.emoji_matches.length-1
}}else{M.emoji_matches_index++;
if(M.emoji_matches_index>=M.emoji_matches.length){M.emoji_matches_index=0
}}w=y[M.emoji_matches_index]
}else{y=[];
var t=TS.model.emoji_names;
var N;
var H=v.replace(/\+:/,"").replace(/\-:/,"").replace(/:/g,"");
var s=new RegExp("(^)"+TS.utility.regexpEscape(H,1000),"i");
for(var G=0;
G<t.length;
G++){N=t[G];
if(!H||N.match(s)){y.push(N)
}}if(!y.length){return false
}M.emoji_matches_index=0;
if(y.length>0){M.emoji_matches=y
}w=y[M.emoji_matches_index]
}}M.matched_on=v;
if(!v){E[E.length-2]=F+":"+w+":"
}else{E[E.length-1]=F+":"+w+": "
}if(!I){return n
}var K=E.join(" ");
var x=K.length;
var J=D.replace(C,K);
if(L.length){x+=L.join("\n").length+1;
J=L.join("\n")+"\n"+K+A
}if(M.onComplete){M.onComplete(J)
}B.focus().setCursorPosition(x);
M.selected_index=M.emoji_matches_index;
return e
}function l(r,s){if(o){TS.warn("reset "+s)
}var t=r.data("TS-tabComplete");
var u=k(t);
t.cmds=null;
t.cmd_matches=null;
t.cmd_matches_index=-1;
t.member_matches=null;
t.member_matches_index=-1;
t.emoji_matches=null;
t.emoji_matches_index=-1;
t.channel_matches=null;
t.channel_matches_index=-1;
t.matched_on="";
t.work_on_textchange=true;
t.selected_index=-1;
t.ui_showing=false;
if(u){r.trigger("reset",{w:u+" "+s})
}}function k(r){var s="";
if(r.cmd_matches){s="cmds"
}if(r.member_matches){s="members"
}if(r.emoji_matches){s="emoji"
}if(r.channel_matches){s="channels"
}return s
}function q(y,v,r){var t=y.data("TS-tabComplete");
var u=(y.val());
var w=k(t);
var s=50;
var x=false;
var z={hide_ui:false,delay_ui:false,shown_callback:function(){t.ui_showing=true
}};
t.ui_showing=false;
if(TS.model.prefs.enter_is_special_in_tbt&&TS.utility.isCursorWithinTBTs(y)){z.hide_ui=true
}if(t.complete_emoji){x=a(u,y,v);
if(o){TS.info("completeOnEmoji:"+x)
}z.current_matches=t.emoji_matches||[];
z.w="emoji";
z.matched_on=t.matched_on;
if(x==n){if(o){TS.info("trigger MATCHES_SET matched_on:"+t.matched_on+" emoji_matches: "+t.emoji_matches)
}if(t.matched_on.length<3){z.hide_ui=true
}if(z.current_matches.length===1&&":"+z.current_matches[0]+":"==z.matched_on){z.hide_ui=true
}if(!z.hide_ui){if(TS.model.prefs.tab_ui_return_selects){t.selected_index=t.emoji_matches_index
}}z.i=t.selected_index;
y.trigger("matches_set",z);
return
}else{if(x==e){if(o){TS.info("trigger MATCH_CHANGED "+t.emoji_matches_index)
}z.i=t.emoji_matches_index;
y.trigger("match_changed",z);
return
}else{if(w=="emoji"){l(y,"not acting")
}else{}}}}if(t.complete_channels){x=b(u,y,v);
if(o){TS.info("completeOnChannels:"+x)
}z.current_matches=t.channel_matches||[];
z.w="channels";
z.matched_on=t.matched_on;
if(x==n){if(o){TS.info("trigger MATCHES_SET matched_on:"+t.matched_on+" channel_matches: "+t.channel_matches)
}if(!t.matched_on){z.hide_ui=true
}if(z.current_matches.length>s){z.hide_ui=true
}if(z.current_matches.length===1&&("#"+z.current_matches[0]==z.matched_on||z.current_matches[0]==z.matched_on)){z.hide_ui=true
}if(!z.hide_ui){if(TS.model.prefs.tab_ui_return_selects){t.selected_index=t.channel_matches_index
}}z.i=t.selected_index;
y.trigger("matches_set",z);
return
}else{if(x==e){if(o){TS.info("trigger MATCH_CHANGED "+t.channel_matches_index)
}z.i=t.channel_matches_index;
y.trigger("match_changed",z);
return
}else{if(w=="channels"){l(y,"not acting")
}else{}}}}if(t.complete_cmds){x=g(u,y,v);
if(o){TS.info("completeOnCommandsNew:"+x)
}z.current_matches=t.cmd_matches||[];
z.w="cmds";
z.matched_on=t.matched_on;
if(x==n){if(o){TS.info("trigger MATCHES_SET matched_on:"+t.matched_on+" cmd_matches: "+t.cmd_matches)
}if(t.matched_on.length<1){z.hide_ui=true
}if(!z.hide_ui){if(TS.model.prefs.tab_ui_return_selects){t.selected_index=t.cmd_matches_index
}}z.i=t.selected_index;
y.trigger("matches_set",z);
return
}else{if(x==e){if(o){TS.info("trigger MATCH_CHANGED "+t.cmd_matches_index)
}z.i=t.cmd_matches_index;
y.trigger("match_changed",z);
return
}else{if(w=="cmds"){l(y,"not acting")
}else{}}}}if(t.complete_members){x=d(u,y,v);
if(o){TS.info("completeOnMembers:"+x)
}z.current_matches=t.member_matches||[];
z.w="members";
z.matched_on=t.matched_on;
z.sort_by_membership=t.sort_by_membership;
if(t.matched_on&&t.matched_on.indexOf("@")!=0&&(!v||v.which!=TS.utility.keymap.tab)){z.delay_ui=true
}if(x==n){if(o){TS.info("trigger MATCHES_SET matched_on:"+t.matched_on+" member_matches:"+t.member_matches)
}if(t.matched_on.indexOf("@")!=0&&(t.matched_on.length<3||t.member_prefix_required||TS.model.prefs.require_at)){z.hide_ui=true
}if(t.matched_on=="the"||t.matched_on=="and"){z.hide_ui=true
}if(z.current_matches.length>s){z.hide_ui=true
}if(z.current_matches.length===1&&("@"+z.current_matches[0]==z.matched_on||z.current_matches[0]==z.matched_on)){z.hide_ui=true
}if(!z.hide_ui){if(TS.model.prefs.tab_ui_return_selects){t.selected_index=t.member_matches_index
}}z.i=t.selected_index;
y.trigger("matches_set",z);
return
}else{if(x==e){if(o){TS.info("trigger MATCH_CHANGED "+t.member_matches_index)
}z.i=t.member_matches_index;
y.trigger("match_changed",z);
return
}else{if(w=="members"){l(y,"not acting")
}else{}}}}if(r&&t.complete_cmds&&(!u||u.indexOf("/")==0)&&p(u,y,v)){return
}}function c(r,s,u){if(o){TS.warn("choose calling work with fake e i:"+s)
}var t=r.data("TS-tabComplete");
t.work_on_textchange=false;
q(r,{chosen_index:s});
t.work_on_textchange=true;
if(u){return
}setTimeout(function(){l(r,"choose "+s)
},1)
}var f={reset:function(r){var s=j(this);
l(s,"method called: "+r)
},choose:function(r,t){var s=j(this);
c(s,r,t)
},suspend:function(){var s=j(this);
var r=s.data("TS-tabComplete");
r.suspended=true;
l(s,"suspended")
},unsuspend:function(){var r=j(this).data("TS-tabComplete");
r.suspended=false
},changeoption:function(t,s){var r=j(this).data("TS-tabComplete");
r[t]=s
},init:function(r){var s=j.extend({complete_member_specials:false,complete_members:true,member_prefix:"",member_colon:true,complete_cmds:false,complete_emoji:false,complete_channels:false,channel_prefix:"",no_tab_out:false,member_prefix_required:false,include_self:false,sort_by_membership:false},r);
return this.each(function(){var t=j(this);
if(t.data("TS-tabComplete")){return
}if(r.ui_initer){r.ui_initer(t)
}t.data("TS-tabComplete",{channel_prefix:s.channel_prefix,cmd_matches_index:-1,cmd_matches:null,cmds:null,complete_channels:s.complete_channels,complete_cmds:s.complete_cmds,complete_emoji:s.complete_emoji,complete_member_specials:s.complete_member_specials,complete_members:s.complete_members,complete_user_groups:s.complete_user_groups,member_colon:s.member_colon,member_matches_index:-1,member_matches:null,member_prefix:s.member_prefix,onComplete:s.onComplete,selected_index:-1,work_on_textchange:true,matched_on:"",suspended:r.suspended===true,member_prefix_required:s.member_prefix_required,include_self:s.include_self,sort_by_membership:s.sort_by_membership});
t.bind("textchange",function(v){var u=t.data("TS-tabComplete");
if(u.suspended){return
}if(u.work_on_textchange){if(o){TS.warn('textchange calling work no e text:"'+j(this).val()+'"')
}q(t,null)
}});
t.bind("paste",function(v){var u=t.data("TS-tabComplete");
l(t,"paste");
u.work_on_textchange=false;
var w=setTimeout(function(){u.work_on_textchange=true
},50);
t.bind("textchange.after_paste",function(x){clearTimeout(w);
u.work_on_textchange=true;
t.unbind("textchange.after_paste")
})
});
t.bind("keydown",function(y){var w=t.data("TS-tabComplete");
if(w.suspended){return
}var x=k(w);
var u=TS.utility.keymap;
if(o){TS.info("keydown:"+y.which+' text:"'+j(this).val()+'" current:'+x+" ---------------------------------------------------------------")
}if(y.which==u.tab&&!(y.metaKey||y.ctrlKey)){w.work_on_textchange=false;
if(o){TS.warn("keydown calling work WITH e")
}q(t,y,true);
if(x||s.no_tab_out){y.preventDefault()
}}else{if(y.which==u.space){if(x!="cmds"){l(t,"space")
}}}if(!w.ui_showing){return
}if(y.which==u.down&&x){y.preventDefault();
c(t,w.selected_index+1,true)
}else{if(y.which==u.up&&x){y.preventDefault();
y.shiftKey=true;
c(t,w.selected_index-1,true)
}else{if(y.which==u.right&&x=="emoji"&&w.emoji_matches.length>1){y.preventDefault();
c(t,w.selected_index+1,true)
}else{if(y.which==u.left&&x=="emoji"&&w.emoji_matches.length>1){y.preventDefault();
y.shiftKey=true;
c(t,w.selected_index-1,true)
}else{if(y.which==u.enter&&!TS.model.prefs.tab_ui_return_selects){l(t,"enter")
}else{if(y.which==u.enter&&w.selected_index!=-1){if(x=="cmds"){c(t,w.selected_index)
}else{c(t,w.selected_index)
}}else{if(y.which==u.enter||y.which==u.tab){var v;
if(x=="members"){v=w.member_matches
}if(x=="channels"){v=w.channel_matches
}if(x=="emoji"){v=w.emoji_matches
}if(x=="cmds"){v=w.cmd_matches
}if(v&&v.length==1){c(t,0)
}}else{if(y.which==u.esc||y.which==u.alt||y.which==u.ctrl||y.which==u.cmd_ff||y.which==u.cmd_other||y.which==u.left||y.which==u.right||y.which==u.end||y.which==u.home){l(t,y.which)
}}}}}}}}});
t.bind("keyup",function(v){var u=t.data("TS-tabComplete");
if(u.suspended){return
}u.work_on_textchange=true
})
})
}};
j.fn.TS_tabComplete2=function(r){if(f[r]){return f[r].apply(this,Array.prototype.slice.call(arguments,1))
}else{if(typeof r==="object"||!r){return f.init.apply(this,arguments)
}else{j.error("Method "+r+" does not exist on jQuery.tooltip")
}}}
})(jQuery);
function printStackTrace(b){b=b||{guess:true};
var c=b.e||null,e=!!b.guess;
var d=new printStackTrace.implementation(),a=d.run(c);
return(e)?d.guessAnonymousFunctions(a):a
}if(typeof module!=="undefined"&&module.exports){module.exports=printStackTrace
}printStackTrace.implementation=function(){};
printStackTrace.implementation.prototype={run:function(a,b){a=a||this.createException();
b=b||this.mode(a);
if(b==="other"){return this.other(arguments.callee)
}else{return this[b](a)
}},createException:function(){try{this.undef()
}catch(a){return a
}},mode:function(a){if(a["arguments"]&&a.stack){return"chrome"
}else{if(a.stack&&a.sourceURL){return"safari"
}else{if(a.stack&&a.number){return"ie"
}else{if(typeof a.message==="string"&&typeof window!=="undefined"&&window.opera){if(!a.stacktrace){return"opera9"
}if(a.message.indexOf("\n")>-1&&a.message.split("\n").length>a.stacktrace.split("\n").length){return"opera9"
}if(!a.stack){return"opera10a"
}if(a.stacktrace.indexOf("called from line")<0){return"opera10b"
}return"opera11"
}else{if(a.stack){return"firefox"
}}}}}return"other"
},instrumentFunction:function(b,d,e){b=b||window;
var a=b[d];
b[d]=function c(){e.call(this,printStackTrace().slice(4));
return b[d]._instrumented.apply(this,arguments)
};
b[d]._instrumented=a
},deinstrumentFunction:function(a,b){if(a[b].constructor===Function&&a[b]._instrumented&&a[b]._instrumented.constructor===Function){a[b]=a[b]._instrumented
}},chrome:function(b){var a=(b.stack+"\n").replace(/^\S[^\(]+?[\n$]/gm,"").replace(/^\s+(at eval )?at\s+/gm,"").replace(/^([^\(]+?)([\n$])/gm,"{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm,"{anonymous}()@$1").split("\n");
a.pop();
return a
},safari:function(a){return a.stack.replace(/\[native code\]\n/m,"").replace(/^(?=\w+Error\:).*$\n/m,"").replace(/^@/gm,"{anonymous}()@").split("\n")
},ie:function(b){var a=/^.*at (\w+) \(([^\)]+)\)$/gm;
return b.stack.replace(/at Anonymous function /gm,"{anonymous}()@").replace(/^(?=\w+Error\:).*$\n/m,"").replace(a,"$1@$2").split("\n")
},firefox:function(a){return a.stack.replace(/(?:\n@:0)?\s+$/m,"").replace(/^[\(@]/gm,"{anonymous}()@").split("\n")
},opera11:function(g){var a="{anonymous}",h=/^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
var k=g.stacktrace.split("\n"),l=[];
for(var c=0,f=k.length;
c<f;
c+=2){var d=h.exec(k[c]);
if(d){var j=d[4]+":"+d[1]+":"+d[2];
var b=d[3]||"global code";
b=b.replace(/<anonymous function: (\S+)>/,"$1").replace(/<anonymous function>/,a);
l.push(b+"@"+j+" -- "+k[c+1].replace(/^\s+/,""))
}}return l
},opera10b:function(h){var g=/^(.*)@(.+):(\d+)$/;
var c=h.stacktrace.split("\n"),b=[];
for(var f=0,a=c.length;
f<a;
f++){var d=g.exec(c[f]);
if(d){var j=d[1]?(d[1]+"()"):"global code";
b.push(j+"@"+d[2]+":"+d[3])
}}return b
},opera10a:function(g){var a="{anonymous}",h=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
var j=g.stacktrace.split("\n"),k=[];
for(var c=0,f=j.length;
c<f;
c+=2){var d=h.exec(j[c]);
if(d){var b=d[3]||a;
k.push(b+"()@"+d[2]+":"+d[1]+" -- "+j[c+1].replace(/^\s+/,""))
}}return k
},opera9:function(j){var d="{anonymous}",h=/Line (\d+).*script (?:in )?(\S+)/i;
var c=j.message.split("\n"),b=[];
for(var g=2,a=c.length;
g<a;
g+=2){var f=h.exec(c[g]);
if(f){b.push(d+"()@"+f[2]+":"+f[1]+" -- "+c[g+1].replace(/^\s+/,""))
}}return b
},other:function(g){var b="{anonymous}",f=/function\s*([\w\-$]+)?\s*\(/i,a=[],d,c,e=10;
while(g&&g["arguments"]&&a.length<e){d=f.test(g.toString())?RegExp.$1||b:b;
c=Array.prototype.slice.call(g["arguments"]||[]);
a[a.length]=d+"("+this.stringifyArguments(c)+")";
g=g.caller
}return a
},stringifyArguments:function(c){var b=[];
var e=Array.prototype.slice;
for(var d=0;
d<c.length;
++d){var a=c[d];
if(a===undefined){b[d]="undefined"
}else{if(a===null){b[d]="null"
}else{if(a.constructor){if(a.constructor===Array){if(a.length<3){b[d]="["+this.stringifyArguments(a)+"]"
}else{b[d]="["+this.stringifyArguments(e.call(a,0,1))+"..."+this.stringifyArguments(e.call(a,-1))+"]"
}}else{if(a.constructor===Object){b[d]="#object"
}else{if(a.constructor===Function){b[d]="#function"
}else{if(a.constructor===String){b[d]='"'+a+'"'
}else{if(a.constructor===Number){b[d]=a
}}}}}}}}}return b.join(",")
},sourceCache:{},ajax:function(a){var b=this.createXMLHTTPObject();
if(b){try{b.open("GET",a,false);
b.send(null);
return b.responseText
}catch(c){}}return""
},createXMLHTTPObject:function(){var c,a=[function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Msxml3.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
}];
for(var b=0;
b<a.length;
b++){try{c=a[b]();
this.createXMLHTTPObject=a[b];
return c
}catch(d){}}},isSameDomain:function(a){return typeof location!=="undefined"&&a.indexOf(location.hostname)!==-1
},getSource:function(a){if(!(a in this.sourceCache)){this.sourceCache[a]=this.ajax(a).split("\n")
}return this.sourceCache[a]
},guessAnonymousFunctions:function(k){for(var g=0;
g<k.length;
++g){var f=/\{anonymous\}\(.*\)@(.*)/,l=/^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,b=k[g],c=f.exec(b);
if(c){var e=l.exec(c[1]);
if(e){var d=e[1],a=e[2],j=e[3]||0;
if(d&&this.isSameDomain(d)&&a){var h=this.guessAnonymousFunction(d,a,j);
k[g]=b.replace("{anonymous}",h)
}}}}return k
},guessAnonymousFunction:function(c,f,a){var b;
try{b=this.findFunctionName(this.getSource(c),f)
}catch(d){b="getSource failed with url: "+c+", exception: "+d.toString()
}return b
},findFunctionName:function(a,e){var g=/function\s+([^(]*?)\s*\(([^)]*)\)/;
var k=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;
var h=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
var b="",l,j=Math.min(e,20),d,c;
for(var f=0;
f<j;
++f){l=a[e-f-1];
c=l.indexOf("//");
if(c>=0){l=l.substr(0,c)
}if(l){b=l+b;
d=k.exec(b);
if(d&&d[1]){return d[1]
}d=g.exec(b);
if(d&&d[1]){return d[1]
}d=h.exec(b);
if(d&&d[1]){return d[1]
}}}return"(?)"
}};
(function(b,c){function a(e,m,k){if(e){e=e.replace(/\@/g,"&#64;")
}var d={},g="",w="...",q=["img","br"],v=[],D=0,x=g,r='([\\w|-]+\\s*=\\s*"[^"]*"\\s*)*',B="\\s*\\/?\\s*",l="\\s*\\/\\s*",t=new RegExp("<\\/?\\w+\\s*"+r+l+">"),n=new RegExp("<\\/?\\w+\\s*"+r+B+">"),y=/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w\-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g,s=new RegExp("<img\\s*"+r+B+">"),h=true,u,o,p,C,f;
function j(H){var G=s.exec(H),F,E;
if(!G){return H
}F=G.index;
E=G[0].length;
return H.substring(0,F)+H.substring(F+E)
}function z(E){var F="";
E.reverse().forEach(function(G,H){if(-1===q.indexOf(G)){F+="</"+G+">"
}});
return F
}function A(F){var E=F.indexOf(" ");
if(-1===E){E=F.indexOf(">");
if(-1===E){throw new Error("HTML tag is not well-formed : "+F)
}}return F.substring(1,E)
}k=k||d;
k.ellipsis=(c!==k.ellipsis)?k.ellipsis:w;
while(h){h=n.exec(e);
if(!h){if(D>=m){break
}h=y.exec(e);
if(!h||h.index>=m){x+=e.substring(0,m-D);
break
}while(h){u=h[0];
o=h.index;
x+=e.substring(0,(o+u.length)-D);
e=e.substring(o+u.length);
h=y.exec(e)
}break
}u=h[0];
o=h.index;
if(D+o>m){x+=(e.substring(0,m-D));
break
}else{D+=o;
x+=e.substring(0,o)
}if("/"===u[1]){v.pop()
}else{f=t.exec(u);
if(!f){C=A(u);
v.push(C)
}}if(f){x+=f[0]
}else{x+=u
}e=e.substring(o+u.length)
}if(e.length>m&&k.ellipsis){x+=k.ellipsis
}x+=z(v);
if(!k.keepImageTag){x=j(x)
}return x
}if("undefined"!==typeof module&&module.exports){module.exports=a
}else{b.truncate=a
}}(this));
/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	
	EC added this: o.setAttribute("style", "visibility:hidden");
	so that people with flash disabled don't see fucking ugliness
	SS added absolute-positioning with top/left so it doesn't cause scrollbars / layout / resize
*/
;
var swfobject=function(){var E="undefined",s="object",T="Shockwave Flash",X="ShockwaveFlash.ShockwaveFlash",r="application/x-shockwave-flash",S="SWFObjectExprInst",y="onreadystatechange",P=window,k=document,u=navigator,U=false,V=[h],p=[],O=[],J=[],m,R,F,C,K=false,a=false,o,H,n=true,N=function(){var ab=typeof k.getElementById!=E&&typeof k.getElementsByTagName!=E&&typeof k.createElement!=E,ai=u.userAgent.toLowerCase(),Z=u.platform.toLowerCase(),af=Z?/win/.test(Z):/win/.test(ai),ad=Z?/mac/.test(Z):/mac/.test(ai),ag=/webkit/.test(ai)?parseFloat(ai.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,Y=!+"\v1",ah=[0,0,0],ac=null;
if(typeof u.plugins!=E&&typeof u.plugins[T]==s){ac=u.plugins[T].description;
if(ac&&!(typeof u.mimeTypes!=E&&u.mimeTypes[r]&&!u.mimeTypes[r].enabledPlugin)){U=true;
Y=false;
ac=ac.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
ah[0]=parseInt(ac.replace(/^(.*)\..*$/,"$1"),10);
ah[1]=parseInt(ac.replace(/^.*\.(.*)\s.*$/,"$1"),10);
ah[2]=/[a-zA-Z]/.test(ac)?parseInt(ac.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof P.ActiveXObject!=E){try{var ae=new ActiveXObject(X);
if(ae){ac=ae.GetVariable("$version");
if(ac){Y=true;
ac=ac.split(" ")[1].split(",");
ah=[parseInt(ac[0],10),parseInt(ac[1],10),parseInt(ac[2],10)]
}}}catch(aa){}}}return{w3:ab,pv:ah,wk:ag,ie:Y,win:af,mac:ad}
}(),l=function(){if(!N.w3){return
}if((typeof k.readyState!=E&&k.readyState=="complete")||(typeof k.readyState==E&&(k.getElementsByTagName("body")[0]||k.body))){f()
}if(!K){if(typeof k.addEventListener!=E){k.addEventListener("DOMContentLoaded",f,false)
}if(N.ie&&N.win){k.attachEvent(y,function(){if(k.readyState=="complete"){k.detachEvent(y,arguments.callee);
f()
}});
if(P==top){(function(){if(K){return
}try{k.documentElement.doScroll("left")
}catch(Y){setTimeout(arguments.callee,0);
return
}f()
})()
}}if(N.wk){(function(){if(K){return
}if(!/loaded|complete/.test(k.readyState)){setTimeout(arguments.callee,0);
return
}f()
})()
}t(f)
}}();
function f(){if(K){return
}try{var aa=k.getElementsByTagName("body")[0].appendChild(D("span"));
aa.parentNode.removeChild(aa)
}catch(ab){return
}K=true;
var Y=V.length;
for(var Z=0;
Z<Y;
Z++){V[Z]()
}}function L(Y){if(K){Y()
}else{V[V.length]=Y
}}function t(Z){if(typeof P.addEventListener!=E){P.addEventListener("load",Z,false)
}else{if(typeof k.addEventListener!=E){k.addEventListener("load",Z,false)
}else{if(typeof P.attachEvent!=E){j(P,"onload",Z)
}else{if(typeof P.onload=="function"){var Y=P.onload;
P.onload=function(){Y();
Z()
}
}else{P.onload=Z
}}}}}function h(){if(U){W()
}else{I()
}}function W(){var Y=k.getElementsByTagName("body")[0];
var ab=D(s);
ab.setAttribute("type",r);
ab.setAttribute("style","visibility:hidden;position:absolute;top:-500px;left:-500px");
var aa=Y.appendChild(ab);
if(aa){var Z=0;
(function(){if(typeof aa.GetVariable!=E){var ac=aa.GetVariable("$version");
if(ac){ac=ac.split(" ")[1].split(",");
N.pv=[parseInt(ac[0],10),parseInt(ac[1],10),parseInt(ac[2],10)]
}}else{if(Z<10){Z++;
setTimeout(arguments.callee,10);
return
}}Y.removeChild(ab);
aa=null;
I()
})()
}else{I()
}}function I(){var ah=p.length;
if(ah>0){for(var ag=0;
ag<ah;
ag++){var Z=p[ag].id;
var ac=p[ag].callbackFn;
var ab={success:false,id:Z};
if(N.pv[0]>0){var af=c(Z);
if(af){if(G(p[ag].swfVersion)&&!(N.wk&&N.wk<312)){x(Z,true);
if(ac){ab.success=true;
ab.ref=A(Z);
ac(ab)
}}else{if(p[ag].expressInstall&&B()){var aj={};
aj.data=p[ag].expressInstall;
aj.width=af.getAttribute("width")||"0";
aj.height=af.getAttribute("height")||"0";
if(af.getAttribute("class")){aj.styleclass=af.getAttribute("class")
}if(af.getAttribute("align")){aj.align=af.getAttribute("align")
}var ai={};
var Y=af.getElementsByTagName("param");
var ad=Y.length;
for(var ae=0;
ae<ad;
ae++){if(Y[ae].getAttribute("name").toLowerCase()!="movie"){ai[Y[ae].getAttribute("name")]=Y[ae].getAttribute("value")
}}Q(aj,ai,Z,ac)
}else{q(af);
if(ac){ac(ab)
}}}}}else{x(Z,true);
if(ac){var aa=A(Z);
if(aa&&typeof aa.SetVariable!=E){ab.success=true;
ab.ref=aa
}ac(ab)
}}}}}function A(ab){var Y=null;
var Z=c(ab);
if(Z&&Z.nodeName=="OBJECT"){if(typeof Z.SetVariable!=E){Y=Z
}else{var aa=Z.getElementsByTagName(s)[0];
if(aa){Y=aa
}}}return Y
}function B(){return !a&&G("6.0.65")&&(N.win||N.mac)&&!(N.wk&&N.wk<312)
}function Q(ab,ac,Y,aa){a=true;
F=aa||null;
C={success:false,id:Y};
var af=c(Y);
if(af){if(af.nodeName=="OBJECT"){m=g(af);
R=null
}else{m=af;
R=Y
}ab.id=S;
if(typeof ab.width==E||(!/%$/.test(ab.width)&&parseInt(ab.width,10)<310)){ab.width="310"
}if(typeof ab.height==E||(!/%$/.test(ab.height)&&parseInt(ab.height,10)<137)){ab.height="137"
}k.title=k.title.slice(0,47)+" - Flash Player Installation";
var ae=N.ie&&N.win?"ActiveX":"PlugIn",ad="MMredirectURL="+P.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ae+"&MMdoctitle="+k.title;
if(typeof ac.flashvars!=E){ac.flashvars+="&"+ad
}else{ac.flashvars=ad
}if(N.ie&&N.win&&af.readyState!=4){var Z=D("div");
Y+="SWFObjectNew";
Z.setAttribute("id",Y);
af.parentNode.insertBefore(Z,af);
af.style.display="none";
(function(){if(af.readyState==4){af.parentNode.removeChild(af)
}else{setTimeout(arguments.callee,10)
}})()
}v(ab,ac,Y)
}}function q(Z){if(N.ie&&N.win&&Z.readyState!=4){var Y=D("div");
Z.parentNode.insertBefore(Y,Z);
Y.parentNode.replaceChild(g(Z),Y);
Z.style.display="none";
(function(){if(Z.readyState==4){Z.parentNode.removeChild(Z)
}else{setTimeout(arguments.callee,10)
}})()
}else{Z.parentNode.replaceChild(g(Z),Z)
}}function g(ad){var ab=D("div");
if(N.win&&N.ie){ab.innerHTML=ad.innerHTML
}else{var Z=ad.getElementsByTagName(s)[0];
if(Z){var ae=Z.childNodes;
if(ae){var Y=ae.length;
for(var aa=0;
aa<Y;
aa++){if(!(ae[aa].nodeType==1&&ae[aa].nodeName=="PARAM")&&!(ae[aa].nodeType==8)){ab.appendChild(ae[aa].cloneNode(true))
}}}}}return ab
}function v(aj,ah,Z){var Y,ab=c(Z);
if(N.wk&&N.wk<312){return Y
}if(ab){if(typeof aj.id==E){aj.id=Z
}if(N.ie&&N.win){var ai="";
for(var af in aj){if(aj[af]!=Object.prototype[af]){if(af.toLowerCase()=="data"){ah.movie=aj[af]
}else{if(af.toLowerCase()=="styleclass"){ai+=' class="'+aj[af]+'"'
}else{if(af.toLowerCase()!="classid"){ai+=" "+af+'="'+aj[af]+'"'
}}}}}var ag="";
for(var ae in ah){if(ah[ae]!=Object.prototype[ae]){ag+='<param name="'+ae+'" value="'+ah[ae]+'" />'
}}ab.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ai+">"+ag+"</object>";
O[O.length]=aj.id;
Y=c(aj.id)
}else{var aa=D(s);
aa.setAttribute("type",r);
for(var ad in aj){if(aj[ad]!=Object.prototype[ad]){if(ad.toLowerCase()=="styleclass"){aa.setAttribute("class",aj[ad])
}else{if(ad.toLowerCase()!="classid"){aa.setAttribute(ad,aj[ad])
}}}}for(var ac in ah){if(ah[ac]!=Object.prototype[ac]&&ac.toLowerCase()!="movie"){e(aa,ac,ah[ac])
}}ab.parentNode.replaceChild(aa,ab);
Y=aa
}}return Y
}function e(aa,Y,Z){var ab=D("param");
ab.setAttribute("name",Y);
ab.setAttribute("value",Z);
aa.appendChild(ab)
}function z(Z){var Y=c(Z);
if(Y&&Y.nodeName=="OBJECT"){if(N.ie&&N.win){Y.style.display="none";
(function(){if(Y.readyState==4){b(Z)
}else{setTimeout(arguments.callee,10)
}})()
}else{Y.parentNode.removeChild(Y)
}}}function b(aa){var Z=c(aa);
if(Z){for(var Y in Z){if(typeof Z[Y]=="function"){Z[Y]=null
}}Z.parentNode.removeChild(Z)
}}function c(aa){var Y=null;
try{Y=k.getElementById(aa)
}catch(Z){}return Y
}function D(Y){return k.createElement(Y)
}function j(aa,Y,Z){aa.attachEvent(Y,Z);
J[J.length]=[aa,Y,Z]
}function G(aa){var Z=N.pv,Y=aa.split(".");
Y[0]=parseInt(Y[0],10);
Y[1]=parseInt(Y[1],10)||0;
Y[2]=parseInt(Y[2],10)||0;
return(Z[0]>Y[0]||(Z[0]==Y[0]&&Z[1]>Y[1])||(Z[0]==Y[0]&&Z[1]==Y[1]&&Z[2]>=Y[2]))?true:false
}function w(ad,Z,ae,ac){if(N.ie&&N.mac){return
}var ab=k.getElementsByTagName("head")[0];
if(!ab){return
}var Y=(ae&&typeof ae=="string")?ae:"screen";
if(ac){o=null;
H=null
}if(!o||H!=Y){var aa=D("style");
aa.setAttribute("type","text/css");
aa.setAttribute("media",Y);
o=ab.appendChild(aa);
if(N.ie&&N.win&&typeof k.styleSheets!=E&&k.styleSheets.length>0){o=k.styleSheets[k.styleSheets.length-1]
}H=Y
}if(N.ie&&N.win){if(o&&typeof o.addRule==s){o.addRule(ad,Z)
}}else{if(o&&typeof k.createTextNode!=E){o.appendChild(k.createTextNode(ad+" {"+Z+"}"))
}}}function x(aa,Y){if(!n){return
}var Z=Y?"visible":"hidden";
if(K&&c(aa)){c(aa).style.visibility=Z
}else{w("#"+aa,"visibility:"+Z)
}}function M(Z){var aa=/[\\\"<>\.;]/;
var Y=aa.exec(Z)!=null;
return Y&&typeof encodeURIComponent!=E?encodeURIComponent(Z):Z
}var d=function(){if(N.ie&&N.win){window.attachEvent("onunload",function(){var ad=J.length;
for(var ac=0;
ac<ad;
ac++){J[ac][0].detachEvent(J[ac][1],J[ac][2])
}var aa=O.length;
for(var ab=0;
ab<aa;
ab++){z(O[ab])
}for(var Z in N){N[Z]=null
}N=null;
for(var Y in swfobject){swfobject[Y]=null
}swfobject=null
})
}}();
return{registerObject:function(ac,Y,ab,aa){if(N.w3&&ac&&Y){var Z={};
Z.id=ac;
Z.swfVersion=Y;
Z.expressInstall=ab;
Z.callbackFn=aa;
p[p.length]=Z;
x(ac,false)
}else{if(aa){aa({success:false,id:ac})
}}},getObjectById:function(Y){if(N.w3){return A(Y)
}},embedSWF:function(ac,ai,af,ah,Z,ab,aa,ae,ag,ad){var Y={success:false,id:ai};
if(N.w3&&!(N.wk&&N.wk<312)&&ac&&ai&&af&&ah&&Z){x(ai,false);
L(function(){af+="";
ah+="";
var ak={};
if(ag&&typeof ag===s){for(var am in ag){ak[am]=ag[am]
}}ak.data=ac;
ak.width=af;
ak.height=ah;
var an={};
if(ae&&typeof ae===s){for(var al in ae){an[al]=ae[al]
}}if(aa&&typeof aa===s){for(var aj in aa){if(typeof an.flashvars!=E){an.flashvars+="&"+aj+"="+aa[aj]
}else{an.flashvars=aj+"="+aa[aj]
}}}if(G(Z)){var ao=v(ak,an,ai);
if(ak.id==ai){x(ai,true)
}Y.success=true;
Y.ref=ao
}else{if(ab&&B()){ak.data=ab;
Q(ak,an,ai,ad);
return
}else{x(ai,true)
}}if(ad){ad(Y)
}})
}else{if(ad){ad(Y)
}}},switchOffAutoHideShow:function(){n=false
},ua:N,getFlashPlayerVersion:function(){return{major:N.pv[0],minor:N.pv[1],release:N.pv[2]}
},hasFlashPlayerVersion:G,createSWF:function(aa,Z,Y){if(N.w3){return v(aa,Z,Y)
}else{return undefined
}},showExpressInstall:function(aa,ab,Y,Z){if(N.w3&&B()){Q(aa,ab,Y,Z)
}},removeSWF:function(Y){if(N.w3){z(Y)
}},createCSS:function(ab,aa,Z,Y){if(N.w3){w(ab,aa,Z,Y)
}},addDomLoadEvent:L,addLoadEvent:t,getQueryParamValue:function(ab){var aa=k.location.search||k.location.hash;
if(aa){if(/\?/.test(aa)){aa=aa.split("?")[1]
}if(ab==null){return M(aa)
}var Z=aa.split("&");
for(var Y=0;
Y<Z.length;
Y++){if(Z[Y].substring(0,Z[Y].indexOf("="))==ab){return M(Z[Y].substring((Z[Y].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(a){var Y=c(S);
if(Y&&m){Y.parentNode.replaceChild(m,Y);
if(R){x(R,true);
if(N.ie&&N.win){m.style.display="block"
}}if(F){F(C)
}}a=false
}}}
}();
(function(){var c=function(){var f={};
var j;
var d=window.location.search.substring(1);
j=d.split("&");
for(var g=0;
g<j.length;
g++){var k=j[g].indexOf("=");
if(k!=-1){var e=j[g].substring(0,k);
var h=j[g].substring(k+1);
f[e]=unescape(h)
}}return f
}();
if(c.flash=="1"||c.flash_debug=="1"||c.flash_debug_fail=="1"){window.WEB_SOCKET_FORCE_FLASH=true
}if(c.flash_debug=="1"){window.WEB_SOCKET_DEBUG_FLASH=true
}var b=function(){window.WEB_SOCKET_USING_FLASH=true;
var d;
if(window.WEB_SOCKET_LOGGER){d=WEB_SOCKET_LOGGER
}else{if(window.console&&window.console.log&&window.console.error){d=window.console
}else{d={log:function(){},error:function(){},warn:function(){},info:function(){}}
}}if(window.WEB_SOCKET_FORCE_FLASH){d.warn("FORCED TO USE FLASH SOCKET")
}else{d.warn("USING FLASH SOCKET FOR LACK OF WS SUPPORT")
}if(swfobject.getFlashPlayerVersion().major<10||c.flash_debug_fail=="1"){d.error("Flash Player >= 10.0.0 is required.");
window.WEB_SOCKET_USING_FLASH_BUT_NO_FLASH=true;
if(!window.WEB_SOCKET_FORCE_FLASH){return
}}if(location.protocol=="file:"){d.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://...")
}window.WebSocket=function(g,h,f,k,j){var e=this;
e.__id=WebSocket.__nextId++;
WebSocket.__instances[e.__id]=e;
e.readyState=WebSocket.CONNECTING;
e.bufferedAmount=0;
e.__events={};
if(!h){h=[]
}else{if(typeof h=="string"){h=[h]
}}e.__createTask=setTimeout(function(){WebSocket.__addTask(function(){e.__createTask=null;
WebSocket.__flash.create(e.__id,g,h,f||null,k||0,j||null)
})
},0)
};
WebSocket.prototype.send=function(f){if(this.readyState==WebSocket.CONNECTING){throw"INVALID_STATE_ERR: Web Socket connection has not been established"
}var e=WebSocket.__flash.send(this.__id,encodeURIComponent(f));
if(e<0){return true
}else{this.bufferedAmount+=e;
return false
}};
WebSocket.prototype.close=function(){if(this.__createTask){clearTimeout(this.__createTask);
this.__createTask=null;
this.readyState=WebSocket.CLOSED;
return
}if(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING){return
}this.readyState=WebSocket.CLOSING;
WebSocket.__flash.close(this.__id)
};
WebSocket.prototype.addEventListener=function(f,g,e){if(!(f in this.__events)){this.__events[f]=[]
}this.__events[f].push(g)
};
WebSocket.prototype.removeEventListener=function(h,j,e){if(!(h in this.__events)){return
}var g=this.__events[h];
for(var f=g.length-1;
f>=0;
--f){if(g[f]===j){g.splice(f,1);
break
}}};
WebSocket.prototype.dispatchEvent=function(h){var f=this.__events[h.type]||[];
for(var e=0;
e<f.length;
++e){f[e](h)
}var g=this["on"+h.type];
if(g){g.apply(this,[h])
}};
WebSocket.prototype.__handleEvent=function(g){if("readyState" in g){this.readyState=g.readyState
}if("protocol" in g){this.protocol=g.protocol
}var e;
if(g.type=="open"||g.type=="error"){e=this.__createSimpleEvent(g.type)
}else{if(g.type=="close"){e=this.__createSimpleEvent("close");
e.wasClean=g.wasClean?true:false;
e.code=g.code;
e.reason=g.reason
}else{if(g.type=="message"){var f=decodeURIComponent(g.message);
e=this.__createMessageEvent("message",f)
}else{throw"unknown event type: "+g.type
}}}this.dispatchEvent(e)
};
WebSocket.prototype.__createSimpleEvent=function(e){if(document.createEvent&&window.Event){var f=document.createEvent("Event");
f.initEvent(e,false,false);
return f
}else{return{type:e,bubbles:false,cancelable:false}
}};
WebSocket.prototype.__createMessageEvent=function(e,g){if(document.createEvent&&window.MessageEvent&&!window.opera){var f=document.createEvent("MessageEvent");
f.initMessageEvent("message",false,false,g,null,null,window,null);
return f
}else{return{type:e,data:g,bubbles:false,cancelable:false}
}};
WebSocket.CONNECTING=0;
WebSocket.OPEN=1;
WebSocket.CLOSING=2;
WebSocket.CLOSED=3;
WebSocket.__isFlashImplementation=true;
WebSocket.__initialized=false;
WebSocket.__flash=null;
WebSocket.__instances={};
WebSocket.__tasks=[];
WebSocket.__nextId=0;
WebSocket.loadFlashPolicyFile=function(e){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(e)
})
};
WebSocket.__initialize=function(){if(window.WEB_SOCKET_USING_FLASH_BUT_NO_FLASH){return
}if(WebSocket.__initialized){return
}WebSocket.__initialized=true;
if(WebSocket.__swfLocation){window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation
}if(!window.WEB_SOCKET_SWF_LOCATION){d.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
return
}if(!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR&&!WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/)&&WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)){var g=RegExp.$1;
if(location.host!=g){d.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host ('"+location.host+"' != '"+g+"'). See also 'How to host HTML file and SWF file in different domains' section in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;")
}}var e=document.createElement("div");
e.id="webSocketContainer";
e.style.position="absolute";
if(WebSocket.__isFlashLite()){e.style.left="0px";
e.style.top="0px"
}else{e.style.left="-100px";
e.style.top="-100px"
}var f=document.createElement("div");
f.id="webSocketFlash";
e.appendChild(f);
document.body.appendChild(e);
swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:true,swliveconnect:true,allowScriptAccess:"always"},null,function(h){if(!h.success){d.error("[WebSocket] swfobject.embedSWF failed")
}})
};
WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash");
WebSocket.__flash.setCallerUrl(location.href);
WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG_FLASH);
for(var e=0;
e<WebSocket.__tasks.length;
++e){WebSocket.__tasks[e]()
}WebSocket.__tasks=[]
},0)
};
WebSocket.__onFlashEvent=function(){setTimeout(function(){try{var g=WebSocket.__flash.receiveEvents();
for(var f=0;
f<g.length;
++f){WebSocket.__instances[g[f].webSocketId].__handleEvent(g[f])
}}catch(h){d.error(h)
}},0);
return true
};
WebSocket.__log=function(e){d.log(decodeURIComponent(e))
};
WebSocket.__error=function(e){d.error(decodeURIComponent(e))
};
WebSocket.__addTask=function(e){if(WebSocket.__flash){e()
}else{WebSocket.__tasks.push(e)
}};
WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes){return false
}var e=window.navigator.mimeTypes["application/x-shockwave-flash"];
if(!e||!e.enabledPlugin||!e.enabledPlugin.filename){return false
}return e.enabledPlugin.filename.match(/flashlite/i)?true:false
};
if(!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION){swfobject.addDomLoadEvent(function(){WebSocket.__initialize()
})
}a()
};
var a=function(){b=function(){if(console&&console.log){console.log("useFlashForWebSockets called, but already using flash, so ignoring")
}}
};
window.fallBackToFlashWebSockets=function(){window.WEB_SOCKET_FORCE_FLASH=true;
b()
};
if(window.WEB_SOCKET_FORCE_FLASH){}else{if(window.WebSocket){return
}else{if(window.MozWebSocket){window.WebSocket=MozWebSocket;
return
}}}b()
})();
/*!
 * jQuery imagesLoaded plugin v2.1.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */
;
(function(a,b){var c="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
a.fn.imagesLoaded=function(m){var j=this,o=a.isFunction(a.Deferred)?a.Deferred():0,n=a.isFunction(o.notify),f=j.find("img").add(j.filter("img")),g=[],l=[],h=[];
if(a.isPlainObject(m)){a.each(m,function(p,q){if(p==="callback"){m=q
}else{if(o){o[p](q)
}}})
}function k(){var p=a(l),q=a(h);
if(o){if(h.length){o.reject(f,p,q)
}else{o.resolve(f)
}}if(a.isFunction(m)){m.call(j,f,p,q)
}}function e(p){d(p.target,p.type==="error")
}function d(p,q){if(p.src===c||a.inArray(p,g)!==-1){return
}g.push(p);
if(q){h.push(p)
}else{l.push(p)
}a.data(p,"imagesLoaded",{isBroken:q,src:p.src});
if(n){o.notifyWith(a(p),[q,f,a(l),a(h)])
}if(f.length===g.length){setTimeout(k);
f.unbind(".imagesLoaded",e)
}}if(!f.length){k()
}else{f.bind("load.imagesLoaded error.imagesLoaded",e).each(function(p,r){var s=r.src;
var q=a.data(r,"imagesLoaded");
if(q&&q.src===s){d(r,q.isBroken);
return
}if(r.complete&&r.naturalWidth!==b){d(r,r.naturalWidth===0||r.naturalHeight===0);
return
}if(r.readyState||r.complete){r.src=c;
r.src=s
}})
}return o?o.promise(j):j
}
})(jQuery);
/*! jQuery UI - v1.11.1 - 2014-09-24
* http://jqueryui.com
* Includes: widget.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{a(jQuery)
}}(function(c){
/*!
 * jQuery UI Widget 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
;
var d=0,a=Array.prototype.slice;
c.cleanData=(function(e){return function(f){var h,j,g;
for(g=0;
(j=f[g])!=null;
g++){try{h=c._data(j,"events");
if(h&&h.remove){c(j).triggerHandler("remove")
}}catch(k){}}e(f)
}
})(c.cleanData);
c.widget=function(e,f,n){var k,l,h,m,g={},j=e.split(".")[0];
e=e.split(".")[1];
k=j+"-"+e;
if(!n){n=f;
f=c.Widget
}c.expr[":"][k.toLowerCase()]=function(o){return !!c.data(o,k)
};
c[j]=c[j]||{};
l=c[j][e];
h=c[j][e]=function(o,p){if(!this._createWidget){return new h(o,p)
}if(arguments.length){this._createWidget(o,p)
}};
c.extend(h,l,{version:n.version,_proto:c.extend({},n),_childConstructors:[]});
m=new f();
m.options=c.widget.extend({},m.options);
c.each(n,function(p,o){if(!c.isFunction(o)){g[p]=o;
return
}g[p]=(function(){var q=function(){return f.prototype[p].apply(this,arguments)
},r=function(s){return f.prototype[p].apply(this,s)
};
return function(){var u=this._super,s=this._superApply,t;
this._super=q;
this._superApply=r;
t=o.apply(this,arguments);
this._super=u;
this._superApply=s;
return t
}
})()
});
h.prototype=c.widget.extend(m,{widgetEventPrefix:l?(m.widgetEventPrefix||e):e},g,{constructor:h,namespace:j,widgetName:e,widgetFullName:k});
if(l){c.each(l._childConstructors,function(p,q){var o=q.prototype;
c.widget(o.namespace+"."+o.widgetName,h,q._proto)
});
delete l._childConstructors
}else{f._childConstructors.push(h)
}c.widget.bridge(e,h);
return h
};
c.widget.extend=function(k){var f=a.call(arguments,1),j=0,e=f.length,g,h;
for(;
j<e;
j++){for(g in f[j]){h=f[j][g];
if(f[j].hasOwnProperty(g)&&h!==undefined){if(c.isPlainObject(h)){k[g]=c.isPlainObject(k[g])?c.widget.extend({},k[g],h):c.widget.extend({},h)
}else{k[g]=h
}}}}return k
};
c.widget.bridge=function(f,e){var g=e.prototype.widgetFullName||f;
c.fn[f]=function(k){var h=typeof k==="string",j=a.call(arguments,1),l=this;
k=!h&&j.length?c.widget.extend.apply(null,[k].concat(j)):k;
if(h){this.each(function(){var n,m=c.data(this,g);
if(k==="instance"){l=m;
return false
}if(!m){return c.error("cannot call methods on "+f+" prior to initialization; attempted to call method '"+k+"'")
}if(!c.isFunction(m[k])||k.charAt(0)==="_"){return c.error("no such method '"+k+"' for "+f+" widget instance")
}n=m[k].apply(m,j);
if(n!==m&&n!==undefined){l=n&&n.jquery?l.pushStack(n.get()):n;
return false
}})
}else{this.each(function(){var m=c.data(this,g);
if(m){m.option(k||{});
if(m._init){m._init()
}}else{c.data(this,g,new e(k,this))
}})
}return l
}
};
c.Widget=function(){};
c.Widget._childConstructors=[];
c.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,create:null},_createWidget:function(e,f){f=c(f||this.defaultElement||this)[0];
this.element=c(f);
this.uuid=d++;
this.eventNamespace="."+this.widgetName+this.uuid;
this.options=c.widget.extend({},this.options,this._getCreateOptions(),e);
this.bindings=c();
this.hoverable=c();
this.focusable=c();
if(f!==this){c.data(f,this.widgetFullName,this);
this._on(true,this.element,{remove:function(g){if(g.target===f){this.destroy()
}}});
this.document=c(f.style?f.ownerDocument:f.document||f);
this.window=c(this.document[0].defaultView||this.document[0].parentWindow)
}this._create();
this._trigger("create",null,this._getCreateEventData());
this._init()
},_getCreateOptions:c.noop,_getCreateEventData:c.noop,_create:c.noop,_init:c.noop,destroy:function(){this._destroy();
this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(c.camelCase(this.widgetFullName));
this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled");
this.bindings.unbind(this.eventNamespace);
this.hoverable.removeClass("ui-state-hover");
this.focusable.removeClass("ui-state-focus")
},_destroy:c.noop,widget:function(){return this.element
},option:function(h,j){var e=h,k,g,f;
if(arguments.length===0){return c.widget.extend({},this.options)
}if(typeof h==="string"){e={};
k=h.split(".");
h=k.shift();
if(k.length){g=e[h]=c.widget.extend({},this.options[h]);
for(f=0;
f<k.length-1;
f++){g[k[f]]=g[k[f]]||{};
g=g[k[f]]
}h=k.pop();
if(arguments.length===1){return g[h]===undefined?null:g[h]
}g[h]=j
}else{if(arguments.length===1){return this.options[h]===undefined?null:this.options[h]
}e[h]=j
}}this._setOptions(e);
return this
},_setOptions:function(e){var f;
for(f in e){this._setOption(f,e[f])
}return this
},_setOption:function(e,f){this.options[e]=f;
if(e==="disabled"){this.widget().toggleClass(this.widgetFullName+"-disabled",!!f);
if(f){this.hoverable.removeClass("ui-state-hover");
this.focusable.removeClass("ui-state-focus")
}}return this
},enable:function(){return this._setOptions({disabled:false})
},disable:function(){return this._setOptions({disabled:true})
},_on:function(h,g,f){var j,e=this;
if(typeof h!=="boolean"){f=g;
g=h;
h=false
}if(!f){f=g;
g=this.element;
j=this.widget()
}else{g=j=c(g);
this.bindings=this.bindings.add(g)
}c.each(f,function(p,o){function m(){if(!h&&(e.options.disabled===true||c(this).hasClass("ui-state-disabled"))){return
}return(typeof o==="string"?e[o]:o).apply(e,arguments)
}if(typeof o!=="string"){m.guid=o.guid=o.guid||m.guid||c.guid++
}var n=p.match(/^([\w:-]*)\s*(.*)$/),l=n[1]+e.eventNamespace,k=n[2];
if(k){j.delegate(k,l,m)
}else{g.bind(l,m)
}})
},_off:function(f,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;
f.unbind(e).undelegate(e)
},_delay:function(h,g){function f(){return(typeof h==="string"?e[h]:h).apply(e,arguments)
}var e=this;
return setTimeout(f,g||0)
},_hoverable:function(e){this.hoverable=this.hoverable.add(e);
this._on(e,{mouseenter:function(f){c(f.currentTarget).addClass("ui-state-hover")
},mouseleave:function(f){c(f.currentTarget).removeClass("ui-state-hover")
}})
},_focusable:function(e){this.focusable=this.focusable.add(e);
this._on(e,{focusin:function(f){c(f.currentTarget).addClass("ui-state-focus")
},focusout:function(f){c(f.currentTarget).removeClass("ui-state-focus")
}})
},_trigger:function(e,f,g){var k,j,h=this.options[e];
g=g||{};
f=c.Event(f);
f.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase();
f.target=this.element[0];
j=f.originalEvent;
if(j){for(k in j){if(!(k in f)){f[k]=j[k]
}}}this.element.trigger(f,g);
return !(c.isFunction(h)&&h.apply(this.element[0],[f].concat(g))===false||f.isDefaultPrevented())
}};
c.each({show:"fadeIn",hide:"fadeOut"},function(f,e){c.Widget.prototype["_"+f]=function(j,h,l){if(typeof h==="string"){h={effect:h}
}var k,g=!h?f:h===true||typeof h==="number"?e:h.effect||e;
h=h||{};
if(typeof h==="number"){h={duration:h}
}k=!c.isEmptyObject(h);
h.complete=l;
if(h.delay){j.delay(h.delay)
}if(k&&c.effects&&c.effects.effect[g]){j[f](h)
}else{if(g!==f&&j[g]){j[g](h.duration,h.easing,l)
}else{j.queue(function(m){c(this)[f]();
if(l){l.call(j[0])
}m()
})
}}}
});
var b=c.widget
}));
(function(){$.widget("TS.tab_complete_ui",{_$el:null,_$input:null,_$scroller:null,_$parent_scroller:null,_current_matches:[],_is_showing:false,_was_just_hidden:false,_last_shown_matches:null,_show_delay_tim:0,_show_delay_ms:500,_lazy_load:null,_scroll_raf:null,_currently_keyboard_highlighted:true,_date_start:new Date(),_create:function(){this._$input=this.element;
var b=this.options.id;
this._$el=$('<div id="'+b+'" class="tab_complete_ui hidden inactive"> 				<div id="'+b+'_header" class="tab_complete_ui_header"> 					<span class="header_label"></span> 					<span class="header_help"><strong>tab</strong>&nbsp; or &nbsp;<strong>&uarr;</strong> <strong>&darr;</strong>&nbsp; to navigate <strong class="left_margin">↵</strong>&nbsp; to select <strong class="left_margin">esc</strong>&nbsp; to dismiss</span> 				</div> 			</div>');
if(this.options.narrow){this._$el.addClass("narrow")
}this._$scroller=$('<div id="'+b+'_scroller" class="tab_complete_ui_scroller"></div>');
this._$el.append(this._$scroller);
$("body").append(this._$el);
var a=TS.qs_args.debug_scroll=="1";
this._$scroller.monkeyScroll({debug:a});
this._$el.bind("click",this._onElClick.bind(this));
this._$el.bind("mousemove",this._onElMouseMove.bind(this));
this._$el.on("mouseenter",".tab_complete_ui_item",this._onItemMouseEnter.bind(this));
this._$input.bind("matches_set",this._onInputMatchesSet.bind(this));
this._$input.bind("match_changed",this._onInputMatchChanged.bind(this));
this._$input.bind("reset",this._onInputReset.bind(this));
this._$input.bind("keydown",this._onInputKeyDown.bind(this))
},_destroy:function(){this._$el.remove();
$("html").unbind("mousedown.tabcomplete");
if(this._$parent_scroller){this._$parent_scroller.unbind("scroll.tab_complete_ui")
}},_show_threshold:1000,_show_slow:null,_show:function(a){this._currently_keyboard_highlighted=true;
var f=new Date();
a.shown_callback();
var b=this._$el;
var d=this._$scroller;
var e=a.current_matches.join("");
if(this._last_shown_matches!==e){this._last_shown_matches=e;
this._buildAndInsertHTML(a)
}if(!this._is_showing){b.removeClass("inactive").removeClass("hidden");
d.trigger("resize-immediate")
}this._is_showing=true;
$("html").unbind("mousedown.tabcomplete").bind("mousedown.tabcomplete",this._onMouseDown.bind(this));
this._positionUI();
var c=new Date()-f;
if(a&&a.w&&c>this._show_threshold&&!this._show_slow){if(a.w==="emoji"){TS.logError({message:"emoji took "+c+"ms for "+a.current_matches.length+" items (theshold is "+this._show_threshold+"ms). localStorage = "+(TS.model.prefs.ls_disabled?0:1)},"tab_complete_ui._show() with emoji exceeded slow threshold")
}else{if(a.w==="members"){TS.logError({message:"members took "+c+"ms for "+a.current_matches.length+" items (theshold is "+this._show_threshold+"ms). Member images: "+((!TS.model.mac_ssb_version||a.current_matches.length<100)?"included.":"excluded.")+" App open for "+((new Date()-this._date_start)/1000/60).toFixed(2)+" min."},"tab_complete_ui._show() with members exceeded slow threshold")
}}this._show_slow=true
}if(this.options.scroll_with_element){if(this._$parent_scroller){this._$parent_scroller.unbind("scroll.tab_complete_ui")
}this._$parent_scroller=this._$input.parents(":scrollable(vertical):first");
this._$parent_scroller.bind("scroll.tab_complete_ui",this._onScroll.bind(this))
}},_hide:function(){var a=this._$el;
this._is_showing=false;
a.addClass("inactive");
a.addClass("hidden");
this._last_shown_matches=null;
if(this._$parent_scroller){this._$parent_scroller.unbind("scroll.tab_complete_ui")
}this._was_just_hidden=true;
setTimeout(function(){this._was_just_hidden=false
}.bind(this),0)
},_onInputKeyDown:function(a){this._currently_keyboard_highlighted=true
},_onElClick:function(b){var c=this._$input;
var a=$(b.target).closest(".tab_complete_ui_item");
if(!a.length){return
}c.TS_tabComplete2("choose",a.data("index"))
},_onElMouseMove:function(a){this._currently_keyboard_highlighted=false
},_onItemMouseEnter:function(c){if(this._currently_keyboard_highlighted){return
}var d=this._$input;
var a=$(c.target).closest(".tab_complete_ui_item");
var b=true;
d.TS_tabComplete2("choose",a.data("index"),b)
},_onInputMatchesSet:function(d,a){clearTimeout(this._show_delay_tim);
var b=this._$el;
var f=this._$scroller;
this._current_matches=a.current_matches;
if(a.hide_ui){this._hide()
}else{var c=function(){this._show(a);
f.scrollTop(0);
if(a.i!=-1){b.find('.tab_complete_ui_item[data-index="'+a.i+'"]:not(.just_one)').addClass("active").scrollintoview({duration:10})
}}.bind(this);
if(a.delay_ui){this._show_delay_tim=setTimeout(c,this._show_delay_ms);
f.scrollTop(0);
if(a.i!=-1){b.find('.tab_complete_ui_item[data-index="'+a.i+'"]:not(.just_one)').addClass("active").scrollintoview({duration:10})
}this._positionUI()
}else{c()
}}},_onInputMatchChanged:function(c,a){clearTimeout(this._show_delay_tim);
var b=this._$el;
if(!this._current_matches){this._onInputMatchesSet(c,a);
return
}this._show(a);
b.find(".tab_complete_ui_item").removeClass("active");
b.find('.tab_complete_ui_item[data-index="'+a.i+'"]').addClass("active").scrollintoview({duration:10})
},_onInputReset:function(b,a){clearTimeout(this._show_delay_tim);
$("html").unbind("mousedown.tabcomplete");
this._hide();
this._current_matches=null
},_onMouseDown:function(b){var a=this._$el;
var c=this._$input;
if($(b.target).closest(a).length===0&&$(b.target).closest(c).length===0){c.TS_tabComplete2("reset","mousedown")
}},_onScroll:function(a){TS.utility.cancelRAF(this._scroll_raf);
this._scroll_raf=TS.utility.rAF(this._positionUI.bind(this))
},_positionUI:function(){if(!this._$el||!this._$el.length){return
}var m=this._$el;
var h=this._$input;
var d=h.offset();
var l=h.data("$tab_complete_ui_y_positioner");
if(l){var a=l.offset();
d.top=a.top;
d.bottom=a.bottom
}var e=h.width();
var c=this.options.min_width||500;
var k=20;
var b;
var g=$(window).width()-d.left-k;
if(g>0&&(g<e||c>g)){b=e=g
}else{b=Math.max(c,e)
}m.css({width:b});
if(d.top<488){this._$scroller.css("max-height",Math.max(100,d.top-32))
}else{this._$scroller.css("max-height","")
}var j=d.left;
var f=d.top-m.outerHeight();
m.css({top:f,left:j});
this._$scroller.data("monkeyScroll").updateFunc()
},positionUI:function(){this._positionUI()
},isShowing:function(){return this._is_showing
},wasJustHidden:function(){return this._was_just_hidden
},_buildItemsHTML:function(j){var g=[];
var e=this._current_matches;
var l="type_"+j.w;
g.push('<ul class="'+l+'">');
var c=false&&e.length==1;
var h=false;
var a={};
for(var f=0;
f<e.length;
f++){if(j.w=="emoji"){g.push('<li class="tab_complete_ui_item" data-index="'+f+'">'+this._buildEmojiHTML(e[f])+"</li>")
}else{if(j.w=="channels"){g.push('<li class="tab_complete_ui_item" data-index="'+f+'">'+this._buildChannelHTML(e[f])+"</li>")
}else{if(j.w=="cmds"){g.push('<li class="tab_complete_ui_item '+(c?"just_one":"")+'" data-index="'+f+'">'+this._buildCmdHTML(e[f],c)+"</li>");
if(h){var b=TS.utility.clone(TS.cmd_handlers[e[f]]);
if(b){a[e[f]]=b;
for(var d in b){if(!b[d]||d=="autocomplete"){delete b[d]
}}}}}else{g.push(this._buildMemberHTML(e,f,j.sort_by_membership))
}}}}if(h){TS.warn(JSON.stringify(a,null,"\t"))
}g.push("</ul>");
g=g.join("");
if(j.w=="emoji"){g=TS.emoji.graphicReplace(g)
}return g
},_buildMemberHTML:function(g,f,c){var j=g[f];
var h;
var o=false;
if(j=="everyone"||j=="channel"||j=="group"||j=="here"){o=c&&f>0&&TS.members.getMemberByName(g[f-1]);
h='<span class="broadcast">@'+j+"</span>";
switch(j){case"everyone":h+=' <span class="broadcast_info">Notify everyone on your team.</span>';
break;
case"channel":h+=' <span class="broadcast_info">Notify everyone in this channel.</span>';
break;
case"group":h+=' <span class="broadcast_info">Notify everyone in this group.</span>';
break;
case"here":var m=TS.shared.getActiveModelOb().is_channel?"channel":TS.templates.builders.groupCopy();
h+=' <span class="broadcast_info">Notify every online desktop-using member in this '+m+".</span>";
break;
default:break
}}else{if(TS.boot_data.feature_subteams&&TS.user_groups.getUserGroupsByHandle(j)){var e=TS.user_groups.getUserGroupsByHandle(j);
if(e){var n=e.description||e.name+" user group";
h='<span class="broadcast">@'+TS.utility.htmlEntities(j)+"</span>";
h+=' <span class="realname">'+e.users.length;
h+=(e.count===1?" member":" members")+' <span class="bullet">•</span> ';
h+=TS.utility.htmlEntities(n);
h+="</span>"
}}else{h='<span class="username">'+j+"</span>";
var d=TS.members.getMemberByName(j);
if(!d){h="@"+h
}else{var b=!this.options.no_model_ob&&TS.shared.getActiveModelOb();
var k=b&&!b.is_im&&(b.members.indexOf(d.id)>-1||d.is_slackbot);
if(c&&f>0&&!k&&!b.is_im){var a=TS.members.getMemberByName(g[f-1]);
if(!a||a.is_slackbot||b.members.indexOf(a.id)>-1){o=true
}}if(g.length<100){h=TS.templates.builders.makeMemberImage(d.id,24,true)+" "+h
}if(d.presence){h+=TS.templates.makeMemberPresenceIcon(d)
}h+=' <span class="realname">'+TS.utility.htmlEntities(d.profile.real_name)+"</span>";
if(b&&!d.is_slackbot&&!b.is_im){var l="channel";
if(b.is_group){l="group"
}if(!k){h+=' <span class="not_in_channel">(not in '+l+")</span>"
}}}}}h='<li class="tab_complete_ui_item" data-index="'+f+'">'+h+"</li>";
if(o){h='<hr class="small_top_margin small_bottom_margin" />'+h
}return h
},_buildChannelHTML:function(a){var b='<span class="channelname"><span class="hash">#</span>'+a+"</span>";
return b
},_buildCmdHTML:function(g,c){var b=TS.cmd_handlers[g];
var f;
if(b){var a="";
if(b.aliases){a=" (or "+b.aliases.join(", ")+")"
}var h="";
if(b.usage){h=" "+b.usage;
h=h.replace(/</g,'<span class="argname argoptional"%%%% &lt;');
h=h.replace(/\>/g,"&gt;</span>");
h=h.replace(/\%\%\%\%/g,">");
h=h.replace(/\[/g,'<span class="argname"> [');
h=h.replace(/\]/g,"]</span>")
}else{if(b.args){var j;
for(var e=0;
e<b.args.length;
e++){j=b.args[e];
if(j.optional){h+=' <span class="argname argoptional"> ['+j.name+"]</span>"
}else{h+=' <span class="argname"> '+j.name+"</span>"
}}}}var k="";
var d="";
if(b.type=="client"&&b.override){d=" override"
}if(b.type=="service"||b.type=="custom"){k="["+b.type+d+"]"
}f='<div class="cmd-left-td"><span class="cmdname">'+TS.utility.htmlEntities(g)+"</span>"+a+h+'</div><div class="cmd-right-td"><span class="cmddesc"><span class="cmdtype">'+k+"</span> "+TS.utility.htmlEntities(b.desc)+"</span></div>"
}else{f='<div class="cmd-left-td"><span class="cmdname">'+g+"</span></div>"
}if(c){}return f
},_buildEmojiHTML:function(a){var c=!TS.model.prefs.emoji_autocomplete_big;
var b=":"+a+": ";
if(c){b=":"+a+": &#58;"+a+"&#58"
}return b
},_buildHeaderHTML:function(a){var b="";
if(a.w=="members"){b="People"
}else{if(a.w=="cmds"){b="Commands"
}else{b=TS.utility.capitalize(a.w)
}}if(a.matched_on&&a.matched_on!="@"&&a.matched_on!="#"){b+=" matching <strong>"+TS.utility.htmlEntities(a.matched_on)+"</strong>"
}return b
},_buildAndInsertHTML:function(a){var b=this._$scroller;
this._$el.find(".header_label").html(this._buildHeaderHTML(a));
b.html(this._buildItemsHTML(a));
if(this._lazyload&&this._lazyload.detachEvents){this._lazyload.detachEvents()
}this._lazyload=b.find("img.lazy").lazyload({container:this._$scroller})
}})
})();
(function(){$.widget("TS.longListView",{_dirty:false,_raf:null,_$container:null,_$scrollable:null,_scrollable_height:null,_scrollable_width:null,_scrollable_offset:null,_list_height:null,_scroll_top:null,_visible_items_map:null,_item_heights:null,_free_elements:null,_free_dividers:null,_buffer_size:e,_scrolling:false,_use_sticky:false,_preserve_dom_order:false,_create:function(){this._use_sticky=TS.model.supports_sticky_position;
if(this.options.pin_dividers&&!this._use_sticky){this.options.pin_dividers=false
}this._animationLoop=function(){this._renderUI();
this._raf=TS.utility.rAF(this._animationLoop)
}.bind(this);
this._debouncedResize=TS.utility.throttleFunc(this._resize.bind(this),500,true);
this._debouncedStoppedScrolling=TS.utility.throttleFunc(this._stoppedScrolling.bind(this),150,true);
this._debouncedDoneInertialScrolling=TS.utility.throttleFunc(this._doneInertialScrolling.bind(this),150,true);
this._dirty=false;
this._visible_items_map={};
this._free_elements=[];
this._free_dividers=[];
this._preserve_dom_order=this.options.preserve_dom_order;
this._$container=this.element;
this._$container.addClass("not_scrolling");
if(this.options.scrollable){this._$scrollable=$(this.options.scrollable)
}else{this._$scrollable=this._$container
}this._calculateSizing();
this._$list_wrapper=$('<div class="list_items">').css({position:"relative"}).appendTo(this._$container);
this._buffer_size=this.options.buffer_size||e;
this._initForData();
this._raf=TS.utility.rAF(this._animationLoop);
this._$scrollable.on("scroll",this._onScroll.bind(this));
this._debouncedResizeWrapper=function(){this._debouncedResize()
}.bind(this),$(window).on("resize",this._debouncedResizeWrapper);
this._initInertialScrollFix()
},_destroy:function(){this._$scrollable.off("scroll");
$(window).off("resize",this._debouncedResizeWrapper);
TS.utility.cancelRAF(this._raf)
},setItems:function(f){this.options.items=f;
this._initForData()
},_initForData:function(){this._dirty=true;
this._item_heights=[];
var g=0;
var l=0;
var o;
var h;
var m=this.options.pin_dividers&&this._use_sticky;
for(var j=0;
j<this.options.items.length;
j++){o=this.options.items[j];
if(o.is_divider){h=this.options.approx_divider_height||this.options.approx_item_height
}else{h=this.options.approx_item_height
}this._item_heights.push({index:j,top:g,margin_top:o.is_divider&&m?l:null,height:h,approx:true});
if(o.is_divider&&m){l=0
}else{l+=h
}g+=h
}this._$list_wrapper.css("height",g);
var n=Object.keys(this._visible_items_map);
n.forEach(function(p){this._recycle(p)
},this);
var k;
var f;
if(m){for(j=0;
j<this.options.items.length;
j++){o=this.options.items[j];
if(o.is_divider){k=this._renderItem(j);
this._visible_items_map[j]=k;
f=this._item_heights[j];
k.$el.css("margin-top",f.margin_top+"px");
k.top=f.margin_top
}}}},_animationLoop:null,_renderUI:function(){if(!this._dirty){return
}var s=this.options.pin_dividers&&this._use_sticky;
var q=this._scroll_top-this._scrollable_offset;
var f=this._scroll_top+this._scrollable_height-this._scrollable_offset;
var n=null,r=null;
var g,h;
for(g=0;
g<this._item_heights.length;
g++){h=this._item_heights[g];
if(n===null){if(h.top<=q&&(h.top+h.height)>q){n=g
}}if(r===null){if(h.top<=f&&(h.top+h.height)>f){r=g
}}if(n!==null&&r!==null){break
}}if(n===null){n=0
}if(r===null){r=this.options.items.length-1
}n=Math.max(0,n-this._buffer_size);
r=Math.min(this.options.items.length-1,r+this._buffer_size);
var o=null;
if(this.options.pin_dividers&&!this._use_sticky){for(g=0;
g<this._item_heights.length;
g++){h=this._item_heights[g];
if(h.top>=q){break
}if(this.options.items[g].is_divider){o=g
}}}var t=Object.keys(this._visible_items_map);
t.forEach(function(u){u=parseInt(u,10);
if((u<n||u>r)&&u!==o){if(s&&this._visible_items_map[u].is_divider){return
}if(this._visible_items_map[u].$el.data("no-remove")){return
}this._recycle(u)
}},this);
t=Object.keys(this._visible_items_map);
var m;
var j=[];
for(var l=n;
l<=r;
l++){if(t.indexOf(l.toString())!==-1){continue
}m=this._renderItem(l);
this._visible_items_map[l]=m;
j.push(l);
c("rendered item "+l)
}t=Object.keys(this._visible_items_map);
if(o!==null&&t.indexOf(o.toString())===-1&&o<n){m=this._renderItem(o);
this._visible_items_map[o]=m;
j.unshift(o);
t=Object.keys(this._visible_items_map)
}if(this._preserve_dom_order){j.forEach(function(w){var u=this._visible_items_map[w];
var v=this._visible_items_map[w-1];
if(v){v.$el.after(u.$el)
}else{u.$el.prependTo(this._$list_wrapper)
}},this)
}if(o!==null){t.forEach(function(u){if(parseInt(u,10)===o){this._visible_items_map[u].is_pinned=true;
this._visible_items_map[u].$el.css("z-index",d)
}else{if(this._visible_items_map[u].is_pinned){this._visible_items_map[u].is_pinned=false;
this._visible_items_map[u].$el.css("z-index",b)
}}},this)
}j.forEach(function(A){var w=this._visible_items_map[A];
var y=this._item_heights[A];
if(!y.approx){return
}var x=this.options.approx_item_height;
if(w.is_divider&&this.options.approx_divider_height){x=this.options.approx_divider_height
}if(w.is_divider&&$.isFunction(this.options.calcDividerHeight)){x=this.options.calcDividerHeight(w.$el,this.options.items[A],w.data)
}else{if($.isFunction(this.options.calcItemHeight)){x=this.options.calcItemHeight(w.$el,this.options.items[A],w.data)
}}var z=x-y.height;
y.height=x;
y.approx=false;
if(z===0){return
}var u=false;
for(var v=A+1;
v<this.options.items.length;
v++){y=this._item_heights[v];
if(s&&this.options.items[v].is_divider){if(!u){u=true;
y.margin_top+=z
}}y.top+=z
}},this);
t.forEach(function(x){var v=this._visible_items_map[x];
var u=v.$el;
var w=this._item_heights[x];
if(v.is_divider&&s){if(v.top!==w.margin_top){u.css("margin-top",w.margin_top+"px");
v.top=w.margin_top
}}else{if(v.is_pinned){a(u,q);
v.top=q
}else{if(v.top!==w.top){a(u,w.top);
v.top=w.top
}}}},this);
var p=this._item_heights[this._item_heights.length-1];
if(p!==undefined){var k=p.height+p.top;
if(k!==this._list_height){this._$list_wrapper.css("height",k);
this._list_height=k
}}this._free_elements.forEach(function(u){u.$el.addClass("hidden");
if(this._preserve_dom_order){u.$el.appendTo(this._$list_wrapper)
}},this);
this._free_dividers.forEach(function(u){u.$el.addClass("hidden");
if(this._preserve_dom_order){u.$el.appendTo(this._$list_wrapper)
}},this);
this._dirty=false
},_onScroll:function(){this._scroll_top=this._$scrollable.scrollTop();
this._dirty=true;
if(this._scrolling){this._debouncedStoppedScrolling()
}else{this._scrolling=true;
TS.utility.rAF(function(){this._$container.removeClass("not_scrolling")
}.bind(this));
this._debouncedStoppedScrolling()
}},_debouncedStoppedScrolling:null,_stoppedScrolling:function(){this._$container.addClass("not_scrolling");
this._scrolling=false
},_recycle:function(f){c("Recyling item "+f);
var g=this._visible_items_map[f];
var h=this.options.pin_dividers&&this._use_sticky;
g.in_use=false;
g.inx=-1;
if(g.is_divider){if(h){g.$el.remove()
}else{g.is_pinned=false;
g.$el.css("z-index",b);
this._free_dividers.push(g)
}}else{this._free_elements.push(g)
}delete this._visible_items_map[f]
},_renderItem:function(h){var j=this.options.items[h];
var g;
if(j.is_divider){g=this._takeDivider()
}else{g=this._takeElement(j)
}g.in_use=true;
g.$el.removeClass("hidden");
g.inx=h;
if(j.is_divider){this.options.renderDivider(g.$el,j,g.data)
}else{var f=g.id;
g.id=j.id;
if(!g.id||f!==g.id){this.options.renderItem(g.$el,j,g.data)
}}g.$el.data("order-index",h);
return g
},_takeElement:function(h){if(this._free_elements.length>0){if(h&&h.id){for(var g=0;
g<this._free_elements.length;
g++){if(this._free_elements[g].id===h.id){var f=this._free_elements[g];
this._free_elements.splice(g,1);
return f
}}}return this._free_elements.pop()
}c("No free elements; building extra.");
return this._makeElement()
},_takeDivider:function(){if(this._free_dividers.length>0){return this._free_dividers.pop()
}c("No free dividers; building extra.");
var f=true;
return this._makeElement(f)
},_makeElement:function(f){var h={};
var g;
if(f){g=this.options.makeDivider(h);
g.css("z-index",b)
}else{g=$(this.options.makeElement(h))
}g.attr("data-long-list-item","1");
if(f&&this.options.pin_dividers&&this._use_sticky){g.css({position:"-webkit-sticky",top:"0"})
}else{g.css({position:"absolute",top:"0"})
}g.addClass("hidden");
g.appendTo(this._$list_wrapper);
return{inx:-1,id:null,$el:g,in_use:false,data:h,top:0,is_divider:!!f,is_pinned:false}
},_debouncedResize:null,_resize:function(){var j=this._calculateSizing();
if(!j){return
}for(var f=0;
f<this._item_heights.length;
f++){this._item_heights[f].approx=true
}var h=Object.keys(this._visible_items_map);
var g=this.options.pin_dividers&&this._use_sticky;
h.forEach(function(k){if(!(g&&this.options.items[k].is_divider)){this._recycle(k)
}},this);
this._dirty=true
},resizeImmediately:function(){this._resize()
},_calculateSizing:function(){var g=this._$scrollable.height();
var f=this._$scrollable.width();
if(g!==this._scrollable_height||f!==this._scrollable_width){this._scrollable_height=g;
this._scrollable_width=f
}else{return false
}this._scroll_top=this._$scrollable.scrollTop();
if(this._$scrollable[0]===this._$container[0]){this._scrollable_offset=0;
return true
}var h=this._$scrollable.offset();
var j=this._$container.offset();
if(h&&j){this._scrollable_offset=j.top-(h.top-this._scroll_top)
}return true
},scrollToTop:function(f){var g=0;
if(f){this._scrollImmediately(g)
}else{this._$scrollable.scrollTop(g)
}},scrollToEnd:function(f){var g=this._list_height-this._scrollable_height;
if(f){this._scrollImmediately(g)
}else{this._$scrollable.scrollTop(g)
}},_scrollImmediately:function(f){this._$scrollable.scrollTop(f);
this._scroll_top=f;
this._dirty=true;
this._renderUI()
},_inertialScrollStart:null,_initInertialScrollFix:function(){this._$list_wrapper.on("mousewheel",function(g){var f=$(g.target).closest("[data-long-list-item]");
if(f.length&&this._inertialScrollStart!==f[0]){if(this._inertialScrollStart){$(this._inertialScrollStart).data("no-remove",false)
}f.data("no-remove",true);
this._inertialScrollStart=f[0]
}});
this._debouncedDoneInertialScrolling()
},_debouncedDoneInertialScrolling:null,_doneInertialScrolling:function(){if(this._inertialScrollStart){$(this._inertialScrollStart).data("no-remove",false);
this._inertialScrollStart=null
}},renderUI:function(){this._renderUI()
},setScrollTop:function(f){this._scroll_top=f;
this._dirty=true
}});
var e=3;
var d=1;
var b=2;
var c=function(f){TS.log(2001,"long_list_view.js: "+f)
};
var a=function(h,k){var j=h[0];
if(!j){return
}var f;
var g="translateY("+k+"px)";
if(j.style.transform!==undefined){f="transform"
}else{if(j.style.webkitTransform!==undefined){f="webkitTransform"
}else{if(j.style.mozTransform!==undefined){f="mozTransform"
}}}if(f){j.style[f]=g
}else{j.style.top=k+"px"
}}
})();
!function(b){if("object"==typeof exports&&"undefined"!=typeof module){module.exports=b()
}else{if("function"==typeof define&&define.amd){define([],b)
}else{var a;
"undefined"!=typeof window?a=window:"undefined"!=typeof global?a=global:"undefined"!=typeof self&&(a=self),a.Promise=b()
}}}(function(){var define,module,exports;
return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;
if(!u&&a){return a(o,!0)
}if(i){return i(o,!0)
}var f=new Error("Cannot find module '"+o+"'");
throw f.code="MODULE_NOT_FOUND",f
}var l=n[o]={exports:{}};
t[o][0].call(l.exports,function(e){var n=t[o][1][e];
return s(n?n:e)
},l,l.exports,e,t,n,r)
}return n[o].exports
}var i=typeof _dereq_=="function"&&_dereq_;
for(var o=0;
o<r.length;
o++){s(r[o])
}return s
})({1:[function(_dereq_,module,exports){module.exports=function(Promise){var SomePromiseArray=Promise._SomePromiseArray;
function any(promises){var ret=new SomePromiseArray(promises);
var promise=ret.promise();
ret.setHowMany(1);
ret.setUnwrap();
ret.init();
return promise
}Promise.any=function(promises){return any(promises)
};
Promise.prototype.any=function(){return any(this)
}
}
},{}],2:[function(_dereq_,module,exports){var firstLineError;
try{throw new Error()
}catch(e){firstLineError=e
}var schedule=_dereq_("./schedule.js");
var Queue=_dereq_("./queue.js");
var util=_dereq_("./util.js");
function Async(){this._isTickUsed=false;
this._lateQueue=new Queue(16);
this._normalQueue=new Queue(16);
this._trampolineEnabled=true;
var self=this;
this.drainQueues=function(){self._drainQueues()
};
this._schedule=schedule.isStatic?schedule(this.drainQueues):schedule
}Async.prototype.disableTrampolineIfNecessary=function(){if(util.hasDevTools){this._trampolineEnabled=false
}};
Async.prototype.enableTrampoline=function(){if(!this._trampolineEnabled){this._trampolineEnabled=true;
this._schedule=function(fn){setTimeout(fn,0)
}
}};
Async.prototype.haveItemsQueued=function(){return this._normalQueue.length()>0
};
Async.prototype.throwLater=function(fn,arg){if(arguments.length===1){arg=fn;
fn=function(){throw arg
}
}var domain=this._getDomain();
if(domain!==undefined){fn=domain.bind(fn)
}if(typeof setTimeout!=="undefined"){setTimeout(function(){fn(arg)
},0)
}else{try{this._schedule(function(){fn(arg)
})
}catch(e){throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/m3OTXk\u000a")
}}};
Async.prototype._getDomain=function(){};
if(!true){if(util.isNode){var EventsModule=_dereq_("events");
var domainGetter=function(){var domain=process.domain;
if(domain===null){return undefined
}return domain
};
if(EventsModule.usingDomains){Async.prototype._getDomain=domainGetter
}else{var descriptor=Object.getOwnPropertyDescriptor(EventsModule,"usingDomains");
if(descriptor){if(!descriptor.configurable){process.on("domainsActivated",function(){Async.prototype._getDomain=domainGetter
})
}else{var usingDomains=false;
Object.defineProperty(EventsModule,"usingDomains",{configurable:false,enumerable:true,get:function(){return usingDomains
},set:function(value){if(usingDomains||!value){return
}usingDomains=true;
Async.prototype._getDomain=domainGetter;
util.toFastProperties(process);
process.emit("domainsActivated")
}})
}}}}}function AsyncInvokeLater(fn,receiver,arg){var domain=this._getDomain();
if(domain!==undefined){fn=domain.bind(fn)
}this._lateQueue.push(fn,receiver,arg);
this._queueTick()
}function AsyncInvoke(fn,receiver,arg){var domain=this._getDomain();
if(domain!==undefined){fn=domain.bind(fn)
}this._normalQueue.push(fn,receiver,arg);
this._queueTick()
}function AsyncSettlePromises(promise){var domain=this._getDomain();
if(domain!==undefined){var fn=domain.bind(promise._settlePromises);
this._normalQueue.push(fn,promise,undefined)
}else{this._normalQueue._pushOne(promise)
}this._queueTick()
}if(!util.hasDevTools){Async.prototype.invokeLater=AsyncInvokeLater;
Async.prototype.invoke=AsyncInvoke;
Async.prototype.settlePromises=AsyncSettlePromises
}else{if(schedule.isStatic){schedule=function(fn){setTimeout(fn,0)
}
}Async.prototype.invokeLater=function(fn,receiver,arg){if(this._trampolineEnabled){AsyncInvokeLater.call(this,fn,receiver,arg)
}else{this._schedule(function(){setTimeout(function(){fn.call(receiver,arg)
},100)
})
}};
Async.prototype.invoke=function(fn,receiver,arg){if(this._trampolineEnabled){AsyncInvoke.call(this,fn,receiver,arg)
}else{this._schedule(function(){fn.call(receiver,arg)
})
}};
Async.prototype.settlePromises=function(promise){if(this._trampolineEnabled){AsyncSettlePromises.call(this,promise)
}else{this._schedule(function(){promise._settlePromises()
})
}}
}Async.prototype.invokeFirst=function(fn,receiver,arg){var domain=this._getDomain();
if(domain!==undefined){fn=domain.bind(fn)
}this._normalQueue.unshift(fn,receiver,arg);
this._queueTick()
};
Async.prototype._drainQueue=function(queue){while(queue.length()>0){var fn=queue.shift();
if(typeof fn!=="function"){fn._settlePromises();
continue
}var receiver=queue.shift();
var arg=queue.shift();
fn.call(receiver,arg)
}};
Async.prototype._drainQueues=function(){this._drainQueue(this._normalQueue);
this._reset();
this._drainQueue(this._lateQueue)
};
Async.prototype._queueTick=function(){if(!this._isTickUsed){this._isTickUsed=true;
this._schedule(this.drainQueues)
}};
Async.prototype._reset=function(){this._isTickUsed=false
};
module.exports=new Async();
module.exports.firstLineError=firstLineError
},{"./queue.js":28,"./schedule.js":31,"./util.js":38,events:39}],3:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL,tryConvertToPromise){var rejectThis=function(_,e){this._reject(e)
};
var targetRejected=function(e,context){context.promiseRejectionQueued=true;
context.bindingPromise._then(rejectThis,rejectThis,null,this,e)
};
var bindingResolved=function(thisArg,context){this._setBoundTo(thisArg);
if(this._isPending()){this._resolveCallback(context.target)
}};
var bindingRejected=function(e,context){if(!context.promiseRejectionQueued){this._reject(e)
}};
Promise.prototype.bind=function(thisArg){var maybePromise=tryConvertToPromise(thisArg);
var ret=new Promise(INTERNAL);
ret._propagateFrom(this,1);
var target=this._target();
if(maybePromise instanceof Promise){var context={promiseRejectionQueued:false,promise:ret,target:target,bindingPromise:maybePromise};
target._then(INTERNAL,targetRejected,ret._progress,ret,context);
maybePromise._then(bindingResolved,bindingRejected,ret._progress,ret,context)
}else{ret._setBoundTo(thisArg);
ret._resolveCallback(target)
}return ret
};
Promise.prototype._setBoundTo=function(obj){if(obj!==undefined){this._bitField=this._bitField|131072;
this._boundTo=obj
}else{this._bitField=this._bitField&(~131072)
}};
Promise.prototype._isBound=function(){return(this._bitField&131072)===131072
};
Promise.bind=function(thisArg,value){var maybePromise=tryConvertToPromise(thisArg);
var ret=new Promise(INTERNAL);
if(maybePromise instanceof Promise){maybePromise._then(function(thisArg){ret._setBoundTo(thisArg);
ret._resolveCallback(value)
},ret._reject,ret._progress,ret,null)
}else{ret._setBoundTo(thisArg);
ret._resolveCallback(value)
}return ret
}
}
},{}],4:[function(_dereq_,module,exports){var old;
if(typeof Promise!=="undefined"){old=Promise
}function noConflict(){try{if(Promise===bluebird){Promise=old
}}catch(e){}return bluebird
}var bluebird=_dereq_("./promise.js")();
bluebird.noConflict=noConflict;
module.exports=bluebird
},{"./promise.js":23}],5:[function(_dereq_,module,exports){var cr=Object.create;
if(cr){var callerCache=cr(null);
var getterCache=cr(null);
callerCache[" size"]=getterCache[" size"]=0
}module.exports=function(Promise){var util=_dereq_("./util.js");
var canEvaluate=util.canEvaluate;
var isIdentifier=util.isIdentifier;
var getMethodCaller;
var getGetter;
if(!true){var makeMethodCaller=function(methodName){return new Function("ensureMethod","                                    \n        return function(obj) {                                               \n            'use strict'                                                     \n            var len = this.length;                                           \n            ensureMethod(obj, 'methodName');                                 \n            switch(len) {                                                    \n                case 1: return obj.methodName(this[0]);                      \n                case 2: return obj.methodName(this[0], this[1]);             \n                case 3: return obj.methodName(this[0], this[1], this[2]);    \n                case 0: return obj.methodName();                             \n                default:                                                     \n                    return obj.methodName.apply(obj, this);                  \n            }                                                                \n        };                                                                   \n        ".replace(/methodName/g,methodName))(ensureMethod)
};
var makeGetter=function(propertyName){return new Function("obj","                                             \n        'use strict';                                                        \n        return obj.propertyName;                                             \n        ".replace("propertyName",propertyName))
};
var getCompiled=function(name,compiler,cache){var ret=cache[name];
if(typeof ret!=="function"){if(!isIdentifier(name)){return null
}ret=compiler(name);
cache[name]=ret;
cache[" size"]++;
if(cache[" size"]>512){var keys=Object.keys(cache);
for(var i=0;
i<256;
++i){delete cache[keys[i]]
}cache[" size"]=keys.length-256
}}return ret
};
getMethodCaller=function(name){return getCompiled(name,makeMethodCaller,callerCache)
};
getGetter=function(name){return getCompiled(name,makeGetter,getterCache)
}
}function ensureMethod(obj,methodName){var fn;
if(obj!=null){fn=obj[methodName]
}if(typeof fn!=="function"){var message="Object "+util.classString(obj)+" has no method '"+util.toString(methodName)+"'";
throw new Promise.TypeError(message)
}return fn
}function caller(obj){var methodName=this.pop();
var fn=ensureMethod(obj,methodName);
return fn.apply(obj,this)
}Promise.prototype.call=function(methodName){var $_len=arguments.length;
var args=new Array($_len-1);
for(var $_i=1;
$_i<$_len;
++$_i){args[$_i-1]=arguments[$_i]
}if(!true){if(canEvaluate){var maybeCaller=getMethodCaller(methodName);
if(maybeCaller!==null){return this._then(maybeCaller,undefined,undefined,args,undefined)
}}}args.push(methodName);
return this._then(caller,undefined,undefined,args,undefined)
};
function namedGetter(obj){return obj[this]
}function indexedGetter(obj){var index=+this;
if(index<0){index=Math.max(0,index+obj.length)
}return obj[index]
}Promise.prototype.get=function(propertyName){var isIndex=(typeof propertyName==="number");
var getter;
if(!isIndex){if(canEvaluate){var maybeGetter=getGetter(propertyName);
getter=maybeGetter!==null?maybeGetter:namedGetter
}else{getter=namedGetter
}}else{getter=indexedGetter
}return this._then(getter,undefined,undefined,propertyName,undefined)
}
}
},{"./util.js":38}],6:[function(_dereq_,module,exports){module.exports=function(Promise){var errors=_dereq_("./errors.js");
var async=_dereq_("./async.js");
var CancellationError=errors.CancellationError;
Promise.prototype._cancel=function(reason){if(!this.isCancellable()){return this
}var parent;
var promiseToReject=this;
while((parent=promiseToReject._cancellationParent)!==undefined&&parent.isCancellable()){promiseToReject=parent
}this._unsetCancellable();
promiseToReject._target()._rejectCallback(reason,false,true)
};
Promise.prototype.cancel=function(reason){if(!this.isCancellable()){return this
}if(reason===undefined){reason=new CancellationError()
}async.invokeLater(this._cancel,this,reason);
return this
};
Promise.prototype.cancellable=function(){if(this._cancellable()){return this
}async.enableTrampoline();
this._setCancellable();
this._cancellationParent=undefined;
return this
};
Promise.prototype.uncancellable=function(){var ret=this.then();
ret._unsetCancellable();
return ret
};
Promise.prototype.fork=function(didFulfill,didReject,didProgress){var ret=this._then(didFulfill,didReject,didProgress,undefined,undefined);
ret._setCancellable();
ret._cancellationParent=undefined;
return ret
}
}
},{"./async.js":2,"./errors.js":13}],7:[function(_dereq_,module,exports){module.exports=function(){var async=_dereq_("./async.js");
var util=_dereq_("./util.js");
var bluebirdFramePattern=/[\\\/]bluebird[\\\/]js[\\\/](main|debug|zalgo|instrumented)/;
var stackFramePattern=null;
var formatStack=null;
var indentStackFrames=false;
var warn;
function CapturedTrace(parent){this._parent=parent;
var length=this._length=1+(parent===undefined?0:parent._length);
captureStackTrace(this,CapturedTrace);
if(length>32){this.uncycle()
}}util.inherits(CapturedTrace,Error);
CapturedTrace.prototype.uncycle=function(){var length=this._length;
if(length<2){return
}var nodes=[];
var stackToIndex={};
for(var i=0,node=this;
node!==undefined;
++i){nodes.push(node);
node=node._parent
}length=this._length=i;
for(var i=length-1;
i>=0;
--i){var stack=nodes[i].stack;
if(stackToIndex[stack]===undefined){stackToIndex[stack]=i
}}for(var i=0;
i<length;
++i){var currentStack=nodes[i].stack;
var index=stackToIndex[currentStack];
if(index!==undefined&&index!==i){if(index>0){nodes[index-1]._parent=undefined;
nodes[index-1]._length=1
}nodes[i]._parent=undefined;
nodes[i]._length=1;
var cycleEdgeNode=i>0?nodes[i-1]:this;
if(index<length-1){cycleEdgeNode._parent=nodes[index+1];
cycleEdgeNode._parent.uncycle();
cycleEdgeNode._length=cycleEdgeNode._parent._length+1
}else{cycleEdgeNode._parent=undefined;
cycleEdgeNode._length=1
}var currentChildLength=cycleEdgeNode._length+1;
for(var j=i-2;
j>=0;
--j){nodes[j]._length=currentChildLength;
currentChildLength++
}return
}}};
CapturedTrace.prototype.parent=function(){return this._parent
};
CapturedTrace.prototype.hasParent=function(){return this._parent!==undefined
};
CapturedTrace.prototype.attachExtraTrace=function(error){if(error.__stackCleaned__){return
}this.uncycle();
var parsed=CapturedTrace.parseStackAndMessage(error);
var message=parsed.message;
var stacks=[parsed.stack];
var trace=this;
while(trace!==undefined){stacks.push(cleanStack(trace.stack.split("\n")));
trace=trace._parent
}removeCommonRoots(stacks);
removeDuplicateOrEmptyJumps(stacks);
util.notEnumerableProp(error,"stack",reconstructStack(message,stacks));
util.notEnumerableProp(error,"__stackCleaned__",true)
};
function reconstructStack(message,stacks){for(var i=0;
i<stacks.length-1;
++i){stacks[i].push("From previous event:");
stacks[i]=stacks[i].join("\n")
}if(i<stacks.length){stacks[i]=stacks[i].join("\n")
}return message+"\n"+stacks.join("\n")
}function removeDuplicateOrEmptyJumps(stacks){for(var i=0;
i<stacks.length;
++i){if(stacks[i].length===0||((i+1<stacks.length)&&stacks[i][0]===stacks[i+1][0])){stacks.splice(i,1);
i--
}}}function removeCommonRoots(stacks){var current=stacks[0];
for(var i=1;
i<stacks.length;
++i){var prev=stacks[i];
var currentLastIndex=current.length-1;
var currentLastLine=current[currentLastIndex];
var commonRootMeetPoint=-1;
for(var j=prev.length-1;
j>=0;
--j){if(prev[j]===currentLastLine){commonRootMeetPoint=j;
break
}}for(var j=commonRootMeetPoint;
j>=0;
--j){var line=prev[j];
if(current[currentLastIndex]===line){current.pop();
currentLastIndex--
}else{break
}}current=prev
}}function cleanStack(stack){var ret=[];
for(var i=0;
i<stack.length;
++i){var line=stack[i];
var isTraceLine=stackFramePattern.test(line)||"    (No stack trace)"===line;
var isInternalFrame=isTraceLine&&shouldIgnore(line);
if(isTraceLine&&!isInternalFrame){if(indentStackFrames&&line.charAt(0)!==" "){line="    "+line
}ret.push(line)
}}return ret
}function stackFramesAsArray(error){var stack=error.stack.replace(/\s+$/g,"").split("\n");
for(var i=0;
i<stack.length;
++i){var line=stack[i];
if("    (No stack trace)"===line||stackFramePattern.test(line)){break
}}if(i>0){stack=stack.slice(i)
}return stack
}CapturedTrace.parseStackAndMessage=function(error){var stack=error.stack;
var message=error.toString();
stack=typeof stack==="string"&&stack.length>0?stackFramesAsArray(error):["    (No stack trace)"];
return{message:message,stack:cleanStack(stack)}
};
CapturedTrace.formatAndLogError=function(error,title){if(typeof console!=="undefined"){var message;
if(typeof error==="object"||typeof error==="function"){var stack=error.stack;
message=title+formatStack(stack,error)
}else{message=title+String(error)
}if(typeof warn==="function"){warn(message)
}else{if(typeof console.log==="function"||typeof console.log==="object"){console.log(message)
}}}};
CapturedTrace.unhandledRejection=function(reason){CapturedTrace.formatAndLogError(reason,"^--- With additional stack trace: ")
};
CapturedTrace.isSupported=function(){return typeof captureStackTrace==="function"
};
CapturedTrace.fireRejectionEvent=function(name,localHandler,reason,promise){var localEventFired=false;
try{if(typeof localHandler==="function"){localEventFired=true;
if(name==="rejectionHandled"){localHandler(promise)
}else{localHandler(reason,promise)
}}}catch(e){async.throwLater(e)
}var globalEventFired=false;
try{globalEventFired=fireGlobalEvent(name,reason,promise)
}catch(e){globalEventFired=true;
async.throwLater(e)
}var domEventFired=false;
if(fireDomEvent){try{domEventFired=fireDomEvent(name.toLowerCase(),{reason:reason,promise:promise})
}catch(e){domEventFired=true;
async.throwLater(e)
}}if(!globalEventFired&&!localEventFired&&!domEventFired&&name==="unhandledRejection"){CapturedTrace.formatAndLogError(reason,"Unhandled rejection ")
}};
function formatNonError(obj){var str;
if(typeof obj==="function"){str="[function "+(obj.name||"anonymous")+"]"
}else{str=obj.toString();
var ruselessToString=/\[object [a-zA-Z0-9$_]+\]/;
if(ruselessToString.test(str)){try{var newStr=JSON.stringify(obj);
str=newStr
}catch(e){}}if(str.length===0){str="(empty array)"
}}return("(<"+snip(str)+">, no stack trace)")
}function snip(str){var maxChars=41;
if(str.length<maxChars){return str
}return str.substr(0,maxChars-3)+"..."
}var shouldIgnore=function(){return false
};
var parseLineInfoRegex=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line){var matches=line.match(parseLineInfoRegex);
if(matches){return{fileName:matches[1],line:parseInt(matches[2],10)}
}}CapturedTrace.setBounds=function(firstLineError,lastLineError){if(!CapturedTrace.isSupported()){return
}var firstStackLines=firstLineError.stack.split("\n");
var lastStackLines=lastLineError.stack.split("\n");
var firstIndex=-1;
var lastIndex=-1;
var firstFileName;
var lastFileName;
for(var i=0;
i<firstStackLines.length;
++i){var result=parseLineInfo(firstStackLines[i]);
if(result){firstFileName=result.fileName;
firstIndex=result.line;
break
}}for(var i=0;
i<lastStackLines.length;
++i){var result=parseLineInfo(lastStackLines[i]);
if(result){lastFileName=result.fileName;
lastIndex=result.line;
break
}}if(firstIndex<0||lastIndex<0||!firstFileName||!lastFileName||firstFileName!==lastFileName||firstIndex>=lastIndex){return
}shouldIgnore=function(line){if(bluebirdFramePattern.test(line)){return true
}var info=parseLineInfo(line);
if(info){if(info.fileName===firstFileName&&(firstIndex<=info.line&&info.line<=lastIndex)){return true
}}return false
}
};
var captureStackTrace=(function stackDetection(){var v8stackFramePattern=/^\s*at\s*/;
var v8stackFormatter=function(stack,error){if(typeof stack==="string"){return stack
}if(error.name!==undefined&&error.message!==undefined){return error.toString()
}return formatNonError(error)
};
if(typeof Error.stackTraceLimit==="number"&&typeof Error.captureStackTrace==="function"){Error.stackTraceLimit=Error.stackTraceLimit+6;
stackFramePattern=v8stackFramePattern;
formatStack=v8stackFormatter;
var captureStackTrace=Error.captureStackTrace;
shouldIgnore=function(line){return bluebirdFramePattern.test(line)
};
return function(receiver,ignoreUntil){Error.stackTraceLimit=Error.stackTraceLimit+6;
captureStackTrace(receiver,ignoreUntil);
Error.stackTraceLimit=Error.stackTraceLimit-6
}
}var err=new Error();
if(typeof err.stack==="string"&&err.stack.split("\n")[0].indexOf("stackDetection@")>=0){stackFramePattern=/@/;
formatStack=v8stackFormatter;
indentStackFrames=true;
return function captureStackTrace(o){o.stack=new Error().stack
}
}var hasStackAfterThrow;
try{throw new Error()
}catch(e){hasStackAfterThrow=("stack" in e)
}if(!("stack" in err)&&hasStackAfterThrow){stackFramePattern=v8stackFramePattern;
formatStack=v8stackFormatter;
return function captureStackTrace(o){Error.stackTraceLimit=Error.stackTraceLimit+6;
try{throw new Error()
}catch(e){o.stack=e.stack
}Error.stackTraceLimit=Error.stackTraceLimit-6
}
}formatStack=function(stack,error){if(typeof stack==="string"){return stack
}if((typeof error==="object"||typeof error==="function")&&error.name!==undefined&&error.message!==undefined){return error.toString()
}return formatNonError(error)
};
return null
})([]);
var fireDomEvent;
var fireGlobalEvent=(function(){if(util.isNode){return function(name,reason,promise){if(name==="rejectionHandled"){return process.emit(name,promise)
}else{return process.emit(name,reason,promise)
}}
}else{var customEventWorks=false;
var anyEventWorks=true;
try{var ev=new self.CustomEvent("test");
customEventWorks=ev instanceof CustomEvent
}catch(e){}if(!customEventWorks){try{var event=document.createEvent("CustomEvent");
event.initCustomEvent("testingtheevent",false,true,{});
self.dispatchEvent(event)
}catch(e){anyEventWorks=false
}}if(anyEventWorks){fireDomEvent=function(type,detail){var event;
if(customEventWorks){event=new self.CustomEvent(type,{detail:detail,bubbles:false,cancelable:true})
}else{if(self.dispatchEvent){event=document.createEvent("CustomEvent");
event.initCustomEvent(type,false,true,detail)
}}return event?!self.dispatchEvent(event):false
}
}var toWindowMethodNameMap={};
toWindowMethodNameMap.unhandledRejection=("onunhandledRejection").toLowerCase();
toWindowMethodNameMap.rejectionHandled=("onrejectionHandled").toLowerCase();
return function(name,reason,promise){var methodName=toWindowMethodNameMap[name];
var method=self[methodName];
if(!method){return false
}if(name==="rejectionHandled"){method.call(self,promise)
}else{method.call(self,reason,promise)
}return true
}
}})();
if(typeof console!=="undefined"&&typeof console.warn!=="undefined"){warn=function(message){console.warn(message)
};
if(util.isNode&&process.stderr.isTTY){warn=function(message){process.stderr.write("\u001b[31m"+message+"\u001b[39m\n")
}
}else{if(!util.isNode&&typeof(new Error().stack)==="string"){warn=function(message){console.warn("%c"+message,"color: red")
}
}}}return CapturedTrace
}
},{"./async.js":2,"./util.js":38}],8:[function(_dereq_,module,exports){module.exports=function(NEXT_FILTER){var util=_dereq_("./util.js");
var errors=_dereq_("./errors.js");
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
var keys=_dereq_("./es5.js").keys;
var TypeError=errors.TypeError;
function CatchFilter(instances,callback,promise){this._instances=instances;
this._callback=callback;
this._promise=promise
}function safePredicate(predicate,e){var safeObject={};
var retfilter=tryCatch(predicate).call(safeObject,e);
if(retfilter===errorObj){return retfilter
}var safeKeys=keys(safeObject);
if(safeKeys.length){errorObj.e=new TypeError("Catch filter must inherit from Error or be a simple predicate function\u000a\u000a    See http://goo.gl/o84o68\u000a");
return errorObj
}return retfilter
}CatchFilter.prototype.doFilter=function(e){var cb=this._callback;
var promise=this._promise;
var boundTo=promise._boundTo;
for(var i=0,len=this._instances.length;
i<len;
++i){var item=this._instances[i];
var itemIsErrorType=item===Error||(item!=null&&item.prototype instanceof Error);
if(itemIsErrorType&&e instanceof item){var ret=tryCatch(cb).call(boundTo,e);
if(ret===errorObj){NEXT_FILTER.e=ret.e;
return NEXT_FILTER
}return ret
}else{if(typeof item==="function"&&!itemIsErrorType){var shouldHandle=safePredicate(item,e);
if(shouldHandle===errorObj){e=errorObj.e;
break
}else{if(shouldHandle){var ret=tryCatch(cb).call(boundTo,e);
if(ret===errorObj){NEXT_FILTER.e=ret.e;
return NEXT_FILTER
}return ret
}}}}}NEXT_FILTER.e=e;
return NEXT_FILTER
};
return CatchFilter
}
},{"./errors.js":13,"./es5.js":14,"./util.js":38}],9:[function(_dereq_,module,exports){module.exports=function(Promise,CapturedTrace,isDebugging){var contextStack=[];
function Context(){this._trace=new CapturedTrace(peekContext())
}Context.prototype._pushContext=function(){if(!isDebugging()){return
}if(this._trace!==undefined){contextStack.push(this._trace)
}};
Context.prototype._popContext=function(){if(!isDebugging()){return
}if(this._trace!==undefined){contextStack.pop()
}};
function createContext(){if(isDebugging()){return new Context()
}}function peekContext(){var lastIndex=contextStack.length-1;
if(lastIndex>=0){return contextStack[lastIndex]
}return undefined
}Promise.prototype._peekContext=peekContext;
Promise.prototype._pushContext=Context.prototype._pushContext;
Promise.prototype._popContext=Context.prototype._popContext;
return createContext
}
},{}],10:[function(_dereq_,module,exports){module.exports=function(Promise,CapturedTrace){var async=_dereq_("./async.js");
var Warning=_dereq_("./errors.js").Warning;
var util=_dereq_("./util.js");
var canAttachTrace=util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var debugging=false||(util.isNode&&(!!process.env.BLUEBIRD_DEBUG||process.env.NODE_ENV==="development"));
if(debugging){async.disableTrampolineIfNecessary()
}Promise.prototype._ignoreRejections=function(){this._unsetRejectionIsUnhandled();
this._bitField=this._bitField|16777216
};
Promise.prototype._ensurePossibleRejectionHandled=function(){if((this._bitField&16777216)!==0){return
}this._setRejectionIsUnhandled();
async.invokeLater(this._notifyUnhandledRejection,this,undefined)
};
Promise.prototype._notifyUnhandledRejectionIsHandled=function(){CapturedTrace.fireRejectionEvent("rejectionHandled",unhandledRejectionHandled,undefined,this)
};
Promise.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var reason=this._getCarriedStackTrace()||this._settledValue;
this._setUnhandledRejectionIsNotified();
CapturedTrace.fireRejectionEvent("unhandledRejection",possiblyUnhandledRejection,reason,this)
}};
Promise.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=this._bitField|524288
};
Promise.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=this._bitField&(~524288)
};
Promise.prototype._isUnhandledRejectionNotified=function(){return(this._bitField&524288)>0
};
Promise.prototype._setRejectionIsUnhandled=function(){this._bitField=this._bitField|2097152
};
Promise.prototype._unsetRejectionIsUnhandled=function(){this._bitField=this._bitField&(~2097152);
if(this._isUnhandledRejectionNotified()){this._unsetUnhandledRejectionIsNotified();
this._notifyUnhandledRejectionIsHandled()
}};
Promise.prototype._isRejectionUnhandled=function(){return(this._bitField&2097152)>0
};
Promise.prototype._setCarriedStackTrace=function(capturedTrace){this._bitField=this._bitField|1048576;
this._fulfillmentHandler0=capturedTrace
};
Promise.prototype._isCarryingStackTrace=function(){return(this._bitField&1048576)>0
};
Promise.prototype._getCarriedStackTrace=function(){return this._isCarryingStackTrace()?this._fulfillmentHandler0:undefined
};
Promise.prototype._captureStackTrace=function(){if(debugging){this._trace=new CapturedTrace(this._peekContext())
}return this
};
Promise.prototype._attachExtraTrace=function(error,ignoreSelf){if(debugging&&canAttachTrace(error)){var trace=this._trace;
if(trace!==undefined){if(ignoreSelf){trace=trace._parent
}}if(trace!==undefined){trace.attachExtraTrace(error)
}else{if(!error.__stackCleaned__){var parsed=CapturedTrace.parseStackAndMessage(error);
util.notEnumerableProp(error,"stack",parsed.message+"\n"+parsed.stack.join("\n"));
util.notEnumerableProp(error,"__stackCleaned__",true)
}}}};
Promise.prototype._warn=function(message){var warning=new Warning(message);
var ctx=this._peekContext();
if(ctx){ctx.attachExtraTrace(warning)
}else{var parsed=CapturedTrace.parseStackAndMessage(warning);
warning.stack=parsed.message+"\n"+parsed.stack.join("\n")
}CapturedTrace.formatAndLogError(warning,"")
};
Promise.onPossiblyUnhandledRejection=function(fn){possiblyUnhandledRejection=typeof fn==="function"?fn:undefined
};
Promise.onUnhandledRejectionHandled=function(fn){unhandledRejectionHandled=typeof fn==="function"?fn:undefined
};
Promise.longStackTraces=function(){if(async.haveItemsQueued()&&debugging===false){throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/DT1qyG\u000a")
}debugging=CapturedTrace.isSupported();
if(debugging){async.disableTrampolineIfNecessary()
}};
Promise.hasLongStackTraces=function(){return debugging&&CapturedTrace.isSupported()
};
if(!CapturedTrace.isSupported()){Promise.longStackTraces=function(){};
debugging=false
}return function(){return debugging
}
}
},{"./async.js":2,"./errors.js":13,"./util.js":38}],11:[function(_dereq_,module,exports){var util=_dereq_("./util.js");
var isPrimitive=util.isPrimitive;
var wrapsPrimitiveReceiver=util.wrapsPrimitiveReceiver;
module.exports=function(Promise){var returner=function(){return this
};
var thrower=function(){throw this
};
var returnUndefined=function(){};
var throwUndefined=function(){throw undefined
};
var wrapper=function(value,action){if(action===1){return function(){throw value
}
}else{if(action===2){return function(){return value
}
}}};
Promise.prototype["return"]=Promise.prototype.thenReturn=function(value){if(value===undefined){return this.then(returnUndefined)
}if(wrapsPrimitiveReceiver&&isPrimitive(value)){return this._then(wrapper(value,2),undefined,undefined,undefined,undefined)
}return this._then(returner,undefined,undefined,value,undefined)
};
Promise.prototype["throw"]=Promise.prototype.thenThrow=function(reason){if(reason===undefined){return this.then(throwUndefined)
}if(wrapsPrimitiveReceiver&&isPrimitive(reason)){return this._then(wrapper(reason,1),undefined,undefined,undefined,undefined)
}return this._then(thrower,undefined,undefined,reason,undefined)
}
}
},{"./util.js":38}],12:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL){var PromiseReduce=Promise.reduce;
Promise.prototype.each=function(fn){return PromiseReduce(this,fn,null,INTERNAL)
};
Promise.each=function(promises,fn){return PromiseReduce(promises,fn,null,INTERNAL)
}
}
},{}],13:[function(_dereq_,module,exports){var es5=_dereq_("./es5.js");
var Objectfreeze=es5.freeze;
var util=_dereq_("./util.js");
var inherits=util.inherits;
var notEnumerableProp=util.notEnumerableProp;
function subError(nameProperty,defaultMessage){function SubError(message){if(!(this instanceof SubError)){return new SubError(message)
}notEnumerableProp(this,"message",typeof message==="string"?message:defaultMessage);
notEnumerableProp(this,"name",nameProperty);
if(Error.captureStackTrace){Error.captureStackTrace(this,this.constructor)
}else{Error.call(this)
}}inherits(SubError,Error);
return SubError
}var _TypeError,_RangeError;
var Warning=subError("Warning","warning");
var CancellationError=subError("CancellationError","cancellation error");
var TimeoutError=subError("TimeoutError","timeout error");
var AggregateError=subError("AggregateError","aggregate error");
try{_TypeError=TypeError;
_RangeError=RangeError
}catch(e){_TypeError=subError("TypeError","type error");
_RangeError=subError("RangeError","range error")
}var methods=("join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");
for(var i=0;
i<methods.length;
++i){if(typeof Array.prototype[methods[i]]==="function"){AggregateError.prototype[methods[i]]=Array.prototype[methods[i]]
}}es5.defineProperty(AggregateError.prototype,"length",{value:0,configurable:false,writable:true,enumerable:true});
AggregateError.prototype.isOperational=true;
var level=0;
AggregateError.prototype.toString=function(){var indent=Array(level*4+1).join(" ");
var ret="\n"+indent+"AggregateError of:\n";
level++;
indent=Array(level*4+1).join(" ");
for(var i=0;
i<this.length;
++i){var str=this[i]===this?"[Circular AggregateError]":this[i]+"";
var lines=str.split("\n");
for(var j=0;
j<lines.length;
++j){lines[j]=indent+lines[j]
}str=lines.join("\n");
ret+=str+"\n"
}level--;
return ret
};
function OperationalError(message){if(!(this instanceof OperationalError)){return new OperationalError(message)
}notEnumerableProp(this,"name","OperationalError");
notEnumerableProp(this,"message",message);
this.cause=message;
this["isOperational"]=true;
if(message instanceof Error){notEnumerableProp(this,"message",message.message);
notEnumerableProp(this,"stack",message.stack)
}else{if(Error.captureStackTrace){Error.captureStackTrace(this,this.constructor)
}}}inherits(OperationalError,Error);
var errorTypes=Error.__BluebirdErrorTypes__;
if(!errorTypes){errorTypes=Objectfreeze({CancellationError:CancellationError,TimeoutError:TimeoutError,OperationalError:OperationalError,RejectionError:OperationalError,AggregateError:AggregateError});
notEnumerableProp(Error,"__BluebirdErrorTypes__",errorTypes)
}module.exports={Error:Error,TypeError:_TypeError,RangeError:_RangeError,CancellationError:errorTypes.CancellationError,OperationalError:errorTypes.OperationalError,TimeoutError:errorTypes.TimeoutError,AggregateError:errorTypes.AggregateError,Warning:Warning}
},{"./es5.js":14,"./util.js":38}],14:[function(_dereq_,module,exports){var isES5=(function(){return this===undefined
})();
if(isES5){module.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:isES5,propertyIsWritable:function(obj,prop){var descriptor=Object.getOwnPropertyDescriptor(obj,prop);
return !!(!descriptor||descriptor.writable||descriptor.set)
}}
}else{var has={}.hasOwnProperty;
var str={}.toString;
var proto={}.constructor.prototype;
var ObjectKeys=function(o){var ret=[];
for(var key in o){if(has.call(o,key)){ret.push(key)
}}return ret
};
var ObjectGetDescriptor=function(o,key){return{value:o[key]}
};
var ObjectDefineProperty=function(o,key,desc){o[key]=desc.value;
return o
};
var ObjectFreeze=function(obj){return obj
};
var ObjectGetPrototypeOf=function(obj){try{return Object(obj).constructor.prototype
}catch(e){return proto
}};
var ArrayIsArray=function(obj){try{return str.call(obj)==="[object Array]"
}catch(e){return false
}};
module.exports={isArray:ArrayIsArray,keys:ObjectKeys,names:ObjectKeys,defineProperty:ObjectDefineProperty,getDescriptor:ObjectGetDescriptor,freeze:ObjectFreeze,getPrototypeOf:ObjectGetPrototypeOf,isES5:isES5,propertyIsWritable:function(){return true
}}
}},{}],15:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL){var PromiseMap=Promise.map;
Promise.prototype.filter=function(fn,options){return PromiseMap(this,fn,options,INTERNAL)
};
Promise.filter=function(promises,fn,options){return PromiseMap(promises,fn,options,INTERNAL)
}
}
},{}],16:[function(_dereq_,module,exports){module.exports=function(Promise,NEXT_FILTER,tryConvertToPromise){var util=_dereq_("./util.js");
var wrapsPrimitiveReceiver=util.wrapsPrimitiveReceiver;
var isPrimitive=util.isPrimitive;
var thrower=util.thrower;
function returnThis(){return this
}function throwThis(){throw this
}function return$(r){return function(){return r
}
}function throw$(r){return function(){throw r
}
}function promisedFinally(ret,reasonOrValue,isFulfilled){var then;
if(wrapsPrimitiveReceiver&&isPrimitive(reasonOrValue)){then=isFulfilled?return$(reasonOrValue):throw$(reasonOrValue)
}else{then=isFulfilled?returnThis:throwThis
}return ret._then(then,thrower,undefined,reasonOrValue,undefined)
}function finallyHandler(reasonOrValue){var promise=this.promise;
var handler=this.handler;
var ret=promise._isBound()?handler.call(promise._boundTo):handler();
if(ret!==undefined){var maybePromise=tryConvertToPromise(ret,promise);
if(maybePromise instanceof Promise){maybePromise=maybePromise._target();
return promisedFinally(maybePromise,reasonOrValue,promise.isFulfilled())
}}if(promise.isRejected()){NEXT_FILTER.e=reasonOrValue;
return NEXT_FILTER
}else{return reasonOrValue
}}function tapHandler(value){var promise=this.promise;
var handler=this.handler;
var ret=promise._isBound()?handler.call(promise._boundTo,value):handler(value);
if(ret!==undefined){var maybePromise=tryConvertToPromise(ret,promise);
if(maybePromise instanceof Promise){maybePromise=maybePromise._target();
return promisedFinally(maybePromise,value,true)
}}return value
}Promise.prototype._passThroughHandler=function(handler,isFinally){if(typeof handler!=="function"){return this.then()
}var promiseAndHandler={promise:this,handler:handler};
return this._then(isFinally?finallyHandler:tapHandler,isFinally?finallyHandler:undefined,undefined,promiseAndHandler,undefined)
};
Promise.prototype.lastly=Promise.prototype["finally"]=function(handler){return this._passThroughHandler(handler,true)
};
Promise.prototype.tap=function(handler){return this._passThroughHandler(handler,false)
}
}
},{"./util.js":38}],17:[function(_dereq_,module,exports){module.exports=function(Promise,apiRejection,INTERNAL,tryConvertToPromise){var errors=_dereq_("./errors.js");
var TypeError=errors.TypeError;
var util=_dereq_("./util.js");
var errorObj=util.errorObj;
var tryCatch=util.tryCatch;
var yieldHandlers=[];
function promiseFromYieldHandler(value,yieldHandlers,traceParent){for(var i=0;
i<yieldHandlers.length;
++i){traceParent._pushContext();
var result=tryCatch(yieldHandlers[i])(value);
traceParent._popContext();
if(result===errorObj){traceParent._pushContext();
var ret=Promise.reject(errorObj.e);
traceParent._popContext();
return ret
}var maybePromise=tryConvertToPromise(result,traceParent);
if(maybePromise instanceof Promise){return maybePromise
}}return null
}function PromiseSpawn(generatorFunction,receiver,yieldHandler,stack){var promise=this._promise=new Promise(INTERNAL);
promise._captureStackTrace();
this._stack=stack;
this._generatorFunction=generatorFunction;
this._receiver=receiver;
this._generator=undefined;
this._yieldHandlers=typeof yieldHandler==="function"?[yieldHandler].concat(yieldHandlers):yieldHandlers
}PromiseSpawn.prototype.promise=function(){return this._promise
};
PromiseSpawn.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver);
this._receiver=this._generatorFunction=undefined;
this._next(undefined)
};
PromiseSpawn.prototype._continue=function(result){if(result===errorObj){return this._promise._rejectCallback(result.e,false,true)
}var value=result.value;
if(result.done===true){this._promise._resolveCallback(value)
}else{var maybePromise=tryConvertToPromise(value,this._promise);
if(!(maybePromise instanceof Promise)){maybePromise=promiseFromYieldHandler(maybePromise,this._yieldHandlers,this._promise);
if(maybePromise===null){this._throw(new TypeError("A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/4Y4pDk\u000a\u000a".replace("%s",value)+"From coroutine:\u000a"+this._stack.split("\n").slice(1,-7).join("\n")));
return
}}maybePromise._then(this._next,this._throw,undefined,this,null)
}};
PromiseSpawn.prototype._throw=function(reason){this._promise._attachExtraTrace(reason);
this._promise._pushContext();
var result=tryCatch(this._generator["throw"]).call(this._generator,reason);
this._promise._popContext();
this._continue(result)
};
PromiseSpawn.prototype._next=function(value){this._promise._pushContext();
var result=tryCatch(this._generator.next).call(this._generator,value);
this._promise._popContext();
this._continue(result)
};
Promise.coroutine=function(generatorFunction,options){if(typeof generatorFunction!=="function"){throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/6Vqhm0\u000a")
}var yieldHandler=Object(options).yieldHandler;
var PromiseSpawn$=PromiseSpawn;
var stack=new Error().stack;
return function(){var generator=generatorFunction.apply(this,arguments);
var spawn=new PromiseSpawn$(undefined,undefined,yieldHandler,stack);
spawn._generator=generator;
spawn._next(undefined);
return spawn.promise()
}
};
Promise.coroutine.addYieldHandler=function(fn){if(typeof fn!=="function"){throw new TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}yieldHandlers.push(fn)
};
Promise.spawn=function(generatorFunction){if(typeof generatorFunction!=="function"){return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/6Vqhm0\u000a")
}var spawn=new PromiseSpawn(generatorFunction,this);
var ret=spawn.promise();
spawn._run(Promise.spawn);
return ret
}
}
},{"./errors.js":13,"./util.js":38}],18:[function(_dereq_,module,exports){module.exports=function(Promise,PromiseArray,tryConvertToPromise,INTERNAL){var util=_dereq_("./util.js");
var canEvaluate=util.canEvaluate;
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
var reject;
if(!true){if(canEvaluate){var thenCallback=function(i){return new Function("value","holder","                             \n            'use strict';                                                    \n            holder.pIndex = value;                                           \n            holder.checkFulfillment(this);                                   \n            ".replace(/Index/g,i))
};
var caller=function(count){var values=[];
for(var i=1;
i<=count;
++i){values.push("holder.p"+i)
}return new Function("holder","                                      \n            'use strict';                                                    \n            var callback = holder.fn;                                        \n            return callback(values);                                         \n            ".replace(/values/g,values.join(", ")))
};
var thenCallbacks=[];
var callers=[undefined];
for(var i=1;
i<=5;
++i){thenCallbacks.push(thenCallback(i));
callers.push(caller(i))
}var Holder=function(total,fn){this.p1=this.p2=this.p3=this.p4=this.p5=null;
this.fn=fn;
this.total=total;
this.now=0
};
Holder.prototype.callers=callers;
Holder.prototype.checkFulfillment=function(promise){var now=this.now;
now++;
var total=this.total;
if(now>=total){var handler=this.callers[total];
promise._pushContext();
var ret=tryCatch(handler)(this);
promise._popContext();
if(ret===errorObj){promise._rejectCallback(ret.e,false,true)
}else{promise._resolveCallback(ret)
}}else{this.now=now
}};
var reject=function(reason){this._reject(reason)
}
}}Promise.join=function(){var last=arguments.length-1;
var fn;
if(last>0&&typeof arguments[last]==="function"){fn=arguments[last];
if(!true){if(last<6&&canEvaluate){var ret=new Promise(INTERNAL);
ret._captureStackTrace();
var holder=new Holder(last,fn);
var callbacks=thenCallbacks;
for(var i=0;
i<last;
++i){var maybePromise=tryConvertToPromise(arguments[i],ret);
if(maybePromise instanceof Promise){maybePromise=maybePromise._target();
if(maybePromise._isPending()){maybePromise._then(callbacks[i],reject,undefined,ret,holder)
}else{if(maybePromise._isFulfilled()){callbacks[i].call(ret,maybePromise._value(),holder)
}else{ret._reject(maybePromise._reason())
}}}else{callbacks[i].call(ret,maybePromise,holder)
}}return ret
}}}var $_len=arguments.length;
var args=new Array($_len);
for(var $_i=0;
$_i<$_len;
++$_i){args[$_i]=arguments[$_i]
}if(fn){args.pop()
}var ret=new PromiseArray(args).promise();
return fn!==undefined?ret.spread(fn):ret
}
}
},{"./util.js":38}],19:[function(_dereq_,module,exports){module.exports=function(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL){var async=_dereq_("./async.js");
var util=_dereq_("./util.js");
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
var PENDING={};
var EMPTY_ARRAY=[];
function MappingPromiseArray(promises,fn,limit,_filter){this.constructor$(promises);
this._promise._captureStackTrace();
this._callback=fn;
this._preservedValues=_filter===INTERNAL?new Array(this.length()):null;
this._limit=limit;
this._inFlight=0;
this._queue=limit>=1?[]:EMPTY_ARRAY;
async.invoke(init,this,undefined)
}util.inherits(MappingPromiseArray,PromiseArray);
function init(){this._init$(undefined,-2)
}MappingPromiseArray.prototype._init=function(){};
MappingPromiseArray.prototype._promiseFulfilled=function(value,index){var values=this._values;
var length=this.length();
var preservedValues=this._preservedValues;
var limit=this._limit;
if(values[index]===PENDING){values[index]=value;
if(limit>=1){this._inFlight--;
this._drainQueue();
if(this._isResolved()){return
}}}else{if(limit>=1&&this._inFlight>=limit){values[index]=value;
this._queue.push(index);
return
}if(preservedValues!==null){preservedValues[index]=value
}var callback=this._callback;
var receiver=this._promise._boundTo;
this._promise._pushContext();
var ret=tryCatch(callback).call(receiver,value,index,length);
this._promise._popContext();
if(ret===errorObj){return this._reject(ret.e)
}var maybePromise=tryConvertToPromise(ret,this._promise);
if(maybePromise instanceof Promise){maybePromise=maybePromise._target();
if(maybePromise._isPending()){if(limit>=1){this._inFlight++
}values[index]=PENDING;
return maybePromise._proxyPromiseArray(this,index)
}else{if(maybePromise._isFulfilled()){ret=maybePromise._value()
}else{return this._reject(maybePromise._reason())
}}}values[index]=ret
}var totalResolved=++this._totalResolved;
if(totalResolved>=length){if(preservedValues!==null){this._filter(values,preservedValues)
}else{this._resolve(values)
}}};
MappingPromiseArray.prototype._drainQueue=function(){var queue=this._queue;
var limit=this._limit;
var values=this._values;
while(queue.length>0&&this._inFlight<limit){if(this._isResolved()){return
}var index=queue.pop();
this._promiseFulfilled(values[index],index)
}};
MappingPromiseArray.prototype._filter=function(booleans,values){var len=values.length;
var ret=new Array(len);
var j=0;
for(var i=0;
i<len;
++i){if(booleans[i]){ret[j++]=values[i]
}}ret.length=j;
this._resolve(ret)
};
MappingPromiseArray.prototype.preservedValues=function(){return this._preservedValues
};
function map(promises,fn,options,_filter){var limit=typeof options==="object"&&options!==null?options.concurrency:0;
limit=typeof limit==="number"&&isFinite(limit)&&limit>=1?limit:0;
return new MappingPromiseArray(promises,fn,limit,_filter)
}Promise.prototype.map=function(fn,options){if(typeof fn!=="function"){return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}return map(this,fn,options,null).promise()
};
Promise.map=function(promises,fn,options,_filter){if(typeof fn!=="function"){return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}return map(promises,fn,options,_filter).promise()
}
}
},{"./async.js":2,"./util.js":38}],20:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection){var util=_dereq_("./util.js");
var tryCatch=util.tryCatch;
Promise.method=function(fn){if(typeof fn!=="function"){throw new Promise.TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}return function(){var ret=new Promise(INTERNAL);
ret._captureStackTrace();
ret._pushContext();
var value=tryCatch(fn).apply(this,arguments);
ret._popContext();
ret._resolveFromSyncValue(value);
return ret
}
};
Promise.attempt=Promise["try"]=function(fn,args,ctx){if(typeof fn!=="function"){return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}var ret=new Promise(INTERNAL);
ret._captureStackTrace();
ret._pushContext();
var value=util.isArray(args)?tryCatch(fn).apply(ctx,args):tryCatch(fn).call(ctx,args);
ret._popContext();
ret._resolveFromSyncValue(value);
return ret
};
Promise.prototype._resolveFromSyncValue=function(value){if(value===util.errorObj){this._rejectCallback(value.e,false,true)
}else{this._resolveCallback(value,true)
}}
}
},{"./util.js":38}],21:[function(_dereq_,module,exports){module.exports=function(Promise){var util=_dereq_("./util.js");
var async=_dereq_("./async.js");
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
function spreadAdapter(val,nodeback){var promise=this;
if(!util.isArray(val)){return successAdapter.call(promise,val,nodeback)
}var ret=tryCatch(nodeback).apply(promise._boundTo,[null].concat(val));
if(ret===errorObj){async.throwLater(ret.e)
}}function successAdapter(val,nodeback){var promise=this;
var receiver=promise._boundTo;
var ret=val===undefined?tryCatch(nodeback).call(receiver,null):tryCatch(nodeback).call(receiver,null,val);
if(ret===errorObj){async.throwLater(ret.e)
}}function errorAdapter(reason,nodeback){var promise=this;
if(!reason){var target=promise._target();
var newReason=target._getCarriedStackTrace();
newReason.cause=reason;
reason=newReason
}var ret=tryCatch(nodeback).call(promise._boundTo,reason);
if(ret===errorObj){async.throwLater(ret.e)
}}Promise.prototype.asCallback=Promise.prototype.nodeify=function(nodeback,options){if(typeof nodeback=="function"){var adapter=successAdapter;
if(options!==undefined&&Object(options).spread){adapter=spreadAdapter
}this._then(adapter,errorAdapter,undefined,this,nodeback)
}return this
}
}
},{"./async.js":2,"./util.js":38}],22:[function(_dereq_,module,exports){module.exports=function(Promise,PromiseArray){var util=_dereq_("./util.js");
var async=_dereq_("./async.js");
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
Promise.prototype.progressed=function(handler){return this._then(undefined,undefined,handler,undefined,undefined)
};
Promise.prototype._progress=function(progressValue){if(this._isFollowingOrFulfilledOrRejected()){return
}this._target()._progressUnchecked(progressValue)
};
Promise.prototype._progressHandlerAt=function(index){return index===0?this._progressHandler0:this[(index<<2)+index-5+2]
};
Promise.prototype._doProgressWith=function(progression){var progressValue=progression.value;
var handler=progression.handler;
var promise=progression.promise;
var receiver=progression.receiver;
var ret=tryCatch(handler).call(receiver,progressValue);
if(ret===errorObj){if(ret.e!=null&&ret.e.name!=="StopProgressPropagation"){var trace=util.canAttachTrace(ret.e)?ret.e:new Error(util.toString(ret.e));
promise._attachExtraTrace(trace);
promise._progress(ret.e)
}}else{if(ret instanceof Promise){ret._then(promise._progress,null,null,promise,undefined)
}else{promise._progress(ret)
}}};
Promise.prototype._progressUnchecked=function(progressValue){var len=this._length();
var progress=this._progress;
for(var i=0;
i<len;
i++){var handler=this._progressHandlerAt(i);
var promise=this._promiseAt(i);
if(!(promise instanceof Promise)){var receiver=this._receiverAt(i);
if(typeof handler==="function"){handler.call(receiver,progressValue,promise)
}else{if(receiver instanceof PromiseArray&&!receiver._isResolved()){receiver._promiseProgressed(progressValue,promise)
}}continue
}if(typeof handler==="function"){async.invoke(this._doProgressWith,this,{handler:handler,promise:promise,receiver:this._receiverAt(i),value:progressValue})
}else{async.invoke(progress,promise,progressValue)
}}}
}
},{"./async.js":2,"./util.js":38}],23:[function(_dereq_,module,exports){module.exports=function(){var makeSelfResolutionError=function(){return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/LhFpo0\u000a")
};
var reflect=function(){return new Promise.PromiseInspection(this._target())
};
var apiRejection=function(msg){return Promise.reject(new TypeError(msg))
};
var util=_dereq_("./util.js");
var async=_dereq_("./async.js");
var errors=_dereq_("./errors.js");
var TypeError=Promise.TypeError=errors.TypeError;
Promise.RangeError=errors.RangeError;
Promise.CancellationError=errors.CancellationError;
Promise.TimeoutError=errors.TimeoutError;
Promise.OperationalError=errors.OperationalError;
Promise.RejectionError=errors.OperationalError;
Promise.AggregateError=errors.AggregateError;
var INTERNAL=function(){};
var APPLY={};
var NEXT_FILTER={e:null};
var tryConvertToPromise=_dereq_("./thenables.js")(Promise,INTERNAL);
var PromiseArray=_dereq_("./promise_array.js")(Promise,INTERNAL,tryConvertToPromise,apiRejection);
var CapturedTrace=_dereq_("./captured_trace.js")();
var isDebugging=_dereq_("./debuggability.js")(Promise,CapturedTrace);
var createContext=_dereq_("./context.js")(Promise,CapturedTrace,isDebugging);
var CatchFilter=_dereq_("./catch_filter.js")(NEXT_FILTER);
var PromiseResolver=_dereq_("./promise_resolver.js");
var nodebackForPromise=PromiseResolver._nodebackForPromise;
var errorObj=util.errorObj;
var tryCatch=util.tryCatch;
function Promise(resolver){if(typeof resolver!=="function"){throw new TypeError("the promise constructor requires a resolver function\u000a\u000a    See http://goo.gl/EC22Yn\u000a")
}if(this.constructor!==Promise){throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/KsIlge\u000a")
}this._bitField=0;
this._fulfillmentHandler0=undefined;
this._rejectionHandler0=undefined;
this._progressHandler0=undefined;
this._promise0=undefined;
this._receiver0=undefined;
this._settledValue=undefined;
if(resolver!==INTERNAL){this._resolveFromResolver(resolver)
}}Promise.prototype.toString=function(){return"[object Promise]"
};
Promise.prototype.caught=Promise.prototype["catch"]=function(fn){var len=arguments.length;
if(len>1){var catchInstances=new Array(len-1),j=0,i;
for(i=0;
i<len-1;
++i){var item=arguments[i];
if(typeof item==="function"){catchInstances[j++]=item
}else{return Promise.reject(new TypeError("Catch filter must inherit from Error or be a simple predicate function\u000a\u000a    See http://goo.gl/o84o68\u000a"))
}}catchInstances.length=j;
fn=arguments[i];
var catchFilter=new CatchFilter(catchInstances,fn,this);
return this._then(undefined,catchFilter.doFilter,undefined,catchFilter,undefined)
}return this._then(undefined,fn,undefined,undefined,undefined)
};
Promise.prototype.reflect=function(){return this._then(reflect,reflect,undefined,this,undefined)
};
Promise.prototype.then=function(didFulfill,didReject,didProgress){if(isDebugging()&&arguments.length>0&&typeof didFulfill!=="function"&&typeof didReject!=="function"){var msg=".then() only accepts functions but was passed: "+util.classString(didFulfill);
if(arguments.length>1){msg+=", "+util.classString(didReject)
}this._warn(msg)
}return this._then(didFulfill,didReject,didProgress,undefined,undefined)
};
Promise.prototype.done=function(didFulfill,didReject,didProgress){var promise=this._then(didFulfill,didReject,didProgress,undefined,undefined);
promise._setIsFinal()
};
Promise.prototype.spread=function(didFulfill,didReject){return this.all()._then(didFulfill,didReject,undefined,APPLY,undefined)
};
Promise.prototype.isCancellable=function(){return !this.isResolved()&&this._cancellable()
};
Promise.prototype.toJSON=function(){var ret={isFulfilled:false,isRejected:false,fulfillmentValue:undefined,rejectionReason:undefined};
if(this.isFulfilled()){ret.fulfillmentValue=this.value();
ret.isFulfilled=true
}else{if(this.isRejected()){ret.rejectionReason=this.reason();
ret.isRejected=true
}}return ret
};
Promise.prototype.all=function(){return new PromiseArray(this).promise()
};
Promise.prototype.error=function(fn){return this.caught(util.originatesFromRejection,fn)
};
Promise.is=function(val){return val instanceof Promise
};
Promise.fromNode=function(fn){var ret=new Promise(INTERNAL);
var result=tryCatch(fn)(nodebackForPromise(ret));
if(result===errorObj){ret._rejectCallback(result.e,true,true)
}return ret
};
Promise.all=function(promises){return new PromiseArray(promises).promise()
};
Promise.defer=Promise.pending=function(){var promise=new Promise(INTERNAL);
return new PromiseResolver(promise)
};
Promise.cast=function(obj){var ret=tryConvertToPromise(obj);
if(!(ret instanceof Promise)){var val=ret;
ret=new Promise(INTERNAL);
ret._fulfillUnchecked(val)
}return ret
};
Promise.resolve=Promise.fulfilled=Promise.cast;
Promise.reject=Promise.rejected=function(reason){var ret=new Promise(INTERNAL);
ret._captureStackTrace();
ret._rejectCallback(reason,true);
return ret
};
Promise.setScheduler=function(fn){if(typeof fn!=="function"){throw new TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}var prev=async._schedule;
async._schedule=fn;
return prev
};
Promise.prototype._then=function(didFulfill,didReject,didProgress,receiver,internalData){var haveInternalData=internalData!==undefined;
var ret=haveInternalData?internalData:new Promise(INTERNAL);
if(!haveInternalData){ret._propagateFrom(this,4|1);
ret._captureStackTrace()
}var target=this._target();
if(target!==this){if(receiver===undefined){receiver=this._boundTo
}if(!haveInternalData){ret._setIsMigrated()
}}var callbackIndex=target._addCallbacks(didFulfill,didReject,didProgress,ret,receiver);
if(target._isResolved()&&!target._isSettlePromisesQueued()){async.invoke(target._settlePromiseAtPostResolution,target,callbackIndex)
}return ret
};
Promise.prototype._settlePromiseAtPostResolution=function(index){if(this._isRejectionUnhandled()){this._unsetRejectionIsUnhandled()
}this._settlePromiseAt(index)
};
Promise.prototype._length=function(){return this._bitField&131071
};
Promise.prototype._isFollowingOrFulfilledOrRejected=function(){return(this._bitField&939524096)>0
};
Promise.prototype._isFollowing=function(){return(this._bitField&536870912)===536870912
};
Promise.prototype._setLength=function(len){this._bitField=(this._bitField&-131072)|(len&131071)
};
Promise.prototype._setFulfilled=function(){this._bitField=this._bitField|268435456
};
Promise.prototype._setRejected=function(){this._bitField=this._bitField|134217728
};
Promise.prototype._setFollowing=function(){this._bitField=this._bitField|536870912
};
Promise.prototype._setIsFinal=function(){this._bitField=this._bitField|33554432
};
Promise.prototype._isFinal=function(){return(this._bitField&33554432)>0
};
Promise.prototype._cancellable=function(){return(this._bitField&67108864)>0
};
Promise.prototype._setCancellable=function(){this._bitField=this._bitField|67108864
};
Promise.prototype._unsetCancellable=function(){this._bitField=this._bitField&(~67108864)
};
Promise.prototype._setIsMigrated=function(){this._bitField=this._bitField|4194304
};
Promise.prototype._unsetIsMigrated=function(){this._bitField=this._bitField&(~4194304)
};
Promise.prototype._isMigrated=function(){return(this._bitField&4194304)>0
};
Promise.prototype._receiverAt=function(index){var ret=index===0?this._receiver0:this[index*5-5+4];
if(ret===undefined&&this._isBound()){return this._boundTo
}return ret
};
Promise.prototype._promiseAt=function(index){return index===0?this._promise0:this[index*5-5+3]
};
Promise.prototype._fulfillmentHandlerAt=function(index){return index===0?this._fulfillmentHandler0:this[index*5-5+0]
};
Promise.prototype._rejectionHandlerAt=function(index){return index===0?this._rejectionHandler0:this[index*5-5+1]
};
Promise.prototype._migrateCallbacks=function(follower,index){var fulfill=follower._fulfillmentHandlerAt(index);
var reject=follower._rejectionHandlerAt(index);
var progress=follower._progressHandlerAt(index);
var promise=follower._promiseAt(index);
var receiver=follower._receiverAt(index);
if(promise instanceof Promise){promise._setIsMigrated()
}this._addCallbacks(fulfill,reject,progress,promise,receiver)
};
Promise.prototype._addCallbacks=function(fulfill,reject,progress,promise,receiver){var index=this._length();
if(index>=131071-5){index=0;
this._setLength(0)
}if(index===0){this._promise0=promise;
if(receiver!==undefined){this._receiver0=receiver
}if(typeof fulfill==="function"&&!this._isCarryingStackTrace()){this._fulfillmentHandler0=fulfill
}if(typeof reject==="function"){this._rejectionHandler0=reject
}if(typeof progress==="function"){this._progressHandler0=progress
}}else{var base=index*5-5;
this[base+3]=promise;
this[base+4]=receiver;
if(typeof fulfill==="function"){this[base+0]=fulfill
}if(typeof reject==="function"){this[base+1]=reject
}if(typeof progress==="function"){this[base+2]=progress
}}this._setLength(index+1);
return index
};
Promise.prototype._setProxyHandlers=function(receiver,promiseSlotValue){var index=this._length();
if(index>=131071-5){index=0;
this._setLength(0)
}if(index===0){this._promise0=promiseSlotValue;
this._receiver0=receiver
}else{var base=index*5-5;
this[base+3]=promiseSlotValue;
this[base+4]=receiver
}this._setLength(index+1)
};
Promise.prototype._proxyPromiseArray=function(promiseArray,index){this._setProxyHandlers(promiseArray,index)
};
Promise.prototype._resolveCallback=function(value,shouldBind){if(this._isFollowingOrFulfilledOrRejected()){return
}if(value===this){return this._rejectCallback(makeSelfResolutionError(),false,true)
}var maybePromise=tryConvertToPromise(value,this);
if(!(maybePromise instanceof Promise)){return this._fulfill(value)
}var propagationFlags=1|(shouldBind?4:0);
this._propagateFrom(maybePromise,propagationFlags);
var promise=maybePromise._target();
if(promise._isPending()){var len=this._length();
for(var i=0;
i<len;
++i){promise._migrateCallbacks(this,i)
}this._setFollowing();
this._setLength(0);
this._setFollowee(promise)
}else{if(promise._isFulfilled()){this._fulfillUnchecked(promise._value())
}else{this._rejectUnchecked(promise._reason(),promise._getCarriedStackTrace())
}}};
Promise.prototype._rejectCallback=function(reason,synchronous,shouldNotMarkOriginatingFromRejection){if(!shouldNotMarkOriginatingFromRejection){util.markAsOriginatingFromRejection(reason)
}var trace=util.ensureErrorObject(reason);
var hasStack=trace===reason;
this._attachExtraTrace(trace,synchronous?hasStack:false);
this._reject(reason,hasStack?undefined:trace)
};
Promise.prototype._resolveFromResolver=function(resolver){var promise=this;
this._captureStackTrace();
this._pushContext();
var synchronous=true;
var r=tryCatch(resolver)(function(value){if(promise===null){return
}promise._resolveCallback(value);
promise=null
},function(reason){if(promise===null){return
}promise._rejectCallback(reason,synchronous);
promise=null
});
synchronous=false;
this._popContext();
if(r!==undefined&&r===errorObj&&promise!==null){promise._rejectCallback(r.e,true,true);
promise=null
}};
Promise.prototype._settlePromiseFromHandler=function(handler,receiver,value,promise){if(promise._isRejected()){return
}promise._pushContext();
var x;
if(receiver===APPLY&&!this._isRejected()){x=tryCatch(handler).apply(this._boundTo,value)
}else{x=tryCatch(handler).call(receiver,value)
}promise._popContext();
if(x===errorObj||x===promise||x===NEXT_FILTER){var err=x===promise?makeSelfResolutionError():x.e;
promise._rejectCallback(err,false,true)
}else{promise._resolveCallback(x)
}};
Promise.prototype._target=function(){var ret=this;
while(ret._isFollowing()){ret=ret._followee()
}return ret
};
Promise.prototype._followee=function(){return this._rejectionHandler0
};
Promise.prototype._setFollowee=function(promise){this._rejectionHandler0=promise
};
Promise.prototype._cleanValues=function(){if(this._cancellable()){this._cancellationParent=undefined
}};
Promise.prototype._propagateFrom=function(parent,flags){if((flags&1)>0&&parent._cancellable()){this._setCancellable();
this._cancellationParent=parent
}if((flags&4)>0&&parent._isBound()){this._setBoundTo(parent._boundTo)
}};
Promise.prototype._fulfill=function(value){if(this._isFollowingOrFulfilledOrRejected()){return
}this._fulfillUnchecked(value)
};
Promise.prototype._reject=function(reason,carriedStackTrace){if(this._isFollowingOrFulfilledOrRejected()){return
}this._rejectUnchecked(reason,carriedStackTrace)
};
Promise.prototype._settlePromiseAt=function(index){var promise=this._promiseAt(index);
var isPromise=promise instanceof Promise;
if(isPromise&&promise._isMigrated()){promise._unsetIsMigrated();
return async.invoke(this._settlePromiseAt,this,index)
}var handler=this._isFulfilled()?this._fulfillmentHandlerAt(index):this._rejectionHandlerAt(index);
var carriedStackTrace=this._isCarryingStackTrace()?this._getCarriedStackTrace():undefined;
var value=this._settledValue;
var receiver=this._receiverAt(index);
this._clearCallbackDataAtIndex(index);
if(typeof handler==="function"){if(!isPromise){handler.call(receiver,value,promise)
}else{this._settlePromiseFromHandler(handler,receiver,value,promise)
}}else{if(receiver instanceof PromiseArray){if(!receiver._isResolved()){if(this._isFulfilled()){receiver._promiseFulfilled(value,promise)
}else{receiver._promiseRejected(value,promise)
}}}else{if(isPromise){if(this._isFulfilled()){promise._fulfill(value)
}else{promise._reject(value,carriedStackTrace)
}}}}if(index>=4&&(index&31)===4){async.invokeLater(this._setLength,this,0)
}};
Promise.prototype._clearCallbackDataAtIndex=function(index){if(index===0){if(!this._isCarryingStackTrace()){this._fulfillmentHandler0=undefined
}this._rejectionHandler0=this._progressHandler0=this._receiver0=this._promise0=undefined
}else{var base=index*5-5;
this[base+3]=this[base+4]=this[base+0]=this[base+1]=this[base+2]=undefined
}};
Promise.prototype._isSettlePromisesQueued=function(){return(this._bitField&-1073741824)===-1073741824
};
Promise.prototype._setSettlePromisesQueued=function(){this._bitField=this._bitField|-1073741824
};
Promise.prototype._unsetSettlePromisesQueued=function(){this._bitField=this._bitField&(~-1073741824)
};
Promise.prototype._queueSettlePromises=function(){async.settlePromises(this);
this._setSettlePromisesQueued()
};
Promise.prototype._fulfillUnchecked=function(value){if(value===this){var err=makeSelfResolutionError();
this._attachExtraTrace(err);
return this._rejectUnchecked(err,undefined)
}this._setFulfilled();
this._settledValue=value;
this._cleanValues();
if(this._length()>0){this._queueSettlePromises()
}};
Promise.prototype._rejectUncheckedCheckError=function(reason){var trace=util.ensureErrorObject(reason);
this._rejectUnchecked(reason,trace===reason?undefined:trace)
};
Promise.prototype._rejectUnchecked=function(reason,trace){if(reason===this){var err=makeSelfResolutionError();
this._attachExtraTrace(err);
return this._rejectUnchecked(err)
}this._setRejected();
this._settledValue=reason;
this._cleanValues();
if(this._isFinal()){async.throwLater(function(e){if("stack" in e){async.invokeFirst(CapturedTrace.unhandledRejection,undefined,e)
}throw e
},trace===undefined?reason:trace);
return
}if(trace!==undefined&&trace!==reason){this._setCarriedStackTrace(trace)
}if(this._length()>0){this._queueSettlePromises()
}else{this._ensurePossibleRejectionHandled()
}};
Promise.prototype._settlePromises=function(){this._unsetSettlePromisesQueued();
var len=this._length();
for(var i=0;
i<len;
i++){this._settlePromiseAt(i)
}};
Promise._makeSelfResolutionError=makeSelfResolutionError;
_dereq_("./progress.js")(Promise,PromiseArray);
_dereq_("./method.js")(Promise,INTERNAL,tryConvertToPromise,apiRejection);
_dereq_("./bind.js")(Promise,INTERNAL,tryConvertToPromise);
_dereq_("./finally.js")(Promise,NEXT_FILTER,tryConvertToPromise);
_dereq_("./direct_resolve.js")(Promise);
_dereq_("./synchronous_inspection.js")(Promise);
_dereq_("./join.js")(Promise,PromiseArray,tryConvertToPromise,INTERNAL);
Promise.Promise=Promise;
_dereq_("./map.js")(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL);
_dereq_("./cancel.js")(Promise);
_dereq_("./using.js")(Promise,apiRejection,tryConvertToPromise,createContext);
_dereq_("./generators.js")(Promise,apiRejection,INTERNAL,tryConvertToPromise);
_dereq_("./nodeify.js")(Promise);
_dereq_("./call_get.js")(Promise);
_dereq_("./props.js")(Promise,PromiseArray,tryConvertToPromise,apiRejection);
_dereq_("./race.js")(Promise,INTERNAL,tryConvertToPromise,apiRejection);
_dereq_("./reduce.js")(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL);
_dereq_("./settle.js")(Promise,PromiseArray);
_dereq_("./some.js")(Promise,PromiseArray,apiRejection);
_dereq_("./promisify.js")(Promise,INTERNAL);
_dereq_("./any.js")(Promise);
_dereq_("./each.js")(Promise,INTERNAL);
_dereq_("./timers.js")(Promise,INTERNAL);
_dereq_("./filter.js")(Promise,INTERNAL);
util.toFastProperties(Promise);
util.toFastProperties(Promise.prototype);
function fillTypes(value){var p=new Promise(INTERNAL);
p._fulfillmentHandler0=value;
p._rejectionHandler0=value;
p._progressHandler0=value;
p._promise0=value;
p._receiver0=value;
p._settledValue=value
}fillTypes({a:1});
fillTypes({b:2});
fillTypes({c:3});
fillTypes(1);
fillTypes(function(){});
fillTypes(undefined);
fillTypes(false);
fillTypes(new Promise(INTERNAL));
CapturedTrace.setBounds(async.firstLineError,util.lastLineError);
return Promise
}
},{"./any.js":1,"./async.js":2,"./bind.js":3,"./call_get.js":5,"./cancel.js":6,"./captured_trace.js":7,"./catch_filter.js":8,"./context.js":9,"./debuggability.js":10,"./direct_resolve.js":11,"./each.js":12,"./errors.js":13,"./filter.js":15,"./finally.js":16,"./generators.js":17,"./join.js":18,"./map.js":19,"./method.js":20,"./nodeify.js":21,"./progress.js":22,"./promise_array.js":24,"./promise_resolver.js":25,"./promisify.js":26,"./props.js":27,"./race.js":29,"./reduce.js":30,"./settle.js":32,"./some.js":33,"./synchronous_inspection.js":34,"./thenables.js":35,"./timers.js":36,"./using.js":37,"./util.js":38}],24:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection){var util=_dereq_("./util.js");
var isArray=util.isArray;
function toResolutionValue(val){switch(val){case -2:return[];
case -3:return{}
}}function PromiseArray(values){var promise=this._promise=new Promise(INTERNAL);
var parent;
if(values instanceof Promise){parent=values;
promise._propagateFrom(parent,1|4)
}this._values=values;
this._length=0;
this._totalResolved=0;
this._init(undefined,-2)
}PromiseArray.prototype.length=function(){return this._length
};
PromiseArray.prototype.promise=function(){return this._promise
};
PromiseArray.prototype._init=function init(_,resolveValueIfEmpty){var values=tryConvertToPromise(this._values,this._promise);
if(values instanceof Promise){values=values._target();
this._values=values;
if(values._isFulfilled()){values=values._value();
if(!isArray(values)){var err=new Promise.TypeError("expecting an array, a promise or a thenable\u000a\u000a    See http://goo.gl/s8MMhc\u000a");
this.__hardReject__(err);
return
}}else{if(values._isPending()){values._then(init,this._reject,undefined,this,resolveValueIfEmpty);
return
}else{this._reject(values._reason());
return
}}}else{if(!isArray(values)){this._promise._reject(apiRejection("expecting an array, a promise or a thenable\u000a\u000a    See http://goo.gl/s8MMhc\u000a")._reason());
return
}}if(values.length===0){if(resolveValueIfEmpty===-5){this._resolveEmptyArray()
}else{this._resolve(toResolutionValue(resolveValueIfEmpty))
}return
}var len=this.getActualLength(values.length);
this._length=len;
this._values=this.shouldCopyValues()?new Array(len):this._values;
var promise=this._promise;
for(var i=0;
i<len;
++i){var isResolved=this._isResolved();
var maybePromise=tryConvertToPromise(values[i],promise);
if(maybePromise instanceof Promise){maybePromise=maybePromise._target();
if(isResolved){maybePromise._ignoreRejections()
}else{if(maybePromise._isPending()){maybePromise._proxyPromiseArray(this,i)
}else{if(maybePromise._isFulfilled()){this._promiseFulfilled(maybePromise._value(),i)
}else{this._promiseRejected(maybePromise._reason(),i)
}}}}else{if(!isResolved){this._promiseFulfilled(maybePromise,i)
}}}};
PromiseArray.prototype._isResolved=function(){return this._values===null
};
PromiseArray.prototype._resolve=function(value){this._values=null;
this._promise._fulfill(value)
};
PromiseArray.prototype.__hardReject__=PromiseArray.prototype._reject=function(reason){this._values=null;
this._promise._rejectCallback(reason,false,true)
};
PromiseArray.prototype._promiseProgressed=function(progressValue,index){this._promise._progress({index:index,value:progressValue})
};
PromiseArray.prototype._promiseFulfilled=function(value,index){this._values[index]=value;
var totalResolved=++this._totalResolved;
if(totalResolved>=this._length){this._resolve(this._values)
}};
PromiseArray.prototype._promiseRejected=function(reason,index){this._totalResolved++;
this._reject(reason)
};
PromiseArray.prototype.shouldCopyValues=function(){return true
};
PromiseArray.prototype.getActualLength=function(len){return len
};
return PromiseArray
}
},{"./util.js":38}],25:[function(_dereq_,module,exports){var util=_dereq_("./util.js");
var maybeWrapAsError=util.maybeWrapAsError;
var errors=_dereq_("./errors.js");
var TimeoutError=errors.TimeoutError;
var OperationalError=errors.OperationalError;
var haveGetters=util.haveGetters;
var es5=_dereq_("./es5.js");
function isUntypedError(obj){return obj instanceof Error&&es5.getPrototypeOf(obj)===Error.prototype
}var rErrorKey=/^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj){var ret;
if(isUntypedError(obj)){ret=new OperationalError(obj);
ret.name=obj.name;
ret.message=obj.message;
ret.stack=obj.stack;
var keys=es5.keys(obj);
for(var i=0;
i<keys.length;
++i){var key=keys[i];
if(!rErrorKey.test(key)){ret[key]=obj[key]
}}return ret
}util.markAsOriginatingFromRejection(obj);
return obj
}function nodebackForPromise(promise){return function(err,value){if(promise===null){return
}if(err){var wrapped=wrapAsOperationalError(maybeWrapAsError(err));
promise._attachExtraTrace(wrapped);
promise._reject(wrapped)
}else{if(arguments.length>2){var $_len=arguments.length;
var args=new Array($_len-1);
for(var $_i=1;
$_i<$_len;
++$_i){args[$_i-1]=arguments[$_i]
}promise._fulfill(args)
}else{promise._fulfill(value)
}}promise=null
}
}var PromiseResolver;
if(!haveGetters){PromiseResolver=function(promise){this.promise=promise;
this.asCallback=nodebackForPromise(promise);
this.callback=this.asCallback
}
}else{PromiseResolver=function(promise){this.promise=promise
}
}if(haveGetters){var prop={get:function(){return nodebackForPromise(this.promise)
}};
es5.defineProperty(PromiseResolver.prototype,"asCallback",prop);
es5.defineProperty(PromiseResolver.prototype,"callback",prop)
}PromiseResolver._nodebackForPromise=nodebackForPromise;
PromiseResolver.prototype.toString=function(){return"[object PromiseResolver]"
};
PromiseResolver.prototype.resolve=PromiseResolver.prototype.fulfill=function(value){if(!(this instanceof PromiseResolver)){throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\u000a\u000a    See http://goo.gl/sdkXL9\u000a")
}this.promise._resolveCallback(value)
};
PromiseResolver.prototype.reject=function(reason){if(!(this instanceof PromiseResolver)){throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\u000a\u000a    See http://goo.gl/sdkXL9\u000a")
}this.promise._rejectCallback(reason)
};
PromiseResolver.prototype.progress=function(value){if(!(this instanceof PromiseResolver)){throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\u000a\u000a    See http://goo.gl/sdkXL9\u000a")
}this.promise._progress(value)
};
PromiseResolver.prototype.cancel=function(err){this.promise.cancel(err)
};
PromiseResolver.prototype.timeout=function(){this.reject(new TimeoutError("timeout"))
};
PromiseResolver.prototype.isResolved=function(){return this.promise.isResolved()
};
PromiseResolver.prototype.toJSON=function(){return this.promise.toJSON()
};
module.exports=PromiseResolver
},{"./errors.js":13,"./es5.js":14,"./util.js":38}],26:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL){var THIS={};
var util=_dereq_("./util.js");
var nodebackForPromise=_dereq_("./promise_resolver.js")._nodebackForPromise;
var withAppended=util.withAppended;
var maybeWrapAsError=util.maybeWrapAsError;
var canEvaluate=util.canEvaluate;
var TypeError=_dereq_("./errors").TypeError;
var defaultSuffix="Async";
var defaultPromisified={__isPromisified__:true};
var noCopyPropsPattern=/^(?:length|name|arguments|caller|callee|prototype|__isPromisified__)$/;
var defaultFilter=function(name){return util.isIdentifier(name)&&name.charAt(0)!=="_"&&name!=="constructor"
};
function propsFilter(key){return !noCopyPropsPattern.test(key)
}function isPromisified(fn){try{return fn.__isPromisified__===true
}catch(e){return false
}}function hasPromisified(obj,key,suffix){var val=util.getDataPropertyOrDefault(obj,key+suffix,defaultPromisified);
return val?isPromisified(val):false
}function checkValid(ret,suffix,suffixRegexp){for(var i=0;
i<ret.length;
i+=2){var key=ret[i];
if(suffixRegexp.test(key)){var keyWithoutAsyncSuffix=key.replace(suffixRegexp,"");
for(var j=0;
j<ret.length;
j+=2){if(ret[j]===keyWithoutAsyncSuffix){throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/iWrZbw\u000a".replace("%s",suffix))
}}}}}function promisifiableMethods(obj,suffix,suffixRegexp,filter){var keys=util.inheritedDataKeys(obj);
var ret=[];
for(var i=0;
i<keys.length;
++i){var key=keys[i];
var value=obj[key];
var passesDefaultFilter=filter===defaultFilter?true:defaultFilter(key,value,obj);
if(typeof value==="function"&&!util.isNativeFunctionMethod(value)&&!isPromisified(value)&&!hasPromisified(obj,key,suffix)&&filter(key,value,obj,passesDefaultFilter)){ret.push(key,value)
}}checkValid(ret,suffix,suffixRegexp);
return ret
}var escapeIdentRegex=function(str){return str.replace(/([$])/,"\\$")
};
var makeNodePromisifiedEval;
if(!true){var switchCaseArgumentOrder=function(likelyArgumentCount){var ret=[likelyArgumentCount];
var min=Math.max(0,likelyArgumentCount-1-3);
for(var i=likelyArgumentCount-1;
i>=min;
--i){ret.push(i)
}for(var i=likelyArgumentCount+1;
i<=3;
++i){ret.push(i)
}return ret
};
var argumentSequence=function(argumentCount){return util.filledRange(argumentCount,"_arg","")
};
var parameterDeclaration=function(parameterCount){return util.filledRange(Math.max(parameterCount,3),"_arg","")
};
var parameterCount=function(fn){if(typeof fn.length==="number"){return Math.max(Math.min(fn.length,1023+1),0)
}return 0
};
makeNodePromisifiedEval=function(callback,receiver,originalName,fn){var newParameterCount=Math.max(0,parameterCount(fn)-1);
var argumentOrder=switchCaseArgumentOrder(newParameterCount);
var shouldProxyThis=typeof callback==="string"||receiver===THIS;
function generateCallForArgumentCount(count){var args=argumentSequence(count).join(", ");
var comma=count>0?", ":"";
var ret;
if(shouldProxyThis){ret="ret = callback.call(this, {{args}}, nodeback); break;\n"
}else{ret=receiver===undefined?"ret = callback({{args}}, nodeback); break;\n":"ret = callback.call(receiver, {{args}}, nodeback); break;\n"
}return ret.replace("{{args}}",args).replace(", ",comma)
}function generateArgumentSwitchCase(){var ret="";
for(var i=0;
i<argumentOrder.length;
++i){ret+="case "+argumentOrder[i]+":"+generateCallForArgumentCount(argumentOrder[i])
}ret+="                                                             \n        default:                                                             \n            var args = new Array(len + 1);                                   \n            var i = 0;                                                       \n            for (var i = 0; i < len; ++i) {                                  \n               args[i] = arguments[i];                                       \n            }                                                                \n            args[i] = nodeback;                                              \n            [CodeForCall]                                                    \n            break;                                                           \n        ".replace("[CodeForCall]",(shouldProxyThis?"ret = callback.apply(this, args);\n":"ret = callback.apply(receiver, args);\n"));
return ret
}var getFunctionCode=typeof callback==="string"?("this != null ? this['"+callback+"'] : fn"):"fn";
return new Function("Promise","fn","receiver","withAppended","maybeWrapAsError","nodebackForPromise","tryCatch","errorObj","notEnumerableProp","INTERNAL","'use strict';                            \n        var ret = function (Parameters) {                                    \n            'use strict';                                                    \n            var len = arguments.length;                                      \n            var promise = new Promise(INTERNAL);                             \n            promise._captureStackTrace();                                    \n            var nodeback = nodebackForPromise(promise);                      \n            var ret;                                                         \n            var callback = tryCatch([GetFunctionCode]);                      \n            switch(len) {                                                    \n                [CodeForSwitchCase]                                          \n            }                                                                \n            if (ret === errorObj) {                                          \n                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n            }                                                                \n            return promise;                                                  \n        };                                                                   \n        notEnumerableProp(ret, '__isPromisified__', true);                   \n        return ret;                                                          \n        ".replace("Parameters",parameterDeclaration(newParameterCount)).replace("[CodeForSwitchCase]",generateArgumentSwitchCase()).replace("[GetFunctionCode]",getFunctionCode))(Promise,fn,receiver,withAppended,maybeWrapAsError,nodebackForPromise,util.tryCatch,util.errorObj,util.notEnumerableProp,INTERNAL)
}
}function makeNodePromisifiedClosure(callback,receiver,_,fn){var defaultThis=(function(){return this
})();
var method=callback;
if(typeof method==="string"){callback=fn
}function promisified(){var _receiver=receiver;
if(receiver===THIS){_receiver=this
}var promise=new Promise(INTERNAL);
promise._captureStackTrace();
var cb=typeof method==="string"&&this!==defaultThis?this[method]:callback;
var fn=nodebackForPromise(promise);
try{cb.apply(_receiver,withAppended(arguments,fn))
}catch(e){promise._rejectCallback(maybeWrapAsError(e),true,true)
}return promise
}util.notEnumerableProp(promisified,"__isPromisified__",true);
return promisified
}var makeNodePromisified=canEvaluate?makeNodePromisifiedEval:makeNodePromisifiedClosure;
function promisifyAll(obj,suffix,filter,promisifier){var suffixRegexp=new RegExp(escapeIdentRegex(suffix)+"$");
var methods=promisifiableMethods(obj,suffix,suffixRegexp,filter);
for(var i=0,len=methods.length;
i<len;
i+=2){var key=methods[i];
var fn=methods[i+1];
var promisifiedKey=key+suffix;
obj[promisifiedKey]=promisifier===makeNodePromisified?makeNodePromisified(key,THIS,key,fn,suffix):promisifier(fn,function(){return makeNodePromisified(key,THIS,key,fn,suffix)
})
}util.toFastProperties(obj);
return obj
}function promisify(callback,receiver){return makeNodePromisified(callback,receiver,undefined,callback)
}Promise.promisify=function(fn,receiver){if(typeof fn!=="function"){throw new TypeError("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}if(isPromisified(fn)){return fn
}var ret=promisify(fn,arguments.length<2?THIS:receiver);
util.copyDescriptors(fn,ret,propsFilter);
return ret
};
Promise.promisifyAll=function(target,options){if(typeof target!=="function"&&typeof target!=="object"){throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/9ITlV0\u000a")
}options=Object(options);
var suffix=options.suffix;
if(typeof suffix!=="string"){suffix=defaultSuffix
}var filter=options.filter;
if(typeof filter!=="function"){filter=defaultFilter
}var promisifier=options.promisifier;
if(typeof promisifier!=="function"){promisifier=makeNodePromisified
}if(!util.isIdentifier(suffix)){throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/8FZo5V\u000a")
}var keys=util.inheritedDataKeys(target);
for(var i=0;
i<keys.length;
++i){var value=target[keys[i]];
if(keys[i]!=="constructor"&&util.isClass(value)){promisifyAll(value.prototype,suffix,filter,promisifier);
promisifyAll(value,suffix,filter,promisifier)
}}return promisifyAll(target,suffix,filter,promisifier)
}
}
},{"./errors":13,"./promise_resolver.js":25,"./util.js":38}],27:[function(_dereq_,module,exports){module.exports=function(Promise,PromiseArray,tryConvertToPromise,apiRejection){var util=_dereq_("./util.js");
var isObject=util.isObject;
var es5=_dereq_("./es5.js");
function PropertiesPromiseArray(obj){var keys=es5.keys(obj);
var len=keys.length;
var values=new Array(len*2);
for(var i=0;
i<len;
++i){var key=keys[i];
values[i]=obj[key];
values[i+len]=key
}this.constructor$(values)
}util.inherits(PropertiesPromiseArray,PromiseArray);
PropertiesPromiseArray.prototype._init=function(){this._init$(undefined,-3)
};
PropertiesPromiseArray.prototype._promiseFulfilled=function(value,index){this._values[index]=value;
var totalResolved=++this._totalResolved;
if(totalResolved>=this._length){var val={};
var keyOffset=this.length();
for(var i=0,len=this.length();
i<len;
++i){val[this._values[i+keyOffset]]=this._values[i]
}this._resolve(val)
}};
PropertiesPromiseArray.prototype._promiseProgressed=function(value,index){this._promise._progress({key:this._values[index+this.length()],value:value})
};
PropertiesPromiseArray.prototype.shouldCopyValues=function(){return false
};
PropertiesPromiseArray.prototype.getActualLength=function(len){return len>>1
};
function props(promises){var ret;
var castValue=tryConvertToPromise(promises);
if(!isObject(castValue)){return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/OsFKC8\u000a")
}else{if(castValue instanceof Promise){ret=castValue._then(Promise.props,undefined,undefined,undefined,undefined)
}else{ret=new PropertiesPromiseArray(castValue).promise()
}}if(castValue instanceof Promise){ret._propagateFrom(castValue,4)
}return ret
}Promise.prototype.props=function(){return props(this)
};
Promise.props=function(promises){return props(promises)
}
}
},{"./es5.js":14,"./util.js":38}],28:[function(_dereq_,module,exports){function arrayMove(src,srcIndex,dst,dstIndex,len){for(var j=0;
j<len;
++j){dst[j+dstIndex]=src[j+srcIndex];
src[j+srcIndex]=void 0
}}function Queue(capacity){this._capacity=capacity;
this._length=0;
this._front=0
}Queue.prototype._willBeOverCapacity=function(size){return this._capacity<size
};
Queue.prototype._pushOne=function(arg){var length=this.length();
this._checkCapacity(length+1);
var i=(this._front+length)&(this._capacity-1);
this[i]=arg;
this._length=length+1
};
Queue.prototype._unshiftOne=function(value){var capacity=this._capacity;
this._checkCapacity(this.length()+1);
var front=this._front;
var i=((((front-1)&(capacity-1))^capacity)-capacity);
this[i]=value;
this._front=i;
this._length=this.length()+1
};
Queue.prototype.unshift=function(fn,receiver,arg){this._unshiftOne(arg);
this._unshiftOne(receiver);
this._unshiftOne(fn)
};
Queue.prototype.push=function(fn,receiver,arg){var length=this.length()+3;
if(this._willBeOverCapacity(length)){this._pushOne(fn);
this._pushOne(receiver);
this._pushOne(arg);
return
}var j=this._front+length-3;
this._checkCapacity(length);
var wrapMask=this._capacity-1;
this[(j+0)&wrapMask]=fn;
this[(j+1)&wrapMask]=receiver;
this[(j+2)&wrapMask]=arg;
this._length=length
};
Queue.prototype.shift=function(){var front=this._front,ret=this[front];
this[front]=undefined;
this._front=(front+1)&(this._capacity-1);
this._length--;
return ret
};
Queue.prototype.length=function(){return this._length
};
Queue.prototype._checkCapacity=function(size){if(this._capacity<size){this._resizeTo(this._capacity<<1)
}};
Queue.prototype._resizeTo=function(capacity){var oldCapacity=this._capacity;
this._capacity=capacity;
var front=this._front;
var length=this._length;
var moveItemsCount=(front+length)&(oldCapacity-1);
arrayMove(this,0,this,oldCapacity,moveItemsCount)
};
module.exports=Queue
},{}],29:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection){var isArray=_dereq_("./util.js").isArray;
var raceLater=function(promise){return promise.then(function(array){return race(array,promise)
})
};
function race(promises,parent){var maybePromise=tryConvertToPromise(promises);
if(maybePromise instanceof Promise){return raceLater(maybePromise)
}else{if(!isArray(promises)){return apiRejection("expecting an array, a promise or a thenable\u000a\u000a    See http://goo.gl/s8MMhc\u000a")
}}var ret=new Promise(INTERNAL);
if(parent!==undefined){ret._propagateFrom(parent,4|1)
}var fulfill=ret._fulfill;
var reject=ret._reject;
for(var i=0,len=promises.length;
i<len;
++i){var val=promises[i];
if(val===undefined&&!(i in promises)){continue
}Promise.cast(val)._then(fulfill,reject,undefined,ret,null)
}return ret
}Promise.race=function(promises){return race(promises,undefined)
};
Promise.prototype.race=function(){return race(this,undefined)
}
}
},{"./util.js":38}],30:[function(_dereq_,module,exports){module.exports=function(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL){var async=_dereq_("./async.js");
var util=_dereq_("./util.js");
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
function ReductionPromiseArray(promises,fn,accum,_each){this.constructor$(promises);
this._promise._captureStackTrace();
this._preservedValues=_each===INTERNAL?[]:null;
this._zerothIsAccum=(accum===undefined);
this._gotAccum=false;
this._reducingIndex=(this._zerothIsAccum?1:0);
this._valuesPhase=undefined;
var maybePromise=tryConvertToPromise(accum,this._promise);
var rejected=false;
var isPromise=maybePromise instanceof Promise;
if(isPromise){maybePromise=maybePromise._target();
if(maybePromise._isPending()){maybePromise._proxyPromiseArray(this,-1)
}else{if(maybePromise._isFulfilled()){accum=maybePromise._value();
this._gotAccum=true
}else{this._reject(maybePromise._reason());
rejected=true
}}}if(!(isPromise||this._zerothIsAccum)){this._gotAccum=true
}this._callback=fn;
this._accum=accum;
if(!rejected){async.invoke(init,this,undefined)
}}function init(){this._init$(undefined,-5)
}util.inherits(ReductionPromiseArray,PromiseArray);
ReductionPromiseArray.prototype._init=function(){};
ReductionPromiseArray.prototype._resolveEmptyArray=function(){if(this._gotAccum||this._zerothIsAccum){this._resolve(this._preservedValues!==null?[]:this._accum)
}};
ReductionPromiseArray.prototype._promiseFulfilled=function(value,index){var values=this._values;
values[index]=value;
var length=this.length();
var preservedValues=this._preservedValues;
var isEach=preservedValues!==null;
var gotAccum=this._gotAccum;
var valuesPhase=this._valuesPhase;
var valuesPhaseIndex;
if(!valuesPhase){valuesPhase=this._valuesPhase=new Array(length);
for(valuesPhaseIndex=0;
valuesPhaseIndex<length;
++valuesPhaseIndex){valuesPhase[valuesPhaseIndex]=0
}}valuesPhaseIndex=valuesPhase[index];
if(index===0&&this._zerothIsAccum){this._accum=value;
this._gotAccum=gotAccum=true;
valuesPhase[index]=((valuesPhaseIndex===0)?1:2)
}else{if(index===-1){this._accum=value;
this._gotAccum=gotAccum=true
}else{if(valuesPhaseIndex===0){valuesPhase[index]=1
}else{valuesPhase[index]=2;
this._accum=value
}}}if(!gotAccum){return
}var callback=this._callback;
var receiver=this._promise._boundTo;
var ret;
for(var i=this._reducingIndex;
i<length;
++i){valuesPhaseIndex=valuesPhase[i];
if(valuesPhaseIndex===2){this._reducingIndex=i+1;
continue
}if(valuesPhaseIndex!==1){return
}value=values[i];
this._promise._pushContext();
if(isEach){preservedValues.push(value);
ret=tryCatch(callback).call(receiver,value,i,length)
}else{ret=tryCatch(callback).call(receiver,this._accum,value,i,length)
}this._promise._popContext();
if(ret===errorObj){return this._reject(ret.e)
}var maybePromise=tryConvertToPromise(ret,this._promise);
if(maybePromise instanceof Promise){maybePromise=maybePromise._target();
if(maybePromise._isPending()){valuesPhase[i]=4;
return maybePromise._proxyPromiseArray(this,i)
}else{if(maybePromise._isFulfilled()){ret=maybePromise._value()
}else{return this._reject(maybePromise._reason())
}}}this._reducingIndex=i+1;
this._accum=ret
}this._resolve(isEach?preservedValues:this._accum)
};
function reduce(promises,fn,initialValue,_each){if(typeof fn!=="function"){return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}var array=new ReductionPromiseArray(promises,fn,initialValue,_each);
return array.promise()
}Promise.prototype.reduce=function(fn,initialValue){return reduce(this,fn,initialValue,null)
};
Promise.reduce=function(promises,fn,initialValue,_each){return reduce(promises,fn,initialValue,_each)
}
}
},{"./async.js":2,"./util.js":38}],31:[function(_dereq_,module,exports){var schedule;
var util=_dereq_("./util");
var noAsyncScheduler=function(){throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/m3OTXk\u000a")
};
if(util.isNode&&typeof MutationObserver==="undefined"){var GlobalSetImmediate=global.setImmediate;
var ProcessNextTick=process.nextTick;
schedule=util.isRecentNode?function(fn){GlobalSetImmediate.call(global,fn)
}:function(fn){ProcessNextTick.call(process,fn)
}
}else{if(typeof MutationObserver!=="undefined"){schedule=function(fn){var div=document.createElement("div");
var observer=new MutationObserver(fn);
observer.observe(div,{attributes:true});
return function(){div.classList.toggle("foo")
}
};
schedule.isStatic=true
}else{if(typeof setImmediate!=="undefined"){schedule=function(fn){setImmediate(fn)
}
}else{if(typeof setTimeout!=="undefined"){schedule=function(fn){setTimeout(fn,0)
}
}else{schedule=noAsyncScheduler
}}}}module.exports=schedule
},{"./util":38}],32:[function(_dereq_,module,exports){module.exports=function(Promise,PromiseArray){var PromiseInspection=Promise.PromiseInspection;
var util=_dereq_("./util.js");
function SettledPromiseArray(values){this.constructor$(values)
}util.inherits(SettledPromiseArray,PromiseArray);
SettledPromiseArray.prototype._promiseResolved=function(index,inspection){this._values[index]=inspection;
var totalResolved=++this._totalResolved;
if(totalResolved>=this._length){this._resolve(this._values)
}};
SettledPromiseArray.prototype._promiseFulfilled=function(value,index){var ret=new PromiseInspection();
ret._bitField=268435456;
ret._settledValue=value;
this._promiseResolved(index,ret)
};
SettledPromiseArray.prototype._promiseRejected=function(reason,index){var ret=new PromiseInspection();
ret._bitField=134217728;
ret._settledValue=reason;
this._promiseResolved(index,ret)
};
Promise.settle=function(promises){return new SettledPromiseArray(promises).promise()
};
Promise.prototype.settle=function(){return new SettledPromiseArray(this).promise()
}
}
},{"./util.js":38}],33:[function(_dereq_,module,exports){module.exports=function(Promise,PromiseArray,apiRejection){var util=_dereq_("./util.js");
var RangeError=_dereq_("./errors.js").RangeError;
var AggregateError=_dereq_("./errors.js").AggregateError;
var isArray=util.isArray;
function SomePromiseArray(values){this.constructor$(values);
this._howMany=0;
this._unwrap=false;
this._initialized=false
}util.inherits(SomePromiseArray,PromiseArray);
SomePromiseArray.prototype._init=function(){if(!this._initialized){return
}if(this._howMany===0){this._resolve([]);
return
}this._init$(undefined,-5);
var isArrayResolved=isArray(this._values);
if(!this._isResolved()&&isArrayResolved&&this._howMany>this._canPossiblyFulfill()){this._reject(this._getRangeError(this.length()))
}};
SomePromiseArray.prototype.init=function(){this._initialized=true;
this._init()
};
SomePromiseArray.prototype.setUnwrap=function(){this._unwrap=true
};
SomePromiseArray.prototype.howMany=function(){return this._howMany
};
SomePromiseArray.prototype.setHowMany=function(count){this._howMany=count
};
SomePromiseArray.prototype._promiseFulfilled=function(value){this._addFulfilled(value);
if(this._fulfilled()===this.howMany()){this._values.length=this.howMany();
if(this.howMany()===1&&this._unwrap){this._resolve(this._values[0])
}else{this._resolve(this._values)
}}};
SomePromiseArray.prototype._promiseRejected=function(reason){this._addRejected(reason);
if(this.howMany()>this._canPossiblyFulfill()){var e=new AggregateError();
for(var i=this.length();
i<this._values.length;
++i){e.push(this._values[i])
}this._reject(e)
}};
SomePromiseArray.prototype._fulfilled=function(){return this._totalResolved
};
SomePromiseArray.prototype._rejected=function(){return this._values.length-this.length()
};
SomePromiseArray.prototype._addRejected=function(reason){this._values.push(reason)
};
SomePromiseArray.prototype._addFulfilled=function(value){this._values[this._totalResolved++]=value
};
SomePromiseArray.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected()
};
SomePromiseArray.prototype._getRangeError=function(count){var message="Input array must contain at least "+this._howMany+" items but contains only "+count+" items";
return new RangeError(message)
};
SomePromiseArray.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0))
};
function some(promises,howMany){if((howMany|0)!==howMany||howMany<0){return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/1wAmHx\u000a")
}var ret=new SomePromiseArray(promises);
var promise=ret.promise();
ret.setHowMany(howMany);
ret.init();
return promise
}Promise.some=function(promises,howMany){return some(promises,howMany)
};
Promise.prototype.some=function(howMany){return some(this,howMany)
};
Promise._SomePromiseArray=SomePromiseArray
}
},{"./errors.js":13,"./util.js":38}],34:[function(_dereq_,module,exports){module.exports=function(Promise){function PromiseInspection(promise){if(promise!==undefined){promise=promise._target();
this._bitField=promise._bitField;
this._settledValue=promise._settledValue
}else{this._bitField=0;
this._settledValue=undefined
}}PromiseInspection.prototype.value=function(){if(!this.isFulfilled()){throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/hc1DLj\u000a")
}return this._settledValue
};
PromiseInspection.prototype.error=PromiseInspection.prototype.reason=function(){if(!this.isRejected()){throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/hPuiwB\u000a")
}return this._settledValue
};
PromiseInspection.prototype.isFulfilled=Promise.prototype._isFulfilled=function(){return(this._bitField&268435456)>0
};
PromiseInspection.prototype.isRejected=Promise.prototype._isRejected=function(){return(this._bitField&134217728)>0
};
PromiseInspection.prototype.isPending=Promise.prototype._isPending=function(){return(this._bitField&402653184)===0
};
PromiseInspection.prototype.isResolved=Promise.prototype._isResolved=function(){return(this._bitField&402653184)>0
};
Promise.prototype.isPending=function(){return this._target()._isPending()
};
Promise.prototype.isRejected=function(){return this._target()._isRejected()
};
Promise.prototype.isFulfilled=function(){return this._target()._isFulfilled()
};
Promise.prototype.isResolved=function(){return this._target()._isResolved()
};
Promise.prototype._value=function(){return this._settledValue
};
Promise.prototype._reason=function(){this._unsetRejectionIsUnhandled();
return this._settledValue
};
Promise.prototype.value=function(){var target=this._target();
if(!target.isFulfilled()){throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/hc1DLj\u000a")
}return target._settledValue
};
Promise.prototype.reason=function(){var target=this._target();
if(!target.isRejected()){throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/hPuiwB\u000a")
}target._unsetRejectionIsUnhandled();
return target._settledValue
};
Promise.PromiseInspection=PromiseInspection
}
},{}],35:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL){var util=_dereq_("./util.js");
var errorObj=util.errorObj;
var isObject=util.isObject;
function tryConvertToPromise(obj,context){if(isObject(obj)){if(obj instanceof Promise){return obj
}else{if(isAnyBluebirdPromise(obj)){var ret=new Promise(INTERNAL);
obj._then(ret._fulfillUnchecked,ret._rejectUncheckedCheckError,ret._progressUnchecked,ret,null);
return ret
}}var then=util.tryCatch(getThen)(obj);
if(then===errorObj){if(context){context._pushContext()
}var ret=Promise.reject(then.e);
if(context){context._popContext()
}return ret
}else{if(typeof then==="function"){return doThenable(obj,then,context)
}}}return obj
}function getThen(obj){return obj.then
}var hasProp={}.hasOwnProperty;
function isAnyBluebirdPromise(obj){return hasProp.call(obj,"_promise0")
}function doThenable(x,then,context){var promise=new Promise(INTERNAL);
var ret=promise;
if(context){context._pushContext()
}promise._captureStackTrace();
if(context){context._popContext()
}var synchronous=true;
var result=util.tryCatch(then).call(x,resolveFromThenable,rejectFromThenable,progressFromThenable);
synchronous=false;
if(promise&&result===errorObj){promise._rejectCallback(result.e,true,true);
promise=null
}function resolveFromThenable(value){if(!promise){return
}if(x===value){promise._rejectCallback(Promise._makeSelfResolutionError(),false,true)
}else{promise._resolveCallback(value)
}promise=null
}function rejectFromThenable(reason){if(!promise){return
}promise._rejectCallback(reason,synchronous,true);
promise=null
}function progressFromThenable(value){if(!promise){return
}if(typeof promise._progress==="function"){promise._progress(value)
}}return ret
}return tryConvertToPromise
}
},{"./util.js":38}],36:[function(_dereq_,module,exports){module.exports=function(Promise,INTERNAL){var util=_dereq_("./util.js");
var TimeoutError=Promise.TimeoutError;
var afterTimeout=function(promise,message){if(!promise.isPending()){return
}if(typeof message!=="string"){message="operation timed out"
}var err=new TimeoutError(message);
util.markAsOriginatingFromRejection(err);
promise._attachExtraTrace(err);
promise._cancel(err)
};
var afterValue=function(value){return delay(+this).thenReturn(value)
};
var delay=Promise.delay=function(value,ms){if(ms===undefined){ms=value;
value=undefined;
var ret=new Promise(INTERNAL);
setTimeout(function(){ret._fulfill()
},ms);
return ret
}ms=+ms;
return Promise.resolve(value)._then(afterValue,null,null,ms,undefined)
};
Promise.prototype.delay=function(ms){return delay(this,ms)
};
function successClear(value){var handle=this;
if(handle instanceof Number){handle=+handle
}clearTimeout(handle);
return value
}function failureClear(reason){var handle=this;
if(handle instanceof Number){handle=+handle
}clearTimeout(handle);
throw reason
}Promise.prototype.timeout=function(ms,message){ms=+ms;
var ret=this.then().cancellable();
ret._cancellationParent=this;
var handle=setTimeout(function timeoutTimeout(){afterTimeout(ret,message)
},ms);
return ret._then(successClear,failureClear,undefined,handle,undefined)
}
}
},{"./util.js":38}],37:[function(_dereq_,module,exports){module.exports=function(Promise,apiRejection,tryConvertToPromise,createContext){var TypeError=_dereq_("./errors.js").TypeError;
var inherits=_dereq_("./util.js").inherits;
var PromiseInspection=Promise.PromiseInspection;
function inspectionMapper(inspections){var len=inspections.length;
for(var i=0;
i<len;
++i){var inspection=inspections[i];
if(inspection.isRejected()){return Promise.reject(inspection.error())
}inspections[i]=inspection._settledValue
}return inspections
}function thrower(e){setTimeout(function(){throw e
},0)
}function castPreservingDisposable(thenable){var maybePromise=tryConvertToPromise(thenable);
if(maybePromise!==thenable&&typeof thenable._isDisposable==="function"&&typeof thenable._getDisposer==="function"&&thenable._isDisposable()){maybePromise._setDisposable(thenable._getDisposer())
}return maybePromise
}function dispose(resources,inspection){var i=0;
var len=resources.length;
var ret=Promise.defer();
function iterator(){if(i>=len){return ret.resolve()
}var maybePromise=castPreservingDisposable(resources[i++]);
if(maybePromise instanceof Promise&&maybePromise._isDisposable()){try{maybePromise=tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection),resources.promise)
}catch(e){return thrower(e)
}if(maybePromise instanceof Promise){return maybePromise._then(iterator,thrower,null,null,null)
}}iterator()
}iterator();
return ret.promise
}function disposerSuccess(value){var inspection=new PromiseInspection();
inspection._settledValue=value;
inspection._bitField=268435456;
return dispose(this,inspection).thenReturn(value)
}function disposerFail(reason){var inspection=new PromiseInspection();
inspection._settledValue=reason;
inspection._bitField=134217728;
return dispose(this,inspection).thenThrow(reason)
}function Disposer(data,promise,context){this._data=data;
this._promise=promise;
this._context=context
}Disposer.prototype.data=function(){return this._data
};
Disposer.prototype.promise=function(){return this._promise
};
Disposer.prototype.resource=function(){if(this.promise().isFulfilled()){return this.promise().value()
}return null
};
Disposer.prototype.tryDispose=function(inspection){var resource=this.resource();
var context=this._context;
if(context!==undefined){context._pushContext()
}var ret=resource!==null?this.doDispose(resource,inspection):null;
if(context!==undefined){context._popContext()
}this._promise._unsetDisposable();
this._data=null;
return ret
};
Disposer.isDisposer=function(d){return(d!=null&&typeof d.resource==="function"&&typeof d.tryDispose==="function")
};
function FunctionDisposer(fn,promise,context){this.constructor$(fn,promise,context)
}inherits(FunctionDisposer,Disposer);
FunctionDisposer.prototype.doDispose=function(resource,inspection){var fn=this.data();
return fn.call(resource,resource,inspection)
};
function maybeUnwrapDisposer(value){if(Disposer.isDisposer(value)){this.resources[this.index]._setDisposable(value);
return value.promise()
}return value
}Promise.using=function(){var len=arguments.length;
if(len<2){return apiRejection("you must pass at least 2 arguments to Promise.using")
}var fn=arguments[len-1];
if(typeof fn!=="function"){return apiRejection("fn must be a function\u000a\u000a    See http://goo.gl/916lJJ\u000a")
}len--;
var resources=new Array(len);
for(var i=0;
i<len;
++i){var resource=arguments[i];
if(Disposer.isDisposer(resource)){var disposer=resource;
resource=resource.promise();
resource._setDisposable(disposer)
}else{var maybePromise=tryConvertToPromise(resource);
if(maybePromise instanceof Promise){resource=maybePromise._then(maybeUnwrapDisposer,null,null,{resources:resources,index:i},undefined)
}}resources[i]=resource
}var promise=Promise.settle(resources).then(inspectionMapper).then(function(vals){promise._pushContext();
var ret;
try{ret=fn.apply(undefined,vals)
}finally{promise._popContext()
}return ret
})._then(disposerSuccess,disposerFail,undefined,resources,undefined);
resources.promise=promise;
return promise
};
Promise.prototype._setDisposable=function(disposer){this._bitField=this._bitField|262144;
this._disposer=disposer
};
Promise.prototype._isDisposable=function(){return(this._bitField&262144)>0
};
Promise.prototype._getDisposer=function(){return this._disposer
};
Promise.prototype._unsetDisposable=function(){this._bitField=this._bitField&(~262144);
this._disposer=undefined
};
Promise.prototype.disposer=function(fn){if(typeof fn==="function"){return new FunctionDisposer(fn,this,createContext())
}throw new TypeError()
}
}
},{"./errors.js":13,"./util.js":38}],38:[function(_dereq_,module,exports){var es5=_dereq_("./es5.js");
var canEvaluate=typeof navigator=="undefined";
var haveGetters=(function(){try{var o={};
es5.defineProperty(o,"f",{get:function(){return 3
}});
return o.f===3
}catch(e){return false
}})();
var errorObj={e:{}};
var tryCatchTarget;
function tryCatcher(){try{return tryCatchTarget.apply(this,arguments)
}catch(e){errorObj.e=e;
return errorObj
}}function tryCatch(fn){tryCatchTarget=fn;
return tryCatcher
}var inherits=function(Child,Parent){var hasProp={}.hasOwnProperty;
function T(){this.constructor=Child;
this.constructor$=Parent;
for(var propertyName in Parent.prototype){if(hasProp.call(Parent.prototype,propertyName)&&propertyName.charAt(propertyName.length-1)!=="$"){this[propertyName+"$"]=Parent.prototype[propertyName]
}}}T.prototype=Parent.prototype;
Child.prototype=new T();
return Child.prototype
};
function isPrimitive(val){return val==null||val===true||val===false||typeof val==="string"||typeof val==="number"
}function isObject(value){return !isPrimitive(value)
}function maybeWrapAsError(maybeError){if(!isPrimitive(maybeError)){return maybeError
}return new Error(safeToString(maybeError))
}function withAppended(target,appendee){var len=target.length;
var ret=new Array(len+1);
var i;
for(i=0;
i<len;
++i){ret[i]=target[i]
}ret[i]=appendee;
return ret
}function getDataPropertyOrDefault(obj,key,defaultValue){if(es5.isES5){var desc=Object.getOwnPropertyDescriptor(obj,key);
if(desc!=null){return desc.get==null&&desc.set==null?desc.value:defaultValue
}}else{return{}.hasOwnProperty.call(obj,key)?obj[key]:undefined
}}function notEnumerableProp(obj,name,value){if(isPrimitive(obj)){return obj
}var descriptor={value:value,configurable:true,enumerable:false,writable:true};
es5.defineProperty(obj,name,descriptor);
return obj
}var wrapsPrimitiveReceiver=(function(){return this!=="string"
}).call("string");
function thrower(r){throw r
}var inheritedDataKeys=(function(){if(es5.isES5){var oProto=Object.prototype;
var getKeys=Object.getOwnPropertyNames;
return function(obj){var ret=[];
var visitedKeys=Object.create(null);
while(obj!=null&&obj!==oProto){var keys;
try{keys=getKeys(obj)
}catch(e){return ret
}for(var i=0;
i<keys.length;
++i){var key=keys[i];
if(visitedKeys[key]){continue
}visitedKeys[key]=true;
var desc=Object.getOwnPropertyDescriptor(obj,key);
if(desc!=null&&desc.get==null&&desc.set==null){ret.push(key)
}}obj=es5.getPrototypeOf(obj)
}return ret
}
}else{return function(obj){var ret=[];
for(var key in obj){ret.push(key)
}return ret
}
}})();
var thisAssignmentPattern=/this\s*\.\s*\S+\s*=/;
function isClass(fn){try{if(typeof fn==="function"){var keys=es5.names(fn.prototype);
if(((es5.isES5&&keys.length>1)||(keys.length>0&&!(keys.length===1&&keys[0]==="constructor")))||thisAssignmentPattern.test(fn+"")){return true
}}return false
}catch(e){return false
}}function toFastProperties(obj){function f(){}f.prototype=obj;
var l=8;
while(l--){new f()
}return obj;
eval(obj)
}var rident=/^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str){return rident.test(str)
}function filledRange(count,prefix,suffix){var ret=new Array(count);
for(var i=0;
i<count;
++i){ret[i]=prefix+i+suffix
}return ret
}function safeToString(obj){try{return obj+""
}catch(e){return"[no string representation]"
}}function markAsOriginatingFromRejection(e){try{notEnumerableProp(e,"isOperational",true)
}catch(ignore){}}function originatesFromRejection(e){if(e==null){return false
}return((e instanceof Error.__BluebirdErrorTypes__.OperationalError)||e.isOperational===true)
}function canAttachTrace(obj){return obj instanceof Error&&es5.propertyIsWritable(obj,"stack")
}var ensureErrorObject=(function(){if(!("stack" in new Error())){return function(value){if(canAttachTrace(value)){return value
}try{throw new Error(safeToString(value))
}catch(err){return err
}}
}else{return function(value){if(canAttachTrace(value)){return value
}return new Error(safeToString(value))
}
}})();
function classString(obj){return{}.toString.call(obj)
}function copyDescriptors(from,to,filter){var keys=es5.names(from);
for(var i=0;
i<keys.length;
++i){var key=keys[i];
if(filter(key)){es5.defineProperty(to,key,es5.getDescriptor(from,key))
}}}function isNativeFunctionMethod(fn){return fn===fn.call||fn===fn.toString||fn===fn.bind||fn===fn.apply
}var ret={isClass:isClass,isIdentifier:isIdentifier,inheritedDataKeys:inheritedDataKeys,getDataPropertyOrDefault:getDataPropertyOrDefault,thrower:thrower,isArray:es5.isArray,haveGetters:haveGetters,notEnumerableProp:notEnumerableProp,isPrimitive:isPrimitive,isObject:isObject,canEvaluate:canEvaluate,errorObj:errorObj,tryCatch:tryCatch,inherits:inherits,withAppended:withAppended,maybeWrapAsError:maybeWrapAsError,wrapsPrimitiveReceiver:wrapsPrimitiveReceiver,toFastProperties:toFastProperties,filledRange:filledRange,toString:safeToString,canAttachTrace:canAttachTrace,ensureErrorObject:ensureErrorObject,originatesFromRejection:originatesFromRejection,markAsOriginatingFromRejection:markAsOriginatingFromRejection,classString:classString,copyDescriptors:copyDescriptors,hasDevTools:typeof chrome!=="undefined"&&chrome&&typeof chrome.loadTimes==="function",isNode:typeof process!=="undefined"&&classString(process).toLowerCase()==="[object process]"&&(!process.type||process.type==="browser"),isNativeFunctionMethod:isNativeFunctionMethod};
ret.isRecentNode=ret.isNode&&(function(){var version=process.versions.node.split(".").map(Number);
return(version[0]===0&&version[1]>10)||(version[0]>0)
})();
try{throw new Error()
}catch(e){ret.lastLineError=e
}module.exports=ret
},{"./es5.js":14}],39:[function(_dereq_,module,exports){function EventEmitter(){this._events=this._events||{};
this._maxListeners=this._maxListeners||undefined
}module.exports=EventEmitter;
EventEmitter.EventEmitter=EventEmitter;
EventEmitter.prototype._events=undefined;
EventEmitter.prototype._maxListeners=undefined;
EventEmitter.defaultMaxListeners=10;
EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n)){throw TypeError("n must be a positive number")
}this._maxListeners=n;
return this
};
EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;
if(!this._events){this._events={}
}if(type==="error"){if(!this._events.error||(isObject(this._events.error)&&!this._events.error.length)){er=arguments[1];
if(er instanceof Error){throw er
}throw TypeError('Uncaught, unspecified "error" event.')
}}handler=this._events[type];
if(isUndefined(handler)){return false
}if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);
break;
case 2:handler.call(this,arguments[1]);
break;
case 3:handler.call(this,arguments[1],arguments[2]);
break;
default:len=arguments.length;
args=new Array(len-1);
for(i=1;
i<len;
i++){args[i-1]=arguments[i]
}handler.apply(this,args)
}}else{if(isObject(handler)){len=arguments.length;
args=new Array(len-1);
for(i=1;
i<len;
i++){args[i-1]=arguments[i]
}listeners=handler.slice();
len=listeners.length;
for(i=0;
i<len;
i++){listeners[i].apply(this,args)
}}}return true
};
EventEmitter.prototype.addListener=function(type,listener){var m;
if(!isFunction(listener)){throw TypeError("listener must be a function")
}if(!this._events){this._events={}
}if(this._events.newListener){this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener)
}if(!this._events[type]){this._events[type]=listener
}else{if(isObject(this._events[type])){this._events[type].push(listener)
}else{this._events[type]=[this._events[type],listener]
}}if(isObject(this._events[type])&&!this._events[type].warned){var m;
if(!isUndefined(this._maxListeners)){m=this._maxListeners
}else{m=EventEmitter.defaultMaxListeners
}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;
console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[type].length);
if(typeof console.trace==="function"){console.trace()
}}}return this
};
EventEmitter.prototype.on=EventEmitter.prototype.addListener;
EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener)){throw TypeError("listener must be a function")
}var fired=false;
function g(){this.removeListener(type,g);
if(!fired){fired=true;
listener.apply(this,arguments)
}}g.listener=listener;
this.on(type,g);
return this
};
EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;
if(!isFunction(listener)){throw TypeError("listener must be a function")
}if(!this._events||!this._events[type]){return this
}list=this._events[type];
length=list.length;
position=-1;
if(list===listener||(isFunction(list.listener)&&list.listener===listener)){delete this._events[type];
if(this._events.removeListener){this.emit("removeListener",type,listener)
}}else{if(isObject(list)){for(i=length;
i-->0;
){if(list[i]===listener||(list[i].listener&&list[i].listener===listener)){position=i;
break
}}if(position<0){return this
}if(list.length===1){list.length=0;
delete this._events[type]
}else{list.splice(position,1)
}if(this._events.removeListener){this.emit("removeListener",type,listener)
}}}return this
};
EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;
if(!this._events){return this
}if(!this._events.removeListener){if(arguments.length===0){this._events={}
}else{if(this._events[type]){delete this._events[type]
}}return this
}if(arguments.length===0){for(key in this._events){if(key==="removeListener"){continue
}this.removeAllListeners(key)
}this.removeAllListeners("removeListener");
this._events={};
return this
}listeners=this._events[type];
if(isFunction(listeners)){this.removeListener(type,listeners)
}else{while(listeners.length){this.removeListener(type,listeners[listeners.length-1])
}}delete this._events[type];
return this
};
EventEmitter.prototype.listeners=function(type){var ret;
if(!this._events||!this._events[type]){ret=[]
}else{if(isFunction(this._events[type])){ret=[this._events[type]]
}else{ret=this._events[type].slice()
}}return ret
};
EventEmitter.listenerCount=function(emitter,type){var ret;
if(!emitter._events||!emitter._events[type]){ret=0
}else{if(isFunction(emitter._events[type])){ret=1
}else{ret=emitter._events[type].length
}}return ret
};
function isFunction(arg){return typeof arg==="function"
}function isNumber(arg){return typeof arg==="number"
}function isObject(arg){return typeof arg==="object"&&arg!==null
}function isUndefined(arg){return arg===void 0
}},{}]},{},[4])(4)
});
if(typeof window!=="undefined"&&window!==null){window.P=window.Promise
}else{if(typeof self!=="undefined"&&self!==null){self.P=self.Promise
}};