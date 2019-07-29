import "../css/style.scss";


const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

const png = new Image();
png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAnCAYAAABKSgfJAAAQ/0lEQVR42u1da3iU5Zm+n3dmMjM5cFAQIXMARdRddWmxsq1SaqtXL6vFem0LLQqSmcSooKCuulrdGOtZV0EOEslMONqKbVX0cnW9up5WvSqLrlpREZA5cCrIISRznvfeH9+XEM7JZJJMMM+/Icz3fe/73ffz3M/zPu87QJ/1WZ/1WZ/1WS4mnfly7Gn3OIsVFwEAKF/Z/eHlvXESEgHPbSIsAQBNWeL0hzf2xHOwBtaYxz1DKDYKM8WZk+ZJ9Zp0vq6/Z4VnYFEclcab5/Zif2RpPp9fLxl2YjpruREAtFZvOitDb3Tr/K2EJb7P/X0FuZDAGICjAAwDpEwEikQG4D4A2wD5SiAfZDVfLakKrznSNa2dYpcFswn5LgAQiOvAyNeUf/2O3kSOeL33QggfpukrCA4FcE2PeKtaZGIBlCiF+wBByrpjEIDf5uv69jgWisJEEhTIhHw/fwr2E4HsvwOAEk0A3UKQxrqhg+w2642JfahUIkP3e/4D/b8IrIAMBDAQwJkAJ1gsuC8e8HwiCvc6KsJ/OvjaqjPAEjHIYd7cmZLU9b0ufCh984EhVa7SgZGDe+pxnGWRh0i+CwAauD1W7/phPq4bC7qvFoWJpjN72uEPv3w8SKB4wOO3Wa1fEXK3mOQwPV2U5CsgFhC4X8B7ST6mNRpA/jeJb9pg9xwQf4zVu1/as8h1Qn4iiNI3AwKS20D5UhTGk7yeDd6HpSKU6BXSqsF7hta8VAQg8SyASSJwppC6HkBtj0SRicjGAzKV5P+JSBkgS7nylH+SiRv35gyihe5TAcwFABLr9tqSt/R2YpCQZIN7LoDpLZFCk5uUYCGz/JOzKrr+WN9vbvB8RxFTBagUQYlScpmdeLf5KddFJddFN+ccQRrrvGcA8jODqLJAlDxiMFFOSmQ5pdfMsuYsJRBNxNOZ9AwB/2JMHq9ng9fRY1HEH96oFG4059Sb2JdekDOQ3oAVNiwXSBnBtNZ6ytCp25t7O0GSQe+dgEw331dKE7c7MyeNcvgiDx+LHGbUYKkv/GGxPzxLp/TpIF415/sMVaRe1fWnl+VMkCIrZwmgSMQzSC18MBR6VZNfGrk6byI7l/x3i24NnDyYwFRDL3NZv+qtOwGZXShEt1dEFpP8s/k8k5NB7+Sc8oKv3XeLyD+b1/ldSVX0g95OjsTTw0YRusbMGZPQuKzYH34k14JGyXXRzfay8GVao8Ekz1lJFa/LiSBtgUVwRT//th21tdCiMNsAm5yZbPBeUuiTbEXRdSJwaoKgzAEAezj8Col1hUL0dCZTTXKrEez0glj9cG+H8o5FnvOzlN+aXvZ9+6bwg8dD3gGrZYaI2Mx8qsZZFXk9H9LWGQlfo8k3Sayhlrk5EaQFWCRosRikAIA9ltQyEruMuH5g4ltw+rXB6xDh9eYEvObwh9eaVSQNMchSCETvV711J4QVJCgi/UX0Mq6EpT3f3VV3Sn9l4TIlsJBoggVTpBaZ44EfGrjUJH3j7nRmbj6riE6lrnD4wucVV4be7zBB2gJLgNft0yKftfxt6NTtzSCeNvOSHzc1eEcXbIjWvFIgQ4xIoWcfIG2siSUkd5uvoseJ7vRFXxPhPDP0j0s2um9vz/eKbel5gIwwP85yTotsOB7IwQavQ2iMSyDvl1dvjeW1SFIR2iMC3VqLyhVYLXr9QHDpeSTTIhCLLswoYsqmmwBAa651VET/64DinEH0Rcb/LQyiF5XwdpKfAwAV7mmuc33v6NLKOxmQq8zxvuD0hwM4TowqXSJiSF+Cf+/q+6lcgEXyc7sv9OohF5sW3QzgOfPjpOanXOUFFz0We38qgn8EALHIbBHw0JeQnafJTKEQXU2KxrMiV5FMCcSmrGq5Xjqk5LDyo364V5ReYL6nbWmkrsFxZFsTjJOtmBxUMARpCywI5hwOWACghbNpVEyKlF3NKDgPlNW3mJO7016sD9saU+zbEhHIHwuJ6KW+8IcC1JhSa1QiXfTEIWNbCUsSermI9DfyFuXv59+243giSHn11piAmwBAFC7YVXdK/8KIIPuB9c2udGbZEUtmvuhqAf7HpHj1kTxdT1hycfk5IvITs5BQpyZF40dOBLOzUWBEt5dFHiXxjqm/qxJB9+Vt/x5v8twhCheYOeJTDl/oFRyHRpHnzTkoc1jTjxNdV21UHQDWRQCgFOqOlRhlNVrANTCesvsKpvqRtdwsAiGZstvV/KP93xL/5r+CfK+F6NvnDS7t6eeXichCyVSSjcbqv9Q3LfQMBYDmQPlYkDWmtPrCnknfiuPU7DY8Ss09AKBEfImAe7k+qEWkWwliAgskU7Ys5x+zgtIv/IKmEQYtgpntLU12pTXXu4cB/I358Vk1Jbz1mONm68LhwFKHs6IQwOGsCG0icIMptQZZbWjYOWdkPwssy5WIlWRaE1Mkz9WdQjI1JbwVRtNl3Hw/k5NKNsQD7keS9a6zupUgBwHrOVUZ2dIeT6eAJ8185dRkk/fyHp9UkekiUkQCWTm0AndYMEbCz5MMFRLRAaDYH1lKmsUQwU9LypIfQDDSlFa1JZWR/8Vxbk5f5HWLBeMIrjVJMkBEbqVSnyYC7o2xend9vN7r2xd0nc2a3HsOVbuBBcBikSfae+GiInuAZKOp93u0EmTmQdeaXvetUl/4w3ZJmlpkBGpuIRG9VWZofS2IzaYWP92UVu/ayyIP4VtiRdPCaz5LnzSaED81P26tGomMUEr8ohiwQX2S8HgaEwHPXxMBz8J4wHNNssE7ur2kUe0FFoh3iqYdeWPJoWFwfSNEguYDn58KDB/bY8l52j5NBIZG1Xp2R74bVwgQ2GcAsHDWdlRVdBeJhw9IXsk7ZSKy+BbZudVr0k5fKOisjIxWWp+tybtgtIvE9/MFTgjOg6BaBHUkP0p4PLvjQfcriYDnRr2s3JUTQdoCS2uZ3eGnJ+aSxgvLQvdIizVroAjMMp9ng90fXdWR7w+sCO0BaDax9SzR29qeBZ6BIvzXAyKeUveuLBAZ2CNRtTL6t2J/5H6HP3LhhnDpAAV9HrWeDjBA8iOSqTakKRXIJRDMSaYsoVi9+5VU0D2u3QRZuRKWVmCBG4v7h17ssE70hzeCbAHkFfEG7/Bujx7DXROUqc8BPNm2jaADQvRJTeN7PUX0Q8BgRx1EPIaC5cdm/jF+QlP7WlGOdzurdm2qyBdd7ayMLnD4IpVOf+S79iZ7P5XVY0HeRGIViSaTLEopuSQLeTse9DzTdm3liASZ0Oj6eSuwiLm5hm6LwhPmQ1iR5czuT0DUzab82LuPzoacEsJpkQ0CvNSTRD+A9AFXhQh+ZYwLLzqymR+0tqIA9zQHysf2UeQwfm7m+mRRVfQDhz8y2+kPX+5QMlgEEwG8bToYCPAbpzXzdkvZ+MgSS1qB1djUZA/mnEj5Iu+QMHIXoZ9dvPJ5QAVukes8CMaZMbV+cOWX+3KWatA9S3TTEsHy0zTUk+a72ZZGqkqqt8ZUm1YUgWVFy4afPjtKEaYilLBXhJ9z+MLjs1lOILndfMfnJJQsOyJBDgJWYNDM9Y2dygPQunBYFrdkuq03SKkWkiNj16pTbdHF/uhbJD/qCaK3zmPdGBtpeUYEpcbBC8rX0kpi94U/FIF5YAJOTSI+r48C7beSqshLgPyA5DZjDuVn8UXui9XRgKWJLDLodL/9xnDpShJbTHbewLoxtq4esLm56F9MQL+gKjeFOg3QNkRP2jJV3R49rDt+J4JzDTnA+Q5/6D/b/n1VaeQxAG8ZAgBTkw2uX/dBv2M5s4ia3ib3vFoOBywRvV4EVnNfRF5OvxCR7wNGTqMhVxb7Qs905WDjAc9/iKBFJr4LIA9nXUmRCCaZUSnyWWbwqefm8dyqo44n6PkxiNdFoAiutZfw3MP1ksWWnOKRTPpjERlAci+UGu2sCG3qFgIvGTEK2eyXhk9ird0fuae3kYQ1UAmPe4uIDNHk19ZDgaxvNM4PMlosAOR9b7aQNwPoMoIYVYh0ZevpSCLnAzg/r2MQuP/BtvNXXTmOFtu7ZNiJyGCpcfgZU1mqq9Sk0GEbLYuv3hiOBb3TBVwhIv1BLuNK/Ojbtj6S83uthY7V41MRDBGBy3okYJFoEmB7XtkJDBDBiSIYEwu4xhf7o291xSCLbWk/IP1MT79ZgESexzFcBJauJnproSNtWSQK5ca95e7SytBHRx2/L/RMPOC+VEQmA7gg3ui5CwjX9sG/3c4vZWBHrNYjAQvkrY7KyMK8VpWCru8pqA8Mv65uadHLeQXvG+OtiY0bZ5pnXe20l+rTjtbWnqN8+z2AX3c10c17XSOCK4yckG86w5HH2iV3lJru0PoCEfGI4K5Y0PN6sS/8Xm8H77o5I+3ukmQFhEmnP9rQRQxxGXkevlH7gQUriZmm1/3Gkc0szfd9S3zR1Wjdz4BLE0tGjMo7oDZs+KWYC2gQ1OWbHABgEf34/t1iqssWDhMN3jMAYx2Jmnsckp0qte1b6BxYEdpDcKomtAisCly+qwcqb3l1fnVjbK7S1Cei5CmIzEkEy0/L9z2a693DSJxlFkI+VvuB5doPLODprmqX1tSPm2FMIZO9Kf/kb12/SdltmN8VYyjyRVdLFxN93ZyRdmr9jAiKAUBZeJ3ybYl0SGr6o29ZBI+YMzPCac39ALqCkD7Va9IKWGHMu5SRlpf1Ms/QfN5DidymxFz+ELykDgcsndLzu2qQxZHoKhJfAQAFUxvrhuZtX3Es6B4ngpYDDdq15yN3d9a1RHeXJe8Xke+YN1tur4j+IScyl5bWkPzQLFZMjtV7pvRmkvwtM/hB0lz5FoxKpfhe8yLPmLxE7IDnlzD32gDYGUvbFisASB0IrOdaziXtqioBgDmm9y0ustmuzV91TFoWBtu95yNXs/ujqzSxviuIHg+6L2brWBiyp205b/mViWtTaa2uIhAzQMV58YDnlN5KkHOr16STWl+xf9FWhivF9+MBz0Ns8A7INVonGjx3E/iD+TMJFHDGCdUb9yoAyLYBVkf2fOQMLltyMWEcMkdyup4z0t5p9ht6dIIZGtu956MTlQ4tLQuHeSR6Y+DkwSCWKIGQyFoEU6Q694OrAaBfVehzQN9qRpF+AFfwjfHW3kqSAVXRXfYi+49IrDLHZBPB7QmtQ/Gge05zoHwsa4691ym+2H1qLOD+N3dpch2Ie0Vg0cZPQ9xq90WeBQBJBMtPIy1fmMx5x+kP/7A7BhkPeB4QwR2GWhG/szIU7BRBAp75EJg/v8BfOHyRF7t6DHrpkJJk2h4WwQkgtxU12YermeuTOas2QBIBz4si+LnpsB50+sN35kURAhIPuF9WYh46Tt7n9EfuzmtRoZsXCglIot5VIUoeQOt5ba22U2uuFsiXovh3QNKaKFbgIApGgDJaBK6DLrgZwLVtfxpCgZZZYiYlgq6PHvuTdc5r7c/v5Dm4e5cMO5HANPPjenso8lJ3jEEZp6TXmSHl5GRJ+srORUHXdW3IscaRGVyTt4gH0KGtPrDlsDW5I1+/PdJjSTtAZ2U0uDeWGAnyJsLoaDZtkFJyiSjMAuQBAI8qQS1EbhDIZW3JQWIdNG/ZbUuefvDvplgp8hk1bwOYdfYLr+quwZVURrbE6l1Xk+IGANa7BgLRXTlJtox1iCbuIQGxyOr2lkLzIhe1ZU5CsrtNb5OzFGINVAJKaY3bDJ+hn5c8t7Goqq+3p+q9v8iQF5j/NCyvESSV3lkk6jZjQNJtay5DZuxogiF3Z+8Lus62abmYkLEQnAnQRUh/ZXQhJEHshkhUhF+AWCPCvzj80U/RZ33WZx23/wfKA96xyRgNTwAAAABJRU5ErkJggg==";
png.onload = drawScene;

