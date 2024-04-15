<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let slug, name, info, imgUrl, total, max, mods, cost, stars
</script>

<div class="card bg-base-100 w-full shadow-xl image-full">
	<figure>
		<img src={imgUrl} alt="Shoes" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{name}</h2>
		<div class="stat-value">{total}</div>
		<p class="space-x-4">
			{#each Object.entries(mods) as [k, v]}
				<span>{v} / {k}</span>
			{/each}
		</p>
		<div class="card-actions justify-end">
			<button
				data-slug={slug}
				on:click={() => dispatch('click', slug)}
				class="btn btn-sm">Action</button>
		</div>
	</div>
</div>

<style>
</style>
