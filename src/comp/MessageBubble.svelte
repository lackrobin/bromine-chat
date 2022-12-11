<script>
export let messageData
let date = new Date(messageData.time*1000)

</script>

<div class="chat {messageData.sender==='Me'? 'chat-end': 'chat-start'}">
    <div class="chat-header flex gap-1 items-center">
        <p style="color: #{messageData.sender}">
            {messageData.sender}
        </p>
        <time class="text-xs opacity-50">{date.toUTCString()}</time>
    </div>
    <div class="chat-bubble break-words {messageData.sender==='me'? 'chat-bubble-primary': 'chat-bubble-secondary'} chat-bubble-primary">{messageData.message}</div>
</div>