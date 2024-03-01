document.getElementsByTagName("h1")[0].style.fontSize = "6vw";
Vue.config.ignoredElements = ['ion-icon'];

var app = new Vue({
  el: '#app',
  data: {
    canvas: null,
    x: 0,
    y: 0,
    count: 0,
    color: "#0000ff",
    shape: "triangle",
    size: 100
  },
  mounted() {
    var cv = document.getElementById("drawCanvas");
    this.canvas = cv.getContext('2d');
    let ctx = this.canvas;
  },
  methods: {
    onColorPicker(event){
      // console.log(event);
      this.color = event.target.value
      // console.log(this.color);
    },
    setSize(event){
      console.log(event);
      this.size = event.target.value
    },
    onPan(event) {
      console.log(event);
      // var canvas_ch = event.path[0].clientHeight
      // var canvas_cw = event.path[0].clientWidth
      var canvas_ch = event.path[0].offsetHeight
      var canvas_cw = event.path[0].offsetWidth
      var canvas_h = event.path[0].height
      var canvas_w = event.path[0].width
      var ratio_h = canvas_h/canvas_ch
      var ratio_w = canvas_w / canvas_cw
      var dh = 1280 - canvas_h
      var dw = 720 - canvas_w
      var offsetX = document.getElementById("drawCanvas").getContext('2d').canvas.offsetLeft;
      var offsetY = document.getElementById("drawCanvas").getContext('2d').canvas.offsetTop;
      var offsetX = event.path[0].offsetLeft;
      var offsetY = event.path[0].offsetTop;
      // var dX = event.touches[0].clientX - offsetX
      // var dY = event.touches[0].clientY - offsetY //+ dh
      var dX = event.touches[0].pageX*ratio_w - offsetX
      var dY = event.touches[0].pageY*ratio_h - offsetY //+ dh
      // var dX = event.touches[0].clientX
      // var dY = event.touches[0].clientY
      console.log(dX, dY, event.touches[0].clientX, event.touches[0].clientY, offsetX, offsetY, canvas_h, canvas_w);
      if (this.shape == "triangle")
      this.drawtriangle(dX, dY, this.size, this.size);
      if (this.shape == "circle")
      this.drawarc(dX, dY, this.size/2, 0,  2 * Math.PI, false);
      if (this.shape == "square")
      this.drawrectangle(dX,  dY, this.size, this.size);
      if (this.shape == "line")
      this.drawLine(this.x, this.y, dX, dY);
      
      this.x = dX;
      this.y = dY;

      // this.sendPng();
    },
    onMousePan(event) {
      console.log(event);
      // var canvas_ch = event.path[0].clientHeight
      // var canvas_cw = event.path[0].clientWidth
      // var canvas_ch = event.path[0].offsetHeight
      // var canvas_cw = event.path[0].offsetWidth
      // var canvas_h = event.path[0].height
      // var canvas_w = event.path[0].width
      // var ratio_h = canvas_h/canvas_ch
      // var ratio_w = canvas_w / canvas_cw
      // var dh = 1280 - canvas_h
      // var dw = 720 - canvas_w
      // var offsetX = document.getElementById("drawCanvas").getContext('2d').canvas.offsetLeft;
      // var offsetY = document.getElementById("drawCanvas").getContext('2d').canvas.offsetTop;
      var offsetX = document.getElementById("drawCanvas").offsetLeft;
      var offsetY = document.getElementById("drawCanvas").offsetTop;
      // var dX = event.touches[0].clientX - offsetX
      // var dY = event.touches[0].clientY - offsetY //+ dh
      var dX = event.pageX - offsetX
      var dY = event.pageY - offsetY
      // var dX = event.touches[0].clientX
      // var dY = event.touches[0].clientY
      // console.log(dX, dY, event.touches[0].clientX, event.touches[0].clientY, offsetX, offsetY, canvas_h, canvas_w);
      if (this.shape == "triangle")
      this.drawtriangle(dX, dY, this.size, this.size);
      if (this.shape == "circle")
      this.drawarc(dX, dY, this.size/2, 0,  2 * Math.PI, false);
      if (this.shape == "square")
      this.drawrectangle(dX,  dY, this.size, this.size);
      if (this.shape == "line")
      this.drawLine(this.x, this.y, dX, dY);
      
      this.x = dX;
      this.y = dY;

      // this.sendPng();
    },
    showCoordinates(e) {
      this.x += 1;
      this.y = e.offsetY;
    },
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    draw(e) {
      // this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
      this.x = e.offsetX;
      this.y = e.offsetY;
      // this.drawtriangle(this.x, this.y, 10, 10);
      this.drawarc(this.x, this.y, 10, 0,  2 * Math.PI, false);
      // this.drawrectangle(this.x, this.y, 50, 50);
    },
    drawtriangle(x, y, w, h) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1;
      ctx.moveTo(x, y-h/2);
      ctx.lineTo(x+w/2,y+h/2);
      ctx.lineTo(x-w/2,y+h/2);
      ctx.fillStyle  = this.color;
      ctx.fill();
    },
    drawarc(x, y, radius, startAngle, endAngle, anticlockwise) {
      let ctx = this.canvas;
      let circle = new Path2D();
      console.log(this.color);
      ctx.fillStyle  = this.color;
      
      circle.arc(x, y, radius, startAngle, endAngle, );

      ctx.fill(circle);
    },
    drawrectangle(x, y, w, h) {
      let ctx = this.canvas;
      ctx.strokeStyle = this.color;
      let rectangle = new Path2D();
      ctx.fillStyle  = this.color;
      rectangle.rect(x-w/2, y-h/2, w, h);
      ctx.fill(rectangle);
    },
    clearCanvas(){
      let ctx = this.canvas;
      ctx.clearRect(0, 0, 720, 1280);
    },
    sendPng(){
      let can = document.getElementById("drawCanvas");
      var dataURL=can.toDataURL('image/PNG').split(';base64,')[1];
      dan2.push('Pic-I',[dataURL])
      
      console.log(dataURL);
    },
    setTriangle(){
      this.shape = 'triangle';
    },
    setCircle(){
      this.shape = 'circle';
    },
    setSquare(){
      this.shape = 'square'
    },
    sendPrevious(){
      dan2.push('Previous-I',[1])
    },
    sendNext(){
      dan2.push('Next-I',[1])
    }
    
  }

})
