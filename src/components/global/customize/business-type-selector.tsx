// "use client"

// import type React from "react"

// import { useState } from "react"
// import {
//   ShoppingBag,
//   Utensils,
//   Plane,
//   Building2,
//   Stethoscope,
//   GraduationCap,
//   Briefcase,
//   Scissors,
//   Dumbbell,
//   Bus,
//   Film,
//   Factory,
//   Laptop,
//   Clock,
//   Phone,
// } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { motion } from "framer-motion"

// interface BusinessType {
//   id: string
//   name: string
//   icon: React.ReactNode
//   description: string
//   gradient: string
//   followUpComponent: React.ReactNode
// }

// // E-commerce specific follow-up component
// function EcommerceFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">E-commerce Details</h3>
//         <p className="text-gray-400">Tell us more about your e-commerce business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">E-commerce Platform</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select platform" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="shopify">Shopify</SelectItem>
//               <SelectItem value="woocommerce">WooCommerce</SelectItem>
//               <SelectItem value="etsy">Etsy</SelectItem>
//               <SelectItem value="amazon">Amazon</SelectItem>
//               <SelectItem value="ebay">eBay</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="product-categories" className="text-gray-300">
//               Product Categories
//             </Label>
//             <Textarea
//               id="product-categories"
//               placeholder="List your main product categories"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="target-audience" className="text-gray-300">
//               Target Audience
//             </Label>
//             <Textarea
//               id="target-audience"
//               placeholder="Describe your target customer demographics"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Order Processing</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="order-tracking"
//                 className="rounded border-gray-700 bg-gray-900 text-blue-600"
//               />
//               <Label htmlFor="order-tracking" className="text-gray-300">
//                 Order Tracking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="returns" className="rounded border-gray-700 bg-gray-900 text-blue-600" />
//               <Label htmlFor="returns" className="text-gray-300">
//                 Returns & Exchanges
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="shipping-options"
//                 className="rounded border-gray-700 bg-gray-900 text-blue-600"
//               />
//               <Label htmlFor="shipping-options" className="text-gray-300">
//                 Shipping Options
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="international-shipping"
//                 className="rounded border-gray-700 bg-gray-900 text-blue-600"
//               />
//               <Label htmlFor="international-shipping" className="text-gray-300">
//                 International Shipping
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="customer-support"
//                 className="rounded border-gray-700 bg-gray-900 text-blue-600"
//               />
//               <Label htmlFor="customer-support" className="text-gray-300">
//                 Customer Support
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="loyalty-program"
//                 className="rounded border-gray-700 bg-gray-900 text-blue-600"
//               />
//               <Label htmlFor="loyalty-program" className="text-gray-300">
//                 Loyalty Program
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="ecommerce-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="ecommerce-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Restaurant specific follow-up component
// function RestaurantFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Restaurant Details</h3>
//         <p className="text-gray-400">Tell us more about your restaurant business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Cuisine Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select cuisine" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="italian">Italian</SelectItem>
//               <SelectItem value="mexican">Mexican</SelectItem>
//               <SelectItem value="chinese">Chinese</SelectItem>
//               <SelectItem value="indian">Indian</SelectItem>
//               <SelectItem value="american">American</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="menu-highlights" className="text-gray-300">
//               Menu Highlights
//             </Label>
//             <Textarea
//               id="menu-highlights"
//               placeholder="List your signature dishes and specialties"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="restaurant-ambiance" className="text-gray-300">
//               Restaurant Ambiance
//             </Label>
//             <Textarea
//               id="restaurant-ambiance"
//               placeholder="Describe the restaurant's atmosphere and decor"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Services Offered</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="dine-in" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
//               <Label htmlFor="dine-in" className="text-gray-300">
//                 Dine-In
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="takeout" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
//               <Label htmlFor="takeout" className="text-gray-300">
//                 Takeout
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="delivery" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
//               <Label htmlFor="delivery" className="text-gray-300">
//                 Delivery
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="catering" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
//               <Label htmlFor="catering" className="text-gray-300">
//                 Catering
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="reservations"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-600"
//               />
//               <Label htmlFor="reservations" className="text-gray-300">
//                 Reservations
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="online-ordering"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-600"
//               />
//               <Label htmlFor="online-ordering" className="text-gray-300">
//                 Online Ordering
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="restaurant-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-yellow-400" />
//               Operating Hours
//             </Label>
//             <Textarea
//               id="restaurant-hours"
//               placeholder="Regular business hours and special timings"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="restaurant-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="restaurant-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Travel specific follow-up component
// function TravelFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Travel & Hospitality Details</h3>
//         <p className="text-gray-400">Tell us more about your travel business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Travel Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select travel type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="hotel">Hotel</SelectItem>
//               <SelectItem value="airline">Airline</SelectItem>
//               <SelectItem value="agency">Travel Agency</SelectItem>
//               <SelectItem value="tour">Tour Operator</SelectItem>
//               <SelectItem value="rental">Car Rental</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="destination-focus" className="text-gray-300">
//               Destination Focus
//             </Label>
//             <Textarea
//               id="destination-focus"
//               placeholder="List your main travel destinations"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="travel-style" className="text-gray-300">
//               Travel Style
//             </Label>
//             <Textarea
//               id="travel-style"
//               placeholder="Describe your travel style (e.g., luxury, budget, adventure)"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Services Offered</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="flight-booking" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
//               <Label htmlFor="flight-booking" className="text-gray-300">
//                 Flight Booking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="hotel-booking" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
//               <Label htmlFor="hotel-booking" className="text-gray-300">
//                 Hotel Booking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="tour-packages" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
//               <Label htmlFor="tour-packages" className="text-gray-300">
//                 Tour Packages
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="car-rental" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
//               <Label htmlFor="car-rental" className="text-gray-300">
//                 Car Rental
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="travel-insurance"
//                 className="rounded border-gray-700 bg-gray-900 text-sky-600"
//               />
//               <Label htmlFor="travel-insurance" className="text-gray-300">
//                 Travel Insurance
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="visa-assistance"
//                 className="rounded border-gray-700 bg-gray-900 text-sky-600"
//               />
//               <Label htmlFor="visa-assistance" className="text-gray-300">
//                 Visa Assistance
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="booking-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-sky-400" />
//               Booking Hours
//             </Label>
//             <Textarea
//               id="booking-hours"
//               placeholder="Availability for booking and support"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="customer-support" className="text-gray-300">
//               Customer Support
//             </Label>
//             <Textarea
//               id="customer-support"
//               placeholder="Contact information for customer support"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="travel-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="travel-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Real Estate specific follow-up component
// function RealEstateFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Real Estate Details</h3>
//         <p className="text-gray-400">Tell us more about your real estate business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Property Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select property type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="residential">Residential</SelectItem>
//               <SelectItem value="commercial">Commercial</SelectItem>
//               <SelectItem value="land">Land</SelectItem>
//               <SelectItem value="rental">Rental</SelectItem>
//               <SelectItem value="investment">Investment</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="property-location" className="text-gray-300">
//               Property Location
//             </Label>
//             <Textarea
//               id="property-location"
//               placeholder="List your main areas of operation"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="property-specialty" className="text-gray-300">
//               Property Specialty
//             </Label>
//             <Textarea
//               id="property-specialty"
//               placeholder="Describe your property specialty (e.g., luxury homes, condos)"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Services Offered</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="property-sales"
//                 className="rounded border-gray-700 bg-gray-900 text-emerald-600"
//               />
//               <Label htmlFor="property-sales" className="text-gray-300">
//                 Property Sales
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="property-rentals"
//                 className="rounded border-gray-700 bg-gray-900 text-emerald-600"
//               />
//               <Label htmlFor="property-rentals" className="text-gray-300">
//                 Property Rentals
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="property-management"
//                 className="rounded border-gray-700 bg-gray-900 text-emerald-600"
//               />
//               <Label htmlFor="property-management" className="text-gray-300">
//                 Property Management
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="property-valuation"
//                 className="rounded border-gray-700 bg-gray-900 text-emerald-600"
//               />
//               <Label htmlFor="property-valuation" className="text-gray-300">
//                 Property Valuation
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="investment-advice"
//                 className="rounded border-gray-700 bg-gray-900 text-emerald-600"
//               />
//               <Label htmlFor="investment-advice" className="text-gray-300">
//                 Investment Advice
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="relocation-services"
//                 className="rounded border-gray-700 bg-gray-900 text-emerald-600"
//               />
//               <Label htmlFor="relocation-services" className="text-gray-300">
//                 Relocation Services
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="property-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-emerald-400" />
//               Office Hours
//             </Label>
//             <Textarea
//               id="property-hours"
//               placeholder="Regular business hours and availability"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="realestate-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="realestate-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Healthcare specific follow-up component
// function HealthcareFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Healthcare Details</h3>
//         <p className="text-gray-400">Tell us more about your healthcare business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Healthcare Specialty</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select specialty" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="general">General Practice</SelectItem>
//               <SelectItem value="pediatrics">Pediatrics</SelectItem>
//               <SelectItem value="cardiology">Cardiology</SelectItem>
//               <SelectItem value="dermatology">Dermatology</SelectItem>
//               <SelectItem value="dentistry">Dentistry</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="services-offered" className="text-gray-300">
//               Services Offered
//             </Label>
//             <Textarea
//               id="services-offered"
//               placeholder="List your main medical services"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="insurance-accepted" className="text-gray-300">
//               Insurance Accepted
//             </Label>
//             <Textarea
//               id="insurance-accepted"
//               placeholder="List accepted insurance providers"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Appointment Options</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="online-booking"
//                 className="rounded border-gray-700 bg-gray-900 text-cyan-600"
//               />
//               <Label htmlFor="online-booking" className="text-gray-300">
//                 Online Booking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="phone-booking" className="rounded border-gray-700 bg-gray-900 text-cyan-600" />
//               <Label htmlFor="phone-booking" className="text-gray-300">
//                 Phone Booking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="walk-ins" className="rounded border-gray-700 bg-gray-900 text-cyan-600" />
//               <Label htmlFor="walk-ins" className="text-gray-300">
//                 Walk-ins
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="virtual-consultations"
//                 className="rounded border-gray-700 bg-gray-900 text-cyan-600"
//               />
//               <Label htmlFor="virtual-consultations" className="text-gray-300">
//                 Virtual Consultations
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="emergency-services"
//                 className="rounded border-gray-700 bg-gray-900 text-cyan-600"
//               />
//               <Label htmlFor="emergency-services" className="text-gray-300">
//                 Emergency Services
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="home-visits" className="rounded border-gray-700 bg-gray-900 text-cyan-600" />
//               <Label htmlFor="home-visits" className="text-gray-300">
//                 Home Visits
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="appointment-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-cyan-400" />
//               Appointment Hours
//             </Label>
//             <Textarea
//               id="appointment-hours"
//               placeholder="Regular appointment hours and availability"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="healthcare-faq" className="text-gray-300">
//             Common Patient Questions
//           </Label>
//           <Textarea
//             id="healthcare-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Education specific follow-up component
// function EducationFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Education Details</h3>
//         <p className="text-gray-400">Tell us more about your education business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Education Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select education type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="school">School</SelectItem>
//               <SelectItem value="university">University</SelectItem>
//               <SelectItem value="online">Online Course</SelectItem>
//               <SelectItem value="tutoring">Tutoring</SelectItem>
//               <SelectItem value="training">Training Center</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="subjects-taught" className="text-gray-300">
//               Subjects Taught
//             </Label>
//             <Textarea
//               id="subjects-taught"
//               placeholder="List your main subjects and courses"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="target-students" className="text-gray-300">
//               Target Students
//             </Label>
//             <Textarea
//               id="target-students"
//               placeholder="Describe your target student demographics"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Learning Options</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="in-person-classes"
//                 className="rounded border-gray-700 bg-gray-900 text-violet-600"
//               />
//               <Label htmlFor="in-person-classes" className="text-gray-300">
//                 In-Person Classes
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="online-courses"
//                 className="rounded border-gray-700 bg-gray-900 text-violet-600"
//               />
//               <Label htmlFor="online-courses" className="text-gray-300">
//                 Online Courses
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="group-sessions"
//                 className="rounded border-gray-700 bg-gray-900 text-violet-600"
//               />
//               <Label htmlFor="group-sessions" className="text-gray-300">
//                 Group Sessions
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="private-tutoring"
//                 className="rounded border-gray-700 bg-gray-900 text-violet-600"
//               />
//               <Label htmlFor="private-tutoring" className="text-gray-300">
//                 Private Tutoring
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="workshops" className="rounded border-gray-700 bg-gray-900 text-violet-600" />
//               <Label htmlFor="workshops" className="text-gray-300">
//                 Workshops
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="certification-programs"
//                 className="rounded border-gray-700 bg-gray-900 text-violet-600"
//               />
//               <Label htmlFor="certification-programs" className="text-gray-300">
//                 Certification Programs
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="exam-preparation"
//                 className="rounded border-gray-700 bg-gray-900 text-violet-600"
//               />
//               <Label htmlFor="exam-preparation" className="text-gray-300">
//                 Exam Preparation
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="class-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-violet-400" />
//               Class Hours
//             </Label>
//             <Textarea
//               id="class-hours"
//               placeholder="Regular class hours and availability"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="education-faq" className="text-gray-300">
//             Common Student Questions
//           </Label>
//           <Textarea
//             id="education-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Professional Services specific follow-up component
// function ProfessionalServicesFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Professional Services Details</h3>
//         <p className="text-gray-400">Tell us more about your professional services business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Service Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select service type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="legal">Legal Services</SelectItem>
//               <SelectItem value="accounting">Accounting Services</SelectItem>
//               <SelectItem value="consulting">Consulting Services</SelectItem>
//               <SelectItem value="marketing">Marketing Services</SelectItem>
//               <SelectItem value="it">IT Services</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="services-provided" className="text-gray-300">
//               Services Provided
//             </Label>
//             <Textarea
//               id="services-provided"
//               placeholder="List your main professional services"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="industry-focus" className="text-gray-300">
//               Industry Focus
//             </Label>
//             <Textarea
//               id="industry-focus"
//               placeholder="Describe your industry focus or specialties"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Service Options</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="on-site-services"
//                 className="rounded border-gray-700 bg-gray-900 text-slate-500"
//               />
//               <Label htmlFor="on-site-services" className="text-gray-300">
//                 On-Site Services
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="remote-services"
//                 className="rounded border-gray-700 bg-gray-900 text-slate-500"
//               />
//               <Label htmlFor="remote-services" className="text-gray-300">
//                 Remote Services
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="consultations"
//                 className="rounded border-gray-700 bg-gray-900 text-slate-500"
//               />
//               <Label htmlFor="consultations" className="text-gray-300">
//                 Consultations
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="project-based"
//                 className="rounded border-gray-700 bg-gray-900 text-slate-500"
//               />
//               <Label htmlFor="project-based" className="text-gray-300">
//                 Project-Based
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="retainer-based"
//                 className="rounded border-gray-700 bg-gray-900 text-slate-500"
//               />
//               <Label htmlFor="retainer-based" className="text-gray-300">
//                 Retainer-Based
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="training-programs"
//                 className="rounded border-gray-700 bg-gray-900 text-slate-500"
//               />
//               <Label htmlFor="training-programs" className="text-gray-300">
//                 Training Programs
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="service-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-slate-400" />
//               Service Hours
//             </Label>
//             <Textarea
//               id="service-hours"
//               placeholder="Regular service hours and availability"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="professional-faq" className="text-gray-300">
//             Common Client Questions
//           </Label>
//           <Textarea
//             id="professional-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Beauty & Wellness specific follow-up component
// function BeautyWellnessFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Beauty & Wellness Details</h3>
//         <p className="text-gray-400">Tell us more about your beauty and wellness business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Service Category</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select category" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="salon">Salon Services</SelectItem>
//               <SelectItem value="spa">Spa Services</SelectItem>
//               <SelectItem value="beauty">Beauty Products</SelectItem>
//               <SelectItem value="wellness">Wellness Services</SelectItem>
//               <SelectItem value="fitness">Fitness Classes</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="services-offered" className="text-gray-300">
//               Services Offered
//             </Label>
//             <Textarea
//               id="services-offered"
//               placeholder="List your main beauty and wellness services"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="product-lines" className="text-gray-300">
//               Product Lines
//             </Label>
//             <Textarea
//               id="product-lines"
//               placeholder="List your main product lines or brands"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Appointment Options</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="online-booking"
//                 className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
//               />
//               <Label htmlFor="online-booking" className="text-gray-300">
//                 Online Booking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="phone-booking"
//                 className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
//               />
//               <Label htmlFor="phone-booking" className="text-gray-300">
//                 Phone Booking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="walk-ins" className="rounded border-gray-700 bg-gray-900 text-fuchsia-600" />
//               <Label htmlFor="walk-ins" className="text-gray-300">
//                 Walk-ins
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="membership-programs"
//                 className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
//               />
//               <Label htmlFor="membership-programs" className="text-gray-300">
//                 Membership Programs
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="loyalty-programs"
//                 className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
//               />
//               <Label htmlFor="loyalty-programs" className="text-gray-300">
//                 Loyalty Programs
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="gift-certificates"
//                 className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
//               />
//               <Label htmlFor="gift-certificates" className="text-gray-300">
//                 Gift Certificates
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="appointment-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-fuchsia-400" />
//               Appointment Hours
//             </Label>
//             <Textarea
//               id="appointment-hours"
//               placeholder="Regular appointment hours and availability"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="beauty-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="beauty-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Fitness & Sports specific follow-up component
// function FitnessFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Fitness & Sports Details</h3>
//         <p className="text-gray-400">Tell us more about your fitness and sports business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Fitness Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select fitness type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="gym">Gym</SelectItem>
//               <SelectItem value="studio">Fitness Studio</SelectItem>
//               <SelectItem value="sports">Sports Club</SelectItem>
//               <SelectItem value="personal">Personal Training</SelectItem>
//               <SelectItem value="online">Online Fitness</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="classes-offered" className="text-gray-300">
//               Classes Offered
//             </Label>
//             <Textarea
//               id="classes-offered"
//               placeholder="List your main fitness classes and programs"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="equipment-available" className="text-gray-300">
//               Equipment Available
//             </Label>
//             <Textarea
//               id="equipment-available"
//               placeholder="List your main fitness equipment and facilities"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Membership Options</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="monthly-membership"
//                 className="rounded border-gray-700 bg-gray-900 text-lime-600"
//               />
//               <Label htmlFor="monthly-membership" className="text-gray-300">
//                 Monthly Membership
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="annual-membership"
//                 className="rounded border-gray-700 bg-gray-900 text-lime-600"
//               />
//               <Label htmlFor="annual-membership" className="text-gray-300">
//                 Annual Membership
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="class-packages"
//                 className="rounded border-gray-700 bg-gray-900 text-lime-600"
//               />
//               <Label htmlFor="class-packages" className="text-gray-300">
//                 Class Packages
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="drop-in-rates" className="rounded border-gray-700 bg-gray-900 text-lime-600" />
//               <Label htmlFor="drop-in-rates" className="text-gray-300">
//                 Drop-In Rates
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="personal-training"
//                 className="rounded border-gray-700 bg-gray-900 text-lime-600"
//               />
//               <Label htmlFor="personal-training" className="text-gray-300">
//                 Personal Training
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="online-classes"
//                 className="rounded border-gray-700 bg-gray-900 text-lime-600"
//               />
//               <Label htmlFor="online-classes" className="text-gray-300">
//                 Online Classes
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="class-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-lime-400" />
//               Class Hours
//             </Label>
//             <Textarea
//               id="class-hours"
//               placeholder="Regular class hours and availability"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="fitness-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="fitness-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Transportation specific follow-up component
// function TransportationFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Transportation Details</h3>
//         <p className="text-gray-400">Tell us more about your transportation business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Transportation Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select transportation type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="ride">Ride Service</SelectItem>
//               <SelectItem value="logistics">Logistics Company</SelectItem>
//               <SelectItem value="trucking">Trucking Service</SelectItem>
//               <SelectItem value="delivery">Delivery Service</SelectItem>
//               <SelectItem value="taxi">Taxi Service</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="service-area" className="text-gray-300">
//               Service Area
//             </Label>
//             <Textarea
//               id="service-area"
//               placeholder="List your main service areas and regions"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="vehicle-types" className="text-gray-300">
//               Vehicle Types
//             </Label>
//             <Textarea
//               id="vehicle-types"
//               placeholder="List your main vehicle types and fleet"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Service Options</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="on-demand-rides"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-500"
//               />
//               <Label htmlFor="on-demand-rides" className="text-gray-300">
//                 On-Demand Rides
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="scheduled-rides"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-500"
//               />
//               <Label htmlFor="scheduled-rides" className="text-gray-300">
//                 Scheduled Rides
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="package-delivery"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-500"
//               />
//               <Label htmlFor="package-delivery" className="text-gray-300">
//                 Package Delivery
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="freight-services"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-500"
//               />
//               <Label htmlFor="freight-services" className="text-gray-300">
//                 Freight Services
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="airport-transfers"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-500"
//               />
//               <Label htmlFor="airport-transfers" className="text-gray-300">
//                 Airport Transfers
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="long-distance-rides"
//                 className="rounded border-gray-700 bg-gray-900 text-yellow-500"
//               />
//               <Label htmlFor="long-distance-rides" className="text-gray-300">
//                 Long-Distance Rides
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="service-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-yellow-400" />
//               Service Hours
//             </Label>
//             <Textarea
//               id="service-hours"
//               placeholder="Regular service hours and availability"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="contact-information" className="text-gray-300">
//               Contact Information
//             </Label>
//             <Textarea
//               id="contact-information"
//               placeholder="Phone number, email, and address"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="transportation-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="transportation-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Entertainment specific follow-up component
// function EntertainmentFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Entertainment Details</h3>
//         <p className="text-gray-400">Tell us more about your entertainment business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Entertainment Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select entertainment type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="venue">Event Venue</SelectItem>
//               <SelectItem value="media">Media Production</SelectItem>
//               <SelectItem value="events">Event Planning</SelectItem>
//               <SelectItem value="theater">Theater/Cinema</SelectItem>
//               <SelectItem value="gaming">Gaming Center</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="event-types" className="text-gray-300">
//               Event Types
//             </Label>
//             <Textarea
//               id="event-types"
//               placeholder="List your main event types and services"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="target-audience" className="text-gray-300">
//               Target Audience
//             </Label>
//             <Textarea
//               id="target-audience"
//               placeholder="Describe your target audience demographics"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Service Options</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             {/* Continuing from the Entertainment follow-up component... */}
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="ticket-booking" className="rounded border-gray-700 bg-gray-900 text-red-600" />
//               <Label htmlFor="ticket-booking" className="text-gray-300">
//                 Ticket Booking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="seating-selection"
//                 className="rounded border-gray-700 bg-gray-900 text-red-600"
//               />
//               <Label htmlFor="seating-selection" className="text-gray-300">
//                 Seating Selection
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="event-reminders"
//                 className="rounded border-gray-700 bg-gray-900 text-red-600"
//               />
//               <Label htmlFor="event-reminders" className="text-gray-300">
//                 Event Reminders
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="vip-packages" className="rounded border-gray-700 bg-gray-900 text-red-600" />
//               <Label htmlFor="vip-packages" className="text-gray-300">
//                 VIP Packages
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="entertainment-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-red-400" />
//               Operating Hours
//             </Label>
//             <Textarea
//               id="entertainment-hours"
//               placeholder="Regular operating hours or event times"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="entertainment-contact" className="text-gray-300 flex items-center gap-2">
//               <Phone className="h-4 w-4 text-red-400" />
//               Contact Information
//             </Label>
//             <Textarea
//               id="entertainment-contact"
//               placeholder="Box office, customer service, or booking contacts"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="entertainment-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="entertainment-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Manufacturing specific follow-up component
// function ManufacturingFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Manufacturing Details</h3>
//         <p className="text-gray-400">Tell us more about your manufacturing business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Manufacturing Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select manufacturing type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="consumer">Consumer Goods</SelectItem>
//               <SelectItem value="industrial">Industrial Equipment</SelectItem>
//               <SelectItem value="electronics">Electronics</SelectItem>
//               <SelectItem value="automotive">Automotive Parts</SelectItem>
//               <SelectItem value="textiles">Textiles/Apparel</SelectItem>
//               <SelectItem value="food">Food Processing</SelectItem>
//               <SelectItem value="chemical">Chemical Products</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="products-manufactured" className="text-gray-300">
//               Products Manufactured
//             </Label>
//             <Textarea
//               id="products-manufactured"
//               placeholder="List your main products and product lines"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="production-capacity" className="text-gray-300">
//               Production Capacity
//             </Label>
//             <Textarea
//               id="production-capacity"
//               placeholder="Describe your production capacity and lead times"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="manufacturing-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-neutral-400" />
//               Operating Hours
//             </Label>
//             <Textarea
//               id="manufacturing-hours"
//               placeholder="e.g., 24/7 operation, shift schedules"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="quality-standards" className="text-gray-300">
//               Quality Standards
//             </Label>
//             <Textarea
//               id="quality-standards"
//               placeholder="List certifications and quality standards (ISO, etc.)"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Order Processing</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="quote-requests"
//                 className="rounded border-gray-700 bg-gray-900 text-neutral-600"
//               />
//               <Label htmlFor="quote-requests" className="text-gray-300">
//                 Quote Requests
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="sample-requests"
//                 className="rounded border-gray-700 bg-gray-900 text-neutral-600"
//               />
//               <Label htmlFor="sample-requests" className="text-gray-300">
//                 Sample Requests
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="bulk-orders"
//                 className="rounded border-gray-700 bg-gray-900 text-neutral-600"
//               />
//               <Label htmlFor="bulk-orders" className="text-gray-300">
//                 Bulk Orders
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="custom-orders"
//                 className="rounded border-gray-700 bg-gray-900 text-neutral-600"
//               />
//               <Label htmlFor="custom-orders" className="text-gray-300">
//                 Custom Orders
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="order-tracking"
//                 className="rounded border-gray-700 bg-gray-900 text-neutral-600"
//               />
//               <Label htmlFor="order-tracking" className="text-gray-300">
//                 Order Tracking
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="technical-support"
//                 className="rounded border-gray-700 bg-gray-900 text-neutral-600"
//               />
//               <Label htmlFor="technical-support" className="text-gray-300">
//                 Technical Support
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="minimum-requirements" className="text-gray-300">
//             Minimum Order Requirements
//           </Label>
//           <Textarea
//             id="minimum-requirements"
//             placeholder="Specify minimum order quantities and requirements"
//             className="bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="manufacturing-faq" className="text-gray-300">
//             Common Customer Questions
//           </Label>
//           <Textarea
//             id="manufacturing-faq"
//             placeholder="List frequently asked questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Technology & SaaS specific follow-up component
// function TechnologyFollowUp() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium text-white">Technology & SaaS Details</h3>
//         <p className="text-gray-400">Tell us more about your technology business</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label className="text-gray-300">Business Type</Label>
//           <Select>
//             <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//               <SelectValue placeholder="Select business type" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//               <SelectItem value="saas">SaaS Platform</SelectItem>
//               <SelectItem value="software">Software Development</SelectItem>
//               <SelectItem value="it-services">IT Services</SelectItem>
//               <SelectItem value="cloud">Cloud Services</SelectItem>
//               <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
//               <SelectItem value="ai-ml">AI/ML Solutions</SelectItem>
//               <SelectItem value="hardware">Hardware/Devices</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="tech-products" className="text-gray-300">
//               Products/Services
//             </Label>
//             <Textarea
//               id="tech-products"
//               placeholder="Describe your main products or services"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="target-users" className="text-gray-300">
//               Target Users
//             </Label>
//             <Textarea
//               id="target-users"
//               placeholder="Describe your target users or customer segments"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Subscription Plans</Label>
//           <div className="border-2 border-dashed border-gray-700 rounded-lg p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="basic-plan" className="text-gray-300">
//                   Basic Plan
//                 </Label>
//                 <Textarea
//                   id="basic-plan"
//                   placeholder="Features and pricing for basic plan"
//                   className="bg-gray-900 border-gray-700 text-gray-100"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="pro-plan" className="text-gray-300">
//                   Pro Plan
//                 </Label>
//                 <Textarea
//                   id="pro-plan"
//                   placeholder="Features and pricing for pro plan"
//                   className="bg-gray-900 border-gray-700 text-gray-100"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="enterprise-plan" className="text-gray-300">
//                   Enterprise Plan
//                 </Label>
//                 <Textarea
//                   id="enterprise-plan"
//                   placeholder="Features and pricing for enterprise plan"
//                   className="bg-gray-900 border-gray-700 text-gray-100"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="text-gray-300">Support & Onboarding</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="demo-requests"
//                 className="rounded border-gray-700 bg-gray-900 text-indigo-600"
//               />
//               <Label htmlFor="demo-requests" className="text-gray-300">
//                 Product Demos
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="trial-setup" className="rounded border-gray-700 bg-gray-900 text-indigo-600" />
//               <Label htmlFor="trial-setup" className="text-gray-300">
//                 Free Trial Setup
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="onboarding" className="rounded border-gray-700 bg-gray-900 text-indigo-600" />
//               <Label htmlFor="onboarding" className="text-gray-300">
//                 Onboarding Assistance
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="tech-support"
//                 className="rounded border-gray-700 bg-gray-900 text-indigo-600"
//               />
//               <Label htmlFor="tech-support" className="text-gray-300">
//                 Technical Support
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="documentation"
//                 className="rounded border-gray-700 bg-gray-900 text-indigo-600"
//               />
//               <Label htmlFor="documentation" className="text-gray-300">
//                 Documentation Access
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" id="training" className="rounded border-gray-700 bg-gray-900 text-indigo-600" />
//               <Label htmlFor="training" className="text-gray-300">
//                 Training Resources
//               </Label>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="tech-support-hours" className="text-gray-300 flex items-center gap-2">
//               <Clock className="h-4 w-4 text-indigo-400" />
//               Support Hours
//             </Label>
//             <Textarea
//               id="tech-support-hours"
//               placeholder="Support availability and time zones"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="response-times" className="text-gray-300">
//               Response Times
//             </Label>
//             <Textarea
//               id="response-times"
//               placeholder="Expected response times for different support tiers"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="integration-info" className="text-gray-300">
//             Integration Information
//           </Label>
//           <Textarea
//             id="integration-info"
//             placeholder="List supported integrations, APIs, and technical requirements"
//             className="bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="tech-faq" className="text-gray-300">
//             Common Technical Questions
//           </Label>
//           <Textarea
//             id="tech-faq"
//             placeholder="List frequently asked technical questions and their answers"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Update the BusinessTypeSelector component to use the follow-up components
// export default function BusinessTypeSelector() {
//   const [selectedType, setSelectedType] = useState<string | null>(null)

