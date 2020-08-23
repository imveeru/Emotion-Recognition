/*const video=document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/emotion recognition/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/emotion recognition/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/emotion recognition/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/emotion recognition/models'),
]).then(start())

function start() {
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
    
           navigator.getUserMedia(
               {video: {}},
               stream => video.srcObject = stream,
               err => console.error(err)
           )
       }

video.addEventListener('play',()=>{
    console.log('Recognition Started');

    const canvas =  faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize={width: video.width,height: video.height}

    faceapi.matchDimensions(canvas,displaySize)

    setInterval(async()=>{

        const detections =await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        .withFaceExpressions()

        console.log(detections)

        const resizedDetections = faceapi.resizeResults(detections,displaySize)

        faceapi.draw.drawDetections(canvas,resizedDetections)

        },100)

    
})*/

const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/emotion recognition/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/emotion recognition/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/emotion recognition/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/emotion recognition/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('playing', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    console.log(detections)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})