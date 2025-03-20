import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Columns, Grid, Grid3X3, LayoutGrid, PanelLeft, Rows } from 'lucide-react';
import { GRID_LAYOUTS, GridLayout, useLayoutStore } from '@/store/useLayoutStore';

const GridLayoutSelector = () => {
  const { layout, setLayout } = useLayoutStore();

  const getLayoutIcon = (gridType: GridLayout) => {
    switch (gridType) {
      case 'Single':
        return <Columns className="w-4 h-4" />;
      case 'Double':
        return <Grid3X3 className="w-4 h-4" />;
      case 'Triple':
        return <Grid className="w-4 h-4" />;
      case 'Quad':
        return <LayoutGrid className="w-4 h-4" />;
      case 'Masonry':
        return <Rows className="w-4 h-4" />;
      case 'Sidebar':
        return <PanelLeft className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-white px-4 py-2">
            {getLayoutIcon(layout)}
            <span className="text-sm font-medium">{layout} Grid</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {(Object.keys(GRID_LAYOUTS) as GridLayout[]).map((gridType) => (
            <DropdownMenuItem
              key={gridType}
              onClick={() => setLayout(gridType)}
              className={`flex items-center gap-2 cursor-pointer ${layout === gridType ? 'bg-gray-50' : ''}`}
            >
              {getLayoutIcon(gridType)}
              <span>{gridType} Grid</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GridLayoutSelector;
