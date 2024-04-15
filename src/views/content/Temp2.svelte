<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	export let slug, name, info, imgUrl, total, max, mods, cost, stars
</script>

<div
	class="grid gap-4">
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">Status {name}</div>
			<div class="stat-value">{total}</div>
			<div class="stat-desc space-x-4">
				{#each Object.entries(mods) as [k, v]}
					<span>{v} / {k}</span>
				{/each}
			</div>
		</div>
	</div>
	<button
		data-slug={slug}
		on:click={() => dispatch('click', slug)}
		class="btn btn-secondary btn-sm">Action</button>
</div>

<style>
</style>
