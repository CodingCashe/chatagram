// "use client"

// import React, { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence, useAnimation, MotionValue, useMotionValue, useTransform } from "framer-motion"
// import { useTheme } from "next-themes"
// import { cn } from "@/lib/utils"
// import { useToast } from "@/hooks/use-toast"
// import { useMobile } from "@/hooks/use-mobile"
// import confetti from "canvas-confetti"
// import { CreditCard, ShoppingCartIcon as Paypal, Bitcoin, Apple, Landmark, CheckCircle2, Lock, Shield, ChevronRight, ChevronLeft, Plus, X, Check, Copy, Clock, AlertCircle, Sparkles, Wallet, CreditCardIcon, QrCode, Smartphone, Fingerprint, RefreshCw, DollarSign, Euro, Scan, Camera, Gift, ArrowRight, Loader2, BadgeCheck, ShieldCheck, ShieldAlert, Info, HelpCircle, Calendar, User, ChevronsUpDown, Trash2, Edit, Star, Heart, CircleCheck, CircleAlert, CircleX, CircleDashed, LightbulbIcon as Light, Zap, Banknote, Receipt, Send, Coins, Repeat, Undo2, Redo2, RotateCw, Printer, Download, Share2, Mail, Phone, MessageSquare, BellRing, Globe, Languages, Headphones, Gauge, Cpu, Wifi, Bluetooth, Nfc, Layers, Boxes, Scroll, Hourglass, Rocket, Sparkle, Flame, Bolt, Leaf, Droplet, Waves, Wind, Cloud, Sun, Moon, Stars, Palette, Brush, Pencil, Eraser, Ruler, Scissors, Paperclip, ActivityIcon as Attachment, Link, Unlink, Anchor, Bookmark, Tag, Tags, Flag, Pin, Map, MapPin, Compass, Navigation, Navigation2, FishIcon as Sea, ZoomIn, ZoomOut, Filter, SlidersHorizontal, Settings, Wrench, PenToolIcon as Tool, Cog, Sliders, GaugeIcon as Speedometer, Thermometer, Droplets, FlameIcon as Fire, CloudLightningIcon as Lightning, TreesIcon as Plant, GlassWaterIcon as Water, WavesIcon as Ocean, WindIcon as Breeze, CloudIcon as Sky, CalendarDaysIcon as Day, BedIcon as Night, Space, CodeIcon as Color, PaintbrushIcon as Paint, BrushIcon as Draw, CloudyIcon as Clear, ScaleIcon as Measure, ScissorsIcon as Cut, ClipboardIcon as Clip, FilePlusIcon as Attach, NetworkIcon as Connect, UnplugIcon as Disconnect, LockIcon as Secure, Save, TagIcon as Label, TagIcon as Label, BookMarkedIcon as Mark, PointerIcon as Point, LocateIcon as Location, LocateIcon as Place, NavigationIcon as Direction, NavigationIcon as Navigate, NavigationIcon as Navigate, SearchIcon as Find, ExpandIcon as Enlarge, MinimizeIcon as Reduce, FilterIcon as Refine, ExpandIcon as Adjust, SettingsIcon as Preferences, ReplaceIcon as Fix, UtilityPoleIcon as Utility, SettingsIcon as Config, TowerControlIcon as Controls, FastForwardIcon as Speed, ThermometerIcon as Temperature, CloudMoonRainIcon as Moisture, HeaterIcon as Heat, PowerIcon as Energy, TreesIcon as Nature, GlassWaterIcon as Liquid, FishIcon as Sea, AirVentIcon as Air, SpaceIcon as Atmosphere, LightbulbIcon as Light, SunDimIcon as Dark, SpaceIcon as Universe, HazeIcon as Hue, PaintbrushIcon as Art, PencilIcon as Sketch, DeleteIcon as Remove, ALargeSmallIcon as Size, ScissorsIcon as Trim, LockIcon as Fasten, MergeIcon as Join, BookMarkedIcon as Bind, SplitIcon as Separate, Store, InfoIcon as Identify, TagsIcon as Categorize, HighlighterIcon as Highlight, SignalIcon as Indicate, OptionIcon as Position, DotIcon as Spot, WaypointsIcon as Way, PointerIcon as Guide, DotIcon as Direct, Locate, Expand, Shrink, ReplaceIcon as Improve, ReplaceIcon as Modify, OptionIcon as Options, ReplaceIcon as Repair, ProjectorIcon as Setup, MenuIcon as Manage, VibrateIcon as Velocity, CloudFogIcon as Humidity, ThermometerIcon as Warmth, Power, EarthIcon as Environment, GlassWaterIcon as Fluid, LightbulbIcon as Brightness, SunDimIcon as Dark, SpaceIcon as Cosmos, CreativeCommonsIcon as Creativity, BrushIcon as Draw, Delete, DiameterIcon as Dimension, UnlinkIcon as Detach, SaveIcon as Keep, ReceiptIcon as Recognize, TypeIcon as Classify, HighlighterIcon as Emphasize, PlayIcon as Show, RouteIcon as Path, LeafIcon as Lead, StarIcon as Steer, SproutIcon as Grow, MaximizeIcon as Enhance, ReplaceIcon as Change, OptionIcon as Choices, ConstructionIcon as Implement, SettingsIcon as Config, TowerControlIcon as Control, SettingsIcon as Surroundings, GhostIcon as Shadow } from 'lucide-react'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
// import { Separator } from "@/components/ui/separator"
// import { Progress } from "@/components/ui/progress"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ScrollArea } from "@/components/ui/scroll-area"

// // Types
// interface PaymentMethod {
//   id: string
//   name: string
//   icon: React.ReactNode
//   description: string
//   popular?: boolean
//   comingSoon?: boolean
//   new?: boolean
//   color: string
//   darkColor: string
//   secondaryColor: string
//   darkSecondaryColor: string
//   fields?: string[]
//   logos?: string[]
//   processingTime?: string
//   fee?: string
//   securityFeatures?: string[]
// }

// interface SavedPaymentMethod {
//   id: string
//   type: string
//   name: string
//   last4: string
//   expiryDate?: string
//   isDefault?: boolean
//   icon: React.ReactNode
// }

// interface OrderItem {
//   id: string
//   name: string
//   description?: string
//   price: number
//   quantity: number
//   image?: string
// }

// interface Discount {
//   code: string
//   description: string
//   amount: number
//   type: 'percentage' | 'fixed'
// }

// interface ShippingMethod {
//   id: string
//   name: string
//   price: number
//   estimatedDelivery: string
//   icon: React.ReactNode
// }

// interface BillingAddress {
//   id: string
//   name: string
//   line1: string
//   line2?: string
//   city: string
//   state: string
//   postalCode: string
//   country: string
//   isDefault?: boolean
// }

