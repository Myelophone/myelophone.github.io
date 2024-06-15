function updateLogo() {
	const logo = document.querySelector('img.VPImage.logo');
	const currentPath = window.location.pathname;
	if (currentPath.startsWith('/ru/')) {
		if (document.documentElement.classList.contains('dark')) {
			logo.src = '/logo.png';
		} else {
			logo.src = '/logocolor.png';
		}
	} else {
		if (document.documentElement.classList.contains('dark')) {
			logo.src = '/myelophone_eng_white.png';
		} else {
			logo.src = '/myelophone_eng.png';
		}
	}
}

if (document.querySelector('img.VPImage.logo')) {
	updateLogo();
}

const observer = new MutationObserver(() => {
	updateLogo();
});

observer.observe(document.documentElement, {
	attributes: true,
	attributeFilter: ['class'],
	childList: true,
	subtree: true,
});
