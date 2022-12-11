<script>
    export let duration

    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	const progress = tweened(0, {
		duration,
		easing: cubicOut
	});

    onMount(()=>{
        $progress += 100 
    })

</script>

<progress class="progress w-56 progress-primary" value="{$progress}" max="100"></progress>

