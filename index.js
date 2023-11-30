// Блок с изображениями.
const initialImage = [
    {
        name: 'Фото1',
        link: 'https://i.pinimg.com/originals/92/7c/e2/927ce23644005fa2eadc8e0c0b979c53.jpg'
    },
    {
        name: 'Фото2',
        link: 'https://loftecomarket.ru/wp-content/uploads/8/a/3/8a3b62176acb88086fcd6119896fe02d.jpeg'
    },
    {
        name: 'Фото3',
        link: 'https://rstart-shop.ru/wp-content/uploads/d/c/1/dc1cc183c642fc0fb16371f5b9f283f6.jpeg'
    },
    {
        name: 'Фото4',
        link: 'https://northcliffe.ru/wp-content/uploads/1/f/1/1f1ed1cf4823bfd97428de5393819bf7.jpeg'
    },
];
// Переменные.
const sliderImage = document.querySelector('.download-box__slider-image');
const sliderDot = document.querySelectorAll('.download-box__slider-dot');
const answer = document.querySelectorAll('.answer-box__answer');
const answerButton = document.querySelectorAll('.answer-box__button');
const video = document.querySelector('.video-review__video');
const videoPopup = document.querySelector('.popup-video');
const popupOverlay = document.querySelector('.opened');
let currentIndex = 0;
let intervalId;

// Кнопки разворачивания текста.
answerButton.forEach((button, index) => {
    button.addEventListener('click', () => {
        answer[index].classList.toggle('public');
        answer[index].classList.toggle('hide-after');
        button.classList.toggle('deactive');
    });
});

// Функции слайдера с таймером перелистывания, также можно удалить таймер.
function showSlide(index) {
    sliderImage.src = initialImage[index].link;
    sliderImage.alt = initialImage[index].name;

    sliderDot.forEach((item) => {
        item.classList.remove('active');
    });

    sliderDot[index].classList.add('active');
};

function startSlider() {
    showSlide(currentIndex);
    currentIndex = (currentIndex + 1) % initialImage.length;
};

function startInterval() {
    intervalId = setInterval(startSlider, 3000);
};

function stopInterval() {
    clearInterval(intervalId);
};

showSlide(0);

startInterval();

sliderImage.addEventListener('mouseover', stopInterval);

sliderImage.addEventListener('mouseout', startInterval);

sliderDot.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
        stopInterval();
    });
});


// Функции открытия попапа и его закрытия путем нажатия на оверлей или на кнопку 'Escape'
function openVideoPopup() {
    function closePopupVideo(event) {
        if (event.target.classList.contains('opened')) {
            videoPopup.classList.remove('opened');
            removePopupEventListeners();
        }
    }

    function closePopup(event) {
        if (event.key === 'Escape') {
            videoPopup.classList.remove('opened');
            removePopupEventListeners();
        }
    }

    function removePopupEventListeners() {
        document.removeEventListener('keydown', closePopup);
        videoPopup.removeEventListener('click', closePopupVideo);
    }

    videoPopup.classList.add('opened');
    document.addEventListener('keydown', closePopup);
    videoPopup.addEventListener('click', closePopupVideo);
}

video.addEventListener('click', openVideoPopup);