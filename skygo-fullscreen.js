// ==UserScript==
// @name        de.sky.silverlight_fullscreen
// @namespace   de.sky.silverlight_fullscreen
// @include     http://www.skygo.sky.de/*
// @version     1
// @grant       none
// ==/UserScript==
(function($) {
  var button = $('<button id="fullscreen">Initializing</button>');
  button.css({
    background: '#0270B7',
    color: 'white',
    position: 'fixed',
    zIndex: 9999,
    top: '10px',
    left: '10px',
  });
  button.appendTo($('body'));
  
  var getPlayer = function() {
    var player = $('#PolymediaShowPlayer');
    if (player.length !== 1) {
      button.text('Player not found');
    }
    return player;
  };
  
  var bindGoFullscreen = function() {
    button.text('Fullscreen');
    button.unbind('click');
    button.bind('click', function() {
      goFullscreen();
    });
  };
  
  var goFullscreen = function() {
    var player = getPlayer();
    
    sessionStorage.setItem('style',  player.attr('style'));
    sessionStorage.setItem('width',  player.attr('width'));
    sessionStorage.setItem('height', player.attr('height'));
    
    player.css({
      position: 'fixed',
      top: '0px',
      left: '0px',
      zIndex: 9990
    });
    player.attr('width',  $(window).width());
    player.attr('height', $(window).height());
    
    bindRestoreFullscreen();
  };
  
  var bindRestoreFullscreen = function() {
    button.text('Normal');
    button.unbind('click');
    button.bind('click', function() {
      restoreFullscreen();
    });
  };
  
  var restoreFullscreen = function() {
    var player = getPlayer();
    player.attr('style',  sessionStorage.getItem('style'));
    player.attr('width',  sessionStorage.getItem('width'));
    player.attr('height', sessionStorage.getItem('height'));
    
    bindGoFullscreen();
  };
  
  bindGoFullscreen();
})(jQuery);
$.nonConflict();
