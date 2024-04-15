<script lang="ts">
	import { onMount } from 'svelte'
	import { randNum, props } from '../../lib'
	let bubbles = []
	function initBubbles() {
		bubbles = []
		const bubblecount = Math.round(($props.width / 80) * 10)
		for (let index = 0; index < bubblecount; index++) {
			let size = randNum(50, 120) / 10,
				left = randNum(0, 95),
				top = randNum(10, 99),
				delay = randNum(0, 30) / 10
			let style = `top:${top}%; left:${left}%; width:${size}px; height:${size}px; animation-delay: ${delay}s;`
			let obj = { className: 'particle', style, index }
			bubbles.push(obj)
		}
		return bubbles
	}

	onMount(() => {
		initBubbles()
	})
</script>

<section class="absolute inset-0 overflow-hidden grid">
	<div class="particletext bubbles">
		{#each bubbles as { className, style, index }}
			<span class={className} {style} data-id={index}>
				<span class="sr-only">{index}</span>
			</span>
		{/each}
	</div>
</section>

<style>
	.particletext {
		text-align: center;
		font-size: 190px;
		position: relative;
	}
	.particletext.bubbles > .particle {
		opacity: 0;
		position: absolute;
		background-color: rgba(33, 150, 243, 0.5);
		-webkit-animation: bubbles 2s ease-in infinite;
		animation: bubbles 2s ease-in infinite;
		border-radius: 100%;
	}
	.particletext.confetti > .particle {
		opacity: 0;
		position: absolute;
		-webkit-animation: confetti 2s ease-in infinite;
		animation: confetti 2s ease-in infinite;
	}
	.particletext.confetti > .particle.c1 {
		background-color: rgba(76, 175, 80, 0.5);
	}
	.particletext.confetti > .particle.c2 {
		background-color: rgba(156, 39, 176, 0.5);
	}

	.particletext > .hide {
		opacity: 0;
	}

	@keyframes bubbles {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
			-webkit-transform: translate(0, -20%);
			transform: translate(0, -20%);
		}
		100% {
			opacity: 0;
			-webkit-transform: translate(0, -1000%);
			transform: translate(0, -1000%);
		}
	}
	@keyframes confetti {
		0% {
			opacity: 0;
			-webkit-transform: translateY(0%) rotate(0deg);
			transform: translateY(0%) rotate(0deg);
		}
		10% {
			opacity: 1;
		}
		35% {
			-webkit-transform: translateY(-800%) rotate(270deg);
			transform: translateY(-800%) rotate(270deg);
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			-webkit-transform: translateY(2000%) rotate(1440deg);
			transform: translateY(2000%) rotate(1440deg);
		}
	}
</style>
