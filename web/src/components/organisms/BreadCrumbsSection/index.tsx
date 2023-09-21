import { FC } from "react";
import { Breadcrumbs } from "@mui/material";

type Props = {
  crumbs: JSX.Element[];
};

export const BreadcrumbsSection: FC<Props> = ({ crumbs }): JSX.Element => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">{crumbs}</Breadcrumbs>
    </>
  );
};
