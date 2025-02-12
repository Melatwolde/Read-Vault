import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

type ComponentKey = string; // Define ComponentKey type



interface AppSidebarProps {
  onSelect: (component: ComponentKey) => void;
  componentsMap: { [key in ComponentKey]: React.ComponentType };
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onSelect, componentsMap, ...props }) => {
  return (
    <div className="sidebar">
      <ul>
        {Object.keys(componentsMap).map((componentKey) => (
          <li key={componentKey} onClick={() => onSelect(componentKey)}>
            {componentKey}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppSidebar;