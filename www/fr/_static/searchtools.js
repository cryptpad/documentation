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
FrenchStemmer=function(){var r=new BaseStemmer;var e=[["col",-1,-1],["par",-1,-1],["tap",-1,-1]];var i=[["",-1,7],["H",0,6],["He",1,4],["Hi",1,5],["I",0,1],["U",0,2],["Y",0,3]];var s=[["iqU",-1,3],["abl",-1,3],["Ièr",-1,4],["ièr",-1,4],["eus",-1,2],["iv",-1,1]];var a=[["ic",-1,2],["abil",-1,1],["iv",-1,3]];var u=[["iqUe",-1,1],["atrice",-1,2],["ance",-1,1],["ence",-1,5],["logie",-1,3],["able",-1,1],["isme",-1,1],["euse",-1,11],["iste",-1,1],["ive",-1,8],["if",-1,8],["usion",-1,4],["ation",-1,2],["ution",-1,4],["ateur",-1,2],["iqUes",-1,1],["atrices",-1,2],["ances",-1,1],["ences",-1,5],["logies",-1,3],["ables",-1,1],["ismes",-1,1],["euses",-1,11],["istes",-1,1],["ives",-1,8],["ifs",-1,8],["usions",-1,4],["ations",-1,2],["utions",-1,4],["ateurs",-1,2],["ments",-1,15],["ements",30,6],["issements",31,12],["ités",-1,7],["ment",-1,15],["ement",34,6],["issement",35,12],["amment",34,13],["emment",34,14],["aux",-1,10],["eaux",39,9],["eux",-1,1],["ité",-1,7]];var t=[["ira",-1,1],["ie",-1,1],["isse",-1,1],["issante",-1,1],["i",-1,1],["irai",4,1],["ir",-1,1],["iras",-1,1],["ies",-1,1],["îmes",-1,1],["isses",-1,1],["issantes",-1,1],["îtes",-1,1],["is",-1,1],["irais",13,1],["issais",13,1],["irions",-1,1],["issions",-1,1],["irons",-1,1],["issons",-1,1],["issants",-1,1],["it",-1,1],["irait",21,1],["issait",21,1],["issant",-1,1],["iraIent",-1,1],["issaIent",-1,1],["irent",-1,1],["issent",-1,1],["iront",-1,1],["ît",-1,1],["iriez",-1,1],["issiez",-1,1],["irez",-1,1],["issez",-1,1]];var c=[["a",-1,3],["era",0,2],["asse",-1,3],["ante",-1,3],["ée",-1,2],["ai",-1,3],["erai",5,2],["er",-1,2],["as",-1,3],["eras",8,2],["âmes",-1,3],["asses",-1,3],["antes",-1,3],["âtes",-1,3],["ées",-1,2],["ais",-1,3],["erais",15,2],["ions",-1,1],["erions",17,2],["assions",17,3],["erons",-1,2],["ants",-1,3],["és",-1,2],["ait",-1,3],["erait",23,2],["ant",-1,3],["aIent",-1,3],["eraIent",26,2],["èrent",-1,2],["assent",-1,3],["eront",-1,2],["ât",-1,3],["ez",-1,2],["iez",32,2],["eriez",33,2],["assiez",33,3],["erez",32,2],["é",-1,2]];var f=[["e",-1,3],["Ière",0,2],["ière",0,2],["ion",-1,1],["Ier",-1,2],["ier",-1,2]];var l=[["ell",-1,-1],["eill",-1,-1],["enn",-1,-1],["onn",-1,-1],["ett",-1,-1]];var o=[17,65,16,1,0,0,0,0,0,0,0,0,0,0,0,128,130,103,8,5];var n=[1,65,20,0,0,0,0,0,0,0,0,0,0,0,0,0,128];var b=0;var k=0;var m=0;function _(){while(true){var e=r.cursor;r:{e:while(true){var i=r.cursor;i:{s:{var s=r.cursor;a:{if(!r.in_grouping(o,97,251)){break a}r.bra=r.cursor;u:{var a=r.cursor;t:{if(!r.eq_s("u")){break t}r.ket=r.cursor;if(!r.in_grouping(o,97,251)){break t}if(!r.slice_from("U")){return false}break u}r.cursor=a;t:{if(!r.eq_s("i")){break t}r.ket=r.cursor;if(!r.in_grouping(o,97,251)){break t}if(!r.slice_from("I")){return false}break u}r.cursor=a;if(!r.eq_s("y")){break a}r.ket=r.cursor;if(!r.slice_from("Y")){return false}}break s}r.cursor=s;a:{r.bra=r.cursor;if(!r.eq_s("ë")){break a}r.ket=r.cursor;if(!r.slice_from("He")){return false}break s}r.cursor=s;a:{r.bra=r.cursor;if(!r.eq_s("ï")){break a}r.ket=r.cursor;if(!r.slice_from("Hi")){return false}break s}r.cursor=s;a:{r.bra=r.cursor;if(!r.eq_s("y")){break a}r.ket=r.cursor;if(!r.in_grouping(o,97,251)){break a}if(!r.slice_from("Y")){return false}break s}r.cursor=s;if(!r.eq_s("q")){break i}r.bra=r.cursor;if(!r.eq_s("u")){break i}r.ket=r.cursor;if(!r.slice_from("U")){return false}}r.cursor=i;break e}r.cursor=i;if(r.cursor>=r.limit){break r}r.cursor++}continue}r.cursor=e;break}return true}function v(){m=r.limit;k=r.limit;b=r.limit;var i=r.cursor;r:{e:{var s=r.cursor;i:{if(!r.in_grouping(o,97,251)){break i}if(!r.in_grouping(o,97,251)){break i}if(r.cursor>=r.limit){break i}r.cursor++;break e}r.cursor=s;i:{if(r.find_among(e)==0){break i}break e}r.cursor=s;if(r.cursor>=r.limit){break r}r.cursor++;i:while(true){s:{if(!r.in_grouping(o,97,251)){break s}break i}if(r.cursor>=r.limit){break r}r.cursor++}}m=r.cursor}r.cursor=i;var a=r.cursor;r:{e:while(true){i:{if(!r.in_grouping(o,97,251)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.out_grouping(o,97,251)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}k=r.cursor;e:while(true){i:{if(!r.in_grouping(o,97,251)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.out_grouping(o,97,251)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}b=r.cursor}r.cursor=a;return true}function d(){var e;while(true){var s=r.cursor;r:{r.bra=r.cursor;e=r.find_among(i);if(e==0){break r}r.ket=r.cursor;switch(e){case 1:if(!r.slice_from("i")){return false}break;case 2:if(!r.slice_from("u")){return false}break;case 3:if(!r.slice_from("y")){return false}break;case 4:if(!r.slice_from("ë")){return false}break;case 5:if(!r.slice_from("ï")){return false}break;case 6:if(!r.slice_del()){return false}break;case 7:if(r.cursor>=r.limit){break r}r.cursor++;break}continue}r.cursor=s;break}return true}function g(){if(!(m<=r.cursor)){return false}return true}function w(){if(!(k<=r.cursor)){return false}return true}function q(){if(!(b<=r.cursor)){return false}return true}function h(){var e;r.ket=r.cursor;e=r.find_among_b(u);if(e==0){return false}r.bra=r.cursor;switch(e){case 1:if(!q()){return false}if(!r.slice_del()){return false}break;case 2:if(!q()){return false}if(!r.slice_del()){return false}var i=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("ic")){r.cursor=r.limit-i;break r}r.bra=r.cursor;e:{var t=r.limit-r.cursor;i:{if(!q()){break i}if(!r.slice_del()){return false}break e}r.cursor=r.limit-t;if(!r.slice_from("iqU")){return false}}}break;case 3:if(!q()){return false}if(!r.slice_from("log")){return false}break;case 4:if(!q()){return false}if(!r.slice_from("u")){return false}break;case 5:if(!q()){return false}if(!r.slice_from("ent")){return false}break;case 6:if(!g()){return false}if(!r.slice_del()){return false}var c=r.limit-r.cursor;r:{r.ket=r.cursor;e=r.find_among_b(s);if(e==0){r.cursor=r.limit-c;break r}r.bra=r.cursor;switch(e){case 1:if(!q()){r.cursor=r.limit-c;break r}if(!r.slice_del()){return false}r.ket=r.cursor;if(!r.eq_s_b("at")){r.cursor=r.limit-c;break r}r.bra=r.cursor;if(!q()){r.cursor=r.limit-c;break r}if(!r.slice_del()){return false}break;case 2:e:{var f=r.limit-r.cursor;i:{if(!q()){break i}if(!r.slice_del()){return false}break e}r.cursor=r.limit-f;if(!w()){r.cursor=r.limit-c;break r}if(!r.slice_from("eux")){return false}}break;case 3:if(!q()){r.cursor=r.limit-c;break r}if(!r.slice_del()){return false}break;case 4:if(!g()){r.cursor=r.limit-c;break r}if(!r.slice_from("i")){return false}break}}break;case 7:if(!q()){return false}if(!r.slice_del()){return false}var l=r.limit-r.cursor;r:{r.ket=r.cursor;e=r.find_among_b(a);if(e==0){r.cursor=r.limit-l;break r}r.bra=r.cursor;switch(e){case 1:e:{var n=r.limit-r.cursor;i:{if(!q()){break i}if(!r.slice_del()){return false}break e}r.cursor=r.limit-n;if(!r.slice_from("abl")){return false}}break;case 2:e:{var b=r.limit-r.cursor;i:{if(!q()){break i}if(!r.slice_del()){return false}break e}r.cursor=r.limit-b;if(!r.slice_from("iqU")){return false}}break;case 3:if(!q()){r.cursor=r.limit-l;break r}if(!r.slice_del()){return false}break}}break;case 8:if(!q()){return false}if(!r.slice_del()){return false}var k=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("at")){r.cursor=r.limit-k;break r}r.bra=r.cursor;if(!q()){r.cursor=r.limit-k;break r}if(!r.slice_del()){return false}r.ket=r.cursor;if(!r.eq_s_b("ic")){r.cursor=r.limit-k;break r}r.bra=r.cursor;e:{var m=r.limit-r.cursor;i:{if(!q()){break i}if(!r.slice_del()){return false}break e}r.cursor=r.limit-m;if(!r.slice_from("iqU")){return false}}}break;case 9:if(!r.slice_from("eau")){return false}break;case 10:if(!w()){return false}if(!r.slice_from("al")){return false}break;case 11:r:{var _=r.limit-r.cursor;e:{if(!q()){break e}if(!r.slice_del()){return false}break r}r.cursor=r.limit-_;if(!w()){return false}if(!r.slice_from("eux")){return false}}break;case 12:if(!w()){return false}if(!r.out_grouping_b(o,97,251)){return false}if(!r.slice_del()){return false}break;case 13:if(!g()){return false}if(!r.slice_from("ant")){return false}return false;case 14:if(!g()){return false}if(!r.slice_from("ent")){return false}return false;case 15:var v=r.limit-r.cursor;if(!r.in_grouping_b(o,97,251)){return false}if(!g()){return false}r.cursor=r.limit-v;if(!r.slice_del()){return false}return false}return true}function p(){if(r.cursor<m){return false}var e=r.limit_backward;r.limit_backward=m;r.ket=r.cursor;if(r.find_among_b(t)==0){r.limit_backward=e;return false}r.bra=r.cursor;{var i=r.limit-r.cursor;r:{if(!r.eq_s_b("H")){break r}r.limit_backward=e;return false}r.cursor=r.limit-i}if(!r.out_grouping_b(o,97,251)){r.limit_backward=e;return false}if(!r.slice_del()){return false}r.limit_backward=e;return true}function z(){var e;if(r.cursor<m){return false}var i=r.limit_backward;r.limit_backward=m;r.ket=r.cursor;e=r.find_among_b(c);if(e==0){r.limit_backward=i;return false}r.bra=r.cursor;switch(e){case 1:if(!q()){r.limit_backward=i;return false}if(!r.slice_del()){return false}break;case 2:if(!r.slice_del()){return false}break;case 3:if(!r.slice_del()){return false}var s=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("e")){r.cursor=r.limit-s;break r}r.bra=r.cursor;if(!r.slice_del()){return false}}break}r.limit_backward=i;return true}function I(){var e;var i=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("s")){r.cursor=r.limit-i;break r}r.bra=r.cursor;var s=r.limit-r.cursor;e:{var a=r.limit-r.cursor;i:{if(!r.eq_s_b("Hi")){break i}break e}r.cursor=r.limit-a;if(!r.out_grouping_b(n,97,232)){r.cursor=r.limit-i;break r}}r.cursor=r.limit-s;if(!r.slice_del()){return false}}if(r.cursor<m){return false}var u=r.limit_backward;r.limit_backward=m;r.ket=r.cursor;e=r.find_among_b(f);if(e==0){r.limit_backward=u;return false}r.bra=r.cursor;switch(e){case 1:if(!q()){r.limit_backward=u;return false}r:{var t=r.limit-r.cursor;e:{if(!r.eq_s_b("s")){break e}break r}r.cursor=r.limit-t;if(!r.eq_s_b("t")){r.limit_backward=u;return false}}if(!r.slice_del()){return false}break;case 2:if(!r.slice_from("i")){return false}break;case 3:if(!r.slice_del()){return false}break}r.limit_backward=u;return true}function U(){var e=r.limit-r.cursor;if(r.find_among_b(l)==0){return false}r.cursor=r.limit-e;r.ket=r.cursor;if(r.cursor<=r.limit_backward){return false}r.cursor--;r.bra=r.cursor;if(!r.slice_del()){return false}return true}function H(){{var e=1;while(true){r:{if(!r.out_grouping_b(o,97,251)){break r}e--;continue}break}if(e>0){return false}}r.ket=r.cursor;r:{var i=r.limit-r.cursor;e:{if(!r.eq_s_b("é")){break e}break r}r.cursor=r.limit-i;if(!r.eq_s_b("è")){return false}}r.bra=r.cursor;if(!r.slice_from("e")){return false}return true}this.stem=function(){var e=r.cursor;_();r.cursor=e;v();r.limit_backward=r.cursor;r.cursor=r.limit;var i=r.limit-r.cursor;r:{e:{var s=r.limit-r.cursor;i:{var a=r.limit-r.cursor;s:{var u=r.limit-r.cursor;a:{if(!h()){break a}break s}r.cursor=r.limit-u;a:{if(!p()){break a}break s}r.cursor=r.limit-u;if(!z()){break i}}r.cursor=r.limit-a;var t=r.limit-r.cursor;s:{r.ket=r.cursor;a:{var c=r.limit-r.cursor;u:{if(!r.eq_s_b("Y")){break u}r.bra=r.cursor;if(!r.slice_from("i")){return false}break a}r.cursor=r.limit-c;if(!r.eq_s_b("ç")){r.cursor=r.limit-t;break s}r.bra=r.cursor;if(!r.slice_from("c")){return false}}}break e}r.cursor=r.limit-s;if(!I()){break r}}}r.cursor=r.limit-i;var f=r.limit-r.cursor;U();r.cursor=r.limit-f;var l=r.limit-r.cursor;H();r.cursor=r.limit-l;r.cursor=r.limit_backward;var o=r.cursor;d();r.cursor=o;return true};this["stemWord"]=function(e){r.setCurrent(e);this.stem();return r.getCurrent()}};
Stemmer = FrenchStemmer;


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
    var stopwords = ["ai", "aie", "aient", "aies", "ait", "as", "au", "aura", "aurai", "auraient", "aurais", "aurait", "auras", "aurez", "auriez", "aurions", "aurons", "auront", "aux", "avaient", "avais", "avait", "avec", "avez", "aviez", "avions", "avons", "ayant", "ayez", "ayons", "c", "ce", "ceci", "cela", "cel\u00e0", "ces", "cet", "cette", "d", "dans", "de", "des", "du", "elle", "en", "es", "est", "et", "eu", "eue", "eues", "eurent", "eus", "eusse", "eussent", "eusses", "eussiez", "eussions", "eut", "eux", "e\u00fbmes", "e\u00fbt", "e\u00fbtes", "furent", "fus", "fusse", "fussent", "fusses", "fussiez", "fussions", "fut", "f\u00fbmes", "f\u00fbt", "f\u00fbtes", "ici", "il", "ils", "j", "je", "l", "la", "le", "les", "leur", "leurs", "lui", "m", "ma", "mais", "me", "mes", "moi", "mon", "m\u00eame", "n", "ne", "nos", "notre", "nous", "on", "ont", "ou", "par", "pas", "pour", "qu", "que", "quel", "quelle", "quelles", "quels", "qui", "s", "sa", "sans", "se", "sera", "serai", "seraient", "serais", "serait", "seras", "serez", "seriez", "serions", "serons", "seront", "ses", "soi", "soient", "sois", "soit", "sommes", "son", "sont", "soyez", "soyons", "suis", "sur", "t", "ta", "te", "tes", "toi", "ton", "tu", "un", "une", "vos", "votre", "vous", "y", "\u00e0", "\u00e9taient", "\u00e9tais", "\u00e9tait", "\u00e9tant", "\u00e9tiez", "\u00e9tions", "\u00e9t\u00e9", "\u00e9t\u00e9e", "\u00e9t\u00e9es", "\u00e9t\u00e9s", "\u00eates"];

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