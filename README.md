
Web Audio Recording Upload Demo
========================================

This is a demo of recording audio from HTML5 pages and send it to Node.js using Web Socket and Web Audio API.

I made this some time in 2012 using the Web Audio [Script Processor Node](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode). The demo use very inefficient transfer of raw audio samples as JSON array containing floating points. At that time there was no audio encoder available in Web Audio to encode raw audio signal to formats like MP3 or Ogg. (only decoder was available) I am not sure about the current status of Web Audio API, but an alternative is to use Emscripten-compiled audio encoder libraries such as [libmp3lame.js](https://github.com/akrennmair/libmp3lame-js)

This demo only works in Chrome. To run the demo just npm install the `socket.io` dependency, run `node server.js` and go to `http://localhost:8080`. 

The recordings are uploaded to the `upload` folder in raw audio format. The file can be opened using tools like [Audacity](http://audacity.sourceforge.net/) using the `File > Import > Raw Data` menu. The raw format is in 64-bit float little indian.