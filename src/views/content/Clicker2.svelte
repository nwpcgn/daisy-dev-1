<script lang="ts">
	import { alert, randInt } from '../../lib'
	import { onMount } from 'svelte'

	let products = {
		fembot: {
			slug: 'fembot',
			name: 'Fembot',
			info: 'Hochentwickelte weibliche Roboter mit menschenähnlichem Aussehen und Verhalten.',
			imgUrl:
				'https://nwp-cgn.de/studio/upload/kat12/server/php/files/fembo1.jpeg',
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
				'https://nwp-cgn.de/studio/upload/kat12/server/php/files/fembo2.jpeg',
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
				'https://nwp-cgn.de/studio/upload/kat12/server/php/files/fembo3.jpeg',
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

	function handleProdClick(event) {
		const slug = event.currentTarget.dataset.slug
		let { total, mods, max } = products[slug]

		if (total + mods.click <= max) {
			products[slug].total = total + mods.click
		}
	}

	onMount(() => {})
</script>

<div>
	{#each Object.values(products) as { name, slug }}
		<div class="flex justify-between items-center py-1">
			<span>{name}</span>
			<button class="btn btn-sm">Action</button>
		</div>
	{/each}
</div>

<style>
</style>
