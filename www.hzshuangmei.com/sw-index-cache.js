/*
* @Author: chj
* @FileName:sw-index-cache.js
* @Date:   2018-06-02 12:49:59
* @Last Modified by:   chj
* @Last Modified time: 2018-06-02 12:52:44
*/
var VERSION = 'v1';

// 缓存
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        '//css.hzshuangmei.com/pc/common.css',
        '//css.hzshuangmei.com/pc/index.css',
        '//img.hzshuangmei.com/pc/brand2.webm'
      ]);
    })
  );
});

// 缓存更新
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    caches.open(VERSION).then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('//css.hzshuangmei.com/pc/common.css');
  }));
});
