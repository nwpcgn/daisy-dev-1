<script lang="ts">
	import Build1 from './build1.svelte'
	import Build2 from './build2.svelte'
	import Build3 from './build3.svelte'
	import Build4 from './build4.svelte'
	import Building from './Building.svelte'

	export let buildings = {
		building1: {},
		building2: {},
		building3: {},
		building4: {}
	}

	function getBoundings(el, id = 'building') {
		if (!el) return
		const rect = el.getBoundingClientRect()
		let newObj = Object.assign({}, { id })
		for (const key in rect) {
			if (typeof rect[key] !== 'function') {
				newObj[key] = Math.round(rect[key])
			}
		}
		return newObj
	}
</script>

<article class="flex items-end justify-center gap-16 mt-auto">
	<Building label="Building 1" bind:elem={buildings.building1} {getBoundings}>
		<Build1 />
	</Building>
	<Building label="Building 2" bind:elem={buildings.building2} {getBoundings}>
		<Build2 />
	</Building>
	<Building label="Building 3" bind:elem={buildings.building3} {getBoundings}>
		<Build3 />
	</Building>
	<Building label="Building 4" bind:elem={buildings.building4} {getBoundings}>
		<Build4 />
	</Building>
</article>
