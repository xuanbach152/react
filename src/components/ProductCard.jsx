function ProductCard({ img, name, price }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
      <img src={img} alt={name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold">{price}</span>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;