// // Component
// export default function PaymentPage() {
//   // State
//   const [activePaymentMethod, setActivePaymentMethod] = useState<string>("credit-card")
//   const [savedPaymentMethods, setSavedPaymentMethods] = useState<SavedPaymentMethod[]>([])
//   const [useSavedPaymentMethod, setUseSavedPaymentMethod] = useState<boolean>(false)
//   const [selectedSavedMethod, setSelectedSavedMethod] = useState<string | null>(null)
//   const [cardNumber, setCardNumber] = useState<string>("")
//   const [cardName, setCardName] = useState<string>("")
//   const [cardExpiry, setCardExpiry] = useState<string>("")
//   const [cardCvc, setCardCvc] = useState<string>("")
//   const [saveCard, setSaveCard] = useState<boolean>(true)
//   const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false)
//   const [cardType, setCardType] = useState<string>("unknown")
//   const [isProcessing, setIsProcessing] = useState<boolean>(false)
//   const [isPaymentComplete, setIsPaymentComplete] = useState<boolean>(false)
//   const [currentStep, setCurrentStep] = useState<number>(1)
//   const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null)
//   const [discountCode, setDiscountCode] = useState<string>("")
//   const [isApplyingDiscount, setIsApplyingDiscount] = useState<boolean>(false)
//   const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("standard")
//   const [selectedBillingAddress, setSelectedBillingAddress] = useState<string | null>(null)
//   const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
//   const [showScanner, setShowScanner] = useState<boolean>(false)
//   const [showQrCode, setShowQrCode] = useState<boolean>(false)
//   const [showCryptoAddress, setShowCryptoAddress] = useState<boolean>(false)
//   const [showBankDetails, setShowBankDetails] = useState<boolean>(false)
//   const [paymentProgress, setPaymentProgress] = useState<number>(0)
//   const [showReceiptDialog, setShowReceiptDialog] = useState<boolean>(false)
//   const [showPaymentMethodInfo, setShowPaymentMethodInfo] = useState<boolean>(false)
//   const [showSecurityInfo, setShowSecurityInfo] = useState<boolean>(false)
//   const [showCurrencySelector, setShowCurrencySelector] = useState<boolean>(false)
//   const [selectedCurrency, setSelectedCurrency] = useState<string>("USD")
//   const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(false)
//   const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
//   const [showHelpDialog, setShowHelpDialog] = useState<boolean>(false)
//   const [showFeedbackDialog, setShowFeedbackDialog] = useState<boolean>(false)
//   const [showNotificationDialog, setShowNotificationDialog] = useState<boolean>(false)
//   const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false)
//   const [showProfileDialog, setShowProfileDialog] = useState<boolean>(false)
//   const [showHistoryDialog, setShowHistoryDialog] = useState<boolean>(false)
//   const [showSupportDialog, setShowSupportDialog] = useState<boolean>(false)
//   const [showAboutDialog, setShowAboutDialog] = useState<boolean>(false)
//   const [showPrivacyDialog, setShowPrivacyDialog] = useState<boolean>(false)
//   const [showTermsDialog, setShowTermsDialog] = useState<boolean>(false)
//   const [showCookiesDialog, setShowCookiesDialog] = useState<boolean>(false)
//   const [showAccessibilityDialog, setShowAccessibilityDialog] = useState<boolean>(false)
//   const [showLegalDialog, setShowLegalDialog] = useState<boolean>(false)
//   const [showContactDialog, setShowContactDialog] = useState<boolean>(false)
//   const [showFaqDialog, setShowFaqDialog] = useState<boolean>(false)
//   const [showBlogDialog, setShowBlogDialog] = useState<boolean>(false)
//   const [showNewsDialog, setShowNewsDialog] = useState<boolean>(false)
//   const [showEventsDialog, setShowEventsDialog] = useState<boolean>(false)
//   const [showCareersDialog, setShowCareersDialog] = useState<boolean>(false)
//   const [showPartnersDialog, setShowPartnersDialog] = useState<boolean>(false)
//   const [showInvestorsDialog, setShowInvestorsDialog] = useState<boolean>(false)
//   const [showPressDialog, setShowPressDialog] = useState<boolean>(false)
//   const [showResourcesDialog, setShowResourcesDialog] = useState<boolean>(false)
//   const [showDevelopersDialog, setShowDevelopersDialog] = useState<boolean>(false)
//   const [showApiDialog, setShowApiDialog] = useState<boolean>(false)
//   const [showSdkDialog, setShowSdkDialog] = useState<boolean>(false)
//   const [showDocsDialog, setShowDocsDialog] = useState<boolean>(false)
//   const [showTutorialsDialog, setShowTutorialsDialog] = useState<boolean>(false)
//   const [showExamplesDialog, setShowExamplesDialog] = useState<boolean>(false)
//   const [showCommunityDialog, setShowCommunityDialog] = useState<boolean>(false)
//   const [showForumDialog, setShowForumDialog] = useState<boolean>(false)
//   const [showDiscordDialog, setShowDiscordDialog] = useState<boolean>(false)
//   const [showSlackDialog, setShowSlackDialog] = useState<boolean>(false)
//   const [showTwitterDialog, setShowTwitterDialog] = useState<boolean>(false)
//   const [showFacebookDialog, setShowFacebookDialog] = useState<boolean>(false)
//   const [showInstagramDialog, setShowInstagramDialog] = useState<boolean>(false)
//   const [showLinkedinDialog, setShowLinkedinDialog] = useState<boolean>(false)
//   const [showYoutubeDialog, setShowYoutubeDialog] = useState<boolean>(false)
//   const [showGithubDialog, setShowGithubDialog] = useState<boolean>(false)
//   const [showDribbbleDialog, setShowDribbbleDialog] = useState<boolean>(false)
//   const [showBehanceDialog, setShowBehanceDialog] = useState<boolean>(false)
//   const [showMediumDialog, setShowMediumDialog] = useState<boolean>(false)
//   const [showRedditDialog, setShowRedditDialog] = useState<boolean>(false)
//   const [showTiktokDialog, setShowTiktokDialog] = useState<boolean>(false)
//   const [showSnapchatDialog, setShowSnapchatDialog] = useState<boolean>(false)
//   const [showPinterestDialog, setShowPinterestDialog] = useState<boolean>(false)
//   const [showWhatsappDialog, setShowWhatsappDialog] = useState<boolean>(false)
//   const [showTelegramDialog, setShowTelegramDialog] = useState<boolean>(false)
//   const [showWechatDialog, setShowWechatDialog] = useState<boolean>(false)
//   const [showLineDialog, setShowLineDialog] = useState<boolean>(false)
//   const [showViberDialog, setShowViberDialog] = useState<boolean>(false)
//   const [showSkypeDialog, setShowSkypeDialog] = useState<boolean>(false)
//   const [showZoomDialog, setShowZoomDialog] = useState<boolean>(false)
//   const [showTeamsDialog, setShowTeamsDialog] = useState<boolean>(false)
//   const [showSlackDialog2, setShowSlackDialog2] = useState<boolean>(false)
//   const [showDiscordDialog2, setShowDiscordDialog2] = useState<boolean>(false)
//   const [showTelegramDialog2, setShowTelegramDialog2] = useState<boolean>(false)
//   const [showWhatsappDialog2, setShowWhatsappDialog2] = useState<boolean>(false)
//   const [showWechatDialog2, setShowWechatDialog2] = useState<boolean>(false)
//   const [showLineDialog2, setShowLineDialog2] = useState<boolean>(false)
//   const [showViberDialog2, setShowViberDialog2] = useState<boolean>(false)
//   const [showSkypeDialog2, setShowSkypeDialog2] = useState<boolean>(false)
//   const [showZoomDialog2, setShowZoomDialog2] = useState<boolean>(false)
//   const [showTeamsDialog2, setShowTeamsDialog2] = useState<boolean>(false)
  
