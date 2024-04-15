let Loader = {
	images: {}
}

Loader.loadImage = function (key, src) {
	var img = new Image()

	var d = new Promise(
		function (resolve, reject) {
			img.onload = function () {
				this.images[key] = img
				resolve(img)
			}.bind(this)

			img.onerror = function () {
				reject('Could not load image: ' + src)
			}
		}.bind(this)
	)

	img.src = src
	return d
}

Loader.getImage = function (key) {
	return key in this.images ? this.images[key] : null
}

//
// Keyboard handler
//

let Keyboard = {}

Keyboard.LEFT = 37
Keyboard.RIGHT = 39
Keyboard.UP = 38
Keyboard.DOWN = 40

Keyboard._keys = {}

Keyboard.listenForEvents = function (keys) {
	window.addEventListener('keydown', this._onKeyDown.bind(this))
	window.addEventListener('keyup', this._onKeyUp.bind(this))

	keys.forEach(
		function (key) {
			this._keys[key] = false
		}.bind(this)
	)
}

Keyboard._onKeyDown = function (event) {
	var keyCode = event.keyCode
	if (keyCode in this._keys) {
		event.preventDefault()
		this._keys[keyCode] = true
	}
}

Keyboard._onKeyUp = function (event) {
	var keyCode = event.keyCode
	if (keyCode in this._keys) {
		event.preventDefault()
		this._keys[keyCode] = false
	}
}

Keyboard.isDown = function (keyCode) {
	if (!keyCode in this._keys) {
		throw new Error('Keycode ' + keyCode + ' is not being listened to')
	}
	return this._keys[keyCode]
}

//
// Game object
//

let Game = {}

Game.run = function (canvas, width = 512, height = 512) {
	this.canvas = canvas
	this.ctx = canvas.getContext('2d')
	this._previousElapsed = 0
	this._width = width
	this._height = height
	this.canvas.width = width
	this.canvas.height = height

	var p = this.load()
	Promise.all(p).then(
		function (loaded) {
			this.init()
			window.requestAnimationFrame(this.tick)
		}.bind(this)
	)
}

Game.tick = function (elapsed) {
	window.requestAnimationFrame(this.tick)

	// clear previous frame
	this.ctx.clearRect(0, 0, this._width, this._height)

	// compute delta time in seconds -- also cap it
	var delta = (elapsed - this._previousElapsed) / 1000.0
	delta = Math.min(delta, 0.25) // maximum delta of 250 ms
	this._previousElapsed = elapsed

	this.update(delta)
	this.render()
}.bind(Game)

// override these methods to create the demo
Game.init = function () {}
Game.update = function (delta) {}
Game.render = function () {}

//
// start up function
//

// window.onload = function () {
//   var canvas = document.getElementById("canvas1");
//   Game.run(canvas);
// };

function Camera(map, width, height) {
	this.x = 0
	this.y = 0
	this.width = width
	this.height = height
	this.maxX = map.cols * map.tsize - width
	this.maxY = map.rows * map.tsize - height
}

Camera.prototype.follow = function (sprite) {
	this.following = sprite
	sprite.screenX = 0
	sprite.screenY = 0
}

Camera.prototype.update = function () {
	// assume followed sprite should be placed at the center of the screen
	// whenever possible
	this.following.screenX = this.width / 2
	this.following.screenY = this.height / 2

	// make the camera follow the sprite
	this.x = this.following.x - this.width / 2
	this.y = this.following.y - this.height / 2
	// clamp values
	this.x = Math.max(0, Math.min(this.x, this.maxX))
	this.y = Math.max(0, Math.min(this.y, this.maxY))

	// in map corners, the sprite cannot be placed in the center of the screen
	// and we have to change its screen coordinates

	// left and right sides
	if (
		this.following.x < this.width / 2 ||
		this.following.x > this.maxX + this.width / 2
	) {
		this.following.screenX = this.following.x - this.x
	}
	// top and bottom sides
	if (
		this.following.y < this.height / 2 ||
		this.following.y > this.maxY + this.height / 2
	) {
		this.following.screenY = this.following.y - this.y
	}
}

function Hero(map, x, y) {
	this.map = map
	this.x = x
	this.y = y
	this.width = map.tsize
	this.height = map.tsize

	this.image = Loader.getImage('hero')
}

Hero.prototype.move = function (delta, dirx, diry) {
	// move hero
	this.x += dirx * Hero.SPEED * delta
	this.y += diry * Hero.SPEED * delta

	// check if we walked into a non-walkable tile
	this._collide(dirx, diry)

	// clamp values
	var maxX = this.map.cols * this.map.tsize
	var maxY = this.map.rows * this.map.tsize
	this.x = Math.max(0, Math.min(this.x, maxX))
	this.y = Math.max(0, Math.min(this.y, maxY))
}

Hero.prototype._collide = function (dirx, diry) {
	var row, col
	// -1 in right and bottom is because image ranges from 0..63
	// and not up to 64
	var left = this.x - this.width / 2
	var right = this.x + this.width / 2 - 1
	var top = this.y - this.height / 2
	var bottom = this.y + this.height / 2 - 1

	// check for collisions on sprite sides
	var collision =
		this.map.isSolidTileAtXY(left, top) ||
		this.map.isSolidTileAtXY(right, top) ||
		this.map.isSolidTileAtXY(right, bottom) ||
		this.map.isSolidTileAtXY(left, bottom)
	if (!collision) {
		return
	}

	if (diry > 0) {
		row = this.map.getRow(bottom)
		this.y = -this.height / 2 + this.map.getY(row)
	} else if (diry < 0) {
		row = this.map.getRow(top)
		this.y = this.height / 2 + this.map.getY(row + 1)
	} else if (dirx > 0) {
		col = this.map.getCol(right)
		this.x = -this.width / 2 + this.map.getX(col)
	} else if (dirx < 0) {
		col = this.map.getCol(left)
		this.x = this.width / 2 + this.map.getX(col + 1)
	}
}

Hero.SPEED = 256 // pixels per second

export { Loader, Keyboard, Game, Camera, Hero }
