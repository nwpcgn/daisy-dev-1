<script lang="ts">
	import { onMount } from 'svelte'
	import { sleep } from '../lib'

	let clicks = 1000 //increment this by one every click
	let auto_clicks = 0 //automatically click once per second
	let cost = 1 //the cost of this should increase exponentially
	let upgrade_speed = 0 //the level of the speed up upgrade
	let speed_cost = 100
	let click_cost = 100
	let click_rate = 1000 //ms between each autoclick
	let interval_auto //storing our interval here so we can update it
	let timerId1
	let click_increment = 1 //how many clicks per click
	let theme = 'retro'
	let frame,
		template1 = ''
	let daten = {
		header: 'IncreMENTAL!',
		clicks,
		auto_clicks,
		cost,
		upgrade_speed,
		speed_cost,
		click_rate,
		click_increment,
		click_cost,
		themes: [
			'light',
			'dark',
			'cupcake',
			'corporate',
			'dracula',
			'retro',
			'cyberpunk',
			'valentine',
			'pastel',
			'wireframe',
			'winter',
			'dim',
			'nord'
		]
	}
	onMount(() => {
		console.log('MOUNTED')
	})
	let svgW = 660,
		svgH = 500

	function handlePointerDown(e) {
		const elem = e.currentTarget

		// if (id === 'office-desk') return
		elem.setAttribute('opacity', '0.2')
		sleep(500).then(() => {
			elem.setAttribute('opacity', '1')
		})
	}
	function handlePointerUp(e) {
		const elem = e.currentTarget
		const rect = elem.getBoundingClientRect()
		const id = elem.dataset.id
		let nObj = { id }
		nObj.x = Math.round(rect.x)
		nObj.y = Math.round(rect.y)
		nObj.width = Math.round(rect.width)
		nObj.height = Math.round(rect.height)
		createNotification(nObj)
	}

	let show = false
	let noteToast = {
		id: 'note',
		x: 321,
		y: 245
	}
	function createNotification(obj) {
		if (timerId1) clearTimeout(timerId1)

		noteToast = { ...noteToast, ...obj }
		template1 = `--toast-left: ${obj.x}px; --toast-top: ${obj.y - 120}px;`
		show = true
		timerId1 = setTimeout(() => (show = false), 5000)
	}
</script>

<svelte:head><title>{daten.header}</title></svelte:head>

<section bind:this={frame} class="layer center">
	<div
		class="border-4 border-gray-400 border-dashed p-4 bg-gray-100 bg-opacity-10 rounded-box">
		<svg
			width={svgW}
			height={svgH}
			viewBox="0 0 661.2 499.9281"
			class="max-w-full max-h-full">
			<defs>
				<path
					d="M661.2 0L661.2 0L661.2 499.928L0 499.928L0 0L661.2 0Z"
					id="path_1" />
				<clipPath id="clip_1">
					<use xlink:href="#path_1" clip-rule="evenodd" fill-rule="evenodd" />
				</clipPath>
			</defs>
			<g id="Frame">
				<path
					d="M661.2 0L661.2 0L661.2 499.928L0 499.928L0 0L661.2 0Z"
					id="Frame"
					fill="none"
					stroke="none" />
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="cursor-pointer transition-all duration-500 ease-in-out"
					data-id="office-closet"
					opacity="1"
					transform="translate(406 0)"
					clip-path="url(#clip_1)">
					<use xlink:href="#office-closet" />
				</g>
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="cursor-pointer transition-all duration-500 ease-in-out"
					data-id="office-plant"
					opacity="1"
					transform="translate(542 211)"
					clip-path="url(#clip_1)">
					<use xlink:href="#office-plant" /></g>
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="transition-all duration-500 ease-in-out"
					data-id="office-desk"
					opacity="1"
					transform="translate(120 111)"
					clip-path="url(#clip_1)">
					<use xlink:href="#office-desk" /></g>
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="cursor-pointer transition-all duration-500 ease-in-out"
					data-id="gears"
					opacity="1"
					transform="translate(0 139)"
					clip-path="url(#clip_1)">
					<use xlink:href="#gears" /></g>
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="cursor-pointer transition-all duration-500 ease-in-out"
					data-id="message-2"
					opacity="1"
					transform="translate(73 49)"
					clip-path="url(#clip_1)">
					<use xlink:href="#message-2" /></g>
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="cursor-pointer transition-all duration-500 ease-in-out"
					data-id="message-1"
					opacity="1"
					transform="translate(193 102)"
					clip-path="url(#clip_1)">
					<use xlink:href="#message-1" /></g>
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="cursor-pointer transition-all duration-500 ease-in-out"
					data-id="sms-msg-1"
					opacity="1"
					transform="translate(28 371)"
					clip-path="url(#clip_1)">
					<use xlink:href="#sms-msg-1" /></g>
				<g
					on:pointerup={handlePointerUp}
					on:pointerdown={handlePointerDown}
					class="cursor-pointer transition-all duration-500 ease-in-out"
					data-id="sms-msg-2"
					opacity="1"
					transform="translate(94 417)"
					clip-path="url(#clip_1)">
					<use xlink:href="#sms-msg-2" /></g>
			</g>
		</svg>
	</div>

</section>

{#if show}
	<div
		class="nwp-alert-frame"
		style="left: {noteToast.x}px; top: {noteToast.y}px; width: {noteToast.width}px; height: {noteToast.height}px;" />
	<div
		on:pointerdown={() => (show = false)}
		class="nwp-alert text w-full max-w-xs"
		style={template1}>
		<header class="p-4 rounded-box shadow-xl bg-warning text-gray-600 capitalize">
			<h2 class="font-medium">Office Element</h2>
			<p>Id: {noteToast.id}</p>
			<p>X: {noteToast.x} Y: {noteToast.y}</p>
		</header>
	</div>
{/if}

<style>
	.nwp-alert {
		--toast-left: 1rem;
		--toast-top: 1rem;
		position: fixed;
		left: var(--toast-left);
		top: var(--toast-top);
		@apply transition-all duration-1000 ease-in-out;
	}

	.nwp-alert-frame {
		@apply fixed bg-red-200 bg-opacity-50 border-4 border-red-500 border-dashed transform scale-125 transition-all duration-1000 ease-in-out pointer-events-none rounded-xl;
	}
</style>
