
// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { cn } from "@/lib/utils"
// import {
//   CreditCard,
//   DollarSignIcon as PaypalLogo,
//   Bitcoin,
//   Apple,
//   BanknoteIcon as BankTransfer,
//   Gift,
//   Check,
//   ChevronRight,
//   ChevronLeft,
//   Lock,
//   X,
//   ChevronsUpDown,
//   Shield,
//   Sparkles,
//   Landmark,
//   Wallet,
//   AlertCircle,
//   Info,
//   Star,
//   CreditCardIcon as GooglePay,
//   CheckCircle2,
//   ThumbsUp,
//   Timer,
//   RefreshCcw,
//   ArrowRight,
//   Copy,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"

// const CARD_TYPES = {
//   visa: {
//     pattern: /^4/,
//     icon: "/placeholder.svg?height=35&width=55",
//   },
//   mastercard: {
//     pattern: /^5[1-5]/,
//     icon: "/placeholder.svg?height=35&width=55",
//   },
//   amex: {
//     pattern: /^3[47]/,
//     icon: "/placeholder.svg?height=35&width=55",
//   },
//   discover: {
//     pattern: /^(6011|65|64[4-9]|622)/,
//     icon: "/placeholder.svg?height=35&width=55",
//   },
// }

// interface PaymentMethod {
//   id: string
//   name: string
//   icon: React.ReactNode
//   description: string
//   popular?: boolean
//   processingTime: string
//   fees: string
//   color: string
// }

// const PaymentMethodIcon = ({
//   method,
//   selected,
//   size = "default",
// }: {
//   method: string
//   selected: boolean
//   size?: "default" | "large"
// }) => {
//   const icons: Record<string, React.ReactNode> = {
//     card: <CreditCard className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     paypal: <PaypalLogo className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     crypto: <Bitcoin className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     applepay: <Apple className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     googlepay: <GooglePay className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     bank: <BankTransfer className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     giftcard: <Gift className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     wallet: <Wallet className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//   }

//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center rounded-full transition-all",
//         size === "large" ? "h-16 w-16 p-3" : "h-10 w-10 p-2",
//         selected
//           ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
//           : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
//       )}
//     >
//       {icons[method]}
//     </div>
//   )
// }

// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState<string>("card")
//   const [formStep, setFormStep] = useState<number>(0)
//   const [flipCard, setFlipCard] = useState(false)
//   const [cardNumber, setCardNumber] = useState("")
//   const [cardName, setCardName] = useState("")
//   const [expiryDate, setExpiryDate] = useState("")
//   const [cvv, setCvv] = useState("")
//   const [saveCard, setSaveCard] = useState(false)
//   const [useSpecialOffer, setUseSpecialOffer] = useState(false)
//   const [applePay, setApplePay] = useState(false)
//   const [googlePay, setGooglePay] = useState(false)
//   const [showOrderSummary, setShowOrderSummary] = useState(false)
//   const [animationComplete, setAnimationComplete] = useState(false)
//   const [cardType, setCardType] = useState<keyof typeof CARD_TYPES | null>(null)
//   const [sidebarVisible, setSidebarVisible] = useState(true)
//   const [mobileView, setMobileView] = useState(false)
//   const [paymentProcessing, setPaymentProcessing] = useState(false)
//   const [paymentComplete, setPaymentComplete] = useState(false)
//   const cardNumberRef = useRef<HTMLInputElement>(null)
//   const expiryRef = useRef<HTMLInputElement>(null)
//   const cvvRef = useRef<HTMLInputElement>(null)

//   // Detect card type based on card number
//   useEffect(() => {
//     if (cardNumber) {
//       for (const [type, { pattern }] of Object.entries(CARD_TYPES)) {
//         if (pattern.test(cardNumber.replace(/\s/g, ""))) {
//           setCardType(type as keyof typeof CARD_TYPES)
//           return
//         }
//       }
//       setCardType(null)
//     } else {
//       setCardType(null)
//     }
//   }, [cardNumber])

//   // Format credit card number with spaces
//   const formatCardNumber = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     const matches = v.match(/\d{4,16}/g)
//     const match = (matches && matches[0]) || ""
//     const parts = []

//     for (let i = 0; i < match.length; i += 4) {
//       parts.push(match.substring(i, i + 4))
//     }

//     if (parts.length) {
//       return parts.join(" ")
//     } else {
//       return value
//     }
//   }

//   // Format expiry date
//   const formatExpiryDate = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     if (v.length > 2) {
//       return `${v.substring(0, 2)}/${v.substring(2, 4)}`
//     }
//     return value
//   }

//   // Handle card number input
//   const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = formatCardNumber(e.target.value)
//     setCardNumber(formattedValue)

//     // Auto-advance to expiry when full card number entered
//     if (formattedValue.replace(/\s/g, "").length === 16 && expiryRef.current) {
//       expiryRef.current.focus()
//     }
//   }

//   // Handle expiry date input
//   const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = formatExpiryDate(e.target.value)
//     setExpiryDate(formattedValue)

//     // Auto-advance to CVV when full expiry entered
//     if (formattedValue.length === 5 && cvvRef.current) {
//       cvvRef.current.focus()
//       setFlipCard(true)
//     }
//   }

//   // Handle CVV input
//   const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "")
//     if (value.length <= 4) {
//       setCvv(value)
//     }
//   }

//   const handleCvvFocus = () => {
//     setFlipCard(true)
//   }

//   const handleCvvBlur = () => {
//     setFlipCard(false)
//   }

//   const cardNumberValid = cardNumber.replace(/\s/g, "").length >= 15
//   const expiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate)
//   const cvvValid = cvv.length >= 3
//   const cardNameValid = cardName.length > 2
//   const cardFormValid = cardNumberValid && expiryDateValid && cvvValid && cardNameValid

//   // Available payment methods
//   const paymentMethods: PaymentMethod[] = [
//     {
//       id: "card",
//       name: "Credit / Debit Card",
//       icon: <CreditCard className="h-5 w-5" />,
//       description: "Pay with Visa, Mastercard, Discover, or American Express",
//       popular: true,
//       processingTime: "Instant",
//       fees: "No fees",
//       color: "from-blue-500 to-indigo-600",
//     },
//     {
//       id: "paypal",
//       name: "PayPal",
//       icon: <PaypalLogo className="h-5 w-5" />,
//       description: "Fast, secure checkout with PayPal",
//       processingTime: "Instant",
//       fees: "No fees",
//       color: "from-blue-400 to-blue-600",
//     },
//     {
//       id: "crypto",
//       name: "Cryptocurrency",
//       icon: <Bitcoin className="h-5 w-5" />,
//       description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
//       processingTime: "10-60 minutes",
//       fees: "Network fees apply",
//       color: "from-orange-500 to-amber-600",
//     },
//     {
//       id: "applepay",
//       name: "Apple Pay",
//       icon: <Apple className="h-5 w-5" />,
//       description: "Quick and secure checkout with Apple Pay",
//       processingTime: "Instant",
//       fees: "No fees",
//       color: "from-gray-600 to-gray-900",
//     },
//     {
//       id: "googlepay",
//       name: "Google Pay",
//       icon: <GooglePay className="h-5 w-5" />,
//       description: "Quick checkout with Google Pay",
//       processingTime: "Instant",
//       fees: "No fees",
//       color: "from-blue-500 to-green-500",
//     },
//     {
//       id: "bank",
//       name: "Bank Transfer",
//       icon: <BankTransfer className="h-5 w-5" />,
//       description: "Pay directly from your bank account",
//       processingTime: "1-3 business days",
//       fees: "May include bank fees",
//       color: "from-emerald-500 to-teal-600",
//     },
//     {
//       id: "giftcard",
//       name: "Gift Card",
//       icon: <Gift className="h-5 w-5" />,
//       description: "Redeem a gift card or promo code",
//       processingTime: "Instant",
//       fees: "No fees",
//       color: "from-pink-500 to-rose-600",
//     },
//     {
//       id: "wallet",
//       name: "Digital Wallet",
//       icon: <Wallet className="h-5 w-5" />,
//       description: "Use your digital wallet balance",
//       processingTime: "Instant",
//       fees: "No fees",
//       color: "from-purple-500 to-violet-600",
//     },
//   ]

//   const items = [
//     { name: "Premium Plan (Annual)", price: 199.99, saving: "20%" },
//     { name: "Setup Fee", price: 0, waived: true },
//     { name: "Priority Support", price: 49.99 },
//   ]

//   const subtotal = items.reduce((acc, item) => acc + item.price, 0)
//   const discount = useSpecialOffer ? 25 : 0
//   const tax = (subtotal - discount) * 0.08
//   const total = subtotal - discount + tax

//   // Handle continueTo step
//   const continueTo = (step: number) => {
//     if (step === 2) {
//       setPaymentProcessing(true)
//       setTimeout(() => {
//         setPaymentProcessing(false)
//         setPaymentComplete(true)
//         setFormStep(step)
//       }, 2500)
//     } else {
//       setFormStep(step)
//     }
//   }

//   // Check form validity based on payment method
//   const isFormValid = () => {
//     switch (paymentMethod) {
//       case "card":
//         return cardFormValid
//       case "paypal":
//         return true
//       case "crypto":
//         return true
//       case "applepay":
//         return applePay
//       case "googlepay":
//         return googlePay
//       case "bank":
//         return true
//       case "giftcard":
//         return true
//       case "wallet":
//         return true
//       default:
//         return false
//     }
//   }

