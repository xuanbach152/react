import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProductForm from "../components/ProductForm.jsx";
import LoginForm from "./Login.jsx";

function Home() {
  return (
    <div className="pt-20 pb-10 text-center">
      <div className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <img
              src="/img/home.jpg"
              alt="Trà sữa 1"
              className="w-full h-[600px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/img/home2.jpg"
              alt="Trà sữa 2"
              className="w-full h-[600px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/img/home3.jpg"
              alt="Trà sữa 3"
              className="w-full h-[600px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex justify-center gap-6">
        <a
          href="tel:0865409578"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Đặt hàng ngay
        </a>
        <a
          href="https://www.facebook.com/ha.nguyen.180779"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Facebook Ha Nguyen
        </a>
      </div>
    </div>
  );
}

export default Home;
