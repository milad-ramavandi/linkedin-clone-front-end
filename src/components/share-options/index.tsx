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
          url={"https://github.com/milad-ramavandi/linkedin-clone"}
          title={"Welcome to Likedin Clone"}
        >
          <TelegramIcon size={32} round xlinkTitle="Telegram" />
        </TelegramShareButton>
      </div>
      <div title="Whatsapp">
        <WhatsappShareButton
          url={"https://github.com/milad-ramavandi/linkedin-clone"}
          title={"Welcome to Likedin Clone"}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <div title="Linkedin">
        <LinkedinShareButton
          url={"https://github.com/milad-ramavandi/linkedin-clone"}
          title={"Welcome to Likedin Clone"}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      <div title="Twitter">
        <TwitterShareButton
          url={"https://github.com/milad-ramavandi/linkedin-clone"}
          title={"Welcome to Likedin Clone"}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareOptions;
