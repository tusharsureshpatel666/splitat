import Heading from "@/app/dashboard/components/heading";
import clsx from "clsx";
import { FaStore, FaBuilding, FaWarehouse } from "react-icons/fa";
import { IoMdCafe } from "react-icons/io";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const StepTypeStore = ({ value, onChange }: Props) => {
  const storetype = [
    {
      id: 1,
      title: "Small Store / Single Room",
      description: "Ideal for kirana, salon, mobile repair",
      icon: FaStore,
    },
    {
      id: 2,
      title: "Medium Store",
      description: "Suitable for café, boutique, coaching center",
      icon: IoMdCafe,
    },
    {
      id: 3,
      title: "Large Store / Showroom",
      description: "Best for restaurant, gym, electronics",
      icon: FaBuilding,
    },
    {
      id: 4,
      title: "Warehouse / Godown",
      description: "Used for storage, wholesale, logistics",
      icon: FaWarehouse,
    },
  ];

  return (
    <div className="flex flex-col w-full  space-y-5">
      <Heading
        title="Choose Your Store Size"
        description="Select the option that best matches your store space."
        className="mb-5 text-center w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {storetype.map((item) => {
          const selected = value === item.title;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => onChange(item.title)}
              className={clsx(
                "cursor-pointer rounded-xl border-2 p-3 md:p-4 transition-colors",
                "hover:border-[var(--primary)] hover:bg-[color:var(--primary)/0.08]",
                selected
                  ? "border-[var(--primary)] bg-[color:var(--primary)/0.12]"
                  : "border-gray-300 dark:border-gray-700",
              )}
            >
              <div className="flex items-center gap-4">
                <Icon
                  className={clsx(
                    "text-3xl",
                    selected
                      ? "text-[var(--primary)]"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                />

                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepTypeStore;
