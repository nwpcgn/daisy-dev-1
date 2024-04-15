<script>
	import { quadInOut } from 'svelte/easing'
	import { fade } from 'svelte/transition'
	export let dura = 4000
</script>

<aside transition:fade={{ duration: 400, easing: quadInOut }} class="spinner">
	<span class="loader-2" />
</aside>

<style>
	.spinner {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		overflow: hidden;
		z-index: 40;
		display: grid;
		place-content: center;
		background-color: rgba(51, 65, 85, 0.89);
	}
	.loader-3 {
		width: 96px;
		height: 96px;
		border: 5px solid #fff;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		-webkit-animation: rotation 1s linear infinite;
		animation: rotation 1s linear infinite;
	}
	.loader-3:after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 88px;
		height: 88px;
		border-radius: 50%;
		border: 5px solid;
		border-color: #ff3d00 transparent;
	}

	.loader-1 {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		border: 3px solid;
		border-color: #fff #fff transparent transparent;
		-webkit-animation: rotation 1s linear infinite;
		animation: rotation 1s linear infinite;
	}
	.loader-1:after,
	.loader-1:before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border: 3px solid;
		border-color: transparent transparent #ff3d00 #ff3d00;
		width: 88px;
		height: 88px;
		border-radius: 50%;
		-webkit-animation: rotationBack 0.5s linear infinite;
		animation: rotationBack 0.5s linear infinite;
		transform-origin: center center;
	}
	.loader-1:before {
		width: 80px;
		height: 80px;
		border-color: #fff #fff transparent transparent;
		-webkit-animation: rotation 1.5s linear infinite;
		animation: rotation 1.5s linear infinite;
	}

	.loader-2 {
		width: 96px;
		height: 96px;
		border: 3px dotted #fff;
		border-style: solid solid dotted dotted;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		-webkit-animation: rotation 2s linear infinite;
		animation: rotation 2s linear infinite;
	}
	.loader-2:after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border: 3px dotted #ff3d00;
		border-style: solid solid dotted;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		-webkit-animation: rotationBack 1s linear infinite;
		animation: rotationBack 1s linear infinite;
		transform-origin: center center;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes rotationBack {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
	@keyframes rotationBreak {
		0% {
			transform: rotate(0);
		}
		25% {
			transform: rotate(90deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes zeroRotation {
		0% {
			transform: scale(1) rotate(0deg);
		}
		100% {
			transform: scale(0) rotate(360deg);
		}
	}
</style>
