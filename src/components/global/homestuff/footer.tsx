// import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//         <div>
//           <h3 className="text-2xl font-bold mb-4">Chatal</h3>
//           <p className="text-gray-400">Revolutionizing Instagram DM automation for businesses and influencers.</p>
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//           <ul className="space-y-2">
//             <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Legal</h4>
//           <ul className="space-y-2">
//             <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
//           <div className="flex space-x-4">
//             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
//             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-6 w-6" /></a>
//             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
//             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-6 w-6" /></a>
//           </div>
//         </div>
//       </div>
//       <div className="mt-12 text-center text-gray-400">
//         <p>&copy; 2023 Chatal. All rights reserved.</p>
//       </div>
//     </footer>
//   )
// }

import { Facebook, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import ChatalLogo from '@/svgs/chatal-logo';
import {LogoSmall} from '@/svgs/logo-small'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
             <div className="flex items-center gap-2">
               <ChatalLogo width={70} height={70} color="#0066cc"/>
             </div>
          <p className="text-gray-400">Revolutionizing Instagram DM automation for businesses and influencers.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-400">
        <p>&copy; 2025 Chatal. All rights reserved.</p>
      </div>
    </footer>
  );
}
