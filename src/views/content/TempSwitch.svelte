<script lang="ts">
	export let view = {}
	export let current = 'base'
	export let label = 'View'
</script>

<nav class="flex items-center gap-4 p-2">
	<div class="flex-1">{label}</div>
	{#each Object.keys(view) as key}
		<div class="form-control">
			<label class="label gap-4 cursor-pointer">
				<span
					class="label-text font-bold capitalize"
					class:text-red-500={current === key}>{key}</span>
				<input
					type="radio"
					bind:group={current}
					value={key}
					class="radio checked:bg-red-500" />
			</label>
		</div>
	{/each}
</nav>

<style>
</style>
