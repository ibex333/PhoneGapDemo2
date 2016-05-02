var $ = function (id) { return document.getElementById(id); }

var MusicGallery = function ( listId, ctlId, captionId) {
    var that = this;
    this.listNode = $(listId);
    this.musicNode = $(ctlId);
    this.captionNode = $(captionId);
	
    // Validate nodes
    this.validateNode( this.listNode, "*", "List ID");
    this.validateNode( this.musicNode, "audio", "Music ID");
    this.validateNode( this.captionNode, "span", "Caption ID");
	
    // Retrieve music links
    this.musicLinks = this.listNode.getElementsByTagName("a");
    if ( this.musicLinks.length == 0 ) {
        throw new Error("Music Gallery: List ID contains no music links.");
    }

    // Process music links
    var i, node, music;
    this.musicCache = [];
    for ( i = 0; i < this.musicLinks.length; i++ ) {
        node = this.musicLinks[i];

        // Attach event handler
        node.onclick = function (evt) {
            var link = this;
            if (!evt) evt = window.event;
            that.linkClick(evt, link);
        }

        // Preload music
        music = new Image();
		if (node.hasAttribute("href")){
			music.src = node.href;
		}
        this.musicCache.push( music );
    }
}

MusicGallery.prototype.validateNode = function ( node, nodeName, nodeDesc ) {
    if ( ! node ) {
        throw new Error("Music Gallery: " + nodeDesc + " not found.");
    }
    if ( node.nodeType !== 1 ) {
        throw new Error("Music Gallery: " + nodeDesc +
            " is not an element node.");
    } 
    if ( nodeName != "*" && node.nodeName !== nodeName.toUpperCase() ) {
        throw new Error("Music Gallery: " + nodeDesc +
            " is not a " + nodeName.toLowerCase() + " tag.");
    }
}

MusicGallery.prototype.linkClick = function (evt, link) {
    this.musicNode.src = link.href;
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