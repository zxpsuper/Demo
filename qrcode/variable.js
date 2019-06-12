var gCtx = null; //canvas.ctx
var gCanvas = null; // qr-canvas
// var c = 0;
var stype = 0; // 识别流程 0未开始 1进行中 2已结束
var gUM = false;
var webkit = false;
var moz = false;
var v = null; // 存放视频的变量
var scanCodeStart = false; // 开始扫码
var mediaStreamTrack = null; // mediaStreamTrack 实现关闭摄像头功能 mediaStreamTrack.stop()
var imghtml =
  '<div id="qrfile"><canvas id="out-canvas" width="320" height="240"></canvas>' +
  '<div id="imghelp">drag and drop a QRCode here' +
  "<br>or select a file" +
  '<input type="file" onchange="handleFiles(this.files)" id="upload-img"/>' +
  "</div>" +
  "</div>";

var vidhtml = '<video id="v" autoplay muted></video>';