//   // Handle window resize for responsive layout
//   useEffect(() => {
//     const handleResize = () => {
//       setMobileView(window.innerWidth < 768)
//       setSidebarVisible(window.innerWidth >= 1024)
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   const fakeSavedCards = [
//     {
//       id: "card1",
//       type: "visa",
//       last4: "4242",
//       expiry: "09/25",
//       name: "John Doe",
//       isDefault: true,
//     },
//     {
//       id: "card2",
//       type: "mastercard",
//       last4: "8975",
//       expiry: "12/24",
//       name: "John Doe",
//       isDefault: false,
//     },
//   ]

//   // Particles for the success animation
//   const Particles = ({ count = 50 }: { count?: number }) => {
//     return (
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {Array.from({ length: count }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 rounded-full bg-primary"
//             initial={{
//               scale: 0,
//               x: "50%",
//               y: "50%",
//               opacity: 1,
//             }}
//             animate={{
//               scale: Math.random() * 1 + 0.5,
//               x: `${Math.random() * 100}%`,
//               y: `${Math.random() * 100}%`,
//               opacity: 0,
//             }}
//             transition={{
//               duration: Math.random() * 1 + 0.5,
//               delay: Math.random() * 0.2,
//             }}
//             onAnimationComplete={() => {
//               if (i === count - 1) setAnimationComplete(true)
//             }}
//             style={{
//               backgroundColor: `hsl(${Math.random() * 60 + 230}, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 50}%)`,
//             }}
//           />
//         ))}
//       </div>
//     )
//   }

//   // Render payment method form based on selected method
//   const renderPaymentMethodForm = () => {
//     switch (paymentMethod) {
//       case "card":
//         return (
//           <div className="space-y-6">
//             <div className="relative perspective-1000">
//               <motion.div
//                 className="relative w-full h-56 transition-all duration-500 preserve-3d"
//                 animate={{ rotateY: flipCard ? 180 : 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {/* Front of card */}
//                 <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 p-5 flex flex-col justify-between">
//                     <div className="flex justify-between items-start">
//                       <div className="flex flex-col">
//                         <div className="text-white/70 text-xs uppercase tracking-wider">Credit Card</div>
//                         <div className="text-white/90 text-xs mt-1">
//                           {cardType ? (
//                             <span className="uppercase">{cardType}</span>
//                           ) : (
//                             <span>Visa / Mastercard / Amex</span>
//                           )}
//                         </div>
//                       </div>
//                       {cardType && (
//                         <div className="h-10 w-14 bg-white/20 rounded-md grid place-items-center p-1">
//                           <img
//                             src={CARD_TYPES[cardType].icon || "/placeholder.svg"}
//                             alt={cardType}
//                             className="max-h-full"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="my-6">
//                       <div className="text-xl text-white font-mono tracking-wider">
//                         {cardNumber || "•••• •••• •••• ••••"}
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-end">
//                       <div>
//                         <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Card Holder</div>
//                         <div className="text-white font-medium truncate max-w-[180px]">{cardName || "YOUR NAME"}</div>
//                       </div>
//                       <div>
//                         <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Expires</div>
//                         <div className="text-white font-medium">{expiryDate || "MM/YY"}</div>
//                       </div>
//                     </div>

//                     {/* Circuit design elements */}
//                     <div className="absolute top-[40%] left-0 w-12 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
//                     <div className="absolute top-[30%] right-5 w-8 h-8 border-r-2 border-b-2 border-white/10 rounded-br-lg"></div>
//                     <div className="absolute bottom-6 left-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
//                     <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full"></div>
//                     <div className="absolute top-5 left-[30%] w-3 h-3 bg-white/20 rounded-full"></div>
//                     <div className="absolute bottom-10 right-[20%] w-6 h-1 bg-white/20 rounded"></div>
//                   </div>
//                 </div>

//                 {/* Back of card */}
//                 <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden rotateY-180">
//                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-violet-600 p-5 flex flex-col">
//                     <div className="w-full h-12 bg-black/30 mt-4"></div>

//                     <div className="mt-6 flex justify-end">
//                       <div className="bg-white/90 h-10 w-full max-w-[80%] rounded relative flex items-center px-3">
//                         <div className="absolute text-right w-full pr-12 font-mono text-gray-600 tracking-widest">
//                           {cvv || "•••"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-auto text-xs text-white/70 max-w-[80%]">
//                       This card is property of your bank. Unauthorized use is prohibited. If found, please return to
//                       your bank.
//                     </div>

//                     {/* Circuit design elements */}
//                     <div className="absolute top-[40%] right-0 w-12 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
//                     <div className="absolute bottom-10 left-5 w-8 h-8 border-l-2 border-b-2 border-white/10 rounded-bl-lg"></div>
//                     <div className="absolute bottom-6 right-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="space-y-4">
//               {fakeSavedCards.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="text-base font-medium mb-3">Saved Cards</h3>
//                   <div className="space-y-3">
//                     {fakeSavedCards.map((card) => (
//                       <div
//                         key={card.id}
//                         className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
//                         onClick={() => {
//                           setCardNumber(`•••• •••• •••• ${card.last4}`)
//                           setCardName(card.name)
//                           setExpiryDate(card.expiry)
//                           setCvv("•••")
//                         }}
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-md grid place-items-center">
//                             <img src={`/placeholder.svg?height=30&width=40`} alt={card.type} className="max-h-6" />
//                           </div>
//                           <div>
//                             <div className="font-medium">
//                               {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.last4}
//                             </div>
//                             <div className="text-xs text-muted-foreground">Expires {card.expiry}</div>
//                           </div>
//                         </div>
//                         <div className="flex items-center">
//                           {card.isDefault && (
//                             <Badge className="mr-2" variant="outline">
//                               Default
//                             </Badge>
//                           )}
//                           <Button variant="ghost" size="icon">
//                             <Check
//                               className={cn("h-4 w-4 transition-opacity", card.isDefault ? "opacity-100" : "opacity-0")}
//                             />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <Separator className="my-6" />
//                   <h3 className="text-base font-medium mb-3">Add New Card</h3>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="cardName">Cardholder Name</Label>
//                   <Input
//                     id="cardName"
//                     placeholder="Name on card"
//                     value={cardName}
//                     onChange={(e) => setCardName(e.target.value)}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="cardNumber">Card Number</Label>
//                   <div className="relative">
//                     <Input
//                       id="cardNumber"
//                       placeholder="1234 5678 9012 3456"
//                       value={cardNumber}
//                       onChange={handleCardNumberChange}
//                       maxLength={19}
//                       ref={cardNumberRef}
//                       className="pr-12"
//                     />
//                     {cardType && (
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                         <img src={CARD_TYPES[cardType].icon || "/placeholder.svg"} alt={cardType} className="h-6" />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="expiryDate">Expiry Date</Label>
//                     <Input
//                       id="expiryDate"
//                       placeholder="MM/YY"
//                       value={expiryDate}
//                       onChange={handleExpiryChange}
//                       maxLength={5}
//                       ref={expiryRef}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <Label htmlFor="cvv">Security Code</Label>
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Info className="h-4 w-4 text-muted-foreground cursor-help" />
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p className="w-56">
//                               The 3 or 4 digit security code found on the back of your card (or front for Amex).
//                             </p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                     <Input
//                       id="cvv"
//                       placeholder="CVV"
//                       value={cvv}
//                       onChange={handleCvvChange}
//                       maxLength={4}
//                       onFocus={handleCvvFocus}
//                       onBlur={handleCvvBlur}
//                       ref={cvvRef}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-2 mt-2">
//                   <Checkbox id="saveCard" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
//                   <label
//                     htmlFor="saveCard"
//                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     Save card for future payments
//                   </label>
//                 </div>
//               </div>

//               <div className="mt-2 text-sm text-muted-foreground flex items-center">
//                 <Lock className="h-4 w-4 mr-1" />
//                 <span>Your payment information is encrypted and secure.</span>
//               </div>
//             </div>
//           </div>
//         )

//       case "paypal":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-10">
//               <div className="bg-[#003087] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <PaypalLogo className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with PayPal</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 You will be redirected to PayPal to complete your payment securely. You will have a chance to review your
//                 order before the payment is finalized.
//               </p>
//             </div>

//             <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
//                 <span>
//                   PayPal protects your payment information with industry-leading security and fraud prevention systems.
//                   You are always protected if the item doesnt arrive or is significantly different than described.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "crypto":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-[#F7931A] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Bitcoin className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Cryptocurrency</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Pay with your favorite cryptocurrency. We accept Bitcoin, Ethereum, and many other digital currencies.
//               </p>
//             </div>

//             <div className="border rounded-lg p-5 bg-amber-50 dark:bg-amber-950/30">
//               <Tabs defaultValue="bitcoin" className="w-full">
//                 <TabsList className="grid grid-cols-3 mb-4">
//                   <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
//                   <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
//                   <TabsTrigger value="other">Others</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="bitcoin" className="space-y-4">
//                   <div className="flex flex-col items-center">
//                     <div className="bg-white p-2 rounded-lg mb-3">
//                       <img src="/placeholder.svg?height=180&width=180" alt="Bitcoin QR Code" className="h-40 w-40" />
//                     </div>
//                     <div className="text-sm text-center">
//                       <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
//                         bc1q8y34567x90zv67n56qwerty78mn65al2345xz
//                       </p>
//                       <Button variant="outline" size="sm" className="mt-1">
//                         <Copy className="h-4 w-4 mr-2" />
//                         Copy Address
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-4">
//                     <p className="flex items-start">
//                       <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
//                       Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
//                       worth of Bitcoin to this address. Current exchange rate: 1 BTC ≈ $59,783.21 USD
//                     </p>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="ethereum" className="space-y-4">
//                   <div className="flex flex-col items-center">
//                     <div className="bg-white p-2 rounded-lg mb-3">
//                       <img src="/placeholder.svg?height=180&width=180" alt="Ethereum QR Code" className="h-40 w-40" />
//                     </div>
//                     <div className="text-sm text-center">
//                       <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
//                         0x1234567890abcdef1234567890abcdef12345678
//                       </p>
//                       <Button variant="outline" size="sm" className="mt-1">
//                         <Copy className="h-4 w-4 mr-2" />
//                         Copy Address
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-4">
//                     <p className="flex items-start">
//                       <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
//                       Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
//                       worth of Ethereum to this address. Current exchange rate: 1 ETH ≈ $3,124.45 USD
//                     </p>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="other" className="py-3">
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select cryptocurrency" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="solana">Solana (SOL)</SelectItem>
//                       <SelectItem value="cardano">Cardano (ADA)</SelectItem>
//                       <SelectItem value="ripple">Ripple (XRP)</SelectItem>
//                       <SelectItem value="polkadot">Polkadot (DOT)</SelectItem>
//                       <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <p className="text-sm text-muted-foreground mt-4">
//                     Select your preferred cryptocurrency to view payment instructions.
//                   </p>
//                 </TabsContent>
//               </Tabs>
//             </div>

//             <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
//                 <span>
//                   Please ensure you are sending the exact amount required. Cryptocurrency transactions cannot be
//                   reversed. Payment will be confirmed after 1-3 network confirmations.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "applepay":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-8">
//               <div className="bg-black text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Apple className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Apple Pay</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Simple, secure payment with Face ID or Touch ID.
//               </p>
//             </div>

//             <div className="flex justify-center py-6">
//               <Button
//                 className="bg-black hover:bg-black/90 text-white rounded-full h-12 px-6"
//                 onClick={() => setApplePay(true)}
//               >
//                 <Apple className="h-5 w-5 mr-2" />
//                 <span className="font-medium">Pay</span>
//               </Button>
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Apple Pay uses device-specific numbers and unique transaction codes, so your card number is never
//                   stored on your device or shared with merchants.
//                 </span>
//               </div>
//             </div>

//             {applePay && (
//               <div className="mt-4 text-center text-green-600 dark:text-green-400">
//                 <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
//                 <p>Apple Pay authorized successfully!</p>
//               </div>
//             )}
//           </div>
//         )

//       case "googlepay":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-8">
//               <div className="bg-white border shadow-sm w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <GooglePay className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Google Pay</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Fast, simple checkout with Google Pay.</p>
//             </div>

//             <div className="flex justify-center py-6">
//               <Button
//                 className="bg-white text-black hover:bg-gray-100 border shadow-sm h-12 px-6"
//                 onClick={() => setGooglePay(true)}
//               >
//                 <GooglePay className="h-5 w-5 mr-2" />
//                 <span className="font-medium">Pay</span>
//               </Button>
//             </div>

//             <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
//                 <span>
//                   Google Pay encrypts your payment info with multiple layers of security using industry-standard methods
//                   like tokenization.
//                 </span>
//               </div>
//             </div>

//             {googlePay && (
//               <div className="mt-4 text-center text-green-600 dark:text-green-400">
//                 <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
//                 <p>Google Pay authorized successfully!</p>
//               </div>
//             )}
//           </div>
//         )

//       case "bank":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-emerald-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Landmark className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Bank Transfer</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Transfer directly from your bank account.</p>
//             </div>

//             <div className="border rounded-lg p-5 bg-emerald-50 dark:bg-emerald-950/30 space-y-4">
//               <p className="font-medium">Payment details</p>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Account name:</span>
//                   <span className="font-medium">ACME Corporation</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Account number:</span>
//                   <span className="font-mono font-medium">12345678</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Routing number:</span>
//                   <span className="font-mono font-medium">987654321</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">SWIFT/BIC:</span>
//                   <span className="font-mono font-medium">ABCDUS33</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Reference:</span>
//                   <span className="font-mono font-medium">INV-1234-5678</span>
//                 </div>
//               </div>

//               <div className="pt-2">
//                 <Button variant="outline" className="w-full">
//                   <Copy className="h-4 w-4 mr-2" />
//                   Copy Details
//                 </Button>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
//                 <span>
//                   Please include the reference number in your transfer. Processing may take 1-3 business days. Your
//                   order will be confirmed once payment is received.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "giftcard":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-rose-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Gift className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Gift Card</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Redeem a gift card or promotional code.</p>
//             </div>

//             <div className="border rounded-lg p-5 space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="giftcard">Gift Card Number</Label>
//                 <Input id="giftcard" placeholder="XXXX-XXXX-XXXX-XXXX" />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="pin">PIN (if applicable)</Label>
//                 <Input id="pin" placeholder="1234" maxLength={4} />
//               </div>

//               <Button className="w-full mt-2">Apply Gift Card</Button>
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Gift cards cannot be replaced if lost or stolen. Gift card balance will be applied to your purchase,
//                   and any remaining amount can be paid with another payment method.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "wallet":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-violet-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Wallet className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Digital Wallet</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Use your stored balance to complete this payment.
//               </p>
//             </div>

//             <div className="border rounded-lg p-5 bg-violet-50 dark:bg-violet-950/30 space-y-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Current Balance</p>
//                   <p className="text-2xl font-bold">$350.00</p>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   <RefreshCcw className="h-4 w-4 mr-1" />
//                   Refresh
//                 </Button>
//               </div>

//               <Separator />

//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Order Total</p>
//                   <p className="text-xl font-semibold">${total.toFixed(2)}</p>
//                 </div>
//                 <Badge
//                   variant="outline"
//                   className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
//                 >
//                   Sufficient Funds
//                 </Badge>
//               </div>

//               <div className="pt-2">
//                 <Button className="w-full bg-violet-600 hover:bg-violet-700">Pay from Wallet</Button>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Your digital wallet is protected with our secure encryption technologies. All transactions are instant
//                   and fee-free.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   // Render the main component
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
//       <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <div className="flex items-center">
//               <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 grid place-items-center text-white mr-2">
//                 <Sparkles className="h-4 w-4" />
//               </div>
//               <span className="font-bold text-lg">PayFlow</span>
//             </div>
//             <div className="hidden md:flex ml-8">
//               <Badge variant="outline" className="font-normal">
//                 <Lock className="h-3 w-3 mr-1" />
//                 Secure Checkout
//               </Badge>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <div className="mr-4 text-sm">
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <div className="flex items-center cursor-help">
//                       <Shield className="h-4 w-4 mr-1 text-green-600 dark:text-green-500" />
//                       <span className="hidden sm:inline">256-bit SSL Encrypted</span>
//                     </div>
//                   </TooltipTrigger>
//                   <TooltipContent className="max-w-sm">
//                     <p>This checkout is secured with industry-standard encryption to keep your information safe.</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>

//             <div>
//               <Button variant="ghost" size="sm" className="hidden md:flex">
//                 <ThumbsUp className="h-4 w-4 mr-1" />
//                 Need Help?
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-8">
//           <div className="space-y-1">
//             <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
//             <p className="text-muted-foreground">
//               Select your preferred payment method and complete the details below.
//             </p>
//           </div>

//           {/* Form Steps */}
//           <div className="space-y-8">
//             {/* Progress indicator */}
//             <div className="flex items-center justify-between relative">
//               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-800"></div>
//               {["Payment Method", "Details", "Confirmation"].map((step, index) => (
//                 <div key={index} className="relative z-10 flex flex-col items-center">
//                   <div
//                     className={cn(
//                       "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mb-1",
//                       formStep > index
//                         ? "bg-green-600 text-white"
//                         : formStep === index
//                           ? "bg-primary text-white"
//                           : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
//                     )}
//                   >
//                     {formStep > index ? <Check className="h-4 w-4" /> : index + 1}
//                   </div>
//                   <span
//                     className={cn("text-xs", formStep === index ? "font-medium text-primary" : "text-muted-foreground")}
//                   >
//                     {step}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Step 1: Payment Method Selection */}
//             <AnimatePresence mode="wait">
//               {formStep === 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {paymentMethods.slice(0, 4).map((method) => (
//                       <div
//                         key={method.id}
//                         className={cn(
//                           "relative rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
//                           paymentMethod === method.id
//                             ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
//                             : "border-gray-200 dark:border-gray-800",
//                         )}
//                         onClick={() => setPaymentMethod(method.id)}
//                       >
//                         {method.popular && (
//                           <div className="absolute top-0 right-0">
//                             <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none bg-gradient-to-r from-violet-600 to-indigo-600 border-0 text-[10px] font-medium">
//                               POPULAR
//                             </Badge>
//                           </div>
//                         )}
//                         <div
//                           className={cn(
//                             "flex flex-col items-center p-4 h-full",
//                             paymentMethod === method.id && "bg-primary/5",
//                           )}
//                         >
//                           <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
//                           <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-sm font-medium text-muted-foreground">More Payment Options</h3>
//                       <Separator className="flex-1 mx-4" />
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       {paymentMethods.slice(4).map((method) => (
//                         <div
//                           key={method.id}
//                           className={cn(
//                             "rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
//                             paymentMethod === method.id
//                               ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
//                               : "border-gray-200 dark:border-gray-800",
//                           )}
//                           onClick={() => setPaymentMethod(method.id)}
//                         >
//                           <div
//                             className={cn(
//                               "flex flex-col items-center p-4",
//                               paymentMethod === method.id && "bg-primary/5",
//                             )}
//                           >
//                             <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
//                             <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border p-4 mt-6">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         {paymentMethod && <PaymentMethodIcon method={paymentMethod} selected={true} size="large" />}
//                         <div className="ml-4">
//                           <h3 className="font-medium">
//                             {paymentMethods.find((m) => m.id === paymentMethod)?.name || "Select a payment method"}
//                           </h3>
//                           <p className="text-sm text-muted-foreground">
//                             {paymentMethods.find((m) => m.id === paymentMethod)?.description}
//                           </p>
//                         </div>
//                       </div>
//                       <Button
//                         onClick={() => continueTo(1)}
//                         disabled={!paymentMethod}
//                         className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                       >
//                         Continue
//                         <ChevronRight className="h-4 w-4 ml-1" />
//                       </Button>
//                     </div>
//                   </div>

//                   {/* Payment Method Comparison Table */}
//                   <Drawer>
//                     <DrawerTrigger asChild>
//                       <Button variant="outline" className="w-full">
//                         Compare Payment Methods
//                         <ChevronsUpDown className="h-4 w-4 ml-1" />
//                       </Button>
//                     </DrawerTrigger>
//                     <DrawerContent>
//                       <div className="mx-auto w-full max-w-4xl">
//                         <DrawerHeader>
//                           <DrawerTitle>Payment Method Comparison</DrawerTitle>
//                           <DrawerDescription>
//                             Compare the features and benefits of each payment method
//                           </DrawerDescription>
//                         </DrawerHeader>
//                         <div className="p-4 overflow-auto">
//                           <table className="w-full border-collapse">
//                             <thead>
//                               <tr className="border-b">
//                                 <th className="text-left p-3">Payment Method</th>
//                                 <th className="text-left p-3">Processing Time</th>
//                                 <th className="text-left p-3">Fees</th>
//                                 <th className="text-left p-3">Security</th>
//                                 <th className="text-left p-3">Benefits</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {paymentMethods.map((method) => (
//                                 <tr key={method.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
//                                   <td className="p-3">
//                                     <div className="flex items-center">
//                                       <div
//                                         className={`p-1.5 rounded-full bg-gradient-to-r ${method.color} text-white mr-2`}
//                                       >
//                                         {method.icon}
//                                       </div>
//                                       <span className="font-medium">{method.name}</span>
//                                     </div>
//                                   </td>
//                                   <td className="p-3">{method.processingTime}</td>
//                                   <td className="p-3">{method.fees}</td>
//                                   <td className="p-3">
//                                     <div className="flex items-center">
//                                       <div className="flex space-x-0.5">
//                                         {Array.from({ length: 5 }).map((_, i) => (
//                                           <Star
//                                             key={i}
//                                             className={cn(
//                                               "h-4 w-4",
//                                               i < (method.id === "crypto" ? 4 : 5)
//                                                 ? "text-amber-500 fill-amber-500"
//                                                 : "text-gray-300 dark:text-gray-600",
//                                             )}
//                                           />
//                                         ))}
//                                       </div>
//                                     </div>
//                                   </td>
//                                   <td className="p-3">
//                                     <span>
//                                       {method.id === "card" && "Widely accepted, rewards programs"}
//                                       {method.id === "paypal" && "Buyer protection, no need to share card details"}
//                                       {method.id === "crypto" && "Privacy, no chargebacks, global payments"}
//                                       {method.id === "applepay" && "Fast checkout, biometric security"}
//                                       {method.id === "googlepay" && "Fast checkout, stored payment methods"}
//                                       {method.id === "bank" && "No card needed, good for large payments"}
//                                       {method.id === "giftcard" && "Great for gifts, budgeting control"}
//                                       {method.id === "wallet" && "No additional payment method needed"}
//                                     </span>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                         <DrawerFooter>
//                           <DrawerClose asChild>
//                             <Button variant="outline">Close</Button>
//                           </DrawerClose>
//                         </DrawerFooter>
//                       </div>
//                     </DrawerContent>
//                   </Drawer>
//                 </motion.div>
//               )}

//               {/* Step 2: Payment Details */}
//               {formStep === 1 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex items-center justify-between">
//                     <Button variant="ghost" onClick={() => setFormStep(0)} className="text-muted-foreground">
//                       <ChevronLeft className="h-4 w-4 mr-1" />
//                       Back to Payment Methods
//                     </Button>
//                     <div className="flex items-center">
//                       <PaymentMethodIcon method={paymentMethod} selected={true} />
//                       <span className="ml-2 font-medium">
//                         {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                       </span>
//                     </div>
//                   </div>

//                   <Card>
//                     <CardContent className="pt-6">{renderPaymentMethodForm()}</CardContent>
//                   </Card>

//                   <div className="pt-4 flex items-center justify-between">
//                     <Button variant="outline" onClick={() => setFormStep(0)}>
//                       <ChevronLeft className="h-4 w-4 mr-1" />
//                       Back
//                     </Button>
//                     <Button
//                       onClick={() => continueTo(2)}
//                       disabled={!isFormValid() || paymentProcessing}
//                       className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                     >
//                       {paymentProcessing ? (
//                         <>
//                           <Timer className="h-4 w-4 mr-2 animate-spin" />
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           Continue to Review
//                           <ChevronRight className="h-4 w-4 ml-1" />
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 3: Confirmation */}
//               {formStep === 2 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-6"
//                 >
//                   {paymentComplete ? (
//                     <div className="text-center py-10 relative">
//                       {!animationComplete && <Particles count={100} />}
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", duration: 0.5 }}
//                         className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto grid place-items-center mb-4"
//                       >
//                         <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
//                       </motion.div>
//                       <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
//                       <p className="text-muted-foreground max-w-md mx-auto mb-6">
//                         Your payment has been processed successfully. You will receive a confirmation email shortly.
//                       </p>
//                       <div className="border rounded-lg p-4 max-w-md mx-auto bg-gray-50 dark:bg-gray-900">
//                         <div className="flex justify-between mb-2">
//                           <span className="text-muted-foreground">Transaction ID:</span>
//                           <span className="font-medium">
//                             TRX-{Math.random().toString(36).substring(2, 10).toUpperCase()}
//                           </span>
//                         </div>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-muted-foreground">Payment Method:</span>
//                           <span className="font-medium">
//                             {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                           </span>
//                         </div>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-muted-foreground">Amount:</span>
//                           <span className="font-bold">${total.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Date:</span>
//                           <span className="font-medium">{new Date().toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                       <div className="mt-8">
//                         <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
//                           Continue to Your Account
//                           <ArrowRight className="h-4 w-4 ml-2" />
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-6">
//                       <div className="flex items-center justify-between">
//                         <Button variant="ghost" onClick={() => setFormStep(1)} className="text-muted-foreground">
//                           <ChevronLeft className="h-4 w-4 mr-1" />
//                           Back to Payment
//                         </Button>
//                         <div className="flex items-center">
//                           <PaymentMethodIcon method={paymentMethod} selected={true} />
//                           <span className="ml-2 font-medium">
//                             {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                           </span>
//                         </div>
//                       </div>

//                       <Card>
//                         <CardHeader>
//                           <CardTitle>Review & Confirm</CardTitle>
//                           <CardDescription>Please review your payment details before confirming</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-6">
//                           <div className="space-y-4">
//                             <div className="flex justify-between pb-2 border-b">
//                               <h3 className="font-medium">Payment Details</h3>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => setFormStep(1)}
//                                 className="h-auto p-0 text-primary hover:text-primary/80"
//                               >
//                                 Edit
//                               </Button>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div>
//                                 <h4 className="text-sm text-muted-foreground mb-1">Payment Method</h4>
//                                 <div className="flex items-center">
//                                   <PaymentMethodIcon method={paymentMethod} selected={true} />
//                                   <span className="ml-2 font-medium">
//                                     {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                                   </span>
//                                 </div>
//                               </div>

//                               {paymentMethod === "card" && (
//                                 <>
//                                   <div>
//                                     <h4 className="text-sm text-muted-foreground mb-1">Card Number</h4>
//                                     <div className="font-medium">•••• •••• •••• {cardNumber.slice(-4)}</div>
//                                   </div>
//                                   <div>
//                                     <h4 className="text-sm text-muted-foreground mb-1">Card Holder</h4>
//                                     <div className="font-medium">{cardName}</div>
//                                   </div>
//                                   <div>
//                                     <h4 className="text-sm text-muted-foreground mb-1">Expiry Date</h4>
//                                     <div className="font-medium">{expiryDate}</div>
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                           </div>

//                           <Separator />

//                           <div className="space-y-4">
//                             <div className="flex justify-between pb-2 border-b">
//                               <h3 className="font-medium">Billing Summary</h3>
//                             </div>

//                             <div className="space-y-2">
//                               {items.map((item, index) => (
//                                 <div key={index} className="flex justify-between items-center">
//                                   <div className="flex items-center">
//                                     <span>{item.name}</span>
//                                     {item.waived && (
//                                       <Badge
//                                         variant="outline"
//                                         className="ml-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//                                       >
//                                         Waived
//                                       </Badge>
//                                     )}
//                                     {item.saving && (
//                                       <Badge
//                                         variant="outline"
//                                         className="ml-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
//                                       >
//                                         Save {item.saving}
//                                       </Badge>
//                                     )}
//                                   </div>
//                                   <span className="font-medium">
//                                     ${item.price === 0 ? "0.00" : item.price.toFixed(2)}
//                                   </span>
//                                 </div>
//                               ))}

//                               <Separator className="my-2" />

//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Subtotal</span>
//                                 <span className="font-medium">${subtotal.toFixed(2)}</span>
//                               </div>

//                               {useSpecialOffer && (
//                                 <div className="flex justify-between text-green-600 dark:text-green-400">
//                                   <span>Special Offer Discount</span>
//                                   <span>-$25.00</span>
//                                 </div>
//                               )}

//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Tax (8%)</span>
//                                 <span className="font-medium">${tax.toFixed(2)}</span>
//                               </div>

//                               <Separator className="my-2" />

//                               <div className="flex justify-between text-lg">
//                                 <span className="font-bold">Total</span>
//                                 <span className="font-bold">${total.toFixed(2)}</span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="pt-4 space-y-4">
//                             <div className="flex items-center space-x-2">
//                               <Checkbox id="terms" />
//                               <label
//                                 htmlFor="terms"
//                                 className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                               >
//                                 I agree to the{" "}
//                                 <a href="#" className="text-primary underline hover:text-primary/90">
//                                   Terms and Conditions
//                                 </a>{" "}
//                                 and{" "}
//                                 <a href="#" className="text-primary underline hover:text-primary/90">
//                                   Privacy Policy
//                                 </a>
//                               </label>
//                             </div>

//                             <div className="flex items-center space-x-2">
//                               <Checkbox
//                                 id="subscribe"
//                                 checked={useSpecialOffer}
//                                 onCheckedChange={(checked) => setUseSpecialOffer(!!checked)}
//                               />
//                               <div className="grid gap-1.5 leading-none">
//                                 <label
//                                   htmlFor="subscribe"
//                                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
//                                 >
//                                   Apply Special Offer Code
//                                   <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
//                                     $25 OFF
//                                   </Badge>
//                                 </label>
//                                 <p className="text-sm text-muted-foreground">
//                                   Special discount for first-time customers
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </CardContent>
//                         <CardFooter className="flex justify-between">
//                           <Button variant="outline" onClick={() => setFormStep(1)}>
//                             <ChevronLeft className="h-4 w-4 mr-1" />
//                             Back
//                           </Button>
//                           <Button
//                             onClick={() => continueTo(2)}
//                             className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                           >
//                             Confirm Payment
//                             <Lock className="h-4 w-4 ml-1" />
//                           </Button>
//                         </CardFooter>
//                       </Card>
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Order Summary Sidebar */}
//         <AnimatePresence>
//           {(sidebarVisible || showOrderSummary) && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.2 }}
//               className="lg:block bg-gray-50 dark:bg-gray-900 rounded-xl border p-6 h-fit sticky top-24"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="font-bold text-lg">Order Summary</h2>
//                 {mobileView && (
//                   <Button variant="ghost" size="sm" onClick={() => setShowOrderSummary(false)} className="lg:hidden">
//                     <X className="h-4 w-4" />
//                   </Button>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 {items.map((item, index) => (
//                   <div key={index} className="flex justify-between">
//                     <div>
//                       <div className="font-medium">{item.name}</div>
//                       <div className="flex mt-1">
//                         {item.waived && (
//                           <Badge
//                             variant="outline"
//                             className="text-[10px] text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//                           >
//                             Waived
//                           </Badge>
//                         )}
//                         {item.saving && (
//                           <Badge
//                             variant="outline"
//                             className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
//                           >
//                             Save {item.saving}
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                     <span className="font-medium">${item.price === 0 ? "0.00" : item.price.toFixed(2)}</span>
//                   </div>
//                 ))}

//                 <Separator />

//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                 </div>

//                 {useSpecialOffer && (
//                   <div className="flex justify-between text-green-600 dark:text-green-400">
//                     <span>Special Offer Discount</span>
//                     <span>-$25.00</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Tax (8%)</span>
//                   <span className="font-medium">${tax.toFixed(2)}</span>
//                 </div>

//                 <Separator />

//                 <div className="flex justify-between text-lg">
//                   <span className="font-bold">Total</span>
//                   <span className="font-bold">${total.toFixed(2)}</span>
//                 </div>

//                 <div className="pt-2 text-sm text-muted-foreground space-y-2">
//                   <div className="flex items-center">
//                     <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                     <span>Secure 256-bit SSL encryption</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                     <span>Data protection & privacy</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                     <span>Money-back guarantee</span>
//                   </div>
//                 </div>

//                 {mobileView && (
//                   <Button
//                     className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                     onClick={() => setShowOrderSummary(false)}
//                   >
//                     Continue
//                     <ChevronRight className="h-4 w-4 ml-1" />
//                   </Button>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {mobileView && !showOrderSummary && (
//         <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950 border-t dark:border-gray-800 flex items-center justify-between z-10">
//           <div>
//             <div className="text-sm text-muted-foreground">Total</div>
//             <div className="font-bold text-lg">${total.toFixed(2)}</div>
//           </div>
//           <Button
//             onClick={() => setShowOrderSummary(true)}
//             className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//           >
//             View Summary
//             <ChevronRight className="h-4 w-4 ml-1" />
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default PaymentPage

//not tesyed yrt brt nrt errtttrs

// "use client"

// import type React from "react"

// import { motion, AnimatePresence } from "framer-motion"
// import { cn } from "@/lib/utils"
// import {
//   CreditCard,
//   DollarSignIcon as PaypalLogo,
//   Bitcoin,
//   Apple,
//   BanknoteIcon as BankTransfer,
//   Gift,
//   Check,
//   ChevronRight,
//   ChevronLeft,
//   Lock,
//   X,
//   ChevronsUpDown,
//   Shield,
//   Sparkles,
//   Landmark,
//   Wallet,
//   AlertCircle,
//   Info,
//   Star,
//   CreditCardIcon as GooglePay,
//   CheckCircle2,
//   ThumbsUp,
//   Timer,
//   RefreshCcw,
//   ArrowRight,
//   Copy,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useToast } from "@/hooks/use-toast"

// // Import payment processing libraries
// import { loadStripe } from "@stripe/stripe-js"
// import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js"
// // Replace the import for useUser from Clerk with your server actions
// // Replace this:
// //import { useUser } from "@clerk/nextjs";

// // With this:
// import { onCurrentUser, onUserInfo, onSubscribe } from "@/actions/user"
// import { useState, useEffect, useRef, type FormEvent } from "react"
// // Replace NextAuth imports with Clerk imports
// //import { useUser } from "@clerk/nextjs"

// // Initialize Stripe with your publishable key
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// // Card types for validation and display
// const CARD_TYPES = {
//   visa: {
//     pattern: /^4/,
//     icon: "/assets/payment/visa.svg",
//   },
//   mastercard: {
//     pattern: /^5[1-5]/,
//     icon: "/assets/payment/mastercard.svg",
//   },
//   amex: {
//     pattern: /^3[47]/,
//     icon: "/assets/payment/amex.svg",
//   },
//   discover: {
//     pattern: /^(6011|65|64[4-9]|622)/,
//     icon: "/assets/payment/discover.svg",
//   },
// }

// interface PaymentMethod {
//   id: string
//   name: string
//   icon: React.ReactNode
//   description: string
//   popular?: boolean
//   processingTime: string
//   fees: string
//   color: string
// }

// // Add this interface near the top of the file, after the other interfaces
// interface PaymentResult {
//   success: boolean
//   transactionId?: string
//   sessionId?: string
//   error?: string
//   last4?: string
//   paymentAddress?: string
//   expiresAt?: string
//   redemptionId?: string
// }

// const PaymentMethodIcon = ({
//   method,
//   selected,
//   size = "default",
// }: {
//   method: string
//   selected: boolean
//   size?: "default" | "large"
// }) => {
//   const icons: Record<string, React.ReactNode> = {
//     card: <CreditCard className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     paypal: <PaypalLogo className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     crypto: <Bitcoin className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     applepay: <Apple className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     googlepay: <GooglePay className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     bank: <BankTransfer className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     giftcard: <Gift className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     wallet: <Wallet className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//   }

//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center rounded-full transition-all",
//         size === "large" ? "h-16 w-16 p-3" : "h-10 w-10 p-2",
//         selected
//           ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
//           : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
//       )}
//     >
//       {icons[method]}
//     </div>
//   )
// }

// // Main payment component
// const PaymentPage = () => {
//   // Replace this line:
//   // const { data: session } = useSession()
//   // With this:
//   //const { user, isSignedIn } = useUser()
//   const [user, setUser] = useState<any>(null)
//   const [isSignedIn, setIsSignedIn] = useState(false)
//   const [userProfile, setUserProfile] = useState<any>(null)
//   const { toast } = useToast()

//   // State variables
//   const [paymentMethod, setPaymentMethod] = useState<string>("card")
//   const [formStep, setFormStep] = useState<number>(0)
//   const [flipCard, setFlipCard] = useState(false)
//   const [cardName, setCardName] = useState("")
//   const [cardNumber, setCardNumber] = useState("")
//   const [expiryDate, setExpiryDate] = useState("")
//   const [cvv, setCvv] = useState("")
//   const [saveCard, setSaveCard] = useState(false)
//   const [useSpecialOffer, setUseSpecialOffer] = useState(false)
//   const [showOrderSummary, setShowOrderSummary] = useState(false)
//   const [animationComplete, setAnimationComplete] = useState(false)
//   const [cardType, setCardType] = useState<keyof typeof CARD_TYPES | null>(null)
//   const [sidebarVisible, setSidebarVisible] = useState(true)
//   const [mobileView, setMobileView] = useState(false)
//   const [paymentProcessing, setPaymentProcessing] = useState(false)
//   const [paymentComplete, setPaymentComplete] = useState(false)
//   const [paymentError, setPaymentError] = useState<string | null>(null)
//   const [clientSecret, setClientSecret] = useState<string | null>(null)
//   const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
//   const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "failed">("idle")
//   const [transactionId, setTransactionId] = useState<string | null>(null)
//   const [walletBalance, setWalletBalance] = useState<number | null>(null)
//   const [paymentRequest, setPaymentRequest] = useState<any>(null)
//   const [giftCardCode, setGiftCardCode] = useState("")
//   const [giftCardPin, setGiftCardPin] = useState("")
//   const [giftCardBalance, setGiftCardBalance] = useState<number | null>(null)
//   const [cryptoCurrency, setCryptoCurrency] = useState("bitcoin")
//   const [cryptoAddress, setCryptoAddress] = useState<string | null>(null)

//   // Refs for form elements
//   const cardNumberRef = useRef<HTMLInputElement>(null)
//   const expiryRef = useRef<HTMLInputElement>(null)
//   const cvvRef = useRef<HTMLInputElement>(null)

//   // Order items and pricing
//   const items = [
//     { name: "Premium Plan (Annual)", price: 199.99, saving: "20%" },
//     { name: "Setup Fee", price: 0, waived: true },
//     { name: "Priority Support", price: 49.99 },
//   ]

//   const subtotal = items.reduce((acc, item) => acc + item.price, 0)
//   const discount = useSpecialOffer ? 25 : 0
//   const tax = (subtotal - discount) * 0.08
//   const total = subtotal - discount + tax

//   // Create payment intent when component loads or discount changes
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       createPaymentIntent()
//     }
//   }, [useSpecialOffer])

//   // Create payment intent
//   const createPaymentIntent = async () => {
//     try {
//       setPaymentError(null)

//       const response = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: Math.round(total * 100), // Convert to cents for Stripe
//           currency: "usd",
//           payment_method_types: ["card"],
//           metadata: {
//             order_items: JSON.stringify(items),
//             discount_applied: useSpecialOffer,
//             // Replace all instances of session?.user?.id with user?.id
//             userId: user?.id || "guest",
//           },
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create payment intent")
//       }

//       const data = await response.json()
//       setClientSecret(data.clientSecret)
//       setPaymentIntent(data.id)
//     } catch (error) {
//       console.error("Error creating payment intent:", error)
//       setPaymentError("Failed to initialize payment. Please try again.")

//       toast({
//         title: "Payment Error",
//         description: "Failed to initialize payment. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   // Handle form submission
//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault()

//     if (formStep === 1 && paymentMethod === "card") {
//       // Move to review step
//       continueTo(2)
//     } else if (formStep === 2) {
//       // Process the payment
//       await processPayment()
//     }
//   }

//   // Then update the processPayment function to use this type
//   const processPayment = async () => {
//     setPaymentProcessing(true)
//     setPaymentStatus("processing")
//     setPaymentError(null)

//     try {
//       let paymentResult: PaymentResult

//       switch (paymentMethod) {
//         case "card":
//           paymentResult = await processCardPayment()
//           break
//         case "paypal":
//           paymentResult = await processPayPalPayment()
//           break
//         case "crypto":
//           paymentResult = await processCryptoPayment()
//           break
//         case "applepay":
//           paymentResult = await processApplePayPayment()
//           break
//         case "googlepay":
//           paymentResult = await processGooglePayPayment()
//           break
//         case "bank":
//           paymentResult = await processBankTransferPayment()
//           break
//         case "giftcard":
//           paymentResult = await processGiftCardPayment()
//           break
//         case "wallet":
//           paymentResult = await processWalletPayment()
//           break
//         default:
//           throw new Error("Invalid payment method")
//       }

//       if (paymentResult.success) {
//         setTransactionId(paymentResult.transactionId || null)
//         setPaymentStatus("succeeded")
//         setPaymentComplete(true)
//         setFormStep(2)

//         // If we have a session ID (from Stripe), update the user's subscription
//         if (paymentResult.sessionId) {
//           try {
//             const subscriptionResult = await onSubscribe(paymentResult.sessionId)
//             if (subscriptionResult.status === 200) {
//               console.log("Subscription updated successfully")
//             } else {
//               console.warn("Subscription update failed:", subscriptionResult)
//             }
//           } catch (error) {
//             console.error("Error updating subscription:", error)
//           }
//         }

//         toast({
//           title: "Payment Successful",
//           description: "Your payment has been processed successfully.",
//           variant: "default",
//           className:
//             "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
//         })
//       } else {
//         throw new Error(paymentResult.error || "Payment failed")
//       }
//     } catch (error) {
//       console.error("Payment processing error:", error)
//       setPaymentStatus("failed")
//       const errorMessage = error instanceof Error ? error.message : "Payment processing failed. Please try again."
//       setPaymentError(errorMessage)

//       toast({
//         title: "Payment Failed",
//         description: errorMessage,
//         variant: "destructive",
//       })
//     } finally {
//       setPaymentProcessing(false)
//     }
//   }

//   // Update the return type of processCardPayment
//   const processCardPayment = async (): Promise<PaymentResult> => {
//     // This will be implemented in the CardPaymentForm component
//     return { success: true, transactionId: "card-" + Date.now() }
//   }

//   // Update the return type of processPayPalPayment
//   const processPayPalPayment = async (): Promise<PaymentResult> => {
//     // Redirect to PayPal for payment
//     window.location.href = `/api/paypal/create-order?amount=${total}&currency=USD`
//     return { success: true }
//   }

//   // Update the remaining payment processing functions to use the PaymentResult type

//   // Process cryptocurrency payment
//   const processCryptoPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/crypto/create-charge", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: total,
//           currency: "USD",
//           name: "Premium Plan Purchase",
//           customerId: user?.id || "guest",
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create crypto payment")
//       }

//       const data = await response.json()

//       setCryptoAddress(data.addresses[cryptoCurrency])

//       return {
//         success: true,
//         transactionId: data.id,
//         paymentAddress: data.addresses[cryptoCurrency],
//         expiresAt: data.expires_at,
//       }
//     } catch (error) {
//       console.error("Crypto payment error:", error)
//       return { success: false, error: "Failed to process cryptocurrency payment" }
//     }
//   }

//   // Process Apple Pay payment
//   const processApplePayPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/apple-pay/session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: Math.round(total * 100),
//           currency: "usd",
//           items,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create Apple Pay session")
//       }

//       const data = await response.json()

//       // In a real implementation, you would use the Apple Pay JS API
//       // with the session data returned from the server

//       return { success: true, transactionId: `AP-${Date.now()}` }
//     } catch (error) {
//       console.error("Apple Pay error:", error)
//       return { success: false, error: "Failed to process Apple Pay payment" }
//     }
//   }

//   // Process Google Pay payment
//   const processGooglePayPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/google-pay/session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: Math.round(total * 100),
//           currency: "usd",
//           items,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create Google Pay session")
//       }

//       const data = await response.json()

//       // In a real implementation, you would use the Google Pay API
//       // with the session data returned from the server

//       return { success: true, transactionId: `GP-${Date.now()}` }
//     } catch (error) {
//       console.error("Google Pay error:", error)
//       return { success: false, error: "Failed to process Google Pay payment" }
//     }
//   }

//   // Process bank transfer payment
//   const processBankTransferPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/bank-transfer/initiate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: total,
//           currency: "USD",
//           description: "Premium Plan Purchase",
//           userId: user?.id || "guest",
//           email: user?.emailAddresses?.[0]?.emailAddress || userProfile?.email || "",
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to initiate bank transfer")
//       }

//       const data = await response.json()
//       return { success: true, transactionId: data.reference }
//     } catch (error) {
//       console.error("Bank transfer error:", error)
//       return { success: false, error: "Failed to initiate bank transfer" }
//     }
//   }

//   // Process gift card payment
//   const processGiftCardPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/gift-card/redeem", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code: giftCardCode,
//           amount: total,
//           userId: user?.id || "guest",
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to redeem gift card")
//       }

//       const data = await response.json()
//       return { success: true, transactionId: data.redemptionId }
//     } catch (error) {
//       console.error("Gift card error:", error)
//       return { success: false, error: error instanceof Error ? error.message : "Failed to process gift card payment" }
//     }
//   }

//   // Process wallet payment
//   const processWalletPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/wallet/charge", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Clerk-User-Id": user?.id || "",
//         },
//         body: JSON.stringify({
//           amount: total,
//           currency: "USD",
//           description: "Premium Plan Purchase",
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to process wallet payment")
//       }

//       const data = await response.json()
//       setWalletBalance(data.new_balance)
//       return { success: true, transactionId: data.transactionId }
//     } catch (error) {
//       console.error("Wallet payment error:", error)
//       return { success: false, error: error instanceof Error ? error.message : "Failed to process wallet payment" }
//     }
//   }

//   // Check gift card balance
//   const checkGiftCardBalance = async () => {
//     try {
//       const response = await fetch(`/api/gift-card/redeem?code=${giftCardCode}`)

//       if (!response.ok) {
//         throw new Error("Invalid gift card")
//       }

//       const data = await response.json()

//       if (!data.is_valid) {
//         throw new Error(`Gift card is ${data.status}`)
//       }

//       setGiftCardBalance(data.balance)

//       toast({
//         title: "Gift Card Valid",
//         description: `Available balance: $${data.balance.toFixed(2)}`,
//         variant: "default",
//         className:
//           "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
//       })

//       return data.balance
//     } catch (error) {
//       console.error("Gift card error:", error)

//       toast({
//         title: "Gift Card Error",
//         description: error instanceof Error ? error.message : "Invalid gift card",
//         variant: "destructive",
//       })

//       return null
//     }
//   }

//   // Get wallet balance
//   const getWalletBalance = async () => {
//     try {
//       const response = await fetch("/api/wallet/charge", {
//         headers: {
//           "X-Clerk-User-Id": user?.id || "",
//         },
//       })

//       if (!response.ok) {
//         throw new Error("Failed to get wallet balance")
//       }

//       const data = await response.json()
//       setWalletBalance(data.balance)
//       return data.balance
//     } catch (error) {
//       console.error("Wallet error:", error)
//       return null
//     }
//   }

//   // Format credit card number with spaces
//   const formatCardNumber = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     const matches = v.match(/\d{4,16}/g)
//     const match = (matches && matches[0]) || ""
//     const parts = []

//     for (let i = 0; i < match.length; i += 4) {
//       parts.push(match.substring(i, i + 4))
//     }

//     if (parts.length) {
//       return parts.join(" ")
//     } else {
//       return value
//     }
//   }

//   // Format expiry date
//   const formatExpiryDate = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     if (v.length > 2) {
//       return `${v.substring(0, 2)}/${v.substring(2, 4)}`
//     }
//     return value
//   }

//   // Handle card number input
//   const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = formatCardNumber(e.target.value)
//     setCardNumber(formattedValue)

//     // Detect card type
//     const cardNumberWithoutSpaces = formattedValue.replace(/\s/g, "")
//     for (const [type, { pattern }] of Object.entries(CARD_TYPES)) {
//       if (pattern.test(cardNumberWithoutSpaces)) {
//         setCardType(type as keyof typeof CARD_TYPES)
//         break
//       } else {
//         setCardType(null)
//       }
//     }

//     // Auto-advance to expiry when full card number entered
//     if (cardNumberWithoutSpaces.length === 16 && expiryRef.current) {
//       expiryRef.current.focus()
//     }
//   }

//   // Handle expiry date input
//   const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = formatExpiryDate(e.target.value)
//     setExpiryDate(formattedValue)

//     // Auto-advance to CVV when full expiry entered
//     if (formattedValue.length === 5 && cvvRef.current) {
//       cvvRef.current.focus()
//       setFlipCard(true)
//     }
//   }

//   // Handle CVV input
//   const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "")
//     if (value.length <= 4) {
//       setCvv(value)
//     }
//   }

//   const handleCvvFocus = () => {
//     setFlipCard(true)
//   }

//   const handleCvvBlur = () => {
//     setFlipCard(false)
//   }

//   // Check form validity based on payment method
//   const isFormValid = () => {
//     switch (paymentMethod) {
//       case "card":
//         return (
//           cardName.length > 0 &&
//           cardNumber.replace(/\s/g, "").length >= 15 &&
//           expiryDate.length === 5 &&
//           cvv.length >= 3
//         )
//       case "paypal":
//         return true
//       case "crypto":
//         return true
//       case "applepay":
//         return true
//       case "googlepay":
//         return true
//       case "bank":
//         return true
//       case "giftcard":
//         return giftCardCode.length > 0 && giftCardBalance !== null && giftCardBalance >= total
//       case "wallet":
//         return walletBalance !== null && walletBalance >= total
//       default:
//         return false
//     }
//   }

//   // Handle window resize for responsive layout
//   useEffect(() => {
//     const handleResize = () => {
//       setMobileView(window.innerWidth < 768)
//       setSidebarVisible(window.innerWidth >= 1024)
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   // Load wallet balance when wallet payment method is selected
//   useEffect(() => {
//     if (paymentMethod === "wallet" && isSignedIn && user) {
//       getWalletBalance()
//     }
//   }, [paymentMethod, isSignedIn, user])

//   // Stripe Card Payment Form component
//   const CardPaymentForm = () => {
//     const stripe = useStripe()
//     const elements = useElements()
//     const [cardError, setCardError] = useState<string | null>(null)
//     const [cardComplete, setCardComplete] = useState(false)

//     useEffect(() => {
//       if (!stripe || !elements) {
//         return
//       }

//       // Create a payment request for Apple Pay / Google Pay
//       const pr = stripe.paymentRequest({
//         country: "US",
//         currency: "usd",
//         total: {
//           label: "Premium Plan",
//           amount: Math.round(total * 100),
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       })

//       // Check if the Payment Request is available
//       pr.canMakePayment().then((result) => {
//         if (result) {
//           setPaymentRequest(pr)
//         }
//       })
//     }, [stripe, elements])

//     const handleCardChange = (event: any) => {
//       setCardError(event.error ? event.error.message : null)
//       setCardComplete(event.complete)

//       // Try to determine card type from the brand
//       if (event.brand) {
//         const brand = event.brand.toLowerCase()
//         if (Object.keys(CARD_TYPES).includes(brand)) {
//           setCardType(brand as keyof typeof CARD_TYPES)
//         }
//       }
//     }

//     // Update the CardPaymentForm component's handleCardPayment function
//     const handleCardPayment = async (): Promise<PaymentResult> => {
//       if (!stripe || !elements || !clientSecret) {
//         return { success: false, error: "Payment system not initialized" }
//       }

//       const cardElement = elements.getElement(CardElement)

//       if (!cardElement) {
//         return { success: false, error: "Card element not found" }
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: {
//             name: cardName,
//             email: user?.emailAddresses?.[0]?.emailAddress || userProfile?.email || undefined,
//           },
//         },
//         save_payment_method: saveCard,
//       })

//       if (error) {
//         return { success: false, error: error.message }
//       }

//       if (paymentIntent?.status === "succeeded") {
//         // Use type assertion to access payment_method_details
//         const paymentIntentWithDetails = paymentIntent as any
//         const last4 = paymentIntentWithDetails.payment_method_details?.card?.last4

//         return {
//           success: true,
//           transactionId: paymentIntent.id,
//           sessionId: paymentIntent.id, // Include the session ID for subscription update
//           last4: last4,
//         }
//       }

//       return { success: false, error: "Payment failed" }
//     }

//     // Add this useEffect to fetch user data when the component loads
//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
//           const currentUser = await onCurrentUser()
//           if (currentUser) {
//             setUser(currentUser)
//             setIsSignedIn(true)

//             const { status, data } = await onUserInfo()
//             if (status === 200) {
//               setUserProfile(data)
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching user:", error)
//         }
//       }

//       fetchUser()
//     }, [])

//     return (
//       <div className="space-y-6">
//         <div className="relative perspective-1000">
//           <motion.div
//             className="relative w-full h-56 transition-all duration-500 preserve-3d"
//             animate={{ rotateY: flipCard ? 180 : 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Front of card - keep the same beautiful design */}
//             <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 p-5 flex flex-col justify-between">
//                 <div className="flex justify-between items-start">
//                   <div className="flex flex-col">
//                     <div className="text-white/70 text-xs uppercase tracking-wider">Credit Card</div>
//                     <div className="text-white/90 text-xs mt-1">
//                       {cardType ? <span className="uppercase">{cardType}</span> : <span>Visa / Mastercard / Amex</span>}
//                     </div>
//                   </div>
//                   {cardType && (
//                     <div className="h-10 w-14 bg-white/20 rounded-md grid place-items-center p-1">
//                       <img
//                         src={CARD_TYPES[cardType].icon || "/placeholder.svg"}
//                         alt={cardType}
//                         className="max-h-full"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="my-6">
//                   <div className="text-xl text-white font-mono tracking-wider">•••• •••• •••• ••••</div>
//                 </div>

//                 <div className="flex justify-between items-end">
//                   <div>
//                     <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Card Holder</div>
//                     <div className="text-white font-medium truncate max-w-[180px]">{cardName || "YOUR NAME"}</div>
//                   </div>
//                   <div>
//                     <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Expires</div>
//                     <div className="text-white font-medium">MM/YY</div>
//                   </div>
//                 </div>

//                 {/* Circuit design elements */}
//                 <div className="absolute top-[40%] left-0 w-12 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
//                 <div className="absolute top-[30%] right-5 w-8 h-8 border-r-2 border-b-2 border-white/10 rounded-br-lg"></div>
//                 <div className="absolute bottom-6 left-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
//                 <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full"></div>
//                 <div className="absolute top-5 left-[30%] w-3 h-3 bg-white/20 rounded-full"></div>
//                 <div className="absolute bottom-10 right-[20%] w-6 h-1 bg-white/20 rounded"></div>
//               </div>
//             </div>

//             {/* Back of card - keep the same beautiful design */}
//             <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden rotateY-180">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-violet-600 p-5 flex flex-col">
//                 <div className="w-full h-12 bg-black/30 mt-4"></div>

//                 <div className="mt-6 flex justify-end">
//                   <div className="bg-white/90 h-10 w-full max-w-[80%] rounded relative flex items-center px-3">
//                     <div className="absolute text-right w-full pr-12 font-mono text-gray-600 tracking-widest">•••</div>
//                   </div>
//                 </div>

//                 <div className="mt-auto text-xs text-white/70 max-w-[80%]">
//                   This card is property of your bank. Unauthorized use is prohibited. If found, please return to your
//                   bank.
//                 </div>

//                 {/* Circuit design elements */}
//                 <div className="absolute top-[40%] right-0 w-12 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
//                 <div className="absolute bottom-10 left-5 w-8 h-8 border-l-2 border-b-2 border-white/10 rounded-bl-lg"></div>
//                 <div className="absolute bottom-6 right-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         <div className="space-y-4">
//           {/* Apple Pay / Google Pay button if available */}
//           {paymentRequest && (
//             <div className="mb-6">
//               <h3 className="text-base font-medium mb-3">Express Checkout</h3>
//               <PaymentRequestButtonElement
//                 options={{
//                   paymentRequest,
//                   style: {
//                     paymentRequestButton: {
//                       theme: "dark",
//                       height: "44px",
//                     },
//                   },
//                 }}
//               />
//               <Separator className="my-6" />
//               <h3 className="text-base font-medium mb-3">Or Pay with Card</h3>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="cardName">Cardholder Name</Label>
//               <Input
//                 id="cardName"
//                 placeholder="Name on card"
//                 value={cardName}
//                 onChange={(e) => setCardName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="cardNumber">Card Details</Label>
//               <div className="card-element p-3 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//                 <CardElement
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "16px",
//                         color: "#424770",
//                         "::placeholder": {
//                           color: "#aab7c4",
//                         },
//                       },
//                       invalid: {
//                         color: "#9e2146",
//                       },
//                     },
//                   }}
//                   onChange={handleCardChange}
//                 />
//               </div>
//               {cardError && <div className="text-sm text-red-500 mt-1">{cardError}</div>}
//             </div>

//             <div className="flex items-center space-x-2 mt-2">
//               <Checkbox id="saveCard" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
//               <label
//                 htmlFor="saveCard"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Save card for future payments
//               </label>
//             </div>
//           </div>

//           <div className="mt-2 text-sm text-muted-foreground flex items-center">
//             <Lock className="h-4 w-4 mr-1" />
//             <span>Your payment information is encrypted and secure.</span>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Particles for the success animation
//   const Particles = ({ count = 50 }: { count?: number }) => {
//     return (
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {Array.from({ length: count }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 rounded-full bg-primary"
//             initial={{
//               scale: 0,
//               x: "50%",
//               y: "50%",
//               opacity: 1,
//             }}
//             animate={{
//               scale: Math.random() * 1 + 0.5,
//               x: `${Math.random() * 100}%`,
//               y: `${Math.random() * 100}%`,
//               opacity: 0,
//             }}
//             transition={{
//               duration: Math.random() * 1 + 0.5,
//               delay: Math.random() * 0.2,
//             }}
//             onAnimationComplete={() => {
//               if (i === count - 1) setAnimationComplete(true)
//             }}
//             style={{
//               backgroundColor: `hsl(${Math.random() * 60 + 230}, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 50}%)`,
//             }}
//           />
//         ))}
//       </div>
//     )
//   }

//   // Render payment method form based on selected method
//   const renderPaymentMethodForm = () => {
//     switch (paymentMethod) {
//       case "card":
//         return <CardPaymentForm />

//       case "paypal":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-10">
//               <div className="bg-[#003087] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <PaypalLogo className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with PayPal</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 You'll be redirected to PayPal to complete your payment securely. You'll have a chance to review your
//                 order before the payment is finalized.
//               </p>
//             </div>

//             <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
//                 <span>
//                   PayPal protects your payment information with industry-leading security and fraud prevention systems.
//                   You're always protected if the item doesn't arrive or is significantly different than described.
//                 </span>
//               </div>
//             </div>

//             <Button
//               type="button"
//               className="w-full bg-[#0070ba] hover:bg-[#003087] text-white"
//               onClick={() => processPayPalPayment()}
//             >
//               <PaypalLogo className="h-5 w-5 mr-2" />
//               Proceed to PayPal
//             </Button>
//           </div>
//         )

//       case "crypto":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-[#F7931A] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Bitcoin className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Cryptocurrency</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Pay with your favorite cryptocurrency. We accept Bitcoin, Ethereum, and many other digital currencies.
//               </p>
//             </div>

//             <div className="border rounded-lg p-5 bg-amber-50 dark:bg-amber-950/30">
//               <Tabs defaultValue="bitcoin" className="w-full" onValueChange={(value) => setCryptoCurrency(value)}>
//                 <TabsList className="grid grid-cols-3 mb-4">
//                   <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
//                   <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
//                   <TabsTrigger value="other">Others</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="bitcoin" className="space-y-4">
//                   <div className="flex flex-col items-center">
//                     {cryptoAddress ? (
//                       <>
//                         <div className="bg-white p-2 rounded-lg mb-3">
//                           <img
//                             src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${cryptoAddress}&choe=UTF-8`}
//                             alt="Bitcoin QR Code"
//                             className="h-40 w-40"
//                           />
//                         </div>
//                         <div className="text-sm text-center">
//                           <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
//                             {cryptoAddress}
//                           </p>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="mt-1"
//                             onClick={() => {
//                               navigator.clipboard.writeText(cryptoAddress || "")
//                               toast({
//                                 title: "Address Copied",
//                                 description: "Bitcoin address copied to clipboard",
//                                 variant: "default",
//                               })
//                             }}
//                           >
//                             <Copy className="h-4 w-4 mr-2" />
//                             Copy Address
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <Button
//                         className="w-full bg-[#F7931A] hover:bg-[#E77F18] text-white"
//                         onClick={() => processCryptoPayment()}
//                       >
//                         <Bitcoin className="h-5 w-5 mr-2" />
//                         Generate Bitcoin Address
//                       </Button>
//                     )}
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-4">
//                     <p className="flex items-start">
//                       <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
//                       Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
//                       worth of Bitcoin to this address. Current exchange rate: 1 BTC ≈ $59,783.21 USD
//                     </p>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="ethereum" className="space-y-4">
//                   <div className="flex flex-col items-center">
//                     {cryptoAddress ? (
//                       <>
//                         <div className="bg-white p-2 rounded-lg mb-3">
//                           <img
//                             src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${cryptoAddress}&choe=UTF-8`}
//                             alt="Ethereum QR Code"
//                             className="h-40 w-40"
//                           />
//                         </div>
//                         <div className="text-sm text-center">
//                           <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
//                             {cryptoAddress}
//                           </p>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="mt-1"
//                             onClick={() => {
//                               navigator.clipboard.writeText(cryptoAddress || "")
//                               toast({
//                                 title: "Address Copied",
//                                 description: "Ethereum address copied to clipboard",
//                                 variant: "default",
//                               })
//                             }}
//                           >
//                             <Copy className="h-4 w-4 mr-2" />
//                             Copy Address
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <Button
//                         className="w-full bg-[#627EEA] hover:bg-[#4C63BB] text-white"
//                         onClick={() => processCryptoPayment()}
//                       >
//                         <Bitcoin className="h-5 w-5 mr-2" />
//                         Generate Ethereum Address
//                       </Button>
//                     )}
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-4">
//                     <p className="flex items-start">
//                       <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
//                       Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
//                       worth of Ethereum to this address. Current exchange rate: 1 ETH ≈ $3,124.45 USD
//                     </p>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="other" className="py-3">
//                   <Select onValueChange={(value) => setCryptoCurrency(value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select cryptocurrency" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="solana">Solana (SOL)</SelectItem>
//                       <SelectItem value="cardano">Cardano (ADA)</SelectItem>
//                       <SelectItem value="ripple">Ripple (XRP)</SelectItem>
//                       <SelectItem value="polkadot">Polkadot (DOT)</SelectItem>
//                       <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <p className="text-sm text-muted-foreground mt-4">
//                     Select your preferred cryptocurrency to view payment instructions.
//                   </p>

//                   {cryptoCurrency && cryptoCurrency !== "bitcoin" && cryptoCurrency !== "ethereum" && (
//                     <Button
//                       className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
//                       onClick={() => processCryptoPayment()}
//                     >
//                       <Bitcoin className="h-5 w-5 mr-2" />
//                       Generate {cryptoCurrency.charAt(0).toUpperCase() + cryptoCurrency.slice(1)} Address
//                     </Button>
//                   )}
//                 </TabsContent>
//               </Tabs>
//             </div>

//             <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
//                 <span>
//                   Please ensure you're sending the exact amount required. Cryptocurrency transactions cannot be
//                   reversed. Payment will be confirmed after 1-3 network confirmations.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "applepay":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-8">
//               <div className="bg-black text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Apple className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Apple Pay</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Simple, secure payment with Face ID or Touch ID.
//               </p>
//             </div>

//             <div className="flex justify-center py-6">
//               <Button
//                 className="bg-black hover:bg-black/90 text-white rounded-full h-12 px-6"
//                 onClick={() => processApplePayPayment()}
//               >
//                 <Apple className="h-5 w-5 mr-2" />
//                 <span className="font-medium">Pay with Apple Pay</span>
//               </Button>
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Apple Pay uses device-specific numbers and unique transaction codes, so your card number is never
//                   stored on your device or shared with merchants.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "googlepay":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-8">
//               <div className="bg-white border shadow-sm w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <GooglePay className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Google Pay</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Fast, simple checkout with Google Pay.</p>
//             </div>

//             <div className="flex justify-center py-6">
//               <Button
//                 className="bg-white text-black hover:bg-gray-100 border shadow-sm h-12 px-6"
//                 onClick={() => processGooglePayPayment()}
//               >
//                 <GooglePay className="h-5 w-5 mr-2" />
//                 <span className="font-medium">Pay with Google Pay</span>
//               </Button>
//             </div>

//             <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
//                 <span>
//                   Google Pay encrypts your payment info with multiple layers of security using industry-standard methods
//                   like tokenization.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "bank":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-emerald-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Landmark className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Bank Transfer</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Transfer directly from your bank account.</p>
//             </div>

//             <div className="border rounded-lg p-5 bg-emerald-50 dark:bg-emerald-950/30 space-y-4">
//               <p className="font-medium">Payment details</p>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Account name:</span>
//                   <span className="font-medium">{process.env.BANK_ACCOUNT_NAME || "ACME Corporation"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Account number:</span>
//                   <span className="font-mono font-medium">{process.env.BANK_ACCOUNT_NUMBER || "12345678"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Routing number:</span>
//                   <span className="font-mono font-medium">{process.env.BANK_ROUTING_NUMBER || "987654321"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">SWIFT/BIC:</span>
//                   <span className="font-mono font-medium">{process.env.BANK_SWIFT_CODE || "ABCDUS33"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Reference:</span>
//                   <span className="font-mono font-medium">INV-{Date.now().toString().slice(-8)}</span>
//                 </div>
//               </div>

//               <div className="pt-2">
//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={() => {
//                     const details = `
//                       Account name: ${process.env.BANK_ACCOUNT_NAME || "ACME Corporation"}
//                       Account number: ${process.env.BANK_ACCOUNT_NUMBER || "12345678"}
//                       Routing number: ${process.env.BANK_ROUTING_NUMBER || "987654321"}
//                       SWIFT/BIC: ${process.env.BANK_SWIFT_CODE || "ABCDUS33"}
//                       Reference: INV-${Date.now().toString().slice(-8)}
//                     `
//                     navigator.clipboard.writeText(details)
//                     toast({
//                       title: "Details Copied",
//                       description: "Bank details copied to clipboard",
//                       variant: "default",
//                     })
//                   }}
//                 >
//                   <Copy className="h-4 w-4 mr-2" />
//                   Copy Details
//                 </Button>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
//                 <span>
//                   Please include the reference number in your transfer. Processing may take 1-3 business days. Your
//                   order will be confirmed once payment is received.
//                 </span>
//               </div>
//             </div>

//             <Button
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
//               onClick={() => processBankTransferPayment()}
//             >
//               <Landmark className="h-5 w-5 mr-2" />
//               Generate Transfer Instructions
//             </Button>
//           </div>
//         )

//       case "giftcard":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-rose-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Gift className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Gift Card</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Redeem a gift card or promotional code.</p>
//             </div>

//             <div className="border rounded-lg p-5 space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="giftcard">Gift Card Number</Label>
//                 <Input
//                   id="giftcard"
//                   placeholder="XXXX-XXXX-XXXX-XXXX"
//                   value={giftCardCode}
//                   onChange={(e) => setGiftCardCode(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="pin">PIN (if applicable)</Label>
//                 <Input
//                   id="pin"
//                   placeholder="1234"
//                   maxLength={4}
//                   value={giftCardPin}
//                   onChange={(e) => setGiftCardPin(e.target.value)}
//                 />
//               </div>

//               <Button className="w-full mt-2" onClick={() => checkGiftCardBalance()} disabled={!giftCardCode}>
//                 Check Balance
//               </Button>

//               {giftCardBalance !== null && (
//                 <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Available Balance:</span>
//                     <span className="font-bold">${giftCardBalance.toFixed(2)}</span>
//                   </div>

//                   {giftCardBalance < total && (
//                     <div className="mt-2 text-xs text-red-600 dark:text-red-400">
//                       Insufficient balance for this purchase. You need ${(total - giftCardBalance).toFixed(2)} more.
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Gift cards cannot be replaced if lost or stolen. Gift card balance will be applied to your purchase,
//                   and any remaining amount can be paid with another payment method.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "wallet":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-violet-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Wallet className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Digital Wallet</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Use your stored balance to complete this payment.
//               </p>
//             </div>

//             <div className="border rounded-lg p-5 bg-violet-50 dark:bg-violet-950/30 space-y-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Current Balance</p>
//                   <p className="text-2xl font-bold">${walletBalance?.toFixed(2) || "0.00"}</p>
//                 </div>
//                 <Button variant="outline" size="sm" onClick={() => getWalletBalance()}>
//                   <RefreshCcw className="h-4 w-4 mr-1" />
//                   Refresh
//                 </Button>
//               </div>

//               <Separator />

//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Order Total</p>
//                   <p className="text-xl font-semibold">${total.toFixed(2)}</p>
//                 </div>
//                 {walletBalance !== null && (
//                   <Badge
//                     variant="outline"
//                     className={cn(
//                       walletBalance >= total
//                         ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
//                         : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
//                     )}
//                   >
//                     {walletBalance >= total ? "Sufficient Funds" : "Insufficient Funds"}
//                   </Badge>
//                 )}
//               </div>

//               <div className="pt-2">
//                 <Button
//                   className="w-full bg-violet-600 hover:bg-violet-700"
//                   disabled={!walletBalance || walletBalance < total}
//                   onClick={() => processWalletPayment()}
//                 >
//                   Pay from Wallet
//                 </Button>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Your digital wallet is protected with our secure encryption technologies. All transactions are instant
//                   and fee-free.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   // Payment methods array
//   const paymentMethods: PaymentMethod[] = [
//     {
//       id: "card",
//       name: "Credit Card",
//       icon: <CreditCard />,
//       description: "Pay with Visa, Mastercard, American Express, and more.",
//       popular: true,
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-violet-600 to-indigo-600",
//     },
//     {
//       id: "paypal",
//       name: "PayPal",
//       icon: <PaypalLogo />,
//       description: "Pay with your PayPal account.",
//       popular: true,
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-blue-500 to-blue-600",
//     },
//     {
//       id: "crypto",
//       name: "Crypto",
//       icon: <Bitcoin />,
//       description: "Pay with Bitcoin, Ethereum, and other cryptocurrencies.",
//       processingTime: "1-3 Confirmations",
//       fees: "Network fees apply",
//       color: "from-amber-500 to-amber-600",
//     },
//     {
//       id: "applepay",
//       name: "Apple Pay",
//       icon: <Apple />,
//       description: "Pay quickly and securely with Apple Pay.",
//       popular: true,
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-gray-800 to-gray-900",
//     },
//     {
//       id: "googlepay",
//       name: "Google Pay",
//       icon: <GooglePay />,
//       description: "Fast, simple checkout with Google Pay.",
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-blue-400 to-blue-500",
//     },
//     {
//       id: "bank",
//       name: "Bank Transfer",
//       icon: <BankTransfer />,
//       description: "Transfer directly from your bank account.",
//       processingTime: "1-3 Business Days",
//       fees: "None",
//       color: "from-emerald-500 to-emerald-600",
//     },
//     {
//       id: "giftcard",
//       name: "Gift Card",
//       icon: <Gift />,
//       description: "Redeem a gift card or promotional code.",
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-rose-500 to-rose-600",
//     },
//     {
//       id: "wallet",
//       name: "Wallet",
//       icon: <Wallet />,
//       description: "Pay using your digital wallet balance.",
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-violet-500 to-violet-600",
//     },
//   ]

//   // Function to move to the next form step
//   const continueTo = (step: number) => {
//     setFormStep(step)
//   }

//   // Wrap the entire payment page in Stripe Elements provider
//   return (
//     <Elements stripe={stripePromise}>
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
//         {/* Header */}
//         <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800 sticky top-0 z-10">
//           <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//             <div className="flex items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 grid place-items-center text-white mr-2">
//                   <Sparkles className="h-4 w-4" />
//                 </div>
//                 <span className="font-bold text-lg">PayFlow</span>
//               </div>
//               <div className="hidden md:flex ml-8">
//                 <Badge variant="outline" className="font-normal">
//                   <Lock className="h-3 w-3 mr-1" />
//                   Secure Checkout
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <div className="mr-4 text-sm">
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <div className="flex items-center cursor-help">
//                         <Shield className="h-4 w-4 mr-1 text-green-600 dark:text-green-500" />
//                         <span className="hidden sm:inline">256-bit SSL Encrypted</span>
//                       </div>
//                     </TooltipTrigger>
//                     <TooltipContent className="max-w-sm">
//                       <p>This checkout is secured with industry-standard encryption to keep your information safe.</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </div>

//               <div>
//                 <Button variant="ghost" size="sm" className="hidden md:flex">
//                   <ThumbsUp className="h-4 w-4 mr-1" />
//                   Need Help?
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="space-y-1">
//               <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
//               <p className="text-muted-foreground">
//                 Select your preferred payment method and complete the details below.
//               </p>
//             </div>

//             {/* Form Steps */}
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Progress indicator */}
//               <div className="flex items-center justify-between relative">
//                 <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-800"></div>
//                 {["Payment Method", "Details", "Confirmation"].map((step, index) => (
//                   <div key={index} className="relative z-10 flex flex-col items-center">
//                     <div
//                       className={cn(
//                         "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mb-1",
//                         formStep > index
//                           ? "bg-green-600 text-white"
//                           : formStep === index
//                             ? "bg-primary text-white"
//                             : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
//                       )}
//                     >
//                       {formStep > index ? <Check className="h-4 w-4" /> : index + 1}
//                     </div>
//                     <span
//                       className={cn(
//                         "text-xs",
//                         formStep === index ? "font-medium text-primary" : "text-muted-foreground",
//                       )}
//                     >
//                       {step}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Step 1: Payment Method Selection */}
//               <AnimatePresence mode="wait">
//                 {formStep === 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     {/* Payment method selection */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       {paymentMethods.slice(0, 4).map((method) => (
//                         <div
//                           key={method.id}
//                           className={cn(
//                             "relative rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
//                             paymentMethod === method.id
//                               ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
//                               : "border-gray-200 dark:border-gray-800",
//                           )}
//                           onClick={() => setPaymentMethod(method.id)}
//                         >
//                           {method.popular && (
//                             <div className="absolute top-0 right-0">
//                               <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none bg-gradient-to-r from-violet-600 to-indigo-600 border-0 text-[10px] font-medium">
//                                 POPULAR
//                               </Badge>
//                             </div>
//                           )}
//                           <div
//                             className={cn(
//                               "flex flex-col items-center p-4 h-full",
//                               paymentMethod === method.id && "bg-primary/5",
//                             )}
//                           >
//                             <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
//                             <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div>
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-sm font-medium text-muted-foreground">More Payment Options</h3>
//                         <Separator className="flex-1 mx-4" />
//                       </div>

//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {paymentMethods.slice(4).map((method) => (
//                           <div
//                             key={method.id}
//                             className={cn(
//                               "rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
//                               paymentMethod === method.id
//                                 ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
//                                 : "border-gray-200 dark:border-gray-800",
//                             )}
//                             onClick={() => setPaymentMethod(method.id)}
//                           >
//                             <div
//                               className={cn(
//                                 "flex flex-col items-center p-4",
//                                 paymentMethod === method.id && "bg-primary/5",
//                               )}
//                             >
//                               <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
//                               <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border p-4 mt-6">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           {paymentMethod && <PaymentMethodIcon method={paymentMethod} selected={true} size="large" />}
//                           <div className="ml-4">
//                             <h3 className="font-medium">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.name || "Select a payment method"}
//                             </h3>
//                             <p className="text-sm text-muted-foreground">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.description}
//                             </p>
//                           </div>
//                         </div>
//                         <Button
//                           type="button"
//                           onClick={() => continueTo(1)}
//                           disabled={!paymentMethod}
//                           className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                         >
//                           Continue
//                           <ChevronRight className="h-4 w-4 ml-1" />
//                         </Button>
//                       </div>
//                     </div>

//                     {/* Payment Method Comparison Table */}
//                     <Drawer>
//                       <DrawerTrigger asChild>
//                         <Button variant="outline" className="w-full">
//                           Compare Payment Methods
//                           <ChevronsUpDown className="h-4 w-4 ml-1" />
//                         </Button>
//                       </DrawerTrigger>
//                       <DrawerContent>
//                         <div className="mx-auto w-full max-w-4xl">
//                           <DrawerHeader>
//                             <DrawerTitle>Payment Method Comparison</DrawerTitle>
//                             <DrawerDescription>
//                               Compare the features and benefits of each payment method
//                             </DrawerDescription>
//                           </DrawerHeader>
//                           <div className="p-4 overflow-auto">
//                             <table className="w-full border-collapse">
//                               <thead>
//                                 <tr className="border-b">
//                                   <th className="text-left p-3">Payment Method</th>
//                                   <th className="text-left p-3">Processing Time</th>
//                                   <th className="text-left p-3">Fees</th>
//                                   <th className="text-left p-3">Security</th>
//                                   <th className="text-left p-3">Benefits</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {paymentMethods.map((method) => (
//                                   <tr key={method.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
//                                     <td className="p-3">
//                                       <div className="flex items-center">
//                                         <div
//                                           className={`p-1.5 rounded-full bg-gradient-to-r ${method.color} text-white mr-2`}
//                                         >
//                                           {method.icon}
//                                         </div>
//                                         <span className="font-medium">{method.name}</span>
//                                       </div>
//                                     </td>
//                                     <td className="p-3">{method.processingTime}</td>
//                                     <td className="p-3">{method.fees}</td>
//                                     <td className="p-3">
//                                       <div className="flex items-center">
//                                         <div className="flex space-x-0.5">
//                                           {Array.from({ length: 5 }).map((_, i) => (
//                                             <Star
//                                               key={i}
//                                               className={cn(
//                                                 "h-4 w-4",
//                                                 i < (method.id === "crypto" ? 4 : 5)
//                                                   ? "text-amber-500 fill-amber-500"
//                                                   : "text-gray-300 dark:text-gray-600",
//                                               )}
//                                             />
//                                           ))}
//                                         </div>
//                                       </div>
//                                     </td>
//                                     <td className="p-3">
//                                       <span>
//                                         {method.id === "card" && "Widely accepted, rewards programs"}
//                                         {method.id === "paypal" && "Buyer protection, no need to share card details"}
//                                         {method.id === "crypto" && "Privacy, no chargebacks, global payments"}
//                                         {method.id === "applepay" && "Fast checkout, biometric security"}
//                                         {method.id === "googlepay" && "Fast checkout, stored payment methods"}
//                                         {method.id === "bank" && "No card needed, good for large payments"}
//                                         {method.id === "giftcard" && "Great for gifts, budgeting control"}
//                                         {method.id === "wallet" && "No additional payment method needed"}
//                                       </span>
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                           <DrawerFooter>
//                             <DrawerClose asChild>
//                               <Button variant="outline">Close</Button>
//                             </DrawerClose>
//                           </DrawerFooter>
//                         </div>
//                       </DrawerContent>
//                     </Drawer>
//                   </motion.div>
//                 )}

//                 {/* Step 2: Payment Details */}
//                 {formStep === 1 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     <div className="flex items-center justify-between">
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         onClick={() => setFormStep(0)}
//                         className="text-muted-foreground"
//                       >
//                         <ChevronLeft className="h-4 w-4 mr-1" />
//                         Back to Payment Methods
//                       </Button>
//                       <div className="flex items-center">
//                         <PaymentMethodIcon method={paymentMethod} selected={true} />
//                         <span className="ml-2 font-medium">
//                           {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                         </span>
//                       </div>
//                     </div>

//                     <Card>
//                       <CardContent className="pt-6">
//                         {/* Render the appropriate payment form based on method */}
//                         {renderPaymentMethodForm()}
//                       </CardContent>
//                     </Card>

//                     {paymentError && (
//                       <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
//                         <div className="flex items-start">
//                           <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
//                           <span>{paymentError}</span>
//                         </div>
//                       </div>
//                     )}

//                     <div className="pt-4 flex items-center justify-between">
//                       <Button type="button" variant="outline" onClick={() => setFormStep(0)}>
//                         <ChevronLeft className="h-4 w-4 mr-1" />
//                         Back
//                       </Button>
//                       <Button
//                         type="submit"
//                         disabled={!isFormValid() || paymentProcessing}
//                         className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                       >
//                         {paymentProcessing ? (
//                           <>
//                             <Timer className="h-4 w-4 mr-2 animate-spin" />
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             Continue to Review
//                             <ChevronRight className="h-4 w-4 ml-1" />
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Step 3: Confirmation */}
//                 {formStep === 2 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     {paymentComplete ? (
//                       <div className="text-center py-10 relative">
//                         {!animationComplete && <Particles count={100} />}
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: "spring", duration: 0.5 }}
//                           className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto grid place-items-center mb-4"
//                         >
//                           <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
//                         </motion.div>
//                         <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
//                         <p className="text-muted-foreground max-w-md mx-auto mb-6">
//                           Your payment has been processed successfully. You'll receive a confirmation email shortly.
//                         </p>
//                         <div className="border rounded-lg p-4 max-w-md mx-auto bg-gray-50 dark:bg-gray-900">
//                           <div className="flex justify-between mb-2">
//                             <span className="text-muted-foreground">Transaction ID:</span>
//                             <span className="font-medium">
//                               {transactionId || "TRX-" + Math.random().toString(36).substring(2, 10).toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="flex justify-between mb-2">
//                             <span className="text-muted-foreground">Payment Method:</span>
//                             <span className="font-medium">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                             </span>
//                           </div>
//                           <div className="flex justify-between mb-2">
//                             <span className="text-muted-foreground">Amount:</span>
//                             <span className="font-bold">${total.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Date:</span>
//                             <span className="font-medium">{new Date().toLocaleDateString()}</span>
//                           </div>
//                         </div>
//                         <div className="mt-8">
//                           <Button
//                             type="button"
//                             className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                             onClick={() => (window.location.href = "/dashboard")}
//                           >
//                             Continue to Your Account
//                             <ArrowRight className="h-4 w-4 ml-2" />
//                           </Button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-6">
//                         <div className="flex items-center justify-between">
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             onClick={() => setFormStep(1)}
//                             className="text-muted-foreground"
//                           >
//                             <ChevronLeft className="h-4 w-4 mr-1" />
//                             Back to Payment
//                           </Button>
//                           <div className="flex items-center">
//                             <PaymentMethodIcon method={paymentMethod} selected={true} />
//                             <span className="ml-2 font-medium">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                             </span>
//                           </div>
//                         </div>

//                         <Card>
//                           <CardHeader>
//                             <CardTitle>Review & Confirm</CardTitle>
//                             <CardDescription>Please review your payment details before confirming</CardDescription>
//                           </CardHeader>
//                           <CardContent className="space-y-6">
//                             <div className="space-y-4">
//                               <div className="flex justify-between pb-2 border-b">
//                                 <h3 className="font-medium">Payment Details</h3>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => setFormStep(1)}
//                                   className="h-auto p-0 text-primary hover:text-primary/80"
//                                 >
//                                   Edit
//                                 </Button>
//                               </div>

//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                   <h4 className="text-sm text-muted-foreground mb-1">Payment Method</h4>
//                                   <div className="flex items-center">
//                                     <PaymentMethodIcon method={paymentMethod} selected={true} />
//                                     <span className="ml-2 font-medium">
//                                       {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                                     </span>
//                                   </div>
//                                 </div>

//                                 {paymentMethod === "card" && (
//                                   <>
//                                     <div>
//                                       <h4 className="text-sm text-muted-foreground mb-1">Card Number</h4>
//                                       <div className="font-medium">•••• •••• •••• {cardNumber.slice(-4)}</div>
//                                     </div>
//                                     <div>
//                                       <h4 className="text-sm text-muted-foreground mb-1">Card Holder</h4>
//                                       <div className="font-medium">{cardName}</div>
//                                     </div>
//                                     <div>
//                                       <h4 className="text-sm text-muted-foreground mb-1">Expiry Date</h4>
//                                       <div className="font-medium">{expiryDate}</div>
//                                     </div>
//                                   </>
//                                 )}
//                               </div>
//                             </div>

//                             <Separator />

//                             <div className="space-y-4">
//                               <div className="flex justify-between pb-2 border-b">
//                                 <h3 className="font-medium">Billing Summary</h3>
//                               </div>

//                               <div className="space-y-2">
//                                 {items.map((item, index) => (
//                                   <div key={index} className="flex justify-between items-center">
//                                     <div className="flex items-center">
//                                       <span>{item.name}</span>
//                                       {item.waived && (
//                                         <Badge
//                                           variant="outline"
//                                           className="ml-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//                                         >
//                                           Waived
//                                         </Badge>
//                                       )}
//                                       {item.saving && (
//                                         <Badge
//                                           variant="outline"
//                                           className="ml-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
//                                         >
//                                           Save {item.saving}
//                                         </Badge>
//                                       )}
//                                     </div>
//                                     <span className="font-medium">
//                                       ${item.price === 0 ? "0.00" : item.price.toFixed(2)}
//                                     </span>
//                                   </div>
//                                 ))}

//                                 <Separator className="my-2" />

//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Subtotal</span>
//                                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                                 </div>

//                                 {useSpecialOffer && (
//                                   <div className="flex justify-between text-green-600 dark:text-green-400">
//                                     <span>Special Offer Discount</span>
//                                     <span>-$25.00</span>
//                                   </div>
//                                 )}

//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Tax (8%)</span>
//                                   <span className="font-medium">${tax.toFixed(2)}</span>
//                                 </div>

//                                 <Separator className="my-2" />

//                                 <div className="flex justify-between text-lg">
//                                   <span className="font-bold">Total</span>
//                                   <span className="font-bold">${total.toFixed(2)}</span>
//                                 </div>
//                               </div>
//                             </div>

//                             {paymentError && (
//                               <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
//                                 <div className="flex items-start">
//                                   <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
//                                   <span>{paymentError}</span>
//                                 </div>
//                               </div>
//                             )}

//                             <div className="pt-4 space-y-4">
//                               <div className="flex items-center space-x-2">
//                                 <Checkbox id="terms" required />
//                                 <label
//                                   htmlFor="terms"
//                                   className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                   I agree to the{" "}
//                                   <a href="/terms" className="text-primary underline hover:text-primary/90">
//                                     Terms and Conditions
//                                   </a>{" "}
//                                   and{" "}
//                                   <a href="/privacy" className="text-primary underline hover:text-primary/90">
//                                     Privacy Policy
//                                   </a>
//                                 </label>
//                               </div>

//                               <div className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id="subscribe"
//                                   checked={useSpecialOffer}
//                                   onCheckedChange={(checked) => setUseSpecialOffer(!!checked)}
//                                 />
//                                 <div className="grid gap-1.5 leading-none">
//                                   <label
//                                     htmlFor="subscribe"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
//                                   >
//                                     Apply Special Offer Code
//                                     <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
//                                       $25 OFF
//                                     </Badge>
//                                   </label>
//                                   <p className="text-sm text-muted-foreground">
//                                     Special discount for first-time customers
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </CardContent>
//                           <CardFooter className="flex justify-between">
//                             <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
//                               <ChevronLeft className="h-4 w-4 mr-1" />
//                               Back
//                             </Button>
//                             <Button
//                               type="submit"
//                               disabled={paymentProcessing}
//                               className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                             >
//                               {paymentProcessing ? (
//                                 <>
//                                   <Timer className="h-4 w-4 mr-2 animate-spin" />
//                                   Processing Payment...
//                                 </>
//                               ) : (
//                                 <>
//                                   Confirm Payment
//                                   <Lock className="h-4 w-4 ml-1" />
//                                 </>
//                               )}
//                             </Button>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </form>
//           </div>

//           {/* Order Summary Sidebar */}
//           <AnimatePresence>
//             {(sidebarVisible || showOrderSummary) && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.2 }}
//                 className="lg:block bg-gray-50 dark:bg-gray-900 rounded-xl border p-6 h-fit sticky top-24"
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="font-bold text-lg">Order Summary</h2>
//                   {mobileView && (
//                     <Button variant="ghost" size="sm" onClick={() => setShowOrderSummary(false)} className="lg:hidden">
//                       <X className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>

//                 <div className="space-y-4">
//                   {items.map((item, index) => (
//                     <div key={index} className="flex justify-between">
//                       <div>
//                         <div className="font-medium">{item.name}</div>
//                         <div className="flex mt-1">
//                           {item.waived && (
//                             <Badge
//                               variant="outline"
//                               className="text-[10px] text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//                             >
//                               Waived
//                             </Badge>
//                           )}
//                           {item.saving && (
//                             <Badge
//                               variant="outline"
//                               className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
//                             >
//                               Save {item.saving}
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                       <span className="font-medium">${item.price === 0 ? "0.00" : item.price.toFixed(2)}</span>
//                     </div>
//                   ))}

//                   <Separator />

//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-medium">${subtotal.toFixed(2)}</span>
//                   </div>

//                   {useSpecialOffer && (
//                     <div className="flex justify-between text-green-600 dark:text-green-400">
//                       <span>Special Offer Discount</span>
//                       <span>-$25.00</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Tax (8%)</span>
//                     <span className="font-medium">${tax.toFixed(2)}</span>
//                   </div>

//                   <Separator />

//                   <div className="flex justify-between text-lg">
//                     <span className="font-bold">Total</span>
//                     <span className="font-bold">${total.toFixed(2)}</span>
//                   </div>

//                   <div className="pt-2 text-sm text-muted-foreground space-y-2">
//                     <div className="flex items-center">
//                       <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                       <span>Secure 256-bit SSL encryption</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                       <span>Data protection & privacy</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                       <span>Money-back guarantee</span>
//                     </div>
//                   </div>

//                   {mobileView && (
//                     <Button
//                       className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                       onClick={() => setShowOrderSummary(false)}
//                     >
//                       Continue
//                       <ChevronRight className="h-4 w-4 ml-1" />
//                     </Button>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {mobileView && !showOrderSummary && (
//           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950 border-t dark:border-gray-800 flex items-center justify-between z-10">
//             <div>
//               <div className="text-sm text-muted-foreground">Total</div>
//               <div className="font-bold text-lg">${total.toFixed(2)}</div>
//             </div>
//             <Button
//               onClick={() => setShowOrderSummary(true)}
//               className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//             >
//               View Summary
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//           </div>
//         )}
//       </div>
//     </Elements>
//   )
// }

// export default PaymentPage


// "use client"

// import type React from "react"

// import { motion, AnimatePresence } from "framer-motion"
// import { cn } from "@/lib/utils"
// import {
//   CreditCard,
//   DollarSignIcon as PaypalLogo,
//   Bitcoin,
//   Apple,
//   BanknoteIcon as BankTransfer,
//   Gift,
//   Check,
//   ChevronRight,
//   ChevronLeft,
//   Lock,
//   X,
//   ChevronsUpDown,
//   Shield,
//   Sparkles,
//   Landmark,
//   Wallet,
//   AlertCircle,
//   Info,
//   Star,
//   CreditCardIcon as GooglePay,
//   CheckCircle2,
//   ThumbsUp,
//   Timer,
//   RefreshCcw,
//   ArrowRight,
//   Copy,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useToast } from "@/hooks/use-toast"

// // Import payment processing libraries
// import { loadStripe } from "@stripe/stripe-js"
// import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js"
// // Replace the import for useUser from Clerk with your server actions
// // Replace this:
// //import { useUser } from "@clerk/nextjs";

// // With this:
// import { onSubscribe } from "@/actions/user"
// import { useState, useEffect, useRef, type FormEvent } from "react"
// // Replace NextAuth imports with Clerk imports
// //import { useUser } from "@clerk/nextjs"

// // Initialize Stripe with your publishable key
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// // Card types for validation and display
// const CARD_TYPES = {
//   visa: {
//     pattern: /^4/,
//     icon: "/assets/payment/visa.svg",
//   },
//   mastercard: {
//     pattern: /^5[1-5]/,
//     icon: "/assets/payment/mastercard.svg",
//   },
//   amex: {
//     pattern: /^3[47]/,
//     icon: "/assets/payment/amex.svg",
//   },
//   discover: {
//     pattern: /^(6011|65|64[4-9]|622)/,
//     icon: "/assets/payment/discover.svg",
//   },
// }

// interface PaymentMethod {
//   id: string
//   name: string
//   icon: React.ReactNode
//   description: string
//   popular?: boolean
//   processingTime: string
//   fees: string
//   color: string
// }

// // Add this interface near the top of the file, after the other interfaces
// interface PaymentResult {
//   success: boolean
//   transactionId?: string
//   sessionId?: string
//   error?: string
//   last4?: string
//   paymentAddress?: string
//   expiresAt?: string
//   redemptionId?: string
// }

// const PaymentMethodIcon = ({
//   method,
//   selected,
//   size = "default",
// }: {
//   method: string
//   selected: boolean
//   size?: "default" | "large"
// }) => {
//   const icons: Record<string, React.ReactNode> = {
//     card: <CreditCard className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     paypal: <PaypalLogo className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     crypto: <Bitcoin className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     applepay: <Apple className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     googlepay: <GooglePay className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     bank: <BankTransfer className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     giftcard: <Gift className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//     wallet: <Wallet className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
//   }

//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center rounded-full transition-all",
//         size === "large" ? "h-16 w-16 p-3" : "h-10 w-10 p-2",
//         selected
//           ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
//           : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
//       )}
//     >
//       {icons[method]}
//     </div>
//   )
// }

// // Main payment component
// const PaymentPage = () => {
//   // Replace this line:
//   // const { data: session } = useSession()
//   // With this:
//   //const { user, isSignedIn } = useUser()
//   const [user, setUser] = useState<any>(null)
//   const [isSignedIn, setIsSignedIn] = useState(false)
//   const [userProfile, setUserProfile] = useState<any>(null)
//   const { toast } = useToast()

//   // State variables
//   const [paymentMethod, setPaymentMethod] = useState<string>("card")
//   const [formStep, setFormStep] = useState<number>(0)
//   const [flipCard, setFlipCard] = useState(false)
//   const [cardName, setCardName] = useState("")
//   const [cardNumber, setCardNumber] = useState("")
//   const [expiryDate, setExpiryDate] = useState("")
//   const [cvv, setCvv] = useState("")
//   const [saveCard, setSaveCard] = useState(false)
//   const [useSpecialOffer, setUseSpecialOffer] = useState(false)
//   const [showOrderSummary, setShowOrderSummary] = useState(false)
//   const [animationComplete, setAnimationComplete] = useState(false)
//   const [cardType, setCardType] = useState<keyof typeof CARD_TYPES | null>(null)
//   const [sidebarVisible, setSidebarVisible] = useState(true)
//   const [mobileView, setMobileView] = useState(false)
//   const [paymentProcessing, setPaymentProcessing] = useState(false)
//   const [paymentComplete, setPaymentComplete] = useState(false)
//   const [paymentError, setPaymentError] = useState<string | null>(null)
//   const [clientSecret, setClientSecret] = useState<string | null>(null)
//   const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
//   const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "failed">("idle")
//   const [transactionId, setTransactionId] = useState<string | null>(null)
//   const [walletBalance, setWalletBalance] = useState<number | null>(null)
//   const [paymentRequest, setPaymentRequest] = useState<any>(null)
//   const [giftCardCode, setGiftCardCode] = useState("")
//   const [giftCardPin, setGiftCardPin] = useState("")
//   const [giftCardBalance, setGiftCardBalance] = useState<number | null>(null)
//   const [cryptoCurrency, setCryptoCurrency] = useState("bitcoin")
//   const [cryptoAddress, setCryptoAddress] = useState<string | null>(null)

//   // Refs for form elements
//   const cardNumberRef = useRef<HTMLInputElement>(null)
//   const expiryRef = useRef<HTMLInputElement>(null)
//   const cvvRef = useRef<HTMLInputElement>(null)

//   // Order items and pricing
//   const items = [
//     { name: "Premium Plan (Annual)", price: 199.99, saving: "20%" },
//     { name: "Setup Fee", price: 0, waived: true },
//     { name: "Priority Support", price: 49.99 },
//   ]

//   const subtotal = items.reduce((acc, item) => acc + item.price, 0)
//   const discount = useSpecialOffer ? 25 : 0
//   const tax = (subtotal - discount) * 0.08
//   const total = subtotal - discount + tax

//   // Create payment intent when component loads or discount changes
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       createPaymentIntent()
//     }
//   }, [useSpecialOffer])

//   // Create payment intent
//   const createPaymentIntent = async () => {
//     try {
//       setPaymentError(null)

//       const response = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: Math.round(total * 100), // Convert to cents for Stripe
//           currency: "usd",
//           payment_method_types: ["card"],
//           metadata: {
//             order_items: JSON.stringify(items),
//             discount_applied: useSpecialOffer,
//             // Replace all instances of session?.user?.id with user?.id
//             userId: user?.id || "guest",
//           },
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create payment intent")
//       }

//       const data = await response.json()
//       setClientSecret(data.clientSecret)
//       setPaymentIntent(data.id)
//     } catch (error) {
//       console.error("Error creating payment intent:", error)
//       setPaymentError("Failed to initialize payment. Please try again.")

//       toast({
//         title: "Payment Error",
//         description: "Failed to initialize payment. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   // Handle form submission
//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault()

//     if (formStep === 1 && paymentMethod === "card") {
//       // Move to review step
//       continueTo(2)
//     } else if (formStep === 2) {
//       // Process the payment
//       await processPayment()
//     }
//   }

//   // Then update the processPayment function to use this type
//   const processPayment = async () => {
//     setPaymentProcessing(true)
//     setPaymentStatus("processing")
//     setPaymentError(null)

//     try {
//       let paymentResult: PaymentResult

//       switch (paymentMethod) {
//         case "card":
//           paymentResult = await processCardPayment()
//           break
//         case "paypal":
//           paymentResult = await processPayPalPayment()
//           break
//         case "crypto":
//           paymentResult = await processCryptoPayment()
//           break
//         case "applepay":
//           paymentResult = await processApplePayPayment()
//           break
//         case "googlepay":
//           paymentResult = await processGooglePayPayment()
//           break
//         case "bank":
//           paymentResult = await processBankTransferPayment()
//           break
//         case "giftcard":
//           paymentResult = await processGiftCardPayment()
//           break
//         case "wallet":
//           paymentResult = await processWalletPayment()
//           break
//         default:
//           throw new Error("Invalid payment method")
//       }

//       if (paymentResult.success) {
//         setTransactionId(paymentResult.transactionId || null)
//         setPaymentStatus("succeeded")
//         setPaymentComplete(true)
//         setFormStep(2)

//         // If we have a session ID (from Stripe), update the user's subscription
//         if (paymentResult.sessionId) {
//           try {
//             const subscriptionResult = await onSubscribe(paymentResult.sessionId)
//             if (subscriptionResult.status === 200) {
//               console.log("Subscription updated successfully")
//             } else {
//               console.warn("Subscription update failed:", subscriptionResult)
//             }
//           } catch (error) {
//             console.error("Error updating subscription:", error)
//           }
//         }

//         toast({
//           title: "Payment Successful",
//           description: "Your payment has been processed successfully.",
//           variant: "default",
//           className:
//             "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
//         })
//       } else {
//         throw new Error(paymentResult.error || "Payment failed")
//       }
//     } catch (error) {
//       console.error("Payment processing error:", error)
//       setPaymentStatus("failed")
//       const errorMessage = error instanceof Error ? error.message : "Payment processing failed. Please try again."
//       setPaymentError(errorMessage)

//       toast({
//         title: "Payment Failed",
//         description: errorMessage,
//         variant: "destructive",
//       })
//     } finally {
//       setPaymentProcessing(false)
//     }
//   }

//   // Update the return type of processCardPayment
//   const processCardPayment = async (): Promise<PaymentResult> => {
//     // This will be implemented in the CardPaymentForm component
//     return { success: true, transactionId: "card-" + Date.now() }
//   }

//   // Update the return type of processPayPalPayment
//   const processPayPalPayment = async (): Promise<PaymentResult> => {
//     // Redirect to PayPal for payment
//     window.location.href = `/api/paypal/create-order?amount=${total}&currency=USD`
//     return { success: true }
//   }

//   // Update the remaining payment processing functions to use the PaymentResult type

//   // Process cryptocurrency payment
//   const processCryptoPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/crypto/create-charge", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: total,
//           currency: "USD",
//           name: "Premium Plan Purchase",
//           customerId: user?.id || "guest",
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create crypto payment")
//       }

//       const data = await response.json()

//       setCryptoAddress(data.addresses[cryptoCurrency])

//       return {
//         success: true,
//         transactionId: data.id,
//         paymentAddress: data.addresses[cryptoCurrency],
//         expiresAt: data.expires_at,
//       }
//     } catch (error) {
//       console.error("Crypto payment error:", error)
//       return { success: false, error: "Failed to process cryptocurrency payment" }
//     }
//   }

//   // Process Apple Pay payment
//   const processApplePayPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/apple-pay/session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: Math.round(total * 100),
//           currency: "usd",
//           items,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create Apple Pay session")
//       }

//       const data = await response.json()

//       // In a real implementation, you would use the Apple Pay JS API
//       // with the session data returned from the server

//       return { success: true, transactionId: `AP-${Date.now()}` }
//     } catch (error) {
//       console.error("Apple Pay error:", error)
//       return { success: false, error: "Failed to process Apple Pay payment" }
//     }
//   }

//   // Process Google Pay payment
//   const processGooglePayPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/google-pay/session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: Math.round(total * 100),
//           currency: "usd",
//           items,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create Google Pay session")
//       }

//       const data = await response.json()

//       // In a real implementation, you would use the Google Pay API
//       // with the session data returned from the server

//       return { success: true, transactionId: `GP-${Date.now()}` }
//     } catch (error) {
//       console.error("Google Pay error:", error)
//       return { success: false, error: "Failed to process Google Pay payment" }
//     }
//   }

//   // Process bank transfer payment
//   const processBankTransferPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/bank-transfer/initiate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: total,
//           currency: "USD",
//           description: "Premium Plan Purchase",
//           userId: user?.id || "guest",
//           email: user?.emailAddresses?.[0]?.emailAddress || userProfile?.email || "",
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to initiate bank transfer")
//       }

//       const data = await response.json()
//       return { success: true, transactionId: data.reference }
//     } catch (error) {
//       console.error("Bank transfer error:", error)
//       return { success: false, error: "Failed to initiate bank transfer" }
//     }
//   }

//   // Process gift card payment
//   const processGiftCardPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/gift-card/redeem", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code: giftCardCode,
//           amount: total,
//           userId: user?.id || "guest",
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to redeem gift card")
//       }

//       const data = await response.json()
//       return { success: true, transactionId: data.redemptionId }
//     } catch (error) {
//       console.error("Gift card error:", error)
//       return { success: false, error: error instanceof Error ? error.message : "Failed to process gift card payment" }
//     }
//   }

//   // Process wallet payment
//   const processWalletPayment = async (): Promise<PaymentResult> => {
//     try {
//       const response = await fetch("/api/wallet/charge", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Clerk-User-Id": user?.id || "",
//         },
//         body: JSON.stringify({
//           amount: total,
//           currency: "USD",
//           description: "Premium Plan Purchase",
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to process wallet payment")
//       }

//       const data = await response.json()
//       setWalletBalance(data.new_balance)
//       return { success: true, transactionId: data.transactionId }
//     } catch (error) {
//       console.error("Wallet payment error:", error)
//       return { success: false, error: error instanceof Error ? error.message : "Failed to process wallet payment" }
//     }
//   }

//   // Check gift card balance
//   const checkGiftCardBalance = async () => {
//     try {
//       const response = await fetch(`/api/gift-card/redeem?code=${giftCardCode}`)

//       if (!response.ok) {
//         throw new Error("Invalid gift card")
//       }

//       const data = await response.json()

//       if (!data.is_valid) {
//         throw new Error(`Gift card is ${data.status}`)
//       }

//       setGiftCardBalance(data.balance)

//       toast({
//         title: "Gift Card Valid",
//         description: `Available balance: $${data.balance.toFixed(2)}`,
//         variant: "default",
//         className:
//           "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
//       })

//       return data.balance
//     } catch (error) {
//       console.error("Gift card error:", error)

//       toast({
//         title: "Gift Card Error",
//         description: error instanceof Error ? error.message : "Invalid gift card",
//         variant: "destructive",
//       })

//       return null
//     }
//   }

//   // Get wallet balance
//   const getWalletBalance = async () => {
//     try {
//       const response = await fetch("/api/wallet/charge", {
//         headers: {
//           "X-Clerk-User-Id": user?.id || "",
//         },
//       })

//       if (!response.ok) {
//         throw new Error("Failed to get wallet balance")
//       }

//       const data = await response.json()
//       setWalletBalance(data.balance)
//       return data.balance
//     } catch (error) {
//       console.error("Wallet error:", error)
//       return null
//     }
//   }

//   // Format credit card number with spaces
//   const formatCardNumber = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     const matches = v.match(/\d{4,16}/g)
//     const match = (matches && matches[0]) || ""
//     const parts = []

//     for (let i = 0; i < match.length; i += 4) {
//       parts.push(match.substring(i, i + 4))
//     }

//     if (parts.length) {
//       return parts.join(" ")
//     } else {
//       return value
//     }
//   }

//   // Format expiry date
//   const formatExpiryDate = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     if (v.length > 2) {
//       return `${v.substring(0, 2)}/${v.substring(2, 4)}`
//     }
//     return value
//   }

//   // Handle card number input
//   const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = formatCardNumber(e.target.value)
//     setCardNumber(formattedValue)

//     // Detect card type
//     const cardNumberWithoutSpaces = formattedValue.replace(/\s/g, "")
//     for (const [type, { pattern }] of Object.entries(CARD_TYPES)) {
//       if (pattern.test(cardNumberWithoutSpaces)) {
//         setCardType(type as keyof typeof CARD_TYPES)
//         break
//       } else {
//         setCardType(null)
//       }
//     }

//     // Auto-advance to expiry when full card number entered
//     if (cardNumberWithoutSpaces.length === 16 && expiryRef.current) {
//       expiryRef.current.focus()
//     }
//   }

//   // Handle expiry date input
//   const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = formatExpiryDate(e.target.value)
//     setExpiryDate(formattedValue)

//     // Auto-advance to CVV when full expiry entered
//     if (formattedValue.length === 5 && cvvRef.current) {
//       cvvRef.current.focus()
//       setFlipCard(true)
//     }
//   }

//   // Handle CVV input
//   const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "")
//     if (value.length <= 4) {
//       setCvv(value)
//     }
//   }

//   const handleCvvFocus = () => {
//     setFlipCard(true)
//   }

//   const handleCvvBlur = () => {
//     setFlipCard(false)
//   }

//   // Check form validity based on payment method
//   const isFormValid = () => {
//     switch (paymentMethod) {
//       case "card":
//         return (
//           cardName.length > 0 &&
//           cardNumber.replace(/\s/g, "").length >= 15 &&
//           expiryDate.length === 5 &&
//           cvv.length >= 3
//         )
//       case "paypal":
//         return true
//       case "crypto":
//         return true
//       case "applepay":
//         return true
//       case "googlepay":
//         return true
//       case "bank":
//         return true
//       case "giftcard":
//         return giftCardCode.length > 0 && giftCardBalance !== null && giftCardBalance >= total
//       case "wallet":
//         return walletBalance !== null && walletBalance >= total
//       default:
//         return false
//     }
//   }

//   // Handle window resize for responsive layout
//   useEffect(() => {
//     const handleResize = () => {
//       setMobileView(window.innerWidth < 768)
//       setSidebarVisible(window.innerWidth >= 1024)
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   // Load wallet balance when wallet payment method is selected
//   useEffect(() => {
//     if (paymentMethod === "wallet" && isSignedIn && user) {
//       getWalletBalance()
//     }
//   }, [paymentMethod, isSignedIn, user])

//   // Stripe Card Payment Form component
//   const CardPaymentForm = () => {
//     const stripe = useStripe()
//     const elements = useElements()
//     const [cardError, setCardError] = useState<string | null>(null)
//     const [cardComplete, setCardComplete] = useState(false)

//     useEffect(() => {
//       if (!stripe || !elements) {
//         return
//       }

//       // Create a payment request for Apple Pay / Google Pay
//       const pr = stripe.paymentRequest({
//         country: "US",
//         currency: "usd",
//         total: {
//           label: "Premium Plan",
//           amount: Math.round(total * 100),
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       })

