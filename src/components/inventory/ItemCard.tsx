import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Eye, Edit, Trash2, MapPin } from 'lucide-react';

interface ItemCardProps {
  item: InventoryItem;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onView,
  onEdit,
  onDelete,
}) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{item.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onView}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Image */}
        {item.photos.length > 0 && (
          <div className="w-full h-32 mb-3 overflow-hidden rounded-md">
            <img
              src={item.photos[0]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{item.category}</Badge>
            <Badge className={getConditionColor(item.condition)}>
              {item.condition}
            </Badge>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            {item.room}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Value</span>
            <span className="font-semibold text-lg">${item.currentValue.toLocaleString()}</span>
          </div>

          {item.brand && (
            <div className="text-sm">
              <span className="text-muted-foreground">Brand: </span>
              <span>{item.brand}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};