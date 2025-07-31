function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-32">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-2">SummerTea</h3>
        <p className="mb-1">Địa chỉ: Trung tâm thương mại Ân Thi, Hưng Yên, Việt Nam</p>
        <p className="mb-1">
          Facebook:{" "}
          <a
            href="https://www.facebook.com/ha.nguyen.180779"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            Ha Nguyen
          </a>
        </p>
        <p>SĐT: <a href="tel:0865409578" className="hover:underline">0865409578</a></p>
        <div className="mt-4 text-sm opacity-70">&copy; {new Date().getFullYear()} SummerTea. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;