//       // Check if the Payment Request is available
//       pr.canMakePayment().then((result) => {
//         if (result) {
//           setPaymentRequest(pr)
//         }
//       })
//     }, [stripe, elements])

//     const handleCardChange = (event: any) => {
//       setCardError(event.error ? event.error.message : null)
//       setCardComplete(event.complete)

//       // Try to determine card type from the brand
//       if (event.brand) {
//         const brand = event.brand.toLowerCase()
//         if (Object.keys(CARD_TYPES).includes(brand)) {
//           setCardType(brand as keyof typeof CARD_TYPES)
//         }
//       }
//     }

//     // Update the CardPaymentForm component's handleCardPayment function
//     const handleCardPayment = async (): Promise<PaymentResult> => {
//       if (!stripe || !elements || !clientSecret) {
//         return { success: false, error: "Payment system not initialized" }
//       }

//       const cardElement = elements.getElement(CardElement)

//       if (!cardElement) {
//         return { success: false, error: "Card element not found" }
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: {
//             name: cardName,
//             email: user?.emailAddresses?.[0]?.emailAddress || userProfile?.email || undefined,
//           },
//         },
//         save_payment_method: saveCard,
//       })

//       if (error) {
//         return { success: false, error: error.message }
//       }

//       if (paymentIntent?.status === "succeeded") {
//         // Use type assertion to access payment_method_details
//         const paymentIntentWithDetails = paymentIntent as any
//         const last4 = paymentIntentWithDetails.payment_method_details?.card?.last4

//         return {
//           success: true,
//           transactionId: paymentIntent.id,
//           sessionId: paymentIntent.id, // Include the session ID for subscription update
//           last4: last4,
//         }
//       }

//       return { success: false, error: "Payment failed" }
//     }

//     // Add this useEffect to fetch user data when the component loads
//     useEffect(() => {
//       // Mock user data for demonstration
//       const mockUser = {
//         id: "user_" + Math.random().toString(36).substring(2, 10),
//         emailAddresses: [{ emailAddress: "demo@example.com" }],
//       }

//       // For demonstration purposes only
//       setUser(mockUser)
//       setIsSignedIn(true)
//       setUserProfile({
//         email: "demo@example.com",
//         name: "Demo User",
//       })

//       // In a real application, you would fetch the actual user data
//       // const fetchUser = async () => {
//       //   try {
//       //     const response = await fetch("/api/user")
//       //     if (response.ok) {
//       //       const userData = await response.json()
//       //       setUser(userData)
//       //       setIsSignedIn(true)
//       //       setUserProfile(userData)
//       //     }
//       //   } catch (error) {
//       //     console.error("Error fetching user:", error)
//       //   }
//       // }
//       // fetchUser()
//     }, [])

//     return (
//       <div className="space-y-6">
//         <div className="relative perspective-1000">
//           <motion.div
//             className="relative w-full h-56 transition-all duration-500 preserve-3d"
//             animate={{ rotateY: flipCard ? 180 : 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Front of card - keep the same beautiful design */}
//             <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 p-5 flex flex-col justify-between">
//                 <div className="flex justify-between items-start">
//                   <div className="flex flex-col">
//                     <div className="text-white/70 text-xs uppercase tracking-wider">Credit Card</div>
//                     <div className="text-white/90 text-xs mt-1">
//                       {cardType ? <span className="uppercase">{cardType}</span> : <span>Visa / Mastercard / Amex</span>}
//                     </div>
//                   </div>
//                   {cardType && (
//                     <div className="h-10 w-14 bg-white/20 rounded-md grid place-items-center p-1">
//                       <img
//                         src={CARD_TYPES[cardType].icon || "/placeholder.svg"}
//                         alt={cardType}
//                         className="max-h-full"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="my-6">
//                   <div className="text-xl text-white font-mono tracking-wider">•••• •••• •••• ••••</div>
//                 </div>

//                 <div className="flex justify-between items-end">
//                   <div>
//                     <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Card Holder</div>
//                     <div className="text-white font-medium truncate max-w-[180px]">{cardName || "YOUR NAME"}</div>
//                   </div>
//                   <div>
//                     <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Expires</div>
//                     <div className="text-white font-medium">MM/YY</div>
//                   </div>
//                 </div>

//                 {/* Circuit design elements */}
//                 <div className="absolute top-[40%] left-0 w-12 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
//                 <div className="absolute top-[30%] right-5 w-8 h-8 border-r-2 border-b-2 border-white/10 rounded-br-lg"></div>
//                 <div className="absolute bottom-6 left-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
//                 <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full"></div>
//                 <div className="absolute top-5 left-[30%] w-3 h-3 bg-white/20 rounded-full"></div>
//                 <div className="absolute bottom-10 right-[20%] w-6 h-1 bg-white/20 rounded"></div>
//               </div>
//             </div>

//             {/* Back of card - keep the same beautiful design */}
//             <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden rotateY-180">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-violet-600 p-5 flex flex-col">
//                 <div className="w-full h-12 bg-black/30 mt-4"></div>

//                 <div className="mt-6 flex justify-end">
//                   <div className="bg-white/90 h-10 w-full max-w-[80%] rounded relative flex items-center px-3">
//                     <div className="absolute text-right w-full pr-12 font-mono text-gray-600 tracking-widest">•••</div>
//                   </div>
//                 </div>

//                 <div className="mt-auto text-xs text-white/70 max-w-[80%]">
//                   This card is property of your bank. Unauthorized use is prohibited. If found, please return to your
//                   bank.
//                 </div>

//                 {/* Circuit design elements */}
//                 <div className="absolute top-[40%] right-0 w-12 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
//                 <div className="absolute bottom-10 left-5 w-8 h-8 border-l-2 border-b-2 border-white/10 rounded-bl-lg"></div>
//                 <div className="absolute bottom-6 right-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         <div className="space-y-4">
//           {/* Apple Pay / Google Pay button if available */}
//           {paymentRequest && (
//             <div className="mb-6">
//               <h3 className="text-base font-medium mb-3">Express Checkout</h3>
//               <PaymentRequestButtonElement
//                 options={{
//                   paymentRequest,
//                   style: {
//                     paymentRequestButton: {
//                       theme: "dark",
//                       height: "44px",
//                     },
//                   },
//                 }}
//               />
//               <Separator className="my-6" />
//               <h3 className="text-base font-medium mb-3">Or Pay with Card</h3>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="cardName">Cardholder Name</Label>
//               <Input
//                 id="cardName"
//                 placeholder="Name on card"
//                 value={cardName}
//                 onChange={(e) => setCardName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="cardNumber">Card Details</Label>
//               <div className="card-element p-3 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//                 <CardElement
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "16px",
//                         color: "#424770",
//                         "::placeholder": {
//                           color: "#aab7c4",
//                         },
//                       },
//                       invalid: {
//                         color: "#9e2146",
//                       },
//                     },
//                   }}
//                   onChange={handleCardChange}
//                 />
//               </div>
//               {cardError && <div className="text-sm text-red-500 mt-1">{cardError}</div>}
//             </div>

//             <div className="flex items-center space-x-2 mt-2">
//               <Checkbox id="saveCard" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
//               <label
//                 htmlFor="saveCard"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Save card for future payments
//               </label>
//             </div>
//           </div>

//           <div className="mt-2 text-sm text-muted-foreground flex items-center">
//             <Lock className="h-4 w-4 mr-1" />
//             <span>Your payment information is encrypted and secure.</span>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Particles for the success animation
//   const Particles = ({ count = 50 }: { count?: number }) => {
//     return (
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {Array.from({ length: count }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 rounded-full bg-primary"
//             initial={{
//               scale: 0,
//               x: "50%",
//               y: "50%",
//               opacity: 1,
//             }}
//             animate={{
//               scale: Math.random() * 1 + 0.5,
//               x: `${Math.random() * 100}%`,
//               y: `${Math.random() * 100}%`,
//               opacity: 0,
//             }}
//             transition={{
//               duration: Math.random() * 1 + 0.5,
//               delay: Math.random() * 0.2,
//             }}
//             onAnimationComplete={() => {
//               if (i === count - 1) setAnimationComplete(true)
//             }}
//             style={{
//               backgroundColor: `hsl(${Math.random() * 60 + 230}, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 50}%)`,
//             }}
//           />
//         ))}
//       </div>
//     )
//   }

//   // Render payment method form based on selected method
//   const renderPaymentMethodForm = () => {
//     switch (paymentMethod) {
//       case "card":
//         return <CardPaymentForm />

//       case "paypal":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-10">
//               <div className="bg-[#003087] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <PaypalLogo className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with PayPal</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 You willl be redirected to PayPal to complete your payment securely. You will have a chance to review your
//                 order before the payment is finalized.
//               </p>
//             </div>

//             <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
//                 <span>
//                   PayPal protects your payment information with industry-leading security and fraud prevention systems.
//                   You are always protected if the item doesnt arrive or is significantly different than described.
//                 </span>
//               </div>
//             </div>

//             <Button
//               type="button"
//               className="w-full bg-[#0070ba] hover:bg-[#003087] text-white"
//               onClick={() => processPayPalPayment()}
//             >
//               <PaypalLogo className="h-5 w-5 mr-2" />
//               Proceed to PayPal
//             </Button>
//           </div>
//         )

//       case "crypto":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-[#F7931A] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Bitcoin className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Cryptocurrency</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Pay with your favorite cryptocurrency. We accept Bitcoin, Ethereum, and many other digital currencies.
//               </p>
//             </div>

//             <div className="border rounded-lg p-5 bg-amber-50 dark:bg-amber-950/30">
//               <Tabs defaultValue="bitcoin" className="w-full" onValueChange={(value) => setCryptoCurrency(value)}>
//                 <TabsList className="grid grid-cols-3 mb-4">
//                   <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
//                   <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
//                   <TabsTrigger value="other">Others</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="bitcoin" className="space-y-4">
//                   <div className="flex flex-col items-center">
//                     {cryptoAddress ? (
//                       <>
//                         <div className="bg-white p-2 rounded-lg mb-3">
//                           <img
//                             src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${cryptoAddress}&choe=UTF-8`}
//                             alt="Bitcoin QR Code"
//                             className="h-40 w-40"
//                           />
//                         </div>
//                         <div className="text-sm text-center">
//                           <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
//                             {cryptoAddress}
//                           </p>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="mt-1"
//                             onClick={() => {
//                               navigator.clipboard.writeText(cryptoAddress || "")
//                               toast({
//                                 title: "Address Copied",
//                                 description: "Bitcoin address copied to clipboard",
//                                 variant: "default",
//                               })
//                             }}
//                           >
//                             <Copy className="h-4 w-4 mr-2" />
//                             Copy Address
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <Button
//                         className="w-full bg-[#F7931A] hover:bg-[#E77F18] text-white"
//                         onClick={() => processCryptoPayment()}
//                       >
//                         <Bitcoin className="h-5 w-5 mr-2" />
//                         Generate Bitcoin Address
//                       </Button>
//                     )}
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-4">
//                     <p className="flex items-start">
//                       <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
//                       Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
//                       worth of Bitcoin to this address. Current exchange rate: 1 BTC ≈ $59,783.21 USD
//                     </p>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="ethereum" className="space-y-4">
//                   <div className="flex flex-col items-center">
//                     {cryptoAddress ? (
//                       <>
//                         <div className="bg-white p-2 rounded-lg mb-3">
//                           <img
//                             src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${cryptoAddress}&choe=UTF-8`}
//                             alt="Ethereum QR Code"
//                             className="h-40 w-40"
//                           />
//                         </div>
//                         <div className="text-sm text-center">
//                           <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
//                             {cryptoAddress}
//                           </p>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="mt-1"
//                             onClick={() => {
//                               navigator.clipboard.writeText(cryptoAddress || "")
//                               toast({
//                                 title: "Address Copied",
//                                 description: "Ethereum address copied to clipboard",
//                                 variant: "default",
//                               })
//                             }}
//                           >
//                             <Copy className="h-4 w-4 mr-2" />
//                             Copy Address
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <Button
//                         className="w-full bg-[#627EEA] hover:bg-[#4C63BB] text-white"
//                         onClick={() => processCryptoPayment()}
//                       >
//                         <Bitcoin className="h-5 w-5 mr-2" />
//                         Generate Ethereum Address
//                       </Button>
//                     )}
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-4">
//                     <p className="flex items-start">
//                       <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
//                       Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
//                       worth of Ethereum to this address. Current exchange rate: 1 ETH ≈ $3,124.45 USD
//                     </p>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="other" className="py-3">
//                   <Select onValueChange={(value) => setCryptoCurrency(value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select cryptocurrency" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="solana">Solana (SOL)</SelectItem>
//                       <SelectItem value="cardano">Cardano (ADA)</SelectItem>
//                       <SelectItem value="ripple">Ripple (XRP)</SelectItem>
//                       <SelectItem value="polkadot">Polkadot (DOT)</SelectItem>
//                       <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <p className="text-sm text-muted-foreground mt-4">
//                     Select your preferred cryptocurrency to view payment instructions.
//                   </p>

//                   {cryptoCurrency && cryptoCurrency !== "bitcoin" && cryptoCurrency !== "ethereum" && (
//                     <Button
//                       className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
//                       onClick={() => processCryptoPayment()}
//                     >
//                       <Bitcoin className="h-5 w-5 mr-2" />
//                       Generate {cryptoCurrency.charAt(0).toUpperCase() + cryptoCurrency.slice(1)} Address
//                     </Button>
//                   )}
//                 </TabsContent>
//               </Tabs>
//             </div>

//             <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
//                 <span>
//                   Please ensure you are sending the exact amount required. Cryptocurrency transactions cannot be
//                   reversed. Payment will be confirmed after 1-3 network confirmations.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "applepay":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-8">
//               <div className="bg-black text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Apple className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Apple Pay</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Simple, secure payment with Face ID or Touch ID.
//               </p>
//             </div>

//             <div className="flex justify-center py-6">
//               <Button
//                 className="bg-black hover:bg-black/90 text-white rounded-full h-12 px-6"
//                 onClick={() => processApplePayPayment()}
//               >
//                 <Apple className="h-5 w-5 mr-2" />
//                 <span className="font-medium">Pay with Apple Pay</span>
//               </Button>
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Apple Pay uses device-specific numbers and unique transaction codes, so your card number is never
//                   stored on your device or shared with merchants.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "googlepay":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-8">
//               <div className="bg-white border shadow-sm w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <GooglePay className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Pay with Google Pay</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Fast, simple checkout with Google Pay.</p>
//             </div>

//             <div className="flex justify-center py-6">
//               <Button
//                 className="bg-white text-black hover:bg-gray-100 border shadow-sm h-12 px-6"
//                 onClick={() => processGooglePayPayment()}
//               >
//                 <GooglePay className="h-5 w-5 mr-2" />
//                 <span className="font-medium">Pay with Google Pay</span>
//               </Button>
//             </div>

//             <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
//                 <span>
//                   Google Pay encrypts your payment info with multiple layers of security using industry-standard methods
//                   like tokenization.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "bank":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-emerald-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Landmark className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Bank Transfer</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Transfer directly from your bank account.</p>
//             </div>

//             <div className="border rounded-lg p-5 bg-emerald-50 dark:bg-emerald-950/30 space-y-4">
//               <p className="font-medium">Payment details</p>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Account name:</span>
//                   <span className="font-medium">{process.env.BANK_ACCOUNT_NAME || "ACME Corporation"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Account number:</span>
//                   <span className="font-mono font-medium">{process.env.BANK_ACCOUNT_NUMBER || "12345678"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Routing number:</span>
//                   <span className="font-mono font-medium">{process.env.BANK_ROUTING_NUMBER || "987654321"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">SWIFT/BIC:</span>
//                   <span className="font-mono font-medium">{process.env.BANK_SWIFT_CODE || "ABCDUS33"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Reference:</span>
//                   <span className="font-mono font-medium">INV-{Date.now().toString().slice(-8)}</span>
//                 </div>
//               </div>

//               <div className="pt-2">
//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={() => {
//                     const details = `
//                       Account name: ${process.env.BANK_ACCOUNT_NAME || "ACME Corporation"}
//                       Account number: ${process.env.BANK_ACCOUNT_NUMBER || "12345678"}
//                       Routing number: ${process.env.BANK_ROUTING_NUMBER || "987654321"}
//                       SWIFT/BIC: ${process.env.BANK_SWIFT_CODE || "ABCDUS33"}
//                       Reference: INV-${Date.now().toString().slice(-8)}
//                     `
//                     navigator.clipboard.writeText(details)
//                     toast({
//                       title: "Details Copied",
//                       description: "Bank details copied to clipboard",
//                       variant: "default",
//                     })
//                   }}
//                 >
//                   <Copy className="h-4 w-4 mr-2" />
//                   Copy Details
//                 </Button>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
//                 <span>
//                   Please include the reference number in your transfer. Processing may take 1-3 business days. Your
//                   order will be confirmed once payment is received.
//                 </span>
//               </div>
//             </div>

//             <Button
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
//               onClick={() => processBankTransferPayment()}
//             >
//               <Landmark className="h-5 w-5 mr-2" />
//               Generate Transfer Instructions
//             </Button>
//           </div>
//         )

//       case "giftcard":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-rose-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Gift className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Gift Card</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">Redeem a gift card or promotional code.</p>
//             </div>

//             <div className="border rounded-lg p-5 space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="giftcard">Gift Card Number</Label>
//                 <Input
//                   id="giftcard"
//                   placeholder="XXXX-XXXX-XXXX-XXXX"
//                   value={giftCardCode}
//                   onChange={(e) => setGiftCardCode(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="pin">PIN (if applicable)</Label>
//                 <Input
//                   id="pin"
//                   placeholder="1234"
//                   maxLength={4}
//                   value={giftCardPin}
//                   onChange={(e) => setGiftCardPin(e.target.value)}
//                 />
//               </div>

//               <Button className="w-full mt-2" onClick={() => checkGiftCardBalance()} disabled={!giftCardCode}>
//                 Check Balance
//               </Button>

//               {giftCardBalance !== null && (
//                 <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Available Balance:</span>
//                     <span className="font-bold">${giftCardBalance.toFixed(2)}</span>
//                   </div>

//                   {giftCardBalance < total && (
//                     <div className="mt-2 text-xs text-red-600 dark:text-red-400">
//                       Insufficient balance for this purchase. You need ${(total - giftCardBalance).toFixed(2)} more.
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Gift cards cannot be replaced if lost or stolen. Gift card balance will be applied to your purchase,
//                   and any remaining amount can be paid with another payment method.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       case "wallet":
//         return (
//           <div className="space-y-6">
//             <div className="text-center py-6">
//               <div className="bg-violet-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
//                 <Wallet className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold">Digital Wallet</h3>
//               <p className="text-muted-foreground mt-2 max-w-md mx-auto">
//                 Use your stored balance to complete this payment.
//               </p>
//             </div>

//             <div className="border rounded-lg p-5 bg-violet-50 dark:bg-violet-950/30 space-y-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Current Balance</p>
//                   <p className="text-2xl font-bold">${walletBalance?.toFixed(2) || "0.00"}</p>
//                 </div>
//                 <Button variant="outline" size="sm" onClick={() => getWalletBalance()}>
//                   <RefreshCcw className="h-4 w-4 mr-1" />
//                   Refresh
//                 </Button>
//               </div>

//               <Separator />

//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Order Total</p>
//                   <p className="text-xl font-semibold">${total.toFixed(2)}</p>
//                 </div>
//                 {walletBalance !== null && (
//                   <Badge
//                     variant="outline"
//                     className={cn(
//                       walletBalance >= total
//                         ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
//                         : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
//                     )}
//                   >
//                     {walletBalance >= total ? "Sufficient Funds" : "Insufficient Funds"}
//                   </Badge>
//                 )}
//               </div>

//               <div className="pt-2">
//                 <Button
//                   className="w-full bg-violet-600 hover:bg-violet-700"
//                   disabled={!walletBalance || walletBalance < total}
//                   onClick={() => processWalletPayment()}
//                 >
//                   Pay from Wallet
//                 </Button>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
//               <div className="flex">
//                 <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
//                 <span>
//                   Your digital wallet is protected with our secure encryption technologies. All transactions are instant
//                   and fee-free.
//                 </span>
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   // Payment methods array
//   const paymentMethods: PaymentMethod[] = [
//     {
//       id: "card",
//       name: "Credit Card",
//       icon: <CreditCard />,
//       description: "Pay with Visa, Mastercard, American Express, and more.",
//       popular: true,
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-violet-600 to-indigo-600",
//     },
//     {
//       id: "paypal",
//       name: "PayPal",
//       icon: <PaypalLogo />,
//       description: "Pay with your PayPal account.",
//       popular: true,
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-blue-500 to-blue-600",
//     },
//     {
//       id: "crypto",
//       name: "Crypto",
//       icon: <Bitcoin />,
//       description: "Pay with Bitcoin, Ethereum, and other cryptocurrencies.",
//       processingTime: "1-3 Confirmations",
//       fees: "Network fees apply",
//       color: "from-amber-500 to-amber-600",
//     },
//     {
//       id: "applepay",
//       name: "Apple Pay",
//       icon: <Apple />,
//       description: "Pay quickly and securely with Apple Pay.",
//       popular: true,
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-gray-800 to-gray-900",
//     },
//     {
//       id: "googlepay",
//       name: "Google Pay",
//       icon: <GooglePay />,
//       description: "Fast, simple checkout with Google Pay.",
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-blue-400 to-blue-500",
//     },
//     {
//       id: "bank",
//       name: "Bank Transfer",
//       icon: <BankTransfer />,
//       description: "Transfer directly from your bank account.",
//       processingTime: "1-3 Business Days",
//       fees: "None",
//       color: "from-emerald-500 to-emerald-600",
//     },
//     {
//       id: "giftcard",
//       name: "Gift Card",
//       icon: <Gift />,
//       description: "Redeem a gift card or promotional code.",
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-rose-500 to-rose-600",
//     },
//     {
//       id: "wallet",
//       name: "Wallet",
//       icon: <Wallet />,
//       description: "Pay using your digital wallet balance.",
//       processingTime: "Instant",
//       fees: "None",
//       color: "from-violet-500 to-violet-600",
//     },
//   ]

//   // Function to move to the next form step
//   const continueTo = (step: number) => {
//     setFormStep(step)
//   }

//   // Wrap the entire payment page in Stripe Elements provider
//   return (
//     <Elements stripe={stripePromise}>
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
//         {/* Header */}
//         <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800 sticky top-0 z-10">
//           <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//             <div className="flex items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 grid place-items-center text-white mr-2">
//                   <Sparkles className="h-4 w-4" />
//                 </div>
//                 <span className="font-bold text-lg">PayFlow</span>
//               </div>
//               <div className="hidden md:flex ml-8">
//                 <Badge variant="outline" className="font-normal">
//                   <Lock className="h-3 w-3 mr-1" />
//                   Secure Checkout
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <div className="mr-4 text-sm">
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <div className="flex items-center cursor-help">
//                         <Shield className="h-4 w-4 mr-1 text-green-600 dark:text-green-500" />
//                         <span className="hidden sm:inline">256-bit SSL Encrypted</span>
//                       </div>
//                     </TooltipTrigger>
//                     <TooltipContent className="max-w-sm">
//                       <p>This checkout is secured with industry-standard encryption to keep your information safe.</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </div>

//               <div>
//                 <Button variant="ghost" size="sm" className="hidden md:flex">
//                   <ThumbsUp className="h-4 w-4 mr-1" />
//                   Need Help?
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="space-y-1">
//               <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
//               <p className="text-muted-foreground">
//                 Select your preferred payment method and complete the details below.
//               </p>
//             </div>

//             {/* Form Steps */}
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Progress indicator */}
//               <div className="flex items-center justify-between relative">
//                 <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-800"></div>
//                 {["Payment Method", "Details", "Confirmation"].map((step, index) => (
//                   <div key={index} className="relative z-10 flex flex-col items-center">
//                     <div
//                       className={cn(
//                         "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mb-1",
//                         formStep > index
//                           ? "bg-green-600 text-white"
//                           : formStep === index
//                             ? "bg-primary text-white"
//                             : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
//                       )}
//                     >
//                       {formStep > index ? <Check className="h-4 w-4" /> : index + 1}
//                     </div>
//                     <span
//                       className={cn(
//                         "text-xs",
//                         formStep === index ? "font-medium text-primary" : "text-muted-foreground",
//                       )}
//                     >
//                       {step}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Step 1: Payment Method Selection */}
//               <AnimatePresence mode="wait">
//                 {formStep === 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     {/* Payment method selection */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       {paymentMethods.slice(0, 4).map((method) => (
//                         <div
//                           key={method.id}
//                           className={cn(
//                             "relative rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
//                             paymentMethod === method.id
//                               ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
//                               : "border-gray-200 dark:border-gray-800",
//                           )}
//                           onClick={() => setPaymentMethod(method.id)}
//                         >
//                           {method.popular && (
//                             <div className="absolute top-0 right-0">
//                               <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none bg-gradient-to-r from-violet-600 to-indigo-600 border-0 text-[10px] font-medium">
//                                 POPULAR
//                               </Badge>
//                             </div>
//                           )}
//                           <div
//                             className={cn(
//                               "flex flex-col items-center p-4 h-full",
//                               paymentMethod === method.id && "bg-primary/5",
//                             )}
//                           >
//                             <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
//                             <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div>
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-sm font-medium text-muted-foreground">More Payment Options</h3>
//                         <Separator className="flex-1 mx-4" />
//                       </div>

//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {paymentMethods.slice(4).map((method) => (
//                           <div
//                             key={method.id}
//                             className={cn(
//                               "rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
//                               paymentMethod === method.id
//                                 ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
//                                 : "border-gray-200 dark:border-gray-800",
//                             )}
//                             onClick={() => setPaymentMethod(method.id)}
//                           >
//                             <div
//                               className={cn(
//                                 "flex flex-col items-center p-4",
//                                 paymentMethod === method.id && "bg-primary/5",
//                               )}
//                             >
//                               <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
//                               <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border p-4 mt-6">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           {paymentMethod && <PaymentMethodIcon method={paymentMethod} selected={true} size="large" />}
//                           <div className="ml-4">
//                             <h3 className="font-medium">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.name || "Select a payment method"}
//                             </h3>
//                             <p className="text-sm text-muted-foreground">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.description}
//                             </p>
//                           </div>
//                         </div>
//                         <Button
//                           type="button"
//                           onClick={() => continueTo(1)}
//                           disabled={!paymentMethod}
//                           className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                         >
//                           Continue
//                           <ChevronRight className="h-4 w-4 ml-1" />
//                         </Button>
//                       </div>
//                     </div>

//                     {/* Payment Method Comparison Table */}
//                     <Drawer>
//                       <DrawerTrigger asChild>
//                         <Button variant="outline" className="w-full">
//                           Compare Payment Methods
//                           <ChevronsUpDown className="h-4 w-4 ml-1" />
//                         </Button>
//                       </DrawerTrigger>
//                       <DrawerContent>
//                         <div className="mx-auto w-full max-w-4xl">
//                           <DrawerHeader>
//                             <DrawerTitle>Payment Method Comparison</DrawerTitle>
//                             <DrawerDescription>
//                               Compare the features and benefits of each payment method
//                             </DrawerDescription>
//                           </DrawerHeader>
//                           <div className="p-4 overflow-auto">
//                             <table className="w-full border-collapse">
//                               <thead>
//                                 <tr className="border-b">
//                                   <th className="text-left p-3">Payment Method</th>
//                                   <th className="text-left p-3">Processing Time</th>
//                                   <th className="text-left p-3">Fees</th>
//                                   <th className="text-left p-3">Security</th>
//                                   <th className="text-left p-3">Benefits</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {paymentMethods.map((method) => (
//                                   <tr key={method.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
//                                     <td className="p-3">
//                                       <div className="flex items-center">
//                                         <div
//                                           className={`p-1.5 rounded-full bg-gradient-to-r ${method.color} text-white mr-2`}
//                                         >
//                                           {method.icon}
//                                         </div>
//                                         <span className="font-medium">{method.name}</span>
//                                       </div>
//                                     </td>
//                                     <td className="p-3">{method.processingTime}</td>
//                                     <td className="p-3">{method.fees}</td>
//                                     <td className="p-3">
//                                       <div className="flex items-center">
//                                         <div className="flex space-x-0.5">
//                                           {Array.from({ length: 5 }).map((_, i) => (
//                                             <Star
//                                               key={i}
//                                               className={cn(
//                                                 "h-4 w-4",
//                                                 i < (method.id === "crypto" ? 4 : 5)
//                                                   ? "text-amber-500 fill-amber-500"
//                                                   : "text-gray-300 dark:text-gray-600",
//                                               )}
//                                             />
//                                           ))}
//                                         </div>
//                                       </div>
//                                     </td>
//                                     <td className="p-3">
//                                       <span>
//                                         {method.id === "card" && "Widely accepted, rewards programs"}
//                                         {method.id === "paypal" && "Buyer protection, no need to share card details"}
//                                         {method.id === "crypto" && "Privacy, no chargebacks, global payments"}
//                                         {method.id === "applepay" && "Fast checkout, biometric security"}
//                                         {method.id === "googlepay" && "Fast checkout, stored payment methods"}
//                                         {method.id === "bank" && "No card needed, good for large payments"}
//                                         {method.id === "giftcard" && "Great for gifts, budgeting control"}
//                                         {method.id === "wallet" && "No additional payment method needed"}
//                                       </span>
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                           <DrawerFooter>
//                             <DrawerClose asChild>
//                               <Button variant="outline">Close</Button>
//                             </DrawerClose>
//                           </DrawerFooter>
//                         </div>
//                       </DrawerContent>
//                     </Drawer>
//                   </motion.div>
//                 )}

//                 {/* Step 2: Payment Details */}
//                 {formStep === 1 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     <div className="flex items-center justify-between">
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         onClick={() => setFormStep(0)}
//                         className="text-muted-foreground"
//                       >
//                         <ChevronLeft className="h-4 w-4 mr-1" />
//                         Back to Payment Methods
//                       </Button>
//                       <div className="flex items-center">
//                         <PaymentMethodIcon method={paymentMethod} selected={true} />
//                         <span className="ml-2 font-medium">
//                           {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                         </span>
//                       </div>
//                     </div>

//                     <Card>
//                       <CardContent className="pt-6">
//                         {/* Render the appropriate payment form based on method */}
//                         {renderPaymentMethodForm()}
//                       </CardContent>
//                     </Card>

//                     {paymentError && (
//                       <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
//                         <div className="flex items-start">
//                           <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
//                           <span>{paymentError}</span>
//                         </div>
//                       </div>
//                     )}

//                     <div className="pt-4 flex items-center justify-between">
//                       <Button type="button" variant="outline" onClick={() => setFormStep(0)}>
//                         <ChevronLeft className="h-4 w-4 mr-1" />
//                         Back
//                       </Button>
//                       <Button
//                         type="submit"
//                         disabled={!isFormValid() || paymentProcessing}
//                         className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                       >
//                         {paymentProcessing ? (
//                           <>
//                             <Timer className="h-4 w-4 mr-2 animate-spin" />
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             Continue to Review
//                             <ChevronRight className="h-4 w-4 ml-1" />
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Step 3: Confirmation */}
//                 {formStep === 2 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-6"
//                   >
//                     {paymentComplete ? (
//                       <div className="text-center py-10 relative">
//                         {!animationComplete && <Particles count={100} />}
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: "spring", duration: 0.5 }}
//                           className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto grid place-items-center mb-4"
//                         >
//                           <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
//                         </motion.div>
//                         <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
//                         <p className="text-muted-foreground max-w-md mx-auto mb-6">
//                           Your payment has been processed successfully. You will receive a confirmation email shortly.
//                         </p>
//                         <div className="border rounded-lg p-4 max-w-md mx-auto bg-gray-50 dark:bg-gray-900">
//                           <div className="flex justify-between mb-2">
//                             <span className="text-muted-foreground">Transaction ID:</span>
//                             <span className="font-medium">
//                               {transactionId || "TRX-" + Math.random().toString(36).substring(2, 10).toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="flex justify-between mb-2">
//                             <span className="text-muted-foreground">Payment Method:</span>
//                             <span className="font-medium">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                             </span>
//                           </div>
//                           <div className="flex justify-between mb-2">
//                             <span className="text-muted-foreground">Amount:</span>
//                             <span className="font-bold">${total.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Date:</span>
//                             <span className="font-medium">{new Date().toLocaleDateString()}</span>
//                           </div>
//                         </div>
//                         <div className="mt-8">
//                           <Button
//                             type="button"
//                             className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                             onClick={() => (window.location.href = "/dashboard")}
//                           >
//                             Continue to Your Account
//                             <ArrowRight className="h-4 w-4 ml-2" />
//                           </Button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-6">
//                         <div className="flex items-center justify-between">
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             onClick={() => setFormStep(1)}
//                             className="text-muted-foreground"
//                           >
//                             <ChevronLeft className="h-4 w-4 mr-1" />
//                             Back to Payment
//                           </Button>
//                           <div className="flex items-center">
//                             <PaymentMethodIcon method={paymentMethod} selected={true} />
//                             <span className="ml-2 font-medium">
//                               {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                             </span>
//                           </div>
//                         </div>

