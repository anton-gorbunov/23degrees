function map(containerSelector, mapSrc){
    const mapContainer = document.querySelector(containerSelector);
    let ok = false;
    window.addEventListener('scroll', () => {
        if (ok === false) {
            ok = true;
            setTimeout(() => {
                let script = document.createElement('script');
                script.src = mapSrc;
                mapContainer.append(script);
            }, 1000);
        }
    });
}

export default map;