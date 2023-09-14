import {
  CustomerFormType,
  FormValuesType,
  InformationFormType,
  ScheduleFormType,
} from "@/utils/interfaces";
import { usePathname } from "next/navigation";
import { Link, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export const handleSubmit = (formValues: FormValuesType) => {
  alert(JSON.stringify(formValues, null, 2));
};

export const breadCrumbs = (): JSX.Element[] => {
  const pathname = usePathname();

  const pathArray = pathname.split("/").map((crumb, index, array) => {
    if (index === 0) return "Home";
    if (index === array.length - 1) return "Job Detail";
    return crumb;
  });

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

export const handleCustomerData = (
  data: CustomerFormType,
  setButtonState: Dispatch<SetStateAction<boolean>>,
  formValues: FormValuesType,
  setFormValues: Dispatch<SetStateAction<FormValuesType>>
): void => {
  setButtonState(true);
  setFormValues({
    ...formValues,
    ["customer_registration"]: data,
  });
};

export const handleJobDetailData = (
  data: InformationFormType,
  setButtonState: Dispatch<SetStateAction<boolean>>,
  formValues: FormValuesType,
  setFormValues: Dispatch<SetStateAction<FormValuesType>>
) => {
  setButtonState(true);
  setFormValues({
    ...formValues,
    ["job_information"]: data,
  });
};

export const handleWorkScheduleData = (
  data: ScheduleFormType,
  setButtonState: Dispatch<SetStateAction<boolean>>,
  formValues: FormValuesType,
  setFormValues: Dispatch<SetStateAction<FormValuesType>>
) => {
  setButtonState(true);
  setFormValues({
    ...formValues,
    ["work_schedule"]: [data],
  });
};
