var $ = function (id) { return document.getElementById(id); }

var SlideShow = function ( params ) {
    var that = this;

    // Store references to the element nodes as properties
    if ( !params ) params = {};
    this.listNode = $(params.listId);
    this.imageNode = $(params.imageId);
    this.playNode = $(params.playId);
    this.playPauseNode = $(params.playPauseId);

    // Validate nodes
    this.validateNode( this.listNode, "*", "List ID");
    this.validateNode( this.imageNode, "img", "Image ID");
    this.validateNode( this.playNode, "button", "Play Button ID");
    this.validateNode( this.playPauseNode, "img", "PlayPause Image ID");

    // Define application parameters
    this.imageCounter = 0;
    this.play = true;
    this.speed = 2000;

    // Retrieve image links
    this.imageLinks = this.listNode.getElementsByTagName("a");
    if ( this.imageLinks.length == 0 ) {
        throw new Error("Slide Show: List ID contains no image links.");
    }

    // Process image links
    var i, node, image;
    this.imageCache = [];
    for ( i = 0; i < this.imageLinks.length; i++ ) {
        node = this.imageLinks[i];

        // Preload image 
        image = new Image();
        image.src = node.href;
        this.imageCache.push( image );
    }

    // Create event handlers
    this.playClick = function () {
        that.togglePlay();
        that.playNode.blur();
    }

    // Attach event handlers
    this.playNode.onclick = this.playClick;

    // Start slide show
    this.timer = setInterval(
        function () { that.displayNextImage(); },
        this.speed
    );
}

SlideShow.prototype.validateNode = function ( node, nodeName, nodeDesc ) {
    if ( ! node ) {
        throw new Error("Slide Show: " + nodeDesc + " not found.");
    }
    if ( node.nodeType !== 1 ) {
        throw new Error("Slide Show: " + nodeDesc +
            " is not an element node.");
    } 
    if ( nodeName != "*" && node.nodeName !== nodeName.toUpperCase() ) {
        throw new Error("Slide Show: " + nodeDesc +
            " is not a " + nodeName.toLowerCase() + " tag.");
    }
}

SlideShow.prototype.displayImage = function () {
    var image = this.imageCache[this.imageCounter];
    this.imageNode.src = image.src;
}

SlideShow.prototype.displayNextImage = function () {
    this.imageCounter = ++this.imageCounter % this.imageCache.length;
    this.displayImage();
}

SlideShow.prototype.togglePlay = function () {
    var that = this;
    if ( this.play ) {
        clearInterval( this.timer );
        this.playPauseNode.src = "play.gif";
    } 
    else {
        this.timer = setInterval(
            function () { that.displayNextImage(); },
            this.speed
        );
        this.playPauseNode.src = "pause.gif";
    }
    this.play = ! this.play;
}
