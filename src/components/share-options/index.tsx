"use client";

import {
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import React from "react";

const ShareOptions = () => {
  return (
    <div className="flex mt-2 space-x-1">
      <div title="Telegram">
        <TelegramShareButton
          url={"http://localhost:3000"}
          title={"Share Linkedin clone on Telegram"}
        >
          <TelegramIcon size={32} round xlinkTitle="Telegram" />
        </TelegramShareButton>
      </div>
      <div title="Whatsapp">
        <WhatsappShareButton
          url={"http://localhost:3000"}
          title={"Share Linkedin clone on Whatsapp"}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <div title="Linkedin">
        <LinkedinShareButton
          url={"http://localhost:3000"}
          title={"Share Linkedin clone on Likedin"}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      <div title="Twitter">
        <TwitterShareButton
          url={"http://localhost:3000"}
          title={"Share Linkedin clone on Twitter"}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareOptions;
