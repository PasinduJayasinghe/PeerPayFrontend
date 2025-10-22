import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

type StatColor = 'blue' | 'green' | 'orange' | 'red'

interface StatCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  trend?: number
  color?: StatColor
}

export function StatCard({ label, value, icon: Icon, trend, color = 'blue' }: StatCardProps) {
  const colorClasses: Record<StatColor, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <Card className={colorClasses[color]}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {Icon && <Icon size={32} className="opacity-50" />}
      </div>
    </Card>
  )
}