/*
 * searchtools.js_t (custom)
 * ~~~~~~~~~~~~~~~~
 *
 * Sphinx JavaScript utilities for the full-text search.
 *
 * :copyright: Copyright 2007-2018 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */


/* Non-minified version JS is _stemmer.js if file is provided */ BaseStemmer=function(){this.setCurrent=function(r){this.current=r;this.cursor=0;this.limit=this.current.length;this.limit_backward=0;this.bra=this.cursor;this.ket=this.limit};this.getCurrent=function(){return this.current};this.copy_from=function(r){this.current=r.current;this.cursor=r.cursor;this.limit=r.limit;this.limit_backward=r.limit_backward;this.bra=r.bra;this.ket=r.ket};this.in_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor++;return true};this.in_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor--;return true};this.out_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t){this.cursor++;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor++;return true}return false};this.out_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t){this.cursor--;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor--;return true}return false};this.eq_s=function(r){if(this.limit-this.cursor<r.length)return false;if(this.current.slice(this.cursor,this.cursor+r.length)!=r){return false}this.cursor+=r.length;return true};this.eq_s_b=function(r){if(this.cursor-this.limit_backward<r.length)return false;if(this.current.slice(this.cursor-r.length,this.cursor)!=r){return false}this.cursor-=r.length;return true};this.find_among=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=f;o<l[0].length;o++){if(s+f==e){a=-1;break}a=this.current.charCodeAt(s+f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s+l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s+l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.find_among_b=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit_backward;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=l[0].length-1-f;o>=0;o--){if(s-f==e){a=-1;break}a=this.current.charCodeAt(s-1-f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s-l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s-l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.replace_s=function(r,t,i){var s=i.length-(t-r);this.current=this.current.slice(0,r)+i+this.current.slice(t);this.limit+=s;if(this.cursor>=t)this.cursor+=s;else if(this.cursor>r)this.cursor=r;return s};this.slice_check=function(){if(this.bra<0||this.bra>this.ket||this.ket>this.limit||this.limit>this.current.length){return false}return true};this.slice_from=function(r){var t=false;if(this.slice_check()){this.replace_s(this.bra,this.ket,r);t=true}return t};this.slice_del=function(){return this.slice_from("")};this.insert=function(r,t,i){var s=this.replace_s(r,t,i);if(r<=this.bra)this.bra+=s;if(r<=this.ket)this.ket+=s};this.slice_to=function(){var r="";if(this.slice_check()){r=this.current.slice(this.bra,this.ket)}return r};this.assign_to=function(){return this.current.slice(0,this.limit)}};
ItalianStemmer=function(){var r=new BaseStemmer;var e=[["",-1,7],["qu",0,6],["á",0,1],["é",0,2],["í",0,3],["ó",0,4],["ú",0,5]];var i=[["",-1,3],["I",0,1],["U",0,2]];var a=[["la",-1,-1],["cela",0,-1],["gliela",0,-1],["mela",0,-1],["tela",0,-1],["vela",0,-1],["le",-1,-1],["cele",6,-1],["gliele",6,-1],["mele",6,-1],["tele",6,-1],["vele",6,-1],["ne",-1,-1],["cene",12,-1],["gliene",12,-1],["mene",12,-1],["sene",12,-1],["tene",12,-1],["vene",12,-1],["ci",-1,-1],["li",-1,-1],["celi",20,-1],["glieli",20,-1],["meli",20,-1],["teli",20,-1],["veli",20,-1],["gli",20,-1],["mi",-1,-1],["si",-1,-1],["ti",-1,-1],["vi",-1,-1],["lo",-1,-1],["celo",31,-1],["glielo",31,-1],["melo",31,-1],["telo",31,-1],["velo",31,-1]];var s=[["ando",-1,1],["endo",-1,1],["ar",-1,2],["er",-1,2],["ir",-1,2]];var o=[["ic",-1,-1],["abil",-1,-1],["os",-1,-1],["iv",-1,1]];var u=[["ic",-1,1],["abil",-1,1],["iv",-1,1]];var t=[["ica",-1,1],["logia",-1,3],["osa",-1,1],["ista",-1,1],["iva",-1,9],["anza",-1,1],["enza",-1,5],["ice",-1,1],["atrice",7,1],["iche",-1,1],["logie",-1,3],["abile",-1,1],["ibile",-1,1],["usione",-1,4],["azione",-1,2],["uzione",-1,4],["atore",-1,2],["ose",-1,1],["ante",-1,1],["mente",-1,1],["amente",19,7],["iste",-1,1],["ive",-1,9],["anze",-1,1],["enze",-1,5],["ici",-1,1],["atrici",25,1],["ichi",-1,1],["abili",-1,1],["ibili",-1,1],["ismi",-1,1],["usioni",-1,4],["azioni",-1,2],["uzioni",-1,4],["atori",-1,2],["osi",-1,1],["anti",-1,1],["amenti",-1,6],["imenti",-1,6],["isti",-1,1],["ivi",-1,9],["ico",-1,1],["ismo",-1,1],["oso",-1,1],["amento",-1,6],["imento",-1,6],["ivo",-1,9],["ità",-1,8],["istà",-1,1],["istè",-1,1],["istì",-1,1]];var c=[["isca",-1,1],["enda",-1,1],["ata",-1,1],["ita",-1,1],["uta",-1,1],["ava",-1,1],["eva",-1,1],["iva",-1,1],["erebbe",-1,1],["irebbe",-1,1],["isce",-1,1],["ende",-1,1],["are",-1,1],["ere",-1,1],["ire",-1,1],["asse",-1,1],["ate",-1,1],["avate",16,1],["evate",16,1],["ivate",16,1],["ete",-1,1],["erete",20,1],["irete",20,1],["ite",-1,1],["ereste",-1,1],["ireste",-1,1],["ute",-1,1],["erai",-1,1],["irai",-1,1],["isci",-1,1],["endi",-1,1],["erei",-1,1],["irei",-1,1],["assi",-1,1],["ati",-1,1],["iti",-1,1],["eresti",-1,1],["iresti",-1,1],["uti",-1,1],["avi",-1,1],["evi",-1,1],["ivi",-1,1],["isco",-1,1],["ando",-1,1],["endo",-1,1],["Yamo",-1,1],["iamo",-1,1],["avamo",-1,1],["evamo",-1,1],["ivamo",-1,1],["eremo",-1,1],["iremo",-1,1],["assimo",-1,1],["ammo",-1,1],["emmo",-1,1],["eremmo",54,1],["iremmo",54,1],["immo",-1,1],["ano",-1,1],["iscano",58,1],["avano",58,1],["evano",58,1],["ivano",58,1],["eranno",-1,1],["iranno",-1,1],["ono",-1,1],["iscono",65,1],["arono",65,1],["erono",65,1],["irono",65,1],["erebbero",-1,1],["irebbero",-1,1],["assero",-1,1],["essero",-1,1],["issero",-1,1],["ato",-1,1],["ito",-1,1],["uto",-1,1],["avo",-1,1],["evo",-1,1],["ivo",-1,1],["ar",-1,1],["ir",-1,1],["erà",-1,1],["irà",-1,1],["erò",-1,1],["irò",-1,1]];var l=[17,65,16,0,0,0,0,0,0,0,0,0,0,0,0,128,128,8,2,1];var n=[17,65,0,0,0,0,0,0,0,0,0,0,0,0,0,128,128,8,2];var f=[17];var b=0;var m=0;var k=0;function _(){var i;var a=r.cursor;while(true){var s=r.cursor;r:{r.bra=r.cursor;i=r.find_among(e);if(i==0){break r}r.ket=r.cursor;switch(i){case 1:if(!r.slice_from("à")){return false}break;case 2:if(!r.slice_from("è")){return false}break;case 3:if(!r.slice_from("ì")){return false}break;case 4:if(!r.slice_from("ò")){return false}break;case 5:if(!r.slice_from("ù")){return false}break;case 6:if(!r.slice_from("qU")){return false}break;case 7:if(r.cursor>=r.limit){break r}r.cursor++;break}continue}r.cursor=s;break}r.cursor=a;while(true){var o=r.cursor;r:{e:while(true){var u=r.cursor;i:{if(!r.in_grouping(l,97,249)){break i}r.bra=r.cursor;a:{var t=r.cursor;s:{if(!r.eq_s("u")){break s}r.ket=r.cursor;if(!r.in_grouping(l,97,249)){break s}if(!r.slice_from("U")){return false}break a}r.cursor=t;if(!r.eq_s("i")){break i}r.ket=r.cursor;if(!r.in_grouping(l,97,249)){break i}if(!r.slice_from("I")){return false}}r.cursor=u;break e}r.cursor=u;if(r.cursor>=r.limit){break r}r.cursor++}continue}r.cursor=o;break}return true}function v(){k=r.limit;m=r.limit;b=r.limit;var e=r.cursor;r:{e:{var i=r.cursor;i:{if(!r.in_grouping(l,97,249)){break i}a:{var a=r.cursor;s:{if(!r.out_grouping(l,97,249)){break s}o:while(true){u:{if(!r.in_grouping(l,97,249)){break u}break o}if(r.cursor>=r.limit){break s}r.cursor++}break a}r.cursor=a;if(!r.in_grouping(l,97,249)){break i}s:while(true){o:{if(!r.out_grouping(l,97,249)){break o}break s}if(r.cursor>=r.limit){break i}r.cursor++}}break e}r.cursor=i;if(!r.out_grouping(l,97,249)){break r}i:{var s=r.cursor;a:{if(!r.out_grouping(l,97,249)){break a}s:while(true){o:{if(!r.in_grouping(l,97,249)){break o}break s}if(r.cursor>=r.limit){break a}r.cursor++}break i}r.cursor=s;if(!r.in_grouping(l,97,249)){break r}if(r.cursor>=r.limit){break r}r.cursor++}}k=r.cursor}r.cursor=e;var o=r.cursor;r:{e:while(true){i:{if(!r.in_grouping(l,97,249)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.out_grouping(l,97,249)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}m=r.cursor;e:while(true){i:{if(!r.in_grouping(l,97,249)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.out_grouping(l,97,249)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}b=r.cursor}r.cursor=o;return true}function g(){var e;while(true){var a=r.cursor;r:{r.bra=r.cursor;e=r.find_among(i);if(e==0){break r}r.ket=r.cursor;switch(e){case 1:if(!r.slice_from("i")){return false}break;case 2:if(!r.slice_from("u")){return false}break;case 3:if(r.cursor>=r.limit){break r}r.cursor++;break}continue}r.cursor=a;break}return true}function d(){if(!(k<=r.cursor)){return false}return true}function w(){if(!(m<=r.cursor)){return false}return true}function h(){if(!(b<=r.cursor)){return false}return true}function p(){var e;r.ket=r.cursor;if(r.find_among_b(a)==0){return false}r.bra=r.cursor;e=r.find_among_b(s);if(e==0){return false}if(!d()){return false}switch(e){case 1:if(!r.slice_del()){return false}break;case 2:if(!r.slice_from("e")){return false}break}return true}function q(){var e;r.ket=r.cursor;e=r.find_among_b(t);if(e==0){return false}r.bra=r.cursor;switch(e){case 1:if(!h()){return false}if(!r.slice_del()){return false}break;case 2:if(!h()){return false}if(!r.slice_del()){return false}var i=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("ic")){r.cursor=r.limit-i;break r}r.bra=r.cursor;if(!h()){r.cursor=r.limit-i;break r}if(!r.slice_del()){return false}}break;case 3:if(!h()){return false}if(!r.slice_from("log")){return false}break;case 4:if(!h()){return false}if(!r.slice_from("u")){return false}break;case 5:if(!h()){return false}if(!r.slice_from("ente")){return false}break;case 6:if(!d()){return false}if(!r.slice_del()){return false}break;case 7:if(!w()){return false}if(!r.slice_del()){return false}var a=r.limit-r.cursor;r:{r.ket=r.cursor;e=r.find_among_b(o);if(e==0){r.cursor=r.limit-a;break r}r.bra=r.cursor;if(!h()){r.cursor=r.limit-a;break r}if(!r.slice_del()){return false}switch(e){case 1:r.ket=r.cursor;if(!r.eq_s_b("at")){r.cursor=r.limit-a;break r}r.bra=r.cursor;if(!h()){r.cursor=r.limit-a;break r}if(!r.slice_del()){return false}break}}break;case 8:if(!h()){return false}if(!r.slice_del()){return false}var s=r.limit-r.cursor;r:{r.ket=r.cursor;if(r.find_among_b(u)==0){r.cursor=r.limit-s;break r}r.bra=r.cursor;if(!h()){r.cursor=r.limit-s;break r}if(!r.slice_del()){return false}}break;case 9:if(!h()){return false}if(!r.slice_del()){return false}var c=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("at")){r.cursor=r.limit-c;break r}r.bra=r.cursor;if(!h()){r.cursor=r.limit-c;break r}if(!r.slice_del()){return false}r.ket=r.cursor;if(!r.eq_s_b("ic")){r.cursor=r.limit-c;break r}r.bra=r.cursor;if(!h()){r.cursor=r.limit-c;break r}if(!r.slice_del()){return false}}break}return true}function z(){if(r.cursor<k){return false}var e=r.limit_backward;r.limit_backward=k;r.ket=r.cursor;if(r.find_among_b(c)==0){r.limit_backward=e;return false}r.bra=r.cursor;if(!r.slice_del()){return false}r.limit_backward=e;return true}function I(){var e=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.in_grouping_b(n,97,242)){r.cursor=r.limit-e;break r}r.bra=r.cursor;if(!d()){r.cursor=r.limit-e;break r}if(!r.slice_del()){return false}r.ket=r.cursor;if(!r.eq_s_b("i")){r.cursor=r.limit-e;break r}r.bra=r.cursor;if(!d()){r.cursor=r.limit-e;break r}if(!r.slice_del()){return false}}var i=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("h")){r.cursor=r.limit-i;break r}r.bra=r.cursor;if(!r.in_grouping_b(f,99,103)){r.cursor=r.limit-i;break r}if(!d()){r.cursor=r.limit-i;break r}if(!r.slice_del()){return false}}return true}this.stem=function(){var e=r.cursor;_();r.cursor=e;v();r.limit_backward=r.cursor;r.cursor=r.limit;var i=r.limit-r.cursor;p();r.cursor=r.limit-i;var a=r.limit-r.cursor;r:{e:{var s=r.limit-r.cursor;i:{if(!q()){break i}break e}r.cursor=r.limit-s;if(!z()){break r}}}r.cursor=r.limit-a;var o=r.limit-r.cursor;I();r.cursor=r.limit-o;r.cursor=r.limit_backward;var u=r.cursor;g();r.cursor=u;return true};this["stemWord"]=function(e){r.setCurrent(e);this.stem();return r.getCurrent()}};
Stemmer = ItalianStemmer;


