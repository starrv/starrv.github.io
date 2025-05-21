function init(){
	addEventListener("load",scaleIntro);
	addEventListener("resize",scaleIntro);
}

function scaleIntro(){
	const intro=document.querySelector(".intro");
	const introChildren=intro.querySelectorAll("*");
	for(const introChild of introChildren){
		if(getComputedStyle(introChild).getPropertyValue("display")==="none"){
			introChild.style.display="block";
		}
	}
	let currentHeight=0;
	for(const child of introChildren){
		const childHeight=parseInt(getComputedStyle(child).getPropertyValue("height"));
		currentHeight+=childHeight;
	}
	const currentWidth=parseInt(getComputedStyle(document.body).getPropertyValue("width"));;
	const bodyHeight=parseInt(getComputedStyle(document.body).getPropertyValue("height"));
	currentHeight=Math.max(bodyHeight,currentHeight);
	intro.style.width=currentWidth+"px";
	intro.style.height=currentHeight+"px";
}

init();