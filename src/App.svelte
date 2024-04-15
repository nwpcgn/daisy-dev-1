<script lang="ts">
	import { nav } from './views/views'
	import { onMount } from 'svelte'
	import { path, dynamic } from 'elegua'
	import { sleep, stage } from './lib'
	import Error from './views/NotFound.svelte'
	import NavBar from './lib/components/NavBar.svelte'
	import SvgSprite from './views/site3/SvgSprite.svelte'
	import View0 from './views/Start.svelte'
	import View1 from './views/Site1.svelte'
	import View2 from './views/Site2.svelte'
	import View3 from './views/Site3.svelte'
	import View4 from './views/Site4.svelte'
	let version = 2
	let elem
	let promise

	let theme = 'dim'

	onMount(() => {
		stage.set(elem)
		path.set('/')
		promise = sleep(100)
	})
</script>

<NavBar {nav} />
<main bind:this={elem} class="main" data-theme={theme}>
	{#await promise then value}
		<svelte:component
			this={dynamic(
				$path,
				[
					['/', View0],
					['/v1', View1],
					['/v2', View2],
					['/v3', View3],
					['/v4', View4]
				],
				Error
			)} />
	{/await}
</main>
<SvgSprite />
