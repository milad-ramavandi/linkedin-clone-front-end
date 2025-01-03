"use client";
import React, { FocusEventHandler, useState } from "react";

import OverleyEffect from "../overlay-effect";

import HeaderLeft from "../header-left";
import HeaderRight from "../header-right";

const Header = () => {
  const [isShowOverlay, setIsShowOverlay] = useState<boolean>(false);

  const focusOverlayHandler: FocusEventHandler = () => setIsShowOverlay(true);
  const blurOverlayHandler: FocusEventHandler = () => setIsShowOverlay(false);

  return (
    <>
      <header className={"p-2 border-b sticky top-0 z-40 bg-white"}>
        <div
          className={
            "flex items-center justify-between max-w-screen-lg mx-auto"
          }
        >
          <HeaderLeft
            isShowOverlay={isShowOverlay}
            focusOverlayHandler={focusOverlayHandler}
            blurOverlayHandler={blurOverlayHandler}
          />
          <HeaderRight />
        </div>
      </header>
      {isShowOverlay && <OverleyEffect />}
    </>
  );
};

export default Header;
