export const cardImageStyleGameCard = {
    "background": "#000000",
    "position": "relative",
    "minHeight": "180px",
};

export const imageStyleGameCard = {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "right": 0,
    "left": 0,
    "margin": "auto",
    "height": "100%",
};

export const cardImageStyleItemList = {
    "background": "#000000",
    "position": "relative",
    "minHeight": "200px",
    "minWidth": "200px",
};

export const imageStyleItemList = {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "right": 0,
    "left": 0,
    "margin": "auto",
    "height": "100%",
};

export const itemsPerPageItems = [{
    name: "Games per page: 4",
    number: 4
},{
    name: "Games per page: 8",
    number: 8
},{
    name: "Games per page: 12",
    number: 12
},{
    name: "Games per page: 16",
    number: 16
},{
    name: "Games per page: 20",
    number : 20
}];

export const ruleSortByItems = [{
    name: 'Nome (A-Z)',
    param: 'name',
},{
    name: 'Nome (Z-A)',
    param: '-name',
},{
    name: 'Mais recente',
    param: '-information__launch_year',
},{
    name: 'Mais antigo',
    param: 'information__launch_year',
}];

export const slideHeightCardsSlide = {
  "height": "280px",
  "position":"relative",
  "minHeight":"180px",
};

export const settingsCardsSlide = {
  dots: true,
  centerMode: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
  {
    breakpoint: 980,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      slidesToShow: 2
    }
  },
  {
    breakpoint: 480,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      slidesToShow: 1
    }
  }
]
};

export const imageStyleIndexSlide = {
    "height": "100%",
    "width":"70%",
    "float":"left"
};

export const carouselImageStyleIndexSlide = {
    "background": "#000000",
    "minHeight": "400px",
    "position": "relative",
    "margin":20,
};
export const cardStyleIndexSlide = {
    "float":"right",
    "height":400,
    "width":"30%"
};
export const sliderStyleIndexSlide = {
    "position":"relative",
    "height":400,
    "width":1110
};
export const textStyleIndexSlide = {
    "textAlign":"justify",
    "top":"42%",
    "position":"absolute",
    "fontSize":"200%"
};

export var settingsIndexSlide = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoPlaySpeed: 4200,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide:1
};
