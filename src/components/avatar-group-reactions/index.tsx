"use client";
import { IReaction } from "@/types/reaction";
import { Avatar, AvatarGroup, Badge } from "@nextui-org/react";
import { Emoji } from "emoji-picker-react";
import React from "react";

const AvatarGroupReactions = ({reactions}:{reactions:IReaction[]}) => {
  return (
    <div className="flex justify-end">
      <AvatarGroup isBordered max={3} size="sm">
        {reactions?.map((item: IReaction) => (
          <Badge
            key={item.userID}
            content={<Emoji unified={item.codeReaction} size={15} />}
            classNames={{
              badge: "bg-transparent border-none",
            }}
          >
            <Avatar src={item.userImage} showFallback />
          </Badge>
        ))}
      </AvatarGroup>
    </div>
  );
};

export default AvatarGroupReactions;
