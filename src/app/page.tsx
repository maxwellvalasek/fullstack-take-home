"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";

import UploadButton from "../components/UploadButton";
import Gallery from "../components/Gallery";
import MediaTypeFilter from "../components/MediaTypeFilter";
import { commonStyles } from "../styles/common";
import Header from "../components/Header";
import { config } from "../lib/config";
import SaveButton from "../components/SaveButton";

export default function Page() {
  const setEntireState = usePortfolioStore(state => state.setEntireState);

  useEffect(() => {
    (async () => {
      const res = await fetch(config.getLoadPortfolioEndpoint("demo_user"));
      const data = await res.json();

      const items = data.items.map((item: any) => {
        if (!item.category) {
          return { ...item, category: null };
        }
        const parts = item.category.split("::");
        return {
          ...item,
          category: parts.length === 2 ? parts[1] : item.category
        };
      });

      const categoryStrings = items
        .map((item: any) => item.category as string | null)
        .filter((cat: string | null | undefined): cat is string => Boolean(cat));

      const groups: string[] = Array.from(
        new Set(
          categoryStrings.map((cat: string): string => cat)
        )
      );

      setEntireState({ items, groups });
    })();
  }, [setEntireState]);

  return (
    <>
      <Header />
      
      {/* Primary Control Bar */}
      <div className={commonStyles.primaryControlBar}>
        <MediaTypeFilter />
        <UploadButton />
      </div>
      
      <main className={commonStyles.mainContainer}>
        <div className={commonStyles.galleryContainer}>
          <Gallery />
        </div>
      </main>
      
      <SaveButton variant="fab" />
    </>
  );
}