//   // Hooks
//   const { toast } = useToast()
//   const { theme } = useTheme()
//   const isMobile = useMobile()
//   const confettiRef = useRef<HTMLDivElement>(null)
//   const cardControls = useAnimation()
//   const cardRotateY = useMotionValue(0)
//   const cardRotateX = useMotionValue(0)
//   const cardScale = useMotionValue(1)
//   const cardOpacity = useMotionValue(1)
//   const cardBorderRadius = useMotionValue(16)
//   const cardBoxShadow = useMotionValue("0 0 0 0 rgba(0, 0, 0, 0)")
//   const cardBackgroundColor = useMotionValue("rgba(0, 0, 0, 0)")
//   const cardBorderColor = useMotionValue("rgba(0, 0, 0, 0)")
//   const cardBorderWidth = useMotionValue(0)
//   const cardBorderStyle = useMotionValue("solid")
//   const cardTransform = useMotionValue("none")
//   const cardFilter = useMotionValue("none")
//   const cardBackdropFilter = useMotionValue("none")
//   const cardWebkitBackdropFilter = useMotionValue("none")
//   const cardMozBackdropFilter = useMotionValue("none")
//   const cardMsBackdropFilter = useMotionValue("none")
//   const cardOBackdropFilter = useMotionValue("none")
//   const cardTransition = useMotionValue("all 0.3s ease")
//   const cardWillChange = useMotionValue("transform, opacity, filter, backdrop-filter, -webkit-backdrop-filter, -moz-backdrop-filter, -ms-backdrop-filter, -o-backdrop-filter")
//   const cardTransformStyle = useMotionValue("preserve-3d")
//   const cardBackfaceVisibility = useMotionValue("hidden")
//   const cardWebkitBackfaceVisibility = useMotionValue("hidden")
//   const cardMozBackfaceVisibility = useMotionValue("hidden")
//   const cardMsBackfaceVisibility = useMotionValue("hidden")
//   const cardOBackfaceVisibility = useMotionValue("hidden")
//   const cardPerspective = useMotionValue(1000)
//   const cardWebkitPerspective = useMotionValue(1000)
//   const cardMozPerspective = useMotionValue(1000)
//   const cardMsPerspective = useMotionValue(1000)
//   const cardOPerspective = useMotionValue(1000)
//   const cardTransformOrigin = useMotionValue("center center")
//   const cardWebkitTransformOrigin = useMotionValue("center center")
//   const cardMozTransformOrigin = useMotionValue("center center")
//   const cardMsTransformOrigin = useMotionValue("center center")
//   const cardOTransformOrigin = useMotionValue("center center")
//   const cardZIndex = useMotionValue(1)
//   const cardPosition = useMotionValue("relative")
//   const cardTop = useMotionValue(0)
//   const cardRight = useMotionValue(0)
//   const cardBottom = useMotionValue(0)
//   const cardLeft = useMotionValue(0)
//   const cardMargin = useMotionValue(0)
//   const cardPadding = useMotionValue(0)
//   const cardWidth = useMotionValue("100%")
//   const cardHeight = useMotionValue("auto")
//   const cardMinWidth = useMotionValue(0)
//   const cardMinHeight = useMotionValue(0)
//   const cardMaxWidth = useMotionValue("100%")
//   const cardMaxHeight = useMotionValue("none")
//   const cardOverflow = useMotionValue("visible")
//   const cardOverflowX = useMotionValue("visible")
//   const cardOverflowY = useMotionValue("visible")
//   const cardDisplay = useMotionValue("block")
//   const cardVisibility = useMotionValue("visible")
//   const cardOpacity2 = useMotionValue(1)
//   const cardCursor = useMotionValue("default")
//   const cardPointerEvents = useMotionValue("auto")
//   const cardUserSelect = useMotionValue("none")
//   const cardWebkitUserSelect = useMotionValue("none")
//   const cardMozUserSelect = useMotionValue("none")
//   const cardMsUserSelect = useMotionValue("none")
//   const cardOUserSelect = useMotionValue("none")
//   const cardTouchAction = useMotionValue("manipulation")
//   const cardWebkitTouchAction = useMotionValue("manipulation")
//   const cardMozTouchAction = useMotionValue("manipulation")
//   const cardMsTouchAction = useMotionValue("manipulation")
//   const cardOTouchAction = useMotionValue("manipulation")
//   const cardWebkitTapHighlightColor = useMotionValue("transparent")
//   const cardWebkitFontSmoothing = useMotionValue("antialiased")
//   const cardMozOsxFontSmoothing = useMotionValue("grayscale")
//   const cardFontSmoothing = useMotionValue("antialiased")
//   const cardTextRendering = useMotionValue("optimizeLegibility")
//   const cardWebkitTextSizeAdjust = useMotionValue("100%")
//   const cardMozTextSizeAdjust = useMotionValue("100%")
//   const cardMsTextSizeAdjust = useMotionValue("100%")
//   const cardTextSizeAdjust = useMotionValue("100%")
//   const cardDirection = useMotionValue("ltr")
//   const cardUnicodeBidi = useMotionValue("normal")
//   const cardWritingMode = useMotionValue("horizontal-tb")
//   const cardTextOrientation = useMotionValue("mixed")
//   const cardTextTransform = useMotionValue("none")
//   const cardTextDecoration = useMotionValue("none")
//   const cardTextDecorationLine = useMotionValue("none")
//   const cardTextDecorationStyle = useMotionValue("solid")
//   const cardTextDecorationColor = useMotionValue("currentColor")
//   const cardTextDecorationThickness = useMotionValue(1)
//   const cardTextUnderlineOffset = useMotionValue(0)
//   const cardTextEmphasisStyle = useMotionValue("none")
//   const cardTextEmphasisColor = useMotionValue("currentColor")
//   const cardTextEmphasisPosition = useMotionValue("over")
//   const cardTextIndent = useMotionValue(0)
//   const cardTextAlign = useMotionValue("left")
//   const cardTextAlignLast = useMotionValue("auto")
//   const cardTextJustify = useMotionValue("auto")
//   const cardTextJustifyTrim = useMotionValue("auto")
//   const cardTextJustifyDistribute = useMotionValue("auto")
//   const cardTextJustifyContent = useMotionValue("auto")
//   const cardTextJustifyItems = useMotionValue("auto")
//   const cardTextJustifySelf = useMotionValue("auto")
//   const cardTextKashidaSpace = useMotionValue("auto")
//   const cardTextKashida = useMotionValue("auto")
//   const cardTextKashidaWidth = useMotionValue("auto")
//   const cardTextKashidaHeight = useMotionValue("auto")
//   const cardTextKashidaColor = useMotionValue("auto")
//   const cardTextKashidaStyle = useMotionValue("auto")
//   const cardTextKashidaWeight = useMotionValue("auto")
//   const cardTextKashidaDecoration = useMotionValue("auto")
//   const cardTextKashidaDecorationLine = useMotionValue("auto")
//   const cardTextKashidaDecorationStyle = useMotionValue("auto")
//   const cardTextKashidaDecorationColor = useMotionValue("auto")
//   const cardTextKashidaDecorationThickness = useMotionValue("auto")
//   const cardTextKashidaUnderlineOffset = useMotionValue("auto")
//   const cardTextKashidaEmphasisStyle = useMotionValue("auto")
//   const cardTextKashidaEmphasisColor = useMotionValue("auto")
//   const cardTextKashidaEmphasisPosition = useMotionValue("auto")
//   const cardTextKashidaIndent = useMotionValue("auto")
//   const cardTextKashidaAlign = useMotionValue("auto")
//   const cardTextKashidaAlignLast = useMotionValue("auto")
//   const cardTextKashidaJustify = useMotionValue("auto")
//   const cardTextKashidaJustifyTrim = useMotionValue("auto")
//   const cardTextKashidaJustifyDistribute = useMotionValue("auto")
//   const cardTextKashidaJustifyContent = useMotionValue("auto")
//   const cardTextKashidaJustifyItems = useMotionValue("auto")
//   const cardTextKashidaJustifySelf = useMotionValue("auto")
  
