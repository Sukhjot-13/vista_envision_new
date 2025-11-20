import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#474846] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-white mb-3">Vista Envision</h3>
            <p className="text-white/70 mb-4 max-w-md">
              Transforming visions into stunning 3D visualizations. We
              specialize in architecture, product visualization, and animation
              for forward-thinking brands and designers.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#F4D854] rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-white group-hover:text-[#474846]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#F4D854] rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-white group-hover:text-[#474846]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#F4D854] rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-white group-hover:text-[#474846]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#F4D854] rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-white group-hover:text-[#474846]" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  Architecture Visualization
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  Product Visualization
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  3D Animation
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#F4D854] transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} Vista Envision. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-white/60 hover:text-[#F4D854] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#F4D854] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
