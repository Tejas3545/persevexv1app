"use client";

import { Suspense } from "react";
import DustPlane from "./DustPlane";

interface SceneProps {
  hover: {
    stars: boolean;
    dust: boolean;
  };
}

export default function Scene({ hover }: SceneProps) {

    
  return (

    <div className="fixed top-0 left-0 w-full h-full">
      
    </div>
  );
}