var swiperParams = {
    direction: 'horizontal',
    loop: true,
    onProgress: function(swiper, transition){

        if(transition<0.25){
            var percent = 1-(transition-0.17)/0.08;
            $('.top-container .like').stop();
            $('.top-container .like').animate({
                opacity: percent
            }, 10);
        } else {
            var percent = (transition-0.25)/0.10;
            $('.top-container .dislike').stop();
            $('.top-container .dislike').animate({
                opacity: percent
            }, 10);
        }

        var scroll = $('.top-container .content-slide').scrollTop();

        $('.cover').css('top', scroll );
        $('.cover').css('bottom', -scroll );
    }.bind(this),
    onTransitionStart: function(){
        $('.cover').stop();
        $('.cover').animate({
            opacity: 0
        });
    },
    onSlideNextEnd: function(swiper){
        getNextArticle();
        console.log('dislike');
    }.bind(this),
    onSlidePrevEnd: function(swiper){
        getNextArticle();
        console.log('like');
    }.bind(this)
};


$('.content-slide').on('change', function(e){
    e.stopPropagation();
    e.preventDefault();
});

var swiper1 = new Swiper ('.first-container',  $.extend({}, swiperParams) );
var swiper2 = new Swiper ('.second-container', $.extend({}, swiperParams) );


var currentArticle = {};
var nextArticle = {};

var topContainer = $('.first-container');
var bottomContainer = $('.second-container');

//
// Mr.Backender, please, fix code here ↓↓↓
//
function getNextArticle(){

    var jsonURL = 'news.json';

    $.getJSON(jsonURL, function(data){
        currentArticle = nextArticle;
        nextArticle = data[ ~~(data.length*Math.random()) ];

        var tempContainer = topContainer;
        topContainer = bottomContainer;
        bottomContainer = tempContainer;

        var swiperTemp = swiper2;
        swiper2 = swiper1;
        swiper1 = swiperTemp;


        if (nextArticle.body == '') nextArticle.body = 'no content';
        bottomContainer.find('.article-header').html(nextArticle.title);
        bottomContainer.find('.article-content').html(nextArticle.body);

        swiper1.slideTo(1, 0, false);
        swiper2.slideTo(1, 0, false);

        topContainer.removeClass('bottom-container');
        topContainer.addClass('top-container');

        bottomContainer.removeClass('top-container');
        bottomContainer.addClass('bottom-container');

        $('.cover').animate({
            opacity: 0
        });

        $('.cover').css('top', 0 );
        $('.cover').css('bottom', 0 );
        $('.content-slide').scrollTop(0);

    }.bind(this));
};

getNextArticle();



$('.like-btn').click(function(){
    swiper1.slidePrev();
}.bind(this));

$('.dislike-btn').click(function(){
    swiper1.slideNext();
}.bind(this));
