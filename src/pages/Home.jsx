import React from "react";
import MainInputBox from "../components/homepage/MainInputBox";
import Banner1 from "../components/homepage/Banner1";
import ImageQRCodeBanner from "../components/homepage/ImageQRCodeBanner";
import HelpBoxes from "../components/homepage/HelpBoxes";
import QatarVisitBanner from "../components/homepage/QatarVisitBanner";
import ManSeeBanner from "../components/homepage/ManSeeBanner";

const HomePage = () => {
  return (
    <div>
      <MainInputBox />
      <Banner1 />
      <ImageQRCodeBanner />
      <HelpBoxes />
      <QatarVisitBanner />
      <ManSeeBanner />
    </div>
  );
};

export default HomePage;
