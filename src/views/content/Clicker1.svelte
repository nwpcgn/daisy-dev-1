<script lang="ts">
	import TempSwitch from './TempSwitch.svelte'
	import TempWrapp from './TempWrapp.svelte'
	import Temp1 from './Temp1.svelte'
	import Temp2 from './Temp2.svelte'
	let products = {
		fembot: {
			slug: 'fembot',
			name: 'Fembot',
			info: 'Hochentwickelte weibliche Roboter mit menschenähnlichem Aussehen und Verhalten.',
			imgUrl:
				'https://nwp-cgn.de/studio/upload/kat12/server/php/files/fembot1.png',
			total: 0,
			max: 100,
			mods: {
				click: 1,
				auto: 0
			},
			cost: {},
			stars: 3
		},
		xdoll: {
			slug: 'xdoll',
			name: 'Sexrobots',
			info: 'Roboter für sexuelle Interaktionen mit humanoidem Design und vielfältigen Funktionen.',
			imgUrl:
				'https://nwp-cgn.de/studio/upload/kat12/server/php/files/fembot2.png',
			total: 0,
			max: 100,
			mods: {
				click: 1,
				auto: 0
			},
			cost: {},
			stars: 3
		},
		rubdoll: {
			slug: 'rubdoll',
			name: 'Rubberdolls',
			info: 'Hochwertige Gummipuppen mit realistischem Erscheinungsbild und Haptik.',
			imgUrl:
				'https://nwp-cgn.de/studio/upload/kat12/server/php/files/fembot3.png',
			total: 0,
			max: 100,
			mods: {
				click: 1,
				auto: 0
			},
			cost: {},
			stars: 8
		}
	}
	let view = {
		base: Temp2,
		card: Temp1
	}
	let current = 'base'
	function handleProdClick(slug) {
		let { total, mods, max } = products[slug]

		if (total + mods.click <= max) {
			products[slug].total = total + mods.click
		}
	}
</script>

<TempSwitch {view} bind:current />
{#key current}
	<TempWrapp>
		{#each Object.values(products) as product (product.slug)}
			<svelte:component
				this={view[current]}
				on:click={(e) => handleProdClick(e.detail)}
				{...product} />
		{/each}
	</TempWrapp>
{/key}

<style>
</style>
