import { usePortfolioStore } from "@/store/portfolioStore";
import { commonStyles } from "@/styles/common";

export default function Header() {
  const hasUnsavedChanges = usePortfolioStore(state => state.hasUnsavedChanges);

  return (
    <nav className={commonStyles.navbar}>
      <div className={commonStyles.navContainer}>
        <div className={commonStyles.navContent}>
          <div className={commonStyles.brandingGroup}>
            <div className={commonStyles.logoContainer}>
              <img 
                src="/favicon.ico" 
                alt="Portfolio Logo" 
                className={commonStyles.logo}
              />
              {hasUnsavedChanges && (
                <div className={commonStyles.notificationDot} />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h1 className={commonStyles.title}>
                Portfolio Builder
              </h1>
              <p className={commonStyles.subtitle}>
                Max Valasek
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

