<script>
	// import { onMount } from 'svelte'
	import { alert } from '../index'
	const icon2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current" fill="currentColor"><path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>`
	const icon1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path></svg>`
	export let version = 1
	export let brand = 'nwpGame'
	export let nav = []
	let dialog
	function open() {
		if (!dialog) return
		dialog.showModal()
	}

	const onMessageChange = (message) => {
		if (message) {
			open()
		}
	}
	$: onMessageChange($alert)

</script>

<dialog bind:this={dialog} id="my_modal_1" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Info</h3>
		<p class="py-4">{@html $alert}</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>

<header>
	<div class="navbar bg-neutral text-neutral-content">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">{brand}</a>
		</div>
		<div class="flex-none">
			<button on:click={open} class="btn btn-square btn-ghost">
				{@html icon1}
			</button>
			{#if nav.length}
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
						{@html icon2}
					</div>
					<ul
						tabindex="0"
						class="menu dropdown-content z-30 p-2 shadow bg-neutral rounded-box w-52 mt-4">
						{#each nav as { name, href, indexPage }, i}
							{#if !indexPage}
								<li>
									<a href="{href}">{name}</a>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</header>
