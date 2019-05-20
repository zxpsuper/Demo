import ScrapAward from './scrapAward-dev.js';
let scraAward = new ScrapAward({
    height: 570,
    coverImage: {
        url:
            'https://user-gold-cdn.xitu.io/2019/5/9/16a9b8578302943c?w=1080&h=1440&f=jpeg&s=92936',
        // width: 320,
        // height: 426,
        width: 428,
        height: 570,
    },
});
document.getElementById('try_again').addEventListener('click', function(e) {
    scraAward.init({});
    return;
    var imgs = [
        'https://zxpsuper.github.io/Demo/guajiang/p_1.jpg',
        'https://zxpsuper.github.io/Demo/guajiang/p_0.jpg',
    ];
    var num = Math.floor(Math.random() * 2);
    scraAward.init({
        backgroundImageUrl: imgs[num],
    });
});
