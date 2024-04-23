
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {/* Phần liên hệ */}
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="text-sm">
              <li>Email: tranquan.ttdt.usec@gmail.com</li>
              <li>Phone: 091-474-4927</li>
              <li>
                Address: 54 Luong The Vinh, Duc Trong District, Lam Dong
                Province
              </li>
            </ul>
          </div>

          {/* Phần theo dõi */}
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center">
              <a
                href="https://www.facebook.com/tranquan.ttdt.usec/"
                className="mx-2"
              >
                <FacebookIcon/>
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/tran-quan-88bba8213/"
                className="mx-2"
              >
                <LinkedInIcon/>
                Linkedin
              </a>
              <a href="https://github.com/Danny2725" className="mx-2">
                <GitHubIcon/>
                Github
              </a>
            </div>
          </div>
          {/* Phần bản đồ và vị trí */}
          <div className="text-center mx-auto">
            <h2 className="text-lg font-semibold mb-4">Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.315770314784!2d108.36920861093998!3d11.742790288422784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171412efb75fbf5%3A0x3d9a8422718c7149!2zNTQgxJAuIEzGsMahbmcgVGjhur8gVmluaCwgTGnDqm4gTmdoxKlhLCDEkOG7qWMgVHLhu41uZywgTMOibSDEkOG7k25nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1713878580224!5m2!1svi!2s"
              width="200"
              height="100"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="text-center mt-8">
          <p className="text-xs">&copy; 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