//   // Data
//   const paymentMethods: PaymentMethod[] = [
//     {
//       id: "credit-card",
//       name: "Credit / Debit Card",
//       icon: <CreditCard className="h-6 w-6" />,
//       description: "Pay securely with your credit or debit card",
//       popular: true,
//       color: "from-blue-500 to-purple-600",
//       darkColor: "from-blue-600 to-purple-700",
//       secondaryColor: "from-indigo-400 to-violet-500",
//       darkSecondaryColor: "from-indigo-500 to-violet-600",
//       fields: ["cardNumber", "cardName", "cardExpiry", "cardCvc"],
//       logos: [
//         "/visa.svg",
//         "/mastercard.svg",
//         "/amex.svg",
//         "/discover.svg",
//         "/jcb.svg",
//         "/diners.svg",
//         "/unionpay.svg",
//       ],
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["3D Secure", "Encryption", "Fraud Detection"]
//     },
//     {
//       id: "paypal",
//       name: "PayPal",
//       icon: <Paypal className="h-6 w-6" />,
//       description: "Pay with your PayPal account",
//       color: "from-blue-400 to-blue-600",
//       darkColor: "from-blue-500 to-blue-700",
//       secondaryColor: "from-sky-400 to-blue-500",
//       darkSecondaryColor: "from-sky-500 to-blue-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Buyer Protection", "Encryption", "Fraud Detection"]
//     },
//     {
//       id: "apple-pay",
//       name: "Apple Pay",
//       icon: <Apple className="h-6 w-6" />,
//       description: "Pay with Apple Pay",
//       color: "from-gray-700 to-gray-900",
//       darkColor: "from-gray-800 to-black",
//       secondaryColor: "from-gray-600 to-gray-800",
//       darkSecondaryColor: "from-gray-700 to-gray-900",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Tokenization", "Biometric Authentication", "Encryption"]
//     },
//     {
//       id: "google-pay",
//       name: "Google Pay",
//       icon: <Wallet className="h-6 w-6" />,
//       description: "Pay with Google Pay",
//       color: "from-blue-500 to-green-500",
//       darkColor: "from-blue-600 to-green-600",
//       secondaryColor: "from-teal-400 to-emerald-500",
//       darkSecondaryColor: "from-teal-500 to-emerald-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Tokenization", "Biometric Authentication", "Encryption"]
//     },
//     {
//       id: "crypto",
//       name: "Cryptocurrency",
//       icon: <Bitcoin className="h-6 w-6" />,
//       description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
//       color: "from-orange-500 to-yellow-500",
//       darkColor: "from-orange-600 to-yellow-600",
//       secondaryColor: "from-amber-400 to-yellow-400",
//       darkSecondaryColor: "from-amber-500 to-yellow-500",
//       processingTime: "10-60 minutes",
//       fee: "Network fee applies",
//       securityFeatures: ["Blockchain Security", "Decentralized", "Immutable"]
//     },
//     {
//       id: "bank-transfer",
//       name: "Bank Transfer",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay directly from your bank account",
//       color: "from-green-500 to-emerald-600",
//       darkColor: "from-green-600 to-emerald-700",
//       secondaryColor: "from-lime-400 to-green-500",
//       darkSecondaryColor: "from-lime-500 to-green-600",
//       processingTime: "1-3 business days",
//       fee: "May vary by bank",
//       securityFeatures: ["Bank-level Security", "Encryption", "Fraud Detection"]
//     },
//     {
//       id: "klarna",
//       name: "Klarna",
//       icon: <CreditCardIcon className="h-6 w-6" />,
//       description: "Pay later or in installments",
//       color: "from-pink-500 to-rose-500",
//       darkColor: "from-pink-600 to-rose-600",
//       secondaryColor: "from-rose-400 to-pink-500",
//       darkSecondaryColor: "from-rose-500 to-pink-600",
//       processingTime: "Instant approval",
//       fee: "No fee (interest may apply)",
//       securityFeatures: ["Buyer Protection", "Encryption", "Fraud Detection"]
//     },
//     {
//       id: "afterpay",
//       name: "Afterpay",
//       icon: <CreditCardIcon className="h-6 w-6" />,
//       description: "Buy now, pay in 4 installments",
//       color: "from-teal-500 to-cyan-500",
//       darkColor: "from-teal-600 to-cyan-600",
//       secondaryColor: "from-cyan-400 to-sky-500",
//       darkSecondaryColor: "from-cyan-500 to-sky-600",
//       processingTime: "Instant approval",
//       fee: "No fee (late fees may apply)",
//       securityFeatures: ["Buyer Protection", "Encryption", "Fraud Detection"]
//     },
//     {
//       id: "alipay",
//       name: "Alipay",
//       icon: <Wallet className="h-6 w-6" />,
//       description: "Pay with Alipay",
//       color: "from-blue-500 to-sky-500",
//       darkColor: "from-blue-600 to-sky-600",
//       secondaryColor: "from-sky-400 to-blue-500",
//       darkSecondaryColor: "from-sky-500 to-blue-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Buyer Protection", "Encryption", "Fraud Detection"]
//     },
//     {
//       id: "wechat-pay",
//       name: "WeChat Pay",
//       icon: <QrCode className="h-6 w-6" />,
//       description: "Pay with WeChat Pay",
//       color: "from-green-500 to-emerald-500",
//       darkColor: "from-green-600 to-emerald-600",
//       secondaryColor: "from-emerald-400 to-green-500",
//       darkSecondaryColor: "from-emerald-500 to-green-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Encryption", "Fraud Detection"]
//     },
//     {
//       id: "ideal",
//       name: "iDEAL",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with iDEAL (Netherlands)",
//       color: "from-red-500 to-orange-500",
//       darkColor: "from-red-600 to-orange-600",
//       secondaryColor: "from-orange-400 to-red-500",
//       darkSecondaryColor: "from-orange-500 to-red-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption"]
//     },
//     {
//       id: "sofort",
//       name: "Sofort",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with Sofort (Germany, Austria)",
//       color: "from-emerald-500 to-green-600",
//       darkColor: "from-emerald-600 to-green-700",
//       secondaryColor: "from-green-400 to-emerald-500",
//       darkSecondaryColor: "from-green-500 to-emerald-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption"]
//     },
//     {
//       id: "giropay",
//       name: "Giropay",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with Giropay (Germany)",
//       color: "from-blue-500 to-indigo-600",
//       darkColor: "from-blue-600 to-indigo-700",
//       secondaryColor: "from-indigo-400 to-blue-500",
//       darkSecondaryColor: "from-indigo-500 to-blue-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption"]
//     },
//     {
//       id: "sepa",
//       name: "SEPA Direct Debit",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with SEPA Direct Debit (Europe)",
//       color: "from-blue-500 to-sky-500",
//       darkColor: "from-blue-600 to-sky-600",
//       secondaryColor: "from-sky-400 to-blue-500",
//       darkSecondaryColor: "from-sky-500 to-blue-600",
//       processingTime: "2-3 business days",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption", "SEPA Protection"]
//     },
//     {
//       id: "bancontact",
//       name: "Bancontact",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with Bancontact (Belgium)",
//       color: "from-yellow-500 to-amber-500",
//       darkColor: "from-yellow-600 to-amber-600",
//       secondaryColor: "from-amber-400 to-yellow-500",
//       darkSecondaryColor: "from-amber-500 to-yellow-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption"]
//     },
//     {
//       id: "eps",
//       name: "EPS",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with EPS (Austria)",
//       color: "from-red-500 to-rose-500",
//       darkColor: "from-red-600 to-rose-600",
//       secondaryColor: "from-rose-400 to-red-500",
//       darkSecondaryColor: "from-rose-500 to-red-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption"]
//     },
//     {
//       id: "p24",
//       name: "Przelewy24",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with Przelewy24 (Poland)",
//       color: "from-blue-500 to-indigo-500",
//       darkColor: "from-blue-600 to-indigo-600",
//       secondaryColor: "from-indigo-400 to-blue-500",
//       darkSecondaryColor: "from-indigo-500 to-blue-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption"]
//     },
//     {
//       id: "multibanco",
//       name: "Multibanco",
//       icon: <Landmark className="h-6 w-6" />,
//       description: "Pay with Multibanco (Portugal)",
//       color: "from-green-500 to-teal-500",
//       darkColor: "from-green-600 to-teal-600",
//       secondaryColor: "from-teal-400 to-green-500",
//       darkSecondaryColor: "from-teal-500 to-green-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Bank-level Security", "Encryption"]
//     },
//     {
//       id: "gift-card",
//       name: "Gift Card",
//       icon: <Gift className="h-6 w-6" />,
//       description: "Pay with a gift card",
//       color: "from-pink-500 to-purple-500",
//       darkColor: "from-pink-600 to-purple-600",
//       secondaryColor: "from-purple-400 to-pink-500",
//       darkSecondaryColor: "from-purple-500 to-pink-600",
//       processingTime: "Instant",
//       fee: "No fee",
//       securityFeatures: ["Encryption"]
//     },
//   ]

