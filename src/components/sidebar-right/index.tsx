import React from "react";
import InformationIcon from "../information-icon";
import Contact from "../contact";
import { IContact } from "@/types/contact";


const SidebarRight = async () => {
  const res= await fetch("http://localhost:8000/contacts")
  const contacts:IContact[] = await res.json()


  return (
    <div className="p-3 bg-white rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Add to your feed</p>
        <InformationIcon />
      </div>
      <div className="space-y-3">
        {contacts.map(item => <Contact key={item.id} contact={item}/>)}
      </div>
    </div>
  );
};

export default SidebarRight;
