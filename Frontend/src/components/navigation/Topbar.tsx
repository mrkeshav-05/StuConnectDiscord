import { Users } from "lucide-react"
import { useState } from "react";
import ManageMembers from "@/components/navigation/ManageMembers";

const Topbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(prev => !prev);
    };

  return (
    <div className="w-full h-6 bg-[#1E1F22] flex items-center">
      <Users onClick={toggleModal} className="w-4 h-4 m-1 hover:text-blue-400 rounded-sm"/>
      <ManageMembers isOpen={isOpen} onClose={toggleModal}/>
    </div>
  )
}

export default Topbar