//                         <Card>
//                           <CardHeader>
//                             <CardTitle>Review & Confirm</CardTitle>
//                             <CardDescription>Please review your payment details before confirming</CardDescription>
//                           </CardHeader>
//                           <CardContent className="space-y-6">
//                             <div className="space-y-4">
//                               <div className="flex justify-between pb-2 border-b">
//                                 <h3 className="font-medium">Payment Details</h3>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => setFormStep(1)}
//                                   className="h-auto p-0 text-primary hover:text-primary/80"
//                                 >
//                                   Edit
//                                 </Button>
//                               </div>

//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                   <h4 className="text-sm text-muted-foreground mb-1">Payment Method</h4>
//                                   <div className="flex items-center">
//                                     <PaymentMethodIcon method={paymentMethod} selected={true} />
//                                     <span className="ml-2 font-medium">
//                                       {paymentMethods.find((m) => m.id === paymentMethod)?.name}
//                                     </span>
//                                   </div>
//                                 </div>

//                                 {paymentMethod === "card" && (
//                                   <>
//                                     <div>
//                                       <h4 className="text-sm text-muted-foreground mb-1">Card Number</h4>
//                                       <div className="font-medium">•••• •••• •••• {cardNumber.slice(-4)}</div>
//                                     </div>
//                                     <div>
//                                       <h4 className="text-sm text-muted-foreground mb-1">Card Holder</h4>
//                                       <div className="font-medium">{cardName}</div>
//                                     </div>
//                                     <div>
//                                       <h4 className="text-sm text-muted-foreground mb-1">Expiry Date</h4>
//                                       <div className="font-medium">{expiryDate}</div>
//                                     </div>
//                                   </>
//                                 )}
//                               </div>
//                             </div>

