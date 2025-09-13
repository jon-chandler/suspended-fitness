const susFit = new BroadcastChannel("susChannel")
channelKarfu.postMessage({'newContenttMsg' : msgText.split(' ')[0], 'conversationID' : <?=$conversation->getConversationID()?>})