(function(){
    var script = {
 "borderSize": 0,
 "children": [
  "this.MainViewer",
  "this.Container_22BB12F4_3075_D173_4184_EC3BC4955417",
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
  "this.Container_50E57579_424B_1CC1_41C7_2A7D7DE232E6",
  "this.Container_58B883FD_4396_7C5F_41B3_61F626F14414"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "rootPlayer",
 "gap": 10,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": "100%",
 "shadow": false,
 "defaultVRPointer": "laser",
 "downloadEnabled": false,
 "layout": "absolute",
 "scripts": {
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "existsKey": function(key){  return key in window; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "unregisterKey": function(key){  delete window[key]; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "registerKey": function(key, value){  window[key] = value; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getKey": function(key){  return window[key]; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; }
 },
 "scrollBarMargin": 2,
 "overflow": "visible",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundPreloadEnabled": true,
 "borderRadius": 0,
 "desktopMipmappingEnabled": false,
 "paddingRight": 0,
 "definitions": [{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "HR - 001",
 "id": "panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_254AF695_2AC5_9D5D_41BD_64E56B35FE8C",
  "this.overlay_259BA2F0_2AC2_7AD3_41B1_C87ACE9877D4"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_20940352_2ABF_BBD6_41B6_40F41847804E",
   "yaw": 177.02,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -91.25
  },
  {
   "panorama": "this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89",
   "yaw": -81.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 175.44
  }
 ],
 "hfovMin": "150%"
},
{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "L - 001",
 "id": "panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_3BF73FE3_2BC2_8AF5_41B0_211C7B3A6D51",
  "this.overlay_3BA964C7_2BDD_9D3D_41C5_58D7C7F7A563",
  "this.overlay_3A8ACF9D_2BDF_8B4D_4191_D30B2959E02D",
  "this.overlay_3A0B8CD6_2BDD_8EDE_417E_83CB78893350"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725",
   "yaw": 12.66,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 161.59
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639"
  },
  {
   "panorama": "this.panorama_20944F78_2ABF_8BD3_417F_067398301215",
   "yaw": 101.83,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 140.42
  },
  {
   "panorama": "this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA",
   "yaw": 175.44,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -81.56
  }
 ]
},
{
 "items": [
  {
   "media": "this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89",
   "camera": "this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639",
   "camera": "this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_20944F78_2ABF_8BD3_417F_067398301215",
   "camera": "this.panorama_20944F78_2ABF_8BD3_417F_067398301215_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA",
   "camera": "this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_20940352_2ABF_BBD6_41B6_40F41847804E",
   "camera": "this.panorama_20940352_2ABF_BBD6_41B6_40F41847804E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725",
   "camera": "this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE",
   "camera": "this.panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85",
   "camera": "this.panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F00C1B0_301A_61CB_41A7_77DFFA0E4D64",
 "initialPosition": {
  "yaw": -4.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_21CB314C_301A_6154_41A8_22868C7FC74F",
 "initialPosition": {
  "yaw": 165.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "M - 001",
 "id": "panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_391A5657_2BC2_7DDD_41C2_37150F855823"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89",
   "yaw": 161.59,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 12.66
  }
 ],
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F34A1CE_301A_6157_41BE_3EBC68C82839",
 "initialPosition": {
  "yaw": 98.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F59C1E2_301A_614C_41AB_8734027584D0",
 "initialPosition": {
  "yaw": 179.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_20940352_2ABF_BBD6_41B6_40F41847804E_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "S - 001",
 "id": "panorama_20944F78_2ABF_8BD3_417F_067398301215",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_39DAA10D_2BC2_974D_41C1_98743381421A"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89",
   "yaw": 140.42,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 101.83
  }
 ],
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_21E90165_301A_6154_41C7_2D7F4643F2D6",
 "initialPosition": {
  "yaw": 146.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F0491BA_301A_613F_41B2_E806E7F9C9CF",
 "initialPosition": {
  "yaw": -18.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "displayMovements": [
  {
   "easing": "linear",
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "targetPitch": 0,
   "easing": "cubic_in_out",
   "duration": 3000,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetStereographicFactor": 0
  }
 ],
 "displayOriginPosition": {
  "hfov": 165,
  "yaw": 0,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90,
  "stereographicFactor": 1
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "C - 001",
 "id": "panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_3E394EB3_3016_23CD_41C2_CD8FD5A74174"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639",
   "yaw": 80.68,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -14.09
  }
 ],
 "hfovMin": "150%"
},
{
 "audio": {
  "oggUrl": "media/audio_3C7938AA_2BBE_9577_41A4_FDFFF9C11150.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_3C7938AA_2BBE_9577_41A4_FDFFF9C11150.mp3"
 },
 "id": "audio_3C7938AA_2BBE_9577_41A4_FDFFF9C11150",
 "class": "MediaAudio",
 "data": {
  "label": "0618(1)"
 },
 "autoplay": true
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F2ED1D8_301A_617C_41C6_B8BD96FE4E9E",
 "initialPosition": {
  "yaw": -167.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "L - 002",
 "id": "panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_3AC8045F_2BC2_9DCD_4191_34DF4A6A1B8F",
  "this.overlay_3A940D8C_2BC3_8F33_41AD_AE3E4C7AF3F0",
  "this.overlay_3ABED005_2BCD_953D_41B2_BE07AAC3F11F",
  "this.overlay_39769358_2BCE_7BD3_41A1_25FB81297177",
  "this.overlay_3992BBA3_2BCD_8B75_41A4_6C87139A7CDA"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725"
  },
  {
   "panorama": "this.panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE",
   "yaw": -14.09,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 80.68
  },
  {
   "panorama": "this.panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85",
   "yaw": -0.8,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -33.37
  }
 ],
 "hfovMin": "150%"
},
{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "HR - 002",
 "id": "panorama_20940352_2ABF_BBD6_41B6_40F41847804E",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_3B365D35_2BC5_8F5D_41C3_EE7A7C8F0239"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA",
   "yaw": -91.25,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 177.02
  }
 ],
 "hfovMin": "150%"
},
{
 "rollOverFontColor": "#FFFFFF",
 "fontFamily": "Arial",
 "class": "Menu",
 "opacity": 0.4,
 "children": [
  {
   "label": "L - 001",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  },
  {
   "label": "L - 002",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  },
  {
   "label": "S - 001",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  },
  {
   "label": "HR - 001",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  },
  {
   "label": "HR - 002",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  },
  {
   "label": "M - 001",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  },
  {
   "label": "C - 001",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  },
  {
   "label": "G - 001",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "label": "Media",
 "id": "Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "selectedFontColor": "#FFFFFF",
 "selectedBackgroundColor": "#202020",
 "rollOverBackgroundColor": "#000000",
 "rollOverOpacity": 0.8,
 "backgroundColor": "#404040",
 "fontColor": "#FFFFFF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_22198170_301A_614B_419F_66848F2F3F3C",
 "initialPosition": {
  "yaw": 88.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F4EB1F4_301A_6134_41C1_0B3AB8D9F597",
 "initialPosition": {
  "yaw": -2.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_20944F78_2ABF_8BD3_417F_067398301215_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "gyroscopeEnabled": true,
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "items": [
  {
   "media": "this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89",
   "camera": "this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639",
   "camera": "this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_20944F78_2ABF_8BD3_417F_067398301215",
   "camera": "this.panorama_20944F78_2ABF_8BD3_417F_067398301215_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA",
   "camera": "this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_20940352_2ABF_BBD6_41B6_40F41847804E",
   "camera": "this.panorama_20940352_2ABF_BBD6_41B6_40F41847804E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725",
   "camera": "this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE",
   "camera": "this.panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_21FA815B_301A_617C_41A4_7AFC9E80C462",
 "initialPosition": {
  "yaw": -99.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "partial": false,
 "cardboardMenu": "this.Menu_21BF3128_301A_1EDB_4198_9A37A42C0DC7",
 "label": "G - 001",
 "id": "panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_24C0AD24_2AC2_8F73_41B9_1DC477773DFB"
 ],
 "hfov": 360,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_t.jpg",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639",
   "yaw": -33.37,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -0.8
  }
 ],
 "hfovMin": "120%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F5261EC_301A_615B_41C0_54DBD47DA509",
 "initialPosition": {
  "yaw": -78.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_3F3A51C5_301A_6155_41A3_793745A1DC90",
 "initialPosition": {
  "yaw": -39.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 }
},
{
 "toolTipPaddingBottom": 7,
 "toolTipTextShadowBlurRadius": 3,
 "paddingTop": 0,
 "left": 0,
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "toolTipShadowColor": "#333333",
 "toolTipFontWeight": "normal",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontFamily": "Georgia",
 "toolTipFontStyle": "normal",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipTextShadowOpacity": 0,
 "minHeight": 50,
 "progressLeft": 0,
 "propagateClick": true,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipFontColor": "#FFFFFF",
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarBorderSize": 0,
 "minWidth": 100,
 "paddingLeft": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#000000",
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "toolTipPaddingRight": 10,
 "vrPointerSelectionTime": 2000,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "shadow": false,
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "vrPointerColor": "#FFFFFF",
 "toolTipDisplayTime": 600,
 "progressBarOpacity": 1,
 "top": 0,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "progressBorderRadius": 0,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "toolTipOpacity": 0.5,
 "data": {
  "name": "Main Viewer"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipFontSize": 13,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "borderSize": 0,
 "children": [
  "this.Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
  "this.Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
  "this.Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83"
 ],
 "paddingTop": 0,
 "left": 70,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_22BB12F4_3075_D173_4184_EC3BC4955417",
 "width": 550,
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": 34,
 "scrollBarWidth": 10,
 "overflow": "visible",
 "height": 98,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--STICKER"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "right": "1.27%",
 "width": 58,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "maxWidth": 58,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "bottom": "2.51%",
 "height": 58,
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand"
},
{
 "borderSize": 0,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "gap": 10,
 "right": "0%",
 "width": 115.05,
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "0%",
 "scrollBarWidth": 10,
 "overflow": "scroll",
 "height": 641,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "-- SETTINGS"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
  "this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
 "width": 330,
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "0%",
 "scrollBarWidth": 10,
 "overflow": "scroll",
 "height": "100%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "minWidth": 1,
 "visible": false,
 "borderSize": 0,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "right": "0%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.6,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--INFO photo"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "visible": false,
 "borderSize": 0,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "right": "0%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.6,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "visible": false,
 "borderSize": 0,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "right": "0%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.6,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--LOCATION"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "visible": false,
 "borderSize": 0,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "right": "0%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.6,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--FLOORPLAN"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "visible": false,
 "borderSize": 0,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "right": "0%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.6,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "visible": false,
 "borderSize": 0,
 "children": [
  "this.Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
  "this.Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
 "right": "0%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.6,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "--REALTOR"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#04A3E1",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Container_50F91F27_424B_0C40_41C3_4AC948480017",
  "this.Container_546964AC_4259_1C47_41B4_89BC8EEE450A"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_50E57579_424B_1CC1_41C7_2A7D7DE232E6",
 "width": "5.247%",
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "bottom": "3.14%",
 "height": "43.457%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container7538"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Container_4DF6648C_43C9_009F_41B4_06D470FF1669",
  "this.Container_4D37021E_43C9_03B8_41CC_28E8F98A7511"
 ],
 "paddingTop": 0,
 "left": "7.24%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_58B883FD_4396_7C5F_41B3_61F626F14414",
 "width": "76.357%",
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "bottom": "3.04%",
 "height": "76.859%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container4248"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "maxWidth": 58,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "height": 58,
 "borderRadius": 0,
 "mode": "toggle",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed_rollover.png",
 "minHeight": 1,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "maxWidth": 58,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "height": 58,
 "borderRadius": 0,
 "mode": "toggle",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed_rollover.png",
 "minHeight": 1,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton MUTE"
 },
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png"
},
{
 "items": [
  {
   "yaw": -81.56,
   "hfov": 3.89,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0_HS_0_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": -2.23,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89, this.camera_3F00C1B0_301A_61CB_41A7_77DFFA0E4D64); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "id": "overlay_254AF695_2AC5_9D5D_41BD_64E56B35FE8C",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 3.89,
   "yaw": -81.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -2.23
  }
 ]
},
{
 "items": [
  {
   "yaw": 177.02,
   "hfov": 6.16,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0_HS_1_0.png",
      "width": 46,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   },
   "pitch": -3.93,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_20940352_2ABF_BBD6_41B6_40F41847804E, this.camera_22198170_301A_614B_419F_66848F2F3F3C); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "id": "overlay_259BA2F0_2AC2_7AD3_41B1_C87ACE9877D4",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 6.16,
   "yaw": 177.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.93
  }
 ]
},
{
 "items": [
  {
   "yaw": 101.83,
   "hfov": 10.49,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_0_0.png",
      "width": 78,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -2.75,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_20944F78_2ABF_8BD3_417F_067398301215, this.camera_3F3A51C5_301A_6155_41A3_793745A1DC90); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "id": "overlay_3BF73FE3_2BC2_8AF5_41B0_211C7B3A6D51",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 10.49,
   "yaw": 101.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   },
   "pitch": -2.75
  }
 ]
},
{
 "items": [
  {
   "yaw": 12.66,
   "hfov": 3.55,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_1_0.png",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   },
   "pitch": -2.52,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725, this.camera_3F0491BA_301A_613F_41B2_E806E7F9C9CF); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "id": "overlay_3BA964C7_2BDD_9D3D_41C5_58D7C7F7A563",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 3.55,
   "yaw": 12.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": -2.52
  }
 ]
},
{
 "items": [
  {
   "hfov": 4.35,
   "image": "this.AnimatedImageResource_394CC32E_2BC5_9B4F_417A_0F955EAD7CE4",
   "pitch": -7.21,
   "yaw": 1.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "id": "overlay_3A8ACF9D_2BDF_8B4D_4191_D30B2959E02D",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03a"
 },
 "maps": [
  {
   "hfov": 4.35,
   "yaw": 1.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.21
  }
 ]
},
{
 "items": [
  {
   "yaw": 175.44,
   "hfov": 3.26,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_3_0.png",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   },
   "pitch": -3.52,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA, this.camera_3F34A1CE_301A_6157_41BE_3EBC68C82839); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "id": "overlay_3A0B8CD6_2BDD_8EDE_417E_83CB78893350",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 3.26,
   "yaw": 175.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -3.52
  }
 ]
},
{
 "items": [
  {
   "yaw": 161.59,
   "hfov": 7.08,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0_HS_0_0.png",
      "width": 53,
      "class": "ImageResourceLevel",
      "height": 64
     }
    ]
   },
   "pitch": -3.17,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89, this.camera_3F2ED1D8_301A_617C_41C6_B8BD96FE4E9E); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "id": "overlay_391A5657_2BC2_7DDD_41C2_37150F855823",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.08,
   "yaw": 161.59,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20974C94_2ABF_8D53_41C2_5998B1CA9725_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "pitch": -3.17
  }
 ]
},
{
 "items": [
  {
   "yaw": 140.42,
   "hfov": 8.62,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0_HS_0_0.png",
      "width": 64,
      "class": "ImageResourceLevel",
      "height": 47
     }
    ]
   },
   "pitch": -3.6,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89, this.camera_3F5261EC_301A_615B_41C0_54DBD47DA509); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "id": "overlay_39DAA10D_2BC2_974D_41C1_98743381421A",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 8.62,
   "yaw": 140.42,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20944F78_2ABF_8BD3_417F_067398301215_0_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.6
  }
 ]
},
{
 "items": [
  {
   "yaw": 80.68,
   "hfov": 5.65,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0_HS_0_0.png",
      "width": 42,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   },
   "pitch": -5.01,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639, this.camera_21CB314C_301A_6154_41A8_22868C7FC74F); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "id": "overlay_3E394EB3_3016_23CD_41C2_CD8FD5A74174",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 5.65,
   "yaw": 80.68,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.01
  }
 ]
},
{
 "items": [
  {
   "yaw": 23.59,
   "hfov": 7.83,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_0_0.png",
      "width": 58,
      "class": "ImageResourceLevel",
      "height": 67
     }
    ]
   },
   "pitch": -4.9,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "id": "overlay_3AC8045F_2BC2_9DCD_4191_34DF4A6A1B8F",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.83,
   "yaw": 23.59,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -4.9
  }
 ]
},
{
 "items": [
  {
   "yaw": -0.8,
   "hfov": 3.9,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_1_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 26
     }
    ]
   },
   "pitch": -3.24,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85, this.camera_21E90165_301A_6154_41C7_2D7F4643F2D6); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "id": "overlay_3A940D8C_2BC3_8F33_41AD_AE3E4C7AF3F0",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 3.9,
   "yaw": -0.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.24
  }
 ]
},
{
 "items": [
  {
   "yaw": -14.09,
   "hfov": 5.73,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_2_0.png",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 63
     }
    ]
   },
   "pitch": -3.01,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3B05272F_2BC6_9B4D_4189_DC98D50A1ABE, this.camera_21FA815B_301A_617C_41A4_7AFC9E80C462); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "id": "overlay_3ABED005_2BCD_953D_41B2_BE07AAC3F11F",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 5.73,
   "yaw": -14.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   },
   "pitch": -3.01
  }
 ]
},
{
 "items": [
  {
   "yaw": 167.53,
   "hfov": 5.69,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_3_0.png",
      "width": 42,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   },
   "pitch": -5.2,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "id": "overlay_39769358_2BCE_7BD3_41A1_25FB81297177",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 5.69,
   "yaw": 167.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   },
   "pitch": -5.2
  }
 ]
},
{
 "items": [
  {
   "hfov": 7.19,
   "image": "this.AnimatedImageResource_394F932F_2BC5_9B4D_41A0_EE8B9F950DEF",
   "pitch": -9.21,
   "yaw": -176.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "id": "overlay_3992BBA3_2BCD_8B75_41A4_6C87139A7CDA",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03a"
 },
 "maps": [
  {
   "hfov": 7.19,
   "yaw": -176.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.21
  }
 ]
},
{
 "items": [
  {
   "yaw": -91.25,
   "hfov": 9.5,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0_HS_0_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 74
     }
    ]
   },
   "pitch": -2.88,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2097F066_2ABF_B5FF_41A9_4C17DC9F42AA, this.camera_3F4EB1F4_301A_6134_41C1_0B3AB8D9F597); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "id": "overlay_3B365D35_2BC5_8F5D_41C3_EE7A7C8F0239",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 9.5,
   "yaw": -91.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_20940352_2ABF_BBD6_41B6_40F41847804E_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.88
  }
 ]
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "maxWidth": 58,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "height": 58,
 "borderRadius": 0,
 "mode": "toggle",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed_rollover.png",
 "minHeight": 1,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton HS "
 },
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "maxWidth": 58,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "height": 58,
 "borderRadius": 0,
 "mode": "toggle",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed_rollover.png",
 "minHeight": 1,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png"
},
{
 "items": [
  {
   "yaw": -33.37,
   "hfov": 3.8,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_1_HS_0_0.png",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   },
   "pitch": -0.69,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639, this.camera_3F59C1E2_301A_614C_41AB_8734027584D0); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "id": "overlay_24C0AD24_2AC2_8F73_41B9_1DC477773DFB",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 3.8,
   "yaw": -33.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_219A8397_2ABE_7B5D_41C2_B0506E8C4B85_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   },
   "pitch": -0.69
  }
 ]
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Image_4EE5F6BF_41A0_81CB_41B1_1DE1A6565D38"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0.18%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
 "width": 314,
 "layout": "absolute",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 7,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "scroll",
 "top": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "shadowVerticalLength": 0,
 "height": 42,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "data": {
  "name": "white block"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Image_4ED9537E_41A1_874A_41C1_08E8B3C9B069",
  "this.Image_588A0363_41A0_877B_41C3_5D919767CB3D",
  "this.Image_5963ECFE_41A7_814A_41B1_28ADA8FA79F2",
  "this.Image_59FD31E7_41A1_837B_41CA_5FDA1A844094",
  "this.Image_5B84D225_41A1_80FE_4182_5744BD082173",
  "this.Image_5BF1307D_41E0_814E_41C3_7BE679482BFB"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
 "width": 314,
 "layout": "absolute",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 7,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "bottom": 1,
 "shadowVerticalLength": 0,
 "height": 53,
 "borderRadius": 0,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0.01
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "visible": false,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "data": {
  "name": "blue block"
 }
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "left": 10,
 "paddingBottom": 0,
 "id": "Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83",
 "width": 391,
 "shadow": false,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "text": "LOREM IPSUM",
 "top": 0,
 "backgroundOpacity": 0,
 "height": 75,
 "borderRadius": 0,
 "fontSize": 61,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "fontStyle": "italic",
 "class": "Label",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "text 1"
 },
 "minWidth": 1,
 "fontWeight": "bold",
 "visible": false,
 "fontColor": "#000000"
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "gap": 10,
 "right": "0%",
 "width": 110,
 "layout": "horizontal",
 "shadow": false,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "visible",
 "top": "0%",
 "scrollBarWidth": 10,
 "height": 110,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "button menu sup"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.Image_4D3870DF_4257_15C2_41C3_D3DCF8869E88",
  "this.Image_5244FDC1_4259_0FC1_416D_239F8C833A78"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "gap": 3,
 "right": "0%",
 "width": "91.304%",
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "height": "85.959%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "-button set"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.Container_21F34780_3014_BF93_41A2_9BF700588BEC",
  "this.IconButton_223F0171_3014_B375_41C1_61063C3D73B3"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
 "width": 66,
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "0%",
 "scrollBarWidth": 10,
 "overflow": "scroll",
 "height": "100%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "- COLLAPSE"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
  "this.IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
  "this.HTMLText_4E82D1A1_41A0_83F6_41C1_8F0D3A250167"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD",
 "gap": 10,
 "right": 0,
 "width": 330,
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "0%",
 "scrollBarWidth": 10,
 "overflow": "visible",
 "height": "100%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "- EXPANDED"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "right": "15%",
 "shadowVerticalLength": 0,
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 25,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "scroll",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "paddingTop": 20,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "right": "15%",
 "layout": "vertical",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "visible",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "80%",
 "borderRadius": 0,
 "paddingRight": 20,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container X global"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "right": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 25,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "visible",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "horizontalAlign": "center",
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "right": "15%",
 "shadowVerticalLength": 0,
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 25,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "scroll",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "paddingTop": 20,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "right": "15%",
 "layout": "vertical",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "visible",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "80%",
 "borderRadius": 0,
 "paddingRight": 20,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container X global"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "right": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 25,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "visible",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "horizontalAlign": "center",
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "right": "15%",
 "shadowVerticalLength": 0,
 "layout": "vertical",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 25,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "visible",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "horizontalAlign": "center",
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
  "this.Container_1E19D23C_57F1_802D_41B0_92437DF80B82"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
 "right": "15%",
 "shadowVerticalLength": 0,
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadow": true,
 "shadowBlurRadius": 25,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "gap": 10,
 "overflow": "scroll",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "horizontalAlign": "left",
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF"
 ],
 "paddingTop": 20,
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C",
 "right": "15%",
 "layout": "vertical",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "visible",
 "top": "10%",
 "scrollBarWidth": 10,
 "bottom": "80%",
 "borderRadius": 0,
 "paddingRight": 20,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container X global"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_2B90E40F_3593_B9CB_41B4_408768336038"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_50F91F27_424B_0C40_41C3_4AC948480017",
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "height": "21.928%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container8437"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Image_4D3C7CFD_4392_045F_41BD_B71D1DBE1518",
  "this.Image_4D2F7E58_4392_07A5_41C0_C535119A8467",
  "this.IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_546964AC_4259_1C47_41B4_89BC8EEE450A",
 "width": "71.91%",
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "bottom": "23.39%",
 "height": "48.2%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container9886"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.Image_5617B085_43AE_1CAE_41CC_8FF53A5EBA65"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_4DF6648C_43C9_009F_41B4_06D470FF1669",
 "width": "66.351%",
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "top": "0%",
 "scrollBarWidth": 10,
 "height": "100%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container3396"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Image_58A0CA8B_4392_0CBA_41A3_BAE15310237F"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_4D37021E_43C9_03B8_41CC_28E8F98A7511",
 "width": "77.883%",
 "layout": "absolute",
 "shadow": false,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "top": "0%",
 "scrollBarWidth": 10,
 "height": "98.501%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container3434"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_394CC32E_2BC5_9B4F_417A_0F955EAD7CE4",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_2094C6C9_2ABF_BD35_41B7_19BCDD796F89_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_394F932F_2BC5_9B4D_41A0_EE8B9F950DEF",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_2095A9D0_2ABF_B6D3_41BA_5788AB320639_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ]
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_4EE5F6BF_41A0_81CB_41B1_1DE1A6565D38",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_4EE5F6BF_41A0_81CB_41B1_1DE1A6565D38.png",
 "maxWidth": 635,
 "backgroundOpacity": 0,
 "maxHeight": 59,
 "bottom": "8.75%",
 "height": "67.391%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "ministry of revenue"
 },
 "scaleMode": "fit_inside",
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_4ED9537E_41A1_874A_41C1_08E8B3C9B069",
 "width": "32.903%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_4ED9537E_41A1_874A_41C1_08E8B3C9B069.png",
 "maxWidth": 167,
 "backgroundOpacity": 0,
 "maxHeight": 59,
 "top": "19.43%",
 "borderRadius": 0,
 "height": "60.377%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image5496"
 },
 "scaleMode": "fit_inside",
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_588A0363_41A0_877B_41C3_5D919767CB3D",
 "width": "79.355%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_588A0363_41A0_877B_41C3_5D919767CB3D.png",
 "maxWidth": 469,
 "backgroundOpacity": 0,
 "maxHeight": 59,
 "top": "0%",
 "borderRadius": 0,
 "height": "98.113%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image11167"
 },
 "scaleMode": "fit_inside",
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_5963ECFE_41A7_814A_41B1_28ADA8FA79F2",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_5963ECFE_41A7_814A_41B1_28ADA8FA79F2.png",
 "maxWidth": 880,
 "backgroundOpacity": 0,
 "maxHeight": 59,
 "top": "0%",
 "borderRadius": 0,
 "height": "94.34%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image11246"
 },
 "scaleMode": "fit_inside",
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_59FD31E7_41A1_837B_41CA_5FDA1A844094",
 "width": "46.774%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_59FD31E7_41A1_837B_41CA_5FDA1A844094.png",
 "maxWidth": 321,
 "backgroundOpacity": 0,
 "maxHeight": 59,
 "top": "20.75%",
 "borderRadius": 0,
 "height": "47.17%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image11319"
 },
 "scaleMode": "fit_inside",
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_5B84D225_41A1_80FE_4182_5744BD082173",
 "width": "50.645%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_5B84D225_41A1_80FE_4182_5744BD082173.png",
 "maxWidth": 395,
 "backgroundOpacity": 0,
 "maxHeight": 59,
 "top": "16.98%",
 "borderRadius": 0,
 "height": "49.057%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image11499"
 },
 "scaleMode": "fit_inside",
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_5BF1307D_41E0_814E_41C3_7BE679482BFB",
 "width": "53.226%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_5BF1307D_41E0_814E_41C3_7BE679482BFB.png",
 "maxWidth": 396,
 "backgroundOpacity": 0,
 "maxHeight": 59,
 "top": "11.32%",
 "borderRadius": 0,
 "height": "62.264%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image11621"
 },
 "scaleMode": "fit_inside",
 "visible": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "height": 60,
 "borderRadius": 0,
 "mode": "toggle",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed_rollover.png",
 "minHeight": 1,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "image button menu"
 },
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "id": "Image_4D3870DF_4257_15C2_41C3_D3DCF8869E88",
 "width": "45.71%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_4D3870DF_4257_15C2_41C3_D3DCF8869E88.png",
 "maxWidth": 58,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "height": "10.163%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "click": "this.openLink('http://https://www.instagram.com/mellacreatives/', '_blank')",
 "class": "Image",
 "verticalAlign": "middle",
 "data": {
  "name": "Image5138"
 },
 "minWidth": 1,
 "scaleMode": "fit_inside",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "id": "Image_5244FDC1_4259_0FC1_416D_239F8C833A78",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_5244FDC1_4259_0FC1_416D_239F8C833A78.png",
 "maxWidth": 58,
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "height": "8.167%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.openLink('http://https://www.linkedin.com/company/mella-creative-studio/', '_blank')",
 "class": "Image",
 "verticalAlign": "middle",
 "data": {
  "name": "Image4905"
 },
 "minWidth": 1,
 "scaleMode": "fit_inside",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "minWidth": 1,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_21F34780_3014_BF93_41A2_9BF700588BEC",
 "width": 36,
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.4,
 "overflow": "scroll",
 "top": "0%",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#000000"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container black"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": 10,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_223F0171_3014_B375_41C1_61063C3D73B3",
 "width": 50,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3.png",
 "maxWidth": 80,
 "backgroundOpacity": 0,
 "maxHeight": 80,
 "bottom": "40%",
 "top": "40%",
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3_rollover.png",
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, false, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, false, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, true, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton arrow"
 },
 "cursor": "hand"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Container_0B85764A_2D07_4D95_41A5_3AC872515A8C"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
 "width": "90%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "top": "0%",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
 "right": 9,
 "width": 50,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882.png",
 "maxWidth": 50,
 "backgroundOpacity": 0,
 "maxHeight": 50,
 "bottom": "40%",
 "top": "40%",
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882_rollover.png",
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton collapse"
 },
 "cursor": "hand"
},
{
 "borderSize": 0,
 "paddingTop": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "id": "HTMLText_4E82D1A1_41A0_83F6_41C1_8F0D3A250167",
 "right": "0%",
 "width": "30.303%",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "5.97%",
 "scrollBarWidth": 10,
 "height": "5.236%",
 "borderRadius": 0,
 "paddingRight": 10,
 "propagateClick": false,
 "minHeight": 1,
 "class": "HTMLText",
 "paddingLeft": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:0.64vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.64vmin;font-family:'Segoe UI';\"/></p></div>",
 "data": {
  "name": "HTMLText5367"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000"
},
{
 "borderSize": 0,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "gap": 10,
 "width": "85%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "data": {
  "name": "-left"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "gap": 0,
 "width": "50%",
 "layout": "vertical",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 50,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "data": {
  "name": "-right"
 },
 "minWidth": 460,
 "scrollBarOpacity": 0.51,
 "scrollBarColor": "#0069A3",
 "contentOpaque": false,
 "paddingLeft": 50
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "width": "25%",
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "height": "75%",
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "paddingRight": 0,
 "propagateClick": false,
 "pressedRollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed_rollover.jpg",
 "minHeight": 50,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "minWidth": 50,
 "cursor": "hand",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg"
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 140,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "header"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "paddingTop": 10,
 "left": 0,
 "paddingBottom": 70,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemThumbnailBorderRadius": 0,
 "width": "100%",
 "selectedItemLabelFontWeight": "bold",
 "itemMode": "normal",
 "gap": 26,
 "horizontalAlign": "center",
 "itemLabelHorizontalAlign": "center",
 "itemLabelFontFamily": "Oswald",
 "itemLabelFontStyle": "italic",
 "scrollBarMargin": 2,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "backgroundOpacity": 0,
 "itemOpacity": 1,
 "selectedItemLabelFontColor": "#04A3E1",
 "itemVerticalAlign": "top",
 "itemLabelPosition": "bottom",
 "scrollBarWidth": 10,
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemBorderRadius": 0,
 "height": "92%",
 "itemMinHeight": 50,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemPaddingLeft": 3,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "propagateClick": true,
 "minHeight": 1,
 "selectedItemThumbnailShadow": true,
 "class": "ThumbnailGrid",
 "itemMinWidth": 50,
 "verticalAlign": "middle",
 "itemThumbnailShadow": false,
 "scrollBarOpacity": 0.5,
 "itemBackgroundOpacity": 0,
 "itemPaddingTop": 3,
 "scrollBarColor": "#04A3E1",
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "minWidth": 1,
 "borderSize": 0,
 "paddingLeft": 70,
 "scrollBarVisible": "rollOver",
 "itemLabelGap": 7,
 "itemThumbnailHeight": 125,
 "shadow": false,
 "itemHeight": 160,
 "itemLabelTextDecoration": "none",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelFontWeight": "normal",
 "itemThumbnailWidth": 220,
 "bottom": -0.2,
 "itemLabelFontSize": 16,
 "borderRadius": 5,
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "paddingRight": 70,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemLabelFontColor": "#666666",
 "itemBackgroundColorDirection": "vertical",
 "rollOverItemLabelFontColor": "#04A3E1",
 "itemHorizontalAlign": "center",
 "data": {
  "name": "ThumbnailList"
 },
 "itemPaddingRight": 3,
 "itemPaddingBottom": 3,
 "itemThumbnailOpacity": 1,
 "itemMaxHeight": 1000,
 "itemWidth": 220,
 "itemMaxWidth": 1000
},
{
 "borderSize": 0,
 "scrollEnabled": true,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "paddingBottom": 0,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "width": "100%",
 "shadow": false,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "backgroundOpacity": 1,
 "insetBorder": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "WebFrame",
 "data": {
  "name": "WebFrame"
 },
 "minWidth": 1,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "width": "25%",
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "height": "75%",
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed_rollover.jpg",
 "minHeight": 50,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "minWidth": 50,
 "cursor": "hand",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg"
},
{
 "toolTipPaddingBottom": 4,
 "toolTipTextShadowBlurRadius": 3,
 "paddingTop": 0,
 "left": 0,
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "toolTipShadowColor": "#333333",
 "toolTipFontWeight": "normal",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipFontStyle": "normal",
 "height": "99.975%",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipTextShadowOpacity": 0,
 "minHeight": 1,
 "progressLeft": 0,
 "propagateClick": true,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipFontColor": "#606060",
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarBorderSize": 0,
 "minWidth": 1,
 "paddingLeft": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "toolTipPaddingRight": 6,
 "vrPointerSelectionTime": 2000,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "shadow": false,
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "vrPointerColor": "#FFFFFF",
 "toolTipDisplayTime": 600,
 "progressBarOpacity": 1,
 "top": 0,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "progressBorderRadius": 0,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipOpacity": 1,
 "data": {
  "name": "Floor Plan"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 140,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "header"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "data": {
  "name": "Container photo"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "children": [
  "this.Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
 "gap": 10,
 "width": "55%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "data": {
  "name": "-left"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "children": [
  "this.Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
  "this.Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
  "this.Container_1E18523C_57F1_802D_41B1_88C86CD9A273"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "id": "Container_1E19D23C_57F1_802D_41B0_92437DF80B82",
 "gap": 0,
 "width": "45%",
 "layout": "vertical",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "data": {
  "name": "-right"
 },
 "minWidth": 460,
 "scrollBarOpacity": 0.51,
 "scrollBarColor": "#0069A3",
 "contentOpaque": false,
 "paddingLeft": 60
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF",
 "width": "25%",
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF.jpg",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "height": "75%",
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_rollover.jpg",
 "paddingRight": 0,
 "propagateClick": false,
 "pressedRollOverIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_pressed_rollover.jpg",
 "minHeight": 50,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "minWidth": 50,
 "cursor": "hand",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_pressed.jpg"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "7.87%",
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_2B90E40F_3593_B9CB_41B4_408768336038",
 "width": 71,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038.png",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "bottom": "1.5%",
 "height": 61,
 "borderRadius": 0,
 "mode": "toggle",
 "rollOverIconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038_rollover.png",
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "click": "if(!this.Container_546964AC_4259_1C47_41B4_89BC8EEE450A.get('visible')){ this.setComponentVisibility(this.Container_546964AC_4259_1C47_41B4_89BC8EEE450A, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_546964AC_4259_1C47_41B4_89BC8EEE450A, false, 0, null, null, false) }",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Info"
 },
 "cursor": "hand"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "id": "Image_4D3C7CFD_4392_045F_41BD_B71D1DBE1518",
 "right": "3.13%",
 "width": "60.938%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_4D3C7CFD_4392_045F_41BD_B71D1DBE1518.png",
 "maxWidth": 84,
 "backgroundOpacity": 0,
 "maxHeight": 84,
 "top": "3.5%",
 "borderRadius": 0,
 "height": "42.529%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.openLink('http://mella@mella-cs.com', '_blank')",
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image2783"
 },
 "minWidth": 1,
 "scaleMode": "fit_inside",
 "cursor": "hand"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "id": "Image_4D2F7E58_4392_07A5_41C0_C535119A8467",
 "right": "4.69%",
 "width": "57.813%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_4D2F7E58_4392_07A5_41C0_C535119A8467.png",
 "maxWidth": 84,
 "backgroundOpacity": 0,
 "maxHeight": 84,
 "bottom": "30.53%",
 "height": "28.5%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.openLink('http://mella-cs.com', '_blank')",
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image2877"
 },
 "minWidth": 1,
 "scaleMode": "fit_inside",
 "cursor": "hand"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F",
 "right": "0%",
 "width": 44,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F.png",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "bottom": "4.5%",
 "height": 44,
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F_rollover.png",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false); this.openLink('http://https://maps.google.com/maps?q=8.998697,38.747010&ll=8.998697,38.747010&z=16', '_blank')",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Location"
 },
 "cursor": "hand"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_5617B085_43AE_1CAE_41CC_8FF53A5EBA65",
 "width": "6.786%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_5617B085_43AE_1CAE_41CC_8FF53A5EBA65.png",
 "maxWidth": 1202,
 "backgroundOpacity": 0,
 "maxHeight": 998,
 "bottom": "1.63%",
 "height": "5.865%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "click": "if(!this.Container_4D37021E_43C9_03B8_41CC_28E8F98A7511.get('visible')){ this.setComponentVisibility(this.Container_4D37021E_43C9_03B8_41CC_28E8F98A7511, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_4D37021E_43C9_03B8_41CC_28E8F98A7511, false, 0, null, null, false) }",
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image3661"
 },
 "scaleMode": "fit_inside"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_58A0CA8B_4392_0CBA_41A3_BAE15310237F",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_58A0CA8B_4392_0CBA_41A3_BAE15310237F.png",
 "maxWidth": 1012,
 "backgroundOpacity": 0,
 "maxHeight": 1185,
 "top": "0%",
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_4D37021E_43C9_03B8_41CC_28E8F98A7511, false, 0, null, null, false)",
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image4301"
 },
 "scaleMode": "fit_inside"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "children": [
  "this.Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
  "this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
  "this.Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
  "this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
  "this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
  "this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
  "this.Container_1758A215_31FA_0014_41B6_9A4A5384548B",
  "this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
  "this.Container_168D8311_3106_01EC_41B0_F2D40886AB88"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 40,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 40,
 "id": "Container_0B85764A_2D07_4D95_41A5_3AC872515A8C",
 "width": "100%",
 "shadow": false,
 "gap": 10,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.7,
 "top": "0%",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 40,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 40,
 "data": {
  "name": "- Buttons set"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "maxWidth": 2000,
 "backgroundOpacity": 0,
 "maxHeight": 1000,
 "top": "0%",
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "Image"
 },
 "scaleMode": "fit_outside"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "gap": 0,
 "width": "100%",
 "layout": "horizontal",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "height": 60,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 0,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container space"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 30,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "gap": 10,
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 520,
 "class": "Container",
 "verticalAlign": "top",
 "data": {
  "name": "Container text"
 },
 "minWidth": 100,
 "scrollBarOpacity": 0.79,
 "scrollBarColor": "#E73B2C",
 "contentOpaque": false,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "gap": 10,
 "width": 370,
 "layout": "horizontal",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 40,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container space"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "backgroundColorDirection": "vertical"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "right": 20,
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "height": "36.14%",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed_rollover.jpg",
 "minHeight": 50,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 },
 "minWidth": 50,
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "right": 20,
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "height": "36.14%",
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed_rollover.jpg",
 "minHeight": 50,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 },
 "minWidth": 50,
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg"
},
{
 "toolTipPaddingBottom": 4,
 "toolTipTextShadowBlurRadius": 3,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "toolTipShadowColor": "#333333",
 "toolTipFontWeight": "normal",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipFontStyle": "normal",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipTextShadowOpacity": 0,
 "minHeight": 1,
 "progressLeft": 0,
 "propagateClick": true,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipFontColor": "#606060",
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarBorderSize": 0,
 "minWidth": 1,
 "paddingLeft": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "toolTipPaddingRight": 6,
 "vrPointerSelectionTime": 2000,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "shadow": false,
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "vrPointerColor": "#FFFFFF",
 "toolTipDisplayTime": 600,
 "progressBarOpacity": 1,
 "top": "0%",
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "progressBorderRadius": 0,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipOpacity": 1,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "minWidth": 50,
 "borderSize": 0,
 "paddingTop": 0,
 "left": 10,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "width": "14.22%",
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "bottom": "20%",
 "top": "20%",
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed_rollover.png",
 "minHeight": 50,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "right": 10,
 "width": "14.22%",
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "bottom": "20%",
 "top": "20%",
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed_rollover.png",
 "minHeight": 50,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton >"
 },
 "minWidth": 50,
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "right": 20,
 "width": "10%",
 "shadow": false,
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "height": "10%",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "paddingRight": 0,
 "propagateClick": true,
 "pressedRollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed_rollover.jpg",
 "minHeight": 50,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 },
 "minWidth": 50,
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "center",
 "url": "skin/Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1.jpg",
 "maxWidth": 2000,
 "backgroundOpacity": 0,
 "maxHeight": 1000,
 "top": "0%",
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "bottom",
 "paddingLeft": 0,
 "data": {
  "name": "Image40635"
 },
 "scaleMode": "fit_outside"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
 "gap": 0,
 "width": "100%",
 "layout": "horizontal",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "5%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 0,
 "class": "Container",
 "verticalAlign": "top",
 "data": {
  "name": "Container space"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "children": [
  "this.HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
  "this.Container_1E18623C_57F1_802D_41D5_C4D10C61A206"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 30,
 "id": "Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
 "gap": 10,
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "100%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 520,
 "class": "Container",
 "verticalAlign": "top",
 "data": {
  "name": "Container text"
 },
 "minWidth": 100,
 "scrollBarOpacity": 0.79,
 "scrollBarColor": "#E73B2C",
 "contentOpaque": false,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1E18523C_57F1_802D_41B1_88C86CD9A273",
 "gap": 10,
 "width": 370,
 "layout": "horizontal",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 40,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Container space"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "backgroundColorDirection": "vertical"
},
{
 "minWidth": 40,
 "borderSize": 0,
 "paddingTop": 0,
 "left": "0%",
 "paddingBottom": 0,
 "id": "Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "left",
 "url": "skin/Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19.png",
 "maxWidth": 1095,
 "backgroundOpacity": 0,
 "maxHeight": 1095,
 "top": "0%",
 "borderRadius": 0,
 "height": "25%",
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 30,
 "class": "Image",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "Image Company"
 },
 "scaleMode": "fit_inside"
},
{
 "borderSize": 0,
 "children": [
  "this.Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
  "this.Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
  "this.Container_106C4A62_2D09_C594_41C0_0D00619DF541",
  "this.Button_0A054365_2D09_CB9F_4145_8C365B373D19",
  "this.Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
  "this.Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
  "this.Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
  "this.Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
  "this.Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
  "this.Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
  "this.Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
  "this.Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
  "this.Container_207ECEAD_3035_51EC_41A3_EE49910C654D"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
 "gap": 0,
 "right": "0%",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "26%",
 "scrollBarWidth": 10,
 "bottom": "26%",
 "overflow": "scroll",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "-Level 1"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
  "this.HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
  "this.Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
  "this.Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "gap": 5,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "height": 130,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "bottom",
 "paddingLeft": 0,
 "data": {
  "name": "-Container footer"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
  "this.Container_2A2DB53B_310E_001C_41BA_0206228E495C",
  "this.Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
  "this.Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
  "this.Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
  "this.Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
  "this.Button_2A2C053B_310E_001C_41A2_583DE489828C",
  "this.Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
  "this.Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
  "this.Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
  "this.Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
  "this.Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
  "this.Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "gap": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "25%",
 "scrollBarWidth": 10,
 "bottom": "25%",
 "overflow": "scroll",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "-Level 2-1"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
  "this.Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
  "this.Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
  "this.Button_15A10DDC_31FA_0014_4185_021C898E177D",
  "this.Button_15A13DDC_31FA_0014_41C5_41AE80876834",
  "this.Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
  "this.Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
  "this.Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
  "this.Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
  "this.Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
  "this.Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
  "this.Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
  "this.Button_159EBDDD_31FA_0014_41C8_935504B30727"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "gap": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "25%",
 "scrollBarWidth": 10,
 "bottom": "25%",
 "overflow": "scroll",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "-Level 2-2"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
  "this.Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
  "this.Container_17578D7D_31FA_0015_41BE_353D3005648A",
  "this.Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
  "this.Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
  "this.Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
  "this.Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
  "this.Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
  "this.Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
  "this.Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
  "this.Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
  "this.Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
  "this.Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "gap": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "25%",
 "scrollBarWidth": 10,
 "bottom": "25%",
 "overflow": "scroll",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "-Level 2-3"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.Button_175A5214_31FA_0014_4198_930DF49BADD9",
  "this.Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
  "this.Container_1759B215_31FA_0014_41C0_84C99CBD5517",
  "this.Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
  "this.Button_17598215_31FA_0014_41AC_1166AB319171",
  "this.Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
  "this.Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
  "this.Button_17593215_31FA_0014_41C0_42BAFB0080F0",
  "this.Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
  "this.Button_17590215_31FA_0014_41C1_2B2D012DCC76",
  "this.Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
  "this.Button_17596215_31FA_0014_41C6_A42670770708",
  "this.Button_1758B215_31FA_0014_41BC_C4EAC2A9544B"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1758A215_31FA_0014_41B6_9A4A5384548B",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "gap": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "25%",
 "scrollBarWidth": 10,
 "bottom": "25%",
 "overflow": "scroll",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "-Level 2-4"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
  "this.Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
  "this.Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
  "this.Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
  "this.Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
  "this.Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
  "this.Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
  "this.Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
  "this.Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
  "this.Button_17EB52B7_3106_0014_419C_439E593AEC43",
  "this.Button_17EB62B7_3106_0014_41C5_43B38271B353",
  "this.Button_17EB72B7_3106_0014_41B9_61857077BF4A",
  "this.Button_17EB92B7_3106_0014_41B2_34A3E3F63779"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "gap": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "25%",
 "scrollBarWidth": 10,
 "bottom": "25%",
 "overflow": "scroll",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "-Level 2-5"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.Button_168CA310_3106_01EC_41C7_72CE0522951A",
  "this.Container_168C8310_3106_01EC_4187_B16F315A4A23",
  "this.Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
  "this.Button_168D6310_3106_01EC_41B8_A0B6BE627547",
  "this.Button_168D5310_3106_01EC_41B5_96D9387401B8",
  "this.Button_168D3310_3106_01EC_41AC_5D524E4677A5",
  "this.Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
  "this.Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
  "this.Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
  "this.Button_168DD310_3106_01EC_4190_7815FA70349E",
  "this.Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
  "this.Button_168DA310_3106_01EC_41BE_DF88732C2A28",
  "this.Button_168D9311_3106_01EC_41A8_3BD8769525D6"
 ],
 "paddingTop": 0,
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_168D8311_3106_01EC_41B0_F2D40886AB88",
 "width": "100%",
 "layout": "vertical",
 "shadow": false,
 "gap": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "top": "25%",
 "scrollBarWidth": 10,
 "bottom": "25%",
 "overflow": "scroll",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "-Level 2-6"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "visible": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "height": "100%",
 "borderRadius": 0,
 "paddingRight": 10,
 "propagateClick": false,
 "minHeight": 1,
 "class": "HTMLText",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.01vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.45vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.45vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.29vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.29vh;font-family:'Oswald';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.64vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.64vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.29vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.29vh;font-family:'Oswald';\"><B><I>DONEC FEUGIAT:</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.4vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.29vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.29vh;font-family:'Oswald';\"><B><I>LOREM IPSUM:</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.29vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#04A3E1",
 "paddingLeft": 10
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "fontFamily": "Oswald",
 "width": 180,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0.7,
 "gap": 5,
 "horizontalAlign": "center",
 "height": 50,
 "borderRadius": 50,
 "mode": "push",
 "backgroundColor": [
  "#04A3E1"
 ],
 "fontSize": "2.39vh",
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "LOREM IPSUM",
 "fontStyle": "italic",
 "class": "Button",
 "rollOverBackgroundOpacity": 1,
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button"
 },
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical",
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
 "width": "100%",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "height": "46%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "HTMLText",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.01vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.45vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.45vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0,
 "scrollBarColor": "#04A3E1",
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "children": [
  "this.Image_1E18723C_57F1_802D_41C5_8325536874A5",
  "this.HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1E18623C_57F1_802D_41D5_C4D10C61A206",
 "gap": 10,
 "width": "100%",
 "layout": "horizontal",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "height": "75%",
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "data": {
  "name": "- content"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "RECEPTION >",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button Tour Info"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_106C4A62_2D09_C594_41C0_0D00619DF541",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_0A054365_2D09_CB9F_4145_8C365B373D19",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 23,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "ROOMS >",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button Panorama List"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "pressedLabel": "Inserdt Text",
 "minHeight": 1,
 "iconHeight": 32,
 "label": "AMENITIES >",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button Location"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "SPORTS AREA >",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button Floorplan"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "SWIMMING POOL >",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button Photoalbum"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "RESTAURANTS >",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button Contact"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_207ECEAD_3035_51EC_41A3_EE49910C654D",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.3,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
 "gap": 10,
 "width": 40,
 "layout": "horizontal",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 2,
 "borderRadius": 0,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "blue line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "backgroundColorDirection": "vertical"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
 "width": "100%",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "height": 78,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "HTMLText",
 "paddingLeft": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Company Name</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>info@loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText47602"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "visible": false
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
  "this.IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
 "gap": 7,
 "width": "100%",
 "layout": "horizontal",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": 56,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "bottom",
 "paddingLeft": 0,
 "data": {
  "name": "-Container Icons 1"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "children": [
  "this.IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
  "this.IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
  "this.IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
  "this.IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F"
 ],
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6",
 "gap": 7,
 "width": "100%",
 "layout": "horizontal",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": 44,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "-Container Icons 2"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "rollOverFontSize": 18,
 "id": "Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "iconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B.png",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverFontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverIconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B_rollover.png",
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 30,
 "label": "BACK",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 5,
 "iconWidth": 30,
 "minWidth": 1,
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_2A2DB53B_310E_001C_41BA_0206228E495C",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 8,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line separator"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Main Entrance",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "rollOverShadow": false,
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF",
 "rollOverShadowBlurRadius": 18
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 23,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lobby",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "pressedLabel": "Reception",
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Reception",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_2A2C053B_310E_001C_41A2_583DE489828C",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Meeting Area 1",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Meeting Area 2",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Bar",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Chill Out",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Terrace",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "visible": false,
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Garden",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "visible": false,
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "rollOverFontSize": 18,
 "id": "Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "iconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1.png",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverFontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverIconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_rollover.png",
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 30,
 "label": "BACK",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 5,
 "iconWidth": 30,
 "minWidth": 1,
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 8,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line separator"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_15A10DDC_31FA_0014_4185_021C898E177D",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "rollOverShadow": false,
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF",
 "rollOverShadowBlurRadius": 18
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_15A13DDC_31FA_0014_41C5_41AE80876834",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 23,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "pressedLabel": "Lorem Ipsum",
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_159EBDDD_31FA_0014_41C8_935504B30727",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "rollOverFontSize": 18,
 "id": "Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "iconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B.png",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverFontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverIconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_rollover.png",
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 30,
 "label": "BACK",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 5,
 "iconWidth": 30,
 "minWidth": 1,
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_17578D7D_31FA_0015_41BE_353D3005648A",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 8,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line separator"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "rollOverShadow": false,
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF",
 "rollOverShadowBlurRadius": 18
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 23,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "pressedLabel": "Lorem Ipsum",
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "rollOverFontSize": 18,
 "id": "Button_175A5214_31FA_0014_4198_930DF49BADD9",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "iconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9.png",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverFontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverIconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9_rollover.png",
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 30,
 "label": "BACK",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 5,
 "iconWidth": 30,
 "minWidth": 1,
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_1759B215_31FA_0014_41C0_84C99CBD5517",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 8,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line separator"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "rollOverShadow": false,
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF",
 "rollOverShadowBlurRadius": 18
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17598215_31FA_0014_41AC_1166AB319171",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 23,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "pressedLabel": "Lorem Ipsum",
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17593215_31FA_0014_41C0_42BAFB0080F0",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17590215_31FA_0014_41C1_2B2D012DCC76",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17596215_31FA_0014_41C6_A42670770708",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_1758B215_31FA_0014_41BC_C4EAC2A9544B",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "rollOverFontSize": 18,
 "id": "Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "iconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C.png",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverFontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverIconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_rollover.png",
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 30,
 "label": "BACK",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 5,
 "iconWidth": 30,
 "minWidth": 1,
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 8,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line separator"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "rollOverShadow": false,
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF",
 "rollOverShadowBlurRadius": 18
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 23,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "pressedLabel": "Lorem Ipsum",
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EB52B7_3106_0014_419C_439E593AEC43",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EB62B7_3106_0014_41C5_43B38271B353",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EB72B7_3106_0014_41B9_61857077BF4A",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_17EB92B7_3106_0014_41B2_34A3E3F63779",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "rollOverFontSize": 18,
 "id": "Button_168CA310_3106_01EC_41C7_72CE0522951A",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "iconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A.png",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverFontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverIconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A_rollover.png",
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 30,
 "label": "BACK",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 5,
 "iconWidth": 30,
 "minWidth": 1,
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_168C8310_3106_01EC_4187_B16F315A4A23",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0.5,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "height": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "id": "Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
 "gap": 10,
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 8,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "minHeight": 1,
 "class": "Container",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "data": {
  "name": "line separator"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168D6310_3106_01EC_41B8_A0B6BE627547",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "rollOverShadow": false,
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF",
 "rollOverShadowBlurRadius": 18
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168D5310_3106_01EC_41B5_96D9387401B8",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 23,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168D3310_3106_01EC_41AC_5D524E4677A5",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "pressedLabel": "Lorem Ipsum",
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168DD310_3106_01EC_4190_7815FA70349E",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168DA310_3106_01EC_41BE_DF88732C2A28",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "id": "Button_168D9311_3106_01EC_41A8_3BD8769525D6",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadow": false,
 "shadowBlurRadius": 6,
 "fontFamily": "Oswald",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "gap": 5,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "width": "100%",
 "height": 36,
 "borderRadius": 0,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontSize": 18,
 "paddingRight": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "minHeight": 1,
 "iconHeight": 32,
 "label": "Lorem Ipsum",
 "class": "Button",
 "rollOverBackgroundOpacity": 0.8,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "iconWidth": 32,
 "minWidth": 1,
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "fontStyle": "italic",
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF"
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "id": "Image_1E18723C_57F1_802D_41C5_8325536874A5",
 "width": "25%",
 "shadow": false,
 "horizontalAlign": "left",
 "url": "skin/Image_1E18723C_57F1_802D_41C5_8325536874A5.jpg",
 "maxWidth": 200,
 "backgroundOpacity": 0,
 "maxHeight": 200,
 "height": "100%",
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "Image",
 "verticalAlign": "top",
 "data": {
  "name": "agent photo"
 },
 "minWidth": 1,
 "scaleMode": "fit_inside",
 "paddingLeft": 0
},
{
 "borderSize": 0,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "id": "HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC",
 "width": "75%",
 "shadow": false,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "height": "100%",
 "borderRadius": 0,
 "paddingRight": 10,
 "propagateClick": false,
 "minHeight": 1,
 "class": "HTMLText",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.29vh;font-family:'Oswald';\"><B><I>JOHN DOE</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.29vh;font-family:'Oswald';\"><I>Licensed Real Estate Salesperson</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.4vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.4vh;font-family:'Oswald';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.4vh;font-family:'Oswald';\"><I>jhondoe@realestate.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.4vh;font-family:'Oswald';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.64vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.64vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.64vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#04A3E1",
 "paddingLeft": 10
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
 "width": 44,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83.png",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "height": 44,
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83_rollover.png",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Thumblist"
 },
 "cursor": "hand"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5",
 "width": 44,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5.png",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "height": 44,
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5_rollover.png",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Photoalbum"
 },
 "cursor": "hand"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "paddingBottom": 0,
 "id": "IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
 "width": 44,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15.png",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "height": 44,
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15_rollover.png",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Floorplan"
 },
 "cursor": "hand"
},
{
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
 "width": 44,
 "shadow": false,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7.png",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "height": 44,
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_rollover.png",
 "paddingRight": 0,
 "propagateClick": false,
 "pressedRollOverIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_pressed_rollover.png",
 "minHeight": 1,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, true, 0, null, null, false)",
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Realtor"
 },
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_pressed.png"
},
{
 "minWidth": 1,
 "iconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF.png",
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
 "width": 44,
 "shadow": false,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "height": 44,
 "borderRadius": 0,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF_rollover.png",
 "paddingRight": 0,
 "propagateClick": false,
 "minHeight": 1,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Video"
 },
 "cursor": "hand"
},
{
 "minWidth": 1,
 "iconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F.png",
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "id": "IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F",
 "width": 50,
 "shadow": false,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "height": 50,
 "borderRadius": 0,
 "mode": "push",
 "paddingRight": 0,
 "propagateClick": false,
 "pressedRollOverIconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F_pressed_rollover.png",
 "minHeight": 1,
 "class": "IconButton",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton --"
 },
 "visible": false,
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F_pressed.png"
}],
 "height": "100%",
 "propagateClick": true,
 "minHeight": 20,
 "mobileMipmappingEnabled": false,
 "class": "Player",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "vrPolyfillScale": 1,
 "data": {
  "name": "Player468"
 },
 "mouseWheelEnabled": true,
 "minWidth": 20,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "contentOpaque": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
