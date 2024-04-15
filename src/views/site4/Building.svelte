<script lang="ts">
	import { onMount } from 'svelte'
	export let getBoundings
	export let label = 'Office'
	export let elem = {
		width: 126,
		height: 160,
		x: 0,
		y: 0
	}

	let element
	onMount(() => {
		elem = getBoundings(element, label)
	})

	let show, open

	function showLabel(): void {
		show = true
	}
	function hideLabel(): void {
		show = false
	}
	function toggle(): void {
		open = !open
	}
</script>

<div
	class="relative cursor-pointer"
	bind:this={element}
	on:pointerenter={showLabel}
	on:pointerleave={hideLabel}
	on:pointerdown={toggle}>
	<slot />
	<header
		class="absolute inset-x-0 -top-10 grid place-content-center transition-all duration-300 ease-in-out pointer-events-none"
		class:opacity-0={!show}>
		<span class="badge badge-neutral">{label}</span>
	</header>
	<aside
		class="absolute left-4 top-4 transform transition-all duration-500 ease-in"
		class:opacity-0={!open}
		class:translate-x-full={!open}
		class:pointer-events-none={!open}>
		<ul class="menu bg-base-200 rounded-box">
			<li class="menu-title">Aktionen</li>
			<li><button>Open</button></li>
			<li><button on:click={toggle}>Cancel</button></li>
		</ul>
	</aside>
</div>