//   const businessTypes: BusinessType[] = [
//     {
//       id: "ecommerce",
//       name: "E-commerce",
//       icon: <ShoppingBag className="h-8 w-8" />,
//       description: "Online retail stores selling products directly to consumers",
//       gradient: "from-pink-500 to-rose-500",
//       followUpComponent: <EcommerceFollowUp />,
//     },
//     {
//       id: "restaurant",
//       name: "Restaurant & Food",
//       icon: <Utensils className="h-8 w-8" />,
//       description: "Restaurants, cafes, food delivery, and catering services",
//       gradient: "from-amber-500 to-orange-600",
//       followUpComponent: <RestaurantFollowUp />,
//     },
//     {
//       id: "travel",
//       name: "Travel & Hospitality",
//       icon: <Plane className="h-8 w-8" />,
//       description: "Hotels, airlines, travel agencies, and tourism services",
//       gradient: "from-sky-400 to-blue-600",
//       followUpComponent: <TravelFollowUp />,
//     },
//     {
//       id: "realestate",
//       name: "Real Estate",
//       icon: <Building2 className="h-8 w-8" />,
//       description: "Property sales, rentals, and management services",
//       gradient: "from-emerald-500 to-teal-600",
//       followUpComponent: <RealEstateFollowUp />,
//     },
//     {
//       id: "healthcare",
//       name: "Healthcare",
//       icon: <Stethoscope className="h-8 w-8" />,
//       description: "Medical practices, clinics, and healthcare services",
//       gradient: "from-cyan-500 to-blue-500",
//       followUpComponent: <HealthcareFollowUp />,
//     },
//     {
//       id: "education",
//       name: "Education",
//       icon: <GraduationCap className="h-8 w-8" />,
//       description: "Schools, universities, online courses, and tutoring",
//       gradient: "from-violet-500 to-purple-600",
//       followUpComponent: <EducationFollowUp />,
//     },
//     {
//       id: "professional",
//       name: "Professional Services",
//       icon: <Briefcase className="h-8 w-8" />,
//       description: "Legal, accounting, consulting, and business services",
//       gradient: "from-slate-600 to-gray-700",
//       followUpComponent: <ProfessionalServicesFollowUp />,
//     },
//     {
//       id: "beauty",
//       name: "Beauty & Wellness",
//       icon: <Scissors className="h-8 w-8" />,
//       description: "Salons, spas, beauty products, and wellness services",
//       gradient: "from-fuchsia-500 to-pink-600",
//       followUpComponent: <BeautyWellnessFollowUp />,
//     },
//     {
//       id: "fitness",
//       name: "Fitness & Sports",
//       icon: <Dumbbell className="h-8 w-8" />,
//       description: "Gyms, fitness studios, sports clubs, and equipment",
//       gradient: "from-lime-500 to-green-600",
//       followUpComponent: <FitnessFollowUp />,
//     },
//     {
//       id: "transportation",
//       name: "Transportation",
//       icon: <Bus className="h-8 w-8" />,
//       description: "Ride services, logistics, and transportation companies",
//       gradient: "from-yellow-500 to-amber-600",
//       followUpComponent: <TransportationFollowUp />,
//     },
//     {
//       id: "entertainment",
//       name: "Entertainment",
//       icon: <Film className="h-8 w-8" />,
//       description: "Events, venues, media, and entertainment services",
//       gradient: "from-red-500 to-rose-600",
//       followUpComponent: <EntertainmentFollowUp />,
//     },
//     {
//       id: "manufacturing",
//       name: "Manufacturing",
//       icon: <Factory className="h-8 w-8" />,
//       description: "Product manufacturing, industrial services, and supplies",
//       gradient: "from-neutral-600 to-stone-700",
//       followUpComponent: <ManufacturingFollowUp />,
//     },
//     {
//       id: "technology",
//       name: "Technology & SaaS",
//       icon: <Laptop className="h-8 w-8" />,
//       description: "Software, IT services, and technology products",
//       gradient: "from-indigo-500 to-blue-600",
//       followUpComponent: <TechnologyFollowUp />,
//     },
//   ]

