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
RussianStemmer=function(){var r=new BaseStemmer;var e=[["в",-1,1],["ив",0,2],["ыв",0,2],["вши",-1,1],["ивши",3,2],["ывши",3,2],["вшись",-1,1],["ившись",6,2],["ывшись",6,2]];var i=[["ее",-1,1],["ие",-1,1],["ое",-1,1],["ые",-1,1],["ими",-1,1],["ыми",-1,1],["ей",-1,1],["ий",-1,1],["ой",-1,1],["ый",-1,1],["ем",-1,1],["им",-1,1],["ом",-1,1],["ым",-1,1],["его",-1,1],["ого",-1,1],["ему",-1,1],["ому",-1,1],["их",-1,1],["ых",-1,1],["ею",-1,1],["ою",-1,1],["ую",-1,1],["юю",-1,1],["ая",-1,1],["яя",-1,1]];var u=[["ем",-1,1],["нн",-1,1],["вш",-1,1],["ивш",2,2],["ывш",2,2],["щ",-1,1],["ющ",5,1],["ующ",6,2]];var s=[["сь",-1,1],["ся",-1,1]];var a=[["ла",-1,1],["ила",0,2],["ыла",0,2],["на",-1,1],["ена",3,2],["ете",-1,1],["ите",-1,2],["йте",-1,1],["ейте",7,2],["уйте",7,2],["ли",-1,1],["или",10,2],["ыли",10,2],["й",-1,1],["ей",13,2],["уй",13,2],["л",-1,1],["ил",16,2],["ыл",16,2],["ем",-1,1],["им",-1,2],["ым",-1,2],["н",-1,1],["ен",22,2],["ло",-1,1],["ило",24,2],["ыло",24,2],["но",-1,1],["ено",27,2],["нно",27,1],["ет",-1,1],["ует",30,2],["ит",-1,2],["ыт",-1,2],["ют",-1,1],["уют",34,2],["ят",-1,2],["ны",-1,1],["ены",37,2],["ть",-1,1],["ить",39,2],["ыть",39,2],["ешь",-1,1],["ишь",-1,2],["ю",-1,2],["ую",44,2]];var t=[["а",-1,1],["ев",-1,1],["ов",-1,1],["е",-1,1],["ие",3,1],["ье",3,1],["и",-1,1],["еи",6,1],["ии",6,1],["ами",6,1],["ями",6,1],["иями",10,1],["й",-1,1],["ей",12,1],["ией",13,1],["ий",12,1],["ой",12,1],["ам",-1,1],["ем",-1,1],["ием",18,1],["ом",-1,1],["ям",-1,1],["иям",21,1],["о",-1,1],["у",-1,1],["ах",-1,1],["ях",-1,1],["иях",26,1],["ы",-1,1],["ь",-1,1],["ю",-1,1],["ию",30,1],["ью",30,1],["я",-1,1],["ия",33,1],["ья",33,1]];var c=[["ост",-1,1],["ость",-1,1]];var f=[["ейше",-1,1],["н",-1,2],["ейш",-1,1],["ь",-1,3]];var l=[33,65,8,232];var o=0;var n=0;function b(){n=r.limit;o=r.limit;var e=r.cursor;r:{e:while(true){i:{if(!r.in_grouping(l,1072,1103)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}n=r.cursor;e:while(true){i:{if(!r.out_grouping(l,1072,1103)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.in_grouping(l,1072,1103)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.out_grouping(l,1072,1103)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}o=r.cursor}r.cursor=e;return true}function _(){if(!(o<=r.cursor)){return false}return true}function k(){var i;r.ket=r.cursor;i=r.find_among_b(e);if(i==0){return false}r.bra=r.cursor;switch(i){case 1:r:{var u=r.limit-r.cursor;e:{if(!r.eq_s_b("а")){break e}break r}r.cursor=r.limit-u;if(!r.eq_s_b("я")){return false}}if(!r.slice_del()){return false}break;case 2:if(!r.slice_del()){return false}break}return true}function m(){r.ket=r.cursor;if(r.find_among_b(i)==0){return false}r.bra=r.cursor;if(!r.slice_del()){return false}return true}function v(){var e;if(!m()){return false}var i=r.limit-r.cursor;r:{r.ket=r.cursor;e=r.find_among_b(u);if(e==0){r.cursor=r.limit-i;break r}r.bra=r.cursor;switch(e){case 1:e:{var s=r.limit-r.cursor;i:{if(!r.eq_s_b("а")){break i}break e}r.cursor=r.limit-s;if(!r.eq_s_b("я")){r.cursor=r.limit-i;break r}}if(!r.slice_del()){return false}break;case 2:if(!r.slice_del()){return false}break}}return true}function d(){r.ket=r.cursor;if(r.find_among_b(s)==0){return false}r.bra=r.cursor;if(!r.slice_del()){return false}return true}function g(){var e;r.ket=r.cursor;e=r.find_among_b(a);if(e==0){return false}r.bra=r.cursor;switch(e){case 1:r:{var i=r.limit-r.cursor;e:{if(!r.eq_s_b("а")){break e}break r}r.cursor=r.limit-i;if(!r.eq_s_b("я")){return false}}if(!r.slice_del()){return false}break;case 2:if(!r.slice_del()){return false}break}return true}function w(){r.ket=r.cursor;if(r.find_among_b(t)==0){return false}r.bra=r.cursor;if(!r.slice_del()){return false}return true}function h(){r.ket=r.cursor;if(r.find_among_b(c)==0){return false}r.bra=r.cursor;if(!_()){return false}if(!r.slice_del()){return false}return true}function q(){var e;r.ket=r.cursor;e=r.find_among_b(f);if(e==0){return false}r.bra=r.cursor;switch(e){case 1:if(!r.slice_del()){return false}r.ket=r.cursor;if(!r.eq_s_b("н")){return false}r.bra=r.cursor;if(!r.eq_s_b("н")){return false}if(!r.slice_del()){return false}break;case 2:if(!r.eq_s_b("н")){return false}if(!r.slice_del()){return false}break;case 3:if(!r.slice_del()){return false}break}return true}this.stem=function(){var e=r.cursor;r:{while(true){var i=r.cursor;e:{i:while(true){var u=r.cursor;u:{r.bra=r.cursor;if(!r.eq_s("ё")){break u}r.ket=r.cursor;r.cursor=u;break i}r.cursor=u;if(r.cursor>=r.limit){break e}r.cursor++}if(!r.slice_from("е")){return false}continue}r.cursor=i;break}}r.cursor=e;b();r.limit_backward=r.cursor;r.cursor=r.limit;if(r.cursor<n){return false}var s=r.limit_backward;r.limit_backward=n;var a=r.limit-r.cursor;r:{e:{var t=r.limit-r.cursor;i:{if(!k()){break i}break e}r.cursor=r.limit-t;var c=r.limit-r.cursor;i:{if(!d()){r.cursor=r.limit-c;break i}}i:{var f=r.limit-r.cursor;u:{if(!v()){break u}break i}r.cursor=r.limit-f;u:{if(!g()){break u}break i}r.cursor=r.limit-f;if(!w()){break r}}}}r.cursor=r.limit-a;var l=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("и")){r.cursor=r.limit-l;break r}r.bra=r.cursor;if(!r.slice_del()){return false}}var o=r.limit-r.cursor;h();r.cursor=r.limit-o;var _=r.limit-r.cursor;q();r.cursor=r.limit-_;r.limit_backward=s;r.cursor=r.limit_backward;return true};this["stemWord"]=function(e){r.setCurrent(e);this.stem();return r.getCurrent()}};
Stemmer = RussianStemmer;


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
    var stopwords = ["\u0430", "\u0431\u0435\u0437", "\u0431\u043e\u043b\u0435\u0435", "\u0431\u043e\u043b\u044c\u0448\u0435", "\u0431\u0443\u0434\u0435\u0442", "\u0431\u0443\u0434\u0442\u043e", "\u0431\u044b", "\u0431\u044b\u043b", "\u0431\u044b\u043b\u0430", "\u0431\u044b\u043b\u0438", "\u0431\u044b\u043b\u043e", "\u0431\u044b\u0442\u044c", "\u0432", "\u0432\u0430\u043c", "\u0432\u0430\u0441", "\u0432\u0434\u0440\u0443\u0433", "\u0432\u0435\u0434\u044c", "\u0432\u043e", "\u0432\u043e\u0442", "\u0432\u043f\u0440\u043e\u0447\u0435\u043c", "\u0432\u0441\u0435", "\u0432\u0441\u0435\u0433\u0434\u0430", "\u0432\u0441\u0435\u0433\u043e", "\u0432\u0441\u0435\u0445", "\u0432\u0441\u044e", "\u0432\u044b", "\u0433\u0434\u0435", "\u0433\u043e\u0432\u043e\u0440\u0438\u043b", "\u0434\u0430", "\u0434\u0430\u0436\u0435", "\u0434\u0432\u0430", "\u0434\u043b\u044f", "\u0434\u043e", "\u0434\u0440\u0443\u0433\u043e\u0439", "\u0435\u0433\u043e", "\u0435\u0435", "\u0435\u0439", "\u0435\u043c\u0443", "\u0435\u0441\u043b\u0438", "\u0435\u0441\u0442\u044c", "\u0435\u0449\u0435", "\u0436", "\u0436\u0435", "\u0436\u0438\u0437\u043d\u044c", "\u0437\u0430", "\u0437\u0430\u0447\u0435\u043c", "\u0437\u0434\u0435\u0441\u044c", "\u0438", "\u0438\u0437", "\u0438\u043b\u0438", "\u0438\u043c", "\u0438\u043d\u043e\u0433\u0434\u0430", "\u0438\u0445", "\u043a", "\u043a\u0430\u0436\u0435\u0442\u0441\u044f", "\u043a\u0430\u043a", "\u043a\u0430\u043a\u0430\u044f", "\u043a\u0430\u043a\u043e\u0439", "\u043a\u043e\u0433\u0434\u0430", "\u043a\u043e\u043d\u0435\u0447\u043d\u043e", "\u043a\u0442\u043e", "\u043a\u0443\u0434\u0430", "\u043b\u0438", "\u043b\u0443\u0447\u0448\u0435", "\u043c\u0435\u0436\u0434\u0443", "\u043c\u0435\u043d\u044f", "\u043c\u043d\u0435", "\u043c\u043d\u043e\u0433\u043e", "\u043c\u043e\u0436\u0435\u0442", "\u043c\u043e\u0436\u043d\u043e", "\u043c\u043e\u0439", "\u043c\u043e\u044f", "\u043c\u044b", "\u043d\u0430", "\u043d\u0430\u0434", "\u043d\u0430\u0434\u043e", "\u043d\u0430\u043a\u043e\u043d\u0435\u0446", "\u043d\u0430\u0441", "\u043d\u0435", "\u043d\u0435\u0433\u043e", "\u043d\u0435\u0435", "\u043d\u0435\u0439", "\u043d\u0435\u043b\u044c\u0437\u044f", "\u043d\u0435\u0442", "\u043d\u0438", "\u043d\u0438\u0431\u0443\u0434\u044c", "\u043d\u0438\u043a\u043e\u0433\u0434\u0430", "\u043d\u0438\u043c", "\u043d\u0438\u0445", "\u043d\u0438\u0447\u0435\u0433\u043e", "\u043d\u043e", "\u043d\u0443", "\u043e", "\u043e\u0431", "\u043e\u0434\u0438\u043d", "\u043e\u043d", "\u043e\u043d\u0430", "\u043e\u043d\u0438", "\u043e\u043f\u044f\u0442\u044c", "\u043e\u0442", "\u043f\u0435\u0440\u0435\u0434", "\u043f\u043e", "\u043f\u043e\u0434", "\u043f\u043e\u0441\u043b\u0435", "\u043f\u043e\u0442\u043e\u043c", "\u043f\u043e\u0442\u043e\u043c\u0443", "\u043f\u043e\u0447\u0442\u0438", "\u043f\u0440\u0438", "\u043f\u0440\u043e", "\u0440\u0430\u0437", "\u0440\u0430\u0437\u0432\u0435", "\u0441", "\u0441\u0430\u043c", "\u0441\u0432\u043e\u044e", "\u0441\u0435\u0431\u0435", "\u0441\u0435\u0431\u044f", "\u0441\u0435\u0433\u043e\u0434\u043d\u044f", "\u0441\u0435\u0439\u0447\u0430\u0441", "\u0441\u043a\u0430\u0437\u0430\u043b", "\u0441\u043a\u0430\u0437\u0430\u043b\u0430", "\u0441\u043a\u0430\u0437\u0430\u0442\u044c", "\u0441\u043e", "\u0441\u043e\u0432\u0441\u0435\u043c", "\u0442\u0430\u043a", "\u0442\u0430\u043a\u043e\u0439", "\u0442\u0430\u043c", "\u0442\u0435\u0431\u044f", "\u0442\u0435\u043c", "\u0442\u0435\u043f\u0435\u0440\u044c", "\u0442\u043e", "\u0442\u043e\u0433\u0434\u0430", "\u0442\u043e\u0433\u043e", "\u0442\u043e\u0436\u0435", "\u0442\u043e\u043b\u044c\u043a\u043e", "\u0442\u043e\u043c", "\u0442\u043e\u0442", "\u0442\u0440\u0438", "\u0442\u0443\u0442", "\u0442\u044b", "\u0443", "\u0443\u0436", "\u0443\u0436\u0435", "\u0445\u043e\u0440\u043e\u0448\u043e", "\u0445\u043e\u0442\u044c", "\u0447\u0435\u0433\u043e", "\u0447\u0435\u043b\u043e\u0432\u0435\u043a", "\u0447\u0435\u043c", "\u0447\u0435\u0440\u0435\u0437", "\u0447\u0442\u043e", "\u0447\u0442\u043e\u0431", "\u0447\u0442\u043e\u0431\u044b", "\u0447\u0443\u0442\u044c", "\u044d\u0442\u0438", "\u044d\u0442\u043e\u0433\u043e", "\u044d\u0442\u043e\u0439", "\u044d\u0442\u043e\u043c", "\u044d\u0442\u043e\u0442", "\u044d\u0442\u0443", "\u044f"];

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