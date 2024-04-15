<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	export let title = 'Site Not Found'

</script>

<svelte:head><title>{title}</title></svelte:head>

<section class="layer center">
	<article class="content">
		<header><h2>{title}</h2></header>
		<nav>
            <a href="/">Home</a>
        </nav>
	</article>
</section>

<style>
</style>
