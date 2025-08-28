function init(){
	let sectionShowing;
	const homeSectionId="home";
	const projectSectionId="my-projects";

	function initDropdownItems(){
		const nav=document.getElementsByTagName("nav")[0];
		const dropdownItems=nav.getElementsByClassName("dropdown-item");
		for(let i=0; i<dropdownItems.length; i++){
			dropdownItems[i].addEventListener("click",showSection);
		}
	}

	function initNavbarBrand(){
		const nav=document.getElementsByTagName("nav")[0];
		const navbarBrand=nav.getElementsByClassName('navbar-brand')[0];
		navbarBrand.addEventListener("click",showSection);
	}
	
	function initNavLinks(){
		const nav=document.getElementsByTagName("nav")[0];
		const navLinks=nav.getElementsByClassName("nav-link");
		for(let i=0; i<navLinks.length; i++){
			if(navLinks[i].classList.contains("dropdown-toggle")) continue;
			navLinks[i].addEventListener("click",showSection);
		}
	}

	function showSection(e){
		sectionShowing.style.display="none";
		let targetSection;
		if(e.target.classList.contains("dropdown-item")){
			targetSection=document.getElementById(projectSectionId);
		}
		else{
			const idArr=e.target.id.split("-");
			const targetSectionId=idArr.slice(0,-1).join("-");
			console.log(targetSectionId);
			
			targetSection=document.getElementById(targetSectionId);
		}
		console.log(targetSection);
		targetSection.style.display="block";
		sectionShowing=targetSection;
	}

	function showInitialSection(){
		const sectionId=window.location.href.split("#")[1];
		if(sectionId){
			const projectIds=new Set(["split-cost","passions-quiz","animals-and-nature","lets-chat","find-princess-angela","lets-paint","maya-mathematics","maya-decimal-conversion-tool","create-profile"]);
			if(projectIds.has(sectionId)){
				sectionShowing=document.getElementById(projectSectionId);
			}
			else{
				sectionShowing=document.getElementById(sectionId);
			}
		}
		else{
			sectionShowing=document.getElementById(homeSectionId);
		}
		console.log(sectionShowing);
		sectionShowing.style.display="block";
	}

	showInitialSection();
	initNavbarBrand();
	initNavLinks();
	initDropdownItems();
}

init();