//                             <Separator />

//                             <div className="space-y-4">
//                               <div className="flex justify-between pb-2 border-b">
//                                 <h3 className="font-medium">Billing Summary</h3>
//                               </div>

//                               <div className="space-y-2">
//                                 {items.map((item, index) => (
//                                   <div key={index} className="flex justify-between items-center">
//                                     <div className="flex items-center">
//                                       <span>{item.name}</span>
//                                       {item.waived && (
//                                         <Badge
//                                           variant="outline"
//                                           className="ml-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//                                         >
//                                           Waived
//                                         </Badge>
//                                       )}
//                                       {item.saving && (
//                                         <Badge
//                                           variant="outline"
//                                           className="ml-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
//                                         >
//                                           Save {item.saving}
//                                         </Badge>
//                                       )}
//                                     </div>
//                                     <span className="font-medium">
//                                       ${item.price === 0 ? "0.00" : item.price.toFixed(2)}
//                                     </span>
//                                   </div>
//                                 ))}

//                                 <Separator className="my-2" />

//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Subtotal</span>
//                                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                                 </div>

//                                 {useSpecialOffer && (
//                                   <div className="flex justify-between text-green-600 dark:text-green-400">
//                                     <span>Special Offer Discount</span>
//                                     <span>-$25.00</span>
//                                   </div>
//                                 )}

