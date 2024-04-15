<script lang="ts">
	import { width } from '../../lib'
	let count = 7
	let scale = 1
	let backgroundBuildings = []
	let bgArr = []

	function run() {
		backgroundBuildings = []
		bgArr = []
		for (let i = 0; i < count; i++) {
			generateBackgroundBuilding(i)
		}
		drawBackgroundBuildings()
	}

	function generateBackgroundBuilding(index) {
		const previousBuilding = backgroundBuildings[index - 1]

		const x = previousBuilding
			? previousBuilding.x + previousBuilding.width + 20
			: 20

		const minWidth = 90
		const maxWidth = 160
		const width = minWidth + Math.random() * (maxWidth - minWidth)

		const minHeight = 180
		const maxHeight = 420
		const height = minHeight + Math.random() * (maxHeight - minHeight)

		backgroundBuildings.push({ x, width, height })
	}

	function drawBackgroundBuildings() {
		bgArr = []

		backgroundBuildings.forEach((building) => {
			bgArr.push({
				x: Math.round(building.x * scale),
				y: 0,
				width: Math.round(building.width * scale),
				height: Math.round(building.height * scale),
				bg: '#947285'
			})
		})
	}
	$: run($width)
</script>

{#key $width}
	<section class="layer flex items-end justify-center gap-4">
		{#each bgArr as { x, y, width, height, bg }}
			<div
				class="bgBuilding bg-base-300 bg-opacity-80 rounded-t"
				style="--x: {x}px; --y: {y}px; --w: {width}px; --h: {height}px; --bgc: {bg};">
				<!-- x -->
			</div>
		{/each}
	</section>
{/key}