/**
 * Simple result scoring code.
 */
var Scorer = {
  // Implement the following function to further tweak the score for each result
  // The function takes a result array [filename, title, anchor, descr, score]
  // and returns the new score.
  /*
  score: function(result) {
    return result[4];
  },
  */

  // query matches the full name of an object
  objNameMatch: 11,
  // or matches in the last dotted part of the object name
  objPartialMatch: 6,
  // Additive scores depending on the priority of the object
  objPrio: {0:  15,   // used to be importantResults
            1:  5,   // used to be objectResults
            2: -5},  // used to be unimportantResults
  //  Used when the priority is not in the mapping.
  objPrioDefault: 0,

  // query found in title
  title: 15,
  // query found in terms
  term: 5
};



function splitQuery(query) {
    return query.split(/\s+/);
}


/**
 * Search Module
 */
var Search = {

  _index : null,
  _queued_query : null,
  _pulse_status : -1,

  init : function() {
      var params = $.getQueryParameters();
      if (params.q) {
          var query = params.q[0];
          $('input[name="q"]')[0].value = query;
          this.performSearch(query);
      }
  },

  loadIndex : function(url) {
    $.ajax({type: "GET", url: url, data: null,
            dataType: "script", cache: true,
            complete: function(jqxhr, textstatus) {
              if (textstatus != "success") {
                document.getElementById("searchindexloader").src = url;
              }
            }});
  },

  setIndex : function(index) {
    var q;
    this._index = index;
    if ((q = this._queued_query) !== null) {
      this._queued_query = null;
      Search.query(q);
    }
  },

  hasIndex : function() {
      return this._index !== null;
  },

  deferQuery : function(query) {
      this._queued_query = query;
  },

  stopPulse : function() {
      this._pulse_status = 0;
  },

  startPulse : function() {
    if (this._pulse_status >= 0)
        return;
    function pulse() {
      var i;
      Search._pulse_status = (Search._pulse_status + 1) % 4;
      var dotString = '';
      for (i = 0; i < Search._pulse_status; i++)
        dotString += '.';
      Search.dots.text(dotString);
      if (Search._pulse_status > -1)
        window.setTimeout(pulse, 500);
    }
    pulse();
  },

  /**
   * perform a search for something (or wait until index is loaded)
   */
  performSearch : function(query) {
    // create the required interface elements
    this.out = $('#search-results');
    this.title = $('<h2>' + _('Searching') + '</h2>').appendTo(this.out);
    this.dots = $('<span></span>').appendTo(this.title);
    this.status = $('<p style="display: none"></p>').appendTo(this.out);
    this.output = $('<ul class="search"/>').appendTo(this.out);

    $('#search-progress').text(_('Preparing search...'));
    this.startPulse();

    // index already loaded, the browser was quick!
    if (this.hasIndex())
      this.query(query);
    else
      this.deferQuery(query);
  },

  /**
   * execute search (requires search index to be loaded)
   */
  query : function(query) {
    var i;
    var stopwords = ["a", "abbia", "abbiamo", "abbiano", "abbiate", "ad", "agl", "agli", "ai", "al", "all", "alla", "alle", "allo", "anche", "avemmo", "avendo", "avesse", "avessero", "avessi", "avessimo", "aveste", "avesti", "avete", "aveva", "avevamo", "avevano", "avevate", "avevi", "avevo", "avrai", "avranno", "avrebbe", "avrebbero", "avrei", "avremmo", "avremo", "avreste", "avresti", "avrete", "avr\u00e0", "avr\u00f2", "avuta", "avute", "avuti", "avuto", "c", "che", "chi", "ci", "coi", "col", "come", "con", "contro", "cui", "da", "dagl", "dagli", "dai", "dal", "dall", "dalla", "dalle", "dallo", "degl", "degli", "dei", "del", "dell", "della", "delle", "dello", "di", "dov", "dove", "e", "ebbe", "ebbero", "ebbi", "ed", "era", "erano", "eravamo", "eravate", "eri", "ero", "essendo", "faccia", "facciamo", "facciano", "facciate", "faccio", "facemmo", "facendo", "facesse", "facessero", "facessi", "facessimo", "faceste", "facesti", "faceva", "facevamo", "facevano", "facevate", "facevi", "facevo", "fai", "fanno", "farai", "faranno", "farebbe", "farebbero", "farei", "faremmo", "faremo", "fareste", "faresti", "farete", "far\u00e0", "far\u00f2", "fece", "fecero", "feci", "fosse", "fossero", "fossi", "fossimo", "foste", "fosti", "fu", "fui", "fummo", "furono", "gli", "ha", "hai", "hanno", "ho", "i", "il", "in", "io", "l", "la", "le", "lei", "li", "lo", "loro", "lui", "ma", "mi", "mia", "mie", "miei", "mio", "ne", "negl", "negli", "nei", "nel", "nell", "nella", "nelle", "nello", "noi", "non", "nostra", "nostre", "nostri", "nostro", "o", "per", "perch\u00e9", "pi\u00f9", "quale", "quanta", "quante", "quanti", "quanto", "quella", "quelle", "quelli", "quello", "questa", "queste", "questi", "questo", "sarai", "saranno", "sarebbe", "sarebbero", "sarei", "saremmo", "saremo", "sareste", "saresti", "sarete", "sar\u00e0", "sar\u00f2", "se", "sei", "si", "sia", "siamo", "siano", "siate", "siete", "sono", "sta", "stai", "stanno", "starai", "staranno", "starebbe", "starebbero", "starei", "staremmo", "staremo", "stareste", "staresti", "starete", "star\u00e0", "star\u00f2", "stava", "stavamo", "stavano", "stavate", "stavi", "stavo", "stemmo", "stesse", "stessero", "stessi", "stessimo", "steste", "stesti", "stette", "stettero", "stetti", "stia", "stiamo", "stiano", "stiate", "sto", "su", "sua", "sue", "sugl", "sugli", "sui", "sul", "sull", "sulla", "sulle", "sullo", "suo", "suoi", "ti", "tra", "tu", "tua", "tue", "tuo", "tuoi", "tutti", "tutto", "un", "una", "uno", "vi", "voi", "vostra", "vostre", "vostri", "vostro", "\u00e8"];

    // stem the searchterms and add them to the correct list
    var stemmer = new Stemmer();
    var searchterms = [];
    var excluded = [];
    var hlterms = [];
    var tmp = splitQuery(query);
    var objectterms = [];
    for (i = 0; i < tmp.length; i++) {
      if (tmp[i] !== "") {
          objectterms.push(tmp[i].toLowerCase());
      }

      if ($u.indexOf(stopwords, tmp[i].toLowerCase()) != -1 || tmp[i].match(/^\d+$/) ||
          tmp[i] === "") {
        // skip this "word"
        continue;
      }
      // stem the word
      var word = stemmer.stemWord(tmp[i].toLowerCase());
      // prevent stemmer from cutting word smaller than two chars
      if(word.length < 3 && tmp[i].length >= 3) {
        word = tmp[i];
      }
      var toAppend;
      // select the correct list
      if (word[0] == '-') {
        toAppend = excluded;
        word = word.substr(1);
      }
      else {
        toAppend = searchterms;
        hlterms.push(tmp[i].toLowerCase());
      }
      // only add if not already in the list
      if (!$u.contains(toAppend, word))
        toAppend.push(word);
    }
    var highlightstring = '?highlight=' + $.urlencode(hlterms.join(" "));

    // console.debug('SEARCH: searching for:');
    // console.info('required: ', searchterms);
    // console.info('excluded: ', excluded);

    // prepare search
    var terms = this._index.terms;
    var titleterms = this._index.titleterms;

    // array of [filename, title, anchor, descr, score]
    var results = [];
    $('#search-progress').empty();

    // lookup as object
    for (i = 0; i < objectterms.length; i++) {
      var others = [].concat(objectterms.slice(0, i),
                             objectterms.slice(i+1, objectterms.length));
      results = results.concat(this.performObjectSearch(objectterms[i], others));
    }

    // lookup as search terms in fulltext
    results = results.concat(this.performTermsSearch(searchterms, excluded, terms, titleterms));

    // let the scorer override scores with a custom scoring function
    if (Scorer.score) {
      for (i = 0; i < results.length; i++)
        results[i][4] = Scorer.score(results[i]);
    }

    // now sort the results by score (in opposite order of appearance, since the
    // display function below uses pop() to retrieve items) and then
    // alphabetically
    results.sort(function(a, b) {
      var left = a[4];
      var right = b[4];
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        // same score: sort alphabetically
        left = a[1].toLowerCase();
        right = b[1].toLowerCase();
        return (left > right) ? -1 : ((left < right) ? 1 : 0);
      }
    });

    // for debugging
    //Search.lastresults = results.slice();  // a copy
    //console.info('search results:', Search.lastresults);

    // print the results
    var resultCount = results.length;
    function displayNextItem() {
      // results left, load the summary and display it
      if (results.length) {
        var item = results.pop();

        // black list 404 page from returning from the search results
        if (item[0] == "404") { // item[0] returns the URL for the page
          displayNextItem();
          return;
        }   

        
        var listItem = $('<li style="display:none"></li>');
        if (DOCUMENTATION_OPTIONS.FILE_SUFFIX === '') {
          // dirhtml builder
          var dirname = item[0] + '/';
          if (dirname.match(/\/index\/$/)) {
            dirname = dirname.substring(0, dirname.length-6);
          } else if (dirname == 'index/') {
            dirname = '';
          }
          listItem.append($('<a/>').attr('href',
            DOCUMENTATION_OPTIONS.URL_ROOT + dirname +
            highlightstring + item[2]).html(item[1]));
        } else {
          // normal html builders
          listItem.append($('<a/>').attr('href',
            item[0] + DOCUMENTATION_OPTIONS.FILE_SUFFIX +
            highlightstring + item[2]).html(item[1]));
        }
        if (item[3]) {
          listItem.append($('<span> (' + item[3] + ')</span>'));
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        } else if (DOCUMENTATION_OPTIONS.HAS_SOURCE) {
          var suffix = DOCUMENTATION_OPTIONS.SOURCELINK_SUFFIX;
          if (suffix === undefined) {
            suffix = '.txt';
          }
          $.ajax({url: DOCUMENTATION_OPTIONS.URL_ROOT + '_sources/' + item[5] + (item[5].slice(-suffix.length) === suffix ? '' : suffix),
                  dataType: "text",
                  complete: function(jqxhr, textstatus) {
                    var data = jqxhr.responseText;
                    if (data !== '' && data !== undefined) {
                      listItem.append(Search.makeSearchSummary(data, searchterms, hlterms));
                    }
                    Search.output.append(listItem);
                    listItem.slideDown(5, function() {
                      displayNextItem();
                    });
                  }});
        } else {
          // no source available, just display title
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        }
      }
      // search finished, update title and status message
      else {
        Search.stopPulse();
        Search.title.text(_('Search Results'));
        if (!resultCount)
          Search.status.text(_('Your search did not match any documents. Please make sure that all words are spelled correctly and that you\'ve selected enough categories.'));
        else
            Search.status.text(_('Search finished, found %s page(s) matching the search query.').replace('%s', resultCount));
        Search.status.fadeIn(500);
      }
    }
    displayNextItem();
  },

  /**
   * search for object names
   */
  performObjectSearch : function(object, otherterms) {
    var filenames = this._index.filenames;
    var docnames = this._index.docnames;
    var objects = this._index.objects;
    var objnames = this._index.objnames;
    var titles = this._index.titles;

    var i;
    var results = [];

    for (var prefix in objects) {
      for (var name in objects[prefix]) {
        var fullname = (prefix ? prefix + '.' : '') + name;
        if (fullname.toLowerCase().indexOf(object) > -1) {
          var score = 0;
          var parts = fullname.split('.');
          // check for different match types: exact matches of full name or
          // "last name" (i.e. last dotted part)
          if (fullname == object || parts[parts.length - 1] == object) {
            score += Scorer.objNameMatch;
          // matches in last name
          } else if (parts[parts.length - 1].indexOf(object) > -1) {
            score += Scorer.objPartialMatch;
          }
          var match = objects[prefix][name];
          var objname = objnames[match[1]][2];
          var title = titles[match[0]];
          // If more than one term searched for, we require other words to be
          // found in the name/title/description
          if (otherterms.length > 0) {
            var haystack = (prefix + ' ' + name + ' ' +
                            objname + ' ' + title).toLowerCase();
            var allfound = true;
            for (i = 0; i < otherterms.length; i++) {
              if (haystack.indexOf(otherterms[i]) == -1) {
                allfound = false;
                break;
              }
            }
            if (!allfound) {
              continue;
            }
          }
          var descr = objname + _(', in ') + title;

          var anchor = match[3];
          if (anchor === '')
            anchor = fullname;
          else if (anchor == '-')
            anchor = objnames[match[1]][1] + '-' + fullname;
          // add custom score for some objects according to scorer
          if (Scorer.objPrio.hasOwnProperty(match[2])) {
            score += Scorer.objPrio[match[2]];
          } else {
            score += Scorer.objPrioDefault;
          }
          results.push([docnames[match[0]], fullname, '#'+anchor, descr, score, filenames[match[0]]]);
        }
      }
    }

    return results;
  },

  /**
   * search for full-text terms in the index
   */
  performTermsSearch : function(searchterms, excluded, terms, titleterms) {
    var docnames = this._index.docnames;
    var filenames = this._index.filenames;
    var titles = this._index.titles;

    var i, j, file;
    var fileMap = {};
    var scoreMap = {};
    var results = [];

    // perform the search on the required terms
    for (i = 0; i < searchterms.length; i++) {
      var word = searchterms[i];
      var files = [];
      var _o = [
        {files: terms[word], score: Scorer.term},
        {files: titleterms[word], score: Scorer.title}
      ];

      // no match but word was a required one
      if ($u.every(_o, function(o){return o.files === undefined;})) {
        break;
      }
      // found search word in contents
      $u.each(_o, function(o) {
        var _files = o.files;
        if (_files === undefined)
          return

        if (_files.length === undefined)
          _files = [_files];
        files = files.concat(_files);

        // set score for the word in each file to Scorer.term
        for (j = 0; j < _files.length; j++) {
          file = _files[j];
          if (!(file in scoreMap))
            scoreMap[file] = {}
          scoreMap[file][word] = o.score;
        }
      });

      // create the mapping
      for (j = 0; j < files.length; j++) {
        file = files[j];
        if (file in fileMap)
          fileMap[file].push(word);
        else
          fileMap[file] = [word];
      }
    }

    // now check if the files don't contain excluded terms
    for (file in fileMap) {
      var valid = true;

      // check if all requirements are matched
      if (fileMap[file].length != searchterms.length)
          continue;

      // ensure that none of the excluded terms is in the search result
      for (i = 0; i < excluded.length; i++) {
        if (terms[excluded[i]] == file ||
            titleterms[excluded[i]] == file ||
            $u.contains(terms[excluded[i]] || [], file) ||
            $u.contains(titleterms[excluded[i]] || [], file)) {
          valid = false;
          break;
        }
      }

      // if we have still a valid result we can add it to the result list
      if (valid) {
        // select one (max) score for the file.
        // for better ranking, we should calculate ranking by using words statistics like basic tf-idf...
        var score = $u.max($u.map(fileMap[file], function(w){return scoreMap[file][w]}));
        results.push([docnames[file], titles[file], '', null, score, filenames[file]]);
      }
    }
    return results;
  },

  /**
   * helper function to return a node containing the
   * search summary for a given text. keywords is a list
   * of stemmed words, hlwords is the list of normal, unstemmed
   * words. the first one is used to find the occurrence, the
   * latter for highlighting it.
   */
  makeSearchSummary : function(text, keywords, hlwords) {
    var textLower = text.toLowerCase();
    var start = 0;
    $.each(keywords, function() {
      var i = textLower.indexOf(this.toLowerCase());
      if (i > -1)
        start = i;
    });
    start = Math.max(start - 120, 0);
    var excerpt = ((start > 0) ? '...' : '') +
      $.trim(text.substr(start, 240)) +
      ((start + 240 - text.length) ? '...' : '');
    var rv = $('<div class="context"></div>').text(excerpt);
    $.each(hlwords, function() {
      rv = rv.highlightText(this, 'highlighted');
    });
    return rv;
  }
};

$(document).ready(function() {
  Search.init();
});