//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Tax (8%)</span>
//                                   <span className="font-medium">${tax.toFixed(2)}</span>
//                                 </div>

//                                 <Separator className="my-2" />

//                                 <div className="flex justify-between text-lg">
//                                   <span className="font-bold">Total</span>
//                                   <span className="font-bold">${total.toFixed(2)}</span>
//                                 </div>
//                               </div>
//                             </div>

//                             {paymentError && (
//                               <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
//                                 <div className="flex items-start">
//                                   <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
//                                   <span>{paymentError}</span>
//                                 </div>
//                               </div>
//                             )}

//                             <div className="pt-4 space-y-4">
//                               <div className="flex items-center space-x-2">
//                                 <Checkbox id="terms" required />
//                                 <label
//                                   htmlFor="terms"
//                                   className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                   I agree to the{" "}
//                                   <a href="/terms" className="text-primary underline hover:text-primary/90">
//                                     Terms and Conditions
//                                   </a>{" "}
//                                   and{" "}
//                                   <a href="/privacy" className="text-primary underline hover:text-primary/90">
//                                     Privacy Policy
//                                   </a>
//                                 </label>
//                               </div>

//                               <div className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id="subscribe"
//                                   checked={useSpecialOffer}
//                                   onCheckedChange={(checked) => setUseSpecialOffer(!!checked)}
//                                 />
//                                 <div className="grid gap-1.5 leading-none">
//                                   <label
//                                     htmlFor="subscribe"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
//                                   >
//                                     Apply Special Offer Code
//                                     <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
//                                       $25 OFF
//                                     </Badge>
//                                   </label>
//                                   <p className="text-sm text-muted-foreground">
//                                     Special discount for first-time customers
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </CardContent>
//                           <CardFooter className="flex justify-between">
//                             <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
//                               <ChevronLeft className="h-4 w-4 mr-1" />
//                               Back
//                             </Button>
//                             <Button
//                               type="submit"
//                               disabled={paymentProcessing}
//                               className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                             >
//                               {paymentProcessing ? (
//                                 <>
//                                   <Timer className="h-4 w-4 mr-2 animate-spin" />
//                                   Processing Payment...
//                                 </>
//                               ) : (
//                                 <>
//                                   Confirm Payment
//                                   <Lock className="h-4 w-4 ml-1" />
//                                 </>
//                               )}
//                             </Button>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </form>
//           </div>

