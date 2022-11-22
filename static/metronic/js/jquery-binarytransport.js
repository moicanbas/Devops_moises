/**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */

// use this transport for "binary" data type
$.ajaxTransport("+binary", function (options, originalOptions, jqXHR) {
  // check for conditions and support for blob / arraybuffer response type
  if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
    return {
      // create new XMLHttpRequest
      send: function (_, callback) {
        // setup all variables
        var xhr = new XMLHttpRequest(),
          url = options.url,
          type = options.type,
          // blob or arraybuffer. Default is blob
          dataType = options.responseType || "blob",
          data = options.data || null;

        var content_types = []
        for (var key in options.accepts) {
          if (key === "*") continue
          if (Object.prototype.hasOwnProperty.call(options.accepts, key)) {
            var content_type = options.accepts[key]
            content_types = content_types.concat(content_type.split(",").map(function(item) { return item.trim() }))
          }
        }
        content_types = content_types.filter(Boolean)
        xhr.addEventListener('load', function () {
          var data = {};
          if (content_types.includes(xhr.response.type)) {
            var fr = new FileReader()
            fr.addEventListener("loadend", function() {
              data["text"] = fr.result
              // make callback and send data
              callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
            })
            fr.readAsText(xhr.response)
          } else {
            data[options.dataType] = xhr.response;
            // make callback and send data
            callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
          }
        });
        xhr.open(type, url, true);
        xhr.responseType = dataType;
        xhr.setRequestHeader("Content-Type", options.contentType);
        if (options.csrf_token && !/^(GET|HEAD|OPTIONS|TRACE)$/i.test(options.type)) {
          xhr.setRequestHeader("X-CSRFToken", options.csrf_token)
        }
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(data);
      },
      abort: function () {
        jqXHR.abort();
      }
    };
  }
});