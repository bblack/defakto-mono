var paper = Raphael(0, 0, 1280, 853);
paper.image('watch.jpg', 0, 0, 1280, 853);
var dial = paper.circle(641, 422, 225).attr('fill', 'black');
var nearlyWhite = 'rgba(240,240,240,1)';

var intervalInMinutes = 5;
var count = 12*60/intervalInMinutes;
var center = [dial.attr('cx'), dial.attr('cy')];
for (var i=0; i<count; i++){
    var m = i * intervalInMinutes;
    var length = !(m%60) ? 60 : !(m%15) ? 40 : 20;
    var tick = paper.path('M' + center.join(',') + 'v' + length)
        .attr({
            stroke: nearlyWhite,
            'stroke-width': 2
        })
        .rotate((i/count)*360, center[0], center[1])
        .translate(0, -220);
}
var brand = paper.text(center[0], center[1] - 105, 'DEFAKTO').attr({
    'font-family': 'futura',
    'font-size': '16px',
    'letter-spacing': '0.2em',
    fill: nearlyWhite
})
var hand = paper.path(
    'M' + (center[0] - 5) + ',' + center[1] +
    'L' + (center[0] + 5) + ',' + center[1] +
    'L' + (center[0] + 1) + ',' + (center[1] - 190) +
    'L' + (center[0] - 1) + ',' + (center[1] - 190) +
    'Z'
)
.attr({
    fill: nearlyWhite,
    'stroke-width': 0
});
var handBase1 = paper.circle(center[0], center[1], 15).attr({
    fill: nearlyWhite,
    'stroke-width': 0
});
var handBase2 = paper.circle(center[0], center[1], 10).attr({
    fill: nearlyWhite,
    'stroke-width': 0
})
.glow({
    width: 2,
    opacity: 0.2,
    offsety: 1
});
var handAxis = paper.circle(center[0], center[1], 4).attr({
    'stroke-width': 0,
    fill: 'r silver-gray'
})

var SECONDS_IN_DIAL = 12*60*60;
function orientHand(){
    var d = new Date();
    var seconds = (d.getHours()%12)*60*60 + d.getMinutes()*60 + d.getSeconds();
    hand.transform(''); // reset
    hand.rotate(360*(seconds/SECONDS_IN_DIAL), center[0], center[1]);
}
orientHand();
setInterval(orientHand, 1000);