//           {/* Order Summary Sidebar */}
//           <AnimatePresence>
//             {(sidebarVisible || showOrderSummary) && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.2 }}
//                 className="lg:block bg-gray-50 dark:bg-gray-900 rounded-xl border p-6 h-fit sticky top-24"
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="font-bold text-lg">Order Summary</h2>
//                   {mobileView && (
//                     <Button variant="ghost" size="sm" onClick={() => setShowOrderSummary(false)} className="lg:hidden">
//                       <X className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>

//                 <div className="space-y-4">
//                   {items.map((item, index) => (
//                     <div key={index} className="flex justify-between">
//                       <div>
//                         <div className="font-medium">{item.name}</div>
//                         <div className="flex mt-1">
//                           {item.waived && (
//                             <Badge
//                               variant="outline"
//                               className="text-[10px] text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//                             >
//                               Waived
//                             </Badge>
//                           )}
//                           {item.saving && (
//                             <Badge
//                               variant="outline"
//                               className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
//                             >
//                               Save {item.saving}
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                       <span className="font-medium">${item.price === 0 ? "0.00" : item.price.toFixed(2)}</span>
//                     </div>
//                   ))}

//                   <Separator />

//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-medium">${subtotal.toFixed(2)}</span>
//                   </div>

//                   {useSpecialOffer && (
//                     <div className="flex justify-between text-green-600 dark:text-green-400">
//                       <span>Special Offer Discount</span>
//                       <span>-$25.00</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Tax (8%)</span>
//                     <span className="font-medium">${tax.toFixed(2)}</span>
//                   </div>

//                   <Separator />

//                   <div className="flex justify-between text-lg">
//                     <span className="font-bold">Total</span>
//                     <span className="font-bold">${total.toFixed(2)}</span>
//                   </div>

//                   <div className="pt-2 text-sm text-muted-foreground space-y-2">
//                     <div className="flex items-center">
//                       <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                       <span>Secure 256-bit SSL encryption</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                       <span>Data protection & privacy</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
//                       <span>Money-back guarantee</span>
//                     </div>
//                   </div>

//                   {mobileView && (
//                     <Button
//                       className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//                       onClick={() => setShowOrderSummary(false)}
//                     >
//                       Continue
//                       <ChevronRight className="h-4 w-4 ml-1" />
//                     </Button>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {mobileView && !showOrderSummary && (
//           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950 border-t dark:border-gray-800 flex items-center justify-between z-10">
//             <div>
//               <div className="text-sm text-muted-foreground">Total</div>
//               <div className="font-bold text-lg">${total.toFixed(2)}</div>
//             </div>
//             <Button
//               onClick={() => setShowOrderSummary(true)}
//               className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
//             >
//               View Summary
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//           </div>
//         )}
//       </div>
//     </Elements>
//   )
// }

// export default PaymentPage

"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  CreditCard,
  DollarSignIcon as PaypalLogo,
  Bitcoin,
  Apple,
  BanknoteIcon as BankTransfer,
  Gift,
  Check,
  ChevronRight,
  ChevronLeft,
  Lock,
  X,
  ChevronsUpDown,
  Shield,
  Sparkles,
  Landmark,
  Wallet,
  AlertCircle,
  Info,
  Star,
  CreditCardIcon as GooglePay,
  CheckCircle2,
  ThumbsUp,
  Timer,
  RefreshCcw,
  ArrowRight,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Import payment processing libraries
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js"
// Replace the import for useUser from Clerk with your server actions
// Replace this:
//import { useUser } from "@clerk/nextjs";

// With this:
import { onSubscribe, onCurrentUser, onUserInfo } from "@/actions/user/index"
import { useState, useEffect, useRef, type FormEvent } from "react"
// Replace NextAuth imports with Clerk imports
//import { useUser } from "@clerk/nextjs"

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// Card types for validation and display
const CARD_TYPES = {
  visa: {
    pattern: /^4/,
    icon: "/assets/payment/visa.svg",
  },
  mastercard: {
    pattern: /^5[1-5]/,
    icon: "/assets/payment/mastercard.svg",
  },
  amex: {
    pattern: /^3[47]/,
    icon: "/assets/payment/amex.svg",
  },
  discover: {
    pattern: /^(6011|65|64[4-9]|622)/,
    icon: "/assets/payment/discover.svg",
  },
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  popular?: boolean
  processingTime: string
  fees: string
  color: string
}

// Add this interface near the top of the file, after the other interfaces
interface PaymentResult {
  success: boolean
  transactionId?: string
  sessionId?: string
  error?: string
  last4?: string
  paymentAddress?: string
  expiresAt?: string
  redemptionId?: string
}

const PaymentMethodIcon = ({
  method,
  selected,
  size = "default",
}: {
  method: string
  selected: boolean
  size?: "default" | "large"
}) => {
  const icons: Record<string, React.ReactNode> = {
    card: <CreditCard className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
    paypal: <PaypalLogo className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
    crypto: <Bitcoin className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
    applepay: <Apple className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
    googlepay: <GooglePay className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
    bank: <BankTransfer className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
    giftcard: <Gift className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
    wallet: <Wallet className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />,
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full transition-all",
        size === "large" ? "h-16 w-16 p-3" : "h-10 w-10 p-2",
        selected
          ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
      )}
    >
      {icons[method]}
    </div>
  )
}

