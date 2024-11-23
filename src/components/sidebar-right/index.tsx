'use client'
import React from "react";
import InformationIcon from "../information-icon";
import Contact from "../contact";
import { IContact } from "@/types/contact";
import { useQuery } from "react-query";


const SidebarRight = () => {
  const {data} = useQuery({
    queryKey:'contacts',
    queryFn: async () => await fetch(`http://localhost:8000/contacts`).then(res => res.json())
  })
  return (
    <div className="p-3 bg-white rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Add to your feed</p>
        <InformationIcon />
      </div>
      <div className="space-y-3">
        {data?.map((item:IContact) => <Contact key={item.id} contact={item}/>)}
      </div>
    </div>
  );
};

export default SidebarRight;
