
<script>
    import { onMount } from 'svelte';
	import MessageBubble from '../comp/MessageBubble.svelte';
	import ProgressBar from '../comp/ProgressBar.svelte';
    const DEFAULT_RELAY_URL = 'wss://relay.nostropolis.xyz/websocket'
    
    let relayUrl = DEFAULT_RELAY_URL
    let roomName = "default"
    let secret = ""
    let message = ""

    let chatMessages = []
    let chatbox

    let emitter = {connected : false}

    let state = "connect"

    onMount(async () => {
        emitter = new window.NostrEmitter()
        emitter.opt.selfPub = true
        emitter.on('chatmsg', (event, meta) => {
        const sender = (meta.pubkey === emitter.keys.pub)
          ? 'Me'
          : meta.pubkey.slice(-6)
          chatMessages=[...chatMessages, {sender, message: event.data, time: meta.created_at}]
          chatbox.scrollTo(0, chatbox.scrollHeight);
      })
    });

    function connect(){
        emitter.connect(DEFAULT_RELAY_URL, roomName+secret)
        emitter.socket.on('open', (event) => state="connected")
        state = "connecting"
    }

    function send() {
        emitter.emit('chatmsg', { data: message })
        message = ''
    }


    // data
    </script>
    <div>
        <div class="bg-neutral-900 m-2">
            <div class="grid m-auto grid-cols-1 md:grid-cols-3">
                <div>
                </div>
                {#if state === 'connected'}
                    <div class="flex flex-col gap-2 text-gray-400 justify-between">
                        <div bind:this={chatbox} class="pr-4 overflow-y-scroll scrollbar-thin scrollbar-track-stone-800  scrollbar-thumb-stone-700 flex flex-col flex-grow gap-2 max-h-[400px] min-h-[400px]">
                            {#each chatMessages as chatItem}
                                 <MessageBubble messageData={chatItem}></MessageBubble>
                            {/each}
                        </div>
                        <div class="flex flex-col gap-2">
                            <textarea class="textarea textarea-primary w-full" placeholder="Type..." bind:value={message}></textarea>
                            <button class="btn btn-primary w-full" on:click={()=> {send()}}>Send</button>
                        </div>
                    </div>
                {:else if  state==='connect'}
                <div class="flex flex-col gap-2">
                    <label for="relayInput">Relay URL:</label>
                    <input id="relayInput" type="text" placeholder="wss://...." bind:value={relayUrl} class="input input-bordered input-primary w-full " />
                    <label for="roomnameInput">Chatroom:</label>
                    <input id="roomnameInput" type="text" placeholder="default" bind:value={roomName} class="input input-bordered input-primary w-full " />
                    <label for="secretInput">Secret</label>
                    <input id="secretInput" type="password" placeholder="secret" bind:value={secret} class="input input-bordered input-primary w-full " />
                    <button class="btn btn-primary w-full" on:click={()=> {connect()}}>Connect</button>
                </div>               
                {:else if  state==='connecting'}
                    <div class="flex flex-col justify-center items-center gap-2">
                        <div>
                            <p>connecting...</p>
                        </div>
                        <ProgressBar duration={2000}></ProgressBar>
                    </div> 
                {/if}
                <div></div>
            </div>
        </div>
    </div>