document.addEventListener("DOMContentLoaded", function () {
  // 改用 class 選取更精準
  var lazyIframes = [].slice.call(document.querySelectorAll(".lazy-video"));

  if ("IntersectionObserver" in window) {
    var lazyIframeObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var iframe = entry.target;
          // 只有在 src 為空或約定值時才賦值，避免重複觸發
          if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            // 移除 data-src 防止重複處理
            iframe.removeAttribute('data-src');
          }
          lazyIframeObserver.unobserve(iframe);
        }
      });
    }, {
      // 關鍵設定：提前 300px 就開始載入，避免手機滑到時畫面空白
      rootMargin: "0px 0px 300px 0px"
    });

    lazyIframes.forEach(function (lazyIframe) {
      lazyIframeObserver.observe(lazyIframe);
    });
  } else {
    // Fallback: 針對極老舊瀏覽器直接全部載入
    lazyIframes.forEach(function (iframe) {
      iframe.src = iframe.dataset.src;
    });
  }
});