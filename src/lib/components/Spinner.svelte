<script>
	import { quadIn } from 'svelte/easing'
	import { fade } from 'svelte/transition'

</script>

<aside
	out:fade={{ duration: 1000, easing: quadIn }}
	class="absolute inset-0 overflow-hidden bg-gray-900">
	<span />
</aside>

<style>
	@keyframes circle-in-center {
		from {
			clip-path: circle(0%);
		}
		to {
			clip-path: circle(125%);
		}
	}

	aside {
		animation: 2.5s cubic-bezier(0.25, 1, 0.3, 1) circle-in-center both;
	}
</style>
