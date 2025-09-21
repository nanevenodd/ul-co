"use client";

import { useEffect } from "react";

interface DynamicTitleProps {
  title: string;
}

export default function DynamicTitle({ title }: DynamicTitleProps) {
  useEffect(() => {
    document.title = `${title} | UL.CO`;
  }, [title]);

  return null;
}