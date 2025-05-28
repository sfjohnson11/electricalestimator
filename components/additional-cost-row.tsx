import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useEstimate } from "@/context/estimate-context"

interface AdditionalCostRowProps {
  item: {
    id: string
    description: string
    cost: number
  }
  index: number
}

export default function AdditionalCostRow({ item, index }: AdditionalCostRowProps) {
  const { updateAdditionalCost, removeAdditionalCost } = useEstimate()

  return (
    <div className="flex flex-wrap items-center space-x-2 mb-2 bg-blue-50 p-2 rounded">
      <Input
        value={item.description}
        onChange={(e) => updateAdditionalCost(item.id, { description: e.target.value })}
        placeholder="Description"
        className="flex-grow bg-white border-blue-200 mb-2 sm:mb-0"
      />
      <Input
        type="number"
        value={item.cost}
        onChange={(e) => updateAdditionalCost(item.id, { cost: Number(e.target.value) })}
        placeholder="Cost"
        className="w-24 bg-white border-blue-200"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeAdditionalCost(item.id)}
        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
