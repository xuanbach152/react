import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
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
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

function Home() {
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
    <div className="pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="/img/home.jpg"
                alt="Trà sữa tươi ngon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="/img/home2.jpg"
                alt="Không gian quán"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="/img/home3.jpg"
                alt="Menu đa dạng"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-start z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Summer
                </span>
                <span className="text-white">Tea</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Thưởng thức hương vị tuyệt vời từ những ly trà sữa được pha chế
                tỉ mỉ
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 hover:scale-105"
                >
                  Xem Menu
                  <FaArrowRight className="text-sm" />
                </Link>
                <a
                  href="tel:0865409578"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-white/30"
                >
                  <FaPhone className="text-sm" />
                  Đặt hàng ngay
                </a>
              </div>
            </div>
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
