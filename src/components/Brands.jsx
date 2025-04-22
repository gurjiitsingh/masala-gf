'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




import Link from "next/link";
import Slider from "react-slick";


const brands = [
  {
    id: '8b1ad2d6-9626-45bb-bd41-94b9af2cea68',
    name: 'Gurjit Singh',
    price: '345',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'sdfsf',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730454565/nextjs-course-mutations/klbqwgbva7rcakibywku.jpg',
    isFeatured: false,
    weight: '10',
    dimensions: '1x8x9'
  },
  {
    id: '68484d16-afb2-4c2f-88f7-f56a0bdbac4f',
    name: 'IDEAPAD 678',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has',        
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730454417/nextjs-course-mutations/zfa3h8i63ilmknq1ro5t.jpg',
    isFeatured: true,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: 'c0f92606-c817-4317-8422-dcad17cc5257',
    name: 'SAMSUNG TV',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730389939/nextjs-course-mutations/x4winbwpi3hmrkgahjql.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: '6560482b-659b-4c23-bb42-1b22a1a0131a',
    name: 'IDEAPAD 111',
    price: '945',
    brand: 'Samsung',
    category: 'LCD TV',
    Desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730390000/nextjs-course-mutations/cyhb7a8c8eijvng85s3h.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: '13506810-ef32-4b3a-b7b4-3424ee0f44e9',
    name: 'DEL Computer Desktop',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using ',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730390015/nextjs-course-mutations/kvlrwnhmlhnpttqjdssd.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: '98e8878f-c221-44ac-9072-4c4ebbce63b6',
    name: 'IDEAPAD 678',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730390030/nextjs-course-mutations/hsydwrh6ios1vbtx4xqp.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  }
]

export default function Brands() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };





  if (brands.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5">
      <Slider {...settings}>
        {(brands?.length <= 2
          ? [...brands, ...brands, ...brands]
          : brands
        )?.map((brand, i) => {
          return (
            <div key={i} className="px-2">
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="h-20 rounded-lg md:p-5 p-2 border overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={brand?.image}
                    alt=""
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
