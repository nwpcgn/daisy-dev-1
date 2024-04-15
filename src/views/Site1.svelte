<script lang="ts">
	import Bubbles from './content/Bubbles.svelte'
	import Clicker1 from './content/Clicker1.svelte'
	export let title = 'Site 1'
</script>

<svelte:head><title>{title}</title></svelte:head>

<Bubbles />

<section class="layer">
	<article class="content">
		<header class="text-center mb-4"><h2 class="text-6xl">{title}</h2></header>
		<Clicker1 />
	</article>
</section>

<style>
</style>