//   const savedPaymentMethodsData: SavedPaymentMethod[] = [
//     {
//       id: "pm_1",
//       type: "credit-card",
//       name: "Visa ending in 4242",
//       last4: "4242",
//       expiryDate: "12/25",
//       isDefault: true,
//       icon: <CreditCard className="h-5 w-5" />
//     },
//     {
//       id: "pm_2",
//       type: "paypal",
//       name: "PayPal - johndoe@example.com",
//       last4: "",
//       icon: <Paypal className="h-5 w-5" />
//     },
//     {
//       id: "pm_3",
//       type: "apple-pay",
//       name: "Apple Pay",
//       last4: "",
//       icon: <Apple className="h-5 w-5" />
//     }
//   ]

//   const orderItems: OrderItem[] = [
//     {
//       id: "item_1",
//       name: "Premium Plan - Annual Subscription",
//       description: "Full access to all premium features",
//       price: 99.99,
//       quantity: 1,
//       image: "/placeholder.svg?height=80&width=80"
//     },
//     {
//       id: "item_2",
//       name: "Add-on: Advanced Analytics",
//       description: "Enhanced data insights and reporting",
//       price: 29.99,
//       quantity: 1,
//       image: "/placeholder.svg?height=80&width=80"
//     }
//   ]

//   const discounts: Discount[] = [
//     {
//       code: "WELCOME10",
//       description: "10% off for new customers",
//       amount: 10,
//       type: "percentage"
//     },
//     {
//       code: "SAVE20",
//       description: "20% off your order",
//       amount: 20,
//       type: "percentage"
//     },
//     {
//       code: "FLAT15",
//       description: "$15 off your order",
//       amount: 15,
//       type: "fixed"
//     }
//   ]

//   const shippingMethods: ShippingMethod[] = [
//     {
//       id: "standard",
//       name: "Standard Shipping",
//       price: 0,
//       estimatedDelivery: "3-5 business days",
//       icon: <Truck className="h-5 w-5" />
//     },
//     {
//       id: "express",
//       name: "Express Shipping",
//       price: 9.99,
//       estimatedDelivery: "1-2 business days",
//       icon: <Rocket className="h-5 w-5" />
//     },
//     {
//       id: "overnight",
//       name: "Overnight Shipping",
//       price: 19.99,
//       estimatedDelivery: "Next business day",
//       icon: <Zap className="h-5 w-5" />
//     }
//   ]

//   const billingAddresses: BillingAddress[] = [
//     {
//       id: "addr_1",
//       name: "Home",
//       line1: "123 Main St",
//       city: "San Francisco",
//       state: "CA",
//       postalCode: "94105",
//       country: "United States",
//       isDefault: true
//     },
//     {
//       id: "addr_2",
//       name: "Work",
//       line1: "456 Market St",
//       line2: "Suite 500",
//       city: "San Francisco",
//       state: "CA",
//       postalCode: "94105",
//       country: "United States"
//     }
//   ]

//   // Functions
//   const formatCardNumber = (value: string) => {
//     if (!value) return ""
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     const matches = v.match(/\d{4,16}/g)
//     const match = (matches && matches[0]) || ""
//     const parts = []

//     for (let i = 0, len = match.length; i < len; i += 4) {
//       parts.push(match.substring(i, i + 4))
//     }

//     if (parts.length) {
//       return parts.join(" ")
//     } else {
//       return value
//     }
//   }

//   const formatExpiry = (value: string) => {
//     if (!value) return ""
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    
//     if (v.length >= 3) {
//       return `${v.substring(0, 2)}/${v.substring(2, 4)}`
//     }
    
//     return v
//   }

//   const detectCardType = (number: string) => {
//     const re = {
//       visa: /^4/,
//       mastercard: /^5[1-5]/,
//       amex: /^3[47]/,
//       discover: /^(6011|65|64[4-9]|622)/,
//       diners: /^(36|38|30[0-5])/,
//       jcb: /^35/,
//       unionpay: /^62/
//     }

//     const cleanNumber = number.replace(/\s+/g, "")
    
//     if (re.visa.test(cleanNumber)) return "visa"
//     if (re.mastercard.test(cleanNumber)) return "mastercard"
//     if (re.amex.test(cleanNumber)) return "amex"
//     if (re.discover.test(cleanNumber)) return "discover"
//     if (re.diners.test(cleanNumber)) return "diners"
//     if (re.jcb.test(cleanNumber)) return "jcb"
//     if (re.unionpay.test(cleanNumber)) return "unionpay"
    
//     return "unknown"
//   }

//   const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = formatCardNumber(e.target.value)
//     setCardNumber(value)
//     setCardType(detectCardType(value))
//   }

//   const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = formatExpiry(e.target.value)
//     setCardExpiry(value)
//   }

//   const handleCardCvcFocus = () => {
//     setIsCardFlipped(true)
//   }

//   const handleCardCvcBlur = () => {
//     setIsCardFlipped(false)
//   }

//   const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (isMobile) return
    
//     const rect = e.currentTarget.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top
//     const centerX = rect.width / 2
//     const centerY = rect.height / 2
    
//     const rotateY = ((x - centerX) / centerX) * 10
//     const rotateX = ((centerY - y) / centerY) * 10
    
//     cardControls.start({
//       rotateY,
//       rotateX,
//       transition: { type: "spring", stiffness: 300, damping: 30 }
//     })
//   }

//   const handleCardHoverEnd = () => {
//     if (isMobile) return
    
//     cardControls.start({
//       rotateY: 0,
//       rotateX: 0,
//       transition: { type: "spring", stiffness: 300, damping: 30 }
//     })
//   }

//   const calculateSubtotal = () => {
//     return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0)
//   }

//   const calculateDiscount = () => {
//     if (!appliedDiscount) return 0
    
//     const subtotal = calculateSubtotal()
    
//     if (appliedDiscount.type === "percentage") {
//       return (subtotal * appliedDiscount.amount) / 100
//     } else {
//       return appliedDiscount.amount
//     }
//   }

//   const calculateShipping = () => {
//     const method = shippingMethods.find(m => m.id === selectedShippingMethod)
//     return method ? method.price : 0
//   }

//   const calculateTax = () => {
//     const subtotal = calculateSubtotal()
//     const discount = calculateDiscount()
//     return ((subtotal - discount) * 0.0825) // 8.25% tax rate
//   }

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal()
//     const discount = calculateDiscount()
//     const shipping = calculateShipping()
//     const tax = calculateTax()
    
//     return subtotal - discount + shipping + tax
//   }

//   const handleApplyDiscount = () => {
//     setIsApplyingDiscount(true)
    
//     // Simulate API call
//     setTimeout(() => {
//       const discount = discounts.find(d => d.code.toLowerCase() === discountCode.toLowerCase())
      
//       if (discount) {
//         setAppliedDiscount(discount)
//         toast({
//           title: "Discount applied!",
//           description: discount.description,
//           variant: "default",
//         })
//       } else {
//         toast({
//           title: "Invalid discount code",
//           description: "Please check your code and try again",
//           variant: "destructive",
//         })
//       }
      
//       setIsApplyingDiscount(false)
//     }, 1000)
//   }

//   const handleRemoveDiscount = () => {
//     setAppliedDiscount(null)
//     setDiscountCode("")
    
//     toast({
//       title: "Discount removed",
//       description: "Your discount has been removed",
//       variant: "default",
//     })
//   }

//   const handlePaymentMethodChange = (methodId: string) => {
//     setActivePaymentMethod(methodId)
//     setUseSavedPaymentMethod(false)
//     setSelectedSavedMethod(null)
//   }

//   const handleSavedMethodSelect = (methodId: string) => {
//     setSelectedSavedMethod(methodId)
//     setUseSavedPaymentMethod(true)
//   }

//   const handleSubmitPayment = () => {
//     setIsProcessing(true)
//     setPaymentProgress(0)
    
