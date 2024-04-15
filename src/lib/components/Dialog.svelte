<script context="module">
	import { onMount } from 'svelte'
	import { get, writable } from 'svelte/store'

	let dialog

	const _open = writable(false)
	const _payload = writable({})

	let _closePromise

	export const openModal = (payload) => {
		if (!dialog) return
		_open.set(true)
		_payload.set(payload)
		dialog.showModal()
		return new Promise((resolve) => {
			_closePromise = resolve
		})
	}

	export const closeModal = () => {
		_open.set(false)
		dialog.close()

		if (typeof _closePromise === 'function') {
			_closePromise(get(_payload))
		}
	}
</script>

<script>
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box w-full max-w-xs">
		{#if $_open}
			<slot payload={$_payload} close={closeModal}>
				<h3 class="font-bold text-lg">Hello!</h3>
				<p class="py-4">Press ESC key or click the button below to close</p>
			</slot>
		{/if}

		<!-- 		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div> -->
	</div>
</dialog>
