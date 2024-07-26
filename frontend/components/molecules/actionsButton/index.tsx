import { Button } from "@/components/atoms";
import { GrTransaction } from "react-icons/gr";
import { MdMoveUp } from "react-icons/md";

export default function ActionsButton() {
  return (
    <div className="flex md:flex-col justify-around">
      <AButton icon={<MdMoveUp />} title="move pockets" />
      <AButton icon={<GrTransaction />} title="send to another account" />
    </div>
  );
}

function AButton({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-2 space-y-1 justify-center md:justify-start items-center">
      <Button icon={icon} />
      <p className="font-medium">{title}</p>
    </div>
  );
}