//     // Simulate payment processing
//     const interval = setInterval(() => {
//       setPaymentProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           return 100
//         }
//         return prev + 10
//       })
//     }, 300)
    
//     // Simulate API call
//     setTimeout(() => {
//       clearInterval(interval)
//       setPaymentProgress(100)
      
//       setTimeout(() => {
//         setIsProcessing(false)
//         setIsPaymentComplete(true)
        
//         // Trigger confetti
//         if (confettiRef.current) {
//           const rect = confettiRef.current.getBoundingClientRect()
//           confetti({
//             particleCount: 100,
//             spread: 70,
//             origin: { 
//               y: rect.top / window.innerHeight,
//               x: rect.left / window.innerWidth + 0.5
//             }
//           })
//         }
        
//         toast({
//           title: "Payment successful!",
//           description: "Your order has been processed",
//           variant: "default",
//         })
//       }, 500)
//     }, 3000)
//   }

//   const handleNextStep = () => {
//     setCurrentStep(prev => prev + 1)
//   }

//   const handlePrevStep = () => {
//     setCurrentStep(prev => prev - 1)
//   }

//   const handleShowScanner = () => {
//     setShowScanner(true)
    
//     // Simulate scanning
//     setTimeout(() => {
//       setCardNumber("4242 4242 4242 4242")
//       setCardName("John Doe")
//       setCardExpiry("12/25")
//       setCardCvc("123")
//       setCardType("visa")
//       setShowScanner(false)
      
//       toast({
//         title: "Card scanned successfully!",
//         description: "Your card details have been filled automatically",
//         variant: "default",
//       })
//     }, 3000)
//   }

//   const handleShowQrCode = () => {
//     setShowQrCode(true)
//   }

//   const handleShowCryptoAddress = () => {
//     setShowCryptoAddress(true)
//   }

//   const handleShowBankDetails = () => {
//     setShowBankDetails(true)
//   }

//   // Effects
//   useEffect(() => {
//     // Load saved payment methods
//     setSavedPaymentMethods(savedPaymentMethodsData)
//   }, [])

//   useEffect(() => {
//     // Reset form when payment method changes
//     setCardNumber("")
//     setCardName("")
//     setCardExpiry("")
//     setCardCvc("")
//     setCardType("unknown")
//     setIsCardFlipped(false)
//   }, [activePaymentMethod])

//   // Render
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
//               <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500">
//                 Complete Your Payment
//               </span>
//             </h1>
//             <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
//               Choose your preferred payment method and securely complete your transaction
//             </p>
//           </motion.div>
          
//           {/* Progress Steps */}
//           <div className="mt-8 max-w-4xl mx-auto">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
//               </div>
//               <div className="relative flex justify-between">
//                 {[1, 2, 3].map((step) => (
//                   <div 
//                     key={step}
//                     className={cn(
//                       "flex items-center justify-center w-12 h-12 rounded-full text-lg font-medium",
//                       currentStep > step 
//                         ? "bg-indigo-600 text-white" 
//                         : currentStep === step 
//                           ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-600 dark:ring-indigo-400" 
//                           : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
//                     )}
//                   >
//                     {currentStep > step ? (
//                       <CheckCircle2 className="w-6 h-6" />
//                     ) : (
//                       step
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400">
//                 <div className={currentStep >= 1 ? "text-indigo-600 dark:text-indigo-400" : ""}>
//                   Payment Method
//                 </div>
//                 <div className={currentStep >= 2 ? "text-indigo-600 dark:text-indigo-400" : ""}>
//                   Billing Details
//                 </div>
//                 <div className={currentStep >= 3 ? "text-indigo-600 dark:text-indigo-400" : ""}>
//                   Confirmation
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
//           {/* Main content */}
//           <motion.section 
//             aria-labelledby="payment-heading" 
//             className="lg:col-span-7"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <div ref={confettiRef}>
//               {/* Step 1: Payment Method */}
//               {currentStep === 1 && (
//                 <div>
//                   <Card className="overflow-hidden border-gray-200 dark:border-gray-800">
//                     <CardHeader className="bg-white dark:bg-gray-900 px-6">
//                       <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
//                         <CreditCard className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
//                         Select Payment Method
//                       </CardTitle>
//                       <CardDescription className="text-gray-500 dark:text-gray-400">
//                         Choose how you'd like to pay for your order
//                       </CardDescription>
//                     </CardHeader>
                    
//                     <CardContent className="p-6 bg-white dark:bg-gray-900">
//                       {/* Saved Payment Methods */}
//                       {savedPaymentMethods.length > 0 && (
//                         <div className="mb-8">
//                           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
//                             Saved Payment Methods
//                           </h3>
//                           <div className="space-y-3">
//                             {savedPaymentMethods.map((method) => (
//                               <div
//                                 key={method.id}
//                                 className={cn(
//                                   "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
//                                   useSavedPaymentMethod && selectedSavedMethod === method.id
//                                     ? "border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
//                                     : "border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700"
//                                 )}
//                                 onClick={() => handleSavedMethodSelect(method.id)}
//                               >
//                                 <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
//                                   {method.icon}
//                                 </div>
//                                 <div className="ml-4 flex-1">
//                                   <div className="flex items-center justify-between">
//                                     <p className="text-sm font-medium text-gray-900 dark:text-white">
//                                       {method.name}
//                                     </p>
//                                     {method.isDefault && (
//                                       <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
//                                         Default
//                                       </Badge>
//                                     )}
//                                   </div>
//                                   {method.expiryDate && (
//                                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                                       Expires {method.expiryDate}
//                                     </p>
//                                   )}
//                                 </div>
//                                 <div className="ml-4 flex-shrink-0">
//                                   <div className={cn(
//                                     "w-5 h-5 rounded-full border flex items-center justify-center",
//                                     useSavedPaymentMethod && selectedSavedMethod === method.id
//                                       ? "border-indigo-600 dark:border-indigo-400"
//                                       : "border-gray-300 dark:border-gray-700"
//                                   )}>
//                                     {useSavedPaymentMethod && selectedSavedMethod === method.id && (
//                                       <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400" />
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
                          
