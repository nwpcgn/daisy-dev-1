<script lang="ts">
	import { onMount } from 'svelte'
	export let title = 'Canvas 1'
	let canvas
	let context
	let scrollCounter, cameraY, current, mode, xSpeed
	let cW = 800
	let cH = 600
	let ySpeed = 5
	let height = 50
	let width = 300
	let boxes = []
	boxes[0] = {
		x: (cW - width) / 2,
		y: (cH - height) / 2,
		width
	}
	let debris = {
		x: 0,
		width: 0
	}

	function newBox() {
		boxes[current] = {
			x: 0,
			y: (current + 10) * height,
			width: boxes[current - 1].width
		}
	}

	function gameOver() {
		mode = 'gameOver'
		context.fillText('Game over. Click to play again!', 50, 50)
	}

	function animate() {
		if (mode != 'gameOver') {
			context.clearRect(0, 0, cW, cH)
			context.fillText('Score: ' + (current - 1).toString(), 100, 200)
			for (let n = 0; n < boxes.length; n++) {
				let box = boxes[n]
				context.fillStyle = 'rgb(' + n * 16 + ',' + n * 16 + ',' + n * 16 + ')'
				context.fillRect(box.x, 600 - box.y + cameraY, box.width, height)
			}
			context.fillStyle = 'red'
			context.fillRect(debris.x, 600 - debris.y + cameraY, debris.width, height)
			if (mode == 'bounce') {
				boxes[current].x = boxes[current].x + xSpeed
				if (xSpeed > 0 && boxes[current].x + boxes[current].width > cW)
					xSpeed = -xSpeed
				if (xSpeed < 0 && boxes[current].x < 0) xSpeed = -xSpeed
			}
			if (mode == 'fall') {
				boxes[current].y = boxes[current].y - ySpeed
				if (boxes[current].y == boxes[current - 1].y + height) {
					mode = 'bounce'
					let difference = boxes[current].x - boxes[current - 1].x
					if (Math.abs(difference) >= boxes[current].width) {
						gameOver()
					}
					debris = {
						y: boxes[current].y,
						width: difference
					}
					if (boxes[current].x > boxes[current - 1].x) {
						boxes[current].width = boxes[current].width - difference
						debris.x = boxes[current].x + boxes[current].width
					} else {
						debris.x = boxes[current].x - difference
						boxes[current].width = boxes[current].width + difference
						boxes[current].x = boxes[current - 1].x
					}
					if (xSpeed > 0) xSpeed++
					else xSpeed--
					current++
					scrollCounter = height
					newBox()
				}
			}
			debris.y = debris.y - ySpeed
			if (scrollCounter) {
				cameraY++
				scrollCounter--
			}
		}
		window.requestAnimationFrame(animate)
	}

	function restart() {
		boxes.splice(1, boxes.length - 1)
		mode = 'bounce'
		cameraY = 0
		scrollCounter = 0
		xSpeed = 2
		current = 1
		newBox()
		debris.y = 0
	}

	function handlePointerDown() {
		if (mode == 'gameOver') restart()
		else {
			if (mode == 'bounce') mode = 'fall'
		}
	}

	onMount(() => {
		context = canvas.getContext('2d')
		restart()
		animate()
	})
</script>

<svelte:head><title>{title}</title></svelte:head>

<section class="layer center">
	<canvas
		on:pointerdown={handlePointerDown}
		bind:this={canvas}
		class="border bg-gray-100 bg-opacity-50"
		width={cW}
		height={cH} />
	<nav>
		<a href="/">Home</a>
	</nav>
</section>

<style>
	/* section {
		pointer-events: none;
	}
	header {
		pointer-events: all;
	} */
</style>
