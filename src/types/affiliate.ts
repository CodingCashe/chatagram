export type LeaderboardEntry = {
    id: string
    name: string
    userId: string | null
    totalEarned: number
    bio: string | null
    _count: {
      referrals: number
    }
  }
  
  export type AffiliateStatsCardsProps = {
    stats: {
      totalPrograms: number
      totalAffiliates: number
      totalReferrals: number
      totalCommissions: number
      pendingPayouts: number
      conversionRate: number
    }
  }
  
  export type MonthlyData = {
    month: string
    year: number
    clicks: number
    referrals: number
    commissions: number
  }
  
  export type AffiliateChartsProps = {
    data: MonthlyData[]
  }
  
  