//                           <div className="mt-4 flex items-center">
//                             <Separator className="flex-grow bg-gray-200 dark:bg-gray-800" />
//                             <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or pay with a new method</span>
//                             <Separator className="flex-grow bg-gray-200 dark:bg-gray-800" />
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Payment Method Grid */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {paymentMethods.map((method) => (
//                           <div
//                             key={method.id}
//                             className={cn(
//                               "relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all",
//                               activePaymentMethod === method.id && !useSavedPaymentMethod
//                                 ? "border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
//                                 : "border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700"
//                             )}
//                             onClick={() => handlePaymentMethodChange(method.id)}
//                           >
//                             {method.popular && (
//                               <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-pink-500 border-0 text-white">
//                                 Popular
//                               </Badge>
//                             )}
//                             {method.new && (
//                               <Badge className="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-emerald-500 border-0 text-white">
//                                 New
//                               </Badge>
//                             )}
//                             {method.comingSoon && (
//                               <Badge className="absolute top-2 right-2 bg-gradient-to-r from-gray-400 to-gray-500 border-0 text-white">
//                                 Coming Soon
//                               </Badge>
//                             )}
//                             <div className="flex items-center mb-3">
//                               <div className={cn(
//                                 "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r text-white",
//                                 `${method.color}`
//                               )}>
//                                 {method.icon}
//                               </div>
//                               <div className="ml-3">
//                                 <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//                                   {method.name}
//                                 </h3>
//                               </div>
//                             </div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
//                               {method.description}
//                             </p>
//                             <div className="mt-auto">
//                               {method.processingTime && (
//                                 <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
//                                   <Clock className="h-3 w-3 mr-1" />
//                                   {method.processingTime}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
                      
//                       {/* Payment Method Details */}
//                       <div className="mt-8">
//                         <AnimatePresence mode="wait">
//                           {activePaymentMethod === "credit-card" && !useSavedPaymentMethod && (
//                             <motion.div
//                               key="credit-card-form"
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               exit={{ opacity: 0, y: -20 }}
//                               transition={{ duration: 0.3 }}
//                             >
//                               <div className="space-y-6">
//                                 {/* 3D Card Preview */}
//                                 <div className="relative h-56 w-full max-w-md mx-auto mb-8">
//                                   <motion.div
//                                     className="absolute inset-0 rounded-xl overflow-hidden perspective-1000"
//                                     animate={cardControls}
//                                     onMouseMove={handleCardHover}
//                                     onMouseLeave={handleCardHoverEnd}
//                                     style={{
//                                       rotateY: cardRotateY,
//                                       rotateX: cardRotateX,
//                                       transformStyle: "preserve-3d",
//                                     }}
//                                   >
//                                     <motion.div
//                                       className={cn(
//                                         "absolute inset-0 rounded-xl p-6 flex flex-col justify-between shadow-xl",
//                                         "bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700",
//                                         isCardFlipped ? "backface-hidden" : ""
//                                       )}
//                                       animate={{ rotateY: isCardFlipped ? 180 : 0 }}
//                                       transition={{ duration: 0.6 }}
//                                     >
//                                       <div>
//                                         <div className="flex justify-between items-center">
//                                           <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-80"></div>
//                                           {cardType !== "unknown" && (
//                                             <div className="text-white text-lg font-medium uppercase">
//                                               {cardType}
//                                             </div>
//                                           )}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <div className="text-white text-xl tracking-widest">
//                                           {cardNumber || "•••• •••• •••• ••••"}
//                                         </div>
//                                         <div className="mt-4 flex justify-between">
//                                           <div>
//                                             <div className="text-white/70 text-xs">CARD HOLDER</div>
//                                             <div className="text-white text-sm">{cardName || "YOUR NAME"}</div>
//                                           </div>
//                                           <div>
//                                             <div className="text-white/70 text-xs">EXPIRES</div>
//                                             <div className="text-white text-sm">{cardExpiry || "MM/YY"}</div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </motion.div>
                                    
//                                     <motion.div
//                                       className={cn(
//                                         "absolute inset-0 rounded-xl p-6 flex flex-col justify-between shadow-xl",
//                                         "bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900",
//                                         !isCardFlipped ? "backface-hidden" : ""
//                                       )}
//                                       style={{ rotateY: 180 }}
//                                       animate={{ rotateY: isCardFlipped ? 0 : -180 }}
//                                       transition={{ duration: 0.6 }}
//                                     >
//                                       <div className="h-10 bg-gray-800 dark:bg-black mt-6"></div>
//                                       <div className="flex justify-end items-center mt-4">
//                                         <div className="bg-white/20 h-10 w-3/4 flex items-center justify-end px-4">
//                                           <div className="text-white text-sm tracking-widest">
//                                             {cardCvc || "•••"}
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="mt-auto">
//                                         <div className="text-white/70 text-xs text-right">
//                                           CVV
//                                         </div>
//                                       </div>
//                                     </motion.div>
//                                   </motion.div>
//                                 </div>
                                
//                                 <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                                   <div className="sm:col-span-2">
//                                     <Label htmlFor="card-number">Card number</Label>
//                                     <div className="mt-1 relative">
//                                       <Input
//                                         type="text"
//                                         id="card-number"
//                                         value={cardNumber}
//                                         onChange={handleCardNumberChange}
//                                         placeholder="1234 5678 9012 3456"
//                                         maxLength={19}
//                                         className="pr-10"
//                                       />
//                                       <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                                         {cardType !== "unknown" ? (
//                                           <span className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">
//                                             {cardType}
//                                           </span>
//                                         ) : (
//                                           <CreditCard className="h-5 w-5 text-gray-400" />
//                                         )}
//                                       </div>
//                                     </div>
//                                   </div>
                                  
//                                   <div className="sm:col-span-2">
//                                     <Label htmlFor="card-name">Name on card</Label>
//                                     <div className="mt-1">
//                                       <Input
//                                         type="text"
//                                         id="card-name"
//                                         value={cardName}
//                                         onChange={(e) => setCardName(e.target.value)}
//                                         placeholder="John Doe"
//                                       />
//                                     </div>
//                                   </div>
                                  
//                                   <div>
//                                     <Label htmlFor="card-expiry">Expiration date (MM/YY)</Label>
//                                     <div className="


"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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

const CARD_TYPES = {
  visa: {
    pattern: /^4/,
    icon: "/placeholder.svg?height=35&width=55",
  },
  mastercard: {
    pattern: /^5[1-5]/,
    icon: "/placeholder.svg?height=35&width=55",
  },
  amex: {
    pattern: /^3[47]/,
    icon: "/placeholder.svg?height=35&width=55",
  },
  discover: {
    pattern: /^(6011|65|64[4-9]|622)/,
    icon: "/placeholder.svg?height=35&width=55",
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

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [formStep, setFormStep] = useState<number>(0)
  const [flipCard, setFlipCard] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [useSpecialOffer, setUseSpecialOffer] = useState(false)
  const [applePay, setApplePay] = useState(false)
  const [googlePay, setGooglePay] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [cardType, setCardType] = useState<keyof typeof CARD_TYPES | null>(null)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [mobileView, setMobileView] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const cardNumberRef = useRef<HTMLInputElement>(null)
  const expiryRef = useRef<HTMLInputElement>(null)
  const cvvRef = useRef<HTMLInputElement>(null)

  // Detect card type based on card number
  useEffect(() => {
    if (cardNumber) {
      for (const [type, { pattern }] of Object.entries(CARD_TYPES)) {
        if (pattern.test(cardNumber.replace(/\s/g, ""))) {
          setCardType(type as keyof typeof CARD_TYPES)
          return
        }
      }
      setCardType(null)
    } else {
      setCardType(null)
    }
  }, [cardNumber])

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

    // Auto-advance to expiry when full card number entered
    if (formattedValue.replace(/\s/g, "").length === 16 && expiryRef.current) {
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

  const cardNumberValid = cardNumber.replace(/\s/g, "").length >= 15
  const expiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate)
  const cvvValid = cvv.length >= 3
  const cardNameValid = cardName.length > 2
  const cardFormValid = cardNumberValid && expiryDateValid && cvvValid && cardNameValid

  // Available payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit / Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Pay with Visa, Mastercard, Discover, or American Express",
      popular: true,
      processingTime: "Instant",
      fees: "No fees",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <PaypalLogo className="h-5 w-5" />,
      description: "Fast, secure checkout with PayPal",
      processingTime: "Instant",
      fees: "No fees",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: <Bitcoin className="h-5 w-5" />,
      description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
      processingTime: "10-60 minutes",
      fees: "Network fees apply",
      color: "from-orange-500 to-amber-600",
    },
    {
      id: "applepay",
      name: "Apple Pay",
      icon: <Apple className="h-5 w-5" />,
      description: "Quick and secure checkout with Apple Pay",
      processingTime: "Instant",
      fees: "No fees",
      color: "from-gray-600 to-gray-900",
    },
    {
      id: "googlepay",
      name: "Google Pay",
      icon: <GooglePay className="h-5 w-5" />,
      description: "Quick checkout with Google Pay",
      processingTime: "Instant",
      fees: "No fees",
      color: "from-blue-500 to-green-500",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <BankTransfer className="h-5 w-5" />,
      description: "Pay directly from your bank account",
      processingTime: "1-3 business days",
      fees: "May include bank fees",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "giftcard",
      name: "Gift Card",
      icon: <Gift className="h-5 w-5" />,
      description: "Redeem a gift card or promo code",
      processingTime: "Instant",
      fees: "No fees",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: <Wallet className="h-5 w-5" />,
      description: "Use your digital wallet balance",
      processingTime: "Instant",
      fees: "No fees",
      color: "from-purple-500 to-violet-600",
    },
  ]

  const items = [
    { name: "Premium Plan (Annual)", price: 199.99, saving: "20%" },
    { name: "Setup Fee", price: 0, waived: true },
    { name: "Priority Support", price: 49.99 },
  ]

  const subtotal = items.reduce((acc, item) => acc + item.price, 0)
  const discount = useSpecialOffer ? 25 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + tax

  // Handle continueTo step
  const continueTo = (step: number) => {
    if (step === 2) {
      setPaymentProcessing(true)
      setTimeout(() => {
        setPaymentProcessing(false)
        setPaymentComplete(true)
        setFormStep(step)
      }, 2500)
    } else {
      setFormStep(step)
    }
  }

  // Check form validity based on payment method
  const isFormValid = () => {
    switch (paymentMethod) {
      case "card":
        return cardFormValid
      case "paypal":
        return true
      case "crypto":
        return true
      case "applepay":
        return applePay
      case "googlepay":
        return googlePay
      case "bank":
        return true
      case "giftcard":
        return true
      case "wallet":
        return true
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

  const fakeSavedCards = [
    {
      id: "card1",
      type: "visa",
      last4: "4242",
      expiry: "09/25",
      name: "John Doe",
      isDefault: true,
    },
    {
      id: "card2",
      type: "mastercard",
      last4: "8975",
      expiry: "12/24",
      name: "John Doe",
      isDefault: false,
    },
  ]

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
        return (
          <div className="space-y-6">
            <div className="relative perspective-1000">
              <motion.div
                className="relative w-full h-56 transition-all duration-500 preserve-3d"
                animate={{ rotateY: flipCard ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="text-white/70 text-xs uppercase tracking-wider">Credit Card</div>
                        <div className="text-white/90 text-xs mt-1">
                          {cardType ? (
                            <span className="uppercase">{cardType}</span>
                          ) : (
                            <span>Visa / Mastercard / Amex</span>
                          )}
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
                      <div className="text-xl text-white font-mono tracking-wider">
                        {cardNumber || "•••• •••• •••• ••••"}
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Card Holder</div>
                        <div className="text-white font-medium truncate max-w-[180px]">{cardName || "YOUR NAME"}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Expires</div>
                        <div className="text-white font-medium">{expiryDate || "MM/YY"}</div>
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

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden rotateY-180">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-violet-600 p-5 flex flex-col">
                    <div className="w-full h-12 bg-black/30 mt-4"></div>

                    <div className="mt-6 flex justify-end">
                      <div className="bg-white/90 h-10 w-full max-w-[80%] rounded relative flex items-center px-3">
                        <div className="absolute text-right w-full pr-12 font-mono text-gray-600 tracking-widest">
                          {cvv || "•••"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto text-xs text-white/70 max-w-[80%]">
                      This card is property of your bank. Unauthorized use is prohibited. If found, please return to
                      your bank.
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
              {fakeSavedCards.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Saved Cards</h3>
                  <div className="space-y-3">
                    {fakeSavedCards.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                        onClick={() => {
                          setCardNumber(`•••• •••• •••• ${card.last4}`)
                          setCardName(card.name)
                          setExpiryDate(card.expiry)
                          setCvv("•••")
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-md grid place-items-center">
                            <img src={`/placeholder.svg?height=30&width=40`} alt={card.type} className="max-h-6" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.last4}
                            </div>
                            <div className="text-xs text-muted-foreground">Expires {card.expiry}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {card.isDefault && (
                            <Badge className="mr-2" variant="outline">
                              Default
                            </Badge>
                          )}
                          <Button variant="ghost" size="icon">
                            <Check
                              className={cn("h-4 w-4 transition-opacity", card.isDefault ? "opacity-100" : "opacity-0")}
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-6" />
                  <h3 className="text-base font-medium mb-3">Add New Card</h3>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      ref={cardNumberRef}
                      className="pr-12"
                    />
                    {cardType && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <img src={CARD_TYPES[cardType].icon || "/placeholder.svg"} alt={cardType} className="h-6" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      ref={expiryRef}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cvv">Security Code</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-56">
                              The 3 or 4 digit security code found on the back of your card (or front for Amex).
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="cvv"
                      placeholder="CVV"
                      value={cvv}
                      onChange={handleCvvChange}
                      maxLength={4}
                      onFocus={handleCvvFocus}
                      onBlur={handleCvvBlur}
                      ref={cvvRef}
                    />
                  </div>
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
              <Tabs defaultValue="bitcoin" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
                  <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                  <TabsTrigger value="other">Others</TabsTrigger>
                </TabsList>
                <TabsContent value="bitcoin" className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-2 rounded-lg mb-3">
                      <img src="/placeholder.svg?height=180&width=180" alt="Bitcoin QR Code" className="h-40 w-40" />
                    </div>
                    <div className="text-sm text-center">
                      <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
                        bc1q8y34567x90zv67n56qwerty78mn65al2345xz
                      </p>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Address
                      </Button>
                    </div>
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
                    <div className="bg-white p-2 rounded-lg mb-3">
                      <img src="/placeholder.svg?height=180&width=180" alt="Ethereum QR Code" className="h-40 w-40" />
                    </div>
                    <div className="text-sm text-center">
                      <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs break-all mb-2">
                        0x1234567890abcdef1234567890abcdef12345678
                      </p>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Address
                      </Button>
                    </div>
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
                  <Select>
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
                onClick={() => setApplePay(true)}
              >
                <Apple className="h-5 w-5 mr-2" />
                <span className="font-medium">Pay</span>
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

            {applePay && (
              <div className="mt-4 text-center text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
                <p>Apple Pay authorized successfully!</p>
              </div>
            )}
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
                onClick={() => setGooglePay(true)}
              >
                <GooglePay className="h-5 w-5 mr-2" />
                <span className="font-medium">Pay</span>
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

            {googlePay && (
              <div className="mt-4 text-center text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
                <p>Google Pay authorized successfully!</p>
              </div>
            )}
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
                  <span className="font-medium">ACME Corporation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account number:</span>
                  <span className="font-mono font-medium">12345678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Routing number:</span>
                  <span className="font-mono font-medium">987654321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SWIFT/BIC:</span>
                  <span className="font-mono font-medium">ABCDUS33</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-mono font-medium">INV-1234-5678</span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full">
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
                <Input id="giftcard" placeholder="XXXX-XXXX-XXXX-XXXX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin">PIN (if applicable)</Label>
                <Input id="pin" placeholder="1234" maxLength={4} />
              </div>

              <Button className="w-full mt-2">Apply Gift Card</Button>
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
                  <p className="text-2xl font-bold">$350.00</p>
                </div>
                <Button variant="outline" size="sm">
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
                <Badge
                  variant="outline"
                  className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  Sufficient Funds
                </Badge>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Pay from Wallet</Button>
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

  // Render the main component
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
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
          <div className="space-y-8">
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
                    className={cn("text-xs", formStep === index ? "font-medium text-primary" : "text-muted-foreground")}
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
                    <Button variant="ghost" onClick={() => setFormStep(0)} className="text-muted-foreground">
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
                    <CardContent className="pt-6">{renderPaymentMethodForm()}</CardContent>
                  </Card>

                  <div className="pt-4 flex items-center justify-between">
                    <Button variant="outline" onClick={() => setFormStep(0)}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      onClick={() => continueTo(2)}
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
                            TRX-{Math.random().toString(36).substring(2, 10).toUpperCase()}
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
                        <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                          Continue to Your Account
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setFormStep(1)} className="text-muted-foreground">
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

                          <div className="pt-4 space-y-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="terms" />
                              <label
                                htmlFor="terms"
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I agree to the{" "}
                                <a href="#" className="text-primary underline hover:text-primary/90">
                                  Terms and Conditions
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary underline hover:text-primary/90">
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
                          <Button variant="outline" onClick={() => setFormStep(1)}>
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back
                          </Button>
                          <Button
                            onClick={() => continueTo(2)}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                          >
                            Confirm Payment
                            <Lock className="h-4 w-4 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
  )
}

export default PaymentPage

