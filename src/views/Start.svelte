<script lang="ts">
	import Tatooin from './site3/Tatooin.svelte'

	import { props } from '../lib'
	export let title = 'Startseite'
</script>

<svelte:head><title>{title}</title></svelte:head>
<Tatooin />
<section class="layer center">
	<article class="content">
		<div class="card bg-neutral text-neutral-content">
			<div class="card-body items-center text-center">
				<h2 class="card-title text-3xl">{title}</h2>
				<p class="py-4">{$props.width}-{$props.height}</p>
				<div class="card-actions justify-end">
					<a href="/v1" class="btn btn-primary">Accept</a>
					<a href="/v4" class="btn btn-ghost">Deny</a>
				</div>
			</div>
		</div>
	</article>
</section>

<style>
</style>
