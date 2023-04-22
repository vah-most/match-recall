import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { RootState } from "src/store";
import IntroPage from "src/pages/IntroPage";

import "./Page.scss";

interface PageProps {
  children?: ReactElement;
  className?: string;
}

function Page({ children, className = "" }: PageProps): ReactElement {
  const user = useSelector((state: RootState) => state.user);
  const canPlay: boolean = user.name ? true : false;
  const location = useLocation();

  return (
    <div className={`pageGeneralContainer ${className}`}>
      {canPlay || location.pathname !== "/play" ? (
        <React.Fragment>{children}</React.Fragment>
      ) : (
        <IntroPage />
      )}
    </div>
  );
}

export default Page;
