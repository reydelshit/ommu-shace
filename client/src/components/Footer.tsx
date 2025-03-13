const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-4 bg-transparent border-t-2 border-black text-white absolute bottom-0   w-full">
      <div className="flex gap-2">
        <h1 className="font-semibold text-black">ommu</h1>
        <ul className="flex gap-4 ">
          <li className="text-black">What's new</li>
          <li className="text-black">Explore</li>
          <li className="text-black">Rewards</li>
          <li className="text-black">Help</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <a className="text-black" href="#">
          Google
        </a>
        <a className="text-black" href="#">
          Instagram
        </a>
        <a className="text-black" href="#">
          Twitter
        </a>
        <a className="text-black" href="#">
          Facebook
        </a>
        <a className="text-black" href="#">
          Tiktok
        </a>
      </div>
    </footer>
  );
};

export default Footer;
