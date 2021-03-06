const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;
var nombre_jugador = prompt("¡Ingresa tu nombre!  Pon aceptar para poder jugar");
const level = document.getElementById('level');
const source = document.getElementById('source');


/*----- ESTA ES LA RAMA PARA PONER EL NIVEL Y LOS PUNTOS----*/

class Juego
{
	constructor()
	{
		this.inicializar=this.inicializar.bind(this);
		this.inicializar();
		this.generarSecuencia();
		setTimeout(this.siguienteNivel(),800);
	}
	inicializar()	

	{	
		this.nombre_jugador
		this.elegirColor= this.elegirColor.bind(this)
		this.siguienteNivel = this.siguienteNivel.bind(this)
		this.toggleBtnEmpezar()
		this.nivel = 1
		this.puntos = 0
		this.colores = { 
			celeste,
			violeta,
			naranja,
			verde}
		level.innerHTML= `Nivel:${this.nivel}` 
		source.innerHTML= `Puntos:${this.puntos}`
	}

	toggleBtnEmpezar()
	{
		if(btnEmpezar.classList.contains('hide'))
		{
			btnEmpezar.classList.remove('hide')
		}
		else
		{
			btnEmpezar.classList.add('hide')
		}
	}


	generarSecuencia()
	{
		this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
	}

	siguienteNivel()
	{
		this.subNivel = 0
		this.iluminarSecuencia()
		this.agregarEventoClick()
	}

	transformarNumeroAColor(numero)
	{
		switch(numero)
		{
			case 0:
				return'celeste'
			case 1:
				return'violeta'
			case 2:
				return'naranja'
			case 3:
				return'verde'
		}
	}

	transformarColorANumero(color)
	{
		switch(color)
		{
			case 'celeste':
				return 0
			case 'violeta':
				return 1
			case 'naranja':
				return 2
			case 'verde':
				return 3
		}
	}


	iluminarSecuencia()
	{
		for(let i =0 ; i <this.nivel; i++ )
		{
			const color = this.transformarNumeroAColor(this.secuencia[i])
			this.puntos += 10
			if(this.nivel > 5)
			{
				setTimeout(()=>this.iluminarColor(color), 920*i)

				if(this.nivel > 7)
				{
				setTimeout(()=>this.iluminarColor(color), 850*i)
				}
			}
			else
			{
				setTimeout(()=>this.iluminarColor(color), 1000*i)
			}
			
			 
		}
	}

	iluminarColor(color)
	{
		this.colores[color].classList.add('light')
		setTimeout(()=> this.apagarColor(color), 800)
	}

	apagarColor(color)
	{
		this.colores[color].classList.remove('light')
	}

	agregarEventoClick()
	{
		this.colores.celeste.addEventListener('click', this.elegirColor)
		this.colores.violeta.addEventListener('click', this.elegirColor)
		this.colores.naranja.addEventListener('click', this.elegirColor)
		this.colores.verde.addEventListener('click', this.elegirColor)
	}

	eliminarEventoClick()
	{
		this.colores.celeste.removeEventListener('click', this.elegirColor)
		this.colores.violeta.removeEventListener('click', this.elegirColor)
		this.colores.naranja.removeEventListener('click', this.elegirColor)
		this.colores.verde.removeEventListener('click', this.elegirColor)
	}

	levelUp()
	{
		if(this.subNivel === this.nivel)
		{
			level.innerHTML = `Nivel:${this.nivel + 1}`
		}
	}

	sourceUp()
	{
		if(this.iluminarSecuencia)
		{
			source.innerHTML = `Puntos:${this.puntos}`
		}
	}


	elegirColor(ev)
	{
		const nombreColor = ev.target.dataset.color
		const numeroColor = this.transformarColorANumero(nombreColor)
		this.iluminarColor(nombreColor)
		if(numeroColor === this.secuencia[this.subNivel])
		{
			this.subNivel++	
			if(this.subNivel === this.nivel)
			{
				this.levelUp()
				this.nivel++
				this.sourceUp()
				this.eliminarEventoClick()

				if(this.nivel === (ULTIMO_NIVEL + 1))
				{
					this.ganoElJuego()
					level.innerHTML = ''
				}
				else
				{
					setTimeout(this.siguienteNivel, 1600)
					
				}
			
			}
		
		}
		else
		{
			this.perdioElJuego()
		}

	}

	ganoElJuego()
	{
		swal(nombre_jugador, 'Felicidades, ganaste el juego', 'success')
		.then(() => this.inicializar())
	}

	perdioElJuego()
	{
		swal(nombre_jugador, 'Lo lamentamos, perdiste :(', 'error')
		.then(() =>
		{
			this.eliminarEventoClick()
			this.inicializar()
		})
	}
}

function empezarJuego()
{
	let juego = new Juego()
}
	
