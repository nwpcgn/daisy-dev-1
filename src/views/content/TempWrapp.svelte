<script lang="ts">
	import { quartIn } from 'svelte/easing'
	import { slide } from 'svelte/transition'
	let easing = quartIn
	export let duration = 300
	export let delay = 150
</script>

<div
	class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-4"
	in:slide={{ duration, delay, easing }}
	out:slide={{ duration, easing }}>
	<slot />
</div>

<style>
</style>
