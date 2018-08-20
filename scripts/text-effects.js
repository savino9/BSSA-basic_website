// ---------------------------------------------------------------
// Text effect Hand typing 
// ---------------------------------------------------------------
function typeEffect(element, speed) {
	var text = $(element).text();
	$(element).html('');
	
	var i = 0;
	var timer = setInterval(function() {
		if (i < text.length) {
			$(element).append(text.charAt(i));
			i++;
		} else {
			clearInterval(timer);
		}
	}, speed);
}

$( document ).ready(function() {
  var speed = 65;
  var delay = $('h1').text().length * speed + speed;
  typeEffect($('h1'), speed);
  setTimeout(function(){
    $('p').css('display', 'inline-block');
    typeEffect($('p'), speed);
  }, delay);
});

// ——————————————————————————————————————————————————
// Cyberpunk Manifesto effect
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length - 180, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random()  * this.chars.length)]
  }
}



const phrases = [
  'We are the ELECTRONIC MINDS, a group of free-minded rebels.',
  'Cyberpunks.',
  'We live in Cyberspace, we are everywhere, we know no boundaries.',
  'This is our manifest. ',
  'The Cyberpunks manifest.',
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1800)
  })
  counter = (counter + 1) % phrases.length
}

next()