function drawScene(){
	c.drawImage(png, (canvas.width / 2) - (png.width / 2), (canvas.height / 2) - (png.height / 2), png.width, png.height);
	let data = c.getImageData((canvas.width / 2) - (png.width / 2), (canvas.height / 2) - (png.height / 2), png.width, png.height)["data"];

	// console.log(data["data"]);
	for(let y = 0; y < png.height; y++){
		for(let x = 0; x < png.width; x++){
			let p = (x + y * png.width) * 4;
			if(data[p + 3] > 128){
				// console.log(data[p])
				let particle = {
					// r: data[p],
					// g: data[p + 1],
					// b: data[p + 2],
					// a: data[p + 3],
					x0: x,
					y0: y,
					x: png.width / 2,
					y: png.height / 2
				};
				TweenMax.to(particle, Math.random() * 4, {
					x: particle.x0,
					y: particle.y0,
					delay: y/30,
					ease: Elastic.easeOut
				})
				particles.push(particle);
			}
		}
	}
	render();
}

function render(){
	requestAnimationFrame(render);
	c.fillStyle = `rgba(50, 50, 50, .5)`;
	c.fillRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < particles.length; i++){
		c.fillStyle = `rgba(233, 149 , 29, 1)`;
		c.fillRect(particles[i].x + (canvas.width / 2) - (png.width / 2), particles[i].y + (canvas.height / 2) - (png.height / 2), 1, 1)
	}
}