// Main payment component
const PaymentPage = () => {
  // Replace this line:
  // const { data: session } = useSession()
  // With this:
  //const { user, isSignedIn } = useUser()
  const [user, setUser] = useState<any>(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const { toast } = useToast()

  // State variables
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [formStep, setFormStep] = useState<number>(0)
  const [flipCard, setFlipCard] = useState(false)
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [useSpecialOffer, setUseSpecialOffer] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [cardType, setCardType] = useState<keyof typeof CARD_TYPES | null>(null)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [mobileView, setMobileView] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "failed">("idle")
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [walletBalance, setWalletBalance] = useState<number | null>(null)
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const [giftCardCode, setGiftCardCode] = useState("")
  const [giftCardPin, setGiftCardPin] = useState("")
  const [giftCardBalance, setGiftCardBalance] = useState<number | null>(null)
  const [cryptoCurrency, setCryptoCurrency] = useState("bitcoin")
  const [cryptoAddress, setCryptoAddress] = useState<string | null>(null)

  // Refs for form elements
  const cardNumberRef = useRef<HTMLInputElement>(null)
  const expiryRef = useRef<HTMLInputElement>(null)
  const cvvRef = useRef<HTMLInputElement>(null)

  // Order items and pricing
  const items = [
    { name: "Premium Plan (Annual)", price: 199.99, saving: "20%" },
    { name: "Setup Fee", price: 0, waived: true },
    { name: "Priority Support", price: 49.99 },
  ]

  const subtotal = items.reduce((acc, item) => acc + item.price, 0)
  const discount = useSpecialOffer ? 25 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + tax

  // Create payment intent when component loads or discount changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      createPaymentIntent()
    }
  }, [useSpecialOffer])

  // Create payment intent
  const createPaymentIntent = async () => {
    try {
      setPaymentError(null)

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to cents for Stripe
          currency: "usd",
          payment_method_types: ["card"],
          metadata: {
            order_items: JSON.stringify(items),
            discount_applied: useSpecialOffer,
            // Replace all instances of session?.user?.id with user?.id
            userId: user?.id || "guest",
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create payment intent")
      }

      const data = await response.json()
      setClientSecret(data.clientSecret)
      setPaymentIntent(data.id)
    } catch (error) {
      console.error("Error creating payment intent:", error)
      setPaymentError("Failed to initialize payment. Please try again.")

      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (formStep === 1 && paymentMethod === "card") {
      // Move to review step
      continueTo(2)
    } else if (formStep === 2) {
      // Process the payment
      await processPayment()
    }
  }

  // Then update the processPayment function to use this type
  const processPayment = async () => {
    setPaymentProcessing(true)
    setPaymentStatus("processing")
    setPaymentError(null)

    try {
      let paymentResult: PaymentResult

      switch (paymentMethod) {
        case "card":
          paymentResult = await processCardPayment()
          break
        case "paypal":
          paymentResult = await processPayPalPayment()
          break
        case "crypto":
          paymentResult = await processCryptoPayment()
          break
        case "applepay":
          paymentResult = await processApplePayPayment()
          break
        case "googlepay":
          paymentResult = await processGooglePayPayment()
          break
        case "bank":
          paymentResult = await processBankTransferPayment()
          break
        case "giftcard":
          paymentResult = await processGiftCardPayment()
          break
        case "wallet":
          paymentResult = await processWalletPayment()
          break
        default:
          throw new Error("Invalid payment method")
      }

      if (paymentResult.success) {
        setTransactionId(paymentResult.transactionId || null)
        setPaymentStatus("succeeded")
        setPaymentComplete(true)
        setFormStep(2)

        // If we have a session ID (from Stripe), update the user's subscription
        if (paymentResult.sessionId) {
          try {
            const subscriptionResult = await onSubscribe(paymentResult.sessionId)
            if (subscriptionResult.status === 200) {
              console.log("Subscription updated successfully")
            } else {
              console.warn("Subscription update failed:", subscriptionResult)
            }
          } catch (error) {
            console.error("Error updating subscription:", error)
          }
        }

        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
          variant: "default",
          className:
            "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
        })
      } else {
        throw new Error(paymentResult.error || "Payment failed")
      }
    } catch (error) {
      console.error("Payment processing error:", error)
      setPaymentStatus("failed")
      const errorMessage = error instanceof Error ? error.message : "Payment processing failed. Please try again."
      setPaymentError(errorMessage)

      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setPaymentProcessing(false)
    }
  }

  // Update the return type of processCardPayment
  const processCardPayment = async (): Promise<PaymentResult> => {
    // This will be implemented in the CardPaymentForm component
    return { success: true, transactionId: "card-" + Date.now() }
  }

  // Update the return type of processPayPalPayment
  const processPayPalPayment = async (): Promise<PaymentResult> => {
    // Redirect to PayPal for payment
    window.location.href = `/api/paypal/create-order?amount=${total}&currency=USD`
    return { success: true }
  }

  // Update the remaining payment processing functions to use the PaymentResult type

  // Process cryptocurrency payment
  const processCryptoPayment = async (): Promise<PaymentResult> => {
    try {
      const response = await fetch("/api/crypto/create-charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "USD",
          name: "Premium Plan Purchase",
          customerId: user?.id || "guest",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create crypto payment")
      }

      const data = await response.json()

      setCryptoAddress(data.addresses[cryptoCurrency])

      return {
        success: true,
        transactionId: data.id,
        paymentAddress: data.addresses[cryptoCurrency],
        expiresAt: data.expires_at,
      }
    } catch (error) {
      console.error("Crypto payment error:", error)
      return { success: false, error: "Failed to process cryptocurrency payment" }
    }
  }

  // Process Apple Pay payment
  const processApplePayPayment = async (): Promise<PaymentResult> => {
    try {
      const response = await fetch("/api/apple-pay/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "usd",
          items,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create Apple Pay session")
      }

      const data = await response.json()

      // In a real implementation, you would use the Apple Pay JS API
      // with the session data returned from the server

      return { success: true, transactionId: `AP-${Date.now()}` }
    } catch (error) {
      console.error("Apple Pay error:", error)
      return { success: false, error: "Failed to process Apple Pay payment" }
    }
  }

  // Process Google Pay payment
  const processGooglePayPayment = async (): Promise<PaymentResult> => {
    try {
      const response = await fetch("/api/google-pay/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "usd",
          items,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create Google Pay session")
      }

      const data = await response.json()

      // In a real implementation, you would use the Google Pay API
      // with the session data returned from the server

      return { success: true, transactionId: `GP-${Date.now()}` }
    } catch (error) {
      console.error("Google Pay error:", error)
      return { success: false, error: "Failed to process Google Pay payment" }
    }
  }

  // Process bank transfer payment
  const processBankTransferPayment = async (): Promise<PaymentResult> => {
    try {
      const response = await fetch("/api/bank-transfer/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "USD",
          description: "Premium Plan Purchase",
          userId: user?.id || "guest",
          email: user?.emailAddresses?.[0]?.emailAddress || userProfile?.email || "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to initiate bank transfer")
      }

      const data = await response.json()
      return { success: true, transactionId: data.reference }
    } catch (error) {
      console.error("Bank transfer error:", error)
      return { success: false, error: "Failed to initiate bank transfer" }
    }
  }

  // Process gift card payment
  const processGiftCardPayment = async (): Promise<PaymentResult> => {
    try {
      const response = await fetch("/api/gift-card/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: giftCardCode,
          amount: total,
          userId: user?.id || "guest",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to redeem gift card")
      }

      const data = await response.json()
      return { success: true, transactionId: data.redemptionId }
    } catch (error) {
      console.error("Gift card error:", error)
      return { success: false, error: error instanceof Error ? error.message : "Failed to process gift card payment" }
    }
  }

  // Process wallet payment
  const processWalletPayment = async (): Promise<PaymentResult> => {
    try {
      const response = await fetch("/api/wallet/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Clerk-User-Id": user?.id || "",
        },
        body: JSON.stringify({
          amount: total,
          currency: "USD",
          description: "Premium Plan Purchase",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process wallet payment")
      }

      const data = await response.json()
      setWalletBalance(data.new_balance)
      return { success: true, transactionId: data.transactionId }
    } catch (error) {
      console.error("Wallet payment error:", error)
      return { success: false, error: error instanceof Error ? error.message : "Failed to process wallet payment" }
    }
  }

  // Check gift card balance
  const checkGiftCardBalance = async () => {
    try {
      const response = await fetch(`/api/gift-card/redeem?code=${giftCardCode}`)

      if (!response.ok) {
        throw new Error("Invalid gift card")
      }

      const data = await response.json()

      if (!data.is_valid) {
        throw new Error(`Gift card is ${data.status}`)
      }

      setGiftCardBalance(data.balance)

      toast({
        title: "Gift Card Valid",
        description: `Available balance: $${data.balance.toFixed(2)}`,
        variant: "default",
        className:
          "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
      })

      return data.balance
    } catch (error) {
      console.error("Gift card error:", error)

      toast({
        title: "Gift Card Error",
        description: error instanceof Error ? error.message : "Invalid gift card",
        variant: "destructive",
      })

      return null
    }
  }

  // Get wallet balance
  const getWalletBalance = async () => {
    try {
      const response = await fetch("/api/wallet/charge", {
        headers: {
          "X-Clerk-User-Id": user?.id || "",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to get wallet balance")
      }

      const data = await response.json()
      setWalletBalance(data.balance)
      return data.balance
    } catch (error) {
      console.error("Wallet error:", error)
      return null
    }
  }

  // Format credit card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return value
  }

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)

    // Detect card type
    const cardNumberWithoutSpaces = formattedValue.replace(/\s/g, "")
    for (const [type, { pattern }] of Object.entries(CARD_TYPES)) {
      if (pattern.test(cardNumberWithoutSpaces)) {
        setCardType(type as keyof typeof CARD_TYPES)
        break
      } else {
        setCardType(null)
      }
    }

    // Auto-advance to expiry when full card number entered
    if (cardNumberWithoutSpaces.length === 16 && expiryRef.current) {
      expiryRef.current.focus()
    }
  }

  // Handle expiry date input
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setExpiryDate(formattedValue)

    // Auto-advance to CVV when full expiry entered
    if (formattedValue.length === 5 && cvvRef.current) {
      cvvRef.current.focus()
      setFlipCard(true)
    }
  }

  // Handle CVV input
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setCvv(value)
    }
  }

  const handleCvvFocus = () => {
    setFlipCard(true)
  }

  const handleCvvBlur = () => {
    setFlipCard(false)
  }

  // Check form validity based on payment method
  const isFormValid = () => {
    switch (paymentMethod) {
      case "card":
        return (
          cardName.length > 0 &&
          cardNumber.replace(/\s/g, "").length >= 15 &&
          expiryDate.length === 5 &&
          cvv.length >= 3
        )
      case "paypal":
        return true
      case "crypto":
        return true
      case "applepay":
        return true
      case "googlepay":
        return true
      case "bank":
        return true
      case "giftcard":
        return giftCardCode.length > 0 && giftCardBalance !== null && giftCardBalance >= total
      case "wallet":
        return walletBalance !== null && walletBalance >= total
      default:
        return false
    }
  }

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768)
      setSidebarVisible(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Load wallet balance when wallet payment method is selected
  useEffect(() => {
    if (paymentMethod === "wallet" && isSignedIn && user) {
      getWalletBalance()
    }
  }, [paymentMethod, isSignedIn, user])

  // Stripe Card Payment Form component
  const CardPaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState<string | null>(null)
    const [cardComplete, setCardComplete] = useState(false)

    useEffect(() => {
      if (!stripe || !elements) {
        return
      }

      // Create a payment request for Apple Pay / Google Pay
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Premium Plan",
          amount: Math.round(total * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      // Check if the Payment Request is available
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr)
        }
      })
    }, [stripe, elements])

    const handleCardChange = (event: any) => {
      setCardError(event.error ? event.error.message : null)
      setCardComplete(event.complete)

      // Try to determine card type from the brand
      if (event.brand) {
        const brand = event.brand.toLowerCase()
        if (Object.keys(CARD_TYPES).includes(brand)) {
          setCardType(brand as keyof typeof CARD_TYPES)
        }
      }
    }

    // Update the CardPaymentForm component's handleCardPayment function
    const handleCardPayment = async (): Promise<PaymentResult> => {
      if (!stripe || !elements || !clientSecret) {
        return { success: false, error: "Payment system not initialized" }
      }

      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        return { success: false, error: "Card element not found" }
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardName,
            email: user?.emailAddresses[0]?.emailAddress || userProfile?.email || undefined,
          },
        },
        save_payment_method: saveCard,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (paymentIntent?.status === "succeeded") {
        // Use type assertion to access payment_method_details
        const paymentIntentWithDetails = paymentIntent as any
        const last4 = paymentIntentWithDetails.payment_method_details?.card?.last4

        // Call the server action to update the subscription
        try {
          const subscriptionResult = await onSubscribe(paymentIntent.id)
          if (subscriptionResult.status !== 200) {
            console.warn("Subscription update warning:", subscriptionResult)
          }
        } catch (subscriptionError) {
          console.error("Error updating subscription:", subscriptionError)
          // Payment succeeded but subscription update failed
          // You might want to log this or handle it differently
        }

        return {
          success: true,
          transactionId: paymentIntent.id,
          sessionId: paymentIntent.id,
          last4: last4,
        }
      }

      return { success: false, error: "Payment failed" }
    }

    // Add this useEffect to fetch user data when the component loads
    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Use the server action to get the current user
          const userData = await onCurrentUser()
          if (userData && !("redirect" in userData)) {
            setUser(userData)
            setIsSignedIn(true)

            // Fetch user profile information
            const userInfoResponse = await onUserInfo()
            if (userInfoResponse.status === 200 && userInfoResponse.data) {
              setUserProfile({
                email: userData.emailAddresses[0].emailAddress,
                name: `${userInfoResponse.data.firstname || ""} ${userInfoResponse.data.lastname || ""}`.trim(),
              })
            }
          } else {
            // User is not authenticated, redirect to sign-in
            window.location.href = "/sign-in"
          }
        } catch (error) {
          console.error("Error fetching user:", error)
          toast({
            title: "Authentication Error",
            description: "Please sign in to continue.",
            variant: "destructive",
          })
        }
      }

      fetchUser()
    }, [])

    return (
      <div className="space-y-6">
        <div className="relative perspective-1000">
          <motion.div
            className="relative w-full h-56 transition-all duration-500 preserve-3d"
            animate={{ rotateY: flipCard ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Front of card - keep the same beautiful design */}
            <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <div className="text-white/70 text-xs uppercase tracking-wider">Credit Card</div>
                    <div className="text-white/90 text-xs mt-1">
                      {cardType ? <span className="uppercase">{cardType}</span> : <span>Visa / Mastercard / Amex</span>}
                    </div>
                  </div>
                  {cardType && (
                    <div className="h-10 w-14 bg-white/20 rounded-md grid place-items-center p-1">
                      <img
                        src={CARD_TYPES[cardType].icon || "/placeholder.svg"}
                        alt={cardType}
                        className="max-h-full"
                      />
                    </div>
                  )}
                </div>

                <div className="my-6">
                  <div className="text-xl text-white font-mono tracking-wider">•••• •••• •••• ••••</div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Card Holder</div>
                    <div className="text-white font-medium truncate max-w-[180px]">{cardName || "YOUR NAME"}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Expires</div>
                    <div className="text-white font-medium">MM/YY</div>
                  </div>
                </div>

                {/* Circuit design elements */}
                <div className="absolute top-[40%] left-0 w-12 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
                <div className="absolute top-[30%] right-5 w-8 h-8 border-r-2 border-b-2 border-white/10 rounded-br-lg"></div>
                <div className="absolute bottom-6 left-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
                <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full"></div>
                <div className="absolute top-5 left-[30%] w-3 h-3 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-10 right-[20%] w-6 h-1 bg-white/20 rounded"></div>
              </div>
            </div>

            {/* Back of card - keep the same beautiful design */}
            <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden rotateY-180">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-violet-600 p-5 flex flex-col">
                <div className="w-full h-12 bg-black/30 mt-4"></div>

                <div className="mt-6 flex justify-end">
                  <div className="bg-white/90 h-10 w-full max-w-[80%] rounded relative flex items-center px-3">
                    <div className="absolute text-right w-full pr-12 font-mono text-gray-600 tracking-widest">•••</div>
                  </div>
                </div>

                <div className="mt-auto text-xs text-white/70 max-w-[80%]">
                  This card is property of your bank. Unauthorized use is prohibited. If found, please return to your
                  bank.
                </div>

                {/* Circuit design elements */}
                <div className="absolute top-[40%] right-0 w-12 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
                <div className="absolute bottom-10 left-5 w-8 h-8 border-l-2 border-b-2 border-white/10 rounded-bl-lg"></div>
                <div className="absolute bottom-6 right-[40%] w-12 h-3 border-b border-white/10 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          {/* Apple Pay / Google Pay button if available */}
          {paymentRequest && (
            <div className="mb-6">
              <h3 className="text-base font-medium mb-3">Express Checkout</h3>
              <PaymentRequestButtonElement
                options={{
                  paymentRequest,
                  style: {
                    paymentRequestButton: {
                      theme: "dark",
                      height: "44px",
                    },
                  },
                }}
              />
              <Separator className="my-6" />
              <h3 className="text-base font-medium mb-3">Or Pay with Card</h3>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Details</Label>
              <div className="card-element p-3 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                  onChange={handleCardChange}
                />
              </div>
              {cardError && <div className="text-sm text-red-500 mt-1">{cardError}</div>}
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="saveCard" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
              <label
                htmlFor="saveCard"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save card for future payments
              </label>
            </div>
          </div>

          <div className="mt-2 text-sm text-muted-foreground flex items-center">
            <Lock className="h-4 w-4 mr-1" />
            <span>Your payment information is encrypted and secure.</span>
          </div>
        </div>
      </div>
    )
  }

  // Particles for the success animation
  const Particles = ({ count = 50 }: { count?: number }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary"
            initial={{
              scale: 0,
              x: "50%",
              y: "50%",
              opacity: 1,
            }}
            animate={{
              scale: Math.random() * 1 + 0.5,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 1 + 0.5,
              delay: Math.random() * 0.2,
            }}
            onAnimationComplete={() => {
              if (i === count - 1) setAnimationComplete(true)
            }}
            style={{
              backgroundColor: `hsl(${Math.random() * 60 + 230}, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 50}%)`,
            }}
          />
        ))}
      </div>
    )
  }

  // Render payment method form based on selected method
  const renderPaymentMethodForm = () => {
    switch (paymentMethod) {
      case "card":
        return <CardPaymentForm />

      case "paypal":
        return (
          <div className="space-y-6">
            <div className="text-center py-10">
              <div className="bg-[#003087] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
                <PaypalLogo className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Pay with PayPal</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                You will be redirected to PayPal to complete your payment securely. You will have a chance to review your
                order before the payment is finalized.
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                <span>
                  PayPal protects your payment information with industry-leading security and fraud prevention systems.
                  You are always protected if the item doesnt arrive or is significantly different than described.
                </span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full bg-[#0070ba] hover:bg-[#003087] text-white"
              onClick={() => processPayPalPayment()}
            >
              <PaypalLogo className="h-5 w-5 mr-2" />
              Proceed to PayPal
            </Button>
          </div>
        )

      case "crypto":
        return (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="bg-[#F7931A] text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
                <Bitcoin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Pay with Cryptocurrency</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Pay with your favorite cryptocurrency. We accept Bitcoin, Ethereum, and many other digital currencies.
              </p>
            </div>

            <div className="border rounded-lg p-5 bg-amber-50 dark:bg-amber-950/30">
              <Tabs defaultValue="bitcoin" className="w-full" onValueChange={(value) => setCryptoCurrency(value)}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
                  <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                  <TabsTrigger value="other">Others</TabsTrigger>
                </TabsList>
                <TabsContent value="bitcoin" className="space-y-4">
                  <div className="flex flex-col items-center">
                    {cryptoAddress ? (
                      <>
                        <div className="bg-white p-2 rounded-lg mb-3">
                          <img
                            src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${cryptoAddress}&choe=UTF-8`}
                            alt="Bitcoin QR Code"
                            className="h-40 w-40"
                          />
                        </div>
                        <div className="text-sm text-center">
                          <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
                            {cryptoAddress}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-1"
                            onClick={() => {
                              navigator.clipboard.writeText(cryptoAddress || "")
                              toast({
                                title: "Address Copied",
                                description: "Bitcoin address copied to clipboard",
                                variant: "default",
                              })
                            }}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Address
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button
                        className="w-full bg-[#F7931A] hover:bg-[#E77F18] text-white"
                        onClick={() => processCryptoPayment()}
                      >
                        <Bitcoin className="h-5 w-5 mr-2" />
                        Generate Bitcoin Address
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-4">
                    <p className="flex items-start">
                      <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                      Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
                      worth of Bitcoin to this address. Current exchange rate: 1 BTC ≈ $59,783.21 USD
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="ethereum" className="space-y-4">
                  <div className="flex flex-col items-center">
                    {cryptoAddress ? (
                      <>
                        <div className="bg-white p-2 rounded-lg mb-3">
                          <img
                            src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${cryptoAddress}&choe=UTF-8`}
                            alt="Ethereum QR Code"
                            className="h-40 w-40"
                          />
                        </div>
                        <div className="text-sm text-center">
                          <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
                            {cryptoAddress}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-1"
                            onClick={() => {
                              navigator.clipboard.writeText(cryptoAddress || "")
                              toast({
                                title: "Address Copied",
                                description: "Ethereum address copied to clipboard",
                                variant: "default",
                              })
                            }}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Address
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button
                        className="w-full bg-[#627EEA] hover:bg-[#4C63BB] text-white"
                        onClick={() => processCryptoPayment()}
                      >
                        <Bitcoin className="h-5 w-5 mr-2" />
                        Generate Ethereum Address
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-4">
                    <p className="flex items-start">
                      <Info className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                      Send exactly <span className="font-bold mx-1">{total.toFixed(2)} USD</span>
                      worth of Ethereum to this address. Current exchange rate: 1 ETH ≈ $3,124.45 USD
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="other" className="py-3">
                  <Select onValueChange={(value) => setCryptoCurrency(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solana">Solana (SOL)</SelectItem>
                      <SelectItem value="cardano">Cardano (ADA)</SelectItem>
                      <SelectItem value="ripple">Ripple (XRP)</SelectItem>
                      <SelectItem value="polkadot">Polkadot (DOT)</SelectItem>
                      <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-4">
                    Select your preferred cryptocurrency to view payment instructions.
                  </p>

                  {cryptoCurrency && cryptoCurrency !== "bitcoin" && cryptoCurrency !== "ethereum" && (
                    <Button
                      className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => processCryptoPayment()}
                    >
                      <Bitcoin className="h-5 w-5 mr-2" />
                      Generate {cryptoCurrency.charAt(0).toUpperCase() + cryptoCurrency.slice(1)} Address
                    </Button>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
                <span>
                  Please ensure you are sending the exact amount required. Cryptocurrency transactions cannot be
                  reversed. Payment will be confirmed after 1-3 network confirmations.
                </span>
              </div>
            </div>
          </div>
        )

      case "applepay":
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="bg-black text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
                <Apple className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Pay with Apple Pay</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Simple, secure payment with Face ID or Touch ID.
              </p>
            </div>

            <div className="flex justify-center py-6">
              <Button
                className="bg-black hover:bg-black/90 text-white rounded-full h-12 px-6"
                onClick={() => processApplePayPayment()}
              >
                <Apple className="h-5 w-5 mr-2" />
                <span className="font-medium">Pay with Apple Pay</span>
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
              <div className="flex">
                <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                <span>
                  Apple Pay uses device-specific numbers and unique transaction codes, so your card number is never
                  stored on your device or shared with merchants.
                </span>
              </div>
            </div>
          </div>
        )

      case "googlepay":
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="bg-white border shadow-sm w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
                <GooglePay className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Pay with Google Pay</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">Fast, simple checkout with Google Pay.</p>
            </div>

            <div className="flex justify-center py-6">
              <Button
                className="bg-white text-black hover:bg-gray-100 border shadow-sm h-12 px-6"
                onClick={() => processGooglePayPayment()}
              >
                <GooglePay className="h-5 w-5 mr-2" />
                <span className="font-medium">Pay with Google Pay</span>
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 text-sm">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                <span>
                  Google Pay encrypts your payment info with multiple layers of security using industry-standard methods
                  like tokenization.
                </span>
              </div>
            </div>
          </div>
        )

      case "bank":
        return (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="bg-emerald-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
                <Landmark className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Bank Transfer</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">Transfer directly from your bank account.</p>
            </div>

            <div className="border rounded-lg p-5 bg-emerald-50 dark:bg-emerald-950/30 space-y-4">
              <p className="font-medium">Payment details</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account name:</span>
                  <span className="font-medium">{process.env.BANK_ACCOUNT_NAME || "ACME Corporation"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account number:</span>
                  <span className="font-mono font-medium">{process.env.BANK_ACCOUNT_NUMBER || "12345678"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Routing number:</span>
                  <span className="font-mono font-medium">{process.env.BANK_ROUTING_NUMBER || "987654321"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SWIFT/BIC:</span>
                  <span className="font-mono font-medium">{process.env.BANK_SWIFT_CODE || "ABCDUS33"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-mono font-medium">INV-{Date.now().toString().slice(-8)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const details = `
                      Account name: ${process.env.BANK_ACCOUNT_NAME || "ACME Corporation"}
                      Account number: ${process.env.BANK_ACCOUNT_NUMBER || "12345678"}
                      Routing number: ${process.env.BANK_ROUTING_NUMBER || "987654321"}
                      SWIFT/BIC: ${process.env.BANK_SWIFT_CODE || "ABCDUS33"}
                      Reference: INV-${Date.now().toString().slice(-8)}
                    `
                    navigator.clipboard.writeText(details)
                    toast({
                      title: "Details Copied",
                      description: "Bank details copied to clipboard",
                      variant: "default",
                    })
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Details
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 text-sm">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
                <span>
                  Please include the reference number in your transfer. Processing may take 1-3 business days. Your
                  order will be confirmed once payment is received.
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => processBankTransferPayment()}
            >
              <Landmark className="h-5 w-5 mr-2" />
              Generate Transfer Instructions
            </Button>
          </div>
        )

      case "giftcard":
        return (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="bg-rose-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Gift Card</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">Redeem a gift card or promotional code.</p>
            </div>

            <div className="border rounded-lg p-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="giftcard">Gift Card Number</Label>
                <Input
                  id="giftcard"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin">PIN (if applicable)</Label>
                <Input
                  id="pin"
                  placeholder="1234"
                  maxLength={4}
                  value={giftCardPin}
                  onChange={(e) => setGiftCardPin(e.target.value)}
                />
              </div>

              <Button className="w-full mt-2" onClick={() => checkGiftCardBalance()} disabled={!giftCardCode}>
                Check Balance
              </Button>

              {giftCardBalance !== null && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Available Balance:</span>
                    <span className="font-bold">${giftCardBalance.toFixed(2)}</span>
                  </div>

                  {giftCardBalance < total && (
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                      Insufficient balance for this purchase. You need ${(total - giftCardBalance).toFixed(2)} more.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
              <div className="flex">
                <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                <span>
                  Gift cards cannot be replaced if lost or stolen. Gift card balance will be applied to your purchase,
                  and any remaining amount can be paid with another payment method.
                </span>
              </div>
            </div>
          </div>
        )

      case "wallet":
        return (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="bg-violet-600 text-white w-16 h-16 rounded-full mx-auto grid place-items-center mb-4">
                <Wallet className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Digital Wallet</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Use your stored balance to complete this payment.
              </p>
            </div>

            <div className="border rounded-lg p-5 bg-violet-50 dark:bg-violet-950/30 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold">${walletBalance?.toFixed(2) || "0.00"}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => getWalletBalance()}>
                  <RefreshCcw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Order Total</p>
                  <p className="text-xl font-semibold">${total.toFixed(2)}</p>
                </div>
                {walletBalance !== null && (
                  <Badge
                    variant="outline"
                    className={cn(
                      walletBalance >= total
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
                    )}
                  >
                    {walletBalance >= total ? "Sufficient Funds" : "Insufficient Funds"}
                  </Badge>
                )}
              </div>

              <div className="pt-2">
                <Button
                  className="w-full bg-violet-600 hover:bg-violet-700"
                  disabled={!walletBalance || walletBalance < total}
                  onClick={() => processWalletPayment()}
                >
                  Pay from Wallet
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 text-sm">
              <div className="flex">
                <Info className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                <span>
                  Your digital wallet is protected with our secure encryption technologies. All transactions are instant
                  and fee-free.
                </span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Payment methods array
  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit Card",
      icon: <CreditCard />,
      description: "Pay with Visa, Mastercard, American Express, and more.",
      popular: true,
      processingTime: "Instant",
      fees: "None",
      color: "from-violet-600 to-indigo-600",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <PaypalLogo />,
      description: "Pay with your PayPal account.",
      popular: true,
      processingTime: "Instant",
      fees: "None",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "crypto",
      name: "Crypto",
      icon: <Bitcoin />,
      description: "Pay with Bitcoin, Ethereum, and other cryptocurrencies.",
      processingTime: "1-3 Confirmations",
      fees: "Network fees apply",
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "applepay",
      name: "Apple Pay",
      icon: <Apple />,
      description: "Pay quickly and securely with Apple Pay.",
      popular: true,
      processingTime: "Instant",
      fees: "None",
      color: "from-gray-800 to-gray-900",
    },
    {
      id: "googlepay",
      name: "Google Pay",
      icon: <GooglePay />,
      description: "Fast, simple checkout with Google Pay.",
      processingTime: "Instant",
      fees: "None",
      color: "from-blue-400 to-blue-500",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <BankTransfer />,
      description: "Transfer directly from your bank account.",
      processingTime: "1-3 Business Days",
      fees: "None",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "giftcard",
      name: "Gift Card",
      icon: <Gift />,
      description: "Redeem a gift card or promotional code.",
      processingTime: "Instant",
      fees: "None",
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: <Wallet />,
      description: "Pay using your digital wallet balance.",
      processingTime: "Instant",
      fees: "None",
      color: "from-violet-500 to-violet-600",
    },
  ]

  // Function to move to the next form step
  const continueTo = (step: number) => {
    setFormStep(step)
  }

  // Wrap the entire payment page in Stripe Elements provider
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
        {/* Header */}
        <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 grid place-items-center text-white mr-2">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg">PayFlow</span>
              </div>
              <div className="hidden md:flex ml-8">
                <Badge variant="outline" className="font-normal">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Checkout
                </Badge>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-4 text-sm">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <Shield className="h-4 w-4 mr-1 text-green-600 dark:text-green-500" />
                        <span className="hidden sm:inline">256-bit SSL Encrypted</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>This checkout is secured with industry-standard encryption to keep your information safe.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Need Help?
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
              <p className="text-muted-foreground">
                Select your preferred payment method and complete the details below.
              </p>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Progress indicator */}
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-800"></div>
                {["Payment Method", "Details", "Confirmation"].map((step, index) => (
                  <div key={index} className="relative z-10 flex flex-col items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mb-1",
                        formStep > index
                          ? "bg-green-600 text-white"
                          : formStep === index
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
                      )}
                    >
                      {formStep > index ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span
                      className={cn(
                        "text-xs",
                        formStep === index ? "font-medium text-primary" : "text-muted-foreground",
                      )}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Payment Method Selection */}
              <AnimatePresence mode="wait">
                {formStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Payment method selection */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {paymentMethods.slice(0, 4).map((method) => (
                        <div
                          key={method.id}
                          className={cn(
                            "relative rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
                            paymentMethod === method.id
                              ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
                              : "border-gray-200 dark:border-gray-800",
                          )}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          {method.popular && (
                            <div className="absolute top-0 right-0">
                              <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none bg-gradient-to-r from-violet-600 to-indigo-600 border-0 text-[10px] font-medium">
                                POPULAR
                              </Badge>
                            </div>
                          )}
                          <div
                            className={cn(
                              "flex flex-col items-center p-4 h-full",
                              paymentMethod === method.id && "bg-primary/5",
                            )}
                          >
                            <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
                            <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">More Payment Options</h3>
                        <Separator className="flex-1 mx-4" />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {paymentMethods.slice(4).map((method) => (
                          <div
                            key={method.id}
                            className={cn(
                              "rounded-lg border overflow-hidden cursor-pointer transition-all hover:border-primary/60 hover:shadow-md",
                              paymentMethod === method.id
                                ? "border-primary shadow-sm shadow-primary/20 bg-gray-50 dark:bg-gray-900"
                                : "border-gray-200 dark:border-gray-800",
                            )}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <div
                              className={cn(
                                "flex flex-col items-center p-4",
                                paymentMethod === method.id && "bg-primary/5",
                              )}
                            >
                              <PaymentMethodIcon method={method.id} selected={paymentMethod === method.id} />
                              <span className="mt-3 text-center text-sm font-medium">{method.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border p-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {paymentMethod && <PaymentMethodIcon method={paymentMethod} selected={true} size="large" />}
                          <div className="ml-4">
                            <h3 className="font-medium">
                              {paymentMethods.find((m) => m.id === paymentMethod)?.name || "Select a payment method"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {paymentMethods.find((m) => m.id === paymentMethod)?.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={() => continueTo(1)}
                          disabled={!paymentMethod}
                          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        >
                          Continue
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>

                    {/* Payment Method Comparison Table */}
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Compare Payment Methods
                          <ChevronsUpDown className="h-4 w-4 ml-1" />
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-4xl">
                          <DrawerHeader>
                            <DrawerTitle>Payment Method Comparison</DrawerTitle>
                            <DrawerDescription>
                              Compare the features and benefits of each payment method
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4 overflow-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-3">Payment Method</th>
                                  <th className="text-left p-3">Processing Time</th>
                                  <th className="text-left p-3">Fees</th>
                                  <th className="text-left p-3">Security</th>
                                  <th className="text-left p-3">Benefits</th>
                                </tr>
                              </thead>
                              <tbody>
                                {paymentMethods.map((method) => (
                                  <tr key={method.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <td className="p-3">
                                      <div className="flex items-center">
                                        <div
                                          className={`p-1.5 rounded-full bg-gradient-to-r ${method.color} text-white mr-2`}
                                        >
                                          {method.icon}
                                        </div>
                                        <span className="font-medium">{method.name}</span>
                                      </div>
                                    </td>
                                    <td className="p-3">{method.processingTime}</td>
                                    <td className="p-3">{method.fees}</td>
                                    <td className="p-3">
                                      <div className="flex items-center">
                                        <div className="flex space-x-0.5">
                                          {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                              key={i}
                                              className={cn(
                                                "h-4 w-4",
                                                i < (method.id === "crypto" ? 4 : 5)
                                                  ? "text-amber-500 fill-amber-500"
                                                  : "text-gray-300 dark:text-gray-600",
                                              )}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <span>
                                        {method.id === "card" && "Widely accepted, rewards programs"}
                                        {method.id === "paypal" && "Buyer protection, no need to share card details"}
                                        {method.id === "crypto" && "Privacy, no chargebacks, global payments"}
                                        {method.id === "applepay" && "Fast checkout, biometric security"}
                                        {method.id === "googlepay" && "Fast checkout, stored payment methods"}
                                        {method.id === "bank" && "No card needed, good for large payments"}
                                        {method.id === "giftcard" && "Great for gifts, budgeting control"}
                                        {method.id === "wallet" && "No additional payment method needed"}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </motion.div>
                )}

                {/* Step 2: Payment Details */}
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setFormStep(0)}
                        className="text-muted-foreground"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Payment Methods
                      </Button>
                      <div className="flex items-center">
                        <PaymentMethodIcon method={paymentMethod} selected={true} />
                        <span className="ml-2 font-medium">
                          {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                        </span>
                      </div>
                    </div>

                    <Card>
                      <CardContent className="pt-6">
                        {/* Render the appropriate payment form based on method */}
                        {renderPaymentMethodForm()}
                      </CardContent>
                    </Card>

                    {paymentError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
                          <span>{paymentError}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex items-center justify-between">
                      <Button type="button" variant="outline" onClick={() => setFormStep(0)}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={!isFormValid() || paymentProcessing}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                      >
                        {paymentProcessing ? (
                          <>
                            <Timer className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Continue to Review
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {paymentComplete ? (
                      <div className="text-center py-10 relative">
                        {!animationComplete && <Particles count={100} />}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                          className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto grid place-items-center mb-4"
                        >
                          <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </motion.div>
                        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                          Your payment has been processed successfully. You will receive a confirmation email shortly.
                        </p>
                        <div className="border rounded-lg p-4 max-w-md mx-auto bg-gray-50 dark:bg-gray-900">
                          <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Transaction ID:</span>
                            <span className="font-medium">
                              {transactionId || "TRX-" + Math.random().toString(36).substring(2, 10).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Payment Method:</span>
                            <span className="font-medium">
                              {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-bold">${total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="mt-8">
                          <Button
                            type="button"
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                            onClick={() => (window.location.href = "/dashboard")}
                          >
                            Continue to Your Account
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setFormStep(1)}
                            className="text-muted-foreground"
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back to Payment
                          </Button>
                          <div className="flex items-center">
                            <PaymentMethodIcon method={paymentMethod} selected={true} />
                            <span className="ml-2 font-medium">
                              {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                            </span>
                          </div>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle>Review & Confirm</CardTitle>
                            <CardDescription>Please review your payment details before confirming</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-4">
                              <div className="flex justify-between pb-2 border-b">
                                <h3 className="font-medium">Payment Details</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setFormStep(1)}
                                  className="h-auto p-0 text-primary hover:text-primary/80"
                                >
                                  Edit
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm text-muted-foreground mb-1">Payment Method</h4>
                                  <div className="flex items-center">
                                    <PaymentMethodIcon method={paymentMethod} selected={true} />
                                    <span className="ml-2 font-medium">
                                      {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                                    </span>
                                  </div>
                                </div>

                                {paymentMethod === "card" && (
                                  <>
                                    <div>
                                      <h4 className="text-sm text-muted-foreground mb-1">Card Number</h4>
                                      <div className="font-medium">•••• •••• •••• {cardNumber.slice(-4)}</div>
                                    </div>
                                    <div>
                                      <h4 className="text-sm text-muted-foreground mb-1">Card Holder</h4>
                                      <div className="font-medium">{cardName}</div>
                                    </div>
                                    <div>
                                      <h4 className="text-sm text-muted-foreground mb-1">Expiry Date</h4>
                                      <div className="font-medium">{expiryDate}</div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <div className="flex justify-between pb-2 border-b">
                                <h3 className="font-medium">Billing Summary</h3>
                              </div>

                              <div className="space-y-2">
                                {items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <span>{item.name}</span>
                                      {item.waived && (
                                        <Badge
                                          variant="outline"
                                          className="ml-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                        >
                                          Waived
                                        </Badge>
                                      )}
                                      {item.saving && (
                                        <Badge
                                          variant="outline"
                                          className="ml-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                                        >
                                          Save {item.saving}
                                        </Badge>
                                      )}
                                    </div>
                                    <span className="font-medium">
                                      ${item.price === 0 ? "0.00" : item.price.toFixed(2)}
                                    </span>
                                  </div>
                                ))}

                                <Separator className="my-2" />

                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Subtotal</span>
                                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>

                                {useSpecialOffer && (
                                  <div className="flex justify-between text-green-600 dark:text-green-400">
                                    <span>Special Offer Discount</span>
                                    <span>-$25.00</span>
                                  </div>
                                )}

                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Tax (8%)</span>
                                  <span className="font-medium">${tax.toFixed(2)}</span>
                                </div>

                                <Separator className="my-2" />

                                <div className="flex justify-between text-lg">
                                  <span className="font-bold">Total</span>
                                  <span className="font-bold">${total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>

                            {paymentError && (
                              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                                <div className="flex items-start">
                                  <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
                                  <span>{paymentError}</span>
                                </div>
                              </div>
                            )}

                            <div className="pt-4 space-y-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="terms" required />
                                <label
                                  htmlFor="terms"
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  I agree to the{" "}
                                  <a href="/terms" className="text-primary underline hover:text-primary/90">
                                    Terms and Conditions
                                  </a>{" "}
                                  and{" "}
                                  <a href="/privacy" className="text-primary underline hover:text-primary/90">
                                    Privacy Policy
                                  </a>
                                </label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="subscribe"
                                  checked={useSpecialOffer}
                                  onCheckedChange={(checked) => setUseSpecialOffer(!!checked)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                  <label
                                    htmlFor="subscribe"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                                  >
                                    Apply Special Offer Code
                                    <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                                      $25 OFF
                                    </Badge>
                                  </label>
                                  <p className="text-sm text-muted-foreground">
                                    Special discount for first-time customers
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
                              <ChevronLeft className="h-4 w-4 mr-1" />
                              Back
                            </Button>
                            <Button
                              type="submit"
                              disabled={paymentProcessing}
                              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                            >
                              {paymentProcessing ? (
                                <>
                                  <Timer className="h-4 w-4 mr-2 animate-spin" />
                                  Processing Payment...
                                </>
                              ) : (
                                <>
                                  Confirm Payment
                                  <Lock className="h-4 w-4 ml-1" />
                                </>
                              )}
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <AnimatePresence>
            {(sidebarVisible || showOrderSummary) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="lg:block bg-gray-50 dark:bg-gray-900 rounded-xl border p-6 h-fit sticky top-24"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-lg">Order Summary</h2>
                  {mobileView && (
                    <Button variant="ghost" size="sm" onClick={() => setShowOrderSummary(false)} className="lg:hidden">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="flex mt-1">
                          {item.waived && (
                            <Badge
                              variant="outline"
                              className="text-[10px] text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            >
                              Waived
                            </Badge>
                          )}
                          {item.saving && (
                            <Badge
                              variant="outline"
                              className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                            >
                              Save {item.saving}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="font-medium">${item.price === 0 ? "0.00" : item.price.toFixed(2)}</span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {useSpecialOffer && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Special Offer Discount</span>
                      <span>-$25.00</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
                      <span>Data protection & privacy</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 shrink-0" />
                      <span>Money-back guarantee</span>
                    </div>
                  </div>

                  {mobileView && (
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                      onClick={() => setShowOrderSummary(false)}
                    >
                      Continue
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {mobileView && !showOrderSummary && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950 border-t dark:border-gray-800 flex items-center justify-between z-10">
            <div>
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="font-bold text-lg">${total.toFixed(2)}</div>
            </div>
            <Button
              onClick={() => setShowOrderSummary(true)}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              View Summary
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </Elements>
  )
}

export default PaymentPage

