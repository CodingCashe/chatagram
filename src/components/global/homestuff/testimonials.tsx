import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Social Media Influencer",
    content: "Chatal has revolutionized the way I interact with my followers. It's like having a personal assistant for my DMs!",
    avatar: "/avatar1.jpg",
  },
  {
    name: "Mike Chen",
    role: "E-commerce Business Owner",
    content: "The automation features have saved us countless hours and helped us close more sales through Instagram.",
    avatar: "/avatar2.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Digital Marketing Agency",
    content: "We've seen a 40% increase in client engagement since using Chatal. It's a game-changer for our agency.",
    avatar: "/avatar3.jpg",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg text-black">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

