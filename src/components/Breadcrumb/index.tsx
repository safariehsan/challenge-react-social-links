import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface Props {}

export const BreadCrumb = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="•" sx={{ marginBottom: 3 }}>
      <Link underline="hover" color="inherit" href="/" variant="body2">
        خانه
      </Link>
      <Link underline="hover" color="inherit" href="#" variant="body2">
        کاربر
      </Link>
      <Link
        variant="body2"
        underline="hover"
        color="text.primary"
        href="#"
        aria-current="page"
      >
        تنظیمات کاربری
      </Link>
    </Breadcrumbs>
  );
};
