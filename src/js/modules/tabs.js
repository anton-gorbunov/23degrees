function tabs(tabsHeaderSelector, linksSelector,tabsContentSelector,
              linkActiveClass, contentActiveClass, fadeClass ){
    const tabsHeader = document.querySelector(tabsHeaderSelector),
          tabsLinks = document.querySelectorAll(linksSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);

    function hideAll() {
    tabsLinks.forEach(item => {
        item.classList.remove(linkActiveClass);
    });
    tabsContent.forEach(item => {
        item.classList.remove(contentActiveClass, fadeClass);
    });
    }
    function showActiveTab(i=0){
    tabsLinks[i].classList.add(linkActiveClass);
    tabsContent[i].classList.add(contentActiveClass, fadeClass);
    }
    hideAll();
    showActiveTab();

    tabsHeader.addEventListener('click',(event) => {
    event.preventDefault();
    let target = event.target;
        if (target == target && target.classList.contains(linksSelector.slice(1))){
            tabsLinks.forEach((item,i) => {
                    if (target == item){
                        hideAll();
                        showActiveTab(i);
                    }
                });
        }
    });
}

export default tabs;