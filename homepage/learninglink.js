var $ = function (id) { return document.getElementById(id); }

var Learninglinks = function ( ulId, linkCount ) {
    var learninglinks = this;
    
	// Validate the number of arguments for the method
    if ( arguments.length < 1 || arguments.length > 2) {
        throw new Error("Learninglinks: wrong number of arguments.");
    }

    // Store references to the element nodes as properties
    this.ulNode = $(ulId);

    // Validate the nodes
    if ( this.ulNode && this.ulNode.nodeType != 1 ) {
        throw new Error("Learninglinks: UL id is not a DOM element.");
    }
    if ( this.ulNode.tagName != "UL" ) {
        throw new Error("Learninglinks: UL id is not a UL element.");
    }

    // Convert the linkCount argument to an integer value and validate it
    if (arguments.length == 1) {
        linkCount = 3;
    } else {
        linkCount = parseInt(linkCount);
    }
    if ( isNaN(linkCount) || linkCount < 1 ) {
        throw new Error("Learninglinks: Link count is not a valid number.");
    }

    // Define the application parameters
    this.linkCount = linkCount;
    this.items = [];

    // Remove the LI nodes from the UL node and store them in the items array
    var node;
    while ( this.ulNode.hasChildNodes() ) {
        node = this.ulNode.removeChild( this.ulNode.firstChild );
        if ( node.nodeType == 1 && node.tagName == "LI") {
            this.items.push(node);
        }
    }

    // Append the appropriate number of LI nodes to the UL node
    this.next = 0;
    while ( this.next < this.linkCount && this.next < this.items.length) {
        this.ulNode.appendChild( this.items[this.next] );
        this.next++;
    }
    this.next--;

    // Define the event handlers
    this.ulOver = function () { learninglinks.pause(); };
    this.ulOut = function () { learninglinks.play(); };

    // Attach the event handlers to events
	this.ulNode.onmouseover = this.ulOver;
	this.ulNode.onmouseout = this.ulOut;
	
    // Call the play method
    this.play();
}

Learninglinks.prototype.showNext = function () {
    this.next++;
    this.next = this.next % this.items.length;
    this.ulNode.removeChild( this.ulNode.firstChild );
    this.ulNode.appendChild( this.items[this.next] );
}

Learninglinks.prototype.pause = function () {
    clearInterval( this.timer );
}

Learninglinks.prototype.play = function () {
    var learninglinks = this;
    this.timer = setInterval( function() { learninglinks.showNext(); }, 2000 );
}
