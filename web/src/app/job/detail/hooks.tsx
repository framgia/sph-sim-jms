import { usePathname } from "next/navigation";
import { Link, Typography } from "@mui/material";

export const breadCrumbs = (): JSX.Element[] => {
  const pathname = usePathname();

  const pathArray = pathname.split("/").map((crumb, index, array) => {
    if (index === 0) return "Home";
    if (index === array.length - 2) return "Job Detail";
    return crumb;
  });
  pathArray.pop();

  return pathArray.map((breadcrumb, index) =>
    index === pathArray.length - 1 ? (
      <Typography key={index} color="text.primary">
        {breadcrumb}
      </Typography>
    ) : (
      <Link
        key={index}
        underline="hover"
        color="inherit"
        href={`/${breadcrumb.toLowerCase() === "home" ? "#" : breadcrumb}`}
      >
        {breadcrumb}
      </Link>
    )
  );
};
