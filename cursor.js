console.log('In the cursor window');

document.body.addEventListener('mousemove', function(e) {
    function getMousePos(e) {
        return {x:e.clientX,y:e.clientY};
    }
    var mousecoords = getMousePos(e);
    console.log(`X: ${mousecoords.x}, Y: ${mousecoords.y}`)
})
