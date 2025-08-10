import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const StudentEngagementSection = (): JSX.Element => {
  // Data for the engagement statistics
  const stats = [
    { value: "488", description: "student branches" },
    { value: "73", description: "different locations" },
  ];

  return (
    <Card className="w-full max-w-[1053px] mx-auto my-12 md:my-16 font-['Urbanist',Helvetica] mx-4 md:mx-auto">
      <CardContent className="p-8 md:p-12 text-center">
        <p className="text-lg md:text-2xl tracking-[0.92px] leading-[29px] px-4">
          Having{" "}
          <span className="font-bold text-[#304674]">{stats[0].value}</span>{" "}
          {stats[0].description} and rooted firmly at{" "}
          <span className="font-bold text-[#304674]">{stats[1].value}</span>{" "}
          {stats[1].description}, CSI has plans of opening more chapters &amp;
          activity centers in smaller towns of the country. The idea is to
          spread the knowledge.
        </p>
      </CardContent>
    </Card>
  );
};
