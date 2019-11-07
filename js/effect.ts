import '../css/style.scss';
function format(node:HTMLElement, text: string, limit: number): void{

	let isShown:boolean = false;
	const fullText = text;
	const limitedText = limit < text.length ? `${text.slice(0,limit)}...` : fullText;

	node.innerHTML = `<div id='format_content'></div><a href='#' id='format_link'></a>`;

	const content = <HTMLElement>document.querySelector('#format_content');
	const link = <HTMLElement>document.querySelector('#format_link');

	content.innerText = limitedText;
	link.innerText = limit < text.length ? 'show' : '';

	const displayHandler = ():void => {
		content.innerText = isShown ? limitedText : fullText;
		link.innerText = isShown ? 'show' : 'hide';
		isShown = !isShown;
	}

	link.addEventListener('click',displayHandler,false)

}

format(document.querySelector('#content'),'asdjkdfjkhdfdczxczxczxczxczxczxcxzcxczczas结束',16);