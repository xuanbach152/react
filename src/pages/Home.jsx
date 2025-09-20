import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaFacebook,
  FaStar,
  FaArrowRight,
  FaLeaf,
  FaCoffee,
  FaHeart,
} from "react-icons/fa";

function Home() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=800&fit=crop&crop=center", // Cozy cafe interior
      title: "SummerTea",
      subtitle:
        "Không gian thư giãn, nơi gặp gỡ hoàn hảo cho bạn bè và gia đình",
      cta: "Khám phá ngay",
      gradient: "from-black/60 to-gray-900/50",
      titleColor: "text-white",
      subtitleColor: "text-gray-100",
    },
    {
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&h=800&fit=crop&crop=center", // Korean spicy instant noodles - đúng mì cay
      title: "Mỳ cay Hàn Quốc",
      subtitle:
        "Hương vị đậm đà, cay nồng, hấp dẫn từ những nguyên liệu tươi ngon",
      cta: "Xem menu",
      gradient: "from-black/60 to-gray-900/50",
      titleColor: "text-white",
      subtitleColor: "text-red-100",
    },
    {
      image:
        "https://lynhuasaigon.com/wp-content/uploads/2022/04/tra-sua-ngon.jpg",
      title: "Trà sữa, sinh tố, sữa chua lắc",
      subtitle:
        "Hơn 50 loại thức uống từ những nguyên liệu tự nhiên, tươi ngon nhất",
      cta: "Thử ngay",
      gradient: "from-black/60 to-gray-900/50",
      titleColor: "text-white",
      subtitleColor: "text-amber-100",
    },
    {
      image:
        "https://simexcodl.com.vn/wp-content/uploads/2024/02/ca-phe-nau-soi-1.jpg",
      title: "Cà phê phin",
      subtitle: "Từ những hạt cà phê rang xay nguyên chất",
      cta: "Thử ngay",
      gradient: "from-black/60 to-gray-900/50",
      titleColor: "text-white",
      subtitleColor: "text-gray-200",
    },
  ];

  const features = [
    {
      icon: <FaLeaf className="text-3xl text-emerald-500" />,
      title: "Nguyên liệu tự nhiên",
      description: "100% nguyên liệu tươi ngon, không chất bảo quản",
    },
    {
      icon: <FaCoffee className="text-3xl text-amber-500" />,
      title: "Pha chế thủ công",
      description: "Từng ly được pha chế tỉ mỉ bởi barista chuyên nghiệp",
    },
    {
      icon: <FaHeart className="text-3xl text-red-500" />,
      title: "Phục vụ tận tâm",
      description: "Đội ngũ nhân viên nhiệt tình, chu đáo",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          loop={true}
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[10s]"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Dark overlay for better text readability */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                />

                {/* Content - Different positioning for first slide vs others */}
                <div
                  className={`relative z-10 h-full flex ${
                    index === 0
                      ? "items-center justify-center" // First slide: center
                      : "items-end justify-start pb-24 md:pb-32 lg:pb-40" // Other slides: bottom positioning với padding bottom lớn
                  }`}
                >
                  <div
                    className={`px-4 ${
                      index === 0
                        ? "text-center max-w-5xl mx-auto" // First slide: center alignment
                        : "text-left max-w-2xl ml-12 md:ml-20 lg:ml-32 xl:ml-40" // Other slides: left alignment với margin lớn hơn
                    }`}
                  >
                    <h1
                      className={`${
                        index === 0
                          ? "text-4xl md:text-6xl lg:text-7xl" // First slide: larger
                          : "text-3xl md:text-5xl lg:text-6xl" // Other slides: slightly smaller
                      } font-bold mb-6 ${
                        slide.titleColor
                      } animate-fade-in-up leading-tight`}
                      style={{
                        textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
                      }}
                    >
                      {slide.title}
                    </h1>
                    <p
                      className={`${
                        index === 0
                          ? "text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto" // First slide: centered with max-width
                          : "text-base md:text-lg lg:text-xl max-w-lg" // Other slides: smaller, left-aligned
                      } mb-8 ${
                        slide.subtitleColor
                      } animate-fade-in-up animation-delay-200 leading-relaxed`}
                      style={{
                        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                      }}
                    >
                      {slide.subtitle}
                    </p>
                    <Link
                      to="/menu"
                      className={`${
                        index === 0
                          ? "inline-block" // First slide: normal display
                          : "inline-flex items-center gap-2" // Other slides: flex with arrow
                      } bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 font-bold py-4 px-10 rounded-full text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400 border-2 border-white/30`}
                    >
                      {slide.cta}
                      {index !== 0 && <FaArrowRight className="text-sm" />}
                    </Link>
                  </div>
                </div>

                {/* Enhanced Decorative Elements */}
                <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-1000 hidden md:block"></div>
                <div className="absolute bottom-32 right-32 w-20 h-20 bg-white/15 rounded-full animate-float animation-delay-1500 hidden md:block"></div>
                <div className="absolute top-1/4 right-16 w-12 h-12 bg-white/10 rounded-full animate-pulse animation-delay-2000 hidden lg:block"></div>
                <div className="absolute bottom-1/4 left-16 w-14 h-14 bg-white/10 rounded-full animate-bounce animation-delay-2500 hidden lg:block"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Enhanced Custom Navigation */}
        <div className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white/60 transition-all duration-300 cursor-pointer group shadow-lg">
          <svg
            className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white/60 transition-all duration-300 cursor-pointer group shadow-lg">
          <svg
            className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Enhanced Custom Pagination */}
        <div className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3"></div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white/90 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tại sao chọn SummerTea?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến cho bạn những trải nghiệm tuyệt vời
              nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Sẵn sàng thưởng thức?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Đặt hàng ngay để không bỏ lỡ những hương vị tuyệt vời
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0865409578"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FaPhone />
                0865409578
              </a>
              <a
                href="https://www.facebook.com/ha.nguyen.180779"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FaFacebook />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
