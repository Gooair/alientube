/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function(l,q){if("object"===typeof exports&&exports)q(exports);else{var u={};q(u);"function"===typeof define&&define.amd?define(u):l.Mustache=u}})(this,function(l){function q(a){return"function"===typeof a}function u(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function z(a){if(!x(a)||2!==a.length)throw Error("Invalid tags: "+a);return[RegExp(u(a[0])+"\\s*"),RegExp("\\s*"+u(a[1]))]}function w(a){this.tail=this.string=a;this.pos=0}function m(a,b){this.view=null==a?{}:a;this.cache={".":this.view};
this.parent=b}function r(){this.cache={}}var C=/\s*/,A=/\s+/,D=/\S/,B=/\s*=/,E=/\s*\}/,F=/#|\^|\/|>|\{|&|=|!/,G=RegExp.prototype.test,H=Object.prototype.toString,x=Array.isArray||function(a){return"[object Array]"===H.call(a)},I={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};w.prototype.eos=function(){return""===this.tail};w.prototype.scan=function(a){return(a=this.tail.match(a))&&0===a.index?(a=a[0],this.tail=this.tail.substring(a.length),this.pos+=a.length,a):""};w.prototype.scanUntil=
function(a){a=this.tail.search(a);var b;switch(a){case -1:b=this.tail;this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,a),this.tail=this.tail.substring(a)}this.pos+=b.length;return b};m.prototype.push=function(a){return new m(a,this)};m.prototype.lookup=function(a){var b;if(a in this.cache)b=this.cache[a];else{for(var g=this;g;){if(0<a.indexOf(".")){b=g.view;for(var e=a.split("."),l=0;null!=b&&l<e.length;)b=b[e[l++]]}else b=g.view[a];if(null!=b)break;g=g.parent}this.cache[a]=b}q(b)&&
(b=b.call(this.view));return b};r.prototype.clearCache=function(){this.cache={}};r.prototype.parse=function(a,b){var g=this.cache,e=g[a];if(null==e){var n;n=b||l.tags;e=a||"";"string"===typeof n&&(n=n.split(A));for(var c=z(n),f=new w(e),k=[],e=[],d=[],q=!1,m=!1,p,h,s,v;!f.eos();){p=f.pos;if(s=f.scanUntil(c[0])){v=0;for(var r=s.length;v<r;++v)if(h=s.charAt(v),G.call(D,h)?m=!0:d.push(e.length),e.push(["text",h,p,p+1]),p+=1,"\n"===h){if(q&&!m)for(;d.length;)delete e[d.pop()];else d=[];m=q=!1}}if(!f.scan(c[0]))break;
q=!0;h=f.scan(F)||"name";f.scan(C);"="===h?(s=f.scanUntil(B),f.scan(B),f.scanUntil(c[1])):"{"===h?(s=f.scanUntil(RegExp("\\s*"+u("}"+n[1]))),f.scan(E),f.scanUntil(c[1]),h="&"):s=f.scanUntil(c[1]);if(!f.scan(c[1]))throw Error("Unclosed tag at "+f.pos);v=[h,s,p,f.pos];e.push(v);if("#"===h||"^"===h)k.push(v);else if("/"===h){h=k.pop();if(!h)throw Error('Unopened section "'+s+'" at '+p);if(h[1]!==s)throw Error('Unclosed section "'+h[1]+'" at '+p);}else"name"===h||"{"===h||"&"===h?m=!0:"="===h&&(c=z(n=
s.split(A)))}if(h=k.pop())throw Error('Unclosed section "'+h[1]+'" at '+f.pos);n=[];for(var t,f=0,k=e.length;f<k;++f)if(c=e[f])"text"===c[0]&&t&&"text"===t[0]?(t[1]+=c[1],t[3]=c[3]):(n.push(c),t=c);d=t=[];e=[];f=0;for(k=n.length;f<k;++f)switch(c=n[f],c[0]){case "#":case "^":d.push(c);e.push(c);d=c[4]=[];break;case "/":d=e.pop();d[5]=c[2];d=0<e.length?e[e.length-1][4]:t;break;default:d.push(c)}e=g[a]=t}return e};r.prototype.render=function(a,b,g){var e=this.parse(a);b=b instanceof m?b:new m(b);return this.renderTokens(e,
b,g,a)};r.prototype.renderTokens=function(a,b,g,e){function n(a){return f.render(a,b,g)}for(var c="",f=this,k,d,m=0,r=a.length;m<r;++m)switch(k=a[m],k[0]){case "#":d=b.lookup(k[1]);if(!d)continue;if(x(d))for(var p=0,h=d.length;p<h;++p)c+=this.renderTokens(k[4],b.push(d[p]),g,e);else if("object"===typeof d||"string"===typeof d)c+=this.renderTokens(k[4],b.push(d),g,e);else if(q(d)){if("string"!==typeof e)throw Error("Cannot use higher-order sections without the original template");d=d.call(b.view,e.slice(k[3],
k[5]),n);null!=d&&(c+=d)}else c+=this.renderTokens(k[4],b,g,e);break;case "^":d=b.lookup(k[1]);if(!d||x(d)&&0===d.length)c+=this.renderTokens(k[4],b,g,e);break;case ">":if(!g)continue;d=this.parse(q(g)?g(k[1]):g[k[1]]);null!=d&&(c+=this.renderTokens(d,b,g,e));break;case "&":d=b.lookup(k[1]);null!=d&&(c+=d);break;case "name":d=b.lookup(k[1]);null!=d&&(c+=l.escape(d));break;case "text":c+=k[1]}return c};l.name="mustache.js";l.version="0.8.0";l.tags=["{{","}}"];var y=new r;l.clearCache=function(){return y.clearCache()};
l.parse=function(a,b){return y.parse(a,b)};l.render=function(a,b,g){return y.render(a,b,g)};l.to_html=function(a,b,g,e){a=l.render(a,b,g);if(q(e))e(a);else return a};l.escape=function(a){return String(a).replace(/[&<>"'\/]/g,function(a){return I[a]})};l.Scanner=w;l.Context=m;l.Writer=r});