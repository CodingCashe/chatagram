import React from 'react'
import { Crown, Rocket, Shield } from 'lucide-react'

type Props = {
  userName: string
}

const UpgradedCard = ({ userName }: Props) => {
  return (
    <div className="bg-gradient-to-br from-[#2A2A2A] to-[#3D3D3D] p-2 m-3 rounded-2xl flex flex-col gap-y-2 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">
          <Crown className="inline-block text-yellow-400 mr-1" size={18} />
          <span className="bg-gradient-to-r from-[#CC3BD4] to-[#D064AC] font-bold bg-clip-text text-transparent">
            Premium Member
          </span>
        </span>
      </div>
      <p className="text-[#E0E0E0] text-xs">
        <span className="font-medium">You are using:</span>
      </p>
      <div className="bg-[#252525] rounded-xl p-2">
        <ul className="text-[#B0B0B0] text-xs space-y-1">
          <li className="flex items-center">
            <Rocket className="text-[#CC3BD4] mr-1" size={12} />
            Smart AI responses
          </li>
          <li className="flex items-center">
            <Shield className="text-[#D064AC] mr-1" size={12} />
            Unlimited Automations!
          </li>
        </ul>
      </div>
      <div className="text-center">
        <span className="text-[10px] text-[#9B9CA0]">
          Member since {new Date().getFullYear()}
        </span>
      </div>
    </div>
  )
}

export default UpgradedCard

