var $ = function (id) { return document.getElementById(id); }

var MusicGallery = function ( listId, imageId, captionId, ctlListID, ctlId ) {
    var that = this;
    this.listNode = $(listId);
    this.imageNode = $(imageId);
    this.captionNode = $(captionId);
	this.ctlListNode = $(ctlListId);
	this.ctlNode = $(ctlId);

    // Validate nodes
    this.validateNode( this.listNode, "*", "List ID");
    this.validateNode( this.imageNode, "img", "Image ID");
    this.validateNode( this.captionNode, "span", "Caption ID");
	this.validateNode( this.ctlListNode, "*", "Audio List ID");
	this.validateNode( this.ctlNode, "audio", "Audio ID");

    // Retrieve image links
    this.imageLinks = this.listNode.getElementsByTagName("a");
    if ( this.imageLinks.length == 0 ) {
        throw new Error("Image Gallery: List ID contains no image links.");
    }

    // Process image links
    var i, node, image;
    this.imageCache = [];
    for ( i = 0; i < this.imageLinks.length; i++ ) {
        node = this.imageLinks[i];

        // Attach event handler
        node.onclick = function (evt) {
            var link = this;
            if (!evt) evt = window.event;
            that.linkClick(evt, link);
        }

        // Preload image
        image = new Image();
		if (node.hasAttribute("href")){
			image.src = node.href;
		}
        this.imageCache.push( image );
    }
}

MusicGallery.prototype.validateNode = function ( node, nodeName, nodeDesc ) {
    if ( ! node ) {
        throw new Error("Image Gallery: " + nodeDesc + " not found.");
    }
    if ( node.nodeType !== 1 ) {
        throw new Error("Image Gallery: " + nodeDesc +
            " is not an element node.");
    } 
    if ( nodeName != "*" && node.nodeName !== nodeName.toUpperCase() ) {
        throw new Error("Image Gallery: " + nodeDesc +
            " is not a " + nodeName.toLowerCase() + " tag.");
    }
}

MusicGallery.prototype.linkClick = function (evt, link) {
    this.imageNode.src = link.href;
    this.captionNode.firstChild.nodeValue = link.title;
    link.blur();
    
    // Cancel the default action of the event
    if ( evt.preventDefault ) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
}