<script>
	import { onMount } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { expoInOut as easing } from 'svelte/easing'
	import { distance, sleep, width, height } from '../../lib'
	let elem
	let fX = 0
	let fY = 0
	let fD = 1
	let night = false

	const progress = tweened(0, {
		duration: 400,
		easing
	})

	function reset() {
		// let mX = $width - $fpos.width
		// let mY = $height - $fpos.height
		let resX = $width / 2
		let resY = $height * 0.2
		let x1 = fX
		let y1 = fY
		let x2 = Math.floor(resX)
		let y2 = Math.floor(resY)
		let dis = Math.round(distance(x1, y1, x2, y2))
		fD = (dis * 3) / 1000
		fX = x2
		fY = y2
	}

	onMount(async () => {
		await sleep(200)
		fX = -140
		fY = $height / 2
		await sleep(1000)
		reset()
		progress.set(1)
		await sleep(2000)
		night = true
		await sleep(2000)
		night = false
	})
</script>

<section class="absolute inset-0 overflow-hidden tatooin" class:night={night}>
	<svg
		viewBox="0 0 496.11133 475.9585"
		version="1.1"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xmlns="http://www.w3.org/2000/svg"
		class="sun-moon">
		<defs>
			<path
				d="M496.111 0L496.111 0L496.111 475.958L0 475.958L0 0L496.111 0Z"
				id="path_1" />
			<clipPath id="clip_1">
				<use xlink:href="#path_1" clip-rule="evenodd" fill-rule="evenodd" />
			</clipPath>
		</defs>
		<g id="sun-moon">
			<path
				d="M496.111 0L496.111 0L496.111 475.958L0 475.958L0 0L496.111 0Z"
				id="sun-moon"
				fill="none"
				stroke="none" />
			<path
				d="M340.36 475.957C426.78 475.558 496.51 405.181 496.11 318.767C495.71 232.353 425.33 162.627 338.92 163.027C252.5 163.426 182.77 233.803 183.17 320.217C183.57 406.631 253.947 476.357 340.36 475.957L340.36 475.957Z"
				id="path-sun"
				fill="#FFFFFF"
				fill-opacity="0.5"
				fill-rule="evenodd"
				stroke="none"
				clip-path="url(#clip_1)" />
			<path
				d="M92.008 183.167C142.587 182.933 183.401 141.74 183.167 91.16C182.933 40.58 141.74 -0.233002 91.16 0.00100708C40.581 0.235001 -0.233032 41.428 0.000976563 92.008C0.234985 142.588 41.428 183.401 92.008 183.167L92.008 183.167Z"
				id="path-moon"
				fill="#FFFFFF"
				fill-rule="evenodd"
				stroke="none"
				clip-path="url(#clip_1)" />
		</g>
	</svg>
	<svg
		viewBox="0 0 3324.8098 399.00012"
		version="1.1"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xmlns="http://www.w3.org/2000/svg"
		class="dunes">
		<g id="dunes">
			<path
				d="M1918 0L1918 0L1918 399L0 399L0 0L1918 0Z"
				id="dunes"
				fill="none"
				stroke="none"
				transform="translate(856.58984 0)" />
			<path
				d="M1437.6 205.88L1877.81 205.88L1877.81 399L-856.59 399L-856.59 43.4399L157.91 43.4399C346.82 43.4399 535.32 61.2839 720.88 96.736L1149.35 178.596C1244.36 196.747 1340.86 205.883 1437.59 205.883L1437.6 205.88Z"
				id="path-dune-back"
				fill="#E28800"
				fill-opacity="0.4"
				fill-rule="evenodd"
				stroke="none"
				transform="translate(856.58984 0)" />
			<path
				d="M757.82 124.63L-415.98 399L2468.22 399L2468.22 0.330078L1549.26 0.330078C1361.54 0.330078 1174.51 22.8371 992.26 67.3611L757.86 124.625L757.82 124.63Z"
				id="path-dune-front"
				fill="#E28800"
				fill-rule="evenodd"
				stroke="none"
				transform="translate(856.58984 0)" />
		</g>
	</svg>
	<svg
		style="--mill-x: {fX}px; --mill-y: {fY}px; --mill-d: {fD}s;"
		bind:this={elem}
		viewBox="0 0 145.18994 123.861694"
		class="millenium"
		opacity={$progress}>
		<defs>
			<path
				d="M145.19 0L145.19 0L145.19 123.862L0 123.862L0 0L145.19 0Z"
				id="path_1" />
			<clipPath id="clip_1">
				<use xlink:href="#path_1" clip-rule="evenodd" fill-rule="evenodd" />
			</clipPath>
		</defs>
		<g id="millenium">
			<path
				d="M145.19 0L145.19 0L145.19 123.862L0 123.862L0 0L145.19 0Z"
				id="millenium"
				fill="none"
				stroke="none" />
			<path
				d="M84.355 116.286C57.389 131.855 23.088 122.664 7.51903 95.6984C-7.92397 68.9505 1.14203 34.4314 28.107 18.8634C37.241 13.5894 47.379 10.0564 57.869 8.63945L113.275 0.138443C116.385 -0.497559 119.625 1.10744 121.265 3.93445L126.535 13.0674C127.665 15.0244 127.025 17.4264 125.065 18.5555L100.275 32.8685L97.445 34.5014C95.485 35.6315 94.975 38.2494 95.975 39.9895L99.995 46.9485C101.125 48.9055 103.525 49.5485 105.485 48.4185L108.305 46.7865L133.315 32.3485C135.055 31.3435 137.805 32.0785 138.805 33.8185L144.205 43.1695C145.835 45.9965 145.385 49.7365 143.275 52.1125L129.465 69.3665C131.215 70.3865 132.995 71.9675 133.995 73.7075C137.385 79.5785 135.245 86.9075 129.585 90.1715L112.195 100.217C109.585 101.723 106.655 101.674 104.215 100.469C98.515 106.662 91.745 112.019 84.355 116.286L84.355 116.286ZM50.2051 57.1365C53.9011 55.0025 58.4191 55.2935 62.1341 57.2085C65.9741 59.3405 68.3601 63.4715 68.1601 67.6465C68.0861 72.0385 65.9541 75.8785 62.2581 78.0135C58.3431 80.2735 53.9511 80.1995 50.1111 78.0675C46.3961 76.1525 44.0101 72.0205 44.0841 67.6295C44.2841 63.4545 46.2901 59.3965 50.2051 57.1365L50.2051 57.1365ZM66.275 84.9725C72.364 81.4565 76.135 74.9305 76.258 67.6105C76.289 60.6335 72.397 53.8925 66.214 50.2135C59.939 46.8775 52.276 46.6625 46.187 50.1775C39.88 53.8185 36.235 60.5625 35.986 67.6655C36.081 74.8595 39.973 81.6005 46.031 85.0625C52.431 88.6155 59.969 88.6135 66.275 84.9725L66.275 84.9725ZM26.925 89.1334C28.665 88.1294 29.526 85.6024 28.396 83.6454C27.391 81.9064 24.647 81.1704 22.907 82.1754C20.95 83.3054 20.432 85.9234 21.437 87.6634C22.567 89.6204 24.968 90.2634 26.925 89.1334L26.925 89.1334ZM23.301 58.7514C22.297 57.0114 19.553 56.2764 17.813 57.2804C15.856 58.4104 15.338 61.0294 16.343 62.7694C17.473 64.7264 19.874 65.3694 21.831 64.2394C23.571 63.2354 24.431 60.7084 23.301 58.7514L23.301 58.7514ZM45.9371 105.992C47.6771 104.988 48.5381 102.461 47.4081 100.504C46.403 98.7645 43.6591 98.0295 41.9191 99.0345C39.9621 100.163 39.444 102.782 40.4491 104.522C41.5791 106.479 43.9801 107.122 45.9371 105.992L45.9371 105.992Z"
				id="path-falcon"
				fill="#193154"
				fill-rule="evenodd"
				stroke="none"
				clip-path="url(#clip_1)" />
		</g>
	</svg>
</section>

<style>
	.sun-moon {
		height: 30vh;
		width: auto;
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(50vw, 10%);
	}

	.night #path-sun {
		opacity: 0;
	}

	.night #path-moon {
		opacity: 1;
		transition: opacity 1s ease-in-out;
	}

	#path-sun {
		opacity: 0.5;
		transition: opacity 1s ease-in-out;
	}

	#path-moon {
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.dunes {
		position: absolute;
		bottom: 0;
		height: 300px;
		left: 50%;
		transform: translateX(-50%);
		min-width: 100%;
	}

	.millenium {
		--mill-x: 50%;
		--mill-y: 50%;
		--mill-w: 140px;
		--mill-d: 1s;
		width: var(--mill-w);
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(var(--mill-x), var(--mill-y));
		transition: transform var(--mill-d);
	}

	.tatooin {
		background-color: #fab005;
	}
</style>
