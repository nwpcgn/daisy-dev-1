<script lang="ts">
	import { width, height } from '../lib'
	import Bubbles from './content/Bubbles.svelte'

	export let title = 'Site 1'
	let state = { backgroundBuildings: [], buildings: [], scale: 1 }
	let bgArr = []
	let buildArr = []
	$: run($width, $height)

	function run() {
		state = {
			phase: 'aiming', // aiming | in flight | celebrating
			backgroundBuildings: [],
			buildings: [],
			scale: 1
		}

		for (let i = 0; i < 11; i++) {
			generateBackgroundBuilding(i)
		}

		for (let i = 0; i < 8; i++) {
			generateBuilding(i)
		}

		calculateScale()
		draw()
	}

	function generateBackgroundBuilding(index) {
		const previousBuilding = state.backgroundBuildings[index - 1]

		const x = previousBuilding
			? previousBuilding.x + previousBuilding.width + 4
			: -30

		const minWidth = 60
		const maxWidth = 110
		const width = minWidth + Math.random() * (maxWidth - minWidth)

		const minHeight = 80
		const maxHeight = 350
		const height = minHeight + Math.random() * (maxHeight - minHeight)

		state.backgroundBuildings.push({ x, width, height })
	}

	function generateBuilding(index) {
		const previousBuilding = state.buildings[index - 1]

		const x = previousBuilding
			? previousBuilding.x + previousBuilding.width + 4
			: 0

		const minWidth = 80
		const maxWidth = 130
		const width = minWidth + Math.random() * (maxWidth - minWidth)

		const platformWithGorilla = index === 1 || index === 6

		const minHeight = 40
		const maxHeight = 300
		const minHeightGorilla = 30
		const maxHeightGorilla = 150

		const height = platformWithGorilla
			? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
			: minHeight + Math.random() * (maxHeight - minHeight)

		// Generate an array of booleans to show if the light is on or off in a room
		const lightsOn = []
		for (let i = 0; i < 50; i++) {
			const light = Math.random() <= 0.33 ? true : false
			lightsOn.push(light)
		}

		state.buildings.push({ x, width, height, lightsOn })
	}

	function calculateScale() {
		const lastBuilding = state.buildings.at(-1)
		const totalWidthOfTheCity = lastBuilding.x + lastBuilding.width
		function calc(x) {
			return Number.parseFloat(x).toFixed(2)
		}

		state.scale = calc($width / totalWidthOfTheCity)
	}

	function draw() {
		console.clear()
		console.log({ scale: state.scale })
		/* 		console.log(
		Object.keys({
			x: -30,
			y: 0,
			width: 103,
			height: 107,
			bg: '#947285'
		}).join(', ')
	) */

		// ctx.save();
		// Flip coordinate system upside down
		// ctx.translate(0, window.innerHeight);
		// ctx.scale(1, -1);
		// ctx.scale(state.scale, state.scale);
		// Draw scene
		// drawBackground();
		drawBackgroundBuildings()
		drawBuildings()
		// Restore transformation
		// ctx.restore();
	}

	function drawBackground() {
		console.log('DrawBackground')
		// const gradient = ctx.createLinearGradient(
		// 	0,
		// 	0,
		// 	0,
		// 	window.innerHeight / state.scale
		// )
		// gradient.addColorStop(1, '#F8BA85')
		// gradient.addColorStop(0, '#FFC28E')

		// // Draw sky
		// ctx.fillStyle = gradient
		// ctx.fillRect(
		// 	0,
		// 	0,
		// 	window.innerWidth / state.scale,
		// 	window.innerHeight / state.scale
		// )

		// // Draw moon
		// ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
		// ctx.beginPath()
		// ctx.arc(300, 350, 60, 0, 2 * Math.PI)
		// ctx.fill()
	}

	function drawBackgroundBuildings() {
		bgArr = []

		state.backgroundBuildings.forEach((building) => {
			bgArr.push({
				x: Math.round(building.x * state.scale),
				y: 0,
				width: Math.round(building.width * state.scale),
				height: Math.round(building.height * state.scale),
				bg: '#947285'
			})
		})

		console.log({ bgArr })
	}

	function drawBuildings() {
		buildArr = []
		state.buildings.forEach((building, id) => {
			let ob = {
				type: 'building',
				childNotes: []
			}
			ob.name = `Building ${id + 1}`
			ob.bg = '#4A3C68'
			ob.x = Math.round(building.x * state.scale)
			ob.y = 0
			ob.width = Math.round(building.width * state.scale)
			ob.height = Math.round(building.height * state.scale)

			const windowWidth = 10
			const windowHeight = 12
			const gap = 15

			const numberOfFloors = Math.ceil(
				(building.height - gap) / (windowHeight + gap)
			)
			const numberOfRoomsPerFloor = Math.floor(
				(building.width - gap) / (windowWidth + gap)
			)

			for (let floor = 0; floor < numberOfFloors; floor++) {
				for (let room = 0; room < numberOfRoomsPerFloor; room++) {
					if (building.lightsOn[floor * numberOfRoomsPerFloor + room]) {
						// ctx.save()

						// ctx.translate(building.x + gap, building.height - gap)
						// ctx.scale(1, -1)
						const ty = Math.round((building.height - gap) * state.scale)
						const tx = Math.round((building.x + gap) * state.scale)
						const x = Math.round(room * (windowWidth + gap) * state.scale)
						const y = Math.round(floor * (windowHeight + gap) * state.scale)
						const width = Math.round(windowWidth * state.scale)
						const height = Math.round(windowHeight * state.scale)
						const bg = '#EBB6A2'
						ob.childNotes.push({
							tx,
							ty,
							x,
							y,
							width,
							height,
							bg
						})
					}
				}
			}
			buildArr.push(ob)
		})

		console.log({ buildArr })
	}
</script>

<svelte:head><title>{title}</title></svelte:head>

<Bubbles />

<section class="layer">
	<article class="content">
		<header class="text-center mb-4"><h2 class="text-6xl">{title}</h2></header>
	</article>
</section>

<section class="layer">
	{#each bgArr as { x, y, width, height, bg }}
		<header
			class="bg-building"
			style="--x: {x}px; --y: {y}px; --w: {width}px; --h: {height}px; --bgc: {bg};">
			<!-- x -->
		</header>
	{/each}
</section>
<section class="layer">
	{#each buildArr as { x, y, width, height, bg, childNotes }, i}
		<section
			class="bg-building"
			style="--x: {x}px; --y: {y}px; --w: {width}px; --h: {height}px; --bgc: {bg};" />
		{#each childNotes as { x, y, width, height, bg, tx, ty }}
			<div
				class="window"
				style="--x: {x}px; --y: {y}px; --w: {width}px; --h: {height}px; --bgc: {bg}; --ty: 0; --tx: {tx}px;" />
		{/each}
	{/each}
</section>

<style>
	.bg-building {
		position: absolute;
		left: var(--x, 0);
		bottom: var(--y, 0);
		width: var(--w, 80px);
		height: var(--h, 260px);
		background-color: var(--bgc, #999);
	}
	.window {
		position: absolute;
		left: var(--x, 0);
		bottom: var(--y, 0);
		width: var(--w, 80px);
		height: var(--h, 260px);
		background-color: var(--bgc, #999);
		transform: translate(var(--tx, 0), var(--ty, 0));
	}
</style>
