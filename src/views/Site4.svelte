<script lang="ts">
	import BackBuildings from './site4/BackBuildings.svelte'

	import Buildings from './site4/Buildings.svelte'
	let title = 'Office 2'
	let buildings = {
		building1: {
			width: 126,
			height: 160,
			x: 0,
			y: 0
		},
		building2: {},
		building3: {},
		building4: {}
	}
	$: console.log({ buildings })
</script>

<svelte:head><title>{title}</title></svelte:head>

<BackBuildings />

<section class="layer flex flex-col">
	<article class="content">
		<header><h2 class="text-center">{title}</h2></header>
	</article>
	<Buildings bind:buildings />
</section>
