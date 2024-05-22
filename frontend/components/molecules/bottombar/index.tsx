import { IconList } from "@/components/atoms";
import { dashboard_menu_bottom_mobile } from "@/data/menu_mobile";

const BottomBar = () => {
  return (
    <aside className="bg-white grid grid-cols-4 p-1 rounded-md shadow-lg">
      {dashboard_menu_bottom_mobile.map((item, i) => (
        <IconList
          key={i}
          title={item.title}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </aside>
  );
};

export default BottomBar;
