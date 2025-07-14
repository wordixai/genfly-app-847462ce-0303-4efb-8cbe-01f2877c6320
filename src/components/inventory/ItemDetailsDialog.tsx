import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, MapPin, Tag, DollarSign, Package } from 'lucide-react';

interface ItemDetailsDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({
  item,
  open,
  onOpenChange,
}) => {
  if (!item) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photos */}
          {item.photos.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Photos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {item.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${item.name} photo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            <p className="text-muted-foreground">{item.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Room:</span>
                <Badge variant="outline">{item.room}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Condition:</span>
                <Badge className={getConditionColor(item.condition)}>
                  {item.condition}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Purchase Date:</span>
                <span>{new Date(item.purchaseDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Details */}
          {(item.brand || item.model || item.serialNumber) && (
            <div className="space-y-4">
              <h3 className="font-semibold">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {item.brand && (
                  <div>
                    <span className="text-sm text-muted-foreground">Brand:</span>
                    <p className="font-medium">{item.brand}</p>
                  </div>
                )}
                {item.model && (
                  <div>
                    <span className="text-sm text-muted-foreground">Model:</span>
                    <p className="font-medium">{item.model}</p>
                  </div>
                )}
                {item.serialNumber && (
                  <div>
                    <span className="text-sm text-muted-foreground">Serial Number:</span>
                    <p className="font-medium">{item.serialNumber}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Purchase Price:</span>
                <p className="text-xl font-semibold">${item.purchasePrice.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Current Value:</span>
                <p className="text-xl font-semibold text-green-600">${item.currentValue.toLocaleString()}</p>
              </div>
            </div>
            
            {item.purchasePrice > 0 && (
              <div>
                <span className="text-sm text-muted-foreground">Value Change:</span>
                <p className={`font-medium ${item.currentValue >= item.purchasePrice ? 'text-green-600' : 'text-red-600'}`}>
                  {item.currentValue >= item.purchasePrice ? '+' : ''}
                  ${(item.currentValue - item.purchasePrice).toLocaleString()} 
                  ({(((item.currentValue - item.purchasePrice) / item.purchasePrice) * 100).toFixed(1)}%)
                </p>
              </div>
            )}
          </div>

          {/* Warranty */}
          {item.warranty && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">Warranty Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Provider:</span>
                    <p className="font-medium">{item.warranty.provider}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Expires:</span>
                    <p className="font-medium">{new Date(item.warranty.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Notes */}
          {item.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Notes</h3>
                <p className="text-muted-foreground">{item.notes}</p>
              </div>
            </>
          )}

          {/* Metadata */}
          <Separator />
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(item.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};