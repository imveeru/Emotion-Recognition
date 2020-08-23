"use strict";

var video = document.getElementById('video');
Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/emotion recognition/models'), faceapi.nets.faceLandmark68Net.loadFromUri('/emotion recognition/models'), faceapi.nets.faceRecognitionNet.loadFromUri('/emotion recognition/models'), faceapi.nets.faceExpressionNet.loadFromUri('/emotion recognition/models')]).then(startVideo);

function startVideo() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getUserMedia({
    video: {}
  }, function (stream) {
    return video.srcObject = stream;
  }, function (err) {
    return console.error(err);
  });
}

video.addEventListener('playing', function () {
  var canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  var displaySize = {
    width: video.width,
    height: video.height
  };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(function _callee() {
    var detections, resizedDetections;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions());

          case 2:
            detections = _context.sent;
            resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            console.log(detections);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }, 100);
});