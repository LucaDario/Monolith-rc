// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See monolith-rc-tests.js for an example of importing.
RocketChat.callbacks.add('renderMessage', (message) => {
    // Parse the message
    //console.log('id='+message._id+' msg='+message.msg);

    const regEx = /\[\S+\]/g;
    const results = regEx.exec(message.msg);
    let bubbleType = null;

    if(message.hasOwnProperty('bubbleType')){
        bubbleType = message.bubbleType;
    }
    else if(results !== null){
        bubbleType = results[0].replace(']', '').replace('[', '');
        message.msg = message.msg.replace(results[0], '');
    }

    if(bubbleType !== null && typeof document !== 'undefined'){
        const wrapper_id = 'wrapper_' + message._id;
        const cached_element = document.getElementById(wrapper_id);
        if(cached_element !== null){
            message.html = '<div id="' + wrapper_id + '" class="bubble round update">' +
                cached_element.innerHTML + '</div>';
        }else{
            message.html = '<div id="' + wrapper_id + '" class="bubble round"></div>';
        }
        renderizeBubble(message, wrapper_id, bubbleType);
    }
    return message;
}, RocketChat.callbacks.priority.HIGH, 'monolith');

function renderizeBubble(message, wrapper_id, bubbleName) {
    const intervalId = setInterval(() => {
        const element = document.getElementById(wrapper_id);
        if (element !== null) {
            if (element.className.indexOf('update') !== -1 || element.childNodes.length === 0) {
                const bubble = Monolith.bubble.getBubble(bubbleName, message);
                element.innerHTML = "";
                element.appendChild(bubble.renderView());
                element.className = 'bubble round';
            }
            clearInterval(intervalId);
        }
    }, 200);
}