//   const selectedBusiness = businessTypes.find((type) => type.id === selectedType)

//   return (
//     <div className="space-y-8">
//       <div className="text-center space-y-2">
//         <h2 className="text-2xl font-bold text-white">Select Your Business Type</h2>
//         <p className="text-gray-400 max-w-2xl mx-auto">
//           Choose the category that best describes your business to get customized automation recommendations
//         </p>
//       </div>

//       {!selectedType ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {businessTypes.map((type) => (
//             <motion.div
//               key={type.id}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Card
//                 className="cursor-pointer h-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm overflow-hidden"
//                 onClick={() => setSelectedType(type.id)}
//               >
//                 <div className={`h-2 w-full bg-gradient-to-r ${type.gradient}`}></div>
//                 <CardContent className="p-6 flex flex-col items-center text-center">
//                   <div className={`p-3 rounded-full bg-gradient-to-br ${type.gradient} mb-4`}>{type.icon}</div>
//                   <h3 className="font-bold text-lg mb-1 text-white">{type.name}</h3>
//                   <p className="text-sm text-gray-400">{type.description}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="outline"
//               onClick={() => setSelectedType(null)}
//               className="border-gray-700 text-gray-300 hover:bg-gray-700"
//             >
//               ← Back to all business types
//             </Button>
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-full bg-gradient-to-br ${selectedBusiness?.gradient}`}>
//                 {selectedBusiness?.icon}
//               </div>
//               <h3 className="font-bold text-xl text-white">{selectedBusiness?.name}</h3>
//             </div>
//           </div>

//           <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
//             <CardContent className="p-6">{selectedBusiness?.followUpComponent}</CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import {
  Clock,
  Phone,
  Check,
  X,
  Plus,
  Trash2,
  ShoppingBagIcon as BagShopping,
  PocketKnifeIcon as ForkKnife,
  PlaneIcon as Airplane,
  HomeIcon as House,
  Heart,
  GraduationCap,
  Briefcase,
  Flower,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { saveBusinessTypeData } from "@/actions/businfo" 


interface BusinessType {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  gradient: string
  followUpComponent: React.ReactNode
}

// Common validation and formatting functions
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const formatPhoneNumber = (phone: string, countryCode: string): string => {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, "")
  return `+${countryCode} ${cleaned}`
}

interface FAQItem {
  question: string
  answer: string
}

// FAQ Component for all forms
function FAQSection({ id }: { id: string }) {
  const [faqs, setFaqs] = useState<FAQItem[]>([{ question: "", answer: "" }])

  const addFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }])
  }

  const removeFAQ = (index: number) => {
    if (faqs.length > 1) {
      const newFaqs = [...faqs]
      newFaqs.splice(index, 1)
      setFaqs(newFaqs)
    }
  }

  const updateFAQ = (index: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...faqs]
    newFaqs[index][field] = value
    setFaqs(newFaqs)
  }

  return (
    <div className="space-y-4">
      <Label htmlFor={id} className="text-gray-300 flex items-center justify-between">
        <span>Common Customer Questions</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-700"
          onClick={addFAQ}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Question
        </Button>
      </Label>

      {faqs.map((faq, index) => (
        <div key={index} className="space-y-2 border border-gray-700 rounded-md p-3">
          <div className="flex justify-between items-center">
            <Label htmlFor={`${id}-q-${index}`} className="text-gray-400">
              Question {index + 1}
            </Label>
            {faqs.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-red-400"
                onClick={() => removeFAQ(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Input
            id={`${id}-q-${index}`}
            value={faq.question}
            onChange={(e) => updateFAQ(index, "question", e.target.value)}
            placeholder="Enter a frequently asked question"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
          <Label htmlFor={`${id}-a-${index}`} className="text-gray-400">
            Answer
          </Label>
          <Textarea
            id={`${id}-a-${index}`}
            value={faq.answer}
            onChange={(e) => updateFAQ(index, "answer", e.target.value)}
            placeholder="Provide a clear and helpful answer"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>
      ))}
    </div>
  )
}

// Contact Information Component
function ContactInfoSection({ id }: { id: string }) {
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)

  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("1")
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null)

  const [address, setAddress] = useState("")

  const checkEmail = (value: string) => {
    setEmail(value)
    if (value.length > 0) {
      setIsEmailValid(validateEmail(value))
    } else {
      setIsEmailValid(null)
    }
  }

  const checkPhone = (value: string) => {
    setPhone(value)
    if (value.length > 0) {
      // Basic validation - can be enhanced for different country formats
      setIsPhoneValid(/^\d{6,15}$/.test(value.replace(/\D/g, "")))
    } else {
      setIsPhoneValid(null)
    }
  }

  return (
    <div className="space-y-4">
      <Label htmlFor={id} className="text-gray-300">
        Contact Information
      </Label>

      <div className="space-y-2">
        <Label htmlFor={`${id}-email`} className="text-gray-400 flex items-center gap-2">
          Email
          {isEmailValid === true && <Check className="h-4 w-4 text-green-500" />}
          {isEmailValid === false && <X className="h-4 w-4 text-red-500" />}
        </Label>
        <Input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => checkEmail(e.target.value)}
          placeholder="contact@example.com"
          className={`bg-gray-900 border-gray-700 text-gray-100 ${isEmailValid === false ? "border-red-500" : ""}`}
        />
        {isEmailValid === false && <p className="text-xs text-red-500">Please enter a valid email address</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-phone`} className="text-gray-400 flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-500" />
          Phone Number
          {isPhoneValid === true && <Check className="h-4 w-4 text-green-500" />}
          {isPhoneValid === false && <X className="h-4 w-4 text-red-500" />}
        </Label>
        <div className="flex gap-2">
          <div className="w-24">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
                <SelectValue placeholder="+1" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-100 max-h-60">
                <SelectItem value="1">+1 (US/CA)</SelectItem>
                <SelectItem value="44">+44 (UK)</SelectItem>
                <SelectItem value="61">+61 (AU)</SelectItem>
                <SelectItem value="33">+33 (FR)</SelectItem>
                <SelectItem value="49">+49 (DE)</SelectItem>
                <SelectItem value="81">+81 (JP)</SelectItem>
                <SelectItem value="86">+86 (CN)</SelectItem>
                <SelectItem value="91">+91 (IN)</SelectItem>
                <SelectItem value="52">+52 (MX)</SelectItem>
                <SelectItem value="55">+55 (BR)</SelectItem>
                <SelectItem value="27">+27 (ZA)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            id={`${id}-phone`}
            type="tel"
            value={phone}
            onChange={(e) => checkPhone(e.target.value)}
            placeholder="Phone number"
            className={`bg-gray-900 border-gray-700 text-gray-100 flex-1 ${
              isPhoneValid === false ? "border-red-500" : ""
            }`}
          />
        </div>
        {isPhoneValid === false && <p className="text-xs text-red-500">Please enter a valid phone number</p>}
        {isPhoneValid === true && (
          <p className="text-xs text-gray-400">Formatted: {formatPhoneNumber(phone, countryCode)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-address`} className="text-gray-400">
          Address
        </Label>
        <Textarea
          id={`${id}-address`}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Physical address"
          className="bg-gray-900 border-gray-700 text-gray-100"
        />
      </div>
    </div>
  )
}

// E-commerce specific follow-up component
function EcommerceFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">E-commerce Details</h3>
        <p className="text-gray-400">Tell us more about your e-commerce business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">E-commerce Platform</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="shopify">Shopify</SelectItem>
              <SelectItem value="woocommerce">WooCommerce</SelectItem>
              <SelectItem value="etsy">Etsy</SelectItem>
              <SelectItem value="amazon">Amazon</SelectItem>
              <SelectItem value="ebay">eBay</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product-categories" className="text-gray-300">
              Product Categories
            </Label>
            <Textarea
              id="product-categories"
              placeholder="List your main product categories"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-audience" className="text-gray-300">
              Target Audience
            </Label>
            <Textarea
              id="target-audience"
              placeholder="Describe your target customer demographics"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Order Processing</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="order-tracking"
                className="rounded border-gray-700 bg-gray-900 text-blue-600"
              />
              <Label htmlFor="order-tracking" className="text-gray-300">
                Order Tracking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="returns" className="rounded border-gray-700 bg-gray-900 text-blue-600" />
              <Label htmlFor="returns" className="text-gray-300">
                Returns & Exchanges
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shipping-options"
                className="rounded border-gray-700 bg-gray-900 text-blue-600"
              />
              <Label htmlFor="shipping-options" className="text-gray-300">
                Shipping Options
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="international-shipping"
                className="rounded border-gray-700 bg-gray-900 text-blue-600"
              />
              <Label htmlFor="international-shipping" className="text-gray-300">
                International Shipping
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="customer-support"
                className="rounded border-gray-700 bg-gray-900 text-blue-600"
              />
              <Label htmlFor="customer-support" className="text-gray-300">
                Customer Support
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="loyalty-program"
                className="rounded border-gray-700 bg-gray-900 text-blue-600"
              />
              <Label htmlFor="loyalty-program" className="text-gray-300">
                Loyalty Program
              </Label>
            </div>
          </div>
        </div>

        <ContactInfoSection id="ecommerce-contact" />

        <FAQSection id="ecommerce-faq" />
      </div>
    </div>
  )
}

// Restaurant specific follow-up component
function RestaurantFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Restaurant Details</h3>
        <p className="text-gray-400">Tell us more about your restaurant business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Cuisine Type</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="menu-highlights" className="text-gray-300">
              Menu Highlights
            </Label>
            <Textarea
              id="menu-highlights"
              placeholder="List your signature dishes and specialties"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurant-ambiance" className="text-gray-300">
              Restaurant Ambiance
            </Label>
            <Textarea
              id="restaurant-ambiance"
              placeholder="Describe the restaurant's atmosphere and decor"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Services Offered</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="dine-in" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
              <Label htmlFor="dine-in" className="text-gray-300">
                Dine-In
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="takeout" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
              <Label htmlFor="takeout" className="text-gray-300">
                Takeout
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="delivery" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
              <Label htmlFor="delivery" className="text-gray-300">
                Delivery
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="catering" className="rounded border-gray-700 bg-gray-900 text-yellow-600" />
              <Label htmlFor="catering" className="text-gray-300">
                Catering
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reservations"
                className="rounded border-gray-700 bg-gray-900 text-yellow-600"
              />
              <Label htmlFor="reservations" className="text-gray-300">
                Reservations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="online-ordering"
                className="rounded border-gray-700 bg-gray-900 text-yellow-600"
              />
              <Label htmlFor="online-ordering" className="text-gray-300">
                Online Ordering
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="restaurant-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            Operating Hours
          </Label>
          <Textarea
            id="restaurant-hours"
            placeholder="Regular business hours and special timings"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <ContactInfoSection id="restaurant-contact" />

        <FAQSection id="restaurant-faq" />
      </div>
    </div>
  )
}

// Travel specific follow-up component
function TravelFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Travel & Hospitality Details</h3>
        <p className="text-gray-400">Tell us more about your travel business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Travel Type</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="airline">Airline</SelectItem>
              <SelectItem value="agency">Travel Agency</SelectItem>
              <SelectItem value="tour">Tour Operator</SelectItem>
              <SelectItem value="rental">Car Rental</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination-focus" className="text-gray-300">
              Destination Focus
            </Label>
            <Textarea
              id="destination-focus"
              placeholder="List your main travel destinations"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travel-style" className="text-gray-300">
              Travel Style
            </Label>
            <Textarea
              id="travel-style"
              placeholder="Describe your travel style (e.g., luxury, budget, adventure)"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Services Offered</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="flight-booking" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
              <Label htmlFor="flight-booking" className="text-gray-300">
                Flight Booking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="hotel-booking" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
              <Label htmlFor="hotel-booking" className="text-gray-300">
                Hotel Booking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="tour-packages" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
              <Label htmlFor="tour-packages" className="text-gray-300">
                Tour Packages
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="car-rental" className="rounded border-gray-700 bg-gray-900 text-sky-600" />
              <Label htmlFor="car-rental" className="text-gray-300">
                Car Rental
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="travel-insurance"
                className="rounded border-gray-700 bg-gray-900 text-sky-600"
              />
              <Label htmlFor="travel-insurance" className="text-gray-300">
                Travel Insurance
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="visa-assistance"
                className="rounded border-gray-700 bg-gray-900 text-sky-600"
              />
              <Label htmlFor="visa-assistance" className="text-gray-300">
                Visa Assistance
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="booking-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-sky-400" />
            Booking Hours
          </Label>
          <Textarea
            id="booking-hours"
            placeholder="Availability for booking and support"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <ContactInfoSection id="travel-contact" />

        <FAQSection id="travel-faq" />
      </div>
    </div>
  )
}

// Real Estate specific follow-up component
function RealEstateFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Real Estate Details</h3>
        <p className="text-gray-400">Tell us more about your real estate business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Property Type</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="rental">Rental</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="property-location" className="text-gray-300">
              Property Location
            </Label>
            <Textarea
              id="property-location"
              placeholder="List your main areas of operation"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="property-specialty" className="text-gray-300">
              Property Specialty
            </Label>
            <Textarea
              id="property-specialty"
              placeholder="Describe your property specialty (e.g., luxury homes, condos)"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Services Offered</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="property-sales"
                className="rounded border-gray-700 bg-gray-900 text-emerald-600"
              />
              <Label htmlFor="property-sales" className="text-gray-300">
                Property Sales
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="property-rentals"
                className="rounded border-gray-700 bg-gray-900 text-emerald-600"
              />
              <Label htmlFor="property-rentals" className="text-gray-300">
                Property Rentals
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="property-management"
                className="rounded border-gray-700 bg-gray-900 text-emerald-600"
              />
              <Label htmlFor="property-management" className="text-gray-300">
                Property Management
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="property-valuation"
                className="rounded border-gray-700 bg-gray-900 text-emerald-600"
              />
              <Label htmlFor="property-valuation" className="text-gray-300">
                Property Valuation
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="investment-advice"
                className="rounded border-gray-700 bg-gray-900 text-emerald-600"
              />
              <Label htmlFor="investment-advice" className="text-gray-300">
                Investment Advice
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="relocation-services"
                className="rounded border-gray-700 bg-gray-900 text-emerald-600"
              />
              <Label htmlFor="relocation-services" className="text-gray-300">
                Relocation Services
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="property-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400" />
            Office Hours
          </Label>
          <Textarea
            id="property-hours"
            placeholder="Regular business hours and availability"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <ContactInfoSection id="property-contact" />

        <FAQSection id="realestate-faq" />
      </div>
    </div>
  )
}

// Healthcare specific follow-up component
function HealthcareFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Healthcare Details</h3>
        <p className="text-gray-400">Tell us more about your healthcare business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Healthcare Specialty</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="general">General Practice</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="dentistry">Dentistry</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="services-offered" className="text-gray-300">
              Services Offered
            </Label>
            <Textarea
              id="services-offered"
              placeholder="List your main medical services"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance-accepted" className="text-gray-300">
              Insurance Accepted
            </Label>
            <Textarea
              id="insurance-accepted"
              placeholder="List accepted insurance providers"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
        <Label htmlFor="appointment-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            Appointment OPtions
          </Label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="online-booking"
                className="rounded border-gray-700 bg-gray-900 text-cyan-600"
              />
              <Label htmlFor="online-booking" className="text-gray-300">
                Online Booking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="phone-booking" className="rounded border-gray-700 bg-gray-900 text-cyan-600" />
              <Label htmlFor="phone-booking" className="text-gray-300">
                Phone Booking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="walk-ins" className="rounded border-gray-700 bg-gray-900 text-cyan-600" />
              <Label htmlFor="walk-ins" className="text-gray-300">
                Walk-ins
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="virtual-consultations"
                className="rounded border-gray-700 bg-gray-900 text-cyan-600"
              />
              <Label htmlFor="virtual-consultations" className="text-gray-300">
                Virtual Consultations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emergency-services"
                className="rounded border-gray-700 bg-gray-900 text-cyan-600"
              />
              <Label htmlFor="emergency-services" className="text-gray-300">
                Emergency Services
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="home-visits" className="rounded border-gray-700 bg-gray-900 text-cyan-600" />
              <Label htmlFor="home-visits" className="text-gray-300">
                Home Visits
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="appointment-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            Appointment Hours
          </Label>
          <Textarea
            id="appointment-hours"
            placeholder="Regular appointment hours and availability"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <ContactInfoSection id="healthcare-contact" />

        <FAQSection id="healthcare-faq" />
      </div>
    </div>
  )
}

// Education specific follow-up component
function EducationFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Education Details</h3>
        <p className="text-gray-400">Tell us more about your education business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Education Type</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select education type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="online">Online Course</SelectItem>
              <SelectItem value="tutoring">Tutoring</SelectItem>
              <SelectItem value="training">Training Center</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subjects-taught" className="text-gray-300">
              Subjects Taught
            </Label>
            <Textarea
              id="subjects-taught"
              placeholder="List your main subjects and courses"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-students" className="text-gray-300">
              Target Students
            </Label>
            <Textarea
              id="target-students"
              placeholder="Describe your target student demographics"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Learning Options</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="in-person-classes"
                className="rounded border-gray-700 bg-gray-900 text-violet-600"
              />
              <Label htmlFor="in-person-classes" className="text-gray-300">
                In-Person Classes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="online-courses"
                className="rounded border-gray-700 bg-gray-900 text-violet-600"
              />
              <Label htmlFor="online-courses" className="text-gray-300">
                Online Courses
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="group-sessions"
                className="rounded border-gray-700 bg-gray-900 text-violet-600"
              />
              <Label htmlFor="group-sessions" className="text-gray-300">
                Group Sessions
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="private-tutoring"
                className="rounded border-gray-700 bg-gray-900 text-violet-600"
              />
              <Label htmlFor="private-tutoring" className="text-gray-300">
                Private Tutoring
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="workshops" className="rounded border-gray-700 bg-gray-900 text-violet-600" />
              <Label htmlFor="workshops" className="text-gray-300">
                Workshops
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="certification-programs"
                className="rounded border-gray-700 bg-gray-900 text-violet-600"
              />
              <Label htmlFor="certification-programs" className="text-gray-300">
                Certification Programs
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="exam-preparation"
                className="rounded border-gray-700 bg-gray-900 text-violet-600"
              />
              <Label htmlFor="exam-preparation" className="text-gray-300">
                Exam Preparation
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="class-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-violet-400" />
            Class Hours
          </Label>
          <Textarea
            id="class-hours"
            placeholder="Regular class hours and availability"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <ContactInfoSection id="education-contact" />

        <FAQSection id="education-faq" />
      </div>
    </div>
  )
}

// Professional Services specific follow-up component
function ProfessionalServicesFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Professional Services Details</h3>
        <p className="text-gray-400">Tell us more about your professional services business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Service Type</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="legal">Legal Services</SelectItem>
              <SelectItem value="accounting">Accounting Services</SelectItem>
              <SelectItem value="consulting">Consulting Services</SelectItem>
              <SelectItem value="marketing">Marketing Services</SelectItem>
              <SelectItem value="it">IT Services</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="services-provided" className="text-gray-300">
              Services Provided
            </Label>
            <Textarea
              id="services-provided"
              placeholder="List your main professional services"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry-focus" className="text-gray-300">
              Industry Focus
            </Label>
            <Textarea
              id="industry-focus"
              placeholder="Describe your industry focus or specialties"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Service Options</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="on-site-services"
                className="rounded border-gray-700 bg-gray-900 text-slate-500"
              />
              <Label htmlFor="on-site-services" className="text-gray-300">
                On-Site Services
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remote-services"
                className="rounded border-gray-700 bg-gray-900 text-slate-500"
              />
              <Label htmlFor="remote-services" className="text-gray-300">
                Remote Services
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="consultations"
                className="rounded border-gray-700 bg-gray-900 text-slate-500"
              />
              <Label htmlFor="consultations" className="text-gray-300">
                Consultations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="project-based"
                className="rounded border-gray-700 bg-gray-900 text-slate-500"
              />
              <Label htmlFor="project-based" className="text-gray-300">
                Project-Based
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="retainer-based"
                className="rounded border-gray-700 bg-gray-900 text-slate-500"
              />
              <Label htmlFor="retainer-based" className="text-gray-300">
                Retainer-Based
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="training-programs"
                className="rounded border-gray-700 bg-gray-900 text-slate-500"
              />
              <Label htmlFor="training-programs" className="text-gray-300">
                Training Programs
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            Service Hours
          </Label>
          <Textarea
            id="service-hours"
            placeholder="Regular service hours and availability"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <ContactInfoSection id="professional-contact" />

        <FAQSection id="professional-faq" />
      </div>
    </div>
  )
}

// Beauty & Wellness specific follow-up component
function BeautyWellnessFollowUp() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Beauty & Wellness Details</h3>
        <p className="text-gray-400">Tell us more about your beauty and wellness business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Service Category</Label>
          <Select>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="salon">Salon Services</SelectItem>
              <SelectItem value="spa">Spa Services</SelectItem>
              <SelectItem value="beauty">Beauty Products</SelectItem>
              <SelectItem value="wellness">Wellness Services</SelectItem>
              <SelectItem value="fitness">Fitness Classes</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="services-offered" className="text-gray-300">
              Services Offered
            </Label>
            <Textarea
              id="services-offered"
              placeholder="List your main beauty and wellness services"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-lines" className="text-gray-300">
              Product Lines
            </Label>
            <Textarea
              id="product-lines"
              placeholder="List your main product lines or brands"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Appointment Options</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="online-booking"
                className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
              />
              <Label htmlFor="online-booking" className="text-gray-300">
                Online Booking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="phone-booking"
                className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
              />
              <Label htmlFor="phone-booking" className="text-gray-300">
                Phone Booking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="walk-ins" className="rounded border-gray-700 bg-gray-900 text-fuchsia-600" />
              <Label htmlFor="walk-ins" className="text-gray-300">
                Walk-ins
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="membership-programs"
                className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
              />
              <Label htmlFor="membership-programs" className="text-gray-300">
                Membership Programs
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="loyalty-programs"
                className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
              />
              <Label htmlFor="loyalty-programs" className="text-gray-300">
                Loyalty Programs
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="gift-certificates"
                className="rounded border-gray-700 bg-gray-900 text-fuchsia-600"
              />
              <Label htmlFor="gift-certificates" className="text-gray-300">
                Gift Certificates
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="appointment-hours" className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-fuchsia-400" />
            Appointment Hours
          </Label>
          <Textarea
            id="appointment-hours"
            placeholder="Regular appointment hours and availability"
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <ContactInfoSection id="beauty-contact" />

        <FAQSection id="beauty-faq" />
      </div>
    </div>
  )
}

const businessTypes: BusinessType[] = [
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: <BagShopping />,
    description: "Online store",
    gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    followUpComponent: <EcommerceFollowUp />,
  },
  {
    id: "restaurant",
    name: "Restaurant",
    icon: <ForkKnife />,
    description: "Food service",
    gradient: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
    followUpComponent: <RestaurantFollowUp />,
  },
  {
    id: "travel",
    name: "Travel",
    icon: <Airplane />,
    description: "Travel agency",
    gradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500",
    followUpComponent: <TravelFollowUp />,
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: <House />,
    description: "Property sales",
    gradient: "bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500",
    followUpComponent: <RealEstateFollowUp />,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Heart />,
    description: "Medical services",
    gradient: "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500",
    followUpComponent: <HealthcareFollowUp />,
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap />,
    description: "Educational services",
    gradient: "bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500",
    followUpComponent: <EducationFollowUp />,
  },
  {
    id: "professional",
    name: "Professional Services",
    icon: <Briefcase />,
    description: "Consulting, legal, etc.",
    gradient: "bg-gradient-to-r from-gray-500 via-slate-500 to-zinc-500",
    followUpComponent: <ProfessionalServicesFollowUp />,
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    icon: <Flower />,
    description: "Salon, spa, etc.",
    gradient: "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500",
    followUpComponent: <BeautyWellnessFollowUp />,
  },
]

// const BusinessTypeSelector = ({ businessId }: { businessId: string }) => {
  export default function BusinessTypeSelector({ businessId }: { businessId: string }) {

  const [selectedBusinessTypeId, setSelectedBusinessTypeId] = useState<string>("")
  const [businessTypeData, setBusinessTypeData] = useState<any>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null)

  const selectedBusinessType = businessTypes.find((type) => type.id === selectedBusinessTypeId)

  const handleDataChange = (data: any) => {
    setBusinessTypeData({
      ...businessTypeData,
      ...data,
    })
  }

  const handleSave = async () => {
    if (!selectedBusinessTypeId) {
      setSaveStatus({
        success: false,
        message: "Please select a business type",
      })
      return
    }

    setIsSaving(true)
    setSaveStatus(null)

    try {
      const dataToSave = {
        businessTypeId: selectedBusinessTypeId,
        businessTypeName: selectedBusinessType?.name || "",
        ...businessTypeData,
      }

      const result = await saveBusinessTypeData(businessId, dataToSave)

      if (result.status === 200) {
        setSaveStatus({
          success: true,
          message: "Business type data saved successfully",
        })
      } else {
        setSaveStatus({
          success: false,
          message: result.data,
        })
      }
    } catch (error) {
      setSaveStatus({
        success: false,
        message: "An error occurred while saving",
      })
    } finally {
      setIsSaving(false)
    }
  }


  return (
    <div className="space-y-6">
      <Label className="text-gray-300">Business Type</Label>
      <Select value={selectedBusinessTypeId} onValueChange={setSelectedBusinessTypeId}>
        <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100 w-full">
          <SelectValue placeholder="Select your business type" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
          {businessTypes.map((businessType) => (
            <SelectItem key={businessType.id} value={businessType.id}>
              <div className="flex items-center gap-2">
                {businessType.icon}
                {businessType.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedBusinessType && selectedBusinessType.followUpComponent}

      {saveStatus && (
        <div
          className={`p-3 rounded-md ${saveStatus.success ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"}`}
        >
          {saveStatus.message}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving || !selectedBusinessTypeId}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {isSaving ? "Saving..." : "Save Business Type Data"}
        </Button>
      </div>
    </div>
  )
}



