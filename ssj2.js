var context = document.getElementsByTagName('canvas')[0].getContext('2d');

var hue = 0;

var Line=function(lineWidth,fromX,fromY,midX1,midY1,midX2,midY2,lastX,lastY,deathCount){
    this.lineWidth = lineWidth;
    this.fromX = fromX;
    this.fromY = fromY;
    this.midX1= midX1;
    this.midY1 = midY1;
    this.midX2 = midX2;
    this.midY2 = midY2;
    this.lastX = lastX;
    this.lastY = lastY;
    this.showCount = 0;
    this.deathCount = deathCount;

};
var Lines = function (line,widthArea,loop) {
    this.lines = line;
    this.widthArea = widthArea;
    this.loop = loop;
    this.remove = false;
};
var lineWidth = 1;

var linesArray = [];
var count = 5;

function strokeLine() {
    if (count < -40) {
        count = 5;
    }


    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.translate(context.canvas.width/2, context.canvas.height/2);
    context.scale(1, 1);
    context.translate(-context.canvas.width/2, -context.canvas.height/2);


    // 初期データ

    if (count > 0) {
        for (var i = 0; i < 3;i++){
            var width = context.canvas.width/2 + context.canvas.width/count;
            var margin = (context.canvas.width - width)/2;
            var fromX = (width/3) * Math.random() + (width/3) * i + margin;
            var fromY = (context.canvas.height/5) * Math.random() + (context.canvas.height/5) * count;
            var midX1 = (width/3) * Math.random() + (width/3) * i + margin;
            var midY1 = (context.canvas.height/5) * Math.random() + (context.canvas.height/5) * count;
            var midX2 = (width/3) * Math.random() + (width/3) * i + margin;
            var midY2 = (context.canvas.height/5) * Math.random() + (context.canvas.height/5) * count;
            var toX = (width/3) * Math.random() + (width/3) * i + margin;
            var toY = fromY - (context.canvas.height/5) * Math.random();

            var line = new Line(1 + Math.random() * 2,
                fromX,
                fromY,
                midX1,
                midY1,
                midX2,
                midY2,
                toX,
                toY,
                Math.floor(Math.random() * Math.floor(3)) + 5);
            var tmpLine = new Lines([line],i,count);
            linesArray.push(tmpLine);
        }
    }

    // 線の追加
    for (var i = 0; i < linesArray.length;i++){
        var lines = linesArray[i];
        var tmpLoop = lines.loop;
        var widthArea = lines.widthArea;
        if (lines.remove !== true){
            var l = lines.lines[lines.lines.length - 1];
            var width = context.canvas.width/2 + context.canvas.width/tmpLoop;
            var margin = (context.canvas.width - width)/2;
            var newLine = new Line(1,
                l.lastX,
                l.lastY,
                (width/3) * Math.random() + (width/3) * widthArea + margin,
                l.lastY - (context.canvas.height/5) * Math.random(),
                (width/3) * Math.random() + (width/3) * widthArea + margin,
                l.lastY - (context.canvas.height/5) * Math.random(),
                (width/3) * Math.random() + (width/3) * widthArea + margin,
                l.lastY - (context.canvas.height/5) * Math.random(),
                Math.floor(Math.random() * Math.floor(3)) + 5);
            lines.lines.push(newLine);
            if (Math.floor(Math.random() * Math.floor(5)) === 0){
                var branch = new Line(1 + Math.random() * 2,
                    l.lastX,
                    l.lastY,
                    (width/3) * Math.random() + (width/3) * widthArea + margin,
                    l.lastY - (context.canvas.height/5) * Math.random(),
                    (width/3) * Math.random() + (width/3) * widthArea + margin,
                    l.lastY - (context.canvas.height/5) * Math.random(),
                    (width/3) * Math.random() + (width/3) * widthArea + margin,
                    l.lastY - (context.canvas.height/5) * Math.random(),
                    Math.floor(Math.random() * Math.floor(3)) + 5);
                lines.lines.push(branch);
            }

        }
    }

    // 描画
    var tmpLinesArray = [];
    for (var i = 0; i < linesArray.length;i++){
        var lin = linesArray[i];
        var tmpLines = new Lines([],lin.widthArea,lin.loop);
        for (var j = 0; j < lin.lines.length;j++){
            var l = lin.lines[j];
            context.beginPath();
            context.lineWidth = lineWidth;
            context.moveTo(l.fromX, l.fromY);
            context.bezierCurveTo(l.midX1,
                l.midY1,
                l.midX2,
                l.midY2,
                l.lastX, l.lastY);

//            context.lineTo(l.lastX, l.lastY);
            hue = 200;
            context.strokeStyle = 'white';
            context.shadowColor = 'hsl(' + hue + ', 50%, 50%)';
            context.shadowBlur = 5 + 10 * Math.random();
            context.stroke();
            l.showCount++;
            if (l.showCount < l.deathCount) {
                tmpLines.lines.push(l);
            } else {
                tmpLines.remove = true;
            }
        }
        if (tmpLines.lines.length !== 0) {

            tmpLinesArray.push(tmpLines);
        }
    }
    linesArray = tmpLinesArray;

    context.restore();
    count--;
}

setInterval(strokeLine, 30);
